/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unreachable */
/**
 * @file 嘉德（K903）完整口上（issue #249）。
 *
 * EX_TALENT:103 经 GET_EX_KOJO_NUM 映成 LOCAL=1003，分发键为 903。
 */

'use strict';

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
const { on, TIER } = require('#/system/event/registry');
const { peek_aftertrain_q } = require('#/event/event-aftertrain');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
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
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart, self_call } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');

const default_rand = (n) => Math.floor(Math.random() * n);
// Emuera 数值变量未声明时为 0；EraElectron 原始 API 返回 undefined（#13）。
const era0 = (key) => era.get(key) || 0;

// @EVENTTRAIN #PRI（:59-63）：设置嘉德口上存在标志。
on(
  'EVENTTRAIN',
  () => {
    era_exflag.kojo_gade_session = 1; // EX_FLAG:103 = 嘉德口上存在标志
    if (game.kojo.口上开关 == 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:65-67）：清嘉德口上存在标志。
on('EVENTEND', () => (era_exflag.kojo_gade_session = 0), TIER.LATER);

// @EVENTTRAIN（:73-233）：调教开始口上。
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_nickname(0);
  const sc = () => self_call(target);
  const kojo = chara(target).kojo;

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era0(`ex_talent:${target}:103`) != 1) {
    return 0;
  }

  if (kojo.初调教 == 0) {
    era.drawLine();
    await era.printAndWait(`第一次调教${target_name}的时候，其实你有点害怕。`);
    await era.printAndWait(
      `虽说她是被进贡上来的，但当初费了好大的力气，才把她的战斗力封印了起来。`,
    );
    await era.printAndWait(`强大的魔力流动反噬过来，差点造成魔力大爆炸。`);
    await era.printAndWait(
      `最后虽然成功将魔力压住，但却把几个协作的初级封印师都震死了。`,
    );
    await era.printAndWait(`这力量，这身体，如果能为我所用的话…………`);
    await era.printAndWait(`你这么想着，不禁细细地打量着${target_name}。`);
    await era.printAndWait(
      `粉红色的艳丽头发，也无法彻底遮住她的脸庞。她的容颜好像有魔力似的，牢牢锁住所有人的目光。`,
    );
    await era.printAndWait(
      `这等惊人的美貌，令全地下城的女孩都自惭形秽。果然是最顶尖的天使，光是这般外貌，凡人就不可能企及。`,
    );
    await era.printAndWait(`「哼…………」${target_name}见到你，把头别过一边。`);
    await era.printAndWait(
      `身边的封印师个个如临大敌，生怕她做出什么不利于你的举动。`,
    );
    await era.printAndWait(
      `你深呼吸了一口气，将一大群严阵以待的封印师和侍卫都赶出调教室了。`,
    );
    await era.printAndWait(`来吧！！哪怕是神！我也要把你操翻！！`);
    // CFLAG:201  = 1（变量语义：CFLAG 族，201）
    kojo.初调教 = 1;
    return 1;
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `将看了那水晶球的事告诉了${target_name}之后，她反而向你生气。`,
      );
      await era.printAndWait(
        `「………明明你也和别的女孩子，做了这么多羞羞的事！！」`,
      );
      await era.printAndWait(
        `「……是的！本宫就是想尝尝别人的滋味！怎么样？如果你当初能好好保护本宫的话！本宫也不会……不会被…………呜呜……」`,
      );
      await era.printAndWait(
        `${target_name}眼眶湿润了。因为情绪激动，魔力又不受控制地激荡出来了…………`,
      );
      await era.printAndWait(
        `强大的魔力漩涡震得整个地下城犹如地震，你连忙对她又亲又哄，平复了她的情绪和魔力。`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `「你原来是人类……狂王原来也是人类…………」${target_name}叹气道……`,
      );
      await era.printAndWait(`「本宫居然被两个人类当猴耍……」她忿忿不平道。`);

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (chara(target).kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
    era.drawLine();
    await era.printAndWait(`「哼……才不会对你屈服呢！」`);
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (chara(target).kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
    era.drawLine();
    await era.printAndWait(`「本宫才不会佩服强者！因为本宫自己就是强者！」`);
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「这可不是对你屈服！只是觉得偶尔听你的也不错罢了～！」`,
    );
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 5 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`${target_name}最近总是露出诡异的笑容，`);
    await era.printAndWait(
      `浑身上下散发着一种令人血脉贲张的气质，一颦一笑，比最高级的魅魔更诱人。`,
    );
    await era.printAndWait(
      `只见她花枝招展地走过来，把嘴凑到${master_name}耳边，`,
    );
    await era.printAndWait(`吐气如兰地轻轻道：「猜猜本宫昨晚梦到什么？」`);
    await era.printAndWait(
      `在否定了你的几个答案后，她用香舌轻舔着嘴唇说：「你今晚过来不就知道了？」`,
    );
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 6 &&
    era0(`talent:${target}:85`) == 1
  ) {
    era.drawLine();
    await era.printAndWait(
      `${master_name}发现${target_name}正双手捧着脸，痴痴地看着自己。`,
    );
    await era.printAndWait(
      `「干……干嘛？」你被她那痴迷的眼神看得有点心中发毛。`,
    );
    await era.printAndWait(
      `${target_name}突然直视你的双眼，认真道：「${sc()}是魔王大人的东西！永远都是！！」`,
    );
    await era.printAndWait(
      `「呃……呃……好啊！」在得到你肯定的答复之后，${target_name}欢天喜地走了。`,
    );
    await era.printAndWait(
      `但在她消失在转弯处之后，你好像听到了一句轻飘飘的话，「魔王大人也是${sc()}的东西！永远都是！！」`,
    );
    // CFLAG:201  = 6（变量语义：CFLAG 族，201）
    kojo.初调教 = 6;
    return 1;
  } else if (era_flag.assi < 0) {
    return k903_kojo2();
  } else {
    return k903_kojo2();
  }
});

// @K903_KOJO2
async function k903_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const rand_n = default_rand;
  if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「之前的封印，真是便宜你了……」`);
    await era.printAndWait(
      `${target_name}抬起双手想要聚起神力将出现在门前的你直接炸个粉碎。`,
    );
    await era.printAndWait(
      `无奈力量封印的存在 只能做出蓄力的姿势想要吓走知道自己强大力量的你。`,
    );
    await era.printAndWait(
      `你无视了她徒劳的反抗，走进了${target_name}的房间……`,
    );
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「别逗本宫笑了，就凭你是无法得到本宫的心的！」`);
    await era.printAndWait(
      `「要不是有封印在，你已经被切成数千块作为生祭给那个老糊涂了的神了！」`,
    );
    await era.printAndWait(`躲闪着你靠近的身影，${target_name}如此威胁道……`);
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(
        `「要……要不是有封印在，你……你已经被切成数千块作为生祭给那个老糊涂了的神了哦！」`,
      );
      await era.printAndWait(`「数……数万块！」`);
    } else {
      await era.printAndWait(
        `「你……你想对本宫干嘛？本宫可是下一任主神的哦，神可不会善罢甘休的哦！」`,
      );
    }

    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(
        `「本宫绝对不会这么简单就听你做这做那的，等……等本宫恢复了力量……」`,
      );
    } else if (era0(`talent:${target}:13`) || era0(`talent:${target}:14`)) {
      await era.printAndWait(
        `${target_name}像是习惯了你的到来一样，没说什么多余的话就静静坐了下来。`,
      );
      await era.printAndWait(`只在你快要碰到她的时候小声嘟囔着：`);
      await era.printAndWait(`「神是……不会善罢甘休的……」`);
    } else {
      await era.printAndWait(
        `${target_name}像是习惯了你的到来一样，没说什么多余的话就静静坐了下来。`,
      );
      await era.printAndWait(`只在你快要碰到她的时候喊道：`);
      await era.printAndWait(`「神是不会善罢甘休的，要做什么的时候想清楚！」`);
    }

    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    era.drawLine();

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      await era.printAndWait(
        `「哼……你高兴就好……不要对本宫太过分，不然……不然…………」`,
      );
    } else {
      await era.printAndWait(`「你……你高兴就好……不要对本宫太过分」`);
    }

    return 1;
  } else if (era0(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (rand_n(3) == 0) {
      await era.printAndWait(
        `「喂，你！你不是很喜欢玩人类那种下贱的游戏吗？」`,
      );
      await era.printAndWait(`「还在等什么呢！本宫可没那么多耐心哦！」`);
    } else {
      await era.printAndWait(`${target_name}见你来到门前，露出诡异的笑容，`);
      await era.printAndWait(
        `浑身上下散发着一种令人血脉贲张的气质，一颦一笑，比最高级的魅魔更诱人。`,
      );
      await era.printAndWait(
        `${target_name}轻轻向你展示了一下自己的身体，你情不自禁地走上前去。`,
      );
      await era.printAndWait(
        `${target_name}在你耳边吐气如兰地轻轻道：「让本宫昨晚的梦变成现实吧！」`,
      );
      await era.printAndWait(`「…………？」`);
      await era.printAndWait(`「…………生为女人最棒的美梦哦～♪」`);
    }

    if (era0(`talent:${target}:74`)) {
      await era.printAndWait(
        `「没想到自己竟然会爱上这种事呢，自己把自己弄得奇怪什么的……♪」`,
      );
      await era.printAndWait(`「总之不要让本宫再等了啦！」`);
    } else if (era0(`talent:${target}:77`)) {
      await era.printAndWait(
        `「…………本宫并不是喜欢什么的……但是屁股……那个……你能再继续……♪」`,
      );
      await era.printAndWait(`「……继续从后面进来吗？」`);
      await era.printAndWait(`看来下了很大的决心后，${target_name}补充道。`);
    } else if (era0(`talent:${target}:78`)) {
      await era.printAndWait(`「本宫的乳头，已经完全勃起了啦……♪」`);
    }

    if (era0(`talent:${target}:83`)) {
      await era.printAndWait(`「来吧，来这里躺好哦～♪」`);
      await era.printAndWait(
        `「本宫啊，会让你～♪……体验到人～间～极～乐～的哟～♪」`,
      );
      await era.printAndWait(`「放心，不会吧你切成小块的哟♪」`);
      await era.printAndWait(
        `${target_name}眼睛里闪烁着危险的光芒，你不禁开始仔细考虑来找${target_name}的这个决定……`,
      );
    } else if (era0(`talent:${target}:88`)) {
      await era.printAndWait(
        `「没……没办法呢……本……本宫才不是喜欢魔……魔王大人的欺……欺凌……」`,
      );
      await era.printAndWait(
        `「那……那种难忘的感觉……」${target_name}在心里默默想着，无意识地摆出了给你任意玩弄的姿势……`,
      );
    }

    if (era0(`talent:${target}:89`)) {
      await era.printAndWait(
        `「那个，能早点去外面吗？本宫好闷的啊……在房间里不够刺激啦～」`,
      );
    }

    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(`「什么时候，让本宫再见到小狗狗呢♪」`);
      await era.printAndWait(
        `${target_name}的目光迷离，似乎已经陷入了某种回忆`,
      );
      await era.printAndWait(`「有点想它呢，本宫的…小野狗～♪」`);
      await era.printAndWait(
        `「虽然本宫是要成为神的人，但是被那么坏心眼的小狗狗这样对待过了……」`,
      );
      await era.printAndWait(`「没有办法呢，只能好好和它玩了～♪」`);
      await era.printAndWait(
        `仿佛是为了说服自己似的，${target_name}小声嘟囔着`,
      );
      await era.printAndWait(`「啊……真的开始想它了♪」`);
      await era.printAndWait(
        `${target_name}微微舒展背后羽翼，带着撒娇的口气说着`,
      );
      await era.printAndWait(`「今天能带它来见本宫吗？好想它可爱的模样啊～♪」`);
      await era.printAndWait(
        `……天使那带着笑意的模样，让你不禁羡慕起那只野狗来`,
      );
    }

    if (era0(`talent:${target}:204`)) {
      await era.printAndWait(
        `「肉……肉便器什么的……随你喜欢就叫吧……能让本宫开心……嗯……开心就好了啊～」`,
      );
    }

    return 1;
  } else if (era0(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (rand_n(3) == 0) {
      await era.printAndWait(
        `你进屋的时候，${target_name}正在梳着她亮丽的粉色头发。`,
      );
      await era.printAndWait(`「哦，你来了啊。」`);
      await era.printAndWait(`「魔～王～大～人～……这么叫你还喜欢吗？」`);
      await era.printAndWait(`「喜欢的话，那就不许再让别人叫了哦～！」`);
      await era.printAndWait(
        `看着她笑咪咪的眼睛，不知为何你后背涌起一阵寒气……`,
      );
    } else if (rand_n(2) == 0) {
      await era.printAndWait(
        `「嘛，本宫可是要成为神的人哦，虽然现在在这个不见天日的地下城，身体也被乱七八糟地搞过了……」`,
      );
      await era.printAndWait(`「但是没办法，喜欢上了魔王大人你嘛……」`);
      await era.printAndWait(`「不知道带上魔王酱有没有两人成神的可行性……」`);
      await era.printAndWait(`「如果祭品的能量足够的话…………」`);
      await era.printAndWait(`「……那个魔法阵再修正一下…………」`);
      await era.printAndWait(
        `${target_name}开始用你听不太清的声音嘟囔些什么了……`,
      );
      await era.printAndWait(`「要不要把这里的其他人都献祭掉呢？嘻嘻～」`);
      await era.printAndWait(`只有这最后一句你听得清楚…………`);
    } else {
      await era.printAndWait(
        `「魔王大人♪本宫什么都准备好了哦，呐，呐，不要再离开了哦～♪」`,
      );
      await era.printAndWait(
        `她身上还有力量封印，应该做不了什么吧…？………你这样想着，小心翼翼地把她拥入怀中。`,
      );
    }

    if (era0(`talent:${target}:74`)) {
      await era.printAndWait(
        `「没想到自己竟然会爱上这种事呢，自己把自己弄得奇怪什么的……♪」`,
      );
    } else if (era0(`talent:${target}:77`)) {
      await era.printAndWait(
        `「本宫后面的小穴，那个……已经想你想得……有点发疼了……♪」`,
      );
    } else if (era0(`talent:${target}:78`)) {
      await era.printAndWait(`「本宫的胸部，很棒对吧……♪」`);
    }

    if (era0(`talent:${target}:83`)) {
      await era.printAndWait(`「来吧，来这里躺好哦～♪」`);
      await era.printAndWait(
        `「本宫啊，会让魔王你～♪……体验到人间极~~~~乐的哟♪」`,
      );
      await era.printAndWait(`「放心，不会吧你切成小块的哟♪」`);
      await era.printAndWait(
        `${target_name}眼睛里闪烁着危险的光芒，你不禁开始仔细考虑来找${target_name}的这个决定……`,
      );
    } else if (era0(`talent:${target}:88`)) {
      await era.printAndWait(
        `「没……没办法呢，本，本宫才不是喜欢魔……魔王大人的欺……欺凌……」`,
      );
      await era.printAndWait(`「本宫喜欢的，是魔王大人本身啊……」`);
      await era.printAndWait(
        `「但是，忘不掉那种愉快的感觉……」${target_name}在心里默默想着，无意识地摆出了给你任意玩弄的姿势。`,
      );
    }

    if (era0(`talent:${target}:89`)) {
      await era.printAndWait(`「今天会带本宫去哪里玩么……？」`);
    }

    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(`「啊魔王大人，今天也能让本宫和小狗狗一起玩吗♪」`);
      await era.printAndWait(`${target_name}面带微笑的看着你，眼中写满了期待`);
      await era.printAndWait(`「好想它呢，本宫的…野狗丈夫～♪」`);
      await era.printAndWait(`「哎？移情别恋？才不是呢……」`);
      await era.printAndWait(`「只是…小狗狗有了和魔王大人一样的位置而已～♪」`);
      await era.printAndWait(
        `仿佛是为了说服自己似的，${target_name}小声嘟囔着对于野狗的爱意`,
      );
      await era.printAndWait(`「神爱世人，都是本宫爱上的生物，不可以吃醋哦♪」`);
      await era.printAndWait(
        `${target_name}微微舒展背后羽翼，带着撒娇的口气说着`,
      );
      await era.printAndWait(`「今天能带它来见本宫吗？好想它撒娇的模样啊～♪」`);
    }

    return 1;
  }
  return 0;
}

// @EVENTEND：调教结束口上正文。
async function eventend_kojo_903() {
  const target = era_flag.target;

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era0(`ex_talent:${target}:103`) != 1) {
    return 0;
  }

  if (era0(`base:${target}:0`) <= 0) {
    // SIF 只约束下一条 PRINTFORMW。
    await era.printAndWait(`「明明……明明……马上就要取代那个老糊涂的……」`);
  }
  await era.printAndWait(`「啊……可恶……已经………………」`);
  return 0;
}

on('EVENTEND', eventend_kojo_903);

// @KOJO_MESSAGE_COM_903
async function kojo_message_com_903(rand = default_rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const rand_n = rand;
  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_903(rand);
    return 0;
  }

  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_903(rand);
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (chara(target).kojo.爱抚 == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(
          `「只……只是轻轻摸一下的话……本宫啊……并……并没有期待什么！」`,
        );
      } else {
        await era.printAndWait(
          `「不要拿你凡间蛆虫的脏手碰本宫，当真不怕降下神罚吗！」她激烈地抵抗着你的双手。`,
        );
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      chara(target).kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只……只是被你简单地碰到就～啊～再努力一点啊，怎么可能这么简单就满足本宫呢～～」`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人的手法……只是碰到……本宫，就……啊！……噢～啊啊！……有，有感觉了～～…」`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嘛……只是稍微碰一碰的话……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 4;
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「果然，果然还是算了！……你…你的脏手还是拿开吧…本宫……本宫会…」`,
        );
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 3;
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不要再拿你的脏手碰本宫了，当真不怕降下神罚吗！」她努力抵抗着你的双手。`,
        );
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (chara(target).kojo.舔阴 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「停下！！快住手！！重……重要的地方被……啊啊啊……湿湿的……好难受…………」`,
        );
      } else {
        await era.printAndWait(`「那，那样的地方都舔！这个……大变态！」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      chara(target).kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊！好～好啊～♪继续啊……本宫还没允许你停下呢！再用力地吸～………唔喔，爱液要出来了～！！…」`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「才……才没有喜欢什么的……魔王大人这样弄的话……总觉得好害羞啊……啊～啊啊」`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「随，随你喜欢弄了！…呃～啊啊啊啊啊！」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 3;
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「果然你们这些下界的人…………真恶心…………」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (chara(target).kojo.肛门爱抚 == 0) {
      await era.printAndWait(`「屁……屁股？居然要对本宫的那种地方下手么！？」`);
      await era.printAndWait(`「等……等一下……啊！……啊啊啊！！！……」`);
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      chara(target).kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const p =
        (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // P = PALAM:3 + UP:3

      if (
        era0(`talent:${target}:76`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「意外地喜欢本宫的后面呢……嘛，本宫也被你弄得很舒……舒服呢……」`,
        );
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「意外地喜欢本宫的后面啊……不过这样子本宫不是很舒服呢，你这变态稍微考虑些办法，让本宫别这么痛好吗！」`,
        );
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「居然从后面……唔……本……本宫啊……并不是……啊……啊啊啊～」`,
        );
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜～！再把本宫弄湿一些………有点痛呢………」`);
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 4;
      } else if (
        p >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不，不行了！！……屁股……本宫的屁股……屁股居然…这么有感觉……你这个变…变态呢…」`,
        );
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 3;
      } else if (chara(target).kojo.肛门爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「从后面玩弄本宫什么的……绝对不可原谅啊……啊啊……住手啊，本宫叫你住手啊！」`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (chara(target).kojo.自慰 == 0) {
      await era.printAndWait(`「什么？让本宫在你面前……自……自……」`);
      await era.printAndWait(
        `${target_name}意识到你命令的含义，脸瞬间红了起来。`,
      );
      await era.printAndWait(
        `「让女孩子在别人面前做这种事……你真的是……恶魔呢……」`,
      );
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      chara(target).kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「一直看本宫自己玩有什么意思，魔王大人你也一起……一起……嗯……来嘛～」`,
        );
        await era.printAndWait(
          `「那个……本宫的小穴还没有用过……你不想试试吗？」`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嗯……嗯…………!!!好……好舒服……停不下来了啊啊啊啊啊啊！！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔……噢噢……啊！……哈……哈……」`);
        } else {
          await era.printAndWait(
            `「唔……噢噢……本宫…以前可从来不会这样子…呃呃呃呃！！！！」`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「那个……虽然本宫自己也能体会极乐，但是果然还是和魔王一起…………」`,
          );
        } else {
          await era.printAndWait(`「你也不要干看着啦！一起玩哦！」`);
          await era.printAndWait(`${target_name}更加向你靠近了一些。`);
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「要看着魔王大人来自慰？……虽然不是不可以啦，但是总感觉…好害羞啊……」`,
        );
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「魔王大人！魔王大人！！魔王大人喔～！！！啊啊啊啊啊啊！！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「停不下来！手自己动了……身体不受控制～……啊啊啊啊啊！」`,
          );
        } else {
          await era.printAndWait(
            `「啊！魔王大人！你要对本宫负责啊！！本宫以前不是这样子的～！！」`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「…魔王大人，难道，讨厌和本宫一起…吗…」`);
        } else {
          await era.printAndWait(`「为什么…魔王大人不自己来碰人家呢………」`);
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (chara(target).kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「欸？又是自慰么…真是不明白，为什么你会喜欢看本宫自慰，真是，变态呢」`,
          );
          await era.printAndWait(
            `${target_name}别过红着的脸，默默开始自慰了。`,
          );
        } else {
          await era.printAndWait(`（本宫怎么…变成这样………）`);
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 3;
      } else if (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「你这变态魔王！这种事让本宫做一次也就够了吧！！真是……羞死人了啊啊啊啊啊啊！」`,
          );
        } else {
          await era.printAndWait(
            `「看……看够了没有……够了就快点从本宫身边滚开啊…………」`,
          );
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (chara(target).kojo.胸爱抚 == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「本宫的胸部什么的……魔王大人你……喜欢吗？那个……让你稍微……稍微弄一下也不是不可以呢」`,
        );
      } else {
        await era.printAndWait(
          `「哈？看来又是一个看着本宫胸部入迷的变态呢。可！以！请！你！把！你！的！脏！手！拿！开！么！」`,
        );
        await era.printAndWait(
          `${target_name}用很可怕的眼神盯着你一字一字地“请”你停手。`,
        );
        await era.printAndWait(`大概是之前有过什么不好的经验吧……`);
        await era.printAndWait(`当然，你肯定是不会收手的咯……`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      chara(target).kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈……本宫的胸部都要融化了……嘛你可以再刺激一点点的哦…♪ 哦！嗯嗯嗯……」`,
        );
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人你这么喜欢本宫的胸部么～……嘻嘻～…………呃…………呃………………噢～………………」`,
        );
        await era.printAndWait(
          `${target_name}陶醉地闭上双眼，夸张地昂首挺胸，胸部不断起伏配合着你的手，发出了让人血脉偾张的可爱呻吟。`,
        );
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊……胸部……有感觉了……？」`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哼……哈！区区揉胸什么的，本宫怎么可能会有感觉的啦！」`,
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
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「这可是，本宫的初吻哦！魔王大人可千万要记好哦♪……亲亲～！」`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(
          `「魔王大人啊……那个……本宫，${target_name}，下任主神的初吻给的是你，本宫啊，真是太幸福了……♪」`,
        );
      } else {
        await era.printAndWait(
          `「呜…嗯…呜！！什！什么啊！本宫的初吻！竟然就这样被……」`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else if (chara(target).kojo.接吻 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊……要接吻吗？好啊～感觉上很浪漫呢～……♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「魔王大人……啊啊……kiss什么的相当喜欢哦！……♪」`);
      } else {
        await era.printAndWait(
          `「舔了本宫的嘴唇……也不会改变任何事，只会让对你的惩罚更大罢了！」`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔……唔唔……喔～……呼呼～不知道咬一下你的舌头你会是什么反应呢」`,
        );
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊～魔王大人的吻～……唔……唔唔～……喔～」`);
        await era.printAndWait(
          `「小心，不要让本宫从你的嘴唇上尝出别人的味道哦～～」`,
        );
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 4;
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「只，只是嘴唇的话，就可以……」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 3;
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哼！那么喜欢用接吻来假装本宫已经是你的所有物了吗！！」`,
        );
        await era.printAndWait(`「抱歉哦，那只是你猥琐的幻想罢了！！」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (chara(target).kojo.自己扒开 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「把那里扒开，所以呢？所以快点插进来啊～～」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「好……好害羞啊……而且……只，只想给你……一个人看……」`,
        );
      } else {
        await era.printAndWait(
          `「居然让本宫做这……这么羞耻的事……呜……看够了没有啊，蛆虫！」`,
        );
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      chara(target).kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不要只是看看啦～～～所以快点插进来啊～～」`);
        // CFLAG:308  = 5（变量语义：CFLAG 族，308）
        chara(target).kojo.自己扒开 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这，这……是只为你敞开的地方………」`);
        // CFLAG:308  = 4（变量语义：CFLAG 族，308）
        chara(target).kojo.自己扒开 = 4;
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (chara(target).kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊……被看见了吗？……虽然好害羞啊…但是居然会有点开心呢…本宫，本宫变得奇怪了…………」`,
        );
        // CFLAG:308  = 3（变量语义：CFLAG 族，308）
        chara(target).kojo.自己扒开 = 3;
      } else if (chara(target).kojo.自己扒开 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「喜欢摆出这种样子的本宫么……你这变态……」`);
        // CFLAG:308  = 2（变量语义：CFLAG 族，308）
        chara(target).kojo.自己扒开 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (chara(target).kojo.插入手指 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊啊，魔王大人的手指！喔～伸进来了！！」`);
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(`「啊……魔王大人的手指……噢哦～」`);
      } else {
        await era.printAndWait(
          `「等！等下！！！这种地方……怎么能把手指戳进来……啊!啊啊啊！快拔出去啊啊啊！」`,
        );
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      chara(target).kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊……再继续搅动啊～♪求你！」`);
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好厉害～……魔王大人的手指……哦哦哦！♪」`);
        await era.printAndWait(
          `${target_name}浑身发烫，双腿直抖，软倒在你的怀里。`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊……手指什么的……怎么可能会舒…舒服呢…嗯嗯啊♪」`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 3;
      } else if (chara(target).kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「住手！这……讨厌的手指！你以为仅仅这样本宫就会妥协一点么！你也太小瞧本宫了！」`,
        );
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (chara(target).kojo.舔肛 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哦啊～黏糊糊的……好棒♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「不，不要嘛～舔那种地方…本，本宫不是很喜欢呢…！」`,
        );
      } else {
        await era.printAndWait(
          `「你想干什么？不！！不要啊！！啊啊湿湿的！好难受……你这变态，居然舔那种地方…………本宫都有点钦佩了呢，你的变态程度……」`,
        );
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      chara(target).kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔哦！再拿舌头伸进去吧～魔王的舌头 很温柔呢♪」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「被舔那里的话……受不了的……♪」`);
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「喜，喜欢的话……不，下次果然还是算了吧，好难为情……」`,
        );
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 3;
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不要舔……奇怪的地方啦！你这变态！连本宫的屁股都要尝一尝！啊♪」`,
        );
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (chara(target).kojo.振动宝石 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「噢哦喔，这是什么啊……唔！啊啊啊！…本宫没见过的新玩具呢♪♪♪」`,
        );
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「欸？这个石头？本宫还没………啊啊啊………那里发…发麻了啦……噢啊♪」`,
        );
      } else {
        await era.printAndWait(
          `「等等，这是干什么的？……啊啊！……这石头怎么回事！……别这样！！」`,
        );
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      chara(target).kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊喔～再用力按压……唔唔啊啊♪ 这玩具好棒呜呜呜…」`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「被魔王大人的道具玩弄了……啊啊～♪ 有……有点舒服呢……」`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样的小石子……呜呜……让本宫有感觉了……」`);
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 3;
      } else if (chara(target).kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「快住手！不要把奇怪的东西……放到本宫身上来！！哈……哈啊…」`,
        );
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    if (chara(target).kojo.壶虫 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「欸？这是什么？这个，怎么看都只是一条肥肥的虫子吧」`,
          );
          await era.printAndWait(
            `「比起那个，魔王大人快来和本宫玩嘛，哦哦这个姿势，终于要用本宫的小穴了吗？」`,
          );
          await era.printAndWait(`「欸？欸欸？啊！……啊啊啊！哈啊……哈啊……」`);
          await era.printAndWait(
            `「什么嘛竟然把那个虫……虫子放进去……哈啊……你就这么讨厌本宫的小穴吗？」`,
          );
          await era.printAndWait(`「本来……还想让第一次……更盛大一点呢……」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「欸？这是什么？这个，怎么看都只是一条肥肥的虫子吧」`,
          );
          await era.printAndWait(
            `「比起那个，魔王大人……今天也相当精神呢，嗯？这个姿势，终于想，从本宫的那里……吗？」`,
          );
          await era.printAndWait(`「欸？欸欸？啊！……啊啊啊！哈啊……哈啊……」`);
          await era.printAndWait(
            `「竟然……把那个虫……虫子放进去了……哈啊……痛……好痛啊……」`,
          );
          await era.printAndWait(
            `「这种变态玩法……也亏魔王大人你想得出来呢……」`,
          );
        } else {
          await era.printAndWait(
            `「呃！！那个奇怪的恶心生物是什么……你……你这笨蛋！放开本宫！想干什么！」`,
          );
          await era.printAndWait(`「啊……哈……啊啊啊啊啊！！！」`);
          await era.printAndWait(`「被下流的生物用……下流的生物……玷污了呢……」`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「把这个放进小穴？可能是很有趣的玩法呢……」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「令人讨厌的东西……真的要放进去吗……」`);
        } else {
          await era.printAndWait(
            `「呃！！这个恶心的生物……不要啊！！不要拿过来！！！！」`,
          );
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      chara(target).kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「可以哟，本宫允许你把它放进来哟……♪」`);
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈……虽然不是很喜欢……但是魔王大人你喜欢就好了……呢……♪」`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 4;
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呃……来了……本宫居然被这么恶心的东西……弄出感觉……哈………」`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 3;
      } else if (chara(target).kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不要，不要啊！！……这么恶心的生物……别！！！……」`,
        );
        await era.printAndWait(`「堂堂本宫…居然要被虫子…」`);
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊……被拿出来了啊……一直插着也没关系哟」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼～」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 2;
    } else if (chara(target).kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呼呼……终于……结束了」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (chara(target).kojo.振动杖 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嘻嘻……什么嘛这个小手杖？看来是个很有趣的玩具呢……」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「咦？保健器具么？……肩膀是有些酸痛了。魔王大人，辛苦了呢……」`,
        );
        await era.printAndWait(`「欸？不是拿来按摩的吗？！」`);
      } else {
        await era.printAndWait(
          `「……这么大一根……不过只凭这个就想威慑本宫吗？呵呵呵呵呵哈哈哈哈哈哈！」`,
        );
        await era.printAndWait(`「欸？唔唔唔唔？！！～」`);
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      chara(target).kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔……哦！这个令人发麻的快感……呜……不行啦……啊啊！～♪」`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊啊……有，有，有感觉了……被这根杖……♪」`);
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜呜……这，这个……本宫…有点……哈啊啊啊…」`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 3;
      } else if (chara(target).kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呃……呜……住手！……不要再弄啦！……啊！呜呜呜，怎么会，本宫怎么会被这种东西……弄得……」`,
        );
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    if (chara(target).kojo.肛门虫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「就是这个要放到后面的穴么？又是一种新玩法呢……♪」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「魔王大人…怎么净喜欢这样胡来的玩法…本宫还是更喜欢……正常一点的啦～♪」`,
        );
      } else {
        await era.printAndWait(`「什，什么啊这玩意儿……住手！好恶心！！」`);
        await era.printAndWait(`「不……不要再往后面塞……塞了啊……这种……这种……」`);
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      chara(target).kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔哦……在里面……不停搅动着……好厉害，太厉害啦～哦哦！♪」`,
        );
        await era.printAndWait(
          `${target_name}因为肛门虫的活动，媚态尽显地高声呻吟着。`,
        );
        await era.printAndWait(`「还有什么新鲜的玩法可以拿出来吗？♪」`);
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻，好啊～再深入本宫的洞里……♪再让本宫更兴奋吧♪」`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊，屁股里………喔喔喔～！♪」`);
        await era.printAndWait(
          `${target_name}被肛门虫蹂躏着尻穴，变得心荡神驰了。`,
        );
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嘛…你喜欢就好哦，本宫的屁股吗……把这东西放进去吧……♪」`,
        );
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呃呃……不行！感觉到了……被这种卑劣的生物……」`);
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 3;
      } else if (chara(target).kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「不！！这种卑劣的东西……不要再拿过来了！！！」`,
        );
        await era.printAndWait(`「本宫求……不，本宫命令你！！！！停手！！！」`);
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈哈哈……好厉害……」`);
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 4;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「意外可爱的小东西呢～♪」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 3;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼……呼……呃……请温柔一点拔出来……」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 2;
    } else if (chara(target).kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈，哈……终于结束了……本宫被这种家伙………」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`)) {
    if (chara(target).kojo.阴蒂夹 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哦哦哦这样子夹住看起来会相当有趣呢～真不愧是魔王大人～！～♪」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「会振动的吗？魔王大人不要对本宫弄什么太激烈的东西啊……本宫……那个……很敏感的……」`,
        );
      } else {
        await era.printAndWait(
          `「什么啊这是……你这污物又拿一些讨厌的东西过来了……」`,
        );
        await era.printAndWait(
          `「等等！……那里被夹上会很痛的吧？！别！！本宫叫你住手啊！」`,
        );
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      chara(target).kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～久违的夹子～快！这个东西本宫很是钟意呢！」`,
        );
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嘛……只要能令你高兴，本宫……其实无所谓的哦……来吧……」`,
        );
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 3;
      } else if (chara(target).kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「什么啊这夹子………唔唔……虽然…很痛………但是………」`);
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「呃～啊！！那里已经红肿得发疼了！你喜欢的话继……继续弄那……里，也没关系哦！」`,
      );
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呃～嗯！！魔……魔王大人……尽兴了吗？」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 2;
    } else if (chara(target).kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哎………唔唔……呵…总有一天……本宫会报仇的…」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`)) {
    if (chara(target).kojo.乳头夹 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「新玩具呢～这个，看起来很有趣的嘛～魔王大人～大～♪变～♪态～♪」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「本宫的胸部啊，就是为了侍奉魔王大人而存在的～不要……太过分哦～♪」`,
        );
      } else {
        await era.printAndWait(`「连乳头也不放过么？！！真是过分的家伙呢……」`);
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      chara(target).kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「乳……乳头已经完全硬起来了～拿那个夹起来吧！本宫很喜欢的哟～！」`,
        );
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「给本宫夹上也不是不愿意啦……不知道本宫把这个给魔王大人夹上会是什么感觉呢♪」`,
        );
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 3;
      } else if (chara(target).kojo.乳头夹 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「乳……乳头夹什么的…………啊…只知道用道具的变态啊，总有一天会反过来用这些东西把你弄得求生不得求死不能的…！」`,
        );
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「哈啊！本宫的乳头，已经被这个完全弄麻掉了呢，下次再装上吧～！」`,
      );
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊！胸部……快要……」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 2;
    } else if (chara(target).kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊……哈啊……乳……乳头……好像要坏掉了……」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`)) {
    if (chara(target).kojo.榨乳器 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊！啊！啊！～～～这个玩具这么用力吸的话……会…………会………喷出来的吧………」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哦～哦～麻麻的……快要流出来了……好想……不知道被婴儿…吸的话…会是什么感觉呢………」`,
        );
      } else {
        await era.printAndWait(
          `「想……想要本宫的母乳什么的……哈啊啊啊……本来是世间万金难求的圣物呢……真是……便宜你了……啊啊……哈啊啊啊！！」`,
        );
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      chara(target).kojo.榨乳器 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.榨乳器 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊！啊！啊！～～～太～太舒服了！！再吸！再用力吸………」`,
        );
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        chara(target).kojo.榨乳器 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔～哦哦！～～～感觉胸中满满的……爱意……和奶水一起……被吸出来了！……本宫的爱啊………」`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        chara(target).kojo.榨乳器 = 3;
      } else if (chara(target).kojo.榨乳器 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呃……啊！！啊………已…已经够了吧……把本宫如此对待的话…的话…………」`,
        );
        // CFLAG:317  = 2（变量语义：CFLAG 族，317）
        chara(target).kojo.榨乳器 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.榨乳器着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「本宫的母乳～不知道味道如何呢………」`);
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      chara(target).kojo.榨乳器着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.榨乳器着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「有这些……的话……魔王大人已经满意了吧？」`);
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      chara(target).kojo.榨乳器着脱 = 2;
    } else if (chara(target).kojo.榨乳器着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呼……呼呼…………本宫不会忘记的………」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      chara(target).kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    if (chara(target).kojo.肛珠 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「又是什么新鲜的玩具呢？欸？是用在后面的啊～……♪」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊？这个，要放到屁股里么……？只……只要能令你高兴的话……本宫其实……♪」`,
        );
      } else {
        await era.printAndWait(
          `「这又是什么本宫不知道的……啥？屁股里！？等…等一下！！…」`,
        );
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      chara(target).kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「噢～后面……被塞满了……呵呵～全部放进去了没？」`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呃～～好痛……魔王大人！这个玩法…有点太激烈了啊……♪」`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好热，屁股好热……继续，继续放进去吧……♪」`);
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呃！！屁股里……痛…痛…痛……啊！可以的话还请魔王大人轻一点啊……」`,
        );
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「可恶，本宫居……居然有感觉了……被这种玩具……弄后面…………」`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 3;
      } else if (chara(target).kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「痛！啊！！好痛啊！！停手！！停手！！不要再放进去啦！」`,
        );
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「一下子，一下子拔出来吧！♪」`);
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 4;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「请，请温柔点，慢慢拔……太……激烈的话……」`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 3;
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「呃……唔……哦哦～啊……这一串珠……珠子……啊啊啊受不了了啊！！……」`,
      );
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 2;
    } else if (chara(target).kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「好痛啊！！给本宫慢慢地，慢慢地拔啊！……屁股…屁股怎么能受得了啊…呜～……」`,
      );
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (chara(target).kojo.正常位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「终于决定要从正面把本宫的第一次拿走了么？……♪」`,
          );
          await era.printAndWait(
            `「可以哟，本宫就特许你这下界物种得到天使的第一次吧……♪」`,
          );
          await era.printAndWait(
            `「不过条件就是，一……定,要让本宫开心哦，嗯哼哼哼♪」`,
          );
          await era.printAndWait(
            `「不然的话，本宫大概要把你做成专供本宫使用的人偶呢♪」`,
          );
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.printAndWait(`「那个……魔王大人……♪」`);
          await era.printAndWait(
            `「本宫的第一次呢……作为天使，为了亲爱的人，一直保留着……♪」`,
          );
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`);
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`);
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的。`,
          );
          await era.printAndWait(
            `「所以，今天，能把作为天使的第一次，奉献给魔王大人的话……♪」`,
          );
          await era.printAndWait(`「本宫……会非常……♪」`);
          await era.printAndWait(
            `已经害羞到说不出话了呢，你觉得这样的${target_name}，更加可爱了。`,
          );
          await era.printAndWait(
            `「所以……不要再让本宫……等了嘛，真是的……」${target_name}小声嘟囔着。`,
          );
          await era.printAndWait(`你笑着开始调整姿势…………`);
        } else {
          await era.printAndWait(`「放开……放开本宫！！……」`);
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她压在身下。`,
          );
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          );
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`);
          await era.printAndWait(
            `你看着流下屈辱和苦痛泪水的${target_name}，嘴角轻轻上扬着。`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「让本宫看着你的脸～……♪」`);
          await era.printAndWait(`「不让本宫舒服的话，可是会咬你的哦～……♪」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊～魔王大人！这样盯着本宫的脸看……本宫……本……宫…………」`,
          );
        } else {
          await era.printAndWait(
            `「下贱的物种啊……妄想本宫也沉浸在这肉体的娱乐中么……绝对………」`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      chara(target).kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「让本宫看着你的脸～……♪」`);
        await era.printAndWait(`「不让本宫舒服的话，可是会咬你的哦～……♪」`);
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊～魔王大人！这样盯着本宫的脸看……本宫……本……宫…………」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「唔～哦！！从一插进来开始……本宫的身体就不受控制了！！全部……全部都是属于魔王大人的！！」`,
          );
        } else {
          await era.printAndWait(
            `「魔王大人～！抱紧本宫，本宫…稍微…有点冷呢…嗯…哈…嗯啊啊」`,
          );
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔、唔……喔……虽然讨厌这种感觉…但是…本宫…………」`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「随你……喜欢……吧……哈……哈……」`);
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 3;
      } else if (chara(target).kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「可恶！不要啊！从本宫身上滚开啊啊啊啊啊！！」`,
        );
        await era.printAndWait(`${target_name}流下了屈辱的泪水。`);
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (chara(target).kojo.背后位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「终于决定要把本宫的第一次拿走了么？……♪」`);
          await era.printAndWait(
            `「可以哟，本宫就特许你这下界生物得到天使的第一次吧……♪」`,
          );
          await era.printAndWait(
            `「欸？这样的姿势吗？感觉像那些更下贱的生物一样了呢………」`,
          );
          await era.printAndWait(
            `「不过又有什么关系呢…一定要让本宫达到最～～强的高潮哦～～♪」`,
          );
          await era.printAndWait(
            `「不然的话，本宫一定要因为强迫本宫用这样下贱的姿势，把你做成专供本宫使用的人偶呢，做好觉悟吧～～♪」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「那个…魔王大人…♪」`);
          await era.printAndWait(
            `「本宫的第一次呢…作为天使，为了亲爱的人，一直保留着……♪」`,
          );
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`);
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`);
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的`,
          );
          await era.printAndWait(`「不过，这样的姿势…果然还是不要了吧…♪」`);
          await era.printAndWait(`${target_name}像是在做什么思想斗争`);
          await era.printAndWait(
            `「呼，也好吧，为了你，尽管这样的方式作为第一次很屈辱……但是……」`,
          );
          await era.printAndWait(`「是魔王大人的话……就大概没问题了呢♪」`);
          await era.printAndWait(`「本宫……非常……♪」`);
          await era.printAndWait(
            `已经害羞到说不出话了呢，你觉得这样的${target_name}，更加可爱了`,
          );
          await era.printAndWait(
            `「所以……不要再让本宫……用这种姿势……再等了嘛，真是的……」${target_name}小声嘟囔`,
          );
        } else {
          await era.printAndWait(`「放开……放开本宫！！……」`);
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她推倒在地上`,
          );
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          );
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`);
          await era.printAndWait(
            `你看着流下屈辱和苦痛泪水的${target_name}，嘴角轻轻上扬着`,
          );
          await era.printAndWait(
            `「像………像狗一样…………的第一次………呜啊啊啊啊啊啊！！！！」`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「什么姿势也没关系哟！让本宫快乐起来吧♪」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「这样的姿势…果然还是不要了吧…♪」`);
          await era.printAndWait(`「欸……你坚持的话……」`);
        } else {
          await era.printAndWait(`「放开……放开本宫！！……」`);
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她推倒在地上`,
          );
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          );
          await era.printAndWait(`「像………像狗一样………呜……」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      chara(target).kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「再……再……再来！本宫没说停之前，你可不能……简单地停下来哦！！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈……这种野兽一般的姿势……！意外地让人兴奋呢……」`,
          );
        } else {
          await era.printAndWait(`「唔啊啊啊啊啊啊！！」`);
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「下次的话……让本宫看着魔王大人的脸高……高潮好吗？……」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「这下流的姿势……也不是不可以呢…………再……用力一点！」`,
          );
        } else {
          await era.printAndWait(`「…………魔王大人你很喜欢这样的姿势吗？」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这种姿势……像野兽一样…………但是……有感觉…………本宫一定……哪里坏掉了啊啊啊……」`,
        );
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这种姿势被你…………怎么想也太过分了啊！！去死吧蛆虫！」`,
        );
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 3;
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「放开……放开本宫！！……」`);
        await era.printAndWait(`但是对你来说抵抗没有意义呢`);
        await era.printAndWait(`「像………像狗一样………呜……」`);
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (chara(target).kojo.对面座位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「终于决定要把本宫的第一次拿走了么？……♪」`);
          await era.printAndWait(`「这样抱着本宫的话，大概会很舒服呢♪」`);
          await era.printAndWait(
            `「可以哟，本宫就特许你这下界的生物得到天使的第一次吧……♪」`,
          );
          await era.printAndWait(
            `「不过条件就是，一………定,要让本宫开心的哦，嗯哼哼哼♪」`,
          );
          await era.printAndWait(
            `「不然的话，本宫大概要把你做成专供本宫使用的人偶呢♪」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`你抱起${target_name}坐到你的身上……`);
          await era.printAndWait(`「那个…魔王大人…♪」`);
          await era.printAndWait(
            `「本宫的第一次呢…作为天使 为了亲爱的人，一直保留着……♪」`,
          );
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`);
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`);
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的`,
          );
          await era.printAndWait(
            `「所以，今天，能把作为天使的第一次，奉献给魔王大人的话……♪」`,
          );
          await era.printAndWait(`「本宫……会非常……♪」`);
          await era.printAndWait(
            `已经害羞到说不出话了呢，你看着近在咫尺的${target_name}的脸，觉得这样的${target_name}，更加可爱了`,
          );
          await era.printAndWait(
            `「所以……不要再让本宫……等了嘛，真是的……」${target_name}小声嘟囔着……`,
          );
        } else {
          await era.printAndWait(`「放开……放开本宫！！……」`);
          await era.printAndWait(
            `你无视了${target_name}的警告，把她抱到你的身上`,
          );
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          );
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`);
          await era.printAndWait(
            `你看着对面流下屈辱和苦痛泪水的${target_name}，强吻了上去`,
          );
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「让本宫看着你的脸～……♪」`);
          await era.printAndWait(`「不让本宫舒服的话，可是会咬你的哦～……♪」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊～魔王大人！那个……这样坐着……好像比较……舒服来的……♪」`,
          );
        } else {
          await era.printAndWait(
            `「下贱的魔族啊……妄想本宫也沉浸在这肉体的娱乐中么……绝对………」`,
          );
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      chara(target).kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「来亲亲吧～……噢……啊啊～♪好深，好深啊！……♪」`);
        await era.printAndWait(`「本宫要受……受不了了呢……♪」`);
        await era.printAndWait(`「哈……已经完全被……快感俘虏了呢♪」`);
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「紧紧相拥……深深凝视……好喜欢这样……不要再～丢下本宫了哦～！！」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王～大人，这样坐着，不会……压到你的么…………哈～～～」`,
          );
        } else {
          await era.printAndWait(
            `「亲亲……想亲亲……彼此相连着……温柔地……那里也～暖暖的～！」`,
          );
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈……不喜欢也……没办法了……」`);
        await era.printAndWait(`「这样稍稍舒服一点对待本宫的话……」`);
        await era.printAndWait(`「嗯……也可以稍稍……原谅你这家伙一点了吧……」`);
        await era.printAndWait(`(舒服什么的…怎么说得出口啊……)`);
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「坐……坐在你身上还要插进来什么的……」`);
        await era.printAndWait(`「对本宫来说，很过分呢……」`);
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 3;
      } else if (chara(target).kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「可恶！不要啊！把本宫放下去！放下去啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}流下了屈辱的泪水`);
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (chara(target).kojo.背面座位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「终于决定要把本宫的第一次拿走了么？……♪」`);
          await era.printAndWait(
            `「可以哟，本宫就特许你这普通的人类得到天使的第一次吧……♪」`,
          );
          await era.printAndWait(
            `「欸？让本宫背过去吗？难道不想让本宫看见你那下等的脸么？」`,
          );
          await era.printAndWait(
            `「呵呵开玩笑的啦，非要从后面的话…一定要让本宫达到最～～强的高潮哦～～♪」`,
          );
          await era.printAndWait(
            `「不然的话，回过头就把你做成专供本宫使用的人偶呢～～♪」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「那个…魔王大人…♪」`);
          await era.printAndWait(
            `「本宫的第一次呢…作为天使，为了亲爱的人，一直保留着……♪」`,
          );
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`);
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`);
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的`,
          );
          await era.printAndWait(
            `「所以，今天，能把作为天使的第一次，奉献给魔王大人的话……♪」`,
          );
          await era.printAndWait(`「即使……看不见你的脸……♪」`);
          await era.printAndWait(`「本宫……也会非常……♪」`);
          await era.printAndWait(
            `已经害羞到说不出话了呢，你觉得这样的${target_name}，更加可爱了`,
          );
          await era.printAndWait(
            `「所以……要让本宫在你身上坐多久呢……」${target_name}小声嘟囔着`,
          );
          await era.printAndWait(`你慢慢开始了动作……`);
        } else {
          await era.printAndWait(`「放开……放开本宫！！……」`);
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她抱起在身上`,
          );
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          );
          await era.printAndWait(`${target_name}努力想要回过头来警告着你`);
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「从后面来啊……也许有一种意外和未知的感觉，本宫会更兴奋呢……」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「不能看着魔王大人了么……」`);
        } else {
          await era.printAndWait(
            `「下贱的魔族啊……妄想本宫也沉浸在这肉体的娱乐中么……绝对………」`,
          );
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      chara(target).kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「揉，揉胸的时候从后面…………！！♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「好棒……哈……唔……哦哦哦！……这样的位置好舒服～♪」`,
          );
        } else {
          await era.printAndWait(`「好……唔唔唔……啊……噢！！～好棒啊～♪」`);
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「从后面……抱紧本宫～♪啊……进去好深呢……魔王大人！～」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「被这样抱着～……太舒服了……噢～♪胸…胸部也被…」`,
          );
        } else {
          await era.printAndWait(
            `「魔王～大人，这样坐着，不会……压到你的么…………哈～～～」`,
          );
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「真……真是卑鄙呢……把本宫这样放在你的身上……就……抵……………唔……啊……啊……哦哦哦！！」`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「脖……脖子后面……」`);
        await era.printAndWait(`「本宫命令你停止呼吸！！……好……好痒……」`);
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 3;
      } else if (chara(target).kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「可恶！不要啊！把本宫放下去！放下去啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}流下了屈辱的泪水`);
        await era.printAndWait(`当然你是不会罢手的`);
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (chara(target).kojo.正常位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈哈，喜欢走后门吗～好哦……来吧！」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「喜欢这种地方吗……？大～变～态～」`);
      } else {
        await era.printAndWait(`「停、停下啊！在想什么哪！」`);
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      chara(target).kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「唔～哦哦～♪菊穴，感觉太强烈了～♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔～啊啊～♪插入便便的洞洞里了～♪」`);
        } else {
          await era.printAndWait(`「呃～后面的洞～哦！哦哦～♪」`);
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「痛～好痛……没事～♪没关系的，马上就会习惯的啦～」`,
        );
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「屁股……啊～感觉到了～噢～♪」`);
        } else {
          await era.printAndWait(`「屁股……屁股好热～好烫啊～♪」`);
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呃！啊！痛！～人家，人家会努力提高屁股的感觉……没关系，很、很舒服」`,
        );
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔哦……啊～♪！感、感觉到了～……」`);
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 3;
      } else if (
        chara(target).kojo.正常位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「要用这种地方……」`);
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (chara(target).kojo.背后位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「终……终于…要用肉棒插本宫了吗！等好久了……」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这，这么脏的地方……会弄脏你的棒棒的……」`);
      } else {
        await era.printAndWait(`「你这人，整天在想些什么啊！这个……变态狂！」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      chara(target).kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「呼……呼……唔哦哦哦哦哦哦！！用力插进去！把本宫里面弄得乱七八糟吧！！」`,
          );
        } else {
          await era.printAndWait(
            `「啊……哦哦……光插进来，感觉就这么地强烈……本宫，本宫是你的菊穴奴隶了～♪」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……好、好哦……再、再来……」`);
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「好…好棒……魔王大人…你…就喜欢这种地方么…噢哦哦！！」`,
          );
        } else {
          await era.printAndWait(`「屁股…好舒服啊～…已经、已经回不去了………」`);
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这，这种姿势插这样的洞洞……好像野兽一样……」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这、这样的洞，本宫……本宫居然……有感觉了……」`);
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 3;
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「好、好脏……不要弄那里！」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (chara(target).kojo.对面座位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊……这样面对面地欺负人家的屁眼啊～……♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这样的地方……嘻嘻，真变态！」`);
      } else {
        await era.printAndWait(`「哼……不想见到你这家伙的脸……」`);
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      chara(target).kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「啊……要融化了……再用力抱本宫啊～」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「来嘛……来嘛……看着本宫这下贱的神色……♪」`);
        } else {
          await era.printAndWait(`「菊穴要融化了……多么美妙啊……♪」`);
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呵呵……来得好……感觉到了……」`);
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊……好棒……哦～♪」`);
        } else {
          await era.printAndWait(`「再继续弄屁股……往里面去～……♪」`);
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「会，会努力的……为了让魔王大人高兴……会让这里也很有感觉……」`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呃……这种……地方……居然有感觉了……」`);
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 3;
      } else if (
        chara(target).kojo.对面座位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「好痛……痛死了！一点都不舒服！快停啊！！」`);
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (chara(target).kojo.背面座位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呵呵……来吧～……♪」`);
        await era.printAndWait(`${target_name}扭动着腰，诱惑着你。`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「请通过屁股……疼爱本宫吧……♪」`);
      } else {
        await era.printAndWait(`「你……你这家伙，居然从后面……！」`);
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      chara(target).kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊……被从后……贯穿啦～♪」`);
        } else {
          await era.printAndWait(`「好棒……好棒……便便的洞，还能这么用～♪」`);
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嘻嘻……菊花也是好东西呢～」`);
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「啊……好有快感……用这样的地方……」`);
        } else {
          await era.printAndWait(
            `「为了魔王大人……用下流的地方……做下流的事了……」`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「还是有点痛……会习惯的……」`);
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「被弄这地方……居然有快感了……」`);
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 3;
      } else if (
        chara(target).kojo.背面座位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「呃啊！……真的只有痛楚啦……！」`);
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (chara(target).kojo.手淫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「这样一直用手搓，真的会有奶油溢出来的么♪」`);
        await era.printAndWait(
          `「哈啊，让本宫这么为你侍奉，以前的话可是直接会被献祭掉的哟～♪」`,
        );
        await era.printAndWait(
          `「嘛无所谓啦，比起这个，只打算让自己一个人舒服的么…………♪」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「这个……就是叫做“手交”的吧……能让魔王大人您开心，本宫可以的哟！♪」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「只……只是用手套弄一下的话……本宫……也……不是不可以……」`,
        );
      } else {
        await era.printAndWait(
          `「哈啊……你这蛆虫不怕本宫把这个恶心的东西掰断吗，真是……下流呢」`,
        );
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      chara(target).kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「您舒服了以后…一定要让本宫也享～～～～受到极乐呢…魔王大人♪」`,
          );
        } else {
          await era.printAndWait(`「在为放到本宫的身体里做准备吗？～♪」`);
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「本宫会……会好好地侍奉魔王大人的……只是有点小害羞呢～♪」`,
          );
        } else {
          await era.printAndWait(`「还……舒服……么……？」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊……虽然本宫是说过为了魔王大人什么都可以做来着……」`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「本宫……知道了啊……稍微弄一下也不是不可以……为什么会要本宫做这种事……切」`,
        );
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 3;
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「真的会掰断的！！你……你不要太过分了！！」`);
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (chara(target).kojo.口交_奴 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「以为是什么好玩的事情……只是让本宫吸那里而已的吗？」`,
        );
        await era.printAndWait(`「快点让本宫也…………」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔……魔王大人喜欢就好……明明这里味道很糟糕呢……但是为了魔王大人……本宫……稍微……试一下也不是不可以……」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「只，只是舔一下的话……但是让本宫做这种事……实在是，过分呢……」`,
        );
      } else {
        await era.printAndWait(
          `「舔这个！？你这下贱的魔族不担心本宫直接咬断它么？！」`,
        );
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      chara(target).kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只要魔王大人喜欢，本宫怎～～～么样都没有问题的哦～」`,
        );
        await era.print(`「今天的牛奶，会是什么味道的呢～～」`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不要光是让你舒服～也让本宫开心一下嘛～～」`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人……想射的时候，随时可以射出来哦～本宫会好好地接住的！」`,
        );
        await era.print(
          `${target_name}充满爱意地将阴茎含入嘴里，头部有节奏地运动着。`,
        );
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈……这个东西的味道本宫不很喜欢的啦……乱动的话随时会咬到的哦……」`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 3;
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「真……讨厌……好臭…………」`);
        await era.printAndWait(`「让本宫…………做这种……………」`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (chara(target).kojo.乳交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊～本宫的胸部～也相当敏感的哟～～♪」`);
        await era.printAndWait(`「这样的话能让两个人……一起……有趣的玩法呢♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「这……这不是胸部的本职工作啦～♪」`);
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈……不知羞耻呢……居然让本宫用胸部……帮你按摩……」`,
        );
        await era.printAndWait(`「啊啊啊啊知道了啊！！！」`);
      } else {
        await era.printAndWait(`「这种事只是想想就……」`);
        await era.printAndWait(
          `「适可而止吧人类，本宫的胸部岂是你们这些下等种族能碰的……而且还是……拿……」`,
        );
        await era.printAndWait(`「生祭！生祭！！！」`);
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      chara(target).kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「舒服么……？嘻嘻～感觉胸部都开始变烫了～……」`,
          );
          await era.printAndWait(`「就这样一起去吧！！～～～」`);
        } else {
          await era.printAndWait(`「柔软么？到底是什么样的感觉呢？」`);
          await era.printAndWait(`「本宫的胸部可是……很舒服呢～～～」`);
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.乳交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「喜欢用胸部啊……？感觉也不坏啦～～～」`);
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「舒服的话，射出来也没关系哦！……本宫～没关系的♪」`,
          );
          await era.printAndWait(`「本宫……也很舒服……来着～」`);
        } else {
          await era.printAndWait(
            `「魔王大人，舒服么……？很柔软吧？本宫的胸部，就是为了服侍魔王大人的……」`,
          );
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只是夹着就好了……哈，被那个东西凑得这么近呢……」`,
        );
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 3;
      } else if (chara(target).kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「用胸部摩擦……还把那个东西凑得这么近……」`);
        await era.printAndWait(`「为什么本宫要做这种事……」`);
        await era.printAndWait(`${target_name}的眼眶有些湿润`);
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (chara(target).kojo.股间性交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哦！还有这种玩法啊……！」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「哈啊……好奇怪的姿势呢～」`);
        await era.printAndWait(`「魔王大人喜欢的话……本宫倒也……」`);
        await era.printAndWait(`「但是真的好害羞啊……」`);
      } else {
        await era.printAndWait(`「你这蛆虫！禽兽！」`);
        await era.printAndWait(`「难道是……想要捅进来吗！？」`);
        await era.printAndWait(`「放开本宫啊！放手！」`);
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      chara(target).kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只是用这里摩擦就满足了吗？明明还可以有更深入的玩法的说～！」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「摩擦摩擦～……真舒服～♪」`);
        await era.printAndWait(`「插进来也可以的哟～～」`);
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「本宫……还一直没有过第一次……不过是魔王大人的话，大概，也没问题的吧～」`,
        );
        await era.printAndWait(
          `「真的只是让本宫这样擦一擦就好了么？魔王大人真是有点奇怪的人呢」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「魔王大人你喜欢的话……怎样都好啦……」`);
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 3;
      } else if (chara(target).kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「如果……不捅进来的话……」`);
        await era.printAndWait(`「……即使不捅进来！这样的行为也……」`);
        await era.printAndWait(`「总有一天你会被本宫碎尸万段的！」`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (chara(target).kojo.骑乘位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「让未经人事的本宫自己坐上来把第一次给你啊……」`,
          );
          await era.printAndWait(`「真是了不得的恶趣味呢……魔～王～大～人～」`);
          await era.printAndWait(
            `「嘛对本宫来说大概更方便呢，毕竟，主动权在本宫哦～」`,
          );
          await era.printAndWait(
            `「如～果～不～能～让～本～宫～好～好～开～心～一～下～的～话～」`,
          );
          await era.printAndWait(`${target_name}的眼睛里闪烁着魅惑的光芒`);
          await era.printAndWait(
            `「就把你保持这样的姿势做成本宫专用的玩具哦～～～哼哼呵～」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「让未经人事的本宫自己坐上来把第一次给你啊……」`,
          );
          await era.printAndWait(
            `「尽管喜欢着魔王大人，但这种事情果然还是有点……」`,
          );
          await era.printAndWait(`「……知道了，本宫会尽力的……」`);
          await era.printAndWait(`「因为，本宫啊，是魔王大人的啊…………」`);
          await era.printAndWait(
            `「不过要是被本宫知道了魔王大人的身上被其他女孩子坐过了的话…………」`,
          );
          await era.printAndWait(`「呐～不会发生的吧？」`);
          await era.printAndWait(
            `${target_name}眼里闪着奇怪的光芒，咬着牙慢慢把你的阴茎放进小穴里，开始运动了`,
          );
        } else {
          await era.printAndWait(`「………………」`);
          await era.printAndWait(
            `听了你的命令后，${target_name}低着头沉默不语`,
          );
          await era.printAndWait(`「…………真的…………是个变态呢…………」`);
          await era.printAndWait(
            `「你这蛆虫，把本宫当作什么来看待了呢！！……让本宫自己坐上来……把处女交给你这样的蛆虫……」`,
          );
          await era.printAndWait(`「已经，不是生祭掉就可以还清的罪过了……」`);
          await era.printAndWait(
            `「…………用神力把大脑剥出来……一边修复一边撕扯……让你享受永世不得休息的地狱之苦才能偿还得了你的罪恶啊啊啊啊啊啊啊啊…………」`,
          );
          await era.printAndWait(`「…………但是…………现在……」`);
          await era.printAndWait(`${target_name}低着头，浑身散发出危险的气息`);
          await era.printAndWait(
            `不过面对着被刻着力量封印的她，对于你而言，那些气息也仅仅只是气息罢了`,
          );
          await era.printAndWait(
            `${target_name}或许也明白这一点，没有反抗力量的她，像是放弃了什么似的，抬起了头，眼里含着泪水，却是一副极度憎恶的表情`,
          );
          await era.printAndWait(`「……只是坐上去而已对吧！」`);
          await era.printAndWait(
            `${target_name}把你按倒在地，粗暴地骑在了你的身上，握着你的阴茎慢慢对准了自己小穴，深吸了一口气，一口气坐了下去`,
          );
          await era.printAndWait(`「……好……不甘心…………」泪水夺眶而出`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「让本宫自己坐上来啊～」`);
          await era.printAndWait(`「太激烈了不要怪本宫哦～」`);
          await era.printAndWait(`${target_name}迫不及待地沉下了腰……`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「喜欢这样子吗～」`);
          await era.printAndWait(`「知道了，本宫会照顾好魔王大人的呢～」`);
        } else {
          await era.printAndWait(`「…………真的…………是个变态呢…………」`);
          await era.printAndWait(
            `「你这蛆虫，把本宫当作什么来看待了呢！！……让本宫自己坐上来什么的……」`,
          );
          await era.printAndWait(`${target_name}低着头沉默不语，想着些什么`);
          await era.printAndWait(`「……只是坐上去而已对吧！」`);
          await era.printAndWait(
            `${target_name}把你按倒在地，粗暴地骑在了你的身上一口气坐了下去`,
          );
          await era.printAndWait(`「……可恶啊……」${target_name}的眼眶湿润了`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      chara(target).kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「魔王大人只是躺着而已，这么轻松啊～」`);
          await era.printAndWait(`「怎样，本宫的小穴还舒服吗？」`);
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「欸，你也稍微用点力的嘛，只是本宫一个人在动稍微有点无聊呢」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「哈啊……哈啊……好想快点……高潮……嗯…………」`);
        } else {
          await era.printAndWait(`「躺好不要乱动啦，本宫知道怎么做的啦～」`);
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print(`「魔王大人……请躺好吧～本宫…可以做好的！～」`);
        } else if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哼哼～你也要用力地往上顶哦～！……本宫啊…其实这样子也不是特别讨厌啦…」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「本宫很重吗？感觉…进去了好深呢～哈啊…本宫明明…不能这个样子追求快乐啊………但是……」`,
          );
        } else {
          await era.printAndWait(
            `「只是坐上来……就很有感觉了呢……这就是……爱的力量吗…………」`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(`「呃～啊～！……腰、腰自己动起来了……」`);
        } else if (rand_n(3) == 0) {
          await era.printAndWait(`「有什么在脑子里冲撞着……」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「唔！又被捅进里面了……好深啊……」`);
        } else {
          await era.printAndWait(
            `「不要啦！～再这么往上顶的话……的话……本宫会……」`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.print(
          `${target_name}遵从着命令，跨坐在${player_name}的身上，把阴茎吞入体内了。`,
        );
        await era.printAndWait(
          `「又让本宫自己坐上来呢……好想趁这机会掐死你呢……」`,
        );
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「哈啊……让本宫自己坐上去……绝对……绝对不可能的！！！」`,
        );
        await era.printAndWait(
          `${target_name}眼里迸发出少许的泪水，在你再三命令下终于坐了上来`,
        );

        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (chara(target).kojo.全身擦洗 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「没办法呢……如果只是帮你……擦擦身而已…本宫也不是不能做…」`,
        );
        await era.printAndWait(`「所以说这种事为什么要让本宫来啊………」`);
      } else {
        await era.printAndWait(
          `「把……把本宫当作什么人了啊……侍奉别人洗浴，还要帮人擦洗干净……这完全就是女仆了啊！」`,
        );
        await era.printAndWait(`${target_name}眼睛里有少许的怒气，闹着别扭`);
        await era.printAndWait(`「啊啊啊啊知道了啊，只是擦一下的话……」`);
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      chara(target).kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「帮魔王大人你洗干净了呢，之后和本宫一起好～好玩一下吧～～～」`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只是擦洗一下就好了么？魔王大人这么辛苦，这样怎么够呢，交给本宫吧～」`,
        );
        await era.printAndWait(
          `${target_name}认真地清理着你身上的每一处皮肤和容易积攒污垢的地方，用温柔的手法又帮你做了按摩`,
        );
        await era.printAndWait(
          `「不要让本宫在你身上找到来源不明的东西哦～～～」`,
        );
        await era.printAndWait(`不知怎的，你感觉一股寒气在身上游走`);
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「为什么非要让本宫做这种事……你这下贱的魔族用不起女仆，连自己做清洁都做不到么」`,
        );
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 3;
      } else if (chara(target).kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「……把这层皮下面的肉都搓掉的话，不要怪本宫没有警告过……!」`,
        );
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (chara(target).kojo.骑乘位肛交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哦哦哦魔王大人，躺下吧……让本宫来！！」`);
        await era.printAndWait(`「本宫用菊花慢慢把那里吞进去了哦～……♪」`);
        await era.printAndWait(`${target_name}慢慢用温柔的方式沉下了腰……`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「${target_name}啊……是魔王大人的呢……你喜欢的话……这里当然也是……」`,
        );
        await era.printAndWait(
          `「啊……本…本宫的菊花…把魔王大人…吞进去了…还舒服吗？」`,
        );
        await era.printAndWait(
          `${target_name}慢慢地沉下了腰，将${player_name}的阴茎吞入了。`,
        );
      } else {
        await era.printAndWait(`${target_name}听了很不情愿地坐在了你的身上`);
        await era.printAndWait(`「好讨厌啊……这样的感觉……」`);
        await era.printAndWait(
          `「本宫的那里……明明不是用来做这种事的啊啊啊！……」`,
        );
        await era.printAndWait(`她略带哭腔地抱怨着`);
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      chara(target).kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「看哦！整根插进去啦哦……！」`);
          await era.printAndWait(`「唔～哦～！在里面……闹腾着～♪」`);
        } else {
          await era.printAndWait(`「便便的地方被欺负了……受不了啦～～」`);
          await era.printAndWait(`「要本宫再摇动屁股么？噢～～……♪」`);
        }
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}跨坐在${player_name}的身上，腰身扭动出淫秽的舞蹈。`,
        );
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呃～……本宫～还不是很习惯拿这里玩呢………」`);
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}有节奏地起伏着身体。`,
        );
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「魔王大人……本宫的菊穴，舒服吗……？」`);
          await era.printAndWait(`「本宫……确实已经有感觉了哟～♪」`);
        } else {
          await era.printAndWait(`「嘻嘻～魔王大人……本宫的屁股，还满意么？」`);
          await era.printAndWait(
            `「好舒服～……啊～！可以再继续～本宫可以的……♪」`,
          );
        }
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}跨坐在${player_name}的身上，用力夹紧，不停抽动着。`,
        );
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「再用力地夹紧会更好些吗……还不是………很习惯从这里……」`,
        );
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}有节奏地起伏着身体。`,
        );
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「明明很讨厌这样的……为什么本宫现在……啊……啊啊♪」`,
        );
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}扭动着腰肢，追求着快感。`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 3;
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「明明……不是拿来做这种事的啊！！！！」`);
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (chara(target).kojo.肛门侍奉 == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「为什么要让本宫干这种！…………………」`);
        await era.printAndWait(`「啊啊啊啊知道了啊啊啊啊啊！！」`);
      } else {
        await era.printAndWait(`「为什么要让本宫干这种！…………………」`);
        await era.printAndWait(`${target_name}听了你的话情绪激动了起来`);
        await era.printAndWait(`「蛆虫！变态！禽兽！！！本宫永远也不会……」`);
        await era.printAndWait(
          `但是${target_name}现在没有反抗的立场，在你的再三命令和威逼下，${target_name}的态度软了下来，开始照做了`,
        );
        await era.printAndWait(`「…………杀了你………」`);
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      chara(target).kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嘻嘻，舒服么？舌头，要往里伸进去了哦……！这种玩法好像也挺有趣来着」`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print(`「会帮魔王大人……那个……清洁一下的…………」`);
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好吧……不过……还是挺……你真恶心呢」`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 3;
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「可恶……这种事……不做也没关系吧……」`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (chara(target).kojo.打屁股 == 0) {
      await era.printAndWait(
        `「停！停手！本宫很痛啊！快停手！啊啊啊！哈……啊啊！」`,
      );
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      chara(target).kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～！啊～！这样玩意外的有感觉呢！！再，再更用力地打本宫吧！还……完全不够啊～♪」`,
        );
        await era.printAndWait(
          `${target_name}流着口水，屁股不安分地扭来扭去。`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「本宫是不是又做错什么了呢……！哈……但是明明很痛……却好开心～啊……魔王大人♪」`,
        );
        await era.printAndWait(
          `${target_name}满脸红晕，屁股不安分地扭来扭去。`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 4;
        return 0;
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哼…只是这点小痛罢了呢…本宫……还远远没到极限呢…哈啊!…」`,
        );
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 3;
        return 0;
      } else if (chara(target).kojo.打屁股 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「停……停手啊啊！啊……这种屈辱……这种疼痛……啊！……总有一天要让你加倍奉还的啊啊啊！……痛啊！……快住手啊……」`,
        );
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (chara(target).kojo.鞭 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「欸？鞭打？皮肉之苦什么的……本宫如果能少受一点……」`,
        );
        await era.printAndWait(`「会很有快感？好吧，既然你这样说了……」`);
        await era.printAndWait(`「轻一点哦，骗本宫的话会有惩罚的哦～」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「欸？鞭打？为什么……本宫明明已经是魔王大人的了……」`,
        );
        await era.printAndWait(`「啊只要魔王大人喜欢的话……那也没办法呢」`);
        await era.printAndWait(`「呐…………轻一点哦，本宫很怕疼的……」`);
      } else {
        await era.printAndWait(
          `「本宫！本宫不是你的奴隶！只是……啊！……只是被鞭打几下罢了！……啊！……你这蛆虫，以为这能改变什么吗！！！！总有一天要报仇的！！啊！……」`,
        );
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      chara(target).kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好痛！好爽！～继续！继续啊～！！」`);
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「虽然很痛！但是鞭子打到的地方麻麻的！啊啊啊感觉整个人都要烧起来了啊啊啊好舒服！……啊！」`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～这真的，非常……痛啊……你真的……没有骗本宫…的吗？……」`,
        );
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊！啊！！好痛！…………本宫…喜欢…魔王大人！……连这鞭打也……喜欢！！…啊啊啊！！…喜欢！！」`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「明明这么痛……却渐渐有感觉了……这就是…爱的吗？……」`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊！！……为了魔王大人，本宫……会忍耐的……」`);
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊！！啊！！……被这么虐待……本宫居然……开始……」`,
        );
        await era.printAndWait(`「好不甘心啊啊啊啊啊啊！！…」`);
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 3;
      } else if (chara(target).kojo.鞭 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「没……没用的！……只是…这种…程度…罢…罢了！……啊！！」`,
        );
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (chara(target).kojo.针 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「欸？针……的吗？…这个大概只会痛的吧…」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呜呜……这都是为了魔王大人……这都是为了魔王大人………但是请…下手轻一点好吗……」`,
        );
      } else {
        await era.printAndWait(`「哈……没！没用的！！你已经……丧心病狂了啊……」`);
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      chara(target).kojo.针 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～这令人上瘾的刺痛……本宫要疯掉了！！扎深一点！！继续！！」`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「痛……！！身上的针眼越来越多了呢……但是…有点…上瘾了呢……这痛感……」`,
        );
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「真的，会有快感的吗？说谎的话就请把这些针吃下去吧…本宫真的很痛的啊…」`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人的爱……也蕴藏在这一根根的针里……的吗？……虽然很痛，但是…………好…………好开心…………」`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「痛！！！！……但是……竟然……会感觉很舒服？？？？」`,
        );
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「好痛啊啊啊！本宫不太明白啊啊！为什么！魔王大人的爱要用这样激烈的方式来表达啊啊！」`,
        );
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「明明这么痛……心里却在欢迎……天啊……本宫…究竟………」`,
        );
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 3;
      } else if (chara(target).kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「住手啊啊！！血！血流出来了啊啊！」`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (chara(target).kojo.眼罩 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「欸？把本宫的眼睛蒙上想要做些什么激烈的事吗？～」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「欸？把本宫的眼睛盖住……难道是要去找别的女孩子了么？真的么！！！？？」`,
        );
        await era.printAndWait(
          `「啊哈哈，你还在啊……本宫刚才在说些什么呢……真是……」`,
        );
      } else {
        await era.printAndWait(
          `「哈？连被本宫直视的勇气都丧失了么，真是最差劲的低等生物」`,
        );
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      chara(target).kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只是…被强行盖住眼睛…本宫就开始想着各种各样的玩法…开始兴奋了呢…♪」`,
        );
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「就连眼睛看不见的恐惧感，也转化成了快感的一部分了呢…………」`,
        );
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不让本宫看也可以哟，但是一～定要让本宫舒服！非常舒服才可以哟♪」`,
        );
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「本宫眼睛看不见……的话……就没办法抵抗了呢……啊啊又要被魔王大人弄得乱七八糟了……只……只要想到这些……」`,
        );
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔……魔王大人？在哪里？戴上眼罩果然还是会害怕呢……」`,
        );
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「为……为什么要让本宫闭上眼睛……」`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「接下来……接下来又会被…………」`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 3;
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「难道你以为不被本宫看着，就不会被降罪了么！真是……天真！天真啊！」`,
        );
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「诶呀，本宫还意犹未尽呢～……♪」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「光……还有……魔王大人……」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 2;
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「这……这种程度……没什么大不了的……！」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    if (chara(target).kojo.绳子 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哦哦哦这种玩法本宫听说过呢！虽然被束缚的话有点不舒服……本宫还是更喜欢自主一些的类型呢」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「本宫……难道又做错了什么要被绑起来……」`);
        await era.printAndWait(`「不要……溜到别的狐狸精那里去！」`);
      } else {
        await era.printAndWait(
          `「这……这种绳子……没被封住力量的话本宫瞬间就可以……现在真是便宜你了呢……」`,
        );
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      chara(target).kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只是被绑起来，就已经无法抑制地开始……有感觉了呢……」`,
        );
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「好兴奋啊……啊……被这么绑着……本宫浑身都开始发烫了……」`,
        );
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「偶尔这么玩也不错呢～」`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「只是被绑起来，就已经无法抑制地开始……有感觉了呢……」`,
        );
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……绳子……深深地勒进肉里了……虽然痛……」`);
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「为什么，非要把本宫……绑起来呢」`);
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「唔……呃……啊～…………这……这种……屈辱…………居……然……有……感觉了…………」`,
        );
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 3;
      } else if (chara(target).kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「有没有这绳子，又有何异。」`);
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「下次继续哦！」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 2;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「终于放开本宫了……被绑着怎么说也不是很舒服呢……」`,
      );
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 2;
    } else if (chara(target).kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「…………」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    if (chara(target).kojo.口塞 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「防止本宫叫得太大声么？……唔……唔……唔唔…………」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……不喜欢……唔唔……唔」`);
      } else {
        await era.printAndWait(`「什么啊！什…………呜呜……唔唔唔……唔！！！！」`);
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      chara(target).kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊啊又是这个……唔……」`);
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「没办法，毕竟魔王大人要本宫戴上嘛……呜」`);
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「为什么又～」`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不……不太喜欢这样……」`);
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……又是这个么……呜，唔唔唔……」`);
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「等……等下……呜……」`);
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「没用的呜…唔唔唔…呜」`);
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 3;
      } else if (chara(target).kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「本宫才不会张嘴让你塞！…………唔！！……咳？！！…………咯………唔！唔唔！！………」`,
        );
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「啊啊早点取下来嘛～……」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「下次不要用这个了好吗……本宫……真的不喜欢……」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 2;
    } else if (chara(target).kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「咳……咳……咳…………只是这种程度…」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    if (chara(target).kojo.灌肠肛塞 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呃……这个……灌进去的话……感觉不是很…舒服呢…真的要弄的吗……？」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呃……这个……灌进去的话……大概会很糟糕呢…真的要弄的吗……？」`,
        );
      } else {
        await era.printAndWait(`「噫！等！等一下！你要干什么！！放开本宫！」`);
        await era.printAndWait(
          `你粗暴地打开了${target_name}的菊花，开始了灌肠`,
        );
        await era.printAndWait(
          `「噫！噫噫噫噫噫噫！好……好难受啊……变态！！！变态啊啊啊啊！」`,
        );
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      chara(target).kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……这迷人的触感……凉凉的……灌进来了～」`);
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「唔～唔～感觉到肚子在叫了…………」`);
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「噫……肚子……好涨……但是……有感觉了……」`);
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「噫！噫噫！……肚子……涨起来了……不要这样弄本宫啊……会坏掉的！噫！」`,
        );
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊～啊～啊～！肠道里面……要疯了～！本宫要疯啦……！！～」`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 3;
      } else if (chara(target).kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「噫！……为什么要这样…噫！！…好难受！！！」`);
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (chara(target).kojo.放置PLAY == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「被魔王大人这么看着……好害羞…………」`);
      } else {
        await era.printAndWait(`「……在想什么？」`);
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      chara(target).kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人……不介意的话……不要把本宫一直放在一边……」`,
        );
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 4;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这样的静谧…有时也很不错呢…」`);
        await era.printAndWait(
          `「本宫从小就很喜欢看星星，虽然这里没有星星，但是……」`,
        );
        await era.printAndWait(`${target_name}红着脸小声说道`);
        await era.printAndWait(`「有魔王大人你呢……」`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 3;
      } else if (chara(target).kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哼……无聊……」`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 56) {
    if (chara(target).kojo.交谈 == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……曾经是天使。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          );
          await era.printAndWait(
            `「虽然是第一次拍这种东西，不过本宫会努力的！呵呵～」`,
          );
          await era.printAndWait(
            `「好了！那，接下来，还要说什么？……哎～不废话了！赶紧来做爱做的事吧！……嘻嘻～」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……曾经……是………下任主神……的候补…………」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边时不时害羞地偷看水晶球。`,
          );
          await era.printAndWait(
            `「不过，在魔王大人征服天界之后，就作为贡品献给魔王大人了……被魔王大人…………教会了……作为……女人的快乐…………」`,
          );
          await era.printAndWait(
            `「现在……啊…………好羞人…………能不能别拍了啊？…………」`,
          );
        } else {
          await era.printAndWait(`「别！别拍本宫！！」`);
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「嘻嘻～……闲聊的时候，突然抓人家来爱爱……爱爱的时候，又突然抓人家来闲聊……真是顽皮的魔王大人呢～」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「是……是的……能被魔王大人宠幸……本宫觉得非常的幸福～」`,
          );
        } else {
          await era.printAndWait(`「……你想本宫说什么？…………」`);
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      chara(target).kojo.交谈 = 1;
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……曾经是天使。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          );
          await era.printAndWait(
            `「希望看到这个的你，也能跟本宫一样享受性爱的快乐……哦～…啊！………轻……轻…地去了…………」`,
          );
          await era.printAndWait(
            `「那，接下来，让本宫们一起做很多舒服的事，尽情地射精吧！……嘻嘻～」`,
          );
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……本来是要成为新一任的主神，但现在却没能拯救这个世界，对不起呢～」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球甜甜地微笑着。`,
          );
          await era.printAndWait(
            `「然而，本宫是幸福的……因为知道了这种种让人愉悦的事……」`,
          );
          await era.printAndWait(
            `「在不知不觉中，身心都被魔王大人夺走了……现在也是，遵循着魔王大人的命令来拍这个…请大家好好地看着本宫吧！嘻嘻～」`,
          );
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 3;
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(`「本宫……本宫……叫${target_name}……呜呜…………」`);
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 2;
        }
      } else {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「关于那一次……呃……呃！……是啊！……嘻嘻～……所以下次这么弄的时候，就可以再用力些嘛～呵呵～～」`,
          );
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「魔……魔王……大人……你……喜、喜、喜……喜欢本宫……么？」`,
          );
          await era.printAndWait(
            `${target_name}脸红耳赤，低眉螓首地用几不可闻的声音轻轻说到。`,
          );
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 3;
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          await era.printAndWait(`「既然落入你手，本宫还能怎样呢……」`);
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (chara(target).kojo.强制口交 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「咳……咳……咳…………啊～魔王大人……太用力了啊……唔！～…本宫…咳……咳……咳…………」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「咳……咳……咳…………等…等下…唔！～…喘不过气…咳……咳……咳…………」`,
        );
      } else {
        await era.printAndWait(
          `「等，等下！咳……咳……咳…你………你要干什么……！……唔！～…拿出…咳…拿出去啊…咳……咳…………」`,
        );
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      chara(target).kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咳……唔……唔…………呼～还可以再深些哦…………唔！～……咳……呃……呃…………」`,
        );
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咳……唔……唔…不要太用力…往喉咙……里…面…去…………唔！～……咳……呃……呃…………」`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「咳……咳……咳…………唔～唔～哦！……差点被口水呛到…………唔！～……咳……咳……咳…………」`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 3;
      } else if (chara(target).kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「咳……咳……咳…………慢！慢些！……要窒息了……！……唔！～……咳……咳……咳…………」`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 2;
      }
      return 0;
    }
  }
}

// @dog_kojo_903
async function dog_kojo_903(rand) {
  const rand_n = rand ?? default_rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  if (era_flag.selectcom == 0) {
    if (chara(target).kojo.爱抚 == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(
          `「堂堂本宫，居然要被这类下等生物舔舐……真是奇耻大辱……」`,
        );
      } else {
        await era.printAndWait(`「堂堂本宫，居然要被这类下等生物舔舐……」`);
        await era.printAndWait(
          `「倘若本宫力量尚存，这等生物别说百只，万只都无法近身半步……」`,
        );
        await era.printAndWait(
          `「但是……日后定当取尔等性命！！本宫说到做到！！」`,
        );
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      chara(target).kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊…唔～哦！…好孩子…真乖！～这边也要哦～…♪」`,
          );
          await era.printAndWait(
            `${target_name}将野狗搂在怀里，引导着它舔舐自己`,
          );
          await era.printAndWait(`「嗯…这种粗糙的触觉…好棒～♪」`);
          await era.printAndWait(
            `野狗宽大的舌头来回摩擦着${target_name}细腻的肌肤，留下一道道泛着光的口水印记`,
          );
          await era.printAndWait(
            `「哈啊……不行了…光是被舔……本宫就快要去了～♪」`,
          );
          await era.printAndWait(
            `${target_name}紧紧贴着野狗，主动蹭着它的皮毛渴求更多的爱抚`,
          );
          await era.printAndWait(`「啊～～再多一点…舔遍本宫的身体吧…♪」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `${target_name}环抱住野狗，主动用身体摩擦勾引着它，引导着野狗探索自己的身体`,
          );
          await era.printAndWait(`「嗯哈……好孩子…要着重舔胸部哦～♪」`);
          await era.printAndWait(
            `野狗来回舔舐着${target_name}光裸的身体，时不时的将凸起的乳头含进嘴里用犬牙轻轻噬咬`,
          );
          await era.printAndWait(`「啊啊！好棒…真是聪明的孩子……」`);
          await era.printAndWait(
            `${target_name}高声呻吟着，不像样地将双脚敞开，压着野狗的脑袋邀请它向下爱抚`,
          );
          await era.printAndWait(
            `野狗的舌头慢慢靠近蜜穴后，期待让${target_name}的腰部颤抖了起来，呼吸变得更加凌乱了`,
          );
          await era.printAndWait(
            `「啊、啊啊～好棒……果然，野狗的舌头，真的好美妙啊……♪」`,
          );
        } else {
          await era.printAndWait(`「哈啊……好狗狗…来检查一下这里吧～♪」`);
          await era.printAndWait(
            `将生为天使的高贵姿态完全扔掉了，${target_name}发出屈服和喘息混合起来的娇喘，将身子托付给了正在爱抚自己的舌头`,
          );
          await era.printAndWait(`「啊…嗯～为什么会这么舒服……」`);
          await era.printAndWait(
            `${target_name}为了感受到更加强烈的刺激而将野狗的脑袋用力地向下压，娇喘的音高随着爱抚的舌头的动作而忽高忽低`,
          );
          await era.printAndWait(
            `「好…好棒……是的，那里……就是那里来的…那里～啊~！那里…好舒服啊～啊嗯～♪」`,
          );
        }
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这样的事情请不要再做了好吗魔王大人，被这样的下等生物舔来舔去什么的……好不舒服啊…………」`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这样的事情请不要再做了好吗魔王大人，被这样的下等生物舔来舔去什么的……好不舒服啊…………」`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 4;
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`);
        await era.printAndWait(`「……来日定报此仇……」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 3;
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！粘粘的好难受啊啊啊！」`,
        );
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        );
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        );
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (chara(target).kojo.舔阴 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `${target_name}未经人事的阴部被野狗粗暴地舔舐了起来`,
        );
        await era.printAndWait(`「快！快停手！！」`);
        await era.printAndWait(
          `想到这大概是野狗为了插入阴茎而做的准备，${target_name}浑身都开始颤抖起来`,
        );
        await era.printAndWait(`「快住手啊啊啊！」`);
        await era.printAndWait(
          `双手本能地将野狗的头向外推，但是无奈力量封印太过强大，这样的行为改变不了什么`,
        );
        await era.printAndWait(
          `「本宫的第一次……怎么也不想交给野狗啊啊啊啊啊啊！！！！」`,
        );
      } else {
        await era.printAndWait(`「快！快停手！！」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      chara(target).kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嘻嘻…好孩子～乖孩子～。继续舔哦～…啊～哦～～♪」`,
          );
          await era.printAndWait(
            `${target_name}按住野狗的脑袋，扭动着腰配合着野狗的舔舐`,
          );
          await era.printAndWait(`「嗯啊…哼啊啊啊～腰要…腰要飘起来了～♪」`);
          await era.printAndWait(
            `野狗伸出舌头用力的往小穴里探，${target_name}的每次喘息呻吟都伴随着爱液四溅`,
          );
          await era.printAndWait(
            `「再激烈一点…狠狠的玩弄本宫的小穴吧～啊…野兽的舌头在最里面……♪」`,
          );
          await era.printAndWait(
            `「本宫…本宫这…这样下去…不行了…已…又要去了…啊…啊啊啊啊……」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `${target_name}打开双腿邀请，野狗低下头伸出粗糙的舌头舔舐起来`,
          );
          await era.printAndWait(
            `「啊啊…啊…好棒…好棒……小狗狗的舌头…再往里面去一点～♪」`,
          );
          await era.printAndWait(
            `野狗的动作变得粗暴起来，${target_name}的小穴被激烈地舔舐着，连阴唇都翻了出来`,
          );
          await era.printAndWait(
            `「嗯…嗯啊……再激烈一点也没关系……用舌头好好玩弄本宫的小穴吧……♪」`,
          );
          await era.printAndWait(
            `被野狗灵巧的舌头舔的十分有感觉，${target_name}不自觉地将用双手将狗脑袋按在两腿之间`,
          );
          await era.printAndWait(`「啊啊…要，要去了……嗯啊啊……♪」`);
        } else {
          await era.printAndWait(
            `${target_name}笑着打开双腿招呼野狗过来舔舐自己，小穴因为即将到来的快意而微微颤动起来……`,
          );
          await era.printAndWait(`「好狗狗～来吧，要乖乖地舔哦～♪」`);
          await era.printAndWait(
            `小穴被尽情的舔舐着，${target_name}的爱液不停地流出来滋润着野狗的嘴`,
          );
          await era.printAndWait(`「好不好喝？哈啊……舌头…舔到最里面了……」`);
          await era.printAndWait(
            `${target_name}娇声呻吟着，努力将腿张得更开，让野狗能更加深入`,
          );
          await era.printAndWait(
            `「啊啊啊…好喜欢…好喜欢啊…这种被舔的感觉简直太好了……」`,
          );
        }
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「竟然……被这样的下等生物……舔舐着……还有感觉了……」`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「救命！……魔王大人！……把这狗弄走啊！！本宫不想……被野狗……」`,
        );
        await era.printAndWait(`${target_name}的眼中泛出泪花`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 3;
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！那里……粘粘的好难受啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的小穴渐渐覆盖上了一层泛着光的野狗的唾液`,
        );
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        );
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使最重要的地方竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        );
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (chara(target).kojo.胸爱抚 == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「明明是为了侍奉魔王大人而存在的胸部……竟然被……野狗……」`,
        );
        await era.printAndWait(`${target_name}的眼中泛出泪花`);
      } else {
        await era.printAndWait(`「快！快停手！！」`);
        await era.printAndWait(`「本宫的……胸……岂是……呜呜呜呜！……」`);
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      chara(target).kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.print(
            `「本宫的胸，喜欢吗？可以的哦…更加用力地咬…也没有关系的噢…♪」`,
          );
          await era.printAndWait(
            `${target_name}纵容着在她胸部不断舔舐着的野狗，野狗听话地用犬牙轻轻噬咬着乳头`,
          );
          await era.print(`「哈…哈…胸部会这么有感觉…嗯……」`);
          await era.print(
            `受到了极大的刺激，${target_name}发出了让人血脉喷张的可爱呻吟`,
          );
        } else {
          await era.printAndWait(`「竟然…被野狗的舌头…弄得舒服了……♪」`);
          await era.printAndWait(`${target_name}搂住在怀中作乱的野狗低低笑着`);
          await era.printAndWait(`「没关系，更大胆的舔吧…哈啊……♪」`);
          await era.printAndWait(
            `${target_name}被野狗舔舐着胸部，露出陶醉的神情，眼睛已经泛起了情欲`,
          );
        }
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「……被这样的下等生物……舔……本宫的胸……好不爽……」`,
        );
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这样的事情请不要再做了好吗魔王大人，被这样的下等生物舔来舔去什么的……好不舒服啊…………」`,
        );
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「竟然被野狗的舌头……弄得舒服了……怎……怎么可能！！」`,
        );
        await era.printAndWait(`${target_name}眼中泛起泪花`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！粘粘的好难受啊啊啊！」`,
        );
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        );
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        );
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (chara(target).kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「嗯唔…啾…嗯……哈…这可是…咕啾……本宫的初吻哦…咕唔…♪」`,
        );
        await era.printAndWait(
          `难以抑制心中的爱意，${target_name}搂着野狗的脖颈，热情地献上了唇舌`,
        );
        await era.printAndWait(
          `「明明是只爱欺负本宫的坏狗狗…咕……嗯…唔……却很绅士的留下了本宫的初吻呢…♪」`,
        );
        await era.printAndWait(
          `「哈呜…嗯……接吻…好棒……嗯啾…啾…和小狗狗接吻……嗯…♪」`,
        );
        await era.printAndWait(
          `野狗追逐着${target_name}的小舌不放，舌头相互纠缠着交换唾液，最后吻到缺氧了才不得不分开`,
        );
        await era.printAndWait(`「哈……真是贪心的小狗狗…唔…咕啾……」`);
        await era.printAndWait(
          `然而还不等${target_name}喘息几秒，野狗就再次扑了上来，宽大的舌头再次入侵了${target_name}的唇`,
        );
        await era.printAndWait(`「唔哈……咕…那……那就多吻几次吧…啾呼……」`);
        await era.printAndWait(
          `完全纵容着野狗，${target_name}的小舌热情回应着，交缠到麻木也不肯停止`,
        );
        await era.printAndWait(
          `来不及吞咽的唾液滴落在${target_name}漂亮的锁骨上，吸引野狗向下舔舐着`,
        );
        await era.printAndWait(
          `「嗯……不行哦…虽然很舒服……但是现在本宫更想接吻…咕啾……♪」`,
        );
        await era.printAndWait(
          `抱住野狗不安分的脑袋，${target_name}将野狗的舌头含进了嘴里吮吸起来，全然不见最初的抵抗模样`,
        );
        await era.printAndWait(`「初吻……哈啊…能留给你…真是太棒了……咕滋……」`);
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！！啊啊啊！！！」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！明明……是属于魔王大人的啊！啊啊啊！！魔王大人……救命……！」`,
        );
      } else {
        await era.printAndWait(`「竟然要被这类下等生物夺取初吻……」`);
        await era.printAndWait(`${target_name}的眼里燃起了熊熊怒火`);
        await era.printAndWait(
          `「倘若本宫力量尚存，这等生物别说百只，万只都无法近身半步……」`,
        );
        await era.printAndWait(
          `「但是……日后定当取尔等性命！！本宫说到做到！！唔……唔！！！呜呜呜……」`,
        );
        await era.printAndWait(
          `只是话说着吓人，但是初吻还是被野狗夺去了。${target_name}眼里的泪水终于止不住开始淌下脸庞`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else if (chara(target).kojo.接吻 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「嗯唔…啾…嗯……哈…没想到…咕啾……和野狗接吻这么舒服…咕唔…♪」`,
        );
        await era.printAndWait(
          `${target_name}搂着野狗的脖颈，主动热情地将舌头缠绕起来，难舍难分`,
        );
        await era.printAndWait(`「比起别的…咕……嗯…很粗糙的触感…唔……也很烫…♪」`);
        await era.printAndWait(
          `「哈呜…嗯……接吻…好棒……嗯啾…啾…和野狗接吻……嗯…♪」`,
        );
        await era.printAndWait(
          `野狗追逐着${target_name}的小舌不放，舌头相互纠缠着交换唾液，最后吻到缺氧了才不得不分开`,
        );
        await era.printAndWait(`「哈……真是贪心的小狗狗…唔…咕啾……」`);
        await era.printAndWait(
          `然而还不等${target_name}喘息几秒，野狗就再次扑了上来，宽大的舌头再次入侵了${target_name}的唇`,
        );
        await era.printAndWait(`「唔哈……咕…那……那就多吻几次吧…啾呼……」`);
        await era.printAndWait(
          `完全纵容着野狗，${target_name}的小舌热情的回应着，互相纠缠到麻木也不肯停止`,
        );
        await era.printAndWait(
          `来不及吞咽的唾液滴落在${target_name}漂亮的锁骨上，吸引野狗向下舔舐着`,
        );
        await era.printAndWait(
          `「嗯……不行哦…虽然很舒服……但是现在本宫更想接吻…咕啾……♪」`,
        );
        await era.printAndWait(
          `抱住野狗不安分的脑袋，${target_name}将野狗的舌头含进了嘴里吮吸起来`,
        );
        await era.printAndWait(`「野兽的舌头……哈啊…真是太棒了……咕滋……」`);
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！！啊啊啊！！！」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！明明……是属于魔王大人的啊！啊啊啊！！魔王大人……救命……！」`,
        );
      } else {
        await era.printAndWait(`「竟然要被这类下等生物夺取初吻……」`);
        await era.printAndWait(`${target_name}的眼里燃起了熊熊怒火`);
        await era.printAndWait(
          `「倘若本宫力量尚存，这等生物别说百只，万只都无法近身半步……」`,
        );
        await era.printAndWait(
          `「但是……日后定当取尔等性命！！本宫说到做到！！唔……唔！！！呜呜呜……」`,
        );
        await era.printAndWait(
          `只是话说着吓人，但是初吻还是被野狗夺去了。${target_name}眼里的泪水终于止不住开始淌下脸庞`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.print(
            `天使专心致志地与野狗唇舌交缠着，将野狗当成了情人一般`,
          );
          await era.printAndWait(
            `「嗯唔…野狗的体味…咕……好好闻……哈啊…脑袋都要变得一片空白了～♪」`,
          );
          await era.printAndWait(
            `${target_name}抬手搂住野狗，更加热情的探出舌头回应着野狗的亲吻`,
          );
          await era.printAndWait(`「哈…哈…唔…再来一次吧……♪」`);
          await era.printAndWait(
            `${target_name}的眼睛都湿润了，前倾身体，含住野狗的舌头吮吸起来`,
          );
        } else if (rand_n(2) == 0) {
          await era.print(
            `「哈～和野狗接吻什么的……以前真是想都没想过呢～唔…来吧……♪」`,
          );
          await era.printAndWait(
            `${target_name}轻笑喘息着，任由粘糊糊的舌头侵入了嘴里`,
          );
          await era.printAndWait(`「嗯…嗯唔……会上瘾的…啾…这么舒服的话……哈…」`);
          await era.printAndWait(
            `小舌主动缠绕着野狗粗糙的舌头，${target_name}吞咽着野狗的唾液，完全沉迷在野兽的亲吻中了`,
          );
        } else {
          await era.print(`「小狗狗～过来，本宫想你的吻了…♪」`);
          await era.printAndWait(
            `${target_name}搂着野狗的脖颈，主动抬起头舔吮着野狗吐在外面的舌头`,
          );
          await era.print(
            `「哈啊…这样……总感觉本宫…咕唔…哈……像只母狗一样呢…♪」`,
          );
          await era.printAndWait(
            `一天使一狗的舌头相互纠缠着，没有及时吞咽的唾液滴落在了${target_name}的锁骨上`,
          );
          await era.print(`「浪费了……♪哈啊…没关系…嗯……还有更多……」`);
          await era.printAndWait(
            `${target_name}的唇在口水的湿润下变得更加艳丽了，野狗伸出粗糙的舌头贪婪地来回舔舐着`,
          );
          await era.print(
            `「想要继续接吻吗？没有问题哦……啾…多少次……都行……咕唔…」`,
          );
        }
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「要本宫和狗亲吻什么的…魔王大人，不要这样了……好吗……真的不舒服啊！～」`,
        );
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人刚才说什么？本宫听不懂～不理解！不理解啊啊！…呜呜………唔唔唔…呜…」`,
        );
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 4;
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不！本宫拒绝！不！呜！唔唔唔！呜…………」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 3;
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「和这样的牲畜……接吻……」`);
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        );
        await era.printAndWait(`「唔！……唔唔唔！呜！呜呜呜呜呜………………」`);
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗亲吻了，这种心灵冲击想必非常剧烈的吧`,
        );
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (chara(target).kojo.舔肛 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「哈嗯…为什么喜欢这里呢…真让人不好意思呢…小狗狗～」`,
        );
        await era.printAndWait(
          `${target_name}的肛穴在野狗的舔舐下渐渐覆盖上了一层泛着光的唾液`,
        );
        await era.printAndWait(`「哈…好难为情啊……但是你喜欢的话…就舔吧～♪」`);
        await era.printAndWait(
          `似乎有点不习惯肛门被野兽舔舐的感觉，${target_name}的呻吟中还夹杂着些许不安`,
        );
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「唯独这种玩法……本宫真的很讨厌啊」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「呃……狗什么的……粘粘的好难受…魔王大人你………为什么……」`,
        );
      } else {
        await era.printAndWait(`「不，不要啊！！在舔哪里啊！！」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      chara(target).kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.print(`${target_name}用手扒开屁股，接受着野狗的舌头`);
          await era.printAndWait(`「嗯…你就这么喜欢本宫的后面啊～♪」`);
          await era.printAndWait(
            `${target_name}呻吟着将腰抬得更高，野狗顺势将舌头刺了进去`,
          );
          await era.printAndWait(
            `「啊……更加用力抽插那里吧…粗暴的……也没关系…哈啊……」`,
          );
        } else if (rand_n(2) == 0) {
          await era.print(`「啊啊～舔那种地方的话…哈呜♪」`);
          await era.printAndWait(
            `${target_name}享受着野狗舔舐自己的肛门带来的快感，发出一阵阵淫媚的娇喘…`,
          );
          await era.print(
            `「更加…更加往肛穴的深处…哈啊……用舌头来侵犯本宫吧…」`,
          );
          await era.print(
            `开发完全的肛门容纳了野狗的舌头，柔韧的肠肉绞着侵入的舌尖，发出咕啾咕啾的水音`,
          );
        } else {
          await era.print(
            `「可以哦，随你喜欢的舔吧♪唔……你就这么喜欢这里吗～♪」`,
          );
          await era.printAndWait(
            `${target_name}被野狗舔着肛门周围的褶皱，宽大的舌头更进一步的刺到了肛门里面`,
          );
          await era.print(
            `「啊啊啊…不行…肛门被这样的玩弄……好舒服…真的……好舒服……♪」`,
          );
          await era.printAndWait(
            `${target_name}因为肛门被深入的舌头来回搅动而发出甜美的呻吟`,
          );
        }
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「被狗这么舔…好奇怪啊……魔王大人…快把狗牵走吧…」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这到底怎么回事…这样的……魔王大人……你究竟…想要本宫怎样啊………野狗……好讨厌………」`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 3;
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！屁股……粘粘的好难受啊啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的菊花渐渐覆盖上了一层泛着光的野狗的唾液`,
        );
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        );
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        );
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (chara(target).kojo.背后位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.print(`${target_name}四肢着地趴在地上，摇动屁股引诱着野狗`);
          await era.print(`「这可是本宫的第一次哟，亲爱的小狗狗～♪」`);
          await era.printAndWait(
            `${target_name}的小穴湿润无比，因为即将到来交配而全身颤抖着`,
          );
          await era.printAndWait(
            `野狗喘着粗气，完全勃起的阴茎通红肿胀，压在${target_name}背上，猛然往腔内插去`,
          );
          await era.printAndWait(`「啊啊……好深…野狗的肉棒……到最里面了……」`);
          await era.printAndWait(
            `${target_name}背后的翅膀突然展开，天使在野狗的侵犯下发出了期待已久的甜美呻吟`,
          );
          await era.printAndWait(
            `「嗯噢噢噢噢！！！痛…但是好棒……本宫…在和小狗狗交配着……♪」`,
          );
          await era.printAndWait(
            `被${target_name}的呻吟鼓舞了一般，野狗的前爪牢牢固定住天使的身体，下半身的抽插动作越发快了起来`,
          );
          await era.printAndWait(
            `「啊～哈啊…好喜欢…好喜欢被野狗侵犯……啊啊……」`,
          );
          await era.printAndWait(
            `发出了淫乱的娇喘声的${target_name}已经完全看不到以往的高贵姿态了，如今这只是一头沉迷交配的雌犬`,
          );
          await era.printAndWait(
            `「要到了…！射在里面……狗的精子…都射到子宫里……嗯唔唔唔唔！！」`,
          );
          await era.printAndWait(
            `「哈啊……哈…本宫……大概是爱上你了…明明只是只野狗…竟然夺走了本宫的心♪」`,
          );
          await era.printAndWait(
            `在野狗射完精拔出阴茎后，${target_name}翻过身搂住了野狗主动送上了唇`,
          );
          await era.printAndWait(
            `「嗯唔…啾…哈……真是只温柔的小狗♪咕……你的话，让本宫怀孕也是可以的哦。」`,
          );
          await era.printAndWait(
            `双腿缠上野狗的腰，引导着狗根进入自己的小穴，${target_name}边亲吻着边又和野狗做了起来`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「欸？等等……等下！为什么要让本宫被野狗……」`);
          await era.printAndWait(
            `「魔王大人你也要适可而止啊！！这一点也不好玩啊！」`,
          );
          await era.printAndWait(`「停……不要……不要啊啊啊啊啊！」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「欸？等等……等下！魔王大人，为什么要让本宫被野狗……」`,
          );
          await era.printAndWait(
            `「本宫还是……第一次……至少……也请魔王大人……将本宫保持至今的纯洁……」`,
          );
          await era.printAndWait(
            `「就这样子交给野狗的话……交给野狗的话…………啊啊啊啊啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${target_name}因为被野狗夺去了纯洁这一事实，精神受到了相当大的冲击，泪水夺眶而出，身体痛苦地扭动了起来`,
          );
        } else {
          await era.printAndWait(`「救……命……救命啊啊啊啊啊啊啊！！」`);
          await era.printAndWait(
            `「被下贱的生物……用更下贱的生物…………夺走了………啊啊啊啊！」`,
          );
          await era.printAndWait(
            `「啊啊啊！杀了你们……绝对……啊唔……绝对要……杀了你们！！！！」`,
          );
          await era.printAndWait(
            `剧烈的精神冲击转化为了强大的愤怒和仇恨，被夺走了力量的她依然释放出了强烈的威压……`,
          );
          await era.printAndWait(`不过失去的纯洁再也……`);
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.print(
            `${target_name}四肢着地趴在地上，发情地摇动着屁股引诱着野狗`,
          );
          await era.print(`「来吧，小狗狗～把本宫的小穴填满吧～♪」`);
          await era.printAndWait(
            `${target_name}的小穴湿润无比，因为即将到来交配而全身颤抖着`,
          );
          await era.printAndWait(
            `野狗喘着粗气，完全勃起的阴茎通红肿胀，压在${target_name}背上，猛然将阴茎往腔内插进去了`,
          );
          await era.printAndWait(`「啊啊……好深…野狗的肉棒……到最里面了……」`);
          await era.printAndWait(
            `${target_name}雪白的翅膀突然展开，天使在野狗的侵犯下发出了期待已久的甜美呻吟`,
          );
          await era.printAndWait(
            `「嗯噢噢噢噢！！！好棒……本宫…在和野狗交配着……♪」`,
          );
          await era.printAndWait(
            `被${target_name}的呻吟鼓舞了一般，野狗的前爪牢牢固定住天使的身体，下半身的抽插动作越发的快了起来`,
          );
          await era.printAndWait(
            `「啊～哈啊…好喜欢…好喜欢被野狗侵犯……啊啊……」`,
          );
          await era.printAndWait(
            `像野兽一样发出了淫乱的娇喘声的${target_name}已经完全看不到以往的高贵姿态了，如今只是一头沉迷交配的雌犬`,
          );
          await era.printAndWait(
            `「要到了…！射在里面……狗的精子…都射到子宫里……嗯唔唔唔唔！！」`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「为什么一定要让本宫和野狗……」`);
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「这样很难受啊啊啊啊！如果是惩罚本宫的话……至少能不能换成别的惩罚啊啊啊……多么严厉……都可以啊……至少不要让本宫和野狗……呜……啊啊啊！」`,
          );
        } else {
          await era.printAndWait(`「救……命……救命啊啊啊啊啊啊啊！！」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      chara(target).kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.print(
            `${target_name}像母狗一样趴在地上，期待来自野狗的征讨`,
          );
          await era.print(
            `「交……交配！和野兽交配最棒了…本宫要为小狗狗生孩子～」`,
          );
          await era.printAndWait(`两只走兽相互交缠着，完全沉醉在肉欲中了`);
          await era.print(
            `「啊啊啊～小狗狗……尽情侵犯你的母狗吧……♪要…要到了…让本宫怀孕吧，唔啊啊啊啊啊！！！」`,
          );
          await era.printAndWait(
            `野狗猛然沉下身体，膨胀的阴茎完全没入了${target_name}的小穴，注入了滚烫的精子`,
          );
          await era.print(`「哈啊……肚子里热热的…还想……还想再要……♪」`);
          await era.print(
            `${target_name}扭动着腰肢，引诱着背上的野狗，还没有完全射完精的野狗再度抽插了起来`,
          );
          await era.print(`「啊啊啊……一边射精一边做……唔哈……太棒了♪」`);
        } else if (rand_n(2) == 0) {
          await era.print(
            `${target_name}向野狗展示自己湿漉漉的小穴，发出了热情的要求`,
          );
          await era.print(`「来吧小狗狗♪来侵犯你面前的小母狗吧～♪」`);
          await era.print(
            `野狗低吠着，压在${target_name}背上，肿胀的阴茎一口气刺入了最深处，毫不留情的抽送起来`,
          );
          await era.printAndWait(`「啊啊啊♪这样做的话…比平时更深……嗯啊……」`);
          await era.printAndWait(
            `熟练得扭动腰肢配合着野狗的动作，${target_name}的呻吟声格外高亢`,
          );
          await era.printAndWait(
            `野狗用前爪固定住${target_name}的身体，每一次的抽插都会带出大量的体液`,
          );
          await era.printAndWait(
            `「啊啊～！深一些…再深一些！本宫…最喜欢这样的感觉了……♪」`,
          );
          await era.printAndWait(
            `抛弃了天使的高贵身份，${target_name}完全成为一只向野狗发情的雌犬了`,
          );
        } else {
          await era.print(`「咕…嗯…嗯……啊啊啊…哈……♪」`);
          await era.print(
            `${target_name}沉浸在走兽间的激烈交配中，野狗的每一次抽插都能让她的呻吟更加高亢`,
          );
          await era.print(`「啊啊啊插到最里面了……就这样射精……让本宫怀孕吧～」`);
          await era.printAndWait(
            `回应着这个要求一般，野狗猛然刺进了，滚烫的精子直接注入了${target_name}的子宫`,
          );
          await era.print(`「啊啊～！更多……在本宫的子宫里…用精液播种吧…♪」`);
          await era.printAndWait(
            `${target_name}为了能让自己被更多的侵犯而用令人心神荡漾的声音向野狗撒着娇，那副发情野兽一样的表情，已经完全看不到天使的样子了`,
          );
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「为什么一定要让本宫和野狗……」`);
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「这样很难受啊啊啊啊！如果是惩罚本宫的话……至少能不能换成别的惩罚啊啊啊……多么严厉……都可以啊……至少不要让本宫和野狗……呜……啊啊啊！」`,
        );
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「无法原谅…无法原谅…哈♪啊啊啊♪」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 4;
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「无法原谅……要和狗………无法原谅啊啊……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 3;
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「一个不剩…………统统杀光…………」`);
        await era.printAndWait(
          `${target_name}的眼里闪露着凌厉的光芒，已经不对背后活动着的野狗做什么反应了`,
        );
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (chara(target).kojo.背后位肛交 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.print(`「啊啊～♪本宫竟然…因为肛穴被小狗狗侵犯而高兴…♪」`);
        await era.printAndWait(
          `${target_name}娇声呻吟着，淫乱的肛门黏膜伸展着咬住了野狗的阴茎`,
        );
        await era.print(
          `「哈啊……就连肛穴也不放过…坏狗狗……嗯啊…要去了……这么激烈的话♪」`,
        );
        await era.printAndWait(
          `被野狗从背后贯穿，${target_name}仰起头一副沉醉其中的模样`,
        );
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「要让狗狗从后面………吗？」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜……要和狗肛交………」`);
      } else {
        await era.printAndWait(`「什么…这……是骗本宫的……对吧…？」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      chara(target).kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.print(
            `${target_name}被背上的野狗侵犯着，感觉自己的肛穴都要融化了……`,
          );
          await era.print(`「啊啊…被野狗…侵犯肛门让人停不下来啊…啊啊啊…」`);
          await era.printAndWait(
            `${target_name}发出了满足的喘息，开发完全的肛门轻松自如得应付着抽插`,
          );
          await era.printAndWait(`「腰…自己动起来了……嗯哈…完全停不下来了…♪」`);
          await era.printAndWait(
            `在${target_name}一阵阵甘甜的娇喘声中，野狗越发奋力地撞击起来`,
          );
        } else {
          await era.print(
            `${target_name}纤细的腰被野狗抱着，小巧的肛门被粗大的狗根贯穿了`,
          );
          await era.print(
            `「哈啊…这么突然……小狗狗…嗯啊啊♪在直肠里搅来搅去…♪」`,
          );
          await era.print(
            `为了追求更多的快感，${target_name}摇摆腰肢配合着野狗的抽插`,
          );
          await era.printAndWait(
            `「已…已经…要去了啊～…啊啊啊…射出来、在里面射出来！」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「和狗…也挺舒服的……」`);
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「如果是和魔王大人的话…就更好了………」`);
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「魔王大人…为什么啊………」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「屁股…和狗…呜呜…………」`);
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 3;
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「你这疯子！！……」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (chara(target).kojo.手淫 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「为什么本宫一定要给这种下等生物……」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「魔王大人……还是不要让本宫……本宫……真的很讨厌这种感觉呢……」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「狗的臭味……满手都是……」`);
      } else {
        await era.printAndWait(`「呕…………好脏……这种东西…………」`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      chara(target).kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「小狗狗～舒服么？嘻嘻！不停地脉动着呢！」`);
          await era.printAndWait(
            `「喜欢温柔地摩擦，还是激烈地那种更和你心意？」`,
          );
          await era.printAndWait(
            `${target_name}带着恶作剧般的笑容，舔着嘴角握住了野狗的阴茎`,
          );
          await era.printAndWait(
            `明明只是为野狗手交而已，${target_name}的小穴就已经湿的不成样子了`,
          );
          await era.printAndWait(`「好想快点放进来啊……本宫的小穴～♪」`);
          await era.printAndWait(`「嗯唔…啾…嗯……来吧…都射在本宫的手上，哈…♪」`);
          await era.printAndWait(
            `忍不住内心的躁动，${target_name}边亲吻着野狗的皮毛边又替野狗做了起来`,
          );
        } else {
          await era.printAndWait(
            `「野兽的味道……变浓烈的了，来，把精液都射出来吧～♪」`,
          );
          await era.printAndWait(
            `${target_name}握住野狗的阴茎上下套弄着，赤裸的小穴已经泛起了湿意`,
          );
          await era.printAndWait(
            `「啊…这么烫……又这么大，要是插到本宫的小穴里的话～♪」`,
          );
          await era.printAndWait(
            `${target_name}收回一只手往自己的下身探去，将野狗的汁液涂抹在自己的阴蒂上并玩弄了起来`,
          );
          await era.printAndWait(`「哈啊……好想和小狗狗一起去…♪」`);
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「好恶心的感觉……」`);
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「真的很讨厌啊……魔王大人……让本宫走吧……」`);
        } else {
          await era.printAndWait(`「呜呜呜好难受……做这种事真的好难受……」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜呜好难受……做这种事真的好难受……」`);
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「为什么要强迫本宫……做这种肮脏的事情！」`);
        await era.printAndWait(`「还是……给野狗………………」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 3;
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「咦……好臭……这种……脏东西…………」`);
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (chara(target).kojo.口交_奴 == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「原来如此，狗的小鸡鸡，是这个味道啊～♪」`);
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「人家不想舔这种东西！……但是……如果……是魔王大人的爱好……的话……」`,
        );
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「知……知道了………只是吸一下哦！」`);
      } else {
        await era.printAndWait(
          `「讨，讨厌！不想把这东西放嘴里！！住！住手！！！」`,
        );
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      chara(target).kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.print(`${target_name}小心翼翼地用嘴唇轻触着野狗的阴茎`);
          await era.print(`「有点烫呢～♪」`);
          await era.print(
            `感慨了一下以后，${target_name}探出小舌挑逗着狗根的顶部，一下一下的来回舔弄着`,
          );
          await era.print(`野狗的阴茎勃起得更加明显了，尾巴摇的十分勤奋`);
          await era.printAndWait(`「看起来你很喜欢呢…小狗狗～♪」`);
          await era.printAndWait(
            `${target_name}用手压住野狗的身体，将狗根吞入口中吮吸起来`,
          );
          await era.printAndWait(`「汪…汪汪～♪」`);
          await era.print(`野狗低吠着，顺着${target_name}的动作快速抽插起来`);
          await era.printAndWait(
            `「咳…心急的孩子…咕唔……没关系，射在本宫嘴里也可以的哟～♪」`,
          );
        } else {
          await era.print(`「小狗狗～♪乖一点，本宫让你舒服～♪」`);
          await era.print(
            `${target_name}安抚着野狗，将头探到野狗下腹，含住了半勃起的阴茎`,
          );
          await era.print(`「咕唔……喜欢吗？本宫的舌头～」`);
          await era.print(
            `野狗耸动着腰部在${target_name}的口中抽插着，阴茎在${target_name}的含弄下逐渐膨胀`,
          );
          await era.print(
            `「一跳一跳地，好像很舒服的动着呢～啾呜…嗯……小狗狗的阴茎…♪」`,
          );
          await era.print(`${target_name}一副陶醉的模样，尽力地侍奉着野狗`);
        }
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哪怕是狗！本宫都能用嘴搞定～♪」`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「臭臭的……不过，并不讨厌……」`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「是命令的话……不管是狗还是什么，本宫都会尽心地服侍好的……！」`,
        );
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「知……知道啦……偶尔要也侍奉人以外的东西吗…………」`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 3;
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨！讨厌！呕…………臭死了……这野兽！」`);
        await era.printAndWait(
          `被迫为野狗侍奉的${target_name}眼中燃烧着屈辱和愤怒的火焰`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (chara(target).kojo.骑乘位 == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `跪坐在地上的${target_name}兴奋地舔着唇，把手撑在地上减去重量，就这么骑在了野狗身上`,
          );
          await era.printAndWait(`「被本宫拿到主导权了哦小狗狗～♪」`);
          await era.printAndWait(
            `和野狗对视着，${target_name}扭动着身体，湿润的小穴来回摩擦着野狗肚皮上的毛发`,
          );
          await era.printAndWait(`「嗯……光是这样，本宫就好像要去了♪」`);
          await era.printAndWait(
            `得不到满足的野狗汪汪叫着，仿佛对自己变成${target_name}享乐的玩具十分不满`,
          );
          await era.printAndWait(
            `「嗯？着急了吗？本宫可还是处子，你要给本宫一定的心理建设时间才对啊♪」`,
          );
          await era.printAndWait(
            `坏心眼的逗弄着身下的野狗，${target_name}笑着用阴唇套弄着狗根，为野狗做起了素股。粘糊糊的爱液被用作润滑液，发出了咕啾咕啾的声音`,
          );
          await era.printAndWait(`「汪！汪汪汪！！」`);
          await era.printAndWait(
            `「好了好了，别急，好好看着，本宫的处子穴，完全要归你了哦～♪」`,
          );
          await era.printAndWait(
            `${target_name}用双手将小穴给撑开了，对着肿胀的狗根，慢慢坐了下去`,
          );
          await era.printAndWait(
            `「哈啊…感觉……好清楚…被小狗狗一点点撑开…啊…到深…深处了…已经全部都进到里面去了啊啊～♪」`,
          );
          await era.printAndWait(
            `${target_name}的处女膜被一点一点地捅破穿过，将野狗的阴茎完全吞没了进去，猩红的处子血缓缓流到了野狗身上`,
          );
          await era.printAndWait(
            `在忍过开始的疼痛之后，${target_name}摇摆着腰肢，开始追求起交配的乐趣来`,
          );
          await era.printAndWait(
            `「啊～啊啊啊……好棒……腰自己就动起来了……小狗狗的阴茎…又烫又硬……哈啊～♪」`,
          );
          await era.printAndWait(
            `「啊啊啊嗯啊嗯啊哦嗯…子宫口咕噜咕噜的…本宫的子宫被穿透了啊…啊啊啊哈嗯……♪」`,
          );
          await era.printAndWait(
            `${target_name}配合着娇喘声伸展着翅膀，但那副姿态已经完全失去了天使的高贵和荣耀`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `跪坐在地上的${target_name}兴奋地舔着唇，把手撑在地上减去重量，就这么骑在了野狗身上`,
          );
          await era.printAndWait(`「被本宫拿到主导权了哦小狗狗～♪」`);
          await era.printAndWait(
            `和野狗对视着，${target_name}扭动着身体，湿润的小穴来回摩擦着野狗肚皮上的毛发`,
          );
          await era.printAndWait(`「嗯……光是这样，本宫就好像要去了♪」`);
          await era.printAndWait(
            `得不到满足的野狗汪汪叫着，仿佛对自己变成${target_name}享乐的玩具十分不满`,
          );
          await era.printAndWait(
            `「嗯？着急了吗？本宫可是第一次用这个姿势，你要给本宫一定的心理建设时间才对啊♪」`,
          );
          await era.printAndWait(
            `坏心眼的逗弄着身下的野狗，${target_name}笑着用阴唇套弄着狗根，为野狗做起了素股。粘糊糊的爱液被用作润滑液，发出了咕啾咕啾的声音`,
          );
          await era.printAndWait(`「汪！汪汪汪！！」`);
          await era.printAndWait(
            `「好了好了，别急，好好看着，本宫的小穴，完全要归你了哦～♪」`,
          );
          await era.printAndWait(
            `${target_name}用双手将小穴给撑开了，对着肿胀的狗根，慢慢坐了下去`,
          );
          await era.printAndWait(
            `「哈啊…感觉……好清楚…被小狗狗一点点撑开…啊…到深…深处了…已经全部都进到里面去了啊啊～♪」`,
          );
          await era.printAndWait(
            `${target_name}将野狗的阴茎完全吞没了进去，粘稠的爱液因为重力缓缓流到了野狗身上`,
          );
          await era.printAndWait(
            `「啊～啊啊啊……好棒……腰自己就动起来了……小狗狗的阴茎…又烫又硬……哈啊～♪」`,
          );
          await era.printAndWait(
            `摇摆着腰肢，${target_name}开始追求起交配的乐趣来`,
          );
          await era.printAndWait(
            `「啊啊啊嗯啊嗯啊哦嗯…本宫的子宫被穿透了啊…啊啊啊哈嗯……♪」`,
          );
          await era.printAndWait(
            `${target_name}配合着娇喘声伸展着翅膀，但那副姿态已经完全失去了天使的高贵和荣耀`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait('');
        } else if (era0(`talent:${target}:85`) == 1) {
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
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「小狗狗，你知道的吧～快翻过来♪」`);
          await era.printAndWait(
            `${target_name}带着笑意这样说着，野狗听话的躺倒露出了肚皮和未勃起的阴茎`,
          );
          await era.printAndWait(`「听话的小狗会有奖励的♪哈，还没勃起呢～♪」`);
          await era.printAndWait(
            `撩了撩头发，${target_name}抚摸着野狗柔软的皮毛，倾下身含住了狗根吮吸套弄起来`,
          );
          await era.printAndWait(
            `「咕唔…快点勃起，哈…让我们来做些快乐的事情～♪」`,
          );
          await era.printAndWait(
            `舔弄的差不多以后，${target_name}跨坐在野狗身上，用湿润的小穴吞没了肿胀的狗根`,
          );
          await era.printAndWait(
            `「哈啊啊～好深…骑乘位好棒……小狗狗的阴茎一跳一跳的♪子宫口也好想要啊…♪」`,
          );
          await era.printAndWait(
            `${target_name}淫乱地晃动起了腰部，为了享受更深的快感将阴茎塞到了小穴深处`,
          );
          await era.printAndWait(
            `随着抽送而发出咕啾咕啾的声音，秘裂里飞溅的爱液打湿了野狗的皮毛`,
          );
          await era.printAndWait(
            `「啊啊嗯啊啊…继续插进来…把本宫的小穴弄得乱七八糟的吧♪」`,
          );
          await era.printAndWait(
            `「哈啊…射在里面也没有关系……让本宫…哈…让本宫怀孕吧…啊啊啊啊啊啊♪」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「嗯啊……小狗狗的肉棒…全是本宫的东西♪」`);
          await era.printAndWait(
            `${target_name}跨骑在野狗身上，前后扭动着腰，品味着龟头和子宫口一次次的接吻的快乐`,
          );
          await era.printAndWait(`「好深…太深了……就这样插到子宫里吧～♪」`);
          await era.printAndWait(
            `一天使一狗的交合处随着腰部动作发出淫荡的咕啾咕啾声，无与伦比的快感让${target_name}成为了渴求性交的雌兽`,
          );
          await era.printAndWait(
            `「听到了吗小狗狗，你的肉棒…也在说着喜欢本宫的小穴呢…♪」`,
          );
          await era.printAndWait(
            `${target_name}低下头向野狗送上亲吻，唾液交换时的滋滋声和交合的咕啾声显得十分合拍`,
          );
          await era.printAndWait(
            `「嗯啾……咕…要到了……一起去吧…射在里面让本宫怀孕吧……哈啊啊啊啊♪」`,
          );
        } else {
          await era.printAndWait(`「你这样…就好像变成了本宫的丈夫一样～♪」`);
          await era.printAndWait(
            `${target_name}骑在野狗身上摇摆着身子，享受着被野狗侵犯的滋味`,
          );
          await era.printAndWait(
            `「嗯…又或者说……是本宫变成了你的小母狗呢～♪」`,
          );
          await era.printAndWait(
            `毫不在意的说着有失身份的话语，${target_name}呻吟着加快了速度`,
          );
          await era.printAndWait(
            `「哈啊……来吧…老公……让本宫怀上你的小狗崽吧……♪」`,
          );
          await era.printAndWait(
            `用力沉下腰将野狗的阴茎吞入到最深处，滚烫的狗精就这么直接射进了天使的子宫中`,
          );
          await era.printAndWait(`「啊啊啊啊啊……好烫…好棒啊♪」`);
          await era.printAndWait(
            `同时达到高潮的${target_name}停下动作，细细品味着被野狗内射的滋味`,
          );
          await era.printAndWait(
            `「还不够哦♪想让本宫怀孕的话，就这么一次可不够～♪」`,
          );
          await era.printAndWait(
            `${target_name}俯下身将自己的乳首送到野狗嘴边享受着口舌的舔舐，粗暴的动作使骑在野狗身上的${target_name}陷入了恍惚`,
          );
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 7;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
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
        era0(`talent:${target}:85`) == 1 &&
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
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
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
        era0(`mark:${target}:2`) == 3 &&
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
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「为什么…要给狗……」`);
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      chara(target).kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.print(`「小狗狗想要的话……也是没办法的呢～♪」`);
          await era.printAndWait(
            `${target_name}固定住野狗的身体，伸出舌头舔舐起野狗的肛门来`,
          );
          await era.printAndWait(
            `「嗯…嗯嗯…奇怪的味道♪嗯…啾…这样把舌头伸进肛门…哈啊……你喜欢吗？」`,
          );
          await era.printAndWait(
            `故意发出着下流的声音，${target_name}将舌头深深的探了进去`,
          );
          await era.printAndWait(`「啊啊…啾……本宫的身体也开始热起来了…咕…♪」`);
          await era.printAndWait(
            `${target_name}仔细地舔舐着野狗的肛门，将每一处皱褶都舔得干干净净`,
          );
        } else {
          await era.print(
            `「哈啊哈啊…小狗狗的肛穴…虽然味道有点怪怪的…啾…但是最喜欢了～♪」`,
          );
          await era.printAndWait(
            `${target_name}用舌尖探入野狗的肛门，柔软的舌头温柔的爱抚着肠壁上的褶皱`,
          );
          await era.printAndWait(
            `「咕呣……咕呣…你发着抖…哈…是舌头这样舔感觉很舒服吗…」`,
          );
          await era.printAndWait(
            `${target_name}目光湿润，完全沉浸在侍奉野狗的快感中了`,
          );
        }
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 6;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 4;
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
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

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (chara(target).kojo.眼罩 == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「究竟要带本宫去什么地方？嗯…？这个声音，是小狗狗吗？」`,
        );
        await era.printAndWait(
          `被遮蔽视线的${target_name}显得有些不安，小心翼翼的试探着周围的环境`,
        );
        await era.printAndWait(`「真的是小狗狗，太好了，总算是有点安心了。」`);
        await era.printAndWait(
          `「什么？本宫才不是在害怕，只是在高兴小狗狗在而已，就是这样的！」`,
        );
        await era.printAndWait(
          `蹲下身抱住身旁的野狗，${target_name}又变得理直气壮起来`,
        );
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      chara(target).kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「又要带本宫去哪里？小狗狗…？你在这啊。」`);
        await era.printAndWait(
          `似乎已经有些习惯了，${target_name}抱着野狗主动摩擦起它的皮毛来`,
        );
        await era.printAndWait(
          `「对象是小狗狗的话……啊又要被弄得乱七八糟了……」`,
        );
        await era.printAndWait(`「只……只要想到这些…快点开始吧～♪」`);
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 10;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 9;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 8;
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 7;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 6;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 5;
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 4;
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
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
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:136`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「真舍不得你啊小狗狗……」`);
      await era.printAndWait(
        `不想同野狗分别的${target_name}，用赤裸的身躯来回摩擦着怀里的野狗`,
      );
      await era.printAndWait(`「啾……嗯…临别的吻……让本宫再享受一下吧……♪」`);
      // CFLAG:380  = 4（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 4;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 3;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait('');
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 2;
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait('');
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (chara(target).kojo.交谈 == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(
            `「本宫是${target_name}……原来是个天使……但本宫现在已经不当天使，改当小狗狗的雌犬了♪」`,
          );
          await era.printAndWait(
            `${target_name}一边对水晶球这么说着，一边抱紧了身旁的野狗`,
          );
          await era.printAndWait(
            `「在被它征服之后以后，就一直主动寻求和小狗狗的交配……它已经成为本宫的丈夫了呢～♪」`,
          );
          await era.printAndWait(
            `带着笑意这么介绍着自己和野狗的关系，${target_name}热情得和野狗接起吻来`,
          );
          await era.printAndWait(`「咕…哈……老公…喜欢本宫的吻吗…？」`);
          await era.printAndWait(
            `${target_name}一边探出小舌和野狗交缠，一边伸手握住了野狗开始勃起的阴茎套弄起来`,
          );
          await era.printAndWait(
            `「啾…嗯唔……已经想做了？哈……那让全世界都来看看…你有多棒吧♪」`,
          );
          await era.printAndWait(
            `「那么现在，就让本宫和老公一起，做许许多多舒服的事情吧♪」`,
          );
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……原来是个天使……但本宫现在已经不当天使，成为魔王大人的牝奴隶了。」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          );
          await era.printAndWait(
            `「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的本宫吧！」`,
          );
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          );
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……原来是个天使……但本宫现在已经不当天使，成为魔王大人的奴隶了。」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边顺从地对水晶球分开双腿。`,
          );
          await era.printAndWait(
            `「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的本宫吧！」`,
          );
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          );
        } else {
          await era.printAndWait(
            `「看到这个水晶球的人！谁都好！谁都可以！！请来救救本宫吧！！呜呜……呜呜呜…………哇！！！！」`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      chara(target).kojo.交谈 = 1;
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:136`) == 1 &&
          (chara(target).kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「啊……本宫是${target_name}……大家对本宫的上一部作品感觉如何呢？」`,
          );
          await era.printAndWait(
            `${target_name}对着水晶球说着，搂住野狗的脑袋，将乳首送到它嘴边享受舔弄`,
          );
          await era.printAndWait(
            `「哈…好棒…♪那么这次，也是本宫和小狗狗交配的实况了……嘻嘻～当野狗的雌犬真是幸福呢～♪」`,
          );
          await era.printAndWait(
            `压着野狗的脑袋向下，${target_name}享受着野狗的舔阴，边伸手套弄起狗根来`,
          );
          await era.printAndWait(`「本宫的野狗老公……是世界上最棒的丈夫了♪」`);
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 5;
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……大家对本宫的上一部的兽交作品感觉如何呢？」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          );
          await era.printAndWait(
            `「这次，在主人的命令下，本宫又要和狗交配了……尽情地鄙视这样下贱的本宫吧！」`,
          );
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          );
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 4;
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「呃……本宫叫${target_name}……大家对本宫的上一次的交配感觉如何呢？」`,
          );
          await era.printAndWait(
            `${target_name}一边这么说着，一边顺从地对水晶球分开双腿。`,
          );
          await era.printAndWait(
            `「这次，在主人的命令下，本宫又要和狗交配了……尽情地鄙视这样下贱的本宫吧！」`,
          );
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          );
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

