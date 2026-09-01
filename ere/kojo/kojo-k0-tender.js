/**
 * @file 慈爱性格口上 K0：指令口上的爱抚 / 舔阴 / 肛门爱抚 / 自慰 / 胸爱抚 / 接吻 / 自己扒开 / 插入手指 / 舔肛 / 振动宝石 / 壶虫 / 振动杖 / 肛门虫 / 阴蒂夹 / 乳头夹 / 榨乳器 / 肛珠 / 正常位 / 背后位 / 对面座位 / 背面座位 / 正常位肛交 / 背后位肛交 / 对面座位肛交 / 背面座位肛交 / 手淫 / 口交 / 乳交 / 股间性交 / 骑乘位 / 全身擦洗 / 骑乘位肛交 / 肛门侍奉 / 打屁股 / 鞭 / 针 / 眼罩 / 绳子 / 口塞 / 灌肠+肛塞 / 放置PLAY / 交谈 / 乳夹口交 / 口交时自慰 / 手搓口交 / 真空口交 / 六九式 / 深喉 / 强制口交 / 穿环分支（issue #231）。
 *
 * 源: target/ERB/口上/EVENT_K0_慈愛.ERB  @EVENTTRAIN #PRI（:73-77，存在
 *     标志 FLAG:100）@EVENTEND #LATER（:79-81，清标志）
 *     @EVENTTRAIN NORMAL（:87-483，CFLAG:201 / 370 / 650 / 202）
 *     @K0_KOJO2（:489-595，二次调教开始）
 *     @EVENTEND NORMAL（:601-668，调教结束口上）
 *     @KOJO_MESSAGE_COM_0（:674；七道跳过判定 :676-699，**崩坏在兽奸前**；
 *     爱抚 CFLAG:301 状态机 :708-752；舔阴 CFLAG:302 状态机 :757-794；
 *     肛门爱抚 CFLAG:303 状态机 :799-856；自慰 CFLAG:304 状态机 :861-968；
 *     胸爱抚 CFLAG:306 状态机 :973-1060；接吻 CFLAG:307 状态机 :1065-1148；
 *     自己扒开 CFLAG:308 状态机 :1153-1189；插入手指 CFLAG:309 状态机 :1194-1248；
 *     舔肛 CFLAG:310 状态机 :1252-1310；振动宝石 CFLAG:311 状态机 :1314-1352；
 *     壶虫开始 CFLAG:312 :1358-1433、脱着 CFLAG:372 :1435-1450；
 *     振动杖 CFLAG:313 状态机 :1455-1499；
 *     肛门虫开始 CFLAG:314 :1505-1588、脱着 CFLAG:374 :1590-1609；
 *     阴蒂夹开始 CFLAG:315 :1615-1646、脱着 CFLAG:375 :1648-1663；
 *     乳头夹开始 CFLAG:316 :1669-1722、脱着 CFLAG:376 :1724-1739；
 *     榨乳器开始 CFLAG:317 :1745-1800、脱着 CFLAG:377 :1802-1820；
 *     肛珠开始 CFLAG:320 :1869-1942、脱着 CFLAG:379 :1944-1963；
 *     正常位 CFLAG:321 状态机 :1968-2210；
 *     背后位 CFLAG:322 状态机 :2215-2416；
 *     对面座位 CFLAG:323 状态机 :2421-2585；
 *     背面座位 CFLAG:324 状态机 :2590-2757；
 *     正常位肛交 CFLAG:327 状态机 :2762-2854；
 *     背后位肛交 CFLAG:328 状态机 :2859-2968；
 *     对面座位肛交 CFLAG:329 状态机 :2973-3074；
 *     背面座位肛交 CFLAG:330 状态机 :3079-3189；
 *     手淫 CFLAG:331 状态机 :3194-3288；
 *     口交 CFLAG:332 状态机 :3293-3376；
 *     乳交 CFLAG:333 状态机 :3381-3456；
 *     股间性交 CFLAG:334 状态机 :3461-3506；
 *     骑乘位 CFLAG:335 状态机 :3511-3793；
 *     全身擦洗 CFLAG:336 状态机 :3800-3835；
 *     骑乘位肛交 CFLAG:337 状态机 :3840-3955；
 *     肛门侍奉 CFLAG:338 状态机 :3960-4001；
 *     打屁股 CFLAG:341 状态机 :4006-4037；
 *     鞭 CFLAG:342 状态机 :4042-4105；
 *     针 CFLAG:343 状态机 :4110-4170；
 *     眼罩开始 CFLAG:344 :4176-4212、脱着 CFLAG:380 :4214-4225；
 *     绳子开始 CFLAG:345 :4231-4298、脱着 CFLAG:385 :4300-4315；
 *     口塞开始 CFLAG:346 :4321-4357、脱着 CFLAG:386 :4359-4370；
 *     灌肠+肛塞开始 CFLAG:347 :4376-4424、脱着 RAND 拼句 :4427-4497；
 *     放置PLAY CFLAG:356 :4510-4638；
 *     交谈 CFLAG:357 :4645-4758，二次不写 CFLAG，录像支 TFLAG:32 |= 2；
 *     乳夹口交 CFLAG:360 :4763-4838；口交时自慰 CFLAG:361 :4842-4897；
 *     手搓口交 CFLAG:362 :4902-4957；真空口交 CFLAG:363 :4963-5018；
 *     六九式 CFLAG:364 :5023-5076；深喉 CFLAG:365 :5081-5138（二次门槛读 CFLAG:363）；
 *     强制口交 CFLAG:381 :5143-5192；
 *     穿环 CFLAG:348 :5199-5475，部位位域 CFLAG:7 & piercing_state.p）
 *
 * == 状态机（CFLAG:301，个位数推进） ==
 *
 * 与 K5 同构：初回 → 1；二回目以降按「淫乱(76) → 爱慕(85) → 屈服刻印Lv3
 * → Lv2 → それ以外(MARK:2 <= 1)」取首个命中，各支门槛 CFLAG:301 <=
 * 5/4/3/2/1，写入 6/5/4/3/2——FLAG:7 == 2（默认）时上限被旁路、同支每次
 * 出声；FLAG:7 == 1 时逐阶段各出一次声。无随机分支。
 *
 * 自慰（CFLAG:304）二回目以降按「淫乱+处女 → 淫乱+自慰中毒Lv3 → 淫乱+中毒不足
 * → 爱慕+处女 → 爱慕+中毒Lv3 → 爱慕+中毒不足 → 屈服Lv3+中毒Lv1 → それ以外」
 * 取首个命中；中毒 Lv3 支含拍摄拼接与 RAND:3/RAND:2。
 *
 * 守卫顺序照 K0 原文（:676-699）：死斗场 → 助手调教 → 口塞 → 失神 →
 * 崩坏 → 兽奸（专用口上）→ 触手。与 K3（兽奸在崩坏前）不同，各文件 1:1。
 *
 * 这张票第一刀存根（docs/stub-registry.md）：COLOSSEUM_KOJO_0 / DOG_KOJO_0
 * 与 SELECTCOM 尚未落地的其余指令分支（后续切片填文本）。其余 SELECTCOM：
 * 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22,
 * 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43,
 * 44, 45, 46, 55, 56（17 在原文已注释；口系 69/80/123–127 与穿环 87 已落地）。
 */

const era = require('#/era-electron');

const { on, TIER } = require('#/system/event/registry');
const { piercing_state } = require('#/system/train/com-hardcore');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { kojo_message_com_family } = require('#/kojo/kojo-system');
const {
  heart,
  heart_black,
  self_call,
  self_call_first,
} = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');

const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['COLOSSEUM_KOJO_0', 'DOG_KOJO_0', 'KOJO_MESSAGE_COM_0'];

// @EVENTTRAIN #PRI（:73-77）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_0 = 1; // :75 FLAG:100 = 1（K0 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :77
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:79-81）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_0 = 0; // :81
  },
  TIER.LATER,
);

/**
 * @K0_KOJO2（:489-595）：无助手 / 非村娘助手时的二次调教开始口上。
 *
 * 崩坏 → 反抗刻印 Lv3 → 屈服 Lv0–3（均可叠故乡恋人 TALENT:317 == 4）→
 * 淫乱 RAND:3/RAND:2 → 爱慕 RAND:3/RAND:2。各支都要 FLAG:7 == 2。
 *
 * @param {function(number): number} [rand]
 * @returns {Promise<number>}
 */
async function k0_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const sc = () => self_call(target);
  const master_name = chara_name(0);

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    // :491
    era.drawLine(); // :492
    await era.printAndWait(`「嘻嘻～…嘻～…请不要打扰我的祈祷…嘻～…嘻～」`); // :493
    await era.printAndWait(
      `已经无法期待精神崩坏的${target_name}做出什么正常的反应了吧……`,
    ); // :494-495
    return 1;
  } else if (chara(target).system.反抗刻印 === 3 && game.kojo.口上开关 === 2) {
    era.drawLine(); // :498-499
    await era.printAndWait(`「不可原谅…绝对…！」`); // :500-501
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :504-505
    await era.printAndWait(`「没用的…${sc()}不会认输的…」`); // :506

    if (chara(target).chara.喜欢的东西 === 4) {
      // :508
      await era.printAndWait(`（啊啊…无论发生什么…${sc()}都会与你同在……）`); // :509
      await era.printAndWait(`${target_name}像是在向故乡的恋人祈祷的样子………`); // :510
    }
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :515-516
    await era.printAndWait(`「…这样就可以了吧」`); // :517

    if (chara(target).chara.喜欢的东西 === 4) {
      // :519
      await era.printAndWait(`「即使被做了这样的事${sc()}也不会认输的………」`); // :520
      await era.printAndWait(`（拜托了…赐予${sc()}力量………）`); // :521
      await era.printAndWait(`${target_name}像是在向故乡的恋人祈祷的样子………`); // :522
    }
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :527-528
    await era.printAndWait(`「…这也是爱吗…？」`); // :529

    if (chara(target).chara.喜欢的东西 === 4) {
      // :531
      await era.printAndWait(
        `（被这样的玷污…即便说是为了活下去…也没脸去见他了………）`,
      ); // :532
      await era.printAndWait(
        `${target_name}是想起了故乡的恋人吧、现在快要哭出来的样子………`,
      ); // :533
    }
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 3 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :538-539

    if (chara(target).chara.喜欢的东西 === 4) {
      // :541
      await era.printAndWait(
        `「请再…温柔一点…我不会抵抗的、所以…啊啊～………！」`,
      ); // :542
      await era.printAndWait(`（啊啊…${sc()}…已经不行了…对不起……）`); // :543
      await era.printAndWait(
        `${target_name}一边想着故乡的恋人一边抱住了${player_name}………`,
      ); // :544
    } else {
      await era.printAndWait(`「请再…疼爱我吧…」`); // :545-546
      if (era.get(`talent:${target}:75`) === 1) {
        // :547
        await era.printAndWait(
          `「身体…躁动的没办法了…求你了…我什么都会做的…${heart(1)}」`,
        ); // :548
        await era.printAndWait(
          `${target_name}的脑袋里已经只剩下做爱的念头了………`,
        ); // :549
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine(); // :555-556

    if (rand_n(3) === 0) {
      // :558
      await era.printAndWait(
        `「啊～…主人…请让我好好侍奉您那出色的大肉棒吧…${heart(1)}」`,
      ); // :559
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        // :560-561
        await era.printAndWait(
          `「所以呢…请赐我精液～…我想要精液～…满满地淋过来吧…${heart(1)}」`,
        ); // :560-561
      }
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「啊～～…嗯～…嗯唔～…小穴好舒服啊…${heart(1)}」`); // :562-563
      await era.printAndWait(
        `${target_name}毫不在意${master_name}的到来沉溺于自慰之中。`,
      ); // :564
      if (era.get(`talent:${target}:75`) === 1) {
        // :565-566
        await era.printAndWait(
          `「肉棒…想要～…想被坚挺出色的大肉棒哧噗哧噗地插来插去啊${heart(1)}」`,
        ); // :565-566
      }
    } else {
      await era.printAndWait(
        `「快点～…快点来吧！想要主人想得受不了了～${heart(1)}」`,
      ); // :567-568
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        // :569-570
        await era.printAndWait(
          `「精液还不够…喉咙好渴～…忍不住了～…请再给我精液吧～${heart(1)}」`,
        ); // :569-570
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine(); // :575-576

    if (rand_n(3) === 0) {
      // :578
      await era.printAndWait(`「哈哈、给了我好多的爱呢」`); // :579
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        // :580-581
        await era.printAndWait(
          `「主人的爱…精液还不够…渴的没办法了………请给我精液～${heart(1)}」`,
        ); // :580-581
      }
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「请给我…更多的爱…」`); // :582-583
      if (era.get(`talent:${target}:75`) === 1) {
        // :584
        await era.printAndWait(
          `「啊啊…请把主人的精液…满满地赐给${sc()}淫荡而爽的不行的小穴吧～…${heart(1)}」`,
        ); // :585
        await era.printAndWait(
          `淫靡的笑着的${target_name}、脑袋里已经被肉欲支配了………`,
        ); // :586
      }
    } else {
      await era.printAndWait(`「请给我、更多。干个爽吧」`); // :588-589
      if (era.get(`talent:${target}:75`) === 1) {
        // :590-591
        await era.printAndWait(
          `「真是的…一整天都在想着小穴的事情…${heart(1)} 你可要负起责任哦…${heart(1)}」`,
        ); // :590-591
      }
    }
    return 1;
  }
  return 0;
}

// @EVENTTRAIN NORMAL（:87-483）：初调教 / 魔族化 / NTR 再捕获 / 屈服刻印 /
// 淫乱 / 爱慕 / 崩坏 / 村娘助手 / 二次口上。
on('EVENTTRAIN', async (rand) => {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const master_name = chara_name(0);
  const kojo = chara(target).kojo;
  const assi = era_flag.assi;
  const assi_name = assi >= 0 ? chara_callname(assi) : '';

  if (game.kojo.口上开关 <= 0) {
    // :88-89
    return 0;
  }
  if (chara(target).chara.慈爱 !== 1) {
    // :90-91
    return 0;
  }
  if (kojo.初调教 === 0) {
    // :96
    era.drawLine(); // :97
    if (chara(target).chara.种族 === 1) {
      // :99
      await era.printAndWait(`「请、请不要再做出那样的野蛮暴行了！」`); // :100
      await era.printAndWait(
        `${target_name}直到现在还摆出高高在上的嘴脸说教着。`,
      ); // :101
      await era.printAndWait(`只是想想如何去玷污这个女精灵你就猛地硬了起来………`); // :102
      kojo.初调教 = 1; // :103
      return 1;
    } else if (chara(target).chara.种族 === 2) {
      await era.printAndWait(`「快、快点把${sc()}放出去、这也是为了你好。」`); // :105-106
      await era.printAndWait(`这个女狼人好像还在担心你的业报的样子。`); // :107
      await era.printAndWait(`看来你必须好好告诉她这些担心都是无意义的………`); // :108
      kojo.初调教 = 1; // :109
      return 1;
    } else if (chara(target).chara.种族 === 3) {
      await era.printAndWait(
        `「接受${sc()}的”吻”成为${sc()}的下仆吧。我会消除你的痛苦和烦恼的。」`,
      ); // :111-112
      await era.printAndWait(
        `这个吸血鬼毫不在意被完全囚禁的事实，还显得游刃有余的样子。`,
      ); // :113
      await era.printAndWait(`好像她对自己的”吻”很有自信呢。`); // :114
      await era.printAndWait(`你涌起了一股把那份自信击溃得体无完肤的冲动………`); // :115
      kojo.初调教 = 1; // :116
      return 1;
    } else if (chara(target).chara.种族 === 4) {
      await era.printAndWait(`「你觉得${sc()}会变成你想要的那样吗？」`); // :118-119
      await era.printAndWait(
        `身为无头骑士的${target_name}还很游刃有余的样子。………`,
      ); // :120
      kojo.初调教 = 1; // :121
      return 1;
    } else if (chara(target).chara.种族 === 5) {
      await era.printAndWait(`「${scf()}、${sc()}才不会变成你想要的那样！！」`); // :123-124
      await era.printAndWait(`「要是我认真起来的话，区区你这种程度的魔王………」`); // :125
      await era.printAndWait(`被捕获的龙族少女还是一副刚强不屈的样子………`); // :126
      kojo.初调教 = 1; // :127
      return 1;
    } else if (chara(target).chara.种族 === 6) {
      await era.printAndWait(
        `「虽然你做出了那么多的愚行、但伟大的天神还是会原谅你的」`,
      ); // :129-130
      await era.printAndWait(`身为天使的${target_name}平静地这样说道。`); // :131
      await era.printAndWait(
        `那就让你亲身体会一下，活在这地底下意味着什么吧………`,
      ); // :132
      kojo.初调教 = 1; // :133
      return 1;
    } else if (chara(target).chara.种族 === 9) {
      await era.printAndWait(
        `${target_name}因为悲叹自己堕落成魔族而哭得眼睛都红肿了。`,
      ); // :135-136
      await era.printAndWait(`但是注意到你来了之后，还是强打精神瞪视着你。`); // :137
      await era.printAndWait(
        `「${scf()}、${sc()}…即便被变成了魔族…也绝对…绝对不会服从你的…！」`,
      ); // :138
      await era.printAndWait(
        `可是变成魔族的她、已经开始从本能上感觉到无法违抗身为魔族之王的你了………`,
      ); // :139
      kojo.初调教 = 1; // :140
      kojo.魔族化 = 1; // :142
      return 1;
    } else if (chara(target).chara.种族 === 10) {
      await era.printAndWait(`「请、请不要做、奇、奇怪的事情…」`); // :144-145
      await era.printAndWait(
        `${target_name}被周围的气氛所震慑、失去了有生具来的开朗………`,
      ); // :146
      kojo.初调教 = 1; // :147
      return 1;
    } else if (chara(target).chara.种族 === 11) {
      await era.printAndWait(`「不要对别人做过分的事情～！」`); // :149-150
      await era.printAndWait(
        `${target_name}毫不在意自己被抓住的事实仍在发挥着天生的正义感。`,
      ); // :151
      await era.printAndWait(
        `只是想想如何去玷污这样的女矮人你就猛地硬了起来………`,
      ); // :152
      kojo.初调教 = 1; // :153
      return 1;
    } else {
      await era.printAndWait(
        `「你一定是有什么搞错了…为什么…要做出这样的事情…」`,
      ); // :155-156
      await era.printAndWait(`「${sc()}愿意代替其他人受过…所以你能不能…」`); // :157
      await era.printAndWait(`${target_name}似乎还相信你有慈悲心的样子。`); // :158
      await era.printAndWait(`只是想想如何去玷污这样的对象你就猛的硬了起来………`); // :159
      kojo.初调教 = 1; // :160-161
      return 1;
    }
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    chara(target).chara.种族 === 9 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    await era.printAndWait(
      `被多次改造已经完全变成了魔族的${target_name}在房间的角落里抱着膝盖哭泣着。`,
    ); // :166-167
    await era.printAndWait(
      `发觉你来了之后、${target_name}顾不上擦眼泪就这样瞪视着你。`,
    ); // :168
    await era.printAndWait(
      `「无论被怎样玷污…我也不会成为你的东西的…不会的………！」`,
    ); // :169
    await era.printAndWait(
      `可是变成魔族的她、已经开始从本能上感觉到无法违抗身为魔族之王的你了………`,
    ); // :170
    kojo.魔族化 = 2; // :172-173
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :177-178
      era.drawLine(); // :179
      await era.printAndWait(
        `一告诉她你已经看过那些水晶球的内容之后，${target_name}的脸色就就变了。`,
      ); // :180
      await era.printAndWait(
        `「魔、魔王大人…我、${sc()}…${sc()}对…您…您的事情可是连一秒钟也不敢忘记啊～」`,
      ); // :181
      await era.printAndWait(
        `「无论什么样的惩罚我都愿意接受、即使您不原谅我也好…但、但是…求你让我继续待在您的身边吧…啊啊啊～！」`,
      ); // :182
      await era.printAndWait(
        `从她的唯唯诺诺中你越发窥见到她在狂王那里接受了怎样的调教。${master_name}的心中嫉妒的火焰在熊熊燃烧………`,
      ); // :183
      kojo.NTR再捕获 = 0; // :185
    } else {
      era.drawLine(); // :186-187
      await era.printAndWait(`「又被你抓住了」`); // :188
      await era.printAndWait(
        `「既被狂王玷污、又被你玷污………看来${sc()}的命运也就到此为止了…………」`,
      ); // :189
      await era.printAndWait(`看起来${target_name}已经接受了自己的命运………`); // :190
      kojo.NTR再捕获 = 0; // :192
    }
    return 1;
  } else if (
    kojo.初调教 < 2 &&
    chara(target).system.屈服刻印 === 1 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :199-200
    await era.printAndWait(`「能不能不要…再让我做这些事了…你觉得怎样呢………」`); // :201
    await era.printAndWait(`（不行…明明知道这样很奇怪…）`); // :202
    kojo.初调教 = 2; // :203-204
    return 1;
  } else if (
    kojo.初调教 < 3 &&
    chara(target).system.屈服刻印 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :207-208
    await era.printAndWait(`「这样如何呢…${sc()}…」`); // :209
    await era.printAndWait(`（明明应该很讨厌这样的事情的…）`); // :210
    kojo.初调教 = 3; // :211-212
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    chara(target).system.屈服刻印 === 3 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :215-216
    await era.printAndWait(`「好的…立刻…准备………」`); // :217
    await era.printAndWait(`（已经…无法抵抗了…）`); // :218
    kojo.初调教 = 4; // :219-220
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) === 1 &&
    chara(target).chara.种族 !== 9
  ) {
    era.drawLine(); // :223-224
    await era.printAndWait(
      `「主、主人…${sc()}是…你的色情宠物…请随您的喜好…尽情使用${sc()}的身体吧…♪」`,
    ); // :225
    await era.printAndWait(
      `这样说着的${target_name}四肢伏地、向着你撅起了屁股…那个隐秘的地方已经非常湿润了………`,
    ); // :226
    await era.printAndWait(
      `曾被称呼为圣女的${target_name}已经沉溺于肉欲里了………`,
    ); // :227
    kojo.初调教 = 5; // :228-229
    return 1;
  } else if (
    chara(target).chara.种族 === 9 &&
    kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) === 1
  ) {
    era.drawLine(); // :231-232
    if (kojo.魔族化 === 1) {
      // :234
      await era.printAndWait(`「啊…魔王大人………${heart(1)}」`); // :235
      await era.printAndWait(
        `转生成为魔族、被多次调教的${target_name}已经完全陷落了。`,
      ); // :236
      await era.printAndWait(
        `魔族的眼睛散发着淫荡的光泽、只是因为看到你、两腿之间的爱液就流了出来、好像害羞似地摩擦着双腿。`,
      ); // :237
      if (era.get(`talent:${target}:0`) === 1) {
        // :239-240
        await era.printAndWait(
          `「魔王大人、快点、用您那出色、持久、暴虐的大鸡鸡…将${sc()}最后残存的一丝清纯给玷污掉吧${heart(1)}」`,
        ); // :239-240
      }
      if (era.get(`talent:${target}:0`) === 1) {
        // :242-243
        await era.printAndWait(
          `看起来${target_name}已经无法压抑住兴奋之情了………`,
        ); // :242-243
      }
      await era.printAndWait(`「从此以后也会一直侍奉魔王大人的…${heart(1)}」`); // :244
      await era.printAndWait(
        `${target_name}一边抱着${master_name}一边冲着耳根呼出了灼热的气息。那股气息里面包含着能让一般男人射精的魔力。`,
      ); // :245
      await era.printAndWait(
        `「啊…请快点…命令作为魔王大人淫乱的仆人的${target_name}吧…${heart(1)}」`,
      ); // :246
      kojo.初调教 = 6; // :247-248
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(`「啊啊…魔王大人………${heart(1)}」`); // :250-251
      await era.printAndWait(
        `转生成为魔族、被多次调教的${target_name}已经完全陷落了。`,
      ); // :252
      await era.printAndWait(
        `魔族的眼睛淫荡的湿润了、只是因为看见你两腿之间的爱液就已经流了出来。她害羞地摩擦着双腿。`,
      ); // :253
      if (era.get(`talent:${target}:0`) === 1) {
        // :255-256
        await era.printAndWait(
          `「请魔王大人用那漂亮而暴虐的鸡鸡…快点把${sc()}最后残留下来的清纯玷污吧${heart(1)}」`,
        ); // :255-256
      }
      if (era.get(`talent:${target}:0`) === 1) {
        // :258-259
        await era.printAndWait(
          `看起来${target_name}已经无法压抑住兴奋之情了………`,
        ); // :258-259
      }
      await era.printAndWait(`「从此以后也会一直…侍奉魔王大人的…${heart(1)}」`); // :260
      await era.printAndWait(
        `${target_name}一边抱着${master_name}一边往${master_name}的耳根呵着热气。那股气息里面包含着能让一般男人射精的魔力。`,
      ); // :261
      await era.printAndWait(
        `「啊啊…请快点…对身为魔王大人淫乱下仆的${target_name}下命令吧…${heart(1)}」`,
      ); // :262
      kojo.初调教 = 6; // :263-264
      return 1;
    } else {
      await era.printAndWait(
        `「啊啊啊…${heart(1)} 变成这个身体之后就能清楚地感觉到…${sc()}一直以来被魔王大人的魔力所侵占的样子呢…${heart(1)}」`,
      ); // :266-267
      await era.printAndWait(
        `${target_name}的一边淫靡地笑着一边舔了舔舌头。这是从以前的模样上无法想象到的下流动作。`,
      ); // :268
      await era.printAndWait(
        `「虽然被改造挺恐怖的、不过、额呵呵、拜其所赐心情变得非常清爽了呢………${heart(1)}」`,
      ); // :269
      await era.printAndWait(
        `${target_name}屁股着地坐到地板上将两条腿大大地张开。`,
      ); // :270
      await era.printAndWait(
        `「从此以后…宣誓对魔王大人永远效忠…请随您的喜好来使用我吧${heart(1)}」`,
      ); // :271
      if (era.get(`talent:${target}:0`) !== 1) {
        // :272-273
        await era.printAndWait(
          `「啊啊～真是的…已经忍不住了…请使用${sc()}的魔族小穴吧～${heart(1)} 一定一定会非常舒服的哦～${heart(1)}」`,
        ); // :272-273
      }
      kojo.初调教 = 6; // :274-275
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) === 1 &&
    chara(target).chara.种族 !== 9
  ) {
    era.drawLine(); // :280-281
    await era.printAndWait(`（那个人…怎么会…难道…）`); // :282
    await era.printAndWait(
      `${target_name}意识到了自己无时无刻不在想着你的事情……`,
    ); // :283
    await era.printAndWait(
      `你的声音、你的样貌、你的手腕、你的身体…于是、她下定了决心………`,
    ); // :284
    await era.printAndWait(`………………`); // :285
    await era.printAndWait(
      `在调教房间里看到你的${target_name}用纯洁圣女般的表情微笑着。`,
    ); // :286
    await era.printAndWait(`「主人…${sc()}…${sc()}是你的所有物…」`); // :287
    await era.printAndWait(
      `${target_name}抱住了你，含情脉脉的用脸颊蹭着你的身体………`,
    ); // :288
    await era.printAndWait(`「让我永远陪在您的身边…好不好…………」`); // :289
    kojo.初调教 = 7; // :290-291
    return 1;
  } else if (
    chara(target).chara.种族 === 9 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :293-294
    if (kojo.魔族化 === 1) {
      // :296
      await era.printAndWait(`（啊…这份心情…无法抑制………！）`); // :297
      await era.printAndWait(
        `${target_name}在经过多次的调教后陷入${master_name}魔力的影响下而不可自拔、也就是说………`,
      ); // :298
      await era.printAndWait(
        `「魔王大人…我爱你、一定是为了变成这样，${sc()}才来到了这里………${heart(1)}」`,
      ); // :299
      await era.printAndWait(
        `即使那种心情是因为调教和肉体的变化才产生的也没办法吧。`,
      ); // :300
      await era.printAndWait(
        `「啊啊～♪…${sc()}已经…光是待在魔王大人的身边就感到很满足了………${heart(1)}」`,
      ); // :301
      kojo.初调教 = 8; // :302-303
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(`（啊啊…这份心情…无法抑制………！）`); // :305-306
      await era.printAndWait(
        `${target_name}在经过多次的调教后、转生为了魔族、`,
      ); // :307
      await era.printAndWait(
        `陷入${master_name}魔力的影响下而不可自拔、也就是说………`,
      ); // :308
      await era.printAndWait(
        `「魔王大人…我爱你、${sc()}的心和身体、都是属于你的…${heart(1)}」`,
      ); // :309
      await era.printAndWait(
        `即使那种心情是因为调教和肉体的变化才产生的也没办法吧。`,
      ); // :310
      await era.printAndWait(
        `「啊啊～♪…${sc()}已经…光是待在魔王大人的身边就感到很满足了………${heart(1)}」`,
      ); // :311
      kojo.初调教 = 8; // :312-313
      return 1;
    } else {
      await era.printAndWait(
        `「这样的话…就可以一直和您在一起了！好开心…好开心…啊啊！」`,
      ); // :315-316
      await era.printAndWait(`${target_name}因为变成魔族流出了喜悦的泪水。`); // :317
      await era.printAndWait(
        `「能更强烈地感觉到您的存在了呢…${sc()}好像已经…变得有点奇怪了呢………${heart(1)}」`,
      ); // :318
      await era.printAndWait(
        `${target_name}激动地几乎要站不住了、抱住了${master_name}。`,
      ); // :319
      if (era.get(`talent:${target}:0`) === 1) {
        // :320-321
        await era.printAndWait(`「请收下${sc()}的处女吧…就在今天好不好………？」`); // :320-321
      }
      if (era.get(`talent:${target}:0`) === 1) {
        // :322-323
        await era.printAndWait(
          `「啊啊…说出如此下流的话真是非常抱歉…${heart(1)}」`,
        ); // :322-323
      }
      kojo.初调教 = 8; // :324-325
      return 1;
    }
  } else if (era.get(`talent:${target}:9`) === 1 && kojo.初调教 < 9) {
    era.drawLine(); // :329-330
    await era.printAndWait(`${target_name}面向屋子的角落向神祈祷着。`); // :331
    await era.printAndWait(`祈祷完毕之后${target_name}把脸转向了你。`); // :332
    await era.printAndWait(
      `那个时候才发现、她所祈祷的对象只是放在屋子角落里代替便器的壶………`,
    ); // :333
    kojo.初调教 = 9; // :334-335
    return 1;
  } else if (assi < 0) {
    await k0_kojo2(rand); // :339-340
  } else if (assi === 17) {
    era.drawLine(); // :349-351
    if (era.get(`talent:${assi}:165`)) {
      // :352
      if (kojo.简易助手_0 === 0) {
        // :354
        if (era.get(`talent:${target}:9`) === 1) {
          // :356
          await era.printAndWait(`『…主人、这个人已经坏掉了哟』`); // :357
        } else if (era.get(`talent:${target}:76`) === 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `一看到${master_name}所带来的${assi_name}，${target_name}就舔了舔嘴唇。`,
          ); // :359-360
          await era.printAndWait(
            `「啊啊…看起来今天要三个人一起快活呢…${heart(1)} 我想这一定会很美妙的」`,
          ); // :361
          await era.printAndWait(
            `看起来${target_name}的脑袋里只有和本来应该作为拯救对象的少女，一起做爱的念头。`,
          ); // :362
          await era.printAndWait(
            `「那么过来吧…${heart(1)} ${self_call(assi)}会好好疼爱你的…${heart(1)}」`,
          ); // :363
          if (era.get(`talent:${assi}:76`) === 1) {
            // :364-365
            era.setColor('#ffccff'); // :364-365
          }
          await era.printAndWait(
            `『哈哈～…这位姐姐干起来真是爽过头了啊…${heart(1)}』`,
          ); // :366
          era.setColor(''); // :367
        } else if (era.get(`talent:${target}:85`) === 1 && kojo.初调教 >= 7) {
          await era.printAndWait(
            `一看见${master_name}所带来的${assi_name}，${target_name}就露出了有点惊讶的表情。`,
          ); // :369-370
          await era.printAndWait(
            `「啊啦…在村子里听说过这个孩子呢…这样啊…果然还是变成了你的东西呢………」`,
          ); // :371
          await era.printAndWait(
            `${target_name}叹气之后、稍微有点生气的撅起了嘴。`,
          ); // :372
          await era.printAndWait(
            `「呵呵呵…就比一比你和${sc()}、谁更爱着主人吧${heart(1)}」`,
          ); // :373
          if (era.get(`talent:${assi}:85`) === 1) {
            // :374-375
            era.setColor('#ffccff'); // :374-375
          }
          await era.printAndWait(
            `『虽然很明显是一边倒的胜负…但还是想让你充分明白这一点、这位姐姐${heart(1)}』`,
          ); // :376
          era.setColor(''); // :377
        } else {
          await era.printAndWait(
            `一看到${master_name}所带来的${assi_name}，${target_name}的脸就僵住了。`,
          ); // :379-380
          await era.printAndWait(
            `「啊啊…那个孩子是邻村的…你…对这样的小孩子都下手………！」`,
          ); // :381
          await era.printAndWait(
            `${assi_name}一边看着害怕着的${target_name}一边笑了笑。`,
          ); // :382
          era.setColor('#ffccff'); // :383
          await era.printAndWait(`『勇者大人啊…和我一起玩一会儿吧…？』`); // :384
          era.setColor(''); // :385
        }
        kojo.简易助手_0 = 1; // :387-388
        return 1;
      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {
        if (era.get(`talent:${target}:9`) === 1) {
          // :390-392
          await era.printAndWait(`『既然已经坏了…再弄坏一点也没问题吧★』`); // :393
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊啦～…今天又是来见这位姐姐的吗？」`); // :395-396
          await era.printAndWait(
            `已经整理好着装的${target_name}对${assi_name}笑了笑。`,
          ); // :397
          if (era.get(`talent:${assi}:85`) === 1) {
            // :398-399
            era.setColor('#ffccff'); // :398-399
          }
          await era.printAndWait(
            `『才、才不是因为那个原因呢…只是想和姐姐比试一下而已！』`,
          ); // :400
          era.setColor(''); // :401
          await era.printAndWait(
            `「额呵呵～…今天也要两个人一起好好侍奉亲爱的主人呢${heart(1)}」`,
          ); // :402
          await era.printAndWait(
            `${target_name}一边露出陶醉的表情，一边轻轻地用嘴唇蹭着${assi_name}的脸颊………`,
          ); // :403
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈哈～…今天也要三个人在一起快活呢…${heart(1)}」`,
          ); // :405-406
          await era.printAndWait(
            `${target_name}目光如水、声音中难掩兴奋之情。`,
          ); // :407
          if (era.get(`talent:${assi}:76`) === 1) {
            // :408-409
            era.setColor('#ffccff'); // :408-409
          }
          await era.printAndWait(
            `『嗯～…和主人一起把姐姐彻彻底底的侵犯吧…${heart(1)}』`,
          ); // :410
          era.setColor(''); // :411
          await era.printAndWait(
            `「啊…真棒呢…${sc()}…想和更多更多的人做爱呢…来吧…来吧${heart(1)}」`,
          ); // :412
          await era.printAndWait(
            `${target_name}像狗一样四肢趴在地上并且把屁股高高撅起，而且还下流地左右摇晃着。`,
          ); // :413
          await era.printAndWait(
            `看起来因为期待着被${master_name}和少女玩弄，下体开始湿润了………`,
          ); // :414
        } else {
          await era.printAndWait(
            `「请、请不要再做这样的事情了…为、为了你好才这么说的…！」`,
          ); // :416-417
          await era.printAndWait(
            `${target_name}回想起了被${assi_name}玩弄的事情，身体颤抖不已。`,
          ); // :418
          era.setColor('#ffccff'); // :419
          await era.printAndWait(
            `『只是和我一起玩玩而已嘛…再玩玩吧…勇者大人…${heart(1)}』`,
          ); // :420
          era.setColor(''); // :421
          await era.printAndWait(`前勇者手足无措的被少女推倒了………`); // :422
        }
        return 1;
      }
    } else {
      await k0_kojo2(rand); // :427-428
    }
  } else {
    await k0_kojo2(rand); // :481-482
  }
});

// @EVENTEND NORMAL（:601-668）：调教结束口上。死亡（BASE:0 <= 0）跳过。
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const master_name = chara_name(0);

  if (game.kojo.口上开关 <= 0) {
    // :602-603
    return 0;
  }
  if (chara(target).chara.慈爱 !== 1) {
    // :604-605
    return 0;
  }

  if (chara(target).dungeon.体力 <= 0) {
    // :608-609
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    // :615
    era.drawLine(); // :616
    await era.printAndWait(
      `「啊啊啊…啊啊…没法再祈祷下去了…${scf()}、${sc()}…啊、啊啊啊啊………」`,
    ); // :617
    await era.printAndWait(`${target_name}眼神空虚、喃喃的说着什么………`); // :618-619
    return 1;
  } else if (
    chara(target).system.反抗刻印 === 3 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :621-622
    await era.printAndWait(`${target_name}对${master_name}视若无睹`); // :623-624
    return 1;
  } else if (
    chara(target).system.屈服刻印 <= 1 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :627-628
    await era.printAndWait(`「你真是、无可药救了…」`); // :629-630
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :633-634
    await era.printAndWait(`「这就是…你的爱吗…？」`); // :635-636
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 3 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine(); // :639-640
    await era.printAndWait(`「请…疼爱${sc()}吧…」`); // :641-642
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    chara(target).dungeon.体力 >= 500
  ) {
    era.drawLine(); // :645-646
    await era.printAndWait(
      `「再…再继续做嘛…请把小穴操到要发疯吧～…${heart(1)}」`,
    ); // :647-648
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    chara(target).dungeon.体力 <= 500
  ) {
    era.drawLine(); // :650-651
    await era.printAndWait(`「嗯～…啊…小穴～…最爽了…${heart(1)}」`); // :652
    await era.printAndWait(`${target_name}神情荡漾…`); // :653-654
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    chara(target).dungeon.体力 >= 500
  ) {
    era.drawLine(); // :657-658
    await era.printAndWait(`「哈哈～、太好了…」`); // :659-660
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    chara(target).dungeon.体力 <= 500
  ) {
    era.drawLine(); // :662-663
    await era.printAndWait(`「爱…好沉重呢」`); // :664
    await era.printAndWait(`${target_name}红着脸神情陶醉的躺在床上………`); // :665-666
    return 1;
  }
  return 0;
});

