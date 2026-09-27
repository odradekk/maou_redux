/**
 * @file 慈爱性格口上 K0：指令口上的爱抚 / 舔阴 / 肛门爱抚 / 自慰 / 胸爱抚 / 接吻 / 自己扒开 / 插入手指 / 舔肛 / 振动宝石 / 壶虫 / 振动杖 / 肛门虫 / 阴蒂夹 / 乳头夹 / 榨乳器 / 肛珠 / 正常位 / 背后位 / 对面座位 / 背面座位 / 正常位肛交 / 背后位肛交 / 对面座位肛交 / 背面座位肛交 / 手淫 / 口交 / 乳交 / 股间性交 / 骑乘位 / 全身擦洗 / 骑乘位肛交 / 肛门侍奉 / 打屁股 / 鞭 / 针 / 眼罩 / 绳子 / 口塞 / 灌肠+肛塞 / 放置PLAY / 交谈 / 乳夹口交 / 口交时自慰 / 手搓口交 / 真空口交 / 六九式 / 深喉 / 强制口交 / 穿环分支（issue #231）。
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
 * 非调教入口已全部落地：PALAMCNG/MARKCNG（参数/刻印变动）、SELF_KOJO_K0
 * （调教后事件）、DUNGEON_RYOUZYOKU/AFTER/VICTORY/ATTACK（迷宫）、
 * BENKI（肉便器）、GOHOUBI_REQUEST/AFTER、OSIOKI、NTR、处刑系五入口、
 * COLOSSEUM（死斗场）、DOG（兽奸）、GOBI（语尾）。
 *
 * 这张票存根（docs/stub-registry.md）：仅 KOJO_MESSAGE_COM_0 的
 * SELECTCOM 尚未落地的其余指令分支（后续切片填文本）。其余 SELECTCOM：
 * 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22,
 * 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43,
 * 44, 45, 46, 55, 56（17 在原文已注释；口系 69/80/123–127 与穿环 87 已落地）。
 */

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');

const { on, TIER } = require('#/system/event/registry');
const { search_family } = require('#/chara/chara-family');
const {
  kojo_message_com_family,
  self_kojo_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  benki_koujo_family,
  gobi_koujo_family,
  enterenemy_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  adapt_legacy_ntr_koujo,
  ntr_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  colosseum_kojo_family,
  dog_kojo_family,
} = require('#/kojo/kojo-system');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const {
  gohoubi_request_koujo_family,
  gohoubi_after_koujo_family,
  osioski_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  heart,
  heart_black,
  self_call,
  self_call_first,
} = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');

const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

// @EVENTTRAIN #PRI（:73-77）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_0 = 1; // FLAG:100 = 1（K0 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:79-81）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_0 = 0;
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
    era.drawLine();
    await era.printAndWait(`「嘻嘻～…嘻～…请不要打扰我的祈祷…嘻～…嘻～」`);
    await era.printAndWait(
      `已经无法期待精神崩坏的${target_name}做出什么正常的反应了吧……`,
    );
    return 1;
  } else if (chara(target).system.反抗刻印 === 3 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「不可原谅…绝对…！」`);
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「没用的…${sc()}不会认输的…」`);

    if (chara(target).chara.喜欢的东西 === 4) {
      await era.printAndWait(`（啊啊…无论发生什么…${sc()}都会与你同在……）`);
      await era.printAndWait(`${target_name}像是在向故乡的恋人祈祷的样子………`);
    }
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「…这样就可以了吧」`);

    if (chara(target).chara.喜欢的东西 === 4) {
      await era.printAndWait(`「即使被做了这样的事${sc()}也不会认输的………」`);
      await era.printAndWait(`（拜托了…赐予${sc()}力量………）`);
      await era.printAndWait(`${target_name}像是在向故乡的恋人祈祷的样子………`);
    }
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「…这也是爱吗…？」`);

    if (chara(target).chara.喜欢的东西 === 4) {
      await era.printAndWait(
        `（被这样的玷污…即便说是为了活下去…也没脸去见他了………）`,
      );
      await era.printAndWait(
        `${target_name}是想起了故乡的恋人吧、现在快要哭出来的样子………`,
      );
    }
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 3 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();

    if (chara(target).chara.喜欢的东西 === 4) {
      await era.printAndWait(
        `「请再…温柔一点…我不会抵抗的、所以…啊啊～………！」`,
      );
      await era.printAndWait(`（啊啊…${sc()}…已经不行了…对不起……）`);
      await era.printAndWait(
        `${target_name}一边想着故乡的恋人一边抱住了${player_name}………`,
      );
    } else {
      await era.printAndWait(`「请再…疼爱我吧…」`);
      if (era.get(`talent:${target}:75`) === 1) {
        await era.printAndWait(
          `「身体…躁动的没办法了…求你了…我什么都会做的…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的脑袋里已经只剩下做爱的念头了………`,
        );
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (rand_n(3) === 0) {
      await era.printAndWait(
        `「啊～…主人…请让我好好侍奉您那出色的大肉棒吧…${heart(1)}」`,
      );
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        await era.printAndWait(
          `「所以呢…请赐我精液～…我想要精液～…满满地淋过来吧…${heart(1)}」`,
        );
      }
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「啊～～…嗯～…嗯唔～…小穴好舒服啊…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}毫不在意${master_name}的到来沉溺于自慰之中。`,
      );
      if (era.get(`talent:${target}:75`) === 1) {
        await era.printAndWait(
          `「肉棒…想要～…想被坚挺出色的大肉棒哧噗哧噗地插来插去啊${heart(1)}」`,
        );
      }
    } else {
      await era.printAndWait(
        `「快点～…快点来吧！想要主人想得受不了了～${heart(1)}」`,
      );
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        await era.printAndWait(
          `「精液还不够…喉咙好渴～…忍不住了～…请再给我精液吧～${heart(1)}」`,
        );
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (rand_n(3) === 0) {
      await era.printAndWait(`「哈哈、给了我好多的爱呢」`);
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        await era.printAndWait(
          `「主人的爱…精液还不够…渴的没办法了………请给我精液～${heart(1)}」`,
        );
      }
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「请给我…更多的爱…」`);
      if (era.get(`talent:${target}:75`) === 1) {
        await era.printAndWait(
          `「啊啊…请把主人的精液…满满地赐给${sc()}淫荡而爽的不行的小穴吧～…${heart(1)}」`,
        );
        await era.printAndWait(
          `淫靡的笑着的${target_name}、脑袋里已经被肉欲支配了………`,
        );
      }
    } else {
      await era.printAndWait(`「请给我、更多。干个爽吧」`);
      if (era.get(`talent:${target}:75`) === 1) {
        await era.printAndWait(
          `「真是的…一整天都在想着小穴的事情…${heart(1)} 你可要负起责任哦…${heart(1)}」`,
        );
      }
    }
    return 1;
  }
  return 0;
}

// @EVENTTRAIN NORMAL（:87-483）：初调教 / 魔族化 / NTR 再捕获 / 屈服刻印 /
// 淫乱 / 爱慕 / 崩坏 / 村娘助手 / 二次口上。抽成命名函数导出，测试可直调
// 单测守卫（M1957：EVENTTRAIN 的 #PRI 会把 0 补成 2，事件链里 0 到不了
// NORMAL，只有直调才能隔离「总开关 == 0」这道守卫）。
async function eventtrain_normal_k0(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const master_name = chara_name(0);
  const kojo = chara(target).kojo;
  const assi = era_flag.assi;
  const assi_name = assi >= 0 ? chara_callname(assi) : '';

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (chara(target).chara.慈爱 !== 1) {
    return 0;
  }
  if (kojo.初调教 === 0) {
    era.drawLine();
    if (chara(target).chara.种族 === 1) {
      await era.printAndWait(`「请、请不要再做出那样的野蛮暴行了！」`);
      await era.printAndWait(
        `${target_name}直到现在还摆出高高在上的嘴脸说教着。`,
      );
      await era.printAndWait(`只是想想如何去玷污这个女精灵你就猛地硬了起来………`);
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 2) {
      await era.printAndWait(`「快、快点把${sc()}放出去、这也是为了你好。」`);
      await era.printAndWait(`这个女狼人好像还在担心你的业报的样子。`);
      await era.printAndWait(`看来你必须好好告诉她这些担心都是无意义的………`);
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 3) {
      await era.printAndWait(
        `「接受${sc()}的”吻”成为${sc()}的下仆吧。我会消除你的痛苦和烦恼的。」`,
      );
      await era.printAndWait(
        `这个吸血鬼毫不在意被完全囚禁的事实，还显得游刃有余的样子。`,
      );
      await era.printAndWait(`好像她对自己的”吻”很有自信呢。`);
      await era.printAndWait(`你涌起了一股把那份自信击溃得体无完肤的冲动………`);
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 4) {
      await era.printAndWait(`「你觉得${sc()}会变成你想要的那样吗？」`);
      await era.printAndWait(
        `身为无头骑士的${target_name}还很游刃有余的样子。………`,
      );
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 5) {
      await era.printAndWait(`「${scf()}、${sc()}才不会变成你想要的那样！！」`);
      await era.printAndWait(`「要是我认真起来的话，区区你这种程度的魔王………」`);
      await era.printAndWait(`被捕获的龙族少女还是一副刚强不屈的样子………`);
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 6) {
      await era.printAndWait(
        `「虽然你做出了那么多的愚行、但伟大的天神还是会原谅你的」`,
      );
      await era.printAndWait(`身为天使的${target_name}平静地这样说道。`);
      await era.printAndWait(
        `那就让你亲身体会一下，活在这地底下意味着什么吧………`,
      );
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 9) {
      await era.printAndWait(
        `${target_name}因为悲叹自己堕落成魔族而哭得眼睛都红肿了。`,
      );
      await era.printAndWait(`但是注意到你来了之后，还是强打精神瞪视着你。`);
      await era.printAndWait(
        `「${scf()}、${sc()}…即便被变成了魔族…也绝对…绝对不会服从你的…！」`,
      );
      await era.printAndWait(
        `可是变成魔族的她、已经开始从本能上感觉到无法违抗身为魔族之王的你了………`,
      );
      kojo.初调教 = 1;
      kojo.魔族化 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 10) {
      await era.printAndWait(`「请、请不要做、奇、奇怪的事情…」`);
      await era.printAndWait(
        `${target_name}被周围的气氛所震慑、失去了有生具来的开朗………`,
      );
      kojo.初调教 = 1;
      return 1;
    } else if (chara(target).chara.种族 === 11) {
      await era.printAndWait(`「不要对别人做过分的事情～！」`);
      await era.printAndWait(
        `${target_name}毫不在意自己被抓住的事实仍在发挥着天生的正义感。`,
      );
      await era.printAndWait(
        `只是想想如何去玷污这样的女矮人你就猛地硬了起来………`,
      );
      kojo.初调教 = 1;
      return 1;
    } else {
      await era.printAndWait(
        `「你一定是有什么搞错了…为什么…要做出这样的事情…」`,
      );
      await era.printAndWait(`「${sc()}愿意代替其他人受过…所以你能不能…」`);
      await era.printAndWait(`${target_name}似乎还相信你有慈悲心的样子。`);
      await era.printAndWait(`只是想想如何去玷污这样的对象你就猛的硬了起来………`);
      kojo.初调教 = 1;
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
    );
    await era.printAndWait(
      `发觉你来了之后、${target_name}顾不上擦眼泪就这样瞪视着你。`,
    );
    await era.printAndWait(
      `「无论被怎样玷污…我也不会成为你的东西的…不会的………！」`,
    );
    await era.printAndWait(
      `可是变成魔族的她、已经开始从本能上感觉到无法违抗身为魔族之王的你了………`,
    );
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `一告诉她你已经看过那些水晶球的内容之后，${target_name}的脸色就就变了。`,
      );
      await era.printAndWait(
        `「魔、魔王大人…我、${sc()}…${sc()}对…您…您的事情可是连一秒钟也不敢忘记啊～」`,
      );
      await era.printAndWait(
        `「无论什么样的惩罚我都愿意接受、即使您不原谅我也好…但、但是…求你让我继续待在您的身边吧…啊啊啊～！」`,
      );
      await era.printAndWait(
        `从她的唯唯诺诺中你越发窥见到她在狂王那里接受了怎样的调教。${master_name}的心中嫉妒的火焰在熊熊燃烧………`,
      );
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(`「又被你抓住了」`);
      await era.printAndWait(
        `「既被狂王玷污、又被你玷污………看来${sc()}的命运也就到此为止了…………」`,
      );
      await era.printAndWait(`看起来${target_name}已经接受了自己的命运………`);
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (
    kojo.初调教 < 2 &&
    chara(target).system.屈服刻印 === 1 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「能不能不要…再让我做这些事了…你觉得怎样呢………」`);
    await era.printAndWait(`（不行…明明知道这样很奇怪…）`);
    kojo.初调教 = 2;
    return 1;
  } else if (
    kojo.初调教 < 3 &&
    chara(target).system.屈服刻印 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「这样如何呢…${sc()}…」`);
    await era.printAndWait(`（明明应该很讨厌这样的事情的…）`);
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    chara(target).system.屈服刻印 === 3 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「好的…立刻…准备………」`);
    await era.printAndWait(`（已经…无法抵抗了…）`);
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) === 1 &&
    chara(target).chara.种族 !== 9
  ) {
    era.drawLine();
    await era.printAndWait(
      `「主、主人…${sc()}是…你的色情宠物…请随您的喜好…尽情使用${sc()}的身体吧…♪」`,
    );
    await era.printAndWait(
      `这样说着的${target_name}四肢伏地、向着你撅起了屁股…那个隐秘的地方已经非常湿润了………`,
    );
    await era.printAndWait(
      `曾被称呼为圣女的${target_name}已经沉溺于肉欲里了………`,
    );
    kojo.初调教 = 5;
    return 1;
  } else if (
    chara(target).chara.种族 === 9 &&
    kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) === 1
  ) {
    era.drawLine();
    if (kojo.魔族化 === 1) {
      await era.printAndWait(`「啊…魔王大人………${heart(1)}」`);
      await era.printAndWait(
        `转生成为魔族、被多次调教的${target_name}已经完全陷落了。`,
      );
      await era.printAndWait(
        `魔族的眼睛散发着淫荡的光泽、只是因为看到你、两腿之间的爱液就流了出来、好像害羞似地摩擦着双腿。`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「魔王大人、快点、用您那出色、持久、暴虐的大鸡鸡…将${sc()}最后残存的一丝清纯给玷污掉吧${heart(1)}」`,
        );
      }
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `看起来${target_name}已经无法压抑住兴奋之情了………`,
        );
      }
      await era.printAndWait(`「从此以后也会一直侍奉魔王大人的…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}一边抱着${master_name}一边冲着耳根呼出了灼热的气息。那股气息里面包含着能让一般男人射精的魔力。`,
      );
      await era.printAndWait(
        `「啊…请快点…命令作为魔王大人淫乱的仆人的${target_name}吧…${heart(1)}」`,
      );
      kojo.初调教 = 6;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(`「啊啊…魔王大人………${heart(1)}」`);
      await era.printAndWait(
        `转生成为魔族、被多次调教的${target_name}已经完全陷落了。`,
      );
      await era.printAndWait(
        `魔族的眼睛淫荡的湿润了、只是因为看见你两腿之间的爱液就已经流了出来。她害羞地摩擦着双腿。`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「请魔王大人用那漂亮而暴虐的鸡鸡…快点把${sc()}最后残留下来的清纯玷污吧${heart(1)}」`,
        );
      }
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `看起来${target_name}已经无法压抑住兴奋之情了………`,
        );
      }
      await era.printAndWait(`「从此以后也会一直…侍奉魔王大人的…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}一边抱着${master_name}一边往${master_name}的耳根呵着热气。那股气息里面包含着能让一般男人射精的魔力。`,
      );
      await era.printAndWait(
        `「啊啊…请快点…对身为魔王大人淫乱下仆的${target_name}下命令吧…${heart(1)}」`,
      );
      kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `「啊啊啊…${heart(1)} 变成这个身体之后就能清楚地感觉到…${sc()}一直以来被魔王大人的魔力所侵占的样子呢…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的一边淫靡地笑着一边舔了舔舌头。这是从以前的模样上无法想象到的下流动作。`,
      );
      await era.printAndWait(
        `「虽然被改造挺恐怖的、不过、额呵呵、拜其所赐心情变得非常清爽了呢………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}屁股着地坐到地板上将两条腿大大地张开。`,
      );
      await era.printAndWait(
        `「从此以后…宣誓对魔王大人永远效忠…请随您的喜好来使用我吧${heart(1)}」`,
      );
      if (era.get(`talent:${target}:0`) !== 1) {
        await era.printAndWait(
          `「啊啊～真是的…已经忍不住了…请使用${sc()}的魔族小穴吧～${heart(1)} 一定一定会非常舒服的哦～${heart(1)}」`,
        );
      }
      kojo.初调教 = 6;
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) === 1 &&
    chara(target).chara.种族 !== 9
  ) {
    era.drawLine();
    await era.printAndWait(`（那个人…怎么会…难道…）`);
    await era.printAndWait(
      `${target_name}意识到了自己无时无刻不在想着你的事情……`,
    );
    await era.printAndWait(
      `你的声音、你的样貌、你的手腕、你的身体…于是、她下定了决心………`,
    );
    await era.printAndWait(`………………`);
    await era.printAndWait(
      `在调教房间里看到你的${target_name}用纯洁圣女般的表情微笑着。`,
    );
    await era.printAndWait(`「主人…${sc()}…${sc()}是你的所有物…」`);
    await era.printAndWait(
      `${target_name}抱住了你，含情脉脉的用脸颊蹭着你的身体………`,
    );
    await era.printAndWait(`「让我永远陪在您的身边…好不好…………」`);
    kojo.初调教 = 7;
    return 1;
  } else if (
    chara(target).chara.种族 === 9 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    if (kojo.魔族化 === 1) {
      await era.printAndWait(`（啊…这份心情…无法抑制………！）`);
      await era.printAndWait(
        `${target_name}在经过多次的调教后陷入${master_name}魔力的影响下而不可自拔、也就是说………`,
      );
      await era.printAndWait(
        `「魔王大人…我爱你、一定是为了变成这样，${sc()}才来到了这里………${heart(1)}」`,
      );
      await era.printAndWait(
        `即使那种心情是因为调教和肉体的变化才产生的也没办法吧。`,
      );
      await era.printAndWait(
        `「啊啊～♪…${sc()}已经…光是待在魔王大人的身边就感到很满足了………${heart(1)}」`,
      );
      kojo.初调教 = 8;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(`（啊啊…这份心情…无法抑制………！）`);
      await era.printAndWait(
        `${target_name}在经过多次的调教后、转生为了魔族、`,
      );
      await era.printAndWait(
        `陷入${master_name}魔力的影响下而不可自拔、也就是说………`,
      );
      await era.printAndWait(
        `「魔王大人…我爱你、${sc()}的心和身体、都是属于你的…${heart(1)}」`,
      );
      await era.printAndWait(
        `即使那种心情是因为调教和肉体的变化才产生的也没办法吧。`,
      );
      await era.printAndWait(
        `「啊啊～♪…${sc()}已经…光是待在魔王大人的身边就感到很满足了………${heart(1)}」`,
      );
      kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(
        `「这样的话…就可以一直和您在一起了！好开心…好开心…啊啊！」`,
      );
      await era.printAndWait(`${target_name}因为变成魔族流出了喜悦的泪水。`);
      await era.printAndWait(
        `「能更强烈地感觉到您的存在了呢…${sc()}好像已经…变得有点奇怪了呢………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}激动地几乎要站不住了、抱住了${master_name}。`,
      );
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「请收下${sc()}的处女吧…就在今天好不好………？」`);
      }
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「啊啊…说出如此下流的话真是非常抱歉…${heart(1)}」`,
        );
      }
      kojo.初调教 = 8;
      return 1;
    }
  } else if (era.get(`talent:${target}:9`) === 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(`${target_name}面向屋子的角落向神祈祷着。`);
    await era.printAndWait(`祈祷完毕之后${target_name}把脸转向了你。`);
    await era.printAndWait(
      `那个时候才发现、她所祈祷的对象只是放在屋子角落里代替便器的壶………`,
    );
    kojo.初调教 = 9;
    return 1;
  } else if (assi < 0) {
    await k0_kojo2(rand);
  } else if (assi === 17) {
    era.drawLine();
    if (era.get(`talent:${assi}:165`)) {
      if (kojo.简易助手_0 === 0) {
        if (era.get(`talent:${target}:9`) === 1) {
          await era.printAndWait(`『…主人、这个人已经坏掉了哟』`);
        } else if (era.get(`talent:${target}:76`) === 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `一看到${master_name}所带来的${assi_name}，${target_name}就舔了舔嘴唇。`,
          );
          await era.printAndWait(
            `「啊啊…看起来今天要三个人一起快活呢…${heart(1)} 我想这一定会很美妙的」`,
          );
          await era.printAndWait(
            `看起来${target_name}的脑袋里只有和本来应该作为拯救对象的少女，一起做爱的念头。`,
          );
          await era.printAndWait(
            `「那么过来吧…${heart(1)} ${self_call(assi)}会好好疼爱你的…${heart(1)}」`,
          );
          if (era.get(`talent:${assi}:76`) === 1) {
            era.setColor('#ffccff');
          }
          await era.printAndWait(
            `『哈哈～…这位姐姐干起来真是爽过头了啊…${heart(1)}』`,
          );
          era.setColor('');
        } else if (era.get(`talent:${target}:85`) === 1 && kojo.初调教 >= 7) {
          await era.printAndWait(
            `一看见${master_name}所带来的${assi_name}，${target_name}就露出了有点惊讶的表情。`,
          );
          await era.printAndWait(
            `「啊啦…在村子里听说过这个孩子呢…这样啊…果然还是变成了你的东西呢………」`,
          );
          await era.printAndWait(
            `${target_name}叹气之后、稍微有点生气的撅起了嘴。`,
          );
          await era.printAndWait(
            `「呵呵呵…就比一比你和${sc()}、谁更爱着主人吧${heart(1)}」`,
          );
          if (era.get(`talent:${assi}:85`) === 1) {
            era.setColor('#ffccff');
          }
          await era.printAndWait(
            `『虽然很明显是一边倒的胜负…但还是想让你充分明白这一点、这位姐姐${heart(1)}』`,
          );
          era.setColor('');
        } else {
          await era.printAndWait(
            `一看到${master_name}所带来的${assi_name}，${target_name}的脸就僵住了。`,
          );
          await era.printAndWait(
            `「啊啊…那个孩子是邻村的…你…对这样的小孩子都下手………！」`,
          );
          await era.printAndWait(
            `${assi_name}一边看着害怕着的${target_name}一边笑了笑。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(`『勇者大人啊…和我一起玩一会儿吧…？』`);
          era.setColor('');
        }
        kojo.简易助手_0 = 1;
        return 1;
      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {
        if (era.get(`talent:${target}:9`) === 1) {
          await era.printAndWait(`『既然已经坏了…再弄坏一点也没问题吧★』`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊啦～…今天又是来见这位姐姐的吗？」`);
          await era.printAndWait(
            `已经整理好着装的${target_name}对${assi_name}笑了笑。`,
          );
          if (era.get(`talent:${assi}:85`) === 1) {
            era.setColor('#ffccff');
          }
          await era.printAndWait(
            `『才、才不是因为那个原因呢…只是想和姐姐比试一下而已！』`,
          );
          era.setColor('');
          await era.printAndWait(
            `「额呵呵～…今天也要两个人一起好好侍奉亲爱的主人呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边露出陶醉的表情，一边轻轻地用嘴唇蹭着${assi_name}的脸颊………`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈哈～…今天也要三个人在一起快活呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}目光如水、声音中难掩兴奋之情。`,
          );
          if (era.get(`talent:${assi}:76`) === 1) {
            era.setColor('#ffccff');
          }
          await era.printAndWait(
            `『嗯～…和主人一起把姐姐彻彻底底的侵犯吧…${heart(1)}』`,
          );
          era.setColor('');
          await era.printAndWait(
            `「啊…真棒呢…${sc()}…想和更多更多的人做爱呢…来吧…来吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像狗一样四肢趴在地上并且把屁股高高撅起，而且还下流地左右摇晃着。`,
          );
          await era.printAndWait(
            `看起来因为期待着被${master_name}和少女玩弄，下体开始湿润了………`,
          );
        } else {
          await era.printAndWait(
            `「请、请不要再做这样的事情了…为、为了你好才这么说的…！」`,
          );
          await era.printAndWait(
            `${target_name}回想起了被${assi_name}玩弄的事情，身体颤抖不已。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『只是和我一起玩玩而已嘛…再玩玩吧…勇者大人…${heart(1)}』`,
          );
          era.setColor('');
          await era.printAndWait(`前勇者手足无措的被少女推倒了………`);
        }
        return 1;
      }
    } else {
      await k0_kojo2(rand);
    }
  } else {
    await k0_kojo2(rand);
  }
}

// @EVENTTRAIN NORMAL 注册（直调函数上方；测试可经导出函数绕 #PRI 单测守卫）
on('EVENTTRAIN', eventtrain_normal_k0);

// @EVENTEND NORMAL（:601-668）：调教结束口上。死亡（BASE:0 <= 0）跳过。
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  const master_name = chara_name(0);

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (chara(target).chara.慈爱 !== 1) {
    return 0;
  }

  if (chara(target).dungeon.体力 <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(
      `「啊啊啊…啊啊…没法再祈祷下去了…${scf()}、${sc()}…啊、啊啊啊啊………」`,
    );
    await era.printAndWait(`${target_name}眼神空虚、喃喃的说着什么………`);
    return 1;
  } else if (
    chara(target).system.反抗刻印 === 3 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`${target_name}对${master_name}视若无睹`);
    return 1;
  } else if (
    chara(target).system.屈服刻印 <= 1 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「你真是、无可药救了…」`);
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 2 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「这就是…你的爱吗…？」`);
    return 1;
  } else if (
    chara(target).system.屈服刻印 === 3 &&
    era.get(`talent:${target}:85`) !== 1 &&
    era.get(`talent:${target}:76`) !== 1
  ) {
    era.drawLine();
    await era.printAndWait(`「请…疼爱${sc()}吧…」`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    chara(target).dungeon.体力 >= 500
  ) {
    era.drawLine();
    await era.printAndWait(
      `「再…再继续做嘛…请把小穴操到要发疯吧～…${heart(1)}」`,
    );
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    chara(target).dungeon.体力 <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「嗯～…啊…小穴～…最爽了…${heart(1)}」`);
    await era.printAndWait(`${target_name}神情荡漾…`);
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    chara(target).dungeon.体力 >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「哈哈～、太好了…」`);
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    chara(target).dungeon.体力 <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「爱…好沉重呢」`);
    await era.printAndWait(`${target_name}红着脸神情陶醉的躺在床上………`);
    return 1;
  }
  return 0;
});

/**
 * @SELF_KOJO_K0（:6832-7209）：调教后事件口上。按 TFLAG:13 分段：
 *   1 自慰（Q 1=助手/2=野狗/0=主人，CFLAG:261）、2 百合（CFLAG:262）、
 *   3 口交（CFLAG:263）、4 性交（CFLAG:264）、5 夜间（CFLAG:265）、
 *   6 卖出（:6970-6990）、998 寿命消灭（空 PRINTFORMW）。
 * 各段按素质分档、FLAG:7==2 旁路，推进 CFLAG:26x（个位数）。
 *
 * @param {number} [q] 自慰对象（EVENT_AFTERTRAIN 的 Q：1=助手/2=野狗/0=主人）
 * @returns {Promise<number>} 0
 */
async function self_kojo_k0(_rand, q = 0) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi = era_flag.assi;
  const assi_name = assi >= 0 ? chara_callname(assi) : ''; // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %CALLNAME:MASTER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  // %SELF_CALL_FIRST(TARGET)% 在本函数未使用，不定义 scf

  if (game.train.初吻与自我口上 === 1) {
    if (q === 1) {
      era.print(
        `「哈啊啊…那孩子…${assi_name}小姐的触感…还残留在身体上…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}为了寻求${assi_name}的残迹而把手指伸向了私处………`,
      );
    } else if (q === 2) {
      era.print(`「啊啊～…狗狗大人…还是狗狗大人的肉棒最棒～………！」`);
      await era.printAndWait(
        `${target_name}想着心爱的野狗，忍不住用自己的手指开始自慰………`,
      );
      await era.printAndWait(`「想做……哈啊……好想再和狗狗大人交尾………！」`);
      await era.printAndWait(
        `「狗狗大人滚烫的肉棒……粗糙的舌头……啊啊………我的狗狗大人……」`,
      );
      await era.printAndWait(
        `幻想着野狗的模样，${target_name}揉搓自己的乳房，用手指快速抽插着小穴，但似乎完全没法获得满足的样子………`,
      );
      await era.printAndWait(`「唔…狗狗大人………」`);
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        ((era.get(`cflag:${target}:261`) || 0) < 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…身体好痒…忍不住了…啊啊～自慰停不下来、只用手指完全不够啊………」`,
        );
        era.set(`cflag:${target}:261`, 4);
      } else if (
        era.get(`talent:${target}:85`) &&
        ((era.get(`cflag:${target}:261`) || 0) < 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊～…啊～啊啊～…不行了…躁动平息不下来…要变得…奇怪了………」`,
        );
        era.set(`cflag:${target}:261`, 3);
      } else if (
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        ((era.get(`cflag:${target}:261`) || 0) < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯～嗯呼唔呜～…不行了…手停不下来…还想再被欺负………」`,
        );
        era.set(`cflag:${target}:261`, 2);
      } else if (
        (era.get(`cflag:${target}:261`) || 0) < 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(
          `「啊～…啊啊～…这是因为…身体太烫了…没办法…只能自慰了…啊～啊啊～♪」`,
        );
        era.set(`cflag:${target}:261`, 1);
      }
    }
  }

  if (game.train.初吻与自我口上 === 2) {
    if (
      era.get(`talent:${target}:76`) &&
      ((era.get(`cflag:${target}:262`) || 0) < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊哈～…啊啊～…别人的小穴也…这么的美味呢…啊～～啊～…哈唔嗯～让我再奉仕吧～${heart(1)}」`,
      );
      era.set(`cflag:${target}:262`, 5);
    } else if (
      era.get(`talent:${target}:85`) &&
      ((era.get(`cflag:${target}:262`) || 0) < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊～…身体的躁动平息不下来…一起互相安慰吧…啊～啊啊～♪」`,
      );
      era.set(`cflag:${target}:262`, 4);
    } else if (
      (era.get(`abl:${target}:33`) || 0) >= 3 &&
      ((era.get(`cflag:${target}:262`) || 0) < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊～～…百合真好～…让我们一起…变的更舒服吧…？」`,
      );
      era.set(`cflag:${target}:262`, 3);
    } else if (
      (era.get(`abl:${target}:22`) || 0) >= 3 &&
      ((era.get(`cflag:${target}:262`) || 0) < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「百合…原来是这么棒的事物啊………♪」`);
      era.set(`cflag:${target}:262`, 2);
    } else if (
      (era.get(`cflag:${target}:262`) || 0) < 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait(`「啊～嗯～…百合什么…啊～哈啊啊啊～」`);
      era.set(`cflag:${target}:262`, 1);
    }
  }

  if (game.train.初吻与自我口上 === 3) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      ((era.get(`cflag:${target}:263`) || 0) < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯噗～…啾～…嘞噗～啾～啾呜啾呜唔呜呜呜${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊、早上…嘞噗～嘞咯～…好…嗯呼呜…请把…精液…都给我吧…啾呜呜呜呜${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}沉醉于浓厚的精液味道中继续着口腔奉仕………`,
      );
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        await era.printAndWait(
          `「咻噜～咻噜～…啾唔呜唔呜呜…啊啊…这样精液就全部弄干净了呢…额呵呵、多谢款待${heart(1)}」`,
        );
      }
      era.set(`cflag:${target}:263`, 3);
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      ((era.get(`cflag:${target}:263`) || 0) < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…早上就这么精神…额呵呵、早上好、主人～♪」`);
      await era.printAndWait(
        `「请在${sc()}的爱之口腔奉仕下…变的更舒服吧…嗯啾～嘞噗～咕啾呜…嘞咯～…嘞咯～♪」`,
      );
      await era.printAndWait(
        `${target_name}嘴边沾满了精液继续热情的进行着口腔奉仕………`,
      );
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        await era.printAndWait(
          `「从早上…就能享用到主人的精液～…${sc()}真是个幸福的奴隶啊…${heart(1)}」`,
        );
      }
      era.set(`cflag:${target}:263`, 3);
    } else if (
      (era.get(`abl:${target}:16`) || 0) >= 5 &&
      ((era.get(`cflag:${target}:263`) || 0) < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯啾～…啾呜～…嘞咯～…请继续…射精吧…我会全部喝下去的………」`,
      );
      if ((era.get(`abl:${target}:32`) || 0) >= 3) {
        await era.printAndWait(`「啊啊…精液…好美味啊～…啊～啊啊啊…」`);
      }
      era.set(`cflag:${target}:263`, 2);
    } else if (
      (era.get(`cflag:${target}:263`) || 0) < 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait(
        `「啊啊…奉仕…是这么的…啊啊…嗯咻呜…嘞咯…啊姆呜………！」`,
      );
      era.set(`cflag:${target}:263`, 1);
    }
  }

  if (game.train.初吻与自我口上 === 4) {
    if (
      (era.get(`abl:${target}:2`) || 0) >= 4 &&
      ((era.get(`cflag:${target}:264`) || 0) < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊～…小穴的躁动…平息不下来～…请帮帮我吧…」`);
      if (era.get(`talent:${target}:75`) === 1) {
        await era.printAndWait(`「好美妙…小穴最棒了…${heart(1)}」`);
        await era.printAndWait(
          `「已经…不能想象没有小穴的生活了………${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}神情陶醉的抱住了${master_name}………`,
        );
      }
      era.set(`cflag:${target}:264`, 2);
    } else if (
      (era.get(`cflag:${target}:264`) || 0) < 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait(
        `「啊～啊啊～…啊～…小穴好痒…嗯～呼呜～…啊啊～！」`,
      );
      era.set(`cflag:${target}:264`, 1);
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if ((era.get(`cflag:${target}:265`) || 0) < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「晚上好………主人…有空吗…？」`);
      await era.printAndWait(`「身体痒的…受不了了呢…已经…不能…离开主人了………」`);
      await era.printAndWait(`「啊啊…要疯了…请抱我…主人～………${heart(1)}」`);
      if (era.get(`talent:${target}:75`) === 1) {
        await era.printAndWait(
          `「请不要在${sc()}满足之前…停下…不然我可是饶不了你的哦${heart(1)}」`,
        );
      }
      era.set(`cflag:${target}:265`, 1);
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if (
      era.get(`talent:${target}:85`) &&
      (era.get(`mark:${target}:3`) || 0) < 3
    ) {
      await era.printAndWait(`你把${target_name}卖掉了。`);
      await era.printAndWait(`「啊啊…明明以为你了解了${sc()}对您的爱了………」`);
      await era.printAndWait(`「难道这从始至终都是${sc()}的错觉吗…」`);
      await era.printAndWait(`${target_name}伤心的擦着眼泪。`);
      await era.printAndWait(`「真是………太遗憾了………」`);
      await era.printAndWait('');
      await era.printAndWait(`「…再见、祝你平安…」`);
    } else if ((era.get(`mark:${target}:3`) || 0) === 3) {
      await era.printAndWait(`「永别了、我再也不想看到你的脸了」`);
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「要把${sc()}卖了吗…？」`);
      await era.printAndWait(`「是吗…虽然和主人做爱…特别的爽呢………」`);
      await era.printAndWait(
        `「诶？下一个主人也一定是个好主人？额呵呵、是吗～…在做爱上也能与你同等程度就太美妙了…♪」`,
      );
    } else {
      await era.printAndWait(`「再见、主人………」`);
    }
    era.print('');
    if (era.get(`talent:${target}:122`) !== 1) {
      await sell_maturo_k0(target, { rand: _rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if ((era.get(`cflag:${target}:271`) || 0) == 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哈～啊哈～…啊哈哈哈哈…${sc()}的肚子里…到底进去了什么东西呢…一定是…非常了不得的家伙吧♪」`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`cflag:${target}:102`) || 0) === 1
      ) {
        await era.printAndWait(
          `「啊啊…该怎么办呢…难道、要生下主人的孩子了吗…」`,
        );
        await era.printAndWait(`${target_name}含情脉脉的摸着肚子………`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 2) {
        await era.printAndWait(
          `「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」`,
        );
      } else if ((era.get(`cflag:${target}:102`) || 0) === 3) {
        await era.printAndWait(
          `「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」`,
        );
      } else if ((era.get(`cflag:${target}:102`) || 0) === 4) {
        await era.printAndWait(`「不、不要…怀孕什么的…还没做好准备………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「怀上了吗…狗狗大人的孩子，神明大人谢谢你～♪」`,
          );
          await era.printAndWait(
            `${target_name}含情脉脉的抚摸小腹，一副打从心底开心的模样`,
          );
          await era.printAndWait(
            `「虽然一直被内射了那么多，但没想到真的能怀上呢…♪」`,
          );
        } else {
          await era.printAndWait(`「不会吧…被野狗…弄怀孕什么的………」`);
        }
      } else if ((era.get(`cflag:${target}:102`) || 0) == 7) {
        await era.printAndWait(`「难、难道…是狂王大人的孩子………」`);
      } else {
        await era.printAndWait(
          `「啊、啊嘞…难、难道…不会吧…要生下…魔物的孩子…了吗…该怎么办………」`,
        );
      }
      era.set(`cflag:${target}:271`, 1);
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哈～啊哈～…啊哈哈哈哈…${sc()}的肚子里…到底进去了什么东西呢…一定是…非常了不得的家伙吧♪」`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`cflag:${target}:102`) || 0) === 1
      ) {
        await era.printAndWait(
          `「啊啊…能生下主人的孩子、真的好开心呢${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}含情脉脉的摸着肚子………`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 2) {
        await era.printAndWait(
          `「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」`,
        );
      } else if ((era.get(`cflag:${target}:102`) || 0) === 3) {
        await era.printAndWait(
          `「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」`,
        );
      } else if ((era.get(`cflag:${target}:102`) || 0) === 4) {
        await era.printAndWait(`「不、不要…怀孕什么的…还没做好准备………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「这么就又怀上了呢，狗狗大人真是精力充沛啊。」`,
          );
          await era.printAndWait(
            `${target_name}摸着肚子无奈的摇了摇头，脸上的笑容却怎么也停不下来`,
          );
          await era.printAndWait(`「乖乖长大吧，要长成一个健康的宝宝哦♪」`);
        } else {
          await era.printAndWait(`「不会吧…被野狗…弄怀孕什么的………」`);
        }
      } else if ((era.get(`cflag:${target}:102`) || 0) == 7) {
        await era.printAndWait(`「难、难道…是狂王大人的孩子………」`);
      } else {
        await era.printAndWait(
          `「啊、啊嘞…难、难道…不会吧…要生下…魔物的孩子…了吗…该怎么办………」`,
        );
      }
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if ((era.get(`cflag:${target}:272`) || 0) == 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「呐呐…${sc()}肚子里的厉害家伙…会从哪里出来呢？那样一来${sc()}会坏掉吗？」`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`cflag:${target}:102`) || 0) === 1
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…额呵呵…和父亲真像…真是个可爱的小宝宝…♪」`,
        );
      } else if ((era.get(`cflag:${target}:102`) || 0) === 2) {
        await era.printAndWait(`「生下来了…生下来了………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 3) {
        await era.printAndWait(`「生下来了…生下来了………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 4) {
        await era.printAndWait(`「至少…要给这个孩子祝福………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「平安的出生了，${sc()}和狗狗大人的孩子～♪能生下这么健康可爱的小狗崽好开心♪」`,
          );
          await era.printAndWait(
            `温柔的亲吻着熟睡的小狗崽，${target_name}脸上洋溢着母爱的光辉`,
          );
          await era.printAndWait(
            `「会好好把你扶养长大的，而且…还想继续给你生弟弟妹妹…♪」`,
          );
        } else {
          await era.printAndWait(`「这样的小狗…才不是${sc()}的孩子…呜！」`);
        }
      } else if ((era.get(`cflag:${target}:102`) || 0) == 7) {
        await era.printAndWait(`「啊啊…生、生下来了…啊啊啊啊………」`);
      } else {
        await era.printAndWait(`「啊～…啊啊…真的…生下来了…啊啊………」`);
      }
      era.set(`cflag:${target}:272`, 1);
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「呐呐…${sc()}肚子里的厉害家伙…会从哪里出来呢？那样一来${sc()}会坏掉吗？」`,
        );
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`cflag:${target}:102`) || 0) === 1
      ) {
        await era.printAndWait(
          `「哈啊…哈啊…额呵呵…和父亲真像…真是个可爱的小宝宝…♪」`,
        );
      } else if ((era.get(`cflag:${target}:102`) || 0) === 2) {
        await era.printAndWait(`「生下来了…生下来了………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 3) {
        await era.printAndWait(`「生下来了…生下来了………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 4) {
        await era.printAndWait(`「至少…要给这个孩子祝福………」`);
      } else if ((era.get(`cflag:${target}:102`) || 0) === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「有了上次的经验，这次的生产更加顺利了♪」`);
          await era.printAndWait(
            `将刚产下的小狗崽抱在怀里，${target_name}熟练的撩起衣服给它喂奶`,
          );
          await era.printAndWait(
            `「真是可爱的宝宝，也带去给狗狗大人看看吧。」`,
          );
        } else {
          await era.printAndWait(`「这样的小狗…才不是${sc()}的孩子…呜！」`);
        }
      } else if ((era.get(`cflag:${target}:102`) || 0) == 7) {
        await era.printAndWait(`「啊啊…生、生下来了…啊啊啊啊………」`);
      } else {
        await era.printAndWait(`「啊啊啊…又、生下来了………」`);
      }
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(
          `「嗯、马上就要生产了哦、请好好期待吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}抚摸着即将临盆而变的圆鼓鼓的大肚子………`,
        );
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「快看…爸爸来了哦～？」`);
        await era.printAndWait(`「来打个招呼吧～？」`);
        await era.printAndWait(`${target_name}和孩子很亲密的样子………`);
      }
    }
    era.set(`cflag:${target}:273`, 1);
  }

  if (game.train.初吻与自我口上 === 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「啊啊…那孩子要离巢了、有点寂寞呢………」`);
    }
    era.set(`cflag:${target}:274`, 1);
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
  game.train.初吻与自我口上 = 0; // TFLAG:13 = 0（跨域走门面）

  return 0;
}

