/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 俱乐部性格口上 K10：EVENTTRAIN 存在标志 + 主体（issue #241）。
 *
 * == 头部七道检查（kojo_message_com_10，与 K3/K7 顺序不同） ==
 *
 * ①ASSI>0 && ASSIPLAY → return 0；②TEQUIP:45 && SELECTCOM!=45 → return 0；
 * ③TFLAG:899（失神）→ return 0；④TEQUIP:89 → CALL DOG_KOJO_10, return 0；
 * ⑤TEQUIP:55 → CALL COLOSSEUM_KOJO_10, return 0；⑥TALENT:TARGET:9==1 →
 * return 0；⑦TEQUIP:90 → return 0。COLOSSEUM_KOJO_10/DOG_KOJO_10 是本文件
 * 内本地函数（K3 colosseum_kojo_3/dog_kojo_3 同构先例），不进 family。
 *
 * == 状态机（CFLAG:301，K3 kojo-k3-noble.js 惯例） ==
 *
 * 爱抚/舔阴/肛门爱抚/自慰/口交_主/胸爱抚/接吻等各自一条 CFLAG 计数器状态
 * 机，FLAG:7 == 2（默认）时上限旁路、每次都出声；FLAG:7 == 1 时逐阶段推进。
 * 门槛按素质（TALENT:76 淫乱 / TALENT:85 爱慕）与刻印/润滑档位分支，写法
 * 与 K3 一致，此处不重复展开。
 *
 * == ntr_koujo_k10 ==
 *
 * P 由外部调用方传入（K1/K3/K5/K7 同族先例），本文件内暂无调用点——与
 * 其余已实现的 K 文件同构现状，不属这张工单的缺陷。
 *
 * == 空台词槽 ==
 *
 * MUSEUM_KOUJO_K10（TFLAG:500）、BANISHMENT_KOUJO_K10（TFLAG:510）、
 * GROTESQUE_KOUJO_K10（TFLAG:530）都有未填写正文的台词档（哪些档为空见
 * 各函数头），这些档输出空行，不代填台词。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。
 */

'use strict';

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
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
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const {
  chara_callname,
  chara_name,
  chara_nickname,
} = require('#/utils/callname-utils');
const { peek_aftertrain_s } = require('#/event/event-aftertrain');

const { piercing_state } = require('#/system/train/piercing-state');

const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_10 = 1; // FLAG:110 = 1（K10 口上存在标志）
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
    game.kojo.口上存在_10 = 0;
  },
  TIER.LATER,
);

// EVENTTRAIN NORMAL 档：调教开始时的口上。CFLAG:201 状态机——
// 初调教（0）→ 魔族化仅一次（<5 且未魔族化）→ NTR 再捕获（>=1 &&
// CFLAG:650==1）→ 屈服刻印 Lv1/2/3（各一次）→ 淫乱 → 爱慕 → 简易助手
// 分支（NO:ASSI 直判 20/21/22）→ 二回目以降调 k10_kojo2。
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi = era_flag.assi; // NO:ASSI（ere 角色 ID 直接对应）
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
  const master = 0; // MASTER 恒为角色 0（K1 kojo-k1-confident.js 先例）
  const time_word = era_flag.time == 0 ? '今日' : '今夜'; // 「TIME == 0 ? 今日 # 今夜」三目（K7 先例，page-main-menu.js 的 TIME 惯例）

  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:170`) != 1) {
    return 0;
  }

  if (era.get(`talent:${target}:121`) != 1) {
    return 0;
  }

  if (chara(target).kojo.初调教 == 0) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) == 9) {
      await era.printAndWait(`「呼，这就是魔族的身体呢」`);
      await era.printAndWait(
        `${target_name}像要确认触感般开合着手指、扇动了几下背上的双翼，似乎对成为魔族这件事受到了点冲击，稍稍有些接受不能。`,
      );
      await era.printAndWait(`「没有想象中那么坏呐，变成魔族。」`);
      await era.printAndWait(`${target_name}脸上浮现出一抹恶质的笑容。`);
      await era.printAndWait(
        `「………话说回来，你应该知道了吧、我可是扶她哟？即使这样也想要抱我吗？」`,
      );
      // 的两项 → 按钮（PR #53 通则，正文不写 [编号]；#572）
      era.printButton('- 直不起来。', 0); // （「- 」属于正文）
      era.printButton('- 就是这样才好。', 1);
      let result0;
      for (;;) {
        result0 = await era.input(); // $INPUT_LOOP / INPUT
        if (result0 < 0 || result0 > 1) {
          continue; // GOTO INPUT_LOOP
        }
        break;
      }
      if (result0 == 0) {
        await era.printAndWait(`「哼、讨厌的话不做也没关系哦………」`);
        await era.printAndWait(`${target_name}有点遗憾地自言自语着。`);
      } else if (result0 == 1) {
        await era.printAndWait(
          `「诶、骗人…你当真…呀~！突、突然做什么！稍微温柔一点啊…嗯..！」`,
        );
        await era.printAndWait(`${target_name}带着少许开心的笑容被你扑倒了。`);
        await era.printAndWait(
          `大概从一开始就是抱着这个打算才接受了魔族改造,想尽情享受一下各种愉快的事情吧………`,
        );
      }
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 1;

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      chara(target).kojo.魔族化 = 1;
    } else {
      await era.printAndWait(
        `「…唔呼呼、这间屋子里精液和爱液的气味好厉害呢♪ 我的气味也会混入这件屋子吗？」`,
      );
      await era.printAndWait(
        `${target_name}从这间调教室的气氛中，猜出了自己接下来要被做的事情。`,
      );
      await era.printAndWait(
        `「嘛~话说回来想调教我是可以啦…但是，我可是长着“这个”唷？」`,
      );
      await era.printAndWait(
        `${target_name}恶意的笑着把衣服下摆掀了起来，露出了雪白的腹部和女孩子不应该有的凸♂起。`,
      );
      await era.printAndWait(
        `「看到这个也觉得没关系的话、随便你想对我做什么也可以哦♪」`,
      );
      await era.printAndWait(`「啊、但是弄痛我绝对不行！」`);
      await era.printAndWait(`「那些不舒服的奇怪变态行为也讨厌的说！」`);
      await era.printAndWait(
        `${target_name}接二连三的抛出的条件，让${player_name}的头开始痛了起来。于是${target_name}撅起了嘴再一次发问道。`,
      );
      await era.printAndWait(`「所以说、我这样的身体你真的直的起来嘛？」`);
      // 的两项 → 按钮（同上）
      era.printButton('- 直不起来。', 0);
      era.printButton('- 就是这样才赞！', 1);
      let result1;
      for (;;) {
        result1 = await era.input(); // $INPUT_LOOP1 / INPUT
        if (result1 < 0 || result1 > 1) {
          continue; // GOTO INPUT_LOOP1
        }
        break;
      }
      if (result1 == 0) {
        await era.printAndWait(`「哼、讨厌的话不做也没关系…呿………」`);
        await era.printAndWait(`${target_name}有点遗憾地自言自语着………`);
      } else if (result1 == 1) {
        await era.printAndWait(
          `「诶、骗人…你当真…呀~！…在、在摸哪里啊！…稍微温柔点…唔嗯！啊！」`,
        );
        await era.printAndWait(
          `可能是心理作用吧${target_name}似乎带着一丝开心的笑容被你扑倒了………`,
        );
      }
    }
    // CFLAG:201  = 1（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 1;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 5 &&
    chara(target).kojo.魔族化 == 0 &&
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呼，这就是魔族的身体呐」`);
    await era.printAndWait(
      `${target_name}像要确认触感般开合着手指、扇动了几下背上的双翼，似乎对成为魔族这件事受到了点冲击，稍稍有些接受不能。`,
    );
    await era.printAndWait(`「没有想象中那么坏呐，变成魔族。」`);
    await era.printAndWait(`${target_name}脸上浮现出一抹恶质的笑容………`);

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    chara(target).kojo.魔族化 = 2;
    return 1;
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `${player_name}把那个水晶球所看的东西告诉了${target_name}，${target_name}脸色苍白的退缩着，想要从这里逃跑。`,
      );
      await era.printAndWait(
        `「原、原谅我…那、那个时候是被逼的没有办法…所以…啊呜..原谅我」`,
      );
      await era.printAndWait(
        `大颗的泪珠不断从${target_name}的双眼涌出。这幅柔弱的样子更加刺激了${player_name}的嗜虐心。`,
      );
      await era.printAndWait(
        `接下来${target_name}在${player_name}一次次的讯问下断断续续地把她被捕期间所发生的事情说了出来。`,
      );
      await era.printAndWait(
        `「啊啊～…是、是的…狂王他…那家伙、被那家伙侵犯了…诶？呃..是、对不起..很舒服…呜呜..不要再逼我说下去了…！」`,
      );
      await era.printAndWait(
        `「够了…这就是全部唷…啊啊…用你的手…让我把那样的事情都忘掉吧………」`,
      );
      await era.printAndWait(
        `${target_name}用力抱着${player_name}紧紧地、陷入了沉默………`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      chara(target).kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `${player_name}把那个水晶球所看的东西告诉了${target_name}，${target_name}表情黯淡的坐在那里一言不发、良久、${target_name}终于仿佛忍受不了了一般开口道。`,
      );
      await era.printAndWait(
        `「………请忘了它吧…那种事。求你了,请把那些水晶球给交给我吧！全部砸烂了也好！」`,
      );
      await era.printAndWait(
        `${target_name}以仿佛要哭出来的通红双眼向${player_name}请求着。`,
      );
      await era.printAndWait(
        `「我以为不是这样的！狂王他骗了我！都是把我当做玩具的狂王的错！」`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      chara(target).kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (
    chara(target).kojo.初调教 < 2 &&
    era.get(`mark:${target}:2`) == 1
  ) {
    era.drawLine();
    await era.printAndWait(`「唔呼呼、这种感觉..渐渐明白了呢」`);
    await era.printAndWait(
      `${target_name}的股间盛大的勃起了、直到${player_name}坏笑着指了指她充血的肉棒，${target_name}才惊觉这一事实，害羞地用手紧紧按住了它。`,
    );
    await era.printAndWait(`「讨厌…不要那样子看…很让人害羞的啊………♪」`);
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 2;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 3 &&
    era.get(`mark:${target}:2`) == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「看啊看啊、你的调教让这里变成这个样子了哦…♪」`);
    await era.printAndWait(
      `${target_name}的股间比以前更加剧烈的勃起了、${player_name}炫耀一般地轻轻扭动着腰肢。`,
    );
    await era.printAndWait(`「啊啊~…让我更加的舒服吧…好兴奋啊…♪」`);
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 3;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「呐啊、稍微做点痛痛的、像变态一样的事情也可以、所以...………」`,
    );
    await era.printAndWait(`「让我更加舒服吧…呐~…呐~…♪」`);
    await era.printAndWait(
      `${target_name}似乎完全陷入调教之中不可自拔了。不、好像从很久之前抵抗就开始减少了吧。`,
    );
    await era.printAndWait(
      `看到你惊讶的样子${target_name}轻笑着回答了这个疑问。`,
    );
    await era.printAndWait(
      `「我啊...除了研究之外最喜欢的就是做舒服的事情了、在这里做不了研究的话…令人舒服的事情当然要大做特做咯？」`,
    );
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
    await era.printAndWait(
      `「哈啊…哈啊…${heart(1)} 唔嗯~…你、哈啊${heart(1)}你终于来了..噫..要、要出来了哦哦！」`,
    );
    await era.printAndWait(
      `跪坐在床上激烈自慰的${target_name}看到${player_name}走进来，含糊不清的打了个招呼。完全勃起的肉棒整根被摩擦得红彤彤的，随着${target_name}的淫叫再一次将大量白浊液体喷向了泥泞不堪的床单`,
    );
    await era.printAndWait(
      `不知道是调教结果，或是原本具有性癖的错${target_name}已经成为不自慰就没办法活下去的淫乱肉棒自慰狂了。`,
    );
    await era.printAndWait(
      `「噢噢～！肉棒！摩擦肉棒超舒服！被、被谁看着感觉更素服惹！！${heart(2)}」像狗一样趴跪着，${target_name}一边“咻咻”地闻着满是精液的床单，一边更加疯狂的用双手撸动自己还在喷射的阴茎`,
    );
    await era.printAndWait(
      `「…………呐~…你也感到兴奋了吧？？所以快点来..把你的肉棒插进来…呀哦哦哦！去了去了！！…${heart(1)}」淫靡的摇动着臀部，${target_name}试着向${player_name}发出邀请，然而再一次剧烈射精让她翻起了白眼，脱力一般倒在了温腥的爱液中，微微颤抖着，良久才恢复了行动能力`,
    );
    if (era.get(`talent:${target}:0`) == 1) {
      await era.printAndWait(
        `${target_name}将两腿大大地分开、勃起阴茎下方，露出了漂亮的粉色私处。`,
      );
      await era.printAndWait(
        `「唔呼呼、一~~直等着你夺去我的处女唷？ …我也差不多快要忍耐不下去了啊${heart(1)} 呐啊…随时都可以唷…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}轻轻舔着嘴唇带着淫靡的表情笑着………`);
    } else {
      await era.printAndWait(
        `${target_name}将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。`,
      );
      await era.printAndWait(
        `「看啊…我的这里…想要肉棒想的发抖了呢…呐啊~…请给我吧………${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}可爱的眨了眨眼睛，娇声请求着………`);
    }
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

    if (chara(target).kojo.魔族化 == 1) {
      await era.printAndWait(`「哈啊哈啊…啊a…终于来呢…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}双腿分开无力地躺在地板上，青色的肌肤泛起大片大片的红潮。姿势看起来非常色情。`,
      );
      await era.printAndWait(
        `「啊啊…想要你的肉棒想要的不得了…自慰什么的完全不够呢…啊啊…啊啊………」`,
      );
      await era.printAndWait(
        `${target_name}身边的坐垫上也好床上也好全是半干涸的爱液痕渍。到底自慰了多少遍才会弄成这个样子啊。`,
      );
      await era.printAndWait(
        `「之前怎么样也联系不到你呢…我、想要的都快死掉了呐…啊啊～…求求你…${heart(1)}」`,
      );
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `${target_name}将两腿大大地分开、勃起阴茎下方，露出了湿的一塌糊涂的私处。`,
        );
        await era.printAndWait(
          `「把我的处女膜…用你的肉棒狠狠捅破吧…啊～…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………`,
        );
      } else {
        await era.printAndWait(
          `${target_name}将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。`,
        );
        await era.printAndWait(
          `「像平常那样用力的把肉棒插进来！…哈啊～…你的…魔王肉棒想要的要疯了啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 6;
      return 1;
    } else if (chara(target).kojo.魔族化 == 2) {
      await era.printAndWait(`「哈啊哈啊…啊啊～…终于来呢…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}双腿分开无力地躺在地板上，青色的肌肤泛起大片大片的红潮。姿势看起来非常色情。`,
      );
      await era.printAndWait(
        `「啊啊…想要你的肉棒想要的不得了…自慰什么的完全不够呢…啊啊…啊啊………」`,
      );
      await era.printAndWait(
        `${target_name}身边的坐垫上也好床上也好全是半干涸的爱液痕渍。到底自慰了多少遍才会弄成这个样子啊。`,
      );
      await era.printAndWait(
        `「之前怎么样也联系不到你呢…我、想要的都快死掉了呐…啊啊～…求求你…${heart(1)}」`,
      );
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `${target_name}将两腿大大地分开、勃起阴茎下方，露出了湿的一塌糊涂的私处。`,
        );
        await era.printAndWait(
          `「把我的处女膜…用你的肉棒狠狠捅破吧…啊～…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………`,
        );
      } else {
        await era.printAndWait(
          `${target_name}将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。`,
        );
        await era.printAndWait(
          `「像平常那样用力的把肉棒插进来！…哈啊～…你的…魔王肉棒想要的要疯了啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `${target_name}经过数次改造之后成为了魔族。她淫靡的身姿和气场与简直与原生的魅魔难辨高下。`,
      );
      await era.printAndWait(
        `「唔呼呼、总觉得这个形象更适合我呢…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}抱住了${player_name}尾巴也缠了上来。`,
      );
      await era.printAndWait(
        `「啊啊…快点来侵犯成了魔族的我吧…来不顾一切的做爱…${heart(1)}」`,
      );
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 6;
      return 1;
    }
  } else if (
    chara(target).kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:314`) != 9 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「啊、终于来了啊…唔呼呼」`);
    await era.printAndWait(
      `一直等待着你的${target_name}，笑眯眯的背着双手走了过来。`,
    );
    await era.printAndWait(`「嗳、稍微把耳朵凑过来点、是很重要的话哦」`);
    await era.printAndWait(`「………老实的说呢。我啊、其实不怎么喜欢狂王殿下。」`);
    await era.printAndWait(
      `「把闭门研究的我找出来，强硬的把什么爱人啊狂王亲卫队之类的头衔加在我身上、结果却是为了让我当作战的诱饵呢」`,
    );
    await era.printAndWait(`这么说来圣灵城的奇怪作战配置也是狂王的计划吧。`);
    await era.printAndWait(
      `「之前你的部下——那些前勇者来抓我的时候、对她们说了很过分的话呢」`,
    );
    await era.printAndWait(
      `${target_name}无奈的耸了耸肩膀，有些自嘲的笑了笑。`,
    );
    await era.printAndWait(
      `「所以说，最后被你抓到了真是太好了、这次终于脱离了狂王的统治，得到了自由呢」`,
    );
    await era.printAndWait(`但是、这不只是统治者从狂王变成了魔王吗？`);
    await era.printAndWait(
      `「不是这样哦、我是真的喜欢上你了、所以这样就好${heart(1)}」${target_name}轻快地踮起脚尖吻了吻${player_name}的唇角，哒哒地跑开了`,
    );
    await era.printAndWait(
      `然后${target_name}再一次向着爱人露出了狡黠而温暖的笑容………`,
    );
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
      await era.printAndWait(`「啊、终于来了啊…唔呼呼」`);
      await era.printAndWait(
        `一直等待着你的${target_name}，笑眯眯的背着双手走了过来。`,
      );
      await era.printAndWait(`「嗳、稍微把耳朵凑过来点、是很重要的话哦」`);
      await era.printAndWait(`「………老实的说呢。我啊、其实不怎么喜欢狂王殿下」`);
      await era.printAndWait(
        `「把闭门研究的我找出来，强硬的把什么爱人啊狂王亲卫队之类的头衔加在我身上、结果却是为了让我当作战的诱饵呢」`,
      );
      await era.printAndWait(`这么说来圣灵城的奇怪作战配置也是狂王的计划吧。`);
      await era.printAndWait(
        `「之前你的部下——那些前勇者来抓我的时候、对她们说了很过分的话呢」`,
      );
      await era.printAndWait(
        `${target_name}无奈的耸了耸肩膀，有些自嘲的笑了笑。`,
      );
      await era.printAndWait(
        `「所以说，最后被你抓到了真是太好了、这次终于脱离了狂王的统治，得到了自由呢」`,
      );
      await era.printAndWait(`但是、这不只是统治者从狂王变成了魔王吗？`);
      await era.printAndWait(
        `「不是这样哦、我是真的喜欢上你了、所以这样就好${heart(1)}」${target_name}轻快地踮起脚尖吻了吻${player_name}的唇角，哒哒地跑开了`,
      );
      await era.printAndWait(
        `轻笑着的${target_name}的魔族之眼仿佛在在闪闪发光………`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 8;
      return 1;
    } else if (chara(target).kojo.魔族化 == 2) {
      await era.printAndWait(`「啊、终于来了啊…唔呼呼」`);
      await era.printAndWait(
        `一直等待着你的${target_name}，笑眯眯的背着双手走了过来。`,
      );
      await era.printAndWait(`「嗳、稍微把耳朵凑过来点、是很重要的话哦」`);
      await era.printAndWait(`「………老实的说呢。我啊、其实不怎么喜欢狂王殿下」`);
      await era.printAndWait(
        `「把闭门研究的我找出来，强硬的把什么爱人啊狂王亲卫队之类的头衔加在我身上、结果却是为了让我当作战的诱饵呢」`,
      );
      await era.printAndWait(`这么说来圣灵城的奇怪作战配置也是狂王的计划吧。`);
      await era.printAndWait(
        `「之前你的部下——那些前勇者来抓我的时候、对她们说了很过分的话呢」`,
      );
      await era.printAndWait(
        `${target_name}无奈的耸了耸肩膀，有些自嘲的笑了笑。`,
      );
      await era.printAndWait(
        `「所以说，最后被你抓到了真是太好了、这次终于脱离了狂王的统治，得到了自由呢」`,
      );
      await era.printAndWait(`但是、这不只是统治者从狂王变成了魔王吗？`);
      await era.printAndWait(
        `「不是这样哦、我是真的喜欢上你了、所以这样就好${heart(1)}」${target_name}轻快地踮起脚尖吻了吻${player_name}的唇角，哒哒地跑开了`,
      );
      await era.printAndWait(
        `轻笑着的${target_name}的魔族之眼仿佛在在闪闪发光………`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(`${target_name}经过了重重改造终于成为了魔族。`);
      await era.printAndWait(
        `比以前更加强大的魔力缠绕着那个身影，已经成为了优秀的魔族了呢。看现在的样子的话，恐怕谁也想不到之前曾经是人类吧。`,
      );
      await era.printAndWait(`「唔呼呼、好像比以前感觉更好呢${heart(1)}`);
      await era.printAndWait(
        `${target_name}“帕库帕库”地扇动着背上的翅膀，样子十分可爱。`,
      );
      await era.printAndWait(
        `「为了你我会更加努力哦…要好好疼爱我啊…${heart(1)}」`,
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
    await era.printAndWait(`${target_name}的眼中失去了生气。`);
    await era.printAndWait(`承受不了过度的调教崩坏掉了的样子。`);
    await era.printAndWait(`「………………啊……呜………」`);
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 9;
    return 1;
  } else if (era.get(`talent:${target}:9`) == 1) {
    await k10_kojo2(); // 崩坏した場合は二回目以降へ
  } else if (era_flag.assi < 0) {
    await k10_kojo2(); // 助手なしは二回目以降へ
  } else if (era.get(`talent:${master}:122`) == 0) {
    await k10_kojo2(); // 你が男じゃなかったら二回目以降へ
  } else if (assi == 20) {
    era.drawLine();

    if (chara(target).kojo.简易助手_0 == 0) {
      if (
        era.get(`talent:${target}:85`) == 1 &&
        chara(target).kojo.初调教 >= 5
      ) {
        await era.printAndWait(
          `「${assi_name}队长也成为了魔王大人的下仆了呢…这样的事情我完全没想到呐」`,
        );
        await era.printAndWait(
          `${target_name}颇有兴趣地打量着${assi_name}经过调教后的身姿。${assi_name}被看地双颊泛红，下意识地像恋人一样抱住了${player_name}的手臂。`,
        );
        await era.printAndWait(
          `『你也是一副完全效忠了的雌犬的脸呢、啊啊、真是令人开心的事实』`,
        );
        await era.printAndWait(
          `${target_name}和${assi_name}互相对视着，作为同样被魔王宠爱的两个人产生了共鸣。`,
        );
        await era.printAndWait(
          `「唔呼呼、呐队长、从今以后一起侍奉魔王大人吧？」`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        chara(target).kojo.简易助手_0 = 2;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        chara(target).kojo.初调教 >= 5
      ) {
        await era.printAndWait(
          `「啊哈${heart(1)}…${assi_name}队长…看我的肉棒..看着它${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}和很久不见的${assi_name}再会了，然而却一刻也不能停下玩弄阴茎的手。`,
        );
        await era.printAndWait(`『虽然我也听过传闻…真是一副下流的身体啊』`);
        await era.printAndWait(
          `${target_name}的表现完全出乎了意料，${player_name}和${assi_name}不由得露出了一副吃惊的表情。`,
        );
        await era.printAndWait(
          `「啊嗯～…今日是${assi_name}队长来疼爱我吗…呵呵～好开心啊～ 唔嗯${heart(1)}」${target_name}痴笑着，蜜穴和龟头同时颤抖着流出了液体`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        chara(target).kojo.简易助手_0 = 2;
      } else {
        await era.printAndWait(
          `「嘛、连${assi_name}队长也被你的毒牙咬到了呢…唔呼呼、各种意味上来说都很厉害啊」`,
        );
        await era.printAndWait(
          `${target_name}用舌尖轻舔着嘴唇，趣味盎然地打量着${assi_name}被调教后的身姿。`,
        );
        await era.printAndWait(`『怎、怎么了${target_name}…有什么问题吗？』`);
        await era.printAndWait(
          `${target_name}以前偷偷用魔法调查过${assi_name}也是狂王的爱人。`,
        );
        await era.printAndWait(
          `「没什么、只是对你到底改变到了何种程度感兴趣而已」`,
        );
        await era.printAndWait(`${target_name}露出了大胆而挑逗的笑容………`);
        // CFLAG:202  = 1（变量语义：CFLAG 族，202）
        chara(target).kojo.简易助手_0 = 1;
      }
      return 1;
    } else if (
      // `CFLAG:202 == 1 && FLAG:7 == 2 && TALENT:85 == 1 || TALENT:76 == 1`
      // 同层混写：旧引擎的 && 与 || 同优先级、左结合，读作
      // `(三项 && ) || 淫乱`——`||` 之后没有 `&&`，两种读法同值（#517）。
      // 本文件另两处同形（202/203/204 三阶）。
      (chara(target).kojo.简易助手_0 == 1 &&
        game.kojo.口上开关 == 2 &&
        era.get(`talent:${target}:85`) == 1) ||
      era.get(`talent:${target}:76`) == 1
    ) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔呼呼、${assi_name}队长、一起侍奉魔王大人吧？」`,
        );
        await era.printAndWait(
          `『感觉都改变了啊、你。果然是真的成为了魔王大人的下仆呢…』`,
        );
        await era.printAndWait(
          `「终于让自己变得坦率了嘛${heart(1)} 所以才能变得这么自由呢」`,
        );
        await era.printAndWait(
          `${target_name}眯起眼睛露出了狡黠的笑容。${assi_name}也对她报以微笑。`,
        );
        await era.printAndWait(`『嗯嗯、如今的你真是魅力四射♪』`);
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        chara(target).kojo.简易助手_0 = 2;
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊哈${heart(1)}…${assi_name}队长…看我的肉棒..看着它${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${assi_name}注视着，更加兴奋的搓弄着自己的扶她肉棒。`,
        );
        await era.printAndWait(
          `『这就是你的本性啊、果然淫乱的扶她最终都会堕落成这幅样子吗………』`,
        );
        await era.printAndWait(
          `${assi_name}有些伤感的思考着，这让她看向${target_name}的眼神露出了一丝悲凉。`,
        );
        await era.printAndWait(
          `「啊啊嗯～…魔王殿下！${assi_name}队长～！去了！我要超级激烈的去了！${heart(2)}」${target_name}自慰过度而变得红肿的扶她肉棒喷出了大量的白浊`,
        );
        await era.printAndWait(
          `『呼…我会好好虐待你的、做好觉悟吧』${assi_name}叹息着摇了摇头，眼底却闪过一丝嗜虐的冷光`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        chara(target).kojo.简易助手_0 = 2;
      }
      return 1;
    } else if (chara(target).kojo.简易助手_0 == 2 && game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔呼呼、和${assi_name}队长一起侍奉魔王大人真是幸福呢♪」`,
        );
        await era.printAndWait(`『嗯、和你一起侍奉真的非常棒${heart(1)}』`);
        await era.printAndWait(
          `${target_name}和${assi_name}向着躺在床上的${player_name}微笑着，轻轻摇摆着两具各具魅力的身体贴了上去………`,
        );
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「${assi_name}队长…请好好疼爱…我的肉、啊、肉棒吧…啊啊～${heart(1)}」${target_name}痴笑着，蜜穴和龟头同时颤抖着流出了液体`,
        );
        await era.printAndWait(
          `『真是堕落下流的身体啊、我会好好虐待你的、做好觉悟吧♪』`,
        );
        await era.printAndWait(
          `${target_name}听到了${assi_name}的调教宣言后不禁露出了期待的眼神、美丽的脸颊也因为情欲的翻腾逐渐染上了潮红色………`,
        );
      }
      return 1;
    } else {
      await era.printAndWait(
        `『唔呼呼、今天就让你的扶她肉棒好好爽一爽吧！』${assi_name}握住了${target_name}敏感的龟头，缓缓的揉捏着`,
      );
      await era.printAndWait(
        `「啊啊、是、队长～…请尽情地疼爱我…啊～…啊啊～！」${target_name}腰随着${assi_name}动作奇怪的扭动着，突然一股粘稠的精液从${target_name}指缝里飞溅了出来`,
      );
      await era.printAndWait(
        `毫无抵抗的被${assi_name}压倒了，随着她的动作，${target_name}淫靡的叫声愈发高亢………`,
      );
      return 1;
    }
  } else if (assi == 21) {
    era.drawLine();

    if (chara(target).kojo.简易助手_1 == 0) {
      if (
        era.get(`talent:${target}:85`) == 1 &&
        chara(target).kojo.初调教 >= 5
      ) {
        await era.printAndWait(
          `「你也成为了魔王殿下的下仆了呢。嘛这些小事怎么都好啦、比起那个，今天的情况是？…3人一起做吗？」`,
        );
        await era.printAndWait(`『当、当然是一起做、有什么不妥吗？』`);
        await era.printAndWait(
          `${player_name}双手抱肩旁观着两人互动${assi_name}见状只好害羞的点了点头。`,
        );
        await era.printAndWait(
          `「是这样啊、你会狂乱成什么样子真是令人期待呢♪」`,
        );
        await era.printAndWait(
          `${target_name}说着，股间的阴茎勃起到了隐隐发痛的地步。………`,
        );
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        chara(target).kojo.简易助手_1 = 2;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        chara(target).kojo.初调教 >= 5
      ) {
        await era.printAndWait(
          `正在自慰着的${target_name}看到${player_name}和${assi_name}走进来，像打招呼一样向她们摇了摇手中的肉棒。`,
        );
        await era.printAndWait(
          `「哈啊～哈啊～…好久不见了呢${assi_name}、因为现在正在和肉棒亲做快乐的事情所以聊天什么的一会再…啊、魔王大人…诶、今天的对手是${assi_name}的说？」`,
        );
        await era.printAndWait(`『正是、魔王大人命令仆今天来当你的对手』`);
        await era.printAndWait(
          `「唔呼呼、你也被魔王大人的下仆侵犯的乱七八糟的画面让我光想想就硬了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `随着她的话语、${target_name}的扶她肉棒猛地勃起，打在了可爱的肚脐上发出“啪”地一声。`,
        );
        await era.printAndWait(
          `『呼呣、虽然之前听说过了，真的是全无节操的阴茎呢』`,
        );
        await era.printAndWait(
          `「啊哈哈、人家已经得了肉棒中毒症啦、做好觉悟吧${heart(1)}」`,
        );
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        chara(target).kojo.简易助手_1 = 2;
      } else {
        await era.printAndWait(
          `「这样的地下城正应该是你擅长发挥的场地呢${assi_name}、连你都成了魔王的下仆吗………」`,
        );
        await era.printAndWait(
          `${target_name}面对着过去的同伴，脸上露出了少许悲伤的神色。`,
        );
        await era.printAndWait(
          `「嘛、也好呢、能侵犯你说不定也是很有趣的事情、嗯嗯，马上来试试吧」`,
        );
        await era.printAndWait(
          `说着${target_name}完全勃起的扶她阴茎便露了出来。`,
        );
        await era.printAndWait(
          `『噫！ 神、神马啊！？、那个两腿间的…肉棒是………』`,
        );
        await era.printAndWait(
          `${assi_name}比起${target_name}坦率的原谅了自己被擒这件事，她股间勃起的扶她肉棒更让${assi_name}感到惊讶………`,
        );
        // CFLAG:203  = 1（变量语义：CFLAG 族，203）
        chara(target).kojo.简易助手_1 = 1;
      }
      return 1;
    } else if (
      (chara(target).kojo.简易助手_1 == 1 &&
        game.kojo.口上开关 == 2 &&
        era.get(`talent:${target}:85`) == 1) ||
      era.get(`talent:${target}:76`) == 1
    ) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呐~、${assi_name}、人家也对魔王大人的事情…喜欢的不得了呢」`,
        );
        await era.printAndWait(`『哈啊、呀累呀累、仆的竞争对手又增加了嘛………』`);
        await era.printAndWait(
          `对于${target_name}毫不掩饰的表白${assi_name}不禁苦恼的搔着头发叹息到。`,
        );
        await era.printAndWait(
          `「因为魔王大人太有魅力了人家也没办法嘛、这一点你也明白的吧？」`,
        );
        await era.printAndWait(
          `『就是说呢、被魔王大人宠爱的话就是仆也………等、让、让我都说了什么啊你！』下意识的点了点头，${assi_name}连忙慌张地辩解起来`,
        );
        await era.printAndWait(
          `「唔呼呼、真可爱呢，总而言之现在2个人一起让魔王大人愉悦起来吧？」${target_name}轻掩嘴唇，发出了${target_name}剧的笑声`,
        );
        await era.printAndWait(
          `『这、这要等魔王大人命令才能决定。萨！魔王大人、您希望如何呢？』${assi_name}努力板起通红的脸蛋，紧张的询问道`,
        );
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        chara(target).kojo.简易助手_1 = 2;
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈啊哈啊～…肉棒好舒服…好爽${heart(1)}」`);
        await era.printAndWait(
          `${target_name}像是要把自己的扶她肉棒展示给${assi_name}一样用力撸动着。`,
        );
        await era.printAndWait(
          `『呀累呀累、你真是完全顺从了自己的欲望呢、现在这个姿态真是应该让狂王看看啊』`,
        );
        await era.printAndWait(
          `「呼诶…让狂王看的play？啊啊这个也许不错呢！…魔王大人…请用水晶球帮人家摄影吧～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}亢奋的娇声呻吟着、更加激烈的玩弄着自己的扶她肉棒。`,
        );
        await era.printAndWait(`『唔…本来只打算开个玩笑的啊………』`);
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        chara(target).kojo.简易助手_1 = 2;
      }
      return 1;
    } else if (chara(target).kojo.简易助手_1 == 2 && game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呐~、今天是2个人一起侍奉魔王大人吗？或者是…2人一起调教人家呢？」`,
        );
        await era.printAndWait(
          `『这要魔王大人决定、虽然从仆的角度是更想要疼爱你呢』`,
        );
        await era.printAndWait(
          `${target_name}因为${player_name}和${assi_name}的爱而感到了喜悦、扶她肉棒坚硬的勃起着………`,
        );
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「因为被你看到就硬成这个样子了呢${assi_name}、要负起责任哟？」`,
        );
        await era.printAndWait(`『这、这样发情反而怪仆咯？ 你这家伙真是………』`);
        await era.printAndWait(
          `望着${target_name}弯翘坚挺的阴茎，${assi_name}不禁咽了下口水………`,
        );
      }
      return 1;
    } else {
      await era.printAndWait(
        `「啊啊、你好想听到你发出的甜美声音啊。呐~、快点来调教人家嘛♪」`,
      );
      await era.printAndWait(
        `${target_name}躺在床上慢慢的分开了双腿、对${assi_name}发出了诱惑。`,
      );
      await era.printAndWait(`『赞同、仆正想这么做！』`);
      return 1;
    }
  } else if (assi == 22) {
    era.drawLine();

    if (chara(target).kojo.简易助手_2 == 0) {
      if (
        era.get(`talent:${target}:85`) == 1 &&
        chara(target).kojo.初调教 >= 5
      ) {
        await era.printAndWait(
          `「包括人家在内各种各样的勇者魔王大人入手了很多倒是听说过、没想到连你这样的也会在魔王大人身下婉转承欢呐………」`,
        );
        await era.printAndWait(
          `${target_name}有些无可奈何的叹了口气。${assi_name}连一句反驳的话也说不出来，因为羞耻而满脸通红。`,
        );
        await era.printAndWait(
          `『我、不行吗！？ 你不也是被魔王大人宠爱着嘛！』沉默了一会，${assi_name}自暴自弃的喊道`,
        );
        await era.printAndWait(
          `「唔呼呼，和你一样，人家也是喜欢着魔王大人呢。所以我们2个人一起侍奉魔王大人吧…做好多好~多让人舒服的事情哟～${heart(1)}」${target_name}露出了捉狭的笑容，漂亮的瞳孔也染上了情欲的颜色`,
        );
        await era.printAndWait(
          `${assi_name}被同伴前突然转换的态度和所未见的魅惑姿态惊呆了、不过她很快理解了${target_name}与她的目的是一致的，那就是为${player_name}献上自己的一切。`,
        );
        await era.printAndWait(
          `『唔、和你一起稍微有些不痛快呢、真是没办法，只限为了魔王大人的时候哦』`,
        );
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        chara(target).kojo.简易助手_2 = 2;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        chara(target).kojo.初调教 >= 5
      ) {
        await era.printAndWait(
          `${player_name}和${assi_name}进入房间的时候、${target_name}正在地板上不知羞耻的抬着腰，壮烈的射精中。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…听说${time_word}有特别的来宾要来，人家一直很期待的说…没想到是你来了呢${assi_name}」${target_name}激烈的喘息着，过度的高潮让她全身都染上了煽情的粉红色，只有股间坚挺的肉棒背叛了无力的主人，狰狞的跳动着`,
        );
        await era.printAndWait(
          `『魔王大人说”${time_word}的节目很值得期待”原来是这个意思吗…咕噜（咽口水）』${assi_name}被原同伴催眠魔法般的淫媚姿态迷住了`,
        );

        await era.printAndWait(
          `「唔呼呼、被你这么盯着看的话人家的肉棒都硬得发痛了呢…啊啊…来吧${assi_name}、你也看得亢奋了吧${heart(1)}」${target_name}眯起眼睛，水汪汪的双瞳里满是化不开的情欲`,
        );
        await era.printAndWait(
          `${assi_name}痴痴的盯着${target_name}淫荡身体，一步步的走了过去、这两个人一会儿会做出什么样有趣的事情的${player_name}想着………`,
        );
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        chara(target).kojo.简易助手_2 = 2;
      } else {
        await era.printAndWait(
          `「啊啦、你被男人宠爱的时候是这样的表情啊、第一次看到呢。还是说因为对方是魔王大人所以才露出了这么下流的表情吗？」`,
        );
        await era.printAndWait(
          `『突、突然说什么啊、你、自己的立场到底明不明白啊？』`,
        );
        await era.printAndWait(
          `${assi_name}因为同伴毫无顾忌的发言而晕红双颊。实际上${player_name}最近因为${assi_name}有些打不起精神的样子在烦恼吧。`,
        );
        await era.printAndWait(
          `「哇啊、脸整个红通通的超可爱呢…连人家都“扑通扑通”的乱跳了呢♪」`,
        );
        await era.printAndWait(
          `${target_name}的股间、猛地弹出来的扶她肉棒也一抖一抖地，仿佛附和着主人的话………`,
        );
        // CFLAG:204  = 1（变量语义：CFLAG 族，204）
        chara(target).kojo.简易助手_2 = 1;
      }
      return 1;
    } else if (
      (chara(target).kojo.简易助手_2 == 1 &&
        game.kojo.口上开关 == 2 &&
        era.get(`talent:${target}:85`) == 1) ||
      era.get(`talent:${target}:76`) == 1
    ) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔呼呼、${assi_name}、人家也成为了魔王大人的私有物了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `『魔王大人还真是很看重感情呢、像你这样野狗一般到处喷精的淫乱扶她也不舍得丢掉啊』`,
        );
        await era.printAndWait(
          `熊熊燃烧的妒火让${assi_name}吐出了刻薄的讽刺。但是${target_name}仿佛什么也没听到一样，轻笑着点了点头。`,
        );
        await era.printAndWait(
          `「嗯，这正是魔王大人胸怀宽广之处哟、唔呼呼、魔王大人一直这么厉害呢${heart(1)}」`,
        );
        await era.printAndWait(
          `『哼、好吧、${time_word}就按魔王大人吩咐的，好好疼·爱你吧！${target_name}…！』`,
        );

        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        chara(target).kojo.简易助手_2 = 2;
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `${player_name}和${assi_name}走入房间时、${target_name}正在地板上不知羞耻的抬着腰，壮烈的射精自慰中。`,
        );
        await era.printAndWait(
          `「哈啊～哈啊～${heart(1)} 啊啊～…够了，请不要来打扰人家和肉棒亲做舒服的事情！」`,
        );
        await era.printAndWait(
          `『真是敢说啊${target_name}、难得我和魔王大人想着要来疼爱你一番呢………』`,
        );
        await era.printAndWait(
          `听到了这句话，${target_name}手的动作不由得停了下来、吃惊的向这边转过了头。`,
        );
        await era.printAndWait(
          `「这种事情早点告诉人家嘛。啊啊~魔王大人${heart(1)}..快来，人家已经准备好了${heart(1)}」${target_name}向着${player_name}分开了自己似的一塌糊涂的蜜穴，扭动的腰肢让她的肉棒摇来摇去，好像乞食的小狗`,
        );
        await era.printAndWait(
          `『哈啊..看了这个就彻底明白了。真的完全变成淫乱母狗了啊、你………』`,
        );
        await era.printAndWait(`${assi_name}愕然了片刻，深深地叹了口气………`);
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        chara(target).kojo.简易助手_2 = 2;
      }
      return 1;
    } else if (chara(target).kojo.简易助手_2 == 2 && game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔呼呼、咱们2人一起来侍奉魔王大人吧？你也喜欢魔王大人的吧？」`,
        );
        await era.printAndWait(
          `『嗯嗯、最喜欢了、我现在觉得侍奉魔王大人就是我的使命呢${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}和${assi_name}红着脸互相点了点头、牵着手一起对${player_name}展开了旖旎的侍奉………`,
        );
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「${assi_name}、看到了你的样子人家的肉棒就变成这个样子了呢${heart(1)} 请负起责任哦♪」`,
        );
        await era.printAndWait(
          `『不、不行、在魔王大人面前做那种事情的话、做不到的…啊啊啊…』仿佛想起了什么不好的回忆，脸涨得通红的${assi_name}摇着头`,
        );
        await era.printAndWait(
          `「不·行·哟${heart(1)} 魔王大人也想看到的吧，这孩子的‘那种’表情  唔呼呼♪」${target_name}翘到肚脐的扶她肉棒一抖一抖的，闪着淫靡的液光向${assi_name}逼近………`,
        );
      }
      return 1;
    } else {
      await era.printAndWait(
        `「呐~、魔王大人，今天在用力点处罚人家也没关系哟…唔呼呼」`,
      );
      await era.printAndWait(
        `『真是嚣张的态度啊${target_name}、不过，你看到这孩子还想这么说吗？』`,
      );
      await era.printAndWait(
        `${target_name}看到了${assi_name}，那种游刃有余的态度完全消失了………`,
      );
      return 1;
    }
  } else {
    await k10_kojo2(); // 二回目以降
  }
});

/**
 * k10_kojo2：二回目以降的调教开始口上。按崩坏 / 淫乱 /
 * 爱慕（各含体力 BASE:0 高低分档）取首个命中，随机三选一收尾。
 */
async function k10_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const glasses_word =
    chara(target).train.上衣类型 == 83 ? '扶了扶眼镜' : '向这边转了过来'; // (CFLAG:42 == 83) ? 扶了扶眼镜 # 向这边转了过来

  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「啊……啊啊…啊………」`);
    await era.printAndWait(`${target_name}没有什么令人值得期待的反应………`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「稍、稍微温柔点哦……」`);
    await era.printAndWait(`${target_name}这么说着，害羞的把头埋了下去………`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「来吧、快点开始嘛♪」`);
    await era.printAndWait(`${target_name}的股间盛大的勃起着………`);
    return 1;
  } else if (era.get(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「还愣在那里做什么、你不是来欺负人家的嘛？」`);
    await era.printAndWait(
      `${target_name}摆动着腰肢，发出了无声的邀请、${player_name}双手环住她柔软的腰腹，一点点向着敏感的地方摸了下去。`,
    );
    await era.printAndWait(
      `在那里的某物已经因为接下来要开始的调教变得又热又硬了………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();

    if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「诶 那个…抱歉哦、是来找我做令人舒服的事情吗？」打开门${target_name}一副半梦半醒的样子，头发也乱糟糟的翘起了一堆呆毛`,
      );
      await era.printAndWait(`${target_name}揉着眼角${glasses_word}。`);
      await era.printAndWait(
        `「也、也不是说被你抱会讨厌什么的啦、那个、你看我的肉棒已经变成这样子咯！」`,
      );
      await era.printAndWait(
        `正如她所说的、${target_name}的扶他阴茎已经硬的不能再硬了。`,
      );
      await era.printAndWait(
        `「呐~拜托啦…再等一会再回来把我弄得乱七八糟吧…！」`,
      );
    } else {
      await era.printAndWait(`「唔呼呼、来做好~多令人舒服的事情吧？」`);
      await era.printAndWait(`「在等你的时间我可是靠着自慰才忍耐过来的呢」`);
      await era.printAndWait(`${target_name}好像已经忍耐不住了的样子………`);
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (game.system.着衣系统 != 0) {
      if (
        !(
          chara(target).train.着衣状态 & 28 && chara(target).train.上衣类型 == 1
        )
      ) {
        if (
          !(
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 101
          )
        ) {
          if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 209
          ) {
            await era.printAndWait(
              `${target_name}的女仆服裙子非常的短、稍微迈开步子就可以看到裙内风光的样子。`,
            );
            await era.printAndWait(
              `修长的双腿被雪白的过膝袜紧紧包裹着，袜口在大腿中段勒出一道性感的凹痕。四条黑色紧身吊带夹住了袜缘，向上没入了短裙的阴影中。`,
            );
            await era.printAndWait(
              `「主人大人的品味真不错呢、这么短的裙子，人家的肉棒只要一勃起就会跑出来呢…看♪」`,
            );
            await era.printAndWait(
              `${target_name}慢慢向上提起裙角，把勃起到根本无法隐藏的扶她肉棒露了出来。`,
            );
            await era.printAndWait(
              `「看到了主人大人就勃起成这个样子、这么变态的女仆${target_name}请给与惩罚吧${heart(1)}」`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 203
          ) {
            await era.printAndWait(
              `「这种流莺一样的衣服、人家的cosplay还真是没品位呢♪」`,
            );
            await era.printAndWait(
              `随着一阵轻笑声${target_name}穿着妓女式的纱衣走了进来，顽皮的摆了几个性感的姿势。${player_name}看得津津有味。`,
            );
            await era.printAndWait(
              `然而与一般妓女不同的是，在半透明的薄纱里面${target_name}坚挺的扶她肉棒耀武扬威地展示着自己的存在感。`,
            );
            await era.printAndWait(
              `「啊a…这种夜战用的衣服真不错呢…快点来侵犯人家吧${heart(1)}？」`,
            );
            await era.printAndWait(
              `${target_name}笑着倒在了床上，慢慢分开双腿发出了无声的邀请，被弄皱了的纱裙上，那凸起的尖端一块明显的湿渍正在变得越来越大………`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 254
          ) {
            await era.printAndWait(
              `${target_name}穿着贴身白色兔女郎服慢慢走了进来、她眯着眼睛轻轻抚摸着网袜的网眼，似乎在品味它的手感。`,
            );
            await era.printAndWait(
              `「啊嗯~…第一次穿这种紧紧贴着身体的衣服，人家的肉棒很辛苦呢${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的肉棒形状清晰的凸了出来，随着${target_name}的脚步微微的颤抖着，让她脸上浮现出苦闷又淫靡的笑容。`,
            );
            await era.printAndWait(
              `「呐~、快点把这个拉链拉开嘛、人家真的很难受呢、呐~、求求你了嘛♪」`,
            );
            await era.printAndWait(
              `${target_name}娇嗔的抱着你的手臂，用被束缚到极限的肉棒轻轻地磨蹭着………`,
            );
            return 1;
          }
        }
      }
    }

    if (era.get(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「呜啊…啊嗯${heart(1)} 啊${heart(1)} 」`);
        await era.printAndWait(
          `${target_name}玩弄着自己的肉棒、溢出来的前走液被她当做润滑液一遍又一遍的涂抹着，发出淫靡的水光。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…从、从刚才开始忍着不高潮已经十几次了${heart(1)} 快点、快点来让我去吧………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}双腿大张的浪叫着、翅膀也好像很舒服似的绷得笔直………`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「快点让人家舒服起来吧…不然的话，可要反过来侵犯你了哟…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}伸出紫色的舌尖舔着丰润的嘴唇，发出吃吃的笑声。不知道这家伙是开玩笑还是认真的啊。`,
        );
        await era.printAndWait(
          `「唔呼呼、人家觉得，大概这次要去个十几次才能冷静下来唷………${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「呐~…来玩弄人家吧？」`);
        await era.printAndWait(
          `${target_name}的肉棒完全的勃起了，啪嗒啪嗒地仿佛在和自己的肚脐轻吻着。`,
        );
        await era.printAndWait(
          `「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」`,
        );
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「呜啊…啊嗯${heart(1)} 啊${heart(1)}  」`);
        await era.printAndWait(
          `${target_name}玩弄着自己的肉棒、溢出来的前走液被她当做润滑液一遍又一遍的涂抹着，发出淫靡的水光。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…从、从刚才开始忍着不高潮已经十几次了${heart(1)} 快点、快点来让我去吧………${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「快点让人家舒服起来吧…不然的话，可要反过来侵犯你了哟…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}伸出舌尖舔着丰润的嘴唇，发出吃吃的笑声。不知道这家伙是开玩笑还是认真的啊。`,
        );
        await era.printAndWait(
          `「「唔呼呼、人家觉得，大概这次要去个十几次才能冷静下来唷………${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「呐~…来玩弄人家吧？」`);
        await era.printAndWait(
          `${target_name}的肉棒完全的勃起了，啪嗒啪嗒地仿佛在和自己的肚脐轻吻着。`,
        );
        await era.printAndWait(
          `「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」`,
        );
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (game.system.着衣系统 != 0) {
      if (
        !(
          chara(target).train.着衣状态 & 28 && chara(target).train.上衣类型 == 1
        )
      ) {
        if (
          !(
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 101
          )
        ) {
          if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 209
          ) {
            await era.printAndWait(
              `${target_name}的女仆服裙子非常的短、稍微迈开步子就可以看到裙内风光的样子。`,
            );
            await era.printAndWait(
              `修长的双腿被雪白的过膝袜紧紧包裹着，袜口在大腿中段勒出一道性感的凹痕。四条黑色紧身吊带夹住了袜缘，向上没入了短裙的阴影中。`,
            );
            await era.printAndWait(
              `「主人大人、这么短的裙子根本不是女仆的打扮吧…呀！不要掀起来啊！」`,
            );
            await era.printAndWait(
              `${target_name}短短的裙摆下坚挺的扶她肉棒耀武扬威地展示着自己的存在感。`,
            );
            await era.printAndWait(
              `「不、不是这样的、才没有因为穿女仆服亢奋起来了呢！…呜..不要看啦！」`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 203
          ) {
            await era.printAndWait(`「久、久等了呢………♪」`);
            await era.printAndWait(
              `随着略带紧张的语声${target_name}穿着妓女式的纱衣缩手缩脚的走了进来。${player_name}看得津津有味。`,
            );
            await era.printAndWait(
              `「虽然是不知廉耻的打扮、你喜欢的话人家也没关系喔${heart(1)}」`,
            );
            await era.printAndWait(
              `为了证明她的话一般、在半透明的薄纱里面${target_name}坚挺的扶她肉棒耀武扬威地展示着自己的存在感。`,
            );
            await era.printAndWait(
              `「够、够了吧、继续这么看下去的话、人家的脑袋里都要变得奇怪了」`,
            );
            await era.printAndWait(
              `${target_name}的纱裙上，那凸起的尖端一块明显的湿渍正在变得越来越大，滴落的爱液将地板都弄脏了`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 254
          ) {
            await era.printAndWait(
              `${target_name}穿着贴身白色兔女郎服慢慢走了进来、她眯着眼睛轻轻抚摸着网袜的网眼，似乎在品味它的手感。`,
            );
            await era.printAndWait(
              `「这件衣服多半是你的兴趣吧、啊嗯、果、果然会变成这样」`,
            );
            await era.printAndWait(
              `${target_name}的肉棒形状清晰的凸了出来，随着${target_name}的脚步微微的颤抖着，让她脸上浮现出无奈又有些快意的笑容。`,
            );
            await era.printAndWait(
              `「不、不要太过盯着看啊、就算和你做了那么多次，人家被这么看着的话还是会感到害羞的…啊嗯♪」`,
            );
            await era.printAndWait(
              `你把${target_name}搂了过来，隔着皮制的衣料揉弄起了她敏感的龟头………`,
            );
            return 1;
          }
        }
      }
    }

    if (era.get(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「呐？ 今天也要做的吧？」`);
        await era.printAndWait(
          `${target_name}带着令人心动的笑容，微微偏过头期待的问道。`,
        );
        await era.printAndWait(`尾巴在空中比划出“爱心”的形状。`);
        await era.printAndWait(
          `「嗯、比起1个人，2个人一起做的话更舒服呢${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「向你告白的事情我从来都没有后悔过」`);
        await era.printAndWait(
          `${target_name}微笑着挽起了你的手臂、尾巴也跟着缠了上来。`,
        );
        await era.printAndWait(
          `「想要更多的被你溺爱呢…一起来做些甜蜜的事情吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`${target_name}看到你来了，很高兴的笑着说道。`);
        await era.printAndWait(
          `「今天也来和我做H的事情了呢。可以哟、我很乐意♪」`,
        );
        await era.printAndWait(`「唔呼呼…喜欢你哦、不、我爱你」`);
        await era.printAndWait(
          `在${player_name}耳边轻声说完后${target_name}很害羞的玩弄起了尾巴………`,
        );
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「呐？ 今天也要做的吧？」`);
        await era.printAndWait(
          `${target_name}带着令人心动的笑容，微微偏过头期待的问道。`,
        );
        await era.printAndWait(
          `「嗯、比起1个人，2个人一起做的话更舒服呢${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「向你告白的事情我从来都没有后悔过」`);
        await era.printAndWait(`${target_name}微笑着挽起了你的手臂。`);
        await era.printAndWait(
          `「想要更多的被你溺爱呢…一起来做些甜蜜的事情吧…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`${target_name}看到你来了，很高兴的笑着说道。`);
        await era.printAndWait(
          `「今天也来和我做H的事情了呢。可以哟、我很乐意♪」`,
        );
        await era.printAndWait(`「唔呼呼…喜欢你哦、不、我爱你」`);
        await era.printAndWait(
          `在${player_name}耳边轻声说完后${target_name}很害羞的玩弄起了头发………`,
        );
      }
    }
    return 1;
  }
  return 0;
}

// EVENTEND NORMAL 档：调教结束时的口上。死亡/崩坏跳过，随后
// 按屈服刻印 Lv0-3、淫乱/爱慕（各含体力高低分档）取首个命中。
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:170`) != 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「啊啊…啊…呜………」`);
    await era.printAndWait(`她的眼眸中已经看不到智慧的火光了………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:76`) == 0 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「哈啊…真是痛快呢～」`);
    await era.printAndWait(`${target_name}把凉水壶里面的水一口气喝掉了………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:76`) == 0 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「唔呼呼、撸管小菜又增加了呢………」`);
    await era.printAndWait(`${target_name}令人不快的低声笑着………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:76`) == 0 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();

    if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊、还没满足呢…不够啊…我想…更多的…」`);
      await era.printAndWait(`${target_name}望着天花板喃喃自语着什么………`);
    } else {
      await era.printAndWait(`「呐啊…下一次什么时候再来做？」`);
      await era.printAndWait(`${target_name}有些不舍得拉着你的衣袖问道………`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「啊啊~人家的肉棒在‘还不够~还不够’地哭喊呢………」`);
    await era.printAndWait(`${target_name}一脸欲求不满的玩弄着自己的性器………`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「呼…满足满足………${heart(1)}」`);
    await era.printAndWait(
      `${target_name}软下来的肉棒有些萎靡的半挺着、一股股的残精从马眼里吐出来，在杆身上画出淫靡的白痕………`,
    );
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「呼呼…人家说了还想要更多嘛………」`);
    await era.printAndWait(`${target_name}的肉棒还很精神的样子………`);
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(
      `「啊啊…每天都这样子的话…我究竟会变成什么样子呢………」`,
    );
    await era.printAndWait(`${target_name}一脸满足的吐出温热的气息………`);
    return 1;
  }
  return 0;
});