// @kojo_message_palamcng_903
async function kojo_message_palamcng_903() {
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    return 0;
  }

  const p_lube =
    (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // P = PALAM:3 + UP:3
  if (p_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「黏黏的……有点凉……」`);
        await era.printAndWait(
          `「魔王大人，是想让本宫不感到痛才用这种东西的吧……嘛……并……并不讨厌呢……」`,
        );
      } else {
        await era.printAndWait(`「魔王大人……本宫已经……湿得乱七八糟了～」`);
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「什么嘛！这黏糊糊的…」`);
        await era.printAndWait(`「这……是润滑用的吗……接下来……难道……」`);
      } else {
        await era.printAndWait(
          `「哈……只是从本宫身体里分泌出一点液体罢了……没……没什么大不了的！！」`,
        );
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    chara(target).kojo.首次润滑Lv2 = 1;
  }

  const p_lust =
    (era0(`palam:${target}:5`) || 0) + (era0(`delta:${target}:5`) || 0); // P = PALAM:5 + UP:5
  if (p_lust > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「啊～五彩缤纷的！好棒～好棒啊！…」`);
      } else {
        await era.printAndWait(`「魔王大人…本宫……想要更加地…被你疼爱……」`);
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「卑鄙！…用这种手段………」`);
      } else {
        await era.printAndWait(`「难以置信…本宫………居然……会产生这种………快感？」`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    chara(target).kojo.首次欲情Lv2 = 1;
  }

  const p_shame =
    (era0(`palam:${target}:8`) || 0) + (era0(`delta:${target}:8`) || 0); // P = PALAM:8 + UP:8
  if (p_shame > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「魔王大人！…本宫……本宫现在好害羞啊………」`);
    } else {
      await era.printAndWait(`「哈…只是这种……这种程度的羞耻感……」`);
      await era.printAndWait(`但是嘉德已经涨红了脸，害羞得不得了了`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    chara(target).kojo.首次耻情Lv2 = 1;
  }

  const p_fear =
    (era0(`palam:${target}:10`) || 0) + (era0(`delta:${target}:10`) || 0); // P = PALAM:10 + UP:10
  if (p_fear > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「魔王……大人……本宫…还不是很害怕……还可以坚持…………」`,
      );
      await era.printAndWait(`话虽如此，但她的身体却开始发抖了…………`);
    } else {
      await era.printAndWait(
        `「只是这种程度罢了！想让本宫屈服？还为时尚早呢！」`,
      );
      await era.printAndWait(`话虽如此，但她的身体却开始发抖了…………`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    chara(target).kojo.首次恐怖Lv2 = 1;
  }

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「魔……魔王……大人……要去了！！小豆豆被玩弄着就！！……啊哈哈啊啊啊～！！」`,
      );
    } else {
      await era.printAndWait(
        `「停……停手啊！……那里被玩弄着……竟然……这感觉是……唔啊啊啊啊啊！！」`,
      );
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    chara(target).kojo.首次C绝顶 = 1;
  }

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊啊！小穴！小穴要去了！！好棒！这感觉好棒～！再继续对本宫～～做更多～～！」`,
      );
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊啊！里面…有什么…这…………？！……唔……哦哦哦哦哦！…！」`,
      );
    } else {
      await era.printAndWait(
        `「别！别这样！…呃……本宫怎么会这么轻易就…唔哦哦哦哦哦哦！！」`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    chara(target).kojo.首次V绝顶 = 1;
  }

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊哈！好！好棒！第一次……第一次用菊花高潮了！！」`,
      );
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「原来……这里……也可以有这么强烈的～呜～啊啊好害羞啊啊！！」`,
      );
    } else {
      await era.printAndWait(
        `「讨厌！讨厌！！这里不是！！不是用来～不……要……哇啊啊啊啊啊！！坏掉了……本宫的屁股……坏掉了…………」`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    chara(target).kojo.首次A绝顶 = 1;
  }

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「胸部…好幸福………啊啊！去了！要去了啦！！！」`);
    } else {
      await era.printAndWait(
        `「啊！唔啊啊！！不要！不要再碰本宫的胸了哈啊啊啊啊～！」`,
      );
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    chara(target).kojo.首次B绝顶 = 1;
  }

  const a =
    (era0(`delta:${target}:11`) || 0) + (era0(`delta:${target}:12`) || 0); // A = UP:11 + UP:12
  if (game.train.处女丧失 == 1 && chara(target).kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「啊～第一次就这样……唔虽然有点痛……但是……还不错呢……」`,
        );
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(
          `「第……第一次做这种事……就是和魔王大人……虽然很痛……但是……本宫……很幸福……」`,
        );
      } else {
        await era.printAndWait(`「被……你这种家伙……玷污了呢……」`);
      }
    } else {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「果然还是魔王大人亲自来……会比较好吗？……好痛……」`,
        );
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「属于魔王大人的身体……被……玷污了……」`);
      } else {
        await era.printAndWait(`「居然……就这样……呜……」`);
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    chara(target).kojo.处女丧失 = 1;
  }
}

// @kojo_message_markcng_903
async function kojo_message_markcng_903() {
  const target = era_flag.target;
  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「感觉好痛苦……这难道……也是……爱的滋味吗？……」`);
    } else {
      await era.printAndWait(`「疼、疼痛感……啊…啊啊……」`);
      await era.printAndWait(
        `「本宫可不能输给痛觉啊！」她在脑海里这么对自己说着，但是疼痛的记忆确确实实刻在她的灵魂里了……`,
      );
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    chara(target).kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && chara(target).kojo.快乐刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「有、有感觉了…………魔王大人……魔王大人哦！！……本宫也开始……感到那种快感了！！」`,
      );
    } else {
      await era.printAndWait(
        `「怎、怎么会……有……有感觉了……呜……本宫竟然……输给了这种感觉……」`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    chara(target).kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && chara(target).kojo.屈服刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「本宫…是魔王大人的……永远……永远都是！」`);
    } else {
      await era.printAndWait(`「好、好吧……本宫…稍微……听一下你的意见……也……」`);
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    chara(target).kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && chara(target).kojo.反抗刻印Lv3 == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「魔王大人！……竟然对本宫！！做这样的事！！可恶……可恶啊啊啊啊啊！！！」`,
      );
    } else {
      await era.printAndWait(
        `「本宫发誓，总有一天要将你轰杀致渣！总有一天！！」`,
      );
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    chara(target).kojo.反抗刻印Lv3 = 1;
  }
}

// @self_kojo_k903
async function self_kojo_k903(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const Q = peek_aftertrain_q();
  if (game.train.初吻与自我口上 == 1) {
    if (Q == 1) {
      await era.print('');
    } else if (Q == 2) {
      await era.print(`「小狗狗…啊…小狗狗的肉棒～………！」`);
      await era.printAndWait(
        `${target_name}抚摸着自己的身体，忍不住将手指向下探去………`,
      );
      await era.printAndWait(`「想做……哈啊……还想和小狗狗交尾………！」`);
      await era.printAndWait(
        `「呜哈……想被滚烫的野兽精子填满……啊啊………小狗狗……」`,
      );
      await era.printAndWait(
        `幻想着野狗的模样，${target_name}的中指快速抽插着小穴，但似乎完全没法获得满足的样子………`,
      );
      await era.printAndWait(`「唔…小狗狗………」`);
    } else {
      if (
        era0(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊……这种作为女人的快感…本宫…还没享受够呢…………呜哈啊啊啊……哈……」`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 4;
      } else if (
        era0(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「魔王大人………魔王大人啊……嗯唔唔……只是想着你，本宫的手就～」`,
        );
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 3;
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「停不下来…停不下来啦～…变得……奇怪了！…」`);
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 2;
      } else if (chara(target).kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「唔……呃……哦！～………啊啊啊！」`);
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (
      era0(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「女人的身体…真是好东西啊…唔哦！！……再更加……再更加粗暴地对待本宫吧！…」`,
      );
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 5;
    } else if (
      era0(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「女人的身体…真是好东西啊…嘻嘻！……再更加抱紧本宫吧！…」`,
      );
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 4;
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「没有女人的话…本宫可能活不下去了………」`);
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 3;
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「明明本宫也是女人………可是………好棒啊…………」`);
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 2;
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「本宫居然…对…女人………」`);
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「魔王大人～～早安～～」`);
      await era.printAndWait(`「今天也来和本宫一起玩吧～～！」`);
      await era.printAndWait(
        `${target_name}伸出舌头，把嘴里滴落的精液舔干净了。`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 3;
    } else if (
      era0(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「早安，魔王君～♪」`);
      await era.printAndWait(
        `${target_name}甜甜地笑着，用心地侍奉着你的阴茎。`,
      );
      await era.printAndWait(`「…………只……只是为了叫你起床罢了……！」`);
      await era.printAndWait(`${target_name}羞涩地说着。`);
      await era.printAndWait(`「不要去找别的狐狸精啊～～」`);
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 3;
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「…………只是为了叫你起床罢了，不要误会。」`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 2;
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(
        `「唔……为什么本宫必须要这样把你弄醒啊……好恶心……」`,
      );
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「唔～哦哦哦哦！……又……啊～又这么有感觉……啊啊啊啊啊！～♪」`,
      );
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 2;
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈……只是……一些余兴活动～♪」`);
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「本宫晚上……稍微有点睡不着呢……想，想看着你……」`);
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      chara(target).kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      await era.printAndWait('');
    } else if (era0(`mark:${target}:3`) == 3) {
      await era.printAndWait('');
    } else if (era0(`talent:${target}:76`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    await era.print('');
    if (era0(`talent:${target}:122`) != 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 == 11) {
    if (chara(target).kojo.妊娠发觉 >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「啊，哈，呼呼，呵呵呵呵，嘿嘿～～」`);
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait(
        `「呜……被魔王大人射了那么多进去……怀孕了也没办法呢……魔王大人你可一定要对本宫负起责任来哦～」`,
      );
    } else if (chara(target).event.妊娠相手 == 2) {
      await era.printAndWait(
        `「说……说了不要再本宫肚子里面乱来了啊……这……这下子怎么办啊」`,
      );
    } else if (chara(target).event.妊娠相手 == 3) {
      await era.printAndWait(
        `「说……说了不要再本宫肚子里面乱来了啊……这……这下子怎么办啊」`,
      );
    } else if (chara(target).event.妊娠相手 == 5) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「欸？这也是没办法的呢……毕竟被小狗狗射了这么多～♪」`,
        );
        await era.printAndWait(
          `意识到肚子里孩子的父亲竟然是野狗，${target_name}抚摸着肚子温柔的笑着`,
        );
        await era.printAndWait(
          `「堂堂天使竟然会心甘情愿怀上野狗的孩子，真是不可小觑的野兽♪」`,
        );
      } else {
        await era.printAndWait('');
      }
    } else if (chara(target).event.妊娠相手 == 6) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(
          `「欸？怀孕……也没办法啊，毕竟被那些怪物们内射了这么多～♪」`,
        );
        await era.printAndWait(
          `得知自己怀了怪物的孩子，${target_name}抚摸着肚子摇了摇头`,
        );
        await era.printAndWait(`「也不知道是哪个幸运儿的种子顺利成长了呢♪」`);
      } else {
        await era.printAndWait('');
      }
    } else if (chara(target).event.妊娠相手 == 7) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:271  = 1（变量语义：CFLAG 族，271）
    chara(target).kojo.妊娠发觉 = 1;
  }

  if (game.train.初吻与自我口上 == 12) {
    if (chara(target).kojo.生产 >= 1) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「嘻嘻……嘿嘿～…………嘿嘿嘿嘿～…………」`);
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      await era.printAndWait('');
    } else if (chara(target).event.妊娠相手 == 2) {
      await era.printAndWait('');
    } else if (chara(target).event.妊娠相手 == 3) {
      await era.printAndWait('');
    } else if (chara(target).event.妊娠相手 == 5) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「平安的出生了呢……真是可爱的小狗崽……♪」`);
        await era.printAndWait(
          `刚生产完还十分虚弱的${target_name}抚摸着小狗崽的皮毛，脸上洋溢着母性的笑容`,
        );
        await era.printAndWait(
          `「只是普通模样的小狗呢，还以为会带上翅膀什么的，呵呵，毕竟它的母亲可是个天使啊♪」`,
        );
        await era.printAndWait(
          `「下次再为小狗狗怀上的时候，说不定就会生下新品种的小狗了呢～♪」`,
        );
      } else {
        await era.printAndWait('');
      }
    } else if (chara(target).event.妊娠相手 == 6) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(`「顺利生下了呢～」`);
        await era.printAndWait(
          `${target_name}摸了摸小怪物的脑袋，脸上洋溢着母性的笑容`,
        );
        await era.printAndWait(
          `「原来是它的孩子，真可爱，可惜没能带上天使的翅膀。」`,
        );
        await era.printAndWait(`「下次还有机会的吧♪」`);
      } else {
        await era.printAndWait('');
      }
    } else if (chara(target).event.妊娠相手 == 7) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
    // CFLAG:272  = 1（变量语义：CFLAG 族，272）
    chara(target).kojo.生产 = 1;
  }

  if (game.train.初吻与自我口上 == 13) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      if (era0(`talent:${target}:153`)) {
        await era.printAndWait('');
      } else if (era0(`talent:${target}:154`)) {
        await era.printAndWait('');
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    chara(target).kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 == 14) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      await era.printAndWait('');
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    chara(target).kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 == 999) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 == 998) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// @dungeon_ryouzyoku_k903
async function dungeon_ryouzyoku_k903() {
  const target = era_flag.target;
  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「放开本宫！！这些！这些下贱的生物！！！」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「可恶！」`);

      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(
        `「求你们！放过本宫………这种事，要和喜欢的人做………」`,
      );

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(
          `「用……用后面吧！！虽然有点脏…不过本宫不介意的…………」`,
        );
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「呜……本宫用嘴！……本宫用嘴可以么？…」`);
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「放开本宫！！不要拿你们的脏手碰本宫！想要被轰成碎屑吗！！」`,
      );
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「这……莫非就是本宫的命运………」`);
    } else {
      await era.printAndWait(`「这种屈辱……本宫绝不屈服！！…」`);
    }
  } else {
    await era.printAndWait(`（她早就把处女用掉了！）`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「唉…………」`);

      return 0;
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      await era.printAndWait(`「把本宫救出去吧？本宫再好好地报答你们？」`);

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        await era.printAndWait(`「用后面……用后面的话……就随你们弄………」`);
      }

      if (era0(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「其它放过本宫！本宫用嘴！本宫用嘴尽力地满足你们…」`,
        );
      }
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      await era.printAndWait(
        `「放开本宫！！不要拿你们的脏手碰本宫！想要被轰成碎屑吗！！」`,
      );
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「本宫……要完蛋了吗………」`);
    } else {
      await era.printAndWait(`「本宫不会屈服！！绝对…」`);
    }
  }

  return 0;
}

// @dungeon_ryouzyoku_after_k903
async function dungeon_ryouzyoku_after_k903() {
  const target = era_flag.target;
  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「呼………没事…没事呢……」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「哼！」`);

      return 0;
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「屁股……好痛苦………」`);
      await era.printAndWait(`「如此地……粗暴………」`);
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「这么舔……还是……第一次………」`);
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「射了……好多………」`);
    }
  } else {
    await era.printAndWait(`「终于……结束了吗……？」`);

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「…………」`);

      return 0;
    }

    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「里面……要被弄坏了啦………」`);
      await era.printAndWait(`「好过分………」`);
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「屁股……已经没有感觉了………」`);
      await era.printAndWait(`「真糟糕………」`);
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「好…恶心…」`);
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「射了……好多………」`);
    }
  }

  return 0;
}

