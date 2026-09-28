/**
 * @file 黑方片口上 K9：EVENTTRAIN 存在标志 + 主体 + 兽奸/死斗场/NTR/处刑/
 *   博物馆/流放/肉便器/迎击奖惩等非调教入口（issue #240）。
 *
 * == DOG_KOJO_9 全篇为未填写的模板骨架 ==
 *
 * 兽奸专用口上的全部台词行都没有正文：K9（黑方片）的兽奸口上本身就是
 * 没有填写内容的模板，其余角色的同一函数均有实际台词，可确认这是该
 * 角色专属的留空而非漏译。全部落为 `await era.printAndWait('')`
 * （空行输出），不代填台词。
 *
 * == 穿环 CFLAG:348 的跨模块共享标量 P ==
 *
 * `IF CFLAG:7 & P` 与 `IF P == n` 在旧脚本里读的是一个没有本地赋值的全局
 * 标量 P——真正的赋值发生在 COM111（着脱指令）处理穿环切换时，本文件只
 * 读值。ere 侧用共享模块 `piercing-state.js` 的单例承接（先例见
 * kojo-k1-confident.js 的 `const P = piercing_state.p;`）。
 *
 * == CSTR:2 / SAVESTR:A 插值 ==
 *
 * self_kojo_k9 的孩子生父段 `%CSTR:2%` 是角色域
 * 二维表（cstr:cid:2，孩子生父的自定义称呼），K3 先例见
 * kojo-k3-noble.js。gohoubi_request_koujo_k9 的 `%SAVESTR:A%`
 * 里的 A 即该函数的角色形参（此处恒等于
 * TARGET），落 `chara_callname(a)`。
 *
 * == 假名残留 ==
 *
 * `ﾌﾞﾂﾌﾞﾂﾌﾞﾂ`（半角片假名拟声词，忽视/嘟囔之意）归一后仍未转换，语料内
 * 孤例，不满足进归一表的复现门槛，人工译作
 * 「嘟囔嘟囔嘟囔」。
 *
 * == 未知语句 ==
 *
 * 小写 `printformw`（全文件唯一一处小写变体）未被转换脚本的关键词匹配命中，
 * 原样落成注释；人工按同段其余 W 后缀语句补译为 `printAndWait`。
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
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { piercing_state } = require('#/system/train/piercing-state');
const {
  peek_aftertrain_s,
  peek_sale_price,
} = require('#/event/event-aftertrain');

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_9 = 1; // FLAG:109 = 1（K9 口上存在标志）
    if (game.kojo.口上开关 == 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// EVENTEND #LATER 档：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_9 = 0;
  },
  TIER.LATER,
);

// EVENTTRAIN NORMAL 档：调教开始时的口上。
// 头部检查：FLAG:7 <= 0 跳过、TALENT:169 != 1 跳过；此后按
// CFLAG:201 状态机推进：初调教（0）→ 魔族化仅一次（<5 且未魔族化）→
// 崩坏（TALENT:9）→ 崩坏后二回目以降 → 无助手时二回目以降 → 简易助手分支
// （TALENT:MASTER:122==0 或无名助手 → k9_kojo2）。
on('EVENTTRAIN', async () => {
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${era_flag.target}:169`) != 1) {
    return 0;
  }

  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi = era_flag.assi; // NO:ASSI（ere 角色 ID 直接对应）
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
  const kojo = chara(target).kojo;

  if (kojo.初调教 == 0) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) == 9) {
      await era.printAndWait(`${target_name}在调教之前，被进行了魔族化改造。`);
      await era.printAndWait(
        `进入调教房间${target_name}露出了阴沉的表情等待着${player_name}。`,
      );
      await era.printAndWait(`完全适应了青色的皮肤和魔族的眼睛。`);
      await era.printAndWait(`「开玩笑吧…我绝对不允许你做这种事情！」`);
      await era.printAndWait(
        `身为魔族的她、慢慢的开始觉得必须服从魔王的命令………`,
      );

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      kojo.魔族化 = 1;
    } else {
      await era.printAndWait(`「哦，你就是传说中的魔王」`);
      await era.printAndWait(`${target_name}用欣赏艺术品的眼光看着你。`);
      await era.printAndWait(
        `「记不清究竟调教了多少个勇者了…这回我想换个不同的方法」`,
      );
      await era.printAndWait(
        `${target_name}尽管是这种情况，还是保持着了从容的神态。`,
      );
      await era.printAndWait(`「我的同伴她们一定会来救我………而且」`);
      await era.printAndWait(`「而且、我绝对不会在你的调教下屈服的！」`);
    }
    // CFLAG:201  = 1（变量语义：CFLAG 族，201）
    kojo.初调教 = 1;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 == 0 &&
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「即、即使是做这样的事情…我、我也绝对不会认输的…！」`,
    );
    await era.printAndWait(
      `${target_name}身体被反复的改造，魔族的特征越来越明显。再也变不回人类的样子了。`,
    );
    await era.printAndWait(
      `「开什么玩笑…这种程度的折磨就想让我屈服…简直是笑话…！」`,
    );
    await era.printAndWait(`但是身为魔族的她、凭着本能必须遵从魔王的指示………`);

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `让她看见水晶球里的画面后${target_name}全身瑟瑟发抖、终于跪在了你的面前。`,
      );
      await era.printAndWait(
        `「啊…啊…不是的…原谅我…原谅我…我没有背叛狂王…啊…我…我是个软弱的女人………」`,
      );
      await era.printAndWait(`${target_name}终于开始流下大滴的眼泪。`);
      await era.printAndWait(`「拜托…不要丢下我…请不要丢下我………」`);
      await era.printAndWait(
        `靠上来紧紧的抱住了腿${target_name}看着可怜的样子${player_name}心胸宽阔的原谅了。`,
      );
      await era.printAndWait(
        `今后谁是她真正的主人这具身体已经刻上了太多的烙印………`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `看见了水晶球里的景象后${target_name}愤怒的脸色通红。`,
      );
      await era.printAndWait(
        `「是、我是做了又怎么样！无论我和狂王做什么，都和你没有一点关系吧！？」`,
      );
      await era.printAndWait(
        `「………什么？难道你嫉妒了？…………也是、狂王的花样比你多好几倍呢，做起来也更舒服♪」`,
      );
      await era.printAndWait(
        `然后${target_name}哼哼哼，笑的声音小了下来。又稍微考虑了一下，如果加上温柔的话、还是和你做起来最舒服了。`,
      );
      await era.printAndWait(`这个女人已经完全调教好了、屈服在你的胯下………`);

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (
    kojo.初调教 < 2 &&
    era.get(`talent:${target}:9`) == 0 &&
    era.get(`mark:${target}:2`) == 1
  ) {
    era.drawLine();
    await era.printAndWait(
      `「哼、这种调教没什么大不了的、我完全就没有什么感觉！」`,
    );
    await era.printAndWait(
      `${target_name}感觉身上空荡荡的、即使一动不动双手护着胸前也挡不住你的视线。`,
    );
    await era.printAndWait(`「看什么看，赶快继续吧………」`);
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (
    kojo.初调教 < 3 &&
    era.get(`talent:${target}:9`) == 0 &&
    era.get(`mark:${target}:2`) == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「想让我做那样的事情…绝对不会答应的」`);
    await era.printAndWait(
      `${target_name}看到你来了一口吐沫吐到了地上。你皱起了眉头${target_name}你再瞪眼也没有用。`,
    );
    await era.printAndWait(`「你这么做…绝对会后悔的…！」`);
    await era.printAndWait(
      `${target_name}虚张声势的表现出气愤的样子、把吐沫吐到你的面前，${target_name}考虑如何把吐沫舔回去………`,
    );
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    era.get(`talent:${target}:9`) == 0 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「向你打招呼…这样就行了吧？」`);
    await era.printAndWait(
      `${target_name}像讨饶似的双膝跪下、眼睛里已经没有多少反抗情绪了。`,
    );
    await era.printAndWait(
      `「我受不了了，到此为止了…自从跟了狂王以来…从来没给我过什么称赞…」`,
    );
    await era.printAndWait(
      `你跪了下来${target_name}双手捧着脸颊、${target_name}懊恼地移开了视线。`,
    );
    await era.printAndWait(
      `「还有…是因为狂王对我不好…并不是因为你我就屈服了…」`,
    );
    await era.printAndWait(`然后${target_name}从眼角里落下了一颗眼泪………`);
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:9`) == 0 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:314`) != 9
  ) {
    era.drawLine();
    await era.printAndWait(`「又…又来了…哼、就那么想要我的身体吗？」`);
    await era.printAndWait(
      `和这种强硬的语言相反，${target_name}脸上已经露出了发情的神色。`,
    );
    await era.printAndWait(
      `「唉…呀、我绝对不是因为魔王大人的小鸡鸡太舒服了才一开始就等在这里的…真的！」`,
    );
    await era.printAndWait(
      `在反复的调教下${target_name}完全沦陷了。被开发的肌肉型身体是男人们的最爱、身上总是飘着男人精液的淫臭味道。`,
    );
    await era.printAndWait(
      `${target_name}曾经凛冽的目光现在满是情欲、舌头一边舔着嘴角等待着你的命令。`,
    );

    if (era.get(`talent:${target}:0`) == 1) {
      await era.printAndWait(
        `「喂、我还是处女呢？ 魔王大人不早点把我的处女夺走…就交给其他人或怪物了！」`,
      );
      await era.printAndWait(
        `${target_name}为了破掉至今还是处女的身体、一边流着口水抱着你一边摩擦着双腿。`,
      );
      await era.printAndWait(
        `「我发誓我的第一次要留给你、绝对不会用自己的手或者其他的男人，用我的处女膜发誓${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}伴随着火辣的誓言、你不禁苦笑了………`);
    } else {
      await era.printAndWait(
        `「喂！魔王大人…我的身体很好，如果想用的话，无论什么时候都可以${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}像妓女一样抱着你，手在胯下摸索着。你回手搂着她的腰${target_name}身体不停的蹭着你的后背。`,
      );
      await era.printAndWait(
        `「啊…是、是的…请魔王大人随意使用${heart(1)}…我这淫乱的身体…不论是淫穴还是肛门请尽情的贯穿吧${heart(1)}」`,
      );
      await era.printAndWait(
        `已经堕落的无法想象了，那副淫荡的身体再也看不出半点身为狂王亲卫队骑士的影子了………`,
      ); // （转换时未识别小写 printformw 关键词，人工补译）
    }
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:9`) == 0 &&
    kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 1
  ) {
    era.drawLine();

    if (kojo.魔族化 == 1) {
      await era.printAndWait(
        `「啊.啊、魔王大人已经等不及了吗…我也等不及了…身体好痛，受不了了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}魔族的眼睛已经湿润、脸上散发着欲望的光彩。经过多次魔族化改造和调教、身心已经完全陷落了。`,
      );
      await era.printAndWait(
        `「怎么样？我这好色的身体。你喜欢的话…上多少次都可以哦${heart(1)}」`,
      );
      await era.printAndWait(`那样的${target_name}只是单纯的追求肉欲。`);
      await era.printAndWait(
        `「啊…啊…我…魔王大人我忍不住了…我想要…我想要…我想的要命${heart(1)} 抱紧我绝对不要松手！」`,
      );

      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `${target_name}肌肉型的身体在可求着什么、为了追求你的爱抚而散发着淫臭的味道。`,
        );
        await era.printAndWait(
          `「喂、我还是处女呢？ 魔王大人不早点把我的处女夺走…被其他人或怪物抢走了怎么办！」`,
        );
        await era.printAndWait(
          `${target_name}为了破掉至今还是处女的身体、一边流着口水抱着你一边摩擦着双腿。`,
        );
        await era.printAndWait(
          `「我发誓我的第一次要留给你、绝对不会用自己的手或者其他的男人，用我的处女膜发誓${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}听着胡言乱语的誓言、你不禁苦笑了………`,
        );
      } else {
        await era.printAndWait(
          `${target_name}肌肉型的身体放荡而滚烫、为了追求你的爱抚而散发着淫臭的味道。`,
        );
        await era.printAndWait(
          `「啊…魔王大人…我的淫穴…我的肛门…好想被充实…里面已经变得黏黏糊糊的了…变得好奇怪了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在背后紧紧抱着你，手在胯下摸索着。你回手搂着她的腰${target_name}身体不停的蹭着你的后背。`,
        );
        await era.printAndWait(
          `「啊…啊、请…请魔王大人尽情使用${heart(1)}…我这淫乱的魔族身体…不论是淫穴还是肛门都可以${heart(1)}」`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else if (kojo.魔族化 == 2) {
      await era.printAndWait(
        `「啊.啊、魔王大人已经等不及了吗…我也等不及了…身体好痛，受不了了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}魔族的眼睛已经湿润、脸上散发着欲望的光彩。经过多次魔族化改造和调教、身心已经完全陷落了。`,
      );
      await era.printAndWait(
        `「怎么样？我这好色的身体。你喜欢的话…上多少次都可以哦${heart(1)}」`,
      );
      await era.printAndWait(`那样的${target_name}只是单纯的追求肉欲。`);
      await era.printAndWait(
        `「啊…啊…我…魔王大人我忍不住了…我想要…我想要…我想的要命${heart(1)}」`,
      );

      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `${target_name}肌肉型的身体放荡而滚烫、为了追求你的爱抚而散发着淫臭的味道。`,
        );
        await era.printAndWait(
          `「喂、我还是处女呢？ 魔王大人不早点把我的处女夺走…被其他人或怪物抢走了怎么办！」`,
        );
        await era.printAndWait(
          `${target_name}为了破掉至今还是处女的身体、一边流着口水抱着你一边摩擦着双腿。`,
        );
        await era.printAndWait(
          `「我发誓我的第一次要留给你、绝对不会用自己的手或者其他的男人，用我的处女膜发誓${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}听着胡言乱语的誓言、你不禁苦笑了………`,
        );
      } else {
        await era.printAndWait(
          `${target_name}肌肉型的身体放荡而滚烫、为了追求你的爱抚而散发着淫臭的味道。`,
        );
        await era.printAndWait(
          `「啊…魔王大人…我的淫穴…我的肛门…好想被充实…里面已经变得黏黏糊糊的了…变得好奇怪了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在背后紧紧抱着你，手在胯下摸索着。你回手搂着她的腰${target_name}身体不停的蹭着你的后背。`,
        );
        await era.printAndWait(
          `「啊…啊、请…请魔王大人尽情使用${heart(1)}…我这淫乱的魔族身体…不论是淫穴还是肛门都可以${heart(1)}」`,
        );
      }
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `${target_name}被改造为魔族的身体看到你就不停的摇动。`,
      );
      await era.printAndWait(
        `「呵呵呵…再也回不到人类的样子了。不过、每天都被玩弄淫穴和肛门…我感到好幸福${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}一脸陶醉的表情向你伸出双手。`);
      await era.printAndWait(`「来吧…来抱紧我…我的魔王大人${heart(1)}」`);
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    era.get(`talent:${target}:9`) == 0 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:314`) != 9 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「请…请原谅我吧…」`);
    await era.printAndWait(
      `多次调教的结果终于显现了、${target_name}终于到达了极限、慢慢的爬过来，身体靠在你的脚边。`,
    );
    await era.printAndWait(
      `「请不要笑话我…不管是做了什么、或者说了什么…请温柔的对我…魔王大人…」`,
    );
    await era.printAndWait(
      `显然${target_name}已经完全沦陷了、眼睛里的反抗情绪已经完全消失了。`,
    );
    await era.printAndWait(`${target_name}看着你，静静的等待你的指令。`);
    if (era.get(`talent:${target}:0`) == 1) {
      await era.printAndWait(
        `「我…我还是处女呢…啊…魔王大人的手…请让我做你的女人…${heart(1)}」`,
      );
      await era.printAndWait(
        `那个嚣张而叛逆的女人消失了${target_name}紧搂着魔王，满是爱慕。`,
      );
      await era.printAndWait(
        `虽然被马上夺走处女也是不错、但是慢慢的不能着急${target_name}充分的享受其中的滋味。`,
      );
      await era.printAndWait(
        `「拜、拜托您了…我…${target_name}请…请让我做魔王大人的女人！」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊…我是魔王大人的女人…无论如何…请给我您的爱…」`,
      );
      await era.printAndWait(
        `你笑着，默默的伸出了脚。${target_name}毫不犹豫的把脚抱在手上亲吻着。`,
      );
      await era.printAndWait(`「这样…可以吗…${heart(1)}」`);
      await era.printAndWait(
        `屈辱的亲吻着脚面，对于${target_name}像是誓约之吻一样。`,
      );
      await era.printAndWait(
        `满是陶醉的笑着${target_name}已经没有以前那样满身都是刺的感觉了………`,
      );
    }
    // CFLAG:201  = 7（变量语义：CFLAG 族，201）
    kojo.初调教 = 7;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:9`) == 0 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();

    if (kojo.魔族化 == 1) {
      await era.printAndWait(
        `「啊…不是这个样子的…我感觉好奇怪…你是…我到底在想些什么…？」`,
      );
      await era.printAndWait(
        `${target_name}黄色的魔族眼睛一边看着你一边流着眼泪。`,
      );
      await era.printAndWait(
        `多次反复的调教，终于到达了极限。${target_name}抱着你一副安心的样子，在耳边轻轻的细语。`,
      );
      await era.printAndWait(
        `「啊啊啊…是的…我是…我是你的东西…魔王大人…啊啊啊啊…魔王大人…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}终于安心的把身体交给了你………`);
      await era.print('');
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「我想要真正的成为魔王大人的物品…既然如此…请收下我的处女…！」`,
        );
        await era.printAndWait(
          `${target_name}以期待的眼神看着你，迫切的想要开始。`,
        );
        await era.printAndWait(
          `「唉？是这样吗？…这个样子的我…离开你就活不下去了…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}靠在你的胸前，尽情的闻着你的气味，露出一副安心的表情。`,
        );
        await era.printAndWait(
          `「啊啊…是魔王大人的味道…太好了…啊、好多…都是爱的味道？」`,
        );
        await era.printAndWait(
          `${target_name}看着你，第一次露出了开心的微笑………`,
        );
      }
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else if (kojo.魔族化 == 2) {
      await era.printAndWait(
        `「我已经到极限了…我…感觉好奇怪…你是…我到底在想些什么…？」`,
      );
      await era.printAndWait(
        `${target_name}黄色的魔族眼睛一边看着你一边流着眼泪。`,
      );
      await era.printAndWait(
        `多次反复的调教，终于到达了极限。${target_name}抱着你一副安心的样子，在你耳边轻轻的细语。`,
      );
      await era.printAndWait(
        `「啊啊啊…是的…我是…我是你的东西…魔王大人…啊啊啊啊…魔王大人…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}终于安心的把身体交给了你………`);
      await era.print('');
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「我想要真正的成为魔王大人的物品…既然如此…请收下我的处女…！」`,
        );
        await era.printAndWait(
          `${target_name}以期待的眼神看着你，迫切的想要开始。`,
        );
        await era.printAndWait(
          `「唉？是这样吗？…这个样子的我…离开你就活不下去了…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}靠在你的胸前，尽情的闻着你的气味，露出一副安心的表情。`,
        );
        await era.printAndWait(
          `「啊啊…是魔王大人的味道…太好了…啊、好多…都是爱的味道？」`,
        );
        await era.printAndWait(`${target_name}看着你，第一次露出了开心的微笑…`);
      }
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(
        `「要我在实验室里面做什么…我没想到还能变成魔族…」`,
      );
      await era.printAndWait(
        `${target_name}开心的摇着尾巴。很快就习惯了新的身体。`,
      );
      await era.printAndWait(
        `「好开心啊…这个样子的我…再也离不开魔王大人了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}变得更有魅力了，看到你以后就兴奋起来了………`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    }
  } else if (era.get(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(`${target_name}双眼毫无生气。`);
    await era.printAndWait(`调教过于残酷了、整个精神都崩溃了。`);
    await era.printAndWait(
      `${target_name}像玩坏的玩具一样,机械的重复着相同的话………`,
    );
    await era.printAndWait(`「哈哈…哈…肉棒…好多的肉棒…${heart(1)}」`);
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    kojo.初调教 = 9;
    return 1;
  } else if (era.get(`talent:${target}:9`) == 1) {
    // 崩坏してたら二回目以降へ飛ぶ
    return k9_kojo2(); // CALL k9_kojo2
  } else if (era_flag.assi < 0) {
    // 助手の有無をチェック（いない場合は二回目以降へ飛ぶ）
    return k9_kojo2(); // CALL k9_kojo2
  } else if (era.get(`talent:0:122`) == 0) {
    // （MASTER 恒角色 0）
    // 你が男じゃなかったら二回目以降
    return k9_kojo2(); // CALL k9_kojo2
  } else if (assi == 20) {
    era.drawLine();

    if (kojo.简易助手_0 == 0) {
      if (era.get(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `「啊啊…实在对不起${assi_name}队长…我已经是魔王大人的物品了………」`,
        );
        await era.printAndWait(`『啊、你现在的样子好可怜啊………！』`);
        await era.printAndWait(
          `${assi_name}完全被驯服了，温顺的趴在${player_name}脚下${target_name}吃惊的看着。`,
        );
        await era.printAndWait(
          `${assi_name}在${target_name}的映像中是个勇猛果敢的男人婆战士，从来没有见过这幅摸样。`,
        );
        await era.printAndWait(
          `「我的身心全都是魔王大人的…再也回不到原来狂王那里了…啊啊…啊啊啊啊………」`,
        );
        await era.printAndWait(
          `『………你很快就会明白、做魔王大人的物品可是很舒服的啊${heart(1)}』`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 2;
      } else if (era.get(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `「唉唉…${assi_name}这不是队长吗，一副露着淫穴的样子…呵呵、过来时听到的声音果然是队长发出来的」`,
        );
        await era.printAndWait(
          `${target_name}充满了淫欲的目光凝视着${assi_name}曾经是尊敬的队长现在是这幅摸样${target_name}充满情欲的目光里只有对方。`,
        );
        await era.printAndWait(
          `「喂队长…让我们的阴壶一起被侵犯、一起前往天国吧？好么…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}呼吸逐渐粗重起来，躺在床上双脚自然分开了${assi_name}发出了邀请。`,
        );
        await era.printAndWait(
          `『啊啊、你也来一起接受魔王大人的宠爱吧…感觉棒极了${heart(1)}』`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 2;
      } else {
        await era.printAndWait(
          `「这样啊！${assi_name}队长！你也成了魔王的俘虏吗…！」`,
        );
        await era.printAndWait(
          `${target_name}尊敬的${assi_name}变得面目全非，不禁落下了眼泪。`,
        );
        await era.printAndWait(
          `「啊啊、这样的事情…我绝对会帮助你的！啊！别这样！不能违抗魔王大人的话！」`,
        );
        await era.printAndWait(
          `${player_name}将${assi_name}靠过来的身体抱住一边抚摸一边开始了深吻。`,
        );
        await era.printAndWait(
          `『嗯~…嗯噗…嗯哼唔~…啾~啾噗~呸咯~…好棒啊啊被那个孩子看着的情况下做吧~${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}在眼前进行${assi_name}用痴态的眼神紧盯着${player_name}………`,
        );
        // CFLAG:202  = 1（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 1;
      }
      return 1;
    } else if (
      // `CFLAG:202 == 1 && FLAG:7 == 2 && TALENT:85 == 1 || TALENT:76 == 1`
      // 同层混写：旧引擎的 && 与 || 同优先级、左结合，读作
      // `(三项 && ) || 淫乱`——`||` 之后没有 `&&`，两种读法同值（#517）。
      // 本文件另两处同形（202/203/204 三阶）。
      (kojo.简易助手_0 == 1 &&
        game.kojo.口上开关 == 2 &&
        era.get(`talent:${target}:85`) == 1) ||
      era.get(`talent:${target}:76`) == 1
    ) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `${assi_name}紧紧的抱着${player_name}的身体，忘情的开始了深吻。`,
        );
        await era.printAndWait(
          `「啊啊啊，不要停！队长不用在意我和魔王大人接吻！」`,
        );
        await era.printAndWait(`『嗯哼哼…嫉妒了吧${target_name}${heart(1)}』`);
        await era.printAndWait(
          `${assi_name}用舌头舔了舔嘴唇，接着与${player_name}开始接吻。`,
        );
        await era.printAndWait(
          `然后${player_name}在${target_name}面前炫耀似的展现了${assi_name}的身体。`,
        );
        await era.printAndWait(`「哇…真是没想到，竟然会这样…好厉害啊！」`);
        await era.printAndWait(
          `${target_name}一边说着一边看，眼前这具痴态的身体已经开始扭动着发热了………`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 2;
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「今天的魔王大人…我想和队长一起抱着你好么？ 我的身体已经准备好了${heart(1)}」`,
        );
        await era.printAndWait(
          `『你也变成了淫乱的母狗啊${heart(1)} ${target_name}${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}和${assi_name}即使是被羞辱的嘲笑${player_name}诱惑一样的张开了双腿。`,
        );
        await era.printAndWait(
          `「是啊！我就是魔王大人的专用母狗${heart(1)} 我是特别想要被干小穴的变态来的${heart(1)}」`,
        );
        await era.printAndWait(
          `『嘛啊、这是怎样美妙的邀请方法啊、我也想一起像这样邀请魔王大人呢~${heart(1)}』`,
        );
        // CFLAG:202  = 2（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 2;
      }
      return 1;
    } else if (kojo.简易助手_0 == 1 && game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊、啊啊…我这是怎么了…队长…会被…不行啊…啊啊啊啊啊！」`,
        );
        await era.printAndWait(
          `『呵呵呵，客气什么？ 你瞧、我现在变得更加坦率了${heart(1)}』`,
        );
        await era.printAndWait(
          `${target_name}和${assi_name}从背后抱着，一边相互爱抚，脸色变得通红………`,
        );
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「是的…我也队长一样好开心…所以、我们和魔王大人一起来做吧♪」`,
        );
        await era.printAndWait(
          `『已经，完全没有办法了、你也变成了淫乱的母狗………唉唉、魔王大人，现在有两条母狗等着您宠信呢♪』`,
        );
        await era.printAndWait(
          `${assi_name}已经彻底的堕落了${target_name}在一旁苦笑着走了过来………`,
        );
      }
      return 1;
    } else {
      await era.printAndWait(
        `「队长…${assi_name}队长原来也是这样的人啊…原先的我都没想到」`,
      );
      await era.printAndWait(
        `『呵呵呵、${target_name}…你也变成魔王大人的东西吧、呐？』`,
      );
      await era.printAndWait(
        `${target_name}从背后抱着${assi_name}流下了悔恨的眼泪………`,
      );
      return 1;
    }
  } else if (assi == 21) {
    era.drawLine();

    if (kojo.简易助手_1 == 0) {
      if (era.get(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `「呵呵…${assi_name}…你再怎么鄙视我也没有关系…如今的我可是深受魔王大人的宠爱${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被同伴的背叛而露出了痛苦的表情、${assi_name}缺嬉笑着进行表白。`,
        );
        await era.printAndWait(
          `「现在的我已经无法回到狂王的身边了、我的身心已经都献给魔王大人了♪」`,
        );
        await era.printAndWait(
          `${assi_name}紧紧的搂着${player_name}的胳膊，心跳逐渐加速。`,
        );
        await era.printAndWait(
          `『我才是…我才是最喜欢魔王大人的………可是…其他的女人………嘟囔嘟囔嘟囔』`,
        ); // （ﾌﾞﾂﾌﾞﾂﾌﾞﾂ 半角假名残留，人工译为嘟囔拟声词，语料内孤例不进归一表）
        await era.printAndWait(
          `${player_name}情不自禁的看着${assi_name}的脸、${assi_name}顺着视线深情的望向${player_name}………`,
        );
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        kojo.简易助手_1 = 2;
      } else if (era.get(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `「哎呀…是你啊…${assi_name}好久不见啊…感觉久远的像是好几年都没见过了一样………」`,
        );
        await era.printAndWait(
          `${target_name}昔日的同伴${assi_name}见面发出了这样的感慨。`,
        );
        await era.printAndWait(
          `「呵呵、现在的我…可是魔王大人最得力的调教助手了${heart(1)} 我已经再回不到地上了………」`,
        );
        await era.printAndWait(
          `『真是奇遇啊、现在的我不想离开魔王大人${heart(1)} 他可是个很棒的男人♪』`,
        );
        await era.printAndWait(
          `「哎呀…你也这么认为吗？那么…让我们一起来称赞魔王大人吧${heart(1)}」`,
        );
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        kojo.简易助手_1 = 2;
      } else {
        await era.printAndWait(
          `「真不敢相信你也会失败被捕、这种地面没法逃走吗…抱歉！啊、什么…难度…不要这样！」`,
        );
        await era.printAndWait(
          `${target_name}成为了${player_name}的仆从${assi_name}追求身体的快乐。`,
        );
        await era.printAndWait(
          `「啊啊啊啊！…你、你怎么会变成魔王的仆从！不、这不可能！」`,
        );
        await era.printAndWait(
          `『用不着那么介意、很快你也会变得和我一样快乐…♪』`,
        );
        // CFLAG:203  = 1（变量语义：CFLAG 族，203）
        kojo.简易助手_1 = 1;
      }
      return 1;
    } else if (
      (kojo.简易助手_1 == 1 &&
        game.kojo.口上开关 == 2 &&
        era.get(`talent:${target}:85`) == 1) ||
      era.get(`talent:${target}:76`) == 1
    ) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呵呵、我也成为了魔王大人的仆从，明白了你快乐的心情${heart(1)}」`,
        );
        await era.printAndWait(`『原来如此？…但是我不会把魔王大人让给你的！』`);
        await era.printAndWait(
          `${assi_name}打算独占似的抱着${player_name}的胳膊。${target_name}不由得抗议起来。`,
        );
        await era.printAndWait(
          `「你真是太狡猾了！我们让魔王大人来决定选择谁！」`,
        );
        await era.printAndWait(
          `『嗯、那也行…喂、魔王大人、我和${target_name}、你喜欢哪一个？』`,
        );
        await era.printAndWait(
          `${target_name}死死地抓着${player_name}的另一只胳膊。`,
        );
        await era.printAndWait(`「是啊，你喜欢哪一个！？」`);
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        kojo.简易助手_1 = 2;
      } else if (era.get(`talent:${target}:76`) == 1) {
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目
        await era.printAndWait(
          `「${time_word}很期待3人一起来、喂…这个主意不错吧？」`,
        );
        await era.printAndWait(
          `『是啊、魔王大人最喜欢你这种淫乱的母狗了，我也喜欢♪』`,
        );
        await era.printAndWait(
          `「哎呀，真的？我好开心啊…啊啊啊、我的肉壶已经有感觉了${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}一脸陶醉的用手揉弄着下体。`);
        await era.printAndWait(
          `『彻底变成母狗了、呵呵、我们2人一起接受魔王大人的宠爱吧${heart(1)}』`,
        );
        await era.printAndWait(`「我才是最好的母狗呢${heart(1)}」`);
        // CFLAG:203  = 2（变量语义：CFLAG 族，203）
        kojo.简易助手_1 = 2;
      }
      return 1;
    } else if (kojo.简易助手_1 == 2 && game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「喂、我和${assi_name}你到底喜欢哪一个！绝对是我的技术比较好！」`,
        );
        await era.printAndWait(
          `『你再说什么啊、我才是魔王大人最喜欢的那一个』`,
        );
        await era.printAndWait(
          `${target_name}和${assi_name}仿佛抢夺一样死死的抱着${player_name}左右两个胳膊。`,
        );
        await era.printAndWait(`『是我比较好，对吗？』`);
        await era.printAndWait(`「看啊…快回答我啊！」`);
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「喂、这次试试一起在魔王大人面前摇屁股吧…哦吼吼吼♪」`,
        );
        await era.printAndWait(
          `『啊那样也不错啊、果然还是有母乳的乳房比较大』`,
        );
        await era.printAndWait(
          `${target_name}和${assi_name}一起在${player_name}面前商量如何诱惑………`,
        );
      }
      return 1;
    } else {
      await era.printAndWait(
        `「我鄙视你…真的…不要碰我…到底发生了什么…啊啊啊！」`,
      );
      await era.printAndWait(
        `『我不在乎你讨不讨厌我、比起那个来，你很快就会变得坦率的♪』`,
      );
      await era.printAndWait(
        `${target_name}被原本可以信赖的同伴${assi_name}浑身上下爱抚着、只能发出声音来抗议………`,
      );
      return 1;
    }
  } else if (assi == 23) {
    if (era.get(`talent:${assi}:121`) == 0) {
      return 0;
    }
    era.drawLine();

    if (kojo.简易助手_2 == 0) {
      if (era.get(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `「啊、啊…被你看到了，我现在已经是魔王大人的东西了………」`,
        );
        await era.printAndWait(
          `${target_name}一边害羞的笑着一边向${assi_name}告白。`,
        );
        await era.printAndWait(
          `虽然${assi_name}的肩膀缩成了一团，但是从腰间覆盖的白布可以看到、身为扶她的阳具已经完全的勃起了。`,
        );
        await era.printAndWait(
          `「唉、唉唉？你竟然是扶她？今天是你来调教我吗？唉？魔王大人！这到底是怎么回事！」`,
        );
        await era.printAndWait(
          `『魔王大人不要这样、我不要做这样乱七八糟的事情！不要啊！』`,
        );
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        kojo.简易助手_2 = 2;
      } else if (era.get(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
        await era.printAndWait(
          `「哎呀…你这个样子…呵呵呵、是吗…你也变成魔王大人的手下了…♪」`,
        );
        await era.printAndWait(
          `${player_name}马上就察觉到了${assi_name}对${target_name}亲密的态度了。`,
        );
        await era.printAndWait(
          `然后${assi_name}取下了腰间覆盖的白布、露出了扶她完全勃起的肉棒。`,
        );
        await era.printAndWait(
          `「嘛！这个身体多么的美妙啊！啊、好吧、我可以在魔王大人面前惩罚你♪」`,
        );
        await era.printAndWait(`『不可思议…你能打开大腿自己强暴自己吗………』`);
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        kojo.简易助手_2 = 2;
      } else {
        await era.printAndWait(
          `「难道说…你已经背叛我们了！真是个一点用都没有的魔法师！」`,
        );
        await era.printAndWait(
          `${target_name}为${assi_name}成为魔王的手下感到了强烈的厌恶。`,
        );
        await era.printAndWait(
          `「什、什么嘛、就你还想代替魔王调教我？难道！别开玩笑了！………没用的魔法师！」`,
        );
        await era.printAndWait(
          `${assi_name}取下了腰间覆盖的白布、完全勃起的肉棒一下子露了出来。`,
        );
        await era.printAndWait(
          `「扶、扶她…？你居然是…不、不要啊…快走开…啊啊啊！」`,
        );
        await era.printAndWait(
          `『O(∩_∩)O哈哈哈~！我以前就一直想看看你害怕是什么样子！嗯！不错！接下来要好好的强奸你！』`,
        );
        // CFLAG:204  = 1（变量语义：CFLAG 族，204）
        kojo.简易助手_2 = 1;
      }
      return 1;
    } else if (
      (kojo.简易助手_2 == 1 &&
        game.kojo.口上开关 == 2 &&
        era.get(`talent:${target}:85`) == 1) ||
      era.get(`talent:${target}:76`) == 1
    ) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊、不行啊…我现在已经是魔王大人的东西了，你不能这样的抱着我…呜！」`,
        );
        await era.printAndWait(
          `${target_name}被${assi_name}押倒在地上、发出沉闷的声音。`,
        );
        await era.printAndWait(
          `『那样的话我就更想强奸你了、魔王大人、我可以这样做吗？』`,
        );
        await era.printAndWait(
          `${player_name}点点头${target_name}发出了悲鸣。`,
        );
        await era.printAndWait(`「不要…不要这样…求你了，帮帮我…啊啊啊啊！」`);
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        kojo.简易助手_2 = 2;
      } else if (era.get(`talent:${target}:76`) == 1) {
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目
        await era.printAndWait(
          `「${time_word}很期待3人一起来、喂…这个主意不错吧？」`,
        );
        await era.printAndWait(
          `堕落而淫乱的${target_name}就像和以前换了一个人似得，迎到了${assi_name}面前。`,
        );
        await era.printAndWait(`吐着舌头、四肢着地的爬了过来。`);
        await era.printAndWait(
          `『你现在也变得相当坦率了、比起你原先来回挥舞大剑的样子，这幅风之母狗的样子更适合你♪』`,
        );
        await era.printAndWait(
          `${assi_name}看着面目全非的同伴，毫不留情的嘲笑道。`,
        );
        await era.printAndWait(
          `但是、${target_name}毫不在意的笑着${assi_name}回答到。`,
        );
        await era.printAndWait(
          `「是啊、我发现作为魔王大人的母狗比什么都幸福${heart(1)}」`,
        );
        // CFLAG:204  = 2（变量语义：CFLAG 族，204）
        kojo.简易助手_2 = 2;
      }
      return 1;
    } else if (kojo.简易助手_2 == 2 && game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「不、不行…好不容易才和魔王大人相处的时间…绝对、不能…被你抢去！」`,
        );
        await era.printAndWait(
          `『不用介意这种事情啦、其实我的肉棒滋味很不错的，要不要尝尝？』`,
        );
        await era.printAndWait(
          `${target_name}被${assi_name}押倒在地、无情的说道………`,
        );
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊…你的肉棒插到里面最舒服了…都是你的责任${assi_name}${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出了兴奋的表情，将${assi_name}肉棒放在脸上来回滑动。`,
        );
        await era.printAndWait(
          `『啊哈…好喜欢被你强奸的感觉，我都爬不起来了………』`,
        );
      }
      return 1;
    } else {
      await era.printAndWait(
        `「我终于知道你为什么整天都藏在家里、啊啊啊…你、不要再押着我了！」`,
      );
      await era.printAndWait(
        `『不用那么介意♪ 你会很喜欢这个东西的${heart(1)}』`,
      );
      await era.printAndWait(
        `${target_name}的嘴里被强行塞入了${assi_name}的肉棒，不禁发出了悲鸣………`,
      );
      return 1;
    }
  } else {
    // 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ
    return k9_kojo2(); // CALL k9_kojo2
  }
});

/**
 * k9_kojo2：调教开始口上的二回目以降。崩坏 / 反抗刻印Lv3 /
 * それ以外(MARK:2) / 淫乱(自选服装分支) 各出一次固定台词，随机三选一保底处理。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 1（RETURN 1）或 undefined（无 RETURN 的支）
 */
