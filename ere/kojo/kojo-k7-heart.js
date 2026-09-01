/* eslint-disable no-irregular-whitespace */
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
} = require('#/kojo/kojo-system');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;
/** RAND:N 的默认随机源（本文件的 on() 事件处理器不经分发注入 rand） */
const rand_n = (n) => Math.floor(Math.random() * n);

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
    await era.printAndWait(
      `「又来了啊…像这样和我见面…嗯，已经${era0(`cflag:${target}:10`)}次了呢」`,
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
    await era.print(''); // :273
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
        await era.printAndWait(
          `「呼…${era_flag.time === 0 ? '今日' : '今夜'}${assi_name}来和我一起玩3p吗？」`,
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
        await era.printAndWait(
          `「哎呀、${era_flag.time === 0 ? '今日' : '今夜'}是三个人一起享受吧${heart(1)}」`,
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
        await era.printAndWait(
          `「${era_flag.time === 0 ? '今日' : '今夜'}既然你被魔王大人疼爱着的话…嘛，也罢、没关系………」`,
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
        await era.printAndWait(
          rand_n(2) === 0
            ? `${target_name}四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。`
            : `${target_name}躺在地上分开大腿，用手指插进小穴和肛门狠狠的搅动着、引诱着${player_name}和${assi_name}。`,
        ); // :569（RAND:2 三目：整句二选一）
        await era.printAndWait(
          `『啊魔王大人…${era_flag.time === 0 ? '今日' : '今夜'}${target_name}队长的${rand_n(2) === 0 ? '菊花' : '小穴'}就让我侵犯吧♪』`,
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
        await era.printAndWait(
          `${target_name}穿着红色的兔女郎装${era_flag.time === 0 ? '今日' : '今夜'}进行侍奉。`,
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
        await era.printAndWait(
          `「啊…我的魔王大人、${era_flag.time === 0 ? '今日' : '今宵'}也和往常一样来了啊…」`,
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
        await era.printAndWait(
          `「啊…我的魔王大人、${era_flag.time === 0 ? '今日' : '今宵'}也和往常一样来了啊…」`,
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