/**
 * kojo_message_com_10：七道头部检查 + SELECTCOM 指令口上。
 * 检查顺序（与 K3/K7 均不同，本文件保持自己的顺序）：① ASSI>0&&ASSIPLAY
 * → 跳过；② TEQUIP:45 口塞（SELECTCOM!=45）→ 跳过；③ TFLAG:899 失神 →
 * 跳过；④ TEQUIP:89 兽奸 → 岔去本文件真身 dog_kojo_10；⑤ TEQUIP:55
 * 死斗场 → 岔去本文件真身 colosseum_kojo_10；⑥ TALENT:9 崩坏 → 跳过；
 * ⑦ TEQUIP:90 触手 → 跳过。之后 IF SELECTCOM == N 状态机，CFLAG:301
 * 起的计数器（chara(target).kojo.<字段>）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
 * @returns {Promise<number>} 0（TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_10(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(player); // %SAVESTR:PLAYER%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (game.train.失神) {
    // TFLAG:899（跨域读走门面）
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_10(rand_n);
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_10(rand_n);
    return 0;
  }

  if (era.get(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(
          `「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」`,
        );
      } else {
        await era.printAndWait(`「呀嗯~…好痒啦…啊哈哈～…那、那里不行~」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…啊～…嗯呀啊～${heart(1)} 再用力一点…啊～…哈嗯～…${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯啊～…就是～…用力欺负那里…噫～…啊哈${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}充血的肉棒前端，前走液像失禁一般流了出来………`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…呜～…被、被喜欢的人摸着..哈呜  比自己弄更舒服呢…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}充血的肉棒前端，前走液像失禁一般流了出来`,
        );
        await era.printAndWait(
          `「啊嗯～…嗯～…坏心眼…为、为什么不欺负那里…人家敏感的小鸡鸡也想要嘛… 啊～…啊呜～${heart(1)}」`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「请尽情的…啊嗯…就…呀、就是这样…啊啊～…哈…啊呀♪」`,
        );
        await era.printAndWait(`「这里也、也要摸摸…啊～…嗯～…♪」`);
        await era.printAndWait(
          `只是爱抚了一下身体，${target_name}就好像要展示自己已经充血到不行的阴茎一样的打开了大腿………`,
        );
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊${heart(1)}…啊嗯～…再多摸摸也可以哦…嗯～…嗯呼呼…♪」${target_name}被抚摸着发出了轻佻的笑声`,
        );
        await era.printAndWait(`「嗯～…嗯～…真好呢………」`);
        await era.printAndWait(
          `${target_name}像渴望被爱抚的小猫一样随着${player_name}的动作舒展着身体,诱导着${player_name}……`,
        );
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～…呀哈~${heart(1)}…再…多欺负一下这里也可以哟…？」${target_name}挺起胸，将坚硬的乳头凑了过来`,
        );
        await era.printAndWait(`「啊～…嗯～…再用力、一点………」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「嗯～…啊啊～…哈、哈呜呜～！…好厉害…被别人的舔着、呜、竟然是这么舒服的事情………」`,
        );
        await era.printAndWait(
          `「啊啊～…说、呀嗯、说起来…唔呼呼、这里的处女膜还好好留着呢…‘最后会给谁呢’一直这么想着哟？」`,
        );
        await era.printAndWait(`「就·是·说…给你好不好呢？」`);
      } else {
        await era.printAndWait(
          `「嗯～…啊啊～…哈、哈呜呜～！…好厉害…被别人的舔着、呜、竟然是这么舒服的事情………」`,
        );
        await era.printAndWait(
          `「唔呼呼…就这样…把肉、肉棒也吸…啊～…人、人家错了 噫！不要那么用力～♪」龟头被轻轻咬住的${target_name}露出了快哭出来的表情`,
        );
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕哦～…啊哈哈～…啊啊啊～…${heart(1)} 在吸着…哦哦哦人家肉穴在被吸着…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}痉挛着抬起了腰，将蜜穴向着${player_name}脸上压去。亢奋到极点的弯翘肉棒也在${player_name}的脸颊上蹭来蹭去。`,
        );
        await era.printAndWait(
          `「不要再欺负人家了～…为什么、呜呜、为什么只有肉穴，也疼爱下肉棒啦～…啊啊～${heart(1)}」${player_name}用舌头更加激烈的攻击着湿润的腔穴`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…啊嗯～…啊…哈啊～${heart(1)} 呐…啊、啊嗯～…就这么出来也不错…嗯～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的秘裂被舔着，从喉咙里漏出了可爱的喘息声。`,
        );
        await era.printAndWait(
          `「人、人家的那里…也…也请疼爱一下…啊、啊a～${heart(1)}」`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊、呜、唔嗯…腿、再打开一点比较好吗…啊哈～…稍、稍微吸一下的话 嗯♪」`,
        );
        await era.printAndWait(
          `${target_name}把两腿大开的${target_name}蜜穴和肉棒仔细的舔舐着，发出淫靡的啾啾声。`,
        );
        await era.printAndWait(
          `「啊～…啊啊～！ 好…好爽～…呀哈、啊～…哈啊～！」`,
        );
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊嗯～…再来…更多的舔人家…嗯～…哈啊…啊…啊呜～！」`,
        );
        await era.printAndWait(
          `「哈～哈～…再这样舔着肉棒的话，人家会变得奇怪的♪」`,
        );
        await era.printAndWait(
          `${target_name}充血的肉棒前端，前走液像失禁一般流了出来………`,
        );
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (kojo.肛门爱抚 == 0) {
      await era.printAndWait(
        `「啊～…嗯～…啊啊～…那里很脏的…所以…不行…啊～…嗯～！」`,
      );
      await era.printAndWait(`${target_name}因为肛门被爱抚发出了悲鸣声………`);
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0);

      if (
        (era.get(`tequip:${target}:13`) ||
          era.get(`tequip:${target}:19`) ||
          era.get(`tequip:${target}:46`) ||
          era.get(`tequip:${target}:49`)) &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // 同一行输出：无后缀 PRINT + IF 首支的 PRINTFORM 收行（#622）。
        // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起
        const anal_prefix = `「啊嗯～、啊啊～`;
        if (era.get(`talent:${target}:76`)) {
          await era.printAndWait(
            `「啊嗯～、啊啊～${heart(1)} 更多的…摸那里…伸、伸进去…${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`)) {
          await era.printAndWait(
            anal_prefix + `${heart(1)}唔.. 这、这里…好厉害………${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            anal_prefix + `、这样欺负那里的话..不、不行了…啊～…啊啊～………」`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊、啊哈～！这个好爽…啊啊～…呀啊～！」`);
        await era.printAndWait(
          `${target_name}的菊穴分泌出了肠液，紧紧地追逐着${player_name}的手指。`,
        );
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `${target_name}被充分开发的肛门，确切地感受到了快感。`,
          );
          await era.printAndWait(
            `「啊～…啊啊～…这么舒服的事情最喜欢了～…所、所以请更多欺负肛门…用力的..噫～${heart(1)}」`,
          );
        }
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「讨、讨厌，不要玩弄屁股啦」`);
        await era.printAndWait(`${target_name}的肛门似乎润滑度还不够的样子………`);
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…啊啊～…手指噗滋噗滋的响着…嗯～…唔嗯~～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肠壁滑溜溜的紧紧贴了上来、把${player_name}的手指缠住了。`,
        );
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `${target_name}被充分开发了的肛门穴确实地反馈着快感。`,
          );
          await era.printAndWait(
            `「唔～…唔啊～…啊啊～…屁股穴…这么的…有感觉什么的～${heart(1)}」`,
          );
        }
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「讨～…讨厌～…还很痛的说…再稍微温柔点啦！」`);
        await era.printAndWait(`${target_name}的肛门似乎润滑度还不够的样子………`);
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…咕～…讨厌…好厉害的..感觉…嗯～…啊啊～」`,
        );
        await era.printAndWait(
          `${target_name}被充分开发了的肛门穴在润滑的帮助下承受着${player_name}的手指爱抚………`,
        );
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊～…啊啊～…很脏的～…不要～…弄这里…有什么意义..嘎吱嘎吱的声音好奇怪…嗯～」`,
        );
        await era.printAndWait(
          `${target_name}被手指玩弄着后面，发出了苦闷的呻吟………`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (kojo.自慰 == 0) {
      await era.printAndWait(`「唔呼呼、人家的自慰要开始…要仔细的盯着看哦…♪」`);
      await era.printAndWait(
        `${target_name}用舌头舔着嘴唇，抓住肉棒用力的撸动了起来。`,
      );
      await era.printAndWait(`看她娴熟的手法，大概已经习惯了吧………`);
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 10 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯~…嗯哼～${heart(1)}…哈…啊啊…呐~在听嘛？」`);
        await era.printAndWait(
          `${target_name}一边撸动着自己的肉棒，一边痴笑着开口说道。`,
        );
        await era.printAndWait(
          `「几年前人家试着用自己的肉棒把处女破掉呢…啊啊 弄得差点折断掉了好危险的说」`,
        );
        await era.printAndWait(`${target_name}自嘲的笑了笑。`);
        await era.printAndWait(
          `「…唔呼呼、不过现在的话有种说不定能够做到的感觉呢，要试试吗？………诶？果然还是想亲手夺走人家的处女嘛？真是拿你没办法呢${heart(1)}」`,
        );
        // CFLAG:304  = 11（变量语义：CFLAG 族，304）
        kojo.自慰 = 11;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:74`) == 1 &&
        (kojo.自慰 <= 9 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊嘿…噫…啊啊～…${heart(1)} 大肉棒～…大肉棒自慰最高${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}翻着白眼，像要弄坏一样用双手激烈的揉搓着自己红肿的龟头，不断有白浆从她的手指缝里迸溅出来。过度的高潮让她粉嫩的舌头从嘴角滑了出来，上面和下面的嘴同样不知廉耻的流着口水`,
          );
          await era.printAndWait(
            `「啊～…嘎啊～…啊～…好爽～${heart(1)}…呐啊…谁（随）便怎么调教都好！让人家更激烈的肉棒升兼（天）啊！${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～…呼啊～…啊啊a～${heart(1)} 自慰最棒了～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}大声娇叫着，不知道用扶她肉棒去了多少回。`,
          );
          await era.printAndWait(
            `「啊～…啊a哈～…${heart(1)} 超棒…超棒${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「唔呼…呼…哈啊…啊~${heart(1)} …手、手臂自己动起来惹（了）…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}看到${player_name}似乎想露出一个微笑，然而她手上突然加快的动作把这个表情变成了吐着舌头的下流表情。`,
          );
          await era.printAndWait(
            `「啊啊～…要射了…要射惹（了）…${heart(1)} 被看着的话超多的宝宝牛奶要射出来惹（了）！…${heart(1)}」`,
          );
        }
        // CFLAG:304  = 10（变量语义：CFLAG 族，304）
        kojo.自慰 = 10;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哈～…停不下来…明明只是被命令而已…肉棒自慰停不下来啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着恍惚的表情持续自慰着。如同说的一样已经去了不知道多少次还是停不下来的样子`,
          );
          await era.printAndWait(
            `「真实的…不要这、哈嗯、这么看着人家…把人家调教成这个样子的是谁啊…啊呜…♪」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊～…嗯～…在你的面前…啊啊～…自慰什么的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}M字开脚、在${player_name}面前激烈自慰着。`,
          );
          await era.printAndWait(
            `${target_name}肉棒的马眼处前走液咕噜咕噜的冒着，被${target_name}的十指打成了淫靡的泡沫………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊～…哈啊～…啊嗯…扶她肉棒撸起来好舒服…好舒服～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}对口角流下的唾液浑然不觉、继续自慰着。`,
          );
          await era.printAndWait(
            `${target_name}肉棒的马眼处前走液咕噜咕噜的冒着………`,
          );
        }
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～…哈～…哈啊～…啊啊～…感觉好爽～…啊啊啊～…去了～！」`,
          );
          await era.printAndWait(
            `${target_name}M字开脚、在${player_name}面前激烈自慰着………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…肉棒自慰，喜欢…最喜欢了…撸肉棒好幸福……哈啊…啊啊………」`,
          );
          await era.printAndWait(
            `${target_name}对口角流下的唾液浑然不觉、继续自慰着………`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～…嗯呼～${heart(1)}…哈…啊啊…呐，在听嘛？」`,
        );
        await era.printAndWait(
          `${target_name}一边随意地把玩着自己的性器，一边笑着开口了。`,
        );
        await era.printAndWait(
          `「几年前人家试着用自己的肉棒把处女破掉呢…啊啊 弄得差点折断掉了好危险的说 唔呼呼」`,
        );
        await era.printAndWait(`${target_name}自嘲的笑了笑。`);
        await era.printAndWait(`「所以啦、这个运气好留下来的处女就给你咯♪」`);
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:74`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「哈～…啊啊～…啊…魔王大人～${heart(1)}」`);
          await era.printAndWait(
            `${target_name}努力的向你挤出一个微笑，似乎想说点什么，然而激烈射精的肉棒打断了她。`,
          );
          await era.printAndWait(
            `「嗯～…唔～…不、不行${heart(1)} 哈嗯～…被魔王大人看着的话…肉棒变得超舒服了啊啊啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～…呼啊～…啊啊啊～${heart(1)} 魔王大人~魔王大人请看着不知羞耻的扶她肉棒…噫噫${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}大声娇叫着壮烈的射精了 ，白色秽雨发出淫靡的栗子花香，洒落在她被爱欲烧红的身体上。`,
          );
          await era.printAndWait(
            `「啊～…啊哈哈～…${heart(1)} 魔王…大人～${heart(1)}」${target_name}露出淫媚的笑容，向${player_name}伸出了手`,
          );
        } else {
          await era.printAndWait(
            `「唔呼…呼…哈啊…啊啊${heart(1)} …对不起…看到魔王大人  手开心的停不下来…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}双眼湿润的对${player_name}露出微笑，一边道歉一边加快了自慰的动作。`,
          );
          await era.printAndWait(
            `「啊啊～…要去了…要去了…${heart(1)} 被喜欢的人看着下流的自慰去了…${heart(1)}」`,
          );
        }
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哈～…停不下来…明明只是被命令而已…肉棒自慰停不下来啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着恍惚的表情持续自慰着。如同说的一样已经去了不知道多少次还是停不下来的样子`,
          );
          await era.printAndWait(
            `「真实的…不要这、哈嗯、这么看着人家…把人家调教成这个样子的是谁啊…啊呜…♪」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊～…嗯～…在你的面前…啊啊～…自慰什么的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}M字开脚、在${player_name}面前激烈自慰着。`,
          );
          await era.printAndWait(
            `${target_name}肉棒的马眼处前走液咕噜咕噜的冒着，被${target_name}的十指打成了淫靡的泡沫………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊～…哈啊～…啊嗯…扶她肉棒撸起来好舒服…好舒服～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}对口角流下的唾液浑然不觉、继续自慰着。`,
          );
          await era.printAndWait(
            `${target_name}肉棒的马眼处前走液咕噜咕噜的冒着………`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊～…嗯～…在喜欢的人面前…啊啊～…自慰什么的…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的两腿情不自禁的分开了、她轻咬着嘴唇，像要展示一般在${player_name}面前继续自慰着………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…肉棒自慰，喜欢…和魔王大人一样喜欢…撸肉棒好幸福……哈啊…啊啊………」`,
          );
          await era.printAndWait(
            `${target_name}对口角流下的唾液浑然不觉、继续自慰着………`,
          );
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～…啊～…哈啊～…啊啊～…好酥糊～…啊嗯～…嗯哈~～！」`,
          );
          await era.printAndWait(
            `${target_name}的两腿情不自禁的分开了,在${player_name}面前持续自慰着………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…肉棒自慰，喜欢…撸肉棒好幸福……哈啊…啊啊…………」`,
          );
          await era.printAndWait(
            `${target_name}对口角流下的唾液浑然不觉、继续自慰着………`,
          );
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「唔嗯♪ 人家很喜欢自慰哟…哈啊~…闲着的时候一直在做呢…因为、没有床伴嘛…嗯～…嗯呼呼♪」`,
          );
          await era.printAndWait(
            `${target_name}毫不在意的一边自爆着黑历史一边玩弄着肉棒………`,
          );
        } else {
          await era.printAndWait(
            `「啊～…撸管超舒服~～…嗯、啊、很、很害羞的啦不要那样盯着看嘛」`,
          );
          await era.printAndWait(
            `${target_name}似乎很害羞似的曲起大腿挡住了肉棒，然而手上的动作却更加激烈了………`,
          );
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 4) {
    if (kojo.口交_主 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊～${heart(1)} 魔王大人的嘴唇…好热…呜、要烫伤了…啊～…嗯呀~～${heart(1)}」`,
        );
        await era.printAndWait(
          `「被喜欢的人含着什么的…超有感觉的${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊～…嗯～…哈～…人、人家…被这样含着、是做梦吗…啊～…啊嗯～♪」`,
        );
        await era.printAndWait(
          `${target_name}的肉棒被吸着,不自觉把想着的事情说出来了………`,
        );
      }
      // CFLAG:TARGET:305  = 1（变量语义：CFLAG 族，TARGET:305）
      kojo.口交_主 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_主 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔呼呼、这么热心的吸着、魔王大人真是变态${heart(1)}」`,
        );
        await era.printAndWait(
          `「但是没关系呢、人家也是和你一样最喜欢变态play的淫乱女…所以、嗯～…再用牙齿咬那里吧…啊～哈噫！${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}敏感的龟头被肆意蹂躏、纤细的腰肢也随之战栗着，好像被叼住喉咙的小鹿。感觉到她高潮到来的${player_name}坏心眼的加大了力度………`,
        );
        // CFLAG:305  = 5（变量语义：CFLAG 族，305）
        kojo.口交_主 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交_主 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…唔呼呼${heart(1)} 那么…热心的吸着什么的…人家的肉棒很美味吗？」`,
        );
        await era.printAndWait(
          `「唔呼呼…一会、呀嗯${heart(1)}作为回礼，人家帮你、呜、帮你做 也可以哟${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}被口腔侍奉着，脸上露出了充满爱意的笑容………`,
        );
        // CFLAG:305  = 4（变量语义：CFLAG 族，305）
        kojo.口交_主 = 4;
      } else if (
        era.get(`abl:${target}:0`) >= 3 &&
        (kojo.口交_主 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～！不、不行～…人家的…最近变得很敏感的说…啊嘿～…噫${heart(1)}！」${target_name}敏感的里筋被舔了，小腹仿佛触电一般弹了起来`,
        );
        await era.printAndWait(
          `「这、这么咕啾咕啾的吸着的话…啊～…啊嗯～！要要被吸出来了${heart(1)}！」`,
        );
        // CFLAG:305  = 3（变量语义：CFLAG 族，305）
        kojo.口交_主 = 3;
      } else if (kojo.口交_主 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊～…再吸啊…嗯～…哈啊～…这样、多用舌头缠上去…噫呜、对、对不起啦、把牙齿放开啦呜呜………」`,
        );
        await era.printAndWait(`「哈～…啊啊～…嗯～…嗯呼…啊…♪」`);
        // CFLAG:305  = 2（变量语义：CFLAG 族，305）
        kojo.口交_主 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「唔呼呼、再更加仔细一点摸也可以哟…嗯哈……」`);
      } else {
        await era.printAndWait(
          `「拜、拜托、请温柔的…哈啊、啊嗯～…嗯～…呜…这样子的话再下去、就………」`,
        );
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:130`) == 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) == 0 &&
        era.get(`tequip:${target}:15`) == 0
      ) {
        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「就这样..像要把乳房扯下来一样更多的玩弄胸部吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用双手像挤奶一样绞扭着自己的巨乳，大量的乳汁随着她疯狂的动作飞溅着。`,
          );
          await era.printAndWait(
            `「唔哦哦哦！去了！${heart(1)} 用奶子射精惹（了）${heart(3)}」`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(`「啊啊…更多的喝吧…亲爱的…${heart(1)}」`);
          await era.printAndWait(
            `「再多喝一点…变得精神起来…然后好好疼爱人家吧………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边被吸着乳房，一边露出慈爱的笑容轻轻抚摸着你的头发………`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「啊嗯~～…啊～…哈啊～♪ 被这么吸着的话…呀啊～…哈～…哈噫～！」`,
          );
          await era.printAndWait(`「被喝掉了～…全部被喝掉了～………！」`);
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(
            `「啊～…哈啊…被吸着母乳…有了感觉什么的…啊～…啊呜～」`,
          );
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「哈啊～${heart(1)} 乳头变得硬邦邦的～${heart(1)} 超级舒服${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像要把乳房揉进${target_name}手里紧紧按着${target_name}的手臂`,
          );
          await era.printAndWait(
            `「哈啊~${heart(1)} 就这样用力揪人家的乳头啊…啊啊～…怎么样都好再用力的虐待这对不知廉耻的奶子吧${heart(1)}！」`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「唔呼呼～…魔王大人的手指好热～…${heart(1)} 更多的欺负人家的胸部吧…${heart(1)}把人家的全部…变成魔王大人的东西${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}充血坚挺的乳尖被指甲玩弄着。`);
          await era.printAndWait(
            `「啊啊～！这、这个超舒服～…啊～…呜呀～${heart(1)}」`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「啊哈～啊～…嗯～…呜、更多的疼爱人家的乳头吧…啊啊～…嗯~～…哈～…哈呜～」`,
          );
          await era.printAndWait(
            `${target_name}硬硬的乳头被两根手指捏住，轻转爱抚着。`,
          );
          await era.printAndWait(`「啊～…啊嗯～…呼……啊啊～…有感觉过头了…♪」`);
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(
            `「啊～…啊嗯～…嗯哈～…很温柔呢……啊、哈啊～………」`,
          );
          await era.printAndWait(`${target_name}的乳头渐渐变硬了………`);
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「嗯啾…啾呜…舌头…嗯～…还要…不要停下来嘛…${heart(1)} 嗯～…啾唔…哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}伸出双手紧紧抱着${player_name}的头长吻着，完全不像第一次的淫乱舌尖渴求着${player_name}的回应。`,
        );
        await era.printAndWait(
          `「呼啊…嘴巴好像发情了呢、呐、再来继续做吧？」${target_name}双眼湿润的舔舐着指尖，发出了淫乱的邀请`,
        );
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「嗯～…喜欢～${heart(1)} …喜欢哟～${heart(1)} …不要、不更多的和人家亲亲的话不原谅你哦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}撒娇的环着${player_name}的腰、一遍又一遍的索吻着。`,
        );
        await era.printAndWait(
          `「唔呼呼、初吻被吃掉了呢…第二次、第三次的也是魔王大人的东西哟${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「嗯～…嗯嗯～………初吻什么的…本来听说是更加美妙的东西呢………唔嗯！………」`,
        );
        await era.printAndWait(
          `${target_name}稍稍有些失望的抱怨还没说完，嘴唇就再次被猛烈的侵犯了………`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯啾…啾呜…舌头…嗯～…（咕噜咕噜）…咕啊${heart(1)} 嗯～…啾唔…哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}伸出双手紧紧抱着${player_name}的头，湿滑的舌头仿佛什么贪婪的异界生物一样索取着${player_name}口腔的每一个角落。`,
        );
        await era.printAndWait(
          `「呼啊…嘴巴好像发情了呢、呐、再来继续做吧？」${target_name}双眼湿润的舔舐着指尖，发出了淫乱的邀请`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯～…呼呼～${heart(1)} …喜欢～${heart(1)} …啊..和喜欢的人接吻什么做不腻呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}撒娇的环着${player_name}的腰、一遍又一遍的索吻着。`,
        );
        await era.printAndWait(`「哈啊…亲亲…还要啦${heart(1)}」`);
      } else {
        await era.printAndWait(`「啊呼…啊~…连嘴巴都被你侵犯了呢…♪」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「把舌头伸出来嘛..人家会让你舒服起来的哦${heart(1)}啾唔  唏~」${target_name}的唇舌绽放着，好像妖艳的食虫植物一样缠绕舔舐着自己的手指`,
        );
        await era.printAndWait(
          `被${target_name}诱惑的${player_name}伸出了舌头，瞬间被捕获了，${target_name}口穴仿佛对舌头进行口交一样咕啾咕啾的吸着。`,
        );
        await era.printAndWait(
          `「嗯呼咕…嗯啾…啾卟${heart(1)} 哈啊…魔王大人的舌头、好美味${heart(1)}」`,
        );
        await era.printAndWait(`就这样${target_name}沉溺在舌交接吻里了………`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～…嗯呼唔…卟…噗哈…${heart(1)} 接吻  更多的给人家…♪」`,
        );
        await era.printAndWait(
          `${target_name}温热黏腻的舌头在${player_name}口中释放着如同媚药般的快感。`,
        );
        if (rand_n(3) == 0) {
          await era.printAndWait(`「啊啊……魔王大人的浓厚kiss…」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「呼啊………嗯～…嗯嗯${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「真是的…不想分开了…一直这样下去…直到永远就好了呢 嗯～…嗯呼～${heart(1)}」`,
          );
        }
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊…嗯～…停、停啦…嗯唔～…咕…嗯～…嗯嗯！」`,
        );
        await era.printAndWait(
          `${target_name}说着拒绝的话，舌头却更加积极地缠了上来。随着更加急促的呼吸，双眸也湿润了………`,
        );
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯～…嗯唔～…啾呜…嗯啊…哈啊哈啊…」`);
        await era.printAndWait(`${target_name}亲吻着，神情变得恍惚了………`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (kojo.自己扒开 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `${target_name}蹲了下来，两腿大开…毫不犹豫的撑开了自己的肛门和蜜穴，粉嫩的肉壁被空气刺激，淫靡的蠕动着，所谓‘工口蹲踞’的标准也不过如此了吧。`,
        );
        await era.printAndWait(
          `${target_name}的爱液已经打湿了手指，充血到极致的肉棒也抵住了小巧的肚脐，她用四指巧妙地维持着双穴撑开的状态，微笑着伸出了右手比出一个“V”字。`,
        );
        await era.printAndWait(
          `「唔呼呼、怎样？里面也看得很清楚吧？Peace♪Peace♪………嗯？干嘛一脸呆呆的样子？」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「好、好啦…给你看就是嘛 都看过多少次了」`);
        await era.printAndWait(
          `「………诶？自己打开是什么意思？………变、变态…笨蛋！」`,
        );
        await era.printAndWait(
          `${target_name}脸红红的扭过头，对着${player_name}分开了自己的阴唇………`,
        );
      } else {
        await era.printAndWait(
          `「呜哇～…不愧是魔王这个还真的有点…令人害羞呢…嗯~～」`,
        );
        await era.printAndWait(
          `${target_name}磨磨蹭蹭的分开双腿露出了自己的蜜穴。然而她的阴茎已经完全勃起了。`,
        );
        await era.printAndWait(`「讨、讨厌…不要冲着那里吹气啦…呜呜呜…」`);
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:74`) == 1 &&
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}蹲了下来，两腿大开…毫不犹豫的撑开了自己的肛门和蜜穴，粉嫩的肉壁被空气刺激，淫靡的蠕动着，所谓‘工口蹲踞’的标准也不过如此了吧`,
        );
        await era.printAndWait(
          `「啊～哈啊…请仔细的看吧…人家的肉穴和扶她肉棒…${heart(1)} 已经湿的乱七八糟了～${heart(1)}」${target_name}用四指维持着双穴撑开的状态，右手握住了自己的肉棒大力套弄了起来`,
        );
        await era.printAndWait(
          `「哈～…哈～…撸肉棒什么  喜欢！…H的地方被看到了也喜欢${heart(1)}！噫！魔王大人！魔王大人在看着的说！」`,
        );
        await era.printAndWait(
          `${target_name}的扶她肉棒就在自己的大力套弄和被视奸中接近了高潮。`,
        );
        await era.printAndWait(
          `「啊啊～！已经、已经忍不住了！ 射出来了！${heart(1)} 在魔王大人的面前射出来了！${heart(1)}」`,
        );
        // CFLAG:306  = 7（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}蹲下来两脚大开…犹如站立的牝犬般摆出了色情蹲踞的姿势。`,
        );
        await era.printAndWait(
          `${target_name}被分开的肉穴不停吐出爱液，她抓住跳动着的肉棒，用力向上拉起。`,
        );
        await era.printAndWait(
          `「啊嗯～嗯${heart(1)} 人家的淫乱肉穴、全部、呜全部看个一清二楚吧…哈啊～${heart(1)}」`,
        );
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:74`) == 1 &&
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}用一只手把阴唇扒开、另一只手撸动着自己的阴茎。`,
        );
        await era.printAndWait(
          `「咕～…唔～…啊啊啊～…哈嗯～…哈～…${heart(1)} 十、十分抱歉，人家真是…因为被魔王大人看着太高兴了，一不小心就沉浸在自慰中了呢…嗯啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `虽然说着道歉的话${target_name}套弄肉棒的速度却越来越快了。大量流出的前列腺液和地上的爱液混合在一起，发出淫靡的气味。`,
        );
        await era.printAndWait(
          `「啊～…哈啊～…请再看着人家…啊噫～…哈呀～${heart(1)} 魔王大人！魔王大人~！${heart(1)}」${target_name}喊着心爱的人，激烈的射精了`,
        );
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「虽然很害羞…魔王大人想看的话就没办法了呢…啊～…啊嗯～请、请看人家用来做小孩的地方${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}两脚分开，用一只手掰开蜜穴、另一只手撸动着自己的阴茎。。`,
        );
        await era.printAndWait(
          `「啊～…啊啊～嗯～…咕…魔王大人～…人、人家…已经～！」`,
        );
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…看吧…人家的肉棒已经这样湿漉漉咕啾咕啾的了…哈啊～…哈啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}用右手握着龟头，把肉棒压在穴口咕哩咕哩的磨蹭着，大量的爱液顺着肉棒流下来冲淡了指缝间的白浊。`,
        );
        await era.printAndWait(`「哈啊～…更多…更多的看着人家～♪」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「果、果然还是不行、好、好害羞的啦………」`);
        await era.printAndWait(
          `${target_name}磨磨蹭蹭的分开双腿露出了自己的蜜穴。然而她的阴茎已经完全勃起了。`,
        );
        await era.printAndWait(`「讨、讨厌…不要盯着看…呜呜呜…」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (kojo.插入手指 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「你的手指插进来了啊…哼…哈啊…啊～${heart(1)}」只是一个指节，就让${target_name}饱经开发的淫乱肉体颤抖了起来`,
        );
        await era.printAndWait(
          `「啊~…这、这样嘎吱嘎吱的欺负那里…不、不行…${heart(1)} 脑髓要烧掉了${heart(1)}」`,
        );
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「哈…啊啊…嗯哈…嗯哼…手指进来了…有…啊！」`);
        await era.printAndWait(`「那、那里…只磨蹭那里…不行…呀啊～…哈~！」`);
      } else {
        await era.printAndWait(`「嗯～！…稍微有点辛苦…温柔一点…求求你………」`);
        await era.printAndWait(`${target_name}有点难受的样子皱起眉头………`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}的膣壁外侧里面有扶她特有的前列腺（魔界生理学常识DA☆ZE）。`,
        );
        await era.printAndWait(
          `如果强烈的刺激那里的话、${target_name}轻易的就会陷入高潮的狂乱中，就像这样。`,
        );
        await era.printAndWait(
          `「噫～…哈嘿～…噫呀啊哈哈哈～…这、这酿（样）的…人家的鸡巴会坏掉啊～…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `「手～…手指…噫～…嘿嘿～脑子要坏掉了…啊噫…呀哈～${heart(3)}！」`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}的膣壁外侧里面有扶她特有的前列腺（魔界生理学常识DA☆ZE）。`,
        );
        await era.printAndWait(
          `如果轻柔的刺激那里的话${target_name}的阴茎就会流出前列腺液，就像这样。`,
        );
        await era.printAndWait(
          `「啊…啊啊…H的汁液什么的…好多…露出来了…呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `「咕哈…啊啊…${heart(1)} 更多…更多弄那里…欺负人家吧…哈啊${heart(1)}」${target_name}脸上浮现了苦闷又魅惑的表情`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～…嗯嗯～…！ 啊～…啊哈～！ 那、那里是前列腺…啊～…嗯～…噫～…啊噫～！」`,
        );
        await era.printAndWait(
          `${target_name}的膣壁外侧里面有扶她特有的前列腺（魔界生理学常识DA☆ZE）`,
        );
        await era.printAndWait(
          `这样摩擦的话${target_name}就会发出动人的高鸣胜晕倒了………`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊嗯～…嗯～…啊啊～！ 不、要这样欺负那里…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}在阴道内被搅拌着不由得大声的求饶………`,
        );
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊～…更多的舔那里…哦哦…肛门穴被扒开了…啊哈哈…发出了下流的声音……噫♪」${target_name}的肛门被无慈悲的撑开了，柔韧的肠肉绞着侵入的舌尖，发出咕哩咕哩的水音`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「不要舔太多啦…讨、讨厌…因为、很脏的嘛…笨蛋！」${target_name}把脸埋入枕头，红着耳尖发出了可爱的抱怨声`,
        );
      } else {
        await era.printAndWait(`「呜…啊，不行…！那里是脏的…啊啊啊！」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊～…唔呼呼～…更多的把人家的肛穴弄得粘糊糊的吧」`,
        );
        await era.printAndWait(
          `「肛门穴超舒服…用舌头再来操人家的肛门穴啊${heart(1)}」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊嗯～…啊啊～…哈呜～…后、后面会被撑开啦…啊啊～」${target_name}温柔的抱着${player_name}的头，不知是鼓励还是抗拒的加紧了双腿`,
        );
        await era.printAndWait(
          `「很害羞的，所以不要…啊啊～…明明不想要的说${heart(1)}」`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊！那，那样的用舌头舔了的话…我…啊啊啊！」」`,
        );
        await era.printAndWait(`「哈啊哈啊…肛门都被撑开了…啊啊………」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊嗯～…呜～…呜啊…不要…那么脏的…嗯～…唔唔～！」`,
        );
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (kojo.振动宝石 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊~…嗯…嗯哈…唔呼呼、可爱的震动着呢${heart(1)}」`,
        );
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「这样被按上来的话…呀嗯~…麻麻的舒服呢${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「啊嗯～…这个震动…啊～…啊啊♪」`);
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…嗯…嗯哈…唔呼呼、可爱的震动着呢${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊嗯～…里筋～…把这个按在上面的话…哦哦来了！${heart(1)}」扶她的阴茎腹面，像男人一样有着被称为龟头包皮系带的敏感区域，被H攻击的话会变得很不妙（魔界生理学常识DA☆ZE）`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这样被按上来的话…呀嗯~…舒服过头人家要变的奇怪了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `「就说了嘛、已经、这样的勃起了…呀啊${heart(1)}」${target_name}很不好意思的捂着脸，从指缝间偷看着，不过对于一抖一抖的肉棒却完全没有掩饰的意思`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…啊啊～…请让这么H的人家变得更舒服吧…啊～…啊啊～…咕嗯～！」`,
        );
        await era.printAndWait(
          `${target_name}的双脚大开这，完全勃起的阴茎颤抖着，很舒服的样子………`,
        );
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊啊~…勃起了呢…哈啊…啊…」`);
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    if (kojo.壶虫 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊哈哈～…会被淫虫夺取处女什么…这种刺激的事情之前连想都没想过呢…啊啊${heart(1)} 开始动了！在人家里面咕啾咕啾的动了${heart(1)}」${target_name}双眼翻白的扭动着腰肢，好像在跳奇怪的舞蹈，随着肉棒的舞动，星星点点的白液飞溅着`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈啊…哈啊…被这么做了的话…自己好像变成了魔王大人的震动飞机杯呢…啊…呜、现在还不可以动啦…啊啊～！」`,
          );
          await era.printAndWait(
            `${target_name}连感慨下处女丧失的时间都没有，就被${player_name}抓着的蠕虫强烈的翻搅着肉穴，即使如此，她充满爱意的目光依然痴痴的望着爱人的脸……`,
          );
        } else {
          await era.printAndWait(
            `「啊…啊咕…唔唔～…不、不要～…这个蠕虫…还是活的…啊…啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}连感慨下处女丧失的时间都没有，就蠕虫强烈的翻搅着肉穴失去了思考的能力………`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊咳…哈啊…这个蠕虫很有活力的在人家里面折腾呢…嗯${heart(1)} …哦哈${heart(1)}糟糕 这个..搞不好会上瘾的${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊嗯…能把蠕虫、呜、改造成性爱用的之前从来都没听过呢…被亲爱的魔王大人用这么棒的东西欺负的话，哈呜${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「就、就这样子放进来吗？真的？ 啊！嘎哈…！咕～！啊、乱动着…在我里面乱动着啊啊…！」`,
          );
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊～…呜…啊啊${heart(1)} 肉穴好爽！…噫…啊啊！ 还在进去，啊啊~最里面被蠕虫塞满了${heart(1)}」`,
        );
        await era.printAndWait(
          `似乎把${target_name}饱经开发的肉穴当成了巢穴的样子，蠕虫很兴奋的往深处钻去了………`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～…啊${heart(1)} 魔王大人开发的蠕虫肉棒…嗯…啊啊～…好舒服…${heart(1)}」`,
        );
        await era.printAndWait(
          `似乎把${target_name}饱经开发的肉穴当成了巢穴的样子，蠕虫很兴奋的往深处钻去了………`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊~…嗯~…啊啊！ 虫子在蠕动着…啊嗯…好舒服呢………♪」`,
        );
        await era.printAndWait(
          `托了被充分开发的福，${target_name}的蜜穴在蠕虫激烈的动作中有感觉了………`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯~…啊~…啊嗯~…还、还是有点难受呢…啊啊…！」`);
        await era.printAndWait(
          `${target_name}因为蜜穴中暴动的蠕虫露出了难过的表情………`,
        );
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊~…已经要拔掉了嘛？ 明明一整天就这么插着也没关系的嘛」`,
      );
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈啊~  呐~…比起蠕虫来人家更想要魔王大人的说…」`,
      );
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「哈啊…哈啊………唔呼呼、这个洞空下来了呢、你要进来吗？」`,
      );
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (kojo.振动杖 == 0) {
      await era.printAndWait(
        `「啊～…啊啊～…这、这个…嘎啊！不、不行了！再继续下去人家就…哦哦哦！…这个震动超不妙…噫～！」${player_name}抓住${target_name}的阴茎，把疯狂震动的魔导具抵住了敏感的龟头。……`,
      );
      await era.printAndWait(
        `${target_name}浑身痉挛着发出了不成语调的浪叫。……`,
      );
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…更多…更多……啊噫~…哈嗯…这个超舒服的…啊啊～${heart(1)} 人家要变成肉棒笨蛋了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}脸上挂着下流的痴笑、不知廉耻的挺着腰，完全勃起的扶她肉棒挂着白浊的水痕主动迎上了震动棒………`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…魔王大人 再来…继续用这个欺负人家的肉棒吧${heart(1)} 啊～…啊嗯～…哈呜啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}轻轻扭动着腰肢，品味着爱人给与的震动快乐………`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜呜～…明白了啦…老实让你欺负就好了吧…啊～…嗯…嗯呼…唔…啊、啊嗯～♪」`,
        );
        await era.printAndWait(
          `沉浸在震动快感里的${target_name}不自觉得挺起了腰……`,
        );
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊…啊嗯…那、那个东西刺激太强了…啊～…呀啊～…噫呀～…用力压上来什么的不行！…」`,
        );
        await era.printAndWait(`${target_name}为了躲开震动杖徒劳的扭动着………`);
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯唔唔~…啊～…啊嗯～！ 啊~…在肛门里有精神的动着呢…嗯～…好厉害${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用力收紧肛穴，让蠕虫挣扎的更剧烈了………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…嗯…讨、讨厌…再继续往深处去的话…啊…呀啊～！」`,
        );
        await era.printAndWait(
          `蠕虫在${target_name}的肛穴里暴动着，让她发出了可爱的悲鸣………`,
        );
      } else {
        await era.printAndWait(`「人、人家、屁股那放面稍微有点…啊～…呀啊！」`);
        await era.printAndWait(
          `肛门被异种侵入的恐惧感让${target_name}发出了悲鸣………`,
        );
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊嗯~…蠕虫酱再动的激烈点…啊…啊哈${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为蠕虫给予的淫肛快感露出了柔软的表情………`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯唔…啊～…哈嗯～！ 啊~…在肛穴里一跳一跳的…嗯～…好厉害${heart(1)}」`,
        );
        await era.printAndWait(
          `蠕虫在${target_name}的肛穴里暴动着，她看着${player_name}发出了淫媚的娇喘声………`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…哈啊~…${heart(1)} 嗯呼…蠕虫桑真的很舒服呢${heart(1)}…哈啊啊………」`,
        );
        await era.printAndWait(
          `${target_name}望向${player_name}的湿润眼眸中充满了浓厚的爱欲………`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…蠕虫不想魔王大人那样温柔呢，稍微、有点辛苦…嗯！」`,
        );
        await era.printAndWait(
          `${target_name}因为肛穴里暴动的淫虫蹙紧了眉头………`,
        );
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯…嗯哼…这个…好厉害…啊～…啊啊～！」`);
        await era.printAndWait(
          `${target_name}被开发了的肛门因为蠕虫而喜悦着………`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不…不要…拔出去啊！这样的一点也不会舒服的！」`,
        );
        await era.printAndWait(
          `肛门被异种侵入的恐惧感让${target_name}发出了悲鸣………`,
        );
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊！明明插在人家的肛穴里很合适的说${heart(1)}」`,
      );
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈啊…人家的后面被好好疼爱了一番呢…${heart(1)}」`,
      );
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…屁股…啊呜…湿掉了………」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「不要再次插进来了！…说真的啦………」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`)) {
    if (kojo.乳头夹 == 0) {
      await era.printAndWait(`「啊哈~…有点痒呢」`);
      await era.printAndWait(`${target_name}对乳头夹有了一点点反应………`);
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…乳头有感觉了${heart(1)} 嗯~…这个震动…好像让人家上瘾了${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}发出了荡漾的声音………`);
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊…嗯~${heart(1)} 唔呼呼...乳头…很舒服呢${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}舔着嘴唇吐出了炽热的叹息………`);
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊…啊啊…乳头变得舒服起来了呢………」`);
        await era.printAndWait(`${target_name}对乳头夹有了一点点反应………`);
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊嗯~…还想在沉浸在那种感觉中啊………」`);
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈啊…哈啊…嗯、接下来是魔王大人亲自摸吗………${heart(1)}」`,
      );
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「嗯…接下来是指头吗？」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 16 && era.get(`tequip:${target}:16`)) {
    if (kojo.榨乳器 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊哈哈…这样不讲道理的挤着胸部…好像变成了家畜了呢${heart(1)}…啊、再、再用力吸${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呜哇…啊…人家的母乳…竟然这么多…嗯～…嗯嗯~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「挤出来的母乳你要怎么办啊？ 诶…卖掉…？不要做这种事情啊……啊、很害羞的说」`,
        );
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      kojo.榨乳器 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯…唔唔…胸部被榨乳…竟然这么舒服什么的…啊啊~要变成肉棒母牛了啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}激烈的喷射着。大量充满淫靡气味的奶水被榨乳器无情的抽走了………`,
        );
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…因、因为对魔王大人的爱…才会出来这么多…人家才不好色啦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边喷乳高潮一边喘息着解释道，不过满脸发情的样子毫无说服力………`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊、啊啊…不要…不要啊…求求你把这个拿掉啊…」`);
        await era.printAndWait(`${target_name}被榨着母乳留下了眼泪………`);
        // CFLAG:317  = 2（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 16 && era.get(`tequip:${target}:16`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊嗯～…不要停下来嘛…人家的胸部还想更多的射精…装回来嘛…呐~呐~…♪」`,
      );
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊哈啊…出来了好多呢♪」`);
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「（哭哭）…要好好……喝掉它们啊………」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`)) {
    if (kojo.飞机杯 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「咕哈啊…什、什么啊这个…肉棒…超级舒服的${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…啊啊…好厉害…这个超级舒服的………${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「咿呀～…啊…啊啊…这、这个…这样的…太爽了不行…啊啊～！」`,
        );
      }
      // CFLAG:318  = 1（变量语义：CFLAG 族，318）
      kojo.飞机杯 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.飞机杯 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊！飞机杯超赞${heart(1)} 飞机杯最高的说${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰淫荡的前后摇动着，贪求着飞机杯的快乐………`,
        );
        // CFLAG:318  = 4（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.飞机杯 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「从前人家知道这样的东西的话…哈啊、一定离不开手了吧…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}害羞地感叹着，一边舍不得飞机杯的快感，小小的动起了腰……`,
        );
        // CFLAG:318  = 3（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 3;
      } else if (kojo.飞机杯 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯~…啊啊…飞机杯好爽…请全部套进去吧………♪」`);
        await era.printAndWait(`${target_name}无意识的轻轻抽送着腰………`);
        // CFLAG:318  = 2（变量语义：CFLAG 族，318）
        kojo.飞机杯 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.飞机杯着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「讨厌…人家还想在飞机杯里更多射精啦！」${target_name}鼓起嘴，被淫欲烧红的脸上，露出了小孩子般的可爱表情`,
      );
      // CFLAG:378  = 3（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.飞机杯着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊…哈啊…拔掉了？…满了吗？」`);
      // CFLAG:378  = 2（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 2;
    } else if (kojo.飞机杯着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊…啊~…太过舒服了…要变成废人啦………」`);
      // CFLAG:378  = 1（变量语义：CFLAG 族，378）
      kojo.飞机杯着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊~…啊啊~…全部…全部塞进来…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「嗯…啊嗯~…不要太欺负人家后面嘛…${heart(1)}」`);
      } else {
        await era.printAndWait(`「啊嗯…啊啊~…我、我的屁股不是玩具啦！………」`);
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…肛穴要变得奇怪了${heart(1)} …哈呜…啊啊…就这样一口气全部拔出来会怎么样呢？呐~试试嘛」`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈～…哈啊…没关系…呜…全部放进来也…呀${heart(1)}」`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊~…塞进来了呢…嗯~…啊啊~…啊~…好多…好多啊${heart(1)}」`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「魔王大人…好温柔…哈啊啊~」`);
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…哈啊啊…全部进来了…肚子里面都被侵犯了…♪」`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊…咕唔…好痛苦…全部塞进来不行…不要啊…啊啊～」`,
        );
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊~！…这个…这个好赞！…再来一次！」`);
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「咕嗯~…被做了这种事情的话…人家也${heart(1)}！」`,
      );
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊～…啊啊~…超、超舒服~…♪」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊！屁股要…坏掉了！」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (kojo.正常位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊啊…我明白了…清清楚楚的感受到了呢…啊嗯…被、被你的大肉棒插进来的话…魔力在我的身体中…啊呀${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}面色潮红的展开了魔族的翅膀，温柔的包住了${player_name}，轻轻在背上摩擦着。从翅膀上放射出来的魔力让这个小小空间的温度变得更温暖了。`,
            );
            await era.printAndWait(
              `「唔呼呼…转化魔族这种事情都做了…不是已经只能服从你了嘛…${heart(1)}」`,
            );
            await era.printAndWait(
              `「呜..就这样继续侵犯人家...把里面都染上你的颜色吧${heart(1)}」${target_name}在耳边轻诉着，分叉的舌尖轻轻舔着耳廓，吐出湿热的气息`,
            );
            await era.printAndWait(
              `${target_name}完全没有在意失贞的痛苦，修长有力双腿紧扣着${player_name}的腰部，淫乱的肉穴贪婪的吞吐着肉棒，一遍又一遍的求欢着。`,
            );
            await era.printAndWait(
              `${player_name}像要回应这份感情一样开始了狂暴的抽插，${target_name}用双手激烈的揉搓着自己红肿的龟头，不断有白浆从她的手指缝里迸溅出来，与肉穴流出的血液一起，被肉棒搅成了淡紫色泡沫………`,
            );
          } else {
            await era.printAndWait(`「哈咕、嗯嗯！…哈啊…哈啊~…啊~…呜呜！」`);
            await era.printAndWait(
              `${target_name}因为破瓜之痛皱紧了眉头，然而两条有力的美腿却紧紧扣住了${player_name}的腰背。`,
            );
            await era.printAndWait(
              `「唔咕、不、不要拔出来…哈啊..哈啊..你的肉棒..一跳一跳的说想要更多呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `「终于…和别人一样了…把人家的肉穴用大肉棒插进来…咕啾咕啾的调教成魔王专用穴吧！啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的腰肢战栗着，无视还在流血痉挛的肉壁，甜媚的向${player_name}求欢着………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊啊…我明白了…清清楚楚的感受到了呢…啊嗯…被、被你的大肉棒插进来的话…魔力在我的身体中…啊呀${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}面色潮红的展开了魔族的翅膀，温柔的包住了${player_name}，轻轻在背上摩擦着。从翅膀上放射出来的魔力让这个小小空间的温度变得更温暖了。`,
            );
            await era.printAndWait(
              `「唔呼呼…转化魔族这种事情都做了…不是已经只能服从你了嘛…${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊…稍微还有点辛苦呢，要更温柔的对待人家啊…毕竟人家已经是你的所有物了…啊~…哈嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}带着幸福的微笑，用双手爱恋的抚摸着${player_name}的脸颊。`,
            );
            await era.printAndWait(`于是${player_name}轻缓的开始了抽插………`);
          } else {
            await era.printAndWait(
              `${target_name}因为破瓜之痛皱起了眉头，抱着${player_name}肩膀的十指不禁用力，微微陷入了肌肉中。`,
            );
            await era.printAndWait(
              `「啊啊！哈咕…唔~…人家还撑得住…啊啊…嗯~…！」`,
            );
            await era.printAndWait(
              `${target_name}用为强烈的痛楚呼吸都有些颤抖了，她一边努力的吐气放松身体，一边尽量分开了双腿，好让${player_name}插得更深一些。`,
            );
            await era.printAndWait(
              `「哈啊哈啊…和你在一起、很开心呢…嗯…这样、呜、这样一来…人家就是你的东西了…啊啊～！」`,
            );
            await era.printAndWait(
              `${player_name}慢慢的动着腰，让${target_name}处女穴内慢慢染上了肉欲的气味………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}双脚青蛙一样被打开着，娇小的身体好像要被压碎一样。`,
          );
          await era.printAndWait(
            `「啊啊…好、好难受…疼…好疼啊…请温柔些…哈啊！」`,
          );
          await era.printAndWait(
            `${player_name}无视了${target_name}的抗议声开始抽插。${target_name}膣壁像要把入侵者挤出去一样，用力的收缩着`,
          );
          await era.printAndWait(
            `「噫～！啊啊啊啊…不要再动了…求你…呀啊～！」${player_name}无慈悲的继续征伐着`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊嗯…在更强力的侵犯我啊…啊啊～…大肉棒插得好深…哈呀${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}双脚缠着${player_name}的腰淫荡的前后摇动着，贪求着肉棒的快乐………………`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…${player_name}果然很温柔呢…好高兴…啊…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}像对待恋人一样，温柔的抱着${target_name}，慢慢地开始了抽插………`,
          );
        } else {
          await era.printAndWait(`「哈啊哈啊…啊嗯…嗯…再稍微慢一点…啊啊！」`);
          await era.printAndWait(
            `${player_name}压住${target_name}不断痉挛的娇小身体、激烈的摆着腰部蹂躏着多汁的肉穴………`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `${player_name}抓住${target_name}的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着${target_name}被迫凸起的肉穴猛地捅了进去，尽根没入。`,
          );
          await era.printAndWait(
            `「哈啊～！插到了好深的地方了…更多…更多的侵犯人家的肉穴，把里面弄坏掉吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}好像坏掉的飞机杯娃娃一样被相对她私处巨大的多的肉棒侵犯着、然而这幅不可思议的邪淫光景却让每个目击者的心中都燃起了情欲的火苗。`,
          );
          await era.printAndWait(
            `「嗯~…啊嗯~…啊啊～…噫嘿…${heart(1)} 被大肉棒操好爽…啊哈哈${heart(1)}」${target_name}已经射得半软的扶她肉棒随着激烈的抽插甩动着，在两人的肉体上撞出“啪叽啪叽”的淫靡水音`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…${heart(1)} …啊啊～…人、人家已经…只要有肉穴就能活下去了！变成肉穴脑了啊${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊～…啊～…啊嗯～…哈啊${heart(1)} 啊啊～${heart(1)} 啊啊…肉棒~肉棒全部插进来${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}向着${player_name}分开双腿，湿润的肉壁蠕动着、邀请着粗硬的男性器。`,
          );
          await era.printAndWait(
            `就像被${target_name}捕食了一样、${target_name}的阴茎带着湿粘的水声完全被${target_name}吞入了。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「更多…啊啊～…让人家的淫乱小穴更多的舒服起来吧${heart(1)} 啊啊～…要去了…要去了了${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}拥抱着${player_name}一根硬硬的东西搁在了两人的腰腹间。${target_name}的扶她肉棒完全勃起了。`,
          );
          await era.printAndWait(
            `「唔呼呼、被你的肚子摩擦着，人家的肉棒也要高潮了…啊嗯～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊～…就这样射在咱们之间吧…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的阴茎随着${player_name}抽插肉穴的节奏一抽一抽的痉挛着。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…啊～…人家的小穴…和人家的肉棒…呀啊..哪一边会先高潮呢…啊啊～${heart(1)}」`,
            );
          }
        }
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `${player_name}抓住${target_name}的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着${target_name}被迫凸起的肉穴猛地捅了进去，尽根没入。`,
          );
          await era.printAndWait(
            `「啊嘿嘻嘻…肉、肉棒插得好深…啊啊～…嗯啊啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}轻缓的开始了抽插。${target_name}阴道最深处被爱人疼爱着发出了甜美的娇喘。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊嘿～…噫嗯～…哈…这、这样子…好舒服…好舒服的说…啊啊～${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `${player_name}温柔的抱着${target_name}，慢慢地开始了抽插。`,
          );
          await era.printAndWait(`「啊啊…你的身体…好温暖…啊啊…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}慵懒的趴伏在${player_name}的身上，随着抽插轻笑着玩弄着${target_name}的乳头。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊…明明只是这样慢慢地动…腰以下好像要融化掉了…人、人家已经…不行…啊啊啊…………${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}拥抱着${player_name}一根硬硬的东西搁在了两人的腰腹间。${target_name}的扶她肉棒完全勃起了。`,
          );
          await era.printAndWait(
            `「讨、讨厌…这种时候…不过因为太舒服了也没办法嘛…真是的…不要看啦……」${player_name}很害羞的用双手捂着自己的肉棒，像花栗鼠一样鼓起了脸颊`,
          );
          await era.printAndWait(
            `被${target_name}的可爱表情虏获、${player_name}不禁加快了抽插的速度。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…嗯～…哈啊～…啊啊～…虽然肉棒也很舒服…但是果然还是这边比较…哈啊～…啊啊～${heart(1)}」`,
            );
          }
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${player_name}抓住${target_name}的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着${target_name}被迫凸起的肉穴猛地捅了进去，尽根没入。`,
        );
        await era.printAndWait(
          `「啊嘿噫～！太深了…啊啊～…这、这样子插的话人家…啊啊啊～…啊嘿～…噫～！」`,
        );
        await era.printAndWait(
          `${target_name}被彻底开发的腔穴中、好像要烧坏神经的激烈快感肆虐着………`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕…这个姿势太令人害羞了…啊～…啊嘿～…好深…插到底了！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着${target_name}被迫凸起的肉穴猛地捅了进去，尽根没入………`,
        );
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊～…稍、稍微温柔一…啊～…咕～…唔啊…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}压制着、如打桩机一样的肉棒激烈的抽插着肉穴………`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊啊～…插进来了！热热的大肉棒插进来了…啊啊～…哈啊～…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `破瓜的疼痛和感动让${target_name}背上的翅膀“啪唰”地张开了。`,
            );
            await era.printAndWait(
              `「嗯～…啊嗯～…啊啊～…更多…更多地把魔力灌进来…在人家的魔族身体里…染上你的颜色吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}抓着${target_name}纤细的腰肢把大量的魔精叩了进去。`,
            );
            await era.printAndWait(
              `「啊啊啊～～！子宫里面…啊啊～要变成笨蛋了…要被魔力精子侵犯成中出笨蛋了${heart(1)}」`,
            );
          } else {
            await era.printAndWait(`「啊啊～…！噫…好深的说…啊啊～…啊～！」`);
            await era.printAndWait(
              `${player_name}抓着${target_name}纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了，${player_name}露出了嗜虐的微笑，继续加大着力量。`,
            );
            await era.printAndWait(
              `「嗯哈啊…啊啊～…突然…全部…插进来什么的${heart(1)} 唔啊…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊…这么激烈的也好舒服…啊啊…插进来…全部插进来…呜呜${heart(1)}」${target_name}流着泪狂乱的叫着，嘴角却不可抑制的上扬着`,
            );
            await era.printAndWait(
              `片刻之前还是处女么，完全看不出来啊。听着${target_name}淫靡的叫声，${target_name}不禁冒出了这样的念头………………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊啊～…这个就是爱的、羁绊…啊啊～…哈啊～…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `破瓜的疼痛和感动让${target_name}背上的翅膀“啪唰”地张开了。`,
            );
            await era.printAndWait(
              `「嗯～…啊嗯～…啊啊～…更多…更多地把魔力灌进来…在人家的魔族身体里…染上你的颜色吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `「嗯..从今天起..人家绝对不要再和${player_name}分开了…啊啊…${player_name}大人…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}腔口痉挛着绞住了${player_name}的肉棒，仿佛也在吐露着主人的依恋………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊～…突然就…这么激烈的…啊嗯～…稍微温柔点啦…啊啊～！」`,
            );
            await era.printAndWait(
              `${player_name}抓着${target_name}纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了。`,
            );
            await era.printAndWait(
              `「啊～…啊啊啊～…你的东西全部插进来什么的不可能啦…咕啊～…不要、再进去的话会变得…啊啊～人家的肉穴要坏掉了啊」`,
            );
            await era.printAndWait(
              `${target_name}发出了痛苦的喉音。这幅娇弱无力的姿态更加刺激了${player_name}的嗜虐心。`,
            );
            await era.printAndWait(
              `「要死掉了…人家要死掉了…啊啊…啊啊啊啊啊………」${target_name}痛苦的承受着雄性器的蹂躏，然而魔族的坚韧肉体正一点一点的适应着粗大的肉棒`,
            );
          }
        } else {
          await era.printAndWait(
            `${player_name}抓着${target_name}纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了。`,
          );
          await era.printAndWait(
            `「啊嘿～…嘎噫～…！停下来～…再这样往里插的话～…要进到不能进去的地方了…啊啊～…好、好痛啊…噫嘿！」`,
          );
          await era.printAndWait(
            `${player_name}强硬的将整根性器全部塞入了${target_name}娇嫩的处女穴。看着${target_name}因为破瓜和腔壁扩张泪流满面的表情，${player_name}嗜虐心的到了满足。`,
          );
          await era.printAndWait(`「噫…啊啊啊～…不、已经…不行…不行了啊啊！」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「唔呼呼…哈啊…这种被侵犯的感觉最喜欢了…人家一直期待这呢…啊啊嗯～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}可爱的小屁股摇摆着，期待着更多的性爱………`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…嗯～…看不到魔王大人的脸…有些害怕呢…啊啊～…嗯～…好深…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抓着${target_name}纤细的腰肢大力抽插着、让她漏出了甜美的叫声………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…不要插得太深…很痛的…啊啊～…啊～！」`,
          );
          await era.printAndWait(
            `${target_name}娇小的身体被从后面贯穿、发出了痛叫………`,
          );
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊～…啊嗯～…想要你的全部…啊啊～…整根插进来…啊啊～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然这么说着，身材娇小的${target_name}的蜜穴也很浅、${player_name}的肉棒只插入一半多就撞到了一块软肉。`,
          );
          await era.printAndWait(
            `「啊嘿～…噫～…最深处被插到了…啊～…啊啊～…嗯～…还想..再进来一些..a 啊～${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「再往里面一些…啊啊～…隔着肚子也可以感觉到鸡鸡在里面呢～${heart(1)}」相对巨大的肉棒将${target_name}下腹撑得隆起，${target_name}带着淫乱的笑容抚摸着被肉棒撑起的部分`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯～…呜噗 被强行插进来好爽…呃啊～…再往里面插啊…${heart(1)}」${target_name}娇小的身体猛地被从后面贯穿、腹腔压力的急剧变化让她发出了呕吐的声音 ………`,
          );
          await era.printAndWait(
            `${target_name}纤细的腰肢被双手扣住，粗大的肉棒在她湿润的肉穴里快速的进出着。小小的身体和粗大的性器总是能勾起侵犯者强烈的背德感，和她淫荡的扭腰动作结合在一起，产生出怪异的淫乱氛围。`,
          );
          await era.printAndWait(
            `「啊啊～…啊～…啊啊～${heart(1)} 最、最里面…进去了…啊嘿～…噫~～${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…要去了…要去了！！…子宫肉穴要去了！！${heart(1)}`,
            );
          }
        } else {
          await era.printAndWait(
            `${player_name}在${target_name}的穴口处像蜻蜓点水一样用龟头轻浅的抽插着。被快感地狱折磨的${target_name}口中吐出了发狂一般的娇声。`,
          );
          await era.printAndWait(
            `「哈呀…哈啊啊…啊嘿～${heart(1)} …噫啊啊啊～…咕啊～啊呜～…啊啊啊啊～～${heart(1)}」零碎的的声音从${target_name}吐着小舌头的樱唇中漏出`,
          );
          await era.printAndWait(
            `可爱的小屁股因为太多次的高潮而痉挛着、然而${player_name}还是紧紧抓着${target_name}纤细的腰肢丝毫没有放过的意思。`,
          );
          await era.printAndWait(
            `「嗯嘿～…噫～啊啊～…${heart(1)} 呀啊～啊～啊啊～${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「够、够了吧！…用力插进来！…这样子吊着胃口什么的还不如…啊～…啊啊哈哈哈～${heart(1)}」${player_name}猛地尽根没入，强烈的快感让她像被电击一样弓起了背`,
            );
          }
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊～…要是人家的身体能在大一些的话…嗯嗯..大一点的话…就能全部接受你的爱了的呢…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然这么说着，身材娇小的${target_name}的蜜穴也很浅、${player_name}的肉棒只插入一半多就撞到了一块软肉。`,
          );
          await era.printAndWait(
            `「啊啊～…不用在意人家，尽量的插进来…啊啊～…按你喜欢的侵犯人家吧～${heart(1)}」」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…啊嗯～…嗯～…噫～…啊啊～！最深处也插进来${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊～…不行了…嗯～…好可怕…这么舒服什么的，人家会变成什么样子…啊啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抓着${target_name}不让她逃走，肉棒像打桩机一样暴力的向肉穴注入着快感。`,
          );
          await era.printAndWait(
            `「哈啊啊～…啊咕～…嗯～啊啊…被、被这样侵犯的话人家…人家会…啊啊～！」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「变得奇怪了…要变得奇怪了…人家的小穴要变得奇怪惹（了）${heart(1)}」${target_name}双眼翻白，口齿不清的淫叫着`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊～…啊～…啊嗯～…唔嗯…穴口处被扑哧扑哧的磨蹭着…哈啊啊…好棒…嗯～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}在${target_name}的穴口处像蜻蜓点水一样用龟头轻浅的抽插着。被快感淹没的${target_name}口中吐出了甜媚的娇声。`,
          );
          await era.printAndWait(
            `「哈啊…呀…啊啊～…嗯～…嗯～…啊啊～…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊…就这样…一下子插进去${heart(1)} 让人家高潮吧${heart(1)}」`,
            );
          }
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊～…嗯～…呼哈哈…啊嗯～…啊～…啊啊～♪」`);
        await era.printAndWait(
          `${target_name}被从后面侵犯着吐出了呻吟声、膣内每次被侵犯，${target_name}的小屁股总是颤抖着紧紧勒住入侵者。`,
        );
        await era.printAndWait(
          `「啊啊～…啊～…哈啊…哈啊…啊呜～…嗯～…人家…喜欢这个姿势…啊啊～…好像被充满了啊啊～♪」`,
        );
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔…咕～…啊啊…啊嗯～…嗯～嗯呼…呜呜～！」`);
        await era.printAndWait(
          `${target_name}被从后面侵犯着露出了痛苦的表情，不过却咬着嘴唇忍耐着。`,
        );
        await era.printAndWait(`看来必须更加的开发啊………`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊～…啊啊～…不行…还很痛的说…嗯～…啊…啊啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}被从后面侵犯着，不时漏出一声闷哼。`,
        );
        await era.printAndWait(`好像还没被开发出快感的样子………`);
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (kojo.对面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊～…啊嗯～…比想象的还要爽啊，这个…哈啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `抱着${target_name}抽插的${player_name}感觉一个炽热的棒状物在胸腹间越变越大，膨大的尖端在脐间蹭出一条黏糊糊的水痕。`,
          );
          await era.printAndWait(
            `「唔呼呼、抱歉啦，人家太兴奋了嘛…呀啊…不要掐它啊…${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊、被这样抱着做…嗯～…啊…啊啊${heart(1)} 好温暖呢…唔呼呼${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}感觉一个炽热的棒状物在胸腹间越变越大。`,
          );
          await era.printAndWait(
            `「啊、请、请不要在意…因为和亲爱的做实在太舒服了、哈啊…稍微变得兴奋过头呐${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊…哈、啊啊啊…插到了好深的地方…嗯～…唔…咕～！」`,
          );
          await era.printAndWait(
            `${target_name}对${player_name}的肉棒有些承受不住的样子………`,
          );
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `抱着${target_name}抽插的${player_name}感觉一个炽热的棒状物在胸腹间越变越大。`,
          );
          await era.printAndWait(
            `「啊嗯～…对不起啦${heart(1)} 在你的肚子上擦来擦去太爽了所…啊啊～${heart(1)}呀哈哈 饶了人家吧」`,
          );
          await era.printAndWait(
            `${player_name}听到${target_name}毫无诚意的道歉稍稍沉默了一会，然后猛地扣住了${target_name}的屁股开始快速抽插起来。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「噫嗯～${heart(1)} 对不起…啊啊～…人家再也不恶作剧了…啊啊～${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `${player_name}用单手禁锢${target_name}双臂猛烈的摆着腰。`,
          );
          await era.printAndWait(`「嗯～…啊啊～…好爽…小穴好爽…${heart(1)}」`);
          await era.printAndWait(
            `「啊啊～…更多…还想要更多的说…啊啊～…更多的插进来${heart(1)}噫噫！肉棒不行！超敏感的所以咿呀啊啊啊」`,
          );
          await era.printAndWait(
            `${target_name}的扶她肉棒被一只有力的手握住了，${player_name}抓着${target_name}的双手不让她逃走，肉棒像打桩机一样暴力的向肉穴注入着快感。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「要融掉了…小穴和肉棒都要溶掉了…啊啊～…这样好爽${heart(1)} 好爽所以怎么样都好啦${heart(1)}」`,
            );
          }
        } else {
          if (chara(target).train.初吻对象 >= 0) {
            await era.printAndWait(
              `感动到极点的${target_name}狂乱的和${player_name}舌吻着。`,
            );
            await era.printAndWait(
              `「嗯呣…嗯～…噗啾…呼啊啊…啊啊～…要去了要去了要去了！${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}积极地扭动着腰品尝着${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「啊啊～…啊嗯～…哈啊…${heart(1)} 腰自己动起来…嘻嘻～${heart(1)}」`,
          );
          await era.printAndWait(
            `「全部…全都是你的错…人家的身体淫乱成这样都是…哈哈 肉棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被高潮快感浸泡的脑髓似乎只能吐出不成句的淫词了。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…小穴不行…已经记住小鸡鸡的味道了…不…不行惹（了）${heart(1)}」`,
            );
          }
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `${target_name}柔软的身子贴了上来，下腹部的扶她阴茎却硬邦邦的撑在了中间。`,
          );
          await era.printAndWait(
            `「啊～…嗯唔…人家的龟头和亲爱的腹部在接吻呢${heart(1)} 啊啊～嗯～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `就这样${target_name}淫靡的摇动着腰，随着扶她肉棒与${player_name}腹肌的摩擦发出了阵阵勾人的轻喘。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…哈啊哈啊…啊啊～…好棒…小穴里面也舒服…啊啊～${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯呼…哈嗯～…哈啊…啊啊…喜欢…喜欢…再多做一些…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}依恋的抱着${player_name}，柔软的胸部摩擦着，湿润的唇瓣在${player_name}的耳边一遍遍呢喃着「喜欢」「我爱你」。`,
          );
          await era.printAndWait(`「啊啊…哈啊…嗯啊～…好棒……啊啊${heart(1)}」`);
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「插到最里面来…啊啊～${heart(1)}…这之上再进去的话…啊啊～${heart(1)} 」`,
            );
          }
          if (chara(target).train.初吻对象 >= 0) {
            await era.printAndWait(
              `${target_name}娇憨的一次次向${player_name}索吻着………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊～…从、从下面突然…啊嗯～…嗯～…不、不行${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的下面遭到突袭、不禁眼神迷离的张开了嘴。`,
          );
          await era.printAndWait(
            `「再、再更激烈的话…啊啊～…啊…哈啊～…嗯～…啊啊～${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「不行、啊～哈啊～…嗯～！小穴要坏掉了…哈啊～${heart(1)}」`,
            );
          }
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～嗯～…嗯～…嗯～…啊啊～…这个…说不定也很舒服…嗯～啊啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}的腰一次次的向上突刺着。`,
        );
        await era.printAndWait(`「啊啊～…嗯～…啊啊…哈…嗯～…啊啊～♪」`);
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊～…嗯～…还稍有有点难受…啊～…嗯～啊啊啊～」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}紧紧抱住，从下面不断的侵犯着………`,
        );
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈、唔嗯…嗯…啊啊…好难过…请稍微手下留…啊啊～」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}侵犯着好像很痛苦的呻吟着………`,
        );
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (kojo.背面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「咕哈～！…啊啊啊～…因为肉棒被撸着完全不痛呢～…啊哈哈～哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从背后一边大力套弄着${target_name}的扶她肉棒、一边一次次的用腰向上突刺蹂躏着刚破瓜的肉穴。`,
          );
          await era.printAndWait(
            `「再来…把人家的肉棒和小穴都玩坏吧…啊啊～…啊～…噫～${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「唔呼呼～…嗯～…这样被抱着…好像小孩子一样呢～${heart(1)} 呐~～…亲爱的就这样插进来～…啊啊～…哈呜～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像小孩子一样撒着娇，用软软的双手引导着${player_name}的性器插入了自己的处女穴。`,
          );
          await era.printAndWait(
            `「啊啊～…人家的纯洁终于…${heart(1)} 啊啊…已经…不行了…要去了…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嘎啊～…这么深的…明、明明是第一次的说… 咿呀啊～…那、那边不行！」`,
          );
          await era.printAndWait(
            `${player_name}从背后一边抽动着一边大力套弄起${target_name}的扶她肉棒，让刚刚破瓜的${target_name}发出了苦闷的叫声`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呀唔～！…啊啊啊～…不要这样撸人家的肉棒啊～…啊～哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从背后一边大力套弄着${target_name}的扶她肉棒、一边一次次的用腰向上突刺蹂躏着娇小的肉穴。`,
          );
          await era.printAndWait(
            `「这样…太激烈了…啊啊～…啊～…啊啊～${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊～…嗯～…哈啊…啊啊～${heart(1)} 啊啊～…被这样触摸的话…人家啊嗯～…啊啊～…哈呜～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从背后一边大力套弄着${target_name}的扶她肉棒、一边轻柔的研磨着${target_name}的肉壁。`,
          );
          await era.printAndWait(
            `「啊啊～…这样好舒服…${heart(1)} 啊啊…已经…不行了…要去了…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…这么深好难过…诶、稍微轻松点了呢… 谢咿呀啊～…那、那边不行！」`,
          );
          await era.printAndWait(
            `${player_name}从背后一边抽动着一边大力套弄起${target_name}的扶她肉棒。`,
          );
          await era.printAndWait(`「嗯～…唔嗯～…已、已经～…啊啊～…不要啊………」`);
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `${player_name}从背后一边大力套弄着${target_name}的扶她肉棒、一边一次次的用腰向上突刺蹂躏着娇小的肉穴。`,
          );
          await era.printAndWait(
            `「啊嘿噫～${heart(1)} 更多的玩弄人家的扶她肉棒吧${heart(1)} 啊啊～…好爽～被撸肉棒好爽哦哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被两方传来的快感刺激的两眼翻白、腰像折断一样激烈的向后仰着，带着没品的笑容发出了野兽般的叫声。`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊噫…咿…哈啊啊啊啊～…要去了…要去了！…人家的肉棒和肉穴要一起去了${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊嗯～…嗯啊…哈呜～… 啊啊啊…胸部也被侵犯了…啊啊～…${heart(1)} 啊～…啊啊～猛地插上来了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}小小的身体被抱着、无数次的被粗大的阴茎向上穿刺着。轻软的身子脱力一般的摇晃着，头发从${player_name}鼻尖擦过，散发出混着汗味的发香。`,
          );
          await era.printAndWait(
            `「啊啊～…哈啊啊…人家…人家…明明被这样干着…却超有感觉的说…噫哈哈～…啊啊${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `${target_name}被完全开发的蜜穴把${player_name}肉棒尽根吞吐着、仿佛无尽的快感在两人交合的性器间循环。………`,
            );
          }
        } else {
          await era.printAndWait(
            `「在激烈一点…啊～…哈啊啊～${heart(1)} 噫嗯～…咿～…啊嘿噫～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的双手从${target_name}的背后伸过来揉着敏感的乳肉。像要把${target_name}揉进自己身体里一样紧紧抱着，肉棒尽根没入。`,
          );
          await era.printAndWait(
            `「啊～…胸、连胸部也…啊嗯～${heart(1)} 好舒服…再来…再来啊${heart(1)} 啊啊${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～…已…已经不行了～…小穴被搅动着…去了…去了～…去了～～～～${heart(1)}」`,
            );
          }
        }
        if (
          era.get(`tequip:${target}:57`) &&
          era.get(`abl:${target}:17`) >= 1
        ) {
          await era.printAndWait(
            `「人家的肉棒已经硬邦邦的了呢${heart(1)} 啊啊～…肉棒是这样子插进来的啊…明明很害羞..但是好爽啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}看着镜子里映出的自己的痴态兴奋起来了………`,
          );
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「噫呀～…还、还要…从后面这样摸…啊嗯～…啊啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从背后一边大力套弄着${target_name}的扶她肉棒、一边轻柔的研磨着${target_name}的肉壁。`,
          );
          await era.printAndWait(
            `「诶？…唔嗯、就是这样、从后面插进来同时玩弄人家的小鸡鸡的话…啊啊～${heart(1)} 舒服过头了…马上就要去了..呜${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「在、再继续下去的哈…啊啊～…两边都要去了…去了${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊～…啊嗯～…嗯～…哈啊哈啊…哈啊啊～…这样突刺上来…好棒～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边被揉胸一边被从后面抽插着、发出了急促的喘息声。`,
          );
          await era.printAndWait(
            `「啊、唔啊～…啊啊～…啊、啊啊哈～${heart(1)} 更多的欺负人家…乳头也好那里也好小、小穴也呜${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `${target_name}被彻底开发的小穴滋咕兹咕的响着、感受着${player_name}的肉棒给予的快乐………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊～…被紧紧抱着感觉很好呢…啊嗯～…嗯～…啊啊…再来…甜甜蜜蜜的…让人家融化掉吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}露出了撒娇小猫一般的恍惚表情，被${player_name}从后面侵犯着，发出了呼呼的甜美喉音。`,
          );
          await era.printAndWait(
            `「哈啊啊…${heart(1)} 真、真的要…变得离不开你了～…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯啊…啊～…嗯、就这样唷～${heart(1)} 被亲爱的疼爱着呢${heart(1)}」`,
            );
          }
        }
        if (
          era.get(`tequip:${target}:57`) &&
          era.get(`abl:${target}:17`) >= 1
        ) {
          await era.printAndWait(
            `「啊啊…人家的…勃起成这样了…轻轻碰一下的话.哈啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}看着镜子里映出的自己的痴态兴奋起来………`,
          );
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…啊嗯～…嗯～…再来干我…干我啊…♪ 啊嗯～…唔啊…啊啊～♪」`,
        );
        await era.printAndWait(`${target_name}自己摇动着腰贪求着快感。`);
        await era.printAndWait(`「嗯～…啊啊～…好深…啊啊～…就是这里…啊啊～♪」`);
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊啊～…摸得话倒是可以…嗯～…再温柔一点…呼啊…啊啊～」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}从背后拥抱爱抚着，发出了叹息………`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「嗯～…好、好难受…哈啊～…在、在摸哪里啊…啊啊～！」`,
        );
        await era.printAndWait(`「已、已经…够了吧…哈啊啊～…啊咕！」`);
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 24) {
    if (kojo.逆强奸 == 0) {
      if (era.get(`talent:${target}:1`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「唔呼呼、这样就算童真毕业了呢………这种时候应该说句谢谢吗？」${target_name}感受着被腔肉包裹的快感，露出了淘气的笑容`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呼、人家的肉棒童贞也是魔王大人的东西了呢…啊啊～…好高兴！」${target_name}露出非常感动的表情，肉棒在腔内一跳一跳的，`,
          );
        } else {
          await era.printAndWait(
            `「唔…啊…插进女人的身体里…还是第一次…啊啊～！」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊～…你的肉穴里面…超级舒服的说${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊～…嗯～…好棒…啊啊～…讨厌…这样下去很快就要在里面出来了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊哈啊…啊、没想到也有侵犯你的一天…嗯啊～」`,
          );
        }
      }
      // CFLAG:325  = 1（变量语义：CFLAG 族，325）
      kojo.逆强奸 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.逆强奸 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯～…啊啊～…没想到侵犯女人的身体是这么舒服的事情…嘿！嘿！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的口水啪嗒啪嗒的落在${player_name}汗湿的裸背上、发出野兽一样的喘息从背后突刺着${player_name}的阴户。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊啊～…肉穴最高！啊～…啊啊～…你的肉穴太舒服了…哈啊${heart(1)} 啊啊嗯～${heart(1)}」`,
        );
        // CFLAG:325  = 5（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.逆强奸 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊……更多的疼爱你吧、唔呼呼、把主导权让给人家的话…已经有觉悟了吧～啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}小恶魔般的轻笑着从${player_name}身后激烈的侵犯着她。`,
        );
        await era.printAndWait(
          `「啊嗯～…哈啊嗯～…你的膣内…好棒…啊啊～${heart(1)}」`,
        );
        // CFLAG:325  = 4（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:0`) >= 3 &&
        (kojo.逆强奸 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊～…苏浮啊…哈啊哈啊…嗯啊～…腰、停不下来…哈啊～！」`,
        );
        await era.printAndWait(
          `${target_name}抓着${player_name}丰满的屁股像发情的狗一样激烈的动着腰………`,
        );
        // CFLAG:325  = 3（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 3;
      } else if (kojo.逆强奸 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「人家竟然把你侵犯了什么的…之前完全想不到～…啊啊～…呀啊～！」`,
        );
        await era.printAndWait(
          `${target_name}被肉棒传来的激烈快感虏获，拼命地抽插着………`,
        );
        // CFLAG:325  = 2（变量语义：CFLAG 族，325）
        kojo.逆强奸 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 25) {
    if (kojo.逆肛门强奸 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯～…哈呼…你的肛穴…紧紧地贴上来了…哈啊～${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔呼呼、人家就不客气的进去了…啊～…好厉害…啊啊…人家的肉棒被紧紧的绞住…呀啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「被人家侵犯肛门还会高兴什么的…你真的是…啊～…不要、吸得这么啊嗯～！」`,
        );
      }
      // CFLAG:326  = 1（变量语义：CFLAG 族，326）
      kojo.逆肛门强奸 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.逆肛门强奸 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊嗯～…哈啊～…你的屁股穴里超舒服${heart(1)} 来吧来吧、更多地发出下流的声音${heart(1)}」`,
        );
        if (era.get(`talent:${player}:122`)) {
          await era.printAndWait(
            `「即使是男人、屁股被插的很舒服的话，叫出来也没关系唷${heart(1)} 来吧来吧${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}像强奸似的大力抽插着${player_name}的肛门。`,
        );
        await era.printAndWait(
          `「咕噢${heart(1)}…完美的吸上来了…哈啊～不妙、好像要上瘾了…${heart(1)}」`,
        );
        // CFLAG:326  = 5（变量语义：CFLAG 族，326）
        kojo.逆肛门强奸 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.逆肛门强奸 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔呼呼、不会感到疼痛的…温柔的疼爱你吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像蛇一样妖艳的舔着嘴角，缓缓地开始侵犯${player_name}的肛门。`,
        );
        await era.printAndWait(
          `「啊啊…人家也渐渐舒服起来了呢${heart(1)} 呼啊啊~${heart(1)}」`,
        );
        if (era.get(`talent:${player}:122`)) {
          await era.printAndWait(
            `「呐~来嘛…无聊的自尊什么的丢掉后…你也能发出这么可爱的声音呢…唔呼呼」`,
          );
        }
        // CFLAG:326  = 4（变量语义：CFLAG 族，326）
        kojo.逆肛门强奸 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:0`) >= 3 &&
        (kojo.逆肛门强奸 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好舒服…啊啊～…你的肛穴里面好舒服！」`);
        await era.printAndWait(
          `${target_name}抓着${player_name}丰满的屁股像发情的狗一样激烈的前后摆着腰。`,
        );
        await era.printAndWait(`「啊啊～…穴肉紧紧的绞着人家…啊啊嗯～！」`);
        if (era.get(`talent:${player}:122`)) {
          await era.printAndWait(`「来嘛来嘛…你也叫出声来！…啊～噫啊嗯～！」`);
        }
        // CFLAG:326  = 3（变量语义：CFLAG 族，326）
        kojo.逆肛门强奸 = 3;
      } else if (kojo.逆肛门强奸 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哈啊哈啊…啊～…嗯～…你的肛门好棒…啊啊～」`);
        if (era.get(`talent:${player}:122`)) {
          await era.printAndWait(
            `「明明长着男性器！肛门被挖着也有感觉了吗、唔呼呼」`,
          );
        }
        await era.printAndWait(
          `${target_name}拼命地动着腰，扶她肉棒在${player_name}的肛门里进出着………`,
        );
        // CFLAG:326  = 2（变量语义：CFLAG 族，326）
        kojo.逆肛门强奸 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (kojo.正常位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯～…嗯哈啊～${heart(1)} 屁股穴好舒服…肛穴性爱好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经被开发的肛门像生物一样流着汁液吞吐着肉棒，发出了下流的声音………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…人家的屁股穴…再、再插进来…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}初次肛交的肛门被${player_name}的肉棒贯穿着，已经变成出色的淫肉了呢………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊哈啊…啊～…啊嗯～…屁股明明还是第一次的说…竟然变得这么舒服…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经被开发的肛门被侵犯着，充满爱欲的眼神望向了你………`,
          );
        } else {
          await era.printAndWait(`「就、就算是你…插进这里的话…啊～…啊啊～！」`);
          await era.printAndWait(
            `${target_name}初次肛交的肛门被${player_name}的肉棒贯穿了，让她接下来的话变成了一串呻吟………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊～…啊～…不可能…唔啊啊～…好…舒服…明明是那么脏的地方…啊啊～」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被抽插着，不禁漏出了喘息声………`,
          );
        } else {
          await era.printAndWait(
            `「啊～…那、那里很脏所以不行、明明说过了的…啊啊～！咕～…哈、插进来了…呜啊啊～！」`,
          );
          await era.printAndWait(
            `${target_name}初次肛交的肛门被${player_name}的肉棒贯穿了，不禁发出了痛苦的呻吟………`,
          );
        }
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「呼啊…啊嗯～…啊啊～…啊哈啊～…${heart(1)} 人家的扶她肉棒…因为屁股穴被抽插着兴奋起来了${heart(1)}」`,
          );
          await era.printAndWait(
            `就像${target_name}说的那样，肛门内侵犯的快感让${target_name}完全勃起了、马眼可爱的一开一合着吐出了粘液。`,
          );
          await era.printAndWait(
            `「啊嗯～…啊啊～…再激烈一点…那样的话、呜，人家的屁股穴和肉棒就一起去了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯～…嗯哈啊～${heart(1)} 屁股穴好赞…屁股小穴做爱超喜欢的说${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经被开发的肛门像生物一样流着口水吞吐着肉棒，发出了下流的声音。`,
          );
          await era.printAndWait(
            `「啊啊～…哈啊～…屁股小穴被撑大了…${heart(1)} 把你的东西更多的插进来${heart(1)}」`,
          );
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…人家的屁股穴…插、插进来…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}的肉棒深深地贯入${target_name}的肠道，让她小小的屁股痉挛着………`,
        );
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈～…哈啊～…啊啊…后面被疼爱着…人家的肉棒变得这么精神了呢…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `就像${target_name}说的那样，肠内侵犯的快感让${target_name}完全勃起了、马眼可爱的一开一合着吐出了粘液。`,
          );
          await era.printAndWait(
            `「啊～…哈啊～${heart(1)}…亲爱的大肉棒更多噗滋噗滋的插进来…人家的阴核肉棒也要去了…哈啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊哈啊…啊～…啊嗯～…后面做爱这么舒服的话…脏什么的随便啦…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被爱人干着肛门不禁露出了痴笑。`,
          );
          await era.printAndWait(
            `「呜啊～…啊啊～…你的亲亲肉棒…在肚子里面乱撞呢…哈${heart(3)}！」`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「还、还有点难受呢…啊啊～…很脏的说…啊～…啊呜！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被${player_name}的肉棒贯穿了，不禁发出了痛苦的呻吟………`,
        );
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…哈啊哈啊…嗯～…啊啊～…屁股被侵犯着…却觉得舒服什么的…啊哈啊………」`,
        );
        await era.printAndWait(
          `${target_name}被充分开发的肛门贪婪的吃着肉棒………`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊～…肚子好难过…啊～…停…不要再动了…啊～…哈啊～！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被${player_name}的肉棒贯穿了，不禁发出了痛苦的呻吟………`,
        );
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊…哈啊…啊～…呜啊啊～${heart(2)}明明是第一次的说 从后面被干好舒服…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}纤细的腰被抓着、小巧的肛门被后面粗大的雄性器贯穿了………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…人家的屁股穴…插、插进来了…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的肉棒从后面挤进了${target_name}狭窄的肠道，让她发出了充满色欲的欢叫………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊～…肛门处女丧失…好舒服…啊～…哈啊啊～…更多的侵犯人家的肛门啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}纤细的腰被抓着、小巧的肛门被后面粗大的雄性器贯穿了………`,
          );
        } else {
          await era.printAndWait(
            `「讨、讨厌…啊～…里面很脏的…啊啊～…哈呜、进来了…啊～…啊啊～！」`,
          );
          await era.printAndWait(
            `${player_name}的肉棒深深地贯入${target_name}的肠道，让她小小的屁股痉挛着………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊～…开始习惯了怎么办啊…啊啊～…屁股这么舒服的话…人家要变成变态了…哈啊哈啊…嗯～…啊嗯～」`,
          );
          await era.printAndWait(
            `${target_name}饱受开发的肛穴被从后面侵犯着，${target_name}甜美的喘息伴随着下流的“噗滋噗滋”开生始在房间里回荡………`,
          );
        } else {
          await era.printAndWait(
            `「啊～…啊啊～…屁、屁股那里不行…很脏的…哈啊～…唔咕！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的肉棒贯穿了，不禁发出了痛苦的呻吟………`,
          );
        }
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊…哈啊…啊～…肉棒在直肠里搅来搅去${heart(2)} 再来！再从后面咕哩咕哩的玩弄人家的屁股穴啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}纤细的腰被从后面牢牢地固定着、粗大的肉棒带着黏腻的泡沫抽插着被撑成粉红肉环的菊门，不时发出好像放屁一样的淫猥声音。`,
          );
          await era.printAndWait(
            `「哈噫~${heart(1)}…嘿…噫哈…肛门强暴最高…啊哈哈…耶噫${heart(1)}」${target_name}像狗一样趴跪着，带着下流的痴笑，双手比出了“V”字手势`,
          );
        } else {
          await era.printAndWait(
            `${target_name}小小的身子被从后面抓着举了起来、像用飞机杯一样被大力抽插着肛门。她勃起的扶她肉棒上下摆动着，在自己肚子上甩出一条条白色的污渍`,
          );
          await era.printAndWait(
            `「噢噢${heart(1)} 屁股穴被插超级舒服…射出来、在里面射出来！…把人家的屁股穴变成精液飞机杯吧${heart(1)}」`,
          );
          await era.printAndWait(
            `在${target_name}不知廉耻的大声浪叫中，${player_name}的侵犯继续着………`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…人家的屁股穴…插、插进来…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}的肉棒从后面挤进了${target_name}狭窄的肠道，让她发出了充满色欲的欢叫………`,
        );
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊～…屁股…好舒服…啊～…哈啊啊～…更多的疼爱人家的屁股吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}饱受开发的肛穴被从后面侵犯着，${target_name}甜美的喘息伴随着下流的“噗滋噗滋”开生始在房间里回荡。`,
          );
          await era.printAndWait(
            `「哈啊…啊嗯～…啊～${heart(1)} 啊啊～…啊～…不行～…不行了～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}饱受开发的肛穴被从后面激烈的侵犯着。`,
          );
          await era.printAndWait(
            `「噫…哈…太激烈了…被、被这样弄着的话…人家要变成屁股笨蛋了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}撒娇的扭动着腰肢，${player_name}的龟头被磨蹭着，剧烈的快感让${player_name}不得不放慢了速度………`,
          );
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不、不行…啊～…很脏…啊啊～…不要插进那里…啊～…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}纤细的腰被抓着、小巧的肛门被后面粗大的雄性器贯穿了………`,
        );
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…哈啊～…嗯～…啊啊～…屁股…好～…好、好棒～！」`,
        );
        await era.printAndWait(
          `${player_name}的肉棒深深地贯入${target_name}的肠道，让她小小的屁股痉挛着………`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊～…啊啊～…好疼…很脏的…哈啊～…唔咕！」`);
        await era.printAndWait(
          `${target_name}的肛门被${player_name}的肉棒贯穿了，不禁发出了痛苦的呻吟…………`,
        );
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (kojo.对面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊嗯～…啊啊～…整根都进来了…啊啊～…超级舒服的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}饱经开发的肛门被侵犯着、大口喘息着抱紧了${player_name}………`,
          );
        } else {
          await era.printAndWait(
            `「啊～…虽然有点难受…不过没关系…哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从下面贯穿着${target_name}的肛门让她发出了急促的喘息声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊～…啊嗯～…全部都进来了…哈啊啊～…好高兴、这边可以把亲爱的全部吞进来呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}饱经开发的肛门被侵犯着、大口喘息着抱紧了${player_name}………`,
          );
        } else {
          await era.printAndWait(
            `「啊～…咕…呼、稍微有点辛苦呢…先不要动啦…啊啊～！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的从下面贯穿了，不禁发出了痛苦的呻吟………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「啊啊…哈…啊啊…好舒服…肛门好舒服的说！」`);
          await era.printAndWait(
            `${target_name}饱经开发的肛门被侵犯着、大口喘息着抱紧了${player_name}………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…啊啊…好深～…呜呜～！啊啊～…哦…好痛苦……！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被${player_name}的从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………`,
          );
        }
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊嗯～…啊啊～…整根都进来了…啊啊～…超级舒服的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}饱经开发的肛门被侵犯着、大口喘息着抱紧了${player_name}。`,
          );
          await era.printAndWait(
            `「啊～${heart(1)} 哈～${heart(1)} 再来…更多的插进来…把人家的肛门小穴变成你肉棒的形状吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}勃起的扶她肉棒和小穴汩汩流出的爱液把下腹都打湿了。`,
          );
          await era.printAndWait(
            `「看、变成这个样子全部都是你的原因哦…啊～…啊嗯～…${heart(1)} 啊啊～…因为看到你的大肉棒、湿掉了${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊嗯～…啊嗯～…被你侵犯…人家真是幸福啊…啊～…哈啊啊${heart(1)}」`,
          );
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…虽然有点难受…不过没关系…哈啊～${heart(1)} 嗯～…哈啊～！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被${player_name}从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………`,
        );
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊～…啊嗯～…全部都进来了…哈啊啊～…好棒${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}饱经开发的肛门被侵犯着、发出了淫靡的水声，${target_name}不禁害羞的把头埋进了${player_name}的怀里，从发丝中露出的耳朵都红了。`,
          );
          await era.printAndWait(
            `「屁、屁股这么有感觉都是你的错啦…不许讨厌人家…啊～…啊啊啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}勃起的扶她肉棒和小穴汩汩流出的爱液把下腹都打湿了。`,
          );
          await era.printAndWait(
            `「啊啊～…好害羞…真是的…湿成这个样子、好像在说人家很好色一样…哈噫～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}坏笑着突然向上挺腰、被肉棒突袭的${target_name}发出了可爱的惊叫，一股浓厚的爱液从小穴里挤了出来。`,
          );
          await era.printAndWait(
            `「哈啊～…讨厌…你真是坏心眼…不原谅、呜呜呜${heart(1)}」生气的${target_name}像花栗鼠一样鼓起脸颊，被${player_name}强硬的舌吻了`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～…全部都进来了…咕、啊…啊啊～…被撑的太大啦…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被${player_name}从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊～…啊嗯～…哈啊哈啊…啊～…好深…啊～…啊啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}饱经开发的肛门被侵犯着、大口喘息着抱紧了${player_name}………`,
        );
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「对不起…好痛苦…请饶了、啊～哈啊～…嗯咕～！」`);
        await era.printAndWait(
          `${target_name}的肛门被${player_name}从下面贯穿着，发出了痛苦的呻吟声………`,
        );
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (kojo.背面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈噫啊～…啊～…哈啊啊～…这个姿势好危险…不行…欺负肉棒不行…太有感觉了啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声………`,
          );
        } else {
          await era.printAndWait(
            `「咕唔…好深…好像直接插到脑袋里面惹${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从下面贯穿着${target_name}的肛门让她发出了色情的喘息声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「这、这个刺激太强了…啊～…亲爱的…坏心眼…哈啊～…噫～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声………`,
          );
        } else {
          await era.printAndWait(`「求你了…再温柔一点…啊啊～…哈呜…咕～」`);
          await era.printAndWait(
            `${player_name}从下面贯穿着${target_name}的肛门让她发出了苦闷的呻吟声………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊～…不行…一边撸着肉棒…哈啊～…一边侵犯着人家肛门什么的……！」`,
          );
          await era.printAndWait(
            `${target_name}被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声………`,
          );
        } else {
          await era.printAndWait(`「果然还是不行…哈啊～…咕…呜呜呜」`);
          await era.printAndWait(
            `${player_name}从下面贯穿着${target_name}的肛门让她发出了苦闷的哼声………`,
          );
        }
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈咿啊～…啊～…哈啊啊～…两边同时…不行…不行的说…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声。`,
          );
          await era.printAndWait(
            `「要去了${heart(1)} …一边咻咻射精着一边肛穴sex去了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊嗯～${heart(1)} …啊～…啊啊啊～…啊…哈啊～…这样…被掰开的话…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抱着${target_name}，把她的双腿大大分开、一次又一次向${target_name}的肛门突刺着。`,
          );
          await era.printAndWait(
            `「全部被看见了${heart(1)} …硬邦邦肉棒也好、小穴也好…全都被看到了…啊哈啊～…又去了！好像要疯掉一样去惹（了）${heart(1)}」`,
          );
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕唔…好深啊…脑袋里好像‘咚’得被顶了一下呢${heart(1)}唔呼呼」`,
        );
        await era.printAndWait(
          `${player_name}从下面贯穿着${target_name}的肛门让她发出了煽情的笑声………`,
        );
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「这、这样太刺激了…啊～…哈啊～…噫${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声。`,
          );
          await era.printAndWait(
            `「啊呜…${heart(1)} 被魔王大人这样玩弄的话…哈啊～…要出来了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊嗯～…啊～…啊啊啊～…哈…哈啊～…这样…被掰开的话…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抱着${target_name}，把她双腿大大分开、一次又一次向${target_name}的肛门突刺着。`,
          );
          await era.printAndWait(
            `「啊～…哈啊～…亲爱的想要的话、全部见看光光吧…人家的肉棒也好…那里也好…后、后面也好…啊啊～${heart(1)}」`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「亲爱的…再温柔一点…啊啊～…哈呜…咕～」`);
        await era.printAndWait(
          `${player_name}从下面贯穿着${target_name}的肛门让她发出了苦闷的呻吟声………`,
        );
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…不行…一边撸着肉棒…哈啊～…一边侵犯着人家肛门什么的……！」`,
        );
        await era.printAndWait(
          `${target_name}被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声。`,
        );
        await era.printAndWait(
          `「啊～…呜啊～…舒服过头…要疯掉了…哈啊～…啊啊～！」`,
        );
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「果然还是有点…哈啊～…咕…辛苦…哈啊～」`);
        await era.printAndWait(
          `${player_name}从下面贯穿着${target_name}的肛门让她发出了苦闷的哼声………`,
        );
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }

      if (
        era.get(`tequip:${target}:57`) &&
        era.get(`abl:${target}:17`) >= 1 &&
        era.get(`talent:${target}:85`)
      ) {
        await era.printAndWait(
          `「明、明明是不要脸的事情…却移不开眼睛…啊嗯～…啊～…哈啊～…人家的屁股穴…被肉棒搅动的样子…哈啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}喃喃自语着，看着镜中女子贪求肛穴快感的淫乱姿态，肉棒愈发坚挺了………`,
        );
      } else if (
        era.get(`tequip:${target}:57`) &&
        era.get(`abl:${target}:17`) >= 1 &&
        era.get(`talent:${target}:76`)
      ) {
        await era.printAndWait(
          `「啊～…啊哈啊～${heart(1)} 肉棒已经硬成这样子了…啊嗯～…啊啊～屁股穴把大鸡巴完全吃掉了…呀啊～${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}看着镜中和自己相同外貌的淫乱女人，有些不敢置信的伸出手，却摸到了自己上翘的嘴角………`,
        );
      } else if (era.get(`tequip:${target}:57`)) {
        await era.printAndWait(
          `${target_name}看着大镜子中自己双腿大开吞吐着雄性器的姿态、被肉欲烧酡红的脸上露出了微笑………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      await era.printAndWait(`「如何？人家可是每天用自己的肉棒练习的呢」`);
      await era.printAndWait(
        `${target_name}看着${player_name}的肉棒舔了舔嘴唇，娴熟的套弄了起来。`,
      );
      await era.printAndWait(`「呐，舒服吗？舒服的话就点点头？」`);
      await era.printAndWait(`「嗯、那接下来就让你更舒服吧………♪」`);
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊…哈啊…你的大肉棒…变得这么精神了…啊啊…让人家口水都流出来了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}伸出舌尖，让一丝银亮的唾液浇在${player_name}狰狞的龟头上。`,
          );
          await era.printAndWait(
            `「啊哈…人家的口水和你的先走汁混合在一起…非常美味的样子呢…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}套弄肉棒的动作渐渐激烈起来………`);
          // CFLAG:331  = 6（变量语义：CFLAG 族，331）
          kojo.手淫 = 6;
        } else {
          await era.printAndWait(
            `「啾呜、就这样在人家的嘴巴里把精液咻咻的射出来${heart(1)} 人家好想喝小宝宝牛奶…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}满脸期待的将肉棒对准自己张开的嘴巴、是热的气息让${player_name}被套弄的肉棒欢喜的抽搐着。`,
          );
          await era.printAndWait(
            `「唔呼呼、像这样被舔着射出来吗？还是要‘啊呜’的吞进去呢？…唔呼呼${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}浅吻一般轻啜马眼，坏心眼的轻柔套弄着问道………`,
          );

          // CFLAG:331  = 7（变量语义：CFLAG 族，331）
          kojo.手淫 = 7;
        }
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「大肉棒好热…被烫伤了…哈啊…哈啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}鼻息慌乱、不停套弄着${player_name}的肉棒………`,
        );
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呐呐、慢慢做和一下弄出来你比较喜欢哪种？？」`,
        );
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「………唔呼呼…那么慢慢的给你做…要充分品尝人家的手小穴哦？」`,
          );
          await era.printAndWait(
            `${target_name}的手以大概3秒1次的频率滑动着，羽毛般的指尖与其说刺激更像挑逗的把玩着肉棒。`,
          );
          await era.printAndWait(
            `积累的焦虑让${player_name}不禁开始挺腰，察觉到爱人动作的${target_name}握紧手中的雄性器，停止了套弄。`,
          );
          await era.printAndWait(
            `「自己动起来是犯规哦${heart(1)} 稍微忍耐下，慢慢的会让你舒服起来的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}把${player_name}膨大的龟头凑近鼻尖，轻轻地嗅着，继续缓缓套弄了起来………`,
          );
        } else {
          await era.printAndWait(
            `「………唔呼呼…一下子弄出来比较好吗…那、稍微拿出点真本事了哟${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}不轻不重的握住${player_name}的肉棒，双手像演奏乐器一样套弄了起来。`,
          );
          await era.printAndWait(
            `轻拢慢捻抹复挑、${target_name}感知着手中雄性器的搏动，微笑着加快了动作。`,
          );
          await era.printAndWait(`「来吧、射出来~射出来~${heart(3)}」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「来嘛来嘛…人家的手很舒服的哦。唔嗯、好热…握着这个的话让人家下面也…啊啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}‘哈斯哈斯’的喘着气套弄着${player_name}的肉棒，酡红的小脸离龟头越来越近………`,
        );
        await era.printAndWait(
          `渐渐染上色欲的吐息拂上敏感的尖端、湿热温痒的感觉让${player_name}不禁眯起了眼睛………`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…侍奉你肉棒的方法…人家已经明白了哦」`,
        );
        await era.printAndWait(
          `${target_name}一边舔着嘴角一边灵活的套弄着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `${target_name}哼着小调、一副很高兴的样子持续动着手腕………`,
        );
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「唔呼呼、呐，打算用人家的手小穴出来几次呢？」`,
        );
        await era.printAndWait(
          `${target_name}一边舔着嘴角一边套弄着${player_name}的阴茎………`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      await era.printAndWait(
        `「哈啊哈啊…舔到自己以外肉棒的那一天什么的…被魔王大人抓到前从来没想过呢…咕噜（吞口水）」`,
      );
      await era.printAndWait(
        `${target_name}眼睛咕噜咕噜的上下打量着面前的男性器、凌乱的呼吸吹的${player_name}阵阵发痒。`,
      );
      await era.printAndWait(`「那、那么肉棒侍奉开始啦…啊…啊~嗯…嗯～…嗯嗉…♪」`);
      await era.printAndWait(`「啊啊…大肉棒…好好吃…♪（舔舔）………♪」`);
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呸啾…呸啾…肉棒好好次（吃）…嗯～…唔嗯～…${heart(1)} 」`,
        );
        await era.printAndWait(
          `${target_name}完全把嘴当成了性器一样吞吐着阴茎、那副淫乱的光景，用‘口腔侍奉’来形容都有些稍显不足。`,
        );
        await era.printAndWait(
          `「嗯噗…在人家的嘴巴小穴里…全部射出来…人家…还想要更过（多）的说${heart(1)}」`,
        );
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊呣…嗯～…嗯~呼噗…唔唔…啾…啾啵…${heart(1)}」`,
        );
        await era.printAndWait(
          `看来${target_name}相当兴奋的样子，${player_name}默默地忍耐着敏感部数次被牙齿咬到的痛楚，盘算着第10次的话就给她点颜色看看。`,
        );
        await era.printAndWait(
          `「嗯噗…呼！…呼哈…啾噜…啾噗…（舔来舔去）…噗哈${heart(1)}」${target_name}完全没有感到危机，像幼犬一样开心的吞舔着肉棒`,
        );
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「（舔舔）…（舔舔）${heart(1)} 哈啊哈啊${heart(1)} 嗯啾…呸噜…唔呼…${heart(1)}」`,
        );
        await era.printAndWait(
          `「还不可以出来哟？ 接下来还要做更多舒服的事情对吧…呐？」`,
        );
        await era.printAndWait(
          `${target_name}轻舔着嘴角，期待着${player_name}接下来的命令………`,
        );
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…（舔舔）…（舔舔）…嗯～…哈嗯～…这样子怎么样呢？主人样…♪」`,
        );
        await era.printAndWait(
          `${target_name}结束了一轮口舌侍奉后腼腆的抬起了头………`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊…啊呣…嗯～…哈嗯～…！哈啊…嗯～…哈嗯～…咳咳…啊啊…十分抱歉、我还不太熟练……咳嗯～」`,
        );
        await era.printAndWait(
          `${target_name}因为生疏的动作呛到了自己，猛烈的咳嗽了起来。然而调整状态后还是热心的舔起了${player_name}的阴茎………`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (kojo.乳交 == 0 && era.get(`talent:${target}:109`)) {
      await era.printAndWait(
        `「看过了人家的胸部以后还要人家做这种事什么的…你果然是个了不得的变态呢………」`,
      );
      await era.printAndWait(
        `${target_name}有些吃惊的叹了口气，然后努力推挤着自己小小的胸部试着夹住那炽热的雄性器。`,
      );
      await era.printAndWait(`「说、说不舒服什么的就揍你哦………！」`);
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2) &&
        era.get(`talent:${target}:109`)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「看…不是好好射出来了嘛…${heart(1)} 唔？人家是贫乳所以感觉硬硬的？」`,
          );
          await era.printAndWait(`${target_name}有点不满的撅起了嘴。`);
          await era.printAndWait(
            `「哼、那人家就拿出真本事、让你把人家的胸部整个涂成白色吧，嘿咻${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抓住跳动的肉棒，用自己小小的乳头对准敏感的里筋发起了特攻………`,
          );
        } else {
          await era.printAndWait(
            `「嗯呼……啊哈…哈啊…${heart(1)} 唔呼呼、肉棒整个变得湿漉漉了呢…接下来就用人家的胸部…嗯～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用垂下来的唾液当做润滑剂、努力挺起小小的胸部，摩擦着${player_name}的肉棒尖端。`,
          );
          await era.printAndWait(
            `「哈啊哈啊…${heart(1)} 嗯～…哈啊～…好棒…${heart(1)} 呐、如果承认你也很舒服的话让你主动也可以哟？」`,
          );
          await era.printAndWait(
            `${target_name}蛊惑的笑着，继续抓住龟头在自己柔软的乳肉上打着圈………`,
          );
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2) &&
        era.get(`talent:${target}:109`)
      ) {
        await era.printAndWait(
          `「啊～…啊嗯～…你的肉棒…和乳头蹭来蹭去…好舒服的说…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}有些失神的微张着嘴，一丝口水从嘴角垂下，掉在了她贫薄的乳肌上………`,
        );
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2) &&
        era.get(`talent:${target}:109`)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…不要盯着看…勉、勉强用这样的胸部来做什么的，很让人害羞啦………」`,
        );
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `正如她所说的，${target_name}从侍奉一开始就满脸通红的样子，害羞的好像要哭出来了。`,
          );
          await era.printAndWait(
            `「真是的…到底是为了谁才这个样子的啊～…咦、变得这么大了吗…哼，和坏心眼的嘴不同，亲爱的这边很老实呢${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「唔呼呼、看到人家这么努力的样子…你也感觉舒服起来了吧…嗯～…嗯～！」`,
          );
          await era.printAndWait(
            `${target_name}一边努力用贫薄的胸部侍奉着，一边用湿润的眼神看了过来。${player_name}感觉心中嗜虐的部分被点燃了`,
          );
          await era.printAndWait(
            `「哈啊…哈啊…讨厌啦，突然这么粗暴的欺负胸部什么的…呀啊${heart(1)}」${player_name}用要把乳头顶进去的气势猛烈的进攻着`,
          );
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2) &&
        era.get(`talent:${target}:109`)
      ) {
        await era.printAndWait(`「总觉得、渐渐抓到窍门了呢………」`);
        await era.printAndWait(
          `${target_name}脸染红晕，继续用自己小小的胸部侍奉着肉棒………`,
        );
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (
        (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) &&
        era.get(`talent:${target}:109`)
      ) {
        await era.printAndWait(`「这、这样怎样？………呐、变得舒服了吗？………」`);
        await era.printAndWait(`${target_name}用渐渐变硬的乳头小心的摩擦着………`);
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (kojo.股间性交 == 0) {
      await era.printAndWait(`「这、这样…果然有点害羞…啊～…啊～…嗯～！」`);
      await era.printAndWait(`${target_name}脸染红晕，开始了股间侍奉。`);
      await era.printAndWait(
        `${target_name}的肉棒已经变的硬邦邦的了、随着腰的动作，尖端一次次的擦在自己的肚皮上，让她发出了难耐的哼声………`,
      );
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}两脚并拢、自己抓着已经翘的老高的肉棒，吞着口水看着${player_name}的龟头在腿心间滑进滑出的样子。`,
        );
        await era.printAndWait(
          `「啊嗯～…啊～…哈啊嗯～${heart(1)} 咕噜…大肉棒被人家的蜜汁弄得湿漉漉的，看起来更可口了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「所以呐…吃掉也可以吧？ 用人家的处女穴啾~啾的吞下去也可以吧${heart(2)}？」`,
        );
        await era.printAndWait(
          `${player_name}‘kukuku’的坏笑着摇了摇头、催促着${target_name}继续用大腿侍奉，${target_name}只好眼泪汪汪的再次磨蹭了起来。`,
        );
        await era.printAndWait(
          `「坏心眼…坏心眼的说…啊啊…但是这么舒服的事情、呜、停不下来…啊～…哈啊啊～${heart(1)}」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊…啊啊…${heart(1)} 明明想要肉棒狠狠捅进来的说！只这样子蹭来蹭去要变得奇怪了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}“哈啊哈啊”地用大腿和阴唇激烈的摩擦着肉棒。股间充血到极限的扶她肉棒也一抖一抖地，甩出的先走汁把肚脐都打湿了………。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…哈啊～…人家的肉棒根部也被蹭着…啊～…啊啊～…要、要去了…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}也差不多快要到极限了………`);
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊…啊嗯～${heart(1)} …哈…啊啊…人家…已经…哈啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}还是处女的蜜穴在${player_name}的肉棒上来回摩擦，持续着名为“股间性交”的侍奉。`,
        );
        await era.printAndWait(
          `不知道摩擦了多少次，${target_name}的腿心和${player_name}的肉棒上早已经湿滑一片了。`,
        );
        await era.printAndWait(
          `「哈啊…哈啊…哈啊～…人家…要变得奇怪了…要变得奇怪了啦${heart(1)}」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯呼～……人、人家…哈啊～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边持续着股间侍奉，一边把肉棒在${player_name}的肚子上蹭来蹭去。`,
        );
        await era.printAndWait(
          `「啊啊…怎么会这么舒服…${heart(1)} 不行惹~要射出来了…呐呐~人家待会会用舌头全部舔干净的…就这么射精出来也可以吧？」`,
        );
        await era.printAndWait(
          `「噗、一副呆呆的样子呢…哈啊～…啊～…哈啊…${heart(1)}」`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊哈啊…啊～…啊啊～…已、已经…饶了人家吧……啊嗯～！」`,
        );
        await era.printAndWait(
          `${target_name}小小的屁股来回耸动着，一生悬命的侍奉着${player_name}的肉棒。`,
        );
        await era.printAndWait(
          `${player_name}嘴里说着“嗯，那就给你加加油吧”，一边用手握住了她敏感的龟头。`,
        );
        await era.printAndWait(`「咿呀！恶、恶作剧不行！…啊～…啊嗯～！」`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `${target_name}用一只手掰开蜜穴、另一只手撸动着自己的阴茎。自己分开双腿向着肉棒沉下了腰、向${player_name}献上了处女。`,
            );
            await era.printAndWait(
              `「唔～…嗯～…啊啊～…进来了…啊啊～…啊～…呜呜…${heart(1)} 魔力涌进来了…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}仰着头，背上的翅膀绷得笔直、从张得大大地嘴巴里面可以看到漂亮的紫色舌头。`,
            );
            await era.printAndWait(
              `「啊啊～…啊～…啊～${heart(1)}…哈啊哈啊…啊啊、这样子人家…哈哈、更加…更进一步的成为你的所有物了呢…哈啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `破瓜的痛楚还残留着${target_name}就迫不及待的动起了腰肢，用痉挛的蜜穴开始品尝${player_name}的肉棒了………`,
            );
          } else {
            await era.printAndWait(`「啊啊～…嗯～…哈啊～…${heart(1)}」`);
            await era.printAndWait(
              `${target_name}仿佛没感到疼痛一样发出了娇声。`,
            );
            await era.printAndWait(
              `「啊～…啊嗯～…因为…第一次…给了你嘛…啊～…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `「还想更多的感觉肉棒…小穴里面越来越舒服了…${heart(1)} 所以说…哈啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}有些笨拙的上下扭着腰、贪寻着快乐………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊～…嗯～…嗯啊…唔嗯、看这里、你的东西被人家吞进去的样子…啊～…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}缓缓的放下了腰、${player_name}的肉棒随之一点点的深入了那个紧窄的粉红色淫腔。`,
            );
            await era.printAndWait(
              `途中感觉到了疼痛吧，${target_name}蹙了蹙眉，然后，以决死的气势一下放掉了脚部的力量。一气贯通的激痛让${target_name}背上的双翼‘啪唰’地绷直了。`,
            );
            await era.printAndWait(
              `「咔哈～！咕…呜呜～！………啊啊…和你…魔力相连的感觉就是这样吗…哈啊～…哈…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「十、十分抱歉、再稍微等一下下…一定、呜、会让你舒服起来的…啊～…嗯～啊嗯～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}咬着嘴唇，无视疼痛痉挛着的腔肉开始慢慢动起了腰………`,
            );
          } else {
            await era.printAndWait(`「咕…唔…啊啊…哈…啊啊～！」`);
            await era.printAndWait(`${target_name}因为破瓜的疼痛叫出了声。`);
            await era.printAndWait(
              `「人、人家…没关系的、…只是终于成了你的所有物…太开心了………」一边拭去眼泪，一边说道。`,
            );
            await era.printAndWait(
              `「所以说…（抽泣）…马上就让你舒服起来…哈、嗯～${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}听到了这番话，坏笑着抓住了她的腰，然后，猛烈地耸动了起来。`,
            );
            await era.printAndWait(
              `「咿呜！啊、笨、笨蛋…真的…这么激烈…哈啊～…啊～！」`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊哈啊…啊～…啊嗯～…稍、稍微等下…还有点…害怕的说…」`,
          );
          await era.printAndWait(
            `${target_name}跨坐在${player_name}身上，抬起腰部将膨大的龟头轻轻对准了穴口，她的手微微颤抖着，因为恐惧踌躇不前。`,
          );
          await era.printAndWait(
            `然而等得不耐烦的${player_name}抓住了她纤细的腰肢一口气压到了底。`,
          );
          await era.printAndWait(
            `「啊～…噫…咔啊～！………啊～…咕～…呜啊啊啊………」`,
          );
          await era.printAndWait(
            `${target_name}因为破瓜痛的连呼吸都断断续续、大颗的泪珠不断从眼角滚落。`,
          );
          await era.printAndWait(
            `「哈、嘎…请、稍灰（微）…等一下…………呜呜呜～」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「唔呼呼、把你吃掉吧…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}舔着唇角，将${player_name}的肉棒塞进了小穴的最深处，缓缓的扭起了腰………`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈啊…啊～…嗯～…大肉棒太有精神了、插不进去…啊～…进~来了…啊～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}慢慢的沉下腰、品味着${player_name}的肉棒研磨腔壁的快感………`,
          );
        } else {
          await era.printAndWait(
            `「嗯～…啊啊…这个姿势稍微有点害羞呢…啊～嗯～…哈、全部…进来了…」`,
          );
          await era.printAndWait(`${target_name}的腰部生硬的开始上下运动………`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(
            `随着${target_name}腰部上上下下的运动，她股间的肉棒也‘啪嗒啪嗒’跳动着。看起来蛮有趣的。`,
          );
          await era.printAndWait(
            `「啊嗯～…啊～…啊啊～…${heart(1)} 唔呼呼、你的肉棒太厉害了，让人家也变得这么精神了呢${heart(1)} 呜、龟头好爽～${heart(1)} 啊～喔喔～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}更激烈的动着腰，硬邦邦的扶她肉棒在空气中划出奇怪的轨迹，好像在跳什么淫猥的舞蹈、‘咕啪咕啪’的下流声音在二人的交合部分回响着。`,
          );
          await era.printAndWait(
            `「啊嗯～…哈啊啊～…啊～…好棒～…你的肉棒好舒服${heart(2)}」`,
          );
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈啊～…嗯～…啊啊～…鸡巴好棒…${heart(1)} 啊嗯～…啊～…啊哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰肢，用敏感的花心研磨着${player_name}的肉棒。`,
          );
          await era.printAndWait(
            `「已经上瘾了…对着这里再沉下去一点的话${heart(1)} 啊～…啊啊～${heart(1)}」`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `然后${target_name}高声娇呼叫着展开了恶魔的翅膀。`,
            );
          }
          await era.printAndWait(
            `「这下子…要好好负起让人家肉棒中毒的责任啊${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊～…嗯～…哈啊～…哈、好爽…在更多突上来…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被从下面无数次的突刺着。娇小的身体跳舞一样晃动着漏出快乐的声音。`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `然后${target_name}被肉棒突刺着展开了恶魔的翅膀。`,
            );
          }
          await era.printAndWait(
            `「啊嗯～…啊啊～${heart(1)} 啊啊～…人家…脑袋…脑袋已经变成笨蛋了…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的小腹高高鼓起，绷紧的皮肤下仿佛能看到${player_name}肉棒的形状、仿佛大脑中插入肉欲，强烈的快感让她发出了痴笑………`,
          );
        } else {
          await era.printAndWait(
            `${player_name}把${target_name}纤细的腰肢抓住，不让她逃走一般激烈的征伐着。`,
          );
          await era.printAndWait(
            `「哈噫…咿…啊啊啊${heart(1)} 嗯～、强烈…${heart(1)} 啊、啊哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}忘情的大喊大叫着。已经完全变成${player_name}的自动肉玩具了。`,
          );
          await era.printAndWait(
            `「啊～…啊啊～…小穴…要变成肉棒的形状了～…啊～…啊啊～…啊啊～${heart(1)}」`,
          );
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(
            `随着${target_name}腰部上上下下的运动，她股间的肉棒也‘啪嗒啪嗒’跳动着。看起来蛮有趣的。`,
          );
          await era.printAndWait(
            `「哈啊哈啊…啊嗯～…啊～…唔呼呼～${heart(1)} …嗯～…啊～…在、在盯着哪里看啊…讨厌…」`,
          );
          await era.printAndWait(
            `${target_name}对${player_name}恶趣味的视线报以娇嗔，腰的动作却更加激烈了。`,
          );
          await era.printAndWait(
            `「很、很害羞的啦…不要太盯着看…啊～…噫呀～…突然顶上来什么的不行～${heart(1)}」`,
          );
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊～…啊嗯～…嗯～…咕～…哈啊哈啊…啊～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰肢，用敏感的花心品味着${player_name}的肉棒。`,
          );
          await era.printAndWait(
            `「哈啊～…你的大肉棒插到最深的地方来了…咕…好棒～…哈啊～好舒服${heart(1)}」`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `然后${target_name}高声娇叫着展开了恶魔的翅膀。`,
            );
          }
          await era.printAndWait(
            `那是巧妙的运用自己娇小身体的优势榨取快感的完美小恶魔姿态………`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊～…啊～…嗯～…啊嗯～${heart(1)} 那、那样向上顶腰不行${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从${target_name}的身下不停的突刺着。`,
          );
          await era.printAndWait(
            `「嗯～…嗯呼～…啊～…啊呜～…嗯～…太厉害了…人家要坏掉了呜…啊～…嗯～…啊哈～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像巨浪中的小船一样在${player_name}身上舞蹈着………`,
          );
        } else {
          await era.printAndWait(
            `「停…啊～…哈啊～！好激烈…继续的话…啊～…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}把${target_name}纤细的腰肢抓住，不让她逃走一般激烈的侵犯着。`,
          );
          await era.printAndWait(
            `「不、不行～…哈啊～…哈啊～…真的要变奇怪了…哈啊～…啊～！」`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `${target_name}一脸不堪征伐的样子，用尾巴缠住${player_name}的大腿，讨好的摩挲着。`,
            );
          }
          await era.printAndWait(
            `然而${player_name}完全无视${target_name}的软语相求继续彻底的侵犯着她………`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊～…嗯～…呜啊…啊啊…好舒服…喔…啊嗯～…啊…啊啊～♪」`,
          );
          await era.printAndWait(
            `${player_name}从${target_name}的身下不停的突刺着、${target_name}的喉咙里漏出了甜美的呻吟声。`,
          );
          await era.printAndWait(`「哈啊…噢…啊嗯～…嗯～…这个…好爽…好棒哦！」`);
        } else {
          await era.printAndWait(
            `「啊哈…哈啊…唔呼呼～…接下来让你也舒服起来呢…啊嗯～…♪」`,
          );
          await era.printAndWait(
            `${target_name}扭动着腰肢，用敏感的花心顶着${player_name}的肉棒细细的研磨着。`,
          );
          await era.printAndWait(
            `「嗯～…啊～…哈啊哈啊…啊～…啊啊～…人、人家…腰停不下来了…咿…啊～…啊啊啊～」`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈～…哈啊～…嗯～…啊啊啊～…啊～…呜呜～！」`);
        await era.printAndWait(
          `${target_name}从下面不断的侵犯着${player_name}、让她的体重完全压在粗长的肉棒上………`,
        );
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不论做过几次，这个姿势还是很羞人啊…嗯～…啊～…啊啊～」`,
        );
        await era.printAndWait(`${target_name}有些僵硬的开始上下动起了腰………`);
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (kojo.全身擦洗 == 0) {
      await era.printAndWait(
        `「唔呼呼、如何？感觉舒服了吗？………实际上人家可是感觉很棒呢…啊啊…♪」`,
      );
      await era.printAndWait(
        `${target_name}很舒服的眯起了眼睛，用柔软的身体作为洗具，清洁着${player_name}的全身。`,
      );
      await era.printAndWait(
        `「啊啊…做了这样的事情…下面也变得湿漉漉的了呢……」`,
      );
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…哈啊～…这么舒服的洗法..人家的沐浴乳也要出来了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用双腿紧紧地夹着${player_name}的身体、用满是泡沫小屁股和扶她肉棒在${player_name}腹部来回蹭着。`,
        );
        await era.printAndWait(
          `「哈啊～…接下来…人家就这样射出来也可以吧？ 在你的肚脐上、把人家的肉棒沐浴乳biubiu的射出来一大堆${heart(1)}」`,
        );
        await era.printAndWait(
          `「不要那样子嘛…射完了人家会好好地弄干净的…啊啊～${heart(1)}」`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…喜欢…喜欢你哦…${heart(1)} 呐、有没有觉得哪里痒呢？」`,
        );
        await era.printAndWait(
          `${target_name}很开心的一边笑着一边温柔的用指尖擦洗着${player_name}的耳内、温热的吐息吹的你有些不自在。`,
        );
        await era.printAndWait(
          `「啊哈～…亲爱的这里是弱点呢…啊啊…哈啊…唔呼呼………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的两腿缠绕着${player_name}的腰身、那娇小的胴体像顶级的白绸织物一般在${player_name}的身体上滑动着………`,
        );
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔呼呼、有没有哪里觉得痒呢？ 想让你变得更舒服的说………」`,
        );
        await era.printAndWait(
          `${target_name}一边说一边仔细的清洗着${player_name}的身体。`,
        );
        await era.printAndWait(
          `小小的身体柔软而灵巧的摩擦着${player_name}带来阵阵快感、然而她股间的硬挺的肉棒也在${player_name}身上戳来戳去………`,
        );
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哈啊…啊啊…舒服吗…呐啊、你也感觉很舒服嘛？」`);
        await era.printAndWait(
          `${target_name}一边说一边仔细的清洗着${player_name}的身体。`,
        );
        await era.printAndWait(
          `小小的身体柔软而灵巧的摩擦着${player_name}带来阵阵快感、然而她股间的硬挺的肉棒也在${player_name}身上戳来戳去………`,
        );
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (kojo.骑乘位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊…啊啊…啊哈哈～…接下来你的大肉棒就要被人家的肛门穴吃掉了喔${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门轻易地吞进了${player_name}的阴茎………`,
          );
        } else {
          await era.printAndWait(`「呜…嗯～…果然还是有点勉强呢…哈啊～…啊～」`);
          await era.printAndWait(
            `${target_name}眉头微蹙，慢慢的用肛门把${player_name}的阴茎吞进去了………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊～…自己放进去…什么的…太H了…啊～…呜～…后、后面…啊啊～被撑开了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门轻易地吞进了${player_name}的阴茎………`,
          );
        } else {
          await era.printAndWait(`「嗯～…进、进来了…啊～…哈啊～！」`);
          await era.printAndWait(
            `${target_name}完全没有意识到，自己毫不抗拒用肛门性交这件事，把${player_name}的阴茎深深埋入了湿热的肠道………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呼嗯…唔～…嗯～…啊啊～…全部…进来了…哈啊～！」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门轻易地吞进了${player_name}的阴茎………`,
          );
        } else {
          await era.printAndWait(
            `「啊～…自己来…把肉棒吞进去什么的…唔…咕…啊啊～！」`,
          );
          await era.printAndWait(
            `${target_name}完全没有意识到，自己毫不抗拒用肛门性交这件事，把${player_name}的阴茎深深埋入了湿热的肠道………`,
          );
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯哈啊啊～…肛门穴SEX好棒…超舒服的说${heart(1)}」」`,
          );
          await era.printAndWait(
            `${target_name}激烈舞动的腰肢贪求着肛门性交的快感、栗色的半长发一绺一绺的黏在额头，发出淫靡的汗香。`,
          );
          await era.printAndWait(
            `「变得这么舒服的话…哈啊～…更多…更多的肉棒…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用力扭动小蛮腰，紧窄的肠穴绞榨着肉棒………`,
          );
        } else {
          await era.printAndWait(
            `「啊…哈啊…啊哈哈～…接下来你的肉棒要被人家的小肛穴吃掉啦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门轻易地吞进了${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「嗯～…插进来以后很高兴的一跳一跳呢…啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}仿佛不愿让你拔走一样收紧腔肉，一脸满足的品味着${player_name}的肉棒………`,
          );
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊…后面…你全部插进来了..呜${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的菊门被侵犯者发出了欢愉的叫声………`,
        );
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊～…哈啊～…这、这么顶腰不行…${heart(1)} 嗯～…阴蒂肉棒的前列腺被顶到了呀…！～哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}向上突刺着、一下下冲击着${target_name}的肛性器。`,
          );
          await era.printAndWait(
            `「哈、哈嘿噫…嘿嘿…哈啊～…啊嗯～${heart(1)} 屁、屁股穴要坏掉惹…请、原谅窝…哈啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…自己来动…什么的…太H了啦…啊～…嗯～…后面…啊啊～被撑大了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门轻易地吞进了${player_name}的阴茎。`,
          );
          await era.printAndWait(
            `「哈嘶～哈啊～…哈啊～…屁股穴…比前面还要舒服…啊～…啊嗯～${heart(1)}」`,
          );
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊～…好、大呢…果然还…咕～…唔唔～！」`);
        await era.printAndWait(
          `${target_name}忍耐着肛门内强烈的异物感、一点点试着动起了腰………`,
        );
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～哈啊～！嗯～…感觉…舒服起来了…啊～…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}被开发过的肛门像嘴巴一样吞吐着${player_name}的阴茎、${target_name}努力忍耐着快感………`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊～…嗯～…唔唔…咕～…哈啊哈啊………」`);
        await era.printAndWait(
          `${target_name}忍耐着肛门内强烈的异物感、一点点试着动起了腰………`,
        );
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      await era.printAndWait(
        `「人家、虽然很讨厌脏兮兮的东西…不过没、没办法啦…嗯～…嗯～…（舔舔）…呜、奇怪的味道」`,
      );
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…屁股好好吃${heart(1)} 唔呼呼、连里面也帮你变得干净吧${heart(1)} （舔舔）…啾呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边发出下品的声音一边和${player_name}的肛门深吻着、柔软的舌头温柔的爱抚着肠壁上的褶皱。`,
        );
        await era.printAndWait(
          `「啊哈、哔咕哔咕得抖的好厉害呢、还想要更多嘛？唔呼呼${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好色的瞳孔里渐渐染上了浓重的淫欲。`,
        );
        await era.printAndWait(
          `「想要的话什么时候说都可以哦…人家会全力侍奉你的…啊啊…啊啊${heart(1)}」`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…你的后面…也很美味呢…别露出那种眼神嘛…（舔舔）虽然味道有点怪怪的…但是人家最喜欢了，啾叭${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸幸福的对着肛门发起了温柔而猛烈的攻势。`,
        );
        await era.printAndWait(
          `「啊啊…在哔咕哔咕的发抖呢…你也感觉很舒服吗…好开心${heart(1)}」`,
        );
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯噗…呋…哈啊…啾呜…（舔舔）…咕啾…啾………」`);
        await era.printAndWait(
          `${target_name}双眸湿润的将舌头深入${player_name}的肛门，专注的侍奉着………`,
        );
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「为什么要我做这种事啦…嗯～…嗯啾…哈啊…（舔舔）………」`,
        );
        await era.printAndWait(
          `${target_name}一边碎碎念着开始了对${player_name}肛门的侍奉………`,
        );
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (kojo.打屁股 == 0) {
      await era.printAndWait(`「呀啊～！不要…疼～…好疼的！住手快住手啦！」`);
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呜  嗯~${heart(1)} 再用力点～用力的抽人家的屁股啊…被打肿的地方热热的好舒服呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}妩媚的抚摸着身上红肿的指印，摇动着小屁股向你发出了邀请。`,
        );
        await era.printAndWait(
          `随着那可爱的小屁股一次次的被抽打${target_name}的肉棒前端渗出了透明的液体。`,
        );
        await era.printAndWait(
          `「噫哈…啊啊～…啊啊～…再多打几下，要、要去了${heart(1)}」`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…啊啊…被亲爱的打了…啊嗯～…哈嗯…麻麻胀胀的呢…啊～…哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸幸福的回望着你，用双手向你捧起自己的翘臀、${player_name}饶有兴味的看着上面慢慢变红的指印。`,
        );
        await era.printAndWait(
          `随着那可爱的小屁股一次次的被抽打${target_name}的肉棒前端渗出了透明的液体`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咕哈…呜…呜啊！啊～…停、停下来…不要再打了…啊…呜呜！」`,
        );
        await era.printAndWait(
          `${target_name}的屁股被大力抽打着，然而只能发出悲鸣忍耐着………`,
        );
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不要…不要啊～…很痛的什么才不要啊！啊…啊啊～…咿！咿呀！」`,
        );
        await era.printAndWait(`${target_name}被打得大声哭闹着………`);
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (kojo.鞭 == 0) {
      await era.printAndWait(
        `「不…不要啦…用鞭子抽什么的是玩笑吧…一点也不..咿！…啊～…啊啊啊～！」`,
      );
      await era.printAndWait(
        `${player_name}手中的鞭子无慈悲的咬上${target_name}的肌肤，在上面留下了刺目的痕迹………`,
      );
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈噫${heart(1)}  人家是坏孩子的说…啊嗯～${heart(1)} 所以请更多的惩罚人家…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被鞭子抽打着发出了开心的叫声、完全是一副受虐狂牝犬的脸了啊。`,
        );
        await era.printAndWait(
          `${target_name}股间流下的爱液和前列腺液在地上积起了小小的水洼………`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊嗯～${heart(1)}…啊、啊嗯～${heart(1)} 哈啊哈啊…感、感觉什么的才没有呢～………」`,
        );
        await era.printAndWait(
          `${target_name}尽管这么说着却一脸潮红的扭动着身子，期待下一鞭的到来………`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「明明说要做舒服的事情…会痛的我才不要呢！」`);
        await era.printAndWait(
          `${target_name}发出了悲鸣、${player_name}无视她继续鞭打着………`,
        );
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「噫～…啊嗯～…啊啊嗯～…哈啊嗯～${heart(1)}」`);
        await era.printAndWait(
          `${target_name}随着鞭子落下一声声的娇喘着、股间的爱液和前列腺液混在一起，顺着大腿流到了地上。`,
        );
        await era.printAndWait(
          `「再多抽几下啦${heart(1)}…是亲爱的想要的话，人家被怎么样都很开心呢…啊嗯～…啊啊嗯～${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…好痛…明明很痛的…被你抽的话…人家…却痛得好舒服…哈啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}随着鞭子落下一声声的娇喘着。`);
        await era.printAndWait(
          `「啊嘿…噫…哈嗯～${heart(1)} 啊啊…接下来是屁股吗…啊嗯～嗯哈～${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不、不要…就算是你我也不要啦…啊～…哈啊～…咿！」`,
        );
        await era.printAndWait(`${player_name}无视她继续无慈悲的鞭打着………`);
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊～…嗯～…啊…感觉兴奋起来了…这里也…抽一下…啊啊～」`,
        );
        await era.printAndWait(
          `${player_name}的鞭击一下下的落下，${target_name}的腰部随着鞭打淫乱的扭动着。那下流的姿势仿佛再邀请着抽打她一样。`,
        );
        await era.printAndWait(
          `「明明被鞭子抽着…啊啊…人家…这样好奇怪…哈啊${heart(1)}！」`,
        );
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不要～…会痛的不要！住手…请住手啊！…啊咕…咿！」`,
        );
        await era.printAndWait(`${player_name}的鞭子无慈悲的一下下抽打着………`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (kojo.针 == 0) {
      await era.printAndWait(
        `「哪、哪怕是我…也是怕针扎的…啊～…哈啊～…呜呜～哈啊～！……好痛啊！」`,
      );
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}的乳头在细针的欺凌下尖立了，她发出野兽般的叫声…………`,
        );
        await era.printAndWait(
          `「喔～再来！啊～…啊～…好……好棒～！啊啊啊～…要、要去啦…………！！！」`,
        );
        await era.printAndWait(`${target_name}的股间，已经爱液泛滥了……`);
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…唔……哦～～${heart(1)} 再、再这样的话……啊啊哈啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `被针扎着的${target_name}，嘴里发出了含糊不清的喘息…………`,
        );
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜呜…不要不要不要不要啊…啊～…啊啊～…呜啊～！」`,
        );
        await era.printAndWait(
          `${player_name}享受着${target_name}的悲鸣，用力地拿针扎她…………`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这、这里被针刺的话…啊、啊啊～…唔唔～噢！………啊～…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的乳头在细针的欺凌下尖立了，只见她星目半闭，发出了艳丽的喘息…………`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔…噢…痛～…好痛…啊啊～！嗯～！啊…啊啊………」`);
        await era.printAndWait(
          `被针扎着的${target_name}，嘴里发出了含糊不清的喘息…………`,
        );
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不要…不要…求你了…不要做让我痛苦的事啊…唔喔！…啊～啊～！」`,
        );
        await era.printAndWait(
          `${player_name}享受着${target_name}的悲鸣，用力地拿针扎她…………`,
        );
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊～！…哈啊…哈啊……哈啊啊～！啊啊…好痛哦………」`,
        );
        await era.printAndWait(
          `${target_name}流下了血与泪，不过看起来是喜悦的泪呢………`,
        );
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「真的不喜欢！！…已经…已经…讨厌…啊～…啊啊～哈啊～！」`,
        );
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      await era.printAndWait(`「嗯～…看不见的话还是有点不安啊………」`);
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「想被弄得乱七八糟…想就这样被侵犯…${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呐…快点来摸摸人家啦～…啊啊………」`);
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔…连这样的play我也…唔呼呼～」`);
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「快、快来摸我吧…我爱你！…啊啊…啊啊～…${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯～…啊…嗯嗯…哈啊哈啊………」`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯～…看不到你的话，有点寂寞呢……」`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…打算要干啥～………」`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「………真是恶趣味。」`);
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「蒙眼play什么的，真是令人忐忑呢～～」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「真是的…看不见东西果然还是会不安啦～」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「嗯～…终于脱掉了………」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 == 0) {
      await era.printAndWait(
        `「上次这么绑着…还是在刚被抓到地下城的时候………啊……回想起讨厌的事情了……」`,
      );
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「更用力地绑紧吧～${heart(1)} 舒服的话，就应该要说出来的嘛～${heart(1)}嘻嘻」`,
        );
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「感觉越来越舒服了…${heart(1)} 啊啊………」`);
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊～挺舒服的，有点喜欢了…嗯～」`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊～…再更加地欺负我吧～${heart(1)}」`);
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嘻嘻～再绑紧些也没关系哦………${heart(1)}」`);
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「被你这样绑着的话，会忍不住的………噢～～」`);
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊嗯～…被这么绑着好舒服啊～…啊啊………」`);
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊～…为什么要绑着我…这，这样子有什么意义？」`,
        );
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…身上还是被绳子勒得痛痛的………」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…身上还是被绳子勒得痛痛的………」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊…好可怕的绳子印………」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 == 0) {
      await era.printAndWait(`「呐，难道是为了不让我大声嚷嚷才这么做………？」`);
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「口枷…好啊……～${heart(1)}……唔唔唔～」`);
        if (era.get(`tequip:${target}:43`)) {
          await era.printAndWait(
            `${target_name}的嘴被口枷塞住，从缝隙中喷出了炽热的呼吸…………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}只是看到口枷而已，眼睛却已经湿润了………`,
          );
        }
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…明明只是见到口枷，口水却已经流出来了………」`,
        );
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样的话，就不能帮你吹出来了嘛………」`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「要绑好哦～不要待会大声叫的时候掉下来啦～嘻嘻～${heart(1)}」`,
        );
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不绑上口枷的话，嘴巴就好寂寞啊～………${heart(1)}」`,
        );
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样就不能接吻了嘛！讨厌～………」`);
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「被口枷桎梏着，有种窒息的快感～………♪」`);
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「喂…这个东西，有好好洗干净么？…为了卫生着想啊………」`,
        );
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「口水流得到处都是啦……」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊哈啊…」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊唔…哇…啊……口水这么的………」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 == 0) {
      await era.printAndWait(
        `「哎、啊？！…灌肠什么的…不、不要…从来没做过这种事！…讨、讨厌啊～！都说了不要啦！！」`,
      );
      await era.printAndWait(
        `${player_name}强行压着她娇小的身体，从肛门处灌入了好几百毫升的灌肠液…………`,
      );
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「再灌…再灌啊～${heart(1)} 腹中的感觉好强烈…后面的感觉好舒服啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `在${target_name}的恳求下，提高了灌肠液的浓度，注入了比平时多很多的量。`,
        );
        await era.printAndWait(
          `娇小的${target_name}，肚子像青蛙一样地鼓胀起来了…………`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…这样就有了感觉…嗯…噢…哈啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}涕泗横流，品味着灌肠液带来的刺激…………`,
        );
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…啊啊～${heart(1)} 啊啊${heart(1)} 肚子…被玩坏了…要坏掉了啦～${heart(1)}」`,
        );
        await era.printAndWait(
          `最近，因为她已经习惯了过去的玩法，所以提高了灌肠液的浓度，注入了比平时多很多的量。`,
        );
        await era.printAndWait(
          `娇小的${target_name}，肚子像青蛙一样地鼓胀起来了…………`,
        );
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…看在你的份上…原谅你做出这么过分的事…啊～…嗯唔唔唔唔啊～！！！」`,
        );
        await era.printAndWait(
          `${target_name}因为肚子里灌肠液的刺激，发出了痛苦的呻吟…………`,
        );
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「肚子好像烧起来一样，好烫…啊啊…为什么……会有这种感觉………」`,
        );
        await era.printAndWait(
          `${target_name}被快感折磨得面红耳赤，发出了不甘的呻吟…………`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊～…啊啊～…肚子在咕咕叫…啊～…不要…不要…要拉出来了………好脏啊不要啦！！………」`,
        );
        await era.printAndWait(
          `${target_name}在肚子的绞痛中流下了耻辱的泪水…………`,
        );
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (kojo.放置PLAY == 0) {
      await era.printAndWait(
        `「怎、怎么了？ 我做了什么让你不舒服的事么………？」`,
      );
      await era.printAndWait(`${target_name}诚惶诚恐地问到………`);
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「看啊…只是被你这么看着，我就成这样子了…」`);
        await era.printAndWait(`${target_name}股间的阴茎，已经勃起至极点了……`);
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呐…只是这样看着，不过瘾吧………？」`);
        await era.printAndWait(
          `${target_name}分开双腿，引诱着${player_name}…………`,
        );
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊～哈啊…我、我已经…无法忍耐啦～！～！」`);
        await era.printAndWait(
          `${target_name}双腿不断摩擦着，企图刺激自己的阴茎…………`,
        );
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊…被这么看着…要让我疯狂了………」`);
        await era.printAndWait(`${target_name}露出了痴迷的表情………`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「怎、怎么了？ 我做了什么让你不舒服的事么………？」`,
        );
        await era.printAndWait(`${target_name}诚惶诚恐地问到………`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
    }
    await era.print('');

    if (era.get(`tequip:${target}:11`)) {
      await era.printAndWait(`${target_name}的私处里，蠕虫毫不留情地翻动着。`);
    }

    if (era.get(`tequip:${target}:13`)) {
      await era.printAndWait(
        `${target_name}的菊穴，被肛门虫毫不留情地蹂躏着。`,
      );
    }

    if (era.get(`tequip:${target}:19`)) {
      await era.printAndWait(
        `${target_name}的菊穴，被放入了肛珠，正一开一合地吞吐着。`,
      );
    }

    if (era.get(`tequip:${target}:14`)) {
      await era.printAndWait(`${target_name}的阴蒂，被阴蒂夹狠狠地关照着。`);
    }

    if (era.get(`tequip:${target}:15`)) {
      await era.printAndWait(`${target_name}的乳头，被乳头夹狠狠地欺负着。`);
    }

    if (era.get(`tequip:${target}:16`)) {
      await era.print(`${target_name}的胸前，榨乳器正用力地吸着。`);
    }

    if (era.get(`tequip:${target}:17`)) {
      await era.printAndWait(`${target_name}的阴茎，被飞机杯折磨着。`);
    }

    if (era.get(`tequip:${target}:43`)) {
      await era.printAndWait(
        `${target_name}被戴着眼罩，对外界发生的事情一无所知。`,
      );
    }

    if (era.get(`tequip:${target}:44`)) {
      await era.printAndWait(`${target_name}的身体，被绳子紧紧地束缚着。`);
    }

    if (era.get(`tequip:${target}:46`)) {
      await era.printAndWait(
        `${target_name}的肚子，因为灌肠液而发出咕咕的声音。看来一但拔掉肛塞，污物就会喷发而出。`,
      );
    }

    if (era.get(`tequip:${target}:49`)) {
      await era.printAndWait(
        `${target_name}的菊穴被插入了电极，正持续不断地电击着脆弱的括约肌。`,
      );
    }

    if (era.get(`tequip:${target}:53`)) {
      await era.printAndWait(
        `${target_name}的这个姿态，被水晶球一五一十地拍下来了……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era.get(`tequip:${target}:53`) == 1) {
        await era.print(`${player_name}催促${target_name}进行自我介绍。`);
        if (
          era.get(`talent:${target}:89`) ||
          era.get(`abl:${target}:17`) >= 5
        ) {
          // 同一行输出：无后缀 PRINTFORM + SIF 的 PRINTFORM
          // + 收行的 PRINTFORML（#622）。SIF 条件提到语句外当条件、文本留在语句里
          const masturbation = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}将自己的本名、至今为止的性经验` +
              (masturbation ? `甚至自慰时想的什么` : '') +
              `都微笑地讲了出来……`,
          );
          await era.print(
            `似乎在期待着被狂王看到自己现在的样子，${target_name}的股间也开始湿润了……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}开始对着水晶球说着不知廉耻的话。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}向水晶球介绍着自己。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.print(`${target_name}把头别向一边，什么都不说。`);
        }
      } else {
        // 无后缀 PRINTFORM 前缀（和%SAVESTR:PLAYER%），与 IF 链首支的
        // 收行同属一行（#622）。各支自带收行，前缀在分支外取值
        const chat_prefix = `在和${player_name}`;
        // 快感装备（11/13/14/15/16/17 任一）→「带着快乐的语调」、
        // 痛苦装备（44/49）→「带着痛苦的语调」
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
            `在和${player_name}会话的过程中，${target_name}扭动着腰呢喃着充满爱意的话语。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            chat_prefix +
              `会话的过程中，${target_name}扭动着腰叫嚷着淫猥的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同一行输出：无后缀 PRINTFORM + IF/ELSEIF 的
          // PRINT（互斥两支）+ 收行的 PRINTFORML（#622）
          await era.print(
            chat_prefix +
              `会话的过程中，${target_name}` +
              (equip_pleasure
                ? `带着快乐的语调`
                : equip_pain
                  ? `带着痛苦的语调`
                  : '') +
              `拼命地回应着。`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            chat_prefix + `会话的过程中，${target_name}交谈还算融洽的样子。`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            chat_prefix + `会话的过程中，${target_name}时不时会给出一些回应。`,
          );
        } else {
          await era.print(
            chat_prefix + `会话的过程中，${target_name}一副心不在焉的样子…`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) == 1) {
        await era.print(`${master_name}催促${target_name}进行自我介绍。`);
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(`${target_name}扭着腰对水晶球说出了充满爱意的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(`${target_name}扭着腰对水晶球叫嚷着淫猥的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) == 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // 与初回同型（#622）
          const masturbation = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}将自己的本名、至今为止的性经验` +
              (masturbation ? `甚至手淫时想到的什么` : '') +
              `都微笑地讲了出来……`,
          );
          await era.print(
            `似乎在期待着被狂王看到自己现在的样子，${target_name}的股间也开始湿润了……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}对着水晶球说起淫猥的话语。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}对着水晶球开始介绍自己。`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.print(`${target_name}侧过脸去，沉默不语。`);
        }
      } else {
        // 与初回同型（#622）：无后缀 PRINTFORM 前缀与 IF 链首支的
        // 收行同属一行，各支自带收行、前缀在分支外取值
        const chat_prefix = `在和${master_name}`;
        // 快感装备→「带着快乐的语调」、痛苦装备→「带着痛苦的语调」
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
            `在和${master_name}会话的过程中，${target_name}扭动着腰呢喃着充满爱意的话语。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            chat_prefix +
              `会话的过程中，${target_name}扭动着腰叫嚷着淫猥的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 与初回同型（#622）
          await era.print(
            chat_prefix +
              `会话的过程中，${target_name}` +
              (equip_pleasure
                ? `带着快乐的语调`
                : equip_pain
                  ? `带着痛苦的语调`
                  : '') +
              `拼命地回应着。`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            chat_prefix + `会话的过程中，${target_name}交谈还算融洽的样子。`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            chat_prefix + `会话的过程中，${target_name}时不时会给出一些回应。`,
          );
        } else {
          await era.print(
            chat_prefix + `会话的过程中，${target_name}一副心不在焉的样子…`,
          );
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 123 && era.get(`talent:${target}:109`)) {
    if (kojo.乳夹口交 == 0) {
      await era.printAndWait(`「嗯啊…嗯～…嗯～…哈啊哈啊…嗯～…唔噢…唔噢～…♪」`);
      await era.printAndWait(`「看啊…我的胸夹着小鸡鸡的样子……………」`);
      await era.printAndWait(`${target_name}好奇地说着，积极地侍奉着你…………`);
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…在我的嘴里，在我的胸上射出来吧！～不然可不放过你噢～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}身体不停地上下运动着，用胸部侍奉着${player_name}的阴茎，舌头还不时在龟头上打转。`,
        );
        await era.printAndWait(
          `「唔噢～${heart(1)} 要射的话不要忍着哦！尽情地射出来吧…嘻嘻…射精…唔哦哦…唔唔～${heart(1)}」`,
        );
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「连…乳交这种屈辱又羞耻的事，居然也觉得很不错了………魔王大人啊～把我弄成这样，不负起责任的话可不放过你哦～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}身体不停地上下运动着，用胸部侍奉着${player_name}的阴茎，舌头还不时在龟头上打转。`,
        );
        await era.printAndWait(
          `「唔噢…唔噢…哈啊哈啊…唔呼呼……这样脉动着…唔…唔噢………唔唔～${heart(1)}」`,
        );
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔呼呼……喜欢这样吗？～♪　唔唔…唔哦………唔哦…♪」`,
        );
        await era.printAndWait(
          `${target_name}用胸部侍奉着阴茎，舌头还不时在龟头上打转。`,
        );
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「唔唔…嗯～…唔～…这样的话，就会舒服么？唔唔…嗯～…唔～」`,
        );
        await era.printAndWait(
          `${target_name}用嘴吸啜着阴茎的同时，不时抬眼瞄着你……………`,
        );
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 125) {
    if (kojo.口交时自慰 == 0) {
      await era.printAndWait(
        `「唔～…嗯～…唔噢…一边舔你…一边自摸………好舒服啊～…♪」`,
      );
      await era.printAndWait(
        `${target_name}随着舌头的转动，不停地撸着自己的阴茎。`,
      );
      await era.printAndWait(
        `「啊啊…其实我一直想过会做这样的事…梦境实现了算…？…嗯～…唔噢…唔唔…～♪」`,
      );
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯～…射出来～射出来～…${heart(1)} 喝掉你的东西，我也要去了…一起射出来吧！～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不停地撸着自己的阴茎，激烈地侍奉着${player_name}。`,
        );
        await era.printAndWait(
          `「唔唔～…噢噢～…啊啊…一跳一跳的…我也要去了…要去了～…${heart(1)}」`,
        );
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…一边舔你，一边弄自己…其实我梦里经常这么干啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}双颊晕红，陶醉在炽热的气息中。不停用嘴侍奉着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「嗯…嗯～…噢～…噢～…啊啊…${heart(1)} 在脉动着…舒服吗？…唔…唔唔～${heart(1)}」`,
        );
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…唔…唔唔～…噢…噢～……呐，一起高潮吧？」`,
        );
        await era.printAndWait(
          `${target_name}的双眼，失去了理性的灵光，完全被情欲所蒙蔽了，一边侍奉一边偷瞄着你。`,
        );
        await era.printAndWait(
          `「射出来吧！～喝掉你热热的东西的话……我也忍不住要去了～………♪」`,
        );
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊唔…唔…噢～…嗯～…嗯～…啊～～～！」`);
        await era.printAndWait(
          `${target_name}吸啜着阴茎，被快感淹没了。口水淫秽地滴落下来，好像比你还更想射出来。`,
        );
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (kojo.手搓口交 == 0) {
      await era.printAndWait(
        `「唔…手口并用的话…嗯～…嗯～…唔唔～…啊啊…感觉比平常更硬了呢～」`,
      );
      await era.printAndWait(
        `${target_name}抓住${player_name}阴茎的根部不停套弄着，舌头在龟头上打转。`,
      );
      await era.printAndWait(`「唔唔…嗯～…嗯嗯～…啊～…哈啊哈啊…嗯～！」`);
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (kojo.手淫 == 7 && era_flag.prevcom == 30) {
          await era.printAndWait(
            `「好的～${heart(1)} 啊啊～…嘻嘻～${heart(1)} 嗯～…嗯～…！」`,
          );
          await era.printAndWait(
            `${player_name}听到${target_name}的命令之后，情绪高涨了起来。手上的动作越来越激烈了。`,
          );
          await era.printAndWait(
            `「嗯～${heart(1)} …嗯～${heart(1)} …唔～…唔唔…这样…弄小鸡鸡的话…感觉它比平常更精神了呢…………啊啊…唔唔…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着恍惚的表情积极地侍奉着，一副渴望把精液全喝掉的样子。`,
          );
          // CFLAG:331  = 6（变量语义：CFLAG 族，331）
          kojo.手淫 = 6;
        } else {
          await era.printAndWait(
            `「你的东西，又硬又热…哈啊～${heart(1)} …哈啊～${heart(1)} …嗯～唔唔～…噢～哦～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}激烈地套弄着阴茎的根部，好像要把精液挤出来似得。`,
          );
          await era.printAndWait(
            `「嗯～…嗯～…停不下来…噢噢…嗯～…唔…啊啊～…射我嘴里…想要你热热的东西…好想要～${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯…嗯～…啊啊～…唔…不用忍耐哦～尽情地射出来吧！……噢！…嗯～唔唔～${heart(1)}」`,
          );
        }
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}跪在地上，一边仔细地用舌头在龟头上打转，一边温柔地用双手按摩着阴茎的根部和蛋蛋。`,
        );
        await era.printAndWait(
          `「唔唔…啊～…噢～…它变大了呢～${heart(1)} 就这样，让你更舒服吧～${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊…好高兴…能让魔王大人舒服起来～…唔唔～…啊……嗯～…～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}心神皆醉，沉迷在侍奉${player_name}的阴茎中了…………`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔呼呼……手口并用的话，很舒服吧？唔～…嗯～……」`,
        );
        await era.printAndWait(
          `「我也想试试这种滋味啊………唔…唔…啊～～…嗯嗯～～♪」`,
        );
        await era.printAndWait(`${target_name}愉悦地侍奉着阴茎…………`);
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这样弄的话，会很舒服吧…嗯，我知道了啦～…唔唔…嗯～…啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}愉悦地眯起了眼睛，侍奉着阴茎…………`,
        );
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (kojo.真空口交 == 0) {
      await era.printAndWait(
        `${target_name}为这种侍奉而兴奋起来了，积极地吸啜着${player_name}的阴茎。`,
      );
      await era.printAndWait(`「嗯～！嗯～！…唔～…唔～…唔～♪」`);
      await era.printAndWait(
        `${target_name}一双会说话的眼里，似乎回荡着淫荡又舒服的声音…………`,
      );
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔唔～…嘻嘻…就这样，全部吸出来！～${heart(1)} 」`,
        );
        await era.printAndWait(
          `${target_name}脸颊凹陷，嘴巴收缩，口腔内形成局部真空，吸啜着阴茎。`,
        );
        await era.printAndWait(
          `「唔～…唔～…啊～…～${heart(1)} 唔～…唔唔…就这样，让你更舒服被吧！～${heart(1)}」`,
        );
        await era.printAndWait(`「唔～${heart(1)} 噢噢～${heart(1)}」`);
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔唔…嗯～…啊啊…噢～${heart(1)} 唔唔…唔唔～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像鳖一样地紧紧叼着你的阴茎不放，又紧又热的嘴巴给予了阴茎无上的快感。`,
        );
        await era.printAndWait(
          `${target_name}还细致地利用舌头绕着阴茎打转，这侍奉水平，换了其它人的话早一泄如注了吧。`,
        );
        await era.printAndWait(
          `「唔唔…噢～…啊～${heart(1)} 可以…射出来哦～…${heart(1)} 唔唔唔唔啊～！」`,
        );
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔唔…射出来…射出来嘛………唔唔～唔唔…哈啊…噢…嗯～！」`,
        );
        await era.printAndWait(
          `${target_name}认真地企图把精液吸啜出来，发出了无比淫秽的声音……`,
        );
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「嗯～再来～…再来…唔唔…唔唔～…啊啊～…唔唔噢～」`,
        );
        await era.printAndWait(`${target_name}发出了无比淫秽的声音……`);
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (kojo.六九式 == 0) {
      await era.printAndWait(
        `「唔～！嗯～…哈啊…啊啊啊～……同时……这样弄着………嗯～啊啊………♪」`,
      );
      await era.printAndWait(
        `${target_name}愉悦地侍奉着${player_name}的性器……`,
      );
      await era.printAndWait(`「哈啊哈啊…啊嗯～…哈啊哈啊…唔唔…唔唔…噢噢～…♪」`);
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔唔～…唔唔…啊…啊～…${heart(1)} 噢～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}犹如反击似的，疯狂地吸啜着${player_name}的性器……`,
        );
        await era.printAndWait(
          `「相互这样弄着…感觉心情都变好了呢…唔唔…嗯嗯～…${heart(1)}」`,
        );
        await era.printAndWait(`「一起…一起去吧…就弄在嘴里！…${heart(1)}」`);
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊…嗯～…唔啊…唔唔～…噢哦…${heart(1)}」`);
        await era.printAndWait(
          `${player_name}和${target_name}相拥着，相互吸啜着彼此的性器。`,
        );
        await era.printAndWait(
          `${target_name}完全勃起了，前列腺液不断地分泌着。${target_name}意乱情迷，紧紧地吸啜着${player_name}的性器不松口。`,
        );
        await era.printAndWait(
          `「啊啊…一直…一直在这么干…通过嘴巴表达爱意什么的…${heart(1)}」`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯～！哈啊～…啊～！已、已经…竟然如此舒服…啊～嗯～…唔唔～♪」`,
        );
        await era.printAndWait(
          `${target_name}被你舔得七荤八素，娇喘声越来越高昂了。不过她努力地忍耐了下来，持续地侍奉着你。`,
        );
        await era.printAndWait(
          `「唔…唔唔～…啊～…你，你如果……觉得舒服的话……射出来也无妨哦…嗯～唔唔～………」`,
        );
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊哈啊…嗯～不行！…啊…这样欺负我…啊啊～…哈啊～…嗯～！」`,
        );
        await era.printAndWait(
          `${target_name}被你舔得七荤八素，娇喘声越来越高昂了。快感的冲击让她多次把侍奉中断了，你只好不断地耸动腰来提醒她。`,
        );
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (kojo.深喉 == 0) {
      await era.printAndWait(
        `${target_name}因为口腔侍奉而兴奋了，努力地将${player_name}的阴茎吸入喉咙深处。`,
      );
      await era.printAndWait(`「嗯～…唔唔～…啊…嗯～…噢哦～…♪」`);
      await era.printAndWait(
        `${target_name}像要窒息似得，深深地将${player_name}的阴茎含进去了。`,
      );
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呵呵～${heart(1)} 把你的东西全部喝光～${heart(1)} 唔唔～…嗯～…哦啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}断断续续地挤出几句话，舌头积极地缠绕着${player_name}的阴茎……`,
        );
        await era.printAndWait(
          `「唔哦～…唔啊～…好棒…你的鸡鸡真美味…啊啊…就这样在我喉咙里射出来吧…唔唔～…唔唔～…啊哈～${heart(1)}」`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔啊～${heart(1)} 嗯～嗯～…呵呵～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}发出粗野的喘息，用喉咙紧紧地套弄着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `那美丽的娇躯，完全沉醉在侍奉你的满足感中去了。`,
        );
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔哦…嗯～…唔唔…唔呼…哈啊…啊，全部…全部都给我吧…嗯～唔噢～♪」`,
        );
        await era.printAndWait(
          `${target_name}头部不停耸动着，侍奉${player_name}的阴茎。`,
        );
        await era.printAndWait(`对她喉咙深处的侵犯，让你兴奋无比…………`);
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯～…唔哦～…唔唔…嗯～啊～…唔啊…噢～………♪」`);
        await era.printAndWait(
          `${target_name}像要窒息似得，深深地将${player_name}的阴茎含进去了。`,
        );
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (kojo.强制口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯～…唔唔～…啊啊…我的嘴…好棒…这么有力的侵犯…啊啊～…嗯～唔哦～…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的头，用力地往喉咙进犯着。${target_name}没有抵抗，努力地企图咽下你的阴茎。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「唔啊啊啊！？啊～…一点心理准备都没有…嗯～嗯～嗯嗯嗯～………！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的头，用力地往喉咙进犯着。${target_name}为了不让牙齿弄痛你，努力地嘟起嘴唇，舌头灵活地缠绕着你的阴茎。`,
        );
      } else {
        await era.printAndWait(
          `「唔啊～？嗯～…唔唔！…嗯～…嗯～啊～…咳咳！咳咳～…………咳咳咳～」`,
        );
        await era.printAndWait(
          `「这、这么粗鲁…～！唔～……呜呜～…嗯～唔啊～！」`,
        );
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔啊～…嗯～…唔啊啊～…噢啊啊…啊啊…嗯……唔唔……嗯嗯～～～${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}头被粗野地抓着，喉咙也被粗暴地侵犯着。但她的眼中却充满陶醉的神情，口水淫秽地从嘴角滴下来了。`,
        );
        await era.printAndWait(
          `「啊啊～…唔唔～…嗯～${heart(1)} 啊啊…就这样，把我的嘴巴当成精液便器吧！${heart(1)} 唔哦～…嗯～唔噢噢噢～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}头发散乱，眼泪都渗出来了。就这样直接射她嘴里吧！`,
        );
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔哦～…嗯～…唔哦～…啊啊～…请、请…饶了…我～～！」`,
        );
        await era.printAndWait(
          `${player_name}狠狠地抓着${target_name}的头，疯狂地耸动着下体。虽然很痛苦，但她却条件反射般用舌头灵活细致地不停侍奉着${player_name}的阴茎。`,
        );
        await era.printAndWait(
          `「嗯～…唔哦～…唔～…啊啊…嗯～嗯啊………这、这样就满足了么………啊～…啊啊～！」`,
        );
        await era.printAndWait(
          `「唔唔…可……可以哦…射我嘴里什么的～${heart(1)} 嗯～唔唔～…唔唔～…啊啊～…唔唔～！`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这么粗暴的…不要不要～…唔唔…唔～…嗯～…啊啊～…唔哦～…嗯～…唔啊啊啊～！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的头，侵犯到了喉咙最深处。${target_name}竭力地不让自己噎着。`,
        );
        await era.printAndWait(
          `在这美妙的小嘴里狠狠射一发，应该会很过瘾吧…………`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊～…不要这种的…啊～…呜呜～…嗯～…唔唔唔唔～…嗯～哇～…唔唔～…讨厌啦！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的头，侵犯到了喉咙最深处。${target_name}不断挣扎着，无奈地就范了。`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 87) {
    const p = piercing_state.p; // 跨 CALL TRAIN_MESSAGE_B 存活的全局单字母变量 p（com87() 写入，见 piercing-state.js，K7 kojo-k7-heart.js 先例）

    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}苦痛地扭曲了表情………`);
      } else if (era.get(`talent:${target}:76`) == 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(`「咕～…啊啊～！」`);
          await era.printAndWait(
            `${target_name}因为被初次开洞而发出痛苦的声音。`,
          );

          if (p == 1) {
            await era.printAndWait(
              `「哈啊哈啊…这样敏感度上升的话…啊嗯～…硬的不行了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}看着两乳头上闪光的环陶醉了………`,
            );
          } else if (p == 2) {
            await era.printAndWait(`「呵呵…很合适吧？」`);
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`);
          } else if (p == 4) {
            await era.printAndWait(`「这样被看着的话我会淫乱的～露出来了呢」`);
            await era.printAndWait(
              `${target_name}的小穴上两瓣阴唇的环都闪着光………`,
            );
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「讨厌…被这样穿上去的话会一直勃起的～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎完全勃起了、穿环在闪闪发光………`,
              );
            } else {
              await era.print('');
            }
          } else if (p == 16) {
            await era.printAndWait(
              `「唔呼呼、用这个舌头奉仕的话一定会很快活吧」`,
            );
            await era.printAndWait(`${target_name}像展示穿环似的伸出了舌头………`);
          } else if (p == 32) {
            await era.printAndWait(`「嗯…穿在唇上、总觉得怪怪的」`);
            await era.printAndWait(`「不过你觉得这样比较好的就没办法了………」`);
          } else if (p == 64) {
            await era.printAndWait(`「你觉得这样好的话、那就这样穿环好了…」`);
            await era.printAndWait(
              `${target_name}的一个鼻孔上的穿环闪闪发光着………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取下环的伤痕………`);
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(`「咕～…啊啊～！」`);
          await era.printAndWait(
            `${target_name}因为被初次开洞而发出痛苦的声音。`,
          );

          if (p == 1) {
            await era.printAndWait(`「………呐怎样？会合适吗？」`);
            await era.printAndWait(
              `${target_name}用两臂摆出了性感的姿势。她的两个乳头上的环闪闪发光………`,
            );
          } else if (p == 2) {
            await era.printAndWait(`「美妙的礼物呢…谢谢${heart(1)}」`);
            await era.printAndWait(
              `${target_name}的肚脐上镶着宝石的穿环在闪着光………`,
            );
          } else if (p == 4) {
            await era.printAndWait(
              `「把、把这种东西穿上的话、除了你之外已经不能见人了…」`,
            );
            await era.printAndWait(
              `「………嘛也没有展示给你以外的别人看的念头罢了」`,
            );
            await era.printAndWait(`${target_name}小声地补充道………`);
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「唔呼呼、这样就变成你专用的阴茎了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `「穿在这里的话、不尽情爽一下可不会放过你呢${heart(1)}」`,
              );
            } else {
              await era.print('');
            }
          } else if (p == 16) {
            await era.printAndWait(`「诶、用这舌头来舔？………真是的、大色狼」`);
            await era.printAndWait(
              `话虽这样说${target_name}一幅很有干劲的样子………`,
            );
          } else if (p == 32) {
            await era.printAndWait(
              `「呐、果然给嘴唇穿环很痛呢…所以尽情的亲我补偿下吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}这样说着撅起闪光的嘴唇哀求着………`,
            );
          } else if (p == 64) {
            await era.printAndWait(
              `「呜呜嗯…既然你想这样的话就照你说的做吧…果然很羞耻呢」`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取下环后的伤痕………`);
        }
      } else {
        if (chara(target).train.穿环状态 & p) {
          await era.printAndWait(
            `「啊～…不要～…好痛…只有疼痛什么的不要啊…啊啊～！」`,
          );
          await era.printAndWait(
            `${target_name}因为被初次开洞而发出痛苦的悲鸣。`,
          );

          if (p == 1) {
            await era.printAndWait(
              `「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」`,
            );
            await era.printAndWait(`${target_name}的乳头上染血的环在闪着光………`);
          } else if (p == 2) {
            await era.printAndWait(
              `「咕呜～为什么要做这种事…诶、这是为了录制水晶球时确认是本人的必要？你在说什么啊？」`,
            );
          } else if (p == 4) {
            await era.printAndWait(`「啊～…嗯呜…不要做这种事…我…咕呜～………！」`);
            await era.printAndWait(
              `${target_name}因为破开阴唇的穿环的痛苦而流下了眼泪………`,
            );
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊～…我、我的阴茎…被什么…被什么给…」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎被环穿了个洞血流了出来………`,
              );
            } else {
              await era.print('');
            }
          } else if (p == 16) {
            await era.printAndWait(`「咿噗～…咿～…缩不粗话了（伸不直）」`);
            await era.printAndWait(
              `为了好好固定住${target_name}的舌头不让它缩起来、将舌头拉直了。`,
            );
            await era.printAndWait(
              `一看到一脸哭相的${target_name}就更加想虐待她了………`,
            );
          } else if (p == 32) {
            await era.printAndWait(`「好痛…这样一来就暂时吃不了热的东西了…」`);
            await era.printAndWait(`${target_name}穿上环的唇在隐隐作痛………`);
          } else if (p == 64) {
            await era.printAndWait(
              `「不要再这样虐待我了…再这样我就………啊～…讨厌～不要看～！」`,
            );
            await era.printAndWait(
              `拿开想遮住鼻子的${target_name}的手臂、好好地检查环是否穿好。`,
            );
            await era.printAndWait(`${target_name}一边哭一边摇着头………`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取下环后的伤痕………`);
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p == 1) {
            await era.printAndWait(
              `「哈啊哈啊…这样敏感度上升的话…啊嗯～…硬的不行了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}看着两乳头上闪光的环陶醉了………`,
            );
          } else if (p == 2) {
            await era.printAndWait(`「呵呵…很合适吧？」`);
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`);
          } else if (p == 4) {
            await era.printAndWait(`「这样被看着的话我会淫乱的～露出来了呢」`);
            await era.printAndWait(
              `${target_name}的小穴上两瓣阴唇的环都闪着光………`,
            );
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「讨厌…被这样穿上去的话会一直勃起的～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎完全勃起了、穿环在闪闪发光………`,
              );
            } else {
              await era.print('');
            }
          } else if (p == 16) {
            await era.printAndWait(
              `「唔呼呼、用这个舌头奉仕的话一定会很快活吧」`,
            );
            await era.printAndWait(`${target_name}像展示穿环似的伸出了舌头………`);
          } else if (p == 32) {
            await era.printAndWait(`「嗯…穿在唇上、总觉得怪怪的」`);
            await era.printAndWait(`「不过你觉得这样比较好的就没办法了………」`);
          } else if (p == 64) {
            await era.printAndWait(`「你觉得这样好的话、那就这样穿环好了…」`);
            await era.printAndWait(
              `${target_name}的一个鼻孔上的穿环闪闪发光着………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取下环后的伤痕………`);
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & p) {
          if (p == 1) {
            await era.printAndWait(`「………呐怎样？会合适吗？」`);
            await era.printAndWait(
              `${target_name}用两臂摆出了性感的姿势。她的两个乳头上的环闪闪发光………`,
            );
          } else if (p == 2) {
            await era.printAndWait(`「美妙的礼物呢…谢谢${heart(1)}」`);
            await era.printAndWait(
              `${target_name}的肚脐上镶着宝石的穿环在闪着光………`,
            );
          } else if (p == 4) {
            await era.printAndWait(
              `「把、把这种东西穿上的话、除了你之外已经不能见人了…」`,
            );
            await era.printAndWait(
              `「………嘛也没有展示给你以外的别人看的念头罢了」`,
            );
            await era.printAndWait(`${target_name}小声地补充道………`);
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「唔呼呼、唔呼呼、这样就变成你专用的阴茎了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `「穿在这里的话、不尽情爽一下可不会放过你呢${heart(1)}」`,
              );
            } else {
              await era.print('');
            }
          } else if (p == 16) {
            await era.printAndWait(`「诶、用这舌头来舔？………真是的、大色狼」`);
            await era.printAndWait(
              `话虽这样说${target_name}一幅很有干劲的样子………`,
            );
          } else if (p == 32) {
            await era.printAndWait(
              `「呐、果然给嘴唇穿环很痛呢…所以尽情的亲我补偿下吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}这样说着撅起闪光的嘴唇哀求着………`,
            );
          } else if (p == 64) {
            await era.printAndWait(
              `「呜呜嗯…既然你想这样的话就照你说的做吧…果然很羞耻呢」`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取下环后的伤痕………`);
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        if (chara(target).train.穿环状态 & p) {
          if (p == 1) {
            await era.printAndWait(
              `「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」`,
            );
            await era.printAndWait(`${target_name}的乳头上染血的环在闪着光………`);
          } else if (p == 2) {
            await era.printAndWait(
              `「咕呜～为什么要做这种事…诶、这是为了录制水晶球时确认是本人的必要？你在说什么啊？」`,
            );
          } else if (p == 4) {
            await era.printAndWait(`「啊～…嗯呜…不要做这种事…我…咕呜～………！」`);
            await era.printAndWait(
              `${target_name}因为破开阴唇的穿环的痛苦而流下了眼泪………`,
            );
          } else if (p == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊～…我、我的阴茎…被什么…被什么给…」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎被环穿了个洞血流了出来………`,
              );
            } else {
              await era.print('');
            }
          } else if (p == 16) {
            await era.printAndWait(`「咿噗～…咿～…缩不粗话了（伸不直）」`);
            await era.printAndWait(
              `为了好好固定住${target_name}的舌头不让它缩起来、将舌头拉直了。`,
            );
            await era.printAndWait(
              `一看到一脸哭相的${target_name}就更加想虐待她了………`,
            );
          } else if (p == 32) {
            await era.printAndWait(`「好痛…这样一来就暂时吃不了热的东西了…」`);
            await era.printAndWait(`${target_name}穿上环的唇在隐隐作痛………`);
          } else if (p == 64) {
            await era.printAndWait(
              `「不要再这样虐待我了…再这样我就………啊～…讨厌～不要看～！」`,
            );
            await era.printAndWait(
              `拿开想遮住鼻子的${target_name}的手臂、好好地检查环是否穿好。`,
            );
            await era.printAndWait(`${target_name}一边哭一边摇着头………`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取下环后的伤痕………`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

/**
 * dog_kojo_10：兽奸PLAY专用口上（TEQUIP:89 时由 kojo_message_com_10
 * 头部检查岔入）。全篇为未填写正文的模板骨架（与 K9 的 dog_kojo_9 相同），
 * 输出语句全部落为空字符串；爱抚 CFLAG:301 起的分支状态机与
 * kojo_message_com_10 同构，计数器照常推进。
 */
