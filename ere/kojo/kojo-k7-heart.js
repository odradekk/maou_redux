/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 金红桃口上 K7：EVENTTRAIN 存在标志 + 主体（issue #238）。
 *
 * 源: target/ERB/口上/EVENT_K7_ハート.ERB  @EVENTTRAIN #PRI（:62-65，存在
 *     标志 FLAG:107 = 1）@EVENTEND #LATER（:68-69，清标志）
 *     @EVENTTRAIN（:75-588，调教开始口上：初调教 CFLAG:201 + 魔族化
 *     CFLAG:370 + NTR 再捕获 CFLAG:650 + 屈服刻印 Lv1-3 + 淫乱/爱慕
 *     （含魔族化分支）+ 崩坏 + 简易助手口上 CFLAG:202-204 + K7_KOJO2
 *     二回目以降）
 *
 * == 简易助手口上（NO:ASSI 直判） ==
 *
 * 三名可对话助手按 NO:ASSI 直接判角色号（21 银黑桃 / 22 黑方片 /
 * 23 白梅花，白梅花另有 TALENT:ASSI:121 守卫），各自 CFLAG:202/203/204
 * 三阶（初次 → 爱或淫乱单条 → 双线合流）。原作 ELSEIF NO:ASSI == 22 分支
 * 的「二回目以降（CFLAG:203==2 && FLAG:7==2）」臂缺 RETURN 1（源
 * :484-495，其余同构臂均有）——1:1 保留，落到隐式 RETURN 0。
 *
 * == 文本内嵌三目与插值（转译器未识别，人工修复） ==
 *
 * `\@TIME == 0 ? 今日 # 今夜\@`（源 :473/:487/:515/:570）与
 * `\@RAND:2 == 0 ? 菊花 # 小穴\@`（:570，另 :569 整句三目）是 Emuera
 * 文本内嵌三目语法，转译器原型未处理（原样落成字面量 `\@…\@`，且未
 * 进 REVIEW 清单——静默漏项，人工核对 ERB 原文才发现）。`{CFLAG:10}`
 * （:212）同款：FORM 字符串内的数值插值，转译器同样原样保留未转换。
 * TIME 取 era_flag.time（0=上午/1=下午，page-main-menu.js 先例）。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
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
const { peek_aftertrain_s } = require('#/event/event-aftertrain');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { piercing_state } = require('#/system/train/piercing-state');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;
/** RAND:N 的默认随机源（本文件的 on() 事件处理器不经分发注入 rand） */
const rand_n = (n) => Math.floor(Math.random() * n);
/** MASTER 恒为角色 0（K1 kojo-k1-confident.js 同款先例） */
const MASTER = 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [];

// @EVENTTRAIN #PRI（:62-65）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_7 = 1; // :64 FLAG:107 = 1（K7 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :65-66
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:68-69）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_7 = 0; // :69
  },
  TIER.LATER,
);

/**
 * @EVENTTRAIN（:75-588，普通档）：调教开始时的口上。
 *
 * 守卫（:76-77/:78-79）：FLAG:7 <= 0 跳过、TALENT:167 != 1 跳过；此后按
 * CFLAG:201 状态机推进：初调教（0）→ 魔族化仅一次（<5 且未魔族化）→
 * NTR 再捕获（>=1 && CFLAG:650==1）→ 屈服刻印 Lv1/2/3（各一次）→
 * 淫乱（含魔族化分支）→ 爱慕（含魔族化分支）→ 崩坏 → 简易助手分支
 * （TALENT:MASTER:122==0 或 ASSI<0 或无名助手 → K7_KOJO2）。
 */
on('EVENTTRAIN', async () => {
  if (era0('flag:7') <= 0) {
    return 0;
  }
  if (era0(`talent:${era_flag.target}:167`) != 1) {
    return 0;
  }

  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi = era_flag.assi; // NO:ASSI（ere 角色 ID 直接对应）
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%

  // :83-119 初調教時 CFLAG:201
  if (era0(`cflag:${target}:201`) == 0) {
    era.drawLine(); // :84
    // 魔族
    if (era0(`talent:${target}:314`) == 9) {
      await era.printAndWait(
        `「呵、呵呵…嘛、就算变成了魔族，我也不会认输的………」`,
      ); // :87
      await era.printAndWait(
        `${player_name}为了让${target_name}更容易沦陷，把她扔进实验室进行了魔族化的改造。`,
      ); // :88
      await era.printAndWait(
        `${target_name}表面上看似很平静，实际上受到了难以置信的打击。`,
      ); // :89
      await era.printAndWait(
        `「哈、啊，混账魔王！啊、啊啊啊啊！一声招呼也不打就对我做出这种可恨的事情！你一定会后悔的！」`,
      ); // :90
      await era.printAndWait(
        `青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴~${target_name}的情绪和反应都基本上在预料中、改造完全成功了。`,
      ); // :91
      await era.printAndWait(
        `「什、什么啊！你在盯着看什么呢...？真让人恶心！离我远一点，不要靠近我…！」`,
      ); // :92
      era.set(`cflag:${target}:201`, 1); // :93
      era.set(`cflag:${target}:370`, 1); // :95 魔族スイッチ１
    } else {
      // 人間
      await era.printAndWait(`「啊啦啊啦、终于来见我了吗？魔王」`); // :98
      await era.printAndWait(`${target_name}轻哼一声，带着不屑从被窝里爬起来`); // :99
      await era.printAndWait(
        `抓到她后都不让她洗澡、所以看起来有点脏兮兮的。尽管如此，漂亮的金发也让人感到美丽，这昏暗的监狱甚至也让人感到了高贵。闪闪发亮的眼中显示出坚定的目光，看向${player_name}。`,
      ); // :100
      await era.printAndWait(
        `「关于你抓到的那些勇者变成什么样…以前只是听说过一些传闻罢了」`,
      ); // :101
      await era.printAndWait(`「而实际上变成什么样子了…现在也亲眼确认了」`); // :102
      await era.printAndWait(
        `是在说抓住${target_name}的${player_name}的下仆的勇者的事吧、然后${target_name}吞了吞口水。吞口水的声音连这边都能听得到。`,
      ); // :103
      await era.printAndWait(
        `${target_name}深深吸了一口气，用呼喊般的口气，对${player_name}大声的宣告了。`,
      ); // :104
      await era.printAndWait(
        `「如果觉得吾像是那种…奴隶…最低级的家伙、被消遣的那种差劲的东西，那就大错特错了！我绝对不会向你屈服的！」`,
      ); // :105
      await era.printAndWait(
        `思量着方才刺耳的宣言。${player_name}皱起了眉头。而${target_name}露出一副满不在乎的神气样子。`,
      ); // :106
      await era.print(''); // :107
      await era.printAndWait(
        `然而过去也有数不清的勇者说过这句话，${player_name}感到了强烈的即视感。`,
      ); // :108
      await era.printAndWait(
        `${target_name}这个小妞还想负隅顽抗、${player_name}可以大展身手随心所欲的用自己喜欢的方法开发了，她的命运已经被决定了。`,
      ); // :109
      await era.printAndWait(
        `考虑着那样的事${player_name}的嘴角露出了愉悦的笑容。调教开始………`,
      ); // :110
    }
    era.set(`cflag:${target}:201`, 1); // :112
    await era.print(''); // :113
    await era.printAndWait(
      `话说回来${target_name}的人物简介那里似乎写着「初体验的对象：狂王」的样子。`,
    ); // :114
    await era.printAndWait(
      `关于这一点，经过盘问和暗访后得知，她好像是狂王的爱人。`,
    ); // :115
    await era.printAndWait(
      `这真是越来越让人感到愉悦了、把狂王的东西夺走竭尽凌辱，只是想象一下就感觉心中雀跃不已。`,
    ); // :116
    await era.printAndWait(
      `夺走那颗心让她变成自己的爱人、或者叫怪物去侵袭她，让她怀上野兽的孩子也不错吧。`,
    ); // :117
    await era.printAndWait(
      `索性把狂王的恋人给变成只会享乐的母猪，这样也蛮不错的………`,
    ); // :118
    return 1; // :119
  } else if (
    // 魔族化（１回のみ）初回調教後魔族化、陥落前
    era0(`cflag:${target}:201`) < 5 &&
    era0(`cflag:${target}:370`) == 0 &&
    era0(`talent:${target}:314`) == 9 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0
  ) {
    await era.printAndWait(`「竟然…竟然把我变成魔族什么的！」`); // :124
    await era.printAndWait(
      `${player_name}为了让${target_name}方便陷落，把她推进实验室进行了魔族化改造。`,
    ); // :125
    await era.printAndWait(
      `${target_name}表面上看似很平静，实际上受到了难以置信的打击。`,
    ); // :126
    await era.printAndWait(
      `「把我变成肮脏的魔族会让你感到满足？差劲！那个恶心的笑…真让人厌恶」`,
    ); // :127
    await era.printAndWait(
      `青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴${target_name}的情绪和反应基本上在预料中、改造完全成功了。`,
    ); // :128
    await era.printAndWait(
      `「啊…要是这种姿态被狂王大人看见的话…已经想去死了啦………！」`,
    ); // :129
    await era.printAndWait(
      `令人吃惊${target_name}好像还有逃出去的意志和企图。${player_name}似乎感到很有趣，带着微笑开始了调教………`,
    ); // :130
    era.set(`cflag:${target}:370`, 2); // :132 魔族スイッチ２
    return 1; // :133
  } else if (
    era0(`cflag:${target}:201`) >= 1 &&
    era0(`cflag:${target}:650`) == 1
  ) {
    // NTR再捕獲
    era.drawLine(); // :139
    if (era0(`talent:${target}:85`)) {
      // 爱慕
      await era.printAndWait(
        `「啊、魔王大人…哇、我…又像以前那样对您刀剑相向了啊…您、请您原谅…」`,
      ); // :142
      await era.printAndWait(`${target_name}把头贴在地面上下跪请罪`); // :143
      await era.printAndWait(
        `「不仅是这样，身体也又接受了狂王…那样…那样的事情…对不起、对不起………」`,
      ); // :144
      await era.printAndWait(
        `不停地道歉，非常惶恐。只是把手放在${target_name}的肩上，也吓得她身躯一震。`,
      ); // :145
      await era.printAndWait(`「您、您能原谅我吗！………万分感谢！万分感谢！」`); // :146
      await era.printAndWait(
        `${target_name}抬起头，涕泪涟涟把美丽的脸庞都弄难看了。${player_name}一边苦笑着一边帮她拭去脸上的脏污。`,
      ); // :147
      await era.printAndWait(
        `不过因为全身上下都是狂王遗留的秽物，${target_name}身体的清洗是必须要做的………`,
      ); // :148
      era.set(`cflag:${target}:650`, 0); // :150 NTRスイッチ解除
    } else if (era0(`talent:${target}:76`)) {
      // 淫乱
      await era.printAndWait(`「啊呼…嗨嗨、魔王大人啊…我回来了哦♪」`); // :153
      await era.printAndWait(
        `${target_name}一边打着呵欠，一边冲${player_name}随意的打着招呼、毫不客气。`,
      ); // :154
      await era.printAndWait(`「我还被魔王大人宠爱着嘛~~？」`); // :155
      await era.printAndWait(
        `明明整个身体都被狂王狠狠的侵犯凌辱了，还对着${player_name}扭捏献媚。让${player_name}不由得叹了口气。`,
      ); // :156
      await era.printAndWait(
        `「现在我又变回魔王大人的专用小穴奴隶啦...像以前那样侵犯我吧~${heart(1)}」`,
      ); // :157
      era.set(`cflag:${target}:650`, 0); // :159 NTRスイッチ解除
    } else {
      await era.printAndWait(
        `「哈啊…又被你抓住了啊、真是失策………诶？你看了那个水晶球？」`,
      ); // :161
      await era.printAndWait(`${target_name}的脸唰的红了。`); // :162
      await era.printAndWait(
        `「嘛！嘛！怎么回事嘛！明明约定说不会让别人看见那个水晶球的内容！」`,
      ); // :163
      await era.printAndWait(
        `「………哎呀、你那个表情是什么嘛？在抱怨我和狂王大人“爱的记忆”吗？哎呀、要惩罚我吗…」`,
      ); // :164
      await era.printAndWait(`${target_name}难为情的开始了调教………`); // :165
      era.set(`cflag:${target}:650`, 0); // :167 NTRスイッチ解除
    }
    return 1; // :169
  } else if (era0(`cflag:${target}:201`) < 2 && era0(`mark:${target}:2`) == 1) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(`「呵呵…你的手段差劲透了…真叫人失望」`); // :176
    await era.printAndWait(
      `虽然在上次调教受到了屈辱的对待，不过${target_name}比想象中的更能忍受嘛。`,
    ); // :177
    await era.printAndWait(`「和狂王大人的技术没得比啦、你」`); // :178
    await era.printAndWait(`时间还有的是、为了让这个小妞更屈服，继续调教吧………`); // :179
    era.set(`cflag:${target}:201`, 2); // :180
    return 1; // :181
  } else if (era0(`cflag:${target}:201`) < 3 && era0(`mark:${target}:2`) == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    await era.printAndWait(`「呵呵…又来了…调教我就让你那么乐在其中吗？」`); // :186
    await era.printAndWait(
      `${target_name}露出厌烦的样子皱着眉，瞪着${player_name}`,
    ); // :187
    await era.printAndWait(
      `”上次的调教，好像有谁很不成体统呢”，在${target_name}耳边低声私语，她的脸唰的红了。`,
    ); // :188
    await era.printAndWait(
      `「呼、你在开玩笑吧！和你做那种事只会感觉到恶心而已！」`,
    ); // :189
    await era.printAndWait(
      `「啊啊啊…真想早点从这里逃走，回到狂王大人温暖的怀抱里去，那才叫心情舒畅！」」`,
    ); // :190（原作双引号收尾，1:1 保留）
    era.set(`cflag:${target}:201`, 3); // :191
    return 1; // :192
  } else if (
    era0(`cflag:${target}:201`) < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv3
    era.drawLine();
    await era.printAndWait(`「不要…已、已经不想再来这里了………」`); // :197
    await era.printAndWait(
      `${target_name}面容十分憔悴，仅仅看到${player_name}的脸就已经害怕的后退了`,
    ); // :198
    await era.printAndWait(
      `${player_name}嘲笑着她的样子，命令${target_name}脱光衣服，金红桃艰难的鼓起一点勇气瞪着你。`,
    ); // :199
    await era.printAndWait(
      `「那样的行为算是什么。这种事情…应该是和喜欢的人在一起，被喜欢的人温柔对待的事！你离我远点！」`,
    ); // :200
    await era.printAndWait(
      `${player_name}扭着${target_name}的胳膊强行用舌头撬开她的嘴唇、她一边胆怯着反抗，一边感受这滋味。`,
    ); // :201
    await era.printAndWait(
      `「不要！这样的…不承认…不会承认…啊啊啊…快点…放开…真是…啊啊！」`,
    ); // :202
    await era.printAndWait(
      `${target_name}被压住双手，强行推到在床上。身体感到疼痛，发出了喘息声。`,
    ); // :203
    await era.printAndWait(`「啊啊，救救我…狂王大人…啊啊…啊………」`); // :204
    era.set(`cflag:${target}:201`, 4); // :205
    return 1; // :206
  } else if (
    era0(`cflag:${target}:201`) < 5 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:314`) != 9
  ) {
    // 淫乱
    era.drawLine();
    await era.printAndWait(
      `${target_name}慵懒的披着单薄的床单坐在床上，向${player_name}打招呼了。`,
    ); // :211
    const visit_count = era0(`cflag:${target}:10`); // CFLAG:TARGET:10 = 会面次数
    await era.printAndWait(
      `「又来了啊…像这样和我见面…嗯，已经${visit_count}次了呢」`,
    ); // :212
    await era.printAndWait(
      `${target_name}无法控制嘴角的笑意，像个小女孩一样哧哧的笑了起来。`,
    ); // :213
    await era.printAndWait(`「呐…我…更想在你的怀抱里呢…啊哈…${heart(1)}」`); // :214
    await era.printAndWait(
      `${target_name}用舌头舔着嘴唇，做出了妓女一样明显欲求不满的动作，向${player_name}靠近了。`,
    ); // :215
    await era.printAndWait(
      `光是掀开床单一股萎靡的淫臭气味就散发了出来、大概是在${player_name}还没有来的时候自慰了很多次。`,
    ); // :216
    await era.printAndWait(`「脑袋里已经…无时无刻不在想着做爱了…${heart(1)}」`); // :217
    if (era0(`talent:${target}:0`) == 1) {
      await era.printAndWait(''); // :219
      await era.printAndWait(`「即便如此，居然让我特意变成处女…你这个人…」`); // :220
      await era.printAndWait(`${target_name}有点难为情`); // :221
    }
    era.set(`cflag:${target}:201`, 5); // :223
    return 1; // :224
  } else if (
    era0(`talent:${target}:314`) == 9 &&
    era0(`cflag:${target}:201`) < 6 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 1
  ) {
    // 淫乱+魔族化
    era.drawLine();
    if (era0(`cflag:${target}:370`) == 1) {
      // 調教前から魔族
      await era.printAndWait(
        `${player_name}进入房间、感觉就像是进到了什么魅魔的巢穴一样。`,
      ); // :230
      await era.printAndWait(`「啊哈…是魔王大人啊…${heart(1)}」`); // :231
      await era.printAndWait(
        `${target_name}好像不知不觉释放出了淫魔的魔力、粉红色的瘴气聚集到了肉眼能观测到的浓度。`,
      ); // :232
      await era.printAndWait(
        `「求求您快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去了………」`,
      ); // :233
      await era.printAndWait(
        `从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，意外的看到了金红桃发情到丧失理智的样子。`,
      ); // :234
      await era.printAndWait(
        `现在${target_name}说想要被男人干什么，这也是字面意思吧、真是完全落陷了${player_name}脸上露出了难抑的笑容。`,
      ); // :235
      await era.printAndWait(
        `误解了那个笑容的意思，${target_name}马上饥渴的扑了过来`,
      ); // :236
      await era.printAndWait(
        `「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我${heart(1)}」`,
      ); // :237
      era.set(`cflag:${target}:201`, 6); // :238
      return 1; // :239
    } else if (era0(`cflag:${target}:370`) == 2) {
      // 初回調教後に魔族
      await era.printAndWait(
        `${player_name}进入房间、感觉就像是进到了什么魅魔的巢穴一样。`,
      ); // :242
      await era.printAndWait(`「啊哈…是魔王大人啊…${heart(1)}」`); // :243
      await era.printAndWait(
        `${target_name}好像不知不觉释放出了淫魔的魔力、粉红色的瘴气到了肉眼能察觉到的浓度。`,
      ); // :244
      await era.printAndWait(
        `「快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去了………」`,
      ); // :245
      await era.printAndWait(
        `从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，看到了金红桃发情到丧失理智的样子。`,
      ); // :246
      await era.printAndWait(
        `现在${target_name}说想要被男人干什么这也是字面意思吧、真是完全落陷了，${player_name}脸上露出了笑容。`,
      ); // :247
      await era.printAndWait(
        `误解了那个笑容的意思${target_name}马上饥渴的扑了过来`,
      ); // :248
      await era.printAndWait(
        `「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我${heart(1)}」`,
      ); // :249
      era.set(`cflag:${target}:201`, 6); // :250
      return 1; // :251
    } else {
      // 陥落後に魔族
      await era.printAndWait(
        `「嗯…呼…唔…啊哈…魔、魔王大人…欢迎光临${heart(1)}」`,
      ); // :254
      await era.printAndWait(
        `${target_name}不久前被改造成了魔族，变得随心所欲、现在正用魔族的尾巴卖力的自慰着。`,
      ); // :255
      await era.printAndWait(
        `并没有直接的插进去，而是用尾巴巧妙又激烈的刺激着小穴。沉浸在快感中，连身上的羽毛都一颤一颤的很有感觉。`,
      ); // :256
      await era.printAndWait(
        `「真是的…啊啊…差点…咿、咿呀…啊啊啊真是…哈…要去了…啊啊啊啊${heart(1)}」`,
      ); // :257
      await era.printAndWait(
        `${target_name}淫魔一般的魔力在房间里漂浮扩散着、这是她发情过度而产生的魔力。`,
      ); // :258
      await era.printAndWait(
        `「我…已经准备好了…所以…快…快来干我…${heart(1)}」`,
      ); // :259
      era.set(`cflag:${target}:201`, 6); // :260
      return 1; // :261
    }
  } else if (
    era0(`cflag:${target}:201`) < 7 &&
    era0(`talent:${target}:85`) == 1 &&
    era0(`talent:${target}:314`) != 9 &&
    era0(`talent:${target}:76`) == 0
  ) {
    // 爱慕（忠誠を誓うように、服従気味）
    era.drawLine();
    await era.printAndWait(
      `「啊啊…魔王大人…我${target_name}向您宣誓永远效忠………」`,
    ); // :268
    await era.printAndWait(
      `${target_name}到现在为止受到了各种残酷的调教，终于坚持不住，对${player_name}完全屈服了。`,
    ); // :269
    await era.printAndWait(`用着下仆一样的口吻、趴着亲吻着${player_name}的脚`); // :270
    await era.printAndWait(
      `「从今天开始我就是魔王大人的下仆了…请随您喜欢使用我吧…${heart(1)}」`,
    ); // :271
    await era.printAndWait(`抬起头来，一脸陶醉的表情。${target_name}迷失了。`); // :272
    await era.printAndWait(''); // :273
    await era.printAndWait(
      `「诶？狂王…大人？哎呀呀、讨厌啦、我的主人只有魔王大人一个人啦」`,
    ); // :274
    if (era0(`talent:${target}:0`) == 1) {
      await era.printAndWait(
        `${target_name}的瞳孔，现在能看到的东西，已经只有${player_name}了。`,
      ); // :276
      await era.printAndWait(`「还特意去修复了处女膜什么的…真是…好难为情啊」`); // :277
      await era.printAndWait(`${target_name}像少女一样难为情的害羞呢`); // :278
    } else {
      await era.printAndWait(
        `${target_name}那个瞳孔能看到的东西，已经只有${player_name}了。`,
      ); // :280
    }
    era.set(`cflag:${target}:201`, 7); // :282
    return 1; // :283
  } else if (
    era0(`talent:${target}:314`) == 9 &&
    era0(`cflag:${target}:201`) < 8 &&
    era0(`talent:${target}:85`) == 1 &&
    era0(`talent:${target}:76`) == 0
  ) {
    // 爱慕+魔族化
    era.drawLine();
    if (era0(`cflag:${target}:370`) == 1) {
      // 調教前から魔族
      await era.printAndWait(`「啊、魔王…大人…哇、我…」`); // :289
      await era.printAndWait(
        `${target_name}呼吸急促红着脸等待着。样子有点奇怪。`,
      ); // :290
      await era.printAndWait(
        `「已经被改造成魔族的我…我已经不能回到狂王大人、家…那里去了…不、不想回去了…」`,
      ); // :291
      await era.printAndWait(
        `「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔王大人这里吧…」`,
      ); // :292
      await era.printAndWait(
        `原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。${target_name}从床上爬着下来，一直到${player_name}的脚下才停了下来。`,
      ); // :293
      await era.printAndWait(
        `「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为忠实的仆人随意使用吧…！」`,
      ); // :294
      await era.printAndWait(
        `${target_name}不知所措的样子让人感到十分可怜。${player_name}微笑着在她的头上标记了绝度服从的刻印。`,
      ); // :295
      await era.printAndWait(
        `「啊…谢谢、谢谢…我余生都是魔王大人的东西…${heart(1)}」`,
      ); // :296
      era.set(`cflag:${target}:201`, 8); // :297
      return 1; // :298
    } else if (era0(`cflag:${target}:370`) == 2) {
      // 調教後に魔族
      await era.printAndWait(`「啊、魔王…大人…哇、我…」`); // :301
      await era.printAndWait(
        `${target_name}呼吸急促红着脸等待着。样子有点奇怪。`,
      ); // :302
      await era.printAndWait(
        `「不但身体沾满污秽，还被改造成了魔族…我已经不能回到狂王大人、家…那里去了…不、不想回去了…」`,
      ); // :303
      await era.printAndWait(
        `「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔王大人这里吧…」`,
      ); // :304
      await era.printAndWait(
        `原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。${target_name}从床上爬着下来，一直到${player_name}的脚前停了下来。`,
      ); // :305
      await era.printAndWait(
        `「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为忠实的仆人随意使用吧…！」`,
      ); // :306
      await era.printAndWait(
        `${target_name}不知所措的样子让人感到十分可怜。${player_name}微笑着在她的头上标记了绝度服从的刻印。`,
      ); // :307
      await era.printAndWait(
        `「啊…谢谢谢谢…我的余生都是魔王大人的东西…${heart(1)}」`,
      ); // :308
      era.set(`cflag:${target}:201`, 8); // :309
      return 1; // :310
    } else {
      // 陥落後に魔族
      await era.printAndWait(
        `「魔王大人啊…当一个魔族真是快乐的让人停不下来啊♪」`,
      ); // :313
      await era.printAndWait(
        `${target_name}发出呻吟般娇艳欲滴的声音,慢慢的靠向${player_name}。比起平时，现在她的样子怪怪的。`,
      ); // :314
      await era.printAndWait(
        `「今后也会全心全意的为魔王大人服务${heart(1)} 总之今天嘛…让我好好的侍奉您吧${heart(1)}」`,
      ); // :315
      await era.printAndWait(
        `${target_name}尾巴像是小狗一样来回摇晃着、背翼也像是要展翅高飞一样，明显的感到愉悦。`,
      ); // :316
      await era.printAndWait(
        `「啊…在交合中感觉身心都和魔王大人在一起了呢………」`,
      ); // :317
      await era.printAndWait(`…总之今天${target_name}变得怪怪的………`); // :318
      era.set(`cflag:${target}:201`, 8); // :319
      return 1; // :320
    }
  } else if (
    era0(`talent:${target}:9`) == 1 &&
    era0(`cflag:${target}:201`) < 9
  ) {
    // 崩坏
    era.drawLine();
    await era.printAndWait(`「呼啊…啊…………啊啊…………」`); // :325
    await era.printAndWait(`真是够了${target_name}精神完完全全的崩溃了。`); // :326
    await era.printAndWait(
      `不管是和她搭话、摇晃肩膀还是殴打她，都没有一点反应………`,
    ); // :327
    era.set(`cflag:${target}:201`, 9); // :328
    return 1; // :329
  } else if (era0(`talent:${target}:9`) == 1) {
    // 崩坏してたら二回目以降へ飛ぶ
    return k7_kojo2(); // :332 CALL K7_KOJO2
  } else if (assi < 0) {
    // 助手の有無をチェック（いない場合は二回目以降へ飛ぶ）
    return k7_kojo2(); // :336 CALL K7_KOJO2
  } else if (era0(`talent:0:122`) == 0) {
    // 你が男じゃなかったら二回目以降（MASTER 恒角色 0）
    return k7_kojo2(); // :346 CALL K7_KOJO2
  } else if (assi == 21) {
    // 助手银黑桃
    era.drawLine();
    if (era0(`cflag:${target}:202`) == 0) {
      // 初めて
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`cflag:${target}:201`) >= 5
      ) {
        await era.printAndWait(
          `「啊啊啊…真是够了，被你看到了我这个样子…啊嗯…唔、我该怎么办…？」`,
        ); // :354
        await era.printAndWait(
          `${assi_name}紧紧的抱住${target_name}，${player_name}完全阻止不了她们激烈的亲吻，交换唾液。`,
        ); // :355
        await era.printAndWait(
          `「真是够了！嗯哈…嗯呜呜…真是…为什么这样的事…嗯、啊、你怎么、喜欢这样啊…这、真让人为难！」`,
        ); // :356
        await era.printAndWait(
          `『嗯啊，${target_name}队长、虽然是在这里，但是我要向您告白…我一直都喜欢您』`,
        ); // :357
        await era.printAndWait(
          `${target_name}因为意想不到的告白，连耳根都红透了………`,
        ); // :358
        era.set(`cflag:${target}:202`, 2); // :359
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`cflag:${target}:201`) >= 5
      ) {
        await era.printAndWait(
          `「哎呀…你直到刚才都在被魔王大人的精液灌得满满的吧…表情真的好淫乱啊…哇、喂喂、突然抱住我什么的…真是够了！？」`,
        ); // :362
        await era.printAndWait(
          `${assi_name}紧紧的抱住${target_name}，${player_name}完全阻止不了她们激烈的亲吻，交换唾液。`,
        ); // :363
        await era.printAndWait(
          `「真是够了！呼唔…啾啾…唔啊哇哇哇…原来你喜欢百合诶、有点吃惊啊…诶？从前就一直喜欢我了？…呵呵，感觉还不错呗」`,
        ); // :364
        await era.printAndWait(
          `『${target_name}队长成了魔王大人的东西的话、不管是什么样的深渊，我都陪着队长一起堕落在其中吧』`,
        ); // :365
        await era.printAndWait(
          `${target_name}因为意想不到的告白，连耳根都红透了………`,
        ); // :366
        era.set(`cflag:${target}:202`, 2); // :367
      } else {
        await era.printAndWait(
          `「哈？你居然投降了魔王军吗…居然还是那副姿态…真是够了！喂你做什么…快放开我！」`,
        ); // :370
        await era.printAndWait(
          `${assi_name}紧紧的抱住${target_name}，${player_name}完全阻止不了她激烈的亲吻。`,
        ); // :371
        await era.printAndWait(
          `「真是够了！嗯嗯啊咿呀！！停、什么啊…嗯、很久以前就一直喜欢我了…？那、那是、说谎吧………」`,
        ); // :372
        await era.printAndWait(
          `『不是的！绝对不是谎言………我听说你被关押在这做俘虏、就一直在等待这个机会了』`,
        ); // :373
        await era.printAndWait(`『我一直爱着你』`); // :374
        await era.printAndWait(
          `${target_name}因为意想不到的告白，受到了巨大的打击………`,
        ); // :375
        era.set(`cflag:${target}:202`, 1); // :376
      }
      return 1; // :378
    } else if (
      // 二回目以降（爱＆淫乱取得時，银黑桃→金红桃）
      (era0(`cflag:${target}:202`) == 1 &&
        era0('flag:7') == 2 &&
        era0(`talent:${target}:85`) == 1) ||
      era0(`talent:${target}:76`) == 1
    ) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`『听说您已经变成魔王大人的奴隶了，笑♪』`); // :385
        await era.printAndWait(
          `${target_name}陷落了、难看的匍匐在${player_name}的脚下。那个身姿，连${assi_name}也嘲弄着。`,
        ); // :386
        await era.printAndWait(`「讨厌...啊、请不要再看了…」`); // :387
        await era.printAndWait(
          `『呵呵、我一点也不在乎、队长、尽情和您喜欢的魔王大人做爱吧』`,
        ); // :388
        await era.printAndWait(`「哎呀、这样好么？你不是一直爱着我吗？」`); // :389
        await era.printAndWait(
          `『当然现在也爱队长啊、因为是魔王大人，所以同时爱着队长的话、完全没有问题！』`,
        ); // :390
        await era.printAndWait(
          `${target_name}露出了惊讶的表情。${player_name}大笑着看着这个难以理解的状况，享受着。`,
        ); // :391
        await era.printAndWait(`「我知道了、魔王大人希望这样的话也没关系」`); // :392
        era.set(`cflag:${target}:202`, 2); // :393
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `『虽然从魔王大人那里听说了相当有趣的事情、不过您的变化还真是大呢、队长』`,
        ); // :396
        await era.printAndWait(
          `「哎呀…${assi_name}嘛？ 呵呵…我现在是魔王大人的一只雌犬了、不过魔王大人允许的话，也可以给你抱一抱呢${heart(1)}」`,
        ); // :397
        await era.printAndWait(
          `「嗯哼哼、这次尝试和你用更淫乱的方法“亲吻”也不错呢~」`,
        ); // :398
        await era.printAndWait(
          `${target_name}露出了淫乱的微笑、过去那个身姿被彻底的改变了。${assi_name}只能苦笑。`,
        ); // :399
        await era.printAndWait(`『（这…也许这就是这个人的本性吧………）』`); // :400
        era.set(`cflag:${target}:202`, 2); // :401
      }
      return 1; // :403
    } else if (era0(`cflag:${target}:202`) == 2 && era0('flag:7') == 2) {
      // 二回目以降
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「你的心情我是明白了、但是我是魔王大人的东西…哼、啊、不行呃………」`,
        ); // :408
        await era.printAndWait(
          `『放心吧，这是魔王大人允许的。啊~、果然队长您真是太可爱了…我…我已经忍不住了…！』`,
        ); // :409
        await era.printAndWait(
          `${target_name}被${assi_name}狠狠的拥抱着露出了困惑的表情………`,
        ); // :410
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呵呵呵、你这么喜欢我的话…把我的身体弄得乱七八糟也没有关系哦${heart(1)}」`,
        ); // :413
        await era.printAndWait(
          `『${target_name}队长…哈哈、这样…这样淫乱的堕落了………！』`,
        ); // :414
        await era.printAndWait(
          `${target_name}张开双腿谄媚的淫乱姿态，让${assi_name}看着不禁躁动了起来………`,
        ); // :415
      }
      return 1; // :417
    } else {
      await era.printAndWait(
        `「啊啊啊…唔、真、真的喜欢我的话…拜托手下留情吧………」`,
      ); // :420
      await era.printAndWait(
        `『哼哼哼、不要紧！我会用自己的全部技巧让您绝顶不断~♪』`,
      ); // :421
      await era.printAndWait(
        `虽然${target_name}发出恳求的声音、但这反而让${assi_name}越来越有干劲了………`,
      ); // :422
      return 1; // :423
    }
  } else if (assi == 22) {
    // 助手黑方片
    era.drawLine();
    if (era0(`cflag:${target}:203`) == 0) {
      // 初めて
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`cflag:${target}:201`) >= 5
      ) {
        await era.printAndWait(
          `「你现在………也是魔王大人的东西了？…啊啊、总觉得有一点嫉妒呢」`,
        ); // :432
        await era.printAndWait(
          `言语不和啊，${player_name}在一旁站着观察着：${assi_name}冷冷的瞪着${target_name}。woooooow~~~了解她们的关系了`,
        ); // :433
        await era.printAndWait(
          `「不过、魔王大人最优秀的下仆不是你、而是我哦！」`,
        ); // :434
        await era.printAndWait(`『队长、你被魔王大人改变的也相当多呢………』`); // :435
        await era.printAndWait(
          `一如既往的带着奇怪的高傲感和自尊心，大概${assi_name}因此稍微安心了一点（害羞）………`,
        ); // :436
        era.set(`cflag:${target}:203`, 2); // :437
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`cflag:${target}:201`) >= 5
      ) {
        await era.printAndWait(
          `「别一直抱着魔王大人不放啊…喂喂，你到底要和魔王大人来几次啊！？」`,
        ); // :440
        await era.printAndWait(
          `${target_name}看着曾经的同伴堕落的姿态，露出很开心的样子。`,
        ); // :441
        await era.printAndWait(
          `看着${assi_name}堕入淫乱的深渊，${target_name}也渐渐发情了，呼吸逐渐粗重了起来。`,
        ); // :442
        await era.printAndWait(
          `『啊啊、我在被魔王大人狠狠的侵犯…呼呼…已经离不开魔王大人的肉棒了${heart(1)}』`,
        ); // :443
        await era.printAndWait(
          `「你也相当………算啦、反正我也比较喜欢现在的你，没差啦」`,
        ); // :444
        era.set(`cflag:${target}:203`, 2); // :445
      } else {
        await era.printAndWait(
          `「呵呵、你就是魔王的助手吗。那双手握着阴茎要比握着武器更适合你嘛」`,
        ); // :448
        await era.printAndWait(
          `${assi_name}的表情变得很恼怒，故意狠狠的用手揉弄着${target_name}的巨乳、在她耳边低语着什么。`,
        ); // :449
        await era.printAndWait(
          `「嗬咿呀！痛！痛死了！啊、说什么…？”你也会陷落”怎么可能？这种愚蠢的事情…！」`,
        ); // :450
        await era.printAndWait(
          `『我过去的队长啊、你马上就会知道了——你只不过是一只肮脏的雌犬』`,
        ); // :451
        await era.printAndWait(
          `${target_name}的视线对上黑方片，看到${assi_name}那双嗜虐的眼睛、不由得低头沉默了………`,
        ); // :452
        era.set(`cflag:${target}:203`, 1); // :453
      }
      return 1; // :455
    } else if (
      // 二回目以降（爱＆淫乱取得時）
      (era0(`cflag:${target}:203`) == 1 &&
        era0('flag:7') == 2 &&
        era0(`talent:${target}:85`) == 1) ||
      era0(`talent:${target}:76`) == 1
    ) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊、${assi_name}、诶、你也在魔王大人的………」`); // :461
        await era.printAndWait(
          `『看吧、我当时说的话应验了吧、${target_name}队长』`,
        ); // :462
        await era.printAndWait(`「嗯？」`); // :463
        await era.printAndWait(
          `听到意想不到的话，${target_name}瞬间凝固。然后恢复正常盯着${assi_name}。`,
        ); // :464
        await era.printAndWait(
          `『你也和我一样成为魔王大人的奴隶了、从现在开始就是魔王大人的亲卫队了哦♪』`,
        ); // :465
        await era.printAndWait(`「…这、应该说谢谢呢？」`); // :466
        await era.printAndWait(
          `『呵呵、在床上的话就另当别论了、为了成为魔王大人最喜爱的奴隶我什么侍奉都会做的${heart(1)}』`,
        ); // :467
        await era.printAndWait(
          `「明白了、那就由魔王大人来决定谁侍奉的更好吧！${heart(1)}」`,
        ); // :468
        await era.printAndWait(`看来两个人之间缔结了新的友情………`); // :469
        era.set(`cflag:${target}:203`, 2); // :470
      } else if (era0(`talent:${target}:76`) == 1) {
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目（:473）
        await era.printAndWait(
          `「呼…${time_word}${assi_name}来和我一起玩3p吗？」`,
        ); // :473
        await era.printAndWait(
          `${target_name}露出一脸飘飘然的表情，跟${player_name}一起和${assi_name}打了招呼。`,
        ); // :474
        await era.printAndWait(
          `『啊啊、${target_name}、真是漂亮的表情。魔王大人已经看到你这副可爱的样子了吗？』`,
        ); // :475
        await era.printAndWait(
          `「嗯嗯、是的哦…不管是小穴还是肛门都已经稀里哗啦的湿透了哦${heart(1)}」`,
        ); // :476
        await era.printAndWait(
          `${target_name}一边淫乱的笑着一边把手放在股间摩擦着。`,
        ); // :477
        await era.printAndWait(
          `『哎呀哎呀、${target_name}，今后我就承认你是魔王大人的淫穴队长吧♪』`,
        ); // :478
        await era.printAndWait(
          `「啊哈…淫穴队长…多么好听的名字呢${heart(1)} …没问题啦、就交给我和我的小穴了${heart(1)}」`,
        ); // :479
        era.set(`cflag:${target}:203`, 2); // :480
      }
      return 1; // :482
    } else if (era0(`cflag:${target}:203`) == 2 && era0('flag:7') == 2) {
      // :484 二回目以降——原作此支缺 RETURN 1（源 :484-495，其余同构臂均有），
      // 1:1 保留，落到函数末尾的隐式 RETURN 0
      if (era0(`talent:${target}:85`) == 1) {
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目（:487）
        await era.printAndWait(
          `「哎呀、${time_word}是三个人一起享受吧${heart(1)}」`,
        ); // :487
        await era.printAndWait(`『那么、首先让作为奴隶的我为魔王大人服务吧』`); // :488
        await era.printAndWait(
          `${target_name}和${assi_name}对${player_name}作为奴隶的侍奉服务开始了………`,
        ); // :489
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈啊…来啊…${assi_name}。我快受不了了，一起来满满的灌注给我吧…${heart(1)}」`,
        ); // :492
        await era.printAndWait(
          `一边发出甜腻的献媚声音，${target_name}一边分开自己的身体诱惑着${assi_name}。`,
        ); // :493
        await era.printAndWait(
          `『哼哼哼、队长摆出这样的姿态真是无法拒绝的邀请啊~♪』`,
        ); // :494
      }
    } else {
      await era.printAndWait(
        `「比我弱小的家伙，不管对我做什么我都不会在意的…呼」`,
      ); // :498
      await era.printAndWait(
        `『是这样吗？被我做着这样的事，”弱小”？还在说着什么了不起的话啊、”队长”』`,
      ); // :499
      await era.printAndWait(
        `因为被挑衅了，${assi_name}抓住${target_name}的巨乳尽情的拧捏，${target_name}发出了痛苦的声音………`,
      ); // :500
      return 1; // :501
    }
  } else if (assi == 23) {
    // 助手白梅花
    if (era0(`talent:${assi}:121`) == 0) {
      return 0;
    }
    era.drawLine(); // :507
    if (era0(`cflag:${target}:204`) == 0) {
      // 初めて
      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`cflag:${target}:201`) >= 5
      ) {
        await era.printAndWait(
          `「你也被魔王大人疼爱着么…是那股间东西的原因吗？」`,
        ); // :512
        await era.printAndWait(
          `『嗯~~~魔王大人非常喜欢这淫乱的东西呢、一直被充分的疼爱着呢♪』`,
        ); // :513
        await era.printAndWait(
          `${target_name}的语调中有着明显的嫉妒情绪，随着${assi_name}股间耷拉着的阴茎和淫乱的话语，下体逐渐变湿润了。`,
        ); // :514
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目（:515）
        await era.printAndWait(
          `「${time_word}既然你被魔王大人疼爱着的话…嘛，也罢、没关系………」`,
        ); // :515
        await era.printAndWait(
          `但是${target_name}的眼睛已经不能从${assi_name}的阴茎移开了。`,
        ); // :516
        era.set(`cflag:${target}:204`, 2); // :517
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`cflag:${target}:201`) >= 5
      ) {
        await era.printAndWait(
          `「你也变成魔王大人的肉欲玩具了吗…啊呀、那个可爱的阴茎能让魔王大人满足么？」`,
        ); // :520
        await era.printAndWait(
          `『呼呼呼、那是我和魔王大人两个人的秘密哦、${target_name}队长♪』`,
        ); // :521
        await era.printAndWait(
          `「虽然从圣灵堡垒的某处偶然听到了你是扶她的消息、没想到能在这种地方“品尝”到扶她的滋味…♪」`,
        ); // :522
        await era.printAndWait(
          `${target_name}看着${assi_name}的阴茎变得兴奋起来了。`,
        ); // :523
        await era.printAndWait(
          `${target_name}想到今后会被${assi_name}的阴茎侵犯，说不定是满怀期待呢………`,
        ); // :524
        era.set(`cflag:${target}:204`, 2); // :525
      } else {
        await era.printAndWait(
          `「什么啊、你居然在这里取悦魔王？${assi_name}！以前就觉得你奇怪了，没想到是这样的人！」`,
        ); // :528
        await era.printAndWait(
          `${target_name}因为旧部下的背叛，信念和声音都不禁动摇了。${assi_name}哎呀着耸了耸肩，用裤裆里的东西压在了${target_name}的身体上。`,
        ); // :529
        await era.printAndWait(
          `「唔嗷！扶、扶她…？虽然在狂王大人那里听说了，没想到真的是这样…诶？这样的话…啊、放肆…你在做什么…？」`,
        ); // :530
        await era.printAndWait(
          `『没想到、呵呵，${target_name}队长会变成犯人这种事情我也没有想过呢、不过没关系，让我带队长前往愉悦的天国吧♪』`,
        ); // :531
        await era.printAndWait(
          `${target_name}的面色变得铁青、今后会发出怎样的悲鸣呢？真令人期待………`,
        ); // :532
        era.set(`cflag:${target}:204`, 1); // :533
      }
      return 1; // :535
    } else if (
      // 二回目以降（爱＆淫乱取得時）
      (era0(`cflag:${target}:204`) == 1 &&
        era0('flag:7') == 2 &&
        era0(`talent:${target}:85`) == 1) ||
      era0(`talent:${target}:76`) == 1
    ) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `『队长也成为魔王大人的东西了呢。呼呼呼、做为纪念就在魔王大人面前侵犯你好了${heart(1)}』`,
        ); // :541
        await era.printAndWait(`「不、不要…那样的话我会因羞耻而死的」`); // :542
        await era.printAndWait(
          `『都到现在了还在说什么呢？在魔王大人面前被我侵犯那么多次了、用那么让人讨厌的眼神看着我…那难道不是在引诱我吗？』`,
        ); // :543
        await era.printAndWait(
          `「不、不一样！不是这样的！　魔王大人！魔王大人也会憎恨我被别人侵犯吧？」`,
        ); // :544
        await era.printAndWait(
          `${target_name}在拼命的寻求帮助、但${player_name}只是在一旁笑笑而已。`,
        ); // :545
        await era.printAndWait(
          `『放心吧，如果是魔王大人的命令，我也不会违背的、所以不行的话我不会上的啦、大概吧♪』`,
        ); // :546
        era.set(`cflag:${target}:204`, 2); // :547
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈哈…呐、${assi_name}、拜托你咯、我的小穴和肛门都想要你的肉棒呢、想要绝顶！」`,
        ); // :550
        await era.printAndWait(
          `『魔王大人真是厉害呢、能把那个${target_name}队长调教到如此淫乱的程度』`,
        ); // :551
        await era.printAndWait(
          `${assi_name}看着${target_name}凌乱的姿态不由的发出赞叹。那个${target_name}四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。`,
        ); // :552
        await era.printAndWait(
          `「不要只站在那里看啊…啊啊…拜托了！拜托了！${heart(1)}」`,
        ); // :553
        await era.printAndWait(
          `『魔王大人、怎么处理呢？我觉得就这么放着也蛮有意思呢♪』`,
        ); // :554
        await era.printAndWait(
          `看着${target_name}那副可怜的发情姿态、${assi_name}愉悦的笑了………`,
        ); // :555
        era.set(`cflag:${target}:204`, 2); // :556
      }
      return 1; // :558
    } else if (era0(`cflag:${target}:204`) == 2 && era0('flag:7') == 2) {
      // 二回目以降
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…我的身体…光是看着…就变得这么有感觉了…♪」`,
        ); // :563
        await era.printAndWait(
          `${target_name}看着${player_name}和${assi_name}排着队的阴茎变得十分的兴奋。`,
        ); // :564
        await era.printAndWait(
          `『现在的你多么的富有魅力你恐怕不明白吧、让人想狠狠的随意摆布、玩弄你呢』`,
        ); // :565
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊真是的…魔王大人、${assi_name}好想要阴茎…两个人一起随便你们侵犯我的哪里吧${heart(1)}」`,
        ); // :568
        const pose_a = `${target_name}四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。`;
        const pose_b = `${target_name}躺在地上分开大腿，用手指插进小穴和肛门狠狠的搅动着、引诱着${player_name}和${assi_name}。`;
        await era.printAndWait(`${rand_n(2) === 0 ? pose_a : pose_b}`); // :569（RAND:2 三目：整句二选一）
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目（:570）
        const hole_word = rand_n(2) === 0 ? '菊花' : '小穴'; // RAND:2 三目（:570）
        await era.printAndWait(
          `『啊魔王大人…${time_word}${target_name}队长的${hole_word}就让我侵犯吧♪』`,
        ); // :570
      }
      return 1; // :572
    } else {
      await era.printAndWait(
        `「呼、呵呵…你这种人的阴茎…啊、啊我是不会输的………」`,
      ); // :575
      await era.printAndWait(`『真的吗？好像比起我个人，你对阴茎更有兴趣嘛♪』`); // :576
      await era.printAndWait(
        `好像要证明这句话的正确性、${target_name}的眼睛不时的看向${assi_name}股间的阴茎………`,
      ); // :577
      return 1; // :578
    }
  } else {
    // 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ
    return k7_kojo2(); // :582 CALL K7_KOJO2
  }
  return 0;
});

/**
 * @K7_KOJO2（:589-824）：调教开始口上的二回目以降（崩坏 / 反抗刻印Lv3 /
 * 屈服刻印Lv0-3 / 淫乱 / 爱慕，各含着衣分支 + 魔族/それ以外分支）。
 * 未省略角色位的 MARK:N / TALENT:N 一律按 Emuera TARGET 简写展开（#232）。
 */
async function k7_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%

  if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {
    // 崩坏
    era.drawLine();
    await era.printAndWait(`「………啊～…………啊～」`); // :593
    await era.printAndWait(
      `精神完全的崩溃了的${target_name}，无论${player_name}弄什么都毫无反应………`,
    ); // :594
    return 1; // :595
  } else if (era0(`mark:${target}:3`) == 3 && era0('flag:7') == 2) {
    // 反抗刻印Lv3
    era.drawLine();
    await era.printAndWait(
      `${target_name}露出憎恨的目光，对${player_name}怒目而视。`,
    ); // :599
    await era.printAndWait(`「如果不想受伤，就赶快从这个房间滚出去！」`); // :600
    if (rand_n(3) == 1) {
      await era.printAndWait(
        `仔细看的话，${target_name}不知什么时候偷偷藏了吃饭用的刀叉呢！`,
      ); // :602
      if (era_flag.assi > 0) {
        await era.printAndWait(
          `${assi_name}慌忙的一边殴打${target_name}，一边抢夺着刀叉。`,
        ); // :604
        await era.printAndWait(
          `${assi_name}提出要狠狠的对${target_name}进行惩罚………`,
        ); // :605
      } else {
        await era.printAndWait(
          `${player_name}一把扭过${target_name}的手，夺走刀叉。`,
        ); // :607
        await era.printAndWait(`看来今天的惩罚要特别严厉才行………`); // :608
      }
    }
    return 1; // :611
  } else if (era0(`mark:${target}:2`) == 0 && era0('flag:7') == 2) {
    // 屈服刻印Lv0
    era.drawLine();
    await era.printAndWait(`「诶呀、又来了？呵呵，你的调教没什么大不了的」`); // :615
    await era.printAndWait(`${target_name}不屑的看着${player_name}………`); // :616
    return 1; // :617
  } else if (era0(`mark:${target}:2`) == 1 && era0('flag:7') == 2) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(`「还没有放弃么，真是麻烦？」`); // :622
    await era.printAndWait(`${target_name}带着有点腻了的表情从床上爬了起来………`); // :623
    return 1; // :624
  } else if (era0(`mark:${target}:2`) == 2 && era0('flag:7') == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    await era.printAndWait(`「又要让我用手么，真是恶心…快点弄完就算了………」`); // :629
    await era.printAndWait(`${target_name}带着疲惫的表情从床上爬了起来。`); // :630
    await era.printAndWait(
      `随着${player_name}越来越靠近，${target_name}的脸渐渐红了，呼吸也渐渐浑浊了起来………`,
    ); // :631
    return 1; // :632
  } else if (
    // 屈服刻印Lv3＋爱/淫乱無し
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    era0('flag:7') == 2
  ) {
    era.drawLine();
    await era.printAndWait(`「啊啊…又来了吗…再这样下去的话，我…啊啊啊」`); // :637
    await era.printAndWait(
      `${target_name}看到${player_name}的身影，害怕的抱紧自己的身体向后退着、直到碰到墙壁才缓缓站起来。`,
    ); // :638
    await era.print(`${player_name}慢慢的靠近了${target_name}`); // :639
    if (
      era0(`talent:${target}:302`) >= 1 &&
      era0(`talent:${target}:302`) <= 100
    ) {
      await era.printAndWait(`抓过她的金发嗅着。`); // :641
    } else if (
      era0(`talent:${target}:302`) >= 101 &&
      era0(`talent:${target}:302`) <= 200
    ) {
      await era.printAndWait(`抓过她长顺的金发嗅着。`); // :643
    } else if (era0(`talent:${target}:302`) >= 201) {
      await era.printAndWait(`抓过她的金色短发嗅着。`); // :645
    }
    await era.printAndWait(
      `${target_name}被做了这样的事，也只能闭着眼睛默默忍受着。然后${player_name}把她推到。`,
    ); // :647
    await era.printAndWait(`「至、至少…把灯关了再………」`); // :648
    return 1; // :649
  } else if (era0(`talent:${target}:76`) == 1 && era0('flag:7') == 2) {
    // 淫乱
    era.drawLine();
    if (era0('flag:37') != 0) {
      // 服分岐優先（着衣設定無しの場合は進む）
      if (era0(`cflag:${target}:40`) & 28 && era0(`cflag:${target}:41`) == 1) {
        // 普段着・スカートタイプ（原作两行注释掉，模板未填写，1:1 保留）
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 101
      ) {
        // 普段着・ズボンタイプ（同上）
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 209
      ) {
        // メイド服
        await era.printAndWait(
          `「哈哈哈、狂王大人也喜欢这样的衣服呢。穿着这个衣服的我究竟是多少人的女仆呢…啊啊、今天的话，是魔王大人的女仆呢哈哈」`,
        ); // :667
        await era.printAndWait(
          `看来穿女仆装是${target_name}的爱好呢，超短的裙子、简单的在腰上围好围裙。`,
        ); // :668
        await era.printAndWait(
          `连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个巨乳。`,
        ); // :669
        await era.printAndWait(
          `「啊啊、主人啊～嗯${heart(1)} 色情的女仆${target_name}在这…好好惩罚一下我吧${heart(1)}」`,
        ); // :670
        await era.printAndWait(`${target_name}对你露出妩媚的神态、诱惑着你………`); // :671
        return 1; // :672
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 203
      ) {
        // 妓女のドレス
        await era.printAndWait(
          `${target_name}穿着白色镂空花纹的妓女服饰，在裙边有着漂亮的花纹，非常可爱。`,
        ); // :675
        await era.printAndWait(
          `但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。`,
        ); // :676
        await era.printAndWait(
          `「呵呵、真是非常棒的礼服啊${heart(1)} 不过穿成这样要与魔王大人做爱的话，会有点难受吧${heart(1)}」`,
        ); // :677
        await era.printAndWait(
          `${target_name}的手在股间摩擦着，诱惑一般，向${player_name}露出衣服的缝隙，展示着内裤。`,
        ); // :678
        await era.printAndWait(`那条穿在身上的内裤已经湿透了。`); // :679
        await era.printAndWait(
          `「呐、这条内裤，由魔王大人来给我褪下吧${heart(1)}」`,
        ); // :680
        return 1; // :681
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 254
      ) {
        // バニースーツ
        await era.printAndWait(
          `「一跳一跳一跳的~~~、像小兔子一样跳～${heart(1)}」`,
        ); // :684
        await era.printAndWait(
          `${target_name}穿着红色兔女郎装，跳着跳着突然转过身、快乐的笑着，靠近了${player_name}。`,
        ); // :685
        await era.printAndWait(
          `「小兔子呐～非常想要魔王大人的“胡萝卜”呢～${heart(1)}」`,
        ); // :686
        await era.printAndWait(
          `淫乱的兔女郎抱着${player_name}，双手在魔王的双腿间揉动着、眼睛亮闪闪的看着${player_name}。`,
        ); // :687
        await era.printAndWait(
          `「这个地方有大大的胡萝卜先生呢～${heart(1)} 呵呵、快给小兔子吧♪」`,
        ); // :688
        return 1; // :689
      }
    }
    if (era0(`talent:${target}:314`) == 9) {
      // 魔族
      if (rand_n(3) == 0) {
        await era.printAndWait(`「嘛…要来抱一抱我吗？」`); // :695
        await era.printAndWait(
          `${target_name}对着${player_name}一边露出媚态，一边慢慢的靠了过来。`,
        ); // :696
        await era.printAndWait(
          `「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼~…${heart(1)}」`,
        ); // :697
        await era.printAndWait(
          `${target_name}抱着${player_name}的手臂、用热情的…嗯，是发情的目光看着${player_name}。`,
        ); // :698
        await era.printAndWait(
          `「呼呼…我的身体全都是魔王大人的东西哦…${heart(1)}」`,
        ); // :699
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「哼哼哼…魔王大人也想要我的小穴了呢…${heart(1)}」`,
        ); // :701
        await era.printAndWait(
          `${target_name}在床上分开双腿、用双手扒开阴部，让尾巴不停的在蜜裂上滑动着。`,
        ); // :702
        await era.printAndWait(
          `有意识的用魅魔的力量制造出甜蜜的香气，${target_name}袭击了过来。`,
        ); // :703
        await era.printAndWait(`「快…快来…快来侵犯我吧魔王大人~~${heart(1)}」`); // :704
      } else {
        await era.printAndWait(
          `「哈哈…魔王大人…来到我这里，我就要负起一名淫乱魔族主人的责任哦…♪」`,
        ); // :706
        await era.printAndWait(
          `${target_name}只是看着${player_name}就发情了，双眼都湿润了起来。`,
        ); // :707
        await era.printAndWait(
          `「现在…和以前比起来，不管胸部还是臀部都像小穴一样一碰就快感四溢…不过只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊啊${heart(1)}」`,
        ); // :708
        await era.printAndWait(
          `${target_name}被${player_name}拥抱着，吐露出融化般的声音………`,
        ); // :709
      }
    } else {
      // それ以外
      if (rand_n(3) == 0) {
        await era.printAndWait(`「嘛…要来抱一抱我吗？」`); // :715
        await era.printAndWait(
          `${target_name}对着${player_name}一边露出媚态，一边慢慢的靠了过来。`,
        ); // :716
        await era.printAndWait(
          `「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼${heart(1)}」`,
        ); // :717
        await era.printAndWait(
          `${target_name}抱着${player_name}的手臂、用热情的…嗯，是发情的目光看着`,
        ); // :718
        await era.printAndWait(
          `「呼呼…我的身体全都是魔王大人的东西哦…${heart(1)}」`,
        ); // :719
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「哼哼哼…魔王大人也想要我的小穴了呢…${heart(1)}」`,
        ); // :721
        await era.printAndWait(
          `${target_name}在床上分开双腿、用双手扒开阴部，让尾巴不停的在蜜裂上滑动着。`,
        ); // :722
        await era.printAndWait(`「快…快来…快来侵犯我吧魔王大人~~${heart(1)}」`); // :723
      } else {
        await era.printAndWait(`「魔王大人…快点来对我进行淫乱的调教啊…♪」`); // :725
        await era.printAndWait(
          `${target_name}搂着${player_name}的胳膊，出神的笑着。`,
        ); // :726
        await era.printAndWait(
          `只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊啊${heart(1)}」`,
        ); // :727
        await era.printAndWait(
          `${target_name}被${player_name}搂着腰，吐露出荡漾的声音………`,
        ); // :728
      }
    }
    return 1; // :731
  } else if (era0(`talent:${target}:85`) == 1 && era0('flag:7') == 2) {
    // 爱慕
    era.drawLine();
    if (era0('flag:37') != 0) {
      // 服分岐優先
      if (era0(`cflag:${target}:40`) & 28 && era0(`cflag:${target}:41`) == 1) {
        // 普段着・スカートタイプ（模板未填写，1:1 保留）
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 101
      ) {
        // 普段着・ズボンタイプ（同上）
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 209
      ) {
        // メイド服
        await era.printAndWait(
          `「还是和以前一样不擅长穿这种和女佣一样的衣服啊………」`,
        ); // :749
        await era.printAndWait(
          `看来穿女仆装是${target_name}的爱好呢，超短的裙子、简单的在腰上围好围裙。`,
        ); // :750
        await era.printAndWait(
          `连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个巨乳。`,
        ); // :751
        await era.printAndWait(`「只为魔王大人提供的特殊侍奉来咯♪」`); // :752
        await era.printAndWait(
          `${target_name}莞尔一笑轻提起裙边鞠了一躬，那个发乎自然的动作，不仅仅是一流的教育就能训练的出的。`,
        ); // :753
        await era.printAndWait(
          `再想到这个少女超一流的性侍奉技巧，你满足的点了点头………`,
        ); // :754
        return 1; // :755
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 203
      ) {
        // 妓女のドレス
        await era.printAndWait(
          `「最开始穿上这么下流的衣服因为太羞耻了差点晕倒、不过魔王大人喜欢的话就没关系」`,
        ); // :758
        await era.printAndWait(
          `${target_name}穿着白色镂空花纹的妓女服饰，在裙边有着漂亮的花纹，非常可爱。`,
        ); // :759
        await era.printAndWait(
          `但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。`,
        ); // :760
        await era.printAndWait(
          `「啊、不行啊、这不是几乎全都露出来了吗…啊呜…这种、手根本挡不住啊…嗯啊啊啊！…唔、真是太羞耻啦啊」`,
        ); // :761
        await era.printAndWait(
          `虽然不行不行的摇着头，不过从${target_name}双手试图遮挡的小缝隙中看、内裤已经逐渐的湿透了………`,
        ); // :762
        return 1; // :763
      } else if (
        era0(`cflag:${target}:40`) & 28 &&
        era0(`cflag:${target}:41`) == 254
      ) {
        // バニースーツ
        const time_word = era_flag.time === 0 ? '今日' : '今夜'; // TIME 三目（:766）
        await era.printAndWait(
          `${target_name}穿着红色的兔女郎装${time_word}进行侍奉。`,
        ); // :766
        await era.printAndWait(
          `你从桌上取了一支烟叼着，叫${target_name}过来。`,
        ); // :767
        await era.printAndWait(`「啊、嗯、是要吸烟了么？」`); // :768
        await era.printAndWait(
          `${target_name}从胸部暴露的双峰间取出魔石打火机为你点上了烟。`,
        ); // :769
        await era.printAndWait(
          `你吸了一口烟，把${target_name}抱在怀里、嘴对嘴的喂她吸了一口烟。`,
        ); // :770
        await era.printAndWait(
          `「嗯咳咳！咕咳咳咳…呼咳咳啊咳咳唔咳咳！…对、对不起还是不习惯这样………」`,
        ); // :771
        await era.printAndWait(
          `呜咽着的${target_name}看向你、随即湮没在云雾之中………`,
        ); // :772
        return 1; // :773
      }
    }
    if (era0(`talent:${target}:314`) == 9) {
      // 魔族
      if (rand_n(3) == 0) {
        const time_word2 = era_flag.time === 0 ? '今日' : '今宵'; // TIME 三目（:779）
        await era.printAndWait(
          `「啊…我的魔王大人、${time_word2}也和往常一样来了啊…」`,
        ); // :779
        await era.printAndWait(
          `${target_name}用拜伏的姿势向${player_name}打了招呼。`,
        ); // :780
        await era.printAndWait(
          `${target_name}有了自己的房间，自己搞着卫生、床单也被允许用干净的东西代替。`,
        ); // :781
        await era.printAndWait(`今后就在这个房间和${target_name}交合了。`); // :782
        await era.printAndWait(
          `「那么这边…我这身躯就随魔王大人喜欢抱着吧…${heart(1)}」`,
        ); // :783
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦您了」`,
        ); // :785
        await era.printAndWait(
          `${target_name}用拜伏的姿势向${player_name}打了招呼。`,
        ); // :786
        await era.printAndWait(
          `连翅膀和尾巴也垂着、对${player_name}表示出了完全的敬意。`,
        ); // :787
        await era.printAndWait(
          `「现在已经做好了准备。让魔王大人更喜欢“上”这个地方${heart(1)}」`,
        ); // :788
        await era.printAndWait(
          `${target_name}是说台词的时候发了情吗，脸越来越红了………`,
        ); // :789
      } else {
        await era.printAndWait(
          `「光是魔王大人的拥抱就已经让我感到如此幸福了…」`,
        ); // :791
        await era.printAndWait(`${target_name}和${player_name}进行着贴面舞。`); // :792
        await era.printAndWait(
          `${target_name}带着陶醉的表情，把头埋进${player_name}的胸前、尾巴也缠住了脚。`,
        ); // :793
        await era.printAndWait(
          `「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」`,
        ); // :794
      }
    } else {
      // それ以外
      if (rand_n(3) == 0) {
        const time_word2 = era_flag.time === 0 ? '今日' : '今宵'; // TIME 三目（:800）
        await era.printAndWait(
          `「啊…我的魔王大人、${time_word2}也和往常一样来了啊…」`,
        ); // :800
        await era.printAndWait(
          `${target_name}用拜伏的姿势向${player_name}打了招呼。`,
        ); // :801
        await era.printAndWait(
          `${target_name}有了自己的房间，自己搞着卫生、床单也被允许用干净的东西代替。`,
        ); // :802
        await era.printAndWait(`今后就在这个房间和${target_name}交合了。`); // :803
        await era.printAndWait(
          `「那么这边…我这身躯就随魔王大人喜欢抱着吧…${heart(1)}」`,
        ); // :804
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦您了」`,
        ); // :806
        await era.printAndWait(
          `${target_name}用拜伏的姿势向${player_name}打了招呼。`,
        ); // :807
        await era.printAndWait(
          `「现在已经做好了准备。让魔王大人更喜欢“上”这个地方${heart(1)}」`,
        ); // :808
        await era.printAndWait(
          `${target_name}是说台词的时候发了情吗，脸都红了………`,
        ); // :809
      } else {
        await era.printAndWait(
          `「光是魔王大人的拥抱就已经让我感到如此幸福了…」`,
        ); // :811
        await era.printAndWait(`${target_name}和${player_name}进行着贴面舞。`); // :812
        await era.printAndWait(
          `${target_name}带着陶醉的表情，把头埋进${player_name}的胸前、尾巴也缠住了脚。`,
        ); // :813
        await era.printAndWait(
          `「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」`,
        ); // :814
      }
    }
    return 1; // :817
  }
  return 0;
}

/**
 * @EVENTEND（:825-907，普通档）：调教结束时的口上。
 *
 * 守卫（:826-827/:828-829/:831-832）：FLAG:7 <= 0 跳过、TALENT:167 != 1
 * 跳过、BASE:0 <= 0（角色死亡）跳过。此后按崩坏 → 反抗刻印Lv3+爱无 →
 * 屈服刻印Lv1以下/Lv2/Lv3+爱无 → 淫乱/爱慕（各按体力 BASE:0 ≥/≤ 500
 * 分档）取首个命中。BASE:0 省略角色位按 Emuera TARGET 简写展开。
 */
on('EVENTEND', async () => {
  const target = era_flag.target;
  if (era0('flag:7') <= 0) {
    return 0;
  }
  if (era0(`talent:${target}:167`) != 1) {
    return 0;
  }
  if (era0(`base:${target}:0`) <= 0) {
    // キャラ死亡時は口上をスキップ
    return 0;
  }

  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%

  if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {
    // 崩坏
    era.drawLine();
    await era.printAndWait(`「不…讨厌…怪物的孩子不要生下来…不要………」`); // :841
    await era.printAndWait(
      `${target_name}脸上混着泪水与口水目光呆滞的躺在地上………`,
    ); // :842
    return 1;
  } else if (
    era0(`mark:${target}:3`) == 3 &&
    era0(`talent:${target}:76`) == 0 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // 反抗刻印Lv3+爱无
    era.drawLine();
    await era.printAndWait(`「可…可恨至极………！」`); // :847
    await era.printAndWait(
      `${target_name}的指甲在地上“吱吱”的抓着，带着恶鬼般的表情看着${player_name}………`,
    ); // :848
    return 1;
  } else if (
    era0(`mark:${target}:2`) <= 1 &&
    era0(`talent:${target}:76`) == 0 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv1以下+爱无
    era.drawLine();
    await era.printAndWait(`「额…结束了吗…？」`); // :854
    await era.printAndWait(
      `${target_name}擦了擦嘴角、把脸背向${player_name}………`,
    ); // :855
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 2 &&
    era0(`talent:${target}:76`) == 0 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv2+爱无
    era.drawLine();
    await era.printAndWait(`「呼呼…终于结束了、请你快回去………」`); // :861
    await era.printAndWait(`${target_name}擦着眼角、用床单将身体包裹起来………`); // :862
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:76`) == 0 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // 屈服刻印Lv3+爱无
    era.drawLine();
    await era.printAndWait(`「已经…如果再这样下去…我就………呼…呼…」`); // :868
    await era.printAndWait(`${target_name}伏在床上剧烈的呼吸着。`); // :869
    await era.printAndWait(`「狂王大人救救我………」`); // :870
    return 1;
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // 淫乱(体力500以上)
    era.drawLine();
    await era.printAndWait(
      `「啊啊真是的…我感觉一点也不够啊…呐…难道是对我的身体厌倦了吗？」`,
    ); // :876
    await era.printAndWait(`${target_name}相当不满的嘟着嘴。`); // :877
    await era.printAndWait(`「下次…要更加激烈的………啊？」`); // :878
    return 1;
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // 淫乱(体力500未満)
    era.drawLine();
    await era.printAndWait(
      `「呼啊呼啊…如果再抱我一下…就满足了………${heart(1)}」`,
    ); // :883
    await era.printAndWait(
      `被汗水和各种其他体液沾满的${target_name}横倒在一旁。`,
    ); // :884
    await era.printAndWait(`「呐…下次什么时候侵犯我呢…？」`); // :885
    return 1;
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // 爱慕(体力500以上)
    era.drawLine();
    await era.printAndWait(`「今天…只是这样就可以了吗…？」`); // :891
    await era.printAndWait(`${target_name}有点担心的窥探着你的表情。`); // :892
    await era.printAndWait(`「更…更肆无忌惮一点的做也没关系哦………」`); // :893
    return 1;
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // 爱慕(体力500未満)
    era.drawLine();
    await era.printAndWait(
      `「哈呼…您是这么的爱我啊…实在是万分感谢${heart(1)}」`,
    ); // :898
    await era.printAndWait(`${target_name}把脸贴在你的手上回味着。`); // :899
    await era.printAndWait(`「我是魔王大人的东西，让我更加的和您在一起吧………」`); // :900
    return 1;
  }
  return 0;
});

/**
 * @KOJO_MESSAGE_COM_7（:908-6280）：指令口上族。
 *
 * 头部七道守卫（:909-931，源实测，K7 顺序 1:1）：
 *   1. ASSI > 0 && ASSIPLAY（助手调教）→ 跳过；
 *   2. TEQUIP:45 && SELECTCOM != 45（口塞）→ 跳过；
 *   3. TFLAG:899（失神）→ 跳过；
 *   4. TEQUIP:89（兽奸）→ **岔去本文件真身 DOG_KOJO_7**；
 *   5. TEQUIP:55（死斗场）→ **岔去本文件真身 COLOSSEUM_KOJO_7**；
 *   6. TALENT:9 == 1（崩坏）→ 跳过；
 *   7. TEQUIP:90（触手）→ 跳过。
 *
 * SELECTCOM 分支覆盖（按源文顺序）：0/1/2/3/5/6/7/8/9/10/11/12/13/14/15/16/
 * 19/20/21/22/23/26/27/28/29/30/31/32/33/34/35/36/37/40/41/42/43/44/45/46/
 * 55/56/123/125/126/127/69/124/80/87，各支未省略角色位的 TALENT/CFLAG 一律
 * 展开 TARGET。CFLAG:301-400 是各指令的计数器状态机（初回写入、二回目以降
 * 按素质/刻印分档取首个命中）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0（TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_7(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_name(MASTER); // %NAME:MASTER%
  const master = MASTER; // ABL:MASTER:12 等省略前缀写法的展开

  // :909-910 助手调教时跳过
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :912-913 口塞着用时跳过（SELECTCOM == 45 自己说话不算）
  if (era0(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :915-916 失神时跳过
  if (era0('tflag:899')) {
    return 0;
  }
  // :918-921 兽奸PLAY中是专用口上——岔去本文件真身
  if (era0(`tequip:${target}:89`)) {
    await dog_kojo_7(rand_n);
    return 0;
  }
  // :923-926 死斗场中是专用口上——岔去本文件真身
  if (era0(`tequip:${target}:55`)) {
    await colosseum_kojo_7(rand_n);
    return 0;
  }
  // :928-929 崩坏时跳过
  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }
  // :931-932 触手调教中跳过
  if (era0(`tequip:${target}:90`)) {
    return 0;
  }
  if (era_flag.selectcom == 0) {
    if (era0(`cflag:${target}:301`) == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(
          `「嗯…呼、唔…嗯…不能再温柔一点吗？…啊…嗯…啊嗯」`,
        ); // :945
        await era.printAndWait(
          `${target_name}的身体因为被爱抚扭动着、吐出叹息般的呻吟………`,
        ); // :946
      } else {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「嗯啊…只是感觉有些痒而已…快点把手拿开」`); // :950
          await era.printAndWait(
            `${target_name}的身体扭动着，想从${player_name}的爱抚中逃走………`,
          ); // :951
        } else {
          await era.printAndWait(`「要做什么...？呵呵、你这种人也想爱抚我？」`); // :953
          await era.printAndWait(
            `${target_name}因为${player_name}笨拙的爱抚技巧而嘲笑着………`,
          ); // :954
        }
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :957
      era.set(`cflag:${target}:301`, 1); // :957
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:301`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「再激烈一些…我的身体啊…啊嗯…想要更多的…啊哈…嗯啊啊啊！」`,
        ); // :963
        await era.printAndWait(
          `${target_name}的身体因为爱抚不住的扭动着，就像是在跳淫荡的舞蹈一样。`,
        ); // :964
        await era.printAndWait(`她已经敏感到了令人吃惊的地步。`); // :965
        if (
          rand_n(2) == 0 &&
          (era0(`stain:${target}:0`) < 2 ||
            era0(`stain:${target}:0`) == 16 ||
            era0(`stain:${target}:0`) == 17 ||
            era0(`talent:${master}:64`) ||
            era_flag.assiplay) &&
          era0(`tequip:${target}:45`) == 0 &&
          era0(`cflag:${target}:16`) != -1
        ) {
          await era.printAndWait(
            `「啊咿…嗯啊…嗯呼…嗯…啊呼…更…更进一步也不要紧哦？」`,
          ); // :967
          await era.printAndWait(
            `${target_name}和${player_name}激烈的接吻着摩擦着身体、进一步要求你的爱抚、`,
          ); // :968
          await era.printAndWait(
            `「嗯啊…呼啊呼啊…进入…进入我身体也没有关系哦，不管是胸部还是小穴都已经饥渴难耐了${heart(1)}」`,
          ); // :969
        } else {
          await era.printAndWait(
            `「啊…我的奶子好难受…更多的揉弄它吧…啊…嗯呼呜呜…啊…啊咿～${heart(1)}」`,
          ); // :971
          await era.printAndWait(
            `${target_name}每次被爱抚身体都疯狂的扭动着，毫不顾忌的大声淫叫………`,
          ); // :972
        }
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :974
        era.set(`cflag:${target}:301`, 6); // :974
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:301`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼…再更多的给我、身体…啊嗯…抚摸我的身体把…啊嗯…啊…啊呼${heart(1)}」`,
        ); // :977
        await era.printAndWait(
          `${target_name}被${player_name}抚摸着，因为过于刺激连表情都出神了，只盼望着${player_name}进一步行动。`,
        ); // :978
        if (
          rand_n(2) == 0 &&
          (era0(`stain:${target}:0`) < 2 ||
            era0(`stain:${target}:0`) == 16 ||
            era0(`stain:${target}:0`) == 17 ||
            era0(`talent:${master}:64`) ||
            era_flag.assiplay) &&
          era0(`tequip:${target}:45`) == 0 &&
          era0(`cflag:${target}:16`) != -1
        ) {
          await era.printAndWait(
            `「呼嗯…嗯…吸…呼…更激烈的和我接吻吧…嗯吸…嗯呼呼${heart(1)}」`,
          ); // :980
          await era.printAndWait(
            `${player_name}和${target_name}的舌头互相纠缠着，挑逗着敏感地带。`,
          ); // :981
          await era.printAndWait(`「嗯呼…啊…那、那里、更加的…我…啊啊♪」`); // :982
        } else {
          await era.printAndWait(
            `「亲爱的魔王大人啊…啊啊…更多的爱我吧………${heart(1)}」`,
          ); // :984
          await era.printAndWait(
            `${player_name}紧抱着${target_name}的身体、抚摸着敏感地带、手在蜜裂处挑逗着………`,
          ); // :985
        }
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :987
        era.set(`cflag:${target}:301`, 5); // :987
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:301`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊…那里…那里是…咕…呜…啊…啊嗯！」`); // :990
        await era.printAndWait(
          `${target_name}因为${player_name}的爱抚身体激烈的抖动着。`,
        ); // :991
        await era.printAndWait(
          `已经屈服了的${target_name}无论被${player_name}抚摸任何地方也无法拒绝。`,
        ); // :992
        if (
          rand_n(2) == 0 &&
          (era0(`stain:${target}:0`) < 2 ||
            era0(`stain:${target}:0`) == 16 ||
            era0(`stain:${target}:0`) == 17 ||
            era0(`talent:${master}:64`) ||
            era_flag.assiplay) &&
          era0(`tequip:${target}:45`) == 0 &&
          era0(`cflag:${target}:16`) != -1
        ) {
          await era.printAndWait(
            `「呼啊…啊…我、我…这样…嗯…嗯呼…嗯呜呜………呼啊」`,
          ); // :994
          await era.printAndWait(
            `压住了${target_name}的嘴唇、也只留下了呻吟和喘息的空间………`,
          ); // :995
        } else {
          await era.printAndWait(
            `「啊啊…啊嗯…啊…我…不行了…啊、呵、呵、呜咿！」`,
          ); // :997
          await era.printAndWait(
            `${target_name}在${player_name}的手臂中挣扎着，很可爱的样子………`,
          ); // :998
        }
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :1000
        era.set(`cflag:${target}:301`, 4); // :1000
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (era0(`cflag:${target}:301`) <= 2 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯…呼、呼唔…嗯…不能再温柔一点吗？…啊…嗯…啊嗯」`,
          ); // :1004
        } else {
          await era.printAndWait(
            `「啊…呼嗯…竟然对我做这种事…啊嗯…我可是很介意的…嗯！我不会原谅你了…啊！」`,
          ); // :1006
        }
        await era.printAndWait(
          `${target_name}的身体因为被爱抚扭动着、吐出叹息般的呻吟………`,
        ); // :1008
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :1009
        era.set(`cflag:${target}:301`, 3); // :1009
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (era0(`cflag:${target}:301`) <= 1 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「嗯啊…只是感觉有些痒而已…快点把手拿开」`); // :1013
          await era.printAndWait(
            `${target_name}的身体扭动着，想从${player_name}的爱抚中逃走………`,
          ); // :1014
        } else {
          await era.printAndWait(
            `「你在做什么呢？简直就像一只小蚯蚓在蠕动一样」`,
          ); // :1016
          await era.printAndWait(
            `${target_name}嘲笑着${player_name}笨拙的爱抚技巧………`,
          ); // :1017
        }
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :1019
        era.set(`cflag:${target}:301`, 2); // :1019
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (era0(`cflag:${target}:302`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「啊啊！翻开什么的！…哎哎、感觉好奇怪…你，你居然把我的…处女膜再生了吗…咕呜………」`,
        ); // :1033
        await era.printAndWait(
          `${target_name}因为被${player_name}扒开蜜裂而满脸通红的害羞着………`,
        ); // :1034
      } else {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「啊呜…咕…嗯嗯…舌头…在我的里面…啊啊啊！」`); // :1038
          await era.printAndWait(
            `${target_name}因为${player_name}的舔阴扭动着腰身呻吟着………`,
          ); // :1039
        } else {
          await era.printAndWait(
            `「嗯…嗯呼呼…好难为情啊、喏、好好舔啊要是舒服了我就原谅你♪」`,
          ); // :1041
          await era.printAndWait(
            `${target_name}边笑，边接受了${player_name}的舔阴………`,
          ); // :1042
        }
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :1045
      era.set(`cflag:${target}:302`, 1); // :1045
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:302`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「再激烈一点…狠狠的吮吸玩弄我的小穴吧~${heart(1)}」`,
        ); // :1051
        await era.printAndWait(
          `${target_name}因为蜜裂被人舔咬咀嚼着，整个人都因为快感呆滞了，口水垂下。`,
        ); // :1052
        await era.printAndWait(
          `「啊啊…啊…好棒…好棒…舌头在最深处${heart(1)} 真、真是太棒了…更多的舔、玩弄我的小穴吧${heart(1)}」`,
        ); // :1053
        await era.printAndWait(
          `${target_name}的每次喘息呻吟都伴随着爱液四溅………`,
        ); // :1054
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :1055
        era.set(`cflag:${target}:302`, 5); // :1055
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:302`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…嗯…不要舔啊…那样…啊啊…会弄脏魔王大人的嘴…嗯…啊、啊呜啊啊啊啊！」`,
        ); // :1058
        await era.printAndWait(
          `${target_name}的蜜裂被尽情的舔舐着。爱液一股一股的冒出来滋润了${player_name}的嘴。`,
        ); // :1059
        await era.printAndWait(
          `「不行了…已、又要去了…啊…啊啊啊…嗯…啊咿～${heart(1)}」`,
        ); // :1060
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :1061
        era.set(`cflag:${target}:302`, 4); // :1061
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:302`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「哈…啊…啊…咕…嗯呼啊！」`); // :1064
        await era.printAndWait(
          `${target_name}的蜜裂被激烈的舔舐着、阴唇都翻了出来。`,
        ); // :1065
        await era.printAndWait(`「我、我这…这样下去…啊啊…啊…嗯…咕呜呜！」`); // :1066
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :1067
        era.set(`cflag:${target}:302`, 3); // :1067
      } else if (era0(`cflag:${target}:302`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「啊啊…这样的！小穴最里面…舌头…啊啊啊！」`); // :1071
          await era.printAndWait(
            `${target_name}因为${player_name}的舔阴扭动着腰身呻吟着………`,
          ); // :1072
        } else {
          await era.printAndWait(
            `「嗯…嗯呼呼…好难为情啊、喏、好好舔啊要是舒服了我就原谅你♪」`,
          ); // :1074
          await era.printAndWait(
            `${target_name}边笑，边接受了${player_name}的舔阴………`,
          ); // :1075
        }
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :1077
        era.set(`cflag:${target}:302`, 2); // :1077
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (era0(`cflag:${target}:303`) == 0) {
      if (era0(`abl:${target}:3`) >= 3) {
        await era.printAndWait(
          `「啊啊…啊…不、不行啊…不能再被这样玩弄了…啊…呜咿！」`,
        ); // :1090
        await era.printAndWait(
          `${target_name}被开发了的肛门，接受着${player_name}的爱抚、感受到了极大的快感………`,
        ); // :1091
      } else if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(
          `「咕呜…呜呜呜呜…真、真让人感觉恶心…啊啊…再、再也不想这样了………」`,
        ); // :1093
        await era.printAndWait(
          `${target_name}因为肛门被爱抚邹着眉头、似乎在忍耐着那个奇妙的感觉………`,
        ); // :1094
      } else {
        await era.printAndWait(
          `「啊啊！好痛啊！痛死人了！快点给我停下来停下来啊！」`,
        ); // :1096
        await era.printAndWait(
          `${target_name}因为肛门被爱抚痛苦的发出悲鸣，从${player_name}的手中逃走………`,
        ); // :1097
      }
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :1099
      era.set(`cflag:${target}:303`, 1); // :1099
      return 0;
    } else {
      const P =
        (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // :1103 P = PALAM:3 + UP:3

      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼唔啊啊…肛门好有感觉啊…啊嗯啊啊啊啊！这个！这个真是不错啊！…啊啊${heart(1)}」`,
        ); // :1106
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呼啊啊…啊…啊…嗯…咕嗞咕嗞的！我的肛门变得乱七八糟了啊啊啊${heart(1)}」`,
          ); // :1108
        }
        await era.printAndWait(
          `${target_name}的肛门因为充分的润滑了，${player_name}的手指咕嗞咕嗞的轻易插了进去………`,
        ); // :1109
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :1110
        era.set(`cflag:${target}:303`, 7); // :1110
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…不行啊魔王大人…请稍微慢一点…啊？　啊…嗯咕…啊呜！」`,
        ); // :1113
        await era.printAndWait(
          `是因为润滑还不够吗？${target_name}发出了痛苦的呻吟声………`,
        ); // :1114
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :1115
        era.set(`cflag:${target}:303`, 6); // :1115
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊！我的屁股…嗯…啊嗯…发出奇怪的声音了…呜、真是太令人羞耻了！」`,
        ); // :1118
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊啊…啊…啊…嗯…好舒服…但是…啊啊…嗯好羞耻啊${heart(1)}」`,
          ); // :1120
        }
        await era.printAndWait(
          `${target_name}的肛门因为充分的润滑了，${player_name}的手指咕嗞咕嗞的轻易插了进去………`,
        ); // :1121
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :1122
        era.set(`cflag:${target}:303`, 5); // :1122
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < era0('palamlv:2') &&
        (era0(`cflag:${target}:303`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊、我的屁股…啊啊…能、再稍微再弄湿一点吗…嗯…啊嗯…！」`,
        ); // :1125
        await era.printAndWait(
          `是因为润滑还不够吗？${target_name}发出了痛苦的呻吟声………`,
        ); // :1126
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :1127
        era.set(`cflag:${target}:303`, 4); // :1127
      } else if (
        P >= era0('palamlv:2') &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:303`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊…啊…不、不行…再这样玩弄的话…啊…嗯咕！」`); // :1130
        await era.printAndWait(
          `${target_name}被充分开发的肛门很轻松的就用手指插了进去，因为${player_name}的爱抚、产生了相当的快感。`,
        ); // :1131
        await era.printAndWait(
          `「连这么肮脏的地方都要玩弄吗…啊…啊啊…啊啊啊啊啊啊！」`,
        ); // :1132
        await era.printAndWait(
          `故意激烈的玩弄起来，${target_name}的脸色随着涌出的快感变红了………`,
        ); // :1133
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :1134
        era.set(`cflag:${target}:303`, 3); // :1134
      } else if (era0(`cflag:${target}:223`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「反正、做这种事情也只会让人感到厌恶而言…啊啊、停、停下来………」`,
          ); // :1138
          await era.printAndWait(
            `${target_name}因为肛门被爱抚邹着眉头、似乎在忍耐着那个奇妙的感觉………`,
          ); // :1139
        } else {
          await era.printAndWait(
            `「变态！真是脏死了太肮脏了！不要再玩弄那样的地方了！」`,
          ); // :1141
          await era.printAndWait(
            `${target_name}因为肛门被爱抚痛苦的发出悲鸣，从${player_name}的手中逃走了………`,
          ); // :1142
        }
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :1144
        era.set(`cflag:${target}:303`, 2); // :1144
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (era0(`cflag:${target}:304`) == 0) {
      await era.printAndWait(`「咕…嗯…啊、看到我自慰而感到兴奋了吗…？」`); // :1156
      if (
        era0(`talent:${target}:76`) == 1 ||
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊啊…没关系…变成这样的小穴…全部都看见吧………${heart(1)}」`,
        ); // :1158
        await era.printAndWait(
          `${target_name}一边在你面前自慰着，一边吐出热烈的呻吟声………`,
        ); // :1159
      } else {
        await era.printAndWait(`「咔、真是最差劲了！咕…呜呜…咕～………！」`); // :1161
        await era.printAndWait(
          `${target_name}一边露出快要哭出来的表情一边被迫自慰着………`,
        ); // :1162
      }
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :1164
      era.set(`cflag:${target}:304`, 1); // :1164
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:304`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呵呵…我的处女膜很好的再生了啊、魔王大人~${heart(1)}」`,
        ); // :1170
        await era.printAndWait(
          `${target_name}扒开自己的小穴，叽咕叽咕的自慰着。`,
        ); // :1171
        await era.printAndWait(
          `「随魔王大人高兴，不管多少次处女也可以被魔王大人夺走哦…呵呵呵${heart(1)}」`,
        ); // :1172
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :1173
        era.set(`cflag:${target}:304`, 9); // :1173
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (era0(`cflag:${target}:304`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊嗯…自慰最棒了${heart(1)} 啊啊手完全停不下来${heart(1)}」`,
          ); // :1178
          await era.printAndWait(
            `${target_name}的手疯狂的自慰着，像潮吹一样爱液到处飞溅。`,
          ); // :1179
          await era.printAndWait(
            `「啊嗯…在魔王大人的调教下，我已经变成这么淫乱的女人了啊…啊啊啊${heart(1)}」`,
          ); // :1180
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊哈啊…我每天晚上都会这样自慰${heart(1)} 啊啊…啊嗯…这…太棒了${heart(1)}」`,
          ); // :1182
          await era.printAndWait(
            `${target_name}轻车熟路的用各种手势自慰着、一边说着猥琐的话，一边呻吟一边疯狂自慰。`,
          ); // :1183
          await era.printAndWait(
            `「啊啊…啊嗯…啊啊…哈啊哈啊…魔王大人魔王大人啊…我的小穴好想被侵犯，好想要大肉棒插进来，想要的不得了！${heart(1)}」`,
          ); // :1184
        } else {
          await era.printAndWait(
            `「哈唔…自慰最高…啊啊${heart(1)} …整个人都要飞起来了…呵啊…哈啊啊啊啊${heart(1)}」`,
          ); // :1186
          await era.printAndWait(
            `${target_name}的情欲已经完全显露在眼神中，被${player_name}看着、完全沉浸在了自慰的快感中。`,
          ); // :1187
          await era.printAndWait(
            `「咿啊…咿嗯嗯…唔啊啊…啊啊～${heart(1)} 咿啊哈啊…自慰实在太棒了…啊啊…唔啊啊…啊呼啊…${heart(1)}」`,
          ); // :1188
          await era.printAndWait(
            `谁能想到那个自慰狂的姿态会是从前那个心高气傲的亲卫队队长呢………`,
          ); // :1189
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :1191
        era.set(`cflag:${target}:304`, 8); // :1191
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (era0(`cflag:${target}:304`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯…啊啊嗯…啊呼…啊啊…比起自慰更想用魔王大人的手来…嗯呼呼…嗯…啊啊嗯${heart(1)}」`,
          ); // :1196
          await era.printAndWait(
            `${target_name}虽然嘴上抱怨着，但是自慰的手并没有停下来。`,
          ); // :1197
          await era.printAndWait(
            `「啊啊嗯…嗯、哈啊嗯…啊啊～…啊…不、已经要不行了…啊啊嗯${heart(1)}」`,
          ); // :1198
        } else {
          await era.printAndWait(
            `「哈啊…手淫好舒服啊…嗯…啊嗯…啊、呜咿、魔王大人快看我♪」`,
          ); // :1200
          await era.printAndWait(
            `${target_name}像是炫耀一样分开双腿，手在蜜裂处抽动着。已经湿透了的蜜裂发出淫靡猥琐的声音。`,
          ); // :1201
          await era.printAndWait(
            `「啊啊嗯…嗯…啊…啊呼…在我的手淫下兴奋起来了吧…需要的时候可以随时使用我的身体哦${heart(1)} 嗯啊啊哈哼啊${heart(1)}」`,
          ); // :1202
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :1204
        era.set(`cflag:${target}:304`, 7); // :1204
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:304`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊哈…我知道了、不过好不容易再生的、处女膜要是弄破了怎么办啊…嗯…啊啊嗯${heart(1)}」`,
        ); // :1207
        await era.printAndWait(`${target_name}一边疑虑着摆弄起了自己的私处。`); // :1208
        await era.printAndWait(
          `「啊…嗯…嗯呼…啊啊…这、也真是让人着急难受…嗯啊嗯！」`,
        ); // :1209
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :1210
        era.set(`cflag:${target}:304`, 6); // :1210
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (era0(`cflag:${target}:304`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊嗯${heart(1)} 啊…啊啊嗯${heart(1)} 自慰真是太舒服了…啊嗯啊啊${heart(1)}」`,
          ); // :1215
          await era.printAndWait(
            `${target_name}分开双腿一边向${player_name}展示着，一边激烈的自慰。`,
          ); // :1216
          await era.printAndWait(
            `「请、请看着…我想着魔王大人自慰已经快要高潮了…啊呜啊哈${heart(1)}」`,
          ); // :1217
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「是、魔王大人命令的话不管多少次我都能自慰给您看${heart(1)}」`,
          ); // :1219
          await era.printAndWait(
            `${target_name}微微一笑张开双腿，手在蜜裂处玩弄着、自慰的快感充斥全身。`,
          ); // :1220
          await era.printAndWait(
            `「哈啊…啊嗯啊啊…怎么样？感觉兴奋了吗？　啊嗯…啊真是抱歉嗯嗯${heart(1)}」`,
          ); // :1221
        } else {
          await era.printAndWait(
            `「我、我居然这么的喜欢上了手淫…嗯…呼…啊嗯${heart(1)}」`,
          ); // :1223
          await era.printAndWait(
            `${target_name}一边发出魅惑的声音。手激烈的动了起来。`,
          ); // :1224
          await era.printAndWait(
            `「啊啊…更多…想获得更多的快感…啊啊…啊嗯…啊哈嗯${heart(1)}」`,
          ); // :1225
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :1227
        era.set(`cflag:${target}:304`, 5); // :1227
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (era0(`cflag:${target}:304`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「虽、虽然很羞耻…但如果魔王大人想看的话…啊嗯…啊啊…啊哈…${heart(1)}」`,
          ); // :1232
          await era.printAndWait(
            `${target_name}两腿分的大开激烈的自慰着。淫靡的气味飘了过来，勾起了${player_name}的欲望。`,
          ); // :1233
          await era.printAndWait(
            `「嗯…呼呼…魔王大人也差不多想要了吧…啊嗯…嗯…啊啊嗯${heart(1)}」`,
          ); // :1234
        } else {
          await era.printAndWait(
            `「相比我自己手淫…还是魔王大人的拥抱更好…但如果是命令…还是会去做了………♪」`,
          ); // :1236
          await era.printAndWait(
            `${target_name}红着脸继续自慰着。噗叽噗叽的淫猥声音回响着。`,
          ); // :1237
          await era.printAndWait(
            `「呼啊呼啊…啊啊嗯…我会一直做下去的${heart(1)}」`,
          ); // :1238
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :1240
        era.set(`cflag:${target}:304`, 4); // :1240
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (era0(`cflag:${target}:304`) <= 2 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯…嗯…我、让我做这种事…居然也会感觉到舒服什么的…啊啊！」`,
          ); // :1245
          await era.printAndWait(
            `${target_name}的眼中因为快乐湿润了、手指的动作也越来越激烈。`,
          ); // :1246
          await era.printAndWait(
            `「哈啊哈啊…啊嗯…不、不要看…不要看！啊…啊嗯…啊啊！」`,
          ); // :1247
        } else {
          await era.printAndWait(
            `「呼啊…啊…嗯…啊啊嗯…请、请原谅我吧…不能再做下去了…嗯…啊嗯！」`,
          ); // :1249
          await era.printAndWait(
            `${target_name}一边掉着眼泪一边自慰。手已经不能停下来了。`,
          ); // :1250
          await era.printAndWait(
            `「啊…为什么…这种快感无法停止…啊啊…呼…嗯嗯～！」`,
          ); // :1251
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :1253
        era.set(`cflag:${target}:304`, 3); // :1253
      } else if (era0(`cflag:${target}:304`) <= 1 || era0('flag:7') == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯…嗯…变、变态…你、你不要看啊…啊…咕呜！」`,
          ); // :1258
          await era.printAndWait(`${target_name}的手为难的动着………`); // :1259
        } else {
          await era.printAndWait(
            `「啊…为什么我非得做这样的事…不、不要看我！」`,
          ); // :1261
          await era.printAndWait(
            `${target_name}在${player_name}的命令下不得已自慰着………`,
          ); // :1262
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :1264
        era.set(`cflag:${target}:304`, 2); // :1264
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (era0(`cflag:${target}:306`) == 0) {
      if (
        era0(`talent:${target}:130`) == 1 &&
        era0(`palam:${target}:5`) > era0('palamlv:3') &&
        era0(`tequip:${target}:16`) == 0 &&
        era0(`tequip:${target}:15`) == 0
      ) {
        if (
          era0(`talent:${target}:76`) == 1 ||
          era0(`talent:${target}:85`) == 1
        ) {
          await era.printAndWait(`「啊…我的母乳…请…请喝吧…${heart(1)}」`); // :1280
          await era.printAndWait(
            `${target_name}的乳头被吮吸着，出神的抚摸着${player_name}的头………`,
          ); // :1281
        } else {
          await era.printAndWait(
            `「呜啊啊…这这是！是母乳…好难受…呜…再这样揉动就要流出来了！」`,
          ); // :1284
        }
      } else {
        if (
          era0(`talent:${target}:76`) == 1 ||
          era0(`talent:${target}:85`) == 1
        ) {
          await era.printAndWait(
            `「啊…怎么样我引以为傲的巨乳…嗯…啊哈嗯${heart(1)}」`,
          ); // :1289
          await era.printAndWait(`「再更多的揉动也不要紧哦…${heart(1)}」`); // :1290
        } else if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「啊呜…这讨厌的感觉是什么？　你就是用这样的手段让其他人沦陷了吗…可恶！」`,
          ); // :1293
          await era.printAndWait(
            `${target_name}吐出炙热的气息，就这样被${player_name}改变着………`,
          ); // :1294
        } else {
          await era.printAndWait(
            `「呀…好、好痛啊…！捏的太用力的…咕…停、快停下来！啊啊！」`,
          ); // :1297
          await era.printAndWait(
            `${player_name}很用力的揉动着${target_name}的巨乳，让她痛苦不已………`,
          ); // :1298
        }
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :1301
      era.set(`cflag:${target}:306`, 1); // :1301
      return 0;
    } else {
      if (
        era0(`talent:${target}:130`) == 1 &&
        era0(`palam:${target}:5`) > era0('palamlv:3') &&
        era0(`tequip:${target}:16`) == 0 &&
        era0(`tequip:${target}:15`) == 0
      ) {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (era0(`cflag:${target}:306`) <= 4 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「我的母乳全部喝下去吧！请喝下去哦${heart(1)}」`,
          ); // :1309
          await era.printAndWait(
            `${target_name}的表情因为母乳被吮吸而陶醉在愉悦中了………`,
          ); // :1310
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1311
          era.set(`cflag:${target}:306`, 5); // :1311
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:306`) <= 3 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(`「啊…我的母乳…请…再多喝一点吧…${heart(1)}」`); // :1314
          await era.printAndWait(
            `${target_name}的乳头被吮吸着，出神的抚摸着${player_name}的头………`,
          ); // :1315
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1316
          era.set(`cflag:${target}:306`, 4); // :1316
        } else if (
          era0(`abl:${target}:1`) >= 3 &&
          (era0(`cflag:${target}:306`) <= 2 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「啊…啊啊…母乳被吸着…感到了…呼、呜、啊啊啊………」`,
          ); // :1319
          await era.printAndWait(`${target_name}因为母乳被吮吸的快感呆滞了………`); // :1320
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1321
          era.set(`cflag:${target}:306`, 3); // :1321
        } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
          await era.printAndWait(
            `「呜啊啊…这这是！是母乳…好难受…呜…再这样刺激就要流出来了！」`,
          ); // :1324
          await era.printAndWait(
            `${player_name}把乳头吸入口中，${target_name}的母乳流了出来………`,
          ); // :1325
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1326
          era.set(`cflag:${target}:306`, 2); // :1326
        }
      } else {
        if (
          era0(`talent:${target}:76`) == 1 &&
          (era0(`cflag:${target}:306`) <= 4 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「啊啊嗯！更加激烈的…揉我的胸部吧${heart(1)} 啊啊啊！这样晃动着${heart(1)}」`,
          ); // :1331
          await era.printAndWait(
            `${target_name}的巨乳被抓住肆意的玩弄着。${target_name}只剩下了快感`,
          ); // :1332
          await era.printAndWait(
            `「呼唔啊啊啊啊…我…巨乳真是太好了…哼这么舒服…啊、啊哈啊啊啊${heart(1)}」`,
          ); // :1333
          await era.printAndWait(
            `${target_name}的乳头只是被轻轻一提整个人都痉挛了………`,
          ); // :1334
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1335
          era.set(`cflag:${target}:306`, 5); // :1335
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:306`) <= 3 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `「是…我的胸部也是魔王大人的东西…请随您喜好玩弄吧${heart(1)}」`,
          ); // :1338
          await era.printAndWait(
            `${target_name}微微一笑把身体倾了过去让${player_name}随意玩弄那对巨乳。`,
          ); // :1339
          await era.printAndWait(
            `「啊啊…啊嗯…呼啊啊…好舒服…这…这真是太…啊嗯…嗯嗯呼啊啊嗯${heart(1)}」`,
          ); // :1340
          await era.printAndWait(
            `${target_name}表情荡漾的在${player_name}的双臂中………`,
          ); // :1341
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1342
          era.set(`cflag:${target}:306`, 4); // :1342
        } else if (
          era0(`abl:${target}:1`) >= 3 &&
          (era0(`cflag:${target}:306`) <= 2 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(
            `${player_name}狠狠的揉捏着${target_name}的巨乳、按理说平常只会引起痛苦，但对现在的${target_name}而言只能感受到无上的快感。`,
          ); // :1345
          await era.printAndWait(
            `「哈…哈…我的胸部会这么有感觉…嗯…呜呜啊…呜、不能拉长啊…咿啊～！」`,
          ); // :1346
          await era.printAndWait(
            `乳头被提拉伸长、${target_name}发出沉重的呻吟………`,
          ); // :1347
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1348
          era.set(`cflag:${target}:306`, 3); // :1348
        } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
          if (era0(`abl:${master}:12`) > 5) {
            await era.printAndWait(
              `「啊啊啊…！真是…真是讨厌的手…啊啊…呼啊…嗯…呜咿！」`,
            ); // :1353
            await era.printAndWait(
              `${target_name}大口的喘着炙热的气息，巨乳在${player_name}的手中改变着形状………`,
            ); // :1354
          } else {
            await era.printAndWait(
              `「呀…好、好痛啊…！捏的太用力的…咕…停、快停下来！啊啊！」`,
            ); // :1357
            await era.printAndWait(
              `${player_name}很用力的揉动着${target_name}的巨乳，让她痛苦不已………`,
            ); // :1358
          }
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1360
          era.set(`cflag:${target}:306`, 2); // :1360
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (era0(`cflag:${target}:307`) == 0 && era0('tflag:13')) {
      await era.printAndWait(''); // :1373-1374
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1374
      era.set(`cflag:${target}:307`, 1); // :1374
      return 0;
    } else if (era0(`cflag:${target}:307`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `${target_name}和${player_name}抱在一起，互相亲吻。`,
        ); // :1380
        await era.printAndWait(
          `「哈呜…嗯…嗯啾…啾…嗯…呼…咿唔…啊嗯、哈…嗯啾…${heart(1)}」`,
        ); // :1381
        await era.printAndWait(
          `舌头纠缠着互相交换着唾液、整整十分钟后才缓缓离开。`,
        ); // :1382
        await era.printAndWait(`「哈哈…呵呵、感觉还不够呢………」`); // :1383
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「是…我喜欢和魔王大人接吻哦♪　啾啾…嗯…啾呜…${heart(1)}」`,
        ); // :1386
        await era.printAndWait(
          `${target_name}抱着${player_name}的头亲吻着嘴唇、舌头互相纠缠着。`,
        ); // :1387
        await era.printAndWait(
          `「是…咕呜…啾…嗯…啾…呜嗯…嗯咕…嗯…啾～${heart(1)}」`,
        ); // :1388
        await era.printAndWait(
          `舌头互相纠缠到麻木、唾液也交换太多次喝光了、像是媚药一样流进${player_name}的胃中。`,
        ); // :1389
        await era.printAndWait(
          `「嗯…嗯唔…呼啊………我的嘴唇除了魔王大人以外谁也不能接受了…♪」`,
        ); // :1390
      } else {
        await era.printAndWait(`「嗯…居然………啊、竟然和你的嘴唇…呜呜」`); // :1393
        await era.printAndWait(`${target_name}哭着擦了很多次嘴角………`); // :1394
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1396
      era.set(`cflag:${target}:307`, 1); // :1396
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:307`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…嗯…接下来是…品尝唾液…${heart(1)} 啊嗯…啊～${heart(1)}」`,
        ); // :1402
        await era.printAndWait(
          `${target_name}主动张开嘴伸出不规矩的舌头期待的接着从${player_name}舌头顺着滴下来的唾液。`,
        ); // :1403
        await era.printAndWait(
          `「嗯咕…嗯唔嗯呵呵…啊…魔王大人的唾液真是美味呢，连头脑要不清醒了…嗯…啾啾${heart(1)}」`,
        ); // :1404
        await era.printAndWait(
          `${target_name}就那样咬住了${player_name}的舌头吮吸起来………`,
        ); // :1405
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :1406
        era.set(`cflag:${target}:307`, 5); // :1406
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:307`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「想要接吻吗、没有问题哦…我已经是魔王大人的东西了…」`,
        ); // :1409
        await era.printAndWait(
          `陶醉的笑着，捏着${target_name}的下巴，${player_name}夺去了她的唇。`,
        ); // :1410
        await era.printAndWait(
          `「嗯！咕…啾…啾…嗯呜…嗯呼${heart(1)} 呜…今天真是激烈啊…啊嗯${heart(1)}」`,
        ); // :1411
        await era.printAndWait(`然后整整五分钟都在品尝${target_name}的嘴唇………`); // :1412
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :1413
        era.set(`cflag:${target}:307`, 4); // :1413
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (era0(`cflag:${target}:307`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `${target_name}稍微显得顺从了一些，接吻也不怎么抵抗了。`,
        ); // :1416
        await era.printAndWait(
          `「嗯…啊呜…嗯嗯啾…啾…嗯…哈…已、已经足够了吧…？」`,
        ); // :1417
        await era.printAndWait(
          `${target_name}的眼睛湿润了，是因为屈辱的缘故吧………`,
        ); // :1418
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :1419
        era.set(`cflag:${target}:307`, 3); // :1419
      } else if (era0(`cflag:${target}:307`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「嗯！咕…不、不行…果然接吻还是…啊…嗯…唔唔唔～！」`,
        ); // :1422
        await era.printAndWait(
          `抓着${target_name}的下巴强行的接吻了。这种屈辱让${target_name}禁不住流下了眼泪………`,
        ); // :1423
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :1424
        era.set(`cflag:${target}:307`, 2); // :1424
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (era0(`cflag:${target}:308`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呵呵、我淫乱的小穴，想要看的话尽管看吧…♪」`); // :1438
        await era.printAndWait(
          `${target_name}不知羞耻的敞开双腿，炫耀一般的用舌头舔着嘴唇。`,
        ); // :1439
        await era.printAndWait(
          `随着${player_name}的视线，有了强烈的反应，爱液从小穴中满溢而出。`,
        ); // :1440
        await era.printAndWait(
          `「我淫乱的小穴…如果魔王大人喜欢的话，品尝一下也未尝不可哦${heart(1)}」`,
        ); // :1441
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「为了这种事特意把我变回处女…魔王大人还真是个浪漫主义者呢………」`,
          ); // :1443
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「好的、请。请看我那里面的…${heart(1)}」`); // :1446
        await era.printAndWait(
          `${target_name}高兴的笑着掰开外阴。爱液慢慢从小穴里流了出来。`,
        ); // :1447
        await era.printAndWait(`「想怎么使用玩弄…就随魔王大人喜欢了………」`); // :1448
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊、经由魔王大人的手修复的处女膜…看见了吗…？」`,
          ); // :1450
        }
      } else {
        await era.printAndWait(
          `「为、为什么我要做这样的事…真是…太屈辱了………！」`,
        ); // :1453
        await era.printAndWait(
          `${target_name}一边悔恨的咬着牙，一边慢慢张开大腿。`,
        ); // :1454
        await era.printAndWait(
          `「被使用摩擦过的阴唇变得肥大了？才，才没有这样的事情呢！好 好过分！」`,
        ); // :1455
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `${target_name}的处女膜被很好的再生了、这让金红桃感到很不舒服………`,
          ); // :1457
        }
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :1459
      era.set(`cflag:${target}:308`, 1); // :1459
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:308`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「怎么样？　我的淫乱小穴…♪」`); // :1465
        await era.printAndWait(
          `${target_name}不知羞耻的敞开双腿，炫耀一般的用舌头舔着嘴唇。`,
        ); // :1466
        await era.printAndWait(
          `随着${player_name}的视线，有了强烈的反应，爱液从小穴中满溢而出。`,
        ); // :1467
        await era.printAndWait(
          `「我淫乱的小穴…如果魔王大人喜欢的话，品尝一下也未尝不可哦${heart(1)}」`,
        ); // :1468
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「为了这种事特意把我变回处女…魔王大人还真是个浪漫主义者呢………」`,
          ); // :1470
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1471
        era.set(`cflag:${target}:306`, 5); // :1471
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:308`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「是、我的那里请看个一清二楚吧…反正我是魔王大人的东西…啊啊啊${heart(1)}」`,
        ); // :1474
        await era.printAndWait(
          `${target_name}开心的笑着掰开外阴。爱液慢慢从小穴里流了出来。`,
        ); // :1475
        await era.printAndWait(
          `「习惯了这种淫乱行为的我…随魔王大人怎么样都行了………」`,
        ); // :1476
        await era.printAndWait(
          `${target_name}神情恍惚的扒开小穴向${player_name}展示着………`,
        ); // :1477
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「还有我的处女…请魔王大人再次夺走吧………${heart(1)}」`,
          ); // :1479
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1480
        era.set(`cflag:${target}:306`, 4); // :1480
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (era0(`cflag:${target}:308`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…被您这样看着真是心情舒畅呢…啊啊我的脑袋好像变得奇怪了………？」`,
        ); // :1483
        await era.printAndWait(
          `${target_name}扒开小穴，对着${player_name}像是展示一样挺着身体，把腰部抬起来玩弄着自己的小穴。`,
        ); // :1484
        await era.printAndWait(
          `「啊啊…下面被全部看光了…我、我的小穴…是、是…淫乱不堪的小穴，请观赏！」`,
        ); // :1485
        await era.printAndWait(`${target_name}完全陶醉在了露出的快感中`); // :1486
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `${target_name}的处女膜被很好的再生了、这让金红桃感到很不舒服………`,
          ); // :1488
        }
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1489
        era.set(`cflag:${target}:306`, 3); // :1489
      } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「只要做一次以后都是一样的…谎言…啊啊、不、不要看我啊！」`,
        ); // :1492
        await era.printAndWait(
          `${target_name}用手扒开小穴，还不习惯的脸转向一旁，勉勉强强的对${player_name}看着。`,
        ); // :1493
        await era.printAndWait(
          `「已、已经、可以了吗？…咦、诶，照着说这些话就可以停下来…吗」`,
        ); // :1494
        await era.printAndWait(
          `${target_name}听着${player_name}在耳边说着猥琐下流的话语。`,
        ); // :1495
        await era.printAndWait(
          `「我、这是我的小穴…是、是个糟糕的小穴、总是想要肉棒的淫乱小穴，因为经常的自慰，所以变成了这个样子！」`,
        ); // :1496
        await era.printAndWait(
          `${target_name}因为太过于屈辱，终于无法忍耐流出的眼泪………`,
        ); // :1497
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `${target_name}的处女膜被很好的再生了、这让金红桃感到很不舒服………`,
          ); // :1499
        }
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1500
        era.set(`cflag:${target}:306`, 2); // :1500
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (era0(`cflag:${target}:309`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊哈嗯…在我的小穴里搅拌吧，弄得乱七八糟吧…哼嗯啊哈啊啊${heart(1)}」`,
        ); // :1514
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「请…进入到更深的地方…无需顾虑我…嗯啊嗯…啊啊${heart(1)}」`,
        ); // :1517
      } else if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(
          `「啊啊…手指进到里面啊…嗯啊…要高潮了！…啊啊…要变得奇怪了呀…啊啊！」`,
        ); // :1520
      } else {
        await era.printAndWait(`「啊咕！痛！说了痛啊！啊、早点拔出去！」`); // :1523
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :1525
      era.set(`cflag:${target}:309`, 1); // :1525
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:309`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…小穴已经非常想要了呢…啊啊唔嗯${heart(1)}」`,
        ); // :1531
        await era.printAndWait(
          `${target_name}在${player_name}手指的搅拌下，小穴不住的收缩着。`,
        ); // :1532
        await era.printAndWait(
          `「已、已经…我的小穴已经受不了了…想要魔王大人的肉棒…嗯啊嗯好难受………${heart(1)}」`,
        ); // :1533
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :1534
        era.set(`cflag:${target}:309`, 5); // :1534
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:309`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哼啊嗯呼啊嗯！我的小穴是魔王大人专用的东西，魔王大人可以随时使用…啊嗯哼啊啊${heart(1)}」`,
        ); // :1537
        await era.printAndWait(`${target_name}的阴道里黏黏糊糊、一缩一缩的。`); // :1538
        await era.printAndWait(`「啊啊…啊嗯…啊哈暗…请随心所欲吧…${heart(1)}」`); // :1539
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1540
        era.set(`cflag:${target}:309`, 4); // :1540
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:309`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯嗯！请、请再温柔一点…啊、轻一点…啊…啊啊～呜！」`,
        ); // :1543
        await era.printAndWait(`${target_name}因为阴道壁被扣动着而发出悲鸣。`); // :1544
        await era.printAndWait(`「呜、太过分了！…嗯啊嗯啊啊…咕好痛苦！」`); // :1545
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :1546
        era.set(`cflag:${target}:309`, 3); // :1546
      } else if (era0(`cflag:${target}:309`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「啊嗯…咕！这…这样的…你这家伙真的是太色情了…嗯唔…啊！」`,
          ); // :1551
          await era.printAndWait(
            `${target_name}的阴道壁被手指侵犯着，腰开始慢慢动了起来………`,
          ); // :1552
        } else {
          await era.printAndWait(`「停！很痛啊！快给我住手！」`); // :1554
          await era.printAndWait(
            `${target_name}因为被${player_name}玩弄着阴道而发出了悲鸣………`,
          ); // :1555
        }
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1557
        era.set(`cflag:${target}:309`, 2); // :1557
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (era0(`cflag:${target}:310`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊啊～…我的肛门感觉好荡漾啊…更多…更多的～♪」`,
        ); // :1571
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…好难为情啊、啊、请、请不要舔…嗯…啊啊嗯！」`,
        ); // :1574
      } else {
        await era.printAndWait(
          `「啊啊！为、为什么要舔那样的地方呢！讨、讨厌啊！」`,
        ); // :1577
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :1579
      era.set(`cflag:${target}:310`, 1); // :1579
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:310`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呜嗯啊呼好开心啊哈哈${heart(1)} 舔肛真是太棒了…啊啊啊…太舒服了…我…啊嗯${heart(1)}」`,
        ); // :1585
        await era.printAndWait(
          `${target_name}肛门被舔着，发出了快要融化般的声音。`,
        ); // :1586
        await era.printAndWait(
          `「啊嘿…舔肛什么的最棒了…啊啊…更…要更多…啊嗯啊哈…哈啊啊${heart(1)}」`,
        ); // :1587
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1588
        era.set(`cflag:${target}:310`, 5); // :1588
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:310`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊哈…我的屁股也是…魔王大人的东西了…啊啊…嗯唔…啊哈…啊啊啊！」`,
        ); // :1591
        await era.printAndWait(
          `${target_name}的肛门被舔着，声音渐渐的从高亢尖锐变得柔和下来，像融化了一般。`,
        ); // :1592
        await era.printAndWait(
          `「啊呜…里面全部…都请品尝吧${heart(1)} 啊嗯啊哈呜啊啊～呜${heart(1)}」`,
        ); // :1593
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1594
        era.set(`cflag:${target}:310`, 4); // :1594
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:310`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「那、那种像狗一样…舔我的屁股什么的…嗯…啊啊！」`,
        ); // :1597
        await era.printAndWait(
          `${target_name}被${player_name}压住肛门，狠狠的舔着。`,
        ); // :1598
        await era.printAndWait(
          `「啊啊！对、对不起请原谅我！嗯！啊啊！啊！啊呜呜呜呜～！」`,
        ); // :1599
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1600
        era.set(`cflag:${target}:310`, 3); // :1600
      } else if (era0(`cflag:${target}:310`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「住、住手不要再舔了…还…咿、还在做…不要继续了…啊啊～呜！啊呜…天啊！」`,
        ); // :1603
        await era.printAndWait(
          `${target_name}肛门的每一根经脉都被舔舐着，${target_name}痛苦的哀鸣着………`,
        ); // :1604
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1605
        era.set(`cflag:${target}:310`, 2); // :1605
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (era0(`cflag:${target}:311`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「还要…我的小穴还想要更多的！啊呜啊啊～${heart(1)}」`,
        ); // :1619
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        await era.printAndWait(
          `「啊啊…这样的振动、好难受…啊…啊呼…嗯呜～唔${heart(1)}」`,
        ); // :1622
      } else {
        await era.printAndWait(
          `「什、什么啊、我居然因此有感觉了…啊！咕、呜咿！」`,
        ); // :1625
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1627
      era.set(`cflag:${target}:311`, 1); // :1627
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:311`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「还要…我的小穴还想要更多的！啊呜啊啊～${heart(1)}」`,
        ); // :1633
        await era.printAndWait(
          `${target_name}主动的把振动宝石放在自己身上。每当振动宝石碰到阴蒂的时候都会提起一阵高声的娇叫。`,
        ); // :1634
        await era.printAndWait(
          `「这种振动不行啊…啊啊啊${heart(1)} 这样的玩具我还要${heart(1)}」`,
        ); // :1635
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1636
        era.set(`cflag:${target}:311`, 5); // :1636
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:311`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…这种振动好有感觉…啊…啊呼…嗯～呜${heart(1)}」`,
        ); // :1639
        await era.printAndWait(
          `振动宝石集中压在${target_name}的阴蒂上，发出了及其淫荡的呻吟。`,
        ); // :1640
        await era.printAndWait(
          `「哈、哈…啊啊…这个感觉是什么啊…忍不住了…要去了啊啊…${heart(1)}」`,
        ); // :1641
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1642
        era.set(`cflag:${target}:311`, 4); // :1642
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:311`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「已经…喜欢上这种感觉了…啊啊…啊呜！呜呜…咕…啊咿呀呀！」`,
        ); // :1645
        await era.printAndWait(
          `${target_name}很老实的接受着振动宝石的“爱抚”，发出阵阵淫叫。`,
        ); // :1646
        await era.printAndWait(
          `「啊啊…我这么…有…有感觉什…什么的…啊啊呜…咕～咿咿！」`,
        ); // :1647
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1648
        era.set(`cflag:${target}:311`, 3); // :1648
      } else if (era0(`cflag:${target}:311`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「哈哈…这没什么大不了的嘛…真是…啊呼…只是稍微有点难受而已…啊咕呜呜！」`,
        ); // :1651
        await era.printAndWait(
          `虽然说着这样的话，但是${target_name}的反应非常敏感吗………`,
        ); // :1652
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1653
        era.set(`cflag:${target}:311`, 2); // :1653
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    if (era0(`cflag:${target}:312`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「难得再生的处女膜…嘛算了，蠕虫也算是合口味啊…咕咿～呜！」`,
          ); // :1670
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「………魔王大人想这么做的话、我是没有拒绝的权利的…嗯呜咕呜呜！」`,
          ); // :1673
        } else {
          await era.printAndWait(
            `「破瓜的痛楚居然会以这样的形式再次感受到…啊啊啊这样的蠕虫啊！」`,
          ); // :1676
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「唔呼呼…用蠕虫玩还是第一次呢…会是什么感觉呢？…啊啊啊…嗯呜…哈嗯呜！」`,
          ); // :1682
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊嗯呜…蠕虫什么的也没关系、只要魔王大人喜欢的话…嗯咕呜！」`,
          ); // :1685
        } else {
          await era.printAndWait(
            `「咕呜！蠕虫在…我的那里…呜咿！不要…太恶心了！快点把这个拿走诶诶诶诶！」`,
          ); // :1688
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1691
      era.set(`cflag:${target}:312`, 1); // :1691
      return 0;
    } else {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「难得再生的处女膜…嘛算了，蠕虫也算是合口味啊…咕咿～呜！」`,
          ); // :1699
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「………魔王大人想这么做的话、我是没有拒绝的权利的…嗯呜咕呜呜！」`,
          ); // :1702
        } else {
          await era.printAndWait(
            `「破瓜的痛楚居然会以这样的形式再次感受到…啊啊啊这样的蠕虫啊！」`,
          ); // :1705
        }
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:312`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哇啊${heart(1)} 又是蠕虫吗${heart(1)} 小穴要被搞得乱七八糟了${heart(1)}」`,
        ); // :1709
        await era.printAndWait(
          `蠕虫像阴茎一样深入到${target_name}蜜壶的深处、${target_name}发出了无比高昂的呻吟声。`,
        ); // :1710
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「啊啊…下贱的蠕虫…在重要的地方！啊咿${heart(1)} 被这么搅动着${heart(1)} 啊啊再这样下去要疯了${heart(1)}」`,
          ); // :1712
        } else {
          await era.printAndWait(
            `「啊啊呜…啊…蠕虫在…在小穴里面动了${heart(1)} 啊咕呼…啊嗯啊啊啊${heart(1)}」`,
          ); // :1714
        }
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1716
        era.set(`cflag:${target}:312`, 5); // :1716
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:312`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…我的那里变得…嗯…请不要责备我…啊啊啊啊呜咿咦咦咿呀${heart(1)}」`,
        ); // :1719
        await era.printAndWait(
          `蠕虫插到了${target_name}蜜壶的最里面为止。然后蠕虫像是发疯了一样在蜜壶里动着。`,
        ); // :1720
        if (era0(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯啊嗯…啊啊呜我、我已经要去了…啊、啊啊${heart(1)} 啊啊～${heart(1)}」`,
          ); // :1722
        } else {
          await era.printAndWait(
            `「咕、这样下去…呜…咕呜、坏掉了…我的小穴要坏掉了！」`,
          ); // :1724
        }
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1726
        era.set(`cflag:${target}:312`, 4); // :1726
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:312`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊…我、我居然被这种卑劣的蠕虫…咕呜、咿！这种感觉是什么…啊啊！咕咿咦咦呜！」`,
        ); // :1729
        await era.printAndWait(
          `蠕虫轻易的进入了${target_name}被开发完全的小穴。然后蠕虫在里面快乐的动了起来。`,
        ); // :1730
        await era.printAndWait(
          `「啊啊啊！不、不要…要、要去了…咕…呜咿咿咿咿咿！」`,
        ); // :1731
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1732
        era.set(`cflag:${target}:312`, 3); // :1732
      } else if (era0(`cflag:${target}:312`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「又、又是蠕虫…讨、讨厌…小穴里满满的感觉奇怪…啊…啊啊～呜！」`,
        ); // :1735
        await era.printAndWait(
          `蠕虫被硬生生的塞进了${target_name}蜜壶的最深处………`,
        ); // :1736
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1737
        era.set(`cflag:${target}:312`, 2); // :1737
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:372`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊啊嗯…其实一直放在里面也可以嘛…${heart(1)}」`); // :1745
      await era.printAndWait(
        `突然从${target_name}的蜜裂中抽出蠕虫，发出了稀咕稀咕的声音………`,
      ); // :1746
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1747
      era.set(`cflag:${target}:372`, 3); // :1747
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:372`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「结束了…哈…哈…啊啊…${heart(1)}」`); // :1750
      await era.printAndWait(
        `突然从${target_name}的蜜裂中抽出蠕虫，发出了稀咕稀咕的声音………`,
      ); // :1751
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1752
      era.set(`cflag:${target}:372`, 2); // :1752
    } else if (era0(`cflag:${target}:372`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「啊～…啊唔…啊～………」`); // :1755
      await era.printAndWait(
        `突然从${target_name}的蜜裂中抽出蠕虫，发出了稀咕稀咕的声音………`,
      ); // :1756
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1757
      era.set(`cflag:${target}:372`, 1); // :1757
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (era0(`cflag:${target}:313`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈、哈…啊呜…好激烈的振动啊…我要上瘾了${heart(1)}」`,
        ); // :1770
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯呜…好激烈的振动…啊…啊呜…我要变成魔王大人的玩具了${heart(1)}」`,
        ); // :1773
      } else {
        await era.printAndWait(`「什么啊、这个像玩具一样的手杖…呜咿咿！？」`); // :1776
        await era.printAndWait(`${target_name}因为意想不到的刺激发出了悲鸣………`); // :1777
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1779
      era.set(`cflag:${target}:313`, 1); // :1779
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:313`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊魔王大人…快把那个振动杖给我想要舒服起来${heart(1)}」`,
        ); // :1785
        await era.printAndWait(
          `${target_name}好像迷上了振动杖的味道了、仅仅看到振动杖眼睛就湿润了起来。`,
        ); // :1786
        await era.printAndWait(
          `「呼啊啊啊${heart(1)} …哼振动起来了…在我的小穴激烈的振动起来了呜啊啊呜啊哈啊啊啊啊${heart(1)}」`,
        ); // :1787
        await era.printAndWait(
          `猛烈的把振动杖紧紧贴在阴部，${target_name}的口水都流了下来。${player_name}在一旁看着那个丢人的姿态………`,
        ); // :1788
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1789
        era.set(`cflag:${target}:313`, 5); // :1789
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:313`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「请…请用那个手杖让我舒服起来…♪」`); // :1792
        await era.printAndWait(
          `${target_name}坦率的分开双腿，被振动杖刺激着发出阵阵呻吟。`,
        ); // :1793
        await era.printAndWait(
          `「啊啊…啊～呜！太舒服了${heart(1)} 嗯嗯啊啊啊…还要更多…狠狠的玩弄我${heart(1)}」`,
        ); // :1794
        await era.printAndWait(
          `情绪高涨，${target_name}像是要获得更多快乐一样主动的扭动着腰………`,
        ); // :1795
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1796
        era.set(`cflag:${target}:313`, 4); // :1796
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:313`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「请用那个玩具随意的玩弄我…啊啊呜…嗯…啊唉！啊…咿啊啊！」`,
        ); // :1799
        await era.printAndWait(
          `${player_name}慢慢的用振动杖在${target_name}的股间刺激着。很快${target_name}无法忍受这种快感发出了呻吟。`,
        ); // :1800
        await era.printAndWait(
          `「啊啊…咕…嗯…哈啊嗯！我、我要去了…啊啊啊啊啊！哈、咕呜！」`,
        ); // :1801
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1802
        era.set(`cflag:${target}:313`, 3); // :1802
      } else if (era0(`cflag:${target}:313`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「呼…咕…这、这算什么啊…根本一点也不舒服…嗯…啊嗯…一点也不…呜！」`,
        ); // :1805
        await era.printAndWait(
          `${target_name}在振动杖的持续刺激下做出可爱的反应………`,
        ); // :1806
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1807
        era.set(`cflag:${target}:313`, 2); // :1807
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    if (era0(`cflag:${target}:314`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊…肛门虫进入什么的…还是第一次这样${heart(1)}」`,
        ); // :1822
        await era.printAndWait(
          `${target_name}第一次感受这样的快感身体不住的颤抖着………`,
        ); // :1823
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「是…我的屁股！请把这个蠕虫放进去！…啊啊啊啊！」`,
        ); // :1826
        await era.printAndWait(
          `${target_name}一边露出陶醉的表情，一边老老实实地把屁股献给给蠕虫………`,
        ); // :1827
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「嗯咕！？怎么这样、这样…我的屁股里…居然被这种肮脏的蠕虫…被、被侵犯着…呜、咿呀呜呀呀呀呀！」`,
          ); // :1832
          await era.printAndWait(
            `${target_name}被开发的肛门轻易的把蠕虫整个吞了进去………`,
          ); // :1833
        } else {
          await era.printAndWait(
            `「啊啊啊！屁股！？虫子深入到屁股里面了啊…要发疯了！停、快停下来！」`,
          ); // :1835
          await era.printAndWait(
            `${target_name}还未被开发的肛门被强硬的插进了蠕虫，发出了悲鸣………`,
          ); // :1836
        }
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1839
      era.set(`cflag:${target}:314`, 1); // :1839
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:314`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼哇啊啊啊啊…我可爱的肛门虫酱…啊嗯…在里面随意折腾吧…啊啊呼嗯${heart(1)}」`,
        ); // :1845
        await era.printAndWait(
          `${target_name}的肛门时松时紧的夹着肛门虫像是在品尝蠕虫一样。`,
        ); // :1846
        await era.printAndWait(
          `「啊啊嗯…我的肛门、肛门…变成蠕虫酱的巢穴了呢${heart(1)}」`,
        ); // :1847
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1848
        era.set(`cflag:${target}:314`, 6); // :1848
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:314`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊啊被蠕虫侵犯好难受啊…${heart(1)}」`); // :1851
        await era.printAndWait(
          `${target_name}的肛门因为蠕虫动来动去而缩了一下………`,
        ); // :1852
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1853
        era.set(`cflag:${target}:314`, 6); // :1853
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:314`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊…蠕虫进到我的屁穴里面来了…是感觉到周围有淫乱的屁穴啊…${heart(1)}」`,
        ); // :1856
        await era.printAndWait(
          `${target_name}一边流着口水一边感受着被肛门虫蹂躏的快感。`,
        ); // :1857
        await era.printAndWait(`「咕呜…啊啊…这、这…要受不了了…呜${heart(1)}」`); // :1858
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1859
        era.set(`cflag:${target}:314`, 5); // :1859
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:314`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…蠕虫进来了…魔王大人的蠕虫啊…啊啊啊啊啊${heart(1)}」`,
        ); // :1862
        await era.printAndWait(
          `${target_name}一边露出陶醉的表情，一边老老实实地把屁股献给给蠕虫………`,
        ); // :1863
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1864
        era.set(`cflag:${target}:314`, 4); // :1864
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:314`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…屁穴被蠕虫侵犯什么的…为什么我…我会遇到这种事情…啊…啊咕…呼啊嗯」`,
        ); // :1867
        await era.printAndWait(
          `蠕虫轻易的进入${target_name}的肛门、快感源源不断的产生………`,
        ); // :1868
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1869
        era.set(`cflag:${target}:314`, 3); // :1869
      } else if (era0(`cflag:${target}:314`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「又、又来了！蠕虫很恶心啊！」`); // :1872
        await era.printAndWait(
          `${target_name}还未被开发的肛门被强硬的插进了蠕虫，发出了悲鸣………`,
        ); // :1873
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1874
        era.set(`cflag:${target}:314`, 2); // :1874
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:374`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「咕哈…接下来、是我的肛门，想要肉棒…啊${heart(1)}」`,
      ); // :1882
      await era.printAndWait(
        `慢慢的把蠕虫从${target_name}的肛门里拔出来、黏黏糊糊的肠液滴落下来………`,
      ); // :1883
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1884
      era.set(`cflag:${target}:374`, 4); // :1884
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:374`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「哈、哈…明明屁穴还想要更多………♪」`); // :1887
      await era.printAndWait(
        `慢慢的把蠕虫从${target_name}的肛门里拔出来、黏黏糊糊的肠液滴落下来………`,
      ); // :1888
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1889
      era.set(`cflag:${target}:374`, 3); // :1889
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (era0(`cflag:${target}:374`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊…屁穴…还…啊啊………」`); // :1892
      await era.printAndWait(
        `慢慢的把蠕虫从${target_name}的肛门里拔出来、黏黏糊糊的肠液滴落下来………`,
      ); // :1893
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1894
      era.set(`cflag:${target}:374`, 2); // :1894
    } else if (era0(`cflag:${target}:374`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「咕啊…咕啊～…呼啊～啊啊…要、要坏掉了………」`); // :1897
      await era.printAndWait(`慢慢的把蠕虫从${target_name}的肛门里拔出来………`); // :1898
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1899
      era.set(`cflag:${target}:374`, 1); // :1899
    }
    return 0;
  }

  if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`)) {
    if (era0(`cflag:${target}:315`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「要、要是把这个夹上的话…敏感的阴蒂一定会因为太舒服了发了疯吧？」`,
        ); // :1913
        await era.printAndWait(
          `「啊…啊啊…嗯…啊哈…啊啊啊啊啊啊啊啊${heart(1)}」`,
        ); // :1914
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊…嗯啊被这么色情的东西夹住的话…我…我会…呼啊…啊啊${heart(1)}」`,
        ); // :1917
      } else {
        await era.printAndWait(
          `「哈啊！嗯…这、就算这样…咕呜…我、我也不会认输的…呜…啊啊！」`,
        ); // :1920
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :1922
      era.set(`cflag:${target}:315`, 1); // :1922
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:315`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊咿${heart(1)} 阴蒂…啊啊咿咿呀咿咿啊哇啊${heart(1)}」`,
        ); // :1928
        await era.printAndWait(
          `紧紧的夹住了阴蒂，${target_name}感受着疼痛与快感的双重刺激。`,
        ); // :1929
        await era.printAndWait(
          `「啊啊呜咿咿！要、马上要去了…啊啊呜啊啊啊啊啊～${heart(1)}」`,
        ); // :1930
        // CFLAG:315  = 5（变量语义：CFLAG 族，315） // :1931
        era.set(`cflag:${target}:315`, 5); // :1931
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:315`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯啊…阴蒂感觉好舒服…啊啊嗯啊啊啊${heart(1)}」`,
        ); // :1934
        await era.printAndWait(
          `紧紧的夹住了阴蒂，${target_name}感受着疼痛与快感的双重刺激。`,
        ); // :1935
        await era.printAndWait(`「啊啊嗯…好、好舒服……啊啊嗯…嗯…哈咕！」`); // :1936
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :1937
        era.set(`cflag:${target}:315`, 4); // :1937
      } else if (
        era0(`abl:${target}:0`) >= 3 &&
        (era0(`cflag:${target}:315`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊…我、我…居然只是这样就有感觉了…啊…啊呜…咿、咿呀………！」`,
        ); // :1940
        await era.printAndWait(`${target_name}被阴蒂夹毫不留情地欺负着…………`); // :1941
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :1942
        era.set(`cflag:${target}:315`, 3); // :1942
      } else if (era0(`cflag:${target}:315`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊咕呜…太、太紧了…求你取…取掉、好难受…刺激太强了…呜！求你关掉…啊啊啊！！」`,
        ); // :1945
        await era.printAndWait(`强烈的刺激让${target_name}的膝盖不住的抖动………`); // :1946
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :1947
        era.set(`cflag:${target}:315`, 2); // :1947
      }
      return 0;
    }
  } else if (era_flag.selectcom == 14 && era0(`tequip:${target}:14`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:375`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊啊嗯…其实一直夹着也不错呢${heart(1)}」`); // :1955
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :1956
      era.set(`cflag:${target}:375`, 3); // :1956
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:375`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊…啊啊啊…已、已经可以取掉了吗…？」`); // :1959
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :1960
      era.set(`cflag:${target}:375`, 2); // :1960
    } else if (era0(`cflag:${target}:375`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「哈啊呜嗯啊啊…呜咕呜咕…都已经变肿了………」`); // :1963
      await era.printAndWait(`${target_name}`); // :1964
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :1965
      era.set(`cflag:${target}:375`, 1); // :1965
    }
    return 0;
  }

  if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`)) {
    if (era0(`cflag:${target}:316`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「咿呀啊！这、这么…好厉害…的感觉…啊啊啊…啊啊嗯啊啊${heart(1)}」`,
        ); // :1979
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「唔呼…呼哇啊啊啊啊…我的乳头…这个玩具…唔唔啊啊！啊唔啊啊啊${heart(1)}」`,
        ); // :1982
      } else {
        await era.printAndWait(
          `「什么咿呀啊！这种东西…在我美丽的胸上…唔唔啊啊啊啊～！」`,
        ); // :1985
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :1987
      era.set(`cflag:${target}:316`, 1); // :1987
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:316`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊咿${heart(1)} 啊啊${heart(1)} 一直这样就好了…唔嗯…乳头…快感涌上来了…啊啊唔${heart(1)}」`,
        ); // :1993
        await era.printAndWait(
          `${target_name}完全勃起的乳头被夹子夹着、持续不断的受着刺激………`,
        ); // :1994
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :1995
        era.set(`cflag:${target}:316`, 4); // :1995
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:316`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「居然对这种玩具这么有感觉…对不起、魔王大人啊啊…啊啊唔唔啊…我的身体变成了这样………唔！」`,
        ); // :1998
        await era.printAndWait(
          `${target_name}完全勃起的乳头被夹子夹着、持续不断的受着刺激………`,
        ); // :1999
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :2000
        era.set(`cflag:${target}:316`, 3); // :2000
      } else if (era0(`cflag:${target}:316`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「咕唔…太、太过分了啦…太过分了…啊嗯唔唔！…快、快感什么的…完全没有感觉到………！」`,
        ); // :2003
        await era.printAndWait(
          `${target_name}完全勃起的乳头被夹子夹着、持续不断的受着刺激………`,
        ); // :2004
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :2005
        era.set(`cflag:${target}:316`, 2); // :2005
      }
      return 0;
    }
  } else if (era_flag.selectcom == 15 && era0(`tequip:${target}:15`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:376`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「呼、呼…已经要取下来了…？」`); // :2013
      await era.printAndWait(`${target_name}的乳头通红好像肿胀的要破开一样………`); // :2014
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :2015
      era.set(`cflag:${target}:376`, 3); // :2015
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:376`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「咕呜…啊啊…只有魔王大人的嘴能治愈我的乳头哦………」`,
      ); // :2018
      await era.printAndWait(`${target_name}的乳头通红好像肿胀的要破开一样………`); // :2019
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :2020
      era.set(`cflag:${target}:376`, 2); // :2020
    } else if (era0(`cflag:${target}:376`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「呼～呼～………这样的…手段太令人厌恶了………」`); // :2023
      await era.printAndWait(`${target_name}的乳头通红好像肿胀的要破开一样………`); // :2024
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :2025
      era.set(`cflag:${target}:376`, 1); // :2025
    }
    return 0;
  }

  if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`)) {
    if (era0(`cflag:${target}:317`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊好厉害啊…原来母乳榨取是这么…这么有感觉的事吗呜咿咿咿${heart(1)}」`,
        ); // :2039
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「哈咿…把我的母乳卖了…能贴补一些钱把………啊啊被挤出来了啊啊${heart(1)}」`,
        ); // :2042
      } else {
        await era.printAndWait(
          `「什、什么…母乳…是母乳…被挤出来了…啊啊…唔咿咿咿咿咿咿！」`,
        ); // :2045
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317） // :2047
      era.set(`cflag:${target}:317`, 1); // :2047
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:317`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼哇…啊啊…被挤得好舒服啊…这种感觉！想要一直戴着这个东西…${heart(1)}」`,
        ); // :2053
        await era.printAndWait(
          `${target_name}像是奶牛一样母乳从巨乳中呼呼的流出、很快装满了一瓶………`,
        ); // :2054
        // CFLAG:317  = 4（变量语义：CFLAG 族，317） // :2055
        era.set(`cflag:${target}:317`, 4); // :2055
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:317`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…再更多的榨取我的母乳吧！啊啊…把容器装满吧呜咿咿…啊啊啊…${heart(1)}」`,
        ); // :2058
        await era.printAndWait(
          `${target_name}从被榨取母乳的行为中得到了快感………`,
        ); // :2059
        // CFLAG:317  = 3（变量语义：CFLAG 族，317） // :2060
        era.set(`cflag:${target}:317`, 3); // :2060
      } else if (era0(`cflag:${target}:317`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「唔…呜…我的母乳…已经被挤出这么多了…可以…可以停下来了吧………」`,
        ); // :2063
        await era.printAndWait(`${target_name}的巨乳被咕嘟咕嘟的榨取着母乳………`); // :2064
        // CFLAG:317  = 2（变量语义：CFLAG 族，317） // :2065
        era.set(`cflag:${target}:317`, 2); // :2065
      }
      return 0;
    }
  } else if (era_flag.selectcom == 16 && era0(`tequip:${target}:16`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:377`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「咕嗯嗯…反正我的母乳也会自己流出来…一天到晚戴着也没关系吧.${heart(1)}」`,
      ); // :2073
      await era.printAndWait(
        `${target_name}带着淫乱的表情说着，好像是真心这样想的………`,
      ); // :2074
      // CFLAG:377  = 3（变量语义：CFLAG 族，377） // :2075
      era.set(`cflag:${target}:377`, 3); // :2075
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:377`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊嗯…已经好了吗………？」`); // :2078
      await era.printAndWait(`${target_name}似乎还想要再稍微多榨取一些………`); // :2079
      // CFLAG:377  = 2（变量语义：CFLAG 族，377） // :2080
      era.set(`cflag:${target}:377`, 2); // :2080
    } else if (era0(`cflag:${target}:377`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「这、这种…像对待家畜一样………」`); // :2083
      await era.printAndWait(`${target_name}因为过于屈辱流下了眼泪………`); // :2084
      // CFLAG:377  = 1（变量语义：CFLAG 族，377） // :2085
      era.set(`cflag:${target}:377`, 1); // :2085
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    if (era0(`cflag:${target}:320`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊哈哈…咿咿唔唔啊…原来我的肛门会因为放进那样的玩具变得这么舒服啊~${heart(1)}」`,
        ); // :2153
        await era.printAndWait(`${target_name}一边呻吟着一边放松了菊花………`); // :2154
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「哈啊…我的屁穴…请全部放进来吧${heart(1)}」`); // :2157
        await era.printAndWait(`${target_name}因为未知的快感呻吟着………`); // :2158
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊咕呜…把这种像是玩具一样的东西插进…我…啊唔…啊啊啊～！」`,
          ); // :2163
          await era.printAndWait(
            `${target_name}被开发的肛门轻松的吞入了整串肛珠………`,
          ); // :2164
        } else {
          await era.printAndWait(
            `「啊啊！我的屁股绝对放不进去这种东西！呜！不要快把它拿走快拿走！」`,
          ); // :2166
          await era.printAndWait(
            `${target_name}尚未完全开发的肛门被强行插进肛珠，发出了悲鸣………`,
          ); // :2167
        }
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :2170
      era.set(`cflag:${target}:320`, 1); // :2170
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:320`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊…快点让我的肛门舒服起来…快点放进去嘛…啊啊${heart(1)} …啊嗯${heart(1)} …啊哈啊啊${heart(1)}」`,
        ); // :2176
        await era.printAndWait(
          `${target_name}的肛门每插入一个珠子就发出一阵激烈的淫叫声………`,
        ); // :2177
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :2178
        era.set(`cflag:${target}:320`, 7); // :2178
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:320`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「嗯…嗯呼…哈嗯…快一点…全部塞进去嘛！」`); // :2181
        await era.printAndWait(
          `${target_name}发出了满足的呻吟、两腿大大的分开………`,
        ); // :2182
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :2183
        era.set(`cflag:${target}:320`, 6); // :2183
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:320`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼哇…哈、啊啊啊…好棒啊…哈啊哈啊…再多放进去一些嘛…${heart(1)}」`,
        ); // :2186
        await era.printAndWait(`${target_name}撒着娇求你再多塞进去一些珠子………`); // :2187
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :2188
        era.set(`cflag:${target}:320`, 5); // :2188
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:320`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呜、啊…啊啊…满满…全部都塞进来了吗…啊啊…哈啊哈啊…嗯…啊啊！」`,
        ); // :2191
        await era.printAndWait(
          `${target_name}的肛门每塞进一个珠子都发出呻吟………`,
        ); // :2192
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :2193
        era.set(`cflag:${target}:320`, 4); // :2193
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:320`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「咕呜…唔唔唔…请稍微慢一点放进去…啊…啊啊！」`); // :2196
        await era.printAndWait(
          `${target_name}被开发的肛门轻松的吞入了整串肛珠………`,
        ); // :2197
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :2198
        era.set(`cflag:${target}:320`, 3); // :2198
      } else if (era0(`cflag:${target}:320`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊呜咿咿啊啊！不要…不要这样啊!不能再继续放了啊…啊啊啊啊啊！」`,
        ); // :2201
        await era.printAndWait(
          `${target_name}尚未完全开发的肛门被强行插进肛珠，发出了悲鸣………`,
        ); // :2202
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :2203
        era.set(`cflag:${target}:320`, 2); // :2203
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (era0(`cflag:${target}:379`) <= 6 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊哈哇哇哇…肛门唔咕唔咕啊啊…好强烈唔啊啊啊…啊唔咿咿咿咿…哇哇哇哇哇…这、这太…激烈了唔唔唔…${heart(1)}」`,
      ); // :2211
      await era.printAndWait(
        `一口气抽出屁股里的所有肛珠，${target_name}因为过于强烈的快感快乐的翻了白眼，口水流个不停………`,
      ); // :2212
      // CFLAG:379  = 6（变量语义：CFLAG 族，379） // :2213
      era.set(`cflag:${target}:379`, 6); // :2213
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:379`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊啊！肛门要坏掉了坏掉了…啊呜咿咿咿咿咿呜！」`); // :2216
      await era.printAndWait(
        `一口气抽出全部肛珠，强烈的刺激让${target_name}不由发出了悲鸣………`,
      ); // :2217
      // CFLAG:379  = 5（变量语义：CFLAG 族，379） // :2218
      era.set(`cflag:${target}:379`, 5); // :2218
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`abl:${target}:3`) >= 3 &&
      (era0(`cflag:${target}:379`) <= 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊啊啊…啊呜啊咿咿咿咿咿呜…太刺激了太刺激了啊啊啊啊啊${heart(1)}」`,
      ); // :2221
      await era.printAndWait(
        `一口气抽出了屁股里的所有肛珠，${target_name}因为多度的快感，肛门蠕动颤抖着，肠液不住的流淌………`,
      ); // :2222
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :2223
      era.set(`cflag:${target}:379`, 4); // :2223
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:379`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊啊…啊…呜咿咿咿呜呜…屁、屁股要坏掉了…已经不行了………」`,
      ); // :2226
      await era.printAndWait(
        `肛珠一口气被拔出，${target_name}的眼泪不受控制流了下来………`,
      ); // :2227
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :2228
      era.set(`cflag:${target}:379`, 3); // :2228
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (era0(`cflag:${target}:379`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「呜啊、停、停下！呜…呜啊啊啊啊啊啊啊！」`); // :2231
      await era.printAndWait(
        `一口气抽出全部肛珠，强烈的刺激让${target_name}发出了阵阵娇喘………`,
      ); // :2232
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :2233
      era.set(`cflag:${target}:379`, 2); // :2233
    } else if (era0(`cflag:${target}:379`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「唔！停下！快停下！啊！咿！啊啊啊啊～！」`); // :2236
      await era.printAndWait(
        `一口气抽出全部肛珠，强烈的刺激让${target_name}尖叫着………`,
      ); // :2237
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :2238
      era.set(`cflag:${target}:379`, 1); // :2238
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (era0(`cflag:${target}:321`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊嗯～…还真是不客气啊…咕、啊…呼呼…这疼痛…真是受不了啊${heart(1)}」`,
          ); // :2253
          await era.printAndWait(
            `${player_name}压住了${target_name}那具丰满的肉体、品尝了处女的肉体。`,
          ); // :2254
          await era.printAndWait(
            `${target_name}的秘裂流出鲜血，这种痛苦反而让${target_name}感到了更强烈的快感。`,
          ); // :2255
          await era.printAndWait(
            `「啊…啊呼啊嗯嗯${heart(1)} 我…如果一直都这么舒服的话，不管多少次处女都可以交出去呢${heart(1)}」`,
          ); // :2256
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊…嗯…呼、插进来了…啊啊啊…呼…啊啊嗯${heart(1)}」`,
          ); // :2259
          await era.printAndWait(
            `${target_name}被${player_name}紧紧的按在地上、在阴茎插进去的时候不住的颤抖着。`,
          ); // :2260
          await era.printAndWait(
            `阴茎在蜜壶里一路突破，再次夺走了处女膜、${target_name}吐露的感动的呻吟。`,
          ); // :2261
          await era.printAndWait(
            `「啊啊啊～！…魔王大人…魔王大人…我永远都是你的东西了${heart(1)} 啊啊！不要离开我！」`,
          ); // :2262
        } else {
          await era.printAndWait(
            `「不会吧！…我的处女膜居然再生了…处女要再次被夺走…可恶！」`,
          ); // :2265
          await era.printAndWait(
            `${player_name}的阴茎一路突破了处女膜，插进${target_name}的最深处。`,
          ); // :2266
          await era.printAndWait(
            `「咕啊嗯！…又再次尝到了这种痛苦…真是…到底…可恶！」`,
          ); // :2267
          await era.printAndWait(
            `${target_name}被夺走了处女，因为痛苦咬紧的嘴唇………`,
          ); // :2268
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呼呼…嗯…啊啊${heart(1)} 我果然…爱死魔王大人的肉棒了${heart(1)}」`,
          ); // :2273
          await era.printAndWait(
            `${target_name}的蜜壶最深处被${player_name}的肉棒贯穿了、难以言喻的快感让${target_name}发出了呻吟。`,
          ); // :2274
          await era.printAndWait(
            `「来吧…我的身体请随意品尝…啊啊…魔王大人啊…${heart(1)}」`,
          ); // :2275
          await era.printAndWait(
            `${player_name}因为那句撒娇的话而鼓起干劲、交合声和${target_name}的喘息声刺激着${player_name}的耳朵………`,
          ); // :2276
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈…哈…嗯…呼哈…哇、居然这么有感觉…啊啊…啊嗯${heart(1)}」`,
          ); // :2279
          await era.printAndWait(
            `${target_name}那丰满的身体在${player_name}的怀里感到安心、无力的瘫软着。`,
          ); // :2280
          await era.printAndWait(
            `${player_name}的阴茎每次抽送都会在秘崩中溅起爱液、${target_name}甘美的呻吟在耳边回响。`,
          ); // :2281
          await era.printAndWait(
            `「啊啊嗯…呼呼…啊啊嗯${heart(1)} 啊啊…不错啊啊…请抱紧我${heart(1)}」`,
          ); // :2282
        } else {
          if (era0(`cflag:${target}:10`) == 1) {
            await era.printAndWait(
              `「啊咕！…突、突然要侵犯我什么的…啊啊啊！…真是太过分了…啊啊！」`,
            ); // :2287
            await era.printAndWait(
              `为了让${target_name}搞清自己已经不是亲卫队长、而是魔王的女奴、${player_name}在第一次调教时就毫不留情的侵犯了她。`,
            ); // :2288
            await era.printAndWait(`「哈…哈…唔…咕呜！」`); // :2289
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(
                `「就、就算这样…也没什么大不了的…啊…啊啊！啊嗯！」`,
              ); // :2291
              await era.printAndWait(
                `这副被狂王疼爱的${target_name}的丰满身体，${player_name}每动一次都表现出敏感的反应。`,
              ); // :2292
              await era.printAndWait(
                `「哈、早点弄完走开吧…这种事情…啊啊咕呜呜…啊嗯！」`,
              ); // :2293
              await era.printAndWait(
                `${target_name}这副迷人的身体已经是${player_name}的东西了、日后慢慢的侵犯她吧………`,
              ); // :2294
            } else {
              await era.printAndWait(`「呼、也没什么大不了的…嗯…嗯…嗯唔唔」`); // :2296
              await era.printAndWait(
                `这副被狂王疼爱的${target_name}的丰满身体被${player_name}侵犯了。${target_name}每动一次都发出闷哼的声音。`,
              ); // :2297
              await era.printAndWait(`「以为用这种姿势…嗯…呼…唔…嗯…咕！」`); // :2298
              await era.printAndWait(
                `${target_name}被侵犯着，脸上的富余的表情逐渐瓦解了………`,
              ); // :2299
            }
          } else {
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(`「唔…咕…在深处…啊…啊啊…嗯咕呜！」`); // :2303
              await era.printAndWait(
                `${target_name}的阴道深处被${player_name}的阴茎侵犯着。${target_name}在发出悲鸣的一瞬间咬紧嘴唇，忍耐着。`,
              ); // :2304
              await era.printAndWait(
                `「哈啊哈啊…就、就这种程度也想让我屈服吗…嗯…服…嗯嗯嗯！」`,
              ); // :2305
              await era.printAndWait(
                `在${target_name}身上慢慢的摇晃着、看来比预想的要能忍耐啊，不过这就是调教的乐趣嘛………`,
              ); // :2306
            } else {
              await era.printAndWait(
                `「呜咕…哈啊哈啊…呼、真的有放进来吗？也没什么大不了的吗…啊…呜、不要动！」`,
              ); // :2308
              await era.printAndWait(
                `按住${target_name}阴茎激烈的抽送着、${target_name}露出厌恶的表情，不时的骂着。`,
              ); // :2309
              await era.printAndWait(
                `「嗯…咕呜…只、只有这种程度吗我一点感觉都没有…啊啊！你真的在侵犯我吗？…嗯咕唔唔！」`,
              ); // :2310
              await era.printAndWait(
                `因为很痛${target_name}发出了悲鸣。不过这种事情不必介意、${target_name}只是一个奴隶而已………`,
              ); // :2311
            }
          }
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :2316
      era.set(`cflag:${target}:321`, 1); // :2316
      return 0;
    } else {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊嗯…不用客气…哈、啊…唔呼…这种痛感…真是不好忍受啊${heart(1)}」`,
          ); // :2324
          await era.printAndWait(
            `${player_name}按住${target_name}丰满的身体、‘品尝’着处女的滋味。`,
          ); // :2325
          await era.printAndWait(
            `${target_name}秘裂流出血来，但这种痛感对现在的${target_name}只是煽动快感的来源罢了。`,
          ); // :2326
          await era.printAndWait(
            `「啊…啊哈啊嗯${heart(1)} 突然觉得…如果是这种心情，多被夺走几次处女也不错呢${heart(1)}」`,
          ); // :2327
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊…嗯…插、插入进来了…啊啊…唔…啊嗯${heart(1)}」`,
          ); // :2330
          await era.printAndWait(
            `${target_name}被${player_name}紧紧的按着、感受到阴茎进入的快感而颤抖了起来。`,
          ); // :2331
          await era.printAndWait(
            `在阴茎缓缓进入蜜壶夺走处女的瞬间、${target_name}吐露了动人的呻吟。`,
          ); // :2332
          await era.printAndWait(
            `「啊～啊啊～！…魔王大人…魔王大人…我变成你的东西了${heart(1)} 啊～！永远不会分开了！」`,
          ); // :2333
        } else {
          await era.printAndWait(
            `「咕啊！…居然把我的处女膜再生…又夺走了…咕～唔！」`,
          ); // :2336
          await era.printAndWait(
            `${player_name}的阴茎撕破处女膜进到了${target_name}深处。`,
          ); // :2337
          await era.printAndWait(`「咕呜！…居然又一次感到这种痛楚…呜…咕…！」`); // :2338
          await era.printAndWait(
            `${target_name}被按住，感到被夺走处女的痛楚而咬紧的嘴唇………`,
          ); // :2339
        }
        return 0;
      }

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:321`) <= 8 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊嗯！嗯…再激烈一点想要再激烈一点啊啊～！${heart(1)}」`,
          ); // :2346
          await era.printAndWait(
            `${target_name}的蜜壶深处被${player_name}的阴茎贯穿、${target_name}吐露出诱人的呻吟。${player_name}更激烈的抽插了起来。`,
          ); // :2347
          await era.printAndWait(
            `「呼啊呼啊${heart(1)} 咕啾咕啾的${heart(1)} 咕啾咕啾的侵犯我的小穴吧${heart(1)}」`,
          ); // :2348
          await era.printAndWait(
            `${target_name}的蜜壶随着被侵犯而越来越有感觉、湿乎乎的皱褶包裹着${player_name}的阴茎、互相寻求着快乐。`,
          ); // :2349
          await era.printAndWait(
            `「咕嗯嗯啊…啊啊～啊嗯啊嗯…啊啊啊啊啊啊${heart(1)}」`,
          ); // :2350
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…嗯、好急人…我明明想要更激烈一点…啊嗯啊啊啊${heart(1)}」`,
          ); // :2352
          await era.printAndWait(
            `${player_name}慢慢的动着腰，搅动着${target_name}的蜜壶。`,
          ); // :2353
          await era.printAndWait(
            `${target_name}急不可待的上下动着腰，催促着${player_name}。`,
          ); // :2354
          await era.printAndWait(
            `「求你了…激烈的侵犯我的小穴吧…啊啊啊——停不下来啊！」`,
          ); // :2355
          await era.printAndWait(
            `因为${target_name}那像痴女一样的祈求，${player_name}苦笑着鼓起了干劲。`,
          ); // :2356
          await era.printAndWait(
            `「嗯呀…十分感谢…小穴小穴好舒服${heart(1)} 最喜欢魔王大人的肉棒了${heart(1)}」`,
          ); // :2357
        } else {
          await era.printAndWait(
            `「啊啊${heart(1)} 这个姿势是…认真的侵犯我呢${heart(1)}」`,
          ); // :2359
          await era.printAndWait(
            `${target_name}被不停的插着、漏出了陶醉的声音。丰满的身体开始散发出了淫靡的香味。`,
          ); // :2360
          await era.printAndWait(
            `「快点快点…咕噜咕噜的侵犯我的小学${heart(1)} 让我发狂吧${heart(1)}」`,
          ); // :2361
          await era.printAndWait(
            `苦笑道”你已经是小穴狂了”的${player_name}更激烈的抽送起了阴茎。`,
          ); // :2362
          await era.printAndWait(
            `「咕咦…这样就好${heart(1)} 小穴最棒了${heart(1)}」`,
          ); // :2363
        }
        // CFLAG:321  = 9（变量语义：CFLAG 族，321） // :2365
        era.set(`cflag:${target}:321`, 9); // :2365
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:321`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「如果知道是这么舒服的话…能更早…成为魔王大人的东西就好了${heart(1)}」`,
          ); // :2369
          await era.printAndWait(
            `${target_name}就像是什么被解放了一样一边叫着一边抱着${player_name}。`,
          ); // :2370
          await era.printAndWait(
            `${player_name}的被抱着的后背、就像想想的那样指甲插了进来。连那个痛处都感觉很舒服的${player_name}激烈的不停抽送着。`,
          ); // :2371
          await era.printAndWait(
            `「啊啊啊嗯啊啊…啊嗯继续…继续抱我…啊嗯啊啊啊——${heart(1)}」`,
          ); // :2372
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊咕！最喜欢连深处都被疼爱了${heart(1)} 啊啊啊——${heart(1)}」`,
          ); // :2374
          await era.printAndWait(
            `${target_name}被不停的插着、因为从上面被激烈插入的蜜壶而发出野兽般的声音。`,
          ); // :2375
          await era.printAndWait(
            `「哦哦哦哦${heart(1)} 插进来了，插进来了啊${heart(1)}」`,
          ); // :2376
          await era.printAndWait(
            `${player_name}为了更好的品味着蜜壶、抓住${target_name}的脚腕压向地面，更快的动了起来。`,
          ); // :2377
          await era.printAndWait(
            `「呀啊啊${heart(1)} 啊啊啊啊…要、要坏掉了…要坏掉了啊…哦哦啊嗯哦${heart(1)}」`,
          ); // :2378
        } else {
          await era.printAndWait(
            `「嗯哈哈嗯啊…嗯咕——${heart(1)} 里面好舒服…${heart(1)}」`,
          ); // :2380
          await era.printAndWait(
            `${target_name}一边被侵犯着蜜壶，一边被${player_name}紧紧地抱着。汗液在身体上散发出煽情的气味。`,
          ); // :2381
          await era.printAndWait(
            `「啊嗯啊啊…魔王大人的肉棒和我的子宫啾啾的接吻了…啊啊啊${heart(1)}」`,
          ); // :2382
          await era.printAndWait(
            `${target_name}被${player_name}插入到了深处，前后动着腰、发出着悲鸣似的娇喘………`,
          ); // :2383
        }
        // CFLAG:321  = 8（变量语义：CFLAG 族，321） // :2385
        era.set(`cflag:${target}:321`, 8); // :2385
      } else if (
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:321`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「呼——…呼——…快、快动起来！请动起来…哦、哦！求你了！」`,
          ); // :2389
          await era.printAndWait(
            `${player_name}插入着${target_name}的蜜壶就那样不动，享受着阴茎被包裹的感觉时，${target_name}发出了祈求的声音。`,
          ); // :2390
          await era.printAndWait(
            `「不要，不要这样！你要负起把、把我变得奇怪的责任…啊啊啊啊啊～！」`,
          ); // :2391
          await era.printAndWait(
            `对于性爱狂的${target_name}来说，继续保持这样就像是拷问一样吧、${player_name}默默地笑着，慢慢的动起了腰………`,
          ); // :2392
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊恩…哈哈…啊啊啊…肉棒好舒服啊呀啊呀呀呀呀呀！」`,
          ); // :2394
          await era.printAndWait(
            `随着${player_name}抽送阴茎，${target_name}发出了野兽般的悲鸣。`,
          ); // :2395
          await era.printAndWait(
            `蜜壶包裹着${player_name}的阴茎、交换着无上的快乐。`,
          ); // :2396
          await era.printAndWait(`「我…这样…这样！嗯啊啊啊啊…嗯啊啊啊啊啊啊」`); // :2397
        } else {
          await era.printAndWait(
            `「啊嗯啊啊啊…我才不是输给了肉棒啊啊嗯啊啊呀！」`,
          ); // :2399
          await era.printAndWait(
            `蜜壶的深处被阴茎插入、${target_name}颤抖的伸出来、发出微弱的悲鸣。`,
          ); // :2400
          await era.printAndWait(
            `「啊啊啊——！啊…啊哈！不行…输给肉棒…啊咦咦咦咦咦咦！」`,
          ); // :2401
          await era.printAndWait(
            `“已经是性爱狂了，事到如今还这样”${player_name}一边苦笑着、一边愉快的侵犯者${target_name}的蜜壶………`,
          ); // :2402
        }
        // CFLAG:321  = 7（变量语义：CFLAG 族，321） // :2404
        era.set(`cflag:${target}:321`, 7); // :2404
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:321`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊嗯！嗯…好、好深…啊啊…嗯…忍不了啊${heart(1)}」`,
          ); // :2408
          await era.printAndWait(
            `${target_name}的蜜壶的深处被${player_name}的阴茎贯穿、${target_name}发出了感动的声音。`,
          ); // :2409

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊嗯…啊…啊哈${heart(1)} 可以哦…继续把我的小穴侵犯的乱七八糟的吧${heart(1)}」`,
            ); // :2412
            await era.printAndWait(
              `${player_name}因为这句话而鼓起了干劲、水声和${target_name}的喘息声舒服的刺激着${player_name}的耳朵………`,
            ); // :2413
          } else {
            await era.printAndWait(
              `「哈哈…嗯啊！好舒服${heart(1)} 更多的调教我的小穴吧${heart(1)}」`,
            ); // :2415
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…这么温柔的动作是不行的啊！我明明更喜欢激烈的方式…嗯啊啊啊${heart(1)}」`,
          ); // :2418
          await era.printAndWait(
            `${player_name}慢慢的动着腰，搅拌着${target_name}的蜜壶。`,
          ); // :2419

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `让${target_name}焦急不已的动作、让淫乱的蜜壶敏感的反应着。`,
            ); // :2422
            await era.printAndWait(
              `「嗯啊嗯…啊…啊啊…嗯！哈哈…啊嗯啊…啊嗯…${heart(1)}」`,
            ); // :2423
            await era.printAndWait(
              `「啊啊啊${heart(1)} 啊嗯…慢也可以，就这样继续动吧${heart(1)}」`,
            ); // :2424
          } else {
            await era.printAndWait(
              `「嗯…咕…啊啊…更激烈的动起来！我讨厌这样…着急…啊啊嗯${heart(1)}」`,
            ); // :2426
          }
        } else {
          await era.printAndWait(
            `「啊啊恩…这个姿势的话全都被看见了${heart(1)}啊啊嗯啊啊啊啊啊～${heart(1)}」`,
          ); // :2429
          await era.printAndWait(
            `${target_name}被不停的插着、因为从上面被激烈插入的蜜壶而发出喘息。`,
          ); // :2430

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊！好深啊！啊嗯啊啊${heart(1)} 小穴全部被侵犯了…嗯啊…啊呀啊啊啊啊啊啊${heart(1)}」`,
            ); // :2433
            await era.printAndWait(
              `${target_name}因为蜜壶深处被挖掘而发出了悲鸣一样的喘息………`,
            ); // :2434
          } else {
            await era.printAndWait(
              `「啊嗯！好激烈啊${heart(1)} 这个好棒，要变成喜欢肉棒的奴隶了啊${heart(1)}」`,
            ); // :2436
          }
        }
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :2439
        era.set(`cflag:${target}:321`, 6); // :2439
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:321`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈啊…哈啊…嗯…嗯啊…感觉到了…感觉到了魔王大人的爱了${heart(1)}」`,
          ); // :2443
          await era.printAndWait(
            `${target_name}把丰满的身体安心的托付给${player_name}、就那样保持着这个姿势。`,
          ); // :2444

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `随着${player_name}的阴茎抽送，秘裂都会飞出爱液、${target_name}甜美的声音在旁边回响着。`,
            ); // :2447
            await era.printAndWait(
              `「啊啊嗯…哈哈…啊啊嗯${heart(1)} 啊啊…好棒…请继续抱我吧${heart(1)}」`,
            ); // :2448
          } else {
            await era.printAndWait(
              `「啊啊…嗯…我没关系的…更加…激烈的…爱我吧${heart(1)}」`,
            ); // :2450
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯哈哈…啊嗯…啊啊${heart(1)} 好棒…啊嗯更多…更多${heart(1)}」`,
          ); // :2453
          await era.printAndWait(
            `${target_name}因为有感觉而紧紧地抱住${player_name}。汗液在身体上散发出煽情的气味。`,
          ); // :2454

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊…继续…继续爱我吧${heart(1)} 激烈的…好棒啊啊啊啊啊${heart(1)}」`,
            ); // :2457
            await era.printAndWait(
              `输给${target_name}祈求的${player_name}开始了激烈的抽送。${target_name}发出了愉快的声音………`,
            ); // :2458
          } else {
            await era.printAndWait(
              `「嗯咕…好激烈…好激烈啊…啊啊啊…但是…这样就好…啊啊！」`,
            ); // :2460
          }
        } else {
          await era.printAndWait(`「嗯啊这么舒服的话…嗯啊嗯…啊啊${heart(1)}」`); // :2463
          await era.printAndWait(
            `${target_name}被不停的插着、因为从上面被激烈插入的蜜壶而发出喘息。`,
          ); // :2464

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊嗯${heart(1)} 啊啊啊${heart(1)} 插到深处来了${heart(1)}」`,
            ); // :2467
            await era.printAndWait(
              `有感觉的${target_name}的腿一下伸了出来、${player_name}抓住脚腕压在了地上，更快的动了起来。`,
            ); // :2468
            await era.printAndWait(
              `「啊啊啊啊${heart(1)} 嗯啊…这样停不下来啊…啊啊啊——啊啊啊啊——${heart(1)}」`,
            ); // :2469
          } else {
            await era.printAndWait(
              `「啊啊！啊！我的哪里…啊嗯…已经变成魔王大人的形状了${heart(1)}」`,
            ); // :2471
          }
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :2474
        era.set(`cflag:${target}:321`, 5); // :2474
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:321`) <= 3 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「啊…啊啊恩！…咕…哈哈…嗯啊啊嗯！」`); // :2478
          await era.printAndWait(
            `${target_name}随着${player_name}插进蜜壶而发出了喘息声、享受着因快感而苦闷这的${target_name}的${player_name}更激烈的抽送了起来。`,
          ); // :2479
          if (rand_n(2) == 0) {
            await era.printAndWait(
              `「啊啊！太、太激烈了！饶、饶了我吧…呀啊啊啊啊——！」`,
            ); // :2481
          } else {
            await era.printAndWait(
              `「这样的话我嗯啊呀…啊啊啊嗯！咦…已、已经忍耐…啊啊啊——！」`,
            ); // :2483
          }
          await era.printAndWait(
            `${target_name}的蜜壶每次被插入都会飞溅出爱液、${player_name}的腰一定到绝顶为止都不会停下来吧………`,
          ); // :2485
        } else {
          await era.printAndWait(`「不可能…我…这么有感觉什么的、啊啊啊啊！」`); // :2487
          await era.printAndWait(
            `${target_name}终于对${player_name}的腰的动作有感觉了、蜜壶每次被插进来都会啾啾的包裹回去。`,
          ); // :2488
          if (rand_n(2) == 0) {
            await era.printAndWait(
              `「啊啊啊！啊嗯…不行…不行了…啊咦…呀啊啊啊啊！我、我要…不、不行了啊啊！」`,
            ); // :2490
          } else {
            await era.printAndWait(
              `「啊咕！不行不行…这么插进来的话要不行了…啊嗯嗯…啊啊啊——！」`,
            ); // :2492
          }
          await era.printAndWait(
            `${player_name}一边笑着，一边品味着包裹过来的${target_name}蜜壶的感触………`,
          ); // :2494
        }
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :2496
        era.set(`cflag:${target}:321`, 4); // :2496
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:321`) <= 2 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「哈啊哈啊…嗯咕…！我能老师的被抱着…啊嗯…并不是因为感觉…嗯！很舒服…嗯啊…」`,
          ); // :2500
          await era.printAndWait(
            `虽然${target_name}随着${player_name}轻轻的突刺而发出了喘息、但一点都没有承认自己有感觉。`,
          ); // :2501
          await era.printAndWait(
            `「来、来吧…快点…嗯啊嗯…快点…射…出来…啊啊啊啊啊…也可以啊」`,
          ); // :2502
        } else {
          await era.printAndWait(`「哈哈…嗯！咕…你不可能让我去的…啊…嗯咕！」`); // :2504
          await era.printAndWait(
            `${target_name}被${player_name}压着，不停的侵犯者。已经不可能逃走了。`,
          ); // :2505
          await era.printAndWait(
            `「嗯！呵呵呵、现在这样就可以了…啊啊！那、哪里！」`,
          ); // :2506
        }
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :2508
        era.set(`cflag:${target}:321`, 3); // :2508
      } else if (era0(`cflag:${target}:321`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「啊啊…又是这样…咕咕啊啊！」`); // :2512
          await era.printAndWait(
            `${player_name}压住${target_name}、把阴茎差劲了小穴深处。${target_name}不自觉的发出的悲鸣，慢慢的变成了闷哼的喘息声。`,
          ); // :2513
          await era.printAndWait(`「嗯啊嗯啊…嗯咕…嗯…嗯啊咕…啊…嗯咕——！」`); // :2514
        } else {
          await era.printAndWait(`「嗯啊嗯啊…所以就打算侵犯我么？」`); // :2516
          await era.printAndWait(
            `${player_name}压住${target_name}激烈的抽送着阴茎、${target_name}一脸讨厌的表情骂了回来。`,
          ); // :2517
          await era.printAndWait(
            `「这么没自信的腰想让我有感觉什么的…嗯…还早100年呢…嗯咕」`,
          ); // :2518
        }
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :2520
        era.set(`cflag:${target}:321`, 2); // :2520
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (era0(`cflag:${target}:322`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊嗯…从后面被侵犯…处女被夺走什么的…啊嗯…啊啊嗯${heart(1)}」`,
          ); // :2536
          await era.printAndWait(
            `${target_name}被${player_name}从后面把阴茎插进来的感觉从后背传了上来。`,
          ); // :2537
          await era.printAndWait(
            `插进蜜壶、处女再次失去的瞬间、蜜壶好像要融化一样引导着${player_name}的阴茎开始动了起来。`,
          ); // :2538
          await era.printAndWait(
            `「啊啊啊嗯…我的小穴在说它想要肉棒${heart(1)} 快点${heart(1)} 快插进来${heart(1)} 把我侵犯的乱七八糟的吧！」`,
          ); // :2539
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…啊啊嗯…慢、慢慢的插入…品味我处女膜的感觉吧…啊啊啊！」`,
          ); // :2542
          await era.printAndWait(
            `${target_name}因为被${player_name}从后面插入阴茎的感觉而颤抖着。`,
          ); // :2543
          await era.printAndWait(
            `阴茎挖掘着${target_name}的蜜壶、处女再次被夺走的瞬间、${target_name}漏出了感动的声音。`,
          ); // :2544
          await era.printAndWait(
            `「啊啊啊——！…魔王大人…我…我${target_name}成为你的东西了${heart(1)}`,
          ); // :2545
        } else {
          await era.printAndWait(
            `「这样…咕…咕…和先给狂王大人时一样的姿势…啊…啊啊啊啊！」`,
          ); // :2548
          await era.printAndWait(
            `${player_name}抓住${target_name}丰满的屁股、阴茎一口气插破了处女摸，直到${target_name}的深处。`,
          ); // :2549
          await era.printAndWait(`「啊啊！不要…不要啊…不要玷污我的回忆！」`); // :2550
          await era.printAndWait(
            `${target_name}因为处女被夺走而大声的哭泣着………`,
          ); // :2551
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊嗯…！激烈的激烈的好棒${heart(1)} 啊嗯啊啊啊嗯${heart(1)}」`,
          ); // :2557
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、一次次的用腰撞击着她丰满的屁股。`,
          ); // :2558
          await era.printAndWait(
            `每次插入蜜汁都会飞溅出来、${target_name}的嘴里发出了下流的娇喘。`,
          ); // :2559
          await era.printAndWait(
            `「啊嗯啊啊嗯哈…肉棒${heart(1)} 肉棒好舒服啊${heart(1)} 继续侵犯我的小穴吧${heart(1)}」`,
          ); // :2560
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呵呵呵…想要征服我的屁股呢…啊啊…好啊…好啊${heart(1)}」`,
          ); // :2563
          await era.printAndWait(
            `${target_name}被抓住屁股，撒娇似的说道。满是蜜汁的屁股被分开，阴茎一口气插了进去。`,
          ); // :2564
          await era.printAndWait(
            `「嗯啊啊${heart(1)} 啊啊啊啊——！嗯…比平时更深…啊啊啊！」`,
          ); // :2565
          await era.printAndWait(
            `被插到深处的${target_name}的秘裂紧紧地舒服的包裹了上来………`,
          ); // :2566
        } else {
          if (era0(`cflag:${target}:10`) == 1) {
            await era.printAndWait(`「我从后面、啊！被侵犯什么的…咕啊啊啊！」`); // :2571
            await era.printAndWait(
              `为了让${target_name}明白自己已经不是亲卫队长而是牝奴隶、${player_name}最初的调教就是侵犯她。`,
            ); // :2572
            await era.printAndWait(`「哈…哈…唔…咕！」`); // :2573
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(`「啊啊…好深…好深…啊咕啊啊啊！」`); // :2575
              await era.printAndWait(
                `抓住被狂王不知道插过多少次的${target_name}的丰满的屁股、${player_name}毫不留情的抽送着。`,
              ); // :2576
              await era.printAndWait(
                `「快、快离开…快离开！我…啊啊！呀…啊啊——！」`,
              ); // :2577
              await era.printAndWait(
                `${player_name}因为这敏感的反应而笑着、${player_name}继续从后面侵犯者她………`,
              ); // :2578
            } else {
              await era.printAndWait(`「嗯…咕…没、没什么大不了的呢…嗯！」`); // :2580
              await era.printAndWait(
                `抓住被狂王不知道插过多少次的${target_name}的丰满的屁股、${player_name}毫不留情的抽送着。`,
              ); // :2581
              await era.printAndWait(
                `「哈咕！只是单纯的激烈的插进来的话…啊咕！…我是不可能有感觉的…啊啊！」`,
              ); // :2582
              await era.printAndWait(
                `${target_name}虽然被侵犯着，对${player_name}强硬的态度却还没有崩溃………`,
              ); // :2583
            }
          } else {
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(`「啊啊…好深…好深…啊咕啊啊啊！」`); // :2587
              await era.printAndWait(
                `抓住被狂王不知道插过多少次的${target_name}的丰满的屁股、${player_name}毫不留情的插了进去。`,
              ); // :2588
              await era.printAndWait(
                `「快、快离开…快离开！我…啊啊！呀…啊啊——！」`,
              ); // :2589
              await era.printAndWait(
                `${player_name}因为这敏感的反应而笑着、${player_name}继续从后面侵犯者她………`,
              ); // :2590
            } else {
              await era.printAndWait(`「嗯…咕…没、没什么大不了的呢…嗯！」`); // :2592
              await era.printAndWait(
                `抓住被狂王不知道插过多少次的${target_name}的丰满的屁股、${player_name}毫不留情的插了进去。`,
              ); // :2593
              await era.printAndWait(
                `「哈咕！只是单纯的激烈的插进来的话…啊咕！…我是不可能有感觉的…啊啊！」`,
              ); // :2594
              await era.printAndWait(
                `${target_name}虽然被侵犯着，对${player_name}强硬的态度却还没有崩溃………`,
              ); // :2595
            }
          }
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :2600
      era.set(`cflag:${target}:322`, 1); // :2600
      return 0;
    } else {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊嗯…从后面被侵犯…处女被夺走什么的…啊嗯…啊啊嗯${heart(1)}」`,
          ); // :2608
          await era.printAndWait(
            `${target_name}被${player_name}从后面把阴茎插进来的感觉从后背传了上来。`,
          ); // :2609
          await era.printAndWait(
            `插进蜜壶、处女再次失去的瞬间、蜜壶好像要融化一样引导着${player_name}的阴茎开始动了起来。`,
          ); // :2610
          await era.printAndWait(
            `「啊啊啊嗯…我的小穴在说它想要肉棒${heart(1)} 快点${heart(1)} 快插进来${heart(1)} 把我侵犯的乱七八糟的吧！」`,
          ); // :2611
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…啊啊嗯…慢、慢慢的插入…品味我处女膜的感觉吧…啊啊啊！」`,
          ); // :2614
          await era.printAndWait(
            `${target_name}因为被${player_name}从后面插入阴茎的感觉而颤抖着。`,
          ); // :2615
          await era.printAndWait(
            `阴茎挖掘着${target_name}的蜜壶、处女再次被夺走的瞬间、${target_name}漏出了感动的声音。`,
          ); // :2616
          await era.printAndWait(
            `「啊啊啊——！…魔王大人…我…我${target_name}成为你的东西了${heart(1)}`,
          ); // :2617
        } else {
          await era.printAndWait(
            `「这样…咕…咕…和先给狂王大人时一样的姿势…啊…啊啊啊啊！」`,
          ); // :2620
          await era.printAndWait(
            `${player_name}抓住${target_name}丰满的屁股、阴茎一口气插破了处女摸，直到${target_name}的深处。`,
          ); // :2621
          await era.printAndWait(`「啊啊！不要…不要啊…不要玷污我的回忆！」`); // :2622
          await era.printAndWait(
            `${target_name}因为处女被夺走而大声的哭泣着………`,
          ); // :2623
        }
        return 0;
      }

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:322`) <= 8 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「激烈的好舒服${heart(1)} 啊哦哦嗯哦啊啊${heart(1)}」`,
          ); // :2630
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、一次次的用腰撞击着她丰满的屁股。`,
          ); // :2631
          await era.printAndWait(
            `每次插入蜜汁都会飞溅出来、${target_name}的嘴固定在“哦”的形状，发出了娇喘。`,
          ); // :2632
          await era.printAndWait(
            `「哦哦啊啊${heart(1)} 哦哦哦…哪里哦哦哦哦哦${heart(1)} 啊哦哦哦哦哦${heart(1)}」`,
          ); // :2633
          await era.printAndWait(
            `看着完全变成野兽一样的性爱狂${target_name}，${player_name}苦笑的继续侵犯着………`,
          ); // :2634
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「小穴${heart(1)} 小穴好舒服${heart(1)} 继续用肉棒侵犯小穴吧${heart(1)}」`,
          ); // :2636
          await era.printAndWait(
            `${target_name}一边被侵犯着丰满的屁股，一边喊着下流的语言。就算是亲卫队长这样也已经废了吧，这么想着的${player_name}继续动着腰。`,
          ); // :2637
          await era.printAndWait(
            `「嗯啊啊啊啊${heart(1)} 啊呀啊啊${heart(1)} 肉棒好棒${heart(1)}」`,
          ); // :2638
          await era.printAndWait(
            `发出格外高亢的声音的${target_name}流出了唾液。带着那样恍惚的样子的${target_name}继续被${player_name}侵犯着。`,
          ); // :2639
          await era.printAndWait(
            `「哈啊啊啊${heart(1)} 啊啊啊…好…好棒肉棒好棒…我已经只要肉棒就能活下去了${heart(1)}」`,
          ); // :2640
        } else {
          await era.printAndWait(
            `「嗯啊！啊嗯…激烈的肉棒好棒${heart(1)} 好喜欢肉棒${heart(1)}」`,
          ); // :2642
          await era.printAndWait(
            `${target_name}随着后面的抽查而晃动着巨乳。看着那淫乱的姿态，${player_name}越来越快的动起了腰。`,
          ); // :2643
          await era.printAndWait(
            `「嗯啊…变得更激烈了！肉棒肉棒肉棒最喜欢了${heart(1)}」`,
          ); // :2644
          await era.printAndWait(
            `${target_name}像弄错了什么一样喊着下流的话，就那样继续被${player_name}侵犯着………`,
          ); // :2645
        }
        // CFLAG:322  = 9（变量语义：CFLAG 族，322） // :2647
        era.set(`cflag:${target}:322`, 9); // :2647
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:322`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `${player_name}分开${target_name}满是蜜汁的屁股，一口气把阴茎插了进去。`,
          ); // :2651
          await era.printAndWait(
            `「啊啊啊、嗯！肉棒好深${heart(1)} 啊啊啊…接下来想要更激烈点啊${heart(1)}」`,
          ); // :2652
          await era.printAndWait(
            `${player_name}如${target_name}希望的那样开始激烈的抽送。不停地被插到深处的${target_name}的蜜壶包裹着，提高着双方的快感。`,
          ); // :2653
          await era.printAndWait(
            `「啊啊啊${heart(1)} 我、啊嗯…好幸福啊…被魔王大人抱好幸福啊！啊啊啊啊——${heart(1)}」`,
          ); // :2654
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊呢啊${heart(1)} 啊啊啊…啊嗯…咕啊${heart(1)} 从后面被抱…最棒了${heart(1)}」`,
          ); // :2656
          await era.printAndWait(
            `${target_name}随着后面的抽查而晃动着巨乳，发出着尖锐的叫声。`,
          ); // :2657
          await era.printAndWait(
            `「啊啊——${heart(1)} 哈哈…唔啊啊啊${heart(1)} 继续继续${heart(1)}」`,
          ); // :2658
          await era.printAndWait(
            `${target_name}的蜜壶随着阴茎的插入而包裹上来、像是要吸住阴茎不让离开一样。`,
          ); // :2659
          await era.printAndWait(
            `「继续疼爱我…爱我、不可以拔出去哦！啊啊啊啊嗯啊啊嗯${heart(1)}」`,
          ); // :2660
        } else {
          await era.printAndWait(
            `「啊嗯啊嗯${heart(1)} 这么激烈的话刚刚好！啊嗯啊啊${heart(1)}」`,
          ); // :2662
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、为了双方的快感而专心的反复抽送着。`,
          ); // :2663
          await era.printAndWait(
            `「啊嗯啊啊啊哈——${heart(1)} 要坏掉了我要坏掉了${heart(1)}」`,
          ); // :2664
          await era.printAndWait(
            `${target_name}的秘裂飞溅出汁液弄湿了两人的腿。`,
          ); // :2665
          await era.printAndWait(
            `感慨着自己调教出了一匹野兽的${player_name}继续侵犯着${target_name}………`,
          ); // :2666
        }
        // CFLAG:322  = 8（变量语义：CFLAG 族，322） // :2668
        era.set(`cflag:${target}:322`, 8); // :2668
      } else if (
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:322`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈哈…求、求你了…不、不要、停、下了…唔…咕！」`,
          ); // :2672
          await era.printAndWait(
            `${target_name}被插到了子宫口附近就那样向${player_name}恳求着。`,
          ); // :2673
          await era.printAndWait(
            `「哦哦、哦想要把我玩坏那样侵犯我！输给肉棒了啊啊啊啊！」`,
          ); // :2674
          await era.printAndWait(
            `微笑着看着${target_name}凌乱的样子，${player_name}慢慢的开始动起了腰………`,
          ); // :2675
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `被侵犯的这么爽不感觉对不起狂王么？”被轻轻这么说道的${target_name}将错就错的就那样高声叫了出来。`,
          ); // :2677
          await era.printAndWait(
            `「啊啊啊啊嗯！啊啊啊没错！我已经没有肉棒就活不下去了！这样是不好的！啊啊！」`,
          ); // :2678
          await era.printAndWait(
            `「全部全部都是你的错！是把我调教成这样的你的错…啊啊啊哈哈啊！」`,
          ); // :2679
          await era.printAndWait(
            `每次被插蜜壶都会流出蜜汁、${target_name}漏出了被${player_name}无情的征服的样子………`,
          ); // :2680
        } else {
          await era.printAndWait(
            `「咕嗯…啊啊啊…更多更多的侵犯我吧…肉帮肉棒好像要啊！」`,
          ); // :2682
          await era.printAndWait(
            `${target_name}从后面被激烈的抽送着、一边抖动着巨乳一边发出着娇喘。`,
          ); // :2683
          await era.printAndWait(
            `「啊嗯啊啊——！停不下来啊…太舒服都快要变成笨蛋了…啊啊——！」`,
          ); // :2684
          await era.printAndWait(
            `蜜壶随着被插而流出的蜜汁顺着大腿在床上慢慢的扩大………`,
          ); // :2685
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :2687
        era.set(`cflag:${target}:322`, 7); // :2687
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:322`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊嗯…！激烈的来了${heart(1)} 啊嗯啊啊呀${heart(1)}」`,
          ); // :2691
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、一次次的用腰撞击着她丰满的屁股。`,
          ); // :2692

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `一次次被插入的秘裂溢出蜜汁、${target_name}的嘴里发出了下流的娇喘。`,
            ); // :2695
            await era.printAndWait(
              `「啊嗯啊嗯哈…小穴好舒服！魔王大人的肉棒好舒服！啊啊——啊嗯啊啊…我快要变成小穴了${heart(1)}」`,
            ); // :2696
          } else {
            await era.printAndWait(
              `「呀啊${heart(1)} 好激烈啊啊啊！让人停不下来啊${heart(1)}」`,
            ); // :2698
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人…继续侵犯我的小穴吧${heart(1)} 让小穴变得更舒服吧${heart(1)}」`,
          ); // :2701
          await era.printAndWait(
            `${target_name}左右摇晃着丰满的屁股祈求着${player_name}。`,
          ); // :2702

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「你也在享受吞下肉棒榨取清液的我的小穴的触感吧？」`,
            ); // :2705
            await era.printAndWait(
              `边舔着嘴唇边说出的下流的话诱惑着${player_name}、被诱惑的${player_name}开始从后面激烈的侵犯着${target_name}。`,
            ); // :2706
            await era.printAndWait(
              `「啊啊嗯！这样！这样好舒服！啊啊…好棒啊${heart(1)} 啊啊嗯！」`,
            ); // :2707
          } else {
            await era.printAndWait(
              `${player_name}抓着她的腰，插进了${target_name}的蜜壶的深处。`,
            ); // :2709
            await era.printAndWait(
              `「嗯啊！深深的进来了${heart(1)} 啊嗯啊啊嗯最棒了${heart(1)}」`,
            ); // :2710
          }
        } else {
          await era.printAndWait(
            `「哈嗯！啊嗯…肉棒好激烈${heart(1)} 继续…啊、啊啊${heart(1)}」`,
          ); // :2713
          await era.printAndWait(
            `${target_name}随着从后面被插而晃动着巨乳、如果抓住那对巨乳掐住乳沟的话，会发出什么样的叫声呢？`,
          ); // :2714

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊嗯啊啊嗯啊啊${heart(1)} 肉棒插到了子宫口啊啊啊小穴黏糊糊的要融化了了啊…${heart(1)}」`,
            ); // :2717
            await era.printAndWait(
              `${target_name}一边发出下流的呻吟一边继续被${player_name}侵犯着………`,
            ); // :2718
          } else {
            await era.printAndWait(
              `「激烈好棒！我的小穴的形状要变成阴茎的形状了啊${heart(1)}」`,
            ); // :2720
          }
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :2723
        era.set(`cflag:${target}:322`, 6); // :2723
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:322`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊啊、嗯！插到里面来了${heart(1)} 啊啊啊…好满啊…${heart(1)}」`,
          ); // :2727
          await era.printAndWait(
            `${player_name}分开了${target_name}被蜜汁沾满的屁股、一口气把阴茎插了进去。`,
          ); // :2728

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「哇啊啊啊啊${heart(1)} 啊啊…嗯…忍不了啊…啊嗯啊啊嗯${heart(1)}」`,
            ); // :2731
            await era.printAndWait(
              `被插到深处的${target_name}的秘裂啾啾的包裹上来、蜜壶像是洗着阴茎一样蠢动着………`,
            ); // :2732
          } else {
            await era.printAndWait(
              `「嗯…啊…啊啊…嗯啊…嗯！就算是把我弄坏…那样激烈也没关系…啊啊…${heart(1)}」`,
            ); // :2734
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「嗯啊嗯…啊嗯…啊…啊啊嗯${heart(1)}」`); // :2737
          await era.printAndWait(
            `${target_name}从后面被插入而摇晃着巨乳、漏出了喘息声。`,
          ); // :2738

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯哈${heart(1)} 我的哪里记住了魔王大人的形状了…啊嗯啊啊嗯…完美的嵌合起来了${heart(1)} 哇啊啊啊啊${heart(1)}」`,
            ); // :2741
            await era.printAndWait(
              `${target_name}被插到深处的蜜壶咬住了阴茎，给予着让人无法忍耐的快乐。`,
            ); // :2742
            await era.printAndWait(
              `沉迷在调教出如此淫乱的身体的感慨里的${player_name}继续激烈的抽送着………`,
            ); // :2743
          } else {
            await era.printAndWait(
              `「啊…啊啊啊${heart(1)} 请把我的那里变成魔王大人的形状吧${heart(1)} 嗯啊啊啊啊${heart(1)}」`,
            ); // :2745
          }
        } else {
          await era.printAndWait(
            `「啊嗯啊哦${heart(1)} 好、激烈、啊啊…我要坏掉了啊！」`,
          ); // :2748
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、为了变得更舒服而专心的反复抽插着。`,
          ); // :2749

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「哈嗯…啊啊…被这么做的话害羞的声音嗯啊哇咕！」`,
            ); // :2752
            await era.printAndWait(
              `从后边被激烈的侵犯的${target_name}的蜜壶好像混入空气似的发出了”扑哧扑哧”的声音。`,
            ); // :2753
            await era.printAndWait(
              `「啊啊…慢、慢一点…请慢一点…呀啊！啊啊！不、不要这么激烈啊！」`,
            ); // :2754
            await era.printAndWait(
              `看到了${target_name}羞耻的姿态的${player_name}继续故意发出声音动着腰………`,
            ); // :2755
          } else {
            await era.printAndWait(
              `「啊啊…我的腰好像不是我的一样…啊嗯${heart(1)} 啊啊嗯${heart(1)}」`,
            ); // :2757
          }
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2760
        era.set(`cflag:${target}:322`, 5); // :2760
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:322`) <= 3 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「啊啊啊！哪里哪里被插的话…嗯啊啊啊！」`); // :2764
          await era.printAndWait(
            `${player_name}每插一次${target_name}都会有敏感的反应。包裹过来的${target_name}的肉壶粘的不得了。`,
          ); // :2765
          await era.printAndWait(
            `${player_name}动着腰，细致的摩擦着${target_name}的腔壁。`,
          ); // :2766
          await era.printAndWait(
            `「啊啊啊…忍不了了啊…嗯啊啊…这么…有感觉…啊啊嗯…啊啊啊——！」`,
          ); // :2767
        } else {
          await era.printAndWait(
            `「啊啊！嗯！咕啊唔…还、还早得很…这么单调的动作…啊啊嗯！」`,
          ); // :2769
          await era.printAndWait(
            `${player_name}把阴茎插进了黏糊糊的包裹过来的${target_name}的蜜壶。`,
          ); // :2770
          await era.printAndWait(
            `享受着只是那样就用敏感的反应来回应的${target_name}的混乱的身姿、${player_name}继续反复的抽送着。`,
          ); // :2771
          await era.printAndWait(
            `「啊！啊！啊啊！…这样…我我…啊呀啊啊啊啊啊！」`,
          ); // :2772
        }
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :2774
        era.set(`cflag:${target}:322`, 4); // :2774
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:322`) <= 2 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「嗯咕…快、快点动吧…看、看什么看…嗯！」`); // :2778
          await era.printAndWait(
            `${player_name}把手插到${target_name}丰满的屁股间掰了开来、${player_name}的阴茎插进了${target_name}的秘裂。`,
          ); // :2779
          await era.printAndWait(
            `因此而可爱的颤抖的屁股。一想到这是自己的东西${player_name}就兴奋了起来、然后感到兴奋的${player_name}开始了激烈的抽送。`,
          ); // :2780
          await era.printAndWait(
            `「啊嗯！啊！啊啊啊！还在想终于开始动了…好、好激烈…呀啊啊啊啊！」`,
          ); // :2781
        } else {
          await era.printAndWait(`「嗯咕咕…嗯唔…咕…啊咕咕咕！」`); // :2783
          await era.printAndWait(
            `${target_name}被${player_name}抓住腰从后面激烈的插了进来、是因为不想因为激烈的运动而忍耐不了发出悲鸣吧，她咬住自己的手腕忍耐着。`,
          ); // :2784
          await era.printAndWait(`「嗯咕…嗯唔唔…唔！咕…呜呜呜呜呜呜！」`); // :2785
        }
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :2787
        era.set(`cflag:${target}:322`, 3); // :2787
      } else if (era0(`cflag:${target}:322`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「哈…哈…嗯咕…嗯…咕——！」`); // :2791
          await era.printAndWait(
            `抓住不知道被狂王插过多少次的${target_name}的丰满的屁股、${player_name}毫不留情的插了进去。`,
          ); // :2792
          await era.printAndWait(`随着从后面被插${target_name}的巨乳摇动着。`); // :2793
          await era.printAndWait(`「啊咕…唔…咕…还挺能干的吗…啊啊啊嗯！」`); // :2794
        } else {
          await era.printAndWait(
            `抓住不知道被狂王插过多少次的${target_name}的丰满的屁股、${player_name}毫不留情的插了进去。`,
          ); // :2796
          await era.printAndWait(
            `「哈呢啊嗯！不要插得那么深！很痛啊！啊啊！」`,
          ); // :2797
          await era.printAndWait(
            `${target_name}因为那粗暴的动作而悲鸣着。为了更多的听到这个声音的${player_name}开始了更激烈的抽送。`,
          ); // :2798
          await era.printAndWait(
            `「嗯啊唔！明、明明说了…不、不要这样…啊啊噶！」`,
          ); // :2799
        }
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :2801
        era.set(`cflag:${target}:322`, 2); // :2801
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (era0(`cflag:${target}:323`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊…啊嗯…哈啊…插进来了…魔王大人的肉棒…啊啊啊啊啊啊${heart(1)}」`,
          ); // :2816
          await era.printAndWait(
            `${target_name}因为被${player_name}的阴茎插入的感觉而挺直了背。`,
          ); // :2817
          await era.printAndWait(
            `蜜壶把阴茎全部吞下，再次失去处女的瞬间、蜜壶好像要融化了一样包裹着${player_name}的阴茎。`,
          ); // :2818
          await era.printAndWait(
            `「啊哈啊啊啊…肉棒肉棒动起来了${heart(1)} 我已经不是处女了${heart(1)}」`,
          ); // :2819
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈…哈啊…魔王大人…魔王大人…啊…啊啊…全部…全部插进来了…${heart(1)}」`,
          ); // :2822
          await era.printAndWait(
            `${target_name}因为被${player_name}抱着、处女被再次夺走的感觉而一脸陶醉。`,
          ); // :2823
          await era.printAndWait(
            `利用自身的重量把阴茎迎入蜜壶深处、感觉着沾着破瓜之血的阴茎的${target_name}与${player_name}接着吻。`,
          ); // :2824
          await era.printAndWait(
            `「嗯啾啾…啾…哈…好幸福…好幸福啊…魔王大人…${heart(1)}」`,
          ); // :2825
        } else {
          await era.printAndWait(
            `「我的…啊…咕哈嗯！啊啊啊啊！处女又被夺走了…啊啊啊！」`,
          ); // :2828
          await era.printAndWait(
            `${target_name}无法${player_name}的手腕中逃开。`,
          ); // :2829
          await era.printAndWait(`「啊啊！不、不要这么摇晃！啊啊啊啊啊——！」`); // :2830
          await era.printAndWait(
            `${target_name}因为处女被夺走而大声的哭泣着…………`,
          ); // :2831
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊哈啊…深深的进来了…啊…啊嗯…啊哈${heart(1)}」`,
          ); // :2837
          await era.printAndWait(
            `${target_name}的蜜壶被阴茎深深的插入，${target_name}发出了甜美的声音。`,
          ); // :2838
          await era.printAndWait(
            `「啊啊嗯啊啊啊哈${heart(1)} 魔王大人…嗯啾啾…嗯啊啊嗯唔——${heart(1)}」`,
          ); // :2839
          await era.printAndWait(
            `${target_name}因为感动而对${player_name}不停地落下接吻之雨………`,
          ); // :2840
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈哈…魔王大人…啊啊…嗯…啊嗯插到伸出来了…啊啊…${heart(1)}」`,
          ); // :2843
          await era.printAndWait(
            `${target_name}因为蜜壶的深处被阴茎插入而高兴地笑着、开始${player_name}接吻。`,
          ); // :2844
          await era.printAndWait(
            `「嗯啾…啾…嗯啊${heart(1)} 还想要继续接吻…啊啊啊${heart(1)}」`,
          ); // :2845
          await era.printAndWait(
            `${player_name}一边和${target_name}的舌头交缠在一起、一边开始动起了腰………`,
          ); // :2846
        } else {
          if (era0(`cflag:${target}:10`) == 1) {
            await era.printAndWait(`「快、快离开…咕咕！」`); // :2851
            await era.printAndWait(
              `为了让${target_name}明白自己已经不是亲卫队长而是牝奴隶、${player_name}最初的调教就是侵犯她。`,
            ); // :2852
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(`「全部插入…啊啊啊啊——！」`); // :2854
              await era.printAndWait(
                `就这样抱着不知道被狂王抱过多少次的${target_name}的腰、${player_name}毫不留情的激烈抽送着。`,
              ); // :2855
              await era.printAndWait(
                `「咕唔哈…啊啊——！快、快离开…！我对你呀…啊啊——！」`,
              ); // :2856
              await era.printAndWait(
                `${player_name}因为从下往上的突刺而敏感的反应着、享受着那个身姿的${player_name}继续不停地反复抽送着………`,
              ); // :2857
            } else {
              await era.printAndWait(
                `「哈啊…全、全都插进来…啊啊…不、不要动了、很懂啊…啊啊」`,
              ); // :2859
              await era.printAndWait(
                `就这样抱着不知道被狂王抱过多少次的${target_name}的腰、${player_name}强行抽送着。`,
              ); // :2860
              await era.printAndWait(
                `「啊嗯！咕…这么顶上来的话我…啊啊啊…哈啊哈啊…啊咕！」`,
              ); // :2861
              await era.printAndWait(
                `${target_name}咬着嘴唇忍耐着${player_name}的动作………`,
              ); // :2862
            }
          } else {
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(`「全部插入…啊啊啊啊——！」`); // :2866
              await era.printAndWait(
                `就这样抱着不知道被狂王抱过多少次的${target_name}的腰、${player_name}毫不留情的激烈抽送着。`,
              ); // :2867
              await era.printAndWait(
                `「咕唔哈…啊啊——！快、快离开…！我对你呀…啊啊——！」`,
              ); // :2868
              await era.printAndWait(
                `${player_name}因为从下往上的突刺而敏感的反应着、享受着那个身姿的${player_name}继续不停地反复抽送着………`,
              ); // :2869
            } else {
              await era.printAndWait(
                `「哈啊…全、全都插进来…啊啊…不、不要动了、很懂啊…啊啊」`,
              ); // :2871
              await era.printAndWait(
                `就这样抱着不知道被狂王抱过多少次的${target_name}的腰、${player_name}强行抽送着。`,
              ); // :2872
              await era.printAndWait(
                `「啊嗯！咕…这么顶上来的话我…啊啊啊…哈啊哈啊…啊咕！」`,
              ); // :2873
              await era.printAndWait(
                `${target_name}咬着嘴唇忍耐着${player_name}的动作………`,
              ); // :2874
            }
          }
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :2879
      era.set(`cflag:${target}:323`, 1); // :2879
      return 0;
    } else {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊…啊嗯…啊啊…插进来了…魔王大人的肉棒…啊啊啊啊啊啊${heart(1)}」`,
          ); // :2887
          await era.printAndWait(
            `${target_name}因为被${player_name}的阴茎插入的感觉而挺直了背。`,
          ); // :2888
          await era.printAndWait(
            `蜜壶把阴茎全部吞下，再次失去处女的瞬间、蜜壶好像要融化了一样包裹着${player_name}的阴茎。`,
          ); // :2889
          await era.printAndWait(
            `「啊哈啊啊啊…肉棒肉棒动起来了${heart(1)} 我已经不是处女了${heart(1)}」`,
          ); // :2890
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「哈…哈啊…魔王大人…魔王大人…啊…啊啊…全部…全部插进来了…${heart(1)}」`,
          ); // :2893
          await era.printAndWait(
            `${target_name}因为被${player_name}抱着、处女被再次夺走的感觉而一脸陶醉。`,
          ); // :2894
          await era.printAndWait(
            `利用自身的重量把阴茎迎入蜜壶深处、感觉着沾着破瓜之血的阴茎的${target_name}与${player_name}接着吻。`,
          ); // :2895
          await era.printAndWait(
            `「嗯啾啾…啾…哈…好幸福…好幸福啊…魔王大人…${heart(1)}」`,
          ); // :2896
        } else {
          await era.printAndWait(
            `「我的…啊…咕哈嗯！啊啊啊啊！处女被你夺走了什么的…啊啊啊！」`,
          ); // :2899
          await era.printAndWait(
            `${target_name}无法${player_name}的手腕中逃开。`,
          ); // :2900
          await era.printAndWait(`「啊啊！不、不要这么摇晃！啊啊啊啊啊——！」`); // :2901
          await era.printAndWait(
            `${target_name}因为处女被夺走而大声的哭泣着…………`,
          ); // :2902
        }
        return 0;
      }

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:323`) <= 8 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哇啊啊啊${heart(1)} 肉棒…肉棒全部在我里面……${heart(1)}」`,
          ); // :2909
          await era.printAndWait(
            `因为${target_name}的蜜壶被阴茎插入到了深处，${target_name}发出了甜美的声音。。`,
          ); // :2910
          await era.printAndWait(
            `「我一个人独占什么的…啊啊这是最棒的幸福了…啊嗯啊啊啊啊嗯${heart(1)}」`,
          ); // :2911
          await era.printAndWait(
            `${target_name}一边像少女那样微笑着，一边淫靡的动着腰品味着快乐………`,
          ); // :2912
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊…魔王大人…肉棒继续插进来啊${heart(1)}」`,
          ); // :2914
          await era.printAndWait(
            `${target_name}抱着${player_name}，腰前后左右的旋转扭动着。`,
          ); // :2915
          await era.printAndWait(
            `「啊啊嗯…想要更激烈的动作想的不得了………啊！啊啊嗯、哈嗯${heart(1)} 啊啊好啊继续向上顶进来吧${heart(1)}」`,
          ); // :2916
          await era.printAndWait(
            `${player_name}配合${target_name}的动作动着腰、聆听着${target_name}野兽一样的喘息声………`,
          ); // :2917
        } else {
          await era.printAndWait(
            `「魔王大人…啊啊啊…继续侵犯我啊…啊嗯停不下来啊………」`,
          ); // :2919
          await era.printAndWait(
            `${target_name}张开双手抱了过来、然后丰满的胸部带给了${player_name}柔软的触感。`,
          ); // :2920
          await era.printAndWait(
            `${player_name}一边享受着那个触感，一边用手抱住${target_name}的腰、用力向上顶着。`,
          ); // :2921
          await era.printAndWait(
            `「啊嗯！啊…啊啊！就是就是想要这个啊${heart(1)} 啊嗯啊啊啊…啊啊——${heart(1)}」`,
          ); // :2922
        }
        // CFLAG:323  = 9（变量语义：CFLAG 族，323） // :2924
        era.set(`cflag:${target}:323`, 9); // :2924
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:323`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哈…啊嗯${heart(1)} 肉棒在和我的子宫口接吻啊${heart(1)} 嗯唔呼…嗯啾啾…${heart(1)}」`,
          ); // :2928
          await era.printAndWait(
            `${target_name}的蜜壶深处被阴茎插入，一边左右动着腰一边和${player_name}接吻。`,
          ); // :2929
          await era.printAndWait(
            `「啾啾…嗯啾${heart(1)} 呼啊…啊哈嗯！${heart(1)} 明、明明还想接吻、腰这样动是犯规的啊${heart(1)}」`,
          ); // :2930
          await era.printAndWait(
            `${target_name}因为蜜壶被向上突刺而身体后仰、就那样和${player_name}抱在一起开始享受了起来………`,
          ); // :2931
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊！我已经离不开魔王大人了…啊啊啊啊嗯${heart(1)}」`,
          ); // :2933
          await era.printAndWait(
            `${target_name}的两脚紧紧地缠住${player_name}的腰、丰满的胸部的柔软触感让${player_name}感觉很舒服。`,
          ); // :2934
          await era.printAndWait(
            `「哈嗯…干脆把我的手脚切掉、当成获得飞机杯来用吧${heart(1)}」`,
          ); // :2935
          await era.printAndWait(
            `${target_name}就那样紧贴着，一边扭着腰一边说出下流的请求。在那个身姿中${player_name}感觉到了爱………`,
          ); // :2936
        } else {
          await era.printAndWait(`「啊啊…爱你…爱你啊${heart(1)}」`); // :2938
          await era.printAndWait(
            `身体紧贴过来的${target_name}的淫靡的气味更浓了。那气味让${player_name}更加兴奋，阴茎更硬了。`,
          ); // :2939
          await era.printAndWait(
            `「哈嗯！我感觉到魔王大人的肉棒更硬了、啊啊…继续顶上来！把我弄得乱七八糟的吧${heart(1)}」`,
          ); // :2940
          await era.printAndWait(
            `${player_name}和${target_name}互相紧紧地抱在一起动着腰、舌头缠绕在一起、品味着快乐………`,
          ); // :2941
        }
        // CFLAG:323  = 8（变量语义：CFLAG 族，323） // :2943
        era.set(`cflag:${target}:323`, 8); // :2943
      } else if (
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:323`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈啊哈啊嗯啊！肉棒肉棒把肚子里填满了…啊啊啊嗯啊咕！」`,
          ); // :2947
          await era.printAndWait(
            `${target_name}用手臂抱着${player_name}，扭动着腰贪求着快乐。`,
          ); // :2948
          await era.printAndWait(`「哦哦啊哦…让人忍不了啊…啊啊嗯啊啊哈」`); // :2949
          await era.printAndWait(
            `${target_name}过于兴奋而${player_name}的耳边漏出了喘息声………`,
          ); // :2950
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `${player_name}用手抚摸着${target_name}的屁股，前后扭动着腰。`,
          ); // :2952
          await era.printAndWait(
            `「咕啊哈哈哈…啊啊！我也、也唔…啊嗯嗯啊…嗯啾…啾…嗯呼…♪」`,
          ); // :2953
          await era.printAndWait(
            `${target_name}忍不住和${player_name}的嘴唇贴在一起，舌头缠绕了起来。`,
          ); // :2954
          await era.printAndWait(
            `「嗯呼…嗯…啾啾…嗯啾啾…啾…嗯哈…继续抱我吧…♪」`,
          ); // :2955
        } else {
          await era.printAndWait(
            `就那样抱着${target_name}抱起来很舒服的腰、${player_name}上下动着腰侵犯着蜜壶。`,
          ); // :2957
          await era.printAndWait(
            `「咕哈哈嗯啊哈！我竟然这么有感觉什么的…啊啊啊啊…嗯咕…嗯啾啾…咕啊…啊啊啊啊…」`,
          ); // :2958
          await era.printAndWait(
            `${player_name}和${target_name}接吻时漏出了甜美的声音，就那样舌头纠缠在一起、那双眼睛已经完全被情欲支配了。`,
          ); // :2959
          await era.printAndWait(`「啾啾…我…我…啊啊啊啊嗯！啊、哇、更多！」`); // :2960
        }
        // CFLAG:323  = 7（变量语义：CFLAG 族，323） // :2962
        era.set(`cflag:${target}:323`, 7); // :2962
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:323`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哈…嗯插得好深啊…啊…啊嗯…啊啊嗯${heart(1)}」`,
          ); // :2966
          await era.printAndWait(
            `${target_name}的蜜壶深处被阴茎插入，${target_name}发出了甜美的喘息声。`,
          ); // :2967

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「魔王大人…魔王大人…嗯啾啾…啾…嗯啾啾…呼啊…${heart(1)}」`,
            ); // :2970
            await era.printAndWait(
              `${target_name}因为感动而对${player_name}不停地落下接吻之雨………`,
            ); // :2971
          } else {
            await era.printAndWait(
              `「哈啊哈啊、啊、啊啊啊…我的小穴要被重构成魔王大人的形状了啊…${heart(1)}」`,
            ); // :2973
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯${heart(1)} 魔王大人魔王大人…啊嗯啊嗯啊啊嗯${heart(1)}」`,
          ); // :2976
          await era.printAndWait(
            `${target_name}抱着${player_name}前后左右的扭动着腰。`,
          ); // :2977

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯啾啾嗯啾啾啾…嗯呼…呼、嗯啾…嗯呼…啊啊嗯…肉棒插到深处来了${heart(1)}」`,
            ); // :2980
            await era.printAndWait(
              `一边接吻一边用腰向上顶着、黏膜和黏膜缠在一起、上面下面都吸在一起。这份快乐是${player_name}与${target_name}所共有的………`,
            ); // :2981
          } else {
            await era.printAndWait(
              `「哈嗯啊啊${heart(1)} 继续调教我的小穴吧${heart(1)}」`,
            ); // :2983
          }
        } else {
          await era.printAndWait(
            `「嗯咕…嗯…啊啊啊嗯${heart(1)} 不、不要离开啊${heart(1)}」`,
          ); // :2986
          await era.printAndWait(
            `${target_name}环绕双臂抱了过来、那丰满的胸部压在${player_name}身上、勃起的乳头在胸口上摩擦着。。`,
          ); // :2987

          if (era0(`abl:${target}:2`) >= 3) {
            if (rand_n(2) == 0) {
              await era.printAndWait(
                `「呵呵呵、当然是故意这么用力的过来的…啊啊、让我的胸部更有感觉吧…${heart(1)}」`,
              ); // :2991
            } else {
              await era.printAndWait(
                `「啊啊嗯…哈啊哈啊…好棒啊${heart(1)} 好棒啊${heart(1)} 就这样彻底的侵犯我的小穴吧${heart(1)}」`,
              ); // :2993
            }
            await era.printAndWait(
              `${player_name}用手臂抱着${target_name}的腰、开始激烈的向上顶着………`,
            ); // :2995
          } else {
            await era.printAndWait(
              `「啊啊！这么被抱着的话…我的胸部也好舒服…啊啊啊${heart(1)}」`,
            ); // :2997
          }
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :3000
        era.set(`cflag:${target}:323`, 6); // :3000
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:323`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嗯哈啊嗯…魔王大人的全都在我里面…啊…啊嗯哈${heart(1)}」`,
          ); // :3004
          await era.printAndWait(
            `${target_name}因为蜜壶的深处被阴茎插入而一边高兴地笑着、一边开始和${player_name}接吻。`,
          ); // :3005

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「嗯啾…啾…嗯啊${heart(1)} 还想继续接吻啊…啊啊啊${heart(1)}」`,
            ); // :3008
            await era.printAndWait(
              `${player_name}和${target_name}舌头缠绕在一起、开始动起了腰………`,
            ); // :3009
          } else {
            await era.printAndWait(
              `「嗯啾啾啾…啊嗯…继续…继续接吻吧…嗯啾${heart(1)}」`,
            ); // :3011
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊…请按照喜好侵犯我吧…魔王大人…${heart(1)}」`,
          ); // :3014
          await era.printAndWait(
            `${target_name}的双腿紧紧地抱住${player_name}的腰、丰满的胸部压在${player_name}身上、勃起的乳头在胸口上摩擦着感觉很舒服。`,
          ); // :3015

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊…嗯呼啊…我的腰擅自…啊嗯动起来了、啊啊好害羞啊啊啊${heart(1)}」`,
            ); // :3018
            await era.printAndWait(
              `${target_name}就那样紧贴着，腰下流的扭动着、品味着${player_name}的阴茎………`,
            ); // :3019
          } else {
            await era.printAndWait(
              `「啊嗯…哈啊…咕！好激烈…好激烈啊…啊啊啊——${heart(1)}」`,
            ); // :3021
          }
        } else {
          await era.printAndWait(`「啊啊…爱你啊…嗯啊嗯嗯哈${heart(1)}」`); // :3024
          await era.printAndWait(
            `被${target_name}身体紧贴的抱着的${player_name}，因为淫靡的香味，好像快要射精了一样。`,
          ); // :3025

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「呵呵呵、这样的表情…魔王大人…啊啊…把我弄得更加乱七八糟的吧…啊嗯啊啊啊${heart(1)}」`,
            ); // :3028
            await era.printAndWait(
              `和${target_name}互相抱在一起的${player_name}向上顶着腰、舌头缠绕在一起、品尝着快乐………`,
            ); // :3029
          } else {
            await era.printAndWait(
              `「啊哈啊…请在我肚子里满满的射精吧…啊啊嗯${heart(1)}」`,
            ); // :3031
          }
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :3034
        era.set(`cflag:${target}:323`, 5); // :3034
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:323`) <= 3 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `抱着${target_name}抱起来很舒服的腰、${player_name}一边前后扭动着腰一边接着吻。`,
          ); // :3038
          await era.printAndWait(
            `「嗯啾…啾…呼啊…哈啊…嗯…继续…嗯啾啾…啊…哈…哈啊啊…♪」`,
          ); // :3039
          await era.printAndWait(
            `不知什么时候${target_name}不再抵抗和${player_name}接吻，舌头缠在一起，被着侵犯蜜壶漏出了喘息声………`,
          ); // :3040
        } else {
          await era.printAndWait(
            `抱着${target_name}抱起来很舒服的腰、${player_name}上下动着腰侵犯着蜜壶。`,
          ); // :3042
          await era.printAndWait(
            `「哈啊哈！不要…再继续的话我…要变的奇怪了…啊啊啊啊——！」`,
          ); // :3043
          await era.printAndWait(
            `${target_name}虽然嘴上不停的抵抗着、却沉溺在了${player_name}给予的快乐里………`,
          ); // :3044
        }
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :3046
        era.set(`cflag:${target}:323`, 4); // :3046
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:323`) <= 2 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `就那样抱着${target_name}抱起来很舒服的腰、${player_name}上下动着腰侵犯着蜜壶。`,
          ); // :3050
          await era.printAndWait(
            `「哈啊哈啊！嗯…咕…啊！哈啊哈啊…啊…不、不行啊…再继续的话…啊嗯！」`,
          ); // :3051
          await era.printAndWait(
            `习惯了被侵犯的${target_name}动着腰配合着${player_name}………`,
          ); // :3052
        } else {
          await era.printAndWait(
            `就那样抱着${target_name}抱起来很舒服的腰、${player_name}上下动着腰侵犯着蜜壶。`,
          ); // :3054
          await era.printAndWait(`「啊咕…咕…还、还差得远呢…啊…啊嗯咕唔！」`); // :3055
          await era.printAndWait(
            `${target_name}被${player_name}抱着，忍耐着被侵犯………`,
          ); // :3056
        }
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :3058
        era.set(`cflag:${target}:323`, 3); // :3058
      } else if (era0(`cflag:${target}:323`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `抓着不知道被狂王抱过多少次的${target_name}的腰、${player_name}毫不留情的激烈抽送着。`,
          ); // :3062
          await era.printAndWait(`「啊啊！太、太激烈了啊…啊咕…咕…啊…啊咕！」`); // :3063
          await era.printAndWait(
            `因为${player_name}从下往上的突刺而敏感的反映着、享受着那个身姿的${player_name}继续反复抽送着………`,
          ); // :3064
        } else {
          await era.printAndWait(
            `抓着不知道被狂王抱过多少次的${target_name}的腰、${player_name}毫不留情的激烈抽送着。`,
          ); // :3066
          await era.printAndWait(`「啊嗯！咕…唔…没什么了不起的…啊咕！」`); // :3067
          await era.printAndWait(
            `${target_name}咬着嘴唇忍耐着${player_name}的动作………`,
          ); // :3068
        }
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :3070
        era.set(`cflag:${target}:323`, 2); // :3070
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (era0(`cflag:${target}:324`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊哈啊…魔王大人的肉棒插到深处来了…啊啊啊最喜欢的肉棒全都插进来了${heart(1)}」`,
          ); // :3085
          await era.printAndWait(
            `${target_name}陶醉在从背后被${player_name}抱着的感觉里、因为把处女奉献给${player_name}的感动而颤抖着。`,
          ); // :3086
          await era.printAndWait(
            `「咕啊…哈啊哈啊…啊嗯${heart(1)} 就是这样…我是魔王大人的东西所以请按照您的喜好随意侵犯吧${heart(1)}」`,
          ); // :3087
          await era.printAndWait(
            `${player_name}慢慢的向上顶着腰、开始侵犯${target_name}的蜜壶………`,
          ); // :3088
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${target_name}自己分开双腿、用手把${player_name}的阴茎引导向了秘裂插了进去、因为失去处女的感觉而颤抖着。`,
          ); // :3091
          await era.printAndWait(
            `「啊啊嗯…魔王大人${heart(1)} 魔王大人的进来了啊${heart(1)} 啊啊…啊…好深${heart(1)}」`,
          ); // :3092
          await era.printAndWait(
            `看着因为处女膜被贯穿，蜜壶深处被侵犯而发出欢喜的声音的${target_name}、${player_name}开始向上抽送了起来。`,
          ); // :3093
          await era.printAndWait(
            `「啊啊啊…哈…啊啊嗯…我是魔王大人的东西啊${heart(1)}」`,
          ); // :3094
        } else {
          await era.printAndWait(
            `「啊啊！不要这么分开我的脚啊！咕唔…哈、啊、插进来了啊…啊呀！」`,
          ); // :3097
          await era.printAndWait(
            `${player_name}抓住${target_name}的大腿向上挺着腰、一口气夺走了处女。`,
          ); // :3098
          await era.printAndWait(`「哈咕！唔啊…啊啊！不、不要啊！」`); // :3099
          await era.printAndWait(
            `${target_name}因为处女被再次夺走的疼痛而大声哭泣着………`,
          ); // :3100
        }

        if (era0(`tequip:${target}:57`)) {
          await era.print(''); // :3104

          if (era0(`abl:${target}:17`) >= 1) {
            if (era0(`talent:${target}:76`) == 1) {
              await era.printAndWait(
                `「哈啊啊${heart(1)} 魔王大人粗大的肉棒插进来了…啊啊${heart(1)} 」`,
              ); // :3109
              await era.printAndWait(
                `${target_name}看到镜子中流着血的自己的秘裂和${player_name}的阴茎而兴奋了起来………`,
              ); // :3110
            } else if (era0(`talent:${target}:85`) == 1) {
              await era.printAndWait(
                `「啊啊啊${heart(1)} 好高兴啊…这样流血…奉上我的纯洁…啊啊${heart(1)}」`,
              ); // :3113
              await era.printAndWait(
                `${target_name}因为大镜中映出的破瓜之血而兴奋着………`,
              ); // :3114
            } else {
              await era.printAndWait(
                `「哈啊哈啊…我的哪里…啊啊！又被血染红了…啊啊……」`,
              ); // :3117
              await era.printAndWait(
                `${target_name}满脸通红的颤抖、并不仅仅是因为大镜中映出的痴态而害羞吧………`,
              ); // :3118
            }
          } else {
            if (era0(`talent:${target}:76`) == 1) {
              await era.printAndWait(
                `「哈唔…我的血把魔王大人的肉棒弄脏了…如果可以的话打扫的工作也请交给我吧${heart(1)}」`,
              ); // :3124
              await era.printAndWait(
                `看着大镜中映出的自己的痴态、${target_name}对镜子中的${player_name}眨了眨眼………`,
              ); // :3125
            } else if (era0(`talent:${target}:85`) == 1) {
              await era.printAndWait(`「好、好害羞啊…啊啊、破瓜之血这么………」`); // :3128
              await era.printAndWait(
                `看着大镜中再次失去处女的身姿，${target_name}的脸染上了因为害羞的红色………`,
              ); // :3129
            } else {
              await era.printAndWait(`「啊…啊啊…流了这么多血…咕…呜呜！」`); // :3132
              await era.printAndWait(
                `看着大镜中映出的可怜的样子，${target_name}流出了悔恨的泪水………`,
              ); // :3133
            }
          }
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊啊啊…虽然看不见魔王大人的脸…这样也不错啊${heart(1)} 啊啊啊嗯哈啊啊${heart(1)}」`,
          ); // :3141
          await era.printAndWait(
            `${target_name}一边因为蜜壶深处被插入而发出了喘息，一边前后左右的扭动着腰。`,
          ); // :3142
          await era.printAndWait(
            `「来吧…也玩弄我的胸部和阴蒂吧${heart(1)} 请玩弄它们吧${heart(1)}」`,
          ); // :3143
          await era.printAndWait(
            `${target_name}引导着${player_name}的手、追求着更高的快感………`,
          ); // :3144
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…被魔王大人用这么害羞的姿势侵犯${heart(1)} 啊啊啊${heart(1)} 好有感觉啊${heart(1)}」`,
          ); // :3147
          await era.printAndWait(
            `${player_name}就那样抓住${target_name}的双腿，随着身后的摇动${target_name}的口中漏出了甜美的声音。`,
          ); // :3148
          await era.printAndWait(
            `「啊啊…哈啊哈啊…啊嗯…继续侵犯我吧…啊啊啊${heart(1)}」`,
          ); // :3149
          await era.printAndWait(
            `${player_name}一开始刺激${target_name}的巨乳和秘裂，就又传来了好听的声音………`,
          ); // :3150
        } else {
          if (era0(`cflag:${target}:10`) == 1) {
            await era.printAndWait(
              `为了让${target_name}明白自己已经不是亲卫队长而是牝奴隶、${player_name}最初的调教就是侵犯她。`,
            ); // :3155
            await era.printAndWait(
              `「啊啊！快、快离开！我这个样子…被狂王大人以外…啊啊！」`,
            ); // :3156
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(
                `「不要这样分开我的腿啊！啊…咕唔——！全、全部插进来了啊！」`,
              ); // :3158
              await era.printAndWait(
                `${player_name}大大的分开${target_name}的双腿、从后面一口气插了进去。`,
              ); // :3159
              await era.printAndWait(
                `「哇！啊啊啊——！不要不要！救救我狂王大人！」`,
              ); // :3160
              await era.printAndWait(
                `${target_name}因为从后面被揉着胸部，向上插着而敏感的反应着、发出了悲鸣………`,
              ); // :3161
            } else {
              await era.printAndWait(`「呜咕…！还、还差得远呢…啊…哇啊啊！」`); // :3163
              await era.printAndWait(
                `${player_name}大大的分开${target_name}的双腿、从后面慢慢的插了进去。`,
              ); // :3164
              await era.printAndWait(
                `「哈啊哈啊…这样完全没什么大不了的…啊咕…咕………」`,
              ); // :3165
              await era.printAndWait(
                `${target_name}因为从后面被揉着胸部，蜜壶被向上顶着而发出了模糊不清的悲鸣………`,
              ); // :3166
            }
          } else {
            if (era0(`abl:${master}:12`) > 5) {
              await era.printAndWait(
                `「不要这样分开我的腿啊！啊…咕唔——！全、全部插进来了啊！」`,
              ); // :3170
              await era.printAndWait(
                `${player_name}大大的分开${target_name}的双腿、从后面一口气插了进去。`,
              ); // :3171
              await era.printAndWait(
                `「哇啊！啊啊啊——！好、好深啊…咕呜呜…啊啊——！」`,
              ); // :3172
              await era.printAndWait(
                `${target_name}因为从后面被揉着胸部，向上插着而敏感的反应着、发出了悲鸣………`,
              ); // :3173
            } else {
              await era.printAndWait(`「呜咕…！还、还差得远呢…啊…哇啊啊！」`); // :3175
              await era.printAndWait(
                `${player_name}大大的分开${target_name}的双腿、从后面慢慢的插了进去。`,
              ); // :3176
              await era.printAndWait(
                `「哈啊哈啊…不再稍微认真一点的话…嗯！咕！…我是不会陷落的…啊啊！」`,
              ); // :3177
              await era.printAndWait(
                `${target_name}因为从后面被揉着胸部，蜜壶被向上顶着而发出了模糊不清的悲鸣………`,
              ); // :3178
            }
          }
          if (era0(`tequip:${target}:57`)) {
            await era.print(''); // :3182

            if (era0(`abl:${target}:17`) >= 1) {
              if (era0(`talent:${target}:76`) == 1) {
                await era.printAndWait(
                  `「哈嗯…快看快看…我的小穴被肉棒插进来了，魔王大人的肉棒${heart(1)}」`,
                ); // :3187
                await era.printAndWait(
                  `${target_name}因为大镜中自己的痴态而喘息着………`,
                ); // :3188
              } else if (era0(`talent:${target}:85`) == 1) {
                await era.printAndWait(
                  `「啊啊啊…我是如此的被魔王大人疼爱啊…啊啊好高兴…好高兴啊${heart(1)}」`,
                ); // :3191
                await era.printAndWait(
                  `${target_name}因为大镜中映出的自己的痴态而娇喘着………`,
                ); // :3192
              } else {
                await era.printAndWait(
                  `「啊、啊啊…不要…我的哪里全部被看到了…呀啊咦…呀啊啊啊！」`,
                ); // :3195
                await era.printAndWait(
                  `${target_name}一想到大镜中映出的自己的痴态，秘裂就不禁更紧了………`,
                ); // :3196
              }
            } else {
              if (era0(`talent:${target}:76`) == 1) {
                await era.printAndWait(
                  `「啊啊${heart(1)} 魔王大人的手下流的玩弄着我的身体…啊啊啊…」`,
                ); // :3201
                await era.printAndWait(
                  `${target_name}因为大镜中映出的自己的痴态，耳朵都变红了………`,
                ); // :3202
              } else if (era0(`talent:${target}:85`) == 1) {
                await era.printAndWait(
                  `「好、好害羞啊…啊…啊啊！啊唔！不、不要这么插啊！」`,
                ); // :3205
                await era.printAndWait(
                  `${target_name}因为大镜中映出的自己的痴态而满脸通红的高声娇喘着………`,
                ); // :3206
              } else {
                await era.printAndWait(
                  `「咕…不要…不要啊…我不想看啊…啊啊啊………」`,
                ); // :3209
                await era.printAndWait(
                  `${target_name}把视线从大镜中映出的自己的痴态哪里移开了………`,
                ); // :3210
              }
            }
          }
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :3216
      era.set(`cflag:${target}:324`, 1); // :3216
      return 0;
    } else {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊哈啊…魔王大人的肉棒插到深处来了…啊啊啊最喜欢的肉棒全部插到我里面来了${heart(1)}」`,
          ); // :3224
          await era.printAndWait(
            `${target_name}一边陶醉在被${player_name}从后面抱住的感觉里、一边因把处女奉献给${player_name}的感动而颤抖着。`,
          ); // :3225
          await era.printAndWait(
            `「咕哈…哈哈…啊嗯${heart(1)} 就是这样…我是魔王大人的东西所以请按照您的喜好随意侵犯吧${heart(1)}」`,
          ); // :3226
          await era.printAndWait(
            `${player_name}慢慢的向上顶着腰、开始侵犯${target_name}的蜜壶………`,
          ); // :3227
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${target_name}自己分开双腿、用手把${player_name}的阴茎引导向了秘裂插了进去、因为失去处女的感觉而颤抖着。`,
          ); // :3230
          await era.printAndWait(
            `「啊啊嗯…魔王大人${heart(1)} 魔王大人的进来了啊${heart(1)} 啊啊…啊…好深${heart(1)}」`,
          ); // :3231
          await era.printAndWait(
            `看着因为处女膜被贯穿，蜜壶深处被侵犯而发出欢喜的声音的${target_name}、${player_name}开始向上抽送了起来。`,
          ); // :3232
          await era.printAndWait(
            `「啊啊啊…哈…啊啊嗯…我是魔王大人的东西啊${heart(1)}」`,
          ); // :3233
        } else {
          await era.printAndWait(
            `「啊啊！不要这么分开我的脚啊！咕唔…哈、啊、插进来了啊…啊呀！」`,
          ); // :3236
          await era.printAndWait(
            `${player_name}抓住${target_name}的大腿向上挺着腰、一口气夺走了处女。`,
          ); // :3237
          await era.printAndWait(`「哈咕！唔啊…啊啊！不、不要啊！」`); // :3238
          await era.printAndWait(
            `${target_name}因为处女被再次夺走的疼痛而大声哭泣着………`,
          ); // :3239
        }

        if (era0(`tequip:${target}:57`)) {
          await era.print(''); // :3243

          if (era0(`abl:${target}:17`) >= 1) {
            if (era0(`talent:${target}:76`) == 1) {
              await era.printAndWait(
                `「哈啊啊${heart(1)} 魔王大人粗大的肉棒插进来了…啊啊${heart(1)} 」`,
              ); // :3248
              await era.printAndWait(
                `${target_name}看到镜子中流着血的自己的秘裂和${player_name}的阴茎而兴奋了起来………`,
              ); // :3249
            } else if (era0(`talent:${target}:85`) == 1) {
              await era.printAndWait(
                `「啊啊啊${heart(1)} 好高兴啊…这样流血…奉上我的纯洁…啊啊${heart(1)}」`,
              ); // :3252
              await era.printAndWait(
                `${target_name}因为大镜中映出的破瓜之血而兴奋着………`,
              ); // :3253
            } else {
              await era.printAndWait(
                `「哈啊哈啊…我的哪里…啊啊！又被血染红了…啊啊……」`,
              ); // :3256
              await era.printAndWait(
                `${target_name}满脸通红的颤抖、并不仅仅是因为大镜中映出的痴态而害羞吧………`,
              ); // :3257
            }
          } else {
            if (era0(`talent:${target}:76`) == 1) {
              await era.printAndWait(
                `「哈唔…我的血把魔王大人的肉棒弄脏了…如果可以的话打扫的工作也请交给我吧${heart(1)}」`,
              ); // :3263
              await era.printAndWait(
                `看着大镜中映出的自己的痴态、${target_name}对镜子中的${player_name}眨了眨眼………`,
              ); // :3264
            } else if (era0(`talent:${target}:85`) == 1) {
              await era.printAndWait(`「好、好害羞啊…啊啊、破瓜之血这么………」`); // :3267
              await era.printAndWait(
                `看着大镜中再次失去处女的身姿，${target_name}的脸染上了因为害羞的红色………`,
              ); // :3268
            } else {
              await era.printAndWait(`「啊…啊啊…流了这么多血…咕…呜呜！」`); // :3271
              await era.printAndWait(
                `看着大镜中映出的可怜的样子，${target_name}流出了悔恨的泪水………`,
              ); // :3272
            }
          }
        }
        return 0;
      }

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:324`) <= 8 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「肉棒插到深处来了…啊啊啊肉棒最喜欢了${heart(1)} 啊啊啊——${heart(1)}」`,
          ); // :3281
          await era.printAndWait(
            `${target_name}因为蜜壶的深处被插入而发出高兴的声音，前后左右的扭动着腰。`,
          ); // :3282
          await era.printAndWait(
            `「啊啊啊最喜欢的肉棒插到深处${heart(1)} 啊哈嗯${heart(1)} 就、就是这样、继续插进来吧${heart(1)}」`,
          ); // :3283
          await era.printAndWait(
            `${player_name}因为${target_name}不成体统的声音苦笑着，两人都互相贪求着快乐而动起了腰………`,
          ); // :3284
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人…我好舒服${heart(1)} 舒服的脑袋里面都快要变的奇怪了啊${heart(1)}」`,
          ); // :3286
          await era.printAndWait(
            `${target_name}自己大大的分开双腿，让阴茎侵犯着蜜壶。${player_name}随意的蹂躏着蜜壶。`,
          ); // :3287
          await era.printAndWait(
            `「肉棒肉棒好舒服${heart(1)} 把我侵犯到坏掉吧${heart(1)} 啊哈哈啊哈啊嗯${heart(1)}」`,
          ); // :3288
          await era.printAndWait(
            `脑袋已经完全融化了的${target_name}随着阴茎的抽送而发出了下流的词语和喘息。`,
          ); // :3289
          await era.printAndWait(
            `「啊哈子宫要坏掉了…我的子宫要被肉棒击溃了啊${heart(1)} 啊啊啊啊——${heart(1)}」`,
          ); // :3290
        } else {
          await era.printAndWait(
            `「啊啊啊啊啊啊${heart(1)} 把我的小穴也好阴蒂也好胸部也好…都弄得乱七八糟的吧…${heart(1)}」`,
          ); // :3292
          await era.printAndWait(
            `${target_name}被${player_name}进攻着三点而不停地发出野兽一样的呻吟。`,
          ); // :3293
          await era.printAndWait(
            `「哈啊嗯啊啊啊哈嗯${heart(1)} 我太有感觉了啊嗯啊啊…要不行了啊${heart(1)}」`,
          ); // :3294
          await era.printAndWait(
            `${player_name}用手指按下乳头撵动阴蒂、随着阴蒂转动而飞溅出了爱液。然后随着忽然向上用阴茎攻击着子宫，从${target_name}的嘴中溢出了娇喘。`,
          ); // :3295
          await era.printAndWait(
            `「啊啊啊啊嗯啊啊哈啊…啊咦咦咦咦咦咦咦咦咦咦${heart(1)} 啊哦哦…哦…哦哦哦哦哦哦哦…${heart(1)}」`,
          ); // :3296
        }
        // CFLAG:324  = 9（变量语义：CFLAG 族，324） // :3298
        era.set(`cflag:${target}:324`, 9); // :3298
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:324`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哈啊${heart(1)} 肉棒满满的插进我的小穴里来了啊${heart(1)} 啊啊啊啊哦啊啊啊啊${heart(1)}」`,
          ); // :3302
          await era.printAndWait(
            `随着${player_name}抱着${target_name}的双腿激烈的向上插着，从${target_name}的口中漏出了野兽般的喘息声。`,
          ); // :3303
          await era.printAndWait(
            `然后一边被玩弄着肥大的乳头一边扭动着腰、${target_name}发出了更高亢的声音。`,
          ); // :3304
          await era.printAndWait(
            `「啊哈啊啊啊啊啊！啊啊${heart(1)} 啊哈啊啊啊啊啊${heart(1)} 胸部…胸部也好舒服啊啊啊啊啊啊${heart(1)}」`,
          ); // :3305
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊…继续抱我吧…我太有感觉真的好像要飞起来了一样…啊啊${heart(1)}」`,
          ); // :3307
          await era.printAndWait(
            `为了回报${target_name}的愿望的${player_name}从后面抱住她、向上挺着腰。`,
          ); // :3308
          await era.printAndWait(
            `「咦呀啊${heart(1)} 好厉害的要来了要来了${heart(1)} 啊啊啊啊啊啊啊${heart(1)}」`,
          ); // :3309
          await era.printAndWait(
            `每次被向上顶着${target_name}被开发了的蜜壶都好像要融化了一样、缠绕着${player_name}的阴茎。`,
          ); // :3310
          await era.printAndWait(
            `「啊啊嗯${heart(1)} 这样这样好舒服啊！啊哈啊啊咦啊啊啊${heart(1)}」`,
          ); // :3311
        } else {
          await era.printAndWait(
            `「啊啊${heart(1)} 我的身体已经不行了、只是被魔王大人抱着就好像快要坏掉了那样有感觉${heart(1)}」`,
          ); // :3313
          await era.printAndWait(
            `${target_name}因为被${player_name}爱抚着身体，从后面插着而发出甜美的喘息。`,
          ); // :3314
          await era.printAndWait(
            `然后为了更高的快感而自己动着腰，贪求着${player_name}的阴茎。`,
          ); // :3315
          await era.printAndWait(
            `「哈嗯…继续继续${heart(1)} 啊啊子宫口要坏掉了要坏掉了${heart(1)} 哈！啊嗯嗯嗯啊啊啊啊啊${heart(1)}」`,
          ); // :3316
        }
        // CFLAG:324  = 8（变量语义：CFLAG 族，324） // :3318
        era.set(`cflag:${target}:324`, 8); // :3318
      } else if (
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:324`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈啊哈啊…啊哈嗯${heart(1)} 肉棒插到深处来了…哈、哈…哈咕——！」`,
          ); // :3322
          await era.printAndWait(
            `${target_name}被从下面插着蜜壶侵犯着，发出了野兽一样的声音。`,
          ); // :3323
          await era.printAndWait(
            `「啊嗯…请抓住胸部啊${heart(1)} 啊咦咦咦咦咦！把我弄得乱七八糟的吧！」`,
          ); // :3324
          await era.printAndWait(
            `体内被${player_name}蹂躏着的${target_name}发出了欢喜的绝叫………`,
          ); // :3325
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哦啊啊…继续插我的小穴…哈嗯啊啊！啊啊嗯啊啊嗯${heart(1)}」`,
          ); // :3327
          await era.printAndWait(
            `${target_name}就那样被${player_name}从后面抱着，爱抚着乳房和阴蒂，发出着娇喘。`,
          ); // :3328
          await era.printAndWait(
            `「唔呀咦咦…这样最棒了啊呀啊啊呀啊啊啊啊！啊啊啊啊啊嗯${heart(1)}」`,
          ); // :3329
          await era.printAndWait(
            `${target_name}因为被给予的快感脑袋都要融化掉了，就那样发出了不清醒的呻吟………`,
          ); // :3330
        } else {
          await era.printAndWait(
            `「啊嗯啊嗯啊嗯继续插进来${heart(1)} 把我弄坏吧${heart(1)}」`,
          ); // :3332
          await era.printAndWait(
            `${target_name}大大的张开双腿扭着腰、接受着${player_name}的突刺。`,
          ); // :3333
          await era.printAndWait(
            `「哈嗯嗯…呀啊${heart(1)} 好棒肉棒好棒${heart(1)}」`,
          ); // :3334
          await era.printAndWait(
            `已经是性爱狂的${target_name}发出着野兽一样的叫声继续被${player_name}侵犯着………`,
          ); // :3335
        }
        // CFLAG:324  = 7（变量语义：CFLAG 族，324） // :3337
        era.set(`cflag:${target}:324`, 7); // :3337
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:324`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「虽然看不见魔王大人的脸果然好寂寞…但是肉棒插到深处的感觉好棒${heart(1)} 啊啊啊——${heart(1)}」`,
          ); // :3341
          await era.printAndWait(
            `${target_name}的蜜壶被插到深处而发出着喘息，腰前后左右扭动着。`,
          ); // :3342

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「快来吧…玩弄我的胸部和阴蒂吧${heart(1)} 请玩弄它们吧${heart(1)}」`,
            ); // :3345
            await era.printAndWait(
              `${target_name}引导着${player_name}的手、追求者进一步的快感………`,
            ); // :3346
          } else {
            await era.printAndWait(
              `「啊啊嗯啊嗯啊啊嗯${heart(1)} 我的小穴里好满…啊嗯好舒服啊${heart(1)}」`,
            ); // :3348
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯啊嗯啊啊嗯${heart(1)} 魔王大人…让我更加舒服吧${heart(1)}」`,
          ); // :3351
          await era.printAndWait(
            `${target_name}自己大大的分开双腿，把阴茎引导进了小穴。那触感让${player_name}禁不住漏出了喘息。`,
          ); // :3352

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「哈啊哈啊…哇啊啊啊嗯${heart(1)} 小穴里…被肉棒填满了啊${heart(1)}」`,
            ); // :3355
            await era.printAndWait(
              `${player_name}无意识的抓住${target_name}的巨乳，从后面挺着腰。`,
            ); // :3356
            await era.printAndWait(
              `「呀啊嗯${heart(1)} 要、要来了啊…啊啊继续…继续侵犯我${heart(1)}」`,
            ); // :3357
          } else {
            await era.printAndWait(
              `「呼啊啊啊啊啊啊${heart(1)} 魔王大人也很舒服吧？啊嗯！那就变得更舒服吧${heart(1)}」`,
            ); // :3359
            await era.printAndWait(
              `${target_name}的腰前后扭动着，开始奉仕${player_name}………`,
            ); // :3360
          }
        } else {
          await era.printAndWait(
            `「啊啊啊啊啊啊${heart(1)} 把我的小穴也好阴蒂也好胸部也好…都弄得乱七八糟的吧…${heart(1)}」`,
          ); // :3363
          await era.printAndWait(
            `${target_name}被${player_name}进攻着三点而不停地发出野兽一样的呻吟。`,
          ); // :3364

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊嗯…就、就这样侵犯我的小穴吧…${heart(1)} 求、求你了啊…啊啊啊${heart(1)}」`,
            ); // :3367
            await era.printAndWait(
              `大概是在回应${target_name}的愿望、${player_name}开始向上挺着腰侵犯着蜜壶………`,
            ); // :3368
          } else {
            await era.printAndWait(
              `「咕哈哈哈哈啊…啊嗯啊啊啊嗯${heart(1)} 这样拉乳头的话…要裂开了啊！啊啊但是好舒服${heart(1)} 呼啊啊啊啊啊啊${heart(1)}」`,
            ); // :3371
            await era.printAndWait(
              `${target_name}的巨乳就像玩具那样被${player_name}不停玩弄着。然后随着被玩弄，秘裂紧紧包裹着${player_name}的阴茎………`,
            ); // :3372
          }
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :3375
        era.set(`cflag:${target}:324`, 6); // :3375
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:324`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊…这个姿势被侵犯${heart(1)} 啊啊啊${heart(1)} 太有感觉了啊${heart(1)}」`,
          ); // :3379
          await era.printAndWait(
            `随着${player_name}抱着${target_name}的双腿从后面晃着腰，${target_name}的嘴中漏出了甜美的声音。`,
          ); // :3380

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `然后随着巨乳和阴蒂被玩弄，扭动着腰部的${target_name}发出了更甜美的声音。`,
            ); // :3383
            await era.printAndWait(
              `「哈嗯${heart(1)} 呼啊、啊、呼啊啊啊啊啊…最棒了啊…${heart(1)}」`,
            ); // :3384
          } else {
            await era.printAndWait(
              `「啊啊…哈啊哈啊…啊啊嗯…继续自由的使用我吧…啊啊啊${heart(1)}」`,
            ); // :3386
            await era.printAndWait(
              `${player_name}开始刺激${target_name}的巨乳和秘裂之后，传来了更动听的声音………`,
            ); // :3387
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯…这个姿势的话看不见魔王大人的脸所以我不太喜欢…啊啊所以至少请好好的抱我吧…♪」`,
          ); // :3390
          await era.printAndWait(
            `为了回应${target_name}的那个愿望，${player_name}从后面抱着她、挺起了腰。`,
          ); // :3391

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊嗯！嗯啊啊啊嗯${heart(1)} 好、好厉害的要来了…啊啊啊啊啊${heart(1)}」`,
            ); // :3394
            await era.printAndWait(
              `${target_name}从后面被插着，被开发了的蜜壶好像要融化了一样、缠绕着${player_name}的阴茎。`,
            ); // :3395
            await era.printAndWait(
              `「啊啊嗯${heart(1)} 好、好深啊…要、要来了啊…啊啊啊${heart(1)}」`,
            ); // :3396
          } else {
            await era.printAndWait(
              `「啊哈嗯…嗯啊啊啊啊…好棒啊${heart(1)} 就这样用我舒服起来吧${heart(1)}」`,
            ); // :3398
          }
        } else {
          await era.printAndWait(
            `「啊啊嗯啊嗯啊哈${heart(1)} 哈啊哈啊…我的身体…请继续随意使用吧${heart(1)}」`,
          ); // :3401
          await era.printAndWait(
            `${target_name}把身体托付给${player_name}、陶醉在被从下往上突刺的快感里。`,
          ); // :3402

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `然后还想要更多快感的${target_name}开始自己动起了腰。`,
            ); // :3405
            await era.printAndWait(
              `「啊啊啊啊啊啊${heart(1)} 好、好棒啊…${heart(1)} 好…好舒服${heart(1)} 啊嗯啊啊啊啊嗯${heart(1)}」`,
            ); // :3406
            await era.printAndWait(
              `那动作虽然开始只是配合${player_name}的动作、但是为了追求更高的快感而渐渐变快了………`,
            ); // :3407
          } else {
            await era.printAndWait(
              `「啊啊…啊${heart(1)} 呼、啊、呼啊啊啊啊…我的里面变得咕啾咕啾的了啊…${heart(1)}」`,
            ); // :3409
            await era.printAndWait(
              `${target_name}身体发着抖、继续被${player_name}侵犯着………`,
            ); // :3410
          }
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :3413
        era.set(`cflag:${target}:324`, 5); // :3413
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:324`) <= 3 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「哈啊哈啊…我被玩弄到这种地步什么的…啊啊…啊嗯…呼啊啊啊啊啊」`,
          ); // :3417
          await era.printAndWait(
            `${target_name}从下面被插入侵犯着蜜壶、不自觉地发出了甜美的喘息。`,
          ); // :3418
          await era.printAndWait(
            `「哈啊哈啊…啊咦…不要抓我的胸部啊…啊啊那、那里也不行————…呼哇啊啊啊啊啊！」`,
          ); // :3419
          await era.printAndWait(
            `${target_name}像${player_name}手弹奏的乐器一样发出这声响………`,
          ); // :3420
        } else {
          await era.printAndWait(
            `「啊啊！这样…啊嗯哈啊哈啊…啊嗯咕！我…我…啊啊！」`,
          ); // :3422
          await era.printAndWait(
            `${target_name}因为${player_name}粗暴的突刺而发出了痛苦的呻吟、然而偶尔那声音中也会混入甘甜的音色。`,
          ); // :3423
          await era.printAndWait(
            `「哈啊哈啊！这种程度的话我…嗯啊不行啊不要碰胸部和哪里啊！」`,
          ); // :3424
          await era.printAndWait(
            `${target_name}因为巨乳、阴蒂、蜜壶三点被玩弄而不自觉的发出绝叫………`,
          ); // :3425
        }
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :3427
        era.set(`cflag:${target}:324`, 4); // :3427
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:324`) <= 2 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「啊哦咕唔…啊！哈啊哈啊…嗯…咕！」`); // :3431
          await era.printAndWait(
            `${target_name}被${player_name}的手大大的分开双腿、从后面激烈的侵犯着。`,
          ); // :3432
          await era.printAndWait(
            `「啊啊…再、再继续这样的话我！嗯啊嗯咕…啊啊啊！」`,
          ); // :3433
          await era.printAndWait(
            `继续被${player_name}从后面摘取乳头和阴蒂而继续娇喘着………`,
          ); // :3434
        } else {
          await era.printAndWait(
            `「啊啊嗯咕…更加注意一下我的身体状况来动行吗？」`,
          ); // :3436
          await era.printAndWait(
            `${player_name}抱着${target_name}激烈的向上挺着腰。`,
          ); // :3437
          await era.printAndWait(
            `「啊嗯！咕啊！你真是毫不留情啊…啊嗯啊！胸部被这么抓的话…咕！」`,
          ); // :3438
          await era.printAndWait(
            `${target_name}的腰被抓住，想要逃走也只是让${player_name}更享受而已………`,
          ); // :3439
        }
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :3441
        era.set(`cflag:${target}:324`, 3); // :3441
      } else if (era0(`cflag:${target}:324`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「不要把两腿分的这么开啊！啊…咕呜呜——！全、全都插进来了啊！」`,
          ); // :3445
          await era.printAndWait(
            `${player_name}大大的分开${target_name}的双腿、从后面一口气插了进去。`,
          ); // :3446
          await era.printAndWait(
            `「哇啊！啊啊啊——！好、好深啊…咕呜呜…啊啊——！」`,
          ); // :3447
          await era.printAndWait(
            `${target_name}从后面被揉则胸向上插着而敏感的反映着、发出着悲鸣………`,
          ); // :3448
        } else {
          await era.printAndWait(`「呜咕…！还、还差得远呢…啊…哇啊啊！」`); // :3450
          await era.printAndWait(
            `${player_name}大大的分开${target_name}的双腿、从后面慢慢的插了进去。。`,
          ); // :3451
          await era.printAndWait(
            `「哈啊哈啊…不再稍微认真一点的话…嗯！咕！…我是不会陷落的…啊啊！」`,
          ); // :3452
          await era.printAndWait(
            `${target_name}因为从后面被揉着胸部，蜜壶被向上顶着而发出了模糊不清的悲鸣………`,
          ); // :3453
        }
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :3455
        era.set(`cflag:${target}:324`, 2); // :3455
      }

      if (era0(`tequip:${target}:57`)) {
        await era.print(''); // :3459

        if (era0(`abl:${target}:17`) >= 1) {
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「哈嗯…快看快看…我的小穴被肉棒插进来了，魔王大人的肉棒${heart(1)}」`,
            ); // :3464
            await era.printAndWait(
              `${target_name}因为大镜中自己的痴态而喘息着………`,
            ); // :3465
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊啊…我是如此的被魔王大人疼爱啊…啊啊好高兴…好高兴啊${heart(1)}」`,
            ); // :3468
            await era.printAndWait(
              `${target_name}因为大镜中映出的自己的痴态而娇喘着………`,
            ); // :3469
          } else {
            await era.printAndWait(
              `「啊、啊啊…不要…我的哪里全部被看到了…呀啊咦…呀啊啊啊！」`,
            ); // :3472
            await era.printAndWait(
              `${target_name}一想到大镜中映出的自己的痴态，秘裂就不禁更紧了………`,
            ); // :3473
          }
        } else {
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「啊啊${heart(1)} 魔王大人的手下流的玩弄着我的身体…啊啊啊…」`,
            ); // :3478
            await era.printAndWait(
              `${target_name}因为大镜中映出的自己的痴态，耳朵都变红了………`,
            ); // :3479
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「好、好害羞啊…啊…啊啊！啊唔！不、不要这么插啊！」`,
            ); // :3482
            await era.printAndWait(
              `${target_name}因为大镜中映出的自己的痴态而满脸通红的高声娇喘着………`,
            ); // :3483
          } else {
            await era.printAndWait(`「咕…不要…不要啊…我不想看啊…啊啊啊………」`); // :3486
            await era.printAndWait(
              `${target_name}把视线从大镜中映出的自己的痴态哪里移开了………`,
            ); // :3487
          }
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (era0(`cflag:${target}:327`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊哈啊…请给我肉棒…从肛门插进来！侵犯我吧${heart(1)}」`,
          ); // :3504
          await era.printAndWait(
            `${target_name}叫喊着下流的话诱惑着${player_name}。${player_name}苦笑着，一口气贯穿了肛门。`,
          ); // :3505
          await era.printAndWait(
            `「噶哈…哈哈${heart(1)} 现在我要飞起来了…啊啊啊嗯啊哈啊啊嗯${heart(1)}」`,
          ); // :3506
        } else {
          await era.printAndWait(
            `「啊嗯…我也会继续开放肛门的、所以毫不留情的用肉棒侵犯我吧${heart(1)}」`,
          ); // :3508
          await era.printAndWait(
            `听到${target_name}的话，${player_name}一口气插进了未开发的肛门。`,
          ); // :3509
          await era.printAndWait(
            `「呀啊啊啊啊！真、真的毫不留情…啊啊最喜欢魔王大人了…${heart(1)}」`,
          ); // :3510
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好侵犯吧${heart(1)}…啊嗯啊啊嗯${heart(1)}」`,
          ); // :3515
          await era.printAndWait(
            `${target_name}被充分开发的肛门轻易吞下了${player_name}的阴茎。`,
          ); // :3516
          await era.printAndWait(
            `「唔啊啊啊…我连屁股都被魔王大人征服了…啊啊啊啊啊${heart(1)}」`,
          ); // :3517
        } else {
          await era.printAndWait(
            `「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好侵犯吧${heart(1)}…嗯啊啊嗯！好、好紧…咕！」`,
          ); // :3519
          await era.printAndWait(
            `${target_name}未开发的肛门慢慢地吞下了${player_name}的阴茎。`,
          ); // :3520
          await era.printAndWait(
            `${target_name}痛苦的咬着嘴唇忍耐着、看到那样的脸的${player_name}开始了激烈的抽送………`,
          ); // :3521
        }
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「唔、啊…啊啊…我的屁股这么简单的就被插进来了什么的…嗯…啊嗯咕唔！」`,
          ); // :3526
          await era.printAndWait(
            `${target_name}被充分开发的肛门轻易吞下了${player_name}的阴茎。`,
          ); // :3527
          await era.printAndWait(`${player_name}微微一笑，开始动起了腰………`); // :3528
        } else {
          await era.printAndWait(
            `「呜咕…不要啊！屁股不要啊…额…呀…插进我里面来了…啊啊咕咕——！」`,
          ); // :3530
          await era.printAndWait(
            `${target_name}未开发的肛门被${player_name}的阴茎插了进去。`,
          ); // :3531
          await era.printAndWait(`${target_name}的悲鸣在耳边响起………`); // :3532
        }
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :3535
      era.set(`cflag:${target}:327`, 1); // :3535
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:327`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈啊哈啊…请给我肉棒…从肛门插进来！侵犯我吧${heart(1)}」`,
          ); // :3542
          await era.printAndWait(
            `${target_name}叫喊着下流的话诱惑着${player_name}。${player_name}苦笑着，一口气贯穿了肛门。`,
          ); // :3543
          await era.printAndWait(
            `「噶哈…哈哈${heart(1)} 现在我要飞起来了…啊啊啊嗯啊哈啊啊嗯${heart(1)}」`,
          ); // :3544
          await era.printAndWait(''); // :3545-3547
        } else {
          await era.printAndWait(
            `${player_name}把${target_name}的双腿大大的分开、一口气贯穿了完成开发的肛门。`,
          ); // :3547
          await era.printAndWait(
            `「咕哈嗯${heart(1)} 好棒好棒${heart(1)} 侵犯侵犯我的肛门吧${heart(1)}」`,
          ); // :3548
          await era.printAndWait(
            `被侵犯肛门、${target_name}的脸想要融化一样。看到这个样子的${player_name}开始了更激烈的抽送。`,
          ); // :3549
          await era.printAndWait(
            `「哈嗯！好、激烈好激烈啊${heart(1)}啊啊继续…继续${heart(1)}」`,
          ); // :3550
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :3552
        era.set(`cflag:${target}:327`, 7); // :3552
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:327`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…请用那粗大的阳具侵犯我的肛门，彻底的开发它吧${heart(1)}」`,
        ); // :3555
        await era.printAndWait(
          `被那样的${target_name}诱惑着，${player_name}把阴茎差劲了未开发的肛门。被包裹的稍微有点疼。`,
        ); // :3556
        await era.printAndWait(
          `「啊哈嗯${heart(1)} 被这样彻底的侵犯的话…肛门就能开发出来了呢…${heart(1)}」`,
        ); // :3557
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :3558
        era.set(`cflag:${target}:327`, 6); // :3558
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:327`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好侵犯吧${heart(1)}…啊嗯啊啊嗯${heart(1)}」`,
          ); // :3562
          await era.printAndWait(
            `${target_name}被充分开发的肛门轻易吞下了${player_name}的阴茎。`,
          ); // :3563
          await era.printAndWait(
            `「唔啊啊啊…我连屁股都被魔王大人征服了…啊啊啊啊啊${heart(1)}」`,
          ); // :3564
        } else {
          await era.printAndWait(
            `「嗯嗯啊…啊啊肛门被侵犯${heart(1)} 让我有我的身体是魔王大人的东西啊啊嗯${heart(1)} 的实感${heart(1)}」`,
          ); // :3566
          await era.printAndWait(
            `${target_name}因为被${player_name}侵犯肛门而发出了娇喘、那个声音里混入了对${player_name}的爱。`,
          ); // :3567
          await era.printAndWait(
            `「啊哈啊嗯…啊啊${heart(1)} 啊啊——${heart(1)} 继续征服我吧${heart(1)} 啊啊——${heart(1)}」`,
          ); // :3568
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :3570
        era.set(`cflag:${target}:327`, 5); // :3570
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:327`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「我的屁股是魔王大人的动…啊啊！请您彻底的侵犯吧${heart(1)}…咕啊！好、好紧…咕！」`,
        ); // :3573
        await era.printAndWait(
          `${target_name}未开发的肛门慢慢地吞下了${player_name}的阴茎。`,
        ); // :3574
        await era.printAndWait(
          `${target_name}痛苦的咬着嘴唇忍耐着、看到那样的脸的${player_name}开始了激烈的抽送………`,
        ); // :3575
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :3576
        era.set(`cflag:${target}:327`, 4); // :3576
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:327`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「唔、啊…啊啊…我的肛门不是你的…嗯啊…啊咕！」」`,
        ); // :3579
        await era.printAndWait(
          `${target_name}被充分开发的肛门轻易吞下了${player_name}的阴茎。`,
        ); // :3580
        await era.printAndWait(`「不、不行啊！不要…不要动啊啊啊啊啊！」`); // :3581
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :3582
        era.set(`cflag:${target}:327`, 3); // :3582
      } else if (era0(`cflag:${target}:327`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「呜咕…不要啊！屁股不要啊…额…呀…插进我里面来了…啊啊咕咕——！」`,
        ); // :3585
        await era.printAndWait(
          `${target_name}未开发的肛门被${player_name}的阴茎插了进去。`,
        ); // :3586
        await era.printAndWait(
          `「啊啊！快、快拔出去拔出去啊…好、好痛啊…啊啊啊！」`,
        ); // :3587
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :3588
        era.set(`cflag:${target}:327`, 2); // :3588
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (era0(`cflag:${target}:328`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…被魔王大人…侵犯肛门让人停不下来啊…啊啊啊…啊啊嗯${heart(1)}」`,
          ); // :3603
          await era.printAndWait(
            `${target_name}被开发了的肛门从后面被侵犯而发出了喘息声。`,
          ); // :3604
          await era.printAndWait(
            `「从后面…被侵犯感觉好强烈好舒服${heart(1)}」`,
          ); // :3605
        } else {
          await era.printAndWait(
            `「啊啊…魔王大人的肉棒进来了…咕呜呜…唔咕呜呜呜！」`,
          ); // :3607
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰，一口气插进了未开发的肛门，开始动起了腰。`,
          ); // :3608
          await era.printAndWait(
            `「哈、哈…啊啊啊…好、好紧啊…啊嗯…啊…啊啊啊！」`,
          ); // :3609
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「怎么样…我的屁股是为了让魔王大人侵犯而开发的哦${heart(1)}」`,
          ); // :3614
          await era.printAndWait(
            `${target_name}用妩媚的声音诱惑着${player_name}。然后${player_name}抓住${target_name}的腰一口气贯穿了被开发了的肛门。`,
          ); // :3615
          await era.printAndWait(
            `「啊啊啊啊嗯啊啊啊嗯${heart(1)} 屁股太舒服了…啊嗯啊啊啊嗯${heart(1)}」`,
          ); // :3616
        } else {
          await era.printAndWait(
            `「啊啊…请好好地…侵犯我的肛门吧${heart(1)}…啊啊啊啊啊…好、好紧…嗯！」`,
          ); // :3618
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰，把阴茎慢慢差劲了未开发的肛门。`,
          ); // :3619
          await era.printAndWait(
            `开心着看着从后面被插入的肛门的样子。${player_name}为了延长那份快乐而开始了缓慢的抽送………`,
          ); // :3620
        }
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「从、从后面…哈嗯！啊、屁、屁股被侵犯什么的…啊啊啊啊…进、进来了…全都进来了啊…啊啊——！」`,
          ); // :3625
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰，一口气把阴茎插进了开发完成的肛门。`,
          ); // :3626
          await era.printAndWait(`${target_name}后仰着发出了娇喘………`); // :3627
        } else {
          await era.printAndWait(
            `「这样从后面…咦咦咦咦咦！不要不要！肛、肛门不行啊！啊啊咕呜呜！？」`,
          ); // :3629
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰把阴茎插进了未开发的肛门。`,
          ); // :3630
          await era.printAndWait(`${target_name}后仰着发出了悲鸣………`); // :3631
        }
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :3634
      era.set(`cflag:${target}:328`, 1); // :3634
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊！肛门被侵犯让人受不了啊…啊啊啊…啊啊嗯${heart(1)}」`,
          ); // :3641
          await era.printAndWait(
            `${target_name}被开发了的肛门从后面被侵犯而发出了喘息声。`,
          ); // :3642
          await era.printAndWait(
            `听着那声音的${player_name}开始了激烈的抽送。`,
          ); // :3643
          await era.printAndWait(
            `「啊嗯啊嗯啊啊啊嗯…${heart(1)} 肛门被强奸最棒了…啊啊——${heart(1)}」`,
          ); // :3644
        } else {
          await era.printAndWait(
            `「哈啊哈啊…啊嗯啊啊…啊啊嗯！肛门好棒肛门好棒啊…啊啊啊${heart(1)}」`,
          ); // :3646
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、继续激烈的侵犯着肛门。`,
          ); // :3647
          await era.printAndWait(
            `从后面被侵犯的${target_name}的淫乱的肛门的黏膜伸展着咬住了${player_name}的阴茎。`,
          ); // :3648
          await era.printAndWait(
            `「啊哈！你在看哪里啊！啊继续认真的动起腰来侵犯我啊${heart(1)}」`,
          ); // :3649
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :3651
        era.set(`cflag:${target}:328`, 7); // :3651
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:328`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…魔王大人的肉棒进来了…咕唔唔…咕呜呜呜呜！」`,
        ); // :3654
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，一口气插进了未开发的肛门，开始动起了腰。`,
        ); // :3655
        await era.printAndWait(
          `${target_name}这样的女人被压住侵犯肛门让人感到征服欲被满足了。`,
        ); // :3656
        await era.printAndWait(`「哈哈…啊呀…好、好近啊…啊啊啊啊啊啊啊啊啊！」`); // :3657
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :3658
        era.set(`cflag:${target}:328`, 6); // :3658
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…我的魔王大人专用肛门…请继续…侵、侵犯吧${heart(1)}」`,
          ); // :3662
          await era.printAndWait(
            `${player_name}就那样呗${target_name}诱惑着抓住了她的腰、一口气贯穿了被开发了的肛门。`,
          ); // :3663
          await era.printAndWait(
            `「啊嗯咦咦咦！这、这样…一口气…啊啊…啊啊啊啊啊啊${heart(1)}」`,
          ); // :3664
          await era.printAndWait(
            `在${target_name}的肛门的舒服的包裹下、${player_name}开始了抽送………`,
          ); // :3665
        } else {
          await era.printAndWait(
            `「啊啊啊！啊！啊啊！太、太激烈了啊…我、我要…坏掉了…啊嗯啊啊咦${heart(1)}」`,
          ); // :3667
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰、继续激烈的侵犯着肛门。`,
          ); // :3668
          await era.printAndWait(
            `从后面被侵犯的${target_name}的淫乱的肛门的黏膜伸展着咬住了${player_name}的阴茎。`,
          ); // :3669
          await era.printAndWait(
            `「啊啊哇、哇、啊嗯！我、我的…屁、屁股要不行了啊${heart(1)}」`,
          ); // :3670
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :3672
        era.set(`cflag:${target}:328`, 5); // :3672
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:328`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊、请继续侵犯我的肛门吧${heart(1)}…啊啊啊啊啊…好、好紧…嗯！」`,
        ); // :3675
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，把阴茎慢慢插进了未开发的肛门。`,
        ); // :3676
        await era.printAndWait(
          `开心着看着从后面被插入的肛门的样子。${player_name}为了延长那份快乐而开始了缓慢的抽送。`,
        ); // :3677
        await era.printAndWait(
          `「哈啊哈啊${heart(1)} 啊啊啊…这么慢的话…我、我…咦咦咦啊嗯${heart(1)}」`,
        ); // :3678
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :3679
        era.set(`cflag:${target}:328`, 4); // :3679
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊又要、侵、侵犯肛门…啊啊啊啊…进、进来了…全部都进来了…啊啊——！」`,
        ); // :3682
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，一口气把阴茎插进了了开发完成的肛门。`,
        ); // :3683
        await era.printAndWait(
          `「呼啊、啊、啊啊啊啊…肛门…我的肛门好奇怪啊…嗯啊啊啊啊啊啊——」`,
        ); // :3684
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :3685
        era.set(`cflag:${target}:328`, 3); // :3685
      } else if (era0(`cflag:${target}:328`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊嗯咦啊啊！不要不要！肛、肛门不行的啊！啊啊呜呜！？」`,
        ); // :3688
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰，把阴茎插进了未开发的肛门。`,
        ); // :3689
        await era.printAndWait(`「不要啊！还很紧的啊！好痛啊…啊啊啊嗯啊呀！」`); // :3690
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :3691
        era.set(`cflag:${target}:328`, 2); // :3691
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (era0(`cflag:${target}:329`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊哈嗯${heart(1)} 肛门被侵犯好难受啊…啊啊啊…啊嗯${heart(1)}」`,
          ); // :3706
          await era.printAndWait(
            `${target_name}因为开发完全的肛门被刺穿，发出了呻吟。`,
          ); // :3707
          await era.printAndWait(
            `双手抱着${player_name}的脖子激烈的亲吻着、沉浸在被${player_name}侵犯的喜悦中………`,
          ); // :3708
        } else {
          await era.printAndWait(
            `「啊啊肉棒在我的肛门小穴里…啊啊到最深处了${heart(1)}」`,
          ); // :3710
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰、一口气捅进金红桃还未被开发完全的肛门里，猛烈的冲击把金红桃顶了起来。`,
          ); // :3711
          await era.printAndWait(
            `${target_name}露出因为疼痛而有些为难的表情、勉强的接受了${player_name}的动作………`,
          ); // :3712
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊嗯…屁股，在屁股里面、进去了！啊啊啊啊啊${heart(1)}」`,
          ); // :3717
          await era.printAndWait(
            `${target_name}被${player_name}抱住，从肛门顶了上去，沉浸在疯狂的快感之中。`,
          ); // :3718
          await era.printAndWait(
            `随着腰部动作越来越快${target_name}的屁股大幅度的晃动了起来………`,
          ); // :3719
        } else {
          await era.printAndWait(
            `「哈啊啊…啊啊啊…进到屁股里面了啊啊…啊啊…啊嗯啊啊………」`,
          ); // :3721
          await era.printAndWait(
            `${player_name}温柔的抱着${target_name}的腰、阴茎从未开发的肛门里缓缓的插了进去。`,
          ); // :3722
          await era.printAndWait(
            `${target_name}露出非常痛苦的表情，拼命的抱紧了${player_name}………`,
          ); // :3723
        }
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊、快放开我！我、咿呀啊啊！那里是屁股啊嗯！啊、啊哈！」`,
          ); // :3728
          await era.printAndWait(
            `${player_name}抱住${target_name}的腰，阴茎一鼓作气插进了金红桃已经开放完全的肛门。`,
          ); // :3729
          await era.printAndWait(
            `抱着${target_name}，从趴在肩上的地方传来了娇声呻吟………`,
          ); // :3730
        } else {
          await era.printAndWait(
            `「啊、快放开我！放开我！…啊啊啊！全部插进屁股了…咕啊呜！」`,
          ); // :3732
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰，阴茎从还未完全开发的肛门插了进去。`,
          ); // :3733
          await era.printAndWait(
            `${target_name}的身体发着抖，传出了异常痛苦的呻吟………`,
          ); // :3734
        }
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :3737
      era.set(`cflag:${target}:329`, 1); // :3737
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:329`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯…啊…啊…啊哈${heart(1)} 肛门被侵犯着、忍不住了${heart(1)}」`,
          ); // :3744
          await era.printAndWait(
            `${target_name}因为被开发完全的肛门被刺穿，发出了呻吟。`,
          ); // :3745
          await era.printAndWait(
            `双手抱着${player_name}的脖子激烈的亲吻着、沉浸在被${player_name}侵犯的喜悦中。`,
          ); // :3746
          await era.printAndWait(
            `「啾啾…啊哈${heart(1)} 哈啊哈啊…${heart(1)} 嗯啊啊…${heart(1)}」`,
          ); // :3747
        } else {
          await era.printAndWait(
            `「啊啊嗯${heart(1)} 再深一些、再激烈一些${heart(1)} 啊啊肛门奸最棒了${heart(1)}」`,
          ); // :3749
          await era.printAndWait(
            `${target_name}用力抱住${player_name}因为肛门被侵犯的快感发出了满足的喘息声。`,
          ); // :3750
          await era.printAndWait(
            `随着腰部动作越来越快${target_name}的屁股大幅度的晃动了起来………`,
          ); // :3751
          await era.printAndWait(
            `「啊啊…肛门感觉好烫${heart(1)} 啊啊我要去了！${heart(1)}」`,
          ); // :3752
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :3754
        era.set(`cflag:${target}:329`, 7); // :3754
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:329`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊嗯，大肉棒全部进去了………${heart(1)}」`); // :3757
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰、一口气捅进金红桃还未被开发完全的肛门里，猛烈的冲击把金红桃顶了起来。`,
        ); // :3758
        await era.printAndWait(
          `${target_name}虽然还没有习惯肛交，但是为了追求快感主动的摇晃着身体。`,
        ); // :3759
        await era.printAndWait(`「哈啊哈啊…嗯啊啊嗯啊…啊恩嗯！」`); // :3760
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :3761
        era.set(`cflag:${target}:329`, 6); // :3761
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:329`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「屁股屁股全部进去了…啊啊啊啊哈～${heart(1)}」`,
          ); // :3765
          await era.printAndWait(
            `${target_name}抱着${player_name}一边主动摇晃着屁股，一边沉浸在快乐里满足的呻吟着。`,
          ); // :3766
          await era.printAndWait(
            `随着腰部动作越来越快${target_name}的屁股大幅度的晃动了起来………`,
          ); // :3767
          await era.printAndWait(
            `「哈啊哈啊…啊嗯啊嗯、啊哈～${heart(1)} 屁股被干着快要融化了${heart(1)}」`,
          ); // :3768
        } else {
          await era.printAndWait(
            `「啊嗯…啊…啊啊嗯${heart(1)} 嗯啾啾…啾…呼啊…呼啊啊${heart(1)}」`,
          ); // :3770
          await era.printAndWait(
            `${target_name}在肛门被侵犯的同时，与${player_name}亲吻着。`,
          ); // :3771
          await era.printAndWait(
            `随着腰部被激烈的抽插着，亲吻也逐渐热烈起来。`,
          ); // :3772
          await era.printAndWait(
            `「嗯啾…啾好爽${heart(1)}…哈啊哈啊…啊啊嗯${heart(1)} 屁股想要更多…${heart(1)}」`,
          ); // :3773
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :3775
        era.set(`cflag:${target}:329`, 5); // :3775
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:329`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊嗯啊啊插进屁股里了…咕、咿、咿呀啊………」`); // :3778
        await era.printAndWait(
          `${player_name}温柔的抱着${target_name}的腰、阴茎从未开发的肛门里缓缓的插了进去。`,
        ); // :3779
        await era.printAndWait(
          `${target_name}露出非常痛苦的表情，拼命的抱紧了${player_name}。`,
        ); // :3780
        await era.printAndWait(
          `「嗯啊…啊啊…啊嗯…好、好艰辛啊…嗯啊、啊啊嗯！」`,
        ); // :3781
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :3782
        era.set(`cflag:${target}:329`, 4); // :3782
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:329`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊咕…肉棒插入到最里面了…啊啊啊嗯！」`); // :3785
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，阴茎一鼓作气插进了金红桃已经开放完全的肛门。`,
        ); // :3786
        await era.printAndWait(
          `${target_name}的肛门被快感俘虏，紧紧的夹着阴茎、${target_name}快乐的娇声呻吟着。`,
        ); // :3787
        await era.printAndWait(
          `「啊啊啊…哈哈…啊，不行…不行啊…这，这样的…哼啊啊啊！！」`,
        ); // :3788
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :3789
        era.set(`cflag:${target}:329`, 3); // :3789
      } else if (era0(`cflag:${target}:329`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊不行不行！快放开我…哈、放开…啊啊啊！哈、哈啊！」`,
        ); // :3792
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，阴茎从还未完全开发的肛门插了进去。`,
        ); // :3793
        await era.printAndWait(
          `「啊啊、至、至少…好痛苦…再、再温柔一点啊…呜呜啊啊啊！」`,
        ); // :3794
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :3795
        era.set(`cflag:${target}:329`, 2); // :3795
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (era0(`cflag:${target}:330`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊嗯…好深、好棒、肉棒在里面…啊嗯啊嗯啊咿呀${heart(1)}」`,
          ); // :3810
          await era.printAndWait(
            `${target_name}自己把双腿分开、露出开发完毕的肛门主动吞入${player_name}的阴茎。`,
          ); // :3811
          await era.printAndWait(
            `${player_name}猛烈的抽插着${target_name}发出欢愉的声音。`,
          ); // :3812
        } else {
          await era.printAndWait(
            `「啊啊啊哈嗯…肛门扩张了…肛门被魔王大人的大肉棒扩张了${heart(1)}」`,
          ); // :3814
          await era.printAndWait(
            `${target_name}自己把双腿分开、露出还没有被完全开发的肛门，艰难的吞入${player_name}的阴茎。`,
          ); // :3815
          await era.printAndWait(
            `${player_name}一边激烈的抽动着，一边愉悦的看着她那张苦闷的脸喘息着………`,
          ); // :3816
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊嗯…分开双腿被侵犯着屁股什么的…啊嗯竟然是这么舒服的事情么${heart(1)}」`,
          ); // :3821
          await era.printAndWait(
            `${target_name}的两腿分开、被侵犯着肛门，享受着快感呻吟着。`,
          ); // :3822
          await era.printAndWait(
            `${player_name}伸出双手爱抚着${target_name}丰满的胸部和湿润的小穴………`,
          ); // :3823
        } else {
          await era.printAndWait(
            `「啊嗯…啊嗯…啊啊…进来了…啊嗯…啊哈啊啊${heart(1)}」`,
          ); // :3825
          await era.printAndWait(
            `${player_name}分开${target_name}的双腿、阴茎从未开发的肛门中缓缓挺入。`,
          ); // :3826
          await era.printAndWait(
            `${target_name}混杂着痛苦的表情，爱抚着丰满的胸部和湿润的小穴………`,
          ); // :3827
        }
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呜啊！啊、你那样插进屁股的话…啊！啊啊啊！不行不要啊！」`,
          ); // :3832
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿从开发好的肛门中用力的插了进去。`,
          ); // :3833
          await era.printAndWait(
            `${target_name}被从下面来的冲击弄得娇声连连………`,
          ); // :3834
        } else {
          await era.printAndWait(
            `「啊啊…屁股那里放不进去你的东西啊…啊啊啊～！」`,
          ); // :3836
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿从还没有开发的肛门中用力的插了进去。`,
          ); // :3837
          await era.printAndWait(
            `${target_name}疯狂的扭动着腰，发出高亢的悲鸣声………`,
          ); // :3838
        }
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :3841
      era.set(`cflag:${target}:330`, 1); // :3841

      if (era0(`tequip:${target}:57`)) {
        await era.print(''); // :3844

        if (era0(`abl:${target}:17`) >= 1) {
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「啊啊！看到了${heart(1)} 魔王大人的肉棒，肉棒在我的菊花里${heart(1)}」`,
            ); // :3849
            await era.printAndWait(
              `${target_name}喘着粗气，看着自己的痴态在大镜子上反映出来………`,
            ); // :3850
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊看到了那样的…魔王大人的东西在屁股里！啊啊啊嗯啊～${heart(1)}」`,
            ); // :3853
            await era.printAndWait(
              `${target_name}看着自己的痴态在大镜子上反映出来，害羞的发出娇叫声………`,
            ); // :3854
          } else {
            await era.printAndWait(`「啊啊…屁股被这样侵犯了…啊、我…啊啊啊！」`); // :3857
            await era.printAndWait(
              `${target_name}看到大镜子上反映出自己的痴态，不禁夹紧了肛门小穴………`,
            ); // :3858
          }
        } else {
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(`「我的肛门…肉棒从肛门里刺进来啦…」`); // :3863
            await era.printAndWait(
              `${target_name}看到大镜子里自己的痴态，脸红到耳根………`,
            ); // :3864
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(`「啊真是…我的屁股，进去了…啊啊咦啊！」`); // :3867
            await era.printAndWait(
              `${target_name}看着自己的痴态映在镜子里，呻吟声渐渐变高昂了………`,
            ); // :3868
          } else {
            await era.printAndWait(`「啊啊！不、不想看到这个样子………」`); // :3871
            await era.printAndWait(
              `${target_name}从镜子中看到自己的痴态，闭上眼睛把头转了过去………`,
            ); // :3872
          }
        }
      }
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:330`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯…好深、好棒、肉棒在里面…啊嗯啊嗯啊咿呀${heart(1)}」`,
          ); // :3882
          await era.printAndWait(
            `${target_name}自己把双腿分开、露出开发完毕的肛门主动吞入${player_name}的阴茎。`,
          ); // :3883
          await era.printAndWait(
            `${player_name}猛烈的抽插着${target_name}发出欢愉的声音。`,
          ); // :3884
          await era.printAndWait(
            `「啊啊${heart(1)} 啊${heart(1)} 啊～嗯！好棒啊！更激烈的用肉棒侵犯我的肛门小穴吧${heart(1)}」`,
          ); // :3885
        } else {
          await era.printAndWait(
            `「啊啊～！肛门奸最棒了${heart(1)} 啊啊嗯…啊啊啊啊嗯${heart(1)}」`,
          ); // :3887
          await era.printAndWait(
            `${player_name}把${target_name}被开发完全的肛门狠狠的干着，肉棒和肛门像是紧紧粘合在一起、从后面剧烈的向上顶着。`,
          ); // :3888
          await era.printAndWait(
            `${target_name}一边淫荡的呻吟着一边被侵犯着肛门。`,
          ); // :3889
          await era.printAndWait(
            `「啊嗯呵呵…好…好舒服啊${heart(1)} 太棒了${heart(1)} 更加激烈的侵犯我的肛门吧${heart(1)}」`,
          ); // :3890
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :3892
        era.set(`cflag:${target}:330`, 7); // :3892
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:330`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯嗯${heart(1)} 狠狠的侵犯我吧…我的肛门小穴是魔王大人专用的泄欲工具${heart(1)}」`,
        ); // :3895
        await era.printAndWait(
          `${target_name}自己把双腿分开、露出还没有被完全开发的肛门，艰难的吞入${player_name}的阴茎。`,
        ); // :3896
        await era.printAndWait(
          `${player_name}一边激烈的抽动着，一边愉悦的看着她那张苦闷的脸喘息着。`,
        ); // :3897
        await era.printAndWait(
          `「啊啊…就是、就是这样、肛门、啊！搅动着……刺痛着，狠狠的开发我的肛门小穴吧${heart(1)}」`,
        ); // :3898
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :3899
        era.set(`cflag:${target}:330`, 6); // :3899
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:330`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `啊哈哈啊${heart(1)} 好！好棒啊${heart(1)} 再激烈一点${heart(1)}」`,
          ); // :3903
          await era.printAndWait(
            `${player_name}把${target_name}被开发完全的肛门狠狠的干着，肉棒和肛门像是紧紧粘合在一起、从后面剧烈的向上顶着。`,
          ); // :3904
          await era.printAndWait(
            `${target_name}一边淫荡的呻吟着一边被侵犯着肛门。`,
          ); // :3905
          await era.printAndWait(
            `「呼呼…呼啊…啊、呼啊啊啊啊${heart(1)} 屁股…好舒服…啊～啊啊～${heart(1)}」`,
          ); // :3906
        } else {
          await era.printAndWait(
            `「啊啊！好舒服啊啊…屁股被侵犯着、侵犯着${heart(1)}」`,
          ); // :3908
          await era.printAndWait(
            `${target_name}张大了双腿、在被侵犯的快感中喘息着。`,
          ); // :3909
          await era.printAndWait(
            `${player_name}伸出手爱抚着${target_name}丰满的胸部和湿润的小穴`,
          ); // :3910
          await era.printAndWait(
            `「哈嗯…啊啊啊${heart(1)} 咕、感觉好棒…啊嗯啊啊、魔王大人啊${heart(1)}」`,
          ); // :3911
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :3913
        era.set(`cflag:${target}:330`, 5); // :3913
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:330`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…啊嗯…啊啊…进来了…啊嗯…啊哈啊啊${heart(1)}」`,
        ); // :3916
        await era.printAndWait(
          `${player_name}分开了${target_name}的双腿、阴茎从未开发的肛门中缓缓挺入。`,
        ); // :3917
        await era.printAndWait(
          `${target_name}混杂着痛苦的表情，爱抚着丰满的胸部和湿润的小穴`,
        ); // :3918
        await era.printAndWait(''); // :3919-3920
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :3920
        era.set(`cflag:${target}:330`, 4); // :3920
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:330`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呜啊！啊、你那样插进屁股的话…啊！啊啊啊！不行不要啊！」`,
        ); // :3923
        await era.printAndWait(
          `${player_name}强行分开${target_name}的双腿从开发好的肛门中用力的插了进去。`,
        ); // :3924
        await era.printAndWait(`${target_name}被从下面来的冲击弄得娇声连连………`); // :3925
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :3926
        era.set(`cflag:${target}:330`, 3); // :3926
      } else if (era0(`cflag:${target}:330`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊啊…屁股那里放不进去你的东西啊…啊啊啊～！」`,
        ); // :3929
        await era.printAndWait(
          `${player_name}强行分开${target_name}的双腿从还没有开发的肛门中用力的插了进去。`,
        ); // :3930
        await era.printAndWait(
          `${target_name}疯狂的扭动着腰，发出尖锐的悲鸣声………`,
        ); // :3931
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :3932
        era.set(`cflag:${target}:330`, 2); // :3932
      }

      if (era0(`tequip:${target}:57`)) {
        await era.print(''); // :3936

        if (era0(`abl:${target}:17`) >= 1) {
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(
              `「啊啊！看到了${heart(1)} 魔王大人的肉棒，肉棒在我的菊花里${heart(1)}」`,
            ); // :3941
            await era.printAndWait(
              `${target_name}喘着粗气，看着自己的痴态在大镜子上反映出来………`,
            ); // :3942
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(
              `「啊啊看到了、魔王大人的东西在屁股里！啊啊啊嗯啊～～${heart(1)}」`,
            ); // :3945
            await era.printAndWait(
              `${target_name}看着自己的痴态在大镜子上反映出来，害羞的发出娇叫声………`,
            ); // :3946
          } else {
            await era.printAndWait(`「啊啊…屁股被这样侵犯了…啊、我…啊啊啊！」`); // :3949
            await era.printAndWait(
              `${target_name}看到大镜子上反映出自己的痴态，不禁夹紧了肛门小穴………`,
            ); // :3950
          }
        } else {
          if (era0(`talent:${target}:76`) == 1) {
            await era.printAndWait(`「我的肛门…肉棒从肛门里刺进来啦…」`); // :3955
            await era.printAndWait(
              `${target_name}看着自己的痴态映在镜子里，呻吟声渐渐变高昂了………`,
            ); // :3956
          } else if (era0(`talent:${target}:85`) == 1) {
            await era.printAndWait(`「啊真是…我的屁股，进去了…啊啊咦啊！」`); // :3959
            await era.printAndWait(
              `${target_name}看到大镜子里自己的痴态，脸红到耳根………`,
            ); // :3960
          } else {
            await era.printAndWait(`「啊啊！不、不想看到这个样子………」`); // :3963
            await era.printAndWait(
              `${target_name}从镜子中看到自己的痴态，闭上眼睛把头转了过去………`,
            ); // :3964
          }
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (era0(`cflag:${target}:331`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呵呵、这么硬的勃起了什么的…嗯啊${heart(1)} 就让你这样子射出来吧${heart(1)}」`,
        ); // :3980
        await era.printAndWait(
          `${target_name}用妖魅的眼神看着，舔了舔嘴唇，把${player_name}的阴茎撸动着………`,
        ); // :3981
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「遵命…这就把魔王大人的肉棒伺候的舒舒服服的…${heart(1)}」`,
        ); // :3984
        await era.printAndWait(
          `${target_name}坦率的遵从你的命令，用纤细而白嫩的手把${player_name}的肉棒撸动着………`,
        ); // :3985
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「这样做就好了吗…？啊啊…真是让人心情舒畅………」`); // :3988
        await era.printAndWait(
          `${target_name}脸上一片绯红，为${player_name}处理着性欲………`,
        ); // :3989
      } else {
        await era.printAndWait(`「我到底在做什么啊…啊啊…为什么这么硬呢！？」`); // :3992
        await era.printAndWait(
          `${target_name}露出厌恶的表情把脸扭向一边，用拙劣的手法，套弄着${player_name}的阴茎………`,
        ); // :3993
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :3995
      era.set(`cflag:${target}:331`, 1); // :3995
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…果然用手欺负阴茎让人停不下来啊…啊嗯啊${heart(1)} 啊啊啊…我的手好像变成小穴了一样啊${heart(1)}」`,
          ); // :4002
          await era.printAndWait(
            `${target_name}感受着手里乱闹的${player_name}的阴茎的触感。`,
          ); // :4003
          await era.printAndWait(
            `「本来就想着这根健壮的肉棒一直让我很舒服…让我更多的奉仕一下吧${heart(1)}」`,
          ); // :4004
          await era.printAndWait(
            `${target_name}就那样带着陶醉的表情，手上的动作越来越激烈………`,
          ); // :4005
        } else {
          await era.printAndWait(
            `「肉棒咕噜咕噜咕噜…${heart(1)} 啊啊…看起来好舒服的样子${heart(1)} 连我好像也变得奇怪了一样${heart(1)}」`,
          ); // :4007
          await era.printAndWait(
            `${target_name}的瞳孔完全染上了淫乱的颜色、把${player_name}的阴茎握在手中玩弄着漏出喘息。`,
          ); // :4008
          await era.printAndWait(
            `「来吧…我的手很舒服的话就从肉棒里多多的把精液射出来吧${heart(1)}」`,
          ); // :4009
          await era.printAndWait(`${target_name}的手的动作越来越开了………`); // :4010
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :4012
        era.set(`cflag:${target}:331`, 7); // :4012
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:331`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…停不下来啊、停不下来啊${heart(1)} 让肉棒更硬吧…${heart(1)}」`,
        ); // :4015
        await era.printAndWait(
          `${target_name}闪着下流的光的舌头舔了一下嘴唇，继续撸着${player_name}的阴茎………`,
        ); // :4016
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :4017
        era.set(`cflag:${target}:331`, 6); // :4017
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:331`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人、求你了啊…请给我您的感情吧…啊啊…${heart(1)}」`,
          ); // :4021
          await era.printAndWait(
            `${target_name}像白痴一样张着嘴流着口水，专心的不停的撸着。`,
          ); // :4022
          await era.printAndWait(
            `「一句…明明只要一句命令…我就会用嘴来服侍您了…啊啊${heart(1)} 啊啊${heart(1)}」`,
          ); // :4023
          await era.printAndWait(
            `想要继续看那张可怜的脸的${player_name}让她继续着手淫………`,
          ); // :4024
        } else {
          await era.printAndWait(
            `「嗯…啊嗯…一直都把我弄得这么舒服…谢谢你${heart(1)}」`,
          ); // :4026
          await era.printAndWait(
            `${target_name}一边说着”道谢”的话，一边用手指摩擦着${player_name}的阴茎。`,
          ); // :4027
          await era.printAndWait(
            `「我最喜欢的魔王大人的…啊啊…好棒啊…${heart(1)}」`,
          ); // :4028
          await era.printAndWait(
            `现在也是想要把${target_name}的阴茎吞下去一样的继续撸着………`,
          ); // :4029
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :4031
        era.set(`cflag:${target}:331`, 5); // :4031
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「怎么样魔王大人、有舒服的地方的话我会更照顾哪里的…${heart(1)}」`,
        ); // :4034
        await era.printAndWait(
          `${target_name}的瞳孔湿润着带着出神的表情继续撸着${player_name}的阴茎………`,
        ); // :4035
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :4036
        era.set(`cflag:${target}:331`, 4); // :4036
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 2 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「快、快一点射精吧………」`); // :4040
          await era.printAndWait(
            `${target_name}满脸通红的撸着${player_name}的阴茎………`,
          ); // :4041
        } else {
          await era.printAndWait(
            `「竟然这么精神吗………呀！我明白的、我会好好撸的所以不要变得这这么大啊！」`,
          ); // :4043
          await era.printAndWait(
            `${target_name}因为羞耻心而满脸通红的撸着${player_name}的阴茎………`,
          ); // :4044
        }
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :4046
        era.set(`cflag:${target}:331`, 3); // :4046
      } else if (era0(`cflag:${target}:331`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「快、快一点射精就好了啊………」`); // :4049
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `${target_name}一边因为讨厌而带着扭曲的表情一边笨拙的用手撸着${player_name}的阴茎………`,
          ); // :4051
        } else {
          await era.printAndWait(
            `${target_name}背过脸，撸着${player_name}的阴茎………`,
          ); // :4053
        }
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :4055
        era.set(`cflag:${target}:331`, 2); // :4055
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (era0(`cflag:${target}:332`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊…我可以这样吮吸最喜欢的魔王大人的肉棒什么的…咕唔噗…啾——${heart(1)}」`,
        ); // :4069
        await era.printAndWait(
          `「这多幸福啊${heart(1)} 啊嗯继续勃起吧…嗯啾啾…啾…${heart(1)}」`,
        ); // :4070
        await era.printAndWait(
          `${target_name}从心底高兴地笑着，吮吸着${player_name}的阴茎………`,
        ); // :4071
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「是的…我的嘴是为了把魔王大人舔干净而存在的${heart(1)} 请不用客气随意使用${heart(1)}」`,
        ); // :4074
        await era.printAndWait(
          `「啊呜…嗯啾…啾啾啾…啊啊…好吃…真好吃啊${heart(1)}」`,
        ); // :4075
        await era.printAndWait(
          `${target_name}因为对${player_name}的阴茎进行口腔奉仕而从心底里觉得幸福………`,
        ); // :4076
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「唔…啊呜…呜咕…唔啾…并、并不是变得坦率了什么的…哈啊哈啊…嗯…嗯咕…啾…而是不得不干吧？」`,
        ); // :4079
        await era.printAndWait(
          `${target_name}虽然留着屈辱的而泪水，但还是继续口腔奉仕${player_name}的阴茎………`,
        ); // :4080
      } else {
        await era.printAndWait(
          `「我、我…做这种事什么的…唔…唔…唔…啾…啾…嗯…我明白了、不能继续坚持绝不奉仕了吧？」`,
        ); // :4083
        await era.printAndWait(
          `${target_name}带着因为屈辱而扭曲的表情，口腔奉仕着${player_name}的阴茎………`,
        ); // :4084
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :4086
      era.set(`cflag:${target}:332`, 1); // :4086
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊…我可以这样吮吸最喜欢的肉棒什么的…咕唔噗…啾——${heart(1)}」`,
          ); // :4093
          await era.printAndWait(
            `「这多幸福啊${heart(1)} 啊嗯继续勃起吧…嗯啾啾…啾…${heart(1)}」`,
          ); // :4094
          await era.printAndWait(
            `${target_name}从心底高兴地笑着，吮吸着${player_name}的阴茎………`,
          ); // :4095
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊呜唔咕${heart(1)} 嗯啾…肉棒${heart(1)} 肉棒${heart(1)} …啊啊啊…最棒的美味啊…啾${heart(1)}」`,
          ); // :4097
          await era.printAndWait(
            `${target_name}的鼻子发出着粗俗的声音，吮吸着${player_name}的阴茎。`,
          ); // :4098
          await era.printAndWait(
            `「啊啊啊啊…嗯啾…嗯啾嗯啾${heart(1)} 多多的把精液射出来吧…亲给我美味的精液啊${heart(1)}」`,
          ); // :4099
        } else {
          await era.printAndWait(
            `「啊啊…果然在肉棒面前…嗯啾啾…是不可能不听从魔王大人的命令的…啾啪啾啪…的啊${heart(1)}」`,
          ); // :4101
          await era.printAndWait(
            `${target_name}跪着继续着对${player_name}的阴茎的口腔奉仕、那身姿就像乡下的妓女一样低级。`,
          ); // :4102
          await era.printAndWait(
            `「为了这根肉棒的话我…嗯啾啾…啾噗…什么…什么都愿意干啊${heart(1)}」`,
          ); // :4103
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :4105
        era.set(`cflag:${target}:332`, 5); // :4105
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) == 3 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「是的…我的嘴是为了把魔王大人的，清理干净而尊在的………」`,
          ); // :4109
          await era.printAndWait(
            `「啊呜…嗯啾…啾啾啾…啊啊…好吃…真好吃啊${heart(1)}」`,
          ); // :4110
          await era.printAndWait(
            `${target_name}因为对${player_name}的阴茎进行口腔奉仕而从心底里觉得幸福………`,
          ); // :4111
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「魔王大人…请用我的嘴来消解欲求不满吧${heart(1)} 嗯啾…啾…啾…啾${heart(1)}」`,
          ); // :4113
          await era.printAndWait(
            `${target_name}精心的使用着舌头和嘴唇，温柔的刺激着${player_name}的阴茎、就像插进了又黏又热的黏胶里一样。`,
          ); // :4114
          await era.printAndWait(
            `「嗯啾啾…嗯啾…啾…嗯啾…来吧…在我的嘴里多多射精出来吧${heart(1)}」`,
          ); // :4115
        } else {
          await era.printAndWait(
            `「嗯啾…啾…啾…咕啾${heart(1)} 啊啊…真美味啊…${heart(1)}」`,
          ); // :4117
          await era.printAndWait(
            `${target_name}带着快要融化一样的表情热心的吮吸着${player_name}的阴茎。`,
          ); // :4118
          await era.printAndWait(
            `「请继续命令我吧…这样的话…啊咕…啾…嗯啾…呼啊${heart(1)} 不管哪里我都会舔的啊${heart(1)}」`,
          ); // :4119
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :4121
        era.set(`cflag:${target}:332`, 4); // :4121
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:332`) <= 2 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「好过分啊、让我口腔奉仕来确定自己的优越性什么的…不觉得很浅薄么？」`,
          ); // :4125
          await era.printAndWait(
            `「啊嗯…嗯啾嗯嗯…啾啾…啊咕…嗯咕…哈啊哈啊…真是胆小啊…啊啊」`,
          ); // :4126
          await era.printAndWait(`${target_name}的口腔奉仕越来越激烈了………`); // :4127
        } else {
          await era.printAndWait(
            `「我、我并不是喜欢做这种事…嗯啾啾…嗯咕嗯咕」`,
          ); // :4129
          await era.printAndWait(
            `${target_name}大概是已经习惯口腔奉仕了，相当深的含下了${player_name}的阴茎………`,
          ); // :4130
        }
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :4132
        era.set(`cflag:${target}:332`, 3); // :4132
      } else if (era0(`cflag:${target}:332`) <= 1 || era0('flag:7') == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊…为什么我要做这种事…好、好吧…我会好到的舔的…嗯嗯咕…嗯…啾…嗯」`,
          ); // :4136
          await era.printAndWait(
            `${target_name}因为屈辱而带着扭曲的表情，口腔奉仕着${player_name}的阴茎………`,
          ); // :4137
        } else {
          await era.printAndWait(
            `「就算让我做这种事我也不会变成你的东西的…嗯啾…啾」`,
          ); // :4139
          await era.printAndWait(
            `${target_name}虽然因为屈辱而留下了眼泪但还是继续着口腔奉仕………`,
          ); // :4140
        }
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :4142
        era.set(`cflag:${target}:332`, 2); // :4142
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (era0(`cflag:${target}:333`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊魔王大人的肉棒太精神了…好像要把我的胸部烫伤了一样${heart(1)}」`,
        ); // :4156
        await era.printAndWait(
          `${target_name}一边高兴地笑着一边继续着乳交奉仕………`,
        ); // :4157
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「是的…我的这对巨乳…是为了奉仕魔王大人而存在的啊${heart(1)}」`,
        ); // :4160
        await era.printAndWait(
          `${target_name}一边陶醉的笑着一边继续着乳交奉仕………`,
        ); // :4161
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「这、这样就可以了吧？ 啊啊…胸部被玷污了…！」`); // :4164
        await era.printAndWait(
          `${target_name}虽然皱着眉但还是继续着乳交奉仕………`,
        ); // :4165
      } else {
        await era.printAndWait(
          `「我、我的胸部才不是为了做这种事而存在的…咕…唔」`,
        ); // :4168
        await era.printAndWait(`${target_name}一边哭着一边进行着乳交奉仕………`); // :4169
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :4171
      era.set(`cflag:${target}:333`, 1); // :4171
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊嗯呼${heart(1)} …魔王大人的肉棒…在我的胸部里面变得这么舒服了啊…啊啊…真可爱啊${heart(1)}」`,
          ); // :4178
          await era.printAndWait(
            `${target_name}用嘴里垂下的唾液来代替润滑液，继续着乳交奉仕、完全勃起的乳头摩擦着，发出了淫乱的声音。`,
          ); // :4179
          await era.printAndWait(
            `「啊哈嗯…果然侍奉肉棒让人停不下来啊…啊啊…啊嗯…恩…啊啊啊${heart(1)}」`,
          ); // :4180
        } else {
          await era.printAndWait(
            `「来吧…因为我自豪的胸部而变得舒服的话，就这样满满的射出来也没关系呦${heart(1)}」`,
          ); // :4182
          await era.printAndWait(
            `${target_name}舔着嘴唇，垂下唾液，大大的乳房噗噜噗噜的变着形，奉仕着阴茎。`,
          ); // :4183
          await era.printAndWait(
            `时而用完全勃起的乳头摩擦着阴茎的${target_name}品味着快感。`,
          ); // :4184
          await era.printAndWait(
            `「啊哈啊…我的胸部变成性器了…${heart(1)} 夹着肉棒就有感觉了啊${heart(1)}」`,
          ); // :4185
        }
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :4187
        era.set(`cflag:${target}:333`, 6); // :4187
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:332`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊魔王大人的肉棒太精神了…好像要把我的胸部烫伤了一样${heart(1)}」`,
        ); // :4190
        await era.printAndWait(
          `${target_name}一边高兴地笑着一边继续着乳交奉仕。`,
        ); // :4191
        await era.printAndWait(
          `「在我自豪的胸部里…射出像要烫伤我一样热的精液吧${heart(1)}」`,
        ); // :4192
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :4193
        era.set(`cflag:${target}:333`, 5); // :4193
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:333`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊…如果您用我自豪的胸部…变得舒服起来的话…我会很高兴的啊${heart(1)}」`,
          ); // :4197
          await era.printAndWait(
            `${target_name}的巨乳夹着${player_name}的阴茎蠢动着。乳头像要爆炸一样勃起着，只是稍微一碰${target_name}就漏出了喘息声。`,
          ); // :4198
          await era.printAndWait(
            `「嗯啊${heart(1)}…哈啊哈啊…忍耐不了啊…被魔王大人侵犯胸部的感觉${heart(1)}」`,
          ); // :4199
        } else {
          await era.printAndWait(
            `「嗯…啊嗯${heart(1)} 啊啊…我…喜欢奉仕…请坦率的说出您的感想吧」`,
          ); // :4201
          await era.printAndWait(
            `${target_name}一边陶醉着一边用巨乳夹住${player_name}的阴茎摩擦着。用勃起的不能再勃起的乳头摩擦着阴茎的${target_name}下流的喘息着。`,
          ); // :4202
          await era.printAndWait(
            `「哈嗯…啊嗯…啊啊…我…我是淫乱的女人………只是这样触摸着…就快要去了${heart(1)}」`,
          ); // :4203
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :4205
        era.set(`cflag:${target}:333`, 4); // :4205
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:333`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊…我、我的胸部这么…嗯…嗯…啊啊！」`); // :4208
        await era.printAndWait(
          `${target_name}感觉自己的巨乳中间滚烫的${player_name}的肉棒一抖一抖的………`,
        ); // :4209
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :4210
        era.set(`cflag:${target}:333`, 3); // :4210
      } else if (era0(`cflag:${target}:333`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「这、这样就满足了吧…把我的胸部弄脏就可以了吧………！」`,
        ); // :4213
        await era.printAndWait(`${target_name}虽然哭着但还是继续着乳交奉仕………`); // :4214
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :4215
        era.set(`cflag:${target}:333`, 2); // :4215
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (era0(`cflag:${target}:334`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊啊${heart(1)} 这样夹着肉棒好幸福啊${heart(1)} 啊啊啊嗯啊哈${heart(1)}」`,
        ); // :4229
        await era.printAndWait(
          `${target_name}一边发出着高兴的声音一边继续对${player_name}的阴茎进行股间性交奉仕………`,
        ); // :4230
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…魔王大人的话明明什么时候都可以侵犯我下流的哪里…嗯…啊…啊嗯${heart(1)}」`,
        ); // :4233
        await era.printAndWait(
          `${target_name}的嘴里垂下唾液，高兴地进行着股间性交奉仕………`,
        ); // :4234
      } else {
        await era.printAndWait(
          `「啊啊！不要这样勃起啊！咦…啊啊…就、就那么舒服么…？」`,
        ); // :4237
        await era.printAndWait(
          `${target_name}厌恶的皱着眉，用股间夹着${player_name}阴茎、上下动着腰………`,
        ); // :4238
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :4240
      era.set(`cflag:${target}:334`, 1); // :4240
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:334`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…恩…啊、啊啊嗯…呐…我不小心就这样把肉棒插进去的话你会生气吗？」`,
        ); // :4246
        await era.printAndWait(
          `${target_name}恶作剧一样的笑着，不停的用丰满的大腿加紧${player_name}的阴茎。`,
        ); // :4247
        await era.printAndWait(
          `「我、我明白…是为了让魔王大人高兴才让我的处女膜再生的…哈啊哈啊…${heart(1)}」`,
        ); // :4248
        await era.printAndWait(`「但是我能忍到什么地步…我也不知道………」`); // :4249
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :4250
        era.set(`cflag:${target}:334`, 6); // :4250
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:334`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…这根肉棒要把握弄疯了啊…啊啊${heart(1)} 让我更有感觉吧${heart(1)}」`,
        ); // :4253
        await era.printAndWait(
          `${target_name}丰满的大腿夹着${player_name}的阴茎、用自己的爱液当做润滑液持续着股间性交奉仕。`,
        ); // :4254
        await era.printAndWait(
          `「啊啊…好热…好热啊…这肉棒真让人…受不了啊…${heart(1)}」`,
        ); // :4255
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :4256
        era.set(`cflag:${target}:334`, 5); // :4256
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (era0(`cflag:${target}:334`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…特意把我变回处女吊我的胃口…好可恶啊…啊…嗯啊啊嗯${heart(1)}」`,
        ); // :4259
        await era.printAndWait(
          `虽然嘴上这么说着，${target_name}的秘裂溢出着蜜汁、粘糊糊的包裹着${player_name}的阴茎。`,
        ); // :4260
        await era.printAndWait(
          `「因为我现在想要…魔王大人的…魔王大人的想要的不得了啊${heart(1)}」`,
        ); // :4261
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :4262
        era.set(`cflag:${target}:334`, 4); // :4262
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:334`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「我是…啊啊…想要得到魔王大人的怜悯的淫乱女人…啊啊…所以这个奉仕如果做得好的话…亲给我奖励…啊啊嗯${heart(1)}」`,
        ); // :4265
        await era.printAndWait(
          `${target_name}悲惨的祈求着${player_name}。那份努力让人不自觉的想要给予她“饵料”。`,
        ); // :4266
        await era.printAndWait(`但是、直到极限为止的”缓刑”也是一种快乐………`); // :4267
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :4268
        era.set(`cflag:${target}:334`, 3); // :4268
      } else if (era0(`cflag:${target}:334`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「不、不要用这种下流的眼神来看我啊…嗯啊嗯！赶、赶紧射精就好了啊………嗯！」`,
        ); // :4271
        await era.printAndWait(
          `${target_name}厌恶的皱着眉，用大腿夹着${player_name}的阴茎、上下动着腰………`,
        ); // :4272
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :4273
        era.set(`cflag:${target}:334`, 2); // :4273
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (era0(`cflag:${target}:335`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、我的处女不管多少次都会献给魔王大人的…${heart(1)}」`,
          ); // :4289
          await era.printAndWait(
            `${target_name}用秘裂摩擦着${player_name}的阴茎、粘糊糊的爱液被做润滑液发出了咕啾咕啾的声音。`,
          ); // :4290
          await era.printAndWait(
            `「哈啊哈啊…讨厌、明明打算挑逗一下的、但是我这边先忍不下去了啊…${heart(1)}」`,
          ); // :4291
          await era.printAndWait(
            `${target_name}微微一笑，就那样一口气沉下了腰、阴茎被插进了蜜壶的深处。`,
          ); // :4292
          await era.printAndWait(
            `「啊哈啊——！啊啊啊啊——！忍、忍不了啊…破瓜之痛和小穴的快感混合在一起…我要上瘾了啊${heart(1)}」`,
          ); // :4293
          await era.printAndWait(
            `失去处女的${target_name}的表情已经是一只雌性的野兽了、${player_name}苦笑着，为了调教这只野兽而开始向上挺起了腰………`,
          ); // :4294
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「是的…我遵从魔王大人的命令将处女奉献给您…${heart(1)}」`,
          ); // :4297
          await era.printAndWait(
            `${target_name}陶醉的笑着用手指撑开秘裂对准${player_name}的阴茎、慢慢的沉下了腰。`,
          ); // :4298
          await era.printAndWait(
            `「啊啊…现在…处女膜在和魔王大人接吻啊${heart(1)} 呵呵呵、就这样直到深处…一口气${heart(1)}」`,
          ); // :4299
          await era.printAndWait(
            `”噗”地一声${target_name}的蜜壶深处接受了阴茎。`,
          ); // :4300
          await era.printAndWait(
            `「咕啊…啊…啊啊啊啊…好、好有效啊…${heart(1)}」`,
          ); // :4301
          await era.printAndWait(`接下来，秘裂流出了破瓜之血………`); // :4302
        } else {
          await era.printAndWait(
            `「”自己献上处女”什么的、这命令是开玩笑吧………咕！」`,
          ); // :4305
          await era.printAndWait(
            `${target_name}皱着眉慢慢沉下了腰。被多次使用过的蜜壶的处女膜破裂有一种奇怪的触感。`,
          ); // :4306
          await era.printAndWait(
            `再次失去处女的${target_name}、因为感觉很复杂所以动作很笨拙。`,
          ); // :4307
          await era.printAndWait(`「嗯咕…动、动就可以了吧？啊啊啊啊！」`); // :4308
        }
      } else {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、我在上面什么的…会好好榨取魔王大人的${heart(1)}」`,
          ); // :4314
          await era.printAndWait(
            `${target_name}一边舔着嘴唇一边前后扭动着腰。`,
          ); // :4315
          await era.printAndWait(
            `「你看${heart(1)} 你看${heart(1)} 这样随便我懂…啊嗯…会怎么样…我可不知道哦${heart(1)}」`,
          ); // :4316
          await era.printAndWait(
            `就那样带着陶醉的表情为了榨取${player_name}的精液、${target_name}开始认真的动起了腰………`,
          ); // :4317
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…跨在魔王大人身上明明很害羞的…但是、没有办法呢」`,
          ); // :4320
          await era.printAndWait(
            `${target_name}害羞的跨坐在${player_name}身上，自己沉下了腰。`,
          ); // :4321
          await era.printAndWait(
            `一口气把阴茎吞入肉壶的深处、腰开始慢慢动了起来。`,
          ); // :4322
          await era.printAndWait(
            `「嗯…嗯${heart(1)} 啊啊…我好舒服啊…啊啊啊${heart(1)}」`,
          ); // :4323
        } else {
          if (era0(`abl:${master}:12`) > 5) {
            await era.printAndWait(
              `「如果你觉得我是为了你而动的话就大错特错了…啊！啊啊！这、这么插的话是不行的啊！」`,
            ); // :4327
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰，突然开始了向上突刺。`,
            ); // :4328
            await era.printAndWait(`「咦！啊啊！不、不要…啊啊啊…咕唔！」`); // :4329
            await era.printAndWait(
              `看到${target_name}的“舞蹈”，${player_name}一边笑着一边开始品味着蜜壶………`,
            ); // :4330
          } else {
            await era.printAndWait(
              `「如果你觉得我是为了你而动的话就大错特错了…嗯嗯…呵呵呵…来吧来吧好好地动起来吧♪」`,
            ); // :4332
            await era.printAndWait(
              `${target_name}在${player_name}上面坐着，一边轻松的舔着嘴唇一边俯视着。`,
            ); // :4333
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰开始咕噜咕噜的向上插着。`,
            ); // :4334
            await era.printAndWait(`「啊啊嗯…还差得远呢…来吧继续插吧…♪」`); // :4335
          }
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :4339
      era.set(`cflag:${target}:335`, 1); // :4339
      return 0;
    } else {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「呵呵呵、我的处女不管多少次都会献给魔王大人的…${heart(1)}」`,
          ); // :4347
          await era.printAndWait(
            `${target_name}用秘裂摩擦着${player_name}的阴茎、粘糊糊的爱液被做润滑液发出了咕啾咕啾的声音。`,
          ); // :4348
          await era.printAndWait(
            `「哈啊哈啊…讨厌、明明打算挑逗一下的、但是我这边先忍不下去了啊…${heart(1)}」`,
          ); // :4349
          await era.printAndWait(
            `${target_name}微微一笑，就那样一口气沉下了腰、阴茎被插进了蜜壶的深处。`,
          ); // :4350
          await era.printAndWait(
            `「啊哈啊——！啊啊啊啊——！忍、忍不了啊…破瓜之痛和小穴的快感混合在一起…我要上瘾了啊${heart(1)}」`,
          ); // :4351
          await era.printAndWait(
            `失去处女的${target_name}的表情已经是一只雌性的野兽了、${player_name}苦笑着，为了调教这只野兽而开始向上挺起了腰………`,
          ); // :4352
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「是的…我遵从魔王大人的命令将处女奉献给您…${heart(1)}」`,
          ); // :4355
          await era.printAndWait(
            `${target_name}陶醉的笑着用手指撑开秘裂对准${player_name}的阴茎、慢慢的沉下了腰。`,
          ); // :4356
          await era.printAndWait(
            `「啊啊…现在…处女膜在和魔王大人接吻啊${heart(1)} 呵呵呵、就这样直到深处…一口气${heart(1)}」`,
          ); // :4357
          await era.printAndWait(
            `”噗”地一声${target_name}的蜜壶深处接受了阴茎。`,
          ); // :4358
          await era.printAndWait(
            `「咕啊…啊…啊啊啊啊…好、好有效啊…${heart(1)}」`,
          ); // :4359
          await era.printAndWait(`接下来，秘裂流出了破瓜之血………`); // :4360
        } else {
          await era.printAndWait(
            `「”自己献上处女”什么的、这命令是开玩笑吧………咕！」`,
          ); // :4363
          await era.printAndWait(
            `${target_name}皱着眉慢慢沉下了腰。被多次使用过的蜜壶的处女膜破裂有一种奇怪的触感。`,
          ); // :4364
          await era.printAndWait(
            `再次失去处女的${target_name}、因为感觉很复杂所以动作很笨拙。`,
          ); // :4365
          await era.printAndWait(`「嗯咕…动、动就可以了吧？啊啊啊啊！」`); // :4366
        }
        return 0;
      }

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:335`) <= 8 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊哈嗯…魔王大人的肉棒${heart(1)} 全部、全部、是我的东西啊${heart(1)}」`,
          ); // :4373
          await era.printAndWait(`${target_name}一边舔着嘴唇一边前后扭着腰。`); // :4374
          await era.printAndWait(
            `「魔王大人的肉棒${heart(1)} 最喜欢的肉棒${heart(1)} 我谁都不给啊${heart(1)}」`,
          ); // :4375
          await era.printAndWait(
            `一边发出欢喜的声音一边要把${player_name}的精液全部榨出来的、${target_name}开始认真的动起了腰………`,
          ); // :4376
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯我正在品味魔王大人的肉棒的味道魔王大人不要动啊${heart(1)} 啊啊嗯啊！啊哈嗯${heart(1)}」`,
          ); // :4378
          await era.printAndWait(
            `${target_name}的腰前后左右的扭动着、品味着龟头和子宫口一次次的接吻的快乐。`,
          ); // :4379
          await era.printAndWait(
            `秘裂不停地流出爱液、彻底开发的蜜壶包裹着${player_name}的阴茎。`,
          ); // :4380
          await era.printAndWait(
            `「哈啊——${heart(1)} 哈啊——${heart(1)} 肉棒好棒${heart(1)} 呀啊啊啊啊${heart(1)}」`,
          ); // :4381
        } else {
          await era.printAndWait(
            `「啊啊啊${heart(1)} 肉棒好棒${heart(1)} 肉棒插得好舒服${heart(1)}」`,
          ); // :4383
          await era.printAndWait(
            `${player_name}和${target_name}的手抓在一起、蜜壶和阴茎也更加深深的联系在一起。`,
          ); // :4384
          await era.printAndWait(
            `随着抽送而发出咕啾咕啾的声音、秘裂里废除的爱液打湿了两人的身体。`,
          ); // :4385
          await era.printAndWait(
            `「啊哈嗯${heart(1)} 好棒！好棒啊${heart(1)} 继续插小穴啊${heart(1)}」`,
          ); // :4386
          await era.printAndWait(
            `${target_name}下流的声音回应着${player_name}的腰的激烈突刺。`,
          ); // :4387
          await era.printAndWait(
            `「咦啊啊啊啊${heart(1)} 哦哦${heart(1)} 小穴小穴好舒服${heart(1)} 啊啊肉棒最棒啊${heart(1)}」`,
          ); // :4388
        }
        // CFLAG:335  = 9（变量语义：CFLAG 族，335） // :4390
        era.set(`cflag:${target}:335`, 9); // :4390
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:335`) <= 7 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「跨在魔王大人上面…啊嗯…收下肉棒什么的${heart(1)} 我是多么幸福的人啊${heart(1)}」`,
          ); // :4394
          await era.printAndWait(
            `${target_name}高兴地跨在${player_name}身上，自己落下腰动了起来。`,
          ); // :4395
          await era.printAndWait(
            `让阴茎插进蜜壶深处动着的${target_name}不断地发出淫乱的声音`,
          ); // :4396
          await era.printAndWait(
            `「啊啊好幸福啊${heart(1)} 肉棒全部插进来好幸福啊${heart(1)} 啊啊好舒服啊${heart(1)}」`,
          ); // :4397
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「啊啊哈嗯…肉棒好舒服…好舒服啊${heart(1)}」`); // :4399
          await era.printAndWait(
            `${player_name}和${target_name}像是为了共享快乐一样牵着手，挺着腰。`,
          ); // :4400
          await era.printAndWait(
            `「呀嗯${heart(1)} 肉棒插到我的子宫…啊嗯！来了啊${heart(1)}」`,
          ); // :4401
          await era.printAndWait(
            `被强烈的快乐炙烤着的${target_name}的手紧紧地握了回来。因为那有些疼痛的感觉而感到很舒心的${player_name}为了更快乐的感觉而加快了动作………`,
          ); // :4402
        } else {
          await era.printAndWait(
            `「啊嗯啊啊嗯啊哈啊${heart(1)} 用肉棒贯穿子宫吧！啊啊啊啊啊啊啊${heart(1)}」`,
          ); // :4404
          await era.printAndWait(
            `${target_name}被不停的向上插着、身体就像在暴风雨的大海中被玩弄的小船一样弹跳着，发出这淫乱的声音。`,
          ); // :4405
          await era.printAndWait(
            `「啊嗯${heart(1)} 啊啊嗯${heart(1)} 啊啊啊啊——${heart(1)} 继续插进来把我插死吧${heart(1)}」`,
          ); // :4406
          await era.printAndWait(
            `${player_name}像是要用最后一击将子宫击溃而扭动着腰。`,
          ); // :4407
          await era.printAndWait(
            `「啊啊哦咦…死了要死了我要死了啊啊啊啊啊啊${heart(1)}」`,
          ); // :4408
        }
        // CFLAG:335  = 8（变量语义：CFLAG 族，335） // :4410
        era.set(`cflag:${target}:335`, 8); // :4410
      } else if (
        era0(`talent:${target}:75`) == 1 &&
        (era0(`cflag:${target}:335`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊嗯啊啊…啊嗯！继续插进来！把我的小穴弄得乱七八糟的吧！」`,
          ); // :4414
          await era.printAndWait(
            `${player_name}像抓缰绳一样握住${target_name}的手开始向上插着。`,
          ); // :4415
          await era.printAndWait(
            `${target_name}的蜜壶笨拙的缠绕着阴茎、腰的动作越来越快了。`,
          ); // :4416
          await era.printAndWait(
            `「啊啊啊…小穴好舒服！插到子宫了好舒服啊！啊啊啊哦啊啊啊啊！」`,
          ); // :4417
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊嗯啊嗯啊哦嗯…子宫口咕噜咕噜的子宫被穿透了啊…啊啊啊哈嗯」`,
          ); // :4419
          await era.printAndWait(
            `${target_name}在${player_name}上面跳着淫乱的舞蹈。`,
          ); // :4420
          await era.printAndWait(
            `「啊哈好棒好舒服！小穴好舒服啊！我已经离不开这里了啊！」`,
          ); // :4421
          await era.printAndWait(
            `已经完全变成性爱狂的${target_name}一边突出卑琐的台词，一边在${player_name}上面贪求着快乐………`,
          ); // :4422
        } else {
          await era.printAndWait(
            `「啊哈嗯啊啊啊啊啊嗯！小穴更想要肉棒了啊！呼哇啊啊啊啊啊…」`,
          ); // :4424
          await era.printAndWait(
            `${target_name}的眼神已经因情欲而彻底放松，沉溺在快乐的肉体关系里了。`,
          ); // :4425
          await era.printAndWait(
            `「啊啊啊嗯啊哦…咕嗯…我不退治这个让我变得不行的肉棒可不行啊…啊啊啊！」`,
          ); // :4426
          await era.printAndWait(
            `${target_name}舔了一下嘴唇，为了追求更高的快感而动起了腰………`,
          ); // :4427
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :4429
        era.set(`cflag:${target}:335`, 7); // :4429
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:335`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「哈啊哈啊…我在上面的话…就真的全部都收下了呦${heart(1)}」`,
          ); // :4433
          await era.printAndWait(
            `${target_name}一边舔着嘴唇一边开始前后扭动着腰。`,
          ); // :4434

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「魔王大人的精液全部都是我的东西${heart(1)} 一滴都不会给别人的啊${heart(1)}」`,
            ); // :4437
            await era.printAndWait(
              `就那样带着陶醉的表情为了把${player_name}的精液全榨出来、${target_name}开始认真的动起了腰………`,
            ); // :4438
          } else {
            await era.printAndWait(
              `「啊嗯嗯…啊哦嗯${heart(1)} 魔王大人的肉棒看起来很兴奋啊${heart(1)} 啊啊…就这样插进来吧${heart(1)}」`,
            ); // :4440
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊嗯我正在品味魔王大人的肉棒的味道魔王大人不要动啊${heart(1)} 啊啊嗯啊！啊哈嗯${heart(1)}」`,
          ); // :4443
          await era.printAndWait(
            `${target_name}的腰前后左右的扭动着、品味着龟头和子宫口一次次的接吻的快乐。`,
          ); // :4444

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `秘裂不停地流出爱液、彻底开发的蜜壶包裹着${player_name}的阴茎。`,
            ); // :4447
            await era.printAndWait(
              `「哈啊${heart(1)} 哈啊${heart(1)} 魔王大人觉得舒服的话什么时候射都可以哦${heart(1)} 啊啊啊啊嗯！」`,
            ); // :4448
            await era.printAndWait(
              `${target_name}挑衅的笑着，${player_name}向上挺着腰、挖掘着子宫口。`,
            ); // :4449
            await era.printAndWait(
              `「呀咦——！？对、对不起啊真、真的要去了的是我啊${heart(1)} 所以啊——！」`,
            ); // :4450
          } else {
            await era.printAndWait(
              `「哈嗯${heart(1)} 果然…魔王大人的肉棒最棒了…呼啊啊啊啊${heart(1)}」`,
            ); // :4452
          }
        } else {
          await era.printAndWait(
            `「哈嗯啊啊…啊啊啊嗯…小穴好舒服${heart(1)} 最喜欢被肉棒插了啊${heart(1)}」`,
          ); // :4455
          await era.printAndWait(
            `${player_name}和${target_name}的手抓在一起、蜜壶和阴茎也更加深深的联系在一起。`,
          ); // :4456

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `随着抽送而发出咕啾咕啾的声音、秘裂里废除的爱液打湿了两人的身体。`,
            ); // :4459
            await era.printAndWait(
              `「啊哈嗯${heart(1)} 好棒！好棒啊${heart(1)} 继续插小穴啊${heart(1)}」`,
            ); // :4460
            await era.printAndWait(
              `${target_name}的娇喘，${player_name}用腰的突刺回应着。`,
            ); // :4461
            await era.printAndWait(
              `「啊啊啊哦嗯${heart(1)} 好棒好棒啊${heart(1)} 子宫被顶着…要变的奇怪了啊${heart(1)}」`,
            ); // :4462
          } else {
            await era.printAndWait(
              `「啊啊…想要就这样一直…以后也一直…和魔王大人做爱啊…啊啊${heart(1)} 啊啊啊嗯${heart(1)}」`,
            ); // :4464
          }
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :4467
        era.set(`cflag:${target}:335`, 6); // :4467
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:335`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「跨在魔王大人上面明明很害羞…但是这样…啊啊啊！」`,
          ); // :4471
          await era.printAndWait(
            `${target_name}虽然很害羞但还是跨在${player_name}上面自己落下了腰动了起来。`,
          ); // :4472

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `让阴茎插进蜜壶深处动着的${target_name}不断娇喘着`,
            ); // :4475
            await era.printAndWait(
              `「但是但是…明明很害羞却这么舒服啊${heart(1)} 让人停不下来啊${heart(1)}」`,
            ); // :4476
          } else {
            await era.printAndWait(
              `「嗯啊…啊啊嗯！哈啊哈啊…这、这样插的话、话、是犯规的啊！啊啊啊啊！」`,
            ); // :4478
          }
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈、呼…啊啊嗯…恩…好、好棒…啊…啊啊啊${heart(1)}」`,
          ); // :4481
          await era.printAndWait(
            `${player_name}和${target_name}像是为了共享快乐一样牵着手，挺着腰。`,
          ); // :4482

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊啊…啊嗯${heart(1)} 太舒服了…好像要飞起来一样${heart(1)} 呼哇啊啊啊啊${heart(1)}」`,
            ); // :4485
            await era.printAndWait(
              `大概是因为相性很好${target_name}的手握了回去。感觉那个触感很舒服的${player_name}为了品味快乐而更快的动了起来………`,
            ); // :4486
          } else {
            await era.printAndWait(
              `「啊嗯啊${heart(1)} 继续…继续…让我的哪里…更舒服…吧${heart(1)}」`,
            ); // :4488
          }
        } else {
          await era.printAndWait(
            `「啊啊啊啊…明、明明应该让我来动…哈嗯…魔王大人的动作太激烈了…咦啊呀——${heart(1)}」`,
          ); // :4491
          await era.printAndWait(
            `${target_name}被不停的向上插着、身体就像在暴风雨的大海中被玩弄的小船一样弹跳着，发出着娇喘。`,
          ); // :4492

          if (era0(`abl:${target}:2`) >= 3) {
            await era.printAndWait(
              `「啊嗯${heart(1)} 啊啊嗯${heart(1)} 啊啊啊啊——${heart(1)} 我、我一直都像这样啊${heart(1)}」`,
            ); // :4495
            await era.printAndWait(
              `${player_name}像是要用最后一击将子宫击溃而扭动着腰。`,
            ); // :4496
            await era.printAndWait(
              `「啊啊啊咦——…不、不行了！已经不行了啊${heart(1)}」`,
            ); // :4497
          } else {
            await era.printAndWait(
              `「啊哈啊…已、已经不行了…这、这么激烈…啊啊…受不了了…啊啊啊嗯！`,
            ); // :4499
          }
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :4502
        era.set(`cflag:${target}:335`, 5); // :4502
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:335`) <= 3 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「啊啊嗯啊啊…啊嗯♪ 这么插进来不、不行…不行啊啊嗯啊啊啊啊——！」`,
          ); // :4506
          await era.printAndWait(
            `${player_name}像抓缰绳一样握住${target_name}的手开始向上插着。`,
          ); // :4507
          await era.printAndWait(
            `${target_name}被开发了的蜜壶黏糊糊的缠绕着阴茎、${target_name}的腰的速度也越来越快。`,
          ); // :4508
          await era.printAndWait(
            `「啊啊感觉到了啊…我…我…这么有感觉什么的…啊啊啊…啊啊哈——！」`,
          ); // :4509
        } else {
          await era.printAndWait(
            `「呼哇啊啊啊啊♪…啊…才、才不是的、现在才不是有感觉…哈哦！这、这么插进来的话是不行的啊啊啊啊！」`,
          ); // :4511
          await era.printAndWait(
            `${player_name}像抓缰绳一样握住${target_name}的手开始向上插着。`,
          ); // :4512
          await era.printAndWait(
            `${target_name}被开发了的蜜壶黏糊糊的缠绕着阴茎。`,
          ); // :4513
          await era.printAndWait(
            `「啊啊嗯…嗯…啊…啊啊嗯！哈啊哈啊、完、完全没感觉啊…啊！啊啊啊！开玩笑！开玩笑的啦！所以温柔一点啊！啊啊啊啊——！」`,
          ); // :4514
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :4516
        era.set(`cflag:${target}:335`, 4); // :4516
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:335`) <= 2 || era0('flag:7') == 2)
      ) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `「啊啊…不、不要动啊！我、我会懂的…嗯嗯、啊哈！」`,
          ); // :4520
          await era.printAndWait(
            `${player_name}一抓住${target_name}的腰、${target_name}就慌忙自己动起了腰。`,
          ); // :4521
          await era.printAndWait(
            `大大的屁股上下摇动着、能清楚地看到秘裂被阴茎抽送着。`,
          ); // :4522
          await era.printAndWait(
            `「哈啊哈啊…啊啊不要这么盯着看啊…嗯！也不要向上顶啊！啊啊啊啊——！」`,
          ); // :4523
        } else {
          await era.printAndWait(
            `「哈啊哈啊…一点点的话动一动也没关系…嗯嗯！」`,
          ); // :4525
          await era.printAndWait(
            `${target_name}的腰上下动着，品味着${player_name}的阴茎。`,
          ); // :4526
          await era.printAndWait(`「嗯嗯…这样会更舒服一点…啊嗯…啊哈♪」`); // :4527
          await era.printAndWait(
            `配合着腰的动作，${target_name}的嘴中稍微漏出了甜美的声音………`,
          ); // :4528
        }
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :4530
        era.set(`cflag:${target}:335`, 3); // :4530
      } else if (era0(`cflag:${target}:335`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰，鼓起干劲插了进去。`,
          ); // :4534
          await era.printAndWait(
            `「咦——！还、还不行…我的哪里…啊啊不行啊…嗯啊啊嗯啊咦——！」`,
          ); // :4535
          await era.printAndWait(
            `${target_name}因为蜜壶深处被插入而颤抖着腰。`,
          ); // :4536
          await era.printAndWait(
            `「啊啊嗯！不、不要动…只、只是插进来的话…咦…咦——！」`,
          ); // :4537
        } else {
          await era.printAndWait(
            `「呼…呼…来吧、好好动起来吧…你是想让我陷落对吧？」`,
          ); // :4539
          await era.printAndWait(
            `${target_name}坐在${player_name}上面带着余裕一边舔着嘴唇一边俯视着。`,
          ); // :4540
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰开始向上插着。`,
          ); // :4541
          await era.printAndWait(
            `「啊嗯啊啊嗯…来吧来吧、加油吧…啊嗯…啊啊嗯！」`,
          ); // :4542
        }
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :4544
        era.set(`cflag:${target}:335`, 2); // :4544
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (era0(`cflag:${target}:336`) == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊哈啊…我会把你的身体洗干净的…请稍微老实一点吧」`,
        ); // :4558
        await era.printAndWait(`「啊啊、连一条毛巾都不让我用…好下流啊…」`); // :4559
      } else {
        await era.printAndWait(`「明明难得洗一次澡，还要把你洗干净什么的…」`); // :4562
        await era.printAndWait(`「啊嗯…不、不要碰我的身体啊！」`); // :4563
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :4565
      era.set(`cflag:${target}:336`, 1); // :4565
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:336`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯…啊嗯…啊呼…魔王大人…想要射的话就这样满满的射出来也没关系哦…${heart(1)}」`,
        ); // :4571
        await era.printAndWait(
          `${target_name}的丰满的大腿沾满泡沫，夹着${player_name}的阴茎。`,
        ); // :4572
        await era.printAndWait(
          `「这里的话不管变得多脏我都会立刻洗干净的…所以…呐…${heart(1)}」`,
        ); // :4573
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :4574
        era.set(`cflag:${target}:336`, 5); // :4574
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:336`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…我会把魔王大人的身体全部洗干净的…您不动手也可以哦？」`,
        ); // :4577
        await era.printAndWait(
          `${target_name}那丰满的身体擦洗着${player_name}、确实是包括边边角角把身体全部都洗干净了。`,
        ); // :4578
        await era.printAndWait(
          `「让人停不下来啊…我最幸福的时刻就是奉仕魔王大人的时候啊${heart(1)}」`,
        ); // :4579
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :4580
        era.set(`cflag:${target}:336`, 4); // :4580
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:336`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「这里也是不洗干净不行吧…也不要用那种下流的表情笑啊！」`,
        ); // :4583
        await era.printAndWait(
          `${target_name}一边抱怨着，一边用满是肥皂泡的手爱抚着${player_name}………`,
        ); // :4584
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :4585
        era.set(`cflag:${target}:336`, 3); // :4585
      } else if (era0(`cflag:${target}:336`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「来、好好的把手伸出来…哈啊哈啊…嗯…呼…唔…」`); // :4588
        await era.printAndWait(
          `${target_name}大概是因为洗澡的热气而身体发烫，漏出了灼热的吐息………`,
        ); // :4589
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :4590
        era.set(`cflag:${target}:336`, 2); // :4590
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (era0(`cflag:${target}:337`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊哈啊…魔王大人的肉棒…让我的肛门好舒服啊${heart(1)}」`,
          ); // :4605
          await era.printAndWait(
            `${target_name}下流的扭动着腰，贪求着肛门被侵犯的快感。`,
          ); // :4606
          await era.printAndWait(
            `「啊哈嗯…啊啊啊…咦——…果然肛门里还是要插肉棒啊${heart(1)}」`,
          ); // :4607
          await era.printAndWait(
            `${target_name}一边喘息着一边继续上下动着腰………`,
          ); // :4608
        } else {
          await era.printAndWait(
            `「哈啊哈啊…魔王大人的肉棒…让我的肛门好舒服啊${heart(1)}」`,
          ); // :4610
          await era.printAndWait(
            `${target_name}微微一笑沉下了腰、未开发的肛门将${player_name}的阴茎埋了进去。`,
          ); // :4611
          await era.printAndWait(`「啊啊…好厉害…好、好紧…好紧啊…啊啊啊啊！」`); // :4612
          await era.printAndWait(`${target_name}的肛门被扩张到了极限………`); // :4613
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…请好好感受我的肛门吧${heart(1)}…啊啊啊嗯啊哈${heart(1)}」`,
          ); // :4618
          await era.printAndWait(
            `${target_name}开发完成了的肛门轻易的接受了${player_name}的阴茎。`,
          ); // :4619
          await era.printAndWait(
            `满是陶醉的表情的${target_name}的腰一被抓住，就变成了满是期待的表情。`,
          ); // :4620
          await era.printAndWait(
            `「嗯…插、插进来了…魔王大人请把我的屁股弄得乱七八糟的吧…${heart(1)}」`,
          ); // :4621
        } else {
          await era.printAndWait(
            `「啊啊…请好好感受我的肛门吧${heart(1)}…啊啊啊嗯啊哈${heart(1)}」`,
          ); // :4623
          await era.printAndWait(
            `${target_name}未开发的肛门接受着${player_name}的阴茎。`,
          ); // :4624
          await era.printAndWait(
            `温柔的抚摸着一脸痛苦的样子的${target_name}的腰、${target_name}突然笑了起来。`,
          ); // :4625
          await era.printAndWait(`「啊啊…没必要这样关心我…啊啊啊啊哈嗯！」`); // :4626
        }
      } else {
        if (era0(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊啊…屁股被这么简单就插进来了什么的…啊啊啊…嗯嗯唔——！」`,
          ); // :4631
          await era.printAndWait(
            `${target_name}的开发完成的肛门轻易接受并紧紧包裹着${player_name}的阴茎。`,
          ); // :4632
          await era.printAndWait(`「哈啊哈啊…要动起来了…啊啊…啊咕」`); // :4633
        } else {
          await era.printAndWait(
            `「咕呼…让我自己插进屁股里什么的…咕唔！不、不要开玩笑啊！」`,
          ); // :4635
          await era.printAndWait(
            `${target_name}的未开发的肛门紧紧包裹着${player_name}的阴茎。`,
          ); // :4636
          await era.printAndWait(`「啊…啊啊…这样的话、动、动不了了………」`); // :4637
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :4640
      era.set(`cflag:${target}:337`, 1); // :4640
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:337`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊嗯${heart(1)} 肉棒好舒服啊${heart(1)} 肛门要融化了啊${heart(1)}」`,
          ); // :4647
          await era.printAndWait(
            `${target_name}下流的扭动着腰，贪求着肛门被侵犯的快感。`,
          ); // :4648
          await era.printAndWait(
            `「啊嗯啊啊嗯${heart(1)} 我也要动起来了啊…啊啊啊啊～！」`,
          ); // :4649
          await era.printAndWait(`${target_name}一边喘息着一边上下动着腰………`); // :4650
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `${player_name}抓住${target_name}的腰开始向上顶着。`,
          ); // :4652
          await era.printAndWait(
            `「嗯呼…肛门太舒服了…啊嗯${heart(1)} 这么插的话会从肛门里面敲到子宫啊${heart(1)}」`,
          ); // :4653
          await era.printAndWait(
            `${target_name}的腰不停的上下动着、扭动着身体发出着娇喘。`,
          ); // :4654
          await era.printAndWait(
            `「啊啊${heart(1)} 啊啊嗯${heart(1)} 肛门好棒${heart(1)} 最喜欢肛交了啊${heart(1)}」`,
          ); // :4655
        } else {
          await era.printAndWait(
            `「呼哇啊啊啊…肛门要融化了…嗯啊嗯啊哈嗯${heart(1)} 啊啊啊停不下来了最棒了啊${heart(1)}」`,
          ); // :4657
          await era.printAndWait(
            `${target_name}一边浮现出淫乱的笑容一边在${player_name}的腰的上面跳着淫乱的舞蹈。`,
          ); // :4658
          await era.printAndWait(
            `「啊哈嗯${heart(1)} 继续…继续侵犯吧…把肛门弄得乱七八糟的吧${heart(1)}」`,
          ); // :4659
          await era.printAndWait(
            `${player_name}因为那诱惑性的姿态而舔了舔嘴唇，更激烈的挺着腰侵犯着肛门………`,
          ); // :4660
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :4662
        era.set(`cflag:${target}:337`, 7); // :4662
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:337`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊…还、还是…很紧呢…嗯啊嗯${heart(1)}」`); // :4665
        await era.printAndWait(
          `${target_name}虽然一脸痛苦、但未开发的肛门还是埋下了${player_name}的阴茎。`,
        ); // :4666
        await era.printAndWait(`「嗯！…过、果然…魔王大人的肉棒…啊啊哈！」`); // :4667
        await era.printAndWait(`${target_name}的肛门被扩张到了极限………`); // :4668
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :4669
        era.set(`cflag:${target}:337`, 6); // :4669
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:337`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「啊啊…请好好感受我的肛门吧${heart(1)}…啊啊啊嗯啊哈${heart(1)}」`,
          ); // :4673
          await era.printAndWait(
            `${target_name}开发完成了的肛门轻易的接受了${player_name}的阴茎。`,
          ); // :4674
          await era.printAndWait(
            `满是陶醉的表情的${target_name}的腰一被抓住，就变成了满是期待的表情。`,
          ); // :4675
          await era.printAndWait(
            `「嗯…插、插进来了…魔王大人请把我的屁股弄得乱七八糟的吧…${heart(1)}」`,
          ); // :4676
          await era.printAndWait(''); // :4677-4679
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊哈${heart(1)} 好舒服啊…好舒服啊啊嗯啊哈嗯${heart(1)}」`,
          ); // :4679
          await era.printAndWait(
            `${target_name}的肛门把${player_name}的阴茎直到根部都吞了进去。`,
          ); // :4680
          await era.printAndWait(
            `一边享受着秘裂因为快感而漏出爱液的淫靡的光景、${player_name}一边挺着腰。`,
          ); // :4681
          await era.printAndWait(
            `「啊啊啊啊嗯${heart(1)} 明、明明应该让我来动…嗯啊嗯咦${heart(1)}」`,
          ); // :4682
        } else {
          await era.printAndWait(
            `「肛门这么有感觉什么的${heart(1)} 我、我…啊啊嗯${heart(1)}」`,
          ); // :4684
          await era.printAndWait(
            `${player_name}像抓缰绳一样握住${target_name}的手、腰反复的激烈向上抽送着。`,
          ); // :4685
          await era.printAndWait(
            `「啊哈啊啊嗯啊啊…咦、再、再继续的话…啊啊啊啊嗯…要、要融化了啊${heart(1)}」`,
          ); // :4686
          await era.printAndWait(
            `${target_name}的完成开发的肛门随着被插而不停地包裹着${player_name}的阴茎………`,
          ); // :4687
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :4689
        era.set(`cflag:${target}:337`, 5); // :4689
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:337`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「肛门里…被魔王大人填满了…${heart(1)} 啊嗯好紧！」`,
        ); // :4692
        await era.printAndWait(
          `${target_name}未开发的肛门接受着${player_name}的阴茎。`,
        ); // :4693
        await era.printAndWait(
          `温柔的抚摸着一脸痛苦的样子的${target_name}的腰、${target_name}突然笑了起来。`,
        ); // :4694
        await era.printAndWait(`「啊啊…没必要这样关心我…啊啊啊啊哈嗯！」`); // :4695
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :4696
        era.set(`cflag:${target}:337`, 4); // :4696
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:337`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯啊嗯啊啊！我、我的肛门…这么呀啊…啊啊啊！」`,
        ); // :4699
        await era.printAndWait(
          `${target_name}的开发完成的肛门轻易接受并紧紧包裹着${player_name}的阴茎。`,
        ); // :4700
        await era.printAndWait(
          `${player_name}抓住${target_name}的腰开始不停的向上插着。`,
        ); // :4701
        await era.printAndWait(
          `「啊啊啊啊！不行…不行…这么做的话我…我…啊啊哈啊！」`,
        ); // :4702
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :4703
        era.set(`cflag:${target}:337`, 3); // :4703
      } else if (era0(`cflag:${target}:337`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊咕…好、好紧啊…不、不要太激烈的动啊…啊啊啊！」`,
        ); // :4706
        await era.printAndWait(
          `${target_name}的未开发的肛门紧紧包裹着${player_name}的阴茎。`,
        ); // :4707
        await era.printAndWait(`「哈咕！不、不要这么插啊！啊啊啊啊——！」`); // :4708
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :4709
        era.set(`cflag:${target}:337`, 2); // :4709
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (era0(`cflag:${target}:338`) == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊…屈辱啊这样…但是…不能抗命…嗯啾…啾…啾………」`,
        ); // :4723
        await era.printAndWait(
          `${target_name}虽然屈辱的留下了眼泪，还是用舌头舔在${player_name}的肛门上………`,
        ); // :4724
      } else {
        await era.printAndWait(
          `「啊啊…好恶心…好恶心啊…嗯…嗯啊…啾…嗯…嗯咕………」`,
        ); // :4727
        await era.printAndWait(
          `${target_name}一边流着屈辱的泪水一边舔着${player_name}的肛门………`,
        ); // :4728
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :4730
      era.set(`cflag:${target}:338`, 1); // :4730
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊哈啊…可以舔魔王大人的屁股什么的${heart(1)} 嗯啾啾啪啾啾嗯唔啾${heart(1)}」`,
        ); // :4736
        await era.printAndWait(
          `${target_name}故意发出着下流的声音，舔着${player_name}的肛门。`,
        ); // :4737
        await era.printAndWait(
          `「啊哈啊啊…这样肛门奉仕…我的身体也发热变得奇怪起来了${heart(1)} 嗯啾啾嗯啾嗯啾♪」`,
        ); // :4738
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :4739
        era.set(`cflag:${target}:338`, 5); // :4739
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…魔王大人的屁股…真美味啊…嗯啾啾嗯啾啾啾${heart(1)}」`,
        ); // :4742
        await era.printAndWait(
          `${target_name}一边流下着唾液一边用舌头像钻头一样钻进${player_name}的肛门。`,
        ); // :4743
        await era.printAndWait(`「嗯咕…嗯啾啾啾啪…啾咕啾啾——${heart(1)}」`); // :4744
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :4745
        era.set(`cflag:${target}:338`, 4); // :4745
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:338`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯啾…啾…啾…不继续…是不行的吧…嗯啾…啾」`,
        ); // :4748
        await era.printAndWait(
          `${target_name}虽然感觉很屈辱但还是继续奉仕着${player_name}的肛门………`,
        ); // :4749
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :4750
        era.set(`cflag:${target}:338`, 3); // :4750
      } else if (era0(`cflag:${target}:338`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「已…已经受不了了…嗯啾…啾…啾…」`); // :4753
        await era.printAndWait(
          `${target_name}一边流着屈辱的泪水一边舔着${player_name}的肛门………`,
        ); // :4754
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :4755
        era.set(`cflag:${target}:338`, 2); // :4755
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (era0(`cflag:${target}:341`) == 0) {
      await era.printAndWait(
        `「啊呀！？快、快停下！这种用来对付小孩子的恶作剧的教育方式！啊呀！咦！」`,
      ); // :4767
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :4768
      era.set(`cflag:${target}:341`, 1); // :4768
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:341`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊咦…啊嗯！啊啊啊！继续…继续打我的屁股吧${heart(1)}」`,
        ); // :4774
        await era.printAndWait(
          `${target_name}每次被打屁股都左右摇动着腰、爱液咕噜咕噜的往外冒着。`,
        ); // :4775
        await era.printAndWait(
          `「被魔王大人欺负的受不了了…啊啊继续虐待我吧…${heart(1)}」`,
        ); // :4776
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :4777
        era.set(`cflag:${target}:341`, 5); // :4777
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:341`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…我是魔王大人的东西…所以请疼爱我的…嗯！啊嗯！屁股吧${heart(1)}」`,
        ); // :4780
        await era.printAndWait(
          `${target_name}每次被打屁股都会左右摇动诱惑着${player_name}。`,
        ); // :4781
        await era.printAndWait(
          `「啊嗯！咦！啊哈！啊啊啊啊啊啊…让人停不下来啊${heart(1)}」`,
        ); // :4782
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :4783
        era.set(`cflag:${target}:341`, 4); // :4783
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:341`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊！啊嗯！咦咦——————！求你了！求你原谅我吧！啊咦咦咦咦咦咦！」`,
        ); // :4786
        await era.printAndWait(
          `${target_name}就那样双手被按住，一次次的打着屁股，发出着悲鸣。`,
        ); // :4787
        await era.printAndWait(`想要逃走但还是无法从${player_name}哪里逃开………`); // :4788
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :4789
        era.set(`cflag:${target}:341`, 3); // :4789
      } else if (era0(`cflag:${target}:341`) <= 1 && era0('flag:7') == 2) {
        await era.printAndWait(
          `「不！不要！快停下啊！咦！阿姨！我又不是小孩子啊！」`,
        ); // :4792
        await era.printAndWait(`${target_name}的屁股被打得通红通红的………`); // :4793
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :4794
        era.set(`cflag:${target}:341`, 2); // :4794
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (era0(`cflag:${target}:342`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊嗯…啊啊啊！我、我…不要这么痛啊！咦嗯！啊啊啊啊！」`,
        ); // :4808
        await era.printAndWait(
          `${target_name}随着被鞭打而抱着身子拼死躲避着………`,
        ); // :4809
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…如果魔王大人想这么做的话…我会老实的接受鞭打的………」`,
        ); // :4812
        await era.printAndWait(
          `${target_name}带着好像放弃了什么的感觉接受着鞭打………`,
        ); // :4813
      } else {
        await era.printAndWait(
          `「啊啊啊！咦！不、不要啊！这样的话会留下伤痕…啊呀啊啊啊啊啊！」`,
        ); // :4816
        await era.printAndWait(`${target_name}随着被鞭打而发出了悲鸣………`); // :4817
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :4819
      era.set(`cflag:${target}:342`, 1); // :4819
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:342`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼哇啊啊…让人停不下来啊…魔王大人的鞭子…啊嗯…这么有感觉什么的…啊啊…咦${heart(1)}」`,
        ); // :4825
        await era.printAndWait(`${target_name}因为被鞭打，股间垂下了爱液………`); // :4826
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :4827
        era.set(`cflag:${target}:342`, 9); // :4827
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:342`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…总感觉被鞭子欺负…的感觉变得舒服起来了…啊嗯啊咦…咦——！」`,
        ); // :4830
        await era.printAndWait(`${target_name}被鞭打而发出了像是娇喘的悲鸣………`); // :4831
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :4832
        era.set(`cflag:${target}:342`, 8); // :4832
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:342`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…啊啊啊！我、我…不要这么痛啊！咦嗯！啊啊啊啊！」`,
        ); // :4835
        await era.printAndWait(
          `${target_name}随着被鞭打而抱着身子拼死躲避着………`,
        ); // :4836
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :4837
        era.set(`cflag:${target}:342`, 7); // :4837
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:342`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「继续…继续鞭打我吧…啊啊…这就是魔王大人的爱呢…${heart(1)}」`,
        ); // :4840
        await era.printAndWait(
          `${target_name}就那样带着恍惚的表情继续接受着${player_name}的鞭子………`,
        ); // :4841
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :4842
        era.set(`cflag:${target}:342`, 6); // :4842
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:342`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊哈…啊嗯…咕…我慢慢理解了被魔王大人鞭打的快感了………${heart(1)}」`,
        ); // :4845
        await era.printAndWait(
          `${target_name}微微一笑，继续接受着${player_name}的鞭子………`,
        ); // :4846
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :4847
        era.set(`cflag:${target}:342`, 5); // :4847
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:342`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…如果魔王大人想这么做的话…我会老实的接受鞭打的………」`,
        ); // :4850
        await era.printAndWait(
          `${target_name}带着好像放弃了什么的感觉接受着鞭打………`,
        ); // :4851
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :4852
        era.set(`cflag:${target}:342`, 4); // :4852
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:342`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「被…鞭打的地方一阵一阵的发痛…嗯…我…要变的奇怪了…啊啊啊！」`,
        ); // :4855
        await era.printAndWait(
          `${target_name}好像理解了被鞭打的快感、${player_name}的手也开始发烫………`,
        ); // :4856
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :4857
        era.set(`cflag:${target}:342`, 3); // :4857
      } else if (era0(`cflag:${target}:335`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「求你了…停下…快停下…被鞭子打了的话就没法躺着睡觉了…啊咕咦咦——！」`,
        ); // :4860
        await era.printAndWait(
          `${player_name}无视${target_name}的祈求，毫不留情的又追加了一击………`,
        ); // :4861
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :4862
        era.set(`cflag:${target}:342`, 2); // :4862
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (era0(`cflag:${target}:343`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊！不、不行啊！虽说用我让你来变舒服的做什么都可以…这、这么痛的…咦——！」`,
        ); // :4876
        await era.printAndWait(`${target_name}随着被针刺着而发出着悲鸣………`); // :4877
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯咕…魔王大人想要的话…不管怎么伤害我的身体都没关系………」`,
        ); // :4880
        await era.printAndWait(`${target_name}带着放弃了的表情低语着………`); // :4881
      } else {
        await era.printAndWait(`「这、这样犯规了啊！不、不不啊啊啊啊！」`); // :4884
        await era.printAndWait(
          `${target_name}只是被针轻轻的扎了一下就发出了悲鸣………`,
        ); // :4885
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :4887
      era.set(`cflag:${target}:343`, 1); // :4887
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:343`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…魔王大人…继续用针刺我吧…啊啊…啊啊啊………${heart(1)}」`,
        ); // :4893
        await era.printAndWait(
          `${target_name}好像觉醒了被${player_name}用针刺的快感………`,
        ); // :4894
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :4895
        era.set(`cflag:${target}:343`, 9); // :4895
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:343`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊咕！我的肌肤上这种伤…啊啊啊啊！啊咕嗯…啊呜——！」`,
        ); // :4898
        await era.printAndWait(`${target_name}随着针刺而扭动着身体发出悲鸣………`); // :4899
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :4900
        era.set(`cflag:${target}:343`, 8); // :4900
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:343`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊！啊啊啊！这、这么…疼的不要啊！咦咕啊啊啊啊啊！」`,
        ); // :4903
        await era.printAndWait(
          `${target_name}因为针刺而发出着悲鸣。好像就快要失禁了………`,
        ); // :4904
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :4905
        era.set(`cflag:${target}:343`, 7); // :4905
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:343`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哦哦哦哦…继续…继续扎我…感觉到了魔王大人深深的爱了…啊啊啊啊${heart(1)}」`,
        ); // :4908
        await era.printAndWait(
          `${target_name}的身体被数根针插着，流着血、但是那个姿态的${target_name}也很美………`,
        ); // :4909
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :4910
        era.set(`cflag:${target}:343`, 6); // :4910
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:343`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…哈啊哈啊…继续…继续刺伤我吧…啊…咦咦——！」`,
        ); // :4913
        await era.printAndWait(`${target_name}随着被针刺而发出着娇喘………`); // :4914
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :4915
        era.set(`cflag:${target}:343`, 5); // :4915
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:343`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…在我的身体上…咦！留下魔王大人的伤痕…印记吧…啊咦——！」`,
        ); // :4918
        await era.printAndWait(`${target_name}随着被针刺而发出着悲鸣………`); // :4919
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :4920
        era.set(`cflag:${target}:343`, 4); // :4920
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:343`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯啊啊！…不…不要…疼！啊啊…哈…嗯啊…啊啊……嗯啊啊啊嗯！」`,
        ); // :4923
        await era.printAndWait(
          `${target_name}虽然因为针刺而发出着悲鸣，但有时也会听见妖艳的声音………`,
        ); // :4924
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :4925
        era.set(`cflag:${target}:343`, 3); // :4925
      } else if (era0(`cflag:${target}:343`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「啊啊！咦！饶、饶…饶了我吧…啊啊啊啊啊！」`); // :4928
        await era.printAndWait(`${target_name}随着被针刺着而发出着悲鸣………`); // :4929
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :4930
        era.set(`cflag:${target}:343`, 2); // :4930
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (era0(`cflag:${target}:344`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呵呵呵…是想把眼睛看不见的我弄得乱七八糟的呢…♪」`,
        ); // :4945
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…这样让我觉得很不安…请不要放开我的手啊………」`,
        ); // :4948
      } else {
        await era.printAndWait(
          `「眼罩…呢、不喜欢这样啊、不会就这样把我吊起来吧？」`,
        ); // :4951
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4953
      era.set(`cflag:${target}:344`, 1); // :4953
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…我…只是戴上眼罩而已…就这么…兴奋…啊啊啊啊${heart(1)}」`,
        ); // :4959
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4960
        era.set(`cflag:${target}:344`, 9); // :4960
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「哈啊哈啊…让人心跳不已停不下来啊…♪」`); // :4963
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4964
        era.set(`cflag:${target}:344`, 8); // :4964
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:344`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「呵呵呵、要怎样让我高兴呢………？」`); // :4967
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4968
        era.set(`cflag:${target}:344`, 7); // :4968
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「把眼睛看不见的我…弄得乱七八糟的吧…♪」`); // :4971
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4972
        era.set(`cflag:${target}:344`, 6); // :4972
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…什么都看不见就这样被你随意玩弄…让人停不下来啊………」`,
        ); // :4975
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4976
        era.set(`cflag:${target}:344`, 5); // :4976
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:344`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「是的…我不管被魔王大人都可以………」`); // :4979
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4980
        era.set(`cflag:${target}:344`, 4); // :4980
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「到底要对眼睛看不见的我…做什么事呢………」`); // :4983
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4984
        era.set(`cflag:${target}:344`, 3); // :4984
      } else if (era0(`cflag:${target}:344`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「有点害怕………」`); // :4987
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4988
        era.set(`cflag:${target}:344`, 2); // :4988
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:380`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「呵呵呵、已经非常兴奋了…♪」`); // :4996
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :4997
      era.set(`cflag:${target}:380`, 3); // :4997
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:380`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊啊…明明继续就那样眼睛被遮住着被魔王大人抱就好了………」`,
      ); // :5000
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :5001
      era.set(`cflag:${target}:380`, 2); // :5001
    } else if (era0(`cflag:${target}:380`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「呼………什、什么事都没有」`); // :5004
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :5005
      era.set(`cflag:${target}:380`, 1); // :5005
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    if (era0(`cflag:${target}:345`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呵呵呵、就这样自由被夺取着侵犯…这么常见的固定的模式让人停不下来啊…♪」`,
        ); // :5019
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…这样让我感觉我变成壳魔王大人的东西…让人停不下来啊………」`,
        ); // :5022
      } else {
        await era.printAndWait(`「啊啊！因为会留下痕迹所以不要绑的太近啊！」`); // :5025
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :5027
      era.set(`cflag:${target}:345`, 1); // :5027
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:345`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…啊啊啊…我的绳化妆…请继续看吧…哈啊哈啊…这是为了被侵犯而化的妆…${heart(1)}」`,
        ); // :5033
        await era.printAndWait(`${target_name}已经完全陷入发情状态了………`); // :5034
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :5035
        era.set(`cflag:${target}:345`, 9); // :5035
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:345`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…被绑着…感觉子宫在抽动…啊啊………${heart(1)}」`,
        ); // :5038
        await era.printAndWait(
          `${target_name}因为被绳子紧紧地束缚着而发出着娇喘………`,
        ); // :5039
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :5040
        era.set(`cflag:${target}:345`, 8); // :5040
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:345`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…请激烈的侵犯被绑住的我吧…嗯…啊啊${heart(1)}」`,
        ); // :5043
        await era.printAndWait(
          `${target_name}因为被绳子绑住而发出灼热的吐息………`,
        ); // :5044
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :5045
        era.set(`cflag:${target}:345`, 7); // :5045
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:345`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…只是这样被绑着而已我…就这么舒服了…啊啊…啊啊啊啊………」`,
        ); // :5048
        await era.printAndWait(`${target_name}已经完全陷入发情状态了………`); // :5049
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :5050
        era.set(`cflag:${target}:345`, 6); // :5050
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:345`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「是的…再紧点…绑的再紧点吧…啊…啊啊啊…${heart(1)}」`,
        ); // :5053
        await era.printAndWait(
          `${target_name}因为被绳子紧紧地束缚着而发出着娇喘………`,
        ); // :5054
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :5055
        era.set(`cflag:${target}:345`, 5); // :5055
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:345`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…不止我的心，连身体也困住什么的…啊啊…啊啊啊啊………」`,
        ); // :5058
        await era.printAndWait(`${target_name}因为被绳子绑住而陶醉着………`); // :5059
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :5060
        era.set(`cflag:${target}:345`, 4); // :5060
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:345`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊…嗯…哈啊哈啊…这么紧…啊…啊啊！」`); // :5063
        await era.printAndWait(`${target_name}因为被绳子穿过，束缚而喘息着………`); // :5064
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :5065
        era.set(`cflag:${target}:345`, 3); // :5065
      } else if (era0(`cflag:${target}:345`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「啊咕…已、已经够紧了…所以不要再紧…咦！」`); // :5068
        await era.printAndWait(
          `${target_name}被紧紧地束缚着、漏出了痛苦的喘息………`,
        ); // :5069
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :5070
        era.set(`cflag:${target}:345`, 2); // :5070
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:385`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「明明就那样被绑住被放置也很不错呢…呵呵呵」`); // :5078
      await era.printAndWait(`${target_name}眯着眼睛陶醉的笑着………`); // :5079
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :5080
      era.set(`cflag:${target}:385`, 2); // :5080
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:385`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「对我的束缚已经够了吗………？」`); // :5083
      await era.printAndWait(`${target_name}好像还没玩够………`); // :5084
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :5085
      era.set(`cflag:${target}:385`, 2); // :5085
    } else if (era0(`cflag:${target}:385`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「啊啊…果然留下痕迹了啊………」`); // :5088
      await era.printAndWait(`${target_name}拼命的抚摸着被束缚的痕迹………`); // :5089
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :5090
      era.set(`cflag:${target}:385`, 1); // :5090
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    if (era0(`cflag:${target}:346`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「不想听见我的喘息声吗…？ 啊…嗯…嗯咕………」`); // :5104
        await era.print(`${target_name}因为嘴被塞住而稍稍不满的`); // :5105
        if (era0(`tequip:${target}:43`)) {
          await era.printAndWait(`动了起来………`); // :5107
        } else {
          await era.printAndWait(`用眼睛凝视着${player_name}………`); // :5109
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊啊…请更多的拘束我吧…嗯…嗯咕…嗯呼呼…♪」`); // :5113
        await era.print(`${target_name}好像期待着什么就那样`); // :5114
        if (era0(`tequip:${target}:43`)) {
          await era.printAndWait(`动了起来………`); // :5116
        } else {
          await era.printAndWait(`用眼睛凝视着${player_name}………`); // :5118
        }
      } else {
        await era.printAndWait(
          `「不、不要啊…这个好像其他人也用过…嗯！嗯咕………！」`,
        ); // :5122
        await era.print(`${target_name}的嘴被口枷塞住，`); // :5123
        if (era0(`tequip:${target}:43`)) {
          await era.printAndWait(`左右摇着头………`); // :5125
        } else {
          await era.printAndWait(`瞪着${player_name}………`); // :5127
        }
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :5130
      era.set(`cflag:${target}:346`, 1); // :5130
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:346`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…戴上口枷变的呼吸苦难…非常舒服啊…${heart(1)} 嗯…嗯咕………」`,
        ); // :5136
        await era.printAndWait(
          `${target_name}一被带上口枷就露出了陶醉的表情………`,
        ); // :5137
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :5138
        era.set(`cflag:${target}:346`, 9); // :5138
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:346`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯啊…我说不定…喜欢上被戴上口枷了♪ 嗯…嗯咕………」`,
        ); // :5141
        await era.printAndWait(
          `${target_name}一被带上口枷就露出了陶醉的表情………`,
        ); // :5142
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :5143
        era.set(`cflag:${target}:346`, 8); // :5143
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:346`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「虽然我的喘息声音可能确实有点大…嗯咕………」`); // :5146
        await era.print(`${target_name}因为嘴被塞住而稍稍不满的`); // :5147
        if (era0(`tequip:${target}:43`)) {
          await era.printAndWait(`动了起来………`); // :5149
        } else {
          await era.printAndWait(`用眼睛凝视着${player_name}………`); // :5151
        }
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :5153
        era.set(`cflag:${target}:346`, 7); // :5153
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:346`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「连我说话…都需要魔王大人的许可呢…好棒…嗯…嗯咕………${heart(1)}」`,
        ); // :5156
        await era.printAndWait(
          `${target_name}一被带上口枷就露出了陶醉的表情………`,
        ); // :5157
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :5158
        era.set(`cflag:${target}:346`, 6); // :5158
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:346`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…喘不过气让人停不下来啊…嗯咕…嗯～♪」`,
        ); // :5161
        await era.printAndWait(
          `${target_name}一被带上口枷就露出了陶醉的表情………`,
        ); // :5162
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :5163
        era.set(`cflag:${target}:346`, 5); // :5163
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:346`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊啊…我的嘴被塞住了♪………嗯…嗯咕…♪」`); // :5166
        await era.print(`${target_name}好像期待着什么就那样`); // :5167
        if (era0(`tequip:${target}:43`)) {
          await era.printAndWait(`动了起来………`); // :5169
        } else {
          await era.printAndWait(`用眼睛凝视着${player_name}………`); // :5171
        }
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :5173
        era.set(`cflag:${target}:346`, 4); // :5173
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:346`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「啊咕…嗯…嗯咕…嗯…额呼………」`); // :5176
        await era.printAndWait(
          `${target_name}一被带上口枷就露出了陶醉的表情………`,
        ); // :5177
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :5178
        era.set(`cflag:${target}:346`, 3); // :5178
      } else if (era0(`cflag:${target}:346`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「啊咕…嗯…嗯咕…嗯…嗯嗯！」`); // :5181
        await era.print(`${target_name}的嘴被口枷塞住`); // :5182
        if (era0(`tequip:${target}:43`)) {
          await era.printAndWait(`左右摇着头………`); // :5184
        } else {
          await era.printAndWait(`瞪着${player_name}………`); // :5186
        }
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :5188
        era.set(`cflag:${target}:346`, 2); // :5188
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:386`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「哈呼…啊、这么多口水…好害羞啊………」`); // :5196
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :5197
      era.set(`cflag:${target}:386`, 3); // :5197
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:386`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嗯啊啊…咳咳咳…对、对不起、我没关系的………」`); // :5200
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :5201
      era.set(`cflag:${target}:386`, 2); // :5201
    } else if (era0(`cflag:${target}:386`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(`「咕哈…哈啊哈啊…再、再也不要这样了………」`); // :5204
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :5205
      era.set(`cflag:${target}:386`, 1); // :5205
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    if (era0(`cflag:${target}:347`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「是、是的呢…肛门sex的话不做这种准备是不行的呢…啊咕…啊啊啊…肚子里…这样…啊啊啊啊啊～！」`,
        ); // :5219
        await era.printAndWait(
          `${player_name}在${target_name}的肛门里注入了接近一公升的灌肠液………`,
        ); // :5220
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊啊啊啊…如果是魔王大人希望的话…我、不管多害羞的事…咦——…肚子…肚子里好烫啊！」`,
        ); // :5223
        await era.printAndWait(
          `${player_name}就那样在${target_name}的肛门里注入了接近一公升的灌肠液………`,
        ); // :5224
      } else {
        await era.printAndWait(
          `「咦咦咦————！？不要！不要啊啊啊啊肚子里…肚子里好烫啊…快、快停下…不要啊啊啊啊！」`,
        ); // :5227
        await era.printAndWait(
          `${player_name}一边压着嚎啕大哭着${target_name}，一边将将近一公升的灌肠液注入了肛门………`,
        ); // :5228
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :5230
      era.set(`cflag:${target}:347`, 1); // :5230
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:347`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…嗯…啊啊啊啊…继续…继续注入进来也没关系呦…想要肚子继续咕噜咕噜的叫呢${heart(1)}」`,
        ); // :5236
        await era.printAndWait(
          `${player_name}如${target_name}所愿的那样把比平时更多的灌肠液注入了进去………`,
        ); // :5237
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :5238
        era.set(`cflag:${target}:347`, 7); // :5238
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:347`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…好的…侵犯我的肛门之前不好好的弄干净是不行的呢…唔噗…啊唔～！」`,
        ); // :5241
        await era.printAndWait(
          `${player_name}在${target_name}的肛门里注入了接近一公升的灌肠液………`,
        ); // :5242
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :5243
        era.set(`cflag:${target}:347`, 6); // :5243
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:347`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊哈…哈啊哈啊…我的肚子非常的舒服啊…啊啊啊啊…就这样拔掉塞子的话会变成什么样呢${heart(1)}」`,
        ); // :5246
        await era.printAndWait(
          `${target_name}的肛门一边开心的抖动着一边把接近一公升的灌肠液全部吞了下去………`,
        ); // :5247
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :5248
        era.set(`cflag:${target}:347`, 5); // :5248
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:347`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈咕…肚子…肚子好烫啊…啊咕…啊啊啊啊…灌进去这么多………」`,
        ); // :5251
        await era.printAndWait(
          `${player_name}就那样把接近一公升的灌肠液注入了${target_name}的肛门………`,
        ); // :5252
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :5253
        era.set(`cflag:${target}:347`, 4); // :5253
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:347`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊…哈！哈啊…肚子里…满满的…啊啊啊…明明很痛苦…我为什么…这样…哈啊啊啊啊～！」`,
        ); // :5256
        await era.printAndWait(
          `${target_name}好像觉醒了灌肠的快感，就那样老实的被注入着灌肠液………`,
        ); // :5257
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :5258
        era.set(`cflag:${target}:347`, 3); // :5258
      } else if (era0(`cflag:${target}:347`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「不、不要啊！强行…拉出来什么的…屈辱啊…咦咦咦咦咦咦咦！」`,
        ); // :5261
        await era.printAndWait(
          `${player_name}一边压着嚎啕大哭着${target_name}，一边将将近一公升的灌肠液注入了肛门………`,
        ); // :5262
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :5263
        era.set(`cflag:${target}:347`, 2); // :5263
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (era0(`cflag:${target}:356`) == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呵呵呵、是休息吗魔王大人…？」`); // :5277
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「很少见呢…只是看什么的………」`); // :5280
      } else {
        await era.printAndWait(`「你、你看什么呢………？」`); // :5283
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :5285
      era.set(`cflag:${target}:356`, 1); // :5285
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`palam:${target}:5`) >= era0('palamlv:3') &&
        (era0(`cflag:${target}:356`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊！不要这样让我着急啊…明明我现在就想被魔王大人侵犯！」`,
        ); // :5290
        await era.printAndWait(
          `${target_name}好像忍耐不住了，像狗一样四肢着地在${player_name}的脚边撒着娇………`,
        ); // :5291
        // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :5292
        era.set(`cflag:${target}:356`, 6); // :5292
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:356`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「只是看的话很无聊吧…？」`); // :5295
        await era.printAndWait(
          `${target_name}用手臂托起自己的巨乳诱惑着${player_name}………`,
        ); // :5296
        // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :5297
        era.set(`cflag:${target}:356`, 5); // :5297
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= era0('palamlv:3') &&
        (era0(`cflag:${target}:356`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…明明知道我现在正在祈求什么…好过分啊魔王大人………」`,
        ); // :5300
        await era.printAndWait(`${target_name}那湿润的瞳孔已经充满了欲请………`); // :5301
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :5302
        era.set(`cflag:${target}:356`, 4); // :5302
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:356`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「呼…是休息吗魔王大人？　但是这里连一杯茶都端不出来呢………」`,
        ); // :5305
        await era.printAndWait(`${target_name}微笑着………`); // :5306
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :5307
        era.set(`cflag:${target}:356`, 3); // :5307
      } else if (era0(`cflag:${target}:356`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(`「你、你看什么呢………？」`); // :5310
        await era.printAndWait(`${target_name}惊讶的看着这边………`); // :5311
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :5312
        era.set(`cflag:${target}:356`, 2); // :5312
      }
    }
    await era.print(''); // :5315

    if (era0(`tequip:${target}:11`)) {
      await era.printAndWait(
        `${target_name}的秘裂里蠕虫笨拙的、毫不留情的在腔内搅动着。`,
      ); // :5318
    }

    if (era0(`tequip:${target}:13`)) {
      await era.printAndWait(
        `${target_name}的肛门里蠕虫笨拙的、毫不留情的蹂躏着肛门。`,
      ); // :5321
    }

    if (era0(`tequip:${target}:19`)) {
      await era.printAndWait(`${target_name}的肛门里插入着肛珠、肛门紧锁着。`); // :5324
    }

    if (era0(`tequip:${target}:14`)) {
      await era.printAndWait(
        `${target_name}的阴蒂被按上的阴蒂夹不停地刺激着。`,
      ); // :5327
    }

    if (era0(`tequip:${target}:15`)) {
      await era.printAndWait(
        `${target_name}的乳头被按上的乳头夹不停地刺激着。`,
      ); // :5330
    }

    if (era0(`tequip:${target}:16`)) {
      await era.print(`${target_name}的胸被装上的榨乳器榨取着母乳。`); // :5333
    }

    if (era0(`tequip:${target}:17`)) {
      await era.printAndWait(
        `${target_name}的阴茎被装上了飞机杯，现在也好像快要射精了似的抖动着。`,
      ); // :5336
    }

    if (era0(`tequip:${target}:43`)) {
      await era.printAndWait(`${target_name}被戴上了眼罩。`); // :5339
    }

    if (era0(`tequip:${target}:44`)) {
      await era.printAndWait(`${target_name}的身体被绳子绑住，拘束着。`); // :5342
    }

    if (era0(`tequip:${target}:46`)) {
      await era.printAndWait(
        `${target_name}的肚子因为灌肠而发出咕噜咕噜的声音、如果把塞子拔出来的话，好像马上就会排出来似的。`,
      ); // :5345
    }

    if (era0(`tequip:${target}:49`)) {
      await era.printAndWait(
        `${target_name}的肛门里插入着电极、括约肌随着轻微的电流流过而抖动着。`,
      ); // :5348
    }

    if (era0(`tequip:${target}:53`)) {
      await era.printAndWait(
        `然后、这样的${target_name}的身姿被完全录了下来………`,
      ); // :5351
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`cflag:${target}:357`) == 0) {
      if (era0(`tequip:${target}:53`) == 1 && era0(`talent:${target}:153`)) {
        await era.printAndWait(
          `${master_name}催促着${target_name}要给狂王发送的消息。`,
        ); // :5364

        if (era0(`talent:${target}:85`) && era0('tflag:60')) {
          await era.printAndWait(
            `「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪啊啊嗯魔王大人太激烈了啊${heart(1)}」`,
          ); // :5367
          await era.printAndWait(
            `这么说着的${target_name}一边被${player_name}侵犯着一边发出着给狂王的信息………`,
          ); // :5368
        } else if (era0(`talent:${target}:85`)) {
          await era.printAndWait(
            `「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪」`,
          ); // :5371
          await era.printAndWait(
            `这么说着的${target_name}一边高兴地抚摸着腹部一边报告着妊娠………`,
          ); // :5372
        } else if (era0(`talent:${target}:76`) && era0('tflag:60')) {
          await era.printAndWait(
            `「啊啊嗯…妊娠sex最棒了啊啊啊啊啊嗯啊…马上就要生出来了${heart(1)} 啊啊出产的影响也会送过去的啊${heart(1)}」`,
          ); // :5375
          await era.printAndWait(
            `${target_name}双手比划着V字被${player_name}侵犯着………`,
          ); // :5376
        } else if (era0(`talent:${target}:76`)) {
          await era.printAndWait(
            `「啊哈…我妊娠了呢…你看、已经长这么大了呢…${heart(1)}」`,
          ); // :5379
          await era.printAndWait(
            `${target_name}一边高兴地抚摸着鼓起的肚子一边报告着妊娠………`,
          ); // :5380
        } else if (era0('tflag:60')) {
          await era.printAndWait(
            `${target_name}就那样挺着肚子被${player_name}侵犯的期间、一句话都没说………`,
          ); // :5383
        } else {
          await era.printAndWait(
            `被什么都不说的${target_name}惹恼了的${player_name}举起了留言板。`,
          ); // :5385
          await era.printAndWait(
            `”我的肚子里有怪物的孩子${heart(1)} 改日去狂王大人哪里玩吧${heart(1)}”`,
          ); // :5386
        }
      } else if (era0(`tequip:${target}:53`) == 1) {
        await era.print(`${player_name}催促${target_name}进行自我介绍、`); // :5390
        if (era0(`talent:${target}:89`) || era0(`abl:${target}:17`) >= 5) {
          await era.print(`${target_name}把自己的本名和至今为止的性体验`); // :5392
          if (era0(`abl:${target}:31`) >= 3) {
            await era.print(`、甚至连自慰时妄想的内容都`); // :5394
          }
          await era.print(`高兴地讲了出来……`); // :5395
          await era.print(
            `一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……`,
          ); // :5396
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5397
          era.set('tflag:32 |', 2); // :5397
        } else if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}向着水晶球开始说出了下流的话`); // :5399
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5400
          era.set('tflag:32 |', 2); // :5400
        } else if (
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 3 ||
          era0(`abl:${target}:11`) >= 4 ||
          era0(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}向着水晶球做了自我介绍`); // :5402
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5403
          era.set('tflag:32 |', 2); // :5403
        } else {
          await era.print(`${target_name}头扭向一边什么都不说`); // :5405
        }
      } else {
        await era.print(`被${player_name}`); // :5408
        if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
          era0('tflag:60')
        ) {
          await era.print(`搭着话、${target_name}摇着腰说出了爱的话语`); // :5410
        } else if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
          era0('tflag:60')
        ) {
          await era.print(`搭着话、${target_name}摇着腰说出了下流的话语`); // :5412
        } else if (
          (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era0(`abl:${target}:10`) >= 5 ||
            era0(`talent:${target}:85`)) &&
          era0(`palam:${target}:5`) >= era0('palamlv:4')
        ) {
          await era.print(`搭着话、${target_name}一边发出`); // :5414
          if (
            era0(`tequip:${target}:11`) ||
            era0(`tequip:${target}:13`) ||
            era0(`tequip:${target}:14`) ||
            era0(`tequip:${target}:15`) ||
            era0(`tequip:${target}:16`) ||
            era0(`tequip:${target}:17`)
          ) {
            await era.print(`快乐的`); // :5416
          } else if (
            era0(`tequip:${target}:44`) ||
            era0(`tequip:${target}:49`)
          ) {
            await era.print(`痛苦的`); // :5418
          }
          await era.print(`的声音、一边拼死的回着话`); // :5420
        } else if (
          era0(`palam:${target}:4`) >= era0('palamlv:4') ||
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.print(`搭着话、${target_name}融洽的回着话`); // :5422
        } else if (
          era0(`palam:${target}:4`) >= era0('palamlv:2') ||
          era0(`abl:${target}:10`) >= 3
        ) {
          await era.print(`搭着话、${target_name}断断续续的回着话`); // :5424
        } else {
          await era.print(`搭着话、但是${target_name}好像没有认真听…`); // :5426
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :5429
      era.set(`cflag:${target}:357`, 1); // :5429
      return 0;
    } else {
      if (era0(`tequip:${target}:53`) == 1 && era0(`talent:${target}:153`)) {
        await era.printAndWait(
          `${master_name}催促着${target_name}发出给狂王的信息。`,
        ); // :5435

        if (era0(`talent:${target}:85`) && era0('tflag:60')) {
          await era.printAndWait(
            `「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪啊啊嗯魔王大人太激烈了啊${heart(1)}」`,
          ); // :5438
          await era.printAndWait(
            `这么说着的${target_name}一边被${player_name}侵犯着一边发出着给狂王的信息………`,
          ); // :5439
        } else if (era0(`talent:${target}:85`)) {
          await era.printAndWait(
            `「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪」`,
          ); // :5442
          await era.printAndWait(
            `这么说着的${target_name}一边高兴地抚摸着腹部一边报告着妊娠………`,
          ); // :5443
        } else if (era0(`talent:${target}:76`) && era0('tflag:60')) {
          await era.printAndWait(
            `「啊啊嗯…妊娠sex最棒了啊啊啊啊啊嗯啊…马上就要生出来了${heart(1)} 啊啊出产的影响也会送过去的啊${heart(1)}」`,
          ); // :5446
          await era.printAndWait(
            `${target_name}双手比划着V字被${player_name}侵犯着………`,
          ); // :5447
        } else if (era0(`talent:${target}:76`)) {
          await era.printAndWait(
            `「啊哈…我妊娠了呢…你看、已经长这么大了呢…${heart(1)}」`,
          ); // :5450
          await era.printAndWait(
            `${target_name}一边高兴地抚摸着鼓起的肚子一边报告着妊娠………`,
          ); // :5451
        } else if (era0('tflag:60')) {
          await era.printAndWait(
            `${target_name}就那样挺着肚子被${player_name}侵犯的期间、一句话都没说………`,
          ); // :5454
        } else {
          await era.printAndWait(
            `被什么都不说的${target_name}惹恼了的${player_name}举起了留言板。`,
          ); // :5456
          await era.printAndWait(
            `“我的肚子里有怪物的孩子${heart(1)} 改日去狂王大人哪里玩吧${heart(1)}”`,
          ); // :5457
        }
      } else if (era0(`tequip:${target}:53`) == 1) {
        await era.print(`${player_name}催促${target_name}进行自我介绍、`); // :5461
        if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
          era0('tflag:60')
        ) {
          await era.print(`${target_name}一边扭着腰一边向水晶球说着爱的话语`); // :5463
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5464
          era.set('tflag:32 |', 2); // :5464
        } else if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
          era0('tflag:60')
        ) {
          await era.print(
            `${target_name}一边扭着腰一边向水晶球喊出了下流的词语`,
          ); // :5466
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5467
          era.set('tflag:32 |', 2); // :5467
        } else if (
          rand_n(3) == 0 &&
          (era0(`talent:${target}:89`) || era0(`abl:${target}:17`) >= 5)
        ) {
          await era.print(`${target_name}把自己的本名和至今为止的性体验`); // :5469
          if (era0(`abl:${target}:31`) >= 3) {
            await era.print(`、甚至连自慰时妄想的内容都`); // :5471
          }
          await era.print(`高兴地讲了出来……`); // :5472
          await era.print(
            `一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……`,
          ); // :5473
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5474
          era.set('tflag:32 |', 2); // :5474
        } else if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5)
        ) {
          await era.print(`${target_name}向着水晶球开始说出了下流的话`); // :5476
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5477
          era.set('tflag:32 |', 2); // :5477
        } else if (
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 3 ||
          era0(`abl:${target}:11`) >= 4 ||
          era0(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}向着水晶球做了自我介绍`); // :5479
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5480
          era.set('tflag:32 |', 2); // :5480
        } else {
          await era.print(`${target_name}头扭向一边什么都不说`); // :5482
        }
      } else {
        await era.print(`被${player_name}`); // :5485
        if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&
          era0('tflag:60')
        ) {
          await era.print(`搭着话、${target_name}摇着腰说出了爱的话语`); // :5487
        } else if (
          era0(`palam:${target}:5`) >= era0('palamlv:4') &&
          (era0(`talent:${target}:76`) || era0(`abl:${target}:11`) >= 5) &&
          era0('tflag:60')
        ) {
          await era.print(`搭着话、${target_name}摇着腰说出了下流的话语`); // :5489
        } else if (
          (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era0(`abl:${target}:10`) >= 5 ||
            era0(`talent:${target}:85`)) &&
          era0(`palam:${target}:5`) >= era0('palamlv:4')
        ) {
          await era.print(`搭着话、${target_name}一边发出`); // :5491
          if (
            era0(`tequip:${target}:11`) ||
            era0(`tequip:${target}:13`) ||
            era0(`tequip:${target}:14`) ||
            era0(`tequip:${target}:15`) ||
            era0(`tequip:${target}:16`) ||
            era0(`tequip:${target}:17`)
          ) {
            await era.print(`快乐的`); // :5493
          } else if (
            era0(`tequip:${target}:44`) ||
            era0(`tequip:${target}:49`)
          ) {
            await era.print(`痛苦的`); // :5495
          }
          await era.print(`声音、一边拼死的回着话`); // :5497
        } else if (
          era0(`palam:${target}:4`) >= era0('palamlv:4') ||
          era0(`talent:${target}:85`) ||
          era0(`abl:${target}:10`) >= 5
        ) {
          await era.print(`搭着话、${target_name}融洽的回着话`); // :5499
        } else if (
          era0(`palam:${target}:4`) >= era0('palamlv:2') ||
          era0(`abl:${target}:10`) >= 3
        ) {
          await era.print(`搭着话、${target_name}断断续续的回着话`); // :5501
        } else {
          await era.print(`搭着话、但是${target_name}好像没有认真听…`); // :5503
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 123) {
    if (era0(`cflag:${target}:360`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「魔王大人的肉棒太有精神了…我不用胸部和嘴一起奉仕可不行啊${heart(1)}」`,
        ); // :5518
        await era.printAndWait(`「嗯呼…好吃…真好吃啊…嗯啾…啾啾…${heart(1)}」`); // :5519
        await era.printAndWait(
          `${target_name}的温暖的舌头包裹着${player_name}的阴茎………`,
        ); // :5520
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「是的…请享受我的巨乳和嘴的共同奉仕吧${heart(1)} 啾…嗯啾啾啾${heart(1)}」`,
        ); // :5523
        await era.printAndWait(
          `「哈呼…嗯…舒服吗？ 呵呵呵…什么时候射精都没关系哦…${heart(1)}」`,
        ); // :5524
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「啊啊…啊唔…讨厌…感觉变得比平时更大了呢…嗯…啾…啊啊…好热…啾…嗯咕……」`,
        ); // :5527

        if (era0('flag:500') == 1) {
          await era.printAndWait(`（变得…比狂王大人那时更兴奋什么的…我…）`); // :5530
        }
      } else {
        if (era0('flag:500') == 1) {
          await era.printAndWait(
            `「这样…奉仕狂王大人以外的人什么的…嗯啾啾…嗯…啾………」`,
          ); // :5535
        } else {
          await era.printAndWait(
            `「呼啊…啊啊…我、我明白了、好好地奉仕就可以了吧？嗯…啾…啾啾………」`,
          ); // :5537
        }
        await era.printAndWait(
          `${target_name}就那样被命令着用胸部夹着${player_name}的阴茎继续着口腔奉仕………`,
        ); // :5539
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :5541
      era.set(`cflag:${target}:360`, 1); // :5541
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:360`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯咕…嗯呼…嗯啾${heart(1)} 能用嘴和胸部品尝这么美味的肉棒什么的${heart(1)}」`,
        ); // :5547
        await era.printAndWait(
          `${target_name}用那对巨乳夹着${player_name}的阴茎，不停地发出粗重的喘息。`,
        ); // :5548
        await era.printAndWait(
          `「啊啊…好幸福啊…我已经…只要有肉棒就就能活下去了…${heart(1)} 嗯啾咕啾啾嗯啾${heart(1)}」`,
        ); // :5549
        // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :5550
        era.set(`cflag:${target}:360`, 5); // :5550
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:360`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯啾…啾…啊哈…魔王大人…我自满的巨乳和嘴的同时奉仕怎么样…${heart(1)}」`,
        ); // :5553
        await era.printAndWait(
          `${target_name}一边笑着一边不停地吻着${player_name}的阴茎的尖端，再次开始了奉仕。`,
        ); // :5554
        await era.printAndWait(
          `「啾啾…嗯啾…啊啊…在我的脸和胸部上慢慢的射出来吧…${heart(1)}」`,
        ); // :5555
        // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :5556
        era.set(`cflag:${target}:360`, 4); // :5556
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:360`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯啾…啾…呵呵呵、一边被我的巨乳夹住一边被舔非常非常舒服吧？」`,
        ); // :5559

        if (era0('flag:500') == 1) {
          await era.printAndWait(
            `「呵呵呵、不用忍耐也没关系哦、这个奉仕连狂王大人也忍耐不了呢♪ 嗯啾啾…啾♪」`,
          ); // :5562
        } else {
          await era.printAndWait(
            `「呵呵呵、不忍用耐也没关系哦…快点射精出来露出可怜的表情吧♪啾…啾…啾咕♪」`,
          ); // :5564
        }
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :5566
        era.set(`cflag:${target}:360`, 3); // :5566
      } else if (era0(`cflag:${target}:360`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「哈啊哈啊…我、我知道了…一直奉仕到射精位置就可以了吧？」`,
        ); // :5569
        await era.printAndWait(
          `「嗯…啊呜…啾…哈啊哈啊…在我的胸部里…这么热的…嗯啾…啾啾………」`,
        ); // :5570
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :5571
        era.set(`cflag:${target}:360`, 2); // :5571
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 125) {
    if (era0(`cflag:${target}:361`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呵呵呵、能一边舔魔王大人的肉棒一边自慰什么的…真是幸福啊～${heart(1)}」`,
        ); // :5584
        await era.printAndWait(
          `「啊呜…嗯啾啾…啾…啊啊…太兴奋了…哈啊哈啊…嗯啾…啾——${heart(1)}」`,
        ); // :5585
        await era.printAndWait(
          `随着${target_name}的自慰变得激烈，缠绕着${player_name}的阴茎的舌头的动作也激烈了起来………`,
        ); // :5586
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…能一边奉仕魔王大人一边让自己变得舒服什么的…很抱歉收下了这么棒的奖励…嗯啾${heart(1)}」`,
        ); // :5589
        await era.printAndWait(
          `「哈咕…嗯…嗯呼${heart(1)} 啾…啾…啊啊…真的好美味啊我…嗯啾啾咕${heart(1)}」`,
        ); // :5590
        await era.printAndWait(
          `${target_name}一边自慰，一边因为奉仕${player_name}而兴奋的不得了………`,
        ); // :5591
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「我、我明白了…我…${target_name}要一边自慰一边…舔、舔魔王大人的肉棒…呼啊…」`,
        ); // :5594
        await era.printAndWait(`「嗯咕…啾…啾…嗯嗯啾啾………」`); // :5595
        await era.printAndWait(
          `${target_name}虽然害羞得脸上发红，但还是继续一边口交一边自慰着………`,
        ); // :5596
      } else {
        await era.printAndWait(
          `「呼嗯…一边口交一边舔什么的…咕、为什么这样…唔…啊啊…嗯…嗯…啾…呼呼…嗯！」`,
        ); // :5599
        await era.printAndWait(
          `${target_name}就那样听从${player_name}的命令开始一边口交一边自慰………`,
        ); // :5600
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :5602
      era.set(`cflag:${target}:361`, 1); // :5602
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:361`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯啊…用魔王大人的肉棒做配菜自慰什么的…嗯啾啾咕啾…${heart(1)}」`,
          ); // :5609
          await era.printAndWait(
            `「啾啾${heart(1)} 啊啊…变得更精神吧…嗯啾咕…啾啾啾${heart(1)}」`,
          ); // :5610
          await era.printAndWait(
            `随着${target_name}的自慰变得激烈，缠绕着${player_name}的阴茎的舌头的动作也激烈了起来………`,
          ); // :5611
        } else {
          await era.printAndWait(
            `「呵呵呵、能一边舔魔王大人的肉棒一边自慰什么的…真是幸福啊${heart(1)}」`,
          ); // :5613
          await era.printAndWait(
            `「啊呜…嗯啾啾…啾…啊啊…太兴奋了…哈啊哈啊…嗯啾…啾——${heart(1)}」`,
          ); // :5614
          await era.printAndWait(
            `${target_name}随着${target_name}的自慰变得激烈，缠绕着${player_name}的阴茎的舌头的动作也激烈了起来………`,
          ); // :5615
        }
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :5617
        era.set(`cflag:${target}:361`, 5); // :5617
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:361`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哈啊…能一边舔魔王大人的一边变舒服什么的…啊啊嗯啾啾嗯…啾啾——${heart(1)}」`,
          ); // :5621
          await era.printAndWait(
            `「我就算一直这么舔下去也没关系啊…啾…嗯咕嗯呼…啾${heart(1)}」`,
          ); // :5622
          await era.printAndWait(
            `${target_name}一边自慰，一边因为奉仕${player_name}而兴奋的不得了………`,
          ); // :5623
        } else {
          await era.printAndWait(
            `「啊啊…能一边奉仕魔王大人一边让自己变得舒服什么的…很抱歉收下了这么棒的奖励…嗯啾${heart(1)}」`,
          ); // :5625
          await era.printAndWait(
            `「哈咕…嗯…嗯呼${heart(1)} 啾…啾…啊啊…真的好美味啊我…嗯啾啾咕${heart(1)}」`,
          ); // :5626
          await era.printAndWait(
            `${target_name}一边自慰，一边因为奉仕${player_name}而兴奋的不得了………`,
          ); // :5627
        }
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :5629
        era.set(`cflag:${target}:361`, 4); // :5629
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:361`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯咕…啾…啾…是、是的…我会好好的自慰的…啊啊…啊呜呜呜咕…啾」`,
        ); // :5632
        await era.printAndWait(`「嗯咕…啾…啾…嗯嗯唔啾啾………」`); // :5633
        await era.printAndWait(
          `${target_name}虽然害羞得脸上发红，但还是继续一边口交一边自慰着………`,
        ); // :5634
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :5635
        era.set(`cflag:${target}:361`, 3); // :5635
      } else if (era0(`cflag:${target}:361`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「啊呜…嗯…嗯…哈啊哈啊…为什么这样我…嗯啾…就………」`,
        ); // :5638
        await era.printAndWait(
          `${target_name}就那样听从${player_name}的命令开始一边口交一边自慰………`,
        ); // :5639
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :5640
        era.set(`cflag:${target}:361`, 2); // :5640
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (era0(`cflag:${target}:362`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊呜…嗯咕…嗯呼${heart(1)} 肉棒…肉棒…啊呜…嗯啾${heart(1)}」`,
        ); // :5654
        await era.printAndWait(
          `在${player_name}的命令下，${target_name}等了一下，然后就把阴茎含了下去。`,
        ); // :5655
        await era.printAndWait(
          `「嗯咕…嗯呼…一边吮吸一边撸…魔王大人的肉棒会是什么感觉呢…啊啊啊…嗯啾咕啾啾啾——${heart(1)}」`,
        ); // :5656
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊啊…我可以用嘴奉仕这么精神的东西呢…谢谢您魔王大人${heart(1)}」`,
        ); // :5659
        await era.printAndWait(
          `「啊呜…嗯啾啾咕${heart(1)} 啾啾…啾啾…呼啊…好吃…真好吃啊${heart(1)}」`,
        ); // :5660
        await era.printAndWait(
          `${target_name}激烈的撸着${player_name}的阴茎的根部，吮吸着尖端………`,
        ); // :5661
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「你、你说只是我的手不够？……真、真没办法呢…嗯啊…啊呜…啾啾啾…啊唔…」`,
        ); // :5664
        await era.printAndWait(
          `${target_name}因为羞耻心而连耳朵都发红，就那样继续着手搓口交………`,
        ); // :5665
      } else {
        await era.printAndWait(
          `「一、一边撸一边舔…我、我明白了…这样就可以了吧？………嗯啊唔…啾…啾」`,
        ); // :5668
        await era.printAndWait(
          `${target_name}一边厌恶的皱着眉毛一边手搓口交………`,
        ); // :5669
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :5671
      era.set(`cflag:${target}:362`, 1); // :5671
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:362`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊呜…嗯咕…嗯呼${heart(1)} 肉棒…肉棒…啊呜…嗯啾${heart(1)}」`,
          ); // :5678
          await era.printAndWait(
            `在${player_name}的命令下，${target_name}等了一下，然后就把阴茎含了下去。`,
          ); // :5679
          await era.printAndWait(
            `「嗯咕…嗯呼…一边吮吸一边撸…魔王大人的肉棒会是什么感觉呢…啊啊啊…嗯啾咕啾啾啾——${heart(1)}」`,
          ); // :5680
        } else {
          await era.printAndWait(
            `「嗯嗯咕呼…呵呵呵、我最喜欢奉仕魔王大人的肉棒了呦…啾啾唔啾啾${heart(1)}」`,
          ); // :5682
          await era.printAndWait(
            `${target_name}的双眼完全发情着湿润着、像${player_name}谄媚着。`,
          ); // :5683
          await era.printAndWait(
            `「嗯啊啊嗯…啾啾…请从这根肉帮里…嗯啾啾${heart(1)} 射出奖励的精液吧…嗯啾${heart(1)}」`,
          ); // :5684
        }
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :5686
        era.set(`cflag:${target}:362`, 5); // :5686
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:362`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「啊啊啊…我可以用嘴奉仕这么精神的东西呢…谢谢您魔王大人${heart(1)}」`,
          ); // :5690
          await era.printAndWait(
            `「啊呜…嗯啾啾咕${heart(1)} 啾啾…啾啾…呼啊…好吃…真好吃啊${heart(1)}」`,
          ); // :5691
          await era.printAndWait(
            `${target_name}激烈的撸着${player_name}的阴茎的根部，吮吸着尖端………`,
          ); // :5692
        } else {
          await era.printAndWait(
            `「让我用嘴和手随意的奉仕什么的…啊啊啊啊${heart(1)} 嗯啾咕啾啾啾咕${heart(1)}」`,
          ); // :5694
          await era.printAndWait(
            `${target_name}完全热衷与奉仕、就像是以恋人甚至恋人之上的人为对手一样。好像催促着着惊一样熟练的使用着嘴。`,
          ); // :5695
          await era.printAndWait(
            `「嗯啾咕…啾啾…哈咕…啾啾啾${heart(1)} 啊啊…请给我的嘴奖励吧${heart(1)}」`,
          ); // :5696
        }
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :5698
        era.set(`cflag:${target}:362`, 4); // :5698
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:362`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯啊…一边用手撸着一边…比平时更精神的…嗯啾…啾…啾…哈啊哈啊…啊呜…嗯啾」`,
        ); // :5701
        await era.printAndWait(
          `${target_name}因为羞耻心而连耳朵都发红，就那样继续着手搓口交………`,
        ); // :5702
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :5703
        era.set(`cflag:${target}:362`, 3); // :5703
      } else if (era0(`cflag:${target}:362`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「哈啊哈啊…为什么会这么精神啊…嗯啾…啾…嗯唔…想射精的话就快点射出来吧…啾」`,
        ); // :5706
        await era.printAndWait(
          `${target_name}一边厌恶的皱着眉毛一边手搓口交………`,
        ); // :5707
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :5708
        era.set(`cflag:${target}:362`, 2); // :5708
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (era0(`cflag:${target}:363`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈咕嗯咕唔…肉棒真好吃啊…阿噗咕啾嗯啾啾噗啾噗${heart(1)}」`,
        ); // :5723
        await era.printAndWait(
          `过于兴奋的${target_name}更激烈的吮吸着${player_name}的阴茎，继续着口腔奉仕………`,
        ); // :5724
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…嗯啾啾嗯啾咕啾啾…啊啊啊魔王大人的太好吃了…弄得我都发出这么下流的声音了…」`,
        ); // :5727
        await era.printAndWait(
          `「但是含起来根本停不下来啊…请原谅我吧…嗯啾啾啾…啾咕啾唔啾啾${heart(1)}」`,
        ); // :5728
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈咕…啾咕啾啾…啾…哈啊哈啊…啊咕…为什么这么认真的含着…啊啊…嗯啾咕啾咕呼」`,
        ); // :5731
        await era.printAndWait(
          `${target_name}带着好像放弃了似的什么的表情含着${player_name}的阴茎………`,
        ); // :5732
      } else {
        await era.printAndWait(
          `「嗯唔…啾咕啾啪啾咕…嗯咕…为什么我会这么认真的含着呢…嗯啾！」`,
        ); // :5735
        await era.printAndWait(
          `${target_name}因为注意到自己比想象中的更热心舔着而连耳朵都变红了………`,
        ); // :5736
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :5738
      era.set(`cflag:${target}:363`, 1); // :5738
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:363`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈咕嗯咕唔…肉棒真好吃啊…阿噗咕啾嗯啾啾噗啾噗${heart(1)}」`,
        ); // :5744
        await era.printAndWait(
          `过于兴奋的${target_name}更激烈的吮吸着${player_name}的阴茎，继续着口腔奉仕。`,
        ); // :5745
        await era.printAndWait(
          `「嗯啾咕…嗯啾…嗯啾${heart(1)} 哈啊…请让我继续舔吧${heart(1)}」`,
        ); // :5746
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :5747
        era.set(`cflag:${target}:363`, 5); // :5747
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:363`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…嗯啾咕啾啾啾嗯…我舔的时候会发出这么下流的声音呢${heart(1)}」`,
        ); // :5750
        await era.printAndWait(
          `${target_name}暂时松开了嘴，舌头舔着嘴唇，湿润的嘴唇泛着妖艳的光。`,
        ); // :5751
        await era.printAndWait(
          `「但是我…口交停不下来…请原谅我吧…嗯啾啾啾…啾啾啾咕啾啾${heart(1)}」`,
        ); // :5752
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :5753
        era.set(`cflag:${target}:363`, 4); // :5753
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:363`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯啾咕…啾咕啾啾啾咕…呼啊…我这样奉仕什么的…咕啾咕啾咕啾」`,
        ); // :5756
        await era.printAndWait(
          `${target_name}带着好像放弃了似的什么的表情含着${player_name}的阴茎………`,
        ); // :5757
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :5758
        era.set(`cflag:${target}:363`, 3); // :5758
      } else if (era0(`cflag:${target}:363`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「嗯啾啾咕啾咕…嗯…还、还要继续舔啊…嗯啾啾啾咕…啾咕！」`,
        ); // :5761
        await era.printAndWait(
          `${target_name}虽然羞耻的连耳朵都变红了，但还是发出着下流的声音继续着口腔奉仕………`,
        ); // :5762
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :5763
        era.set(`cflag:${target}:363`, 2); // :5763
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (era0(`cflag:${target}:364`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯呼呼…我的口交和魔王大人的爱抚…来比比那边更好吧${heart(1)}」`,
        ); // :5777
        await era.printAndWait(
          `${target_name}跨在${player_name}的头上，摇着屁股，股间降了下来。`,
        ); // :5778
        await era.printAndWait(
          `「啊嗯…当然，我不会输的…嗯啾…啾啾咕…啾啾${heart(1)}」`,
        ); // :5779
        await era.printAndWait(
          `${target_name}看起来很高兴的舔着${player_name}的阴茎………`,
        ); // :5780
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…！是、是的…请一边玩弄我一边变得舒服吧…${heart(1)}」`,
        ); // :5783
        await era.printAndWait(
          `${target_name}看起来很害羞的跨坐在${player_name}的头上，股间降了下来。`,
        ); // :5784
        await era.printAndWait(
          `${player_name}为了让${target_name}高潮而舔着秘裂。`,
        ); // :5785
        await era.printAndWait(
          `「嗯啾…啾…啊啊…啊啊嗯…欺、欺负得太过分的话我这边就没法专心舔您了…嗯嗯啾…啾${heart(1)}」`,
        ); // :5786
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊哈啊…嗯！我会好好做的！所以…啊啊…不要这样恶作剧啊！…咦！」`,
        ); // :5789
        await era.printAndWait(
          `「嗯咕…嗯啾…啾…呼啊…嗯呼…啊啊…要变的奇怪了…啊嗯…咕！」`,
        ); // :5790
      } else {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「咕…不、不要太激烈啊…啊啊…嗯嗯咕…嗯…！」`); // :5794
          await era.printAndWait(
            `${target_name}的秘裂被玩弄而装退颤抖着，继续着口腔奉仕………`,
          ); // :5795
        } else {
          await era.printAndWait(
            `「嗯呼哈…呵呵呵、这种程度我是不会有感觉的呦…嗯…啾…啾…嗯啾♪」`,
          ); // :5797
          await era.printAndWait(
            `${target_name}一边被玩弄着秘裂一边漏出余裕的表情用舌头舔着${player_name}的阴茎………`,
          ); // :5798
        }
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :5801
      era.set(`cflag:${target}:364`, 1); // :5801
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:364`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯呵呵…来吧来吧…来比比是我先高潮还是魔王大人先射精吧${heart(1)}」`,
        ); // :5807
        await era.printAndWait(
          `${target_name}跨在${player_name}的头上，摇着屁股，股间降了下来。`,
        ); // :5808
        await era.printAndWait(
          `「来吧…在我脸上慢慢的吐出精液来吧…嗯啾…啾咕…啾…啾…嗯呼${heart(1)}`,
        ); // :5809
        await era.printAndWait(
          `${target_name}看起来很高兴的把${player_name}的肉棒含到喉咙深处奉仕着………`,
        ); // :5810
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :5811
        era.set(`cflag:${target}:364`, 5); // :5811
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:364`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊嗯…请随您喜好的玩弄我吧、在这期间…啊嗯${heart(1)}我来奉仕魔王大人${heart(1)}」`,
        ); // :5814
        await era.printAndWait(
          `${target_name}看起来很害羞的跨坐在${player_name}的头上，股间降了下来。`,
        ); // :5815
        await era.printAndWait(
          `${player_name}为了让${target_name}高潮而舔着秘裂。`,
        ); // :5816
        await era.printAndWait(
          `「嗯啾…就…啊啊…啊啊…好、好厉害啊…我也要加油了…嗯啾…啾…嗯啾…啊哈…啊${heart(1)}`,
        ); // :5817
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :5818
        era.set(`cflag:${target}:364`, 4); // :5818
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:364`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…嗯！我会好好做的！所以…啊啊…不要这样恶作剧啊！…咦！」`,
        ); // :5821
        await era.printAndWait(
          `「嗯咕…嗯啾…啾…呼哇…嗯呼…啊啊…啊嗯！咕！啊啊！…嗯咕啾啾啊…啾啾…」`,
        ); // :5822
        await era.printAndWait(
          `${target_name}一边被顽固的玩弄着秘裂一边拼命的口腔奉仕着${player_name}的阴茎………`,
        ); // :5823
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :5824
        era.set(`cflag:${target}:364`, 3); // :5824
      } else if (era0(`cflag:${target}:364`) <= 1 || era0('flag:7') == 2) {
        if (era0(`abl:${master}:12`) > 5) {
          await era.printAndWait(`「嗯咕！嗯呼…啾咕啾啾…哈啊哈啊…啊嗯…咦！」`); // :5828
          await era.printAndWait(
            `${target_name}因为无法忍耐${player_name}对秘裂的刺激而松开了嘴、然后又因为催促似的玩弄而继续着口腔奉仕………`,
          ); // :5829
        } else {
          await era.printAndWait(
            `「嗯呼哈…呵呵呵、这种程度我是不会有感觉的呦…嗯…啾…啾…嗯啾♪」`,
          ); // :5831
          await era.printAndWait(
            `${target_name}一边被玩弄着秘裂一边漏出余裕的表情用舌头舔着${player_name}的阴茎………`,
          ); // :5832
        }
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :5834
        era.set(`cflag:${target}:364`, 2); // :5834
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (era0(`cflag:${target}:365`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「啊啊…肉棒肉棒…我最喜欢的肉棒${heart(1)} …嗯啾咕啾啾…嗯咕啊呼…嗯嗯${heart(1)}」`,
        ); // :5848
        await era.printAndWait(
          `${target_name}好像因为口腔奉仕很兴奋似的${player_name}的阴茎吞到了喉咙深处………`,
        ); // :5849
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「啊啊…魔王大人…魔王大人…嗯啾咕啾啾嗯啾…嗯咕嗯咕嗯…嗯呼呼${heart(1)}」`,
        ); // :5852
        await era.printAndWait(
          `${target_name}好像因为口腔奉仕很兴奋似的${player_name}的阴茎吞到了喉咙深处………`,
        ); // :5853
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…说不定全都能插进来呢…嗯咕…嗯…嗯呼…嗯…嗯嗯～！」`,
        ); // :5856
        await era.printAndWait(
          `${target_name}好像因为口腔奉仕很兴奋似的${player_name}的阴茎吞到了喉咙深处………`,
        ); // :5857
      } else {
        await era.printAndWait(
          `「嗯咕呼…嗯咕…嗯啾…嗯呼…哈啊哈啊…没、没想到用喉咙深处…这、这么害羞………」`,
        ); // :5860
        await era.printAndWait(
          `${target_name}因为热心的口交连喉咙深处都用上了而害羞了起来………`,
        ); // :5861
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :5863
      era.set(`cflag:${target}:365`, 1); // :5863
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:363`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…肉棒肉棒…我最喜欢的肉棒${heart(1)} …嗯啾咕啾啾…嗯咕啊呼…嗯嗯${heart(1)}」`,
        ); // :5869
        await era.printAndWait(
          `${target_name}好像因为口腔奉仕很兴奋似的${player_name}的阴茎吞到了喉咙深处。`,
        ); // :5870
        await era.printAndWait(
          `「嗯咕…嗯呼…就这样在喉咙深处射出来的话我一定会幸福得高潮的啊${heart(1)} 嗯嗯啾啾啾咕！」`,
        ); // :5871
        await era.printAndWait(
          `${target_name}发出下流的声音用喉咙深处奉仕着${player_name}的阴茎………`,
        ); // :5872
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :5873
        era.set(`cflag:${target}:365`, 5); // :5873
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:363`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…魔王大人…魔王大人…嗯啾咕啾啾嗯啾…嗯咕嗯咕嗯…嗯呼呼${heart(1)}」`,
        ); // :5876
        await era.printAndWait(
          `${target_name}好像因为口腔奉仕很兴奋似的${player_name}的阴茎吞到了喉咙深处。`,
        ); // :5877
        await era.printAndWait(
          `「我的喉咙全部…啊啊…用来奉仕什么的最棒了啊…啊啊…嗯啾…嗯咕嗯呼…${heart(1)}」`,
        ); // :5878
        await era.printAndWait(
          `${target_name}的嘴张开到极限，好像很幸福似的眯着眼继续着口腔奉仕………`,
        ); // :5879
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :5880
        era.set(`cflag:${target}:365`, 4); // :5880
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:363`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「哈啊哈啊…啊啊…全部…全部收下了哦…嗯咕啊咕…嗯呜呜！`,
        ); // :5883
        await era.printAndWait(
          `${target_name}好像因为口腔奉仕很兴奋似的${player_name}的阴茎吞到了喉咙深处。`,
        ); // :5884
        await era.printAndWait(
          `「嗯咕…嗯呼…嗯呼…嗯啾…这么精神，把我的喉咙全部…嗯咕…嗯咕嗯啾」`,
        ); // :5885
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :5886
        era.set(`cflag:${target}:365`, 3); // :5886
      } else if (era0(`cflag:${target}:363`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「哈呼…嗯咕…嗯啾…嗯咕呜呜！啊啊…连喉咙深处都能感觉到什么的………」`,
        ); // :5889
        await era.printAndWait(
          `${target_name}因为热心的口交连喉咙深处都用上了而害羞了起来………`,
        ); // :5890
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :5891
        era.set(`cflag:${target}:365`, 2); // :5891
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (era0(`cflag:${target}:381`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「唉、要侵犯嘴所以老实一点？…哦呵呵、好的、请♪」`,
        ); // :5905
        await era.printAndWait(
          `${player_name}抓住大大的张开嘴${target_name}的头，一口气把阴茎插进了喉咙深处。`,
        ); // :5906
        await era.printAndWait(`「嗯咕呼！？嗯呼…嗯…嗯咕嗯咕呼…嗯嗯嗯咕唔！」`); // :5907
        await era.printAndWait(
          `听着${target_name}那痛苦的声音，${player_name}为了追求快乐而开始侵犯喉咙深处………`,
        ); // :5908
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「嗯咕！？嗯嗯嗯呼…嗯嗯嗯唔唔唔！！！」`); // :5911
        await era.printAndWait(
          `侵犯着${target_name}直到喉咙深处的${player_name}的大腿不停的撞过去，而${player_name}无视那样继续把阴茎插进喉咙深处抽送着。`,
        ); // :5912
        await era.printAndWait(
          `${target_name}翻着白眼，只是让牙齿不碰到阴茎就已经竭尽全力了………`,
        ); // :5913
      } else {
        await era.printAndWait(
          `「嗯咕唔！？嗯咕嗯唔…嗯咕…咕哈…咳咳…这样不行啊…不要爱…嗯咕唔！？」`,
        ); // :5916
        await era.printAndWait(
          `${player_name}压住抗议着的${target_name}的头、开始彻底的侵犯着她的喉咙深处………`,
        ); // :5917
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :5919
      era.set(`cflag:${target}:381`, 1); // :5919
      return 0;
    } else {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:381`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哦呵呵、又要侵犯嘴里…喉咙深处了呢………好的、请♪」`,
          ); // :5926
          await era.printAndWait(
            `${player_name}抓住大大的张开嘴${target_name}的头，一口气把阴茎插进了喉咙深处。`,
          ); // :5927
          await era.printAndWait(
            `「嗯咕呼！？嗯呼…嗯…嗯咕嗯咕呼…嗯嗯嗯咕唔！」`,
          ); // :5928
          await era.printAndWait(
            `听着${target_name}那痛苦的声音，${player_name}为了追求快乐而开始侵犯喉咙深处………`,
          ); // :5929
        } else {
          await era.printAndWait(
            `「嗯咕呼…嗯…嗯…嗯呼${heart(1)} 嗯呼嗯嗯嗯唔${heart(1)}」`,
          ); // :5931
          await era.printAndWait(
            `${target_name}的喉咙深处被侵犯这发出了灼热的吐息，漏出了甜美的声音。看来是相当喜欢阴茎吧。`,
          ); // :5932
          await era.printAndWait(
            `「嗯咕…继续侵犯我的喉咙…只用喉咙好像就快要去了…嗯咕${heart(1)}」`,
          ); // :5933
          await era.printAndWait(
            `不自觉的抚摸着说出这种可爱的话的${target_name}的头、${player_name}继续动着腰………`,
          ); // :5934
        }
        // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :5936
        era.set(`cflag:${target}:381`, 5); // :5936
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:381`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「好、好的…请彻底的侵犯我的喉咙深处吧…嗯啊啊…嗯咕…嗯…嗯…嗯呼${heart(1)}」`,
        ); // :5939
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `${player_name}把阴茎插进${target_name}的喉咙深处，把喉咙塞到快要窒息的程度、然后再慢慢的拔出来。`,
          ); // :5941
          await era.printAndWait(
            `「咳咳…咳咳…我、我的喉咙…继续侵犯吧…嗯唔！？嗯咕…嗯呼！」`,
          ); // :5942
          await era.printAndWait(
            `${player_name}享受着喉咙被侵犯而翻着白眼的${target_name}的表情继续动着腰………`,
          ); // :5943
        } else {
          await era.printAndWait(
            `${player_name}抓住${target_name}的头，像是再用耻骨殴打鼻子那样插入着喉咙深处。`,
          ); // :5945
          await era.printAndWait(`「嗯咕嗯呼！嗯咕…嗯呜呜…嗯呼${heart(1)}」`); // :5946
          await era.printAndWait(
            `看着因为这样粗暴的行为而发出甜美的声音的${target_name}，${player_name}苦笑着为了迎接绝顶而继续动着腰………`,
          ); // :5947
        }
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :5949
        era.set(`cflag:${target}:381`, 4); // :5949
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:381`) <= 2 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「嗯咕呼！嗯！嗯咕…呼呼…嗯咕！嗯咕啊咕～！」`,
          ); // :5953
          await era.printAndWait(
            `${player_name}时快时慢的侵犯着${target_name}的喉咙深处。`,
          ); // :5954
          await era.printAndWait(
            `${target_name}翻着白眼，只是让牙齿不碰到阴茎就已经竭尽全力了………`,
          ); // :5955
        } else {
          await era.printAndWait(`「嗯咕！？嗯嗯呼…嗯嗯嗯咕唔！！！」`); // :5957
          await era.printAndWait(
            `被侵犯者喉咙深处的${target_name}的大腿不停地抖动着，但${player_name}无视那个像要把喉咙深处擦掉一层一样抽送着阴茎。`,
          ); // :5958
          await era.printAndWait(
            `${target_name}翻着白眼，只是让牙齿不碰到阴茎就已经竭尽全力了………`,
          ); // :5959
        }
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :5961
        era.set(`cflag:${target}:381`, 3); // :5961
      } else if (era0(`cflag:${target}:381`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「嗯咕嗯啊…嗯咕…噗哈…咳咳…不、不要再这样了…嗯咕唔！？」`,
        ); // :5964
        await era.printAndWait(
          `${player_name}压住抗议的${target_name}的头、开始彻底侵犯她的喉咙深处。`,
        ); // :5965
        await era.printAndWait(
          `有时牙齿会碰到阴茎，原因大概是因为强行插进喉咙深处引起的呕吐吧。`,
        ); // :5966
        await era.printAndWait(
          `「呕…咳咳…咕呜呜咳…求、求你了…我可以普通的舔那之上就…嗯咕————！」`,
        ); // :5967
        await era.printAndWait(
          `${player_name}直到${target_name}变得更听话为止一直侵犯着她的喉咙深处………`,
        ); // :5968
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :5969
        era.set(`cflag:${target}:381`, 2); // :5969
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 87) {
    const p = piercing_state.p; // 跨 CALL TRAIN_MESSAGE_B 存活的全局单字母变量 p（com87() 写入，见 piercing-state.js）

    if (era0(`cflag:${target}:348`) == 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(''); // :5986-5987
      } else if (era0(`talent:${target}:76`) == 1) {
        if (era0(`cflag:${target}:7`) & p) {
          await era.printAndWait(
            `${target_name}因为皮肤第一次被打孔而痛的不禁皱着眉。`,
          ); // :5991

          if (p == 1) {
            await era.printAndWait(
              `「啊啊…敏感度上升了啊…来吧拉一下试试吧…${heart(1)}」`,
            ); // :5994
            await era.printAndWait(
              `${target_name}的完全勃起的两个乳头上的环闪闪发着光………`,
            ); // :5995
          } else if (p == 2) {
            await era.printAndWait(
              `「哦呵呵、在这里装上漂亮的宝石的话就能摄影了呢…♪」`,
            ); // :5998
            await era.printAndWait(
              `${target_name}的肚脐上附有宝石的环闪闪发着光………`,
            ); // :5999
          } else if (p == 4) {
            await era.printAndWait(
              `「看见这个的话马上就能明白我是有多么淫乱了呢」`,
            ); // :6002
            await era.printAndWait(
              `${target_name}一边左右拉开阴唇上的环一边笑着………`,
            ); // :6003
          } else if (p == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「哦呵呵…肉棒变得这么棒了呢…♪」`); // :6008
              await era.printAndWait(
                `${target_name}舔了舔嘴唇，撸着阴茎炫耀着上面的环………`,
              ); // :6009
            } else {
              await era.printAndWait(
                `「啊啊…这个阴蒂上的环是魔王大人的隶属之印呢…${heart(1)}」`,
              ); // :6011
              await era.printAndWait(`${target_name}的阴蒂勃起着笑着………`); // :6012
            }
          } else if (p == 16) {
            await era.printAndWait(`「这么样魔王大人…适合我吗？」`); // :6016
            await era.printAndWait(
              `${target_name}下流的射出舌头、炫耀着舌尖上的环………`,
            ); // :6017
          } else if (p == 32) {
            await era.printAndWait(
              `「呐，不来和我接吻，确认一下环的情况吗？」`,
            ); // :6020
            await era.printAndWait(
              `${target_name}舔了舔嘴唇，唇上的环闪闪发着光………`,
            ); // :6021
          } else if (p == 64) {
            await era.printAndWait(
              `「如果知道我在这种地方穿上环，狂王大人会是什么表情呢？」`,
            ); // :6024
            await era.printAndWait(`${target_name}的鼻子上的环闪闪发着光………`); // :6025
          }
        } else {
          await era.printAndWait(
            `${target_name}露出了好像被夺走了什么重要的东西一样的表情………`,
          ); // :6029
        }
      } else if (era0(`talent:${target}:85`) == 1) {
        if (era0(`cflag:${target}:7`) & p) {
          await era.printAndWait(
            `${target_name}因为皮肤第一次被打孔而痛的不禁皱着眉。`,
          ); // :6035

          if (p == 1) {
            await era.printAndWait(
              `「啊啊…用乳头收下环什么的…谢谢您魔王大人${heart(1)}」`,
            ); // :6038
            await era.printAndWait(
              `${target_name}的勃起的乳头上特大号的环闪闪发着光………`,
            ); // :6039
          } else if (p == 2) {
            await era.printAndWait(
              `「哦呵呵、这是时尚呢。这样王都好像也会流行起来呢♪」`,
            ); // :6042
            await era.printAndWait(`${target_name}抚摸着肚脐周围确认这情况………`); // :6043
          } else if (p == 4) {
            await era.printAndWait(
              `「啊啊…已经只能让魔王大人看了啊………${heart(1)}」`,
            ); // :6046
            await era.printAndWait(
              `虽然${target_name}害羞的挡住了股间，${player_name}还是让她把手让开，欣赏着阴唇上的闪闪发光的环………`,
            ); // :6047
          } else if (p == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(
                `「啊啊…啊——…我的…我快要变成肉棒笨蛋了啊♪」`,
              ); // :6052
              await era.printAndWait(
                `${target_name}兴奋的勃起着，摇动的肉棒上的环卡啦卡啦的响着………`,
              ); // :6053
            } else {
              await era.printAndWait(
                `「呵呵呵…这个环是我从属于魔王大人的证明啊…啊啊啊${heart(1)}」`,
              ); // :6055
              await era.printAndWait(
                `${target_name}虽然满脸通红，但还是为了让环能清楚地被看见而分开了双腿………`,
              ); // :6056
            }
          } else if (p == 16) {
            await era.printAndWait(
              `「呐、真的在舌头上穿上环接吻就会更舒服吗…？」`,
            ); // :6060
            await era.printAndWait(
              `${target_name}不安的看了看舌尖，祈求着接吻………`,
            ); // :6061
          } else if (p == 32) {
            await era.printAndWait(
              `「呵呵呵、合适吗？…嗯？很合适？你说很可爱？啊啊、好开心啊…」`,
            ); // :6064
            await era.printAndWait(`${target_name}因为唇环被夸奖而陶醉着………`); // :6065
          } else if (p == 64) {
            await era.printAndWait(
              `「呐、真的合适吗？如果很可笑的话就太过分了…」`,
            ); // :6068
            await era.printAndWait(`${target_name}不安的问着关于鼻环的感想………`); // :6069
          }
        } else {
          await era.printAndWait(
            `${target_name}露出了好像被夺走了什么重要的东西一样的表情………`,
          ); // :6073
        }
      } else {
        if (era0(`cflag:${target}:7`) & p) {
          await era.printAndWait(
            `${target_name}因为皮肤第一次被打孔而痛的不禁皱着眉。`,
          ); // :6079

          if (p == 1) {
            await era.printAndWait(
              `「啊啊！在我美丽的肌肤上装这么下流的东西！…绝、绝饶不了你………！」`,
            ); // :6082
            await era.printAndWait(
              `${target_name}的敏感的乳头因为被环穿过而完全勃起着………`,
            ); // :6083
          } else if (p == 2) {
            await era.printAndWait(`「这个环是你选的？真是没品位啊………」`); // :6086
            await era.printAndWait(`${target_name}对环的设计好像不满意………`); // :6087
          } else if (p == 4) {
            await era.printAndWait(
              `「快、快点去下来！带着这种东西的话…我没法回到狂王大人哪里去啊…！」`,
            ); // :6090
            await era.printAndWait(
              `${target_name}两边的阴唇都挂上了设计很下流的环。`,
            ); // :6091
            await era.printAndWait(
              `理所当然的进行了${target_name}的手无法取下来的加工………`,
            ); // :6092
          } else if (p == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「不要…不…不…不要这样啊…！」`); // :6097
              await era.printAndWait(
                `被在强行长出来的阴茎上穿上环的${target_name}好像快要疯了…`,
              ); // :6098
            } else {
              await era.printAndWait(
                `「呜咕…呜…咦…这种东西…这种东西一点都都不可能会舒服吧…唔唔」`,
              ); // :6100
              await era.printAndWait(
                `安装在${target_name}的阴蒂上的环给予着${target_name}强烈的刺激。`,
              ); // :6101
              await era.printAndWait(
                `因为屈辱和疼痛而流出着大颗的眼泪的${target_name}瞪着${player_name}………`,
              ); // :6102
            }
          } else if (p == 16) {
            await era.printAndWait(`「不、不要…别碰我！呜咕…呜呜………！」`); // :6106
            await era.printAndWait(
              `${player_name}为了检查环的位置的愈合情况而拉出了${target_name}的舌头。`,
            ); // :6107
            await era.printAndWait(`「呜咕…咕…」`); // :6108
            await era.printAndWait(
              `看到因疼痛而哭泣着的${target_name}的舌头上的环好好的愈合着、${player_name}放开了${target_name}………`,
            ); // :6109
          } else if (p == 32) {
            await era.printAndWait(
              `「嗯、被装上这种东西的话吃什么东西都会变得很辛苦…能不能快点取下来？」`,
            ); // :6112
            await era.printAndWait(
              `听到${player_name}的、“这样的话就给你混入精液的流食吧？”的提案的${target_name}生气的连耳朵都红了………`,
            ); // :6113
          } else if (p == 64) {
            await era.printAndWait(
              `「我见过异国之人戴过类似的装饰…如果不是被你装上就好了！」`,
            ); // :6116
            await era.printAndWait(
              `${target_name}看来因为鼻环而稍微有点不高兴………`,
            ); // :6117
          }
        } else {
          await era.printAndWait(
            `${target_name}露出了“可恶的东西终于取下来了”的安心的表情………`,
          ); // :6121
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :6124
      era.set(`cflag:${target}:348`, 1); // :6124
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print(''); // :6130
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:348`) <= 3 || era0('flag:7') == 2)
      ) {
        if (era0(`cflag:${target}:7`) & p) {
          await era.printAndWait(
            `${target_name}因为肌肤被开洞的疼痛而不禁皱起了眉。`,
          ); // :6135

          if (p == 1) {
            await era.printAndWait(
              `「啊啊…敏感度上升了啊…来吧拉一下试试吧…${heart(1)}」`,
            ); // :6138
            await era.printAndWait(
              `${target_name}的完全勃起的两个乳头上的环闪闪发着光………`,
            ); // :6139
          } else if (p == 2) {
            await era.printAndWait(
              `「哦呵呵、在这里装上漂亮的宝石的话就能摄影了呢…♪」`,
            ); // :6142
            await era.printAndWait(
              `${target_name}的肚脐上附有宝石的环闪闪发着光………`,
            ); // :6143
          } else if (p == 4) {
            await era.printAndWait(
              `「看见这个的话马上就能明白我是有多么淫乱了呢」`,
            ); // :6146
            await era.printAndWait(
              `${target_name}一边左右拉开阴唇上的环一边笑着………`,
            ); // :6147
          } else if (p == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「哦呵呵…肉棒变得这么棒了呢…♪」`); // :6152
              await era.printAndWait(
                `${target_name}舔了舔嘴唇，撸着阴茎炫耀着上面的环………`,
              ); // :6153
            } else {
              await era.printAndWait(
                `「啊啊…这个阴蒂上的环是魔王大人的隶属之印呢…${heart(1)}」`,
              ); // :6155
              await era.printAndWait(`${target_name}的阴蒂勃起着笑着………`); // :6156
            }
          } else if (p == 16) {
            await era.printAndWait(`「这么样魔王大人…适合我吗？」`); // :6160
            await era.printAndWait(
              `${target_name}下流的射出舌头、炫耀着舌尖上的环………`,
            ); // :6161
          } else if (p == 32) {
            await era.printAndWait(
              `「呐，不来和我接吻，确认一下环的情况吗？」`,
            ); // :6164
            await era.printAndWait(
              `${target_name}舔了舔嘴唇，唇上的环闪闪发着光………`,
            ); // :6165
          } else if (p == 64) {
            await era.printAndWait(
              `「如果知道我在这种地方穿上环，狂王大人会是什么表情呢？」`,
            ); // :6168
            await era.printAndWait(`${target_name}的鼻子上的环闪闪发着光………`); // :6169
          }
        } else {
          await era.printAndWait(
            `${target_name}露出了好像被夺走了什么重要的东西一样的表情………`,
          ); // :6173
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :6175
        era.set(`cflag:${target}:348`, 4); // :6175
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:348`) <= 2 || era0('flag:7') == 2)
      ) {
        if (era0(`cflag:${target}:7`) & p) {
          await era.printAndWait(
            `${target_name}咬着嘴唇忍耐着肌肤被开洞的疼痛。`,
          ); // :6180

          if (p == 1) {
            await era.printAndWait(
              `「啊啊…用乳头收下环什么的…谢谢您魔王大人${heart(1)}」`,
            ); // :6183
            await era.printAndWait(
              `${target_name}的勃起的乳头上特大号的环闪闪发着光………`,
            ); // :6184
          } else if (p == 2) {
            await era.printAndWait(
              `「哦呵呵、这是时尚呢。这样王都好像也会流行起来呢♪」`,
            ); // :6187
            await era.printAndWait(`${target_name}抚摸着肚脐周围确认这情况………`); // :6188
          } else if (p == 4) {
            await era.printAndWait(
              `「啊啊…已经只能让魔王大人看了啊………${heart(1)}」`,
            ); // :6191
            await era.printAndWait(
              `虽然${target_name}害羞的挡住了股间，${player_name}还是让她把手让开，欣赏着阴唇上的闪闪发光的环………`,
            ); // :6192
          } else if (p == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(
                `「啊啊…啊——…我的…我快要变成肉棒笨蛋了啊♪」`,
              ); // :6197
              await era.printAndWait(
                `${target_name}兴奋的勃起着，摇动的肉棒上的环卡啦卡啦的响着………`,
              ); // :6198
            } else {
              await era.printAndWait(
                `「呵呵呵…这个环是我从属于魔王大人的证明啊…啊啊啊${heart(1)}」`,
              ); // :6200
              await era.printAndWait(
                `${target_name}虽然满脸通红，但还是为了让环能清楚地被看见而分开了双腿………`,
              ); // :6201
            }
          } else if (p == 16) {
            await era.printAndWait(
              `「呐、真的在舌头上穿上环接吻就会更舒服吗…？」`,
            ); // :6205
            await era.printAndWait(
              `${target_name}不安的看了看舌尖，祈求着接吻………`,
            ); // :6206
          } else if (p == 32) {
            await era.printAndWait(
              `「呵呵呵、合适吗？…嗯？很合适？你说很可爱？啊啊、好开心啊…」`,
            ); // :6209
            await era.printAndWait(`${target_name}因为唇环被夸奖而陶醉着………`); // :6210
          } else if (p == 64) {
            await era.printAndWait(
              `「呐、真的合适吗？如果很可笑的话就太过分了…」`,
            ); // :6213
            await era.printAndWait(`${target_name}不安的问着关于鼻环的感想………`); // :6214
          }
        } else {
          await era.printAndWait(
            `${target_name}露出了好像被夺走了什么重要的东西一样的表情………`,
          ); // :6218
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :6220
        era.set(`cflag:${target}:348`, 3); // :6220
      } else if (era0(`cflag:${target}:348`) <= 1 || era0('flag:7') == 2) {
        if (era0(`cflag:${target}:7`) & p) {
          await era.printAndWait(
            `${target_name}因为肌肤被开洞的疼痛而不禁悲鸣了起来。`,
          ); // :6225

          if (p == 1) {
            await era.printAndWait(
              `「啊啊！在我美丽的肌肤上装这么下流的东西！…绝、绝饶不了你………！」`,
            ); // :6228
            await era.printAndWait(
              `${target_name}的敏感的乳头因为被环穿过而完全勃起着………`,
            ); // :6229
          } else if (p == 2) {
            await era.printAndWait(`「这个环是你选的？真是没品位啊………」`); // :6232
            await era.printAndWait(`${target_name}对环的设计好像不满意………`); // :6233
          } else if (p == 4) {
            await era.printAndWait(
              `「快、快点去下来！带着这种东西的话…我没法回到狂王大人哪里去啊…！」`,
            ); // :6236
            await era.printAndWait(
              `${target_name}两边的阴唇都挂上了设计很下流的环。`,
            ); // :6237
            await era.printAndWait(
              `理所当然的进行了${target_name}的手无法取下来的加工………`,
            ); // :6238
          } else if (p == 8) {
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              await era.printAndWait(`「不要…不…不…不要这样啊…！」`); // :6243
              await era.printAndWait(
                `被在强行长出来的阴茎上穿上环的${target_name}好像快要疯了…`,
              ); // :6244
            } else {
              await era.printAndWait(
                `「呜咕…呜…咦…这种东西…这种东西一点都都不可能会舒服吧…唔唔」`,
              ); // :6246
              await era.printAndWait(
                `安装在${target_name}的阴蒂上的环给予着${target_name}强烈的刺激。`,
              ); // :6247
              await era.printAndWait(
                `因为屈辱和疼痛而流出着大颗的眼泪的${target_name}瞪着${player_name}………`,
              ); // :6248
            }
          } else if (p == 16) {
            await era.printAndWait(`「不、不要…别碰我！呜咕…呜呜………！」`); // :6252
            await era.printAndWait(
              `${player_name}为了检查环的位置的愈合情况而拉出了${target_name}的舌头。`,
            ); // :6253
            await era.printAndWait(`「呜咕…咕…」`); // :6254
            await era.printAndWait(
              `看到因疼痛而哭泣着的${target_name}的舌头上的环好好的愈合着、${player_name}放开了${target_name}………`,
            ); // :6255
          } else if (p == 32) {
            await era.printAndWait(
              `「嗯、被装上这种东西的话吃什么东西都会变得很辛苦…能不能快点取下来？」`,
            ); // :6258
            await era.printAndWait(
              `听到${player_name}的、“这样的话就给你混入精液的流食吧？”的提案的${target_name}生气的连耳朵都红了………`,
            ); // :6259
          } else if (p == 64) {
            await era.printAndWait(
              `「我见过异国之人戴过类似的装饰…如果不是被你装上就好了！」`,
            ); // :6262
            await era.printAndWait(
              `${target_name}看来因为鼻环而稍微有点不高兴………`,
            ); // :6263
          }
        } else {
          await era.printAndWait(
            `${target_name}${target_name}露出了“可恶的东西终于取下来了”的安心的表情………`,
          ); // :6267
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :6269
        era.set(`cflag:${target}:348`, 2); // :6269
      }
    }
    return 0;
  }
}

/**
 * @DOG_KOJO_7（:6281-7085）：兽奸PLAY专用口上。
 *
 * 源文件本函数内全部 155 处 PRINTFORMW 均无文本（`PRINTFORMW ` 后接空白，
 * 逐行核对确认），即金红桃这一角色未撰写兽奸专属台词——CFLAG:301-357
 * 状态机照常推进，但每次调用只有空行 + 等待按键，无对话输出。1:1 保留
 * 这一原作留白，不额外补文本。SELECTCOM 覆盖：0/1/5/6/9/21/27/30/31/34/37/43/56。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0
 */
async function dog_kojo_7(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (era_flag.selectcom == 0) {
    if (era0(`cflag:${target}:301`) == 0) {
      if (era0(`mark:${target}:2`) >= 2) {
        await era.printAndWait(''); // :6291-6292
      } else {
        await era.printAndWait(''); // :6294-6296
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :6296
      era.set(`cflag:${target}:301`, 1); // :6296
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:301`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6302-6303
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :6303
        era.set(`cflag:${target}:301`, 7); // :6303
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:301`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6306-6307
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :6307
        era.set(`cflag:${target}:301`, 6); // :6307
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:301`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6310-6311
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :6311
        era.set(`cflag:${target}:301`, 5); // :6311
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:301`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6314-6315
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :6315
        era.set(`cflag:${target}:301`, 4); // :6315
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (era0(`cflag:${target}:301`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6318-6319
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :6319
        era.set(`cflag:${target}:301`, 3); // :6319
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (era0(`cflag:${target}:301`) <= 1 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6322-6323
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :6323
        era.set(`cflag:${target}:301`, 2); // :6323
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (era0(`cflag:${target}:302`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(''); // :6337-6338
      } else {
        await era.printAndWait(''); // :6340-6342
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :6342
      era.set(`cflag:${target}:302`, 1); // :6342
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:302`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6348-6349
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :6349
        era.set(`cflag:${target}:302`, 6); // :6349
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:302`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6352-6353
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :6353
        era.set(`cflag:${target}:302`, 5); // :6353
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:302`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6356-6357
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :6357
        era.set(`cflag:${target}:302`, 4); // :6357
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:302`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6360-6361
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :6361
        era.set(`cflag:${target}:302`, 3); // :6361
      } else if (era0(`cflag:${target}:302`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6364-6365
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :6365
        era.set(`cflag:${target}:302`, 2); // :6365
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (era0(`cflag:${target}:306`) == 0) {
      if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6380-6381
      } else {
        await era.printAndWait(''); // :6383-6385
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :6385
      era.set(`cflag:${target}:306`, 1); // :6385
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:306`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6391-6392
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :6392
        era.set(`cflag:${target}:306`, 6); // :6392
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:306`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6395-6396
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :6396
        era.set(`cflag:${target}:306`, 5); // :6396
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:306`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6399-6400
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :6400
        era.set(`cflag:${target}:306`, 4); // :6400
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (era0(`cflag:${target}:306`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6403-6404
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :6404
        era.set(`cflag:${target}:306`, 3); // :6404
      } else if (era0(`cflag:${target}:306`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6407-6408
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :6408
        era.set(`cflag:${target}:306`, 2); // :6408
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (era0(`cflag:${target}:307`) == 0 && era0('tflag:13')) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :6422-6423
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6425-6426
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6428-6429
      } else {
        await era.printAndWait(''); // :6431-6433
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :6433
      era.set(`cflag:${target}:307`, 1); // :6433
      return 0;
    } else if (era0(`cflag:${target}:307`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :6439-6440
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6442-6443
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6445-6446
      } else {
        await era.printAndWait(''); // :6448-6450
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :6450
      era.set(`cflag:${target}:307`, 1); // :6450
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:307`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6456-6457
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :6457
        era.set(`cflag:${target}:307`, 6); // :6457
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:307`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6460-6461
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :6461
        era.set(`cflag:${target}:307`, 5); // :6461
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:307`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6464-6465
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :6465
        era.set(`cflag:${target}:307`, 4); // :6465
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (era0(`cflag:${target}:307`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6468-6469
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :6469
        era.set(`cflag:${target}:307`, 3); // :6469
      } else if (era0(`cflag:${target}:307`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6472-6473
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :6473
        era.set(`cflag:${target}:307`, 2); // :6473
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (era0(`cflag:${target}:310`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :6487-6488
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6490-6491
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6493-6494
      } else {
        await era.printAndWait(''); // :6496-6498
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :6498
      era.set(`cflag:${target}:310`, 1); // :6498
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:310`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6504-6505
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :6505
        era.set(`cflag:${target}:310`, 6); // :6505
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:310`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6508-6509
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :6509
        era.set(`cflag:${target}:310`, 5); // :6509
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:310`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6512-6513
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :6513
        era.set(`cflag:${target}:310`, 4); // :6513
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:310`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6516-6517
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :6517
        era.set(`cflag:${target}:310`, 3); // :6517
      } else if (era0(`cflag:${target}:310`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6520-6521
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :6521
        era.set(`cflag:${target}:310`, 2); // :6521
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (era0(`cflag:${target}:322`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :6537-6538
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :6540-6541
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :6543-6545
        } else {
          await era.printAndWait(''); // :6547-6549
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :6553-6554
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :6556-6557
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :6559-6560
        } else {
          await era.printAndWait(''); // :6562-6565
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :6565
      era.set(`cflag:${target}:322`, 1); // :6565
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:322`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6570-6572
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6574-6578
        } else {
          await era.printAndWait(''); // :6576-6578
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :6578
        era.set(`cflag:${target}:322`, 7); // :6578
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:322`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6580-6582
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6584-6588
        } else {
          await era.printAndWait(''); // :6586-6588
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :6588
        era.set(`cflag:${target}:322`, 6); // :6588
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:322`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6590-6592
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6594-6598
        } else {
          await era.printAndWait(''); // :6596-6598
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :6598
        era.set(`cflag:${target}:322`, 5); // :6598
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:322`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6601-6602
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :6602
        era.set(`cflag:${target}:322`, 4); // :6602
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:322`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6605-6606
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :6606
        era.set(`cflag:${target}:322`, 3); // :6606
      } else if (era0(`cflag:${target}:322`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6609-6611

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :6611
        era.set(`cflag:${target}:322`, 2); // :6611
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (era0(`cflag:${target}:328`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :6625-6626
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6628-6629
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6631-6632
      } else {
        await era.printAndWait(''); // :6634-6636
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :6636
      era.set(`cflag:${target}:328`, 1); // :6636
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6643-6647
        } else {
          await era.printAndWait(''); // :6645-6647
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :6647
        era.set(`cflag:${target}:328`, 7); // :6647
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6651-6655
        } else {
          await era.printAndWait(''); // :6653-6655
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :6655
        era.set(`cflag:${target}:328`, 6); // :6655
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6659-6663
        } else {
          await era.printAndWait(''); // :6661-6663
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :6663
        era.set(`cflag:${target}:328`, 5); // :6663
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:328`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6666-6667
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :6667
        era.set(`cflag:${target}:328`, 4); // :6667
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (era0(`cflag:${target}:328`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6670-6671
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :6671
        era.set(`cflag:${target}:328`, 3); // :6671
      } else if (era0(`cflag:${target}:328`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6674-6675
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :6675
        era.set(`cflag:${target}:328`, 2); // :6675
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (era0(`cflag:${target}:331`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6689-6690
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6692-6693
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :6695-6696
      } else {
        await era.printAndWait(''); // :6698-6700
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :6700
      era.set(`cflag:${target}:331`, 1); // :6700
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6707-6711
        } else {
          await era.printAndWait(''); // :6709-6711
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :6711
        era.set(`cflag:${target}:331`, 7); // :6711
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6715-6719
        } else {
          await era.printAndWait(''); // :6717-6719
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :6719
        era.set(`cflag:${target}:331`, 6); // :6719
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:331`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6723-6727
        } else {
          await era.printAndWait(''); // :6725-6727
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :6727
        era.set(`cflag:${target}:331`, 5); // :6727
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6730-6731
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :6731
        era.set(`cflag:${target}:331`, 4); // :6731
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:331`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6734-6735
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :6735
        era.set(`cflag:${target}:331`, 3); // :6735
      } else if (era0(`cflag:${target}:331`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6738-6739
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :6739
        era.set(`cflag:${target}:331`, 2); // :6739
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (era0(`cflag:${target}:332`) == 0) {
      if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6753-6754
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6756-6757
      } else if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :6759-6760
      } else {
        await era.printAndWait(''); // :6762-6764
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :6764
      era.set(`cflag:${target}:332`, 1); // :6764
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6770-6771
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :6771
        era.set(`cflag:${target}:332`, 7); // :6771
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6774-6775
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :6775
        era.set(`cflag:${target}:332`, 6); // :6775
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:332`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6778-6779
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :6779
        era.set(`cflag:${target}:332`, 5); // :6779
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:332`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.print(''); // :6782
        await era.printAndWait(''); // :6783-6784
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :6784
        era.set(`cflag:${target}:332`, 4); // :6784
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:332`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.print(''); // :6787
        await era.printAndWait(''); // :6788-6789
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :6789
        era.set(`cflag:${target}:332`, 3); // :6789
      } else if (era0(`cflag:${target}:332`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6792-6793
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :6793
        era.set(`cflag:${target}:332`, 2); // :6793
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (era0(`cflag:${target}:335`) == 0) {
      if (era0(`talent:${target}:0`) == 1) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :6809-6810
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :6812-6813
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :6815-6816
        } else {
          await era.printAndWait(''); // :6818-6820
        }
      } else {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :6824-6825
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :6827-6828
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :6830-6831
        } else {
          await era.printAndWait(''); // :6833-6836
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :6836
      era.set(`cflag:${target}:335`, 1); // :6836
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:335`) <= 6 || era0('flag:7') == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6841-6843
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6845-6849
        } else {
          await era.printAndWait(''); // :6847-6849
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :6849
        era.set(`cflag:${target}:335`, 7); // :6849
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:335`) <= 5 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(''); // :6851-6853
        } else if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6851-6855
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6857-6861
        } else {
          await era.printAndWait(''); // :6859-6861
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :6861
        era.set(`cflag:${target}:335`, 6); // :6861
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:335`) <= 4 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.print(''); // :6865
        } else if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6867-6873
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6869-6873
        } else {
          await era.printAndWait(''); // :6871-6873
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :6873
        era.set(`cflag:${target}:335`, 5); // :6873
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (era0(`cflag:${target}:335`) <= 3 || era0('flag:7') == 2)
      ) {
        if (rand_n(4) == 0) {
          await era.printAndWait(''); // :6875-6877
        } else if (rand_n(3) == 0) {
          await era.printAndWait(''); // :6875-6879
        } else if (rand_n(2) == 0) {
          await era.printAndWait(''); // :6881-6885
        } else {
          await era.printAndWait(''); // :6883-6885
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :6885
        era.set(`cflag:${target}:335`, 4); // :6885
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (era0(`cflag:${target}:335`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.print(''); // :6888
        await era.printAndWait(''); // :6889-6890
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :6890
        era.set(`cflag:${target}:335`, 3); // :6890
      } else if (era0(`cflag:${target}:335`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6893-6894
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :6894
        era.set(`cflag:${target}:335`, 2); // :6894
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (era0(`cflag:${target}:338`) == 0) {
      if (era0(`abl:${target}:16`) >= 3) {
        await era.printAndWait(''); // :6908-6909
      } else {
        await era.printAndWait(''); // :6911-6913
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :6913
      era.set(`cflag:${target}:338`, 1); // :6913
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6919-6920
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :6920
        era.set(`cflag:${target}:338`, 6); // :6920
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6923-6924
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :6924
        era.set(`cflag:${target}:338`, 5); // :6924
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (era0(`cflag:${target}:338`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.print(''); // :6927
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :6928
        era.set(`cflag:${target}:338`, 4); // :6928
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (era0(`cflag:${target}:338`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6931-6932
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :6932
        era.set(`cflag:${target}:338`, 3); // :6932
      } else if (era0(`cflag:${target}:338`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :6935-6936
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :6936
        era.set(`cflag:${target}:338`, 2); // :6936
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    if (era0(`cflag:${target}:344`) == 0) {
      if (era0(`talent:${target}:136`) == 1) {
        await era.printAndWait(''); // :6951-6952
      } else if (era0(`talent:${target}:76`) == 1) {
        await era.printAndWait(''); // :6954-6955
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.printAndWait(''); // :6957-6958
      } else {
        await era.printAndWait(''); // :6960-6962
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :6962
      era.set(`cflag:${target}:344`, 1); // :6962
      return 0;
    } else {
      if (
        era0(`talent:${target}:136`) == 1 &&
        (era0(`cflag:${target}:344`) <= 9 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6968-6969
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :6969
        era.set(`cflag:${target}:344`, 10); // :6969
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 8 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6972-6973
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :6973
        era.set(`cflag:${target}:344`, 9); // :6973
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 7 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6976-6977
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :6977
        era.set(`cflag:${target}:344`, 8); // :6977
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (era0(`cflag:${target}:344`) <= 6 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6980-6981
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :6981
        era.set(`cflag:${target}:344`, 7); // :6981
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (era0(`cflag:${target}:344`) <= 5 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6984-6985
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :6985
        era.set(`cflag:${target}:344`, 6); // :6985
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6988-6989
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :6989
        era.set(`cflag:${target}:344`, 5); // :6989
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (era0(`cflag:${target}:344`) <= 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6992-6993
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :6993
        era.set(`cflag:${target}:344`, 4); // :6993
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (era0(`cflag:${target}:344`) <= 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(''); // :6996-6997
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :6997
        era.set(`cflag:${target}:344`, 3); // :6997
      } else if (era0(`cflag:${target}:344`) <= 1 || era0('flag:7') == 2) {
        await era.printAndWait(''); // :7000-7001
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :7001
        era.set(`cflag:${target}:344`, 2); // :7001
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    if (
      era0(`talent:${target}:136`) == 1 &&
      (era0(`cflag:${target}:338`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(''); // :7009-7010
      // CFLAG:444  = 4（变量语义：CFLAG 族，444） // :7010
      era.set(`cflag:${target}:444`, 4); // :7010
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:338`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(''); // :7013-7014
      // CFLAG:444  = 3（变量语义：CFLAG 族，444） // :7014
      era.set(`cflag:${target}:444`, 3); // :7014
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (era0(`cflag:${target}:338`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(''); // :7017-7018
      // CFLAG:444  = 2（变量语义：CFLAG 族，444） // :7018
      era.set(`cflag:${target}:444`, 2); // :7018
    } else if (era0(`cflag:${target}:444`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(''); // :7021-7022
      // CFLAG:444  = 1（变量语义：CFLAG 族，444） // :7022
      era.set(`cflag:${target}:444`, 1); // :7022
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`cflag:${target}:357`) == 0) {
      if (era0(`tequip:${target}:53`)) {
        if (era0(`talent:${target}:136`) == 1) {
          await era.printAndWait(''); // :7038-7039
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(''); // :7041-7042
        } else if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(''); // :7044-7045
        } else {
          await era.printAndWait(''); // :7047-7050
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :7050
      era.set(`cflag:${target}:357`, 1); // :7050
      return 0;
    } else {
      if (era0(`tequip:${target}:53`)) {
        if (
          era0(`talent:${target}:136`) == 1 &&
          (era0(`cflag:${target}:357`) <= 4 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(''); // :7058-7059
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :7059
          era.set(`cflag:${target}:357`, 5); // :7059
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (era0(`cflag:${target}:357`) <= 3 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(''); // :7062-7063
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :7063
          era.set(`cflag:${target}:357`, 4); // :7063
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (era0(`cflag:${target}:357`) <= 2 || era0('flag:7') == 2)
        ) {
          await era.printAndWait(''); // :7066-7067
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :7067
          era.set(`cflag:${target}:357`, 3); // :7067
        } else if (era0(`cflag:${target}:357`) <= 1 || era0('flag:7') == 2) {
          await era.printAndWait(''); // :7070-7071
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :7071
          era.set(`cflag:${target}:357`, 2); // :7071
        }
      }
      return 0;
    }
  }

  return 0;
}

/**
 * @KOJO_MESSAGE_PALAMCNG_7（:7086-7462）：参数变动触发口上。
 *
 * 六道头部守卫（:7088-7104）：ASSI&&ASSIPLAY / TEQUIP:45 / TFLAG:899 /
 * TALENT:9==1 / TEQUIP:89 / TEQUIP:90 / TEQUIP:55，与 KOJO_MESSAGE_COM_7
 * 头部同源但顺序与项数不同（源实测）。此后按 CFLAG:221-229 各初次达标
 * 逐段触发（润滑/欲情/耻情/恐怖/C绝顶/V绝顶/A绝顶/B绝顶/处女丧失），
 * P/A 为源局部变量（PALAM+UP 当量、UP:11+UP:12 当量），不是 ELSEIF 互斥
 * 链，逐段独立重新赋值。
 *
 * @returns {Promise<number>} 0
 */
async function kojo_message_palamcng_7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master = MASTER; // ABL:MASTER:12 等省略前缀写法的展开

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (era0('tflag:899')) {
    return 0;
  }

  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    return 0;
  }

  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    return 0;
  }

  let P = (era0(`palam:${target}:3`) || 0) + (era0(`delta:${target}:3`) || 0); // :7115 P = PALAM:3 + UP:3
  if (P > era0('palamlv:2') && era0(`cflag:${target}:221`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「啊啊…润滑液粘糊糊的啊…」`); // :7121
        await era.printAndWait(`―――初次润滑超过LV2。`); // :7122
      } else {
        await era.printAndWait(`「啊啊…我因为魔王大人都变得这么湿了♪」`); // :7125
        await era.printAndWait(`―――初初次润滑超过LV2。`); // :7126
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(
          `「呀哦！？唔、因为润滑液而发出这种程度的声音什么的…真不爽…」`,
        ); // :7132
        await era.printAndWait(`―――初次润滑超过LV2。`); // :7133
      } else {
        await era.printAndWait(`「啊…啊啊…不、不要再摸了…不要了…啊啊嗯！」`); // :7136
        await era.printAndWait(`―――初次润滑超过LV2。`); // :7137
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :7140
    era.set(`cflag:${target}:221`, 1); // :7140
  }

  P = (era0(`palam:${target}:5`) || 0) + (era0(`delta:${target}:5`) || 0); // :7146 P = PALAM:5 + UP:5
  if (P > era0('palamlv:2') && era0(`cflag:${target}:222`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `${target_name}大概是因为媚药生效了，脸颊变得越来越红。`,
        ); // :7152
        await era.printAndWait(
          `「即使不用这种东西我也是魔王大人的东西啊…连我的感觉都…啊啊…${heart(1)}」`,
        ); // :7153
        await era.printAndWait(`―――初次欲情超过LV2。`); // :7154
      } else {
        await era.printAndWait(`「我、我…想要…魔、魔王大人…啊啊啊………」`); // :7157
        await era.printAndWait(`―――初次欲情超过LV2。`); // :7158
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `${target_name}大概是因为媚药生效了，脸颊变得越来越红。`,
        ); // :7164
        await era.printAndWait(
          `「卑、卑鄙的家伙…不用药就不能支配女人什么的…这算什么魔王大人啊………！」`,
        ); // :7165
        await era.printAndWait(`―――初次欲情超过LV2。`); // :7166
      } else {
        await era.printAndWait(`「啊啊…不、不要碰我…再继续的话我…嗯！」`); // :7169
        await era.printAndWait(`―――初次欲情超过LV2。`); // :7170
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :7173
    era.set(`cflag:${target}:222`, 1); // :7173
  }

  P = (era0(`palam:${target}:8`) || 0) + (era0(`delta:${target}:8`) || 0); // :7179 P = PALAM:8 + UP:8
  if (P > era0('palamlv:2') && era0(`cflag:${target}:223`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊我明明是这样的爱着魔王大人…让我这么害羞什么的………」`,
      ); // :7183
      await era.printAndWait(`―――初次耻情超过LV2。`); // :7184
    } else {
      await era.printAndWait(`「不要啊…更害羞的事的话…啊啊啊！」`); // :7187
      await era.printAndWait(`―――初次耻情超过LV2。`); // :7188
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :7190
    era.set(`cflag:${target}:223`, 1); // :7190
  }

  P = (era0(`palam:${target}:10`) || 0) + (era0(`delta:${target}:10`) || 0); // :7196 P = PALAM:10 + UP:10
  if (P > era0('palamlv:2') && era0(`cflag:${target}:224`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「才、才没有觉得害怕呢…来、来吧、继续调教吧…」`); // :7200
      await era.printAndWait(`虽然这么说着，${target_name}还是微微的颤抖着………`); // :7201
      await era.printAndWait(`―――初次恐怖超过LV2。`); // :7202
    } else {
      await era.printAndWait(`「这种事、没、没什么的…！」`); // :7205
      await era.printAndWait(`虽然这么说着，${target_name}还是微微的颤抖着………`); // :7206
      await era.printAndWait(`―――初次恐怖超过LV2。`); // :7207
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :7209
    era.set(`cflag:${target}:224`, 1); // :7209
  }

  if (era0(`nowex:${target}:0`) > 0 && era0(`cflag:${target}:225`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「啊啊…我、我…已经…不行…啊咕呜呜咦！」`); // :7218
      await era.printAndWait(
        `${target_name}好像因为对阴蒂断断续续的刺激而快要高潮了、扭着腰娇喘着。`,
      ); // :7219
      await era.printAndWait(
        `「啊啊——${heart(1)} 我、我…被魔王大人…去了…去了去了去了了了了了${heart(1)}」`,
      ); // :7220
      await era.printAndWait(`${target_name}的脸泛着红晕发出着绝顶的声音。`); // :7221
      await era.printAndWait(`「啊…哈啊哈啊…我…去了呢………」`); // :7222
      await era.printAndWait(`${target_name}还颤抖着腰沉浸在决定的余韵里。`); // :7223
      await era.printAndWait(
        `「啊啊啊…我…第一次在魔王大人面前阴蒂高潮了啊…${heart(1)}」`,
      ); // :7224
    } else {
      await era.printAndWait(
        `「不要！不要再继续了！不要…啊啊啊…咕、咦————！」`,
      ); // :7227
      await era.printAndWait(
        `${target_name}好像因为对阴蒂断断续续的刺激而快要高潮了。`,
      ); // :7228
      await era.printAndWait(
        `双脚下流的张开嘴里发出不像样的声音的那个身姿就像是贫民窟的妓女一样。`,
      ); // :7229
      await era.printAndWait(
        `「咦啊咦…不、不要再继续了饶了我吧…啊啊啊！咦…呀…呀…咕！」`,
      ); // :7230
      await era.printAndWait(
        `虽然${target_name}咬着嘴唇忍耐高潮，${player_name}发出了最后一击。`,
      ); // :7231
      await era.printAndWait(
        `「嗯啊啊！啊啊啊啊咦…呼哇啊啊啊去了去了去了去了————！」`,
      ); // :7232
      await era.printAndWait(
        `${target_name}发出震耳欲聋的绝顶的叫声，${player_name}微笑着为了让她冷静下来而温柔着抚摸着她。`,
      ); // :7233

      if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(`「我、我…这么简单就去了什么的…啊咦…咦」`); // :7236
        await era.printAndWait(
          `${target_name}因为绝顶的余韵而直不起腰，全身瘫软着………`,
        ); // :7237
      } else {
        await era.printAndWait(`「被你这么烂的技术弄高潮什么的…屈辱啊………」`); // :7239
        await era.printAndWait(
          `虽然${target_name}骂着人、但是在绝顶的余韵里直不起腰满脸通红的姿态下这么说让人觉得很滑稽………`,
        ); // :7240
      }
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :7243
    era.set(`cflag:${target}:225`, 1); // :7243
  }

  if (era0(`nowex:${target}:1`) > 0 && era0(`cflag:${target}:226`) == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊…啊啊…小穴…继续把我的小穴弄得乱七八糟的${heart(1)} 唔呀${heart(1)} 吧${heart(1)}」`,
      ); // :7252
      await era.printAndWait(
        `${target_name}大概是快高潮了，大大分开双腿、让${player_name}插进更深的地方。`,
      ); // :7253
      await era.printAndWait(
        `「啊啊！就是那里！继续插我的小穴…咦——！那里好舒服${heart(1)}」`,
      ); // :7254
      await era.printAndWait(
        `嘴里流着口水悲惨的只追求快感的${target_name}的身姿已经完全是一匹野兽一样了。`,
      ); // :7255
      await era.printAndWait(
        `「哈啊哈啊${heart(1)} 啊啊小穴去了去了…啊啊啊去了去了了了了了了了${heart(1)}」`,
      ); // :7256
      await era.printAndWait(
        `${target_name}翻着白眼绝顶了。这应该是在${player_name}面前的第一次私处绝顶………`,
      ); // :7257
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊！魔王大人…我、我的…哪里…小、小、小穴快要去了…所以…继续${heart(1)}」`,
      ); // :7260
      await era.printAndWait(
        `${target_name}追求着绝顶的秘裂啾啾的不停收缩着。柔软的哪里贪婪的包裹着，产生着快乐。`,
      ); // :7261
      await era.printAndWait(
        `「是、是的…我…因为魔王大人而去了${heart(1)} …被魔王大人把小穴弄去了${heart(1)} 啊啊啊！去了去了去了去了了了了了${heart(1)}」`,
      ); // :7262
      await era.printAndWait(
        `${target_name}狠狠的后仰着，发出绝顶的叫声。大概是因为被看到在${player_name}面前的第一次完全高潮非常害羞的原因，脸颊都变红了。`,
      ); // :7263
      await era.printAndWait(
        `「哈啊哈啊…我、我…被魔王大人弄高潮了…好幸福啊………${heart(3)}」`,
      ); // :7264
    } else {
      await era.printAndWait(`「不、不要啊…我被这种事情弄的舒服…嗯咕呜呜！」`); // :7267
      await era.printAndWait(
        `${target_name}的秘裂收缩着，柔软的内部贪婪的包裹着，好像是绝顶的前兆。`,
      ); // :7268
      await era.printAndWait(
        `注意到那个的${target_name}狠狠地咬着嘴唇拼死忍耐着，但在被开发了的身体面前这并没有用。`,
      ); // :7269

      if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(
          `「咕哈…啊啊…快、快停下啊…我、我要…去、去了什么的…咦啊咦…咦、啊啊啊————！」`,
        ); // :7272
        await era.printAndWait(
          `接下来的刺激让${target_name}后仰着，腰微微颤抖了起来。`,
        ); // :7273
        await era.printAndWait(
          `「对不起狂王大人啊啊啊！去了…去了去了去了了了了了！」`,
        ); // :7274
        await era.printAndWait(
          `${target_name}在${player_name}面前第一次私处绝顶了。`,
        ); // :7275
        await era.printAndWait(
          `”被憎恨的对手弄高潮的感想如何”耳边被这么说道的${target_name}不甘心的低下了头………`,
        ); // :7276
      } else {
        await era.printAndWait(
          `「啊！啊啊！好痛…就算这么痛也…嗯咕…啊哪里是…啊咦啊呀、不行…不要让我去啊！」`,
        ); // :7278
        await era.printAndWait(
          `${target_name}因为接下来的刺激而发出悲鸣，腰微微颤抖、决定的身体后仰着。`,
        ); // :7279
        await era.printAndWait(
          `「啊…咦——…不要啊！被魔王大人以外的人弄去了！啊啊啊…去了！去了！去——————！」`,
        ); // :7280
        await era.printAndWait(
          `${target_name}在${player_name}面前第一次私处绝顶了。`,
        ); // :7281
        await era.printAndWait(
          `「用这么烂…这么疼的技巧…让我去了什么的…哈啊…哈啊…哈啊…」`,
        ); // :7282
        await era.printAndWait(`${target_name}的下半身被爱液弄湿了………`); // :7283
      }
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :7286
    era.set(`cflag:${target}:226`, 1); // :7286
  } else if (
    era0(`nowex:${target}:1`) > 0 &&
    era0(`cflag:${target}:226`) == 1
  ) {
    if (era0(`talent:${target}:75`) == 1 && era0('tflag:60') == 1) {
      await era.printAndWait(
        `「啊啊嗯啊啊哈${heart(1)} 被肉棒填的好满${heart(1)}」`,
      ); // :7291
      await era.printAndWait(
        `${target_name}接近绝顶的秘裂不停地包裹着${player_name}的阴茎。`,
      ); // :7292
      await era.printAndWait(
        `「啊啊！要用肉棒去了啊${heart(1)} 用最喜欢的肉棒去了啊${heart(1)}」`,
      ); // :7293
      await era.printAndWait(
        `「嗯！啊嘎啊啊啊啊！啊啊${heart(1)} 去了去了去了去了去了了了了了了了${heart(1)}」`,
      ); // :7294
      await era.printAndWait(`${target_name}像野兽一样叫喊着绝顶了………`); // :7295
    } else if (era0(`talent:${target}:76`) == 1 && era0('tflag:60') == 1) {
      await era.printAndWait(
        `「啊啊嗯啊啊哈${heart(1)} 果然魔王大人的肉棒最棒了啊${heart(1)}」`,
      ); // :7298
      await era.printAndWait(
        `${target_name}接近绝顶的秘裂不停地包裹着${player_name}的阴茎。`,
      ); // :7299
      await era.printAndWait(
        `「嗯啊嗯…好深啊${heart(1)}…连我的最深处都被肉棒征服了啊…啊嗯嗯啊啊哈…」`,
      ); // :7300
      await era.printAndWait(
        `「嗯！啊啊继续插哪里${heart(1)} 啊！啊啊${heart(1)} 去了去了去了去了去了了了了了了了${heart(1)}」`,
      ); // :7301
      await era.printAndWait(
        `${target_name}像野兽一样叫喊着绝顶的身姿，被称呼为亲卫队队长的时候的高贵已经一点碎片都不剩了………`,
      ); // :7302
    } else if (era0(`talent:${target}:85`) == 1 && era0('tflag:60') == 1) {
      await era.printAndWait(
        `「嗯…啊…啊啊…哈…嗯…呼、啊啊…嗯…啊啊嗯…魔王大人…魔王大人…${heart(1)}」`,
      ); // :7305
      await era.printAndWait(
        `${target_name}撒着娇的秘裂不停地包裹着，取悦着${player_name}的阴茎。`,
      ); // :7306
      await era.printAndWait(
        `「是、是的…魔王大人…我、我要…被魔王大人弄…去、去了…嗯啊嗯！」`,
      ); // :7307
      await era.printAndWait(
        `${target_name}带着呆滞的表情一边这么说着，一边包裹着在小穴中蠢动的${player_name}的阴茎。`,
      ); // :7308
      await era.printAndWait(
        `「啊啊…我、我要…去了…被魔王大人抱着去了${heart(1)} 啊啊啊…哈…啊啊啊啊啊啊啊啊啊～${heart(1)}」`,
      ); // :7309
      await era.printAndWait(
        `${target_name}绝顶着，对${player_name}露出了幸福的表情………`,
      ); // :7310
    } else if (era0('tflag:60') == 1) {
      await era.printAndWait(
        `「哈啊哈啊…即、即使被你抱…我也不会去的！…嗯咕…啊哦！」`,
      ); // :7313
      await era.printAndWait(
        `说着强势的话的${target_name}的秘裂深深的被${player_name}的阴茎插入着。`,
      ); // :7314
      await era.printAndWait(`「啊…啊啊…哈、嗯…啊咕——！」`); // :7315
      await era.printAndWait(
        `「咦！啊！不要插哪里啊！啊…嗯…咦…去了去了去了了了！」`,
      ); // :7316

      if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(
          `${target_name}的弱点被顶到，马上就绝顶了，精疲力竭的躺在了${player_name}怀里。`,
        ); // :7319
        await era.printAndWait(`「哈啊哈啊…我、我被弄得这么…乱七八糟的………」`); // :7320
      } else {
        await era.printAndWait(
          `大概是调教的成果，${target_name}的秘裂不停的收缩着迎来了绝顶。`,
        ); // :7322
        await era.printAndWait(
          `「快、快松手…被你这种只有激烈的sex弄去了什么的……」`,
        ); // :7323
      }
    }
  }

  if (era0(`nowex:${target}:2`) > 0 && era0(`cflag:${target}:227`) == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊啊啊！我的肛门…啊咦咦咦…啊啊…变得好痒…嗯啊啊嗯${heart(1)}」`,
      ); // :7334
      await era.printAndWait(
        `${target_name}大概是快要肛门决定了，肛门收缩着，丰满的屁股颤抖着。`,
      ); // :7335
      await era.printAndWait(
        `于是${player_name}向${target_name}的肛门发出了最后一击。`,
      ); // :7336
      await era.printAndWait(
        `「啊啊啊啊…咦${heart(1)} 去了去了去了去了了了了${heart(1)}」`,
      ); // :7337
      await era.printAndWait(
        `${target_name}的第一次肛门绝顶展示在了${player_name}面前………`,
      ); // :7338
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「是的…我的…肛门…肛门好像要去了…啊啊啊${heart(1)}」`,
      ); // :7341
      await era.printAndWait(
        `${target_name}丰满的屁股颤抖着，宣扬着自己快要肛门绝顶的事。`,
      ); // :7342
      await era.printAndWait(
        `那可爱的身姿让${player_name}不由得从无情的角度贯穿了${target_name}的肛门。`,
      ); // :7343
      await era.printAndWait(
        `「啊啊…哈…啊啊…去了要去了…我要用肛门去了…啊…啊啊啊～～～${heart(1)}」`,
      ); // :7344
      await era.printAndWait(
        `${target_name}因为第一次的肛门绝顶被所爱的${player_name}看到而幸福的笑了………`,
      ); // :7345
    } else {
      await era.printAndWait(
        `「啊啊！快、快停下啊！即使做这种事…啊啊！也只会感觉很难受啊…啊啊啊！」`,
      ); // :7348
      await era.printAndWait(
        `${target_name}虽然拼命否定者，但肛门接近绝顶而激烈的收缩，丰满的屁股颤抖。`,
      ); // :7349
      await era.printAndWait(
        `于是${player_name}从无情的角度继续插着${target_name}的肛门。`,
      ); // :7350

      if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(
          `「啊！啊啊！…咦…不…不要…啊啊要去要去了…咦不要再…继续了啊！」`,
        ); // :7353
        await era.printAndWait(
          `随着${player_name}玩弄肛门，${target_name}不停地娇喘着、然后…`,
        ); // :7354
        await era.printAndWait(
          `「啊啊——！已、已经、不行不行不行…咦————！去了去了…啊啊啊肛门去了了了了了！」`,
        ); // :7355
        await era.printAndWait(
          `在${player_name}眼前激烈的绝顶。感到十分屈辱的${target_name}只能流着眼泪。`,
        ); // :7356
        await era.printAndWait(`「啊啊…明明都没让狂王大人碰过我的屁股………」`); // :7357
      } else {
        await era.printAndWait(
          `「啊咕！？那、哪里…很紧…的…不…不要…啊啊啊啊！」`,
        ); // :7359
        await era.printAndWait(
          `随着${player_name}玩弄肛门，${target_name}不停地娇喘着、然后…`,
        ); // :7360
        await era.printAndWait(
          `「啊啊！被弄着这么乱七八糟的…啊啊…咦、已经…咦…去了…去了去了了了了了了！」`,
        ); // :7361
        await era.printAndWait(
          `在${player_name}眼前激烈的绝顶。感到十分屈辱的${target_name}只能流着眼泪。`,
        ); // :7362
        await era.printAndWait(`「啊啊…对不起狂王大人………」`); // :7363
      }
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :7366
    era.set(`cflag:${target}:227`, 1); // :7366
  } else if (
    era0(`nowex:${target}:2`) > 0 &&
    era0(`cflag:${target}:227`) == 1
  ) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊啊～${heart(1)} 肛门小穴好棒啊${heart(1)}」`,
      ); // :7371
      await era.printAndWait(
        `${target_name}已经彻底变成肛门的快乐的俘虏了。无休止的快乐的最后，迎来了肛门绝顶。`,
      ); // :7372
      await era.printAndWait(
        `「嗯啊…啊咕呜呜呜…去了${heart(1)} 肛门小穴去了了了了了——${heart(1)}」`,
      ); // :7373
      await era.printAndWait(
        `不停地摇动着丰满的屁股的${target_name}品味着肛门绝顶………`,
      ); // :7374
    } else if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊！是、是的…我的…屁股已经到极限了…啊啊…是的…要…要去了…啊啊啊${heart(1)}」`,
      ); // :7377
      await era.printAndWait(
        `${target_name}无法反抗肛门的快乐。害羞的将快要绝顶的事报告给${player_name}。`,
      ); // :7378
      await era.printAndWait(
        `「啊！去了${heart(1)} 用肛门用肛门去了${heart(1)} 被最爱的魔王大人弄去了${heart(1)}」`,
      ); // :7379
      await era.printAndWait(
        `不停地摇动着丰满的屁股的${target_name}肛门绝顶了………`,
      ); // :7380
    } else {
      await era.printAndWait(
        `「咦！再继续玩弄肛门的话！不、不要啊…饶、饶不了你…呀啊啊啊！」`,
      ); // :7383
      await era.printAndWait(
        `${target_name}虽然因为马上就要肛门绝顶而不想再继续被玩弄但是${player_name}的手没有停下。`,
      ); // :7384

      if (era0(`abl:${master}:12`) > 5) {
        await era.printAndWait(
          `「啊啊！求你了肛门高潮什么的不要不要啊！…咦…啊啊啊啊！去了去了去了了了了！」`,
        ); // :7387
        await era.printAndWait(
          `${target_name}在${player_name}手中被强行的肛门绝顶了………`,
        ); // :7388
      } else {
        await era.printAndWait(
          `「这么！激烈的话！啊啊…我就要…啊咦！去了去了去了去了了了了！」`,
        ); // :7390
        await era.printAndWait(
          `${target_name}在${player_name}手中被强行的肛门绝顶了………`,
        ); // :7391
      }
    }
  }

  if (era0(`nowex:${target}:3`) > 0 && era0(`cflag:${target}:228`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊…被这么温柔的对待的话…我…嗯！啊嗯${heart(1)} 会用胸部去的…啊啊${heart(1)}」`,
      ); // :7402
      await era.printAndWait(
        `${target_name}沉浸在胸部被爱抚的感觉里。丰满的乳房上通红的乳头膨胀着勃起着。`,
      ); // :7403
      await era.printAndWait(
        `「啊啊…是的啊…我的胸部是魔王大人的东西啊…请随意使用…咦————！」`,
      ); // :7404
      await era.printAndWait(
        `${target_name}的乳头被啾的按下去，发出着不知道是悲鸣还是娇喘的声音。`,
      ); // :7405
      await era.printAndWait(
        `「是的…就这样把我…把我弄得更加乱七八糟的吧…啊！咦咦…去了去了去了了了了了${heart(1)}」`,
      ); // :7406
      await era.printAndWait(
        `不停的乳房爱抚的最后、${target_name}在${player_name}面前第一次用乳房绝顶了………`,
      ); // :7407
    } else {
      await era.printAndWait(
        `「啊啊…嗯…哈啊哈啊…及时做这种事…嗯…我也不会舒服的…啊哈！」`,
      ); // :7410
      await era.printAndWait(
        `和${target_name}的话完全相反，乳头完全勃起着用软糖一样的弹力回应着爱抚、然后${target_name}后仰着第一次用乳头绝顶了。`,
      ); // :7411
      await era.printAndWait(
        `「啊啊啊…再、再继续玩弄我的话……啊啊啊啊唔唔！啊啊——！」`,
      ); // :7412
      await era.printAndWait(
        `「………哈啊哈啊…不、不要再玩弄哪里了…嗯…哈唔…还很敏感啊…啊啊啊啊………」`,
      ); // :7413
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :7415
    era.set(`cflag:${target}:228`, 1); // :7415
  }

  const A =
    (era0(`delta:${target}:11`) || 0) + (era0(`delta:${target}:12`) || 0); // :7421 A = UP:11 + UP:12
  if (era0('tflag:3') == 1 && era0(`cflag:${target}:229`) == 0) {
    if (era0('tflag:20') == 1) {
      if (
        era0(`talent:${target}:76`) == 1 &&
        (A < 500 || era0('tflag:150') == 1)
      ) {
        await era.printAndWait(`「」`); // :7427
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (A < 500 || era0('tflag:150') == 1)
      ) {
        await era.printAndWait(`「」`); // :7430
      } else {
        await era.printAndWait(`「」`); // :7433
      }
    } else {
      if (era0(`talent:${target}:76`) == 1) {
        await era.print(`【处女丧失】`); // :7439
        await era.printAndWait(`「哈啊哈啊…怎么样？我的处女play？」`); // :7440
        await era.printAndWait(`${target_name}恶作剧一样的笑着。`); // :7441
        await era.printAndWait(
          `「下次“被强行夺走处女的悲鸣的小女孩play”也可以考虑呢♪」`,
        ); // :7442
      } else if (era0(`talent:${target}:85`) == 1) {
        await era.print(`【处女丧失】`); // :7445
        await era.printAndWait(
          `「明明不用特意做这种事…我也是魔王大人的东西…」`,
        ); // :7446
        await era.printAndWait(
          `${target_name}的股间流出虚伪的破瓜之血、然后${target_name}有点寂寞的笑了………`,
        ); // :7447
      } else {
        await era.print(`【处女丧失】`); // :7450
        await era.printAndWait(
          `「呵呵呵…不管多少次夺走我的处女、第一次也已经奉献给狂王大人了…」`,
        ); // :7451
        await era.printAndWait(
          `${target_name}一边流着眼泪一边嘀嘀咕咕的说着什么………`,
        ); // :7452
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :7455
    era.set(`cflag:${target}:229`, 1); // :7455
  }
}

/**
 * @KOJO_MESSAGE_MARKCNG_7（:7463-7543）：刻印变动触发口上。
 *
 * 六道头部守卫（:7467-7484）：TEQUIP:45 / TFLAG:899 / TEQUIP:89 / TEQUIP:90 /
 * TALENT:9==1 / TEQUIP:55（源侧 ASSI&&ASSIPLAY 守卫注释掉，未生效）。
 * 此后 CFLAG:297-300 各刻印 Lv3 初次达标时各触发一次（苦痛/快乐/屈服/
 * 反抗），均为独立 IF、非互斥链。
 *
 * @returns {Promise<number>} 0
 */
async function kojo_message_markcng_7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%

  if (era0(`tequip:${target}:45`)) {
    return 0;
  }

  if (era0('tflag:899')) {
    return 0;
  }

  if (era0(`tequip:${target}:89`)) {
    return 0;
  }

  if (era0(`tequip:${target}:90`)) {
    return 0;
  }

  if (era0(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era0(`tequip:${target}:55`)) {
    return 0;
  }

  if (era0('tflag:22') == 3 && era0(`cflag:${target}:297`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊咕…唔…没、没关系的…这疼痛可是魔王大人给予的………」`,
      ); // :7492
      await era.printAndWait(
        `${target_name}好像把被毫不客气的给予的强烈疼痛也当做重要的羁绊了………`,
      ); // :7493
    } else {
      await era.printAndWait(`「呜咕…我、我为什么会遇到这种…咕…呜呜………」`); // :7495
      await era.printAndWait(`${target_name}因为过分的苦痛而留下了眼泪………`); // :7496
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :7498
    era.set(`cflag:${target}:297`, 1); // :7498
  }

  if (era0('tflag:23') == 3 && era0(`cflag:${target}:298`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「啊啊啊…感受到魔王大人的爱了啊…请给我…更多…更多吧${heart(1)}」`,
      ); // :7507
      await era.printAndWait(
        `${target_name}从身体到脑髓都被刻入了强烈的快感………`,
      ); // :7508
    } else {
      await era.printAndWait(
        `「啊咦…这、这么舒服…还、还是第一次啊…呼哇啊啊啊啊………」`,
      ); // :7510
      await era.printAndWait(
        `${target_name}因为被刻下了强烈的快感而漏出了下流的表情………`,
      ); // :7511
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :7513
    era.set(`cflag:${target}:298`, 1); // :7513
  }

  if (era0('tflag:24') == 3 && era0(`cflag:${target}:299`) == 0) {
    await era.printAndWait(
      `「哈啊哈啊…我已经被逼到变成这个样子了…已经无法反抗了………」`,
    ); // :7520
    await era.printAndWait(
      `${target_name}看${player_name}的眼神好像见到新主人的母狗一样………`,
    ); // :7521
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :7522
    era.set(`cflag:${target}:299`, 1); // :7522
  }

  if (era0('tflag:21') == 3 && era0(`cflag:${target}:300`) == 0) {
    if (era0(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「我明明尽心到这种地步…却这样对待我…饶不了你………」`,
      ); // :7531
      await era.printAndWait(
        `好像有点太嚣张了。${player_name}做的事好像超过了${target_name}的愤怒的极限、今后的调教会变得棘手吧………`,
      ); // :7532
    } else {
      await era.printAndWait(
        `「不要再碰我了！肮脏的东西！果然你是…比畜生还低等的存在！」`,
      ); // :7534
      await era.printAndWait(
        `${player_name}的调教好像超越了${target_name}的愤怒的极限、今后的调教会变得棘手吧………`,
      ); // :7535
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :7537
    era.set(`cflag:${target}:300`, 1); // :7537
  }
}

/**
 * @SELF_KOJO_K7（:7544-7974）：事件口上（EVENT_AFTERTRAIN 等处 CALL SELF_KOJO）。
 *
 * 无头部守卫，直接按 TFLAG:13（自慰事件类别，TFLAG:13==1 崩坏对照支内嵌
 * Q 分支：0 默认/1 助手/2 野狗）、TFLAG:60（朝口交，随衣装 メイド服/
 * 妓女のドレス/バニースーツ 分岔）等触发条件分段处理，段间彼此独立
 * （非统一 ELSEIF 链）。CFLAG:262-296 覆盖百合PLAY/朝口交/调教后性交/
 * 夜袭/妊娠发觉/生产。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @param {number} [q] 自慰妄想对象（0 主人 / 1 助手 / 2 野狗）
 * @returns {Promise<number>} 0
 */
async function self_kojo_k7(rand, q) {
  const Q = q;
  const s = peek_aftertrain_s(); // TFLAG:13==4 支的 SIF s >= 3 需要（原作跨函数全局 S）
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_name(MASTER); // %CALLNAME:MASTER%
  const cstr2 = era.get(`cstr:${target}:2`) || ''; // %CSTR:2%（孩子生父的自定义称呼，K3 先例）

  if (era0('tflag:13') == 1) {
    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「啊哈啊…啊哈啊哈…啊哇哇啊…」`); // :7551
      await era.printAndWait(`${target_name}像坏掉的玩具一样疯狂的自慰着………`); // :7552
    } else if (Q == 1) {
      await era.printAndWait(`「嗯…啊啊…哈啊哈啊…都是女性也…很不错啊………♪」`); // :7555
      await era.printAndWait(
        `${target_name}像是在寻找${assi_name}的残渣一样把手指伸向了秘处………`,
      ); // :7556
    } else if (Q == 2) {
      await era.printAndWait(`「啊啊…野狗的…想要野狗的肉棒！」`); // :7559
      await era.printAndWait(
        `${target_name}一边想象着被野狗侵犯一边疯狂的自慰着………`,
      ); // :7560
    } else {
      if (
        era0(`talent:${target}:76`) &&
        (era0(`cflag:${target}:261`) < 4 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「啊啊…魔王大人不在的话闲的不得了…嗯…嗯…啊嗯」`,
        ); // :7565
        await era.printAndWait(
          `${target_name}大概是因为被调教了的身体很寂寞、自然地把手放到股间开始了自慰。`,
        ); // :7566
        await era.printAndWait(
          `「嗯哈啊哈啊…嗯…啊嗯…魔王大人那样激烈的…喜欢…啊啊啊嗯${heart(1)}」`,
        ); // :7567
        await era.printAndWait(
          `自慰越来越投入、溢出的爱液弄脏了床单。最后身体不由得想后仰着绝顶了。`,
        ); // :7568
        await era.printAndWait(
          `「哈啊——…哈啊——…………再不…再不快点来的话…我就要袭击过去了呦…${heart(1)}」`,
        ); // :7569
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :7570
        era.set(`cflag:${target}:261`, 4); // :7570
      } else if (
        era0(`talent:${target}:85`) &&
        (era0(`cflag:${target}:261`) < 3 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯…啊嗯…嗯…没有魔王大人的命令的话…明明不能做…不行…果然停不下来！」`,
        ); // :7573
        await era.printAndWait(
          `${target_name}的被彻底调教了的身体一旦着了火就无法简单的熄灭。`,
        ); // :7574
        await era.printAndWait(
          `一边咬着床单、一边回想着刚才调教的内容的${target_name}反复的自慰着。`,
        ); // :7575
        await era.printAndWait(
          `「啊啊——…魔王大人${heart(1)} 我…明明想成为更加属于魔王大人的东西${heart(1)}」`,
        ); // :7576
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :7577
        era.set(`cflag:${target}:261`, 3); // :7577
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (era0(`cflag:${target}:261`) < 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(
          `「嗯呼——…嗯呼——…啊…啊啊…手、手指…全部进来了吗…？」`,
        ); // :7580
        await era.printAndWait(
          `${target_name}把两手的手指一根根的插进自己的秘裂。`,
        ); // :7581
        await era.printAndWait(
          `「啊啊！虽然手指什么的果然不够…但是停不下来啊！」`,
        ); // :7582
        await era.printAndWait(
          `${target_name}在床上酷本的自慰持续了好几个小时………`,
        ); // :7583
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :7584
        era.set(`cflag:${target}:261`, 2); // :7584
      } else if (era0(`cflag:${target}:261`) < 1 || era0('flag:7') == 2) {
        await era.printAndWait(
          `「嗯…咕…哈啊哈啊…嗯…啊嗯…啊啊…比起用手指…更…」`,
        ); // :7587
        await era.printAndWait(`「不得不抚慰自己什么的真悲惨啊……」`); // :7588
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :7589
        era.set(`cflag:${target}:261`, 1); // :7589
      }
    }
  }

  if (era0('tflag:13') == 2) {
    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「啊呼——…嗯…呜呜——…啊——…啊啊啊——………」`); // :7600
      await era.printAndWait(
        `${assi_name}和已经坏掉的${target_name}享受着颓废的百合play………`,
      ); // :7601
      // CFLAG:262  = 6（变量语义：CFLAG 族，262） // :7602
      era.set(`cflag:${target}:262`, 6); // :7602
    } else if (
      era0(`talent:${target}:76`) &&
      (era0(`cflag:${target}:262`) < 5 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「呵呵呵、你特意留下就是说…要做对吧${heart(1)}」`,
      ); // :7605
      await era.printAndWait(
        `${target_name}舔了舔嘴唇，抱着${assi_name}不停地反复接吻着。`,
      ); // :7606
      await era.printAndWait(
        `「来…咱们一起享受吧？啊啊…嗯…就是这样…继续摸我的胸部…啊嗯…${heart(1)}」`,
      ); // :7607
      await era.printAndWait(
        `${assi_name}把${target_name}压倒、慢慢的玩弄着那丰满的身体。`,
      ); // :7608
      await era.printAndWait(
        `「啊啊嗯…啊啊…啊啊嗯…啊啊…继续…继续让我变得舒服吧${heart(1)}」`,
      ); // :7609
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :7610
      era.set(`cflag:${target}:262`, 5); // :7610
    } else if (
      era0(`talent:${target}:85`) &&
      (era0(`cflag:${target}:262`) < 4 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「这、这种事魔王大人不可能…诶、魔王大人许可了…怎么这样…啊啊啊！」`,
      ); // :7613
      await era.printAndWait(
        `${target_name}就那样被${assi_name}玩弄着，张开身体挖掘要害。`,
      ); // :7614
      await era.printAndWait(
        `「嗯啊…啊啊——！哈啊哈啊…不行啊…可以随便使用我的明明只有魔王大人…嗯哈咦哈咦${heart(1)}」`,
      ); // :7615
      await era.printAndWait(
        `${assi_name}舔了舔嘴唇，开始享受起了${target_name}的丰满的身体………`,
      ); // :7616
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :7617
      era.set(`cflag:${target}:262`, 4); // :7617
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (era0(`cflag:${target}:262`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「嗯…好棒啊…来吧…♪」`); // :7620
      await era.printAndWait(
        `${target_name}在床上张开身体诱惑着${assi_name}。好像是找到了女子之间的快感而很高兴的样子。`,
      ); // :7621
      await era.printAndWait(
        `「哈啊哈啊…啊嗯…恩…好棒啊…摸哪里都没关系哦…呀嗯…嗯…没错我那不干净的地方也…啊啊嗯！」`,
      ); // :7622
      await era.printAndWait(
        `${target_name}被${assi_name}的卓越的技术玩弄着，身心都慢慢的快要融化了………`,
      ); // :7623
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :7624
      era.set(`cflag:${target}:262`, 3); // :7624
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (era0(`cflag:${target}:262`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「哈啊哈啊…你这种做法没那么无聊…啊嗯…真是的…不用那么僵硬也…」`,
      ); // :7627
      await era.printAndWait(`「我不会从这里逃走的………」`); // :7628
      await era.printAndWait(
        `${assi_name}一边在寂寞的笑着的${target_name}脸上落下亲吻之雨、一边开始使用身体互相抚慰着………`,
      ); // :7629
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :7630
      era.set(`cflag:${target}:262`, 2); // :7630
    } else if (era0(`cflag:${target}:262`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(
        `「那个人已经走了你还特意留在这里是因为这种原因啊…好吧…即使成为安慰你的道具也…啊…嗯！」`,
      ); // :7633
      await era.printAndWait(
        `${target_name}坦率的吧身体托付给${assi_name}。${assi_name}稍微有些失望的开始享受起了${target_name}………`,
      ); // :7634
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :7635
      era.set(`cflag:${target}:262`, 1); // :7635
    }
  }

  if (era0('tflag:13') == 3) {
    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「啊唔…嗯…唔…悠棒…悠棒………♪」`); // :7645
      await era.printAndWait(`${target_name}就那样一脸呆滞的继续舔着阴茎………`); // :7646
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (era0(`cflag:${target}:263`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「啊呜…嗯嗯啾啾啾唔${heart(1)} 嗯咕唔…嗯嗯嗯咕…啾啾啾${heart(1)}」`,
      ); // :7649
      await era.printAndWait(
        `${target_name}更加贪婪的舔着射完精变得老实了的${player_name}的阴茎，把精液全部舔了下来，为了让它恢复舌头的动作变得更激烈了。`,
      ); // :7650
      await era.printAndWait(`「嗯啾咕…嗯啾啾啪啾啾啾…就${heart(1)}」`); // :7651
      await era.printAndWait(
        `${target_name}大概是彻底肉棒上瘾了，无视${player_name}已经起床了继续舔着………`,
      ); // :7652
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :7653
      era.set(`cflag:${target}:263`, 3); // :7653
    } else if (
      era0(`talent:${target}:85`) &&
      (era0(`cflag:${target}:263`) < 3 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「嗯…嗯啾…啾…啾——…啾${heart(1)} 啊哇、早上好我的魔王大人${heart(1)}」`,
      ); // :7656
      await era.printAndWait(
        `${target_name}完成了扫除口交、手温柔的抚摸着${player_name}的阴茎促进着回复。`,
      ); // :7657
      await era.printAndWait(
        `「收下了最浓的早上第一发真是对不起…看起来还很精神，我就继续早上的处理了${heart(1)}」`,
      ); // :7658
      await era.printAndWait(
        `“擅自自己榨取这算什么……”想这样吐槽的${player_name}放弃了，就那样放任着${target_name}的口腔奉仕………`,
      ); // :7659
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :7660
      era.set(`cflag:${target}:263`, 3); // :7660
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (era0(`cflag:${target}:263`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(`「啊嗯…嗯呼呼…请让我继续奉仕吧…♪」`); // :7663
      await era.printAndWait(
        `${target_name}一边微笑着一边用舌头缠上了${player_name}的阴茎。`,
      ); // :7664
      await era.printAndWait(
        `「哈啊哈啊…又变得精神起来了呢…真没办法呢、就让我负起责任处理一下吧♪」`,
      ); // :7665
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :7666
      era.set(`cflag:${target}:263`, 2); // :7666
    } else if (era0(`cflag:${target}:263`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(
        `「嗯咕…嗯…啾…啊呜…嗯咕…啊啊起床了呢…我那个…就收下你早上的第一发了！」`,
      ); // :7669
      await era.printAndWait(
        `${target_name}一边因为羞耻而满脸通红一边继续着扫除口交………`,
      ); // :7670
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :7671
      era.set(`cflag:${target}:263`, 1); // :7671
    }
  }

  if (era0('tflag:13') == 4) {
    if (
      era0(`abl:${target}:2`) >= 4 &&
      (era0(`cflag:${target}:264`) < 2 || era0('flag:7') == 2)
    ) {
      await era.printAndWait(
        `「继续…继续和我做…啊咦咦${heart(1)} 啊啊…呜啊啊啊啊${heart(1)}」`,
      ); // :7681
      await era.printAndWait(
        `${target_name}紧紧抱住${player_name}、享受着那互相寻求快乐的性爱。`,
      ); // :7682
      await era.printAndWait(
        `「啊啊啊…哈哈…啊嗯！是呢…我只最喜欢做爱的母狗呢${heart(1)}」`,
      ); // :7683
      await era.printAndWait(
        `${target_name}因为无法忍耐强力的快感而喊出了至今为止都说不出口的真心话。`,
      ); // :7684
      await era.printAndWait(
        `${player_name}微笑着扭动着腰，连${target_name}的脑袋里面都被搅动起来了。`,
      ); // :7685
      if (s >= 3) {
        await era.printAndWait(
          `然后${target_name}的蜜壶里面因为被中出了${s}次都起泡沫了。`,
        ); // :7687
      }
      await era.printAndWait(
        `「啊啊…啊啊——…啊啊——…不要离开…不要离开我…啊啊——${heart(1)}」`,
      ); // :7688
      await era.printAndWait(
        `${target_name}就那样带着恍惚的表情嘟嘟囔囔的说着什么………`,
      ); // :7689
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :7690
      era.set(`cflag:${target}:264`, 2); // :7690
    } else if (era0(`cflag:${target}:264`) < 1 || era0('flag:7') == 2) {
      await era.printAndWait(
        `「啊嗯！恩…啊啊…是、是的…继续侵犯…啊、啊嗯…讨厌…总觉得比平时还要温柔啊…啊啊啊…${heart(1)}」`,
      ); // :7693
      await era.printAndWait(
        `${target_name}因为${player_name}的腰的温柔的动作而有些不知所措、和平时稍微有点不同的快感让${target_name}的腰都快要融化了。`,
      ); // :7694
      await era.printAndWait(
        `「啊嗯…呼、啊…啊啊嗯…这样也感觉很舒服呢…啊啊…继续${heart(1)}」`,
      ); // :7695
      await era.printAndWait(
        `看着${target_name}那快要融化一样的表情，${player_name}加深着两人的快乐。`,
      ); // :7696
      await era.printAndWait(
        `然后从${target_name}股间${s}回份的精液流了出来………`,
      ); // :7697
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :7698
      era.set(`cflag:${target}:264`, 1); // :7698
    }
  }

  if (era0('tflag:13') == 5) {
    if (era0(`cflag:${target}:265`) < 1 || era0('flag:7') == 2) {
      if (
        era0(`talent:${target}:9`) == 1 &&
        (era0(`cflag:${target}:265`) < 2 || era0('flag:7') == 2)
      ) {
        await era.printAndWait(`「哈唔～…啊呜～………呜呜～…………」`); // :7709
        await era.printAndWait(
          `坏掉的${target_name}为让自己的主人抱自己而跑到了${master_name}的房间来了………`,
        ); // :7710
        // CFLAG:265  = 2（变量语义：CFLAG 族，265） // :7711
        era.set(`cflag:${target}:265`, 2); // :7711
      } else {
        await era.printAndWait(`「呵呵呵、今夜我是第一个来的呢…♪」`); // :7713
        await era.printAndWait(
          `注意到的时候拿着枕头的${target_name}已经进到了${master_name}的房间里。`,
        ); // :7714
        await era.printAndWait(
          `「呐、陪着你、可以吗？不会拒绝吧？拒绝的话…我会哭哦？」`,
        ); // :7715
        await era.printAndWait(
          `${master_name}一边苦笑着一边把${target_name}抱到了床上………`,
        ); // :7716
      }
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :7718
      era.set(`cflag:${target}:265`, 1); // :7718
    }
  }

  if (era0('tflag:13') == 6) {
    if (era0(`talent:${target}:9`) == 1) {
      await era.printAndWait(`「呵呵呵…世界看起来是这么闪闪发光呢——………」`); // :7727
      await era.printAndWait(
        `坏掉的${target_name}最终也没有恢复，就那样坏掉着被卖掉了………`,
      ); // :7728
    } else if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      await era.printAndWait(
        `「是的、我明白的…我为了魔王大人…为了……魔王大人…被、被卖掉了………」`,
      ); // :7731
      await era.printAndWait(`然后${target_name}和${master_name}永别了。`); // :7732
      await era.printAndWait(
        `狂王的爱人在任务中败北，落入了魔王的手里、最后被卖给奴隶商人。她自己的人生规划中是没有这种路线的吧。`,
      ); // :7733
      await era.printAndWait(
        `也不清楚她有没有在被卖之前获得过作为奴隶的幸福。`,
      ); // :7734
      await era.printAndWait(
        `浮现在坐在奴隶商人的马车的她的心里的想法到底是什么样的、这件事魔王已经一生都没办法理解，没办法知道了。`,
      ); // :7735
      await era.printAndWait(''); // :7736
      await era.printAndWait(`「下辈子出生的时候…希望我不是我………」`); // :7737
    } else if (era0(`mark:${target}:3`) == 3) {
      await era.printAndWait(`「还以为回到地面上的这个瞬间是最后的机会呢………」`); // :7740
      await era.printAndWait(
        `${target_name}逃脱失败，被卫兵抓了回来。${master_name}带着稍微有些遗憾的表情看着${target_name}。`,
      ); // :7741
      await era.printAndWait(
        `「哼…想杀我就杀吧…诶？你说啥了就没法收钱了…怎么这样…！」`,
      ); // :7742
      await era.printAndWait(
        `”果然是以自杀为目的的自暴自弃”${target_name}最后听到${master_name}这样嘟囔着………`,
      ); // :7743
    } else if (era0(`talent:${target}:76`)) {
      await era.printAndWait(
        `「对、对我的身体厌倦了吗！不、不要啊…我不想从你身边离开啊！」`,
      ); // :7746
      await era.printAndWait(
        `${target_name}像是分手的恋人一样说道、明明只是牝奴隶而已。`,
      ); // :7747
      await era.printAndWait(
        `被冷静的目光看着的${target_name}忽然放松了肩膀、老实的坐上了马车。`,
      ); // :7748
      await era.printAndWait(`「这么对待别人的话被怨恨的………魔王大人………」`); // :7749
    } else {
      await era.printAndWait(
        `「怎么这样…我变成低俗的魔族的奴隶…玩具什么的…求你了…让我什么都可以请不要这样…！」`,
      ); // :7752
      await era.printAndWait(
        `${target_name}虽然拼命的祈求着，却还是被装上了奴隶商人的马车………`,
      ); // :7753
    }
    if (era0(`talent:${target}:122`) != 1) {
      // CALL SELL_MATURO_K0 // :7756
    }
  }

  if (era0('tflag:13') == 11) {
    if (era0(`cflag:${target}:271`) == 0) {
      if (era0(`talent:${target}:9`) == 1) {
        await era.printAndWait(
          `「骗、骗人…骗人骗人骗人…我怀孕了什么的…怀上了怪物的孩子什么的…不要不要啊啊啊啊啊啊啊啊啊啊！」`,
        ); // :7766
        await era.printAndWait(
          `${target_name}被看到不停地打着自己的肚子而被压住，打上了镇静剂。`,
        ); // :7767
        await era.printAndWait(
          `虽然肚子里的孩子没有流产、但${target_name}的精神没能承受住妊娠的事实………`,
        ); // :7768
      } else if (
        era0(`talent:${target}:85`) &&
        era0(`cflag:${target}:102`) == 1
      ) {
        await era.printAndWait(`「那个…魔王大人…今天有令人高兴的报告………」`); // :7771
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边怯生生的向${master_name}报告。`,
        ); // :7772
        await era.printAndWait(
          `「我、怀孕了。毫无疑问是魔王大人…您的孩子哦${heart(1)}」`,
        ); // :7773
      } else if (
        era0(`talent:${target}:76`) &&
        era0(`cflag:${target}:102`) == 1
      ) {
        await era.printAndWait(`「啊、魔王大人…稍微有点事要报告」`); // :7776
        await era.printAndWait(
          `${target_name}抱着${master_name}的手腕用比平时更激烈的方式撒着娇。`,
        ); // :7777
        await era.printAndWait(
          `「我、已经怀孕了。当然，是魔王大人的孩子、但是请毫无顾忌的抱我吧」`,
        ); // :7778
        await era.printAndWait(
          `「因为魔王大人的孩子的话我觉得不管做什么都不会流产呢…呵呵呵♪」`,
        ); // :7779
      } else if (era0(`cflag:${target}:102`) == 2) {
        await era.printAndWait(
          `「那个…魔王大人…我看来好像因为${cstr2}的子种怀孕了………」`,
        ); // :7782
        await era.printAndWait(
          `${target_name}一边摩挲着腹部一边向${master_name}报告了妊娠。`,
        ); // :7783
        await era.printAndWait(
          `「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」`,
        ); // :7784
      } else if (era0(`cflag:${target}:102`) == 3) {
        await era.printAndWait(
          `「那个…魔王大人…我看来好像因为${cstr2}的子种怀孕了………」`,
        ); // :7787
        await era.printAndWait(
          `${target_name}一边摩挲着腹部一边向${master_name}报告了妊娠。`,
        ); // :7788
        await era.printAndWait(
          `「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」`,
        ); // :7789
      } else if (
        era0(`cflag:${target}:102`) == 5 &&
        era0(`talent:${target}:136`) &&
        era0(`cflag:${target}:1`) != 9
      ) {
        await era.printAndWait(
          `「呵呵呵、魔王大人、我…看起来已经怀上了野狗大人的孩子了呢………♪」`,
        ); // :7792
        await era.printAndWait(
          `${target_name}高兴地把妊娠的事报告给了${player_name}、今后要稍微注意一点了。`,
        ); // :7793
        await era.printAndWait(
          `「啊啊…生出来的孩子也像野狗大人一样做一只优秀的野狗的话我会很高兴的♪」`,
        ); // :7794
      } else if (era0(`cflag:${target}:102`) == 7) {
        await era.printAndWait(`「哎、哎呀…怀上了狂王大人的孩子什么的」`); // :7797
        await era.printAndWait(
          `「如果能稍微早一点的话就能坦率的感到高兴了呢…」`,
        ); // :7798
      } else {
        await era.printAndWait(`「我…怀孕了…这是骗人的吧…………」`); // :7801
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :7803
      era.set(`cflag:${target}:271`, 1); // :7803
    } else {
      if (era0(`talent:${target}:9`) == 1) {
        await era.printAndWait(
          `「骗、骗人…骗人骗人骗人…我怀孕了什么的…怀上了怪物的孩子什么的…不要不要啊啊啊啊啊啊啊啊啊啊！」`,
        ); // :7807
        await era.printAndWait(
          `${target_name}被看到不停地打着自己的肚子而被压住，打上了镇静剂。`,
        ); // :7808
        await era.printAndWait(
          `虽然肚子里的孩子没有流产、但${target_name}的精神没能承受住妊娠的事实………`,
        ); // :7809
      } else if (
        era0(`talent:${target}:85`) &&
        era0(`cflag:${target}:102`) == 1
      ) {
        await era.printAndWait(`「那个…魔王大人…今天有令人高兴的报告………」`); // :7812
        await era.printAndWait(
          `${target_name}一边抚摸着肚子一边怯生生的向${master_name}报告。`,
        ); // :7813
        await era.printAndWait(
          `「我、怀孕了。毫无疑问是魔王大人…您的孩子哦${heart(1)}」`,
        ); // :7814
      } else if (
        era0(`talent:${target}:76`) &&
        era0(`cflag:${target}:102`) == 1
      ) {
        await era.printAndWait(`「啊、魔王大人…稍微有点事要报告」`); // :7817
        await era.printAndWait(
          `${target_name}抱着${master_name}的手腕用比平时更激烈的方式撒着娇。`,
        ); // :7818
        await era.printAndWait(
          `「我、已经怀孕了。当然，是魔王大人的孩子、但是请毫无顾忌的抱我吧」`,
        ); // :7819
        await era.printAndWait(
          `「因为魔王大人的孩子的话我觉得不管做什么都不会流产呢…呵呵呵♪」`,
        ); // :7820
      } else if (era0(`cflag:${target}:102`) == 2) {
        await era.printAndWait(
          `「那个…魔王大人…我看来好像因为${cstr2}的子种怀孕了………」`,
        ); // :7823
        await era.printAndWait(
          `${target_name}一边摩挲着腹部一边向${master_name}报告了妊娠。`,
        ); // :7824
        await era.printAndWait(
          `「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」`,
        ); // :7825
      } else if (era0(`cflag:${target}:102`) == 3) {
        await era.printAndWait(
          `「那个…魔王大人…我看来好像因为${cstr2}的子种怀孕了………」`,
        ); // :7828
        await era.printAndWait(
          `${target_name}一边摩挲着腹部一边向${master_name}报告了妊娠。`,
        ); // :7829
        await era.printAndWait(
          `「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」`,
        ); // :7830
      } else if (
        era0(`cflag:${target}:102`) == 5 &&
        era0(`talent:${target}:136`) &&
        era0(`cflag:${target}:1`) != 9
      ) {
        await era.printAndWait(
          `「呵呵呵、魔王大人、我…看起来已经怀上了野狗大人的孩子了呢………♪」`,
        ); // :7833
        await era.printAndWait(
          `${target_name}高兴地把妊娠的事报告给了${player_name}、今后要稍微注意一点了。`,
        ); // :7834
        await era.printAndWait(
          `「啊啊…生出来的孩子也像野狗大人一样做一只优秀的野狗的话我会很高兴的♪」`,
        ); // :7835
      } else if (era0(`cflag:${target}:102`) == 7) {
        await era.printAndWait(`「哎、哎呀…怀上了狂王大人的孩子什么的」`); // :7838
        await era.printAndWait(
          `「如果能稍微早一点的话就能坦率的感到高兴了呢…」`,
        ); // :7839
      } else {
        await era.printAndWait(`「我…怀孕了…这是骗人的吧…………」`); // :7842
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :7844
      era.set(`cflag:${target}:271`, 1); // :7844
    }
  }

  if (era0('tflag:13') == 12) {
    if (era0(`cflag:${target}:272`) == 0) {
      if (era0(`talent:${target}:9`) == 1) {
        await era.printAndWait(
          `「啊啊——！杀了！杀了他啊啊啊啊！我要杀了他啊啊啊啊啊啊！」`,
        ); // :7855
        await era.printAndWait(`崩坏了的${target_name}不停地哭泣哀嚎着………`); // :7856
      } else if (
        era0(`talent:${target}:85`) &&
        era0(`cflag:${target}:102`) == 1
      ) {
        await era.printAndWait(`「呵呵呵、生下了你的孩子…我好幸福啊………」`); // :7859
        await era.printAndWait(`${target_name}抱起你的孩子幸福的笑了………`); // :7860
      } else {
        await era.printAndWait(`「哈啊哈啊…终于生出来了………」`); // :7863
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :7865
      era.set(`cflag:${target}:272`, 1); // :7865
    } else {
      if (era0(`talent:${target}:9`) == 1) {
        await era.printAndWait(
          `「啊啊——！杀了！杀了他啊啊啊啊！我要杀了他啊啊啊啊啊啊！」`,
        ); // :7869
        await era.printAndWait(`崩坏了的${target_name}不停地哭泣哀嚎着………`); // :7870
      } else if (
        era0(`talent:${target}:85`) &&
        era0(`cflag:${target}:102`) == 1
      ) {
        await era.printAndWait(`「呵呵呵、生下了你的孩子…我好幸福啊………」`); // :7873
        await era.printAndWait(`${target_name}抱起你的孩子幸福的笑了………`); // :7874
      } else {
        await era.printAndWait(`「哈啊哈啊…终于生出来了………」`); // :7877
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :7879
      era.set(`cflag:${target}:272`, 1); // :7879
    }
  }

  if (era0('tflag:13') == 13) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      if (era0(`talent:${target}:153`)) {
        await era.printAndWait(`「啊啦、是不是来看我变大的肚子来了？」`); // :7890
        await era.printAndWait(
          `${target_name}抚摸着因为接近临盆而大大的膨胀起来的肚子………`,
        ); // :7891
      } else if (era0(`talent:${target}:154`)) {
        await era.printAndWait(`「呵呵呵、这孩子精神过头得有些麻烦哦」`); // :7894
        await era.printAndWait(`${target_name}哄着孩子………`); // :7895
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :7898
    era.set(`cflag:${target}:273`, 1); // :7898
  }

  if (era0('tflag:13') == 14) {
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      await era.printAndWait(`「啊啊、我可爱的孩子离开了………」`); // :7907
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :7909
    era.set(`cflag:${target}:274`, 1); // :7909
  }

  if (era0('tflag:13') == 999) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait(`「死在这里也…是命运吧………」`); // :7919
    } else {
      await era.printAndWait(`「我不想死在…这里…啊…」`); // :7922
    }
  }

  if (era0('tflag:13') == 998) {
    if (era0(`talent:${target}:85`)) {
      await era.printAndWait(''); // :7932-7933
    } else {
      await era.printAndWait(''); // :7935-7939
    }
  }

  // TFLAG:13 = 0（跨域写走门面 game.train.初吻与自我口上，ere/facade/game-train.js） // :7942
  game.train.初吻与自我口上 = 0; // :7942

  return 0;
}

/**
 * @DUNGEON_RYOUZYOKU_K7（:7975-7992）：迷宫败北凌辱口上（列首触发）。
 * @returns {Promise<number>} 0
 */
async function dungeon_ryouzyoku_k7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「能夺走我处女的幸运儿会是谁呢？」`); // :7982
    await era.printAndWait(`${target_name}虽然败北了却还是露出着余裕的态度………`); // :7983
  } else {
    await era.printAndWait(`「呵呵呵、窝在这种地方输了呢…来吧、随便侵犯吧」`); // :7986
    await era.printAndWait(`${target_name}虽然败北了却还是露出着余裕的态度………`); // :7987
  }

  return 0;
}

/**
 * @DUNGEON_RYOUZYOKU_AFTER_K7（:7993-8048）：迷宫凌辱结束后口上。
 * @returns {Promise<number>} 0
 */
async function dungeon_ryouzyoku_after_k7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0(`talent:${target}:0`) == 1) {
    await era.printAndWait(
      `「哦唔！ 因为我的处女是再生处女膜的假货而不出手是什么意思！？」`,
    ); // :8000
    await era.print(`作为代替`); // :8001

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门被彻底侵犯，逆流出了分不清是精液还是粘液的液体。`,
      ); // :8004
      await era.printAndWait(`「啊嗯…只侵犯肛门…你们真的很喜欢这种玩法呢………」`); // :8005
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(''); // :8009-8010
      await era.printAndWait(
        `${target_name}的脸上被浇满了怪物们的精液和粘液，变成了像面膜一样的状态。`,
      ); // :8010
      await era.printAndWait(
        `「明明全都让我喝掉就好了…为什么大家都要浇在脸上呢…？」`,
      ); // :8011
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(''); // :8015-8016
      await era.printAndWait(`「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」`); // :8016
      await era.printAndWait(
        `${target_name}把精液和粘液晕倒嘴里咕噜咕噜的咀嚼着………`,
      ); // :8017
    }
  } else {
    await era.printAndWait(
      `「呵呵呵…果然这样太激烈了…稍微有些直不起腰来了………」`,
    ); // :8021
    await era.printAndWait(
      `${target_name}想要站起来，但因为激烈的凌辱而像刚出生的小鹿一样腰腿不停的颤抖着。`,
    ); // :8022

    if (era0(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「啊啊…真的好激烈啊…我好想快上瘾了啊…♪」`); // :8025
      await era.printAndWait(
        `从${target_name}的腔口里你流出了分不清是怪物们的精液还是粘液的液体。`,
      ); // :8026
    }

    if (era0(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `${target_name}的肛门被彻底侵犯，逆流出了分不清是精液还是粘液的液体。`,
      ); // :8030
      await era.printAndWait(`「啊嗯…只侵犯肛门…你们真的很喜欢这种玩法呢………」`); // :8031
    }

    if (era0(`exp:${target}:22`) > 20) {
      await era.printAndWait(''); // :8035-8036
      await era.printAndWait(
        `${target_name}的脸上被浇满了怪物们的精液和粘液，变成了像面膜一样的状态。`,
      ); // :8036
      await era.printAndWait(
        `「明明全都让我喝掉就好了…为什么大家都要浇在脸上呢…？」`,
      ); // :8037
    }

    if (era0(`exp:${target}:20`) > 20) {
      await era.printAndWait(''); // :8041-8042
      await era.printAndWait(`「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」`); // :8042
      await era.printAndWait(
        `${target_name}把精液和粘液晕倒嘴里咕噜咕噜的咀嚼着………`,
      ); // :8043
    }
  }

  return 0;
}

/**
 * @BENKI_KOUJO_K7（:8049-8149）：肉便器口上。角色即 A（BENKI.ERB 调用前
 * `TARGET = A`，抵达时 era_flag.target 已是该角色，1:1 对应 K1 的
 * `const a = target` 别名同款先例）。FLAG:62（本项目门面
 * game.train.肉便器行动）0-5 六档，各自 淫乱/爱慕/侍奉精神Lv5+/それ以外
 * 四支。
 * @returns {Promise<number>} 0
 */
async function benki_koujo_k7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (game.train.肉便器行动 == 0) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊…被这种污秽的肉棒侵犯让人根本停不下来啊…${heart(1)}」`,
      ); // :8058
    } else if (era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「嗯…啊嗯…啊啊…可以自由使用我的身体的明明只有魔王大人…嗯…啊嗯」`,
      ); // :8061
    } else if (era0(`abl:${target}:16`) >= 5) {
      await era.printAndWait(
        `「哈啊哈…啊嗯！温柔一点、请不要这么粗暴的对待我的身体…嗯…啊嗯！」`,
      ); // :8064
    } else {
      await era.printAndWait(
        `「好、好脏…好臭！不…不要啊啊啊啊啊…咦…咦——————！」`,
      ); // :8067
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊啊…女子之间最棒了啊…嗯啊啊嗯…请继续侵犯我吧…♪」`,
      ); // :8073
    } else if (era0(`talent:${target}:85`)) {
      await era.printAndWait(`「啊…啊啊啊…不要…不要啊…嗯咦…嗯咕…嗯咕呜呜！」`); // :8076
      await era.printAndWait(`${target_name}被强行压住喝着小便………`); // :8077
    } else if (era0(`abl:${target}:16`) >= 5) {
      await era.printAndWait(
        `「哈啊哈啊…嗯…是的、姐、姐姐大人…我会好好奉仕的…所以请不要再打了………」`,
      ); // :8080
    } else {
      await era.printAndWait(
        `「啊啊——！我、被做这种事…别以为就这样…不…不要啊————！」`,
      ); // :8083
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊嗯啊嗯啊啊嗯♪野狗的肉棒最棒了啊…啊啊啊${heart(1)}」`,
      ); // :8089
    } else if (era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「对不起魔王大人…我的身体被野狗侵犯变得污秽了啊…咦…啊咦」`,
      ); // :8092
    } else if (era0(`abl:${target}:16`) >= 5) {
      await era.printAndWait(
        `「咕…啊…啊啊…咦…啊啊啊！啊嗯啊…啊啊…再继续的话…我要…啊啊——！」`,
      ); // :8095
    } else {
      await era.printAndWait(
        `「咦…只有被野兽侵犯…啊啊！不要！不要啊啊啊啊啊！」`,
      ); // :8098
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「哈啊哈啊…双穴同时被插最棒了啊…${heart(1)} 啊嗯…精液要流出来了…♪」`,
      ); // :8104
    } else if (era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「这么污秽的我…可以得到魔王大人的宠爱吗…啊啊啊啊………」`,
      ); // :8107
    } else if (era0(`abl:${target}:16`) >= 5) {
      await era.printAndWait(
        `「哈啊哈啊…下半身快没有感觉了啊…嗯啊啊…啊嗯………」`,
      ); // :8110
    } else {
      await era.printAndWait(`「我会老实的、所以请再温柔一点吧………呜呜呜………」`); // :8113
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊嗯…请继续将精液射在肉便器的${target_name}里吧${heart(1)}」`,
      ); // :8119
    } else if (era0(`talent:${target}:85`)) {
      await era.printAndWait(`「啊啊…不要射在里面啊…这样的话我会怀孕的………」`); // :8122
    } else if (era0(`abl:${target}:16`) >= 5) {
      await era.printAndWait(
        `「哈啊哈啊…这、这样就满足了吗？　啊啊…哈啊哈啊………」`,
      ); // :8125
    } else {
      await era.printAndWait(`「啊啊啊啊…为什么只有我这样………」`); // :8128
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era0(`talent:${target}:76`) == 1) {
      await era.printAndWait(
        `「啊啊嗯！不止肛门，也请使用小穴吧！小穴好寂寞啊！」`,
      ); // :8134
    } else if (era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「不净的血被侵犯…而感到高兴什么的…我…啊啊啊………」`,
      ); // :8137
    } else if (era0(`abl:${target}:16`) >= 5) {
      await era.printAndWait(
        `「啊嗯…我、我是…屁股…肛门会有感觉的变态便器啊…………唔唔唔」`,
      ); // :8140
    } else {
      await era.printAndWait(
        `「啊啊啊啊…我的肛门要…坏…坏掉了啊…啊啊…啊啊啊啊………」`,
      ); // :8143
    }
  }

  return 0;
}

/**
 * @DUNGEON_VICTORY_K7（:8150-8173）：迷宫战斗胜利口上。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0
 */
async function dungeon_victory_k7(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (rand_n(3) == 0) {
    await era.printAndWait(`「成为了不错的消遣呢」`); // :8156
  } else if (rand_n(2) == 0) {
    await era.printAndWait(`「在我的强大面前没有什么解决不了的」`); // :8158
  } else {
    await era.printAndWait(`「嘛、理所当然的结果呢」`); // :8160
  }

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`「果然胡来的稍微有些过分了呢………」`); // :8165
    await era.printAndWait(`${target_name}坐了下来休息着………`); // :8166
  } else {
    await era.printAndWait(`「呼、真是没有像样的对手呢」`); // :8169
  }

  return 0;
}

/**
 * @DUNGEON_ATTACK_K7（:8174-8205）：迷宫战斗攻击口上。CFLAG:1==2（状态）
 * 与其余分两档，各自随机三选一。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} 0
 */
async function dungeon_attack_k7(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (era0(`cflag:${target}:1`) == 2) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「觉悟吧！」`); // :8182
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「参上！」`); // :8184
    } else {
      await era.printAndWait(`「吃我一记！」`); // :8186
    }
  } else {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「你也会被魔王大人抱吗～？」`); // :8191
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「来吧来吧、早点投降吧！」`); // :8193
    } else {
      await era.printAndWait(`「你想赢我？」`); // :8195
    }
  }

  return 0;
}

/**
 * @COLOSSEUM_KOJO_7（:8206-8349）：死斗场专用口上（TEQUIP:55 时由
 * KOJO_MESSAGE_COM_7 头部守卫岔入）。SELECTCOM 覆盖：55/56/31/5/21/27/51。
 * `ITEM:PBAND`（源 :8258/:8293/:8320）里的 PBAND 是 `CSV/VariableSize.csv`
 * 声明的自定义全局变量，`SYSTEM ver1.0.3.ERB:42` 启动时赋值 4 且全库未
 * 再改写，等价常量 `ITEM:4`（同 system/train/com-hardcore.js 的
 * `const PBAND = 4` 先例），故按 `item:4` 直译，非字符串具名寻址。
 * @returns {Promise<number>} 0
 */
async function colosseum_kojo_7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi = era_flag.assi;
  const assi_name = chara_callname(assi); // %SAVESTR:ASSI%

  if (era_flag.selectcom == 55) {
    if (era0(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的气力都没有了……`); // :8213
    } else {
      await era.printAndWait(
        `${target_name}因为死斗场里热闹的气氛和被对战对手盯着而害怕的发着抖……`,
      ); // :8215
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era0(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「怎么这样、这不是游戏吗…？」`); // :8227
        await era.printAndWait(
          `${target_name}被${assi_name}打倒在地、舔着死斗场的地面………`,
        ); // :8228
      } else {
        await era.printAndWait(`「咦！咦…不、不要靠近我啊…啊…啊啊啊啊！」`); // :8230
        await era.printAndWait(`${target_name}被折腾着、彻底没有了气力………`); // :8231
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「呐、呐…真的会手下留情吧？只是游戏对吧？」`); // :8236
        await era.printAndWait(
          `${assi_name}咧嘴笑着，望向失去力量的${target_name}………`,
        ); // :8237
      } else {
        await era.printAndWait(
          `「这个等级的怪物的话我明明能一边哼着歌一边杀掉的…！」`,
        ); // :8239
        await era.printAndWait(
          `失去力量的${target_name}带着一脸后悔的扭曲表情和怪物对峙着………`,
        ); // :8240
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「哈啊…哈啊…嗯…嗯唔…嗯啾…嗯咕…嗯啾啾…」`); // :8252
      await era.printAndWait(`「绝…绝饶不了你…嗯咕！？」`); // :8253
      await era.print(`${assi_name}因为`); // :8254
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`肉棒`); // :8256
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:4') == 1
      ) {
        await era.print(`假阴茎`); // :8258
      }
      await era.printAndWait(`被${target_name}舔着而露出了心旷神怡的额表情……`); // :8259
    } else {
      await era.printAndWait(`「嗯…好臭…好臭…嗯咕…啾………」`); // :8261
      await era.printAndWait(
        `${target_name}吞下了发出着令人作呕的气味的阴茎……`,
      ); // :8262
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「哈啊哈啊…嗯…啊啊…好、好痛啊…啊唔！」`); // :8272
      await era.printAndWait(`${target_name}被${assi_name}抓住了胸部。`); // :8273
      await era.printAndWait(
        `然后${assi_name}为了让观众们看而开始揉起了丰满的胸部………`,
      ); // :8274
    } else {
      await era.printAndWait(`「啊啊…好、好痛啊…啊咦咦咦咦！」`); // :8276
      await era.printAndWait(
        `${target_name}因为丰满的胸部想要被握碎了一样的揉着而发出了悲鸣。`,
      ); // :8277
      await era.printAndWait(`那苦闷的声音让死斗场的观众们的欢呼声更高了………`); // :8278
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊啊——！咦…咦——！我、我…这样…啊啊——！」`); // :8288
      await era.print(`${assi_name}一边听着${target_name}的悲鸣一边用`); // :8289
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`肉棒`); // :8291
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:4') == 1
      ) {
        await era.print(`假阴茎`); // :8293
      }
      await era.printAndWait(`继续毫不留情的蹂躏着${target_name}的小穴。`); // :8294
      await era.printAndWait(`随着${target_name}发出的悲鸣，观众们沸腾着………`); // :8295
    } else if (era0('tflag:400') == 206) {
      await era.printAndWait(
        `「咦————！咕咦——…噶…唔哦…咕哦哦哦哦…咯…咦————————！」`,
      ); // :8298
      await era.printAndWait(
        `悲惨的${target_name}发出着被踩死的青蛙一样的声音，就那样被巨魔插着。`,
      ); // :8299
      await era.printAndWait(`观众们站了起来、沸腾着………`); // :8300
    } else {
      await era.printAndWait(`「先、先再弄湿一点啊…啊…啊啊！哇…咦…呜咕！」`); // :8302
      await era.printAndWait(
        `${target_name}因为被怪物从后面侵犯而不停地悲鸣着。`,
      ); // :8303
      await era.printAndWait(`观众们站了起来、沸腾着………`); // :8304
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊哦…啊啊…如果你有人类的心的话…就稍微温柔一点…啊啊啊…咦…啊咕！」`,
      ); // :8315
      await era.print(`${assi_name}一边听着${target_name}的悲鸣一边用`); // :8316
      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {
        await era.print(`肉棒`); // :8318
      }
      if (
        era0(`talent:${assi}:121`) != 1 &&
        era0(`talent:${assi}:122`) != 1 &&
        era0('item:4') == 1
      ) {
        await era.print(`假阴茎`); // :8320
      }
      await era.printAndWait(`继续毫不留情的蹂躏着${target_name}的小穴。`); // :8321
      await era.printAndWait(`随着${target_name}发出的悲鸣，观众们沸腾着………`); // :8322
    } else if (era0('tflag:400') == 206) {
      await era.printAndWait(
        `「咳咳…肛门要…坏掉了啊…啊啊啊啊…咕咦咦咦咦咦——————————！」`,
      ); // :8325
      await era.printAndWait(
        `悲惨的${target_name}发出着被踩死的青蛙一样的声音，用肛门接受着巨魔巨大的阴茎。`,
      ); // :8326
      await era.printAndWait(
        `肛门好像被彻底破坏了一样扩张着、终于${target_name}口吐白沫了。`,
      ); // :8327
      await era.printAndWait(`观众们看到${target_name}这个样子、沸腾了………`); // :8328
    } else {
      await era.printAndWait(`「啊啊——！坏掉了要坏掉了啊…啊咦————！」`); // :8330
      await era.printAndWait(
        `${target_name}因为被怪物从后面侵犯肛门而不停地悲鸣着。`,
      ); // :8331
      await era.printAndWait(`观众们站了起来、沸腾着………`); // :8332
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(
      `「咦…这个史莱姆是…一坨…媚药…啊…啊啊…咕…啊啊啊嗯！」`,
    ); // :8341
    return 0;
  }

  return 0;
}

/**
 * @NTR_KOUJO_K7（:8350-8538）：狂王 NTR 口上。CFLAG:650 首次触发标记
 * （:8354，与后续分支互不排斥）之后按 P（分派方式编号，1-7 常规
 * + 20 生产专场）取一支，CFLAG:651-657 各自记录首次触发。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（未使用，随调用
 *   约定保留）
 * @param {number} P NTR 分派方式编号
 * @returns {Promise<number>} 0
 */
async function ntr_koujo_k7(rand, P) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%

  if (era0(`cflag:${target}:650`) == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :8354
    era.set(`cflag:${target}:650`, 1); // :8354
  }

  if (P == 1) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `${target_name}被分开着双腿绑住了脚腕，在她身边能看见吊起她的狂王。`,
      ); // :8360
      if (era0('flag:500') == 1) {
        await era.print(`然后、狂王的巨根`); // :8362
      } else {
        await era.print(`然后、特大号按摩棒`); // :8364
      }
      await era.printAndWait(
        `慢慢的插进了${target_name}的秘裂。在镜头里能看见${target_name}的蜜壶被深深的贯穿了。`,
      ); // :8366
      await era.printAndWait(
        `「本来应该献给魔王大人的处女被夺走了…对不起…对不起…啊啊——！」`,
      ); // :8367
      await era.printAndWait(
        `听到哭叫着的${target_name}的声音的狂王细致的动着腰侵犯着${target_name}的蜜壶。`,
      ); // :8368
      await era.printAndWait(
        `然后${target_name}绝顶的时候，狂王回过头看向这边、向着摄像头微微一笑，水晶球的影像就关闭了………`,
      ); // :8369
    } else {
      await era.printAndWait(`「啊啊嗯…狂王大人连我第二个处女都夺走了啊…♪」`); // :8371
      await era.printAndWait(
        `水晶球中的${target_name}带着对恋人撒娇一样的表情被狂王抱住侵犯着。`,
      ); // :8372
      await era.printAndWait(
        `「唔呵呵、那个魔王在考虑什么啊…啊嗯…把我的处女膜再生了…啊啊…再次被狂王大人夺走我的处女好幸福啊♪」`,
      ); // :8373
      if (era0('flag:500') == 1) {
        await era.print(`狂王的巨根`); // :8375
      } else {
        await era.print(`特大号按摩棒`); // :8377
      }
      await era.printAndWait(
        `深深的插入了${target_name}的蜜壶、破瓜之血顺着大腿流了下来………`,
      ); // :8379
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :8381
    era.set(`cflag:${target}:651`, 1); // :8381
  } else if (P == 2) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊嗯…唔…啊啊…！肛门…咦！啊…啊嗯…啊啊…啊啊——！」`,
      ); // :8385

      if (era0(`abl:${target}:3`) >= 3) {
        await era.print(`${target_name}被开发了的肛门轻易地吞下了`); // :8388
        if (era0('flag:500') == 1) {
          await era.print(`狂王的巨根`); // :8390
        } else {
          await era.print(`特大号按摩棒`); // :8392
        }
        await era.printAndWait(`、${target_name}开始发出了呻吟声。`); // :8394
        await era.printAndWait(
          `「啊啊…哈啊哈啊…啊嗯…啊啊…不、不行啊…啊啊…明明…不能有感觉…啊咦！」`,
        ); // :8395
        await era.printAndWait(
          `水晶球的影像收录了${target_name}的肛门被用各种各样的体位侵犯直到绝顶………`,
        ); // :8396
      } else {
        await era.print(`${target_name}的肛门吞下了`); // :8398
        if (era0('flag:500') == 1) {
          await era.print(`狂王的巨根`); // :8400
        } else {
          await era.print(`特大号按摩棒`); // :8402
        }
        await era.printAndWait(`、${target_name}因为强烈的苦痛而悲鸣着。`); // :8404
        await era.printAndWait(`「啊啊——…快停下…快停下啊…狂王…大人！」`); // :8405
        await era.printAndWait(
          `水晶球的影像收录了${target_name}的肛门被用各种各样的体位侵犯直到气绝………`,
        ); // :8406
      }
    } else {
      await era.printAndWait(
        `「呼哇啊啊啊…啊嗯…啊啊嗯…被狂王大人侵犯肛门好棒啊…♪」`,
      ); // :8409
      if (era0('flag:500') == 1) {
        await era.print(`狂王的巨根`); // :8411
      } else {
        await era.print(`特大号按摩棒`); // :8413
      }
      await era.printAndWait(
        `插进了${target_name}的肛门、${target_name}发出娇喘取悦着狂王………`,
      ); // :8415
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :8417
    era.set(`cflag:${target}:652`, 1); // :8417
  } else if (P == 3) {
    if (era0(`talent:${target}:136`)) {
      await era.printAndWait(
        `「啊啊嗯${heart(1)} 狗大人的肉棒…最棒了啊…啊啊啊${heart(1)}」`,
      ); // :8421
      await era.printAndWait(
        `${target_name}被周围的观众嘲笑着、沉浸在了被狗侵犯的快感里………`,
      ); // :8422
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈啊哈啊…咦…嗯…啊…啊啊…这样处置我什么的…啊…啊啊——！」`,
      ); // :8424
      await era.printAndWait(
        `${target_name}被周围的观众嘲笑着、因为被狗侵犯而流下了眼泪。`,
      ); // :8425
      await era.printAndWait(
        `水晶球的影像里，她的胎内被狗不停的大量射精直到气绝………`,
      ); // :8426
    } else {
      await era.printAndWait(
        `「处、处罚什么的、怎么这样！…啊…咦…咦——…狗的肉棒啊…啊…啊啊啊——！」`,
      ); // :8428
      await era.printAndWait(
        `狂王的亲卫队长被兽奸的样子让周围的观众们欢呼着………`,
      ); // :8429
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :8431
    era.set(`cflag:${target}:653`, 1); // :8431
  } else if (P == 4) {
    if (era0(`talent:${target}:75`) == 1) {
      await era.printAndWait(
        `「嗯吼哦哦哦哦哦${heart(1)} 小穴小穴好舒服啊${heart(1)}」`,
      ); // :8436
      await era.print(
        `虽然因为完全变成性爱狂的${target_name}而困惑着，但还是用`,
      ); // :8437
      if (era0('flag:500') == 1) {
        await era.print(`他的巨根`); // :8439
      } else {
        await era.print(`特大号按摩棒`); // :8441
      }
      await era.printAndWait(
        `不停地侵犯着${target_name}的蜜壶。然后随着抽送${target_name}发出着野兽一样的呻吟声。`,
      ); // :8443
      await era.printAndWait(
        `「哦哦哦哦吼…继续…继续侵犯我吧狂王大人啊啊——${heart(1)} 啊啊————${heart(1)}」`,
      ); // :8444
      await era.printAndWait(
        `水晶球的影像收录了${target_name}被侵犯好几个小时，最后气绝了………`,
      ); // :8445
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊…嗯…哈啊…这么…温柔的抱我抱我什么的优…我…已经…啊…啊啊！」`,
      ); // :8448
      if (era0('flag:500') == 1) {
        await era.print(`狂王的巨根`); // :8450
      } else {
        await era.print(`特大号按摩棒`); // :8452
      }
      await era.printAndWait(
        `不停的侵犯着${target_name}的蜜壶、${target_name}发出了甜美的呻吟。`,
      ); // :8454
      await era.printAndWait(
        `「哈…啊…啊啊…我…啊嗯是的…我就这样每天被魔王大人…啊嗯啊啊啊——${heart(1)}」`,
      ); // :8455
      await era.printAndWait(
        `水晶球的影像收录了${target_name}被狂王抱着、绝顶了好几次的样子………`,
      ); // :8456
    } else {
      await era.printAndWait(
        `「啊嗯啊…太、太激烈了啊、啊嗯啊…啊…呼哇啊啊啊………」`,
      ); // :8458
      if (era0('flag:500') == 1) {
        await era.print(`狂王的巨根`); // :8460
      } else {
        await era.print(`特大号按摩棒`); // :8462
      }
      await era.printAndWait(
        `不停地侵犯着${target_name}的蜜穴、${target_name}呻吟着。`,
      ); // :8464
      await era.printAndWait(
        `「啊啊用狂王大人的爱…把污秽的我净化吧…啊啊嗯啊哈啊啊啊」`,
      ); // :8465
      await era.printAndWait(
        `水晶球的影像收录了${target_name}被狂王抱着绝顶的样子………`,
      ); // :8466
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :8468
    era.set(`cflag:${target}:654`, 1); // :8468
  } else if (P == 5) {
    if (era0(`talent:${target}:75`) == 1) {
      await era.printAndWait(
        `「啊啊啊啊…肉帮肉棒好多肉棒…啊啊啊啊…继续侵犯我吧${heart(1)}」`,
      ); // :8473
      await era.printAndWait(
        `${target_name}被令人窒息的淫臭刺激着性爱狂的本能，叫喊着下流的话被侵犯着。`,
      ); // :8474
      await era.printAndWait(
        `「啊啊…啊哈…唔呼…来吧你也…你也…使用我的身体的那里都没关系呦${heart(1)}」`,
      ); // :8475
    } else if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊咕…好、激烈…！嗯…呼哇…啊啊…我要继续奉仕肉棒了啊…啊啊啊…啊嗯…啊啊嗯${heart(1)}」`,
      ); // :8477
      await era.printAndWait(
        `${target_name}一边被插着两穴，一边舔着伸出来的不知道多少根阴茎。`,
      ); // :8478
      await era.printAndWait(
        `「嗯咕唔…嗯啾…就…啾…啊咕…哈呼…嗯…不论那根肉棒都好棒啊…${heart(1)}」`,
      ); // :8479
    } else {
      await era.printAndWait(
        `「哈啊哈啊…啊嗯…啊…啊啊——！这样、这样好厉害啊♪」`,
      ); // :8481
      await era.printAndWait(
        `${target_name}的两穴被反复侵犯，黏糊糊的精液从秘裂和肛门里逆流了出来。`,
      ); // :8482
      await era.printAndWait(
        `水晶球的影像到全身被精液挂满的${target_name}的样子就完了………`,
      ); // :8483
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :8485
    era.set(`cflag:${target}:655`, 1); // :8485
  } else if (P == 6) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「我、我是背叛狂王大人、像肮脏的魔王起誓忠诚的东西…但是从今天开始我会作为大家的公共厕所献上一生………${heart(1)}」`,
      ); // :8489
      await era.printAndWait(
        `${target_name}只是因为那个台词就兴奋地咕噜咕噜的颤抖起来。然后抬高屁股像是在诱惑什么的左右摇动着。`,
      ); // :8490
      await era.printAndWait(
        `「啊啊嗯…大家的精液和小便都请尽情的撒在我身上啊…啊…啊啊万分感谢${heart(1)}」`,
      ); // :8491
      await era.printAndWait(
        `抽签抽到了诶一个的男人从后面用阴茎贯穿了${target_name}。只是这样${target_name}就发出了好像高潮了一样的声音。`,
      ); // :8492
      await era.printAndWait(
        `然后水晶球的影像一直持续到了成为了公共厕所的${target_name}吮吸精液、喝干小便全身都是脏东西的地方………`,
      ); // :8493
    } else {
      await era.printAndWait(
        `「呵呵呵、今天的我是公共厕所哦…请使用我的身体发散大家的性欲吧…♪」`,
      ); // :8495
      await era.printAndWait(
        `${target_name}舔了舔嘴唇，分开双腿诱惑着周围强壮的男人们。`,
      ); // :8496
      await era.printAndWait(
        `听说能抱原亲卫队长的${target_name}的士兵们，聚集到了${target_name}这里。`,
      ); // :8497
      await era.printAndWait(
        `然后水晶球的影像一直持续到了成为了公共厕所的${target_name}吮吸精液、喝干小便全身都是脏东西的地方………`,
      ); // :8498
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :8500
    era.set(`cflag:${target}:656`, 1); // :8500
  } else if (P == 7) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊…果然我还是忘不了狂王大人啊…魔王大人就请忘了我，用那些被称作勇者的下等女人做对手吧…嗯」`,
      ); // :8504
      await era.printAndWait(
        `${target_name}和狂王舌头缠绕在一起接吻着、就像是恋人一样。`,
      ); // :8505
      await era.printAndWait(`「啊啊…狂王大人…今天也请疼爱我吧………」`); // :8506
      await era.printAndWait(
        `然后水晶球的影像在狂王和${target_name}交合的样子持续数十分钟后唐突的关闭了………`,
      ); // :8507
    } else {
      await era.printAndWait(
        `「啊啊…我果然是狂王大人的爱人啊…心里是这么的满足♪」`,
      ); // :8509
      await era.printAndWait(
        `${target_name}笑了一下，和狂王舌头缠绕在一起接吻着、就像是恋人一样。`,
      ); // :8510
      await era.printAndWait(`「能疼爱我…谢谢您…狂王大人…♪」`); // :8511
      await era.printAndWait(
        `然后水晶球的影响在狂王和${target_name}再次接吻的地方结束了………`,
      ); // :8512
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :8514
    era.set(`cflag:${target}:657`, 1); // :8514
  } else if (P == 20) {
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      if (era0(`cflag:${target}:102`) == 1) {
        await era.printAndWait(
          `「啊啊！这孩子是魔王大人的孩子、求你了！还给我！还给我狂王大人！」`,
        ); // :8519
        await era.printAndWait(
          `看着拼命喊着的${target_name}，狂王微微一笑，把${target_name}生出来的孩子踢飞了。`,
        ); // :8520
        await era.printAndWait(`「咦！为什么、为什么要做这种事！」`); // :8521
      } else {
        await era.printAndWait(
          `「啊啊啊…我、我的出产秀怎么样啊魔王大人${heart(1)}」`,
        ); // :8523
        await era.printAndWait(`${target_name}通过镜头向${player_name}说道。`); // :8524
        await era.printAndWait(
          `「接下来也…会被狂王大人不停的播种，多多的生孩子出来哦${heart(1)}」`,
        ); // :8525
      }
    } else {
      await era.printAndWait(`${target_name}通过镜头向${player_name}说道。`); // :8528
      await era.printAndWait(`「哈…咦、我的肚子是啊…魔王大人的玩具啊♪」`); // :8529
      await era.printAndWait(
        `${target_name}被狂王在耳边说了什么，继续开始说道。`,
      ); // :8530
      await era.printAndWait(
        `「今后也会为狂王大人不停地怀孕，多多的生孩子出来的～♪」`,
      ); // :8531
    }
  }

  return 0;
}

/**
 * @EXUCUTION_KOUJO_K7（:8539-8555）：处刑口上。TFLAG:16 四档，均无头部守卫。
 * @returns {Promise<number>} 0（源无显式 RETURN，隐式落空）
 */
async function exucution_koujo_k7() {
  if (era0('tflag:16') == 4) {
    await era.printAndWait(
      `「肉、肉便器？…我、我…要为怪物一直生孩子到死为止？…不、不要…放开我！我不要那样啊啊啊啊！」`,
    ); // :8543
  } else if (era0('tflag:16') == 5) {
    await era.printAndWait(`「下达命令…主人………」`); // :8546
  } else if (era0('tflag:16') == 6) {
    await era.printAndWait(`「我居然被怪物们当做慰安妇………」`); // :8549
  } else if (era0('tflag:16') == 7) {
    await era.printAndWait(''); // :8552-8555
  }
  return 0;
}

/**
 * @MUSEUM_KOUJO_K7（:8556-8590）：博物馆展示口上。TFLAG:500 十档。
 * **:8565 的 `TFLAG:500 == 2`（蝋人形化）源侧误写成与 :8559 相同的
 * `== 0`**，该臂因此永不可达（IF/ELSEIF 链首条命中即短路）——1:1 保留，
 * 不改判据。
 * @returns {Promise<number>} 0
 */
async function museum_koujo_k7() {
  if (era0('tflag:500') == 0) {
    await era.printAndWait(
      `「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…啊………」`,
    ); // :8560
  } else if (era0('tflag:500') == 1) {
    await era.printAndWait(
      `「要把活着的我制作成标本…？不、不要…请停止…不要啊啊啊啊！」`,
    ); // :8563
  } else if (era0('tflag:500') == 0) {
    // :8565-8567 源误写 == 0（原意 == 2，蝋人形化），死分支 1:1 保留
    await era.printAndWait(''); // :8566-8567
  } else if (era0('tflag:500') == 3) {
    await era.printAndWait(''); // :8569-8570
  } else if (era0('tflag:500') == 4) {
    await era.printAndWait(''); // :8572-8573
  } else if (era0('tflag:500') == 5) {
    await era.printAndWait(''); // :8575-8576
  } else if (era0('tflag:500') == 6) {
    await era.printAndWait(''); // :8578-8579
  } else if (era0('tflag:500') == 7) {
    await era.printAndWait(''); // :8581-8582
  } else if (era0('tflag:500') == 8) {
    await era.printAndWait(''); // :8584-8585
  } else if (era0('tflag:500') == 9) {
    await era.printAndWait(''); // :8587-8590
  }
  return 0;
}

/**
 * @BANISHMENT_KOUJO_K7（:8591-8615）：流放口上。TFLAG:510 五档。
 * @returns {Promise<number>} 0
 */
async function banishment_koujo_k7() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%

  if (era0('tflag:510') == 0) {
    await era.printAndWait(`「回不去了…狂王大人那里…已经回不去了………」`); // :8596
    await era.printAndWait(`失去了力量${target_name}之后去了哪里谁也不知道。`); // :8597
    await era.printAndWait(
      `有一种说法是边乞讨边流浪、最后乘着船在一次暴风雨中遇难了。`,
    ); // :8598
    await era.printAndWait(
      `还有一个说法是根本没有被流放、给魔王做了一辈子小杂活。`,
    ); // :8599
    await era.printAndWait(
      `无论如何${target_name}在那以后都没有再出现在历史舞台上………`,
    ); // :8600
  } else if (era0('tflag:510') == 1) {
    await era.printAndWait(''); // :8603-8604
  } else if (era0('tflag:510') == 2) {
    await era.printAndWait(''); // :8606-8607
  } else if (era0('tflag:510') == 3) {
    await era.printAndWait(''); // :8609-8610
  } else if (era0('tflag:510') == 4) {
    await era.printAndWait(''); // :8612-8615
  }
  return 0;
}

/**
 * @PUBLIC_EXUCUTION_KOUJO_K7（:8616-8630）：公开处刑口上。TFLAG:520 三档。
 * @returns {Promise<number>} 0
 */
async function public_exucution_koujo_k7() {
  if (era0('tflag:520') == 0) {
    await era.printAndWait(
      `「嘎咕…老实说…咳咳咳…牙齿被打折断…脸的形状…变得很奇怪啊…咕呜…咕呜」`,
    ); // :8621
  } else if (era0('tflag:520') == 1) {
    await era.printAndWait(`「这里…这个绞刑台是我最后的舞台吗…」`); // :8624
  } else if (era0('tflag:520') == 2) {
    await era.printAndWait(''); // :8627-8630
  }
  return 0;
}

/**
 * @GROTESQUE_KOUJO_K7（:8631-8657）：猎奇口上。TFLAG:530 七档，源全空。
 * @returns {Promise<number>} 0
 */
async function grotesque_koujo_k7() {
  if (era0('tflag:530') == 0) {
    await era.printAndWait(''); // :8636-8637
  } else if (era0('tflag:530') == 1) {
    await era.printAndWait(''); // :8639-8640
  } else if (era0('tflag:530') == 2) {
    await era.printAndWait(''); // :8642-8643
  } else if (era0('tflag:530') == 3) {
    await era.printAndWait(''); // :8645-8646
  } else if (era0('tflag:530') == 4) {
    await era.printAndWait(''); // :8648-8649
  } else if (era0('tflag:530') == 5) {
    await era.printAndWait(''); // :8651-8652
  } else if (era0('tflag:530') == 6) {
    await era.printAndWait(''); // :8654-8657
  }
  return 0;
}

/**
 * @ENTERENEMY_KOUJO_K7（:8658-8671）：来袭口上。角色即 A（同 BENKI_KOUJO_K7
 * 的 `TARGET = A` 先例）。
 * @returns {Promise<number>} 0
 */
async function enterenemy_koujo_k7() {
  const target = era_flag.target;
  const a = target;

  if (era0(`talent:${a}:76`) == 1) {
    await era.printAndWait(`「想被怪物们轮奸一下呢～♪」`); // :8663
  } else if (era0(`talent:${a}:85`) == 1) {
    await era.printAndWait(
      `「啊啊…魔王大人。现、现在就去见你了.....${heart(1)}」`,
    ); // :8666
  } else {
    await era.printAndWait(`「一开始就派我讨伐魔王就好了！」`); // :8668
  }
}

/**
 * @GOHOUBI_REQUEST_KOUJO_K7（:8672-8714）：迎击奖励请求口上。角色即 A，
 * 由 gohoubi_request_koujo_family 分派时以 `cid` 注入（K1
 * gohoubi_request_koujo_k1(cid) 同款先例）。CFLAG:A:504 十档，无头部守卫。
 * @param {number} cid 请求奖励的角色 ID（原作全局单字母变量 A）
 * @returns {Promise<number>} undefined（源无 RETURN，调用方 whenMissing 兜底）
 */
async function gohoubi_request_koujo_k7(cid) {
  const cid_name = chara_callname(cid); // %SAVESTR:A%

  if (era0(`cflag:${cid}:504`) == 0) {
    await era.printAndWait(`「说道奖励当然想要钱了」`); // :8677
  } else if (
    era0(`cflag:${cid}:504`) == 1 ||
    era0(`cflag:${cid}:504`) == 2 ||
    era0(`cflag:${cid}:504`) == 3
  ) {
    await era.print(`「奖励？　我想尝试和`); // :8680
    if (era0(`cflag:${cid}:504`) == 1) {
      await era.print(`犬`); // :8682
    } else if (era0(`cflag:${cid}:504`) == 2) {
      await era.print(`豚`); // :8684
    } else if (era0(`cflag:${cid}:504`) == 3) {
      await era.print(`马`); // :8686
    }
    await era.printAndWait(`性交看看」`); // :8688
    await era.printAndWait(`${cid_name}要求了兽奸的奖励`); // :8689
  } else if (era0(`cflag:${cid}:504`) == 4) {
    await era.printAndWait(`「和我接吻的约定、我就有动力了哦」`); // :8692
  } else if (era0(`cflag:${cid}:504`) == 5) {
    await era.printAndWait(`「奖励我想和魔王大人做爱呢」`); // :8695
  } else if (era0(`cflag:${cid}:504`) == 6) {
    await era.printAndWait(`「魔王大人的精液想喝~~♪」`); // :8698
    await era.printAndWait(`${cid_name}要求你的精液做报酬`); // :8699
  } else if (era0(`cflag:${cid}:504`) == 7) {
    await era.printAndWait(`「想和各种各样不同的魔物开一场性交派对呢！」`); // :8702
    await era.printAndWait(`${cid_name}要求了乱交的报酬`); // :8703
  } else if (era0(`cflag:${cid}:504`) == 8) {
    await era.printAndWait(`「尿液…魔王大人的尿液想喝」`); // :8706
    await era.printAndWait(`${cid_name}要求了尿液做报酬`); // :8707
  } else if (era0(`cflag:${cid}:504`) == 9) {
    await era.printAndWait(`「偶尔也想享受一下童贞」`); // :8710
    await era.printAndWait(`${cid_name}要求了童贞狩猎作为奖励`); // :8711
  }
}

/**
 * @GOHOUBI_AFTER_KOUJO_K7（:8715-8792）：迎击奖励结算后口上。
 * **TFLAG:18 改经 choice 参数传递**（kojo-dungeon-after.js 头注裁定，
 * TFLAG:18 在调教外是本链专用的奖惩选择序号，ere 侧无该写入通道）。
 * choice 0=放置PLAY/1=勲章授与/2=按 CFLAG:A:504 十档分岔。
 * @param {number} cid 角色 ID（原作全局 A）
 * @param {number} choice 奖赏选择序号（原作 TFLAG:18）
 * @returns {Promise<number>} undefined（源无 RETURN）
 */
async function gohoubi_after_koujo_k7(cid, choice) {
  if (choice == 0) {
    await era.printAndWait(`「如此也要继续努力…！」`); // :8722
  } else if (choice == 1) {
    await era.printAndWait(`「收集勋章能换到什么吗？」`); // :8725
  } else if (choice == 2) {
    if (era0(`cflag:${cid}:504`) == 0) {
      await era.printAndWait(`「用钱把房间装饰的漂漂亮亮的」`); // :8729
    } else if (era0(`cflag:${cid}:504`) == 1) {
      if (era0(`talent:${cid}:0`) == 1) {
        await era.printAndWait(`「啊啊嗯，狗狗还是插屁股最爽了${heart(1)}」`); // :8734
      } else {
        await era.printAndWait(`「啊啊嗯，和狗做爱最棒了${heart(1)}」`); // :8736
      }
    } else if (era0(`cflag:${cid}:504`) == 2) {
      if (era0(`talent:${cid}:0`) == 1) {
        await era.printAndWait(`「啊啊嗯，被猪插屁眼好爽${heart(1)}」`); // :8742
      } else {
        await era.printAndWait(`「啊呼呼~和猪性交真是太棒了${heart(1)}」`); // :8744
      }
    } else if (era0(`cflag:${cid}:504`) == 3) {
      if (era0(`talent:${cid}:0`) == 1) {
        await era.printAndWait(`「啊啊啊，马的大阴茎真是太爽了${heart(1)}」`); // :8750
      } else {
        await era.printAndWait(`「噢噢哦♪和马做爱真是太爽了${heart(1)}」`); // :8752
      }
    } else if (era0(`cflag:${cid}:504`) == 4) {
      await era.printAndWait(
        `「呼呼${heart(1)} 魔王大人的吻最棒了、还想再要呢♪」`,
      ); // :8756
    } else if (era0(`cflag:${cid}:504`) == 5) {
      if (era0(`abl:${cid}:2`) > era0(`abl:${cid}:3`)) {
        await era.printAndWait(
          `「啊嗯，嗯呼${heart(1)} 啊嗯！更…再温柔一点！好爽！真是太爽了${heart(1)}」`,
        ); // :8761
      } else {
        await era.printAndWait(
          `「啊呜啊啊${heart(1)} 哼！再温柔一点…嗯哼！肛门被张开了${heart(1)} 太棒了！真是太棒了${heart(1)}」`,
        ); // :8764
      }
    } else if (era0(`cflag:${cid}:504`) == 6) {
      await era.printAndWait(
        `「现在喝到的美味是葡萄酒也比不上的呐、魔王大人的精液${heart(1)}」`,
      ); // :8768
    } else if (era0(`cflag:${cid}:504`) == 7) {
      if (era0(`talent:${cid}:0`) == 1) {
        await era.printAndWait(
          `「啊啊…能举办这样的淫乱宴会，果然成为魔王大人的下仆是正确的选择呢${heart(1)}」`,
        ); // :8773
      } else {
        await era.printAndWait(
          `「啊啊…能举办这样的淫乱宴会，果然成为魔王大人的下仆是正确的选择呢${heart(1)}」`,
        ); // :8775
      }
    } else if (era0(`cflag:${cid}:504`) == 8) {
      await era.printAndWait(
        `「现在喝到的美味是葡萄酒也比不上的呐、魔王大人的尿液${heart(1)}」`,
      ); // :8779
    } else if (era0(`cflag:${cid}:504`) == 9) {
      if (era0(`abl:${cid}:2`) > era0(`abl:${cid}:3`)) {
        await era.printAndWait(
          `「啊哈哈啊…真是让女人们哭泣的巨大肉棒呢、来吧${heart(1)}」`,
        ); // :8784
      } else {
        await era.printAndWait(`「来用我的肛门小穴让你毕业童贞哦${heart(1)}」`); // :8787
      }
    } else {
      // ELSE 无内容，ENDIF 直接跟上（源 :8781-8790，1:1 保留原作空分支）
    }
  }
}

/**
 * @OSIOKI_KOUJO_K7（:8793-8857）：迎击惩罚结算后口上。TFLAG:18 同款改经
 * choice 参数传递（见 gohoubi_after_koujo_k7 头注、kojo-dungeon-after.js
 * 头注裁定）。choice 0-9 十档。
 * @param {number} cid 角色 ID（原作全局 A）
 * @param {number} choice 处罚选择序号（原作 TFLAG:18）
 * @returns {Promise<number>} undefined（源无 RETURN）
 */
async function osioki_koujo_k7(cid, choice) {
  if (choice == 0) {
    await era.printAndWait(`「诶、请让我回监牢里去」`); // :8800
  } else if (choice == 1) {
    if (era0(`abl:${cid}:21`) >= 3) {
      await era.printAndWait(`「噢啊哦嗷嗷！噼里啪啦的要晕过去了${heart(1)}」`); // :8805
    } else {
      await era.printAndWait(
        `「不、不要啊！这么高的电压会死的！呜嗷！咿咿呀呀！」`,
      ); // :8807
    }
  } else if (choice == 2) {
    if (era0(`abl:${cid}:17`) >= 4) {
      await era.printAndWait(
        `「公开自慰最棒啦啊啊啊${heart(1)} 想看的话靠得更近一点也可以哦♪」`,
      ); // :8813
    } else {
      await era.printAndWait(`「真是…屈辱啊…」`); // :8815
    }
  } else if (choice == 3) {
    if (era0(`abl:${cid}:17`) >= 6) {
      await era.printAndWait(`「啊哈呼…被看到了、被人看着在…啊啊${heart(1)}」`); // :8821
    } else {
      await era.printAndWait(
        `「咕呜…为什么，为什么要让我做这种事…？咿呀啊啊啊………」`,
      ); // :8823
    }
  } else if (choice == 4) {
    if (era0(`abl:${cid}:21`) >= 3) {
      await era.printAndWait(
        `「啊啊嗯！快用鞭子！狠狠的、无情的更多的惩罚我吧，惩罚我吧！」`,
      ); // :8829
    } else {
      await era.printAndWait(`「咕！啊咕啊！请、请您原谅我吧！啊啊！」`); // :8831
    }
  } else if (choice == 5) {
    if (era0(`talent:${cid}:88`) == 1 || era0(`talent:${cid}:76`) == 1) {
      await era.printAndWait(`「啊咕噜咕嘟咕嘟…小便的味道好好啊${heart(1)}」`); // :8837
    } else {
      await era.printAndWait(`「已经够了…请停下来吧…请您停下来吧………」`); // :8839
    }
  } else if (choice == 6) {
    await era.printAndWait(`「好臭啊………」`); // :8843
  } else if (choice == 7) {
    await era.printAndWait(`「肚子饿得前胸贴后背啦………」`); // :8846
  } else if (choice == 8) {
    await era.printAndWait(
      `「呼啊…呼啊…拜托了、我都这样张开双腿邀请你们了、不要装作看不见啊呜呜…呜」`,
    ); // :8849
    await era.printAndWait(
      `「啊啊！拜托了！快回来！随便谁都行不要抛下我啊！」`,
    ); // :8850
  } else if (choice == 9) {
    await era.printAndWait(`「下次一定～」`); // :8853
  }
}

/**
 * @GOBI_KOUJO_K7（:8858-8890）：语尾口上。ARG:0 取 1-5 五档固定语尾，
 * 其余随机三选一。
 * @param {number} arg0 语尾编号（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<number>} undefined（源无 RETURN）
 */
async function gobi_koujo_k7(arg0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_0 = arg0;

  if (arg_0 == 1) {
    await era.print(`哇~${heart(1)}`); // :8863
  } else if (arg_0 == 2) {
    await era.print(`什么啊！`); // :8866
  } else if (arg_0 == 3) {
    await era.print(`哦……。`); // :8869
  } else if (arg_0 == 4) {
    await era.print(`真是……唉。`); // :8872
  } else if (arg_0 == 5) {
    await era.print(`唉……。`); // :8875
  } else {
    if (rand_n(3) == 0) {
      await era.print(`哦。`); // :8880
    } else if (rand_n(2) == 0) {
      await era.print(`啊。`); // :8882
    } else {
      await era.print(`没办法了。`); // :8884
    }
  }
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_7 的等价物；重复注册抛错）
kojo_message_com_family.register(7, kojo_message_com_7);
self_kojo_family.register(7, self_kojo_k7);
kojo_message_palamcng_family.register(7, kojo_message_palamcng_7);
kojo_message_markcng_family.register(7, kojo_message_markcng_7);
gohoubi_after_koujo_family.register(7, gohoubi_after_koujo_k7);
osioski_koujo_family.register(7, osioki_koujo_k7);
gohoubi_request_koujo_family.register(7, gohoubi_request_koujo_k7);
ryouzyoku_kojo_family.register(7, dungeon_ryouzyoku_k7);
ryouzyoku_after_kojo_family.register(7, dungeon_ryouzyoku_after_k7);
gobi_koujo_family.register(7, gobi_koujo_k7);
benki_koujo_family.register(7, benki_koujo_k7);
enterenemy_koujo_family.register(7, enterenemy_koujo_k7);
dungeon_victory_family.register(7, dungeon_victory_k7);
dungeon_attack_family.register(7, dungeon_attack_k7);
ntr_koujo_family.register(7, ntr_koujo_k7);
exucution_koujo_family.register(7, exucution_koujo_k7);
museum_koujo_family.register(7, museum_koujo_k7);
banishment_koujo_family.register(7, banishment_koujo_k7);
public_exucution_koujo_family.register(7, public_exucution_koujo_k7);
grotesque_koujo_family.register(7, grotesque_koujo_k7);

module.exports = {
  STUBBED_CALLS,
  kojo_message_com_7,
  dog_kojo_7,
  colosseum_kojo_7,
  k7_kojo2,
  self_kojo_k7,
  kojo_message_palamcng_7,
  kojo_message_markcng_7,
  dungeon_ryouzyoku_k7,
  dungeon_ryouzyoku_after_k7,
  benki_koujo_k7,
  dungeon_victory_k7,
  dungeon_attack_k7,
  ntr_koujo_k7,
  exucution_koujo_k7,
  museum_koujo_k7,
  banishment_koujo_k7,
  public_exucution_koujo_k7,
  grotesque_koujo_k7,
  enterenemy_koujo_k7,
  gohoubi_request_koujo_k7,
  gohoubi_after_koujo_k7,
  osioki_koujo_k7,
  gobi_koujo_k7,
};