async function k9_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%

  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(
      `${target_name}整个人都崩坏了，嘀嘀咕咕的不知道在说什么。`,
    );
    await era.printAndWait(`「嗯…我、你的肉棒…肉棒…我是只母狗！」`);
    return 1;
  } else if (
    era.get(`mark:${target}:3`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(
      `${target_name}看到你走过来、狠狠的吐了口吐沫，把头扭到了一边。`,
    );
    await era.printAndWait(`「无论什么样的事情，我绝对不会输给你的」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 0 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「对我做什么都是徒劳的…我是绝对不会服输的」`);
    await era.printAndWait(
      `${target_name}还是一副从容的态度、这种态度能持续多久呢，我非常期待………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 1 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「哎呀、你还打算调教我？还不吸取教训啊」`);
    await era.printAndWait(
      `${target_name}强硬的眯着眼睛笑了笑。你只是默默的走了过来，靠近时身体猛地一震………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「不、不要…不要再来了…调教什么的我最讨厌了！」`);
    await era.printAndWait(
      `${target_name}回想起了被你做过的事情，双手抱着自己的身子，不停地摇头。`,
    );
    await era.printAndWait(`「啊啊…别碰我…不要、拜托您了！」`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「好吧…我明白了…喜欢调教我的话就来吧」`);
    await era.printAndWait(
      `${target_name}终于老实了，不过，那眼神中还残留着反抗的情绪。`,
    );
    await era.printAndWait(`「哼…我只是单纯的想要舒服一些而已…哎呀！」`);
    await era.printAndWait(
      `你捏着${target_name}的下巴强行和她对视、${target_name}一副快要哭出来的样子………`,
    );
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
            const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目
            await era.printAndWait(
              `「呵呵、我的主人。${time_word}就让${target_name}来服侍您吧」`,
            );
            await era.printAndWait(
              `${target_name}穿着法国女仆风格的服装对你打招呼。裙子下摆很短、鞠躬的时候内裤都看见了。`,
            );
            await era.printAndWait(
              `「那么${heart(1)} 马上开始侍奉主人${heart(1)}」`,
            );
            await era.printAndWait(
              `一边舔着嘴唇一边靠了过来，与其说是个柔弱的女仆，不如说是一个充满肉欲的母兽………`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 203
          ) {
            await era.printAndWait(
              `「很好…这是此刻的我最合适的衣服了…快点…快点抱紧我…已经…已经忍耐不住了…啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}身上穿着下流的妓女服。黑色的布料透出了乳头的颜色、衣服的设计成功的勾起了男人的欲望。`,
            );
            await era.printAndWait(
              `宽松的上衣稍稍一动就能看见乳房、如果想要掀开裙子立刻就能插入进去。`,
            );
            await era.printAndWait(
              `「啊啊…这个时候的我…魔王大人…我就是主人的专用妓女…${heart(1)}」`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 254
          ) {
            const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目
            await era.printAndWait(
              `「${time_word}在你面前穿着兔女郎的衣服${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}已经穿好了淫乱的兔女郎服装。衣服紧紧的包着肌肉型的身体，展现出了不可思议的魅力。`,
            );
            await era.printAndWait(
              `「我是一只小兔子、我的肉壶渴望着胡萝卜，好寂寞啊，寂寞死了${heart(1)}」`,
            );
            await era.printAndWait(
              `一边嘿嘿的笑着一边舔着嘴唇，嘴角散发着淫靡的光彩、${target_name}已经发情了。`,
            );
            await era.printAndWait(
              `「唔呼呼…我要坐在魔王大人的身上，和你一起跳啊跳啊${heart(1)}」`,
            );
            return 1;
          }
        }
      }
    }

    if (era.get(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊…等一下魔王大人${heart(1)} 来吧、请尽情的使用我的身体${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸陶醉的表情抱着你，一边轻轻的说着一边用尾巴在你的大腿上来回的扫着。`,
        );
        await era.printAndWait(
          `「淫穴也好肛门也好…喜欢哪个就尽情的侵犯我吧${heart(1)} 所以呢…情…快一些${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好像忍耐不住了的样子、嘴里喷着火热的气息，在你耳边轻轻的说着………`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}瞳孔中散发着情欲的颜色、热情的看着你。羽翼像是期待着什么似的不停地扇动着。`,
        );
        await era.printAndWait(
          `「啊啊…魔王大人不用考虑我，请尽情的使用我的身体…我已经忍耐不住自慰了好多次${heart(1)}」`,
        );
        await era.printAndWait(
          `正如这句话一样${target_name}身上散发着比平时更强烈的淫臭味道、擅自做这种事情的奴隶是要被惩罚的。`,
        );
        await era.printAndWait(
          `「抱歉…随便怎样，惩罚我吧${heart(1)} 胸部也好，淫穴也好，肛门也好，黏糊糊的想要…啊…啊…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「魔王大人露出了肉棒…请给我吧…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}在你面前跪下、慢慢的张开嘴。你有些吃惊的看着她把整根肉棒都吞了下去。`,
        );
        await era.printAndWait(
          `「唔…唔…${heart(1)}…听说…其他人…啊啊啊…也是这样给你吸的肉棒吗${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}已经完全是精液中毒的样子、连自己曾经是威风凛凛的亲卫军骑士这种事的经历都忘记了………`,
        );
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「啊啊…等一下魔王大人${heart(1)} 来吧、请尽情的使用我的身体${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸陶醉的表情抱着你，在你耳边轻轻的说着`,
        );
        await era.printAndWait(
          `「淫穴也好、肛门也好…好想被你狠狠的侵犯${heart(1)} 所以呢…情…快一些${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}好像忍耐不住了的样子、嘴里喷着火热的气息，在你耳边轻轻的说着………`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}瞳孔中散发着情欲的颜色、热情的看着你。。`,
        );
        await era.printAndWait(
          `「啊啊…魔王大人不用考虑我，请尽情的使用我的身体…我已经忍耐不住自慰了好多次${heart(1)}」`,
        );
        await era.printAndWait(
          `正如这句话一样${target_name}身上散发着比平时更强烈的淫臭味道、擅自做这种事情的奴隶是要被惩罚的。`,
        );
        await era.printAndWait(
          `「抱歉…随便怎样，惩罚我吧${heart(1)} 胸部也好，淫穴也好，肛门也好，黏糊糊的想要…啊…啊…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「魔王大人露出了肉棒…请给我吧…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}在你面前跪下、慢慢的张开嘴。你有些吃惊的看着她把整根肉棒都吞了下去。`,
        );
        await era.printAndWait(
          `「唔…唔…${heart(1)}…听说…其他人…啊啊啊…也是这样给你吸的肉棒吗${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}已经完全是精液中毒的样子、连自己曾经是威风凛凛的亲卫军骑士这种事的记忆都觉得无关紧要了………`,
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
              `「我来侍奉主人了～♪ 怎么样？这件衣服合适吗？」`,
            );
            await era.printAndWait(
              `${target_name}穿着女仆服旋身一转。女仆服华丽的裙摆飘了起来。`,
            );
            await era.printAndWait(`满是褶皱的围裙显得十分的可爱。`);
            await era.printAndWait(
              `「嘿嘿嘿、是玩惩罚女仆游戏好呢？还是主人亲自来玩弄我这个小女仆？」`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 203
          ) {
            await era.printAndWait(
              `「魔王大人，这个样子好羞耻啊。我只是走着…那个…我下面已经湿掉了！」`,
            );
            await era.printAndWait(
              `${target_name}穿着格外下流的妓女礼服。黑色的面料仅仅遮住了胸前一点地方、只要动作稍微激烈一点，乳房就整个露了出来。`,
            );
            await era.printAndWait(
              `短短的裙子只要向上一掀立刻就能插入进去。一想到这种事情${target_name}的脸已经变得通红。`,
            );
            await era.printAndWait(
              `「请、快点…抱着我…抱抱紧我…这个样子、我已经忍不住了！」`,
            );
            return 1;
          } else if (
            chara(target).train.着衣状态 & 28 &&
            chara(target).train.上衣类型 == 254
          ) {
            const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目
            await era.printAndWait(
              `「${time_word}今天我是你的小兔子。但是、这件衣服真的合适吗？」`,
            );
            await era.printAndWait(
              `${target_name}身上穿着羞耻的兔女郎衣服。的确，衣服和她肌肉型的身体并不相称，但是${player_name}回答道”很般配啊”。`,
            );
            await era.printAndWait(
              `「嘿嘿、虽然是恭维的话。不过…兔子寂寞的话会死掉的…所以要常常关心才好…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}一边呼出火热的吐息，一边抱住了${player_name}………`,
            );
            return 1;
          }
        }
      }
    }

    if (era.get(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「啊啊…魔王大人…最喜欢了${heart(1)}」`);
        await era.printAndWait(
          `${target_name}变得完全坦率了、对比之前的样子，现在的变化简直太惊人了。`,
        );
        await era.printAndWait(
          `${target_name}就这样的抱着你开始撒娇，态度就好像恋人一样。`,
        );
        await era.printAndWait(
          `有点不同的是她已经是魔族了、尾巴伸了出来缠到了你的身体上。`,
        );
        await era.printAndWait(
          `「哈…哈${heart(1)}…魔王大人…我…已经不能忍耐了…${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}向你问好、跪坐着准备站起来。身后的尾巴和身体不停的在摇摆。`,
        );
        await era.printAndWait(
          `「………啊、脚麻了…魔王大人来之前就一直端坐等的………」`,
        );
        await era.printAndWait(`你苦笑着上前抱住了${target_name}。`);
        await era.printAndWait(
          `「真是的！…啊，这，这样的也不错…不，没什么……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}把头埋在你的胸口、那一副好幸福的样子，就算不看也知道了………`,
        );
      } else {
        await era.printAndWait(`${target_name}就那样抱着你，幸福的叹了口气。`);
        await era.printAndWait(
          `「啊…在这个寒冷的地底下…更多更多的需要拥抱…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}黄色的魔族眼睛闪闪发光、一边露出陶醉的表情一边向你请求着。`,
        );
        await era.printAndWait(
          `「啊…就这样温暖我吧…想要魔王大人的火热…${heart(1)}」`,
        );
        await era.printAndWait(`完全坦率的她，充满了期待，脸上都是满足………`);
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「啊啊…魔王大人…最喜欢了～${heart(1)}」`);
        await era.printAndWait(
          `${target_name}变得完全坦率了、对比之前的样子，现在的变化简直太惊人了。`,
        );
        await era.printAndWait(
          `${target_name}就这样的抱着你开始撒娇，态度就好像恋人一样。`,
        );
        await era.printAndWait(
          `「哈…哈${heart(1)}…魔王大人…我…已经不能忍耐了…${heart(1)}」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`${target_name}向你问好、跪坐着准备站起来。`);
        await era.printAndWait(
          `「………啊、脚麻了…魔王大人来之前就一直端坐等的………」`,
        );
        await era.printAndWait(`你苦笑着上前抱住了${target_name}。`);
        await era.printAndWait(
          `「真是的！…啊，这，这样的也不错…不，没什么……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}把头埋在你的胸口、那一副好幸福的样子，就算不看也知道了…………`,
        );
      } else {
        await era.printAndWait(`${target_name}就那样抱着你，幸福的叹了口气。`);
        await era.printAndWait(
          `「啊…在这个寒冷的地底下…更多更多的需要拥抱…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边露出陶醉的表情一边向你请求着。`,
        );
        await era.printAndWait(
          `「啊…就这样温暖我吧…想要魔王大人的火热…${heart(1)}」`,
        );
        await era.printAndWait(`完全坦率的她，充满了期待，脸上都是满足………`);
      }
    }
    return 1;
  }
  return 0;
}