async function dog_kojo_10(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (era_flag.selectcom == 0) {
    if (chara(target).kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      chara(target).kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (chara(target).kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      chara(target).kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 3;
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (chara(target).kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      chara(target).kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (chara(target).kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else if (chara(target).kojo.接吻 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 3;
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (chara(target).kojo.舔肛 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      chara(target).kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 3;
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (chara(target).kojo.背后位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      chara(target).kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 3;
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (chara(target).kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      chara(target).kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 3;
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (chara(target).kojo.手淫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      chara(target).kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 3;
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (chara(target).kojo.口交_奴 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      chara(target).kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 3;
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (chara(target).kojo.骑乘位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
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
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait('');
        } else if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (chara(target).kojo.肛门侍奉 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      chara(target).kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 3;
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (chara(target).kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:136`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      chara(target).kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 3;
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:136`) == 1 &&
      (chara(target).kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 2;
    } else if (chara(target).kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (chara(target).kojo.交谈 == 0) {
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:136`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      chara(target).kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) == 1 &&
          (chara(target).kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 3;
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  return 0;
}

/**
 * kojo_message_palamcng_10：参数变动口上。首超润滑/欲情/
 * 耻情/恐怖 Lv2（CFLAG:221-224）+ 首次各类绝顶（CFLAG:225-228）+
 * 处女丧失（CFLAG:229）。
 */
async function kojo_message_palamcng_10(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  void rand;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) == 1) {
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

  const P1 =
    (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0);

  if (P1 > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(
          `「呜嗯、被用了好几次润滑液了呢、不过这里的比我做的品质要好」`,
        );
        await era.printAndWait(`―――润滑初次超过了LV2。`);
      } else {
        await era.printAndWait(`「啊～…啊啊～…嗯呜…被弄湿了…啊哈～」`);
        await era.printAndWait(`―――润滑初次超过了LV2。`);
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(
          `「呜嗯、被用了好几次润滑液了呢、不过这里的比我做的品质要好」`,
        );
        await era.printAndWait(`―――润滑初次超过了LV2。`);
      } else {
        await era.printAndWait(
          `「啊～…啊啊～…嗯呜…被弄湿了～呢…好、好羞耻………」`,
        );
        await era.printAndWait(`―――润滑初次超过了LV2。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    chara(target).kojo.首次润滑Lv2 = 1;
  }

  const P2 =
    (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P2 > PALAMLV[2] && chara(target).kojo.首次欲情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `「嗯～…果然真正的媚药很有效呢…啊啊～…身体热起来了～」`,
        );
        await era.printAndWait(`―――欲情初次超过了LV2。`);
      } else {
        await era.printAndWait(
          `「哈啊哈啊…我已经…不得不想做了…呐、你懂得吧？」`,
        );
        await era.printAndWait(`${target_name}的阴茎鼓胀地勃起来了………`);
        await era.printAndWait(`―――欲情初次超过了LV2。`);
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `「嗯～…果然真正的媚药很有效呢…啊啊～…身体热起来了～」`,
        );
        await era.printAndWait(`―――欲情初次超过了LV2。`);
      } else {
        await era.printAndWait(`「嗯～…哈啊哈啊…还要…更多…更多～………」`);
        await era.printAndWait(`${target_name}的阴茎鼓胀地勃起来了………`);
        await era.printAndWait(`―――欲情初次超过了LV2。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    chara(target).kojo.首次欲情Lv2 = 1;
  }

  const P3 =
    (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P3 > PALAMLV[2] && chara(target).kojo.首次耻情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「呜呜～…果然被你看着…好害羞呢………」`);
      await era.printAndWait(`―――耻情初次超过了LV2。`);
    } else {
      await era.printAndWait(`「好、好害羞呢………」`);
      await era.printAndWait(`―――耻情初次超过了LV2。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    chara(target).kojo.首次耻情Lv2 = 1;
  }

  const P4 =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P4 > PALAMLV[2] && chara(target).kojo.首次恐怖Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「噫～！不、不要…不要靠近我………」`);
      await era.printAndWait(`―――恐怖初次超过了LV2。`);
    } else {
      await era.printAndWait(`「不、不要…好可怕不要啊………」`);
      await era.printAndWait(`―――恐怖初次超过了LV2。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    chara(target).kojo.首次恐怖Lv2 = 1;
  }

  if (era.get(`nowex:${target}:0`) > 0 && chara(target).kojo.首次C绝顶 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊～…来、来了…要去了…有什么要来了～…！啊啊～…啊～…啊啊～！」`,
      );
      await era.printAndWait(
        `${target_name}因为被阴茎刺激初次在${player_name}面前绝顶了的样子。`,
      );
      await era.printAndWait(`「啊啊…高潮被看到啦…啊啊…${heart(1)}」`);
    } else {
      await era.printAndWait(
        `「啊啊～…来、来了…要去了…有什么要来了～…！啊啊～…啊～…啊啊～！」`,
      );
      await era.printAndWait(
        `${target_name}因为被阴茎刺激初次在${player_name}面前绝顶了的样子。`,
      );
      await era.printAndWait(`「呜哇…啊…讨厌…好羞人…嗯～…啊啊………」`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    chara(target).kojo.首次C绝顶 = 1;
  }

  if (era.get(`nowex:${target}:1`) > 0 && chara(target).kojo.首次V绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊～${heart(1)} 小穴里有什么要出来了～${heart(3)} 啊啊～…啊嘿～咿噫～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为对阴道的强烈刺激腰身一颤一颤地痉挛着。发出了美丽而高亢的娇喘声。`,
      );
      await era.printAndWait(
        `「啊啊～…啊啊～！小穴要疯了～${heart(1)} 小穴要不行了～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}好像是初次阴道绝顶的样子、然后为了追求更多的快感${target_name}开始自己动起了腰………`,
      );
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊～${heart(1)} 不要离开…哈啊啊～…我、我…啊啊～…高潮～了…高～潮了～…啊嘿～…咿～…啊啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为对阴道的强烈刺激腰身一颤一颤地痉挛着、好像初次用阴道绝顶了的样子。`,
      );
      await era.printAndWait(
        `「哈呼…呼…呼啊…${heart(1)} 呐…继续吧…请让我变得更舒服吧…啊啊…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「哈啊～…来了～…要去了～…呀～…不要…再这样下去…啊～…啊啊～…啊啊～！」`,
      );
      await era.printAndWait(
        `好像${target_name}初次用阴道绝顶了的样子、因为充分的快感而陷入了呆愣状态。`,
      );
      await era.printAndWait(`「呼哇…啊…哈啊哈啊…啊嗯～…啊啊…哈啊…哈啊………」`);
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    chara(target).kojo.首次V绝顶 = 1;
  } else if (
    era.get(`nowex:${target}:1`) > 0 &&
    chara(target).kojo.首次V绝顶 == 1
  ) {
    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      await era.printAndWait(
        `${target_name}的小巧的身体因为快乐而颤动着。阴道口紧绷着很明显即将绝顶了。`,
      );
      await era.printAndWait(
        `「啊啊～！小穴要高潮了…高潮了～…${heart(1)} 啊～咿～…咿～啊啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `「继续侵犯我…${heart(1)} 好舒服…好喜欢…还要～${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}露出陶醉的表情沉溺在了快乐之中………`);
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      await era.printAndWait(
        `「又、又来了～${heart(1)} 求求你～不要离开我～啊啊～…啊啊～…呀啊啊啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的小巧的身体因为绝顶而颤动着、阴道口紧紧缠住了${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「啊嘿～…咿～…啊啊～…更多的…更多的抱我～…${heart(1)} 啊啊啊啊………」`,
      );
      await era.printAndWait(
        `${target_name}露出不像话的高潮脸沉浸在快乐之中………`,
      );
    } else if (game.event.插着不拔 == 1) {
      await era.printAndWait(
        `「啊啊～…啊～…又要去了…要去了…啊啊～…小、小穴要去了～！」`,
      );
      await era.printAndWait(
        `${target_name}阴道口紧缩着、发出了好像很爽的尖叫声。`,
      );
      await era.printAndWait(`「啊～…啊啊～…又、又被弄高潮了～呢…啊啊………♪」`);
    }
  }

  if (era.get(`nowex:${target}:2`) > 0 && chara(target).kojo.首次A绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「哈啊啊～${heart(1)} 肛门变得奇怪了～…${heart(1)} 已、已经…啊啊啊啊啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为肛门快感的余韵扭起了可爱的屁股。看上去肛门一颤一颤的即将高潮的样子。`,
      );
      await era.printAndWait(
        `「啊啊～…啊～！肛门要疯了～…高潮了～${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}好像初次用肛门绝顶了的样子………`);
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「不、不行…再被这样弄下去我…就要～…哈啊～…哈啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}初次用肛门绝顶了的样子、可爱的屁股一颤一颤地痉挛扭动了起来。`,
      );
      await era.printAndWait(`「啊啊…好像屁股的快感要觉醒了………${heart(1)}」`);
    } else {
      await era.printAndWait(
        `「啊～…不～…不要啊～！明明不想用这么肮脏的地方高潮啊…啊～…啊啊～！」`,
      );
      await era.printAndWait(
        `${target_name}因为肛门快感的余韵扭起了可爱的屁股。看上去肛门一颤一颤的即将高潮的样子。`,
      );
      await era.printAndWait(
        `「哈啊～…住手…再这样下去…啊啊～…啊～…！啊啊～！」`,
      );
      await era.printAndWait(`${target_name}好像初次用肛门绝顶了的样子………`);
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    chara(target).kojo.首次A绝顶 = 1;
  } else if (
    era.get(`nowex:${target}:2`) > 0 &&
    chara(target).kojo.首次A绝顶 == 1
  ) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「好爽～…${heart(1)} 肛门好爽～${heart(1)} 再尽情操我～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}由于肛门绝顶发出了高亢的娇喘声。她的肛门已经完全变为性器了的样子。`,
      );
      await era.printAndWait(`「哈嘻～…嘻～…肛门好爽…好爽哦…${heart(1)}」`);
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊～…嗯～…啊啊…讨厌～屁股又要高潮了…嗯～…啊哈啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的肛门在绝顶的快感下不断收缩着。可爱的屁股因为快感颤动着。`,
      );
      await era.printAndWait(`「这样…啊啊…好舒服啊…真是的…${heart(1)}」`);
    } else {
      await era.printAndWait(
        `「再、再被这样弄下去的话…啊啊～…我…我的屁股要觉醒快感了～…！」`,
      );
      await era.printAndWait(
        `${target_name}迎来了快感的极限收紧了肛门、迎来了绝顶。`,
      );
      await era.printAndWait(`「呀啊～…啊啊～！啊啊啊～！」`);
    }
  }

  if (era.get(`nowex:${target}:3`) > 0 && chara(target).kojo.首次B绝顶 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊～…再弄…再弄…啊～…来了～…要去了…啊啊…哈、啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的乳头勃起到了前所未有的程度、在进一步地刺激下她发出了绝顶的呻吟。好像初次用乳头绝顶了的样子。`,
      );
      await era.printAndWait(`「哈啊哈啊…还要…乳头…好舒服…${heart(1)}」`);
    } else {
      await era.printAndWait(
        `「啊～…啊啊～…嗯～…乳头好舒服…啊…啊啊～…哈…啊啊啊～！」`,
      );
      await era.printAndWait(
        `${target_name}的乳头勃起到了前所未有的程度、在进一步地刺激下她发出了绝顶的呻吟。好像初次用乳头绝顶了的样子。`,
      );
      await era.printAndWait(
        `「哈啊哈啊…被别人的手弄高潮了～不过这样好爽………」`,
      );
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    chara(target).kojo.首次B绝顶 = 1;
  }

  // A（单字母全局变量，A:0，跨函数共享——见 references/core-concepts/variables.md）
  era.set(
    'a:0',
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0),
  );
  const a_count = era.get('a:0') || 0;

  if (game.train.处女丧失 == 1 && chara(target).kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (a_count < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「哈啊啊啊…${heart(1)} 处女被夺走了…${heart(1)} 被诸恶的根源、身为侵略者的邪恶魔王给夺走啦${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯？为什么摆出这幅表情哟…实际上不就是这样吗…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}虽然承受着破瓜之痛但还是不管不顾地调皮地笑了起来。`,
        );
        await era.printAndWait(
          `「撒～…如你所愿…我的身体被…哈啊～…陵辱了～${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (a_count < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「啊啊～！啊嗯～…啊～…啊啊啊…哈啊哈啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为破瓜之痛而奄奄一息的样子。为了让她休息一下${player_name}停止了动作。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…呐、再稍微动一下也可以哦…呐、就这样不要离开…拜托咯………」`,
        );
      } else if (a_count < 500 || game.system.反抗刻印回避 == 1) {
        await era.printAndWait(`「哈呜～…咕…果然真是好痛呢………啊～…啊嗯～」`);
        await era.printAndWait(
          `${target_name}因为破瓜之痛而难过的呻吟着、粘稠的血粘在了${player_name}的阴茎上。`,
        );
        await era.printAndWait(`「………不过、想想以你为对象也还不错吧」`);
        await era.printAndWait(`然后${target_name}小声地补充道………`);
      }
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈啊…哈啊…唔呼呼、这样一来就可以不用顾虑小穴尽情调教了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}明明有着破瓜之痛却毫不在乎地开心的微笑起来………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「哈呜～…嗯～…能不能再温柔一点呢…」`);
        await era.printAndWait(`${target_name}因为破瓜之痛皱起了眉头………`);
      } else {
        await era.printAndWait(
          `「咕～…嗯呜呜…啊啊…处女被夺走啦～真的很痛呢…呜～…咕呜～！」`,
        );
        await era.printAndWait(`${target_name}因为破瓜之痛流下泪来………`);
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    chara(target).kojo.处女丧失 = 1;
  }
}

/**
 * kojo_message_markcng_10：刻印取得口上。
 */
async function kojo_message_markcng_10(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  void rand;

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
        `「啊啊～！我讨厌疼痛～…噫～…噫咿咿～…快、快住手…啊啊啊哈啊～！」`,
      );
      await era.printAndWait(
        `${target_name}因为剧烈的痛苦发出了悲鸣、这份疼痛将会再也忘不掉了吧………`,
      );
    } else {
      await era.printAndWait(`「不、不要啊～！快停下～不要～！好痛啊啊～！」`);
      await era.printAndWait(
        `${target_name}因为剧烈的痛苦发出了悲鸣、这份疼痛将会再也忘不掉了吧………`,
      );
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    chara(target).kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && chara(target).kojo.快乐刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「哈嘻～…嘻～…啊啊啊…你带来的快乐…要刻在身体里了………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的脸上充满了快乐陶醉般地呼着热气………`,
      );
    } else {
      await era.printAndWait(
        `「啊～…哈啊啊～…我…我…被做了这么快乐的事情…再也忘不掉了呢………」`,
      );
      await era.printAndWait(
        `${target_name}的脸上充满了快乐陶醉般地呼着热气………`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    chara(target).kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && chara(target).kojo.屈服刻印Lv3 == 0) {
    await era.printAndWait(
      `「啊…啊啊…不要再这样残酷地对我了…我什么都会做的…啊啊…啊啊………」`,
    );
    await era.printAndWait(`${target_name}在不断的调教下完全屈服了的样子………`);
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    chara(target).kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && chara(target).kojo.反抗刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「不要～！不想再看到你的脸～！」`);
      await era.printAndWait(
        `泪水从${target_name}充满愤怒的眼中流了出来。好像完全被讨厌了的样子。`,
      );
      await era.printAndWait(`「…………为什么要这样做…我应该没有做错事啊…」`);
    } else {
      await era.printAndWait(`「咕～………呜呜～！」`);
      await era.printAndWait(`「呜、呜呜～、我没事…请不要在意…」`);
      await era.printAndWait(
        `（讨厌、明明做好觉悟了但被魔王碰到还是觉得很讨厌………）`,
      );
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    chara(target).kojo.反抗刻印Lv3 = 1;
  }
}

/**
 * self_kojo_k10：事件口上入口（EVENT_AFTERTRAIN 等处调用）。调教后自慰
 * CFLAG:261，NTR 调教后自慰 CFLAG:657 每次调用递减一次，归零后停止。
 * A 是跨函数共享的单字母全局变量（a:0）：调教中由
 * kojo_message_palamcng_10 写入（本回精液量），本函数按单字母全局的语义
 * 直接读取——当轮调教没写过时读到的是更早一轮的残留值，自慰描写里
 * 「射精多次后/射精后」等措辞与精液水洼的回数消费的就是这个值，故保留
 * 跨函数读取、不改成局部变量。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @param {number} [q] 自慰妄想对象（Q：0 主人 / 1 助手 / 2 野狗）
 */
async function self_kojo_k10(rand, q) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_nickname(0); // %CALLNAME:MASTER%（MASTER 恒角色 0）
  let Q = q;
  const s = peek_aftertrain_s(); // SIF s >= 3 需要（跨函数全局 S，K7 kojo-k7-heart.js 先例）
  const a_count = era.get('a:0') || 0; // A（单字母全局变量，kojo_message_palamcng_10 写入，本回精液水洼量/绝顶次数）

  void rand_n;

  if (game.train.初吻与自我口上 == 1) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `${target_name}像被玩坏的玩具似的撸着自己的阴茎自慰着………`,
      );
    } else if (chara(target).kojo.NTR_657 >= 1) {
      // CFLAG:657 -= 1（NTR 调教后自慰计数递减）
      chara(target).kojo.NTR_657 = (chara(target).kojo.NTR_657 || 0) - 1;

      // Q = 3（跳过 AFTERTRAIN_MASTURBATION_CHECK 后续 Q==1/Q==2 分支）
      Q = 3;
      await era.print('');
      await era.printAndWait(
        `不、不是在想${master_name}而是一边在想狂王一边自慰着的样子。`,
      );

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:74`) == 1
      ) {
        await era.printAndWait(
          `「哈啊～${heart(1)} 哈啊～${heart(1)} 被狂王大人和魔王大人尽情的抱过了～…我的身体已经…再也变不回去了～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边撸着阴茎一边用手抠着小穴、在激烈的自慰下弓起了腰、在床上化作了一条美丽的桥梁。`,
        );
        await era.printAndWait(
          `「啊啊～！好爽～好爽啊～${heart(1)} 肉棒和小穴全部～${heart(1)} 全部都好爽～${heart(1)} 好想被狂王大人尽情地抱～${heart(1)}」`,
        );
        await era.printAndWait(
          `前列腺液和爱液从${target_name}的阴茎和小穴中大量迸发出来弄脏了床铺。`,
        );
        await era.printAndWait(`「哦～哦吼哦…哦～…哦～…哦吼哦………${heart(1)}」`);
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:74`) == 1
      ) {
        await era.printAndWait(
          `「呜呼～呼～嗯呼呜～${heart(1)} 撸鸡鸡撸得停不下来了…好想被狂王大人抱～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边撸着阴茎一边摩擦着小穴、混杂着爱液和精液的前列腺液把床弄脏了。`,
        );
        await era.printAndWait(
          `「被魔王大人抱～！被宠爱～！明明应该很爽～！却还是忘不了狂王大人的家伙～${heart(1)} 啊～啊～哈啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}流着眼泪反复这样说着、她的两手直到绝顶前都停不下来。`,
        );
        await era.printAndWait(
          `「对不起～对不起～…哈啊～去～了…去～了～高～…高潮了～～${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:76`)) {
        await era.printAndWait(
          `「哈啊哈啊…一边想着狂王大人的家伙一边撸鸡鸡根本停不下来啊～${heart(1)} 啊嗯～啊啊嗯～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在床上把双腿张得大大的并撸起了阴茎。`,
        );
        await era.printAndWait(
          `她的肚子上出现了${a_count}回分量的精液弄成的水洼。时不时${target_name}会捧起这些精液一边舔一边继续自慰。`,
        );

        await era.printAndWait(
          `「嗯～啊啊～嗯～…狂王大人～${heart(1)} 狂王大人～${heart(1)} 让我变得更爽吧～！」`,
        );
      } else if (era.get(`talent:${target}:85`)) {
        await era.printAndWait(
          `「嗯呼呜…嗯～嗯～…哈啊哈啊…比起魔王大人的…狂王大人的更好～${heart(1)} 啊～啊～啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不断地撸着已经被精液弄脏的阴茎、喘着热气。`,
        );
        await era.printAndWait(
          `「啊啊～…明明被魔王大人抱了～！却还是想着狂王大人的…这样的…啊～…哈啊啊啊～${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「哈啊～…狂王大人…狂王大人…♪」`);
        await era.printAndWait(
          `${target_name}一边喘着热气一边激烈地撸着阴茎………`,
        );
      }

      if (chara(target).kojo.NTR_657 == 0) {
        await era.print('');
        await era.printAndWait(
          `好像${target_name}对狂王的狂热情绪已经平静下来了的样子………`,
        );
      }
    } else if (Q == 1) {
      await era.printAndWait(`「啊～…啊嗯～…蕾丝交真好～…啊啊……啊嗯～♪」`);
      await era.printAndWait(
        `${target_name}像想要寻找${assi_name}的余烬似的用手指摸向了私处………`,
      );
    } else if (Q == 2) {
      await era.printAndWait(
        `「下次什么时候才能再和那条野狗做爱呢…啊啊…嗯～…啊啊…嗯～♪」`,
      );
      await era.printAndWait(
        `${target_name}用自己的手指自慰着但完全无法满足的样子………`,
      );
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        era.get(`talent:${target}:74`) == 1 &&
        (chara(target).kojo.调教后自慰 < 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊嗯～…啊～啊啊～…太棒了～${heart(1)} 太棒了～${heart(1)} 想着魔王大人并自慰真是太棒了～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边撸着阴茎一边用手抠着秘穴、在激烈的自慰下弓起了腰、在床上化作了一条美丽的桥梁。`,
        );
        await era.printAndWait(
          `「啊嗯～啊嗯～${heart(1)} 啊啊嗯～${heart(1)} 一边啾啾地吸吮着魔王大人的后颈一边撸鸡鸡真爽～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边叫嚷着隐藏的愿望一边反复激烈自慰着。${a_count > 1 ? '射精多次后' : '射精后'}精液涂满了阴茎、用手抠着秘穴。`,
        );

        await era.printAndWait(
          `「哦吼～…哦～哦～…啊哦哦哦～${heart(1)} 咿咿咿～${heart(1)} 咿咿咿咿咿～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}癫狂地叫唤着完全沉浸在了自慰之中………`,
        );
        // CFLAG:261  = 7（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`talent:${target}:74`) == 1 &&
        (chara(target).kojo.调教后自慰 < 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊嗯～…嗯～…啊嗯～…${heart(1)} 明明知道那样抱我会让我变得奇怪的…你真坏${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边激烈的撸着鸡鸡一边呻吟着。${a_count > 1 ? '迎来多次绝顶的' : '迎来绝顶的'}阴茎丝毫没有萎下去的迹象。`,
        );

        await era.printAndWait(
          `「啊哈～哈啊哈啊…啊啊嗯～魔王大人～魔王大人～${heart(1)} 啊～啊～啊哈啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边激烈地撸着涂满精液的阴茎一边不断发出兴奋的声音。`,
        );
        await era.printAndWait(
          `「哈啊～哈啊～${heart(1)} 好爽～好爽哦～…最喜欢撸鸡鸡了…${heart(1)}」`,
        );
        // CFLAG:261  = 6（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…嗯～…哈啊～…鸡鸡好舒服啊～…啊～…啊～…咕呜～${heart(1)}」`,
        );
        await era.printAndWait(
          `因为${target_name}不断绝顶、周围布满了精液水洼。`,
        );
        await era.printAndWait(
          `「为什么…前面的话…本来明明这样弄很快就可以满足的入睡了啊…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `「不行…还要继续自慰…呜…哈啊～…啊嗯～…啊哈啊啊${heart(1)}」`,
        );
        // CFLAG:261  = 5（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯～…啊啊～…嗯～！哈啊哈啊…啊啊…我明明刚刚还被那个人抱过的…哈啊～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}自慰地停不下来的样子、撸着勃起变硬的阴茎${a_count > 1 ? '不断迎来绝顶' : '迎来绝顶'}。`,
        );

        await era.printAndWait(
          `「啊～…啊啊～啊哈啊～${heart(1)} 讨厌…手停不下来………」`,
        );
        await era.printAndWait(
          `「哈啊～不继续抱我的你好坏啊～…哈啊～又要高潮了～${heart(1)}」`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:74`) == 1 &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯嗯呜～…好棒～…自慰好棒～…啊～啊哈啊～♪」`);
        await era.printAndWait(
          `${target_name}激烈地撸着阴茎并摩擦着秘穴。身体痉挛起来的${target_name}渐渐弓起了腰化作了一条桥。`,
        );
        await era.printAndWait(
          `「嗯吼呜～…哦～哦哦～♪ 这样射精的话…我、我的脸会～被射到的…啊～哈啊～啊哈啊～！！！」`,
        );
        await era.printAndWait(
          `${target_name}发出绝顶的叫声的同时、从阴茎喷出了大量的精液、这些精液把${target_name}的脸染得一片雪白………`,
        );
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊～…啊嗯～…嗯～…撸管好爽啊～♪ 好想一直撸下去…哈啊～啊啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}撸着自己的勃起变硬的阴茎、比平常更加激烈的样子。`,
        );
        await era.printAndWait(`「哈啊哈啊…啊啊～…哈啊～…高潮了…高潮了♪」`);
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 2;
      } else if (chara(target).kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊…哈啊…虽然…还不太熟悉…为什么这样做…这样自慰会停不下来呢………」`,
        );
        await era.printAndWait(`「呜啊～…又、又出来了～！」」`);
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「啊呼…啊…啊啊…啊呜…呜呜」`);
      await era.printAndWait(
        `${assi_name}享受着与坏掉的${target_name}的蕾丝PLAY………`,
      );
    } else if (
      era.get(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈啊哈啊…啊嗯～…来吧…让你更加舒服吧${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用小巧的身体将${assi_name}推倒、一边从上方不断降下雨点般的亲吻一边用阴茎摩擦起了对方的下腹部。`,
      );
      await era.printAndWait(
        `「就这样侵犯你也可以哦…诶？不要？真拿你没办法呢」`,
      );
      await era.printAndWait(
        `${target_name}舔了舔嘴唇并用她那变得粘糊糊的手开始摸起了${assi_name}的敏感部位。`,
      );
      await era.printAndWait(
        `「来嘛、忍不住了的话随时都可以说哦………${heart(1)}」`,
      );
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「不、不要啊…再这样下去…要出轨了啊…啊～…啊啊～」`,
      );
      await era.printAndWait(
        `${target_name}一边拒绝着一边渐渐也无法抵抗${assi_name}对阴茎的爱抚。`,
      );
      await era.printAndWait(
        `「啊～…啊啊～…讨厌～不要看…啊～…高潮了…高潮了～………」`,
      );
      await era.printAndWait(
        `${target_name}被${assi_name}就这样推倒、享受了一段浓厚的时光………`,
      );
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊～…啊啊～…小穴互相摩擦着真爽啊～…啊啊～♪」`);
      await era.printAndWait(
        `${target_name}和${assi_name}互相摩擦着秘穴、用松叶崩的体位快活着。`,
      );
      await era.printAndWait(
        `「嗯呼呜…呼呼…这样子也很舒服呢…哈啊哈啊…啊嗯～…再用力点摩擦…哈啊～♪」`,
      );
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「唔呼呼、不会插你的、安心吧…啊～…啊啊～♪」`);
      await era.printAndWait(
        `${target_name}用阴茎摩擦着${assi_name}的腹部享受着对方的反应的样子………`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 2;
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「啊～…嗯～…呜嗯…那里、好舒服…啊嗯～…啊…哈啊哈啊………」`,
      );
      await era.printAndWait(`${target_name}任${assi_name}为所欲为………`);
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `「啊呼…嗯…嘞噜…嘞噜嘞噜嘞噜嘞噜嘞噜嘞噜嘞噜嘞噜…………」`,
      );
      await era.printAndWait(`${target_name}痴痴地不断舔舐着阴茎………`);
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「咕啾……嘞噜嘞噜…啊、变大了呢、早上好${heart(1)} 嘞噜…啾～啾噗～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}纠缠不休的舔舐着射精过的${player_name}的阴茎、慢慢地把它弄干净。`,
      );
      await era.printAndWait(`「噗啊………一大早就这么精神呢…是在引诱我吗？」`);
      await era.printAndWait(`${target_name}微微一笑再次开始了口腔奉仕。`);
      await era.printAndWait(
        `「嗯咻噜～…嘞噜${heart(1)} 在我的嘴里…更多地射出来吧${heart(1)} 嘞噜嘞噜…啾噗${heart(1)}」`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 3;
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「早安、亲爱的${heart(1)} 唔呼呼、明明本来只是想问个早的」`,
      );
      await era.printAndWait(
        `${target_name}怜爱的擦拭着${player_name}的阴茎。`,
      );
      await era.printAndWait(
        `「一看到它这么精神…我就按捺不住了呢…嗯…咕啾…嗯噗…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}开始含住${player_name}的阴茎、就这样被在喉咙里面射精了。`,
      );
      await era.printAndWait(
        `「哈噗～…嗯～…嗯噗呜…多射点…我会全部喝下去的…嗯～嗯～嗯噗呜～${heart(1)}」`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈啊哈啊…嗯啾～…啾噗…啾…唔呼呼、因为一大清早就这么精神…噗噜～♪」`,
      );
      await era.printAndWait(
        `${target_name}开心的对${player_name}的阴茎做事后处理。`,
      );
      await era.printAndWait(`「啊哈…哈啊哈啊…变得更舒服吧…啾～啾呜呜」`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 2;
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「嗯～…啊哈…哈啊…啊、早安…正含着你的呢…嗯咻噜…♪」`,
      );
      await era.printAndWait(`「哈姆～…嗯～…就这样射出来也行哦…嗯呜…嘞噜♪」`);
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊～…嗯～…再抱我…哈啊～…不要离开…啊～…啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被${player_name}压住持续被侵犯着。`,
      );
      await era.printAndWait(
        `但是${target_name}任${player_name}为所欲为、从不为调教的做爱中感到了愉悦。`,
      );
      await era.printAndWait(
        `「哈～…哈啊…你的…啊～…哈啊～${heart(1)} …在我的小穴里…塞得满满的～感觉到了…啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}曾经狭小的秘穴在${player_name}的开发下已经可以完全插进底部了。`,
      );
      await era.printAndWait(
        `「啊啊～…啊嗯～…哈啊～…继续抱我…我…被你抱着感到好幸福…啊～啊啊～${heart(1)}」`,
      );
      if (s >= 3) {
        await era.printAndWait(`${target_name}被中出${s}回露出了满足的表情………`);
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 2;
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「啊～…你…哈啊～…嗯～…呼啊…好深…啊～啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${player_name}完全为自身泄欲而抱住了${target_name}。`,
      );
      await era.printAndWait(
        `不以调教为目的的做爱。被按在床上、阴道深处不断被疼爱的${target_name}娇喘了起来。`,
      );
      await era.printAndWait(
        `「啊啊～…好棒～…你…好激烈啊…啊嗯～…哈啊～…啊～…啊啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `然后在结束时往${target_name}的两腿之间播撒了${s}回份的精液………`,
      );

      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      if (
        era.get(`talent:${target}:9`) == 1 &&
        (chara(target).kojo.夜袭 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呼…呼啊…啊啊…啊啊………」`);
        await era.printAndWait(
          `坏掉的${target_name}想要被自己的主人抱，潜入了${master_name}的房间………`,
        );
        // CFLAG:265  = 2（变量语义：CFLAG 族，265）
        chara(target).kojo.夜袭 = 2;
      } else {
        await era.printAndWait(
          `「晚上好…唔呼呼、来抱你了哟…不和你肌肤相亲的话人家会睡不着呢」`,
        );
        await era.printAndWait(
          `${target_name}脸颊染上了红色、不给你回答的机会就钻入了被窝。`,
        );
        await era.printAndWait(`「呐、所以说…请好好疼爱人家吧………${heart(1)}」`);
        // CFLAG:265  = 1（变量语义：CFLAG 族，265）
        chara(target).kojo.夜袭 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era.get(`talent:${target}:85`) && era.get(`mark:${target}:3`) < 3) {
      await era.printAndWait(
        `「小孩子的时候…有个占卜师曾经说过呢”总有一天你的面前会出现两个王、哪边是通往地狱的大门、要好好选择啊”」`,
      );
      await era.printAndWait(`「算上狂王那时候的话…果然你是地狱的门呢………」`);
      await era.printAndWait(
        `${target_name}悲伤地眯起了眼睛，不让泪水流出来。那湿润的瞳孔里你的形象越来越模糊了。`,
      );
      await era.printAndWait(`「………最后的最后赌输了呢」`);
    } else if (era.get(`mark:${target}:3`) == 3) {
      await era.printAndWait(`「果然、不曾和你见面更好呢………」`);
      await era.printAndWait(
        `${target_name}吐出了这样一句意味深长的话，转身登上了马车………`,
      );
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(
        `「诶、骗、骗人吧…把人家卖掉什么是玩笑吧？啊哈哈…」`,
      );
      await era.printAndWait(
        `「比人家好的扶她肉棒不可能有的吧！不、不要…放开我…不要啊…人家才不会被卖掉！」`,
      );
      await era.printAndWait(`${target_name}哭泣挣扎着被奴隶商人押上了马车………`);
    } else {
      await era.printAndWait(`「这样啊…被卖掉了呢………」`);
      await era.printAndWait(`「果然…还是不行……呢」`);
    }
    await era.print('');
    if (era.get(`talent:${target}:122`) != 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 == 11) {
    const cstr2 = era.get(`cstr:${target}:2`) || ''; // %CSTR:2%（孩子生父的自定义称呼，K3 先例）
    if (chara(target).kojo.妊娠发觉 == 0) {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(`「啊哈哈…啊啊…肚子里…有什么东西…啊啊啊～」`);
        await era.printAndWait(`${target_name}流着口水一副痴呆的样子………`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「呐啊、已经确认有了你的孩子呢、人家…稍微有些紧张…身体…不是很有自信能养好它呐………」`,
        );
        await era.printAndWait(
          `${target_name}向${master_name}倾诉着妊娠后的不安………`,
        );
      } else if (chara(target).event.妊娠相手 == 2) {
        await era.printAndWait(
          `「虽然不用向你报告…好像有了${cstr2}的孩子………唔、总觉得知道父亲是谁………」`,
        );
        await era.printAndWait(`${target_name}向${master_name}报告妊娠情况………`);
      } else if (chara(target).event.妊娠相手 == 3) {
        await era.printAndWait(
          `「虽然不用向你报告…好像有了${cstr2}的孩子………唔、总觉得知道父亲是谁………」`,
        );
        await era.printAndWait(`${target_name}向${master_name}报告妊娠情况………`);
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        era.get(`talent:${target}:136`) &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(
          `「怀了狗的孩子呢…啊啊、人家的身体已经变成牝犬什么的终于有了实感呢♪`,
        );
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(`「骗、骗人…有了那条狗的孩子…为什么…………」`);
      } else if (chara(target).event.妊娠相手 == 7) {
        await era.printAndWait(`「人家有了狂王大人的孩子呢…」`);
      } else {
        await era.printAndWait(`「呼、做了那样的事…怀孕了呢………」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      chara(target).kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(`「啊哈哈…啊啊…肚子里…有什么东西…啊啊啊～」`);
        await era.printAndWait(`${target_name}流着口水一副痴呆的样子………`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「呐啊、已经确认有了你的孩子呢、人家…稍微有些紧张…身体…不是很有自信能养好它呐………」`,
        );
        await era.printAndWait(
          `${target_name}向${master_name}倾诉着妊娠后的不安………`,
        );
      } else if (chara(target).event.妊娠相手 == 2) {
        await era.printAndWait(
          `「虽然不用向你报告…好像有了${cstr2}的孩子………唔、总觉得知道父亲是谁………」`,
        );
        await era.printAndWait(`${target_name}向${master_name}报告妊娠情况………`);
      } else if (chara(target).event.妊娠相手 == 3) {
        await era.printAndWait(
          `「虽然不用向你报告…好像有了${cstr2}的孩子………唔、总觉得知道父亲是谁………」`,
        );
        await era.printAndWait(`${target_name}向${master_name}报告妊娠情况………`);
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        era.get(`talent:${target}:136`) &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(
          `「怀了狗的孩子呢…啊啊、人家的身体已经变成牝犬什么的终于有了实感呢♪」`,
        );
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(`「骗、骗人…有了那条狗的孩子…为什么…………」`);
      } else if (chara(target).event.妊娠相手 == 7) {
        await era.printAndWait(`「人家有了狂王大人的孩子呢…」`);
      } else {
        await era.printAndWait(`「呼、做了那样的事…怀孕了呢………」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      chara(target).kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 12) {
    if (chara(target).kojo.生产 == 0) {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(`「啊…啊呜…呜呜………」`);
        await era.printAndWait(`${target_name}对自己生的孩子完全没有兴趣………`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「是你的孩子哟…唔呼呼。唔嗯、非常有精神呢、很快连周边巡逻这样的事情也能做了吧」`,
        );
        await era.printAndWait(`「从今往后还要继续生下你的孩子呢${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」`,
        );
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      chara(target).kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(`「啊…啊呜…呜呜………」`);
        await era.printAndWait(`${target_name}对自己生的孩子完全没有兴趣………`);
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「是你的孩子哟…唔呼呼。唔嗯、非常有精神呢、很快连周边巡逻这样的事情也能做了吧」`,
        );
        await era.printAndWait(`「从今往后还要继续生下你的孩子呢${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」`,
        );
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      chara(target).kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(
          `「很快就要生出来了、请安心期待吧、亲・爱・的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}温柔地抚摸着因为临月而膨大的腹部………`,
        );
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「看啦、爸爸来看你了哟～？要当个好孩子呢～♪」`);
        await era.printAndWait(`${target_name}满面笑容的哄着孩子………`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    chara(target).kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 == 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「离别这么快就到来了…真是寂寞呢………」`);
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    chara(target).kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 == 999) {
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

/**
 * dungeon_ryouzyoku_k10：迷宫凌辱开场口上（ryouzyoku_kojo_family 分派，
 * era_flag.target 已由调用方设为凌辱对象）。
 */
async function dungeon_ryouzyoku_k10() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(
      `「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」`,
    );
    await era.printAndWait(`「咕…呜啊啊…啊～…不要啊啊啊啊！」`);
    await era.printAndWait(
      `战败的${target_name}发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………`,
    );
  } else {
    await era.printAndWait(
      `「请！请住手…哈啊～…被魔物侵犯什么的…啊～…好烫…哈啊～！」`,
    );
    await era.printAndWait(`「咕…呜啊啊…啊～…不要啊啊啊啊！」`);
    await era.printAndWait(
      `战败的${target_name}发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………`,
    );
  }

  return 0;
}

/**
 * dungeon_ryouzyoku_after_k10：迷宫凌辱结束口上。
 */
async function dungeon_ryouzyoku_after_k10() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「骗人…我竟然还是处女吗………」`);
    await era.printAndWait(
      `${target_name}对自己被蹂躏的满身狼藉却奇迹般地还是处女感到了惊叹。`,
    );
    await era.printAndWait(`这究竟是幸运还是不幸，现在还未可知………`);

    if (era.get(`exp:${target}:1`) > 20) {
      await era.print('');
      await era.printAndWait(`「屁股那里…哈啊～…被撕裂了吗…？」`);
      await era.printAndWait(
        `${target_name}稍微一活动大量的魔物精液和粘液就从肛门里漏了出来。`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.print('');
      await era.printAndWait(`「唏…呜啊…啊…大家的威武肉棒…很、很美味…呜呜呜」`);
      await era.printAndWait(`${target_name}被强迫着说出了羞耻的口交感想。`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.print('');
      await era.printAndWait(`「啊…啊…大家的精液都…很、很美味…呜呜呜」`);
      await era.printAndWait(
        `${target_name}一边忍着吐意喝着精液、一边哭着说出了这样的感想………`,
      );
    }
  } else {
    await era.printAndWait(`「啊啊…被狠狠地…侵犯了呢…」`);
    await era.printAndWait(
      `${target_name}被魔物们轮奸过后、衣服已经变得破破烂烂的了………`,
    );

    if (era.get(`exp:${target}:0`) > 20) {
      await era.print('');
      await era.printAndWait(`「哈啊…哈啊…可恶…小穴都没感觉了…怎么办啊………」`);
      await era.printAndWait(
        `${target_name}稍稍一动，大量的怪物精液和粘液就从红肿的穴口漏了出来。`,
      );
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.print('');
      await era.printAndWait(`「屁股那里…哈啊～…被撕裂了吗…？」`);
      await era.printAndWait(
        `${target_name}稍微一活动大量的魔物精液和粘液就从肛门里漏了出来。`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.print('');
      await era.printAndWait(`「唏…呜啊…啊…大家的威武肉棒…很、很美味…呜呜呜」`);
      await era.printAndWait(`${target_name}被强迫着说出了羞耻的口交感想`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.print('');
      await era.printAndWait(`「啊…啊…大家的精液都…很、很美味…呜呜呜」`);
      await era.printAndWait(
        `${target_name}一边忍着吐意喝着精液、一边哭着说出了这样的感想………`,
      );
    }
  }

  return 0;
}

/**
 * dungeon_victory_k10：迷宫战斗胜利口上。
 */
async function dungeon_victory_k10(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const a = era_flag.target;

  if (rand_n(3) == 0) {
    await era.printAndWait(`「唔呼呼、今天的魔力格外顺畅呢♪」`);
  } else if (rand_n(2) == 0) {
    await era.printAndWait(`「呼呼呼、完全称不上对手嘛♪」`);
  } else {
    await era.printAndWait(`「索敌…残存０…无事的结束了呢」`);
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`「………哈啊哈啊…真是、好累人啊」`);
  } else {
    await era.printAndWait(`「接下来、今天也向更深处进发吧」`);
  }

  return 0;
}

/**
 * dungeon_attack_k10：迷宫战斗攻击口上。
 */
async function dungeon_attack_k10(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (chara(target).invasion.状态 == 2) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「燃烧吧！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「弹开吧！」`);
    } else {
      await era.printAndWait(`「吹飞他们！」`);
    }
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「见识一下真正的人家吧」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「来吧、把你也变成魔王大人的东西（舔唇）」`);
    } else {
      await era.printAndWait(`「特意来被侵犯什么的，你也是个淫乱的人呢」`);
    }
  }

  return 0;
}

/**
 * benki_koujo_k10：肉便器行动口上（FLAG:62 五档进度）。
 */
async function benki_koujo_k10(rand) {
  void rand;
  const a = era_flag.target;

  if (game.train.肉便器行动 == 0) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「哈啊～…更多更多…用力干人家吧${heart(1)}」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「咿…不要…不要啊…那么脏的不要过来！」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「啊～…啊啊～…人家…会好好做的…不要那么近…嗯～…呜咕～！」`,
      );
    } else {
      await era.printAndWait(`「恶心…那样的…好过分…嗯～…啊咕呜！」」`);
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「哈啊哈啊…啊啊嗯${heart(1)} 姐姐大人那边才是…好好用人家的肉棒啦${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「啊、呜、是、姐姐大人…被姐姐大人使用的话…很、很开心…唔唔唔…」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「啊啊…会好好侍奉的…请不要弄痛我………」`);
    } else {
      await era.printAndWait(
        `「哈啊～…痛疼什么的很讨厌…的说…所以说…请温柔的…哈啊～！」`,
      );
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「哈啊～…汪酱的鸡巴好棒${heart(1)} 哈啊哈啊…汪汪嗯～…啊嗯…嗷呜呜嗯～${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「再继续下去…哈啊～…人家就要…坏掉了…坏掉了啊啊………」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「被狗侵犯着有了感觉…人家…啊～啊呜～…咕～！」`);
    } else {
      await era.printAndWait(`「讨厌…这样的事情…不要啦！」`);
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊嘿噫～！肉棒好舒服！两根肉棒比肉棒更舒服${heart(1)} 小穴和屁股穴被这样插着要变成笨蛋了${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「啊啊～…噫…快停下…被你们弄松了的话…人家会被最重要的人讨厌的…啊～啊啊～！」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「老实说的话…嗯～哈啊～！再稍微温柔一点…啊～…哈咿咿！」`,
      );
    } else {
      await era.printAndWait(`「不要…已经…要死掉了…要死掉啦………」`);
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊嗯～啊啊嗯～${heart(1)} 人家的小穴非常舒服吧？原本是魔王专用的阴穴哟…啊～啊哈啊～${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「啊～…呜呜～！…咕唔～人家明明是那个人的东西…你们不要插进来…啊～啊啊～！」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「老实说的话…哈啊～…稍微温柔一点…啊～…啊啊～！」`,
      );
    } else {
      await era.printAndWait(`「不、不要…哈啊～…坏掉惹…小穴要坏掉了啊！」`);
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「哈啊嗯～…屁股穴也好棒${heart(1)} 啊啊～…用你们的肉棒让人家变得更舒服吧${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「哈啊～…屁股…发出了咔啪咔啪的声音…咦…还、还要做吗？…啊～…不要啊…啊啊～！」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「啊～…啊啊～…人家是你们的…肛、肛穴便器的说…啊啊～…哈噫！」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊…已经坏掉了…被弄得乱七八糟了…噫…住手啊…啊啊～…呀～！」`,
      );
    }
  }

  return 0;
}

/**
 * colosseum_kojo_10：死斗场本地函数（非 family 分发，由
 * kojo_message_com_10 头部检查 TEQUIP:55 直接调用，K3 colosseum_kojo_3
 * 同构先例）。SELECTCOM 55/56 两支。
 */
async function colosseum_kojo_10(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const assi = era_flag.assi;
  const assi_name = assi >= 0 ? chara_callname(assi) : '';

  if (era_flag.selectcom == 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站立的力气都没有了……`);
    } else {
      await era.printAndWait(
        `${target_name}被死斗场狂热的气氛和对手的眼神影响着，不禁颤抖了起来……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「哈啊哈啊…库～…以、已经站不起来了啦…」`);
        await era.printAndWait(
          `${target_name}双膝脱力的跪了下来、向${assi_name}摆出了讨饶一样的姿势………`,
        );
      } else {
        await era.printAndWait(`「请住手…不要过来了…哈啊～！」`);
        await era.printAndWait(`${target_name}连站立的力气都没有了………`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「不会输给你！」`);
        await era.printAndWait(
          `${target_name}握紧武器、和${assi_name}对峙着………`,
        );
      } else {
        await era.printAndWait(`「咕～…能拿出全力的话这种程度…啧！」`);
        await era.printAndWait(
          `${target_name}感受着被封印了力量的无力，对现在的情况稍微感到了恐惧………`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「哈噗…唔…嗯～…嗯～…嗯呼…还要再舔吗…嗯～…咕噜…啾」`,
      );
      // 同一行输出：无后缀 PRINTFORM + 两条 SIF 的 PRINT
      // + 收行的 PRINTFORMW（#622）。SIF 条件提到语句外当条件、文本留在输出语句里
      const assi_has_penis =
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1;
      const assi_has_strap =
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era.get('item:4') == 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}` +
          (assi_has_penis ? `坚硬的雄性器` : '') +
          (assi_has_strap ? `粗大的假阳具` : '') +
          `让${target_name}一边舔一边露出了心旷神怡的表情……`,
      );
    } else {
      await era.printAndWait(`「咕噜…嗯～…咳咳…等下…会好好舔的啦…嗯～咕噜…」`);
      await era.printAndWait(
        `${target_name}把带着令人作呕气味的阴茎含了进去……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊～…咕～…唔～…啊啊～！再继续的话…嗯～！」`);
      await era.printAndWait(`${target_name}抓住了${assi_name}的胸部。`);
      await era.printAndWait(
        `接下来${assi_name}在观众们的注视下被玩弄起了乳房………`,
      );
    } else {
      await era.printAndWait(`「噫…那么用力捏的话～…啊～…啊啊～！」`);
      await era.printAndWait(`${target_name}的胸部被蹂躏着发出了悲鸣………`);
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「呀～！请住手～求你了～…啊啊～…啊～！」`);
      // 与初回同型（#622）
      const assi_has_penis =
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1;
      const assi_has_strap =
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era.get('item:4') == 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}听着${target_name}的悲鸣` +
          (assi_has_penis ? `用坚硬的雄性器` : '') +
          (assi_has_strap ? `用粗大的假阳具` : '') +
          `${target_name}的肛门被无慈悲的继续蹂躏着。`,
      );
      await era.printAndWait(
        `${target_name}的悲鸣传到观众席，让观客们欢呼了起来………`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「咳哦…呜噗…咔呃…咳…喀呃哦」`);
      await era.printAndWait(
        `${target_name}被巨魔侵犯着。那规格外的巨大阴茎每一次粗暴的插到底就让${target_name}的腹部凸起一条触目惊心的圆柱形状。`,
      );
      await era.printAndWait(
        `接下来在${target_name}的反吐中，巨魔继续强暴着她………`,
      );
    } else {
      await era.printAndWait(`「咿…不要～…那么大的东西插不进来的…啊啊～！」`);
      await era.printAndWait(`${target_name}被怪物侵犯了……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「屁股那～…哈啊～明明讨要那些肮脏的东西…啊～…哈啊～…噫～…屁股要坏掉了！」`,
      );
      // 与初回同型（#622）
      const assi_has_penis =
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1;
      const assi_has_strap =
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era.get('item:4') == 1; // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
      await era.printAndWait(
        `${assi_name}听着${target_name}的悲鸣` +
          (assi_has_penis ? `用坚硬的雄性器` : '') +
          (assi_has_strap ? `用粗大的假阳具` : '') +
          `${target_name}的肛门被无慈悲的继续蹂躏着。`,
      );
      await era.printAndWait(
        `${target_name}的悲鸣传到观众席，让观客们欢呼了起来………`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「啊嘎…咳…咔啊～…咕呃～…咔呃…咳咳～」`);
      await era.printAndWait(
        `可怜的${target_name}被巨魔的巨大阴茎捅入了肛门，发出了被踩死的青蛙一样的声音。`,
      );
      await era.printAndWait(
        `精致的肛门完全被破坏了，被巨魔的凶器扩张成了紫红色的肉洞、失去意识的${target_name}双眼翻白，四肢下垂，随着微弱的呼吸吐着泡泡。`,
      );
      await era.printAndWait(
        `观客们看到${target_name}凄惨的样子、沸腾了起来………`,
      );
    } else {
      await era.printAndWait(`「咿～…不…要～被玷污…啊～…啊啊～！」`);
      await era.printAndWait(
        `${target_name}被怪物双手抓住了纤腰，像自慰套一样前后套动了起来……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(`「这个史莱姆…媚药吗…哈啊～…啊呜～！」`);
    return 0;
  }

  return 0;
}