// @benki_koujo_k903
async function benki_koujo_k903(rand) {
  void rand;
  const a = era_flag.target;
  if (game.train.肉便器行动 == 0) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「呵……能有幸得见本宫的身体，你们也应该死而无憾了吧！」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「魔王大人…………救命…………」`);
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「恶……恶心……」`);
    } else {
      await era.printAndWait(`「失去了力量的本宫……难道只能……呃……」`);
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「唔，这样的吗，偶尔试下这种风味也……」`);
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「魔王大人…………救命…………」`);
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「恶……恶心……」`);
    } else {
      await era.printAndWait(`「失去了力量的本宫……难道只能……呃……」`);
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「看着本宫吧！本宫是个喜欢和动物做爱的变态！～♪」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「唔唔～动物的臭味～♪」`);
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「好……好的……现在去抱动物………」`);
    } else {
      await era.printAndWait(`「再……再来………」`);
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「不管前面也好，后面也好……请把本宫塞满吧！～♪」`);
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「那里……和屁股………都……哦～啊啊啊啊！～♪」`);
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「请，请用光本宫所有的穴吧………」`);
    } else {
      await era.printAndWait(`「双管齐下什么的………！」`);
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「本宫的小穴，舒服么？随你喜欢来用哦～…♪」`);
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「把安全套拿走吧！」`);
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「请……随意使用本宫的小穴……」`);
    } else {
      await era.printAndWait(`「那里………啊！」`);
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「啊～本宫是菊穴也很有感觉的尻穴奴隶！…～♪再来！…啊啊～！啊～」`,
      );
    } else if (era0(`talent:${a}:85`)) {
      await era.printAndWait(`「屁股…好厉害…啊！！噢～～」`);
    } else if (era0(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「屁，屁股………♪」`);
    } else {
      await era.printAndWait(`「啊～！……那里是………」`);
    }
  }

  return 0;
}

// @dungeon_victory_k903
async function dungeon_victory_k903(rand) {
  const rand_n = rand ?? default_rand;
  const target = era_flag.target;
  const a = target;
  await era.printAndWait(`「被本宫净化掉，也是你们这些虫子的荣幸吧～」`);

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    await era.printAndWait(`「……」`);

    return 0;
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「别做无谓的抵抗啦…」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「就这水平…」`);
    } else {
      await era.printAndWait(`「真难看啊…」`);
    }
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    await era.printAndWait(`「呼……真惊险…哈哈！」`);

    return 0;
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「好！赢了！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「本宫赢啦！」`);
    } else {
      await era.printAndWait(`「嗯……」`);
    }
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`「呜…居然能蹭到本宫的衣服………」`);
  } else {
    await era.printAndWait(`「下次就是一个地宫的妖怪一起来也可以哟」`);
  }

  return 0;
}

// @dungeon_attack_k903
async function dungeon_attack_k903(rand) {
  const rand_n = rand ?? default_rand;
  const target = era_flag.target;
  if (chara(target).invasion.状态 == 2) {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「又是这种无聊的战斗呢。」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「得见本宫的真容，你们也死而无憾了吧～～」`);
      } else {
        await era.printAndWait(
          `「消～散～吧～。欸，不知道哪里的家伙这么对本宫说，开打前这么说一句会很帅的。完全没感觉的嘛。」`,
        );
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「呜……要一直战斗下去么……？」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「让本宫来教你们什么是战斗。」`);
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「哼……就这程度」`);
      } else {
        await era.printAndWait(`「你这家伙……死了么？」`);
      }
    }
  } else {
    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「消～散～吧～。欸，不知道哪里的家伙这么对本宫说，开打前这么说一句会很帅的。完全没感觉的嘛。」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「又是无谓的挣扎呢。」`);
      } else {
        await era.printAndWait(`「呐呐，早点投降的话，后面会轻松一些的哟」`);
      }
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      await era.printAndWait(`「再……再给本宫力量……！」`);

      return 0;
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「从魔王大人处获得的力量……就让你见识一下吧！」`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「过来这边吧……你也就明白了……」`);
      } else {
        await era.printAndWait(`「呵呵～可爱的家伙，不过你什么都不知道啊！」`);
      }
    }
  }

  return 0;
}

// @colosseum_kojo_903
async function colosseum_kojo_903() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_nickname(0);
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi);
  // 死斗场 SC31/21/27 三处同型的武器名（源 :5391-:5394、:5424-:5427、
  // ）：TALENT:ASSI:121/122 有则「阴茎」，否则持假阳具时补
  // 「假阳具」，两段都不出时为空串。
  // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4
  //（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
  const assi_has_penis =
    era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1;
  const assi_has_toy = era0('item:4') == 1;
  if (era_flag.selectcom == 55) {
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站都站不稳了……`);
    } else {
      await era.printAndWait(
        `${target_name}在死斗场的热情及对方凌厉的眼神中哆嗦着。`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「才…才不会输给${assi_name}呢！……」`);
        await era.printAndWait(`筋疲力尽的${target_name}屁股向后跌坐在地上……`);
      } else {
        await era.printAndWait(
          `「啊…啊…不……不要…才不要被这种怪物侵犯！…不要！不要！……」`,
        );
        await era.printAndWait(
          `筋疲力尽的${target_name}连滚带爬地企图逃离死斗场。`,
        );
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「难……难道……要和${assi_name}做对手么……」`);
        await era.printAndWait(
          `${target_name}皱着眉头，看着在${master_name}命令之下武装起来的${assi_name}……`,
        );
      } else {
        await era.printAndWait(`「呕……这……这么恶心的怪物………」`);
        await era.printAndWait(
          `${target_name}看着对面丑陋的怪物，表情都扭曲了。`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊…唔……唔唔………就……就在这里吗？…咳……！」`);
      // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
      // 不换行，末行 PRINTFORMW 才收行。:5391/:5393 两条 SIF 互斥——判据提到
      // 语句外当取值（assi_has_penis/assi_has_toy），文本留在输出语句里（#625）
      await era.printAndWait(
        `${assi_name}把` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,
      );
    } else {
      await era.printAndWait(
        `「啊………会……会好好地舔的啦…………所以……所以……不要再做其它过分的事啦……呃……唔…………唔唔…………咳……」`,
      );
      await era.printAndWait(`${target_name}舔啜着带着令人作呕的气味的阴茎……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊…${assi_name}啊…停……手…快停手啦………」`);
      await era.printAndWait(
        `${target_name}无力反抗……任由${assi_name}肆意地玩弄着她的胸部……`,
      );
    } else {
      await era.printAndWait(
        `「呜………为……为什么……本宫要遇上这种事啊………呜呜！」`,
      );
      await era.printAndWait(
        `${target_name}的胸部被粗鲁地揉捏着，发出了痛苦的呻吟……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊…！唔……啊啊啊！…好深………弄的好深啦……！」`);
      // 同 :5390 组的一整行（#625）
      await era.printAndWait(
        `${assi_name}听到悲鸣，更加兴奋了，继续用` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `毫不留情地蹂躏着${target_name}的私处……`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「死………死………要…死掉了……」`);
      await era.printAndWait(
        `可怜的${target_name}断断续续地发出崩溃的声音，承受着巨魔的糟蹋。`,
      );
    } else {
      await era.printAndWait(`「被……被这样的家伙……呜……唔……哎呀！！」`);
      await era.printAndWait(`${target_name}被怪物尽情侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「呜！啊啊啊啊！屁股……屁股…要被弄坏啦！！」`);
      // 同 :5390 组的一整行（#625）
      await era.printAndWait(
        `${assi_name}听到悲鸣，更加兴奋了，继续用` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `毫不留情地蹂躏着${target_name}的肛门……`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「死………死………要…死掉了……」`);
      await era.printAndWait(
        `可怜的${target_name}断断续续地发出崩溃的声音，承受着巨魔的糟蹋。`,
      );
    } else {
      await era.printAndWait(
        `「被……被这样的家伙……呜……唔……哎呀！！屁股……屁股……要被弄坏啦！」`,
      );
      await era.printAndWait(`${target_name}被怪物尽情地侵犯着肛门……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(
      `「这……这种药………本宫………本宫………呃！！……噢噢哦噢～！」`,
    );
    return 0;
  }

  return 0;
}