// EVENTEND NORMAL 档：调教结束时的口上。
// 头部检查：FLAG:7 <= 0 跳过、TALENT:169 != 1 跳过、
// 角色死亡（BASE:0 <= 0）跳过；此后按崩坏/反抗刻印Lv3/それ以外(MARK:3)
// /淫乱(76)/爱慕(85) 分档，各按体力(BASE:0)高低再分两支。
on('EVENTEND', async () => {
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  const target = era_flag.target;
  if (era.get(`talent:${target}:169`) != 1) {
    return 0;
  }
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「啊哦哦…大肉棒…大肉棒不见了………」`);
    await era.printAndWait(
      `${target_name}已经没有了理性，呆呆的目送着你离去………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:3`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「哼…下次再敢来就把你的睾丸撕碎………」`);
    await era.printAndWait(
      `${target_name}用毛巾擦拭着身上的污渍、嘴里放着狠话………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「这种程度的话…没什么大不了的呀…哼」`);
    await era.printAndWait(`${target_name}反抗的态度完全没有改变………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「哈…哈…这样的完全…没事哟…什么啊…用后赶紧出去吧………」`,
    );
    await era.printAndWait(
      `${target_name}的口气还还是很硬，但神色已经相当憔悴了。…………`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「啊啊…我…如果再这样的话…已经……啊啊…啊啊…」`);
    await era.printAndWait(`${target_name}还沉浸在调教的余韵里，满脸通红………`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「啊，真是的！还不够…更加使用我吧！」`);
    await era.printAndWait(
      `${target_name}还一副欲求不满的样子，淫乱的身体在这之后很难平息下来吧………`,
    );
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「啊啊～…好棒…真是太好了。…${heart(1)}」`);
    await era.printAndWait(
      `${target_name}满足的躺在床上，一副精疲力尽却很高兴的样子………`,
    );
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「啊…对我的身体…已经厌倦了吗…？」`);
    await era.printAndWait(
      `由于提前结束调教的缘故、${target_name}不安的看着你。`,
    );
    await era.printAndWait(
      `没有那样的事情，你轻轻的摸着${target_name}的头发，${target_name}放下心来………`,
    );
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「哈…哈…啊啊…非常…太好了…${heart(1)}」`);
    await era.printAndWait(`${target_name}疲倦的身子横躺在床上、幸福地笑了………`);
    return 1;
  }
  return 0;
});

/**
 * kojo_message_com_9：七道跳过判定 + SELECTCOM 状态机主体
 * （CFLAG:301-390，见文件头「状态机」小节）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_9(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;
  const player = era_flag.player; // TALENT:PLAYER 用

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
    // 兽奸PLAY中は専用口上
    await dog_kojo_9(rand_n);
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    // 死斗场中は専用口上
    await colosseum_kojo_9(rand_n);
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
          `「真的…哼，这样的话我只要忍耐就…啊…啊啊啊！那样的地方不要碰啊！」`,
        );
      } else {
        await era.printAndWait(`「你这个变态…下流的手在摸哪里啊…啊…啊啊啊！」`);
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
          `「哼…光是那样的话还不够哟……要进到肉壶里面才可以…对…这里…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的腰不停的晃动起来，追求更多的快感。`,
        );
        await era.printAndWait(`「这样…好…好东西…那里…还要${heart(1)}」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「还要…请您摸${heart(1)}…啊啊…是的…这…喜欢…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}喜欢被${player_name}爱抚的感觉。身体摆成更容易抚摸到的姿势。`,
        );
        await era.printAndWait(`「好高兴…啊啊…喜欢…喜欢的…你啊…${heart(1)}」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「摸吧、没关系…这样做…稍微感觉到有些舒服…啊，真是的…被你的手这样的抚摸…被你摸到高潮了…啊啊啊♪」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}的胳膊，沉浸在快感中，小声的喘息着………`,
        );
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不用…不用在意…啊啊啊！只要忍耐着就当没感觉到就行了…一定能行的！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}爱抚着，身体不断的扭动………`,
        );
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哼、对我做这种事情…是没有任何感觉的…前面全是白费力气…呀、又开始摸了！」`,
        );
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
          `「啊、不行…不要把嘴放到那种地方…你、有没有听我在说什么！」`,
        );
        await era.printAndWait(
          `${player_name}品尝着${target_name}下体处女的味道、${target_name}涨红着脸，拼命的摇着头………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊…没有，不…不明白…为什么把嘴放到那种地方…啊啊啊啊！」`,
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
          `「还要…更多${heart(1)} 继续舔我这淫乱的淫穴${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴唇被持续的吸舔，高声的叫喊着、双手紧抱着${player_name}的头向自己的双腿间压着。`,
        );
        await era.printAndWait(
          `「嗯！好！好的！就这样…吃我的淫穴吧…好舒服…脑袋一片空白了${heart(1)}」`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「那么热情的舔着…啊啊啊…是的…更…更多！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴唇被持续的吸舔，娇声的呼喊着、双腿大张着，让${player_name}的头能更加深入。`,
        );
        await era.printAndWait(
          `「啊啊啊…好喜欢…好喜欢啊…这种被舔的感觉简直太好了${heart(1)}」`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…这样…啊啊…竟然…舌头伸到里面去了…里面…感觉到了！」`,
        );
        await era.printAndWait(
          `${target_name}的阴唇被舔着，不禁皱起了眉头、忍不住的快感随着声音漏了出来…`,
        );
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呼，哼…居然像狗一样的那样舔…像傻瓜似的…啊…再这么做去当狗好了吧！」`,
        );
        await era.printAndWait(
          `${target_name}露出厌恶表情的同时情不自禁的抬起了腰，好让蜜穴更容易的被舔到、声音中露出了快感…`,
        );
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (kojo.肛门爱抚 == 0) {
      if (era.get(`abl:${target}:3`) >= 3) {
        await era.printAndWait(`「啊啊…什么…奥…进来了…啊啊…发生了什么♪」`);
        await era.printAndWait(
          `${target_name}没被开发过的肛门对${player_name}的爱抚非常敏感………`,
        );
      } else {
        await era.printAndWait(
          `「这样、这样的事情！很脏的…里面很脏！讨厌啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}发出了悲鸣。${player_name}的手指毫不留情的插入了没有准备的肛门………`,
        );
      }
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const P = era.get(`palam:${target}:3`) + era.get(`delta:${target}:3`);

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「进来了…好舒服…${heart(1)} 要、要更多…我的屁眼…好奇怪的感觉啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}娇声呼喊着、肛门不停的收缩、身体颤抖着。`,
        );
        await era.printAndWait(
          `「啊呀…啊呀呀呀${heart(1)} 只是屁眼…就有这种感觉，啊啊${heart(1)}」`,
        );
        // CFLAG:303  = 9（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊…那里…不能再进去了…啊啊啊…肛门都张开啊…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被爱抚的逐渐张开了，嘴里发出快乐的叹息。`,
        );
        await era.printAndWait(
          `「哈…哈…不是这样的…啊啊啊…想要${player_name}的肉棒，想要更粗的东西${heart(1)}」`,
        );
        // CFLAG:303  = 8（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哼…不行！不是那样的…还没有被弄湿…呵呵，着急了吗♡。${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}说润滑还不够的………`);
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「进来了…好舒服…${heart(1)} 也，也…不行了…这，就是这样…啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}娇声呼喊着、肛门不停的收缩、身体颤抖着。`,
        );
        await era.printAndWait(
          `「啊呀…啊呀呀呀${heart(1)} 只是屁眼…就有这种感觉，啊啊${heart(1)}」`,
        );
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊啊啊…请、请您检查我的屁股…啊、啊啊${heart(1)}啊哈，啊哈${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}因为屁股被爱抚，轻声娇喘着。`);
        await era.printAndWait(
          `「啊啊啊…请原谅我…被玩弄屁股也会这个样子…啊啊…好难为情啊…太奇怪了${heart(1)}」`,
        );
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「进来了…啊，不过，还是有点干…抱歉…啊，辛苦了…哼！」`,
        );
        await era.printAndWait(`${target_name}说润滑还不够的……`);
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哎！？…会、是什么样的感觉…说不清楚…舒服…稍微有一点！」`,
        );
        await era.printAndWait(
          `${target_name}被开发的肛门不断受到刺激，笨拙的蠕动着、产生出了一些快感………`,
        );
        await era.printAndWait(`「这，这个样子…是不行的许…因为…啊啊啊♪」`);
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「啊！不啊！这样的…不行！啊啊！」`);
        await era.printAndWait(
          `${target_name}发出悲鸣识图逃跑，但因为身体被紧紧压住，只能撅着屁股被来回的玩弄………`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (kojo.自慰 == 0) {
      await era.printAndWait(
        `「你这个变态…居然想要我表演手淫给你看…敢让我这么做一脚踢飞你…！」」`,
      );
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯…啊啊…啊…啊啊啊${heart(1)} 魔王大人啊…快来享用我的处女滋味吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用手指在秘唇上来回抚摸、因为快感身体不停的颤动。那副姿态淫乱的根本不像是处女。`,
        );
        await era.printAndWait(
          `「魔王大人，我的处女膜在等待被你侵犯打破呢${heart(1)} 想到被你侵犯的样子…身体就兴奋的停不下来！」`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊…手淫最好了！啊啊啊…好厉害…一旦开始自慰就完全无法停止了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}无视${player_name}的目光，不停的自慰着、完全不在意旁人的目光。`,
          );
          await era.printAndWait(
            `「啊啊啊…这…已经不需要男人了${heart(1)} …我…啊啊啊…唉,还可以…啊…什么都不想了！${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊…看…我手淫…已经高潮好几次了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}湿润的眼睛继续自慰，双手熟练的多次将自己引导至绝顶。`,
          );
          await era.printAndWait(
            `「嗯哼…啊…啊…啊啊啊啊！ 还不够…还要更多${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「魔王大人啊…如果看到我的自慰表演感到兴奋的话…请夸奖我${heart(1)} 快来夸奖我${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像饥渴的母狗般吐着舌头、炫耀一般的继续自慰着。`,
          );
          await era.printAndWait(
            `「啊…我手淫${heart(1)} …太舒服…啊啊啊啊…舒服的快要疯了${heart(1)}」」`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哼…啊…哼${heart(1)} …哈…啊啊啊…想看到更多一些吗…感觉兴奋的话…就这样袭击我吧e${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出喘息的声音、在${player_name}面前展现了似的继续自慰着。`,
          );
          await era.printAndWait(
            `「啊啊啊…啊…哈…哈…啊啊…我…再这样…要去了…就要去了…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}晃动着腰、在${player_name}面前发出引诱一样的水音，不停地自慰着。`,
          );
          await era.printAndWait(
            `「啊啊啊…嗯…嗯…这个，不行了…啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `「已经…这么的引诱你了…光看不行动…不允许啊！…${heart(1)}」`,
          );
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哼…呼…呼…怎么样？兴奋了吧……${heart(1)}」`);
        await era.printAndWait(
          `${target_name}在${player_name}面前兴奋的肌肉型的身体发出了快乐光泽，一边继续自慰。`,
        );
        await era.printAndWait(
          `「哈…哼${heart(1)} 这里…这个柔软的地方…还是处女…请收下……啊啊${heart(1)}」`,
        );
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊…手指停不下来…自慰太舒服…啊啊啊…啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}无视${player_name}的目光，就那样不停的自慰着。`,
          );
          await era.printAndWait(
            `「啊啊啊…！好舒服…这…这样就好了${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人…明明是想被你拥抱在怀里…自慰的手一直停不下来${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}偶尔抬头看着${player_name}热切的说着、但是自慰的动作却无法停止。`,
          );
          await era.printAndWait(
            `「啊啊啊…哈…不行了…要高潮了${heart(1)} 不行…不行了…不要看！…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「唉…啊…啊…啊啊啊…啊……${heart(1)} 哈…哈…哼${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边大声的发出可爱的声音一边不停的自慰。那个样子就像是发情期到来的母猫一样。`,
          );
          await era.printAndWait(
            `「啊～${heart(1)} 啊啊～${heart(1)} 嗯、嗯…哈、哈…啊、啊啊啊${heart(1)}」`,
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
            `「做这样的事，好害羞…但是，魔王大人所要求的话也没有办法啊……啊…啊哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}羞耻的面颊染红，一边继续自慰。肌肉型的身体展现了不可思议的柔软${player_name}不禁咽了口口水。`,
          );
          await era.printAndWait(`「哈…啊…啊啊啊…哈…啊啊啊${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「不喜欢光是那么的看着…让我感觉好害羞…以后可能会习惯的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}说着一边继续自慰。那些动作让${target_name}逐渐有了快感。`,
          );
          await era.printAndWait(
            `「嗯…哼…嗯…啊啊…${heart(1)} 哈…哈…啊…啊啊啊${heart(1)}」`,
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
            `「不要看…啊啊啊…看我这里…不用那么兴奋…啊啊啊啊♪」`,
          );
          await era.printAndWait(
            `${target_name}激烈的自慰着，发出的水声都传了过来。`,
          );
          await era.printAndWait(`「还要…舒服…好舒服…我这样…不行了♪」`);
        } else {
          await era.printAndWait(
            `「啊啊啊…我的这个样子…不要看…有…啊啊啊…啊～！」`,
          );
          await era.printAndWait(
            `${target_name}害羞的低着头，但自慰的动作却没有停下了。`,
          );
          await era.printAndWait(`「真是的…真是的…不行啊…感觉…不行…不行了！」`);
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊…哈啊…这样…满足呢…哈…为什么自慰起来这么有感觉呢！」`,
          );
          await era.printAndWait(`${target_name}一边痛哭着一边拼命的自慰着………`);
        } else {
          await era.printAndWait(
            `「不要那么的看着我…真的…啊…啊啊啊…啊…好舒服！」`,
          );
          await era.printAndWait(
            `${target_name}被看得感觉羞耻的快要疯了、自慰的手却没有停过………`,
          );
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (
        era.get(`talent:${target}:130`) == 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) == 0 &&
        era.get(`tequip:${target}:15`) == 0
      ) {
        if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊！母乳…这么好的…不要再发出阿姆阿姆的吮吸声音了…真是的${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊，啊啊啊…母乳…溢出来了…好高兴…啊啊啊…不行！不行啊！！」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…再揉一揉呃…我的美乳…你的话…只要你喜欢被搓揉也不错…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「真的…怎么可以这样…我的美乳搓揉…！」`);
        }
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
            `「啊哈哈…好啊…我的母乳…多喝一些吧${heart(1)} 我…就这么被…啊，揉弄的，高潮了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的母乳被吮吸着，${target_name}发出像哭一样的娇呼………`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「嗯…你的话可以哦…更多的…吮吸我的胸部吧…有…哼…我也…心情…好${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}吮吸着${target_name}的乳房发出的声音、为了吸干${target_name}的母乳不停的响了起来………`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「啊啊啊…被喝母乳…感受…什么啊…我…已经不行了吧…有…啊♪」`,
          );
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(`「啊啊啊…不行了不行了…再不能喝了！」`);
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「啊啊…还要更多…把我两边的乳房都吸干…啊啊啊啊${heart(1)} 我要疯掉了，呜啊…${heart(1)}」`,
          );
          if (chara(target).train.穿环状态 & 1) {
            await era.printAndWait(
              `「啊好高兴…好高兴…那样…啊…乳头像被切断了一样…拉我的乳环啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}被爱抚着胸部，发出淫荡的声音，眼睛已经只剩下情欲。………`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「啊啊…再揉呃…我的美乳…你的话…只要喜欢一直被搓揉也不错。…${heart(1)}」`,
          );
          if (chara(target).train.穿环状态 & 1) {
            await era.printAndWait(
              `「哼…那么的拉乳环…啊…啊啊啊…我…即使被做这样的事…也会有感觉…${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}露出陶醉的表情，在${player_name}的爱抚下做出敏感的反应。………`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「哼…真是的…啊啊…一点点…我是…我可没有感觉…有…啊啊啊♪」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的乳头和乳房每次被${player_name}爱抚都会做出敏感的反应………`,
          );
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(`「该死…哪有这么容易…不要揉我的美乳…！」`);
          await era.printAndWait(
            `${target_name}的胸部被爱抚着，只是皱起了眉头任凭${player_name}的摆布………`,
          );
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
          `「阿姆…吧唧…吧唧…呜呜呜…吸溜…\\(￣▽￣)/${heart(1)}」`,
        );
        await era.printAndWait(
          `和${target_name}吻了好几分钟，${target_name}是不会轻易分开的。`,
        );
        await era.printAndWait(
          `最后吻到缺氧了才不得不分开，${target_name}因为缺氧大口大口的喘着气。`,
        );
        await era.printAndWait(
          `「唔呼呼…明明是第一次的接吻…居然会这么熟练…再来一次…${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「哼…吗…呼…哈…才不要分开呢…啊呜呜…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}不愿意分开、央求着接吻了好几次。`,
        );
        await era.printAndWait(
          `「因为…这是我的初吻，不想这么快就结束了………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}面前坦率的撒娇，更是不断的亲吻着………`,
        );
      } else {
        await era.printAndWait(
          `「啊！…这…怎么…你竟然…你竟然…我的初吻…就这么被夺走了…！」`,
        );
        await era.printAndWait(
          `${target_name}愤怒的用眼睛瞪着，猛地将${player_name}撞开。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `${player_name}只是冷笑的说道「下一步还要夺走你的处女呢！」${target_name}变得更加愤怒了………`,
          );
        }
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「阿姆…吧唧…吧唧…呜呜呜…吸溜…\\(￣▽￣)/${heart(1)}」`,
        );
        await era.printAndWait(
          `和${target_name}吻了好几分钟、${target_name}是不会轻易分开的。`,
        );
        await era.printAndWait(
          `最后吻到缺氧了才不得不分开${target_name}因为缺氧大口大口的喘着气。`,
        );
        await era.printAndWait(`「哈…哈…唔呼呼…再来一次吧………${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哼…吗…呼…哈…才不要分开呢了…啊呜呜……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}不愿意分开、央求着接吻了好几次。`,
        );
        await era.printAndWait(
          `「我的嘴唇…更想要了！${heart(1)} 阿姆…吧唧…吧唧…吸溜…\\(￣▽￣)/…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}面前坦率的撒娇，更是不断的亲吻着………`,
        );
      } else {
        await era.printAndWait(`「哼…唔…唔…唔…真恶心。你的舌头在干什么呢………」`);
        await era.printAndWait(
          `${target_name}带着厌恶的表情分开了，不停的擦着嘴唇。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `${player_name}只是冷笑着说道「下一步还要夺走你的处女呢！」${target_name}像看到什么恶心的东西一样，心情变得糟糕起来………`,
          );
        }
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
          `「阿姆…吧唧…吧唧…呜呜呜…吸溜…\\(￣▽￣)/${heart(1)}」`,
        );
        await era.printAndWait(
          `和${target_name}的嘴分开以后，口水像是吊桥一样还连接着。`,
        );
        await era.printAndWait(
          `${target_name}看见后又用舌头吧口水舔了回来、嘴唇在口水的湿润下变得更加艳丽了。`,
        );
        await era.printAndWait(
          `「啊啊…再来一次吧…我的嘴唇还想要………${heart(1)}」`,
        );
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哼…吗…呼…哈…才不要分开呢了…啊呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}不愿意分开、央求着接吻了好几次。`,
        );
        await era.printAndWait(
          `「我的嘴唇是你的……还想要更多。${heart(1)} 啊呜…啊呜…啊呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抱着${player_name}不停的撒娇，更是又亲吻了好几回………`,
        );
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔…唉…哈…哈…吧唧…吧唧…唔…哈…哈…」`);
        await era.printAndWait(
          `${target_name}渐渐接受了接吻、老实的任凭${player_name}摆布。`,
        );
        await era.printAndWait(`「仅仅…习惯了而已…可是…再这么亲吻下去………」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨厌啊…和你接吻…吧唧…吧唧…哈…唔…唔唔！」`);
        await era.printAndWait(
          `${target_name}的脸被强行的扳了过来，被迫张开了双唇。${player_name}在她嘴里不断的蹂躏着。`,
        );
        await era.printAndWait(`「哈…哈…这么亲吻下去…会堕落的………」`);
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
          `「啊哈哈、现在才想看吗…也好，仔细看啊${heart(1)} 我这淫乱女阴${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在下流的命令下高兴的用双手打开秘裂。秘裂当中已经渗出了淫液。`,
        );
        await era.printAndWait(
          `「怎么样？我的女阴…你的大肉棒想要么…${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:0`) == 1 &&
          era.get(`exp:${target}:0`) == 0
        ) {
          await era.printAndWait(
            `「所以说呐…大肉棒…请…刺破我的处女膜吧…${heart(1)}」`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「让我自己打开给你看…好吧…虽然很不好意思，如果你想看…让你见识一下吧」`,
        );
        await era.printAndWait(
          `${target_name}的脸上露出了羞耻的表情，却自己撑开了秘裂。`,
        );
        await era.printAndWait(
          `「怎么样？我自认为还是很漂亮的。…${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:0`) == 1 &&
          era.get(`exp:${target}:0`) == 0
        ) {
          await era.printAndWait(
            `「啊啊啊…我的处女膜也能看见吗？啊啊…你想要的话就快点收下吧…${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(
          `「变，变态…这样的事情…我是不会认输的…啊啊啊…不要，不要看过来」`,
        );
        await era.printAndWait(
          `${target_name}脸上露出了屈辱的表情，却不得不遵守这下流的命令。`,
        );
        await era.printAndWait(`让她那样自己翻开秘裂是有着特别的意义的………`);
        if (
          era.get(`talent:${target}:0`) == 1 &&
          era.get(`exp:${target}:0`) == 0
        ) {
          await era.printAndWait(
            `「哎…看见处女膜了吗？啊，啊啊啊，当然有处女膜了…我可是不折不扣的处女！」`,
          );
        }
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…到里面…我的由里到外全都被看到了…淫乱女阴${heart(1)} 只是被人看到…就有了快感${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在下流的命令下高兴的用双手打开秘裂。秘裂当中已经渗出了淫液。`,
        );
        await era.printAndWait(
          `「怎么样？我的女阴${heart(1)} 好渴望大肉棒…想被穿透…${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:0`) == 1 &&
          era.get(`exp:${target}:0`) == 0
        ) {
          await era.printAndWait(
            `「所以说呐…大肉棒…请…刺破我的处女膜吧…${heart(1)}」`,
          );
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊…好吧…你想看的话，好难为情…全部…全都被你看见了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的脸上露出了害羞的表情自己撑开了秘裂。那表情哪里期待着的东西可窥一斑。`,
        );
        await era.printAndWait(
          `「啊啊啊…怎么样？兴奋吗…${heart(1)} 我的…被魔王大人看着…啊，啊啊${heart(1)}」`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊啊…我的处女膜也能看见吗？啊啊…你想要的话就快点收下吧…${heart(1)}」`,
          );
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…哈哈…你看到最里面了吧…却看到了…啊啊啊…手指…哼…随意～♪」`,
        );
        await era.printAndWait(
          `${target_name}像是无法违背肉欲、不是被命令而是被期待着双手分开了秘裂。`,
        );
        await era.printAndWait(
          `「我…讨厌…哎呀…你好像看见啊…为什么会这样…啊啊啊！」`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「被看的…我的处女膜…啊…被看的啊…有…讨厌…哎呀………」`,
          );
        }
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「唉唉…竟然这样的命令我…以后绝对会让你后悔吧…！」`,
        );
        await era.printAndWait(
          `${target_name}虽然嘴上说那种事，却也只能屈辱的服从命令。`,
        );
        await era.printAndWait(
          `并且被那样的命令一点点侵蚀着内心的坚持，她还没有意识到的………`,
        );
        if (
          era.get(`talent:${target}:0`) == 1 &&
          era.get(`exp:${target}:0`) == 0
        ) {
          await era.printAndWait(
            `「这样做…是要确认处女膜是否被人夺走了…啊，除了你以外还有谁会夺走…哼！」`,
          );
        }
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
          `「啊啊啊…再深一些…粗暴也没关系说…啊啊啊…这…就这样哟${heart(1)}」`,
        );
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊啊啊…是，是的…我会老老实实的…所以…哼…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「说…不啊…那样的…到最里面了…不要再玩弄…啊啊啊！」`,
        );
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
          `「还要更多…尽情玩弄我的淫穴吧…要到高潮了…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴道像是吸舔般执拗缠着手指、发出了欢乐的声音。`,
        );
        await era.printAndWait(
          `「流出来了很多淫蜜啊${heart(1)} …啊啊…再被你这样的话…就更加想要了哇${heart(1)}」`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…好、好啊…魔王大人${heart(1)} 请更加玩弄我吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}阴道内不断的蠕动、整个人成了快感的俘虏………`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊…啊啊啊～哈！已经、已经不要了…不要…拔出来…拔出来啊，哦哦！」`,
        );
        await era.printAndWait(
          `${target_name}的阴道内被不停的搅动着，发出了悲鸣般的喘息声………`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊啊…已经、已经不行了，拔出来…我竟然会被这样的玩弄…啊啊啊！」`,
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
          `「那种地方被舔的话、我…感觉好奇怪…啊哈…啊哈…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「别、不要舔那种地方…唉、羞死了…啊…哎哎啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哎呀！等等，哪里不能舔！因为很脏！不要舔！不要啊？！」`,
        );
        await era.printAndWait(
          `「啊啊这样…前面那么好为什么还要舔这种地方………」`,
        );
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.舔肛 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…被这么的舐着…我的肛门…舌头再进去一些${heart(1)} 在来回搅动啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被舔着肛门周围的褶皱、并且舌头更进一步的伸到了肛门里面。`,
        );
        await era.printAndWait(
          `「啊啊啊…肛门被玩弄的好高兴啊${heart(1)}…好、好的${heart(1)} 是我最喜欢的男人${heart(1)}」`,
        );
        // CFLAG:310  = 7（变量语义：CFLAG 族，310）
        kojo.舔肛 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「那种地方被舔的话、我…感觉好奇怪…啊哈…啊哈……嗯～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被抬起来舔着肛门、发出了高声喘息。`,
        );
        await era.printAndWait(
          `「啊啊啊…这是，这是好舒服…啊，真是的…有…啊，是啊。${heart(1)}」`,
        );
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…被这么的舐着…我的肛门…舌头再进去一些${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被深入的舌头来回搅动，发出了淫荡的叫喊。`,
        );
        await era.printAndWait(
          `「啊啊啊…不行…肛门被这样的玩弄…啊，要高潮了！…${heart(1)}」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「别、不要舔那种地方…唉、羞死了…啊…哎哎啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被仔细的舔着，发出了舒服的呻吟。`,
        );
        await era.printAndWait(
          `「啊啊～${heart(1)} 已、已经不行了…啊…噢噢～${heart(1)}」`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼，哼，如果想舔的话，那么，你想怎么做都行…啊啊…又来了！」`,
        );
        await era.printAndWait(`${target_name}每次被舔肛门都会发出呻吟声。`);
        await era.printAndWait(`「哇，我…当然不会有快感了…啊…噢噢噢！」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「变态…变态…！居然在舔我的屁股…怎么可能会有快感？…这种事情、只会感到恶心！」`,
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
          `「啊啊啊…这样不停的震动…我好开心啊${heart(1)}」`,
        );
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「是啊…啊啊…那感觉很舒服…好高兴…${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「停、停止吧！在我身上这样的震动…哦…啊啊啊！」`,
        );
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
          `「啊啊啊…这样震动简直太好了…让我更加快乐吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴蒂受到刺激不断的扭动着腰，发出了欢乐的声音………`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…啊啊…那感觉很舒服…好开心…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}脸上荡漾着追求快感的样子………`);
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…哈哈…啊，不行…那个不行…所以再不要玩弄了…啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}阴蒂多次受到刺激，身体痉挛了………`);
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜啊…什么呀，这样的…再也忍受不了了…哦…唔啊！」`,
        );
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
            `「啊啊啊～…终于…处女要被蠕虫夺走了啊…有…啊哈…欢迎光临~${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「这个蠕虫…我的第一次…有…啊啊！这样的…突然就进来了…！」`,
          );
        } else {
          await era.printAndWait(
            `「这，这样的蠕虫…我的处女让这种东西夺走了…不，不能原谅…！呀啊…呀…钻进来了…还在动…不要！」`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊…哦…呜啊…蠕虫开始动了…真是好东西…这简直太好了${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「蠕，蠕虫啊…啊啊啊…这，这就开始动了…又来…啊啊…真是调皮${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「这，被这样的东西插感觉好恶心…啊啊…插进来了！又在里面动了啊！」`,
          );
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊哈…这个蠕虫总是活力充沛啊…啊啊哈…我的淫穴…尽情享受吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}稍微有点空闲时间，一边笑着一边沉浸在被蠕虫抽插产生的快感中………`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「蠕虫又在里面移动了…还是习惯不了…哦…哦哈…这，这…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}阴道内的蠕虫蠢蠢欲动，她小声的呻吟着………`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哎呀…蠕虫什么的…快感什么的…明明不是这样的…哦…啊啊啊！」`,
        );
        await era.printAndWait(
          `蠕虫在敏感的阴道内来回蠕动${target_name}的腰不停的扭动着………`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哎、哎呀…蠕虫什么的…污秽的东西不要钻进我的阴道里！」`,
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
      await era.printAndWait(`「唉，没了？…还想继续享受呢${heart(1)}」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈哈…下次…想要你进来。…${heart(1)}」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊…不，终于摆脱了………」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (kojo.振动杖 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊哈…喜欢上这样猛烈的震动了${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「真是的！好，好难为情…啊啊啊！啊，不行了…又…又…又开始震了${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「这，这是什么啊…咦…唉…啊啊啊！？，开始震动…停，停下来！」`,
        );
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈…喜欢上这样猛烈的震动了${heart(1)}」`);
        await era.printAndWait(
          `「就是这样的！…像是被真正的男人干一样${heart(1)} 啊啊啊…给我更多的快感！${heart(1)}…高潮了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被震动杖屡次刺激，脸上满是快感………`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「真是的！好，好难为情…啊啊啊！啊，不行了…又…又…又开始震了${heart(1)}」`,
        );
        await era.printAndWait(
          `「哇，我…啊啊啊…这，这样就…高潮了，高潮了…啊啊…啊…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}挺着腰、像是被震动杖吸起来似的，努力的追逐着快感………`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「那种器具…不要欺负我…又…又来了啊…动起来了！啊，啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}被震动杖几度弄得高潮迭起，只剩下喘气的声音了………`,
        );
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊哈…啊哈…已经不行了…这样就…明明不想有快感…啊、又震了！？」」`,
        );
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
          `「啊啊啊…再里面点…在蠕动呢…我的肛门更有感觉了…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊啊！蠕虫…蠕动着…天啊…我的屁股…啊啊…变大了哇…${heart(1)}」`,
        );
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「天啊…做…那样的…啊啊！骗人的吧…蠕虫全部钻进屁股里面了…进去好深啊！啊啊不行！」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门轻易的将蠕虫吸了进去………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…在做什么啊…屁股什么的…绝对不可以！不行啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}还没有被开发的肛门被强行塞入了蠕虫………`,
          );
        }
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.肛门虫 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这是…这样就好了…肛门里面…啊啊啊啊…蠕虫全部吃进去了…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的被开发了的肛门扭动的同时，轻易的将蠕虫吞下去。`,
        );
        await era.printAndWait(
          `「厉害啊…肛门里动…哦…啊啊啊啊…脑中一片空白了…${heart(1)}」`,
        );
        // CFLAG:314  = 9（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…还要更多…再进去些…我的肛门更感觉得到…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}肛门内的蠕虫数次疯狂蠕动又逐渐平息、${target_name}发出了喘息的声音。`,
        );
        await era.printAndWait(
          `「真是太好了…哦哦…天啊…肛门有…啊啊啊…里面…又动起来了${heart(1)}」`,
        );
        // CFLAG:314  = 8（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…还要更多…再进去些…我的肛门更感觉得到…${heart(1)}」`,
        );
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这是…这样就好…肛门有玩具了…啊啊…蠕虫全部吃进去了…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的被开发了的肛门扭动的同时，轻易的将蠕虫吞下去。`,
        );
        await era.printAndWait(
          `「啊啊啊…也已经…和想蠕虫酱结婚啊…啊啊啊…厉害…头脑一片空白。…${heart(1)}」`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…蠕虫在屁股里…全部都进去了…噢噢～${heart(1)} 啊啊啊啊${heart(1)}…太好了…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}肛门内的蠕虫偶尔旋转起来、${target_name}嘴里呼出了灼热的吐息………`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊！蠕虫…蠕动着…天啊…我的屁股…啊啊…变大了哇…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}肛门内的蠕虫开始旋转蠕动了………`);
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊啊…蠕虫…进入了…谢谢…啊啊啊…哎呀…屁股变得奇怪了呜」」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门轻易的将蠕虫吸了进去………`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜呜…不要，饶了我吧…屁股…屁股是不行的！」`);
        await era.printAndWait(
          `发出惨叫的${target_name}还没有被开发的肛门被强行塞入了蠕虫………`,
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
      await era.printAndWait(`「真是没用…已经不动了…啊啊………${heart(1)}」`);
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊啊…哈…哈…屁股…哼……果然还是比较喜欢魔王大人的…${heart(1)}」`,
      );
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈…哈…屁股…张开了…啊啊啊………」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊…啊啊啊…我、我的屁股…这，坏掉了………」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`)) {
    if (kojo.阴蒂夹 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊啊…哈…了不起啊…阴蒂一直被刺激着…啊，真是的${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「是，是的…夹着也不会疼…抱歉…啊…感觉很舒服…这种振动…有…啊啊啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「呀，停止…啊啊啊…阴蒂上…有…啊啊啊！振动…不要！」`,
        );
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹紧紧地侵占，继续刺激………`,
        );
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…哈…了不起啊…阴蒂一直被刺激着…啊，真是的${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹深深的勒了进去，刺激的${target_name}的脑袋不停的摇摆………`,
        );
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「是，是的…夹着也不会疼…抱歉…啊…感觉很舒服…这种振动…有…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被电动阴蒂夹不断的刺激，一脸陶醉。………`,
        );
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 3;
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「真是的！阴蒂侵占了…啊！…有…啊啊啊！等等！振动了…啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹紧紧地侵占，继续刺激………`,
        );
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「不够、还要…想要的更多了………${heart(1)}」`);
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈…哈…怎么停了…讨厌………${heart(1)}」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈…哈…这感觉是怎么了…啊………」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`)) {
    if (kojo.乳头夹 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呵呵，乳头更刺激了…啊啊啊…我喜欢这个东西，好舒服…这好${heart(1)}…好东西${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「有…啊啊啊…吗…这样啊…乳头有感觉了…有…哈${heart(1)}…这两点的刺激…好喜欢…哼${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊…乳头被安上这样的东西…啊啊啊！振动起来了…有…啊啊啊…真是！」`,
        );
        await era.printAndWait(
          `${target_name}的乳头受到这样的刺激，身体也扭动起来………`,
        );
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呵呵，乳头更刺激了…啊啊啊…我喜欢这个东西，好舒服…这好${heart(1)}…好东西${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}受乳头夹转子的刺激，露出了淫荡的表情………`,
        );
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「有…啊啊啊…吗…这样啊…乳头有感觉了…有…哈${heart(1)}…这两点的刺激…好喜欢…哼${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}发出了甘甜的吐息，仔细品味着乳头夹震动带来的快感………`,
        );
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊啊…乳头被安上这样的东西…啊啊啊！振动起来了…有…啊啊啊…真是！」`,
        );
        await era.printAndWait(
          `${target_name}的乳头受到这样的刺激，身体也扭动起来………`,
        );
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
      await era.printAndWait(
        `「啊，真是的…明明乳头想要更加舒服了…${heart(1)}」`,
      );
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊…下一次要你的手来弄…想要！…${heart(1)}」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈哈…讨厌…这样的表现………」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 16 && era.get(`tequip:${target}:16`)) {
    if (kojo.榨乳器 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊啊${heart(1)} 更多更多的吸出来！吸出母乳的感觉…这么舒服呐…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊抱歉！母乳…要说在呜…啊啊…被挤奶…感觉很舒服啊…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊…啊啊啊…不要啊…我的母乳…啊啊…被吸走了………！」`,
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
          `「啊啊啊${heart(1)} 更多更多的吸出来！吸出母乳的感觉…这么舒服呐…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的奶水不断的从涨大了的乳房里喷了出来。每次喷出都伴随着娇喘声………`,
        );
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「母乳…啊啊啊…要出来了${heart(1)}…啊啊啊…被挤奶舒服啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的奶水不断的从涨大了的乳房里挤了出来。每次都伴随着小小的喘息声………`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊…啊啊啊…果然…我的母乳…啊啊…都被吸走了………！」`,
        );
        await era.printAndWait(
          `${target_name}的奶水不断的从涨大了的乳房里被吸了出来………`,
        );
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
        `「唔呼呼…那个母乳，我也想要一口喝！…${heart(1)}」`,
      );
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈…哈…哼…还，还是感觉很舒服…胸部…啊啊啊…${heart(1)}」`,
      );
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊啊…被吸了很多…为什么会有这样的事………」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊，真是的…肛门…啊啊啊…全部进来…好…好东西${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊啊…圆的…全部都加入了…屁股中…嘎吱嘎吱地…在滑动…${heart(1)}」`,
        );
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊啊…啊啊！珠子…全部进入…啊啊饶了我吧—屁股…不行…明明是不行的！」`,
          );
          await era.printAndWait(
            `不过，${target_name}被开发了的肛门依然不断地将珠子吞下去了………`,
          );
        } else {
          await era.printAndWait(`「屁股…不要…饶了我…饶了我吧！不行的！」`);
          await era.printAndWait(
            `${target_name}不成熟的肛门，强行将珠子塞了进去………`,
          );
        }
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.肛珠 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊哈啊…好啊…啊…啊啊啊${heart(1)} 啊啊…全部…全部都要进来${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门轻易的咽下珠子，然后吞噬了所有的珠子。`,
        );
        await era.printAndWait(
          `「啊哼…${heart(1)} 肚子吃饱了…就这样抽出来…我的屁眼…变得乱七八糟了…${heart(1)}」`,
        );
        // CFLAG:320  = 9（变量语义：CFLAG 族，320）
        kojo.肛珠 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊，真是的…肛门…啊啊啊…全部进来…好…好东西${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门将珠子一颗一颗吞了进去，她的喘气声音也逐渐平静了`,
        );
        await era.printAndWait(
          `「在里面嘎吱嘎吱的响呢…啊啊啊${heart(1)}…这被拔出来会怎么样呢…啊啊啊${heart(1)}」`,
        );
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        kojo.肛珠 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊，真是的…肛门…啊啊啊…全部进来…好…好东西${heart(1)}」`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊哈啊…好啊…啊…啊啊啊${heart(1)} 啊啊…全部…全部都要进来${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的肛门轻易的咽下珠子，然后吞噬了所有的珠子。`,
        );
        await era.printAndWait(
          `「啊…啊…还想要…还想要更多进去…哼…${heart(1)}」`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「好！好东西！这个，非常好！啊啊啊！全部全部都想要的东西！啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门将珠子一颗一颗吞了进去，她的喘气声音也逐渐平静了………`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…圆的…全部都加入了…屁股中…嘎吱嘎吱地……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}肛门珠的一点点被推了进去，每次都发出喘息声音………`,
        );
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊！…啊啊！珠子…全部进入…屁股…不行…明明是不行的！」`,
        );
        await era.printAndWait(
          `不过，${target_name}被开发了的肛门依然不断地将珠子吞下去了………`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊…不要了…我都求饶了…拜托了…啊啊啊…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}不成熟的肛门，强行将珠子塞了进去……`,
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
      await era.printAndWait(
        `「啊，是啊…这是…这好…好的${heart(1)} 在屁股里…感觉都空了${heart(1)}」`,
      );
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊啊啊！………屁股…屁股…舒服…奇怪的感觉…${heart(1)}」`,
      );
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊好！………啊有…啊…哈…哈…屁，屁股…坏掉了…哇………」`,
      );
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「啊啊啊啊！………哈哈…过分…哇…怎么能这样…强行的拔了出来………」`,
      );
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
              `「啊啊啊！魔王大人啊…来…进到最深处…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${player_name}捅破了${target_name}的处女膜、深深的插了进去。`,
            );
            await era.printAndWait(
              `「哈…哈…好厉害…知道了…能和魔王大人一起…哼…魔王大人的魔力流到体内了…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的眼睛发出闪闪光芒、双腿缠着${player_name}的腰抱着。`,
            );
            await era.printAndWait(
              `「啊啊啊…侵犯我这淫乱的小穴吧！用黏糊糊的精液把它灌满${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊啊啊${heart(1)} 这、这是…魔王大人的肉棒啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的处女膜被捅破了，第一次接受了男人的肉棒，比起疼痛的感觉更多的是激动。`,
            );
            await era.printAndWait(
              `「啊啊…直接动也可以…${heart(1)} 我的淫穴随便你来摆弄…侵犯我吧…啊啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `「呼，好深啊…啊啊啊…好厉害啊…厉害的东西…哇，我…已经变得奇怪起来…哇…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}拼命的紧抱着${player_name}、享受着第一次的快感，大声的喊叫着………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊啊啊啊…！马上…啊…来了！魔王大人的肉棒…在我的阴道内…进来了…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}夺走了处女之身，激动的喊出了声音。`,
            );
            await era.printAndWait(
              `「哈…哈…啊啊啊…知道了…这样的话…什么样的孩子都是…魔王大人的东西了哇…啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `魔族化的${target_name}的眼睛闪闪发光、逐渐的染上了${player_name}的魔力。`,
            );
            await era.printAndWait(
              `「啊啊啊…就这样…我的阴道内射精！魔王大人的印记，领受了${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…！…你地…拥抱…哈啊…我的第一次…能献给你简直太好了…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍受着处女被夺走的疼痛，一边流着眼泪一边扭着腰呻吟着。`,
            );
            await era.printAndWait(
              `「啊啊啊…啊…啊哈！这样…插入…剧烈…东西…啊，真是的${heart(1)}」`,
            );
            await era.printAndWait(
              `「想要再温柔点…啊啊啊…因为，好不容易成了你的女人…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}可爱的嘟哝着爱你的宣言、${player_name}大力的插入使她变得更加快乐了………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊啊啊…！哎呀…哎呀讨厌…快出去…啊啊…不要动啊…好痛啊！」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}夺走了处女之身，痛苦的发出了悲鸣。`,
          );
          await era.printAndWait(
            `「这、这个…可以离开了吧…啊啊啊…痛痛痛…有在听我说的吗。…」`,
          );
          await era.printAndWait(
            `当然听见了，${player_name}为了贪图快乐，不断的侵犯着${target_name}………`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊…哈哈…来侵犯我的淫穴吧！${heart(1)} 等不及要被您的肉棒来侵犯了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的淫穴将肉棒完全吞了进来、${player_name}粗野的抽动着腰部，发出了喘气声音………`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「啊哈…拜托…请温柔些…${heart(1)}」`);
          await era.printAndWait(
            `肉棒深深的插入了${target_name}的阴道内、随着${player_name}腰部的抽动，发出了甜美的呻吟………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…停、停下来…不要再被插入了……啊啊，拜托啦！」`,
          );
          await era.printAndWait(
            `${target_name}的阴道被一插到底、${player_name}粗野的抽动着腰部，丝毫不顾发出的悲鸣………`,
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
            `「啊…哈哈…来侵犯我的淫穴吧${heart(1)} 等不及要被您的肉棒来侵犯了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的淫穴将肉棒完全吞了进来、${player_name}粗野的抽动着腰部，发出了喘气声音。`,
          );
          await era.printAndWait(
            `「啊啊啊…啊哈…好激烈…被这样的插进来…感觉好高兴…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊啊…已经…脑袋里面…一片空白了…${heart(1)} 啊～啊啊啊～啊～…啊啊啊啊啊～${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「还要…还要插的更深${heart(1)} 我的愿望是…随便玩坏我吧${heart(1)} 啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的双腿像钳子一样夹着${player_name}的腰，向自己的身上压着来回晃动。`,
          );
          await era.printAndWait(
            `「啊啊啊…这，这…好东西…喜欢…玩坏我的淫穴吧…对我犯罪吧${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「不行了${heart(1)} 啊啊…进来了${heart(1)} 我的淫穴…${heart(1)} 啊啊啊啊${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${player_name}的肉棒像穿串一样深深的插入了${target_name}的阴道内、一直等待着。`,
          );
          await era.printAndWait(
            `「啊啊啊！干什么！你这样我动不了了！明明想要侵犯我却什么都不做！」`,
          );
          await era.printAndWait(
            `${target_name}发出了责难的声音、自己想要扭动腰部，却因为动不了而感受不到任何快感。`,
          );
          await era.printAndWait(
            `「啊啊啊…拜，拜托您了了…请侵犯我的淫穴吧…我的淫穴已经做好充分的准备了…动啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为无法忍受而不断哀求着、${player_name}一边轻松的看着狼狈的样子，一边开始了猛烈的抽动………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊…这是好东西，这…我…没有您的肉棒怎么才能活下去啊${heart(1)} …啊啊啊啊啊${heart(1)}」`,
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
          await era.printAndWait(`「啊哈…拜托…请温柔些…${heart(1)} 哦！」`);
          await era.printAndWait(
            `肉棒深深的插入了${target_name}的阴道内、随着${player_name}腰部的抽动，发出了甜美的呻吟。`,
          );
          await era.printAndWait(
            `「啊啊啊…真是太好…早点被你的抱在怀里…哈…啊啊啊啊啊${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊哈…啊啊…啊…啊啊啊…好舒服…我的淫穴啊${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「最喜欢最喜欢的事情…就是被你这样的侵犯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}双腿夹着${player_name}的腰用力抬着自己的屁股，试图让肉棒进的更深一些。`,
          );
          await era.printAndWait(
            `「啊啊啊…啊啊…啊啊…深一些…再进的深一些${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「不行…不行！哎${heart(1)}…我已经不行了…感觉好奇怪…啊啊啊…啊…啊啊啊啊${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}被${player_name}侵犯，毫不留情的蹂躏着阴道里面。`,
          );
          await era.printAndWait(
            `「啊…啊啊啊…深一些…再深一些…好啊…我…这样的感觉呐…啊…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经陷落在这种无比甜美的感觉之中。………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊…已经不行…呃呃我不行了…有…啊啊啊啊啊…我的淫穴要疯了${heart(1)}」`,
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
          `「啊啊啊！哈哈…啊啊啊啊！啊，不行…腰不停使唤一直在抖…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的被开发了的阴道内、${player_name}毫不留情的蹂躏着敏感的部位，产生了快乐。`,
        );
        await era.printAndWait(`「哇，我…这样的感觉…明明是不可以的…啊啊！」`);
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊…哦…唔唔唔…这样的…啊…呀…唔唔唔！」`);
        await era.printAndWait(
          `${target_name}的阴道被肉棒深深的插了进来、随着${player_name}的腰粗野的抽动，拼命忍耐着也不发出声音………`,
        );
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊啊…那，这么激烈…不，不要动…呀…停下了，拜托！」`,
        );
        await era.printAndWait(
          `${target_name}的阴道被肉棒深深的插了进来、随着${player_name}的腰粗野的抽动，发出了悲鸣………`,
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
              `「啊…啊啊啊…太好了…这是魔王大人剥夺可悲骑士的纯洁最好的场景了…${heart(1)}」`,
            );
            await era.printAndWait(
              `「这样…变成魔族堕落了…从后面…哼…被侵犯之类的…有…来…啊啊。${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}就这样邀请、被${player_name}从后面一下子贯穿。处女膜贯穿的破瓜之血滴到了地板上。`,
            );
            await era.printAndWait(
              `「啊啊～…啊啊～啊啊啊啊啊～！啊…啊啊啊～…痛…但是…好棒啊…被侵犯了！被魔王大人侵犯了啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}兴奋的扇着翅膀，野兽般的欢呼着被${player_name}一直侵犯下去了………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊啊…我的处女被夺走了…${heart(1)} 渴望魔王大人的肉棒…${heart(1)}」`,
            );
            await era.printAndWait(
              `从后面抓住${target_name}的腰，慢慢地抚摸着后背。仅仅这样${target_name}的秘裂已经开始湿润了。`,
            );
            await era.printAndWait(
              `「啊${heart(1)}…不要再挑逗了…忍不住了…${heart(1)} 啊…啊啊啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}的空虚被${player_name}从背后一口气刺穿。处女膜破坏后的破瓜之血滴在了床上。`,
            );
            await era.printAndWait(
              `「啊…啊啊…好深啊…魔王大人的肉棒啊…全都进来了${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊…啊啊…哈…哈啊…长的…啊啊啊…这么…慢慢地…我…奇怪了。${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}从后面被${player_name}的阴茎一点点慢慢地插了进来，刚好停在处女膜前面。`,
            );
            await era.printAndWait(
              `「啊啊啊…不要这样半途而废啊…啊啊啊…快一点…快一点进去啊，啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}抗议了似的，一下子伸直羽翼。然后${player_name}为了回应，一下子刺到底了。`,
            );
            await era.printAndWait(
              `「啊啊啊…啊啊啊～！魔王大人的…啊啊啊${heart(1)} 全部～…全部都进去了啊啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊啊…请射到里面吧…魔王大人的印记，要刻到我的子宫里${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `${target_name}从后面直接捣破了处女膜。${player_name}开始了慢慢抽送。`,
            );
            await era.printAndWait(
              `「啊啊啊…你把全部…都夺走了…我的内心和身体…一切的一切…哼…${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊啊…有…我是…从后面被侵犯的…好开心啊…快啊…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}各种蹂躏、发出愉快的声音………`,
            );
          }
        } else {
          await era.printAndWait(
            `「不行…不行啊…拔出来…快点拔出了啊…呀…啊啊啊…不要再动了…啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}从后面被${player_name}贯穿了处女膜、处女之血顺着大腿流了下来。剧烈的疼痛使刚强的${target_name}发出了悲鸣。`,
          );
          await era.printAndWait(
            `「啊啊啊…这样…我…被侵犯…啊啊…纯洁被剥夺了…啊啊啊…也已经呀………！」`,
          );
          await era.printAndWait(
            `听着${target_name}被侵犯而发出的哭喊声、${player_name}的肉棒更加硬了，激昂的插进阴道深处………`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哼…从后面被侵犯之类的…极好…啊啊啊…我是野兽一样了，谢谢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从后面一下子贯穿，便发出了娇呼声………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～！深一些…再深一些！ 天、天啊…来、来啊…啊啊啊～${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「做…啊啊啊…从后面插进来…好…我…就喜欢这样的感觉了…有…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从后面被慢慢插入，发出了甜美的声音………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊哈…嗯嗯！这样，突然的，变得激烈起来！…我是…有…啊啊啊${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「这，这样姿势…啊啊啊…不…不要再侵犯我了…等等…呀！」`,
          );
          await era.printAndWait(
            `${target_name}被从后面一下贯穿了，发出了悲鸣声………`,
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
            `「哼…从后面被侵犯之类的…极好…啊啊啊…我是野兽一样了，谢谢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从后面一下子贯穿，便发出了娇呼声。只是慢慢的抽送便发出了娇呼声、阴道内也发出了水声。`,
          );
          await era.printAndWait(`「啊啊啊…好啊…我变得像野兽了啊…！」`);
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊…我被魔王大人侵犯了…作为肉奴隶的我都高潮了好几次了…啊啊啊～${heart(1)}…啊…啊…啊啊啊呀${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「我…啊啊…淫乱${target_name}的肉壶…请尽情品尝${heart(1)} …魔王大人的肉棒真是美味啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从后面被几次侵犯，也很开心的大声喊着。已经不考虑被侵犯以外的事。`,
          );
          await era.printAndWait(
            `「啊啊…对不起…我喜欢…被侵犯…这样的感觉吧！女人了。${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊～！深一些…再深一些！ 天、天啊…来、来啊…啊啊啊～${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}的腰被紧紧抓住，一口气贯穿到最深处。只是那个她的身体是布丁一样快乐的摇摆。`,
          );
          await era.printAndWait(
            `「轻点…啊啊啊…更加…美味的肉棒…还想要的…哼…这是这好嚓${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}脑袋中全是淫欲，对阴道内的刺激发出机械的喘息声………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊哈…哈…哈…我…我是魔王大人最喜欢的肉奴隶，侵犯我的淫穴吧…啊啊啊啊啊啊${heart(1)}」`,
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
            `「做…啊啊啊…从后面插进来…好…我…就喜欢这样的感觉了…有…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从后面被慢慢插入，发出了甜美的声音。`,
          );
          await era.printAndWait(
            `「啊啊啊啊啊…啊，不行啊…温柔的话…我生气啊…哼…是啊，谢谢${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊哈…哈～！对、对就是这么激烈的…我…啊…啊啊啊啊～${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊哈…哈～！那么激烈的不行啊…啊，感觉太…我…啊…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从后面被侵犯，好像不太喜欢，身体颤抖娇声呼喊。`,
          );
          await era.printAndWait(
            `「啊…啊啊…！ 这样的…我…啊啊啊…是不行的…不行了啊呜${heart(1)}」`,
          );
          await era.printAndWait(
            `屁股被压的变的通红，秘裂溢出蜜汁被撞得四处飞散………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊…肉壶变得很奇怪嘛…说什么来…来呜啊…不行不行！啊${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「这样的我…慢慢地什么的…不行啊…啊啊啊…不要心急啊…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的阴道内享受一样慢慢的抽送，粘粘的阴道肉缠绕着阴茎。`,
          );
          await era.printAndWait(
            `「啊啊啊…哇，我…希望愉快的东西…请在哪里啊！」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `${target_name}恳求着、${player_name}加快了抽送的速度。`,
            );
            await era.printAndWait(
              `「啊啊…这是…这样好吗…我的女阴…被侵犯的满好的${heart(1)}」`,
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
        await era.printAndWait(
          `「哈…啊…啊…哈…不，不要…这样就会有感觉了…什么的…哈…啊啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}被开发了的阴道内，从后面顶看来快感创造着。`,
        );
        await era.printAndWait(`「已，已经做了…讨厌的了…啊啊啊…啊啊！」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊…哈哈…哈吧…啊啊…原谅…拜托………」`);
        await era.printAndWait(`${target_name}从后面被侵犯，屈辱的流着泪。………`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不，有…这以上…啊啊啊…哇，我是这样的，所以…等等！」`,
        );
        await era.printAndWait(`${target_name}从后面一下子贯穿发出悲鸣。………`);
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
          await era.printAndWait(`「」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「」`);
        } else {
          await era.printAndWait(`「」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊…哈啊…这么实在的~…嗯~${heart(1)} 侵犯方式…好棒啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰慢慢地前后摇摆着，品味着其带来的快感………`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊嗯~…嗯~…最喜欢了~…大人…嗯~…嗯哼~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副陶醉的样子紧抱着${player_name}，感受着从下往上的冲击而从嘴边漏出了娇喘………`,
          );
        } else {
          await era.printAndWait(
            `「用这样的体位来侵犯…不要以为这样…就可以侮辱得了我...啊啊~！不要从下往上捅啦…啊嗯~！」`,
          );
          await era.printAndWait(
            `无视${target_name}责备的话语、${player_name}就这样从下往上抽插，享受着其身体带来的快感………`,
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
            `「哈啊…哈啊…这么实在的…嗯~${heart(1)} 侵犯方式…好棒啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰慢慢地前后摇摆着，品味着其带来的快感。冒出来的汗水流过了两个人的身体。`,
          );
          await era.printAndWait(
            `「居然那么深地…联系在一起…啊啊啊~…我已经…又、又要去了~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊~来了~…要来了~~~…小穴要融化掉了~${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊~…啊啊~…腰自己就动起来了~${heart(1)}…啊啊~…嗯~…呜嗯啊啊~…哈啊哈啊…啊啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边像磨盘一样来回地旋转着腰部一边发出娇喘。追求快感的那个姿态跟雌犬一模一样。`,
          );
          await era.printAndWait(
            `每当从下往上捅的时候，${target_name}的身体就挺得直直地、发出了悲鸣和快感混合在一起的娇喘~………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊啊~…在，在摩擦着…小穴被摩擦着…啊呜嗯~${heart(1)} 哈呜嗯~${heart(1)}…要去了~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊~…不，不要再挑逗我了啦…再这样下去的话…我要变奇怪了啊…啊啊~…所以啦~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}的腰牢牢地抓住、不给一丝动弹的机会。`,
          );
          await era.printAndWait(
            `「拜、拜托了…我、我要…疯掉了…要变奇怪了啊…所以…啊啊~…啊啊~！」`,
          );
          await era.printAndWait(
            `享受完${target_name}不堪入目的恳求的样子后、${player_name}慢慢地晃动起了腰部………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯呜~…嗯~…好棒~${heart(1)}…这个~${heart(1)}…就是想要这个啦~…啊啊~…我只要…有鸡巴在抽插着就够了呢~啊哈嗯~${heart(1)}」`,
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
            `「啊嗯~…嗯~…最…最喜欢你了噢~…嗯~…嗯哼嗯~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副呆呆的样子被${player_name}抱住、因为从下往上的抽插带来的快感而从嘴边漏出了呻吟。`,
          );
          if (chara(target).train.初吻对象 >= 0) {
            await era.printAndWait(
              `一和${target_name}的嘴唇重叠之后${target_name}湿润的舌头就立马从缝隙中钻进来、从嘴边漏出了娇喘。`,
            );
          }
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊嗯~…嗯~、啊啊~…好喜欢…这个好棒~…因为能紧紧地抱住你了呢~…啊啊啊~${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯~…嗯嗯~…这、这个好棒呢~…啊啊啊啊~…在被摩擦着…啊嗯~…哈啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰紧紧地压下来并且左右晃动着、小豆豆也充分地品味到了刺激。`,
          );
          await era.printAndWait(
            `「啊啊~…嗯~…这个~…好厉害~…啊啊啊~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「小、小穴也…好激烈的感觉…我…已经…已经…啊啊啊啊~${heart(1)}」`,
            );
          }
          if (chara(target).train.初吻对象 >= 0) {
            await era.printAndWait(
              `发出了十分淫乱的慷慨的${target_name}如同要吃掉一样紧紧地抱住${player_name}、贪婪地亲吻着………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊~…嗯~…不行~不行啊~…从下往上抽插什么的~…嗯~…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}短距离快速地在${target_name}的穴内往上着。`,
          );
          await era.printAndWait(
            `「啊啊~…啊~…哈~…嗯呜~…已、已经…再这样被做下去的话…我…啊啊啊~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~…不、不行…等、等下…要疯掉了呜呜~…啊~…啊啊啊啊~${heart(1)}」`,
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
          `「哈啊~哈啊~…不、不行~…再这样做下去的话…我被…啊啊~…嗯~…那么激烈地做的话…啊呜~！」`,
        );
        await era.printAndWait(
          `${player_name}将${target_name}的腰抓住、如同为了摩擦子宫口一样晃动着阴茎。`,
        );
        await era.printAndWait(
          `「啊啊啊~…那、哪里是…啊嗯~…不要~…啊啊啊~不要欺负那里啊………」`,
        );
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…嗯~…嗯呜~…还、还是一点都…啊~…啊啊嗯~！」`,
        );
        await era.printAndWait(
          `${target_name}咬住自己的嘴唇、忍受着${player_name}的凌辱………`,
        );
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这样的事情…哼…别以为这样…就能羞辱我了…啊啊啊~！不要从下往上…啊嗯！」`,
        );
        await era.printAndWait(
          `无视${target_name}的责备的声音、${player_name}就这样贪婪地从下往上地抽插她的身体………`,
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
          await era.printAndWait(`「」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「」`);
        } else {
          await era.printAndWait(`「」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊~…嗯~…好棒~…胸部被揉着…嗯~…啊啊~啊啊~更加用力地往上捅吧~…啊啊~！好厉害啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}胸部被揉着并且因为从下往上抽插带来的快感而发出了呻吟………`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈啊~…啊~…嗯~…啊啊~…魔王大人~…嗯~…哈哈啊~…啊啊~…好喜欢啊~…好喜欢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}胸部被揉着并且因为从下往上抽插带来的快感而发出了甜蜜的娇喘声………`,
          );
        } else {
          await era.printAndWait(
            `「啊呜…呜呜…这样的…啊啊~…啊啊~…不要…胸部被揉什么的…呜！」`,
          );
          await era.printAndWait(
            `${target_name}胸部被揉着并且因为从下往上抽插而发出了呜咽声………`,
          );
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
            `「啊啊~…嗯~…好棒~…胸部被揉着~…嗯~…啊啊~更加用力地往上捅吧~…啊啊~！好厉害啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}胸部被揉着并且因为从下往上抽插带来的快感而发出了欣喜的喘息声。`,
          );
          await era.printAndWait(
            `「啊啊~！啊~啊~…好棒~${heart(1)} …好喜欢~${heart(1)} …小穴被侵犯地好棒啊~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `${target_name}被开发过的小穴每一次被捅进去都会敏感的反应一下、好像很舒服地一样紧紧地用肉壶困住了${player_name}的阴茎………`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯~…嗯嗯~${heart(1)} 啊啊~…哈啊嗯~…啊啊~…啊~…啊呜呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰慢慢地前后摇晃着享受着快感。不仅嘴边流下了唾液，双眼也没有了聚焦。`,
          );
          await era.printAndWait(
            `「啊啊~${heart(1)} 啊~${heart(1)} 啊啊~${heart(1)} 啊啊~…嗯~…哈啊啊~…融化掉了呜~~…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~…小穴要融化掉了呀~…${heart(1)} 啊啊~！…好棒~…好棒~…好棒啊啊~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「更加…更加用力地…将我弄坏吧~${heart(1)} 魔王大人~…${heart(1)}」`,
          );
          await era.printAndWait(
            `将${target_name}的双手抓住从下面频繁地突上来后、${target_name}忍不住发出了充满情欲的声音。`,
          );
          await era.printAndWait(
            `「啊~…啊啊~～！ 啊~啊啊~…好厉害~…好棒啊~${heart(1)} …好棒~${heart(1)} …啊啊~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「好有感觉啊~…小穴…已经舒服到没有办法的程度了~…拜托了~就这样不拔出来吧~${heart(1)}」`,
            );
          }
        }
        if (
          era.get(`tequip:${target}:57`) &&
          era.get(`abl:${target}:17`) >= 1
        ) {
          await era.printAndWait(
            `「啊啊~…大鸡巴~${heart(1)} …将大鸡巴全部塞进来吧~…这个大鸡巴全部都是我的~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}看着映在镜子上自己的痴态更加兴奋了………`,
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
            `「哈啊~…啊~…嗯~…啊啊~…魔王大人~…嗯~…哈啊哈啊~…啊啊~…好喜欢…最喜欢了~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的胸部被揉着因为从下往上抽插带来的快感而发出了甜美的娇喘声。温柔地抚摸了${target_name}绷紧的肚子后她从嘴边漏出舒服的喘息声。`,
          );
          await era.printAndWait(
            `「啊啊~…被你的手抚摸了后…嗯~…变得更加舒服了~${heart(1)}…啊啊~！」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~！小穴~…小穴也好舒服~…要融化掉了~${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈~${heart(1)} 哈~${heart(1)} …啊嗯~…啊啊~…魔王大人~…摸一下胸部吧~…嗯~哈啊~…啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}温柔地用双手抚摸着${target_name}的乳房、慢慢地上下抽动着腰部。`,
          );
          await era.printAndWait(
            `「啊哈啊~${heart(1)} 要融化掉了呜~…那么温柔地话要融化掉了${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊~…嗯~…小穴融化掉了…啊呼嗯~…哈呀啊~~…啊啊~${heart(1)} 要去了呜～${heart(1)} 要去了啊~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `${player_name}慢慢地用双手来回环抱住${target_name}肌肉型身体。`,
          );
          await era.printAndWait(
            `她的皮肤光滑又保持着柔韧，锻炼过的身体惊人的弹性，恰到好处的肌肉线条显示出独特的美感。`,
          );
          await era.printAndWait(
            `「啊~…啊啊~…我、我的身体…完美没有女人味来的…嗯~…好害羞~啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的身体好像很害臊地颤抖着、发出了充满快感的娇喘声………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯~…嗯嗯~${heart(1)} 啊~…更加…更加地侵犯我吧~…${heart(1)}」`,
            );
          }
        }
        if (
          era.get(`tequip:${target}:57`) &&
          era.get(`abl:${target}:17`) >= 1
        ) {
          await era.printAndWait(
            `「啊啊啊~…我的小穴里~…魔王大人的那个全部都进来了~…啊啊~…好厉害好下流啊~…啊嗯~啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}看着映在镜子上自己的痴态更加兴奋了………`,
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
          `「啊啊~…啊嗯~…啊啊~！快拔、快拔出来吧…啊啊~！」`,
        );
        await era.printAndWait(
          `「啊啊~！已、已经…不行…不要~…明明不想输给这个家伙来的…哈呀啊~…呀啊啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}被开发过的小穴如同不受她意志控制一般将阴茎包裹住、享受着男人给予的快感………`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…啊嗯~…胸部是…不行的啊...嗯~嗯嗯~！哈啊~啊啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}因为胸部被揉着还被从下往上抽插、而发出了娇喘………`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊唔…呜呜…这样…啊啊…啊啊~…不要…不要揉胸部啊…~！」`,
        );
        await era.printAndWait(
          `${target_name}压住了揉着胸部的双手、但是压抑不住从下往上地抽插而发出了喘息声………`,
        );
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (kojo.正常位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊啊~…！我、我的肛门被侵犯了…啊啊~${heart(1)} 」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门十分容易地就将阴茎全部吞进去了………`,
          );
        } else {
          await era.printAndWait(
            `「嗯呜…肛门被侵犯什么的…好棒啊…嗯呜…呜~…！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门好像开发度还不够的样子、从嘴边漏出了好像很痛苦的声音………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「魔王大人的那个…进来了啊~…啊啊~…我的屁股…居然那么有感觉什么的…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门十分容易地就将阴茎全部吞进去了………`,
          );
        } else {
          await era.printAndWait(`「啊啊~…请、请稍微再…温柔一点…啊~…嗯嗯~！」`);
          await era.printAndWait(
            `${target_name}的肛门好像开发度还不够的样子、从嘴边漏出了好像很痛苦的声音………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊~…怎么可以…我的屁股被…啊啊啊~…进去了呜~………！」`,
          );
          await era.printAndWait(
            `${target_name}被开发了的肛门十分容易地就将阴茎全部吞进去了………`,
          );
        } else {
          await era.printAndWait(`「不要啊…那里才不是进去的…啊~…啊唔呜~！」`);
          await era.printAndWait(
            `${target_name}的肛门好像开发度还不够的样子、但是${player_name}却强行地将阴茎塞了进去………`,
          );
        }
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.正常位肛交 <= 8 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `${target_name}连双腿被牢牢抓住的羞耻和疼痛感都无法感受到的程度地沉溺在快感中。`,
          );
          await era.printAndWait(
            `「啊啊啊~…更加地${heart(1)} …更加地${heart(1)} …让我…变得更加舒服吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呀呜~…我、我…的肛穴要去了…要去了啊…啊啊啊~~~！淫乱的${target_name}要因为肛穴而去了~${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊嗯…呀啊~哈啊~…啊啊啊啊~${heart(1)} 我…我…已…已经不行…不行…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全沉浸在了屁股带来的快感之中。将双腿张开到极限、每当腰部撞过去都会发出娇喘声。`,
          );
          await era.printAndWait(
            `「哈呀~…哈呜啊~…！啊啊啊~${heart(1)} 肛穴被侵犯地最喜欢了${heart(1)} …最喜欢了啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的肛门被无数次侵犯、开发、被做各种各样的事情，已经只能用性器来形容了。`,
          );
          await era.printAndWait(
            `「嗯呜呀哈~！啊嗯~…哈呀啊啊啊~！更加用力地侵犯吧~！侵犯到屁股肛穴要融化掉位置吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「早知道会那么厉害的话…啊啊~…如果更早一些被侵犯就好了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}听到${target_name}这样的喃喃自语，更加用力地侵犯了${target_name}的屁股………`,
          );
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「已经…小穴已经怎么样都可以了！只要肛穴被侵犯就好了噢噢噢~${heart(1)}」`,
            );
          }
        }
        // CFLAG:327  = 9（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) > 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊~…！侵犯、侵犯我的屁股吧~…啊啊~${heart(1)} 哈啊~…更加用力地…做吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛穴非常容易就将阴茎给吞进去了。将阴茎全部塞进去后，${target_name}露出一脸恍惚的表情。`,
          );
          await era.printAndWait(
            `「啊啊~${heart(1)} 啊啊~…好棒啊~…好棒~…这个最喜欢了~${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「啊啊~…已、已经…明明想要用小穴来做的来着…总是用屁股来做什么的~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `抓住了${target_name}的双腿、${player_name}开始专注地侵犯着她被开发过的肛穴。`,
          );
          await era.printAndWait(
            `「啊啊~…屁股被侵犯什么的好棒啊~…好有感觉啊~${heart(1)} 更加用力做吧~${heart(1)} 做吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呜啊~…啊~…啊啊啊~！ 屁股好棒啊~…我已经…啊啊~…又要…来了…又要来了噢噢~${heart(1)}」`,
          );
        }
        // CFLAG:327  = 8（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呜~…屁股被侵犯什么的…好棒啊~…啊呜…呜呜~…！」`,
        );
        await era.printAndWait(
          `${target_name}的肛穴好像开发不足的样子、发出了好像很痛苦的娇喘声………`,
        );
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊~…没错…我的屁股是淫乱的肛穴来的…被你侵犯就像要融化掉一样非常有感觉来的~~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的屁股完全被开发了、她完全融化在了屁股带来的快感里了。`,
          );
          await era.printAndWait(
            `「我的屁股是为了插进大鸡巴而存在的性器来的…所以…请更加用力地侵犯我的肛穴吧~${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:85`) == 1 &&
            era.get(`talent:${target}:0`) == 1
          ) {
            await era.printAndWait(
              `「啊啊~！已经~…小穴一直是处女状态也没关系了！只要肛穴被侵犯就已经满了呜噢噢~~~${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈呀啊~…呀~…哈呀哈嗯呜~…啊啊啊啊~${heart(1)} 我…我…已…已经不行…不行了~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全沉溺在了肛交的快感里了。将双腿大大张开，每当被阴茎抽插后都会发出娇喘声。`,
          );
          await era.printAndWait(
            `「呀~…哈呀~…！啊啊啊~${heart(1)} 肛穴被侵犯好棒~${heart(1)} …最喜欢了噢噢噢~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}连双腿被牢牢抓住的羞耻和疼痛感都无法感受到的程度地沉溺在快感中。`,
          );
          await era.printAndWait(
            `「啊啊啊~…更加地~${heart(1)} …更加地~${heart(1)} …我…实在太舒服了啊啊嗯~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呀啊~…我、我…的肛穴要去了…要去了啊呜~…啊啊啊~！淫乱的${target_name}要因为肛穴而去了呜~~${heart(1)}」`,
          );
        }
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人的那个…进来了啊~…啊啊~…我的屁股…居然那么有感觉什么的…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的屁股十分容易就将阴茎给吞进去了。每当缓慢地抽插的时候${target_name}都会忍不住发出了充满快感的娇喘声。`,
          );
          await era.printAndWait(
            `「啊嗯~…嗯~…嗯哼~…好厉害…这个…啊啊啊~…我的屁股居然…那么有感觉什么的啊啊${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呐啊~…差不多…请将我的处女…也夺走吧~…这样下去的话…要变成不是屁股就不行的体质了呜~~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊~…啊~…啊啊啊~！怎么会…嗯~…屁股居然那么有感觉…我…好像变成了一个变态了…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门每当想要拔出阴茎的时候都会收紧括约肌紧紧地抓住阴茎。这个动作就是屁股完全被开发了的证明。`,
          );
          await era.printAndWait(
            `「哈啊~…嗯~…嗯嗯~！啊啊啊~！好热~…屁股好热啊啊~…啊啊嗯~${heart(1)}」`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊~…请、请再稍微…温柔一点…啊~…嗯嗯~！」`);
        await era.printAndWait(
          `${target_name}的肛门开发不足的样子、强行将整根都塞进去后她发出了好像很痛苦的声音………`,
        );
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…不要~…不要啊…屁股居然…有感觉什么的…呀~…呀哈啊~…！」`,
        );
        await era.printAndWait(
          `${target_name}被开发过的屁股十分容易就将阴茎吞进去了………`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不要啊…那里才不是塞进去的…啊~…啊唔呜呜~！」`);
        await era.printAndWait(
          `${target_name}的肛门好像开发度还不够的样子、${player_name}强行将阴茎塞进去侵犯了她………`,
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
            `「啊啊~…好棒~…就像野兽一样的…被侵犯地、我~${heart(1)} …好棒啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的屁股只是轻轻地被抽插而已，${target_name}也非常有感觉的样子………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…屁股被侵犯了…啊~…啊呜~…啊啊~…啊啊~…！」`,
          );
          await era.printAndWait(
            `${target_name}的屁股开发不足的样子、她发出了好像十分痛苦的声音………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊~！明明只是…被从后面侵犯屁股什么地…居然有感觉了哈啊~~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为自己被开发过的肛门被从后面激烈地抽插而发出了好像要融化掉的娇喘声………`,
          );
        } else {
          await era.printAndWait(
            `「怎么能~…啊~…好难受…好疼来的…请更加温柔一点………！」`,
          );
          await era.printAndWait(
            `${target_name}的屁股开发不足的样子、她下意识地发出了抗议的声音………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊~…不要~…不要~…怎么能…嗯~…啊啊~…唔…啊哈啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}慢慢地开始侵犯${target_name}被完全开发过的屁股………`,
          );
        } else {
          await era.printAndWait(
            `「不要~…不要啊！ 这样强行地…啊啊~！呀哈啊啊！」`,
          );
          await era.printAndWait(
            `${player_name}用阴茎强行从后面塞进了${target_name}没有被开发过的肛门。如同强奸一样的感觉让${player_name}兴奋地颤抖了起来………`,
          );
        }
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.背后位肛交 <= 8 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「好棒~…好棒啊~${heart(1)} 最喜欢被侵犯肛穴了~…啊啊~${heart(1)} 啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `用阴茎往${target_name}外翻的肛门插了进去、用腰不断地撞击着那收的紧紧的屁股。`,
          );
          await era.printAndWait(
            `被成人肉飞机杯的${target_name}只能感受到肛门带来的快感。`,
          );
          await era.printAndWait(
            `「被从后面侵犯的话…太舒服了要去了啊啊~…啊啊啊~${heart(1)}」`,
          );
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「啊啊啊~！已经…已经只能考虑肛穴SEX的事情了啊哈嗯啊啊！」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `往${target_name}的肛门将阴茎塞进后小幅度地晃动起腰部、只是这样而已${target_name}的大脑就好像要融化掉一样。`,
          );
          await era.printAndWait(
            `「啊啊~…啊哈啊啊~${heart(1)} 我的肛穴…嗯~…在扩大着呜…啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「我…啊啊~…已、已经…要去了啊~…啊啊啊~…请更加用力地侵犯我吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…被捅穿了啊…我的肛穴被你的大鸡巴给贯穿了啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门十分容易地连阴茎根部都吞了进去、给予着无上极致的快感。`,
          );
          await era.printAndWait(
            `「融化掉了…要融化掉了呜呜…${heart(1)} 啊啊~${heart(1)} 来了~…肛穴高潮要来了啊啊~…${heart(1)}」`,
          );
        }
        // CFLAG:328  = 9（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊~…好棒…就像野兽一样…被侵犯着呢~${heart(1)} …啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被从后面插进了肛门、带来的快感让她流着口水发出了娇喘。`,
          );
          await era.printAndWait(
            `「啊啊~…肛门翻过来了~~${heart(1)} 更加，更加地用力侵犯我吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊~${heart(1)} 被从后面侵犯肛门的话…会感觉到…这就是我完全向你屈服的证明呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一脸融化的表情被侵犯着肛门。就如同她所说的那样，从背后被侵犯肛门的这个姿态，只能被看成一只完全屈服的雌性。`,
          );
          await era.printAndWait(
            `「啊~…啊啊~~${heart(1)} 更加激烈地做吧~！将我贯穿吧~！让我只能感受到快感吧~${heart(1)}」`,
          );
        }
        // CFLAG:328  = 8（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯~！啊啊啊~…啊啊~…嗯唔~…好难受~…嗯~！」`);
        await era.printAndWait(
          `${target_name}的屁股开发不足的样子、她发出了好像十分痛苦的声音………`,
        );
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「好棒~…好棒啊~${heart(1)} 最喜欢被侵犯肛穴了~…啊啊~${heart(1)} 啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `用阴茎往${target_name}外翻的肛门插了进去、用腰不断地撞击着那收的紧紧的屁股。`,
          );
          await era.printAndWait(
            `被成人肉飞机杯的${target_name}只能感受到肛门带来的快感。`,
          );
          await era.printAndWait(
            `「被从后面侵犯的话…太舒服了要去了啊啊~…啊啊啊~${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:85`) == 1 &&
            era.get(`talent:${target}:0`) == 1
          ) {
            await era.printAndWait(
              `「啊啊啊~！已经…已经只能考虑肛穴SEX的事情了啊哈嗯啊啊～！」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `往${target_name}的肛门将阴茎塞进后小幅度地晃动起腰部、只是这样而已${target_name}的大脑就好像要融化掉一样。`,
          );
          await era.printAndWait(
            `「啊啊~…啊哈啊啊~${heart(1)} 我的肛穴…嗯~…在扩大着呜…啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「我…啊啊~…已、已经…要去了啊~…啊啊啊~…请更加用力地侵犯我吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊~…从后面…好粗地进来了~${heart(1)} 啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被开发过的肛门十分容易地连阴茎根部都吞了进去、给予着无上极致的快感。`,
          );
          await era.printAndWait(
            `「啊啊~！更加用力地…侵犯我吧…将我的肛门干到融化掉，将我弄坏掉吧~${heart(1)}」`,
          );
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「这个~…好棒~…好棒啊~…啊啊~${heart(1)} 屁股…被侵犯者…嗯~${heart(1)} 啊~啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `用坚硬阴茎对准${target_name}柔软的肛门入口、一口气直接连根部都塞了进去。`,
          );
          await era.printAndWait(
            `「啊啊~…好热啊~…阴茎…进到里面来了啊啊~…啊啊~…我、我要…嗯~…嗯啊…啊啊啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊~！明明…从后面侵犯屁股来的…却那么有感觉什么的噢哈啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为被开发了的肛穴被从后面激烈地侵犯而发出了荡漾的娇喘声。`,
          );
          await era.printAndWait(
            `「更加…更加激烈地做吧~…啊啊啊啊~…好有感觉呜哈啊~…魔王大人的大鸡巴好有感觉啊啊~${heart(1)}」`,
          );
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「怎么能…啊~…好难受…好难受啊…请更加温柔一点………！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门开发不足的样子、她忍耐着凌辱而从嘴边漏出了痛苦的娇喘。`,
        );
        await era.printAndWait(
          `「啊啊~…嗯~…不…不行的啊…这样的…噢…啊…啊啊~！」`,
        );
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…不要~...不要啊~…怎么会~…嗯~…啊啊~…唔~…啊哈啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}被开发过的肛门被仔细地侵犯着。她的肛门因为快感而忍不住一抽一抽地收紧的时候就会加快抽插地速度，每当这时候${target_name}发出悲鸣一样的娇喘声。`,
        );
        await era.printAndWait(
          `「嗯~！…嗯~…啊哈~…啊啊~…哈啊哈啊~…啊啊~！原谅我吧~！」`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不要…不要啊~！ 这样强硬地…啊啊~！呀哈啊啊！」`,
        );
        await era.printAndWait(
          `${player_name}用阴茎强行从后面塞进了${target_name}没有被开发过的肛门。如同强奸一样的感觉让${player_name}兴奋地颤抖了起来………`,
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
            `「啊啊~…好棒啊啊~…用我的肛门变得更加舒服起来吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱着后自己晃动起了、品味着被开发过的肛门带来的快感………`,
          );
        } else {
          await era.printAndWait(
            `「呜唔啊~...拜托了…我会让你舒服起来了的啦…所以…请更加…温柔一点吧…啊啊~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门开发不足的样子、听到${target_name}恳求的话语便想要恶作剧一下地轻轻地左右摇晃着腰部、享受着${target_name}的悲鸣………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊~哈啊啊~…更多！更用力地做吧…${heart(1)} 屁股…好有感…觉啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `听着${target_name}在耳边轻轻地喘息声、慢慢地摇晃腰部后，就发出了更大的娇喘声………`,
          );
        } else {
          await era.printAndWait(
            `「那个~、能不能稍微再、温柔一点吗…？ 啊嗯~…因为被魔王大人抱住却只能感到痛苦什么的不要啦…」`,
          );
          await era.printAndWait(
            `${target_name}的肛门开发不足的样子、听到${target_name}的话后决定慢慢地做到她习惯为止………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊~…这样…屁股被侵犯地同时…还不得不看着的脸什么的~…啊~…啊呜~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门被完美的开发过了、往${target_name}的屁股阴茎塞进去后她便发出了充满快感的娇喘声………`,
          );
        } else {
          await era.printAndWait(
            `「呀~…呀啊啊啊…啊啊啊~…连根部都…进来了…呜~…唔~…啊呜呜~！」`,
          );
          await era.printAndWait(
            `往${target_name}没有被开发过的肛门将整根阴茎都塞进去后。${target_name}理所当然地发出了非常痛苦的悲鸣………`,
          );
        }
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.对面座位肛交 <= 8 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊~…已、已经…不行…不行了呀~…肛门被塞进了大鸡巴…变成了淫乱的肛穴的话…会不行的…我会变成笨蛋的~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊哈~…来、来了…脑袋里面…融化的感觉来了噢噢~…${heart(1)} 拜、拜托了…就这样…给我最后一下吧…让我变得乱七八糟了吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经到了极限的样子了、应不应该直接在${target_name}的肛门里射精给她最后一击呢………`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈~…哈啊~…啊啊~…喜欢~…好喜欢~…肛穴SEX最喜欢了~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}敏感的屁股因为侵犯而不断抽动着。因为快感而在双手被抓住的情况下身体仰反着发出了娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~！啊~…啊啊啊~${heart(1)} 来了~…要来了呜~…厉害的要来了~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…不行就这样分开~…${heart(1)} 想要…一直就这样用肛穴连在一起…拜托了~${heart(1)}」`,
          );
          await era.printAndWait(
            `被抱着的${target_name}完全不想离开、自己晃动起了要不贪图着快感。`,
          );
          await era.printAndWait(
            `「嗯~…！啊啊~~${heart(1)} 对不起~…完全忍不住了噢噢~…${heart(1)}」`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊~${heart(1)} 喜欢…好喜欢~${heart(1)} 肛穴SEX最棒了啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}晃着有着就像心型的漂亮大白屁股如同一条母狗一样追求着快感。`,
          );
          await era.printAndWait(
            `「哈~哈啊~${heart(1)}…我的肛门里面有魔王大人的精液哎~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…好爽啊~…用我的肛门变得更加舒服起来吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱住后自己摇晃起了腰、享受着被开发过的肛穴带来的快感。`,
          );
          await era.printAndWait(
            `「嗯哼哼~…总觉得只有我…在舒服着…总觉得有点不对呢…啊啊啊~${heart(1)}」`,
          );
        }
        // CFLAG:329  = 8（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜哈啊…会变得…更加有感觉的啦…所以…拜托了…请再温柔一点…啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}的肛穴好像开发不足的样子、听到${target_name}恳求的话语便想要恶作剧一下地轻轻地左右摇晃着腰部、享受着${target_name}的悲鸣………`,
        );
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊~…已、已经…不行…不行了呀~…肛门被塞进了大鸡巴…变成了淫乱的肛穴的话…会不行的…我会变成笨蛋的~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊哈~…来、来了…脑袋里面…融化的感觉来了噢噢~…${heart(1)} 拜、拜托了…就这样…给我最后一下吧…让我变得乱七八糟了吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经到了极限的样子了、应不应该直接在${target_name}的肛门里射精给她最后一击呢………`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈~…哈啊~…啊啊~…喜欢~…好喜欢~…肛穴SEX最喜欢了~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}敏感的屁股因为侵犯而不断抽动着。因为快感而在双手被抓住的情况下身体仰反着发出了娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~！啊~…啊啊啊~${heart(1)} 来了~…要来了呜~…厉害的要来了~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…不行就这样分开~…${heart(1)} 想要…一直就这样用肛穴连在一起…拜托了~${heart(1)}」`,
          );
          await era.printAndWait(
            `被抱着的${target_name}完全不想离开、自己晃动起了要不贪图着快感。`,
          );
          await era.printAndWait(
            `「嗯~…！啊啊~~${heart(1)} 对不起~…完全忍不住了噢噢~…${heart(1)}」`,
          );
        }
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯~…嗯哼唔~…好棒~${heart(1)} 啊~啊啊~…嗯~…这个…好喜欢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}敏感的肛穴如同被为了给予快感一样被完全开发过了、整根阴茎都塞进后${target_name}发出了十分淫乱的娇喘声。`,
          );
          await era.printAndWait(
            `「好厉害~…这个…好棒啊~…魔王大人的~…啊啊啊~…好深~~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊~哈啊啊~…更加~！更加激烈地做吧~…${heart(1)} 屁股…好有感觉~…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `听着${target_name}在耳边轻轻地喘息声、慢慢地摇晃腰部后，就发出了更大的娇喘声……`,
          );
          await era.printAndWait(
            `「嗯~…啊啊~…嗯~…哈啊~…哈啊啊~…屁股好棒~…好棒~…好棒啊啊~${heart(1)}」`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「那个~、能不能稍微再、温柔一点吗…？ 啊嗯~…因为被魔王大人抱住却只能感到痛苦什么的不要啦…」`,
        );
        await era.printAndWait(
          `${target_name}的肛门开发不足的样子、听到${target_name}的话后决定慢慢地做到她习惯为止………`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…这样…屁股被侵犯地同时…还不得不看着的脸什么的~…啊~…啊呜~！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被完美的开发过了、往${target_name}的屁股阴茎塞进去后她便发出了充满快感的娇喘声......`,
        );
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这个…连根部都进去了根元…呜呜~！…好、好难受的啊…啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}没有被开发好的肛门将整根阴茎都塞进去后。${target_name}理所当然地发出了非常痛苦的悲鸣`,
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
            `「啊啊~…好深~…啊~…啊啊啊~${heart(1)} 好厉害~…从外面顶到了子宫里侧了~…啊~…啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从${target_name}的背后用手慢慢地抱住她那充满肌肉美的身体。接着在子宫附近的地方用手指按了一下后${target_name}就发出了喘息声………`,
          );
        } else {
          await era.printAndWait(
            `「又、又要…来了呢…但是、魔王大人想要继续动的话…也可以哦~…嗯~…啊~…啊啊~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门好像开发度还不够的样子、从后面抱住慢慢晃动着腰部后她发出了好像很幸福的声音………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯~…嗯嗯~${heart(1)} 全都…进去了…啊啊~…！我的胸部也…啊啊~…用力地揉一下吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从${target_name}的身后温柔地抱住后、慢慢地爱抚着胸部，一点点地开始晃动起了腰部………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~！再、再稍微…嗯~…温柔一点点吧~…啊啊啊~…我会努力变得有感觉起来的…嗯嗯~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门好像开发度还不够的样子、${player_name}在保持阴茎插进去的情况下对${target_name}的身体温柔地爱抚着………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呀啊~…啊~…啊啊啊~！屁股…又被…侵犯了…啊啊~…嗯~…呜唔~！」`,
          );
          await era.printAndWait(
            `${target_name}的肛门很顺利地让${player_name}的阴茎进去了、只能因为从身后的爱抚带来的快感而发出娇喘而已………`,
          );
        } else {
          await era.printAndWait(
            `「啊~…唔~…呜呜~！一整根都…呀~…好难受…好难受啊~…！」`,
          );
          await era.printAndWait(
            `往${target_name}没有被开发好的肛门将阴茎都塞进去后、从后面慢慢地将她那充满肌肉美的身体环抱住开始晃动起腰部………`,
          );
        }
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.对面座位肛交 <= 8 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊~…啊~…被扩大了…肛门又要被扩大了呜~~…要变成淫乱的肛穴了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用手撑住前面自己激烈地上下晃动着腰部。追求肛交快感的那个姿态简直就跟野兽一样。`,
          );
          await era.printAndWait(
            `「啊啊~…啊~…啊啊啊~${heart(1)} 嗯嗯~…要来了~要来了~${heart(1)}…噢~要来要来了哈嗯~${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊~…啊啊啊~…第一次肛门被侵犯地时候就有预感了呢~${heart(1)} 我的肛门…啊啊~…绝对变成性器来的啊哈嗯~~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}恍惚地喃喃自语着被${player_name}继续侵犯着肛门。${player_name}将手指放进${target_name}嘴巴里后，${target_name}便专注地舔了起来。`,
          );
          await era.printAndWait(
            `「啊唔嗯~…嗯唔~…嗯噗呜~${heart(1)} 做吧~…更加激烈地做吧…侵犯到我的脑袋变得一片空白为止吧~${heart(1)} 嗯~…嗯唔~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为快感下意识地咬了一下手指，${player_name}因为疼痛皱起了眉头………`,
          );
        } else {
          await era.printAndWait(
            `「哈~…啊啊~…大鸡巴好深啊~…${heart(1)} 啊~…又要…来了呜~…唔啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}有着漂亮形状的屁股左右摇摆着、贪心地享受着肛门带来的快感。`,
          );
          await era.printAndWait(
            `${player_name}爱抚了${target_name}的胸部后她发出了如同野兽一般的娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊啊~${heart(1)} 啊啊~${heart(1)} 呀~…呀啊啊~${heart(1)} 要去要去了呜~…要去了了啊啊啊~~~${heart(1)}」`,
          );
        }
        // CFLAG:330  = 9（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯呜~…肛门~…好舒服啊~${heart(1)}…被大鸡巴侵犯好舒服啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然从这边完全看不到，但是${target_name}肯定已经是一脸恍惚的如同笨蛋一样的表情、接着从后面突然抓住了她的乳房后就发出了好像很舒服的娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~${heart(1)} 好棒~…更加~…让我变得更加舒服吧~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊~…好深~…啊~…啊啊啊~${heart(1)} 好厉害…从子宫的外面…啊~…啊啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}从背后用手环绕过来、慢慢地将${target_name}那充满肌肉美的身体来回抱住。接着用手指按住子宫附近的地方后${target_name}的身体就一抽一抽地颤抖着。`,
          );
          await era.printAndWait(
            `「啊~…啊啊~…那里…那里啊嗯~…捅过去吧~！大鸡巴通过去吧~…啊啊~${heart(1)} 啊啊~${heart(1)} 哈啊啊~${heart(1)}」`,
          );
        }
        // CFLAG:330  = 8（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「又、又要…来了呢…但是、魔王大人想要继续动的话…也可以哦~…嗯~…啊~…啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门好像开发度还不够的样子、从后面抱住慢慢晃动着腰部后她发出了好像很幸福的声音………`,
        );
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊~…啊~…被扩大了…肛门又要被扩大了呜~~…要变成淫乱的肛穴了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用手撑住前面自己激烈地上下晃动着腰部。追求肛交快感的那个姿态简直就跟野兽一样。`,
          );
          await era.printAndWait(
            `「啊啊~…啊~…啊啊啊~${heart(1)} 嗯嗯~…要来了~要来了~${heart(1)}…噢~要来要来了哈嗯~${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊~…啊啊啊~…第一次肛门被侵犯地时候就有预感了呢~${heart(1)} 我的肛门…啊啊~…绝对变成性器来的啊哈嗯~~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}恍惚地喃喃自语着被${player_name}继续侵犯着肛门。${player_name}将手指放进${target_name}嘴巴里后，${target_name}便专注地舔了起来。`,
          );
          await era.printAndWait(
            `「啊唔嗯~…嗯唔~…嗯噗呜~${heart(1)} 做吧~…更加激烈地做吧…侵犯到我的脑袋变得一片空白为止吧~${heart(1)} 嗯~…嗯唔~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}因为快感下意识地咬了一下手指，${player_name}因为疼痛皱起了眉头………`,
          );
        } else {
          await era.printAndWait(
            `「哈~…啊啊~…大鸡巴好深啊~…${heart(1)} 啊~…又要…来了呜~…唔啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}有着漂亮形状的屁股左右摇摆着、贪心地享受着肛门带来的快感。`,
          );
          await era.printAndWait(
            `${player_name}爱抚了${target_name}的胸部后她发出了如同野兽一般的娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊啊~${heart(1)} 啊啊~${heart(1)} 呀~…呀啊啊~${heart(1)} 要去要去了呜~…要去了了啊啊啊~~~${heart(1)}」`,
          );
        }
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊~…啊~…嗯嗯~…！这个…好棒~…哈啊啊~…魔王大人的手…啊嗯~…好热啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}爱抚着${target_name}那种满肌肉美的身体、温柔地抓着她的胸部。慢慢地晃动着腰部疼爱着她的屁股。`,
          );
          await era.printAndWait(
            `「啊啊~…嗯~…啊啊~${heart(1)} 我、我…被这样做了的话…啊~…啊啊啊~…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯~…嗯嗯~${heart(1)} 全都…进去了…啊啊~…！我的胸部也…啊啊~…用力地揉一下吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}从${target_name}的身后温柔地抱住后、慢慢地爱抚着胸部，一点点地开始晃动起了腰部………`,
          );
          await era.printAndWait(
            `「哈~…啊啊~…嗯~…嗯呜~…呜啊…啊啊~能感觉到……魔王大人的在肚子里一抽一抽地…啊嗯~${heart(1)}」`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…啊啊~…再、再稍微…嗯~…温柔一点点吧~…啊啊啊~…我会努力变得有感觉起来的…嗯嗯~！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门好像开发度还不够的样子、${player_name}在保持阴茎插进去的情况下对${target_name}的身体温柔地爱抚着……`,
        );
        await era.printAndWait(
          `慢慢地抚摸着那充满肌肉的美的身体、轻轻地爱抚着她的胸部。只是这样${target_name}就舒服了一点的样子………`,
        );
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊啊~…啊~…啊啊啊~！屁股~…又被…侵犯了…啊啊~…嗯~…呜唔~！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门很顺利地让${player_name}的阴茎进去了、只能因为从身后的爱抚带来的快感而发出娇喘而已………`,
        );
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊~…唔…呜呜~！一整根都…呀~…好难受~…好难受啊~…！」`,
        );
        await era.printAndWait(
          `${target_name}没有被开发好的肛门将阴茎都塞进去后、从后面慢慢地将她那充满肌肉美的身体环抱住开始晃动起腰部………`,
        );
        await era.printAndWait(
          `用手指沿着腹肌抚摸下去后${target_name}细微颤抖地喘息着………`,
        );
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }

      if (
        era.get(`tequip:${target}:57`) &&
        era.get(`abl:${target}:17`) >= 1 &&
        era.get(`talent:${target}:77`)
      ) {
        await era.printAndWait(
          `「啊啊啊~…我的肛穴里~...大鸡巴全部进去了呜~…啊啊啊~…好厉害好下流~…啊嗯~啊啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}看着印在镜子上自己的痴态兴奋起来了………`,
        );
      } else if (
        era.get(`tequip:${target}:57`) &&
        era.get(`abl:${target}:17`) >= 1 &&
        era.get(`talent:${target}:85`)
      ) {
        await era.printAndWait(
          `「屁股里…你的啊…哈啊~…啊啊~${heart(1)} 明明非常羞耻来着…要去了哈呜~~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}看着印在镜子上自己的痴态兴奋起来了………`,
        );
      } else if (
        era.get(`tequip:${target}:57`) &&
        era.get(`abl:${target}:17`) >= 1 &&
        era.get(`talent:${target}:76`)
      ) {
        await era.printAndWait(
          `「屁股里全部进去了…呀~呀哈啊~${heart(1)} 大鸡巴一进一出地…肛门要翻起来了~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}看着印在镜子上自己的痴态兴奋起来了………`,
        );
      } else if (era.get(`tequip:${target}:57`)) {
        await era.printAndWait(
          `${target_name}看到自己双腿被张开屁股被毫不留情地侵犯着的痴态、流着眼泪移开了视线………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「这个好热啊~…哈啊啊~…好想要它进到我的里面去啊~…所以我会好好地让它变硬起来的…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊啊~…用我的手变舒服起来吧${heart(1)}」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「这、这样就可以了吗…啊啊~…不要这样一抽一抽地啦！」`,
        );
      } else {
        await era.printAndWait(
          `「不要开玩笑了…只要我认真起来的话这样的东西…呜~☆～………」`,
        );
      }
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
            `「嗯哼哼~、呐啊想射精了对吧？想直接在我的手上射精了对吧~？可以的哦…但是作为代价…要在我身体里射进跟现在出来一样分量的精液噢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}眯着眼睛，下流地舔着嘴唇，让唾液从嘴里滴到阴茎上用十分淫乱的手法撸了起来。`,
          );
          await era.printAndWait(
            `「哈啊…哈啊…很舒服对吧~？就算不用看魔王大人的脸也知道的噢${heart(1)} …因为都不知道品味过多少次魔王大人的大鸡巴了呢~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「啊啊啊啊~…想要射出来了吗？想要射出来了对吧~？要射出来的话…就请在…我的…嘴巴里…射出来吧~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「居然变得那么精神起来了~…啊啊…大鸡巴~…大鸡巴~…哈啊…哈啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全阴茎中毒的样子、从嘴边不断地流下口水，一副现在就想舔个便的淫乱表情。`,
          );
          await era.printAndWait(
            `「啊啊~…呐、呐啊…就这样射出来吗？ 要全部射到我身上吗…？啊啊~…」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「要射出来的话…就在我的嘴里射出来吧~！ 精液…好想要精液啊…想要到忍不住了啊~${heart(1)}」`,
            );
          }
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这个好热啊~…哈啊啊~…好想要它进到我的里面去啊~…所以我会好好地让它变硬起来的…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}呼吸节奏变得凌乱、用手不断上下地撸着${player_name}的阴茎……`,
        );
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(
            `「啊啊~…真是的~！这里~…在我的嘴里射出来吧~…啊啊~好想要精液啊~${heart(1)}」`,
          );
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「用我的手变的舒服起来吧~${heart(1)} 魔王大人~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}手上下运动的节奏慢慢变快起来、如同催促射精一样用手指刺激起了龟头。`,
          );
          await era.printAndWait(
            `「嗯哼哼~…要在我的手中去了吗？ 可以噢~…全部…射出来吧…啊啊~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「如果要射出来的话就这样！…直接射到我脸上吧~${heart(1)} 想要…喝精液呢~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊…哈啊…你的这个…好厉害啊…啊啊…在手中一跳一跳地…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用阴茎前端出来的前列腺液将整根阴茎润滑了、一脸慈祥的表情撸着阴茎。`,
          );
          await era.printAndWait(
            `「嗯哼哼…很舒服吗~？ 想射出浓浓的精液了？ 嗯哼哼…在我的手里全部射出来吧~…${heart(1)}」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `${target_name}非常想要精液的样子，一脸下流地不像样的表情无意识地伸着自己的舌头………`,
            );
          }
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…好热啊~…这个好热的东西让我要坏掉了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `撸的速度慢慢地变快起来、也不知道${target_name}有没有注意到，自己的炽热的吐息正对着阴茎吹着。`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「总觉得…弄明白会舒服的地方在哪了…嗯哼哼~♪」`);
        await era.printAndWait(`${target_name}手的动作慢慢习惯了起来………`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「赶紧给我射出来啦…啊啊~…嗯？好好地握住什么的…像、像这样吗…？」`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯唔~…嗯哼哼~…嗯啾~…啾噗~…嗯~…嗯噗…哈啊啊…大鸡巴…我开动了~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}上目遣地看着${player_name}的情况下开始了口腔侍奉………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「你的…呜、呜嗯~…在嘴里全部变得舒服起来吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「呸咯~...嗯啾啾噗~…呸咯~…哈啊…嗯~…嗯嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}沉浸在了初次舔舐阴茎的状态下了………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊…哈啊…嗯~…阿唔呜~…嗯~…啾噗~…呸咯…呸咯嗯~…哈啊~…哈啊…想要做得更多吗？啊嗯~…嗯~…嗯嗯~！」`,
        );
        await era.printAndWait(
          `${target_name}盯着${player_name}看的情况下开始了第一次的口腔侍奉、遵循着${player_name}的命令舔了起来，虽然说还有点笨拙，但是还是好好地将快感传达过来了………`,
        );
      } else {
        await era.printAndWait(
          `「啊啊~…嗯、嗯~…啊啊…哈唔…~…嗯唔~…嗯啊…哈啊哈啊…这、这样就可以了吧？原谅我了吧………那么臭的…」`,
        );
        await era.printAndWait(
          `虽然${target_name}最终只是稍微将${player_name}的阴茎含了一下的程度而已、但是对于这个充满反抗心的奴隶来说算是干得不错了吧………`,
        );
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嗯唔~…呜噗呜~…嗯啾~…啾噗~…嗯~…嗯噗~…哈啊啊…大鸡巴…我开动了~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}上目遣地看着${player_name}的情况下开始了口腔侍奉。`,
          );
          await era.printAndWait(
            `她的眼睛充满了淫欲、她的嘴巴就像性器一样将一整根阴茎全部吞进去了………`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「喜欢到想要…就这样咬断吃掉的程度噢~${heart(1)}」`,
          );
          await era.printAndWait(
            `虽然在一瞬间说出了令人软掉的话、然而${target_name}的嘴巴非常注意地深深地含住阴茎、让牙齿绝对不会碰到地含着。`,
          );
          await era.printAndWait(
            `「嗯噗~…嗯啾噜~…嗯噗~…嗯噗~…嗯噗呜呜呜~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「噗哈啊啊……射精了的话大鸡巴会不会飞进我的胃里啊？」`,
          );
        } else {
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「如果想要射精了的话、绝对要在我的嘴巴里射出来噢…不在嘴巴里射出来的话就绝对不原谅魔王大人了噢~${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「嗯~…好吃~…大鸡巴好好吃…呸咯~…啊啊啊…这个臭臭的真是让人欲罢不能啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}不断地来回含到阴茎根部、不断地亲吻着龟头。`,
          );
          await era.printAndWait(
            `「啾~…啾唔~…啊哈啊…我最喜欢的大鸡巴~…要变得舒服起来噢…${heart(1)} 啾~${heart(1)}」`,
          );
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「你的…呜、呜嗯~…在嘴巴里全部变得舒服起来吧~…${heart(1)}」`,
          );
          await era.printAndWait(
            `「呸咯~…嗯啾啾噗~…呸咯~…哈啊…嗯~…嗯嗯~${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}沉浸在了舔舐阴茎的状态下了………`);
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「噗哈…射精的时候…不用客气地全部在我的嘴巴里面射出来吧~…${heart(1)}」`,
            );
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯~…嗯嗯~…啊啊…嗯噗~…嗯~…嗯哈啊~…${heart(1)} 啊啊啊~…这个…好喜欢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的舌头还有嘴唇和龟头之间架着一座由唾液连成的桥、好像看着让人怜爱的恋人的脸一样看着阴茎、再度舔了起来。`,
          );
          await era.printAndWait(
            `「哈呜…嗯~…嗯啾~…啾噗~…呸咯~…嗯~嗯嗯~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}一边看着${player_name}的反应一边舔着龟头的里筋附近的地方，试图想要控制${player_name}的快感的样子。`,
          );
          await era.printAndWait(
            `「怎么样呀~…魔王大人~…我的嘴巴~…嗯啾~…是不是很舒服呀…？嗯~嗯哼哼~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}舔舐的同时好像有感觉了起来不断地摩擦着自己的大腿、慢慢地呼吸节奏变凌乱了起来………`,
          );
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…嗯~…啊唔~…嗯~…啾噗~…呸咯…呸咯~…哈啊…哈啊…是不是还得舔得更加厉害一点呢~？啊嗯~…嗯~…嗯噗~！」`,
        );
        await era.printAndWait(
          `${target_name}好像明白了侍奉的方法了、用舌头缠绕住阴茎慢慢地送进嘴巴里。然而时不时地感到她那锐利的视线正盯着这边………`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「嗯嗯~…这么脏的…放进嘴里什么的…啊啊~…嗯~…我明白了啦~…嗯~呸咯~…嗯~嗯噗~…嗯噗~…咳咳~咳咳~」`,
        );
        await era.printAndWait(
          `${target_name}虽然技术不行、但是还是遵循着命令忍着呕吐的欲望继续着口腔侍奉………`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (kojo.乳交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈啊哈…我的乳交是不是很舒服呀~？嗯哼哼~、我会让你更加舒服起来的~…嗯啊…呸咯噢~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}将唾液流到在乳房之间的阴茎上充当润滑油、继续着侍奉………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯~…怎、怎么样呀…我的胸、乳交怎么样…嗯~…啊啊~…那里…好热啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}十分认真地用胸部侍奉着………`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「这样做的话会舒服吗………？ 啊嗯~…刚刚通过你的反应明白了呢…啊啊…嗯~」`,
        );
        await era.printAndWait(
          `${target_name}安静地用乳房夹着阴茎继续侍奉着………`,
        );
      } else {
        await era.printAndWait(
          `「唔~…居然要我用胸部夹着这样的东西…居然还得要让你变得舒服什么的真是屈辱啊…！」`,
        );
        await era.printAndWait(
          `虽然感到十分的不舒服，但是${target_name}还是用胸部侍奉了起来………`,
        );
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「大鸡巴…好热…啊~…啊啊啊~…我也会认真地用胸部侍奉的所以请变得舒服起来噢？」`,
          );
          await era.printAndWait(
            `${target_name}十分可爱的眨了一下眼睛后一边吐着炽热的吐息一边用胸部侍奉了起来。`,
          );
          if (
            era.get(`talent:${target}:110`) == 1 ||
            era.get(`talent:${target}:114`) == 1 ||
            era.get(`talent:${target}:119`) == 1
          ) {
            await era.printAndWait(
              `「啊哈啊~…就这样在胸部之间射出来吧…可能胸部就这样怀孕了呢…嗯哼哼~${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊哈…我的乳交是不是很舒服呀~？嗯哼哼~、我会让你更加舒服起来的~…嗯啊…呸咯噢~…${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) == 1 ||
            era.get(`talent:${target}:114`) == 1 ||
            era.get(`talent:${target}:119`) == 1
          ) {
            await era.printAndWait(
              `「嗯哼哼…用这个胸部的话…就更需要唾液来润滑了对吧~…嗯哈啊…${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}将唾液流到在乳房之间的阴茎上充当润滑油、继续着侍奉………`,
          );
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈…我的乳交是不是很舒服呀~？嗯哼哼~、我会让你更加舒服起来的~…嗯啊…呸咯噢~…${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `「嗯哼哼…用这个胸部的话…就更需要唾液来润滑了对吧~…嗯哈啊…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}将唾液流到在乳房之间的阴茎上充当润滑油、继续着侍奉………`,
        );
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人~…用我的侍奉…变得更加舒服起来吧${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) == 1 ||
            era.get(`talent:${target}:114`) == 1 ||
            era.get(`talent:${target}:119`) == 1
          ) {
            await era.printAndWait(
              `「啊啊~…哈啊啊…嗯~…不行~…你动起来的话…我会用胸部让你全部变舒服起来的啦${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}舔着嘴唇、十分认真地用乳房侍奉着………`,
          );
        } else {
          await era.printAndWait(
            `「嗯~…怎、怎么样呀…我的胸、乳交怎么样…嗯~…啊啊~…那里…好热啊${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) == 1 ||
            era.get(`talent:${target}:114`) == 1 ||
            era.get(`talent:${target}:119`) == 1
          ) {
            await era.printAndWait(
              `「嗯哼哼~…我大大的胸部…将你的抱住了呢…啊啊~…好美妙呀~…${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}十分认真地用乳房侍奉着、她的脸因为侍奉的快乐一点一点地变淫荡起来了………`,
          );
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…你的那个好像在说着…现在好舒服呢…唔~…哈啊…哈啊…嗯~！」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `「嗯~…用我大大的胸部来做的话…是不是…更加舒服起来了呀~…？」`,
          );
        }
        await era.printAndWait(
          `${target_name}好像稍微抓住了乳交的技巧的样子、对用胸部的侍奉变得积极起来了………`,
        );
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊…哈啊…居然因为这样的事情而舒服起来什么的…真是个变态呢…唔~…呜~☆～……！」`,
        );
        await era.printAndWait(
          `虽然感到十分的不舒服，但是${target_name}还是用胸部侍奉了起来………`,
        );
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (kojo.股间性交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯~…真是坏心眼呢…居然下这样的命令…啊啊~…明明知道我多么想要大鸡巴来的！」`,
        );
        await era.printAndWait(
          `${target_name}虽然这样说着但还是十分热情地上下晃动着臀部侍奉着………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呐、呐啊…只要这样侍奉了的话…就会给我充分的奖励对吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}才刚刚开始股间侍奉而已、真是急性子呢………`,
        );
      } else {
        await era.printAndWait(`「哼、哼嗯~…这样的…什么的…唔~…呜呜~…！」`);
        await era.printAndWait(
          `${target_name}一副不情愿的样子开始了股间侍奉………`,
        );
      }
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
          `「魔王大人什么的…真的好讨厌啊~…笨蛋~笨蛋~…啊~…嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}虽然嘴上在骂着、但是股间性交的侍奉根本没有停下来。`,
        );
        await era.printAndWait(
          `「明明知道我非常非常想要你的大鸡巴来的…然而去让我做这样的事情…啊啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}两腿张得开开的、如同为了让你看见一样用蜜穴摩擦着阴茎。`,
        );
        await era.printAndWait(
          `腰部摇晃的方式慢慢变激烈了起来、如果一不小心的话阴茎就要插进去的样子。`,
        );
        await era.printAndWait(
          `「看~看吧~…将我侵犯了嘛~${heart(1)} …就是为了侵犯我…才做这样的事情对吧~！」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯~…真是坏心眼呢…居然下这样的命令…啊啊~…明明知道我多么想要大鸡巴来的！」`,
        );
        await era.printAndWait(
          `${target_name}虽然这样说着但还是十分热情地上下晃动着臀部侍奉着………`,
        );
        await era.printAndWait(
          `然而好像已经忍不住了的样子将双腿张开、如同为了让你看见一样用开发过的蜜穴摩擦着阴茎。`,
        );
        await era.printAndWait(
          `「看吧~${heart(1)} 看吧~${heart(1)} …大鸡巴也那么难受的话…就这样…插进来也可以的哦${heart(1)}」`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊~…呐…呐啊…不要让我…一直都是处女啦…啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用大腿紧紧地夹住阴茎、十分热情地进行着股间侍奉。`,
        );
        await era.printAndWait(
          `「嗯哼哼…呐啊…我就这样一不小心让那个进去了…你会不会生气呀？」`,
        );
        await era.printAndWait(
          `「我…完全不知道能忍到什么程度啦…啊啊~${heart(1)}」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呐、呐啊…只要这样侍奉了的话…就会给我充分的奖励对吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}才刚刚开始股间侍奉而已、真是急性子呢。`,
        );
        await era.printAndWait(
          `${target_name}用大腿紧紧地夹住阴茎继续着股间侍奉。`,
        );
        await era.printAndWait(
          `「啊啊~…啊~…好热的${heart(1)}…好热的${heart(1)}…呐啊，好想要这个啊…给我嘛~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用十分炽热的视线看着${player_name}十分愉悦地继续着股间性交侍奉………`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「这样到底有什么舒服啦…是男人的话…嗯~…一般都会插进去的吧…啊啊~！」`,
        );
        await era.printAndWait(`${target_name}一边娇喘着一边继续着股间侍奉………`);
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
              `「啊啊~${heart(1)} 嗯~…呜啊~…哈啊哈啊${heart(1)} 太高兴了结果下意识地将魔王大人的全部吞下去了呢${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的蜜穴将${player_name}的阴茎一整根全部塞了进去了。也不管才刚刚失去了处女的疼痛、${target_name}慢慢地晃动起了腰部。`,
            );
            await era.printAndWait(
              `「哈啊…哈啊~…嗯~…啊啊啊~…魔王大人的魔力…在我的里面…流进来了啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `正如她所说的那样、魔王的魔力正在慢慢地填满${target_name}的身体。`,
            );
            await era.printAndWait(
              `「啊啊啊~~~${heart(1)}…这样我就是…魔王大人的大鸡巴的俘虏了…请使用我的身体…变得更加舒服起来吧~${heart(1)}」`,
            );
            await era.printAndWait(
              `「但是首先…我的淫乱小穴…特别想要精液呀~${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「进来…进来了~…嗯~…我、我会全部自己插进去的啦…不需要帮手的啦…哇…啊啊~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着破处的疼痛、将${player_name}的一整根阴茎都塞了进去。`,
            );
            await era.printAndWait(
              `「嗯哼哼…你能得到我的第一次真是太好了、啊啊…魔王大人…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的眼角流下了眼泪噗呲地一下笑起来。接着慢慢地晃动起了腰部。`,
            );
            await era.printAndWait(
              `虽然说她的动作有些不舒服但是从${target_name}的嘴边漏出来的娇喘声真是太棒了。`,
            );
            await era.printAndWait(
              `「哈啊~…哈啊~…啊~${heart(1)} 嗯哼哼~、我要好好地侍奉魔王大人呢~…嗯~${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `「啊啊~…我接下来…就要变成魔王大人的东西了…${heart(1)} 这就是那个仪式来的噢~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}下流地笑了笑、慢慢将要降了下来。当蜜穴碰到阴茎的时候可能因为紧张的原因翅膀轻轻伸展了一下。`,
            );
            await era.printAndWait(
              `「哈啊…哈啊…啊啊~…这就是…你的…嗯~…啊啊~…啊~…哈啊啊~！」`,
            );
            await era.printAndWait(
              `「啊~…没、没问题的…所以全部进来之前…请不要帮忙噢…嗯~…嗯呜~！」`,
            );
            await era.printAndWait(
              `不输给破处的疼痛、${target_name}完全将${player_name}的阴茎塞进去了。`,
            );
            await era.printAndWait(
              `因为魔王的魔力从内侧不断地流进去，${target_name}的眼睛也越来越亮。`,
            );
            await era.printAndWait(
              `「啊啊…这就是成为你的女人的事情对吧…好棒啊…啊啊~…啊啊啊~${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊~…进、进去了…全、全部…都进去了呜~！」`,
            );
            await era.printAndWait(
              `${target_name}忍受着破处的痛苦、将${player_name}的阴茎全部塞了进去。`,
            );
            await era.printAndWait(
              `「哈啊…哈啊…我的第一次的味道…怎、怎么样呀~…？」`,
            );
            await era.printAndWait(
              `还有破处的疼痛的样子腰部在一点一点地扭动着、眼里浮着眼泪的${target_name}将脸向${player_name}靠了过去轻声说道。`,
            );
            await era.printAndWait(
              `「这样的话…我…我就是你的女人了…从今以后…也请一直…嗯~…啊啊啊~…哈唔呜~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被突然从下捅了上来、身体反仰了过来发出了娇喘声………`,
            );
          }
        } else {
          await era.printAndWait(`「唔~…呜呜~…啊啊~…啊~…啊啊啊~！」`);
          await era.printAndWait(
            `${target_name}因为破处之痛无意识地叫了出来、对着那明明是自己爬上来却如此不堪的姿态${player_name}感到十分地愉悦。`,
          );
          await era.printAndWait(
            `「快拔掉、不是说了快拔掉了吗…这样你就足够满意了吧…？呀~！？不行不要捅上来啊啊~！」`,
          );
          await era.printAndWait(
            `${player_name}为了让${target_name}逃不掉而抓住了她的双手、从下慢慢地捅了上去了、享受着${target_name}哭泣的声音………`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嗯哼哼~…如果是不久之前的话…被做这样的事情的话…嗯~…绝对会紧紧地掐住的你喉咙来着………」`,
          );
          await era.printAndWait(
            `这样说着的${target_name}向${player_name}的脖子伸出了手…温柔地抚摸着下巴。`,
          );
          await era.printAndWait(
            `「不要做出这样的表情啦…我已经…离不开你了啦…啊~…啊啊啊嗯~${heart(1)}」`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「话说看一下吧~、我的小穴…居然那么地舒服呢…这是因为在吃你的大鸡巴的啊…啊啊啊~${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…在你的上面…啊~…变得淫乱起来了的话…会不会被讨厌啊…啊~…嗯嗯~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}说着像这样令人疼爱的话语、在${player_name}的上方上下晃动着腰部………`,
          );
          if (era.get(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯~…嗯哼~…哼啊…啊啊~${heart(1)} 稍微…有点感觉过头了…也没关系的吧${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊哈啊…居然这种样子地…啊~！ 不、不行啊…被这样往上捅的话…啊啊~！」`,
          );
          await era.printAndWait(
            `${target_name}双手被抓住逃不掉的状态、被从下往上捅而发出了悲鸣………`,
          );
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
            `「啊~…这里${heart(1)}…就是这里${heart(1)} 一抖一抖地~${heart(1)} 子宫口也好想要啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}噗呲地笑了一下淫乱地晃动起了腰部、接着为了享受更深的快感将阴茎塞到了蜜穴深处。`,
          );
          await era.printAndWait(
            `「啊啊啊~…骑乘位好喜欢啊${heart(1)} 魔王大人舒服的地方特别地…明白呢…哈…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `「而且…我也变得那么舒服起来了~…什么的…啊啊~${heart(1)} 好深啊啊~${heart(1)}」`,
          );
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「魔王大人~…啊~…嗯~啊啊~${heart(1)} 啊啊~…真、真的…来了…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}为了不让她逃开将${target_name}的双手抓住、不断地将腰往上捅对着她的小穴发起了攻势。`,
          );
          await era.printAndWait(
            `「啊~…啊啊啊~${heart(1)} 里，里面都被…侵犯着…啊啊~…我、已、已经…不行…啊啊~~${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呀啊啊~${heart(1)} 我是…对魔王大人的大鸡巴陷落了的无可救药的孩子来的～${heart(1)} 啊啊啊～${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊~…啊啊~好激烈啊~${heart(1)} 啊嗯~…更激烈地做吧…啊啊~啊啊~${heart(1)} 啊啊啊~~~~${heart(1)}」`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `${target_name}配合着娇喘声伸展着恶魔的翅膀。那个姿态简直就是淫魔本身啊。`,
            );
          }
          await era.printAndWait(
            `每当${target_name}被往上捅了的时候、每喘一口气的时候、${target_name}的唾液和汗水就会从上面降下来。`,
          );
          await era.printAndWait(
            `「啊啊~${heart(1)} 好！好啊～${heart(1)} 变得黏糊糊起来了…小穴变得黏糊糊起来了~${heart(1)}」`,
          );
          await era.printAndWait(
            `「已经…弄坏掉~弄坏掉~弄坏掉吧~${heart(1)} 将我的小穴用大鸡巴来弄坏掉吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊~${heart(1)} 哈啊哈啊…既然变成这样了…全部…都已我的节奏来做吧…${heart(1)}」`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `${target_name}的尾巴将${player_name}的大腿紧到疼起来的程度地缠绕住。`,
            );
          }
          await era.printAndWait(
            `「看吧~${heart(1)} 要去了哦~…啊~…嗯~…嗯哼唔~…啊啊~…啊唔~…呜~…啊哈啊~~~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}让腰摇晃起来向阴茎发起了攻势、${player_name}的射精感不断地变强了起来………`,
          );
        }
        // CFLAG:335  = 8（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…嗯~…嗯哼哼~…大鸡巴…居然那么兴奋起来了~、啊嗯~…又、又往上捅了啊呜~…啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被猛烈的腰部的动作弄得娇喘连连了………`,
        );
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(
            `「嗯呜~…嗯哼唔~…不行~…你在射精之前…啊啊~…不能动啦~…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}让腰摇晃起来向阴茎发起了攻势、然而她自身也被同样的快乐玩弄着慢慢地情绪高涨了起来。`,
          );
          await era.printAndWait(
            `「啊~…嗯~…哈啊啊~${heart(1)} 魔王大人…啊啊~${heart(1)} 啊~…啊啊啊~…啊啊啊~~~${heart(1)}」`,
          );
          await era.printAndWait(
            `「我…已、已经…啊啊~…不行了啦…啊~…啊嗯~…啊啊~${heart(1)}」`,
          );
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嗯~…好深~${heart(1)}…好深啊~${heart(1)}…啊啊~…~！」`,
          );
          await era.printAndWait(
            `${target_name}的蜜穴深处塞进了${player_name}的阴茎、只是其压迫感就让${target_name}娇喘连连。`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `接着${target_name}的尾巴将${player_name}的大腿紧到疼起来的程度地缠绕住。`,
            );
          }
          await era.printAndWait(
            `「啊~…就这样…动起来的话我…已经…啊啊~${heart(1)} 动起来吧…将我…弄到一塌糊涂地…做吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}将${target_name}的腰抓住、从下往上地捅上去，享受着她那充满快乐的娇喘声………`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊~…啊嗯~！ 嗯~…！这个…好棒啊~${heart(1)} 啊啊~…啊~啊啊~~${heart(1)}`,
          );
          if (era.get(`talent:${target}:314`) == 9) {
            await era.printAndWait(
              `${target_name}配合着娇喘声伸展着恶魔的翅膀。`,
            );
          }
          await era.printAndWait(
            `${target_name}和${player_name}如同分享快感一样双手紧握在一起，发出了充满快感的娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~~！哈啊~…嗯~…哈啊~…哈啊~…啊啊~${heart(1)}…又要…啊啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…在你的上面…啊~…变得淫乱起来了的话…会不会被讨厌啊…啊~…嗯嗯~…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}说着像这样令人疼爱的话语、在${player_name}的上方上下晃动着腰部………`,
          );
          await era.printAndWait(
            `「嗯~…嗯哼~…哼啊…啊啊~${heart(1)} 稍微…有点感觉过头了…也没关系的吧${heart(1)}」`,
          );
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊…你的好大啊啊嗯…嗯~…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}皱着眉头让阴茎插进了深处、在${player_name}的上面上下的晃动着身体………`,
        );
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嗯~…啊啊~…哈啊哈啊…不、不是的…这是因为你舒服起来的话立马就射出来我也能轻松了…才动起来的啊！」`,
          );
          await era.printAndWait(
            `${target_name}这样说着腰部的动作越来越激烈起来、变得完全停不下来了。`,
          );
          await era.printAndWait(
            `「哈啊~…嗯~…啊啊~…啊~…啊啊~！ 啊~…啊~…啊、来了…要来了~…啊~…啊啊啊~！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯~…哼~…啊啊~…不、不要目不转睛地盯着人家的脸看啊…哈啊~！？ 啊啊…捅、捅上来的话…啊啊~！」`,
          );
          await era.printAndWait(
            `对于说着嚣张话语的${target_name}的穴内深处轻轻地捅了一下、${target_name}被开发过的蜜穴只是因为这样做了就好像要融化掉一样。`,
          );
          await era.printAndWait(
            `抓住了${target_name}的腰部如同飞机被一样使用她的蜜穴上下的晃动后、只是因为这样她就发出了悲鸣一般的娇喘声后晕掉了。`,
          );
          await era.printAndWait(
            `「唔啊啊~！啊~…不要啊~！请、请原谅我了吧~！…呀啊啊啊~！…再这样下去的话…啊啊啊~！啊~啊啊~~！」`,
          );
        } else {
          await era.printAndWait(
            `「我会让你、好好地…变舒服的啦…啊~…哈呜~…所以…不要恶作剧啦~…啊啊~！」`,
          );
          await era.printAndWait(
            `${target_name}乖乖地上下晃动着腰部侍奉着。然而对于她来说这样的做法太有感觉了吧所以动作并不怎么激烈。`,
          );
          await era.printAndWait(
            `「哎~…并不…舒服吗…为什么…啊~！啊啊~！所、所以…不能动起来…呀~…这样做不行的啦啊啊~！」`,
          );
          await era.printAndWait(
            `「啊~…啊啊~…已、已经…不行不行不行~…不断地摩擦那里不行~…啊啊啊啊~！啊~！」`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔…啊啊~…嗯~…你也赶紧变舒服起来…啊啊啊！…射出来就好了嘛…啊~…唔呜呜~！」`,
        );
        await era.printAndWait(
          `${target_name}每当从下面捅上来的时候都会从嘴边漏出娇喘声………`,
        );
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「嗯呜~…呜~…哈啊哈啊…嗯~…啊啊~…拔、拔掉吧…不是说了快拔掉了吗…啊啊~…从下面…呀啊~！」`,
        );
        await era.printAndWait(
          `${target_name}双手被抓住逃不掉的状态、被从下往上捅而发出了悲鸣………`,
        );
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (kojo.全身擦洗 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊…哈啊…哼唔…啊啊…好烫啊变得难受起来了…嗯~…啊~…啊啊~」`,
        );
        await era.printAndWait(
          `「不行啊、抚摸那样的地方…嗯嗯~…明明说了不行来的」`,
        );
      } else {
        await era.printAndWait(
          `「唔~…居然要我做这种陪洗女的事情…啥？我只是性奴隶而已…？ 呜~☆～～～~！」`,
        );
      }
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
          `「啊啊~…只是洗澡而已却要去了呀~${heart(1)}就算去了…也请不要骂我吧…啊~啊啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}将冒着泡泡的肥皂涂到自己的股间上、坐到${player_name}的大腿上晃动着臀部帮${player_name}擦洗着身子。`,
        );
        await era.printAndWait(
          `「嗯呀啊~${heart(1)} 这样的事情…啊啊~…我明白的啦、我会努力的…让魔王大人变干净的啦~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「哈啊哈哈…已经…好像我变成了热水一样了呢~…嗯~…嗯哼~${heart(1)}」`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…我会好好地让弄魔王大人变干净的啦、所以不能恶作剧噢~？ 嗯~…哈啊…哈啊…魔王大人的身体…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}十分热情地擦洗着${player_name}的身体、用冒着泡泡的肥皂抹到全身都是、特别是股间附近的地方。`,
        );
        await era.printAndWait(
          `「啊啊…啊啊…我也变奇怪了呢…只是洗个澡而已缺变得那么舒服起来了~${heart(1)}」`,
        );
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…哼唔…啊啊…好烫啊呼吸变苦难起来了了…嗯~…啊~…啊啊~」`,
        );
        await era.printAndWait(
          `${target_name}全身涂满了肥皂的泡沫、用硬起来的乳头摩擦着${player_name}的背后。`,
        );
        await era.printAndWait(
          `「啊~…乳头~…嗯~！不行啊~、抚摸那样的地方…嗯嗯~…明明说了不行来的」`,
        );
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「我会好好的用自己的身体来帮你洗的啦所以给我安静地待着啦…啊啊~…嗯~…哈啊…哈啊…嗯~…！」`,
        );
        await era.printAndWait(
          `${target_name}全身涂满了肥皂的泡沫、用硬起来的乳头摩擦着${player_name}的背后......`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (kojo.骑乘位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯~…嗯~${heart(1)} 啊啊啊~…我的肛门在被扩张着…嗯~…嗯呜~…要变奇怪了~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将阴茎对准肛门慢慢地将腰降了下去………`,
          );
        } else {
          await era.printAndWait(
            `「啊~…唔~…虽然有点痛苦来着…哈啊哈啊…在进来着…呜~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}还没有被开发过的肛门将阴茎慢慢地吞了进去………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯~嗯哼唔~…${heart(1)} 全、全部…进去了${heart(1)} 我，我会动起来的啦…啊~…啊啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的上方跳起十分淫乱的舞蹈………`,
          );
        } else {
          await era.printAndWait(`「啊啊…你的太大了…好紧…好难受啊~…啊啊~！」`);
          await era.printAndWait(
            `${target_name}虽然因为被扩张的疼痛而发出痛苦的呻吟、但是还是将${player_name}的一整根阴茎全部吞了进去………`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「~！嗯呜~…啊呜~！不要…看着我的脸啦啊啊~…嗯~…不行~…啊~…！」`,
          );
          await era.printAndWait(
            `${target_name}被开发过敏感的肛门被${player_name}的阴茎不断地摩擦给予着快感………`,
          );
        } else {
          await era.printAndWait(
            `「呜~…好难受~…啊啊~…要裂开了…啊~啊啊~…连根部都…嗯呀啊~！」`,
          );
          await era.printAndWait(
            `${target_name}没有被开发过的肛门被扩张到极限、其强大地收紧感让${player_name}的阴茎感到更进一步的快感………`,
          );
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊~…嗯呀~…呀~…嗯嗯~啊啊~${heart(1)} 大鸡巴好棒~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}激烈地上下晃动着、保持着速度地长距离抽插着。`,
          );
          await era.printAndWait(`阴茎涂满了肠液、淫乱的水声响彻了整个房间。`);
          await era.printAndWait(
            `「嗯~…嗯啊啊~…肛穴要去了~…要去了呜~…啊啊啊~${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…不行不行…大鸡巴进到肛穴里面后…噢噢噢~…要变得不正常起来了啊~…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}性器化的肛门、将${player_name}的阴茎舒适地包裹住给予着快感。`,
          );
          await era.printAndWait(
            `「唔哈啊…啊啊~…只是收紧而已…就变得舒服起来了${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…嗯~…啊啊~${heart(1)} 啊啊~${heart(1)} 肛穴好棒啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呜啊~…啊~…啊啊~~${heart(1)} 大鸡巴好深啊…噢~${heart(1)} 啊啊…就这样用肛穴变舒服起来吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}激烈地晃动着腰部、享受着肛门带来的快感。接着抬起了脑袋从喉咙发出了娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~！啊~…啊啊啊啊~~！！！ 将我弄坏吧~…将肛穴弄到一塌糊涂地坏掉吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊啊~~！ 哈啊~…啊啊~…好舒服…呀啊~…${heart(1)}」`,
          );
        }
        // CFLAG:337  = 9（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊~…肛门性交好棒啊~…真是最棒最舒服的了~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}激烈到头发都弄乱了的程度上下晃动着屁股、享受着肛门的快感。`,
          );
          await era.printAndWait(
            `「你也…你也觉得很舒服对吧${heart(1)} 往我下流色情的肛穴里那么激烈地往上捅~${heart(1)} 啊啊~~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯~…嗯~${heart(1)} 啊啊啊~…我的肛门被扩张了~…嗯~…嗯呜~…要变奇怪起来了~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将阴茎对准肛门慢慢地将腰降了下去、让腰上下摇晃了起来。`,
          );
          await era.printAndWait(
            `「哈啊嗯~…啊啊~…啊~…啊啊~${heart(1)} 我的肛门…居然变得那么有感觉了啊~…${heart(1)}」`,
          );
        }
        // CFLAG:337  = 8（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…唔~…虽然有点痛苦来着…哈啊哈啊…在进来着…呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}没有被开发过的肛门将阴茎吞了进去、为了适应的样子慢慢地晃动着屁股………`,
        );
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊~…嗯呀~…呀~…嗯嗯~啊啊~${heart(1)} 大鸡巴好棒~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}激烈地上下晃动着、保持着速度地长距离抽插着。`,
          );
          await era.printAndWait(`阴茎涂满了肠液、淫乱的水声响彻了整个房间。`);
          await era.printAndWait(
            `「嗯~…嗯啊啊~…肛穴要去了~…要去了呜~…啊啊啊~${heart(1)}」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…不行不行…大鸡巴进到肛穴里面后…噢噢噢~…要变得不正常起来了啊~…啊啊~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}性器化的肛门、将${player_name}的阴茎舒适地包裹住给予着快感。`,
          );
          await era.printAndWait(
            `「唔哈啊…啊啊~…只是收紧而已…就变得舒服起来了${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊~…嗯~…啊啊~${heart(1)} 啊啊~${heart(1)} 肛穴好棒啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呜啊~…啊~…啊啊~~${heart(1)} 大鸡巴好深啊…噢~${heart(1)} 啊啊…就这样用肛穴变舒服起来吧~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}激烈地晃动着腰部、享受着肛门带来的快感。接着抬起了脑袋从喉咙发出了娇喘声。`,
          );
          await era.printAndWait(
            `「啊啊~！啊~…啊啊啊啊~~！！！ 将我弄坏吧~…将肛穴弄到一塌糊涂地坏掉吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊啊~~！ 哈啊~…啊啊~…好舒服…呀啊~…${heart(1)}」`,
          );
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯~嗯哼唔~…${heart(1)} 全、全部…进去了${heart(1)} 我，我会动起来的啦…啊~…啊啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的上方跳起十分淫乱的舞蹈………`,
          );
          await era.printAndWait(
            `「哈啊~…哈啊~…啊啊~…好棒啊~${heart(1)}…屁股好棒…啊啊啊~…啊~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}紧紧地闭上嘴巴屁股上下的晃动着、品味着肛门的快感。`,
          );
          await era.printAndWait(
            `「嗯哼~…嗯~…嗯啊~…啊~…嗯嗯~${heart(1)} 啊啊…哈啊哈啊…啊嗯~${heart(1)}」`,
          );
          await era.printAndWait(
            `「呀嗯~！ 不、不行~…这样…突然捅上来什么的…啊~…啊啊啊~${heart(1)}」`,
          );
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊…你的太大了…好紧…好难受啊~…啊啊~！」`);
        await era.printAndWait(
          `${target_name}虽然因为被扩张的疼痛而发出痛苦的呻吟、但是还是将${player_name}的一整根阴茎全部吞了进去………`,
        );
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「~！嗯呜~…啊呜~！不要…看着我的脸啦啊啊~…嗯~…不行~…啊~…！」`,
        );
        await era.printAndWait(
          `${target_name}被开发过敏感的肛门被${player_name}的阴茎不断地摩擦给予着快感………`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜~…好难受~…啊啊~…要裂开了…啊~啊啊~…连根部都…嗯呀啊~！」`,
        );
        await era.printAndWait(
          `${target_name}没有被开发过的肛门被扩张到极限、其强大地收紧感让${player_name}的阴茎感到更进一步的快感………`,
        );
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊哈啊…嗯啊…嗯~…呸咯~呸咯~…哈啊哈啊…得要更加地侍奉才可以吗…啊啊啊………」`,
        );
        await era.printAndWait(
          `${target_name}流着眼泪对${player_name}的屁股伸出了舌头侍奉起来………`,
        );
      } else {
        await era.printAndWait(
          `「唔…真是屈辱啊、这样的…嗯呜…嗯呜呜~…好、好脏啊…！」`,
        );
        await era.printAndWait(
          `${target_name}流着屈辱地眼泪对${player_name}的屁股深处了舌头………`,
        );
      }
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
          `「啊嘿哎~…好好吃~…你的肛门好好吃啊~…呸咯~呸咯~…啾唔~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}非常下流得张着嘴巴、不断地流着口水好像真的很美味地来回舔着${player_name}的屁股。`,
        );
        await era.printAndWait(
          `这种样子换做以前的话完全想象不出来、这绝对是不能被以前的同伴看到的下贱的姿态来的………`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          `「哈啊哈啊…你的肛门…嗯~…嗯哼唔~…十分地漂亮呢~${heart(1)} 呸咯~${heart(1)}」`,
        );
        await era.print(
          `${target_name}十分热心的用舌头侍奉着${player_name}的屁股、湿漉漉的舌头十分地爽。`,
        );
        await era.print(
          `（明明在做那么脏的事情来着…啊啊…却根本停不下来啊………）`,
        );
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯哼唔~…嗯呜…呸咯~…嗯~…哈啊哈啊…啾唔~…啾~…呸咯………」`,
        );
        await era.printAndWait(`（为什么我…居然会在做这样的事情啊………）`);
        await era.printAndWait(
          `${target_name}流着眼泪对${player_name}的屁股伸出了舌头侍奉起来了………`,
        );
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊…为什么我要做这样的…呜呜~…啊啊~…嗯啾…呸咯…呸咯………」`,
        );
        await era.printAndWait(
          `${target_name}流着屈辱地眼泪对${player_name}的屁股深处了舌头………`,
        );
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (kojo.打屁股 == 0) {
      await era.printAndWait(`「呀啊啊~！？好痛！快停下吧！」`);
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
          `「啊啊~~~！ 屁、屁股…啊~…啊啊啊~…更加用力地拍下去吧…嗯~…哈啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}下流得不像样地张着嘴巴不断地滴着口水地被打着屁股。那晃动着有着漂亮形状的屁股的姿态就像在诱惑${player_name}着一样。`,
        );
        await era.printAndWait(
          `「啊嗯~…啊~…哈啊~！变兴奋起来了呀…${heart(1)}」`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「请给我的屁股…更多的处罚吧~${heart(1)}…啊啊啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `每当${target_name}有着漂亮形状的屁股被${player_name}打了一下、${target_name}就会露出恍惚的表情。`,
        );
        await era.printAndWait(`「啊~…啊啊~…屁股~…好热~…好热啊~…${heart(1)}」`);
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊唔~…唔~…呜呜~…好痛…原谅...原谅我吧……啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}如同请求原谅一样好像很痛苦地左右摇晃着她那有着漂亮形状的屁股、然而${player_name}充耳不闻地继续拍打着………`,
        );
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait(`「这种就像小孩子一样的对待…！啊啊~！」`);
        await era.printAndWait(
          `听着${target_name}痛苦的悲鸣、${player_name}将屁股打到通红了………`,
        );
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (kojo.鞭 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊~！啊~啊啊啊~！好痛~！不要…不要啊~…啊啊~~~！」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「我、我是不是…啊啊~…做、做错了什么事情了啊？…啊呜~！」`,
        );
        await era.printAndWait(`「不、不要啊~！…啊~…啊啊啊~！好、好疼~！」`);
      } else {
        await era.printAndWait(`「嗯唔…呜~…呜呜呜~…嗯唔~！」`);
        await era.printAndWait(`（发出了声音…只会让这家伙更高兴而已…！）`);
      }
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
          `「啊唔…${heart(1)} 啊啊~…啊嗯~${heart(1)} 啊啊~…我…已经…啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子挥下去的时候都会发出十分淫荡的声音。不断地摩擦双腿的样子，看来是忍受着鞭子带来的疼痛和快感所致。`,
        );
        await era.printAndWait(
          `「居然将我变成那么奇怪的身体了…啊啊~…啊嗯~…呀~…啊啊~！好痛的…好棒~${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯哼~…啊啊~…啊嗯~…${heart(1)} 哈啊…啊唔~…唔啊啊…啊…好热啊~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子挥下去的时候都会发出十分淫荡的声音。`,
        );
        await era.printAndWait(`就像希望被更加用力抽打一样………`);
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~！啊~啊啊啊~！好痛！不要…不要啊~…啊啊~！」`,
        );
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊唔~…${heart(1)} 啊啊~…啊嗯~${heart(1)} 啊啊~…我…已经…啊啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子挥下去的时候都会发出十分淫荡的声音。不断地摩擦双腿的样子，看来是忍受着鞭子带来的疼痛和快感所致。`,
        );
        await era.printAndWait(
          `「居然将我变成那么奇怪的身体了…啊啊~…啊嗯~…呀~…啊啊~！好痛的…好棒~${heart(1)}」`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯哼~…啊啊~…啊嗯~…${heart(1)} 哈啊~…啊呜~…唔啊啊~…啊~…好热啊~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子挥下去的时候都会发出十分淫荡的声音`,
        );
        await era.printAndWait(`就像希望被更加用力抽打一样………`);
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「我、我是不是…啊啊~…做、做错了什么事情了啊？…啊呜~！！」`,
        );
        await era.printAndWait(`「不、不要啊~！…啊~…啊啊啊~！好、好疼~！」`);
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯哼~…啊啊~…啊嗯~…啊啊~…哈啊哈啊~…啊啊嗯~♪」`,
        );
        await era.printAndWait(
          `${target_name}每当鞭子挥下去的时候都会发出十分淫荡的声音`,
        );
        await era.printAndWait(`就像希望被更加用力抽打一样………`);
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯呜~…呜~…呜呜呜~…唔呜~！」`);
        await era.printAndWait(`（发出了声音…只会让这家伙更高兴而已…！）`);
        await era.printAndWait(`${target_name}咬着嘴唇忍耐着鞭打的疼痛………`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (kojo.针 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「我，我…好讨厌疼来的…呀…呀啊啊~！」`);
        await era.printAndWait(
          `${target_name}因为针穿刺了皮肤的疼痛而发出了悲鸣………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊~…啊啊啊~！…不、不要啊…拜托了啊…啊啊~…啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}因为针穿刺了皮肤的疼痛而发出了悲鸣………`,
        );
      } else {
        await era.printAndWait(
          `「呀~…骗、骗人的、这样的、不、不要啊…啊…啊噶啊啊啊啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}因为针穿刺了皮肤的疼痛而发出了悲鸣………`,
        );
      }
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
          `「哈呀~………在我的身上居然捅了那么多根针~…啊~…啊啊啊~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肌肤不断地有血渗出来看起来很可怜的样子、然而她却沉浸在了疼痛和血的味道里一脸恍惚的表情………`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔啊啊~…啊啊~…哈啊哈啊…针刺得好深啊~…啊嗯~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肌肤不断地有血渗出来看起来很可怜的样子、然而她却沉浸在了疼痛和血的味道里一脸恍惚的表情………`,
        );
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「我，我…好讨厌疼来的…呀…呀啊啊~！」`);
        await era.printAndWait(
          `${target_name}因为针穿刺了皮肤的疼痛而发出了悲鸣………`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呀~………在我的身上居然捅了那么多根针~…啊~…啊啊啊~………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肌肤不断地有血渗出来看起来很可怜的样子、然而她却沉浸在了疼痛和血的味道里一脸恍惚的表情………`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔啊啊~…啊啊~…哈啊哈啊…针刺得好深啊~…啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肌肤不断地有血渗出来看起来很可怜的样子、然而她却沉浸在了疼痛和血的味道里一脸恍惚的表情………`,
        );
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊啊~！…不、不要啊…拜托了啊…啊啊~…啊啊啊~~~！」`,
        );
        await era.printAndWait(
          `${target_name}因为针穿刺了皮肤的疼痛而发出了悲鸣、请求着原谅………`,
        );
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊~…痛得麻麻地感觉…嗯~…呜嗯~…疼、疼得好棒……啊啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}的肌肤不断地有血渗出来看起来很可怜的样子、然而她却沉浸在了疼痛和血的味道里一脸恍惚的表情………`,
        );
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呀~…骗、骗人的、这样的、不、不要啊…啊…啊噶啊啊啊啊啊~！」`,
        );
        await era.printAndWait(
          `${target_name}因为针穿刺了皮肤的疼痛而发出了悲鸣………`,
        );
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哼哼哼、居然要将眼睛遮住什么的到底要做怎样H的事情呢~？」」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「想、想要做什么事情啦？」`);
      } else {
        await era.printAndWait(
          `「遮住眼睛？………哼~、看来你想要做十分下流的事情啊」`,
        );
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「快、快点…摸我嘛~…啊哈啊嗯~！」`);
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…呐啊…摸我啦~~…啊啊~………」`);
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「遮住眼睛的话…会给我做很多H的事情对吧~？」`);
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「我、我…只是因为被遮住眼睛而已…啊啊…就兴奋起来了~………${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊哈啊~…快、快点…抚摸我啦~！」`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「遮住眼睛着…总觉得…有点不安了呢………」`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…到想要干什么啦~~………」`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「唔~…只是遮住眼睛而已算什么啦………」`);
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
      await era.printAndWait(`「哈啊哈啊…真是令人激动呢………」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「嗯~…嗯哼哼~、终于又能看见你那一脸蠢样的脸了呢~…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}一副安下心来的表情这样说着………`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哼，哼~…都不算什么嘛」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊~…好紧~…嗯唔……更加用力地将我捆绑起来吧…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊~…啊嗯~…就算不做这样的事情我也…对你…啊~…啊啊~！」`,
        );
      } else {
        await era.printAndWait(
          `「唔~…不将我绑起来就不能随心所欲地做什么的…真是丢人呢！」`,
        );
      }
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
          `「啊哈嗯~…没错就这样…啊啊~…好紧~…好棒啊~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}脸颊变赤红的情况下被绑了起来………`);
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊哈嗯~…没错就这样…啊啊~…好紧~…好棒啊~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}脸颊变赤红的情况下被绑了起来………`);
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…好紧~…嗯唔……更加用力地将我捆绑起来吧…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的脸变红了起来、`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…啊啊~…将我的心也绑起来吧~…魔王大人~…啊啊啊~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}脸颊变赤红的情况下被绑了起来………`);
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…啊啊~…将我的心也绑起来吧~…魔王大人~…啊啊啊~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}脸颊变赤红的情况下被绑了起来………`);
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…啊嗯~…就算不做这样的事情我也…对你…啊~…啊啊~！」`,
        );
        await era.printAndWait(
          `稍微有点悲伤的${target_name}被${player_name}绑了起来了………`,
        );
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「快、快点…将我绑起来吧~…嗯~…啊~…哈啊~…哈啊………」`,
        );
        await era.printAndWait(
          `${target_name}安静地被绑起了起来。好像十分期待被绑起来的样子皮肤都稍微变红了起来………`,
        );
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「唔~…不将我绑起来就不能随心所欲地做什么的…真是丢人呢！」`,
        );
        await era.printAndWait(
          `${target_name}虽然一脸反抗的看着你、但是果然还是害怕被绑起来的样子身体在不断地颤抖着………`,
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
      await era.printAndWait(`「哈啊哈啊…不够…还不够啊~…我还想要呢~………」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊…绳子的痕迹还在呢…好羞耻啊~………」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊…哈啊…呜~☆～」`);
      await era.printAndWait(`${target_name}厌恶地用脚小小地踢了一下绳子………`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「被做这样的事情的话会呼吸困难的啦…嗯~…嗯哈唔………」`,
        );
        await era.printAndWait(`${target_name}稍微有些不满的样子………`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊呜…嗯~…嗯唔…呜噗~………」`);
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
      } else {
        await era.printAndWait(`「这是什么啊…嗯唔~…嗯~…嗯呜~~！」`);
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}抗议的`;
        if (gagged) {
          await era.printAndWait(line_head + `左右甩起了脑袋………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…是要做要发出很大声悲鸣的事情对吧…${heart(1)} 嗯噗…嗯~………」`,
        );
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…是要做要发出很大声悲鸣的事情对吧…${heart(1)} 嗯噗…嗯~………」`,
        );
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「被做这样的事情的话会呼吸困难的啦…嗯~…嗯哈唔………」`,
        );
        await era.printAndWait(`${target_name}稍微有些不满的样子………`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜…嗯~…嗯唔…呜噗~………」`);
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子……………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜…嗯~…嗯唔…呜噗~………」`);
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜…嗯~…嗯唔…呜噗~………」`);
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊…哈啊…要被束缚起来了呀………♪」`);
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}好像在期待着什么`;
        if (gagged) {
          await era.printAndWait(line_head + `的样子…………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「这是什么啊…嗯唔~…嗯~…嗯呜~~！」`);
        // 与初回同型（两支都拼前缀，#623）
        // 无后缀 PRINTFORM 前缀，与下面两支的 PRINTW 同属一行；
        // 两支都拼它（#623：各支末行自带等待，拼接基准只容一个末行）
        const gagged = era.get(`tequip:${target}:43`);
        const line_head = `${target_name}抗议的`;
        if (gagged) {
          await era.printAndWait(line_head + `左右甩起了脑袋………`);
        } else {
          await era.printAndWait(line_head + `的眼神看着${player_name}………`);
        }
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
      await era.printAndWait(`「嗯哈啊～…${heart(1)} 哈啊…哈啊…${heart(1)}」`);
      await era.printAndWait(`从${target_name}的嘴巴里溢出了很多唾液………`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊…哈啊…哈啊…」`);
      await era.printAndWait(`从${target_name}的嘴巴里溢出了很多唾液………`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「嗯噗~…咳咳~…咳咳咳咳~………」`);
      await era.printAndWait(`${target_name}下意识地咳了起来………`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊~…好热啊~…肚子…在咕噜咕噜地响着…啊~啊啊啊~！」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯呜呜~…不、不要…不要…在你的面前…啊啊~…羞耻的要死了呜~」`,
        );
      } else {
        await era.printAndWait(
          `「呀啊啊~！？不要~…不要啊啊~…！不要啊~…拜托了~！只有这个不要…啊啊啊~~~！」`,
        );
      }
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
          `「哈啊哈啊~…啊啊~…肚子里面…好热啊~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被灌进了大量的灌肠液、肚子膨胀了起来。接着因为塞上了肛塞而痛苦地忍受着。`,
        );
        await era.printAndWait(
          `「哈~哈啊~…好难受~…好难受啊~…${heart(1)} 啊啊啊~…脑袋里要变奇怪起来了~…${heart(1)}」`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊~…好热啊~…肚子…在咕噜咕噜地响着…啊~啊啊啊~！！」`,
        );
        await era.printAndWait(
          `${target_name}的肚子因为灌肠液而膨胀起来了、因为其痛苦她发出了呻吟………`,
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
          `「哈啊哈啊~…啊啊~…肚子里面…好热啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被灌进了大量的灌肠液、肚子膨胀了起来。接着因为塞上了肛塞而痛苦地忍受着。`,
        );
        await era.printAndWait(
          `「啊啊~…哈啊啊~…啊啊~…塞子被拔掉的话我…会变成怎样了呢………${heart(1)}」`,
        );
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呜呜~…不要、不要…不要…在你的面前…啊啊~…羞耻的要死了呜~」`,
        );
        await era.printAndWait(
          `${target_name}到底会以怎样的表情将灌肠液喷出来呢、决定了，坐在特等席上好好观赏吧………`,
        );
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯~啊啊啊…啊~……不要…这样的~…明明不要的………肚子的里面…啊啊~…好难受~…呀哈呀~！」`,
        );
        await era.printAndWait(
          `${target_name}因为灌肠液的炽热而发出了悲鸣、她的脸因为不断地虐待狂化的调教而变得恍惚起来了………`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呀啊啊！？不要…不要啊啊~…！不要啊~…拜托了~！只有这个不要…啊啊啊~~~！」`,
        );
        await era.printAndWait(
          `${target_name}叫喊着恳求的话语、看来她是不明白将塞子拔掉到底是怎样一个下场来的啊………？`,
        );
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (kojo.放置PLAY == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「魔王大人~…啊啊~…我………」`);
        await era.printAndWait(`${target_name}一脸十分寂寞的表情………`);
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈啊…哈啊…更加…更加激烈地做吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}好像做得还不够的样子………`);
      } else {
        await era.printAndWait(`「嗯~…已经不想玩弄我的身体了吗？」`);
        await era.printAndWait(`${target_name}眺望着这边………`);
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…魔王大人…做、做嘛~…就像刚才那样…让我变舒服起来地…做…做吧…${heart(1)}」`,
        );
        await era.printAndWait(`忍不住的${target_name}向这边靠了过来………`);
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…更加…更加激烈地做吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}好像做得还不够的样子………`);
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人大人~…那、那个…差不多…」`);
        await era.printAndWait(`${target_name}两条大腿不断地摩擦着………`);
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「魔王大人…啊…嗯~…没、没什么………」`);
        await era.printAndWait(`${target_name}一脸十分寂寞的表情…………`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯~…已经不想玩弄我的身体了吗？」`);
        await era.printAndWait(`${target_name}眺望着这边………`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
    }
    await era.print('');

    if (era.get(`tequip:${target}:11`)) {
      await era.printAndWait(
        `${target_name}的小穴里面塞着阴道虫、毫不留情地在腔内来回蠕动着。`,
      );
    }

    if (era.get(`tequip:${target}:13`)) {
      await era.printAndWait(
        `${target_name}的肛门里面塞着肛门虫、毫不留情地蹂蹑着她的直肠。`,
      );
    }

    if (era.get(`tequip:${target}:19`)) {
      await era.printAndWait(
        `${target_name}的肛门里塞着肛珠、肛门正在一抽一抽地。`,
      );
    }

    if (era.get(`tequip:${target}:14`)) {
      await era.printAndWait(
        `${target_name}的阴蒂正夹着电动阴蒂夹，阴蒂夹不断地给她给予着快感的刺激。`,
      );
    }

    if (era.get(`tequip:${target}:15`)) {
      await era.printAndWait(
        `${target_name}的乳头正夹着震动乳头夹，乳头夹不断地给她给予着快感的刺激。`,
      );
    }

    if (era.get(`tequip:${target}:16`)) {
      await era.print(
        `${target_name}的胸部正按着榨乳器，榨乳器正不断地吸出母乳着。`,
      );
    }

    if (era.get(`tequip:${target}:17`)) {
      await era.printAndWait(
        `${target_name}的阴茎正套着飞机杯，就好像现在就要射精了一样一抽一抽地。`,
      );
    }

    if (era.get(`tequip:${target}:43`)) {
      await era.printAndWait(`${target_name}正戴着眼罩什么都看不见。`);
    }

    if (era.get(`tequip:${target}:44`)) {
      await era.printAndWait(
        `${target_name}的身体正在被绳子绑住动不了的状态。`,
      );
    }

    if (era.get(`tequip:${target}:46`)) {
      await era.printAndWait(
        `${target_name}的肚子因为灌肠液的原因咕噜咕噜地想着、如果将塞子拔掉的话肯定会立马喷出来了吧。`,
      );
    }

    if (era.get(`tequip:${target}:49`)) {
      await era.printAndWait(
        `${target_name}的肛门被塞进了电极振动棒、每当轻微地电流流过去后括约肌都会收紧一下。`,
      );
    }

    if (era.get(`tequip:${target}:53`)) {
      await era.printAndWait(
        `接着、${target_name}这样的姿态始终被录像机摄影着………`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
      if (era.get(`tequip:${target}:53`) == 1) {
        await era.print(`${player_name}催促着${target_name}开始自我介绍。`);
        if (
          era.get(`talent:${target}:89`) ||
          era.get(`abl:${target}:17`) >= 5
        ) {
          // 同一行输出：无后缀 PRINTFORM 不换行，
          // 是 SIF 的插入段，末行 PRINTFORML 才收行（#623）
          const masturbation_talk = (era.get(`abl:${target}:31`) || 0) >= 3;
          await era.print(
            `${target_name}将自己的本名、接下来要进行的性体验` +
              (masturbation_talk ? '还有手淫时妄想的内容' : '') +
              `十分兴奋地说了出来……`,
          );
          await era.print(
            `只是想着这个水晶球会送到狂王的手中，${target_name}的股间就变湿了起来……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}对着水晶球说起了淫乱卑劣的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}对着水晶球介绍起了自己`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.print(`${target_name}转过了头什么都没说`);
        }
      } else {
        // 同一行输出：无后缀 PRINTFORM 不换行，六支的
        // PRINTFORML 各自收行。前缀提到语句外共用——
        // 前缀留在里面会多出一段不属于本支的插值记号（#623）
        const spoke_first =
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔;
        const line_head = `${player_name}向她`;
        if (spoke_first) {
          await era.print(
            line_head +
              `搭话后、${target_name}晃动着腰部继续说着充满爱意的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            line_head + `搭话后、${target_name}晃动着腰继续说着卑劣的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同一行输出：无后缀 PRINTFORM 链，
          // 是两个互斥插入段，末行 PRINTFORML 收行
          // （这两段是这个 ELSEIF 支的收尾，#623）
          const excited =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const painful =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            line_head +
              `搭话后、${target_name}就发出了` +
              (excited ? '快乐的' : painful ? '苦痛的' : '') +
              `娇喘声，拼命地回起话来了。`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            line_head +
              `搭话后、${target_name}如同打发无聊地一样喋喋不休地回起话来了`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            line_head + `搭话后、${target_name}一点一点地说起话来了，`,
          );
        } else {
          await era.print(
            line_head + `搭话后、然而${target_name}完全没有听进去的样子…`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) == 1) {
        await era.print(`${master_name}催促着${target_name}开始自我介绍后、`);
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(`${target_name}晃动着腰部继续说着充满爱意的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(`${target_name}晃动着腰继续说着卑劣的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) == 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // 与初回同型（#623）
          const masturbation_talk = (era.get(`abl:${target}:31`) || 0) >= 3;
          await era.print(
            `${target_name}将自己的本名、接下来要进行的性体验` +
              (masturbation_talk ? '还有手淫时妄想的内容' : '') +
              `十分兴奋地说了出来……`,
          );
          await era.print(
            `只是想着这个水晶球会送到狂王的手中，${target_name}的股间就变湿了起来……`,
          );
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}对着水晶球说起了淫乱卑劣的话语`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}对着水晶球介绍起了自己`);
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
          game.kojo.录像内容 |= 2;
        } else {
          await era.print(`${target_name}转过了头什么都没说`);
        }
      } else {
        // 与初回同型：六支的 PRINTFORML 各自收行，
        // 前缀提到语句外共用（#623）
        const spoke_first =
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔;
        const line_head = `${master_name}向她`;
        if (spoke_first) {
          await era.print(
            line_head +
              `搭话后、${target_name}晃动着腰部继续说着充满爱意的话语`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            line_head + `搭话后、${target_name}晃动着腰继续说着卑劣的话语`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 与初回同型
          // （这几段是这个 ELSEIF 支的收尾，#623）
          const excited =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const painful =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            line_head +
              `搭话后、${target_name}就发出了` +
              (excited ? '快乐的' : painful ? '苦痛的' : '') +
              `娇喘声，拼命地回起话来了。`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            line_head +
              `搭话后、${target_name}如同打发无聊地一样喋喋不休地回起话来了`,
          );
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            line_head + `搭话后、${target_name}一点一点地说起话来了，`,
          );
        } else {
          await era.print(
            line_head + `搭话后、然而${target_name}完全没有听进去的样子…`,
          );
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 123) {
    if (kojo.乳夹口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊嗯~…唔哼哼~…在我的胸部之间美妙的汁液出来了呢…${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `「看吧~…被我大大的胸部夹着呢…${heart(1)}」」`,
          );
        }
        await era.printAndWait(
          `「嗯啾~…啾~…呸咯~…哈啊啊~…大鸡巴好好吃~…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「真是的…让我做这样不知羞耻的事情什么的…啊嗯~${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `${target_name}的大大的胸部之间、${player_name}的阴茎被紧紧地夹着。`,
          );
        }
        await era.printAndWait(
          `「嘛~、因为是魔王大人所以没关系噢…阿唔…嗯~…啾~…啾噗~…呸咯~…${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `${target_name}大大的乳房将${player_name}的阴茎给包裹住了。`,
          );
        }
        await era.printAndWait(
          `「就这样做就好了嘛…嗯~嗯啾~…啾唔~…噗哈…哈啊哈啊…怎、怎么样啊？」`,
        );
        await era.printAndWait(
          `${target_name}一边向上看着这边一边继续着乳夹口交………`,
        );
      } else {
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `${target_name}大大的乳房将${player_name}的阴茎给包裹住了。`,
          );
        }
        await era.printAndWait(
          `「唔…居然要在胸部侍奉情况下还得舔什么的…呜呜~…嗯啾~…啾~…啾噗~」`,
        );
        await era.printAndWait(
          `${target_name}气得眉毛一抖一抖地继续用乳房和嘴巴侍奉着………`,
        );
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「可仪的噢~…我的胸部可是为了让大鸡巴舒服起来而存在的哦…啊啊~…啾~啾~呸咯~…${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `「大大的胸部…舒服到受不了对吧~？ 尽情地射精也是可以的噢~…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}一脸荡漾到不行的表情继续用乳房和嘴巴侍奉着………`,
        );
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「能侍奉你那雄伟的那个真是幸福呢…啊啊~${heart(1)} 嗯啾~…啾~…呸咯呸咯~…嗯唔~…啾~啾~${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `「啊啊~…让我用这大大的胸部让你也变幸福起来吧~…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}对着从胸部之间露出头来的阴茎进行着口腔侍奉………`,
        );
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯~…嗯嗯~…嗯噗~…啊啊…你…好像真的很舒服的样子呢…嗯啾~……嗯啾~…啾噗~…啾……哈啊哈啊」`,
        );
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `「也是呢、用我大大的胸部一起侍奉来的嘛、舒服那是当然的嘛~♪」`,
          );
        }
        await era.printAndWait(
          `${target_name}好像抓住技巧的样子，用胸部夹着${player_name}的阴茎进行着口腔侍奉………`,
        );
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        if (
          era.get(`talent:${target}:110`) == 1 ||
          era.get(`talent:${target}:114`) == 1 ||
          era.get(`talent:${target}:119`) == 1
        ) {
          await era.printAndWait(
            `${target_name}大大的乳房将${player_name}的阴茎给包裹住了。`,
          );
        }
        await era.printAndWait(
          `「嗯噗~…嗯~…嗯啾~…啾啪~…哈啊哈啊…嗯~…连我的胸部都想用…嗯~…嗯噗~…呸咯~…」`,
        );
        await era.printAndWait(
          `${target_name}一脸好像要哭的样子十分屈辱地进行口腔侍奉………`,
        );
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 125) {
    if (kojo.口交时自慰 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯哼~…兴奋起来了呢~…嗯~…啾~…呸咯~…嗯噗~…嗯~…嗯嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不仅弄出了激烈又下流的口交的声音，还从股间传出了淫乱放荡的水声。看来因为口腔侍奉兴奋起来的原因开始自慰起来了………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哈啊哈啊${heart(1)}…嗯~…嗯呜~…啾~…啾噗~…嗯~…嗯噗~${heart(1)}…嗯~嗯~~…不、不行啊、不要这样盯着看啦…${heart(1)}」`,
        );
        await era.printAndWait(
          `正想着发生了什么事情就看到${target_name}因为口腔奉仕兴奋地不行而开始自慰了起来。而这件事情被看到了她的脸立马就变红了起来。`,
        );
        await era.printAndWait(
          `「看、看吧~…我还是好好地侍奉着的嘛、将注意力都集中在大鸡巴上面啦~…嗯~…嗯嗯~${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}按照${player_name}的命令在进行口腔侍奉的同时开始自慰起来了。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…嗯~…呸咯…嗯啾~…啾~…哼唔~…哼呜~…嗯嗯~！」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}犹豫了好久，最终还是按照${player_name}的命令再进行口腔侍奉的同时开始自慰起来了。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…我、我才不会因为这样…就输给你了…嗯嗯~…嗯啾噜~…啾~…啾噗~………」`,
        );
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯哼哼~…兴奋起来了呢~…嗯~…啾~…呸咯~…嗯噗~…嗯~…嗯嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不仅弄出了激烈又下流的口交的声音，还从股间传出了淫乱放荡的水声。看来因为口腔侍奉兴奋起来的原因开始自慰起来了。`,
        );
        await era.printAndWait(
          `「呸咯~…啊啊…一边舔着你的大鸡巴一边自慰…好有感觉啊…${heart(1)} 嗯啾呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}不断地从嘴边留下黏糊糊的唾液、${player_name}的阴茎变得更加舒服起来了………`,
        );
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊${heart(1)}…嗯~…嗯呜~…啾~…啾噗~…嗯~…嗯噗~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边进行着口腔侍奉一边自慰着、好像十分有感觉的样子，呼吸慢慢变得凌乱起来用荡漾的眼神看着这边。`,
        );
        await era.printAndWait(
          `「哈唔…啾~…啾唔~${heart(1)} 嗯哼～${heart(1)} 嗯哼唔～${heart(1)}」`,
        );
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}眯着眼睛一边自慰着一边进行着口腔侍奉。时不时地呼吸就凌乱了让人明白她正不断地变得兴奋起来。`,
        );
        await era.printAndWait(
          `「嗯啾噜~…啾~…啾噗~…哈…嗯~…嗯嗯~♪ 嗯噗~～…嗯噗～…噗哈…哈啊哈啊………♪`,
        );
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `${target_name}一边自慰着一边进行着口腔侍奉。虽然是${player_name}被盯着才一边侍奉着一边自慰、但是时不时有感觉的时候呼吸就会凌乱起来。`,
        );
        await era.printAndWait(
          `「嗯哼~…嗯噗~…嗯~…嗯嗯~…哈啊哈啊…嗯~…啾~…啾噗~……呜呜…~！」`,
        );
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (kojo.手搓口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈啊哈啊…唔哼哼、我的手和嘴巴都很舒服对吧~？ 呸咯~…啾~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}如同恶作剧一样笑了笑舔着前端不断地撸了起来………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哈啊…呸咯…啾~啾~…啊啊~…在我嘴巴里射出来吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的舌头将龟头缠绕住、手慢慢地上下运动着………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「一边撸着…一边舔就好了对吧…嗯~…嗯~嗯~！…噗啊…哈呜…呸咯…呸咯………」`,
        );
        await era.printAndWait(
          `${target_name}将前端龟头部分含住了不断地撸了起来………`,
        );
      } else {
        await era.printAndWait(
          `「哈啊哈啊…嗯…呸咯~…很、很舒服吗？…啊啊~…嗯~…啾~…噗哈………」`,
        );
        if (era.get(`talent:${player}:122`)) {
          await era.print(
            `（啊啊、明明就这样直接将蛋蛋捏爆的话、我就自由了来着…为什么做不出来啊………！）`,
          );
        }
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯哼哼、我的手和嘴巴都很舒服对吧~？ 呸咯~…啾~…啾噜~啾噗~啾噗~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}如同恶作剧一样笑了笑将龟头含进了嘴里吮吸着、发出了噗噜噗噜地下流声音撸着阴茎的根部。`,
        );
        await era.printAndWait(
          `「啾噜~…啾噗~…嗯哼唔~${heart(1)}…嗯？更加激烈地做可以不？ 当然可以哦、那么的话…啾啾噗~…呸咯呸咯~…嗯~…嗯哼唔~${heart(1)}」`,
        );
        await era.printAndWait(
          `因为在激烈地做口腔侍奉的原因${target_name}的脸变得淫乱放荡了起来………`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊~…呸咯~…啾~啾~…啊啊~…在我的嘴巴里射出来吧~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一副放荡的表情用炽热的舌头缠绕住龟头、手慢慢地上下运动着。`,
        );
        await era.printAndWait(
          `「嗯~嗯~…嗯哼哼~、大鸡巴一抽一抽地呢~${heart(1)} 哈啊嗯~${heart(1)} 啾~…呸咯~…呸咯~…${heart(1)}」`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…啊啊~…变得那么热了…啾…啾~…嗯~…呸咯~…好、的…我会连根部都一起撸的~………」`,
        );
        await era.printAndWait(
          `${target_name}将龟头含进了嘴里用手撸着根部。跪着进行口腔侍奉的那个姿态也变得淫乱了起来………`,
        );
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「看啊…快点射出来了吧…嗯~…嗯~…啾噗~…呸咯…呸咯~………」`,
        );
        await era.printAndWait(
          `${target_name}将龟头含进了嘴里用手撸着根部。跪着将脸埋在股间的那个姿态就跟卖身女一样………`,
        );
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (kojo.六九式 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `${target_name}如同为了展示小穴一样跨在了${player_name}的脑袋上舔着阴茎、还因为${player_name}的爱抚而晃动着腰部。`,
        );
        await era.printAndWait(
          `「啊~…这个…好棒啊…嗯啾~…呸咯…哈啊…啊嗯~…那、那里太有感觉呜~…啊啊~${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `${target_name}怯怯的跨上${player_name}的脑袋，并且将身体放任在了${player_name}的爱抚之下、十分热情地开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「哈啊~…嗯~…呸咯~…呸咯~…${heart(1)} 啊嗯~…呀~…再这样弄那里的话就要咬你的这个了噢…~！」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「嗯~…就像这样跨上去什么的真是羞耻啊………」`);
        await era.printAndWait(
          `「哈啊哈啊…嗯啾~…啾~…不行啊再这样弄吸取的话…嗯~真是的…嗯~嗯哼唔~…嗯啾~…啾噗~！」`,
        );
      } else {
        await era.printAndWait(
          `「呜…还必须要跨上你的身上什么的…啊~…不、不要这样直勾勾地看着啦！」`,
        );
        await era.printAndWait(
          `「哈啊…嗯~…嗯哼~…啊啊~！恶、恶作剧了的话我可就会咬下去了的哦！啊~…啊呜~！」`,
        );
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}跨到${player_name}的脑袋上就开始专注地舔着阴茎、还因为${player_name}的爱抚而晃动着腰部。`,
        );
        await era.printAndWait(
          `「啊~…这个…好棒…嗯啾~…呸咯…哈啊…啊嗯~…那、那里太有感觉了要去了呜~…啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯哼哼…我也会努力起来的哦？ 呸咯~…啾~啾~呸咯~${heart(1)} 嗯~嗯哼唔~${heart(1)}」`,
        );
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}将身体放任在了${player_name}的爱抚之下、十分热情地开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「哈啊~…嗯~…呸咯~…呸咯~…${heart(1)} 啊嗯~…呀~…弄那里的话就要咬你的这个了噢…~嗯哈啊！」`,
        );
        await era.printAndWait(
          `「真是的~…那、那么我就要让你舒服到…没法恶作剧为止才行呢~${heart(1)} …嗯~嗯啾~…啾啪~…${heart(1)}」`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯啾~…啾~…不行啊这样这样弄下去的话…啊啊~…嗯~已经…嗯~嗯噗~…啾~…啾噗~！」`,
        );
        await era.printAndWait(
          `${target_name}一边忍耐着${player_name}的爱抚一边继续着口腔侍奉………`,
        );
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊~…嗯~…嗯噗~…啊啊~！恶、恶作剧了的话我可就会咬下去了的哦！啊~…啊呜~！」`,
        );
        await era.printAndWait(
          `${target_name}因为${player_name}的爱抚稍稍发出了悲鸣后继续着口腔爱抚………`,
        );
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (kojo.真空口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯噗呜~…嗯~…啾噗~…啾噜~…啾啪~…啾唔呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在口腔侍奉的时候兴奋起来的样子嘟起嘴来弄出了下流得地流水音和吸了起来………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哈噗~…嗯~…嗯噗~…嗯嗯~${heart(1)} 哈啊哈啊…啾噗~…啾噜唔呜呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在口腔侍奉的时候兴奋起来的样子嘟起嘴来弄出了啾噗啾噗的声音吸了起来………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「嗯呜~…嗯~…哈啊哈啊…啾噜~…啾噗~…嗯~…嗯噗呜~…♪」`,
        );
        await era.printAndWait(
          `${target_name}用嘟起了嘴巴吸着${player_name}的阴茎的方式继续着口腔侍奉………`,
        );
      } else {
        await era.printAndWait(
          `「嗯噗呜~！？ 嗯~…嗯哼…嗯啾噜呜~…啾噗~…啾唔~………！」`,
        );
        await era.printAndWait(
          `${target_name}一边流着眼泪一边用嘴巴含了下去、将${player_name}的阴茎吸着的同时还弄出了下流的声音………`,
        );
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯噗呜~…嗯~…啾噗~…啾噜~…啾啪~…啾唔呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在口腔侍奉的时候兴奋起来的样子嘟起嘴来弄出了下流得地声音和吸了起来。`,
        );
        await era.printAndWait(
          `「嗯啵哼唔~…嗯噗~…嗯啾噜噗~…啾噜~${heart(1)} 哈啊哈啊…我会让魔王大人更加舒服起来的~${heart(1)}」`,
        );
        await era.printAndWait(
          `「大鸡巴好喜欢…好喜欢啊…啾噜~啾噗~…啾噗~…啾唔呜呜~${heart(1)}」`,
        );
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈噗~…嗯~…嗯噗~…嗯嗯~${heart(1)} 哈啊哈啊…啾噗~…啾噜唔呜呜~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在口腔侍奉的时候兴奋起来的样子嘟起嘴来弄出了啾噗啾噗的声音吸了起来。`,
        );
        await era.printAndWait(
          `「呸咯…啊啊…我好喜欢这个啊~…嗯~…嗯啾啾噗~${heart(1)} …啾噗啾啵啾啵~~${heart(1)}」`,
        );
        await era.printAndWait(`（啊啊…在嘴巴里……射出来吧………${heart(1)}）`);
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呜~…嗯~…哈啊哈啊…啾噜~…啾噗~…嗯~…嗯噗呜~…♪」`,
        );
        await era.printAndWait(
          `${target_name}用嘟起了嘴巴吸着${player_name}的阴茎的方式继续着口腔侍奉……`,
        );
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「嗯噗呜~！？ 嗯~…嗯哼…嗯啾噜呜~…啾噗~…啾唔~………！」`,
        );
        await era.printAndWait(
          `${target_name}一边流着眼泪一边用嘴巴含了下去、将${player_name}的阴茎吸着的同时还弄出了下流的声音………`,
        );
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (kojo.深喉 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `${target_name}因为口腔侍奉而兴奋了起来将${player_name}的阴茎塞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「嗯噗呜~…嗯噗呜~…${heart(1)} 啾噜~…啾噗~…嗯哼唔~～${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哈啊啊…大鸡巴全部给我吧~…${heart(1)} 嗯呜~…嗯~…就噗呜~…嗯噗呜~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为口腔侍奉而兴奋了起来将${player_name}的阴茎塞进了喉咙深处………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊哈啊…嗯~…全部…给我吧…啊…啊啊…嗯~嗯噗~…嗯嗯~~！」`,
        );
        await era.printAndWait(`「嗯啾~…嗯~…噗啊…嗯~…嗯噗呜………~！」`);
      } else {
        await era.printAndWait(
          `「嗯噗~…嗯~…嗯呜~…嗯啾呜~…噗啊…已、已经不行了再这样…嗯~…嗯唔唔~~！」`,
        );
        await era.printAndWait(
          `为了不让${target_name}逃掉抓住了她的脑袋就这样侵犯她的喉咙深处。她的表情因为屈辱而扭曲了、眼泪和鼻水流了一脸………`,
        );
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}因为口腔侍奉而兴奋了起来将${player_name}的阴茎塞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「嗯噗呜~…嗯噗呜~…${heart(1)} 啾噜~…啾噗~…嗯哼唔~～${heart(1)}」`,
        );
        await era.printAndWait(
          `「哈啊…嗯啊啊………连喉咙深处都在侍奉大鸡巴什么的…${heart(1)} 嗯~…嗯噗~…嗯噗呜~～${heart(1)}」`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊啊…大鸡巴全部给我吧~…${heart(1)} 嗯呜~…嗯~…就噗呜~…嗯噗呜~…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为口腔侍奉而兴奋了起来将${player_name}的阴茎塞进了喉咙深处。`,
        );
        await era.printAndWait(
          `「哈噗呜…嗯~…嗯噗~…呸咯~…嗯呜~${heart(1)} …嗯~嗯哼唔~…${heart(1)}」`,
        );
        await era.printAndWait(
          `（喉咙的深处全部…都被魔王大人的塞满了…${heart(1)}）`,
        );
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯~…全部…给我吧…啊…啊啊…嗯~嗯噗~…嗯嗯~~！」`,
        );
        await era.printAndWait(`「嗯啾~…嗯~…噗啊…嗯~…嗯噗呜………~！」`);
        await era.printAndWait(
          `${target_name}塞到了喉咙深处、哪怕喘不过气也继续着口腔侍奉………`,
        );
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「「嗯噗~…嗯~…嗯呜~…嗯啾呜~…噗啊…已、已经不行了再这样…嗯~…嗯唔唔~~！」」`,
        );
        await era.printAndWait(
          `为了不让${target_name}逃掉抓住了她的脑袋就这样侵犯她的喉咙深处。她的表情因为屈辱而扭曲了、眼泪和鼻水流了一脸………`,
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
          `「啊啊啊~…我的嘴巴变成了性器了~…嗯噗~…嗯~…嗯噗呜~～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸恍惚地表情被${player_name}就这样侵犯着………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「嗯噗~…啊啊~…就、就算不用这样强行做我也…嗯呀~…嗯噗~…嗯~…呜呜~…嗯~~~！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的脑袋侵犯着喉咙深处。${target_name}为了不咬到阴茎已经是尽了全力的样子………`,
        );
      } else {
        await era.printAndWait(
          `「嗯噗呜~…不，不要…嗯噗~…嗯唔~…噗~…咳咳~咳咳~…快、快停手啦~…啊啊~…嗯噗呜呜呜~！」`,
        );
        await era.printAndWait(
          `${player_name}强行侵犯着${target_name}的喉咙深处、享受着快感………`,
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
          `「啊啊啊~…我的嘴巴变成了性器了~${heart(1)}…嗯噗~…嗯~…嗯噗呜~～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一脸恍惚地表情被${player_name}就这样侵犯着………`,
        );
        await era.printAndWait(
          `「嗯啾噜~…啾噗~…嗯~…嗯噗~…嗯噗呜~～${heart(1)} 喉咙全部…被你的塞满了…${heart(1)} 嗯~！嗯噗呜~！」`,
        );
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯噗~…嗯~…嗯噗啊~…啊…更加激烈地做也是可以的噢…嗯~…嗯唔…嗯~…唔…嗯噗呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `虽然${target_name}喉咙深处侵犯到喘不过气来流下了眼泪、但是还是十分勇敢地忍耐着。`,
        );
        await era.printAndWait(
          `「阿噗~…嗯~…噗~…噗哈啊~${heart(1)} 哈啊哈啊…嗯~！嗯唔呜~～～～${heart(1)}」`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯噗~…啊啊~…就、就算不用这样强行做我也…嗯呀~…嗯噗~…嗯~…呜呜~…嗯~~~！」`,
        );
        await era.printAndWait(
          `${player_name}抓住${target_name}的脑袋侵犯着喉咙深处。${target_name}为了不咬到阴茎已经是尽了全力的样子………`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「嗯噗呜~…不，不要…嗯噗~…嗯唔~…噗~…咳咳~咳咳~…快、快停手啦~…啊啊~…嗯噗呜呜呜~！」`,
        );
        await era.printAndWait(
          `${player_name}强行侵犯着${target_name}的喉咙深处、享受着快感………`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 87) {
    // P 取当次 COM111 着脱切换的位域（跨文件共享，piercing-state 先例见
    // kojo-k1-confident.js）
    const P = piercing_state.p;

    if (kojo.穿环 == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}因为第一次身体被穿孔而下意识地皱起了脸。`,
          );

          if (P == 1) {
            await era.printAndWait(
              `「嗯哼哼~、怎样呀~…真是跟现在的我特别合适的装饰品呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}看在拴在乳头上闪闪发光的乳环笑了起来………`,
            );
          } else if (P == 2) {
            await era.printAndWait(`「这就是传说中时尚的肚脐环来的啊？」`);
            await era.printAndWait(
              `${target_name}看在拴在肚脐上的肚脐环笑了起来。跟她有着人鱼线的腹肌十分地合适………`,
            );
          } else if (P == 4) {
            await era.printAndWait(
              `「啊啊~…拿着这个环拉开的话…里面全部都会被看见了呢~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}如同为了展示闪闪发光的阴唇环一样，用手指张开了………`,
            );
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊~…太、太有感觉了呜…啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}一脸恍惚地好像要融化掉的表情看着在自己阴茎上的阴茎环………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊~…太、太有感觉了呜…啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}一脸恍惚地好像要融化掉的表情看着在自己阴蒂上的阴蒂环………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(
              `「唔哼哼、想要用这条舌尖就这样亲吻呢？还是直接给大鸡巴侍奉好呢？」`,
            );
            await era.printAndWait(
              `${target_name}如同展示着舌环一样将舌头伸出来的状态下笑了起来………`,
            );
          } else if (P == 32) {
            await era.printAndWait(`「呐、就这样亲吻好不好呀~？」`);
            await era.printAndWait(
              `${target_name}为了确认唇环的所在而舔了舔嘴唇………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「怎么？合适吗？」`);
            await era.printAndWait(`${target_name}抚摸着栓在左边鼻孔的鼻环………`);
          }
        } else {
          await era.printAndWait(`「啊嗯~…明明想要带上更多的环来着…真是的」`);
          await era.printAndWait(`${target_name}稍微有些残念的表情………`);
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}因为第一次身体被穿孔而发出了小小的悲鸣。`,
          );

          if (P == 1) {
            await era.printAndWait(
              `「呜啊、好热…我的乳头好热啊…啊啊~…不要这么直勾勾地看着呀~…啊、啊啊………」`,
            );
            await era.printAndWait(
              `${target_name}的两个乳头紧紧地拴上了乳环，她的脸因为羞耻而变红了起来………`,
            );
          } else if (P == 2) {
            await era.printAndWait(
              `「嗯~…真是漂亮的肚脐环呢…${heart(1)} 谢谢~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}十分高兴地抚摸着肚脐的周围。肚脐环跟她有着人鱼线的腹肌十分地合适………`,
            );
          } else if (P == 4) {
            await era.printAndWait(
              `「啊啊~…好、好羞耻啊…嗯~…好、好的…请看一下我的阴唇环吧………」`,
            );
            await era.printAndWait(
              `${target_name}虽然十分害羞但是还是按照${player_name}的命令、用手指张开了阴唇展示了那闪闪发光的阴唇环………`,
            );
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「这，这样的…这不是淫乱女会做得事情来的嘛…好过分啊…但是…啊啊~…舒服地舒服呐………」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎也不知道是因为被看到的原因还是戴上了阴茎环的原因完全勃起来了………`,
              );
            } else {
              await era.printAndWait(
                `「这，这样的…这不是淫乱女会做得事情来的嘛…好过分啊…但是…啊啊~…舒服地舒服呐………」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂也不知道是因为被看到的原因还是戴上了阴蒂环的原因变硬勃起来了………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(
              `「真是的…在这种地方打上环什么的、那个…果然…想让我舔那里对吧~？」`,
            );
            await era.printAndWait(`${target_name}十分害羞地扭扭捏捏着………`);
          } else if (P == 32) {
            await era.printAndWait(
              `「总觉得在这种地方打上了环后…越来越觉得自己变成了你的女人的感觉了呢………」`,
            );
            await era.printAndWait(
              `${target_name}为了消除违和感而不停地抚摸着嘴边的唇环………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「怎么样？合适吗？」`);
            await era.printAndWait(`${target_name}抚摸着栓在左边鼻孔的鼻环………`);
          }
        } else {
          await era.printAndWait(`「啊嗯~…明明想要带上更多的环来着…真是的」`);
          await era.printAndWait(`${target_name}稍微有些残念的表情…`);
        }
      } else {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}因为第一次身体被穿孔而发出了好像很疼的悲鸣。`,
          );
          await era.printAndWait(`给她打上的环是无法自己取下的再加工的东西………`);

          if (P == 1) {
            await era.printAndWait(
              `「唔~…呜呜~…这种事情才不算什么呢、只是乳头被开了洞而已我才…呜呜~………」`,
            );
            await era.printAndWait(
              `${target_name}看着胸部发着光的乳环流下了眼泪………`,
            );
          } else if (P == 2) {
            await era.printAndWait(`「哈啊哈啊…这是什么啊………」`);
            await era.printAndWait(
              `${target_name}因为肚脐打上了孔而疼得流下了眼泪………`,
            );
          } else if (P == 4) {
            await era.printAndWait(
              `「变、变态~…唔呜~…啊…不、不要张开啊…啊啊~…不、不要看啦啊！」`,
            );
            await era.printAndWait(
              `${player_name}检查${target_name}的阴唇环是否固定好了后、她就哭出来了………`,
            );
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「呜呜呜~…啊啊~…不是、才不是呢…这个是因为疼地原因…因为疼的原因才勃起来的！」`,
              );
              await era.printAndWait(
                `${target_name}完全勃起了的阴茎上的阴茎环正隐隐地发着光芒………`,
              );
            } else {
              await era.printAndWait(
                `「呜呜呜~…啊啊~…不是、才不是呢…这个是因为疼地原因…因为疼的原因才勃起来的！」`,
              );
              await era.printAndWait(
                `${target_name}完全勃起了的阴蒂上的阴蒂环正隐隐地发着光芒………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(`「呜呜~…这样的不要啊…呜噗呜~…！」`);
            await era.printAndWait(
              `为了检查${target_name}的舌头地舌环是不是好好的固定住了将她的舌头从嘴里拔出来后、${target_name}一副笨蛋的样子哭了起来了………`,
            );
          } else if (P == 32) {
            await era.printAndWait(
              `「哈啊哈啊…这点小事才不算什么………呜~☆～！」`,
            );
            await era.printAndWait(
              `${target_name}因为拴在嘴唇上的唇环带来的疼痛而流下了眼泪模糊了视线………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「好过分啊…真是太过分了………」`);
            await era.printAndWait(
              `在${target_name}的鼻孔中间拴上家畜专用的大鼻环、受到这样屈辱地她默默地流下了眼泪………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}因为环被取下来而松了一口气………`);
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
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait(
              `「嗯哼哼~、怎样呀~…真是跟现在的我特别合适的装饰品呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}看在拴在乳头上闪闪发光的乳环笑了起来………`,
            );
          } else if (P == 2) {
            await era.printAndWait(`「这就是传说中时尚的肚脐环来的啊？」`);
            await era.printAndWait(
              `${target_name}看在拴在肚脐上的肚脐环笑了起来。跟她有着人鱼线的腹肌十分地合适………`,
            );
          } else if (P == 4) {
            await era.printAndWait(
              `「啊啊~…拿着这个环拉开的话…里面全部都会被看见了呢~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}如同为了展示闪闪发光的阴唇环一样，用手指张开了………`,
            );
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊~…太、太有感觉了呜…啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}一脸恍惚地好像要融化掉的表情看着在自己阴茎上的阴茎环………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊~…太、太有感觉了呜…啊啊~${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}一脸恍惚地好像要融化掉的表情看着在自己阴蒂上的阴蒂环………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(
              `「唔哼哼、想要用这条舌尖就这样亲吻呢？还是直接给大鸡巴侍奉好呢？」`,
            );
            await era.printAndWait(
              `${target_name}如同展示着舌环一样将舌头伸出来的状态下笑了起来………`,
            );
          } else if (P == 32) {
            await era.printAndWait(`「呐、就这样亲吻好不好呀~？」`);
            await era.printAndWait(
              `${target_name}为了确认唇环的所在而舔了舔嘴唇………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「怎么？合适吗？」`);
            await era.printAndWait(`${target_name}抚摸着栓在左边鼻孔的鼻环………`);
          }
        } else {
          await era.printAndWait(`「啊嗯~…明明想要带上更多的环来着…真是的」`);
          await era.printAndWait(`${target_name}稍微有些残念的表情………`);
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait(
              `「呜啊、好热…我的乳头好热啊…啊啊~…不要这么直勾勾地看着呀~…啊、啊啊………」`,
            );
            await era.printAndWait(
              `${target_name}的两个乳头紧紧地拴上了乳环，她的脸因为羞耻而变红了起来………`,
            );
          } else if (P == 2) {
            await era.printAndWait(
              `「嗯~…真是漂亮的肚脐环呢…${heart(1)} 谢谢~${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}十分高兴地抚摸着肚脐的周围。肚脐环跟她有着人鱼线的腹肌十分地合适………`,
            );
          } else if (P == 4) {
            await era.printAndWait(
              `「啊啊~…好、好羞耻啊…嗯~…好、好的…请看一下我的阴唇环吧………」`,
            );
            await era.printAndWait(
              `${target_name}虽然十分害羞但是还是按照${player_name}的命令、用手指张开了阴唇展示了那闪闪发光的阴唇环………`,
            );
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「这，这样的…这不是淫乱女会做得事情来的嘛…好过分啊…但是…啊啊~…舒服地舒服呐………」`,
              );
              await era.printAndWait(
                `${target_name}的阴茎也不知道是因为被看到的原因还是戴上了阴茎环的原因完全勃起来了………`,
              );
            } else {
              await era.printAndWait(
                `「这，这样的…这不是淫乱女会做得事情来的嘛…好过分啊…但是…啊啊~…舒服地舒服呐………」`,
              );
              await era.printAndWait(
                `${target_name}的阴蒂也不知道是因为被看到的原因还是戴上了阴蒂环的原因变硬勃起来了………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(
              `「真是的…在这种地方打上环什么的、那个…果然…想让我舔那里对吧~？」`,
            );
            await era.printAndWait(`${target_name}十分害羞地扭扭捏捏着………`);
          } else if (P == 32) {
            await era.printAndWait(
              `「总觉得在这种地方打上了环后…越来越觉得自己变成了你的女人的感觉了呢………」`,
            );
            await era.printAndWait(
              `${target_name}为了消除违和感而不停地抚摸着嘴边的唇环………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「怎么样？合适吗？」`);
            await era.printAndWait(`${target_name}抚摸着栓在左边鼻孔的鼻环………`);
          }
        } else {
          await era.printAndWait(`「啊嗯~…明明想要带上更多的环来着…真是的」`);
          await era.printAndWait(`${target_name}稍微有些残念的表情…`);
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        if (chara(target).train.穿环状态 & P) {
          if (P == 1) {
            await era.printAndWait(
              `「唔~…呜呜~…这种事情才不算什么呢、只是乳头被开了洞而已我才…呜呜~………」`,
            );
            await era.printAndWait(
              `${target_name}看着胸部发着光的乳环流下了眼泪………`,
            );
          } else if (P == 2) {
            await era.printAndWait(`「哈啊哈啊…这是什么啊………」`);
            await era.printAndWait(
              `${target_name}因为肚脐打上了孔而疼得流下了眼泪………`,
            );
          } else if (P == 4) {
            await era.printAndWait(
              `「变、变态~…唔呜~…啊…不、不要张开啊…啊啊~…不、不要看啦啊！」`,
            );
            await era.printAndWait(
              `${player_name}检查${target_name}的阴唇环是否固定好了后、她就哭出来了………`,
            );
          } else if (P == 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「呜呜呜~…啊啊~…不是、才不是呢…这个是因为疼地原因…因为疼的原因才勃起来的！」`,
              );
              await era.printAndWait(
                `${target_name}完全勃起了的阴茎上的阴茎环正隐隐地发着光芒………`,
              );
            } else {
              await era.printAndWait(
                `「呜呜呜~…啊啊~…不是、才不是呢…这个是因为疼地原因…因为疼的原因才勃起来的！」`,
              );
              await era.printAndWait(
                `${target_name}完全勃起了的阴蒂上的阴蒂环正隐隐地发着光芒………`,
              );
            }
          } else if (P == 16) {
            await era.printAndWait(`「呜呜~…这样的不要啊…呜噗呜~…！」`);
            await era.printAndWait(
              `为了检查${target_name}的舌头地舌环是不是好好的固定住了将她的舌头从嘴里拔出来后、${target_name}一副笨蛋的样子哭了起来了………`,
            );
          } else if (P == 32) {
            await era.printAndWait(
              `「哈啊哈啊…这点小事才不算什么………呜~☆～！」`,
            );
            await era.printAndWait(
              `${target_name}因为拴在嘴唇上的唇环带来的疼痛而流下了眼泪模糊了视线………`,
            );
          } else if (P == 64) {
            await era.printAndWait(`「好过分啊…真是太过分了………」`);
            await era.printAndWait(
              `在${target_name}的鼻孔中间拴上家畜专用的大鼻环、受到这样屈辱地她默默地流下了眼泪………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}因为环被取下来而松了一口气………`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

/**
 * dog_kojo_9：兽奸PLAY中专用口上。TEQUIP:89 时由
 * kojo_message_com_9 头部检查岔入。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
async function dog_kojo_9(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era_flag.selectcom == 0) {
    if (kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (kojo.胸爱抚 == 0) {
      if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
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
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 == 0) {
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
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (kojo.舔肛 == 0) {
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
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (kojo.背后位 == 0) {
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
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (kojo.背后位肛交 == 0) {
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
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (kojo.手淫 == 0) {
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
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (kojo.口交_奴 == 0) {
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
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (kojo.骑乘位 == 0) {
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
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait('');
        } else if (rand_n(2) == 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
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
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
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
        kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
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
        kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (kojo.肛门侍奉 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 == 0) {
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
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (kojo.交谈 == 0) {
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
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
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

/**
 * kojo_message_palamcng_9：七道跳过判定 + 参数首超阈值条件
 * （CFLAG:221-229，各自「首次」标记只置一次）。
 */
async function kojo_message_palamcng_9() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;
  let P; // PALAM+UP 门槛判定的临时和，各分支覆写（承接全局单字母变量 P）
  let A; // 反抗刻印回避阈值判定的临时和（承接全局单字母变量 A）

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

  P = era.get(`palam:${target}:3`) + era.get(`delta:${target}:3`);
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「哈啊呜嗯~…润滑液，非常地粘滑滑的呢…」`);
        await era.printAndWait(`―――第一次到达了润滑LV2。`);
      } else {
        await era.printAndWait(
          `「啊~…变、变湿起来了…哈、啊啊…啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(`―――第一次到达了润滑LV2。`);
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「哈啊呜…好冷…什么啊这是…粘滑滑的………」`);
        await era.printAndWait(`―――第一次到达了润滑LV2。`);
      } else {
        await era.printAndWait(`「哈啊哈啊…居然…变得那么湿了………」`);
        await era.printAndWait(`―――第一次到达了润滑LV2。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  P = era.get(`palam:${target}:5`) + era.get(`delta:${target}:5`);
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `「嗯~…哈啊哈啊…效果好厉害呢…这个药…啊啊啊~…${heart(1)}」`,
        );
        await era.printAndWait(`―――第一次到达了欲情LV2。`);
      } else {
        await era.printAndWait(
          `「啊啊…我…想要被您…更加地疼爱呢~………${heart(1)}」`,
        );
        await era.printAndWait(`―――第一次到达了欲情LV2。`);
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `「咳咳咳...卑鄙的家伙…居然让我喝下这种药…哈啊…哈啊…啊啊身体好热啊~！」`,
        );
        await era.printAndWait(`―――第一次到达了欲情LV2。`);
      } else {
        await era.printAndWait(`「哈啊哈啊…呜…身体好热啊………」`);
        await era.printAndWait(`―――第一次到达了欲情LV2。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  P = era.get(`palam:${target}:8`) + era.get(`delta:${target}:8`);
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「啊啊~…别再欺负我了啦~…！」`);
      await era.printAndWait(`―――第一次到达了耻情lv2。`);
    } else {
      await era.printAndWait(
        `「呜呜…这、这样…羞辱的事情…已经没脸活下去了…！」`,
      );
      await era.printAndWait(`―――第一次到达了耻情lv2。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  P = era.get(`palam:${target}:10`) + era.get(`delta:${target}:10`);
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「不，不要做这么恐怖的事情啦…~！」`);
      await era.printAndWait(`―――第一次到达了恐怖lv2。`);
    } else {
      await era.printAndWait(
        `「就，就算被做了这样的事情都好…也、也不会觉得恐怖的呢！…！」`,
      );
      await era.printAndWait(`―――第一次到达了恐怖lv2。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if (era.get(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「嗯~…有、有什么…要来了…啊~…啊啊~！啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为阴蒂的刺激而第一次品味到了绝顶的样子。`,
      );
      await era.printAndWait(
        `「哈啊哈啊~…真是好厉害好棒啊…啊啊、还要~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}沉浸在绝顶的余韵后不久就要求再一次的快感………`,
      );
    } else {
      await era.printAndWait(
        `「啊~…不要~…不要啊…不、不要看啊~…不行~…不行~…啊~…啊啊啊啊啊~~~...」`,
      );
      await era.printAndWait(
        `${target_name}因为阴蒂的刺激而第一次品味到了绝顶的样子。`,
      );
      await era.printAndWait(`「哈啊…哈啊…啊…这个...好，好舒服………」`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if (era.get(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      await era.printAndWait(
        `「更加…更加激烈地…做到将小穴…将小穴搞坏掉的程度吧~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的腔内深处被塞进了阴茎，她抬高了漂亮地喉咙发出了高昂的娇喘声。`,
      );
      await era.printAndWait(
        `「啊啊~！要来了${heart(1)} …来了~${heart(1)} …啊~啊啊~…来了要来了呜要来了呜呜~${heart(1)} …哈啊啊~~！」`,
      );
      await era.printAndWait(
        `${target_name}第一次品味到了腔内高潮的滋味、稍微恍惚了一下后察觉到${player_name}的视线后为了追求更加激烈地快感而摇晃起了腰部………`,
      );
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      await era.printAndWait(
        `「嗯~嗯~…${heart(1)} 啊~…啊啊啊~…就这么激烈地…做吧~…啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}抬高了喉咙发出了高昂的娇喘声。腔口紧紧地收紧了而肉壶着一抽一抽地颤抖着。`,
      );
      await era.printAndWait(
        `「啊嗯~…嗯~${heart(1)} 有什么要来了…要来了…来了~…来了呜~${heart(1)} 啊啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}第一次品味到了腔内高潮的滋味、稍微恍惚了一下后察觉到${player_name}的视线后十分害羞地侧过了身………`,
      );
    } else if (game.event.插着不拔 == 1) {
      await era.printAndWait(
        `「啊~…啊啊嗯~！…不~…不要~…拔、拔出来拔…我、我、再做下去要变得奇怪…啊~啊啊啊~！」`,
      );
      await era.printAndWait(
        `${target_name}发出了高昂的声音。肉壶如同融化掉一样紧紧吸着${player_name}的阴茎、腔口也紧紧地收紧了起来。`,
      );
      await era.printAndWait(
        `「啊啊~…！不、不要~…要来了…要来了来了呜…啊啊啊~！啊~…啊啊啊啊～！」`,
      );
      await era.printAndWait(
        `${target_name}第一次品味到了腔内高潮的滋味、因为这个快感而恍惚了好久………`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  } else if (era.get(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 1) {
    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      await era.printAndWait(
        `「做吧~…更加激烈地做吧~…做到小穴坏掉吧~…啊啊~…来了~…来了呜哈啊~~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的腔内深处被塞进了阴茎、如同痉挛一样地收紧了腔口。`,
      );
      await era.printAndWait(
        `「啊啊啊~…来了呜~${heart(1)} 小穴来了~…啊啊~！ 啊~！啊啊啊啊~${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}一脸荡漾的表情沉浸在快感之中………`);
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      await era.printAndWait(
        `「啊啊~…又要去了~…要来了~…啊、我、我…又、又被你…啊、弄去了呜~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}如同要融化了一样吸住了${player_name}的阴茎、紧紧地收住了腔口。`,
      );
      await era.printAndWait(
        `「啊~…啊啊嗯~…啊啊~…啊啊~！要来了要来了~…${heart(1)} 啊~…啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}发出了高昂的娇喘声、精疲累尽地横躺在床上了………`,
      );
    } else if (game.event.插着不拔 == 1) {
      await era.printAndWait(
        `「呀~...哈啊~…不要~…明明不想去来的…啊啊~…啊~…不行不行不行…要去了…要去了噢~~！」`,
      );
      await era.printAndWait(
        `${target_name}收紧了腔口、仰着背身体不断地颤抖着背筋，毫不遮掩地让${player_name}看到她的高潮脸。`,
      );
      await era.printAndWait(`「唔啊~…哈…啊啊~…又被你弄去了…啊啊…啊啊啊………」`);
    }
  }

  if (era.get(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊~…来了~…屁股要来了~…${heart(1)} 要来了~${heart(1)} ……啊啊啊~…啊呀啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}不断地收缩着括约肌发出了高昂的娇喘声。看来是第一次因为屁股而高潮了。`,
      );
      await era.printAndWait(
        `「哈、哈呀~…呀~…哈啊~…啊哈…哈啊~…哈啊啊~…屁股最棒了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}向${player_name}展示着她那不知羞耻的高潮脸………`,
      );
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊~！啊啊~…${heart(1)} 啊~…屁股要…啊啊~…要来了~…要来了呜~…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}不断地收缩着括约肌发出了高昂的娇喘声。看来是第一次因为屁股而高潮了。`,
      );
      await era.printAndWait(
        `「哼啊~…啊啊~…啊啊～${heart(1)} 啊啊～${heart(1)} 屁股…要融化掉了~…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}因为未知的快感而身体不断颤抖着………`);
    } else {
      await era.printAndWait(
        `「已、已经…再玩弄下去的话…不、不要…啊啊~！ 明、明明说了不行来的~…啊~啊唔呜~！？」`,
      );
      await era.printAndWait(`「不行…不行~…要去了啊啊~…啊~…啊啊啊啊~～！」`);
      await era.printAndWait(
        `${target_name}第一次因为肛门而高潮了。嘴边流着口水、因为屈辱感咬着嘴唇。`,
      );
      await era.printAndWait(`「怎么会…居然因为屁股…去了什么的………」`);
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  } else if (era.get(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 1) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊~啊啊啊~…要来啦~…肛门要来啦~${heart(1)} …啊~…啊啊~～、哈、啊啊嗯~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}过于敏感的肛门被高潮引导着。接着${target_name}不断地发出了娇喘声。`,
      );
      await era.printAndWait(
        `「呀啊~…啊啊~…啊嗯~…啊~…啊啊~～${heart(1)}…肛门要变得不行了~${heart(1)} 」`,
      );
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊~～${heart(1)} 啊~…啊啊~～${heart(1)} 屁股噢~屁股要融化咯~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的过于敏感的肛门因为高潮不断地收紧着，每收紧一次~${target_name}都因为快感而发出了娇喘声。`,
      );
      await era.printAndWait(
        `「要来了\`~…屁股要来了~~…啊~…啊啊~～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊~…啊啊啊~…不要啊~…总感觉屁股要…明明不想去来着…啊呀~哈啊~哈啊~…哈啊~…要来了~…啊~啊~…啊啊~！」`,
      );
      await era.printAndWait(
        `${target_name}肛门高潮了。因为被强行让不干净的地方高潮的屈辱而流下了。`,
      );
      await era.printAndWait(
        `「唔嗯~…呜呜~…啊啊~…不、不行~…啊啊~…明明不能变的舒服起来的来着…啊啊~！」`,
      );
    }
  }

  if (era.get(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊~…啊啊~…更加地揉…我的胸部吧~…啊啊~啊~…要去了呜啊~要去了哈啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}因为被爱抚胸部第一次高潮了、一脸恍惚的神情吐着炽热的吐息。`,
      );
      await era.printAndWait(
        `「哈啊哈啊…啊啊…更加地…更加用力地揉吧~…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊~啊啊~…不、不要啊~…再被这样弄的话…哈啊~…哈~…啊啊~…啊嗯~…啊啊~…哈…啊啊~！」`,
      );
      await era.printAndWait(
        `${target_name}因为被爱抚胸部第一次高潮的余韵而喘息着、十分不甘心地咬着自己的嘴唇。`,
      );
      await era.printAndWait(
        `「哈啊…哈啊…啊~…不要~…胸部…变得敏感起来了…啊~…不要摸…嗯嗯~！」`,
      );
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  A = era.get(`delta:${target}:11`) + era.get(`delta:${target}:12`);
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「啊啊~…被夺走了…处女…被魔王大人夺走了呢~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「就这样…调教我的小穴吧~！…啊哈嗯~！变得舒服起来吧~${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「啊啊啊啊~…魔王大人…深处…捅到深处里面吧~…我…想要感受更多魔王大人给我的感觉~…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊~！是魔王大人夺走我的第一次真是太好了~…啊啊嗯~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊~啊啊啊~…不要…好疼…好疼啊…快…拔掉啊…啊啊啊~…！」`,
        );
        await era.printAndWait(
          `${target_name}被${player_name}夺走了处女之身、只能因为疼痛和屈辱而流下眼泪………`,
        );
        await era.printAndWait(`「居然被你这种人给夺走了………」`);
      }
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊哈哈~…我的处女被夺走了~…但是这样的话…我的淫乱小穴就可以被毫不留情地调教了啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}处女被夺走也不管，只想要被进一步调教………`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊啊~…我的处女…被夺走了………」`);
        await era.printAndWait(`${target_name}因为处女被夺走的痛苦而恍惚了………`);
      } else {
        await era.printAndWait(`「过分…好过分啊酷…这样的…呜呜………」`);
        await era.printAndWait(
          `${target_name}比起失去的痛苦、倒不如说是因为被夺走的屈辱而留下了眼泪………`,
        );
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

/**
 * kojo_message_markcng_9：七道跳过判定 + 刻印 Lv3 首达条件
 * （CFLAG:297-300）。
 */
async function kojo_message_markcng_9() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

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

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊啊~…好痛~…好痛呜呜~！已、已经忍不了了…啊啊~…啊呜啊啊～！」`,
      );
      await era.printAndWait(`${target_name}因为接近极限的痛苦流下了眼泪。`);
      await era.printAndWait(
        `「这样的…不…啊…啊啊啊啊~！已经…再这样下去的话…不要啊啊~！」`,
      );
    } else {
      await era.printAndWait(`「啊~…啊唔~…啊啊啊~…不要~…好痛啊…不要~………！」`);
      await era.printAndWait(`${target_name}因为接近极限的痛苦流下了眼泪………`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「哈啊哈啊~…知道了那么舒服的事情之后…我已经…变不回以前的我了…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的脑内被不断地刻上快感的印记、完全变成了快感的俘虏了………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…啊~…被做那么舒服的事情的话…我…已经…回不去了…啊啊~…啊啊~～！」`,
      );
      await era.printAndWait(
        `${target_name}的脑内被不断地刻上快感的印记、完全变成了快感的俘虏了………`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「啊啊…我…你说的所有事情我都会做的………」`);
      await era.printAndWait(`${target_name}完全屈服了………`);
    } else {
      await era.printAndWait(
        `「请、请不要再这样做了…啊啊…请不要对我再做这样残酷的事情了私…啊啊…我什么都会做的所以请原谅我吧…！」`,
      );
      await era.printAndWait(
        `因为受不了重复地残酷的调教、${target_name}向${player_name}完全屈服了………`,
      );
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `${player_name}的行为对于她来说只能称之为“叛徒”、${target_name}又哭又笑的样子盯着${player_name}。`,
      );
      await era.printAndWait(`「为什么…~！这样…这样的~…！果然你是………！」`);
    } else {
      await era.printAndWait(
        `${target_name}无比怨恨地瞪着${player_name}，她因为屈辱和愤怒而紧紧地咬住自己的嘴唇、从嘴边流出的血滴落脚边的地上。`,
      );
      await era.printAndWait(
        `「你会遭报应的…对我做出这样的事情的你，我绝对会让你遭报应的！」`,
      );
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

/**
 * self_kojo_k9：SELF 分发（Q 参数）+ 育儿室 CFLAG:273 +
 * 亲离 CFLAG:274 + 妊娠发觉 CFLAG:271（含 CSTR:2 生父自定义称呼插值）+
 * 生产 CFLAG:272 + 卖春（sell_maturo_k0，#338 接通）。
 */
async function self_kojo_k9() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
  const kojo = chara(target).kojo;
  const s = peek_aftertrain_s(); // TFLAG:13==4 支的 SIF s >= 3 需要（跨函数全局 S，K7 先例）
  const S = peek_sale_price(); // TFLAG:13==6 卖却分支的 IF S >= 500000 需要（同名不同义，K5 先例）
  const cstr2 = era.get(`cstr:${target}:2`) || ''; // %CSTR:2%（孩子生父的自定义称呼，K3 先例）
  const q = 0; // event-aftertrain 尚未把 Q 传入 SELF_KOJO（K3 kojo-k3-noble.js 先例）

  if (game.train.初吻与自我口上 == 1) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(`${target_name}就像被弄坏的玩具一样不停地自慰………`);
    } else if (q == 1) {
      await era.printAndWait(
        `「嗯~…嗯哼~…嗯~！……同为女性的也…很舒服呢~…啊啊~♪」`,
      );
      await era.printAndWait(
        `${target_name}如同追求着${assi_name}的余韵一样用手指轻抚着蜜穴………`,
      );
    } else if (q == 2) {
      await era.printAndWait(`「啊啊~…好像被汪酱更加地侵犯啊~…♪」`);
      await era.printAndWait(
        `${target_name}在用自己的手指自我安慰着，但是好像完全不够的样子………`,
      );
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊~…啊啊~…啊嗯~${heart(1)} …嗯~…完全不够啊…只是手指而已完全不够啊~………」`,
        );
        await era.printAndWait(
          `${target_name}每当用指尖就像很疼地一样用力地拧拉着乳头、就会发出淫乱的娇喘声。`,
        );
        await era.printAndWait(
          `「嗯哈~…${heart(1)} 啊啊~…啊~${heart(1)} 啊啊～${heart(1)} 」`,
        );
        await era.printAndWait(
          `「……哈啊哈啊…至少、留下一根振动棒也好啊…真是欺负人呢………」`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊啊~…魔王大人…啊啊~…哈啊嗯~${heart(1)} 哈啊…哈啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}舔了一下自己的指尖后不断地安慰自己的蜜穴。`,
        );
        await era.printAndWait(
          `「好想…好想要啊…魔王大人的…啊啊~…啊~…啊啊嗯~${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的自慰逐渐地变激烈起来了，然而这只是空虚的行为而已………`,
        );
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊~…啊哈啊~…自慰什么的～…根本停不下来啊~…啊~…嗯~…这、这里~…啊~啊啊~！」`,
        );
        await era.printAndWait(
          `「啊啊~…就算这样做都好…啊~…嗯嗯~…也根本不够啊~…啊哈啊~~………！」`,
        );
        await era.printAndWait(`${target_name}的自慰慢慢地变激烈起来了………`);
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「啊啊~…唔嗯~…哈~…啊~…啊啊~…为什么我会…这么地………」`,
        );
        await era.printAndWait(`「没错…啊、都是身体那么痒的错来的…啊~…啊啊~」`);
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「大姐姐~…欧派…想要大欧派………」`);
      await era.printAndWait(
        `${assi_name}和坏掉的${target_name}享受着如此颓废地蕾丝play………`,
      );
    } else if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「嗯哼哼~…更加~更加地~…啊啊~…只要舒服的话…是女孩子也没关系的呀~${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}和${assi_name}缠绕在一起了。`);
      if (era.get(`talent:${assi}:76`)) {
        await era.printAndWait(
          `${assi_name}积极地向${target_name}发起了攻势。`,
        );
        await era.printAndWait(
          `「啊啊~…哈啊~…嗯~…那里…没错就是那里~…${heart(1)} 啊啊~…啊啊~${heart(1)}」`,
        );
        await era.printAndWait(
          `「没错~…嗯~…更加地抚摸那里吧~…啊~…啊啊~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}积极地向${assi_name}发起了攻势。`,
        );
        await era.printAndWait(
          `「啊啊~…啊~…${heart(1)} 嗯哼哼~…我会让你非常有感觉的噢………${heart(1)}」`,
        );
        await era.printAndWait(
          `「看吧~…这里是不是很舒服呀~？ 发出更舒服的声音吧~、哼哼~很舒服对吧~${heart(1)}」`,
        );
      }
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊~…不行啊…我是…啊~…嗯~…！那、那位大人的东西来的…啊~…啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边拒绝着一边抵抗着${assi_name}的手指攻势。`,
      );
      await era.printAndWait(
        `${target_name}慢慢地将双腿张开，接受着${assi_name}的攻势。`,
      );
      await era.printAndWait(
        `「嗯~…嗯嗯~…啊啊~${heart(1)} 哈啊~…再、再这样下去的话…啊~…啊嗯~啊啊~${heart(1)}」`,
      );
      await era.printAndWait(
        `最终，${target_name}再也忍受不住${assi_name}的攻势和她抱在了一起享受起了同为女性的快乐………`,
      );
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊~…更多地~…♪ 啊啊~…好棒啊~…连我的深处也搅拌一下吧~…啊啊~…啊~♪ 啊啊~♪」`,
      );
      await era.printAndWait(
        `${target_name}和${assi_name}互相浓厚地亲吻了起来、调教后重新燃起了情欲。`,
      );
      await era.printAndWait(
        `「哈啊…啊~啊啊~…你的手指好舒服啊~…啊嗯~…嗯~…哈啊~～♪」`,
      );
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「嗯~…哼唔~…同为女性的玩耍、也是很不错的嘛♪…啊嗯~…嗯~…啊啊啊~」`,
      );
      await era.printAndWait(
        `${target_name}和${assi_name}的手指互相地重合了起来、不知道互相亲吻了多少次………`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「啊啊~…不、不要啊…我…还没…啊~…啊啊~…嗯~…唔嗯~！」`,
      );
      await era.printAndWait(`${target_name}和${assi_name}的脚缠绕在一起了………`);
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `「哈噗嗯~…嗯~…嗯嗯~…大鸡巴~～…大鸡巴~～…好好吃哦~～♪」`,
      );
      await era.printAndWait(`${target_name}一脸呆滞的样子舔着阴茎………`);
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「嗯~啾噗噜~…呸噜…嗯~…嗯噗~…啊、早上好~、还可以继续睡着哦。我会让你的大鸡巴漂亮地勃起起来的~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用炽热的舌头将${player_name}的阴茎包裹住、龟头立马就硬了起来。`,
      );
      await era.printAndWait(
        `「嗯哼哼唔~…早餐肉棒再来一根~…我收下了哦~${heart(1)} 啊嗯…嗯~…嗯噗呜~…呸咯哦~…嗯~…嗯噗唔~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}嘟起了嘴巴、脑袋长距离地上下晃动。被这样侍奉的${player_name}的阴茎变得更加硬了………`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊、早上好魔王大人~${heart(1)} 请等一下呢~现在在帮你弄干净呢~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}就像要完全将精液榨取出来一样用舌头缠绕住了阴茎。`,
      );
      await era.printAndWait(
        `「嗯啾~…啾~…呸咯~…嗯~…嗯~…啾~…呸咯~…${heart(1)} 啊~${heart(1)} 又勃起来了呢~、还没有射够呀~？${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}抬头笑了笑继续好像催促一样地用舌头给阴茎侍奉了起来………`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊…起来了吗起？ 哼哼、还没有起来的话我就会做各种各样的恶作剧来着………」`,
      );
      await era.printAndWait(
        `${target_name}的眼睛闪闪发光着、想要干什么大体能想得出来。`,
      );
      await era.printAndWait(
        `「嘛~、没关系啦~、现在开始帮你弄干净那里所以给我安分地待着噢？ 嗯~…啾~…呸咯…呸咯…♪」`,
      );
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「哈啊哈啊…啊啊…只是突然想要你的而已噢…我没有就这样咬断了就谢天谢地吧」`,
      );
      await era.printAndWait(
        `「嗯嗯~…嗯啾~…啾~…啊~…还有这里没舔呢…嗯~…呼嗯~………」`,
      );
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「啊啊~…好舒服~${heart(1)} 被你侵犯什么的…好喜欢~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}自己追求着和${master_name}合为一体、她的双脚紧紧地夹着${master_name}的腰部。`,
      );
      await era.printAndWait(
        `「更加${heart(1)} …更加地${heart(1)} …我…我已经忍不住了啊~…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的淫乱的肉壶的肉壁紧紧地和${master_name}的阴茎贴合在一起紧紧地吸住了阴茎。`,
      );
      await era.printAndWait(
        `「不射在…小穴里面的话，就不原谅你了噢${heart(1)}」`,
      );
      if (s >= 3) {
        await era.printAndWait(
          `${target_name}被中出了${s}回后露出满足的表情………`,
        );
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「我…还没有和你做爱呢…啊啊~…被你抱着好棒呢~${heart(1)}」`,
      );
      await era.printAndWait(
        `「嗯~…啊啊~！啊~…啊啊~…${heart(1)} 被抱着更久的话…啊啊~…就会变得更加舒服起来了…嗯~…啊啊~…啊嗯~${heart(1)}」`,
      );
      await era.printAndWait(
        `从${target_name}股间做了${s}回份的精液流下来了………`,
      );
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      if (
        era.get(`talent:${target}:9`) == 1 &&
        (kojo.夜袭 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈…啊~…啊啊啊~………小穴…小穴………」`);
        await era.printAndWait(
          `坏掉了的${target_name}被自己的主人抱到了${master_name}的房间来了………`,
        );
        // CFLAG:265  = 2（变量语义：CFLAG 族，265）
        kojo.夜袭 = 2;
      } else {
        await era.printAndWait(
          `「呐啊…你的房间不上锁的话可是会出安保问题的噢？」`,
        );
        await era.printAndWait(
          `正想着是谁的声音来着、就看到稍微有点无可奈何样子的${target_name}站在门口。`,
        );
        await era.printAndWait(
          `「嘛，没所谓啦~、从今以后我每个晚上都会在你的床上守护你的~………♪」`,
        );
        await era.printAndWait(`${target_name}爬到了${master_name}的床上………`);
        // CFLAG:265  = 1（变量语义：CFLAG 族，265）
        kojo.夜袭 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era.get(`talent:${target}:9`) == 1) {
      await era.printAndWait(
        `「哎～…啊～…只要坐上这个马车、就很多的大鸡巴了吗？那我要坐～！」`,
      );
      await era.printAndWait(`就这样坏掉了${target_name}被卖掉了………`);
    } else if (
      era.get(`talent:${target}:85`) &&
      era.get(`mark:${target}:3`) < 3
    ) {
      await era.printAndWait(`「哈…啊…是这样啊…已经对我厌倦了啊」`);
      await era.printAndWait(
        `${target_name}的项圈和手铐连起来的锁链被解开后、她意外安分地走向了奴隶商人的马车。`,
      );
      await era.printAndWait(
        `然而、突然停下了脚步转过身来一口气向你跑了过来！`,
      );
      await era.printAndWait(
        `「哈啊哈啊…忘了一样东西了呢。………这是永别的饯别礼噢~………嗯~！」`,
      );
      await era.printAndWait(
        `${target_name}用被手铐绑住的双手将你紧紧地抱住强硬地将嘴唇重叠了起来、用至今都没有过的热情态度亲吻了你。`,
      );
      await era.printAndWait(
        `${target_name}满足后离开的同时奴隶商人们也将${target_name}给抓住了。`,
      );

      if (S >= 500000) {
        await era.printAndWait(
          `「呵呵、真是如胶似漆呢。为什么想要将这样喜爱您的奴隶卖掉呢？………抱歉，这真是失礼了」`,
        );
        await era.printAndWait(
          `奴隶商人将${target_name}的项圈重新上了锁，将她拉向了马车。`,
        );
        await era.printAndWait(
          `${target_name}在走的途中不断地回过头来、然而最终还是坐上了马车走掉了………`,
        );
      } else {
        await era.printAndWait(
          `「这个混蛋！真是个疯子！还以为挺文静的没想到是这么一个家伙！给我做好觉悟吧！」`,
        );
        await era.printAndWait(
          `奴隶商人将${target_name}压倒在地上、并且给${target_name}戴上了口枷。`,
        );
        await era.printAndWait(
          `想必${target_name}到奴隶市场的这段短短的时间里会非常痛苦的吧………`,
        );
      }
    } else if (era.get(`mark:${target}:3`) == 3) {
      await era.printAndWait(
        `「…给我记住了、不管遇到怎样的事情我都会回到你的面前来的、绝对会让你遭报应的………」`,
      );
      await era.printAndWait(
        `${target_name}不仅裸着身子还被戴上了项圈和手铐，而且项圈和手铐还被铁链连起来、脚也有铁链球拷着。`,
      );
      await era.printAndWait(
        `就这样、保持着如此屈辱状态的${target_name}被卖掉了………`,
      );
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(
        `「啊啊…已经厌恶了我的身体了吗。哼~、嘛我也差不多对你的小鸡巴也有点厌倦了呢~！」`,
      );
      await era.printAndWait(
        `「我要跟比你的小鸡巴还要好的主人做好朋友去~、那么、拜拜~！」`,
      );
      await era.printAndWait(`接着，${target_name}乘着马车走掉了………`);
    } else {
      await era.printAndWait(
        `「不、不要…我不想要被卖掉什么的…拜托了拜托了啊…救救我吧！」`,
      );
      await era.printAndWait(
        `${target_name}向你哀求着，然而奴隶契约已经成立了。`,
      );
      await era.printAndWait(
        `被奴隶商人们套上了项圈后就变得安分了起来、就这样被带走了………`,
      );
    }
    await era.print('');
    if (era.get(`talent:${target}:122`) != 1) {
      await sell_maturo_k0(target, { price: S }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 == 11) {
    if (kojo.妊娠发觉 == 0) {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(
          `「啊~…啊啊啊~………啊哈哈…小穴被塞进阴茎太多次了…怀上小宝宝了呢………」`,
        );
        await era.printAndWait(
          `${target_name}呆滞地流着口水，一副坏掉的样子………`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「怀上了呢…你的孩子来的哦？………为了以防万一话先说在前头哦、我是绝对不会去堕胎的噢」`,
        );
        await era.printAndWait(
          `${target_name}十分坚决地态度告诉${master_name}自己怀孕了的事实………`,
        );
      } else if (chara(target).event.妊娠相手 == 2) {
        await era.printAndWait(
          `「好像怀上了呢…大概…是${cstr2}来的…但是没想到、女孩子之间居然也能怀生…真是复杂呢………」`,
        );
        await era.printAndWait(
          `${target_name}告诉了${master_name}自己怀孕了的事实………`,
        );
      } else if (chara(target).event.妊娠相手 == 3) {
        await era.printAndWait(
          `「好像怀上了呢…大概…是${cstr2}来的…但是没想到、女孩子之间居然也能怀生…真是复杂呢……」`,
        );
        await era.printAndWait(
          `${target_name}告诉了${master_name}自己怀孕了的事实………`,
        );
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        era.get(`talent:${target}:136`) &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(
          `「啊啊…怀上了野狗大人的孩子了呢…不知道有多少只小宝宝在我的肚子里呢~？」`,
        );
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(
          `「呜呜~…为什么…为什么会怀上狗的孩子呢！？难道我是比野兽还差劲的生物吗…？」`,
        );
      } else if (chara(target).event.妊娠相手 == 7) {
        await era.printAndWait(`「怎么会…我居然怀上了狂王大人的孩子…啊啊…」`);
      } else {
        await era.printAndWait(`「怀上了呢……怎么办啊………」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(
          `「啊~…啊啊啊~………啊哈哈…小穴被塞进阴茎太多次了…怀上小宝宝了呢………」`,
        );
        await era.printAndWait(
          `${target_name}呆滞地流着口水，一副坏掉的样子………`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「怀上了呢…你的孩子来的哦？………为了以防万一话先说在前头哦、我是绝对不会去堕胎的噢」`,
        );
        await era.printAndWait(
          `${target_name}十分坚决地态度告诉${master_name}自己怀孕了的事实………`,
        );
      } else if (chara(target).event.妊娠相手 == 2) {
        await era.printAndWait(
          `「好像怀上了呢…大概…是${cstr2}来的…但是没想到、女孩子之间居然也能怀生…真是复杂呢……」`,
        );
        await era.printAndWait(
          `${target_name}告诉了${master_name}自己怀孕了的事实………`,
        );
      } else if (chara(target).event.妊娠相手 == 3) {
        await era.printAndWait(
          `「好像怀上了呢…大概…是${cstr2}来的…但是没想到、女孩子之间居然也能怀生…真是复杂呢……」`,
        );
        await era.printAndWait(
          `${target_name}告诉了${master_name}自己怀孕了的事实………`,
        );
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        era.get(`talent:${target}:136`) &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(
          `「啊啊…怀上了野狗大人的孩子了呢…不知道有多少只小宝宝在我的肚子里呢~？」`,
        );
      } else if (
        chara(target).event.妊娠相手 == 5 &&
        chara(target).invasion.状态 != 9
      ) {
        await era.printAndWait(
          `「呜呜~…为什么…为什么会怀上狗的孩子呢！？难道我是比野兽还差劲的生物吗…？」`,
        );
      } else if (chara(target).event.妊娠相手 == 7) {
        await era.printAndWait(`「怎么会…我居然怀上了狂王大人的孩子…啊啊…」`);
      } else {
        await era.printAndWait(`「怀上了呢………怎么办啊=………」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 12) {
    if (kojo.生产 == 0) {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(`「啊哈~…啊哈~…生出来了………」`);
        await era.printAndWait(
          `${target_name}的眼睛毫无生气…根本分不清有没有在看着自己孩子的脸………`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「啊啊…这是你的孩子来的哦~…嗯哼哼~、我，我想要给你生更多更多地孩子呢~…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}生完孩子后，一脸幸福的样子………`);
      } else {
        await era.printAndWait(
          `「啊啊~…生出来了、生出来了啊、这个孩子到底会过上怎样的生活啊？」`,
        );
        await era.printAndWait(
          `${target_name}一脸比起做好了心理准备，倒不如说已经放弃了思考的样子看着生出来的孩子………`,
        );
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) == 1) {
        await era.printAndWait(`「啊哈~…啊哈~…生出来了………」`);
        await era.printAndWait(
          `${target_name}的眼睛毫无生气…根本分不清有没有在看着自己孩子的脸………`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        await era.printAndWait(
          `「啊啊…这是你的孩子来的哦~…嗯哼哼~、我，我想要给你生更多更多地孩子呢~…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}生完孩子后，一脸幸福的样子………`);
      } else {
        await era.printAndWait(
          `「啊啊~…生出来了、生出来了啊、这个孩子到底会过上怎样的生活啊？」`,
        );
        await era.printAndWait(
          `${target_name}一脸比起做好了心理准备，倒不如说已经放弃了思考的样子看着生出来的孩子………`,
        );
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(
          `「嗯呼呼~、这个孩子肚子里踢了一下呢、看来已经等不及要见到你了呢~♪」`,
        );
        await era.printAndWait(
          `${target_name}抚摸着因为临月而膨胀地大大的肚子………`,
        );
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(
          `「是个健康活泼的孩子真的很高兴呢~、呐~也向那位大人打招呼吧~${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}哄着一个小孩子………`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 == 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(
        `「已经、这个孩子也到了要离开父母的年纪了呢…真是好快呀………」`,
      );
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    kojo.亲离 = 1;
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

// dungeon_ryouzyoku_k9：H14 迷宫凌辱入口
async function dungeon_ryouzyoku_k9(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「不…不要…我是不会将第一次交给你们的！」`);
    await era.printAndWait(
      `「呜呜~…等下绝对会复仇的…啊~…好疼…说了好疼了啊！」`,
    );
    await era.printAndWait(
      `${target_name}虽然被怪物们抓住了，但是其眼瞳中还有生气之光在闪烁着………`,
    );
  } else {
    await era.printAndWait(`「呜…要侵犯的话就赶快侵犯呀………！」`);
    await era.printAndWait(
      `「哼、哼~、就你们这种烂鸡巴一点感觉都没有的啊…！」`,
    );
    await era.printAndWait(
      `${target_name}虽然被怪物们抓住了，但是其眼瞳中还有生气之光在闪烁着……`,
    );
  }

  return 0;
}

// dungeon_ryouzyoku_after_k9：H14 迷宫凌辱结算后口上
async function dungeon_ryouzyoku_after_k9(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「啊啊～…啊…啊啊啊……我，我还…还是…处女来的啊………」`);
    await era.printAndWait(`${target_name}还是处女的情况下被凌辱了。`);

    if (era.get(`exp:${target}:1`) > 20) {
      await era.print('');
      await era.printAndWait(`「啊啊~…屁股…哗啦啦地…啊啊~…有什么流出来了………」`);
      await era.printAndWait(
        `从${target_name}的肛门溢出了不知道是粘液还是精液的东西。`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.print('');
      await era.printAndWait(
        `「啊、呜、是、是的…鸡巴…很好吃来的…呜~…呜呜呜呜~」`,
      );
      await era.printAndWait(`${target_name}被强迫说出口交的感想了。`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.print('');
      await era.printAndWait(`「精液也…很好喝…还想…继续喝啊…啊、呜呜呜呜~」`);
      await era.printAndWait(
        `${target_name}被灌了多到能让她打饱嗝的精液、并让她说出了其感想………`,
      );
    }
  } else {
    await era.printAndWait(`「啊啊~…啊啊啊~…已经…被侵犯什么的不要……」`);
    await era.printAndWait(`${target_name}被凌辱到了极限。`);

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「呜~…呜呜~…！被这样侵犯了…我已经………」`);
      await era.printAndWait(
        `${target_name}的秘所被侵犯到阴唇卷起，看起来就很疼的样子、大量的精液从里面溢出来了………`,
      );
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.print('');
      await era.printAndWait(`「啊啊~…屁股…哗啦啦地…啊啊~…有什么流出来了………」`);
      await era.printAndWait(
        `从${target_name}的肛门溢出了不知道是粘液还是精液的东西。`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.print('');
      await era.printAndWait(
        `「啊、呜、是、是的…鸡巴…很好吃的说…呜~…呜呜呜呜~」`,
      );
      await era.printAndWait(`${target_name}被强迫说出口交的感想。`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.print('');
      await era.printAndWait(`「精液也…很好喝…还想…继续喝啊…啊、呜呜呜呜~」`);
      await era.printAndWait(
        `${target_name}被灌了多到能让她打饱嗝的精液、并让她说出了其感想………`,
      );
    }
  }

  return 0;
}

// dungeon_victory_k9：死斗场获胜口上
async function dungeon_victory_k9(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const a = era_flag.target;

  if (rand_n(3) == 0) {
    await era.printAndWait(`「哼、当然的结果嘛！」`);
  } else if (rand_n(2) == 0) {
    await era.printAndWait(`「想要赢我还早了一百年呢！」`);
  } else {
    await era.printAndWait(`「我可是有不能输的理由啊！」`);
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`（话说回来…这真是一个难看的胜利呀…）`);
    await era.printAndWait(`${target_name}受到了很大的伤害，一瘸一拐地………`);
  } else {
    await era.printAndWait(`「哈~、下一个对手是谁呢？」`);
  }

  return 0;
}