/**
 * ntr_koujo_k10：NTR 再捕获口上（K1/K3/K5/K7 同族先例，
 * P 由外部调用方传入，本文件内暂无调用点——与其余 K 文件同构现状）。
 */
async function ntr_koujo_k10(rand, P) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  P = P ?? 0;

  if (chara(target).kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    chara(target).kojo.NTR再捕获 = 1;

    // CFLAG:657  = RAND:3 + 1（变量语义：CFLAG 族，657）
    chara(target).kojo.NTR_657 = rand_n(3) + 1;
  }

  if (P == 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「不、不要…哈啊～…被你这样的人…人家的第一次…啊～…啊啊～！」`,
      );
      await era.printAndWait(
        `${target_name}因为破瓜的疼痛发出了悲鸣、大颗的泪珠从双眼里滚滚落下。`,
      );
      await era.printAndWait(
        `然而狂王毫不在意的把玩着${target_name}的扶她阴茎，开始品味她的处女肉穴………`,
      );
    } else {
      await era.printAndWait(
        `「被侵犯了…和魔王大人再会前被侵犯了…明明之前早点做了的话就…咕…哇啊——！」`,
      );
      await era.printAndWait(`${target_name}因为破瓜的疼痛和伤心发出了悲鸣。`);
      await era.printAndWait(
        `然而狂王毫不在意的把玩着${target_name}的扶她阴茎，开始品味她的处女肉穴………`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    chara(target).kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈啊哈啊～…啊～…嗯～！不吃掉人家的处女只是一个劲侵犯肛门什么的…哈啊～…狂王大人和魔王大人都喜欢做同样的事情呢…啊～咿呀呜！」`,
      );
      await era.printAndWait(
        `狂王听了${target_name}的话微微一笑，手指加力想要捏碎一样的捏紧了她的乳头。于是${target_name}因为这样的刺激悲鸣着收紧了肛门。`,
      );
      await era.printAndWait(`「咿～…哈啊～…不要这么粗暴嘛…哈啊～…啊啊～！」`);
    } else {
      await era.printAndWait(
        `「哈啊～…咿…哈…肛门侍奉告一段落的话…就来吃掉人家的处女…是真的吗…哈啊～！」`,
      );
      await era.printAndWait(`「咕…呜呜～…那人家要好好夹紧呢…啊～…啊咕」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    chara(target).kojo.NTR_652 = 1;

    // CFLAG:657 + = 1（变量语义：CFLAG 族，657 +）
    chara(target).kojo.NTR_657 += 1;
  } else if (P == 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「啊啊～…狗肉棒好舒服～…比魔族的短小肉棒要好一百倍${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}高兴地向观众们展示着自己和野兽交配的地方，观众的嘲笑声让她的动作愈发淫靡了………`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「不要啊～不要看…不要看我～…被狗侵犯着…还有感觉什么不要看啊啊啊！」`,
      );
    } else {
      await era.printAndWait(`「不要啊～！被狗侵犯什么的～…啊～…哈啊啊～！」`);
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    chara(target).kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「狂王大人的大肉棒好舒服${heart(1)} 哈嗯～…哈啊～…继续干人家啊…哈啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `「抱人家…请继续疼爱人家的淫乱小穴…哈啊～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊…哈～…啊嗯～♪…狂王大人的肉棒好热好硬…啊啊～…更多的插进来…啾啾地插进来啊啊啊」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    chara(target).kojo.NTR_654 = 1;

    // CFLAG:657 + = 1（变量语义：CFLAG 族，657 +）
    chara(target).kojo.NTR_657 += 1;
  } else if (P == 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「更多的射进来…哈啊～…人家最喜欢小穴和屁股同是被大肉棒插满了…啊啊～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊～…还要…就算操坏了也没关系…前面和后面都…哈啊～…都是你们的自慰肉桶啦…啊啊－～！」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    chara(target).kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「…人家的小穴和扶她鸡巴和屁股穴…都是为了侍奉大家而存在的${heart(1)}」`,
      );
      await era.printAndWait(
        `「虽然人家这样没料的幼儿体型也许不能让大家满意、不过请大家不要客气尽量拿去处理性欲吧…哈啊～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}抬起腰向围观的男性们摇摆着发出邀请。看到这光景的男人们一边嘲笑着${target_name}一边向她围了上来………`,
      );
    } else {
      await era.printAndWait(
        `「人家今天是大家的公用便所…请随意的而使用吧…啊啊…更多…更多的侵犯人家的便器小穴………」`,
      );
      await era.printAndWait(
        `${target_name}抬起腰向围观的男性们摇摆着发出邀请。看到这光景的男人们一边嘲笑着${target_name}一边向她围了上来………`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    chara(target).kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊…人家的王除了狂王大人以外都不行呢…对不起啦魔王大人…人家已经成为狂王大人的东西了${heart(1)}」`,
      );
      await era.printAndWait(`「狂王大人…请更多的疼爱人家嘛………${heart(1)}」`);
      await era.printAndWait(
        `看着痴态毕露的${target_name}狂王对着镜头露出了满意的神色………`,
      );
    } else {
      await era.printAndWait(
        `「哈啊哈啊…果然我在狂王大人的身边最合适了…啊啊…好舒服…哈啊…」`,
      );
      await era.printAndWait(
        `「狂王大人…更多的疼爱你的牝奴隶${target_name}嘛………」`,
      );
    }

    // CFLAG:657 + = 1（变量语义：CFLAG 族，657 +）
    chara(target).kojo.NTR_657 += 1;
  } else if (P == 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (chara(target).event.妊娠相手 == 1) {
        await era.printAndWait(`「那、那个是我的孩子！求求你还给我！」`);
        await era.printAndWait(
          `用刚刚出产后的身体抱着必死的决心移动着${target_name}向狂王发出了悲愿。`,
        );
        await era.printAndWait(
          `但是那个拼命的请愿被忽视了，公开生育的观众们一哄而上，无数的手掩盖了婴儿凄惨的身姿，血液开始在地面上流淌………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊哈啊哈啊、我这样的身体也能生出孩子，真是幸福呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的视线向着镜头那侧的${player_name}一边喘息着一边说道。`,
        );
        await era.printAndWait(
          `「从今以后会有好~多小宝宝出产的录像寄给你呢，请好好期待吧${heart(1)}」`,
        );
      }
    } else {
      await era.printAndWait(`「哈啊哈啊哈啊、人、人家、生出来了呢…」`);
      await era.printAndWait(
        `${target_name}偏过头和狂王说了什么，兴奋的点了点头。`,
      );
      await era.printAndWait(
        `「嗯～狂王大人………是的、我的子宫是狂王大人的东西、从今以后会被各种各样的雄性子种汁灌进去，为狂王大人产出好~多孩子的…♪」`,
      );
    }
  }

  return 0;
}