// @ntr_koujo_k903
async function ntr_koujo_k903(rand, P) {
  void rand;
  const target = era_flag.target;
  P = P ?? 0;
  if (chara(target).kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    chara(target).kojo.NTR再捕获 = 1;
  }

  if (P == 1) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(`「想不到……本宫的第一次……竟然是被狂王……呜……」`);
    } else {
      await era.printAndWait(
        `「哈啊……本宫的……本宫的……第一次……好不甘心就这样……」`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    chara(target).kojo.NTR_651 = 1;
  } else if (P == 2) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊…啊…啊啊！…不……不要再来了………屁股………唔……哦哦哦哦！」`,
      );
    } else {
      await era.printAndWait(
        `「啊！……你这变态…不要再来了…………唔………哦哦哦哦！」`,
      );
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    chara(target).kojo.NTR_652 = 1;
  } else if (P == 3) {
    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(
        `「唔哦…～啊啊！ 要坏掉了……要被狗玩坏掉啦！～${heart(1)}」`,
      );
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…啊………讨厌………被看着……被看着啦………呜呜…唔！…噢…啊啊啊啊！」`,
      );
    } else {
      await era.printAndWait(
        `「可恶…这么做的话…会被施以天罚的！…呜…唔…啊啊！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    chara(target).kojo.NTR_653 = 1;
  } else if (P == 4) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「唔～…啊啊！…本…本……本宫是狂王大人…的…东西…再来…再来…再操本宫吧！${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「唔～…哦！啊啊…噢！啊……！ 好、好深啊………要去了…要……去……了！！！～♪」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    chara(target).kojo.NTR_654 = 1;
  } else if (P == 5) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「看啊…小穴也好，尻穴也好，都塞进了你们的小鸡鸡哦～${heart(1)} 嘻嘻～啊！同时被插入太舒服啦！${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「呵呵…正面上本宫啊！………♪」`);
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    chara(target).kojo.NTR_655 = 1;
  } else if (P == 6) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…再来…再狠狠地弄本宫…噢…已经……回不去那人的身边了………操本宫！…弄本宫！…把本宫操坏吧！～${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊…啊……输掉了话………就失去一切啊………噢！……对不起……会……会用心侍奉的………啊！唔唔！」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    chara(target).kojo.NTR_656 = 1;
  } else if (P == 7) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「狂王大人…啊啊…好舒服……请……请继续…使用本宫吧…」`,
      );
    } else {
      await era.printAndWait(`「啊啊…会……会继续…侍奉您的………」`);
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    chara(target).kojo.NTR_657 = 1;
  } else if (P == 20) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      if (chara(target).event.妊娠相手 == 1) {
        await era.printAndWait(
          `「还……还给本宫！…那……那是……本宫和魔王大人的孩子啊！…」`,
        );
      } else {
        await era.printAndWait(
          `「是……是啊……本宫的子宫，是属于狂王大人的东西～…${heart(1)}」`,
        );
      }
    } else {
      await era.printAndWait(`「啊…好想～继续怀上啊～♪」`);
    }
  }
  return 0;
}

// @exucution_koujo_k903
async function exucution_koujo_k903() {
  if (game.event.犬射精或处刑口上 == 4) {
    await era.printAndWait(`「放，放开本宫！…侍奉怪物什么的………呜…呜哇哇！！」`);
  } else if (game.event.犬射精或处刑口上 == 5) {
    await era.printAndWait(
      `「讨厌…讨厌！本宫变得不像自己了…不要！……不、要、啊…啊………」`,
    );
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait(`「混蛋！给本宫记住！！………」`);
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

// @museum_koujo_k903
async function museum_koujo_k903() {
  if (game.event.博物馆口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait('');
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

// @banishment_koujo_k903
async function banishment_koujo_k903() {
  if (game.event.流放口上 == 0) {
    await era.printAndWait(`「本宫的…力量…被那样地………骗人…吧…………」`);
  } else if (game.event.流放口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    await era.printAndWait('');
  }
}

// @public_exucution_koujo_k903
async function public_exucution_koujo_k903() {
  if (game.event.公开处刑口上 == 0) {
    await era.printAndWait(`「到死为止都要被侵犯？呃……有趣…来试试呗！！」`);
  } else if (game.event.公开处刑口上 == 1) {
    await era.printAndWait(
      `「这种…罪犯似的结局…本宫绝不认可！…放开本宫！…放开本宫！！」`,
    );
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

// @grotesque_koujo_k903
async function grotesque_koujo_k903() {
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

// @enterenemy_koujo_k903
async function enterenemy_koujo_k903(rand) {
  void rand;
  const a = era_flag.target;
  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    await era.printAndWait(`「………呃……魔王……吗………」`);
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    await era.printAndWait(`「就让本宫来干掉魔王吧！」`);
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    await era.printAndWait(`「本宫，应该能干掉魔王吧………？」`);
  } else {
    await era.printAndWait(`「遇到魔王的话，就干掉他！！」`);
  }
}

// @gohoubi_request_koujo_k903
async function gohoubi_request_koujo_k903(rand) {
  void rand;
  const a = era_flag.target;
  // 源 :5660/:5662 读取从未赋值的 public static Y；清洁调用时其值为 0。
  const y = 0;
  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait(`「钱钱钱！嘻嘻嘻～」`);
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行。兽名三档（:5700/:5702/:5704）里后两档读
    // 的是从未赋值的 Y（= 0，源缺陷 1:1）——判据提到语句外当取值、文本留在
    // 输出语句里（#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 == 1
        ? '狗狗'
        : y == 2
          ? '公猪'
          : y == 3
            ? '雄马'
            : '';
    await era.printAndWait(
      `「魔王大人，你懂得的吧…让本宫和` + beast_word + `好好地玩・一・玩吧♪」`,
    );
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(`「嘻嘻！…魔王大人要和本宫来个很长很长的湿吻哦～」`);
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(`「…本宫回来的时候，想被魔王大人温情地抱一阵子。」`);
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait(`「嘻嘻！魔王大人先把精液存着！等本宫回来拿～」`);
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`「想进行一场了不得的乱交呢！…都是你害得啦！…」`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait(`「回来之后…想喝魔王大人的尿………可以么？」`);
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait(`「嘻嘻！想收一个童贞啊！」`);
  }
}

// @gohoubi_after_koujo_k903
async function gohoubi_after_koujo_k903(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const target_name = chara_callname(a);
  if (choice == 0) {
    await era.printAndWait(
      `「至少也要给点奖励啊，看在本宫稍微用了点心的份上」`,
    );
  } else if (choice == 1) {
    await era.printAndWait(
      `「勋章？荣誉的吗？嘛虽然对本宫来说这没什么大不了的……」`,
    );
  } else if (choice == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(`「唉，然而对本宫来说根本没有什么用啊」`);
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了地狱犬的犬舍中挑选心仪的初夜对象`,
        );
        await era.printAndWait(
          `在赶走周围的闲杂人等之后，${target_name}解开自己的衣服，赤裸着身子慢慢走到了地狱犬中间`,
        );
        await era.printAndWait(
          `被魔王所豢养的地狱犬们看起来高大又健硕，黑红色的皮毛被梳理着油光发亮，隆起的肌肉发达有力，被伺候的很好的样子`,
        );
        await era.printAndWait(`「呵呵，真是些强壮的好孩子。」`);
        await era.printAndWait(
          `地狱犬们显然对带着魔王气息的天使很是亲近，它们聚集在天使身边，时不时用脑袋蹭着天使的肌肤撒娇`,
        );
        await era.printAndWait(`「啊…野兽的气息……光是这样，本宫竟然就湿了。」`);
        await era.printAndWait(
          `雌性情动的气味让魔兽躁动了起来，原本温顺的地狱犬们开始烦躁地走来走去，一声声壕叫在这片空地中回荡`,
        );
        await era.printAndWait(
          `这时一只三头地狱犬挤开了同伴来到了${target_name}身边，它仰起头看着天使，喉咙里溢出一声声低吼`,
        );
        await era.printAndWait(`「你要当第一个？好孩子，就是你了。」`);
        await era.printAndWait(
          `${target_name}笑着点了点头，摸了摸三头地狱犬柔软的皮毛，又将中间的脑袋向小穴压去`,
        );
        await era.printAndWait(
          `嗅到气味的地狱犬毫不客气的大口舔舐起小穴来，被快感侵袭的天使张开翅膀裹住身上的魔兽，顺着它的动作摆动着腰部`,
        );
        await era.printAndWait(
          `地狱犬的左边脑袋也不甘落后，来回舔舐着${target_name}的小腿`,
        );
        await era.printAndWait(
          `「啊啊…好宽大的舌头……再里面点……呀你落单了，可怜的小东西…唔啾……」`,
        );
        await era.printAndWait(
          `${target_name}享受着中间脑袋的舔舐，爱怜地搂住落空的右边脑袋，将地狱犬探出的舌头含进嘴里交缠`,
        );
        await era.printAndWait(`「嗯啧…好狗狗……舌头………和野兽接吻……♪」`);
        await era.printAndWait(`「不行了……好想要……这样已经不够了……！」`);
        await era.printAndWait(
          `和魔兽纠缠了一阵的${target_name}突然推开了地狱犬，走到一旁备好的垫子上躺下，抬起腰对着它将腿张成Ｍ字型`,
        );
        await era.printAndWait(`「乖狗狗，来吧……快来侵犯本宫吧……♪」`);
        await era.printAndWait(
          `早已按耐不住交配本性的地狱犬压上天使的身体，粗长的狗根顺利插入${target_name}泥泞不堪的处子穴中`,
        );
        await era.printAndWait(
          `「啊！哦～！小穴里……坚硬的肉棒插进来了哈…滚烫的…这就是本宫想象已久的野兽肉棒…♪」`,
        );
        await era.printAndWait(
          `脆弱的处女膜被粗暴地捅破穿过，三头地狱犬粗暴抽插的动作带出混着猩红处子血的爱液`,
        );
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了破处的痛苦，天使摇摆着腰肢，配合着魔兽的动作开始追求起交配的乐趣来`,
        );
        await era.printAndWait(
          `「好棒…啊啊……交配太棒了♪被这样的野兽夺走处子之身…令人太满足了……♪」`,
        );
        await era.printAndWait(
          `双手搂紧地狱犬的脖子，${target_name}在魔兽兴奋的咆哮声中奋力迎合着，抬起头伸出小舌去勾缠地狱犬吐出的舌头`,
        );
        await era.printAndWait(
          `地狱犬的三个脑袋凑了过来，挨个和天使激吻着，同时猛然将阴茎插进最深处，咚咚叩击着子宫口`,
        );
        await era.printAndWait(
          `「啊啊啊…小穴被肉棒搅弄着……嗯咕……好舒服…再激烈点……本宫喜欢野兽的肉棒了～♪」`,
        );
        await era.printAndWait(`「和野兽交配什么的…咿呀～最棒了…♪」`);
        await era.printAndWait(`看来这场天使和魔兽的盛宴还会持续很久……`);
      } else {
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了地狱犬的犬舍中`,
        );
        await era.printAndWait(
          `在赶走周围的闲杂人等之后，${target_name}解开自己的衣服，赤裸着身子慢慢走到了地狱犬中间`,
        );
        await era.printAndWait(
          `被魔王所豢养的地狱犬们看起来高大又健硕，黑红色的皮毛被梳理得油光发亮，隆起的肌肉发达有力，一副被伺候的很好的样子`,
        );
        await era.printAndWait(`「呵呵，真是些强壮的好孩子。」`);
        await era.printAndWait(
          `地狱犬们显然对带着魔王气息的天使很是亲近，它们聚集在天使身边，时不时用脑袋蹭着天使的肌肤撒娇`,
        );
        await era.printAndWait(`「啊…野兽的气息……光是这样，本宫竟然就湿了。」`);
        await era.printAndWait(
          `雌性情动的气味让魔兽们躁动了起来，原本温顺的地狱犬们开始烦躁的走来走去，一声声壕叫在这片空地中回荡`,
        );
        await era.printAndWait(
          `这时一只地狱犬挤开了同伴来到了${target_name}身边，它仰起头看着天使，喉咙里溢出一声声低吼`,
        );
        await era.printAndWait(`「你要当第一个？好孩子，本宫答应了。」`);
        await era.printAndWait(
          `${target_name}笑着点了点头，伸手摸了摸地狱犬的脑袋，将它向小穴压去`,
        );
        await era.printAndWait(
          `嗅到气味的魔兽毫不客气的大口舔舐起小穴来，被快感侵袭的天使张开翅膀裹住身上的魔兽，顺着它的动作摆动着腰部`,
        );
        await era.printAndWait(
          `「啊啊…好宽大的舌头……往里面舔…再里面点……哈……」`,
        );
        await era.printAndWait(
          `「不行了……好想要…乖狗狗，来吧……快来侵犯本宫吧……♪」`,
        );
        await era.printAndWait(
          `不满足舔阴的${target_name}突然推开了地狱犬，走到一旁备好的垫子上躺下，抬起腰对着它将腿张成Ｍ字型`,
        );
        await era.printAndWait(
          `早已按耐不住交配本性的地狱犬压上天使的身体，狗根顺利插入${target_name}泥泞不堪的小穴中`,
        );
        await era.printAndWait(
          `「啊！哦～！小穴里……坚硬的肉棒插进来了～哈…滚烫的…快要融化了……♪」`,
        );
        await era.printAndWait(
          `双手搂紧地狱犬的脖子，${target_name}在野兽兴奋的咆哮声中奋力迎合着`,
        );
        await era.printAndWait(
          `「好狗狗……嗯啧…舌头………和野兽接吻好棒……啊啊…交配也好棒♪」`,
        );
        await era.printAndWait(
          `将地狱犬伸出的舌头含进嘴里交缠，${target_name}孜孜不倦的吮吸着滴落下来的唾液`,
        );
        await era.printAndWait(
          `快速抽插中的魔兽猛然将阴茎插进最深处，咚咚的叩击着子宫口`,
        );
        await era.printAndWait(
          `「啊啊啊…小穴被肉棒搅弄着……嗯啊……好舒服…再激烈点……本宫喜欢肉棒～♪」`,
        );
        await era.printAndWait(
          `「嗯…你们也想要本宫？哈啊……别急…马上就到你们了…和野兽交配什么的…最棒了…♪」`,
        );
        await era.printAndWait(`看来这场天使和魔兽的盛宴还会持续很久……`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了猪舍任其随意挑选心仪的初夜对象`,
        );
        await era.printAndWait(
          `${target_name}欣喜抚摸着种猪硕大的睾丸，挥手赶走了周围的闲杂人等`,
        );
        await era.printAndWait(
          `用于交配的种猪在${target_name}柔软小手的爱抚下逐渐勃起，是与其他野兽完全不同的螺旋状的阴茎`,
        );
        await era.printAndWait(`「啊~真可叫人难以抵抗~♪」`);
        await era.printAndWait(
          `起身解开自己的衣服，赤裸着身体的天使先是温柔地亲吻了一下种猪的嘴唇，随即又迫不及待地用小舌挑逗起来`,
        );
        await era.printAndWait(
          `兴奋起来的种猪侵犯着${target_name}的口腔，一天使一兽激烈地相互缠绕舌头，房间里回响咕啾咕啾的下流水声`,
        );
        await era.printAndWait(`「啊……好粗鲁啊❤再多吻我一下~♪」`);
        await era.printAndWait(
          `顺势在早已准备好的架子上躺下，${target_name}紧紧搂住种猪的脖子，仿佛情人相拥般地深吻着`,
        );
        await era.printAndWait(
          `${target_name}边接吻边用身体摩擦来获取快感，只是这终究还是满足不了这个淫乱的天使`,
        );
        await era.printAndWait(
          `轻轻推开种猪的头，${target_name}主动打开双腿露出泥泞不堪的处子小穴，笑着发出了邀请`,
        );
        await era.printAndWait(`「来吧，小胖猪~这可是处子的小穴呢~♪」`);
        await era.printAndWait(
          `种猪气喘吁吁地压在天使身上，螺旋状的阴茎摩擦小穴做着准备，${target_name}立刻缠住了种猪的腰帮助固定`,
        );
        await era.printAndWait(`「要进来了……❤公猪的……咿！」`);
        await era.printAndWait(
          `种猪迫不及待地压下身体，造型奇特的细长阴茎突破处女膜，直直亲吻着子宫口`,
        );
        await era.printAndWait(
          `「哈啊…猪的肉棒……滑溜溜的…啊啊~♪开始动起来了~❤」`,
        );
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了破处的痛苦，天使摇摆着腰肢，配合着野兽的动作开始追求起交配的乐趣来`,
        );
        await era.printAndWait(
          `种猪哼着鼻子激烈地撞击${target_name}的小穴，混合着处子血的爱液四处飞溅`,
        );
        await era.printAndWait(`「好快…已经什么也思考不了了…♪」`);
        await era.printAndWait(`「啊啊啊…哈啊……小穴被搅弄着~♪」`);
        await era.printAndWait(
          `螺旋状的阴茎在撞击中顺利插入子宫，种猪低下头伸出舌舔着${target_name}的唇`,
        );
        await era.printAndWait(
          `「要射精了吗~？可以哦，让本宫为你怀孕也不错呢❤」`,
        );
        await era.printAndWait(
          `${target_name}顺从地张开嘴，撒娇似地探出小舌来回缠绕舔弄着种猪的舌头`,
        );
        await era.printAndWait(
          `粘稠的野兽精液气势磅礴地灌入子宫，天使的小腹逐渐鼓胀起来`,
        );
        await era.printAndWait(
          `脸上满是痴迷的神情，${target_name}承受种猪持续不断的大量射精，完全沉浸在被授种的喜悦之中……`,
        );
      } else {
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了猪舍任其随意挑选交配对象`,
        );
        await era.printAndWait(
          `${target_name}欣喜抚摸着种猪硕大的睾丸，挥手赶走了周围的闲杂人等`,
        );
        await era.printAndWait(
          `用于交配的种猪在${target_name}柔软小手的爱抚下逐渐勃起，是与其他野兽完全不同的螺旋状的阴茎`,
        );
        await era.printAndWait(`「啊~真可叫人难以抵抗~♪」`);
        await era.printAndWait(
          `起身解开自己的衣服，赤裸着身体的天使先是温柔地亲吻了一下种猪的嘴唇，随即又迫不及待地用小舌挑逗起来`,
        );
        await era.printAndWait(
          `兴奋起来的种猪侵犯着${target_name}的口腔，一天使一兽激烈地相互缠绕舌头，房间里回响咕啾咕啾的下流水声`,
        );
        await era.printAndWait(`「啊……好粗鲁啊❤再多吻我一下~♪」`);
        await era.printAndWait(
          `顺势在早已准备好的架子上躺下，${target_name}紧紧搂住种猪的脖子，仿佛情人相拥般地深吻着`,
        );
        await era.printAndWait(
          `${target_name}边接吻边用身体摩擦来获取快感，只是这终究还是满足不了这个淫乱的天使`,
        );
        await era.printAndWait(
          `轻轻推开种猪的头，${target_name}主动打开双腿露出泥泞不堪的小穴，笑着发出了邀请`,
        );
        await era.printAndWait(`「来吧，小胖猪~这可是天使的小穴呢~♪」`);
        await era.printAndWait(
          `种猪气喘吁吁地压在天使身上，螺旋状的阴茎摩擦小穴做着准备，${target_name}缠住了种猪的腰帮助固定`,
        );
        await era.printAndWait(`「要进来了……❤公猪的……咿！」`);
        await era.printAndWait(
          `种猪迫不及待地压下身体，造型奇特的细长阴茎在小穴中横冲直撞，时不时亲吻着子宫口`,
        );
        await era.printAndWait(
          `「哈啊…猪的肉棒……滑溜溜的…啊啊~♪开始动起来了~❤」`,
        );
        await era.printAndWait(
          `天使摇摆着腰肢，配合野兽的动作贪求着交配的乐趣`,
        );
        await era.printAndWait(
          `种猪哼着鼻子激烈地撞击${target_name}的小穴，混着气泡的爱液被搅拌着四处飞溅`,
        );
        await era.printAndWait(`「好快…已经什么也思考不了了…♪」`);
        await era.printAndWait(`「啊啊啊…哈啊……小穴酥酥麻麻的~♪」`);
        await era.printAndWait(
          `螺旋状的阴茎在撞击中顺利插入子宫，种猪低下头伸出舌舔着${target_name}的唇`,
        );
        await era.printAndWait(
          `「要射精了吗~？可以哦，在本宫的子宫种下你的种子吧❤」`,
        );
        await era.printAndWait(
          `${target_name}顺从地张开嘴，撒娇似地探出小舌来回缠绕舔弄着种猪的舌头`,
        );
        await era.printAndWait(
          `粘稠的野兽精液气势磅礴地灌入子宫，天使的小腹逐渐鼓胀起来`,
        );
        await era.printAndWait(
          `脸上满是痴迷的神情，${target_name}承受种猪持续不断的大量射精，完全沉浸在被授种的喜悦之中……`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了梦魇马群的领地，挑选最强壮的梦魇作为初夜对象`,
        );
        await era.printAndWait(
          `在仆人准备好支架之后，${target_name}便将所有人赶出了马厩，缓缓脱下了身上的衣服`,
        );
        await era.printAndWait(
          `${target_name}赤身裸体走到马王身边，摸了摸油光发亮的皮毛，然后就这么翻身骑了上去`,
        );
        await era.printAndWait(`「嗯~这结实健硕的肌肉……啊…真叫人难以抵抗~♪」`);
        await era.printAndWait(
          `${target_name}不安分地扭动身体，用小穴摩擦马背，留下一道道晶莹的水渍`,
        );
        await era.printAndWait(`「好舒服~哈啊…嗯……」`);
        await era.printAndWait(
          `${target_name}像是搂着亲爱的恋人一般用力抱紧梦魇马的脖颈，柔软双唇热情亲吻着魔兽的脖颈和鬃毛，忘情得在马背上追寻更多的快感`,
        );
        await era.printAndWait(
          `雌性发情的气味诱得梦魇马急躁不安起来，高声嘶鸣着来回踱步`,
        );
        await era.printAndWait(`「着急了？别急，马上就换你来骑~♪」`);
        await era.printAndWait(
          `${target_name}安抚着梦魇马，自马背上翻下，趴在支架上固定好身体，打开双腿露出湿漉漉的小穴`,
        );
        await era.printAndWait(`「这可是本宫的处子身哦~♪你可得……咿呀！」`);
        await era.printAndWait(
          `见雌性做好了交配准备，被性欲冲昏头脑的梦魇马迫不及待抬起前身压在${target_name}背上`,
        );
        await era.printAndWait(
          `马根气势如虹地贯穿小穴直冲子宫，${target_name}的小腹瞬间鼓起突显柱状物`,
        );
        await era.printAndWait(
          `「进来了……哈啊…马的肉棒……好大…啊啊~♪开始动起来了~❤」`,
        );
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了破处的痛苦，天使摇摆着腰肢，配合着魔兽的动作开始追求起交配的乐趣来`,
        );
        await era.printAndWait(`「好快…太棒了……已经什么也思考不了了~♪」`);
        await era.printAndWait(`「交尾❤和野兽交尾❤」`);
        await era.printAndWait(
          `梦魇马嘶鸣着加快了抽插，咚咚叩击着子宫口，每次进出都让${target_name}混合着处子血的爱液四处飞溅`,
        );
        await era.printAndWait(
          `粗大的马根直直插进子宫，魔兽的精液激烈冲击着最深处。${target_name}猛然张开翅膀，随着梦魇马的射精达到了高潮`,
        );
        await era.printAndWait(
          `「啊啊~♪野兽的种子灌进了子宫……♪哈…让本宫为你怀孕吧♪」`,
        );
      } else {
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了梦魇马群的领地`,
        );
        await era.printAndWait(
          `在仆人准备好支架之后，${target_name}便将所有人赶出了马厩，缓缓脱下了身上的衣服`,
        );
        await era.printAndWait(
          `${target_name}赤身裸体走到梦魇马身边，摸了摸油光发亮的皮毛，然后就这么翻身骑了上去`,
        );
        await era.printAndWait(`「嗯~这结实健硕的肌肉……啊…真叫人难以抵抗~♪」`);
        await era.printAndWait(
          `${target_name}不安分地扭动身体，用小穴摩擦马背，留下一道道晶莹的水渍`,
        );
        await era.printAndWait(`「好舒服~哈啊…嗯……」`);
        await era.printAndWait(
          `${target_name}像是搂着亲爱的恋人一般用力抱紧梦魇马的脖颈，柔软双唇热情亲吻着魔兽的脖颈和鬃毛，忘情得在马背上追寻更多的快感`,
        );
        await era.printAndWait(
          `雌性发情的气味诱得梦魇马急躁不安起来，高声嘶鸣着来回踱步`,
        );
        await era.printAndWait(`「着急了？别急，马上就换你来骑~♪」`);
        await era.printAndWait(
          `${target_name}安抚着梦魇马，自马背上翻下，趴在支架上固定好身体，打开双腿露出湿漉漉的小穴`,
        );
        await era.printAndWait(`「本宫的小穴已经准备好了~♪你可得……咿呀！」`);
        await era.printAndWait(
          `见雌性做好了交配准备，被性欲冲昏头脑的梦魇马迫不及待抬起前身压在${target_name}背上`,
        );
        await era.printAndWait(
          `马根气势如虹地贯穿小穴直冲子宫，${target_name}的小腹瞬间鼓起突显柱状物`,
        );
        await era.printAndWait(
          `「进来了……哈啊…马的肉棒……好大…啊啊~♪开始动起来了~❤」`,
        );
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了极限扩张的痛苦，天使摇摆着腰肢，配合着魔兽的动作开始追求起交配的乐趣来`,
        );
        await era.printAndWait(`「好快…太棒了……已经什么也思考不了了~♪」`);
        await era.printAndWait(`「交尾❤和野兽交尾❤」`);
        await era.printAndWait(
          `梦魇马嘶鸣着加快了抽插，咚咚叩击着子宫口，每次进出都让${target_name}混合着大量气泡的爱液四处飞溅`,
        );
        await era.printAndWait(
          `粗大的马根直直插进子宫，魔兽的精液激烈冲击着最深处。${target_name}猛然张开翅膀，随着梦魇马的射精达到了高潮`,
        );
        await era.printAndWait(
          `「啊啊~♪野兽的种子灌进了子宫……♪哈…让本宫为你怀孕吧♪」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(`「嗯……魔王大人的……爱情之吻……」`);
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(
          `「啊！魔王大人……请～请继续侵犯本宫吧！～噢哦～…♪」`,
        );
      } else {
        await era.printAndWait(
          `「啊！魔王大人……请～请继续侵犯本宫吧！～噢哦～…♪」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait(`「精……精液什么的……呜……嘛……♪」`);
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      if (era0(`talent:${a}:0`) == 1) {
        await era.printAndWait(`「啊…第一次就这么结束了么…还想继续啊～♪」`);
      } else {
        await era.printAndWait(`「啊…结束了么…还想继续啊～♪」`);
      }
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait(
        `「嘻嘻～为了喝魔王大人的尿尿，本宫活着回来啦！～♪」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        await era.printAndWait(
          `「呵呵呵，童贞的感觉就是不一样呢～本宫的那里，舒服么？${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「呵呵呵，童贞的感觉就是不一样呢～本宫的菊穴，舒服么？${heart(1)}」`,
        );
      }
    }
  }
}