self_kojo_family.register(0, self_kojo_k0);

/**
 * @DUNGEON_RYOUZYOKU_K0（:7236-7299）：迷宫凌辱前的口上。
 *
 * 处女（TALENT:0）与非处女分支；每支按 淫乱/献身（21/22）→
 * 胆怯/淫荡/易陷落（17/31/36）→ 强气/男胜/好色（11/12/15/30/34）→
 * 恋慕/献身爱（10/26）→ それ以外 分档；处女支含 EXP:1/22 追加。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dungeon_ryouzyoku_k0() {
  /* eslint-disable no-irregular-whitespace -- 原文全角空格（DUNGEON_RYOUZYOKU 台词，多行模板内无法逐行 disable） */
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「${sc()}的第一次…竟然是你们这些…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「………好吧、尽管来吧」`);
      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「拜托了…只要留下我的命…！　这个身体不管怎么玷污都无所谓…！」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「请、请务必用屁股来！　前面…只有前面还请放过！」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「嘴巴请随便用…会竭尽全力舔的…」`);
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(
        `「不管这个身体被怎么玷污…也绝对不会…屈服于你们的…！」`,
      );
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「…至今为止为爱而活着的生活就这样…结束了吗…？」`);
    } else {
      await era.printAndWait(`「要做什么…这样…不对…」`);
    }
  } else {
    await era.printAndWait(`「${sc()}呦…你打算怎么办呢…？」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「………什么也…不想相信了」`);
      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「不管怎么用${sc()}的性器都可以…！　只要…留下我的命…！」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「不管怎么玷污我的屁股都无所谓…求求你们…别杀我…」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「我可以用嘴…一定会尽心尽力的…怎样…」`);
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(`「不管怎么被发泄肉欲…我的内心…也不会污浊的！」`);
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「已经再也见不到…阳光了吗…」`);
    } else {
      await era.printAndWait(`「你们没有一点爱心吗…？」`);
    }
  }

  return 0;
}
/* eslint-enable no-irregular-whitespace */

/**
 * @DUNGEON_RYOUZYOKU_AFTER_K0（:7302-7358）：迷宫凌辱后的口上。
 *
 * 处女/非处女分支；EXP:0/1/20/22 超 20 的追加台词（肛门崩坏、
 * 吞精、喝尿等）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dungeon_ryouzyoku_after_k0() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「太好了…前面还在…呜～…呜呜～」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`（………究竟能…守到什么时候呢…）`);
      return 0;
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门崩坏了、在被恢复薬再生之前不断的流着脏东西`,
      );
      await era.printAndWait(`「屁股…被玩坏了……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「已经…不想舔了…」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「这东西…简直不是人喝的…哦诶诶」`);
    }
  } else {
    await era.printAndWait(`「对不起…对不起…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「够了…不要…」`);
      return 0;
    }

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(
        `被不知多少人的鸡鸡贯穿过的${target_name}的性器红肿了起来`,
      );
      await era.printAndWait(`「好难受…」`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门崩坏了、在被恢复薬再生之前不断的流着脏东西`,
      );
      await era.printAndWait(`「屁股…被玩坏了……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「不知吞了多少人份了…已经…不想继续了…」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「这样喝下去的话…咳咳～」`);
    }
  }
}

// 注册进分发族（TRYCALLFORM DUNGEON_RYOUZYOKU_K0 的等价物）
ryouzyoku_kojo_family.register(0, dungeon_ryouzyoku_k0);
ryouzyoku_after_kojo_family.register(0, dungeon_ryouzyoku_after_k0);
/**
 * @GOHOUBI_REQUEST_KOUJO（K0 慈爱）：奖赏请求口上（:8102-8160，CFLAG:504 分档 0-9）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function gohoubi_request_koujo_k0() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if ((era.get(`cflag:${target}:504`) || 0) === 0) {
    await era.printAndWait(`「要是${sc()}打倒勇者的话、请给我奖金」`);
  } else if (
    (era.get(`cflag:${target}:504`) || 0) === 1 ||
    (era.get(`cflag:${target}:504`) || 0) === 2 ||
    (era.get(`cflag:${target}:504`) || 0) === 3
  ) {
    // 原作是一整行：:8133 的「…打倒勇者的话…」、504 的三选一与
    // 的 PRINTFORMW 收行都不换行。判据是纯读，提到语句外当取值（#624）
    const request_kind = era.get(`cflag:${target}:504`) || 0;
    await era.printAndWait(
      `「要是${sc()}打倒勇者的话…` +
        (request_kind === 1
          ? '可以奖励我与犬'
          : request_kind === 2
            ? '可以奖励我与猪'
            : '可以奖励我与马') +
        '做爱吗…？」',
    );
  } else if ((era.get(`cflag:${target}:504`) || 0) === 4) {
    await era.printAndWait(`「要是我胜利归来的话…请给我…凯旋的吻！」`);
  } else if ((era.get(`cflag:${target}:504`) || 0) === 5) {
    await era.printAndWait(`「要是我胜利归来的话…请和我做爱吧♪」`);
  } else if ((era.get(`cflag:${target}:504`) || 0) === 6) {
    await era.printAndWait(`「请用魔王大人的精液、来作为奖赏吧♪」`);
  } else if ((era.get(`cflag:${target}:504`) || 0) === 7) {
    await era.printAndWait(`「请准备好男男女女的大乱交聚会、来作为奖赏吧♪」`);
  } else if ((era.get(`cflag:${target}:504`) || 0) === 8) {
    await era.printAndWait(
      `「要是能请我喝魔王大人的小便的话、我一定会把勇者打倒给你看的」`,
    );
  } else if ((era.get(`cflag:${target}:504`) || 0) === 9) {
    await era.printAndWait(`「赢了的话…我想要…童贞的处男～」`);
  }
}

/**
 * @GOHOUBI_AFTER_KOUJO（K0 慈爱）：奖赏结算后口上（:8163-8238，choice 分档 0-9，CFLAG:504 追加）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function gohoubi_after_koujo_k0(cid, choice) {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (choice === 0) {
    await era.printAndWait(`「………那个、不、没什么」`);
  } else if (choice === 1) {
    await era.printAndWait(`「怎么样、看上去合适吗？」`);
  } else if (choice === 2) {
    if ((era.get(`cflag:${target}:504`) || 0) === 0) {
      await era.printAndWait(`「啊啊、这样就能给受伤的怪物们买治疗薬了」`);
      await era.printAndWait(`${chara_callname(cid)}露出了慈母般的微笑………`); // %SAVESTR:A%
    } else if ((era.get(`cflag:${target}:504`) || 0) === 1) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「啊啊～！被小狗狗侵犯屁股了～…啊～啊啊～♪」`);
      } else {
        await era.printAndWait(`「啊啊～！被小狗狗侵犯了～…啊～啊啊～♪」`);
      }
    } else if ((era.get(`cflag:${target}:504`) || 0) === 2) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「啊啊～！被小猪猪侵犯屁股了…啊～啊啊～♪」`);
      } else {
        await era.printAndWait(`「啊啊～！被小猪猪侵犯了…啊～啊啊～♪」`);
      }
    } else if ((era.get(`cflag:${target}:504`) || 0) === 3) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「啊啊～！被马先生侵犯屁股了…啊～啊啊～♪」`);
      } else {
        await era.printAndWait(`「啊啊～！被马先生侵犯了…啊～啊啊～♪」`);
      }
    } else if ((era.get(`cflag:${target}:504`) || 0) === 4) {
      await era.printAndWait(`「啊～…嗯…好棒…好像麻麻的呢………${heart(1)}」`);
    } else if ((era.get(`cflag:${target}:504`) || 0) === 5) {
      if (era.get(`abl:${target}:2`) > era.get(`abl:${target}:3`)) {
        await era.printAndWait(`「啊～～！再抱我…再抱紧我～！」`);
      } else {
        await era.printAndWait(`「还要～！把屁股…干坏为止～！继续做吧～！」`);
      }
    } else if ((era.get(`cflag:${target}:504`) || 0) === 6) {
      await era.printAndWait(`「啊～${heart(1)} 美味的精液…还想再要呢♪」`);
    } else if ((era.get(`cflag:${target}:504`) || 0) === 7) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「啊哈啊…再来…再来啊～…${heart(1)}」`);
      } else {
        await era.printAndWait(`「啊哈啊…再来…再来啊～…${heart(1)}」`);
      }
    } else if ((era.get(`cflag:${target}:504`) || 0) === 8) {
      await era.printAndWait(
        `「美味的小便…魔王大人的小便真美味啊${heart(1)}」`,
      );
    } else if ((era.get(`cflag:${target}:504`) || 0) === 9) {
      if (era.get(`abl:${target}:2`) > era.get(`abl:${target}:3`)) {
        await era.printAndWait(
          `「呵呵呵、这就是女人的味道哦。第一次能被我${sc()}收下真是太好了呢${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「能用屁股拿走你的初体验、真是很不错的经验呢${heart(1)}」`,
        );
      }
    }
  }
}

/**
 * @OSIOSKI_KOUJO（K0 慈爱）：惩罚口上（:8240-8298，choice 分档 0-9，ABL 门槛分档）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function osioski_koujo_k0(cid, choice) {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (choice === 0) {
    await era.printAndWait(`「感、感谢您的宽大处理」`);
  } else if (choice === 1) {
    if (era.get(`abl:${target}:21`) >= 3) {
      await era.printAndWait(`「哈咿～～！哔哩哔哩～哔哩哔哩的好爽啊～！」`);
    } else {
      await era.printAndWait(`「啊～咿～！饶命啊～！请饶了我吧咿咿咿～！」`);
    }
  } else if (choice === 2) {
    if (era.get(`abl:${target}:17`) >= 4) {
      await era.printAndWait(
        `「啊啊～…大家请看${heart(1)} 请好好看${sc()}自慰并即将高潮的地方吧～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「不、不行…请、请不要看…${sc()}的那个地方…不要看…啊啊～！」`,
      );
    }
  } else if (choice === 3) {
    if (era.get(`abl:${target}:17`) >= 6) {
      await era.printAndWait(
        `「啊啊啊～♪一边被看着这么羞人的样子一边自慰…为什么会这么爽呢～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「呜呜～…被看到了…被看到了～…不要看…不要看啊………」`,
      );
    }
  } else if (choice === 4) {
    if (era.get(`abl:${target}:21`) >= 3) {
      await era.printAndWait(
        `「啊～～！啊～！啊啊～${heart(1)} 请更多～…更多的惩罚我吧～！」`,
      );
    } else {
      await era.printAndWait(
        `「咿～～～！不要～不要啊～！好痛～不要～！呜咕～咕呜唔～！」`,
      );
    }
  } else if (choice === 5) {
    if (
      era.get(`talent:${target}:88`) === 1 ||
      era.get(`talent:${target}:76`) === 1
    ) {
      await era.printAndWait(
        `「啊哈啊～～…再多把小便淋到我身上吧${heart(1)} 对～、好好瞄准${sc()}的脸…嗯～嗯咕噗～嗯咕～嗯呜唔～」`,
      );
    } else {
      await era.printAndWait(`「对不起对不起对不起………」`);
    }
  } else if (choice === 6) {
    await era.printAndWait(`「为什么${sc()}得做这种事…」`);
  } else if (choice === 7) {
    await era.printAndWait(`「好、好狠心………」`);
  } else if (choice === 8) {
    await era.printAndWait(
      `「不要啊～！我快不行了魔王大人～！小穴好想要～！好想要啊～！求您了～！侵犯${sc()}吧～！侵犯我吧～！」`,
    );
  } else if (choice === 9) {
    await era.printAndWait(`「～～♪」`);
  }
}

// 注册进分发族（TRYCALLFORM GOHOUBI_REQUEST/AFTER_KOUJO_K0、OSIOKI_KOUJO_K0 的等价物）
gohoubi_request_koujo_family.register(0, gohoubi_request_koujo_k0);
gohoubi_after_koujo_family.register(0, gohoubi_after_koujo_k0);
osioski_koujo_family.register(0, osioski_koujo_k0);
/**
 * @BENKI_KOUJO_K0（K0 慈爱）：肉便器配信口上（:7415-7634，FLAG:62 分档 0-10 × FLAG:63/素质）。
 *
 * 常识改写四支（FLAG:62 = 3/4/5/6）的首句在原作由三行拼成一行输出：
 * 前三处是 PRINTFORM 「和…（:7495/:7516/:7537）、第四处是 PRINTFORM 「给予（:7558），
 * 接 CALL BENKI_PLAYER_NAME（:7496/:7517/:7538/:7559，对象名）、
 * 再 PRINTFORMW 收尾。ere 一次 era.printAndWait 输出整行，名字按
 * ${benki_player_name()} 插进 CALL 的位置（#599；真身 ere/system/train/benki.js，
 * K12 同款延迟 require）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function benki_koujo_k0() {
  /* eslint-disable no-irregular-whitespace -- 原文全角空格（BENKI 台词，多行模板内无法逐行 disable） */
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  // CALL BENKI_PLAYER_NAME（:7496/:7517/:7538/:7559）：对象名真身，延迟
  // require 是 K12/K3 同款（防顶层漏装遮蔽），名字表只有一份
  const benki_player_name = () =>
    require('#/system/train/benki').benki_player_name();

  if (era.get('flag:62') === 0) {
    if (era.get('flag:63') === 1) {
      await era.printAndWait(
        `「给予『施舍』是${sc()}的『工作』来着，${sc()}会努力的！」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「舒服吗……？　呵呵、不要急……我会把爱施与每个人的♪」`,
      );
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「没关系的、我会施舍大家的……把爱施与给大家……」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「让我来施舍你们吧……」`);
    } else {
      await era.printAndWait(`「讨厌……连这些家伙……也要施舍吗？」`);
    }
  } else if (era.get('flag:62') === 1) {
    if (era.get('flag:63') === 1) {
      await era.printAndWait(
        `「是的，${sc()}是最喜欢女孩子的，一想到现在开始的『施舍』腰就不自觉地动起来了……♪」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「不分男女、让我把爱施与你们吧♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「没关系、${sc()}也是女的、这全是爱哦」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「让我来施舍你们吧……」`);
    } else {
      await era.printAndWait(`「讨厌……与不认识的女人做爱什么的……」`);
    }
  } else if (era.get('flag:62') === 2) {
    if (era.get('flag:63') === 1) {
      await era.printAndWait(
        `「${sc()}是比家畜还低贱的野兽啊，像这样子的『施舍』才是野兽肉便器该做的吧……这很奇怪吗？」`,
      );
    } else if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(`「哈啊哈啊……兽阴○茎♪　不、这是爱的施舍呢……♪」`);
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「即使是动物们、也要施与爱……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「即使是动物们、也要施与爱……♪」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「这是……施舍」`);
    } else {
      await era.printAndWait(`「住手……不要啊」`);
    }
  } else if (era.get('flag:62') === 3) {
    if (era.get('flag:63') === 1) {
      // 原作 PRINTFORM 「和 → CALL BENKI_PLAYER_NAME（:7496）→ PRINTFORMW …
      // 三行同属一行输出。名字按 #599 接上：${benki_player_name()} 插在
      // 的位置（拼接锚）
      await era.printAndWait(
        `「和${benki_player_name()}来同时用小穴和菊花来做爱了♪」`,
      );
      await era.printAndWait(
        `「这份『施舍』可是被进行了肉便器洗脑的${sc()}的新『工作』，这可是可以体验到爱的完美体验哦♪」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「啊啊……哪个穴都好舒服啊……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「咕……哈……呜咕」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「让我来施舍吧……」`);
    } else {
      await era.printAndWait(`「不，不要啊！」`);
    }
  } else if (era.get('flag:62') === 4) {
    if (era.get('flag:63') === 1) {
      // 原作 PRINTFORM 「和 → CALL BENKI_PLAYER_NAME（:7517）→
      // PRINTFORMW …，三行同属一行输出；名字按 #599 接上
      await era.printAndWait(
        `「和${benki_player_name()}用小穴做爱做到潮如泉涌咯♪」`,
      );
      await era.printAndWait(
        `「这份『施舍』可是被进行了肉便器洗脑的${sc()}的新『工作』，这可是可以体验到爱的完美体验哦♪」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「啊啊……小穴好舒服啊……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「咕……哈……呜咕」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「让我来施舍吧……」`);
    } else {
      await era.printAndWait(`「不，不要啊！」`);
    }
  } else if (era.get('flag:62') === 5) {
    if (era.get('flag:63') === 1) {
      // 原作 PRINTFORM 「和 → CALL BENKI_PLAYER_NAME（:7538）→
      // PRINTFORMW …，三行同属一行输出；名字按 #599 接上
      await era.printAndWait(
        `「和${benki_player_name()}用菊花做爱做到湿滑不已咯♪」`,
      );
      await era.printAndWait(
        `「这份『施舍』可是被进行了肉便器洗脑的${sc()}的新『工作』，这可是可以体验到爱的完美体验哦♪」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「啊啊……菊花好舒服啊……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「咕……哈……呜咕」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「让我来施舍吧……」`);
    } else {
      await era.printAndWait(`「不，不要啊！」`);
    }
  } else if (era.get('flag:62') === 6) {
    if (era.get('flag:63') === 1) {
      // 原作 PRINTFORM 「给予 → CALL BENKI_PLAYER_NAME（:7559）→
      // PRINTFORMW …，三行同属一行输出；名字按 #599 接上
      await era.printAndWait(
        `「给予${benki_player_name()}先生的肉棒大人的『施舍』哦♪」`,
      );
      await era.printAndWait(
        `「这份『施舍』可是被进行了肉便器洗脑的${sc()}的新『工作』，这可是可以体验到爱的完美体验哦♪」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「啊……好想要精液……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「咕……哈……呜咕」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「让我来施舍吧……」`);
    } else {
      await era.printAndWait(`「不，不要啊！」`);
    }
  } else if (era.get('flag:62') === 7) {
    if (era.get('flag:63') === 1) {
      await era.printAndWait(`「感谢观看♪」`);
      await era.printAndWait(
        `「进行了肉便器洗脑的${sc()}现在是能感受到野兽○棒的爱意的变态女♪」`,
      );
      await era.printAndWait(`「水晶球也被传得到处都是的了，人生完蛋了呢♪」`);
    } else if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「大家在看吗……爱上兽阴○茎的变态女的交尾剧哦～♪」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「大家在看吗？　对动物们施与爱……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「大家在看吗？　对动物们施与爱……♪」`);
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「讨厌……这个、会在哪里公映呢……？」`);
    } else {
      await era.printAndWait(`「住手……不要拍～！」`);
    }
  } else if (era.get('flag:62') === 9) {
    if (era.get('flag:63') === 1) {
      await era.printAndWait(`「感谢观看♪」`);
      await era.printAndWait(
        `「进行了肉便器洗脑的${sc()}现在是最喜欢在野外全裸露出变态女啦♪」`,
      );
      await era.printAndWait(`「水晶球也被传得到处都是的了，人生完蛋了呢♪」`);
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「大家好……${sc()}现在……用羞人的样子出现在野外呢♪」`,
      );
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「大家好……${sc()}奉主人的命令……在野外光着身子呢♪」`,
      );
    } else if (era.get(`abl:${target}:16`) >= 5) {
      await era.printAndWait(`「大家好……呜呜～……${sc()}……」`);
    } else {
      await era.printAndWait(`「住手……不要拍～！」`);
    }
  } else if (era.get('flag:62') === 10) {
    if (era.get('flag:63') === 1) {
      await era.printAndWait(`「感谢观看哦♪」`);
      await era.printAndWait(
        `「${sc()}现在正尝试着当便器呢！　『被命令就会兴奋』嘛、没办法嘛♪」`,
      );
      await era.printAndWait(
        `「过会请让${sc()}沐浴在小便中吧。『因为喜欢才做』的嘛、比之前更加兴奋了！」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「大家好……${sc()}现在……受主人大人命令正在当便器哦♪」`,
      );
    } else {
      await era.printAndWait(`「呜呜……被这么样对待的话……活不下去了啦……」`);
    }
  }

  return 0;
}
/* eslint-enable no-irregular-whitespace */

/**
 * @DUNGEON_VICTORY_K0（K0 慈爱）：战斗胜利口上（:7361-7412，素质分档 + 体力比判定）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dungeon_victory_k0(_cid, rand) {
  /* eslint-disable no-irregular-whitespace -- 原文全角空格（VICTORY 台词，多行模板内无法逐行 disable） */
  const target = era_flag.target;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  await era.printAndWait(`「爱能拯救世界！」`);

  if (
    era.get(`talent:${target}:21`) === 1 ||
    era.get(`talent:${target}:22`) === 1
  ) {
    await era.printAndWait(`「……就这样吧」`);

    return 0;
  } else if (
    era.get(`talent:${target}:11`) === 1 ||
    era.get(`talent:${target}:12`) === 1 ||
    era.get(`talent:${target}:15`) === 1 ||
    era.get(`talent:${target}:30`) === 1 ||
    era.get(`talent:${target}:34`) === 1
  ) {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「我是绝不会输给不懂得爱的家伙的！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「为世界带来和平…」`);
    } else {
      await era.printAndWait(`「我是不会输的！」`);
    }
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    await era.printAndWait(`「虽然这么说…呜呜」`);

    return 0;
  } else {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「如果相信爱的话…」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「将和平…」`);
    } else {
      await era.printAndWait(`「没事的…没事的」`);
    }
  }

  if (
    (era.get(`base:${target}:0`) * 100) / era.get(`maxbase:${target}:0`) < 50 ||
    (era.get(`base:${target}:1`) * 100) / era.get(`maxbase:${target}:1`) < 50
  ) {
    await era.printAndWait(`（光有爱是赢不了的吗…？）`);
  } else {
    await era.printAndWait(`「看好了！　这就是爱的力量！」`);
  }

  return 0;
}

/**
 * @DUNGEON_ATTACK_K0（K0 慈爱）：战斗攻击口上（:7637-7729，CFLAG:1 分档 + 素质/随机）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dungeon_attack_k0(_cid, rand) {
  /* eslint-disable no-irregular-whitespace -- 原文全角空格（ATTACK 台词，多行模板内无法逐行 disable） */
  const target = era_flag.target;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (era.get(`cflag:${target}:1`) === 2) {
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
      if (era.get(`talent:${target}:275`)) {
        await era.printAndWait(`「就让爱的火焰……将你烧尽吧！」`);
      } else if (rand_n(3) === 0) {
        await era.printAndWait(`「请感受这份爱吧！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「不懂爱的家伙哦！」`);
      } else {
        await era.printAndWait(`「倒下吧！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      if (era.get(`talent:${target}:140`)) {
        await era.printAndWait(`「咿～～、妈妈……救救我……」`);
      } else if (era.get(`talent:${target}:141`)) {
        await era.printAndWait(`「咿～～、爸爸……救救我……」`);
      } else {
        await era.printAndWait(`「咿～～、请倒下吧！」`);
      }

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「爱还不够呢」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「对不起…！」`);
      } else {
        await era.printAndWait(`「抱歉…！」`);
      }
    }
  } else {
    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「……这是命令」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「请你也感受一下魔王大人的爱吧！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「好可爱啊、你还不知道真正的爱是什么吧～」`);
      } else {
        await era.printAndWait(`「让你清醒一下吧」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「为什么……不明白这份爱呢」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「你也……应该知道下美妙的爱吧」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「什么是美妙的事情……让我好好教教你吧」`);
      } else {
        await era.printAndWait(`「让我教教你什么是爱吧……真正的爱」`);
      }
    }
  }

  return 0;
}
/* eslint-enable no-irregular-whitespace */

/**
 * @GOBI_KOUJO_K0（K0 慈爱）：语尾口上（:8301-8329，ARG:0 分档 0-5）。
 *
 * #570 起返回语尾文字、不打印（原作 PRINT 不换行，由调用方拼进同一行）；
 * rand 形参对齐族实参 [arg0, rand]（默认支三选一可注入）。
 *
 * @param {number} arg_0 情绪档位
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {string} 语尾文字
 */
function gobi_koujo_k0(arg_0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg_0 === 1) {
    return `♪`;
  } else if (arg_0 === 2) {
    return `！`;
  } else if (arg_0 === 3) {
    return `……。`;
  } else if (arg_0 === 4) {
    return `……。`;
  } else if (arg_0 === 5) {
    return `……呜呜。`;
  } else {
    if (rand_n(3) === 0) {
      return `。`;
    } else if (rand_n(2) === 0) {
      return `哟。`;
    } else {
      return `呢。`;
    }
  }
}