/**
 * exucution_koujo_k10：处刑口上（TFLAG:16）。档位 7 是未填写正文的
 * 台词槽，输出空行。
 */
async function exucution_koujo_k10(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    await era.printAndWait(
      `「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」`,
    );
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait(`「啊啊 …命令…请下命令…吧……」`);
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait(`「对、对我做这种过分的事情什么的………～！」`);
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

/**
 * museum_koujo_k10：博物馆展示口上（TFLAG:500）。档位 2-9 是未填写
 * 正文的台词槽，输出空行。
 */
async function museum_koujo_k10(rand) {
  void rand;

  if (game.event.博物馆口上 == 0) {
    await era.printAndWait(
      `「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」`,
    );
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait(`「啊啊…我的身姿就这样永远的残留下去了呢………」`);
  } else if (game.event.博物馆口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 4) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 7) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 8) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 9) {
    await era.printAndWait('');
  }
}

/**
 * banishment_koujo_k10：放逐口上（TFLAG:510）。档位 1-4 是未填写正文的
 * 台词槽，输出空行。
 */
async function banishment_koujo_k10(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    await era.printAndWait(`「我的魔法连让小石头动一下都不行了…啊啊………」`);
  } else if (game.event.流放口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 4) {
    await era.printAndWait('');
  }
}