// @osioki_koujo_k903
async function osioki_koujo_k903(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  if (choice == 0) {
    await era.printAndWait(`「只……只是没看见人罢了！」`);
  } else if (choice == 1) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「哦…电击…还可以………强一点………～♪」`);
    } else {
      await era.printAndWait(`「啊！…停！停手啊啊啊啊！！」`);
    }
  } else if (choice == 2) {
    if (era0(`abl:${a}:17`) >= 4) {
      await era.printAndWait(`「再怎么说，当众自慰也有点……」`);
    } else {
      await era.printAndWait(
        `「哈啊……居然让本宫……当街……下次…………呜呜…………一定不会失败了啊啊啊啊！！」`,
      );
    }
  } else if (choice == 3) {
    if (era0(`abl:${a}:17`) >= 6) {
      await era.printAndWait(`「来！来看吧！……这种风景可不多见哟……！」`);
    } else {
      await era.printAndWait(`「呜呜…唔………呜呜呜」`);
    }
  } else if (choice == 4) {
    if (era0(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「啊！！魔王大人的鞭子！！最棒了！再……再用力！」`,
      );
    } else {
      await era.printAndWait(`「呜！……啊？！…………唔哦！！」`);
    }
  } else if (choice == 5) {
    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「果然还是魔王大人的尿味道更好啊………」`);
    } else {
      await era.printAndWait(`「这……这……好难受…」`);
    }
  } else if (choice == 6) {
    await era.printAndWait(`「唉……不想做这种事啊……」`);
  } else if (choice == 7) {
    await era.printAndWait(
      `「呜…本宫肚子饿了啦！……下次出击一定会好好干的啊！…」`,
    );
  } else if (choice == 8) {
    await era.printAndWait(
      `「噢～喔喔喔喔喔！求求你！魔王大人！对本宫…怎样都可以！！呜呜呜呜…………谁都好！什么东西都行！！…啊啊啊啊！！！」`,
    );
  } else if (choice == 9) {
    await era.printAndWait(`「………好」`);
  }
}

// @gobi_koujo_k903, ARG:0
function gobi_koujo_k903(arg0, rand = default_rand) {
  const rand_n = rand;
  if (arg0 == 1) {
    return `哦～♪`;
  } else if (arg0 == 2) {
    return `哦！`;
  } else if (arg0 == 3) {
    return `啦……。`;
  } else if (arg0 == 4) {
    return `吧……算是……。`;
  } else if (arg0 == 5) {
    return `什么的……。`;
  } else {
    if (rand_n(3) == 0) {
      return `呢。`;
    } else if (rand_n(2) == 0) {
      return `嘛。`;
    } else {
      return `啦。`;
    }
  }
}

ryouzyoku_kojo_family.register(903, dungeon_ryouzyoku_k903);
ryouzyoku_after_kojo_family.register(903, dungeon_ryouzyoku_after_k903);
benki_koujo_family.register(903, benki_koujo_k903);
dungeon_victory_family.register(903, dungeon_victory_k903);
dungeon_attack_family.register(903, dungeon_attack_k903);
ntr_koujo_family.register(903, ntr_koujo_k903);
exucution_koujo_family.register(903, exucution_koujo_k903);
museum_koujo_family.register(903, museum_koujo_k903);
banishment_koujo_family.register(903, banishment_koujo_k903);
public_exucution_koujo_family.register(903, public_exucution_koujo_k903);
grotesque_koujo_family.register(903, grotesque_koujo_k903);
enterenemy_koujo_family.register(903, enterenemy_koujo_k903);
gohoubi_request_koujo_family.register(903, () => gohoubi_request_koujo_k903());
gohoubi_after_koujo_family.register(903, (cid, choice) =>
  gohoubi_after_koujo_k903(undefined, cid, choice),
);
osioski_koujo_family.register(903, (cid, choice) =>
  osioki_koujo_k903(undefined, cid, choice),
);
gobi_koujo_family.register(903, gobi_koujo_k903);

kojo_message_com_family.register(903, kojo_message_com_903);
kojo_message_palamcng_family.register(903, kojo_message_palamcng_903);
kojo_message_markcng_family.register(903, kojo_message_markcng_903);
self_kojo_family.register(903, self_kojo_k903);

module.exports = {
  k903_kojo2,
  kojo_message_com_903,
  dog_kojo_903,
  colosseum_kojo_903,
  kojo_message_palamcng_903,
  kojo_message_markcng_903,
  self_kojo_k903,
  dungeon_ryouzyoku_k903,
  dungeon_ryouzyoku_after_k903,
  benki_koujo_k903,
  dungeon_victory_k903,
  dungeon_attack_k903,
  ntr_koujo_k903,
  exucution_koujo_k903,
  museum_koujo_k903,
  banishment_koujo_k903,
  public_exucution_koujo_k903,
  grotesque_koujo_k903,
  enterenemy_koujo_k903,
  gohoubi_request_koujo_k903,
  gohoubi_after_koujo_k903,
  osioki_koujo_k903,
  gobi_koujo_k903,
};