// dungeon_attack_k9：死斗场攻击口上，CFLAG:1 = 状态 分侵攻/非侵攻
async function dungeon_attack_k9(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (chara(target).invasion.状态 == 2) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「接招吧！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「直接结束这战斗吧！」`);
    } else {
      await era.printAndWait(`「从正面…冲过去！」`);
    }
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「反正肯定会输的，赶紧投降吧！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「你真是漂亮呢…真想好好疼爱一下呢！」`);
    } else {
      await era.printAndWait(
        `「哼哼哼、我会将你的衣服一件又一件地脱下来噢………」`,
      );
    }
  }

  return 0;
}

// benki_koujo_k9：肉便器行动口上
async function benki_koujo_k9(rand) {
  void rand;
  const a = era_flag.target;
  const target_name = chara_callname(a); // %SAVESTR:TARGET%

  if (game.train.肉便器行动 == 0) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「更加地…更加地…弄脏我吧~…${heart(1)}」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「啊啊~拜托了~…原谅我吧~！请原谅我吧~~~！」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「呜呜~…啊啊~…嗯~…嗯呜~………」`);
    } else {
      await era.printAndWait(`「不要啊啊啊啊啊…脏…好脏啊…快离开我啊！」`);
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「啊哈…大姐姐的尿尿好好喝噢~…${heart(1)}」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「嗯呜…呃…啊啊啊………被别人尿一身了………」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「哈呜~…我会更加努力地侍奉的…请温柔的对待我吧………」`,
      );
    } else {
      await era.printAndWait(`「呜呜呜~…小便好臭啊………」`);
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊哈啊啊啊~ 野兽的大鸡巴好棒${heart(1)} …好棒啊啊啊~${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「啊呜~…呜~…啊啊~~！ 啊啊~…野兽的精液…被射地满满的了…嗯呜~！」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「啊~…啊啊~…我会更加温顺的…所以请…更加温柔一点…呜啊~！」`,
      );
    } else {
      await era.printAndWait(`「不要~…不要啊·…我可是人类来的…嗯呜…哈呜呜~！」`);
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「哈呜嗯…请给更多的大鸡巴给我吧~…拜托了~~…${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「啊啊~…啊~………不管是那里还是屁股都变得湿漉漉起来了啊………」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「啊啊…啊…我、我已经…要…要变得不行了啊~………」`);
    } else {
      await era.printAndWait(`「对不起、真的对不起、再这样下去要不行了…………」`);
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊啊嗯~…我是最喜欢鸡巴的淫乱女来的${heart(1)} 侵犯到我怀孕为止吧~${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「嗯~…啊啊~！ 啊啊~~~…小、小穴…要坏掉了…啊~…啊啊~！」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「啊啊~…更加地侵犯我吧~………」`);
    } else {
      await era.printAndWait(
        `「啊~…唔啊啊啊~………是、是的…我是因为想要大鸡巴而变成肉便器的变态女来的………啊啊~」`,
      );
      await era.printAndWait(
        `${target_name}在被凌辱的情况下十分屈辱地说着别人指示的淫乱的话语………`,
      );
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊啊~${heart(1)} 肛穴…已经不知道去了多少次了呀~${heart(1)} 更加地侵犯吧~${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「嗯呜啊~…啊啊啊~………屁股…啊嗯…里面被精液塞满了~…………」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「呜嗯…呜呜~…是、是的…我是…肛门便器奴…奴隶…来的呜…啊…啊啊啊………」`,
      );
    } else {
      await era.printAndWait(`「啊…屁股被…不行…要不行了………」`);
    }
  }

  return 0;
}