/**
 * @ENTERENEMY_KOUJO_K0（K0 慈爱）：迷宫来袭口上（:8063-8076 素质分档；:8079-8121 家人检索）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function enterenemy_koujo_k0() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (
    era.get(`talent:${target}:21`) === 1 ||
    era.get(`talent:${target}:22`) === 1
  ) {
    await era.printAndWait(`「……我是不会输的」`);
  } else if (
    era.get(`talent:${target}:11`) === 1 ||
    era.get(`talent:${target}:12`) === 1 ||
    era.get(`talent:${target}:15`) === 1 ||
    era.get(`talent:${target}:30`) === 1 ||
    era.get(`talent:${target}:34`) === 1
  ) {
    await era.printAndWait(`「用${sc()}的爱来打倒魔王！」`);
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    await era.printAndWait(`「${sc()}的爱能打倒魔王吗…？」`);
  } else {
    await era.printAndWait(`「用${sc()}的爱…让世界恢复和平！」`);
  }

  // CFLAG:604 = 家族所属编号；CFLAG:605 个位 = 本人相对家人的关系。
  if (
    (era.get(`cflag:${target}:604`) || 0) > 0 &&
    (era.get(`cflag:${target}:605`) || 0) > 0
  ) {
    const relation = (era.get(`cflag:${target}:605`) || 0) % 10;
    const family_id = search_family(target);
    let line;

    switch (relation) {
      case 1:
        line = '「哥哥……等着我！」';
        break;
      case 2:
        line = '「姐姐……我来救你了！」';
        break;
      case 3:
        line =
          family_id < 0
            ? '「可爱的弟弟……等着我！」'
            : `「${chara_callname(family_id)}……等着我！」`;
        break;
      case 4:
        line =
          family_id < 0
            ? '「可爱的妹妹……我来救你了！」'
            : `「${chara_callname(family_id)}……我来救你了！」`;
        break;
      case 5:
        line = '「爸爸……等着我！」';
        break;
      case 6:
        line = '「妈妈……我来就你了！';
        break;
      case 7:
        line =
          family_id < 0
            ? '「可爱的儿子……等着我！」'
            : `「${chara_callname(family_id)}……等着我！」`;
        break;
      case 8:
        line =
          family_id < 0
            ? '「可爱的女儿……我来就你了！」'
            : `「${chara_callname(family_id)}……我来就你了！」`;
        break;
      default:
        line = '「重要的家人……我来就你了！」';
    }
    era.print(line); // PRINTL
  }
  return 0;
}

// 注册进分发族（TRYCALLFORM BENKI/VICTORY/ATTACK/GOBI/ENTERENEMY_KOUJO_K0 的等价物）
benki_koujo_family.register(0, benki_koujo_k0);
dungeon_victory_family.register(0, dungeon_victory_k0);
dungeon_attack_family.register(0, dungeon_attack_k0);
gobi_koujo_family.register(0, gobi_koujo_k0);
enterenemy_koujo_family.register(0, enterenemy_koujo_k0);
/**
 * @NTR_KOUJO_K0（K0 慈爱）：NTR 事件口上（:7866-7943，P 分档 1-7/20，CFLAG:650-657 记录）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ntr_koujo_k0(p) {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era.get(`cflag:${target}:650`) === 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    era.set(`cflag:${target}:650`, 1);
  }

  if (p === 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「饶、饶了我吧…不要再继续了…啊～啊啊啊～！…对不起…魔王大人…………」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊～…无论如何…咿～咿啊～…啊啊～！请原谅我～！」`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    era.set(`cflag:${target}:651`, 1);
  } else if (p === 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「嗯咿～～！屁股眼…被撑的太大啦…啊啊～啊…咿～…咿～～！不、不要…再这样下去的话…♪」`,
      );
    } else {
      await era.printAndWait(
        `「这、这样…不、不行啊～…啊啊～…饶了我吧～啊～啊啊啊～！」`,
      );
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    era.set(`cflag:${target}:652`, 1);
  } else if (p === 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「啊啊～…${sc()}是…${sc()}是被狗侵犯也觉得很爽的母狗是也～…啊咿～…咿咿咿～～！」`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「啊～…啊啊～…求你了…救救我…请救救我…魔王大人………」`,
      );
    } else {
      await era.printAndWait(
        `「大家…不要看我…请不要看我啊…啊～啊啊啊～…讨厌啊～！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    era.set(`cflag:${target}:653`, 1);
  } else if (p === 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊～！好爽…好爽啊～${heart(1)} 更多的…侵犯我…啊～啊啊～…啊～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊～…好深…好深啊～…咿～…咿～～…${sc()}…已…已经…啊～啊啊啊～♪」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    era.set(`cflag:${target}:654`, 1);
  } else if (p === 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊哈啊…请更多的侵犯我吧…请净化被魔王玷污过的${sc()}的身体吧～…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊～～…请大家…惩罚…屈服于魔王军的背叛者${sc()}吧…啊～～…没错…前面和后面都要…啊啊～♪」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    era.set(`cflag:${target}:655`, 1);
  } else if (p === 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「嗯噗呜…是…请下一个…${sc()}的小穴只要１０Ｇ…后面的就全部免费了…请尽情发泄欲望吧${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「更多的…更多的玷污吧…将${sc()}的肮脏身体…更多的…♪」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    era.set(`cflag:${target}:656`, 1);
  } else if (p === 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「嗯哈啊…狂王大人的东西好美味啊…好想一直奉仕下去呢${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「是…${sc()}是狂王大人专用的肉便器～…所以请让我更多的进行奉仕吧♪」`,
      );
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    era.set(`cflag:${target}:657`, 1);
  } else if (p === 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (era.get(`cflag:${target}:102`) === 1) {
        await era.printAndWait(
          `「呜咕～咿咕～…魔王大人和${sc()}的小宝宝…啊啊啊～对不起～对不起～～！」`,
        );
      } else {
        await era.printAndWait(
          `「啊呜～呜呜～…对不起、对不起…${sc()}的可爱宝宝………」`,
        );
      }
    } else {
      await era.printAndWait(
        `「哈啊哈啊…是、${sc()}的子宫是狂王大人的专用孕袋…啊啊啊…」`,
      );
    }
  }
  return 0;
}

/**
 * @EXUCUTION_KOUJO_K0（K0 慈爱）：处刑口上（:7946-7962，事件类型 4-7 分档）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function exucution_koujo_k0(event_type) {
  if (event_type === 4) {
    await era.printAndWait(
      `「咿～！不要～！不要啊～！饶了我吧～！请饶了我吧～！」`,
    );
  } else if (event_type === 5) {
    await era.printAndWait(`「啊…啊啊…意识…变的远去了…去了………」`);
  } else if (event_type === 6) {
    await era.printAndWait(`「被示众了呢………」`);
  } else if (event_type === 7) {
    await era.printAndWait('');
  }
}

/**
 * @MUSEUM_KOUJO_K0（K0 慈爱）：雕像馆口上（:7963-7999，事件类型 0-9 分档）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function museum_koujo_k0(event_type) {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (event_type === 0) {
    await era.printAndWait(`「住、住手…啊…啊啊～…不要啊～！」`);
  } else if (event_type === 1) {
    await era.printAndWait(`「这样的…死法……」`);
  } else if (event_type === 2) {
    await era.printAndWait('');
  } else if (event_type === 3) {
    await era.printAndWait(`「${sc()}、不想…变成·这·样…」`);
  } else if (event_type === 4) {
    await era.printAndWait(
      `「咿！…救、救命…！？脚、脚尖…已经…动不……了……啊……」`,
    );
  } else if (event_type === 5) {
    await era.printAndWait('');
  } else if (event_type === 6) {
    await era.printAndWait('');
  } else if (event_type === 7) {
    await era.printAndWait('');
  } else if (event_type === 8) {
    await era.printAndWait('');
  } else if (event_type === 9) {
    await era.printAndWait('');
  }
}

/**
 * @BANISHMENT_KOUJO_K0（K0 慈爱）：追放处刑口上（:7998-8020，事件类型 0-4 分档）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function banishment_koujo_k0(event_type) {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (event_type === 0) {
    await era.printAndWait(`「即使失去力量…${sc()}也有能做的事…！」`);
  } else if (event_type === 1) {
    await era.printAndWait('');
  } else if (event_type === 2) {
    await era.printAndWait('');
  } else if (event_type === 3) {
    await era.printAndWait('');
  } else if (event_type === 4) {
    await era.printAndWait('');
  }
}

/**
 * @PUBLIC_EXUCUTION_KOUJO_K0（K0 慈爱）：公开处刑口上（:8019-8035，事件类型 0-2 分档）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function public_exucution_koujo_k0(event_type) {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (event_type === 0) {
    await era.printAndWait(
      `「啊啊…啊啊…为什么要…这样对待${sc()}…咿…咿呀啊啊啊啊啊啊啊啊！」`,
    );
  } else if (event_type === 1) {
    await era.printAndWait(`「绞刑…${sc()}要被…像罪人一样地被绞死吗………」`);
  } else if (event_type === 2) {
    await era.printAndWait('');
  }
}

/**
 * @GROTESQUE_KOUJO_K0（K0 慈爱）：猎奇处刑口上（:8034-8061，事件类型 0-6 分档）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function grotesque_koujo_k0(event_type) {
  if (event_type === 0) {
    await era.printAndWait('');
  } else if (event_type === 1) {
    await era.printAndWait('');
  } else if (event_type === 2) {
    await era.printAndWait('');
  } else if (event_type === 3) {
    await era.printAndWait('');
  } else if (event_type === 4) {
    await era.printAndWait('');
  } else if (event_type === 5) {
    await era.printAndWait('');
  } else if (event_type === 6) {
    await era.printAndWait('');
  }
}

/**
 * @COLOSSEUM_KOJO_0（K0 慈爱）：死斗场口上（:7735-7863，SELECTCOM 55/56/31/5/21/27/51 分派）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function colosseum_kojo_0() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi = era_flag.assi; // NO:ASSI（助手角色 ID）
  const assi_name = assi >= 0 ? chara_callname(assi) : ''; // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%

  if (era_flag.selectcom === 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(
        `${target_name}虽然站着但好像已经没有力气了的样子……`,
      );
    } else {
      await era.printAndWait(
        `${target_name}因为竞技场的灼热气氛与接下来的战斗对手而颤抖不已……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「${assi_name}小姐……请、请饶了我吧………」`);
        await era.printAndWait(`${target_name}放下武器请求饶恕……`);
      } else {
        await era.printAndWait(`「已经…已经不行了…打不下去了………」`);
        await era.printAndWait(`${target_name}放下武器请求饶恕……`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `「怎、怎么会这样…要和${assi_name}小姐战斗什么的…」`,
        );
        await era.printAndWait(
          `${target_name}看着被${master_name}命令而武装起来的${assi_name}感到了害怕……`,
        );
      } else {
        await era.printAndWait(`「才、才不要和那些家伙战斗……」`);
        await era.printAndWait(
          `${target_name}已经失去了身为勇者的気概、对战斗怕的不得了……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「嗯咕呜～…嗯噗～…嗯～嗯呼呜……」`);
      // 原作是一整行：助手名 + 两个互斥的 SIF 分档 + :7787 的
      // PRINTFORMW 收行。判据是纯读，提到语句外当取值（#624）
      const assi_has_cock =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_with_band = !assi_has_cock && era.get('item:4') === 1; // ITEM:PBAND（#552：内建非角色变量 = 4 号假阳具）
      await era.printAndWait(
        `${assi_name}让` +
          (assi_has_cock
            ? '吞咽着肉棒的'
            : assi_with_band
              ? '吞咽着假阳具的'
              : '') +
          `${target_name}露出了愉悦的表情……`,
      );
    } else {
      await era.printAndWait(`「哈啊哈啊…嗯咕～…嗯～…嗯噗呜……」`);
      await era.printAndWait(
        `${target_name}舔舐并吞咽着发出令人作呕气味的阴茎……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「请…请住手啊…${assi_name}…小姐…啊呜～！」`);
      await era.printAndWait(`${target_name}就这样被爱抚着……`);
    } else {
      await era.printAndWait(`「啊啊～…疼、疼～～……」`);
      await era.printAndWait(`${target_name}被用力揉着胸发出了痛苦的呻吟声……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊～…嗯！不要～…不要～…请、请饶了我吧～…嗯！」`,
      );
      // 与 :7782..:7787 同型的一整行（#624）
      const assi_has_cock =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_with_band = !assi_has_cock && era.get('item:4') === 1; // ITEM:PBAND（#552：内建非角色变量 = 4 号假阳具）
      await era.printAndWait(
        `${assi_name}一边听着悲鸣一边` +
          (assi_has_cock ? '用肉棒' : assi_with_band ? '用假阳具' : '') +
          `毫不留情地持续蹂躙着${target_name}的阴道……`,
      );
    } else if (era.get('tflag:400') === 206) {
      await era.printAndWait(`「嘎～…嘎哈～…咕嘿～…咕诶诶诶……」`);
      await era.printAndWait(
        `可怜的${target_name}一边发出蛤蟆似的坏掉的的声音一边被巨魔侵犯着……`,
      );
    } else {
      await era.printAndWait(`「不…不要啊…这样的…啊啊～！」`);
      await era.printAndWait(`${target_name}就这样被怪物侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊～…嗯！不要～…不要～…请、请饶了我吧～…嗯！！」`,
      );
      // 与 :7815..:7820 同型的一整行（#624）
      const assi_has_cock =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_with_band = !assi_has_cock && era.get('item:4') === 1; // ITEM:PBAND（#552：内建非角色变量 = 4 号假阳具）
      await era.printAndWait(
        `${assi_name}一边听着悲鸣一边` +
          (assi_has_cock ? '用肉棒' : assi_with_band ? '用假阳具' : '') +
          `毫不留情地持续蹂躙着${target_name}的肛门……`,
      );
    } else if (era.get('tflag:400') === 206) {
      await era.printAndWait(`「嘎～…嘎哈～…咕嘿～…咕诶诶诶……」`);
      await era.printAndWait(
        `可怜的${target_name}一边发出蛤蟆似的坏掉的的声音一边被巨魔侵犯着……`,
      );
    } else {
      await era.printAndWait(`「不…不要啊…这样的…啊啊～！」`);
      await era.printAndWait(`${target_name}就这样被怪物侵犯着肛门……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait(`「啊咕呜～…这、这是…媚、媚薬吗…啊啊～…！」`);
    return 0;
  }
  return 0;
}

// 注册进分发族（TRYCALLFORM NTR/处刑系/COLOSSEUM_KOUJO_K0 的等价物）
ntr_koujo_family.register(0, adapt_legacy_ntr_koujo(ntr_koujo_k0));
exucution_koujo_family.register(0, exucution_koujo_k0);
museum_koujo_family.register(0, museum_koujo_k0);
banishment_koujo_family.register(0, banishment_koujo_k0);
public_exucution_koujo_family.register(0, public_exucution_koujo_k0);
grotesque_koujo_family.register(0, grotesque_koujo_k0);
colosseum_kojo_family.register(0, colosseum_kojo_0);

/**
 * @DOG_KOJO_0（K0 慈爱）：兽奸专用口上（:5481-6500，SELECTCOM 0/1/5/6/9/
 * 21/27/30/31/34/37/43/56 分派，CFLAG:301-357 兽奸状态机 + RAND 随机分支）。
 *
 * COM 守卫 TEQUIP:89 岔出（:693-695）；与 COM 状态机同编号但兽奸场景。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dog_kojo_0(rand) {
  /* eslint-disable no-irregular-whitespace -- 原文全角空格（DOG 台词，多行模板内无法逐行 disable） */
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era_flag.selectcom === 0) {
    if ((era.get(`cflag:${target}:301`) || 0) === 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「是、是……」`);
      } else {
        await era.printAndWait(`「讨厌！　你要、你要干什么……！？」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(`cflag:${target}:301`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:301`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「狗狗大人…哈啊…那个地方再多舔舔……嗯…啊啊啊～」`,
          );
          await era.printAndWait(
            `被野狗舔舐得难以自已，${target_name}两腿之间的爱液就流了出来，有些害羞地摩擦着双腿`,
          );
          await era.printAndWait(
            `「啊啊…${sc()}已经不行了……光是被狗狗的舌头碰到…哈……就湿的不成样子了。」`,
          );
          await era.printAndWait(
            `${target_name}沉迷在野狗所带来的爱抚中，脸上已经完全找不到被称作圣女的清纯痕迹了`,
          );
          await era.printAndWait(`「嗯…啊呼…更…更进一步也没关系哦…咕……啾哈…」`);
          await era.printAndWait(
            `为了渴求更多的宠爱，${target_name}光裸的身子热情蹭着野狗的皮毛`,
          );
          await era.printAndWait(`「哈……就是这样…继续……啊啊…啾…」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `当野狗慢慢靠近时，${target_name}主动将身体缠了上去，把乳首送到野狗口中`,
          );
          await era.printAndWait(
            `「啊哈…狗狗大人……更多的玩弄${sc()}的乳房吧…」`,
          );
          await era.printAndWait(
            `贪图着野狗给予的快乐，${target_name}的娇喘越发甜美起来`,
          );
          await era.printAndWait(
            `「啊啊…好熟练…被做了这样的事情……${sc()}…已…已经……」`,
          );
          await era.printAndWait(
            `${target_name}紧紧环抱着野狗摩擦，呼吸变得更加凌乱急促`,
          );
          await era.printAndWait(
            `「请……更加地…用喜欢的方式来…抚摸${sc()}吧～」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被野狗来回舔吮爱抚着，唾液在光裸的身子上留下一道道反光的痕迹`,
          );
          await era.printAndWait(`「呣…这么突然……哈…你就是爱舔东西呢～」`);
          await era.printAndWait(
            `享受着突如其来的爱抚，${target_name}张开双腿引导野狗向下舔舐`,
          );
          await era.printAndWait(
            `「这里……请好好享用…哈…狗狗大人的舌头…真的好美妙……」`,
          );
          await era.printAndWait(
            `粗糙的舌头驾轻就熟地爱抚着全身，${target_name}的呻吟越发甜美高亢起来`,
          );
        }
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 7);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:301`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「啊哈哈、小狗狗……」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 6);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:301`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「比起狗更想要主人…」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 5);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        ((era.get(`cflag:${target}:301`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 4);
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        ((era.get(`cflag:${target}:301`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呜～……」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 3);
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        ((era.get(`cflag:${target}:301`) || 0) <= 1 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「讨厌……住手～！」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        era.set(`cflag:${target}:301`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if ((era.get(`cflag:${target}:302`) || 0) === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「怎么会……不要啊」`);
      } else {
        await era.printAndWait(`「怎么会……不要啊」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      era.set(`cflag:${target}:302`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:302`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「味道不错吧……？啊哈…好舒服……」`);
          await era.printAndWait(
            `仰起头闭起眼，被舔着小穴的${target_name}很是陶醉的样子`,
          );
          await era.printAndWait(`「啊…舌头…太深入了…好有感觉…哈……」`);
          await era.printAndWait(
            `伸手按住野狗的脑袋，${target_name}随着舌头的抽插晃动着腰`,
          );
          await era.printAndWait(
            `「再激烈一点也没关系……好棒…要…要去了啊啊啊…」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「呜…咕…嗯嗯…狗狗的舌头…在我的里面…哈啊…」`);
          await era.printAndWait(
            `${target_name}主动打开双腿，小穴和阴蒂在野狗灵巧地舔弄下，已经有了明显的快感`,
          );
          await era.printAndWait(
            `「唔…还是…有些难为情的……哼…但是……不行了…真的…好舒服～」`,
          );
          await era.printAndWait(
            `不知是因为羞耻还是快感，${target_name}的脸涨得通红，曾经的圣女就这么屈服在了兽爱的快感中`,
          );
          await era.printAndWait(
            `「这…这样下去……啊啊…再深一点也没关系…嗯啊啊…！」`,
          );
          await era.printAndWait(
            `${target_name}的呻吟越发甜美起来，受到鼓舞的野狗努力将舌头刺的更深`,
          );
        } else {
          await era.printAndWait(
            `${target_name}压着野狗的脑袋向下，邀请它品尝自己的小穴`,
          );
          await era.printAndWait(`「想试试吗？来尝尝看吧，我的野狗大人♪」`);
          await era.printAndWait(
            `野狗听话得伸出舌头舔舐起来，${target_name}的小穴渐渐覆盖上了一层泛着光的野狗唾液`,
          );
          await era.printAndWait(
            `「好棒……野狗大人的舌头…嗯…请多玩弄一下${sc()}…哈…」`,
          );
          await era.printAndWait(
            `通人性的野狗用犬牙轻咬着阴蒂，${target_name}的身体宛如通了电一样的颤抖起来`,
          );
          await era.printAndWait(
            `「啊啊啊啊…！这种玩法…好厉害……啊……不行…已…已经…！！」`,
          );
        }
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 6);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:302`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「啊哈哈、好痒呢……」`);
        await era.printAndWait(`${target_name}还不太习惯兽爱的感觉的样子。`);
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:302`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「不行～、好痒啊……」`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 4);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        ((era.get(`cflag:${target}:302`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呜呜……」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 3);
      } else if (
        (era.get(`cflag:${target}:302`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「讨厌！　住手……求你了！」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        era.set(`cflag:${target}:302`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if ((era.get(`cflag:${target}:306`) || 0) === 0) {
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「……」`);
      } else {
        await era.printAndWait(`「呜……」`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      era.set(`cflag:${target}:306`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:306`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊哈～我的乳房很有弹性哦～唔…♪」`);
          await era.printAndWait(
            `${target_name}的胸被野狗用前足和舌头爱抚着，因为乳头传来连绵快意而止不住地喘息着`,
          );
          await era.printAndWait(
            `「真是爱撒娇啊…嗯……踩的再用力一点也不要紧哦…」`,
          );
          await era.printAndWait(
            `${target_name}陶醉地闭上双眼，胸部不断起伏配合着野狗的动作`,
          );
        } else {
          await era.printAndWait(
            `「粗糙的舌头…弄得好舒服…爪子…指甲不可以伸出来哦…嗯啊……♪」`,
          );
          await era.printAndWait(
            `${target_name}搂住在怀中的野狗，任由它对自己挺起的乳头又摸又舔`,
          );
          await era.printAndWait(`「没关系，更大胆的舔吧…啊啊……♪」`);
          await era.printAndWait(
            `${target_name}被野狗爱抚着胸部，露出陶醉的神情，喉咙里溢出快乐的呻吟`,
          );
        }
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 6);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:306`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「啊哈～、不要把爪子伸出来哦……♪」`);
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:306`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「唔嗯～……」`);
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 4);
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        ((era.get(`cflag:${target}:306`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呜呜……被狗……」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 3);
      } else if (
        (era.get(`cflag:${target}:306`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「不、不要……快住手……」`);
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        era.set(`cflag:${target}:306`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if ((era.get(`cflag:${target}:307`) || 0) === 0 && era.get('tflag:13')) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `野狗将前爪踩在${target_name}肩上半立起来，热情的舔舐着${target_name}的脸颊`,
        );
        await era.printAndWait(`「嗯？是想做什么吗？啊…难道……」`);
        await era.printAndWait(
          `按住焦躁不安的野狗，${target_name}似乎是想到了什么而脸红起来`,
        );
        await era.printAndWait(
          `「啊，好的…如果是狗狗大人的话……${sc()}，很愿意这样做。」`,
        );
        await era.printAndWait(
          `下了决定的${target_name}伸手搂住了野狗的脖子，稍稍偏过脑袋，探出小舌羞怯的去触碰野狗的舌头`,
        );
        await era.printAndWait(
          `「啾…咕啾……是…这是${target_name}的初吻……唔…献给心爱的狗狗大人…♪」`,
        );
        await era.printAndWait(
          `得到回应的野狗变得贪心起来，炽热的舌头卷起${sc()}的小舌来回纠缠着`,
        );
        await era.printAndWait(`「哈呜…嗯……很舒服…${sc()}的唇…味道如何？」`);
        await era.printAndWait(
          `生涩的回应着野狗，${target_name}吸吮着交缠的舌头，吞咽着彼此的唾液`,
        );
        await era.printAndWait(
          `「${sc()}的初吻能献给狗狗大人真的是很幸福呢……」`,
        );
        await era.printAndWait(
          `将野狗当做恋人，${target_name}的目光湿润，神情温柔地与野狗持续舌吻着`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「初吻是和狗吗…好微妙呢…」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「明明想把初吻献给魔王大人的……」`);
      } else {
        await era.printAndWait(`「讨厌、把初吻给狗什么的……真是恶梦啊……」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      era.set(`cflag:${target}:307`, 1);
      return 0;
    } else if ((era.get(`cflag:${target}:307`) || 0) === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(`「嗯？狗狗大人……？唔…」`);
        await era.printAndWait(
          `毫无防备的被野狗扑倒，${target_name}就这样被野兽夺走了唇舌`,
        );
        await era.printAndWait(
          `「嗯啾…原来…是想接吻吗……咕唔…好的…${sc()}的唇，是属于狗狗大人的…」`,
        );
        await era.printAndWait(
          `完全没有任何抵触，${target_name}紧搂着野狗的身体，热情回应起来`,
        );
        await era.printAndWait(`「哈呜…嗯……很舒服…${sc()}的唇…味道如何？」`);
        await era.printAndWait(
          `熟练地回应着野狗，${target_name}吸吮着交缠的舌头，吞咽着彼此的唾液`,
        );
        await era.printAndWait(`「呣呒…狗狗大人…再吻得的激烈一点好吗…啾……」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「小狗狗……啾～」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「和狗吗……」`);
      } else {
        await era.printAndWait(`「讨厌、和狗接吻什么的……真是恶梦啊……」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      era.set(`cflag:${target}:307`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:307`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.print(
            `「${sc()}啊…咕……很喜欢接吻的……和狗狗大人的话……啾唔…」`,
          );
          await era.printAndWait(
            `搂抱住压在身上的野狗，${target_name}热情的和野狗唇舌交缠着`,
          );
          await era.printAndWait(
            `「呣呒…舌头，再伸进来一些……哈…光是被吻着…就好像要到了…」`,
          );
          await era.printAndWait(
            `${target_name}将野狗的舌头含进口中，仿佛口交一般咕啾咕啾的吸着`,
          );
          await era.printAndWait(
            `「嗯…嗯呒……舒服吗…？狗狗大人的舌头…好美味…」`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(
            `${target_name}抚着野狗的皮毛，主动偏头向野兽献上了自己的唇`,
          );
          await era.printAndWait(
            `「来接吻吧…狗狗大人……啾…啾唔…${sc()}已经离不开你了…」`,
          );
          await era.printAndWait(
            `小舌纠缠着野狗粗糙的舌头，${target_name}吞咽着野狗的唾液，诉说着自己的爱恋`,
          );
          await era.printAndWait(
            `「唔啊…吻我…咕…哈啾……好喜欢…我的狗狗大人…最喜欢你了……！」`,
          );
        } else {
          await era.print(`「唔呣…舌头进来了～哈…狗狗大人……很心急呢…」`);
          await era.printAndWait(
            `被野狗粗暴的扑倒在地，${target_name}温柔的笑着张开唇，任由黏腻的舌头入侵`,
          );
          await era.print(
            `得到允许的野狗变得更加贪心起来，粗糙的舌头贪婪得探索着${player_name}口腔的每一个角落`,
          );
          await era.printAndWait(
            `「……很舒服…咕…原来狗狗是这么喜欢接吻的……多少次……都行……啾唔…」`,
          );
          await era.print(`${target_name}脸红得发烫，沉醉在和野兽的亲吻中`);
          await era.printAndWait(`「${sc()}………哈…是狗狗大人爱着的小母狗呢…」`);
          await era.print(`${target_name}被野狗深吻着，露出全然陶醉的幸福表情`);
        }
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 6);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:307`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗……啾～」`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:307`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「和狗吗……」`);
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 4);
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        ((era.get(`cflag:${target}:307`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呜呜……抽泣～……」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 3);
      } else if (
        (era.get(`cflag:${target}:307`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「讨厌、和狗接吻什么的……真是恶梦啊……」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        era.set(`cflag:${target}:307`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if ((era.get(`cflag:${target}:310`) || 0) === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(`「狗狗大人……在舔${sc()}肮脏的地方……嗯啊……」`);
        await era.printAndWait(
          `${target_name}被舔着肛门有些不安的样子，红着脸挣扎起来`,
        );
        await era.printAndWait(
          `「……不行…这样舔下去的话……${sc()}要变得…奇怪了………」`,
        );
        await era.printAndWait(
          `逃脱不了野兽的舔舐，${target_name}干脆放任自己享受起来`,
        );
        await era.printAndWait(
          `「头脑都没办法思考了……舔这种地方的话…咿呀…！」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「呀啊！　好痒」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「唔嗯～……」`);
      } else {
        await era.printAndWait(`「不要……不要舔……」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      era.set(`cflag:${target}:310`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:310`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「狗狗大人……肛门…好舒服啊……嗯啊～」`);
          await era.printAndWait(
            `${target_name}摇晃着腰配合着野兽的舔舐，敏感的肠肉纠缠着入侵的舌尖`,
          );
          await era.printAndWait(`「更激烈一点…更粗暴的侵犯肛门吧…啊啊……」`);
          await era.printAndWait(
            `「要变得奇怪了…！${sc()}…已经……要到了……！！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.print(`「舔那种地方的话…哈啊～真的……好舒服……♪」`);
          await era.printAndWait(
            `完全陷落在肉体的快感中，${target_name}仰起头发出一阵阵淫媚的娇喘`,
          );
          await era.print(
            `「更加…更加往深处…哈啊……请继续用舌头来玩弄${sc()}……」`,
          );
          await era.print(
            `难耐得摇晃着腰，${target_name}享受着被侵犯肛门的快感`,
          );
        } else {
          await era.print(`野狗将舌头卷起，尽可能的刺入肛穴的更深处`);
          await era.printAndWait(
            `「唔啊啊……都已经进到这么深了…狗狗大人……哈啊…♪」`,
          );
          await era.print(
            `完全觉醒了被玩弄肛门的快感，${target_name}熟练的配合着野狗的动作`,
          );
          await era.printAndWait(
            `「要去了…后面的穴……也已经要被狗狗大人玩坏了……咿呀…！！」`,
          );
        }
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 6);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:310`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呀啊！　好痒……」`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:310`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「唔嗯～……」`);
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 4);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        ((era.get(`cflag:${target}:310`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「请……不要舔……呜呜……」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 3);
      } else if (
        (era.get(`cflag:${target}:310`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「讨厌！　快住手……求你了！」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        era.set(`cflag:${target}:310`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if ((era.get(`cflag:${target}:322`) || 0) === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「好开心……${sc()}的处子身…要交给狗狗大人了……」`,
          );
          await era.printAndWait(
            `${target_name}趴在地上，用手扒开湿漉漉的小穴，向野狗献上自己`,
          );
          await era.printAndWait(
            `被本能驱使的野狗喘着粗气，压在${target_name}背上，通红的阴茎一口气贯穿至最深处`,
          );
          await era.printAndWait(`「咿呀……！痛！好大……太深了……啊…！」`);
          await era.printAndWait(
            `没给${target_name}适应的时间，野兽迫不及待的抽插起来`,
          );
          await era.printAndWait(
            `「没关系……哈……狗狗大人…请尽情享用${sc()}……啊～」`,
          );
          await era.printAndWait(
            `膨胀的兽茎激烈摩擦着阴道壁，${target_name}的痛呼中开始夹杂些许呻吟`,
          );
          await era.printAndWait(
            `「啊啊…动起来了……好快…开始…变得舒服了……哈啊……♪」`,
          );
          await era.printAndWait(
            `${target_name}生涩得配合着野狗的动作，小穴本能收缩绞着侵入的肉棒，发出咕啾咕啾的水音`,
          );
          await era.printAndWait(
            `「请射在里面……狗狗大人的精子…都射在子宫里……唔噢噢噢！！！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「第一次是给小狗狗……还不错嘛」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「明明想把第一次献给魔王大人的……」`);
        } else {
          await era.printAndWait(`「咿、咿呀啊啊啊啊啊啊！！」`);
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「好开心……${sc()}…终于要和狗狗大人交配了……」`,
          );
          await era.printAndWait(
            `${target_name}趴在地上，用手扒开湿漉漉的小穴，向野狗献上自己`,
          );
          await era.printAndWait(
            `被本能驱使的野狗喘着粗气，压在${target_name}背上，通红的阴茎一口气贯穿至最深处`,
          );
          await era.printAndWait(
            `「咿呀……！好大……比起人类的都大…好深……啊…！」`,
          );
          await era.printAndWait(
            `没给${target_name}适应的时间，野兽迫不及待的抽插起来`,
          );
          await era.printAndWait(
            `膨胀的兽茎激烈的摩擦着阴道壁，${target_name}的痛呼中夹杂些许呻吟`,
          );
          await era.printAndWait(`「啊啊…动起来了……好快……变得好舒服……哈啊……」`);
          await era.printAndWait(
            `${target_name}尽力配合着野狗的动作，小穴本能的收缩绞着侵入的肉棒，发出咕啾咕啾的水音`,
          );
          await era.printAndWait(
            `「请射在里面……狗狗大人的精子…都射在子宫里……唔噢噢噢！！！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「和小狗狗……做吗？」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「和魔王大人做感觉会更好呢……」`);
        } else {
          await era.printAndWait(`「不要、不要啊啊啊啊啊！！」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      era.set(`cflag:${target}:322`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:322`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「已经忍到极限了…狗狗大人…快点，快来把${sc()}搞得一团乱吧……♪」`,
          );
          await era.printAndWait(
            `${target_name}高高抬起屁股等待野狗的插入，裸露的小穴湿润异常`,
          );
          await era.printAndWait(
            `受到邀请的野狗低吼着，肿胀的阴茎一口气刺入了最深处，毫不留情的抽送起来`,
          );
          await era.printAndWait(
            `「啊啊嗯…！被侵犯着…${sc()}…在被野狗侵犯着……」`,
          );
          await era.printAndWait(
            `已经毫不在意人狗交媾后的业报之类的东西了，现在的${target_name}完全沉浸在兽交所带来的快感中`,
          );
          await era.printAndWait(
            `「哈啊…好厉害……唔…都顶到最深处了…请…请就这样射在里面吧…啊啊啊…！！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～狗狗大人……${sc()}…正在和野狗交配着～♪」`,
          );
          await era.printAndWait(
            `小穴绞着粗大的狗根，${target_name}在野狗身下喘息呻吟着`,
          );
          await era.printAndWait(
            `「好厉害……好棒…啊啊…深一些…最喜欢这样的感觉了……♪」`,
          );
          await era.print(
            `野狗低吠着，每一次的抽插都会带出大量的体液，响起下流水声`,
          );
          await era.printAndWait(`「嗯…哈……就这样射精……让${sc()}怀孕吧～♪」`);
        } else {
          await era.printAndWait(`「狗狗大人……请往我的小穴里注入精液吧……♪」`);
          await era.printAndWait(
            `${target_name}渴望被雄犬填满，打开双腿向野狗发出邀请`,
          );
          await era.printAndWait(
            `野狗沉下身体，膨胀的阴茎完全没入了${target_name}的小穴`,
          );
          await era.printAndWait(
            `「唔哦哦哦……！好棒…狗狗大人的肉棒……哈啊…最棒了…！」`,
          );
          await era.printAndWait(
            `熟练得扭动腰肢配合着野狗的动作，${target_name}的呻吟声越发高亢起来`,
          );
          await era.print(
            `「交配…狗狗大人…更多的……在${sc()}的子宫里…用精液播种吧…♪」`,
          );
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 7);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:322`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「和小狗狗做吗……也好」`);
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 6);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:322`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「不能和魔王大人做吗……？」`);
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 5);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        ((era.get(`cflag:${target}:322`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呜呜……呜呜呜………有感觉了……」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 4);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        ((era.get(`cflag:${target}:322`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呜呜呜……呜呜……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 3);
      } else if (
        (era.get(`cflag:${target}:322`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「不、不要、不要啊啊啊啊！」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        era.set(`cflag:${target}:322`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if ((era.get(`cflag:${target}:328`) || 0) === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(`「哎？后…后面的穴也……？」`);
        await era.printAndWait(
          `察觉到野狗阴茎抵上了自己的肛门，${target_name}紧张地挣扎起来`,
        );
        await era.printAndWait(`「狗狗大人，这么脏的地方……会弄脏你的…唔……！」`);
        await era.printAndWait(
          `丝毫不顾身下人的反抗，野狗从背后贯穿了${target_name}的肛门，快速地抽插`,
        );
        await era.printAndWait(
          `「唔啊啊啊啊啊……！！进…进来了……狗狗大人的肉棒…在直肠里搅来搅去……！」`,
        );
        await era.printAndWait(
          `在${target_name}的喘息痛呼中，野狗越发奋力地撞击起来`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「屁股眼好爽哦……小狗狗……♪」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「明明和魔王大人做会更好……」`);
      } else {
        await era.printAndWait(`「咿呀啊啊啊啊！！」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      era.set(`cflag:${target}:328`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        ((era.get(`cflag:${target}:328`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「狗狗大人就这么喜欢后面的穴吗……？啊…已经进来了……哈啊～」`,
          );
          await era.printAndWait(
            `${target_name}高高抬起屁股方便野狗阴茎插入肛门，发出了满足的喘息`,
          );
          await era.printAndWait(`「好大好烫……嗯啊……腰…自己就动起来了…♪」`);
          await era.printAndWait(
            `「狗狗大人…请更加欺负肛穴……${target_name}的屁股就是为了像这样被狗狗大人侵犯而存在的呢…♪」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「狗狗大人♪请尽情使用${sc()}的肛穴吧～」`);
          await era.printAndWait(
            `${target_name}用双手将自己的肛门张开了，被诱惑的野狗急切地将阴茎插了进去`,
          );
          await era.printAndWait(
            `「更加…激烈地抽插那里，也没有关系的……咿呀…！好棒～」`,
          );
          await era.printAndWait(
            `「请射在里面…野兽的精液……把${sc()}的直肠都染白吧♪」`,
          );
        } else {
          await era.print(
            `${target_name}纤细的腰被野兽抱着，野狗阴茎从背后贯穿了肛门`,
          );
          await era.printAndWait(
            `「哈啊…明明被温柔地抱着……却在被侵犯着屁股什么的…狗狗大人……♪」`,
          );
          await era.printAndWait(
            `${target_name}摇摆腰肢配合着野狗的抽插，呻吟越发甜美高亢起来`,
          );
          await era.printAndWait(
            `「嗯…啊啊～腰部完全停不下来…脑袋变得迷迷糊糊起来了…唔啊啊啊啊……！」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 7);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        ((era.get(`cflag:${target}:328`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「和小狗狗也行吧……啊啊～」`);
        } else {
          await era.printAndWait(`「小狗狗……也行吧……」`);
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 6);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        ((era.get(`cflag:${target}:328`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「明明不是和魔王大人做……竟然有感觉了……」`);
        } else {
          await era.printAndWait(`「嗯啊啊啊～！　屁股要融化了～」`);
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:328`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「明明和魔王大人更好……」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 4);
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        ((era.get(`cflag:${target}:328`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「呼呜、呼呜……咕～」`);
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 3);
      } else if (
        (era.get(`cflag:${target}:328`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「不要、不要啊啊啊啊！」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        era.set(`cflag:${target}:328`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if ((era.get(`cflag:${target}:331`) || 0) === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊哈、好大……」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「这就是……小狗狗的……」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「我做……」`);
      } else {
        await era.printAndWait(`「咿～……讨厌！」`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      era.set(`cflag:${target}:331`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:331`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「狗狗大人……舒服吗？啊哈，都变的这么大了……」`,
          );
          await era.printAndWait(
            `${target_name}温柔地用手套弄着野狗的阴茎，赤裸的小穴已经泛起了湿意`,
          );
          await era.printAndWait(
            `「勃起的肉棒，十分的烫呢……这个顽皮的家伙…还在一跳一跳地♪」`,
          );
          await era.printAndWait(
            `${target_name}的瞳孔完全染上了欲望的颜色，手上的动作越来越激烈……`,
          );
        } else {
          await era.printAndWait(`「好厉害……一颤一颤的……好像会很美味的样子」`);
          await era.printAndWait(
            `${target_name}脸上一片绯红，感受着手里乱跳的野狗阴茎触感`,
          );
          await era.printAndWait(
            `「${sc()}会温柔得做的…请狗狗大人尽情地享受吧♪」`,
          );
          await era.printAndWait(
            `毫无保留得奉献自己，${target_name}越发尽力地为野狗手交`,
          );
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 7);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:331`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「舒服吗……？」`);
        } else {
          await era.printAndWait(`「舒服吗……？」`);
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 6);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        ((era.get(`cflag:${target}:331`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「舒服吗……？」`);
        } else {
          await era.printAndWait(`「舒服吗……？」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:331`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「舒服吗……？」`);
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 4);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:331`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「……我做」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 3);
      } else if (
        (era.get(`cflag:${target}:331`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「讨厌……抽泣～」`);
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        era.set(`cflag:${target}:331`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if ((era.get(`cflag:${target}:332`) || 0) === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(
          `「狗狗大人的肉棒…野兽的气息…看起来真美味啊……♪」`,
        );
        await era.printAndWait(
          `${target_name}将脑袋探到野狗下身，小心翼翼地闻了闻`,
        );
        await era.printAndWait(`「嗯啾……${sc()}…唔……会好好侍奉狗狗大人的……」`);
        await era.printAndWait(
          `认真的使用着舌头和嘴唇，${target_name}温柔得刺激着野狗的阴茎`,
        );
        await era.print(`野狗低低吠着，顺着${target_name}的动作快速抽插起来`);
        await era.printAndWait(
          `「咕唔…！这么突然…咕啾……射在嘴里…哈……也没关系的……」`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「要含住小狗狗的鸡鸡吗……？」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「要含住小狗狗的鸡鸡吗……？」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「是、我做……我做……」`);
      } else {
        await era.printAndWait(`「讨厌……讨厌、呜诶诶……」`);
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      era.set(`cflag:${target}:332`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:332`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「哈啊哈啊……大肉棒……狗狗大人的……」`);
          await era.printAndWait(
            `${target_name}痴痴地吞咽着野狗的阴茎，灵活的小舌挑逗着狗根的顶部`,
          );
          await era.printAndWait(
            `不过是只野兽，野狗哪里受得了这种技巧，狗根勃起得更加明显了`,
          );
          await era.printAndWait(
            `「好像很舒服的动着呢～啾呜…请射在${sc()}嘴里…嗯……」`,
          );
        } else {
          await era.print(`「狗狗大人～♪${sc()}的舌头舒服吗？」`);
          await era.print(`${target_name}将头探到野狗下腹，含住了半勃起的阴茎`);
          await era.print(`「咕唔……野兽的气味…唔啾……真令人上瘾…」`);
          await era.print(
            `野狗耸动着腰部在${target_name}的口中抽插着，${target_name}熟练的配合着野狗的动作`,
          );
          await era.print(
            `「好像已经要到极限了…哈……来吧狗狗大人♪请全都射出来……咕啾…」`,
          );
        }
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 7);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        ((era.get(`cflag:${target}:332`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗……舒服吗？」`);
        await era.printAndWait(`${target_name}露出媚态舔舐着野狗的阴茎`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 6);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:332`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗的……额呵呵、真是好孩子……」`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        ((era.get(`cflag:${target}:332`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗的……额呵呵、真是好孩子……」`);
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 4);
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:332`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「我知道了、会去舔的……」`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 3);
      } else if (
        (era.get(`cflag:${target}:332`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「呜诶……讨厌」`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        era.set(`cflag:${target}:332`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if ((era.get(`cflag:${target}:335`) || 0) === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「${sc()}的身体是用来侍奉神明的……${sc()}一直这么相信着。」`,
          );
          await era.printAndWait(
            `${target_name}温柔抚摸野狗向上袒露的肚皮，神情恍惚得自言自语着`,
          );
          await era.printAndWait(
            `「但是，已经不这么想了，${sc()}…比起神明，现在更想要侍奉狗狗大人…」`,
          );
          await era.printAndWait(
            `起身跨骑在野狗身上，${target_name}握住野狗勃起的阴茎对准自己的小穴`,
          );
          await era.printAndWait(
            `「已经这么精神了……狗狗大人，请收下吧，这是${sc()}的处子身…唔……」`,
          );
          await era.printAndWait(
            `湿润紧致的小穴艰难地吞下狗根，猩红的处子血混着爱液逐渐滴落在野狗的皮毛上`,
          );
          await era.printAndWait(
            `「啊啊……！！痛…好大…又好烫………哈…一颤一颤地跳动着……真可爱…♪」`,
          );
          await era.printAndWait(
            `${target_name}轻抚自己微微凸起的小腹喘息起来，上下起伏身体，慢慢套弄着野狗的阴茎`,
          );
          await era.printAndWait(
            `「哈啊…腰…开始自己就动起来了……肉棒好深…子宫口都咕噜咕噜的…♪」`,
          );
          await era.printAndWait(
            `在忍过开始的疼痛之后，${target_name}摇摆着腰肢，开始追求起交配的乐趣来`,
          );
          await era.printAndWait(
            `「啊～啊啊…即使怀孕也没关系哦…就这样把精子射进来吧，咿呀……！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「第一次是给小狗狗呢……」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「明明是想献给主人的……」`);
        } else {
          await era.printAndWait(`「呜呜呜……」`);
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「已经被玷污的身体还能够侍奉神明吗……？${sc()}一直在考虑着这些。」`,
          );
          await era.printAndWait(
            `${target_name}温柔抚摸野狗向上袒露的肚皮，神情恍惚得自言自语着`,
          );
          await era.printAndWait(
            `「但是，已经都无所谓了，${sc()}…比起神明，现在更想要侍奉狗狗大人…」`,
          );
          await era.printAndWait(
            `起身跨骑在野狗身上，${target_name}握住野狗勃起的阴茎对准自己的小穴`,
          );
          await era.printAndWait(
            `「已经这么精神了……狗狗大人，请收下吧，这是${sc()}身子…唔……」`,
          );
          await era.printAndWait(
            `湿润的小穴顺利地吞下狗根，透明的爱液逐渐滴落在野狗的皮毛上`,
          );
          await era.printAndWait(
            `「啊啊……！！好大…又好烫………哈…一颤一颤地跳动着……真可爱…♪」`,
          );
          await era.printAndWait(
            `${target_name}轻抚自己微微凸起的小腹喘息起来，上下起伏身体，慢慢套弄着野狗的阴茎`,
          );
          await era.printAndWait(
            `「哈啊…腰…开始自己就动起来了……肉棒好深…子宫口都咕噜咕噜的…♪」`,
          );
          await era.printAndWait(
            `${target_name}摇摆着腰肢，开始追求起交配的乐趣来`,
          );
          await era.printAndWait(
            `「啊～啊啊…即使怀孕也没关系哦…就这样把精子射进来吧，咿呀……！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「小狗狗没事吧」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「小狗狗……没事吧？」`);
        } else {
          await era.printAndWait(`「呜呜呜……」`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      era.set(`cflag:${target}:335`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:335`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「${sc()}的小穴是狗狗大人的专用小穴……舒服吗……♪」`,
          );
          await era.printAndWait(
            `${target_name}就像骑马一样跨在野狗身上，一点点把野狗的阴茎吞了进去`,
          );
          await era.printAndWait(`「啊啊……这种硬度…太棒了……嗯啊…」`);
          await era.printAndWait(
            `${target_name}舔着嘴唇前后扭动着腰，那副淫乱姿态已经看不出一点圣女的影子了`,
          );
          await era.printAndWait(
            `「哈……碰到子宫口了…啊…别……咿呀……都插进去了……！」`,
          );
          await era.printAndWait(
            `随着抽送而发出咕啾咕啾的声音，彻底开发的小穴完全容纳了粗大的狗根`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～、狗狗大人……${sc()}是变态母狗～♪　对不起～」`,
          );
          await era.printAndWait(
            `${target_name}骑在野狗身上贪求着快乐，飞出的爱液打湿了野狗肚子上的皮毛`,
          );
          await era.printAndWait(
            `「啊啊啊…为什么…能这么舒服……狗狗大人的精液…请全都射到${sc()}的子宫里…♪」`,
          );
          await era.printAndWait(
            `仿佛要把野狗的精液全部榨出来似的，${target_name}认着的动起了腰`,
          );
          await era.printAndWait(
            `「哈嗯啊啊…啊啊啊嗯…小穴好舒服……最喜欢狗狗大人的肉棒了…」`,
          );
        } else {
          await era.printAndWait(`「我要把狗狗大人的精液榨光～……♪」`);
          await era.printAndWait(
            `${target_name}跨起着野狗发出下流的宣言，一点也没有圣女该有的模样`,
          );
          await era.printAndWait(
            `「觉得舒服的话什么时候射都可以哦…让${sc()}怀上小狗崽吧…♪」`,
          );
          await era.printAndWait(
            `在野狗身上熟练的起伏身子，湿润的小穴愉快得吞吐着阴茎`,
          );
          await era.printAndWait(
            `「哈啊～好深…子宫口也想要了……狗狗大人…就这样插到子宫里吧～♪」`,
          );
          await era.printAndWait(
            `「嗯哈…就这样射到最深处……要来了…咿呀……！精子…好烫……！」`,
          );
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 7);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:335`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「小狗狗……好吧……」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「嗯……呼呜……小狗狗……」`);
        } else {
          await era.printAndWait(`「被小狗狗弄得有感觉了……这样下去……」`);
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 6);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:335`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「小狗狗……好吧……」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「嗯……呼呜……小狗狗……」`);
        } else {
          await era.printAndWait(`「被小狗狗弄得有感觉了……这样下去……」`);
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 5);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        ((era.get(`cflag:${target}:335`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「被狗弄得有感觉什么的……」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「不行……这样下去……」`);
        } else {
          await era.printAndWait(`「不会吧……这样下去……」`);
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 4);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        ((era.get(`cflag:${target}:335`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「…………我知道了」`);
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 3);
      } else if (
        (era.get(`cflag:${target}:335`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「讨厌、不要……绝对不要！」`);
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        era.set(`cflag:${target}:335`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if ((era.get(`cflag:${target}:338`) || 0) === 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「要舔小狗狗的屁股……！？」`);
      } else {
        await era.printAndWait(`「讨厌……讨厌、呜呜……」`);
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      era.set(`cflag:${target}:338`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) === 5 &&
        ((era.get(`cflag:${target}:338`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「狗狗大人的屁股好可爱……舒服吗♪」`);
          await era.printAndWait(
            `${target_name}把舌头伸进野狗的肛门舔舐并搅动着`,
          );
          await era.printAndWait(
            `「味道…有些奇怪呢……不过${sc()}会努力奉仕的…啾……」`,
          );
        } else {
          await era.print(`「哈啊哈啊…狗狗大人…果然很喜欢${sc()}的舌头吧～♪」`);
          await era.printAndWait(
            `${target_name}用舌尖探入野狗的肛门，仔细得爱抚着肠壁上的褶皱`,
          );
          await era.printAndWait(
            `「咕呣……咕呣…肠液…哈…流了好多…是舌头这样舔感觉很舒服吗……」`,
          );
          await era.printAndWait(
            `故意发出着下流的声音，${target_name}完全沉浸在侍奉野狗的快感中了`,
          );
        }
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 6);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        ((era.get(`cflag:${target}:338`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「屁股……舔过来舔过去～」`);
        await era.printAndWait(`${target_name}用舌头舔着野狗的肛门`);
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        ((era.get(`cflag:${target}:338`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「我只亲哦……？」`);
        await era.printAndWait(`${target_name}亲吻了野狗的肛门`);
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 4);
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        ((era.get(`cflag:${target}:338`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「屁股……让我亲一亲吧……」`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 3);
      } else if (
        (era.get(`cflag:${target}:338`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「呜呜呜……讨厌……狗屁股什么的……」`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        era.set(`cflag:${target}:338`, 2);
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if ((era.get(`cflag:${target}:344`) || 0) === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(`「究竟…要带${sc()}去哪里？」`);
        await era.printAndWait(
          `戴着眼罩的${target_name}显得很紧张，语气中充满了不安`,
        );
        await era.printAndWait(`「听到狗狗大人的声音了……！」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「什么……？　要干什么……？」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「什么……？　要干什么……？`);
      } else {
        await era.printAndWait(`「到底要干什么啊……住手……不要啊！！」`);
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      era.set(`cflag:${target}:344`, 1);
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 9 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「狗狗大人……会从哪边来呢……？　好期待……♪」`);
        await era.printAndWait(
          `「这种无法反抗的状态…和狗狗大人交尾的话……好棒…♪」`,
        );
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 10);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 8 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「啊哈……${sc()}、和小狗狗交尾了……」`);
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 9);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 7 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗来了吗……？　呜呼……」`);
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 8);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 6 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「有……有什么过来了……？」`);
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 7);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 5 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「主人……请随意享用……」`);
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 6);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 4 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗的气息……好近……」`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 5);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 3 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「小狗狗……？」`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 4);
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        ((era.get(`cflag:${target}:344`) || 0) <= 2 || era.get('flag:7') === 2)
      ) {
        await era.printAndWait(`「啊啊……来了呢……」`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 3);
      } else if (
        (era.get(`cflag:${target}:344`) || 0) <= 1 ||
        era.get('flag:7') === 2
      ) {
        await era.printAndWait(`「咿～咿～……咿～～」`);
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        era.set(`cflag:${target}:344`, 2);
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (
      era.get(`talent:${target}:136`) === 1 &&
      ((era.get(`cflag:${target}:338`) || 0) < 3 || era.get('flag:7') === 2)
    ) {
      await era.printAndWait(`「狗狗大人…怎么了？」`);
      await era.printAndWait(`看着即将离开的野狗，${target_name}不安的询问着`);
      await era.printAndWait(
        `「是已经累了吗？${sc()}…会一直祈祷能快些再见面的。」`,
      );
      await era.printAndWait(
        `满心依恋着野狗的${target_name}依依不舍地送走了野狗`,
      );
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      era.set(`cflag:${target}:444`, 4);
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      ((era.get(`cflag:${target}:338`) || 0) < 3 || era.get('flag:7') === 2)
    ) {
      await era.printAndWait(`「小狗狗……喘的好厉害……」`);
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      era.set(`cflag:${target}:444`, 3);
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      ((era.get(`cflag:${target}:338`) || 0) < 2 || era.get('flag:7') === 2)
    ) {
      await era.printAndWait(`「差不多该轮到主人了吧……」`);
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      era.set(`cflag:${target}:444`, 2);
    } else if (
      (era.get(`cflag:${target}:444`) || 0) < 1 ||
      era.get('flag:7') === 2
    ) {
      await era.printAndWait(`「好可怕……被狗那啥的」`);
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      era.set(`cflag:${target}:444`, 1);
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if ((era.get(`cflag:${target}:357`) || 0) === 0) {
      if (era.get(`tequip:${target}:53`)) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「大家好。你们过的还不错吧？　${sc()}不当勇者之后成为狗狗大人的雌犬奴隶了……♪」`,
          );
          await era.printAndWait(
            `「虽然不能再做勇者的工作了，不过作为雌犬存在的${sc()}现在感到非常的幸福」`,
          );
          await era.printAndWait(
            `「${sc()}真的非常喜欢狗狗大人……。接下来，请尽情欣赏${sc()}和狗狗大人之间爱的交尾吧」`,
          );
          await era.printAndWait(
            `「然后希望大家能从被淋满兽类精液的${sc()}身上感受到幸福♪」`,
          );
          await era.printAndWait(`「那么开始吧，狗狗大人……♪」`);
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「大家……好……${sc()}接下来要和这只小狗狗交尾……」`,
          );
          await era.printAndWait(
            `「也许和小狗狗做会有些怪、但还是希望各位能一边撸着大鸡鸡一边观赏吧」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「大家……好……${sc()}接下来要和这只小狗狗交尾……」`,
          );
          await era.printAndWait(
            `「也许和小狗狗做会有些怪、但还是希望各位能一边撸着大鸡鸡一边观赏吧」`,
          );
        } else {
          await era.printAndWait(
            `「你们好……${sc()}……接下来……要和这个小狗狗……呜呜～、救、救救我吧～」`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      era.set(`cflag:${target}:357`, 1);
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) === 1 &&
          ((era.get(`cflag:${target}:357`) || 0) <= 4 ||
            era.get('flag:7') === 2)
        ) {
          await era.printAndWait(
            `「再次见面了，大家过的还不错吧？大家对${sc()}的上一部的兽交作品感觉如何呢？」`,
          );
          await era.printAndWait(
            `「一定感觉很不错吧？毕竟这是${sc()}和狗狗大人爱的录像呢♪」`,
          );
          await era.printAndWait(
            `「${sc()}真的是全心全意爱着狗狗大人呢……。那么接下来，依旧是${sc()}和狗狗大人之间交尾转播」`,
          );
          await era.printAndWait(`「狗狗大人的肉棒，真的是最棒的了♪」`);
          await era.printAndWait(
            `「让大家看看你有多棒吧，${sc()}的狗狗大人……♪」`,
          );
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 5);
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          ((era.get(`cflag:${target}:357`) || 0) <= 3 ||
            era.get('flag:7') === 2)
        ) {
          await era.printAndWait(
            `「大家……好……${sc()}接下来要和这只小狗狗交尾……」`,
          );
          await era.printAndWait(
            `「也许和小狗狗做会有些怪、但还是希望各位能一边撸着大鸡鸡一边观赏吧」`,
          );
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 4);
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          ((era.get(`cflag:${target}:357`) || 0) <= 2 ||
            era.get('flag:7') === 2)
        ) {
          await era.printAndWait(
            `「大家……好……${sc()}接下来要和这只小狗狗交尾……」`,
          );
          await era.printAndWait(
            `「也许和小狗狗做会有些怪、但还是希望各位能一边撸着大鸡鸡一边观赏吧」`,
          );
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 3);
        } else if (
          (era.get(`cflag:${target}:357`) || 0) <= 1 ||
          era.get('flag:7') === 2
        ) {
          await era.printAndWait(
            `「你们好……${sc()}……接下来……要和这个小狗狗……呜呜～、救、救救我吧～」`,
          );
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          era.set(`cflag:${target}:357`, 2);
        }
      }
      return 0;
    }
  }

  return 0;
}

/* eslint-enable no-irregular-whitespace */

// 注册进分发族（TRYCALLFORM DOG_KOJO_0 的等价物）
dog_kojo_family.register(0, dog_kojo_0);

/**
 * @KOJO_MESSAGE_PALAMCNG_0（:6505-6754）：参数变动后口上。
 *
 * 六道守卫（:6510-6528）：助手调教 → 口塞 → 失神 → 崩坏 → 兽奸 → 触手 → 死斗场
 * （草稿缺死斗场？原文 :6527-6528 有，见产物）。之后按 PALAM 首次超过 LV2
 * （:6537-6710，CFLAG:221-228 记录首次）与处女丧失（:6715-6749，
 * CFLAG:229）触发首次口上；素质 85（爱慕）/76（淫乱）分档；selectcom
 * 50/51 给药分支。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function kojo_message_palamcng_0() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (era.get('tflag:899') || 0) {
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

  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量;
  if (
    p > (era.get('palamlv:2') || 0) &&
    (era.get(`cflag:${target}:221`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「还有这种黏糊糊的液体呢………」`);
        await era.printAndWait(`―――润滑度初次超过LV2了。`);
      } else {
        await era.printAndWait(
          `「啊～…嗯～…讨、讨厌…漏出来了…诶、这是用来润滑的东西吗…？」`,
        );
        await era.printAndWait(`―――润滑度初次超过LV2了。`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「咿呀～…又、又凉又湿的…感觉变的好奇怪………」`);
        await era.printAndWait(`―――润滑度初次超过LV2了。`);
      } else {
        await era.printAndWait(`「啊～哈啊啊…全部…湿掉了………」`);
        await era.printAndWait(`―――润滑度初次超过LV2了。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  p = (era.get(`palam:${target}:5`) || 0) + chara(target).train.欲情增量;
  if (
    p > (era.get('palamlv:2') || 0) &&
    (era.get(`cflag:${target}:222`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「哈呜～…就算不用这种药…啊啊～…身体～………」`);
        await era.printAndWait(`―――欲情初次超过LV2了。`);
      } else {
        await era.printAndWait(
          `「嗯～…那、那个…总觉得身体变的好烫…感觉好奇怪………」`,
        );
        await era.printAndWait(`―――欲情初次超过LV2了。`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「嗯～…不、不行…用了药的话…啊啊～」`);
        await era.printAndWait(`―――欲情初次超过LV2了。`);
      } else {
        await era.printAndWait(`「啊啊…身体好烫…心跳的好厉害平静不下来………」`);
        await era.printAndWait(`―――欲情初次超过LV2了。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  p = (era.get(`palam:${target}:8`) || 0) + chara(target).train.耻情增量;
  if (
    p > (era.get('palamlv:2') || 0) &&
    (era.get(`cflag:${target}:223`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊啊…不要再做这种羞人的事情了………」`);
      await era.printAndWait(`―――耻情初次超过LV2了。`);
    } else {
      await era.printAndWait(`「啊啊啊…好害羞…不要………」`);
      await era.printAndWait(`―――耻情初次超过LV2了。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  p = (era.get(`palam:${target}:10`) || 0) + chara(target).train.恐怖增量;
  if (
    p > (era.get('palamlv:2') || 0) &&
    (era.get(`cflag:${target}:224`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「咿～…不要再做…这么可怕的事情了…好可怕………」`);
      await era.printAndWait(`―――恐怖初次超过LV2了。`);
    } else {
      await era.printAndWait(`「咿～～～…！不、不要啊……！」`);
      await era.printAndWait(`―――恐怖初次超过LV2了。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if (
    (era.get(`nowex:${target}:0`) || 0) > 0 &&
    (era.get(`cflag:${target}:225`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「嗯哈啊啊～！…啊～啊啊啊…这就是…高潮…吗…♪」`);
      await era.printAndWait(
        `好像${target_name}因为对阴蒂的刺激而第一次达到了绝顶。`,
      );
    } else {
      await era.printAndWait(
        `「啊～啊啊～啊～！…好像一阵厉害的浪潮涌过来了…啊啊啊…啊………♪」`,
      );
      await era.printAndWait(
        `好像${target_name}因为对阴蒂的刺激而第一次达到了绝顶。`,
      );
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if (
    (era.get(`nowex:${target}:1`) || 0) > 0 &&
    (era.get(`cflag:${target}:226`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「啊～啊啊～…好像有什么要来了～～～…小穴里有什么要来了～～${heart(1)}」`,
      );
      await era.printAndWait(`「再用力欺负小穴～欺负小穴吧～～～${heart(1)}」`);
      await era.printAndWait(
        `「啊～啊啊～哈啊啊${heart(1)} 嗯嗯嗯嗯嗯～～～！！！！」`,
      );
      await era.printAndWait(
        `${target_name}因为初次的阴道高潮、露出了幸福的高潮脸………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊～啊啊～…哈、嗯呜唔～…啊…不行…再这样被插的话………」`,
      );
      await era.printAndWait(
        `「嗯咿～～♪要去了要去了～、小穴要去了～唔呜呜！」`,
      );
      await era.printAndWait(`「哈啊啊啊…小穴高潮了…感觉到了………」`);
      await era.printAndWait(
        `${target_name}初次用阴道绝顶的样子…她幸福的露出了放松的高潮脸………`,
      );
    } else {
      await era.printAndWait(
        `「啊～啊啊啊～！不行不行！再这样下去的话会变得奇怪的…」`,
      );
      await era.printAndWait(
        `「啊～啊啊啊～…小穴去了～去了～去了～呜呜呜呜呜呜${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}初次用阴道绝顶的样子…是注意到视线了吗、把身体靠向了${player_name}………`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if (
    (era.get(`nowex:${target}:2`) || 0) > 0 &&
    (era.get(`cflag:${target}:227`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「嗯唔～…啊～啊啊啊啊…不行～不行了…屁股…再这样欺负下去的话………」`,
      );
      await era.printAndWait(
        `「咿～～…咿～咿咿咿～…去了～…屁股…屁股眼…屁股眼去了～去了${heart(3)}」`,
      );
      await era.printAndWait(
        `「屁股眼要溶化了…屁股眼要溶化了呜呜呜～～～${heart(5)}」`,
      );
      await era.printAndWait(
        `${target_name}初次用肛门绝顶的样子、为了品尝到这种快乐以后会什么都愿做吧………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「竟、竟然要用这种地方高潮…不、不可以…不可以啊…啊啊～…要去了…」`,
      );
      await era.printAndWait(
        `「啊～…啊啊～…嗯呜唔～…屁股…屁股变的好奇怪…啊啊～不行了～………」`,
      );
      await era.printAndWait(
        `「咕～…呼啊啊～…啊啊～…啊啊～…嗯～！咕呜唔呜呜呜♪」`,
      );
      await era.printAndWait(
        `${target_name}初次用肛门绝顶的样子、脸色通红害羞的颤抖着身体………`,
      );
    } else {
      await era.printAndWait(
        `「呜啊啊～…不要～不要啊…明明…不想用那个地方…高潮的…」`,
      );
      await era.printAndWait(
        `「咿～咿～～…不要不要不要～…屁股…屁股去了～唔呜呜呜！！」`,
      );
      await era.printAndWait(
        `${target_name}初次用肛门绝顶的样子、一边流下了屈辱的眼泪一边又好像有点愉悦的样子………`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if (
    (era.get(`nowex:${target}:3`) || 0) > 0 &&
    (era.get(`cflag:${target}:228`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊啊～…厉…厉害～…乳房竟然能这么的舒服～…♪」`);
      await era.printAndWait(
        `${target_name}由于对胸部的刺激初次达到绝顶的样子………`,
      );
    } else {
      await era.printAndWait(
        `「啊～啊啊～啊啊啊啊…乳房…好舒服…呢………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}由于对胸部的刺激初次达到绝顶的样子………`,
      );
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  let a = chara(target).train.反感增量 + chara(target).train.不快增量;
  if (
    game.train.处女丧失 === 1 &&
    (era.get(`cflag:${target}:229`) || 0) === 0
  ) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (a < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「哈啊～…哈啊～…嗯～…额呵呵…把处女献给主人好开心………♪」`,
        );
        await era.printAndWait(
          `「从今以后…请更加尽兴地玩弄${sc()}的小穴吧${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}露出淫荡的表情抱住了你………`);
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (a < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(
          `「哈啊～…哈啊～…嗯～…额呵呵…把处女献给主人好开心………♪」`,
        );
        await era.printAndWait(
          `「从今以后…${sc()}会在这里、全心全意的奉仕您的…♪」`,
        );
        await era.printAndWait(`${target_name}露出开心的表情抱住了你………`);
      } else {
        await era.printAndWait(
          `「这样一来…已经…${sc()}就…呜呜～…呜～…呜呜………」`,
        );
        await era.printAndWait(`${target_name}不去看你的脸低下头泣不成声………`);
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊…明明想让…主人的大肉棒来破处的」`);
      } else if (!(era.get(`talent:${target}:85`) === 1)) {
        await era.printAndWait(
          `「哈啊哈啊…这么一来……${sc()}就…再也不是圣女了………」`,
        );
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

// @KOJO_MESSAGE_MARKCNG_0

/**
 * @KOJO_MESSAGE_MARKCNG_0（:6756-6826）：刻印取得后口上。
 *
 * 六道守卫（:6759-6774）：助手调教 → 口塞 → 失神 → 兽奸 → 触手 → 崩坏。
 * 按刻印变动 TFLAG:21-24 == 3（取得）触发首次口上（CFLAG:297-300 记录）。
 *
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function kojo_message_markcng_0() {
  const target = era_flag.target;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (era.get('tflag:899') || 0) {
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

  if (
    game.system.苦痛刻印变动 === 3 &&
    (era.get(`cflag:${target}:297`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「咕呜～…呜～…啊啊啊…痛…好痛…咕呜呜………」`);
    } else {
      await era.printAndWait(`「痛…好痛哦…求求你…不要…再这样下去了………」`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (
    game.system.快乐刻印变动 === 3 &&
    (era.get(`cflag:${target}:298`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊～啊啊～…身体里感觉好舒服～…啊～啊啊～哈啊啊～♪」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊～啊～哈啊啊啊…这、这是怎么回事…好爽啊～…好奇怪…呢………」`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (
    game.system.屈服刻印变动 === 3 &&
    (era.get(`cflag:${target}:299`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊～啊啊啊…${sc()}是…绝对…不会反抗的…所以………」`,
      );
    } else {
      await era.printAndWait(`「不行了…真的…没法…反抗了………」`);
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (
    game.system.反抗刻印变动 === 3 &&
    (era.get(`cflag:${target}:300`) || 0) === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「呜～…咕～…过份…太过份了！」`);
    } else {
      await era.printAndWait(`「为什么…做…这种事…呜！」`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

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

  // 死斗场中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_0(rand);
    return 0;
  }
  // 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // 兽奸PLAY中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_0(rand);
    return 0;
  }
  // 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // IF SELECTCOM == 0（爱抚）。其余指令分支随后续切片

  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait('「啊啊…我会、老实的…所以…啊～啊啊～！」');
        await era.printAndWait(`${target_name}乖乖的被你爱抚着身体………`);
      } else {
        await era.printAndWait('「你的爱是虚假的」');
        await era.printAndWait(`${target_name}紧锁眉头、蜷缩着身体………`);
      }
      kojo.爱抚 = 1;
      return 0;
    }

    // 二回目以降

    // 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊～…额呵呵…那个地方…再多摸摸…${heart(1)}」`);
      await era.printAndWait(`只是稍微摸了摸${target_name}她就把持不住了………`);
      kojo.爱抚 = 6;
    } else if (
      // 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「再来…请把我揉得乱七八糟吧……！」');
      await era.printAndWait(
        `${target_name}像引诱${player_name}的手似的扭着身体………`,
      );
      kojo.爱抚 = 5;
    } else if (
      // 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…哈啊…啊啊啊～」');
      await era.printAndWait(`${target_name}的嘴里呼着热气………`);
      kojo.爱抚 = 4;
    } else if (
      // 屈服刻印Lv2
      mark(2) === 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「才不会…觉得舒服呢！　绝对不会！」');
      await era.printAndWait(`${target_name}扭动着身体忍耐着的样子………`);
      kojo.爱抚 = 3;
    } else if (
      // それ以外（MARK:2 <= 1）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「…好恶心」');
      await era.printAndWait(`${target_name}叹了口气………`);
      kojo.爱抚 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 1（舔阴，CFLAG:302）
  if (era_flag.selectcom === 1) {
    // 初めて（CFLAG:302 == 0）

    if (kojo.舔阴 === 0) {
      // 处女（TALENT:0）
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait('「你、你在舔哪里啊～」');
        await era.printAndWait(`${target_name}的私处处有着处女的味道………`);
      } else {
        await era.printAndWait('「请住手吧…不要舔那个地方！」');
      }
      kojo.舔阴 = 1;
      return 0;
    }

    // 二回目以降

    // 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来～…再舔我那里吧…喝下去也行…啊啊～～${heart(1)}」`,
      );
      await era.printAndWait(`蜜汁从${target_name}的私处处不断涌了出来………`);
      kojo.舔阴 = 5;
    } else if (
      // 爱慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈哈～…好吃吗？　这个…♪」');
      await era.printAndWait(`${target_name}腼腆的笑着发出快乐的声音………`);
      kojo.舔阴 = 4;
    } else if (
      // 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「呜唔呜唔…呜呜～！　不要～」');
      await era.printAndWait(
        `${target_name}嘴上说着不要但还是老实地让你舔着………`,
      );
      kojo.舔阴 = 3;
    } else if (
      // それ以外（屈服刻印Lv3未満）
      kojo.舔阴 <= 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait('「这么脏的地方也…」');
      kojo.舔阴 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 2（肛门爱抚，CFLAG:303）
  if (era_flag.selectcom === 2) {
    const train = chara(target).train;

    const a_insensible = era.get(`talent:${target}:105`);
    const a_sense = era.get(`abl:${target}:3`) || 0;

    // 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      await era.printAndWait('「讨厌！　难、难以置信！」');
      kojo.肛门爱抚 = 1;
      return 0;
    }

    // 二回目以降
    // P = PALAM:3 + UP:3

    const p = train.润滑 + train.润滑增量;

    // 淫乱+润滑Lv2以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊呜～…好棒～！再来…往深处挖！往深处抠！」');
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        );
      }
      await era.printAndWait(`${target_name}每当被抠弄肛门就会发出娇喘………`);
      kojo.肛门爱抚 = 7;
    } else if (
      // 淫乱+润滑Lv2未満
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～～…明明还不够湿…不过这样也好棒${heart(1)}」`,
      );
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………`,
        );
      }
      kojo.肛门爱抚 = 6;
    } else if (
      // 爱慕+润滑Lv2以上
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「再、再多疼爱一下屁股眼吧！」');
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        );
      }
      await era.printAndWait(
        `${target_name}每当被抠弄肛门就会发出不成体统的呻吟………`,
      );
      kojo.肛门爱抚 = 5;
    } else if (
      // 爱慕+润滑Lv2未満
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「突、突然做什么呢！？」');
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、虽然还不够润滑但也能享受起你的爱抚………`,
        );
      }
      kojo.肛门爱抚 = 4;
    } else if (
      // 润滑Lv2以上＋A感覚Lv3以上
      p >= PALAMLV[2] &&
      a_sense >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「难以置信…${sc()}…的屁股…啊～…啊啊～！」`);
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门已经被完全开发好了、张得大大的。`,
        );
      }
      await era.printAndWait(`${target_name}因为肛门的快感而神情迷醉………`);
      kojo.肛门爱抚 = 3;
    } else if (
      // それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満）
      kojo.肛门爱抚 <= 1 ||
      game.kojo.口上开关 === 2
    ) {
      await era.printAndWait('「不要啊…够了、快住手～！」');
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(`${target_name}钝感的肛门被刺激得红肿了起来………`);
      }
      kojo.肛门爱抚 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 3（自慰，CFLAG:304）
  if (era_flag.selectcom === 3) {
    const masturbation_addiction = era.get(`abl:${target}:31`) || 0;
    const filming = era.get(`tequip:${target}:53`);
    const has_penis =
      era.get(`talent:${target}:122`) || era.get(`talent:${target}:121`);

    // 初めて（CFLAG:304 == 0）
    if (kojo.自慰 === 0) {
      // 爱＆淫乱
      if (
        era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「啊啊…请多多的…欣赏吧…♪」');
      } else {
        await era.printAndWait('「你是…恶魔」');
        await era.printAndWait(`${target_name}一副要哭出来的样子继续自慰着………`);
      }
      kojo.自慰 = 1;
      return 0;
    }

    // 二回目以降

    // 淫乱＋处女
    if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咿～～…呀呜呜～～…主人～…快点把${sc()}的淫乱处女膜夺走吧！夺走吧～～～～！！」`,
      );
      await era.printAndWait(
        `「不管是用狗～！还是用怪物～！什么都好～！把${sc()}的小穴捣进去吧～～～！」`,
      );
      await era.printAndWait(
        `${target_name}的脸上已经再也找不到一丝被称作圣女时候的清纯痕迹了………`,
      );
      kojo.自慰 = 9;
    } else if (
      // 淫乱＋自慰中毒Lv3以上
      era.get(`talent:${target}:76`) === 1 &&
      masturbation_addiction >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 撮影中
      if (filming) {
        // 原作是一整行：:887 的 PRINTFORM、鸡鸡分档（:889/:891）与
        // 的 PRINTFORMW 收行都不换行（#624）
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「看吧～${heart(1)}　噗咻噗咻勃起的` +
            (has_penis ? '鸡鸡～' : '假鸡鸡～') +
            `${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}今天也是情绪高涨！请大家一起看我做舒服的事吧～${heart(1)}」`,
        );
      } else if (rand_n(3) === 0) {
        await era.printAndWait(
          `「小穴…好爽…啊啊～…飞起来了～飞起来了～${heart(1)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait('「平时一个人是怎么做的…就让你好好看看吧…」');
      } else {
        await era.printAndWait(
          `「啊～啊～…搅着搅着小穴里的淫水就止不住了啊啊啊～${heart(1)}」`,
        );
      }
      kojo.自慰 = 8;
    } else if (
      // 淫乱＋自慰中毒Lv3未満
      era.get(`talent:${target}:76`) === 1 &&
      masturbation_addiction < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊～～…明明在主人的眼前～…卖力自慰后请赏我大肉棒吧～～～${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          '「嗯～…咕呜唔～…啊～啊啊啊～…小穴玩得停不下来了～…对不起～～！」',
        );
      }
      kojo.自慰 = 7;
    } else if (
      // 爱＋处女
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊…啊啊～、快看…我在玩弄主人专用的专属小穴…！」',
      );
      await era.printAndWait(
        `「哦～…哦哦～…感觉处女膜也在一颤一颤的呢…${heart(1)}」`,
      );
      kojo.自慰 = 6;
    } else if (
      // 爱＋自慰中毒Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      masturbation_addiction >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 撮影中
      if (filming) {
        // 与上一支同型：PRINTFORM + 鸡鸡分档 + PRINTFORMW 收行（#624）
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          '「看见了吗？～♪　噗咻噗咻勃起的' +
            (has_penis ? '鸡鸡……' : '假鸡鸡') +
            '♪」',
        );
        await era.printAndWait(
          `「${sc()}呐，只有有爱的话，在大家面前也不觉得尴尬了……♪」`,
        );
      } else if (rand_n(3) === 0) {
        await era.printAndWait('「好、爽～！　啊哈哈…哈哈…好爽～！」');
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「看吧！　看看下贱的${sc()}…看看自慰地发狂的${sc()}、再多看我吧！」`,
        );
      } else {
        await era.printAndWait('「这样…完全不够呢…还要…你的…啊啊～♪」');
      }
      kojo.自慰 = 5;
    } else if (
      // 爱＋自慰中毒Lv3未満
      era.get(`talent:${target}:85`) === 1 &&
      masturbation_addiction < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait('「被看着…虽然很害羞、不过太舒服了～！」');
      } else {
        await era.printAndWait('「哈啊…哈啊…啊啊～」');
      }
      kojo.自慰 = 4;
    } else if (
      // 屈服刻印Lv3+自慰中毒Lv1以上
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      masturbation_addiction >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait('「如果这是你希望的话…」');
      } else {
        await era.printAndWait('「就照你说的做吧…」');
      }
      kojo.自慰 = 3;
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait('「好难为情…」');
      } else {
        await era.printAndWait('「真讨厌…」');
      }
      kojo.自慰 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 5（胸爱抚，CFLAG:306）
  if (era_flag.selectcom === 5) {
    const milk_body =
      era.get(`talent:${target}:130`) === 1 &&
      (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&
      !era.get(`tequip:${target}:16`) &&
      !era.get(`tequip:${target}:15`);
    const b_insensible = era.get(`talent:${target}:107`);
    const b_sense = era.get(`abl:${target}:1`) || 0;

    // 初めて（CFLAG:306 == 0）
    if (kojo.胸爱抚 === 0) {
      // 母乳体质
      if (milk_body) {
        // 爱＆淫乱
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「吸吧～！${sc()}的乳房～…请你吮吸并品尝母乳吧～…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            '「啊啊啊～…乳房被吸了…不要啊～…呜啊…啊啊～！」',
          );
          // B鈍感
          if (b_insensible) {
            await era.printAndWait(
              `${target_name}钝感的乳头被吸吮着、被刺激的红肿起来………`,
            );
          }
        }
      } else if (
        // 爱＆淫乱
        era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1
      ) {
        await era.printAndWait('「请你随心所欲的揉吧…♪」');
      } else {
        await era.printAndWait('「讨厌、变态！」');
        // B鈍感
        if (b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被吸吮着、被刺激的红肿起来………`,
          );
        }
      }
      kojo.胸爱抚 = 1;
      return 0;
    }

    // 二回目以降
    // 母乳体质
    if (milk_body) {
      // 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人～…再吸吧～…乳房一被吸…就好像要去了似的呢～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一颤一颤的痉挛着往${player_name}的嘴里喷出母乳、沉浸在快乐之中………`,
        );
        kojo.胸爱抚 = 5;
      } else if (
        // 爱慕
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人～…再吸吧～…吸${sc()}的奶来恢复精神吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像慈母般微笑着看着吮吸着乳头的${player_name}、摸着${player_name}的头………`,
        );
        kojo.胸爱抚 = 4;
      } else if (
        // B感覚Lv3以上
        b_sense >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          '「啊啊～…这、这样吸下去的话…噫～…这可是小宝宝吸的…东西啊…啊啊～♪」',
        );
        await era.printAndWait(
          `${target_name}每当乳头溢出母乳就会沉浸在愉悦之中………`,
        );
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          '「啊啊～…饶了我吧～！乳房…不要吸乳房啊～…啊～啊啊～！」',
        );
        await era.printAndWait(
          `${target_name}的乳头溢出了母乳、渐渐沉溺于母乳流出所带来的炽热快感中………`,
        );
        kojo.胸爱抚 = 2;
      }
    } else if (
      // 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来～…虽然很痛但也被弄得好舒服呢…啊啊${heart(1)}」`,
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、被含进嘴里舔得完全勃起了………`,
        );
      }
      kojo.胸爱抚 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「手好温暖…啊啊…好舒服啊…${heart(1)}」`);
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、鼓鼓胀胀地完全勃起了………`,
        );
      }
      kojo.胸爱抚 = 4;
    } else if (
      // B感覚Lv3以上
      b_sense >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「好有感觉…真舒服…」');
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、被刺激得勃了起来………`,
        );
      }
      kojo.胸爱抚 = 3;
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「虽然被这样揉很疼…咕呜～」');
      // B鈍感
      if (b_insensible) {
        await era.printAndWait(`${target_name}钝感的乳头被刺激得红肿起来………`);
      }
      kojo.胸爱抚 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 6（接吻，CFLAG:307）
  if (era_flag.selectcom === 6) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const first_kiss = game.train.初吻与自我口上;
    const master_play =
      !era_flag.assiplay &&
      !era.get(`tequip:${target}:89`) &&
      !era.get(`tequip:${target}:90`);

    // 初吻（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && first_kiss) {
      // 淫乱かつ主人
      if (era.get(`talent:${target}:76`) === 1 && master_play) {
        await era.printAndWait(
          `「啊～～…嗯啾…啾～…嘞咯～…嘞噗～啾～啾～～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在初吻时就用难以想象的热情与${master_name}激吻中………`,
        );
        await era.printAndWait(
          `「哈啊啊～…再来…早该这样了…呐、再多和我…亲吻一会儿吧${heart(1)}」`,
        );
        if (hometown_lover) {
          await era.printAndWait(
            `痴痴笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1 && master_play) {
        // 爱かつ主人
        await era.printAndWait(
          `「嗯～…嗯唔…那、那个…这是…${sc()}的初吻…所以…那个…」`,
        );
        await era.printAndWait(`${target_name}忸忸怩怩很害羞的样子。`);
        await era.printAndWait(
          `「啊哈哈…${heart(1)}………那个…你要负起…责任哦？」`,
        );
        if (hometown_lover) {
          await era.printAndWait(
            `这样微笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait(`「啊～…啊啊…${sc()}的第一次…就这样…没了吗！」`);
        await era.printAndWait(
          `${player_name}饶有兴致的品味着${target_name}的唇………`,
        );
        if (hometown_lover) {
          await era.printAndWait('（啊啊…对不起…对不起………）');
          await era.printAndWait(`${target_name}想起故乡的恋人流下了眼泪………`);
        }
      }
      kojo.接吻 = 1;
      return 0;
    }

    // （調教では）初めて（CFLAG:307 == 0）
    if (kojo.接吻 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯啾…啾…噗呼…嘞咯～…哈啊…再来…我还想再接吻…${heart(1)}」`,
        );
        if (hometown_lover) {
          await era.printAndWait(
            `痴痴笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「嗯…啾…哈啊啊…感觉到爱了…那个、可以再来一次吗？」',
        );
        if (hometown_lover) {
          await era.printAndWait(
            `这样微笑着的${target_name}脑子里已经没有故乡恋人的存在了吧………`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait('「嗯～！…嗯咕～…咕呜呜…好、好恶毒………」');
        if (hometown_lover) {
          await era.printAndWait('（啊啊…对不起…对不起………）');
          await era.printAndWait(`${target_name}想起故乡的恋人流下了眼泪………`);
        }
      }
      kojo.接吻 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯嘞咯～♪…啾～…啾噗…啾～…嗯～…请再多吻我吧…${heart(1)}」`,
      );
      kojo.接吻 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊啊…喜欢…好喜欢…不、我只是说喜欢接吻罢了…啊～～♪」',
      );
      await era.printAndWait(
        `${player_name}如${target_name}所愿、不断地接吻着………`,
      );
      kojo.接吻 = 4;
    } else if (
      // 顺从Lv2以上
      (era.get(`abl:${target}:10`) || 0) >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯～…哈啊啊…这、这样就可以了吧？…啊～、不要～…嗯嗯呜～！」',
      );
      kojo.接吻 = 3;
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「嗯～…咕～…」');
      await era.printAndWait(`${target_name}把唇移开、不好意思的躲闪着视线………`);
      kojo.接吻 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 7（自己扒开，CFLAG:308）
  if (era_flag.selectcom === 7) {
    // 初めて（CFLAG:308 == 0）
    if (kojo.自己扒开 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「好的～…张开啦～${heart(1)}…怎么样呢…${sc()}的淫乱小穴…因为想要主人的大肉棒、大大的张开了哦～${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「虽、虽然很害羞…如果是主人的命令的话…啊～～…讨厌…爱液流出来了～～………嗯」',
        );
      } else {
        // それ以外（爱無し）
        await era.printAndWait('「咕呜…这、这样…是不对的…」');
      }
      kojo.自己扒开 = 1;
      return 0;
    }

    // 二回目以降

    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊哈～…主人～…请再多多的…往里面看吧～…这里已经迫不及待地想被小鸡鸡插来插去了呢${heart(1)}」`,
      );
      kojo.自己扒开 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊…不要老是盯着这里看嘛…一被主人看着里面…${scf()}、${sc()}…就好有感觉…要变得…奇怪了～」`,
      );
      kojo.自己扒开 = 4;
    } else if (
      // 露出癖Lv3以上
      (era.get(`abl:${target}:17`) || 0) >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊～好有感觉～…小穴被看着好有感觉啊………」');
      kojo.自己扒开 = 3;
    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱無し、露出癖Lv3未満）
      await era.printAndWait('「咕呜～…求你了…别看了…不要看那种地方…」');
      kojo.自己扒开 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 8（插入手指，CFLAG:309）
  if (era_flag.selectcom === 8) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    // 初めて（CFLAG:309 == 0）
    if (kojo.插入手指 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊～…嗯咕～…再继续…往里面插…尽情蹂躏${sc()}的阴道吧…${heart(1)}」`,
        );
      } else if (
        // 屈服刻印Lv3+爱
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait('「好、好的…我会忍耐的…请再往里面插…」');
        await era.printAndWait('「呀～～…啊啊…是的、没问题…啊啊～♪」');
      } else {
        // それ以外
        await era.printAndWait('「哈呜～…咕～…呜唔…啊…住手…住手啊…啊～…！」');
        // V鈍感
        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、${target_name}好像很痛苦的呻吟着………`,
          );
        }
      }
      kojo.插入手指 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊～再往里面插吧！把小穴弄得湿漉漉的吧！」');
      // V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、贪婪的吞下了${player_name}所有的爱抚………`,
        );
      }
      kojo.插入手指 = 5;
    } else if (
      // 爱＋屈服刻印Lv3
      era.get(`talent:${target}:85`) === 1 &&
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～…嗯～…主人的手指…好温柔…咿呀～～！啊～！那里是～！」',
      );
      await era.printAndWait('「………你、你欺负人啊…啊啊～！」');
      // V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、完全接受了${player_name}的爱抚………`,
        );
      }
      kojo.插入手指 = 4;
    } else if (
      // 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「我不会反抗的、所以…再温柔一点…咕呜…嗯呜唔…啊～啊啊～！」',
      );
      // V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、${target_name}不成体统的挺着腰………`,
        );
      }
      kojo.插入手指 = 3;
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        `「啊啊～…住、住手…即使被做了这样的事${sc()}也…咕呜～」`,
      );
      // V鈍感
      if (v_insensible) {
        await era.printAndWait(
          `因为${target_name}的私处不太容易有感觉、每次在里面摩擦${target_name}就会痛苦的呻吟起来………`,
        );
      }
      kojo.插入手指 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 9（舔肛，CFLAG:310）
  if (era_flag.selectcom === 9) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    // 初めて（CFLAG:310 == 0）
    if (kojo.舔肛 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「咿呀～～…那、那种地方被舐了的话…呜啊～…啊啊～…还要…再舐舐吧…」',
        );
        // A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得发出了非常带感的声音………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「那、那里很脏啊…太羞人了…请、请住手吧…咕呜呜～～」',
        );
        // A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得娇喘起来………`,
          );
        }
      } else {
        // それ以外（爱無し）
        await era.printAndWait('「噫～！那、那种地方被舐了的话…不、不要啊～」');
        // A鈍感
        if (a_insensible) {
          await era.printAndWait(
            `${target_name}不知是不是真的因为肛门被舔而感到难过发出了高亢的悲鸣声………`,
          );
        }
      }
      kojo.舔肛 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咿呀呜～…啊啊…主人～…再…再用舌头舔我吧～${heart(1)}」`,
      );
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得发出了非常带感的声音………`,
        );
      }
      kojo.舔肛 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～～…嗯唔～…啊啊～…再、再温柔一点…舐的话…就更好了…哈啊～♪」',
      );
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得娇喘出声………`,
        );
      }
      kojo.舔肛 = 4;
    } else if (
      // 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「咕呜～…呜～…！…没、没事的、所以…请再…舔我吧…嗯嗯～！」',
      );
      // A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发了、被${player_name}的舌头搅得发出了快乐的声音………`,
        );
      }
      kojo.舔肛 = 3;
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait('「讨厌…明明很脏…咿～…请饶了我吧…」');
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}不知是不是真的因为肛门被舔而感到难过、发出了悲鸣声………`,
        );
      }
      kojo.舔肛 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 10（振动宝石，CFLAG:311）
  if (era_flag.selectcom === 10) {
    // 初めて（CFLAG:311 == 0）
    if (kojo.振动宝石 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「咕呼呜～…这样的震动太美妙了…再来…再继续按在那里～${heart(1)}」`,
        );
      } else if (
        // 屈服刻印Lv3+爱
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait('「啊～…嗯～…没、没事的、再来…请尽情使用吧…♪」');
      } else {
        // それ以外
        await era.printAndWait('「咿呀～…这、这到底是什么东西…咿呀啊～！？」');
      }
      kojo.振动宝石 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～～…嗯～…呜呼…啊啊啊～！我还要更多、更多～！」',
      );
      await era.printAndWait(`${target_name}扭着腰身因为愉悦而颤抖不已………`);
      kojo.振动宝石 = 5;
    } else if (
      // 爱＋屈服刻印Lv3
      era.get(`talent:${target}:85`) === 1 &&
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「咿～…呜～…啊…哈啊～…请再…继续吧…这东西…真厉害啊…嗯～」',
      );
      await era.printAndWait(
        `${target_name}像为了忍耐阴核的震动似的蜷曲着身体………`,
      );
      kojo.振动宝石 = 4;
    } else if (
      // 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊…啊～…啊呜～…嗯、这样子…感觉变的好舒服啊…咿呀～～！」',
      );
      kojo.振动宝石 = 3;
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        '「哈啊～…啊～～…嗯～…啊…啊呜呜～…再、再这样下去的话…」',
      );
      kojo.振动宝石 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 11 && TEQUIP:11（壶虫开始，CFLAG:312）
  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    // 初めて（CFLAG:312 == 0）
    if (kojo.壶虫 === 0) {
      // 处女
      if (era.get(`talent:${target}:0`) === 1) {
        // 淫乱
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('「咕呜…啊啊～…渐渐地钻进…小穴里面去了………」');
          await era.printAndWait(
            '「主人的小鸡鸡…明明一直在等待着…明明一直在等待着…结果就这样…」',
          );
          await era.printAndWait(`${target_name}有点悲伤地忍耐着破瓜的疼痛………`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            '「哈咕呜～…没、没事的…一点也不痛…咕…呜呜～！」',
          );
          await era.printAndWait(`${target_name}咬牙忍耐着破瓜的痛楚………`);
          await era.printAndWait('「哈啊…哈啊…下次…想要…………主人的…东西………」');
        } else {
          // それ以外
          await era.printAndWait('「哈啊…哈啊…啊啊…好狠心…好狠心啊…啊咕呜…」');
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 非处女＋淫乱
        await era.printAndWait(
          '「啊啊～！这样被张开…好厉害啊…在里面蠕动着…啊～啊～啊啊啊！」',
        );
        // V感覚Lv3以上＋V鈍感
        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 非处女＋爱慕
        await era.printAndWait(
          `「这、这东西在${sc()}的阴道里…啊啊～…好厉害…这种感觉…还是第一次…♪」`,
        );
        // V感覚Lv3以上＋V鈍感
        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处已经被完全开发了、把壶虫连根吞了进去………`,
          );
        }
      } else {
        // 非处女＋それ以外
        await era.printAndWait(
          `「啊～！不、不要！在${sc()}的里面蠕动着…咿咿咿咿～！」`,
        );
        // V鈍感
        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、被壶虫连根插入的${target_name}好像很痛苦似的呻吟着………`,
          );
        }
      }
      kojo.壶虫 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～…！不要…讨厌…明明是虫子而已…竟然会这么爽…要、要死了…咕呜呜～${heart(1)}」`,
      );
      // V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………`,
        );
      }
      kojo.壶虫 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「好…吧…请把${sc()}的这里…弄得更加一塌糊涂吧…♪」`,
      );
      // V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、好像很愉快似的轻松把壶虫连根吞了进去………`,
        );
      }
      kojo.壶虫 = 4;
    } else if (
      // V感覚Lv3以上
      v_sense >= 3 &&
      (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「不、不对…怎么会这么舒服…腰…都舒服的动不了了…啊啊～不对啊～」',
      );
      // V感覚Lv3以上＋V鈍感
      if (v_insensible) {
        await era.printAndWait(
          `${target_name}钝感的私处已经被完全开发了、把壶虫连根吞了进去………`,
        );
      }
      kojo.壶虫 = 3;
    } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「咕呜～…啊～…咿～～…不、不要～…」');
      // V鈍感
      if (v_insensible) {
        await era.printAndWait(
          `因为${target_name}的私处不太容易有感觉、被壶虫连根插入的${target_name}好像很痛苦似的呻吟着………`,
        );
      }
      kojo.壶虫 = 2;
    }
    return 0;
  }

  // ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0（壶虫脱着，CFLAG:372）
  if (era_flag.selectcom === 11 && !era.get(`tequip:${target}:11`)) {
    // 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊啊…下次…要把什么插进来呢…？」');
      kojo.壶虫着脱 = 3;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「咕呜嗯～…下次想要…主人的东西…」');
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「哈啊…哈啊…啊啊…大张的小穴空出来了…」');
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 12（振动杖，CFLAG:313）
  if (era_flag.selectcom === 12) {
    // 初めて（CFLAG:313 == 0）
    if (kojo.振动杖 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「咿呀～…呀～…啊哈～！讨、讨厌！那里好痒啊～」',
        );
        await era.printAndWait(
          `每当振动杖按在${target_name}的两腿之间就会带来极度刺激的快感。`,
        );
        await era.printAndWait('………');
        await era.printAndWait('……');
        await era.printAndWait('…30分后');
        await era.printAndWait(
          '「哈啊啊呼…嗯……咕呜～…好…好了…嗯…求…求、求求你…不…不…不要…再…继…继续、下…去……去…了啊啊啊啊！」',
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「魔、魔族的道具里还有这样的奇怪玩意儿吗…啊呜～！？」',
        );
        await era.printAndWait(
          '「诶、诶、什、什么啊这是…好厉害的震动…呀呜～！？咿～！」',
        );
      } else {
        // それ以外
        await era.printAndWait(
          `「无、无论你对${sc()}做什么…呀～！…只、只不过是有点痒罢了…咿呀呜～！？」`,
        );
      }
      kojo.振动杖 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「好的～…可以哦…请用这个色情的杖来欺负${sc()}吧…${heart(1)}」`,
      );
      await era.printAndWait(
        '「咕呜嗯～…啊～啊哈～…啊啊～！麻麻的好厉害啊～！」',
      );
      kojo.振动杖 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯咕～…啊～啊哈～…请…请继续…主人～…♪」');
      await era.printAndWait(
        `「啊啊啊～啊…啊～好…好舒服…好…舒…服…啊…啊呜呜…呜…${heart(1)}」`,
      );
      kojo.振动杖 = 4;
    } else if (
      // 屈服刻印Lv3
      (era.get(`mark:${target}:2`) || 0) === 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～啊啊～…明明被用这种东西玩弄…但是好舒服…啊啊～！啊～～！」',
      );
      kojo.振动杖 = 3;
    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        '「啊～…啊啊～…这样…好有感觉、不要…不要啊…咕呜嗯～」',
      );
      kojo.振动杖 = 2;
    }
    return 0;
  }

  // IF SELECTCOM == 13 && TEQUIP:13（肛门虫开始，CFLAG:314）
  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;
    const filming = era.get(`tequip:${target}:53`);

    // 初めて（CFLAG:314 == 0）
    if (kojo.肛门虫 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「啊啊～…连尻穴里都被虫子钻进去了…好棒…额呵呵…」',
        );
        await era.printAndWait(
          `曾被称作圣女的${target_name}脑袋里已经被淫欲所污染了………`,
        );
        // A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `于是${target_name}钝感的肛门被快乐所开发、由于肛门虫的刺激而发出了很带感的呻吟声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「没、没事的…这、这种程度完全能够承受的下来…啊呜呜…咕～…」',
        );
        // A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被快乐所开发、由于肛门虫的刺激而娇喘出声………`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait(
          '「咿呀～…那、那里不能进去～！不能进去啊～！啊啊啊！」',
        );
        // A鈍感
        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被肛门虫蠕动着钻了进去、${target_name}发出了悲鸣………`,
          );
        }
      }
      kojo.肛门虫 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱＋A感覚Lv3以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (filming) {
        // 撮影中
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「请看吧${heart(1)}　这么粗的蠕虫要插进${sc()}屁股眼里去了哦～${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}妖艳的那期蠕虫、舔了舔嘴唇。`);
      } else {
        await era.printAndWait(
          '「啊咿～…啊～啊～啊啊啊啊！屁股眼～！屁股眼好舒服～！再往里钻吧～～！」',
        );
      }
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被调教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声………`,
        );
      }
      kojo.肛门虫 = 6;
    } else if (
      // 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「虫子…在…里面……～！动着…要变的…变的…奇怪了啊啊～～${heart(1)}」`,
      );
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}还很钝感的肛门被肛门虫蠕动着钻了进去、${target_name}好像很开心的晃着屁股作为回应………`,
        );
      }
      kojo.肛门虫 = 6;
    } else if (
      // 爱＋A感覚Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
    ) {
      if (filming) {
        // 撮影中
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「见请看吧♪　这么粗的蠕虫要被${sc()}的屁股眼吞下去了呦♪」`,
        );
        await era.printAndWait(
          `${target_name}抱起一抖一抖的扭动着的蠕虫、妖艳的笑着。`,
        );
      } else {
        await era.printAndWait(
          '「啊～啊啊～…嗯呜唔～…屁股眼…感觉…好棒呢…啊～啊啊～再往里钻吧！」',
        );
      }
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被调教出了快感、由于肛门虫的刺激娇喘出声………`,
        );
      }
      kojo.肛门虫 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「屁、屁股…好奇怪…变的好奇怪…不要…真的不要啊…」');
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门一被肛门虫蠕动着钻了进去、${target_name}就皱起眉头发出了好像很痛苦的呻吟………`,
        );
      }
      kojo.肛门虫 = 4;
    } else if (
      // A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～…啊啊啊～…讨厌～…屁股眼爽的不行了…明明不能这样的！啊啊～～♪」',
      );
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛门虫的刺激而娇喘出声………`,
        );
      }
      kojo.肛门虫 = 3;
    } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「咕呜～…好难受…好难受啊…」');
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门一被肛门虫蠕动着钻了进去、${target_name}就发出了悲鸣………`,
        );
      }
      kojo.肛门虫 = 2;
    }
    return 0;
  }

  // ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0（肛门虫脱着，CFLAG:374）
  if (era_flag.selectcom === 13 && !era.get(`tequip:${target}:13`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    // 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊～…要是能一整天都能被抽插着就好了…${heart(1)}」`,
      );
      kojo.肛门虫着脱 = 4;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…哈啊…啊啊…总觉得屁股眼感到寂寞了呢…」');
      kojo.肛门虫着脱 = 3;
    } else if (
      // A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯～…啊啊…总觉得…屁股眼…还意犹未尽…♪」');
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「哈啊…哈啊…哈啊………」');
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 14 && TEQUIP:14（阴蒂夹开始，CFLAG:315）
  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    // 初めて（CFLAG:315 == 0）
    if (kojo.阴蒂夹 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          '「啊～～…厉、厉害…请再夹紧一点…咿～！震起来了！？震起来了～～～～～～～！」',
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「没、没事的…请再夹紧一点…咿～！震起来了～～！」',
        );
      } else {
        // それ以外
        await era.printAndWait(
          `「不、不管用这种东西怎么折腾${sc()}都是没用的…咿啊啊啊～！震起来了不要啊啊啊！」`,
        );
      }
      kojo.阴蒂夹 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～啊啊～啊啊啊～！请再强烈些、再强烈些！把阴蒂玩到坏掉为止吧～${heart(1)}」`,
      );
      kojo.阴蒂夹 = 4;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「嗯呜唔呜～！啊啊～…小阴蒂一颤一颤的…变的好奇怪…♪」',
      );
      kojo.阴蒂夹 = 3;
    } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        '「哈啊…哈啊…啊啊呜呜～！不要震了…求求你不要再震了～！」',
      );
      kojo.阴蒂夹 = 2;
    }
    return 0;
  }

  // ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0（阴蒂夹脱着，CFLAG:375）
  if (era_flag.selectcom === 14 && !era.get(`tequip:${target}:14`)) {
    // 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊～哈啊～…还在麻麻的呢…${heart(1)}」`);
      kojo.阴蒂夹着脱 = 3;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊啊…好像还想再被夹着呢………」');
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「哈啊…哈啊…哈啊…呜呜～」');
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 15 && TEQUIP:15（乳头夹开始，CFLAG:316）
  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    const b_sense = era.get(`abl:${target}:1`) || 0;
    const b_insensible = era.get(`talent:${target}:107`) === 1;

    // 初めて（CFLAG:316 == 0）
    if (kojo.乳头夹 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「额呵呵…还有这样的色情道具呢…好吧…请用乳房～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}神情陶醉的看着器具夹到了乳头上………`,
        );
        // B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          '「啊～～…好吧…请用这个色情的道具…来更多地欺负乳头吧…♪」',
        );
        await era.printAndWait(`${target_name}莞然一笑、把胸部伸了出来………`);
        // B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快乐………`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait(
          `「即、即使是这样${sc()}也…啊咿～～…咕呜…（可、可怕…好可怕啊…）」`,
        );
        // B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快乐………`,
          );
        }
      }
      kojo.乳头夹 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊～…好爽…感觉全身心都变得淫荡起来了～${heart(1)}」`,
      );
      await era.printAndWait(
        `从${target_name}不像话的表情上完全看不出圣女时期的清纯了………`,
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
        );
      }
      kojo.乳头夹 = 4;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「嗯嗯～…乳头好舒服…还要…我还要～～♪」');
      await era.printAndWait(
        `「一被主人欺负…就会感觉到主人的爱呢…${heart(1)}」`,
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
        );
      }
      kojo.乳头夹 = 3;
    } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        '「啊呜～…呜～…啊啊…不、不要…再这样下去的话…啊啊～～！」',
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头已被完全开发、器具毫不间断的持续为乳头带来快乐………`,
        );
      }
      kojo.乳头夹 = 2;
    }
    return 0;
  }

  // ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0（乳头夹脱着，CFLAG:376）
  if (era_flag.selectcom === 15 && !era.get(`tequip:${target}:15`)) {
    // 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊～～…明明还想再用一会儿的…${heart(1)}」`);
      kojo.乳头夹着脱 = 3;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊…乳头麻麻的…好厉害的感觉…♪」');
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「咕呜嗯～…哈啊…哈啊…」');
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 16 && TEQUIP:16（榨乳器开始，CFLAG:317）
  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    const b_sense = era.get(`abl:${target}:1`) || 0;
    const b_insensible = era.get(`talent:${target}:107`) === 1;

    // 初めて（CFLAG:317 == 0；:1771 RETURN 0 被注释，JS 仍须显式返回以免落到 stub_line）
    if (kojo.榨乳器 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…奶水…就这样出来了～…好美妙～${heart(1)}」`,
        );
        await era.printAndWait(
          `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
        );
        // B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「啊啊～…小宝宝…好想让小宝宝来喝呢～………${heart(1)}」`,
        );
        await era.printAndWait(
          `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
        );
        // B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait('「住、住手…放过我吧…啊啊…不要啊啊………」');
        await era.printAndWait(
          `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
        );
        // B感覚Lv3以上＋B鈍感
        if (b_sense >= 3 && b_insensible) {
          await era.printAndWait(
            `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
          );
        }
      }
      kojo.榨乳器 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～${heart(1)}」`,
      );
      await era.printAndWait(
        `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
        );
      }
      kojo.榨乳器 = 4;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊啊～…啊～…嗯呜唔～…！呀啊啊…好想让小宝宝喝啊………${heart(1)}」`,
      );
      await era.printAndWait(
        `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
        );
      }
      kojo.榨乳器 = 3;
    } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「讨厌…讨厌…不要榨啊～…嗯！」');
      await era.printAndWait(
        `榨乳器每次振动${target_name}的乳头就会喷出新鲜的奶汁………`,
      );
      // B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {
        await era.printAndWait(
          `${target_name}钝感的乳头被完全开发了、榨乳带来的快乐持续的令${target_name}心动神驰………`,
        );
      }
      kojo.榨乳器 = 2;
    }
    return 0;
  }

  // ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0（榨乳器脱着，CFLAG:377）
  if (era_flag.selectcom === 16 && !era.get(`tequip:${target}:16`)) {
    // 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「欸～～…明明还想再榨一些奶汁出来呢…♪」');
      await era.printAndWait(
        `奶汁从${target_name}的乳头上滴答滴答地垂落下来………`,
      );
      kojo.榨乳器着脱 = 3;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊～…哇、${sc()}的奶汁…♪」`);
      await era.printAndWait(
        `奶汁从${target_name}的乳头上滴答滴答地垂落下来………`,
      );
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「呜…呜呜…奶汁…不要再出来了………」');
      await era.printAndWait(
        `奶汁从${target_name}的乳头上滴答滴答地垂落下来………`,
      );
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 19 && TEQUIP:19（肛珠开始，CFLAG:320）
  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    // 初めて（CFLAG:320 == 0）
    if (kojo.肛珠 === 0) {
      // 淫乱
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…${heart(1)}」`,
        );
        // A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}很有感觉地唤出声来………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait('「没、没事的…再来…全部塞进去吧…♪」');
        // A感覚Lv3以上＋A鈍感
        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}娇喘出声………`,
          );
        }
      } else {
        // それ以外
        await era.printAndWait(
          '「啊～、咿～～！？不行…不可能全部塞进去啊………」',
        );
        // A鈍感
        if (a_insensible) {
          await era.printAndWait(
            `一把肛珠全部塞进${target_name}钝感的肛门里、${target_name}就悲鸣了起来………`,
          );
        }
      }
      kojo.肛珠 = 1;
      return 0;
    }

    // 二回目以降
    // 淫乱＋A感覚Lv3以上
    if (
      era.get(`talent:${target}:76`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}由于肛门的快乐整个脑子都爽的要融化了似的………`,
      );
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}反复厮磨着………`,
        );
      }
      kojo.肛珠 = 7;
    } else if (
      // 淫乱
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「再来…再继续欺负我吧…让${sc()}的屁股眼变的更舒服吧${heart(1)}」`,
      );
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}还很钝感的肛门被肛珠全部塞了进去、${target_name}好像很开心的摇着屁股作为回应………`,
        );
      }
      kojo.肛珠 = 6;
    } else if (
      // 爱＋A感覚Lv3以上
      era.get(`talent:${target}:85`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊～～…这个…好厉害…肚子里面…一缩一缩的…咿呀～～！不要拉～」',
      );
      await era.printAndWait(`${target_name}不像话地张开嘴、发出快乐的呻吟………`);
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}娇喘出声………`,
        );
      }
      kojo.肛珠 = 5;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「哈啊…啊啊～…一全部塞进去…腰都直不起来了…♪」');
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `一把肛珠全部塞进${target_name}钝感的肛门里、${target_name}皱着眉头发出好像很痛苦的声音………`,
        );
      }
      kojo.肛珠 = 4;
    } else if (
      // A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「啊啊…屁股…好像…变的很奇怪…不、不行…不要拉啊～～♪」',
      );
      await era.printAndWait(`${target_name}不像话地张开嘴发出下流的声音………`);
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `${target_name}钝感的肛门被开发而觉醒了快感、由于肛珠的压迫感${target_name}娇喘出声………`,
        );
      }
      kojo.肛珠 = 3;
    } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        '「这、这样子…这样子全部塞进去的话…咿～、不要拉啊～」',
      );
      // A鈍感
      if (a_insensible) {
        await era.printAndWait(
          `一把肛珠全部塞进${target_name}钝感的肛门里、${target_name}就悲鸣起来………`,
        );
      }
      kojo.肛珠 = 2;
    }
    return 0;
  }

  // ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0（肛珠脱着，CFLAG:379）
  if (era_flag.selectcom === 19 && !era.get(`tequip:${target}:19`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    // 淫乱（门槛是 < 不是 <=）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢${heart(1)}」`,
      );
      kojo.肛珠着脱 = 4;
    } else if (
      // 爱慕
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「咕呜嗯～…啊哈…被撑的好宽啊…♪」');
      kojo.肛珠着脱 = 3;
    } else if (
      // A感覚Lv3以上
      a_sense >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        '「哈啊啊啊～～！…不、不行…屁股眼…再这样下去的话…真的要…」',
      );
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait('「呀呜呜～…啊、啊啊…」');
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 20（正常位，CFLAG:321）
  if (era_flag.selectcom === 20) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.正常位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊…主人～…真的好开心…能为淫乱的${target_name}亲自破开处女膜～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自己把两腿张开让${player_name}的大鸡鸡插了进来。`,
          );
          await era.printAndWait(
            `「啊…呜…啊啊啊～～！进来啦～！主人的肉棒进来啦～！」`,
          );
          await era.printAndWait(
            `「虽然有点痛…不过完全可以忍受…因为主人火热的大鸡鸡～…插进里面实在是太舒服了啊～${heart(1)}」`,
          );

          if (hometown_lover) {
            await era.printAndWait(
              `${target_name}用两腿紧紧的挟住${player_name}的腰发出了快活的呻吟。`,
            );
            await era.printAndWait(
              `${target_name}与故乡的恋人相比选择了大鸡鸡的样子。`,
            );
            await era.printAndWait(
              `「好爽～好爽～好爽！ 被大鸡鸡弄得好爽啊～！已经…离不开它了～${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `${target_name}用两腿紧紧的挟住${player_name}的腰发出了快活的呻吟………`,
            );
          }
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.printAndWait(
            `「是…拜托了…主人…请把${sc()}重要的东西…夺走吧…♪」`,
          );
          await era.printAndWait(
            `${target_name}有点害羞的把两腿张开、把${player_name}的大鸡鸡放了进来。`,
          );
          await era.printAndWait(
            `「嗯嗯～！…咕…呜啊…哈啊…哈啊…没关系的、这种程度没问题的…啊啊～！」`,
          );
          await era.printAndWait(
            `${target_name}一边忍受着破瓜的苦痛一边回应着你的欲望………`,
          );

          if (hometown_lover) {
            await era.printAndWait(
              `（啊啊…${sc()}的…真命天子是…魔王大人………${heart(1)}）`,
            );
            await era.printAndWait(
              `${target_name}在心中已经把故乡的恋人给忘掉了的样子………`,
            );
          }
        } else {
          await era.printAndWait(`「求、求你了…再…温柔一点…啊～…咿～～…！」`);
          await era.printAndWait(
            `${target_name}被压在身上侵犯了、因为破瓜的痛楚而哭出声来………`,
          );

          if (hometown_lover) {
            await era.printAndWait(
              `「啊啊～…${sc()}…明明想把贞洁…献给那个人的…啊～…啊啊～！」`,
            );
            await era.printAndWait(
              `${target_name}想起故乡的恋人、更加伤心的哭了起来………`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「主人～${heart(1)}…紧紧地抱住我吧…让我们一起变的非常非常的快活吧${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的吞下了${player_name}的大鸡鸡………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「用这种姿势做的话…总觉得心跳不已呢…啊、讨、讨厌、${sc()}…为什么要把这都说出来…」`,
          );
          await era.printAndWait(`${target_name}害羞的把脸埋进你的胸口………`);

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了${player_name}的大鸡鸡………`,
            );
          }
        } else {
          await era.printAndWait(`「咕～…请、请不要看我的脸…哈咕呜～！」`);
          await era.printAndWait(
            `${target_name}一被插入就紧紧闭上眼睛嘴巴都歪了………`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、使她而由于被插入的异物感而皱起了眉头。${target_name}痛苦呻吟着………`,
            );
          }
        }
      }
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「肉棒好棒～${heart(1)}…好棒哦～${heart(1)}…好想被插一整天啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}下流淫猥的声音在耳边回响着、如果是认识她的人听到的话一定会怀疑自己的耳朵是不是出问题了。`,
          );
          await era.printAndWait(
            `「啊啊～…好棒～好棒～${heart(1)}…再来～…疯狂地～…把精液滚滚地射进来吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用手脚缠住${player_name}反复的接吻并被持续被侵犯着………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～…啊啊啊～${heart(1)}…要疯了～…要疯了啊～…咿～…咿～…要被肉棒弄疯了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被抽插着阴道深处痛的唤出声来、抱住了${player_name}。`,
          );
          await era.printAndWait(
            `「${sc()}…已、已经…变的不被操小穴…就活不下去了～${heart(1)}…所以…所以～${heart(1)} 请更疯狂地侵犯我吧～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「请再…再用力操我的小穴吧${heart(1)}…请用持久不倒的出色的大鸡鸡来操我吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `「已经…除了这个什么也不想了…小穴…再狠狠地操小穴吧…疯狂地操我吧～！」`,
          );
          await era.printAndWait(
            `${target_name}用两脚勾住${player_name}的腰、像动物似的娇喘起来………`,
          );
        }
        kojo.正常位 = 9;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「对、对不起…${sc()}…一被大鸡鸡插进来就…已…经、要…不行…了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像中毒患者似的牙齿不停地打着冷战并抱紧了${player_name}。`,
          );
          await era.printAndWait(
            `「嗯哦…啊啊…来～…吧～…动起来吧～…${sc()}的小穴～${heart(1)} 是主人专用的鸡鸡容器～${heart(1)} 想一直做爱下去～${heart(1)}」`,
          );
          await era.printAndWait(
            `如果是过去认识${target_name}的人听到这些下流的话肯定会以为自己耳朵出问题了、${target_name}继续被${player_name}侵犯着………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～…啊啊～…已、已经…分不清…是喜欢主人…还是喜欢大鸡鸡了${heart(1)}…咿啊啊啊啊～${heart(1)}」」`,
          );
          await era.printAndWait(
            `${target_name}被大鸡鸡插入阴道深处奄奄一息地痉挛着并紧紧地缠住大鸡鸡。`,
          );
          await era.printAndWait(
            `「还要、还要…求求你…弄…弄坏也没事～…抱我～${heart(1)} 爱我～${heart(1)}…啊～啊啊啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「求你了…不要把大鸡鸡拔出来…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}用双手搂住${player_name}的脖子含情脉脉地抱住了${player_name}。`,
          );
          await era.printAndWait(
            `「想永远感受着你的大鸡鸡～${heart(1)}…请尽情的把我干的一塌糊涂吧…${heart(1)}」`,
          );
        }
        kojo.正常位 = 8;
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊咿～…继续…侵犯我…请继续侵犯我吧～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「小穴没被大肉棒插进去的话…就要发疯了啊啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `已经完全变成性爱狂的${target_name}用脚缠住${player_name}的腰舍不得松开………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「小穴～…小穴还要～…${heart(1)}」`);
          await era.printAndWait(
            `「请用大肉棒尽情地蹂躏小穴吧～…子宫的里面也…用、精液填满吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `已经不会再去考虑做爱之外的事情的${target_name}一边流着口水一边不断地说着下流的话………`,
          );
        } else {
          await era.printAndWait(
            `「哈啊～…啊～啊啊啊～…继续…继续干我的小穴吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「已经…除了小穴其他什么也不想了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}看起来已经没法再考虑做爱之外的事情了、她堕落的脸上已经再也找不到一丝清纯的痕迹了………`,
          );
        }
        kojo.正常位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊～…大肉棒…在里面～…${heart(1)} 咿～啊～…啊啊啊～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `「啊啊～…${sc()}的小穴里…变成大肉棒的形状了～…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            );
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`);
          } else if (v_insensible) {
            await era.printAndWait(
              `「咕～…啊～…啊啊啊～………呐…还想再要…大鸡鸡啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。但是${target_name}很快就发出了娇艳的呻吟声………`,
            );
          } else {
            await era.printAndWait(
              `「再来…像禽兽一样的插进来…继续侵犯${sc()}吧～${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`);
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「继续侵犯我吧～…${heart(1)} 想要被操到小穴变形啊～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            );
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`);
          } else if (v_insensible) {
            await era.printAndWait(`「呜咕呜～…进来了…进来了～${heart(1)}」`);
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。但是${target_name}很快就发出了娇艳的呻吟声………`,
            );
          } else {
            await era.printAndWait(
              `「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`);
          }
        } else {
          await era.printAndWait(
            `「啊～啊啊～哈呜呜～…和主人做爱被操着小穴感觉格外的舒服呢～${heart(1)}」`,
          );
          await era.printAndWait(
            `「早知道是这么快乐这么舒服的事情的话…真想更早一点的体验到呢…${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            );
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`);
          } else if (v_insensible) {
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。但是${target_name}很快就发出了娇艳的呻吟声………`,
            );
          } else {
            await era.printAndWait(`${target_name}露出淫猥的笑容继续做爱着………`);
          }
        }
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊…请更多的疼爱我…啊～…嗯～…这样…真舒服～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            );
            await era.printAndWait(
              `「主人能这样疼爱我并教会我如此愉悦的事情…真是…感激…不尽${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}好像很舒服的仰起下巴、呼了口气………`,
            );
          } else if (v_insensible) {
            await era.printAndWait(`「啊啊…呜、好深…好深啊………${heart(1)}」`);
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
            );
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…被爱着的愉悦…真美妙…${heart(1)} 啊～…啊啊～…又插的…更深了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}每当被插进阴道深处就会发出娇喘声………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…啊啊～…嗯～…再用力…抱我～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            );
            await era.printAndWait(
              `「好棒～…这样好棒～…${heart(1)} 啊啊～…请让我变得更舒服吧…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}脉脉含情地在${player_name}的耳边轻声说着并发出了娇喘声………`,
            );
          } else if (v_insensible) {
            await era.printAndWait(
              `「哈咕呜～…啊、啊啊啊…求…求你了…再…温柔一点…啊呜～！」`,
            );
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
            );
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            );
          } else {
            await era.printAndWait(
              `「还想…还想更多地感受着主人～…所以…所以～…啊～…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………`,
            );
          }
        } else {
          await era.printAndWait(
            `「那、那个…再…再激烈一点也可以哦…咿呀～～♪」`,
          );
          await era.printAndWait(
            `「是、是的…对不起…我会老实说的！…还想…还想和你一起变的更舒服呢………${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得感觉到了快乐、很愉快地吞下了${player_name}的大鸡鸡。`,
            );
            await era.printAndWait(
              `${target_name}不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………`,
            );
          } else if (v_insensible) {
            await era.printAndWait(
              `${target_name}的私处还不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
            );
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}不好意思的笑了并动起了腰身、抛着媚眼撒娇………`,
            );
          }
        }
        kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咕呜～…呜呜～！啊～啊啊啊啊！再、再这样下去的话…${scf()}、${sc()}…就要…」`,
        );
        await era.printAndWait(
          `「真的…不行了…要不行了啊…明明是被侵犯…竟然会这么的…啊啊～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被开发得感觉到了快乐、很愉快的吞下了${player_name}的大鸡鸡………`,
          );
        }
        kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咕～…啊呜唔～♪…没、没事的…请随意动起来吧…啊啊～」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}忍着痛苦没有吭声的样子………`,
          );
        }
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊～…呜…咕～…哈咕～！…呜呜呜～！」`);
        await era.printAndWait(`${target_name}咬牙忍受着钝痛感………`);

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}发出了痛苦的声音………`,
          );
        }
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 21（背后位，CFLAG:322）
  if (era_flag.selectcom === 21) {
    const hometown_lover = era.get(`talent:${target}:317`) === 4;
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.背后位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}用跪坐的姿势并把头贴在地上、将屁股高高抬起。`,
          );
          await era.printAndWait(
            `「能被您夺走${sc()}的第一次……我从心底表示感谢～${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抓住她的腰毫不犹豫的把肉棒插进了阴道深处。`,
          );
          await era.printAndWait(
            `途中感到穿破了处女膜。肉棒一进入深处就被温热的阴道壁紧紧包住。`,
          );
          await era.printAndWait(
            `「呀啊呜唔～…淫乱的处女膜被弄破了～…啊啊～…好开心～好开心啊～！」`,
          );

          if (hometown_lover) {
            await era.printAndWait(
              `${target_name}比起故乡的恋人而选择了能为自己带来无限快乐的鸡鸡的样子。`,
            );
            await era.printAndWait(
              `「嗯～♪…${sc()}的恋人是…世界上所有的大鸡鸡～…不过最喜欢的是现在插进来的大鸡鸡哦…${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「从、从后面来吗…没、没事的…那、那个请温柔一点…咿呀啊啊～～！」`,
          );
          await era.printAndWait(
            `${player_name}向${target_name}发出了决定性的一击将阴茎插进了阴道里。`,
          );
          await era.printAndWait(
            `途中感到穿破了处女膜。${target_name}禁不住悲鸣起来。`,
          );
          await era.printAndWait(
            `「啊～啊咿～～～！…总觉得～…这样好像和动物似的呢…好棒～…好棒啊～♪」`,
          );

          if (hometown_lover) {
            await era.printAndWait(
              `「啊啊～…${sc()}是…魔王大人的所有物～…绝对不会背离的${heart(1)}…啊啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的脑海里已经把故乡的恋人完全忘掉了的样子………`,
            );
          }
        } else {
          await era.printAndWait(
            `「这、这种像动物一般的姿势…咕呜…呜呜～…啊～啊啊啊啊啊～！」`,
          );

          if (hometown_lover) {
            await era.printAndWait(`「啊啊～…对不起…对不起～…呜呜～！」`);
            await era.printAndWait(
              `${target_name}想起故乡的恋人、流下了眼泪………`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「是～…请尽管从后面来吧${heart(1)}　哈啊～～…果然被侵犯真是最棒了～${heart(1)}」`,
          );
          await era.printAndWait(`「再来啊…把我侵犯到坏掉吧～！」`);

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊～…这个姿势好害羞…不过………」`);
          await era.printAndWait(
            `「啊～啊啊啊～…！讨厌…明明很害羞却兴奋起来了～…♪」`,
          );
          await era.printAndWait(`「更多…请更多的疼爱我吧…♪」`);

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处经过开发觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            );
          }
        } else {
          await era.printAndWait(
            `「不要用这种像动物一样的姿势…这样…不行…啊啊啊～」`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。${target_name}发出了痛苦的声音………`,
            );
          }
        }
      }
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.背后位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯哈啊～啊～啊啊～咿啊啊啊～！${heart(1)} 再用力插我～${heart(1)}」`,
          );
          await era.printAndWait(
            `「还想再要大肉棒～${heart(1)} 想要更多…更多的大肉棒啊～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「已经…只要有大肉棒插进来的话…是谁都无所谓了～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰好像为了拍打屁股似的一次一次地把腰向前送。`,
          );
          await era.printAndWait(
            `「啊咿呀啊～${heart(1)} 好棒～${heart(1)}好棒～${heart(1)} 对不起～…这个大肉棒～…主人的大肉棒实在太棒了～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯～嗯嗯～嗯～…啊呜唔呜…不要拔出来…不要把大肉棒拔出来…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}淫荡的扭着屁股、向${player_name}撒娇。`,
          );
          await era.printAndWait(
            `「我已经…没有大肉棒…就活不去了～…呜啊…不要拔…啊～${heart(1)}啊啊～${heart(1)}啊哈啊～${heart(1)}」`,
          );
        }
        kojo.背后位 = 9;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊啊～…再来～…再来啊～${heart(1)}」`);
          await era.printAndWait(
            `${target_name}用平常想象不出来的样子淫荡地扭着屁股。`,
          );
          await era.printAndWait(
            `「好深…好棒～…主人…请再侵犯我的小穴吧…～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「${sc()}的屁股…小穴…都是为了取悦主人而存在的…${heart(1)}」」`,
          );
          await era.printAndWait(`「所以…请尽管随意使用吧～${heart(1)}」`);
          await era.printAndWait(
            `${target_name}为了能让自己被更多的侵犯而用令人心神荡漾的声音向你撒娇………`,
          );
        } else {
          await era.printAndWait(`「请更多地欺负我的小穴吧～${heart(1)}」`);
          await era.printAndWait(
            `「请在主人专用的小穴里用精液播种吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `已经完全陷落并沉溺于性爱的快乐中的${target_name}不知羞耻地淫荡地呻吟着………`,
          );
        }
        kojo.背后位 = 8;
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊～…请再像…动物一样的操我吧～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「${scf()}…${sc()}已经是…大肉棒的奴隶了～${heart(1)}」`,
          );
          await era.printAndWait(
            `每次抽送、${target_name}的私处都会溢出泡沫一样的爱液………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「再…用力插…想被大肉棒塞得满满的～…${heart(1)}」`,
          );
          await era.printAndWait(`「已经…不会再去想做爱之外的事情了～…」`);
          await era.printAndWait(
            `${target_name}好像想被进一步侵犯似的高高抬起了屁股………`,
          );
        } else {
          await era.printAndWait(
            `「不管被侵犯几次…都不会生厌…已经…不会去想…没有做爱的生活了～…」`,
          );
          await era.printAndWait(`「所以～…更多更多地侵犯我吧～…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}像变成一只动物似的、连子宫口都臣服于做爱的快感中而敞开了………`,
          );
        }
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呀呜～！哈啊…啊啊～…咿呀～～！好爽啊～…随心所欲的叫床！要变成动物了～！」`,
          );
          await era.printAndWait(
            `「咿呀～啊啊～…啊啊～…好喜欢！像动物一样的做爱好喜欢啊！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～…啊啊～…好紧～！再来～…再使用${sc()}的身体吧…请尽情使用～${heart(1)}」`,
          );
          await era.printAndWait(
            `「${target_name}是非常喜欢被人从后面哧噗哧噗地侵犯的变态勇者啊～♪」`,
          );
        } else {
          await era.printAndWait(
            `「啊～啊啊～…像动物一样的做爱好爽啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `「一被这样侵犯…就好像自己变成了最低等的动物似的…最棒…了～${heart(1)}」`,
          );
        }
        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被调教出了快感、好像很愉快的吞下了从后面插进来的${player_name}的大鸡鸡、滴落出了爱液………`,
          );
        } else if (v_insensible) {
          await era.printAndWait(
            `虽然${target_name}的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子………`,
          );
        }
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊～…啊～…好舒服～！请继续…侵犯我吧…！」`,
          );
          await era.printAndWait(
            `「被你这样做是最…最舒服的事情了…咿呀～～…啊啊～…好开心…♪」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            );
          } else if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。`,
            );
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～…${sc()}的屁股就是为了像这样被主人侵犯而存在的呢…♪」`,
          );
          await era.printAndWait(
            `「是～…直到主人满足为止…请把精液满满地注入进来吧♪」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
            );
          } else if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。`,
            );
            await era.printAndWait(
              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈啊～～…不要太过欺负${sc()}的小穴啊～…咿咿咿咿～！」`,
          );
          await era.printAndWait(
            `${player_name}抓住哀叫着的${target_name}的屁股、更加粗暴地往阴道里面抽插`,
          );
          await era.printAndWait(`${target_name}发出了格外尖厉的悲鸣声。`);

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、毫不间断的持续为${target_name}带来快感………`,
            );
          } else if (v_insensible) {
            await era.printAndWait(
              `虽然${target_name}的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子………`,
            );
          } else {
            await era.printAndWait(
              `「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～${heart(1)}」`,
            );
          }
        }
        kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊～…啊啊～啊～…啊啊～！不、不行…再这样被用力地做的话～…」`,
        );
        await era.printAndWait(
          `「就、就会变的只知道…只知道大鸡鸡了啊～…啊啊啊～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了从后面插进来的${player_name}的大鸡鸡………`,
          );
        }
        kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `（啊啊…${sc()}竟然把屁股抬得这么高也能无动于衷…呜呜）`,
        );
        await era.printAndWait(
          `${target_name}咬牙忍耐着并在阴道深处被侵犯时发出呻吟。`,
        );
        await era.printAndWait(
          `「哈啊～…啊啊～啊～…啊啊～！…咕呜～…咿～…嗯～啊呜呜～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。${target_name}高声悲鸣起来………`,
          );
        }
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「这样…完全算不了什么…咦～…这不是像动物一样吗…？不、不对…你搞错了…吧」`,
        );
        await era.printAndWait(
          `「${scf()}、${sc()}是…人类啊…这种动物一样的姿势才不会…有、感觉～…啊～…啊呜呜～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、由于被从后面插入的异物感而皱起了眉头。${target_name}发出了痛苦的声音………`,
          );
        }
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 22（对面座位，CFLAG:323）
  if (era_flag.selectcom === 22) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.对面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「嗯啾…啾～…嗯啾唔唔…啊啊啊～${heart(1)}」`);
          await era.printAndWait(
            `「一边和主人接吻…一边被操着小穴真是太棒了～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的吞下了${player_name}插进来的大鸡鸡………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊～…呜啊～…呀呜～…不、不行了…被这样吻的话…啊～♪」`,
          );
          await era.printAndWait(
            `「那个地方…太有感觉了～…咿呀～～啊～啊啊～…被插的快不行了啊～♪」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的吞下了${player_name}插进来的大鸡鸡………`,
            );
          }
        } else {
          await era.printAndWait(
            `「还能这样做啊…啊～～…啊～…啊呜～…再…温柔一点…」`,
          );
          await era.printAndWait(`${target_name}有点生疏地动着腰………`);

          if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}喘息不已………`,
            );
          }
        }
      }
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.对面座位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊～…大肉棒插得好深…主人的大肉棒插得好深啊～${heart(1)} 插进小穴的深处了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边发出淫荡的娇喘声一边在${master_name}的身上晃动着腰。`,
          );
          await era.printAndWait(
            `「再多的～…让我感受大肉棒吧${heart(1)} 把精液满满地射进来～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～${heart(1)} 啊啊～${heart(1)}…主人的大肉棒～…全部插进来让${sc()}好舒服啊～…主人你不用动也行哦～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用自己的双腿像蜘蛛一样缠住了${master_name}的腰并自己剧烈地动起了腰。`,
          );
          await era.printAndWait(
            `「嗯哈啊～～${heart(1)}…这个肉棒好棒～！好棒啊～！…果然已经不能没有大肉棒了啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊啊～…大肉棒一进来…就、要、不行了…已经…什么事情都不想考虑了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的阴道深处被肉棒深深地插了进去、她的眼睛里已经完全失去了理性之光。`,
          );
          await era.printAndWait(
            `「嗯咕呜呜嗯唔…啊～啊啊～啊哈啊啊～…哈啊啊…再插…再插吧～…要疯掉啦～${heart(1)}」`,
          );
        }
        kojo.对面座位 = 9;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊啊～…主人不用动也行哦～${heart(1)}」`);
          await era.printAndWait(
            `${target_name}用迷醉而荡漾的眼神看着你、自己开始动了起来。`,
          );
          await era.printAndWait(
            `「这大鸡鸡全部都是${sc()}的～${heart(1)} ${sc()}的～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯咕呜…啊～啊啊啊…好幸福～${heart(1)}…感觉好幸福啊～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱着${master_name}不停地发出放荡的娇喘声。`,
          );
          await era.printAndWait(
            `「${sc()}的小穴…已经变成主人的专用小穴了～${heart(1)} 千万别拔出来哦～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊咿呀啊～…里面…贴在一起了${heart(1)} 再紧点…再紧紧的抱住我～…不要拔～${heart(1)}」`,
          );
          await era.printAndWait(
            `按照${target_name}所说的紧紧顶住阴道口、她就在${player_name}的耳边呼着灼热的气息。`,
          );
          await era.printAndWait(
            `「哈啊…哈啊…请用${sc()}的淫荡小穴～…尽情享受吧～…${heart(1)}」`,
          );
        }
        kojo.对面座位 = 8;
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊～…还要…再来…再来～…欺负小穴吧～………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱住${master_name}、秀眉因为快感而颤动不已。`,
          );
          await era.printAndWait(`${target_name}已经除了做爱之外啥都不想了………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「动、动啊～…请再动吧～…${heart(1)}」`);
          await era.printAndWait(
            `「我还想再要大肉棒～…真拿你没办法呢～…啊啊～…原谅我…原谅我～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边不成体统的撒娇着一边自己摇着腰贪求着快乐………`,
          );
        } else {
          await era.printAndWait(
            `「哈咿呀啊～${heart(1)} 大肉棒${heart(1)} 大肉棒～${heart(1)} 大肉棒～${heart(1)}」`,
          );
          await era.printAndWait(
            `「小穴…已经…要不行啦～…啊啊～${heart(1)} 啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}不成体统的大张着嘴贪求着快乐………`,
          );
        }
        kojo.对面座位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啾～啾～…嗯呜唔呜…喜欢…好喜欢…唔嗯…不管是做爱还是主人都好喜欢哦？」`,
          );
          await era.printAndWait(
            `「竟然还有这么舒服的事情…多亏主人能告诉我真是太感谢了～${heart(1)}」`,
          );
          await era.printAndWait(`「所以～…再多多的和我做吧～${heart(1)}」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呀呜唔～…啊～啊啊～…请再用力插我～${heart(1)}」`,
          );
          await era.printAndWait(
            `「呀～啊啊啊～…咕～…好紧～${heart_black(3)}」`,
          );
          await era.printAndWait(
            `「再…再贴紧一点～…好想被干到心醉神驰啊～…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈呜～…啊啊～啊～…啊啊～～！喜欢～好喜欢～！」`,
          );
          await era.printAndWait(
            `「大肉棒不要拿走～…好想一直这样下去～！不要走～！」`,
          );
        }

        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处经由调教开发获得了快感、持续不断地带给${target_name}淫靡的快感………`,
          );
        } else if (v_insensible) {
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被鸡鸡侵犯的事实在脑海中回荡………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          );
        }
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「哈啊～…啊～嗯～…请热烈地…亲我…♪」`);
          await era.printAndWait(`「一这样做…每次接吻…都感觉快要去了～…♪」`);
          await era.printAndWait(
            `「咿呀～～啊～啊啊～！再、再这样亲吻下去的话～…啊～啊～啊啊啊！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「嗯啾～…啾～…噗啊～…」`);
          await era.printAndWait(
            `「${sc()}的身体…是为了和主人以爱结合才存在的～…额呵呵♪」`,
          );
          await era.printAndWait(`${target_name}含情脉脉的看着你的脸。`);
        } else {
          await era.printAndWait(`「哈啊～…啊～啊啊啊～～！」`);
          await era.printAndWait(
            `「不要～…不要拔出来…再抱紧一点…不要拔出来～…♪」`,
          );
        }

        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、毫不间断的带给${target_name}甘美的快感………`,
          );
        } else if (v_insensible) {
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被${player_name}抱了的事实在脑海中回荡………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          );
        }
        kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊～…啊～咕呜～！…不要～…不要让紧紧黏在一起的小鸡鸡和小穴分开啊～…」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、把插进来的${player_name}的鸡鸡毫不费力地连根吞了下去………`,
          );
        }
        kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。`,
          );
          await era.printAndWait(`「啊啊～啊～哈呜～………咕～……啊～啊啊～！」`);
          await era.printAndWait(`${target_name}忍耐着还是发出了痛苦的声音………`);
        } else {
          await era.printAndWait(
            `「啊啊～啊～哈呜～…为什么…不拔出来啊～？…啊～啊啊～！」`,
          );
        }
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊～啊啊…嗯～嗯呜唔～………」`);

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}痛苦呻吟着………`,
          );
        }
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 23（背面座位，CFLAG:324）
  if (era_flag.selectcom === 23) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;

    if (kojo.背面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…${heart_black(3)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、很愉快的连根吞下了${player_name}插进来的大鸡鸡………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「一这样被从后面抱住…就觉得有点不好意思呢…呀～！」`,
          );
          await era.printAndWait(
            `「真、真是的…明明好不容易感到爱意、就搞这种恶作剧…呀呜～！咿呀～…呀啊～♪」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、很愉快的连根吞下了${player_name}插进来的大鸡鸡………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊～…不、不要…这种姿势…好深…呀啊～不要啊～…」`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}痛苦的呻吟着………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被鸡鸡插进阴道深处有点痛苦的喘息着………`,
            );
          }
        }
      }
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.背面座位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯啊～…啊～哈啊啊啊…再动啊～${heart(1)} 让我好好感下吧～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的话已经变得下流淫靡而不堪入耳了。`,
          );
          await era.printAndWait(
            `「啊～啊啊啊…${heart(1)} 感到大肉棒了～好有感觉啊～～…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～…嗯～嗯哈～…啊啊～…更多的…请更多的欺负我吧～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「乳房快揉碎了…小穴也要磨破了、好爽…尽情的干我啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}爽的已经完全不去考虑其他的事情了………`,
          );
        } else {
          await era.printAndWait(
            `「嗯咿嗯～咿啊～啊～啊啊啊～…不要拔…不要把大肉棒拔出来…再让我更舒服吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}把两条腿打开成Ｏ型、如狼似虎地上下摇晃着腰身。`,
          );
          await era.printAndWait(
            `「啊啊啊～…好爽啊…小穴…已经…好像要融化了～…${heart(1)}」`,
          );
        }
        kojo.背面座位 = 9;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊～～…啊～啊哈～…啊啊啊………${heart(1)}」`);
          await era.printAndWait(
            `${target_name}一被鸡鸡插进深处就发出了快乐的呻吟声。`,
          );
          await era.printAndWait(
            `「已经…不行了…这个大鸡鸡是…${sc()}的…只属于${sc()}的啊…啊啊～啊～啊哈啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…更多的…侵犯我…${sc()}的小穴～…${heart(1)} 请把它干得一塌糊涂吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}把两条腿打开成Ｏ型、淫荡地前后摇动着腰。`,
          );
          await era.printAndWait(
            `「${sc()}只顾着自己爽真是对不起了呢～～…不过～${heart(1)}但是～${heart(1)}停不下来啊～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「更多…更多的侵犯我吧～${heart(1)} 把${sc()}的淫荡小穴…进一步的玷污吧～${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}挺着腰身、高声哭叫着。`);
          await era.printAndWait(
            `「请用主人的精液…把小穴装的满满的吧～…拜托了～${heart(1)}」`,
          );
        }
        kojo.背面座位 = 8;
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊～…用这种不像话的姿势…感觉格外的舒服呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈啊～…${scf()}、${sc()}…已经…已经…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}沉溺于性爱之中、娇喘不已………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「好深啊…大肉棒插得好深啊…${heart(1)}」`);
          await era.printAndWait(
            `「呀啊呜～${heart(1)} 啊啊啊～…${sc()}的小穴…感觉变的收缩起来了～…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}像痉挛了似的不断收缩着阴道口………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…啊哈啊～…好美味啊…大肉棒好美味啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}贪婪的上下动着腰、享受着${master_name}的肉棒。`,
          );
          await era.printAndWait(`「请更多的…更多的欺负我吧～${heart(1)}」`);
        }
        kojo.背面座位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊～啊～♪哈啊～～${heart_black(1)}　大肉棒扑哧扑哧的插进小穴里的样子全部都看到了～${heart(1)}」`,
          );
          await era.printAndWait(
            `「好爽～好舒服啊～…被用不像话的体位干着好有感觉啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `「更多更多的尽情操我吧～……主人～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊～啊啊～啊～～…更多…更多的操我…${heart(1)}」`,
          );
          await era.printAndWait(
            `「一边被啪叽啪叽地揉着乳房～…一边被干着小穴就…咿～咿～咿～咿啊啊啊啊～${heart_black(1)}」`,
          );
          await era.printAndWait(`「啊～啊啊啊啊…又、高潮了～～${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「咿呀～～！啊啊～…呜…更多的…欺负小穴吧～♪」`,
          );
          await era.printAndWait(
            `「${sc()}的身体是～…为取悦主人而存在的～…${heart_black(1)}」`,
          );
          await era.printAndWait(
            `「所以～…请继续尽情的欺负我吧～～～～～${heart(1)}」`,
          );
        }

        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被调教出了快感、持续不断的给${target_name}带来了淫靡的快感………`,
          );
        } else if (v_insensible) {
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被鸡鸡侵犯的事实在脑海中回荡着………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          );
        }
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊～…啊啊～…啊咕～！嗯呜唔～…更多的…请更多地操我吧～…」`,
          );
          await era.printAndWait(
            `「啊啊～…明明是这么不像话的姿势…只是被从后面抱着～…」`,
          );
          await era.printAndWait(
            `「就感到很幸福…心情变的好爽啊～…啊～啊～啊啊啊～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「主人～…啊啊啊～…啊～～${heart(1)}」`);
          await era.printAndWait(
            `「被这样做、就好像…变成了主人的玩具似的呢…额呵呵…${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}抓住说出可爱发言的${target_name}的腰像玩弄般的摇动着。`,
          );
          await era.printAndWait(
            `「呀啊～！啊～～啊啊～啊啊～…真好～当个玩具真好～～！」`,
          );
        } else {
          await era.printAndWait(`「哈啊～啊～啊～${heart(1)} 啊啊啊～～！」`);
          await era.printAndWait(
            `「主人的体温…好温暖～…哈啊～～${heart(1)} 被温柔的抱住………」`,
          );
          await era.printAndWait(
            `「被主人疼爱着～…单是想着这个就好像要高潮了呢…啊啊～${heart(1)}」`,
          );
        }

        if (v_sense >= 3 && v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、持续不断的给${target_name}带来了甘美的快感………`,
          );
        } else if (v_insensible) {
          await era.printAndWait(
            `${target_name}的私处不太容易有感觉、只有被${player_name}抱了的事实在脑海中回荡着………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的私处像想要紧紧缠住${player_name}的鸡鸡似的蠢动着………`,
          );
        }
        kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        v_sense >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～啊啊～…啊啊～、即、即使不被那样插也…好、好有感觉～好有感觉啊～」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `${target_name}钝感的私处被开发得觉醒了快感、很愉快的连根吞下了${player_name}插进来的大鸡鸡………`,
          );
        }
        kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「把、把脚张的更大一点的话…会更好吧…啊啊～…呜、好深…插得好深啊～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}好像很难过的呻吟着………`,
          );
        }
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊～…啊啊～…啊～…竟用这种姿势…从下面…咿呀呜～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、而由于被插入的异物感而皱起了眉头。${target_name}好像很难过的呻吟着………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被鸡鸡插进阴道深处有点痛苦的喘息着………`,
          );
        }
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 26（正常位肛交，CFLAG:327）
  if (era_flag.selectcom === 26) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.正常位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊～…啊啊～…咕呜嗯～…啊啊～明明是不能插进去的地方…」`,
        );
        await era.printAndWait(
          `「肉棒…把屁股眼撑大了…咿啊啊～啊啊～${heart(1)}」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「不、不行啊、那种地方大鸡鸡怎么能插得进去…呀呜～！」`,
        );
        await era.printAndWait(
          `「啊啊…啊…不会吧…全部…插进去了…啊啊～…啊～啊哈啊～！」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、将鸡鸡连根吞下、${target_name}娇喘出声………`,
          );
        }
      } else {
        await era.printAndWait(
          `「不、不要啊～…不要…插进来…啊啊～…连屁股眼…都被你的东西玷污了…」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        }
      }
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊～啊啊～…屁股眼好爽啊～${heart(1)}」`);
          await era.printAndWait(
            `「更多的侵犯我吧～！啊～咿～啊啊～啊啊啊～${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「咿啊～啊啊～啊啊啊…已经…不行了…${sc()}已经快不行了～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「要变成被侵犯屁股眼也会感到愉悦的淫乱女孩子了～…已经…已经要不行了啊～～～～${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…主人～…屁股眼～！请更多更多地侵犯吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `「咿～…还差一点、还差一点～…要去了…去了啊～～～～${heart(1)}」`,
          );
        }

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          );
        }
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (a_insensible) {
          await era.printAndWait(
            `「啊啊～…主人～…请更多的侵犯我的屁股眼吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}钝感的肛门将鸡鸡连根吞下、${target_name}好像很舒服的扭着身体………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…主人～…请更多的侵犯我的屁股眼吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「咿～…还差一点、还差一点～…要去了…去了啊～～～～${heart(1)}」`,
          );
        }
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～…插到里面来啦～…啊～啊啊～…哈啊啊～♪」`,
          );
          await era.printAndWait(
            `「明明…明明不可以这样的…屁股…感觉太刺激啦…啊～啊啊～啊啊啊${heart_black(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…屁眼太有感觉了…对不起～～对不起～咿～」`,
          );
          await era.printAndWait(
            `「不过～不过～…实在是忍不住了啊～${heart(1)}」`,
          );
        }

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、将鸡鸡连根吞下、${target_name}娇喘出声………`,
          );
        }
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～啊啊啊啊～…被撑开了…被撑开了啊～～～…屁股眼…变成色情的洞洞了啊～～${heart(1)}」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就不禁发出了悲鸣………`,
          );
        }
        kojo.正常位肛交 = 4;
      } else if (
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～啊啊～哈啊～～…不行～…不能再这样下去了～…人会…会变得奇怪的～…」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、将鸡鸡连根吞下、${target_name}发出了愉悦的呻吟………`,
          );
        }
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊～…这样…这样是不对的…求求你…不要再这样了…呀呜～」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        }
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 27（背后位肛门，CFLAG:328）
  if (era_flag.selectcom === 27) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.背后位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…这样子…做着禽兽也不会做的事情…好美妙～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门由于对被侵犯的期待感而下流的敞开了、吞下了${player_name}的大鸡鸡………`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}开发过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡迷醉不已的快感………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊～…那、那里不是能插的地…嗯～…咕嗯～…咿～♪」`,
        );
        await era.printAndWait(
          `嘴上说不要身体却很老实的${target_name}用肛门将鸡鸡吞了下去………`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}开发过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡一阵阵的快感………`,
          );
        }
      } else {
        await era.printAndWait(`「不、不要～…住手～…咿～咿～～～～！」`);
        await era.printAndWait(
          `一边按住想逃走的${target_name}、一边侵犯着${player_name}的肛门………`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门每次被鸡鸡一抽送、${target_name}就会发出悲鸣………`,
          );
        }
      }
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「哈啊～～…啊啊～啊啊～哈啊啊${heart(1)}」`);
          await era.printAndWait(
            `「更多的…侵犯屁股眼吧…疯狂的侵犯我吧～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、将从后面插进来的鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊啊…屁股眼被撑开了～～…屁股眼记住主人的大鸡鸡的形状了～～～～${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊～咿～～…不行…这…样～…！太…激…烈…了～！不～～行～～！要…不…行了～～～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、不断地被鸡鸡从后面抽送着、${target_name}发出了淫荡的呻吟声………`,
            );
          }
        } else {
          await era.printAndWait(
            `「哈～啊啊～啊～啊…啊啊～…不行了…再这样下去的话要不行了…真的…要变的除了屁股其他什么事情都不想了啊～～～…${heart(1)}」`,
          );
          await era.printAndWait(`「啊～啊～啊啊啊～…哈啊啊啊啊${heart(1)}」`);

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}被开发过的钝感肛门变成了分泌快乐的器官、每次被鸡鸡抽送、就会给${target_name}带来源源不绝的愉悦………`,
            );
          }
        }
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈～啊啊～啊～啊…啊啊～…不行了…再这样下去的话要不行了…真的…要变的除了屁股其他什么事情都不想了啊～～～…」`,
        );
        await era.printAndWait(`「啊～啊～啊啊啊～…哈啊啊啊啊${heart(1)}」`);

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就尖叫起来………`,
          );
        }
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (a_insensible) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「啊～啊啊啊～…明明被用这么羞耻的姿势…抽插着屁股眼…但是好爽…好爽啊啊～～…♪」`,
            );
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得觉醒了快感、每次被鸡鸡抽送、${target_name}就会娇喘出声………`,
            );
          } else {
            await era.printAndWait(
              `「咿啊啊～…啊啊～嗯～…不行了…要不行了…爽过头了…啊～啊啊～啊啊啊啊啊啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被开发过的钝感肛门变成了分泌快乐的器官、每次被鸡鸡抽送、就会给${target_name}带来源源不绝的愉悦………`,
            );
          }
        } else {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「啊～啊啊啊～…明明被用这么羞耻的姿势…抽插着屁股眼…但是好爽…好爽啊啊～～…♪」`,
            );
            await era.printAndWait(
              `${target_name}被调教过的肛门很轻松地吞下了${player_name}的大鸡鸡………`,
            );
          } else {
            await era.printAndWait(
              `「咿啊啊～…啊啊～嗯～…不行了…要不行了…爽过头了…啊～啊啊～啊啊啊啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}被从后面侵犯着调教过的肛门、娇喘出声………`,
            );
          }
        }
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～啊啊啊啊…插到里面来～…嗯～…好…好棒哦…♪」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门每次被鸡鸡一抽送、${target_name}就尖叫起来………`,
          );
        }
        kojo.背后位肛交 = 4;
      } else if (
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (a_insensible) {
          await era.printAndWait(
            `「明明讨厌…这样的姿势…啊呜嗯～…啊啊～但是好舒服哦…小屁屁快不行了～」`,
          );
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、每次被鸡鸡抽送、${target_name}就会娇喘出声………`,
          );
        } else {
          await era.printAndWait(
            `「明明讨厌…这样的姿势…啊呜嗯～…啊啊～但是好舒服哦…小屁屁快不行了～」`,
          );
          await era.printAndWait(
            `${target_name}的肛门通过调教变的能产生快感了、嘴里发出了甜蜜的呻吟………`,
          );
        }
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊～…呀～…好难受呀…好难受啊…啊啊～」`);
        await era.printAndWait(
          `一边按住想逃走的${target_name}一边侵犯着肛门………`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门每次被鸡鸡一抽送、${target_name}就会发出悲鸣………`,
          );
        }
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 28（对面座位肛交，CFLAG:329）
  if (era_flag.selectcom === 28) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.对面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…屁眼变的好舒服啊…额呵呵、${sc()}也很舒服哦${heart(1)}」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊～啊啊～…被用这种姿势…插进…屁眼…里面去了…啊～～…${sc()}…已经完全混乱了…能好好抱我吗？」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就娇喘出声………`,
          );
        }
      } else {
        await era.printAndWait(`「啊啊～…插进…里面去了～…屁股眼变的奇怪了…」`);

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}发出了悲鸣………`,
          );
        }
      }
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊～…啊～啊～～！用力插啊～～～！${heart(1)}」`,
          );
          await era.printAndWait(
            `「咿啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}发出了淫荡的声音………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}每次被从下方抽插肛门就会用力抱住${player_name}在耳边发出娇喘………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊～啊啊～…啊啊～！喜欢肛交～好喜欢～～${heart(1)}」`,
          );
          await era.printAndWait(`「啊啊～…更多的…更多的欺负我吧～…♪」`);

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}发出了淫荡的声音………`,
            );
          }
        } else {
          await era.printAndWait(
            `「呀啊啊～…好爽啊～～～～～屁股的…洞…好…爽…好…爽啊～～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「更多的…欺负欺负我吧～…除了大肉棒已经什么都不想了～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}发出了淫荡的声音………`,
            );
          }
        }
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (a_insensible) {
          await era.printAndWait(
            `「啊啊～…啊～啊～～！再插…再用力插啊～！${heart(1)}」`,
          );
          await era.printAndWait(
            `「呀啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}钝感的肛门一将${player_name}的鸡鸡连根吞下、${target_name}就抱住${player_name}不想放开的样子………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…啊～啊～～！用力插啊～！${heart(1)}」`,
          );
          await era.printAndWait(
            `「呀啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}每次被从下方抽插肛门就会发出娇喘声………`,
          );
        }
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊啊～…啊～…更加…激烈一点吧～～…♪」`);
          await era.printAndWait(
            `「这个尻穴…已经变成…主人的专用物了…啊～咿呀啊～啊啊～！更多的爱我吧～！」`,
          );
        } else {
          await era.printAndWait(
            `「嗯咿～…啊～啊啊啊～…明明…这么被这么粗暴地对待…但是好舒服啊～～…」`,
          );
          await era.printAndWait(
            `「想永远被主人爱着～…啊～啊啊～哈啊啊啊～${heart(1)}」`,
          );
        }

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就抱住${player_name}娇喘出声………`,
          );
        }
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊～…啊啊～…请再继续…动起来吧…好喜欢这样…」`);

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将${player_name}的鸡鸡连根吞下、${target_name}就抱住${player_name}不想放开的样子………`,
          );
        }
        kojo.对面座位肛交 = 4;
      } else if (
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…啊…啊～～…咕呜呜呜～…要变成…${sc()}的玩具了～…啊～～♪」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就呻吟起来………`,
          );
        }
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊～…不要～…好难受…再这样下去…真的…啊啊～」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        }
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 29（背面座位肛交，CFLAG:330）
  if (era_flag.selectcom === 29) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.背面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊呜唔呜～！…屁股眼被侵犯了好爽好爽啊～～～～！」`,
        );
        await era.printAndWait(
          `「再用力点…抱我…请尽情侵犯我的屁眼吧～${heart(1)}」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊呜～…明明难得的被从背后温柔地抱住…嗯～♪」`,
        );
        await era.printAndWait(
          `「被用这种姿势插进尻穴什么的…啊～…啊～…哈啊啊…啊～～${heart(1)}」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就娇喘出声………`,
          );
        }
      } else {
        await era.printAndWait(
          `「呜、咕、啊啊啊…撑开了…被撑开了～…屁眼被撑开了～………」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦地呻吟着………`,
          );
        }
      }
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「咿呀啊啊～…屁股眼好舒服～好舒服啊～…啊啊啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `「屁股眼～…不行了…已、已经…爽得什么事都不想去想了～…咿呜～啊啊～啊啊啊啊啊${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}嘴边流着口水沉浸在肛门的快感之中………`,
            );
          }
        } else {
          await era.printAndWait(
            `「嗯咿咿～～～！不行～～不行～～～…不要随便动屁股啊～～～${heart(1)}」`,
          );
          await era.printAndWait(
            `「真是的…只欺负屁股眼～…屁股眼变的好爽啊～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被调教出了快感、贪婪的连根吞下了鸡鸡、${target_name}像磨盘似的扭着腰………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}淫猥地摇着腰身、一边不断地收缩肛门一边品味着${player_name}的鸡鸡………`,
            );
          }
        }
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯咿咿～～～！不行～～不行～～～…不要随便动屁股啊～～～${heart(1)}」`,
        );
        await era.printAndWait(
          `「真是的…只欺负屁股眼～…屁股眼变的好爽啊～${heart(1)}」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门将${player_name}的鸡鸡连根吞下、${target_name}愉悦的像磨盘似的扭着腰………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}淫猥地摇着腰身品味着你的鸡鸡………`,
          );
        }
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊～…虽然是这种姿势…尻穴也好有感觉啊…啊～啊啊～…啊咕呜～…再来…」`,
          );
          await era.printAndWait(
            `「再…再来啊～！…请…更多…更多的！欺…欺负～…屁股…眼儿吧～…♪」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就央求着更多………`,
            );
          }
        } else {
          await era.printAndWait(
            `「咕咿～…自从知道…屁股眼儿…能这么舒服之后～…」`,
          );
          await era.printAndWait(
            `「已经…没办法…没办法…再舍弃这种滋味了～…嗯～嗯啊啊～哈啊～～♪」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就由于肛门的快乐而陶醉了………`,
            );
          } else {
            await era.printAndWait(
              `沉醉于肛门的快乐之中的${target_name}已经完全找不到身为圣女时的样貌了………`,
            );
          }
        }
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊……啊啊～啊～～…被这样欺负屁股眼、也…好舒服…啊～…」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将${player_name}的鸡鸡连根吞下、${target_name}就很愉悦的样子………`,
          );
        }
        kojo.背面座位肛交 = 4;
      } else if (
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～咿啊～…啊啊～～…屁股眼…竟然…这么的舒服…咿～♪」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发得觉醒了快感、一将鸡鸡连根吞下、${target_name}就高喊出声………`,
          );
        }
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈啊…啊啊～…咕呜～…咕…呜呜～！」`);

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦的呻吟着………`,
          );
        }
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 30（手淫，CFLAG:331）
  if (era_flag.selectcom === 30) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;
    const penis = era.get(`talent:${era_flag.player}:318`) || 0;

    if (kojo.手淫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「额呵呵…这样一上一下地…玩弄大肉棒真不错呢${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊哈啊啊…能摸到主人的大鸡鸡…真不错呢…我一定会努力奉仕的～♪」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(`「哈啊…哈啊…大鸡鸡…好烫…好厉害哦………」`);
      } else {
        await era.printAndWait(`「讨、讨厌…这东西…咿呀～…好烫………」`);
      }
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (penis === 1) {
          await era.printAndWait(`「好雄伟的肉棒…两只手都抓不住${heart(1)}」`);
        } else if (penis === 2) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒，很有活力地勃起着呢${heart(1)}　好可爱${heart(1)}　想咻咻地射出来吗${heart(1)}」`,
          );
        } else if (penis === 3) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊……${heart(1)}　包茎肉棒，剥开就满是雄性的味道……好高兴${heart(1)}」`,
          );
        } else if (penis === 4) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「马肉棒好厉害……${heart(1)}　脑袋要变得奇怪了${heart(1)}」`,
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊～…单是摸到大肉棒就已经按捺不住了～………${heart(1)}」`,
          );
          await era.printAndWait(
            `「当、当然让我奉仕大肉棒一整天也是能做到的、不过…啊啊～不要让大肉棒这么兴奋嘛${heart(1)}」`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「要是想射精的话…就射在${sc()}淫荡的嘴里吧…求你了～${heart(1)} 渴的没办法了～${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊啊啊…大肉棒～…好高兴…可以的话就请射精吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `${sc()}像打心眼里喜欢似的、慈爱地用手不断撸着阴茎。`,
          );
          await era.printAndWait(
            `「全部…全部都是${sc()}的哦～…啊啊啊…大肉棒好棒～…${heart(1)}」`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「精液…请把精液给我吧…请把精液赐给淫荡下流的${sc()}吧～${heart(1)}」`,
            );
          }
        }
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (penis === 1) {
          await era.printAndWait(`「好雄伟的棒棒…两只手都抓不住${heart(1)}」`);
        } else if (penis === 2) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒棒，很有活力地勃起着呢${heart(1)}　好可爱${heart(1)}　想咻咻地射出来吗${heart(1)}」`,
          );
        } else if (penis === 3) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊……${heart(1)}　包茎棒棒，剥开就满是雄性的味道……好高兴${heart(1)}」`,
          );
        } else if (penis === 4) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「马棒棒好厉害……${heart(1)}　脑袋要变得奇怪了${heart(1)}」`,
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊…明明只是用手摸到…又硬又烫的大鸡鸡…就总觉…${sc()}也…嗯嗯～」`,
          );
          await era.printAndWait(
            `曾经慈爱地给人们带来治愈的这双手、现在只是为了撸鸡鸡而存在。`,
          );
          await era.printAndWait(
            `「啊～…感、感觉怎样…会舒服吗？………好的～！会让您更舒服的～♪」`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「如果舒服的话…请不用顾虑尽管射出来吧…啊啊～…啊啊…精液…好想要精液～…${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊啊…只是摸了摸大鸡鸡…好像就兴奋起来了呢………」`,
          );
          await era.printAndWait(
            `${sc()}像打心眼里喜欢似的、慈爱地用手不断撸着阴茎。`,
          );
          await era.printAndWait(
            `「能让${sc()}做这么色情的事情的只有主人哦～………啊…啊啊…」`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「啊啊…变的…更爽吧…把精液满满地射出来吧…${heart(1)}」`,
            );
          }
        }
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「额呵呵…大鸡鸡对我”服服帖帖”的呢～♪」`);
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「觉得舒服的话…不用顾虑尽管射吧…啊啊～…啊啊…精液…好想要精液～…${heart(1)}」`,
          );
        }
        kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「总觉得…能分辨出能让大鸡鸡感到舒服的地方了呢…啊～～♪」`,
        );
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哈啊哈啊…呀啊啊…大鸡鸡…变的…这么硬了…感觉好怪…」`,
        );
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 31（口交，CFLAG:332）
  if (era_flag.selectcom === 31) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;
    const penis = era.get(`talent:${era_flag.player}:318`) || 0;

    if (kojo.口交_奴 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…能奉仕大肉棒～…好开心啊…嗯啾～啾～嘞噗～…嘞咯～…噗呼呜${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈啊啊…能尽情的吮吸了呢…嗯噗～…嗯啊…哈姆呜…啾～啾呜唔…嘞咯～♪」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `「好、好的…会、努力奉仕的…哈姆呜…啾～啾噗…嘞咯～…」`,
        );
      } else {
        await era.printAndWait(
          `「用、用嘴奉仕吗…知、知道了…啊啊嗯…哈姆…嗯啾…啾…呜啊…好咸………」`,
        );
      }
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (penis === 1) {
          await era.printAndWait(`「啊，雄伟的肉棒……我开动了${heart(1)}」`);
        } else if (penis === 2) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒啊，努力地勃起着呢${heart(1)}　真可爱${heart(1)}　这就好好给你……一点一点拨开来哦${heart(1)}　啊呜……」`,
          );
        } else if (penis === 3) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「满是男人味包皮肉棒啊……心跳加速了呢${heart(1)}　我开动咯……哈呣${heart(1)}」`,
          );
        } else if (penis === 4) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「巨大的马肉棒……下巴可得脱臼了吧${heart(1)}　我开动咯${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「嗯姆啾呜…哈啊…哈啊…大肉棒…美味…好美味啊…啊～～…呗咯～…啾～啾呜唔呜唔${heart(1)}」`,
        );
        await era.printAndWait(
          `「嘴巴要融化了～…嗯噗～…啾啪啊～…嘞噗～啾～啾呜呜～啾呜唔${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「请把精液都射进来吧…渴的没办法了～…嗯啊啊～${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}把精液吞进喉咙深处、享受着口交奉仕………`,
        );
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…喜欢大肉棒…好喜欢大肉棒啊…请让我更多…更多的侍奉它吧～…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}单是口交就已经把持不住的样子、一边摩擦着合并起来的双腿一边奉仕着………`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「精液～…请把精液满满的射进嘴里吧～${heart(1)}」`,
          );
        }
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (penis === 1) {
          await era.printAndWait(`「啊…雄伟的棒棒…被迷倒了${heart(1)}」`);
        } else if (penis === 2) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「小孩子似的鲜肉棒棒，努力地勃起着呢${heart(1)}　真可爱${heart(1)}　这就好好给你……一点一点拨开来哦${heart(1)}　啊呜……」`,
          );
        } else if (penis === 3) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「满是男人味包皮棒棒……心跳加速了呢${heart(1)}　我开动咯……哈呣${heart(1)}」`,
          );
        } else if (penis === 4) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「巨大的马棒棒……下巴可得脱臼了吧${heart(1)}　我开动咯${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊啊…${sc()}的嘴…是为了这样侍奉大鸡鸡而存在的～…♪」`,
        );
        await era.printAndWait(
          `「啊啊…已经完全含住了…所以请不用顾虑地把精液射进嘴里吧…♪」`,
        );
        await era.printAndWait(`${target_name}带着喜悦的表情继续着口交奉仕………`);
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「请给我满满的精液～…请主人给我满满的爱～…${heart(1)}」`,
          );
        }
        kojo.口交_奴 = 4;
      } else if (
        serve >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯咕～…嗯啾…嘞噗～…呼啊…哈啊哈啊…不让我再吮我可不会满足哦？…额呵呵～」`,
        );
        await era.printAndWait(
          `${target_name}用舌头舔了舔嘴唇之后、再次用舌头舔起了阴茎………`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(`「讨厌…应该…快了吧…精液…想要…好想要啊………」`);
        }
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊姆呜…嗯～…呗咯～…嗯呜唔…这样…含着…嗯～！嗯～！嗯嗯呜唔！」`,
        );
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 32（乳交，CFLAG:333）
  if (era_flag.selectcom === 32) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.乳交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
          `「额呵呵～…用乳房做舒服吗${heart(1)}　请尽情的射精吧${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊…${sc()}的乳房是为了这样奉仕您而存在的呢…请变的更舒服吧～♪」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `「嗯～…乳房还能这样用呢…额呵呵、比预想的更有趣呢………」`,
        );
      } else {
        await era.printAndWait(
          `「咕呜～…我、我的胸部…是给小宝宝哺乳用的啊…啊…哈啊………」`,
        );
      }
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.乳交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯～…啊～…哈啊～～…再继续侵犯我的乳房吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊呜唔…要射精的话…请满满的射在乳房上吧～${heart(1)}」`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「我会把精液全部舔干净的～…啊哈啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}一边露出淫猥的笑容一边倾斜着乳房奉仕着鸡鸡………`,
          );
        } else {
          await era.printAndWait(`「啊啊～…乳房被侵犯了～…${heart(1)}」`);
          await era.printAndWait(
            `「尽情射精吧～…请把乳房浇满腥臭的精液吧～${heart(1)}」`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「精液…想咻噜咻噜的全部吸光呢…${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}继续用丰满的两乳淫猥地进行奉仕………`,
          );
        }
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊～…更多地侵犯乳房吧～…${heart(1)}」`);
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`${target_name}不断地用丰满的两乳施加刺激………`);
        }
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「请把精液满满地射出来吧…${heart(1)} 赐给${sc()}吧${heart(1)}」`,
          );
        }
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～…嗯～嗯呼呜…和主人一起做快乐的事、总觉得非常…开心呢…啊啊～…♪」`,
          );
          await era.printAndWait(
            `「哈啊啊～…${sc()}也…觉得乳房…好舒服呢…啊～…还要…我还要再奉仕～♪」`,
          );
          await era.printAndWait(`${target_name}开心的眯起眼沉浸在奉仕中………`);
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「变的好舒服啊…精液…请把精液射出来吧…啊啊…${sc()}也好想要呢${heart(1)}」`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊啊…请更多的…更多的把${sc()}的乳房…当玩具用吧～………♪」`,
          );
          await era.printAndWait(
            `「啊～咿～…啊～啊啊啊～…哈啊啊啊…乳房…好舒服…多摩擦大鸡鸡一下吧………${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边露出圣女般的笑容一边继续着淫靡的奉仕………`,
          );
          if (semen_addict >= 3) {
            await era.printAndWait(
              `「啊啊～…黏糊糊的精液…满满的射在…${sc()}的身体上了…${heart(1)}」`,
            );
          }
        }
        kojo.乳交 = 4;
      } else if (serve >= 3 && (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)) {
        await era.printAndWait(
          `「哈啊～…啊～啊～～…讨、讨厌…明明只是用乳房摩擦大鸡鸡而已………」`,
        );
        await era.printAndWait(
          `「为什么…会这么爽呢…啊啊～…更多…更多的摩擦吧…♪」`,
        );
        await era.printAndWait(`${target_name}开心的眯起眼沉浸在奉仕中………`);
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「啊啊～…大鸡鸡一颤一颤的…精液…精液要出来了吗？…请尽情射出来吧${heart(1)}」`,
          );
        }
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈啊…啊啊…感、感觉怎样…会舒服…吗…？」`);
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 33（股间性交，CFLAG:334）
  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「额呵呵～…这就是所谓的”素股”吧…啊啊…大鸡鸡好烫啊…」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「大鸡鸡不用插进来吗…？诶、只要舒服就行？啊…嗯～…啊哈啊${heart_black(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊～…不、不能不做这样的事吗…啊～…啊～～…」`,
        );
      }
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～啊～哈啊啊啊…嗯呼呜…呐、主人～…要是肉棒…就这样…插进${sc()}的小穴里去了该怎么办呢？」`,
        );
        await era.printAndWait(
          `「…额呵呵～…没关系哦…${sc()}的贞洁该怎么处置…就全交由主人判断啦…呵呵…额呵呵${heart_black(1)}」`,
        );
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～～…不要挑逗人家嘛…求你了～…${heart_black(1)}」`,
        );
        await era.printAndWait(
          `「明明好想要…大肉棒啊…啊啊～…啊～…啊～～…把人家弄得不上不下的…要疯了～${heart_black(3)}」`,
        );
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…嗯呜唔～…哈啊啊～…那、那个…主人…总觉得…好难受啊…」`,
        );
        await era.printAndWait(
          `「咕呜嗯～…啊啊～…哈啊啊～…大鸡鸡…都这么烫了…」`,
        );
        await era.printAndWait(
          `${target_name}现在有点神情沮丧地继续做着素股………`,
        );
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…鸡鸡好烫…啊啊～…真的…好想被插进来呢…」`,
        );
        await era.printAndWait(`「是、是～、我知道了～…会努力奉仕的哦………♪」`);
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊呜～…大鸡鸡…好烫…感觉变得好奇怪啊………」`);
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 34（骑乘位，CFLAG:335）
  if (era_flag.selectcom === 34) {
    const v_sense = era.get(`abl:${target}:2`) || 0;
    const v_insensible = era.get(`talent:${target}:103`) === 1;
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    if (kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…主人～…${sc()}的处女…请收下吧${heart(1)}……额呵呵、总觉得心跳不已呢…」`,
          );
          await era.printAndWait(
            `「哈呜～…咕…啊啊…就这样插进去…啊啊～啊～、啊啊啊啊啊啊啊～～！！！」`,
          );
          await era.printAndWait(`${target_name}自己沉下腰把处女献了出来。`);
          await era.printAndWait(
            `「哈啊…哈啊…啊啊啊…主人的大肉棒…进到里面去了～…啊～啊啊～啊啊啊～${heart(1)}」`,
          );

          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `${target_name}开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。`,
            );
            await era.printAndWait(
              `「大肉棒…大肉棒…好棒～…这样子的话…已经什么也不用在意了～${heart(1)}」`,
            );
            await era.printAndWait(
              `随着腰身的上下运动${target_name}脑海中故乡恋人的事情像被橡皮擦擦去一般的消失了。`,
            );
            await era.printAndWait(`已经连他的脸和表情都想不起来了吧………`);
          } else {
            await era.printAndWait(
              `${target_name}开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。…`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「嗯、真是的…要让我自己…插进去吗…」`);
          await era.printAndWait(`「好吧…${sc()}的处女…请收下吧${heart(1)}」`);
          await era.printAndWait(
            `「这可是…一直珍惜着的东西呢…啊～～…哈～…呜～…咕呜呜呜～…嗯～！」`,
          );

          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `（啊啊…${sc()}从现在起…为了你…而生～…${heart(1)}）`,
            );
            await era.printAndWait(
              `是想起了故乡的恋人了吗、${target_name}的眼角流下了一滴眼泪………`,
            );
          } else {
            await era.printAndWait(`${target_name}的眼角流下了一滴眼泪………`);
          }
        } else {
          await era.printAndWait(`「啊啊～…要这样…自己插进去吗…」`);
          await era.printAndWait(
            `「啊呜呜～…不、不要…抓着…腰…咿咿咿～～！啊～啊啊啊啊！」」`,
          );

          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `（我、${sc()}…已经…回不了故乡了…再也回不去了………呜！）`,
            );
            await era.printAndWait(
              `是想起了故乡的恋人了吗、${target_name}的双眼泪流不止………`,
            );
          } else {
            await era.printAndWait(`${target_name}的双眼泪流不止………`);
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊…插进去的地方～…全部被看到了…嗯～嗯呼呜呜${heart(1)}」`,
          );
          await era.printAndWait(`「啊啊啊…被看着好有感觉啊～～…${heart(1)}」`);

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、自己一边看着一边把${player_name}的阴茎连根吞下并开始淫猥地像磨盘似的扭着腰………………`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「骑在主人身上…啊啊、总觉得好淫荡啊♪」`);
          await era.printAndWait(
            `「啊～啊啊～…那么这样…插进去的地方…就全部被看光了呢…啊啊～啊啊啊～！」」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、自己将${player_name}的阴茎连根吞下并开始上下动起了腰………`,
            );
          }
        } else {
          await era.printAndWait(`「咕呜呜～…进到…里面去了……」`);

          if (v_insensible) {
            await era.printAndWait(
              `因为${target_name}的私处不太容易有感觉、被插入的异物感令${target_name}忍不住发出了痛苦的呻吟………`,
            );
          } else {
            await era.printAndWait(`${target_name}皱着眉头忍耐着异物感………`);
          }
        }
      }
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.骑乘位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「咿啊啊～…啊～啊啊啊啊…腰完全停不下来啊～～…大肉棒实在是太爽了～～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}淫猥地扭着腰、用整个阴道品味着阴茎。`,
          );
          await era.printAndWait(
            `「把精液射进来吧…呐…求您了～…把${sc()}淫乱的小穴里～…用主人的精液到处打满记号吧～！」`,
          );
          if (era.get(`talent:${target}:153`) !== 1) {
            await era.printAndWait(
              `「即使怀孕也没事～${heart(1)} 让我生下主人的孩子吧～${heart(1)}」`,
            );
          }
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「请更多的…欺负我吧…${sc()}的淫乱小穴…已经湿成一片了～…让我变的更爽吧～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}好不容易集中起残存的理性却只是向${player_name}提出了下流的要求。`,
          );
          await era.printAndWait(
            `「尽情的…欺负～…小穴…黏糊糊湿答答的…已经…已经…忍不住了～${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊～啊～…咿～…咕呜～…啊啊～…啊～…啊啊啊啊啊啊啊啊啊啊啊啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「明明觉得…不能再这样下去了…啊～…啊～～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「淫乱的小穴…一被弄得黏糊糊的…就忍不住了～…${heart(1)}」」`,
          );
          await era.printAndWait(
            `「好像做梦一样…被侵犯…被侵犯…要变得奇怪了～${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}为了贪求快乐扭动着腰身………`);
        } else {
          await era.printAndWait(
            `「啊啊～啊啊…啊呼呜～…啊～啊啊啊～…更多的…黏糊糊地插进来吧！把我弄坏吧～！」`,
          );
          await era.printAndWait(
            `「啊啊、这样子…紧紧黏在一起…要变成主人专用的阴茎容器了～…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}一脸陶醉地收紧着阴道口………`);
        }
        kojo.骑乘位 = 9;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `${target_name}把阴茎放进阴道深处、发出了轻轻的呻吟。`,
          );
          await era.printAndWait(`「咕啊啊――――――啊～…哈啊啊啊啊${heart(1)}」`);
          await era.printAndWait(
            `「稍微…高潮了一下呢…让${sc()}变的、这么不知羞耻…你可要…负起责任…呢…啊～～${heart(1)}」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊～嗯～…嗯啊啊～…啊～～…被这样抽插着…要不行了～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被调教的即使被毫不留情的抽插、也能通过阴道里的刺激得到快感的样子。`,
          );
          await era.printAndWait(
            `${target_name}已经完全将沉浸在与${player_name}的快乐之中作为活下去的理由的样子。`,
          );
          await era.printAndWait(
            `「马上就要去了…所以先别射哦…请让我变得更舒服吧…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊…主人～…喜欢你～${heart(1)} 好喜欢你啊${heart(1)} 所以再多操我的小穴吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}沉溺在强烈的快乐中、半苦半叫地扭动着腰`,
          );
          await era.printAndWait(
            `「已经不能…没有这个了…不能…即使一天不做也忍不下去了啊…啊啊～…还想要～！」`,
          );
        } else {
          await era.printAndWait(`「啊～…唔嗯～…嗯～嗯嗯～♪…嗯呼呜～♪」`);
          await era.printAndWait(
            `「主人的精液…${sc()}全部…收下了呢…啊啊～啊～啊哈啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的身上扭动着腰娇喘不已………`,
          );
        }
        kojo.骑乘位 = 8;
      } else if (
        era.get(`talent:${target}:75`) === 1 &&
        (kojo.正常位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊～…明明是这么羞耻的姿势…但是好爽啊～！…啊啊～啊～～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自己前后舂动着腰贪求着快乐、她的表情因为淫乱而扭曲、平常的清纯模样早已烟消云散。`,
          );
          await era.printAndWait(
            `「大肉棒…真舒服～${heart(1)} 好舒服啊～…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「大肉棒…全部插进去了～…${heart(1)}」`);
          await era.printAndWait(
            `「明明既不是结婚对象…也不是恋人…啊啊～啊～…但是太舒服了实在没办法啊～…咿～啊呜啊啊啊～${heart(1)}」」`,
          );
          await era.printAndWait(
            `抓住沉溺于快乐中的${target_name}的腰、每次往阴道里捅就会发出高亢的娇喘声………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊～…好深…好深啊…${heart(1)} 小穴里面…完全被大肉棒侵占啦～～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}为了贪求${player_name}的鸡鸡不断上下扭动着腰。`,
          );
          await era.printAndWait(
            `「啊啊～${heart(1)} 更多地…惩罚成为肉棒奴隶的${sc()}吧～${heart(1)}」`,
          );
        }
        kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「咿啊啊～…啊～啊啊啊啊…腰完全停不下来啊～～…大肉棒实在是太爽了～～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}曾是圣女的一部分的钝感私处被开发的感觉到了无穷的快感。`,
            );
            await era.printAndWait(
              `”淫乱”的${target_name}完全沉溺在了快乐之中、淫猥地摇晃着腰品味着阴茎………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}淫猥地摇着腰身、品味着阴茎………`,
            );
          }
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「哈啊啊～…嗯呼呜${heart(1)}　这样子插得好深啊～…${heart(1)}」`,
          );
          await era.printAndWait(
            `「紧密地${heart(1)} 紧密地${heart(1)} 扭着腰…好喜欢…嗯啊啊～～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被调教出了快感、坦率的接受快感的${target_name}很愉快的前后扭着腰、身体一次又一次的痉挛着………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}每次扭动腰身、就会一颤一颤地痉挛起来、品味着快乐………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯呜唔～…啊啊～…啊～～…啊啊啊啊～…${scf()}～${sc()}的淫乱小穴刚才擅自就高潮了真是对不起～${heart(1)}」`,
          );
          await era.printAndWait(
            `「不过～…腰…停不下来啊～…小穴太淫乱了真是对不起～${heart(1)}」`,
          );
          await era.printAndWait(
            // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
            `「啊啊～…主人～${heart(1)}　更多的…更多的欺负我吧～～！」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}的私处已经被开发得忘记钝感时候的感觉了、${target_name}带着陶醉的表情激烈的摇动着腰喘息不已………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}带着陶醉的表情、激烈的摇动着腰沉浸在快乐之中………`,
            );
          }
        } else {
          await era.printAndWait(`「嗯唔～…啊咿～…不要…不要…${heart(1)}」`);
          await era.printAndWait(
            `「啊～啊啊啊～…嗯～咕呜～…呜啊…已经…不行了…已经…除了小穴其他什么也不想嘞…${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}的私处已经被开发得忘记钝感时候的感觉了、${target_name}嘴边耷拉着口水贪求着快乐………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(`${target_name}嘴边耷拉着口水贪求着快乐………`);
          }
        }
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「嗯～…啊、啊啊～…不用动也可以哦…能让主人舒服的话…就行～♪」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、为了进一步品尝那种滋味${target_name}一边开心的笑着一边上下动着腰………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}一边开心的笑着一边扭动着腰品味着快乐………`,
            );
          }
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊～…嗯嗯～…啊～～…不行爽过头了～…忍不住了～…♪」」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、自己将${player_name}的阴茎连根吞下并发出了很带感的呻吟声………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}一把你的阴茎吞入体内就欢喜的颤抖不已………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「喜欢…好喜欢主人的东西啊…啊啊～…♪」`);
          await era.printAndWait(
            `「这里…也希望主人能变的更舒服点呢…啊～啊啊～…哈唔呜～…让我…来奉仕您吧～${heart(1)}」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、尝到这种快乐的${target_name}淫笑着摇动着腰持续进行着仕奉………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}一边淫笑着、一边继续努力侍奉着${player_name}………`,
            );
          }
        } else {
          await era.printAndWait(`「啊～…唔嗯～…嗯呜唔呜…嗯呼呜～♪」`);
          await era.printAndWait(
            `「啊啊～…这么的舒服…已经变的离不开它了…啊～啊啊～啊啊啊啊！」`,
          );

          if (v_sense >= 3 && v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处已经变成了产生快感的蜜壶、${target_name}神情陶醉的舂动着腰品味着快乐………`,
            );
          } else if (v_sense >= 3) {
            await era.printAndWait(
              `${target_name}陶醉地舂动着腰引诱着${player_name}射精………`,
            );
          }
        }
        kojo.骑乘位 = 5;
      } else if (
        mark(2) === 3 &&
        v_sense >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「啊～…嗯咕～…咿～！？…这、这是什么…啊～哈啊～！」`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、${target_name}开始有感觉了………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}因为自己私处传来的快感而感到迷惑、开始有感觉了的样子………`,
            );
          }
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊咿呀～！？…啊～…啊～啊啊～…总觉得…好奇怪啊…那里变的…好奇怪哦～」`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、慢慢的沉溺于溢出的快感之中………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}慢慢的沉溺于溢出的快感之中………`,
            );
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～…唔诶…啊～嗯～！嗯～！…爽、好爽～！？……啊啊、这样、好爽…${heart(1)}」`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、慢慢的沉溺于溢出的快感之中………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}慢慢的沉溺于溢出的快感之中………`,
            );
          }
        } else {
          await era.printAndWait(
            `「啊～…嗯咕～…咿～！？…这、这是怎么回事…啊～哈啊～！」`,
          );

          if (v_insensible) {
            await era.printAndWait(
              `${target_name}钝感的私处被开发得觉醒了快感、${target_name}对快感有些迷茫但还是上下动起了腰………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}因为自己私处传来的快感而感到迷惑、开始有感觉了的样子………`,
            );
          }
        }
        kojo.骑乘位 = 4;
      } else if (
        mark(2) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊～…嗯呜唔…这、这样做的话…会舒服吗…？」`);

        if (v_insensible) {
          await era.printAndWait(
            `${target_name}自己动着私处、但不是很有感觉、被插入的异物感令${target_name}忍不住发出了痛苦的呻吟………`,
          );
        } else {
          await era.printAndWait(`${target_name}生硬地遵从着你的命令………`);
        }
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊…咕、呜唔…啊～啊啊～！…这样动就可以了吧…嗯～！」`,
        );

        if (v_insensible) {
          await era.printAndWait(
            `因为${target_name}的私处不太容易有感觉、被插入的异物感令${target_name}忍不住发出了痛苦的呻吟………`,
          );
        } else {
          await era.printAndWait(`${target_name}皱着眉头忍耐着异物感………`);
        }
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 35（全身擦洗，CFLAG:336）
  if (era_flag.selectcom === 35) {
    const serve = era.get(`abl:${target}:16`) || 0;

    if (kojo.全身擦洗 === 0) {
      if (serve >= 3) {
        await era.printAndWait(
          `「额呵呵～…还有这样的洗法啊…我会努力奉仕的哦…♪」`,
        );
      } else {
        await era.printAndWait(
          `「诶、要用${sc()}的身体来为${scf()}做擦洗吗…？」`,
        );
      }
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…感觉如何呢…${sc()}的身体～…额呵呵、这样擦洗身体…总觉得…嗯…啊…哈啊～～♪」`,
        );
        await era.printAndWait(`${target_name}故意发出了喘息声………`);
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…嗯呼呜…明明是在奉仕…${sc()}却自己舒服起来了…啊啊～…对不起～～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的两腿之间溢出了不是泡沫的粘稠物质………`,
        );
        kojo.全身擦洗 = 4;
      } else if (
        serve >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯～…嗯唔～…啊啊～…啊啊…总觉得掌握到诀窍了呢…嗯呼呜♪」`,
        );
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊～…哈…嗯唔…啊、这、这样做是吗………」`);
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 36（骑乘位肛交，CFLAG:337）
  if (era_flag.selectcom === 36) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const a_insensible = era.get(`talent:${target}:105`) === 1;

    if (kojo.骑乘位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊～…快看…大肉棒被${sc()}的…屁股眼…啊～哈啊啊啊…全部吞进去了～咕呜～${heart(1)}」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被调教出了快感、将鸡鸡连根吞下、${target_name}发出了淫乱的呻吟声………`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嗯啊…哈啊啊…屁股眼…被撑开了………嗯咕呜～…先、先不要动哦～…就让${sc()}来…全力地动吧♪」`,
        );

        if (a_sense >= 3 && a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发而觉醒了快感、一将鸡鸡连根吞下、${target_name}就娇喘出声………`,
          );
        }
      } else {
        await era.printAndWait(
          `「咕呜…不要全放进去啊…嗯～…嗯～…呜呜呜呜呜～！」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦的呻吟着………`,
          );
        }
      }
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～…嗯呼呜呜呜…不行不行不行了…屁股眼被…大肉棒…全部…插进来了～…啊啊啊啊啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}放弃抵抗苦闷的喘息着、用肛门将阴茎全部收纳进来。`,
          );
          await era.printAndWait(
            `「哈咕呜…呜啊啊～…啊啊～…呜～…呼呜～…啊啊～…已经、已经…要不行了…已经…停不下来了～～～～～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得品尝到了快感、用肛门将阴茎连根吞入、${target_name}激烈的上下动着腰………`,
            );
          }
        } else {
          await era.printAndWait(
            `「嗯咿～…咿呜…啊啊～屁股眼好爽啊～${heart(1)}」`,
          );
          await era.printAndWait(
            `「爽爆了～…总觉得其他事情都已经变的无所谓了～…啊啊～已经不能不去侍奉主人了啊～」`,
          );
          await era.printAndWait(
            `「啊啊～啊～哈啊啊啊～！屁股眼…更多的欺负～欺负～欺负吧啊～～～～～～～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被开发得品尝到了快感、${target_name}不断地上下动着腰用肛门贪求着快感…`,
            );
          }
        }
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯咿～…咿呜…啊啊～屁股眼好爽啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `「爽爆了～…总觉得其他事情都已经变的无所谓了～…啊啊～已经不能不去侍奉主人了啊～」`,
        );
        await era.printAndWait(
          `「啊啊～啊～哈啊啊啊～！屁股眼…更多的欺负～欺负～欺负吧啊～～～～～～～${heart(1)}」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `虽然${target_name}的肛门还在纠正钝感的开发途中、但${target_name}还是淫猥地摇着腰身、用肛门品味起了阴茎………`,
          );
        }
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊～啊啊～…啊啊～…用屁股眼…竟然这么的有感觉～………」`,
          );
          await era.printAndWait(
            `「已经…再也离不开主人了～～～…啊～啊～～啊呼呜～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被开发而觉醒了快感、${target_name}一边前后摇晃着纤细的腰一边品味着肛门的快感………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}一边前后摇晃着纤细的腰一边品味着肛门的快感………`,
            );
          }
        } else {
          await era.printAndWait(
            `「嗯～…啊啊～啊～～！咿呀～…哈呜呜嗯～…咿呀～♪」`,
          );
          await era.printAndWait(
            `「啊啊～…对不起～…明明想好好奉仕的…但因为屁股眼实在太舒服了…腰停不下来了～${heart(1)}」`,
          );

          if (a_insensible) {
            await era.printAndWait(
              `${target_name}钝感的肛门被开发的能产生出快感了、${target_name}因为这种快乐而按捺不住了、腰身的上下运动已经停不下来了的样子………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}由于肛门的快乐而按捺不住了、腰身的上下运动已经停不下来了的样子………`,
            );
          }
        }
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯～…啊啊～啊～～！咿呀～…哈呜呜嗯～…咿呀～♪」`,
        );
        await era.printAndWait(
          `「啊啊～…对不起～…明明想好好奉仕的…但因为屁股眼实在太舒服了…腰停不下来了～${heart(1)}」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `虽然${target_name}的肛门还在纠正钝感的开发途中、但因为是被所爱慕的${player_name}侵犯的缘故、开心的腰都停不下来的样子………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}侵犯了、${target_name}一边开心地娇喘着一边上下动着腰………`,
          );
        }
        kojo.骑乘位肛交 = 4;
      } else if (
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咿～～…不行…不行了…屁股眼爽到不行了～…啊～啊啊～！」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门被开发了、${target_name}一边呻吟着一边上下动着腰………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}觉醒了肛门的快感、一边呻吟一边上下动着腰………`,
          );
        }
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「咕～…呜呜～…嗯嗯～…已经…不想再动了～…啊啊～…啊呜～！」`,
        );

        if (a_insensible) {
          await era.printAndWait(
            `${target_name}钝感的肛门一将鸡鸡连根吞下、${target_name}就发出了悲鸣………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被从下方抽插着肛门、痛苦的呻吟着………`,
          );
        }
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 37（肛门侍奉，CFLAG:338）
  if (era_flag.selectcom === 37) {
    const serve = era.get(`abl:${target}:16`) || 0;

    if (kojo.肛门侍奉 === 0) {
      if (serve >= 3) {
        await era.printAndWait(`「嗯…咕…啾…呗咯…呗咯～…嘞咯…哈啊啊…好苦………」`);
        await era.printAndWait(
          `${target_name}下定决心用舌头舔起了${player_name}的肛门………`,
        );
      } else {
        await era.printAndWait(`「要用嘴…舔这种地方…嗯～…好臭…呜唔～…呜呜～」`);
        await era.printAndWait(
          `${target_name}一边落泪一边亲吻着${player_name}的肛门………`,
        );
      }
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        serve >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊…嗯～…嗯啾呜…嘞咯～…呗咯～…呗咯…啊啊～好美味啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}神情陶醉的将舌头深入${player_name}的肛门之中持续地奉仕着………`,
        );
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊…主人～…舌头伸到里面感觉舒服吗？嗯啾…啾…啾呜呜呜」`,
        );
        await era.printAndWait(
          `${target_name}开心的将舌头深入肛门不断奉仕着。`,
        );
        await era.printAndWait(
          `「哈啊啊啊…奉仕太棒了…真想永远这样舔主人的肛门呢～………♪」`,
        );
        await era.printAndWait(
          `一脸陶醉的${target_name}大有将肛门侍奉持续一整天的势头………`,
        );
        kojo.肛门侍奉 = 4;
      } else if (
        serve >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嘞噗～…啾呜…嘞咯～…啾～啾唔呜唔………哈啊…哈啊…」`,
        );
        await era.printAndWait(`${target_name}已经习惯了肛门侍奉的样子………`);
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯咕～…啾～…啾…嘞咯～…呗咯…啾……呜唔…」`);
        await era.printAndWait(
          `${target_name}一边落泪一边用舌头舔着${player_name}的肛门………`,
        );
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 40（打屁股，CFLAG:341）
  if (era_flag.selectcom === 40) {
    const masochism = era.get(`abl:${target}:21`) || 0;
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    if (kojo.打屁股 === 0) {
      await era.printAndWait(
        `「呀啊啊～！…啊啊～…为、为什么要打我啊～…咿～！不要打～！」`,
      );
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…咿呀～～…啊～～！嗯呼呜…啊～…哈啊啊啊啊～～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}像引诱你似的左右摇着屁股、每次被打就会发出娇艳的呻吟声、爱液从大腿上垂落下来………`,
        );
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咿呀～～…啊～…哈唔嗯～…啊啊～…请更多的…更多的打我吧………」`,
        );
        await era.printAndWait(
          `${target_name}像引诱你似的左右摇着屁股、每次被打都会发出色气满满的声音………`,
        );
        kojo.打屁股 = 4;
      } else if (
        mark(0) === 3 &&
        mark(2) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯～…咕呜～啊～…啊～～…咿～…咕、这、这样的…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}已经放弃了似的自己把屁股伸出来承受着击打………`,
        );
        kojo.打屁股 = 3;
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊～…咕～…咿～…好痛～好痛啊～…请你住手吧～～～！」`,
        );
        await era.printAndWait(
          `${target_name}泪流不止悲痛地叫喊着、承受着屁股上的击打………`,
        );
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 41（鞭，CFLAG:342）
  if (era_flag.selectcom === 41) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.鞭 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊…虽然被抽也不是不可以…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「${scf()}、${sc()}是不会反抗的…所以求您了…不要这样…呀呜呜呜～！」`,
        );
      } else {
        await era.printAndWait(`「咿～…这、这样子…啊啊～！好痛～好痛啊～！」`);
      }
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊～…啊～…嗯咿咿咿～…${heart(1)}」`);
        await era.printAndWait(
          `「啊啊啊啊…被这样打…为什么会这么舒服呢…已经…再也变不回去了…嗯～啊～…哈啊啊啊………${heart(1)}」`,
        );
        await era.printAndWait(
          `每次被鞭子抽打、爱液就会从${target_name}的私处飞散开来………`,
        );
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…啊～…呀呜唔嗯～…啊～哈啊～啊啊～…已经不觉得怎么痛了…因为有感觉了～${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每次被鞭子抽打就会发出娇艳的呻吟、惹来了更加强烈的鞭打………`,
        );
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀呜呜～～…请赐给我这只色情的母狗…更多的痛苦吧…请我更多的惩罚吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}每次被鞭打就会蜷曲着身体发出悲鸣声………`,
        );
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…啊～…啊啊啊～～！…哈啊…哈啊…啊啊…好奇怪…这样…好奇怪啊………」`,
        );
        await era.printAndWait(
          `${target_name}每次被鞭打就会摩擦起双腿、露出陶醉的表情。`,
        );
        await era.printAndWait(
          `「总觉得…好舒服呢…啊啊～请更多地…鞭笞我吧………」`,
        );
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…嗯～…嗯啊～…咿～…啊啊…为…什么…明明…是被鞭打…啊啊～！」`,
        );
        await era.printAndWait(
          `${target_name}不断地被鞭打着。但是比起痛楚更多的是一种奇妙的瘙痒感………`,
        );
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}是…不会…反抗你的…不会反抗的…啊啊…所以…请饶了我吧…咿～～！」`,
        );
        await era.printAndWait(`${target_name}一被鞭打就出声讨饶………`);
        kojo.鞭 = 4;
      } else if (masochism >= 3 && (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)) {
        await era.printAndWait(
          `「啊啊～！…啊啊…不、不对…这是…咿呀～～…啊～啊啊啊～～！」`,
        );
        await era.printAndWait(
          `${player_name}的鞭子在${target_name}的身上一次又一次的抽打着。`,
        );
        await era.printAndWait(
          `然后每鞭打数次${target_name}就会发出一声娇艳的呻吟………`,
        );
        kojo.鞭 = 3;
      } else if (kojo.鞭 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊～…求你了…快住手吧…求你了…」`);
        await era.printAndWait(`${target_name}泪流满面、祈求饶恕………`);
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 42（针，CFLAG:343）
  if (era_flag.selectcom === 42) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.针 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…这次要这样开发${sc()}吗～…是～…我会好好忍耐的…」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「不、不要～…${sc()}是…不会反抗的…所以只有会痛的事情…啊啊啊～！」`,
        );
      } else {
        await era.printAndWait(
          `「要、要用这根针做什么…啊啊～住～､住手啊啊啊啊啊啊！！」`,
        );
      }
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…哈呜～…嗯～…那里～…还要…还想被刺啊～～～～！」`,
        );
        await era.printAndWait(
          `${target_name}发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………`,
        );
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯呼呜…继续…继续插我～…嗯咿～…总觉得好麻啊…啊～啊～♪」`,
        );
        await era.printAndWait(`${target_name}因为被针刺的麻痒感觉而迷惑了………`);
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啊～…啊～…哈咕呜…果然…还是很痛～…咕…嗯嗯嗯～！」`,
        );
        await era.printAndWait(`${target_name}忍耐着被针刺的疼痛………`);
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「明明…应该…只会感到痛的…嗯呼呜…为什么会有感觉…呢…………呀啊啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………`,
        );
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…啊～…嗯呼呜…明明是被刺着…为什么…啊啊～！」`,
        );
        await era.printAndWait(`${target_name}因为被针刺的麻痒感觉而迷惑了………`);
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…求求你…${sc()}是不会反抗你的…所以不要再让我痛了…啊啊啊～！」`,
        );
        await era.printAndWait(`${target_name}每次被针戳就会发出悲鸣声………`);
        kojo.针 = 4;
      } else if (masochism >= 3 && (kojo.针 <= 2 || game.kojo.口上开关 === 2)) {
        await era.printAndWait(
          `「咕呜～…嗯～…啊啊～…啊啊啊啊…总觉得…像过电似的…好奇怪…呢………」`,
        );
        await era.printAndWait(`${target_name}因为被针刺的麻痒感觉而迷惑了………`);
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咕呜～…呜啊啊…啊～…咕呜呜～…咿～～…」`);
        await era.printAndWait(
          `${target_name}咬着嘴唇忍受着痛楚、但还是从嘴边漏出了痛苦的声音………`,
        );
        kojo.针 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 43 && TEQUIP:43（眼罩开始，CFLAG:344）
  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.眼罩 === 0) {
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 4;
      } else if (
        masochism >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        kojo.眼罩 = 2;
      }
      return 0;
    }
  }

  // ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0（眼罩脱着，CFLAG:380）
  if (era_flag.selectcom === 43 && !era.get(`tequip:${target}:43`)) {
    if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('');
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 44 && TEQUIP:44（绳子开始，CFLAG:345）
  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.绳子 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊啊…请再绑紧一点～…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「这就是所谓的爱的奴隶…吧…？」`);
        await era.printAndWait(
          `「额呵呵、${sc()}即使没被绳子绑起来…也不会想逃走啦………♪」`,
        );
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        );
      } else {
        await era.printAndWait(`「哈啊哈啊…这、这样子…没事…」`);
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        );
      }
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊～…被绳子绑的紧紧的～${heart(1)}」`);
        await era.printAndWait(
          `「啊啊～…明明被绳子绑着应该感到又痛又怕的…啊～啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被绳子绑着、爱液不停地滴落下来………`,
        );
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        masochism >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「是～…我喜欢被…捆绑呢${heart(1)}」`);
        await era.printAndWait(
          `「因为喜欢…所以请更多的…绑我吧………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}扭扭捏捏的用期待的眼神看着你………`);
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯呼呜…要被绳子吃掉了…好爽～…${heart(1)}」`);
        await era.printAndWait(`${target_name}被粗绳子绑着显得很愉悦的样子………`);
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…果然${sc()}是…主人的所有物…再次得到确认了…♪」`,
        );
        await era.printAndWait(
          `「啊～～…被绑着…虽然痛…但是好舒服～…咿呀～～！啊～～！啊啊～♪」」`,
        );
        await era.printAndWait(
          `${target_name}露出发情的母狗般的表情被粗绳子绑住了………`,
        );
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯呜唔…总觉的…感觉变的好奇怪～…♪」`);
        await era.printAndWait(
          `「请再绑紧一点…让${sc()}再也逃不出主人的五指山………♪」`,
        );
        await era.printAndWait(`${target_name}一脸愉悦地被粗绳子绑住………`);
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…请再绑紧一点～…这就是${sc()}是主人的所有物的证据…啊啊啊啊………」`,
        );
        await era.printAndWait(`${target_name}一脸陶醉地被粗绳子绑住………`);
        kojo.绳子 = 4;
      } else if (
        masochism >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…为什么…明明被绑起来了…那个地方却痒痒的…啊～、我刚才什么也没说…什么也没有」`,
        );
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        );
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈啊～…啊～…嗯～…这样、不算什么………」`);
        await era.printAndWait(
          `${target_name}的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………`,
        );
        kojo.绳子 = 2;
      }
      return 0;
    }
  }

  // ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0（绳子脱着，CFLAG:385）
  if (era_flag.selectcom === 44 && !era.get(`tequip:${target}:44`)) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊…哈啊…啊啊…明明可以再绑一会儿的…${heart(1)}」`,
      );
      kojo.绳子着脱 = 2;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「额呵呵…下次什么时候再把我绑起来吧…？」`);
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊哈啊…这、这样子…啊啊～会留下痕迹的………」`);
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 45 && TEQUIP:45（口塞开始，CFLAG:346）
  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.口塞 === 0) {
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`);
      } else {
        await era.printAndWait(`「哈咕～…呜呜…」`);
      }
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`);
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        masochism >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`);
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈咕～…嗯～${heart(1)}」`);
        kojo.口塞 = 4;
      } else if (
        masochism >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈咕～…呜唔嗯…${heart(1)}」`);
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈咕～…呜呜…」`);
        kojo.口塞 = 2;
      }
      return 0;
    }
  }

  // ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0（口塞脱着，CFLAG:386）
  if (era_flag.selectcom === 45 && !era.get(`tequip:${target}:45`)) {
    if (
      (era.get(`talent:${target}:85`) === 1 ||
        era.get(`talent:${target}:76`) === 1) &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯咕～…噗啊…哈啊…哈啊…哈啊…${heart(1)}」`);
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「嗯咕～…噗啊…哈啊…哈啊…哈啊…」`);
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  // IF SELECTCOM == 46 && TEQUIP:46（灌肠+肛塞开始，CFLAG:347）
  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (kojo.灌肠肛塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「呼啊啊～…肚子鼓起来了…啊啊～…这是…什么…肚子…啊啊～…啊～」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「肚子好难受…好难受呢…请不要…太欺负我了………」`);
      } else {
        await era.printAndWait(
          `「咿～…不要不要不要啊～…像这样灌进去的话…呜～…咕呜…好难受～…」`,
        );
      }
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～…啊啊～…再灌啊…灌到极限为止～…把肚子灌成水桶似的吧…！」`,
        );
        await era.printAndWait(
          `「嗯～…哈啊…哈啊…${sc()}的肚子…已经变成主人的玩具了～…♪」`,
        );
        await era.printAndWait(
          `「接下来…肚子里的东西全部喷出来的不堪入目的样子…请好好欣赏吧～${heart(1)}」`,
        );
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咿呀啊啊啊…浣肠液…咕噜咕噜的灌进肚子里面去了～…♪」`,
        );
        await era.printAndWait(
          `「啊啊啊啊…${sc()}肚子里的丑陋的东西…要全部排出来啦………♪」`,
        );
        kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～啊啊～…是～…浣肠液…还能再进来一些…咿～咿～咿咿咿咿～！」」`,
        );
        await era.printAndWait(
          `「啊～…啊啊啊…被浣肠液这么灌进来…为什么${sc()}却感到高兴呢…？」`,
        );
        await era.printAndWait(
          `（${sc()}的身体…甚至连排泄…都已经是主人的玩物了…）`,
        );
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊～…这样子灌进来的话…很快…就要全部排出来了…好害羞～…不要欺负我………」`,
        );
        kojo.灌肠肛塞 = 4;
      } else if (
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊～啊啊啊～…明明应该很难受的…啊～啊啊～…屁股…好奇怪啊～…屁股要变的不像话了～………♪」`,
        );
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊～…肚子好难受…好狠心…好狠心啊………」`);
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  // ELSEIF SELECTCOM == 46 && TEQUIP:46 == 0（灌肠+肛塞脱着，RAND 拼句）
  if (era_flag.selectcom === 46 && !era.get(`tequip:${target}:46`)) {
    const a_sense = era.get(`abl:${target}:3`) || 0;
    const masochism = era.get(`abl:${target}:21`) || 0;

    if (era.get(`talent:${target}:76`) === 1) {
      if (a_sense >= 3 && masochism >= 3) {
        // 原作是一整行：三段二选一/追加分档与 :4445 的 PRINTFORMW
        // 收行都不换行；三处 RAND 抽数留在语句内惰性求值（#624）
        await era.printAndWait(
          (rand_n(2) === 0
            ? '「呀…嗯啊、啊、啊啊！　'
            : '「啊啊～！、不行、不、不要看、') +
            (rand_n(2) === 0 ? '出来了、' : '出来、要出来了、') +
            (rand_n(3) === 0 ? '全部' : '') +
            `要排出来了啊${heart(3)}」`,
        );
        if (era.get(`tequip:${target}:11`)) {
          // 原作是一整行：二选一与 :4452 的 PRINTW 收行（#624）
          await era.printAndWait(
            (rand_n(2) === 0
              ? `以Ｍ字的状态大开双腿的${target_name}那秘所之中`
              : `四肢着地的${target_name}那股间之中`) +
              '极粗的蠕虫正在蠢动着、',
          );
        }
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}露出欢愉又夹杂着苦痛的表情、因为排泄的快感而扭动着身体。`,
          );
        } else {
          await era.printAndWait(
            `随着下流的声音，那污物正从${target_name}的肛门之中喷吐而出、${target_name}露出了恍惚失神的表情。`,
          );
        }
        if (era.get(`exp:${target}:53`) >= 5) {
          // 原作是一整行：二选一与 :4466 的 PRINTFORMW 收行（#624）
          await era.printAndWait(
            '那扩张开来无法闭合的' +
              (rand_n(2) === 0 ? '肛门' : '肛穴') +
              '之中，可以看清那内壁正在痉挛着……',
          );
        }
      } else {
        await era.printAndWait('');
      }
    } else if (era.get(`talent:${target}:85`) === 1) {
      if (a_sense >= 3 && masochism >= 3) {
        // 原作是一整行：前缀（:4475）与三选一（:4477/:4479/
        // ，判据 :4476/:4478）都不换行，到 :4484（观赏支）/ :4486
        // （疼爱支）的 PRINTFORMW 才收行（#624）。前缀与中段提到语句外共用，
        // 两条收尾支各写一条「前缀 + 中段 + 收尾」、锚只写本支的收行；抽数按
        // 原作序先抽（三选一 → 收尾二选一 :4483），个数与先后都不变
        const front_4475 = `「主人…${sc()}那`;
        const dump_mid =
          rand_n(3) === 0
            ? '排泄的地方也'
            : rand_n(2) === 0
              ? '肮脏的地方也'
              : '出来的地方也'; // 判据、:4477/:4479/:4480-4481 三档
        if (rand_n(2) === 0) {
          await era.printAndWait(front_4475 + dump_mid + `请您好好地观赏……」`);
        } else {
          await era.printAndWait(front_4475 + dump_mid + `请您好好地疼爱……」`);
        }
      } else {
        await era.printAndWait('');
      }
    } else if (a_sense >= 3 && masochism >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    return 0;
  }

  // IF SELECTCOM == 55（放置PLAY，CFLAG:356）
  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}偷偷看着这边………`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「哈啊…哈啊…主人～…${heart(1)}」`);
        await era.printAndWait(`${target_name}露出苦闷的表情………`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯…那、那个…请…再调教我吧………♪」`);
        await era.printAndWait(`${target_name}好像还很欲求不满的样子………`);
      } else {
        await era.printAndWait(`「休、休息一下是吗………？」`);
        await era.printAndWait(`${target_name}偷偷看着这边………`);
      }
      era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `壶虫在${target_name}的私处里蠢动着、毫不留情的搅动着阴道。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `肛门虫在${target_name}的肛门里蠢动着、毫不留情的蹂躙着肛门。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门被塞入了肛珠、肛门一颤一颤的。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被装上了电动阴蒂夹持续地被刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被装上了乳头跳蛋持续地被刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        era.print(`${target_name}的胸被装上了榨乳器被吸取着母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯现在也像快射精似的颤动着。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被戴着眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被身子绑住动弹不得。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠的原因发出了咕噜咕噜的声音、如果把塞子拔掉就会马上一泻千里的样子。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门插着电极、每当轻微的电流通过、括约肌就会颤动起来。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `于是、${target_name}的模样就这样继续被录了下来………`,
        );
      }
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}偷偷看着这边………`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊～…主人…求、求你了…请不要不理我…嗯！」`);
        await era.printAndWait(
          `${target_name}露出发情般的表情向${player_name}撒娇…………`,
        );
        kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯…那、那个…请…再调教我吧………♪」`);
        await era.printAndWait(`${target_name}好像还很欲求不满的样子………`);
        kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人…你、你好坏啊～…${sc()}明明…这么想奉仕您…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出发情般的表情看着${player_name}………`,
        );
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊…哈啊…主人～…${heart(1)}」`);
        await era.printAndWait(`${target_name}露出苦闷的表情………`);
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「休、休息一下是吗………？」`);
        await era.printAndWait(`${target_name}偷偷看着这边………`);
        kojo.放置PLAY = 2;
      }
      era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `壶虫在${target_name}的私处里蠢动着、毫不留情的搅动着阴道。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `肛门虫在${target_name}的肛门里蠢动着、毫不留情的蹂躙着肛门。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门被塞入了肛珠、肛门一颤一颤的。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被装上了电动阴蒂夹持续地被刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被装上了乳头跳蛋持续地被刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        era.print(`${target_name}的胸被装上了榨乳器被吸取着母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被套上了飞机杯现在也像快射精似的颤动着。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被戴着眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被身子绑住动弹不得。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠的原因发出了咕噜咕噜的声音、如果把塞子拔掉就会马上一泻千里的样子。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门插着电极、每当轻微的电流通过、括约肌就会颤动起来。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `于是、${target_name}的模样就这样继续被录了下来………`,
        );
      }
      return 0;
    }
  }

  // IF SELECTCOM == 56（交谈，CFLAG:357）
  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`)) {
        era.print(`${master_name}让${target_name}做个自我介绍。`);
        if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) === 1 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // 原作是一整行：无后缀 PRINTFORM 连续不换行，
          // 末行 PRINTFORML 才收行（#600）。SIF（:4653-4654）的判据提到语句外
          // 当条件、文本留在输出语句里（保真锁按序核对 ERB 片段）
          const masturbation = (era.get(`abl:${target}:31`) || 0) >= 3;
          era.print(
            `于是${target_name}就将自己的本名、至今为止的性体验` +
              (masturbation ? '以及自慰时妄想的内容' : '') +
              `开始愉快的说了起来……`,
          );
          era.print(
            `单是想到这个水晶球会流传到故乡认识的人手里，${target_name}两腿之间就变的湿润起来了……`,
          );
          game.kojo.录像内容 |= 2;
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          era.print(`于是${target_name}就对着水晶球开始说起了下流的话。`);
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          era.print(`于是${target_name}就对着水晶球做起了自我介绍。`);
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`);
        }
      } else {
        if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) === 1 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(`${target_name}一边扭动着腰一边与${player_name}说着情话。`);
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(
            `${target_name}一边扭动着腰一边与${player_name}说着下流的话。`,
          );
        } else if (
          ((era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) === 1 ||
            era.get(`talent:${target}:76`) === 1) &&
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4]
        ) {
          // 原作是一整行：:4674 的「…一边竭力按捺住」、装备分档
          // （:4676/:4678/:4680）与 :4682 的收行都不换行。装备判据是纯读，提到
          // 语句外当取值（语句内再写 era.get 会引入嵌套模板的 `${target}`）（#624）
          const holding =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const hurting =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            `${target_name}一边竭力按捺住` +
              (holding ? '快乐的' : hurting ? '痛苦的' : '自己的') +
              `声音，一边回应着${player_name}。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          era.print(
            `${target_name}用比起会话更想做爱的态度与${player_name}说着话。`,
          );
          await era.printAndWait(`「明明谈话什么的怎样都好………」`);
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          era.print(`${target_name}在很融洽的气氛中与${player_name}说着话。`);
          await era.printAndWait(`「从来没想过能在这种气氛下和你谈话呢………」`);
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          era.print(`面对${player_name}的搭话，怯生生的${target_name}回问道`);
          await era.printAndWait(`「您…是在和我说话吗…？」`);
        } else {
          era.print(
            `虽然${target_name}说了话，但${target_name}却好像没听到似的…`,
          );
        }
      }
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        era.print(`${master_name}让${target_name}作个自我介绍。`);
        if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) === 1 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(`${target_name}一边扭动着腰一边对着水晶球说着情话。`);
          game.kojo.录像内容 |= 2;
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(
            `${target_name}一边扭动着腰一边对着水晶球不停地说着下流的话。`,
          );
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) === 1 ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // 与 :4652+:4654+:4655 同型（SIF 的锚是 :4712-4713，#600）
          const masturbation = (era.get(`abl:${target}:31`) || 0) >= 3;
          era.print(
            `于是${target_name}就将自己的本名、至今为止的性体验` +
              (masturbation ? '以及自慰时妄想的内容' : '') +
              `开始愉快的说了起来……`,
          );
          era.print(
            `单是想到这个水晶球会流传到故乡认识的人手里，${target_name}两腿之间就变的湿润起来了……`,
          );
          game.kojo.录像内容 |= 2;
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          era.print(`于是${target_name}就对着水晶球开始说起了下流的话。`);
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          era.print(`于是${target_name}就对着水晶球作起了自我介绍。`);
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`);
        }
      } else {
        if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) === 1 ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(`${target_name}一边扭动着腰一边与${player_name}说着情话。`);
        } else if (
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) === 1 ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          era.print(
            `${target_name}一边扭动着腰一边与${player_name}说着下流的话。`,
          );
        } else if (
          ((era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) === 1 ||
            era.get(`talent:${target}:76`) === 1) &&
          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4]
        ) {
          // 与 :4674..:4682 同型的一整行（装备判据同样提到语句外）（#624）
          const holding_b =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const hurting_b =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            `${target_name}一边竭力按捺住` +
              (holding_b ? '快乐的' : hurting_b ? '痛苦的' : '自己的') +
              `声音，一边回应着${player_name}。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          era.print(
            `${target_name}用比起会话更想做爱的态度与${player_name}说着话。`,
          );
          await era.printAndWait(`「明明谈话什么的怎样都好………」`);
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) === 1 ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          era.print(`${target_name}在很融洽的气氛中与${player_name}说着话。`);
          await era.printAndWait(`「从来没想过能在这种气氛下和你谈话呢………」`);
        } else if (
          (era.get(`palam:${target}:4`) || 0) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          era.print(`面对${player_name}的搭话，怯生生的${target_name}回问道`);
          await era.printAndWait(`「您…是在和我说话吗…？」`);
        } else {
          era.print(
            `虽然${target_name}说了话，但${target_name}却好像没听到似的…`,
          );
        }
      }
      return 0;
    }
  }

  // IF SELECTCOM == 123（乳夹口交，CFLAG:360）
  if (era_flag.selectcom === 123) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.乳夹口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并把前端含进嘴里开始细致的舔舐起来。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「用${sc()}的淫乱大乳房来爽一下吧～…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「好烫啊～…大肉棒～${heart(1)} 大肉棒～${heart(1)} 啊啊啊…嗯～嗯咕呜～嗯咻～咻噜呜～${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「请把粘稠的精液…全部奖赏给我吧～…${heart(1)}」`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并温柔地亲吻着前端。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊～～…乳房这样敞露着…${heart(1)} 好美妙…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啾～啾～…${heart(1)} 请变的更爽吧～…嗯啾啾～…嘞咯～…${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「精液…请不用顾虑地射出来吧～${heart(1)} 我会全部舔干净的～${heart(1)}」`,
          );
        }
      } else if (serve >= 3) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并舔舐起了前端。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊啊～…大鸡鸡露出来了…啊～…啊啊～………」`);
        }
        await era.printAndWait(
          `「嗯姆呜～…嗯～嗯～${heart(1)}…嗯哈啊…会让你…变的…更舒服的………」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（啊啊…好想要精液…明明那么的…臭…心跳的好快呢…）`,
          );
        }
      } else {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并亲吻着前端。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊啊～…乳房里的…大鸡鸡好烫啊………」`);
        }
        await era.printAndWait(
          `「嗯啾噜～…嗯～…啊呼呜…啊啊…哈啊哈啊……这、这样可以吗…？」`,
        );
      }
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并把前端含进嘴里开始细致的舔舐起来。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「用${sc()}的淫乱大乳房来爽一下吧～…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「好烫啊～…大肉棒～${heart(1)} 大肉棒～${heart(1)} 啊啊啊…嗯～嗯咕呜～嗯咻～咻噜呜～${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「请把粘稠的精液…全部奖赏给我吧～…${heart(1)}」`,
          );
        }
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并温柔地亲吻着前端。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊～～…乳房这样敞露着…${heart(1)} 好美妙…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啾～啾～…${heart(1)} 请变的更爽吧～…嗯啾啾～…嘞咯～…${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「精液…请不用顾虑地射出来吧～${heart(1)} 我会全部舔干净的${heart(1)}」`,
          );
        }
        kojo.乳夹口交 = 4;
      } else if (
        serve >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并舔舐起了前端。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊啊～…大鸡鸡露出来了…啊～…啊啊～………」`);
        }
        await era.printAndWait(
          `「嗯姆呜～…嗯～嗯～${heart(1)}…嗯哈啊…会让你…变的…更舒服的………」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（啊啊…好想要精液…明明那么的…臭…心跳的好快呢…）`,
          );
        }
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}用双乳夹住了${master_name}的阴茎并亲吻着前端。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊啊～…乳房里的…大鸡鸡好烫啊………」`);
        }
        await era.printAndWait(
          `「嗯啾噜～…嗯～…啊呼呜…啊啊…哈啊哈啊……这、这样可以吗…？」`,
        );
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 125（口交时自慰，CFLAG:361）
  if (era_flag.selectcom === 125) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.口交时自慰 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}用一只手伸向自己的阴部、同时嘟起嘴含住了阴茎开始自慰起来。`,
        );
        await era.printAndWait(
          `「嗯咕～…嘞噗～…嘞咯～…嗯咕～嗯咕～…嗯唔～嗯呼呜呜呜呜${heart(1)}」」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}遵照命令将一只手伸向自己的阴部、一边自慰一边亲吻着阴茎。`,
        );
        await era.printAndWait(
          `「哈啊…虽然一边含着大鸡鸡一边自慰什么的…很不像话…但实在是忍不住嘛…${heart(1)}」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        );
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        );
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        );
      }
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用一只手伸向自己的阴部、同时嘟起嘴含住了阴茎开始自慰起来。`,
        );
        await era.printAndWait(
          `「嗯咕～…嘞噗～…嘞咯～…嗯咕～嗯咕～…嗯唔～嗯呼呜呜呜呜${heart(1)}」」`,
        );
        await era.printAndWait(
          `${target_name}开心的一边流着口水、一边啧啧有声地玩弄着私处………`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（啊啊…变的好舒服啊…喝着精液什么的太棒了～…${heart(1)}）`,
          );
        }
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}遵照命令将一只手伸向自己的阴部、一边自慰一边亲吻着阴茎。`,
        );
        await era.printAndWait(
          `「哈啊…虽然一边含着大鸡鸡一边自慰什么的…很不像话…但实在是忍不住嘛…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊咕～…嗯啾…咻噜呜～…嘞噗～…嗯咕～…嗯～嗯嗯嗯～嗯呼呜${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（再这样…嘴里灌入精液的话…光是这样就要高潮了～………${heart(1)}）`,
          );
        }
        kojo.口交时自慰 = 4;
      } else if (
        serve >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        );
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（精液…好想要啊…就算是被这样对待…也还是好想要………）`,
          );
        }
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}遵照命令在口交的同时开始自慰起来。`,
        );
        await era.printAndWait(
          `「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」`,
        );
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 126（手搓口交，CFLAG:362）
  if (era_flag.selectcom === 126) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.手搓口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}淫笑着用手握住阴茎、细致温柔地撸着并用嘴含住了龟头。`,
        );
        await era.printAndWait(
          `「我会很卖力的撸啦～…请将你的心意赏到${sc()}的嘴里吧…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}脉脉含情的看着你、用嘴含住了龟头开始撸起了阴茎。`,
        );
        await era.printAndWait(
          `「啊啊啊…能为你做奉仕真开心…嗯唔～…啾～嘞噗～…嗯咕～…嗯呼呜…啊啊～${heart(1)}」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、开始撸起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯～…哈啊…啊啊～…嘴巴和手好像被火烫到了似的…嗯～嗯呜唔～♪」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、不情愿的撸起了阴茎。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊姆～…啾～啾～…呗咯～…啊啊啊…这样的………」`,
        );
      }
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}淫笑着用手握住阴茎、细致温柔地撸着并用嘴含住了龟头。`,
        );
        await era.printAndWait(
          `「我会很卖力的撸啦～…请将你的心意赏到${sc()}的嘴里吧…${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯咻～…咻噜～…啾～啾唔呜唔${heart(1)} 一撸起来…嘴里的大肉棒就一颤一颤的、好可爱～${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「就这样…用浓厚的精液款待我吧～…嗯～啾～啾～～${heart(1)}」`,
          );
        }
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}脉脉含情的看着你、用嘴含住了龟头开始撸起了阴茎。`,
        );
        await era.printAndWait(
          `「啊啊啊…能为你做奉仕真开心…嗯唔～…啾～嘞噗～…嗯咕～…嗯呼呜…啊啊～${heart(1)}」`,
        );
        await era.printAndWait(
          `「射出来…请全部射出来吧…那样${sc()}会很高兴的${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「要是射在嘴里的话…说不定一开心就高潮了呢～…额呵呵～${heart(1)}」`,
          );
        }
        kojo.手搓口交 = 4;
      } else if (
        serve >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、开始撸起了阴茎。`,
        );
        await era.printAndWait(
          `「嗯～…哈啊…啊啊～…嘴巴和手好像被火烫到了似的…嗯～嗯呜唔～♪」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(`「啊啊…精液…是精液的臭味呢………」`);
        }
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}把龟头含在嘴里、不情愿的撸起了阴茎。`,
        );
        await era.printAndWait(
          `「哈啊哈啊…啊姆～…啾～啾～…呗咯～…啊啊啊…这样的………」`,
        );
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 127（真空口交，CFLAG:363）
  if (era_flag.selectcom === 127) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.真空口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。`,
        );
        await era.printAndWait(
          `「嗯咕呜～…嗯噗～…咻噜呜～咻噗～…咻～咻噜～呜呜呜呜${heart(1)}」」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、嗞嗞作响地吮吸起来。`,
        );
        await era.printAndWait(
          `「咻噜呜～…啾～啾呜呜～${heart(1)} 啊啊啊…大鸡鸡…真好嗤…啾呜～嘞噗～…噗啾呜呜～${heart(1)}」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        );
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        );
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        );
      }
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。`,
        );
        await era.printAndWait(
          `「嗯咕呜～…嗯噗～…咻噜呜～咻噗～…咻～咻噜～呜呜呜呜${heart(1)}」」`,
        );
        await era.printAndWait(
          `「全部…这大肉棒全部都是${sc()}的～${heart(1)} 把精液满满的灌进喉咙里吧～…${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「要是把精液给我的话…一定会把你伺候的更加更加的舒服哦～…${heart(1)}」`,
          );
        }
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、嗞嗞作响地吮吸起来。`,
        );
        await era.printAndWait(
          `「哈姆呜～${heart(1)} 嗯咕～${heart(1)}嗯咻呜${heart(1)}…啾啪啊…嗯咕呜呜呜～咻噗～啾呜唔呗咯～${heart(1)}」`,
        );
        await era.printAndWait(
          `「大鸡鸡…全部都是${sc()}的～…哈姆呜～${heart(1)} 嗯啾～啾～啾呜呜呜${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「精液…也是${sc()}的～…都归我一个人独占了～…${heart(1)}」`,
          );
        }
        kojo.真空口交 = 4;
      } else if (
        serve >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        );
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「咻噜…噗～…嗯噗～…嗯呼呜呜～（要是精液就这样…射出来的话…就要变的奇怪了…要变的奇怪了唔呜呜…）」`,
          );
        }
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。`,
        );
        await era.printAndWait(
          `「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」`,
        );
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 69（六九式，CFLAG:364）
  if (era_flag.selectcom === 69) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.六九式 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}每当私处被刺激就会更用力地将阴茎含在嘴里。`,
        );
        await era.printAndWait(
          `「嗯呜唔～${heart(1)} …继续欺负我～…我也会继续舔肉棒的～…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}一边承受着私处传来的快乐一边舔舐着阴茎。`,
        );
        await era.printAndWait(
          `「啊啊～…那里一被欺负…啊～啊啊～${heart(1)} 就没法好好奉仕大鸡鸡了～～${heart(1)}」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}因为私处传来的刺激而娇喘着。`,
        );
        await era.printAndWait(
          `「嗯咕～…嗯～…哈啊啊…被这样逗弄的话…奉仕就…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}由于私处传来的刺激摇起了屁股忍耐着。`,
        );
        await era.printAndWait(`「啊啊～…不行～…这样不行～…啊～～！」`);
      }
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}每当私处被刺激就会更用力地将阴茎含在嘴里。`,
        );
        await era.printAndWait(
          `「嗯呜唔～${heart(1)} …继续欺负我～…我也会继续舔肉棒的～…${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `「啊啊～～…所以请用满满的精液来款待我吧～${heart(1)}」`,
          );
        }
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}一边承受着私处传来的快乐一边舔舐着阴茎。`,
        );
        await era.printAndWait(
          `「啊啊～…那里一被欺负…啊～啊啊～${heart(1)} 就没法好好奉仕大肉棒了～～${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（再不努力一点…就喝不到精液了呜呜～${heart(1)}）`,
          );
        }
        kojo.六九式 = 4;
      } else if (serve >= 3 && (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}因为私处传来的刺激而娇喘着。`,
        );
        await era.printAndWait(
          `「嗯咕～…嗯～…哈啊啊…被这样逗弄的话…奉仕就…${heart(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(`（但是…不努力的话…就…喝不到精液了呢………）`);
        }
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}和${player_name}互相贪婪的亲吻着两腿之间。${target_name}由于私处传来的刺激摇起了屁股忍耐着。`,
        );
        await era.printAndWait(`「啊啊～…不行～…这样不行～…啊～～！」`);
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 124（深喉，CFLAG:365）
  if (era_flag.selectcom === 124) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.深喉 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。`,
        );
        await era.printAndWait(
          `「嗯噗呜唔…嗯咻噜～咻噜…咻噜噗呜～${heart(1)} 咻噜～咻～咻噗呜${heart(1)}…嗯咕～嗯呼呜${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、一边吸一边发出了下流的声音。`,
        );
        await era.printAndWait(
          `「咻噗～咻噜～…嗯～嗯～…咻噜～呜～${heart(1)} 嘞噗～…嗯咕～${heart(1)} 嗯嗯嗯～${heart(1)}」`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        );
        await era.printAndWait(
          `「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？…嗯唔～…嗯姆呜…嘞咯～噢…嗯～嗯～…♪」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        );
        await era.printAndWait(`「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？」`);
      }
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.深喉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。`,
        );
        await era.printAndWait(
          `「嗯噗呜唔…嗯咻噜～咻噜…咻噜噗呜～${heart(1)} 咻噜～咻～咻噗呜${heart(1)}…嗯咕～嗯呼呜${heart(1)}」`,
        );
        await era.printAndWait(
          `（喉咙里面…被肉棒塞得满满的…好开心…${heart(1)}）`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（就这样…在喉小穴的里面…把精液射出来吧～…${heart(1)}）`,
          );
        }
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把阴茎吞入喉咙深处、一边吸一边发出了下流的声音。`,
        );
        await era.printAndWait(
          `「咻噗～咻噜～…嗯～嗯～…咻噜～呜～${heart(1)} 嘞噗～…嗯咕～${heart(1)} 嗯嗯嗯～${heart(1)}」`,
        );
        await era.printAndWait(
          `（啊啊～…连喉咙里面都被大鸡鸡侵犯了…好激动啊………${heart(1)}）`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（啊啊～…请在喉咙里面把精液射出来吧…光是这样${sc()}就…啊啊～${heart(1)}）`,
          );
        }
        kojo.深喉 = 4;
      } else if (
        serve >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        );
        await era.printAndWait(
          `「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？…嗯唔～…嗯姆呜…嘞咯～噢…嗯～嗯～…♪」`,
        );
        await era.printAndWait(
          `（喉咙的里面也被插了～…嗯咕～…明明…很难受…${heart(1)}）`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（要是精液就这样射出来的话肯定会窒息…呜呜…爽到断气了～………）`,
          );
        }
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。`,
        );
        await era.printAndWait(`「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？」`);
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 80（强制口交，CFLAG:381）
  if (era_flag.selectcom === 80) {
    const serve = era.get(`abl:${target}:16`) || 0;
    const semen_addict = era.get(`abl:${target}:32`) || 0;

    if (kojo.强制口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嗯噗呜呜～嗯咕～！？嗯～嗯呼呜呜～…嗯呼呜呜呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边翻着白眼一边被鸡鸡插进了喉咙深处………`,
        );
      } else if (serve >= 3) {
        await era.printAndWait(
          `「嗯呼呜～…嗯啾～…啾噗啊…嗯咕！？嗯呜唔～…嗯～…嗯～…嗯～♪」`,
        );
        await era.printAndWait(`${target_name}就这样被侵犯着口腔………`);
      } else {
        await era.printAndWait(
          `「嗯嗯嗯～～！？咕呼～…嗯咕呜呜～！？嗯～～嗯噗呜～…嗯咕～嗯咕～嗯咕呜呜呜呜！」`,
        );
        await era.printAndWait(
          `${target_name}被鸡鸡插进喉咙深处好像很痛苦的样子………`,
        );
      }
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯呜唔～…嗯～嗯噗…嗯咕～…嗯～嗯呼呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `「可以哦…${sc()}的嘴巴就是为了含住大肉棒而存在的…请随意使用吧～…${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（啊啊啊…就这样…让我变成精液便所吧…${heart(1)}）`,
          );
        }
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        serve >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}」`,
        );
        await era.printAndWait(
          `「哈啊啊啊…让我…让我更多地奉仕你吧…嗯～！？嗯呼呜呜…嗯～嗯～嗯～♪」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（就这样在喉咙里面被射精了的话…${sc()}…就要变的不行了…脑子都要被精液侵犯了～…${heart(1)}）`,
          );
        }
        kojo.强制口交 = 4;
      } else if (
        serve >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯咕呼呜…嗯噗～…嗯～嗯呜唔…嗯呜唔～…咳咳～咳咳～…」`,
        );
        await era.printAndWait(
          `「哈啊…哈啊…对不起…下次会好好地…嗯呼呜呜呜！？」`,
        );
        if (semen_addict >= 3) {
          await era.printAndWait(
            `（啊啊啊～…就这样被射精了的话…啊啊～要溢出来了………）`,
          );
        }
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「嗯咕～…嗯～嗯噗…嗯噗…噗哈…咳咳～咳咳咳咳～…拜托…不要再继续了…嗯嗯～！」`,
        );
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  // IF SELECTCOM == 87（穿环，CFLAG:348；部位位域 piercing_state.p）
  if (era_flag.selectcom === 87) {
    // 延迟读取：主启动图的 COM80-90 注册仍仅由 com-hardcore 自己负责。顶层
    // require 会让 main-loop 漏装时模块仍被间接拉进来（#233/#234 先例）
    const { piercing_state } = require('#/system/train/com-hardcore');
    const assi = era_flag.assi;
    const assiplay = era_flag.assiplay;
    const p = piercing_state.p;
    const train = chara(target).train;

    if (kojo.穿环 === 0) {
      if (assi > 0 && assiplay) {
        era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        if (train.穿环状态 & p) {
          await era.printAndWait(
            `${target_name}因为肌肤头一次被开洞而痛得禁不住悲鸣起来。`,
          );
          if (p === 1) {
            await era.printAndWait(
              `「啊啊～！…哈啊…哈啊…这样一来乳头就可以拉伸了…请好好疼爱………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}像为了展示因为痛苦而勃起的乳头和环似的挺起了胸部………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「嗯～…额呵呵、不只是肚脐…我还想要更多的环${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}这样说着用舌头舔了舔嘴唇………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊～…好、好厉害…只是被风一吹…就感觉一颤一颤的…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}在阴唇上被穿了环、因为这一刺激而战栗着身体………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊啊～…被这样弄的话会兴奋过头的、会一直勃起的…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}在阴茎上被穿了环、阴茎持续地勃起着………`,
              );
            } else {
              await era.printAndWait(
                `「如何…这淫乱的环…这可是和淫乱的小穴相称的环哦…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}像为了展示${clitoris_word(target)}上的环似的左右摇晃着腰身………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「嘻嘻…真想就这样舔舔大肉棒试试呢…嘞咯～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}像为了展示舌尖上的环似的下流的舔了舔嘴唇………`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「额呵呵～…很时尚吧？」`);
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「啊啊…${sc()}是为主人而生的、淫乱的母猪哦${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}不停地翕动着鼻环………`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取掉环后留下的伤痕………`);
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (train.穿环状态 & p) {
          await era.printAndWait(
            `${target_name}因为肌肤头一次被开洞而痛得小声地悲鸣起来………`,
          );
          if (p === 1) {
            await era.printAndWait(
              `「啊啊…已经再也不会在主人面前一丝不挂了…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}装在勃起的双乳头上的环在闪闪发光………`,
            );
          } else if (p === 2) {
            await era.printAndWait(`「这就是所谓的时尚吧…嗯～…」`);
            await era.printAndWait(`${target_name}抚摸着被穿环的肚脐的周边………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊啊～！请…请不要这样拉扯啊…咿～～！」`,
            );
            await era.printAndWait(
              `${target_name}因为被拉扯穿环而扩张开的阴唇而悲鸣起来………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「${sc()}的鸡鸡…变的…这么漂亮了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的鸡鸡因为被穿环的痛楚与兴奋而挺立起来………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊…这种地方被穿了环的话…${sc()}…就没办法不去想主人的事情了…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环而兴奋不已的样子………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「呐…亲我～…有点担心能不能和主人好好接吻呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}咂着被穿环的舌头蠢蠢欲动的诱惑着……`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「呐…请亲亲我的嘴唇吧…${heart(1)}」`);
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「啊啊…${sc()}是主人的母猪～…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为被穿了鼻环而兴奋地喘着粗气………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}好像有点寂寞的抚摸着取掉环后的伤痕………`,
          );
        }
      } else {
        if (train.穿环状态 & p) {
          await era.printAndWait(
            `${target_name}因为肌肤头一次被开洞而痛得悲鸣起来、流下了眼泪。`,
          );
          if (p === 1) {
            await era.printAndWait(
              `「竟然…${sc()}竟然被这样的侮辱了…呜呜～………」`,
            );
            await era.printAndWait(
              `${target_name}因为乳头被穿环的痛楚而流下了屈辱的眼泪………`,
            );
          } else if (p === 2) {
            await era.printAndWait(`「呜呜～…痛、好痛………」`);
            await era.printAndWait(
              `${target_name}因为肚脐被穿环的痛楚而泪流满面………`,
            );
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊～…取下来…快取下来…已经…受不了了………」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇被穿环的痛苦而流下了屈辱的眼泪………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「请、请不要再做这种事情了…啊啊～…为什么…要做这种亵渎的事…呜！」`,
              );
              await era.printAndWait(
                `${target_name}因为鸡鸡被穿环的痛楚不停地流着眼泪………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊～…请把环取下来吧…好痛…要疯了…呜！」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环的痛楚不停地流着眼泪………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(`「讨厌…舌环…请取下来吧………」`);
            await era.printAndWait(
              `${target_name}的舌尖被穿了环、痛的流下泪来………`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「够了…请饶了我吧………」`);
            await era.printAndWait(
              `${target_name}的唇被穿了环、流下了屈辱的泪水………`,
            );
          } else if (p === 64) {
            await era.printAndWait(`「${sc()}才不是…你说的什么母猪…呜呜呜～」`);
            await era.printAndWait(
              `${target_name}不想被看到鼻环似的毫不犹豫的背过脸去流下了眼泪………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着取下环后的伤痕………`);
        }
      }
      kojo.穿环 = 1;
      return 0;
    } else {
      if (assi > 0 && assiplay) {
        era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (train.穿环状态 & p) {
          if (p === 1) {
            await era.printAndWait(
              `「啊啊～！…哈啊…哈啊…这样一来乳头就可以拉伸了…请好好疼爱………${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}像为了展示因为痛苦而勃起的乳头和环似的挺起了胸部………`,
            );
          } else if (p === 2) {
            await era.printAndWait(
              `「嗯～…额呵呵、不只是肚脐…我还想要更多的环${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}这样说着用舌头舔了舔嘴唇………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊～…好、好厉害…只是被风一吹…就感觉一颤一颤的…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}在阴唇上被穿了环、因为这一刺激而战栗着身体………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊啊～…被这样弄的话会兴奋过头的、会一直勃起的…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}在阴茎上被穿了环、阴茎持续地勃起着………`,
              );
            } else {
              await era.printAndWait(
                `「如何…这淫乱的环…这可是和淫乱的小穴相称的环哦…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}像为了展示${clitoris_word(target)}上的环似的左右摇晃着腰身………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「嘻嘻…真想就这样舔舔大肉棒试试呢…嘞咯～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}像为了展示舌尖上的环似的下流的舔了舔嘴唇………`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「额呵呵～…很时尚吧？」`);
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「啊啊…${sc()}是为主人而生的、淫乱的母猪哦${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}不停地翕动着鼻环………`);
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着取掉环后留下的伤痕………`);
        }
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (train.穿环状态 & p) {
          if (p === 1) {
            await era.printAndWait(
              `「啊啊…已经再也不会在主人面前一丝不挂了…啊啊～${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}装在勃起的双乳上的环在闪闪发光………`,
            );
          } else if (p === 2) {
            await era.printAndWait(`「额呵呵、好像很时尚呢…♪」`);
            await era.printAndWait(`${target_name}抚摸着被穿环的肚脐的周边………`);
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊啊～！请…请不要这样拉扯啊…咿～～！」`,
            );
            await era.printAndWait(
              `${target_name}因为被拉扯穿环而扩张开的阴唇而悲鸣起来………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「${sc()}的鸡鸡…变的…这么漂亮了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}的鸡鸡因为被穿环的痛楚与兴奋而挺立起来………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊…这种地方被穿了环的话…${sc()}…就没办法不去想主人的事情了…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环而兴奋不已的样子………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(
              `「呐…亲我～…有点担心能不能和主人好好接吻呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}咂着被穿环的舌头蠢蠢欲动的诱惑着……`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「呐…请亲亲我的嘴唇吧…${heart(1)}」`);
            await era.printAndWait(
              `${target_name}舔着唇上的环好像在确认情况的样子………`,
            );
          } else if (p === 64) {
            await era.printAndWait(
              `「啊啊…${sc()}是主人的母猪～…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}因为被穿了鼻环而兴奋地喘着粗气………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}好像有点寂寞的抚摸着取掉环后的痕迹………`,
          );
        }
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (train.穿环状态 & p) {
          if (p === 1) {
            await era.printAndWait(
              `「竟然…${sc()}竟然被这样的侮辱了…呜呜～………」`,
            );
            await era.printAndWait(
              `${target_name}因为乳头被穿环的痛楚而屈辱地流下了眼泪………`,
            );
          } else if (p === 2) {
            await era.printAndWait(`「呜呜～…痛、好痛………」`);
            await era.printAndWait(
              `${target_name}因为肚脐被穿环的痛楚而泪流满面………`,
            );
          } else if (p === 4) {
            await era.printAndWait(
              `「啊啊～…取下来…快取下来…已经…受不了了………」`,
            );
            await era.printAndWait(
              `${target_name}因为阴唇被穿环的痛苦而流下了屈辱的眼泪………`,
            );
          } else if (p === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「请、请不要再做这种事情了…啊啊～…为什么…要做这种亵渎的事…呜！」`,
              );
              await era.printAndWait(
                `${target_name}因为鸡鸡被穿环的痛楚不停地流着眼泪………`,
              );
            } else {
              await era.printAndWait(
                `「啊啊～…请把环取下来吧…好痛…要疯了…呜！」`,
              );
              await era.printAndWait(
                `${target_name}因为阴蒂被穿环的痛楚不停地流着眼泪………`,
              );
            }
          } else if (p === 16) {
            await era.printAndWait(`「讨厌…舌环…请取下来吧………」`);
            await era.printAndWait(
              `${target_name}的舌尖被穿了环、痛的流下泪来………`,
            );
          } else if (p === 32) {
            await era.printAndWait(`「够了…请饶了我吧………」`);
            await era.printAndWait(
              `${target_name}的唇被穿了环、流下了屈辱的泪水………`,
            );
          } else if (p === 64) {
            await era.printAndWait(`「${sc()}才不是…你说的什么母猪…呜呜呜～」`);
            await era.printAndWait(
              `${target_name}不想被看到鼻环似的毫不犹豫的背过脸去流下了眼泪………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}擦拭着取下环后的伤痕………`);
        }
        kojo.穿环 = 2;
      }
    }
    return 0;
  }

  // 其余（ERB 无分支的 SELECTCOM）静默返回——原作 COM 末尾 RETURN 0
  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_0 的等价物；重复注册抛错）
// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_PALAMCNG_0 / _MARKCNG_0 的等价物）
kojo_message_palamcng_family.register(0, kojo_message_palamcng_0);
kojo_message_markcng_family.register(0, kojo_message_markcng_0);
kojo_message_com_family.register(0, kojo_message_com_0);

module.exports = { kojo_message_com_0, eventtrain_normal_k0 };