/**
 * @KOJO_MESSAGE_COM_0（:674-5475）：七道跳过判定 + 爱抚 / 舔阴 / 肛门爱抚 / 自慰 / 胸爱抚 / 接吻 / 自己扒开 / 插入手指 / 舔肛 / 振动宝石 / 壶虫 / 振动杖 / 肛门虫 / 阴蒂夹 / 乳头夹 / 榨乳器 / 肛珠 / 正常位 / 背后位 / 对面座位 / 背面座位 / 正常位肛交 / 背后位肛交 / 对面座位肛交 / 背面座位肛交 / 手淫 / 口交 / 乳交 / 股间性交 / 骑乘位 / 全身擦洗 / 骑乘位肛交 / 肛门侍奉 / 打屁股 / 鞭 / 针 / 眼罩 / 绳子 / 口塞 / 灌肠+肛塞 / 放置PLAY / 交谈 / 乳夹口交 / 口交时自慰 / 手搓口交 / 真空口交 / 六九式 / 深喉 / 强制口交 / 穿环。
 *
 * 守卫顺序照 K0 原文（:676-699）：死斗场 → 助手调教 → 口塞 → 失神 →
 * 崩坏 → 兽奸（专用口上）→ 触手。
 *
 * 分发族以 args: [rand] 统一传随机源（自慰支 RAND:3 / RAND:2）。
 *
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_0(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%
  // %阴核(TARGET)%（魔改新增/文本校正.ERB @阴核）：TALENT:122 则「阴茎」否则「阴核」
  const clitoris_word = (cid) =>
    (era.get(`talent:${cid}:122`) || 0) !== 0 ? '阴茎' : '阴核';
  const master_name = chara_name(0); // %NAME:MASTER%（MASTER 恒角色 0）
  const kojo = chara(target).kojo;

  // :676-678 死斗场中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    stub_line('COLOSSEUM_KOJO_0', '死斗场专用口上', '随死斗场票');
    return 0;
  }
  // :681-682 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :684-685 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :687-688 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // :690-691 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // :693-695 兽奸PLAY中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    stub_line('DOG_KOJO_0', '兽奸专用口上', '随兽奸票');
    return 0;
  }
  // :698-699 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // :708 IF SELECTCOM == 0（爱抚）。其余指令分支随后续切片

  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // :710-721 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // :712-719 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait('「啊啊…我会、老实的…所以…啊～啊啊～！」'); // :713
        await era.printAndWait(`${target_name}乖乖的被你爱抚着身体………`); // :714
      } else {
        await era.printAndWait('「你的爱是虚假的」'); // :717
        await era.printAndWait(`${target_name}紧锁眉头、蜷缩着身体………`); // :718
      }
      kojo.爱抚 = 1; // :720
      return 0;
    }

    // :723-750 二回目以降

    // :725-728 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊～…额呵呵…那个地方…再多摸摸…${heart(1)}」`); // :726
      await era.printAndWait(`只是稍微摸了摸${target_name}她就把持不住了………`); // :727
      kojo.爱抚 = 6; // :728
    } else if (
      // :730-733 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「再来…请把我揉得乱七八糟吧……！」'); // :731
      await era.printAndWait(
        `${target_name}像引诱${player_name}的手似的扭着身体………`,
      ); // :732
      kojo.爱抚 = 5; // :733
    } else if (
      // :735-738 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…哈啊…啊啊啊～」'); // :736
      await era.printAndWait(`${target_name}的嘴里呼着热气………`); // :737
      kojo.爱抚 = 4; // :738
    } else if (
      // :740-743 屈服刻印Lv2
      mark(2) === 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「才不会…觉得舒服呢！　绝对不会！」'); // :741
      await era.printAndWait(`${target_name}扭动着身体忍耐着的样子………`); // :742
      kojo.爱抚 = 3; // :743
    } else if (
      // :745-748 それ以外（MARK:2 <= 1）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「…好恶心」'); // :746
      await era.printAndWait(`${target_name}叹了口气………`); // :747
      kojo.爱抚 = 2; // :748
    }
    return 0;
  }

  // :757 IF SELECTCOM == 1（舔阴，CFLAG:302）
  if (era_flag.selectcom === 1) {
    // :759-769 初めて（CFLAG:302 == 0）

    if (kojo.舔阴 === 0) {
      // :761-767 处女（TALENT:0）
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait('「你、你在舔哪里啊～」'); // :762
        await era.printAndWait(`${target_name}的私处处有着处女的味道………`); // :763
      } else {
        await era.printAndWait('「请住手吧…不要舔那个地方！」'); // :766
      }
      kojo.舔阴 = 1; // :768
      return 0;
    }

    // :771-792 二回目以降

    // :773-776 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来～…再舔我那里吧…喝下去也行…啊啊～～${heart(1)}」`,
      ); // :774
      await era.printAndWait(`蜜汁从${target_name}的私处处不断涌了出来………`); // :775
      kojo.舔阴 = 5; // :776
    } else if (
      // :778-781 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈哈～…好吃吗？　这个…♪」'); // :779
      await era.printAndWait(`${target_name}腼腆的笑着发出快乐的声音………`); // :780
      kojo.舔阴 = 4; // :781
    } else if (
      // :783-786 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「呜唔呜唔…呜呜～！　不要～」'); // :784
      await era.printAndWait(
        `${target_name}嘴上说着不要但还是老实地让你舔着………`,
      ); // :785
      kojo.舔阴 = 3; // :786
    } else if (
      // :788-790 それ以外（屈服刻印Lv3未満）
      kojo.舔阴 <= 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait('「这么脏的地方也…」'); // :789
      kojo.舔阴 = 2; // :790
    }
    return 0;
  }

  // :799 IF SELECTCOM == 2（肛门爱抚，CFLAG:303）
  if (era_flag.selectcom === 2) {
    const train = chara(target).train;

    const a_insensible = era.get(`talent:${target}:105`);
    const a_sense = era.get(`abl:${target}:3`) || 0;

    // :801-804 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      await era.printAndWait('「讨厌！　难、难以置信！」'); // :802
      kojo.肛门爱抚 = 1; // :803
      return 0;
    }

    // :806-854 二回目以降
    // :807 P = PALAM:3 + UP:3

    const p = train.润滑 + train.润滑增量;

    // :809-815 淫乱+润滑Lv2以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊呜～…好棒～！再来…往深处挖！往深处抠！」'); // :810
      // :812-813 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        ); // :813
      }
      await era.printAndWait(`${target_name}每当被抠弄肛门就会发出娇喘………`); // :814
      kojo.肛门爱抚 = 7; // :815
    } else if (
      // :817-822 淫乱+润滑Lv2未満
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～～…明明还不够湿…不过这样也好棒${heart(1)}」`,
      ); // :818
      // :820-821 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………`,
        ); // :821
      }
      kojo.肛门爱抚 = 6; // :822
    } else if (
      // :824-830 爱慕+润滑Lv2以上
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「再、再多疼爱一下屁股眼吧！」'); // :825
      // :827-828 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        ); // :828
      }
      await era.printAndWait(
        `${target_name}每当被抠弄肛门就会发出不成体统的呻吟………`,
      ); // :829
      kojo.肛门爱抚 = 5; // :830
    } else if (
      // :832-837 爱慕+润滑Lv2未満
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「突、突然做什么呢！？」'); // :833
      // :835-836 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………`,
        ); // :836
      }
      kojo.肛门爱抚 = 4; // :837
    } else if (
      // :839-845 润滑Lv2以上＋A感覚Lv3以上
      p >= PALAMLV[2] &&
      a_sense >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「难以置信…${sc()}…的屁股…啊～…啊啊～！」`); // :840
      // :842-843 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        ); // :843
      }
      await era.printAndWait(`${target_name}因为肛门的快感而神情迷醉………`); // :844
      kojo.肛门爱抚 = 3; // :845
    } else if (
      // :847-852 それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満）
      // 原文门槛是 CFLAG:223，不是 303
      kojo.首次耻情Lv2 <= 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait('「不要啊…够了、快住手～！」'); // :848
      // :850-851 A鈍感
      if (a_insensible) {
        await era.printAndWait(`${target_name}钝感的肛门被刺激得红肿了起来………`); // :851
      }
      kojo.肛门爱抚 = 2; // :852
    }
    return 0;
  }

  // :861 IF SELECTCOM == 3（自慰，CFLAG:304）
  if (era_flag.selectcom === 3) {
    const masturbation_addiction = era.get(`abl:${target}:31`) || 0;
    const filming = era.get(`tequip:${target}:53`);
    const has_penis =
      era.get(`talent:${target}:122`) || era.get(`talent:${target}:121`);

    // :863-873 初めて（CFLAG:304 == 0）
    if (kojo.自慰 === 0) {
      // :865-871 爱＆淫乱
      if (
        era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「啊啊…请多多的…欣赏吧…♪」'); // :866
      } else {
        await era.printAndWait('「你是…恶魔」'); // :869
        await era.printAndWait(`${target_name}一副要哭出来的样子继续自慰着………`); // :870
      }
      kojo.自慰 = 1; // :872
      return 0;
    }

    // :875-966 二回目以降

    // :877-881 淫乱＋处女
    if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咿～～…呀呜呜～～…主人～…快点把${sc()}的淫乱处女膜夺走吧！夺走吧～～～～！！」`,
      ); // :878
      await era.printAndWait(
        `「不管是用狗～！还是用怪物～！什么都好～！把${sc()}的小穴捣进去吧～～～！」`,
      ); // :879
      await era.printAndWait(
        `${target_name}的脸上已经再也找不到一丝被称作圣女时候的清纯痕迹了………`,
      ); // :880
      kojo.自慰 = 9; // :881
    } else if (
      // :883-902 淫乱＋自慰中毒Lv3以上
      era.get(`talent:${target}:76`) === 1 &&
      masturbation_addiction >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // :885-894 撮影中
      if (filming) {
        // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
        era.print(`「看吧～${heart(1)}　噗咻噗咻勃起的`); // :887
        if (has_penis) {
          era.print('鸡鸡～'); // :889
        } else {
          era.print('假鸡鸡～'); // :891
        }
        await era.printAndWait(`${heart(1)}」`); // :893
        await era.printAndWait(
          `「${sc()}今天也是情绪高涨！请大家一起看我做舒服的事吧～${heart(1)}」`,
        ); // :894
      } else if (rand_n(3) === 0) {
        await era.printAndWait(
          `「小穴…好爽…啊啊～…飞起来了～飞起来了～${heart(1)}」`,
        ); // :896
      } else if (rand_n(2) === 0) {
        await era.printAndWait('「平时一个人是怎么做的…就让你好好看看吧…」'); // :898
      } else {
        await era.printAndWait(
          `「啊～啊～…搅着搅着小穴里的淫水就止不住了啊啊啊～${heart(1)}」`,
        ); // :900
      }
      kojo.自慰 = 8; // :902
    } else if (
      // :904-911 淫乱＋自慰中毒Lv3未満
      era.get(`talent:${target}:76`) === 1 &&
      masturbation_addiction < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊～～…明明在主人的眼前～…卖力自慰后请赏我大肉棒吧～～～${heart(1)}」`,
        ); // :907
      } else {
        await era.printAndWait(
          '「嗯～…咕呜唔～…啊～啊啊啊～…小穴玩得停不下来了～…对不起～～！」',
        ); // :909
      }
      kojo.自慰 = 7; // :911
    } else if (
      // :913-916 爱＋处女
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊…啊啊～、快看…我在玩弄主人专用的专属小穴…！」',
      ); // :914
      await era.printAndWait(
        `「哦～…哦哦～…感觉处女膜也在一颤一颤的呢…${heart(1)}」`,
      ); // :915
      kojo.自慰 = 6; // :916
    } else if (
      // :918-937 爱＋自慰中毒Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      masturbation_addiction >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // :920-929 撮影中
      if (filming) {
        era.print('「看见了吗？～♪　噗咻噗咻勃起的'); // :922
        if (has_penis) {
          era.print('鸡鸡……'); // :924
        } else {
          era.print('假鸡鸡'); // :926
        }
        await era.printAndWait('♪」'); // :928
        await era.printAndWait(
          `「${sc()}呐，只有有爱的话，在大家面前也不觉得尴尬了……♪」`,
        ); // :929
      } else if (rand_n(3) === 0) {
        await era.printAndWait('「好、爽～！　啊哈哈…哈哈…好爽～！」'); // :931
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「看吧！　看看下贱的${sc()}…看看自慰地发狂的${sc()}、再多看我吧！」`,
        ); // :933
      } else {
        await era.printAndWait('「这样…完全不够呢…还要…你的…啊啊～♪」'); // :935
      }
      kojo.自慰 = 5; // :937
    } else if (
      // :939-946 爱＋自慰中毒Lv3未満
      era.get(`talent:${target}:85`) === 1 &&
      masturbation_addiction < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait('「被看着…虽然很害羞、不过太舒服了～！」'); // :942
      } else {
        await era.printAndWait('「哈啊…哈啊…啊啊～」'); // :944
      }
      kojo.自慰 = 4; // :946
    } else if (
      // :948-955 屈服刻印Lv3+自慰中毒Lv1以上
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      masturbation_addiction >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait('「如果这是你希望的话…」'); // :951
      } else {
        await era.printAndWait('「就照你说的做吧…」'); // :953
      }
      kojo.自慰 = 3; // :955
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // :957-964 それ以外（爱無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait('「好难为情…」'); // :960
      } else {
        await era.printAndWait('「真讨厌…」'); // :962
      }
      kojo.自慰 = 2; // :964
    }
    return 0;
  }

  // :973 IF SELECTCOM == 5（胸爱抚，CFLAG:306）
  if (era_flag.selectcom === 5) {
    const milk_body =
      era.get(`talent:${target}:130`) === 1 &&
      (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&
      !era.get(`tequip:${target}:16`) &&
      !era.get(`tequip:${target}:15`);
    const b_insensible = era.get(`talent:${target}:107`);
    const b_sense = era.get(`abl:${target}:1`) || 0;

    // :975-1001 初めて（CFLAG:306 == 0）
    if (kojo.胸爱抚 === 0) {
      // :977-987 母乳体质
      if (milk_body) {
        // :979-986 爱＆淫乱
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「吸吧～！${sc()}的乳房～…请你吮吸并品尝母乳吧～…${heart(1)}」`,
          ); // :980
        } else {
          await era.printAndWait(
            '「啊啊啊～…乳房被吸了…不要啊～…呜啊…啊啊～！」',
          ); // :983
          // :986 B鈍感
          if (b_insensible) {
            await era.printAndWait(
              `${target_name}钝感的乳头被吸吮着、被刺激的红肿起来………`,
            ); // :986
          }
        }
      } else if (
        // :990-997 爱＆淫乱
        era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「请你随心所欲的揉吧…♪」'); // :991
      } else {
        await era.printAndWait('「讨厌、变态！」'); // :994
        // :997 B鈍感
        if (b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被吸吮着、被刺激的红肿起来………`,
          ); // :997
        }
      }
      kojo.胸爱抚 = 1; // :1000
      return 0;
    }

    // :1003-1058 二回目以降
    // :1005-1026 母乳体质
    if (milk_body) {
      // :1007-1010 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人～…再吸吧～…乳房一被吸…就好像要去了似的呢～${heart(1)}」`,
        ); // :1008
        await era.printAndWait(
          `${target_name}一颤一颤的痉挛着往${player_name}的嘴里喷出母乳、沉浸在快乐之中………`,
        ); // :1009
        kojo.胸爱抚 = 5; // :1010
      } else if (
        // :1012-1015 爱慕
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人～…再吸吧～…吸${sc()}的奶来恢复精神吧${heart(1)}」`,
        ); // :1013
        await era.printAndWait(
          `${target_name}像慈母般微笑着看着吮吸着乳头的${player_name}、摸着${player_name}的头………`,
        ); // :1014
        kojo.胸爱抚 = 4; // :1015
      } else if (
        // :1017-1020 B感覚Lv3以上
        b_sense >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          '「啊啊～…这、这样吸下去的话…噫～…这可是小宝宝吸的…东西啊…啊啊～♪」',
        ); // :1018
        await era.printAndWait(
          `${target_name}每当乳头溢出母乳就会沉浸在愉悦之中………`,
        ); // :1019
        kojo.胸爱抚 = 3; // :1020
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :1022-1025 それ以外
        await era.printAndWait(
          '「啊啊～…饶了我吧～！乳房…不要吸乳房啊～…啊～啊啊～！」',
        ); // :1023
        await era.printAndWait(
          `${target_name}的乳头溢出了母乳、渐渐沉溺于母乳流出所带来的炽热快感中………`,
        ); // :1024
        kojo.胸爱抚 = 2; // :1025
      }
    } else if (
      // :1029-1034 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来～…虽然很痛但也被弄得好舒服呢…啊啊${heart(1)}」`,
      ); // :1030
      // :1033 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、被含进嘴里舔得完全勃起了………`,
        ); // :1033
      }
      kojo.胸爱抚 = 5; // :1034
    } else if (
      // :1036-1041 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「手好温暖…啊啊…好舒服啊…${heart(1)}」`); // :1037
      // :1040 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、鼓鼓胀胀地完全勃起了………`,
        ); // :1040
      }
      kojo.胸爱抚 = 4; // :1041
    } else if (
      // :1043-1048 B感覚Lv3以上
      b_sense >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「好有感觉…真舒服…」'); // :1044
      // :1047 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、被刺激得勃了起来………`,
        ); // :1047
      }
      kojo.胸爱抚 = 3; // :1048
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // :1050-1055 それ以外
      await era.printAndWait('「虽然被这样揉很疼…咕呜～」'); // :1051
      // :1054 B鈍感
      if (b_insensible) {
        await era.printAndWait(`${target_name}钝感的乳头被刺激得红肿起来………`); // :1054
      }
      kojo.胸爱抚 = 2; // :1055
    }
    return 0;
  }

  // :1065 IF SELECTCOM == 6（接吻，CFLAG:307）
  if (era_flag.selectcom === 6) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const first_kiss = game.train.初吻与自我口上;
    const master_play =
      !era_flag.assiplay &&
      !era.get(`tequip:${target}:89`) &&
      !era.get(`tequip:${target}:90`);

    // :1067-1097 初吻（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && first_kiss) {
      // :1069-1076 淫乱かつ主人
      if (era.get(`talent:${target}:76`) === 1 && master_play) {
        await era.printAndWait(
          `「啊～～…嗯啾…啾～…嘞咯～…嘞噗～啾～啾～～${heart(1)}」`,
        ); // :1070
        await era.printAndWait(
          `${target_name}在初吻时就用难以想象的热情与${master_name}激吻中………`,
        ); // :1071
        await era.printAndWait(
          `「哈啊啊～…再来…早该这样了…呐、再多和我…亲吻一会儿吧${heart(1)}」`,
        ); // :1072
        if (hometown_lover) {
          await era.printAndWait(
            `痴痴笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1075
        }
      } else if (era.get(`talent:${target}:85`) === 1 && master_play) {
        // :1078-1085 爱かつ主人
        await era.printAndWait(
          `「嗯～…嗯唔…那、那个…这是…${sc()}的初吻…所以…那个…」`,
        ); // :1079
        await era.printAndWait(`${target_name}忸忸怩怩很害羞的样子。`); // :1080
        await era.printAndWait(
          `「啊哈哈…${heart(1)}………那个…你要负起…责任哦？」`,
        ); // :1081
        if (hometown_lover) {
          await era.printAndWait(
            `这样微笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1084
        }
      } else {
        // :1087-1094 それ以外
        await era.printAndWait(`「啊～…啊啊…${sc()}的第一次…就这样…没了吗！」`); // :1088
        await era.printAndWait(
          `${player_name}饶有兴致的品味着${target_name}的唇………`,
        ); // :1089
        if (hometown_lover) {
          await era.printAndWait('（啊啊…对不起…对不起………）'); // :1092
          await era.printAndWait(`${target_name}想起故乡的恋人流下了眼泪………`); // :1093
        }
      }
      kojo.接吻 = 1;
      return 0;
    }

    // :1099-1124 （調教では）初めて（CFLAG:307 == 0）
    if (kojo.接吻 === 0) {
      // :1101-1106 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯啾…啾…噗呼…嘞咯～…哈啊…再来…我还想再接吻…${heart(1)}」`,
        ); // :1102
        if (hometown_lover) {
          await era.printAndWait(
            `痴痴笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1105
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1108-1113 爱慕
        await era.printAndWait(
          '「嗯…啾…哈啊啊…感觉到爱了…那个、可以再来一次吗？」',
        ); // :1109
        if (hometown_lover) {
          await era.printAndWait(
            `这样微笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          ); // :1112
        }
      } else {
        // :1115-1121 それ以外
        await era.printAndWait('「嗯～！…嗯咕～…咕呜呜…好、好恶毒………」'); // :1116
        if (hometown_lover) {
          await era.printAndWait('（啊啊…对不起…对不起………）'); // :1119
          await era.printAndWait(`${target_name}想起故乡的恋人流下了眼泪………`); // :1120
        }
      }
      kojo.接吻 = 1;
      return 0;
    }

    // :1126-1146 二回目以降
    // :1128-1130 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯嘞咯～♪…啾～…啾噗…啾～…嗯～…请再多吻我吧…${heart(1)}」`,
      ); // :1129
      kojo.接吻 = 5;
    } else if (
      // :1132-1135 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊啊…喜欢…好喜欢…不、我只是说喜欢接吻罢了…啊～～♪」',
      ); // :1133
      await era.printAndWait(
        `${player_name}如${target_name}所愿、不断地接吻着………`,
      ); // :1134
      kojo.接吻 = 4;
    } else if (
      // :1137-1139 顺从Lv2以上
      (era.get(`abl:${target}:10`) || 0) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯～…哈啊啊…这、这样就可以了吧？…啊～、不要～…嗯嗯呜～！」',
      ); // :1138
      kojo.接吻 = 3;
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      // :1141-1144 それ以外
      await era.printAndWait('「嗯～…咕～…」'); // :1142
      await era.printAndWait(`${target_name}把唇移开、不好意思的躲闪着视线………`); // :1143
      kojo.接吻 = 2;
    }
    return 0;
  }

  // :1153 IF SELECTCOM == 7（自己扒开，CFLAG:308）
  if (era_flag.selectcom === 7) {
    // :1155-1167 初めて（CFLAG:308 == 0）
    if (kojo.自己扒开 === 0) {
      // :1157-1159 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「好的～…张开啦～${heart(1)}…怎么样呢…${sc()}的淫乱小穴…因为想要主人的大肉棒、大大的张开了哦～${heart(1)}」`,
        ); // :1158
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1160-1162 爱慕
        await era.printAndWait(
          '「虽、虽然很害羞…如果是主人的命令的话…啊～～…讨厌…爱液流出来了～～………嗯」',
        ); // :1161
      } else {
        // :1163-1165 それ以外（爱無し）
        await era.printAndWait('「咕呜…这、这样…是不对的…」'); // :1164
      }
      kojo.自己扒开 = 1;
      return 0;
    }

    // :1169-1187 二回目以降
    // 原文二次推进写进 CFLAG:306（胸爱抚），不是 308
    // :1171-1173 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊哈～…主人～…请再多多的…往里面看吧～…这里已经迫不及待地想被小鸡鸡插来插去了呢${heart(1)}」`,
      ); // :1172
      kojo.胸爱抚 = 5;
    } else if (
      // :1175-1177 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊…不要老是盯着这里看嘛…一被主人看着里面…${scf()}、${sc()}…就好有感觉…要变得…奇怪了～」`,
      ); // :1176
      kojo.胸爱抚 = 4;
    } else if (
      // :1179-1181 露出癖Lv3以上
      (era.get(`abl:${target}:17`) || 0) >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊～好有感觉～…小穴被看着好有感觉啊………」'); // :1180
      kojo.胸爱抚 = 3;
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // :1183-1185 それ以外（爱無し、露出癖Lv3未満）
      await era.printAndWait('「咕呜～…求你了…别看了…不要看那种地方…」'); // :1184
      kojo.胸爱抚 = 2;
    }
    return 0;
  }

  // :1194 IF SELECTCOM == 8（插入手指，CFLAG:309）
  if (era_flag.selectcom === 8) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    // :1196-1214 初めて（CFLAG:309 == 0）
    if (kojo.插入手指 === 0) {
      // :1198-1199 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊～…嗯咕～…再继续…往里面插…尽情蹂躏${sc()}的阴道吧…${heart(1)}」`,
        ); // :1199
      } else if (
        // :1201-1203 屈服刻印Lv3+爱
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait('「好、好的…我会忍耐的…请再往里面插…」'); // :1202
        await era.printAndWait('「呀～～…啊啊…是的、没问题…啊啊～♪」'); // :1203
      } else {
        // :1205-1209 それ以外
        await era.printAndWait('「哈呜～…咕～…呜唔…啊…住手…住手啊…啊～…！」'); // :1206
        // :1208-1209 V鈍感
        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、${target_name}好像很痛苦的呻吟着………`,
          ); // :1209
        }
      }
      kojo.插入手指 = 1; // :1211
      return 0;
    }

    // :1214-1246 二回目以降
    // :1216-1221 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊～再往里面插吧！把小穴弄得湿漉漉的吧！」'); // :1217
      // :1219-1220 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、贪婪的吞下了${player_name}所有的爱抚………`,
        ); // :1220
      }
      kojo.插入手指 = 5; // :1221
    } else if (
      // :1223-1229 爱＋屈服刻印Lv3
      era.get(`talent:${target}:85`) === 1 &&
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～…嗯～…主人的手指…好温柔…咿呀～～！啊～！那里是～！」',
      ); // :1224
      await era.printAndWait('「………你、你欺负人啊…啊啊～！」'); // :1225
      // :1227-1228 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、完全接受了${player_name}的爱抚………`,
        ); // :1228
      }
      kojo.插入手指 = 4; // :1229
    } else if (
      // :1231-1236 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「我不会反抗的、所以…再温柔一点…咕呜…嗯呜唔…啊～啊啊～！」',
      ); // :1232
      // :1234-1235 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、${target_name}不成体统的挺着腰………`,
        ); // :1235
      }
      kojo.插入手指 = 3; // :1236
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
      // :1238-1243 それ以外
      await era.printAndWait(
        `「啊啊～…住、住手…即使被做了这样的事${sc()}也…咕呜～」`,
      ); // :1239
      // :1241-1242 V鈍感
      if (v_insensible) {
        await era.printAndWait(
          `因为${target_name}的私处不太容易有感觉、每次在里面摩擦${target_name}就会痛苦的呻吟起来………`,
        ); // :1242
      }
      kojo.插入手指 = 2; // :1243
    }
    return 0;
  }

  // :1252 IF SELECTCOM == 9（舔肛，CFLAG:310）
  if (era_flag.selectcom === 9) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    // :1254-1276 初めて（CFLAG:310 == 0）
    if (kojo.舔肛 === 0) {
      // :1256-1260 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「咿呀～～…那、那种地方被舐了的话…呜啊～…啊啊～…还要…再舐舐吧…」',
        ); // :1257
        // :1259-1260 A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得发出了非常带感的声音………`,
          ); // :1260
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1262-1266 爱慕
        await era.printAndWait(
          '「那、那里很脏啊…太羞人了…请、请住手吧…咕呜呜～～」',
        ); // :1263
        // :1265-1266 A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得娇喘起来………`,
          ); // :1266
        }
      } else {
        // :1268-1272 それ以外（爱無し）
        await era.printAndWait('「噫～！那、那种地方被舐了的话…不、不要啊～」'); // :1269
        // :1271-1272 A鈍感
        if (a_insensible) {
          await era.printAndWait(
            `${target_name}不知是不是真的因为肛门被舔而感到难过发出了高亢的悲鸣声………`,
          ); // :1272
        }
      }
      kojo.舔肛 = 1; // :1274
      return 0;
    }

    // :1277-1308 二回目以降
    // :1279-1284 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咿呀呜～…啊啊…主人～…再…再用舌头舔我吧～${heart(1)}」`,
      ); // :1280
      // :1282-1283 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得发出了非常带感的声音………`,
        ); // :1283
      }
      kojo.舔肛 = 5; // :1284
    } else if (
      // :1286-1291 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～～…嗯唔～…啊啊～…再、再温柔一点…舐的话…就更好了…哈啊～♪」',
      ); // :1287
      // :1289-1290 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得娇喘出声………`,
        ); // :1290
      }
      kojo.舔肛 = 4; // :1291
    } else if (
      // :1293-1298 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「咕呜～…呜～…！…没、没事的、所以…请再…舔我吧…嗯嗯～！」',
      ); // :1294
      // :1296-1297 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发了、被${player_name}的舌头搅得发出了快乐的声音………`,
        ); // :1297
      }
      kojo.舔肛 = 3; // :1298
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
      // :1300-1305 それ以外（屈服刻印Lv3未満）
      await era.printAndWait('「讨厌…明明很脏…咿～…请饶了我吧…」'); // :1301
      // :1303-1304 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}不知是不是真的因为肛门被舔而感到难过、发出了悲鸣声………`,
        ); // :1304
      }
      kojo.舔肛 = 2; // :1305
    }
    return 0;
  }

  // :1314 IF SELECTCOM == 10（振动宝石，CFLAG:311）
  if (era_flag.selectcom === 10) {
    // :1316-1328 初めて（CFLAG:311 == 0）
    if (kojo.振动宝石 === 0) {
      // :1318-1319 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「咕呼呜～…这样的震动太美妙了…再来…再继续按在那里～${heart(1)}」`,
        ); // :1319
      } else if (
        // :1321-1322 屈服刻印Lv3+爱
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait('「啊～…嗯～…没、没事的、再来…请尽情使用吧…♪」'); // :1322
      } else {
        // :1324-1325 それ以外
        await era.printAndWait('「咿呀～…这、这到底是什么东西…咿呀啊～！？」'); // :1325
      }
      kojo.振动宝石 = 1; // :1327
      return 0;
    }

    // :1330-1349 二回目以降
    // :1332-1334 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～～…嗯～…呜呼…啊啊啊～！我还要更多、更多～！」',
      ); // :1333
      await era.printAndWait(`${target_name}扭着腰身因为愉悦而颤抖不已………`); // :1334
      kojo.振动宝石 = 5; // :1335
    } else if (
      // :1337-1340 爱＋屈服刻印Lv3
      era.get(`talent:${target}:85`) === 1 &&
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「咿～…呜～…啊…哈啊～…请再…继续吧…这东西…真厉害啊…嗯～」',
      ); // :1338
      await era.printAndWait(
        `${target_name}像为了忍耐阴核的震动似的蜷曲着身体………`,
      ); // :1339
      kojo.振动宝石 = 4; // :1340
    } else if (
      // :1342-1344 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊…啊～…啊呜～…嗯、这样子…感觉变的好舒服啊…咿呀～～！」',
      ); // :1343
      kojo.振动宝石 = 3; // :1344
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
      // :1346-1348 それ以外
      await era.printAndWait(
        '「哈啊～…啊～～…嗯～…啊…啊呜呜～…再、再这样下去的话…」',
      ); // :1347
      kojo.振动宝石 = 2; // :1348
    }
    return 0;
  }

  // :1358 IF SELECTCOM == 11 && TEQUIP:11（壶虫开始，CFLAG:312）
  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    // :1360-1400 初めて（CFLAG:312 == 0）
    if (kojo.壶虫 === 0) {
      // :1362-1376 处女
      if (era.get(`talent:${target}:0`) === 1) {
        // :1364-1367 淫乱
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('「咕呜…啊啊～…渐渐地钻进…小穴里面去了………」'); // :1365
          await era.printAndWait(
            '「主人的小鸡鸡…明明一直在等待着…明明一直在等待着…结果就这样…」',
          ); // :1366
          await era.printAndWait(`${target_name}有点悲伤地忍耐着破瓜的疼痛………`); // :1367
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :1369-1372 爱慕
          await era.printAndWait(
            '「哈咕呜～…没、没事的…一点也不痛…咕…呜呜～！」',
          ); // :1370
          await era.printAndWait(`${target_name}咬牙忍耐着破瓜的痛楚………`); // :1371
          await era.printAndWait('「哈啊…哈啊…下次…想要…………主人的…东西………」'); // :1372
        } else {
          // :1374-1375 それ以外
          await era.printAndWait('「哈啊…哈啊…啊啊…好狠心…好狠心啊…啊咕呜…」'); // :1375
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1380-1384 非处女＋淫乱
        await era.printAndWait(
          '「啊啊～！这样被张开…好厉害啊…在里面蠕动着…啊～啊～啊啊啊！」',
        ); // :1381
        // :1383-1384 V感覚Lv3以上＋V鈍感
        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………`,
          ); // :1384
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1386-1390 非处女＋爱慕
        await era.printAndWait(
          `「这、这东西在${sc()}的阴道里…啊啊～…好厉害…这种感觉…还是第一次…♪」`,
        ); // :1387
        // :1389-1390 V感覚Lv3以上＋V鈍感
        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处已经被完全开发了、把壶虫连根吞了进去………`,
          ); // :1390
        }
      } else {
        // :1392-1396 非处女＋それ以外
        await era.printAndWait(
          `「啊～！不、不要！在${sc()}的里面蠕动着…咿咿咿咿～！」`,
        ); // :1393
        // :1395-1396 V鈍感
        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、被壶虫连根插入的${target_name}好像很痛苦似的呻吟着………`,
          ); // :1396
        }
      }
      kojo.壶虫 = 1; // :1399
      return 0;
    }

    // :1402-1433 二回目以降
    // :1404-1409 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～…！不要…讨厌…明明是虫子而已…竟然会这么爽…要、要死了…咕呜呜～${heart(1)}」`,
      ); // :1405
      // :1407-1408 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………`,
        ); // :1408
      }
      kojo.壶虫 = 5; // :1409
    } else if (
      // :1411-1416 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「好…吧…请把${sc()}的这里…弄得更加一塌糊涂吧…♪」`,
      ); // :1412
      // :1414-1415 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、好像很愉快似的轻松把壶虫连根吞了进去………`,
        ); // :1415
      }
      kojo.壶虫 = 4; // :1416
    } else if (
      // :1418-1423 V感覚Lv3以上
      v_sense >= 3 &&
      (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「不、不对…怎么会这么舒服…腰…都舒服的动不了了…啊啊～不对啊～」',
      ); // :1419
      // :1421-1422 V感覚Lv3以上＋V鈍感
      if (v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、把壶虫连根吞了进去………`,
        ); // :1422
      }
      kojo.壶虫 = 3; // :1423
    } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
      // :1425-1430 それ以外
      await era.printAndWait('「咕呜～…啊～…咿～～…不、不要～…」'); // :1426
      // :1428-1429 V鈍感
      if (v_insensible) {
        await era.printAndWait(
          `因为${target_name}的私处不太容易有感觉、被壶虫连根插入的${target_name}好像很痛苦似的呻吟着………`,
        ); // :1429
      }
      kojo.壶虫 = 2; // :1430
    }
    return 0;
  }

  // :1435 ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0（壶虫脱着，CFLAG:372）
  if (era_flag.selectcom === 11 && !era.get(`tequip:${target}:11`)) {
    // :1437-1439 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊啊…下次…要把什么插进来呢…？」'); // :1438
      kojo.壶虫着脱 = 3; // :1439
    } else if (
      // :1441-1443 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「咕呜嗯～…下次想要…主人的东西…」'); // :1442
      kojo.壶虫着脱 = 2; // :1443
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1445-1447 それ以外
      await era.printAndWait('「哈啊…哈啊…啊啊…大张的小穴空出来了…」'); // :1446
      kojo.壶虫着脱 = 1; // :1447
    }
    return 0;
  }

  // :1455 IF SELECTCOM == 12（振动杖，CFLAG:313）
  if (era_flag.selectcom === 12) {
    // :1457-1475 初めて（CFLAG:313 == 0）
    if (kojo.振动杖 === 0) {
      // :1459-1465 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「咿呀～…呀～…啊哈～！讨、讨厌！那里好痒啊～」',
        ); // :1460
        await era.printAndWait(
          `每当振动杖按在${target_name}的两腿之间就会带来极度刺激的快感。`,
        ); // :1461
        await era.printAndWait('………'); // :1462
        await era.printAndWait('……'); // :1463
        await era.printAndWait('…30分后'); // :1464
        await era.printAndWait(
          '「哈啊啊呼…嗯……咕呜～…好…好了…嗯…求…求、求求你…不…不…不要…再…继…继续、下…去……去…了啊啊啊啊！」',
        ); // :1465
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1467-1469 爱慕
        await era.printAndWait(
          '「魔、魔族的道具里还有这样的奇怪玩意儿吗…啊呜～！？」',
        ); // :1468
        await era.printAndWait(
          '「诶、诶、什、什么啊这是…好厉害的震动…呀呜～！？咿～！」',
        ); // :1469
      } else {
        // :1471-1472 それ以外
        await era.printAndWait(
          `「无、无论你对${sc()}做什么…呀～！…只、只不过是有点痒罢了…咿呀呜～！？」`,
        ); // :1472
      }
      kojo.振动杖 = 1; // :1474
      return 0;
    }

    // :1476-1498 二回目以降
    // :1479-1482 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「好的～…可以哦…请用这个色情的杖来欺负${sc()}吧…${heart(1)}」`,
      ); // :1480
      await era.printAndWait(
        '「咕呜嗯～…啊～啊哈～…啊啊～！麻麻的好厉害啊～！」',
      ); // :1481
      kojo.振动杖 = 5; // :1482
    } else if (
      // :1484-1487 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯咕～…啊～啊哈～…请…请继续…主人～…♪」'); // :1485
      await era.printAndWait(
        `「啊啊啊～啊…啊～好…好舒服…好…舒…服…啊…啊呜呜…呜…${heart(1)}」`,
      ); // :1486
      kojo.振动杖 = 4; // :1487
    } else if (
      // :1489-1491 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～啊啊～…明明被用这种东西玩弄…但是好舒服…啊啊～！啊～～！」',
      ); // :1490
      kojo.振动杖 = 3; // :1491
    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
      // :1493-1495 それ以外
      await era.printAndWait(
        '「啊～…啊啊～…这样…好有感觉、不要…不要啊…咕呜嗯～」',
      ); // :1494
      kojo.振动杖 = 2; // :1495
    }
    return 0;
  }

  // :1505 IF SELECTCOM == 13 && TEQUIP:13（肛门虫开始，CFLAG:314）
  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;
    const filming = era.get(`tequip:${target}:53`);

    // :1507-1529 初めて（CFLAG:314 == 0）
    if (kojo.肛门虫 === 0) {
      // :1509-1514 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「啊啊～…连尻穴里都被虫子钻进去了…好棒…额呵呵…」',
        ); // :1510
        await era.printAndWait(
          `曾被称作圣女的${target_name}脑袋里已经被淫欲所污染了………`,
        ); // :1511
        // :1513-1514 A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `于是${target_name}钝感的肛门被快乐所开发、由于肛门虫的刺激而发出了很带感的呻吟声………`,
          ); // :1514
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1516-1520 爱慕
        await era.printAndWait(
          '「没、没事的…这、这种程度完全能够承受的下来…啊呜呜…咕～…」',
        ); // :1517
        // :1519-1520 A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被快乐所开发、由于肛门虫的刺激而娇喘出声………`,
          ); // :1520
        }
      } else {
        // :1522-1526 それ以外
        await era.printAndWait(
          '「咿呀～…那、那里不能进去～！不能进去啊～！啊啊啊！」',
        ); // :1523
        // :1525-1526 A鈍感
        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被肛门虫蠕动着钻了进去、${target_name}发出了悲鸣………`,
          ); // :1526
        }
      }
      kojo.肛门虫 = 1; // :1528
      return 0;
    }

    // :1530-1588 二回目以降
    // :1533-1544 淫乱＋A感覚Lv3以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (filming) {
        // :1535-1537 撮影中
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「请看吧${heart(1)}　这么粗的蠕虫要插进${sc()}屁股眼里去了哦～${heart(1)}」`,
        ); // :1536
        await era.printAndWait(`${target_name}妖艳的那期蠕虫、舔了舔嘴唇。`); // :1537
      } else {
        await era.printAndWait(
          '「啊咿～…啊～啊～啊啊啊啊！屁股眼～！屁股眼好舒服～！再往里钻吧～～！」',
        ); // :1539
      }
      // :1542-1543 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被调教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声………`,
        ); // :1543
      }
      kojo.肛门虫 = 6; // :1544
    } else if (
      // :1546-1551 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「虫子…在…里面……～！动着…要变的…变的…奇怪了啊啊～～${heart(1)}」`,
      ); // :1547
      // :1549-1550 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}还很钝感的肛门被肛门虫蠕动着钻了进去、${target_name}好像很开心的晃着屁股作为回应………`,
        ); // :1550
      }
      kojo.肛门虫 = 6; // :1551
    } else if (
      // :1553-1564 爱＋A感覚Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
    ) {
      if (filming) {
        // :1555-1557 撮影中
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「见请看吧♪　这么粗的蠕虫要被${sc()}的屁股眼吞下去了呦♪」`,
        ); // :1556
        await era.printAndWait(
          `${target_name}抱起一抖一抖的扭动着的蠕虫、妖艳的笑着。`,
        ); // :1557
      } else {
        await era.printAndWait(
          '「啊～啊啊～…嗯呜唔～…屁股眼…感觉…好棒呢…啊～啊啊～再往里钻吧！」',
        ); // :1559
      }
      // :1562-1563 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被调教出了快感、由于肛门虫的刺激娇喘出声………`,
        ); // :1563
      }
      kojo.肛门虫 = 5; // :1564
    } else if (
      // :1566-1571 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「屁、屁股…好奇怪…变的好奇怪…不要…真的不要啊…」'); // :1567
      // :1569-1570 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门一被肛门虫蠕动着钻了进去、${target_name}就皱起眉头发出了好像很痛苦的呻吟………`,
        ); // :1570
      }
      kojo.肛门虫 = 4; // :1571
    } else if (
      // :1573-1578 A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～…啊啊啊～…讨厌～…屁股眼爽的不行了…明明不能这样的！啊啊～～♪」',
      ); // :1574
      // :1576-1577 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛门虫的刺激而娇喘出声………`,
        ); // :1577
      }
      kojo.肛门虫 = 3; // :1578
    } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
      // :1580-1585 それ以外
      await era.printAndWait('「咕呜～…好难受…好难受啊…」'); // :1581
      // :1583-1584 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门一被肛门虫蠕动着钻了进去、${target_name}就发出了悲鸣………`,
        ); // :1584
      }
      kojo.肛门虫 = 2; // :1585
    }
    return 0;
  }

  // :1590 ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0（肛门虫脱着，CFLAG:374）
  if (era_flag.selectcom === 13 && !era.get(`tequip:${target}:13`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    // :1592-1594 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊～…要是能一整天都能被抽插着就好了…${heart(1)}」`,
      ); // :1593
      kojo.肛门虫着脱 = 4; // :1594
    } else if (
      // :1596-1598 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…哈啊…啊啊…总觉得屁股眼感到寂寞了呢…」'); // :1597
      kojo.肛门虫着脱 = 3; // :1598
    } else if (
      // :1600-1602 A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯～…啊啊…总觉得…屁股眼…还意犹未尽…♪」'); // :1601
      kojo.肛门虫着脱 = 2; // :1602
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1604-1606 それ以外
      await era.printAndWait('「哈啊…哈啊…哈啊………」'); // :1605
      kojo.肛门虫着脱 = 1; // :1606
    }
    return 0;
  }

  // :1615 IF SELECTCOM == 14 && TEQUIP:14（阴蒂夹开始，CFLAG:315）
  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    // :1617-1629 初めて（CFLAG:315 == 0）
    if (kojo.阴蒂夹 === 0) {
      // :1619-1620 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「啊～～…厉、厉害…请再夹紧一点…咿～！震起来了！？震起来了～～～～～～～！」',
        ); // :1620
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1622-1623 爱慕
        await era.printAndWait(
          '「没、没事的…请再夹紧一点…咿～！震起来了～～！」',
        ); // :1623
      } else {
        // :1625-1626 それ以外
        await era.printAndWait(
          `「不、不管用这种东西怎么折腾${sc()}都是没用的…咿啊啊啊～！震起来了不要啊啊啊！」`,
        ); // :1626
      }
      kojo.阴蒂夹 = 1; // :1628
      return 0;
    }

    // :1630-1646 二回目以降
    // :1633-1635 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～啊啊～啊啊啊～！请再强烈些、再强烈些！把阴蒂玩到坏掉为止吧～${heart(1)}」`,
      ); // :1634
      kojo.阴蒂夹 = 4; // :1635
    } else if (
      // :1637-1639 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯呜唔呜～！啊啊～…小阴蒂一颤一颤的…变的好奇怪…♪」',
      ); // :1638
      kojo.阴蒂夹 = 3; // :1639
    } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
      // :1641-1643 それ以外
      await era.printAndWait(
        '「哈啊…哈啊…啊啊呜呜～！不要震了…求求你不要再震了～！」',
      ); // :1642
      kojo.阴蒂夹 = 2; // :1643
    }
    return 0;
  }

  // :1648 ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0（阴蒂夹脱着，CFLAG:375）
  if (era_flag.selectcom === 14 && !era.get(`tequip:${target}:14`)) {
    // :1650-1652 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊～哈啊～…还在麻麻的呢…${heart(1)}」`); // :1651
      kojo.阴蒂夹着脱 = 3; // :1652
    } else if (
      // :1654-1656 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊啊…好像还想再被夹着呢………」'); // :1655
      kojo.阴蒂夹着脱 = 2; // :1656
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1658-1660 それ以外
      await era.printAndWait('「哈啊…哈啊…哈啊…呜呜～」'); // :1659
      kojo.阴蒂夹着脱 = 1; // :1660
    }
    return 0;
  }

  // :1669 IF SELECTCOM == 15 && TEQUIP:15（乳头夹开始，CFLAG:316）
  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    const b_sense = era.get(`abl:${target}:1`) || 0;
    const b_insensible = era.get(`talent:${target}:107`) === 1;

    // :1671-1694 初めて（CFLAG:316 == 0）
    if (kojo.乳头夹 === 0) {
      // :1673-1678 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「额呵呵…还有这样的色情道具呢…好吧…请用乳房～${heart(1)}」`,
        ); // :1674
        await era.printAndWait(
          `${target_name}神情陶醉的看着器具夹到了乳头上………`,
        ); // :1675
        // :1677-1678 B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
          ); // :1678
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1680-1685 爱慕
        await era.printAndWait(
          '「啊～～…好吧…请用这个色情的道具…来更多地欺负乳头吧…♪」',
        ); // :1681
        await era.printAndWait(`${target_name}莞然一笑、把胸部伸了出来………`); // :1682
        // :1684-1685 B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快乐………`,
          ); // :1685
        }
      } else {
        // :1687-1691 それ以外
        await era.printAndWait(
          `「即、即使是这样${sc()}也…啊咿～～…咕呜…（可、可怕…好可怕啊…）」`,
        ); // :1688
        // :1690-1691 B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快乐………`,
          ); // :1691
        }
      }
      kojo.乳头夹 = 1; // :1693
      return 0;
    }

    // :1695-1722 二回目以降
    // :1698-1704 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊～…好爽…感觉全身心都变得淫荡起来了～${heart(1)}」`,
      ); // :1699
      await era.printAndWait(
        `从${target_name}不像话的表情上完全看不出圣女时期的清纯了………`,
      ); // :1700
      // :1702-1703 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
        ); // :1703
      }
      kojo.乳头夹 = 4; // :1704
    } else if (
      // :1706-1712 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯嗯～…乳头好舒服…还要…我还要～～♪」'); // :1707
      await era.printAndWait(
        `「一被主人欺负…就会感觉到主人的爱呢…${heart(1)}」`,
      ); // :1708
      // :1710-1711 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
        ); // :1711
      }
      kojo.乳头夹 = 3; // :1712
    } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
      // :1714-1719 それ以外
      await era.printAndWait(
        '「啊呜～…呜～…啊啊…不、不要…再这样下去的话…啊啊～～！」',
      ); // :1715
      // :1717-1718 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
        ); // :1718
      }
      kojo.乳头夹 = 2; // :1719
    }
    return 0;
  }

  // :1724 ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0（乳头夹脱着，CFLAG:376）
  if (era_flag.selectcom === 15 && !era.get(`tequip:${target}:15`)) {
    // :1726-1728 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊～～…明明还想再用一会儿的…${heart(1)}」`); // :1727
      kojo.乳头夹着脱 = 3; // :1728
    } else if (
      // :1730-1732 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊…乳头麻麻的…好厉害的感觉…♪」'); // :1731
      kojo.乳头夹着脱 = 2; // :1732
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1734-1736 それ以外
      await era.printAndWait('「咕呜嗯～…哈啊…哈啊…」'); // :1735
      kojo.乳头夹着脱 = 1; // :1736
    }
    return 0;
  }

  // :1745 IF SELECTCOM == 16 && TEQUIP:16（榨乳器开始，CFLAG:317）
  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    const b_sense = era.get(`abl:${target}:1`) || 0;
    const b_insensible = era.get(`talent:${target}:107`) === 1;

    // :1747-1771 初めて（CFLAG:317 == 0；:1771 RETURN 0 被注释，JS 仍须显式返回以免落到 stub_line）
    if (kojo.榨乳器 === 0) {
      // :1749-1754 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…奶水…就这样出来了～…好美妙～${heart(1)}」`,
        ); // :1750
        await era.printAndWait(
          `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
        ); // :1751
        // :1753-1754 B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
          ); // :1754
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1756-1761 爱慕
        await era.printAndWait(
          `「啊啊～…小宝宝…好想让小宝宝来喝呢～………${heart(1)}」`,
        ); // :1757
        await era.printAndWait(
          `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
        ); // :1758
        // :1760-1761 B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
          ); // :1761
        }
      } else {
        // :1763-1768 それ以外
        await era.printAndWait('「住、住手…放过我吧…啊啊…不要啊啊………」'); // :1764
        await era.printAndWait(
          `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
        ); // :1765
        // :1767-1768 B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
          ); // :1768
        }
      }
      kojo.榨乳器 = 1; // :1770
      return 0;
    }

    // :1772-1800 二回目以降
    // :1775-1781 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～${heart(1)}」`,
      ); // :1776
      await era.printAndWait(
        `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
      ); // :1777
      // :1779-1780 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
        ); // :1780
      }
      kojo.榨乳器 = 4; // :1781
    } else if (
      // :1783-1789 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊啊～…啊～…嗯呜唔～…！呀啊啊…好想让小宝宝喝啊………${heart(1)}」`,
      ); // :1784
      await era.printAndWait(
        `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
      ); // :1785
      // :1787-1788 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
        ); // :1788
      }
      kojo.榨乳器 = 3; // :1789
    } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
      // :1791-1797 それ以外
      await era.printAndWait('「讨厌…讨厌…不要榨啊～…嗯！」'); // :1792
      await era.printAndWait(
        `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
      ); // :1793
      // :1795-1796 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
        ); // :1796
      }
      kojo.榨乳器 = 2; // :1797
    }
    return 0;
  }

  // :1802 ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0（榨乳器脱着，CFLAG:377）
  if (era_flag.selectcom === 16 && !era.get(`tequip:${target}:16`)) {
    // :1804-1807 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「欸～～…明明还想再榨一些奶汁出来呢…♪」'); // :1805
      await era.printAndWait(
        `奶汁从${target_name}的乳头上滴答滴答地垂落下来………`,
      ); // :1806
      kojo.榨乳器着脱 = 3; // :1807
    } else if (
      // :1809-1812 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊～…哇、${sc()}的奶汁…♪」`); // :1810
      await era.printAndWait(
        `奶汁从${target_name}的乳头上滴答滴答地垂落下来………`,
      ); // :1811
      kojo.榨乳器着脱 = 2; // :1812
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1814-1817 それ以外
      await era.printAndWait('「呜…呜呜…奶汁…不要再出来了………」'); // :1815
      await era.printAndWait(
        `奶汁从${target_name}的乳头上滴答滴答地垂落下来………`,
      ); // :1816
      kojo.榨乳器着脱 = 1; // :1817
    }
    return 0;
  }

  // :1869 IF SELECTCOM == 19 && TEQUIP:19（肛珠开始，CFLAG:320）
  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    // :1871-1892 初めて（CFLAG:320 == 0）
    if (kojo.肛珠 === 0) {
      // :1873-1877 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…${heart(1)}」`,
        ); // :1874
        // :1876-1877 A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}很有感觉地唤出声来………`,
          ); // :1877
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1879-1883 爱慕
        await era.printAndWait('「没、没事的…再来…全部塞进去吧…♪」'); // :1880
        // :1882-1883 A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}娇喘出声………`,
          ); // :1883
        }
      } else {
        // :1885-1889 それ以外
        await era.printAndWait(
          '「啊～、咿～～！？不行…不可能全部塞进去啊………」',
        ); // :1886
        // :1888-1889 A鈍感
        if (a_insensible) {
          await era.printAndWait(
            `一把肛珠全部塞进${target_name}钝感的肛门里、${target_name}就悲鸣了起来………`,
          ); // :1889
        }
      }
      kojo.肛珠 = 1; // :1891
      return 0;
    }

    // :1893-1942 二回目以降
    // :1896-1902 淫乱＋A感覚Lv3以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～${heart(1)}」`,
      ); // :1897
      await era.printAndWait(
        `${target_name}由于肛门的快乐整个脑子都爽的要融化了似的………`,
      ); // :1898
      // :1900-1901 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}反复厮磨着………`,
        ); // :1901
      }
      kojo.肛珠 = 7; // :1902
    } else if (
      // :1904-1909 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来…再继续欺负我吧…让${sc()}的屁股眼变的更舒服吧${heart(1)}」`,
      ); // :1905
      // :1907-1908 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}还很钝感的肛门被肛珠全部塞了进去、${target_name}好像很开心的摇着屁股作为回应………`,
        ); // :1908
      }
      kojo.肛珠 = 6; // :1909
    } else if (
      // :1911-1917 爱＋A感覚Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～～…这个…好厉害…肚子里面…一缩一缩的…咿呀～～！不要拉～」',
      ); // :1912
      await era.printAndWait(`${target_name}不像话地张开嘴、发出快乐的呻吟………`); // :1913
      // :1915-1916 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}娇喘出声………`,
        ); // :1916
      }
      kojo.肛珠 = 5; // :1917
    } else if (
      // :1919-1924 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…啊啊～…一全部塞进去…腰都直不起来了…♪」'); // :1920
      // :1922-1923 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `一把肛珠全部塞进${target_name}钝感的肛门里、${target_name}皱着眉头发出好像很痛苦的声音………`,
        ); // :1923
      }
      kojo.肛珠 = 4; // :1924
    } else if (
      // :1926-1932 A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊啊…屁股…好像…变的很奇怪…不、不行…不要拉啊～～♪」',
      ); // :1927
      await era.printAndWait(`${target_name}不像话地张开嘴发出下流的声音………`); // :1928
      // :1930-1931 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}娇喘出声………`,
        ); // :1931
      }
      kojo.肛珠 = 3; // :1932
    } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
      // :1934-1939 それ以外
      await era.printAndWait(
        '「这、这样子…这样子全部塞进去的话…咿～、不要拉啊～」',
      ); // :1935
      // :1937-1938 A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `一把肛珠全部塞进${target_name}钝感的肛门里、${target_name}就悲鸣起来………`,
        ); // :1938
      }
      kojo.肛珠 = 2; // :1939
    }
    return 0;
  }

  // :1944 ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0（肛珠脱着，CFLAG:379）
  if (era_flag.selectcom === 19 && !era.get(`tequip:${target}:19`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    // :1946-1948 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢${heart(1)}」`,
      ); // :1947
      kojo.肛珠着脱 = 4; // :1948
    } else if (
      // :1950-1952 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「咕呜嗯～…啊哈…被撑的好宽啊…♪」'); // :1951
      kojo.肛珠着脱 = 3; // :1952
    } else if (
      // :1954-1956 A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊啊啊～～！…不、不行…屁股眼…再这样下去的话…真的要…」',
      ); // :1955
      kojo.肛珠着脱 = 2; // :1956
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1958-1960 それ以外
      await era.printAndWait('「呀呜呜～…啊、啊啊…」'); // :1959
      kojo.肛珠着脱 = 1; // :1960
    }
    return 0;
  }

  // :1968 IF SELECTCOM == 20（正常位，CFLAG:321）
  if (era_flag.selectcom === 20) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.正常位 === 0) {
      // :1970

      if (era.get(`talent:${target}:0`) === 1) {
        // :1972

        if (era.get(`talent:${target}:76`) === 1) {
          // :1974
          await era.printAndWait(
            `「啊啊…主人～…真的好开心…能为淫乱的${target_name}亲自破开处女膜～${heart(1)}」`,
          ); // :1975
          await era.printAndWait(
            `${target_name}自己把两腿张开让${player_name}的大鸡鸡插了进来。`,
          ); // :1976
          await era.printAndWait(
            `「啊…呜…啊啊啊～～！进来啦～！主人的肉棒进来啦～！」`,
          ); // :1977
          await era.printAndWait(
            `「虽然有点痛…不过完全可以忍受…因为主人火热的大鸡鸡～…插进里面实在是太舒服了啊～${heart(1)}」`,
          ); // :1978

          if (hometown_lover) {
            // :1980
            await era.printAndWait(
              `${target_name}用两腿紧紧的挟住${player_name}的腰发出了快活的呻吟。`,
            ); // :1981
            await era.printAndWait(
              `${target_name}与故乡的恋人相比选择了大鸡鸡的样子。`,
            ); // :1982
            await era.printAndWait(
              `「好爽～好爽～好爽！ 被大鸡鸡弄得好爽啊～！已经…离不开它了～${heart(1)}」`,
            ); // :1983
          } else {
            await era.printAndWait(
              `${target_name}用两腿紧紧的挟住${player_name}的腰发出了快活的呻吟………`,
            ); // :1984-1985
          }
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          era.get(`abl:${target}:10`) >= 5
        ) {
          // :1988
          await era.printAndWait(
            `「是…拜托了…主人…请把${sc()}重要的东西…夺走吧…♪」`,
          ); // :1989
          await era.printAndWait(
            `${target_name}有点害羞的把两腿张开、把${player_name}的大鸡鸡放了进来。`,
          ); // :1990
          await era.printAndWait(
            `「嗯嗯～！…咕…呜啊…哈啊…哈啊…没关系的、这种程度没问题的…啊啊～！」`,
          ); // :1991
          await era.printAndWait(
            `${target_name}一边忍受着破瓜的苦痛一边回应着你的欲望………`,
          ); // :1992

          if (hometown_lover) {
            // :1994
            await era.printAndWait(
              `（啊啊…${sc()}的…真命天子是…魔王大人………${heart(1)}）`,
            ); // :1995
            await era.printAndWait(
              `${target_name}在心中已经把故乡的恋人给忘掉了的样子………`,
            ); // :1996
          }
        } else {
          await era.printAndWait(`「求、求你了…再…温柔一点…啊～…咿～～…！」`); // :1999-2000
          await era.printAndWait(
            `${target_name}被压在身上侵犯了、因为破瓜的痛楚而哭出声来………`,
          ); // :2001

          if (hometown_lover) {
            // :2003
            await era.printAndWait(
              `「啊啊～…${sc()}…明明想把贞洁…献给那个人的…啊～…啊啊～！」`,
            ); // :2004
            await era.printAndWait(
              `${target_name}想起故乡的恋人、更加伤心的哭了起来………`,
            ); // :2005
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // :2009-2011
          await era.printAndWait(
            `「主人～${heart(1)}…紧紧地抱住我吧…让我们一起变的非常非常的快活吧${heart(1)}」`,
          ); // :2012

          if (v_sense >= 3 && v_insensible) {
            // :2015
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的吞下了${player_name}的大鸡鸡………`,
            ); // :2015
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2017
          await era.printAndWait(
            `「用这种姿势做的话…总觉得心跳不已呢…啊、讨、讨厌、${sc()}…为什么要把这都说出来…」`,
          ); // :2018
          await era.printAndWait(`${target_name}害羞的把脸埋进你的胸口………`); // :2019

          if (v_sense >= 3 && v_insensible) {
            // :2022
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了${player_name}的大鸡鸡………`,
            ); // :2022
          }
        } else {
          await era.printAndWait(`「咕～…请、请不要看我的脸…哈咕呜～！」`); // :2024-2025
          await era.printAndWait(
            `${target_name}一被插入就紧紧闭上眼睛嘴巴都歪了………`,
          ); // :2026

          if (v_insensible) {
            // :2029
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、使她而由于被插入的异物感而皱起了眉头。${target_name}痛苦呻吟着………`,
            ); // :2029
          }
        }
      }
      kojo.正常位 = 1; // :2032-2033
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2035-2038
        if (rand_n(3) === 0) {
          // :2039
          await era.printAndWait(
            `「肉棒好棒～${heart(1)}…好棒哦～${heart(1)}…好想被插一整天啊～${heart(1)}」`,
          ); // :2040
          await era.printAndWait(
            `${target_name}下流淫猥的声音在耳边回响着、如果是认识她的人听到的话一定会怀疑自己的耳朵是不是出问题了。`,
          ); // :2041
          await era.printAndWait(
            `「啊啊～…好棒～好棒～${heart(1)}…再来～…疯狂地～…把精液滚滚地射进来吧～${heart(1)}」`,
          ); // :2042
          await era.printAndWait(
            `${target_name}用手脚缠住${player_name}反复的接吻并被持续被侵犯着………`,
          ); // :2043
        } else if (rand_n(2) === 0) {
          // :2044
          await era.printAndWait(
            `「啊～…啊啊啊～${heart(1)}…要疯了～…要疯了啊～…咿～…咿～…要被肉棒弄疯了～${heart(1)}」`,
          ); // :2045
          await era.printAndWait(
            `${target_name}被抽插着阴道深处痛的唤出声来、抱住了${player_name}。`,
          ); // :2046
          await era.printAndWait(
            `「${sc()}…已、已经…变的不被操小穴…就活不下去了～${heart(1)}…所以…所以～${heart(1)} 请更疯狂地侵犯我吧～${heart(1)}」`,
          ); // :2047
        } else {
          await era.printAndWait(
            `「请再…再用力操我的小穴吧${heart(1)}…请用持久不倒的出色的大鸡鸡来操我吧～${heart(1)}」`,
          ); // :2048-2049
          await era.printAndWait(
            `「已经…除了这个什么也不想了…小穴…再狠狠地操小穴吧…疯狂地操我吧～！」`,
          ); // :2050
          await era.printAndWait(
            `${target_name}用两脚勾住${player_name}的腰、像动物似的娇喘起来………`,
          ); // :2051
        }
        kojo.正常位 = 9; // :2053
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2055
        if (rand_n(3) === 0) {
          // :2056
          await era.printAndWait(
            `「对、对不起…${sc()}…一被大鸡鸡插进来就…已…经、要…不行…了～${heart(1)}」`,
          ); // :2057
          await era.printAndWait(
            `${target_name}像中毒患者似的牙齿不停地打着冷战并抱紧了${player_name}。`,
          ); // :2058
          await era.printAndWait(
            `「嗯哦…啊啊…来～…吧～…动起来吧～…${sc()}的小穴～${heart(1)} 是主人专用的鸡鸡容器～${heart(1)} 想一直做爱下去～${heart(1)}」`,
          ); // :2059
          await era.printAndWait(
            `如果是过去认识${target_name}的人听到这些下流的话肯定会以为自己耳朵出问题了、${target_name}继续被${player_name}侵犯着………`,
          ); // :2060
        } else if (rand_n(2) === 0) {
          // :2061
          await era.printAndWait(
            `「啊～…啊啊～…已、已经…分不清…是喜欢主人…还是喜欢大鸡鸡了${heart(1)}…咿啊啊啊啊～${heart(1)}」」`,
          ); // :2062
          await era.printAndWait(
            `${target_name}被大鸡鸡插入阴道深处奄奄一息地痉挛着并紧紧地缠住大鸡鸡。`,
          ); // :2063
          await era.printAndWait(
            `「还要、还要…求求你…弄…弄坏也没事～…抱我～${heart(1)} 爱我～${heart(1)}…啊～啊啊啊～${heart(1)}」`,
          ); // :2064
        } else {
          await era.printAndWait(`「求你了…不要把大鸡鸡拔出来…${heart(1)}」`); // :2065-2066
          await era.printAndWait(
            `${target_name}用双手搂住${player_name}的脖子含情脉脉地抱住了${player_name}。`,
          ); // :2067
          await era.printAndWait(
            `「想永远感受着你的大鸡鸡～${heart(1)}…请尽情的把我干的一塌糊涂吧…${heart(1)}」`,
          ); // :2068
        }
        kojo.正常位 = 8; // :2070
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2072
        if (rand_n(3) === 0) {
          // :2073
          await era.printAndWait(
            `「啊咿～…继续…侵犯我…请继续侵犯我吧～…${heart(1)}」`,
          ); // :2074
          await era.printAndWait(
            `「小穴没被大肉棒插进去的话…就要发疯了啊啊啊～${heart(1)}」`,
          ); // :2075
          await era.printAndWait(
            `已经完全变成性爱狂的${target_name}用脚缠住${player_name}的腰舍不得松开………`,
          ); // :2076
        } else if (rand_n(2) === 0) {
          // :2077
          await era.printAndWait(`「小穴～…小穴还要～…${heart(1)}」`); // :2078
          await era.printAndWait(
            `「请用大肉棒尽情地蹂躏小穴吧～…子宫的里面也…用、精液填满吧～${heart(1)}」`,
          ); // :2079
          await era.printAndWait(
            `已经不会再去考虑做爱之外的事情的${target_name}一边流着口水一边不断地说着下流的话………`,
          ); // :2080
        } else {
          await era.printAndWait(
            `「哈啊～…啊～啊啊啊～…继续…继续干我的小穴吧${heart(1)}」`,
          ); // :2081-2082
          await era.printAndWait(
            `「已经…除了小穴其他什么也不想了～${heart(1)}」`,
          ); // :2083
          await era.printAndWait(
            `${target_name}看起来已经没法再考虑做爱之外的事情了、她堕落的脸上已经再也找不到一丝清纯的痕迹了………`,
          ); // :2084
        }
        kojo.正常位 = 7; // :2086
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2088
        if (rand_n(3) === 0) {
          // :2089
          await era.printAndWait(
            `「啊啊啊～…大肉棒…在里面～…${heart(1)} 咿～啊～…啊啊啊～${heart(1)}」`,
          ); // :2090

          if (v_sense >= 3 && v_insensible) {
            // :2092
            await era.printAndWait(
              `「啊啊～…${sc()}的小穴里…变成大肉棒的形状了～…${heart(1)}」`,
            ); // :2093
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            ); // :2094
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`); // :2095
          } else if (v_insensible) {
            // :2097
            await era.printAndWait(
              `「咕～…啊～…啊啊啊～………呐…还想再要…大鸡鸡啊${heart(1)}」`,
            ); // :2098
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。但是${target_name}很快就发出了娇艳的呻吟声………`,
            ); // :2099
          } else {
            await era.printAndWait(
              `「再来…像禽兽一样的插进来…继续侵犯${sc()}吧～${heart(1)}」`,
            ); // :2100-2101
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`); // :2102
          }
        } else if (rand_n(2) === 0) {
          // :2104
          await era.printAndWait(
            `「继续侵犯我吧～…${heart(1)} 想要被操到小穴变形啊～${heart(1)}」`,
          ); // :2105

          if (v_sense >= 3 && v_insensible) {
            // :2107
            await era.printAndWait(
              `「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～${heart(1)}」`,
            ); // :2108
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            ); // :2109
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`); // :2110
          } else if (v_insensible) {
            // :2112
            await era.printAndWait(`「呜咕呜～…进来了…进来了～${heart(1)}」`); // :2113
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。但是${target_name}很快就发出了娇艳的呻吟声………`,
            ); // :2114
          } else {
            await era.printAndWait(
              `「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～${heart(1)}」`,
            ); // :2115-2116
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`); // :2117
          }
        } else {
          await era.printAndWait(
            `「啊～啊啊～哈呜呜～…和主人做爱被操着小穴感觉格外的舒服呢～${heart(1)}」`,
          ); // :2119-2120
          await era.printAndWait(
            `「早知道是这么快乐这么舒服的事情的话…真想更早一点的体验到呢…${heart(1)}」`,
          ); // :2121

          if (v_sense >= 3 && v_insensible) {
            // :2123
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            ); // :2124
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`); // :2125
          } else if (v_insensible) {
            // :2127
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。但是${target_name}很快就发出了娇艳的呻吟声………`,
            ); // :2128
          } else {
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`); // :2129-2130
          }
        }
        kojo.正常位 = 6; // :2133
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2135
        if (rand_n(3) === 0) {
          // :2136
          await era.printAndWait(
            `「啊啊…请更多的疼爱我…啊～…嗯～…这样…真舒服～${heart(1)}」`,
          ); // :2137

          if (v_sense >= 3 && v_insensible) {
            // :2139
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            ); // :2140
            await era.printAndWait(
              `「主人能这样疼爱我并教会我如此愉悦的事情…真是…感激…不尽${heart(1)}」`,
            ); // :2141
            await era.printAndWait(
              `${target_name}好像很舒服的仰起下巴、呼了口气………`,
            ); // :2142
          } else if (v_insensible) {
            // :2144
            await era.printAndWait(`「啊啊…呜、好深…好深啊………${heart(1)}」`); // :2145
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
            ); // :2146
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            ); // :2147
          } else {
            await era.printAndWait(
              `「啊啊…被爱着的愉悦…真美妙…${heart(1)} 啊～…啊啊～…又插的…更深了${heart(1)}」`,
            ); // :2148-2149
            await era.printAndWait(
              `${target_name}每当被插进阴道深处就会发出娇喘声………`,
            ); // :2150
          }
        } else if (rand_n(2) === 0) {
          // :2152
          await era.printAndWait(
            `「哈啊…啊啊～…嗯～…再用力…抱我～${heart(1)}」`,
          ); // :2153

          if (v_sense >= 3 && v_insensible) {
            // :2155
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            ); // :2156
            await era.printAndWait(
              `「好棒～…这样好棒～…${heart(1)} 啊啊～…请让我变得更舒服吧…${heart(1)}」`,
            ); // :2157
            await era.printAndWait(
              `${target_name}脉脉含情地在${player_name}的耳边轻声说着并发出了娇喘声………`,
            ); // :2158
          } else if (v_insensible) {
            // :2160
            await era.printAndWait(
              `「哈咕呜～…啊、啊啊啊…求…求你了…再…温柔一点…啊呜～！」`,
            ); // :2161
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
            ); // :2162
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            ); // :2163
          } else {
            await era.printAndWait(
              `「还想…还想更多地感受着主人～…所以…所以～…啊～…啊啊～${heart(1)}」`,
            ); // :2164-2165
            await era.printAndWait(
              `${target_name}不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………`,
            ); // :2166
          }
        } else {
          await era.printAndWait(
            `「那、那个…再…再激烈一点也可以哦…咿呀～～♪」`,
          ); // :2168-2169
          await era.printAndWait(
            `「是、是的…对不起…我会老实说的！…还想…还想和你一起变的更舒服呢………${heart(1)}」`,
          ); // :2170

          if (v_sense >= 3 && v_insensible) {
            // :2172
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            ); // :2173
            await era.printAndWait(
              `${target_name}不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………`,
            ); // :2174
          } else if (v_insensible) {
            // :2176
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
            ); // :2177
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            ); // :2178
          } else {
            await era.printAndWait(
              `${target_name}不好意思的笑了并动起了腰身、抛着媚眼撒娇………`,
            ); // :2179-2180
          }
        }
        kojo.正常位 = 5; // :2183
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2185
        await era.printAndWait(
          `「咕呜～…呜呜～！啊～啊啊啊啊！再、再这样下去的话…${scf()}、${sc()}…就要…」`,
        ); // :2186
        await era.printAndWait(
          `「真的…不行了…要不行了啊…明明是被侵犯…竟然会这么的…啊啊～！」`,
        ); // :2187

        if (v_insensible) {
          // :2190
          await era.printAndWait(
            `${target_name}钝感的私处被开发得感觉到了快乐、很愉快的吞下了${player_name}的大鸡鸡………`,
          ); // :2190
        }
        kojo.正常位 = 4; // :2191
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2193
        await era.printAndWait(
          `「啊咕～…啊呜唔～♪…没、没事的…请随意动起来吧…啊啊～」`,
        ); // :2194

        if (v_insensible) {
          // :2197
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}忍着痛苦没有吭声的样子………`,
          ); // :2197
        }
        kojo.正常位 = 3; // :2198
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        // :2200
        await era.printAndWait(`「啊～…呜…咕～…哈咕～！…呜呜呜～！」`); // :2201
        await era.printAndWait(`${target_name}咬牙忍受着钝痛感………`); // :2202

        if (v_insensible) {
          // :2205
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}发出了痛苦的声音………`,
          ); // :2205
        }
        kojo.正常位 = 2; // :2206-2208
      }
      return 0;
    }
  }

  // :2215 IF SELECTCOM == 21（背后位，CFLAG:322）
  if (era_flag.selectcom === 21) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.背后位 === 0) {
      // :2217

      if (era.get(`talent:${target}:0`) === 1) {
        // :2219

        if (era.get(`talent:${target}:76`) === 1) {
          // :2221
          await era.printAndWait(
            `${target_name}用跪坐的姿势并把头贴在地上、将屁股高高抬起。`,
          ); // :2222
          await era.printAndWait(
            `「能被您夺走${sc()}的第一次……我从心底表示感谢～${heart(1)}」`,
          ); // :2223
          await era.printAndWait(
            `${player_name}抓住她的腰毫不犹豫的把肉棒插进了阴道深处。`,
          ); // :2224
          await era.printAndWait(
            `途中感到穿破了处女膜。肉棒一进入深处就被温热的阴道壁紧紧包住。`,
          ); // :2225
          await era.printAndWait(
            `「呀啊呜唔～…淫乱的处女膜被弄破了～…啊啊～…好开心～好开心啊～！」`,
          ); // :2226

          if (hometown_lover) {
            // :2228
            await era.printAndWait(
              `${target_name}比起故乡的恋人而选择了能为自己带来无限快乐的鸡鸡的样子。`,
            ); // :2229
            await era.printAndWait(
              `「嗯～♪…${sc()}的恋人是…世界上所有的大鸡鸡～…不过最喜欢的是现在插进来的大鸡鸡哦…${heart(1)}」`,
            ); // :2230
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2233
          await era.printAndWait(
            `「从、从后面来吗…没、没事的…那、那个请温柔一点…咿呀啊啊～～！」`,
          ); // :2234
          await era.printAndWait(
            `${player_name}向${target_name}发出了决定性的一击将阴茎插进了阴道里。`,
          ); // :2235
          await era.printAndWait(
            `途中感到穿破了处女膜。${target_name}禁不住悲鸣起来。`,
          ); // :2236
          await era.printAndWait(
            `「啊～啊咿～～～！…总觉得～…这样好像和动物似的呢…好棒～…好棒啊～♪」`,
          ); // :2237

          if (hometown_lover) {
            // :2239
            await era.printAndWait(
              `「啊啊～…${sc()}是…魔王大人的所有物～…绝对不会背离的${heart(1)}…啊啊啊～${heart(1)}」`,
            ); // :2240
            await era.printAndWait(
              `${target_name}的脑海里已经把故乡的恋人完全忘掉了的样子………`,
            ); // :2241
          }
        } else {
          await era.printAndWait(
            `「这、这种像动物一般的姿势…咕呜…呜呜～…啊～啊啊啊啊啊～！」`,
          ); // :2244-2245

          if (hometown_lover) {
            // :2247
            await era.printAndWait(`「啊啊～…对不起…对不起～…呜呜～！」`); // :2248
            await era.printAndWait(
              `${target_name}想起故乡的恋人、流下了眼泪………`,
            ); // :2249
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // :2253-2255
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「是～…请尽管从后面来吧${heart(1)}　哈啊～～…果然被侵犯真是最棒了～${heart(1)}」`,
          ); // :2256
          await era.printAndWait(`「再来啊…把我侵犯到坏掉吧～！」`); // :2257

          if (v_sense >= 3 && v_insensible) {
            // :2260
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            ); // :2260
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2262
          await era.printAndWait(`「啊～…这个姿势好害羞…不过………」`); // :2263
          await era.printAndWait(
            `「啊～啊啊啊～…！讨厌…明明很害羞却兴奋起来了～…♪」`,
          ); // :2264
          await era.printAndWait(`「更多…请更多的疼爱我吧…♪」`); // :2265

          if (v_sense >= 3 && v_insensible) {
            // :2268
            await era.printAndWait(
              `${target_name}钝感的私处经过开发觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            ); // :2268
          }
        } else {
          await era.printAndWait(
            `「不要用这种像动物一样的姿势…这样…不行…啊啊啊～」`,
          ); // :2270-2271

          if (v_insensible) {
            // :2274
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。${target_name}发出了痛苦的声音………`,
            ); // :2274
          }
        }
      }
      kojo.背后位 = 1; // :2277-2278
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2280-2282
        if (rand_n(3) === 0) {
          // :2283
          await era.printAndWait(
            `「嗯哈啊～啊～啊啊～咿啊啊啊～！${heart(1)} 再用力插我～${heart(1)}」`,
          ); // :2284
          await era.printAndWait(
            `「还想再要大肉棒～${heart(1)} 想要更多…更多的大肉棒啊～${heart(1)}」`,
          ); // :2285
        } else if (rand_n(2) === 0) {
          // :2286
          await era.printAndWait(
            `「已经…只要有大肉棒插进来的话…是谁都无所谓了～…${heart(1)}」`,
          ); // :2287
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰好像为了拍打屁股似的一次一次地把腰向前送。`,
          ); // :2288
          await era.printAndWait(
            `「啊咿呀啊～${heart(1)} 好棒～${heart(1)}好棒～${heart(1)} 对不起～…这个大肉棒～…主人的大肉棒实在太棒了～${heart(1)}」`,
          ); // :2289
        } else {
          await era.printAndWait(
            `「嗯～嗯嗯～嗯～…啊呜唔呜…不要拔出来…不要把大肉棒拔出来…${heart(1)}」`,
          ); // :2290-2291
          await era.printAndWait(
            `${target_name}淫荡的扭着屁股、向${player_name}撒娇。`,
          ); // :2292
          await era.printAndWait(
            `「我已经…没有大肉棒…就活不去了～…呜啊…不要拔…啊～${heart(1)}啊啊～${heart(1)}啊哈啊～${heart(1)}」`,
          ); // :2293
        }
        kojo.背后位 = 9; // :2295
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2297
        if (rand_n(3) === 0) {
          // :2298
          await era.printAndWait(`「啊啊～…再来～…再来啊～${heart(1)}」`); // :2299
          await era.printAndWait(
            `${target_name}用平常想象不出来的样子淫荡地扭着屁股。`,
          ); // :2300
          await era.printAndWait(
            `「好深…好棒～…主人…请再侵犯我的小穴吧…～${heart(1)}」`,
          ); // :2301
        } else if (rand_n(2) === 0) {
          // :2302
          await era.printAndWait(
            `「${sc()}的屁股…小穴…都是为了取悦主人而存在的…${heart(1)}」」`,
          ); // :2303
          await era.printAndWait(`「所以…请尽管随意使用吧～${heart(1)}」`); // :2304
          await era.printAndWait(
            `${target_name}为了能让自己被更多的侵犯而用令人心神荡漾的声音向你撒娇………`,
          ); // :2305
        } else {
          await era.printAndWait(`「请更多地欺负我的小穴吧～${heart(1)}」`); // :2306-2307
          await era.printAndWait(
            `「请在主人专用的小穴里用精液播种吧～${heart(1)}」`,
          ); // :2308
          await era.printAndWait(
            `已经完全陷落并沉溺于性爱的快乐中的${target_name}不知羞耻地淫荡地呻吟着………`,
          ); // :2309
        }
        kojo.背后位 = 8; // :2311
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2313
        if (rand_n(3) === 0) {
          // :2314
          await era.printAndWait(
            `「啊啊～…请再像…动物一样的操我吧～…${heart(1)}」`,
          ); // :2315
          await era.printAndWait(
            `「${scf()}…${sc()}已经是…大肉棒的奴隶了～${heart(1)}」`,
          ); // :2316
          await era.printAndWait(
            `每次抽送、${target_name}的私处都会溢出泡沫一样的爱液………`,
          ); // :2317
        } else if (rand_n(2) === 0) {
          // :2318
          await era.printAndWait(
            `「再…用力插…想被大肉棒塞得满满的～…${heart(1)}」`,
          ); // :2319
          await era.printAndWait(`「已经…不会再去想做爱之外的事情了～…」`); // :2320
          await era.printAndWait(
            `${target_name}好像想被进一步侵犯似的高高抬起了屁股………`,
          ); // :2321
        } else {
          await era.printAndWait(
            `「不管被侵犯几次…都不会生厌…已经…不会去想…没有做爱的生活了～…」`,
          ); // :2322-2323
          await era.printAndWait(`「所以～…更多更多地侵犯我吧～…${heart(1)}」`); // :2324
          await era.printAndWait(
            `${target_name}像变成一只动物似的、连子宫口都臣服于做爱的快感中而敞开了………`,
          ); // :2325
        }
        kojo.背后位 = 7; // :2327
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2329
        if (rand_n(3) === 0) {
          // :2330
          await era.printAndWait(
            `「呀呜～！哈啊…啊啊～…咿呀～～！好爽啊～…随心所欲的叫床！要变成动物了～！」`,
          ); // :2331
          await era.printAndWait(
            `「咿呀～啊啊～…啊啊～…好喜欢！像动物一样的做爱好喜欢啊！」`,
          ); // :2332
        } else if (rand_n(2) === 0) {
          // :2333
          await era.printAndWait(
            `「啊～…啊啊～…好紧～！再来～…再使用${sc()}的身体吧…请尽情使用～${heart(1)}」`,
          ); // :2334
          await era.printAndWait(
            `「${target_name}是非常喜欢被人从后面哧噗哧噗地侵犯的变态勇者啊～♪」`,
          ); // :2335
        } else {
          await era.printAndWait(
            `「啊～啊啊～…像动物一样的做爱好爽啊…${heart(1)}」`,
          ); // :2336-2337
          await era.printAndWait(
            `「一被这样侵犯…就好像自己变成了最低等的动物似的…最棒…了～${heart(1)}」`,
          ); // :2338
        }
        if (v_sense >= 3 && v_insensible) {
          // :2341
          await era.printAndWait(
            `${target_name}钝感的私处被调教出了快感、好像很愉快的吞下了从后面插进来的${player_name}的大鸡鸡、滴落出了爱液………`,
          ); // :2342
        } else if (v_insensible) {
          // :2344
          await era.printAndWait(
            `虽然${target_name}的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子………`,
          ); // :2345
        }
        kojo.背后位 = 6; // :2347
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2349
        if (rand_n(3) === 0) {
          // :2350
          await era.printAndWait(
            `「啊啊～…啊～…好舒服～！请继续…侵犯我吧…！」`,
          ); // :2351
          await era.printAndWait(
            `「被你这样做是最…最舒服的事情了…咿呀～～…啊啊～…好开心…♪」`,
          ); // :2352

          if (v_sense >= 3 && v_insensible) {
            // :2354
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            ); // :2355
          } else if (v_insensible) {
            // :2357
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。`,
            ); // :2358
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            ); // :2359
          }
        } else if (rand_n(2) === 0) {
          // :2361
          await era.printAndWait(
            `「啊啊～…${sc()}的屁股就是为了像这样被主人侵犯而存在的呢…♪」`,
          ); // :2362
          await era.printAndWait(
            `「是～…直到主人满足为止…请把精液满满地注入进来吧♪」`,
          ); // :2363

          if (v_sense >= 3 && v_insensible) {
            // :2365
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            ); // :2366
          } else if (v_insensible) {
            // :2368
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。`,
            ); // :2369
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            ); // :2370
          }
        } else {
          await era.printAndWait(
            `「哈啊～～…不要太过欺负${sc()}的小穴啊～…咿咿咿咿～！」`,
          ); // :2372-2373
          await era.printAndWait(
            `${player_name}抓住哀叫着的${target_name}的屁股、更加粗暴地往阴道里面抽插`,
          ); // :2374
          await era.printAndWait(`${target_name}发出了格外尖厉的悲鸣声。`); // :2375

          if (v_sense >= 3 && v_insensible) {
            // :2377
            await era.printAndWait(
              `「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～${heart(1)}」`,
            ); // :2378
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、毫不间断的持续为${target_name}带来快感………`,
            ); // :2379
          } else if (v_insensible) {
            // :2381
            await era.printAndWait(
              `虽然${target_name}的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子………`,
            ); // :2382
          } else {
            await era.printAndWait(
              `「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～${heart(1)}」`,
            ); // :2383-2384
          }
        }
        kojo.背后位 = 5; // :2387
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2389
        await era.printAndWait(
          `「哈啊～…啊啊～啊～…啊啊～！不、不行…再这样被用力地做的话～…」`,
        ); // :2390
        await era.printAndWait(
          `「就、就会变的只知道…只知道大鸡鸡了啊～…啊啊啊～！」`,
        ); // :2391

        if (v_insensible) {
          // :2394
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
          ); // :2394
        }
        kojo.背后位 = 4; // :2395
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2397
        await era.printAndWait(
          `（啊啊…${sc()}竟然把屁股抬得这么高也能无动于衷…呜呜）`,
        ); // :2398
        await era.printAndWait(
          `${target_name}咬牙忍耐着并在阴道深处被侵犯时发出呻吟。`,
        ); // :2399
        await era.printAndWait(
          `「哈啊～…啊啊～啊～…啊啊～！…咕呜～…咿～…嗯～啊呜呜～！」`,
        ); // :2400

        if (v_insensible) {
          // :2403
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。${target_name}高声悲鸣起来………`,
          ); // :2403
        }
        kojo.背后位 = 3; // :2404
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // :2406
        await era.printAndWait(
          `「这样…完全算不了什么…咦～…这不是像动物一样吗…？不、不对…你搞错了…吧」`,
        ); // :2407
        await era.printAndWait(
          `「${scf()}、${sc()}是…人类啊…这种动物一样的姿势才不会…有、感觉～…啊～…啊呜呜～！」`,
        ); // :2408

        if (v_insensible) {
          // :2411
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。${target_name}发出了痛苦的声音………`,
          ); // :2411
        }
        kojo.背后位 = 2; // :2412-2414
      }
      return 0;
    }
  }

  // :2421 IF SELECTCOM == 22（对面座位，CFLAG:323）
  if (era_flag.selectcom === 22) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.对面座位 === 0) {
      // :2422

      if (era.get(`talent:${target}:0`) === 1) {
        // :2424

        if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(''); // :2426-2427
        } else {
          await era.printAndWait(''); // :2429-2430
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // :2433-2435
          await era.printAndWait(`「嗯啾…啾～…嗯啾唔唔…啊啊啊～${heart(1)}」`); // :2436
          await era.printAndWait(
            `「一边和主人接吻…一边被操着小穴真是太棒了～${heart(1)}」`,
          ); // :2437

          if (v_sense >= 3 && v_insensible) {
            // :2439-2440
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的吞下了${player_name}插进来的大鸡鸡………`,
            ); // :2439-2440
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2442
          await era.printAndWait(
            `「啊～…呜啊～…呀呜～…不、不行了…被这样吻的话…啊～♪」`,
          ); // :2443
          await era.printAndWait(
            `「那个地方…太有感觉了～…咿呀～～啊～啊啊～…被插的快不行了啊～♪」`,
          ); // :2444

          if (v_sense >= 3 && v_insensible) {
            // :2446-2447
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了${player_name}插进来的大鸡鸡………`,
            ); // :2446-2447
          }
        } else {
          await era.printAndWait(
            `「还能这样做啊…啊～～…啊～…啊呜～…再…温柔一点…」`,
          ); // :2449-2450
          await era.printAndWait(`${target_name}有点生疏地动着腰………`); // :2451

          if (v_insensible) {
            // :2453-2454
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}喘息不已………`,
            ); // :2453-2454
          }
        }
      }
      kojo.对面座位 = 1; // :2457-2458
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2460-2462
        if (rand_n(3) === 0) {
          // :2463
          await era.printAndWait(
            `「啊啊啊～…大肉棒插得好深…主人的大肉棒插得好深啊～${heart(1)} 插进小穴的深处了～${heart(1)}」`,
          ); // :2464
          await era.printAndWait(
            `${target_name}一边发出淫荡的娇喘声一边在${master_name}的身上晃动着腰。`,
          ); // :2465
          await era.printAndWait(
            `「再多的～…让我感受大肉棒吧${heart(1)} 把精液满满地射进来～${heart(1)}」`,
          ); // :2466
        } else if (rand_n(2) === 0) {
          // :2467
          await era.printAndWait(
            `「啊～${heart(1)} 啊啊～${heart(1)}…主人的大肉棒～…全部插进来让${sc()}好舒服啊～…主人你不用动也行哦～…${heart(1)}」`,
          ); // :2468
          await era.printAndWait(
            `${target_name}用自己的双腿像蜘蛛一样缠住了${master_name}的腰并自己剧烈地动起了腰。`,
          ); // :2469
          await era.printAndWait(
            `「嗯哈啊～～${heart(1)}…这个肉棒好棒～！好棒啊～！…果然已经不能没有大肉棒了啊～${heart(1)}」`,
          ); // :2470
        } else {
          await era.printAndWait(
            `「啊啊啊啊～…大肉棒一进来…就、要、不行了…已经…什么事情都不想考虑了…${heart(1)}」`,
          ); // :2471-2472
          await era.printAndWait(
            `${target_name}的阴道深处被肉棒深深地插了进去、她的眼睛里已经完全失去了理性之光。`,
          ); // :2473
          await era.printAndWait(
            `「嗯咕呜呜嗯唔…啊～啊啊～啊哈啊啊～…哈啊啊…再插…再插吧～…要疯掉啦～${heart(1)}」`,
          ); // :2474
        }
        kojo.对面座位 = 9; // :2476
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2478
        if (rand_n(3) === 0) {
          // :2479
          await era.printAndWait(`「啊啊～…主人不用动也行哦～${heart(1)}」`); // :2480
          await era.printAndWait(
            `${target_name}用迷醉而荡漾的眼神看着你、自己开始动了起来。`,
          ); // :2481
          await era.printAndWait(
            `「这大鸡鸡全部都是${sc()}的～${heart(1)} ${sc()}的～${heart(1)}」`,
          ); // :2482
        } else if (rand_n(2) === 0) {
          // :2483
          await era.printAndWait(
            `「嗯咕呜…啊～啊啊啊…好幸福～${heart(1)}…感觉好幸福啊～…${heart(1)}」`,
          ); // :2484
          await era.printAndWait(
            `${target_name}抱着${master_name}不停地发出放荡的娇喘声。`,
          ); // :2485
          await era.printAndWait(
            `「${sc()}的小穴…已经变成主人的专用小穴了～${heart(1)} 千万别拔出来哦～${heart(1)}」`,
          ); // :2486
        } else {
          await era.printAndWait(
            `「啊咿呀啊～…里面…贴在一起了${heart(1)} 再紧点…再紧紧的抱住我～…不要拔～${heart(1)}」`,
          ); // :2487-2488
          await era.printAndWait(
            `按照${target_name}所说的紧紧顶住阴道口、她就在${player_name}的耳边呼着灼热的气息。`,
          ); // :2489
          await era.printAndWait(
            `「哈啊…哈啊…请用${sc()}的淫荡小穴～…尽情享受吧～…${heart(1)}」`,
          ); // :2490
        }
        kojo.对面座位 = 8; // :2492
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2494
        if (rand_n(3) === 0) {
          // :2495
          await era.printAndWait(
            `「啊啊～…还要…再来…再来～…欺负小穴吧～………${heart(1)}」`,
          ); // :2496
          await era.printAndWait(
            `${target_name}抱住${master_name}、秀眉因为快感而颤动不已。`,
          ); // :2497
          await era.printAndWait(`${target_name}已经除了做爱之外啥都不想了………`); // :2498
        } else if (rand_n(2) === 0) {
          // :2499
          await era.printAndWait(`「动、动啊～…请再动吧～…${heart(1)}」`); // :2500
          await era.printAndWait(
            `「我还想再要大肉棒～…真拿你没办法呢～…啊啊～…原谅我…原谅我～${heart(1)}」`,
          ); // :2501
          await era.printAndWait(
            `${target_name}一边不成体统的撒娇着一边自己摇着腰贪求着快乐………`,
          ); // :2502
        } else {
          await era.printAndWait(
            `「哈咿呀啊～${heart(1)} 大肉棒${heart(1)} 大肉棒～${heart(1)} 大肉棒～${heart(1)}」`,
          ); // :2503-2504
          await era.printAndWait(
            `「小穴…已经…要不行啦～…啊啊～${heart(1)} 啊～${heart(1)}」`,
          ); // :2505
          await era.printAndWait(
            `${target_name}不成体统的大张着嘴贪求着快乐………`,
          ); // :2506
        }
        kojo.对面座位 = 7; // :2508
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2510
        if (rand_n(3) === 0) {
          // :2511
          await era.printAndWait(
            `「啾～啾～…嗯呜唔呜…喜欢…好喜欢…唔嗯…不管是做爱还是主人都好喜欢哦？」`,
          ); // :2512
          await era.printAndWait(
            `「竟然还有这么舒服的事情…多亏主人能告诉我真是太感谢了～${heart(1)}」`,
          ); // :2513
          await era.printAndWait(`「所以～…再多多的和我做吧～${heart(1)}」`); // :2514
        } else if (rand_n(2) === 0) {
          // :2515
          await era.printAndWait(
            `「呀呜唔～…啊～啊啊～…请再用力插我～${heart(1)}」`,
          ); // :2516
          await era.printAndWait(
            `「呀～啊啊啊～…咕～…好紧～${heart_black(3)}」`,
          ); // :2517
          await era.printAndWait(
            `「再…再贴紧一点～…好想被干到心醉神驰啊～…${heart(1)}」`,
          ); // :2518
        } else {
          await era.printAndWait(
            `「哈呜～…啊啊～啊～…啊啊～～！喜欢～好喜欢～！」`,
          ); // :2519-2520
          await era.printAndWait(
            `「大肉棒不要拿走～…好想一直这样下去～！不要走～！」`,
          ); // :2521
        }

        if (v_sense >= 3 && v_insensible) {
          // :2524
          await era.printAndWait(
            `${target_name}钝感的私处经由调教开发获得了快感、持续不断地带给${target_name}淫靡的快感………`,
          ); // :2525
        } else if (v_insensible) {
          // :2527
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被鸡鸡侵犯的事实在脑海中回荡………`,
          ); // :2528
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          ); // :2529-2530
        }
        kojo.对面座位 = 6; // :2532
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2534
        if (rand_n(3) === 0) {
          // :2535
          await era.printAndWait(`「哈啊～…啊～嗯～…请热烈地…亲我…♪」`); // :2536
          await era.printAndWait(`「一这样做…每次接吻…都感觉快要去了～…♪」`); // :2537
          await era.printAndWait(
            `「咿呀～～啊～啊啊～！再、再这样亲吻下去的话～…啊～啊～啊啊啊！」`,
          ); // :2538
        } else if (rand_n(2) === 0) {
          // :2539
          await era.printAndWait(`「嗯啾～…啾～…噗啊～…」`); // :2540
          await era.printAndWait(
            `「${sc()}的身体…是为了和主人以爱结合才存在的～…额呵呵♪」`,
          ); // :2541
          await era.printAndWait(`${target_name}含情脉脉的看着你的脸。`); // :2542
        } else {
          await era.printAndWait(`「哈啊～…啊～啊啊啊～～！」`); // :2543-2544
          await era.printAndWait(
            `「不要～…不要拔出来…再抱紧一点…不要拔出来～…♪」`,
          ); // :2545
        }

        if (v_sense >= 3 && v_insensible) {
          // :2548
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、毫不间断的带给${target_name}甘美的快感………`,
          ); // :2549
        } else if (v_insensible) {
          // :2551
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被${player_name}抱了的事实在脑海中回荡………`,
          ); // :2552
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          ); // :2553-2554
        }
        kojo.对面座位 = 5; // :2556
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2558
        await era.printAndWait(
          `「哈啊～…啊～咕呜～！…不要～…不要让紧紧黏在一起的小鸡鸡和小穴分开啊～…」`,
        ); // :2559

        if (v_insensible) {
          // :2561-2562
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、把插进来的${player_name}的鸡鸡毫不费力地连根吞了下去………`,
          ); // :2561-2562
        }
        kojo.对面座位 = 4; // :2563
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2565

        if (v_insensible) {
          // :2567
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
          ); // :2568
          await era.printAndWait(`「啊啊～啊～哈呜～………咕～……啊～啊啊～！」`); // :2569
          await era.printAndWait(`${target_name}忍耐着还是发出了痛苦的声音………`); // :2570
        } else {
          await era.printAndWait(
            `「啊啊～啊～哈呜～…为什么…不拔出来啊～？…啊～啊啊～！」`,
          ); // :2571-2572
        }
        kojo.对面座位 = 3; // :2574
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // :2576
        await era.printAndWait(`「啊～啊啊…嗯～嗯呜唔～………」`); // :2577

        if (v_insensible) {
          // :2579-2580
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}痛苦呻吟着………`,
          ); // :2579-2580
        }
        kojo.对面座位 = 2; // :2581
      }
      return 0;
    }
  }

  // :2590 IF SELECTCOM == 23（背面座位，CFLAG:324）
  if (era_flag.selectcom === 23) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.背面座位 === 0) {
      // :2591

      if (era.get(`talent:${target}:0`) === 1) {
        // :2593

        if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(''); // :2595-2596
        } else {
          await era.printAndWait(''); // :2598-2599
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // :2602-2604
          await era.printAndWait(
            `「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…${heart_black(3)}」`,
          ); // :2605

          if (v_sense >= 3 && v_insensible) {
            // :2607-2608
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的连根吞下了${player_name}插进来的大鸡鸡………`,
            ); // :2607-2608
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2610
          await era.printAndWait(
            `「一这样被从后面抱住…就觉得有点不好意思呢…呀～！」`,
          ); // :2611
          await era.printAndWait(
            `「真、真是的…明明好不容易感到爱意、就搞这种恶作剧…呀呜～！咿呀～…呀啊～♪」`,
          ); // :2612

          if (v_sense >= 3 && v_insensible) {
            // :2614-2615
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的连根吞下了${player_name}插进来的大鸡鸡………`,
            ); // :2614-2615
          }
        } else {
          await era.printAndWait(
            `「啊～…不、不要…这种姿势…好深…呀啊～不要啊～…」`,
          ); // :2617-2618

          if (v_insensible) {
            // :2620-2621
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}痛苦的呻吟着………`,
            ); // :2620-2621
          } else {
            await era.printAndWait(
              `${target_name}被鸡鸡插进阴道深处有点痛苦的喘息着………`,
            ); // :2622-2623
          }
        }
      }
      kojo.背面座位 = 1; // :2627-2628
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2630-2632
        if (rand_n(3) === 0) {
          // :2633
          await era.printAndWait(
            `「嗯啊～…啊～哈啊啊啊…再动啊～${heart(1)} 让我好好感下吧～…${heart(1)}」`,
          ); // :2634
          await era.printAndWait(
            `${target_name}的话已经变得下流淫靡而不堪入耳了。`,
          ); // :2635
          await era.printAndWait(
            `「啊～啊啊啊…${heart(1)} 感到大肉棒了～好有感觉啊～～…${heart(1)}」`,
          ); // :2636
        } else if (rand_n(2) === 0) {
          // :2637
          await era.printAndWait(
            `「啊啊～…嗯～嗯哈～…啊啊～…更多的…请更多的欺负我吧～…${heart(1)}」`,
          ); // :2638
          await era.printAndWait(
            `「乳房快揉碎了…小穴也要磨破了、好爽…尽情的干我啊～${heart(1)}」`,
          ); // :2639
          await era.printAndWait(
            `${target_name}爽的已经完全不去考虑其他的事情了………`,
          ); // :2640
        } else {
          await era.printAndWait(
            `「嗯咿嗯～咿啊～啊～啊啊啊～…不要拔…不要把大肉棒拔出来…再让我更舒服吧～${heart(1)}」`,
          ); // :2641-2642
          await era.printAndWait(
            `${target_name}把两条腿打开成Ｏ型、如狼似虎地上下摇晃着腰身。`,
          ); // :2643
          await era.printAndWait(
            `「啊啊啊～…好爽啊…小穴…已经…好像要融化了～…${heart(1)}」`,
          ); // :2644
        }
        kojo.背面座位 = 9; // :2646
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2648
        if (rand_n(3) === 0) {
          // :2649
          await era.printAndWait(`「啊～～…啊～啊哈～…啊啊啊………${heart(1)}」`); // :2650
          await era.printAndWait(
            `${target_name}一被鸡鸡插进深处就发出了快乐的呻吟声。`,
          ); // :2651
          await era.printAndWait(
            `「已经…不行了…这个大鸡鸡是…${sc()}的…只属于${sc()}的啊…啊啊～啊～啊哈啊${heart(1)}」`,
          ); // :2652
        } else if (rand_n(2) === 0) {
          // :2653
          await era.printAndWait(
            `「啊啊啊…更多的…侵犯我…${sc()}的小穴～…${heart(1)} 请把它干得一塌糊涂吧～${heart(1)}」`,
          ); // :2654
          await era.printAndWait(
            `${target_name}把两条腿打开成Ｏ型、淫荡地前后摇动着腰。`,
          ); // :2655
          await era.printAndWait(
            `「${sc()}只顾着自己爽真是对不起了呢～～…不过～${heart(1)}但是～${heart(1)}停不下来啊～${heart(1)}」`,
          ); // :2656
        } else {
          await era.printAndWait(
            `「更多…更多的侵犯我吧～${heart(1)} 把${sc()}的淫荡小穴…进一步的玷污吧～${heart(1)}」`,
          ); // :2657-2658
          await era.printAndWait(`${target_name}挺着腰身、高声哭叫着。`); // :2659
          await era.printAndWait(
            `「请用主人的精液…把小穴装的满满的吧～…拜托了～${heart(1)}」`,
          ); // :2660
        }
        kojo.背面座位 = 8; // :2662
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2664
        if (rand_n(3) === 0) {
          // :2665
          await era.printAndWait(
            `「啊啊～…用这种不像话的姿势…感觉格外的舒服呢${heart(1)}」`,
          ); // :2666
          await era.printAndWait(
            `「哈啊～…${scf()}、${sc()}…已经…已经…${heart(1)}」`,
          ); // :2667
          await era.printAndWait(`${target_name}沉溺于性爱之中、娇喘不已………`); // :2668
        } else if (rand_n(2) === 0) {
          // :2669
          await era.printAndWait(`「好深啊…大肉棒插得好深啊…${heart(1)}」`); // :2670
          await era.printAndWait(
            `「呀啊呜～${heart(1)} 啊啊啊～…${sc()}的小穴…感觉变的收缩起来了～…${heart(1)}」`,
          ); // :2671
          await era.printAndWait(
            `${target_name}像痉挛了似的不断收缩着阴道口………`,
          ); // :2672
        } else {
          await era.printAndWait(
            `「啊啊～…啊哈啊～…好美味啊…大肉棒好美味啊～${heart(1)}」`,
          ); // :2673-2674
          await era.printAndWait(
            `${target_name}贪婪的上下动着腰、享受着${master_name}的肉棒。`,
          ); // :2675
          await era.printAndWait(`「请更多的…更多的欺负我吧～${heart(1)}」`); // :2676
        }
        kojo.背面座位 = 7; // :2678
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2680
        if (rand_n(3) === 0) {
          // :2681
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊～啊～♪哈啊～～${heart_black(1)}　大肉棒扑哧扑哧的插进小穴里的样子全部都看到了～${heart(1)}」`,
          ); // :2682
          await era.printAndWait(
            `「好爽～好舒服啊～…被用不像话的体位干着好有感觉啊～${heart(1)}」`,
          ); // :2683
          await era.printAndWait(
            `「更多更多的尽情操我吧～……主人～${heart(1)}」`,
          ); // :2684
        } else if (rand_n(2) === 0) {
          // :2685
          await era.printAndWait(
            `「哈啊～啊啊～啊～～…更多…更多的操我…${heart(1)}」`,
          ); // :2686
          await era.printAndWait(
            `「一边被啪叽啪叽地揉着乳房～…一边被干着小穴就…咿～咿～咿～咿啊啊啊啊～${heart_black(1)}」`,
          ); // :2687
          await era.printAndWait(`「啊～啊啊啊啊…又、高潮了～～${heart(1)}」`); // :2688
        } else {
          await era.printAndWait(
            `「咿呀～～！啊啊～…呜…更多的…欺负小穴吧～♪」`,
          ); // :2689-2690
          await era.printAndWait(
            `「${sc()}的身体是～…为取悦主人而存在的～…${heart_black(1)}」`,
          ); // :2691
          await era.printAndWait(
            `「所以～…请继续尽情的欺负我吧～～～～～${heart(1)}」`,
          ); // :2692
        }

        if (v_sense >= 3 && v_insensible) {
          // :2695-2696
          await era.printAndWait(
            `${target_name}钝感的私处被调教出了快感、持续不断的给${target_name}带来了淫靡的快感………`,
          ); // :2695-2696
        } else if (v_insensible) {
          // :2698-2699
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被鸡鸡侵犯的事实在脑海中回荡着………`,
          ); // :2698-2699
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          ); // :2700-2701
        }
        kojo.背面座位 = 6; // :2703
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2705
        if (rand_n(3) === 0) {
          // :2706
          await era.printAndWait(
            `「哈啊～…啊啊～…啊咕～！嗯呜唔～…更多的…请更多地操我吧～…」`,
          ); // :2707
          await era.printAndWait(
            `「啊啊～…明明是这么不像话的姿势…只是被从后面抱着～…」`,
          ); // :2708
          await era.printAndWait(
            `「就感到很幸福…心情变的好爽啊～…啊～啊～啊啊啊～${heart(1)}」`,
          ); // :2709
        } else if (rand_n(2) === 0) {
          // :2710
          await era.printAndWait(`「主人～…啊啊啊～…啊～～${heart(1)}」`); // :2711
          await era.printAndWait(
            `「被这样做、就好像…变成了主人的玩具似的呢…额呵呵…${heart(1)}」`,
          ); // :2712
          await era.printAndWait(
            `${player_name}抓住说出可爱发言的${target_name}的腰像玩弄般的摇动着。`,
          ); // :2713
          await era.printAndWait(
            `「呀啊～！啊～～啊啊～啊啊～…真好～当个玩具真好～～！」`,
          ); // :2714
        } else {
          await era.printAndWait(`「哈啊～啊～啊～${heart(1)} 啊啊啊～～！」`); // :2715-2716
          await era.printAndWait(
            `「主人的体温…好温暖～…哈啊～～${heart(1)} 被温柔的抱住………」`,
          ); // :2717
          await era.printAndWait(
            `「被主人疼爱着～…单是想着这个就好像要高潮了呢…啊啊～${heart(1)}」`,
          ); // :2718
        }

        if (v_sense >= 3 && v_insensible) {
          // :2721-2722
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、持续不断的给${target_name}带来了甘美的快感………`,
          ); // :2721-2722
        } else if (v_insensible) {
          // :2724-2725
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被${player_name}抱了的事实在脑海中回荡着………`,
          ); // :2724-2725
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          ); // :2726-2727
        }
        kojo.背面座位 = 5; // :2729
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2731
        await era.printAndWait(
          `「啊～啊啊～…啊啊～、即、即使不被那样插也…好、好有感觉～好有感觉啊～」`,
        ); // :2732

        if (v_insensible) {
          // :2734-2735
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、很愉快的连根吞下了${player_name}插进来的大鸡鸡………`,
          ); // :2734-2735
        }
        kojo.背面座位 = 4; // :2736
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2738
        await era.printAndWait(
          `「把、把脚张的更大一点的话…会更好吧…啊啊～…呜、好深…插得好深啊～！」`,
        ); // :2739

        if (v_insensible) {
          // :2741-2742
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}好像很难过的呻吟着………`,
          ); // :2741-2742
        }
        kojo.背面座位 = 3; // :2743
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // :2745
        await era.printAndWait(
          `「哈啊～…啊啊～…啊～…竟用这种姿势…从下面…咿呀呜～！」`,
        ); // :2746

        if (v_insensible) {
          // :2748-2749
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}好像很难过的呻吟着………`,
          ); // :2748-2749
        } else {
          await era.printAndWait(
            `${target_name}被鸡鸡插进阴道深处有点痛苦的喘息着………`,
          ); // :2750-2751
        }
        kojo.背面座位 = 2; // :2753
      }
      return 0;
    }
  }

  // :2762 IF SELECTCOM == 26（正常位肛交，CFLAG:327）
  if (era_flag.selectcom === 26) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.正常位肛交 === 0) {
      // :2764

      if (era.get(`talent:${target}:76`) === 1) {
        // :2766
        await era.printAndWait(
          `「啊～…啊啊～…咕呜嗯～…啊啊～明明是不能插进去的地方…」`,
        ); // :2767
        await era.printAndWait(
          `「肉棒…把屁股眼撑大了…咿啊啊～啊啊～${heart(1)}」`,
        ); // :2768

        if (a_sense >= 3 && a_insensible) {
          // :2770-2771
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          ); // :2770-2771
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :2773
        await era.printAndWait(
          `「不、不行啊、那种地方大鸡鸡怎么能插得进去…呀呜～！」`,
        ); // :2774
        await era.printAndWait(
          `「啊啊…啊…不会吧…全部…插进去了…啊啊～…啊～啊哈啊～！」`,
        ); // :2775

        if (a_sense >= 3 && a_insensible) {
          // :2777-2778
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、将鸡鸡连根吞下、${target_name}娇喘出声………`,
          ); // :2777-2778
        }
      } else {
        await era.printAndWait(
          `「不、不要啊～…不要…插进来…啊啊～…连屁股眼…都被你的东西玷污了…」`,
        ); // :2780-2781

        if (a_insensible) {
          // :2783-2784
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :2783-2784
        }
      }
      kojo.正常位肛交 = 1; // :2786-2787
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2789-2791
        if (rand_n(3) === 0) {
          // :2792
          await era.printAndWait(`「啊～啊啊～…屁股眼好爽啊～${heart(1)}」`); // :2793
          await era.printAndWait(
            `「更多的侵犯我吧～！啊～咿～啊啊～啊啊啊～${heart(1)}」`,
          ); // :2794
        } else if (rand_n(2) === 0) {
          // :2795
          await era.printAndWait(
            `「咿啊～啊啊～啊啊啊…已经…不行了…${sc()}已经快不行了～…${heart(1)}」`,
          ); // :2796
          await era.printAndWait(
            `「要变成被侵犯屁股眼也会感到愉悦的淫乱女孩子了～…已经…已经要不行了啊～～～～${heart(1)}」`,
          ); // :2797
        } else {
          await era.printAndWait(
            `「啊啊～…主人～…屁股眼～！请更多更多地侵犯吧～${heart(1)}」`,
          ); // :2798-2799
          await era.printAndWait(
            `「咿～…还差一点、还差一点～…要去了…去了啊～～～～${heart(1)}」`,
          ); // :2800
        }

        if (a_insensible) {
          // :2803-2804
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          ); // :2803-2804
        }
        kojo.正常位肛交 = 7; // :2805
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2807

        if (a_insensible) {
          // :2809
          await era.printAndWait(
            `「啊啊～…主人～…请更多的侵犯我的屁股眼吧${heart(1)}」`,
          ); // :2810
          await era.printAndWait(
            `${target_name}钝感的肛门将鸡鸡连根吞下、${target_name}好像很舒服的扭着身体………`,
          ); // :2811
        } else {
          await era.printAndWait(
            `「啊啊～…主人～…请更多的侵犯我的屁股眼吧${heart(1)}」`,
          ); // :2812-2813
          await era.printAndWait(
            `「咿～…还差一点、还差一点～…要去了…去了啊～～～～${heart(1)}」`,
          ); // :2814
        }
        kojo.正常位肛交 = 6; // :2816
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2818
        if (rand_n(2) === 0) {
          // :2819
          await era.printAndWait(
            `「啊啊～…插到里面来啦～…啊～啊啊～…哈啊啊～♪」`,
          ); // :2820
          await era.printAndWait(
            `「明明…明明不可以这样的…屁股…感觉太刺激啦…啊～啊啊～啊啊啊${heart_black(1)}」`,
          ); // :2821
        } else {
          await era.printAndWait(
            `「啊啊～…屁眼太有感觉了…对不起～～对不起～咿～」`,
          ); // :2822-2823
          await era.printAndWait(
            `「不过～不过～…实在是忍不住了啊～${heart(1)}」`,
          ); // :2824
        }

        if (a_insensible) {
          // :2827-2828
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、将鸡鸡连根吞下、${target_name}娇喘出声………`,
          ); // :2827-2828
        }
        kojo.正常位肛交 = 5; // :2829
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2831
        await era.printAndWait(
          `「啊～啊啊啊啊～…被撑开了…被撑开了啊～～～…屁股眼…变成色情的洞洞了啊～～${heart(1)}」`,
        ); // :2832

        if (a_insensible) {
          // :2834-2835
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就不禁发出了悲鸣………`,
          ); // :2834-2835
        }
        kojo.正常位肛交 = 4; // :2836
      } else if (
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2838
        await era.printAndWait(
          `「啊～啊啊～哈啊～～…不行～…不能再这样下去了～…人会…会变得奇怪的～…」`,
        ); // :2839

        if (a_insensible) {
          // :2841-2842
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、将鸡鸡连根吞下、${target_name}发出了愉悦的呻吟………`,
          ); // :2841-2842
        }
        kojo.正常位肛交 = 3; // :2843
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :2845
        await era.printAndWait(
          `「啊啊～…这样…这样是不对的…求求你…不要再这样了…呀呜～」`,
        ); // :2846

        if (a_insensible) {
          // :2848-2849
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :2848-2849
        }
        kojo.正常位肛交 = 2; // :2850
      }
      return 0;
    }
  }

  // :2859 IF SELECTCOM == 27（背后位肛门，CFLAG:328）
  if (era_flag.selectcom === 27) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.背后位肛交 === 0) {
      // :2861

      if (era.get(`talent:${target}:76`) === 1) {
        // :2863
        await era.printAndWait(
          `「啊啊～…这样子…做着禽兽也不会做的事情…好美妙～…${heart(1)}」`,
        ); // :2864
        await era.printAndWait(
          `${target_name}的肛门由于对被侵犯的期待感而下流的敞开了、吞下了${player_name}的大鸡鸡………`,
        ); // :2865

        if (a_sense >= 3 && a_insensible) {
          // :2867-2868
          await era.printAndWait(
            `${target_name}开发过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡迷醉不已的快感………`,
          ); // :2867-2868
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :2870
        await era.printAndWait(
          `「啊啊～…那、那里不是能插的地…嗯～…咕嗯～…咿～♪」`,
        ); // :2871
        await era.printAndWait(
          `嘴上说不要身体却很老实的${target_name}用肛门将鸡鸡吞了下去………`,
        ); // :2872

        if (a_sense >= 3 && a_insensible) {
          // :2874-2875
          await era.printAndWait(
            `${target_name}开发过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡一阵阵的快感………`,
          ); // :2874-2875
        }
      } else {
        await era.printAndWait(`「不、不要～…住手～…咿～咿～～～～！」`); // :2877-2878
        await era.printAndWait(
          `一边按住想逃走的${target_name}、一边侵犯着${player_name}的肛门………`,
        ); // :2879

        if (a_insensible) {
          // :2881-2882
          await era.printAndWait(
            `${target_name}钝感的肛门每次被鸡鸡一抽送、${target_name}就会发出悲鸣………`,
          ); // :2881-2882
        }
      }
      kojo.背后位肛交 = 1; // :2884-2885
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2887-2889
        if (rand_n(3) === 0) {
          // :2890
          await era.printAndWait(`「哈啊～～…啊啊～啊啊～哈啊啊${heart(1)}」`); // :2891
          await era.printAndWait(
            `「更多的…侵犯屁股眼吧…疯狂的侵犯我吧～${heart(1)}」`,
          ); // :2892

          if (a_insensible) {
            // :2894-2895
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、将从后面插进来的鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
            ); // :2894-2895
          }
        } else if (rand_n(2) === 0) {
          // :2896
          await era.printAndWait(
            `「啊啊啊啊…屁股眼被撑开了～～…屁股眼记住主人的大鸡鸡的形状了～～～～${heart(1)}」`,
          ); // :2897
          await era.printAndWait(
            `「啊～咿～～…不行…这…样～…！太…激…烈…了～！不～～行～～！要…不…行了～～～${heart(1)}」`,
          ); // :2898

          if (a_insensible) {
            // :2900-2901
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、不断地被鸡鸡从后面抽送着、${target_name}发出了淫荡的呻吟声………`,
            ); // :2900-2901
          }
        } else {
          await era.printAndWait(
            `「哈～啊啊～啊～啊…啊啊～…不行了…再这样下去的话要不行了…真的…要变的除了屁股其他什么事情都不想了啊～～～…${heart(1)}」`,
          ); // :2902-2903
          await era.printAndWait(`「啊～啊～啊啊啊～…哈啊啊啊啊${heart(1)}」`); // :2904

          if (a_insensible) {
            // :2906-2907
            await era.printAndWait(
              `${target_name}被开发过的钝感肛门变成了分泌快乐的器官、每次被鸡鸡抽送、就会给${target_name}带来源源不绝的愉悦………`,
            ); // :2906-2907
          }
        }
        kojo.背后位肛交 = 7; // :2909
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2911
        await era.printAndWait(
          `「哈～啊啊～啊～啊…啊啊～…不行了…再这样下去的话要不行了…真的…要变的除了屁股其他什么事情都不想了啊～～～…」`,
        ); // :2912
        await era.printAndWait(`「啊～啊～啊啊啊～…哈啊啊啊啊${heart(1)}」`); // :2913

        if (a_insensible) {
          // :2915-2916
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就尖叫起来………`,
          ); // :2915-2916
        }
        kojo.背后位肛交 = 6; // :2917
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2919

        if (a_insensible) {
          // :2921
          if (rand_n(2) === 0) {
            // :2922
            await era.printAndWait(
              `「啊～啊啊啊～…明明被用这么羞耻的姿势…抽插着屁股眼…但是好爽…好爽啊啊～～…♪」`,
            ); // :2923
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得觉醒了快感、每次被鸡鸡抽送、${target_name}就会娇喘出声………`,
            ); // :2924
          } else {
            await era.printAndWait(
              `「咿啊啊～…啊啊～嗯～…不行了…要不行了…爽过头了…啊～啊啊～啊啊啊啊啊啊啊～${heart(1)}」`,
            ); // :2925-2926
            await era.printAndWait(
              `${target_name}被开发过的钝感肛门变成了分泌快乐的器官、每次被鸡鸡抽送、就会给${target_name}带来源源不绝的愉悦………`,
            ); // :2927
          }
        } else {
          if (rand_n(2) === 0) {
            // :2929-2930
            await era.printAndWait(
              `「啊～啊啊啊～…明明被用这么羞耻的姿势…抽插着屁股眼…但是好爽…好爽啊啊～～…♪」`,
            ); // :2931
            await era.printAndWait(
              `${target_name}被调教过的肛门很轻松地吞下了${player_name}的大鸡鸡………`,
            ); // :2932
          } else {
            await era.printAndWait(
              `「咿啊啊～…啊啊～嗯～…不行了…要不行了…爽过头了…啊～啊啊～啊啊啊啊啊～${heart(1)}」`,
            ); // :2933-2934
            await era.printAndWait(
              `${target_name}被从后面侵犯着调教过的肛门、娇喘出声………`,
            ); // :2935
          }
        }
        kojo.背后位肛交 = 5; // :2938
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2940
        await era.printAndWait(
          `「啊～啊啊啊啊…插到里面来～…嗯～…好…好棒哦…♪」`,
        ); // :2941

        if (a_insensible) {
          // :2943-2944
          await era.printAndWait(
            `${target_name}钝感的肛门每次被鸡鸡一抽送、${target_name}就尖叫起来………`,
          ); // :2943-2944
        }
        kojo.背后位肛交 = 4; // :2945
      } else if (
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2947

        if (a_insensible) {
          // :2949
          await era.printAndWait(
            `「明明讨厌…这样的姿势…啊呜嗯～…啊啊～但是好舒服哦…小屁屁快不行了～」`,
          ); // :2950
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、每次被鸡鸡抽送、${target_name}就会娇喘出声………`,
          ); // :2951
        } else {
          await era.printAndWait(
            `「明明讨厌…这样的姿势…啊呜嗯～…啊啊～但是好舒服哦…小屁屁快不行了～」`,
          ); // :2952-2953
          await era.printAndWait(
            `${target_name}的肛门通过调教变的能产生快感了、嘴里发出了甜蜜的呻吟………`,
          ); // :2954
        }
        kojo.背后位肛交 = 3; // :2956
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :2958
        await era.printAndWait(`「啊啊～…呀～…好难受呀…好难受啊…啊啊～」`); // :2959
        await era.printAndWait(
          `一边按住想逃走的${target_name}一边侵犯着肛门………`,
        ); // :2960

        if (a_insensible) {
          // :2962-2963
          await era.printAndWait(
            `${target_name}钝感的肛门每次被鸡鸡一抽送、${target_name}就会发出悲鸣………`,
          ); // :2962-2963
        }
        kojo.背后位肛交 = 2; // :2964
      }
      return 0;
    }
  }

  // :2973 IF SELECTCOM == 28（对面座位肛交，CFLAG:329）
  if (era_flag.selectcom === 28) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.对面座位肛交 === 0) {
      // :2975

      if (era.get(`talent:${target}:76`) === 1) {
        // :2977
        await era.printAndWait(
          `「啊啊～…屁眼变的好舒服啊…额呵呵、${sc()}也很舒服哦${heart(1)}」`,
        ); // :2978

        if (a_sense >= 3 && a_insensible) {
          // :2980-2981
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          ); // :2980-2981
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :2983
        await era.printAndWait(
          `「啊～啊啊～…被用这种姿势…插进…屁眼…里面去了…啊～～…${sc()}…已经完全混乱了…能好好抱我吗？」`,
        ); // :2984

        if (a_sense >= 3 && a_insensible) {
          // :2986-2987
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就娇喘出声………`,
          ); // :2986-2987
        }
      } else {
        await era.printAndWait(`「啊啊～…插进…里面去了～…屁股眼变的奇怪了…」`); // :2989-2990

        if (a_insensible) {
          // :2992-2993
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}发出了悲鸣………`,
          ); // :2992-2993
        }
      }
      kojo.对面座位肛交 = 1; // :2995-2996
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2998-3000
        if (rand_n(3) === 0) {
          // :3001
          await era.printAndWait(
            `「啊啊～…啊～啊～～！用力插啊～～～！${heart(1)}」`,
          ); // :3002
          await era.printAndWait(
            `「咿啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～${heart(1)}」`,
          ); // :3003

          if (a_insensible) {
            // :3005
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}发出了淫荡的声音………`,
            ); // :3006
          } else {
            await era.printAndWait(
              `${target_name}每次被从下方抽插肛门就会用力抱住${player_name}在耳边发出娇喘………`,
            ); // :3007-3008
          }
        } else if (rand_n(2) === 0) {
          // :3010
          await era.printAndWait(
            `「呜啊～啊啊～…啊啊～！喜欢肛交～好喜欢～～${heart(1)}」`,
          ); // :3011
          await era.printAndWait(`「啊啊～…更多的…更多的欺负我吧～…♪」`); // :3012

          if (a_insensible) {
            // :3014-3015
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}发出了淫荡的声音………`,
            ); // :3014-3015
          }
        } else {
          await era.printAndWait(
            `「呀啊啊～…好爽啊～～～～～屁股的…洞…好…爽…好…爽啊～～…${heart(1)}」`,
          ); // :3016-3017
          await era.printAndWait(
            `「更多的…欺负欺负我吧～…除了大肉棒已经什么都不想了～${heart(1)}」`,
          ); // :3018

          if (a_insensible) {
            // :3020-3021
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}发出了淫荡的声音………`,
            ); // :3020-3021
          }
        }
        kojo.对面座位肛交 = 7; // :3023
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3025

        if (a_insensible) {
          // :3027
          await era.printAndWait(
            `「啊啊～…啊～啊～～！再插…再用力插啊～！${heart(1)}」`,
          ); // :3028
          await era.printAndWait(
            `「呀啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～${heart(1)}」`,
          ); // :3029
          await era.printAndWait(
            `${target_name}钝感的肛门一将${player_name}的鸡鸡连根吞下、${target_name}就抱住${player_name}不想放开的样子………`,
          ); // :3030
        } else {
          await era.printAndWait(
            `「啊啊～…啊～啊～～！用力插啊～！${heart(1)}」`,
          ); // :3031-3032
          await era.printAndWait(
            `「呀啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～${heart(1)}」`,
          ); // :3033
          await era.printAndWait(
            `${target_name}每次被从下方抽插肛门就会发出娇喘声………`,
          ); // :3034
        }
        kojo.对面座位肛交 = 6; // :3036
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3038
        if (rand_n(2) === 0) {
          // :3039
          await era.printAndWait(`「啊啊～…啊～…更加…激烈一点吧～～…♪」`); // :3040
          await era.printAndWait(
            `「这个尻穴…已经变成…主人的专用物了…啊～咿呀啊～啊啊～！更多的爱我吧～！」`,
          ); // :3041
        } else {
          await era.printAndWait(
            `「嗯咿～…啊～啊啊啊～…明明…这么被这么粗暴地对待…但是好舒服啊～～…」`,
          ); // :3042-3043
          await era.printAndWait(
            `「想永远被主人爱着～…啊～啊啊～哈啊啊啊～${heart(1)}」`,
          ); // :3044
        }

        if (a_insensible) {
          // :3047-3048
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}娇喘出声………`,
          ); // :3047-3048
        }
        kojo.对面座位肛交 = 5; // :3049
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3051
        await era.printAndWait(`「啊～…啊啊～…请再继续…动起来吧…好喜欢这样…」`); // :3052

        if (a_insensible) {
          // :3054-3055
          await era.printAndWait(
            `${target_name}钝感的肛门一将${player_name}的鸡鸡连根吞下、${target_name}就抱住${player_name}不想放开的样子………`,
          ); // :3054-3055
        }
        kojo.对面座位肛交 = 4; // :3056
      } else if (
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3058
        await era.printAndWait(
          `「啊啊～…啊…啊～～…咕呜呜呜～…要变成…${sc()}的玩具了～…啊～～♪」`,
        ); // :3059

        if (a_insensible) {
          // :3061-3062
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就呻吟起来………`,
          ); // :3061-3062
        }
        kojo.对面座位肛交 = 3; // :3063
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :3065
        await era.printAndWait(
          `「啊啊～…不要～…好难受…再这样下去…真的…啊啊～」`,
        ); // :3066

        if (a_insensible) {
          // :3068-3069
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :3068-3069
        }
        kojo.对面座位肛交 = 2; // :3070
      }
      return 0;
    }
  }

  // :3079 IF SELECTCOM == 29（背面座位肛交，CFLAG:330）
  if (era_flag.selectcom === 29) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.背面座位肛交 === 0) {
      // :3081

      if (era.get(`talent:${target}:76`) === 1) {
        // :3083
        await era.printAndWait(
          `「啊呜唔呜～！…屁股眼被侵犯了好爽好爽啊～～～～！」`,
        ); // :3084
        await era.printAndWait(
          `「再用力点…抱我…请尽情侵犯我的屁眼吧～${heart(1)}」`,
        ); // :3085

        if (a_sense >= 3 && a_insensible) {
          // :3087-3088
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          ); // :3087-3088
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3090
        await era.printAndWait(
          `「啊啊呜～…明明难得的被从背后温柔地抱住…嗯～♪」`,
        ); // :3091
        await era.printAndWait(
          `「被用这种姿势插进尻穴什么的…啊～…啊～…哈啊啊…啊～～${heart(1)}」`,
        ); // :3092

        if (a_sense >= 3 && a_insensible) {
          // :3094-3095
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就娇喘出声………`,
          ); // :3094-3095
        }
      } else {
        await era.printAndWait(
          `「呜、咕、啊啊啊…撑开了…被撑开了～…屁眼被撑开了～………」`,
        ); // :3097-3098

        if (a_insensible) {
          // :3100
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :3101
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦地呻吟着………`,
          ); // :3102-3103
        }
      }
      kojo.背面座位肛交 = 1; // :3106-3107
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3109-3111
        if (rand_n(2) === 0) {
          // :3112
          await era.printAndWait(
            `「咿呀啊啊～…屁股眼好舒服～好舒服啊～…啊啊啊啊啊…${heart(1)}」`,
          ); // :3113
          await era.printAndWait(
            `「屁股眼～…不行了…已、已经…爽得什么事都不想去想了～…咿呜～啊啊～啊啊啊啊啊${heart(1)}」`,
          ); // :3114

          if (a_insensible) {
            // :3116
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
            ); // :3117
          } else {
            await era.printAndWait(
              `${target_name}嘴边流着口水沉浸在肛门的快感之中………`,
            ); // :3118-3119
          }
        } else {
          await era.printAndWait(
            `「嗯咿咿～～～！不行～～不行～～～…不要随便动屁股啊～～～${heart(1)}」`,
          ); // :3121-3122
          await era.printAndWait(
            `「真是的…只欺负屁股眼～…屁股眼变的好爽啊～${heart(1)}」`,
          ); // :3123

          if (a_insensible) {
            // :3125
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、贪婪的连根吞下了鸡鸡、${target_name}像磨盘似的扭着腰………`,
            ); // :3126
          } else {
            await era.printAndWait(
              `${target_name}淫猥地摇着腰身、一边不断地收缩肛门一边品味着${player_name}的鸡鸡………`,
            ); // :3127-3128
          }
        }
        kojo.背面座位肛交 = 7; // :3131
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3133
        await era.printAndWait(
          `「嗯咿咿～～～！不行～～不行～～～…不要随便动屁股啊～～～${heart(1)}」`,
        ); // :3134
        await era.printAndWait(
          `「真是的…只欺负屁股眼～…屁股眼变的好爽啊～${heart(1)}」`,
        ); // :3135

        if (a_insensible) {
          // :3137
          await era.printAndWait(
            `${target_name}钝感的肛门将${player_name}的鸡鸡连根吞下、${target_name}愉悦的像磨盘似的扭着腰………`,
          ); // :3138
        } else {
          await era.printAndWait(
            `${target_name}淫猥地摇着腰身品味着你的鸡鸡………`,
          ); // :3139-3140
        }
        kojo.背面座位肛交 = 6; // :3142
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3144
        if (rand_n(2) === 0) {
          // :3145
          await era.printAndWait(
            `「啊啊啊～…虽然是这种姿势…尻穴也好有感觉啊…啊～啊啊～…啊咕呜～…再来…」`,
          ); // :3146
          await era.printAndWait(
            `「再…再来啊～！…请…更多…更多的！欺…欺负～…屁股…眼儿吧～…♪」`,
          ); // :3147

          if (a_insensible) {
            // :3149-3150
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就央求着更多………`,
            ); // :3149-3150
          }
        } else {
          await era.printAndWait(
            `「咕咿～…自从知道…屁股眼儿…能这么舒服之后～…」`,
          ); // :3151-3152
          await era.printAndWait(
            `「已经…没办法…没办法…再舍弃这种滋味了～…嗯～嗯啊啊～哈啊～～♪」`,
          ); // :3153

          if (a_insensible) {
            // :3155
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就由于肛门的快乐而陶醉了………`,
            ); // :3156
          } else {
            await era.printAndWait(
              `沉醉于肛门的快乐之中的${target_name}已经完全找不到身为圣女时的样貌了………`,
            ); // :3157-3158
          }
        }
        kojo.背面座位肛交 = 5; // :3161
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3163
        await era.printAndWait(
          `「哈啊……啊啊～啊～～…被这样欺负屁股眼、也…好舒服…啊～…」`,
        ); // :3164

        if (a_insensible) {
          // :3166-3167
          await era.printAndWait(
            `${target_name}钝感的肛门一将${player_name}的鸡鸡连根吞下、${target_name}就很愉悦的样子………`,
          ); // :3166-3167
        }
        kojo.背面座位肛交 = 4; // :3168
      } else if (
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3170
        await era.printAndWait(
          `「啊～咿啊～…啊啊～～…屁股眼…竟然…这么的舒服…咿～♪」`,
        ); // :3171

        if (a_insensible) {
          // :3173-3174
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就高喊出声………`,
          ); // :3173-3174
        }
        kojo.背面座位肛交 = 3; // :3175
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :3177
        await era.printAndWait(`「哈啊…啊啊～…咕呜～…咕…呜呜～！」`); // :3178

        if (a_insensible) {
          // :3180
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :3181
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦的呻吟着………`,
          ); // :3182-3183
        }
        kojo.背面座位肛交 = 2; // :3185
      }
      return 0;
    }
  }

  // :3194 IF SELECTCOM == 30（手淫，CFLAG:331）
  if (era_flag.selectcom === 30) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;
    const penis = era.get(`talent:${era_flag.player}:318`) || 0;

    if (kojo.手淫 === 0) {
      // :3196

      if (era.get(`talent:${target}:76`) === 1) {
        // :3198
        await era.printAndWait(
          `「额呵呵…这样一上一下地…玩弄大肉棒真不错呢${heart(1)}」`,
        ); // :3199
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3201
        await era.printAndWait(
          `「啊哈啊啊…能摸到主人的大鸡鸡…真不错呢…我一定会努力奉仕的～♪」`,
        ); // :3202
      } else if (serve >= 3) {
        // :3204
        await era.printAndWait(`「哈啊…哈啊…大鸡鸡…好烫…好厉害哦………」`); // :3205
      } else {
        await era.printAndWait(`「讨、讨厌…这东西…咿呀～…好烫………」`); // :3207-3208
      }
      kojo.手淫 = 1; // :3210-3211
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3213-3215
        if (penis === 1) {
          // :3216

          await era.printAndWait(`「好雄伟的肉棒…两只手都抓不住${heart(1)}」`); // :3218
        } else if (penis === 2) {
          // :3219

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒，很有活力地勃起着呢${heart(1)}　好可爱${heart(1)}　想咻咻地射出来吗${heart(1)}」`,
          ); // :3221
        } else if (penis === 3) {
          // :3222

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊……${heart(1)}　包茎肉棒，剥开就满是雄性的味道……好高兴${heart(1)}」`,
          ); // :3224
        } else if (penis === 4) {
          // :3225

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「马肉棒好厉害……${heart(1)}　脑袋要变得奇怪了${heart(1)}」`,
          ); // :3227
        }
        if (rand_n(2) === 0) {
          // :3229
          await era.printAndWait(
            `「啊啊～…单是摸到大肉棒就已经按捺不住了～………${heart(1)}」`,
          ); // :3230
          await era.printAndWait(
            `「当、当然让我奉仕大肉棒一整天也是能做到的、不过…啊啊～不要让大肉棒这么兴奋嘛${heart(1)}」`,
          ); // :3231
          if (semen_addict >= 3) {
            // :3232-3233
            await era.printAndWait(
              `「要是想射精的话…就射在${sc()}淫荡的嘴里吧…求你了～${heart(1)} 渴的没办法了～${heart(1)}」`,
            ); // :3232-3233
          }
        } else {
          await era.printAndWait(
            `「啊啊啊啊…大肉棒～…好高兴…可以的话就请射精吧～${heart(1)}」`,
          ); // :3234-3235
          await era.printAndWait(
            `${sc()}像打心眼里喜欢似的、慈爱地用手不断撸着阴茎。`,
          ); // :3236
          await era.printAndWait(
            `「全部…全部都是${sc()}的哦～…啊啊啊…大肉棒好棒～…${heart(1)}」`,
          ); // :3237
          if (semen_addict >= 3) {
            // :3238-3239
            await era.printAndWait(
              `「精液…请把精液给我吧…请把精液赐给淫荡下流的${sc()}吧～${heart(1)}」`,
            ); // :3238-3239
          }
        }
        kojo.手淫 = 6; // :3241
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3243
        if (penis === 1) {
          // :3244

          await era.printAndWait(`「好雄伟的棒棒…两只手都抓不住${heart(1)}」`); // :3246
        } else if (penis === 2) {
          // :3247

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒棒，很有活力地勃起着呢${heart(1)}　好可爱${heart(1)}　想咻咻地射出来吗${heart(1)}」`,
          ); // :3249
        } else if (penis === 3) {
          // :3250

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊……${heart(1)}　包茎棒棒，剥开就满是雄性的味道……好高兴${heart(1)}」`,
          ); // :3252
        } else if (penis === 4) {
          // :3253

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「马棒棒好厉害……${heart(1)}　脑袋要变得奇怪了${heart(1)}」`,
          ); // :3255
        }
        if (rand_n(2) === 0) {
          // :3257
          await era.printAndWait(
            `「啊啊…明明只是用手摸到…又硬又烫的大鸡鸡…就总觉…${sc()}也…嗯嗯～」`,
          ); // :3258
          await era.printAndWait(
            `曾经慈爱地给人们带来治愈的这双手、现在只是为了撸鸡鸡而存在。`,
          ); // :3259
          await era.printAndWait(
            `「啊～…感、感觉怎样…会舒服吗？………好的～！会让您更舒服的～♪」`,
          ); // :3260
          if (semen_addict >= 3) {
            // :3261-3262
            await era.printAndWait(
              `「如果舒服的话…请不用顾虑尽管射出来吧…啊啊～…啊啊…精液…好想要精液～…${heart(1)}」`,
            ); // :3261-3262
          }
        } else {
          await era.printAndWait(
            `「啊啊啊…只是摸了摸大鸡鸡…好像就兴奋起来了呢………」`,
          ); // :3263-3264
          await era.printAndWait(
            `${sc()}像打心眼里喜欢似的、慈爱地用手不断撸着阴茎。`,
          ); // :3265
          await era.printAndWait(
            `「能让${sc()}做这么色情的事情的只有主人哦～………啊…啊啊…」`,
          ); // :3266
          if (semen_addict >= 3) {
            // :3267-3268
            await era.printAndWait(
              `「啊啊…变的…更爽吧…把精液满满地射出来吧…${heart(1)}」`,
            ); // :3267-3268
          }
        }
        kojo.手淫 = 5; // :3270
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3272
        await era.printAndWait(`「额呵呵…大鸡鸡对我”服服帖帖”的呢～♪」`); // :3273
        if (semen_addict >= 3) {
          // :3274-3275
          await era.printAndWait(
            `「觉得舒服的话…不用顾虑尽管射吧…啊啊～…啊啊…精液…好想要精液～…${heart(1)}」`,
          ); // :3274-3275
        }
        kojo.手淫 = 4; // :3276
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3278
        await era.printAndWait(
          `「总觉得…能分辨出能让大鸡鸡感到舒服的地方了呢…啊～～♪」`,
        ); // :3279
        kojo.手淫 = 3; // :3280
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        // :3282
        await era.printAndWait(
          `「哈啊哈啊…呀啊啊…大鸡鸡…变的…这么硬了…感觉好怪…」`,
        ); // :3283
        kojo.手淫 = 2; // :3284
      }
      return 0;
    }
  }

  // :3293 IF SELECTCOM == 31（口交，CFLAG:332）
  if (era_flag.selectcom === 31) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;
    const penis = era.get(`talent:${era_flag.player}:318`) || 0;

    if (kojo.口交_奴 === 0) {
      // :3295

      if (era.get(`talent:${target}:76`) === 1) {
        // :3297
        await era.printAndWait(
          `「啊啊～…能奉仕大肉棒～…好开心啊…嗯啾～啾～嘞噗～…嘞咯～…噗呼呜${heart(1)}」`,
        ); // :3298
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3300
        await era.printAndWait(
          `「哈啊啊…能尽情的吮吸了呢…嗯噗～…嗯啊…哈姆呜…啾～啾呜唔…嘞咯～♪」`,
        ); // :3301
      } else if (serve >= 3) {
        // :3303
        await era.printAndWait(
          `「好、好的…会、努力奉仕的…哈姆呜…啾～啾噗…嘞咯～…」`,
        ); // :3304
      } else {
        await era.printAndWait(
          `「用、用嘴奉仕吗…知、知道了…啊啊嗯…哈姆…嗯啾…啾…呜啊…好咸………」`,
        ); // :3306-3307
      }
      kojo.口交_奴 = 1; // :3309-3310
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3312-3314
        if (penis === 1) {
          // :3315

          await era.printAndWait(`「啊，雄伟的肉棒……我开动了${heart(1)}」`); // :3317
        } else if (penis === 2) {
          // :3318

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒啊，努力地勃起着呢${heart(1)}　真可爱${heart(1)}　这就好好给你……一点一点拨开来哦${heart(1)}　啊呜……」`,
          ); // :3320
        } else if (penis === 3) {
          // :3321

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「满是男人味包皮肉棒啊……心跳加速了呢${heart(1)}　我开动咯……哈呣${heart(1)}」`,
          ); // :3323
        } else if (penis === 4) {
          // :3324

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「巨大的马肉棒……下巴可得脱臼了吧${heart(1)}　我开动咯${heart(1)}」`,
          ); // :3326
        }
        await era.printAndWait(
          `「嗯姆啾呜…哈啊…哈啊…大肉棒…美味…好美味啊…啊～～…呗咯～…啾～啾呜唔呜唔${heart(1)}」`,
        ); // :3328
        await era.printAndWait(
          `「嘴巴要融化了～…嗯噗～…啾啪啊～…嘞噗～啾～啾呜呜～啾呜唔${heart(1)}」`,
        ); // :3329
        if (semen_addict >= 3) {
          // :3330-3331
          await era.printAndWait(
            `「请把精液都射进来吧…渴的没办法了～…嗯啊啊～${heart(1)}」`,
          ); // :3330-3331
        }
        await era.printAndWait(
          `${target_name}把精液吞进喉咙深处、享受着口交奉仕………`,
        ); // :3332
        kojo.口交_奴 = 6; // :3333
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3335
        await era.printAndWait(
          `「啊啊～…喜欢大肉棒…好喜欢大肉棒啊…请让我更多…更多的侍奉它吧～…${heart(1)}」`,
        ); // :3336
        await era.printAndWait(
          `${target_name}单是口交就已经把持不住的样子、一边摩擦着合并起来的双腿一边奉仕着………`,
        ); // :3337
        if (semen_addict >= 3) {
          // :3338-3339
          await era.printAndWait(
            `「精液～…请把精液满满的射进嘴里吧～${heart(1)}」`,
          ); // :3338-3339
        }
        kojo.口交_奴 = 5; // :3340
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3342
        if (penis === 1) {
          // :3343

          await era.printAndWait(`「啊…雄伟的棒棒…被迷倒了${heart(1)}」`); // :3345
        } else if (penis === 2) {
          // :3346

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒棒，努力地勃起着呢${heart(1)}　真可爱${heart(1)}　这就好好给你……一点一点拨开来哦${heart(1)}　啊呜……」`,
          ); // :3348
        } else if (penis === 3) {
          // :3349

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「满是男人味包皮棒棒……心跳加速了呢${heart(1)}　我开动咯……哈呣${heart(1)}」`,
          ); // :3351
        } else if (penis === 4) {
          // :3352

          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「巨大的马棒棒……下巴可得脱臼了吧${heart(1)}　我开动咯${heart(1)}」`,
          ); // :3354
        }
        await era.printAndWait(
          `「啊啊…${sc()}的嘴…是为了这样侍奉大鸡鸡而存在的～…♪」`,
        ); // :3356
        await era.printAndWait(
          `「啊啊…已经完全含住了…所以请不用顾虑地把精液射进嘴里吧…♪」`,
        ); // :3357
        await era.printAndWait(`${target_name}带着喜悦的表情继续着口交奉仕………`); // :3358
        if (semen_addict >= 3) {
          // :3359-3360
          await era.printAndWait(
            `「请给我满满的精液～…请主人给我满满的爱～…${heart(1)}」`,
          ); // :3359-3360
        }
        kojo.口交_奴 = 4; // :3361
      } else if (
        serve >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3363
        await era.printAndWait(
          `「嗯咕～…嗯啾…嘞噗～…呼啊…哈啊哈啊…不让我再吮我可不会满足哦？…额呵呵～」`,
        ); // :3364
        await era.printAndWait(
          `${target_name}用舌头舔了舔嘴唇之后、再次用舌头舔起了阴茎………`,
        ); // :3365
        if (semen_addict >= 3) {
          // :3366-3367
          await era.printAndWait(`「讨厌…应该…快了吧…精液…想要…好想要啊………」`); // :3366-3367
        }
        kojo.口交_奴 = 3; // :3368
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        // :3370
        await era.printAndWait(
          `「啊姆呜…嗯～…呗咯～…嗯呜唔…这样…含着…嗯～！嗯～！嗯嗯呜唔！」`,
        ); // :3371
        kojo.口交_奴 = 2; // :3372
      }
      return 0;
    }
  }

  // :3381 IF SELECTCOM == 32（乳交，CFLAG:333）
  if (era_flag.selectcom === 32) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.乳交 === 0) {
      // :3383

      if (era.get(`talent:${target}:76`) === 1) {
        // :3385
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「额呵呵～…用乳房做舒服吗${heart(1)}　请尽情的射精吧${heart(1)}」`,
        ); // :3386
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3388
        await era.printAndWait(
          `「啊啊…${sc()}的乳房是为了这样奉仕您而存在的呢…请变的更舒服吧～♪」`,
        ); // :3389
      } else if (serve >= 3) {
        // :3391
        await era.printAndWait(
          `「嗯～…乳房还能这样用呢…额呵呵、比预想的更有趣呢………」`,
        ); // :3392
      } else {
        await era.printAndWait(
          `「咕呜～…我、我的胸部…是给小宝宝哺乳用的啊…啊…哈啊………」`,
        ); // :3394-3395
      }
      kojo.乳交 = 1; // :3397-3398
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3400-3402
        if (rand_n(2) === 0) {
          // :3403
          await era.printAndWait(
            `「嗯～…啊～…哈啊～～…再继续侵犯我的乳房吧…${heart(1)}」`,
          ); // :3404
          await era.printAndWait(
            `「啊呜唔…要射精的话…请满满的射在乳房上吧～${heart(1)}」`,
          ); // :3405
          if (semen_addict >= 3) {
            // :3406-3407
            await era.printAndWait(
              `「我会把精液全部舔干净的～…啊哈啊${heart(1)}」`,
            ); // :3406-3407
          }
          await era.printAndWait(
            `${target_name}一边露出淫猥的笑容一边倾斜着乳房奉仕着鸡鸡………`,
          ); // :3408
        } else {
          await era.printAndWait(`「啊啊～…乳房被侵犯了～…${heart(1)}」`); // :3409-3410
          await era.printAndWait(
            `「尽情射精吧～…请把乳房浇满腥臭的精液吧～${heart(1)}」`,
          ); // :3411
          if (semen_addict >= 3) {
            // :3412-3413
            await era.printAndWait(
              `「精液…想咻噜咻噜的全部吸光呢…${heart(1)}」`,
            ); // :3412-3413
          }
          await era.printAndWait(
            `${target_name}继续用丰满的两乳淫猥地进行奉仕………`,
          ); // :3414
        }
        kojo.乳交 = 6; // :3416
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3418
        await era.printAndWait(`「啊啊～…更多地侵犯乳房吧～…${heart(1)}」`); // :3419
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :3420-3421
          await era.printAndWait(`${target_name}不断地用丰满的两乳施加刺激………`); // :3420-3421
        }
        if (semen_addict >= 3) {
          // :3422-3423
          await era.printAndWait(
            `「请把精液满满地射出来吧…${heart(1)} 赐给${sc()}吧${heart(1)}」`,
          ); // :3422-3423
        }
        kojo.乳交 = 5; // :3424
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3426
        if (rand_n(2) === 0) {
          // :3427
          await era.printAndWait(
            `「啊～…嗯～嗯呼呜…和主人一起做快乐的事、总觉得非常…开心呢…啊啊～…♪」`,
          ); // :3428
          await era.printAndWait(
            `「哈啊啊～…${sc()}也…觉得乳房…好舒服呢…啊～…还要…我还要再奉仕～♪」`,
          ); // :3429
          await era.printAndWait(`${target_name}开心的眯起眼沉浸在奉仕中………`); // :3430
          if (semen_addict >= 3) {
            // :3431-3432
            await era.printAndWait(
              `「变的好舒服啊…精液…请把精液射出来吧…啊啊…${sc()}也好想要呢${heart(1)}」`,
            ); // :3431-3432
          }
        } else {
          await era.printAndWait(
            `「啊啊…请更多的…更多的把${sc()}的乳房…当玩具用吧～………♪」`,
          ); // :3433-3434
          await era.printAndWait(
            `「啊～咿～…啊～啊啊啊～…哈啊啊啊…乳房…好舒服…多摩擦大鸡鸡一下吧………${heart(1)}」`,
          ); // :3435
          await era.printAndWait(
            `${target_name}一边露出圣女般的笑容一边继续着淫靡的奉仕………`,
          ); // :3436
          if (semen_addict >= 3) {
            // :3437-3438
            await era.printAndWait(
              `「啊啊～…黏糊糊的精液…满满的射在…${sc()}的身体上了…${heart(1)}」`,
            ); // :3437-3438
          }
        }
        kojo.乳交 = 4; // :3440
      } else if (serve >= 3 && (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)) {
        // :3442
        await era.printAndWait(
          `「哈啊～…啊～啊～～…讨、讨厌…明明只是用乳房摩擦大鸡鸡而已………」`,
        ); // :3443
        await era.printAndWait(
          `「为什么…会这么爽呢…啊啊～…更多…更多的摩擦吧…♪」`,
        ); // :3444
        await era.printAndWait(`${target_name}开心的眯起眼沉浸在奉仕中………`); // :3445
        if (semen_addict >= 3) {
          // :3446-3447
          await era.printAndWait(
            `「啊啊～…大鸡鸡一颤一颤的…精液…精液要出来了吗？…请尽情射出来吧${heart(1)}」`,
          ); // :3446-3447
        }
        kojo.乳交 = 3; // :3448
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        // :3450
        await era.printAndWait(`「哈啊…啊啊…感、感觉怎样…会舒服…吗…？」`); // :3451
        kojo.乳交 = 2; // :3452
      }
      return 0;
    }
  }

  // :3461 IF SELECTCOM == 33（股间性交，CFLAG:334）
  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      // :3463

      if (era.get(`talent:${target}:76`) === 1) {
        // :3465
        await era.printAndWait(
          `「额呵呵～…这就是所谓的”素股”吧…啊啊…大鸡鸡好烫啊…」`,
        ); // :3466
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3468
        await era.printAndWait(
          `「大鸡鸡不用插进来吗…？诶、只要舒服就行？啊…嗯～…啊哈啊${heart_black(1)}」`,
        ); // :3469
      } else {
        await era.printAndWait(
          `「啊啊～…不、不能不做这样的事吗…啊～…啊～～…」`,
        ); // :3471-3472
      }
      kojo.股间性交 = 1; // :3474-3475
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3477-3479
        await era.printAndWait(
          `「啊啊～啊～哈啊啊啊…嗯呼呜…呐、主人～…要是肉棒…就这样…插进${sc()}的小穴里去了该怎么办呢？」`,
        ); // :3480
        await era.printAndWait(
          `「…额呵呵～…没关系哦…${sc()}的贞洁该怎么处置…就全交由主人判断啦…呵呵…额呵呵${heart_black(1)}」`,
        ); // :3481
        kojo.股间性交 = 6; // :3482
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3484
        await era.printAndWait(
          `「啊啊～～…不要挑逗人家嘛…求你了～…${heart_black(1)}」`,
        ); // :3485
        await era.printAndWait(
          `「明明好想要…大肉棒啊…啊啊～…啊～…啊～～…把人家弄得不上不下的…要疯了～${heart_black(3)}」`,
        ); // :3486
        kojo.股间性交 = 5; // :3487
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3489
        await era.printAndWait(
          `「啊～…嗯呜唔～…哈啊啊～…那、那个…主人…总觉得…好难受啊…」`,
        ); // :3490
        await era.printAndWait(
          `「咕呜嗯～…啊啊～…哈啊啊～…大鸡鸡…都这么烫了…」`,
        ); // :3491
        await era.printAndWait(
          `${target_name}现在有点神情沮丧地继续做着素股………`,
        ); // :3492
        kojo.股间性交 = 4; // :3493
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3495
        await era.printAndWait(
          `「啊啊～…鸡鸡好烫…啊啊～…真的…好想被插进来呢…」`,
        ); // :3496
        await era.printAndWait(`「是、是～、我知道了～…会努力奉仕的哦………♪」`); // :3497
        kojo.股间性交 = 3; // :3498
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        // :3500
        await era.printAndWait(`「啊呜～…大鸡鸡…好烫…感觉变得好奇怪啊………」`); // :3501
        kojo.股间性交 = 2; // :3502
      }
      return 0;
    }
  }

  // :3511 IF SELECTCOM == 34（骑乘位，CFLAG:335）
  if (era_flag.selectcom === 34) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    if (kojo.骑乘位 === 0) {
      // :3513

      if (era.get(`talent:${target}:0`) === 1) {
        // :3515

        if (era.get(`talent:${target}:76`) === 1) {
          // :3517
          await era.printAndWait(
            `「啊啊啊…主人～…${sc()}的处女…请收下吧${heart(1)}……额呵呵、总觉得心跳不已呢…」`,
          ); // :3518
          await era.printAndWait(
            `「哈呜～…咕…啊啊…就这样插进去…啊啊～啊～、啊啊啊啊啊啊啊～～！！！」`,
          ); // :3519
          await era.printAndWait(`${target_name}自己沉下腰把处女献了出来。`); // :3520
          await era.printAndWait(
            `「哈啊…哈啊…啊啊啊…主人的大肉棒…进到里面去了～…啊～啊啊～啊啊啊～${heart(1)}」`,
          ); // :3521

          if (era.get(`talent:${target}:317`) === 4) {
            // :3523
            await era.printAndWait(
              `${target_name}开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。`,
            ); // :3524
            await era.printAndWait(
              `「大肉棒…大肉棒…好棒～…这样子的话…已经什么也不用在意了～${heart(1)}」`,
            ); // :3525
            await era.printAndWait(
              `随着腰身的上下运动${target_name}脑海中故乡恋人的事情像被橡皮擦擦去一般的消失了。`,
            ); // :3526
            await era.printAndWait(`已经连他的脸和表情都想不起来了吧………`); // :3527
          } else {
            await era.printAndWait(
              `${target_name}开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。…`,
            ); // :3528-3529
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3532
          await era.printAndWait(`「嗯、真是的…要让我自己…插进去吗…」`); // :3533
          await era.printAndWait(`「好吧…${sc()}的处女…请收下吧${heart(1)}」`); // :3534
          await era.printAndWait(
            `「这可是…一直珍惜着的东西呢…啊～～…哈～…呜～…咕呜呜呜～…嗯～！」`,
          ); // :3535

          if (era.get(`talent:${target}:317`) === 4) {
            // :3537
            await era.printAndWait(
              `（啊啊…${sc()}从现在起…为了你…而生～…${heart(1)}）`,
            ); // :3538
            await era.printAndWait(
              `是想起了故乡的恋人了吗、${target_name}的眼角流下了一滴眼泪………`,
            ); // :3539
          } else {
            await era.printAndWait(`${target_name}的眼角流下了一滴眼泪………`); // :3540-3541
          }
        } else {
          await era.printAndWait(`「啊啊～…要这样…自己插进去吗…」`); // :3544-3545
          await era.printAndWait(
            `「啊呜呜～…不、不要…抓着…腰…咿咿咿～～！啊～啊啊啊啊！」」`,
          ); // :3546

          if (era.get(`talent:${target}:317`) === 4) {
            // :3548
            await era.printAndWait(
              `（我、${sc()}…已经…回不了故乡了…再也回不去了………呜！）`,
            ); // :3549
            await era.printAndWait(
              `是想起了故乡的恋人了吗、${target_name}的双眼泪流不止………`,
            ); // :3550
          } else {
            await era.printAndWait(`${target_name}的双眼泪流不止………`); // :3551-3552
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // :3556-3558
          await era.printAndWait(
            `「啊啊…插进去的地方～…全部被看到了…嗯～嗯呼呜呜${heart(1)}」`,
          ); // :3559
          await era.printAndWait(`「啊啊啊…被看着好有感觉啊～～…${heart(1)}」`); // :3560

          if (v_sense >= 3 && v_insensible) {
            // :3562-3563
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、自己一边看着一边把${player_name}的阴茎连根吞下并开始淫猥地像磨盘似的扭着腰………………`,
            ); // :3562-3563
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3565
          await era.printAndWait(`「骑在主人身上…啊啊、总觉得好淫荡啊♪」`); // :3566
          await era.printAndWait(
            `「啊～啊啊～…那么这样…插进去的地方…就全部被看光了呢…啊啊～啊啊啊～！」」`,
          ); // :3567

          if (v_sense >= 3 && v_insensible) {
            // :3569-3570
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、自己将${player_name}的阴茎连根吞下并开始上下动起了腰………`,
            ); // :3569-3570
          }
        } else {
          await era.printAndWait(`「咕呜呜～…进到…里面去了……」`); // :3572-3573

          if (v_insensible) {
            // :3575
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、被插入的异物感令${target_name}忍不住发出了痛苦的呻吟………`,
            ); // :3576
          } else {
            await era.printAndWait(`${target_name}皱着眉头忍耐着异物感………`); // :3577-3578
          }
        }
      }
      kojo.骑乘位 = 1; // :3582-3583
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3585-3587
        if (rand_n(4) === 0) {
          // :3588
          await era.printAndWait(
            `「咿啊啊～…啊～啊啊啊啊…腰完全停不下来啊～～…大肉棒实在是太爽了～～${heart(1)}」`,
          ); // :3589
          await era.printAndWait(
            `${target_name}淫猥地扭着腰、用整个阴道品味着阴茎。`,
          ); // :3590
          await era.printAndWait(
            `「把精液射进来吧…呐…求您了～…把${sc()}淫乱的小穴里～…用主人的精液到处打满记号吧～！」`,
          ); // :3591
          if (era.get(`talent:${target}:153`) !== 1) {
            // :3592-3593
            await era.printAndWait(
              `「即使怀孕也没事～${heart(1)} 让我生下主人的孩子吧～${heart(1)}」`,
            ); // :3592-3593
          }
        } else if (rand_n(3) === 0) {
          // :3594
          await era.printAndWait(
            `「请更多的…欺负我吧…${sc()}的淫乱小穴…已经湿成一片了～…让我变的更爽吧～${heart(1)}」`,
          ); // :3595
          await era.printAndWait(
            `${target_name}好不容易集中起残存的理性却只是向${player_name}提出了下流的要求。`,
          ); // :3596
          await era.printAndWait(
            `「尽情的…欺负～…小穴…黏糊糊湿答答的…已经…已经…忍不住了～${heart(1)}」`,
          ); // :3597
          await era.printAndWait(
            `「啊～啊～…咿～…咕呜～…啊啊～…啊～…啊啊啊啊啊啊啊啊啊啊啊啊啊${heart(1)}」`,
          ); // :3598
        } else if (rand_n(2) === 0) {
          // :3599
          await era.printAndWait(
            `「明明觉得…不能再这样下去了…啊～…啊～～…${heart(1)}」`,
          ); // :3600
          await era.printAndWait(
            `「淫乱的小穴…一被弄得黏糊糊的…就忍不住了～…${heart(1)}」」`,
          ); // :3601
          await era.printAndWait(
            `「好像做梦一样…被侵犯…被侵犯…要变得奇怪了～${heart(1)}」`,
          ); // :3602
          await era.printAndWait(`${target_name}为了贪求快乐扭动着腰身………`); // :3603
        } else {
          await era.printAndWait(
            `「啊啊～啊啊…啊呼呜～…啊～啊啊啊～…更多的…黏糊糊地插进来吧！把我弄坏吧～！」`,
          ); // :3604-3605
          await era.printAndWait(
            `「啊啊、这样子…紧紧黏在一起…要变成主人专用的阴茎容器了～…${heart(1)}」`,
          ); // :3606
          await era.printAndWait(`${target_name}一脸陶醉地收紧着阴道口………`); // :3607
        }
        kojo.骑乘位 = 9; // :3609
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3611
        if (rand_n(4) === 0) {
          // :3612
          await era.printAndWait(
            `${target_name}把阴茎放进阴道深处、发出了轻轻的呻吟。`,
          ); // :3613
          await era.printAndWait(`「咕啊啊――――――啊～…哈啊啊啊啊${heart(1)}」`); // :3614
          await era.printAndWait(
            `「稍微…高潮了一下呢…让${sc()}变的、这么不知羞耻…你可要…负起责任…呢…啊～～${heart(1)}」`,
          ); // :3615
        } else if (rand_n(3) === 0) {
          // :3616
          await era.printAndWait(
            `「啊～嗯～…嗯啊啊～…啊～～…被这样抽插着…要不行了～${heart(1)}」`,
          ); // :3617
          await era.printAndWait(
            `${target_name}被调教的即使被毫不留情的抽插、也能通过阴道里的刺激得到快感的样子。`,
          ); // :3618
          await era.printAndWait(
            `${target_name}已经完全将沉浸在与${player_name}的快乐之中作为活下去的理由的样子。`,
          ); // :3619
          await era.printAndWait(
            `「马上就要去了…所以先别射哦…请让我变得更舒服吧…${heart(1)}」`,
          ); // :3620
        } else if (rand_n(2) === 0) {
          // :3621
          await era.printAndWait(
            `「啊啊…主人～…喜欢你～${heart(1)} 好喜欢你啊${heart(1)} 所以再多操我的小穴吧${heart(1)}」`,
          ); // :3622
          await era.printAndWait(
            `${target_name}沉溺在强烈的快乐中、半苦半叫地扭动着腰`,
          ); // :3623
          await era.printAndWait(
            `「已经不能…没有这个了…不能…即使一天不做也忍不下去了啊…啊啊～…还想要～！」`,
          ); // :3624
        } else {
          await era.printAndWait(`「啊～…唔嗯～…嗯～嗯嗯～♪…嗯呼呜～♪」`); // :3625-3626
          await era.printAndWait(
            `「主人的精液…${sc()}全部…收下了呢…啊啊～啊～啊哈啊～${heart(1)}」`,
          ); // :3627
          await era.printAndWait(
            `${target_name}在${player_name}的身上扭动着腰娇喘不已………`,
          ); // :3628
        }
        kojo.骑乘位 = 8; // :3630
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3632
        if (rand_n(3) === 0) {
          // :3633
          await era.printAndWait(
            `「啊啊～…明明是这么羞耻的姿势…但是好爽啊～！…啊啊～啊～～${heart(1)}」`,
          ); // :3634
          await era.printAndWait(
            `${target_name}自己前后舂动着腰贪求着快乐、她的表情因为淫乱而扭曲、平常的清纯模样早已烟消云散。`,
          ); // :3635
          await era.printAndWait(
            `「大肉棒…真舒服～${heart(1)} 好舒服啊～…${heart(1)}」`,
          ); // :3636
        } else if (rand_n(2) === 0) {
          // :3637
          await era.printAndWait(`「大肉棒…全部插进去了～…${heart(1)}」`); // :3638
          await era.printAndWait(
            `「明明既不是结婚对象…也不是恋人…啊啊～啊～…但是太舒服了实在没办法啊～…咿～啊呜啊啊啊～${heart(1)}」」`,
          ); // :3639
          await era.printAndWait(
            `抓住沉溺于快乐中的${target_name}的腰、每次往阴道里捅就会发出高亢的娇喘声………`,
          ); // :3640
        } else {
          await era.printAndWait(
            `「啊啊～…好深…好深啊…${heart(1)} 小穴里面…完全被大肉棒侵占啦～～${heart(1)}」`,
          ); // :3641-3642
          await era.printAndWait(
            `${target_name}为了贪求${player_name}的鸡鸡不断上下扭动着腰。`,
          ); // :3643
          await era.printAndWait(
            `「啊啊～${heart(1)} 更多地…惩罚成为肉棒奴隶的${sc()}吧～${heart(1)}」`,
          ); // :3644
        }
        kojo.骑乘位 = 7; // :3646
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3648
        if (rand_n(4) === 0) {
          // :3649
          await era.printAndWait(
            `「咿啊啊～…啊～啊啊啊啊…腰完全停不下来啊～～…大肉棒实在是太爽了～～${heart(1)}」`,
          ); // :3650

          if (v_sense >= 3 && v_insensible) {
            // :3652
            await era.printAndWait(
              `${target_name}曾是圣女的一部分的钝感私处被开发的感觉到了无穷的快感。`,
            ); // :3653
            await era.printAndWait(
              `”淫乱”的${target_name}完全沉溺在了快乐之中、淫猥地摇晃着腰品味着阴茎………`,
            ); // :3654
          } else if (v_sense >= 3) {
            // :3656
            await era.printAndWait(
              `${target_name}淫猥地摇着腰身、品味着阴茎………`,
            ); // :3657
          }
        } else if (rand_n(3) === 0) {
          // :3659
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「哈啊啊～…嗯呼呜${heart(1)}　这样子插得好深啊～…${heart(1)}」`,
          ); // :3660
          await era.printAndWait(
            `「紧密地${heart(1)} 紧密地${heart(1)} 扭着腰…好喜欢…嗯啊啊～～${heart(1)}」`,
          ); // :3661

          if (v_sense >= 3 && v_insensible) {
            // :3663
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、坦率的接受快感的${target_name}很愉快的前后扭着腰、身体一次又一次的痉挛着………`,
            ); // :3664
          } else if (v_sense >= 3) {
            // :3666
            await era.printAndWait(
              `${target_name}每次扭动腰身、就会一颤一颤地痉挛起来、品味着快乐………`,
            ); // :3667
          }
        } else if (rand_n(2) === 0) {
          // :3669
          await era.printAndWait(
            `「嗯呜唔～…啊啊～…啊～～…啊啊啊啊～…${scf()}～${sc()}的淫乱小穴刚才擅自就高潮了真是对不起～${heart(1)}」`,
          ); // :3670
          await era.printAndWait(
            `「不过～…腰…停不下来啊～…小穴太淫乱了真是对不起～${heart(1)}」`,
          ); // :3671
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊啊～…主人～${heart(1)}　更多的…更多的欺负我吧～～！」`,
          ); // :3672

          if (v_sense >= 3 && v_insensible) {
            // :3674
            await era.printAndWait(
              `${target_name}的私处已经被开发得忘记钝感时候的感觉了、${target_name}带着陶醉的表情激烈的摇动着腰喘息不已………`,
            ); // :3675
          } else if (v_sense >= 3) {
            // :3677
            await era.printAndWait(
              `${target_name}带着陶醉的表情、激烈的摇动着腰沉浸在快乐之中………`,
            ); // :3678
          }
        } else {
          await era.printAndWait(`「嗯唔～…啊咿～…不要…不要…${heart(1)}」`); // :3680-3681
          await era.printAndWait(
            `「啊～啊啊啊～…嗯～咕呜～…呜啊…已经…不行了…已经…除了小穴其他什么也不想嘞…${heart(1)}」`,
          ); // :3682

          if (v_sense >= 3 && v_insensible) {
            // :3684
            await era.printAndWait(
              `${target_name}的私处已经被开发得忘记钝感时候的感觉了、${target_name}嘴边耷拉着口水贪求着快乐………`,
            ); // :3685
          } else if (v_sense >= 3) {
            // :3687
            await era.printAndWait(`${target_name}嘴边耷拉着口水贪求着快乐………`); // :3688
          }
        }
        kojo.骑乘位 = 6; // :3691
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3693
        if (rand_n(4) === 0) {
          // :3694
          await era.printAndWait(
            `「嗯～…啊、啊啊～…不用动也可以哦…能让主人舒服的话…就行～♪」`,
          ); // :3695

          if (v_sense >= 3 && v_insensible) {
            // :3697
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、为了进一步品尝那种滋味${target_name}一边开心的笑着一边上下动着腰………`,
            ); // :3698
          } else if (v_sense >= 3) {
            // :3700
            await era.printAndWait(
              `${target_name}一边开心的笑着一边扭动着腰品味着快乐………`,
            ); // :3701
          }
        } else if (rand_n(3) === 0) {
          // :3703
          await era.printAndWait(
            `「啊～…嗯嗯～…啊～～…不行爽过头了～…忍不住了～…♪」」`,
          ); // :3704

          if (v_sense >= 3 && v_insensible) {
            // :3706
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、自己将${player_name}的阴茎连根吞下并发出了很带感的呻吟声………`,
            ); // :3707
          } else if (v_sense >= 3) {
            // :3709
            await era.printAndWait(
              `${target_name}一把你的阴茎吞入体内就欢喜的颤抖不已………`,
            ); // :3710
          }
        } else if (rand_n(2) === 0) {
          // :3712
          await era.printAndWait(`「喜欢…好喜欢主人的东西啊…啊啊～…♪」`); // :3713
          await era.printAndWait(
            `「这里…也希望主人能变的更舒服点呢…啊～啊啊～…哈唔呜～…让我…来奉仕您吧～${heart(1)}」`,
          ); // :3714

          if (v_sense >= 3 && v_insensible) {
            // :3716
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、尝到这种快乐的${target_name}淫笑着摇动着腰持续进行着仕奉………`,
            ); // :3717
          } else if (v_sense >= 3) {
            // :3719
            await era.printAndWait(
              `${target_name}一边淫笑着、一边继续努力侍奉着${player_name}………`,
            ); // :3720
          }
        } else {
          await era.printAndWait(`「啊～…唔嗯～…嗯呜唔呜…嗯呼呜～♪」`); // :3722-3723
          await era.printAndWait(
            `「啊啊～…这么的舒服…已经变的离不开它了…啊～啊啊～啊啊啊啊！」`,
          ); // :3724

          if (v_sense >= 3 && v_insensible) {
            // :3726
            await era.printAndWait(
              `${target_name}钝感的私处已经变成了产生快感的蜜壶、${target_name}神情陶醉的舂动着腰品味着快乐………`,
            ); // :3727
          } else if (v_sense >= 3) {
            // :3729
            await era.printAndWait(
              `${target_name}陶醉地舂动着腰引诱着${player_name}射精………`,
            ); // :3730
          }
        }
        kojo.骑乘位 = 5; // :3733
      } else if (
        mark(2) === 3 &&
        v_sense >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3735
        if (rand_n(4) === 0) {
          // :3736
          await era.printAndWait(
            `「啊～…嗯咕～…咿～！？…这、这是什么…啊～哈啊～！」`,
          ); // :3737

          if (v_insensible) {
            // :3739
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、${target_name}开始有感觉了………`,
            ); // :3740
          } else {
            await era.printAndWait(
              `${target_name}因为自己私处传来的快感而感到迷惑、开始有感觉了的样子………`,
            ); // :3741-3742
          }
        } else if (rand_n(3) === 0) {
          // :3744
          await era.printAndWait(
            `「啊咿呀～！？…啊～…啊～啊啊～…总觉得…好奇怪啊…那里变的…好奇怪哦～」`,
          ); // :3745

          if (v_insensible) {
            // :3747
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、慢慢的沉溺于溢出的快感之中………`,
            ); // :3748
          } else {
            await era.printAndWait(
              `${target_name}慢慢的沉溺于溢出的快感之中………`,
            ); // :3749-3750
          }
        } else if (rand_n(2) === 0) {
          // :3752
          await era.printAndWait(
            `「啊～…唔诶…啊～嗯～！嗯～！…爽、好爽～！？……啊啊、这样、好爽…${heart(1)}」`,
          ); // :3753

          if (v_insensible) {
            // :3755
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、慢慢的沉溺于溢出的快感之中………`,
            ); // :3756
          } else {
            await era.printAndWait(
              `${target_name}慢慢的沉溺于溢出的快感之中………`,
            ); // :3757-3758
          }
        } else {
          await era.printAndWait(
            `「啊～…嗯咕～…咿～！？…这、这是怎么回事…啊～哈啊～！」`,
          ); // :3760-3761

          if (v_insensible) {
            // :3763
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、${target_name}对快感有些迷茫但还是上下动起了腰………`,
            ); // :3764
          } else {
            await era.printAndWait(
              `${target_name}因为自己私处传来的快感而感到迷惑、开始有感觉了的样子………`,
            ); // :3765-3766
          }
        }
        kojo.骑乘位 = 4; // :3769
      } else if (
        mark(2) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3771
        await era.printAndWait(`「啊～…嗯呜唔…这、这样做的话…会舒服吗…？」`); // :3772

        if (v_insensible) {
          // :3774
          await era.printAndWait(
            `${target_name}自己动着私处、但不是很有感觉、被插入的异物感令${target_name}忍不住发出了痛苦的呻吟………`,
          ); // :3775
        } else {
          await era.printAndWait(`${target_name}生硬地遵从着你的命令………`); // :3776-3777
        }
        kojo.骑乘位 = 3; // :3779
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :3781
        await era.printAndWait(
          `「啊…咕、呜唔…啊～啊啊～！…这样动就可以了吧…嗯～！」`,
        ); // :3782

        if (v_insensible) {
          // :3784
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、被插入的异物感令${target_name}忍不住发出了痛苦的呻吟………`,
          ); // :3785
        } else {
          await era.printAndWait(`${target_name}皱着眉头忍耐着异物感………`); // :3786-3787
        }
        kojo.骑乘位 = 2; // :3789
      }
      return 0;
    }
  }

  // :3800 IF SELECTCOM == 35（全身擦洗，CFLAG:336）
  if (era_flag.selectcom === 35) {
    const serve = era.get(`abl:${target}:16`) || 0;

    if (kojo.全身擦洗 === 0) {
      // :3802

      if (serve >= 3) {
        // :3804
        await era.printAndWait(
          `「额呵呵～…还有这样的洗法啊…我会努力奉仕的哦…♪」`,
        ); // :3805
      } else {
        await era.printAndWait(
          `「诶、要用${sc()}的身体来为${scf()}做擦洗吗…？」`,
        ); // :3807-3808
      }
      kojo.全身擦洗 = 1; // :3810-3811
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3813-3815
        await era.printAndWait(
          `「啊啊啊…感觉如何呢…${sc()}的身体～…额呵呵、这样擦洗身体…总觉得…嗯…啊…哈啊～～♪」`,
        ); // :3816
        await era.printAndWait(`${target_name}故意发出了喘息声………`); // :3817
        kojo.全身擦洗 = 5; // :3818
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3820
        await era.printAndWait(
          `「啊啊～…嗯呼呜…明明是在奉仕…${sc()}却自己舒服起来了…啊啊～…对不起～～${heart(1)}」`,
        ); // :3821
        await era.printAndWait(
          `${target_name}的两腿之间溢出了不是泡沫的粘稠物质………`,
        ); // :3822
        kojo.全身擦洗 = 4; // :3823
      } else if (
        serve >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3825
        await era.printAndWait(
          `「嗯～…嗯唔～…啊啊～…啊啊…总觉得掌握到诀窍了呢…嗯呼呜♪」`,
        ); // :3826
        kojo.全身擦洗 = 3; // :3827
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        // :3829
        await era.printAndWait(`「啊啊～…哈…嗯唔…啊、这、这样做是吗………」`); // :3830
        kojo.全身擦洗 = 2; // :3831
      }
      return 0;
    }
  }

  // :3840 IF SELECTCOM == 36（骑乘位肛交，CFLAG:337）
  if (era_flag.selectcom === 36) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.骑乘位肛交 === 0) {
      // :3842

      if (era.get(`talent:${target}:76`) === 1) {
        // :3844
        await era.printAndWait(
          `「啊啊～…快看…大肉棒被${sc()}的…屁股眼…啊～哈啊啊啊…全部吞进去了～咕呜～${heart(1)}」`,
        ); // :3845

        if (a_sense >= 3 && a_insensible) {
          // :3847-3848
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          ); // :3847-3848
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3850
        await era.printAndWait(
          `「嗯啊…哈啊啊…屁股眼…被撑开了………嗯咕呜～…先、先不要动哦～…就让${sc()}来…全力地动吧♪」`,
        ); // :3851

        if (a_sense >= 3 && a_insensible) {
          // :3853-3854
          await era.printAndWait(
            `${target_name}钝感的肛门被开发而觉醒了快感、一将鸡鸡连根吞下、${target_name}就娇喘出声………`,
          ); // :3853-3854
        }
      } else {
        await era.printAndWait(
          `「咕呜…不要全放进去啊…嗯～…嗯～…呜呜呜呜呜～！」`,
        ); // :3856-3857

        if (a_insensible) {
          // :3859
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :3860
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦的呻吟着………`,
          ); // :3861-3862
        }
      }
      kojo.骑乘位肛交 = 1; // :3865-3866
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3868-3870
        if (rand_n(2) === 0) {
          // :3871
          await era.printAndWait(
            `「啊～…嗯呼呜呜呜…不行不行不行了…屁股眼被…大肉棒…全部…插进来了～…啊啊啊啊啊～${heart(1)}」`,
          ); // :3872
          await era.printAndWait(
            `${target_name}放弃抵抗苦闷的喘息着、用肛门将阴茎全部收纳进来。`,
          ); // :3873
          await era.printAndWait(
            `「哈咕呜…呜啊啊～…啊啊～…呜～…呼呜～…啊啊～…已经、已经…要不行了…已经…停不下来了～～～～～${heart(1)}」`,
          ); // :3874

          if (a_insensible) {
            // :3876
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得品尝到了快感、用肛门将阴茎连根吞入、${target_name}激烈的上下动着腰………`,
            ); // :3877
          }
        } else {
          await era.printAndWait(
            `「嗯咿～…咿呜…啊啊～屁股眼好爽啊～${heart(1)}」`,
          ); // :3879-3880
          await era.printAndWait(
            `「爽爆了～…总觉得其他事情都已经变的无所谓了～…啊啊～已经不能不去侍奉主人了啊～」`,
          ); // :3881
          await era.printAndWait(
            `「啊啊～啊～哈啊啊啊～！屁股眼…更多的欺负～欺负～欺负吧啊～～～～～～～${heart(1)}」`,
          ); // :3882

          if (a_insensible) {
            // :3884
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得品尝到了快感、${target_name}不断地上下动着腰用肛门贪求着快感…`,
            ); // :3885
          }
        }
        kojo.骑乘位肛交 = 7; // :3888
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3890
        await era.printAndWait(
          `「嗯咿～…咿呜…啊啊～屁股眼好爽啊～${heart(1)}」`,
        ); // :3891
        await era.printAndWait(
          `「爽爆了～…总觉得其他事情都已经变的无所谓了～…啊啊～已经不能不去侍奉主人了啊～」`,
        ); // :3892
        await era.printAndWait(
          `「啊啊～啊～哈啊啊啊～！屁股眼…更多的欺负～欺负～欺负吧啊～～～～～～～${heart(1)}」`,
        ); // :3893

        if (a_insensible) {
          // :3895
          await era.printAndWait(
            `虽然${target_name}的肛门还在纠正钝感的开发途中、但${target_name}还是淫猥地摇着腰身、用肛门品味起了阴茎………`,
          ); // :3896
        }
        kojo.骑乘位肛交 = 6; // :3898
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3900
        if (rand_n(2) === 0) {
          // :3901
          await era.printAndWait(
            `「啊～啊啊～…啊啊～…用屁股眼…竟然这么的有感觉～………」`,
          ); // :3902
          await era.printAndWait(
            `「已经…再也离不开主人了～～～…啊～啊～～啊呼呜～${heart(1)}」`,
          ); // :3903

          if (a_insensible) {
            // :3905
            await era.printAndWait(
              `${target_name}钝感的肛门被开发而觉醒了快感、${target_name}一边前后摇晃着纤细的腰一边品味着肛门的快感………`,
            ); // :3906
          } else {
            await era.printAndWait(
              `${target_name}一边前后摇晃着纤细的腰一边品味着肛门的快感………`,
            ); // :3907-3908
          }
        } else {
          await era.printAndWait(
            `「嗯～…啊啊～啊～～！咿呀～…哈呜呜嗯～…咿呀～♪」`,
          ); // :3910-3911
          await era.printAndWait(
            `「啊啊～…对不起～…明明想好好奉仕的…但因为屁股眼实在太舒服了…腰停不下来了～${heart(1)}」`,
          ); // :3912

          if (a_insensible) {
            // :3914
            await era.printAndWait(
              `${target_name}钝感的肛门被开发的能产生出快感了、${target_name}因为这种快乐而按捺不住了、腰身的上下运动已经停不下来了的样子………`,
            ); // :3915
          } else {
            await era.printAndWait(
              `${target_name}由于肛门的快乐而按捺不住了、腰身的上下运动已经停不下来了的样子………`,
            ); // :3916-3917
          }
        }
        kojo.骑乘位肛交 = 5; // :3920
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3922
        await era.printAndWait(
          `「嗯～…啊啊～啊～～！咿呀～…哈呜呜嗯～…咿呀～♪」`,
        ); // :3923
        await era.printAndWait(
          `「啊啊～…对不起～…明明想好好奉仕的…但因为屁股眼实在太舒服了…腰停不下来了～${heart(1)}」`,
        ); // :3924

        if (a_insensible) {
          // :3926
          await era.printAndWait(
            `虽然${target_name}的肛门还在纠正钝感的开发途中、但因为是被所爱慕的${player_name}侵犯的缘故、开心的腰都停不下来的样子………`,
          ); // :3927
        } else {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}侵犯了、${target_name}一边开心地娇喘着一边上下动着腰………`,
          ); // :3928-3929
        }
        kojo.骑乘位肛交 = 4; // :3931
      } else if (
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3933
        await era.printAndWait(
          `「啊咿～～…不行…不行了…屁股眼爽到不行了～…啊～啊啊～！」`,
        ); // :3934

        if (a_insensible) {
          // :3936
          await era.printAndWait(
            `${target_name}钝感的肛门被开发了、${target_name}一边呻吟着一边上下动着腰………`,
          ); // :3937
        } else {
          await era.printAndWait(
            `${target_name}觉醒了肛门的快感、一边呻吟一边上下动着腰………`,
          ); // :3938-3939
        }
        kojo.骑乘位肛交 = 3; // :3941
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :3943
        await era.printAndWait(
          `「咕～…呜呜～…嗯嗯～…已经…不想再动了～…啊啊～…啊呜～！」`,
        ); // :3944

        if (a_insensible) {
          // :3946
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          ); // :3947
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦的呻吟着………`,
          ); // :3948-3949
        }
        kojo.骑乘位肛交 = 2; // :3951
      }
      return 0;
    }
  }

  // :3960 IF SELECTCOM == 37（肛门侍奉，CFLAG:338）
  if (era_flag.selectcom === 37) {
    const serve = era.get(`abl:${target}:16`) || 0;

    if (kojo.肛门侍奉 === 0) {
      // :3962

      if (serve >= 3) {
        // :3964
        await era.printAndWait(`「嗯…咕…啾…呗咯…呗咯～…嘞咯…哈啊啊…好苦………」`); // :3965
        await era.printAndWait(
          `${target_name}下定决心用舌头舔起了${player_name}的肛门………`,
        ); // :3966
      } else {
        await era.printAndWait(`「要用嘴…舔这种地方…嗯～…好臭…呜唔～…呜呜～」`); // :3968-3969
        await era.printAndWait(
          `${target_name}一边落泪一边亲吻着${player_name}的肛门………`,
        ); // :3970
      }
      kojo.肛门侍奉 = 1; // :3972-3973
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3975-3977
        await era.printAndWait(
          `「哈啊啊…嗯～…嗯啾呜…嘞咯～…呗咯～…呗咯…啊啊～好美味啊${heart(1)}」`,
        ); // :3978
        await era.printAndWait(
          `${target_name}神情陶醉的将舌头深入${player_name}的肛门之中持续地奉仕着………`,
        ); // :3979
        kojo.肛门侍奉 = 5; // :3980
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3982
        await era.printAndWait(
          `「啊哈啊…主人～…舌头伸到里面感觉舒服吗？嗯啾…啾…啾呜呜呜」`,
        ); // :3983
        await era.printAndWait(
          `${target_name}开心的将舌头深入肛门不断奉仕着。`,
        ); // :3984
        await era.printAndWait(
          `「哈啊啊啊…奉仕太棒了…真想永远这样舔主人的肛门呢～………♪」`,
        ); // :3985
        await era.printAndWait(
          `一脸陶醉的${target_name}大有将肛门侍奉持续一整天的势头………`,
        ); // :3986
        kojo.肛门侍奉 = 4; // :3987
      } else if (
        serve >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3989
        await era.printAndWait(
          `「嘞噗～…啾呜…嘞咯～…啾～啾唔呜唔………哈啊…哈啊…」`,
        ); // :3990
        await era.printAndWait(`${target_name}已经习惯了肛门侍奉的样子………`); // :3991
        kojo.肛门侍奉 = 3; // :3992
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        // :3994
        await era.printAndWait(`「嗯咕～…啾～…啾…嘞咯～…呗咯…啾……呜唔…」`); // :3995
        await era.printAndWait(
          `${target_name}一边落泪一边用舌头舔着${player_name}的肛门………`,
        ); // :3996
        kojo.肛门侍奉 = 2; // :3997
      }
      return 0;
    }
  }

  // :4006 IF SELECTCOM == 40（打屁股，CFLAG:341）
  if (era_flag.selectcom === 40) {
    const masochism = era.get(`abl:${target}:21`) || 0;
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    if (kojo.打屁股 === 0) {
      // :4008
      await era.printAndWait(
        `「呀啊啊～！…啊啊～…为、为什么要打我啊～…咿～！不要打～！」`,
      ); // :4009
      kojo.打屁股 = 1; // :4010-4011
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4013-4015
        await era.printAndWait(
          `「啊～…咿呀～～…啊～～！嗯呼呜…啊～…哈啊啊啊啊～～${heart(1)}」`,
        ); // :4016
        await era.printAndWait(
          `${target_name}像引诱你似的左右摇着屁股、每次被打就会发出娇艳的呻吟声、爱液从大腿上垂落下来………`,
        ); // :4017
        kojo.打屁股 = 5; // :4018
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4020
        await era.printAndWait(
          `「咿呀～～…啊～…哈唔嗯～…啊啊～…请更多的…更多的打我吧………」`,
        ); // :4021
        await era.printAndWait(
          `${target_name}像引诱你似的左右摇着屁股、每次被打都会发出色气满满的声音………`,
        ); // :4022
        kojo.打屁股 = 4; // :4023
      } else if (
        mark(0) === 3 &&
        mark(2) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4025
        await era.printAndWait(
          `「嗯～…咕呜～啊～…啊～～…咿～…咕、这、这样的…啊啊～！」`,
        ); // :4026
        await era.printAndWait(
          `${target_name}已经放弃了似的自己把屁股伸出来承受着击打………`,
        ); // :4027
        kojo.打屁股 = 3; // :4028
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        // :4030
        await era.printAndWait(
          `「啊啊～…咕～…咿～…好痛～好痛啊～…请你住手吧～～～！」`,
        ); // :4031
        await era.printAndWait(
          `${target_name}泪流不止悲痛地叫喊着、承受着屁股上的击打………`,
        ); // :4032
        kojo.打屁股 = 2; // :4033
      }
      return 0;
    }
  }

  // :4042 IF SELECTCOM == 41（鞭，CFLAG:342）
  if (era_flag.selectcom === 41) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.鞭 === 0) {
      // :4044

      if (era.get(`talent:${target}:76`) === 1) {
        // :4046
        await era.printAndWait(`「啊啊…虽然被抽也不是不可以…${heart(1)}」`); // :4047
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4049
        await era.printAndWait(
          `「${scf()}、${sc()}是不会反抗的…所以求您了…不要这样…呀呜呜呜～！」`,
        ); // :4050
      } else {
        await era.printAndWait(`「咿～…这、这样子…啊啊～！好痛～好痛啊～！」`); // :4052-4053
      }
      kojo.鞭 = 1; // :4055-4056
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4058-4060
        await era.printAndWait(`「啊啊～…啊～…嗯咿咿咿～…${heart(1)}」`); // :4061
        await era.printAndWait(
          `「啊啊啊啊…被这样打…为什么会这么舒服呢…已经…再也变不回去了…嗯～啊～…哈啊啊啊………${heart(1)}」`,
        ); // :4062
        await era.printAndWait(
          `每次被鞭子抽打、爱液就会从${target_name}的私处飞散开来………`,
        ); // :4063
        kojo.鞭 = 9; // :4064
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4066
        await era.printAndWait(
          `「啊～…啊～…呀呜唔嗯～…啊～哈啊～啊啊～…已经不觉得怎么痛了…因为有感觉了～${heart(1)}」`,
        ); // :4067
        await era.printAndWait(
          `${target_name}每次被鞭子抽打就会发出娇艳的呻吟、惹来了更加强烈的鞭打………`,
        ); // :4068
        kojo.鞭 = 8; // :4069
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4071
        await era.printAndWait(
          `「呀呜呜～～…请赐给我这只色情的母狗…更多的痛苦吧…请我更多的惩罚吧${heart(1)}」`,
        ); // :4072
        await era.printAndWait(
          `${target_name}每次被鞭打就会蜷曲着身体发出悲鸣声………`,
        ); // :4073
        kojo.鞭 = 7; // :4074
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4076
        await era.printAndWait(
          `「啊啊～…啊～…啊啊啊～～！…哈啊…哈啊…啊啊…好奇怪…这样…好奇怪啊………」`,
        ); // :4077
        await era.printAndWait(
          `${target_name}每次被鞭打就会摩擦起双腿、露出陶醉的表情。`,
        ); // :4078
        await era.printAndWait(
          `「总觉得…好舒服呢…啊啊～请更多地…鞭笞我吧………」`,
        ); // :4079
        kojo.鞭 = 6; // :4080
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4082
        await era.printAndWait(
          `「啊啊～…嗯～…嗯啊～…咿～…啊啊…为…什么…明明…是被鞭打…啊啊～！」`,
        ); // :4083
        await era.printAndWait(
          `${target_name}不断地被鞭打着。但是比起痛楚更多的是一种奇妙的瘙痒感………`,
        ); // :4084
        kojo.鞭 = 5; // :4085
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4087
        await era.printAndWait(
          `「${sc()}是…不会…反抗你的…不会反抗的…啊啊…所以…请饶了我吧…咿～～！」`,
        ); // :4088
        await era.printAndWait(`${target_name}一被鞭打就出声讨饶………`); // :4089
        kojo.鞭 = 4; // :4090
      } else if (masochism >= 3 && (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)) {
        // :4092
        await era.printAndWait(
          `「啊啊～！…啊啊…不、不对…这是…咿呀～～…啊～啊啊啊～～！」`,
        ); // :4093
        await era.printAndWait(
          `${player_name}的鞭子在${target_name}的身上一次又一次的抽打着。`,
        ); // :4094
        await era.printAndWait(
          `然后每鞭打数次${target_name}就会发出一声娇艳的呻吟………`,
        ); // :4095
        kojo.鞭 = 3; // :4096
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :4098
        await era.printAndWait(`「啊啊～…求你了…快住手吧…求你了…」`); // :4099
        await era.printAndWait(`${target_name}泪流满面、祈求饶恕………`); // :4100
        kojo.鞭 = 2; // :4101
      }
      return 0;
    }
  }

  // :4110 IF SELECTCOM == 42（针，CFLAG:343）
  if (era_flag.selectcom === 42) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.针 === 0) {
      // :4112

      if (era.get(`talent:${target}:76`) === 1) {
        // :4114
        await era.printAndWait(
          `「啊啊啊…这次要这样开发${sc()}吗～…是～…我会好好忍耐的…」`,
        ); // :4115
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4117
        await era.printAndWait(
          `「不、不要～…${sc()}是…不会反抗的…所以只有会痛的事情…啊啊啊～！」`,
        ); // :4118
      } else {
        await era.printAndWait(
          `「要、要用这根针做什么…啊啊～住～､住手啊啊啊啊啊啊！！」`,
        ); // :4120-4121
      }
      kojo.针 = 1; // :4123-4124
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4126-4128
        await era.printAndWait(
          `「啊～…哈呜～…嗯～…那里～…还要…还想被刺啊～～～～！」`,
        ); // :4129
        await era.printAndWait(
          `${target_name}发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………`,
        ); // :4130
        kojo.针 = 9; // :4131
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4133
        await era.printAndWait(
          `「嗯呼呜…继续…继续插我～…嗯咿～…总觉得好麻啊…啊～啊～♪」`,
        ); // :4134
        await era.printAndWait(`${target_name}因为被针刺的麻痒感觉而迷惑了………`); // :4135
        kojo.针 = 8; // :4136
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4138
        await era.printAndWait(
          `「嗯啊～…啊～…哈咕呜…果然…还是很痛～…咕…嗯嗯嗯～！」`,
        ); // :4139
        await era.printAndWait(`${target_name}忍耐着被针刺的疼痛………`); // :4140
        kojo.针 = 7; // :4141
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4143
        await era.printAndWait(
          `「明明…应该…只会感到痛的…嗯呼呜…为什么会有感觉…呢…………呀啊啊～♪」`,
        ); // :4144
        await era.printAndWait(
          `${target_name}发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………`,
        ); // :4145
        kojo.针 = 6; // :4146
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4148
        await era.printAndWait(
          `「啊～…啊～…嗯呼呜…明明是被刺着…为什么…啊啊～！」`,
        ); // :4149
        await era.printAndWait(`${target_name}因为被针刺的麻痒感觉而迷惑了………`); // :4150
        kojo.针 = 5; // :4151
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4153
        await era.printAndWait(
          `「啊啊…求求你…${sc()}是不会反抗你的…所以不要再让我痛了…啊啊啊～！」`,
        ); // :4154
        await era.printAndWait(`${target_name}每次被针戳就会发出悲鸣声………`); // :4155
        kojo.针 = 4; // :4156
      } else if (masochism >= 3 && (kojo.针 <= 2 || game.kojo.口上开关 === 2)) {
        // :4158
        await era.printAndWait(
          `「咕呜～…嗯～…啊啊～…啊啊啊啊…总觉得…像过电似的…好奇怪…呢………」`,
        ); // :4159
        await era.printAndWait(`${target_name}因为被针刺的麻痒感觉而迷惑了………`); // :4160
        kojo.针 = 3; // :4161
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        // :4163
        await era.printAndWait(`「咕呜～…呜啊啊…啊～…咕呜呜～…咿～～…」`); // :4164
        await era.printAndWait(
          `${target_name}咬着嘴唇忍受着痛楚、但还是从嘴边漏出了痛苦的声音………`,
        ); // :4165
        kojo.针 = 2; // :4166
      }
      return 0;
    }
  }

  // :4176 IF SELECTCOM == 43 && TEQUIP:43（眼罩开始，CFLAG:344）
  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.眼罩 === 0) {
      // :4178

      if (era.get(`talent:${target}:85`) === 1) {
        // :4180-4181
        await era.printAndWait(''); // :4180-4181
      } else {
        await era.printAndWait(''); // :4183-4184
      }
      kojo.眼罩 = 1; // :4186-4187
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4189-4192
        await era.printAndWait(''); // :4189-4192
        kojo.眼罩 = 6; // :4193
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4195-4196
        await era.printAndWait(''); // :4195-4196
        kojo.眼罩 = 5; // :4197
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4199-4200
        await era.printAndWait(''); // :4199-4200
        kojo.眼罩 = 4; // :4201
      } else if (
        masochism >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4203-4204
        await era.printAndWait(''); // :4203-4204
        kojo.眼罩 = 3; // :4205
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :4207-4208
        await era.printAndWait(''); // :4207-4208
        kojo.眼罩 = 2; // :4209
      }
      return 0;
    }
  }

  // :4214 ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0（眼罩脱着，CFLAG:380）
  if (era_flag.selectcom === 43 && !era.get(`tequip:${target}:43`)) {
    if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4216-4217
      await era.printAndWait(''); // :4216-4217
      kojo.眼罩着脱 = 2; // :4218
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4220-4221
      await era.printAndWait(''); // :4220-4221
      kojo.眼罩着脱 = 1; // :4222
    }
    return 0;
  }

  // :4231 IF SELECTCOM == 44 && TEQUIP:44（绳子开始，CFLAG:345）
  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.绳子 === 0) {
      // :4233

      if (era.get(`talent:${target}:76`) === 1) {
        // :4235
        await era.printAndWait(`「啊啊啊…请再绑紧一点～…${heart(1)}」`); // :4236
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        ); // :4237
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4239
        await era.printAndWait(`「这就是所谓的爱的奴隶…吧…？」`); // :4240
        await era.printAndWait(
          `「额呵呵、${sc()}即使没被绳子绑起来…也不会想逃走啦………♪」`,
        ); // :4241
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        ); // :4242
      } else {
        await era.printAndWait(`「哈啊哈啊…这、这样子…没事…」`); // :4244-4245
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        ); // :4246
      }
      kojo.绳子 = 1; // :4248-4249
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4251-4253
        await era.printAndWait(`「啊啊啊～…被绳子绑的紧紧的～${heart(1)}」`); // :4254
        await era.printAndWait(
          `「啊啊～…明明被绳子绑着应该感到又痛又怕的…啊～啊啊啊啊啊${heart(1)}」`,
        ); // :4255
        await era.printAndWait(
          `${target_name}被绳子绑着、爱液不停地滴落下来………`,
        ); // :4256
        kojo.绳子 = 9; // :4257
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4259
        await era.printAndWait(`「是～…我喜欢被…捆绑呢${heart(1)}」`); // :4260
        await era.printAndWait(
          `「因为喜欢…所以请更多的…绑我吧………${heart(1)}」`,
        ); // :4261
        await era.printAndWait(`${target_name}扭扭捏捏的用期待的眼神看着你………`); // :4262
        kojo.绳子 = 8; // :4263
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4265
        await era.printAndWait(`「嗯呼呜…要被绳子吃掉了…好爽～…${heart(1)}」`); // :4266
        await era.printAndWait(`${target_name}被粗绳子绑着显得很愉悦的样子………`); // :4267
        kojo.绳子 = 7; // :4268
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4270
        await era.printAndWait(
          `「啊啊啊…果然${sc()}是…主人的所有物…再次得到确认了…♪」`,
        ); // :4271
        await era.printAndWait(
          `「啊～～…被绑着…虽然痛…但是好舒服～…咿呀～～！啊～～！啊啊～♪」」`,
        ); // :4272
        await era.printAndWait(
          `${target_name}露出发情的母狗般的表情被粗绳子绑住了………`,
        ); // :4273
        kojo.绳子 = 6; // :4274
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4276
        await era.printAndWait(`「嗯呜唔…总觉的…感觉变的好奇怪～…♪」`); // :4277
        await era.printAndWait(
          `「请再绑紧一点…让${sc()}再也逃不出主人的五指山………♪」`,
        ); // :4278
        await era.printAndWait(`${target_name}一脸愉悦地被粗绳子绑住………`); // :4279
        kojo.绳子 = 5; // :4280
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4282
        await era.printAndWait(
          `「啊啊啊…请再绑紧一点～…这就是${sc()}是主人的所有物的证据…啊啊啊啊………」`,
        ); // :4283
        await era.printAndWait(`${target_name}一脸陶醉地被粗绳子绑住………`); // :4284
        kojo.绳子 = 4; // :4285
      } else if (
        masochism >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4287
        await era.printAndWait(
          `「啊啊啊…为什么…明明被绑起来了…那个地方却痒痒的…啊～、我刚才什么也没说…什么也没有」`,
        ); // :4288
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        ); // :4289
        kojo.绳子 = 3; // :4290
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        // :4292
        await era.printAndWait(`「哈啊～…啊～…嗯～…这样、不算什么………」`); // :4293
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        ); // :4294
        kojo.绳子 = 2; // :4295
      }
      return 0;
    }
  }

  // :4300 ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0（绳子脱着，CFLAG:385）
  if (era_flag.selectcom === 44 && !era.get(`tequip:${target}:44`)) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4302
      await era.printAndWait(
        `「哈啊…哈啊…啊啊…明明可以再绑一会儿的…${heart(1)}」`,
      ); // :4303
      kojo.绳子着脱 = 2; // :4304
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4306
      await era.printAndWait(`「额呵呵…下次什么时候再把我绑起来吧…？」`); // :4307
      kojo.绳子着脱 = 2; // :4308
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4310
      await era.printAndWait(`「哈啊哈啊…这、这样子…啊啊～会留下痕迹的………」`); // :4311
      kojo.绳子着脱 = 1; // :4312
    }
    return 0;
  }

  // :4321 IF SELECTCOM == 45 && TEQUIP:45（口塞开始，CFLAG:346）
  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.口塞 === 0) {
      // :4323

      if (era.get(`talent:${target}:85`) === 1) {
        // :4325
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`); // :4326
      } else {
        await era.printAndWait(`「哈咕～…呜呜…」`); // :4328-4329
      }
      kojo.口塞 = 1; // :4331-4332
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4334-4336
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`); // :4337
        kojo.口塞 = 6; // :4338
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4340
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`); // :4341
        kojo.口塞 = 5; // :4342
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4344
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`); // :4345
        kojo.口塞 = 4; // :4346
      } else if (
        masochism >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4348
        await era.printAndWait(`「哈咕～…呜唔嗯…${heart(1)}」`); // :4349
        kojo.口塞 = 3; // :4350
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        // :4352
        await era.printAndWait(`「哈咕～…呜呜…」`); // :4353
        kojo.口塞 = 2; // :4354
      }
      return 0;
    }
  }

  // :4359 ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0（口塞脱着，CFLAG:386）
  if (era_flag.selectcom === 45 && !era.get(`tequip:${target}:45`)) {
    if (
      (era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1) &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4361
      await era.printAndWait(`「嗯咕～…噗啊…哈啊…哈啊…哈啊…${heart(1)}」`); // :4362
      kojo.口塞着脱 = 2; // :4363
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4365
      await era.printAndWait(`「嗯咕～…噗啊…哈啊…哈啊…哈啊…」`); // :4366
      kojo.口塞着脱 = 1; // :4367
    }
    return 0;
  }

  // :4376 IF SELECTCOM == 46 && TEQUIP:46（灌肠+肛塞开始，CFLAG:347）
  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.灌肠肛塞 === 0) {
      // :4378

      if (era.get(`talent:${target}:76`) === 1) {
        // :4380
        await era.printAndWait(
          `「呼啊啊～…肚子鼓起来了…啊啊～…这是…什么…肚子…啊啊～…啊～」`,
        ); // :4381
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4383
        await era.printAndWait(`「肚子好难受…好难受呢…请不要…太欺负我了………」`); // :4384
      } else {
        await era.printAndWait(
          `「咿～…不要不要不要啊～…像这样灌进去的话…呜～…咕呜…好难受～…」`,
        ); // :4386-4387
      }
      kojo.灌肠肛塞 = 1; // :4389-4390
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4392-4394
        await era.printAndWait(
          `「啊～…啊啊～…再灌啊…灌到极限为止～…把肚子灌成水桶似的吧…！」`,
        ); // :4395
        await era.printAndWait(
          `「嗯～…哈啊…哈啊…${sc()}的肚子…已经变成主人的玩具了～…♪」`,
        ); // :4396
        await era.printAndWait(
          `「接下来…肚子里的东西全部喷出来的不堪入目的样子…请好好欣赏吧～${heart(1)}」`,
        ); // :4397
        kojo.灌肠肛塞 = 7; // :4398
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4400
        await era.printAndWait(
          `「咿呀啊啊啊…浣肠液…咕噜咕噜的灌进肚子里面去了～…♪」`,
        ); // :4401
        await era.printAndWait(
          `「啊啊啊啊…${sc()}肚子里的丑陋的东西…要全部排出来啦………♪」`,
        ); // :4402
        kojo.灌肠肛塞 = 6; // :4403
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4405
        await era.printAndWait(
          `「啊～啊啊～…是～…浣肠液…还能再进来一些…咿～咿～咿咿咿咿～！」」`,
        ); // :4406
        await era.printAndWait(
          `「啊～…啊啊啊…被浣肠液这么灌进来…为什么${sc()}却感到高兴呢…？」`,
        ); // :4407
        await era.printAndWait(
          `（${sc()}的身体…甚至连排泄…都已经是主人的玩物了…）`,
        ); // :4408
        kojo.灌肠肛塞 = 5; // :4409
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4411
        await era.printAndWait(
          `「啊啊～…这样子灌进来的话…很快…就要全部排出来了…好害羞～…不要欺负我………」`,
        ); // :4412
        kojo.灌肠肛塞 = 4; // :4413
      } else if (
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4415
        await era.printAndWait(
          `「啊～啊啊啊～…明明应该很难受的…啊～啊啊～…屁股…好奇怪啊～…屁股要变的不像话了～………♪」`,
        ); // :4416
        kojo.灌肠肛塞 = 3; // :4417
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        // :4419
        await era.printAndWait(`「啊啊～…肚子好难受…好狠心…好狠心啊………」`); // :4420
        kojo.灌肠肛塞 = 2; // :4421
      }
      return 0;
    }
  }

  // :4427 ELSEIF SELECTCOM == 46 && TEQUIP:46 == 0（灌肠+肛塞脱着，RAND 拼句）
  if (era_flag.selectcom === 46 && !era.get(`tequip:${target}:46`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (era.get(`talent:${target}:76`) === 1) {
      // :4429

      if (a_sense >= 3 && masochism >= 3) {
        // :4431
        if (rand_n(2) === 0) {
          // :4432
          era.print(`「呀…嗯啊、啊、啊啊！`); // :4433
        } else {
          era.print(`「啊啊～！、不行、不、不要看、`); // :4434-4435
        }
        if (rand_n(2) === 0) {
          // :4437
          era.print(`出来了、`); // :4438
        } else {
          era.print(`出来、要出来了、`); // :4439-4440
        }
        if (rand_n(3) === 0) {
          // :4442
          era.print(`全部`); // :4443
        }
        await era.printAndWait(`要排出来了啊${heart(3)}」`); // :4445
        if (era.get(`tequip:${target}:11`)) {
          // :4446
          if (rand_n(2) === 0) {
            // :4447
            era.print(`以Ｍ字的状态大开双腿的${target_name}那秘所之中`); // :4448
          } else {
            era.print(`四肢着地的${target_name}那股间之中`); // :4449-4450
          }
          await era.printAndWait(`极粗的蠕虫正在蠢动着、`); // :4452
        }
        if (rand_n(2) === 0) {
          // :4454
          await era.printAndWait(
            `${target_name}露出欢愉又夹杂着苦痛的表情、因为排泄的快感而扭动着身体。`,
          ); // :4455
        } else {
          await era.printAndWait(
            `随着下流的声音，那污物正从${target_name}的肛门之中喷吐而出、${target_name}露出了恍惚失神的表情。`,
          ); // :4456-4457
        }
        if (era.get(`exp:${target}:53`) >= 5) {
          // :4459
          era.print(`那扩张开来无法闭合的`); // :4460
          if (rand_n(2) === 0) {
            // :4461
            era.print(`肛门`); // :4462
          } else {
            era.print(`肛穴`); // :4463-4464
          }
          await era.printAndWait(`之中，可以看清那内壁正在痉挛着……`); // :4466
        }
      } else {
        await era.printAndWait(''); // :4468-4469
      }
    } else if (era.get(`talent:${target}:85`) === 1) {
      // :4472

      if (a_sense >= 3 && masochism >= 3) {
        // :4474
        era.print(`「主人…${sc()}那`); // :4475
        if (rand_n(3) === 0) {
          // :4476
          era.print(`排泄的地方也`); // :4477
        } else if (rand_n(2) === 0) {
          // :4478
          era.print(`肮脏的地方也`); // :4479
        } else {
          era.print(`出来的地方也`); // :4480-4481
        }
        if (rand_n(2) === 0) {
          // :4483
          await era.printAndWait(`请您好好地观赏……」`); // :4484
        } else {
          await era.printAndWait(`请您好好地疼爱……」`); // :4485-4486
        }
      } else {
        await era.printAndWait(''); // :4488-4489
      }
    } else if (a_sense >= 3 && masochism >= 3) {
      await era.printAndWait(''); // :4492-4493
    } else {
      await era.printAndWait(''); // :4494-4495
    }
    return 0;
  }

  // :4510 IF SELECTCOM == 55（放置PLAY，CFLAG:356）
  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      // :4512

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4514
        await era.printAndWait(`${target_name}偷偷看着这边………`); // :4515
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4517
        await era.printAndWait(`「哈啊…哈啊…主人～…${heart(1)}」`); // :4518
        await era.printAndWait(`${target_name}露出苦闷的表情………`); // :4519
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4521
        await era.printAndWait(`「嗯…那、那个…请…再调教我吧………♪」`); // :4522
        await era.printAndWait(`${target_name}好像还很欲求不满的样子………`); // :4523
      } else {
        await era.printAndWait(`「休、休息一下是吗………？」`); // :4525-4526
        await era.printAndWait(`${target_name}偷偷看着这边………`); // :4527
      }
      era.print(''); // :4529

      if (era.get(`tequip:${target}:11`)) {
        // :4531-4532
        await era.printAndWait(
          `壶虫在${target_name}的私处里蠢动着、毫不留情的搅动着阴道。`,
        ); // :4531-4532
      }

      if (era.get(`tequip:${target}:13`)) {
        // :4534-4535
        await era.printAndWait(
          `肛门虫在${target_name}的肛门里蠢动着、毫不留情的蹂躙着肛门。`,
        ); // :4534-4535
      }

      if (era.get(`tequip:${target}:19`)) {
        // :4537-4538
        await era.printAndWait(
          `${target_name}的肛门被塞入了肛珠、肛门一颤一颤的。`,
        ); // :4537-4538
      }

      if (era.get(`tequip:${target}:14`)) {
        // :4540-4541
        await era.printAndWait(
          `${target_name}的阴蒂被装上了电动阴蒂夹持续地被刺激着。`,
        ); // :4540-4541
      }

      if (era.get(`tequip:${target}:15`)) {
        // :4543-4544
        await era.printAndWait(
          `${target_name}的乳头被装上了乳头跳蛋持续地被刺激着。`,
        ); // :4543-4544
      }

      if (era.get(`tequip:${target}:16`)) {
        // :4546-4547
        era.print(`${target_name}的胸被装上了榨乳器被吸取着母乳。`); // :4546-4547
      }

      if (era.get(`tequip:${target}:17`)) {
        // :4549-4550
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯现在也像快射精似的颤动着。`,
        ); // :4549-4550
      }

      if (era.get(`tequip:${target}:43`)) {
        // :4552-4553
        await era.printAndWait(`${target_name}被戴着眼罩。`); // :4552-4553
      }

      if (era.get(`tequip:${target}:44`)) {
        // :4555-4556
        await era.printAndWait(`${target_name}的身体被身子绑住动弹不得。`); // :4555-4556
      }

      if (era.get(`tequip:${target}:46`)) {
        // :4558-4559
        await era.printAndWait(
          `${target_name}的肚子因为灌肠的原因发出了咕噜咕噜的声音、如果把塞子拔掉就会马上一泻千里的样子。`,
        ); // :4558-4559
      }

      if (era.get(`tequip:${target}:49`)) {
        // :4561-4562
        await era.printAndWait(
          `${target_name}的肛门插着电极、每当轻微的电流通过、括约肌就会颤动起来。`,
        ); // :4561-4562
      }

      if (era.get(`tequip:${target}:53`)) {
        // :4564-4565
        await era.printAndWait(
          `于是、${target_name}的模样就这样继续被录了下来………`,
        ); // :4564-4565
      }
      kojo.放置PLAY = 1; // :4566-4567
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4569-4571
        await era.printAndWait(`${target_name}偷偷看着这边………`); // :4572
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4574
        await era.printAndWait(`「啊啊～…主人…求、求你了…请不要不理我…嗯！」`); // :4575
        await era.printAndWait(
          `${target_name}露出发情般的表情向${player_name}撒娇…………`,
        ); // :4576
        kojo.放置PLAY = 6; // :4577
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4579
        await era.printAndWait(`「嗯…那、那个…请…再调教我吧………♪」`); // :4580
        await era.printAndWait(`${target_name}好像还很欲求不满的样子………`); // :4581
        kojo.放置PLAY = 5; // :4582
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4584
        await era.printAndWait(
          `「主人…你、你好坏啊～…${sc()}明明…这么想奉仕您…${heart(1)}」`,
        ); // :4585
        await era.printAndWait(
          `${target_name}露出发情般的表情看着${player_name}………`,
        ); // :4586
        kojo.放置PLAY = 4; // :4587
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4589
        await era.printAndWait(`「哈啊…哈啊…主人～…${heart(1)}」`); // :4590
        await era.printAndWait(`${target_name}露出苦闷的表情………`); // :4591
        kojo.放置PLAY = 3; // :4592
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        // :4594
        await era.printAndWait(`「休、休息一下是吗………？」`); // :4595
        await era.printAndWait(`${target_name}偷偷看着这边………`); // :4596
        kojo.放置PLAY = 2; // :4597
      }
      era.print(''); // :4599

      if (era.get(`tequip:${target}:11`)) {
        // :4601-4602
        await era.printAndWait(
          `壶虫在${target_name}的私处里蠢动着、毫不留情的搅动着阴道。`,
        ); // :4601-4602
      }

      if (era.get(`tequip:${target}:13`)) {
        // :4604-4605
        await era.printAndWait(
          `肛门虫在${target_name}的肛门里蠢动着、毫不留情的蹂躙着肛门。`,
        ); // :4604-4605
      }

      if (era.get(`tequip:${target}:19`)) {
        // :4607-4608
        await era.printAndWait(
          `${target_name}的肛门被塞入了肛珠、肛门一颤一颤的。`,
        ); // :4607-4608
      }

      if (era.get(`tequip:${target}:14`)) {
        // :4610-4611
        await era.printAndWait(
          `${target_name}的阴蒂被装上了电动阴蒂夹持续地被刺激着。`,
        ); // :4610-4611
      }

      if (era.get(`tequip:${target}:15`)) {
        // :4613-4614
        await era.printAndWait(
          `${target_name}的乳头被装上了乳头跳蛋持续地被刺激着。`,
        ); // :4613-4614
      }

      if (era.get(`tequip:${target}:16`)) {
        // :4616-4617
        era.print(`${target_name}的胸被装上了榨乳器被吸取着母乳。`); // :4616-4617
      }

      if (era.get(`tequip:${target}:17`)) {
        // :4619-4620
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯现在也像快射精似的颤动着。`,
        ); // :4619-4620
      }

      if (era.get(`tequip:${target}:43`)) {
        // :4622-4623
        await era.printAndWait(`${target_name}被戴着眼罩。`); // :4622-4623
      }

      if (era.get(`tequip:${target}:44`)) {
        // :4625-4626
        await era.printAndWait(`${target_name}的身体被身子绑住动弹不得。`); // :4625-4626
      }

      if (era.get(`tequip:${target}:46`)) {
        // :4628-4629
        await era.printAndWait(
          `${target_name}的肚子因为灌肠的原因发出了咕噜咕噜的声音、如果把塞子拔掉就会马上一泻千里的样子。`,
        ); // :4628-4629
      }

      if (era.get(`tequip:${target}:49`)) {
        // :4631-4632
        await era.printAndWait(
          `${target_name}的肛门插着电极、每当轻微的电流通过、括约肌就会颤动起来。`,
        ); // :4631-4632
      }

      if (era.get(`tequip:${target}:53`)) {
        // :4634-4635
        await era.printAndWait(
          `于是、${target_name}的模样就这样继续被录了下来………`,
        ); // :4634-4635
      }
      return 0;
    }
  }

  // :4645 IF SELECTCOM == 56（交谈，CFLAG:357）
  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      // :4647

      if (era.get(`tequip:${target}:53`)) {
        // :4649
        era.print(`${master_name}让${target_name}做个自我介绍。`); // :4650
        if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) === 1 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // :4651
          era.print(`于是${target_name}就将自己的本名、至今为止的性体验`); // :4652
          if ((era.get(`abl:${target}:31`) || 0) >= 3) {
            // :4653-4654
            era.print(`以及自慰时妄想的内容`); // :4653-4654
          }
          era.print(`开始愉快的说了起来……`); // :4655
          era.print(
            `单是想到这个水晶球会流传到故乡认识的人手里，${target_name}两腿之间就变的湿润起来了……`,
          ); // :4656
          game.kojo.录像内容 |= 2; // :4657
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          // :4658
          era.print(`于是${target_name}就对着水晶球开始说起了下流的话。`); // :4659
          game.kojo.录像内容 |= 2; // :4660
        } else if (
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          // :4661
          era.print(`于是${target_name}就对着水晶球做起了自我介绍。`); // :4662
          game.kojo.录像内容 |= 2; // :4663
        } else {
          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`); // :4664-4665
        }
      } else {
        if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) === 1 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4668-4669
          era.print(`${target_name}一边扭动着腰一边与${player_name}说着情话。`); // :4670
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4671
          era.print(
            `${target_name}一边扭动着腰一边与${player_name}说着下流的话。`,
          ); // :4672
        } else if (
          ((era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) === 1 ||
            era.get(`talent:${target}:76`) === 1) &&
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4]
        ) {
          // :4673
          era.print(`${target_name}一边竭力按捺住`); // :4674
          if (
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`)
          ) {
            // :4675
            era.print(`快乐的`); // :4676
          } else if (
            era.get(`tequip:${target}:44`) ||
            era.get(`tequip:${target}:49`)
          ) {
            // :4677
            era.print(`痛苦的`); // :4678
          } else {
            era.print(`自己的`); // :4679-4680
          }
          era.print(`声音，一边回应着${player_name}。`); // :4682
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :4684
          era.print(
            `${target_name}用比起会话更想做爱的态度与${player_name}说着话。`,
          ); // :4685
          await era.printAndWait(`「明明谈话什么的怎样都好………」`); // :4686
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          // :4687
          era.print(`${target_name}在很融洽的气氛中与${player_name}说着话。`); // :4688
          await era.printAndWait(`「从来没想过能在这种气氛下和你谈话呢………」`); // :4689
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          // :4690
          era.print(`面对${player_name}的搭话，怯生生的${target_name}回问道`); // :4691
          await era.printAndWait(`「您…是在和我说话吗…？」`); // :4692
        } else {
          era.print(
            `虽然${target_name}说了话，但${target_name}却好像没听到似的…`,
          ); // :4693-4694
        }
      }
      kojo.交谈 = 1; // :4697-4698
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        // :4700-4702
        era.print(`${master_name}让${target_name}作个自我介绍。`); // :4703
        if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) === 1 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4704
          era.print(`${target_name}一边扭动着腰一边对着水晶球说着情话。`); // :4705
          game.kojo.录像内容 |= 2; // :4706
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4707
          era.print(
            `${target_name}一边扭动着腰一边对着水晶球不停地说着下流的话。`,
          ); // :4708
          game.kojo.录像内容 |= 2; // :4709
        } else if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) === 1 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // :4710
          era.print(`于是${target_name}就将自己的本名、至今为止的性体验`); // :4711
          if ((era.get(`abl:${target}:31`) || 0) >= 3) {
            // :4712-4713
            era.print(`以及自慰时妄想的内容`); // :4712-4713
          }
          era.print(`开始愉快的说了起来……`); // :4714
          era.print(
            `单是想到这个水晶球会流传到故乡认识的人手里，${target_name}两腿之间就变的湿润起来了……`,
          ); // :4715
          game.kojo.录像内容 |= 2; // :4716
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          // :4717
          era.print(`于是${target_name}就对着水晶球开始说起了下流的话。`); // :4718
          game.kojo.录像内容 |= 2; // :4719
        } else if (
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          // :4720
          era.print(`于是${target_name}就对着水晶球作起了自我介绍。`); // :4721
          game.kojo.录像内容 |= 2; // :4722
        } else {
          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`); // :4723-4724
        }
      } else {
        if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) === 1 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4727-4728
          era.print(`${target_name}一边扭动着腰一边与${player_name}说着情话。`); // :4729
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4730
          era.print(
            `${target_name}一边扭动着腰一边与${player_name}说着下流的话。`,
          ); // :4731
        } else if (
          ((era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) === 1 ||
            era.get(`talent:${target}:76`) === 1) &&
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4]
        ) {
          // :4732
          era.print(`${target_name}一边竭力按捺住`); // :4733
          if (
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`)
          ) {
            // :4734
            era.print(`快乐的`); // :4735
          } else if (
            era.get(`tequip:${target}:44`) ||
            era.get(`tequip:${target}:49`)
          ) {
            // :4736
            era.print(`痛苦的`); // :4737
          } else {
            era.print(`自己的`); // :4738-4739
          }
          era.print(`声音，一边回应着${player_name}。`); // :4741
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :4743
          era.print(
            `${target_name}用比起会话更想做爱的态度与${player_name}说着话。`,
          ); // :4744
          await era.printAndWait(`「明明谈话什么的怎样都好………」`); // :4745
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          // :4746
          era.print(`${target_name}在很融洽的气氛中与${player_name}说着话。`); // :4747
          await era.printAndWait(`「从来没想过能在这种气氛下和你谈话呢………」`); // :4748
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          // :4749
          era.print(`面对${player_name}的搭话，怯生生的${target_name}回问道`); // :4750
          await era.printAndWait(`「您…是在和我说话吗…？」`); // :4751
        } else {
          era.print(
            `虽然${target_name}说了话，但${target_name}却好像没听到似的…`,
          ); // :4752-4753
        }
      }
      return 0;
    }
  }

  // :4763 IF SELECTCOM == 123（乳夹口交，CFLAG:360）
  if (era_flag.selectcom === 123) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.乳夹口交 === 0) {
      // :4765

      if (era.get(`talent:${target}:76`) === 1) {
        // :4767
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并把前端含进嘴里开始细致的舔舐起来。`,
        ); // :4768
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4769-4770
          await era.printAndWait(
            `「用${sc()}的淫乱大乳房来爽一下吧～…${heart(1)}」`,
          ); // :4769-4770
        }
        await era.printAndWait(
          `「好烫啊～…大肉棒～${heart(1)} 大肉棒～${heart(1)} 啊啊啊…嗯～嗯咕呜～嗯咻～咻噜呜～${heart(1)}」`,
        ); // :4771
        if (semen_addict >= 3) {
          // :4772-4773
          await era.printAndWait(
            `「请把粘稠的精液…全部奖赏给我吧～…${heart(1)}」`,
          ); // :4772-4773
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4775
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并温柔地亲吻着前端。`,
        ); // :4776
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4777-4778
          await era.printAndWait(
            `「啊～～…乳房这样敞露着…${heart(1)} 好美妙…${heart(1)}」`,
          ); // :4777-4778
        }
        await era.printAndWait(
          `「啾～啾～…${heart(1)} 请变的更爽吧～…嗯啾啾～…嘞咯～…${heart(1)}」`,
        ); // :4779
        if (semen_addict >= 3) {
          // :4780-4781
          await era.printAndWait(
            `「精液…请不用顾虑地射出来吧～${heart(1)} 我会全部舔干净的～${heart(1)}」`,
          ); // :4780-4781
        }
      } else if (serve >= 3) {
        // :4783
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并舔舐起了前端。`,
        ); // :4784
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4785-4786
          await era.printAndWait(`「啊啊～…大鸡鸡露出来了…啊～…啊啊～………」`); // :4785-4786
        }
        await era.printAndWait(
          `「嗯姆呜～…嗯～嗯～${heart(1)}…嗯哈啊…会让你…变的…更舒服的………」`,
        ); // :4787
        if (semen_addict >= 3) {
          // :4788-4789
          await era.printAndWait(
            `（啊啊…好想要精液…明明那么的…臭…心跳的好快呢…）`,
          ); // :4788-4789
        }
      } else {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并亲吻着前端。`,
        ); // :4791-4792
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4793-4794
          await era.printAndWait(`「啊啊～…乳房里的…大鸡鸡好烫啊………」`); // :4793-4794
        }
        await era.printAndWait(
          `「嗯啾噜～…嗯～…啊呼呜…啊啊…哈啊哈啊……这、这样可以吗…？」`,
        ); // :4795
      }
      kojo.乳夹口交 = 1; // :4797-4798
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4800-4802
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并把前端含进嘴里开始细致的舔舐起来。`,
        ); // :4803
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4804-4805
          await era.printAndWait(
            `「用${sc()}的淫乱大乳房来爽一下吧～…${heart(1)}」`,
          ); // :4804-4805
        }
        await era.printAndWait(
          `「好烫啊～…大肉棒～${heart(1)} 大肉棒～${heart(1)} 啊啊啊…嗯～嗯咕呜～嗯咻～咻噜呜～${heart(1)}」`,
        ); // :4806
        if (semen_addict >= 3) {
          // :4807-4808
          await era.printAndWait(
            `「请把粘稠的精液…全部奖赏给我吧～…${heart(1)}」`,
          ); // :4807-4808
        }
        kojo.乳夹口交 = 5; // :4809
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4811
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并温柔地亲吻着前端。`,
        ); // :4812
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4813-4814
          await era.printAndWait(
            `「啊～～…乳房这样敞露着…${heart(1)} 好美妙…${heart(1)}」`,
          ); // :4813-4814
        }
        await era.printAndWait(
          `「啾～啾～…${heart(1)} 请变的更爽吧～…嗯啾啾～…嘞咯～…${heart(1)}」`,
        ); // :4815
        if (semen_addict >= 3) {
          // :4816-4817
          await era.printAndWait(
            `「精液…请不用顾虑地射出来吧～${heart(1)} 我会全部舔干净的${heart(1)}」`,
          ); // :4816-4817
        }
        kojo.乳夹口交 = 4; // :4818
      } else if (
        serve >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4820
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并舔舐起了前端。`,
        ); // :4821
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4822-4823
          await era.printAndWait(`「啊啊～…大鸡鸡露出来了…啊～…啊啊～………」`); // :4822-4823
        }
        await era.printAndWait(
          `「嗯姆呜～…嗯～嗯～${heart(1)}…嗯哈啊…会让你…变的…更舒服的………」`,
        ); // :4824
        if (semen_addict >= 3) {
          // :4825-4826
          await era.printAndWait(
            `（啊啊…好想要精液…明明那么的…臭…心跳的好快呢…）`,
          ); // :4825-4826
        }
        kojo.乳夹口交 = 3; // :4827
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4829
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并亲吻着前端。`,
        ); // :4830
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4831-4832
          await era.printAndWait(`「啊啊～…乳房里的…大鸡鸡好烫啊………」`); // :4831-4832
        }
        await era.printAndWait(
          `「嗯啾噜～…嗯～…啊呼呜…啊啊…哈啊哈啊……这、这样可以吗…？」`,
        ); // :4833
        kojo.乳夹口交 = 2; // :4834
      }
      return 0;
    }
  }

  // :4842 IF SELECTCOM == 125（口交时自慰，CFLAG:361）
  if (era_flag.selectcom === 125) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.口交时自慰 === 0) {
      // :4844

      if (era.get(`talent:${target}:76`) === 1) {
        // :4846
        await era.printAndWait(
          `${target_name}用一只手伸向自己的阴部、同时嘟起嘴含住了阴茎开始自慰起来。`,
        ); // :4847
        await era.printAndWait(
          `「嗯咕～…嘞噗～…嘞咯～…嗯咕～嗯咕～…嗯唔～嗯呼呜呜呜呜${heart(1)}」」`,
        ); // :4848
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4850
        await era.printAndWait(
          `${target_name}遵照命令将一只手伸向自己的阴部、一边自慰一边亲吻着阴茎。`,
        ); // :4851
        await era.printAndWait(
          `「哈啊…虽然一边含着大鸡鸡一边自慰什么的…很不像话…但实在是忍不住嘛…${heart(1)}」`,
        ); // :4852
      } else if (serve >= 3) {
        // :4854
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        ); // :4855
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        ); // :4856
      } else {
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        ); // :4858-4859
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        ); // :4860
      }
      kojo.口交时自慰 = 1; // :4862-4863
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4865-4867
        await era.printAndWait(
          `${target_name}用一只手伸向自己的阴部、同时嘟起嘴含住了阴茎开始自慰起来。`,
        ); // :4868
        await era.printAndWait(
          `「嗯咕～…嘞噗～…嘞咯～…嗯咕～嗯咕～…嗯唔～嗯呼呜呜呜呜${heart(1)}」」`,
        ); // :4869
        await era.printAndWait(
          `${target_name}开心的一边流着口水、一边啧啧有声地玩弄着私处………`,
        ); // :4870
        if (semen_addict >= 3) {
          // :4871-4872
          await era.printAndWait(
            `（啊啊…变的好舒服啊…喝着精液什么的太棒了～…${heart(1)}）`,
          ); // :4871-4872
        }
        kojo.口交时自慰 = 5; // :4873
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4875
        await era.printAndWait(
          `${target_name}遵照命令将一只手伸向自己的阴部、一边自慰一边亲吻着阴茎。`,
        ); // :4876
        await era.printAndWait(
          `「哈啊…虽然一边含着大鸡鸡一边自慰什么的…很不像话…但实在是忍不住嘛…${heart(1)}」`,
        ); // :4877
        await era.printAndWait(
          `「啊咕～…嗯啾…咻噜呜～…嘞噗～…嗯咕～…嗯～嗯嗯嗯～嗯呼呜${heart(1)}」`,
        ); // :4878
        if (semen_addict >= 3) {
          // :4879-4880
          await era.printAndWait(
            `（再这样…嘴里灌入精液的话…光是这样就要高潮了～………${heart(1)}）`,
          ); // :4879-4880
        }
        kojo.口交时自慰 = 4; // :4881
      } else if (
        serve >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4883
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        ); // :4884
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        ); // :4885
        if (semen_addict >= 3) {
          // :4886-4887
          await era.printAndWait(
            `（精液…好想要啊…就算是被这样对待…也还是好想要………）`,
          ); // :4886-4887
        }
        kojo.口交时自慰 = 3; // :4888
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        // :4890
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        ); // :4891
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        ); // :4892
        kojo.口交时自慰 = 2; // :4893
      }
      return 0;
    }
  }

  // :4902 IF SELECTCOM == 126（手搓口交，CFLAG:362）
  if (era_flag.selectcom === 126) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.手搓口交 === 0) {
      // :4904

      if (era.get(`talent:${target}:76`) === 1) {
        // :4906
        await era.printAndWait(
          `${target_name}淫笑着用手握住阴茎、细致温柔地撸着并用嘴含住了龟头。`,
        ); // :4907
        await era.printAndWait(
          `「我会很卖力的撸啦～…请将你的心意赏到${sc()}的嘴里吧…${heart(1)}」`,
        ); // :4908
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4910
        await era.printAndWait(
          `${target_name}脉脉含情的看着你、用嘴含住了龟头开始撸起了阴茎。`,
        ); // :4911
        await era.printAndWait(
          `「啊啊啊…能为你做奉仕真开心…嗯唔～…啾～嘞噗～…嗯咕～…嗯呼呜…啊啊～${heart(1)}」`,
        ); // :4912
      } else if (serve >= 3) {
        // :4914
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、开始撸起了阴茎。`,
        ); // :4915
        await era.printAndWait(
          `「嗯～…哈啊…啊啊～…嘴巴和手好像被火烫到了似的…嗯～嗯呜唔～♪」`,
        ); // :4916
      } else {
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、不情愿的撸起了阴茎。`,
        ); // :4918-4919
        await era.printAndWait(
          `「哈啊哈啊…啊姆～…啾～啾～…呗咯～…啊啊啊…这样的………」`,
        ); // :4920
      }
      kojo.手搓口交 = 1; // :4922-4923
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4925-4927
        await era.printAndWait(
          `${target_name}淫笑着用手握住阴茎、细致温柔地撸着并用嘴含住了龟头。`,
        ); // :4928
        await era.printAndWait(
          `「我会很卖力的撸啦～…请将你的心意赏到${sc()}的嘴里吧…${heart(1)}」`,
        ); // :4929
        await era.printAndWait(
          `「嗯咻～…咻噜～…啾～啾唔呜唔${heart(1)} 一撸起来…嘴里的大肉棒就一颤一颤的、好可爱～${heart(1)}」`,
        ); // :4930
        if (semen_addict >= 3) {
          // :4931-4932
          await era.printAndWait(
            `「就这样…用浓厚的精液款待我吧～…嗯～啾～啾～～${heart(1)}」`,
          ); // :4931-4932
        }
        kojo.手搓口交 = 5; // :4933
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4935
        await era.printAndWait(
          `${target_name}脉脉含情的看着你、用嘴含住了龟头开始撸起了阴茎。`,
        ); // :4936
        await era.printAndWait(
          `「啊啊啊…能为你做奉仕真开心…嗯唔～…啾～嘞噗～…嗯咕～…嗯呼呜…啊啊～${heart(1)}」`,
        ); // :4937
        await era.printAndWait(
          `「射出来…请全部射出来吧…那样${sc()}会很高兴的${heart(1)}」`,
        ); // :4938
        if (semen_addict >= 3) {
          // :4939-4940
          await era.printAndWait(
            `「要是射在嘴里的话…说不定一开心就高潮了呢～…额呵呵～${heart(1)}」`,
          ); // :4939-4940
        }
        kojo.手搓口交 = 4; // :4941
      } else if (
        serve >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4943
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、开始撸起了阴茎。`,
        ); // :4944
        await era.printAndWait(
          `「嗯～…哈啊…啊啊～…嘴巴和手好像被火烫到了似的…嗯～嗯呜唔～♪」`,
        ); // :4945
        if (semen_addict >= 3) {
          // :4946-4947
          await era.printAndWait(`「啊啊…精液…是精液的臭味呢………」`); // :4946-4947
        }
        kojo.手搓口交 = 3; // :4948
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4950
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、不情愿的撸起了阴茎。`,
        ); // :4951
        await era.printAndWait(
          `「哈啊哈啊…啊姆～…啾～啾～…呗咯～…啊啊啊…这样的………」`,
        ); // :4952
        kojo.手搓口交 = 2; // :4953
      }
      return 0;
    }
  }

  // :4963 IF SELECTCOM == 127（真空口交，CFLAG:363）
  if (era_flag.selectcom === 127) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.真空口交 === 0) {
      // :4965

      if (era.get(`talent:${target}:76`) === 1) {
        // :4967
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。`,
        ); // :4968
        await era.printAndWait(
          `「嗯咕呜～…嗯噗～…咻噜呜～咻噗～…咻～咻噜～呜呜呜呜${heart(1)}」」`,
        ); // :4969
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4971
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、嗞嗞作响地吮吸起来。`,
        ); // :4972
        await era.printAndWait(
          `「咻噜呜～…啾～啾呜呜～${heart(1)} 啊啊啊…大鸡鸡…真好嗤…啾呜～嘞噗～…噗啾呜呜～${heart(1)}」`,
        ); // :4973
      } else if (serve >= 3) {
        // :4975
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        ); // :4976
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        ); // :4977
      } else {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        ); // :4979-4980
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        ); // :4981
      }
      kojo.真空口交 = 1; // :4983-4984
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4986-4988
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。`,
        ); // :4989
        await era.printAndWait(
          `「嗯咕呜～…嗯噗～…咻噜呜～咻噗～…咻～咻噜～呜呜呜呜${heart(1)}」」`,
        ); // :4990
        await era.printAndWait(
          `「全部…这大肉棒全部都是${sc()}的～${heart(1)} 把精液满满的灌进喉咙里吧～…${heart(1)}」`,
        ); // :4991
        if (semen_addict >= 3) {
          // :4992-4993
          await era.printAndWait(
            `「要是把精液给我的话…一定会把你伺候的更加更加的舒服哦～…${heart(1)}」`,
          ); // :4992-4993
        }
        kojo.真空口交 = 5; // :4994
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4996
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、嗞嗞作响地吮吸起来。`,
        ); // :4997
        await era.printAndWait(
          `「哈姆呜～${heart(1)} 嗯咕～${heart(1)}嗯咻呜${heart(1)}…啾啪啊…嗯咕呜呜呜～咻噗～啾呜唔呗咯～${heart(1)}」`,
        ); // :4998
        await era.printAndWait(
          `「大鸡鸡…全部都是${sc()}的～…哈姆呜～${heart(1)} 嗯啾～啾～啾呜呜呜${heart(1)}」`,
        ); // :4999
        if (semen_addict >= 3) {
          // :5000-5001
          await era.printAndWait(
            `「精液…也是${sc()}的～…都归我一个人独占了～…${heart(1)}」`,
          ); // :5000-5001
        }
        kojo.真空口交 = 4; // :5002
      } else if (
        serve >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5004
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        ); // :5005
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        ); // :5006
        if (semen_addict >= 3) {
          // :5007-5008
          await era.printAndWait(
            `「咻噜…噗～…嗯噗～…嗯呼呜呜～（要是精液就这样…射出来的话…就要变的奇怪了…要变的奇怪了唔呜呜…）」`,
          ); // :5007-5008
        }
        kojo.真空口交 = 3; // :5009
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5011
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        ); // :5012
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        ); // :5013
        kojo.真空口交 = 2; // :5014
      }
      return 0;
    }
  }

  // :5023 IF SELECTCOM == 69（六九式，CFLAG:364）
  if (era_flag.selectcom === 69) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.六九式 === 0) {
      // :5025

      if (era.get(`talent:${target}:76`) === 1) {
        // :5027
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}每当私处被刺激就会更用力地将阴茎含在嘴里。`,
        ); // :5028
        await era.printAndWait(
          `「嗯呜唔～${heart(1)} …继续欺负我～…我也会继续舔肉棒的～…${heart(1)}」`,
        ); // :5029
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5031
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}一边承受着私处传来的快乐一边舔舐着阴茎。`,
        ); // :5032
        await era.printAndWait(
          `「啊啊～…那里一被欺负…啊～啊啊～${heart(1)} 就没法好好奉仕大鸡鸡了～～${heart(1)}」`,
        ); // :5033
      } else if (serve >= 3) {
        // :5035
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}因为私处传来的刺激而娇喘着。`,
        ); // :5036
        await era.printAndWait(
          `「嗯咕～…嗯～…哈啊啊…被这样逗弄的话…奉仕就…${heart(1)}」`,
        ); // :5037
      } else {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}由于私处传来的刺激摇起了屁股忍耐着。`,
        ); // :5039-5040
        await era.printAndWait(`「啊啊～…不行～…这样不行～…啊～～！」`); // :5041
      }
      kojo.六九式 = 1; // :5043-5044
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5046-5048
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}每当私处被刺激就会更用力地将阴茎含在嘴里。`,
        ); // :5049
        await era.printAndWait(
          `「嗯呜唔～${heart(1)} …继续欺负我～…我也会继续舔肉棒的～…${heart(1)}」`,
        ); // :5050
        if (semen_addict >= 3) {
          // :5051-5052
          await era.printAndWait(
            `「啊啊～～…所以请用满满的精液来款待我吧～${heart(1)}」`,
          ); // :5051-5052
        }
        kojo.六九式 = 5; // :5053
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5055
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}一边承受着私处传来的快乐一边舔舐着阴茎。`,
        ); // :5056
        await era.printAndWait(
          `「啊啊～…那里一被欺负…啊～啊啊～${heart(1)} 就没法好好奉仕大肉棒了～～${heart(1)}」`,
        ); // :5057
        if (semen_addict >= 3) {
          // :5058-5059
          await era.printAndWait(
            `（再不努力一点…就喝不到精液了呜呜～${heart(1)}）`,
          ); // :5058-5059
        }
        kojo.六九式 = 4; // :5060
      } else if (serve >= 3 && (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)) {
        // :5062
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}因为私处传来的刺激而娇喘着。`,
        ); // :5063
        await era.printAndWait(
          `「嗯咕～…嗯～…哈啊啊…被这样逗弄的话…奉仕就…${heart(1)}」`,
        ); // :5064
        if (semen_addict >= 3) {
          // :5065-5066
          await era.printAndWait(`（但是…不努力的话…就…喝不到精液了呢………）`); // :5065-5066
        }
        kojo.六九式 = 3; // :5067
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        // :5069
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}由于私处传来的刺激摇起了屁股忍耐着。`,
        ); // :5070
        await era.printAndWait(`「啊啊～…不行～…这样不行～…啊～～！」`); // :5071
        kojo.六九式 = 2; // :5072
      }
      return 0;
    }
  }

  // :5081 IF SELECTCOM == 124（深喉，CFLAG:365）
  if (era_flag.selectcom === 124) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.深喉 === 0) {
      // :5083

      if (era.get(`talent:${target}:76`) === 1) {
        // :5085
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。`,
        ); // :5086
        await era.printAndWait(
          `「嗯噗呜唔…嗯咻噜～咻噜…咻噜噗呜～${heart(1)} 咻噜～咻～咻噗呜${heart(1)}…嗯咕～嗯呼呜${heart(1)}」`,
        ); // :5087
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5089
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、一边吸一边发出了下流的声音。`,
        ); // :5090
        await era.printAndWait(
          `「咻噗～咻噜～…嗯～嗯～…咻噜～呜～${heart(1)} 嘞噗～…嗯咕～${heart(1)} 嗯嗯嗯～${heart(1)}」`,
        ); // :5091
      } else if (serve >= 3) {
        // :5093
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        ); // :5094
        await era.printAndWait(
          `「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？…嗯唔～…嗯姆呜…嘞咯～噢…嗯～嗯～…♪」`,
        ); // :5095
      } else {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        ); // :5097-5098
        await era.printAndWait(`「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？」`); // :5099
      }
      kojo.深喉 = 1; // :5101-5102
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5104-5106
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。`,
        ); // :5107
        await era.printAndWait(
          `「嗯噗呜唔…嗯咻噜～咻噜…咻噜噗呜～${heart(1)} 咻噜～咻～咻噗呜${heart(1)}…嗯咕～嗯呼呜${heart(1)}」`,
        ); // :5108
        await era.printAndWait(
          `（喉咙里面…被肉棒塞得满满的…好开心…${heart(1)}）`,
        ); // :5109
        if (semen_addict >= 3) {
          // :5110-5111
          await era.printAndWait(
            `（就这样…在喉小穴的里面…把精液射出来吧～…${heart(1)}）`,
          ); // :5110-5111
        }
        kojo.深喉 = 5; // :5112
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5114
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、一边吸一边发出了下流的声音。`,
        ); // :5115
        await era.printAndWait(
          `「咻噗～咻噜～…嗯～嗯～…咻噜～呜～${heart(1)} 嘞噗～…嗯咕～${heart(1)} 嗯嗯嗯～${heart(1)}」`,
        ); // :5116
        await era.printAndWait(
          `（啊啊～…连喉咙里面都被大鸡鸡侵犯了…好激动啊………${heart(1)}）`,
        ); // :5117
        if (semen_addict >= 3) {
          // :5118-5119
          await era.printAndWait(
            `（啊啊～…请在喉咙里面把精液射出来吧…光是这样${sc()}就…啊啊～${heart(1)}）`,
          ); // :5118-5119
        }
        kojo.深喉 = 4; // :5120
      } else if (
        serve >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5122
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        ); // :5123
        await era.printAndWait(
          `「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？…嗯唔～…嗯姆呜…嘞咯～噢…嗯～嗯～…♪」`,
        ); // :5124
        await era.printAndWait(
          `（喉咙的里面也被插了～…嗯咕～…明明…很难受…${heart(1)}）`,
        ); // :5125
        if (semen_addict >= 3) {
          // :5126-5127
          await era.printAndWait(
            `（要是精液就这样射出来的话肯定会窒息…呜呜…爽到断气了～………）`,
          ); // :5126-5127
        }
        kojo.深喉 = 3; // :5128
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5130
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        ); // :5131
        await era.printAndWait(`「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？」`); // :5132
        kojo.深喉 = 2; // :5133
      }
      return 0;
    }
  }

  // :5143 IF SELECTCOM == 80（强制口交，CFLAG:381）
  if (era_flag.selectcom === 80) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.强制口交 === 0) {
      // :5145

      if (era.get(`talent:${target}:76`) === 1) {
        // :5147
        await era.printAndWait(
          `「嗯噗呜呜～嗯咕～！？嗯～嗯呼呜呜～…嗯呼呜呜呜呜${heart(1)}」`,
        ); // :5148
        await era.printAndWait(
          `${target_name}一边翻着白眼一边被鸡鸡插进了喉咙深处………`,
        ); // :5149
      } else if (serve >= 3) {
        // :5151
        await era.printAndWait(
          `「嗯呼呜～…嗯啾～…啾噗啊…嗯咕！？嗯呜唔～…嗯～…嗯～…嗯～♪」`,
        ); // :5152
        await era.printAndWait(`${target_name}就这样被侵犯着口腔………`); // :5153
      } else {
        await era.printAndWait(
          `「嗯嗯嗯～～！？咕呼～…嗯咕呜呜～！？嗯～～嗯噗呜～…嗯咕～嗯咕～嗯咕呜呜呜呜！」`,
        ); // :5155-5156
        await era.printAndWait(
          `${target_name}被鸡鸡插进喉咙深处好像很痛苦的样子………`,
        ); // :5157
      }
      kojo.强制口交 = 1; // :5159-5160
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5162-5164
        await era.printAndWait(
          `「嗯呜唔～…嗯～嗯噗…嗯咕～…嗯～嗯呼呜呜${heart(1)}」`,
        ); // :5165
        await era.printAndWait(
          `「可以哦…${sc()}的嘴巴就是为了含住大肉棒而存在的…请随意使用吧～…${heart(1)}」`,
        ); // :5166
        await era.printAndWait(
          `「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}」`,
        ); // :5167
        if (semen_addict >= 3) {
          // :5168-5169
          await era.printAndWait(
            `（啊啊啊…就这样…让我变成精液便所吧…${heart(1)}）`,
          ); // :5168-5169
        }
        kojo.强制口交 = 5; // :5170
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5172
        await era.printAndWait(
          `「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}」`,
        ); // :5173
        await era.printAndWait(
          `「哈啊啊啊…让我…让我更多地奉仕你吧…嗯～！？嗯呼呜呜…嗯～嗯～嗯～♪」`,
        ); // :5174
        if (semen_addict >= 3) {
          // :5175-5176
          await era.printAndWait(
            `（就这样在喉咙里面被射精了的话…${sc()}…就要变的不行了…脑子都要被精液侵犯了～…${heart(1)}）`,
          ); // :5175-5176
        }
        kojo.强制口交 = 4; // :5177
      } else if (
        serve >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5179
        await era.printAndWait(
          `「嗯咕呼呜…嗯噗～…嗯～嗯呜唔…嗯呜唔～…咳咳～咳咳～…」`,
        ); // :5180
        await era.printAndWait(
          `「哈啊…哈啊…对不起…下次会好好地…嗯呼呜呜呜！？」`,
        ); // :5181
        if (semen_addict >= 3) {
          // :5182-5183
          await era.printAndWait(
            `（啊啊啊～…就这样被射精了的话…啊啊～要溢出来了………）`,
          ); // :5182-5183
        }
        kojo.强制口交 = 3; // :5184
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5186
        await era.printAndWait(
          `「嗯咕～…嗯～嗯噗…嗯噗…噗哈…咳咳～咳咳咳咳～…拜托…不要再继续了…嗯嗯～！」`,
        ); // :5187
        kojo.强制口交 = 2; // :5188
      }
      return 0;
    }
  }

  // :5199 IF SELECTCOM == 87（穿环，CFLAG:348；部位位域 piercing_state.p）
  if (era_flag.selectcom === 87) {
    const assi = era_flag.assi;
    const assiplay = era_flag.assiplay;
    const p = piercing_state.p;
    const train = chara(target).train;

    if (kojo.穿环 === 0) {
      // :5202
      if (assi > 0 && assiplay) {
        // :5204
        era.print(''); // :5205
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :5207
        if (train.穿环位图 & p) {
          // :5209
          await era.printAndWait(
            `${target_name}因为肌肤头一次被开洞而痛得禁不住悲鸣起来。`,
          ); // :5210
          if (p === 1) {
            // :5212
            await era.printAndWait(
              `「啊啊～！…哈啊…哈啊…这样一来乳头就可以拉伸了…请好好疼爱………${heart(1)}」`,
            ); // :5213
            await era.printAndWait(
              `${target_name}像为了展示因为痛苦而勃起的乳头和环似的挺起了胸部………`,
            ); // :5214
          } else if (p === 2) {
            // :5216
            await era.printAndWait(
              `「嗯～…额呵呵、不只是肚脐…我还想要更多的环${heart(1)}」`,
            ); // :5217
            await era.printAndWait(`${target_name}这样说着用舌头舔了舔嘴唇………`); // :5218
          } else if (p === 4) {
            // :5220
            await era.printAndWait(
              `「啊啊～…好、好厉害…只是被风一吹…就感觉一颤一颤的…${heart(1)}」`,
            ); // :5221
            await era.printAndWait(
              `${target_name}在阴唇上被穿了环、因为这一刺激而战栗着身体………`,
            ); // :5222
          } else if (p === 8) {
            // :5224
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5225
              await era.printAndWait(
                `「啊啊啊～…被这样弄的话会兴奋过头的、会一直勃起的…${heart(1)}」`,
              ); // :5226
              await era.printAndWait(
                `${target_name}在阴茎上被穿了环、阴茎持续地勃起着………`,
              ); // :5227
            } else {
              await era.printAndWait(
                `「如何…这淫乱的环…这可是和淫乱的小穴相称的环哦…${heart(1)}」`,
              ); // :5228-5229
              await era.printAndWait(
                `${target_name}像为了展示${clitoris_word(target)}上的环似的左右摇晃着腰身………`,
              ); // :5230
            }
          } else if (p === 16) {
            // :5233
            await era.printAndWait(
              `「嘻嘻…真想就这样舔舔大肉棒试试呢…嘞咯～${heart(1)}」`,
            ); // :5234
            await era.printAndWait(
              `${target_name}像为了展示舌尖上的环似的下流的舔了舔嘴唇………`,
            ); // :5235
          } else if (p === 32) {
            // :5237
            await era.printAndWait(`「额呵呵～…很时尚吧？」`); // :5238
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            ); // :5239
          } else if (p === 64) {
            // :5241
            await era.printAndWait(
              `「啊啊…${sc()}是为主人而生的、淫乱的母猪哦${heart(1)}」`,
            ); // :5242
            await era.printAndWait(`${target_name}不停地翕动着鼻环………`); // :5243
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取掉环后留下的伤痕………`); // :5246-5247
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5250
        if (train.穿环位图 & p) {
          // :5252
          await era.printAndWait(
            `${target_name}因为肌肤头一次被开洞而痛得小声地悲鸣起来………`,
          ); // :5253
          if (p === 1) {
            // :5255
            await era.printAndWait(
              `「啊啊…已经再也不会在主人面前一丝不挂了…啊啊～${heart(1)}」`,
            ); // :5256
            await era.printAndWait(
              `${target_name}装在勃起的双乳头上的环在闪闪发光………`,
            ); // :5257
          } else if (p === 2) {
            // :5259
            await era.printAndWait(`「这就是所谓的时尚吧…嗯～…」`); // :5260
            await era.printAndWait(`${target_name}抚摸着被穿环的肚脐的周边………`); // :5261
          } else if (p === 4) {
            // :5263
            await era.printAndWait(
              `「啊啊啊～！请…请不要这样拉扯啊…咿～～！」`,
            ); // :5264
            await era.printAndWait(
              `${target_name}因为被拉扯穿环而扩张开的阴唇而悲鸣起来………`,
            ); // :5265
          } else if (p === 8) {
            // :5267
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5268
              await era.printAndWait(
                `「${sc()}的鸡鸡…变的…这么漂亮了呢…${heart(1)}」`,
              ); // :5269
              await era.printAndWait(
                `${target_name}的鸡鸡因为被穿环的痛楚与兴奋而挺立起来………`,
              ); // :5270
            } else {
              await era.printAndWait(
                `「啊啊…这种地方被穿了环的话…${sc()}…就没办法不去想主人的事情了…${heart(1)}」`,
              ); // :5271-5272
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环而兴奋不已的样子………`,
              ); // :5273
            }
          } else if (p === 16) {
            // :5276
            await era.printAndWait(
              `「呐…亲我～…有点担心能不能和主人好好接吻呢…${heart(1)}」`,
            ); // :5277
            await era.printAndWait(
              `${target_name}咂着被穿环的舌头蠢蠢欲动的诱惑着……`,
            ); // :5278
          } else if (p === 32) {
            // :5280
            await era.printAndWait(`「呐…请亲亲我的嘴唇吧…${heart(1)}」`); // :5281
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            ); // :5282
          } else if (p === 64) {
            // :5284
            await era.printAndWait(
              `「啊啊…${sc()}是主人的母猪～…${heart(1)}」`,
            ); // :5285
            await era.printAndWait(
              `${target_name}因为被穿了鼻环而兴奋地喘着粗气………`,
            ); // :5286
          }
        } else {
          await era.printAndWait(
            `${target_name}好像有点寂寞的抚摸着取掉环后的伤痕………`,
          ); // :5289-5290
        }
      } else {
        if (train.穿环位图 & p) {
          // :5293-5295
          await era.printAndWait(
            `${target_name}因为肌肤头一次被开洞而痛得悲鸣起来、流下了眼泪。`,
          ); // :5296
          if (p === 1) {
            // :5298
            await era.printAndWait(
              `「竟然…${sc()}竟然被这样的侮辱了…呜呜～………」`,
            ); // :5299
            await era.printAndWait(
              `${target_name}因为乳头被穿环的痛楚而流下了屈辱的眼泪………`,
            ); // :5300
          } else if (p === 2) {
            // :5302
            await era.printAndWait(`「呜呜～…痛、好痛………」`); // :5303
            await era.printAndWait(
              `${target_name}因为肚脐被穿环的痛楚而泪流满面………`,
            ); // :5304
          } else if (p === 4) {
            // :5306
            await era.printAndWait(
              `「啊啊～…取下来…快取下来…已经…受不了了………」`,
            ); // :5307
            await era.printAndWait(
              `${target_name}因为阴唇被穿环的痛苦而流下了屈辱的眼泪………`,
            ); // :5308
          } else if (p === 8) {
            // :5310
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5311
              await era.printAndWait(
                `「请、请不要再做这种事情了…啊啊～…为什么…要做这种亵渎的事…呜！」`,
              ); // :5312
              await era.printAndWait(
                `${target_name}因为鸡鸡被穿环的痛楚不停地流着眼泪………`,
              ); // :5313
            } else {
              await era.printAndWait(
                `「啊啊～…请把环取下来吧…好痛…要疯了…呜！」`,
              ); // :5314-5315
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环的痛楚不停地流着眼泪………`,
              ); // :5316
            }
          } else if (p === 16) {
            // :5319
            await era.printAndWait(`「讨厌…舌环…请取下来吧………」`); // :5320
            await era.printAndWait(
              `${target_name}的舌尖被穿了环、痛的流下泪来………`,
            ); // :5321
          } else if (p === 32) {
            // :5323
            await era.printAndWait(`「够了…请饶了我吧………」`); // :5324
            await era.printAndWait(
              `${target_name}的唇被穿了环、流下了屈辱的泪水………`,
            ); // :5325
          } else if (p === 64) {
            // :5327
            await era.printAndWait(`「${sc()}才不是…你说的什么母猪…呜呜呜～」`); // :5328
            await era.printAndWait(
              `${target_name}不想被看到鼻环似的毫不犹豫的背过脸去流下了眼泪………`,
            ); // :5329
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着取下环后的伤痕………`); // :5332-5333
        }
      }
      kojo.穿环 = 1; // :5336-5337
      return 0;
    } else {
      if (assi > 0 && assiplay) {
        // :5339-5341
        era.print(''); // :5342
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5344
        if (train.穿环位图 & p) {
          // :5346
          if (p === 1) {
            // :5348
            await era.printAndWait(
              `「啊啊～！…哈啊…哈啊…这样一来乳头就可以拉伸了…请好好疼爱………${heart(1)}」`,
            ); // :5349
            await era.printAndWait(
              `${target_name}像为了展示因为痛苦而勃起的乳头和环似的挺起了胸部………`,
            ); // :5350
          } else if (p === 2) {
            // :5352
            await era.printAndWait(
              `「嗯～…额呵呵、不只是肚脐…我还想要更多的环${heart(1)}」`,
            ); // :5353
            await era.printAndWait(`${target_name}这样说着用舌头舔了舔嘴唇………`); // :5354
          } else if (p === 4) {
            // :5356
            await era.printAndWait(
              `「啊啊～…好、好厉害…只是被风一吹…就感觉一颤一颤的…${heart(1)}」`,
            ); // :5357
            await era.printAndWait(
              `${target_name}在阴唇上被穿了环、因为这一刺激而战栗着身体………`,
            ); // :5358
          } else if (p === 8) {
            // :5360
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5361
              await era.printAndWait(
                `「啊啊啊～…被这样弄的话会兴奋过头的、会一直勃起的…${heart(1)}」`,
              ); // :5362
              await era.printAndWait(
                `${target_name}在阴茎上被穿了环、阴茎持续地勃起着………`,
              ); // :5363
            } else {
              await era.printAndWait(
                `「如何…这淫乱的环…这可是和淫乱的小穴相称的环哦…${heart(1)}」`,
              ); // :5364-5365
              await era.printAndWait(
                `${target_name}像为了展示${clitoris_word(target)}上的环似的左右摇晃着腰身………`,
              ); // :5366
            }
          } else if (p === 16) {
            // :5369
            await era.printAndWait(
              `「嘻嘻…真想就这样舔舔大肉棒试试呢…嘞咯～${heart(1)}」`,
            ); // :5370
            await era.printAndWait(
              `${target_name}像为了展示舌尖上的环似的下流的舔了舔嘴唇………`,
            ); // :5371
          } else if (p === 32) {
            // :5373
            await era.printAndWait(`「额呵呵～…很时尚吧？」`); // :5374
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            ); // :5375
          } else if (p === 64) {
            // :5377
            await era.printAndWait(
              `「啊啊…${sc()}是为主人而生的、淫乱的母猪哦${heart(1)}」`,
            ); // :5378
            await era.printAndWait(`${target_name}不停地翕动着鼻环………`); // :5379
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取掉环后留下的伤痕………`); // :5382-5383
        }
        kojo.穿环 = 4; // :5385
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5387
        if (train.穿环位图 & p) {
          // :5389
          if (p === 1) {
            // :5391
            await era.printAndWait(
              `「啊啊…已经再也不会在主人面前一丝不挂了…啊啊～${heart(1)}」`,
            ); // :5392
            await era.printAndWait(
              `${target_name}装在勃起的双乳上的环在闪闪发光………`,
            ); // :5393
          } else if (p === 2) {
            // :5395
            await era.printAndWait(`「额呵呵、好像很时尚呢…♪」`); // :5396
            await era.printAndWait(`${target_name}抚摸着被穿环的肚脐的周边………`); // :5397
          } else if (p === 4) {
            // :5399
            await era.printAndWait(
              `「啊啊啊～！请…请不要这样拉扯啊…咿～～！」`,
            ); // :5400
            await era.printAndWait(
              `${target_name}因为被拉扯穿环而扩张开的阴唇而悲鸣起来………`,
            ); // :5401
          } else if (p === 8) {
            // :5403
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5404
              await era.printAndWait(
                `「${sc()}的鸡鸡…变的…这么漂亮了呢…${heart(1)}」`,
              ); // :5405
              await era.printAndWait(
                `${target_name}的鸡鸡因为被穿环的痛楚与兴奋而挺立起来………`,
              ); // :5406
            } else {
              await era.printAndWait(
                `「啊啊…这种地方被穿了环的话…${sc()}…就没办法不去想主人的事情了…${heart(1)}」`,
              ); // :5407-5408
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环而兴奋不已的样子………`,
              ); // :5409
            }
          } else if (p === 16) {
            // :5412
            await era.printAndWait(
              `「呐…亲我～…有点担心能不能和主人好好接吻呢…${heart(1)}」`,
            ); // :5413
            await era.printAndWait(
              `${target_name}咂着被穿环的舌头蠢蠢欲动的诱惑着……`,
            ); // :5414
          } else if (p === 32) {
            // :5416
            await era.printAndWait(`「呐…请亲亲我的嘴唇吧…${heart(1)}」`); // :5417
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            ); // :5418
          } else if (p === 64) {
            // :5420
            await era.printAndWait(
              `「啊啊…${sc()}是主人的母猪～…${heart(1)}」`,
            ); // :5421
            await era.printAndWait(
              `${target_name}因为被穿了鼻环而兴奋地喘着粗气………`,
            ); // :5422
          }
        } else {
          await era.printAndWait(
            `${target_name}好像有点寂寞的抚摸着取掉环后的痕迹………`,
          ); // :5425-5426
        }
        kojo.穿环 = 3; // :5428
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        // :5430
        if (train.穿环位图 & p) {
          // :5432
          if (p === 1) {
            // :5434
            await era.printAndWait(
              `「竟然…${sc()}竟然被这样的侮辱了…呜呜～………」`,
            ); // :5435
            await era.printAndWait(
              `${target_name}因为乳头被穿环的痛楚而屈辱地流下了眼泪………`,
            ); // :5436
          } else if (p === 2) {
            // :5438
            await era.printAndWait(`「呜呜～…痛、好痛………」`); // :5439
            await era.printAndWait(
              `${target_name}因为肚脐被穿环的痛楚而泪流满面………`,
            ); // :5440
          } else if (p === 4) {
            // :5442
            await era.printAndWait(
              `「啊啊～…取下来…快取下来…已经…受不了了………」`,
            ); // :5443
            await era.printAndWait(
              `${target_name}因为阴唇被穿环的痛苦而流下了屈辱的眼泪………`,
            ); // :5444
          } else if (p === 8) {
            // :5446
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5447
              await era.printAndWait(
                `「请、请不要再做这种事情了…啊啊～…为什么…要做这种亵渎的事…呜！」`,
              ); // :5448
              await era.printAndWait(
                `${target_name}因为鸡鸡被穿环的痛楚不停地流着眼泪………`,
              ); // :5449
            } else {
              await era.printAndWait(
                `「啊啊～…请把环取下来吧…好痛…要疯了…呜！」`,
              ); // :5450-5451
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环的痛楚不停地流着眼泪………`,
              ); // :5452
            }
          } else if (p === 16) {
            // :5455
            await era.printAndWait(`「讨厌…舌环…请取下来吧………」`); // :5456
            await era.printAndWait(
              `${target_name}的舌尖被穿了环、痛的流下泪来………`,
            ); // :5457
          } else if (p === 32) {
            // :5459
            await era.printAndWait(`「够了…请饶了我吧………」`); // :5460
            await era.printAndWait(
              `${target_name}的唇被穿了环、流下了屈辱的泪水………`,
            ); // :5461
          } else if (p === 64) {
            // :5463
            await era.printAndWait(`「${sc()}才不是…你说的什么母猪…呜呜呜～」`); // :5464
            await era.printAndWait(
              `${target_name}不想被看到鼻环似的毫不犹豫的背过脸去流下了眼泪………`,
            ); // :5465
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着取下环后的伤痕………`); // :5468-5469
        }
        kojo.穿环 = 2; // :5471
      }
    }
    return 0;
  }

  // 其余指令待办，占位一行
  stub_line(
    'KOJO_MESSAGE_COM_0',
    `指令 ${era_flag.selectcom} 的口上`,
    '随各自指令票',
  );

  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_0 的等价物；重复注册抛错）
kojo_message_com_family.register(0, kojo_message_com_0);

module.exports = { STUBBED_CALLS, kojo_message_com_0 };
