// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k7-heart.mjs（issue #238）

export const FILES = [
  {
    js: 'ere/kojo/kojo-k7-heart.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '62-65',
        any: [/@EVENTTRAIN/],
      }, // @EVENTTRAIN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '64',
        any: [/FLAG:107 = 1/],
      }, // FLAG:107 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '65-66',
        any: [/FLAG:7 = 2/],
      }, // FLAG:7 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '68-69',
        any: [/@EVENTEND/],
      }, // @EVENTEND
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '69',
        any: [/#LATER/],
      }, // #LATER
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '75-588',
        any: [/@EVENTTRAIN/],
      }, // @EVENTTRAIN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '76-77',
        any: [/SIF FLAG:7 <= 0/],
      }, // SIF FLAG:7 <= 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '78-79',
        any: [/SIF TALENT:167 != 1/],
      }, // SIF TALENT:167 != 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '83-119',
        any: [/DRAWLINE/],
      }, // DRAWLINE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '84',
        any: [/DRAWLINE/],
      }, // DRAWLINE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '87',
        any: [/PRINTFORMW 「呵、呵呵…嘛、就算变成了魔族，我也不会认输的………」/],
      }, // PRINTFORMW 「呵、呵呵…嘛、就算变成了魔族，我也不会认输的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '88',
        any: [/PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%更容易沦陷，把她扔进实验室进行了魔族化的改造。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '89',
        any: [/PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受到了难以置信的打击。/],
      }, // PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '90',
        any: [/PRINTFORMW 「哈、啊，混账魔王！啊、啊啊啊啊！一声招呼也不打就对我做出这种可恨的事情！你一定会后悔的！」/],
      }, // PRINTFORMW 「哈、啊，混账魔王！啊、啊啊啊啊！一声招呼也不打就对我做出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '91',
        any: [/PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴~%SAVESTR:TARGET%的情绪和反应都基本上在预料中、改造完全成功了。/],
      }, // PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴~
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '92',
        any: [/PRINTFORMW 「什、什么啊！你在盯着看什么呢\.\.\.？真让人恶心！离我远一点，不要靠近我…！」/],
      }, // PRINTFORMW 「什、什么啊！你在盯着看什么呢...？真让人恶心！离我远一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '93',
        any: [/CFLAG:201 = 1/],
      }, // CFLAG:201 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '95',
        any: [/CFLAG:370 = 1/],
      }, // CFLAG:370 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '98',
        any: [/PRINTFORMW 「啊啦啊啦、终于来见我了吗？魔王」/],
      }, // PRINTFORMW 「啊啦啊啦、终于来见我了吗？魔王」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '99',
        any: [/PRINTFORMW %SAVESTR:TARGET%轻哼一声，带着不屑从被窝里爬起来/],
      }, // PRINTFORMW %SAVESTR:TARGET%轻哼一声，带着不屑从被窝里
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '100',
        any: [/PRINTFORMW 抓到她后都不让她洗澡、所以看起来有点脏兮兮的。尽管如此，漂亮的金发也让人感到美丽，这昏暗的监狱甚至也让人感到了高贵。闪闪发亮的眼中显示出坚定的目光，看向%SAVESTR:PLAYER%。/],
      }, // PRINTFORMW 抓到她后都不让她洗澡、所以看起来有点脏兮兮的。尽管如此，漂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '101',
        any: [/PRINTFORMW 「关于你抓到的那些勇者变成什么样…以前只是听说过一些传闻罢了」/],
      }, // PRINTFORMW 「关于你抓到的那些勇者变成什么样…以前只是听说过一些传闻罢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '102',
        any: [/PRINTFORMW 「而实际上变成什么样子了…现在也亲眼确认了」/],
      }, // PRINTFORMW 「而实际上变成什么样子了…现在也亲眼确认了」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '103',
        any: [/PRINTFORMW 是在说抓住%SAVESTR:TARGET%的%SAVESTR:PLAYER%的下仆的勇者的事吧、然后%SAVESTR:TARGET%吞了吞口水。吞口水的声音连这边都能听得到。/],
      }, // PRINTFORMW 是在说抓住%SAVESTR:TARGET%的%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '104',
        any: [/PRINTFORMW %SAVESTR:TARGET%深深吸了一口气，用呼喊般的口气，对%SAVESTR:PLAYER%大声的宣告了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%深深吸了一口气，用呼喊般的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '105',
        any: [/PRINTFORMW 「如果觉得吾像是那种…奴隷…最低级的家伙、被消遣的那种差劲的东西，那就大错特错了！我绝对不会向你屈服的！」/],
      }, // PRINTFORMW 「如果觉得吾像是那种…奴隷…最低级的家伙、被消遣的那种差劲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '106',
        any: [/PRINTFORMW 思量着方才刺耳的宣言。%SAVESTR:PLAYER%皱起了眉头。而%SAVESTR:TARGET%露出一副满不在乎的神气样子。/],
      }, // PRINTFORMW 思量着方才刺耳的宣言。%SAVESTR:PLAYER%皱起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '107',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '108',
        any: [/PRINTFORMW 然而过去也有数不清的勇者说过这句话，%SAVESTR:PLAYER%感到了强烈的即视感。/],
      }, // PRINTFORMW 然而过去也有数不清的勇者说过这句话，%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '109',
        any: [/PRINTFORMW %SAVESTR:TARGET%这个小妞还想负隅顽抗、%SAVESTR:PLAYER%可以大展身手随心所欲的用自己喜欢的方法开发了，她的命运已经被决定了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%这个小妞还想负隅顽抗、%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '110',
        any: [/PRINTFORMW 考虑着那样的事%SAVESTR:PLAYER%的嘴角露出了愉悦的笑容。调教开始………/],
      }, // PRINTFORMW 考虑着那样的事%SAVESTR:PLAYER%的嘴角露出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '112',
        any: [/CFLAG:201 = 1/],
      }, // CFLAG:201 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '113',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '114',
        any: [/PRINTFORMW 话说回来%SAVESTR:TARGET%的人物简介那里似乎写着「初体験的对象：狂王」的样子。/],
      }, // PRINTFORMW 话说回来%SAVESTR:TARGET%的人物简介那里似乎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '115',
        any: [/PRINTFORMW 关于这一点，经过盘问和暗访后得知，她好像是狂王的爱人。/],
      }, // PRINTFORMW 关于这一点，经过盘问和暗访后得知，她好像是狂王的爱人。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '116',
        any: [/PRINTFORMW 这真是越来越让人感到愉悦了、把狂王的东西夺走竭尽凌辱，只是想象一下就感觉心中雀跃不已。/],
      }, // PRINTFORMW 这真是越来越让人感到愉悦了、把狂王的东西夺走竭尽凌辱，只是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '117',
        any: [/PRINTFORMW 夺走那颗心让她变成自己的爱人、或者叫怪物去侵袭她，让她怀上野兽的孩子也不错吧。/],
      }, // PRINTFORMW 夺走那颗心让她变成自己的爱人、或者叫怪物去侵袭她，让她怀上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '118',
        any: [/PRINTFORMW 索性把狂王的恋人给变成只会享乐的母猪，这样也蛮不错的………/],
      }, // PRINTFORMW 索性把狂王的恋人给变成只会享乐的母猪，这样也蛮不错的………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '119',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '124',
        any: [/PRINTFORMW 「竟然…竟然把我变成魔族什么的！」/],
      }, // PRINTFORMW 「竟然…竟然把我变成魔族什么的！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '125',
        any: [/PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%方便陷落，把她推进实验室进行了魔族化改造。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '126',
        any: [/PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受到了难以置信的打击。/],
      }, // PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '127',
        any: [/PRINTFORMW 「把我变成肮脏的魔族会让你感到满足？差劲！那个恶心的笑…真让人厌恶」/],
      }, // PRINTFORMW 「把我变成肮脏的魔族会让你感到满足？差劲！那个恶心的笑…真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '128',
        any: [/PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴%SAVESTR:TARGET%的情绪和反应基本上在预料中、改造完全成功了。/],
      }, // PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '129',
        any: [/PRINTFORMW 「啊…要是这种姿态被狂王大人看见的话…已经想去死了啦………！」/],
      }, // PRINTFORMW 「啊…要是这种姿态被狂王大人看见的话…已经想去死了啦………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '130',
        any: [/PRINTFORMW 令人吃惊%SAVESTR:TARGET%好像还有逃出去的意志和企图。%SAVESTR:PLAYER%似乎感到很有趣，带着微笑开始了调教………/],
      }, // PRINTFORMW 令人吃惊%SAVESTR:TARGET%好像还有逃出去的意
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '132',
        any: [/CFLAG:370 = 2/],
      }, // CFLAG:370 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '133',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '139',
        any: [/DRAWLINE/],
      }, // DRAWLINE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '142',
        any: [/PRINTFORMW 「啊、魔王大人…哇、我…又像以前那样对您刀剑相向了啊…您、请您原谅…」/],
      }, // PRINTFORMW 「啊、魔王大人…哇、我…又像以前那样对您刀剑相向了啊…您、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '143',
        any: [/PRINTFORMW %SAVESTR:TARGET%把头贴在地面上下跪请罪/],
      }, // PRINTFORMW %SAVESTR:TARGET%把头贴在地面上下跪请罪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '144',
        any: [/PRINTFORMW 「不仅是这样，身体也又接受了狂王…那样…那样的事情…对不起、对不起………」/],
      }, // PRINTFORMW 「不仅是这样，身体也又接受了狂王…那样…那样的事情…对不起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '145',
        any: [/PRINTFORMW 不停地道歉，非常惶恐。只是把手放在%SAVESTR:TARGET%的肩上，也吓得她身躯一震。/],
      }, // PRINTFORMW 不停地道歉，非常惶恐。只是把手放在%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '146',
        any: [/PRINTFORMW 「您、您能原谅我吗！………万分感谢！万分感谢！」/],
      }, // PRINTFORMW 「您、您能原谅我吗！………万分感谢！万分感谢！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '147',
        any: [/PRINTFORMW %SAVESTR:TARGET%抬起头，涕泪涟涟把美丽的脸庞都弄难看了。%SAVESTR:PLAYER%一边苦笑着一边帮她拭去脸上的脏污。/],
      }, // PRINTFORMW %SAVESTR:TARGET%抬起头，涕泪涟涟把美丽的脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '148',
        any: [/PRINTFORMW 不过因为全身上下都是狂王遗留的秽物，%SAVESTR:TARGET%身体的清洗是必须要做的………/],
      }, // PRINTFORMW 不过因为全身上下都是狂王遗留的秽物，%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '150',
        any: [/CFLAG:650 = 0/],
      }, // CFLAG:650 = 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '153',
        any: [/PRINTFORMW 「啊呼…嗨嗨、魔王大人啊…我回来了哦♪」/],
      }, // PRINTFORMW 「啊呼…嗨嗨、魔王大人啊…我回来了哦♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '154',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边打着呵欠，一边冲%SAVESTR:PLAYER%随意的打着招呼、毫不客气。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边打着呵欠，一边冲%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '155',
        any: [/PRINTFORMW 「我还被魔王大人宠爱着嘛~~？」/],
      }, // PRINTFORMW 「我还被魔王大人宠爱着嘛~~？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '156',
        any: [/PRINTFORMW 明明整个身体都被狂王狠狠的侵犯凌辱了，还对着%SAVESTR:PLAYER%扭捏献媚。让%SAVESTR:PLAYER%不由得叹了口气。/],
      }, // PRINTFORMW 明明整个身体都被狂王狠狠的侵犯凌辱了，还对着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '157',
        any: [/PRINTFORMW 「现在我又变回魔王大人的专用小穴奴隶啦\.\.\.像以前那样侵犯我吧~%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「现在我又变回魔王大人的专用小穴奴隶啦...像以前那样侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '159',
        any: [/CFLAG:650 = 0/],
      }, // CFLAG:650 = 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '161',
        any: [/PRINTFORMW 「哈啊…又被你抓住了啊、真是失策………诶？你看了那个水晶球？」/],
      }, // PRINTFORMW 「哈啊…又被你抓住了啊、真是失策………诶？你看了那个水晶球
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '162',
        any: [/PRINTFORMW %SAVESTR:TARGET%的脸唰的红了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸唰的红了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '163',
        any: [/PRINTFORMW 「嘛！嘛！怎么回事嘛！明明约定说不会让别人看见那个水晶球的内容！」/],
      }, // PRINTFORMW 「嘛！嘛！怎么回事嘛！明明约定说不会让别人看见那个水晶球的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '164',
        any: [/PRINTFORMW 「………哎呀、你那个表情是什么嘛？在抱怨我和狂王大人“爱的记忆”吗？哎呀、要惩罚我吗…」/],
      }, // PRINTFORMW 「………哎呀、你那个表情是什么嘛？在抱怨我和狂王大人“爱的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '165',
        any: [/PRINTFORMW %SAVESTR:TARGET%难为情的开始了调教………/],
      }, // PRINTFORMW %SAVESTR:TARGET%难为情的开始了调教………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '167',
        any: [/CFLAG:650 = 0/],
      }, // CFLAG:650 = 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '169',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '176',
        any: [/PRINTFORMW 「呵呵…你的手段差劲透了…真叫人失望」/],
      }, // PRINTFORMW 「呵呵…你的手段差劲透了…真叫人失望」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '177',
        any: [/PRINTFORMW 虽然在上次调教受到了屈辱的对待，不过%SAVESTR:TARGET%比想象中的更能忍受嘛。/],
      }, // PRINTFORMW 虽然在上次调教受到了屈辱的对待，不过%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '178',
        any: [/PRINTFORMW 「和狂王大人的技术没得比啦、你」/],
      }, // PRINTFORMW 「和狂王大人的技术没得比啦、你」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '179',
        any: [/PRINTFORMW 时间还有的是、为了让这个小妞更屈服，继续调教吧………/],
      }, // PRINTFORMW 时间还有的是、为了让这个小妞更屈服，继续调教吧………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '180',
        any: [/CFLAG:201 = 2/],
      }, // CFLAG:201 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '181',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '186',
        any: [/PRINTFORMW 「呵呵…又来了…调教我就让你那么乐在其中吗？」/],
      }, // PRINTFORMW 「呵呵…又来了…调教我就让你那么乐在其中吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '187',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出厌烦的样子皱着眉，瞪着%SAVESTR:PLAYER%/],
      }, // PRINTFORMW %SAVESTR:TARGET%露出厌烦的样子皱着眉，瞪着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '188',
        any: [/PRINTFORMW ”上次的调教，好像有谁很不成体统呢”，在%SAVESTR:TARGET%耳边低声私语，她的脸唰的红了。/],
      }, // PRINTFORMW ”上次的调教，好像有谁很不成体统呢”，在%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '189',
        any: [/PRINTFORMW 「呼、你在开玩笑吧！和你做那种事只会感觉到恶心而已！」/],
      }, // PRINTFORMW 「呼、你在开玩笑吧！和你做那种事只会感觉到恶心而已！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '190',
        any: [/PRINTFORMW 「啊啊啊…真想早点从这里逃走，回到狂王大人温暖的怀抱里去，那才叫心情舒畅！」」/],
      }, // PRINTFORMW 「啊啊啊…真想早点从这里逃走，回到狂王大人温暖的怀抱里去，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '191',
        any: [/CFLAG:201 = 3/],
      }, // CFLAG:201 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '192',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '197',
        any: [/PRINTFORMW 「不要…已、已经不想再来这里了………」/],
      }, // PRINTFORMW 「不要…已、已经不想再来这里了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '198',
        any: [/PRINTFORMW %SAVESTR:TARGET%面容十分憔悴，仅仅看到%SAVESTR:PLAYER%的脸就已经害怕的后退了/],
      }, // PRINTFORMW %SAVESTR:TARGET%面容十分憔悴，仅仅看到%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '199',
        any: [/PRINTFORMW %SAVESTR:PLAYER%嘲笑着她的样子，命令%SAVESTR:TARGET%脱光衣服，金红桃艰难的鼓起一点勇气瞪着你。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%嘲笑着她的样子，命令%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '200',
        any: [/PRINTFORMW 「那样的行为算是什么。这种事情…应该是和喜欢的人在一起，被喜欢的人温柔对待的事！你离我远点！」/],
      }, // PRINTFORMW 「那样的行为算是什么。这种事情…应该是和喜欢的人在一起，被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '201',
        any: [/PRINTFORMW %SAVESTR:PLAYER%扭着%SAVESTR:TARGET%的胳膊强行用舌头撬开她的嘴唇、她一边胆怯着反抗，一边感受这滋味。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%扭着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '202',
        any: [/PRINTFORMW 「不要！这样的…不承认…不会承认…啊啊啊…快点…放开…真是…啊啊！」/],
      }, // PRINTFORMW 「不要！这样的…不承认…不会承认…啊啊啊…快点…放开…真是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '203',
        any: [/PRINTFORMW %SAVESTR:TARGET%被压住双手，强行推到在床上。身体感到疼痛，发出了喘息声。/],
      }, // PRINTFORMW %SAVESTR:TARGET%被压住双手，强行推到在床上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '204',
        any: [/PRINTFORMW 「啊啊，救救我…狂王大人…啊啊…啊………」/],
      }, // PRINTFORMW 「啊啊，救救我…狂王大人…啊啊…啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '205',
        any: [/CFLAG:201 = 4/],
      }, // CFLAG:201 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '206',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '211',
        any: [/PRINTFORMW %SAVESTR:TARGET%慵懒的披着单薄的床单坐在床上，向%SAVESTR:PLAYER%打招呼了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%慵懒的披着单薄的床单坐在床
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '212',
        any: [/PRINTFORMW 「又来了啊…像这样和我见面…嗯，已经\{CFLAG:10\}次了呢」/],
      }, // PRINTFORMW 「又来了啊…像这样和我见面…嗯，已经{CFLAG:10}次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '213',
        any: [/PRINTFORMW %SAVESTR:TARGET%无法控制嘴角的笑意，像个小女孩一样哧哧的笑了起来。/],
      }, // PRINTFORMW %SAVESTR:TARGET%无法控制嘴角的笑意，像个小
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '214',
        any: [/PRINTFORMW 「呐…我…更想在你的怀抱里呢…啊哈…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呐…我…更想在你的怀抱里呢…啊哈…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '215',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头舔着嘴唇，做出了妓女一样明显欲求不满的动作，向%SAVESTR:PLAYER%靠近了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%用舌头舔着嘴唇，做出了妓女
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '216',
        any: [/PRINTFORMW 光是掀开床单一股萎靡的淫臭气味就散发了出来、大概是在%SAVESTR:PLAYER%还没有来的时候自慰了很多次。/],
      }, // PRINTFORMW 光是掀开床单一股萎靡的淫臭气味就散发了出来、大概是在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '217',
        any: [/PRINTFORMW 「脑袋里已经…无时无刻不在想着做爱了…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「脑袋里已经…无时无刻不在想着做爱了…%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '219',
        any: [/PRINTW/],
      }, // PRINTW
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '220',
        any: [/PRINTFORMW 「即便如此，居然让我特意变成处女…你这个人…」/],
      }, // PRINTFORMW 「即便如此，居然让我特意变成处女…你这个人…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '221',
        any: [/PRINTFORMW %SAVESTR:TARGET%有点难为情/],
      }, // PRINTFORMW %SAVESTR:TARGET%有点难为情
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '223',
        any: [/CFLAG:201 = 5/],
      }, // CFLAG:201 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '224',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '230',
        any: [/PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了什么魅魔的巢穴一样。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '231',
        any: [/PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '232',
        any: [/PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的魔力、粉红色的瘴气聚集到了肉眼能观测到的浓度。/],
      }, // PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '233',
        any: [/PRINTFORMW 「求求您快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去了………」/],
      }, // PRINTFORMW 「求求您快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '234',
        any: [/PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，意外的看到了金红桃发情到丧失理智的样子。/],
      }, // PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，意外的看到了金红桃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '235',
        any: [/PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么，这也是字面意思吧、真是完全落陷了%SAVESTR:PLAYER%脸上露出了难抑的笑容。/],
      }, // PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么，这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '236',
        any: [/PRINTFORMW 误解了那个笑容的意思，%SAVESTR:TARGET%马上饥渴的扑了过来/],
      }, // PRINTFORMW 误解了那个笑容的意思，%SAVESTR:TARGET%马上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '237',
        any: [/PRINTFORMW 「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '238',
        any: [/CFLAG:201 = 6/],
      }, // CFLAG:201 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '239',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '242',
        any: [/PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了什么魅魔的巢穴一样。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '243',
        any: [/PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '244',
        any: [/PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的魔力、粉红色的瘴气到了肉眼能察觉到的浓度。/],
      }, // PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '245',
        any: [/PRINTFORMW 「快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去了………」/],
      }, // PRINTFORMW 「快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '246',
        any: [/PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，看到了金红桃发情到丧失理智的样子。/],
      }, // PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，看到了金红桃发情到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '247',
        any: [/PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么这也是字面意思吧、真是完全落陷了，%SAVESTR:PLAYER%脸上露出了笑容。/],
      }, // PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么这也
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '248',
        any: [/PRINTFORMW 误解了那个笑容的意思%SAVESTR:TARGET%马上饥渴的扑了过来/],
      }, // PRINTFORMW 误解了那个笑容的意思%SAVESTR:TARGET%马上饥
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '249',
        any: [/PRINTFORMW 「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '250',
        any: [/CFLAG:201 = 6/],
      }, // CFLAG:201 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '251',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '254',
        any: [/PRINTFORMW 「嗯…呼…唔…啊哈…魔、魔王大人…欢迎光临%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「嗯…呼…唔…啊哈…魔、魔王大人…欢迎光临%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '255',
        any: [/PRINTFORMW %SAVESTR:TARGET%不久前被改造成了魔族，变得随心所欲、现在正用魔族的尾巴卖力的自慰着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%不久前被改造成了魔族，变得
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '256',
        any: [/PRINTFORMW 并没有直接的插进去，而是用尾巴巧妙又激烈的刺激着小穴。沉浸在快感中，连身上的羽毛都一颤一颤的很有感觉。/],
      }, // PRINTFORMW 并没有直接的插进去，而是用尾巴巧妙又激烈的刺激着小穴。沉浸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '257',
        any: [/PRINTFORMW 「真是的…啊啊…差点…咿、咿呀…啊啊啊真是…哈…要去了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「真是的…啊啊…差点…咿、咿呀…啊啊啊真是…哈…要去了…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '258',
        any: [/PRINTFORMW %SAVESTR:TARGET%淫魔一般的魔力在房间里漂浮扩散着、这是她发情过度而产生的魔力。/],
      }, // PRINTFORMW %SAVESTR:TARGET%淫魔一般的魔力在房间里漂浮
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '259',
        any: [/PRINTFORMW 「我…已经准备好了…所以…快…快来干我…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「我…已经准备好了…所以…快…快来干我…%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '260',
        any: [/CFLAG:201 = 6/],
      }, // CFLAG:201 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '261',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '268',
        any: [/PRINTFORMW 「啊啊…魔王大人…我%SAVESTR:TARGET%向您宣誓永远效忠………」/],
      }, // PRINTFORMW 「啊啊…魔王大人…我%SAVESTR:TARGET%向您宣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '269',
        any: [/PRINTFORMW %SAVESTR:TARGET%到现在为止受到了各种残酷的调教，终于坚持不住，对%SAVESTR:PLAYER%完全屈服了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%到现在为止受到了各种残酷的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '270',
        any: [/PRINTFORMW 用着下仆一样的口吻、趴着亲吻着%SAVESTR:PLAYER%的脚/],
      }, // PRINTFORMW 用着下仆一样的口吻、趴着亲吻着%SAVESTR:PLAYE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '271',
        any: [/PRINTFORMW 「从今天开始我就是魔王大人的下仆了…请随您喜欢使用我吧…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「从今天开始我就是魔王大人的下仆了…请随您喜欢使用我吧…%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '272',
        any: [/PRINTFORMW 抬起头来，一脸陶醉的表情。%SAVESTR:TARGET%迷失了。/],
      }, // PRINTFORMW 抬起头来，一脸陶醉的表情。%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '273',
        any: [/PRINTW/],
      }, // PRINTW
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '274',
        any: [/PRINTFORMW 「诶？狂王…大人？哎呀呀、讨厌啦、我的主人只有魔王大人一个人啦」/],
      }, // PRINTFORMW 「诶？狂王…大人？哎呀呀、讨厌啦、我的主人只有魔王大人一个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '276',
        any: [/PRINTFORMW %SAVESTR:TARGET%的瞳孔，现在能看到的东西，已经只有%SAVESTR:PLAYER%了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的瞳孔，现在能看到的东西，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '277',
        any: [/PRINTFORMW 「还特意去修复了处女膜什么的…真是…好难为情啊」/],
      }, // PRINTFORMW 「还特意去修复了处女膜什么的…真是…好难为情啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '278',
        any: [/PRINTFORMW %SAVESTR:TARGET%像少女一样难为情的害羞呢/],
      }, // PRINTFORMW %SAVESTR:TARGET%像少女一样难为情的害羞呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '280',
        any: [/PRINTFORMW %SAVESTR:TARGET%那个瞳孔能看到的东西，已经只有%SAVESTR:PLAYER%了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%那个瞳孔能看到的东西，已经
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '282',
        any: [/CFLAG:201 = 7/],
      }, // CFLAG:201 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '283',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '289',
        any: [/PRINTFORMW 「啊、魔王…大人…哇、我…」/],
      }, // PRINTFORMW 「啊、魔王…大人…哇、我…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '290',
        any: [/PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子有点奇怪。/],
      }, // PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '291',
        any: [/PRINTFORMW 「已经被改造成魔族的我…我已经不能回到狂王大人、家…那里去了…不、不想回去了…」/],
      }, // PRINTFORMW 「已经被改造成魔族的我…我已经不能回到狂王大人、家…那里去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '292',
        any: [/PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔王大人这里吧…」/],
      }, // PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '293',
        any: [/PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVESTR:TARGET%从床上爬着下来，一直到%SAVESTR:PLAYER%的脚下才停了下来。/],
      }, // PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '294',
        any: [/PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为忠实的仆人随意使用吧…！」/],
      }, // PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '295',
        any: [/PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分可怜。%SAVESTR:PLAYER%微笑着在她的头上标记了绝度服从的刻印。/],
      }, // PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '296',
        any: [/PRINTFORMW 「啊…谢谢、谢谢…我余生都是魔王大人的东西…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊…谢谢、谢谢…我余生都是魔王大人的东西…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '297',
        any: [/CFLAG:201 = 8/],
      }, // CFLAG:201 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '298',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '301',
        any: [/PRINTFORMW 「啊、魔王…大人…哇、我…」/],
      }, // PRINTFORMW 「啊、魔王…大人…哇、我…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '302',
        any: [/PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子有点奇怪。/],
      }, // PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '303',
        any: [/PRINTFORMW 「不但身体沾满污秽，还被改造成了魔族…我已经不能回到狂王大人、家…那里去了…不、不想回去了…」/],
      }, // PRINTFORMW 「不但身体沾满污秽，还被改造成了魔族…我已经不能回到狂王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '304',
        any: [/PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔王大人这里吧…」/],
      }, // PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '305',
        any: [/PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVESTR:TARGET%从床上爬着下来，一直到%SAVESTR:PLAYER%的脚前停了下来。/],
      }, // PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '306',
        any: [/PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为忠实的仆人随意使用吧…！」/],
      }, // PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '307',
        any: [/PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分可怜。%SAVESTR:PLAYER%微笑着在她的头上标记了绝度服从的刻印。/],
      }, // PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '308',
        any: [/PRINTFORMW 「啊…谢谢谢谢…我的余生都是魔王大人的东西…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊…谢谢谢谢…我的余生都是魔王大人的东西…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '309',
        any: [/CFLAG:201 = 8/],
      }, // CFLAG:201 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '310',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '313',
        any: [/PRINTFORMW 「魔王大人啊…当一个魔族真是快乐的让人停不下来啊♪」/],
      }, // PRINTFORMW 「魔王大人啊…当一个魔族真是快乐的让人停不下来啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '314',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出呻吟般娇艳欲滴的声音,慢慢的靠向%SAVESTR:PLAYER%。比起平时，现在她的样子怪怪的。/],
      }, // PRINTFORMW %SAVESTR:TARGET%发出呻吟般娇艳欲滴的声音,
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '315',
        any: [/PRINTFORMW 「今后也会全心全意的为魔王大人服务%UNICODE\(0x2661\) \*1% 总之今天嘛…让我好好的侍奉您吧%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「今后也会全心全意的为魔王大人服务%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '316',
        any: [/PRINTFORMW %SAVESTR:TARGET%尾巴像是小狗一样来回摇晃着、背翼也像是要展翅高飞一样，明显的感到愉悦。/],
      }, // PRINTFORMW %SAVESTR:TARGET%尾巴像是小狗一样来回摇晃着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '317',
        any: [/PRINTFORMW 「啊…在交合中感觉身心都和魔王大人在一起了呢………」/],
      }, // PRINTFORMW 「啊…在交合中感觉身心都和魔王大人在一起了呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '318',
        any: [/PRINTFORMW …总之今天%SAVESTR:TARGET%变得怪怪的………/],
      }, // PRINTFORMW …总之今天%SAVESTR:TARGET%变得怪怪的………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '319',
        any: [/CFLAG:201 = 8/],
      }, // CFLAG:201 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '320',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '325',
        any: [/PRINTFORMW 「呼啊…啊…………啊啊…………」/],
      }, // PRINTFORMW 「呼啊…啊…………啊啊…………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '326',
        any: [/PRINTFORMW 真是够了%SAVESTR:TARGET%精神完完全全的崩溃了。/],
      }, // PRINTFORMW 真是够了%SAVESTR:TARGET%精神完完全全的崩溃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '327',
        any: [/PRINTFORMW 不管是和她搭话、摇晃肩膀还是殴打她，都没有一点反应………/],
      }, // PRINTFORMW 不管是和她搭话、摇晃肩膀还是殴打她，都没有一点反应………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '328',
        any: [/CFLAG:201 = 9/],
      }, // CFLAG:201 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '329',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '332',
        any: [/CALL K7_KOJO2/],
      }, // CALL K7_KOJO2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '336',
        any: [/CALL K7_KOJO2/],
      }, // CALL K7_KOJO2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '346',
        any: [/CALL K7_KOJO2/],
      }, // CALL K7_KOJO2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '354',
        any: [/PRINTFORMW 「啊啊啊…真是够了，被你看到了我这个样子…啊嗯…唔、我该怎么办…？」/],
      }, // PRINTFORMW 「啊啊啊…真是够了，被你看到了我这个样子…啊嗯…唔、我该怎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '355',
        any: [/PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:TARGET%，%SAVESTR:PLAYER%完全阻止不了她们激烈的亲吻，交换唾液。/],
      }, // PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '356',
        any: [/PRINTFORMW 「真是够了！嗯哈…嗯呜呜…真是…为什么这样的事…嗯、啊、你怎么、喜欢这样啊…这、真让人为难！」/],
      }, // PRINTFORMW 「真是够了！嗯哈…嗯呜呜…真是…为什么这样的事…嗯、啊、你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '357',
        any: [/PRINTFORMW 『嗯啊，%SAVESTR:TARGET%隊長、虽然是在这里，但是我要向您告白…我一直都喜欢您』/],
      }, // PRINTFORMW 『嗯啊，%SAVESTR:TARGET%隊長、虽然是在这里
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '358',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根都红透了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '359',
        any: [/CFLAG:202 = 2/],
      }, // CFLAG:202 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '362',
        any: [/PRINTFORMW 「哎呀…你直到刚才都在被魔王大人的精液灌得满满的吧…表情真的好淫乱啊…哇、喂喂、突然抱住我什么的…真是够了！？」/],
      }, // PRINTFORMW 「哎呀…你直到刚才都在被魔王大人的精液灌得满满的吧…表情真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '363',
        any: [/PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:TARGET%，%SAVESTR:PLAYER%完全阻止不了她们激烈的亲吻，交换唾液。/],
      }, // PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '364',
        any: [/PRINTFORMW 「真是够了！呼唔…啾啾…唔啊哇哇哇…原来你喜欢百合诶、有点吃惊啊…诶？从前就一直喜欢我了？…呵呵，感觉还不错呗」/],
      }, // PRINTFORMW 「真是够了！呼唔…啾啾…唔啊哇哇哇…原来你喜欢百合诶、有点
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '365',
        any: [/PRINTFORMW 『%SAVESTR:TARGET%队长成了魔王大人的东西的话、不管是什么样的深渊，我都陪着队长一起堕落在其中吧』/],
      }, // PRINTFORMW 『%SAVESTR:TARGET%队长成了魔王大人的东西的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '366',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根都红透了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '367',
        any: [/CFLAG:202 = 2/],
      }, // CFLAG:202 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '370',
        any: [/PRINTFORMW 「哈？你居然投降了魔王军吗…居然还是那副姿态…真是够了！喂你做什么…快放开我！」/],
      }, // PRINTFORMW 「哈？你居然投降了魔王军吗…居然还是那副姿态…真是够了！喂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '371',
        any: [/PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:TARGET%，%SAVESTR:PLAYER%完全阻止不了她激烈的亲吻。/],
      }, // PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '372',
        any: [/PRINTFORMW 「真是够了！嗯嗯啊咿呀！！停、什么啊…嗯、很久以前就一直喜欢我了…？那、那是、说谎吧………」/],
      }, // PRINTFORMW 「真是够了！嗯嗯啊咿呀！！停、什么啊…嗯、很久以前就一直喜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '373',
        any: [/PRINTFORMW 『不是的！绝对不是谎言………我听说你被关押在这做俘虏、就一直在等待这个机会了』/],
      }, // PRINTFORMW 『不是的！绝对不是谎言………我听说你被关押在这做俘虏、就一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '374',
        any: [/PRINTFORMW 『我一直爱着你』/],
      }, // PRINTFORMW 『我一直爱着你』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '375',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，受到了巨大的打击………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，受到了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '376',
        any: [/CFLAG:202 = 1/],
      }, // CFLAG:202 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '378',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '385',
        any: [/PRINTFORMW 『听说您已经变成魔王大人的奴隶了，笑♪』/],
      }, // PRINTFORMW 『听说您已经变成魔王大人的奴隶了，笑♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '386',
        any: [/PRINTFORMW %SAVESTR:TARGET%陷落了、难看的匍匐在%SAVESTR:PLAYER%的脚下。那个身姿，连%SAVESTR:ASSI%也嘲弄着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%陷落了、难看的匍匐在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '387',
        any: [/PRINTFORMW 「讨厌\.\.\.啊、请不要再看了…」/],
      }, // PRINTFORMW 「讨厌...啊、请不要再看了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '388',
        any: [/PRINTFORMW 『呵呵、我一点也不在乎、隊長、尽情和您喜欢的魔王大人做爱吧』/],
      }, // PRINTFORMW 『呵呵、我一点也不在乎、隊長、尽情和您喜欢的魔王大人做爱吧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '389',
        any: [/PRINTFORMW 「哎呀、这样好么？你不是一直爱着我吗？」/],
      }, // PRINTFORMW 「哎呀、这样好么？你不是一直爱着我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '390',
        any: [/PRINTFORMW 『当然现在也爱队长啊、因为是魔王大人，所以同时爱着队长的话、完全没有问题！』/],
      }, // PRINTFORMW 『当然现在也爱队长啊、因为是魔王大人，所以同时爱着队长的话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '391',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出了惊讶的表情。%SAVESTR:PLAYER%大笑着看着这个难以理解的状况，享受着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了惊讶的表情。%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '392',
        any: [/PRINTFORMW 「我知道了、魔王大人希望这样的话也没关系」/],
      }, // PRINTFORMW 「我知道了、魔王大人希望这样的话也没关系」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '393',
        any: [/CFLAG:202 = 2/],
      }, // CFLAG:202 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '396',
        any: [/PRINTFORMW 『虽然从魔王大人那里听说了相当有趣的事情、不过您的变化还真是大呢、隊長』/],
      }, // PRINTFORMW 『虽然从魔王大人那里听说了相当有趣的事情、不过您的变化还真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '397',
        any: [/PRINTFORMW 「哎呀…%SAVESTR:ASSI%嘛？ 呵呵…我现在是魔王大人的一只雌犬了、不过魔王大人允许的话，也可以给你抱一抱呢%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「哎呀…%SAVESTR:ASSI%嘛？ 呵呵…我现在是魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '398',
        any: [/PRINTFORMW 「嗯哼哼、这次尝试和你用更淫乱的方法“亲吻”也不错呢~」/],
      }, // PRINTFORMW 「嗯哼哼、这次尝试和你用更淫乱的方法“亲吻”也不错呢~」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '399',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出了淫乱的微笑、过去那个身姿被彻底的改变了。%SAVESTR:ASSI%只能苦笑。/],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了淫乱的微笑、过去那个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '400',
        any: [/PRINTFORMW 『（这…也许这就是这个人的本性吧………）』/],
      }, // PRINTFORMW 『（这…也许这就是这个人的本性吧………）』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '401',
        any: [/CFLAG:202 = 2/],
      }, // CFLAG:202 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '403',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '408',
        any: [/PRINTFORMW 「你的心情我是明白了、但是我是魔王大人的东西…哼、啊、不行呃………」/],
      }, // PRINTFORMW 「你的心情我是明白了、但是我是魔王大人的东西…哼、啊、不行
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '409',
        any: [/PRINTFORMW 『放心吧，这是魔王大人允许的。啊~、果然队长您真是太可爱了…我…我已经忍不住了…！』/],
      }, // PRINTFORMW 『放心吧，这是魔王大人允许的。啊~、果然队长您真是太可爱了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '410',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%狠狠的拥抱着露出了困惑的表情………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '413',
        any: [/PRINTFORMW 「呵呵呵、你这么喜欢我的话…把我的身体弄得乱七八糟也没有关系哦%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呵呵呵、你这么喜欢我的话…把我的身体弄得乱七八糟也没有关
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '414',
        any: [/PRINTFORMW 『%SAVESTR:TARGET%隊長…哈哈、这样…这样淫乱的堕落了………！』/],
      }, // PRINTFORMW 『%SAVESTR:TARGET%隊長…哈哈、这样…这样淫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '415',
        any: [/PRINTFORMW %SAVESTR:TARGET%张开双腿谄媚的淫乱姿态，让%SAVESTR:ASSI%看着不禁躁动了起来………/],
      }, // PRINTFORMW %SAVESTR:TARGET%张开双腿谄媚的淫乱姿态，让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '417',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '420',
        any: [/PRINTFORMW 「啊啊啊…唔、真、真的喜欢我的话…拜托手下留情吧………」/],
      }, // PRINTFORMW 「啊啊啊…唔、真、真的喜欢我的话…拜托手下留情吧………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '421',
        any: [/PRINTFORMW 『哼哼哼、不要紧！我会用自己的全部技巧让您绝顶不断~♪』/],
      }, // PRINTFORMW 『哼哼哼、不要紧！我会用自己的全部技巧让您绝顶不断~♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '422',
        any: [/PRINTFORMW 虽然%SAVESTR:TARGET%发出恳求的声音、但这反而让%SAVESTR:ASSI%越来越有干劲了………/],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%发出恳求的声音、但这反
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '423',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '432',
        any: [/PRINTFORMW 「你现在………也是魔王大人的东西了？…啊啊、总觉得有一点嫉妒呢」/],
      }, // PRINTFORMW 「你现在………也是魔王大人的东西了？…啊啊、总觉得有一点嫉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '433',
        any: [/PRINTFORMW 言语不和啊，%SAVESTR:PLAYER%在一旁站着观察着：%SAVESTR:ASSI%冷冷的瞪着%SAVESTR:TARGET%。woooooow~~~了解她们的关系了/],
      }, // PRINTFORMW 言语不和啊，%SAVESTR:PLAYER%在一旁站着观察
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '434',
        any: [/PRINTFORMW 「不过、魔王大人最优秀的下仆不是你、而是我哦！」/],
      }, // PRINTFORMW 「不过、魔王大人最优秀的下仆不是你、而是我哦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '435',
        any: [/PRINTFORMW 『隊長、你被魔王大人改变的也相当多呢………』/],
      }, // PRINTFORMW 『隊長、你被魔王大人改变的也相当多呢………』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '436',
        any: [/PRINTFORMW 一如既往的带着奇怪的高傲感和自尊心，大概%SAVESTR:ASSI%因此稍微安心了一点（害羞）………/],
      }, // PRINTFORMW 一如既往的带着奇怪的高傲感和自尊心，大概%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '437',
        any: [/CFLAG:203 = 2/],
      }, // CFLAG:203 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '440',
        any: [/PRINTFORMW 「别一直抱着魔王大人不放啊…喂喂，你到底要和魔王大人来几次啊！？」/],
      }, // PRINTFORMW 「别一直抱着魔王大人不放啊…喂喂，你到底要和魔王大人来几次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '441',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着曾经的同伴堕落的姿态，露出很开心的样子。/],
      }, // PRINTFORMW %SAVESTR:TARGET%看着曾经的同伴堕落的姿态，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '442',
        any: [/PRINTFORMW 看着%SAVESTR:ASSI%堕入淫乱的深渊，%SAVESTR:TARGET%也渐渐发情了，呼吸逐渐粗重了起来。/],
      }, // PRINTFORMW 看着%SAVESTR:ASSI%堕入淫乱的深渊，%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '443',
        any: [/PRINTFORMW 『啊啊、我在被魔王大人狠狠的侵犯…呼呼…已经离不开魔王大人的肉棒了%UNICODE\(0x2661\) \*1%』/],
      }, // PRINTFORMW 『啊啊、我在被魔王大人狠狠的侵犯…呼呼…已经离不开魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '444',
        any: [/PRINTFORMW 「你也相当………算啦、反正我也比较喜欢现在的你，没差啦」/],
      }, // PRINTFORMW 「你也相当………算啦、反正我也比较喜欢现在的你，没差啦」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '445',
        any: [/CFLAG:203 = 2/],
      }, // CFLAG:203 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '448',
        any: [/PRINTFORMW 「呵呵、你就是魔王的助手吗。那双手握着阴茎要比握着武器更适合妳嘛」/],
      }, // PRINTFORMW 「呵呵、你就是魔王的助手吗。那双手握着阴茎要比握着武器更适
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '449',
        any: [/PRINTFORMW %SAVESTR:ASSI%的表情变得很恼怒，故意狠狠的用手揉弄着%SAVESTR:TARGET%的巨乳、在她耳边低语着什么。/],
      }, // PRINTFORMW %SAVESTR:ASSI%的表情变得很恼怒，故意狠狠的用
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '450',
        any: [/PRINTFORMW 「嗬咿呀！痛！痛死了！啊、说什么…？”你也会陷落”怎么可能？这种愚蠢的事情…！」/],
      }, // PRINTFORMW 「嗬咿呀！痛！痛死了！啊、说什么…？”你也会陷落”怎么可能
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '451',
        any: [/PRINTFORMW 『我过去的队长啊、你马上就会知道了——你只不过是一只肮脏的雌犬』/],
      }, // PRINTFORMW 『我过去的队长啊、你马上就会知道了——你只不过是一只肮脏的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '452',
        any: [/PRINTFORMW %SAVESTR:TARGET%的视线对上黑方片，看到%SAVESTR:ASSI%那双嗜虐的眼睛、不由得低头沉默了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的视线对上黑方片，看到%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '453',
        any: [/CFLAG:203 = 1/],
      }, // CFLAG:203 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '455',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '461',
        any: [/PRINTFORMW 「啊、%SAVESTR:ASSI%、诶、你也在魔王大人的………」/],
      }, // PRINTFORMW 「啊、%SAVESTR:ASSI%、诶、你也在魔王大人的…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '462',
        any: [/PRINTFORMW 『看吧、我当时说的话应验了吧、%SAVESTR:TARGET%隊長』/],
      }, // PRINTFORMW 『看吧、我当时说的话应验了吧、%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '463',
        any: [/PRINTFORMW 「嗯？」/],
      }, // PRINTFORMW 「嗯？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '464',
        any: [/PRINTFORMW 听到意想不到的话，%SAVESTR:TARGET%瞬间凝固。然后恢复正常盯着%SAVESTR:ASSI%。/],
      }, // PRINTFORMW 听到意想不到的话，%SAVESTR:TARGET%瞬间凝固
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '465',
        any: [/PRINTFORMW 『你也和我一样成为魔王大人的奴隶了、从现在开始就是魔王大人的亲卫队了哦♪』/],
      }, // PRINTFORMW 『你也和我一样成为魔王大人的奴隶了、从现在开始就是魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '466',
        any: [/PRINTFORMW 「…这、应该说谢谢呢？」/],
      }, // PRINTFORMW 「…这、应该说谢谢呢？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '467',
        any: [/PRINTFORMW 『呵呵、在床上的话就另当别论了、为了成为魔王大人最喜爱的奴隶我什么侍奉都会做的%UNICODE\(0x2661\) \*1%』/],
      }, // PRINTFORMW 『呵呵、在床上的话就另当别论了、为了成为魔王大人最喜爱的奴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '468',
        any: [/PRINTFORMW 「明白了、那就由魔王大人来决定谁侍奉的更好吧！%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「明白了、那就由魔王大人来决定谁侍奉的更好吧！%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '469',
        any: [/PRINTFORMW 看来两个人之间缔结了新的友情………/],
      }, // PRINTFORMW 看来两个人之间缔结了新的友情………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '470',
        any: [/CFLAG:203 = 2/],
      }, // CFLAG:203 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '473',
        any: [/PRINTFORMW 「呼…\\@TIME == 0 \? 今日 # 今夜\\@%SAVESTR:ASSI%来和我一起玩3p吗？」/],
      }, // PRINTFORMW 「呼…\@TIME == 0 ? 今日 # 今夜\@%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '474',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出一脸飘飘然的表情，跟%SAVESTR:PLAYER%一起和%SAVESTR:ASSI%打了招呼。/],
      }, // PRINTFORMW %SAVESTR:TARGET%露出一脸飘飘然的表情，跟%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '475',
        any: [/PRINTFORMW 『啊啊、%SAVESTR:TARGET%、真是漂亮的表情。魔王大人已经看到你这副可爱的样子了吗？』/],
      }, // PRINTFORMW 『啊啊、%SAVESTR:TARGET%、真是漂亮的表情。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '476',
        any: [/PRINTFORMW 「嗯嗯、是的哦…不管是小穴还是肛门都已经稀里哗啦的湿透了哦%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「嗯嗯、是的哦…不管是小穴还是肛门都已经稀里哗啦的湿透了哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '477',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边淫乱的笑着一边把手放在股间摩擦着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边淫乱的笑着一边把手放在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '478',
        any: [/PRINTFORMW 『哎呀哎呀、%SAVESTR:TARGET%，今后我就承认你是魔王大人的淫穴队长吧♪』/],
      }, // PRINTFORMW 『哎呀哎呀、%SAVESTR:TARGET%，今后我就承认
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '479',
        any: [/PRINTFORMW 「啊哈…淫穴队长…多么好听的名字呢%UNICODE\(0x2661\) \*1% …没问题啦、就交给我和我的小穴了%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊哈…淫穴队长…多么好听的名字呢%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '480',
        any: [/CFLAG:203 = 2/],
      }, // CFLAG:203 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '482',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '484-495',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '487',
        any: [/PRINTFORMW 「哎呀、\\@TIME == 0 \? 今日 # 今夜\\@是三个人一起享受吧%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「哎呀、\@TIME == 0 ? 今日 # 今夜\@是三
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '488',
        any: [/PRINTFORMW 『那么、首先让作为奴隶的我为魔王大人服务吧』/],
      }, // PRINTFORMW 『那么、首先让作为奴隶的我为魔王大人服务吧』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '489',
        any: [/PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%对%SAVESTR:PLAYER%作为奴隶的侍奉服务开始了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '492',
        any: [/PRINTFORMW 「哈啊…来啊…%SAVESTR:ASSI%。我快受不了了，一起来满满的灌注给我吧…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「哈啊…来啊…%SAVESTR:ASSI%。我快受不了了，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '493',
        any: [/PRINTFORMW 一边发出甜腻的献媚声音，%SAVESTR:TARGET%一边分开自己的身体诱惑着%SAVESTR:ASSI%。/],
      }, // PRINTFORMW 一边发出甜腻的献媚声音，%SAVESTR:TARGET%一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '494',
        any: [/PRINTFORMW 『哼哼哼、队长摆出这样的姿态真是无法拒绝的邀请啊~♪』/],
      }, // PRINTFORMW 『哼哼哼、队长摆出这样的姿态真是无法拒绝的邀请啊~♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '498',
        any: [/PRINTFORMW 「比我弱小的家伙，不管对我做什么我都不会在意的…呼」/],
      }, // PRINTFORMW 「比我弱小的家伙，不管对我做什么我都不会在意的…呼」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '499',
        any: [/PRINTFORMW 『是这样吗？被我做着这样的事，”弱小”？还在说着什么了不起的话啊、”隊長”』/],
      }, // PRINTFORMW 『是这样吗？被我做着这样的事，”弱小”？还在说着什么了不起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '500',
        any: [/PRINTFORMW 因为被挑衅了，%SAVESTR:ASSI%抓住%SAVESTR:TARGET%的巨乳尽情的拧捏，%SAVESTR:TARGET%发出了痛苦的声音………/],
      }, // PRINTFORMW 因为被挑衅了，%SAVESTR:ASSI%抓住%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '501',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '507',
        any: [/DRAWLINE/],
      }, // DRAWLINE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '512',
        any: [/PRINTFORMW 「你也被魔王大人疼爱着么…是那股间东西的原因吗？」/],
      }, // PRINTFORMW 「你也被魔王大人疼爱着么…是那股间东西的原因吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '513',
        any: [/PRINTFORMW 『嗯~~~魔王大人非常喜欢这淫乱的东西呢、一直被充分的疼爱着呢♪』/],
      }, // PRINTFORMW 『嗯~~~魔王大人非常喜欢这淫乱的东西呢、一直被充分的疼爱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '514',
        any: [/PRINTFORMW %SAVESTR:TARGET%的语调中有着明显的嫉妒情绪，随着%SAVESTR:ASSI%股间耷拉着的阴茎和淫乱的话语，下体逐渐变湿润了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的语调中有着明显的嫉妒情绪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '515',
        any: [/PRINTFORMW 「\\@TIME == 0 \? 今日 # 今夜\\@既然你被魔王大人疼爱着的话…嘛，也罢、没关系………」/],
      }, // PRINTFORMW 「\@TIME == 0 ? 今日 # 今夜\@既然你被魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '516',
        any: [/PRINTFORMW 但是%SAVESTR:TARGET%的眼睛已经不能从%SAVESTR:ASSI%的阴茎移开了。/],
      }, // PRINTFORMW 但是%SAVESTR:TARGET%的眼睛已经不能从%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '517',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '520',
        any: [/PRINTFORMW 「你也变成魔王大人的肉欲玩具了吗…啊呀、那个可爱的阴茎能让魔王大人满足么？」/],
      }, // PRINTFORMW 「你也变成魔王大人的肉欲玩具了吗…啊呀、那个可爱的阴茎能让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '521',
        any: [/PRINTFORMW 『呼呼呼、那是我和魔王大人两个人的秘密哦、%SAVESTR:TARGET%隊長♪』/],
      }, // PRINTFORMW 『呼呼呼、那是我和魔王大人两个人的秘密哦、%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '522',
        any: [/PRINTFORMW 「虽然从圣灵堡垒的某处偶然听到了你是扶她的消息、没想到能在这种地方“品尝”到扶她的滋味…♪」/],
      }, // PRINTFORMW 「虽然从圣灵堡垒的某处偶然听到了你是扶她的消息、没想到能在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '523',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:ASSI%的阴茎变得兴奋起来了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:AS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '524',
        any: [/PRINTFORMW %SAVESTR:TARGET%想到今后会被%SAVESTR:ASSI%的阴茎侵犯，说不定是满怀期待呢………/],
      }, // PRINTFORMW %SAVESTR:TARGET%想到今后会被%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '525',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '528',
        any: [/PRINTFORMW 「什么啊、你居然在这里取悦魔王？%SAVESTR:ASSI%！以前就觉得你奇怪了，没想到是这样的人！」/],
      }, // PRINTFORMW 「什么啊、你居然在这里取悦魔王？%SAVESTR:ASSI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '529',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为旧部下的背叛，信念和声音都不禁动摇了。%SAVESTR:ASSI%哎呀着耸了耸肩，用裤裆里的东西压在了%SAVESTR:TARGET%的身体上。/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为旧部下的背叛，信念和声
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '530',
        any: [/PRINTFORMW 「唔嗷！扶、扶她…？虽然在狂王大人那里听说了，没想到真的是这样…诶？这样的话…啊、放肆…你在做什么…？」/],
      }, // PRINTFORMW 「唔嗷！扶、扶她…？虽然在狂王大人那里听说了，没想到真的是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '531',
        any: [/PRINTFORMW 『没想到、呵呵，%SAVESTR:TARGET%队长会变成犯人这种事情我也没有想过呢、不过没关系，让我带队长前往愉悦的天国吧♪』/],
      }, // PRINTFORMW 『没想到、呵呵，%SAVESTR:TARGET%队长会变成
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '532',
        any: [/PRINTFORMW %SAVESTR:TARGET%的面色变得铁青、今后会发出怎样的悲鸣呢？真令人期待………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的面色变得铁青、今后会发出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '533',
        any: [/CFLAG:204 = 1/],
      }, // CFLAG:204 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '535',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '541',
        any: [/PRINTFORMW 『队长也成为魔王大人的东西了呢。呼呼呼、做为纪念就在魔王大人面前侵犯你好了%UNICODE\(0x2661\) \*1%』/],
      }, // PRINTFORMW 『队长也成为魔王大人的东西了呢。呼呼呼、做为纪念就在魔王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '542',
        any: [/PRINTFORMW 「不、不要…那样的话我会因羞耻而死的」/],
      }, // PRINTFORMW 「不、不要…那样的话我会因羞耻而死的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '543',
        any: [/PRINTFORMW 『都到现在了还在说什么呢？在魔王大人面前被我侵犯那么多次了、用那么让人讨厌的眼神看着我…那难道不是在引诱我吗？』/],
      }, // PRINTFORMW 『都到现在了还在说什么呢？在魔王大人面前被我侵犯那么多次了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '544',
        any: [/PRINTFORMW 「不、不一样！不是这样的！　魔王大人！魔王大人也会憎恨我被别人侵犯吧？」/],
      }, // PRINTFORMW 「不、不一样！不是这样的！　魔王大人！魔王大人也会憎恨我被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '545',
        any: [/PRINTFORMW %SAVESTR:TARGET%在拼命的寻求帮助、但%SAVESTR:PLAYER%只是在一旁笑笑而已。/],
      }, // PRINTFORMW %SAVESTR:TARGET%在拼命的寻求帮助、但%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '546',
        any: [/PRINTFORMW 『放心吧，如果是魔王大人的命令，我也不会违背的、所以不行的话我不会上的啦、大概吧♪』/],
      }, // PRINTFORMW 『放心吧，如果是魔王大人的命令，我也不会违背的、所以不行的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '547',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '550',
        any: [/PRINTFORMW 「哈哈…呐、%SAVESTR:ASSI%、拜托你咯、我的小穴和肛门都想要你的肉棒呢、想要绝顶！」/],
      }, // PRINTFORMW 「哈哈…呐、%SAVESTR:ASSI%、拜托你咯、我的小
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '551',
        any: [/PRINTFORMW 『魔王大人真是厉害呢、能把那个%SAVESTR:TARGET%队长调教到如此淫乱的程度』/],
      }, // PRINTFORMW 『魔王大人真是厉害呢、能把那个%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '552',
        any: [/PRINTFORMW %SAVESTR:ASSI%看着%SAVESTR:TARGET%凌乱的姿态不由的发出赞叹。那个%SAVESTR:TARGET%四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。/],
      }, // PRINTFORMW %SAVESTR:ASSI%看着%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '553',
        any: [/PRINTFORMW 「不要只站在那里看啊…啊啊…拜托了！拜托了！%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「不要只站在那里看啊…啊啊…拜托了！拜托了！%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '554',
        any: [/PRINTFORMW 『魔王大人、怎么处理呢？我觉得就这么放着也蛮有意思呢♪』/],
      }, // PRINTFORMW 『魔王大人、怎么处理呢？我觉得就这么放着也蛮有意思呢♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '555',
        any: [/PRINTFORMW 看着%SAVESTR:TARGET%那副可怜的发情姿态、%SAVESTR:ASSI%愉悦的笑了………/],
      }, // PRINTFORMW 看着%SAVESTR:TARGET%那副可怜的发情姿态、%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '556',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '558',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '563',
        any: [/PRINTFORMW 「啊啊…我的身体…光是看着…就变得这么有感觉了…♪」/],
      }, // PRINTFORMW 「啊啊…我的身体…光是看着…就变得这么有感觉了…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '564',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:PLAYER%和%SAVESTR:ASSI%排着队的阴茎变得十分的兴奋。/],
      }, // PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '565',
        any: [/PRINTFORMW 『现在的你多么的富有魅力你恐怕不明白吧、让人想狠狠的随意摆布、玩弄你呢』/],
      }, // PRINTFORMW 『现在的你多么的富有魅力你恐怕不明白吧、让人想狠狠的随意摆
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '568',
        any: [/PRINTFORMW 「啊真是的…魔王大人、%SAVESTR:ASSI%好想要阴茎…两个人一起随便你们侵犯我的哪里吧%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊真是的…魔王大人、%SAVESTR:ASSI%好想要阴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '569',
        any: [/PRINTFORMW \\@RAND:2 == 0 \? %SAVESTR:TARGET%四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。 # %SAVESTR:TARGET%躺在地上分开大腿，用手指插进小穴和肛门狠狠的搅动着、引诱着%SAVESTR:PLAYER%和%SAVESTR:ASSI%。\\@/],
      }, // PRINTFORMW \@RAND:2 == 0 ? %SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '570',
        any: [/PRINTFORMW 『啊魔王大人…\\@TIME == 0 \? 今日 # 今夜\\@%SAVESTR:TARGET%隊長的\\@RAND:2 == 0 \? 菊花 # 小穴\\@就让我侵犯吧♪』/],
      }, // PRINTFORMW 『啊魔王大人…\@TIME == 0 ? 今日 # 今夜\
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '572',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '575',
        any: [/PRINTFORMW 「呼、呵呵…你这种人的阴茎…啊、啊我是不会输的………」/],
      }, // PRINTFORMW 「呼、呵呵…你这种人的阴茎…啊、啊我是不会输的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '576',
        any: [/PRINTFORMW 『真的吗？好像比起我个人，你对阴茎更有兴趣嘛♪』/],
      }, // PRINTFORMW 『真的吗？好像比起我个人，你对阴茎更有兴趣嘛♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '577',
        any: [/PRINTFORMW 好像要证明这句话的正确性、%SAVESTR:TARGET%的眼睛不时的看向%SAVESTR:ASSI%股间的阴茎………/],
      }, // PRINTFORMW 好像要证明这句话的正确性、%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '578',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '582',
        any: [/CALL K7_KOJO2/],
      }, // CALL K7_KOJO2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '589-824',
        any: [/@K7_KOJO2/],
      }, // @K7_KOJO2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '593',
        any: [/PRINTFORMW 「………啊～…………啊～」/],
      }, // PRINTFORMW 「………啊～…………啊～」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '594',
        any: [/PRINTFORMW 精神完全的崩溃了的%SAVESTR:TARGET%，无论%SAVESTR:PLAYER%弄什么都毫无反应………/],
      }, // PRINTFORMW 精神完全的崩溃了的%SAVESTR:TARGET%，无论%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '595',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '599',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出憎恨的目光，对%SAVESTR:PLAYER%怒目而视。/],
      }, // PRINTFORMW %SAVESTR:TARGET%露出憎恨的目光，对%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '600',
        any: [/PRINTFORMW 「如果不想受伤，就赶快从这个房间滚出去！」/],
      }, // PRINTFORMW 「如果不想受伤，就赶快从这个房间滚出去！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '602',
        any: [/PRINTFORMW 仔细看的话，%SAVESTR:TARGET%不知什么时候偷偷藏了吃饭用的刀叉呢！/],
      }, // PRINTFORMW 仔细看的话，%SAVESTR:TARGET%不知什么时候偷
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '604',
        any: [/PRINTFORMW %SAVESTR:ASSI%慌忙的一边殴打%SAVESTR:TARGET%，一边抢夺着刀叉。/],
      }, // PRINTFORMW %SAVESTR:ASSI%慌忙的一边殴打%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '605',
        any: [/PRINTFORMW %SAVESTR:ASSI%提出要狠狠的对%SAVESTR:TARGET%进行惩罚………/],
      }, // PRINTFORMW %SAVESTR:ASSI%提出要狠狠的对%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '607',
        any: [/PRINTFORMW %SAVESTR:PLAYER%一把扭过%SAVESTR:TARGET%的手，夺走刀叉。/],
      }, // PRINTFORMW %SAVESTR:PLAYER%一把扭过%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '608',
        any: [/PRINTFORMW 看来今天的惩罚要特别严厉才行………/],
      }, // PRINTFORMW 看来今天的惩罚要特别严厉才行………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '611',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '615',
        any: [/PRINTFORMW 「诶呀、又来了？呵呵，你的调教没什么大不了的」/],
      }, // PRINTFORMW 「诶呀、又来了？呵呵，你的调教没什么大不了的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '616',
        any: [/PRINTFORMW %SAVESTR:TARGET%不屑的看着%SAVESTR:PLAYER%………/],
      }, // PRINTFORMW %SAVESTR:TARGET%不屑的看着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '617',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '622',
        any: [/PRINTFORMW 「还没有放弃么，真是麻烦？」/],
      }, // PRINTFORMW 「还没有放弃么，真是麻烦？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '623',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着有点腻了的表情从床上爬了起来………/],
      }, // PRINTFORMW %SAVESTR:TARGET%带着有点腻了的表情从床上爬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '624',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '629',
        any: [/PRINTFORMW 「又要让我用手么，真是恶心…快点弄完就算了………」/],
      }, // PRINTFORMW 「又要让我用手么，真是恶心…快点弄完就算了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '630',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着疲惫的表情从床上爬了起来。/],
      }, // PRINTFORMW %SAVESTR:TARGET%带着疲惫的表情从床上爬了起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '631',
        any: [/PRINTFORMW 随着%SAVESTR:PLAYER%越来越靠近，%SAVESTR:TARGET%的脸渐渐红了，呼吸也渐渐浑浊了起来………/],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%越来越靠近，%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '632',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '637',
        any: [/PRINTFORMW 「啊啊…又来了吗…再这样下去的话，我…啊啊啊」/],
      }, // PRINTFORMW 「啊啊…又来了吗…再这样下去的话，我…啊啊啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '638',
        any: [/PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:PLAYER%的身影，害怕的抱紧自己的身体向后退着、直到碰到墙壁才缓缓站起来。/],
      }, // PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '639',
        any: [/PRINTFORM %SAVESTR:PLAYER%慢慢的靠近了%SAVESTR:TARGET%/],
      }, // PRINTFORM %SAVESTR:PLAYER%慢慢的靠近了%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '641',
        any: [/PRINTW 抓过她的金发嗅着。/],
      }, // PRINTW 抓过她的金发嗅着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '643',
        any: [/PRINTW 抓过她长顺的金发嗅着。/],
      }, // PRINTW 抓过她长顺的金发嗅着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '645',
        any: [/PRINTW 抓过她的金色短发嗅着。/],
      }, // PRINTW 抓过她的金色短发嗅着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '647',
        any: [/PRINTFORMW %SAVESTR:TARGET%被做了这样的事，也只能闭着眼睛默默忍受着。然后%SAVESTR:PLAYER%把她推到。/],
      }, // PRINTFORMW %SAVESTR:TARGET%被做了这样的事，也只能闭着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '648',
        any: [/PRINTFORMW 「至、至少…把灯关了再………」/],
      }, // PRINTFORMW 「至、至少…把灯关了再………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '649',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '667',
        any: [/PRINTFORMW 「哈哈哈、狂王大人也喜欢这样的衣服呢。穿着这个衣服的我究竟是多少人的女仆呢…啊啊、今天的话，是魔王大人的女仆呢哈哈」/],
      }, // PRINTFORMW 「哈哈哈、狂王大人也喜欢这样的衣服呢。穿着这个衣服的我究竟
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '668',
        any: [/PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超短的裙子、简单的在腰上围好围裙。/],
      }, // PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '669',
        any: [/PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个巨乳。/],
      }, // PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '670',
        any: [/PRINTFORMW 「啊啊、主人啊～嗯%UNICODE\(0x2661\) \*1% 色情的女仆%SAVESTR:TARGET%在这…好好惩罚一下我吧%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊、主人啊～嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '671',
        any: [/PRINTFORMW %SAVESTR:TARGET%对你露出妩媚的神态、诱惑着你………/],
      }, // PRINTFORMW %SAVESTR:TARGET%对你露出妩媚的神态、诱惑着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '672',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '675',
        any: [/PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰，在裙边有着漂亮的花纹，非常可爱。/],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '676',
        any: [/PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。/],
      }, // PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '677',
        any: [/PRINTFORMW 「呵呵、真是非常棒的礼服啊%UNICODE\(0x2661\) \*1% 不过穿成这样要与魔王大人做爱的话，会有点难受吧%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呵呵、真是非常棒的礼服啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '678',
        any: [/PRINTFORMW %SAVESTR:TARGET%的手在股间摩擦着，诱惑一般，向%SAVESTR:PLAYER%露出衣服的缝隙，展示着内裤。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的手在股间摩擦着，诱惑一般
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '679',
        any: [/PRINTFORMW 那条穿在身上的内裤已经湿透了。/],
      }, // PRINTFORMW 那条穿在身上的内裤已经湿透了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '680',
        any: [/PRINTFORMW 「呐、这条内裤，由魔王大人来给我褪下吧%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呐、这条内裤，由魔王大人来给我褪下吧%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '681',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '684',
        any: [/PRINTFORMW 「一跳一跳一跳的~~~、像小兔子一样跳～%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「一跳一跳一跳的~~~、像小兔子一样跳～%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '685',
        any: [/PRINTFORMW %SAVESTR:TARGET%穿着红色兔女郎装，跳着跳着突然转过身、快乐的笑着，靠近了%SAVESTR:PLAYER%。/],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着红色兔女郎装，跳着跳着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '686',
        any: [/PRINTFORMW 「小兔子呐～非常想要魔王大人的“胡萝卜”呢～%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「小兔子呐～非常想要魔王大人的“胡萝卜”呢～%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '687',
        any: [/PRINTFORMW 淫乱的兔女郎抱着%SAVESTR:PLAYER%，双手在魔王的双腿间揉动着、眼睛亮闪闪的看着%SAVESTR:PLAYER%。/],
      }, // PRINTFORMW 淫乱的兔女郎抱着%SAVESTR:PLAYER%，双手在魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '688',
        any: [/PRINTFORMW 「这个地方有大大的胡萝卜先生呢～%UNICODE\(0x2661\) \*1% 呵呵、快给小兔子吧♪」/],
      }, // PRINTFORMW 「这个地方有大大的胡萝卜先生呢～%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '689',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '695',
        any: [/PRINTFORMW 「嘛…要来抱一抱我吗？」/],
      }, // PRINTFORMW 「嘛…要来抱一抱我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '696',
        any: [/PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PLAYER%一边露出媚态，一边慢慢的靠了过来。/],
      }, // PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '697',
        any: [/PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼~…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼~…%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '698',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%的手臂、用热情的…嗯，是发情的目光看着%SAVESTR:PLAYER%。/],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '699',
        any: [/PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '701',
        any: [/PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '702',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开阴部，让尾巴不停的在蜜裂上滑动着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '703',
        any: [/PRINTFORMW 有意识的用魅魔的力量制造出甜蜜的香气，%SAVESTR:TARGET%袭击了过来。/],
      }, // PRINTFORMW 有意识的用魅魔的力量制造出甜蜜的香气，%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '704',
        any: [/PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '706',
        any: [/PRINTFORMW 「哈哈…魔王大人…来到我这里，我就要负起一名淫乱魔族主人的责任哦…♪」/],
      }, // PRINTFORMW 「哈哈…魔王大人…来到我这里，我就要负起一名淫乱魔族主人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '707',
        any: [/PRINTFORMW %SAVESTR:TARGET%只是看着%SAVESTR:PLAYER%就发情了，双眼都湿润了起来。/],
      }, // PRINTFORMW %SAVESTR:TARGET%只是看着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '708',
        any: [/PRINTFORMW 「现在…和以前比起来，不管胸部还是臀部都像小穴一样一碰就快感四溢…不过只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「现在…和以前比起来，不管胸部还是臀部都像小穴一样一碰就快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '709',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%拥抱着，吐露出融化般的声音………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '715',
        any: [/PRINTFORMW 「嘛…要来抱一抱我吗？」/],
      }, // PRINTFORMW 「嘛…要来抱一抱我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '716',
        any: [/PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PLAYER%一边露出媚态，一边慢慢的靠了过来。/],
      }, // PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '717',
        any: [/PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '718',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%的手臂、用热情的…嗯，是发情的目光看着/],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '719',
        any: [/PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '721',
        any: [/PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '722',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开阴部，让尾巴不停的在蜜裂上滑动着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '723',
        any: [/PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '725',
        any: [/PRINTFORMW 「魔王大人…快点来对我进行淫乱的调教啊…♪」/],
      }, // PRINTFORMW 「魔王大人…快点来对我进行淫乱的调教啊…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '726',
        any: [/PRINTFORMW %SAVESTR:TARGET%搂着%SAVESTR:PLAYER%的胳膊，出神的笑着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%搂着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '727',
        any: [/PRINTFORMW 只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '728',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%搂着腰，吐露出荡漾的声音………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '731',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '749',
        any: [/PRINTFORMW 「还是和以前一样不擅长穿这种和女佣一样的衣服啊………」/],
      }, // PRINTFORMW 「还是和以前一样不擅长穿这种和女佣一样的衣服啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '750',
        any: [/PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超短的裙子、简单的在腰上围好围裙。/],
      }, // PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '751',
        any: [/PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个巨乳。/],
      }, // PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '752',
        any: [/PRINTFORMW 「只为魔王大人提供的特殊侍奉来咯♪」/],
      }, // PRINTFORMW 「只为魔王大人提供的特殊侍奉来咯♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '753',
        any: [/PRINTFORMW %SAVESTR:TARGET%莞尔一笑轻提起裙边鞠了一躬，那个发乎自然的动作，不仅仅是一流的教育就能训练的出的。/],
      }, // PRINTFORMW %SAVESTR:TARGET%莞尔一笑轻提起裙边鞠了一躬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '754',
        any: [/PRINTFORMW 再想到这个少女超一流的性侍奉技巧，你满足的点了点头………/],
      }, // PRINTFORMW 再想到这个少女超一流的性侍奉技巧，你满足的点了点头………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '755',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '758',
        any: [/PRINTFORMW 「最开始穿上这么下流的衣服因为太羞耻了差点晕倒、不过魔王大人喜欢的话就没关系」/],
      }, // PRINTFORMW 「最开始穿上这么下流的衣服因为太羞耻了差点晕倒、不过魔王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '759',
        any: [/PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰，在裙边有着漂亮的花纹，非常可爱。/],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '760',
        any: [/PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。/],
      }, // PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '761',
        any: [/PRINTFORMW 「啊、不行啊、这不是几乎全都露出来了吗…啊呜…这种、手根本挡不住啊…嗯啊啊啊！…唔、真是太羞耻啦啊」/],
      }, // PRINTFORMW 「啊、不行啊、这不是几乎全都露出来了吗…啊呜…这种、手根本
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '762',
        any: [/PRINTFORMW 虽然不行不行的摇着头，不过从%SAVESTR:TARGET%双手试图遮挡的小缝隙中看、内裤已经逐渐的湿透了………/],
      }, // PRINTFORMW 虽然不行不行的摇着头，不过从%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '763',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '766',
        any: [/PRINTFORMW %SAVESTR:TARGET%穿着红色的兔女郎装\\@TIME == 0 \? 今日 # 今夜\\@进行侍奉。/],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着红色的兔女郎装\@TI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '767',
        any: [/PRINTFORMW 你从桌上取了一支烟叼着，叫%SAVESTR:TARGET%过来。/],
      }, // PRINTFORMW 你从桌上取了一支烟叼着，叫%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '768',
        any: [/PRINTFORMW 「啊、嗯、是要吸烟了么？」/],
      }, // PRINTFORMW 「啊、嗯、是要吸烟了么？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '769',
        any: [/PRINTFORMW %SAVESTR:TARGET%从胸部暴露的双峰间取出魔石打火机为你点上了烟。/],
      }, // PRINTFORMW %SAVESTR:TARGET%从胸部暴露的双峰间取出魔石
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '770',
        any: [/PRINTFORMW 你吸了一口烟，把%SAVESTR:TARGET%抱在怀里、嘴对嘴的喂她吸了一口烟。/],
      }, // PRINTFORMW 你吸了一口烟，把%SAVESTR:TARGET%抱在怀里、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '771',
        any: [/PRINTFORMW 「嗯咳咳！咕咳咳咳…呼咳咳啊咳咳唔咳咳！…对、对不起还是不习惯这样………」/],
      }, // PRINTFORMW 「嗯咳咳！咕咳咳咳…呼咳咳啊咳咳唔咳咳！…对、对不起还是不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '772',
        any: [/PRINTFORMW 呜咽着的%SAVESTR:TARGET%看向你、随即湮没在云雾之中………/],
      }, // PRINTFORMW 呜咽着的%SAVESTR:TARGET%看向你、随即湮没在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '773',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '779',
        any: [/PRINTFORMW 「啊…我的魔王大人、\\@TIME == 0 \? 今日 # 今宵\\@也和往常一样来了啊…」/],
      }, // PRINTFORMW 「啊…我的魔王大人、\@TIME == 0 ? 今日 # 
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '780',
        any: [/PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '781',
        any: [/PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫生、床单也被允许用干净的东西代替。/],
      }, // PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '782',
        any: [/PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。/],
      }, // PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '783',
        any: [/PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '785',
        any: [/PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦您了」/],
      }, // PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '786',
        any: [/PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '787',
        any: [/PRINTFORMW 连翅膀和尾巴也垂着、对%SAVESTR:PLAYER%表示出了完全的敬意。/],
      }, // PRINTFORMW 连翅膀和尾巴也垂着、对%SAVESTR:PLAYER%表示
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '788',
        any: [/PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '789',
        any: [/PRINTFORMW %SAVESTR:TARGET%是说台词的时候发了情吗，脸越来越红了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%是说台词的时候发了情吗，脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '791',
        any: [/PRINTFORMW 「光是魔王大人的拥抱就已经让我感到如此幸福了…」/],
      }, // PRINTFORMW 「光是魔王大人的拥抱就已经让我感到如此幸福了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '792',
        any: [/PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%进行着贴面舞。/],
      }, // PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '793',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%SAVESTR:PLAYER%的胸前、尾巴也缠住了脚。/],
      }, // PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '794',
        any: [/PRINTFORMW 「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」/],
      }, // PRINTFORMW 「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '800',
        any: [/PRINTFORMW 「啊…我的魔王大人、\\@TIME == 0 \? 今日 # 今宵\\@也和往常一样来了啊…」/],
      }, // PRINTFORMW 「啊…我的魔王大人、\@TIME == 0 ? 今日 # 
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '801',
        any: [/PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '802',
        any: [/PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫生、床单也被允许用干净的东西代替。/],
      }, // PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '803',
        any: [/PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。/],
      }, // PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '804',
        any: [/PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '806',
        any: [/PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦您了」/],
      }, // PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '807',
        any: [/PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '808',
        any: [/PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '809',
        any: [/PRINTFORMW %SAVESTR:TARGET%是说台词的时候发了情吗，脸都红了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%是说台词的时候发了情吗，脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '811',
        any: [/PRINTFORMW 「光是魔王大人的拥抱就已经让我感到如此幸福了…」/],
      }, // PRINTFORMW 「光是魔王大人的拥抱就已经让我感到如此幸福了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '812',
        any: [/PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%进行着贴面舞。/],
      }, // PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '813',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%SAVESTR:PLAYER%的胸前、尾巴也缠住了脚。/],
      }, // PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '814',
        any: [/PRINTFORMW 「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」/],
      }, // PRINTFORMW 「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '817',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '484-495',
        any: [/是三个人一起享受吧/],
      }, // CFLAG:203==2 分支缺 RETURN 1（源标注自引用）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '484',
        any: [/ELSEIF CFLAG:203 == 2 && FLAG:7 ==2/],
      }, // ELSEIF CFLAG:203 == 2 && FLAG:7 ==2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '825-907',
        any: [/@EVENTEND/],
      }, // @EVENTEND
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '826-827',
        any: [/SIF FLAG:7 <= 0/],
      }, // SIF FLAG:7 <= 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '828-829',
        any: [/SIF TALENT:167 != 1/],
      }, // SIF TALENT:167 != 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '831-832',
        any: [/;キャラ死亡時は口上をスキップ/],
      }, // ;キャラ死亡時は口上をスキップ
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '841',
        any: [/PRINTFORMW 「不…讨厌…怪物的孩子不要生下来…不要………」/],
      }, // PRINTFORMW 「不…讨厌…怪物的孩子不要生下来…不要………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '842',
        any: [/PRINTFORMW %SAVESTR:TARGET%脸上混着泪水与口水目光呆滞的躺在地上………/],
      }, // PRINTFORMW %SAVESTR:TARGET%脸上混着泪水与口水目光呆滞
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '847',
        any: [/PRINTFORMW 「可…可恨至极………！」/],
      }, // PRINTFORMW 「可…可恨至极………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '848',
        any: [/PRINTFORMW %SAVESTR:TARGET%的指甲在地上“吱吱”的抓着，带着恶鬼般的表情看着%SAVESTR:PLAYER%………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的指甲在地上“吱吱”的抓着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '854',
        any: [/PRINTFORMW 「额…结束了吗…？」/],
      }, // PRINTFORMW 「额…结束了吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '855',
        any: [/PRINTFORMW %SAVESTR:TARGET%擦了擦嘴角、把脸背向%SAVESTR:PLAYER%………/],
      }, // PRINTFORMW %SAVESTR:TARGET%擦了擦嘴角、把脸背向%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '861',
        any: [/PRINTFORMW 「呼呼…终于结束了、请你快回去………」/],
      }, // PRINTFORMW 「呼呼…终于结束了、请你快回去………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '862',
        any: [/PRINTFORMW %SAVESTR:TARGET%擦着眼角、用床单将身体包裹起来………/],
      }, // PRINTFORMW %SAVESTR:TARGET%擦着眼角、用床单将身体包裹
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '868',
        any: [/PRINTFORMW 「已经…如果再这样下去…我就………呼…呼…」/],
      }, // PRINTFORMW 「已经…如果再这样下去…我就………呼…呼…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '869',
        any: [/PRINTFORMW %SAVESTR:TARGET%伏在床上剧烈的呼吸着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%伏在床上剧烈的呼吸着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '870',
        any: [/PRINTFORMW 「狂王大人救救我………」/],
      }, // PRINTFORMW 「狂王大人救救我………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '876',
        any: [/PRINTFORMW 「啊啊真是的…我感觉一点也不够啊…呐…难道是对我的身体厌倦了吗？」/],
      }, // PRINTFORMW 「啊啊真是的…我感觉一点也不够啊…呐…难道是对我的身体厌倦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '877',
        any: [/PRINTFORMW %SAVESTR:TARGET%相当不满的嘟着嘴。/],
      }, // PRINTFORMW %SAVESTR:TARGET%相当不满的嘟着嘴。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '878',
        any: [/PRINTFORMW 「下次…要更加激烈的………啊？」/],
      }, // PRINTFORMW 「下次…要更加激烈的………啊？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '883',
        any: [/PRINTFORMW 「呼啊呼啊…如果再抱我一下…就满足了………%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「呼啊呼啊…如果再抱我一下…就满足了………%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '884',
        any: [/PRINTFORMW 被汗水和各种其他体液沾满的%SAVESTR:TARGET%横倒在一旁。/],
      }, // PRINTFORMW 被汗水和各种其他体液沾满的%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '885',
        any: [/PRINTFORMW 「呐…下次什么时候侵犯我呢…？」/],
      }, // PRINTFORMW 「呐…下次什么时候侵犯我呢…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '891',
        any: [/PRINTFORMW 「今天…只是这样就可以了吗…？」/],
      }, // PRINTFORMW 「今天…只是这样就可以了吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '892',
        any: [/PRINTFORMW %SAVESTR:TARGET%有点担心的窥探着你的表情。/],
      }, // PRINTFORMW %SAVESTR:TARGET%有点担心的窥探着你的表情。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '893',
        any: [/PRINTFORMW 「更…更肆无忌惮一点的做也没关系哦………」/],
      }, // PRINTFORMW 「更…更肆无忌惮一点的做也没关系哦………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '898',
        any: [/PRINTFORMW 「哈呼…您是这么的爱我啊…实在是万分感谢%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「哈呼…您是这么的爱我啊…实在是万分感谢%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '899',
        any: [/PRINTFORMW %SAVESTR:TARGET%把脸贴在你的手上回味着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%把脸贴在你的手上回味着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '900',
        any: [/PRINTFORMW 「我是魔王大人的东西，让我更加的和您在一起吧………」/],
      }, // PRINTFORMW 「我是魔王大人的东西，让我更加的和您在一起吧………」
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
