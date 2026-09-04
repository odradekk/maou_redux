/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unreachable */
/**
 * 嘉德（K903）口上。
 * 源: target/ERB/口上/EVENT_K903_嘉德.ERB
 * 范围: :59-6030
 *
 * EX_TALENT:103 经 GET_EX_KOJO_NUM 映成 LOCAL=1003，分发键为 903。
 * 源中不可达段、错读计数器与空模板均按原样保留。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { PALAMLV } = require('#/era-utils/palam-level');
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
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const { peek_aftertrain_q } = require('#/event/event-aftertrain');

const STUBBED_CALLS = ['SELL_MATURO_K0'];
const default_rand = (n) => Math.floor(Math.random() * n);
// Emuera 数值变量未声明时为 0；EraElectron 原始 API 返回 undefined（#13）。
const era0 = (key) => era.get(key) || 0;

// @EVENTTRAIN #PRI（:59-63）：设置嘉德口上存在标志。
on(
  'EVENTTRAIN',
  () => {
    era_exflag.kojo_gade_session = 1; // :61 EX_FLAG:103 = 嘉德口上存在标志
    if (game.kojo.口上开关 == 0) {
      game.kojo.口上开关 = 2; // :62-63
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
    // :74-75
    return 0; // :74-75
  } // :74-75
  if (era0(`ex_talent:${target}:103`) != 1) {
    // :76-77
    return 0; // :76-77
  } // :76-77

  if (kojo.初调教 == 0) {
    // :82
    era.drawLine(); // :83-84
    await era.printAndWait(`第一次调教${target_name}的时候，其实你有点害怕。`); // :84
    await era.printAndWait(
      `虽说她是被进贡上来的，但当初费了好大的力气，才把她的战斗力封印了起来。`,
    ); // :85
    await era.printAndWait(`强大的魔力流动反噬过来，差点造成魔力大爆炸。`); // :86
    await era.printAndWait(
      `最后虽然成功将魔力压住，但却把几个协作的初级封印师都震死了。`,
    ); // :87
    await era.printAndWait(`这力量，这身体，如果能为我所用的话…………`); // :88
    await era.printAndWait(`你这么想着，不禁细细地打量着${target_name}。`); // :89
    await era.printAndWait(
      `粉红色的艳丽头发，也无法彻底遮住她的脸庞。她的容颜好像有魔力似的，牢牢锁住所有人的目光。`,
    ); // :90
    await era.printAndWait(
      `这等惊人的美貌，令全地下城的女孩都自惭形秽。果然是最顶尖的天使，光是这般外貌，凡人就不可能企及。`,
    ); // :91
    await era.printAndWait(`「哼…………」${target_name}见到你，把头别过一边。`); // :92
    await era.printAndWait(
      `身边的封印师个个如临大敌，生怕她做出什么不利于你的举动。`,
    ); // :93
    await era.printAndWait(
      `你深呼吸了一口气，将一大群严阵以待的封印师和侍卫都赶出调教室了。`,
    ); // :94
    await era.printAndWait(`来吧！！哪怕是神！我也要把你操翻！！`); // :95
    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :96
    kojo.初调教 = 1; // :96
    return 1; // :96-97
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    // :101
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :102
      era.drawLine(); // :103-104
      await era.printAndWait(
        `将看了那水晶球的事告诉了${target_name}之后，她反而向你生气。`,
      ); // :104
      await era.printAndWait(
        `「………明明你也和别的女孩子，做了这么多羞羞的事！！」`,
      ); // :105
      await era.printAndWait(
        `「……是的！本宫就是想尝尝别人的滋味！怎么样？如果你当初能好好保护本宫的话！本宫也不会……不会被…………呜呜……」`,
      ); // :106
      await era.printAndWait(
        `${target_name}眼眶湿润了。因为情绪激动，魔力又不受控制地激荡出来了…………`,
      ); // :107
      await era.printAndWait(
        `强大的魔力漩涡震得整个地下城犹如地震，你连忙对她又亲又哄，平复了她的情绪和魔力。`,
      ); // :108

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :110
      kojo.NTR再捕获 = 0; // :110
    } else {
      // :110-111
      era.drawLine(); // :112-113
      await era.printAndWait(
        `「你原来是人类……狂王原来也是人类…………」${target_name}叹气道……`,
      ); // :113
      await era.printAndWait(`「本宫居然被两个人类当猴耍……」她忿忿不平道。`); // :114

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :116
      kojo.NTR再捕获 = 0; // :116
    } // :116-117
    return 1; // :118-119
  } else if (chara(target).kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
    // :123
    era.drawLine(); // :124-125
    await era.printAndWait(`「哼……才不会对你屈服呢！」`); // :125
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :126
    kojo.初调教 = 2; // :126
    return 1; // :126-127
  } else if (chara(target).kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
    // :130
    era.drawLine(); // :131-132
    await era.printAndWait(`「本宫才不会佩服强者！因为本宫自己就是强者！」`); // :132
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :133
    kojo.初调教 = 3; // :133
    return 1; // :133-134
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :137
    era.drawLine(); // :138-139
    await era.printAndWait(
      `「这可不是对你屈服！只是觉得偶尔听你的也不错罢了～！」`,
    ); // :139
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :140
    kojo.初调教 = 4; // :140
    return 1; // :140-141
  } else if (
    chara(target).kojo.初调教 < 5 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :144
    era.drawLine(); // :145-146
    await era.printAndWait(`${target_name}最近总是露出诡异的笑容，`); // :146
    await era.printAndWait(
      `浑身上下散发着一种令人血脉贲张的气质，一颦一笑，比最高级的魅魔更诱人。`,
    ); // :147
    await era.printAndWait(
      `只见她花枝招展地走过来，把嘴凑到${master_name}耳边，`,
    ); // :148
    await era.printAndWait(`吐气如兰地轻轻道：「猜猜本宫昨晚梦到什么？」`); // :149
    await era.printAndWait(
      `在否定了你的几个答案后，她用香舌轻舔着嘴唇说：「你今晚过来不就知道了？」`,
    ); // :150
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :151
    kojo.初调教 = 5; // :151
    return 1; // :151-152
  } else if (
    chara(target).kojo.初调教 < 6 &&
    era0(`talent:${target}:85`) == 1
  ) {
    // :155
    era.drawLine(); // :156-157
    await era.printAndWait(
      `${master_name}发现${target_name}正双手捧着脸，痴痴地看着自己。`,
    ); // :157
    await era.printAndWait(
      `「干……干嘛？」你被她那痴迷的眼神看得有点心中发毛。`,
    ); // :158
    await era.printAndWait(
      `${target_name}突然直视你的双眼，认真道：「${sc()}是魔王大人的东西！永远都是！！」`,
    ); // :159
    await era.printAndWait(
      `「呃……呃……好啊！」在得到你肯定的答复之后，${target_name}欢天喜地走了。`,
    ); // :160
    await era.printAndWait(
      `但在她消失在转弯处之后，你好像听到了一句轻飘飘的话，「魔王大人也是${sc()}的东西！永远都是！！」`,
    ); // :161
    // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :162
    kojo.初调教 = 6; // :162
    return 1; // :162-163
  } else if (era_flag.assi < 0) {
    // :166
    return k903_kojo2(); // :167
  } else {
    // :226-227
    return k903_kojo2(); // :227
  } // :227-228
});

// @K903_KOJO2 // :234
async function k903_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const rand_n = default_rand;
  if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    // :236
    era.drawLine(); // :237-238
    await era.printAndWait(`「之前的封印，真是便宜你了……」`); // :238
    await era.printAndWait(
      `${target_name}抬起双手想要聚起神力将出现在门前的你直接炸个粉碎。`,
    ); // :239
    await era.printAndWait(
      `无奈力量封印的存在 只能做出蓄力的姿势想要吓走知道自己强大力量的你。`,
    ); // :240
    await era.printAndWait(
      `你无视了她徒劳的反抗，走进了${target_name}的房间……`,
    ); // :241
    return 1; // :241-242
  } else if (era0(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    // :245
    era.drawLine(); // :246-247
    await era.printAndWait(`「别逗本宫笑了，就凭你是无法得到本宫的心的！」`); // :247
    await era.printAndWait(
      `「要不是有封印在，你已经被切成数千块作为生祭给那个老糊涂了的神了！」`,
    ); // :248
    await era.printAndWait(`躲闪着你靠近的身影，${target_name}如此威胁道……`); // :249
    return 1; // :249-250
  } else if (era0(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    // :253
    era.drawLine(); // :253-254

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      // :256

      await era.printAndWait(
        `「要……要不是有封印在，你……你已经被切成数千块作为生祭给那个老糊涂了的神了哦！」`,
      ); // :258
      await era.printAndWait(`「数……数万块！」`); // :259
    } else {
      // :260-261
      await era.printAndWait(
        `「你……你想对本宫干嘛？本宫可是下一任主神的哦，神可不会善罢甘休的哦！」`,
      ); // :261
    } // :261-262

    return 1; // :262-264
  } else if (era0(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    // :267
    era.drawLine(); // :267-268

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      // :270

      await era.printAndWait(
        `「本宫绝对不会这么简单就听你做这做那的，等……等本宫恢复了力量……」`,
      ); // :272
    } else if (era0(`talent:${target}:13`) || era0(`talent:${target}:14`)) {
      // :273

      await era.printAndWait(
        `${target_name}像是习惯了你的到来一样，没说什么多余的话就静静坐了下来。`,
      ); // :275
      await era.printAndWait(`只在你快要碰到她的时候小声嘟囔着：`); // :276
      await era.printAndWait(`「神是……不会善罢甘休的……」`); // :277
    } else {
      // :278-279
      await era.printAndWait(
        `${target_name}像是习惯了你的到来一样，没说什么多余的话就静静坐了下来。`,
      ); // :279
      await era.printAndWait(`只在你快要碰到她的时候喊道：`); // :280
      await era.printAndWait(`「神是不会善罢甘休的，要做什么的时候想清楚！」`); // :281
    } // :281-282

    return 1; // :282-284
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    // :287
    era.drawLine(); // :287-288

    if (
      era0(`talent:${target}:11`) ||
      era0(`talent:${target}:12`) ||
      era0(`talent:${target}:16`)
    ) {
      // :290

      await era.printAndWait(
        `「哼……你高兴就好……不要对本宫太过分，不然……不然…………」`,
      ); // :292
    } else {
      // :293-294
      await era.printAndWait(`「你……你高兴就好……不要对本宫太过分」`); // :294
    } // :294-295

    return 1; // :295-297
  } else if (era0(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    // :300
    era.drawLine(); // :301-302

    if (rand_n(3) == 0) {
      // :303
      await era.printAndWait(
        `「喂，你！你不是很喜欢玩人类那种下贱的游戏吗？」`,
      ); // :304
      await era.printAndWait(`「还在等什么呢！本宫可没那么多耐心哦！」`); // :305
    } else {
      // :306-307
      await era.printAndWait(`${target_name}见你来到门前，露出诡异的笑容，`); // :307
      await era.printAndWait(
        `浑身上下散发着一种令人血脉贲张的气质，一颦一笑，比最高级的魅魔更诱人。`,
      ); // :308
      await era.printAndWait(
        `${target_name}轻轻向你展示了一下自己的身体，你情不自禁地走上前去。`,
      ); // :309
      await era.printAndWait(
        `${target_name}在你耳边吐气如兰地轻轻道：「让本宫昨晚的梦变成现实吧！」`,
      ); // :310
      await era.printAndWait(`「…………？」`); // :311
      await era.printAndWait(`「…………生为女人最棒的美梦哦～♪」`); // :312
    } // :312-313

    if (era0(`talent:${target}:74`)) {
      // :316

      await era.printAndWait(
        `「没想到自己竟然会爱上这种事呢，自己把自己弄得奇怪什么的……♪」`,
      ); // :318
      await era.printAndWait(`「总之不要让本宫再等了啦！」`); // :319
    } else if (era0(`talent:${target}:74`)) {
      // :321

      await era.printAndWait(`「见到你……本宫敏感的小穴已经湿嗒嗒的了……♪」`); // :323
    } else if (era0(`talent:${target}:77`)) {
      // :325

      await era.printAndWait(
        `「…………本宫并不是喜欢什么的……但是屁股……那个……你能再继续……♪」`,
      ); // :327
      await era.printAndWait(`「……继续从后面进来吗？」`); // :328
      await era.printAndWait(`看来下了很大的决心后，${target_name}补充道。`); // :329
    } else if (era0(`talent:${target}:78`)) {
      // :331

      await era.printAndWait(`「本宫的乳头，已经完全勃起了啦……♪」`); // :333
    } // :333-335

    if (era0(`talent:${target}:83`)) {
      // :337

      await era.printAndWait(`「来吧，来这里躺好哦～♪」`); // :339
      await era.printAndWait(
        `「本宫啊，会让你～♪……体验到人～间～极～乐～的哟～♪」`,
      ); // :340
      await era.printAndWait(`「放心，不会吧你切成小块的哟♪」`); // :341
      await era.printAndWait(
        `${target_name}眼睛里闪烁着危险的光芒，你不禁开始仔细考虑来找${target_name}的这个决定……`,
      ); // :342
    } else if (era0(`talent:${target}:88`)) {
      // :343

      await era.printAndWait(
        `「没……没办法呢……本……本宫才不是喜欢魔……魔王大人的欺……欺凌……」`,
      ); // :345
      await era.printAndWait(
        `「那……那种难忘的感觉……」${target_name}在心里默默想着，无意识地摆出了给你任意玩弄的姿势……`,
      ); // :346
    } // :346-348

    if (era0(`talent:${target}:83`)) {
      // :350

      await era.printAndWait(
        `「那个，能早点去外面吗？本宫好闷的啊……在房间里不够刺激啦～」`,
      ); // :352
    } // :352-354

    if (era0(`talent:${target}:136`)) {
      // :356

      await era.printAndWait(`「什么时候，让本宫再见到小狗狗呢♪」`); // :358
      await era.printAndWait(
        `${target_name}的目光迷离，似乎已经陷入了某种回忆`,
      ); // :359
      await era.printAndWait(`「有点想它呢，本宫的…小野狗～♪」`); // :360
      await era.printAndWait(
        `「虽然本宫是要成为神的人，但是被那么坏心眼的小狗狗这样对待过了……」`,
      ); // :361
      await era.printAndWait(`「没有办法呢，只能好好和它玩了～♪」`); // :362
      await era.printAndWait(
        `仿佛是为了说服自己似的，${target_name}小声嘟囔着`,
      ); // :363
      await era.printAndWait(`「啊……真的开始想它了♪」`); // :364
      await era.printAndWait(
        `${target_name}微微舒展背后羽翼，带着撒娇的口气说着`,
      ); // :365
      await era.printAndWait(`「今天能带它来见本宫吗？好想它可爱的模样啊～♪」`); // :366
      await era.printAndWait(
        `……天使那带着笑意的模样，让你不禁羡慕起那只野狗来`,
      ); // :367
    } // :367-369

    if (era0(`talent:${target}:204`)) {
      // :371

      await era.printAndWait(
        `「肉……肉便器什么的……随你喜欢就叫吧……能让本宫开心……嗯……开心就好了啊～」`,
      ); // :373
    } // :373-375

    return 1; // :375-377
  } else if (era0(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    // :380
    era.drawLine(); // :381-382

    if (rand_n(3) == 0) {
      // :383
      await era.printAndWait(
        `你进屋的时候，${target_name}正在梳着她亮丽的粉色头发。`,
      ); // :384
      await era.printAndWait(`「哦，你来了啊。」`); // :385
      await era.printAndWait(`「魔～王～大～人～……这么叫你还喜欢吗？」`); // :386
      await era.printAndWait(`「喜欢的话，那就不许再让别人叫了哦～！」`); // :387
      await era.printAndWait(
        `看着她笑咪咪的眼睛，不知为何你后背涌起一阵寒气……`,
      ); // :388
    } else if (rand_n(2) == 0) {
      // :389
      await era.printAndWait(
        `「嘛，本宫可是要成为神的人哦，虽然现在在这个不见天日的地下城，身体也被乱七八糟地搞过了……」`,
      ); // :390
      await era.printAndWait(`「但是没办法，喜欢上了魔王大人你嘛……」`); // :391
      await era.printAndWait(`「不知道带上魔王酱有没有两人成神的可行性……」`); // :392
      await era.printAndWait(`「如果祭品的能量足够的话…………」`); // :393
      await era.printAndWait(`「……那个魔法阵再修正一下…………」`); // :394
      await era.printAndWait(
        `${target_name}开始用你听不太清的声音嘟囔些什么了……`,
      ); // :395
      await era.printAndWait(`「要不要把这里的其他人都献祭掉呢？嘻嘻～」`); // :396
      await era.printAndWait(`只有这最后一句你听得清楚…………`); // :397
    } else {
      // :398-399
      await era.printAndWait(
        `「魔王大人♪本宫什么都准备好了哦，呐，呐，不要再离开了哦～♪」`,
      ); // :399
      await era.printAndWait(
        `她身上还有力量封印，应该做不了什么吧…？………你这样想着，小心翼翼地把她拥入怀中。`,
      ); // :400
    } // :400-401

    if (era0(`talent:${target}:74`)) {
      // :404

      await era.printAndWait(
        `「没想到自己竟然会爱上这种事呢，自己把自己弄得奇怪什么的……♪」`,
      ); // :406
    } else if (era0(`talent:${target}:74`)) {
      // :408

      await era.printAndWait(`「快来和本宫来一次灵肉交汇的爱爱吧！♪」`); // :410
    } else if (era0(`talent:${target}:77`)) {
      // :412

      await era.printAndWait(
        `「本宫后面的小穴，那个……已经想你想得……有点发疼了……♪」`,
      ); // :414
    } else if (era0(`talent:${target}:78`)) {
      // :416

      await era.printAndWait(`「本宫的胸部，很棒对吧……♪」`); // :418
    } // :418-420

    if (era0(`talent:${target}:83`)) {
      // :422

      await era.printAndWait(`「来吧，来这里躺好哦～♪」`); // :424
      await era.printAndWait(
        `「本宫啊，会让魔王你～♪……体验到人间极~~~~乐的哟♪」`,
      ); // :425
      await era.printAndWait(`「放心，不会吧你切成小块的哟♪」`); // :426
      await era.printAndWait(
        `${target_name}眼睛里闪烁着危险的光芒，你不禁开始仔细考虑来找${target_name}的这个决定……`,
      ); // :427
    } else if (era0(`talent:${target}:88`)) {
      // :429

      await era.printAndWait(
        `「没……没办法呢，本，本宫才不是喜欢魔……魔王大人的欺……欺凌……」`,
      ); // :431
      await era.printAndWait(`「本宫喜欢的，是魔王大人本身啊……」`); // :432
      await era.printAndWait(
        `「但是，忘不掉那种愉快的感觉……」${target_name}在心里默默想着，无意识地摆出了给你任意玩弄的姿势。`,
      ); // :433
    } // :433-434

    if (era0(`talent:${target}:83`)) {
      // :436

      await era.printAndWait(`「今天会带本宫去哪里玩么……？」`); // :438
    } // :438-440

    if (era0(`talent:${target}:136`)) {
      // :442

      await era.printAndWait(`「啊魔王大人，今天也能让本宫和小狗狗一起玩吗♪」`); // :444
      await era.printAndWait(`${target_name}面带微笑的看着你，眼中写满了期待`); // :445
      await era.printAndWait(`「好想它呢，本宫的…野狗丈夫～♪」`); // :446
      await era.printAndWait(`「哎？移情别恋？才不是呢……」`); // :447
      await era.printAndWait(`「只是…小狗狗有了和魔王大人一样的位置而已～♪」`); // :448
      await era.printAndWait(
        `仿佛是为了说服自己似的，${target_name}小声嘟囔着对于野狗的爱意`,
      ); // :449
      await era.printAndWait(`「神爱世人，都是本宫爱上的生物，不可以吃醋哦♪」`); // :450
      await era.printAndWait(
        `${target_name}微微舒展背后羽翼，带着撒娇的口气说着`,
      ); // :451
      await era.printAndWait(`「今天能带它来见本宫吗？好想它撒娇的模样啊～♪」`); // :452
    } // :452-454

    return 1; // :454-456
  } // :455-457
  return 0; // :455-458
}

// @EVENTEND（:464-531）：调教结束口上。
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target);

  if (game.kojo.口上开关 <= 0) {
    // :465-466
    return 0; // :465-466
  } // :465-466
  if (era0(`ex_talent:${target}:103`) != 1) {
    // :467-468
    return 0; // :467-468
  } // :467-468

  if (era0(`base:${target}:0`) <= 0) {
    // SIF 只约束下一条 PRINTFORMW。
    await era.printAndWait(`「明明……明明……马上就要取代那个老糊涂的……」`); // :472
  }
  await era.printAndWait(`「啊……可恶……已经………………」`); // :473-474
  return 0; // :472-474

  if (era0(`mark:${target}:3`) == 3 && era0(`talent:${target}:85`) == 0) {
    // :480
    era.drawLine(); // :481-482
    await era.printAndWait(
      `「可恶！这样对待本宫，本宫定会将尔等渎神之人千刀万剐，生祭于神前！」`,
    ); // :482
    return 1; // :482-483
  } else if (
    era0(`mark:${target}:2`) <= 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :486
    era.drawLine(); // :487-488
    await era.printAndWait(
      `「哈哈……就这，这种程度……离让本宫高兴还远着呢，凡间蛆虫！」`,
    ); // :488
    return 1; // :488-489
  } else if (
    era0(`mark:${target}:2`) == 2 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :492
    era.drawLine(); // :493-494
    await era.printAndWait(
      `「哼，对本宫做这种事，就能满足你那自卑的心么？真可怜……」`,
    ); // :494
    return 1; // :494-495
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :498
    era.drawLine(); // :499-500
    await era.printAndWait(
      `「呵……呵啊……本宫……本宫还没有允许你这凡人擅自离开呢……」`,
    ); // :500
    return 1; // :500-501
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // :504
    era.drawLine(); // :505-506
    await era.printAndWait(`「这就不行啦？喂喂～来继续做舒服的事嘛～♪」`); // :506
    await era.printAndWait(`${target_name}意犹未尽地抱着你的身子摩擦着。`); // :507
    return 1; // :507-508
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // :510
    era.drawLine(); // :511-512
    await era.printAndWait(
      `「你，你真是个有趣的家伙呢……本宫今……今天可能有点累了……但是还没……没到极限哦～♪」`,
    ); // :512
    return 1; // :512-513
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // :516
    era.drawLine(); // :517-518
    await era.printAndWait(
      `「魔王大人，明天，还会来的对吧？不会去其他人那里的吧～？」`,
    ); // :518
    return 1; // :518-519
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // :521
    era.drawLine(); // :522-523
    await era.printAndWait(`「啊～好…………就这样……就这样……一起上天堂吧！！～」`); // :523
    return 1; // :523-524
  } // :523-525
  return 0; // :526-528
});

// @KOJO_MESSAGE_COM_903 // :532
async function kojo_message_com_903(rand = default_rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const rand_n = rand;
  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    // :537-538
    return 0; // :537-538
  } // :537-538

  if (game.train.失神) {
    // :540-541
    return 0; // :540-541
  } // :540-541

  if (era0(`tequip:${target}:89`)) {
    // :543
    await dog_kojo_903(rand); // :544
    return 0; // :544-545
  } // :546-547

  if (era0(`tequip:${target}:90`)) {
    // :548-549
    return 0; // :548-549
  } // :548-549

  if (era0(`tequip:${target}:55`)) {
    // :551
    await colosseum_kojo_903(rand); // :552
    return 0; // :552-553
  } // :552-554

  if (era_flag.selectcom == 0) {
    // :562

    if (chara(target).kojo.爱抚 == 0) {
      // :564

      if (era0(`mark:${target}:2`) >= 2) {
        // :566
        await era.printAndWait(
          `「只……只是轻轻摸一下的话……本宫啊……并……并没有期待什么！」`,
        ); // :567
      } else {
        // :569-570
        await era.printAndWait(
          `「不要拿你凡间蛆虫的脏手碰本宫，当真不怕降下神罚吗！」她激烈地抵抗着你的双手。`,
        ); // :570
      } // :570-571
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :572
      chara(target).kojo.爱抚 = 1; // :572
      return 0; // :572-573
    } else {
      // :575-576

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :577
        await era.printAndWait(
          `「只……只是被你简单地碰到就～啊～再努力一点啊，怎么可能这么简单就满足本宫呢～～」`,
        ); // :578
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :579
        chara(target).kojo.爱抚 = 6; // :579
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :581
        await era.printAndWait(
          `「魔王大人的手法……只是碰到……本宫，就……啊！……噢～啊啊！……有，有感觉了～～…」`,
        ); // :582
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :583
        chara(target).kojo.爱抚 = 5; // :583
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :585
        await era.printAndWait(`「嘛……只是稍微碰一碰的话……」`); // :586
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :587
        chara(target).kojo.爱抚 = 4; // :587
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :589
        await era.printAndWait(
          `「果然，果然还是算了！……你…你的脏手还是拿开吧…本宫……本宫会…」`,
        ); // :590
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :591
        chara(target).kojo.爱抚 = 3; // :591
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :593
        await era.printAndWait(
          `「不要再拿你的脏手碰本宫了，当真不怕降下神罚吗！」她努力抵抗着你的双手。`,
        ); // :594
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :595
        chara(target).kojo.爱抚 = 2; // :595
      } // :595-596
      return 0; // :595-597
    } // :595-598
  } // :599-602

  if (era_flag.selectcom == 1) {
    // :604

    if (chara(target).kojo.舔阴 == 0) {
      // :606

      if (era0(`talent:${target}:0`) == 1) {
        // :608
        await era.printAndWait(
          `「停下！！快住手！！重……重要的地方被……啊啊啊……湿湿的……好难受…………」`,
        ); // :609
      } else {
        // :611-612
        await era.printAndWait(`「那，那样的地方都舔！这个……大变态！」`); // :612
      } // :612-613
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :614
      chara(target).kojo.舔阴 = 1; // :614
      return 0; // :614-615
    } else {
      // :617-618

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :619
        await era.printAndWait(
          `「啊啊啊啊！好～好啊～♪继续啊……本宫还没允许你停下呢！再用力地吸～………唔喔，爱液要出来了～！！…」`,
        ); // :620
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :621
        chara(target).kojo.舔阴 = 5; // :621
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :623
        await era.printAndWait(
          `「才……才没有喜欢什么的……魔王大人这样弄的话……总觉得好害羞啊……啊～啊啊」`,
        ); // :624
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :625
        chara(target).kojo.舔阴 = 4; // :625
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :627
        await era.printAndWait(`「随，随你喜欢弄了！…呃～啊啊啊啊啊！」`); // :628
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :629
        chara(target).kojo.舔阴 = 3; // :629
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :631
        await era.printAndWait(`「果然你们这些下界的人…………真恶心…………」`); // :632
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :633
        chara(target).kojo.舔阴 = 2; // :633
      } // :633-634
      return 0; // :633-635
    } // :633-636
  } // :637-640

  if (era_flag.selectcom == 2) {
    // :642

    if (chara(target).kojo.肛门爱抚 == 0) {
      // :644
      await era.printAndWait(`「屁……屁股？居然要对本宫的那种地方下手么！？」`); // :645
      await era.printAndWait(`「等……等一下……啊！……啊啊啊！！！……」`); // :646
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :647
      chara(target).kojo.肛门爱抚 = 1; // :647
      return 0; // :647-648
    } else {
      // :650-651
      const p =
        (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // :651 P = PALAM:3 + UP:3

      if (
        era0(`talent:${target}:76`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :653
        await era.printAndWait(
          `「意外地喜欢本宫的后面呢……嘛，本宫也被你弄得很舒……舒服呢……」`,
        ); // :654
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :655
        chara(target).kojo.肛门爱抚 = 7; // :655
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :657
        await era.printAndWait(
          `「意外地喜欢本宫的后面啊……不过这样子本宫不是很舒服呢，你这变态稍微考虑些办法，让本宫别这么痛好吗！」`,
        ); // :658
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :659
        chara(target).kojo.肛门爱抚 = 6; // :659
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :661
        await era.printAndWait(
          `「居然从后面……唔……本……本宫啊……并不是……啊……啊啊啊～」`,
        ); // :662
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :663
        chara(target).kojo.肛门爱抚 = 5; // :663
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :665
        await era.printAndWait(`「啊呜～！再把本宫弄湿一些………有点痛呢………」`); // :666
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :667
        chara(target).kojo.肛门爱抚 = 4; // :667
      } else if (
        p >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :669
        await era.printAndWait(
          `「不，不行了！！……屁股……本宫的屁股……屁股居然…这么有感觉……你这个变…变态呢…」`,
        ); // :670
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :671
        chara(target).kojo.肛门爱抚 = 3; // :671
      } else if (
        chara(target).kojo.首次耻情Lv2 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :673
        await era.printAndWait(
          `「从后面玩弄本宫什么的……绝对不可原谅啊……啊啊……住手啊，本宫叫你住手啊！」`,
        ); // :674
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :675
        chara(target).kojo.肛门爱抚 = 2; // :675
      } // :675-676
      return 0; // :675-677
    } // :675-678
  } // :679-682

  if (era_flag.selectcom == 3) {
    // :684

    if (chara(target).kojo.自慰 == 0) {
      // :686
      await era.printAndWait(`「什么？让本宫在你面前……自……自……」`); // :687
      await era.printAndWait(
        `${target_name}意识到你命令的含义，脸瞬间红了起来。`,
      ); // :688
      await era.printAndWait(
        `「让女孩子在别人面前做这种事……你真的是……恶魔呢……」`,
      ); // :689
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :690
      chara(target).kojo.自慰 = 1; // :690
      return 0; // :690-691
    } else {
      // :693-694

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :695
        await era.printAndWait(
          `「一直看本宫自己玩有什么意思，魔王大人你也一起……一起……嗯……来嘛～」`,
        ); // :696
        await era.printAndWait(
          `「那个……本宫的小穴还没有用过……你不想试试吗？」`,
        ); // :697
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :698
        chara(target).kojo.自慰 = 9; // :698
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :700

        if (rand_n(3) == 0) {
          // :702
          await era.printAndWait(
            `「嗯……嗯…………!!!好……好舒服……停不下来了啊啊啊啊啊啊！！」`,
          ); // :703
        } else if (rand_n(2) == 0) {
          // :704
          await era.printAndWait(`「唔……噢噢……啊！……哈……哈……」`); // :705
        } else {
          // :706-707
          await era.printAndWait(
            `「唔……噢噢……本宫…以前可从来不会这样子…呃呃呃呃！！！！」`,
          ); // :707
        } // :707-708
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :709
        chara(target).kojo.自慰 = 8; // :709
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :711

        if (rand_n(2) == 0) {
          // :713
          await era.printAndWait(
            `「那个……虽然本宫自己也能体会极乐，但是果然还是和魔王一起…………」`,
          ); // :714
        } else {
          // :715-716
          await era.printAndWait(`「你也不要干看着啦！一起玩哦！」`); // :716
          await era.printAndWait(`${target_name}更加向你靠近了一些。`); // :717
        } // :717-718
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :719
        chara(target).kojo.自慰 = 7; // :719
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :721
        await era.printAndWait(
          `「要看着魔王大人来自慰？……虽然不是不可以啦，但是总感觉…好害羞啊……」`,
        ); // :722
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :723
        chara(target).kojo.自慰 = 6; // :723
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :725

        if (rand_n(3) == 0) {
          // :727
          await era.printAndWait(
            `「魔王大人！魔王大人！！魔王大人喔～！！！啊啊啊啊啊啊！！」`,
          ); // :728
        } else if (rand_n(2) == 0) {
          // :729
          await era.printAndWait(
            `「停不下来！手自己动了……身体不受控制～……啊啊啊啊啊！」`,
          ); // :730
        } else {
          // :731-732
          await era.printAndWait(
            `「啊！魔王大人！你要对本宫负责啊！！本宫以前不是这样子的～！！」`,
          ); // :732
        } // :732-733
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :734
        chara(target).kojo.自慰 = 5; // :734
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :736

        if (rand_n(2) == 0) {
          // :738
          await era.printAndWait(`「…魔王大人，难道，讨厌和本宫一起…吗…」`); // :739
        } else {
          // :740-741
          await era.printAndWait(`「为什么…魔王大人不自己来碰人家呢………」`); // :741
        } // :741-742
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :743
        chara(target).kojo.自慰 = 4; // :743
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (chara(target).kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :745

        if (rand_n(2) == 0) {
          // :747
          await era.printAndWait(
            `「欸？又是自慰么…真是不明白，为什么你会喜欢看本宫自慰，真是，变态呢」`,
          ); // :748
          await era.printAndWait(
            `${target_name}别过红着的脸，默默开始自慰了。`,
          ); // :749
        } else {
          // :750-751
          await era.printAndWait(`（本宫怎么…变成这样………）`); // :751
        } // :751-752
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :753
        chara(target).kojo.自慰 = 3; // :753
      } else if (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :755

        if (rand_n(2) == 0) {
          // :757
          await era.printAndWait(
            `「你这变态魔王！这种事让本宫做一次也就够了吧！！真是……羞死人了啊啊啊啊啊啊！」`,
          ); // :758
        } else {
          // :759-760
          await era.printAndWait(
            `「看……看够了没有……够了就快点从本宫身边滚开啊…………」`,
          ); // :760
        } // :760-761
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :762
        chara(target).kojo.自慰 = 2; // :762
      } // :762-763
      return 0; // :762-764
    } // :762-765
  } // :766-769

  if (era_flag.selectcom == 5) {
    // :772

    if (chara(target).kojo.胸爱抚 == 0) {
      // :774

      if (era0(`talent:${target}:85`) == 1) {
        // :776
        await era.printAndWait(
          `「本宫的胸部什么的……魔王大人你……喜欢吗？那个……让你稍微……稍微弄一下也不是不可以呢」`,
        ); // :777
      } else {
        // :779-780
        await era.printAndWait(
          `「哈？看来又是一个看着本宫胸部入迷的变态呢。可！以！请！你！把！你！的！脏！手！拿！开！么！」`,
        ); // :780
        await era.printAndWait(
          `${target_name}用很可怕的眼神盯着你一字一字地“请”你停手。`,
        ); // :781
        await era.printAndWait(`大概是之前有过什么不好的经验吧……`); // :782
        await era.printAndWait(`当然，你肯定是不会收手的咯……`); // :783
      } // :783-784
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :785
      chara(target).kojo.胸爱抚 = 1; // :785
      return 0; // :785-786
    } else {
      // :788-789

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :790
        await era.printAndWait(
          `「哈……本宫的胸部都要融化了……嘛你可以再刺激一点点的哦…♪ 哦！嗯嗯嗯……」`,
        ); // :791
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :792
        chara(target).kojo.胸爱抚 = 5; // :792
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :794
        await era.printAndWait(
          `「魔王大人你这么喜欢本宫的胸部么～……嘻嘻～…………呃…………呃………………噢～………………」`,
        ); // :795
        await era.printAndWait(
          `${target_name}陶醉地闭上双眼，夸张地昂首挺胸，胸部不断起伏配合着你的手，发出了让人血脉偾张的可爱呻吟。`,
        ); // :796
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :797
        chara(target).kojo.胸爱抚 = 4; // :797
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :799
        await era.printAndWait(`「啊啊……胸部……有感觉了……？」`); // :800
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :801
        chara(target).kojo.胸爱抚 = 3; // :801
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :803
        await era.printAndWait(
          `「哼……哈！区区揉胸什么的，本宫怎么可能会有感觉的啦！」`,
        ); // :804
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :805
        chara(target).kojo.胸爱抚 = 2; // :805
      } // :805-806
      return 0; // :805-807
    } // :805-808
  } // :809-812

  if (era_flag.selectcom == 6) {
    // :814

    if (chara(target).kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :816

      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :818
        await era.printAndWait(
          `「这可是，本宫的初吻哦！魔王大人可千万要记好哦♪……亲亲～！」`,
        ); // :819
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :821
        await era.printAndWait(
          `「魔王大人啊……那个……本宫，${target_name}，下任主神的初吻给的是你，本宫啊，真是太幸福了……♪」`,
        ); // :822
      } else {
        // :824-825
        await era.printAndWait(
          `「呜…嗯…呜！！什！什么啊！本宫的初吻！竟然就这样被……」`,
        ); // :825
      } // :825-826
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :827
      chara(target).kojo.接吻 = 1; // :827
      return 0; // :827-828
    } else if (chara(target).kojo.接吻 == 0) {
      // :830

      if (era0(`talent:${target}:76`) == 1) {
        // :832
        await era.printAndWait(`「啊……要接吻吗？好啊～感觉上很浪漫呢～……♪」`); // :833
      } else if (era0(`talent:${target}:85`) == 1) {
        // :835
        await era.printAndWait(`「魔王大人……啊啊……kiss什么的相当喜欢哦！……♪」`); // :836
      } else {
        // :838-839
        await era.printAndWait(
          `「舔了本宫的嘴唇……也不会改变任何事，只会让对你的惩罚更大罢了！」`,
        ); // :839
      } // :839-840
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :841
      chara(target).kojo.接吻 = 1; // :841
      return 0; // :841-842
    } else {
      // :844-845

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :846
        await era.printAndWait(
          `「唔……唔唔……喔～……呼呼～不知道咬一下你的舌头你会是什么反应呢」`,
        ); // :847
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :848
        chara(target).kojo.接吻 = 5; // :848
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :850
        await era.printAndWait(`「啊～魔王大人的吻～……唔……唔唔～……喔～」`); // :851
        await era.printAndWait(
          `「小心，不要让本宫从你的嘴唇上尝出别人的味道哦～～」`,
        ); // :852
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :853
        chara(target).kojo.接吻 = 4; // :853
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :855
        await era.printAndWait(`「只，只是嘴唇的话，就可以……」`); // :856
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :857
        chara(target).kojo.接吻 = 3; // :857
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :859
        await era.printAndWait(
          `「哼！那么喜欢用接吻来假装本宫已经是你的所有物了吗！！」`,
        ); // :860
        await era.printAndWait(`「抱歉哦，那只是你猥琐的幻想罢了！！」`); // :861
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :862
        chara(target).kojo.接吻 = 2; // :862
      } // :862-863
      return 0; // :862-864
    } // :862-865
  } // :866-869

  if (era_flag.selectcom == 7) {
    // :871

    if (chara(target).kojo.自己扒开 == 0) {
      // :873

      if (era0(`talent:${target}:76`) == 1) {
        // :875
        await era.printAndWait(`「把那里扒开，所以呢？所以快点插进来啊～～」`); // :876
      } else if (era0(`talent:${target}:85`) == 1) {
        // :878
        await era.printAndWait(
          `「好……好害羞啊……而且……只，只想给你……一个人看……」`,
        ); // :879
      } else {
        // :881-882
        await era.printAndWait(
          `「居然让本宫做这……这么羞耻的事……呜……看够了没有啊，蛆虫！」`,
        ); // :882
      } // :882-883
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :884
      chara(target).kojo.自己扒开 = 1; // :884
      return 0; // :884-885
    } else {
      // :887-888

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :889
        await era.printAndWait(`「不要只是看看啦～～～所以快点插进来啊～～」`); // :890
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :891
        chara(target).kojo.胸爱抚 = 5; // :891
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :893
        await era.printAndWait(`「这，这……是只为你敞开的地方………」`); // :894
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :895
        chara(target).kojo.胸爱抚 = 4; // :895
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (chara(target).kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :897
        await era.printAndWait(
          `「啊……被看见了吗？……虽然好害羞啊…但是居然会有点开心呢…本宫，本宫变得奇怪了…………」`,
        ); // :898
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :899
        chara(target).kojo.胸爱抚 = 3; // :899
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :901
        await era.printAndWait(`「喜欢摆出这种样子的本宫么……你这变态……」`); // :902
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :903
        chara(target).kojo.胸爱抚 = 2; // :903
      } // :903-904
      return 0; // :903-905
    } // :903-906
  } // :907-910

  if (era_flag.selectcom == 8) {
    // :912

    if (chara(target).kojo.插入手指 == 0) {
      // :914

      if (era0(`talent:${target}:76`) == 1) {
        // :916
        await era.printAndWait(`「啊啊，魔王大人的手指！喔～伸进来了！！」`); // :917
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        // :919
        await era.printAndWait(`「啊……魔王大人的手指……噢哦～」`); // :920
      } else {
        // :922-923
        await era.printAndWait(
          `「等！等下！！！这种地方……怎么能把手指戳进来……啊!啊啊啊！快拔出去啊啊啊！」`,
        ); // :923
      } // :923-924
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :925
      chara(target).kojo.插入手指 = 1; // :925
      return 0; // :925-926
    } else {
      // :928-929

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :930
        await era.printAndWait(`「啊啊……再继续搅动啊～♪求你！」`); // :931
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :932
        chara(target).kojo.插入手指 = 5; // :932
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :934
        await era.printAndWait(`「好厉害～……魔王大人的手指……哦哦哦！♪」`); // :935
        await era.printAndWait(
          `${target_name}浑身发烫，双腿直抖，软倒在你的怀里。`,
        ); // :936
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :937
        chara(target).kojo.插入手指 = 4; // :937
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :939
        await era.printAndWait(
          `「啊啊……手指什么的……怎么可能会舒…舒服呢…嗯嗯啊♪」`,
        ); // :940
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :941
        chara(target).kojo.插入手指 = 3; // :941
      } else if (chara(target).kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        // :943
        await era.printAndWait(
          `「住手！这……讨厌的手指！你以为仅仅这样本宫就会妥协一点么！你也太小瞧本宫了！」`,
        ); // :944
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :945
        chara(target).kojo.插入手指 = 2; // :945
      } // :945-946
      return 0; // :945-947
    } // :945-948
  } // :949-952

  if (era_flag.selectcom == 9) {
    // :954

    if (chara(target).kojo.舔肛 == 0) {
      // :956

      if (era0(`talent:${target}:76`) == 1) {
        // :958
        await era.printAndWait(`「哦啊～黏糊糊的……好棒♪」`); // :959
      } else if (era0(`talent:${target}:85`) == 1) {
        // :961
        await era.printAndWait(
          `「不，不要嘛～舔那种地方…本，本宫不是很喜欢呢…！」`,
        ); // :962
      } else {
        // :964-965
        await era.printAndWait(
          `「你想干什么？不！！不要啊！！啊啊湿湿的！好难受……你这变态，居然舔那种地方…………本宫都有点钦佩了呢，你的变态程度……」`,
        ); // :965
      } // :965-966
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :967
      chara(target).kojo.舔肛 = 1; // :967
      return 0; // :967-968
    } else {
      // :970-971

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :972
        await era.printAndWait(
          `「唔哦！再拿舌头伸进去吧～魔王的舌头 很温柔呢♪」`,
        ); // :973
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :974
        chara(target).kojo.舔肛 = 5; // :974
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :976
        await era.printAndWait(`「被舔那里的话……受不了的……♪」`); // :977
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :978
        chara(target).kojo.舔肛 = 4; // :978
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :980
        await era.printAndWait(
          `「喜，喜欢的话……不，下次果然还是算了吧，好难为情……」`,
        ); // :981
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :982
        chara(target).kojo.舔肛 = 3; // :982
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :984
        await era.printAndWait(
          `「不要舔……奇怪的地方啦！你这变态！连本宫的屁股都要尝一尝！啊♪」`,
        ); // :985
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :986
        chara(target).kojo.舔肛 = 2; // :986
      } // :986-987
      return 0; // :986-988
    } // :986-989
  } // :986-990

  if (era_flag.selectcom == 10) {
    // :996

    if (chara(target).kojo.振动宝石 == 0) {
      // :998

      if (era0(`talent:${target}:76`) == 1) {
        // :1000
        await era.printAndWait(
          `「噢哦喔，这是什么啊……唔！啊啊啊！…本宫没见过的新玩具呢♪♪♪」`,
        ); // :1001
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        // :1003
        await era.printAndWait(
          `「欸？这个石头？本宫还没………啊啊啊………那里发…发麻了啦……噢啊♪」`,
        ); // :1004
      } else {
        // :1006-1007
        await era.printAndWait(
          `「等等，这是干什么的？……啊啊！……这石头怎么回事！……别这样！！」`,
        ); // :1007
      } // :1007-1008
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1009
      chara(target).kojo.振动宝石 = 1; // :1009
      return 0; // :1009-1010
    } else {
      // :1012-1013

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1014
        await era.printAndWait(
          `「啊啊喔～再用力按压……唔唔啊啊♪ 这玩具好棒呜呜呜…」`,
        ); // :1015
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1016
        chara(target).kojo.振动宝石 = 5; // :1016
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1018
        await era.printAndWait(
          `「被魔王大人的道具玩弄了……啊啊～♪ 有……有点舒服呢……」`,
        ); // :1019
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1020
        chara(target).kojo.振动宝石 = 4; // :1020
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1022
        await era.printAndWait(`「这样的小石子……呜呜……让本宫有感觉了……」`); // :1023
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1024
        chara(target).kojo.振动宝石 = 3; // :1024
      } else if (chara(target).kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        // :1026
        await era.printAndWait(
          `「快住手！不要把奇怪的东西……放到本宫身上来！！哈……哈啊…」`,
        ); // :1027
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1028
        chara(target).kojo.振动宝石 = 2; // :1028
      } // :1028-1029
      return 0; // :1028-1030
    } // :1028-1031
  } // :1032-1035

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    // :1038

    if (chara(target).kojo.壶虫 == 0) {
      // :1040

      if (era0(`talent:${target}:0`) == 1) {
        // :1042

        if (era0(`talent:${target}:76`) == 1) {
          // :1044
          await era.printAndWait(
            `「欸？这是什么？这个，怎么看都只是一条肥肥的虫子吧」`,
          ); // :1045
          await era.printAndWait(
            `「比起那个，魔王大人快来和本宫玩嘛，哦哦这个姿势，终于要用本宫的小穴了吗？」`,
          ); // :1046
          await era.printAndWait(`「欸？欸欸？啊！……啊啊啊！哈啊……哈啊……」`); // :1047
          await era.printAndWait(
            `「什么嘛竟然把那个虫……虫子放进去……哈啊……你就这么讨厌本宫的小穴吗？」`,
          ); // :1048
          await era.printAndWait(`「本来……还想让第一次……更盛大一点呢……」`); // :1049
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1051
          await era.printAndWait(
            `「欸？这是什么？这个，怎么看都只是一条肥肥的虫子吧」`,
          ); // :1052
          await era.printAndWait(
            `「比起那个，魔王大人……今天也相当精神呢，嗯？这个姿势，终于想，从本宫的那里……吗？」`,
          ); // :1053
          await era.printAndWait(`「欸？欸欸？啊！……啊啊啊！哈啊……哈啊……」`); // :1054
          await era.printAndWait(
            `「竟然……把那个虫……虫子放进去了……哈啊……痛……好痛啊……」`,
          ); // :1055
          await era.printAndWait(
            `「这种变态玩法……也亏魔王大人你想得出来呢……」`,
          ); // :1056
        } else {
          // :1058-1059
          await era.printAndWait(
            `「呃！！那个奇怪的恶心生物是什么……你……你这笨蛋！放开本宫！想干什么！」`,
          ); // :1059
          await era.printAndWait(`「啊……哈……啊啊啊啊啊！！！」`); // :1060
          await era.printAndWait(`「被下流的生物用……下流的生物……玷污了呢……」`); // :1061
        } // :1061-1062
      } else {
        // :1064-1065

        if (era0(`talent:${target}:76`) == 1) {
          // :1066
          await era.printAndWait(`「把这个放进小穴？可能是很有趣的玩法呢……」`); // :1067
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1069
          await era.printAndWait(`「令人讨厌的东西……真的要放进去吗……」`); // :1070
        } else {
          // :1072-1073
          await era.printAndWait(
            `「呃！！这个恶心的生物……不要啊！！不要拿过来！！！！」`,
          ); // :1073
        } // :1073-1074
      } // :1075-1076
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1076
      chara(target).kojo.壶虫 = 1; // :1076
      return 0; // :1076-1077
    } else {
      // :1079-1080

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1081
        await era.printAndWait(`「可以哟，本宫允许你把它放进来哟……♪」`); // :1082
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1083
        chara(target).kojo.壶虫 = 5; // :1083
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1085
        await era.printAndWait(
          `「哈……虽然不是很喜欢……但是魔王大人你喜欢就好了……呢……♪」`,
        ); // :1086
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1087
        chara(target).kojo.壶虫 = 4; // :1087
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1089
        await era.printAndWait(
          `「呃……来了……本宫居然被这么恶心的东西……弄出感觉……哈………」`,
        ); // :1090
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1091
        chara(target).kojo.壶虫 = 3; // :1091
      } else if (chara(target).kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1093
        await era.printAndWait(
          `「不要，不要啊！！……这么恶心的生物……别！！！……」`,
        ); // :1094
        await era.printAndWait(`「堂堂本宫…居然要被虫子…」`); // :1095
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1096
        chara(target).kojo.壶虫 = 2; // :1096
      } // :1096-1097
      return 0; // :1096-1098
    } // :1099-1100
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    // :1101

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1103
      await era.printAndWait(`「啊啊……被拿出来了啊……一直插着也没关系哟」`); // :1104
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1105
      chara(target).kojo.壶虫着脱 = 3; // :1105
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1107
      await era.printAndWait(`「呼～」`); // :1108
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1109
      chara(target).kojo.壶虫着脱 = 2; // :1109
    } else if (chara(target).kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1111
      await era.printAndWait(`「呼呼……终于……结束了」`); // :1112
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1113
      chara(target).kojo.壶虫着脱 = 1; // :1113
    } // :1113-1114
    return 0; // :1113-1115
  } // :1113-1116

  if (era_flag.selectcom == 12) {
    // :1121

    if (chara(target).kojo.振动杖 == 0) {
      // :1123

      if (era0(`talent:${target}:76`) == 1) {
        // :1125
        await era.printAndWait(
          `「嘻嘻……什么嘛这个小手杖？看来是个很有趣的玩具呢……」`,
        ); // :1126
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1128
        await era.printAndWait(
          `「咦？保健器具么？……肩膀是有些酸痛了。魔王大人，辛苦了呢……」`,
        ); // :1129
        await era.printAndWait(`「欸？不是拿来按摩的吗？！」`); // :1130
      } else {
        // :1132-1133
        await era.printAndWait(
          `「……这么大一根……不过只凭这个就想威慑本宫吗？呵呵呵呵呵哈哈哈哈哈哈！」`,
        ); // :1133
        await era.printAndWait(`「欸？唔唔唔唔？！！～」`); // :1134
      } // :1134-1135
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1136
      chara(target).kojo.振动杖 = 1; // :1136
      return 0; // :1136-1137
    } else {
      // :1139-1140

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1141
        await era.printAndWait(
          `「唔……哦！这个令人发麻的快感……呜……不行啦……啊啊！～♪」`,
        ); // :1142
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1143
        chara(target).kojo.振动杖 = 5; // :1143
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1145
        await era.printAndWait(`「啊啊啊……有，有，有感觉了……被这根杖……♪」`); // :1146
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1147
        chara(target).kojo.振动杖 = 4; // :1147
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1149
        await era.printAndWait(`「呜呜呜……这，这个……本宫…有点……哈啊啊啊…」`); // :1150
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1151
        chara(target).kojo.振动杖 = 3; // :1151
      } else if (chara(target).kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        // :1153
        await era.printAndWait(
          `「呃……呜……住手！……不要再弄啦！……啊！呜呜呜，怎么会，本宫怎么会被这种东西……弄得……」`,
        ); // :1154
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1155
        chara(target).kojo.振动杖 = 2; // :1155
      } // :1155-1156
      return 0; // :1155-1157
    } // :1155-1158
  } // :1159-1162

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    // :1165

    if (chara(target).kojo.肛门虫 == 0) {
      // :1167

      if (era0(`talent:${target}:76`) == 1) {
        // :1169
        await era.printAndWait(
          `「就是这个要放到后面的穴么？又是一种新玩法呢……♪」`,
        ); // :1170
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1172
        await era.printAndWait(
          `「魔王大人…怎么净喜欢这样胡来的玩法…本宫还是更喜欢……正常一点的啦～♪」`,
        ); // :1173
      } else {
        // :1175-1176
        await era.printAndWait(`「什，什么啊这玩意儿……住手！好恶心！！」`); // :1176
        await era.printAndWait(`「不……不要再往后面塞……塞了啊……这种……这种……」`); // :1177
      } // :1177-1178
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1179
      chara(target).kojo.肛门虫 = 1; // :1179
      return 0; // :1179-1180
    } else {
      // :1182-1183

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1184
        await era.printAndWait(
          `「唔哦……在里面……不停搅动着……好厉害，太厉害啦～哦哦！♪」`,
        ); // :1185
        await era.printAndWait(
          `${target_name}因为肛门虫的活动，媚态尽显地高声呻吟着。`,
        ); // :1186
        await era.printAndWait(`「还有什么新鲜的玩法可以拿出来吗？♪」`); // :1187
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1188
        chara(target).kojo.肛门虫 = 6; // :1188
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1190
        await era.printAndWait(
          `「嘻嘻，好啊～再深入本宫的洞里……♪再让本宫更兴奋吧♪」`,
        ); // :1191
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1192
        chara(target).kojo.肛门虫 = 6; // :1192
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1194
        await era.printAndWait(`「啊，屁股里………喔喔喔～！♪」`); // :1195
        await era.printAndWait(
          `${target_name}被肛门虫蹂躏着尻穴，变得心荡神驰了。`,
        ); // :1196
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1197
        chara(target).kojo.肛门虫 = 5; // :1197
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1199
        await era.printAndWait(
          `「嘛…你喜欢就好哦，本宫的屁股吗……把这东西放进去吧……♪」`,
        ); // :1200
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1201
        chara(target).kojo.肛门虫 = 4; // :1201
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1203
        await era.printAndWait(`「呃呃……不行！感觉到了……被这种卑劣的生物……」`); // :1204
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1205
        chara(target).kojo.肛门虫 = 3; // :1205
      } else if (chara(target).kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1207
        await era.printAndWait(
          `「不！！这种卑劣的东西……不要再拿过来了！！！」`,
        ); // :1208
        await era.printAndWait(`「本宫求……不，本宫命令你！！！！停手！！！」`); // :1209
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1210
        chara(target).kojo.肛门虫 = 2; // :1210
      } // :1210-1211
      return 0; // :1210-1212
    } // :1213-1214
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    // :1215

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1217
      await era.printAndWait(`「哈哈哈……好厉害……」`); // :1218
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1219
      chara(target).kojo.肛门虫着脱 = 4; // :1219
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1221
      await era.printAndWait(`「意外可爱的小东西呢～♪」`); // :1222
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1223
      chara(target).kojo.肛门虫着脱 = 3; // :1223
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1225
      await era.printAndWait(`「呼……呼……呃……请温柔一点拔出来……」`); // :1226
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1227
      chara(target).kojo.肛门虫着脱 = 2; // :1227
    } else if (chara(target).kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1229
      await era.printAndWait(`「哈，哈……终于结束了……本宫被这种家伙………」`); // :1230
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1231
      chara(target).kojo.肛门虫着脱 = 1; // :1231
    } // :1231-1232
    return 0; // :1231-1233
  } // :1231-1234

  if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`)) {
    // :1240

    if (chara(target).kojo.阴蒂夹 == 0) {
      // :1242

      if (era0(`talent:${target}:76`) == 1) {
        // :1244
        await era.printAndWait(
          `「哦哦哦这样子夹住看起来会相当有趣呢～真不愧是魔王大人～！～♪」`,
        ); // :1245
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1247
        await era.printAndWait(
          `「会振动的吗？魔王大人不要对本宫弄什么太激烈的东西啊……本宫……那个……很敏感的……」`,
        ); // :1248
      } else {
        // :1250-1251
        await era.printAndWait(
          `「什么啊这是……你这污物又拿一些讨厌的东西过来了……」`,
        ); // :1251
        await era.printAndWait(
          `「等等！……那里被夹上会很痛的吧？！别！！本宫叫你住手啊！」`,
        ); // :1252
      } // :1252-1253
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :1254
      chara(target).kojo.阴蒂夹 = 1; // :1254
      return 0; // :1254-1255
    } else {
      // :1257-1258

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1259
        await era.printAndWait(
          `「啊～久违的夹子～快！这个东西本宫很是钟意呢！」`,
        ); // :1260
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :1261
        chara(target).kojo.阴蒂夹 = 4; // :1261
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1263
        await era.printAndWait(
          `「嘛……只要能令你高兴，本宫……其实无所谓的哦……来吧……」`,
        ); // :1264
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :1265
        chara(target).kojo.阴蒂夹 = 3; // :1265
      } else if (chara(target).kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
        // :1267
        await era.printAndWait(`「什么啊这夹子………唔唔……虽然…很痛………但是………」`); // :1268
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :1269
        chara(target).kojo.阴蒂夹 = 2; // :1269
      } // :1269-1270
      return 0; // :1269-1271
    } // :1272-1273
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`) == 0) {
    // :1274

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1276
      await era.printAndWait(
        `「呃～啊！！那里已经红肿得发疼了！你喜欢的话继……继续弄那……里，也没关系哦！」`,
      ); // :1277
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :1278
      chara(target).kojo.阴蒂夹着脱 = 3; // :1278
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1280
      await era.printAndWait(`「呃～嗯！！魔……魔王大人……尽兴了吗？」`); // :1281
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :1282
      chara(target).kojo.阴蒂夹着脱 = 2; // :1282
    } else if (chara(target).kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1284
      await era.printAndWait(`「哎………唔唔……呵…总有一天……本宫会报仇的…」`); // :1285
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :1286
      chara(target).kojo.阴蒂夹着脱 = 1; // :1286
    } // :1286-1287
    return 0; // :1286-1288
  } // :1286-1289

  if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`)) {
    // :1295

    if (chara(target).kojo.乳头夹 == 0) {
      // :1297

      if (era0(`talent:${target}:76`) == 1) {
        // :1299
        await era.printAndWait(
          `「新玩具呢～这个，看起来很有趣的嘛～魔王大人～大～♪变～♪态～♪」`,
        ); // :1300
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1302
        await era.printAndWait(
          `「本宫的胸部啊，就是为了侍奉魔王大人而存在的～不要……太过分哦～♪」`,
        ); // :1303
      } else {
        // :1305-1306
        await era.printAndWait(`「连乳头也不放过么？！！真是过分的家伙呢……」`); // :1306
      } // :1306-1307
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :1308
      chara(target).kojo.乳头夹 = 1; // :1308
      return 0; // :1308-1309
    } else {
      // :1311-1312

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1313
        await era.printAndWait(
          `「乳……乳头已经完全硬起来了～拿那个夹起来吧！本宫很喜欢的哟～！」`,
        ); // :1314
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :1315
        chara(target).kojo.乳头夹 = 4; // :1315
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1317
        await era.printAndWait(
          `「给本宫夹上也不是不愿意啦……不知道本宫把这个给魔王大人夹上会是什么感觉呢♪」`,
        ); // :1318
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :1319
        chara(target).kojo.乳头夹 = 3; // :1319
      } else if (chara(target).kojo.乳头夹 <= 1 || game.kojo.口上开关 == 2) {
        // :1321
        await era.printAndWait(
          `「乳……乳头夹什么的…………啊…只知道用道具的变态啊，总有一天会反过来用这些东西把你弄得求生不得求死不能的…！」`,
        ); // :1322
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :1323
        chara(target).kojo.乳头夹 = 2; // :1323
      } // :1323-1324
      return 0; // :1323-1325
    } // :1326-1327
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`) == 0) {
    // :1328

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1330
      await era.printAndWait(
        `「哈啊！本宫的乳头，已经被这个完全弄麻掉了呢，下次再装上吧～！」`,
      ); // :1331
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :1332
      chara(target).kojo.乳头夹着脱 = 3; // :1332
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1334
      await era.printAndWait(`「啊啊！胸部……快要……」`); // :1335
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :1336
      chara(target).kojo.乳头夹着脱 = 2; // :1336
    } else if (chara(target).kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1338
      await era.printAndWait(`「哈啊……哈啊……乳……乳头……好像要坏掉了……」`); // :1339
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :1340
      chara(target).kojo.乳头夹着脱 = 1; // :1340
    } // :1340-1341
    return 0; // :1340-1342
  } // :1340-1343

  if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`)) {
    // :1349

    if (chara(target).kojo.榨乳器 == 0) {
      // :1351

      if (era0(`talent:${target}:76`) == 1) {
        // :1353
        await era.printAndWait(
          `「啊！啊！啊！～～～这个玩具这么用力吸的话……会…………会………喷出来的吧………」`,
        ); // :1354
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1356
        await era.printAndWait(
          `「哦～哦～麻麻的……快要流出来了……好想……不知道被婴儿…吸的话…会是什么感觉呢………」`,
        ); // :1357
      } else {
        // :1359-1360
        await era.printAndWait(
          `「想……想要本宫的母乳什么的……哈啊啊啊……本来是世间万金难求的圣物呢……真是……便宜你了……啊啊……哈啊啊啊！！」`,
        ); // :1360
      } // :1360-1361
      // CFLAG:317  = 1（变量语义：CFLAG 族，317） // :1362
      chara(target).kojo.榨乳器 = 1; // :1362
      return 0; // :1362-1363
    } else {
      // :1365-1366

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.榨乳器 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1367
        await era.printAndWait(
          `「啊！啊！啊！～～～太～太舒服了！！再吸！再用力吸………」`,
        ); // :1368
        // CFLAG:317  = 4（变量语义：CFLAG 族，317） // :1369
        chara(target).kojo.榨乳器 = 4; // :1369
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.榨乳器 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1371
        await era.printAndWait(
          `「唔～哦哦！～～～感觉胸中满满的……爱意……和奶水一起……被吸出来了！……本宫的爱啊………」`,
        ); // :1372
        // CFLAG:317  = 3（变量语义：CFLAG 族，317） // :1373
        chara(target).kojo.榨乳器 = 3; // :1373
      } else if (chara(target).kojo.榨乳器 <= 1 || game.kojo.口上开关 == 2) {
        // :1375
        await era.printAndWait(
          `「呃……啊！！啊………已…已经够了吧……把本宫如此对待的话…的话…………」`,
        ); // :1376
        // CFLAG:317  = 2（变量语义：CFLAG 族，317） // :1377
        chara(target).kojo.榨乳器 = 2; // :1377
      } // :1377-1378
      return 0; // :1377-1379
    } // :1380-1381
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`) == 0) {
    // :1382

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.榨乳器着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1384
      await era.printAndWait(`「本宫的母乳～不知道味道如何呢………」`); // :1385
      // CFLAG:377  = 3（变量语义：CFLAG 族，377） // :1386
      chara(target).kojo.榨乳器着脱 = 3; // :1386
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.榨乳器着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1388
      await era.printAndWait(`「有这些……的话……魔王大人已经满意了吧？」`); // :1389
      // CFLAG:377  = 2（变量语义：CFLAG 族，377） // :1390
      chara(target).kojo.榨乳器着脱 = 2; // :1390
    } else if (chara(target).kojo.榨乳器着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1392
      await era.printAndWait(`「呼……呼呼…………本宫不会忘记的………」`); // :1393
      // CFLAG:377  = 1（变量语义：CFLAG 族，377） // :1394
      chara(target).kojo.榨乳器着脱 = 1; // :1394
    } // :1394-1395
    return 0; // :1394-1396
  } // :1394-1397

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    // :1457

    if (chara(target).kojo.肛珠 == 0) {
      // :1459

      if (era0(`talent:${target}:76`) == 1) {
        // :1461
        await era.printAndWait(
          `「又是什么新鲜的玩具呢？欸？是用在后面的啊～……♪」`,
        ); // :1462
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1464
        await era.printAndWait(
          `「啊？这个，要放到屁股里么……？只……只要能令你高兴的话……本宫其实……♪」`,
        ); // :1465
      } else {
        // :1467-1468
        await era.printAndWait(
          `「这又是什么本宫不知道的……啥？屁股里！？等…等一下！！…」`,
        ); // :1468
      } // :1468-1469
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :1470
      chara(target).kojo.肛珠 = 1; // :1470
      return 0; // :1470-1471
    } else {
      // :1473-1474

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1475
        await era.printAndWait(
          `「噢～后面……被塞满了……呵呵～全部放进去了没？」`,
        ); // :1476
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :1477
        chara(target).kojo.肛珠 = 7; // :1477
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1479
        await era.printAndWait(
          `「呃～～好痛……魔王大人！这个玩法…有点太激烈了啊……♪」`,
        ); // :1480
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :1481
        chara(target).kojo.肛珠 = 6; // :1481
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1483
        await era.printAndWait(`「好热，屁股好热……继续，继续放进去吧……♪」`); // :1484
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :1485
        chara(target).kojo.肛珠 = 5; // :1485
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1487
        await era.printAndWait(
          `「呃！！屁股里……痛…痛…痛……啊！可以的话还请魔王大人轻一点啊……」`,
        ); // :1488
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :1489
        chara(target).kojo.肛珠 = 4; // :1489
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1491
        await era.printAndWait(
          `「可恶，本宫居……居然有感觉了……被这种玩具……弄后面…………」`,
        ); // :1492
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :1493
        chara(target).kojo.肛珠 = 3; // :1493
      } else if (chara(target).kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        // :1495
        await era.printAndWait(
          `「痛！啊！！好痛啊！！停手！！停手！！不要再放进去啦！」`,
        ); // :1496
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :1497
        chara(target).kojo.肛珠 = 2; // :1497
      } // :1497-1498
      return 0; // :1497-1499
    } // :1500-1501
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    // :1502

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1504
      await era.printAndWait(`「一下子，一下子拔出来吧！♪」`); // :1505
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :1506
      chara(target).kojo.肛珠着脱 = 4; // :1506
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1508
      await era.printAndWait(`「请，请温柔点，慢慢拔……太……激烈的话……」`); // :1509
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :1510
      chara(target).kojo.肛珠着脱 = 3; // :1510
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1512
      await era.printAndWait(
        `「呃……唔……哦哦～啊……这一串珠……珠子……啊啊啊受不了了啊！！……」`,
      ); // :1513
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :1514
      chara(target).kojo.肛珠着脱 = 2; // :1514
    } else if (chara(target).kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1516
      await era.printAndWait(
        `「好痛啊！！给本宫慢慢地，慢慢地拔啊！……屁股…屁股怎么能受得了啊…呜～……」`,
      ); // :1517
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :1518
      chara(target).kojo.肛珠着脱 = 1; // :1518
    } // :1518-1519
    return 0; // :1518-1520
  } // :1518-1521

  if (era_flag.selectcom == 20) {
    // :1526

    if (chara(target).kojo.正常位 == 0) {
      // :1528

      if (era0(`talent:${target}:0`) == 1) {
        // :1530

        if (era0(`talent:${target}:76`) == 1) {
          // :1532
          await era.printAndWait(
            `「终于决定要从正面把本宫的第一次拿走了么？……♪」`,
          ); // :1533
          await era.printAndWait(
            `「可以哟，本宫就特许你这下界物种得到天使的第一次吧……♪」`,
          ); // :1534
          await era.printAndWait(
            `「不过条件就是，一……定,要让本宫开心哦，嗯哼哼哼♪」`,
          ); // :1535
          await era.printAndWait(
            `「不然的话，本宫大概要把你做成专供本宫使用的人偶呢♪」`,
          ); // :1536
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5
        ) {
          // :1538
          await era.printAndWait(`「那个……魔王大人……♪」`); // :1539
          await era.printAndWait(
            `「本宫的第一次呢……作为天使，为了亲爱的人，一直保留着……♪」`,
          ); // :1540
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`); // :1541
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`); // :1542
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的。`,
          ); // :1543
          await era.printAndWait(
            `「所以，今天，能把作为天使的第一次，奉献给魔王大人的话……♪」`,
          ); // :1544
          await era.printAndWait(`「本宫……会非常……♪」`); // :1545
          await era.printAndWait(
            `已经害羞到说不出话了呢，你觉得这样的${target_name}，更加可爱了。`,
          ); // :1546
          await era.printAndWait(
            `「所以……不要再让本宫……等了嘛，真是的……」${target_name}小声嘟囔着。`,
          ); // :1547
          await era.printAndWait(`你笑着开始调整姿势…………`); // :1548
        } else {
          // :1550-1551
          await era.printAndWait(`「放开……放开本宫！！……」`); // :1551
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她压在身下。`,
          ); // :1552
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          ); // :1553
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`); // :1554
          await era.printAndWait(
            `你看着流下屈辱和苦痛泪水的${target_name}，嘴角轻轻上扬着。`,
          ); // :1555
        } // :1555-1556
      } else {
        // :1558-1559
        if (era0(`talent:${target}:76`) == 1) {
          // :1559
          await era.printAndWait(`「让本宫看着你的脸～……♪」`); // :1560
          await era.printAndWait(`「不让本宫舒服的话，可是会咬你的哦～……♪」`); // :1561
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1563
          await era.printAndWait(
            `「啊～魔王大人！这样盯着本宫的脸看……本宫……本……宫…………」`,
          ); // :1564
        } else {
          // :1566-1567
          await era.printAndWait(
            `「下贱的物种啊……妄想本宫也沉浸在这肉体的娱乐中么……绝对………」`,
          ); // :1567
        } // :1567-1568
      } // :1569-1570
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :1570
      chara(target).kojo.正常位 = 1; // :1570
      return 0; // :1570-1571
    } else {
      // :1573-1574

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1575
        await era.printAndWait(`「让本宫看着你的脸～……♪」`); // :1576
        await era.printAndWait(`「不让本宫舒服的话，可是会咬你的哦～……♪」`); // :1577
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :1578
        chara(target).kojo.正常位 = 6; // :1578
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1580
        if (rand_n(3) == 0) {
          // :1581
          await era.printAndWait(
            `「啊～魔王大人！这样盯着本宫的脸看……本宫……本……宫…………」`,
          ); // :1582
        } else if (rand_n(2) == 0) {
          // :1583
          await era.printAndWait(
            `「唔～哦！！从一插进来开始……本宫的身体就不受控制了！！全部……全部都是属于魔王大人的！！」`,
          ); // :1584
        } else {
          // :1585-1586
          await era.printAndWait(
            `「魔王大人～！抱紧本宫，本宫…稍微…有点冷呢…嗯…哈…嗯啊啊」`,
          ); // :1586
        } // :1586-1587
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :1588
        chara(target).kojo.正常位 = 5; // :1588
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1590
        await era.printAndWait(
          `「唔、唔……喔……虽然讨厌这种感觉…但是…本宫…………」`,
        ); // :1591
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :1592
        chara(target).kojo.正常位 = 4; // :1592
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1594
        await era.printAndWait(`「随你……喜欢……吧……哈……哈……」`); // :1595
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :1596
        chara(target).kojo.正常位 = 3; // :1596
      } else if (chara(target).kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        // :1598
        await era.printAndWait(
          `「可恶！不要啊！从本宫身上滚开啊啊啊啊啊！！」`,
        ); // :1599
        await era.printAndWait(`${target_name}流下了屈辱的泪水。`); // :1600
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :1601
        chara(target).kojo.正常位 = 2; // :1601
      } // :1601-1602
      return 0; // :1601-1603
    } // :1601-1604
  } // :1605-1608

  if (era_flag.selectcom == 21) {
    // :1610

    if (chara(target).kojo.背后位 == 0) {
      // :1612

      if (era0(`talent:${target}:0`) == 1) {
        // :1614

        if (era0(`talent:${target}:76`) == 1) {
          // :1616
          await era.printAndWait(`「终于决定要把本宫的第一次拿走了么？……♪」`); // :1617
          await era.printAndWait(
            `「可以哟，本宫就特许你这下界生物得到天使的第一次吧……♪」`,
          ); // :1618
          await era.printAndWait(
            `「欸？这样的姿势吗？感觉像那些更下贱的生物一样了呢………」`,
          ); // :1619
          await era.printAndWait(
            `「不过又有什么关系呢…一定要让本宫达到最～～强的高潮哦～～♪」`,
          ); // :1620
          await era.printAndWait(
            `「不然的话，本宫一定要因为强迫本宫用这样下贱的姿势，把你做成专供本宫使用的人偶呢，做好觉悟吧～～♪」`,
          ); // :1621
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1623
          await era.printAndWait(`「那个…魔王大人…♪」`); // :1624
          await era.printAndWait(
            `「本宫的第一次呢…作为天使，为了亲爱的人，一直保留着……♪」`,
          ); // :1625
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`); // :1626
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`); // :1627
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的`,
          ); // :1628
          await era.printAndWait(`「不过，这样的姿势…果然还是不要了吧…♪」`); // :1629
          await era.printAndWait(`${target_name}像是在做什么思想斗争`); // :1630
          await era.printAndWait(
            `「呼，也好吧，为了你，尽管这样的方式作为第一次很屈辱……但是……」`,
          ); // :1631
          await era.printAndWait(`「是魔王大人的话……就大概没问题了呢♪」`); // :1632
          await era.printAndWait(`「本宫……非常……♪」`); // :1633
          await era.printAndWait(
            `已经害羞到说不出话了呢，你觉得这样的${target_name}，更加可爱了`,
          ); // :1634
          await era.printAndWait(
            `「所以……不要再让本宫……用这种姿势……再等了嘛，真是的……」${target_name}小声嘟囔`,
          ); // :1635
        } else {
          // :1638-1639
          await era.printAndWait(`「放开……放开本宫！！……」`); // :1639
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她推倒在地上`,
          ); // :1640
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          ); // :1641
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`); // :1642
          await era.printAndWait(
            `你看着流下屈辱和苦痛泪水的${target_name}，嘴角轻轻上扬着`,
          ); // :1643
          await era.printAndWait(
            `「像………像狗一样…………的第一次………呜啊啊啊啊啊啊！！！！」`,
          ); // :1644
        } // :1644-1645
      } else {
        // :1647-1648

        if (era0(`talent:${target}:76`) == 1) {
          // :1649
          await era.printAndWait(`「什么姿势也没关系哟！让本宫快乐起来吧♪」`); // :1650
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1652
          await era.printAndWait(`「这样的姿势…果然还是不要了吧…♪」`); // :1653
          await era.printAndWait(`「欸……你坚持的话……」`); // :1654
        } else {
          // :1656-1657
          await era.printAndWait(`「放开……放开本宫！！……」`); // :1657
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她推倒在地上`,
          ); // :1658
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          ); // :1659
          await era.printAndWait(`「像………像狗一样………呜……」`); // :1660
        } // :1660-1661
      } // :1662-1663
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :1663
      chara(target).kojo.背后位 = 1; // :1663
      return 0; // :1663-1664
    } else {
      // :1666-1667

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1668
        if (rand_n(3) == 0) {
          // :1669
          await era.printAndWait(
            `「再……再……再来！本宫没说停之前，你可不能……简单地停下来哦！！」`,
          ); // :1670
        } else if (rand_n(2) == 0) {
          // :1671
          await era.printAndWait(
            `「哈……这种野兽一般的姿势……！意外地让人兴奋呢……」`,
          ); // :1672
        } else {
          // :1673-1674
          await era.printAndWait(`「唔啊啊啊啊啊啊！！」`); // :1674
        } // :1674-1675
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :1676
        chara(target).kojo.背后位 = 6; // :1676
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1678
        if (rand_n(3) == 0) {
          // :1679
          await era.printAndWait(
            `「下次的话……让本宫看着魔王大人的脸高……高潮好吗？……」`,
          ); // :1680
        } else if (rand_n(2) == 0) {
          // :1681
          await era.printAndWait(
            `「这下流的姿势……也不是不可以呢…………再……用力一点！」`,
          ); // :1682
        } else {
          // :1683-1684
          await era.printAndWait(`「…………魔王大人你很喜欢这样的姿势吗？」`); // :1684
        } // :1684-1685
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :1686
        chara(target).kojo.背后位 = 5; // :1686
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1688
        await era.printAndWait(
          `「这种姿势……像野兽一样…………但是……有感觉…………本宫一定……哪里坏掉了啊啊啊……」`,
        ); // :1689
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :1690
        chara(target).kojo.背后位 = 4; // :1690
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1692
        await era.printAndWait(
          `「这种姿势被你…………怎么想也太过分了啊！！去死吧蛆虫！」`,
        ); // :1693
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :1694
        chara(target).kojo.背后位 = 3; // :1694
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :1696
        await era.printAndWait(`「放开……放开本宫！！……」`); // :1697
        await era.printAndWait(`但是对你来说抵抗没有意义呢`); // :1698
        await era.printAndWait(`「像………像狗一样………呜……」`); // :1699
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :1700
        chara(target).kojo.背后位 = 2; // :1700
      } // :1700-1701
      return 0; // :1700-1702
    } // :1700-1703
  } // :1704-1706

  if (era_flag.selectcom == 22) {
    // :1708
    if (chara(target).kojo.对面座位 == 0) {
      // :1709

      if (era0(`talent:${target}:0`) == 1) {
        // :1711

        if (era0(`talent:${target}:76`) == 1) {
          // :1713
          await era.printAndWait(`「终于决定要把本宫的第一次拿走了么？……♪」`); // :1714
          await era.printAndWait(`「这样抱着本宫的话，大概会很舒服呢♪」`); // :1715
          await era.printAndWait(
            `「可以哟，本宫就特许你这下界的生物得到天使的第一次吧……♪」`,
          ); // :1716
          await era.printAndWait(
            `「不过条件就是，一………定,要让本宫开心的哦，嗯哼哼哼♪」`,
          ); // :1717
          await era.printAndWait(
            `「不然的话，本宫大概要把你做成专供本宫使用的人偶呢♪」`,
          ); // :1718
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1720
          await era.printAndWait(`你抱起${target_name}坐到你的身上……`); // :1721
          await era.printAndWait(`「那个…魔王大人…♪」`); // :1722
          await era.printAndWait(
            `「本宫的第一次呢…作为天使 为了亲爱的人，一直保留着……♪」`,
          ); // :1723
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`); // :1724
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`); // :1725
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的`,
          ); // :1726
          await era.printAndWait(
            `「所以，今天，能把作为天使的第一次，奉献给魔王大人的话……♪」`,
          ); // :1727
          await era.printAndWait(`「本宫……会非常……♪」`); // :1728
          await era.printAndWait(
            `已经害羞到说不出话了呢，你看着近在咫尺的${target_name}的脸，觉得这样的${target_name}，更加可爱了`,
          ); // :1729
          await era.printAndWait(
            `「所以……不要再让本宫……等了嘛，真是的……」${target_name}小声嘟囔着……`,
          ); // :1730
        } else {
          // :1733-1734
          await era.printAndWait(`「放开……放开本宫！！……」`); // :1734
          await era.printAndWait(
            `你无视了${target_name}的警告，把她抱到你的身上`,
          ); // :1735
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          ); // :1736
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`); // :1737
          await era.printAndWait(
            `你看着对面流下屈辱和苦痛泪水的${target_name}，强吻了上去`,
          ); // :1738
        } // :1738-1739
      } else {
        // :1741-1742

        if (era0(`talent:${target}:76`) == 1) {
          // :1743
          await era.printAndWait(`「让本宫看着你的脸～……♪」`); // :1744
          await era.printAndWait(`「不让本宫舒服的话，可是会咬你的哦～……♪」`); // :1745
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1747
          await era.printAndWait(
            `「啊～魔王大人！那个……这样坐着……好像比较……舒服来的……♪」`,
          ); // :1748
        } else {
          // :1750-1751
          await era.printAndWait(
            `「下贱的魔族啊……妄想本宫也沉浸在这肉体的娱乐中么……绝对………」`,
          ); // :1751
        } // :1751-1752
      } // :1753-1754
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :1754
      chara(target).kojo.对面座位 = 1; // :1754
      return 0; // :1754-1755
    } else {
      // :1757-1758

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1759
        await era.printAndWait(`「来亲亲吧～……噢……啊啊～♪好深，好深啊！……♪」`); // :1760
        await era.printAndWait(`「本宫要受……受不了了呢……♪」`); // :1761
        await era.printAndWait(`「哈……已经完全被……快感俘虏了呢♪」`); // :1762
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :1763
        chara(target).kojo.对面座位 = 6; // :1763
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1765
        if (rand_n(3) == 0) {
          // :1766
          await era.printAndWait(
            `「紧紧相拥……深深凝视……好喜欢这样……不要再～丢下本宫了哦～！！」`,
          ); // :1767
        } else if (rand_n(2) == 0) {
          // :1768
          await era.printAndWait(
            `「魔王～大人，这样坐着，不会……压到你的么…………哈～～～」`,
          ); // :1769
        } else {
          // :1770-1771
          await era.printAndWait(
            `「亲亲……想亲亲……彼此相连着……温柔地……那里也～暖暖的～！」`,
          ); // :1771
        } // :1771-1772
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :1773
        chara(target).kojo.对面座位 = 5; // :1773
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1775
        await era.printAndWait(`「哈……不喜欢也……没办法了……」`); // :1776
        await era.printAndWait(`「这样稍稍舒服一点对待本宫的话……」`); // :1777
        await era.printAndWait(`「嗯……也可以稍稍……原谅你这家伙一点了吧……」`); // :1778
        await era.printAndWait(`(舒服什么的…怎么说得出口啊……)`); // :1779
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :1780
        chara(target).kojo.对面座位 = 4; // :1780
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1782
        await era.printAndWait(`「坐……坐在你身上还要插进来什么的……」`); // :1783
        await era.printAndWait(`「对本宫来说，很过分呢……」`); // :1784
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :1785
        chara(target).kojo.对面座位 = 3; // :1785
      } else if (chara(target).kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1787
        await era.printAndWait(
          `「可恶！不要啊！把本宫放下去！放下去啊啊啊！」`,
        ); // :1788
        await era.printAndWait(`${target_name}流下了屈辱的泪水`); // :1789
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :1790
        chara(target).kojo.对面座位 = 2; // :1790
      } // :1790-1791
      return 0; // :1790-1792
    } // :1790-1793
  } // :1794-1797

  if (era_flag.selectcom == 23) {
    // :1799
    if (chara(target).kojo.背面座位 == 0) {
      // :1800

      if (era0(`talent:${target}:0`) == 1) {
        // :1802

        if (era0(`talent:${target}:76`) == 1) {
          // :1804
          await era.printAndWait(`「终于决定要把本宫的第一次拿走了么？……♪」`); // :1805
          await era.printAndWait(
            `「可以哟，本宫就特许你这普通的人类得到天使的第一次吧……♪」`,
          ); // :1806
          await era.printAndWait(
            `「欸？让本宫背过去吗？难道不想让本宫看见你那下等的脸么？」`,
          ); // :1807
          await era.printAndWait(
            `「呵呵开玩笑的啦，非要从后面的话…一定要让本宫达到最～～强的高潮哦～～♪」`,
          ); // :1808
          await era.printAndWait(
            `「不然的话，回过头就把你做成专供本宫使用的人偶呢～～♪」`,
          ); // :1809
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1811
          await era.printAndWait(`「那个…魔王大人…♪」`); // :1812
          await era.printAndWait(
            `「本宫的第一次呢…作为天使，为了亲爱的人，一直保留着……♪」`,
          ); // :1813
          await era.printAndWait(`「现在…魔王大人…就是…………♪」`); // :1814
          await era.printAndWait(`「本宫的……心爱之人……呢…………♪」`); // :1815
          await era.printAndWait(
            `${target_name}声音渐渐低了下去，脸变得红红的`,
          ); // :1816
          await era.printAndWait(
            `「所以，今天，能把作为天使的第一次，奉献给魔王大人的话……♪」`,
          ); // :1817
          await era.printAndWait(`「即使……看不见你的脸……♪」`); // :1818
          await era.printAndWait(`「本宫……也会非常……♪」`); // :1819
          await era.printAndWait(
            `已经害羞到说不出话了呢，你觉得这样的${target_name}，更加可爱了`,
          ); // :1820
          await era.printAndWait(
            `「所以……要让本宫在你身上坐多久呢……」${target_name}小声嘟囔着`,
          ); // :1821
          await era.printAndWait(`你慢慢开始了动作……`); // :1822
        } else {
          // :1824-1825
          await era.printAndWait(`「放开……放开本宫！！……」`); // :1825
          await era.printAndWait(
            `你无视了${target_name}的警告，逐渐把她抱起在身上`,
          ); // :1826
          await era.printAndWait(
            `「这样对本宫，这样对下一任主神！！你知道你的下场会怎样吗！！！……」`,
          ); // :1827
          await era.printAndWait(`${target_name}努力想要回过头来警告着你`); // :1828
          await era.printAndWait(`「放开……放……哈……啊！！啊啊啊啊啊啊啊……」`); // :1829
        } // :1829-1830
      } else {
        // :1832-1833

        if (era0(`talent:${target}:76`) == 1) {
          // :1834
          await era.printAndWait(
            `「从后面来啊……也许有一种意外和未知的感觉，本宫会更兴奋呢……」`,
          ); // :1835
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1837
          await era.printAndWait(`「不能看着魔王大人了么……」`); // :1838
        } else {
          // :1840-1841
          await era.printAndWait(
            `「下贱的魔族啊……妄想本宫也沉浸在这肉体的娱乐中么……绝对………」`,
          ); // :1841
        } // :1841-1842
      } // :1843-1844
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :1844
      chara(target).kojo.背面座位 = 1; // :1844
      return 0; // :1844-1845
    } else {
      // :1847-1848

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1849
        if (rand_n(3) == 0) {
          // :1850
          await era.printAndWait(`「揉，揉胸的时候从后面…………！！♪」`); // :1851
        } else if (rand_n(2) == 0) {
          // :1852
          await era.printAndWait(
            `「好棒……哈……唔……哦哦哦！……这样的位置好舒服～♪」`,
          ); // :1853
        } else {
          // :1854-1855
          await era.printAndWait(`「好……唔唔唔……啊……噢！！～好棒啊～♪」`); // :1855
        } // :1855-1856
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :1857
        chara(target).kojo.背面座位 = 6; // :1857
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1859
        if (rand_n(3) == 0) {
          // :1860
          await era.printAndWait(
            `「从后面……抱紧本宫～♪啊……进去好深呢……魔王大人！～」`,
          ); // :1861
        } else if (rand_n(2) == 0) {
          // :1862
          await era.printAndWait(
            `「被这样抱着～……太舒服了……噢～♪胸…胸部也被…」`,
          ); // :1863
        } else {
          // :1864-1865
          await era.printAndWait(
            `「魔王～大人，这样坐着，不会……压到你的么…………哈～～～」`,
          ); // :1865
        } // :1865-1866
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :1867
        chara(target).kojo.背面座位 = 5; // :1867
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1869
        await era.printAndWait(
          `「真……真是卑鄙呢……把本宫这样放在你的身上……就……抵……………唔……啊……啊……哦哦哦！！」`,
        ); // :1870
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :1871
        chara(target).kojo.背面座位 = 4; // :1871
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1873
        await era.printAndWait(`「脖……脖子后面……」`); // :1874
        await era.printAndWait(`「本宫命令你停止呼吸！！……好……好痒……」`); // :1875
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :1876
        chara(target).kojo.背面座位 = 3; // :1876
      } else if (chara(target).kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1878
        await era.printAndWait(
          `「可恶！不要啊！把本宫放下去！放下去啊啊啊！」`,
        ); // :1879
        await era.printAndWait(`${target_name}流下了屈辱的泪水`); // :1880
        await era.printAndWait(`当然你是不会罢手的`); // :1881
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :1882
        chara(target).kojo.背面座位 = 2; // :1882
      } // :1882-1883
      return 0; // :1882-1884
    } // :1882-1885
  } // :1886-1889

  if (era_flag.selectcom == 26) {
    // :1891

    if (chara(target).kojo.正常位肛交 == 0) {
      // :1893

      if (era0(`talent:${target}:76`) == 1) {
        // :1895
        await era.printAndWait(`「哈哈，喜欢走后门吗～好哦……来吧！」`); // :1896
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1898
        await era.printAndWait(`「喜欢这种地方吗……？大～变～态～」`); // :1899
      } else {
        // :1901-1902
        await era.printAndWait(`「停、停下啊！在想什么哪！」`); // :1902
      } // :1902-1903
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :1904
      chara(target).kojo.正常位肛交 = 1; // :1904
      return 0; // :1904-1905
    } else {
      // :1907-1908

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1909
        if (rand_n(3) == 0) {
          // :1910
          await era.printAndWait(`「唔～哦哦～♪菊穴，感觉太强烈了～♪」`); // :1911
        } else if (rand_n(2) == 0) {
          // :1912
          await era.printAndWait(`「唔～啊啊～♪插入便便的洞洞里了～♪」`); // :1913
        } else {
          // :1914-1915
          await era.printAndWait(`「呃～后面的洞～哦！哦哦～♪」`); // :1915
        } // :1915-1916
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :1917
        chara(target).kojo.正常位肛交 = 7; // :1917
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1919
        await era.printAndWait(
          `「痛～好痛……没事～♪没关系的，马上就会习惯的啦～」`,
        ); // :1920
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :1921
        chara(target).kojo.正常位肛交 = 6; // :1921
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1923
        if (rand_n(2) == 0) {
          // :1924
          await era.printAndWait(`「屁股……啊～感觉到了～噢～♪」`); // :1925
        } else {
          // :1926-1927
          await era.printAndWait(`「屁股……屁股好热～好烫啊～♪」`); // :1927
        } // :1927-1928
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :1929
        chara(target).kojo.正常位肛交 = 5; // :1929
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1931
        await era.printAndWait(
          `「呃！啊！痛！～人家，人家会努力提高屁股的感觉……没关系，很、很舒服」`,
        ); // :1932
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :1933
        chara(target).kojo.正常位肛交 = 4; // :1933
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1935
        await era.printAndWait(`「唔哦……啊～♪！感、感觉到了～……」`); // :1936
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :1937
        chara(target).kojo.正常位肛交 = 3; // :1937
      } else if (
        chara(target).kojo.正常位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :1939
        await era.printAndWait(`「要用这种地方……」`); // :1940
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :1941
        chara(target).kojo.正常位肛交 = 2; // :1941
      } // :1941-1942
      return 0; // :1941-1943
    } // :1941-1944
  } // :1945-1948

  if (era_flag.selectcom == 27) {
    // :1950

    if (chara(target).kojo.背后位肛交 == 0) {
      // :1952

      if (era0(`talent:${target}:76`) == 1) {
        // :1954
        await era.printAndWait(`「终……终于…要用肉棒插本宫了吗！等好久了……」`); // :1955
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1957
        await era.printAndWait(`「这，这么脏的地方……会弄脏你的棒棒的……」`); // :1958
      } else {
        // :1960-1961
        await era.printAndWait(`「你这人，整天在想些什么啊！这个……变态狂！」`); // :1961
      } // :1961-1962
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :1963
      chara(target).kojo.背后位肛交 = 1; // :1963
      return 0; // :1963-1964
    } else {
      // :1966-1967

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1968
        if (rand_n(2) == 0) {
          // :1969
          await era.printAndWait(
            `「呼……呼……唔哦哦哦哦哦哦！！用力插进去！把本宫里面弄得乱七八糟吧！！」`,
          ); // :1970
        } else {
          // :1971-1972
          await era.printAndWait(
            `「啊……哦哦……光插进来，感觉就这么地强烈……本宫，本宫是你的菊穴奴隶了～♪」`,
          ); // :1972
        } // :1972-1973
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :1974
        chara(target).kojo.背后位肛交 = 7; // :1974
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1976
        await era.printAndWait(`「啊……好、好哦……再、再来……」`); // :1977
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :1978
        chara(target).kojo.背后位肛交 = 6; // :1978
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1980
        if (rand_n(2) == 0) {
          // :1981
          await era.printAndWait(
            `「好…好棒……魔王大人…你…就喜欢这种地方么…噢哦哦！！」`,
          ); // :1982
        } else {
          // :1983-1984
          await era.printAndWait(`「屁股…好舒服啊～…已经、已经回不去了………」`); // :1984
        } // :1984-1985
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :1986
        chara(target).kojo.背后位肛交 = 5; // :1986
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1988
        await era.printAndWait(`「这，这种姿势插这样的洞洞……好像野兽一样……」`); // :1989
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :1990
        chara(target).kojo.背后位肛交 = 4; // :1990
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1992
        await era.printAndWait(`「这、这样的洞，本宫……本宫居然……有感觉了……」`); // :1993
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :1994
        chara(target).kojo.背后位肛交 = 3; // :1994
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :1996
        await era.printAndWait(`「好、好脏……不要弄那里！」`); // :1997
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :1998
        chara(target).kojo.背后位肛交 = 2; // :1998
      } // :1998-1999
      return 0; // :1998-2000
    } // :1998-2001
  } // :2002-2005

  if (era_flag.selectcom == 28) {
    // :2007

    if (chara(target).kojo.对面座位肛交 == 0) {
      // :2009

      if (era0(`talent:${target}:76`) == 1) {
        // :2011
        await era.printAndWait(`「啊……这样面对面地欺负人家的屁眼啊～……♪」`); // :2012
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2014
        await era.printAndWait(`「这样的地方……嘻嘻，真变态！」`); // :2015
      } else {
        // :2017-2018
        await era.printAndWait(`「哼……不想见到你这家伙的脸……」`); // :2018
      } // :2018-2019
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :2020
      chara(target).kojo.对面座位肛交 = 1; // :2020
      return 0; // :2020-2021
    } else {
      // :2023-2024

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2025
        if (rand_n(3) == 0) {
          // :2026
          await era.printAndWait(`「啊……要融化了……再用力抱本宫啊～」`); // :2027
        } else if (rand_n(2) == 0) {
          // :2028
          await era.printAndWait(`「来嘛……来嘛……看着本宫这下贱的神色……♪」`); // :2029
        } else {
          // :2030-2031
          await era.printAndWait(`「菊穴要融化了……多么美妙啊……♪」`); // :2031
        } // :2031-2032
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :2033
        chara(target).kojo.对面座位肛交 = 7; // :2033
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2035
        await era.printAndWait(`「呵呵……来得好……感觉到了……」`); // :2036
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :2037
        chara(target).kojo.对面座位肛交 = 6; // :2037
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2039
        if (rand_n(2) == 0) {
          // :2040
          await era.printAndWait(`「啊……好棒……哦～♪」`); // :2041
        } else {
          // :2042-2043
          await era.printAndWait(`「再继续弄屁股……往里面去～……♪」`); // :2043
        } // :2043-2044
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :2045
        chara(target).kojo.对面座位肛交 = 5; // :2045
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2047
        await era.printAndWait(
          `「会，会努力的……为了让魔王大人高兴……会让这里也很有感觉……」`,
        ); // :2048
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :2049
        chara(target).kojo.对面座位肛交 = 4; // :2049
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2051
        await era.printAndWait(`「呃……这种……地方……居然有感觉了……」`); // :2052
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :2053
        chara(target).kojo.对面座位肛交 = 3; // :2053
      } else if (
        chara(target).kojo.对面座位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2055
        await era.printAndWait(`「好痛……痛死了！一点都不舒服！快停啊！！」`); // :2056
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :2057
        chara(target).kojo.对面座位肛交 = 2; // :2057
      } // :2057-2058
      return 0; // :2057-2059
    } // :2057-2060
  } // :2061-2064

  if (era_flag.selectcom == 29) {
    // :2066

    if (chara(target).kojo.背面座位肛交 == 0) {
      // :2068

      if (era0(`talent:${target}:76`) == 1) {
        // :2070
        await era.printAndWait(`「呵呵……来吧～……♪」`); // :2071
        await era.printAndWait(`${target_name}扭动着腰，诱惑着你。`); // :2072
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2074
        await era.printAndWait(`「请通过屁股……疼爱本宫吧……♪」`); // :2075
      } else {
        // :2077-2078
        await era.printAndWait(`「你……你这家伙，居然从后面……！」`); // :2078
      } // :2078-2079
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :2080
      chara(target).kojo.背面座位肛交 = 1; // :2080
      return 0; // :2080-2081
    } else {
      // :2083-2084

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2085
        if (rand_n(2) == 0) {
          // :2086
          await era.printAndWait(`「啊……被从后……贯穿啦～♪」`); // :2087
        } else {
          // :2088-2089
          await era.printAndWait(`「好棒……好棒……便便的洞，还能这么用～♪」`); // :2089
        } // :2089-2090
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :2091
        chara(target).kojo.背面座位肛交 = 7; // :2091
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2093
        await era.printAndWait(`「嘻嘻……菊花也是好东西呢～」`); // :2094
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :2095
        chara(target).kojo.背面座位肛交 = 6; // :2095
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2097
        if (rand_n(2) == 0) {
          // :2098
          await era.printAndWait(`「啊……好有快感……用这样的地方……」`); // :2099
        } else {
          // :2100-2101
          await era.printAndWait(
            `「为了魔王大人……用下流的地方……做下流的事了……」`,
          ); // :2101
        } // :2101-2102
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :2103
        chara(target).kojo.背面座位肛交 = 5; // :2103
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2105
        await era.printAndWait(`「还是有点痛……会习惯的……」`); // :2106
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :2107
        chara(target).kojo.背面座位肛交 = 4; // :2107
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2109
        await era.printAndWait(`「被弄这地方……居然有快感了……」`); // :2110
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :2111
        chara(target).kojo.背面座位肛交 = 3; // :2111
      } else if (
        chara(target).kojo.背面座位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2113
        await era.printAndWait(`「呃啊！……真的只有痛楚啦……！」`); // :2114
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :2115
        chara(target).kojo.背面座位肛交 = 2; // :2115
      } // :2115-2116
      return 0; // :2115-2117
    } // :2115-2118
  } // :2119-2122

  if (era_flag.selectcom == 30) {
    // :2124

    if (chara(target).kojo.手淫 == 0) {
      // :2126

      if (era0(`talent:${target}:76`) == 1) {
        // :2128
        await era.printAndWait(`「这样一直用手搓，真的会有奶油溢出来的么♪」`); // :2129
        await era.printAndWait(
          `「哈啊，让本宫这么为你侍奉，以前的话可是直接会被献祭掉的哟～♪」`,
        ); // :2130
        await era.printAndWait(
          `「嘛无所谓啦，比起这个，只打算让自己一个人舒服的么…………♪」`,
        ); // :2131
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2133
        await era.printAndWait(
          `「这个……就是叫做“手交”的吧……能让魔王大人您开心，本宫可以的哟！♪」`,
        ); // :2134
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2136
        await era.printAndWait(
          `「只……只是用手套弄一下的话……本宫……也……不是不可以……」`,
        ); // :2137
      } else {
        // :2139-2140
        await era.printAndWait(
          `「哈啊……你这蛆虫不怕本宫把这个恶心的东西掰断吗，真是……下流呢」`,
        ); // :2140
      } // :2140-2141
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :2142
      chara(target).kojo.手淫 = 1; // :2142
      return 0; // :2142-2143
    } else {
      // :2145-2146

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2147
        if (rand_n(2) == 0) {
          // :2148
          await era.printAndWait(
            `「您舒服了以后…一定要让本宫也享～～～～受到极乐呢…魔王大人♪」`,
          ); // :2149
        } else {
          // :2150-2151
          await era.printAndWait(`「在为放到本宫的身体里做准备吗？～♪」`); // :2151
        } // :2151-2152
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :2153
        chara(target).kojo.手淫 = 6; // :2153
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2155
        if (rand_n(2) == 0) {
          // :2156
          await era.printAndWait(
            `「本宫会……会好好地侍奉魔王大人的……只是有点小害羞呢～♪」`,
          ); // :2157
        } else {
          // :2158-2159
          await era.printAndWait(`「还……舒服……么……？」`); // :2159
        } // :2159-2160
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :2161
        chara(target).kojo.手淫 = 5; // :2161
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2163
        await era.printAndWait(
          `「哈啊……虽然本宫是说过为了魔王大人什么都可以做来着……」`,
        ); // :2164
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :2165
        chara(target).kojo.手淫 = 4; // :2165
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2167
        await era.printAndWait(
          `「本宫……知道了啊……稍微弄一下也不是不可以……为什么会要本宫做这种事……切」`,
        ); // :2168
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :2169
        chara(target).kojo.手淫 = 3; // :2169
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :2171
        await era.printAndWait(`「真的会掰断的！！你……你不要太过分了！！」`); // :2172
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :2173
        chara(target).kojo.手淫 = 2; // :2173
      } // :2173-2174
      return 0; // :2173-2175
    } // :2173-2176
  } // :2177-2180

  if (era_flag.selectcom == 31) {
    // :2182

    if (chara(target).kojo.口交_奴 == 0) {
      // :2184

      if (era0(`talent:${target}:76`) == 1) {
        // :2186
        await era.printAndWait(
          `「以为是什么好玩的事情……只是让本宫吸那里而已的吗？」`,
        ); // :2187
        await era.printAndWait(`「快点让本宫也…………」`); // :2188
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2190
        await era.printAndWait(
          `「唔……魔王大人喜欢就好……明明这里味道很糟糕呢……但是为了魔王大人……本宫……稍微……试一下也不是不可以……」`,
        ); // :2191
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2193
        await era.printAndWait(
          `「只，只是舔一下的话……但是让本宫做这种事……实在是，过分呢……」`,
        ); // :2194
      } else {
        // :2196-2197
        await era.printAndWait(
          `「舔这个！？你这下贱的魔族不担心本宫直接咬断它么？！」`,
        ); // :2197
      } // :2197-2198
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :2199
      chara(target).kojo.口交_奴 = 1; // :2199
      return 0; // :2199-2200
    } else {
      // :2202-2203

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2204
        await era.printAndWait(
          `「只要魔王大人喜欢，本宫怎～～～么样都没有问题的哦～」`,
        ); // :2205
        await era.print(`「今天的牛奶，会是什么味道的呢～～」`); // :2206
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :2207
        chara(target).kojo.口交_奴 = 6; // :2207
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2209
        await era.printAndWait(`「不要光是让你舒服～也让本宫开心一下嘛～～」`); // :2210
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :2211
        chara(target).kojo.口交_奴 = 5; // :2211
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2213
        await era.printAndWait(
          `「魔王大人……想射的时候，随时可以射出来哦～本宫会好好地接住的！」`,
        ); // :2214
        await era.print(
          `${target_name}充满爱意地将阴茎含入嘴里，头部有节奏地运动着。`,
        ); // :2215
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :2216
        chara(target).kojo.口交_奴 = 4; // :2216
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2218
        await era.printAndWait(
          `「哈……这个东西的味道本宫不很喜欢的啦……乱动的话随时会咬到的哦……」`,
        ); // :2219
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :2220
        chara(target).kojo.口交_奴 = 3; // :2220
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :2222
        await era.printAndWait(`「真……讨厌……好臭…………」`); // :2223
        await era.printAndWait(`「让本宫…………做这种……………」`); // :2224
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :2225
        chara(target).kojo.口交_奴 = 2; // :2225
      } // :2225-2226
      return 0; // :2225-2227
    } // :2225-2228
  } // :2229-2232

  if (era_flag.selectcom == 32) {
    // :2234

    if (chara(target).kojo.乳交 == 0) {
      // :2236

      if (era0(`talent:${target}:76`) == 1) {
        // :2238
        await era.printAndWait(`「啊～本宫的胸部～也相当敏感的哟～～♪」`); // :2239
        await era.printAndWait(`「这样的话能让两个人……一起……有趣的玩法呢♪」`); // :2240
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2242
        await era.printAndWait(`「这……这不是胸部的本职工作啦～♪」`); // :2243
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2245
        await era.printAndWait(
          `「哈……不知羞耻呢……居然让本宫用胸部……帮你按摩……」`,
        ); // :2246
        await era.printAndWait(`「啊啊啊啊知道了啊！！！」`); // :2247
      } else {
        // :2249-2250
        await era.printAndWait(`「这种事只是想想就……」`); // :2250
        await era.printAndWait(
          `「适可而止吧人类，本宫的胸部岂是你们这些下等种族能碰的……而且还是……拿……」`,
        ); // :2251
        await era.printAndWait(`「生祭！生祭！！！」`); // :2252
      } // :2252-2253
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :2254
      chara(target).kojo.乳交 = 1; // :2254
      return 0; // :2254-2255
    } else {
      // :2257-2258

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2259
        if (rand_n(2) == 0) {
          // :2260
          await era.printAndWait(
            `「舒服么……？嘻嘻～感觉胸部都开始变烫了～……」`,
          ); // :2261
          await era.printAndWait(`「就这样一起去吧！！～～～」`); // :2262
        } else {
          // :2263-2264
          await era.printAndWait(`「柔软么？到底是什么样的感觉呢？」`); // :2264
          await era.printAndWait(`「本宫的胸部可是……很舒服呢～～～」`); // :2265
        } // :2265-2266
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :2267
        chara(target).kojo.乳交 = 6; // :2267
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2269
        await era.printAndWait(`「喜欢用胸部啊……？感觉也不坏啦～～～」`); // :2270
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :2271
        chara(target).kojo.乳交 = 5; // :2271
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2273
        if (rand_n(2) == 0) {
          // :2274
          await era.printAndWait(
            `「舒服的话，射出来也没关系哦！……本宫～没关系的♪」`,
          ); // :2275
          await era.printAndWait(`「本宫……也很舒服……来着～」`); // :2276
        } else {
          // :2277-2278
          await era.printAndWait(
            `「魔王大人，舒服么……？很柔软吧？本宫的胸部，就是为了服侍魔王大人的……」`,
          ); // :2278
        } // :2278-2279
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :2280
        chara(target).kojo.乳交 = 4; // :2280
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2282
        await era.printAndWait(
          `「只是夹着就好了……哈，被那个东西凑得这么近呢……」`,
        ); // :2283
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :2284
        chara(target).kojo.乳交 = 3; // :2284
      } else if (chara(target).kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        // :2286
        await era.printAndWait(`「用胸部摩擦……还把那个东西凑得这么近……」`); // :2287
        await era.printAndWait(`「为什么本宫要做这种事……」`); // :2288
        await era.printAndWait(`${target_name}的眼眶有些湿润`); // :2289
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :2290
        chara(target).kojo.乳交 = 2; // :2290
      } // :2290-2291
      return 0; // :2290-2292
    } // :2290-2293
  } // :2294-2297

  if (era_flag.selectcom == 33) {
    // :2299

    if (chara(target).kojo.股间性交 == 0) {
      // :2301

      if (era0(`talent:${target}:76`) == 1) {
        // :2303
        await era.printAndWait(`「哦！还有这种玩法啊……！」`); // :2304
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2306
        await era.printAndWait(`「哈啊……好奇怪的姿势呢～」`); // :2307
        await era.printAndWait(`「魔王大人喜欢的话……本宫倒也……」`); // :2308
        await era.printAndWait(`「但是真的好害羞啊……」`); // :2309
      } else {
        // :2311-2312
        await era.printAndWait(`「你这蛆虫！禽兽！」`); // :2312
        await era.printAndWait(`「难道是……想要捅进来吗！？」`); // :2313
        await era.printAndWait(`「放开本宫啊！放手！」`); // :2314
      } // :2314-2315
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :2316
      chara(target).kojo.股间性交 = 1; // :2316
      return 0; // :2316-2317
    } else {
      // :2319-2320

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2321
        await era.printAndWait(
          `「只是用这里摩擦就满足了吗？明明还可以有更深入的玩法的说～！」`,
        ); // :2322
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :2323
        chara(target).kojo.股间性交 = 6; // :2323
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2325
        await era.printAndWait(`「摩擦摩擦～……真舒服～♪」`); // :2326
        await era.printAndWait(`「插进来也可以的哟～～」`); // :2327
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :2328
        chara(target).kojo.股间性交 = 5; // :2328
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2330
        await era.printAndWait(
          `「本宫……还一直没有过第一次……不过是魔王大人的话，大概，也没问题的吧～」`,
        ); // :2331
        await era.printAndWait(
          `「真的只是让本宫这样擦一擦就好了么？魔王大人真是有点奇怪的人呢」`,
        ); // :2332
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :2333
        chara(target).kojo.股间性交 = 4; // :2333
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2335
        await era.printAndWait(`「魔王大人你喜欢的话……怎样都好啦……」`); // :2336
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :2337
        chara(target).kojo.股间性交 = 3; // :2337
      } else if (chara(target).kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        // :2339
        await era.printAndWait(`「如果……不捅进来的话……」`); // :2340
        await era.printAndWait(`「……即使不捅进来！这样的行为也……」`); // :2341
        await era.printAndWait(`「总有一天你会被本宫碎尸万段的！」`); // :2342
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :2343
        chara(target).kojo.股间性交 = 2; // :2343
      } // :2343-2344
      return 0; // :2343-2345
    } // :2343-2346
  } // :2347-2350

  if (era_flag.selectcom == 34) {
    // :2352

    if (chara(target).kojo.骑乘位 == 0) {
      // :2354

      if (era0(`talent:${target}:0`) == 1) {
        // :2356

        if (era0(`talent:${target}:76`) == 1) {
          // :2358
          await era.printAndWait(
            `「让未经人事的本宫自己坐上来把第一次给你啊……」`,
          ); // :2359
          await era.printAndWait(`「真是了不得的恶趣味呢……魔～王～大～人～」`); // :2360
          await era.printAndWait(
            `「嘛对本宫来说大概更方便呢，毕竟，主动权在本宫哦～」`,
          ); // :2361
          await era.printAndWait(
            `「如～果～不～能～让～本～宫～好～好～开～心～一～下～的～话～」`,
          ); // :2362
          await era.printAndWait(`${target_name}的眼睛里闪烁着魅惑的光芒`); // :2363
          await era.printAndWait(
            `「就把你保持这样的姿势做成本宫专用的玩具哦～～～哼哼呵～」`,
          ); // :2364
        } else if (era0(`talent:${target}:85`) == 1) {
          // :2366
          await era.printAndWait(
            `「让未经人事的本宫自己坐上来把第一次给你啊……」`,
          ); // :2367
          await era.printAndWait(
            `「尽管喜欢着魔王大人，但这种事情果然还是有点……」`,
          ); // :2368
          await era.printAndWait(`「……知道了，本宫会尽力的……」`); // :2369
          await era.printAndWait(`「因为，本宫啊，是魔王大人的啊…………」`); // :2370
          await era.printAndWait(
            `「不过要是被本宫知道了魔王大人的身上被其他女孩子坐过了的话…………」`,
          ); // :2371
          await era.printAndWait(`「呐～不会发生的吧？」`); // :2372
          await era.printAndWait(
            `${target_name}眼里闪着奇怪的光芒，咬着牙慢慢把你的阴茎放进小穴里，开始运动了`,
          ); // :2373
        } else {
          // :2375-2376
          await era.printAndWait(`「………………」`); // :2376
          await era.printAndWait(
            `听了你的命令后，${target_name}低着头沉默不语`,
          ); // :2377
          await era.printAndWait(`「…………真的…………是个变态呢…………」`); // :2378
          await era.printAndWait(
            `「你这蛆虫，把本宫当作什么来看待了呢！！……让本宫自己坐上来……把处女交给你这样的蛆虫……」`,
          ); // :2379
          await era.printAndWait(`「已经，不是生祭掉就可以还清的罪过了……」`); // :2380
          await era.printAndWait(
            `「…………用神力把大脑剥出来……一边修复一边撕扯……让你享受永世不得休息的地狱之苦才能偿还得了你的罪恶啊啊啊啊啊啊啊啊…………」`,
          ); // :2381
          await era.printAndWait(`「…………但是…………现在……」`); // :2382
          await era.printAndWait(`${target_name}低着头，浑身散发出危险的气息`); // :2383
          await era.printAndWait(
            `不过面对着被刻着力量封印的她，对于你而言，那些气息也仅仅只是气息罢了`,
          ); // :2384
          await era.printAndWait(
            `${target_name}或许也明白这一点，没有反抗力量的她，像是放弃了什么似的，抬起了头，眼里含着泪水，却是一副极度憎恶的表情`,
          ); // :2385
          await era.printAndWait(`「……只是坐上去而已对吧！」`); // :2386
          await era.printAndWait(
            `${target_name}把你按倒在地，粗暴地骑在了你的身上，握着你的阴茎慢慢对准了自己小穴，深吸了一口气，一口气坐了下去`,
          ); // :2387
          await era.printAndWait(`「……好……不甘心…………」泪水夺眶而出`); // :2388
        } // :2388-2389
      } else {
        // :2391-2392

        if (era0(`talent:${target}:76`) == 1) {
          // :2393
          await era.printAndWait(`「让本宫自己坐上来啊～」`); // :2394
          await era.printAndWait(`「太激烈了不要怪本宫哦～」`); // :2395
          await era.printAndWait(`${target_name}迫不及待地沉下了腰……`); // :2396
        } else if (era0(`talent:${target}:85`) == 1) {
          // :2398
          await era.printAndWait(`「喜欢这样子吗～」`); // :2399
          await era.printAndWait(`「知道了，本宫会照顾好魔王大人的呢～」`); // :2400
        } else {
          // :2402-2403
          await era.printAndWait(`「…………真的…………是个变态呢…………」`); // :2403
          await era.printAndWait(
            `「你这蛆虫，把本宫当作什么来看待了呢！！……让本宫自己坐上来什么的……」`,
          ); // :2404
          await era.printAndWait(`${target_name}低着头沉默不语，想着些什么`); // :2405
          await era.printAndWait(`「……只是坐上去而已对吧！」`); // :2406
          await era.printAndWait(
            `${target_name}把你按倒在地，粗暴地骑在了你的身上一口气坐了下去`,
          ); // :2407
          await era.printAndWait(`「……可恶啊……」${target_name}的眼眶湿润了`); // :2408
        } // :2408-2409
      } // :2410-2411
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :2411
      chara(target).kojo.骑乘位 = 1; // :2411
      return 0; // :2411-2412
    } else {
      // :2414-2415

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2416
        if (rand_n(4) == 0) {
          // :2417
          await era.printAndWait(`「魔王大人只是躺着而已，这么轻松啊～」`); // :2418
          await era.printAndWait(`「怎样，本宫的小穴还舒服吗？」`); // :2419
        } else if (rand_n(3) == 0) {
          // :2420
          await era.printAndWait(
            `「欸，你也稍微用点力的嘛，只是本宫一个人在动稍微有点无聊呢」`,
          ); // :2421
        } else if (rand_n(2) == 0) {
          // :2422
          await era.printAndWait(`「哈啊……哈啊……好想快点……高潮……嗯…………」`); // :2423
        } else {
          // :2424-2425
          await era.printAndWait(`「躺好不要乱动啦，本宫知道怎么做的啦～」`); // :2425
        } // :2425-2426
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :2427
        chara(target).kojo.骑乘位 = 6; // :2427
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2429
        if (rand_n(4) == 0) {
          // :2430
          await era.print(`「魔王大人……请躺好吧～本宫…可以做好的！～」`); // :2431
        } else if (rand_n(3) == 0) {
          // :2432
          await era.printAndWait(
            `「哼哼～你也要用力地往上顶哦～！……本宫啊…其实这样子也不是特别讨厌啦…」`,
          ); // :2433
        } else if (rand_n(2) == 0) {
          // :2434
          await era.printAndWait(
            `「本宫很重吗？感觉…进去了好深呢～哈啊…本宫明明…不能这个样子追求快乐啊………但是……」`,
          ); // :2435
        } else {
          // :2436-2437
          await era.printAndWait(
            `「只是坐上来……就很有感觉了呢……这就是……爱的力量吗…………」`,
          ); // :2437
        } // :2437-2438
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :2439
        chara(target).kojo.骑乘位 = 5; // :2439
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2441
        if (rand_n(4) == 0) {
          // :2442
          await era.printAndWait(`「呃～啊～！……腰、腰自己动起来了……」`); // :2443
        } else if (rand_n(3) == 0) {
          // :2444
          await era.printAndWait(`「有什么在脑子里冲撞着……」`); // :2445
        } else if (rand_n(2) == 0) {
          // :2446
          await era.printAndWait(`「唔！又被捅进里面了……好深啊……」`); // :2447
        } else {
          // :2448-2449
          await era.printAndWait(
            `「不要啦！～再这么往上顶的话……的话……本宫会……」`,
          ); // :2449
        } // :2449-2450
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :2451
        chara(target).kojo.骑乘位 = 4; // :2451
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2453
        await era.print(
          `${target_name}遵从着命令，跨坐在${player_name}的身上，把阴茎吞入体内了。`,
        ); // :2454
        await era.printAndWait(
          `「又让本宫自己坐上来呢……好想趁这机会掐死你呢……」`,
        ); // :2455
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :2456
        chara(target).kojo.骑乘位 = 3; // :2456
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2458
        await era.printAndWait(
          `「哈啊……让本宫自己坐上去……绝对……绝对不可能的！！！」`,
        ); // :2459
        await era.printAndWait(
          `${target_name}眼里迸发出少许的泪水，在你再三命令下终于坐了上来`,
        ); // :2460

        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :2462
        chara(target).kojo.骑乘位 = 2; // :2462
      } // :2462-2463
      return 0; // :2462-2464
    } // :2462-2465
  } // :2466-2469

  if (era_flag.selectcom == 35) {
    // :2471

    if (chara(target).kojo.全身擦洗 == 0) {
      // :2473

      if (era0(`abl:${target}:16`) >= 3) {
        // :2475
        await era.printAndWait(
          `「没办法呢……如果只是帮你……擦擦身而已…本宫也不是不能做…」`,
        ); // :2476
        await era.printAndWait(`「所以说这种事为什么要让本宫来啊………」`); // :2477
      } else {
        // :2479-2480
        await era.printAndWait(
          `「把……把本宫当作什么人了啊……侍奉别人洗浴，还要帮人擦洗干净……这完全就是女仆了啊！」`,
        ); // :2480
        await era.printAndWait(`${target_name}眼睛里有少许的怒气，闹着别扭`); // :2481
        await era.printAndWait(`「啊啊啊啊知道了啊，只是擦一下的话……」`); // :2482
      } // :2482-2483
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :2484
      chara(target).kojo.全身擦洗 = 1; // :2484
      return 0; // :2484-2485
    } else {
      // :2487-2488

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2489
        await era.printAndWait(
          `「帮魔王大人你洗干净了呢，之后和本宫一起好～好玩一下吧～～～」`,
        ); // :2490
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :2491
        chara(target).kojo.全身擦洗 = 5; // :2491
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2493
        await era.printAndWait(
          `「只是擦洗一下就好了么？魔王大人这么辛苦，这样怎么够呢，交给本宫吧～」`,
        ); // :2494
        await era.printAndWait(
          `${target_name}认真地清理着你身上的每一处皮肤和容易积攒污垢的地方，用温柔的手法又帮你做了按摩`,
        ); // :2495
        await era.printAndWait(
          `「不要让本宫在你身上找到来源不明的东西哦～～～」`,
        ); // :2496
        await era.printAndWait(`不知怎的，你感觉一股寒气在身上游走`); // :2497
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :2498
        chara(target).kojo.全身擦洗 = 4; // :2498
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2500
        await era.printAndWait(
          `「为什么非要让本宫做这种事……你这下贱的魔族用不起女仆，连自己做清洁都做不到么」`,
        ); // :2501
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :2502
        chara(target).kojo.全身擦洗 = 3; // :2502
      } else if (chara(target).kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        // :2504
        await era.printAndWait(
          `「……把这层皮下面的肉都搓掉的话，不要怪本宫没有警告过……!」`,
        ); // :2505
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :2506
        chara(target).kojo.全身擦洗 = 2; // :2506
      } // :2506-2507
      return 0; // :2506-2508
    } // :2506-2509
  } // :2510-2513

  if (era_flag.selectcom == 36) {
    // :2515

    if (chara(target).kojo.骑乘位肛交 == 0) {
      // :2517

      if (era0(`talent:${target}:76`) == 1) {
        // :2519
        await era.printAndWait(`「哦哦哦魔王大人，躺下吧……让本宫来！！」`); // :2520
        await era.printAndWait(`「本宫用菊花慢慢把那里吞进去了哦～……♪」`); // :2521
        await era.printAndWait(`${target_name}慢慢用温柔的方式沉下了腰……`); // :2522
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2524
        await era.printAndWait(
          `「${target_name}啊……是魔王大人的呢……你喜欢的话……这里当然也是……」`,
        ); // :2525
        await era.printAndWait(
          `「啊……本…本宫的菊花…把魔王大人…吞进去了…还舒服吗？」`,
        ); // :2526
        await era.printAndWait(
          `${target_name}慢慢地沉下了腰，将${player_name}的阴茎吞入了。`,
        ); // :2527
      } else {
        // :2529-2530
        await era.printAndWait(`${target_name}听了很不情愿地坐在了你的身上`); // :2530
        await era.printAndWait(`「好讨厌啊……这样的感觉……」`); // :2531
        await era.printAndWait(
          `「本宫的那里……明明不是用来做这种事的啊啊啊！……」`,
        ); // :2532
        await era.printAndWait(`她略带哭腔地抱怨着`); // :2533
      } // :2533-2534
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :2535
      chara(target).kojo.骑乘位肛交 = 1; // :2535
      return 0; // :2535-2536
    } else {
      // :2538-2539

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2540
        if (rand_n(2) == 0) {
          // :2541
          await era.printAndWait(`「看哦！整根插进去啦哦……！」`); // :2542
          await era.printAndWait(`「唔～哦～！在里面……闹腾着～♪」`); // :2543
        } else {
          // :2544-2545
          await era.printAndWait(`「便便的地方被欺负了……受不了啦～～」`); // :2545
          await era.printAndWait(`「要本宫再摇动屁股么？噢～～……♪」`); // :2546
        } // :2546-2547
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}跨坐在${player_name}的身上，腰身扭动出淫秽的舞蹈。`,
        ); // :2548
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :2549
        chara(target).kojo.骑乘位肛交 = 7; // :2549
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2551
        await era.printAndWait(`「呃～……本宫～还不是很习惯拿这里玩呢………」`); // :2552
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}有节奏地起伏着身体。`,
        ); // :2553
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :2554
        chara(target).kojo.骑乘位肛交 = 6; // :2554
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2556
        if (rand_n(2) == 0) {
          // :2557
          await era.printAndWait(`「魔王大人……本宫的菊穴，舒服吗……？」`); // :2558
          await era.printAndWait(`「本宫……确实已经有感觉了哟～♪」`); // :2559
        } else {
          // :2560-2561
          await era.printAndWait(`「嘻嘻～魔王大人……本宫的屁股，还满意么？」`); // :2561
          await era.printAndWait(
            `「好舒服～……啊～！可以再继续～本宫可以的……♪」`,
          ); // :2562
        } // :2562-2563
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}跨坐在${player_name}的身上，用力夹紧，不停抽动着。`,
        ); // :2564
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :2565
        chara(target).kojo.骑乘位肛交 = 5; // :2565
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2567
        await era.printAndWait(
          `「再用力地夹紧会更好些吗……还不是………很习惯从这里……」`,
        ); // :2568
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}有节奏地起伏着身体。`,
        ); // :2569
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :2570
        chara(target).kojo.骑乘位肛交 = 4; // :2570
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2572
        await era.printAndWait(
          `「明明很讨厌这样的……为什么本宫现在……啊……啊啊♪」`,
        ); // :2573
        await era.printAndWait(
          `尻穴持续地侍奉着阴茎，${target_name}扭动着腰肢，追求着快感。`,
        ); // :2574
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :2575
        chara(target).kojo.骑乘位肛交 = 3; // :2575
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2577
        await era.printAndWait(`「明明……不是拿来做这种事的啊！！！！」`); // :2578
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :2579
        chara(target).kojo.骑乘位肛交 = 2; // :2579
      } // :2579-2580
      return 0; // :2579-2581
    } // :2579-2582
  } // :2583-2586

  if (era_flag.selectcom == 37) {
    // :2588

    if (chara(target).kojo.肛门侍奉 == 0) {
      // :2590

      if (era0(`abl:${target}:16`) >= 3) {
        // :2592
        await era.printAndWait(`「为什么要让本宫干这种！…………………」`); // :2593
        await era.printAndWait(`「啊啊啊啊知道了啊啊啊啊啊！！」`); // :2594
      } else {
        // :2596-2597
        await era.printAndWait(`「为什么要让本宫干这种！…………………」`); // :2597
        await era.printAndWait(`${target_name}听了你的话情绪激动了起来`); // :2598
        await era.printAndWait(`「蛆虫！变态！禽兽！！！本宫永远也不会……」`); // :2599
        await era.printAndWait(
          `但是${target_name}现在没有反抗的立场，在你的再三命令和威逼下，${target_name}的态度软了下来，开始照做了`,
        ); // :2600
        await era.printAndWait(`「…………杀了你………」`); // :2601
      } // :2601-2602
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :2603
      chara(target).kojo.肛门侍奉 = 1; // :2603
      return 0; // :2603-2604
    } else {
      // :2606-2607

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2608
        await era.printAndWait(
          `「嘻嘻，舒服么？舌头，要往里伸进去了哦……！这种玩法好像也挺有趣来着」`,
        ); // :2609
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :2610
        chara(target).kojo.肛门侍奉 = 5; // :2610
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2612
        await era.print(`「会帮魔王大人……那个……清洁一下的…………」`); // :2613
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :2614
        chara(target).kojo.肛门侍奉 = 4; // :2614
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2616
        await era.printAndWait(`「好吧……不过……还是挺……你真恶心呢」`); // :2617
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :2618
        chara(target).kojo.肛门侍奉 = 3; // :2618
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :2620
        await era.printAndWait(`「可恶……这种事……不做也没关系吧……」`); // :2621
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :2622
        chara(target).kojo.肛门侍奉 = 2; // :2622
      } // :2622-2623
      return 0; // :2622-2624
    } // :2622-2625
  } // :2626-2629

  if (era_flag.selectcom == 40) {
    // :2631

    if (chara(target).kojo.打屁股 == 0) {
      // :2633
      await era.printAndWait(
        `「停！停手！本宫很痛啊！快停手！啊啊啊！哈……啊啊！」`,
      ); // :2634
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :2635
      chara(target).kojo.打屁股 = 1; // :2635
      return 0; // :2635-2636
    } else {
      // :2638-2639

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2640
        await era.printAndWait(
          `「啊～！啊～！这样玩意外的有感觉呢！！再，再更用力地打本宫吧！还……完全不够啊～♪」`,
        ); // :2641
        await era.printAndWait(
          `${target_name}流着口水，屁股不安分地扭来扭去。`,
        ); // :2642
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :2643
        chara(target).kojo.打屁股 = 5; // :2643
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2645
        await era.printAndWait(
          `「本宫是不是又做错什么了呢……！哈……但是明明很痛……却好开心～啊……魔王大人♪」`,
        ); // :2646
        await era.printAndWait(
          `${target_name}满脸红晕，屁股不安分地扭来扭去。`,
        ); // :2647
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :2648
        chara(target).kojo.打屁股 = 4; // :2648
        return 0; // :2648-2649
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2651
        await era.printAndWait(
          `「哼…只是这点小痛罢了呢…本宫……还远远没到极限呢…哈啊!…」`,
        ); // :2652
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :2653
        chara(target).kojo.打屁股 = 3; // :2653
        return 0; // :2653-2654
      } else if (chara(target).kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        // :2656
        await era.printAndWait(
          `「停……停手啊啊！啊……这种屈辱……这种疼痛……啊！……总有一天要让你加倍奉还的啊啊啊！……痛啊！……快住手啊……」`,
        ); // :2657
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :2658
        chara(target).kojo.打屁股 = 2; // :2658
      } // :2658-2659
      return 0; // :2658-2660
    } // :2658-2661
  } // :2662-2665

  if (era_flag.selectcom == 41) {
    // :2667

    if (chara(target).kojo.鞭 == 0) {
      // :2669

      if (era0(`talent:${target}:76`) == 1) {
        // :2671
        await era.printAndWait(
          `「欸？鞭打？皮肉之苦什么的……本宫如果能少受一点……」`,
        ); // :2672
        await era.printAndWait(`「会很有快感？好吧，既然你这样说了……」`); // :2673
        await era.printAndWait(`「轻一点哦，骗本宫的话会有惩罚的哦～」`); // :2674
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2676
        await era.printAndWait(
          `「欸？鞭打？为什么……本宫明明已经是魔王大人的了……」`,
        ); // :2677
        await era.printAndWait(`「啊只要魔王大人喜欢的话……那也没办法呢」`); // :2678
        await era.printAndWait(`「呐…………轻一点哦，本宫很怕疼的……」`); // :2679
      } else {
        // :2681-2682
        await era.printAndWait(
          `「本宫！本宫不是你的奴隶！只是……啊！……只是被鞭打几下罢了！……啊！……你这蛆虫，以为这能改变什么吗！！！！总有一天要报仇的！！啊！……」`,
        ); // :2682
      } // :2682-2683
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :2684
      chara(target).kojo.鞭 = 1; // :2684
      return 0; // :2684-2685
    } else {
      // :2687-2688

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2689
        await era.printAndWait(`「好痛！好爽！～继续！继续啊～！！」`); // :2690
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :2691
        chara(target).kojo.鞭 = 9; // :2691
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2693
        await era.printAndWait(
          `「虽然很痛！但是鞭子打到的地方麻麻的！啊啊啊感觉整个人都要烧起来了啊啊啊好舒服！……啊！」`,
        ); // :2694
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :2695
        chara(target).kojo.鞭 = 8; // :2695
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2697
        await era.printAndWait(
          `「啊～这真的，非常……痛啊……你真的……没有骗本宫…的吗？……」`,
        ); // :2698
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :2699
        chara(target).kojo.鞭 = 7; // :2699
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2701
        await era.printAndWait(
          `「啊！啊！！好痛！…………本宫…喜欢…魔王大人！……连这鞭打也……喜欢！！…啊啊啊！！…喜欢！！」`,
        ); // :2702
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :2703
        chara(target).kojo.鞭 = 6; // :2703
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2705
        await era.printAndWait(
          `「明明这么痛……却渐渐有感觉了……这就是…爱的吗？……」`,
        ); // :2706
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :2707
        chara(target).kojo.鞭 = 5; // :2707
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2709
        await era.printAndWait(`「啊！！……为了魔王大人，本宫……会忍耐的……」`); // :2710
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :2711
        chara(target).kojo.鞭 = 4; // :2711
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2713
        await era.printAndWait(
          `「啊！！啊！！……被这么虐待……本宫居然……开始……」`,
        ); // :2714
        await era.printAndWait(`「好不甘心啊啊啊啊啊啊！！…」`); // :2715
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :2716
        chara(target).kojo.鞭 = 3; // :2716
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2718
        await era.printAndWait(
          `「没……没用的！……只是…这种…程度…罢…罢了！……啊！！」`,
        ); // :2719
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :2720
        chara(target).kojo.鞭 = 2; // :2720
      } // :2720-2721
      return 0; // :2720-2722
    } // :2720-2723
  } // :2724-2727

  if (era_flag.selectcom == 42) {
    // :2729

    if (chara(target).kojo.针 == 0) {
      // :2731

      if (era0(`talent:${target}:76`) == 1) {
        // :2733
        await era.printAndWait(`「欸？针……的吗？…这个大概只会痛的吧…」`); // :2734
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2736
        await era.printAndWait(
          `「呜呜……这都是为了魔王大人……这都是为了魔王大人………但是请…下手轻一点好吗……」`,
        ); // :2737
      } else {
        // :2739-2740
        await era.printAndWait(`「哈……没！没用的！！你已经……丧心病狂了啊……」`); // :2740
      } // :2740-2741
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :2742
      chara(target).kojo.针 = 1; // :2742
      return 0; // :2742-2743
    } else {
      // :2745-2746

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2747
        await era.printAndWait(
          `「啊～这令人上瘾的刺痛……本宫要疯掉了！！扎深一点！！继续！！」`,
        ); // :2748
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :2749
        chara(target).kojo.针 = 9; // :2749
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2751
        await era.printAndWait(
          `「痛……！！身上的针眼越来越多了呢……但是…有点…上瘾了呢……这痛感……」`,
        ); // :2752
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :2753
        chara(target).kojo.针 = 8; // :2753
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2755
        await era.printAndWait(
          `「真的，会有快感的吗？说谎的话就请把这些针吃下去吧…本宫真的很痛的啊…」`,
        ); // :2756
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :2757
        chara(target).kojo.针 = 7; // :2757
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2759
        await era.printAndWait(
          `「魔王大人的爱……也蕴藏在这一根根的针里……的吗？……虽然很痛，但是…………好…………好开心…………」`,
        ); // :2760
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :2761
        chara(target).kojo.针 = 6; // :2761
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2763
        await era.printAndWait(
          `「痛！！！！……但是……竟然……会感觉很舒服？？？？」`,
        ); // :2764
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :2765
        chara(target).kojo.针 = 5; // :2765
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2767
        await era.printAndWait(
          `「好痛啊啊啊！本宫不太明白啊啊！为什么！魔王大人的爱要用这样激烈的方式来表达啊啊！」`,
        ); // :2768
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :2769
        chara(target).kojo.针 = 4; // :2769
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2771
        await era.printAndWait(
          `「明明这么痛……心里却在欢迎……天啊……本宫…究竟………」`,
        ); // :2772
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :2773
        chara(target).kojo.针 = 3; // :2773
      } else if (chara(target).kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // :2775
        await era.printAndWait(`「住手啊啊！！血！血流出来了啊啊！」`); // :2776
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :2777
        chara(target).kojo.针 = 2; // :2777
      } // :2777-2778
      return 0; // :2777-2779
    } // :2777-2780
  } // :2781-2784

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :2787

    if (chara(target).kojo.眼罩 == 0) {
      // :2789

      if (era0(`talent:${target}:76`) == 1) {
        // :2791
        await era.printAndWait(
          `「欸？把本宫的眼睛蒙上想要做些什么激烈的事吗？～」`,
        ); // :2792
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2794
        await era.printAndWait(
          `「欸？把本宫的眼睛盖住……难道是要去找别的女孩子了么？真的么！！！？？」`,
        ); // :2795
        await era.printAndWait(
          `「啊哈哈，你还在啊……本宫刚才在说些什么呢……真是……」`,
        ); // :2796
      } else {
        // :2798-2799
        await era.printAndWait(
          `「哈？连被本宫直视的勇气都丧失了么，真是最差劲的低等生物」`,
        ); // :2799
      } // :2799-2800
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :2801
      chara(target).kojo.眼罩 = 1; // :2801
      return 0; // :2801-2802
    } else {
      // :2804-2805

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2806
        await era.printAndWait(
          `「只是…被强行盖住眼睛…本宫就开始想着各种各样的玩法…开始兴奋了呢…♪」`,
        ); // :2807
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :2808
        chara(target).kojo.眼罩 = 9; // :2808
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2810
        await era.printAndWait(
          `「就连眼睛看不见的恐惧感，也转化成了快感的一部分了呢…………」`,
        ); // :2811
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :2812
        chara(target).kojo.眼罩 = 8; // :2812
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2814
        await era.printAndWait(
          `「不让本宫看也可以哟，但是一～定要让本宫舒服！非常舒服才可以哟♪」`,
        ); // :2815
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :2816
        chara(target).kojo.眼罩 = 7; // :2816
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2818
        await era.printAndWait(
          `「本宫眼睛看不见……的话……就没办法抵抗了呢……啊啊又要被魔王大人弄得乱七八糟了……只……只要想到这些……」`,
        ); // :2819
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :2820
        chara(target).kojo.眼罩 = 6; // :2820
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2822
        await era.printAndWait(
          `「魔……魔王大人？在哪里？戴上眼罩果然还是会害怕呢……」`,
        ); // :2823
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :2824
        chara(target).kojo.眼罩 = 5; // :2824
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2826
        await era.printAndWait(`「为……为什么要让本宫闭上眼睛……」`); // :2827
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :2828
        chara(target).kojo.眼罩 = 4; // :2828
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2830
        await era.printAndWait(`「接下来……接下来又会被…………」`); // :2831
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :2832
        chara(target).kojo.眼罩 = 3; // :2832
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :2834
        await era.printAndWait(
          `「难道你以为不被本宫看着，就不会被降罪了么！真是……天真！天真啊！」`,
        ); // :2835
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :2836
        chara(target).kojo.眼罩 = 2; // :2836
      } // :2836-2837
      return 0; // :2836-2838
    } // :2839-2840
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :2841

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2843
      await era.printAndWait(`「诶呀，本宫还意犹未尽呢～……♪」`); // :2844
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :2845
      chara(target).kojo.眼罩着脱 = 3; // :2845
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2847
      await era.printAndWait(`「光……还有……魔王大人……」`); // :2848
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :2849
      chara(target).kojo.眼罩着脱 = 2; // :2849
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2851
      await era.printAndWait(`「这……这种程度……没什么大不了的……！」`); // :2852
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :2853
      chara(target).kojo.眼罩着脱 = 1; // :2853
    } // :2853-2854
    return 0; // :2853-2855
  } // :2853-2856

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    // :2862

    if (chara(target).kojo.绳子 == 0) {
      // :2864

      if (era0(`talent:${target}:76`) == 1) {
        // :2866
        await era.printAndWait(
          `「哦哦哦这种玩法本宫听说过呢！虽然被束缚的话有点不舒服……本宫还是更喜欢自主一些的类型呢」`,
        ); // :2867
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2869
        await era.printAndWait(`「本宫……难道又做错了什么要被绑起来……」`); // :2870
        await era.printAndWait(`「不要……溜到别的狐狸精那里去！」`); // :2871
      } else {
        // :2873-2874
        await era.printAndWait(
          `「这……这种绳子……没被封住力量的话本宫瞬间就可以……现在真是便宜你了呢……」`,
        ); // :2874
      } // :2874-2875
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :2876
      chara(target).kojo.绳子 = 1; // :2876
      return 0; // :2876-2877
    } else {
      // :2879-2880

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2881
        await era.printAndWait(
          `「只是被绑起来，就已经无法抑制地开始……有感觉了呢……」`,
        ); // :2882
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :2883
        chara(target).kojo.绳子 = 9; // :2883
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2885
        await era.printAndWait(
          `「好兴奋啊……啊……被这么绑着……本宫浑身都开始发烫了……」`,
        ); // :2886
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :2887
        chara(target).kojo.绳子 = 8; // :2887
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2889
        await era.printAndWait(`「偶尔这么玩也不错呢～」`); // :2890
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :2891
        chara(target).kojo.绳子 = 7; // :2891
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2893
        await era.printAndWait(
          `「只是被绑起来，就已经无法抑制地开始……有感觉了呢……」`,
        ); // :2894
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :2895
        chara(target).kojo.绳子 = 6; // :2895
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2897
        await era.printAndWait(`「啊……绳子……深深地勒进肉里了……虽然痛……」`); // :2898
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :2899
        chara(target).kojo.绳子 = 5; // :2899
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2901
        await era.printAndWait(`「为什么，非要把本宫……绑起来呢」`); // :2902
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :2903
        chara(target).kojo.绳子 = 4; // :2903
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2905
        await era.printAndWait(
          `「唔……呃……啊～…………这……这种……屈辱…………居……然……有……感觉了…………」`,
        ); // :2906
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :2907
        chara(target).kojo.绳子 = 3; // :2907
      } else if (chara(target).kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // :2909
        await era.printAndWait(`「有没有这绳子，又有何异。」`); // :2910
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :2911
        chara(target).kojo.绳子 = 2; // :2911
      } // :2911-2912
      return 0; // :2911-2913
    } // :2914-2915
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    // :2916

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2918
      await era.printAndWait(`「下次继续哦！」`); // :2919
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2920
      chara(target).kojo.绳子着脱 = 2; // :2920
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2922
      await era.printAndWait(
        `「终于放开本宫了……被绑着怎么说也不是很舒服呢……」`,
      ); // :2923
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2924
      chara(target).kojo.绳子着脱 = 2; // :2924
    } else if (chara(target).kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2926
      await era.printAndWait(`「…………」`); // :2927
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :2928
      chara(target).kojo.绳子着脱 = 1; // :2928
    } // :2928-2929
    return 0; // :2928-2930
  } // :2928-2931

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    // :2937

    if (chara(target).kojo.口塞 == 0) {
      // :2939

      if (era0(`talent:${target}:76`) == 1) {
        // :2941
        await era.printAndWait(`「防止本宫叫得太大声么？……唔……唔……唔唔…………」`); // :2942
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2944
        await era.printAndWait(`「呜呜……不喜欢……唔唔……唔」`); // :2945
      } else {
        // :2947-2948
        await era.printAndWait(`「什么啊！什…………呜呜……唔唔唔……唔！！！！」`); // :2948
      } // :2948-2949
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :2950
      chara(target).kojo.口塞 = 1; // :2950
      return 0; // :2950-2951
    } else {
      // :2953-2954

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2955
        await era.printAndWait(`「啊啊又是这个……唔……」`); // :2956
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :2957
        chara(target).kojo.口塞 = 9; // :2957
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2959
        await era.printAndWait(`「没办法，毕竟魔王大人要本宫戴上嘛……呜」`); // :2960
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :2961
        chara(target).kojo.口塞 = 8; // :2961
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2963
        await era.printAndWait(`「为什么又～」`); // :2964
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :2965
        chara(target).kojo.口塞 = 7; // :2965
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2967
        await era.printAndWait(`「不……不太喜欢这样……」`); // :2968
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :2969
        chara(target).kojo.口塞 = 6; // :2969
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2971
        await era.printAndWait(`「啊……又是这个么……呜，唔唔唔……」`); // :2972
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :2973
        chara(target).kojo.口塞 = 5; // :2973
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2975
        await era.printAndWait(`「等……等下……呜……」`); // :2976
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :2977
        chara(target).kojo.口塞 = 4; // :2977
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2979
        await era.printAndWait(`「没用的呜…唔唔唔…呜」`); // :2980
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :2981
        chara(target).kojo.口塞 = 3; // :2981
      } else if (chara(target).kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2983
        await era.printAndWait(
          `「本宫才不会张嘴让你塞！…………唔！！……咳？！！…………咯………唔！唔唔！！………」`,
        ); // :2984
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :2985
        chara(target).kojo.口塞 = 2; // :2985
      } // :2985-2986
      return 0; // :2985-2987
    } // :2988-2989
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    // :2990

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2992
      await era.printAndWait(`「啊啊早点取下来嘛～……」`); // :2993
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :2994
      chara(target).kojo.口塞着脱 = 3; // :2994
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2996
      await era.printAndWait(`「下次不要用这个了好吗……本宫……真的不喜欢……」`); // :2997
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :2998
      chara(target).kojo.口塞着脱 = 2; // :2998
    } else if (chara(target).kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :3000
      await era.printAndWait(`「咳……咳……咳…………只是这种程度…」`); // :3001
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :3002
      chara(target).kojo.口塞着脱 = 1; // :3002
    } // :3002-3003
    return 0; // :3002-3004
  } // :3002-3005

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    // :3011

    if (chara(target).kojo.灌肠肛塞 == 0) {
      // :3013

      if (era0(`talent:${target}:76`) == 1) {
        // :3015
        await era.printAndWait(
          `「呃……这个……灌进去的话……感觉不是很…舒服呢…真的要弄的吗……？」`,
        ); // :3016
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3018
        await era.printAndWait(
          `「呃……这个……灌进去的话……大概会很糟糕呢…真的要弄的吗……？」`,
        ); // :3019
      } else {
        // :3021-3022
        await era.printAndWait(`「噫！等！等一下！你要干什么！！放开本宫！」`); // :3022
        await era.printAndWait(
          `你粗暴地打开了${target_name}的菊花，开始了灌肠`,
        ); // :3023
        await era.printAndWait(
          `「噫！噫噫噫噫噫噫！好……好难受啊……变态！！！变态啊啊啊啊！」`,
        ); // :3024
      } // :3024-3025
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :3026
      chara(target).kojo.灌肠肛塞 = 1; // :3026
      return 0; // :3026-3027
    } else {
      // :3029-3030

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3031
        await era.printAndWait(`「啊……这迷人的触感……凉凉的……灌进来了～」`); // :3032
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :3033
        chara(target).kojo.灌肠肛塞 = 7; // :3033
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3035
        await era.printAndWait(`「唔～唔～感觉到肚子在叫了…………」`); // :3036
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :3037
        chara(target).kojo.灌肠肛塞 = 6; // :3037
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3039
        await era.printAndWait(`「噫……肚子……好涨……但是……有感觉了……」`); // :3040
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :3041
        chara(target).kojo.灌肠肛塞 = 5; // :3041
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3043
        await era.printAndWait(
          `「噫！噫噫！……肚子……涨起来了……不要这样弄本宫啊……会坏掉的！噫！」`,
        ); // :3044
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :3045
        chara(target).kojo.灌肠肛塞 = 4; // :3045
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3047
        await era.printAndWait(
          `「啊～啊～啊～！肠道里面……要疯了～！本宫要疯啦……！！～」`,
        ); // :3048
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :3049
        chara(target).kojo.灌肠肛塞 = 3; // :3049
      } else if (chara(target).kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        // :3051
        await era.printAndWait(`「噫！……为什么要这样…噫！！…好难受！！！」`); // :3052
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :3053
        chara(target).kojo.灌肠肛塞 = 2; // :3053
      } // :3053-3054
      return 0; // :3053-3055
    } // :3053-3056
  } // :3057-3060

  if (era_flag.selectcom == 55) {
    // :3062

    if (chara(target).kojo.放置PLAY == 0) {
      // :3064

      if (era0(`talent:${target}:85`) == 1) {
        // :3066
        await era.printAndWait(`「被魔王大人这么看着……好害羞…………」`); // :3067
      } else {
        // :3069-3070
        await era.printAndWait(`「……在想什么？」`); // :3070
      } // :3070-3071
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :3072
      chara(target).kojo.放置PLAY = 1; // :3072
      return 0; // :3072-3073
    } else {
      // :3075-3076

      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3077
        await era.printAndWait(
          `「魔王大人……不介意的话……不要把本宫一直放在一边……」`,
        ); // :3078
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :3079
        chara(target).kojo.放置PLAY = 4; // :3079
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3081
        await era.printAndWait(`「这样的静谧…有时也很不错呢…」`); // :3082
        await era.printAndWait(
          `「本宫从小就很喜欢看星星，虽然这里没有星星，但是……」`,
        ); // :3083
        await era.printAndWait(`${target_name}红着脸小声说道`); // :3084
        await era.printAndWait(`「有魔王大人你呢……」`); // :3085
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :3086
        chara(target).kojo.放置PLAY = 3; // :3086
      } else if (chara(target).kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        // :3088
        await era.printAndWait(`「哼……无聊……」`); // :3089
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :3090
        chara(target).kojo.放置PLAY = 2; // :3090
      } // :3090-3091
      return 0; // :3090-3092
    } // :3090-3093
  } // :3094-3097

  if (era_flag.selectcom == 56) {
    // :3100

    if (chara(target).kojo.交谈 == 0) {
      // :3102
      if (era0(`tequip:${target}:53`)) {
        // :3103

        if (era0(`talent:${target}:76`) == 1) {
          // :3106
          await era.printAndWait(
            `「呃……本宫叫${target_name}……曾经是天使。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」`,
          ); // :3107
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :3108
          await era.printAndWait(
            `「虽然是第一次拍这种东西，不过本宫会努力的！呵呵～」`,
          ); // :3109
          await era.printAndWait(
            `「好了！那，接下来，还要说什么？……哎～不废话了！赶紧来做爱做的事吧！……嘻嘻～」`,
          ); // :3110
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3112
          await era.printAndWait(
            `「呃……本宫叫${target_name}……曾经……是………下任主神……的候补…………」`,
          ); // :3113
          await era.printAndWait(
            `${target_name}一边这么说着，一边时不时害羞地偷看水晶球。`,
          ); // :3114
          await era.printAndWait(
            `「不过，在魔王大人征服天界之后，就作为贡品献给魔王大人了……被魔王大人…………教会了……作为……女人的快乐…………」`,
          ); // :3115
          await era.printAndWait(
            `「现在……啊…………好羞人…………能不能别拍了啊？…………」`,
          ); // :3116
        } else {
          // :3118-3119
          await era.printAndWait(`「别！别拍本宫！！」`); // :3119
        } // :3119-3120
      } else {
        // :3121-3122

        if (era0(`talent:${target}:76`) == 1) {
          // :3123
          await era.printAndWait(
            `「嘻嘻～……闲聊的时候，突然抓人家来爱爱……爱爱的时候，又突然抓人家来闲聊……真是顽皮的魔王大人呢～」`,
          ); // :3124
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3126
          await era.printAndWait(
            `「是……是的……能被魔王大人宠幸……本宫觉得非常的幸福～」`,
          ); // :3127
        } else {
          // :3129-3130
          await era.printAndWait(`「……你想本宫说什么？…………」`); // :3130
        } // :3130-3131
      } // :3132-3133
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :3133
      chara(target).kojo.交谈 = 1; // :3133
      return 0; // :3133-3134
    } else {
      // :3136-3137
      if (era0(`tequip:${target}:53`)) {
        // :3137

        if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :3140
          await era.printAndWait(
            `「呃……本宫叫${target_name}……曾经是天使。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」`,
          ); // :3141
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :3142
          await era.printAndWait(
            `「希望看到这个的你，也能跟本宫一样享受性爱的快乐……哦～…啊！………轻……轻…地去了…………」`,
          ); // :3143
          await era.printAndWait(
            `「那，接下来，让本宫们一起做很多舒服的事，尽情地射精吧！……嘻嘻～」`,
          ); // :3144
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :3145
          chara(target).kojo.交谈 = 4; // :3145
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3147
          await era.printAndWait(
            `「呃……本宫叫${target_name}……本来是要成为新一任的主神，但现在却没能拯救这个世界，对不起呢～」`,
          ); // :3148
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球甜甜地微笑着。`,
          ); // :3149
          await era.printAndWait(
            `「然而，本宫是幸福的……因为知道了这种种让人愉悦的事……」`,
          ); // :3150
          await era.printAndWait(
            `「在不知不觉中，身心都被魔王大人夺走了……现在也是，遵循着魔王大人的命令来拍这个…请大家好好地看着本宫吧！嘻嘻～」`,
          ); // :3151
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :3152
          chara(target).kojo.交谈 = 3; // :3152
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3154
          await era.printAndWait(`「本宫……本宫……叫${target_name}……呜呜…………」`); // :3155
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :3156
          chara(target).kojo.交谈 = 2; // :3156
        } // :3156-3157
      } else {
        // :3158-3159

        if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :3160
          await era.printAndWait(
            `「关于那一次……呃……呃！……是啊！……嘻嘻～……所以下次这么弄的时候，就可以再用力些嘛～呵呵～～」`,
          ); // :3161
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :3162
          chara(target).kojo.交谈 = 4; // :3162
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3164
          await era.printAndWait(
            `「魔……魔王……大人……你……喜、喜、喜……喜欢本宫……么？」`,
          ); // :3165
          await era.printAndWait(
            `${target_name}脸红耳赤，低眉螓首地用几不可闻的声音轻轻说到。`,
          ); // :3166
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :3167
          chara(target).kojo.交谈 = 3; // :3167
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3169
          await era.printAndWait(`「既然落入你手，本宫还能怎样呢……」`); // :3170
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :3171
          chara(target).kojo.交谈 = 2; // :3171
        } // :3171-3172
      } // :3171-3173
      return 0; // :3171-3174
    } // :3171-3175
  } // :3176-3179

  if (era_flag.selectcom == 80) {
    // :3181

    if (chara(target).kojo.强制口交 == 0) {
      // :3183

      if (era0(`talent:${target}:76`) == 1) {
        // :3185
        await era.printAndWait(
          `「咳……咳……咳…………啊～魔王大人……太用力了啊……唔！～…本宫…咳……咳……咳…………」`,
        ); // :3186
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3188
        await era.printAndWait(
          `「咳……咳……咳…………等…等下…唔！～…喘不过气…咳……咳……咳…………」`,
        ); // :3189
      } else {
        // :3191-3192
        await era.printAndWait(
          `「等，等下！咳……咳……咳…你………你要干什么……！……唔！～…拿出…咳…拿出去啊…咳……咳…………」`,
        ); // :3192
      } // :3192-3193
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :3194
      chara(target).kojo.强制口交 = 1; // :3194
      return 0; // :3194-3195
    } else {
      // :3197-3198

      if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3199
        await era.printAndWait(
          `「咳……唔……唔…………呼～还可以再深些哦…………唔！～……咳……呃……呃…………」`,
        ); // :3200
        // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :3201
        chara(target).kojo.强制口交 = 5; // :3201
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3203
        await era.printAndWait(
          `「咳……唔……唔…不要太用力…往喉咙……里…面…去…………唔！～……咳……呃……呃…………」`,
        ); // :3204
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :3205
        chara(target).kojo.强制口交 = 4; // :3205
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3207
        await era.printAndWait(
          `「咳……咳……咳…………唔～唔～哦！……差点被口水呛到…………唔！～……咳……咳……咳…………」`,
        ); // :3208
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :3209
        chara(target).kojo.强制口交 = 3; // :3209
      } else if (chara(target).kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3211
        await era.printAndWait(
          `「咳……咳……咳…………慢！慢些！……要窒息了……！……唔！～……咳……咳……咳…………」`,
        ); // :3212
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :3213
        chara(target).kojo.强制口交 = 2; // :3213
      } // :3213-3214
      return 0; // :3213-3215
    } // :3213-3216
  } // :3213-3217
}

// @dog_kojo_903 // :3224
async function dog_kojo_903(rand) {
  const rand_n = rand ?? default_rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  if (era_flag.selectcom == 0) {
    // :3229

    if (chara(target).kojo.爱抚 == 0) {
      // :3231

      if (era0(`mark:${target}:2`) >= 2) {
        // :3233
        await era.printAndWait(
          `「堂堂本宫，居然要被这类下等生物舔舐……真是奇耻大辱……」`,
        ); // :3234
      } else {
        // :3236-3237
        await era.printAndWait(`「堂堂本宫，居然要被这类下等生物舔舐……」`); // :3237
        await era.printAndWait(
          `「倘若本宫力量尚存，这等生物别说百只，万只都无法近身半步……」`,
        ); // :3238
        await era.printAndWait(
          `「但是……日后定当取尔等性命！！本宫说到做到！！」`,
        ); // :3239
      } // :3239-3240
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :3241
      chara(target).kojo.爱抚 = 1; // :3241
      return 0; // :3241-3242
    } else {
      // :3244-3245

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3246
        if (rand_n(3) == 0) {
          // :3247
          await era.printAndWait(
            `「啊啊…唔～哦！…好孩子…真乖！～这边也要哦～…♪」`,
          ); // :3248
          await era.printAndWait(
            `${target_name}将野狗搂在怀里，引导着它舔舐自己`,
          ); // :3249
          await era.printAndWait(`「嗯…这种粗糙的触觉…好棒～♪」`); // :3250
          await era.printAndWait(
            `野狗宽大的舌头来回摩擦着${target_name}细腻的肌肤，留下一道道泛着光的口水印记`,
          ); // :3251
          await era.printAndWait(
            `「哈啊……不行了…光是被舔……本宫就快要去了～♪」`,
          ); // :3252
          await era.printAndWait(
            `${target_name}紧紧贴着野狗，主动蹭着它的皮毛渴求更多的爱抚`,
          ); // :3253
          await era.printAndWait(`「啊～～再多一点…舔遍本宫的身体吧…♪」`); // :3254
        } else if (rand_n(2) == 0) {
          // :3255
          await era.printAndWait(
            `${target_name}环抱住野狗，主动用身体摩擦勾引着它，引导着野狗探索自己的身体`,
          ); // :3256
          await era.printAndWait(`「嗯哈……好孩子…要着重舔胸部哦～♪」`); // :3257
          await era.printAndWait(
            `野狗来回舔舐着${target_name}光裸的身体，时不时的将凸起的乳头含进嘴里用犬牙轻轻噬咬`,
          ); // :3258
          await era.printAndWait(`「啊啊！好棒…真是聪明的孩子……」`); // :3259
          await era.printAndWait(
            `${target_name}高声呻吟着，不像样地将双脚敞开，压着野狗的脑袋邀请它向下爱抚`,
          ); // :3260
          await era.printAndWait(
            `野狗的舌头慢慢靠近蜜穴后，期待让${target_name}的腰部颤抖了起来，呼吸变得更加凌乱了`,
          ); // :3261
          await era.printAndWait(
            `「啊、啊啊～好棒……果然，野狗的舌头，真的好美妙啊……♪」`,
          ); // :3262
        } else {
          // :3263-3264
          await era.printAndWait(`「哈啊……好狗狗…来检查一下这里吧～♪」`); // :3264
          await era.printAndWait(
            `将生为天使的高贵姿态完全扔掉了，${target_name}发出屈服和喘息混合起来的娇喘，将身子托付给了正在爱抚自己的舌头`,
          ); // :3265
          await era.printAndWait(`「啊…嗯～为什么会这么舒服……」`); // :3266
          await era.printAndWait(
            `${target_name}为了感受到更加强烈的刺激而将野狗的脑袋用力地向下压，娇喘的音高随着爱抚的舌头的动作而忽高忽低`,
          ); // :3267
          await era.printAndWait(
            `「好…好棒……是的，那里……就是那里来的…那里～啊~！那里…好舒服啊～啊嗯～♪」`,
          ); // :3268
        } // :3268-3269
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :3270
        chara(target).kojo.爱抚 = 7; // :3270
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3272
        await era.printAndWait(
          `「这样的事情请不要再做了好吗魔王大人，被这样的下等生物舔来舔去什么的……好不舒服啊…………」`,
        ); // :3273
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :3274
        chara(target).kojo.爱抚 = 6; // :3274
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3276
        await era.printAndWait(
          `「这样的事情请不要再做了好吗魔王大人，被这样的下等生物舔来舔去什么的……好不舒服啊…………」`,
        ); // :3277
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :3278
        chara(target).kojo.爱抚 = 5; // :3278
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3280
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`); // :3281
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :3282
        chara(target).kojo.爱抚 = 4; // :3282
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3284
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`); // :3285
        await era.printAndWait(`「……来日定报此仇……」`); // :3286
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :3287
        chara(target).kojo.爱抚 = 3; // :3287
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :3289
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！粘粘的好难受啊啊啊！」`,
        ); // :3290
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        ); // :3291
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        ); // :3292
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :3293
        chara(target).kojo.爱抚 = 2; // :3293
      } // :3293-3294
      return 0; // :3293-3295
    } // :3293-3296
  } // :3297-3300

  if (era_flag.selectcom == 1) {
    // :3302

    if (chara(target).kojo.舔阴 == 0) {
      // :3304

      if (era0(`talent:${target}:0`) == 1) {
        // :3306
        await era.printAndWait(
          `${target_name}未经人事的阴部被野狗粗暴地舔舐了起来`,
        ); // :3307
        await era.printAndWait(`「快！快停手！！」`); // :3308
        await era.printAndWait(
          `想到这大概是野狗为了插入阴茎而做的准备，${target_name}浑身都开始颤抖起来`,
        ); // :3309
        await era.printAndWait(`「快住手啊啊啊！」`); // :3310
        await era.printAndWait(
          `双手本能地将野狗的头向外推，但是无奈力量封印太过强大，这样的行为改变不了什么`,
        ); // :3311
        await era.printAndWait(
          `「本宫的第一次……怎么也不想交给野狗啊啊啊啊啊啊！！！！」`,
        ); // :3312
      } else {
        // :3314-3315
        await era.printAndWait(`「快！快停手！！」`); // :3315
      } // :3315-3316
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :3317
      chara(target).kojo.舔阴 = 1; // :3317
      return 0; // :3317-3318
    } else {
      // :3320-3321

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3322
        if (rand_n(3) == 0) {
          // :3323
          await era.printAndWait(
            `「嘻嘻…好孩子～乖孩子～。继续舔哦～…啊～哦～～♪」`,
          ); // :3324
          await era.printAndWait(
            `${target_name}按住野狗的脑袋，扭动着腰配合着野狗的舔舐`,
          ); // :3325
          await era.printAndWait(`「嗯啊…哼啊啊啊～腰要…腰要飘起来了～♪」`); // :3326
          await era.printAndWait(
            `野狗伸出舌头用力的往小穴里探，${target_name}的每次喘息呻吟都伴随着爱液四溅`,
          ); // :3327
          await era.printAndWait(
            `「再激烈一点…狠狠的玩弄本宫的小穴吧～啊…野兽的舌头在最里面……♪」`,
          ); // :3328
          await era.printAndWait(
            `「本宫…本宫这…这样下去…不行了…已…又要去了…啊…啊啊啊啊……」`,
          ); // :3329
        } else if (rand_n(2) == 0) {
          // :3330
          await era.printAndWait(
            `${target_name}打开双腿邀请，野狗低下头伸出粗糙的舌头舔舐起来`,
          ); // :3331
          await era.printAndWait(
            `「啊啊…啊…好棒…好棒……小狗狗的舌头…再往里面去一点～♪」`,
          ); // :3332
          await era.printAndWait(
            `野狗的动作变得粗暴起来，${target_name}的小穴被激烈地舔舐着，连阴唇都翻了出来`,
          ); // :3333
          await era.printAndWait(
            `「嗯…嗯啊……再激烈一点也没关系……用舌头好好玩弄本宫的小穴吧……♪」`,
          ); // :3334
          await era.printAndWait(
            `被野狗灵巧的舌头舔的十分有感觉，${target_name}不自觉地将用双手将狗脑袋按在两腿之间`,
          ); // :3335
          await era.printAndWait(`「啊啊…要，要去了……嗯啊啊……♪」`); // :3336
        } else {
          // :3337-3338
          await era.printAndWait(
            `${target_name}笑着打开双腿招呼野狗过来舔舐自己，小穴因为即将到来的快意而微微颤动起来……`,
          ); // :3338
          await era.printAndWait(`「好狗狗～来吧，要乖乖地舔哦～♪」`); // :3339
          await era.printAndWait(
            `小穴被尽情的舔舐着，${target_name}的爱液不停地流出来滋润着野狗的嘴`,
          ); // :3340
          await era.printAndWait(`「好不好喝？哈啊……舌头…舔到最里面了……」`); // :3341
          await era.printAndWait(
            `${target_name}娇声呻吟着，努力将腿张得更开，让野狗能更加深入`,
          ); // :3342
          await era.printAndWait(
            `「啊啊啊…好喜欢…好喜欢啊…这种被舔的感觉简直太好了……」`,
          ); // :3343
        } // :3343-3344
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :3345
        chara(target).kojo.舔阴 = 6; // :3345
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3347
        await era.printAndWait(
          `「竟然……被这样的下等生物……舔舐着……还有感觉了……」`,
        ); // :3348
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :3349
        chara(target).kojo.舔阴 = 5; // :3349
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3351
        await era.printAndWait(
          `「救命！……魔王大人！……把这狗弄走啊！！本宫不想……被野狗……」`,
        ); // :3352
        await era.printAndWait(`${target_name}的眼中泛出泪花`); // :3353
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :3354
        chara(target).kojo.舔阴 = 4; // :3354
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3356
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`); // :3357
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :3358
        chara(target).kojo.舔阴 = 3; // :3358
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :3360
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！那里……粘粘的好难受啊啊啊！」`,
        ); // :3361
        await era.printAndWait(
          `${target_name}的小穴渐渐覆盖上了一层泛着光的野狗的唾液`,
        ); // :3362
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        ); // :3363
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使最重要的地方竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        ); // :3364
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :3365
        chara(target).kojo.舔阴 = 2; // :3365
      } // :3365-3366
      return 0; // :3365-3367
    } // :3365-3368
  } // :3365-3369

  if (era_flag.selectcom == 5) {
    // :3375

    if (chara(target).kojo.胸爱抚 == 0) {
      // :3377

      if (era0(`talent:${target}:85`) == 1) {
        // :3379
        await era.printAndWait(
          `「明明是为了侍奉魔王大人而存在的胸部……竟然被……野狗……」`,
        ); // :3380
        await era.printAndWait(`${target_name}的眼中泛出泪花`); // :3381
      } else {
        // :3383-3384
        await era.printAndWait(`「快！快停手！！」`); // :3384
        await era.printAndWait(`「本宫的……胸……岂是……呜呜呜呜！……」`); // :3385
      } // :3385-3386
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :3387
      chara(target).kojo.胸爱抚 = 1; // :3387
      return 0; // :3387-3388
    } else {
      // :3390-3391

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3392
        if (rand_n(2) == 0) {
          // :3393
          await era.print(
            `「本宫的胸，喜欢吗？可以的哦…更加用力地咬…也没有关系的噢…♪」`,
          ); // :3394
          await era.printAndWait(
            `${target_name}纵容着在她胸部不断舔舐着的野狗，野狗听话地用犬牙轻轻噬咬着乳头`,
          ); // :3395
          await era.print(`「哈…哈…胸部会这么有感觉…嗯……」`); // :3396
          await era.print(
            `受到了极大的刺激，${target_name}发出了让人血脉喷张的可爱呻吟`,
          ); // :3397
        } else {
          // :3398-3399
          await era.printAndWait(`「竟然…被野狗的舌头…弄得舒服了……♪」`); // :3399
          await era.printAndWait(`${target_name}搂住在怀中作乱的野狗低低笑着`); // :3400
          await era.printAndWait(`「没关系，更大胆的舔吧…哈啊……♪」`); // :3401
          await era.printAndWait(
            `${target_name}被野狗舔舐着胸部，露出陶醉的神情，眼睛已经泛起了情欲`,
          ); // :3402
        } // :3402-3403
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :3404
        chara(target).kojo.胸爱抚 = 6; // :3404
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3406
        await era.printAndWait(
          `「……被这样的下等生物……舔……本宫的胸……好不爽……」`,
        ); // :3407
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :3408
        chara(target).kojo.胸爱抚 = 5; // :3408
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3410
        await era.printAndWait(
          `「这样的事情请不要再做了好吗魔王大人，被这样的下等生物舔来舔去什么的……好不舒服啊…………」`,
        ); // :3411
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :3412
        chara(target).kojo.胸爱抚 = 4; // :3412
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3414
        await era.printAndWait(
          `「竟然被野狗的舌头……弄得舒服了……怎……怎么可能！！」`,
        ); // :3415
        await era.printAndWait(`${target_name}眼中泛起泪花`); // :3416
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :3417
        chara(target).kojo.胸爱抚 = 3; // :3417
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :3419
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！粘粘的好难受啊啊啊！」`,
        ); // :3420
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        ); // :3421
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        ); // :3422
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :3423
        chara(target).kojo.胸爱抚 = 2; // :3423
      } // :3423-3424
      return 0; // :3423-3425
    } // :3423-3426
  } // :3427-3430

  if (era_flag.selectcom == 6) {
    // :3432

    if (chara(target).kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :3434

      if (era0(`talent:${target}:136`) == 1) {
        // :3436
        await era.printAndWait(
          `「嗯唔…啾…嗯……哈…这可是…咕啾……本宫的初吻哦…咕唔…♪」`,
        ); // :3437
        await era.printAndWait(
          `难以抑制心中的爱意，${target_name}搂着野狗的脖颈，热情地献上了唇舌`,
        ); // :3438
        await era.printAndWait(
          `「明明是只爱欺负本宫的坏狗狗…咕……嗯…唔……却很绅士的留下了本宫的初吻呢…♪」`,
        ); // :3439
        await era.printAndWait(
          `「哈呜…嗯……接吻…好棒……嗯啾…啾…和小狗狗接吻……嗯…♪」`,
        ); // :3440
        await era.printAndWait(
          `野狗追逐着${target_name}的小舌不放，舌头相互纠缠着交换唾液，最后吻到缺氧了才不得不分开`,
        ); // :3441
        await era.printAndWait(`「哈……真是贪心的小狗狗…唔…咕啾……」`); // :3442
        await era.printAndWait(
          `然而还不等${target_name}喘息几秒，野狗就再次扑了上来，宽大的舌头再次入侵了${target_name}的唇`,
        ); // :3443
        await era.printAndWait(`「唔哈……咕…那……那就多吻几次吧…啾呼……」`); // :3444
        await era.printAndWait(
          `完全纵容着野狗，${target_name}的小舌热情回应着，交缠到麻木也不肯停止`,
        ); // :3445
        await era.printAndWait(
          `来不及吞咽的唾液滴落在${target_name}漂亮的锁骨上，吸引野狗向下舔舐着`,
        ); // :3446
        await era.printAndWait(
          `「嗯……不行哦…虽然很舒服……但是现在本宫更想接吻…咕啾……♪」`,
        ); // :3447
        await era.printAndWait(
          `抱住野狗不安分的脑袋，${target_name}将野狗的舌头含进了嘴里吮吸起来，全然不见最初的抵抗模样`,
        ); // :3448
        await era.printAndWait(`「初吻……哈啊…能留给你…真是太棒了……咕滋……」`); // :3449
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3451
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！！啊啊啊！！！」`,
        ); // :3452
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3454
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！明明……是属于魔王大人的啊！啊啊啊！！魔王大人……救命……！」`,
        ); // :3455
      } else {
        // :3457-3458
        await era.printAndWait(`「竟然要被这类下等生物夺取初吻……」`); // :3458
        await era.printAndWait(`${target_name}的眼里燃起了熊熊怒火`); // :3459
        await era.printAndWait(
          `「倘若本宫力量尚存，这等生物别说百只，万只都无法近身半步……」`,
        ); // :3460
        await era.printAndWait(
          `「但是……日后定当取尔等性命！！本宫说到做到！！唔……唔！！！呜呜呜……」`,
        ); // :3461
        await era.printAndWait(
          `只是话说着吓人，但是初吻还是被野狗夺去了。${target_name}眼里的泪水终于止不住开始淌下脸庞`,
        ); // :3462
      } // :3462-3463
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :3464
      chara(target).kojo.接吻 = 1; // :3464
      return 0; // :3464-3465
    } else if (chara(target).kojo.接吻 == 0) {
      // :3467

      if (era0(`talent:${target}:136`) == 1) {
        // :3469
        await era.printAndWait(
          `「嗯唔…啾…嗯……哈…没想到…咕啾……和野狗接吻这么舒服…咕唔…♪」`,
        ); // :3470
        await era.printAndWait(
          `${target_name}搂着野狗的脖颈，主动热情地将舌头缠绕起来，难舍难分`,
        ); // :3471
        await era.printAndWait(`「比起别的…咕……嗯…很粗糙的触感…唔……也很烫…♪」`); // :3472
        await era.printAndWait(
          `「哈呜…嗯……接吻…好棒……嗯啾…啾…和野狗接吻……嗯…♪」`,
        ); // :3473
        await era.printAndWait(
          `野狗追逐着${target_name}的小舌不放，舌头相互纠缠着交换唾液，最后吻到缺氧了才不得不分开`,
        ); // :3474
        await era.printAndWait(`「哈……真是贪心的小狗狗…唔…咕啾……」`); // :3475
        await era.printAndWait(
          `然而还不等${target_name}喘息几秒，野狗就再次扑了上来，宽大的舌头再次入侵了${target_name}的唇`,
        ); // :3476
        await era.printAndWait(`「唔哈……咕…那……那就多吻几次吧…啾呼……」`); // :3477
        await era.printAndWait(
          `完全纵容着野狗，${target_name}的小舌热情的回应着，互相纠缠到麻木也不肯停止`,
        ); // :3478
        await era.printAndWait(
          `来不及吞咽的唾液滴落在${target_name}漂亮的锁骨上，吸引野狗向下舔舐着`,
        ); // :3479
        await era.printAndWait(
          `「嗯……不行哦…虽然很舒服……但是现在本宫更想接吻…咕啾……♪」`,
        ); // :3480
        await era.printAndWait(
          `抱住野狗不安分的脑袋，${target_name}将野狗的舌头含进了嘴里吮吸起来`,
        ); // :3481
        await era.printAndWait(`「野兽的舌头……哈啊…真是太棒了……咕滋……」`); // :3482
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3484
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！！啊啊啊！！！」`,
        ); // :3485
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3487
        await era.printAndWait(
          `「停！唔唔唔！停下！！本……本宫的初吻！！明明……是属于魔王大人的啊！啊啊啊！！魔王大人……救命……！」`,
        ); // :3488
      } else {
        // :3490-3491
        await era.printAndWait(`「竟然要被这类下等生物夺取初吻……」`); // :3491
        await era.printAndWait(`${target_name}的眼里燃起了熊熊怒火`); // :3492
        await era.printAndWait(
          `「倘若本宫力量尚存，这等生物别说百只，万只都无法近身半步……」`,
        ); // :3493
        await era.printAndWait(
          `「但是……日后定当取尔等性命！！本宫说到做到！！唔……唔！！！呜呜呜……」`,
        ); // :3494
        await era.printAndWait(
          `只是话说着吓人，但是初吻还是被野狗夺去了。${target_name}眼里的泪水终于止不住开始淌下脸庞`,
        ); // :3495
      } // :3495-3496
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :3497
      chara(target).kojo.接吻 = 1; // :3497
      return 0; // :3497-3498
    } else {
      // :3500-3501

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3502
        if (rand_n(3) == 0) {
          // :3503
          await era.print(
            `天使专心致志地与野狗唇舌交缠着，将野狗当成了情人一般`,
          ); // :3504
          await era.printAndWait(
            `「嗯唔…野狗的体味…咕……好好闻……哈啊…脑袋都要变得一片空白了～♪」`,
          ); // :3505
          await era.printAndWait(
            `${target_name}抬手搂住野狗，更加热情的探出舌头回应着野狗的亲吻`,
          ); // :3506
          await era.printAndWait(`「哈…哈…唔…再来一次吧……♪」`); // :3507
          await era.printAndWait(
            `${target_name}的眼睛都湿润了，前倾身体，含住野狗的舌头吮吸起来`,
          ); // :3508
        } else if (rand_n(2) == 0) {
          // :3509
          await era.print(
            `「哈～和野狗接吻什么的……以前真是想都没想过呢～唔…来吧……♪」`,
          ); // :3510
          await era.printAndWait(
            `${target_name}轻笑喘息着，任由粘糊糊的舌头侵入了嘴里`,
          ); // :3511
          await era.printAndWait(`「嗯…嗯唔……会上瘾的…啾…这么舒服的话……哈…」`); // :3512
          await era.printAndWait(
            `小舌主动缠绕着野狗粗糙的舌头，${target_name}吞咽着野狗的唾液，完全沉迷在野兽的亲吻中了`,
          ); // :3513
        } else {
          // :3514-3515
          await era.print(`「小狗狗～过来，本宫想你的吻了…♪」`); // :3515
          await era.printAndWait(
            `${target_name}搂着野狗的脖颈，主动抬起头舔吮着野狗吐在外面的舌头`,
          ); // :3516
          await era.print(
            `「哈啊…这样……总感觉本宫…咕唔…哈……像只母狗一样呢…♪」`,
          ); // :3517
          await era.printAndWait(
            `一天使一狗的舌头相互纠缠着，没有及时吞咽的唾液滴落在了${target_name}的锁骨上`,
          ); // :3518
          await era.print(`「浪费了……♪哈啊…没关系…嗯……还有更多……」`); // :3519
          await era.printAndWait(
            `${target_name}的唇在口水的湿润下变得更加艳丽了，野狗伸出粗糙的舌头贪婪地来回舔舐着`,
          ); // :3520
          await era.print(
            `「想要继续接吻吗？没有问题哦……啾…多少次……都行……咕唔…」`,
          ); // :3521
        } // :3521-3522
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :3523
        chara(target).kojo.接吻 = 6; // :3523
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3525
        await era.printAndWait(
          `「要本宫和狗亲吻什么的…魔王大人，不要这样了……好吗……真的不舒服啊！～」`,
        ); // :3526
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :3527
        chara(target).kojo.接吻 = 5; // :3527
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3529
        await era.printAndWait(
          `「魔王大人刚才说什么？本宫听不懂～不理解！不理解啊啊！…呜呜………唔唔唔…呜…」`,
        ); // :3530
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :3531
        chara(target).kojo.接吻 = 4; // :3531
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3533
        await era.printAndWait(`「不！本宫拒绝！不！呜！唔唔唔！呜…………」`); // :3534
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :3535
        chara(target).kojo.接吻 = 3; // :3535
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :3537
        await era.printAndWait(`「和这样的牲畜……接吻……」`); // :3538
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        ); // :3539
        await era.printAndWait(`「唔！……唔唔唔！呜！呜呜呜呜呜………………」`); // :3540
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗亲吻了，这种心灵冲击想必非常剧烈的吧`,
        ); // :3541
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :3542
        chara(target).kojo.接吻 = 2; // :3542
      } // :3542-3543
      return 0; // :3542-3544
    } // :3542-3545
  } // :3546-3549

  if (era_flag.selectcom == 9) {
    // :3551

    if (chara(target).kojo.舔肛 == 0) {
      // :3553

      if (era0(`talent:${target}:136`) == 1) {
        // :3555
        await era.printAndWait(
          `「哈嗯…为什么喜欢这里呢…真让人不好意思呢…小狗狗～」`,
        ); // :3556
        await era.printAndWait(
          `${target_name}的肛穴在野狗的舔舐下渐渐覆盖上了一层泛着光的唾液`,
        ); // :3557
        await era.printAndWait(`「哈…好难为情啊……但是你喜欢的话…就舔吧～♪」`); // :3558
        await era.printAndWait(
          `似乎有点不习惯肛门被野兽舔舐的感觉，${target_name}的呻吟中还夹杂着些许不安`,
        ); // :3559
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3561
        await era.printAndWait(`「唯独这种玩法……本宫真的很讨厌啊」`); // :3562
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3564
        await era.printAndWait(
          `「呃……狗什么的……粘粘的好难受…魔王大人你………为什么……」`,
        ); // :3565
      } else {
        // :3567-3568
        await era.printAndWait(`「不，不要啊！！在舔哪里啊！！」`); // :3568
      } // :3568-3569
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :3570
      chara(target).kojo.舔肛 = 1; // :3570
      return 0; // :3570-3571
    } else {
      // :3573-3574

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3575
        if (rand_n(3) == 0) {
          // :3576
          await era.print(`${target_name}用手扒开屁股，接受着野狗的舌头`); // :3577
          await era.printAndWait(`「嗯…你就这么喜欢本宫的后面啊～♪」`); // :3578
          await era.printAndWait(
            `${target_name}呻吟着将腰抬得更高，野狗顺势将舌头刺了进去`,
          ); // :3579
          await era.printAndWait(
            `「啊……更加用力抽插那里吧…粗暴的……也没关系…哈啊……」`,
          ); // :3580
        } else if (rand_n(2) == 0) {
          // :3581
          await era.print(`「啊啊～舔那种地方的话…哈呜♪」`); // :3582
          await era.printAndWait(
            `${target_name}享受着野狗舔舐自己的肛门带来的快感，发出一阵阵淫媚的娇喘…`,
          ); // :3583
          await era.print(
            `「更加…更加往肛穴的深处…哈啊……用舌头来侵犯本宫吧…」`,
          ); // :3584
          await era.print(
            `开发完全的肛门容纳了野狗的舌头，柔韧的肠肉绞着侵入的舌尖，发出咕啾咕啾的水音`,
          ); // :3585
        } else {
          // :3586-3587
          await era.print(
            `「可以哦，随你喜欢的舔吧♪唔……你就这么喜欢这里吗～♪」`,
          ); // :3587
          await era.printAndWait(
            `${target_name}被野狗舔着肛门周围的褶皱，宽大的舌头更进一步的刺到了肛门里面`,
          ); // :3588
          await era.print(
            `「啊啊啊…不行…肛门被这样的玩弄……好舒服…真的……好舒服……♪」`,
          ); // :3589
          await era.printAndWait(
            `${target_name}因为肛门被深入的舌头来回搅动而发出甜美的呻吟`,
          ); // :3590
        } // :3590-3591
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :3592
        chara(target).kojo.舔肛 = 6; // :3592
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3594
        await era.printAndWait(
          `「被狗这么舔…好奇怪啊……魔王大人…快把狗牵走吧…」`,
        ); // :3595
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :3596
        chara(target).kojo.舔肛 = 5; // :3596
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3598
        await era.printAndWait(
          `「这到底怎么回事…这样的……魔王大人……你究竟…想要本宫怎样啊………野狗……好讨厌………」`,
        ); // :3599
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :3600
        chara(target).kojo.舔肛 = 4; // :3600
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3602
        await era.printAndWait(`「本宫竟然……只能任由这等牲畜玩弄……」`); // :3603
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :3604
        chara(target).kojo.舔肛 = 3; // :3604
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :3606
        await era.printAndWait(
          `「被这样的牲畜……用舌头……啊啊啊！屁股……粘粘的好难受啊啊啊！」`,
        ); // :3607
        await era.printAndWait(
          `${target_name}的菊花渐渐覆盖上了一层泛着光的野狗的唾液`,
        ); // :3608
        await era.printAndWait(
          `「滚开啊！本宫叫你滚开啊啊啊！住手啊啊啊啊啊啊！！！」`,
        ); // :3609
        await era.printAndWait(
          `${target_name}的眼里，同时存在着愤怒的火焰和屈辱的泪水，毕竟堂堂天使竟被野狗玩弄了，这种心灵冲击想必非常剧烈的吧`,
        ); // :3610
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :3611
        chara(target).kojo.舔肛 = 2; // :3611
      } // :3611-3612
      return 0; // :3611-3613
    } // :3611-3614
  } // :3615-3618

  if (era_flag.selectcom == 21) {
    // :3620

    if (chara(target).kojo.背后位 == 0) {
      // :3622

      if (era0(`talent:${target}:0`) == 1) {
        // :3624

        if (era0(`talent:${target}:136`) == 1) {
          // :3626
          await era.print(`${target_name}四肢着地趴在地上，摇动屁股引诱着野狗`); // :3627
          await era.print(`「这可是本宫的第一次哟，亲爱的小狗狗～♪」`); // :3628
          await era.printAndWait(
            `${target_name}的小穴湿润无比，因为即将到来交配而全身颤抖着`,
          ); // :3629
          await era.printAndWait(
            `野狗喘着粗气，完全勃起的阴茎通红肿胀，压在${target_name}背上，猛然往腔内插去`,
          ); // :3630
          await era.printAndWait(`「啊啊……好深…野狗的肉棒……到最里面了……」`); // :3631
          await era.printAndWait(
            `${target_name}背后的翅膀突然展开，天使在野狗的侵犯下发出了期待已久的甜美呻吟`,
          ); // :3632
          await era.printAndWait(
            `「嗯噢噢噢噢！！！痛…但是好棒……本宫…在和小狗狗交配着……♪」`,
          ); // :3633
          await era.printAndWait(
            `被${target_name}的呻吟鼓舞了一般，野狗的前爪牢牢固定住天使的身体，下半身的抽插动作越发快了起来`,
          ); // :3634
          await era.printAndWait(
            `「啊～哈啊…好喜欢…好喜欢被野狗侵犯……啊啊……」`,
          ); // :3635
          await era.printAndWait(
            `发出了淫乱的娇喘声的${target_name}已经完全看不到以往的高贵姿态了，如今这只是一头沉迷交配的雌犬`,
          ); // :3636
          await era.printAndWait(
            `「要到了…！射在里面……狗的精子…都射到子宫里……嗯唔唔唔唔！！」`,
          ); // :3637
          await era.printAndWait(
            `「哈啊……哈…本宫……大概是爱上你了…明明只是只野狗…竟然夺走了本宫的心♪」`,
          ); // :3638
          await era.printAndWait(
            `在野狗射完精拔出阴茎后，${target_name}翻过身搂住了野狗主动送上了唇`,
          ); // :3639
          await era.printAndWait(
            `「嗯唔…啾…哈……真是只温柔的小狗♪咕……你的话，让本宫怀孕也是可以的哦。」`,
          ); // :3640
          await era.printAndWait(
            `双腿缠上野狗的腰，引导着狗根进入自己的小穴，${target_name}边亲吻着边又和野狗做了起来`,
          ); // :3641
        } else if (era0(`talent:${target}:76`) == 1) {
          // :3643
          await era.printAndWait(`「欸？等等……等下！为什么要让本宫被野狗……」`); // :3644
          await era.printAndWait(
            `「魔王大人你也要适可而止啊！！这一点也不好玩啊！」`,
          ); // :3645
          await era.printAndWait(`「停……不要……不要啊啊啊啊啊！」`); // :3646
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3648
          await era.printAndWait(
            `「欸？等等……等下！魔王大人，为什么要让本宫被野狗……」`,
          ); // :3649
          await era.printAndWait(
            `「本宫还是……第一次……至少……也请魔王大人……将本宫保持至今的纯洁……」`,
          ); // :3650
          await era.printAndWait(
            `「就这样子交给野狗的话……交给野狗的话…………啊啊啊啊啊啊啊啊啊！」`,
          ); // :3651
          await era.printAndWait(
            `${target_name}因为被野狗夺去了纯洁这一事实，精神受到了相当大的冲击，泪水夺眶而出，身体痛苦地扭动了起来`,
          ); // :3652
        } else {
          // :3655-3656
          await era.printAndWait(`「救……命……救命啊啊啊啊啊啊啊！！」`); // :3656
          await era.printAndWait(
            `「被下贱的生物……用更下贱的生物…………夺走了………啊啊啊啊！」`,
          ); // :3657
          await era.printAndWait(
            `「啊啊啊！杀了你们……绝对……啊唔……绝对要……杀了你们！！！！」`,
          ); // :3658
          await era.printAndWait(
            `剧烈的精神冲击转化为了强大的愤怒和仇恨，被夺走了力量的她依然释放出了强烈的威压……`,
          ); // :3659
          await era.printAndWait(`不过失去的纯洁再也……`); // :3660
        } // :3660-3661
      } else {
        // :3663-3664

        if (era0(`talent:${target}:136`) == 1) {
          // :3665
          await era.print(
            `${target_name}四肢着地趴在地上，发情地摇动着屁股引诱着野狗`,
          ); // :3666
          await era.print(`「来吧，小狗狗～把本宫的小穴填满吧～♪」`); // :3667
          await era.printAndWait(
            `${target_name}的小穴湿润无比，因为即将到来交配而全身颤抖着`,
          ); // :3668
          await era.printAndWait(
            `野狗喘着粗气，完全勃起的阴茎通红肿胀，压在${target_name}背上，猛然将阴茎往腔内插进去了`,
          ); // :3669
          await era.printAndWait(`「啊啊……好深…野狗的肉棒……到最里面了……」`); // :3670
          await era.printAndWait(
            `${target_name}雪白的翅膀突然展开，天使在野狗的侵犯下发出了期待已久的甜美呻吟`,
          ); // :3671
          await era.printAndWait(
            `「嗯噢噢噢噢！！！好棒……本宫…在和野狗交配着……♪」`,
          ); // :3672
          await era.printAndWait(
            `被${target_name}的呻吟鼓舞了一般，野狗的前爪牢牢固定住天使的身体，下半身的抽插动作越发的快了起来`,
          ); // :3673
          await era.printAndWait(
            `「啊～哈啊…好喜欢…好喜欢被野狗侵犯……啊啊……」`,
          ); // :3674
          await era.printAndWait(
            `像野兽一样发出了淫乱的娇喘声的${target_name}已经完全看不到以往的高贵姿态了，如今只是一头沉迷交配的雌犬`,
          ); // :3675
          await era.printAndWait(
            `「要到了…！射在里面……狗的精子…都射到子宫里……嗯唔唔唔唔！！」`,
          ); // :3676
        } else if (era0(`talent:${target}:76`) == 1) {
          // :3678
          await era.printAndWait(`「为什么一定要让本宫和野狗……」`); // :3679
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3681
          await era.printAndWait(
            `「这样很难受啊啊啊啊！如果是惩罚本宫的话……至少能不能换成别的惩罚啊啊啊……多么严厉……都可以啊……至少不要让本宫和野狗……呜……啊啊啊！」`,
          ); // :3682
        } else {
          // :3684-3685
          await era.printAndWait(`「救……命……救命啊啊啊啊啊啊啊！！」`); // :3685
        } // :3685-3686
      } // :3687-3688
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :3688
      chara(target).kojo.背后位 = 1; // :3688
      return 0; // :3688-3689
    } else {
      // :3691-3692

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3693
        if (rand_n(3) == 0) {
          // :3694
          await era.print(
            `${target_name}像母狗一样趴在地上，期待来自野狗的征讨`,
          ); // :3695
          await era.print(
            `「交……交配！和野兽交配最棒了…本宫要为小狗狗生孩子～」`,
          ); // :3696
          await era.printAndWait(`两只走兽相互交缠着，完全沉醉在肉欲中了`); // :3697
          await era.print(
            `「啊啊啊～小狗狗……尽情侵犯你的母狗吧……♪要…要到了…让本宫怀孕吧，唔啊啊啊啊啊！！！」`,
          ); // :3698
          await era.printAndWait(
            `野狗猛然沉下身体，膨胀的阴茎完全没入了${target_name}的小穴，注入了滚烫的精子`,
          ); // :3699
          await era.print(`「哈啊……肚子里热热的…还想……还想再要……♪」`); // :3700
          await era.print(
            `${target_name}扭动着腰肢，引诱着背上的野狗，还没有完全射完精的野狗再度抽插了起来`,
          ); // :3701
          await era.print(`「啊啊啊……一边射精一边做……唔哈……太棒了♪」`); // :3702
        } else if (rand_n(2) == 0) {
          // :3703
          await era.print(
            `${target_name}向野狗展示自己湿漉漉的小穴，发出了热情的要求`,
          ); // :3704
          await era.print(`「来吧小狗狗♪来侵犯你面前的小母狗吧～♪」`); // :3705
          await era.print(
            `野狗低吠着，压在${target_name}背上，肿胀的阴茎一口气刺入了最深处，毫不留情的抽送起来`,
          ); // :3706
          await era.printAndWait(`「啊啊啊♪这样做的话…比平时更深……嗯啊……」`); // :3707
          await era.printAndWait(
            `熟练得扭动腰肢配合着野狗的动作，${target_name}的呻吟声格外高亢`,
          ); // :3708
          await era.printAndWait(
            `野狗用前爪固定住${target_name}的身体，每一次的抽插都会带出大量的体液`,
          ); // :3709
          await era.printAndWait(
            `「啊啊～！深一些…再深一些！本宫…最喜欢这样的感觉了……♪」`,
          ); // :3710
          await era.printAndWait(
            `抛弃了天使的高贵身份，${target_name}完全成为一只向野狗发情的雌犬了`,
          ); // :3711
        } else {
          // :3712-3713
          await era.print(`「咕…嗯…嗯……啊啊啊…哈……♪」`); // :3713
          await era.print(
            `${target_name}沉浸在走兽间的激烈交配中，野狗的每一次抽插都能让她的呻吟更加高亢`,
          ); // :3714
          await era.print(`「啊啊啊插到最里面了……就这样射精……让本宫怀孕吧～」`); // :3715
          await era.printAndWait(
            `回应着这个要求一般，野狗猛然刺进了，滚烫的精子直接注入了${target_name}的子宫`,
          ); // :3716
          await era.print(`「啊啊～！更多……在本宫的子宫里…用精液播种吧…♪」`); // :3717
          await era.printAndWait(
            `${target_name}为了能让自己被更多的侵犯而用令人心神荡漾的声音向野狗撒着娇，那副发情野兽一样的表情，已经完全看不到天使的样子了`,
          ); // :3718
        } // :3718-3719
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :3720
        chara(target).kojo.背后位 = 7; // :3720
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3722
        await era.printAndWait(`「为什么一定要让本宫和野狗……」`); // :3723
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :3724
        chara(target).kojo.背后位 = 6; // :3724
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3726
        await era.printAndWait(
          `「这样很难受啊啊啊啊！如果是惩罚本宫的话……至少能不能换成别的惩罚啊啊啊……多么严厉……都可以啊……至少不要让本宫和野狗……呜……啊啊啊！」`,
        ); // :3727
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :3728
        chara(target).kojo.背后位 = 5; // :3728
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3730
        await era.printAndWait(`「无法原谅…无法原谅…哈♪啊啊啊♪」`); // :3731
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :3732
        chara(target).kojo.背后位 = 4; // :3732
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3734
        await era.printAndWait(`「无法原谅……要和狗………无法原谅啊啊……」`); // :3735
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :3736
        chara(target).kojo.背后位 = 3; // :3736
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :3738
        await era.printAndWait(`「一个不剩…………统统杀光…………」`); // :3739
        await era.printAndWait(
          `${target_name}的眼里闪露着凌厉的光芒，已经不对背后活动着的野狗做什么反应了`,
        ); // :3740
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :3741
        chara(target).kojo.背后位 = 2; // :3741
      } // :3741-3742
      return 0; // :3741-3743
    } // :3741-3744
  } // :3745-3748

  if (era_flag.selectcom == 27) {
    // :3750

    if (chara(target).kojo.背后位肛交 == 0) {
      // :3752

      if (era0(`talent:${target}:136`) == 1) {
        // :3754
        await era.print(`「啊啊～♪本宫竟然…因为肛穴被小狗狗侵犯而高兴…♪」`); // :3755
        await era.printAndWait(
          `${target_name}娇声呻吟着，淫乱的肛门黏膜伸展着咬住了野狗的阴茎`,
        ); // :3756
        await era.print(
          `「哈啊……就连肛穴也不放过…坏狗狗……嗯啊…要去了……这么激烈的话♪」`,
        ); // :3757
        await era.printAndWait(
          `被野狗从背后贯穿，${target_name}仰起头一副沉醉其中的模样`,
        ); // :3758
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3760
        await era.printAndWait(`「要让狗狗从后面………吗？」`); // :3761
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3763
        await era.printAndWait(`「呜……要和狗肛交………」`); // :3764
      } else {
        // :3766-3767
        await era.printAndWait(`「什么…这……是骗本宫的……对吧…？」`); // :3767
      } // :3767-3768
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :3769
      chara(target).kojo.背后位肛交 = 1; // :3769
      return 0; // :3769-3770
    } else {
      // :3772-3773

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3774
        if (rand_n(2) == 0) {
          // :3775
          await era.print(
            `${target_name}被背上的野狗侵犯着，感觉自己的肛穴都要融化了……`,
          ); // :3776
          await era.print(`「啊啊…被野狗…侵犯肛门让人停不下来啊…啊啊啊…」`); // :3777
          await era.printAndWait(
            `${target_name}发出了满足的喘息，开发完全的肛门轻松自如得应付着抽插`,
          ); // :3778
          await era.printAndWait(`「腰…自己动起来了……嗯哈…完全停不下来了…♪」`); // :3779
          await era.printAndWait(
            `在${target_name}一阵阵甘甜的娇喘声中，野狗越发奋力地撞击起来`,
          ); // :3780
        } else {
          // :3781-3782
          await era.print(
            `${target_name}纤细的腰被野狗抱着，小巧的肛门被粗大的狗根贯穿了`,
          ); // :3782
          await era.print(
            `「哈啊…这么突然……小狗狗…嗯啊啊♪在直肠里搅来搅去…♪」`,
          ); // :3783
          await era.print(
            `为了追求更多的快感，${target_name}摇摆腰肢配合着野狗的抽插`,
          ); // :3784
          await era.printAndWait(
            `「已…已经…要去了啊～…啊啊啊…射出来、在里面射出来！」`,
          ); // :3785
        } // :3785-3786
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :3787
        chara(target).kojo.背后位肛交 = 7; // :3787
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3789
        await era.printAndWait(`「和狗…也挺舒服的……」`); // :3790
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :3791
        chara(target).kojo.背后位肛交 = 6; // :3791
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3793
        await era.printAndWait(`「如果是和魔王大人的话…就更好了………」`); // :3794
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :3795
        chara(target).kojo.背后位肛交 = 5; // :3795
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3797
        await era.printAndWait(`「魔王大人…为什么啊………」`); // :3798
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :3799
        chara(target).kojo.背后位肛交 = 4; // :3799
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3801
        await era.printAndWait(`「屁股…和狗…呜呜…………」`); // :3802
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :3803
        chara(target).kojo.背后位肛交 = 3; // :3803
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :3805
        await era.printAndWait(`「你这疯子！！……」`); // :3806
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :3807
        chara(target).kojo.背后位肛交 = 2; // :3807
      } // :3807-3808
      return 0; // :3807-3809
    } // :3807-3810
  } // :3811-3814

  if (era_flag.selectcom == 30) {
    // :3816

    if (chara(target).kojo.手淫 == 0) {
      // :3818

      if (era0(`talent:${target}:76`) == 1) {
        // :3820
        await era.printAndWait(`「为什么本宫一定要给这种下等生物……」`); // :3821
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3823
        await era.printAndWait(
          `「魔王大人……还是不要让本宫……本宫……真的很讨厌这种感觉呢……」`,
        ); // :3824
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3826
        await era.printAndWait(`「狗的臭味……满手都是……」`); // :3827
      } else {
        // :3829-3830
        await era.printAndWait(`「呕…………好脏……这种东西…………」`); // :3830
      } // :3830-3831
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :3832
      chara(target).kojo.手淫 = 1; // :3832
      return 0; // :3832-3833
    } else {
      // :3835-3836

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3837
        if (rand_n(2) == 0) {
          // :3838
          await era.printAndWait(`「小狗狗～舒服么？嘻嘻！不停地脉动着呢！」`); // :3839
          await era.printAndWait(
            `「喜欢温柔地摩擦，还是激烈地那种更和你心意？」`,
          ); // :3840
          await era.printAndWait(
            `${target_name}带着恶作剧般的笑容，舔着嘴角握住了野狗的阴茎`,
          ); // :3841
          await era.printAndWait(
            `明明只是为野狗手交而已，${target_name}的小穴就已经湿的不成样子了`,
          ); // :3842
          await era.printAndWait(`「好想快点放进来啊……本宫的小穴～♪」`); // :3843
          await era.printAndWait(`「嗯唔…啾…嗯……来吧…都射在本宫的手上，哈…♪」`); // :3844
          await era.printAndWait(
            `忍不住内心的躁动，${target_name}边亲吻着野狗的皮毛边又替野狗做了起来`,
          ); // :3845
        } else {
          // :3846-3847
          await era.printAndWait(
            `「野兽的味道……变浓烈的了，来，把精液都射出来吧～♪」`,
          ); // :3847
          await era.printAndWait(
            `${target_name}握住野狗的阴茎上下套弄着，赤裸的小穴已经泛起了湿意`,
          ); // :3848
          await era.printAndWait(
            `「啊…这么烫……又这么大，要是插到本宫的小穴里的话～♪」`,
          ); // :3849
          await era.printAndWait(
            `${target_name}收回一只手往自己的下身探去，将野狗的汁液涂抹在自己的阴蒂上并玩弄了起来`,
          ); // :3850
          await era.printAndWait(`「哈啊……好想和小狗狗一起去…♪」`); // :3851
        } // :3851-3852
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :3853
        chara(target).kojo.手淫 = 7; // :3853
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3855
        await era.printAndWait(`「好恶心的感觉……」`); // :3856
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :3857
        chara(target).kojo.手淫 = 6; // :3857
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3859
        if (rand_n(2) == 0) {
          // :3860
          await era.printAndWait(`「真的很讨厌啊……魔王大人……让本宫走吧……」`); // :3861
        } else {
          // :3862-3863
          await era.printAndWait(`「呜呜呜好难受……做这种事真的好难受……」`); // :3863
        } // :3863-3864
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :3865
        chara(target).kojo.手淫 = 5; // :3865
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3867
        await era.printAndWait(`「呜呜呜好难受……做这种事真的好难受……」`); // :3868
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :3869
        chara(target).kojo.手淫 = 4; // :3869
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3871
        await era.printAndWait(`「为什么要强迫本宫……做这种肮脏的事情！」`); // :3872
        await era.printAndWait(`「还是……给野狗………………」`); // :3873
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :3874
        chara(target).kojo.手淫 = 3; // :3874
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :3876
        await era.printAndWait(`「咦……好臭……这种……脏东西…………」`); // :3877
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :3878
        chara(target).kojo.手淫 = 2; // :3878
      } // :3878-3879
      return 0; // :3878-3880
    } // :3878-3881
  } // :3882-3885

  if (era_flag.selectcom == 31) {
    // :3887

    if (chara(target).kojo.口交_奴 == 0) {
      // :3889

      if (era0(`talent:${target}:76`) == 1) {
        // :3891
        await era.printAndWait(`「原来如此，狗的小鸡鸡，是这个味道啊～♪」`); // :3892
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3894
        await era.printAndWait(
          `「人家不想舔这种东西！……但是……如果……是魔王大人的爱好……的话……」`,
        ); // :3895
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3897
        await era.printAndWait(`「知……知道了………只是吸一下哦！」`); // :3898
      } else {
        // :3900-3901
        await era.printAndWait(
          `「讨，讨厌！不想把这东西放嘴里！！住！住手！！！」`,
        ); // :3901
      } // :3901-3902
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :3903
      chara(target).kojo.口交_奴 = 1; // :3903
      return 0; // :3903-3904
    } else {
      // :3906-3907

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3908
        if (rand_n(2) == 0) {
          // :3909
          await era.print(`${target_name}小心翼翼地用嘴唇轻触着野狗的阴茎`); // :3910
          await era.print(`「有点烫呢～♪」`); // :3911
          await era.print(
            `感慨了一下以后，${target_name}探出小舌挑逗着狗根的顶部，一下一下的来回舔弄着`,
          ); // :3912
          await era.print(`野狗的阴茎勃起得更加明显了，尾巴摇的十分勤奋`); // :3913
          await era.printAndWait(`「看起来你很喜欢呢…小狗狗～♪」`); // :3914
          await era.printAndWait(
            `${target_name}用手压住野狗的身体，将狗根吞入口中吮吸起来`,
          ); // :3915
          await era.printAndWait(`「汪…汪汪～♪」`); // :3916
          await era.print(`野狗低吠着，顺着${target_name}的动作快速抽插起来`); // :3917
          await era.printAndWait(
            `「咳…心急的孩子…咕唔……没关系，射在本宫嘴里也可以的哟～♪」`,
          ); // :3918
        } else {
          // :3919-3920
          await era.print(`「小狗狗～♪乖一点，本宫让你舒服～♪」`); // :3920
          await era.print(
            `${target_name}安抚着野狗，将头探到野狗下腹，含住了半勃起的阴茎`,
          ); // :3921
          await era.print(`「咕唔……喜欢吗？本宫的舌头～」`); // :3922
          await era.print(
            `野狗耸动着腰部在${target_name}的口中抽插着，阴茎在${target_name}的含弄下逐渐膨胀`,
          ); // :3923
          await era.print(
            `「一跳一跳地，好像很舒服的动着呢～啾呜…嗯……小狗狗的阴茎…♪」`,
          ); // :3924
          await era.print(`${target_name}一副陶醉的模样，尽力地侍奉着野狗`); // :3925
        } // :3925-3926
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :3927
        chara(target).kojo.口交_奴 = 7; // :3927
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3929
        await era.printAndWait(`「哪怕是狗！本宫都能用嘴搞定～♪」`); // :3930
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :3931
        chara(target).kojo.口交_奴 = 6; // :3931
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3933
        await era.printAndWait(`「臭臭的……不过，并不讨厌……」`); // :3934
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :3935
        chara(target).kojo.口交_奴 = 5; // :3935
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3937
        await era.printAndWait(
          `「是命令的话……不管是狗还是什么，本宫都会尽心地服侍好的……！」`,
        ); // :3938
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :3939
        chara(target).kojo.口交_奴 = 4; // :3939
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3941
        await era.printAndWait(
          `「知……知道啦……偶尔要也侍奉人以外的东西吗…………」`,
        ); // :3942
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :3943
        chara(target).kojo.口交_奴 = 3; // :3943
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :3945
        await era.printAndWait(`「讨！讨厌！呕…………臭死了……这野兽！」`); // :3946
        await era.printAndWait(
          `被迫为野狗侍奉的${target_name}眼中燃烧着屈辱和愤怒的火焰`,
        ); // :3947
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :3948
        chara(target).kojo.口交_奴 = 2; // :3948
      } // :3948-3949
      return 0; // :3948-3950
    } // :3948-3951
  } // :3952-3955

  if (era_flag.selectcom == 34) {
    // :3957

    if (chara(target).kojo.骑乘位 == 0) {
      // :3959

      if (era0(`talent:${target}:0`) == 1) {
        // :3961

        if (era0(`talent:${target}:136`) == 1) {
          // :3963
          await era.printAndWait(
            `跪坐在地上的${target_name}兴奋地舔着唇，把手撑在地上减去重量，就这么骑在了野狗身上`,
          ); // :3964
          await era.printAndWait(`「被本宫拿到主导权了哦小狗狗～♪」`); // :3965
          await era.printAndWait(
            `和野狗对视着，${target_name}扭动着身体，湿润的小穴来回摩擦着野狗肚皮上的毛发`,
          ); // :3966
          await era.printAndWait(`「嗯……光是这样，本宫就好像要去了♪」`); // :3967
          await era.printAndWait(
            `得不到满足的野狗汪汪叫着，仿佛对自己变成${target_name}享乐的玩具十分不满`,
          ); // :3968
          await era.printAndWait(
            `「嗯？着急了吗？本宫可还是处子，你要给本宫一定的心理建设时间才对啊♪」`,
          ); // :3969
          await era.printAndWait(
            `坏心眼的逗弄着身下的野狗，${target_name}笑着用阴唇套弄着狗根，为野狗做起了素股。粘糊糊的爱液被用作润滑液，发出了咕啾咕啾的声音`,
          ); // :3970
          await era.printAndWait(`「汪！汪汪汪！！」`); // :3971
          await era.printAndWait(
            `「好了好了，别急，好好看着，本宫的处子穴，完全要归你了哦～♪」`,
          ); // :3972
          await era.printAndWait(
            `${target_name}用双手将小穴给撑开了，对着肿胀的狗根，慢慢坐了下去`,
          ); // :3973
          await era.printAndWait(
            `「哈啊…感觉……好清楚…被小狗狗一点点撑开…啊…到深…深处了…已经全部都进到里面去了啊啊～♪」`,
          ); // :3974
          await era.printAndWait(
            `${target_name}的处女膜被一点一点地捅破穿过，将野狗的阴茎完全吞没了进去，猩红的处子血缓缓流到了野狗身上`,
          ); // :3975
          await era.printAndWait(
            `在忍过开始的疼痛之后，${target_name}摇摆着腰肢，开始追求起交配的乐趣来`,
          ); // :3976
          await era.printAndWait(
            `「啊～啊啊啊……好棒……腰自己就动起来了……小狗狗的阴茎…又烫又硬……哈啊～♪」`,
          ); // :3977
          await era.printAndWait(
            `「啊啊啊嗯啊嗯啊哦嗯…子宫口咕噜咕噜的…本宫的子宫被穿透了啊…啊啊啊哈嗯……♪」`,
          ); // :3978
          await era.printAndWait(
            `${target_name}配合着娇喘声伸展着翅膀，但那副姿态已经完全失去了天使的高贵和荣耀`,
          ); // :3979
        } else if (era0(`talent:${target}:76`) == 1) {
          // :3981
          await era.printAndWait(''); // :3982
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3984
          await era.printAndWait(''); // :3985
        } else {
          // :3986-3987
          await era.printAndWait(''); // :3988
        } // :3989-3990
      } else {
        // :3991-3992

        if (era0(`talent:${target}:136`) == 1) {
          // :3993
          await era.printAndWait(
            `跪坐在地上的${target_name}兴奋地舔着唇，把手撑在地上减去重量，就这么骑在了野狗身上`,
          ); // :3994
          await era.printAndWait(`「被本宫拿到主导权了哦小狗狗～♪」`); // :3995
          await era.printAndWait(
            `和野狗对视着，${target_name}扭动着身体，湿润的小穴来回摩擦着野狗肚皮上的毛发`,
          ); // :3996
          await era.printAndWait(`「嗯……光是这样，本宫就好像要去了♪」`); // :3997
          await era.printAndWait(
            `得不到满足的野狗汪汪叫着，仿佛对自己变成${target_name}享乐的玩具十分不满`,
          ); // :3998
          await era.printAndWait(
            `「嗯？着急了吗？本宫可是第一次用这个姿势，你要给本宫一定的心理建设时间才对啊♪」`,
          ); // :3999
          await era.printAndWait(
            `坏心眼的逗弄着身下的野狗，${target_name}笑着用阴唇套弄着狗根，为野狗做起了素股。粘糊糊的爱液被用作润滑液，发出了咕啾咕啾的声音`,
          ); // :4000
          await era.printAndWait(`「汪！汪汪汪！！」`); // :4001
          await era.printAndWait(
            `「好了好了，别急，好好看着，本宫的小穴，完全要归你了哦～♪」`,
          ); // :4002
          await era.printAndWait(
            `${target_name}用双手将小穴给撑开了，对着肿胀的狗根，慢慢坐了下去`,
          ); // :4003
          await era.printAndWait(
            `「哈啊…感觉……好清楚…被小狗狗一点点撑开…啊…到深…深处了…已经全部都进到里面去了啊啊～♪」`,
          ); // :4004
          await era.printAndWait(
            `${target_name}将野狗的阴茎完全吞没了进去，粘稠的爱液因为重力缓缓流到了野狗身上`,
          ); // :4005
          await era.printAndWait(
            `「啊～啊啊啊……好棒……腰自己就动起来了……小狗狗的阴茎…又烫又硬……哈啊～♪」`,
          ); // :4006
          await era.printAndWait(
            `摇摆着腰肢，${target_name}开始追求起交配的乐趣来`,
          ); // :4007
          await era.printAndWait(
            `「啊啊啊嗯啊嗯啊哦嗯…本宫的子宫被穿透了啊…啊啊啊哈嗯……♪」`,
          ); // :4008
          await era.printAndWait(
            `${target_name}配合着娇喘声伸展着翅膀，但那副姿态已经完全失去了天使的高贵和荣耀`,
          ); // :4009
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4011
          await era.printAndWait(''); // :4012
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4014
          await era.printAndWait(''); // :4015
        } else {
          // :4016-4017
          await era.printAndWait(''); // :4018
        } // :4019-4021
      } // :4020-4021
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :4021
      chara(target).kojo.骑乘位 = 1; // :4021
      return 0; // :4021-4022
    } else {
      // :4024-4025

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4026
        if (rand_n(3) == 0) {
          // :4027
          await era.printAndWait(`「小狗狗，你知道的吧～快翻过来♪」`); // :4028
          await era.printAndWait(
            `${target_name}带着笑意这样说着，野狗听话的躺倒露出了肚皮和未勃起的阴茎`,
          ); // :4029
          await era.printAndWait(`「听话的小狗会有奖励的♪哈，还没勃起呢～♪」`); // :4030
          await era.printAndWait(
            `撩了撩头发，${target_name}抚摸着野狗柔软的皮毛，倾下身含住了狗根吮吸套弄起来`,
          ); // :4031
          await era.printAndWait(
            `「咕唔…快点勃起，哈…让我们来做些快乐的事情～♪」`,
          ); // :4032
          await era.printAndWait(
            `舔弄的差不多以后，${target_name}跨坐在野狗身上，用湿润的小穴吞没了肿胀的狗根`,
          ); // :4033
          await era.printAndWait(
            `「哈啊啊～好深…骑乘位好棒……小狗狗的阴茎一跳一跳的♪子宫口也好想要啊…♪」`,
          ); // :4034
          await era.printAndWait(
            `${target_name}淫乱地晃动起了腰部，为了享受更深的快感将阴茎塞到了小穴深处`,
          ); // :4035
          await era.printAndWait(
            `随着抽送而发出咕啾咕啾的声音，秘裂里飞溅的爱液打湿了野狗的皮毛`,
          ); // :4036
          await era.printAndWait(
            `「啊啊嗯啊啊…继续插进来…把本宫的小穴弄得乱七八糟的吧♪」`,
          ); // :4037
          await era.printAndWait(
            `「哈啊…射在里面也没有关系……让本宫…哈…让本宫怀孕吧…啊啊啊啊啊啊♪」`,
          ); // :4038
        } else if (rand_n(2) == 0) {
          // :4039
          await era.printAndWait(`「嗯啊……小狗狗的肉棒…全是本宫的东西♪」`); // :4040
          await era.printAndWait(
            `${target_name}跨骑在野狗身上，前后扭动着腰，品味着龟头和子宫口一次次的接吻的快乐`,
          ); // :4041
          await era.printAndWait(`「好深…太深了……就这样插到子宫里吧～♪」`); // :4042
          await era.printAndWait(
            `一天使一狗的交合处随着腰部动作发出淫荡的咕啾咕啾声，无与伦比的快感让${target_name}成为了渴求性交的雌兽`,
          ); // :4043
          await era.printAndWait(
            `「听到了吗小狗狗，你的肉棒…也在说着喜欢本宫的小穴呢…♪」`,
          ); // :4044
          await era.printAndWait(
            `${target_name}低下头向野狗送上亲吻，唾液交换时的滋滋声和交合的咕啾声显得十分合拍`,
          ); // :4045
          await era.printAndWait(
            `「嗯啾……咕…要到了……一起去吧…射在里面让本宫怀孕吧……哈啊啊啊啊♪」`,
          ); // :4046
        } else {
          // :4047-4048
          await era.printAndWait(`「你这样…就好像变成了本宫的丈夫一样～♪」`); // :4048
          await era.printAndWait(
            `${target_name}骑在野狗身上摇摆着身子，享受着被野狗侵犯的滋味`,
          ); // :4049
          await era.printAndWait(
            `「嗯…又或者说……是本宫变成了你的小母狗呢～♪」`,
          ); // :4050
          await era.printAndWait(
            `毫不在意的说着有失身份的话语，${target_name}呻吟着加快了速度`,
          ); // :4051
          await era.printAndWait(
            `「哈啊……来吧…老公……让本宫怀上你的小狗崽吧……♪」`,
          ); // :4052
          await era.printAndWait(
            `用力沉下腰将野狗的阴茎吞入到最深处，滚烫的狗精就这么直接射进了天使的子宫中`,
          ); // :4053
          await era.printAndWait(`「啊啊啊啊啊……好烫…好棒啊♪」`); // :4054
          await era.printAndWait(
            `同时达到高潮的${target_name}停下动作，细细品味着被野狗内射的滋味`,
          ); // :4055
          await era.printAndWait(
            `「还不够哦♪想让本宫怀孕的话，就这么一次可不够～♪」`,
          ); // :4056
          await era.printAndWait(
            `${target_name}俯下身将自己的乳首送到野狗嘴边享受着口舌的舔舐，粗暴的动作使骑在野狗身上的${target_name}陷入了恍惚`,
          ); // :4057
        } // :4057-4058
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :4059
        chara(target).kojo.骑乘位 = 7; // :4059
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4061
        if (rand_n(4) == 0) {
          // :4062
          await era.printAndWait(''); // :4063
        } else if (rand_n(3) == 0) {
          // :4064
          await era.printAndWait(''); // :4065
        } else if (rand_n(2) == 0) {
          // :4066
          await era.printAndWait(''); // :4067
        } else {
          // :4066-4068
          await era.printAndWait(''); // :4069
        } // :4070-4071
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :4071
        chara(target).kojo.骑乘位 = 6; // :4071
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4073
        if (rand_n(4) == 0) {
          // :4074
          await era.print(''); // :4075
        } else if (rand_n(3) == 0) {
          // :4076
          await era.printAndWait(''); // :4077
        } else if (rand_n(2) == 0) {
          // :4078
          await era.printAndWait(''); // :4079
        } else {
          // :4078-4080
          await era.printAndWait(''); // :4081
        } // :4082-4083
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :4083
        chara(target).kojo.骑乘位 = 5; // :4083
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4085
        if (rand_n(4) == 0) {
          // :4086
          await era.printAndWait(''); // :4087
        } else if (rand_n(3) == 0) {
          // :4088
          await era.printAndWait(''); // :4089
        } else if (rand_n(2) == 0) {
          // :4090
          await era.printAndWait(''); // :4091
        } else {
          // :4090-4092
          await era.printAndWait(''); // :4093
        } // :4094-4095
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :4095
        chara(target).kojo.骑乘位 = 4; // :4095
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4097
        await era.print(''); // :4098
        await era.printAndWait(''); // :4099
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :4100
        chara(target).kojo.骑乘位 = 3; // :4100
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :4102
        await era.printAndWait(''); // :4103
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :4104
        chara(target).kojo.骑乘位 = 2; // :4104
      } // :4104-4105
      return 0; // :4104-4106
    } // :4104-4107
  } // :4108-4111

  if (era_flag.selectcom == 37) {
    // :4113

    if (chara(target).kojo.肛门侍奉 == 0) {
      // :4115

      if (era0(`abl:${target}:16`) >= 3) {
        // :4117
        await era.printAndWait(`「为什么…要给狗……」`); // :4118
      } else {
        // :4119-4120
        await era.printAndWait(''); // :4121
      } // :4122-4123
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :4123
      chara(target).kojo.肛门侍奉 = 1; // :4123
      return 0; // :4123-4124
    } else {
      // :4126-4127

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4128
        if (rand_n(2) == 0) {
          // :4129
          await era.print(`「小狗狗想要的话……也是没办法的呢～♪」`); // :4130
          await era.printAndWait(
            `${target_name}固定住野狗的身体，伸出舌头舔舐起野狗的肛门来`,
          ); // :4131
          await era.printAndWait(
            `「嗯…嗯嗯…奇怪的味道♪嗯…啾…这样把舌头伸进肛门…哈啊……你喜欢吗？」`,
          ); // :4132
          await era.printAndWait(
            `故意发出着下流的声音，${target_name}将舌头深深的探了进去`,
          ); // :4133
          await era.printAndWait(`「啊啊…啾……本宫的身体也开始热起来了…咕…♪」`); // :4134
          await era.printAndWait(
            `${target_name}仔细地舔舐着野狗的肛门，将每一处皱褶都舔得干干净净`,
          ); // :4135
        } else {
          // :4136-4137
          await era.print(
            `「哈啊哈啊…小狗狗的肛穴…虽然味道有点怪怪的…啾…但是最喜欢了～♪」`,
          ); // :4137
          await era.printAndWait(
            `${target_name}用舌尖探入野狗的肛门，柔软的舌头温柔的爱抚着肠壁上的褶皱`,
          ); // :4138
          await era.printAndWait(
            `「咕呣……咕呣…你发着抖…哈…是舌头这样舔感觉很舒服吗…」`,
          ); // :4139
          await era.printAndWait(
            `${target_name}目光湿润，完全沉浸在侍奉野狗的快感中了`,
          ); // :4140
        } // :4140-4141
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :4142
        chara(target).kojo.肛门侍奉 = 6; // :4142
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4144
        await era.printAndWait(''); // :4145
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :4146
        chara(target).kojo.肛门侍奉 = 5; // :4146
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4148
        await era.print(''); // :4149
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :4150
        chara(target).kojo.肛门侍奉 = 4; // :4150
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4152
        await era.printAndWait(''); // :4153
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :4154
        chara(target).kojo.肛门侍奉 = 3; // :4154
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :4156
        await era.printAndWait(''); // :4157
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :4158
        chara(target).kojo.肛门侍奉 = 2; // :4158
      } // :4158-4159
      return 0; // :4158-4160
    } // :4158-4161
  } // :4162-4165

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :4168

    if (chara(target).kojo.眼罩 == 0) {
      // :4170

      if (era0(`talent:${target}:136`) == 1) {
        // :4172
        await era.printAndWait(
          `「究竟要带本宫去什么地方？嗯…？这个声音，是小狗狗吗？」`,
        ); // :4173
        await era.printAndWait(
          `被遮蔽视线的${target_name}显得有些不安，小心翼翼的试探着周围的环境`,
        ); // :4174
        await era.printAndWait(`「真的是小狗狗，太好了，总算是有点安心了。」`); // :4175
        await era.printAndWait(
          `「什么？本宫才不是在害怕，只是在高兴小狗狗在而已，就是这样的！」`,
        ); // :4176
        await era.printAndWait(
          `蹲下身抱住身旁的野狗，${target_name}又变得理直气壮起来`,
        ); // :4177
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4179
        await era.printAndWait(''); // :4180
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4182
        await era.printAndWait(''); // :4183
      } else {
        // :4184-4185
        await era.printAndWait(''); // :4186
      } // :4187-4188
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4188
      chara(target).kojo.眼罩 = 1; // :4188
      return 0; // :4188-4189
    } else {
      // :4191-4192

      if (
        era0(`talent:${target}:136`) == 1 &&
        (chara(target).kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        // :4193
        await era.printAndWait(`「又要带本宫去哪里？小狗狗…？你在这啊。」`); // :4194
        await era.printAndWait(
          `似乎已经有些习惯了，${target_name}抱着野狗主动摩擦起它的皮毛来`,
        ); // :4195
        await era.printAndWait(
          `「对象是小狗狗的话……啊又要被弄得乱七八糟了……」`,
        ); // :4196
        await era.printAndWait(`「只……只要想到这些…快点开始吧～♪」`); // :4197
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :4198
        chara(target).kojo.眼罩 = 10; // :4198
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :4200
        await era.printAndWait(''); // :4201
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4202
        chara(target).kojo.眼罩 = 9; // :4202
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :4204
        await era.printAndWait(''); // :4205
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4206
        chara(target).kojo.眼罩 = 8; // :4206
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4208
        await era.printAndWait(''); // :4209
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4210
        chara(target).kojo.眼罩 = 7; // :4210
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4212
        await era.printAndWait(''); // :4213
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4214
        chara(target).kojo.眼罩 = 6; // :4214
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4216
        await era.printAndWait(''); // :4217
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4218
        chara(target).kojo.眼罩 = 5; // :4218
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4220
        await era.printAndWait(''); // :4221
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4222
        chara(target).kojo.眼罩 = 4; // :4222
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4224
        await era.printAndWait(''); // :4225
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4226
        chara(target).kojo.眼罩 = 3; // :4226
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :4228
        await era.printAndWait(''); // :4229
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4230
        chara(target).kojo.眼罩 = 2; // :4230
      } // :4230-4231
      return 0; // :4230-4232
    } // :4233-4234
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :4235

    if (
      era0(`talent:${target}:136`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4237
      await era.printAndWait(`「真舍不得你啊小狗狗……」`); // :4238
      await era.printAndWait(
        `不想同野狗分别的${target_name}，用赤裸的身躯来回摩擦着怀里的野狗`,
      ); // :4239
      await era.printAndWait(`「啾……嗯…临别的吻……让本宫再享受一下吧……♪」`); // :4240
      // CFLAG:380  = 4（变量语义：CFLAG 族，380） // :4241
      chara(target).kojo.眼罩着脱 = 4; // :4241
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4243
      await era.printAndWait(''); // :4244
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :4245
      chara(target).kojo.眼罩着脱 = 3; // :4245
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4247
      await era.printAndWait(''); // :4248
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :4249
      chara(target).kojo.眼罩着脱 = 2; // :4249
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :4251
      await era.printAndWait(''); // :4252
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :4253
      chara(target).kojo.眼罩着脱 = 1; // :4253
    } // :4253-4254
    return 0; // :4253-4255
  } // :4253-4256

  if (era_flag.selectcom == 56) {
    // :4262

    if (chara(target).kojo.交谈 == 0) {
      // :4264
      if (era0(`tequip:${target}:53`)) {
        // :4265

        if (era0(`talent:${target}:136`) == 1) {
          // :4268
          await era.printAndWait(
            `「本宫是${target_name}……原来是个天使……但本宫现在已经不当天使，改当小狗狗的雌犬了♪」`,
          ); // :4269
          await era.printAndWait(
            `${target_name}一边对水晶球这么说着，一边抱紧了身旁的野狗`,
          ); // :4270
          await era.printAndWait(
            `「在被它征服之后以后，就一直主动寻求和小狗狗的交配……它已经成为本宫的丈夫了呢～♪」`,
          ); // :4271
          await era.printAndWait(
            `带着笑意这么介绍着自己和野狗的关系，${target_name}热情得和野狗接起吻来`,
          ); // :4272
          await era.printAndWait(`「咕…哈……老公…喜欢本宫的吻吗…？」`); // :4273
          await era.printAndWait(
            `${target_name}一边探出小舌和野狗交缠，一边伸手握住了野狗开始勃起的阴茎套弄起来`,
          ); // :4274
          await era.printAndWait(
            `「啾…嗯唔……已经想做了？哈……那让全世界都来看看…你有多棒吧♪」`,
          ); // :4275
          await era.printAndWait(
            `「那么现在，就让本宫和老公一起，做许许多多舒服的事情吧♪」`,
          ); // :4276
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4278
          await era.printAndWait(
            `「呃……本宫叫${target_name}……原来是个天使……但本宫现在已经不当天使，成为魔王大人的牝奴隶了。」`,
          ); // :4279
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :4280
          await era.printAndWait(
            `「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的本宫吧！」`,
          ); // :4281
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :4282
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4284
          await era.printAndWait(
            `「呃……本宫叫${target_name}……原来是个天使……但本宫现在已经不当天使，成为魔王大人的奴隶了。」`,
          ); // :4285
          await era.printAndWait(
            `${target_name}一边这么说着，一边顺从地对水晶球分开双腿。`,
          ); // :4286
          await era.printAndWait(
            `「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的本宫吧！」`,
          ); // :4287
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :4288
        } else {
          // :4290-4291
          await era.printAndWait(
            `「看到这个水晶球的人！谁都好！谁都可以！！请来救救本宫吧！！呜呜……呜呜呜…………哇！！！！」`,
          ); // :4291
        } // :4291-4292
      } // :4293-4294
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4294
      chara(target).kojo.交谈 = 1; // :4294
      return 0; // :4294-4295
    } else {
      // :4297-4298
      if (era0(`tequip:${target}:53`)) {
        // :4298

        if (
          era0(`talent:${target}:136`) == 1 &&
          (chara(target).kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          // :4301
          await era.printAndWait(
            `「啊……本宫是${target_name}……大家对本宫的上一部作品感觉如何呢？」`,
          ); // :4302
          await era.printAndWait(
            `${target_name}对着水晶球说着，搂住野狗的脑袋，将乳首送到它嘴边享受舔弄`,
          ); // :4303
          await era.printAndWait(
            `「哈…好棒…♪那么这次，也是本宫和小狗狗交配的实况了……嘻嘻～当野狗的雌犬真是幸福呢～♪」`,
          ); // :4304
          await era.printAndWait(
            `压着野狗的脑袋向下，${target_name}享受着野狗的舔阴，边伸手套弄起狗根来`,
          ); // :4305
          await era.printAndWait(`「本宫的野狗老公……是世界上最棒的丈夫了♪」`); // :4306
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :4307
          chara(target).kojo.交谈 = 5; // :4307
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :4309
          await era.printAndWait(
            `「呃……本宫叫${target_name}……大家对本宫的上一部的兽交作品感觉如何呢？」`,
          ); // :4310
          await era.printAndWait(
            `${target_name}一边这么说着，一边对水晶球淫靡地扭腰摆臀。`,
          ); // :4311
          await era.printAndWait(
            `「这次，在主人的命令下，本宫又要和狗交配了……尽情地鄙视这样下贱的本宫吧！」`,
          ); // :4312
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :4313
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :4314
          chara(target).kojo.交谈 = 4; // :4314
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :4316
          await era.printAndWait(
            `「呃……本宫叫${target_name}……大家对本宫的上一次的交配感觉如何呢？」`,
          ); // :4317
          await era.printAndWait(
            `${target_name}一边这么说着，一边顺从地对水晶球分开双腿。`,
          ); // :4318
          await era.printAndWait(
            `「这次，在主人的命令下，本宫又要和狗交配了……尽情地鄙视这样下贱的本宫吧！」`,
          ); // :4319
          await era.printAndWait(
            `「现在，就让本宫们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」`,
          ); // :4320
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :4321
          chara(target).kojo.交谈 = 3; // :4321
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :4323
          await era.printAndWait(''); // :4324
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :4325
          chara(target).kojo.交谈 = 2; // :4325
        } // :4325-4326
      } // :4325-4327
      return 0; // :4325-4328
    } // :4325-4329
  } // :4325-4330

  return 0; // :4333-4337
}

// @kojo_message_palamcng_903 // :4341
async function kojo_message_palamcng_903() {
  const target = era_flag.target;
  const kojo = chara(target).kojo;
  if (era0(`tequip:${target}:45`)) {
    // :4346-4347
    return 0; // :4346-4347
  } // :4346-4347

  if (game.train.失神) {
    // :4349-4350
    return 0; // :4349-4350
  } // :4349-4350

  if (era0(`tequip:${target}:55`)) {
    // :4352
    return 0; // :4352-4353
  } // :4352-4354

  const p_lube =
    (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // :4362 P = PALAM:3 + UP:3
  if (p_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    // :4363

    if (era0(`talent:${target}:85`) == 1) {
      // :4365

      if (era_flag.selectcom == 50) {
        // :4367
        await era.printAndWait(`「黏黏的……有点凉……」`); // :4368
        await era.printAndWait(
          `「魔王大人，是想让本宫不感到痛才用这种东西的吧……嘛……并……并不讨厌呢……」`,
        ); // :4369
      } else {
        // :4371-4372
        await era.printAndWait(`「魔王大人……本宫已经……湿得乱七八糟了～」`); // :4372
      } // :4372-4373
    } else {
      // :4375-4376

      if (era_flag.selectcom == 50) {
        // :4377
        await era.printAndWait(`「什么嘛！这黏糊糊的…」`); // :4378
        await era.printAndWait(`「这……是润滑用的吗……接下来……难道……」`); // :4379
      } else {
        // :4381-4382
        await era.printAndWait(
          `「哈……只是从本宫身体里分泌出一点液体罢了……没……没什么大不了的！！」`,
        ); // :4382
      } // :4382-4383
    } // :4384-4385
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :4385
    chara(target).kojo.首次润滑Lv2 = 1; // :4385
  } // :4385-4386

  const p_lust =
    (era0(`palam:${target}:5`) || 0) + (era0(`delta:${target}:5`) || 0); // :4391 P = PALAM:5 + UP:5
  if (p_lust > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    // :4392

    if (era0(`talent:${target}:85`) == 1) {
      // :4394

      if (era_flag.selectcom == 51) {
        // :4396
        await era.printAndWait(`「啊～五彩缤纷的！好棒～好棒啊！…」`); // :4397
      } else {
        // :4399-4400
        await era.printAndWait(`「魔王大人…本宫……想要更加地…被你疼爱……」`); // :4400
      } // :4400-4401
    } else {
      // :4403-4404

      if (era_flag.selectcom == 51) {
        // :4405
        await era.printAndWait(`「卑鄙！…用这种手段………」`); // :4406
      } else {
        // :4408-4409
        await era.printAndWait(`「难以置信…本宫………居然……会产生这种………快感？」`); // :4409
      } // :4409-4410
    } // :4411-4412
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :4412
    chara(target).kojo.首次欲情Lv2 = 1; // :4412
  } // :4412-4413

  const p_shame =
    (era0(`palam:${target}:8`) || 0) + (era0(`delta:${target}:8`) || 0); // :4418 P = PALAM:8 + UP:8
  if (p_shame > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    // :4419

    if (era0(`talent:${target}:85`) == 1) {
      // :4421
      await era.printAndWait(`「魔王大人！…本宫……本宫现在好害羞啊………」`); // :4422
    } else {
      // :4424-4425
      await era.printAndWait(`「哈…只是这种……这种程度的羞耻感……」`); // :4425
      await era.printAndWait(`但是嘉德已经涨红了脸，害羞得不得了了`); // :4426
    } // :4426-4427
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :4428
    chara(target).kojo.首次耻情Lv2 = 1; // :4428
  } // :4428-4429

  const p_fear =
    (era0(`palam:${target}:10`) || 0) + (era0(`delta:${target}:10`) || 0); // :4434 P = PALAM:10 + UP:10
  if (p_fear > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    // :4435

    if (era0(`talent:${target}:85`) == 1) {
      // :4437
      await era.printAndWait(
        `「魔王……大人……本宫…还不是很害怕……还可以坚持…………」`,
      ); // :4438
      await era.printAndWait(`话虽如此，但她的身体却开始发抖了…………`); // :4439
    } else {
      // :4441-4442
      await era.printAndWait(
        `「只是这种程度罢了！想让本宫屈服？还为时尚早呢！」`,
      ); // :4442
      await era.printAndWait(`话虽如此，但她的身体却开始发抖了…………`); // :4443
    } // :4443-4444
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :4445
    chara(target).kojo.首次恐怖Lv2 = 1; // :4445
  } // :4445-4446

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    // :4451

    if (era0(`talent:${target}:85`) == 1) {
      // :4453
      await era.printAndWait(
        `「魔……魔王……大人……要去了！！小豆豆被玩弄着就！！……啊哈哈啊啊啊～！！」`,
      ); // :4454
    } else {
      // :4456-4457
      await era.printAndWait(
        `「停……停手啊！……那里被玩弄着……竟然……这感觉是……唔啊啊啊啊啊！！」`,
      ); // :4457
    } // :4457-4458
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :4459
    chara(target).kojo.首次C绝顶 = 1; // :4459
  } // :4459-4460

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    // :4465

    if (era0(`talent:${target}:76`) == 1) {
      // :4467
      await era.printAndWait(
        `「啊啊啊！小穴！小穴要去了！！好棒！这感觉好棒～！再继续对本宫～～做更多～～！」`,
      ); // :4468
    } else if (era0(`talent:${target}:85`) == 1) {
      // :4470
      await era.printAndWait(
        `「啊啊啊！里面…有什么…这…………？！……唔……哦哦哦哦哦！…！」`,
      ); // :4471
    } else {
      // :4473-4474
      await era.printAndWait(
        `「别！别这样！…呃……本宫怎么会这么轻易就…唔哦哦哦哦哦哦！！」`,
      ); // :4474
    } // :4474-4475
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :4476
    chara(target).kojo.首次V绝顶 = 1; // :4476
  } // :4476-4477

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    // :4482

    if (era0(`talent:${target}:76`) == 1) {
      // :4484
      await era.printAndWait(
        `「啊哈！好！好棒！第一次……第一次用菊花高潮了！！」`,
      ); // :4485
    } else if (era0(`talent:${target}:85`) == 1) {
      // :4487
      await era.printAndWait(
        `「原来……这里……也可以有这么强烈的～呜～啊啊好害羞啊啊！！」`,
      ); // :4488
    } else {
      // :4490-4491
      await era.printAndWait(
        `「讨厌！讨厌！！这里不是！！不是用来～不……要……哇啊啊啊啊啊！！坏掉了……本宫的屁股……坏掉了…………」`,
      ); // :4491
    } // :4491-4492
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :4493
    chara(target).kojo.首次A绝顶 = 1; // :4493
  } // :4493-4494

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    // :4499

    if (era0(`talent:${target}:85`) == 1) {
      // :4501
      await era.printAndWait(`「胸部…好幸福………啊啊！去了！要去了啦！！！」`); // :4502
    } else {
      // :4504-4505
      await era.printAndWait(
        `「啊！唔啊啊！！不要！不要再碰本宫的胸了哈啊啊啊啊～！」`,
      ); // :4505
    } // :4505-4506
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :4507
    chara(target).kojo.首次B绝顶 = 1; // :4507
  } // :4507-4508

  const a =
    (era0(`delta:${target}:11`) || 0) + (era0(`delta:${target}:12`) || 0); // :4513 A = UP:11 + UP:12
  if (game.train.处女丧失 == 1 && chara(target).kojo.处女丧失 == 0) {
    // :4514

    if (game.train.主人导致处女丧失 == 1) {
      // :4516

      if (
        era0(`talent:${target}:76`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4518
        await era.printAndWait(
          `「啊～第一次就这样……唔虽然有点痛……但是……还不错呢……」`,
        ); // :4519
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4521
        await era.printAndWait(
          `「第……第一次做这种事……就是和魔王大人……虽然很痛……但是……本宫……很幸福……」`,
        ); // :4522
      } else {
        // :4524-4525
        await era.printAndWait(`「被……你这种家伙……玷污了呢……」`); // :4525
      } // :4525-4526
    } else {
      // :4528-4529

      if (era0(`talent:${target}:76`) == 1) {
        // :4530
        await era.printAndWait(
          `「果然还是魔王大人亲自来……会比较好吗？……好痛……」`,
        ); // :4531
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4533
        await era.printAndWait(`「属于魔王大人的身体……被……玷污了……」`); // :4534
      } else {
        // :4536-4537
        await era.printAndWait(`「居然……就这样……呜……」`); // :4537
      } // :4537-4538
    } // :4539-4540
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :4540
    chara(target).kojo.处女丧失 = 1; // :4540
  } // :4540-4541
}

// @kojo_message_markcng_903 // :4548
async function kojo_message_markcng_903() {
  const target = era_flag.target;
  if (era0(`tequip:${target}:45`)) {
    // :4553-4554
    return 0; // :4553-4554
  } // :4553-4554

  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {
    // :4558

    if (era0(`talent:${target}:85`) == 1) {
      // :4560
      await era.printAndWait(`「感觉好痛苦……这难道……也是……爱的滋味吗？……」`); // :4561
    } else {
      // :4562-4563
      await era.printAndWait(`「疼、疼痛感……啊…啊啊……」`); // :4563
      await era.printAndWait(
        `「本宫可不能输给痛觉啊！」她在脑海里这么对自己说着，但是疼痛的记忆确确实实刻在她的灵魂里了……`,
      ); // :4564
    } // :4564-4565
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :4566
    chara(target).kojo.苦痛刻印Lv3 = 1; // :4566
  } // :4566-4567

  if (game.system.快乐刻印变动 == 3 && chara(target).kojo.快乐刻印Lv3 == 0) {
    // :4572

    if (era0(`talent:${target}:85`) == 1) {
      // :4574
      await era.printAndWait(
        `「有、有感觉了…………魔王大人……魔王大人哦！！……本宫也开始……感到那种快感了！！」`,
      ); // :4575
    } else {
      // :4576-4577
      await era.printAndWait(
        `「怎、怎么会……有……有感觉了……呜……本宫竟然……输给了这种感觉……」`,
      ); // :4577
    } // :4577-4578
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :4579
    chara(target).kojo.快乐刻印Lv3 = 1; // :4579
  } // :4579-4580

  if (game.system.屈服刻印变动 == 3 && chara(target).kojo.屈服刻印Lv3 == 0) {
    // :4585

    if (era0(`talent:${target}:85`) == 1) {
      // :4587
      await era.printAndWait(`「本宫…是魔王大人的……永远……永远都是！」`); // :4588
    } else {
      // :4589-4590
      await era.printAndWait(`「好、好吧……本宫…稍微……听一下你的意见……也……」`); // :4590
    } // :4590-4591
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :4592
    chara(target).kojo.屈服刻印Lv3 = 1; // :4592
  } // :4592-4593

  if (game.system.反抗刻印变动 == 3 && chara(target).kojo.反抗刻印Lv3 == 0) {
    // :4598

    if (era0(`talent:${target}:85`) == 1) {
      // :4600
      await era.printAndWait(
        `「魔王大人！……竟然对本宫！！做这样的事！！可恶……可恶啊啊啊啊啊！！！」`,
      ); // :4601
    } else {
      // :4602-4603
      await era.printAndWait(
        `「本宫发誓，总有一天要将你轰杀致渣！总有一天！！」`,
      ); // :4603
    } // :4603-4604
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :4605
    chara(target).kojo.反抗刻印Lv3 = 1; // :4605
  } // :4605-4606
}

// @self_kojo_k903 // :4612
async function self_kojo_k903(rand) {
  void rand;
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const Q = peek_aftertrain_q();
  if (game.train.初吻与自我口上 == 1) {
    // :4616

    if (Q == 1) {
      // :4618
      await era.print(''); // :4619
    } else if (Q == 2) {
      // :4621
      await era.print(`「小狗狗…啊…小狗狗的肉棒～………！」`); // :4622
      await era.printAndWait(
        `${target_name}抚摸着自己的身体，忍不住将手指向下探去………`,
      ); // :4623
      await era.printAndWait(`「想做……哈啊……还想和小狗狗交尾………！」`); // :4624
      await era.printAndWait(
        `「呜哈……想被滚烫的野兽精子填满……啊啊………小狗狗……」`,
      ); // :4625
      await era.printAndWait(
        `幻想着野狗的模样，${target_name}的中指快速抽插着小穴，但似乎完全没法获得满足的样子………`,
      ); // :4626
      await era.printAndWait(`「唔…小狗狗………」`); // :4627
    } else {
      // :4629-4630

      if (
        era0(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        // :4631
        await era.printAndWait(
          `「啊……这种作为女人的快感…本宫…还没享受够呢…………呜哈啊啊啊……哈……」`,
        ); // :4632
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :4633
        chara(target).kojo.调教后自慰 = 4; // :4633
      } else if (
        era0(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        // :4635
        await era.printAndWait(
          `「魔王大人………魔王大人啊……嗯唔唔……只是想着你，本宫的手就～」`,
        ); // :4636
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :4637
        chara(target).kojo.调教后自慰 = 3; // :4637
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        // :4639
        await era.printAndWait(`「停不下来…停不下来啦～…变得……奇怪了！…」`); // :4640
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :4641
        chara(target).kojo.调教后自慰 = 2; // :4641
      } else if (chara(target).kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        // :4643
        await era.printAndWait(`「唔……呃……哦！～………啊啊啊！」`); // :4644
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :4645
        chara(target).kojo.调教后自慰 = 1; // :4645
      } // :4645-4646
    } // :4645-4647
  } // :4645-4648

  if (game.train.初吻与自我口上 == 2) {
    // :4653

    if (
      era0(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      // :4655
      await era.printAndWait(
        `「女人的身体…真是好东西啊…唔哦！！……再更加……再更加粗暴地对待本宫吧！…」`,
      ); // :4656
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :4657
      chara(target).kojo.百合PLAY = 5; // :4657
    } else if (
      era0(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      // :4659
      await era.printAndWait(
        `「女人的身体…真是好东西啊…嘻嘻！……再更加抱紧本宫吧！…」`,
      ); // :4660
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :4661
      chara(target).kojo.百合PLAY = 4; // :4661
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4663
      await era.printAndWait(`「没有女人的话…本宫可能活不下去了………」`); // :4664
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :4665
      chara(target).kojo.百合PLAY = 3; // :4665
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4667
      await era.printAndWait(`「明明本宫也是女人………可是………好棒啊…………」`); // :4668
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :4669
      chara(target).kojo.百合PLAY = 2; // :4669
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      // :4671
      await era.printAndWait(`「本宫居然…对…女人………」`); // :4672
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :4673
      chara(target).kojo.百合PLAY = 1; // :4673
    } // :4673-4674
  } // :4673-4675

  if (game.train.初吻与自我口上 == 3) {
    // :4680

    if (
      era0(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4682
      await era.printAndWait(`「魔王大人～～早安～～」`); // :4683
      await era.printAndWait(`「今天也来和本宫一起玩吧～～！」`); // :4684
      await era.printAndWait(
        `${target_name}伸出舌头，把嘴里滴落的精液舔干净了。`,
      ); // :4685
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :4686
      chara(target).kojo.朝口交 = 3; // :4686
    } else if (
      era0(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4688
      await era.printAndWait(`「早安，魔王君～♪」`); // :4689
      await era.printAndWait(
        `${target_name}甜甜地笑着，用心地侍奉着你的阴茎。`,
      ); // :4690
      await era.printAndWait(`「…………只……只是为了叫你起床罢了……！」`); // :4691
      await era.printAndWait(`${target_name}羞涩地说着。`); // :4692
      await era.printAndWait(`「不要去找别的狐狸精啊～～」`); // :4693
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :4694
      chara(target).kojo.朝口交 = 3; // :4694
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4696
      await era.printAndWait(`「…………只是为了叫你起床罢了，不要误会。」`); // :4697
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :4698
      chara(target).kojo.朝口交 = 2; // :4698
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      // :4700
      await era.printAndWait(
        `「唔……为什么本宫必须要这样把你弄醒啊……好恶心……」`,
      ); // :4701
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :4702
      chara(target).kojo.朝口交 = 1; // :4702
    } // :4702-4703
  } // :4702-4704

  if (game.train.初吻与自我口上 == 4) {
    // :4709

    if (
      era0(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4711
      await era.printAndWait(
        `「唔～哦哦哦哦！……又……啊～又这么有感觉……啊啊啊啊啊！～♪」`,
      ); // :4712
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :4713
      chara(target).kojo.调教后性交 = 2; // :4713
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      // :4715
      await era.printAndWait(`「哈……只是……一些余兴活动～♪」`); // :4716
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :4717
      chara(target).kojo.调教后性交 = 1; // :4717
    } // :4717-4718
  } // :4717-4719

  if (game.train.初吻与自我口上 == 5) {
    // :4724
    if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      // :4725
      await era.printAndWait(`「本宫晚上……稍微有点睡不着呢……想，想看着你……」`); // :4726
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :4727
      chara(target).kojo.夜袭 = 1; // :4727
    } // :4727-4728
  } // :4727-4729

  if (game.train.初吻与自我口上 == 6) {
    // :4734

    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      // :4736
      await era.printAndWait(''); // :4737
    } else if (era0(`mark:${target}:3`) == 3) {
      // :4739
      await era.printAndWait(''); // :4740
    } else if (era0(`talent:${target}:76`)) {
      // :4742
      await era.printAndWait(''); // :4743
    } else {
      // :4744-4745
      await era.printAndWait(''); // :4746
    } // :4747-4749
    await era.print(''); // :4748
    if (era0(`talent:${target}:122`) != 1) {
      // :4750
      stub_line('SELL_MATURO_K0'); // :4750
    } // :4750
  } // :4750-4751

  if (game.train.初吻与自我口上 == 11) {
    // :4757
    if (chara(target).kojo.妊娠发觉 >= 1) {
      // :4758-4759
      return 0; // :4758-4759
    } // :4758-4759

    if (era0(`talent:${target}:9`) == 1) {
      // :4761
      await era.printAndWait(`「啊，哈，呼呼，呵呵呵呵，嘿嘿～～」`); // :4762
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :4764
      await era.printAndWait(
        `「呜……被魔王大人射了那么多进去……怀孕了也没办法呢……魔王大人你可一定要对本宫负起责任来哦～」`,
      ); // :4765
    } else if (chara(target).event.妊娠相手 == 2) {
      // :4767
      await era.printAndWait(
        `「说……说了不要再本宫肚子里面乱来了啊……这……这下子怎么办啊」`,
      ); // :4768
    } else if (chara(target).event.妊娠相手 == 3) {
      // :4770
      await era.printAndWait(
        `「说……说了不要再本宫肚子里面乱来了啊……这……这下子怎么办啊」`,
      ); // :4771
    } else if (chara(target).event.妊娠相手 == 5) {
      // :4773
      if (era0(`talent:${target}:136`) == 1) {
        // :4774
        await era.printAndWait(
          `「欸？这也是没办法的呢……毕竟被小狗狗射了这么多～♪」`,
        ); // :4775
        await era.printAndWait(
          `意识到肚子里孩子的父亲竟然是野狗，${target_name}抚摸着肚子温柔的笑着`,
        ); // :4776
        await era.printAndWait(
          `「堂堂天使竟然会心甘情愿怀上野狗的孩子，真是不可小觑的野兽♪」`,
        ); // :4777
      } else {
        // :4777-4778
        await era.printAndWait(''); // :4779
      } // :4780-4781
    } else if (chara(target).event.妊娠相手 == 6) {
      // :4782
      if (era0(`talent:${target}:136`) == 1) {
        // :4783
        await era.printAndWait(
          `「欸？怀孕……也没办法啊，毕竟被那些怪物们内射了这么多～♪」`,
        ); // :4784
        await era.printAndWait(
          `得知自己怀了怪物的孩子，${target_name}抚摸着肚子摇了摇头`,
        ); // :4785
        await era.printAndWait(`「也不知道是哪个幸运儿的种子顺利成长了呢♪」`); // :4786
      } else {
        // :4786-4787
        await era.printAndWait(''); // :4788
      } // :4789-4790
    } else if (chara(target).event.妊娠相手 == 7) {
      // :4791
      await era.printAndWait(''); // :4792
    } else {
      // :4793-4794
      await era.printAndWait(''); // :4795
    } // :4796-4797
    // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :4797
    chara(target).kojo.妊娠发觉 = 1; // :4797
  } // :4797-4798

  if (game.train.初吻与自我口上 == 12) {
    // :4804
    if (chara(target).kojo.生产 >= 1) {
      // :4805-4806
      return 0; // :4805-4806
    } // :4805-4806

    if (era0(`talent:${target}:9`) == 1) {
      // :4808
      await era.printAndWait(`「嘻嘻……嘿嘿～…………嘿嘿嘿嘿～…………」`); // :4809
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :4811
      await era.printAndWait(''); // :4812
    } else if (chara(target).event.妊娠相手 == 2) {
      // :4814
      await era.printAndWait(''); // :4815
    } else if (chara(target).event.妊娠相手 == 3) {
      // :4817
      await era.printAndWait(''); // :4818
    } else if (chara(target).event.妊娠相手 == 5) {
      // :4820
      if (era0(`talent:${target}:136`) == 1) {
        // :4821
        await era.printAndWait(`「平安的出生了呢……真是可爱的小狗崽……♪」`); // :4822
        await era.printAndWait(
          `刚生产完还十分虚弱的${target_name}抚摸着小狗崽的皮毛，脸上洋溢着母性的笑容`,
        ); // :4823
        await era.printAndWait(
          `「只是普通模样的小狗呢，还以为会带上翅膀什么的，呵呵，毕竟它的母亲可是个天使啊♪」`,
        ); // :4824
        await era.printAndWait(
          `「下次再为小狗狗怀上的时候，说不定就会生下新品种的小狗了呢～♪」`,
        ); // :4825
      } else {
        // :4825-4826
        await era.printAndWait(''); // :4827
      } // :4828-4829
    } else if (chara(target).event.妊娠相手 == 6) {
      // :4830
      if (era0(`talent:${target}:136`) == 1) {
        // :4831
        await era.printAndWait(`「顺利生下了呢～」`); // :4832
        await era.printAndWait(
          `${target_name}摸了摸小怪物的脑袋，脸上洋溢着母性的笑容`,
        ); // :4833
        await era.printAndWait(
          `「原来是它的孩子，真可爱，可惜没能带上天使的翅膀。」`,
        ); // :4834
        await era.printAndWait(`「下次还有机会的吧♪」`); // :4835
      } else {
        // :4835-4836
        await era.printAndWait(''); // :4837
      } // :4838-4839
    } else if (chara(target).event.妊娠相手 == 7) {
      // :4840
      await era.printAndWait(''); // :4841
    } else {
      // :4842-4843
      await era.printAndWait(''); // :4844
    } // :4845-4846
    // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :4846
    chara(target).kojo.生产 = 1; // :4846
  } // :4846-4847

  if (game.train.初吻与自我口上 == 13) {
    // :4852

    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :4854

      if (era0(`talent:${target}:153`)) {
        // :4856
        await era.printAndWait(''); // :4857
      } else if (era0(`talent:${target}:154`)) {
        // :4859
        await era.printAndWait(''); // :4860
      } // :4859-4861
    } // :4862-4863
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :4863
    chara(target).kojo.育儿室 = 1; // :4863
  } // :4863-4864

  if (game.train.初吻与自我口上 == 14) {
    // :4869

    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :4871
      await era.printAndWait(''); // :4872
    } // :4873-4874
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :4874
    chara(target).kojo.亲离 = 1; // :4874
  } // :4874-4875

  if (game.train.初吻与自我口上 == 999) {
    // :4881

    if (era0(`talent:${target}:85`)) {
      // :4883
      await era.printAndWait(''); // :4884
    } else {
      // :4885-4886
      await era.printAndWait(''); // :4887
    } // :4885-4888
  } // :4889-4892

  if (game.train.初吻与自我口上 == 998) {
    // :4894

    if (era0(`talent:${target}:85`)) {
      // :4896
      await era.printAndWait(''); // :4897
    } else {
      // :4898-4899
      await era.printAndWait(''); // :4900
    } // :4898-4901
  } // :4902-4904

  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :4907
  game.train.初吻与自我口上 = 0; // :4907

  return 0; // :4907-4909
}

// @dungeon_ryouzyoku_k903 // :4940
async function dungeon_ryouzyoku_k903() {
  const target = era_flag.target;
  if (era0(`talent:${target}:0`) == 1) {
    // :4945

    await era.printAndWait(`「放开本宫！！这些！这些下贱的生物！！！」`); // :4947

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :4949

      await era.printAndWait(`「可恶！」`); // :4952

      return 0; // :4954-4955
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      // :4955

      await era.printAndWait(
        `「求你们！放过本宫………这种事，要和喜欢的人做………」`,
      ); // :4958

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        // :4962
        await era.printAndWait(
          `「用……用后面吧！！虽然有点脏…不过本宫不介意的…………」`,
        ); // :4962
      } // :4962

      if (era0(`exp:${target}:22`) > 0) {
        // :4966
        await era.printAndWait(`「呜……本宫用嘴！……本宫用嘴可以么？…」`); // :4966
      } // :4966
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :4968

      await era.printAndWait(
        `「放开本宫！！不要拿你们的脏手碰本宫！想要被轰成碎屑吗！！」`,
      ); // :4972
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :4974

      await era.printAndWait(`「这……莫非就是本宫的命运………」`); // :4977
    } else {
      // :4979-4981

      await era.printAndWait(`「这种屈辱……本宫绝不屈服！！…」`); // :4982
    } // :4982-4984
  } else {
    // :4985-4986

    await era.printAndWait(`（她早就把处女用掉了！）`); // :4987

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :4989

      await era.printAndWait(`「唉…………」`); // :4992

      return 0; // :4994-4995
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      // :4995

      await era.printAndWait(`「把本宫救出去吧？本宫再好好地报答你们？」`); // :4998

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        // :5002
        await era.printAndWait(`「用后面……用后面的话……就随你们弄………」`); // :5002
      } // :5002

      if (era0(`exp:${target}:22`) > 0) {
        // :5006
        await era.printAndWait(
          `「其它放过本宫！本宫用嘴！本宫用嘴尽力地满足你们…」`,
        ); // :5006
      } // :5006
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5008

      await era.printAndWait(
        `「放开本宫！！不要拿你们的脏手碰本宫！想要被轰成碎屑吗！！」`,
      ); // :5012
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5014

      await era.printAndWait(`「本宫……要完蛋了吗………」`); // :5017
    } else {
      // :5019-5021

      await era.printAndWait(`「本宫不会屈服！！绝对…」`); // :5022
    } // :5022-5024
  } // :5022-5025

  return 0; // :5027-5029
}

// @dungeon_ryouzyoku_after_k903 // :5030
async function dungeon_ryouzyoku_after_k903() {
  const target = era_flag.target;
  if (era0(`talent:${target}:0`) == 1) {
    // :5035

    await era.printAndWait(`「呼………没事…没事呢……」`); // :5037

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5039

      await era.printAndWait(`「哼！」`); // :5042

      return 0; // :5042-5044
    } // :5045-5047

    if (era0(`exp:${target}:1`) > 20) {
      // :5048
      await era.printAndWait(`「屁股……好痛苦………」`); // :5049
      await era.printAndWait(`「如此地……粗暴………」`); // :5050
    } // :5050-5051

    if (era0(`exp:${target}:22`) > 20) {
      // :5055
      await era.printAndWait(`「这么舔……还是……第一次………」`); // :5055
    } // :5055

    if (era0(`exp:${target}:20`) > 20) {
      // :5059
      await era.printAndWait(`「射了……好多………」`); // :5059
    } // :5059
  } else {
    // :5060-5061

    await era.printAndWait(`「终于……结束了吗……？」`); // :5062

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5064

      await era.printAndWait(`「…………」`); // :5067

      return 0; // :5067-5069
    } // :5070-5072

    if (era0(`exp:${target}:0`) > 20) {
      // :5073
      await era.printAndWait(`「里面……要被弄坏了啦………」`); // :5074
      await era.printAndWait(`「好过分………」`); // :5075
    } // :5075-5076

    if (era0(`exp:${target}:1`) > 20) {
      // :5079
      await era.printAndWait(`「屁股……已经没有感觉了………」`); // :5080
      await era.printAndWait(`「真糟糕………」`); // :5081
    } // :5081-5082

    if (era0(`exp:${target}:22`) > 20) {
      // :5086
      await era.printAndWait(`「好…恶心…」`); // :5086
    } // :5086

    if (era0(`exp:${target}:20`) > 20) {
      // :5090
      await era.printAndWait(`「射了……好多………」`); // :5090
    } // :5090
  } // :5090-5091

  return 0; // :5090-5093
}

// @benki_koujo_k903 // :5096
async function benki_koujo_k903(rand) {
  void rand;
  const a = era_flag.target;
  if (game.train.肉便器行动 == 0) {
    // :5101

    if (era0(`talent:${a}:76`) == 1) {
      // :5104
      await era.printAndWait(
        `「呵……能有幸得见本宫的身体，你们也应该死而无憾了吧！」`,
      ); // :5105
    } else if (era0(`talent:${a}:85`)) {
      // :5107
      await era.printAndWait(`「魔王大人…………救命…………」`); // :5108
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5110
      await era.printAndWait(`「恶……恶心……」`); // :5111
    } else {
      // :5113-5114
      await era.printAndWait(`「失去了力量的本宫……难道只能……呃……」`); // :5114
    } // :5114-5115
  } else if (game.train.肉便器行动 == 1) {
    // :5116

    if (era0(`talent:${a}:76`) == 1) {
      // :5119
      await era.printAndWait(`「唔，这样的吗，偶尔试下这种风味也……」`); // :5120
    } else if (era0(`talent:${a}:85`)) {
      // :5122
      await era.printAndWait(`「魔王大人…………救命…………」`); // :5123
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5125
      await era.printAndWait(`「恶……恶心……」`); // :5126
    } else {
      // :5128-5129
      await era.printAndWait(`「失去了力量的本宫……难道只能……呃……」`); // :5129
    } // :5129-5130
  } else if (game.train.肉便器行动 == 2) {
    // :5131

    if (era0(`talent:${a}:76`) == 1) {
      // :5134
      await era.printAndWait(
        `「看着本宫吧！本宫是个喜欢和动物做爱的变态！～♪」`,
      ); // :5135
    } else if (era0(`talent:${a}:85`)) {
      // :5137
      await era.printAndWait(`「唔唔～动物的臭味～♪」`); // :5138
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5140
      await era.printAndWait(`「好……好的……现在去抱动物………」`); // :5141
    } else {
      // :5143-5144
      await era.printAndWait(`「再……再来………」`); // :5144
    } // :5144-5145
  } else if (game.train.肉便器行动 == 3) {
    // :5146

    if (era0(`talent:${a}:76`) == 1) {
      // :5149
      await era.printAndWait(`「不管前面也好，后面也好……请把本宫塞满吧！～♪」`); // :5150
    } else if (era0(`talent:${a}:85`)) {
      // :5152
      await era.printAndWait(`「那里……和屁股………都……哦～啊啊啊啊！～♪」`); // :5153
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5155
      await era.printAndWait(`「请，请用光本宫所有的穴吧………」`); // :5156
    } else {
      // :5158-5159
      await era.printAndWait(`「双管齐下什么的………！」`); // :5159
    } // :5159-5160
  } else if (game.train.肉便器行动 == 4) {
    // :5161

    if (era0(`talent:${a}:76`) == 1) {
      // :5164
      await era.printAndWait(`「本宫的小穴，舒服么？随你喜欢来用哦～…♪」`); // :5165
    } else if (era0(`talent:${a}:85`)) {
      // :5167
      await era.printAndWait(`「把安全套拿走吧！」`); // :5168
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5170
      await era.printAndWait(`「请……随意使用本宫的小穴……」`); // :5171
    } else {
      // :5173-5174
      await era.printAndWait(`「那里………啊！」`); // :5174
    } // :5174-5175
  } else if (game.train.肉便器行动 == 5) {
    // :5176

    if (era0(`talent:${a}:76`) == 1) {
      // :5179
      await era.printAndWait(
        `「啊～本宫是菊穴也很有感觉的尻穴奴隶！…～♪再来！…啊啊～！啊～」`,
      ); // :5180
    } else if (era0(`talent:${a}:85`)) {
      // :5182
      await era.printAndWait(`「屁股…好厉害…啊！！噢～～」`); // :5183
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5185
      await era.printAndWait(`「屁，屁股………♪」`); // :5186
    } else {
      // :5188-5189
      await era.printAndWait(`「啊～！……那里是………」`); // :5189
    } // :5189-5190
  } // :5189-5191

  return 0; // :5193-5196
}

// @dungeon_victory_k903 // :5196
async function dungeon_victory_k903(rand) {
  const rand_n = rand ?? default_rand;
  const target = era_flag.target;
  const a = target;
  await era.printAndWait(`「被本宫净化掉，也是你们这些虫子的荣幸吧～」`); // :5201

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    // :5203

    await era.printAndWait(`「……」`); // :5206

    return 0; // :5208-5209
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    // :5209

    if (rand_n(3) == 0) {
      // :5212
      await era.printAndWait(`「别做无谓的抵抗啦…」`); // :5213
    } else if (rand_n(2) == 0) {
      // :5214
      await era.printAndWait(`「就这水平…」`); // :5215
    } else {
      // :5216-5217
      await era.printAndWait(`「真难看啊…」`); // :5217
    } // :5217-5218
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    // :5220

    await era.printAndWait(`「呼……真惊险…哈哈！」`); // :5223

    return 0; // :5223-5225
  } else {
    // :5226-5228

    if (rand_n(3) == 0) {
      // :5229
      await era.printAndWait(`「好！赢了！」`); // :5230
    } else if (rand_n(2) == 0) {
      // :5231
      await era.printAndWait(`「本宫赢啦！」`); // :5232
    } else {
      // :5233-5234
      await era.printAndWait(`「嗯……」`); // :5234
    } // :5234-5235
  } // :5235-5237

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    // :5239

    await era.printAndWait(`「呜…居然能蹭到本宫的衣服………」`); // :5241
  } else {
    // :5242-5243

    await era.printAndWait(`「下次就是一个地宫的妖怪一起来也可以哟」`); // :5244
  } // :5244-5245

  return 0; // :5244-5247
}

// @dungeon_attack_k903 // :5251
async function dungeon_attack_k903(rand) {
  const rand_n = rand ?? default_rand;
  const target = era_flag.target;
  if (chara(target).invasion.状态 == 2) {
    // :5256

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5258

      await era.printAndWait(`「……」`); // :5261

      return 0; // :5263-5264
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5264

      if (rand_n(3) == 0) {
        // :5267
        await era.printAndWait(`「又是这种无聊的战斗呢。」`); // :5268
      } else if (rand_n(2) == 0) {
        // :5269
        await era.printAndWait(`「得见本宫的真容，你们也死而无憾了吧～～」`); // :5270
      } else {
        // :5271-5272
        await era.printAndWait(
          `「消～散～吧～。欸，不知道哪里的家伙这么对本宫说，开打前这么说一句会很帅的。完全没感觉的嘛。」`,
        ); // :5272
      } // :5272-5273
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5275

      await era.printAndWait(`「呜……要一直战斗下去么……？」`); // :5278

      return 0; // :5278-5280
    } else {
      // :5281-5283

      if (rand_n(3) == 0) {
        // :5284
        await era.printAndWait(`「让本宫来教你们什么是战斗。」`); // :5285
      } else if (rand_n(2) == 0) {
        // :5286
        await era.printAndWait(`「哼……就这程度」`); // :5287
      } else {
        // :5288-5289
        await era.printAndWait(`「你这家伙……死了么？」`); // :5289
      } // :5289-5290
    } // :5290-5292
  } else {
    // :5293-5294

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5295

      await era.printAndWait(`「……」`); // :5298

      return 0; // :5300-5301
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5301

      if (rand_n(3) == 0) {
        // :5304
        await era.printAndWait(
          `「消～散～吧～。欸，不知道哪里的家伙这么对本宫说，开打前这么说一句会很帅的。完全没感觉的嘛。」`,
        ); // :5305
      } else if (rand_n(2) == 0) {
        // :5306
        await era.printAndWait(`「又是无谓的挣扎呢。」`); // :5307
      } else {
        // :5308-5309
        await era.printAndWait(`「呐呐，早点投降的话，后面会轻松一些的哟」`); // :5309
      } // :5309-5310
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5312

      await era.printAndWait(`「再……再给本宫力量……！」`); // :5315

      return 0; // :5315-5317
    } else {
      // :5318-5320

      if (rand_n(3) == 0) {
        // :5321
        await era.printAndWait(
          `「从魔王大人处获得的力量……就让你见识一下吧！」`,
        ); // :5322
      } else if (rand_n(2) == 0) {
        // :5323
        await era.printAndWait(`「过来这边吧……你也就明白了……」`); // :5324
      } else {
        // :5325-5326
        await era.printAndWait(`「呵呵～可爱的家伙，不过你什么都不知道啊！」`); // :5326
      } // :5326-5327
    } // :5327-5329
  } // :5327-5330

  return 0; // :5334-5340
}

// @colosseum_kojo_903 // :5343
async function colosseum_kojo_903() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_nickname(0);
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi);
  if (era_flag.selectcom == 55) {
    // :5347

    if (era0(`base:${target}:1`) <= 0) {
      // :5349
      await era.printAndWait(`${target_name}连站都站不稳了……`); // :5350
    } else {
      // :5351-5352
      await era.printAndWait(
        `${target_name}在死斗场的热情及对方凌厉的眼神中哆嗦着。`,
      ); // :5352
    } // :5352-5353
    return 0; // :5352-5354
  } // :5355-5357

  if (era_flag.selectcom == 56) {
    // :5359

    if (era0(`base:${target}:1`) <= 0) {
      // :5361

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5363
        await era.printAndWait(`「才…才不会输给${assi_name}呢！……」`); // :5364
        await era.printAndWait(`筋疲力尽的${target_name}屁股向后跌坐在地上……`); // :5365
      } else {
        // :5366-5367
        await era.printAndWait(
          `「啊…啊…不……不要…才不要被这种怪物侵犯！…不要！不要！……」`,
        ); // :5367
        await era.printAndWait(
          `筋疲力尽的${target_name}连滚带爬地企图逃离死斗场。`,
        ); // :5368
      } // :5368-5369
    } else {
      // :5370-5371

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5372
        await era.printAndWait(`「难……难道……要和${assi_name}做对手么……」`); // :5373
        await era.printAndWait(
          `${target_name}皱着眉头，看着在${master_name}命令之下武装起来的${assi_name}……`,
        ); // :5374
      } else {
        // :5375-5376
        await era.printAndWait(`「呕……这……这么恶心的怪物………」`); // :5376
        await era.printAndWait(
          `${target_name}看着对面丑陋的怪物，表情都扭曲了。`,
        ); // :5377
      } // :5377-5378
    } // :5377-5379
    return 0; // :5377-5380
  } // :5380-5383

  if (era_flag.selectcom == 31) {
    // :5386

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5388
      await era.printAndWait(`「啊…唔……唔唔………就……就在这里吗？…咳……！」`); // :5389
      await era.print(`${assi_name}把`); // :5390
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        // :5392
        await era.print(`阴茎`); // :5392
      } // :5392
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        // :5394
        await era.print(`假阳具`); // :5394
      } // :5394
      await era.printAndWait(
        `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,
      ); // :5395
    } else {
      // :5396-5397
      await era.printAndWait(
        `「啊………会……会好好地舔的啦…………所以……所以……不要再做其它过分的事啦……呃……唔…………唔唔…………咳……」`,
      ); // :5397
      await era.printAndWait(`${target_name}舔啜着带着令人作呕的气味的阴茎……`); // :5398
    } // :5398-5399
    return 0; // :5398-5400
  } // :5401-5403

  if (era_flag.selectcom == 5) {
    // :5405

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5407
      await era.printAndWait(`「啊…${assi_name}啊…停……手…快停手啦………」`); // :5408
      await era.printAndWait(
        `${target_name}无力反抗……任由${assi_name}肆意地玩弄着她的胸部……`,
      ); // :5409
    } else {
      // :5410-5411
      await era.printAndWait(
        `「呜………为……为什么……本宫要遇上这种事啊………呜呜！」`,
      ); // :5411
      await era.printAndWait(
        `${target_name}的胸部被粗鲁地揉捏着，发出了痛苦的呻吟……`,
      ); // :5412
    } // :5412-5413
    return 0; // :5412-5414
  } // :5415-5417

  if (era_flag.selectcom == 21) {
    // :5419

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5421
      await era.printAndWait(`「啊…！唔……啊啊啊！…好深………弄的好深啦……！」`); // :5422
      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // :5423
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        // :5425
        await era.print(`阴茎`); // :5425
      } // :5425
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        // :5427
        await era.print(`假阳具`); // :5427
      } // :5427
      await era.printAndWait(`毫不留情地蹂躏着${target_name}的私处……`); // :5428
    } else if (game.train.死斗场敌种 == 206) {
      // :5430
      await era.printAndWait(`「死………死………要…死掉了……」`); // :5431
      await era.printAndWait(
        `可怜的${target_name}断断续续地发出崩溃的声音，承受着巨魔的糟蹋。`,
      ); // :5432
    } else {
      // :5433-5434
      await era.printAndWait(`「被……被这样的家伙……呜……唔……哎呀！！」`); // :5434
      await era.printAndWait(`${target_name}被怪物尽情侵犯着……`); // :5435
    } // :5435-5436
    return 0; // :5435-5437
  } // :5435-5438

  if (era_flag.selectcom == 27) {
    // :5443

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5445
      await era.printAndWait(`「呜！啊啊啊啊！屁股……屁股…要被弄坏啦！！」」`); // :5446
      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // :5447
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        // :5449
        await era.print(`阴茎`); // :5449
      } // :5449
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:PBAND') == 1
      ) {
        // :5451
        await era.print(`假阳具`); // :5451
      } // :5451
      await era.printAndWait(`毫不留情地蹂躏着${target_name}的肛门……`); // :5452
    } else if (game.train.死斗场敌种 == 206) {
      // :5454
      await era.printAndWait(`「死………死………要…死掉了……」`); // :5455
      await era.printAndWait(
        `可怜的${target_name}断断续续地发出崩溃的声音，承受着巨魔的糟蹋。`,
      ); // :5456
    } else {
      // :5457-5458
      await era.printAndWait(
        `「被……被这样的家伙……呜……唔……哎呀！！屁股……屁股……要被弄坏啦！」`,
      ); // :5458
      await era.printAndWait(`${target_name}被怪物尽情地侵犯着肛门……`); // :5459
    } // :5459-5460
    return 0; // :5459-5461
  } // :5459-5462

  if (era_flag.selectcom == 51) {
    // :5467
    await era.printAndWait(
      `「这……这种药………本宫………本宫………呃！！……噢噢哦噢～！」`,
    ); // :5468
    return 0; // :5468-5469
  } // :5468-5470

  return 0; // :5473-5476
}

// @ntr_koujo_k903 // :5476
async function ntr_koujo_k903(rand, P) {
  void rand;
  const target = era_flag.target;
  P = P ?? 0;
  if (chara(target).kojo.NTR再捕获 == 0) {
    // :5480
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :5480
    chara(target).kojo.NTR再捕获 = 1; // :5480
  } // :5480

  if (P == 1) {
    // :5483

    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5485
      await era.printAndWait(`「想不到……本宫的第一次……竟然是被狂王……呜……」`); // :5486
    } else {
      // :5487-5488
      await era.printAndWait(
        `「哈啊……本宫的……本宫的……第一次……好不甘心就这样……」`,
      ); // :5488
    } // :5488-5489
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :5490
    chara(target).kojo.NTR_651 = 1; // :5490
  } else if (P == 2) {
    // :5492
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5493
      await era.printAndWait(
        `「啊啊…啊…啊啊！…不……不要再来了………屁股………唔……哦哦哦哦！」`,
      ); // :5494
    } else {
      // :5495-5496
      await era.printAndWait(
        `「啊！……你这变态…不要再来了…………唔………哦哦哦哦！」`,
      ); // :5496
    } // :5496-5497
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :5498
    chara(target).kojo.NTR_652 = 1; // :5498
  } else if (P == 3) {
    // :5500
    if (era0(`talent:${target}:136`)) {
      // :5501
      await era.printAndWait(
        `「唔哦…～啊啊！ 要坏掉了……要被狗玩坏掉啦！～${heart(1)}」`,
      ); // :5502
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5503
      await era.printAndWait(
        `「啊…啊………讨厌………被看着……被看着啦………呜呜…唔！…噢…啊啊啊啊！」`,
      ); // :5504
    } else {
      // :5505-5506
      await era.printAndWait(
        `「可恶…这么做的话…会被施以天罚的！…呜…唔…啊啊！」`,
      ); // :5506
    } // :5506-5507
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :5508
    chara(target).kojo.NTR_653 = 1; // :5508
  } else if (P == 4) {
    // :5510
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5511
      await era.printAndWait(
        `「唔～…啊啊！…本…本……本宫是狂王大人…的…东西…再来…再来…再操本宫吧！${heart(1)}」`,
      ); // :5512
    } else {
      // :5513-5514
      await era.printAndWait(
        `「唔～…哦！啊啊…噢！啊……！ 好、好深啊………要去了…要……去……了！！！～♪」`,
      ); // :5514
    } // :5514-5515
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :5516
    chara(target).kojo.NTR_654 = 1; // :5516
  } else if (P == 5) {
    // :5518
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5519
      await era.printAndWait(
        `「看啊…小穴也好，尻穴也好，都塞进了你们的小鸡鸡哦～${heart(1)} 嘻嘻～啊！同时被插入太舒服啦！${heart(1)}」`,
      ); // :5520
    } else {
      // :5521-5522
      await era.printAndWait(`「呵呵…正面上本宫啊！………♪」`); // :5522
    } // :5522-5523
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :5524
    chara(target).kojo.NTR_655 = 1; // :5524
  } else if (P == 6) {
    // :5526
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5527
      await era.printAndWait(
        `「啊…再来…再狠狠地弄本宫…噢…已经……回不去那人的身边了………操本宫！…弄本宫！…把本宫操坏吧！～${heart(1)}」`,
      ); // :5528
    } else {
      // :5529-5530
      await era.printAndWait(
        `「啊…啊……输掉了话………就失去一切啊………噢！……对不起……会……会用心侍奉的………啊！唔唔！」`,
      ); // :5530
    } // :5530-5531
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :5532
    chara(target).kojo.NTR_656 = 1; // :5532
  } else if (P == 7) {
    // :5534
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5535
      await era.printAndWait(
        `「狂王大人…啊啊…好舒服……请……请继续…使用本宫吧…」`,
      ); // :5536
    } else {
      // :5537-5538
      await era.printAndWait(`「啊啊…会……会继续…侍奉您的………」`); // :5538
    } // :5538-5539
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :5540
    chara(target).kojo.NTR_657 = 1; // :5540
  } else if (P == 20) {
    // :5542
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5543
      if (chara(target).event.妊娠相手 == 1) {
        // :5544
        await era.printAndWait(
          `「还……还给本宫！…那……那是……本宫和魔王大人的孩子啊！…」`,
        ); // :5545
      } else {
        // :5546-5547
        await era.printAndWait(
          `「是……是啊……本宫的子宫，是属于狂王大人的东西～…${heart(1)}」`,
        ); // :5547
      } // :5547-5548
    } else {
      // :5549-5550
      await era.printAndWait(`「啊…好想～继续怀上啊～♪」`); // :5550
    } // :5550-5551
  } // :5550-5552
  return 0; // :5550-5553
}

// @exucution_koujo_k903 // :5557
async function exucution_koujo_k903() {
  if (game.event.犬射精或处刑口上 == 4) {
    // :5561
    await era.printAndWait(`「放，放开本宫！…侍奉怪物什么的………呜…呜哇哇！！」`); // :5562
  } else if (game.event.犬射精或处刑口上 == 5) {
    // :5564
    await era.printAndWait(
      `「讨厌…讨厌！本宫变得不像自己了…不要！……不、要、啊…啊………」`,
    ); // :5565
    await era.printAndWait(''); // :5566
  } else if (game.event.犬射精或处刑口上 == 6) {
    // :5568
    await era.printAndWait(`「混蛋！给本宫记住！！………」`); // :5569
    await era.printAndWait(''); // :5570
  } else if (game.event.犬射精或处刑口上 == 7) {
    // :5572
    await era.printAndWait(''); // :5573
  } // :5572-5574
}

// @museum_koujo_k903 // :5577
async function museum_koujo_k903() {
  if (game.event.博物馆口上 == 0) {
    // :5580
    await era.printAndWait(''); // :5581
  } else if (game.event.博物馆口上 == 1) {
    // :5583
    await era.printAndWait(''); // :5584
  } else if (game.event.博物馆口上 == 2) {
    // :5586
    await era.printAndWait(''); // :5587
  } else if (game.event.博物馆口上 == 3) {
    // :5589
    await era.printAndWait(''); // :5590
  } else if (game.event.博物馆口上 == 4) {
    // :5592
    await era.printAndWait(''); // :5593
  } else if (game.event.博物馆口上 == 5) {
    // :5595
    await era.printAndWait(''); // :5596
  } else if (game.event.博物馆口上 == 6) {
    // :5598
    await era.printAndWait(''); // :5599
  } else if (game.event.博物馆口上 == 7) {
    // :5601
    await era.printAndWait(''); // :5602
  } else if (game.event.博物馆口上 == 8) {
    // :5604
    await era.printAndWait(''); // :5605
  } else if (game.event.博物馆口上 == 9) {
    // :5607
    await era.printAndWait(''); // :5608
  } // :5607-5609
}

// @banishment_koujo_k903 // :5613
async function banishment_koujo_k903() {
  if (game.event.流放口上 == 0) {
    // :5617
    await era.printAndWait(`「本宫的…力量…被那样地………骗人…吧…………」`); // :5618
  } else if (game.event.流放口上 == 1) {
    // :5620
    await era.printAndWait(''); // :5621
  } else if (game.event.流放口上 == 2) {
    // :5623
    await era.printAndWait(''); // :5624
  } else if (game.event.流放口上 == 3) {
    // :5626
    await era.printAndWait(''); // :5627
  } // :5626-5628
}

// @public_exucution_koujo_k903 // :5631
async function public_exucution_koujo_k903() {
  if (game.event.公开处刑口上 == 0) {
    // :5635
    await era.printAndWait(`「到死为止都要被侵犯？呃……有趣…来试试呗！！」`); // :5636
  } else if (game.event.公开处刑口上 == 1) {
    // :5638
    await era.printAndWait(
      `「这种…罪犯似的结局…本宫绝不认可！…放开本宫！…放开本宫！！」`,
    ); // :5639
  } else if (game.event.公开处刑口上 == 2) {
    // :5641
    await era.printAndWait(''); // :5642
  } // :5641-5643
}

// @grotesque_koujo_k903 // :5646
async function grotesque_koujo_k903() {
  if (game.event.猎奇处刑口上 == 0) {
    // :5650
    await era.printAndWait(''); // :5651
  } else if (game.event.猎奇处刑口上 == 1) {
    // :5653
    await era.printAndWait(''); // :5654
  } else if (game.event.猎奇处刑口上 == 2) {
    // :5656
    await era.printAndWait(''); // :5657
  } else if (game.event.猎奇处刑口上 == 3) {
    // :5659
    await era.printAndWait(''); // :5660
  } else if (game.event.猎奇处刑口上 == 4) {
    // :5662
    await era.printAndWait(''); // :5663
  } else if (game.event.猎奇处刑口上 == 5) {
    // :5665
    await era.printAndWait(''); // :5666
  } else if (game.event.猎奇处刑口上 == 6) {
    // :5668
    await era.printAndWait(''); // :5669
  } // :5668-5670
}

// @enterenemy_koujo_k903 // :5674
async function enterenemy_koujo_k903(rand) {
  void rand;
  const a = era_flag.target;
  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    // :5677

    await era.printAndWait(`「………呃……魔王……吗………」`); // :5679
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    // :5680

    await era.printAndWait(`「就让本宫来干掉魔王吧！」`); // :5682
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    // :5683

    await era.printAndWait(`「本宫，应该能干掉魔王吧………？」`); // :5685
  } else {
    // :5685-5686

    await era.printAndWait(`「遇到魔王的话，就干掉他！！」`); // :5688
  } // :5688-5689
}

// @gohoubi_request_koujo_k903 // :5691
async function gohoubi_request_koujo_k903(rand) {
  void rand;
  const a = era_flag.target;
  // 源 :5660/:5662 读取从未赋值的 public static Y；清洁调用时其值为 0。
  const y = 0;
  if (chara(a).stronghold.要求奖赏 == 0) {
    // :5694

    await era.printAndWait(`「钱钱钱！嘻嘻嘻～」`); // :5696
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // :5697

    await era.print(`「魔王大人，你懂得的吧…让本宫和`); // :5699
    if (chara(a).stronghold.要求奖赏 == 1) {
      // :5700
      await era.print(`狗狗`); // :5701
    } else if (y == 2) {
      // :5702
      await era.print(`公猪`); // :5703
    } else if (y == 3) {
      // :5704
      await era.print(`雄马`); // :5705
    } // :5705-5706
    await era.printAndWait(`好好地玩・一・玩吧♪」`); // :5707
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    // :5708

    await era.printAndWait(`「嘻嘻！…魔王大人要和本宫来个很长很长的湿吻哦～」`); // :5710
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    // :5711

    await era.printAndWait(`「…本宫回来的时候，想被魔王大人温情地抱一阵子。」`); // :5713
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    // :5714

    await era.printAndWait(`「嘻嘻！魔王大人先把精液存着！等本宫回来拿～」`); // :5716
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    // :5717

    await era.printAndWait(`「想进行一场了不得的乱交呢！…都是你害得啦！…」`); // :5719
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    // :5720

    await era.printAndWait(`「回来之后…想喝魔王大人的尿………可以么？」`); // :5722
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    // :5723

    await era.printAndWait(`「嘻嘻！想收一个童贞啊！」`); // :5725
  } // :5725-5726
}

// @gohoubi_after_koujo_k903 // :5728
async function gohoubi_after_koujo_k903(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  const target_name = chara_callname(a);
  if (choice == 0) {
    // :5734
    await era.printAndWait(
      `「至少也要给点奖励啊，看在本宫稍微用了点心的份上」`,
    ); // :5735
  } else if (choice == 1) {
    // :5737
    await era.printAndWait(
      `「勋章？荣誉的吗？嘛虽然对本宫来说这没什么大不了的……」`,
    ); // :5738
  } else if (choice == 2) {
    // :5739

    if (chara(a).stronghold.要求奖赏 == 0) {
      // :5741
      await era.printAndWait(`「唉，然而对本宫来说根本没有什么用啊」`); // :5742
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      // :5744

      if (era0(`talent:${a}:0`) == 1) {
        // :5746
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了地狱犬的犬舍中挑选心仪的初夜对象`,
        ); // :5747
        await era.printAndWait(
          `在赶走周围的闲杂人等之后，${target_name}解开自己的衣服，赤裸着身子慢慢走到了地狱犬中间`,
        ); // :5748
        await era.printAndWait(
          `被魔王所豢养的地狱犬们看起来高大又健硕，黑红色的皮毛被梳理着油光发亮，隆起的肌肉发达有力，被伺候的很好的样子`,
        ); // :5749
        await era.printAndWait(`「呵呵，真是些强壮的好孩子。」`); // :5750
        await era.printAndWait(
          `地狱犬们显然对带着魔王气息的天使很是亲近，它们聚集在天使身边，时不时用脑袋蹭着天使的肌肤撒娇`,
        ); // :5751
        await era.printAndWait(`「啊…野兽的气息……光是这样，本宫竟然就湿了。」`); // :5752
        await era.printAndWait(
          `雌性情动的气味让魔兽躁动了起来，原本温顺的地狱犬们开始烦躁地走来走去，一声声壕叫在这片空地中回荡`,
        ); // :5753
        await era.printAndWait(
          `这时一只三头地狱犬挤开了同伴来到了${target_name}身边，它仰起头看着天使，喉咙里溢出一声声低吼`,
        ); // :5754
        await era.printAndWait(`「你要当第一个？好孩子，就是你了。」`); // :5755
        await era.printAndWait(
          `${target_name}笑着点了点头，摸了摸三头地狱犬柔软的皮毛，又将中间的脑袋向小穴压去`,
        ); // :5756
        await era.printAndWait(
          `嗅到气味的地狱犬毫不客气的大口舔舐起小穴来，被快感侵袭的天使张开翅膀裹住身上的魔兽，顺着它的动作摆动着腰部`,
        ); // :5757
        await era.printAndWait(
          `地狱犬的左边脑袋也不甘落后，来回舔舐着${target_name}的小腿`,
        ); // :5758
        await era.printAndWait(
          `「啊啊…好宽大的舌头……再里面点……呀你落单了，可怜的小东西…唔啾……」`,
        ); // :5759
        await era.printAndWait(
          `${target_name}享受着中间脑袋的舔舐，爱怜地搂住落空的右边脑袋，将地狱犬探出的舌头含进嘴里交缠`,
        ); // :5760
        await era.printAndWait(`「嗯啧…好狗狗……舌头………和野兽接吻……♪」`); // :5761
        await era.printAndWait(`「不行了……好想要……这样已经不够了……！」`); // :5762
        await era.printAndWait(
          `和魔兽纠缠了一阵的${target_name}突然推开了地狱犬，走到一旁备好的垫子上躺下，抬起腰对着它将腿张成Ｍ字型`,
        ); // :5763
        await era.printAndWait(`「乖狗狗，来吧……快来侵犯本宫吧……♪」`); // :5764
        await era.printAndWait(
          `早已按耐不住交配本性的地狱犬压上天使的身体，粗长的狗根顺利插入${target_name}泥泞不堪的处子穴中`,
        ); // :5765
        await era.printAndWait(
          `「啊！哦～！小穴里……坚硬的肉棒插进来了哈…滚烫的…这就是本宫想象已久的野兽肉棒…♪」`,
        ); // :5766
        await era.printAndWait(
          `脆弱的处女膜被粗暴地捅破穿过，三头地狱犬粗暴抽插的动作带出混着猩红处子血的爱液`,
        ); // :5767
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了破处的痛苦，天使摇摆着腰肢，配合着魔兽的动作开始追求起交配的乐趣来`,
        ); // :5768
        await era.printAndWait(
          `「好棒…啊啊……交配太棒了♪被这样的野兽夺走处子之身…令人太满足了……♪」`,
        ); // :5769
        await era.printAndWait(
          `双手搂紧地狱犬的脖子，${target_name}在魔兽兴奋的咆哮声中奋力迎合着，抬起头伸出小舌去勾缠地狱犬吐出的舌头`,
        ); // :5770
        await era.printAndWait(
          `地狱犬的三个脑袋凑了过来，挨个和天使激吻着，同时猛然将阴茎插进最深处，咚咚叩击着子宫口`,
        ); // :5771
        await era.printAndWait(
          `「啊啊啊…小穴被肉棒搅弄着……嗯咕……好舒服…再激烈点……本宫喜欢野兽的肉棒了～♪」`,
        ); // :5772
        await era.printAndWait(`「和野兽交配什么的…咿呀～最棒了…♪」`); // :5773
        await era.printAndWait(`看来这场天使和魔兽的盛宴还会持续很久……`); // :5774
      } else {
        // :5775-5776
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了地狱犬的犬舍中`,
        ); // :5776
        await era.printAndWait(
          `在赶走周围的闲杂人等之后，${target_name}解开自己的衣服，赤裸着身子慢慢走到了地狱犬中间`,
        ); // :5777
        await era.printAndWait(
          `被魔王所豢养的地狱犬们看起来高大又健硕，黑红色的皮毛被梳理得油光发亮，隆起的肌肉发达有力，一副被伺候的很好的样子`,
        ); // :5778
        await era.printAndWait(`「呵呵，真是些强壮的好孩子。」`); // :5779
        await era.printAndWait(
          `地狱犬们显然对带着魔王气息的天使很是亲近，它们聚集在天使身边，时不时用脑袋蹭着天使的肌肤撒娇`,
        ); // :5780
        await era.printAndWait(`「啊…野兽的气息……光是这样，本宫竟然就湿了。」`); // :5781
        await era.printAndWait(
          `雌性情动的气味让魔兽们躁动了起来，原本温顺的地狱犬们开始烦躁的走来走去，一声声壕叫在这片空地中回荡`,
        ); // :5782
        await era.printAndWait(
          `这时一只地狱犬挤开了同伴来到了${target_name}身边，它仰起头看着天使，喉咙里溢出一声声低吼`,
        ); // :5783
        await era.printAndWait(`「你要当第一个？好孩子，本宫答应了。」`); // :5784
        await era.printAndWait(
          `${target_name}笑着点了点头，伸手摸了摸地狱犬的脑袋，将它向小穴压去`,
        ); // :5785
        await era.printAndWait(
          `嗅到气味的魔兽毫不客气的大口舔舐起小穴来，被快感侵袭的天使张开翅膀裹住身上的魔兽，顺着它的动作摆动着腰部`,
        ); // :5786
        await era.printAndWait(
          `「啊啊…好宽大的舌头……往里面舔…再里面点……哈……」`,
        ); // :5787
        await era.printAndWait(
          `「不行了……好想要…乖狗狗，来吧……快来侵犯本宫吧……♪」`,
        ); // :5788
        await era.printAndWait(
          `不满足舔阴的${target_name}突然推开了地狱犬，走到一旁备好的垫子上躺下，抬起腰对着它将腿张成Ｍ字型`,
        ); // :5789
        await era.printAndWait(
          `早已按耐不住交配本性的地狱犬压上天使的身体，狗根顺利插入${target_name}泥泞不堪的小穴中`,
        ); // :5790
        await era.printAndWait(
          `「啊！哦～！小穴里……坚硬的肉棒插进来了～哈…滚烫的…快要融化了……♪」`,
        ); // :5791
        await era.printAndWait(
          `双手搂紧地狱犬的脖子，${target_name}在野兽兴奋的咆哮声中奋力迎合着`,
        ); // :5792
        await era.printAndWait(
          `「好狗狗……嗯啧…舌头………和野兽接吻好棒……啊啊…交配也好棒♪」`,
        ); // :5793
        await era.printAndWait(
          `将地狱犬伸出的舌头含进嘴里交缠，${target_name}孜孜不倦的吮吸着滴落下来的唾液`,
        ); // :5794
        await era.printAndWait(
          `快速抽插中的魔兽猛然将阴茎插进最深处，咚咚的叩击着子宫口`,
        ); // :5795
        await era.printAndWait(
          `「啊啊啊…小穴被肉棒搅弄着……嗯啊……好舒服…再激烈点……本宫喜欢肉棒～♪」`,
        ); // :5796
        await era.printAndWait(
          `「嗯…你们也想要本宫？哈啊……别急…马上就到你们了…和野兽交配什么的…最棒了…♪」`,
        ); // :5797
        await era.printAndWait(`看来这场天使和魔兽的盛宴还会持续很久……`); // :5798
      } // :5798-5799
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :5801

      if (era0(`talent:${a}:0`) == 1) {
        // :5803
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了猪舍任其随意挑选心仪的初夜对象`,
        ); // :5804
        await era.printAndWait(
          `${target_name}欣喜抚摸着种猪硕大的睾丸，挥手赶走了周围的闲杂人等`,
        ); // :5805
        await era.printAndWait(
          `用于交配的种猪在${target_name}柔软小手的爱抚下逐渐勃起，是与其他野兽完全不同的螺旋状的阴茎`,
        ); // :5806
        await era.printAndWait(`「啊~真可叫人难以抵抗~♪」`); // :5807
        await era.printAndWait(
          `起身解开自己的衣服，赤裸着身体的天使先是温柔地亲吻了一下种猪的嘴唇，随即又迫不及待地用小舌挑逗起来`,
        ); // :5808
        await era.printAndWait(
          `兴奋起来的种猪侵犯着${target_name}的口腔，一天使一兽激烈地相互缠绕舌头，房间里回响咕啾咕啾的下流水声`,
        ); // :5809
        await era.printAndWait(`「啊……好粗鲁啊❤再多吻我一下~♪」`); // :5810
        await era.printAndWait(
          `顺势在早已准备好的架子上躺下，${target_name}紧紧搂住种猪的脖子，仿佛情人相拥般地深吻着`,
        ); // :5811
        await era.printAndWait(
          `${target_name}边接吻边用身体摩擦来获取快感，只是这终究还是满足不了这个淫乱的天使`,
        ); // :5812
        await era.printAndWait(
          `轻轻推开种猪的头，${target_name}主动打开双腿露出泥泞不堪的处子小穴，笑着发出了邀请`,
        ); // :5813
        await era.printAndWait(`「来吧，小胖猪~这可是处子的小穴呢~♪」`); // :5814
        await era.printAndWait(
          `种猪气喘吁吁地压在天使身上，螺旋状的阴茎摩擦小穴做着准备，${target_name}立刻缠住了种猪的腰帮助固定`,
        ); // :5815
        await era.printAndWait(`「要进来了……❤公猪的……咿！」`); // :5816
        await era.printAndWait(
          `种猪迫不及待地压下身体，造型奇特的细长阴茎突破处女膜，直直亲吻着子宫口`,
        ); // :5817
        await era.printAndWait(
          `「哈啊…猪的肉棒……滑溜溜的…啊啊~♪开始动起来了~❤」`,
        ); // :5818
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了破处的痛苦，天使摇摆着腰肢，配合着野兽的动作开始追求起交配的乐趣来`,
        ); // :5819
        await era.printAndWait(
          `种猪哼着鼻子激烈地撞击${target_name}的小穴，混合着处子血的爱液四处飞溅`,
        ); // :5820
        await era.printAndWait(`「好快…已经什么也思考不了了…♪」`); // :5821
        await era.printAndWait(`「啊啊啊…哈啊……小穴被搅弄着~♪」`); // :5822
        await era.printAndWait(
          `螺旋状的阴茎在撞击中顺利插入子宫，种猪低下头伸出舌舔着${target_name}的唇`,
        ); // :5823
        await era.printAndWait(
          `「要射精了吗~？可以哦，让本宫为你怀孕也不错呢❤」`,
        ); // :5824
        await era.printAndWait(
          `${target_name}顺从地张开嘴，撒娇似地探出小舌来回缠绕舔弄着种猪的舌头`,
        ); // :5825
        await era.printAndWait(
          `粘稠的野兽精液气势磅礴地灌入子宫，天使的小腹逐渐鼓胀起来`,
        ); // :5826
        await era.printAndWait(
          `脸上满是痴迷的神情，${target_name}承受种猪持续不断的大量射精，完全沉浸在被授种的喜悦之中……`,
        ); // :5827
      } else {
        // :5828-5829
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了猪舍任其随意挑选交配对象`,
        ); // :5829
        await era.printAndWait(
          `${target_name}欣喜抚摸着种猪硕大的睾丸，挥手赶走了周围的闲杂人等`,
        ); // :5830
        await era.printAndWait(
          `用于交配的种猪在${target_name}柔软小手的爱抚下逐渐勃起，是与其他野兽完全不同的螺旋状的阴茎`,
        ); // :5831
        await era.printAndWait(`「啊~真可叫人难以抵抗~♪」`); // :5832
        await era.printAndWait(
          `起身解开自己的衣服，赤裸着身体的天使先是温柔地亲吻了一下种猪的嘴唇，随即又迫不及待地用小舌挑逗起来`,
        ); // :5833
        await era.printAndWait(
          `兴奋起来的种猪侵犯着${target_name}的口腔，一天使一兽激烈地相互缠绕舌头，房间里回响咕啾咕啾的下流水声`,
        ); // :5834
        await era.printAndWait(`「啊……好粗鲁啊❤再多吻我一下~♪」`); // :5835
        await era.printAndWait(
          `顺势在早已准备好的架子上躺下，${target_name}紧紧搂住种猪的脖子，仿佛情人相拥般地深吻着`,
        ); // :5836
        await era.printAndWait(
          `${target_name}边接吻边用身体摩擦来获取快感，只是这终究还是满足不了这个淫乱的天使`,
        ); // :5837
        await era.printAndWait(
          `轻轻推开种猪的头，${target_name}主动打开双腿露出泥泞不堪的小穴，笑着发出了邀请`,
        ); // :5838
        await era.printAndWait(`「来吧，小胖猪~这可是天使的小穴呢~♪」`); // :5839
        await era.printAndWait(
          `种猪气喘吁吁地压在天使身上，螺旋状的阴茎摩擦小穴做着准备，${target_name}缠住了种猪的腰帮助固定`,
        ); // :5840
        await era.printAndWait(`「要进来了……❤公猪的……咿！」`); // :5841
        await era.printAndWait(
          `种猪迫不及待地压下身体，造型奇特的细长阴茎在小穴中横冲直撞，时不时亲吻着子宫口`,
        ); // :5842
        await era.printAndWait(
          `「哈啊…猪的肉棒……滑溜溜的…啊啊~♪开始动起来了~❤」`,
        ); // :5843
        await era.printAndWait(
          `天使摇摆着腰肢，配合野兽的动作贪求着交配的乐趣`,
        ); // :5844
        await era.printAndWait(
          `种猪哼着鼻子激烈地撞击${target_name}的小穴，混着气泡的爱液被搅拌着四处飞溅`,
        ); // :5845
        await era.printAndWait(`「好快…已经什么也思考不了了…♪」`); // :5846
        await era.printAndWait(`「啊啊啊…哈啊……小穴酥酥麻麻的~♪」`); // :5847
        await era.printAndWait(
          `螺旋状的阴茎在撞击中顺利插入子宫，种猪低下头伸出舌舔着${target_name}的唇`,
        ); // :5848
        await era.printAndWait(
          `「要射精了吗~？可以哦，在本宫的子宫种下你的种子吧❤」`,
        ); // :5849
        await era.printAndWait(
          `${target_name}顺从地张开嘴，撒娇似地探出小舌来回缠绕舔弄着种猪的舌头`,
        ); // :5850
        await era.printAndWait(
          `粘稠的野兽精液气势磅礴地灌入子宫，天使的小腹逐渐鼓胀起来`,
        ); // :5851
        await era.printAndWait(
          `脸上满是痴迷的神情，${target_name}承受种猪持续不断的大量射精，完全沉浸在被授种的喜悦之中……`,
        ); // :5852
      } // :5852-5853
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :5855

      if (era0(`talent:${a}:0`) == 1) {
        // :5857
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了梦魇马群的领地，挑选最强壮的梦魇作为初夜对象`,
        ); // :5858
        await era.printAndWait(
          `在仆人准备好支架之后，${target_name}便将所有人赶出了马厩，缓缓脱下了身上的衣服`,
        ); // :5859
        await era.printAndWait(
          `${target_name}赤身裸体走到马王身边，摸了摸油光发亮的皮毛，然后就这么翻身骑了上去`,
        ); // :5860
        await era.printAndWait(`「嗯~这结实健硕的肌肉……啊…真叫人难以抵抗~♪」`); // :5861
        await era.printAndWait(
          `${target_name}不安分地扭动身体，用小穴摩擦马背，留下一道道晶莹的水渍`,
        ); // :5862
        await era.printAndWait(`「好舒服~哈啊…嗯……」`); // :5863
        await era.printAndWait(
          `${target_name}像是搂着亲爱的恋人一般用力抱紧梦魇马的脖颈，柔软双唇热情亲吻着魔兽的脖颈和鬃毛，忘情得在马背上追寻更多的快感`,
        ); // :5864
        await era.printAndWait(
          `雌性发情的气味诱得梦魇马急躁不安起来，高声嘶鸣着来回踱步`,
        ); // :5865
        await era.printAndWait(`「着急了？别急，马上就换你来骑~♪」`); // :5866
        await era.printAndWait(
          `${target_name}安抚着梦魇马，自马背上翻下，趴在支架上固定好身体，打开双腿露出湿漉漉的小穴`,
        ); // :5867
        await era.printAndWait(`「这可是本宫的处子身哦~♪你可得……咿呀！」`); // :5868
        await era.printAndWait(
          `见雌性做好了交配准备，被性欲冲昏头脑的梦魇马迫不及待抬起前身压在${target_name}背上`,
        ); // :5869
        await era.printAndWait(
          `马根气势如虹地贯穿小穴直冲子宫，${target_name}的小腹瞬间鼓起突显柱状物`,
        ); // :5870
        await era.printAndWait(
          `「进来了……哈啊…马的肉棒……好大…啊啊~♪开始动起来了~❤」`,
        ); // :5871
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了破处的痛苦，天使摇摆着腰肢，配合着魔兽的动作开始追求起交配的乐趣来`,
        ); // :5872
        await era.printAndWait(`「好快…太棒了……已经什么也思考不了了~♪」`); // :5873
        await era.printAndWait(`「交尾❤和野兽交尾❤」`); // :5874
        await era.printAndWait(
          `梦魇马嘶鸣着加快了抽插，咚咚叩击着子宫口，每次进出都让${target_name}混合着处子血的爱液四处飞溅`,
        ); // :5875
        await era.printAndWait(
          `粗大的马根直直插进子宫，魔兽的精液激烈冲击着最深处。${target_name}猛然张开翅膀，随着梦魇马的射精达到了高潮`,
        ); // :5876
        await era.printAndWait(
          `「啊啊~♪野兽的种子灌进了子宫……♪哈…让本宫为你怀孕吧♪」`,
        ); // :5877
      } else {
        // :5878-5879
        await era.printAndWait(
          `作为得胜归来的奖励，${target_name}被带到了梦魇马群的领地`,
        ); // :5879
        await era.printAndWait(
          `在仆人准备好支架之后，${target_name}便将所有人赶出了马厩，缓缓脱下了身上的衣服`,
        ); // :5880
        await era.printAndWait(
          `${target_name}赤身裸体走到梦魇马身边，摸了摸油光发亮的皮毛，然后就这么翻身骑了上去`,
        ); // :5881
        await era.printAndWait(`「嗯~这结实健硕的肌肉……啊…真叫人难以抵抗~♪」`); // :5882
        await era.printAndWait(
          `${target_name}不安分地扭动身体，用小穴摩擦马背，留下一道道晶莹的水渍`,
        ); // :5883
        await era.printAndWait(`「好舒服~哈啊…嗯……」`); // :5884
        await era.printAndWait(
          `${target_name}像是搂着亲爱的恋人一般用力抱紧梦魇马的脖颈，柔软双唇热情亲吻着魔兽的脖颈和鬃毛，忘情得在马背上追寻更多的快感`,
        ); // :5885
        await era.printAndWait(
          `雌性发情的气味诱得梦魇马急躁不安起来，高声嘶鸣着来回踱步`,
        ); // :5886
        await era.printAndWait(`「着急了？别急，马上就换你来骑~♪」`); // :5887
        await era.printAndWait(
          `${target_name}安抚着梦魇马，自马背上翻下，趴在支架上固定好身体，打开双腿露出湿漉漉的小穴`,
        ); // :5888
        await era.printAndWait(`「本宫的小穴已经准备好了~♪你可得……咿呀！」`); // :5889
        await era.printAndWait(
          `见雌性做好了交配准备，被性欲冲昏头脑的梦魇马迫不及待抬起前身压在${target_name}背上`,
        ); // :5890
        await era.printAndWait(
          `马根气势如虹地贯穿小穴直冲子宫，${target_name}的小腹瞬间鼓起突显柱状物`,
        ); // :5891
        await era.printAndWait(
          `「进来了……哈啊…马的肉棒……好大…啊啊~♪开始动起来了~❤」`,
        ); // :5892
        await era.printAndWait(
          `强大的体质令${target_name}很快忽略了极限扩张的痛苦，天使摇摆着腰肢，配合着魔兽的动作开始追求起交配的乐趣来`,
        ); // :5893
        await era.printAndWait(`「好快…太棒了……已经什么也思考不了了~♪」`); // :5894
        await era.printAndWait(`「交尾❤和野兽交尾❤」`); // :5895
        await era.printAndWait(
          `梦魇马嘶鸣着加快了抽插，咚咚叩击着子宫口，每次进出都让${target_name}混合着大量气泡的爱液四处飞溅`,
        ); // :5896
        await era.printAndWait(
          `粗大的马根直直插进子宫，魔兽的精液激烈冲击着最深处。${target_name}猛然张开翅膀，随着梦魇马的射精达到了高潮`,
        ); // :5897
        await era.printAndWait(
          `「啊啊~♪野兽的种子灌进了子宫……♪哈…让本宫为你怀孕吧♪」`,
        ); // :5898
      } // :5898-5899
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      // :5901
      await era.printAndWait(`「嗯……魔王大人的……爱情之吻……」`); // :5902
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      // :5904

      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // :5906
        await era.printAndWait(
          `「啊！魔王大人……请～请继续侵犯本宫吧！～噢哦～…♪」`,
        ); // :5907
      } else {
        // :5909-5910
        await era.printAndWait(
          `「啊！魔王大人……请～请继续侵犯本宫吧！～噢哦～…♪」`,
        ); // :5910
      } // :5910-5911
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      // :5913
      await era.printAndWait(`「精……精液什么的……呜……嘛……♪」`); // :5914
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      // :5916

      if (era0(`talent:${a}:0`) == 1) {
        // :5918
        await era.printAndWait(`「啊…第一次就这么结束了么…还想继续啊～♪」`); // :5919
      } else {
        // :5920-5921
        await era.printAndWait(`「啊…结束了么…还想继续啊～♪」`); // :5921
      } // :5921-5922
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      // :5924
      await era.printAndWait(
        `「嘻嘻～为了喝魔王大人的尿尿，本宫活着回来啦！～♪」`,
      ); // :5925
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      // :5927

      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // :5929
        await era.printAndWait(
          `「呵呵呵，童贞的感觉就是不一样呢～本宫的那里，舒服么？${heart(1)}」`,
        ); // :5930
      } else {
        // :5932-5933
        await era.printAndWait(
          `「呵呵呵，童贞的感觉就是不一样呢～本宫的菊穴，舒服么？${heart(1)}」`,
        ); // :5933
      } // :5933-5934
    } else {
      // :5933-5935
    } // :5936-5938
  } // :5936-5938
}

// @osioki_koujo_k903 // :5939
async function osioki_koujo_k903(rand, cid, choice) {
  void rand;
  void cid;
  const a = era_flag.target;
  if (choice == 0) {
    // :5945
    await era.printAndWait(`「只……只是没看见人罢了！」`); // :5946
  } else if (choice == 1) {
    // :5948

    if (era0(`abl:${a}:21`) >= 3) {
      // :5950
      await era.printAndWait(`「哦…电击…还可以………强一点………～♪」`); // :5951
    } else {
      // :5952-5953
      await era.printAndWait(`「啊！…停！停手啊啊啊啊！！」`); // :5953
    } // :5953-5954
  } else if (choice == 2) {
    // :5956

    if (era0(`abl:${a}:17`) >= 4) {
      // :5958
      await era.printAndWait(`「再怎么说，当众自慰也有点……」`); // :5959
    } else {
      // :5960-5961
      await era.printAndWait(
        `「哈啊……居然让本宫……当街……下次…………呜呜…………一定不会失败了啊啊啊啊！！」`,
      ); // :5961
    } // :5961-5962
  } else if (choice == 3) {
    // :5964

    if (era0(`abl:${a}:17`) >= 6) {
      // :5966
      await era.printAndWait(`「来！来看吧！……这种风景可不多见哟……！」`); // :5967
    } else {
      // :5968-5969
      await era.printAndWait(`「呜呜…唔………呜呜呜」`); // :5969
    } // :5969-5970
  } else if (choice == 4) {
    // :5972

    if (era0(`abl:${a}:21`) >= 3) {
      // :5974
      await era.printAndWait(
        `「啊！！魔王大人的鞭子！！最棒了！再……再用力！」`,
      ); // :5975
    } else {
      // :5976-5977
      await era.printAndWait(`「呜！……啊？！…………唔哦！！」`); // :5977
    } // :5977-5978
  } else if (choice == 5) {
    // :5980

    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      // :5982
      await era.printAndWait(`「果然还是魔王大人的尿味道更好啊………」`); // :5983
    } else {
      // :5984-5985
      await era.printAndWait(`「这……这……好难受…」`); // :5985
    } // :5985-5986
  } else if (choice == 6) {
    // :5988
    await era.printAndWait(`「唉……不想做这种事啊……」`); // :5989
  } else if (choice == 7) {
    // :5991
    await era.printAndWait(
      `「呜…本宫肚子饿了啦！……下次出击一定会好好干的啊！…」`,
    ); // :5992
  } else if (choice == 8) {
    // :5994
    await era.printAndWait(
      `「噢～喔喔喔喔喔！求求你！魔王大人！对本宫…怎样都可以！！呜呜呜呜…………谁都好！什么东西都行！！…啊啊啊啊！！！」`,
    ); // :5995
  } else if (choice == 9) {
    // :5997
    await era.printAndWait(`「………好」`); // :5998
  } // :5998-5999
}

// @gobi_koujo_k903, ARG:0 // :6002
async function gobi_koujo_k903(arg0, rand = default_rand) {
  const rand_n = rand;
  if (arg0 == 1) {
    // :6005

    await era.print(`哦～♪`); // :6007
  } else if (arg0 == 2) {
    // :6008

    await era.print(`哦！`); // :6010
  } else if (arg0 == 3) {
    // :6011

    await era.print(`啦……。`); // :6013
  } else if (arg0 == 4) {
    // :6014

    await era.print(`吧……算是……。`); // :6016
  } else if (arg0 == 5) {
    // :6017

    await era.print(`什么的……。`); // :6019
  } else {
    // :6020-6021

    if (rand_n(3) == 0) {
      // :6023
      await era.print(`呢。`); // :6024
    } else if (rand_n(2) == 0) {
      // :6025
      await era.print(`嘛。`); // :6026
    } else {
      // :6027-6028
      await era.print(`啦。`); // :6028
    } // :6028-6029
  } // :6028-6030
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
  STUBBED_CALLS,
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