/**
 * public_exucution_koujo_k10：公开处刑口上（TFLAG:520）。
 */
async function public_exucution_koujo_k10(rand) {
  void rand;

  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait(
      `「呐..开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」`,
    );
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait(
      `「咿…绞刑不要…饶了我！…求求你了！请住手吧！请住..手..呃..！」`,
    );
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

/**
 * grotesque_koujo_k10：猎奇处刑口上（TFLAG:530，取值 0-6 与处刑选项
 * 一一对应）。七档均为未填写正文的台词槽，输出空行；处刑场景文本由
 * 通用处刑流程（ere/event/event-grotesque.js）统一输出。
 */
async function grotesque_koujo_k10(rand) {
  void rand;

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

/**
 * enterenemy_koujo_k10：魔王被俘时敌方入场口上。
 */
async function enterenemy_koujo_k10(rand) {
  void rand;
  const a = era_flag.target;

  if (era.get(`talent:${a}:76`) == 1) {
    await era.printAndWait(
      `「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」`,
    );
  } else if (era.get(`talent:${a}:85`) == 1) {
    await era.printAndWait(`「不要逃跑哟、魔王大人${heart(1)}」`);
  } else {
    await era.printAndWait(`「想要和您好·好·谈·谈哟、希望不要被打扰呢」`);
  }
}

/**
 * gohoubi_request_koujo_k10：商店奖赏请求口上。
 * CFLAG:A:504（要求奖赏）分支，A 恒为当前调教目标（K3 kojo-k3-noble.js
 * 的 gohoubi_request_koujo_k3 先例）。
 */
async function gohoubi_request_koujo_k10(rand) {
  void rand;
  const a = era_flag.target;

  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(`「好麻烦，唔，那给我一些钱好了」`);
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 同一行输出：无后缀 PRINTFORM + IF/ELSEIF 的
    // PRINT（互斥三支）+ 收行的 PRINTFORMW（#622）。条件提到语句外、文本留在语句里
    const reward = chara(a).stronghold.要求奖赏;
    await era.printAndWait(
      `「人家想和` +
        (reward == 1 ? `犬` : reward == 2 ? `猪` : reward == 3 ? `马` : '') +
        `交尾试试看♪」`,
    );
    await era.printAndWait(`${chara_callname(a)}提出了想要关爱动物的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(`「人家想要你的嘴唇、不行吗？」`);
    await era.printAndWait(
      `${chara_callname(a)}提出了想要与魔王行口舌之争的奖励。`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(`「回来以后、为了平息发热的身体轻好好地抱我哟」`);
    await era.printAndWait(`${chara_callname(a)}提出了想要啪啪啪的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(`「人家、想要独占你的精液一天呢」`);
    await era.printAndWait(`${chara_callname(a)}提出了想要魔王汁一杯的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(
      `「雄性也好雌性也好和大家一起开个热闹的乱交派对吧」`,
    );
    await era.printAndWait(`${chara_callname(a)}提出了想要海天盛筵的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(`「人家想喝魔王大人的小便呢」`);
    await era.printAndWait(`${chara_callname(a)}提出了饮用圣水的奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`「那么..可以赏给人家几个童贞的孩子嘛？」`);
    await era.printAndWait(`${chara_callname(a)}提出了童贞狩猎的奖励。`);
  }
}

/**
 * gohoubi_after_koujo_k10：战果奖赏口上（gohoubi_after_koujo_family 分派
 * 前置 TARGET = A）。choice 即 TFLAG:18（0=空手而归/1=有勋章未
 * 兑换/2=已兑换奖赏，按 CFLAG:A:504 再分支）。
 */
async function gohoubi_after_koujo_k10(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice == 0) {
    await era.printAndWait(`「就这样不许动？哈？」`);
  } else if (choice == 1) {
    await era.printAndWait(`「唔呼呼、这个勋章会好好珍惜的哦」`);
  } else if (choice == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(`「只要有了这个就可以买新的实验药剂了呢」`);
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「啊嗯～！嗯～啊哈啊嗯～！果然和狗肛交最赞了…肉棒球肛塞好棒..再怎么射也不会漏出来呢${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯～！嗯～啊哈啊嗯～！果然和狗交尾最赞了！…肉棒球！小穴要被肉棒球翻出来了哦哦哦${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「啊嗯～！嗯～啊哈啊嗯～！果然和猪肛交最赞了…嗯～肠子被钻头肉棒卷起来惹${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯～！嗯～啊哈啊嗯～！果然和猪交尾最赞了！…嗯～用肉棒钻子把人家的子宫搅得稀巴烂吧～${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「啊嗯～！嗯～啊哈啊嗯～！果然和马肛交最赞了…嗯～肠子满满的${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊嗯～！嗯～啊哈啊嗯～！果然和马交尾最赞了！…嗯～唔哦哦～捅到子宫底了${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(
        `「啊嗯…嗯呼…呐啊、在更加努力一点呐～人家爱情能量摄取不足呢、嗯${heart(1)} 嗯啾…啾${heart(1)}」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「啊～！啊啊嗯～！嗯…十分感谢…把人家当作女孩子这样的操着…啊～哈啊～！嗯～好激烈…哈咿咿咿咿${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊～！啊啊嗯～！在肛穴里满满的出来了…啊～哈啊～！嗯～好激烈…哈咿咿咿咿${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait(
        `「真是的、不要弄在眼镜上不是说好了嘛…咘${heart(1)}」${chara_callname(a)}生气的鼓起了脸颊`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「哈啊哈啊…趁着这个气氛把人家的处女夺走就好了呢…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊～…还想要更多的乱交派对呢${heart(1)}为了奖赏去把那些笨蛋勇者都抓住吧♪」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait(`「只有你的尿能让人家感觉这么好吃呢♪」`);
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(`「被扶她躲走童贞可是贵重的体验呐、小哥」`);
      } else {
        await era.printAndWait(
          `「第一次是屁股真是对不起呐、但是人家就是想尝尝用屁股吃掉童贞肉棒的感觉啦${heart(1)}」`,
        );
      }
    }
  }
}

/**
 * osioki_koujo_k10：惩罚口上。choice 即 TFLAG:18。
 */
async function osioki_koujo_k10(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice == 0) {
    await era.printAndWait(`「得、得救了………」`);
  } else if (choice == 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「啊嘿～咿～！电流来惹…来了…来了来了噫${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「唏…噶啊！不、不行！在加强电流的话…不行啦啊啊啊啊！」`,
      );
    }
  } else if (choice == 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait(
        `「嗯呼呼…扶她就那么稀奇吗？好~请大家尽情的看吧！看着人家的扶她肉棒高潮的样子！」`,
      );
    } else {
      await era.printAndWait(
        `「什、什么嘛、扶他就那么稀奇吗？呜…别、别看啦…！」`,
      );
    }
  } else if (choice == 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait(
        `「啊哈啊…啊哈…在这种地方一边大便一边捋着扶她鸡鸡手淫什么的…我已经不行了…哈哈哈哈哈！」`,
      );
    } else {
      await era.printAndWait(`「呜咕，呜..(抽泣)…不要看啦！」`);
    }
  } else if (choice == 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「哈咿嗯～！接下来请给这个下贱的屁股惩罚吧！啊～啊哈啊～！这里～！这里！」`,
      );
    } else {
      await era.printAndWait(
        `「对、对不起的说下次一定好好地完成任务！啊～啊嘎！」`,
      );
    }
  } else if (choice == 5) {
    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「请向肉小便器${chara_callname(a)}更多的赐予宝贵的圣水吧！」`,
      );
    } else {
      await era.printAndWait(`「啊呜…呜呜…呜…不要…不要啊…这样子的………」`);
    }
  } else if (choice == 6) {
    await era.printAndWait(`「真是难以接受」`);
  } else if (choice == 7) {
    await era.printAndWait(`「不要开玩笑了！」`);
  } else if (choice == 8) {
    await era.printAndWait(
      `「啊噶啊啊！…请让我射精！人也好动物也好道具也好！让我的鸡巴射精啊啊…哈咿~~咿~~~！不可以往那里吹气啊啊啊！」`,
    );
  } else if (choice == 9) {
    await era.printAndWait(`「嘎嗷~嘎嗷~！」`);
  }
}

/**
 * gobi_koujo_k10：语尾口上。arg0 按心情（1=得意/2=怒/
 * 3=悲/4=羞/5=丢脸）取语尾片段，默认随机三选一（皆为句号，实测如此）。
 */
function gobi_koujo_k10(arg0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg0 == 1) {
    return `所以呢♪`;
  } else if (arg0 == 2) {
    return `哟！`;
  } else if (arg0 == 3) {
    return `怎么这样……。`;
  } else if (arg0 == 4) {
    return `……。`;
  } else if (arg0 == 5) {
    return `……。`;
  } else {
    if (rand_n(3) == 0) {
      return `。`;
    } else if (rand_n(2) == 0) {
      return `。`;
    } else {
      return `。`;
    }
  }
}

kojo_message_com_family.register(10, kojo_message_com_10);
self_kojo_family.register(10, self_kojo_k10);
kojo_message_palamcng_family.register(10, kojo_message_palamcng_10);
kojo_message_markcng_family.register(10, kojo_message_markcng_10);
gohoubi_after_koujo_family.register(10, (cid, choice) =>
  gohoubi_after_koujo_k10(undefined, cid, choice),
);
osioski_koujo_family.register(10, (cid, choice) =>
  osioki_koujo_k10(undefined, cid, choice),
);
gohoubi_request_koujo_family.register(10, () => gohoubi_request_koujo_k10());
ryouzyoku_kojo_family.register(10, dungeon_ryouzyoku_k10);
ryouzyoku_after_kojo_family.register(10, dungeon_ryouzyoku_after_k10);
gobi_koujo_family.register(10, gobi_koujo_k10);
benki_koujo_family.register(10, benki_koujo_k10);
enterenemy_koujo_family.register(10, enterenemy_koujo_k10);
dungeon_victory_family.register(10, dungeon_victory_k10);
dungeon_attack_family.register(10, dungeon_attack_k10);
ntr_koujo_family.register(10, ntr_koujo_k10);
exucution_koujo_family.register(10, exucution_koujo_k10);
museum_koujo_family.register(10, museum_koujo_k10);
banishment_koujo_family.register(10, banishment_koujo_k10);
public_exucution_koujo_family.register(10, public_exucution_koujo_k10);
grotesque_koujo_family.register(10, grotesque_koujo_k10);

module.exports = {
  kojo_message_com_10,
  dog_kojo_10,
  colosseum_kojo_10,
};