/**
 * colosseum_kojo_9：死斗场中专用口上。TEQUIP:55 时由
 * kojo_message_com_9 头部检查岔入。
 * @param {(n: number) => number} [rand] RAND:N 随机源（本函数无 RAND 分支，
 *   仅为与同族签名一致保留）
 */
async function colosseum_kojo_9(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const PBAND = 4; // ITEM:PBAND 即 ITEM:4 假阳具持有判定（K7 kojo-k7-heart.js 先例）

  if (era_flag.selectcom == 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`);
    } else {
      await era.printAndWait(
        `${target_name}因为死斗场的热气和被敌人注视着而颤抖着……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「嗯啊…我输了…随便你怎么样吧」`);
        await era.printAndWait(`${target_name}的武器从手中滑下，单膝下跪着……`);
      } else {
        await era.printAndWait(`「啊啊…不、不要……居然被这样侵犯什么的………！」`);
        await era.printAndWait(`${target_name}的武器从手中滑下，单膝下跪着……`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「你也是、被叫去战斗才战斗的吧………」`);
        await era.printAndWait(
          `${target_name}一脸悲伤地看着被${master_name}命令而武装起来的${assi_name}………`,
        );
      } else {
        await era.printAndWait(`「居然必须要跟这种杂鱼对手战斗什么的！」`);
        await era.printAndWait(
          `${target_name}对自己被强迫在封印力量的状态下战斗这件事恨得直咬牙……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「嗯哼~…嗯嗯~！…哈啊…嗯~…嗯啾…呜~…哈啊哈啊…呸咯…呸咯呸咯………」`,
      );
      // 同一行输出：无后缀 PRINTFORM 链，
      // 是两个 SIF 插入段（可都为假），末行 PRINTFORMW 收行（#623）
      const assi_penis =
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1;
      const assi_band =
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era.get(`item:${PBAND}`) == 1;
      await era.printAndWait(
        `${assi_name}看着${target_name}舔着` +
          (assi_penis ? `阴茎` : assi_band ? `假阴茎` : '') +
          `露出了十分愉悦的表情……`,
      );
    } else {
      await era.printAndWait(
        `「呜呜~…好、好臭啊…嗯呜~…嗯~…啊…哈啊哈啊…嗯呜！~~呜！」`,
      );
      await era.printAndWait(`${target_name}吮吸着闻起来就想吐的恶臭阴茎……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊~…嗯~…啊啊~…呀…啊…哈啊~！」`);
      await era.printAndWait(`${target_name}的胸部一直被${assi_name}揉着。`);
      await era.printAndWait(
        `接着${assi_name}为了让观众看得更爽揉得更厉害起来了………`,
      );
    } else {
      await era.printAndWait(
        `「呜嗯！…不是说过了…我的胸部才不是年糕来的…哈啊呜！」`,
      );
      await era.printAndWait(
        `${target_name}因为胸部被强烈地搓揉着而发出了痛苦的叫声……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊~…哈呜~…啊啊！不要~…不要…再这样羞辱我了…啊~…啊啊~！」`,
      );
      // 与初回同型（#623）
      const assi_penis =
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1;
      const assi_band =
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era.get(`item:${PBAND}`) == 1;
      await era.printAndWait(
        `${assi_name}听着${target_name}的悲鸣继续用` +
          (assi_penis ? `阴茎` : assi_band ? `假阴茎` : '') +
          `来毫不留情地蹂蹑的${target_name}的小穴。`,
      );
      await era.printAndWait(
        `每当${target_name}发出了悲鸣，观众们都会沸腾起来………`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(
        `「啊呜啊啊…呜呃…呃噢…呜…啊啊…快…快拔…拔掉吧………啊噶啊啊啊！」`,
      );
      await era.printAndWait(
        `可怜的${target_name}发出了如同青蛙被碾碎了一样的叫声，然而巨魔充耳不闻，继续侵犯着她的小穴……`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…不、不要再这样…啊~…啊啊啊~！不…不要啊啊啊！！」`,
      );
      await era.printAndWait(`${target_name}一直在被怪物侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊~！这样…被看着被侵犯屁股什么的…啊啊…拜托了原谅我吧！」`,
      );
      // 与初回同型（#623）
      const assi_penis =
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1;
      const assi_band =
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era.get(`item:${PBAND}`) == 1;
      await era.printAndWait(
        `${assi_name}一边听着${target_name}的悲鸣一边用` +
          (assi_penis ? `阴茎` : assi_band ? `假阴茎` : '') +
          `毫不留情地继续蹂蹑${target_name}的屁眼。`,
      );
      await era.printAndWait(
        `每次${target_name}发出了悲鸣观众们都会拍手叫好………`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(
        `「啊哈呜~…呃呜…嗯呜啊…呃…啊啊…快…快…拔掉啦………啊噶啊啊啊~！」`,
      );
      await era.printAndWait(
        `可怜的${target_name}因为肛门被塞进了巨魔的巨大的阴茎，发出了如同青蛙被碾碎一样的哀嚎。`,
      );
      await era.printAndWait(
        `肛门如同被完全撕裂了一样被扩张开来、最终${target_name}的嘴巴吐出了泡沫。`,
      );
      await era.printAndWait(
        `观众们看到了${target_name}的这种姿态、全部都沸腾了起来………`,
      );
    } else {
      await era.printAndWait(`「啊~…啊啊~…屁股…要坏掉了…要坏掉了呜………」`);
      await era.printAndWait(`${target_name}一直在被怪物侵犯着肛门……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(`「啊啊~…媚药渗进去了~…啊~…身体啊~…好热~！」`);
    return 0;
  }

  return 0;
}

/**
 * ntr_koujo_k9：NTR 再捕获口上，CFLAG:650-657 状态机。
 * P 取分派方式编号，按 #5 决议从全局单字母变量改为显式形参（K7 先例）。
 */
async function ntr_koujo_k9(rand, P) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

  if (kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (P == 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊~…不要~啊啊~…我原本想要将处女奉献给魔王大人来着的…啊~啊啊~…啊啊~！」`,
      );
      await era.printAndWait(`「呜呜…对不起…魔王大人………」`);
      await era.printAndWait(`${target_name}被狂王破了处女身而留下了眼泪………`);
    } else {
      await era.printAndWait(
        `「呜啊…啊啊啊~…我才没有背叛狂王大人什么的呢………」`,
      );
      await era.printAndWait(`「这就是那个证据来的…呜~………呜呜~………」`);
      await era.printAndWait(`${target_name}被狂王破了处女身而留下了眼泪………`);
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…呜呜~…哈啊…啊~啊啊嗯~…啊~啊啊啊~…屁股…要坏掉了呜呜…啊~啊啊啊~！」`,
      );
      await era.printAndWait(
        `「用屁股能让狂王大人满足的话就不会将我的处女给夺走对吧？真的对吧？…啊、啊~…啊呜~！」`,
      );
    } else {
      await era.printAndWait(
        `「只要能让狂王大人满足的话就不夺走处女什么的…怎么能…好的…我明白了………」`,
      );
      await era.printAndWait(`「啊~…啊啊~…屁股…被这样…啊啊~…哈呜………！」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (P == 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「哈啊~…啊~…啊啊~…啊嗯~${heart(1)} 请抽插地更加厉害吧~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边被周围的观众嘲笑着、一边沉浸在被狗侵犯的快感里了………`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「不要不要啊！不想要被狗什么的给播种了啊…啊~…啊啊~…啊~~！」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…不要~…不要看啦不要看啦~！啊啊~！嗯~…啊呜~！啊啊~！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈呜~…嗯~${heart(1)} 啊啊~…哈啊~…狂王大人~…请更加地…${heart(1)} 侵犯我吧~…啊啊~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「好的…我被狂王大人抱着非常地幸福来得…啊~…啊啊~！」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (P == 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊~…被侵犯地好棒~…好棒啊~${heart(1)} 请更加地…弄坏我吧~${heart(1)} 啊啊~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…不管是前面还是后面都被侵犯…好喜欢啊~…呐啊~…你也更加用力地侵犯我吧~…啊~…啊嗯~…哈啊嗯~！」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊~…是的…我是魔王大人的公众便女来的…所以我想就这样被净化了之后就能为大家做出一点贡献了~${heart(1)}」`,
      );
      await era.printAndWait(
        `「请更加…更加地使用吧啊嗯~…不管是小穴还是肛门都好…全部都弄地乱七八糟地吧~${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的腰抬得高高的诱惑着男性们。而俯视着如此姿态的她的男性们一边嘲笑着一边向${target_name}涌了上去………`,
      );
    } else {
      await era.printAndWait(
        `「啊啊~…请更加用力地使用属于大家的公众便女${target_name}吧~不管是小穴还是肛门都好，用精液灌得满满的吧~！」`,
      );
      await era.printAndWait(
        `${target_name}的腰抬得高高的诱惑着男性们。而俯视着如此姿态的她的男性们一边嘲笑着一边向${target_name}涌了上去………`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「呼哈~…啊啊………对不起魔王大人、我果然是作为狂王大人的部下才是最幸福的样子~${heart(1)}」`,
      );
      await era.printAndWait(
        `「呜呜嗯~、已经不是作为狂王大人的亲卫队…而是作为雌奴隶而存在了呢…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊哈哈、这个也被魔王大人看着的吗？ 看来我很适合侍奉狂王大人的样子呀~」`,
      );
      await era.printAndWait(
        `「狂王大人~…从今以后的话我就不再作为您的亲卫队而是作为您的雌奴隶而努力的说~…${heart(1)}」`,
      );
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (P == 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (chara(target).event.妊娠相手 == 1) {
        await era.printAndWait(
          `「哈啊哈啊…我，我被做怎样的事情都没问题的、至少放过那个孩子…至少放过那属于我和魔王大人的孩子吧…！」`,
        );
        await era.printAndWait(
          `${target_name}拼命地挪动着原本出产后无法动弹的身体，向狂王哀求着。`,
        );
        await era.printAndWait(
          `然而拼命地哀求被众人给无视，婴儿被公开出产的观众们摆弄成了残酷的样子………`,
        );
      } else {
        await era.printAndWait(`「哈啊哈啊哈啊、我的出产秀怎样呀~？」`);
        await era.printAndWait(
          `${target_name}轻轻喘息凝望着镜头，对着镜头另一边的${player_name}说道。`,
        );
        await era.printAndWait(
          `「接下来会越生越多的噢~、敬请期待吧~${heart(1)}」`,
        );
      }
    } else {
      await era.printAndWait(
        `「啊啊~…哈啊哈啊~…我生孩子的各种地方…被大家给看到了啊」`,
      );
      await era.printAndWait(
        `${target_name}被狂王在耳边悄悄说了什么后，又开始滔滔不绝地说了起来。`,
      );
      await era.printAndWait(
        `「啊嗯~狂王大人~…是的~、我的子宫是狂王大人专用的育儿袋来的、从今以后会生更多的孩子出来的~♪」`,
      );
    }
  }

  return 0;
}

// exucution_koujo_k9：处刑口上，TFLAG:16 分档
async function exucution_koujo_k9(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    await era.printAndWait(
      `「不、不要啊…我才不要成为怪物的安慰物还要差的肉便器啊！啊…不要啊啊啊！」`,
    );
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait(`「请…请下…请下命…命令…命令………」`);
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait(
      `「不管被做什么事情都好…只要不死的话就算好了吧………」`,
    );
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

// museum_koujo_k9：博物馆口上，TFLAG:500 分档
async function museum_koujo_k9(rand) {
  void rand;

  if (game.event.博物馆口上 == 0) {
    await era.printAndWait(
      `「脚、脚被…脚慢慢地变冷了起来…我、我是要死了吧…拜托了…至少，至少回到最初的故…乡…里………………」`,
    );
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait(
      `「剥、剥制是…哎？我？不、不要…不要啊不要啊不要啊不要啊！」`,
    );
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

// banishment_koujo_k9：流放口上，TFLAG:510 分档
async function banishment_koujo_k9(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    await era.printAndWait(`「我失去作为战士的力量…已经………」`);
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

// public_exucution_koujo_k9：公开处刑口上，TFLAG:520 分档
async function public_exucution_koujo_k9(rand) {
  void rand;

  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait(
      `「快杀了我吧…我的那里已经…裂开了…啊啊啊…已经什么都感觉不到了啊…啊啊…啊啊啊………」`,
    );
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait(
      `「呜呜~…死什么地才不要…不要~…救救我…救救我吧~…我什么都会干的啦！」`,
    );
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

// grotesque_koujo_k9：猎奇处刑口上，TFLAG:530 分档
async function grotesque_koujo_k9(rand) {
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

// enterenemy_koujo_k9：入侵敌方遭遇口上
async function enterenemy_koujo_k9(rand) {
  void rand;
  const a = era_flag.target;

  if (era.get(`talent:${a}:76`) == 1) {
    await era.printAndWait(
      `「只要去到魔王大人的房间的话、真的能被干了个爽吗~？」`,
    );
  } else if (era.get(`talent:${a}:85`) == 1) {
    await era.printAndWait(`「魔王大人、将我扔在这里真是好过分啊………」`);
  } else {
    await era.printAndWait(`「哼~、地下九层之类的地牢只能当训练而已啊」`);
  }
}

// gohoubi_request_koujo_k9：迎击胜利后奖赏请求口上
async function gohoubi_request_koujo_k9(rand) {
  void rand;
  const a = era_flag.target;
  const cid_name = chara_callname(a); // %SAVESTR:A%（A 即 ARG:0，此处恒等于 TARGET）

  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(
      `「我想要金钱作为奖励呢。对呢，十万左右应该够了吧~」`,
    );
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 同一行输出：无后缀 PRINTFORM 链，
    // 是三选一的野兽名 IF 链，
    // 末行 PRINTFORMW 收行（#623）
    const beast =
      chara(a).stronghold.要求奖赏 == 1
        ? `狗`
        : chara(a).stronghold.要求奖赏 == 2
          ? `猪`
          : chara(a).stronghold.要求奖赏 == 3
            ? `马`
            : '';
    await era.printAndWait(
      `「呐~魔王大人、我想和` +
        beast +
        `交尾试一试呢~、能不能事先帮我准备好呢~？」`,
    );
    await era.printAndWait(`${cid_name}要求兽奸作为奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(
      `「作为奖励的话亲吻就很不错呢~、最好是最甜的那种吻~」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(
      `「呐、作为奖励的话能不能抱住我呢~？甜美而又温柔地那种最好了………${heart(1)}」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(
      `「想要魔王大人的精液呢~、请将我的嘴巴填的满满的噢~♪」`,
    );
    await era.printAndWait(`${cid_name}要求用精液作为奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`「想要召集熟人进行一场乱交派对呢」`);
    await era.printAndWait(`${cid_name}要求用乱交派对作为奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(`「想喝魔王大人的小便呢」`);
    await era.printAndWait(`${cid_name}要求用尿液作为奖励。`);
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`「能不能叫个还有童真的男孩子过来呀？」`);
    await era.printAndWait(`${cid_name}要求用狩猎童真作为奖励。`);
  }
}

// gohoubi_after_koujo_k9：迎击胜利后奖赏兑现口上
async function gohoubi_after_koujo_k9(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice == 0) {
    await era.printAndWait(`「为、为什么啦！」`);
  } else if (choice == 1) {
    await era.printAndWait(`「嘛、这种的偶尔也不错呢~」`);
  } else if (choice == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(
        `「呼~、这样终于就能投资了呢~………哎~？想要投资这个地下城的商店来回收利益的噢~不错的主意对吧~」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「噢~哦吼噢噢~…好深啊~${heart(1)} 狗的鸡巴好棒！好棒的噢噢~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「噢~哦吼噢噢~…好深啊~${heart(1)} 狗的鸡巴好棒！好棒的噢噢~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「噢~哦吼噢噢~…好深啊~${heart(1)} 猪的鸡巴好棒！好棒的噢噢~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「噢~哦吼噢噢~…好深啊~${heart(1)} 猪的鸡巴好棒！好棒的噢噢~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「噢~哦吼噢噢~…好深啊~${heart(1)} 马的鸡巴好棒！好棒的噢噢~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「噢~哦吼噢噢~…好深啊~${heart(1)} 马的鸡巴好棒！好棒的噢噢~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(
        `「啊嗯~…嗯~…不行、还想要~…嗯~嗯嗯~…哈啊~…好喜欢~${heart(1)}」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「啊啊嗯~！这个、这样做好喜欢啊！我已经离不开魔王大人了呀~${heart(1)} 啊~啊啊啊~啊哈啊嗯~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊嗯~！肛门被侵犯地好爽~！我已经离不开魔王大人了呀~${heart(1)} 啊~啊啊啊~啊哈啊嗯~${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait(
        `「嗯呜~…嗯~…嗯噗~…嗯哼呜~…好美味啊~、下次请射到将我的嘴巴直接填的满满的吧~${heart(1)}」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `「哈啊哈啊~…已经站都站不起来呢~。下次如果能用小穴来做就更棒了呢~${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊~哈啊~…已经腰都挺不直了呢~。太舒服了身体都要融化掉了呀${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait(
        `「啊哼唔~…尿尿好好喝~…哼哼哼~、剩下的也请全部奖赏给我吧~…嗯啾~啾唔~…啾唔呜呜~${heart(1)}」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「不错哦~干得不错噢~。看一下这里吧~、要在大姐姐的这里用你的精液射得满满的哦？」`,
        );
      } else {
        await era.printAndWait(`「只有童真金伯才能塞进肛门里呢~${heart(1)}」`);
      }
    }
  }
}

// osioki_koujo_k9：迎击失败惩罚口上，TFLAG:18 分档同 gohoubi_after 复用
async function osioki_koujo_k9(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;

  if (choice == 0) {
    await era.printAndWait(`「真、真是失礼了」`);
  } else if (choice == 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「嗯啊啊~啊~啊啊~嗯~！这个处罚~哔哩哔哩地好舒~舒~服~服~啊~啊~~！」`,
      );
    } else {
      await era.printAndWait(`「啊哈啊啊啊！已经，请原谅，请原谅我吧~~！」`);
    }
  } else if (choice == 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait(
        `「啊啊…请更加地欣赏吧，注视我在自慰的地方吧~~！啊~啊啊啊~！啊哈嗯~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「哈啊~哈啊~…这、这样下去的话…嗯~啊嗯~…嗯嗯~！」`,
      );
    }
  } else if (choice == 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait(
        `「啊呼呜~…拉了那么大一坨之后得要好好自慰一下才行了呢~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「呜~…呜呜~…呜~…不、不甘心啊…这样的真是屈辱啊………！」`,
      );
    }
  } else if (choice == 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「啊啊恩~！全部都是我的错来的~！所以请给更多的处罚吧~！啊嗯~没错就是那里~！痛得好棒啊~！」`,
      );
    } else {
      await era.printAndWait(
        `「对，对对不起~~！全部都是我的错来的~！啊~啊啊啊~！」`,
      );
    }
  } else if (choice == 5) {
    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊啊。现在的我可是便所来的噢~…没错、不多点往脸上射的话就要溅到其他地方了呀~嗯哼哼~${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「……………已经、呜呜…呜、呜呜呜、呜………」`);
    }
  } else if (choice == 6) {
    await era.printAndWait(`「哎？清洁？什么嘛这是！」`);
  } else if (choice == 7) {
    await era.printAndWait(`「…肚子饿了呢」`);
  } else if (choice == 8) {
    await era.printAndWait(
      `「已，已经不行了…胡行了啦${heart(1)} 鸡巴~${heart(1)} 塞进小穴，塞进小穴里吧~${heart(1)} 肛门也可以的啦不管是怎样的鸡巴都可以啦，快点插进来啊~${heart(1)}」`,
    );
  } else if (choice == 9) {
    await era.printAndWait(`「啊呜啊啊！」`);
  }
}

/**
 * gobi_koujo_k9：语尾口上。ARG:0 取 1-5 五档固定语尾，
 * 其余随机三选一。
 *
 * #570 起返回语尾文字、不打印（无后缀 PRINT 不换行，由调用方拼进同一行）。
 *
 * @param {number} arg0 语尾编号（ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {string} 语尾文字
 */
function gobi_koujo_k9(arg0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_0 = arg0; // ARG:0 → JS 形参 arg0，再 alias 为 arg_0

  if (arg_0 == 1) {
    return `的噢${heart(1)}`;
  } else if (arg_0 == 2) {
    return `来的哦！`;
  } else if (arg_0 == 3) {
    return `来的……。`;
  } else if (arg_0 == 4) {
    return `来的呢……。`;
  } else if (arg_0 == 5) {
    return `来的……呜呜。`;
  } else {
    if (rand_n(3) == 0) {
      return `来的。`;
    } else if (rand_n(2) == 0) {
      return `来的哦。`;
    } else {
      return `的噢~。`;
    }
  }
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_9 的等价物；重复注册抛错）
kojo_message_com_family.register(9, kojo_message_com_9);
self_kojo_family.register(9, self_kojo_k9);
kojo_message_palamcng_family.register(9, kojo_message_palamcng_9);
kojo_message_markcng_family.register(9, kojo_message_markcng_9);
gohoubi_after_koujo_family.register(9, (cid, choice) =>
  gohoubi_after_koujo_k9(undefined, cid, choice),
);
osioski_koujo_family.register(9, (cid, choice) =>
  osioki_koujo_k9(undefined, cid, choice),
);
gohoubi_request_koujo_family.register(9, () => gohoubi_request_koujo_k9());
ryouzyoku_kojo_family.register(9, dungeon_ryouzyoku_k9);
ryouzyoku_after_kojo_family.register(9, dungeon_ryouzyoku_after_k9);
gobi_koujo_family.register(9, gobi_koujo_k9);
benki_koujo_family.register(9, benki_koujo_k9);
enterenemy_koujo_family.register(9, enterenemy_koujo_k9);
dungeon_victory_family.register(9, dungeon_victory_k9);
dungeon_attack_family.register(9, dungeon_attack_k9);
ntr_koujo_family.register(9, ntr_koujo_k9);
exucution_koujo_family.register(9, exucution_koujo_k9);
museum_koujo_family.register(9, museum_koujo_k9);
banishment_koujo_family.register(9, banishment_koujo_k9);
public_exucution_koujo_family.register(9, public_exucution_koujo_k9);
grotesque_koujo_family.register(9, grotesque_koujo_k9);

module.exports = {
  kojo_message_com_9,
  dog_kojo_9,
  colosseum_kojo_9,
  k9_kojo2,
};
