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
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%更容易沦陷，把她扔进实验室进行了魔族化的改造。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '89',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受到了难以置信的打击。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '90',
        any: [
          /PRINTFORMW 「哈、啊，混账魔王！啊、啊啊啊啊！一声招呼也不打就对我做出这种可恨的事情！你一定会后悔的！」/,
        ],
      }, // PRINTFORMW 「哈、啊，混账魔王！啊、啊啊啊啊！一声招呼也不打就对我做出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '91',
        any: [
          /PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴~%SAVESTR:TARGET%的情绪和反应都基本上在预料中、改造完全成功了。/,
        ],
      }, // PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴~
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '92',
        any: [
          /PRINTFORMW 「什、什么啊！你在盯着看什么呢\.\.\.？真让人恶心！离我远一点，不要靠近我…！」/,
        ],
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
        any: [
          /PRINTFORMW 抓到她后都不让她洗澡、所以看起来有点脏兮兮的。尽管如此，漂亮的金发也让人感到美丽，这昏暗的监狱甚至也让人感到了高贵。闪闪发亮的眼中显示出坚定的目光，看向%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW 抓到她后都不让她洗澡、所以看起来有点脏兮兮的。尽管如此，漂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '101',
        any: [
          /PRINTFORMW 「关于你抓到的那些勇者变成什么样…以前只是听说过一些传闻罢了」/,
        ],
      }, // PRINTFORMW 「关于你抓到的那些勇者变成什么样…以前只是听说过一些传闻罢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '102',
        any: [/PRINTFORMW 「而实际上变成什么样子了…现在也亲眼确认了」/],
      }, // PRINTFORMW 「而实际上变成什么样子了…现在也亲眼确认了」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '103',
        any: [
          /PRINTFORMW 是在说抓住%SAVESTR:TARGET%的%SAVESTR:PLAYER%的下仆的勇者的事吧、然后%SAVESTR:TARGET%吞了吞口水。吞口水的声音连这边都能听得到。/,
        ],
      }, // PRINTFORMW 是在说抓住%SAVESTR:TARGET%的%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '104',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%深深吸了一口气，用呼喊般的口气，对%SAVESTR:PLAYER%大声的宣告了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%深深吸了一口气，用呼喊般的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '105',
        any: [
          /PRINTFORMW 「如果觉得吾像是那种…奴隷…最低级的家伙、被消遣的那种差劲的东西，那就大错特错了！我绝对不会向你屈服的！」/,
        ],
      }, // PRINTFORMW 「如果觉得吾像是那种…奴隷…最低级的家伙、被消遣的那种差劲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '106',
        any: [
          /PRINTFORMW 思量着方才刺耳的宣言。%SAVESTR:PLAYER%皱起了眉头。而%SAVESTR:TARGET%露出一副满不在乎的神气样子。/,
        ],
      }, // PRINTFORMW 思量着方才刺耳的宣言。%SAVESTR:PLAYER%皱起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '107',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '108',
        any: [
          /PRINTFORMW 然而过去也有数不清的勇者说过这句话，%SAVESTR:PLAYER%感到了强烈的即视感。/,
        ],
      }, // PRINTFORMW 然而过去也有数不清的勇者说过这句话，%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '109',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这个小妞还想负隅顽抗、%SAVESTR:PLAYER%可以大展身手随心所欲的用自己喜欢的方法开发了，她的命运已经被决定了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%这个小妞还想负隅顽抗、%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '110',
        any: [
          /PRINTFORMW 考虑着那样的事%SAVESTR:PLAYER%的嘴角露出了愉悦的笑容。调教开始………/,
        ],
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
        any: [
          /PRINTFORMW 话说回来%SAVESTR:TARGET%的人物简介那里似乎写着「初体験的对象：狂王」的样子。/,
        ],
      }, // PRINTFORMW 话说回来%SAVESTR:TARGET%的人物简介那里似乎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '115',
        any: [
          /PRINTFORMW 关于这一点，经过盘问和暗访后得知，她好像是狂王的爱人。/,
        ],
      }, // PRINTFORMW 关于这一点，经过盘问和暗访后得知，她好像是狂王的爱人。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '116',
        any: [
          /PRINTFORMW 这真是越来越让人感到愉悦了、把狂王的东西夺走竭尽凌辱，只是想象一下就感觉心中雀跃不已。/,
        ],
      }, // PRINTFORMW 这真是越来越让人感到愉悦了、把狂王的东西夺走竭尽凌辱，只是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '117',
        any: [
          /PRINTFORMW 夺走那颗心让她变成自己的爱人、或者叫怪物去侵袭她，让她怀上野兽的孩子也不错吧。/,
        ],
      }, // PRINTFORMW 夺走那颗心让她变成自己的爱人、或者叫怪物去侵袭她，让她怀上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '118',
        any: [
          /PRINTFORMW 索性把狂王的恋人给变成只会享乐的母猪，这样也蛮不错的………/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%方便陷落，把她推进实验室进行了魔族化改造。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '126',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受到了难以置信的打击。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%表面上看似很平静，实际上受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '127',
        any: [
          /PRINTFORMW 「把我变成肮脏的魔族会让你感到满足？差劲！那个恶心的笑…真让人厌恶」/,
        ],
      }, // PRINTFORMW 「把我变成肮脏的魔族会让你感到满足？差劲！那个恶心的笑…真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '128',
        any: [
          /PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴%SAVESTR:TARGET%的情绪和反应基本上在预料中、改造完全成功了。/,
        ],
      }, // PRINTFORMW 青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '129',
        any: [
          /PRINTFORMW 「啊…要是这种姿态被狂王大人看见的话…已经想去死了啦………！」/,
        ],
      }, // PRINTFORMW 「啊…要是这种姿态被狂王大人看见的话…已经想去死了啦………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '130',
        any: [
          /PRINTFORMW 令人吃惊%SAVESTR:TARGET%好像还有逃出去的意志和企图。%SAVESTR:PLAYER%似乎感到很有趣，带着微笑开始了调教………/,
        ],
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
        any: [
          /PRINTFORMW 「啊、魔王大人…哇、我…又像以前那样对您刀剑相向了啊…您、请您原谅…」/,
        ],
      }, // PRINTFORMW 「啊、魔王大人…哇、我…又像以前那样对您刀剑相向了啊…您、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '143',
        any: [/PRINTFORMW %SAVESTR:TARGET%把头贴在地面上下跪请罪/],
      }, // PRINTFORMW %SAVESTR:TARGET%把头贴在地面上下跪请罪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '144',
        any: [
          /PRINTFORMW 「不仅是这样，身体也又接受了狂王…那样…那样的事情…对不起、对不起………」/,
        ],
      }, // PRINTFORMW 「不仅是这样，身体也又接受了狂王…那样…那样的事情…对不起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '145',
        any: [
          /PRINTFORMW 不停地道歉，非常惶恐。只是把手放在%SAVESTR:TARGET%的肩上，也吓得她身躯一震。/,
        ],
      }, // PRINTFORMW 不停地道歉，非常惶恐。只是把手放在%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '146',
        any: [/PRINTFORMW 「您、您能原谅我吗！………万分感谢！万分感谢！」/],
      }, // PRINTFORMW 「您、您能原谅我吗！………万分感谢！万分感谢！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '147',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抬起头，涕泪涟涟把美丽的脸庞都弄难看了。%SAVESTR:PLAYER%一边苦笑着一边帮她拭去脸上的脏污。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抬起头，涕泪涟涟把美丽的脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '148',
        any: [
          /PRINTFORMW 不过因为全身上下都是狂王遗留的秽物，%SAVESTR:TARGET%身体的清洗是必须要做的………/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边打着呵欠，一边冲%SAVESTR:PLAYER%随意的打着招呼、毫不客气。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边打着呵欠，一边冲%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '155',
        any: [/PRINTFORMW 「我还被魔王大人宠爱着嘛~~？」/],
      }, // PRINTFORMW 「我还被魔王大人宠爱着嘛~~？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '156',
        any: [
          /PRINTFORMW 明明整个身体都被狂王狠狠的侵犯凌辱了，还对着%SAVESTR:PLAYER%扭捏献媚。让%SAVESTR:PLAYER%不由得叹了口气。/,
        ],
      }, // PRINTFORMW 明明整个身体都被狂王狠狠的侵犯凌辱了，还对着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '157',
        any: [
          /PRINTFORMW 「现在我又变回魔王大人的专用小穴奴隶啦\.\.\.像以前那样侵犯我吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「现在我又变回魔王大人的专用小穴奴隶啦...像以前那样侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '159',
        any: [/CFLAG:650 = 0/],
      }, // CFLAG:650 = 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '161',
        any: [
          /PRINTFORMW 「哈啊…又被你抓住了啊、真是失策………诶？你看了那个水晶球？」/,
        ],
      }, // PRINTFORMW 「哈啊…又被你抓住了啊、真是失策………诶？你看了那个水晶球
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '162',
        any: [/PRINTFORMW %SAVESTR:TARGET%的脸唰的红了。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸唰的红了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '163',
        any: [
          /PRINTFORMW 「嘛！嘛！怎么回事嘛！明明约定说不会让别人看见那个水晶球的内容！」/,
        ],
      }, // PRINTFORMW 「嘛！嘛！怎么回事嘛！明明约定说不会让别人看见那个水晶球的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '164',
        any: [
          /PRINTFORMW 「………哎呀、你那个表情是什么嘛？在抱怨我和狂王大人“爱的记忆”吗？哎呀、要惩罚我吗…」/,
        ],
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
        any: [
          /PRINTFORMW 虽然在上次调教受到了屈辱的对待，不过%SAVESTR:TARGET%比想象中的更能忍受嘛。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出厌烦的样子皱着眉，瞪着%SAVESTR:PLAYER%/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出厌烦的样子皱着眉，瞪着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '188',
        any: [
          /PRINTFORMW ”上次的调教，好像有谁很不成体统呢”，在%SAVESTR:TARGET%耳边低声私语，她的脸唰的红了。/,
        ],
      }, // PRINTFORMW ”上次的调教，好像有谁很不成体统呢”，在%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '189',
        any: [
          /PRINTFORMW 「呼、你在开玩笑吧！和你做那种事只会感觉到恶心而已！」/,
        ],
      }, // PRINTFORMW 「呼、你在开玩笑吧！和你做那种事只会感觉到恶心而已！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '190',
        any: [
          /PRINTFORMW 「啊啊啊…真想早点从这里逃走，回到狂王大人温暖的怀抱里去，那才叫心情舒畅！」」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%面容十分憔悴，仅仅看到%SAVESTR:PLAYER%的脸就已经害怕的后退了/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%面容十分憔悴，仅仅看到%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '199',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%嘲笑着她的样子，命令%SAVESTR:TARGET%脱光衣服，金红桃艰难的鼓起一点勇气瞪着你。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%嘲笑着她的样子，命令%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '200',
        any: [
          /PRINTFORMW 「那样的行为算是什么。这种事情…应该是和喜欢的人在一起，被喜欢的人温柔对待的事！你离我远点！」/,
        ],
      }, // PRINTFORMW 「那样的行为算是什么。这种事情…应该是和喜欢的人在一起，被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '201',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%扭着%SAVESTR:TARGET%的胳膊强行用舌头撬开她的嘴唇、她一边胆怯着反抗，一边感受这滋味。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%扭着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '202',
        any: [
          /PRINTFORMW 「不要！这样的…不承认…不会承认…啊啊啊…快点…放开…真是…啊啊！」/,
        ],
      }, // PRINTFORMW 「不要！这样的…不承认…不会承认…啊啊啊…快点…放开…真是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '203',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被压住双手，强行推到在床上。身体感到疼痛，发出了喘息声。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%慵懒的披着单薄的床单坐在床上，向%SAVESTR:PLAYER%打招呼了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%慵懒的披着单薄的床单坐在床
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '212',
        any: [
          /PRINTFORMW 「又来了啊…像这样和我见面…嗯，已经\{CFLAG:10\}次了呢」/,
        ],
      }, // PRINTFORMW 「又来了啊…像这样和我见面…嗯，已经{CFLAG:10}次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '213',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%无法控制嘴角的笑意，像个小女孩一样哧哧的笑了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%无法控制嘴角的笑意，像个小
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '214',
        any: [
          /PRINTFORMW 「呐…我…更想在你的怀抱里呢…啊哈…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呐…我…更想在你的怀抱里呢…啊哈…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '215',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用舌头舔着嘴唇，做出了妓女一样明显欲求不满的动作，向%SAVESTR:PLAYER%靠近了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用舌头舔着嘴唇，做出了妓女
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '216',
        any: [
          /PRINTFORMW 光是掀开床单一股萎靡的淫臭气味就散发了出来、大概是在%SAVESTR:PLAYER%还没有来的时候自慰了很多次。/,
        ],
      }, // PRINTFORMW 光是掀开床单一股萎靡的淫臭气味就散发了出来、大概是在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '217',
        any: [
          /PRINTFORMW 「脑袋里已经…无时无刻不在想着做爱了…%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了什么魅魔的巢穴一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '231',
        any: [/PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '232',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的魔力、粉红色的瘴气聚集到了肉眼能观测到的浓度。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '233',
        any: [
          /PRINTFORMW 「求求您快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去了………」/,
        ],
      }, // PRINTFORMW 「求求您快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '234',
        any: [
          /PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，意外的看到了金红桃发情到丧失理智的样子。/,
        ],
      }, // PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，意外的看到了金红桃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '235',
        any: [
          /PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么，这也是字面意思吧、真是完全落陷了%SAVESTR:PLAYER%脸上露出了难抑的笑容。/,
        ],
      }, // PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么，这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '236',
        any: [
          /PRINTFORMW 误解了那个笑容的意思，%SAVESTR:TARGET%马上饥渴的扑了过来/,
        ],
      }, // PRINTFORMW 误解了那个笑容的意思，%SAVESTR:TARGET%马上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '237',
        any: [
          /PRINTFORMW 「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了什么魅魔的巢穴一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%进入房间、感觉就像是进到了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '243',
        any: [/PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊哈…是魔王大人啊…%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '244',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的魔力、粉红色的瘴气到了肉眼能察觉到的浓度。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像不知不觉释放出了淫魔的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '245',
        any: [
          /PRINTFORMW 「快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去了………」/,
        ],
      }, // PRINTFORMW 「快来侵犯我…脑子里已经一塌糊涂了…已经没有肉棒就活不下去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '246',
        any: [
          /PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，看到了金红桃发情到丧失理智的样子。/,
        ],
      }, // PRINTFORMW 从魔族的瞳孔中扑簌扑簌的流下大颗的眼泪，看到了金红桃发情到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '247',
        any: [
          /PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么这也是字面意思吧、真是完全落陷了，%SAVESTR:PLAYER%脸上露出了笑容。/,
        ],
      }, // PRINTFORMW 现在%SAVESTR:TARGET%说想要被男人干什么这也
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '248',
        any: [
          /PRINTFORMW 误解了那个笑容的意思%SAVESTR:TARGET%马上饥渴的扑了过来/,
        ],
      }, // PRINTFORMW 误解了那个笑容的意思%SAVESTR:TARGET%马上饥
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '249',
        any: [
          /PRINTFORMW 「啊啊…我的小穴啊…好难受啊…请快来…快来侵犯我%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW 「嗯…呼…唔…啊哈…魔、魔王大人…欢迎光临%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…呼…唔…啊哈…魔、魔王大人…欢迎光临%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '255',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不久前被改造成了魔族，变得随心所欲、现在正用魔族的尾巴卖力的自慰着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%不久前被改造成了魔族，变得
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '256',
        any: [
          /PRINTFORMW 并没有直接的插进去，而是用尾巴巧妙又激烈的刺激着小穴。沉浸在快感中，连身上的羽毛都一颤一颤的很有感觉。/,
        ],
      }, // PRINTFORMW 并没有直接的插进去，而是用尾巴巧妙又激烈的刺激着小穴。沉浸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '257',
        any: [
          /PRINTFORMW 「真是的…啊啊…差点…咿、咿呀…啊啊啊真是…哈…要去了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「真是的…啊啊…差点…咿、咿呀…啊啊啊真是…哈…要去了…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '258',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%淫魔一般的魔力在房间里漂浮扩散着、这是她发情过度而产生的魔力。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%淫魔一般的魔力在房间里漂浮
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '259',
        any: [
          /PRINTFORMW 「我…已经准备好了…所以…快…快来干我…%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW 「啊啊…魔王大人…我%SAVESTR:TARGET%向您宣誓永远效忠………」/,
        ],
      }, // PRINTFORMW 「啊啊…魔王大人…我%SAVESTR:TARGET%向您宣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '269',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%到现在为止受到了各种残酷的调教，终于坚持不住，对%SAVESTR:PLAYER%完全屈服了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%到现在为止受到了各种残酷的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '270',
        any: [/PRINTFORMW 用着下仆一样的口吻、趴着亲吻着%SAVESTR:PLAYER%的脚/],
      }, // PRINTFORMW 用着下仆一样的口吻、趴着亲吻着%SAVESTR:PLAYE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '271',
        any: [
          /PRINTFORMW 「从今天开始我就是魔王大人的下仆了…请随您喜欢使用我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW 「诶？狂王…大人？哎呀呀、讨厌啦、我的主人只有魔王大人一个人啦」/,
        ],
      }, // PRINTFORMW 「诶？狂王…大人？哎呀呀、讨厌啦、我的主人只有魔王大人一个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '276',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的瞳孔，现在能看到的东西，已经只有%SAVESTR:PLAYER%了。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那个瞳孔能看到的东西，已经只有%SAVESTR:PLAYER%了。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子有点奇怪。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '291',
        any: [
          /PRINTFORMW 「已经被改造成魔族的我…我已经不能回到狂王大人、家…那里去了…不、不想回去了…」/,
        ],
      }, // PRINTFORMW 「已经被改造成魔族的我…我已经不能回到狂王大人、家…那里去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '292',
        any: [
          /PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔王大人这里吧…」/,
        ],
      }, // PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '293',
        any: [
          /PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVESTR:TARGET%从床上爬着下来，一直到%SAVESTR:PLAYER%的脚下才停了下来。/,
        ],
      }, // PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '294',
        any: [
          /PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为忠实的仆人随意使用吧…！」/,
        ],
      }, // PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '295',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分可怜。%SAVESTR:PLAYER%微笑着在她的头上标记了绝度服从的刻印。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '296',
        any: [
          /PRINTFORMW 「啊…谢谢、谢谢…我余生都是魔王大人的东西…%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子有点奇怪。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%呼吸急促红着脸等待着。样子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '303',
        any: [
          /PRINTFORMW 「不但身体沾满污秽，还被改造成了魔族…我已经不能回到狂王大人、家…那里去了…不、不想回去了…」/,
        ],
      }, // PRINTFORMW 「不但身体沾满污秽，还被改造成了魔族…我已经不能回到狂王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '304',
        any: [
          /PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔王大人这里吧…」/,
        ],
      }, // PRINTFORMW 「我已经是魔王大人的东西了…不管做什么都可以…请让我留在魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '305',
        any: [
          /PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVESTR:TARGET%从床上爬着下来，一直到%SAVESTR:PLAYER%的脚前停了下来。/,
        ],
      }, // PRINTFORMW 原本令人吃惊的近乎高傲的自尊心，已经全部舍弃了。%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '306',
        any: [
          /PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为忠实的仆人随意使用吧…！」/,
        ],
      }, // PRINTFORMW 「多么羞耻的调教都无所谓、什么样的命令也没关系、请把我作为
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '307',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分可怜。%SAVESTR:PLAYER%微笑着在她的头上标记了绝度服从的刻印。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%不知所措的样子让人感到十分
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '308',
        any: [
          /PRINTFORMW 「啊…谢谢谢谢…我的余生都是魔王大人的东西…%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发出呻吟般娇艳欲滴的声音,慢慢的靠向%SAVESTR:PLAYER%。比起平时，现在她的样子怪怪的。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%发出呻吟般娇艳欲滴的声音,
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '315',
        any: [
          /PRINTFORMW 「今后也会全心全意的为魔王大人服务%UNICODE\(0x2661\) \*1% 总之今天嘛…让我好好的侍奉您吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「今后也会全心全意的为魔王大人服务%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '316',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%尾巴像是小狗一样来回摇晃着、背翼也像是要展翅高飞一样，明显的感到愉悦。/,
        ],
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
        any: [
          /PRINTFORMW 不管是和她搭话、摇晃肩膀还是殴打她，都没有一点反应………/,
        ],
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
        any: [
          /PRINTFORMW 「啊啊啊…真是够了，被你看到了我这个样子…啊嗯…唔、我该怎么办…？」/,
        ],
      }, // PRINTFORMW 「啊啊啊…真是够了，被你看到了我这个样子…啊嗯…唔、我该怎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '355',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:TARGET%，%SAVESTR:PLAYER%完全阻止不了她们激烈的亲吻，交换唾液。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '356',
        any: [
          /PRINTFORMW 「真是够了！嗯哈…嗯呜呜…真是…为什么这样的事…嗯、啊、你怎么、喜欢这样啊…这、真让人为难！」/,
        ],
      }, // PRINTFORMW 「真是够了！嗯哈…嗯呜呜…真是…为什么这样的事…嗯、啊、你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '357',
        any: [
          /PRINTFORMW 『嗯啊，%SAVESTR:TARGET%隊長、虽然是在这里，但是我要向您告白…我一直都喜欢您』/,
        ],
      }, // PRINTFORMW 『嗯啊，%SAVESTR:TARGET%隊長、虽然是在这里
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '358',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根都红透了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '359',
        any: [/CFLAG:202 = 2/],
      }, // CFLAG:202 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '362',
        any: [
          /PRINTFORMW 「哎呀…你直到刚才都在被魔王大人的精液灌得满满的吧…表情真的好淫乱啊…哇、喂喂、突然抱住我什么的…真是够了！？」/,
        ],
      }, // PRINTFORMW 「哎呀…你直到刚才都在被魔王大人的精液灌得满满的吧…表情真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '363',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:TARGET%，%SAVESTR:PLAYER%完全阻止不了她们激烈的亲吻，交换唾液。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '364',
        any: [
          /PRINTFORMW 「真是够了！呼唔…啾啾…唔啊哇哇哇…原来你喜欢百合诶、有点吃惊啊…诶？从前就一直喜欢我了？…呵呵，感觉还不错呗」/,
        ],
      }, // PRINTFORMW 「真是够了！呼唔…啾啾…唔啊哇哇哇…原来你喜欢百合诶、有点
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '365',
        any: [
          /PRINTFORMW 『%SAVESTR:TARGET%队长成了魔王大人的东西的话、不管是什么样的深渊，我都陪着队长一起堕落在其中吧』/,
        ],
      }, // PRINTFORMW 『%SAVESTR:TARGET%队长成了魔王大人的东西的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '366',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根都红透了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，连耳根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '367',
        any: [/CFLAG:202 = 2/],
      }, // CFLAG:202 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '370',
        any: [
          /PRINTFORMW 「哈？你居然投降了魔王军吗…居然还是那副姿态…真是够了！喂你做什么…快放开我！」/,
        ],
      }, // PRINTFORMW 「哈？你居然投降了魔王军吗…居然还是那副姿态…真是够了！喂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '371',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:TARGET%，%SAVESTR:PLAYER%完全阻止不了她激烈的亲吻。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%紧紧的抱住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '372',
        any: [
          /PRINTFORMW 「真是够了！嗯嗯啊咿呀！！停、什么啊…嗯、很久以前就一直喜欢我了…？那、那是、说谎吧………」/,
        ],
      }, // PRINTFORMW 「真是够了！嗯嗯啊咿呀！！停、什么啊…嗯、很久以前就一直喜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '373',
        any: [
          /PRINTFORMW 『不是的！绝对不是谎言………我听说你被关押在这做俘虏、就一直在等待这个机会了』/,
        ],
      }, // PRINTFORMW 『不是的！绝对不是谎言………我听说你被关押在这做俘虏、就一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '374',
        any: [/PRINTFORMW 『我一直爱着你』/],
      }, // PRINTFORMW 『我一直爱着你』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '375',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为意想不到的告白，受到了巨大的打击………/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%陷落了、难看的匍匐在%SAVESTR:PLAYER%的脚下。那个身姿，连%SAVESTR:ASSI%也嘲弄着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%陷落了、难看的匍匐在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '387',
        any: [/PRINTFORMW 「讨厌\.\.\.啊、请不要再看了…」/],
      }, // PRINTFORMW 「讨厌...啊、请不要再看了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '388',
        any: [
          /PRINTFORMW 『呵呵、我一点也不在乎、隊長、尽情和您喜欢的魔王大人做爱吧』/,
        ],
      }, // PRINTFORMW 『呵呵、我一点也不在乎、隊長、尽情和您喜欢的魔王大人做爱吧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '389',
        any: [/PRINTFORMW 「哎呀、这样好么？你不是一直爱着我吗？」/],
      }, // PRINTFORMW 「哎呀、这样好么？你不是一直爱着我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '390',
        any: [
          /PRINTFORMW 『当然现在也爱队长啊、因为是魔王大人，所以同时爱着队长的话、完全没有问题！』/,
        ],
      }, // PRINTFORMW 『当然现在也爱队长啊、因为是魔王大人，所以同时爱着队长的话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '391',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了惊讶的表情。%SAVESTR:PLAYER%大笑着看着这个难以理解的状况，享受着。/,
        ],
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
        any: [
          /PRINTFORMW 『虽然从魔王大人那里听说了相当有趣的事情、不过您的变化还真是大呢、隊長』/,
        ],
      }, // PRINTFORMW 『虽然从魔王大人那里听说了相当有趣的事情、不过您的变化还真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '397',
        any: [
          /PRINTFORMW 「哎呀…%SAVESTR:ASSI%嘛？ 呵呵…我现在是魔王大人的一只雌犬了、不过魔王大人允许的话，也可以给你抱一抱呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哎呀…%SAVESTR:ASSI%嘛？ 呵呵…我现在是魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '398',
        any: [
          /PRINTFORMW 「嗯哼哼、这次尝试和你用更淫乱的方法“亲吻”也不错呢~」/,
        ],
      }, // PRINTFORMW 「嗯哼哼、这次尝试和你用更淫乱的方法“亲吻”也不错呢~」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '399',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了淫乱的微笑、过去那个身姿被彻底的改变了。%SAVESTR:ASSI%只能苦笑。/,
        ],
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
        any: [
          /PRINTFORMW 「你的心情我是明白了、但是我是魔王大人的东西…哼、啊、不行呃………」/,
        ],
      }, // PRINTFORMW 「你的心情我是明白了、但是我是魔王大人的东西…哼、啊、不行
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '409',
        any: [
          /PRINTFORMW 『放心吧，这是魔王大人允许的。啊~、果然队长您真是太可爱了…我…我已经忍不住了…！』/,
        ],
      }, // PRINTFORMW 『放心吧，这是魔王大人允许的。啊~、果然队长您真是太可爱了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '410',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%狠狠的拥抱着露出了困惑的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '413',
        any: [
          /PRINTFORMW 「呵呵呵、你这么喜欢我的话…把我的身体弄得乱七八糟也没有关系哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、你这么喜欢我的话…把我的身体弄得乱七八糟也没有关
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '414',
        any: [
          /PRINTFORMW 『%SAVESTR:TARGET%隊長…哈哈、这样…这样淫乱的堕落了………！』/,
        ],
      }, // PRINTFORMW 『%SAVESTR:TARGET%隊長…哈哈、这样…这样淫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '415',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%张开双腿谄媚的淫乱姿态，让%SAVESTR:ASSI%看着不禁躁动了起来………/,
        ],
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
        any: [
          /PRINTFORMW 『哼哼哼、不要紧！我会用自己的全部技巧让您绝顶不断~♪』/,
        ],
      }, // PRINTFORMW 『哼哼哼、不要紧！我会用自己的全部技巧让您绝顶不断~♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '422',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%发出恳求的声音、但这反而让%SAVESTR:ASSI%越来越有干劲了………/,
        ],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%发出恳求的声音、但这反
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '423',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '432',
        any: [
          /PRINTFORMW 「你现在………也是魔王大人的东西了？…啊啊、总觉得有一点嫉妒呢」/,
        ],
      }, // PRINTFORMW 「你现在………也是魔王大人的东西了？…啊啊、总觉得有一点嫉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '433',
        any: [
          /PRINTFORMW 言语不和啊，%SAVESTR:PLAYER%在一旁站着观察着：%SAVESTR:ASSI%冷冷的瞪着%SAVESTR:TARGET%。woooooow~~~了解她们的关系了/,
        ],
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
        any: [
          /PRINTFORMW 一如既往的带着奇怪的高傲感和自尊心，大概%SAVESTR:ASSI%因此稍微安心了一点（害羞）………/,
        ],
      }, // PRINTFORMW 一如既往的带着奇怪的高傲感和自尊心，大概%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '437',
        any: [/CFLAG:203 = 2/],
      }, // CFLAG:203 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '440',
        any: [
          /PRINTFORMW 「别一直抱着魔王大人不放啊…喂喂，你到底要和魔王大人来几次啊！？」/,
        ],
      }, // PRINTFORMW 「别一直抱着魔王大人不放啊…喂喂，你到底要和魔王大人来几次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '441',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着曾经的同伴堕落的姿态，露出很开心的样子。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着曾经的同伴堕落的姿态，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '442',
        any: [
          /PRINTFORMW 看着%SAVESTR:ASSI%堕入淫乱的深渊，%SAVESTR:TARGET%也渐渐发情了，呼吸逐渐粗重了起来。/,
        ],
      }, // PRINTFORMW 看着%SAVESTR:ASSI%堕入淫乱的深渊，%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '443',
        any: [
          /PRINTFORMW 『啊啊、我在被魔王大人狠狠的侵犯…呼呼…已经离不开魔王大人的肉棒了%UNICODE\(0x2661\) \*1%』/,
        ],
      }, // PRINTFORMW 『啊啊、我在被魔王大人狠狠的侵犯…呼呼…已经离不开魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '444',
        any: [
          /PRINTFORMW 「你也相当………算啦、反正我也比较喜欢现在的你，没差啦」/,
        ],
      }, // PRINTFORMW 「你也相当………算啦、反正我也比较喜欢现在的你，没差啦」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '445',
        any: [/CFLAG:203 = 2/],
      }, // CFLAG:203 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '448',
        any: [
          /PRINTFORMW 「呵呵、你就是魔王的助手吗。那双手握着阴茎要比握着武器更适合妳嘛」/,
        ],
      }, // PRINTFORMW 「呵呵、你就是魔王的助手吗。那双手握着阴茎要比握着武器更适
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '449',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%的表情变得很恼怒，故意狠狠的用手揉弄着%SAVESTR:TARGET%的巨乳、在她耳边低语着什么。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%的表情变得很恼怒，故意狠狠的用
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '450',
        any: [
          /PRINTFORMW 「嗬咿呀！痛！痛死了！啊、说什么…？”你也会陷落”怎么可能？这种愚蠢的事情…！」/,
        ],
      }, // PRINTFORMW 「嗬咿呀！痛！痛死了！啊、说什么…？”你也会陷落”怎么可能
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '451',
        any: [
          /PRINTFORMW 『我过去的队长啊、你马上就会知道了——你只不过是一只肮脏的雌犬』/,
        ],
      }, // PRINTFORMW 『我过去的队长啊、你马上就会知道了——你只不过是一只肮脏的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '452',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的视线对上黑方片，看到%SAVESTR:ASSI%那双嗜虐的眼睛、不由得低头沉默了………/,
        ],
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
        any: [
          /PRINTFORMW 『看吧、我当时说的话应验了吧、%SAVESTR:TARGET%隊長』/,
        ],
      }, // PRINTFORMW 『看吧、我当时说的话应验了吧、%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '463',
        any: [/PRINTFORMW 「嗯？」/],
      }, // PRINTFORMW 「嗯？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '464',
        any: [
          /PRINTFORMW 听到意想不到的话，%SAVESTR:TARGET%瞬间凝固。然后恢复正常盯着%SAVESTR:ASSI%。/,
        ],
      }, // PRINTFORMW 听到意想不到的话，%SAVESTR:TARGET%瞬间凝固
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '465',
        any: [
          /PRINTFORMW 『你也和我一样成为魔王大人的奴隶了、从现在开始就是魔王大人的亲卫队了哦♪』/,
        ],
      }, // PRINTFORMW 『你也和我一样成为魔王大人的奴隶了、从现在开始就是魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '466',
        any: [/PRINTFORMW 「…这、应该说谢谢呢？」/],
      }, // PRINTFORMW 「…这、应该说谢谢呢？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '467',
        any: [
          /PRINTFORMW 『呵呵、在床上的话就另当别论了、为了成为魔王大人最喜爱的奴隶我什么侍奉都会做的%UNICODE\(0x2661\) \*1%』/,
        ],
      }, // PRINTFORMW 『呵呵、在床上的话就另当别论了、为了成为魔王大人最喜爱的奴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '468',
        any: [
          /PRINTFORMW 「明白了、那就由魔王大人来决定谁侍奉的更好吧！%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW 「呼…\\@TIME == 0 \? 今日 # 今夜\\@%SAVESTR:ASSI%来和我一起玩3p吗？」/,
        ],
      }, // PRINTFORMW 「呼…\@TIME == 0 ? 今日 # 今夜\@%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '474',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出一脸飘飘然的表情，跟%SAVESTR:PLAYER%一起和%SAVESTR:ASSI%打了招呼。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出一脸飘飘然的表情，跟%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '475',
        any: [
          /PRINTFORMW 『啊啊、%SAVESTR:TARGET%、真是漂亮的表情。魔王大人已经看到你这副可爱的样子了吗？』/,
        ],
      }, // PRINTFORMW 『啊啊、%SAVESTR:TARGET%、真是漂亮的表情。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '476',
        any: [
          /PRINTFORMW 「嗯嗯、是的哦…不管是小穴还是肛门都已经稀里哗啦的湿透了哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯嗯、是的哦…不管是小穴还是肛门都已经稀里哗啦的湿透了哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '477',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边淫乱的笑着一边把手放在股间摩擦着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边淫乱的笑着一边把手放在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '478',
        any: [
          /PRINTFORMW 『哎呀哎呀、%SAVESTR:TARGET%，今后我就承认你是魔王大人的淫穴队长吧♪』/,
        ],
      }, // PRINTFORMW 『哎呀哎呀、%SAVESTR:TARGET%，今后我就承认
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '479',
        any: [
          /PRINTFORMW 「啊哈…淫穴队长…多么好听的名字呢%UNICODE\(0x2661\) \*1% …没问题啦、就交给我和我的小穴了%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW 「哎呀、\\@TIME == 0 \? 今日 # 今夜\\@是三个人一起享受吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哎呀、\@TIME == 0 ? 今日 # 今夜\@是三
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '488',
        any: [/PRINTFORMW 『那么、首先让作为奴隶的我为魔王大人服务吧』/],
      }, // PRINTFORMW 『那么、首先让作为奴隶的我为魔王大人服务吧』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '489',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%对%SAVESTR:PLAYER%作为奴隶的侍奉服务开始了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '492',
        any: [
          /PRINTFORMW 「哈啊…来啊…%SAVESTR:ASSI%。我快受不了了，一起来满满的灌注给我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…来啊…%SAVESTR:ASSI%。我快受不了了，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '493',
        any: [
          /PRINTFORMW 一边发出甜腻的献媚声音，%SAVESTR:TARGET%一边分开自己的身体诱惑着%SAVESTR:ASSI%。/,
        ],
      }, // PRINTFORMW 一边发出甜腻的献媚声音，%SAVESTR:TARGET%一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '494',
        any: [
          /PRINTFORMW 『哼哼哼、队长摆出这样的姿态真是无法拒绝的邀请啊~♪』/,
        ],
      }, // PRINTFORMW 『哼哼哼、队长摆出这样的姿态真是无法拒绝的邀请啊~♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '498',
        any: [/PRINTFORMW 「比我弱小的家伙，不管对我做什么我都不会在意的…呼」/],
      }, // PRINTFORMW 「比我弱小的家伙，不管对我做什么我都不会在意的…呼」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '499',
        any: [
          /PRINTFORMW 『是这样吗？被我做着这样的事，”弱小”？还在说着什么了不起的话啊、”隊長”』/,
        ],
      }, // PRINTFORMW 『是这样吗？被我做着这样的事，”弱小”？还在说着什么了不起
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '500',
        any: [
          /PRINTFORMW 因为被挑衅了，%SAVESTR:ASSI%抓住%SAVESTR:TARGET%的巨乳尽情的拧捏，%SAVESTR:TARGET%发出了痛苦的声音………/,
        ],
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
        any: [
          /PRINTFORMW 『嗯~~~魔王大人非常喜欢这淫乱的东西呢、一直被充分的疼爱着呢♪』/,
        ],
      }, // PRINTFORMW 『嗯~~~魔王大人非常喜欢这淫乱的东西呢、一直被充分的疼爱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '514',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的语调中有着明显的嫉妒情绪，随着%SAVESTR:ASSI%股间耷拉着的阴茎和淫乱的话语，下体逐渐变湿润了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的语调中有着明显的嫉妒情绪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '515',
        any: [
          /PRINTFORMW 「\\@TIME == 0 \? 今日 # 今夜\\@既然你被魔王大人疼爱着的话…嘛，也罢、没关系………」/,
        ],
      }, // PRINTFORMW 「\@TIME == 0 ? 今日 # 今夜\@既然你被魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '516',
        any: [
          /PRINTFORMW 但是%SAVESTR:TARGET%的眼睛已经不能从%SAVESTR:ASSI%的阴茎移开了。/,
        ],
      }, // PRINTFORMW 但是%SAVESTR:TARGET%的眼睛已经不能从%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '517',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '520',
        any: [
          /PRINTFORMW 「你也变成魔王大人的肉欲玩具了吗…啊呀、那个可爱的阴茎能让魔王大人满足么？」/,
        ],
      }, // PRINTFORMW 「你也变成魔王大人的肉欲玩具了吗…啊呀、那个可爱的阴茎能让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '521',
        any: [
          /PRINTFORMW 『呼呼呼、那是我和魔王大人两个人的秘密哦、%SAVESTR:TARGET%隊長♪』/,
        ],
      }, // PRINTFORMW 『呼呼呼、那是我和魔王大人两个人的秘密哦、%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '522',
        any: [
          /PRINTFORMW 「虽然从圣灵堡垒的某处偶然听到了你是扶她的消息、没想到能在这种地方“品尝”到扶她的滋味…♪」/,
        ],
      }, // PRINTFORMW 「虽然从圣灵堡垒的某处偶然听到了你是扶她的消息、没想到能在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '523',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:ASSI%的阴茎变得兴奋起来了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:AS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '524',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想到今后会被%SAVESTR:ASSI%的阴茎侵犯，说不定是满怀期待呢………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%想到今后会被%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '525',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '528',
        any: [
          /PRINTFORMW 「什么啊、你居然在这里取悦魔王？%SAVESTR:ASSI%！以前就觉得你奇怪了，没想到是这样的人！」/,
        ],
      }, // PRINTFORMW 「什么啊、你居然在这里取悦魔王？%SAVESTR:ASSI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '529',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为旧部下的背叛，信念和声音都不禁动摇了。%SAVESTR:ASSI%哎呀着耸了耸肩，用裤裆里的东西压在了%SAVESTR:TARGET%的身体上。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为旧部下的背叛，信念和声
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '530',
        any: [
          /PRINTFORMW 「唔嗷！扶、扶她…？虽然在狂王大人那里听说了，没想到真的是这样…诶？这样的话…啊、放肆…你在做什么…？」/,
        ],
      }, // PRINTFORMW 「唔嗷！扶、扶她…？虽然在狂王大人那里听说了，没想到真的是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '531',
        any: [
          /PRINTFORMW 『没想到、呵呵，%SAVESTR:TARGET%队长会变成犯人这种事情我也没有想过呢、不过没关系，让我带队长前往愉悦的天国吧♪』/,
        ],
      }, // PRINTFORMW 『没想到、呵呵，%SAVESTR:TARGET%队长会变成
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '532',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的面色变得铁青、今后会发出怎样的悲鸣呢？真令人期待………/,
        ],
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
        any: [
          /PRINTFORMW 『队长也成为魔王大人的东西了呢。呼呼呼、做为纪念就在魔王大人面前侵犯你好了%UNICODE\(0x2661\) \*1%』/,
        ],
      }, // PRINTFORMW 『队长也成为魔王大人的东西了呢。呼呼呼、做为纪念就在魔王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '542',
        any: [/PRINTFORMW 「不、不要…那样的话我会因羞耻而死的」/],
      }, // PRINTFORMW 「不、不要…那样的话我会因羞耻而死的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '543',
        any: [
          /PRINTFORMW 『都到现在了还在说什么呢？在魔王大人面前被我侵犯那么多次了、用那么让人讨厌的眼神看着我…那难道不是在引诱我吗？』/,
        ],
      }, // PRINTFORMW 『都到现在了还在说什么呢？在魔王大人面前被我侵犯那么多次了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '544',
        any: [
          /PRINTFORMW 「不、不一样！不是这样的！　魔王大人！魔王大人也会憎恨我被别人侵犯吧？」/,
        ],
      }, // PRINTFORMW 「不、不一样！不是这样的！　魔王大人！魔王大人也会憎恨我被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '545',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在拼命的寻求帮助、但%SAVESTR:PLAYER%只是在一旁笑笑而已。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在拼命的寻求帮助、但%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '546',
        any: [
          /PRINTFORMW 『放心吧，如果是魔王大人的命令，我也不会违背的、所以不行的话我不会上的啦、大概吧♪』/,
        ],
      }, // PRINTFORMW 『放心吧，如果是魔王大人的命令，我也不会违背的、所以不行的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '547',
        any: [/CFLAG:204 = 2/],
      }, // CFLAG:204 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '550',
        any: [
          /PRINTFORMW 「哈哈…呐、%SAVESTR:ASSI%、拜托你咯、我的小穴和肛门都想要你的肉棒呢、想要绝顶！」/,
        ],
      }, // PRINTFORMW 「哈哈…呐、%SAVESTR:ASSI%、拜托你咯、我的小
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '551',
        any: [
          /PRINTFORMW 『魔王大人真是厉害呢、能把那个%SAVESTR:TARGET%队长调教到如此淫乱的程度』/,
        ],
      }, // PRINTFORMW 『魔王大人真是厉害呢、能把那个%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '552',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%看着%SAVESTR:TARGET%凌乱的姿态不由的发出赞叹。那个%SAVESTR:TARGET%四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%看着%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '553',
        any: [
          /PRINTFORMW 「不要只站在那里看啊…啊啊…拜托了！拜托了！%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「不要只站在那里看啊…啊啊…拜托了！拜托了！%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '554',
        any: [
          /PRINTFORMW 『魔王大人、怎么处理呢？我觉得就这么放着也蛮有意思呢♪』/,
        ],
      }, // PRINTFORMW 『魔王大人、怎么处理呢？我觉得就这么放着也蛮有意思呢♪』
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '555',
        any: [
          /PRINTFORMW 看着%SAVESTR:TARGET%那副可怜的发情姿态、%SAVESTR:ASSI%愉悦的笑了………/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:PLAYER%和%SAVESTR:ASSI%排着队的阴茎变得十分的兴奋。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '565',
        any: [
          /PRINTFORMW 『现在的你多么的富有魅力你恐怕不明白吧、让人想狠狠的随意摆布、玩弄你呢』/,
        ],
      }, // PRINTFORMW 『现在的你多么的富有魅力你恐怕不明白吧、让人想狠狠的随意摆
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '568',
        any: [
          /PRINTFORMW 「啊真是的…魔王大人、%SAVESTR:ASSI%好想要阴茎…两个人一起随便你们侵犯我的哪里吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊真是的…魔王大人、%SAVESTR:ASSI%好想要阴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '569',
        any: [
          /PRINTFORMW \\@RAND:2 == 0 \? %SAVESTR:TARGET%四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。 # %SAVESTR:TARGET%躺在地上分开大腿，用手指插进小穴和肛门狠狠的搅动着、引诱着%SAVESTR:PLAYER%和%SAVESTR:ASSI%。\\@/,
        ],
      }, // PRINTFORMW \@RAND:2 == 0 ? %SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '570',
        any: [
          /PRINTFORMW 『啊魔王大人…\\@TIME == 0 \? 今日 # 今夜\\@%SAVESTR:TARGET%隊長的\\@RAND:2 == 0 \? 菊花 # 小穴\\@就让我侵犯吧♪』/,
        ],
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
        any: [
          /PRINTFORMW 好像要证明这句话的正确性、%SAVESTR:TARGET%的眼睛不时的看向%SAVESTR:ASSI%股间的阴茎………/,
        ],
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
        any: [
          /PRINTFORMW 精神完全的崩溃了的%SAVESTR:TARGET%，无论%SAVESTR:PLAYER%弄什么都毫无反应………/,
        ],
      }, // PRINTFORMW 精神完全的崩溃了的%SAVESTR:TARGET%，无论%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '595',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '599',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出憎恨的目光，对%SAVESTR:PLAYER%怒目而视。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出憎恨的目光，对%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '600',
        any: [/PRINTFORMW 「如果不想受伤，就赶快从这个房间滚出去！」/],
      }, // PRINTFORMW 「如果不想受伤，就赶快从这个房间滚出去！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '602',
        any: [
          /PRINTFORMW 仔细看的话，%SAVESTR:TARGET%不知什么时候偷偷藏了吃饭用的刀叉呢！/,
        ],
      }, // PRINTFORMW 仔细看的话，%SAVESTR:TARGET%不知什么时候偷
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '604',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%慌忙的一边殴打%SAVESTR:TARGET%，一边抢夺着刀叉。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%慌忙的一边殴打%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '605',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%提出要狠狠的对%SAVESTR:TARGET%进行惩罚………/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%提出要狠狠的对%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '607',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一把扭过%SAVESTR:TARGET%的手，夺走刀叉。/,
        ],
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
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%越来越靠近，%SAVESTR:TARGET%的脸渐渐红了，呼吸也渐渐浑浊了起来………/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:PLAYER%的身影，害怕的抱紧自己的身体向后退着、直到碰到墙壁才缓缓站起来。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被做了这样的事，也只能闭着眼睛默默忍受着。然后%SAVESTR:PLAYER%把她推到。/,
        ],
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
        any: [
          /PRINTFORMW 「哈哈哈、狂王大人也喜欢这样的衣服呢。穿着这个衣服的我究竟是多少人的女仆呢…啊啊、今天的话，是魔王大人的女仆呢哈哈」/,
        ],
      }, // PRINTFORMW 「哈哈哈、狂王大人也喜欢这样的衣服呢。穿着这个衣服的我究竟
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '668',
        any: [
          /PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超短的裙子、简单的在腰上围好围裙。/,
        ],
      }, // PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '669',
        any: [
          /PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个巨乳。/,
        ],
      }, // PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '670',
        any: [
          /PRINTFORMW 「啊啊、主人啊～嗯%UNICODE\(0x2661\) \*1% 色情的女仆%SAVESTR:TARGET%在这…好好惩罚一下我吧%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰，在裙边有着漂亮的花纹，非常可爱。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '676',
        any: [
          /PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。/,
        ],
      }, // PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '677',
        any: [
          /PRINTFORMW 「呵呵、真是非常棒的礼服啊%UNICODE\(0x2661\) \*1% 不过穿成这样要与魔王大人做爱的话，会有点难受吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵、真是非常棒的礼服啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '678',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的手在股间摩擦着，诱惑一般，向%SAVESTR:PLAYER%露出衣服的缝隙，展示着内裤。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的手在股间摩擦着，诱惑一般
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '679',
        any: [/PRINTFORMW 那条穿在身上的内裤已经湿透了。/],
      }, // PRINTFORMW 那条穿在身上的内裤已经湿透了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '680',
        any: [
          /PRINTFORMW 「呐、这条内裤，由魔王大人来给我褪下吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呐、这条内裤，由魔王大人来给我褪下吧%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '681',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '684',
        any: [
          /PRINTFORMW 「一跳一跳一跳的~~~、像小兔子一样跳～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「一跳一跳一跳的~~~、像小兔子一样跳～%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '685',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%穿着红色兔女郎装，跳着跳着突然转过身、快乐的笑着，靠近了%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着红色兔女郎装，跳着跳着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '686',
        any: [
          /PRINTFORMW 「小兔子呐～非常想要魔王大人的“胡萝卜”呢～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「小兔子呐～非常想要魔王大人的“胡萝卜”呢～%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '687',
        any: [
          /PRINTFORMW 淫乱的兔女郎抱着%SAVESTR:PLAYER%，双手在魔王的双腿间揉动着、眼睛亮闪闪的看着%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW 淫乱的兔女郎抱着%SAVESTR:PLAYER%，双手在魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '688',
        any: [
          /PRINTFORMW 「这个地方有大大的胡萝卜先生呢～%UNICODE\(0x2661\) \*1% 呵呵、快给小兔子吧♪」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PLAYER%一边露出媚态，一边慢慢的靠了过来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '697',
        any: [
          /PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼~…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼~…%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '698',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%的手臂、用热情的…嗯，是发情的目光看着%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '699',
        any: [
          /PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '701',
        any: [
          /PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '702',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开阴部，让尾巴不停的在蜜裂上滑动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '703',
        any: [
          /PRINTFORMW 有意识的用魅魔的力量制造出甜蜜的香气，%SAVESTR:TARGET%袭击了过来。/,
        ],
      }, // PRINTFORMW 有意识的用魅魔的力量制造出甜蜜的香气，%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '704',
        any: [
          /PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '706',
        any: [
          /PRINTFORMW 「哈哈…魔王大人…来到我这里，我就要负起一名淫乱魔族主人的责任哦…♪」/,
        ],
      }, // PRINTFORMW 「哈哈…魔王大人…来到我这里，我就要负起一名淫乱魔族主人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '707',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%只是看着%SAVESTR:PLAYER%就发情了，双眼都湿润了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%只是看着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '708',
        any: [
          /PRINTFORMW 「现在…和以前比起来，不管胸部还是臀部都像小穴一样一碰就快感四溢…不过只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「现在…和以前比起来，不管胸部还是臀部都像小穴一样一碰就快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '709',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%拥抱着，吐露出融化般的声音………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '715',
        any: [/PRINTFORMW 「嘛…要来抱一抱我吗？」/],
      }, // PRINTFORMW 「嘛…要来抱一抱我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '716',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PLAYER%一边露出媚态，一边慢慢的靠了过来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%对着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '717',
        any: [
          /PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…不要逃嘛…今天就全部交给我吧…呵…呼%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '718',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%的手臂、用热情的…嗯，是发情的目光看着/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '719',
        any: [
          /PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼呼…我的身体全都是魔王大人的东西哦…%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '721',
        any: [
          /PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哼哼哼…魔王大人也想要我的小穴了呢…%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '722',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开阴部，让尾巴不停的在蜜裂上滑动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在床上分开双腿、用双手扒开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '723',
        any: [
          /PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「快…快来…快来侵犯我吧魔王大人~~%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '725',
        any: [/PRINTFORMW 「魔王大人…快点来对我进行淫乱的调教啊…♪」/],
      }, // PRINTFORMW 「魔王大人…快点来对我进行淫乱的调教啊…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '726',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%搂着%SAVESTR:PLAYER%的胳膊，出神的笑着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%搂着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '727',
        any: [
          /PRINTFORMW 只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 只要魔王大人喜欢这副好色的身体我就没有关系哦…哈啊啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '728',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%搂着腰，吐露出荡漾的声音………/,
        ],
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
        any: [
          /PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超短的裙子、简单的在腰上围好围裙。/,
        ],
      }, // PRINTFORMW 看来穿女仆装是%SAVESTR:TARGET%的爱好呢，超
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '751',
        any: [
          /PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个巨乳。/,
        ],
      }, // PRINTFORMW 连衣裙的上半身紧紧的配合着身体线条、好像炫耀似的凸显着那个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '752',
        any: [/PRINTFORMW 「只为魔王大人提供的特殊侍奉来咯♪」/],
      }, // PRINTFORMW 「只为魔王大人提供的特殊侍奉来咯♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '753',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%莞尔一笑轻提起裙边鞠了一躬，那个发乎自然的动作，不仅仅是一流的教育就能训练的出的。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%莞尔一笑轻提起裙边鞠了一躬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '754',
        any: [
          /PRINTFORMW 再想到这个少女超一流的性侍奉技巧，你满足的点了点头………/,
        ],
      }, // PRINTFORMW 再想到这个少女超一流的性侍奉技巧，你满足的点了点头………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '755',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '758',
        any: [
          /PRINTFORMW 「最开始穿上这么下流的衣服因为太羞耻了差点晕倒、不过魔王大人喜欢的话就没关系」/,
        ],
      }, // PRINTFORMW 「最开始穿上这么下流的衣服因为太羞耻了差点晕倒、不过魔王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '759',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰，在裙边有着漂亮的花纹，非常可爱。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%穿着白色镂空花纹的妓女服饰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '760',
        any: [
          /PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。/,
        ],
      }, // PRINTFORMW 但整体的设计是非常下流的，衣服的缝隙一直开到了腰间。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '761',
        any: [
          /PRINTFORMW 「啊、不行啊、这不是几乎全都露出来了吗…啊呜…这种、手根本挡不住啊…嗯啊啊啊！…唔、真是太羞耻啦啊」/,
        ],
      }, // PRINTFORMW 「啊、不行啊、这不是几乎全都露出来了吗…啊呜…这种、手根本
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '762',
        any: [
          /PRINTFORMW 虽然不行不行的摇着头，不过从%SAVESTR:TARGET%双手试图遮挡的小缝隙中看、内裤已经逐渐的湿透了………/,
        ],
      }, // PRINTFORMW 虽然不行不行的摇着头，不过从%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '763',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '766',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%穿着红色的兔女郎装\\@TIME == 0 \? 今日 # 今夜\\@进行侍奉。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从胸部暴露的双峰间取出魔石打火机为你点上了烟。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从胸部暴露的双峰间取出魔石
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '770',
        any: [
          /PRINTFORMW 你吸了一口烟，把%SAVESTR:TARGET%抱在怀里、嘴对嘴的喂她吸了一口烟。/,
        ],
      }, // PRINTFORMW 你吸了一口烟，把%SAVESTR:TARGET%抱在怀里、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '771',
        any: [
          /PRINTFORMW 「嗯咳咳！咕咳咳咳…呼咳咳啊咳咳唔咳咳！…对、对不起还是不习惯这样………」/,
        ],
      }, // PRINTFORMW 「嗯咳咳！咕咳咳咳…呼咳咳啊咳咳唔咳咳！…对、对不起还是不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '772',
        any: [
          /PRINTFORMW 呜咽着的%SAVESTR:TARGET%看向你、随即湮没在云雾之中………/,
        ],
      }, // PRINTFORMW 呜咽着的%SAVESTR:TARGET%看向你、随即湮没在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '773',
        any: [/RETURN 1/],
      }, // RETURN 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '779',
        any: [
          /PRINTFORMW 「啊…我的魔王大人、\\@TIME == 0 \? 今日 # 今宵\\@也和往常一样来了啊…」/,
        ],
      }, // PRINTFORMW 「啊…我的魔王大人、\@TIME == 0 ? 今日 #
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '780',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '781',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫生、床单也被允许用干净的东西代替。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '782',
        any: [/PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。/],
      }, // PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '783',
        any: [
          /PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '785',
        any: [
          /PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦您了」/,
        ],
      }, // PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '786',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '787',
        any: [
          /PRINTFORMW 连翅膀和尾巴也垂着、对%SAVESTR:PLAYER%表示出了完全的敬意。/,
        ],
      }, // PRINTFORMW 连翅膀和尾巴也垂着、对%SAVESTR:PLAYER%表示
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '788',
        any: [
          /PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '789',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%是说台词的时候发了情吗，脸越来越红了………/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%SAVESTR:PLAYER%的胸前、尾巴也缠住了脚。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '794',
        any: [/PRINTFORMW 「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」/],
      }, // PRINTFORMW 「但是…魔王大人知道让我更加幸福的“方法”哦…哼哼哼♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '800',
        any: [
          /PRINTFORMW 「啊…我的魔王大人、\\@TIME == 0 \? 今日 # 今宵\\@也和往常一样来了啊…」/,
        ],
      }, // PRINTFORMW 「啊…我的魔王大人、\@TIME == 0 ? 今日 #
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '801',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '802',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫生、床单也被允许用干净的东西代替。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%有了自己的房间，自己搞着卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '803',
        any: [/PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。/],
      }, // PRINTFORMW 今后就在这个房间和%SAVESTR:TARGET%交合了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '804',
        any: [
          /PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「那么这边…我这身躯就随魔王大人喜欢抱着吧…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '806',
        any: [
          /PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦您了」/,
        ],
      }, // PRINTFORMW 「魔王大人…为了我的调教让您挪足大驾光临、实在是辛苦、麻烦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '807',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVESTR:PLAYER%打了招呼。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用拜伏的姿势向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '808',
        any: [
          /PRINTFORMW 「现在已经做好了准备。让魔王大人更喜欢“上”这个地方%UNICODE\(0x2661\) \*1%」/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着陶醉的表情，把头埋进%SAVESTR:PLAYER%的胸前、尾巴也缠住了脚。/,
        ],
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
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上混着泪水与口水目光呆滞的躺在地上………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%脸上混着泪水与口水目光呆滞
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '847',
        any: [/PRINTFORMW 「可…可恨至极………！」/],
      }, // PRINTFORMW 「可…可恨至极………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '848',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的指甲在地上“吱吱”的抓着，带着恶鬼般的表情看着%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的指甲在地上“吱吱”的抓着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '854',
        any: [/PRINTFORMW 「额…结束了吗…？」/],
      }, // PRINTFORMW 「额…结束了吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '855',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%擦了擦嘴角、把脸背向%SAVESTR:PLAYER%………/,
        ],
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
        any: [
          /PRINTFORMW 「啊啊真是的…我感觉一点也不够啊…呐…难道是对我的身体厌倦了吗？」/,
        ],
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
        any: [
          /PRINTFORMW 「呼啊呼啊…如果再抱我一下…就满足了………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼啊呼啊…如果再抱我一下…就满足了………%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '884',
        any: [
          /PRINTFORMW 被汗水和各种其他体液沾满的%SAVESTR:TARGET%横倒在一旁。/,
        ],
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
        any: [
          /PRINTFORMW 「哈呼…您是这么的爱我啊…实在是万分感谢%UNICODE\(0x2661\) \*1%」/,
        ],
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
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '908-6280',
        any: [/@KOJO_MESSAGE_COM_7/],
      }, // @KOJO_MESSAGE_COM_7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '909-931',
        any: [
          /;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）/,
        ],
      }, // ;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキッ
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '909-910',
        any: [
          /;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）/,
        ],
      }, // ;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキッ
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '912-913',
        any: [/;口塞着用時には口上をスキップする/],
      }, // ;口塞着用時には口上をスキップする
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '915-916',
        any: [/;失神時には口上をスキップする/],
      }, // ;失神時には口上をスキップする
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '918-921',
        any: [/;兽奸PLAY中は専用口上/],
      }, // ;兽奸PLAY中は専用口上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '923-926',
        any: [/;死斗场中は専用口上/],
      }, // ;死斗场中は専用口上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '928-929',
        any: [/;崩坏した場合は口上をスキップする/],
      }, // ;崩坏した場合は口上をスキップする
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '931-932',
        any: [/;触手調教中は口上をスキップする/],
      }, // ;触手調教中は口上をスキップする
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '945',
        any: [/PRINTFORMW 「嗯…呼、唔…嗯…不能再温柔一点吗？…啊…嗯…啊嗯」/],
      }, // PRINTFORMW 「嗯…呼、唔…嗯…不能再温柔一点吗？…啊…嗯…啊嗯」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '946',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体因为被爱抚扭动着、吐出叹息般的呻吟………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体因为被爱抚扭动着、吐
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '950',
        any: [/PRINTFORMW 「嗯啊…只是感觉有些痒而已…快点把手拿开」/],
      }, // PRINTFORMW 「嗯啊…只是感觉有些痒而已…快点把手拿开」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '951',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体扭动着，想从%SAVESTR:PLAYER%的爱抚中逃走………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体扭动着，想从%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '953',
        any: [/PRINTFORMW 「要做什么\.\.\.？呵呵、你这种人也想爱抚我？」/],
      }, // PRINTFORMW 「要做什么...？呵呵、你这种人也想爱抚我？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '954',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%笨拙的爱抚技巧而嘲笑着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '957',
        any: [/CFLAG:301 = 1/],
      }, // CFLAG:301 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '963',
        any: [
          /PRINTFORMW 「再激烈一些…我的身体啊…啊嗯…想要更多的…啊哈…嗯啊啊啊！」/,
        ],
      }, // PRINTFORMW 「再激烈一些…我的身体啊…啊嗯…想要更多的…啊哈…嗯啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '964',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体因为爱抚不住的扭动着，就像是在跳淫荡的舞蹈一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体因为爱抚不住的扭动着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '965',
        any: [/PRINTFORMW 她已经敏感到了令人吃惊的地步。/],
      }, // PRINTFORMW 她已经敏感到了令人吃惊的地步。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '967',
        any: [/PRINTFORMW 「啊咿…嗯啊…嗯呼…嗯…啊呼…更…更进一步也不要紧哦？」/],
      }, // PRINTFORMW 「啊咿…嗯啊…嗯呼…嗯…啊呼…更…更进一步也不要紧哦？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '968',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%激烈的接吻着摩擦着身体、进一步要求你的爱抚、/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '969',
        any: [
          /PRINTFORMW 「嗯啊…呼啊呼啊…进入…进入我身体也没有关系哦，不管是胸部还是小穴都已经饥渴难耐了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊…呼啊呼啊…进入…进入我身体也没有关系哦，不管是胸部
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '971',
        any: [
          /PRINTFORMW 「啊…我的奶子好难受…更多的揉弄它吧…啊…嗯呼呜呜…啊…啊咿～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…我的奶子好难受…更多的揉弄它吧…啊…嗯呼呜呜…啊…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '972',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被爱抚身体都疯狂的扭动着，毫不顾忌的大声淫叫………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%每次被爱抚身体都疯狂的扭动
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '974',
        any: [/CFLAG:301 = 6/],
      }, // CFLAG:301 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '977',
        any: [
          /PRINTFORMW 「呼…再更多的给我、身体…啊嗯…抚摸我的身体把…啊嗯…啊…啊呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼…再更多的给我、身体…啊嗯…抚摸我的身体把…啊嗯…啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '978',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抚摸着，因为过于刺激连表情都出神了，只盼望着%SAVESTR:PLAYER%进一步行动。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '980',
        any: [
          /PRINTFORMW 「呼嗯…嗯…吸…呼…更激烈的和我接吻吧…嗯吸…嗯呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼嗯…嗯…吸…呼…更激烈的和我接吻吧…嗯吸…嗯呼呼%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '981',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%的舌头互相纠缠着，挑逗着敏感地带。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '982',
        any: [/PRINTFORMW 「嗯呼…啊…那、那里、更加的…我…啊啊♪」/],
      }, // PRINTFORMW 「嗯呼…啊…那、那里、更加的…我…啊啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '984',
        any: [
          /PRINTFORMW 「亲爱的魔王大人啊…啊啊…更多的爱我吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「亲爱的魔王大人啊…啊啊…更多的爱我吧………%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '985',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧抱着%SAVESTR:TARGET%的身体、抚摸着敏感地带、手在蜜裂处挑逗着………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%紧抱着%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '987',
        any: [/CFLAG:301 = 5/],
      }, // CFLAG:301 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '990',
        any: [/PRINTFORMW 「啊啊…那里…那里是…咕…呜…啊…啊嗯！」/],
      }, // PRINTFORMW 「啊啊…那里…那里是…咕…呜…啊…啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '991',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%的爱抚身体激烈的抖动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '992',
        any: [
          /PRINTFORMW 已经屈服了的%SAVESTR:TARGET%无论被%SAVESTR:PLAYER%抚摸任何地方也无法拒绝。/,
        ],
      }, // PRINTFORMW 已经屈服了的%SAVESTR:TARGET%无论被%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '994',
        any: [/PRINTFORMW 「呼啊…啊…我、我…这样…嗯…嗯呼…嗯呜呜………呼啊」/],
      }, // PRINTFORMW 「呼啊…啊…我、我…这样…嗯…嗯呼…嗯呜呜………呼啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '995',
        any: [
          /PRINTFORMW 压住了%SAVESTR:TARGET%的嘴唇、也只留下了呻吟和喘息的空间………/,
        ],
      }, // PRINTFORMW 压住了%SAVESTR:TARGET%的嘴唇、也只留下了呻
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '997',
        any: [/PRINTFORMW 「啊啊…啊嗯…啊…我…不行了…啊、呵、呵、呜咿！」/],
      }, // PRINTFORMW 「啊啊…啊嗯…啊…我…不行了…啊、呵、呵、呜咿！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '998',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%的手臂中挣扎着，很可爱的样子………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1000',
        any: [/CFLAG:301 = 4/],
      }, // CFLAG:301 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1004',
        any: [/PRINTFORMW 「嗯…呼、呼唔…嗯…不能再温柔一点吗？…啊…嗯…啊嗯」/],
      }, // PRINTFORMW 「嗯…呼、呼唔…嗯…不能再温柔一点吗？…啊…嗯…啊嗯」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1006',
        any: [
          /PRINTFORMW 「啊…呼嗯…竟然对我做这种事…啊嗯…我可是很介意的…嗯！我不会原谅你了…啊！」/,
        ],
      }, // PRINTFORMW 「啊…呼嗯…竟然对我做这种事…啊嗯…我可是很介意的…嗯！我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1008',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体因为被爱抚扭动着、吐出叹息般的呻吟………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体因为被爱抚扭动着、吐
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1009',
        any: [/CFLAG:301 = 3/],
      }, // CFLAG:301 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1013',
        any: [/PRINTFORMW 「嗯啊…只是感觉有些痒而已…快点把手拿开」/],
      }, // PRINTFORMW 「嗯啊…只是感觉有些痒而已…快点把手拿开」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1014',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体扭动着，想从%SAVESTR:PLAYER%的爱抚中逃走………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体扭动着，想从%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1016',
        any: [/PRINTFORMW 「你在做什么呢？简直就像一只小蚯蚓在蠕动一样」/],
      }, // PRINTFORMW 「你在做什么呢？简直就像一只小蚯蚓在蠕动一样」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1017',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘲笑着%SAVESTR:PLAYER%笨拙的爱抚技巧………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%嘲笑着%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1019',
        any: [/CFLAG:301 = 2/],
      }, // CFLAG:301 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1033',
        any: [
          /PRINTFORMW 「啊啊！翻开什么的！…哎哎、感觉好奇怪…你，你居然把我的…处女膜再生了吗…咕呜………」/,
        ],
      }, // PRINTFORMW 「啊啊！翻开什么的！…哎哎、感觉好奇怪…你，你居然把我的…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1034',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%扒开蜜裂而满脸通红的害羞着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1038',
        any: [/PRINTFORMW 「啊呜…咕…嗯嗯…舌头…在我的里面…啊啊啊！」/],
      }, // PRINTFORMW 「啊呜…咕…嗯嗯…舌头…在我的里面…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1039',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%的舔阴扭动着腰身呻吟着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1041',
        any: [
          /PRINTFORMW 「嗯…嗯呼呼…好难为情啊、喏、好好舔啊要是舒服了我就原谅你♪」/,
        ],
      }, // PRINTFORMW 「嗯…嗯呼呼…好难为情啊、喏、好好舔啊要是舒服了我就原谅你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1042',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%边笑，边接受了%SAVESTR:PLAYER%的舔阴………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%边笑，边接受了%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1045',
        any: [/CFLAG:302 = 1/],
      }, // CFLAG:302 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1051',
        any: [
          /PRINTFORMW 「再激烈一点…狠狠的吮吸玩弄我的小穴吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「再激烈一点…狠狠的吮吸玩弄我的小穴吧~%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1052',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜裂被人舔咬咀嚼着，整个人都因为快感呆滞了，口水垂下。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜裂被人舔咬咀嚼着，整
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1053',
        any: [
          /PRINTFORMW 「啊啊…啊…好棒…好棒…舌头在最深处%UNICODE\(0x2661\) \*1% 真、真是太棒了…更多的舔、玩弄我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊…好棒…好棒…舌头在最深处%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1054',
        any: [/PRINTFORMW %SAVESTR:TARGET%的每次喘息呻吟都伴随着爱液四溅………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的每次喘息呻吟都伴随着爱液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1055',
        any: [/CFLAG:302 = 5/],
      }, // CFLAG:302 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1058',
        any: [
          /PRINTFORMW 「啊嗯…嗯…不要舔啊…那样…啊啊…会弄脏魔王大人的嘴…嗯…啊、啊呜啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊嗯…嗯…不要舔啊…那样…啊啊…会弄脏魔王大人的嘴…嗯…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1059',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜裂被尽情的舔舐着。爱液一股一股的冒出来滋润了%SAVESTR:PLAYER%的嘴。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜裂被尽情的舔舐着。爱液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1060',
        any: [
          /PRINTFORMW 「不行了…已、又要去了…啊…啊啊啊…嗯…啊咿～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「不行了…已、又要去了…啊…啊啊啊…嗯…啊咿～%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1061',
        any: [/CFLAG:302 = 4/],
      }, // CFLAG:302 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1064',
        any: [/PRINTFORMW 「哈…啊…啊…咕…嗯呼啊！」/],
      }, // PRINTFORMW 「哈…啊…啊…咕…嗯呼啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1065',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜裂被激烈的舔舐着、阴唇都翻了出来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜裂被激烈的舔舐着、阴唇
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1066',
        any: [/PRINTFORMW 「我、我这…这样下去…啊啊…啊…嗯…咕呜呜！」/],
      }, // PRINTFORMW 「我、我这…这样下去…啊啊…啊…嗯…咕呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1067',
        any: [/CFLAG:302 = 3/],
      }, // CFLAG:302 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1071',
        any: [/PRINTFORMW 「啊啊…这样的！小穴最里面…舌头…啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…这样的！小穴最里面…舌头…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1072',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%的舔阴扭动着腰身呻吟着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1074',
        any: [
          /PRINTFORMW 「嗯…嗯呼呼…好难为情啊、喏、好好舔啊要是舒服了我就原谅你♪」/,
        ],
      }, // PRINTFORMW 「嗯…嗯呼呼…好难为情啊、喏、好好舔啊要是舒服了我就原谅你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1075',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%边笑，边接受了%SAVESTR:PLAYER%的舔阴………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%边笑，边接受了%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1077',
        any: [/CFLAG:302 = 2/],
      }, // CFLAG:302 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1090',
        any: [/PRINTFORMW 「啊啊…啊…不、不行啊…不能再被这样玩弄了…啊…呜咿！」/],
      }, // PRINTFORMW 「啊啊…啊…不、不行啊…不能再被这样玩弄了…啊…呜咿！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1091',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门，接受着%SAVESTR:PLAYER%的爱抚、感受到了极大的快感………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发了的肛门，接受着%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1093',
        any: [
          /PRINTFORMW 「咕呜…呜呜呜呜…真、真让人感觉恶心…啊啊…再、再也不想这样了………」/,
        ],
      }, // PRINTFORMW 「咕呜…呜呜呜呜…真、真让人感觉恶心…啊啊…再、再也不想这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1094',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚邹着眉头、似乎在忍耐着那个奇妙的感觉………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚邹着眉头、似
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1096',
        any: [
          /PRINTFORMW 「啊啊！好痛啊！痛死人了！快点给我停下来停下来啊！」/,
        ],
      }, // PRINTFORMW 「啊啊！好痛啊！痛死人了！快点给我停下来停下来啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1097',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚痛苦的发出悲鸣，从%SAVESTR:PLAYER%的手中逃走………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚痛苦的发出悲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1099',
        any: [/CFLAG:TARGET:303 = 1/],
      }, // CFLAG:TARGET:303 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1103',
        any: [/P = PALAM:3 \+ UP:3/],
      }, // P = PALAM:3 + UP:3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1106',
        any: [
          /PRINTFORMW 「呼唔啊啊…肛门好有感觉啊…啊嗯啊啊啊啊！这个！这个真是不错啊！…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼唔啊啊…肛门好有感觉啊…啊嗯啊啊啊啊！这个！这个真是不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1108',
        any: [
          /PRINTFORMW 「呼啊啊…啊…啊…嗯…咕嗞咕嗞的！我的肛门变得乱七八糟了啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼啊啊…啊…啊…嗯…咕嗞咕嗞的！我的肛门变得乱七八糟了啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1109',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门因为充分的润滑了，%SAVESTR:PLAYER%的手指咕嗞咕嗞的轻易插了进去………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门因为充分的润滑了，%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1110',
        any: [/CFLAG:303 = 7/],
      }, // CFLAG:303 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1113',
        any: [
          /PRINTFORMW 「啊嗯…不行啊魔王大人…请稍微慢一点…啊？　啊…嗯咕…啊呜！」/,
        ],
      }, // PRINTFORMW 「啊嗯…不行啊魔王大人…请稍微慢一点…啊？　啊…嗯咕…啊呜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1114',
        any: [
          /PRINTFORMW 是因为润滑还不够吗？%SAVESTR:TARGET%发出了痛苦的呻吟声………/,
        ],
      }, // PRINTFORMW 是因为润滑还不够吗？%SAVESTR:TARGET%发出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1115',
        any: [/CFLAG:303 = 6/],
      }, // CFLAG:303 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1118',
        any: [
          /PRINTFORMW 「啊啊啊啊！我的屁股…嗯…啊嗯…发出奇怪的声音了…呜、真是太令人羞耻了！」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊！我的屁股…嗯…啊嗯…发出奇怪的声音了…呜、真是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1120',
        any: [
          /PRINTFORMW 「哈啊啊…啊…啊…嗯…好舒服…但是…啊啊…嗯好羞耻啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊啊…啊…啊…嗯…好舒服…但是…啊啊…嗯好羞耻啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1121',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门因为充分的润滑了，%SAVESTR:PLAYER%的手指咕嗞咕嗞的轻易插了进去………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门因为充分的润滑了，%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1122',
        any: [/CFLAG:303 = 5/],
      }, // CFLAG:303 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1125',
        any: [
          /PRINTFORMW 「啊、我的屁股…啊啊…能、再稍微再弄湿一点吗…嗯…啊嗯…！」/,
        ],
      }, // PRINTFORMW 「啊、我的屁股…啊啊…能、再稍微再弄湿一点吗…嗯…啊嗯…！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1126',
        any: [
          /PRINTFORMW 是因为润滑还不够吗？%SAVESTR:TARGET%发出了痛苦的呻吟声………/,
        ],
      }, // PRINTFORMW 是因为润滑还不够吗？%SAVESTR:TARGET%发出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1127',
        any: [/CFLAG:303 = 4/],
      }, // CFLAG:303 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1130',
        any: [/PRINTFORMW 「啊啊…啊…不、不行…再这样玩弄的话…啊…嗯咕！」/],
      }, // PRINTFORMW 「啊啊…啊…不、不行…再这样玩弄的话…啊…嗯咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1131',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门很轻松的就用手指插了进去，因为%SAVESTR:PLAYER%的爱抚、产生了相当的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门很轻松的就
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1132',
        any: [
          /PRINTFORMW 「连这么肮脏的地方都要玩弄吗…啊…啊啊…啊啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「连这么肮脏的地方都要玩弄吗…啊…啊啊…啊啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1133',
        any: [
          /PRINTFORMW 故意激烈的玩弄起来，%SAVESTR:TARGET%的脸色随着涌出的快感变红了………/,
        ],
      }, // PRINTFORMW 故意激烈的玩弄起来，%SAVESTR:TARGET%的脸色
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1134',
        any: [/CFLAG:303 = 3/],
      }, // CFLAG:303 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1138',
        any: [
          /PRINTFORMW 「反正、做这种事情也只会让人感到厌恶而言…啊啊、停、停下来………」/,
        ],
      }, // PRINTFORMW 「反正、做这种事情也只会让人感到厌恶而言…啊啊、停、停下来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1139',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚邹着眉头、似乎在忍耐着那个奇妙的感觉………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚邹着眉头、似
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1141',
        any: [
          /PRINTFORMW 「变态！真是脏死了太肮脏了！不要再玩弄那样的地方了！」/,
        ],
      }, // PRINTFORMW 「变态！真是脏死了太肮脏了！不要再玩弄那样的地方了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1142',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚痛苦的发出悲鸣，从%SAVESTR:PLAYER%的手中逃走了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚痛苦的发出悲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1144',
        any: [/CFLAG:303 = 2/],
      }, // CFLAG:303 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1156',
        any: [/PRINTFORMW 「咕…嗯…啊、看到我自慰而感到兴奋了吗…？」/],
      }, // PRINTFORMW 「咕…嗯…啊、看到我自慰而感到兴奋了吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1158',
        any: [
          /PRINTFORMW 「啊啊…没关系…变成这样的小穴…全部都看见吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…没关系…变成这样的小穴…全部都看见吧………%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1159',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边在你面前自慰着，一边吐出热烈的呻吟声………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边在你面前自慰着，一边吐
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1161',
        any: [/PRINTFORMW 「咔、真是最差劲了！咕…呜呜…咕～………！」/],
      }, // PRINTFORMW 「咔、真是最差劲了！咕…呜呜…咕～………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1162',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边露出快要哭出来的表情一边被迫自慰着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边露出快要哭出来的表情一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1164',
        any: [/CFLAG:TARGET:304 = 1/],
      }, // CFLAG:TARGET:304 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1170',
        any: [
          /PRINTFORMW 「呵呵…我的处女膜很好的再生了啊、魔王大人~%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵…我的处女膜很好的再生了啊、魔王大人~%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1171',
        any: [/PRINTFORMW %SAVESTR:TARGET%扒开自己的小穴，叽咕叽咕的自慰着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%扒开自己的小穴，叽咕叽咕的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1172',
        any: [
          /PRINTFORMW 「随魔王大人高兴，不管多少次处女也可以被魔王大人夺走哦…呵呵呵%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「随魔王大人高兴，不管多少次处女也可以被魔王大人夺走哦…呵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1173',
        any: [/CFLAG:304 = 9/],
      }, // CFLAG:304 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1178',
        any: [
          /PRINTFORMW 「啊啊嗯…自慰最棒了%UNICODE\(0x2661\) \*1% 啊啊手完全停不下来%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…自慰最棒了%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1179',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的手疯狂的自慰着，像潮吹一样爱液到处飞溅。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的手疯狂的自慰着，像潮吹一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1180',
        any: [
          /PRINTFORMW 「啊嗯…在魔王大人的调教下，我已经变成这么淫乱的女人了啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…在魔王大人的调教下，我已经变成这么淫乱的女人了啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1182',
        any: [
          /PRINTFORMW 「哈啊哈啊…我每天晚上都会这样自慰%UNICODE\(0x2661\) \*1% 啊啊…啊嗯…这…太棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我每天晚上都会这样自慰%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1183',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%轻车熟路的用各种手势自慰着、一边说着猥琐的话，一边呻吟一边疯狂自慰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%轻车熟路的用各种手势自慰着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1184',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…啊啊…哈啊哈啊…魔王大人魔王大人啊…我的小穴好想被侵犯，好想要大肉棒插进来，想要的不得了！%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊嗯…啊啊…哈啊哈啊…魔王大人魔王大人啊…我的小穴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1186',
        any: [
          /PRINTFORMW 「哈唔…自慰最高…啊啊%UNICODE\(0x2661\) \*1% …整个人都要飞起来了…呵啊…哈啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈唔…自慰最高…啊啊%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1187',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的情欲已经完全显露在眼神中，被%SAVESTR:PLAYER%看着、完全沉浸在了自慰的快感中。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的情欲已经完全显露在眼神中
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1188',
        any: [
          /PRINTFORMW 「咿啊…咿嗯嗯…唔啊啊…啊啊～%UNICODE\(0x2661\) \*1% 咿啊哈啊…自慰实在太棒了…啊啊…唔啊啊…啊呼啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咿啊…咿嗯嗯…唔啊啊…啊啊～%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1189',
        any: [
          /PRINTFORMW 谁能想到那个自慰狂的姿态会是从前那个心高气傲的亲卫队队长呢………/,
        ],
      }, // PRINTFORMW 谁能想到那个自慰狂的姿态会是从前那个心高气傲的亲卫队队长呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1191',
        any: [/CFLAG:304 = 8/],
      }, // CFLAG:304 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1196',
        any: [
          /PRINTFORMW 「嗯…啊啊嗯…啊呼…啊啊…比起自慰更想用魔王大人的手来…嗯呼呼…嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…啊啊嗯…啊呼…啊啊…比起自慰更想用魔王大人的手来…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1197',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然嘴上抱怨着，但是自慰的手并没有停下来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然嘴上抱怨着，但是自慰的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1198',
        any: [
          /PRINTFORMW 「啊啊嗯…嗯、哈啊嗯…啊啊～…啊…不、已经要不行了…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…嗯、哈啊嗯…啊啊～…啊…不、已经要不行了…啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1200',
        any: [
          /PRINTFORMW 「哈啊…手淫好舒服啊…嗯…啊嗯…啊、呜咿、魔王大人快看我♪」/,
        ],
      }, // PRINTFORMW 「哈啊…手淫好舒服啊…嗯…啊嗯…啊、呜咿、魔王大人快看我♪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1201',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是炫耀一样分开双腿，手在蜜裂处抽动着。已经湿透了的蜜裂发出淫靡猥琐的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像是炫耀一样分开双腿，手在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1202',
        any: [
          /PRINTFORMW 「啊啊嗯…嗯…啊…啊呼…在我的手淫下兴奋起来了吧…需要的时候可以随时使用我的身体哦%UNICODE\(0x2661\) \*1% 嗯啊啊哈哼啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…嗯…啊…啊呼…在我的手淫下兴奋起来了吧…需要的时
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1204',
        any: [/CFLAG:304 = 7/],
      }, // CFLAG:304 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1207',
        any: [
          /PRINTFORMW 「啊哈…我知道了、不过好不容易再生的、处女膜要是弄破了怎么办啊…嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…我知道了、不过好不容易再生的、处女膜要是弄破了怎么
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1208',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边疑虑着摆弄起了自己的私处。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边疑虑着摆弄起了自己的私
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1209',
        any: [/PRINTFORMW 「啊…嗯…嗯呼…啊啊…这、也真是让人着急难受…嗯啊嗯！」/],
      }, // PRINTFORMW 「啊…嗯…嗯呼…啊啊…这、也真是让人着急难受…嗯啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1210',
        any: [/CFLAG:304 = 6/],
      }, // CFLAG:304 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1215',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1% 啊…啊啊嗯%UNICODE\(0x2661\) \*1% 自慰真是太舒服了…啊嗯啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯%UNICODE(0x2661) *1% 啊…啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1216',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%分开双腿一边向%SAVESTR:PLAYER%展示着，一边激烈的自慰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%分开双腿一边向%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1217',
        any: [
          /PRINTFORMW 「请、请看着…我想着魔王大人自慰已经快要高潮了…啊呜啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「请、请看着…我想着魔王大人自慰已经快要高潮了…啊呜啊哈%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1219',
        any: [
          /PRINTFORMW 「是、魔王大人命令的话不管多少次我都能自慰给您看%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是、魔王大人命令的话不管多少次我都能自慰给您看%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1220',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%微微一笑张开双腿，手在蜜裂处玩弄着、自慰的快感充斥全身。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%微微一笑张开双腿，手在蜜裂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1221',
        any: [
          /PRINTFORMW 「哈啊…啊嗯啊啊…怎么样？感觉兴奋了吗？　啊嗯…啊真是抱歉嗯嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…啊嗯啊啊…怎么样？感觉兴奋了吗？　啊嗯…啊真是抱歉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1223',
        any: [
          /PRINTFORMW 「我、我居然这么的喜欢上了手淫…嗯…呼…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我、我居然这么的喜欢上了手淫…嗯…呼…啊嗯%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1224',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出魅惑的声音。手激烈的动了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边发出魅惑的声音。手激烈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1225',
        any: [
          /PRINTFORMW 「啊啊…更多…想获得更多的快感…啊啊…啊嗯…啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…更多…想获得更多的快感…啊啊…啊嗯…啊哈嗯%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1227',
        any: [/CFLAG:304 = 5/],
      }, // CFLAG:304 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1232',
        any: [
          /PRINTFORMW 「虽、虽然很羞耻…但如果魔王大人想看的话…啊嗯…啊啊…啊哈…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「虽、虽然很羞耻…但如果魔王大人想看的话…啊嗯…啊啊…啊哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1233',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%两腿分的大开激烈的自慰着。淫靡的气味飘了过来，勾起了%SAVESTR:PLAYER%的欲望。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%两腿分的大开激烈的自慰着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1234',
        any: [
          /PRINTFORMW 「嗯…呼呼…魔王大人也差不多想要了吧…啊嗯…嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…呼呼…魔王大人也差不多想要了吧…啊嗯…嗯…啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1236',
        any: [
          /PRINTFORMW 「相比我自己手淫…还是魔王大人的拥抱更好…但如果是命令…还是会去做了………♪」/,
        ],
      }, // PRINTFORMW 「相比我自己手淫…还是魔王大人的拥抱更好…但如果是命令…还
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1237',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%红着脸继续自慰着。噗叽噗叽的淫猥声音回响着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%红着脸继续自慰着。噗叽噗叽
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1238',
        any: [
          /PRINTFORMW 「呼啊呼啊…啊啊嗯…我会一直做下去的%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼啊呼啊…啊啊嗯…我会一直做下去的%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1240',
        any: [/CFLAG:304 = 4/],
      }, // CFLAG:304 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1245',
        any: [
          /PRINTFORMW 「啊啊嗯…嗯…我、让我做这种事…居然也会感觉到舒服什么的…啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…嗯…我、让我做这种事…居然也会感觉到舒服什么的…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1246',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的眼中因为快乐湿润了、手指的动作也越来越激烈。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的眼中因为快乐湿润了、手指
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1247',
        any: [/PRINTFORMW 「哈啊哈啊…啊嗯…不、不要看…不要看！啊…啊嗯…啊啊！」/],
      }, // PRINTFORMW 「哈啊哈啊…啊嗯…不、不要看…不要看！啊…啊嗯…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1249',
        any: [
          /PRINTFORMW 「呼啊…啊…嗯…啊啊嗯…请、请原谅我吧…不能再做下去了…嗯…啊嗯！」/,
        ],
      }, // PRINTFORMW 「呼啊…啊…嗯…啊啊嗯…请、请原谅我吧…不能再做下去了…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1250',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边掉着眼泪一边自慰。手已经不能停下来了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边掉着眼泪一边自慰。手已
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1251',
        any: [/PRINTFORMW 「啊…为什么…这种快感无法停止…啊啊…呼…嗯嗯～！」/],
      }, // PRINTFORMW 「啊…为什么…这种快感无法停止…啊啊…呼…嗯嗯～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1253',
        any: [/CFLAG:304 = 3/],
      }, // CFLAG:304 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1258',
        any: [/PRINTFORMW 「啊啊嗯…嗯…变、变态…你、你不要看啊…啊…咕呜！」/],
      }, // PRINTFORMW 「啊啊嗯…嗯…变、变态…你、你不要看啊…啊…咕呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1259',
        any: [/PRINTFORMW %SAVESTR:TARGET%的手为难的动着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的手为难的动着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1261',
        any: [/PRINTFORMW 「啊…为什么我非得做这样的事…不、不要看我！」/],
      }, // PRINTFORMW 「啊…为什么我非得做这样的事…不、不要看我！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1262',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%的命令下不得已自慰着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1264',
        any: [/CFLAG:304 = 2/],
      }, // CFLAG:304 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1280',
        any: [/PRINTFORMW 「啊…我的母乳…请…请喝吧…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊…我的母乳…请…请喝吧…%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1281',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头被吮吸着，出神的抚摸着%SAVESTR:PLAYER%的头………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头被吮吸着，出神的抚摸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1284',
        any: [
          /PRINTFORMW 「呜啊啊…这这是！是母乳…好难受…呜…再这样揉动就要流出来了！」/,
        ],
      }, // PRINTFORMW 「呜啊啊…这这是！是母乳…好难受…呜…再这样揉动就要流出来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1289',
        any: [
          /PRINTFORMW 「啊…怎么样我引以为傲的巨乳…嗯…啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…怎么样我引以为傲的巨乳…嗯…啊哈嗯%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1290',
        any: [/PRINTFORMW 「再更多的揉动也不要紧哦…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「再更多的揉动也不要紧哦…%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1293',
        any: [
          /PRINTFORMW 「啊呜…这讨厌的感觉是什么？　你就是用这样的手段让其他人沦陷了吗…可恶！」/,
        ],
      }, // PRINTFORMW 「啊呜…这讨厌的感觉是什么？　你就是用这样的手段让其他人沦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1294',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%吐出炙热的气息，就这样被%SAVESTR:PLAYER%改变着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%吐出炙热的气息，就这样被%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1297',
        any: [
          /PRINTFORMW 「呀…好、好痛啊…！捏的太用力的…咕…停、快停下来！啊啊！」/,
        ],
      }, // PRINTFORMW 「呀…好、好痛啊…！捏的太用力的…咕…停、快停下来！啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1298',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%很用力的揉动着%SAVESTR:TARGET%的巨乳，让她痛苦不已………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%很用力的揉动着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1301',
        any: [/CFLAG:TARGET:306 = 1/],
      }, // CFLAG:TARGET:306 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1309',
        any: [
          /PRINTFORMW 「我的母乳全部喝下去吧！请喝下去哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我的母乳全部喝下去吧！请喝下去哦%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1310',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的表情因为母乳被吮吸而陶醉在愉悦中了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的表情因为母乳被吮吸而陶醉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1311',
        any: [/CFLAG:306 = 5/],
      }, // CFLAG:306 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1314',
        any: [
          /PRINTFORMW 「啊…我的母乳…请…再多喝一点吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…我的母乳…请…再多喝一点吧…%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1315',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头被吮吸着，出神的抚摸着%SAVESTR:PLAYER%的头………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头被吮吸着，出神的抚摸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1316',
        any: [/CFLAG:306 = 4/],
      }, // CFLAG:306 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1319',
        any: [/PRINTFORMW 「啊…啊啊…母乳被吸着…感到了…呼、呜、啊啊啊………」/],
      }, // PRINTFORMW 「啊…啊啊…母乳被吸着…感到了…呼、呜、啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1320',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为母乳被吮吸的快感呆滞了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为母乳被吮吸的快感呆滞了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1321',
        any: [/CFLAG:306 = 3/],
      }, // CFLAG:306 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1324',
        any: [
          /PRINTFORMW 「呜啊啊…这这是！是母乳…好难受…呜…再这样刺激就要流出来了！」/,
        ],
      }, // PRINTFORMW 「呜啊啊…这这是！是母乳…好难受…呜…再这样刺激就要流出来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1325',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把乳头吸入口中，%SAVESTR:TARGET%的母乳流了出来………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把乳头吸入口中，%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1326',
        any: [/CFLAG:306 = 2/],
      }, // CFLAG:306 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1331',
        any: [
          /PRINTFORMW 「啊啊嗯！更加激烈的…揉我的胸部吧%UNICODE\(0x2661\) \*1% 啊啊啊！这样晃动着%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯！更加激烈的…揉我的胸部吧%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1332',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被抓住肆意的玩弄着。%SAVESTR:TARGET%只剩下了快感/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的巨乳被抓住肆意的玩弄着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1333',
        any: [
          /PRINTFORMW 「呼唔啊啊啊啊…我…巨乳真是太好了…哼这么舒服…啊、啊哈啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼唔啊啊啊啊…我…巨乳真是太好了…哼这么舒服…啊、啊哈啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1334',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头只是被轻轻一提整个人都痉挛了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头只是被轻轻一提整个人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1335',
        any: [/CFLAG:306 = 5/],
      }, // CFLAG:306 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1338',
        any: [
          /PRINTFORMW 「是…我的胸部也是魔王大人的东西…请随您喜好玩弄吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是…我的胸部也是魔王大人的东西…请随您喜好玩弄吧%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1339',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%微微一笑把身体倾了过去让%SAVESTR:PLAYER%随意玩弄那对巨乳。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%微微一笑把身体倾了过去让%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1340',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…呼啊啊…好舒服…这…这真是太…啊嗯…嗯嗯呼啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊嗯…呼啊啊…好舒服…这…这真是太…啊嗯…嗯嗯呼啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1341',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表情荡漾的在%SAVESTR:PLAYER%的双臂中………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%表情荡漾的在%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1342',
        any: [/CFLAG:306 = 4/],
      }, // CFLAG:306 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1345',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%狠狠的揉捏着%SAVESTR:TARGET%的巨乳、按理说平常只会引起痛苦，但对现在的%SAVESTR:TARGET%而言只能感受到无上的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%狠狠的揉捏着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1346',
        any: [
          /PRINTFORMW 「哈…哈…我的胸部会这么有感觉…嗯…呜呜啊…呜、不能拉长啊…咿啊～！」/,
        ],
      }, // PRINTFORMW 「哈…哈…我的胸部会这么有感觉…嗯…呜呜啊…呜、不能拉长啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1347',
        any: [/PRINTFORMW 乳头被提拉伸长、%SAVESTR:TARGET%发出沉重的呻吟………/],
      }, // PRINTFORMW 乳头被提拉伸长、%SAVESTR:TARGET%发出沉重的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1348',
        any: [/CFLAG:306 = 3/],
      }, // CFLAG:306 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1353',
        any: [/PRINTFORMW 「啊啊啊…！真是…真是讨厌的手…啊啊…呼啊…嗯…呜咿！」/],
      }, // PRINTFORMW 「啊啊啊…！真是…真是讨厌的手…啊啊…呼啊…嗯…呜咿！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1354',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大口的喘着炙热的气息，巨乳在%SAVESTR:PLAYER%的手中改变着形状………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大口的喘着炙热的气息，巨乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1357',
        any: [
          /PRINTFORMW 「呀…好、好痛啊…！捏的太用力的…咕…停、快停下来！啊啊！」/,
        ],
      }, // PRINTFORMW 「呀…好、好痛啊…！捏的太用力的…咕…停、快停下来！啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1358',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%很用力的揉动着%SAVESTR:TARGET%的巨乳，让她痛苦不已………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%很用力的揉动着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1360',
        any: [/CFLAG:306 = 2/],
      }, // CFLAG:306 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1373-1374',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1374',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1380',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%抱在一起，互相亲吻。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1381',
        any: [
          /PRINTFORMW 「哈呜…嗯…嗯啾…啾…嗯…呼…咿唔…啊嗯、哈…嗯啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈呜…嗯…嗯啾…啾…嗯…呼…咿唔…啊嗯、哈…嗯啾…%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1382',
        any: [/PRINTFORMW 舌头纠缠着互相交换着唾液、整整十分钟后才缓缓离开。/],
      }, // PRINTFORMW 舌头纠缠着互相交换着唾液、整整十分钟后才缓缓离开。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1383',
        any: [/PRINTFORMW 「哈哈…呵呵、感觉还不够呢………」/],
      }, // PRINTFORMW 「哈哈…呵呵、感觉还不够呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1386',
        any: [
          /PRINTFORMW 「是…我喜欢和魔王大人接吻哦♪　啾啾…嗯…啾呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是…我喜欢和魔王大人接吻哦♪　啾啾…嗯…啾呜…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1387',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%的头亲吻着嘴唇、舌头互相纠缠着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1388',
        any: [
          /PRINTFORMW 「是…咕呜…啾…嗯…啾…呜嗯…嗯咕…嗯…啾～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是…咕呜…啾…嗯…啾…呜嗯…嗯咕…嗯…啾～%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1389',
        any: [
          /PRINTFORMW 舌头互相纠缠到麻木、唾液也交换太多次喝光了、像是媚药一样流进%SAVESTR:PLAYER%的胃中。/,
        ],
      }, // PRINTFORMW 舌头互相纠缠到麻木、唾液也交换太多次喝光了、像是媚药一样流
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1390',
        any: [
          /PRINTFORMW 「嗯…嗯唔…呼啊………我的嘴唇除了魔王大人以外谁也不能接受了…♪」/,
        ],
      }, // PRINTFORMW 「嗯…嗯唔…呼啊………我的嘴唇除了魔王大人以外谁也不能接受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1393',
        any: [/PRINTFORMW 「嗯…居然………啊、竟然和你的嘴唇…呜呜」/],
      }, // PRINTFORMW 「嗯…居然………啊、竟然和你的嘴唇…呜呜」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1394',
        any: [/PRINTFORMW %SAVESTR:TARGET%哭着擦了很多次嘴角………/],
      }, // PRINTFORMW %SAVESTR:TARGET%哭着擦了很多次嘴角………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1396',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1402',
        any: [
          /PRINTFORMW 「啊啊…嗯…接下来是…品尝唾液…%UNICODE\(0x2661\) \*1% 啊嗯…啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯…接下来是…品尝唾液…%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1403',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%主动张开嘴伸出不规矩的舌头期待的接着从%SAVESTR:PLAYER%舌头顺着滴下来的唾液。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%主动张开嘴伸出不规矩的舌头
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1404',
        any: [
          /PRINTFORMW 「嗯咕…嗯唔嗯呵呵…啊…魔王大人的唾液真是美味呢，连头脑要不清醒了…嗯…啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯唔嗯呵呵…啊…魔王大人的唾液真是美味呢，连头脑要
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1405',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样咬住了%SAVESTR:PLAYER%的舌头吮吸起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样咬住了%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1406',
        any: [/CFLAG:307 = 5/],
      }, // CFLAG:307 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1409',
        any: [
          /PRINTFORMW 「想要接吻吗、没有问题哦…我已经是魔王大人的东西了…」/,
        ],
      }, // PRINTFORMW 「想要接吻吗、没有问题哦…我已经是魔王大人的东西了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1410',
        any: [
          /PRINTFORMW 陶醉的笑着，捏着%SAVESTR:TARGET%的下巴，%SAVESTR:PLAYER%夺去了她的唇。/,
        ],
      }, // PRINTFORMW 陶醉的笑着，捏着%SAVESTR:TARGET%的下巴，%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1411',
        any: [
          /PRINTFORMW 「嗯！咕…啾…啾…嗯呜…嗯呼%UNICODE\(0x2661\) \*1% 呜…今天真是激烈啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯！咕…啾…啾…嗯呜…嗯呼%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1412',
        any: [/PRINTFORMW 然后整整五分钟都在品尝%SAVESTR:TARGET%的嘴唇………/],
      }, // PRINTFORMW 然后整整五分钟都在品尝%SAVESTR:TARGET%的嘴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1413',
        any: [/CFLAG:307 = 4/],
      }, // CFLAG:307 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1416',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%稍微显得顺从了一些，接吻也不怎么抵抗了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%稍微显得顺从了一些，接吻也
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1417',
        any: [/PRINTFORMW 「嗯…啊呜…嗯嗯啾…啾…嗯…哈…已、已经足够了吧…？」/],
      }, // PRINTFORMW 「嗯…啊呜…嗯嗯啾…啾…嗯…哈…已、已经足够了吧…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1418',
        any: [/PRINTFORMW %SAVESTR:TARGET%的眼睛湿润了，是因为屈辱的缘故吧………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的眼睛湿润了，是因为屈辱的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1419',
        any: [/CFLAG:307 = 3/],
      }, // CFLAG:307 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1422',
        any: [/PRINTFORMW 「嗯！咕…不、不行…果然接吻还是…啊…嗯…唔唔唔～！」/],
      }, // PRINTFORMW 「嗯！咕…不、不行…果然接吻还是…啊…嗯…唔唔唔～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1423',
        any: [
          /PRINTFORMW 抓着%SAVESTR:TARGET%的下巴强行的接吻了。这种屈辱让%SAVESTR:TARGET%禁不住流下了眼泪………/,
        ],
      }, // PRINTFORMW 抓着%SAVESTR:TARGET%的下巴强行的接吻了。这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1424',
        any: [/CFLAG:307 = 2/],
      }, // CFLAG:307 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1438',
        any: [/PRINTFORMW 「呵呵、我淫乱的小穴，想要看的话尽管看吧…♪」/],
      }, // PRINTFORMW 「呵呵、我淫乱的小穴，想要看的话尽管看吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1439',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不知羞耻的敞开双腿，炫耀一般的用舌头舔着嘴唇。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%不知羞耻的敞开双腿，炫耀一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1440',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%的视线，有了强烈的反应，爱液从小穴中满溢而出。/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%的视线，有了强烈的反应
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1441',
        any: [
          /PRINTFORMW 「我淫乱的小穴…如果魔王大人喜欢的话，品尝一下也未尝不可哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我淫乱的小穴…如果魔王大人喜欢的话，品尝一下也未尝不可哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1443',
        any: [
          /PRINTFORMW 「为了这种事特意把我变回处女…魔王大人还真是个浪漫主义者呢………」/,
        ],
      }, // PRINTFORMW 「为了这种事特意把我变回处女…魔王大人还真是个浪漫主义者呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1446',
        any: [
          /PRINTFORMW 「好的、请。请看我那里面的…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「好的、请。请看我那里面的…%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1447',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴的笑着掰开外阴。爱液慢慢从小穴里流了出来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%高兴的笑着掰开外阴。爱液慢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1448',
        any: [/PRINTFORMW 「想怎么使用玩弄…就随魔王大人喜欢了………」/],
      }, // PRINTFORMW 「想怎么使用玩弄…就随魔王大人喜欢了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1450',
        any: [/PRINTFORMW 「啊啊、经由魔王大人的手修复的处女膜…看见了吗…？」/],
      }, // PRINTFORMW 「啊啊、经由魔王大人的手修复的处女膜…看见了吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1453',
        any: [/PRINTFORMW 「为、为什么我要做这样的事…真是…太屈辱了………！」/],
      }, // PRINTFORMW 「为、为什么我要做这样的事…真是…太屈辱了………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1454',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边悔恨的咬着牙，一边慢慢张开大腿。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边悔恨的咬着牙，一边慢慢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1455',
        any: [
          /PRINTFORMW 「被使用摩擦过的阴唇变得肥大了？才，才没有这样的事情呢！好 好过分！」/,
        ],
      }, // PRINTFORMW 「被使用摩擦过的阴唇变得肥大了？才，才没有这样的事情呢！好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1457',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女膜被很好的再生了、这让金红桃感到很不舒服………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的处女膜被很好的再生了、这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1459',
        any: [/CFLAG:TARGET:308 = 1/],
      }, // CFLAG:TARGET:308 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1465',
        any: [/PRINTFORMW 「怎么样？　我的淫乱小穴…♪」/],
      }, // PRINTFORMW 「怎么样？　我的淫乱小穴…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1466',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不知羞耻的敞开双腿，炫耀一般的用舌头舔着嘴唇。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%不知羞耻的敞开双腿，炫耀一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1467',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%的视线，有了强烈的反应，爱液从小穴中满溢而出。/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%的视线，有了强烈的反应
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1468',
        any: [
          /PRINTFORMW 「我淫乱的小穴…如果魔王大人喜欢的话，品尝一下也未尝不可哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我淫乱的小穴…如果魔王大人喜欢的话，品尝一下也未尝不可哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1470',
        any: [
          /PRINTFORMW 「为了这种事特意把我变回处女…魔王大人还真是个浪漫主义者呢………」/,
        ],
      }, // PRINTFORMW 「为了这种事特意把我变回处女…魔王大人还真是个浪漫主义者呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1471',
        any: [/CFLAG:306 = 5/],
      }, // CFLAG:306 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1474',
        any: [
          /PRINTFORMW 「是、我的那里请看个一清二楚吧…反正我是魔王大人的东西…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是、我的那里请看个一清二楚吧…反正我是魔王大人的东西…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1475',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开心的笑着掰开外阴。爱液慢慢从小穴里流了出来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%开心的笑着掰开外阴。爱液慢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1476',
        any: [
          /PRINTFORMW 「习惯了这种淫乱行为的我…随魔王大人怎么样都行了………」/,
        ],
      }, // PRINTFORMW 「习惯了这种淫乱行为的我…随魔王大人怎么样都行了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1477',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%神情恍惚的扒开小穴向%SAVESTR:PLAYER%展示着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%神情恍惚的扒开小穴向%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1479',
        any: [
          /PRINTFORMW 「还有我的处女…请魔王大人再次夺走吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「还有我的处女…请魔王大人再次夺走吧………%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1480',
        any: [/CFLAG:306 = 4/],
      }, // CFLAG:306 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1483',
        any: [
          /PRINTFORMW 「啊啊啊…被您这样看着真是心情舒畅呢…啊啊我的脑袋好像变得奇怪了………？」/,
        ],
      }, // PRINTFORMW 「啊啊啊…被您这样看着真是心情舒畅呢…啊啊我的脑袋好像变得
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1484',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扒开小穴，对着%SAVESTR:PLAYER%像是展示一样挺着身体，把腰部抬起来玩弄着自己的小穴。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%扒开小穴，对着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1485',
        any: [
          /PRINTFORMW 「啊啊…下面被全部看光了…我、我的小穴…是、是…淫乱不堪的小穴，请观赏！」/,
        ],
      }, // PRINTFORMW 「啊啊…下面被全部看光了…我、我的小穴…是、是…淫乱不堪的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1486',
        any: [/PRINTFORMW %SAVESTR:TARGET%完全陶醉在了露出的快感中/],
      }, // PRINTFORMW %SAVESTR:TARGET%完全陶醉在了露出的快感中
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1488',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女膜被很好的再生了、这让金红桃感到很不舒服………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的处女膜被很好的再生了、这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1489',
        any: [/CFLAG:306 = 3/],
      }, // CFLAG:306 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1492',
        any: [
          /PRINTFORMW 「只要做一次以后都是一样的…谎言…啊啊、不、不要看我啊！」/,
        ],
      }, // PRINTFORMW 「只要做一次以后都是一样的…谎言…啊啊、不、不要看我啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1493',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用手扒开小穴，还不习惯的脸转向一旁，勉勉强强的对%SAVESTR:PLAYER%看着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用手扒开小穴，还不习惯的脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1494',
        any: [
          /PRINTFORMW 「已、已经、可以了吗？…咦、诶，照着说这些话就可以停下来…吗」/,
        ],
      }, // PRINTFORMW 「已、已经、可以了吗？…咦、诶，照着说这些话就可以停下来…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%听着%SAVESTR:PLAYER%在耳边说着猥琐下流的话语。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%听着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1496',
        any: [
          /PRINTFORMW 「我、这是我的小穴…是、是个糟糕的小穴、总是想要肉棒的淫乱小穴，因为经常的自慰，所以变成了这个样子！」/,
        ],
      }, // PRINTFORMW 「我、这是我的小穴…是、是个糟糕的小穴、总是想要肉棒的淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1497',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为太过于屈辱，终于无法忍耐流出的眼泪………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为太过于屈辱，终于无法忍
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1499',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女膜被很好的再生了、这让金红桃感到很不舒服………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的处女膜被很好的再生了、这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1500',
        any: [/CFLAG:306 = 2/],
      }, // CFLAG:306 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1514',
        any: [
          /PRINTFORMW 「啊哈嗯…在我的小穴里搅拌吧，弄得乱七八糟吧…哼嗯啊哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯…在我的小穴里搅拌吧，弄得乱七八糟吧…哼嗯啊哈啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1517',
        any: [
          /PRINTFORMW 「请…进入到更深的地方…无需顾虑我…嗯啊嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「请…进入到更深的地方…无需顾虑我…嗯啊嗯…啊啊%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1520',
        any: [
          /PRINTFORMW 「啊啊…手指进到里面啊…嗯啊…要高潮了！…啊啊…要变得奇怪了呀…啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊…手指进到里面啊…嗯啊…要高潮了！…啊啊…要变得奇怪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1523',
        any: [/PRINTFORMW 「啊咕！痛！说了痛啊！啊、早点拔出去！」/],
      }, // PRINTFORMW 「啊咕！痛！说了痛啊！啊、早点拔出去！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1525',
        any: [/CFLAG:TARGET:309 = 1/],
      }, // CFLAG:TARGET:309 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1531',
        any: [
          /PRINTFORMW 「啊嗯…小穴已经非常想要了呢…啊啊唔嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…小穴已经非常想要了呢…啊啊唔嗯%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1532',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%手指的搅拌下，小穴不住的收缩着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1533',
        any: [
          /PRINTFORMW 「已、已经…我的小穴已经受不了了…想要魔王大人的肉棒…嗯啊嗯好难受………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「已、已经…我的小穴已经受不了了…想要魔王大人的肉棒…嗯啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1534',
        any: [/CFLAG:309 = 5/],
      }, // CFLAG:309 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1537',
        any: [
          /PRINTFORMW 「哼啊嗯呼啊嗯！我的小穴是魔王大人专用的东西，魔王大人可以随时使用…啊嗯哼啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哼啊嗯呼啊嗯！我的小穴是魔王大人专用的东西，魔王大人可以
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1538',
        any: [/PRINTFORMW %SAVESTR:TARGET%的阴道里黏黏糊糊、一缩一缩的。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴道里黏黏糊糊、一缩一缩
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1539',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…啊哈暗…请随心所欲吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊嗯…啊哈暗…请随心所欲吧…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1540',
        any: [/CFLAG:309 = 4/],
      }, // CFLAG:309 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1543',
        any: [/PRINTFORMW 「嗯嗯！请、请再温柔一点…啊、轻一点…啊…啊啊～呜！」/],
      }, // PRINTFORMW 「嗯嗯！请、请再温柔一点…啊、轻一点…啊…啊啊～呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1544',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴道壁被扣动着而发出悲鸣。/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为阴道壁被扣动着而发出悲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1545',
        any: [/PRINTFORMW 「呜、太过分了！…嗯啊嗯啊啊…咕好痛苦！」/],
      }, // PRINTFORMW 「呜、太过分了！…嗯啊嗯啊啊…咕好痛苦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1546',
        any: [/CFLAG:309 = 3/],
      }, // CFLAG:309 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1551',
        any: [
          /PRINTFORMW 「啊嗯…咕！这…这样的…你这家伙真的是太色情了…嗯唔…啊！」/,
        ],
      }, // PRINTFORMW 「啊嗯…咕！这…这样的…你这家伙真的是太色情了…嗯唔…啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1552',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴道壁被手指侵犯着，腰开始慢慢动了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴道壁被手指侵犯着，腰开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1554',
        any: [/PRINTFORMW 「停！很痛啊！快给我住手！」/],
      }, // PRINTFORMW 「停！很痛啊！快给我住手！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1555',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%玩弄着阴道而发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1557',
        any: [/CFLAG:309 = 2/],
      }, // CFLAG:309 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1571',
        any: [/PRINTFORMW 「啊啊啊～…我的肛门感觉好荡漾啊…更多…更多的～♪」/],
      }, // PRINTFORMW 「啊啊啊～…我的肛门感觉好荡漾啊…更多…更多的～♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1574',
        any: [/PRINTFORMW 「啊啊…好难为情啊、啊、请、请不要舔…嗯…啊啊嗯！」/],
      }, // PRINTFORMW 「啊啊…好难为情啊、啊、请、请不要舔…嗯…啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1577',
        any: [/PRINTFORMW 「啊啊！为、为什么要舔那样的地方呢！讨、讨厌啊！」/],
      }, // PRINTFORMW 「啊啊！为、为什么要舔那样的地方呢！讨、讨厌啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1579',
        any: [/CFLAG:TARGET:310 = 1/],
      }, // CFLAG:TARGET:310 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1585',
        any: [
          /PRINTFORMW 「呜嗯啊呼好开心啊哈哈%UNICODE\(0x2661\) \*1% 舔肛真是太棒了…啊啊啊…太舒服了…我…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呜嗯啊呼好开心啊哈哈%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1586',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%肛门被舔着，发出了快要融化般的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%肛门被舔着，发出了快要融化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1587',
        any: [
          /PRINTFORMW 「啊嘿…舔肛什么的最棒了…啊啊…更…要更多…啊嗯啊哈…哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嘿…舔肛什么的最棒了…啊啊…更…要更多…啊嗯啊哈…哈啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1588',
        any: [/CFLAG:310 = 5/],
      }, // CFLAG:310 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1591',
        any: [
          /PRINTFORMW 「啊哈…我的屁股也是…魔王大人的东西了…啊啊…嗯唔…啊哈…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊哈…我的屁股也是…魔王大人的东西了…啊啊…嗯唔…啊哈…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1592',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被舔着，声音渐渐的从高亢尖锐变得柔和下来，像融化了一般。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门被舔着，声音渐渐的从
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1593',
        any: [
          /PRINTFORMW 「啊呜…里面全部…都请品尝吧%UNICODE\(0x2661\) \*1% 啊嗯啊哈呜啊啊～呜%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…里面全部…都请品尝吧%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1594',
        any: [/CFLAG:310 = 4/],
      }, // CFLAG:310 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1597',
        any: [/PRINTFORMW 「那、那种像狗一样…舔我的屁股什么的…嗯…啊啊！」/],
      }, // PRINTFORMW 「那、那种像狗一样…舔我的屁股什么的…嗯…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1598',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%压住肛门，狠狠的舔着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1599',
        any: [
          /PRINTFORMW 「啊啊！对、对不起请原谅我！嗯！啊啊！啊！啊呜呜呜呜～！」/,
        ],
      }, // PRINTFORMW 「啊啊！对、对不起请原谅我！嗯！啊啊！啊！啊呜呜呜呜～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1600',
        any: [/CFLAG:310 = 3/],
      }, // CFLAG:310 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1603',
        any: [
          /PRINTFORMW 「住、住手不要再舔了…还…咿、还在做…不要继续了…啊啊～呜！啊呜…天啊！」/,
        ],
      }, // PRINTFORMW 「住、住手不要再舔了…还…咿、还在做…不要继续了…啊啊～呜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1604',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%肛门的每一根经脉都被舔舐着，%SAVESTR:TARGET%痛苦的哀鸣着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%肛门的每一根经脉都被舔舐着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1605',
        any: [/CFLAG:310 = 2/],
      }, // CFLAG:310 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1619',
        any: [
          /PRINTFORMW 「还要…我的小穴还想要更多的！啊呜啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「还要…我的小穴还想要更多的！啊呜啊啊～%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1622',
        any: [
          /PRINTFORMW 「啊啊…这样的振动、好难受…啊…啊呼…嗯呜～唔%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…这样的振动、好难受…啊…啊呼…嗯呜～唔%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1625',
        any: [/PRINTFORMW 「什、什么啊、我居然因此有感觉了…啊！咕、呜咿！」/],
      }, // PRINTFORMW 「什、什么啊、我居然因此有感觉了…啊！咕、呜咿！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1627',
        any: [/CFLAG:TARGET:311 = 1/],
      }, // CFLAG:TARGET:311 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1633',
        any: [
          /PRINTFORMW 「还要…我的小穴还想要更多的！啊呜啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「还要…我的小穴还想要更多的！啊呜啊啊～%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1634',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%主动的把振动宝石放在自己身上。每当振动宝石碰到阴蒂的时候都会提起一阵高声的娇叫。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%主动的把振动宝石放在自己身
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1635',
        any: [
          /PRINTFORMW 「这种振动不行啊…啊啊啊%UNICODE\(0x2661\) \*1% 这样的玩具我还要%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「这种振动不行啊…啊啊啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1636',
        any: [/CFLAG:311 = 5/],
      }, // CFLAG:311 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1639',
        any: [
          /PRINTFORMW 「啊啊…这种振动好有感觉…啊…啊呼…嗯～呜%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…这种振动好有感觉…啊…啊呼…嗯～呜%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1640',
        any: [
          /PRINTFORMW 振动宝石集中压在%SAVESTR:TARGET%的阴蒂上，发出了及其淫荡的呻吟。/,
        ],
      }, // PRINTFORMW 振动宝石集中压在%SAVESTR:TARGET%的阴蒂上，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1641',
        any: [
          /PRINTFORMW 「哈、哈…啊啊…这个感觉是什么啊…忍不住了…要去了啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈、哈…啊啊…这个感觉是什么啊…忍不住了…要去了啊啊…%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1642',
        any: [/CFLAG:311 = 4/],
      }, // CFLAG:311 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1645',
        any: [
          /PRINTFORMW 「已经…喜欢上这种感觉了…啊啊…啊呜！呜呜…咕…啊咿呀呀！」/,
        ],
      }, // PRINTFORMW 「已经…喜欢上这种感觉了…啊啊…啊呜！呜呜…咕…啊咿呀呀！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1646',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%很老实的接受着振动宝石的“爱抚”，发出阵阵淫叫。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%很老实的接受着振动宝石的“
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1647',
        any: [
          /PRINTFORMW 「啊啊…我这么…有…有感觉什…什么的…啊啊呜…咕～咿咿！」/,
        ],
      }, // PRINTFORMW 「啊啊…我这么…有…有感觉什…什么的…啊啊呜…咕～咿咿！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1648',
        any: [/CFLAG:311 = 3/],
      }, // CFLAG:311 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1651',
        any: [
          /PRINTFORMW 「哈哈…这没什么大不了的嘛…真是…啊呼…只是稍微有点难受而已…啊咕呜呜！」/,
        ],
      }, // PRINTFORMW 「哈哈…这没什么大不了的嘛…真是…啊呼…只是稍微有点难受而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1652',
        any: [
          /PRINTFORMW 虽然说着这样的话，但是%SAVESTR:TARGET%的反应非常敏感吗………/,
        ],
      }, // PRINTFORMW 虽然说着这样的话，但是%SAVESTR:TARGET%的反
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1653',
        any: [/CFLAG:311 = 2/],
      }, // CFLAG:311 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1670',
        any: [
          /PRINTFORMW 「难得再生的处女膜…嘛算了，蠕虫也算是合口味啊…咕咿～呜！」/,
        ],
      }, // PRINTFORMW 「难得再生的处女膜…嘛算了，蠕虫也算是合口味啊…咕咿～呜！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1673',
        any: [
          /PRINTFORMW 「………魔王大人想这么做的话、我是没有拒绝的权利的…嗯呜咕呜呜！」/,
        ],
      }, // PRINTFORMW 「………魔王大人想这么做的话、我是没有拒绝的权利的…嗯呜咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1676',
        any: [
          /PRINTFORMW 「破瓜的痛楚居然会以这样的形式再次感受到…啊啊啊这样的蠕虫啊！」/,
        ],
      }, // PRINTFORMW 「破瓜的痛楚居然会以这样的形式再次感受到…啊啊啊这样的蠕虫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1682',
        any: [
          /PRINTFORMW 「唔呼呼…用蠕虫玩还是第一次呢…会是什么感觉呢？…啊啊啊…嗯呜…哈嗯呜！」/,
        ],
      }, // PRINTFORMW 「唔呼呼…用蠕虫玩还是第一次呢…会是什么感觉呢？…啊啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1685',
        any: [
          /PRINTFORMW 「啊嗯呜…蠕虫什么的也没关系、只要魔王大人喜欢的话…嗯咕呜！」/,
        ],
      }, // PRINTFORMW 「啊嗯呜…蠕虫什么的也没关系、只要魔王大人喜欢的话…嗯咕呜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1688',
        any: [
          /PRINTFORMW 「咕呜！蠕虫在…我的那里…呜咿！不要…太恶心了！快点把这个拿走诶诶诶诶！」/,
        ],
      }, // PRINTFORMW 「咕呜！蠕虫在…我的那里…呜咿！不要…太恶心了！快点把这个
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1691',
        any: [/CFLAG:312 = 1/],
      }, // CFLAG:312 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1699',
        any: [
          /PRINTFORMW 「难得再生的处女膜…嘛算了，蠕虫也算是合口味啊…咕咿～呜！」/,
        ],
      }, // PRINTFORMW 「难得再生的处女膜…嘛算了，蠕虫也算是合口味啊…咕咿～呜！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1702',
        any: [
          /PRINTFORMW 「………魔王大人想这么做的话、我是没有拒绝的权利的…嗯呜咕呜呜！」/,
        ],
      }, // PRINTFORMW 「………魔王大人想这么做的话、我是没有拒绝的权利的…嗯呜咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1705',
        any: [
          /PRINTFORMW 「破瓜的痛楚居然会以这样的形式再次感受到…啊啊啊这样的蠕虫啊！」/,
        ],
      }, // PRINTFORMW 「破瓜的痛楚居然会以这样的形式再次感受到…啊啊啊这样的蠕虫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1709',
        any: [
          /PRINTFORMW 「哇啊%UNICODE\(0x2661\) \*1% 又是蠕虫吗%UNICODE\(0x2661\) \*1% 小穴要被搞得乱七八糟了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哇啊%UNICODE(0x2661) *1% 又是蠕虫吗
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1710',
        any: [
          /PRINTFORMW 蠕虫像阴茎一样深入到%SAVESTR:TARGET%蜜壶的深处、%SAVESTR:TARGET%发出了无比高昂的呻吟声。/,
        ],
      }, // PRINTFORMW 蠕虫像阴茎一样深入到%SAVESTR:TARGET%蜜壶的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1712',
        any: [
          /PRINTFORMW 「啊啊…下贱的蠕虫…在重要的地方！啊咿%UNICODE\(0x2661\) \*1% 被这么搅动着%UNICODE\(0x2661\) \*1% 啊啊再这样下去要疯了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…下贱的蠕虫…在重要的地方！啊咿%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1714',
        any: [
          /PRINTFORMW 「啊啊呜…啊…蠕虫在…在小穴里面动了%UNICODE\(0x2661\) \*1% 啊咕呼…啊嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊呜…啊…蠕虫在…在小穴里面动了%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1716',
        any: [/CFLAG:312 = 5/],
      }, // CFLAG:312 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1719',
        any: [
          /PRINTFORMW 「啊啊…我的那里变得…嗯…请不要责备我…啊啊啊啊呜咿咦咦咿呀%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我的那里变得…嗯…请不要责备我…啊啊啊啊呜咿咦咦咿
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1720',
        any: [
          /PRINTFORMW 蠕虫插到了%SAVESTR:TARGET%蜜壶的最里面为止。然后蠕虫像是发疯了一样在蜜壶里动着。/,
        ],
      }, // PRINTFORMW 蠕虫插到了%SAVESTR:TARGET%蜜壶的最里面为止
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1722',
        any: [
          /PRINTFORMW 「嗯啊嗯…啊啊呜我、我已经要去了…啊、啊啊%UNICODE\(0x2661\) \*1% 啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊嗯…啊啊呜我、我已经要去了…啊、啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1724',
        any: [/PRINTFORMW 「咕、这样下去…呜…咕呜、坏掉了…我的小穴要坏掉了！」/],
      }, // PRINTFORMW 「咕、这样下去…呜…咕呜、坏掉了…我的小穴要坏掉了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1726',
        any: [/CFLAG:312 = 4/],
      }, // CFLAG:312 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1729',
        any: [
          /PRINTFORMW 「啊…我、我居然被这种卑劣的蠕虫…咕呜、咿！这种感觉是什么…啊啊！咕咿咦咦呜！」/,
        ],
      }, // PRINTFORMW 「啊…我、我居然被这种卑劣的蠕虫…咕呜、咿！这种感觉是什么
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1730',
        any: [
          /PRINTFORMW 蠕虫轻易的进入了%SAVESTR:TARGET%被开发完全的小穴。然后蠕虫在里面快乐的动了起来。/,
        ],
      }, // PRINTFORMW 蠕虫轻易的进入了%SAVESTR:TARGET%被开发完全
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1731',
        any: [/PRINTFORMW 「啊啊啊！不、不要…要、要去了…咕…呜咿咿咿咿咿！」/],
      }, // PRINTFORMW 「啊啊啊！不、不要…要、要去了…咕…呜咿咿咿咿咿！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1732',
        any: [/CFLAG:312 = 3/],
      }, // CFLAG:312 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1735',
        any: [
          /PRINTFORMW 「又、又是蠕虫…讨、讨厌…小穴里满满的感觉奇怪…啊…啊啊～呜！」/,
        ],
      }, // PRINTFORMW 「又、又是蠕虫…讨、讨厌…小穴里满满的感觉奇怪…啊…啊啊～
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1736',
        any: [/PRINTFORMW 蠕虫被硬生生的塞进了%SAVESTR:TARGET%蜜壶的最深处………/],
      }, // PRINTFORMW 蠕虫被硬生生的塞进了%SAVESTR:TARGET%蜜壶的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1737',
        any: [/CFLAG:312 = 2/],
      }, // CFLAG:312 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1745',
        any: [
          /PRINTFORMW 「啊啊嗯…其实一直放在里面也可以嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…其实一直放在里面也可以嘛…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1746',
        any: [
          /PRINTFORMW 突然从%SAVESTR:TARGET%的蜜裂中抽出蠕虫，发出了稀咕稀咕的声音………/,
        ],
      }, // PRINTFORMW 突然从%SAVESTR:TARGET%的蜜裂中抽出蠕虫，发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1747',
        any: [/CFLAG:372 = 3/],
      }, // CFLAG:372 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1750',
        any: [/PRINTFORMW 「结束了…哈…哈…啊啊…%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「结束了…哈…哈…啊啊…%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1751',
        any: [
          /PRINTFORMW 突然从%SAVESTR:TARGET%的蜜裂中抽出蠕虫，发出了稀咕稀咕的声音………/,
        ],
      }, // PRINTFORMW 突然从%SAVESTR:TARGET%的蜜裂中抽出蠕虫，发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1752',
        any: [/CFLAG:372 = 2/],
      }, // CFLAG:372 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1755',
        any: [/PRINTFORMW 「啊～…啊唔…啊～………」/],
      }, // PRINTFORMW 「啊～…啊唔…啊～………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1756',
        any: [
          /PRINTFORMW 突然从%SAVESTR:TARGET%的蜜裂中抽出蠕虫，发出了稀咕稀咕的声音………/,
        ],
      }, // PRINTFORMW 突然从%SAVESTR:TARGET%的蜜裂中抽出蠕虫，发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1757',
        any: [/CFLAG:372 = 1/],
      }, // CFLAG:372 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1770',
        any: [
          /PRINTFORMW 「哈、哈…啊呜…好激烈的振动啊…我要上瘾了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈、哈…啊呜…好激烈的振动啊…我要上瘾了%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1773',
        any: [
          /PRINTFORMW 「嗯呜…好激烈的振动…啊…啊呜…我要变成魔王大人的玩具了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯呜…好激烈的振动…啊…啊呜…我要变成魔王大人的玩具了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1776',
        any: [/PRINTFORMW 「什么啊、这个像玩具一样的手杖…呜咿咿！？」/],
      }, // PRINTFORMW 「什么啊、这个像玩具一样的手杖…呜咿咿！？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1777',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为意想不到的刺激发出了悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为意想不到的刺激发出了悲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1779',
        any: [/CFLAG:313 = 1/],
      }, // CFLAG:313 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1785',
        any: [
          /PRINTFORMW 「啊啊魔王大人…快把那个振动杖给我想要舒服起来%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊魔王大人…快把那个振动杖给我想要舒服起来%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1786',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像迷上了振动杖的味道了、仅仅看到振动杖眼睛就湿润了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像迷上了振动杖的味道了、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1787',
        any: [
          /PRINTFORMW 「呼啊啊啊%UNICODE\(0x2661\) \*1% …哼振动起来了…在我的小穴激烈的振动起来了呜啊啊呜啊哈啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼啊啊啊%UNICODE(0x2661) *1% …哼振
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1788',
        any: [
          /PRINTFORMW 猛烈的把振动杖紧紧贴在阴部，%SAVESTR:TARGET%的口水都流了下来。%SAVESTR:PLAYER%在一旁看着那个丢人的姿态………/,
        ],
      }, // PRINTFORMW 猛烈的把振动杖紧紧贴在阴部，%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1789',
        any: [/CFLAG:313 = 5/],
      }, // CFLAG:313 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1792',
        any: [/PRINTFORMW 「请…请用那个手杖让我舒服起来…♪」/],
      }, // PRINTFORMW 「请…请用那个手杖让我舒服起来…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1793',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%坦率的分开双腿，被振动杖刺激着发出阵阵呻吟。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%坦率的分开双腿，被振动杖刺
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1794',
        any: [
          /PRINTFORMW 「啊啊…啊～呜！太舒服了%UNICODE\(0x2661\) \*1% 嗯嗯啊啊啊…还要更多…狠狠的玩弄我%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊～呜！太舒服了%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1795',
        any: [
          /PRINTFORMW 情绪高涨，%SAVESTR:TARGET%像是要获得更多快乐一样主动的扭动着腰………/,
        ],
      }, // PRINTFORMW 情绪高涨，%SAVESTR:TARGET%像是要获得更多快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1796',
        any: [/CFLAG:313 = 4/],
      }, // CFLAG:313 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1799',
        any: [
          /PRINTFORMW 「请用那个玩具随意的玩弄我…啊啊呜…嗯…啊唉！啊…咿啊啊！」/,
        ],
      }, // PRINTFORMW 「请用那个玩具随意的玩弄我…啊啊呜…嗯…啊唉！啊…咿啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1800',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%慢慢的用振动杖在%SAVESTR:TARGET%的股间刺激着。很快%SAVESTR:TARGET%无法忍受这种快感发出了呻吟。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%慢慢的用振动杖在%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1801',
        any: [
          /PRINTFORMW 「啊啊…咕…嗯…哈啊嗯！我、我要去了…啊啊啊啊啊！哈、咕呜！」/,
        ],
      }, // PRINTFORMW 「啊啊…咕…嗯…哈啊嗯！我、我要去了…啊啊啊啊啊！哈、咕呜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1802',
        any: [/CFLAG:313 = 3/],
      }, // CFLAG:313 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1805',
        any: [
          /PRINTFORMW 「呼…咕…这、这算什么啊…根本一点也不舒服…嗯…啊嗯…一点也不…呜！」/,
        ],
      }, // PRINTFORMW 「呼…咕…这、这算什么啊…根本一点也不舒服…嗯…啊嗯…一点
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1806',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在振动杖的持续刺激下做出可爱的反应………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在振动杖的持续刺激下做出可
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1807',
        any: [/CFLAG:313 = 2/],
      }, // CFLAG:313 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1822',
        any: [
          /PRINTFORMW 「啊啊…肛门虫进入什么的…还是第一次这样%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…肛门虫进入什么的…还是第一次这样%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1823',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次感受这样的快感身体不住的颤抖着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%第一次感受这样的快感身体不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1826',
        any: [/PRINTFORMW 「是…我的屁股！请把这个蠕虫放进去！…啊啊啊啊！」/],
      }, // PRINTFORMW 「是…我的屁股！请把这个蠕虫放进去！…啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1827',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边露出陶醉的表情，一边老老实实地把屁股献给给蠕虫………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边露出陶醉的表情，一边老
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1832',
        any: [
          /PRINTFORMW 「嗯咕！？怎么这样、这样…我的屁股里…居然被这种肮脏的蠕虫…被、被侵犯着…呜、咿呀呜呀呀呀呀！」/,
        ],
      }, // PRINTFORMW 「嗯咕！？怎么这样、这样…我的屁股里…居然被这种肮脏的蠕虫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1833',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻易的把蠕虫整个吞了进去………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻易的把蠕虫整
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1835',
        any: [
          /PRINTFORMW 「啊啊啊！屁股！？虫子深入到屁股里面了啊…要发疯了！停、快停下来！」/,
        ],
      }, // PRINTFORMW 「啊啊啊！屁股！？虫子深入到屁股里面了啊…要发疯了！停、快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1836',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还未被开发的肛门被强硬的插进了蠕虫，发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%还未被开发的肛门被强硬的插
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1839',
        any: [/CFLAG:TARGET:314 = 1/],
      }, // CFLAG:TARGET:314 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1845',
        any: [
          /PRINTFORMW 「呼哇啊啊啊啊…我可爱的肛门虫酱…啊嗯…在里面随意折腾吧…啊啊呼嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼哇啊啊啊啊…我可爱的肛门虫酱…啊嗯…在里面随意折腾吧…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1846',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门时松时紧的夹着肛门虫像是在品尝蠕虫一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门时松时紧的夹着肛门虫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1847',
        any: [
          /PRINTFORMW 「啊啊嗯…我的肛门、肛门…变成蠕虫酱的巢穴了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…我的肛门、肛门…变成蠕虫酱的巢穴了呢%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1848',
        any: [/CFLAG:314 = 6/],
      }, // CFLAG:314 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1851',
        any: [
          /PRINTFORMW 「啊啊啊被蠕虫侵犯好难受啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊被蠕虫侵犯好难受啊…%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1852',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门因为蠕虫动来动去而缩了一下………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门因为蠕虫动来动去而缩
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1853',
        any: [/CFLAG:314 = 6/],
      }, // CFLAG:314 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1856',
        any: [
          /PRINTFORMW 「啊…蠕虫进到我的屁穴里面来了…是感觉到周围有淫乱的屁穴啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…蠕虫进到我的屁穴里面来了…是感觉到周围有淫乱的屁穴啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1857',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流着口水一边感受着被肛门虫蹂躏的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边流着口水一边感受着被肛
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1858',
        any: [
          /PRINTFORMW 「咕呜…啊啊…这、这…要受不了了…呜%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕呜…啊啊…这、这…要受不了了…呜%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1859',
        any: [/CFLAG:314 = 5/],
      }, // CFLAG:314 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1862',
        any: [
          /PRINTFORMW 「啊啊…蠕虫进来了…魔王大人的蠕虫啊…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…蠕虫进来了…魔王大人的蠕虫啊…啊啊啊啊啊%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1863',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边露出陶醉的表情，一边老老实实地把屁股献给给蠕虫………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边露出陶醉的表情，一边老
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1864',
        any: [/CFLAG:314 = 4/],
      }, // CFLAG:314 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1867',
        any: [
          /PRINTFORMW 「啊啊…屁穴被蠕虫侵犯什么的…为什么我…我会遇到这种事情…啊…啊咕…呼啊嗯」/,
        ],
      }, // PRINTFORMW 「啊啊…屁穴被蠕虫侵犯什么的…为什么我…我会遇到这种事情…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1868',
        any: [
          /PRINTFORMW 蠕虫轻易的进入%SAVESTR:TARGET%的肛门、快感源源不断的产生………/,
        ],
      }, // PRINTFORMW 蠕虫轻易的进入%SAVESTR:TARGET%的肛门、快感
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1869',
        any: [/CFLAG:314 = 3/],
      }, // CFLAG:314 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1872',
        any: [/PRINTFORMW 「又、又来了！蠕虫很恶心啊！」/],
      }, // PRINTFORMW 「又、又来了！蠕虫很恶心啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1873',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还未被开发的肛门被强硬的插进了蠕虫，发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%还未被开发的肛门被强硬的插
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1874',
        any: [/CFLAG:314 = 2/],
      }, // CFLAG:314 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1882',
        any: [
          /PRINTFORMW 「咕哈…接下来、是我的肛门，想要肉棒…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕哈…接下来、是我的肛门，想要肉棒…啊%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1883',
        any: [
          /PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出来、黏黏糊糊的肠液滴落下来………/,
        ],
      }, // PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1884',
        any: [/CFLAG:374 = 4/],
      }, // CFLAG:374 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1887',
        any: [/PRINTFORMW 「哈、哈…明明屁穴还想要更多………♪」/],
      }, // PRINTFORMW 「哈、哈…明明屁穴还想要更多………♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1888',
        any: [
          /PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出来、黏黏糊糊的肠液滴落下来………/,
        ],
      }, // PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1889',
        any: [/CFLAG:374 = 3/],
      }, // CFLAG:374 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1892',
        any: [/PRINTFORMW 「啊…屁穴…还…啊啊………」/],
      }, // PRINTFORMW 「啊…屁穴…还…啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1893',
        any: [
          /PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出来、黏黏糊糊的肠液滴落下来………/,
        ],
      }, // PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1894',
        any: [/CFLAG:374 = 2/],
      }, // CFLAG:374 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1897',
        any: [/PRINTFORMW 「咕啊…咕啊～…呼啊～啊啊…要、要坏掉了………」/],
      }, // PRINTFORMW 「咕啊…咕啊～…呼啊～啊啊…要、要坏掉了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1898',
        any: [/PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出来………/],
      }, // PRINTFORMW 慢慢的把蠕虫从%SAVESTR:TARGET%的肛门里拔出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1899',
        any: [/CFLAG:374 = 1/],
      }, // CFLAG:374 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1913',
        any: [
          /PRINTFORMW 「要、要是把这个夹上的话…敏感的阴蒂一定会因为太舒服了发了疯吧？」/,
        ],
      }, // PRINTFORMW 「要、要是把这个夹上的话…敏感的阴蒂一定会因为太舒服了发了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1914',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯…啊哈…啊啊啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…啊啊…嗯…啊哈…啊啊啊啊啊啊啊啊%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1917',
        any: [
          /PRINTFORMW 「啊…嗯啊被这么色情的东西夹住的话…我…我会…呼啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…嗯啊被这么色情的东西夹住的话…我…我会…呼啊…啊啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1920',
        any: [
          /PRINTFORMW 「哈啊！嗯…这、就算这样…咕呜…我、我也不会认输的…呜…啊啊！」/,
        ],
      }, // PRINTFORMW 「哈啊！嗯…这、就算这样…咕呜…我、我也不会认输的…呜…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1922',
        any: [/CFLAG:315 = 1/],
      }, // CFLAG:315 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1928',
        any: [
          /PRINTFORMW 「啊咿%UNICODE\(0x2661\) \*1% 阴蒂…啊啊咿咿呀咿咿啊哇啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊咿%UNICODE(0x2661) *1% 阴蒂…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1929',
        any: [
          /PRINTFORMW 紧紧的夹住了阴蒂，%SAVESTR:TARGET%感受着疼痛与快感的双重刺激。/,
        ],
      }, // PRINTFORMW 紧紧的夹住了阴蒂，%SAVESTR:TARGET%感受着疼
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1930',
        any: [
          /PRINTFORMW 「啊啊呜咿咿！要、马上要去了…啊啊呜啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊呜咿咿！要、马上要去了…啊啊呜啊啊啊啊啊～%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1931',
        any: [/CFLAG:315 = 5/],
      }, // CFLAG:315 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1934',
        any: [
          /PRINTFORMW 「啊嗯啊…阴蒂感觉好舒服…啊啊嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊…阴蒂感觉好舒服…啊啊嗯啊啊啊%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1935',
        any: [
          /PRINTFORMW 紧紧的夹住了阴蒂，%SAVESTR:TARGET%感受着疼痛与快感的双重刺激。/,
        ],
      }, // PRINTFORMW 紧紧的夹住了阴蒂，%SAVESTR:TARGET%感受着疼
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1936',
        any: [/PRINTFORMW 「啊啊嗯…好、好舒服……啊啊嗯…嗯…哈咕！」/],
      }, // PRINTFORMW 「啊啊嗯…好、好舒服……啊啊嗯…嗯…哈咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1937',
        any: [/CFLAG:315 = 4/],
      }, // CFLAG:315 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1940',
        any: [
          /PRINTFORMW 「哈啊…我、我…居然只是这样就有感觉了…啊…啊呜…咿、咿呀………！」/,
        ],
      }, // PRINTFORMW 「哈啊…我、我…居然只是这样就有感觉了…啊…啊呜…咿、咿呀
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1941',
        any: [/PRINTFORMW %SAVESTR:TARGET%被阴蒂夹毫不留情地欺负着…………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被阴蒂夹毫不留情地欺负着…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1942',
        any: [/CFLAG:315 = 3/],
      }, // CFLAG:315 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1945',
        any: [
          /PRINTFORMW 「啊咕呜…太、太紧了…求你取…取掉、好难受…刺激太强了…呜！求你关掉…啊啊啊！！」/,
        ],
      }, // PRINTFORMW 「啊咕呜…太、太紧了…求你取…取掉、好难受…刺激太强了…呜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1946',
        any: [/PRINTFORMW 强烈的刺激让%SAVESTR:TARGET%的膝盖不住的抖动………/],
      }, // PRINTFORMW 强烈的刺激让%SAVESTR:TARGET%的膝盖不住的抖
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1947',
        any: [/CFLAG:315 = 2/],
      }, // CFLAG:315 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1955',
        any: [
          /PRINTFORMW 「啊啊嗯…其实一直夹着也不错呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…其实一直夹着也不错呢%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1956',
        any: [/CFLAG:375 = 3/],
      }, // CFLAG:375 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1959',
        any: [/PRINTFORMW 「啊…啊啊啊…已、已经可以取掉了吗…？」/],
      }, // PRINTFORMW 「啊…啊啊啊…已、已经可以取掉了吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1960',
        any: [/CFLAG:375 = 2/],
      }, // CFLAG:375 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1963',
        any: [/PRINTFORMW 「哈啊呜嗯啊啊…呜咕呜咕…都已经变肿了………」/],
      }, // PRINTFORMW 「哈啊呜嗯啊啊…呜咕呜咕…都已经变肿了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1964',
        any: [/PRINTFORMW %SAVESTR:TARGET%/],
      }, // PRINTFORMW %SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1965',
        any: [/CFLAG:375 = 1/],
      }, // CFLAG:375 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1979',
        any: [
          /PRINTFORMW 「咿呀啊！这、这么…好厉害…的感觉…啊啊啊…啊啊嗯啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咿呀啊！这、这么…好厉害…的感觉…啊啊啊…啊啊嗯啊啊%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1982',
        any: [
          /PRINTFORMW 「唔呼…呼哇啊啊啊啊…我的乳头…这个玩具…唔唔啊啊！啊唔啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「唔呼…呼哇啊啊啊啊…我的乳头…这个玩具…唔唔啊啊！啊唔啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1985',
        any: [
          /PRINTFORMW 「什么咿呀啊！这种东西…在我美丽的胸上…唔唔啊啊啊啊～！」/,
        ],
      }, // PRINTFORMW 「什么咿呀啊！这种东西…在我美丽的胸上…唔唔啊啊啊啊～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1987',
        any: [/CFLAG:316 = 1/],
      }, // CFLAG:316 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1993',
        any: [
          /PRINTFORMW 「啊咿%UNICODE\(0x2661\) \*1% 啊啊%UNICODE\(0x2661\) \*1% 一直这样就好了…唔嗯…乳头…快感涌上来了…啊啊唔%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊咿%UNICODE(0x2661) *1% 啊啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1994',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全勃起的乳头被夹子夹着、持续不断的受着刺激………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%完全勃起的乳头被夹子夹着、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1995',
        any: [/CFLAG:316 = 4/],
      }, // CFLAG:316 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1998',
        any: [
          /PRINTFORMW 「居然对这种玩具这么有感觉…对不起、魔王大人啊啊…啊啊唔唔啊…我的身体变成了这样………唔！」/,
        ],
      }, // PRINTFORMW 「居然对这种玩具这么有感觉…对不起、魔王大人啊啊…啊啊唔唔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '1999',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全勃起的乳头被夹子夹着、持续不断的受着刺激………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%完全勃起的乳头被夹子夹着、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2000',
        any: [/CFLAG:316 = 3/],
      }, // CFLAG:316 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2003',
        any: [
          /PRINTFORMW 「咕唔…太、太过分了啦…太过分了…啊嗯唔唔！…快、快感什么的…完全没有感觉到………！」/,
        ],
      }, // PRINTFORMW 「咕唔…太、太过分了啦…太过分了…啊嗯唔唔！…快、快感什么
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2004',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全勃起的乳头被夹子夹着、持续不断的受着刺激………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%完全勃起的乳头被夹子夹着、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2005',
        any: [/CFLAG:316 = 2/],
      }, // CFLAG:316 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2013',
        any: [/PRINTFORMW 「呼、呼…已经要取下来了…？」/],
      }, // PRINTFORMW 「呼、呼…已经要取下来了…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2014',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头通红好像肿胀的要破开一样………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头通红好像肿胀的要破开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2015',
        any: [/CFLAG:376 = 3/],
      }, // CFLAG:376 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2018',
        any: [/PRINTFORMW 「咕呜…啊啊…只有魔王大人的嘴能治愈我的乳头哦………」/],
      }, // PRINTFORMW 「咕呜…啊啊…只有魔王大人的嘴能治愈我的乳头哦………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2019',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头通红好像肿胀的要破开一样………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头通红好像肿胀的要破开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2020',
        any: [/CFLAG:376 = 2/],
      }, // CFLAG:376 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2023',
        any: [/PRINTFORMW 「呼～呼～………这样的…手段太令人厌恶了………」/],
      }, // PRINTFORMW 「呼～呼～………这样的…手段太令人厌恶了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2024',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头通红好像肿胀的要破开一样………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头通红好像肿胀的要破开
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2025',
        any: [/CFLAG:376 = 1/],
      }, // CFLAG:376 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2039',
        any: [
          /PRINTFORMW 「啊啊好厉害啊…原来母乳榨取是这么…这么有感觉的事吗呜咿咿咿%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊好厉害啊…原来母乳榨取是这么…这么有感觉的事吗呜咿咿
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2042',
        any: [
          /PRINTFORMW 「哈咿…把我的母乳卖了…能贴补一些钱把………啊啊被挤出来了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈咿…把我的母乳卖了…能贴补一些钱把………啊啊被挤出来了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2045',
        any: [
          /PRINTFORMW 「什、什么…母乳…是母乳…被挤出来了…啊啊…唔咿咿咿咿咿咿！」/,
        ],
      }, // PRINTFORMW 「什、什么…母乳…是母乳…被挤出来了…啊啊…唔咿咿咿咿咿咿
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2047',
        any: [/CFLAG:317 = 1/],
      }, // CFLAG:317 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2053',
        any: [
          /PRINTFORMW 「呼哇…啊啊…被挤得好舒服啊…这种感觉！想要一直戴着这个东西…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼哇…啊啊…被挤得好舒服啊…这种感觉！想要一直戴着这个东
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2054',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是奶牛一样母乳从巨乳中呼呼的流出、很快装满了一瓶………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像是奶牛一样母乳从巨乳中呼
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2055',
        any: [/CFLAG:317 = 4/],
      }, // CFLAG:317 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2058',
        any: [
          /PRINTFORMW 「啊啊…再更多的榨取我的母乳吧！啊啊…把容器装满吧呜咿咿…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…再更多的榨取我的母乳吧！啊啊…把容器装满吧呜咿咿…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2059',
        any: [/PRINTFORMW %SAVESTR:TARGET%从被榨取母乳的行为中得到了快感………/],
      }, // PRINTFORMW %SAVESTR:TARGET%从被榨取母乳的行为中得到了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2060',
        any: [/CFLAG:317 = 3/],
      }, // CFLAG:317 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2063',
        any: [
          /PRINTFORMW 「唔…呜…我的母乳…已经被挤出这么多了…可以…可以停下来了吧………」/,
        ],
      }, // PRINTFORMW 「唔…呜…我的母乳…已经被挤出这么多了…可以…可以停下来了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2064',
        any: [/PRINTFORMW %SAVESTR:TARGET%的巨乳被咕嘟咕嘟的榨取着母乳………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的巨乳被咕嘟咕嘟的榨取着母
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2065',
        any: [/CFLAG:317 = 2/],
      }, // CFLAG:317 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2073',
        any: [
          /PRINTFORMW 「咕嗯嗯…反正我的母乳也会自己流出来…一天到晚戴着也没关系吧\.%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕嗯嗯…反正我的母乳也会自己流出来…一天到晚戴着也没关系
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2074',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫乱的表情说着，好像是真心这样想的………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着淫乱的表情说着，好像是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2075',
        any: [/CFLAG:377 = 3/],
      }, // CFLAG:377 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2078',
        any: [/PRINTFORMW 「啊嗯…已经好了吗………？」/],
      }, // PRINTFORMW 「啊嗯…已经好了吗………？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2079',
        any: [/PRINTFORMW %SAVESTR:TARGET%似乎还想要再稍微多榨取一些………/],
      }, // PRINTFORMW %SAVESTR:TARGET%似乎还想要再稍微多榨取一些
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2080',
        any: [/CFLAG:377 = 2/],
      }, // CFLAG:377 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2083',
        any: [/PRINTFORMW 「这、这种…像对待家畜一样………」/],
      }, // PRINTFORMW 「这、这种…像对待家畜一样………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2084',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为过于屈辱流下了眼泪………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为过于屈辱流下了眼泪……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2085',
        any: [/CFLAG:377 = 1/],
      }, // CFLAG:377 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2153',
        any: [
          /PRINTFORMW 「啊哈哈…咿咿唔唔啊…原来我的肛门会因为放进那样的玩具变得这么舒服啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈哈…咿咿唔唔啊…原来我的肛门会因为放进那样的玩具变得
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2154',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边呻吟着一边放松了菊花………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边呻吟着一边放松了菊花…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2157',
        any: [
          /PRINTFORMW 「哈啊…我的屁穴…请全部放进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…我的屁穴…请全部放进来吧%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2158',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为未知的快感呻吟着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为未知的快感呻吟着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2163',
        any: [
          /PRINTFORMW 「啊咕呜…把这种像是玩具一样的东西插进…我…啊唔…啊啊啊～！」/,
        ],
      }, // PRINTFORMW 「啊咕呜…把这种像是玩具一样的东西插进…我…啊唔…啊啊啊～
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2164',
        any: [/PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻松的吞入了整串肛珠………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻松的吞入了整
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2166',
        any: [
          /PRINTFORMW 「啊啊！我的屁股绝对放不进去这种东西！呜！不要快把它拿走快拿走！」/,
        ],
      }, // PRINTFORMW 「啊啊！我的屁股绝对放不进去这种东西！呜！不要快把它拿走快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2167',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%尚未完全开发的肛门被强行插进肛珠，发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%尚未完全开发的肛门被强行插
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2170',
        any: [/CFLAG:TARGET:320 = 1/],
      }, // CFLAG:TARGET:320 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2176',
        any: [
          /PRINTFORMW 「哈啊…快点让我的肛门舒服起来…快点放进去嘛…啊啊%UNICODE\(0x2661\) \*1% …啊嗯%UNICODE\(0x2661\) \*1% …啊哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…快点让我的肛门舒服起来…快点放进去嘛…啊啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2177',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门每插入一个珠子就发出一阵激烈的淫叫声………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门每插入一个珠子就发出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2178',
        any: [/CFLAG:320 = 7/],
      }, // CFLAG:320 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2181',
        any: [/PRINTFORMW 「嗯…嗯呼…哈嗯…快一点…全部塞进去嘛！」/],
      }, // PRINTFORMW 「嗯…嗯呼…哈嗯…快一点…全部塞进去嘛！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2182',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出了满足的呻吟、两腿大大的分开………/],
      }, // PRINTFORMW %SAVESTR:TARGET%发出了满足的呻吟、两腿大大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2183',
        any: [/CFLAG:320 = 6/],
      }, // CFLAG:320 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2186',
        any: [
          /PRINTFORMW 「呼哇…哈、啊啊啊…好棒啊…哈啊哈啊…再多放进去一些嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼哇…哈、啊啊啊…好棒啊…哈啊哈啊…再多放进去一些嘛…%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2187',
        any: [/PRINTFORMW %SAVESTR:TARGET%撒着娇求你再多塞进去一些珠子………/],
      }, // PRINTFORMW %SAVESTR:TARGET%撒着娇求你再多塞进去一些珠
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2188',
        any: [/CFLAG:320 = 5/],
      }, // CFLAG:320 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2191',
        any: [
          /PRINTFORMW 「呜、啊…啊啊…满满…全部都塞进来了吗…啊啊…哈啊哈啊…嗯…啊啊！」/,
        ],
      }, // PRINTFORMW 「呜、啊…啊啊…满满…全部都塞进来了吗…啊啊…哈啊哈啊…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2192',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门每塞进一个珠子都发出呻吟………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门每塞进一个珠子都发出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2193',
        any: [/CFLAG:320 = 4/],
      }, // CFLAG:320 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2196',
        any: [/PRINTFORMW 「咕呜…唔唔唔…请稍微慢一点放进去…啊…啊啊！」/],
      }, // PRINTFORMW 「咕呜…唔唔唔…请稍微慢一点放进去…啊…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2197',
        any: [/PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻松的吞入了整串肛珠………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻松的吞入了整
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2198',
        any: [/CFLAG:320 = 3/],
      }, // CFLAG:320 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2201',
        any: [
          /PRINTFORMW 「啊呜咿咿啊啊！不要…不要这样啊!不能再继续放了啊…啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊呜咿咿啊啊！不要…不要这样啊!不能再继续放了啊…啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2202',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%尚未完全开发的肛门被强行插进肛珠，发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%尚未完全开发的肛门被强行插
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2203',
        any: [/CFLAG:320 = 2/],
      }, // CFLAG:320 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2211',
        any: [
          /PRINTFORMW 「啊哈哇哇哇…肛门唔咕唔咕啊啊…好强烈唔啊啊啊…啊唔咿咿咿咿…哇哇哇哇哇…这、这太…激烈了唔唔唔…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈哇哇哇…肛门唔咕唔咕啊啊…好强烈唔啊啊啊…啊唔咿咿咿
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2212',
        any: [
          /PRINTFORMW 一口气抽出屁股里的所有肛珠，%SAVESTR:TARGET%因为过于强烈的快感快乐的翻了白眼，口水流个不停………/,
        ],
      }, // PRINTFORMW 一口气抽出屁股里的所有肛珠，%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2213',
        any: [/CFLAG:379 = 6/],
      }, // CFLAG:379 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2216',
        any: [/PRINTFORMW 「啊啊！肛门要坏掉了坏掉了…啊呜咿咿咿咿咿呜！」/],
      }, // PRINTFORMW 「啊啊！肛门要坏掉了坏掉了…啊呜咿咿咿咿咿呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2217',
        any: [
          /PRINTFORMW 一口气抽出全部肛珠，强烈的刺激让%SAVESTR:TARGET%不由发出了悲鸣………/,
        ],
      }, // PRINTFORMW 一口气抽出全部肛珠，强烈的刺激让%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2218',
        any: [/CFLAG:379 = 5/],
      }, // CFLAG:379 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2221',
        any: [
          /PRINTFORMW 「啊啊啊…啊呜啊咿咿咿咿咿呜…太刺激了太刺激了啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…啊呜啊咿咿咿咿咿呜…太刺激了太刺激了啊啊啊啊啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2222',
        any: [
          /PRINTFORMW 一口气抽出了屁股里的所有肛珠，%SAVESTR:TARGET%因为多度的快感，肛门蠕动颤抖着，肠液不住的流淌………/,
        ],
      }, // PRINTFORMW 一口气抽出了屁股里的所有肛珠，%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2223',
        any: [/CFLAG:379 = 4/],
      }, // CFLAG:379 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2226',
        any: [
          /PRINTFORMW 「啊啊…啊…呜咿咿咿呜呜…屁、屁股要坏掉了…已经不行了………」/,
        ],
      }, // PRINTFORMW 「啊啊…啊…呜咿咿咿呜呜…屁、屁股要坏掉了…已经不行了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2227',
        any: [
          /PRINTFORMW 肛珠一口气被拔出，%SAVESTR:TARGET%的眼泪不受控制流了下来………/,
        ],
      }, // PRINTFORMW 肛珠一口气被拔出，%SAVESTR:TARGET%的眼泪不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2228',
        any: [/CFLAG:379 = 3/],
      }, // CFLAG:379 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2231',
        any: [/PRINTFORMW 「呜啊、停、停下！呜…呜啊啊啊啊啊啊啊！」/],
      }, // PRINTFORMW 「呜啊、停、停下！呜…呜啊啊啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2232',
        any: [
          /PRINTFORMW 一口气抽出全部肛珠，强烈的刺激让%SAVESTR:TARGET%发出了阵阵娇喘………/,
        ],
      }, // PRINTFORMW 一口气抽出全部肛珠，强烈的刺激让%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2233',
        any: [/CFLAG:379 = 2/],
      }, // CFLAG:379 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2236',
        any: [/PRINTFORMW 「唔！停下！快停下！啊！咿！啊啊啊啊～！」/],
      }, // PRINTFORMW 「唔！停下！快停下！啊！咿！啊啊啊啊～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2237',
        any: [
          /PRINTFORMW 一口气抽出全部肛珠，强烈的刺激让%SAVESTR:TARGET%尖叫着………/,
        ],
      }, // PRINTFORMW 一口气抽出全部肛珠，强烈的刺激让%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2238',
        any: [/CFLAG:379 = 1/],
      }, // CFLAG:379 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2253',
        any: [
          /PRINTFORMW 「啊啊嗯～…还真是不客气啊…咕、啊…呼呼…这疼痛…真是受不了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯～…还真是不客气啊…咕、啊…呼呼…这疼痛…真是受不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2254',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住了%SAVESTR:TARGET%那具丰满的肉体、品尝了处女的肉体。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%压住了%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2255',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的秘裂流出鲜血，这种痛苦反而让%SAVESTR:TARGET%感到了更强烈的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的秘裂流出鲜血，这种痛苦反
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2256',
        any: [
          /PRINTFORMW 「啊…啊呼啊嗯嗯%UNICODE\(0x2661\) \*1% 我…如果一直都这么舒服的话，不管多少次处女都可以交出去呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…啊呼啊嗯嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2259',
        any: [
          /PRINTFORMW 「啊…嗯…呼、插进来了…啊啊啊…呼…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…嗯…呼、插进来了…啊啊啊…呼…啊啊嗯%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2260',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%紧紧的按在地上、在阴茎插进去的时候不住的颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2261',
        any: [
          /PRINTFORMW 阴茎在蜜壶里一路突破，再次夺走了处女膜、%SAVESTR:TARGET%吐露的感动的呻吟。/,
        ],
      }, // PRINTFORMW 阴茎在蜜壶里一路突破，再次夺走了处女膜、%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2262',
        any: [
          /PRINTFORMW 「啊啊啊～！…魔王大人…魔王大人…我永远都是你的东西了%UNICODE\(0x2661\) \*1% 啊啊！不要离开我！」/,
        ],
      }, // PRINTFORMW 「啊啊啊～！…魔王大人…魔王大人…我永远都是你的东西了%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2265',
        any: [
          /PRINTFORMW 「不会吧！…我的处女膜居然再生了…处女要再次被夺走…可恶！」/,
        ],
      }, // PRINTFORMW 「不会吧！…我的处女膜居然再生了…处女要再次被夺走…可恶！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2266',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎一路突破了处女膜，插进%SAVESTR:TARGET%的最深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%的阴茎一路突破了处女膜，插
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2267',
        any: [/PRINTFORMW 「咕啊嗯！…又再次尝到了这种痛苦…真是…到底…可恶！」/],
      }, // PRINTFORMW 「咕啊嗯！…又再次尝到了这种痛苦…真是…到底…可恶！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2268',
        any: [/PRINTFORMW %SAVESTR:TARGET%被夺走了处女，因为痛苦咬紧的嘴唇………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被夺走了处女，因为痛苦咬紧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2273',
        any: [
          /PRINTFORMW 「呼呼…嗯…啊啊%UNICODE\(0x2661\) \*1% 我果然…爱死魔王大人的肉棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼呼…嗯…啊啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2274',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壺最深处被%SAVESTR:PLAYER%的肉棒贯穿了、难以言喻的快感让%SAVESTR:TARGET%发出了呻吟。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壺最深处被%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2275',
        any: [
          /PRINTFORMW 「来吧…我的身体请随意品尝…啊啊…魔王大人啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「来吧…我的身体请随意品尝…啊啊…魔王大人啊…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2276',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为那句撒娇的话而鼓起干劲、交合声和%SAVESTR:TARGET%的喘息声刺激着%SAVESTR:PLAYER%的耳朵………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为那句撒娇的话而鼓起干劲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2279',
        any: [
          /PRINTFORMW 「哈…哈…嗯…呼哈…哇、居然这么有感觉…啊啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈…哈…嗯…呼哈…哇、居然这么有感觉…啊啊…啊嗯%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2280',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那丰满的身体在%SAVESTR:PLAYER%的怀里感到安心、无力的瘫软着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%那丰满的身体在%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2281',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎每次抽送都会在秘崩中溅起爱液、%SAVESTR:TARGET%甘美的呻吟在耳边回响。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%的阴茎每次抽送都会在秘崩中
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2282',
        any: [
          /PRINTFORMW 「啊啊嗯…呼呼…啊啊嗯%UNICODE\(0x2661\) \*1% 啊啊…不错啊啊…请抱紧我%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…呼呼…啊啊嗯%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2287',
        any: [
          /PRINTFORMW 「啊咕！…突、突然要侵犯我什么的…啊啊啊！…真是太过分了…啊啊！」/,
        ],
      }, // PRINTFORMW 「啊咕！…突、突然要侵犯我什么的…啊啊啊！…真是太过分了…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2288',
        any: [
          /PRINTFORMW 为了让%SAVESTR:TARGET%搞清自己已经不是亲卫队长、而是魔王的女奴、%SAVESTR:PLAYER%在第一次调教时就毫不留情的侵犯了她。/,
        ],
      }, // PRINTFORMW 为了让%SAVESTR:TARGET%搞清自己已经不是亲卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2289',
        any: [/PRINTFORMW 「哈…哈…唔…咕呜！」/],
      }, // PRINTFORMW 「哈…哈…唔…咕呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2291',
        any: [/PRINTFORMW 「就、就算这样…也没什么大不了的…啊…啊啊！啊嗯！」/],
      }, // PRINTFORMW 「就、就算这样…也没什么大不了的…啊…啊啊！啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2292',
        any: [
          /PRINTFORMW 这副被狂王疼爱的%SAVESTR:TARGET%的丰满身体，%SAVESTR:PLAYER%每动一次都表现出敏感的反应。/,
        ],
      }, // PRINTFORMW 这副被狂王疼爱的%SAVESTR:TARGET%的丰满身体
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2293',
        any: [/PRINTFORMW 「哈、早点弄完走开吧…这种事情…啊啊咕呜呜…啊嗯！」/],
      }, // PRINTFORMW 「哈、早点弄完走开吧…这种事情…啊啊咕呜呜…啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2294',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这副迷人的身体已经是%SAVESTR:PLAYER%的东西了、日后慢慢的侵犯她吧………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%这副迷人的身体已经是%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2296',
        any: [/PRINTFORMW 「呼、也没什么大不了的…嗯…嗯…嗯唔唔」/],
      }, // PRINTFORMW 「呼、也没什么大不了的…嗯…嗯…嗯唔唔」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2297',
        any: [
          /PRINTFORMW 这副被狂王疼爱的%SAVESTR:TARGET%的丰满身体被%SAVESTR:PLAYER%侵犯了。%SAVESTR:TARGET%每动一次都发出闷哼的声音。/,
        ],
      }, // PRINTFORMW 这副被狂王疼爱的%SAVESTR:TARGET%的丰满身体
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2298',
        any: [/PRINTFORMW 「以为用这种姿势…嗯…呼…唔…嗯…咕！」/],
      }, // PRINTFORMW 「以为用这种姿势…嗯…呼…唔…嗯…咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2299',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被侵犯着，脸上的富余的表情逐渐瓦解了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被侵犯着，脸上的富余的表情
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2303',
        any: [/PRINTFORMW 「唔…咕…在深处…啊…啊啊…嗯咕呜！」/],
      }, // PRINTFORMW 「唔…咕…在深处…啊…啊啊…嗯咕呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2304',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴道深处被%SAVESTR:PLAYER%的阴茎侵犯着。%SAVESTR:TARGET%在发出悲鸣的一瞬间咬紧嘴唇，忍耐着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴道深处被%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2305',
        any: [
          /PRINTFORMW 「哈啊哈啊…就、就这种程度也想让我屈服吗…嗯…服…嗯嗯嗯！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…就、就这种程度也想让我屈服吗…嗯…服…嗯嗯嗯！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2306',
        any: [
          /PRINTFORMW 在%SAVESTR:TARGET%身上慢慢的摇晃着、看来比预想的要能忍耐啊，不过这就是调教的乐趣嘛………/,
        ],
      }, // PRINTFORMW 在%SAVESTR:TARGET%身上慢慢的摇晃着、看来比
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2308',
        any: [
          /PRINTFORMW 「呜咕…哈啊哈啊…呼、真的有放进来吗？也没什么大不了的吗…啊…呜、不要动！」/,
        ],
      }, // PRINTFORMW 「呜咕…哈啊哈啊…呼、真的有放进来吗？也没什么大不了的吗…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2309',
        any: [
          /PRINTFORMW 按住%SAVESTR:TARGET%阴茎激烈的抽送着、%SAVESTR:TARGET%露出厌恶的表情，不时的骂着。/,
        ],
      }, // PRINTFORMW 按住%SAVESTR:TARGET%阴茎激烈的抽送着、%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2310',
        any: [
          /PRINTFORMW 「嗯…咕呜…只、只有这种程度吗我一点感觉都没有…啊啊！你真的在侵犯我吗？…嗯咕唔唔！」/,
        ],
      }, // PRINTFORMW 「嗯…咕呜…只、只有这种程度吗我一点感觉都没有…啊啊！你真
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2311',
        any: [
          /PRINTFORMW 因为很痛%SAVESTR:TARGET%发出了悲鸣。不过这种事情不必介意、%SAVESTR:TARGET%只是一个奴隶而已………/,
        ],
      }, // PRINTFORMW 因为很痛%SAVESTR:TARGET%发出了悲鸣。不过这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2316',
        any: [/CFLAG:321 = 1/],
      }, // CFLAG:321 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2324',
        any: [
          /PRINTFORMW 「啊嗯…不用客气…哈、啊…唔呼…这种痛感…真是不好忍受啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…不用客气…哈、啊…唔呼…这种痛感…真是不好忍受啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2325',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%按住%SAVESTR:TARGET%丰满的身体、‘品尝’着处女的滋味。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%按住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%秘裂流出血来，但这种痛感对现在的%SAVESTR:TARGET%只是煽动快感的来源罢了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%秘裂流出血来，但这种痛感对
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2327',
        any: [
          /PRINTFORMW 「啊…啊哈啊嗯%UNICODE\(0x2661\) \*1% 突然觉得…如果是这种心情，多被夺走几次处女也不错呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…啊哈啊嗯%UNICODE(0x2661) *1% 突
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2330',
        any: [
          /PRINTFORMW 「啊…嗯…插、插入进来了…啊啊…唔…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…嗯…插、插入进来了…啊啊…唔…啊嗯%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2331',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%紧紧的按着、感受到阴茎进入的快感而颤抖了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2332',
        any: [
          /PRINTFORMW 在阴茎缓缓进入蜜壺夺走处女的瞬間、%SAVESTR:TARGET%吐露了动人的呻吟。/,
        ],
      }, // PRINTFORMW 在阴茎缓缓进入蜜壺夺走处女的瞬間、%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2333',
        any: [
          /PRINTFORMW 「啊～啊啊～！…魔王大人…魔王大人…我变成你的东西了%UNICODE\(0x2661\) \*1% 啊～！永远不会分开了！」/,
        ],
      }, // PRINTFORMW 「啊～啊啊～！…魔王大人…魔王大人…我变成你的东西了%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2336',
        any: [/PRINTFORMW 「咕啊！…居然把我的处女膜再生…又夺走了…咕～唔！」/],
      }, // PRINTFORMW 「咕啊！…居然把我的处女膜再生…又夺走了…咕～唔！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2337',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎撕破处女膜进到了%SAVESTR:TARGET%深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%的阴茎撕破处女膜进到了%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2338',
        any: [/PRINTFORMW 「咕呜！…居然又一次感到这种痛楚…呜…咕…！」/],
      }, // PRINTFORMW 「咕呜！…居然又一次感到这种痛楚…呜…咕…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2339',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被按住，感到被夺走处女的痛楚而咬紧的嘴唇………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被按住，感到被夺走处女的痛
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2346',
        any: [
          /PRINTFORMW 「啊嗯！嗯…再激烈一点想要再激烈一点啊啊～！%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯！嗯…再激烈一点想要再激烈一点啊啊～！%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2347',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壺深处被%SAVESTR:PLAYER%的阴茎贯穿、%SAVESTR:TARGET%吐露出诱人的呻吟。%SAVESTR:PLAYER%更激烈的抽插了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壺深处被%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2348',
        any: [
          /PRINTFORMW 「呼啊呼啊%UNICODE\(0x2661\) \*1% 咕啾咕啾的%UNICODE\(0x2661\) \*1% 咕啾咕啾的侵犯我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼啊呼啊%UNICODE(0x2661) *1% 咕啾咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2349',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶随着被侵犯而越来越有感觉、湿乎乎的皱褶包裹着%SAVESTR:PLAYER%的阴茎、互相寻求着快乐。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶随着被侵犯而越来越有
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2350',
        any: [
          /PRINTFORMW 「咕嗯嗯啊…啊啊～啊嗯啊嗯…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕嗯嗯啊…啊啊～啊嗯啊嗯…啊啊啊啊啊啊%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2352',
        any: [
          /PRINTFORMW 「啊啊…嗯、好急人…我明明想要更激烈一点…啊嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯、好急人…我明明想要更激烈一点…啊嗯啊啊啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2353',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%慢慢的动着腰，搅动着%SAVESTR:TARGET%的蜜壶。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%慢慢的动着腰，搅动着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2354',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%急不可待的上下动着腰，催促着%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%急不可待的上下动着腰，催促
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2355',
        any: [
          /PRINTFORMW 「求你了…激烈的侵犯我的小穴吧…啊啊啊——停不下来啊！」/,
        ],
      }, // PRINTFORMW 「求你了…激烈的侵犯我的小穴吧…啊啊啊——停不下来啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2356',
        any: [
          /PRINTFORMW 因为%SAVESTR:TARGET%那像痴女一样的祈求，%SAVESTR:PLAYER%苦笑着鼓起了干劲。/,
        ],
      }, // PRINTFORMW 因为%SAVESTR:TARGET%那像痴女一样的祈求，%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2357',
        any: [
          /PRINTFORMW 「嗯呀…十分感谢…小穴小穴好舒服%UNICODE\(0x2661\) \*1% 最喜欢魔王大人的肉棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯呀…十分感谢…小穴小穴好舒服%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2359',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 这个姿势是…认真的侵犯我呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊%UNICODE(0x2661) *1% 这个姿势是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2360',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不停的插着、漏出了陶醉的声音。丰满的身体开始散发出了淫靡的香味。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被不停的插着、漏出了陶醉的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2361',
        any: [
          /PRINTFORMW 「快点快点…咕噜咕噜的侵犯我的小学%UNICODE\(0x2661\) \*1% 让我发狂吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「快点快点…咕噜咕噜的侵犯我的小学%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2362',
        any: [
          /PRINTFORMW 苦笑道”你已经是小穴狂了”的%SAVESTR:PLAYER%更激烈的抽送起了阴茎。/,
        ],
      }, // PRINTFORMW 苦笑道”你已经是小穴狂了”的%SAVESTR:PLAYER
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2363',
        any: [
          /PRINTFORMW 「咕咦…这样就好%UNICODE\(0x2661\) \*1% 小穴最棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕咦…这样就好%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2365',
        any: [/CFLAG:321 = 9/],
      }, // CFLAG:321 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2369',
        any: [
          /PRINTFORMW 「如果知道是这么舒服的话…能更早…成为魔王大人的东西就好了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「如果知道是这么舒服的话…能更早…成为魔王大人的东西就好了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2370',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就像是什么被解放了一样一边叫着一边抱着%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就像是什么被解放了一样一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2371',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的被抱着的后背、就像想想的那样指甲插了进来。连那个痛处都感觉很舒服的%SAVESTR:PLAYER%激烈的不停抽送着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%的被抱着的后背、就像想想的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2372',
        any: [
          /PRINTFORMW 「啊啊啊嗯啊啊…啊嗯继续…继续抱我…啊嗯啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊嗯啊啊…啊嗯继续…继续抱我…啊嗯啊啊啊——%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2374',
        any: [
          /PRINTFORMW 「啊咕！最喜欢连深处都被疼爱了%UNICODE\(0x2661\) \*1% 啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊咕！最喜欢连深处都被疼爱了%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2375',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不停的插着、因为从上面被激烈插入的蜜壶而发出野兽般的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被不停的插着、因为从上面被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2376',
        any: [
          /PRINTFORMW 「哦哦哦哦%UNICODE\(0x2661\) \*1% 插进来了，插进来了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哦哦哦哦%UNICODE(0x2661) *1% 插进来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2377',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了更好的品味着蜜壶、抓住%SAVESTR:TARGET%的脚腕压向地面，更快的动了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了更好的品味着蜜壶、抓住
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2378',
        any: [
          /PRINTFORMW 「呀啊啊%UNICODE\(0x2661\) \*1% 啊啊啊啊…要、要坏掉了…要坏掉了啊…哦哦啊嗯哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呀啊啊%UNICODE(0x2661) *1% 啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2380',
        any: [
          /PRINTFORMW 「嗯哈哈嗯啊…嗯咕——%UNICODE\(0x2661\) \*1% 里面好舒服…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯哈哈嗯啊…嗯咕——%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2381',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边被侵犯着蜜壶，一边被%SAVESTR:PLAYER%紧紧地抱着。汗液在身体上散发出煽情的气味。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边被侵犯着蜜壶，一边被%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2382',
        any: [
          /PRINTFORMW 「啊嗯啊啊…魔王大人的肉棒和我的子宫啾啾的接吻了…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊…魔王大人的肉棒和我的子宫啾啾的接吻了…啊啊啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2383',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%插入到了深处，前后动着腰、发出着悲鸣似的娇喘………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2385',
        any: [/CFLAG:321 = 8/],
      }, // CFLAG:321 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2389',
        any: [
          /PRINTFORMW 「呼——…呼——…快、快动起来！请动起来…哦、哦！求你了！」/,
        ],
      }, // PRINTFORMW 「呼——…呼——…快、快动起来！请动起来…哦、哦！求你了！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2390',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%插入着%SAVESTR:TARGET%的蜜壶就那样不动，享受着阴茎被包裹的感觉时，%SAVESTR:TARGET%发出了祈求的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%插入着%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2391',
        any: [
          /PRINTFORMW 「不要，不要这样！你要负起把、把我变得奇怪的责任…啊啊啊啊啊～！」/,
        ],
      }, // PRINTFORMW 「不要，不要这样！你要负起把、把我变得奇怪的责任…啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2392',
        any: [
          /PRINTFORMW 对于性爱狂的%SAVESTR:TARGET%来说，继续保持这样就像是拷问一样吧、%SAVESTR:PLAYER%默默地笑着，慢慢的动起了腰………/,
        ],
      }, // PRINTFORMW 对于性爱狂的%SAVESTR:TARGET%来说，继续保持
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2394',
        any: [/PRINTFORMW 「啊啊恩…哈哈…啊啊啊…肉棒好舒服啊呀啊呀呀呀呀呀！」/],
      }, // PRINTFORMW 「啊啊恩…哈哈…啊啊啊…肉棒好舒服啊呀啊呀呀呀呀呀！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2395',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%抽送阴茎，%SAVESTR:TARGET%发出了野兽般的悲鸣。/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%抽送阴茎，%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2396',
        any: [
          /PRINTFORMW 蜜壶包裹着%SAVESTR:PLAYER%的阴茎、交换着无上的快乐。/,
        ],
      }, // PRINTFORMW 蜜壶包裹着%SAVESTR:PLAYER%的阴茎、交换着无
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2397',
        any: [/PRINTFORMW 「我…这样…这样！嗯啊啊啊啊…嗯啊啊啊啊啊啊」/],
      }, // PRINTFORMW 「我…这样…这样！嗯啊啊啊啊…嗯啊啊啊啊啊啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2399',
        any: [/PRINTFORMW 「啊嗯啊啊啊…我才不是输给了肉棒啊啊嗯啊啊呀！」/],
      }, // PRINTFORMW 「啊嗯啊啊啊…我才不是输给了肉棒啊啊嗯啊啊呀！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2400',
        any: [
          /PRINTFORMW 蜜壶的深处被阴茎插入、%SAVESTR:TARGET%颤抖的伸出来、发出微弱的悲鸣。/,
        ],
      }, // PRINTFORMW 蜜壶的深处被阴茎插入、%SAVESTR:TARGET%颤抖
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2401',
        any: [
          /PRINTFORMW 「啊啊啊——！啊…啊哈！不行…输给肉棒…啊咦咦咦咦咦咦！」/,
        ],
      }, // PRINTFORMW 「啊啊啊——！啊…啊哈！不行…输给肉棒…啊咦咦咦咦咦咦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2402',
        any: [
          /PRINTFORMW “已经是性爱狂了，事到如今还这样”%SAVESTR:PLAYER%一边苦笑着、一边愉快的侵犯者%SAVESTR:TARGET%的蜜壶………/,
        ],
      }, // PRINTFORMW “已经是性爱狂了，事到如今还这样”%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2404',
        any: [/CFLAG:321 = 7/],
      }, // CFLAG:321 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2408',
        any: [
          /PRINTFORMW 「啊啊嗯！嗯…好、好深…啊啊…嗯…忍不了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯！嗯…好、好深…啊啊…嗯…忍不了啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2409',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶的深处被%SAVESTR:PLAYER%的阴茎贯穿、%SAVESTR:TARGET%发出了感动的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶的深处被%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2412',
        any: [
          /PRINTFORMW 「啊嗯…啊…啊哈%UNICODE\(0x2661\) \*1% 可以哦…继续把我的小穴侵犯的乱七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…啊…啊哈%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2413',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为这句话而鼓起了干劲、水声和%SAVESTR:TARGET%的喘息声舒服的刺激着%SAVESTR:PLAYER%的耳朵………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为这句话而鼓起了干劲、水
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2415',
        any: [
          /PRINTFORMW 「哈哈…嗯啊！好舒服%UNICODE\(0x2661\) \*1% 更多的调教我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈哈…嗯啊！好舒服%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2418',
        any: [
          /PRINTFORMW 「啊啊…这么温柔的动作是不行的啊！我明明更喜欢激烈的方式…嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…这么温柔的动作是不行的啊！我明明更喜欢激烈的方式…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2419',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%慢慢的动着腰，搅拌着%SAVESTR:TARGET%的蜜壶。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%慢慢的动着腰，搅拌着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2422',
        any: [
          /PRINTFORMW 让%SAVESTR:TARGET%焦急不已的动作、让淫乱的蜜壶敏感的反应着。/,
        ],
      }, // PRINTFORMW 让%SAVESTR:TARGET%焦急不已的动作、让淫乱的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2423',
        any: [
          /PRINTFORMW 「嗯啊嗯…啊…啊啊…嗯！哈哈…啊嗯啊…啊嗯…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊嗯…啊…啊啊…嗯！哈哈…啊嗯啊…啊嗯…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2424',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 啊嗯…慢也可以，就这样继续动吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊%UNICODE(0x2661) *1% 啊嗯…慢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2426',
        any: [
          /PRINTFORMW 「嗯…咕…啊啊…更激烈的动起来！我讨厌这样…着急…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…咕…啊啊…更激烈的动起来！我讨厌这样…着急…啊啊嗯%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2429',
        any: [
          /PRINTFORMW 「啊啊恩…这个姿势的话全都被看见了%UNICODE\(0x2661\) \*1%啊啊嗯啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊恩…这个姿势的话全都被看见了%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2430',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不停的插着、因为从上面被激烈插入的蜜壶而发出喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被不停的插着、因为从上面被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2433',
        any: [
          /PRINTFORMW 「啊啊！好深啊！啊嗯啊啊%UNICODE\(0x2661\) \*1% 小穴全部被侵犯了…嗯啊…啊呀啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！好深啊！啊嗯啊啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2434',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜壶深处被挖掘而发出了悲鸣一样的喘息………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜壶深处被挖掘而发出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2436',
        any: [
          /PRINTFORMW 「啊嗯！好激烈啊%UNICODE\(0x2661\) \*1% 这个好棒，要变成喜欢肉棒的奴隶了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯！好激烈啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2439',
        any: [/CFLAG:321 = 6/],
      }, // CFLAG:321 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2443',
        any: [
          /PRINTFORMW 「哈啊…哈啊…嗯…嗯啊…感觉到了…感觉到了魔王大人的爱了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…哈啊…嗯…嗯啊…感觉到了…感觉到了魔王大人的爱了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2444',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把丰满的身体安心的托付给%SAVESTR:PLAYER%、就那样保持着这个姿势。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把丰满的身体安心的托付给%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2447',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%的阴茎抽送，秘裂都会飞出爱液、%SAVESTR:TARGET%甜美的声音在旁边回响着。/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%的阴茎抽送，秘裂都会飞
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2448',
        any: [
          /PRINTFORMW 「啊啊嗯…哈哈…啊啊嗯%UNICODE\(0x2661\) \*1% 啊啊…好棒…请继续抱我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…哈哈…啊啊嗯%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2450',
        any: [
          /PRINTFORMW 「啊啊…嗯…我没关系的…更加…激烈的…爱我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯…我没关系的…更加…激烈的…爱我吧%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2453',
        any: [
          /PRINTFORMW 「嗯哈哈…啊嗯…啊啊%UNICODE\(0x2661\) \*1% 好棒…啊嗯更多…更多%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯哈哈…啊嗯…啊啊%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2454',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为有感觉而紧紧地抱住%SAVESTR:PLAYER%。汗液在身体上散发出煽情的气味。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为有感觉而紧紧地抱住%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2457',
        any: [
          /PRINTFORMW 「啊啊…继续…继续爱我吧%UNICODE\(0x2661\) \*1% 激烈的…好棒啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…继续…继续爱我吧%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2458',
        any: [
          /PRINTFORMW 输给%SAVESTR:TARGET%祈求的%SAVESTR:PLAYER%开始了激烈的抽送。%SAVESTR:TARGET%发出了愉快的声音………/,
        ],
      }, // PRINTFORMW 输给%SAVESTR:TARGET%祈求的%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2460',
        any: [
          /PRINTFORMW 「嗯咕…好激烈…好激烈啊…啊啊啊…但是…这样就好…啊啊！」/,
        ],
      }, // PRINTFORMW 「嗯咕…好激烈…好激烈啊…啊啊啊…但是…这样就好…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2463',
        any: [
          /PRINTFORMW 「嗯啊这么舒服的话…嗯啊嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊这么舒服的话…嗯啊嗯…啊啊%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2464',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不停的插着、因为从上面被激烈插入的蜜壶而发出喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被不停的插着、因为从上面被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2467',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1% 啊啊啊%UNICODE\(0x2661\) \*1% 插到深处来了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯%UNICODE(0x2661) *1% 啊啊啊%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2468',
        any: [
          /PRINTFORMW 有感觉的%SAVESTR:TARGET%的腿一下伸了出来、%SAVESTR:PLAYER%抓住脚腕压在了地上，更快的动了起来。/,
        ],
      }, // PRINTFORMW 有感觉的%SAVESTR:TARGET%的腿一下伸了出来、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2469',
        any: [
          /PRINTFORMW 「啊啊啊啊%UNICODE\(0x2661\) \*1% 嗯啊…这样停不下来啊…啊啊啊——啊啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊%UNICODE(0x2661) *1% 嗯啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2471',
        any: [
          /PRINTFORMW 「啊啊！啊！我的哪里…啊嗯…已经变成魔王大人的形状了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！啊！我的哪里…啊嗯…已经变成魔王大人的形状了%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2474',
        any: [/CFLAG:321 = 5/],
      }, // CFLAG:321 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2478',
        any: [/PRINTFORMW 「啊…啊啊恩！…咕…哈哈…嗯啊啊嗯！」/],
      }, // PRINTFORMW 「啊…啊啊恩！…咕…哈哈…嗯啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2479',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着%SAVESTR:PLAYER%插进蜜壶而发出了喘息声、享受着因快感而苦闷这的%SAVESTR:TARGET%的%SAVESTR:PLAYER%更激烈的抽送了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%随着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2481',
        any: [/PRINTFORMW 「啊啊！太、太激烈了！饶、饶了我吧…呀啊啊啊啊——！」/],
      }, // PRINTFORMW 「啊啊！太、太激烈了！饶、饶了我吧…呀啊啊啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2483',
        any: [
          /PRINTFORMW 「这样的话我嗯啊呀…啊啊啊嗯！咦…已、已经忍耐…啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「这样的话我嗯啊呀…啊啊啊嗯！咦…已、已经忍耐…啊啊啊——
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2485',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶每次被插入都会飞溅出爱液、%SAVESTR:PLAYER%的腰一定到绝顶为止都不会停下来吧………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶每次被插入都会飞溅出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2487',
        any: [/PRINTFORMW 「不可能…我…这么有感觉什么的、啊啊啊啊！」/],
      }, // PRINTFORMW 「不可能…我…这么有感觉什么的、啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2488',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%终于对%SAVESTR:PLAYER%的腰的动作有感觉了、蜜壶每次被插进来都会啾啾的包裹回去。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%终于对%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2490',
        any: [
          /PRINTFORMW 「啊啊啊！啊嗯…不行…不行了…啊咦…呀啊啊啊啊！我、我要…不、不行了啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊啊！啊嗯…不行…不行了…啊咦…呀啊啊啊啊！我、我要…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2492',
        any: [
          /PRINTFORMW 「啊咕！不行不行…这么插进来的话要不行了…啊嗯嗯…啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊咕！不行不行…这么插进来的话要不行了…啊嗯嗯…啊啊啊—
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2494',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边笑着，一边品味着包裹过来的%SAVESTR:TARGET%蜜壶的感触………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边笑着，一边品味着包裹过
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2496',
        any: [/CFLAG:321 = 4/],
      }, // CFLAG:321 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2500',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯咕…！我能老师的被抱着…啊嗯…并不是因为感觉…嗯！很舒服…嗯啊…」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯咕…！我能老师的被抱着…啊嗯…并不是因为感觉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2501',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%随着%SAVESTR:PLAYER%轻轻的突刺而发出了喘息、但一点都没有承认自己有感觉。/,
        ],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%随着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2502',
        any: [
          /PRINTFORMW 「来、来吧…快点…嗯啊嗯…快点…射…出来…啊啊啊啊啊…也可以啊」/,
        ],
      }, // PRINTFORMW 「来、来吧…快点…嗯啊嗯…快点…射…出来…啊啊啊啊啊…也可
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2504',
        any: [/PRINTFORMW 「哈哈…嗯！咕…你不可能让我去的…啊…嗯咕！」/],
      }, // PRINTFORMW 「哈哈…嗯！咕…你不可能让我去的…啊…嗯咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2505',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%压着，不停的侵犯者。已经不可能逃走了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2506',
        any: [/PRINTFORMW 「嗯！呵呵呵、现在这样就可以了…啊啊！那、哪里！」/],
      }, // PRINTFORMW 「嗯！呵呵呵、现在这样就可以了…啊啊！那、哪里！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2508',
        any: [/CFLAG:321 = 3/],
      }, // CFLAG:321 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2512',
        any: [/PRINTFORMW 「啊啊…又是这样…咕咕啊啊！」/],
      }, // PRINTFORMW 「啊啊…又是这样…咕咕啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2513',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TARGET%、把阴茎差劲了小穴深处。%SAVESTR:TARGET%不自觉的发出的悲鸣，慢慢的变成了闷哼的喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2514',
        any: [/PRINTFORMW 「嗯啊嗯啊…嗯咕…嗯…嗯啊咕…啊…嗯咕——！」/],
      }, // PRINTFORMW 「嗯啊嗯啊…嗯咕…嗯…嗯啊咕…啊…嗯咕——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2516',
        any: [/PRINTFORMW 「嗯啊嗯啊…所以就打算侵犯我么？」/],
      }, // PRINTFORMW 「嗯啊嗯啊…所以就打算侵犯我么？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2517',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TARGET%激烈的抽送着阴茎、%SAVESTR:TARGET%一脸讨厌的表情骂了回来。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2518',
        any: [
          /PRINTFORMW 「这么没自信的腰想让我有感觉什么的…嗯…还早100年呢…嗯咕」/,
        ],
      }, // PRINTFORMW 「这么没自信的腰想让我有感觉什么的…嗯…还早100年呢…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2520',
        any: [/CFLAG:321 = 2/],
      }, // CFLAG:321 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2536',
        any: [
          /PRINTFORMW 「啊啊嗯…从后面被侵犯…处女被夺走什么的…啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…从后面被侵犯…处女被夺走什么的…啊嗯…啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2537',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面把阴茎插进来的感觉从后背传了上来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2538',
        any: [
          /PRINTFORMW 插进蜜壶、处女再次失去的瞬间、蜜壶好像要融化一样引导着%SAVESTR:PLAYER%的阴茎开始动了起来。/,
        ],
      }, // PRINTFORMW 插进蜜壶、处女再次失去的瞬间、蜜壶好像要融化一样引导着%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2539',
        any: [
          /PRINTFORMW 「啊啊啊嗯…我的小穴在说它想要肉棒%UNICODE\(0x2661\) \*1% 快点%UNICODE\(0x2661\) \*1% 快插进来%UNICODE\(0x2661\) \*1% 把我侵犯的乱七八糟的吧！」/,
        ],
      }, // PRINTFORMW 「啊啊啊嗯…我的小穴在说它想要肉棒%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2542',
        any: [
          /PRINTFORMW 「啊啊…啊啊嗯…慢、慢慢的插入…品味我处女膜的感觉吧…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊…啊啊嗯…慢、慢慢的插入…品味我处女膜的感觉吧…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2543',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%从后面插入阴茎的感觉而颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2544',
        any: [
          /PRINTFORMW 阴茎挖掘着%SAVESTR:TARGET%的蜜壶、处女再次被夺走的瞬间、%SAVESTR:TARGET%漏出了感动的声音。/,
        ],
      }, // PRINTFORMW 阴茎挖掘着%SAVESTR:TARGET%的蜜壶、处女再次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2545',
        any: [
          /PRINTFORMW 「啊啊啊——！…魔王大人…我…我%SAVESTR:TARGET%成为你的东西了%UNICODE\(0x2661\) \*1%/,
        ],
      }, // PRINTFORMW 「啊啊啊——！…魔王大人…我…我%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2548',
        any: [
          /PRINTFORMW 「这样…咕…咕…和先给狂王大人时一样的姿势…啊…啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「这样…咕…咕…和先给狂王大人时一样的姿势…啊…啊啊啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2549',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%丰满的屁股、阴茎一口气插破了处女摸，直到%SAVESTR:TARGET%的深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2550',
        any: [/PRINTFORMW 「啊啊！不要…不要啊…不要玷污我的回忆！」/],
      }, // PRINTFORMW 「啊啊！不要…不要啊…不要玷污我的回忆！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2551',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2557',
        any: [
          /PRINTFORMW 「啊啊嗯…！激烈的激烈的好棒%UNICODE\(0x2661\) \*1% 啊嗯啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…！激烈的激烈的好棒%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2558',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、一次次的用腰撞击着她丰满的屁股。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2559',
        any: [
          /PRINTFORMW 每次插入蜜汁都会飞溅出来、%SAVESTR:TARGET%的嘴里发出了下流的娇喘。/,
        ],
      }, // PRINTFORMW 每次插入蜜汁都会飞溅出来、%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2560',
        any: [
          /PRINTFORMW 「啊嗯啊啊嗯哈…肉棒%UNICODE\(0x2661\) \*1% 肉棒好舒服啊%UNICODE\(0x2661\) \*1% 继续侵犯我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊嗯哈…肉棒%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2563',
        any: [
          /PRINTFORMW 「呵呵呵…想要征服我的屁股呢…啊啊…好啊…好啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵…想要征服我的屁股呢…啊啊…好啊…好啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2564',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被抓住屁股，撒娇似的说道。满是蜜汁的屁股被分开，阴茎一口气插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被抓住屁股，撒娇似的说道。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2565',
        any: [
          /PRINTFORMW 「嗯啊啊%UNICODE\(0x2661\) \*1% 啊啊啊啊——！嗯…比平时更深…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「嗯啊啊%UNICODE(0x2661) *1% 啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2566',
        any: [
          /PRINTFORMW 被插到深处的%SAVESTR:TARGET%的秘裂紧紧地舒服的包裹了上来………/,
        ],
      }, // PRINTFORMW 被插到深处的%SAVESTR:TARGET%的秘裂紧紧地舒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2571',
        any: [/PRINTFORMW 「我从后面、啊！被侵犯什么的…咕啊啊啊！」/],
      }, // PRINTFORMW 「我从后面、啊！被侵犯什么的…咕啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2572',
        any: [
          /PRINTFORMW 为了让%SAVESTR:TARGET%明白自己已经不是亲卫队长而是牝奴隷、%SAVESTR:PLAYER%最初的调教就是侵犯她。/,
        ],
      }, // PRINTFORMW 为了让%SAVESTR:TARGET%明白自己已经不是亲卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2573',
        any: [/PRINTFORMW 「哈…哈…唔…咕！」/],
      }, // PRINTFORMW 「哈…哈…唔…咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2575',
        any: [/PRINTFORMW 「啊啊…好深…好深…啊咕啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…好深…好深…啊咕啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2576',
        any: [
          /PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET%的丰满的屁股、%SAVESTR:PLAYER%毫不留情的抽送着。/,
        ],
      }, // PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2577',
        any: [/PRINTFORMW 「快、快离开…快离开！我…啊啊！呀…啊啊——！」/],
      }, // PRINTFORMW 「快、快离开…快离开！我…啊啊！呀…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2578',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为这敏感的反应而笑着、%SAVESTR:PLAYER%继续从后面侵犯者她………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为这敏感的反应而笑着、%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2580',
        any: [/PRINTFORMW 「嗯…咕…没、没什么大不了的呢…嗯！」/],
      }, // PRINTFORMW 「嗯…咕…没、没什么大不了的呢…嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2581',
        any: [
          /PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET%的丰满的屁股、%SAVESTR:PLAYER%毫不留情的抽送着。/,
        ],
      }, // PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2582',
        any: [
          /PRINTFORMW 「哈咕！只是单纯的激烈的插进来的话…啊咕！…我是不可能有感觉的…啊啊！」/,
        ],
      }, // PRINTFORMW 「哈咕！只是单纯的激烈的插进来的话…啊咕！…我是不可能有感
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2583',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然被侵犯着，对%SAVESTR:PLAYER%强硬的态度却还没有崩溃………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然被侵犯着，对%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2587',
        any: [/PRINTFORMW 「啊啊…好深…好深…啊咕啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…好深…好深…啊咕啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2588',
        any: [
          /PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET%的丰满的屁股、%SAVESTR:PLAYER%毫不留情的插了进去。/,
        ],
      }, // PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2589',
        any: [/PRINTFORMW 「快、快离开…快离开！我…啊啊！呀…啊啊——！」/],
      }, // PRINTFORMW 「快、快离开…快离开！我…啊啊！呀…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2590',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为这敏感的反应而笑着、%SAVESTR:PLAYER%继续从后面侵犯者她………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为这敏感的反应而笑着、%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2592',
        any: [/PRINTFORMW 「嗯…咕…没、没什么大不了的呢…嗯！」/],
      }, // PRINTFORMW 「嗯…咕…没、没什么大不了的呢…嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2593',
        any: [
          /PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET%的丰满的屁股、%SAVESTR:PLAYER%毫不留情的插了进去。/,
        ],
      }, // PRINTFORMW 抓住被狂王不知道插过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2594',
        any: [
          /PRINTFORMW 「哈咕！只是单纯的激烈的插进来的话…啊咕！…我是不可能有感觉的…啊啊！」/,
        ],
      }, // PRINTFORMW 「哈咕！只是单纯的激烈的插进来的话…啊咕！…我是不可能有感
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2595',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然被侵犯着，对%SAVESTR:PLAYER%强硬的态度却还没有崩溃………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然被侵犯着，对%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2600',
        any: [/CFLAG:322 = 1/],
      }, // CFLAG:322 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2608',
        any: [
          /PRINTFORMW 「啊啊嗯…从后面被侵犯…处女被夺走什么的…啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…从后面被侵犯…处女被夺走什么的…啊嗯…啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2609',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面把阴茎插进来的感觉从后背传了上来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2610',
        any: [
          /PRINTFORMW 插进蜜壶、处女再次失去的瞬间、蜜壶好像要融化一样引导着%SAVESTR:PLAYER%的阴茎开始动了起来。/,
        ],
      }, // PRINTFORMW 插进蜜壶、处女再次失去的瞬间、蜜壶好像要融化一样引导着%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2611',
        any: [
          /PRINTFORMW 「啊啊啊嗯…我的小穴在说它想要肉棒%UNICODE\(0x2661\) \*1% 快点%UNICODE\(0x2661\) \*1% 快插进来%UNICODE\(0x2661\) \*1% 把我侵犯的乱七八糟的吧！」/,
        ],
      }, // PRINTFORMW 「啊啊啊嗯…我的小穴在说它想要肉棒%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2614',
        any: [
          /PRINTFORMW 「啊啊…啊啊嗯…慢、慢慢的插入…品味我处女膜的感觉吧…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊…啊啊嗯…慢、慢慢的插入…品味我处女膜的感觉吧…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2615',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%从后面插入阴茎的感觉而颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2616',
        any: [
          /PRINTFORMW 阴茎挖掘着%SAVESTR:TARGET%的蜜壶、处女再次被夺走的瞬间、%SAVESTR:TARGET%漏出了感动的声音。/,
        ],
      }, // PRINTFORMW 阴茎挖掘着%SAVESTR:TARGET%的蜜壶、处女再次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2617',
        any: [
          /PRINTFORMW 「啊啊啊——！…魔王大人…我…我%SAVESTR:TARGET%成为你的东西了%UNICODE\(0x2661\) \*1%/,
        ],
      }, // PRINTFORMW 「啊啊啊——！…魔王大人…我…我%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2620',
        any: [
          /PRINTFORMW 「这样…咕…咕…和先给狂王大人时一样的姿势…啊…啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「这样…咕…咕…和先给狂王大人时一样的姿势…啊…啊啊啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2621',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%丰满的屁股、阴茎一口气插破了处女摸，直到%SAVESTR:TARGET%的深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2622',
        any: [/PRINTFORMW 「啊啊！不要…不要啊…不要玷污我的回忆！」/],
      }, // PRINTFORMW 「啊啊！不要…不要啊…不要玷污我的回忆！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2623',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2630',
        any: [
          /PRINTFORMW 「激烈的好舒服%UNICODE\(0x2661\) \*1% 啊哦哦嗯哦啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「激烈的好舒服%UNICODE(0x2661) *1% 啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2631',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、一次次的用腰撞击着她丰满的屁股。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2632',
        any: [
          /PRINTFORMW 每次插入蜜汁都会飞溅出来、%SAVESTR:TARGET%的嘴固定在“哦”的形状，发出了娇喘。/,
        ],
      }, // PRINTFORMW 每次插入蜜汁都会飞溅出来、%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2633',
        any: [
          /PRINTFORMW 「哦哦啊啊%UNICODE\(0x2661\) \*1% 哦哦哦…哪里哦哦哦哦哦%UNICODE\(0x2661\) \*1% 啊哦哦哦哦哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哦哦啊啊%UNICODE(0x2661) *1% 哦哦哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2634',
        any: [
          /PRINTFORMW 看着完全变成野兽一样的性爱狂%SAVESTR:TARGET%，%SAVESTR:PLAYER%苦笑的继续侵犯着………/,
        ],
      }, // PRINTFORMW 看着完全变成野兽一样的性爱狂%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2636',
        any: [
          /PRINTFORMW 「小穴%UNICODE\(0x2661\) \*1% 小穴好舒服%UNICODE\(0x2661\) \*1% 继续用肉棒侵犯小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「小穴%UNICODE(0x2661) *1% 小穴好舒服
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2637',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边被侵犯着丰满的屁股，一边喊着下流的语言。就算是亲卫队长这样也已经废了吧，这么想着的%SAVESTR:PLAYER%继续动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边被侵犯着丰满的屁股，一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2638',
        any: [
          /PRINTFORMW 「嗯啊啊啊啊%UNICODE\(0x2661\) \*1% 啊呀啊啊%UNICODE\(0x2661\) \*1% 肉棒好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊啊啊啊%UNICODE(0x2661) *1% 啊呀
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2639',
        any: [
          /PRINTFORMW 发出格外高亢的声音的%SAVESTR:TARGET%流出了唾液。带着那样恍惚的样子的%SAVESTR:TARGET%继续被%SAVESTR:PLAYER%侵犯着。/,
        ],
      }, // PRINTFORMW 发出格外高亢的声音的%SAVESTR:TARGET%流出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2640',
        any: [
          /PRINTFORMW 「哈啊啊啊%UNICODE\(0x2661\) \*1% 啊啊啊…好…好棒肉棒好棒…我已经只要肉棒就能活下去了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊啊啊%UNICODE(0x2661) *1% 啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2642',
        any: [
          /PRINTFORMW 「嗯啊！啊嗯…激烈的肉棒好棒%UNICODE\(0x2661\) \*1% 好喜欢肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊！啊嗯…激烈的肉棒好棒%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2643',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着后面的抽查而晃动着巨乳。看着那淫乱的姿态，%SAVESTR:PLAYER%越来越快的动起了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%随着后面的抽查而晃动着巨乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2644',
        any: [
          /PRINTFORMW 「嗯啊…变得更激烈了！肉棒肉棒肉棒最喜欢了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊…变得更激烈了！肉棒肉棒肉棒最喜欢了%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2645',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像弄错了什么一样喊着下流的话，就那样继续被%SAVESTR:PLAYER%侵犯着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像弄错了什么一样喊着下流的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2647',
        any: [/CFLAG:322 = 9/],
      }, // CFLAG:322 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2651',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%满是蜜汁的屁股，一口气把阴茎插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2652',
        any: [
          /PRINTFORMW 「啊啊啊、嗯！肉棒好深%UNICODE\(0x2661\) \*1% 啊啊啊…接下来想要更激烈点啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊、嗯！肉棒好深%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2653',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TARGET%希望的那样开始激烈的抽送。不停地被插到深处的%SAVESTR:TARGET%的蜜壶包裹着，提高着双方的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2654',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 我、啊嗯…好幸福啊…被魔王大人抱好幸福啊！啊啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊%UNICODE(0x2661) *1% 我、啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2656',
        any: [
          /PRINTFORMW 「啊呢啊%UNICODE\(0x2661\) \*1% 啊啊啊…啊嗯…咕啊%UNICODE\(0x2661\) \*1% 从后面被抱…最棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呢啊%UNICODE(0x2661) *1% 啊啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2657',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着后面的抽查而晃动着巨乳，发出着尖锐的叫声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%随着后面的抽查而晃动着巨乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2658',
        any: [
          /PRINTFORMW 「啊啊——%UNICODE\(0x2661\) \*1% 哈哈…唔啊啊啊%UNICODE\(0x2661\) \*1% 继续继续%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊——%UNICODE(0x2661) *1% 哈哈…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2659',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶随着阴茎的插入而包裹上来、像是要吸住阴茎不让离开一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶随着阴茎的插入而包裹
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2660',
        any: [
          /PRINTFORMW 「继续疼爱我…爱我、不可以拔出去哦！啊啊啊啊嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「继续疼爱我…爱我、不可以拔出去哦！啊啊啊啊嗯啊啊嗯%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2662',
        any: [
          /PRINTFORMW 「啊嗯啊嗯%UNICODE\(0x2661\) \*1% 这么激烈的话刚刚好！啊嗯啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊嗯%UNICODE(0x2661) *1% 这么激
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2663',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、为了双方的快感而专心的反复抽送着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2664',
        any: [
          /PRINTFORMW 「啊嗯啊啊啊哈——%UNICODE\(0x2661\) \*1% 要坏掉了我要坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊啊哈——%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2665',
        any: [/PRINTFORMW %SAVESTR:TARGET%的秘裂飞溅出汁液弄湿了两人的腿。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的秘裂飞溅出汁液弄湿了两人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2666',
        any: [
          /PRINTFORMW 感慨着自己调教出了一匹野兽的%SAVESTR:PLAYER%继续侵犯着%SAVESTR:TARGET%………/,
        ],
      }, // PRINTFORMW 感慨着自己调教出了一匹野兽的%SAVESTR:PLAYER
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2668',
        any: [/CFLAG:322 = 8/],
      }, // CFLAG:322 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2672',
        any: [/PRINTFORMW 「哈哈…求、求你了…不、不要、停、下了…唔…咕！」/],
      }, // PRINTFORMW 「哈哈…求、求你了…不、不要、停、下了…唔…咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2673',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被插到了子宫口附近就那样向%SAVESTR:PLAYER%恳求着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被插到了子宫口附近就那样向
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2674',
        any: [
          /PRINTFORMW 「哦哦、哦想要把我玩坏那样侵犯我！输给肉棒了啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「哦哦、哦想要把我玩坏那样侵犯我！输给肉棒了啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2675',
        any: [
          /PRINTFORMW 微笑着看着%SAVESTR:TARGET%凌乱的样子，%SAVESTR:PLAYER%慢慢的开始动起了腰………/,
        ],
      }, // PRINTFORMW 微笑着看着%SAVESTR:TARGET%凌乱的样子，%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2677',
        any: [
          /PRINTFORMW  被侵犯的这么爽不感觉对不起狂王么？”被轻轻这么说道的%SAVESTR:TARGET%将错就错的就那样高声叫了出来。/,
        ],
      }, // PRINTFORMW  被侵犯的这么爽不感觉对不起狂王么？”被轻轻这么说道的%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2678',
        any: [
          /PRINTFORMW 「啊啊啊啊嗯！啊啊啊没错！我已经没有肉棒就活不下去了！这样是不好的！啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊嗯！啊啊啊没错！我已经没有肉棒就活不下去了！这样
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2679',
        any: [
          /PRINTFORMW 「全部全部都是你的错！是把我调教成这样的你的错…啊啊啊哈哈啊！」/,
        ],
      }, // PRINTFORMW 「全部全部都是你的错！是把我调教成这样的你的错…啊啊啊哈哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2680',
        any: [
          /PRINTFORMW 每次被插蜜壶都会流出蜜汁、%SAVESTR:TARGET%漏出了被%SAVESTR:PLAYER%无情的征服的样子………/,
        ],
      }, // PRINTFORMW 每次被插蜜壶都会流出蜜汁、%SAVESTR:TARGET%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2682',
        any: [
          /PRINTFORMW 「咕嗯…啊啊啊…更多更多的侵犯我吧…肉帮肉棒好像要啊！」/,
        ],
      }, // PRINTFORMW 「咕嗯…啊啊啊…更多更多的侵犯我吧…肉帮肉棒好像要啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2683',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从后面被激烈的抽送着、一边抖动着巨乳一边发出着娇喘。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从后面被激烈的抽送着、一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2684',
        any: [
          /PRINTFORMW 「啊嗯啊啊——！停不下来啊…太舒服都快要变成笨蛋了…啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊——！停不下来啊…太舒服都快要变成笨蛋了…啊啊—
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2685',
        any: [/PRINTFORMW 蜜壶随着被插而流出的蜜汁顺着大腿在床上慢慢的扩大………/],
      }, // PRINTFORMW 蜜壶随着被插而流出的蜜汁顺着大腿在床上慢慢的扩大………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2687',
        any: [/CFLAG:322 = 7/],
      }, // CFLAG:322 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2691',
        any: [
          /PRINTFORMW 「啊啊啊嗯…！激烈的来了%UNICODE\(0x2661\) \*1% 啊嗯啊啊呀%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊嗯…！激烈的来了%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2692',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、一次次的用腰撞击着她丰满的屁股。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2695',
        any: [
          /PRINTFORMW 一次次被插入的秘裂溢出蜜汁、%SAVESTR:TARGET%的嘴里发出了下流的娇喘。/,
        ],
      }, // PRINTFORMW 一次次被插入的秘裂溢出蜜汁、%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2696',
        any: [
          /PRINTFORMW 「啊嗯啊嗯哈…小穴好舒服！魔王大人的肉棒好舒服！啊啊——啊嗯啊啊…我快要变成小穴了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊嗯哈…小穴好舒服！魔王大人的肉棒好舒服！啊啊——啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2698',
        any: [
          /PRINTFORMW 「呀啊%UNICODE\(0x2661\) \*1% 好激烈啊啊啊！让人停不下来啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呀啊%UNICODE(0x2661) *1% 好激烈啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2701',
        any: [
          /PRINTFORMW 「魔王大人…继续侵犯我的小穴吧%UNICODE\(0x2661\) \*1% 让小穴变得更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人…继续侵犯我的小穴吧%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2702',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%左右摇晃着丰满的屁股祈求着%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%左右摇晃着丰满的屁股祈求着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2705',
        any: [/PRINTFORMW 「你也在享受吞下肉棒榨取清液的我的小穴的触感吧？」/],
      }, // PRINTFORMW 「你也在享受吞下肉棒榨取清液的我的小穴的触感吧？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2706',
        any: [
          /PRINTFORMW 边舔着嘴唇边说出的下流的话诱惑着%SAVESTR:PLAYER%、被诱惑的%SAVESTR:PLAYER%开始从后面激烈的侵犯着%SAVESTR:TARGET%。/,
        ],
      }, // PRINTFORMW 边舔着嘴唇边说出的下流的话诱惑着%SAVESTR:PLAY
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2707',
        any: [
          /PRINTFORMW 「啊啊嗯！这样！这样好舒服！啊啊…好棒啊%UNICODE\(0x2661\) \*1% 啊啊嗯！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯！这样！这样好舒服！啊啊…好棒啊%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2709',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓着她的腰，插进了%SAVESTR:TARGET%的蜜壶的深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓着她的腰，插进了%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2710',
        any: [
          /PRINTFORMW 「嗯啊！深深的进来了%UNICODE\(0x2661\) \*1% 啊嗯啊啊嗯最棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊！深深的进来了%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2713',
        any: [
          /PRINTFORMW 「哈嗯！啊嗯…肉棒好激烈%UNICODE\(0x2661\) \*1% 继续…啊、啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯！啊嗯…肉棒好激烈%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2714',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着从后面被插而晃动着巨乳、如果抓住那对巨乳掐住乳沟的话，会发出什么样的叫声呢？/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%随着从后面被插而晃动着巨乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2717',
        any: [
          /PRINTFORMW 「啊嗯啊啊嗯啊啊%UNICODE\(0x2661\) \*1% 肉棒插到了子宫口啊啊啊小穴黏糊糊的要融化了了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊嗯啊啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2718',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出下流的呻吟一边继续被%SAVESTR:PLAYER%侵犯着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边发出下流的呻吟一边继续
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2720',
        any: [
          /PRINTFORMW 「激烈好棒！我的小穴的形状要变成阴茎的形状了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「激烈好棒！我的小穴的形状要变成阴茎的形状了啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2723',
        any: [/CFLAG:322 = 6/],
      }, // CFLAG:322 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2727',
        any: [
          /PRINTFORMW 「啊啊啊、嗯！插到里面来了%UNICODE\(0x2661\) \*1% 啊啊啊…好满啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊、嗯！插到里面来了%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2728',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开了%SAVESTR:TARGET%被蜜汁沾满的屁股、一口气把阴茎插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%分开了%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2731',
        any: [
          /PRINTFORMW 「哇啊啊啊啊%UNICODE\(0x2661\) \*1% 啊啊…嗯…忍不了啊…啊嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哇啊啊啊啊%UNICODE(0x2661) *1% 啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2732',
        any: [
          /PRINTFORMW 被插到深处的%SAVESTR:TARGET%的秘裂啾啾的包裹上来、蜜壶像是洗着阴茎一样蠢动着………/,
        ],
      }, // PRINTFORMW 被插到深处的%SAVESTR:TARGET%的秘裂啾啾的包
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2734',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…嗯啊…嗯！就算是把我弄坏…那样激烈也没关系…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…啊…啊啊…嗯啊…嗯！就算是把我弄坏…那样激烈也没关系
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2737',
        any: [/PRINTFORMW 「嗯啊嗯…啊嗯…啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「嗯啊嗯…啊嗯…啊…啊啊嗯%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2738',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从后面被插入而摇晃着巨乳、漏出了喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从后面被插入而摇晃着巨乳、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2741',
        any: [
          /PRINTFORMW 「嗯哈%UNICODE\(0x2661\) \*1% 我的哪里记住了魔王大人的形状了…啊嗯啊啊嗯…完美的嵌合起来了%UNICODE\(0x2661\) \*1% 哇啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯哈%UNICODE(0x2661) *1% 我的哪里记
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2742',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被插到深处的蜜壶咬住了阴茎，给予着让人无法忍耐的快乐。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被插到深处的蜜壶咬住了阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2743',
        any: [
          /PRINTFORMW 沉迷在调教出如此淫乱的身体的感慨里的%SAVESTR:PLAYER%继续激烈的抽送着………/,
        ],
      }, // PRINTFORMW 沉迷在调教出如此淫乱的身体的感慨里的%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2745',
        any: [
          /PRINTFORMW 「啊…啊啊啊%UNICODE\(0x2661\) \*1% 请把我的那里变成魔王大人的形状吧%UNICODE\(0x2661\) \*1% 嗯啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…啊啊啊%UNICODE(0x2661) *1% 请把
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2748',
        any: [
          /PRINTFORMW 「啊嗯啊哦%UNICODE\(0x2661\) \*1% 好、激烈、啊啊…我要坏掉了啊！」/,
        ],
      }, // PRINTFORMW 「啊嗯啊哦%UNICODE(0x2661) *1% 好、激
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2749',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、为了变得更舒服而专心的反复抽插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2752',
        any: [/PRINTFORMW 「哈嗯…啊啊…被这么做的话害羞的声音嗯啊哇咕！」/],
      }, // PRINTFORMW 「哈嗯…啊啊…被这么做的话害羞的声音嗯啊哇咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2753',
        any: [
          /PRINTFORMW 从后边被激烈的侵犯的%SAVESTR:TARGET%的蜜壶好像混入空气似的发出了”扑哧扑哧”的声音。/,
        ],
      }, // PRINTFORMW 从后边被激烈的侵犯的%SAVESTR:TARGET%的蜜壶
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2754',
        any: [
          /PRINTFORMW 「啊啊…慢、慢一点…请慢一点…呀啊！啊啊！不、不要这么激烈啊！」/,
        ],
      }, // PRINTFORMW 「啊啊…慢、慢一点…请慢一点…呀啊！啊啊！不、不要这么激烈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2755',
        any: [
          /PRINTFORMW 看到了%SAVESTR:TARGET%羞耻的姿态的%SAVESTR:PLAYER%继续故意发出声音动着腰………/,
        ],
      }, // PRINTFORMW 看到了%SAVESTR:TARGET%羞耻的姿态的%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2757',
        any: [
          /PRINTFORMW 「啊啊…我的腰好像不是我的一样…啊嗯%UNICODE\(0x2661\) \*1% 啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我的腰好像不是我的一样…啊嗯%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2760',
        any: [/CFLAG:322 = 5/],
      }, // CFLAG:322 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2764',
        any: [/PRINTFORMW 「啊啊啊！哪里哪里被插的话…嗯啊啊啊！」/],
      }, // PRINTFORMW 「啊啊啊！哪里哪里被插的话…嗯啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2765',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%每插一次%SAVESTR:TARGET%都会有敏感的反应。包裹过来的%SAVESTR:TARGET%的肉壶粘的不得了。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%每插一次%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2766',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%动着腰，细致的摩擦着%SAVESTR:TARGET%的腔壁。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%动着腰，细致的摩擦着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2767',
        any: [
          /PRINTFORMW 「啊啊啊…忍不了了啊…嗯啊啊…这么…有感觉…啊啊嗯…啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊啊啊…忍不了了啊…嗯啊啊…这么…有感觉…啊啊嗯…啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2769',
        any: [
          /PRINTFORMW 「啊啊！嗯！咕啊唔…还、还早得很…这么单调的动作…啊啊嗯！」/,
        ],
      }, // PRINTFORMW 「啊啊！嗯！咕啊唔…还、还早得很…这么单调的动作…啊啊嗯！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2770',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把阴茎插进了黏糊糊的包裹过来的%SAVESTR:TARGET%的蜜壶。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把阴茎插进了黏糊糊的包裹过
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2771',
        any: [
          /PRINTFORMW 享受着只是那样就用敏感的反应来回应的%SAVESTR:TARGET%的混乱的身姿、%SAVESTR:PLAYER%继续反复的抽送着。/,
        ],
      }, // PRINTFORMW 享受着只是那样就用敏感的反应来回应的%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2772',
        any: [/PRINTFORMW 「啊！啊！啊啊！…这样…我我…啊呀啊啊啊啊啊！」/],
      }, // PRINTFORMW 「啊！啊！啊啊！…这样…我我…啊呀啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2774',
        any: [/CFLAG:322 = 4/],
      }, // CFLAG:322 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2778',
        any: [/PRINTFORMW 「嗯咕…快、快点动吧…看、看什么看…嗯！」/],
      }, // PRINTFORMW 「嗯咕…快、快点动吧…看、看什么看…嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2779',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把手插到%SAVESTR:TARGET%丰满的屁股间掰了开来、%SAVESTR:PLAYER%的阴茎插进了%SAVESTR:TARGET%的秘裂。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把手插到%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2780',
        any: [
          /PRINTFORMW 因此而可爱的颤抖的屁股。一想到这是自己的东西%SAVESTR:PLAYER%就兴奋了起来、然后感到兴奋的%SAVESTR:PLAYER%开始了激烈的抽送。/,
        ],
      }, // PRINTFORMW 因此而可爱的颤抖的屁股。一想到这是自己的东西%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2781',
        any: [
          /PRINTFORMW 「啊嗯！啊！啊啊啊！还在想终于开始动了…好、好激烈…呀啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊嗯！啊！啊啊啊！还在想终于开始动了…好、好激烈…呀啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2783',
        any: [/PRINTFORMW 「嗯咕咕…嗯唔…咕…啊咕咕咕！」/],
      }, // PRINTFORMW 「嗯咕咕…嗯唔…咕…啊咕咕咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2784',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抓住腰从后面激烈的插了进来、是因为不想因为激烈的运动而忍耐不了发出悲鸣吧，她咬住自己的手腕忍耐着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2785',
        any: [/PRINTFORMW 「嗯咕…嗯唔唔…唔！咕…呜呜呜呜呜呜！」/],
      }, // PRINTFORMW 「嗯咕…嗯唔唔…唔！咕…呜呜呜呜呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2787',
        any: [/CFLAG:322 = 3/],
      }, // CFLAG:322 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2791',
        any: [/PRINTFORMW 「哈…哈…嗯咕…嗯…咕——！」/],
      }, // PRINTFORMW 「哈…哈…嗯咕…嗯…咕——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2792',
        any: [
          /PRINTFORMW 抓住不知道被狂王插过多少次的%SAVESTR:TARGET%的丰满的屁股、%SAVESTR:PLAYER%毫不留情的插了进去。/,
        ],
      }, // PRINTFORMW 抓住不知道被狂王插过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2793',
        any: [/PRINTFORMW 随着从后面被插%SAVESTR:TARGET%的巨乳摇动着。/],
      }, // PRINTFORMW 随着从后面被插%SAVESTR:TARGET%的巨乳摇动着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2794',
        any: [/PRINTFORMW 「啊咕…唔…咕…还挺能干的吗…啊啊啊嗯！」/],
      }, // PRINTFORMW 「啊咕…唔…咕…还挺能干的吗…啊啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2796',
        any: [
          /PRINTFORMW 抓住不知道被狂王插过多少次的%SAVESTR:TARGET%的丰满的屁股、%SAVESTR:PLAYER%毫不留情的插了进去。/,
        ],
      }, // PRINTFORMW 抓住不知道被狂王插过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2797',
        any: [/PRINTFORMW 「哈呢啊嗯！不要插得那么深！很痛啊！啊啊！」/],
      }, // PRINTFORMW 「哈呢啊嗯！不要插得那么深！很痛啊！啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2798',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为那粗暴的动作而悲鸣着。为了更多的听到这个声音的%SAVESTR:PLAYER%开始了更激烈的抽送。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为那粗暴的动作而悲鸣着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2799',
        any: [/PRINTFORMW 「嗯啊唔！明、明明说了…不、不要这样…啊啊噶！」/],
      }, // PRINTFORMW 「嗯啊唔！明、明明说了…不、不要这样…啊啊噶！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2801',
        any: [/CFLAG:322 = 2/],
      }, // CFLAG:322 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2816',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…哈啊…插进来了…魔王大人的肉棒…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊嗯…哈啊…插进来了…魔王大人的肉棒…啊啊啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2817',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%的阴茎插入的感觉而挺直了背。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2818',
        any: [
          /PRINTFORMW 蜜壶把阴茎全部吞下，再次失去处女的瞬间、蜜壶好像要融化了一样包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 蜜壶把阴茎全部吞下，再次失去处女的瞬间、蜜壶好像要融化了一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2819',
        any: [
          /PRINTFORMW 「啊哈啊啊啊…肉棒肉棒动起来了%UNICODE\(0x2661\) \*1% 我已经不是处女了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊啊啊…肉棒肉棒动起来了%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2822',
        any: [
          /PRINTFORMW 「哈…哈啊…魔王大人…魔王大人…啊…啊啊…全部…全部插进来了…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈…哈啊…魔王大人…魔王大人…啊…啊啊…全部…全部插进来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2823',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%抱着、处女被再次夺走的感觉而一脸陶醉。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2824',
        any: [
          /PRINTFORMW 利用自身的重量把阴茎迎入蜜壶深处、感觉着沾着破瓜之血的阴茎的%SAVESTR:TARGET%与%SAVESTR:PLAYER%接着吻。/,
        ],
      }, // PRINTFORMW 利用自身的重量把阴茎迎入蜜壶深处、感觉着沾着破瓜之血的阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2825',
        any: [
          /PRINTFORMW 「嗯啾啾…啾…哈…好幸福…好幸福啊…魔王大人…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾啾…啾…哈…好幸福…好幸福啊…魔王大人…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2828',
        any: [
          /PRINTFORMW 「我的…啊…咕哈嗯！啊啊啊啊！处女又被夺走了…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「我的…啊…咕哈嗯！啊啊啊啊！处女又被夺走了…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2829',
        any: [/PRINTFORMW %SAVESTR:TARGET%无法%SAVESTR:PLAYER%的手腕中逃开。/],
      }, // PRINTFORMW %SAVESTR:TARGET%无法%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2830',
        any: [/PRINTFORMW 「啊啊！不、不要这么摇晃！啊啊啊啊啊——！」/],
      }, // PRINTFORMW 「啊啊！不、不要这么摇晃！啊啊啊啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2831',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣着…………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2837',
        any: [
          /PRINTFORMW 「啊哈啊…深深的进来了…啊…啊嗯…啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊…深深的进来了…啊…啊嗯…啊哈%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2838',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶被阴茎深深的插入，%SAVESTR:TARGET%发出了甜美的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶被阴茎深深的插入，%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2839',
        any: [
          /PRINTFORMW 「啊啊嗯啊啊啊哈%UNICODE\(0x2661\) \*1% 魔王大人…嗯啾啾…嗯啊啊嗯唔——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊啊啊哈%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2840',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为感动而对%SAVESTR:PLAYER%不停地落下接吻之雨………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为感动而对%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2843',
        any: [
          /PRINTFORMW 「哈哈…魔王大人…啊啊…嗯…啊嗯插到伸出来了…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈哈…魔王大人…啊啊…嗯…啊嗯插到伸出来了…啊啊…%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2844',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜壶的深处被阴茎插入而高兴地笑着、开始%SAVESTR:PLAYER%接吻。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜壶的深处被阴茎插入而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2845',
        any: [
          /PRINTFORMW 「嗯啾…啾…嗯啊%UNICODE\(0x2661\) \*1% 还想要继续接吻…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾…啾…嗯啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2846',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边和%SAVESTR:TARGET%的舌头交缠在一起、一边开始动起了腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边和%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2851',
        any: [/PRINTFORMW 「快、快离开…咕咕！」/],
      }, // PRINTFORMW 「快、快离开…咕咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2852',
        any: [
          /PRINTFORMW 为了让%SAVESTR:TARGET%明白自己已经不是亲卫队长而是牝奴隷、%SAVESTR:PLAYER%最初的调教就是侵犯她。/,
        ],
      }, // PRINTFORMW 为了让%SAVESTR:TARGET%明白自己已经不是亲卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2854',
        any: [/PRINTFORMW 「全部插入…啊啊啊啊——！」/],
      }, // PRINTFORMW 「全部插入…啊啊啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2855',
        any: [
          /PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TARGET%的腰、%SAVESTR:PLAYER%毫不留情的激烈抽送着。/,
        ],
      }, // PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2856',
        any: [/PRINTFORMW 「咕唔哈…啊啊——！快、快离开…！我对你呀…啊啊——！」/],
      }, // PRINTFORMW 「咕唔哈…啊啊——！快、快离开…！我对你呀…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2857',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为从下往上的突刺而敏感的反应着、享受着那个身姿的%SAVESTR:PLAYER%继续不停地反复抽送着………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为从下往上的突刺而敏感的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2859',
        any: [
          /PRINTFORMW 「哈啊…全、全都插进来…啊啊…不、不要动了、很懂啊…啊啊」/,
        ],
      }, // PRINTFORMW 「哈啊…全、全都插进来…啊啊…不、不要动了、很懂啊…啊啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2860',
        any: [
          /PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TARGET%的腰、%SAVESTR:PLAYER%强行抽送着。/,
        ],
      }, // PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2861',
        any: [
          /PRINTFORMW 「啊嗯！咕…这么顶上来的话我…啊啊啊…哈啊哈啊…啊咕！」/,
        ],
      }, // PRINTFORMW 「啊嗯！咕…这么顶上来的话我…啊啊啊…哈啊哈啊…啊咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2862',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着%SAVESTR:PLAYER%的动作………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2866',
        any: [/PRINTFORMW 「全部插入…啊啊啊啊——！」/],
      }, // PRINTFORMW 「全部插入…啊啊啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2867',
        any: [
          /PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TARGET%的腰、%SAVESTR:PLAYER%毫不留情的激烈抽送着。/,
        ],
      }, // PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2868',
        any: [/PRINTFORMW 「咕唔哈…啊啊——！快、快离开…！我对你呀…啊啊——！」/],
      }, // PRINTFORMW 「咕唔哈…啊啊——！快、快离开…！我对你呀…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2869',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为从下往上的突刺而敏感的反应着、享受着那个身姿的%SAVESTR:PLAYER%继续不停地反复抽送着………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为从下往上的突刺而敏感的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2871',
        any: [
          /PRINTFORMW 「哈啊…全、全都插进来…啊啊…不、不要动了、很懂啊…啊啊」/,
        ],
      }, // PRINTFORMW 「哈啊…全、全都插进来…啊啊…不、不要动了、很懂啊…啊啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2872',
        any: [
          /PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TARGET%的腰、%SAVESTR:PLAYER%强行抽送着。/,
        ],
      }, // PRINTFORMW 就这样抱着不知道被狂王抱过多少次的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2873',
        any: [
          /PRINTFORMW 「啊嗯！咕…这么顶上来的话我…啊啊啊…哈啊哈啊…啊咕！」/,
        ],
      }, // PRINTFORMW 「啊嗯！咕…这么顶上来的话我…啊啊啊…哈啊哈啊…啊咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2874',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%咬着嘴唇忍耐着%SAVESTR:PLAYER%的动作………/,
        ],
      }, // PRINTFORMW  %SAVESTR:TARGET%咬着嘴唇忍耐着%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2879',
        any: [/CFLAG:323 = 1/],
      }, // CFLAG:323 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2887',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…啊啊…插进来了…魔王大人的肉棒…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊嗯…啊啊…插进来了…魔王大人的肉棒…啊啊啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2888',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%的阴茎插入的感觉而挺直了背。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2889',
        any: [
          /PRINTFORMW 蜜壶把阴茎全部吞下，再次失去处女的瞬间、蜜壶好像要融化了一样包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 蜜壶把阴茎全部吞下，再次失去处女的瞬间、蜜壶好像要融化了一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2890',
        any: [
          /PRINTFORMW 「啊哈啊啊啊…肉棒肉棒动起来了%UNICODE\(0x2661\) \*1% 我已经不是处女了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊啊啊…肉棒肉棒动起来了%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2893',
        any: [
          /PRINTFORMW 「哈…哈啊…魔王大人…魔王大人…啊…啊啊…全部…全部插进来了…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈…哈啊…魔王大人…魔王大人…啊…啊啊…全部…全部插进来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2894',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%抱着、处女被再次夺走的感觉而一脸陶醉。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2895',
        any: [
          /PRINTFORMW 利用自身的重量把阴茎迎入蜜壶深处、感觉着沾着破瓜之血的阴茎的%SAVESTR:TARGET%与%SAVESTR:PLAYER%接着吻。/,
        ],
      }, // PRINTFORMW 利用自身的重量把阴茎迎入蜜壶深处、感觉着沾着破瓜之血的阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2896',
        any: [
          /PRINTFORMW 「嗯啾啾…啾…哈…好幸福…好幸福啊…魔王大人…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾啾…啾…哈…好幸福…好幸福啊…魔王大人…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2899',
        any: [
          /PRINTFORMW 「我的…啊…咕哈嗯！啊啊啊啊！处女被你夺走了什么的…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「我的…啊…咕哈嗯！啊啊啊啊！处女被你夺走了什么的…啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2900',
        any: [/PRINTFORMW %SAVESTR:TARGET%无法%SAVESTR:PLAYER%的手腕中逃开。/],
      }, // PRINTFORMW %SAVESTR:TARGET%无法%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2901',
        any: [/PRINTFORMW 「啊啊！不、不要这么摇晃！啊啊啊啊啊——！」/],
      }, // PRINTFORMW 「啊啊！不、不要这么摇晃！啊啊啊啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2902',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣着…………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为处女被夺走而大声的哭泣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2909',
        any: [
          /PRINTFORMW 「啊哇啊啊啊%UNICODE\(0x2661\) \*1% 肉棒…肉棒全部在我里面……%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哇啊啊啊%UNICODE(0x2661) *1% 肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2910',
        any: [
          /PRINTFORMW 因为%SAVESTR:TARGET%的蜜壶被阴茎插入到了深处，%SAVESTR:TARGET%发出了甜美的声音。。/,
        ],
      }, // PRINTFORMW 因为%SAVESTR:TARGET%的蜜壶被阴茎插入到了深
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2911',
        any: [
          /PRINTFORMW 「我一个人独占什么的…啊啊这是最棒的幸福了…啊嗯啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我一个人独占什么的…啊啊这是最棒的幸福了…啊嗯啊啊啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2912',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边像少女那样微笑着，一边淫靡的动着腰品味着快乐………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边像少女那样微笑着，一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2914',
        any: [
          /PRINTFORMW 「啊啊啊…魔王大人…肉棒继续插进来啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…魔王大人…肉棒继续插进来啊%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2915',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%，腰前后左右的旋转扭动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2916',
        any: [
          /PRINTFORMW 「啊啊嗯…想要更激烈的动作想的不得了………啊！啊啊嗯、哈嗯%UNICODE\(0x2661\) \*1% 啊啊好啊继续向上顶进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…想要更激烈的动作想的不得了………啊！啊啊嗯、哈嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2917',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%配合%SAVESTR:TARGET%的动作动着腰、聆听着%SAVESTR:TARGET%野兽一样的喘息声………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%配合%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2919',
        any: [/PRINTFORMW 「魔王大人…啊啊啊…继续侵犯我啊…啊嗯停不下来啊………」/],
      }, // PRINTFORMW 「魔王大人…啊啊啊…继续侵犯我啊…啊嗯停不下来啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2920',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%张开双手抱了过来、然后丰满的胸部带给了%SAVESTR:PLAYER%柔软的触感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%张开双手抱了过来、然后丰满
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2921',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边享受着那个触感，一边用手抱住%SAVESTR:TARGET%的腰、用力向上顶着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边享受着那个触感，一边用
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2922',
        any: [
          /PRINTFORMW 「啊嗯！啊…啊啊！就是就是想要这个啊%UNICODE\(0x2661\) \*1% 啊嗯啊啊啊…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯！啊…啊啊！就是就是想要这个啊%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2924',
        any: [/CFLAG:323 = 9/],
      }, // CFLAG:323 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2928',
        any: [
          /PRINTFORMW 「啊哈…啊嗯%UNICODE\(0x2661\) \*1% 肉棒在和我的子宫口接吻啊%UNICODE\(0x2661\) \*1% 嗯唔呼…嗯啾啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…啊嗯%UNICODE(0x2661) *1% 肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2929',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶深处被阴茎插入，一边左右动着腰一边和%SAVESTR:PLAYER%接吻。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶深处被阴茎插入，一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2930',
        any: [
          /PRINTFORMW 「啾啾…嗯啾%UNICODE\(0x2661\) \*1% 呼啊…啊哈嗯！%UNICODE\(0x2661\) \*1% 明、明明还想接吻、腰这样动是犯规的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啾啾…嗯啾%UNICODE(0x2661) *1% 呼啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2931',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜壶被向上突刺而身体后仰、就那样和%SAVESTR:PLAYER%抱在一起开始享受了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜壶被向上突刺而身体后
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2933',
        any: [
          /PRINTFORMW 「啊啊啊！我已经离不开魔王大人了…啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊！我已经离不开魔王大人了…啊啊啊啊嗯%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2934',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的两脚紧紧地缠住%SAVESTR:PLAYER%的腰、丰满的胸部的柔软触感让%SAVESTR:PLAYER%感觉很舒服。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的两脚紧紧地缠住%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2935',
        any: [
          /PRINTFORMW 「哈嗯…干脆把我的手脚切掉、当成获得飞机杯来用吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯…干脆把我的手脚切掉、当成获得飞机杯来用吧%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2936',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样紧贴着，一边扭着腰一边说出下流的请求。在那个身姿中%SAVESTR:PLAYER%感觉到了爱………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样紧贴着，一边扭着腰一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2938',
        any: [/PRINTFORMW 「啊啊…爱你…爱你啊%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊…爱你…爱你啊%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2939',
        any: [
          /PRINTFORMW 身体紧贴过来的%SAVESTR:TARGET%的淫靡的气味更浓了。那气味让%SAVESTR:PLAYER%更加兴奋，阴茎更硬了。/,
        ],
      }, // PRINTFORMW 身体紧贴过来的%SAVESTR:TARGET%的淫靡的气味
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2940',
        any: [
          /PRINTFORMW 「哈嗯！我感觉到魔王大人的肉棒更硬了、啊啊…继续顶上来！把我弄得乱七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯！我感觉到魔王大人的肉棒更硬了、啊啊…继续顶上来！把
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2941',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%互相紧紧地抱在一起动着腰、舌头缠绕在一起、品味着快乐………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2943',
        any: [/CFLAG:323 = 8/],
      }, // CFLAG:323 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2947',
        any: [
          /PRINTFORMW 「哈啊哈啊嗯啊！肉棒肉棒把肚子里填满了…啊啊啊嗯啊咕！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊嗯啊！肉棒肉棒把肚子里填满了…啊啊啊嗯啊咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2948',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用手臂抱着%SAVESTR:PLAYER%，扭动着腰贪求着快乐。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用手臂抱着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2949',
        any: [/PRINTFORMW 「哦哦啊哦…让人忍不了啊…啊啊嗯啊啊哈」/],
      }, // PRINTFORMW 「哦哦啊哦…让人忍不了啊…啊啊嗯啊啊哈」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2950',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%过于兴奋而%SAVESTR:PLAYER%的耳边漏出了喘息声………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%过于兴奋而%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2952',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%用手抚摸着%SAVESTR:TARGET%的屁股，前后扭动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%用手抚摸着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2953',
        any: [
          /PRINTFORMW 「咕啊哈哈哈…啊啊！我也、也唔…啊嗯嗯啊…嗯啾…啾…嗯呼…♪」/,
        ],
      }, // PRINTFORMW 「咕啊哈哈哈…啊啊！我也、也唔…啊嗯嗯啊…嗯啾…啾…嗯呼…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2954',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍不住和%SAVESTR:PLAYER%的嘴唇贴在一起，舌头缠绕了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%忍不住和%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2955',
        any: [/PRINTFORMW 「嗯呼…嗯…啾啾…嗯啾啾…啾…嗯哈…继续抱我吧…♪」/],
      }, // PRINTFORMW 「嗯呼…嗯…啾啾…嗯啾啾…啾…嗯哈…继续抱我吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2957',
        any: [
          /PRINTFORMW 就那样抱着%SAVESTR:TARGET%抱起来很舒服的腰、%SAVESTR:PLAYER%上下动着腰侵犯着蜜壶。/,
        ],
      }, // PRINTFORMW 就那样抱着%SAVESTR:TARGET%抱起来很舒服的腰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2958',
        any: [
          /PRINTFORMW 「咕哈哈嗯啊哈！我竟然这么有感觉什么的…啊啊啊啊…嗯咕…嗯啾啾…咕啊…啊啊啊啊…」/,
        ],
      }, // PRINTFORMW 「咕哈哈嗯啊哈！我竟然这么有感觉什么的…啊啊啊啊…嗯咕…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2959',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%接吻时漏出了甜美的声音，就那样舌头纠缠在一起、那双眼睛已经完全被情欲支配了。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2960',
        any: [/PRINTFORMW 「啾啾…我…我…啊啊啊啊嗯！啊、哇、更多！」/],
      }, // PRINTFORMW 「啾啾…我…我…啊啊啊啊嗯！啊、哇、更多！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2962',
        any: [/CFLAG:323 = 7/],
      }, // CFLAG:323 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2966',
        any: [
          /PRINTFORMW 「啊哈…嗯插得好深啊…啊…啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…嗯插得好深啊…啊…啊嗯…啊啊嗯%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2967',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶深处被阴茎插入，%SAVESTR:TARGET%发出了甜美的喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶深处被阴茎插入，%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2970',
        any: [
          /PRINTFORMW 「魔王大人…魔王大人…嗯啾啾…啾…嗯啾啾…呼啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人…魔王大人…嗯啾啾…啾…嗯啾啾…呼啊…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2971',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为感动而对%SAVESTR:PLAYER%不停地落下接吻之雨………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为感动而对%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2973',
        any: [
          /PRINTFORMW 「哈啊哈啊、啊、啊啊啊…我的小穴要被重构成魔王大人的形状了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊、啊、啊啊啊…我的小穴要被重构成魔王大人的形状了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2976',
        any: [
          /PRINTFORMW 「啊啊嗯%UNICODE\(0x2661\) \*1% 魔王大人魔王大人…啊嗯啊嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯%UNICODE(0x2661) *1% 魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2977',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%前后左右的扭动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2980',
        any: [
          /PRINTFORMW 「嗯啾啾嗯啾啾啾…嗯呼…呼、嗯啾…嗯呼…啊啊嗯…肉棒插到深处来了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾啾嗯啾啾啾…嗯呼…呼、嗯啾…嗯呼…啊啊嗯…肉棒插到深
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2981',
        any: [
          /PRINTFORMW 一边接吻一边用腰向上顶着、黏膜和黏膜缠在一起、上面下面都吸在一起。这份快乐是%SAVESTR:PLAYER%与%SAVESTR:TARGET%所共有的………/,
        ],
      }, // PRINTFORMW 一边接吻一边用腰向上顶着、黏膜和黏膜缠在一起、上面下面都吸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2983',
        any: [
          /PRINTFORMW 「哈嗯啊啊%UNICODE\(0x2661\) \*1% 继续调教我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯啊啊%UNICODE(0x2661) *1% 继续调
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2986',
        any: [
          /PRINTFORMW 「嗯咕…嗯…啊啊啊嗯%UNICODE\(0x2661\) \*1% 不、不要离开啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯…啊啊啊嗯%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2987',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%环绕双臂抱了过来、那丰满的胸部压在%SAVESTR:PLAYER%身上、勃起的乳头在胸口上摩擦着。。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%环绕双臂抱了过来、那丰满的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2991',
        any: [
          /PRINTFORMW 「呵呵呵、当然是故意这么用力的过来的…啊啊、让我的胸部更有感觉吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、当然是故意这么用力的过来的…啊啊、让我的胸部更有
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2993',
        any: [
          /PRINTFORMW 「啊啊嗯…哈啊哈啊…好棒啊%UNICODE\(0x2661\) \*1% 好棒啊%UNICODE\(0x2661\) \*1% 就这样彻底的侵犯我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…哈啊哈啊…好棒啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2995',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%用手臂抱着%SAVESTR:TARGET%的腰、开始激烈的向上顶着………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%用手臂抱着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '2997',
        any: [
          /PRINTFORMW 「啊啊！这么被抱着的话…我的胸部也好舒服…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！这么被抱着的话…我的胸部也好舒服…啊啊啊%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3000',
        any: [/CFLAG:323 = 6/],
      }, // CFLAG:323 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3004',
        any: [
          /PRINTFORMW 「嗯哈啊嗯…魔王大人的全都在我里面…啊…啊嗯哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯哈啊嗯…魔王大人的全都在我里面…啊…啊嗯哈%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3005',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜壶的深处被阴茎插入而一边高兴地笑着、一边开始和%SAVESTR:PLAYER%接吻。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜壶的深处被阴茎插入而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3008',
        any: [
          /PRINTFORMW 「嗯啾…啾…嗯啊%UNICODE\(0x2661\) \*1% 还想继续接吻啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾…啾…嗯啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3009',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%舌头缠绕在一起、开始动起了腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3011',
        any: [
          /PRINTFORMW 「嗯啾啾啾…啊嗯…继续…继续接吻吧…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾啾啾…啊嗯…继续…继续接吻吧…嗯啾%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3014',
        any: [
          /PRINTFORMW 「啊啊啊…请按照喜好侵犯我吧…魔王大人…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…请按照喜好侵犯我吧…魔王大人…%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3015',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的双腿紧紧地抱住%SAVESTR:PLAYER%的腰、丰满的胸部压在%SAVESTR:PLAYER%身上、勃起的乳头在胸口上摩擦着感觉很舒服。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的双腿紧紧地抱住%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3018',
        any: [
          /PRINTFORMW 「啊…嗯呼啊…我的腰擅自…啊嗯动起来了、啊啊好害羞啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…嗯呼啊…我的腰擅自…啊嗯动起来了、啊啊好害羞啊啊啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3019',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样紧贴着，腰下流的扭动着、品味着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样紧贴着，腰下流的扭动
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3021',
        any: [
          /PRINTFORMW 「啊嗯…哈啊…咕！好激烈…好激烈啊…啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…哈啊…咕！好激烈…好激烈啊…啊啊啊——%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3024',
        any: [/PRINTFORMW 「啊啊…爱你啊…嗯啊嗯嗯哈%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊…爱你啊…嗯啊嗯嗯哈%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3025',
        any: [
          /PRINTFORMW 被%SAVESTR:TARGET%身体紧贴的抱着的%SAVESTR:PLAYER%，因为淫靡的香味，好像快要射精了一样。/,
        ],
      }, // PRINTFORMW 被%SAVESTR:TARGET%身体紧贴的抱着的%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3028',
        any: [
          /PRINTFORMW 「呵呵呵、这样的表情…魔王大人…啊啊…把我弄得更加乱七八糟的吧…啊嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、这样的表情…魔王大人…啊啊…把我弄得更加乱七八糟
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3029',
        any: [
          /PRINTFORMW 和%SAVESTR:TARGET%互相抱在一起的%SAVESTR:PLAYER%向上顶着腰、舌头缠绕在一起、品尝着快乐………/,
        ],
      }, // PRINTFORMW 和%SAVESTR:TARGET%互相抱在一起的%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3031',
        any: [
          /PRINTFORMW 「啊哈啊…请在我肚子里满满的射精吧…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊…请在我肚子里满满的射精吧…啊啊嗯%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3034',
        any: [/CFLAG:323 = 5/],
      }, // CFLAG:323 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3038',
        any: [
          /PRINTFORMW 抱着%SAVESTR:TARGET%抱起来很舒服的腰、%SAVESTR:PLAYER%一边前后扭动着腰一边接着吻。/,
        ],
      }, // PRINTFORMW 抱着%SAVESTR:TARGET%抱起来很舒服的腰、%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3039',
        any: [/PRINTFORMW 「嗯啾…啾…呼啊…哈啊…嗯…继续…嗯啾啾…啊…哈…哈啊啊…♪」/],
      }, // PRINTFORMW 「嗯啾…啾…呼啊…哈啊…嗯…继续…嗯啾啾…啊…哈…哈啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3040',
        any: [
          /PRINTFORMW 不知什么时候%SAVESTR:TARGET%不再抵抗和%SAVESTR:PLAYER%接吻，舌头缠在一起，被着侵犯蜜壶漏出了喘息声………/,
        ],
      }, // PRINTFORMW 不知什么时候%SAVESTR:TARGET%不再抵抗和%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3042',
        any: [
          /PRINTFORMW 抱着%SAVESTR:TARGET%抱起来很舒服的腰、%SAVESTR:PLAYER%上下动着腰侵犯着蜜壶。/,
        ],
      }, // PRINTFORMW 抱着%SAVESTR:TARGET%抱起来很舒服的腰、%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3043',
        any: [
          /PRINTFORMW 「哈啊哈！不要…再继续的话我…要变的奇怪了…啊啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「哈啊哈！不要…再继续的话我…要变的奇怪了…啊啊啊啊——！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3044',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然嘴上不停的抵抗着、却沉溺在了%SAVESTR:PLAYER%给予的快乐里………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然嘴上不停的抵抗着、却沉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3046',
        any: [/CFLAG:323 = 4/],
      }, // CFLAG:323 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3050',
        any: [
          /PRINTFORMW 就那样抱着%SAVESTR:TARGET%抱起来很舒服的腰、%SAVESTR:PLAYER%上下动着腰侵犯着蜜壶。/,
        ],
      }, // PRINTFORMW 就那样抱着%SAVESTR:TARGET%抱起来很舒服的腰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3051',
        any: [
          /PRINTFORMW 「哈啊哈啊！嗯…咕…啊！哈啊哈啊…啊…不、不行啊…再继续的话…啊嗯！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊！嗯…咕…啊！哈啊哈啊…啊…不、不行啊…再继续的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3052',
        any: [
          /PRINTFORMW 习惯了被侵犯的%SAVESTR:TARGET%动着腰配合着%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW 习惯了被侵犯的%SAVESTR:TARGET%动着腰配合着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3054',
        any: [
          /PRINTFORMW 就那样抱着%SAVESTR:TARGET%抱起来很舒服的腰、%SAVESTR:PLAYER%上下动着腰侵犯着蜜壶。/,
        ],
      }, // PRINTFORMW 就那样抱着%SAVESTR:TARGET%抱起来很舒服的腰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3055',
        any: [/PRINTFORMW 「啊咕…咕…还、还差得远呢…啊…啊嗯咕唔！」/],
      }, // PRINTFORMW 「啊咕…咕…还、还差得远呢…啊…啊嗯咕唔！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3056',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱着，忍耐着被侵犯………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3058',
        any: [/CFLAG:323 = 3/],
      }, // CFLAG:323 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3062',
        any: [
          /PRINTFORMW 抓着不知道被狂王抱过多少次的%SAVESTR:TARGET%的腰、%SAVESTR:PLAYER%毫不留情的激烈抽送着。/,
        ],
      }, // PRINTFORMW 抓着不知道被狂王抱过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3063',
        any: [/PRINTFORMW 「啊啊！太、太激烈了啊…啊咕…咕…啊…啊咕！」/],
      }, // PRINTFORMW 「啊啊！太、太激烈了啊…啊咕…咕…啊…啊咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3064',
        any: [
          /PRINTFORMW 因为%SAVESTR:PLAYER%从下往上的突刺而敏感的反映着、享受着那个身姿的%SAVESTR:PLAYER%继续反复抽送着………/,
        ],
      }, // PRINTFORMW 因为%SAVESTR:PLAYER%从下往上的突刺而敏感的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3066',
        any: [
          /PRINTFORMW 抓着不知道被狂王抱过多少次的%SAVESTR:TARGET%的腰、%SAVESTR:PLAYER%毫不留情的激烈抽送着。/,
        ],
      }, // PRINTFORMW 抓着不知道被狂王抱过多少次的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3067',
        any: [/PRINTFORMW 「啊嗯！咕…唔…没什么了不起的…啊咕！」/],
      }, // PRINTFORMW 「啊嗯！咕…唔…没什么了不起的…啊咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3068',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着%SAVESTR:PLAYER%的动作………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3070',
        any: [/CFLAG:323 = 2/],
      }, // CFLAG:323 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3085',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人的肉棒插到深处来了…啊啊啊最喜欢的肉棒全都插进来了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…魔王大人的肉棒插到深处来了…啊啊啊最喜欢的肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3086',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%陶醉在从背后被%SAVESTR:PLAYER%抱着的感觉里、因为把处女奉献给%SAVESTR:PLAYER%的感动而颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%陶醉在从背后被%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3087',
        any: [
          /PRINTFORMW 「咕啊…哈啊哈啊…啊嗯%UNICODE\(0x2661\) \*1% 就是这样…我是魔王大人的东西所以请按照您的喜好随意侵犯吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕啊…哈啊哈啊…啊嗯%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3088',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%慢慢的向上顶着腰、开始侵犯%SAVESTR:TARGET%的蜜壶………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%慢慢的向上顶着腰、开始侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3091',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己分开双腿、用手把%SAVESTR:PLAYER%的阴茎引导向了秘裂插了进去、因为失去处女的感觉而颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己分开双腿、用手把%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3092',
        any: [
          /PRINTFORMW 「啊啊嗯…魔王大人%UNICODE\(0x2661\) \*1% 魔王大人的进来了啊%UNICODE\(0x2661\) \*1% 啊啊…啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…魔王大人%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3093',
        any: [
          /PRINTFORMW 看着因为处女膜被贯穿，蜜壶深处被侵犯而发出欢喜的声音的%SAVESTR:TARGET%、%SAVESTR:PLAYER%开始向上抽送了起来。/,
        ],
      }, // PRINTFORMW 看着因为处女膜被贯穿，蜜壶深处被侵犯而发出欢喜的声音的%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3094',
        any: [
          /PRINTFORMW 「啊啊啊…哈…啊啊嗯…我是魔王大人的东西啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…哈…啊啊嗯…我是魔王大人的东西啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3097',
        any: [
          /PRINTFORMW 「啊啊！不要这么分开我的脚啊！咕唔…哈、啊、插进来了啊…啊呀！」/,
        ],
      }, // PRINTFORMW 「啊啊！不要这么分开我的脚啊！咕唔…哈、啊、插进来了啊…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3098',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的大腿向上挺着腰、一口气夺走了处女。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3099',
        any: [/PRINTFORMW 「哈咕！唔啊…啊啊！不、不要啊！」/],
      }, // PRINTFORMW 「哈咕！唔啊…啊啊！不、不要啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3100',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为处女被再次夺走的疼痛而大声哭泣着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为处女被再次夺走的疼痛而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3104',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3109',
        any: [
          /PRINTFORMW 「哈啊啊%UNICODE\(0x2661\) \*1% 魔王大人粗大的肉棒插进来了…啊啊%UNICODE\(0x2661\) \*1% 」/,
        ],
      }, // PRINTFORMW 「哈啊啊%UNICODE(0x2661) *1% 魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3110',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到镜子中流着血的自己的秘裂和%SAVESTR:PLAYER%的阴茎而兴奋了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看到镜子中流着血的自己的秘
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3113',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 好高兴啊…这样流血…奉上我的纯洁…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊%UNICODE(0x2661) *1% 好高兴啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3114',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的破瓜之血而兴奋着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的破瓜之血而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3117',
        any: [/PRINTFORMW 「哈啊哈啊…我的哪里…啊啊！又被血染红了…啊啊……」/],
      }, // PRINTFORMW 「哈啊哈啊…我的哪里…啊啊！又被血染红了…啊啊……」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3118',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%满脸通红的颤抖、并不仅仅是因为大镜中映出的痴态而害羞吧………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%满脸通红的颤抖、并不仅仅是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3124',
        any: [
          /PRINTFORMW 「哈唔…我的血把魔王大人的肉棒弄脏了…如果可以的话打扫的工作也请交给我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈唔…我的血把魔王大人的肉棒弄脏了…如果可以的话打扫的工
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3125',
        any: [
          /PRINTFORMW 看着大镜中映出的自己的痴态、%SAVESTR:TARGET%对镜子中的%SAVESTR:PLAYER%眨了眨眼………/,
        ],
      }, // PRINTFORMW 看着大镜中映出的自己的痴态、%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3128',
        any: [/PRINTFORMW 「好、好害羞啊…啊啊、破瓜之血这么………」/],
      }, // PRINTFORMW 「好、好害羞啊…啊啊、破瓜之血这么………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3129',
        any: [
          /PRINTFORMW 看着大镜中再次失去处女的身姿，%SAVESTR:TARGET%的脸染上了因为害羞的红色………/,
        ],
      }, // PRINTFORMW 看着大镜中再次失去处女的身姿，%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3132',
        any: [/PRINTFORMW 「啊…啊啊…流了这么多血…咕…呜呜！」/],
      }, // PRINTFORMW 「啊…啊啊…流了这么多血…咕…呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3133',
        any: [
          /PRINTFORMW 看着大镜中映出的可怜的样子，%SAVESTR:TARGET%流出了悔恨的泪水………/,
        ],
      }, // PRINTFORMW 看着大镜中映出的可怜的样子，%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3141',
        any: [
          /PRINTFORMW 「啊啊啊…虽然看不见魔王大人的脸…这样也不错啊%UNICODE\(0x2661\) \*1% 啊啊啊嗯哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…虽然看不见魔王大人的脸…这样也不错啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3142',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边因为蜜壶深处被插入而发出了喘息，一边前后左右的扭动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边因为蜜壶深处被插入而发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3143',
        any: [
          /PRINTFORMW 「来吧…也玩弄我的胸部和阴蒂吧%UNICODE\(0x2661\) \*1% 请玩弄它们吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「来吧…也玩弄我的胸部和阴蒂吧%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3144',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%引导着%SAVESTR:PLAYER%的手、追求着更高的快感………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%引导着%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3147',
        any: [
          /PRINTFORMW 「啊啊…被魔王大人用这么害羞的姿势侵犯%UNICODE\(0x2661\) \*1% 啊啊啊%UNICODE\(0x2661\) \*1% 好有感觉啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…被魔王大人用这么害羞的姿势侵犯%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3148',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%就那样抓住%SAVESTR:TARGET%的双腿，随着身后的摇动%SAVESTR:TARGET%的口中漏出了甜美的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%就那样抓住%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3149',
        any: [
          /PRINTFORMW 「啊啊…哈啊哈啊…啊嗯…继续侵犯我吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…哈啊哈啊…啊嗯…继续侵犯我吧…啊啊啊%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3150',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一开始刺激%SAVESTR:TARGET%的巨乳和秘裂，就又传来了好听的声音………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一开始刺激%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3155',
        any: [
          /PRINTFORMW 为了让%SAVESTR:TARGET%明白自己已经不是亲卫队长而是牝奴隷、%SAVESTR:PLAYER%最初的调教就是侵犯她。/,
        ],
      }, // PRINTFORMW 为了让%SAVESTR:TARGET%明白自己已经不是亲卫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3156',
        any: [
          /PRINTFORMW 「啊啊！快、快离开！我这个样子…被狂王大人以外…啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊！快、快离开！我这个样子…被狂王大人以外…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3158',
        any: [
          /PRINTFORMW 「不要这样分开我的腿啊！啊…咕唔——！全、全部插进来了啊！」/,
        ],
      }, // PRINTFORMW 「不要这样分开我的腿啊！啊…咕唔——！全、全部插进来了啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3159',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR:TARGET%的双腿、从后面一口气插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3160',
        any: [/PRINTFORMW 「哇！啊啊啊——！不要不要！救救我狂王大人！」/],
      }, // PRINTFORMW 「哇！啊啊啊——！不要不要！救救我狂王大人！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3161',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，向上插着而敏感的反应着、发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，向上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3163',
        any: [/PRINTFORMW 「呜咕…！还、还差得远呢…啊…哇啊啊！」/],
      }, // PRINTFORMW 「呜咕…！还、还差得远呢…啊…哇啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3164',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR:TARGET%的双腿、从后面慢慢的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3165',
        any: [/PRINTFORMW 「哈啊哈啊…这样完全没什么大不了的…啊咕…咕………」/],
      }, // PRINTFORMW 「哈啊哈啊…这样完全没什么大不了的…啊咕…咕………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3166',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，蜜壶被向上顶着而发出了模糊不清的悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，蜜壶
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3170',
        any: [
          /PRINTFORMW 「不要这样分开我的腿啊！啊…咕唔——！全、全部插进来了啊！」/,
        ],
      }, // PRINTFORMW 「不要这样分开我的腿啊！啊…咕唔——！全、全部插进来了啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3171',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR:TARGET%的双腿、从后面一口气插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3172',
        any: [/PRINTFORMW 「哇啊！啊啊啊——！好、好深啊…咕呜呜…啊啊——！」/],
      }, // PRINTFORMW 「哇啊！啊啊啊——！好、好深啊…咕呜呜…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3173',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，向上插着而敏感的反应着、发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，向上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3175',
        any: [/PRINTFORMW 「呜咕…！还、还差得远呢…啊…哇啊啊！」/],
      }, // PRINTFORMW 「呜咕…！还、还差得远呢…啊…哇啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3176',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR:TARGET%的双腿、从后面慢慢的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3177',
        any: [
          /PRINTFORMW 「哈啊哈啊…不再稍微认真一点的话…嗯！咕！…我是不会陷落的…啊啊！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…不再稍微认真一点的话…嗯！咕！…我是不会陷落的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3178',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，蜜壶被向上顶着而发出了模糊不清的悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，蜜壶
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3182',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3187',
        any: [
          /PRINTFORMW 「哈嗯…快看快看…我的小穴被肉棒插进来了，魔王大人的肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯…快看快看…我的小穴被肉棒插进来了，魔王大人的肉棒%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3188',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为大镜中自己的痴态而喘息着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中自己的痴态而喘息
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3191',
        any: [
          /PRINTFORMW 「啊啊啊…我是如此的被魔王大人疼爱啊…啊啊好高兴…好高兴啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…我是如此的被魔王大人疼爱啊…啊啊好高兴…好高兴啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3192',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态而娇喘着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3195',
        any: [
          /PRINTFORMW 「啊、啊啊…不要…我的哪里全部被看到了…呀啊咦…呀啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊、啊啊…不要…我的哪里全部被看到了…呀啊咦…呀啊啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3196',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一想到大镜中映出的自己的痴态，秘裂就不禁更紧了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一想到大镜中映出的自己的痴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3201',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 魔王大人的手下流的玩弄着我的身体…啊啊啊…」/,
        ],
      }, // PRINTFORMW 「啊啊%UNICODE(0x2661) *1% 魔王大人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3202',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态，耳朵都变红了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3205',
        any: [/PRINTFORMW 「好、好害羞啊…啊…啊啊！啊唔！不、不要这么插啊！」/],
      }, // PRINTFORMW 「好、好害羞啊…啊…啊啊！啊唔！不、不要这么插啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3206',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态而满脸通红的高声娇喘着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3209',
        any: [/PRINTFORMW 「咕…不要…不要啊…我不想看啊…啊啊啊………」/],
      }, // PRINTFORMW 「咕…不要…不要啊…我不想看啊…啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3210',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把视线从大镜中映出的自己的痴态哪里移开了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把视线从大镜中映出的自己的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3216',
        any: [/CFLAG:324 = 1/],
      }, // CFLAG:324 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3224',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人的肉棒插到深处来了…啊啊啊最喜欢的肉棒全部插到我里面来了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…魔王大人的肉棒插到深处来了…啊啊啊最喜欢的肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3225',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边陶醉在被%SAVESTR:PLAYER%从后面抱住的感觉里、一边因把处女奉献给%SAVESTR:PLAYER%的感动而颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边陶醉在被%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3226',
        any: [
          /PRINTFORMW 「咕哈…哈哈…啊嗯%UNICODE\(0x2661\) \*1% 就是这样…我是魔王大人的东西所以请按照您的喜好随意侵犯吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕哈…哈哈…啊嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3227',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%慢慢的向上顶着腰、开始侵犯%SAVESTR:TARGET%的蜜壶………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%慢慢的向上顶着腰、开始侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3230',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己分开双腿、用手把%SAVESTR:PLAYER%的阴茎引导向了秘裂插了进去、因为失去处女的感觉而颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己分开双腿、用手把%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3231',
        any: [
          /PRINTFORMW 「啊啊嗯…魔王大人%UNICODE\(0x2661\) \*1% 魔王大人的进来了啊%UNICODE\(0x2661\) \*1% 啊啊…啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…魔王大人%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3232',
        any: [
          /PRINTFORMW 看着因为处女膜被贯穿，蜜壶深处被侵犯而发出欢喜的声音的%SAVESTR:TARGET%、%SAVESTR:PLAYER%开始向上抽送了起来。/,
        ],
      }, // PRINTFORMW 看着因为处女膜被贯穿，蜜壶深处被侵犯而发出欢喜的声音的%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3233',
        any: [
          /PRINTFORMW 「啊啊啊…哈…啊啊嗯…我是魔王大人的东西啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…哈…啊啊嗯…我是魔王大人的东西啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3236',
        any: [
          /PRINTFORMW 「啊啊！不要这么分开我的脚啊！咕唔…哈、啊、插进来了啊…啊呀！」/,
        ],
      }, // PRINTFORMW 「啊啊！不要这么分开我的脚啊！咕唔…哈、啊、插进来了啊…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3237',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的大腿向上挺着腰、一口气夺走了处女。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3238',
        any: [/PRINTFORMW 「哈咕！唔啊…啊啊！不、不要啊！」/],
      }, // PRINTFORMW 「哈咕！唔啊…啊啊！不、不要啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3239',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为处女被再次夺走的疼痛而大声哭泣着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为处女被再次夺走的疼痛而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3243',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3248',
        any: [
          /PRINTFORMW 「哈啊啊%UNICODE\(0x2661\) \*1% 魔王大人粗大的肉棒插进来了…啊啊%UNICODE\(0x2661\) \*1% 」/,
        ],
      }, // PRINTFORMW 「哈啊啊%UNICODE(0x2661) *1% 魔王大人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3249',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到镜子中流着血的自己的秘裂和%SAVESTR:PLAYER%的阴茎而兴奋了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看到镜子中流着血的自己的秘
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3252',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 好高兴啊…这样流血…奉上我的纯洁…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊%UNICODE(0x2661) *1% 好高兴啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3253',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的破瓜之血而兴奋着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的破瓜之血而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3256',
        any: [/PRINTFORMW 「哈啊哈啊…我的哪里…啊啊！又被血染红了…啊啊……」/],
      }, // PRINTFORMW 「哈啊哈啊…我的哪里…啊啊！又被血染红了…啊啊……」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3257',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%满脸通红的颤抖、并不仅仅是因为大镜中映出的痴态而害羞吧………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%满脸通红的颤抖、并不仅仅是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3263',
        any: [
          /PRINTFORMW 「哈唔…我的血把魔王大人的肉棒弄脏了…如果可以的话打扫的工作也请交给我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈唔…我的血把魔王大人的肉棒弄脏了…如果可以的话打扫的工
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3264',
        any: [
          /PRINTFORMW 看着大镜中映出的自己的痴态、%SAVESTR:TARGET%对镜子中的%SAVESTR:PLAYER%眨了眨眼………/,
        ],
      }, // PRINTFORMW 看着大镜中映出的自己的痴态、%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3267',
        any: [/PRINTFORMW 「好、好害羞啊…啊啊、破瓜之血这么………」/],
      }, // PRINTFORMW 「好、好害羞啊…啊啊、破瓜之血这么………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3268',
        any: [
          /PRINTFORMW 看着大镜中再次失去处女的身姿，%SAVESTR:TARGET%的脸染上了因为害羞的红色………/,
        ],
      }, // PRINTFORMW 看着大镜中再次失去处女的身姿，%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3271',
        any: [/PRINTFORMW 「啊…啊啊…流了这么多血…咕…呜呜！」/],
      }, // PRINTFORMW 「啊…啊啊…流了这么多血…咕…呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3272',
        any: [
          /PRINTFORMW 看着大镜中映出的可怜的样子，%SAVESTR:TARGET%流出了悔恨的泪水………/,
        ],
      }, // PRINTFORMW 看着大镜中映出的可怜的样子，%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3281',
        any: [
          /PRINTFORMW 「肉棒插到深处来了…啊啊啊肉棒最喜欢了%UNICODE\(0x2661\) \*1% 啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「肉棒插到深处来了…啊啊啊肉棒最喜欢了%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3282',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜壶的深处被插入而发出高兴的声音，前后左右的扭动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜壶的深处被插入而发出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3283',
        any: [
          /PRINTFORMW 「啊啊啊最喜欢的肉棒插到深处%UNICODE\(0x2661\) \*1% 啊哈嗯%UNICODE\(0x2661\) \*1% 就、就是这样、继续插进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊最喜欢的肉棒插到深处%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3284',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为%SAVESTR:TARGET%不成体统的声音苦笑着，两人都互相贪求着快乐而动起了腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3286',
        any: [
          /PRINTFORMW 「魔王大人…我好舒服%UNICODE\(0x2661\) \*1% 舒服的脑袋里面都快要变的奇怪了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人…我好舒服%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3287',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己大大的分开双腿，让阴茎侵犯着蜜壶。%SAVESTR:PLAYER%随意的蹂躏着蜜壶。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己大大的分开双腿，让阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3288',
        any: [
          /PRINTFORMW 「肉棒肉棒好舒服%UNICODE\(0x2661\) \*1% 把我侵犯到坏掉吧%UNICODE\(0x2661\) \*1% 啊哈哈啊哈啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「肉棒肉棒好舒服%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3289',
        any: [
          /PRINTFORMW 脑袋已经完全融化了的%SAVESTR:TARGET%随着阴茎的抽送而发出了下流的词语和喘息。/,
        ],
      }, // PRINTFORMW 脑袋已经完全融化了的%SAVESTR:TARGET%随着阴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3290',
        any: [
          /PRINTFORMW 「啊哈子宫要坏掉了…我的子宫要被肉棒击溃了啊%UNICODE\(0x2661\) \*1% 啊啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈子宫要坏掉了…我的子宫要被肉棒击溃了啊%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3292',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊%UNICODE\(0x2661\) \*1% 把我的小穴也好阴蒂也好胸部也好…都弄得乱七八糟的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊啊啊%UNICODE(0x2661) *1% 把
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3293',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%进攻着三点而不停地发出野兽一样的呻吟。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3294',
        any: [
          /PRINTFORMW 「哈啊嗯啊啊啊哈嗯%UNICODE\(0x2661\) \*1% 我太有感觉了啊嗯啊啊…要不行了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊嗯啊啊啊哈嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3295',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%用手指按下乳头撵动阴蒂、随着阴蒂转动而飞溅出了爱液。然后随着忽然向上用阴茎攻击着子宫，从%SAVESTR:TARGET%的嘴中溢出了娇喘。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%用手指按下乳头撵动阴蒂、随
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3296',
        any: [
          /PRINTFORMW 「啊啊啊啊嗯啊啊哈啊…啊咦咦咦咦咦咦咦咦咦咦%UNICODE\(0x2661\) \*1% 啊哦哦…哦…哦哦哦哦哦哦哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊嗯啊啊哈啊…啊咦咦咦咦咦咦咦咦咦咦%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3298',
        any: [/CFLAG:324 = 9/],
      }, // CFLAG:324 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3302',
        any: [
          /PRINTFORMW 「啊哈啊%UNICODE\(0x2661\) \*1% 肉棒满满的插进我的小穴里来了啊%UNICODE\(0x2661\) \*1% 啊啊啊啊哦啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊%UNICODE(0x2661) *1% 肉棒满满
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3303',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的双腿激烈的向上插着，从%SAVESTR:TARGET%的口中漏出了野兽般的喘息声。/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%抱着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3304',
        any: [
          /PRINTFORMW 然后一边被玩弄着肥大的乳头一边扭动着腰、%SAVESTR:TARGET%发出了更高亢的声音。/,
        ],
      }, // PRINTFORMW 然后一边被玩弄着肥大的乳头一边扭动着腰、%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3305',
        any: [
          /PRINTFORMW 「啊哈啊啊啊啊啊！啊啊%UNICODE\(0x2661\) \*1% 啊哈啊啊啊啊啊%UNICODE\(0x2661\) \*1% 胸部…胸部也好舒服啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊啊啊啊啊！啊啊%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3307',
        any: [
          /PRINTFORMW 「哈啊…继续抱我吧…我太有感觉真的好像要飞起来了一样…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…继续抱我吧…我太有感觉真的好像要飞起来了一样…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3308',
        any: [
          /PRINTFORMW 为了回报%SAVESTR:TARGET%的愿望的%SAVESTR:PLAYER%从后面抱住她、向上挺着腰。/,
        ],
      }, // PRINTFORMW 为了回报%SAVESTR:TARGET%的愿望的%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3309',
        any: [
          /PRINTFORMW 「咦呀啊%UNICODE\(0x2661\) \*1% 好厉害的要来了要来了%UNICODE\(0x2661\) \*1% 啊啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咦呀啊%UNICODE(0x2661) *1% 好厉害的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3310',
        any: [
          /PRINTFORMW 每次被向上顶着%SAVESTR:TARGET%被开发了的蜜壶都好像要融化了一样、缠绕着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 每次被向上顶着%SAVESTR:TARGET%被开发了的蜜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3311',
        any: [
          /PRINTFORMW 「啊啊嗯%UNICODE\(0x2661\) \*1% 这样这样好舒服啊！啊哈啊啊咦啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯%UNICODE(0x2661) *1% 这样这样
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3313',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 我的身体已经不行了、只是被魔王大人抱着就好像快要坏掉了那样有感觉%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊%UNICODE(0x2661) *1% 我的身体已
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3314',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%爱抚着身体，从后面插着而发出甜美的喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3315',
        any: [
          /PRINTFORMW 然后为了更高的快感而自己动着腰，贪求着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 然后为了更高的快感而自己动着腰，贪求着%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3316',
        any: [
          /PRINTFORMW 「哈嗯…继续继续%UNICODE\(0x2661\) \*1% 啊啊子宫口要坏掉了要坏掉了%UNICODE\(0x2661\) \*1% 哈！啊嗯嗯嗯啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯…继续继续%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3318',
        any: [/CFLAG:324 = 8/],
      }, // CFLAG:324 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3322',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊哈嗯%UNICODE\(0x2661\) \*1% 肉棒插到深处来了…哈、哈…哈咕——！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊哈嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3323',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从下面插着蜜壶侵犯着，发出了野兽一样的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被从下面插着蜜壶侵犯着，发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3324',
        any: [
          /PRINTFORMW 「啊嗯…请抓住胸部啊%UNICODE\(0x2661\) \*1% 啊咦咦咦咦咦！把我弄得乱七八糟的吧！」/,
        ],
      }, // PRINTFORMW 「啊嗯…请抓住胸部啊%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3325',
        any: [
          /PRINTFORMW 体内被%SAVESTR:PLAYER%蹂躏着的%SAVESTR:TARGET%发出了欢喜的绝叫………/,
        ],
      }, // PRINTFORMW 体内被%SAVESTR:PLAYER%蹂躏着的%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3327',
        any: [
          /PRINTFORMW 「哦啊啊…继续插我的小穴…哈嗯啊啊！啊啊嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哦啊啊…继续插我的小穴…哈嗯啊啊！啊啊嗯啊啊嗯%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3328',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样被%SAVESTR:PLAYER%从后面抱着，爱抚着乳房和阴蒂，发出着娇喘。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样被%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3329',
        any: [
          /PRINTFORMW 「唔呀咦咦…这样最棒了啊呀啊啊呀啊啊啊啊！啊啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「唔呀咦咦…这样最棒了啊呀啊啊呀啊啊啊啊！啊啊啊啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3330',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被给予的快感脑袋都要融化掉了，就那样发出了不清醒的呻吟………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被给予的快感脑袋都要融
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3332',
        any: [
          /PRINTFORMW 「啊嗯啊嗯啊嗯继续插进来%UNICODE\(0x2661\) \*1% 把我弄坏吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊嗯啊嗯继续插进来%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3333',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大大的张开双腿扭着腰、接受着%SAVESTR:PLAYER%的突刺。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大大的张开双腿扭着腰、接受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3334',
        any: [
          /PRINTFORMW 「哈嗯嗯…呀啊%UNICODE\(0x2661\) \*1% 好棒肉棒好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯嗯…呀啊%UNICODE(0x2661) *1% 好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3335',
        any: [
          /PRINTFORMW 已经是性爱狂的%SAVESTR:TARGET%发出着野兽一样的叫声继续被%SAVESTR:PLAYER%侵犯着………/,
        ],
      }, // PRINTFORMW 已经是性爱狂的%SAVESTR:TARGET%发出着野兽一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3337',
        any: [/CFLAG:324 = 7/],
      }, // CFLAG:324 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3341',
        any: [
          /PRINTFORMW 「虽然看不见魔王大人的脸果然好寂寞…但是肉棒插到深处的感觉好棒%UNICODE\(0x2661\) \*1% 啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「虽然看不见魔王大人的脸果然好寂寞…但是肉棒插到深处的感觉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3342',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶被插到深处而发出着喘息，腰前后左右扭动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶被插到深处而发出着喘
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3345',
        any: [
          /PRINTFORMW 「快来吧…玩弄我的胸部和阴蒂吧%UNICODE\(0x2661\) \*1% 请玩弄它们吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「快来吧…玩弄我的胸部和阴蒂吧%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3346',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%引导着%SAVESTR:PLAYER%的手、追求者进一步的快感………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%引导着%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3348',
        any: [
          /PRINTFORMW 「啊啊嗯啊嗯啊啊嗯%UNICODE\(0x2661\) \*1% 我的小穴里好满…啊嗯好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊嗯啊啊嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3351',
        any: [
          /PRINTFORMW 「啊啊嗯啊嗯啊啊嗯%UNICODE\(0x2661\) \*1% 魔王大人…让我更加舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊嗯啊啊嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3352',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己大大的分开双腿，把阴茎引导进了小穴。那触感让%SAVESTR:PLAYER%禁不住漏出了喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己大大的分开双腿，把阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3355',
        any: [
          /PRINTFORMW 「哈啊哈啊…哇啊啊啊嗯%UNICODE\(0x2661\) \*1% 小穴里…被肉棒填满了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…哇啊啊啊嗯%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3356',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%无意识的抓住%SAVESTR:TARGET%的巨乳，从后面挺着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%无意识的抓住%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3357',
        any: [
          /PRINTFORMW 「呀啊嗯%UNICODE\(0x2661\) \*1% 要、要来了啊…啊啊继续…继续侵犯我%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呀啊嗯%UNICODE(0x2661) *1% 要、要来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3359',
        any: [
          /PRINTFORMW 「呼啊啊啊啊啊啊%UNICODE\(0x2661\) \*1% 魔王大人也很舒服吧？啊嗯！那就变得更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼啊啊啊啊啊啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3360',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰前后扭动着，开始奉仕%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的腰前后扭动着，开始奉仕%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3363',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊%UNICODE\(0x2661\) \*1% 把我的小穴也好阴蒂也好胸部也好…都弄得乱七八糟的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊啊啊%UNICODE(0x2661) *1% 把
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3364',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%被%SAVESTR:PLAYER%进攻着三点而不停地发出野兽一样的呻吟。/,
        ],
      }, // PRINTFORMW  %SAVESTR:TARGET%被%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3367',
        any: [
          /PRINTFORMW 「啊啊嗯…就、就这样侵犯我的小穴吧…%UNICODE\(0x2661\) \*1% 求、求你了啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…就、就这样侵犯我的小穴吧…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3368',
        any: [
          /PRINTFORMW 大概是在回应%SAVESTR:TARGET%的愿望、%SAVESTR:PLAYER%开始向上挺着腰侵犯着蜜壶………/,
        ],
      }, // PRINTFORMW 大概是在回应%SAVESTR:TARGET%的愿望、%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3371',
        any: [
          /PRINTFORMW 「咕哈哈哈哈啊…啊嗯啊啊啊嗯%UNICODE\(0x2661\) \*1% 这样拉乳头的话…要裂开了啊！啊啊但是好舒服%UNICODE\(0x2661\) \*1% 呼啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕哈哈哈哈啊…啊嗯啊啊啊嗯%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3372',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳就像玩具那样被%SAVESTR:PLAYER%不停玩弄着。然后随着被玩弄，秘裂紧紧包裹着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的巨乳就像玩具那样被%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3375',
        any: [/CFLAG:324 = 6/],
      }, // CFLAG:324 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3379',
        any: [
          /PRINTFORMW 「啊啊…这个姿势被侵犯%UNICODE\(0x2661\) \*1% 啊啊啊%UNICODE\(0x2661\) \*1% 太有感觉了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…这个姿势被侵犯%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3380',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的双腿从后面晃着腰，%SAVESTR:TARGET%的嘴中漏出了甜美的声音。/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%抱着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3383',
        any: [
          /PRINTFORMW 然后随着巨乳和阴蒂被玩弄，扭动着腰部的%SAVESTR:TARGET%发出了更甜美的声音。/,
        ],
      }, // PRINTFORMW 然后随着巨乳和阴蒂被玩弄，扭动着腰部的%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3384',
        any: [
          /PRINTFORMW 「哈嗯%UNICODE\(0x2661\) \*1% 呼啊、啊、呼啊啊啊啊啊…最棒了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯%UNICODE(0x2661) *1% 呼啊、啊、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3386',
        any: [
          /PRINTFORMW 「啊啊…哈啊哈啊…啊啊嗯…继续自由的使用我吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…哈啊哈啊…啊啊嗯…继续自由的使用我吧…啊啊啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3387',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%开始刺激%SAVESTR:TARGET%的巨乳和秘裂之后，传来了更动听的声音………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%开始刺激%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3390',
        any: [
          /PRINTFORMW 「啊啊嗯…这个姿势的话看不见魔王大人的脸所以我不太喜欢…啊啊所以至少请好好的抱我吧…♪」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…这个姿势的话看不见魔王大人的脸所以我不太喜欢…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3391',
        any: [
          /PRINTFORMW 为了回应%SAVESTR:TARGET%的那个愿望，%SAVESTR:PLAYER%从后面抱着她、挺起了腰。/,
        ],
      }, // PRINTFORMW 为了回应%SAVESTR:TARGET%的那个愿望，%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3394',
        any: [
          /PRINTFORMW 「啊啊嗯！嗯啊啊啊嗯%UNICODE\(0x2661\) \*1% 好、好厉害的要来了…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯！嗯啊啊啊嗯%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3395',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从后面被插着，被开发了的蜜壶好像要融化了一样、缠绕着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从后面被插着，被开发了的蜜
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3396',
        any: [
          /PRINTFORMW 「啊啊嗯%UNICODE\(0x2661\) \*1% 好、好深啊…要、要来了啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯%UNICODE(0x2661) *1% 好、好深
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3398',
        any: [
          /PRINTFORMW 「啊哈嗯…嗯啊啊啊啊…好棒啊%UNICODE\(0x2661\) \*1% 就这样用我舒服起来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯…嗯啊啊啊啊…好棒啊%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3401',
        any: [
          /PRINTFORMW 「啊啊嗯啊嗯啊哈%UNICODE\(0x2661\) \*1% 哈啊哈啊…我的身体…请继续随意使用吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊嗯啊哈%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3402',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把身体托付给%SAVESTR:PLAYER%、陶醉在被从下往上突刺的快感里。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把身体托付给%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3405',
        any: [
          /PRINTFORMW 然后还想要更多快感的%SAVESTR:TARGET%开始自己动起了腰。/,
        ],
      }, // PRINTFORMW 然后还想要更多快感的%SAVESTR:TARGET%开始自
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3406',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊%UNICODE\(0x2661\) \*1% 好、好棒啊…%UNICODE\(0x2661\) \*1% 好…好舒服%UNICODE\(0x2661\) \*1% 啊嗯啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊啊啊%UNICODE(0x2661) *1% 好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3407',
        any: [
          /PRINTFORMW 那动作虽然开始只是配合%SAVESTR:PLAYER%的动作、但是为了追求更高的快感而渐渐变快了………/,
        ],
      }, // PRINTFORMW 那动作虽然开始只是配合%SAVESTR:PLAYER%的动
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3409',
        any: [
          /PRINTFORMW 「啊啊…啊%UNICODE\(0x2661\) \*1% 呼、啊、呼啊啊啊啊…我的里面变得咕啾咕啾的了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊%UNICODE(0x2661) *1% 呼、啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3410',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%身体发着抖、继续被%SAVESTR:PLAYER%侵犯着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%身体发着抖、继续被%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3413',
        any: [/CFLAG:324 = 5/],
      }, // CFLAG:324 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3417',
        any: [
          /PRINTFORMW 「哈啊哈啊…我被玩弄到这种地步什么的…啊啊…啊嗯…呼啊啊啊啊啊」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我被玩弄到这种地步什么的…啊啊…啊嗯…呼啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3418',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从下面被插入侵犯着蜜壶、不自觉地发出了甜美的喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从下面被插入侵犯着蜜壶、不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3419',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊咦…不要抓我的胸部啊…啊啊那、那里也不行————…呼哇啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊咦…不要抓我的胸部啊…啊啊那、那里也不行——
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3420',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像%SAVESTR:PLAYER%手弹奏的乐器一样发出这声响………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3422',
        any: [/PRINTFORMW 「啊啊！这样…啊嗯哈啊哈啊…啊嗯咕！我…我…啊啊！」/],
      }, // PRINTFORMW 「啊啊！这样…啊嗯哈啊哈啊…啊嗯咕！我…我…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3423',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%粗暴的突刺而发出了痛苦的呻吟、然而偶尔那声音中也会混入甘甜的音色。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3424',
        any: [
          /PRINTFORMW 「哈啊哈啊！这种程度的话我…嗯啊不行啊不要碰胸部和哪里啊！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊！这种程度的话我…嗯啊不行啊不要碰胸部和哪里啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3425',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为巨乳、阴蒂、蜜壶三点被玩弄而不自觉的发出绝叫………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为巨乳、阴蒂、蜜壶三点被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3427',
        any: [/CFLAG:324 = 4/],
      }, // CFLAG:324 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3431',
        any: [/PRINTFORMW 「啊哦咕唔…啊！哈啊哈啊…嗯…咕！」/],
      }, // PRINTFORMW 「啊哦咕唔…啊！哈啊哈啊…嗯…咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3432',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%的手大大的分开双腿、从后面激烈的侵犯着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3433',
        any: [/PRINTFORMW 「啊啊…再、再继续这样的话我！嗯啊嗯咕…啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…再、再继续这样的话我！嗯啊嗯咕…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3434',
        any: [
          /PRINTFORMW 继续被%SAVESTR:PLAYER%从后面摘取乳头和阴蒂而继续娇喘着………/,
        ],
      }, // PRINTFORMW 继续被%SAVESTR:PLAYER%从后面摘取乳头和阴蒂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3436',
        any: [/PRINTFORMW 「啊啊嗯咕…更加注意一下我的身体状况来动行吗？」/],
      }, // PRINTFORMW 「啊啊嗯咕…更加注意一下我的身体状况来动行吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3437',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%激烈的向上挺着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3438',
        any: [
          /PRINTFORMW 「啊嗯！咕啊！你真是毫不留情啊…啊嗯啊！胸部被这么抓的话…咕！」/,
        ],
      }, // PRINTFORMW 「啊嗯！咕啊！你真是毫不留情啊…啊嗯啊！胸部被这么抓的话…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3439',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓住，想要逃走也只是让%SAVESTR:PLAYER%更享受而已………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的腰被抓住，想要逃走也只是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3441',
        any: [/CFLAG:324 = 3/],
      }, // CFLAG:324 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3445',
        any: [
          /PRINTFORMW 「不要把两腿分的这么开啊！啊…咕呜呜——！全、全都插进来了啊！」/,
        ],
      }, // PRINTFORMW 「不要把两腿分的这么开啊！啊…咕呜呜——！全、全都插进来了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3446',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR:TARGET%的双腿、从后面一口气插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3447',
        any: [/PRINTFORMW 「哇啊！啊啊啊——！好、好深啊…咕呜呜…啊啊——！」/],
      }, // PRINTFORMW 「哇啊！啊啊啊——！好、好深啊…咕呜呜…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3448',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从后面被揉则胸向上插着而敏感的反映着、发出着悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从后面被揉则胸向上插着而敏
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3450',
        any: [/PRINTFORMW 「呜咕…！还、还差得远呢…啊…哇啊啊！」/],
      }, // PRINTFORMW 「呜咕…！还、还差得远呢…啊…哇啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3451',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR:TARGET%的双腿、从后面慢慢的插了进去。。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%大大的分开%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3452',
        any: [
          /PRINTFORMW 「哈啊哈啊…不再稍微认真一点的话…嗯！咕！…我是不会陷落的…啊啊！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…不再稍微认真一点的话…嗯！咕！…我是不会陷落的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3453',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，蜜壶被向上顶着而发出了模糊不清的悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为从后面被揉着胸部，蜜壶
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3455',
        any: [/CFLAG:324 = 2/],
      }, // CFLAG:324 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3459',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3464',
        any: [
          /PRINTFORMW 「哈嗯…快看快看…我的小穴被肉棒插进来了，魔王大人的肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯…快看快看…我的小穴被肉棒插进来了，魔王大人的肉棒%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3465',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为大镜中自己的痴态而喘息着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中自己的痴态而喘息
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3468',
        any: [
          /PRINTFORMW 「啊啊啊…我是如此的被魔王大人疼爱啊…啊啊好高兴…好高兴啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…我是如此的被魔王大人疼爱啊…啊啊好高兴…好高兴啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3469',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态而娇喘着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3472',
        any: [
          /PRINTFORMW 「啊、啊啊…不要…我的哪里全部被看到了…呀啊咦…呀啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊、啊啊…不要…我的哪里全部被看到了…呀啊咦…呀啊啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3473',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一想到大镜中映出的自己的痴态，秘裂就不禁更紧了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一想到大镜中映出的自己的痴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3478',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 魔王大人的手下流的玩弄着我的身体…啊啊啊…」/,
        ],
      }, // PRINTFORMW 「啊啊%UNICODE(0x2661) *1% 魔王大人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3479',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态，耳朵都变红了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3482',
        any: [/PRINTFORMW 「好、好害羞啊…啊…啊啊！啊唔！不、不要这么插啊！」/],
      }, // PRINTFORMW 「好、好害羞啊…啊…啊啊！啊唔！不、不要这么插啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3483',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态而满脸通红的高声娇喘着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为大镜中映出的自己的痴态
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3486',
        any: [/PRINTFORMW 「咕…不要…不要啊…我不想看啊…啊啊啊………」/],
      }, // PRINTFORMW 「咕…不要…不要啊…我不想看啊…啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3487',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把视线从大镜中映出的自己的痴态哪里移开了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把视线从大镜中映出的自己的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3504',
        any: [
          /PRINTFORMW 「哈啊哈啊…请给我肉棒…从肛门插进来！侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…请给我肉棒…从肛门插进来！侵犯我吧%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3505',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%叫喊着下流的话诱惑着%SAVESTR:PLAYER%。%SAVESTR:PLAYER%苦笑着，一口气贯穿了肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%叫喊着下流的话诱惑着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3506',
        any: [
          /PRINTFORMW 「噶哈…哈哈%UNICODE\(0x2661\) \*1% 现在我要飞起来了…啊啊啊嗯啊哈啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「噶哈…哈哈%UNICODE(0x2661) *1% 现在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3508',
        any: [
          /PRINTFORMW 「啊嗯…我也会继续开放肛门的、所以毫不留情的用肉棒侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…我也会继续开放肛门的、所以毫不留情的用肉棒侵犯我吧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3509',
        any: [
          /PRINTFORMW 听到%SAVESTR:TARGET%的话，%SAVESTR:PLAYER%一口气插进了未开发的肛门。/,
        ],
      }, // PRINTFORMW 听到%SAVESTR:TARGET%的话，%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3510',
        any: [
          /PRINTFORMW 「呀啊啊啊啊！真、真的毫不留情…啊啊最喜欢魔王大人了…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呀啊啊啊啊！真、真的毫不留情…啊啊最喜欢魔王大人了…%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3515',
        any: [
          /PRINTFORMW 「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好侵犯吧%UNICODE\(0x2661\) \*1%…啊嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3516',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3517',
        any: [
          /PRINTFORMW 「唔啊啊啊…我连屁股都被魔王大人征服了…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「唔啊啊啊…我连屁股都被魔王大人征服了…啊啊啊啊啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3519',
        any: [
          /PRINTFORMW 「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好侵犯吧%UNICODE\(0x2661\) \*1%…嗯啊啊嗯！好、好紧…咕！」/,
        ],
      }, // PRINTFORMW 「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3520',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门慢慢地吞下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%未开发的肛门慢慢地吞下了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3521',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%痛苦的咬着嘴唇忍耐着、看到那样的脸的%SAVESTR:PLAYER%开始了激烈的抽送………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%痛苦的咬着嘴唇忍耐着、看到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3526',
        any: [
          /PRINTFORMW 「唔、啊…啊啊…我的屁股这么简单的就被插进来了什么的…嗯…啊嗯咕唔！」/,
        ],
      }, // PRINTFORMW 「唔、啊…啊啊…我的屁股这么简单的就被插进来了什么的…嗯…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3527',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3528',
        any: [/PRINTFORMW %SAVESTR:PLAYER%微微一笑，开始动起了腰………/],
      }, // PRINTFORMW %SAVESTR:PLAYER%微微一笑，开始动起了腰……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3530',
        any: [
          /PRINTFORMW 「呜咕…不要啊！屁股不要啊…额…呀…插进我里面来了…啊啊咕咕——！」/,
        ],
      }, // PRINTFORMW 「呜咕…不要啊！屁股不要啊…额…呀…插进我里面来了…啊啊咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3531',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门被%SAVESTR:PLAYER%的阴茎插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%未开发的肛门被%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3532',
        any: [/PRINTFORMW %SAVESTR:TARGET%的悲鸣在耳边响起………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的悲鸣在耳边响起………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3535',
        any: [/CFLAG:TARGET:327 = 1/],
      }, // CFLAG:TARGET:327 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3542',
        any: [
          /PRINTFORMW 「哈啊哈啊…请给我肉棒…从肛门插进来！侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…请给我肉棒…从肛门插进来！侵犯我吧%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3543',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%叫喊着下流的话诱惑着%SAVESTR:PLAYER%。%SAVESTR:PLAYER%苦笑着，一口气贯穿了肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%叫喊着下流的话诱惑着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3544',
        any: [
          /PRINTFORMW 「噶哈…哈哈%UNICODE\(0x2661\) \*1% 现在我要飞起来了…啊啊啊嗯啊哈啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「噶哈…哈哈%UNICODE(0x2661) *1% 现在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3545-3547',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%的双腿大大的分开、一口气贯穿了完成开发的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3547',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%的双腿大大的分开、一口气贯穿了完成开发的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3548',
        any: [
          /PRINTFORMW 「咕哈嗯%UNICODE\(0x2661\) \*1% 好棒好棒%UNICODE\(0x2661\) \*1% 侵犯侵犯我的肛门吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕哈嗯%UNICODE(0x2661) *1% 好棒好棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3549',
        any: [
          /PRINTFORMW 被侵犯肛门、%SAVESTR:TARGET%的脸想要融化一样。看到这个样子的%SAVESTR:PLAYER%开始了更激烈的抽送。/,
        ],
      }, // PRINTFORMW 被侵犯肛门、%SAVESTR:TARGET%的脸想要融化一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3550',
        any: [
          /PRINTFORMW 「哈嗯！好、激烈好激烈啊%UNICODE\(0x2661\) \*1%啊啊继续…继续%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯！好、激烈好激烈啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3552',
        any: [/CFLAG:327 = 7/],
      }, // CFLAG:327 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3555',
        any: [
          /PRINTFORMW 「啊啊…请用那粗大的阳具侵犯我的肛门，彻底的开发它吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…请用那粗大的阳具侵犯我的肛门，彻底的开发它吧%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3556',
        any: [
          /PRINTFORMW 被那样的%SAVESTR:TARGET%诱惑着，%SAVESTR:PLAYER%把阴茎差劲了未开发的肛门。被包裹的稍微有点疼。/,
        ],
      }, // PRINTFORMW 被那样的%SAVESTR:TARGET%诱惑着，%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3557',
        any: [
          /PRINTFORMW 「啊哈嗯%UNICODE\(0x2661\) \*1% 被这样彻底的侵犯的话…肛门就能开发出来了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯%UNICODE(0x2661) *1% 被这样彻
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3558',
        any: [/CFLAG:327 = 6/],
      }, // CFLAG:327 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3562',
        any: [
          /PRINTFORMW 「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好侵犯吧%UNICODE\(0x2661\) \*1%…啊嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是、是的…我的屁股是魔王大人的东西，请按照您的喜好的好好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3563',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3564',
        any: [
          /PRINTFORMW 「唔啊啊啊…我连屁股都被魔王大人征服了…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「唔啊啊啊…我连屁股都被魔王大人征服了…啊啊啊啊啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3566',
        any: [
          /PRINTFORMW 「嗯嗯啊…啊啊肛门被侵犯%UNICODE\(0x2661\) \*1% 让我有我的身体是魔王大人的东西啊啊嗯%UNICODE\(0x2661\) \*1% 的实感%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯嗯啊…啊啊肛门被侵犯%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3567',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%侵犯肛门而发出了娇喘、那个声音里混入了对%SAVESTR:PLAYER%的爱。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3568',
        any: [
          /PRINTFORMW 「啊哈啊嗯…啊啊%UNICODE\(0x2661\) \*1% 啊啊——%UNICODE\(0x2661\) \*1% 继续征服我吧%UNICODE\(0x2661\) \*1% 啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊嗯…啊啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3570',
        any: [/CFLAG:327 = 5/],
      }, // CFLAG:327 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3573',
        any: [
          /PRINTFORMW 「我的屁股是魔王大人的动…啊啊！请您彻底的侵犯吧%UNICODE\(0x2661\) \*1%…咕啊！好、好紧…咕！」/,
        ],
      }, // PRINTFORMW 「我的屁股是魔王大人的动…啊啊！请您彻底的侵犯吧%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3574',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门慢慢地吞下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%未开发的肛门慢慢地吞下了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3575',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%痛苦的咬着嘴唇忍耐着、看到那样的脸的%SAVESTR:PLAYER%开始了激烈的抽送………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%痛苦的咬着嘴唇忍耐着、看到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3576',
        any: [/CFLAG:327 = 4/],
      }, // CFLAG:327 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3579',
        any: [/PRINTFORMW 「唔、啊…啊啊…我的肛门不是你的…嗯啊…啊咕！」」/],
      }, // PRINTFORMW 「唔、啊…啊啊…我的肛门不是你的…嗯啊…啊咕！」」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3580',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门轻易吞下了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3581',
        any: [/PRINTFORMW 「不、不行啊！不要…不要动啊啊啊啊啊！」/],
      }, // PRINTFORMW 「不、不行啊！不要…不要动啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3582',
        any: [/CFLAG:327 = 3/],
      }, // CFLAG:327 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3585',
        any: [
          /PRINTFORMW 「呜咕…不要啊！屁股不要啊…额…呀…插进我里面来了…啊啊咕咕——！」/,
        ],
      }, // PRINTFORMW 「呜咕…不要啊！屁股不要啊…额…呀…插进我里面来了…啊啊咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3586',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门被%SAVESTR:PLAYER%的阴茎插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%未开发的肛门被%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3587',
        any: [/PRINTFORMW 「啊啊！快、快拔出去拔出去啊…好、好痛啊…啊啊啊！」/],
      }, // PRINTFORMW 「啊啊！快、快拔出去拔出去啊…好、好痛啊…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3588',
        any: [/CFLAG:327 = 2/],
      }, // CFLAG:327 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3603',
        any: [
          /PRINTFORMW 「啊啊…被魔王大人…侵犯肛门让人停不下来啊…啊啊啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…被魔王大人…侵犯肛门让人停不下来啊…啊啊啊…啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3604',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门从后面被侵犯而发出了喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发了的肛门从后面被侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3605',
        any: [
          /PRINTFORMW 「从后面…被侵犯感觉好强烈好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「从后面…被侵犯感觉好强烈好舒服%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3607',
        any: [/PRINTFORMW 「啊啊…魔王大人的肉棒进来了…咕呜呜…唔咕呜呜呜！」/],
      }, // PRINTFORMW 「啊啊…魔王大人的肉棒进来了…咕呜呜…唔咕呜呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3608',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，一口气插进了未开发的肛门，开始动起了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3609',
        any: [/PRINTFORMW 「哈、哈…啊啊啊…好、好紧啊…啊嗯…啊…啊啊啊！」/],
      }, // PRINTFORMW 「哈、哈…啊啊啊…好、好紧啊…啊嗯…啊…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3614',
        any: [
          /PRINTFORMW 「怎么样…我的屁股是为了让魔王大人侵犯而开发的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「怎么样…我的屁股是为了让魔王大人侵犯而开发的哦%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3615',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用妩媚的声音诱惑着%SAVESTR:PLAYER%。然后%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰一口气贯穿了被开发了的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用妩媚的声音诱惑着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3616',
        any: [
          /PRINTFORMW 「啊啊啊啊嗯啊啊啊嗯%UNICODE\(0x2661\) \*1% 屁股太舒服了…啊嗯啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊嗯啊啊啊嗯%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3618',
        any: [
          /PRINTFORMW 「啊啊…请好好地…侵犯我的肛门吧%UNICODE\(0x2661\) \*1%…啊啊啊啊啊…好、好紧…嗯！」/,
        ],
      }, // PRINTFORMW 「啊啊…请好好地…侵犯我的肛门吧%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3619',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，把阴茎慢慢差劲了未开发的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3620',
        any: [
          /PRINTFORMW 开心着看着从后面被插入的肛门的样子。%SAVESTR:PLAYER%为了延长那份快乐而开始了缓慢的抽送………/,
        ],
      }, // PRINTFORMW 开心着看着从后面被插入的肛门的样子。%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3625',
        any: [
          /PRINTFORMW 「从、从后面…哈嗯！啊、屁、屁股被侵犯什么的…啊啊啊啊…进、进来了…全都进来了啊…啊啊——！」/,
        ],
      }, // PRINTFORMW 「从、从后面…哈嗯！啊、屁、屁股被侵犯什么的…啊啊啊啊…进
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3626',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，一口气把阴茎插进了开发完成的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3627',
        any: [/PRINTFORMW %SAVESTR:TARGET%后仰着发出了娇喘………/],
      }, // PRINTFORMW %SAVESTR:TARGET%后仰着发出了娇喘………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3629',
        any: [
          /PRINTFORMW 「这样从后面…咦咦咦咦咦！不要不要！肛、肛门不行啊！啊啊咕呜呜！？」/,
        ],
      }, // PRINTFORMW 「这样从后面…咦咦咦咦咦！不要不要！肛、肛门不行啊！啊啊咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3630',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎插进了未开发的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3631',
        any: [/PRINTFORMW %SAVESTR:TARGET%后仰着发出了悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%后仰着发出了悲鸣………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3634',
        any: [/CFLAG:TARGET:328 = 1/],
      }, // CFLAG:TARGET:328 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3641',
        any: [
          /PRINTFORMW 「啊啊！肛门被侵犯让人受不了啊…啊啊啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！肛门被侵犯让人受不了啊…啊啊啊…啊啊嗯%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3642',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门从后面被侵犯而发出了喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发了的肛门从后面被侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3643',
        any: [/PRINTFORMW 听着那声音的%SAVESTR:PLAYER%开始了激烈的抽送。/],
      }, // PRINTFORMW 听着那声音的%SAVESTR:PLAYER%开始了激烈的抽
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3644',
        any: [
          /PRINTFORMW 「啊嗯啊嗯啊啊啊嗯…%UNICODE\(0x2661\) \*1% 肛门被强奸最棒了…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊嗯啊啊啊嗯…%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3646',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊嗯啊啊…啊啊嗯！肛门好棒肛门好棒啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊嗯啊啊…啊啊嗯！肛门好棒肛门好棒啊…啊啊啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3647',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、继续激烈的侵犯着肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3648',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的淫乱的肛门的黏膜伸展着咬住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的淫乱的肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3649',
        any: [
          /PRINTFORMW 「啊哈！你在看哪里啊！啊继续认真的动起腰来侵犯我啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈！你在看哪里啊！啊继续认真的动起腰来侵犯我啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3651',
        any: [/CFLAG:328 = 7/],
      }, // CFLAG:328 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3654',
        any: [/PRINTFORMW 「啊啊…魔王大人的肉棒进来了…咕唔唔…咕呜呜呜呜！」/],
      }, // PRINTFORMW 「啊啊…魔王大人的肉棒进来了…咕唔唔…咕呜呜呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3655',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，一口气插进了未开发的肛门，开始动起了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3656',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这样的女人被压住侵犯肛门让人感到征服欲被满足了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%这样的女人被压住侵犯肛门让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3657',
        any: [/PRINTFORMW 「哈哈…啊呀…好、好近啊…啊啊啊啊啊啊啊啊啊！」/],
      }, // PRINTFORMW 「哈哈…啊呀…好、好近啊…啊啊啊啊啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3658',
        any: [/CFLAG:328 = 6/],
      }, // CFLAG:328 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3662',
        any: [
          /PRINTFORMW 「啊啊…我的魔王大人专用肛门…请继续…侵、侵犯吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我的魔王大人专用肛门…请继续…侵、侵犯吧%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3663',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%就那样呗%SAVESTR:TARGET%诱惑着抓住了她的腰、一口气贯穿了被开发了的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%就那样呗%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3664',
        any: [
          /PRINTFORMW 「啊嗯咦咦咦！这、这样…一口气…啊啊…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯咦咦咦！这、这样…一口气…啊啊…啊啊啊啊啊啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3665',
        any: [
          /PRINTFORMW 在%SAVESTR:TARGET%的肛门的舒服的包裹下、%SAVESTR:PLAYER%开始了抽送………/,
        ],
      }, // PRINTFORMW 在%SAVESTR:TARGET%的肛门的舒服的包裹下、%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3667',
        any: [
          /PRINTFORMW 「啊啊啊！啊！啊啊！太、太激烈了啊…我、我要…坏掉了…啊嗯啊啊咦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊！啊！啊啊！太、太激烈了啊…我、我要…坏掉了…啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3668',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰、继续激烈的侵犯着肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3669',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的淫乱的肛门的黏膜伸展着咬住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的淫乱的肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3670',
        any: [
          /PRINTFORMW 「啊啊哇、哇、啊嗯！我、我的…屁、屁股要不行了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊哇、哇、啊嗯！我、我的…屁、屁股要不行了啊%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3672',
        any: [/CFLAG:328 = 5/],
      }, // CFLAG:328 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3675',
        any: [
          /PRINTFORMW 「啊啊、请继续侵犯我的肛门吧%UNICODE\(0x2661\) \*1%…啊啊啊啊啊…好、好紧…嗯！」/,
        ],
      }, // PRINTFORMW 「啊啊、请继续侵犯我的肛门吧%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3676',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，把阴茎慢慢插进了未开发的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3677',
        any: [
          /PRINTFORMW 开心着看着从后面被插入的肛门的样子。%SAVESTR:PLAYER%为了延长那份快乐而开始了缓慢的抽送。/,
        ],
      }, // PRINTFORMW 开心着看着从后面被插入的肛门的样子。%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3678',
        any: [
          /PRINTFORMW 「哈啊哈啊%UNICODE\(0x2661\) \*1% 啊啊啊…这么慢的话…我、我…咦咦咦啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊%UNICODE(0x2661) *1% 啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3679',
        any: [/CFLAG:328 = 4/],
      }, // CFLAG:328 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3682',
        any: [
          /PRINTFORMW 「啊啊又要、侵、侵犯肛门…啊啊啊啊…进、进来了…全部都进来了…啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊啊又要、侵、侵犯肛门…啊啊啊啊…进、进来了…全部都进来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3683',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，一口气把阴茎插进了了开发完成的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3684',
        any: [
          /PRINTFORMW 「呼啊、啊、啊啊啊啊…肛门…我的肛门好奇怪啊…嗯啊啊啊啊啊啊——」/,
        ],
      }, // PRINTFORMW 「呼啊、啊、啊啊啊啊…肛门…我的肛门好奇怪啊…嗯啊啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3685',
        any: [/CFLAG:328 = 3/],
      }, // CFLAG:328 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3688',
        any: [
          /PRINTFORMW 「啊嗯咦啊啊！不要不要！肛、肛门不行的啊！啊啊呜呜！？」/,
        ],
      }, // PRINTFORMW 「啊嗯咦啊啊！不要不要！肛、肛门不行的啊！啊啊呜呜！？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3689',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，把阴茎插进了未开发的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3690',
        any: [/PRINTFORMW 「不要啊！还很紧的啊！好痛啊…啊啊啊嗯啊呀！」/],
      }, // PRINTFORMW 「不要啊！还很紧的啊！好痛啊…啊啊啊嗯啊呀！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3691',
        any: [/CFLAG:328 = 2/],
      }, // CFLAG:328 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3706',
        any: [
          /PRINTFORMW 「啊哈嗯%UNICODE\(0x2661\) \*1% 肛门被侵犯好难受啊…啊啊啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯%UNICODE(0x2661) *1% 肛门被侵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3707',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为开发完全的肛门被刺穿，发出了呻吟。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为开发完全的肛门被刺穿，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3708',
        any: [
          /PRINTFORMW 双手抱着%SAVESTR:PLAYER%的脖子激烈的亲吻着、沉浸在被%SAVESTR:PLAYER%侵犯的喜悦中………/,
        ],
      }, // PRINTFORMW 双手抱着%SAVESTR:PLAYER%的脖子激烈的亲吻着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3710',
        any: [
          /PRINTFORMW 「啊啊肉棒在我的肛门小穴里…啊啊到最深处了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊肉棒在我的肛门小穴里…啊啊到最深处了%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3711',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的腰、一口气捅进金红桃还未被开发完全的肛门里，猛烈的冲击把金红桃顶了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3712',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出因为疼痛而有些为难的表情、勉强的接受了%SAVESTR:PLAYER%的动作………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出因为疼痛而有些为难的表
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3717',
        any: [
          /PRINTFORMW 「啊啊嗯…屁股，在屁股里面、进去了！啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…屁股，在屁股里面、进去了！啊啊啊啊啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3718',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱住，从肛门顶了上去，沉浸在疯狂的快感之中。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3719',
        any: [
          /PRINTFORMW 随着腰部动作越来越快%SAVESTR:TARGET%的屁股大幅度的晃动了起来………/,
        ],
      }, // PRINTFORMW 随着腰部动作越来越快%SAVESTR:TARGET%的屁股
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3721',
        any: [
          /PRINTFORMW 「哈啊啊…啊啊啊…进到屁股里面了啊啊…啊啊…啊嗯啊啊………」/,
        ],
      }, // PRINTFORMW 「哈啊啊…啊啊啊…进到屁股里面了啊啊…啊啊…啊嗯啊啊………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3722',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%温柔的抱着%SAVESTR:TARGET%的腰、阴茎从未开发的肛门里缓缓的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%温柔的抱着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3723',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出非常痛苦的表情，拼命的抱紧了%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出非常痛苦的表情，拼命的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3728',
        any: [
          /PRINTFORMW 「啊、快放开我！我、咿呀啊啊！那里是屁股啊嗯！啊、啊哈！」/,
        ],
      }, // PRINTFORMW 「啊、快放开我！我、咿呀啊啊！那里是屁股啊嗯！啊、啊哈！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3729',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱住%SAVESTR:TARGET%的腰，阴茎一鼓作气插进了金红桃已经开放完全的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3730',
        any: [
          /PRINTFORMW 抱着%SAVESTR:TARGET%，从趴在肩上的地方传来了娇声呻吟………/,
        ],
      }, // PRINTFORMW 抱着%SAVESTR:TARGET%，从趴在肩上的地方传来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3732',
        any: [
          /PRINTFORMW 「啊、快放开我！放开我！…啊啊啊！全部插进屁股了…咕啊呜！」/,
        ],
      }, // PRINTFORMW 「啊、快放开我！放开我！…啊啊啊！全部插进屁股了…咕啊呜！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3733',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的腰，阴茎从还未完全开发的肛门插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3734',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体发着抖，传出了异常痛苦的呻吟………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体发着抖，传出了异常痛
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3737',
        any: [/CFLAG:TARGET:329 = 1/],
      }, // CFLAG:TARGET:329 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3744',
        any: [
          /PRINTFORMW 「啊啊嗯…啊…啊…啊哈%UNICODE\(0x2661\) \*1% 肛门被侵犯着、忍不住了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…啊…啊…啊哈%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3745',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被开发完全的肛门被刺穿，发出了呻吟。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被开发完全的肛门被刺穿
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3746',
        any: [
          /PRINTFORMW 双手抱着%SAVESTR:PLAYER%的脖子激烈的亲吻着、沉浸在被%SAVESTR:PLAYER%侵犯的喜悦中。/,
        ],
      }, // PRINTFORMW 双手抱着%SAVESTR:PLAYER%的脖子激烈的亲吻着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3747',
        any: [
          /PRINTFORMW 「啾啾…啊哈%UNICODE\(0x2661\) \*1% 哈啊哈啊…%UNICODE\(0x2661\) \*1% 嗯啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啾啾…啊哈%UNICODE(0x2661) *1% 哈啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3749',
        any: [
          /PRINTFORMW 「啊啊嗯%UNICODE\(0x2661\) \*1% 再深一些、再激烈一些%UNICODE\(0x2661\) \*1% 啊啊肛门奸最棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯%UNICODE(0x2661) *1% 再深一些
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3750',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用力抱住%SAVESTR:PLAYER%因为肛门被侵犯的快感发出了满足的喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用力抱住%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3751',
        any: [
          /PRINTFORMW 随着腰部动作越来越快%SAVESTR:TARGET%的屁股大幅度的晃动了起来………/,
        ],
      }, // PRINTFORMW 随着腰部动作越来越快%SAVESTR:TARGET%的屁股
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3752',
        any: [
          /PRINTFORMW 「啊啊…肛门感觉好烫%UNICODE\(0x2661\) \*1% 啊啊我要去了！%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…肛门感觉好烫%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3754',
        any: [/CFLAG:329 = 7/],
      }, // CFLAG:329 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3757',
        any: [
          /PRINTFORMW 「啊嗯，大肉棒全部进去了………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯，大肉棒全部进去了………%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3758',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的腰、一口气捅进金红桃还未被开发完全的肛门里，猛烈的冲击把金红桃顶了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3759',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然还没有习惯肛交，但是为了追求快感主动的摇晃着身体。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然还没有习惯肛交，但是为
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3760',
        any: [/PRINTFORMW 「哈啊哈啊…嗯啊啊嗯啊…啊恩嗯！」/],
      }, // PRINTFORMW 「哈啊哈啊…嗯啊啊嗯啊…啊恩嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3761',
        any: [/CFLAG:329 = 6/],
      }, // CFLAG:329 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3765',
        any: [
          /PRINTFORMW 「屁股屁股全部进去了…啊啊啊啊哈～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「屁股屁股全部进去了…啊啊啊啊哈～%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3766',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%一边主动摇晃着屁股，一边沉浸在快乐里满足的呻吟着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3767',
        any: [
          /PRINTFORMW 随着腰部动作越来越快%SAVESTR:TARGET%的屁股大幅度的晃动了起来………/,
        ],
      }, // PRINTFORMW 随着腰部动作越来越快%SAVESTR:TARGET%的屁股
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3768',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊嗯啊嗯、啊哈～%UNICODE\(0x2661\) \*1% 屁股被干着快要融化了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊嗯啊嗯、啊哈～%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3770',
        any: [
          /PRINTFORMW 「啊嗯…啊…啊啊嗯%UNICODE\(0x2661\) \*1% 嗯啾啾…啾…呼啊…呼啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…啊…啊啊嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3771',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在肛门被侵犯的同时，与%SAVESTR:PLAYER%亲吻着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在肛门被侵犯的同时，与%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3772',
        any: [/PRINTFORMW 随着腰部被激烈的抽插着，亲吻也逐渐热烈起来。/],
      }, // PRINTFORMW 随着腰部被激烈的抽插着，亲吻也逐渐热烈起来。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3773',
        any: [
          /PRINTFORMW 「嗯啾…啾好爽%UNICODE\(0x2661\) \*1%…哈啊哈啊…啊啊嗯%UNICODE\(0x2661\) \*1% 屁股想要更多…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾…啾好爽%UNICODE(0x2661) *1%…哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3775',
        any: [/CFLAG:329 = 5/],
      }, // CFLAG:329 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3778',
        any: [/PRINTFORMW 「啊嗯啊啊插进屁股里了…咕、咿、咿呀啊………」/],
      }, // PRINTFORMW 「啊嗯啊啊插进屁股里了…咕、咿、咿呀啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3779',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%温柔的抱着%SAVESTR:TARGET%的腰、阴茎从未开发的肛门里缓缓的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%温柔的抱着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3780',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出非常痛苦的表情，拼命的抱紧了%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出非常痛苦的表情，拼命的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3781',
        any: [/PRINTFORMW 「嗯啊…啊啊…啊嗯…好、好艰辛啊…嗯啊、啊啊嗯！」/],
      }, // PRINTFORMW 「嗯啊…啊啊…啊嗯…好、好艰辛啊…嗯啊、啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3782',
        any: [/CFLAG:329 = 4/],
      }, // CFLAG:329 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3785',
        any: [/PRINTFORMW 「啊咕…肉棒插入到最里面了…啊啊啊嗯！」/],
      }, // PRINTFORMW 「啊咕…肉棒插入到最里面了…啊啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3786',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的腰，阴茎一鼓作气插进了金红桃已经开放完全的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3787',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被快感俘虏，紧紧的夹着阴茎、%SAVESTR:TARGET%快乐的娇声呻吟着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门被快感俘虏，紧紧的夹
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3788',
        any: [
          /PRINTFORMW 「啊啊啊…哈哈…啊，不行…不行啊…这，这样的…哼啊啊啊！！」/,
        ],
      }, // PRINTFORMW 「啊啊啊…哈哈…啊，不行…不行啊…这，这样的…哼啊啊啊！！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3789',
        any: [/CFLAG:329 = 3/],
      }, // CFLAG:329 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3792',
        any: [
          /PRINTFORMW 「啊不行不行！快放开我…哈、放开…啊啊啊！哈、哈啊！」/,
        ],
      }, // PRINTFORMW 「啊不行不行！快放开我…哈、放开…啊啊啊！哈、哈啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3793',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%的腰，阴茎从还未完全开发的肛门插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3794',
        any: [
          /PRINTFORMW 「啊啊、至、至少…好痛苦…再、再温柔一点啊…呜呜啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊、至、至少…好痛苦…再、再温柔一点啊…呜呜啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3795',
        any: [/CFLAG:329 = 2/],
      }, // CFLAG:329 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3810',
        any: [
          /PRINTFORMW 「啊啊嗯…好深、好棒、肉棒在里面…啊嗯啊嗯啊咿呀%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…好深、好棒、肉棒在里面…啊嗯啊嗯啊咿呀%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3811',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出开发完毕的肛门主动吞入%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出开发完
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3812',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%猛烈的抽插着%SAVESTR:TARGET%发出欢愉的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%猛烈的抽插着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3814',
        any: [
          /PRINTFORMW 「啊啊啊哈嗯…肛门扩张了…肛门被魔王大人的大肉棒扩张了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊哈嗯…肛门扩张了…肛门被魔王大人的大肉棒扩张了%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3815',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出还没有被完全开发的肛门，艰难的吞入%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出还没有
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3816',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边激烈的抽动着，一边愉悦的看着她那张苦闷的脸喘息着………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边激烈的抽动着，一边愉悦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3821',
        any: [
          /PRINTFORMW 「啊啊嗯…分开双腿被侵犯着屁股什么的…啊嗯竟然是这么舒服的事情么%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…分开双腿被侵犯着屁股什么的…啊嗯竟然是这么舒服的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3822',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的两腿分开、被侵犯着肛门，享受着快感呻吟着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的两腿分开、被侵犯着肛门，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3823',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%伸出双手爱抚着%SAVESTR:TARGET%丰满的胸部和湿润的小穴………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%伸出双手爱抚着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3825',
        any: [
          /PRINTFORMW 「啊嗯…啊嗯…啊啊…进来了…啊嗯…啊哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…啊嗯…啊啊…进来了…啊嗯…啊哈啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3826',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿、阴茎从未开发的肛门中缓缓挺入。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3827',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%混杂着痛苦的表情，爱抚着丰满的胸部和湿润的小穴………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%混杂着痛苦的表情，爱抚着丰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3832',
        any: [
          /PRINTFORMW 「呜啊！啊、你那样插进屁股的话…啊！啊啊啊！不行不要啊！」/,
        ],
      }, // PRINTFORMW 「呜啊！啊、你那样插进屁股的话…啊！啊啊啊！不行不要啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3833',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:TARGET%的双腿从开发好的肛门中用力的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3834',
        any: [/PRINTFORMW %SAVESTR:TARGET%被从下面来的冲击弄得娇声连连………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被从下面来的冲击弄得娇声连
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3836',
        any: [/PRINTFORMW 「啊啊…屁股那里放不进去你的东西啊…啊啊啊～！」/],
      }, // PRINTFORMW 「啊啊…屁股那里放不进去你的东西啊…啊啊啊～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3837',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:TARGET%的双腿从还没有开发的肛门中用力的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3838',
        any: [/PRINTFORMW %SAVESTR:TARGET%疯狂的扭动着腰，发出高亢的悲鸣声………/],
      }, // PRINTFORMW %SAVESTR:TARGET%疯狂的扭动着腰，发出高亢的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3841',
        any: [/CFLAG:TARGET:330 = 1/],
      }, // CFLAG:TARGET:330 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3844',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3849',
        any: [
          /PRINTFORMW 「啊啊！看到了%UNICODE\(0x2661\) \*1% 魔王大人的肉棒，肉棒在我的菊花里%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！看到了%UNICODE(0x2661) *1% 魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3850',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%喘着粗气，看着自己的痴态在大镜子上反映出来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%喘着粗气，看着自己的痴态在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3853',
        any: [
          /PRINTFORMW 「啊啊看到了那样的…魔王大人的东西在屁股里！啊啊啊嗯啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊看到了那样的…魔王大人的东西在屁股里！啊啊啊嗯啊～%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3854',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着自己的痴态在大镜子上反映出来，害羞的发出娇叫声………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着自己的痴态在大镜子上反
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3857',
        any: [/PRINTFORMW 「啊啊…屁股被这样侵犯了…啊、我…啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…屁股被这样侵犯了…啊、我…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3858',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到大镜子上反映出自己的痴态，不禁夹紧了肛门小穴………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看到大镜子上反映出自己的痴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3863',
        any: [/PRINTFORMW 「我的肛门…肉棒从肛门里刺进来啦…」/],
      }, // PRINTFORMW 「我的肛门…肉棒从肛门里刺进来啦…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3864',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到大镜子里自己的痴态，脸红到耳根………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看到大镜子里自己的痴态，脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3867',
        any: [/PRINTFORMW 「啊真是…我的屁股，进去了…啊啊咦啊！」/],
      }, // PRINTFORMW 「啊真是…我的屁股，进去了…啊啊咦啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3868',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着自己的痴态映在镜子里，呻吟声渐渐变高昂了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着自己的痴态映在镜子里，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3871',
        any: [/PRINTFORMW 「啊啊！不、不想看到这个样子………」/],
      }, // PRINTFORMW 「啊啊！不、不想看到这个样子………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3872',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从镜子中看到自己的痴态，闭上眼睛把头转了过去………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从镜子中看到自己的痴态，闭
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3882',
        any: [
          /PRINTFORMW 「啊啊嗯…好深、好棒、肉棒在里面…啊嗯啊嗯啊咿呀%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…好深、好棒、肉棒在里面…啊嗯啊嗯啊咿呀%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3883',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出开发完毕的肛门主动吞入%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出开发完
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3884',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%猛烈的抽插着%SAVESTR:TARGET%发出欢愉的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%猛烈的抽插着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3885',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 啊%UNICODE\(0x2661\) \*1% 啊～嗯！好棒啊！更激烈的用肉棒侵犯我的肛门小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊%UNICODE(0x2661) *1% 啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3887',
        any: [
          /PRINTFORMW 「啊啊～！肛门奸最棒了%UNICODE\(0x2661\) \*1% 啊啊嗯…啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊～！肛门奸最棒了%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3888',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%被开发完全的肛门狠狠的干着，肉棒和肛门像是紧紧粘合在一起、从后面剧烈的向上顶着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3889',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边淫荡的呻吟着一边被侵犯着肛门。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边淫荡的呻吟着一边被侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3890',
        any: [
          /PRINTFORMW 「啊嗯呵呵…好…好舒服啊%UNICODE\(0x2661\) \*1% 太棒了%UNICODE\(0x2661\) \*1% 更加激烈的侵犯我的肛门吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯呵呵…好…好舒服啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3892',
        any: [/CFLAG:330 = 7/],
      }, // CFLAG:330 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3895',
        any: [
          /PRINTFORMW 「嗯嗯%UNICODE\(0x2661\) \*1% 狠狠的侵犯我吧…我的肛门小穴是魔王大人专用的泄欲工具%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯嗯%UNICODE(0x2661) *1% 狠狠的侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3896',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出还没有被完全开发的肛门，艰难的吞入%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%自己把双腿分开、露出还没有
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3897',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边激烈的抽动着，一边愉悦的看着她那张苦闷的脸喘息着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边激烈的抽动着，一边愉悦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3898',
        any: [
          /PRINTFORMW 「啊啊…就是、就是这样、肛门、啊！搅动着……刺痛着，狠狠的开发我的肛门小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…就是、就是这样、肛门、啊！搅动着……刺痛着，狠狠的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3899',
        any: [/CFLAG:330 = 6/],
      }, // CFLAG:330 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3903',
        any: [
          /PRINTFORMW 啊哈哈啊%UNICODE\(0x2661\) \*1% 好！好棒啊%UNICODE\(0x2661\) \*1% 再激烈一点%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 啊哈哈啊%UNICODE(0x2661) *1% 好！好棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3904',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%被开发完全的肛门狠狠的干着，肉棒和肛门像是紧紧粘合在一起、从后面剧烈的向上顶着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3905',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边淫荡的呻吟着一边被侵犯着肛门。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边淫荡的呻吟着一边被侵犯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3906',
        any: [
          /PRINTFORMW 「呼呼…呼啊…啊、呼啊啊啊啊%UNICODE\(0x2661\) \*1% 屁股…好舒服…啊～啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼呼…呼啊…啊、呼啊啊啊啊%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3908',
        any: [
          /PRINTFORMW 「啊啊！好舒服啊啊…屁股被侵犯着、侵犯着%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！好舒服啊啊…屁股被侵犯着、侵犯着%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3909',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%张大了双腿、在被侵犯的快感中喘息着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%张大了双腿、在被侵犯的快感
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3910',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%伸出手爱抚着%SAVESTR:TARGET%丰满的胸部和湿润的小穴/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%伸出手爱抚着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3911',
        any: [
          /PRINTFORMW 「哈嗯…啊啊啊%UNICODE\(0x2661\) \*1% 咕、感觉好棒…啊嗯啊啊、魔王大人啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯…啊啊啊%UNICODE(0x2661) *1% 咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3913',
        any: [/CFLAG:330 = 5/],
      }, // CFLAG:330 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3916',
        any: [
          /PRINTFORMW 「啊嗯…啊嗯…啊啊…进来了…啊嗯…啊哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…啊嗯…啊啊…进来了…啊嗯…啊哈啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3917',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开了%SAVESTR:TARGET%的双腿、阴茎从未开发的肛门中缓缓挺入。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%分开了%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3918',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%混杂着痛苦的表情，爱抚着丰满的胸部和湿润的小穴/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%混杂着痛苦的表情，爱抚着丰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3919-3920',
        any: [/CFLAG:330 = 4/],
      }, // CFLAG:330 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3920',
        any: [/CFLAG:330 = 4/],
      }, // CFLAG:330 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3923',
        any: [
          /PRINTFORMW 「呜啊！啊、你那样插进屁股的话…啊！啊啊啊！不行不要啊！」/,
        ],
      }, // PRINTFORMW 「呜啊！啊、你那样插进屁股的话…啊！啊啊啊！不行不要啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3924',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:TARGET%的双腿从开发好的肛门中用力的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3925',
        any: [/PRINTFORMW %SAVESTR:TARGET%被从下面来的冲击弄得娇声连连………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被从下面来的冲击弄得娇声连
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3926',
        any: [/CFLAG:330 = 3/],
      }, // CFLAG:330 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3929',
        any: [/PRINTFORMW 「啊啊…屁股那里放不进去你的东西啊…啊啊啊～！」/],
      }, // PRINTFORMW 「啊啊…屁股那里放不进去你的东西啊…啊啊啊～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3930',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:TARGET%的双腿从还没有开发的肛门中用力的插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%强行分开%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3931',
        any: [/PRINTFORMW %SAVESTR:TARGET%疯狂的扭动着腰，发出尖锐的悲鸣声………/],
      }, // PRINTFORMW %SAVESTR:TARGET%疯狂的扭动着腰，发出尖锐的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3932',
        any: [/CFLAG:330 = 2/],
      }, // CFLAG:330 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3936',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3941',
        any: [
          /PRINTFORMW 「啊啊！看到了%UNICODE\(0x2661\) \*1% 魔王大人的肉棒，肉棒在我的菊花里%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！看到了%UNICODE(0x2661) *1% 魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3942',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%喘着粗气，看着自己的痴态在大镜子上反映出来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%喘着粗气，看着自己的痴态在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3945',
        any: [
          /PRINTFORMW 「啊啊看到了、魔王大人的东西在屁股里！啊啊啊嗯啊～～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊看到了、魔王大人的东西在屁股里！啊啊啊嗯啊～～%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3946',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着自己的痴态在大镜子上反映出来，害羞的发出娇叫声………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着自己的痴态在大镜子上反
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3949',
        any: [/PRINTFORMW 「啊啊…屁股被这样侵犯了…啊、我…啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…屁股被这样侵犯了…啊、我…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3950',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到大镜子上反映出自己的痴态，不禁夹紧了肛门小穴………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看到大镜子上反映出自己的痴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3955',
        any: [/PRINTFORMW 「我的肛门…肉棒从肛门里刺进来啦…」/],
      }, // PRINTFORMW 「我的肛门…肉棒从肛门里刺进来啦…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3956',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着自己的痴态映在镜子里，呻吟声渐渐变高昂了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看着自己的痴态映在镜子里，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3959',
        any: [/PRINTFORMW 「啊真是…我的屁股，进去了…啊啊咦啊！」/],
      }, // PRINTFORMW 「啊真是…我的屁股，进去了…啊啊咦啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3960',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到大镜子里自己的痴态，脸红到耳根………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看到大镜子里自己的痴态，脸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3963',
        any: [/PRINTFORMW 「啊啊！不、不想看到这个样子………」/],
      }, // PRINTFORMW 「啊啊！不、不想看到这个样子………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3964',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从镜子中看到自己的痴态，闭上眼睛把头转了过去………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从镜子中看到自己的痴态，闭
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3980',
        any: [
          /PRINTFORMW 「呵呵、这么硬的勃起了什么的…嗯啊%UNICODE\(0x2661\) \*1% 就让你这样子射出来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵、这么硬的勃起了什么的…嗯啊%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3981',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用妖魅的眼神看着，舔了舔嘴唇，把%SAVESTR:PLAYER%的阴茎撸动着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用妖魅的眼神看着，舔了舔嘴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3984',
        any: [
          /PRINTFORMW 「遵命…这就把魔王大人的肉棒伺候的舒舒服服的…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「遵命…这就把魔王大人的肉棒伺候的舒舒服服的…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3985',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%坦率的遵从你的命令，用纤细而白嫩的手把%SAVESTR:PLAYER%的肉棒撸动着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%坦率的遵从你的命令，用纤细
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3988',
        any: [/PRINTFORMW 「这样做就好了吗…？啊啊…真是让人心情舒畅………」/],
      }, // PRINTFORMW 「这样做就好了吗…？啊啊…真是让人心情舒畅………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3989',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上一片绯红，为%SAVESTR:PLAYER%处理着性欲………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%脸上一片绯红，为%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3992',
        any: [/PRINTFORMW 「我到底在做什么啊…啊啊…为什么这么硬呢！？」/],
      }, // PRINTFORMW 「我到底在做什么啊…啊啊…为什么这么硬呢！？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3993',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出厌恶的表情把脸扭向一边，用拙劣的手法，套弄着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出厌恶的表情把脸扭向一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '3995',
        any: [/CFLAG:TARGET:331 = 1/],
      }, // CFLAG:TARGET:331 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4002',
        any: [
          /PRINTFORMW 「啊啊…果然用手欺负阴茎让人停不下来啊…啊嗯啊%UNICODE\(0x2661\) \*1% 啊啊啊…我的手好像变成小穴了一样啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…果然用手欺负阴茎让人停不下来啊…啊嗯啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4003',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着手里乱闹的%SAVESTR:PLAYER%的阴茎的触感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%感受着手里乱闹的%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4004',
        any: [
          /PRINTFORMW 「本来就想着这根健壮的肉棒一直让我很舒服…让我更多的奉仕一下吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「本来就想着这根健壮的肉棒一直让我很舒服…让我更多的奉仕一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4005',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样带着陶醉的表情，手上的动作越来越激烈………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样带着陶醉的表情，手上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4007',
        any: [
          /PRINTFORMW 「肉棒咕噜咕噜咕噜…%UNICODE\(0x2661\) \*1% 啊啊…看起来好舒服的样子%UNICODE\(0x2661\) \*1% 连我好像也变得奇怪了一样%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「肉棒咕噜咕噜咕噜…%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4008',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的瞳孔完全染上了淫乱的颜色、把%SAVESTR:PLAYER%的阴茎握在手中玩弄着漏出喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的瞳孔完全染上了淫乱的颜色
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4009',
        any: [
          /PRINTFORMW 「来吧…我的手很舒服的话就从肉棒里多多的把精液射出来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「来吧…我的手很舒服的话就从肉棒里多多的把精液射出来吧%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4010',
        any: [/PRINTFORMW %SAVESTR:TARGET%的手的动作越来越开了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的手的动作越来越开了………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4012',
        any: [/CFLAG:331 = 7/],
      }, // CFLAG:331 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4015',
        any: [
          /PRINTFORMW 「啊啊啊…停不下来啊、停不下来啊%UNICODE\(0x2661\) \*1% 让肉棒更硬吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…停不下来啊、停不下来啊%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4016',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%闪着下流的光的舌头舔了一下嘴唇，继续撸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%闪着下流的光的舌头舔了一下
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4017',
        any: [/CFLAG:331 = 6/],
      }, // CFLAG:331 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4021',
        any: [
          /PRINTFORMW 「魔王大人、求你了啊…请给我您的感情吧…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人、求你了啊…请给我您的感情吧…啊啊…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4022',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像白痴一样张着嘴流着口水，专心的不停的撸着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像白痴一样张着嘴流着口水，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4023',
        any: [
          /PRINTFORMW 「一句…明明只要一句命令…我就会用嘴来服侍您了…啊啊%UNICODE\(0x2661\) \*1% 啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「一句…明明只要一句命令…我就会用嘴来服侍您了…啊啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4024',
        any: [
          /PRINTFORMW 想要继续看那张可怜的脸的%SAVESTR:PLAYER%让她继续着手淫………/,
        ],
      }, // PRINTFORMW 想要继续看那张可怜的脸的%SAVESTR:PLAYER%让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4026',
        any: [
          /PRINTFORMW 「嗯…啊嗯…一直都把我弄得这么舒服…谢谢你%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…啊嗯…一直都把我弄得这么舒服…谢谢你%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4027',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边说着”道谢”的话，一边用手指摩擦着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边说着”道谢”的话，一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4028',
        any: [
          /PRINTFORMW 「我最喜欢的魔王大人的…啊啊…好棒啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我最喜欢的魔王大人的…啊啊…好棒啊…%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4029',
        any: [
          /PRINTFORMW 现在也是想要把%SAVESTR:TARGET%的阴茎吞下去一样的继续撸着………/,
        ],
      }, // PRINTFORMW 现在也是想要把%SAVESTR:TARGET%的阴茎吞下去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4031',
        any: [/CFLAG:331 = 5/],
      }, // CFLAG:331 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4034',
        any: [
          /PRINTFORMW 「怎么样魔王大人、有舒服的地方的话我会更照顾哪里的…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「怎么样魔王大人、有舒服的地方的话我会更照顾哪里的…%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4035',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的瞳孔湿润着带着出神的表情继续撸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的瞳孔湿润着带着出神的表情
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4036',
        any: [/CFLAG:331 = 4/],
      }, // CFLAG:331 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4040',
        any: [/PRINTFORMW 「快、快一点射精吧………」/],
      }, // PRINTFORMW 「快、快一点射精吧………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4041',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%满脸通红的撸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%满脸通红的撸着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4043',
        any: [
          /PRINTFORMW 「竟然这么精神吗………呀！我明白的、我会好好撸的所以不要变得这这么大啊！」/,
        ],
      }, // PRINTFORMW 「竟然这么精神吗………呀！我明白的、我会好好撸的所以不要变
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4044',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为羞耻心而满脸通红的撸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为羞耻心而满脸通红的撸着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4046',
        any: [/CFLAG:331 = 3/],
      }, // CFLAG:331 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4049',
        any: [/PRINTFORMW 「快、快一点射精就好了啊………」/],
      }, // PRINTFORMW 「快、快一点射精就好了啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4051',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边因为讨厌而带着扭曲的表情一边笨拙的用手撸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边因为讨厌而带着扭曲的表
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4053',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%背过脸，撸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%背过脸，撸着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4055',
        any: [/CFLAG:331 = 2/],
      }, // CFLAG:331 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4069',
        any: [
          /PRINTFORMW 「啊啊…我可以这样吮吸最喜欢的魔王大人的肉棒什么的…咕唔噗…啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我可以这样吮吸最喜欢的魔王大人的肉棒什么的…咕唔噗
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4070',
        any: [
          /PRINTFORMW 「这多幸福啊%UNICODE\(0x2661\) \*1% 啊嗯继续勃起吧…嗯啾啾…啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「这多幸福啊%UNICODE(0x2661) *1% 啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4071',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从心底高兴地笑着，吮吸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从心底高兴地笑着，吮吸着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4074',
        any: [
          /PRINTFORMW 「是的…我的嘴是为了把魔王大人舔干净而存在的%UNICODE\(0x2661\) \*1% 请不用客气随意使用%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…我的嘴是为了把魔王大人舔干净而存在的%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4075',
        any: [
          /PRINTFORMW 「啊呜…嗯啾…啾啾啾…啊啊…好吃…真好吃啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯啾…啾啾啾…啊啊…好吃…真好吃啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4076',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为对%SAVESTR:PLAYER%的阴茎进行口腔奉仕而从心底里觉得幸福………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为对%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4079',
        any: [
          /PRINTFORMW 「唔…啊呜…呜咕…唔啾…并、并不是变得坦率了什么的…哈啊哈啊…嗯…嗯咕…啾…而是不得不干吧？」/,
        ],
      }, // PRINTFORMW 「唔…啊呜…呜咕…唔啾…并、并不是变得坦率了什么的…哈啊哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4080',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然留着屈辱的而泪水，但还是继续口腔奉仕%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然留着屈辱的而泪水，但还
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4083',
        any: [
          /PRINTFORMW 「我、我…做这种事什么的…唔…唔…唔…啾…啾…嗯…我明白了、不能继续坚持绝不奉仕了吧？」/,
        ],
      }, // PRINTFORMW 「我、我…做这种事什么的…唔…唔…唔…啾…啾…嗯…我明白了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4084',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着因为屈辱而扭曲的表情，口腔奉仕着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着因为屈辱而扭曲的表情，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4086',
        any: [/CFLAG:TARGET:332 = 1/],
      }, // CFLAG:TARGET:332 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4093',
        any: [
          /PRINTFORMW 「啊啊…我可以这样吮吸最喜欢的肉棒什么的…咕唔噗…啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我可以这样吮吸最喜欢的肉棒什么的…咕唔噗…啾——%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4094',
        any: [
          /PRINTFORMW 「这多幸福啊%UNICODE\(0x2661\) \*1% 啊嗯继续勃起吧…嗯啾啾…啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「这多幸福啊%UNICODE(0x2661) *1% 啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4095',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从心底高兴地笑着，吮吸着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%从心底高兴地笑着，吮吸着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4097',
        any: [
          /PRINTFORMW 「啊呜唔咕%UNICODE\(0x2661\) \*1% 嗯啾…肉棒%UNICODE\(0x2661\) \*1% 肉棒%UNICODE\(0x2661\) \*1% …啊啊啊…最棒的美味啊…啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜唔咕%UNICODE(0x2661) *1% 嗯啾…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4098',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的鼻子发出着粗俗的声音，吮吸着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的鼻子发出着粗俗的声音，吮
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4099',
        any: [
          /PRINTFORMW 「啊啊啊啊…嗯啾…嗯啾嗯啾%UNICODE\(0x2661\) \*1% 多多的把精液射出来吧…亲给我美味的精液啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊…嗯啾…嗯啾嗯啾%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4101',
        any: [
          /PRINTFORMW 「啊啊…果然在肉棒面前…嗯啾啾…是不可能不听从魔王大人的命令的…啾啪啾啪…的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…果然在肉棒面前…嗯啾啾…是不可能不听从魔王大人的命
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4102',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%跪着继续着对%SAVESTR:PLAYER%的阴茎的口腔奉仕、那身姿就像乡下的妓女一样低级。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%跪着继续着对%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4103',
        any: [
          /PRINTFORMW 「为了这根肉棒的话我…嗯啾啾…啾噗…什么…什么都愿意干啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「为了这根肉棒的话我…嗯啾啾…啾噗…什么…什么都愿意干啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4105',
        any: [/CFLAG:332 = 5/],
      }, // CFLAG:332 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4109',
        any: [
          /PRINTFORMW 「是的…我的嘴是为了把魔王大人的，清理干净而尊在的………」/,
        ],
      }, // PRINTFORMW 「是的…我的嘴是为了把魔王大人的，清理干净而尊在的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4110',
        any: [
          /PRINTFORMW 「啊呜…嗯啾…啾啾啾…啊啊…好吃…真好吃啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯啾…啾啾啾…啊啊…好吃…真好吃啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4111',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为对%SAVESTR:PLAYER%的阴茎进行口腔奉仕而从心底里觉得幸福………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为对%SAVESTR:P
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4113',
        any: [
          /PRINTFORMW 「魔王大人…请用我的嘴来消解欲求不满吧%UNICODE\(0x2661\) \*1% 嗯啾…啾…啾…啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人…请用我的嘴来消解欲求不满吧%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4114',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%精心的使用着舌头和嘴唇，温柔的刺激着%SAVESTR:PLAYER%的阴茎、就像插进了又黏又热的黏胶里一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%精心的使用着舌头和嘴唇，温
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4115',
        any: [
          /PRINTFORMW 「嗯啾啾…嗯啾…啾…嗯啾…来吧…在我的嘴里多多射精出来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾啾…嗯啾…啾…嗯啾…来吧…在我的嘴里多多射精出来吧%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4117',
        any: [
          /PRINTFORMW 「嗯啾…啾…啾…咕啾%UNICODE\(0x2661\) \*1% 啊啊…真美味啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾…啾…啾…咕啾%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4118',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着快要融化一样的表情热心的吮吸着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着快要融化一样的表情热心
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4119',
        any: [
          /PRINTFORMW 「请继续命令我吧…这样的话…啊咕…啾…嗯啾…呼啊%UNICODE\(0x2661\) \*1% 不管哪里我都会舔的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「请继续命令我吧…这样的话…啊咕…啾…嗯啾…呼啊%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4121',
        any: [/CFLAG:332 = 4/],
      }, // CFLAG:332 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4125',
        any: [
          /PRINTFORMW 「好过分啊、让我口腔奉仕来确定自己的优越性什么的…不觉得很浅薄么？」/,
        ],
      }, // PRINTFORMW 「好过分啊、让我口腔奉仕来确定自己的优越性什么的…不觉得很
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4126',
        any: [
          /PRINTFORMW 「啊嗯…嗯啾嗯嗯…啾啾…啊咕…嗯咕…哈啊哈啊…真是胆小啊…啊啊」/,
        ],
      }, // PRINTFORMW 「啊嗯…嗯啾嗯嗯…啾啾…啊咕…嗯咕…哈啊哈啊…真是胆小啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4127',
        any: [/PRINTFORMW %SAVESTR:TARGET%的口腔奉仕越来越激烈了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的口腔奉仕越来越激烈了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4129',
        any: [/PRINTFORMW 「我、我并不是喜欢做这种事…嗯啾啾…嗯咕嗯咕」/],
      }, // PRINTFORMW 「我、我并不是喜欢做这种事…嗯啾啾…嗯咕嗯咕」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4130',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是已经习惯口腔奉仕了，相当深的含下了%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是已经习惯口腔奉仕了，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4132',
        any: [/CFLAG:332 = 3/],
      }, // CFLAG:332 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4136',
        any: [
          /PRINTFORMW 「啊啊…为什么我要做这种事…好、好吧…我会好到的舔的…嗯嗯咕…嗯…啾…嗯」/,
        ],
      }, // PRINTFORMW 「啊啊…为什么我要做这种事…好、好吧…我会好到的舔的…嗯嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4137',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为屈辱而带着扭曲的表情，口腔奉仕着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为屈辱而带着扭曲的表情，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4139',
        any: [/PRINTFORMW 「就算让我做这种事我也不会变成你的东西的…嗯啾…啾」/],
      }, // PRINTFORMW 「就算让我做这种事我也不会变成你的东西的…嗯啾…啾」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4140',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然因为屈辱而留下了眼泪但还是继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然因为屈辱而留下了眼泪但
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4142',
        any: [/CFLAG:332 = 2/],
      }, // CFLAG:332 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4156',
        any: [
          /PRINTFORMW 「啊啊魔王大人的肉棒太精神了…好像要把我的胸部烫伤了一样%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊魔王大人的肉棒太精神了…好像要把我的胸部烫伤了一样%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4157',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边高兴地笑着一边继续着乳交奉仕………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边高兴地笑着一边继续着乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4160',
        any: [
          /PRINTFORMW 「是的…我的这对巨乳…是为了奉仕魔王大人而存在的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…我的这对巨乳…是为了奉仕魔王大人而存在的啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4161',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边陶醉的笑着一边继续着乳交奉仕………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边陶醉的笑着一边继续着乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4164',
        any: [/PRINTFORMW 「这、这样就可以了吧？ 啊啊…胸部被玷污了…！」/],
      }, // PRINTFORMW 「这、这样就可以了吧？ 啊啊…胸部被玷污了…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4165',
        any: [/PRINTFORMW %SAVESTR:TARGET%虽然皱着眉但还是继续着乳交奉仕………/],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然皱着眉但还是继续着乳交
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4168',
        any: [/PRINTFORMW 「我、我的胸部才不是为了做这种事而存在的…咕…唔」/],
      }, // PRINTFORMW 「我、我的胸部才不是为了做这种事而存在的…咕…唔」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4169',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边哭着一边进行着乳交奉仕………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边哭着一边进行着乳交奉仕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4171',
        any: [/CFLAG:TARGET:333 = 1/],
      }, // CFLAG:TARGET:333 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4178',
        any: [
          /PRINTFORMW 「啊嗯呼%UNICODE\(0x2661\) \*1% …魔王大人的肉棒…在我的胸部里面变得这么舒服了啊…啊啊…真可爱啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯呼%UNICODE(0x2661) *1% …魔王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4179',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用嘴里垂下的唾液来代替润滑液，继续着乳交奉仕、完全勃起的乳头摩擦着，发出了淫乱的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用嘴里垂下的唾液来代替润滑
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4180',
        any: [
          /PRINTFORMW 「啊哈嗯…果然侍奉肉棒让人停不下来啊…啊啊…啊嗯…恩…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯…果然侍奉肉棒让人停不下来啊…啊啊…啊嗯…恩…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4182',
        any: [
          /PRINTFORMW 「来吧…因为我自豪的胸部而变得舒服的话，就这样满满的射出来也没关系呦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「来吧…因为我自豪的胸部而变得舒服的话，就这样满满的射出来
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4183',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，垂下唾液，大大的乳房噗噜噗噜的变着形，奉仕着阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，垂下唾液，大大的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4184',
        any: [
          /PRINTFORMW 时而用完全勃起的乳头摩擦着阴茎的%SAVESTR:TARGET%品味着快感。/,
        ],
      }, // PRINTFORMW 时而用完全勃起的乳头摩擦着阴茎的%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4185',
        any: [
          /PRINTFORMW 「啊哈啊…我的胸部变成性器了…%UNICODE\(0x2661\) \*1% 夹着肉棒就有感觉了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊…我的胸部变成性器了…%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4187',
        any: [/CFLAG:333 = 6/],
      }, // CFLAG:333 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4190',
        any: [
          /PRINTFORMW 「啊啊魔王大人的肉棒太精神了…好像要把我的胸部烫伤了一样%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊魔王大人的肉棒太精神了…好像要把我的胸部烫伤了一样%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4191',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边高兴地笑着一边继续着乳交奉仕。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边高兴地笑着一边继续着乳
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4192',
        any: [
          /PRINTFORMW 「在我自豪的胸部里…射出像要烫伤我一样热的精液吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「在我自豪的胸部里…射出像要烫伤我一样热的精液吧%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4193',
        any: [/CFLAG:333 = 5/],
      }, // CFLAG:333 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4197',
        any: [
          /PRINTFORMW 「啊啊啊…如果您用我自豪的胸部…变得舒服起来的话…我会很高兴的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…如果您用我自豪的胸部…变得舒服起来的话…我会很高
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4198',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳夹着%SAVESTR:PLAYER%的阴茎蠢动着。乳头像要爆炸一样勃起着，只是稍微一碰%SAVESTR:TARGET%就漏出了喘息声。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的巨乳夹着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4199',
        any: [
          /PRINTFORMW 「嗯啊%UNICODE\(0x2661\) \*1%…哈啊哈啊…忍耐不了啊…被魔王大人侵犯胸部的感觉%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊%UNICODE(0x2661) *1%…哈啊哈啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4201',
        any: [
          /PRINTFORMW 「嗯…啊嗯%UNICODE\(0x2661\) \*1% 啊啊…我…喜欢奉仕…请坦率的说出您的感想吧」/,
        ],
      }, // PRINTFORMW 「嗯…啊嗯%UNICODE(0x2661) *1% 啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4202',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边陶醉着一边用巨乳夹住%SAVESTR:PLAYER%的阴茎摩擦着。用勃起的不能再勃起的乳头摩擦着阴茎的%SAVESTR:TARGET%下流的喘息着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边陶醉着一边用巨乳夹住%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4203',
        any: [
          /PRINTFORMW 「哈嗯…啊嗯…啊啊…我…我是淫乱的女人………只是这样触摸着…就快要去了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯…啊嗯…啊啊…我…我是淫乱的女人………只是这样触摸着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4205',
        any: [/CFLAG:333 = 4/],
      }, // CFLAG:333 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4208',
        any: [/PRINTFORMW 「啊啊…我、我的胸部这么…嗯…嗯…啊啊！」/],
      }, // PRINTFORMW 「啊啊…我、我的胸部这么…嗯…嗯…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4209',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感觉自己的巨乳中间滚烫的%SAVESTR:PLAYER%的肉棒一抖一抖的………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%感觉自己的巨乳中间滚烫的%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4210',
        any: [/CFLAG:333 = 3/],
      }, // CFLAG:333 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4213',
        any: [
          /PRINTFORMW 「这、这样就满足了吧…把我的胸部弄脏就可以了吧………！」/,
        ],
      }, // PRINTFORMW 「这、这样就满足了吧…把我的胸部弄脏就可以了吧………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4214',
        any: [/PRINTFORMW %SAVESTR:TARGET%虽然哭着但还是继续着乳交奉仕………/],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然哭着但还是继续着乳交奉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4215',
        any: [/CFLAG:333 = 2/],
      }, // CFLAG:333 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4229',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 这样夹着肉棒好幸福啊%UNICODE\(0x2661\) \*1% 啊啊啊嗯啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊%UNICODE(0x2661) *1% 这样夹着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4230',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出着高兴的声音一边继续对%SAVESTR:PLAYER%的阴茎进行股间性交奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边发出着高兴的声音一边继
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4233',
        any: [
          /PRINTFORMW 「啊啊…魔王大人的话明明什么时候都可以侵犯我下流的哪里…嗯…啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…魔王大人的话明明什么时候都可以侵犯我下流的哪里…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4234',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的嘴里垂下唾液，高兴地进行着股间性交奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的嘴里垂下唾液，高兴地进行
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4237',
        any: [
          /PRINTFORMW 「啊啊！不要这样勃起啊！咦…啊啊…就、就那么舒服么…？」/,
        ],
      }, // PRINTFORMW 「啊啊！不要这样勃起啊！咦…啊啊…就、就那么舒服么…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4238',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%厌恶的皱着眉，用股间夹着%SAVESTR:PLAYER%阴茎、上下动着腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%厌恶的皱着眉，用股间夹着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4240',
        any: [/CFLAG:TARGET:334 = 1/],
      }, // CFLAG:TARGET:334 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4246',
        any: [
          /PRINTFORMW 「啊嗯…恩…啊、啊啊嗯…呐…我不小心就这样把肉棒插进去的话你会生气吗？」/,
        ],
      }, // PRINTFORMW 「啊嗯…恩…啊、啊啊嗯…呐…我不小心就这样把肉棒插进去的话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4247',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%恶作剧一样的笑着，不停的用丰满的大腿加紧%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%恶作剧一样的笑着，不停的用
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4248',
        any: [
          /PRINTFORMW 「我、我明白…是为了让魔王大人高兴才让我的处女膜再生的…哈啊哈啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我、我明白…是为了让魔王大人高兴才让我的处女膜再生的…哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4249',
        any: [/PRINTFORMW 「但是我能忍到什么地步…我也不知道………」/],
      }, // PRINTFORMW 「但是我能忍到什么地步…我也不知道………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4250',
        any: [/CFLAG:334 = 6/],
      }, // CFLAG:334 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4253',
        any: [
          /PRINTFORMW 「啊啊啊…这根肉棒要把握弄疯了啊…啊啊%UNICODE\(0x2661\) \*1% 让我更有感觉吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…这根肉棒要把握弄疯了啊…啊啊%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4254',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的大腿夹着%SAVESTR:PLAYER%的阴茎、用自己的爱液当做润滑液持续着股间性交奉仕。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%丰满的大腿夹着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4255',
        any: [
          /PRINTFORMW 「啊啊…好热…好热啊…这肉棒真让人…受不了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…好热…好热啊…这肉棒真让人…受不了啊…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4256',
        any: [/CFLAG:334 = 5/],
      }, // CFLAG:334 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4259',
        any: [
          /PRINTFORMW 「哈啊哈啊…特意把我变回处女吊我的胃口…好可恶啊…啊…嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…特意把我变回处女吊我的胃口…好可恶啊…啊…嗯啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4260',
        any: [
          /PRINTFORMW 虽然嘴上这么说着，%SAVESTR:TARGET%的秘裂溢出着蜜汁、粘糊糊的包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 虽然嘴上这么说着，%SAVESTR:TARGET%的秘裂溢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4261',
        any: [
          /PRINTFORMW 「因为我现在想要…魔王大人的…魔王大人的想要的不得了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「因为我现在想要…魔王大人的…魔王大人的想要的不得了啊%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4262',
        any: [/CFLAG:334 = 4/],
      }, // CFLAG:334 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4265',
        any: [
          /PRINTFORMW 「我是…啊啊…想要得到魔王大人的怜悯的淫乱女人…啊啊…所以这个奉仕如果做得好的话…亲给我奖励…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我是…啊啊…想要得到魔王大人的怜悯的淫乱女人…啊啊…所以
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4266',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%悲惨的祈求着%SAVESTR:PLAYER%。那份努力让人不自觉的想要给予她“饵料”。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%悲惨的祈求着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4267',
        any: [/PRINTFORMW 但是、直到极限为止的”缓刑”也是一种快乐………/],
      }, // PRINTFORMW 但是、直到极限为止的”缓刑”也是一种快乐………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4268',
        any: [/CFLAG:334 = 3/],
      }, // CFLAG:334 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4271',
        any: [
          /PRINTFORMW 「不、不要用这种下流的眼神来看我啊…嗯啊嗯！赶、赶紧射精就好了啊………嗯！」/,
        ],
      }, // PRINTFORMW 「不、不要用这种下流的眼神来看我啊…嗯啊嗯！赶、赶紧射精就
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4272',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%厌恶的皱着眉，用大腿夹着%SAVESTR:PLAYER%的阴茎、上下动着腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%厌恶的皱着眉，用大腿夹着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4273',
        any: [/CFLAG:334 = 2/],
      }, // CFLAG:334 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4289',
        any: [
          /PRINTFORMW 「呵呵呵、我的处女不管多少次都会献给魔王大人的…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、我的处女不管多少次都会献给魔王大人的…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4290',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用秘裂摩擦着%SAVESTR:PLAYER%的阴茎、粘糊糊的爱液被做润滑液发出了咕啾咕啾的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用秘裂摩擦着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4291',
        any: [
          /PRINTFORMW 「哈啊哈啊…讨厌、明明打算挑逗一下的、但是我这边先忍不下去了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…讨厌、明明打算挑逗一下的、但是我这边先忍不下去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4292',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%微微一笑，就那样一口气沉下了腰、阴茎被插进了蜜壶的深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%微微一笑，就那样一口气沉下
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4293',
        any: [
          /PRINTFORMW 「啊哈啊——！啊啊啊啊——！忍、忍不了啊…破瓜之痛和小穴的快感混合在一起…我要上瘾了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊——！啊啊啊啊——！忍、忍不了啊…破瓜之痛和小穴的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4294',
        any: [
          /PRINTFORMW 失去处女的%SAVESTR:TARGET%的表情已经是一只雌性的野兽了、%SAVESTR:PLAYER%苦笑着，为了调教这只野兽而开始向上挺起了腰………/,
        ],
      }, // PRINTFORMW 失去处女的%SAVESTR:TARGET%的表情已经是一只
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4297',
        any: [
          /PRINTFORMW 「是的…我遵从魔王大人的命令将处女奉献给您…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…我遵从魔王大人的命令将处女奉献给您…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4298',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%陶醉的笑着用手指撑开秘裂对准%SAVESTR:PLAYER%的阴茎、慢慢的沉下了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%陶醉的笑着用手指撑开秘裂对
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4299',
        any: [
          /PRINTFORMW 「啊啊…现在…处女膜在和魔王大人接吻啊%UNICODE\(0x2661\) \*1% 呵呵呵、就这样直到深处…一口气%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…现在…处女膜在和魔王大人接吻啊%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4300',
        any: [/PRINTFORMW ”噗”地一声%SAVESTR:TARGET%的蜜壶深处接受了阴茎。/],
      }, // PRINTFORMW ”噗”地一声%SAVESTR:TARGET%的蜜壶深处接受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4301',
        any: [
          /PRINTFORMW 「咕啊…啊…啊啊啊啊…好、好有效啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕啊…啊…啊啊啊啊…好、好有效啊…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4302',
        any: [/PRINTFORMW 接下来，秘裂流出了破瓜之血………/],
      }, // PRINTFORMW 接下来，秘裂流出了破瓜之血………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4305',
        any: [/PRINTFORMW 「”自己献上处女”什么的、这命令是开玩笑吧………咕！」/],
      }, // PRINTFORMW 「”自己献上处女”什么的、这命令是开玩笑吧………咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4306',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%皱着眉慢慢沉下了腰。被多次使用过的蜜壶的处女膜破裂有一种奇怪的触感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%皱着眉慢慢沉下了腰。被多次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4307',
        any: [
          /PRINTFORMW 再次失去处女的%SAVESTR:TARGET%、因为感觉很复杂所以动作很笨拙。/,
        ],
      }, // PRINTFORMW 再次失去处女的%SAVESTR:TARGET%、因为感觉很
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4308',
        any: [/PRINTFORMW 「嗯咕…动、动就可以了吧？啊啊啊啊！」/],
      }, // PRINTFORMW 「嗯咕…动、动就可以了吧？啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4314',
        any: [
          /PRINTFORMW 「呵呵呵、我在上面什么的…会好好榨取魔王大人的%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、我在上面什么的…会好好榨取魔王大人的%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4315',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边前后扭动着腰。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边前后扭动着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4316',
        any: [
          /PRINTFORMW 「你看%UNICODE\(0x2661\) \*1% 你看%UNICODE\(0x2661\) \*1% 这样随便我懂…啊嗯…会怎么样…我可不知道哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「你看%UNICODE(0x2661) *1% 你看%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4317',
        any: [
          /PRINTFORMW 就那样带着陶醉的表情为了榨取%SAVESTR:PLAYER%的精液、%SAVESTR:TARGET%开始认真的动起了腰………/,
        ],
      }, // PRINTFORMW 就那样带着陶醉的表情为了榨取%SAVESTR:PLAYER
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4320',
        any: [
          /PRINTFORMW 「啊啊…跨在魔王大人身上明明很害羞的…但是、没有办法呢」/,
        ],
      }, // PRINTFORMW 「啊啊…跨在魔王大人身上明明很害羞的…但是、没有办法呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4321',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞的跨坐在%SAVESTR:PLAYER%身上，自己沉下了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%害羞的跨坐在%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4322',
        any: [/PRINTFORMW 一口气把阴茎吞入肉壶的深处、腰开始慢慢动了起来。/],
      }, // PRINTFORMW 一口气把阴茎吞入肉壶的深处、腰开始慢慢动了起来。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4323',
        any: [
          /PRINTFORMW 「嗯…嗯%UNICODE\(0x2661\) \*1% 啊啊…我好舒服啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…嗯%UNICODE(0x2661) *1% 啊啊…我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4327',
        any: [
          /PRINTFORMW 「如果你觉得我是为了你而动的话就大错特错了…啊！啊啊！这、这么插的话是不行的啊！」/,
        ],
      }, // PRINTFORMW 「如果你觉得我是为了你而动的话就大错特错了…啊！啊啊！这、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4328',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，突然开始了向上突刺。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4329',
        any: [/PRINTFORMW 「咦！啊啊！不、不要…啊啊啊…咕唔！」/],
      }, // PRINTFORMW 「咦！啊啊！不、不要…啊啊啊…咕唔！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4330',
        any: [
          /PRINTFORMW 看到%SAVESTR:TARGET%的“舞蹈”，%SAVESTR:PLAYER%一边笑着一边开始品味着蜜壶………/,
        ],
      }, // PRINTFORMW 看到%SAVESTR:TARGET%的“舞蹈”，%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4332',
        any: [
          /PRINTFORMW 「如果你觉得我是为了你而动的话就大错特错了…嗯嗯…呵呵呵…来吧来吧好好地动起来吧♪」/,
        ],
      }, // PRINTFORMW 「如果你觉得我是为了你而动的话就大错特错了…嗯嗯…呵呵呵…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4333',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%上面坐着，一边轻松的舔着嘴唇一边俯视着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4334',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰开始咕噜咕噜的向上插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4335',
        any: [/PRINTFORMW 「啊啊嗯…还差得远呢…来吧继续插吧…♪」/],
      }, // PRINTFORMW 「啊啊嗯…还差得远呢…来吧继续插吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4339',
        any: [/CFLAG:TARGET:335 = 1/],
      }, // CFLAG:TARGET:335 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4347',
        any: [
          /PRINTFORMW 「呵呵呵、我的处女不管多少次都会献给魔王大人的…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、我的处女不管多少次都会献给魔王大人的…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4348',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用秘裂摩擦着%SAVESTR:PLAYER%的阴茎、粘糊糊的爱液被做润滑液发出了咕啾咕啾的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用秘裂摩擦着%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4349',
        any: [
          /PRINTFORMW 「哈啊哈啊…讨厌、明明打算挑逗一下的、但是我这边先忍不下去了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…讨厌、明明打算挑逗一下的、但是我这边先忍不下去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4350',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%微微一笑，就那样一口气沉下了腰、阴茎被插进了蜜壶的深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%微微一笑，就那样一口气沉下
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4351',
        any: [
          /PRINTFORMW 「啊哈啊——！啊啊啊啊——！忍、忍不了啊…破瓜之痛和小穴的快感混合在一起…我要上瘾了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊——！啊啊啊啊——！忍、忍不了啊…破瓜之痛和小穴的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4352',
        any: [
          /PRINTFORMW 失去处女的%SAVESTR:TARGET%的表情已经是一只雌性的野兽了、%SAVESTR:PLAYER%苦笑着，为了调教这只野兽而开始向上挺起了腰………/,
        ],
      }, // PRINTFORMW 失去处女的%SAVESTR:TARGET%的表情已经是一只
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4355',
        any: [
          /PRINTFORMW 「是的…我遵从魔王大人的命令将处女奉献给您…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…我遵从魔王大人的命令将处女奉献给您…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4356',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%陶醉的笑着用手指撑开秘裂对准%SAVESTR:PLAYER%的阴茎、慢慢的沉下了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%陶醉的笑着用手指撑开秘裂对
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4357',
        any: [
          /PRINTFORMW 「啊啊…现在…处女膜在和魔王大人接吻啊%UNICODE\(0x2661\) \*1% 呵呵呵、就这样直到深处…一口气%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…现在…处女膜在和魔王大人接吻啊%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4358',
        any: [/PRINTFORMW ”噗”地一声%SAVESTR:TARGET%的蜜壶深处接受了阴茎。/],
      }, // PRINTFORMW ”噗”地一声%SAVESTR:TARGET%的蜜壶深处接受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4359',
        any: [
          /PRINTFORMW 「咕啊…啊…啊啊啊啊…好、好有效啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咕啊…啊…啊啊啊啊…好、好有效啊…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4360',
        any: [/PRINTFORMW 接下来，秘裂流出了破瓜之血………/],
      }, // PRINTFORMW 接下来，秘裂流出了破瓜之血………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4363',
        any: [/PRINTFORMW 「”自己献上处女”什么的、这命令是开玩笑吧………咕！」/],
      }, // PRINTFORMW 「”自己献上处女”什么的、这命令是开玩笑吧………咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4364',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%皱着眉慢慢沉下了腰。被多次使用过的蜜壶的处女膜破裂有一种奇怪的触感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%皱着眉慢慢沉下了腰。被多次
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4365',
        any: [
          /PRINTFORMW 再次失去处女的%SAVESTR:TARGET%、因为感觉很复杂所以动作很笨拙。/,
        ],
      }, // PRINTFORMW 再次失去处女的%SAVESTR:TARGET%、因为感觉很
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4366',
        any: [/PRINTFORMW 「嗯咕…动、动就可以了吧？啊啊啊啊！」/],
      }, // PRINTFORMW 「嗯咕…动、动就可以了吧？啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4373',
        any: [
          /PRINTFORMW 「啊哈嗯…魔王大人的肉棒%UNICODE\(0x2661\) \*1% 全部、全部、是我的东西啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯…魔王大人的肉棒%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4374',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边前后扭着腰。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边前后扭着腰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4375',
        any: [
          /PRINTFORMW 「魔王大人的肉棒%UNICODE\(0x2661\) \*1% 最喜欢的肉棒%UNICODE\(0x2661\) \*1% 我谁都不给啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人的肉棒%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4376',
        any: [
          /PRINTFORMW 一边发出欢喜的声音一边要把%SAVESTR:PLAYER%的精液全部榨出来的、%SAVESTR:TARGET%开始认真的动起了腰………/,
        ],
      }, // PRINTFORMW 一边发出欢喜的声音一边要把%SAVESTR:PLAYER%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4378',
        any: [
          /PRINTFORMW 「啊啊嗯我正在品味魔王大人的肉棒的味道魔王大人不要动啊%UNICODE\(0x2661\) \*1% 啊啊嗯啊！啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯我正在品味魔王大人的肉棒的味道魔王大人不要动啊%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4379',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰前后左右的扭动着、品味着龟头和子宫口一次次的接吻的快乐。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的腰前后左右的扭动着、品味
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4380',
        any: [
          /PRINTFORMW 秘裂不停地流出爱液、彻底开发的蜜壶包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 秘裂不停地流出爱液、彻底开发的蜜壶包裹着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4381',
        any: [
          /PRINTFORMW 「哈啊——%UNICODE\(0x2661\) \*1% 哈啊——%UNICODE\(0x2661\) \*1% 肉棒好棒%UNICODE\(0x2661\) \*1% 呀啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊——%UNICODE(0x2661) *1% 哈啊—
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4383',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 肉棒好棒%UNICODE\(0x2661\) \*1% 肉棒插得好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊%UNICODE(0x2661) *1% 肉棒好棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4384',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%的手抓在一起、蜜壶和阴茎也更加深深的联系在一起。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4385',
        any: [
          /PRINTFORMW 随着抽送而发出咕啾咕啾的声音、秘裂里废除的爱液打湿了两人的身体。/,
        ],
      }, // PRINTFORMW 随着抽送而发出咕啾咕啾的声音、秘裂里废除的爱液打湿了两人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4386',
        any: [
          /PRINTFORMW 「啊哈嗯%UNICODE\(0x2661\) \*1% 好棒！好棒啊%UNICODE\(0x2661\) \*1% 继续插小穴啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯%UNICODE(0x2661) *1% 好棒！好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4387',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下流的声音回应着%SAVESTR:PLAYER%的腰的激烈突刺。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%下流的声音回应着%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4388',
        any: [
          /PRINTFORMW 「咦啊啊啊啊%UNICODE\(0x2661\) \*1% 哦哦%UNICODE\(0x2661\) \*1% 小穴小穴好舒服%UNICODE\(0x2661\) \*1% 啊啊肉棒最棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「咦啊啊啊啊%UNICODE(0x2661) *1% 哦哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4390',
        any: [/CFLAG:335 = 9/],
      }, // CFLAG:335 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4394',
        any: [
          /PRINTFORMW 「跨在魔王大人上面…啊嗯…收下肉棒什么的%UNICODE\(0x2661\) \*1% 我是多么幸福的人啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「跨在魔王大人上面…啊嗯…收下肉棒什么的%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4395',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴地跨在%SAVESTR:PLAYER%身上，自己落下腰动了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%高兴地跨在%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4396',
        any: [
          /PRINTFORMW 让阴茎插进蜜壶深处动着的%SAVESTR:TARGET%不断地发出淫乱的声音/,
        ],
      }, // PRINTFORMW 让阴茎插进蜜壶深处动着的%SAVESTR:TARGET%不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4397',
        any: [
          /PRINTFORMW 「啊啊好幸福啊%UNICODE\(0x2661\) \*1% 肉棒全部插进来好幸福啊%UNICODE\(0x2661\) \*1% 啊啊好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊好幸福啊%UNICODE(0x2661) *1% 肉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4399',
        any: [
          /PRINTFORMW 「啊啊哈嗯…肉棒好舒服…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊哈嗯…肉棒好舒服…好舒服啊%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4400',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%像是为了共享快乐一样牵着手，挺着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4401',
        any: [
          /PRINTFORMW 「呀嗯%UNICODE\(0x2661\) \*1% 肉棒插到我的子宫…啊嗯！来了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呀嗯%UNICODE(0x2661) *1% 肉棒插到我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4402',
        any: [
          /PRINTFORMW 被强烈的快乐炙烤着的%SAVESTR:TARGET%的手紧紧地握了回来。因为那有些疼痛的感觉而感到很舒心的%SAVESTR:PLAYER%为了更快乐的感觉而加快了动作………/,
        ],
      }, // PRINTFORMW 被强烈的快乐炙烤着的%SAVESTR:TARGET%的手紧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4404',
        any: [
          /PRINTFORMW 「啊嗯啊啊嗯啊哈啊%UNICODE\(0x2661\) \*1% 用肉棒贯穿子宫吧！啊啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊嗯啊哈啊%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4405',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不停的向上插着、身体就像在暴风雨的大海中被玩弄的小船一样弹跳着，发出这淫乱的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被不停的向上插着、身体就像
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4406',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1% 啊啊嗯%UNICODE\(0x2661\) \*1% 啊啊啊啊——%UNICODE\(0x2661\) \*1% 继续插进来把我插死吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯%UNICODE(0x2661) *1% 啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4407',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像是要用最后一击将子宫击溃而扭动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%像是要用最后一击将子宫击溃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4408',
        any: [
          /PRINTFORMW 「啊啊哦咦…死了要死了我要死了啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊哦咦…死了要死了我要死了啊啊啊啊啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4410',
        any: [/CFLAG:335 = 8/],
      }, // CFLAG:335 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4414',
        any: [
          /PRINTFORMW 「啊啊嗯啊啊…啊嗯！继续插进来！把我的小穴弄得乱七八糟的吧！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊啊…啊嗯！继续插进来！把我的小穴弄得乱七八糟的吧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4415',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVESTR:TARGET%的手开始向上插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4416',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶笨拙的缠绕着阴茎、腰的动作越来越快了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的蜜壶笨拙的缠绕着阴茎、腰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4417',
        any: [
          /PRINTFORMW 「啊啊啊…小穴好舒服！插到子宫了好舒服啊！啊啊啊哦啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊啊…小穴好舒服！插到子宫了好舒服啊！啊啊啊哦啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4419',
        any: [
          /PRINTFORMW 「啊啊啊嗯啊嗯啊哦嗯…子宫口咕噜咕噜的子宫被穿透了啊…啊啊啊哈嗯」/,
        ],
      }, // PRINTFORMW 「啊啊啊嗯啊嗯啊哦嗯…子宫口咕噜咕噜的子宫被穿透了啊…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4420',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%上面跳着淫乱的舞蹈。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4421',
        any: [
          /PRINTFORMW 「啊哈好棒好舒服！小穴好舒服啊！我已经离不开这里了啊！」/,
        ],
      }, // PRINTFORMW 「啊哈好棒好舒服！小穴好舒服啊！我已经离不开这里了啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4422',
        any: [
          /PRINTFORMW 已经完全变成性爱狂的%SAVESTR:TARGET%一边突出卑琐的台词，一边在%SAVESTR:PLAYER%上面贪求着快乐………/,
        ],
      }, // PRINTFORMW 已经完全变成性爱狂的%SAVESTR:TARGET%一边突
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4424',
        any: [
          /PRINTFORMW 「啊哈嗯啊啊啊啊啊嗯！小穴更想要肉棒了啊！呼哇啊啊啊啊啊…」/,
        ],
      }, // PRINTFORMW 「啊哈嗯啊啊啊啊啊嗯！小穴更想要肉棒了啊！呼哇啊啊啊啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4425',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的眼神已经因情欲而彻底放松，沉溺在快乐的肉体关系里了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的眼神已经因情欲而彻底放松
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4426',
        any: [
          /PRINTFORMW 「啊啊啊嗯啊哦…咕嗯…我不退治这个让我变得不行的肉棒可不行啊…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊啊嗯啊哦…咕嗯…我不退治这个让我变得不行的肉棒可不行
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4427',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔了一下嘴唇，为了追求更高的快感而动起了腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了一下嘴唇，为了追求更高
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4429',
        any: [/CFLAG:335 = 7/],
      }, // CFLAG:335 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4433',
        any: [
          /PRINTFORMW 「哈啊哈啊…我在上面的话…就真的全部都收下了呦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我在上面的话…就真的全部都收下了呦%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4434',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边开始前后扭动着腰。/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边开始前后扭
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4437',
        any: [
          /PRINTFORMW 「魔王大人的精液全部都是我的东西%UNICODE\(0x2661\) \*1% 一滴都不会给别人的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人的精液全部都是我的东西%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4438',
        any: [
          /PRINTFORMW 就那样带着陶醉的表情为了把%SAVESTR:PLAYER%的精液全榨出来、%SAVESTR:TARGET%开始认真的动起了腰………/,
        ],
      }, // PRINTFORMW 就那样带着陶醉的表情为了把%SAVESTR:PLAYER%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4440',
        any: [
          /PRINTFORMW 「啊嗯嗯…啊哦嗯%UNICODE\(0x2661\) \*1% 魔王大人的肉棒看起来很兴奋啊%UNICODE\(0x2661\) \*1% 啊啊…就这样插进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯嗯…啊哦嗯%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4443',
        any: [
          /PRINTFORMW 「啊啊嗯我正在品味魔王大人的肉棒的味道魔王大人不要动啊%UNICODE\(0x2661\) \*1% 啊啊嗯啊！啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯我正在品味魔王大人的肉棒的味道魔王大人不要动啊%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4444',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰前后左右的扭动着、品味着龟头和子宫口一次次的接吻的快乐。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的腰前后左右的扭动着、品味
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4447',
        any: [
          /PRINTFORMW 秘裂不停地流出爱液、彻底开发的蜜壶包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW 秘裂不停地流出爱液、彻底开发的蜜壶包裹着%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4448',
        any: [
          /PRINTFORMW 「哈啊%UNICODE\(0x2661\) \*1% 哈啊%UNICODE\(0x2661\) \*1% 魔王大人觉得舒服的话什么时候射都可以哦%UNICODE\(0x2661\) \*1% 啊啊啊啊嗯！」/,
        ],
      }, // PRINTFORMW 「哈啊%UNICODE(0x2661) *1% 哈啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4449',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%挑衅的笑着，%SAVESTR:PLAYER%向上挺着腰、挖掘着子宫口。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%挑衅的笑着，%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4450',
        any: [
          /PRINTFORMW 「呀咦——！？对、对不起啊真、真的要去了的是我啊%UNICODE\(0x2661\) \*1% 所以啊——！」/,
        ],
      }, // PRINTFORMW 「呀咦——！？对、对不起啊真、真的要去了的是我啊%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4452',
        any: [
          /PRINTFORMW 「哈嗯%UNICODE\(0x2661\) \*1% 果然…魔王大人的肉棒最棒了…呼啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯%UNICODE(0x2661) *1% 果然…魔王
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4455',
        any: [
          /PRINTFORMW 「哈嗯啊啊…啊啊啊嗯…小穴好舒服%UNICODE\(0x2661\) \*1% 最喜欢被肉棒插了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈嗯啊啊…啊啊啊嗯…小穴好舒服%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4456',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%的手抓在一起、蜜壶和阴茎也更加深深的联系在一起。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4459',
        any: [
          /PRINTFORMW 随着抽送而发出咕啾咕啾的声音、秘裂里废除的爱液打湿了两人的身体。/,
        ],
      }, // PRINTFORMW 随着抽送而发出咕啾咕啾的声音、秘裂里废除的爱液打湿了两人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4460',
        any: [
          /PRINTFORMW 「啊哈嗯%UNICODE\(0x2661\) \*1% 好棒！好棒啊%UNICODE\(0x2661\) \*1% 继续插小穴啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯%UNICODE(0x2661) *1% 好棒！好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4461',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的娇喘，%SAVESTR:PLAYER%用腰的突刺回应着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的娇喘，%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4462',
        any: [
          /PRINTFORMW 「啊啊啊哦嗯%UNICODE\(0x2661\) \*1% 好棒好棒啊%UNICODE\(0x2661\) \*1% 子宫被顶着…要变的奇怪了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊哦嗯%UNICODE(0x2661) *1% 好棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4464',
        any: [
          /PRINTFORMW 「啊啊…想要就这样一直…以后也一直…和魔王大人做爱啊…啊啊%UNICODE\(0x2661\) \*1% 啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…想要就这样一直…以后也一直…和魔王大人做爱啊…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4467',
        any: [/CFLAG:335 = 6/],
      }, // CFLAG:335 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4471',
        any: [/PRINTFORMW 「跨在魔王大人上面明明很害羞…但是这样…啊啊啊！」/],
      }, // PRINTFORMW 「跨在魔王大人上面明明很害羞…但是这样…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4472',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然很害羞但还是跨在%SAVESTR:PLAYER%上面自己落下了腰动了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然很害羞但还是跨在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4475',
        any: [/PRINTFORMW 让阴茎插进蜜壶深处动着的%SAVESTR:TARGET%不断娇喘着/],
      }, // PRINTFORMW 让阴茎插进蜜壶深处动着的%SAVESTR:TARGET%不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4476',
        any: [
          /PRINTFORMW 「但是但是…明明很害羞却这么舒服啊%UNICODE\(0x2661\) \*1% 让人停不下来啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「但是但是…明明很害羞却这么舒服啊%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4478',
        any: [
          /PRINTFORMW 「嗯啊…啊啊嗯！哈啊哈啊…这、这样插的话、话、是犯规的啊！啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「嗯啊…啊啊嗯！哈啊哈啊…这、这样插的话、话、是犯规的啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4481',
        any: [
          /PRINTFORMW 「哈、呼…啊啊嗯…恩…好、好棒…啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈、呼…啊啊嗯…恩…好、好棒…啊…啊啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4482',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%像是为了共享快乐一样牵着手，挺着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4485',
        any: [
          /PRINTFORMW 「啊啊…啊嗯%UNICODE\(0x2661\) \*1% 太舒服了…好像要飞起来一样%UNICODE\(0x2661\) \*1% 呼哇啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊嗯%UNICODE(0x2661) *1% 太舒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4486',
        any: [
          /PRINTFORMW 大概是因为相性很好%SAVESTR:TARGET%的手握了回去。感觉那个触感很舒服的%SAVESTR:PLAYER%为了品味快乐而更快的动了起来………/,
        ],
      }, // PRINTFORMW 大概是因为相性很好%SAVESTR:TARGET%的手握了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4488',
        any: [
          /PRINTFORMW 「啊嗯啊%UNICODE\(0x2661\) \*1% 继续…继续…让我的哪里…更舒服…吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯啊%UNICODE(0x2661) *1% 继续…继
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4491',
        any: [
          /PRINTFORMW 「啊啊啊啊…明、明明应该让我来动…哈嗯…魔王大人的动作太激烈了…咦啊呀——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊…明、明明应该让我来动…哈嗯…魔王大人的动作太激
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4492',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不停的向上插着、身体就像在暴风雨的大海中被玩弄的小船一样弹跳着，发出着娇喘。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被不停的向上插着、身体就像
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4495',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1% 啊啊嗯%UNICODE\(0x2661\) \*1% 啊啊啊啊——%UNICODE\(0x2661\) \*1% 我、我一直都像这样啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯%UNICODE(0x2661) *1% 啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4496',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像是要用最后一击将子宫击溃而扭动着腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%像是要用最后一击将子宫击溃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4497',
        any: [
          /PRINTFORMW 「啊啊啊咦——…不、不行了！已经不行了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊咦——…不、不行了！已经不行了啊%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4499',
        any: [
          /PRINTFORMW 「啊哈啊…已、已经不行了…这、这么激烈…啊啊…受不了了…啊啊啊嗯！/,
        ],
      }, // PRINTFORMW 「啊哈啊…已、已经不行了…这、这么激烈…啊啊…受不了了…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4502',
        any: [/CFLAG:335 = 5/],
      }, // CFLAG:335 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4506',
        any: [
          /PRINTFORMW 「啊啊嗯啊啊…啊嗯♪ 这么插进来不、不行…不行啊啊嗯啊啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊啊…啊嗯♪ 这么插进来不、不行…不行啊啊嗯啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4507',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVESTR:TARGET%的手开始向上插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4508',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的蜜壶黏糊糊的缠绕着阴茎、%SAVESTR:TARGET%的腰的速度也越来越快。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发了的蜜壶黏糊糊的缠绕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4509',
        any: [
          /PRINTFORMW 「啊啊感觉到了啊…我…我…这么有感觉什么的…啊啊啊…啊啊哈——！」/,
        ],
      }, // PRINTFORMW 「啊啊感觉到了啊…我…我…这么有感觉什么的…啊啊啊…啊啊哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4511',
        any: [
          /PRINTFORMW 「呼哇啊啊啊啊♪…啊…才、才不是的、现在才不是有感觉…哈哦！这、这么插进来的话是不行的啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「呼哇啊啊啊啊♪…啊…才、才不是的、现在才不是有感觉…哈哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4512',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVESTR:TARGET%的手开始向上插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4513',
        any: [/PRINTFORMW %SAVESTR:TARGET%被开发了的蜜壶黏糊糊的缠绕着阴茎。/],
      }, // PRINTFORMW %SAVESTR:TARGET%被开发了的蜜壶黏糊糊的缠绕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4514',
        any: [
          /PRINTFORMW 「啊啊嗯…嗯…啊…啊啊嗯！哈啊哈啊、完、完全没感觉啊…啊！啊啊啊！开玩笑！开玩笑的啦！所以温柔一点啊！啊啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…嗯…啊…啊啊嗯！哈啊哈啊、完、完全没感觉啊…啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4516',
        any: [/CFLAG:335 = 4/],
      }, // CFLAG:335 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4520',
        any: [/PRINTFORMW 「啊啊…不、不要动啊！我、我会懂的…嗯嗯、啊哈！」/],
      }, // PRINTFORMW 「啊啊…不、不要动啊！我、我会懂的…嗯嗯、啊哈！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4521',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一抓住%SAVESTR:TARGET%的腰、%SAVESTR:TARGET%就慌忙自己动起了腰。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一抓住%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4522',
        any: [
          /PRINTFORMW 大大的屁股上下摇动着、能清楚地看到秘裂被阴茎抽送着。/,
        ],
      }, // PRINTFORMW 大大的屁股上下摇动着、能清楚地看到秘裂被阴茎抽送着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4523',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊啊不要这么盯着看啊…嗯！也不要向上顶啊！啊啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊啊不要这么盯着看啊…嗯！也不要向上顶啊！啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4525',
        any: [/PRINTFORMW 「哈啊哈啊…一点点的话动一动也没关系…嗯嗯！」/],
      }, // PRINTFORMW 「哈啊哈啊…一点点的话动一动也没关系…嗯嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4526',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰上下动着，品味着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的腰上下动着，品味着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4527',
        any: [/PRINTFORMW 「嗯嗯…这样会更舒服一点…啊嗯…啊哈♪」/],
      }, // PRINTFORMW 「嗯嗯…这样会更舒服一点…啊嗯…啊哈♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4528',
        any: [
          /PRINTFORMW 配合着腰的动作，%SAVESTR:TARGET%的嘴中稍微漏出了甜美的声音………/,
        ],
      }, // PRINTFORMW 配合着腰的动作，%SAVESTR:TARGET%的嘴中稍微
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4530',
        any: [/CFLAG:335 = 3/],
      }, // CFLAG:335 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4534',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，鼓起干劲插了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4535',
        any: [
          /PRINTFORMW 「咦——！还、还不行…我的哪里…啊啊不行啊…嗯啊啊嗯啊咦——！」/,
        ],
      }, // PRINTFORMW 「咦——！还、还不行…我的哪里…啊啊不行啊…嗯啊啊嗯啊咦—
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4536',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为蜜壶深处被插入而颤抖着腰。/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为蜜壶深处被插入而颤抖着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4537',
        any: [/PRINTFORMW 「啊啊嗯！不、不要动…只、只是插进来的话…咦…咦——！」/],
      }, // PRINTFORMW 「啊啊嗯！不、不要动…只、只是插进来的话…咦…咦——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4539',
        any: [/PRINTFORMW 「呼…呼…来吧、好好动起来吧…你是想让我陷落对吧？」/],
      }, // PRINTFORMW 「呼…呼…来吧、好好动起来吧…你是想让我陷落对吧？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4540',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%坐在%SAVESTR:PLAYER%上面带着余裕一边舔着嘴唇一边俯视着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%坐在%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4541',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰开始向上插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4542',
        any: [/PRINTFORMW 「啊嗯啊啊嗯…来吧来吧、加油吧…啊嗯…啊啊嗯！」/],
      }, // PRINTFORMW 「啊嗯啊啊嗯…来吧来吧、加油吧…啊嗯…啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4544',
        any: [/CFLAG:335 = 2/],
      }, // CFLAG:335 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4558',
        any: [
          /PRINTFORMW 「哈啊哈啊…我会把你的身体洗干净的…请稍微老实一点吧」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我会把你的身体洗干净的…请稍微老实一点吧」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4559',
        any: [/PRINTFORMW 「啊啊、连一条毛巾都不让我用…好下流啊…」/],
      }, // PRINTFORMW 「啊啊、连一条毛巾都不让我用…好下流啊…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4562',
        any: [/PRINTFORMW 「明明难得洗一次澡，还要把你洗干净什么的…」/],
      }, // PRINTFORMW 「明明难得洗一次澡，还要把你洗干净什么的…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4563',
        any: [/PRINTFORMW 「啊嗯…不、不要碰我的身体啊！」/],
      }, // PRINTFORMW 「啊嗯…不、不要碰我的身体啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4565',
        any: [/CFLAG:TARGET:336 = 1/],
      }, // CFLAG:TARGET:336 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4571',
        any: [
          /PRINTFORMW 「嗯…啊嗯…啊呼…魔王大人…想要射的话就这样满满的射出来也没关系哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…啊嗯…啊呼…魔王大人…想要射的话就这样满满的射出来也
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4572',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的丰满的大腿沾满泡沫，夹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的丰满的大腿沾满泡沫，夹着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4573',
        any: [
          /PRINTFORMW 「这里的话不管变得多脏我都会立刻洗干净的…所以…呐…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「这里的话不管变得多脏我都会立刻洗干净的…所以…呐…%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4574',
        any: [/CFLAG:336 = 5/],
      }, // CFLAG:336 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4577',
        any: [
          /PRINTFORMW 「啊啊…我会把魔王大人的身体全部洗干净的…您不动手也可以哦？」/,
        ],
      }, // PRINTFORMW 「啊啊…我会把魔王大人的身体全部洗干净的…您不动手也可以哦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4578',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那丰满的身体擦洗着%SAVESTR:PLAYER%、确实是包括边边角角把身体全部都洗干净了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%那丰满的身体擦洗着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4579',
        any: [
          /PRINTFORMW 「让人停不下来啊…我最幸福的时刻就是奉仕魔王大人的时候啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「让人停不下来啊…我最幸福的时刻就是奉仕魔王大人的时候啊%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4580',
        any: [/CFLAG:336 = 4/],
      }, // CFLAG:336 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4583',
        any: [
          /PRINTFORMW 「这里也是不洗干净不行吧…也不要用那种下流的表情笑啊！」/,
        ],
      }, // PRINTFORMW 「这里也是不洗干净不行吧…也不要用那种下流的表情笑啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4584',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边抱怨着，一边用满是肥皂泡的手爱抚着%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边抱怨着，一边用满是肥皂
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4585',
        any: [/CFLAG:336 = 3/],
      }, // CFLAG:336 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4588',
        any: [/PRINTFORMW 「来、好好的把手伸出来…哈啊哈啊…嗯…呼…唔…」/],
      }, // PRINTFORMW 「来、好好的把手伸出来…哈啊哈啊…嗯…呼…唔…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4589',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是因为洗澡的热气而身体发烫，漏出了灼热的吐息………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是因为洗澡的热气而身体
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4590',
        any: [/CFLAG:336 = 2/],
      }, // CFLAG:336 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4605',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人的肉棒…让我的肛门好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…魔王大人的肉棒…让我的肛门好舒服啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4606',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下流的扭动着腰，贪求着肛门被侵犯的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%下流的扭动着腰，贪求着肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4607',
        any: [
          /PRINTFORMW 「啊哈嗯…啊啊啊…咦——…果然肛门里还是要插肉棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯…啊啊啊…咦——…果然肛门里还是要插肉棒啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4608',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边喘息着一边继续上下动着腰………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边喘息着一边继续上下动着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4610',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人的肉棒…让我的肛门好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…魔王大人的肉棒…让我的肛门好舒服啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4611',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%微微一笑沉下了腰、未开发的肛门将%SAVESTR:PLAYER%的阴茎埋了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%微微一笑沉下了腰、未开发的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4612',
        any: [/PRINTFORMW 「啊啊…好厉害…好、好紧…好紧啊…啊啊啊啊！」/],
      }, // PRINTFORMW 「啊啊…好厉害…好、好紧…好紧啊…啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4613',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被扩张到了极限………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门被扩张到了极限………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4618',
        any: [
          /PRINTFORMW 「啊啊…请好好感受我的肛门吧%UNICODE\(0x2661\) \*1%…啊啊啊嗯啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…请好好感受我的肛门吧%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4619',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开发完成了的肛门轻易的接受了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%开发完成了的肛门轻易的接受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4620',
        any: [
          /PRINTFORMW 满是陶醉的表情的%SAVESTR:TARGET%的腰一被抓住，就变成了满是期待的表情。/,
        ],
      }, // PRINTFORMW 满是陶醉的表情的%SAVESTR:TARGET%的腰一被抓
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4621',
        any: [
          /PRINTFORMW 「嗯…插、插进来了…魔王大人请把我的屁股弄得乱七八糟的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…插、插进来了…魔王大人请把我的屁股弄得乱七八糟的吧…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4623',
        any: [
          /PRINTFORMW 「啊啊…请好好感受我的肛门吧%UNICODE\(0x2661\) \*1%…啊啊啊嗯啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…请好好感受我的肛门吧%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4624',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门接受着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%未开发的肛门接受着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4625',
        any: [
          /PRINTFORMW 温柔的抚摸着一脸痛苦的样子的%SAVESTR:TARGET%的腰、%SAVESTR:TARGET%突然笑了起来。/,
        ],
      }, // PRINTFORMW 温柔的抚摸着一脸痛苦的样子的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4626',
        any: [/PRINTFORMW 「啊啊…没必要这样关心我…啊啊啊啊哈嗯！」/],
      }, // PRINTFORMW 「啊啊…没必要这样关心我…啊啊啊啊哈嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4631',
        any: [
          /PRINTFORMW 「啊啊…屁股被这么简单就插进来了什么的…啊啊啊…嗯嗯唔——！」/,
        ],
      }, // PRINTFORMW 「啊啊…屁股被这么简单就插进来了什么的…啊啊啊…嗯嗯唔——
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4632',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的开发完成的肛门轻易接受并紧紧包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的开发完成的肛门轻易接受并
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4633',
        any: [/PRINTFORMW 「哈啊哈啊…要动起来了…啊啊…啊咕」/],
      }, // PRINTFORMW 「哈啊哈啊…要动起来了…啊啊…啊咕」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4635',
        any: [
          /PRINTFORMW 「咕呼…让我自己插进屁股里什么的…咕唔！不、不要开玩笑啊！」/,
        ],
      }, // PRINTFORMW 「咕呼…让我自己插进屁股里什么的…咕唔！不、不要开玩笑啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4636',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的未开发的肛门紧紧包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的未开发的肛门紧紧包裹着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4637',
        any: [/PRINTFORMW 「啊…啊啊…这样的话、动、动不了了………」/],
      }, // PRINTFORMW 「啊…啊啊…这样的话、动、动不了了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4640',
        any: [/CFLAG:TARGET:337 = 1/],
      }, // CFLAG:TARGET:337 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4647',
        any: [
          /PRINTFORMW 「啊啊嗯%UNICODE\(0x2661\) \*1% 肉棒好舒服啊%UNICODE\(0x2661\) \*1% 肛门要融化了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯%UNICODE(0x2661) *1% 肉棒好舒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4648',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下流的扭动着腰，贪求着肛门被侵犯的快感。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%下流的扭动着腰，贪求着肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4649',
        any: [
          /PRINTFORMW 「啊嗯啊啊嗯%UNICODE\(0x2661\) \*1% 我也要动起来了啊…啊啊啊啊～！」/,
        ],
      }, // PRINTFORMW 「啊嗯啊啊嗯%UNICODE(0x2661) *1% 我也
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4650',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边喘息着一边上下动着腰………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边喘息着一边上下动着腰…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4652',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰开始向上顶着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4653',
        any: [
          /PRINTFORMW 「嗯呼…肛门太舒服了…啊嗯%UNICODE\(0x2661\) \*1% 这么插的话会从肛门里面敲到子宫啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯呼…肛门太舒服了…啊嗯%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4654',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰不停的上下动着、扭动着身体发出着娇喘。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的腰不停的上下动着、扭动着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4655',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 啊啊嗯%UNICODE\(0x2661\) \*1% 肛门好棒%UNICODE\(0x2661\) \*1% 最喜欢肛交了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊%UNICODE(0x2661) *1% 啊啊嗯%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4657',
        any: [
          /PRINTFORMW 「呼哇啊啊啊…肛门要融化了…嗯啊嗯啊哈嗯%UNICODE\(0x2661\) \*1% 啊啊啊停不下来了最棒了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼哇啊啊啊…肛门要融化了…嗯啊嗯啊哈嗯%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4658',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边浮现出淫乱的笑容一边在%SAVESTR:PLAYER%的腰的上面跳着淫乱的舞蹈。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边浮现出淫乱的笑容一边在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4659',
        any: [
          /PRINTFORMW 「啊哈嗯%UNICODE\(0x2661\) \*1% 继续…继续侵犯吧…把肛门弄得乱七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈嗯%UNICODE(0x2661) *1% 继续…继
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4660',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%因为那诱惑性的姿态而舔了舔嘴唇，更激烈的挺着腰侵犯着肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%因为那诱惑性的姿态而舔了舔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4662',
        any: [/CFLAG:337 = 7/],
      }, // CFLAG:337 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4665',
        any: [
          /PRINTFORMW 「啊啊…还、还是…很紧呢…嗯啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…还、还是…很紧呢…嗯啊嗯%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4666',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然一脸痛苦、但未开发的肛门还是埋下了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然一脸痛苦、但未开发的肛
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4667',
        any: [/PRINTFORMW 「嗯！…过、果然…魔王大人的肉棒…啊啊哈！」/],
      }, // PRINTFORMW 「嗯！…过、果然…魔王大人的肉棒…啊啊哈！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4668',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被扩张到了极限………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门被扩张到了极限………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4669',
        any: [/CFLAG:337 = 6/],
      }, // CFLAG:337 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4673',
        any: [
          /PRINTFORMW 「啊啊…请好好感受我的肛门吧%UNICODE\(0x2661\) \*1%…啊啊啊嗯啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…请好好感受我的肛门吧%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4674',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%开发完成了的肛门轻易的接受了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW  %SAVESTR:TARGET%开发完成了的肛门轻易的接
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4675',
        any: [
          /PRINTFORMW 满是陶醉的表情的%SAVESTR:TARGET%的腰一被抓住，就变成了满是期待的表情。/,
        ],
      }, // PRINTFORMW 满是陶醉的表情的%SAVESTR:TARGET%的腰一被抓
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4676',
        any: [
          /PRINTFORMW 「嗯…插、插进来了…魔王大人请把我的屁股弄得乱七八糟的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…插、插进来了…魔王大人请把我的屁股弄得乱七八糟的吧…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4677-4679',
        any: [
          /PRINTFORMW 「啊啊哈%UNICODE\(0x2661\) \*1% 好舒服啊…好舒服啊啊嗯啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊哈%UNICODE(0x2661) *1% 好舒服啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4679',
        any: [
          /PRINTFORMW 「啊啊哈%UNICODE\(0x2661\) \*1% 好舒服啊…好舒服啊啊嗯啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊哈%UNICODE(0x2661) *1% 好舒服啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4680',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门把%SAVESTR:PLAYER%的阴茎直到根部都吞了进去。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门把%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4681',
        any: [
          /PRINTFORMW 一边享受着秘裂因为快感而漏出爱液的淫靡的光景、%SAVESTR:PLAYER%一边挺着腰。/,
        ],
      }, // PRINTFORMW 一边享受着秘裂因为快感而漏出爱液的淫靡的光景、%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4682',
        any: [
          /PRINTFORMW 「啊啊啊啊嗯%UNICODE\(0x2661\) \*1% 明、明明应该让我来动…嗯啊嗯咦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊嗯%UNICODE(0x2661) *1% 明、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4684',
        any: [
          /PRINTFORMW 「肛门这么有感觉什么的%UNICODE\(0x2661\) \*1% 我、我…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「肛门这么有感觉什么的%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4685',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVESTR:TARGET%的手、腰反复的激烈向上抽送着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%像抓缰绳一样握住%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4686',
        any: [
          /PRINTFORMW 「啊哈啊啊嗯啊啊…咦、再、再继续的话…啊啊啊啊嗯…要、要融化了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊啊嗯啊啊…咦、再、再继续的话…啊啊啊啊嗯…要、要融
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4687',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的完成开发的肛门随着被插而不停地包裹着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的完成开发的肛门随着被插而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4689',
        any: [/CFLAG:337 = 5/],
      }, // CFLAG:337 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4692',
        any: [
          /PRINTFORMW 「肛门里…被魔王大人填满了…%UNICODE\(0x2661\) \*1% 啊嗯好紧！」/,
        ],
      }, // PRINTFORMW 「肛门里…被魔王大人填满了…%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4693',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门接受着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%未开发的肛门接受着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4694',
        any: [
          /PRINTFORMW 温柔的抚摸着一脸痛苦的样子的%SAVESTR:TARGET%的腰、%SAVESTR:TARGET%突然笑了起来。/,
        ],
      }, // PRINTFORMW 温柔的抚摸着一脸痛苦的样子的%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4695',
        any: [/PRINTFORMW 「啊啊…没必要这样关心我…啊啊啊啊哈嗯！」/],
      }, // PRINTFORMW 「啊啊…没必要这样关心我…啊啊啊啊哈嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4696',
        any: [/CFLAG:337 = 4/],
      }, // CFLAG:337 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4699',
        any: [/PRINTFORMW 「嗯啊嗯啊啊！我、我的肛门…这么呀啊…啊啊啊！」/],
      }, // PRINTFORMW 「嗯啊嗯啊啊！我、我的肛门…这么呀啊…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4700',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的开发完成的肛门轻易接受并紧紧包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的开发完成的肛门轻易接受并
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4701',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰开始不停的向上插着。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4702',
        any: [/PRINTFORMW 「啊啊啊啊！不行…不行…这么做的话我…我…啊啊哈啊！」/],
      }, // PRINTFORMW 「啊啊啊啊！不行…不行…这么做的话我…我…啊啊哈啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4703',
        any: [/CFLAG:337 = 3/],
      }, // CFLAG:337 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4706',
        any: [/PRINTFORMW 「啊咕…好、好紧啊…不、不要太激烈的动啊…啊啊啊！」/],
      }, // PRINTFORMW 「啊咕…好、好紧啊…不、不要太激烈的动啊…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4707',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的未开发的肛门紧紧包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的未开发的肛门紧紧包裹着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4708',
        any: [/PRINTFORMW 「哈咕！不、不要这么插啊！啊啊啊啊——！」/],
      }, // PRINTFORMW 「哈咕！不、不要这么插啊！啊啊啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4709',
        any: [/CFLAG:337 = 2/],
      }, // CFLAG:337 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4723',
        any: [/PRINTFORMW 「啊啊…屈辱啊这样…但是…不能抗命…嗯啾…啾…啾………」/],
      }, // PRINTFORMW 「啊啊…屈辱啊这样…但是…不能抗命…嗯啾…啾…啾………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4724',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然屈辱的留下了眼泪，还是用舌头舔在%SAVESTR:PLAYER%的肛门上………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然屈辱的留下了眼泪，还是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4727',
        any: [/PRINTFORMW 「啊啊…好恶心…好恶心啊…嗯…嗯啊…啾…嗯…嗯咕………」/],
      }, // PRINTFORMW 「啊啊…好恶心…好恶心啊…嗯…嗯啊…啾…嗯…嗯咕………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4728',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流着屈辱的泪水一边舔着%SAVESTR:PLAYER%的肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边流着屈辱的泪水一边舔着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4730',
        any: [/CFLAG:TARGET:338 = 1/],
      }, // CFLAG:TARGET:338 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4736',
        any: [
          /PRINTFORMW 「啊哈啊…可以舔魔王大人的屁股什么的%UNICODE\(0x2661\) \*1% 嗯啾啾啪啾啾嗯唔啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈啊…可以舔魔王大人的屁股什么的%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4737',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%故意发出着下流的声音，舔着%SAVESTR:PLAYER%的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%故意发出着下流的声音，舔着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4738',
        any: [
          /PRINTFORMW 「啊哈啊啊…这样肛门奉仕…我的身体也发热变得奇怪起来了%UNICODE\(0x2661\) \*1% 嗯啾啾嗯啾嗯啾♪」/,
        ],
      }, // PRINTFORMW 「啊哈啊啊…这样肛门奉仕…我的身体也发热变得奇怪起来了%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4739',
        any: [/CFLAG:338 = 5/],
      }, // CFLAG:338 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4742',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人的屁股…真美味啊…嗯啾啾嗯啾啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…魔王大人的屁股…真美味啊…嗯啾啾嗯啾啾啾%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4743',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流下着唾液一边用舌头像钻头一样钻进%SAVESTR:PLAYER%的肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边流下着唾液一边用舌头像
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4744',
        any: [
          /PRINTFORMW 「嗯咕…嗯啾啾啾啪…啾咕啾啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯啾啾啾啪…啾咕啾啾——%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4745',
        any: [/CFLAG:338 = 4/],
      }, // CFLAG:338 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4748',
        any: [/PRINTFORMW 「哈啊哈啊…嗯啾…啾…啾…不继续…是不行的吧…嗯啾…啾」/],
      }, // PRINTFORMW 「哈啊哈啊…嗯啾…啾…啾…不继续…是不行的吧…嗯啾…啾」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4749',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然感觉很屈辱但还是继续奉仕着%SAVESTR:PLAYER%的肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然感觉很屈辱但还是继续奉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4750',
        any: [/CFLAG:338 = 3/],
      }, // CFLAG:338 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4753',
        any: [/PRINTFORMW 「已…已经受不了了…嗯啾…啾…啾…」/],
      }, // PRINTFORMW 「已…已经受不了了…嗯啾…啾…啾…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4754',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流着屈辱的泪水一边舔着%SAVESTR:PLAYER%的肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边流着屈辱的泪水一边舔着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4755',
        any: [/CFLAG:338 = 2/],
      }, // CFLAG:338 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4767',
        any: [
          /PRINTFORMW 「啊呀！？快、快停下！这种用来对付小孩子的恶作剧的教育方式！啊呀！咦！」/,
        ],
      }, // PRINTFORMW 「啊呀！？快、快停下！这种用来对付小孩子的恶作剧的教育方式
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4768',
        any: [/CFLAG:TARGET:341 = 1/],
      }, // CFLAG:TARGET:341 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4774',
        any: [
          /PRINTFORMW 「啊咦…啊嗯！啊啊啊！继续…继续打我的屁股吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊咦…啊嗯！啊啊啊！继续…继续打我的屁股吧%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4775',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被打屁股都左右摇动着腰、爱液咕噜咕噜的往外冒着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%每次被打屁股都左右摇动着腰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4776',
        any: [
          /PRINTFORMW 「被魔王大人欺负的受不了了…啊啊继续虐待我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「被魔王大人欺负的受不了了…啊啊继续虐待我吧…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4777',
        any: [/CFLAG:TARGET:341 = 5/],
      }, // CFLAG:TARGET:341 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4780',
        any: [
          /PRINTFORMW 「啊啊…我是魔王大人的东西…所以请疼爱我的…嗯！啊嗯！屁股吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我是魔王大人的东西…所以请疼爱我的…嗯！啊嗯！屁股
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4781',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被打屁股都会左右摇动诱惑着%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%每次被打屁股都会左右摇动诱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4782',
        any: [
          /PRINTFORMW 「啊嗯！咦！啊哈！啊啊啊啊啊啊…让人停不下来啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯！咦！啊哈！啊啊啊啊啊啊…让人停不下来啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4783',
        any: [/CFLAG:TARGET:341 = 4/],
      }, // CFLAG:TARGET:341 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4786',
        any: [
          /PRINTFORMW 「啊啊！啊嗯！咦咦——————！求你了！求你原谅我吧！啊咦咦咦咦咦咦！」/,
        ],
      }, // PRINTFORMW 「啊啊！啊嗯！咦咦——————！求你了！求你原谅我吧！啊咦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4787',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样双手被按住，一次次的打着屁股，发出着悲鸣。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样双手被按住，一次次的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4788',
        any: [/PRINTFORMW 想要逃走但还是无法从%SAVESTR:PLAYER%哪里逃开………/],
      }, // PRINTFORMW 想要逃走但还是无法从%SAVESTR:PLAYER%哪里逃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4789',
        any: [/CFLAG:TARGET:341 = 3/],
      }, // CFLAG:TARGET:341 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4792',
        any: [
          /PRINTFORMW 「不！不要！快停下啊！咦！阿姨！我又不是小孩子啊！」/,
        ],
      }, // PRINTFORMW 「不！不要！快停下啊！咦！阿姨！我又不是小孩子啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4793',
        any: [/PRINTFORMW %SAVESTR:TARGET%的屁股被打得通红通红的………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的屁股被打得通红通红的……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4794',
        any: [/CFLAG:TARGET:341 = 2/],
      }, // CFLAG:TARGET:341 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4808',
        any: [
          /PRINTFORMW 「啊嗯…啊啊啊！我、我…不要这么痛啊！咦嗯！啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊嗯…啊啊啊！我、我…不要这么痛啊！咦嗯！啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4809',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被鞭打而抱着身子拼死躲避着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被鞭打而抱着身子拼死躲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4812',
        any: [
          /PRINTFORMW 「啊啊…如果魔王大人想这么做的话…我会老实的接受鞭打的………」/,
        ],
      }, // PRINTFORMW 「啊啊…如果魔王大人想这么做的话…我会老实的接受鞭打的……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4813',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着好像放弃了什么的感觉接受着鞭打………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着好像放弃了什么的感觉接
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4816',
        any: [
          /PRINTFORMW 「啊啊啊！咦！不、不要啊！这样的话会留下伤痕…啊呀啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊啊！咦！不、不要啊！这样的话会留下伤痕…啊呀啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4817',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被鞭打而发出了悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被鞭打而发出了悲鸣……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4819',
        any: [/CFLAG:TARGET:342 = 1/],
      }, // CFLAG:TARGET:342 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4825',
        any: [
          /PRINTFORMW 「呼哇啊啊…让人停不下来啊…魔王大人的鞭子…啊嗯…这么有感觉什么的…啊啊…咦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呼哇啊啊…让人停不下来啊…魔王大人的鞭子…啊嗯…这么有感
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4826',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被鞭打，股间垂下了爱液………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被鞭打，股间垂下了爱液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4827',
        any: [/CFLAG:TARGET:342 = 9/],
      }, // CFLAG:TARGET:342 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4830',
        any: [
          /PRINTFORMW 「啊啊…总感觉被鞭子欺负…的感觉变得舒服起来了…啊嗯啊咦…咦——！」/,
        ],
      }, // PRINTFORMW 「啊啊…总感觉被鞭子欺负…的感觉变得舒服起来了…啊嗯啊咦…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4831',
        any: [/PRINTFORMW %SAVESTR:TARGET%被鞭打而发出了像是娇喘的悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被鞭打而发出了像是娇喘的悲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4832',
        any: [/CFLAG:TARGET:342 = 8/],
      }, // CFLAG:TARGET:342 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4835',
        any: [
          /PRINTFORMW 「啊嗯…啊啊啊！我、我…不要这么痛啊！咦嗯！啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊嗯…啊啊啊！我、我…不要这么痛啊！咦嗯！啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4836',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被鞭打而抱着身子拼死躲避着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被鞭打而抱着身子拼死躲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4837',
        any: [/CFLAG:TARGET:342 = 7/],
      }, // CFLAG:TARGET:342 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4840',
        any: [
          /PRINTFORMW 「继续…继续鞭打我吧…啊啊…这就是魔王大人的爱呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「继续…继续鞭打我吧…啊啊…这就是魔王大人的爱呢…%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4841',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样带着恍惚的表情继续接受着%SAVESTR:PLAYER%的鞭子………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样带着恍惚的表情继续接
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4842',
        any: [/CFLAG:TARGET:342 = 6/],
      }, // CFLAG:TARGET:342 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4845',
        any: [
          /PRINTFORMW 「啊哈…啊嗯…咕…我慢慢理解了被魔王大人鞭打的快感了………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…啊嗯…咕…我慢慢理解了被魔王大人鞭打的快感了………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4846',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%微微一笑，继续接受着%SAVESTR:PLAYER%的鞭子………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%微微一笑，继续接受着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4847',
        any: [/CFLAG:TARGET:342 = 5/],
      }, // CFLAG:TARGET:342 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4850',
        any: [
          /PRINTFORMW 「啊啊…如果魔王大人想这么做的话…我会老实的接受鞭打的………」/,
        ],
      }, // PRINTFORMW 「啊啊…如果魔王大人想这么做的话…我会老实的接受鞭打的……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4851',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着好像放弃了什么的感觉接受着鞭打………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着好像放弃了什么的感觉接
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4852',
        any: [/CFLAG:TARGET:342 = 4/],
      }, // CFLAG:TARGET:342 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4855',
        any: [
          /PRINTFORMW 「被…鞭打的地方一阵一阵的发痛…嗯…我…要变的奇怪了…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「被…鞭打的地方一阵一阵的发痛…嗯…我…要变的奇怪了…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4856',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像理解了被鞭打的快感、%SAVESTR:PLAYER%的手也开始发烫………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像理解了被鞭打的快感、%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4857',
        any: [/CFLAG:TARGET:342 = 3/],
      }, // CFLAG:TARGET:342 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4860',
        any: [
          /PRINTFORMW 「求你了…停下…快停下…被鞭子打了的话就没法躺着睡觉了…啊咕咦咦——！」/,
        ],
      }, // PRINTFORMW 「求你了…停下…快停下…被鞭子打了的话就没法躺着睡觉了…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4861',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%无视%SAVESTR:TARGET%的祈求，毫不留情的又追加了一击………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%无视%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4862',
        any: [/CFLAG:TARGET:342 = 2/],
      }, // CFLAG:TARGET:342 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4876',
        any: [
          /PRINTFORMW 「啊啊！不、不行啊！虽说用我让你来变舒服的做什么都可以…这、这么痛的…咦——！」/,
        ],
      }, // PRINTFORMW 「啊啊！不、不行啊！虽说用我让你来变舒服的做什么都可以…这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4877',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被针刺着而发出着悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被针刺着而发出着悲鸣…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4880',
        any: [
          /PRINTFORMW 「嗯咕…魔王大人想要的话…不管怎么伤害我的身体都没关系………」/,
        ],
      }, // PRINTFORMW 「嗯咕…魔王大人想要的话…不管怎么伤害我的身体都没关系……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4881',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着放弃了的表情低语着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%带着放弃了的表情低语着……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4884',
        any: [/PRINTFORMW 「这、这样犯规了啊！不、不不啊啊啊啊！」/],
      }, // PRINTFORMW 「这、这样犯规了啊！不、不不啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4885',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%只是被针轻轻的扎了一下就发出了悲鸣………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%只是被针轻轻的扎了一下就发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4887',
        any: [/CFLAG:TARGET:343 = 1/],
      }, // CFLAG:TARGET:343 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4893',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人…继续用针刺我吧…啊啊…啊啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…魔王大人…继续用针刺我吧…啊啊…啊啊啊………%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4894',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像觉醒了被%SAVESTR:PLAYER%用针刺的快感………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像觉醒了被%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4895',
        any: [/CFLAG:TARGET:343 = 9/],
      }, // CFLAG:TARGET:343 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4898',
        any: [
          /PRINTFORMW 「啊咕！我的肌肤上这种伤…啊啊啊啊！啊咕嗯…啊呜——！」/,
        ],
      }, // PRINTFORMW 「啊咕！我的肌肤上这种伤…啊啊啊啊！啊咕嗯…啊呜——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4899',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着针刺而扭动着身体发出悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着针刺而扭动着身体发出悲
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4900',
        any: [/CFLAG:TARGET:343 = 8/],
      }, // CFLAG:TARGET:343 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4903',
        any: [
          /PRINTFORMW 「啊啊！啊啊啊！这、这么…疼的不要啊！咦咕啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊！啊啊啊！这、这么…疼的不要啊！咦咕啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4904',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为针刺而发出着悲鸣。好像就快要失禁了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为针刺而发出着悲鸣。好像
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4905',
        any: [/CFLAG:TARGET:343 = 7/],
      }, // CFLAG:TARGET:343 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4908',
        any: [
          /PRINTFORMW 「哦哦哦哦…继续…继续扎我…感觉到了魔王大人深深的爱了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哦哦哦哦…继续…继续扎我…感觉到了魔王大人深深的爱了…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4909',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体被数根针插着，流着血、但是那个姿态的%SAVESTR:TARGET%也很美………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体被数根针插着，流着血
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4910',
        any: [/CFLAG:TARGET:343 = 6/],
      }, // CFLAG:TARGET:343 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4913',
        any: [/PRINTFORMW 「啊啊…哈啊哈啊…继续…继续刺伤我吧…啊…咦咦——！」/],
      }, // PRINTFORMW 「啊啊…哈啊哈啊…继续…继续刺伤我吧…啊…咦咦——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4914',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被针刺而发出着娇喘………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被针刺而发出着娇喘……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4915',
        any: [/CFLAG:TARGET:343 = 5/],
      }, // CFLAG:TARGET:343 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4918',
        any: [
          /PRINTFORMW 「啊啊…在我的身体上…咦！留下魔王大人的伤痕…印记吧…啊咦——！」/,
        ],
      }, // PRINTFORMW 「啊啊…在我的身体上…咦！留下魔王大人的伤痕…印记吧…啊咦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4919',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被针刺而发出着悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被针刺而发出着悲鸣……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4920',
        any: [/CFLAG:TARGET:343 = 4/],
      }, // CFLAG:TARGET:343 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4923',
        any: [
          /PRINTFORMW 「嗯啊啊！…不…不要…疼！啊啊…哈…嗯啊…啊啊……嗯啊啊啊嗯！」/,
        ],
      }, // PRINTFORMW 「嗯啊啊！…不…不要…疼！啊啊…哈…嗯啊…啊啊……嗯啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4924',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然因为针刺而发出着悲鸣，但有时也会听见妖艳的声音………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然因为针刺而发出着悲鸣，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4925',
        any: [/CFLAG:TARGET:343 = 3/],
      }, // CFLAG:TARGET:343 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4928',
        any: [/PRINTFORMW 「啊啊！咦！饶、饶…饶了我吧…啊啊啊啊啊！」/],
      }, // PRINTFORMW 「啊啊！咦！饶、饶…饶了我吧…啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4929',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着被针刺着而发出着悲鸣………/],
      }, // PRINTFORMW %SAVESTR:TARGET%随着被针刺着而发出着悲鸣…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4930',
        any: [/CFLAG:TARGET:343 = 2/],
      }, // CFLAG:TARGET:343 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4945',
        any: [/PRINTFORMW 「呵呵呵…是想把眼睛看不见的我弄得乱七八糟的呢…♪」/],
      }, // PRINTFORMW 「呵呵呵…是想把眼睛看不见的我弄得乱七八糟的呢…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4948',
        any: [/PRINTFORMW 「啊啊…这样让我觉得很不安…请不要放开我的手啊………」/],
      }, // PRINTFORMW 「啊啊…这样让我觉得很不安…请不要放开我的手啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4951',
        any: [/PRINTFORMW 「眼罩…呢、不喜欢这样啊、不会就这样把我吊起来吧？」/],
      }, // PRINTFORMW 「眼罩…呢、不喜欢这样啊、不会就这样把我吊起来吧？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4953',
        any: [/CFLAG:TARGET:344 = 1/],
      }, // CFLAG:TARGET:344 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4959',
        any: [
          /PRINTFORMW 「啊啊…我…只是戴上眼罩而已…就这么…兴奋…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我…只是戴上眼罩而已…就这么…兴奋…啊啊啊啊%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4960',
        any: [/CFLAG:TARGET:344 = 9/],
      }, // CFLAG:TARGET:344 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4963',
        any: [/PRINTFORMW 「哈啊哈啊…让人心跳不已停不下来啊…♪」/],
      }, // PRINTFORMW 「哈啊哈啊…让人心跳不已停不下来啊…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4964',
        any: [/CFLAG:TARGET:344 = 8/],
      }, // CFLAG:TARGET:344 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4967',
        any: [/PRINTFORMW 「呵呵呵、要怎样让我高兴呢………？」/],
      }, // PRINTFORMW 「呵呵呵、要怎样让我高兴呢………？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4968',
        any: [/CFLAG:TARGET:344 = 7/],
      }, // CFLAG:TARGET:344 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4971',
        any: [/PRINTFORMW 「把眼睛看不见的我…弄得乱七八糟的吧…♪」/],
      }, // PRINTFORMW 「把眼睛看不见的我…弄得乱七八糟的吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4972',
        any: [/CFLAG:TARGET:344 = 6/],
      }, // CFLAG:TARGET:344 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4975',
        any: [
          /PRINTFORMW 「啊啊…什么都看不见就这样被你随意玩弄…让人停不下来啊………」/,
        ],
      }, // PRINTFORMW 「啊啊…什么都看不见就这样被你随意玩弄…让人停不下来啊……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4976',
        any: [/CFLAG:TARGET:344 = 5/],
      }, // CFLAG:TARGET:344 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4979',
        any: [/PRINTFORMW 「是的…我不管被魔王大人都可以………」/],
      }, // PRINTFORMW 「是的…我不管被魔王大人都可以………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4980',
        any: [/CFLAG:TARGET:344 = 4/],
      }, // CFLAG:TARGET:344 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4983',
        any: [/PRINTFORMW 「到底要对眼睛看不见的我…做什么事呢………」/],
      }, // PRINTFORMW 「到底要对眼睛看不见的我…做什么事呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4984',
        any: [/CFLAG:TARGET:344 = 3/],
      }, // CFLAG:TARGET:344 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4987',
        any: [/PRINTFORMW 「有点害怕………」/],
      }, // PRINTFORMW 「有点害怕………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4988',
        any: [/CFLAG:TARGET:344 = 2/],
      }, // CFLAG:TARGET:344 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4996',
        any: [/PRINTFORMW 「呵呵呵、已经非常兴奋了…♪」/],
      }, // PRINTFORMW 「呵呵呵、已经非常兴奋了…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '4997',
        any: [/CFLAG:380 = 3/],
      }, // CFLAG:380 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5000',
        any: [
          /PRINTFORMW 「啊啊…明明继续就那样眼睛被遮住着被魔王大人抱就好了………」/,
        ],
      }, // PRINTFORMW 「啊啊…明明继续就那样眼睛被遮住着被魔王大人抱就好了………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5001',
        any: [/CFLAG:380 = 2/],
      }, // CFLAG:380 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5004',
        any: [/PRINTFORMW 「呼………什、什么事都没有」/],
      }, // PRINTFORMW 「呼………什、什么事都没有」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5005',
        any: [/CFLAG:380 = 1/],
      }, // CFLAG:380 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5019',
        any: [
          /PRINTFORMW 「呵呵呵、就这样自由被夺取着侵犯…这么常见的固定的模式让人停不下来啊…♪」/,
        ],
      }, // PRINTFORMW 「呵呵呵、就这样自由被夺取着侵犯…这么常见的固定的模式让人
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5022',
        any: [
          /PRINTFORMW 「啊啊…这样让我感觉我变成壳魔王大人的东西…让人停不下来啊………」/,
        ],
      }, // PRINTFORMW 「啊啊…这样让我感觉我变成壳魔王大人的东西…让人停不下来啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5025',
        any: [/PRINTFORMW 「啊啊！因为会留下痕迹所以不要绑的太近啊！」/],
      }, // PRINTFORMW 「啊啊！因为会留下痕迹所以不要绑的太近啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5027',
        any: [/CFLAG:TARGET:345 = 1/],
      }, // CFLAG:TARGET:345 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5033',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊…我的绳化妆…请继续看吧…哈啊哈啊…这是为了被侵犯而化的妆…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊啊啊…我的绳化妆…请继续看吧…哈啊哈啊…这是为了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5034',
        any: [/PRINTFORMW %SAVESTR:TARGET%已经完全陷入发情状态了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%已经完全陷入发情状态了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5035',
        any: [/CFLAG:TARGET:345 = 9/],
      }, // CFLAG:TARGET:345 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5038',
        any: [
          /PRINTFORMW 「啊啊…被绑着…感觉子宫在抽动…啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…被绑着…感觉子宫在抽动…啊啊………%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5039',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被绳子紧紧地束缚着而发出着娇喘………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被绳子紧紧地束缚着而发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5040',
        any: [/CFLAG:TARGET:345 = 8/],
      }, // CFLAG:TARGET:345 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5043',
        any: [
          /PRINTFORMW 「啊啊…请激烈的侵犯被绑住的我吧…嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…请激烈的侵犯被绑住的我吧…嗯…啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5044',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被绳子绑住而发出灼热的吐息………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被绳子绑住而发出灼热的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5045',
        any: [/CFLAG:TARGET:345 = 7/],
      }, // CFLAG:TARGET:345 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5048',
        any: [
          /PRINTFORMW 「啊啊…只是这样被绑着而已我…就这么舒服了…啊啊…啊啊啊啊………」/,
        ],
      }, // PRINTFORMW 「啊啊…只是这样被绑着而已我…就这么舒服了…啊啊…啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5049',
        any: [/PRINTFORMW %SAVESTR:TARGET%已经完全陷入发情状态了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%已经完全陷入发情状态了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5050',
        any: [/CFLAG:TARGET:345 = 6/],
      }, // CFLAG:TARGET:345 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5053',
        any: [
          /PRINTFORMW 「是的…再紧点…绑的再紧点吧…啊…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…再紧点…绑的再紧点吧…啊…啊啊啊…%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5054',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被绳子紧紧地束缚着而发出着娇喘………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被绳子紧紧地束缚着而发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5055',
        any: [/CFLAG:TARGET:345 = 5/],
      }, // CFLAG:TARGET:345 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5058',
        any: [
          /PRINTFORMW 「啊啊啊…不止我的心，连身体也困住什么的…啊啊…啊啊啊啊………」/,
        ],
      }, // PRINTFORMW 「啊啊啊…不止我的心，连身体也困住什么的…啊啊…啊啊啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5059',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被绳子绑住而陶醉着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被绳子绑住而陶醉着……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5060',
        any: [/CFLAG:TARGET:345 = 4/],
      }, // CFLAG:TARGET:345 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5063',
        any: [/PRINTFORMW 「啊啊…嗯…哈啊哈啊…这么紧…啊…啊啊！」/],
      }, // PRINTFORMW 「啊啊…嗯…哈啊哈啊…这么紧…啊…啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5064',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被绳子穿过，束缚而喘息着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被绳子穿过，束缚而喘息
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5065',
        any: [/CFLAG:TARGET:345 = 3/],
      }, // CFLAG:TARGET:345 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5068',
        any: [/PRINTFORMW 「啊咕…已、已经够紧了…所以不要再紧…咦！」/],
      }, // PRINTFORMW 「啊咕…已、已经够紧了…所以不要再紧…咦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5069',
        any: [/PRINTFORMW %SAVESTR:TARGET%被紧紧地束缚着、漏出了痛苦的喘息………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被紧紧地束缚着、漏出了痛苦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5070',
        any: [/CFLAG:TARGET:345 = 2/],
      }, // CFLAG:TARGET:345 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5078',
        any: [/PRINTFORMW 「明明就那样被绑住被放置也很不错呢…呵呵呵」/],
      }, // PRINTFORMW 「明明就那样被绑住被放置也很不错呢…呵呵呵」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5079',
        any: [/PRINTFORMW %SAVESTR:TARGET%眯着眼睛陶醉的笑着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%眯着眼睛陶醉的笑着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5080',
        any: [/CFLAG:385 = 2/],
      }, // CFLAG:385 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5083',
        any: [/PRINTFORMW 「对我的束缚已经够了吗………？」/],
      }, // PRINTFORMW 「对我的束缚已经够了吗………？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5084',
        any: [/PRINTFORMW %SAVESTR:TARGET%好像还没玩够………/],
      }, // PRINTFORMW %SAVESTR:TARGET%好像还没玩够………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5085',
        any: [/CFLAG:385 = 2/],
      }, // CFLAG:385 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5088',
        any: [/PRINTFORMW 「啊啊…果然留下痕迹了啊………」/],
      }, // PRINTFORMW 「啊啊…果然留下痕迹了啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5089',
        any: [/PRINTFORMW %SAVESTR:TARGET%拼命的抚摸着被束缚的痕迹………/],
      }, // PRINTFORMW %SAVESTR:TARGET%拼命的抚摸着被束缚的痕迹…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5090',
        any: [/CFLAG:385 = 1/],
      }, // CFLAG:385 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5104',
        any: [/PRINTFORMW 「不想听见我的喘息声吗…？ 啊…嗯…嗯咕………」/],
      }, // PRINTFORMW 「不想听见我的喘息声吗…？ 啊…嗯…嗯咕………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5105',
        any: [/PRINTFORM %SAVESTR:TARGET%因为嘴被塞住而稍稍不满的/],
      }, // PRINTFORM %SAVESTR:TARGET%因为嘴被塞住而稍稍不满的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5107',
        any: [/PRINTW 动了起来………/],
      }, // PRINTW 动了起来………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5109',
        any: [/PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………/],
      }, // PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5113',
        any: [/PRINTFORMW 「啊啊…请更多的拘束我吧…嗯…嗯咕…嗯呼呼…♪」/],
      }, // PRINTFORMW 「啊啊…请更多的拘束我吧…嗯…嗯咕…嗯呼呼…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5114',
        any: [/PRINTFORM %SAVESTR:TARGET%好像期待着什么就那样/],
      }, // PRINTFORM %SAVESTR:TARGET%好像期待着什么就那样
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5116',
        any: [/PRINTW 动了起来………/],
      }, // PRINTW 动了起来………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5118',
        any: [/PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………/],
      }, // PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5122',
        any: [/PRINTFORMW 「不、不要啊…这个好像其他人也用过…嗯！嗯咕………！」/],
      }, // PRINTFORMW 「不、不要啊…这个好像其他人也用过…嗯！嗯咕………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5123',
        any: [/PRINTFORM %SAVESTR:TARGET%的嘴被口枷塞住，/],
      }, // PRINTFORM %SAVESTR:TARGET%的嘴被口枷塞住，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5125',
        any: [/PRINTW 左右摇着头………/],
      }, // PRINTW 左右摇着头………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5127',
        any: [/PRINTW 瞪着%SAVESTR:PLAYER%………/],
      }, // PRINTW 瞪着%SAVESTR:PLAYER%………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5130',
        any: [/CFLAG:TARGET:346 = 1/],
      }, // CFLAG:TARGET:346 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5136',
        any: [
          /PRINTFORMW 「哈啊哈啊…戴上口枷变的呼吸苦难…非常舒服啊…%UNICODE\(0x2661\) \*1% 嗯…嗯咕………」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…戴上口枷变的呼吸苦难…非常舒服啊…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5137',
        any: [/PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的表情………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5138',
        any: [/CFLAG:TARGET:346 = 9/],
      }, // CFLAG:TARGET:346 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5141',
        any: [/PRINTFORMW 「嗯啊…我说不定…喜欢上被戴上口枷了♪ 嗯…嗯咕………」/],
      }, // PRINTFORMW 「嗯啊…我说不定…喜欢上被戴上口枷了♪ 嗯…嗯咕………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5142',
        any: [/PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的表情………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5143',
        any: [/CFLAG:TARGET:346 = 8/],
      }, // CFLAG:TARGET:346 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5146',
        any: [/PRINTFORMW 「虽然我的喘息声音可能确实有点大…嗯咕………」/],
      }, // PRINTFORMW 「虽然我的喘息声音可能确实有点大…嗯咕………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5147',
        any: [/PRINTFORM %SAVESTR:TARGET%因为嘴被塞住而稍稍不满的/],
      }, // PRINTFORM %SAVESTR:TARGET%因为嘴被塞住而稍稍不满的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5149',
        any: [/PRINTW 动了起来………/],
      }, // PRINTW 动了起来………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5151',
        any: [/PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………/],
      }, // PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5153',
        any: [/CFLAG:TARGET:346 = 7/],
      }, // CFLAG:TARGET:346 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5156',
        any: [
          /PRINTFORMW 「连我说话…都需要魔王大人的许可呢…好棒…嗯…嗯咕………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「连我说话…都需要魔王大人的许可呢…好棒…嗯…嗯咕………%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5157',
        any: [/PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的表情………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5158',
        any: [/CFLAG:TARGET:346 = 6/],
      }, // CFLAG:TARGET:346 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5161',
        any: [/PRINTFORMW 「哈啊哈啊…喘不过气让人停不下来啊…嗯咕…嗯～♪」/],
      }, // PRINTFORMW 「哈啊哈啊…喘不过气让人停不下来啊…嗯咕…嗯～♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5162',
        any: [/PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的表情………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5163',
        any: [/CFLAG:TARGET:346 = 5/],
      }, // CFLAG:TARGET:346 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5166',
        any: [/PRINTFORMW 「啊啊…我的嘴被塞住了♪………嗯…嗯咕…♪」/],
      }, // PRINTFORMW 「啊啊…我的嘴被塞住了♪………嗯…嗯咕…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5167',
        any: [/PRINTFORM %SAVESTR:TARGET%好像期待着什么就那样/],
      }, // PRINTFORM %SAVESTR:TARGET%好像期待着什么就那样
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5169',
        any: [/PRINTW 动了起来………/],
      }, // PRINTW 动了起来………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5171',
        any: [/PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………/],
      }, // PRINTW 用眼睛凝视着%SAVESTR:PLAYER%………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5173',
        any: [/CFLAG:TARGET:346 = 4/],
      }, // CFLAG:TARGET:346 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5176',
        any: [/PRINTFORMW 「啊咕…嗯…嗯咕…嗯…额呼………」/],
      }, // PRINTFORMW 「啊咕…嗯…嗯咕…嗯…额呼………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5177',
        any: [/PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的表情………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一被带上口枷就露出了陶醉的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5178',
        any: [/CFLAG:TARGET:346 = 3/],
      }, // CFLAG:TARGET:346 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5181',
        any: [/PRINTFORMW 「啊咕…嗯…嗯咕…嗯…嗯嗯！」/],
      }, // PRINTFORMW 「啊咕…嗯…嗯咕…嗯…嗯嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5182',
        any: [/PRINTFORM %SAVESTR:TARGET%的嘴被口枷塞住/],
      }, // PRINTFORM %SAVESTR:TARGET%的嘴被口枷塞住
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5184',
        any: [/PRINTW 左右摇着头………/],
      }, // PRINTW 左右摇着头………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5186',
        any: [/PRINTW 瞪着%SAVESTR:PLAYER%………/],
      }, // PRINTW 瞪着%SAVESTR:PLAYER%………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5188',
        any: [/CFLAG:TARGET:346 = 2/],
      }, // CFLAG:TARGET:346 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5196',
        any: [/PRINTFORMW 「哈呼…啊、这么多口水…好害羞啊………」/],
      }, // PRINTFORMW 「哈呼…啊、这么多口水…好害羞啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5197',
        any: [/CFLAG:386 = 3/],
      }, // CFLAG:386 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5200',
        any: [/PRINTFORMW 「嗯啊啊…咳咳咳…对、对不起、我没关系的………」/],
      }, // PRINTFORMW 「嗯啊啊…咳咳咳…对、对不起、我没关系的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5201',
        any: [/CFLAG:386 = 2/],
      }, // CFLAG:386 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5204',
        any: [/PRINTFORMW 「咕哈…哈啊哈啊…再、再也不要这样了………」/],
      }, // PRINTFORMW 「咕哈…哈啊哈啊…再、再也不要这样了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5205',
        any: [/CFLAG:386 = 1/],
      }, // CFLAG:386 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5219',
        any: [
          /PRINTFORMW 「是、是的呢…肛门sex的话不做这种准备是不行的呢…啊咕…啊啊啊…肚子里…这样…啊啊啊啊啊～！」/,
        ],
      }, // PRINTFORMW 「是、是的呢…肛门sex的话不做这种准备是不行的呢…啊咕…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5220',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TARGET%的肛门里注入了接近一公升的灌肠液………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5223',
        any: [
          /PRINTFORMW 「啊啊啊啊啊…如果是魔王大人希望的话…我、不管多害羞的事…咦——…肚子…肚子里好烫啊！」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊啊…如果是魔王大人希望的话…我、不管多害羞的事…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5224',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%就那样在%SAVESTR:TARGET%的肛门里注入了接近一公升的灌肠液………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%就那样在%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5227',
        any: [
          /PRINTFORMW 「咦咦咦————！？不要！不要啊啊啊啊肚子里…肚子里好烫啊…快、快停下…不要啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「咦咦咦————！？不要！不要啊啊啊啊肚子里…肚子里好烫啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5228',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边压着嚎啕大哭着%SAVESTR:TARGET%，一边将将近一公升的灌肠液注入了肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边压着嚎啕大哭着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5230',
        any: [/CFLAG:TARGET:347 = 1/],
      }, // CFLAG:TARGET:347 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5236',
        any: [
          /PRINTFORMW 「啊啊…嗯…啊啊啊啊…继续…继续注入进来也没关系呦…想要肚子继续咕噜咕噜的叫呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯…啊啊啊啊…继续…继续注入进来也没关系呦…想要肚
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5237',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TARGET%所愿的那样把比平时更多的灌肠液注入了进去………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5238',
        any: [/CFLAG:347 = 7/],
      }, // CFLAG:347 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5241',
        any: [
          /PRINTFORMW 「哈啊哈啊…好的…侵犯我的肛门之前不好好的弄干净是不行的呢…唔噗…啊唔～！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…好的…侵犯我的肛门之前不好好的弄干净是不行的呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5242',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TARGET%的肛门里注入了接近一公升的灌肠液………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5243',
        any: [/CFLAG:347 = 6/],
      }, // CFLAG:347 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5246',
        any: [
          /PRINTFORMW 「啊哈…哈啊哈啊…我的肚子非常的舒服啊…啊啊啊啊…就这样拔掉塞子的话会变成什么样呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…哈啊哈啊…我的肚子非常的舒服啊…啊啊啊啊…就这样拔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5247',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门一边开心的抖动着一边把接近一公升的灌肠液全部吞了下去………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门一边开心的抖动着一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5248',
        any: [/CFLAG:347 = 5/],
      }, // CFLAG:347 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5251',
        any: [
          /PRINTFORMW 「哈咕…肚子…肚子好烫啊…啊咕…啊啊啊啊…灌进去这么多………」/,
        ],
      }, // PRINTFORMW 「哈咕…肚子…肚子好烫啊…啊咕…啊啊啊啊…灌进去这么多……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5252',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%就那样把接近一公升的灌肠液注入了%SAVESTR:TARGET%的肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%就那样把接近一公升的灌肠液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5253',
        any: [/CFLAG:347 = 4/],
      }, // CFLAG:347 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5256',
        any: [
          /PRINTFORMW 「啊…哈！哈啊…肚子里…满满的…啊啊啊…明明很痛苦…我为什么…这样…哈啊啊啊啊～！」/,
        ],
      }, // PRINTFORMW 「啊…哈！哈啊…肚子里…满满的…啊啊啊…明明很痛苦…我为什
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5257',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像觉醒了灌肠的快感，就那样老实的被注入着灌肠液………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像觉醒了灌肠的快感，就那
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5258',
        any: [/CFLAG:347 = 3/],
      }, // CFLAG:347 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5261',
        any: [
          /PRINTFORMW 「不、不要啊！强行…拉出来什么的…屈辱啊…咦咦咦咦咦咦咦！」/,
        ],
      }, // PRINTFORMW 「不、不要啊！强行…拉出来什么的…屈辱啊…咦咦咦咦咦咦咦！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5262',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边压着嚎啕大哭着%SAVESTR:TARGET%，一边将将近一公升的灌肠液注入了肛门………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%一边压着嚎啕大哭着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5263',
        any: [/CFLAG:347 = 2/],
      }, // CFLAG:347 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5277',
        any: [/PRINTFORMW 「呵呵呵、是休息吗魔王大人…？」/],
      }, // PRINTFORMW 「呵呵呵、是休息吗魔王大人…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5280',
        any: [/PRINTFORMW 「很少见呢…只是看什么的………」/],
      }, // PRINTFORMW 「很少见呢…只是看什么的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5283',
        any: [/PRINTFORMW 「你、你看什么呢………？」/],
      }, // PRINTFORMW 「你、你看什么呢………？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5285',
        any: [/CFLAG:356 = 1/],
      }, // CFLAG:356 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5290',
        any: [
          /PRINTFORMW 「啊啊！不要这样让我着急啊…明明我现在就想被魔王大人侵犯！」/,
        ],
      }, // PRINTFORMW 「啊啊！不要这样让我着急啊…明明我现在就想被魔王大人侵犯！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5291',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像忍耐不住了，像狗一样四肢着地在%SAVESTR:PLAYER%的脚边撒着娇………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像忍耐不住了，像狗一样四
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5292',
        any: [/CFLAG:356 = 6/],
      }, // CFLAG:356 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5295',
        any: [/PRINTFORMW 「只是看的话很无聊吧…？」/],
      }, // PRINTFORMW 「只是看的话很无聊吧…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5296',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用手臂托起自己的巨乳诱惑着%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用手臂托起自己的巨乳诱惑着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5297',
        any: [/CFLAG:356 = 5/],
      }, // CFLAG:356 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5300',
        any: [
          /PRINTFORMW 「啊啊…明明知道我现在正在祈求什么…好过分啊魔王大人………」/,
        ],
      }, // PRINTFORMW 「啊啊…明明知道我现在正在祈求什么…好过分啊魔王大人………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5301',
        any: [/PRINTFORMW %SAVESTR:TARGET%那湿润的瞳孔已经充满了欲请………/],
      }, // PRINTFORMW %SAVESTR:TARGET%那湿润的瞳孔已经充满了欲请
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5302',
        any: [/CFLAG:356 = 4/],
      }, // CFLAG:356 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5305',
        any: [
          /PRINTFORMW 「呼…是休息吗魔王大人？　但是这里连一杯茶都端不出来呢………」/,
        ],
      }, // PRINTFORMW 「呼…是休息吗魔王大人？　但是这里连一杯茶都端不出来呢……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5306',
        any: [/PRINTFORMW %SAVESTR:TARGET%微笑着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%微笑着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5307',
        any: [/CFLAG:356 = 3/],
      }, // CFLAG:356 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5310',
        any: [/PRINTFORMW 「你、你看什么呢………？」/],
      }, // PRINTFORMW 「你、你看什么呢………？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5311',
        any: [/PRINTFORMW %SAVESTR:TARGET%惊讶的看着这边………/],
      }, // PRINTFORMW %SAVESTR:TARGET%惊讶的看着这边………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5312',
        any: [/CFLAG:356 = 2/],
      }, // CFLAG:356 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5315',
        any: [/PRINTL/],
      }, // PRINTL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5318',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的秘裂里蠕虫笨拙的、毫不留情的在腔内搅动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的秘裂里蠕虫笨拙的、毫不留
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5321',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门里蠕虫笨拙的、毫不留情的蹂躏着肛门。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门里蠕虫笨拙的、毫不留
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5324',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门里插入着肛珠、肛门紧锁着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门里插入着肛珠、肛门紧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5327',
        any: [/PRINTFORMW %SAVESTR:TARGET%的阴蒂被按上的阴蒂夹不停地刺激着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴蒂被按上的阴蒂夹不停地
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5330',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头被按上的乳头夹不停地刺激着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头被按上的乳头夹不停地
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5333',
        any: [/PRINTFORML %SAVESTR:TARGET%的胸被装上的榨乳器榨取着母乳。/],
      }, // PRINTFORML %SAVESTR:TARGET%的胸被装上的榨乳器榨取着母
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5336',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被装上了飞机杯，现在也好像快要射精了似的抖动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴茎被装上了飞机杯，现在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5339',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了眼罩。/],
      }, // PRINTFORMW %SAVESTR:TARGET%被戴上了眼罩。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5342',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被绳子绑住，拘束着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的身体被绳子绑住，拘束着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5345',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肚子因为灌肠而发出咕噜咕噜的声音、如果把塞子拔出来的话，好像马上就会排出来似的。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肚子因为灌肠而发出咕噜咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5348',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门里插入着电极、括约肌随着轻微的电流流过而抖动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门里插入着电极、括约肌
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5351',
        any: [/PRINTFORMW 然后、这样的%SAVESTR:TARGET%的身姿被完全录了下来………/],
      }, // PRINTFORMW 然后、这样的%SAVESTR:TARGET%的身姿被完全录
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5364',
        any: [
          /PRINTFORMW %SAVESTR:MASTER%催促着%SAVESTR:TARGET%要给狂王发送的消息。/,
        ],
      }, // PRINTFORMW %SAVESTR:MASTER%催促着%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5367',
        any: [
          /PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪啊啊嗯魔王大人太激烈了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5368',
        any: [
          /PRINTFORMW 这么说着的%SAVESTR:TARGET%一边被%SAVESTR:PLAYER%侵犯着一边发出着给狂王的信息………/,
        ],
      }, // PRINTFORMW 这么说着的%SAVESTR:TARGET%一边被%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5371',
        any: [
          /PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪」/,
        ],
      }, // PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5372',
        any: [
          /PRINTFORMW 这么说着的%SAVESTR:TARGET%一边高兴地抚摸着腹部一边报告着妊娠………/,
        ],
      }, // PRINTFORMW 这么说着的%SAVESTR:TARGET%一边高兴地抚摸着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5375',
        any: [
          /PRINTFORMW 「啊啊嗯…妊娠sex最棒了啊啊啊啊啊嗯啊…马上就要生出来了%UNICODE\(0x2661\) \*1% 啊啊出产的影响也会送过去的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…妊娠sex最棒了啊啊啊啊啊嗯啊…马上就要生出来了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5376',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双手比划着V字被%SAVESTR:PLAYER%侵犯着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%双手比划着V字被%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5379',
        any: [
          /PRINTFORMW 「啊哈…我妊娠了呢…你看、已经长这么大了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…我妊娠了呢…你看、已经长这么大了呢…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5380',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边高兴地抚摸着鼓起的肚子一边报告着妊娠………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边高兴地抚摸着鼓起的肚子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5383',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样挺着肚子被%SAVESTR:PLAYER%侵犯的期间、一句话都没说………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样挺着肚子被%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5385',
        any: [
          /PRINTFORMW 被什么都不说的%SAVESTR:TARGET%惹恼了的%SAVESTR:PLAYER%举起了留言板。/,
        ],
      }, // PRINTFORMW 被什么都不说的%SAVESTR:TARGET%惹恼了的%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5386',
        any: [
          /PRINTFORMW ”我的肚子里有怪物的孩子%UNICODE\(0x2661\) \*1% 改日去狂王大人哪里玩吧%UNICODE\(0x2661\) \*1%”/,
        ],
      }, // PRINTFORMW ”我的肚子里有怪物的孩子%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5390',
        any: [/PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TARGET%进行自我介绍、/],
      }, // PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5392',
        any: [/PRINTFORM %SAVESTR:TARGET%把自己的本名和至今为止的性体验/],
      }, // PRINTFORM %SAVESTR:TARGET%把自己的本名和至今为止的性体
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5394',
        any: [/PRINTFORM 、甚至连自慰时妄想的内容都/],
      }, // PRINTFORM 、甚至连自慰时妄想的内容都
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5395',
        any: [/PRINTFORML 高兴地讲了出来……/],
      }, // PRINTFORML 高兴地讲了出来……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5396',
        any: [
          /PRINTFORML 一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……/,
        ],
      }, // PRINTFORML 一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5397',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5399',
        any: [/PRINTFORML %SAVESTR:TARGET%向着水晶球开始说出了下流的话/],
      }, // PRINTFORML %SAVESTR:TARGET%向着水晶球开始说出了下流的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5400',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5402',
        any: [/PRINTFORML %SAVESTR:TARGET%向着水晶球做了自我介绍/],
      }, // PRINTFORML %SAVESTR:TARGET%向着水晶球做了自我介绍
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5403',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5405',
        any: [/PRINTFORML %SAVESTR:TARGET%头扭向一边什么都不说/],
      }, // PRINTFORML %SAVESTR:TARGET%头扭向一边什么都不说
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5408',
        any: [/PRINTFORM 被%SAVESTR:PLAYER%/],
      }, // PRINTFORM 被%SAVESTR:PLAYER%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5410',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了爱的话语/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了爱的话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5412',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了下流的话语/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了下流的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5414',
        any: [/PRINTFORM 搭着话、%SAVESTR:TARGET%一边发出/],
      }, // PRINTFORM 搭着话、%SAVESTR:TARGET%一边发出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5416',
        any: [/PRINT 快乐的/],
      }, // PRINT 快乐的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5418',
        any: [/PRINT 痛苦的/],
      }, // PRINT 痛苦的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5420',
        any: [/PRINTFORML 的声音、一边拼死的回着话/],
      }, // PRINTFORML 的声音、一边拼死的回着话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5422',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%融洽的回着话/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%融洽的回着话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5424',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%断断续续的回着话/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%断断续续的回着话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5426',
        any: [/PRINTFORML 搭着话、但是%SAVESTR:TARGET%好像没有认真听…/],
      }, // PRINTFORML 搭着话、但是%SAVESTR:TARGET%好像没有认真听
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5429',
        any: [/CFLAG:357 = 1/],
      }, // CFLAG:357 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5435',
        any: [
          /PRINTFORMW %SAVESTR:MASTER%催促着%SAVESTR:TARGET%发出给狂王的信息。/,
        ],
      }, // PRINTFORMW %SAVESTR:MASTER%催促着%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5438',
        any: [
          /PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪啊啊嗯魔王大人太激烈了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5439',
        any: [
          /PRINTFORMW 这么说着的%SAVESTR:TARGET%一边被%SAVESTR:PLAYER%侵犯着一边发出着给狂王的信息………/,
        ],
      }, // PRINTFORMW 这么说着的%SAVESTR:TARGET%一边被%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5442',
        any: [
          /PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪」/,
        ],
      }, // PRINTFORMW 「我的肚子里有魔王大人的小孩了～请狂王大人祝福我～♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5443',
        any: [
          /PRINTFORMW 这么说着的%SAVESTR:TARGET%一边高兴地抚摸着腹部一边报告着妊娠………/,
        ],
      }, // PRINTFORMW 这么说着的%SAVESTR:TARGET%一边高兴地抚摸着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5446',
        any: [
          /PRINTFORMW 「啊啊嗯…妊娠sex最棒了啊啊啊啊啊嗯啊…马上就要生出来了%UNICODE\(0x2661\) \*1% 啊啊出产的影响也会送过去的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…妊娠sex最棒了啊啊啊啊啊嗯啊…马上就要生出来了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5447',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双手比划着V字被%SAVESTR:PLAYER%侵犯着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%双手比划着V字被%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5450',
        any: [
          /PRINTFORMW 「啊哈…我妊娠了呢…你看、已经长这么大了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈…我妊娠了呢…你看、已经长这么大了呢…%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5451',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边高兴地抚摸着鼓起的肚子一边报告着妊娠………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边高兴地抚摸着鼓起的肚子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5454',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样挺着肚子被%SAVESTR:PLAYER%侵犯的期间、一句话都没说………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样挺着肚子被%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5456',
        any: [
          /PRINTFORMW 被什么都不说的%SAVESTR:TARGET%惹恼了的%SAVESTR:PLAYER%举起了留言板。/,
        ],
      }, // PRINTFORMW 被什么都不说的%SAVESTR:TARGET%惹恼了的%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5457',
        any: [
          /PRINTFORMW “我的肚子里有怪物的孩子%UNICODE\(0x2661\) \*1% 改日去狂王大人哪里玩吧%UNICODE\(0x2661\) \*1%”/,
        ],
      }, // PRINTFORMW “我的肚子里有怪物的孩子%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5461',
        any: [/PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TARGET%进行自我介绍、/],
      }, // PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5463',
        any: [/PRINTFORML %SAVESTR:TARGET%一边扭着腰一边向水晶球说着爱的话语/],
      }, // PRINTFORML %SAVESTR:TARGET%一边扭着腰一边向水晶球说着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5464',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5466',
        any: [
          /PRINTFORML %SAVESTR:TARGET%一边扭着腰一边向水晶球喊出了下流的词语/,
        ],
      }, // PRINTFORML %SAVESTR:TARGET%一边扭着腰一边向水晶球喊出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5467',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5469',
        any: [/PRINTFORM %SAVESTR:TARGET%把自己的本名和至今为止的性体验/],
      }, // PRINTFORM %SAVESTR:TARGET%把自己的本名和至今为止的性体
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5471',
        any: [/PRINTFORM 、甚至连自慰时妄想的内容都/],
      }, // PRINTFORM 、甚至连自慰时妄想的内容都
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5472',
        any: [/PRINTFORML 高兴地讲了出来……/],
      }, // PRINTFORML 高兴地讲了出来……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5473',
        any: [
          /PRINTFORML 一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……/,
        ],
      }, // PRINTFORML 一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5474',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5476',
        any: [/PRINTFORML %SAVESTR:TARGET%向着水晶球开始说出了下流的话/],
      }, // PRINTFORML %SAVESTR:TARGET%向着水晶球开始说出了下流的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5477',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5479',
        any: [/PRINTFORML %SAVESTR:TARGET%向着水晶球做了自我介绍/],
      }, // PRINTFORML %SAVESTR:TARGET%向着水晶球做了自我介绍
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5480',
        any: [/TFLAG:32 \|= 2/],
      }, // TFLAG:32 |= 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5482',
        any: [/PRINTFORML %SAVESTR:TARGET%头扭向一边什么都不说/],
      }, // PRINTFORML %SAVESTR:TARGET%头扭向一边什么都不说
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5485',
        any: [/PRINTFORM 被%SAVESTR:PLAYER%/],
      }, // PRINTFORM 被%SAVESTR:PLAYER%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5487',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了爱的话语/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了爱的话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5489',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了下流的话语/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%摇着腰说出了下流的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5491',
        any: [/PRINTFORM 搭着话、%SAVESTR:TARGET%一边发出/],
      }, // PRINTFORM 搭着话、%SAVESTR:TARGET%一边发出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5493',
        any: [/PRINT 快乐的/],
      }, // PRINT 快乐的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5495',
        any: [/PRINT 痛苦的/],
      }, // PRINT 痛苦的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5497',
        any: [/PRINTFORML 声音、一边拼死的回着话/],
      }, // PRINTFORML 声音、一边拼死的回着话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5499',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%融洽的回着话/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%融洽的回着话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5501',
        any: [/PRINTFORML 搭着话、%SAVESTR:TARGET%断断续续的回着话/],
      }, // PRINTFORML 搭着话、%SAVESTR:TARGET%断断续续的回着话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5503',
        any: [/PRINTFORML 搭着话、但是%SAVESTR:TARGET%好像没有认真听…/],
      }, // PRINTFORML 搭着话、但是%SAVESTR:TARGET%好像没有认真听
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5518',
        any: [
          /PRINTFORMW 「魔王大人的肉棒太有精神了…我不用胸部和嘴一起奉仕可不行啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「魔王大人的肉棒太有精神了…我不用胸部和嘴一起奉仕可不行啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5519',
        any: [
          /PRINTFORMW 「嗯呼…好吃…真好吃啊…嗯啾…啾啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯呼…好吃…真好吃啊…嗯啾…啾啾…%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5520',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的温暖的舌头包裹着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的温暖的舌头包裹着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5523',
        any: [
          /PRINTFORMW 「是的…请享受我的巨乳和嘴的共同奉仕吧%UNICODE\(0x2661\) \*1% 啾…嗯啾啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…请享受我的巨乳和嘴的共同奉仕吧%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5524',
        any: [
          /PRINTFORMW 「哈呼…嗯…舒服吗？ 呵呵呵…什么时候射精都没关系哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈呼…嗯…舒服吗？ 呵呵呵…什么时候射精都没关系哦…%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5527',
        any: [
          /PRINTFORMW 「啊啊…啊唔…讨厌…感觉变得比平时更大了呢…嗯…啾…啊啊…好热…啾…嗯咕……」/,
        ],
      }, // PRINTFORMW 「啊啊…啊唔…讨厌…感觉变得比平时更大了呢…嗯…啾…啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5530',
        any: [/PRINTFORMW （变得…比狂王大人那时更兴奋什么的…我…）/],
      }, // PRINTFORMW （变得…比狂王大人那时更兴奋什么的…我…）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5535',
        any: [/PRINTFORMW 「这样…奉仕狂王大人以外的人什么的…嗯啾啾…嗯…啾………」/],
      }, // PRINTFORMW 「这样…奉仕狂王大人以外的人什么的…嗯啾啾…嗯…啾………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5537',
        any: [
          /PRINTFORMW 「呼啊…啊啊…我、我明白了、好好地奉仕就可以了吧？嗯…啾…啾啾………」/,
        ],
      }, // PRINTFORMW 「呼啊…啊啊…我、我明白了、好好地奉仕就可以了吧？嗯…啾…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5539',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样被命令着用胸部夹着%SAVESTR:PLAYER%的阴茎继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样被命令着用胸部夹着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5541',
        any: [/CFLAG:TARGET:360 = 1/],
      }, // CFLAG:TARGET:360 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5547',
        any: [
          /PRINTFORMW 「嗯咕…嗯呼…嗯啾%UNICODE\(0x2661\) \*1% 能用嘴和胸部品尝这么美味的肉棒什么的%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯呼…嗯啾%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5548',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用那对巨乳夹着%SAVESTR:PLAYER%的阴茎，不停地发出粗重的喘息。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%用那对巨乳夹着%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5549',
        any: [
          /PRINTFORMW 「啊啊…好幸福啊…我已经…只要有肉棒就就能活下去了…%UNICODE\(0x2661\) \*1% 嗯啾咕啾啾嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…好幸福啊…我已经…只要有肉棒就就能活下去了…%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5550',
        any: [/CFLAG:360 = 5/],
      }, // CFLAG:360 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5553',
        any: [
          /PRINTFORMW 「嗯啾…啾…啊哈…魔王大人…我自满的巨乳和嘴的同时奉仕怎么样…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾…啾…啊哈…魔王大人…我自满的巨乳和嘴的同时奉仕怎么
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5554',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边笑着一边不停地吻着%SAVESTR:PLAYER%的阴茎的尖端，再次开始了奉仕。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边笑着一边不停地吻着%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5555',
        any: [
          /PRINTFORMW 「啾啾…嗯啾…啊啊…在我的脸和胸部上慢慢的射出来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啾啾…嗯啾…啊啊…在我的脸和胸部上慢慢的射出来吧…%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5556',
        any: [/CFLAG:360 = 4/],
      }, // CFLAG:360 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5559',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯啾…啾…呵呵呵、一边被我的巨乳夹住一边被舔非常非常舒服吧？」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯啾…啾…呵呵呵、一边被我的巨乳夹住一边被舔非
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5562',
        any: [
          /PRINTFORMW 「呵呵呵、不用忍耐也没关系哦、这个奉仕连狂王大人也忍耐不了呢♪ 嗯啾啾…啾♪」/,
        ],
      }, // PRINTFORMW 「呵呵呵、不用忍耐也没关系哦、这个奉仕连狂王大人也忍耐不了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5564',
        any: [
          /PRINTFORMW 「呵呵呵、不忍用耐也没关系哦…快点射精出来露出可怜的表情吧♪啾…啾…啾咕♪」/,
        ],
      }, // PRINTFORMW 「呵呵呵、不忍用耐也没关系哦…快点射精出来露出可怜的表情吧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5566',
        any: [/CFLAG:360 = 3/],
      }, // CFLAG:360 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5569',
        any: [
          /PRINTFORMW 「哈啊哈啊…我、我知道了…一直奉仕到射精位置就可以了吧？」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我、我知道了…一直奉仕到射精位置就可以了吧？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5570',
        any: [
          /PRINTFORMW 「嗯…啊呜…啾…哈啊哈啊…在我的胸部里…这么热的…嗯啾…啾啾………」/,
        ],
      }, // PRINTFORMW 「嗯…啊呜…啾…哈啊哈啊…在我的胸部里…这么热的…嗯啾…啾
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5571',
        any: [/CFLAG:360 = 2/],
      }, // CFLAG:360 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5584',
        any: [
          /PRINTFORMW 「呵呵呵、能一边舔魔王大人的肉棒一边自慰什么的…真是幸福啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、能一边舔魔王大人的肉棒一边自慰什么的…真是幸福啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5585',
        any: [
          /PRINTFORMW 「啊呜…嗯啾啾…啾…啊啊…太兴奋了…哈啊哈啊…嗯啾…啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯啾啾…啾…啊啊…太兴奋了…哈啊哈啊…嗯啾…啾——
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5586',
        any: [
          /PRINTFORMW 随着%SAVESTR:TARGET%的自慰变得激烈，缠绕着%SAVESTR:PLAYER%的阴茎的舌头的动作也激烈了起来………/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:TARGET%的自慰变得激烈，缠绕着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5589',
        any: [
          /PRINTFORMW 「啊啊…能一边奉仕魔王大人一边让自己变得舒服什么的…很抱歉收下了这么棒的奖励…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…能一边奉仕魔王大人一边让自己变得舒服什么的…很抱歉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5590',
        any: [
          /PRINTFORMW 「哈咕…嗯…嗯呼%UNICODE\(0x2661\) \*1% 啾…啾…啊啊…真的好美味啊我…嗯啾啾咕%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈咕…嗯…嗯呼%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5591',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边自慰，一边因为奉仕%SAVESTR:PLAYER%而兴奋的不得了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边自慰，一边因为奉仕%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5594',
        any: [
          /PRINTFORMW 「我、我明白了…我…%SAVESTR:TARGET%要一边自慰一边…舔、舔魔王大人的肉棒…呼啊…」/,
        ],
      }, // PRINTFORMW 「我、我明白了…我…%SAVESTR:TARGET%要一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5595',
        any: [/PRINTFORMW 「嗯咕…啾…啾…嗯嗯啾啾………」/],
      }, // PRINTFORMW 「嗯咕…啾…啾…嗯嗯啾啾………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5596',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然害羞得脸上发红，但还是继续一边口交一边自慰着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然害羞得脸上发红，但还是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5599',
        any: [
          /PRINTFORMW 「呼嗯…一边口交一边舔什么的…咕、为什么这样…唔…啊啊…嗯…嗯…啾…呼呼…嗯！」/,
        ],
      }, // PRINTFORMW 「呼嗯…一边口交一边舔什么的…咕、为什么这样…唔…啊啊…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5600',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样听从%SAVESTR:PLAYER%的命令开始一边口交一边自慰………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样听从%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5602',
        any: [/CFLAG:TARGET:361 = 1/],
      }, // CFLAG:TARGET:361 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5609',
        any: [
          /PRINTFORMW 「嗯啊…用魔王大人的肉棒做配菜自慰什么的…嗯啾啾咕啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊…用魔王大人的肉棒做配菜自慰什么的…嗯啾啾咕啾…%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5610',
        any: [
          /PRINTFORMW 「啾啾%UNICODE\(0x2661\) \*1% 啊啊…变得更精神吧…嗯啾咕…啾啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啾啾%UNICODE(0x2661) *1% 啊啊…变得
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5611',
        any: [
          /PRINTFORMW 随着%SAVESTR:TARGET%的自慰变得激烈，缠绕着%SAVESTR:PLAYER%的阴茎的舌头的动作也激烈了起来………/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:TARGET%的自慰变得激烈，缠绕着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5613',
        any: [
          /PRINTFORMW 「呵呵呵、能一边舔魔王大人的肉棒一边自慰什么的…真是幸福啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、能一边舔魔王大人的肉棒一边自慰什么的…真是幸福啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5614',
        any: [
          /PRINTFORMW 「啊呜…嗯啾啾…啾…啊啊…太兴奋了…哈啊哈啊…嗯啾…啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯啾啾…啾…啊啊…太兴奋了…哈啊哈啊…嗯啾…啾——
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5615',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着%SAVESTR:TARGET%的自慰变得激烈，缠绕着%SAVESTR:PLAYER%的阴茎的舌头的动作也激烈了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%随着%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5617',
        any: [/CFLAG:361 = 5/],
      }, // CFLAG:361 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5621',
        any: [
          /PRINTFORMW 「哈啊…能一边舔魔王大人的一边变舒服什么的…啊啊嗯啾啾嗯…啾啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊…能一边舔魔王大人的一边变舒服什么的…啊啊嗯啾啾嗯…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5622',
        any: [
          /PRINTFORMW 「我就算一直这么舔下去也没关系啊…啾…嗯咕嗯呼…啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我就算一直这么舔下去也没关系啊…啾…嗯咕嗯呼…啾%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5623',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边自慰，一边因为奉仕%SAVESTR:PLAYER%而兴奋的不得了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边自慰，一边因为奉仕%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5625',
        any: [
          /PRINTFORMW 「啊啊…能一边奉仕魔王大人一边让自己变得舒服什么的…很抱歉收下了这么棒的奖励…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…能一边奉仕魔王大人一边让自己变得舒服什么的…很抱歉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5626',
        any: [
          /PRINTFORMW 「哈咕…嗯…嗯呼%UNICODE\(0x2661\) \*1% 啾…啾…啊啊…真的好美味啊我…嗯啾啾咕%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈咕…嗯…嗯呼%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5627',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边自慰，一边因为奉仕%SAVESTR:PLAYER%而兴奋的不得了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边自慰，一边因为奉仕%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5629',
        any: [/CFLAG:361 = 4/],
      }, // CFLAG:361 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5632',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯咕…啾…啾…是、是的…我会好好的自慰的…啊啊…啊呜呜呜咕…啾」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯咕…啾…啾…是、是的…我会好好的自慰的…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5633',
        any: [/PRINTFORMW 「嗯咕…啾…啾…嗯嗯唔啾啾………」/],
      }, // PRINTFORMW 「嗯咕…啾…啾…嗯嗯唔啾啾………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5634',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然害羞得脸上发红，但还是继续一边口交一边自慰着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然害羞得脸上发红，但还是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5635',
        any: [/CFLAG:361 = 3/],
      }, // CFLAG:361 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5638',
        any: [/PRINTFORMW 「啊呜…嗯…嗯…哈啊哈啊…为什么这样我…嗯啾…就………」/],
      }, // PRINTFORMW 「啊呜…嗯…嗯…哈啊哈啊…为什么这样我…嗯啾…就………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5639',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样听从%SAVESTR:PLAYER%的命令开始一边口交一边自慰………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样听从%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5640',
        any: [/CFLAG:361 = 2/],
      }, // CFLAG:361 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5654',
        any: [
          /PRINTFORMW 「啊呜…嗯咕…嗯呼%UNICODE\(0x2661\) \*1% 肉棒…肉棒…啊呜…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯咕…嗯呼%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5655',
        any: [
          /PRINTFORMW 在%SAVESTR:PLAYER%的命令下，%SAVESTR:TARGET%等了一下，然后就把阴茎含了下去。/,
        ],
      }, // PRINTFORMW 在%SAVESTR:PLAYER%的命令下，%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5656',
        any: [
          /PRINTFORMW 「嗯咕…嗯呼…一边吮吸一边撸…魔王大人的肉棒会是什么感觉呢…啊啊啊…嗯啾咕啾啾啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯呼…一边吮吸一边撸…魔王大人的肉棒会是什么感觉呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5659',
        any: [
          /PRINTFORMW 「啊啊啊…我可以用嘴奉仕这么精神的东西呢…谢谢您魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…我可以用嘴奉仕这么精神的东西呢…谢谢您魔王大人%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5660',
        any: [
          /PRINTFORMW 「啊呜…嗯啾啾咕%UNICODE\(0x2661\) \*1% 啾啾…啾啾…呼啊…好吃…真好吃啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯啾啾咕%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5661',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%激烈的撸着%SAVESTR:PLAYER%的阴茎的根部，吮吸着尖端………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%激烈的撸着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5664',
        any: [
          /PRINTFORMW 「你、你说只是我的手不够？……真、真没办法呢…嗯啊…啊呜…啾啾啾…啊唔…」/,
        ],
      }, // PRINTFORMW 「你、你说只是我的手不够？……真、真没办法呢…嗯啊…啊呜…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5665',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为羞耻心而连耳朵都发红，就那样继续着手搓口交………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为羞耻心而连耳朵都发红，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5668',
        any: [
          /PRINTFORMW 「一、一边撸一边舔…我、我明白了…这样就可以了吧？………嗯啊唔…啾…啾」/,
        ],
      }, // PRINTFORMW 「一、一边撸一边舔…我、我明白了…这样就可以了吧？………嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5669',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边厌恶的皱着眉毛一边手搓口交………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边厌恶的皱着眉毛一边手搓
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5671',
        any: [/CFLAG:TARGET:362 = 1/],
      }, // CFLAG:TARGET:362 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5678',
        any: [
          /PRINTFORMW 「啊呜…嗯咕…嗯呼%UNICODE\(0x2661\) \*1% 肉棒…肉棒…啊呜…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯咕…嗯呼%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5679',
        any: [
          /PRINTFORMW 在%SAVESTR:PLAYER%的命令下，%SAVESTR:TARGET%等了一下，然后就把阴茎含了下去。/,
        ],
      }, // PRINTFORMW 在%SAVESTR:PLAYER%的命令下，%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5680',
        any: [
          /PRINTFORMW 「嗯咕…嗯呼…一边吮吸一边撸…魔王大人的肉棒会是什么感觉呢…啊啊啊…嗯啾咕啾啾啾——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯呼…一边吮吸一边撸…魔王大人的肉棒会是什么感觉呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5682',
        any: [
          /PRINTFORMW 「嗯嗯咕呼…呵呵呵、我最喜欢奉仕魔王大人的肉棒了呦…啾啾唔啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯嗯咕呼…呵呵呵、我最喜欢奉仕魔王大人的肉棒了呦…啾啾唔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5683',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的双眼完全发情着湿润着、像%SAVESTR:PLAYER%谄媚着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的双眼完全发情着湿润着、像
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5684',
        any: [
          /PRINTFORMW 「嗯啊啊嗯…啾啾…请从这根肉帮里…嗯啾啾%UNICODE\(0x2661\) \*1% 射出奖励的精液吧…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊啊嗯…啾啾…请从这根肉帮里…嗯啾啾%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5686',
        any: [/CFLAG:362 = 5/],
      }, // CFLAG:362 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5690',
        any: [
          /PRINTFORMW 「啊啊啊…我可以用嘴奉仕这么精神的东西呢…谢谢您魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…我可以用嘴奉仕这么精神的东西呢…谢谢您魔王大人%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5691',
        any: [
          /PRINTFORMW 「啊呜…嗯啾啾咕%UNICODE\(0x2661\) \*1% 啾啾…啾啾…呼啊…好吃…真好吃啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯啾啾咕%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5692',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%激烈的撸着%SAVESTR:PLAYER%的阴茎的根部，吮吸着尖端………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%激烈的撸着%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5694',
        any: [
          /PRINTFORMW 「让我用嘴和手随意的奉仕什么的…啊啊啊啊%UNICODE\(0x2661\) \*1% 嗯啾咕啾啾啾咕%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「让我用嘴和手随意的奉仕什么的…啊啊啊啊%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5695',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全热衷与奉仕、就像是以恋人甚至恋人之上的人为对手一样。好像催促着着惊一样熟练的使用着嘴。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%完全热衷与奉仕、就像是以恋
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5696',
        any: [
          /PRINTFORMW 「嗯啾咕…啾啾…哈咕…啾啾啾%UNICODE\(0x2661\) \*1% 啊啊…请给我的嘴奖励吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾咕…啾啾…哈咕…啾啾啾%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5698',
        any: [/CFLAG:362 = 4/],
      }, // CFLAG:362 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5701',
        any: [
          /PRINTFORMW 「嗯啊…一边用手撸着一边…比平时更精神的…嗯啾…啾…啾…哈啊哈啊…啊呜…嗯啾」/,
        ],
      }, // PRINTFORMW 「嗯啊…一边用手撸着一边…比平时更精神的…嗯啾…啾…啾…哈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5702',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为羞耻心而连耳朵都发红，就那样继续着手搓口交………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为羞耻心而连耳朵都发红，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5703',
        any: [/CFLAG:362 = 3/],
      }, // CFLAG:362 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5706',
        any: [
          /PRINTFORMW 「哈啊哈啊…为什么会这么精神啊…嗯啾…啾…嗯唔…想射精的话就快点射出来吧…啾」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…为什么会这么精神啊…嗯啾…啾…嗯唔…想射精的话
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5707',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边厌恶的皱着眉毛一边手搓口交………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边厌恶的皱着眉毛一边手搓
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5708',
        any: [/CFLAG:362 = 2/],
      }, // CFLAG:362 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5723',
        any: [
          /PRINTFORMW 「哈咕嗯咕唔…肉棒真好吃啊…阿噗咕啾嗯啾啾噗啾噗%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈咕嗯咕唔…肉棒真好吃啊…阿噗咕啾嗯啾啾噗啾噗%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5724',
        any: [
          /PRINTFORMW 过于兴奋的%SAVESTR:TARGET%更激烈的吮吸着%SAVESTR:PLAYER%的阴茎，继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW 过于兴奋的%SAVESTR:TARGET%更激烈的吮吸着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5727',
        any: [
          /PRINTFORMW 「啊啊…嗯啾啾嗯啾咕啾啾…啊啊啊魔王大人的太好吃了…弄得我都发出这么下流的声音了…」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯啾啾嗯啾咕啾啾…啊啊啊魔王大人的太好吃了…弄得我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5728',
        any: [
          /PRINTFORMW 「但是含起来根本停不下来啊…请原谅我吧…嗯啾啾啾…啾咕啾唔啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「但是含起来根本停不下来啊…请原谅我吧…嗯啾啾啾…啾咕啾唔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5731',
        any: [
          /PRINTFORMW 「哈咕…啾咕啾啾…啾…哈啊哈啊…啊咕…为什么这么认真的含着…啊啊…嗯啾咕啾咕呼」/,
        ],
      }, // PRINTFORMW 「哈咕…啾咕啾啾…啾…哈啊哈啊…啊咕…为什么这么认真的含着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5732',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着好像放弃了似的什么的表情含着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着好像放弃了似的什么的表
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5735',
        any: [
          /PRINTFORMW 「嗯唔…啾咕啾啪啾咕…嗯咕…为什么我会这么认真的含着呢…嗯啾！」/,
        ],
      }, // PRINTFORMW 「嗯唔…啾咕啾啪啾咕…嗯咕…为什么我会这么认真的含着呢…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5736',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为注意到自己比想象中的更热心舔着而连耳朵都变红了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为注意到自己比想象中的更
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5738',
        any: [/CFLAG:TARGET:363 = 1/],
      }, // CFLAG:TARGET:363 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5744',
        any: [
          /PRINTFORMW 「哈咕嗯咕唔…肉棒真好吃啊…阿噗咕啾嗯啾啾噗啾噗%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈咕嗯咕唔…肉棒真好吃啊…阿噗咕啾嗯啾啾噗啾噗%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5745',
        any: [
          /PRINTFORMW 过于兴奋的%SAVESTR:TARGET%更激烈的吮吸着%SAVESTR:PLAYER%的阴茎，继续着口腔奉仕。/,
        ],
      }, // PRINTFORMW 过于兴奋的%SAVESTR:TARGET%更激烈的吮吸着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5746',
        any: [
          /PRINTFORMW 「嗯啾咕…嗯啾…嗯啾%UNICODE\(0x2661\) \*1% 哈啊…请让我继续舔吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾咕…嗯啾…嗯啾%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5747',
        any: [/CFLAG:363 = 5/],
      }, // CFLAG:363 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5750',
        any: [
          /PRINTFORMW 「啊啊…嗯啾咕啾啾啾嗯…我舔的时候会发出这么下流的声音呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯啾咕啾啾啾嗯…我舔的时候会发出这么下流的声音呢%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5751',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%暂时松开了嘴，舌头舔着嘴唇，湿润的嘴唇泛着妖艳的光。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%暂时松开了嘴，舌头舔着嘴唇
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5752',
        any: [
          /PRINTFORMW 「但是我…口交停不下来…请原谅我吧…嗯啾啾啾…啾啾啾咕啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「但是我…口交停不下来…请原谅我吧…嗯啾啾啾…啾啾啾咕啾啾
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5753',
        any: [/CFLAG:363 = 4/],
      }, // CFLAG:363 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5756',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯啾咕…啾咕啾啾啾咕…呼啊…我这样奉仕什么的…咕啾咕啾咕啾」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯啾咕…啾咕啾啾啾咕…呼啊…我这样奉仕什么的…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5757',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着好像放弃了似的什么的表情含着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着好像放弃了似的什么的表
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5758',
        any: [/CFLAG:363 = 3/],
      }, // CFLAG:363 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5761',
        any: [
          /PRINTFORMW 「嗯啾啾咕啾咕…嗯…还、还要继续舔啊…嗯啾啾啾咕…啾咕！」/,
        ],
      }, // PRINTFORMW 「嗯啾啾咕啾咕…嗯…还、还要继续舔啊…嗯啾啾啾咕…啾咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5762',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然羞耻的连耳朵都变红了，但还是发出着下流的声音继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然羞耻的连耳朵都变红了，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5763',
        any: [/CFLAG:363 = 2/],
      }, // CFLAG:363 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5777',
        any: [
          /PRINTFORMW 「嗯呼呼…我的口交和魔王大人的爱抚…来比比那边更好吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯呼呼…我的口交和魔王大人的爱抚…来比比那边更好吧%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5778',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%跨在%SAVESTR:PLAYER%的头上，摇着屁股，股间降了下来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%跨在%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5779',
        any: [
          /PRINTFORMW 「啊嗯…当然，我不会输的…嗯啾…啾啾咕…啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…当然，我不会输的…嗯啾…啾啾咕…啾啾%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5780',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很高兴的舔着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看起来很高兴的舔着%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5783',
        any: [
          /PRINTFORMW 「啊啊…！是、是的…请一边玩弄我一边变得舒服吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…！是、是的…请一边玩弄我一边变得舒服吧…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5784',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很害羞的跨坐在%SAVESTR:PLAYER%的头上，股间降了下来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看起来很害羞的跨坐在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5785',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%高潮而舔着秘裂。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5786',
        any: [
          /PRINTFORMW 「嗯啾…啾…啊啊…啊啊嗯…欺、欺负得太过分的话我这边就没法专心舔您了…嗯嗯啾…啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啾…啾…啊啊…啊啊嗯…欺、欺负得太过分的话我这边就没法
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5789',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯！我会好好做的！所以…啊啊…不要这样恶作剧啊！…咦！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯！我会好好做的！所以…啊啊…不要这样恶作剧啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5790',
        any: [
          /PRINTFORMW 「嗯咕…嗯啾…啾…呼啊…嗯呼…啊啊…要变的奇怪了…啊嗯…咕！」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯啾…啾…呼啊…嗯呼…啊啊…要变的奇怪了…啊嗯…咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5794',
        any: [/PRINTFORMW 「咕…不、不要太激烈啊…啊啊…嗯嗯咕…嗯…！」/],
      }, // PRINTFORMW 「咕…不、不要太激烈啊…啊啊…嗯嗯咕…嗯…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5795',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的秘裂被玩弄而装退颤抖着，继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的秘裂被玩弄而装退颤抖着，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5797',
        any: [
          /PRINTFORMW 「嗯呼哈…呵呵呵、这种程度我是不会有感觉的呦…嗯…啾…啾…嗯啾♪」/,
        ],
      }, // PRINTFORMW 「嗯呼哈…呵呵呵、这种程度我是不会有感觉的呦…嗯…啾…啾…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5798',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边被玩弄着秘裂一边漏出余裕的表情用舌头舔着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边被玩弄着秘裂一边漏出余
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5801',
        any: [/CFLAG:TARGET:364 = 1/],
      }, // CFLAG:TARGET:364 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5807',
        any: [
          /PRINTFORMW 「嗯呵呵…来吧来吧…来比比是我先高潮还是魔王大人先射精吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯呵呵…来吧来吧…来比比是我先高潮还是魔王大人先射精吧%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5808',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%跨在%SAVESTR:PLAYER%的头上，摇着屁股，股间降了下来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%跨在%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5809',
        any: [
          /PRINTFORMW 「来吧…在我脸上慢慢的吐出精液来吧…嗯啾…啾咕…啾…啾…嗯呼%UNICODE\(0x2661\) \*1%/,
        ],
      }, // PRINTFORMW 「来吧…在我脸上慢慢的吐出精液来吧…嗯啾…啾咕…啾…啾…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5810',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很高兴的把%SAVESTR:PLAYER%的肉棒含到喉咙深处奉仕着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看起来很高兴的把%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5811',
        any: [/CFLAG:364 = 5/],
      }, // CFLAG:364 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5814',
        any: [
          /PRINTFORMW 「啊嗯…请随您喜好的玩弄我吧、在这期间…啊嗯%UNICODE\(0x2661\) \*1%我来奉仕魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…请随您喜好的玩弄我吧、在这期间…啊嗯%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5815',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很害羞的跨坐在%SAVESTR:PLAYER%的头上，股间降了下来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看起来很害羞的跨坐在%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5816',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%高潮而舔着秘裂。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5817',
        any: [
          /PRINTFORMW 「嗯啾…就…啊啊…啊啊…好、好厉害啊…我也要加油了…嗯啾…啾…嗯啾…啊哈…啊%UNICODE\(0x2661\) \*1%/,
        ],
      }, // PRINTFORMW 「嗯啾…就…啊啊…啊啊…好、好厉害啊…我也要加油了…嗯啾…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5818',
        any: [/CFLAG:364 = 4/],
      }, // CFLAG:364 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5821',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯！我会好好做的！所以…啊啊…不要这样恶作剧啊！…咦！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯！我会好好做的！所以…啊啊…不要这样恶作剧啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5822',
        any: [
          /PRINTFORMW 「嗯咕…嗯啾…啾…呼哇…嗯呼…啊啊…啊嗯！咕！啊啊！…嗯咕啾啾啊…啾啾…」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯啾…啾…呼哇…嗯呼…啊啊…啊嗯！咕！啊啊！…嗯咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5823',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边被顽固的玩弄着秘裂一边拼命的口腔奉仕着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边被顽固的玩弄着秘裂一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5824',
        any: [/CFLAG:364 = 3/],
      }, // CFLAG:364 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5828',
        any: [/PRINTFORMW 「嗯咕！嗯呼…啾咕啾啾…哈啊哈啊…啊嗯…咦！」/],
      }, // PRINTFORMW 「嗯咕！嗯呼…啾咕啾啾…哈啊哈啊…啊嗯…咦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5829',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为无法忍耐%SAVESTR:PLAYER%对秘裂的刺激而松开了嘴、然后又因为催促似的玩弄而继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为无法忍耐%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5831',
        any: [
          /PRINTFORMW 「嗯呼哈…呵呵呵、这种程度我是不会有感觉的呦…嗯…啾…啾…嗯啾♪」/,
        ],
      }, // PRINTFORMW 「嗯呼哈…呵呵呵、这种程度我是不会有感觉的呦…嗯…啾…啾…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5832',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边被玩弄着秘裂一边漏出余裕的表情用舌头舔着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边被玩弄着秘裂一边漏出余
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5834',
        any: [/CFLAG:364 = 2/],
      }, // CFLAG:364 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5848',
        any: [
          /PRINTFORMW 「啊啊…肉棒肉棒…我最喜欢的肉棒%UNICODE\(0x2661\) \*1% …嗯啾咕啾啾…嗯咕啊呼…嗯嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…肉棒肉棒…我最喜欢的肉棒%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5849',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的%SAVESTR:PLAYER%的阴茎吞到了喉咙深处………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5852',
        any: [
          /PRINTFORMW 「啊啊…魔王大人…魔王大人…嗯啾咕啾啾嗯啾…嗯咕嗯咕嗯…嗯呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…魔王大人…魔王大人…嗯啾咕啾啾嗯啾…嗯咕嗯咕嗯…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5853',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的%SAVESTR:PLAYER%的阴茎吞到了喉咙深处………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5856',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊啊…说不定全都能插进来呢…嗯咕…嗯…嗯呼…嗯…嗯嗯～！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊啊…说不定全都能插进来呢…嗯咕…嗯…嗯呼…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5857',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的%SAVESTR:PLAYER%的阴茎吞到了喉咙深处………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5860',
        any: [
          /PRINTFORMW 「嗯咕呼…嗯咕…嗯啾…嗯呼…哈啊哈啊…没、没想到用喉咙深处…这、这么害羞………」/,
        ],
      }, // PRINTFORMW 「嗯咕呼…嗯咕…嗯啾…嗯呼…哈啊哈啊…没、没想到用喉咙深处
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5861',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为热心的口交连喉咙深处都用上了而害羞了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为热心的口交连喉咙深处都
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5863',
        any: [/CFLAG:TARGET:365 = 1/],
      }, // CFLAG:TARGET:365 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5869',
        any: [
          /PRINTFORMW 「啊啊…肉棒肉棒…我最喜欢的肉棒%UNICODE\(0x2661\) \*1% …嗯啾咕啾啾…嗯咕啊呼…嗯嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…肉棒肉棒…我最喜欢的肉棒%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5870',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的%SAVESTR:PLAYER%的阴茎吞到了喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5871',
        any: [
          /PRINTFORMW 「嗯咕…嗯呼…就这样在喉咙深处射出来的话我一定会幸福得高潮的啊%UNICODE\(0x2661\) \*1% 嗯嗯啾啾啾咕！」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯呼…就这样在喉咙深处射出来的话我一定会幸福得高潮
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5872',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发出下流的声音用喉咙深处奉仕着%SAVESTR:PLAYER%的阴茎………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%发出下流的声音用喉咙深处奉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5873',
        any: [/CFLAG:365 = 5/],
      }, // CFLAG:365 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5876',
        any: [
          /PRINTFORMW 「啊啊…魔王大人…魔王大人…嗯啾咕啾啾嗯啾…嗯咕嗯咕嗯…嗯呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…魔王大人…魔王大人…嗯啾咕啾啾嗯啾…嗯咕嗯咕嗯…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5877',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的%SAVESTR:PLAYER%的阴茎吞到了喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5878',
        any: [
          /PRINTFORMW 「我的喉咙全部…啊啊…用来奉仕什么的最棒了啊…啊啊…嗯啾…嗯咕嗯呼…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我的喉咙全部…啊啊…用来奉仕什么的最棒了啊…啊啊…嗯啾…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5879',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的嘴张开到极限，好像很幸福似的眯着眼继续着口腔奉仕………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的嘴张开到极限，好像很幸福
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5880',
        any: [/CFLAG:365 = 4/],
      }, // CFLAG:365 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5883',
        any: [/PRINTFORMW 「哈啊哈啊…啊啊…全部…全部收下了哦…嗯咕啊咕…嗯呜呜！/],
      }, // PRINTFORMW 「哈啊哈啊…啊啊…全部…全部收下了哦…嗯咕啊咕…嗯呜呜！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5884',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的%SAVESTR:PLAYER%的阴茎吞到了喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为口腔奉仕很兴奋似的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5885',
        any: [
          /PRINTFORMW 「嗯咕…嗯呼…嗯呼…嗯啾…这么精神，把我的喉咙全部…嗯咕…嗯咕嗯啾」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯呼…嗯呼…嗯啾…这么精神，把我的喉咙全部…嗯咕…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5886',
        any: [/CFLAG:365 = 3/],
      }, // CFLAG:365 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5889',
        any: [
          /PRINTFORMW 「哈呼…嗯咕…嗯啾…嗯咕呜呜！啊啊…连喉咙深处都能感觉到什么的………」/,
        ],
      }, // PRINTFORMW 「哈呼…嗯咕…嗯啾…嗯咕呜呜！啊啊…连喉咙深处都能感觉到什
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5890',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为热心的口交连喉咙深处都用上了而害羞了起来………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为热心的口交连喉咙深处都
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5891',
        any: [/CFLAG:365 = 2/],
      }, // CFLAG:365 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5905',
        any: [/PRINTFORMW 「唉、要侵犯嘴所以老实一点？…哦呵呵、好的、请♪」/],
      }, // PRINTFORMW 「唉、要侵犯嘴所以老实一点？…哦呵呵、好的、请♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5906',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住大大的张开嘴%SAVESTR:TARGET%的头，一口气把阴茎插进了喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住大大的张开嘴%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5907',
        any: [/PRINTFORMW 「嗯咕呼！？嗯呼…嗯…嗯咕嗯咕呼…嗯嗯嗯咕唔！」/],
      }, // PRINTFORMW 「嗯咕呼！？嗯呼…嗯…嗯咕嗯咕呼…嗯嗯嗯咕唔！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5908',
        any: [
          /PRINTFORMW 听着%SAVESTR:TARGET%那痛苦的声音，%SAVESTR:PLAYER%为了追求快乐而开始侵犯喉咙深处………/,
        ],
      }, // PRINTFORMW 听着%SAVESTR:TARGET%那痛苦的声音，%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5911',
        any: [/PRINTFORMW 「嗯咕！？嗯嗯嗯呼…嗯嗯嗯唔唔唔！！！」/],
      }, // PRINTFORMW 「嗯咕！？嗯嗯嗯呼…嗯嗯嗯唔唔唔！！！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5912',
        any: [
          /PRINTFORMW 侵犯着%SAVESTR:TARGET%直到喉咙深处的%SAVESTR:PLAYER%的大腿不停的撞过去，而%SAVESTR:PLAYER%无视那样继续把阴茎插进喉咙深处抽送着。/,
        ],
      }, // PRINTFORMW 侵犯着%SAVESTR:TARGET%直到喉咙深处的%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5913',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%翻着白眼，只是让牙齿不碰到阴茎就已经竭尽全力了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%翻着白眼，只是让牙齿不碰到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5916',
        any: [
          /PRINTFORMW 「嗯咕唔！？嗯咕嗯唔…嗯咕…咕哈…咳咳…这样不行啊…不要爱…嗯咕唔！？」/,
        ],
      }, // PRINTFORMW 「嗯咕唔！？嗯咕嗯唔…嗯咕…咕哈…咳咳…这样不行啊…不要爱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5917',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住抗议着的%SAVESTR:TARGET%的头、开始彻底的侵犯着她的喉咙深处………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%压住抗议着的%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5919',
        any: [/CFLAG:TARGET:381 = 1/],
      }, // CFLAG:TARGET:381 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5926',
        any: [/PRINTFORMW 「哦呵呵、又要侵犯嘴里…喉咙深处了呢………好的、请♪」/],
      }, // PRINTFORMW 「哦呵呵、又要侵犯嘴里…喉咙深处了呢………好的、请♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5927',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住大大的张开嘴%SAVESTR:TARGET%的头，一口气把阴茎插进了喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住大大的张开嘴%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5928',
        any: [/PRINTFORMW 「嗯咕呼！？嗯呼…嗯…嗯咕嗯咕呼…嗯嗯嗯咕唔！」/],
      }, // PRINTFORMW 「嗯咕呼！？嗯呼…嗯…嗯咕嗯咕呼…嗯嗯嗯咕唔！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5929',
        any: [
          /PRINTFORMW 听着%SAVESTR:TARGET%那痛苦的声音，%SAVESTR:PLAYER%为了追求快乐而开始侵犯喉咙深处………/,
        ],
      }, // PRINTFORMW 听着%SAVESTR:TARGET%那痛苦的声音，%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5931',
        any: [
          /PRINTFORMW 「嗯咕呼…嗯…嗯…嗯呼%UNICODE\(0x2661\) \*1% 嗯呼嗯嗯嗯唔%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕呼…嗯…嗯…嗯呼%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5932',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的喉咙深处被侵犯这发出了灼热的吐息，漏出了甜美的声音。看来是相当喜欢阴茎吧。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的喉咙深处被侵犯这发出了灼
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5933',
        any: [
          /PRINTFORMW 「嗯咕…继续侵犯我的喉咙…只用喉咙好像就快要去了…嗯咕%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕…继续侵犯我的喉咙…只用喉咙好像就快要去了…嗯咕%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5934',
        any: [
          /PRINTFORMW 不自觉的抚摸着说出这种可爱的话的%SAVESTR:TARGET%的头、%SAVESTR:PLAYER%继续动着腰………/,
        ],
      }, // PRINTFORMW 不自觉的抚摸着说出这种可爱的话的%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5936',
        any: [/CFLAG:381 = 5/],
      }, // CFLAG:381 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5939',
        any: [
          /PRINTFORMW 「好、好的…请彻底的侵犯我的喉咙深处吧…嗯啊啊…嗯咕…嗯…嗯…嗯呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「好、好的…请彻底的侵犯我的喉咙深处吧…嗯啊啊…嗯咕…嗯…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5941',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把阴茎插进%SAVESTR:TARGET%的喉咙深处，把喉咙塞到快要窒息的程度、然后再慢慢的拔出来。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%把阴茎插进%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5942',
        any: [
          /PRINTFORMW 「咳咳…咳咳…我、我的喉咙…继续侵犯吧…嗯唔！？嗯咕…嗯呼！」/,
        ],
      }, // PRINTFORMW 「咳咳…咳咳…我、我的喉咙…继续侵犯吧…嗯唔！？嗯咕…嗯呼
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5943',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%享受着喉咙被侵犯而翻着白眼的%SAVESTR:TARGET%的表情继续动着腰………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%享受着喉咙被侵犯而翻着白眼
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5945',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的头，像是再用耻骨殴打鼻子那样插入着喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5946',
        any: [
          /PRINTFORMW 「嗯咕嗯呼！嗯咕…嗯呜呜…嗯呼%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕嗯呼！嗯咕…嗯呜呜…嗯呼%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5947',
        any: [
          /PRINTFORMW 看着因为这样粗暴的行为而发出甜美的声音的%SAVESTR:TARGET%，%SAVESTR:PLAYER%苦笑着为了迎接绝顶而继续动着腰………/,
        ],
      }, // PRINTFORMW 看着因为这样粗暴的行为而发出甜美的声音的%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5949',
        any: [/CFLAG:381 = 4/],
      }, // CFLAG:381 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5953',
        any: [/PRINTFORMW 「嗯咕呼！嗯！嗯咕…呼呼…嗯咕！嗯咕啊咕～！」/],
      }, // PRINTFORMW 「嗯咕呼！嗯！嗯咕…呼呼…嗯咕！嗯咕啊咕～！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5954',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%时快时慢的侵犯着%SAVESTR:TARGET%的喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%时快时慢的侵犯着%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5955',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%翻着白眼，只是让牙齿不碰到阴茎就已经竭尽全力了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%翻着白眼，只是让牙齿不碰到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5957',
        any: [/PRINTFORMW 「嗯咕！？嗯嗯呼…嗯嗯嗯咕唔！！！」/],
      }, // PRINTFORMW 「嗯咕！？嗯嗯呼…嗯嗯嗯咕唔！！！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5958',
        any: [
          /PRINTFORMW 被侵犯者喉咙深处的%SAVESTR:TARGET%的大腿不停地抖动着，但%SAVESTR:PLAYER%无视那个像要把喉咙深处擦掉一层一样抽送着阴茎。/,
        ],
      }, // PRINTFORMW 被侵犯者喉咙深处的%SAVESTR:TARGET%的大腿不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5959',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%翻着白眼，只是让牙齿不碰到阴茎就已经竭尽全力了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%翻着白眼，只是让牙齿不碰到
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5961',
        any: [/CFLAG:381 = 3/],
      }, // CFLAG:381 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5964',
        any: [
          /PRINTFORMW 「嗯咕嗯啊…嗯咕…噗哈…咳咳…不、不要再这样了…嗯咕唔！？」/,
        ],
      }, // PRINTFORMW 「嗯咕嗯啊…嗯咕…噗哈…咳咳…不、不要再这样了…嗯咕唔！？
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5965',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住抗议的%SAVESTR:TARGET%的头、开始彻底侵犯她的喉咙深处。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%压住抗议的%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5966',
        any: [
          /PRINTFORMW 有时牙齿会碰到阴茎，原因大概是因为强行插进喉咙深处引起的呕吐吧。/,
        ],
      }, // PRINTFORMW 有时牙齿会碰到阴茎，原因大概是因为强行插进喉咙深处引起的呕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5967',
        any: [
          /PRINTFORMW 「呕…咳咳…咕呜呜咳…求、求你了…我可以普通的舔那之上就…嗯咕————！」/,
        ],
      }, // PRINTFORMW 「呕…咳咳…咕呜呜咳…求、求你了…我可以普通的舔那之上就…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5968',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%直到%SAVESTR:TARGET%变得更听话为止一直侵犯着她的喉咙深处………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%直到%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5969',
        any: [/CFLAG:381 = 2/],
      }, // CFLAG:381 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5986-5987',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5991',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为皮肤第一次被打孔而痛的不禁皱着眉。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为皮肤第一次被打孔而痛的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5994',
        any: [
          /PRINTFORMW 「啊啊…敏感度上升了啊…来吧拉一下试试吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…敏感度上升了啊…来吧拉一下试试吧…%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5995',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的完全勃起的两个乳头上的环闪闪发着光………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的完全勃起的两个乳头上的环
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5998',
        any: [/PRINTFORMW 「哦呵呵、在这里装上漂亮的宝石的话就能摄影了呢…♪」/],
      }, // PRINTFORMW 「哦呵呵、在这里装上漂亮的宝石的话就能摄影了呢…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '5999',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肚脐上附有宝石的环闪闪发着光………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肚脐上附有宝石的环闪闪发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6002',
        any: [/PRINTFORMW 「看见这个的话马上就能明白我是有多么淫乱了呢」/],
      }, // PRINTFORMW 「看见这个的话马上就能明白我是有多么淫乱了呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6003',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边左右拉开阴唇上的环一边笑着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边左右拉开阴唇上的环一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6008',
        any: [/PRINTFORMW 「哦呵呵…肉棒变得这么棒了呢…♪」/],
      }, // PRINTFORMW 「哦呵呵…肉棒变得这么棒了呢…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6009',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，撸着阴茎炫耀着上面的环………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，撸着阴茎炫耀着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6011',
        any: [
          /PRINTFORMW 「啊啊…这个阴蒂上的环是魔王大人的隶属之印呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…这个阴蒂上的环是魔王大人的隶属之印呢…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6012',
        any: [/PRINTFORMW %SAVESTR:TARGET%的阴蒂勃起着笑着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴蒂勃起着笑着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6016',
        any: [/PRINTFORMW 「这么样魔王大人…适合我吗？」/],
      }, // PRINTFORMW 「这么样魔王大人…适合我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6017',
        any: [/PRINTFORMW %SAVESTR:TARGET%下流的射出舌头、炫耀着舌尖上的环………/],
      }, // PRINTFORMW %SAVESTR:TARGET%下流的射出舌头、炫耀着舌尖
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6020',
        any: [/PRINTFORMW 「呐，不来和我接吻，确认一下环的情况吗？」/],
      }, // PRINTFORMW 「呐，不来和我接吻，确认一下环的情况吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6021',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，唇上的环闪闪发着光………/],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，唇上的环闪闪发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6024',
        any: [
          /PRINTFORMW 「如果知道我在这种地方穿上环，狂王大人会是什么表情呢？」/,
        ],
      }, // PRINTFORMW 「如果知道我在这种地方穿上环，狂王大人会是什么表情呢？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6025',
        any: [/PRINTFORMW %SAVESTR:TARGET%的鼻子上的环闪闪发着光………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的鼻子上的环闪闪发着光……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6029',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要的东西一样的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6035',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为皮肤第一次被打孔而痛的不禁皱着眉。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为皮肤第一次被打孔而痛的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6038',
        any: [
          /PRINTFORMW 「啊啊…用乳头收下环什么的…谢谢您魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…用乳头收下环什么的…谢谢您魔王大人%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6039',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的勃起的乳头上特大号的环闪闪发着光………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的勃起的乳头上特大号的环闪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6042',
        any: [/PRINTFORMW 「哦呵呵、这是时尚呢。这样王都好像也会流行起来呢♪」/],
      }, // PRINTFORMW 「哦呵呵、这是时尚呢。这样王都好像也会流行起来呢♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6043',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐周围确认这情况………/],
      }, // PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐周围确认这情况…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6046',
        any: [
          /PRINTFORMW 「啊啊…已经只能让魔王大人看了啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…已经只能让魔王大人看了啊………%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6047',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%害羞的挡住了股间，%SAVESTR:PLAYER%还是让她把手让开，欣赏着阴唇上的闪闪发光的环………/,
        ],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%害羞的挡住了股间，%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6052',
        any: [/PRINTFORMW 「啊啊…啊——…我的…我快要变成肉棒笨蛋了啊♪」/],
      }, // PRINTFORMW 「啊啊…啊——…我的…我快要变成肉棒笨蛋了啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6053',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兴奋的勃起着，摇动的肉棒上的环卡啦卡啦的响着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%兴奋的勃起着，摇动的肉棒上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6055',
        any: [
          /PRINTFORMW 「呵呵呵…这个环是我从属于魔王大人的证明啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵…这个环是我从属于魔王大人的证明啊…啊啊啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6056',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然满脸通红，但还是为了让环能清楚地被看见而分开了双腿………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然满脸通红，但还是为了让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6060',
        any: [/PRINTFORMW 「呐、真的在舌头上穿上环接吻就会更舒服吗…？」/],
      }, // PRINTFORMW 「呐、真的在舌头上穿上环接吻就会更舒服吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6061',
        any: [/PRINTFORMW %SAVESTR:TARGET%不安的看了看舌尖，祈求着接吻………/],
      }, // PRINTFORMW %SAVESTR:TARGET%不安的看了看舌尖，祈求着接
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6064',
        any: [
          /PRINTFORMW 「呵呵呵、合适吗？…嗯？很合适？你说很可爱？啊啊、好开心啊…」/,
        ],
      }, // PRINTFORMW 「呵呵呵、合适吗？…嗯？很合适？你说很可爱？啊啊、好开心啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6065',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为唇环被夸奖而陶醉着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为唇环被夸奖而陶醉着……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6068',
        any: [/PRINTFORMW 「呐、真的合适吗？如果很可笑的话就太过分了…」/],
      }, // PRINTFORMW 「呐、真的合适吗？如果很可笑的话就太过分了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6069',
        any: [/PRINTFORMW %SAVESTR:TARGET%不安的问着关于鼻环的感想………/],
      }, // PRINTFORMW %SAVESTR:TARGET%不安的问着关于鼻环的感想…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6073',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要的东西一样的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6079',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为皮肤第一次被打孔而痛的不禁皱着眉。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为皮肤第一次被打孔而痛的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6082',
        any: [
          /PRINTFORMW 「啊啊！在我美丽的肌肤上装这么下流的东西！…绝、绝饶不了你………！」/,
        ],
      }, // PRINTFORMW 「啊啊！在我美丽的肌肤上装这么下流的东西！…绝、绝饶不了你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6083',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的敏感的乳头因为被环穿过而完全勃起着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的敏感的乳头因为被环穿过而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6086',
        any: [/PRINTFORMW 「这个环是你选的？真是没品位啊………」/],
      }, // PRINTFORMW 「这个环是你选的？真是没品位啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6087',
        any: [/PRINTFORMW %SAVESTR:TARGET%对环的设计好像不满意………/],
      }, // PRINTFORMW %SAVESTR:TARGET%对环的设计好像不满意………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6090',
        any: [
          /PRINTFORMW 「快、快点去下来！带着这种东西的话…我没法回到狂王大人哪里去啊…！」/,
        ],
      }, // PRINTFORMW 「快、快点去下来！带着这种东西的话…我没法回到狂王大人哪里
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6091',
        any: [/PRINTFORMW %SAVESTR:TARGET%两边的阴唇都挂上了设计很下流的环。/],
      }, // PRINTFORMW %SAVESTR:TARGET%两边的阴唇都挂上了设计很下
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6092',
        any: [
          /PRINTFORMW 理所当然的进行了%SAVESTR:TARGET%的手无法取下来的加工………/,
        ],
      }, // PRINTFORMW 理所当然的进行了%SAVESTR:TARGET%的手无法取
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6097',
        any: [/PRINTFORMW 「不要…不…不…不要这样啊…！」/],
      }, // PRINTFORMW 「不要…不…不…不要这样啊…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6098',
        any: [
          /PRINTFORMW 被在强行长出来的阴茎上穿上环的%SAVESTR:TARGET%好像快要疯了…/,
        ],
      }, // PRINTFORMW 被在强行长出来的阴茎上穿上环的%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6100',
        any: [
          /PRINTFORMW 「呜咕…呜…咦…这种东西…这种东西一点都都不可能会舒服吧…唔唔」/,
        ],
      }, // PRINTFORMW 「呜咕…呜…咦…这种东西…这种东西一点都都不可能会舒服吧…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6101',
        any: [
          /PRINTFORMW 安装在%SAVESTR:TARGET%的阴蒂上的环给予着%SAVESTR:TARGET%强烈的刺激。/,
        ],
      }, // PRINTFORMW 安装在%SAVESTR:TARGET%的阴蒂上的环给予着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6102',
        any: [
          /PRINTFORMW 因为屈辱和疼痛而流出着大颗的眼泪的%SAVESTR:TARGET%瞪着%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW 因为屈辱和疼痛而流出着大颗的眼泪的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6106',
        any: [/PRINTFORMW 「不、不要…别碰我！呜咕…呜呜………！」/],
      }, // PRINTFORMW 「不、不要…别碰我！呜咕…呜呜………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6107',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了检查环的位置的愈合情况而拉出了%SAVESTR:TARGET%的舌头。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了检查环的位置的愈合情况
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6108',
        any: [/PRINTFORMW 「呜咕…咕…」/],
      }, // PRINTFORMW 「呜咕…咕…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6109',
        any: [
          /PRINTFORMW 看到因疼痛而哭泣着的%SAVESTR:TARGET%的舌头上的环好好的愈合着、%SAVESTR:PLAYER%放开了%SAVESTR:TARGET%………/,
        ],
      }, // PRINTFORMW 看到因疼痛而哭泣着的%SAVESTR:TARGET%的舌头
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6112',
        any: [
          /PRINTFORMW 「嗯、被装上这种东西的话吃什么东西都会变得很辛苦…能不能快点取下来？」/,
        ],
      }, // PRINTFORMW 「嗯、被装上这种东西的话吃什么东西都会变得很辛苦…能不能快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6113',
        any: [
          /PRINTFORMW 听到%SAVESTR:PLAYER%的、“这样的话就给你混入精液的流食吧？”的提案的%SAVESTR:TARGET%生气的连耳朵都红了………/,
        ],
      }, // PRINTFORMW 听到%SAVESTR:PLAYER%的、“这样的话就给你混
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6116',
        any: [
          /PRINTFORMW 「我见过异国之人戴过类似的装饰…如果不是被你装上就好了！」/,
        ],
      }, // PRINTFORMW 「我见过异国之人戴过类似的装饰…如果不是被你装上就好了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6117',
        any: [/PRINTFORMW %SAVESTR:TARGET%看来因为鼻环而稍微有点不高兴………/],
      }, // PRINTFORMW %SAVESTR:TARGET%看来因为鼻环而稍微有点不高
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6121',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了“可恶的东西终于取下来了”的安心的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了“可恶的东西终于取下
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6124',
        any: [/CFLAG:TARGET:348 = 1/],
      }, // CFLAG:TARGET:348 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6130',
        any: [/PRINTFORM/],
      }, // PRINTFORM
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6135',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肌肤被开洞的疼痛而不禁皱起了眉。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为肌肤被开洞的疼痛而不禁
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6138',
        any: [
          /PRINTFORMW 「啊啊…敏感度上升了啊…来吧拉一下试试吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…敏感度上升了啊…来吧拉一下试试吧…%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6139',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的完全勃起的两个乳头上的环闪闪发着光………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的完全勃起的两个乳头上的环
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6142',
        any: [/PRINTFORMW 「哦呵呵、在这里装上漂亮的宝石的话就能摄影了呢…♪」/],
      }, // PRINTFORMW 「哦呵呵、在这里装上漂亮的宝石的话就能摄影了呢…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6143',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肚脐上附有宝石的环闪闪发着光………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的肚脐上附有宝石的环闪闪发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6146',
        any: [/PRINTFORMW 「看见这个的话马上就能明白我是有多么淫乱了呢」/],
      }, // PRINTFORMW 「看见这个的话马上就能明白我是有多么淫乱了呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6147',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边左右拉开阴唇上的环一边笑着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%一边左右拉开阴唇上的环一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6152',
        any: [/PRINTFORMW 「哦呵呵…肉棒变得这么棒了呢…♪」/],
      }, // PRINTFORMW 「哦呵呵…肉棒变得这么棒了呢…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6153',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，撸着阴茎炫耀着上面的环………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，撸着阴茎炫耀着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6155',
        any: [
          /PRINTFORMW 「啊啊…这个阴蒂上的环是魔王大人的隶属之印呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…这个阴蒂上的环是魔王大人的隶属之印呢…%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6156',
        any: [/PRINTFORMW %SAVESTR:TARGET%的阴蒂勃起着笑着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的阴蒂勃起着笑着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6160',
        any: [/PRINTFORMW 「这么样魔王大人…适合我吗？」/],
      }, // PRINTFORMW 「这么样魔王大人…适合我吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6161',
        any: [/PRINTFORMW %SAVESTR:TARGET%下流的射出舌头、炫耀着舌尖上的环………/],
      }, // PRINTFORMW %SAVESTR:TARGET%下流的射出舌头、炫耀着舌尖
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6164',
        any: [/PRINTFORMW 「呐，不来和我接吻，确认一下环的情况吗？」/],
      }, // PRINTFORMW 「呐，不来和我接吻，确认一下环的情况吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6165',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，唇上的环闪闪发着光………/],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，唇上的环闪闪发
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6168',
        any: [
          /PRINTFORMW 「如果知道我在这种地方穿上环，狂王大人会是什么表情呢？」/,
        ],
      }, // PRINTFORMW 「如果知道我在这种地方穿上环，狂王大人会是什么表情呢？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6169',
        any: [/PRINTFORMW %SAVESTR:TARGET%的鼻子上的环闪闪发着光………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的鼻子上的环闪闪发着光……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6173',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要的东西一样的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6175',
        any: [/CFLAG:348 = 4/],
      }, // CFLAG:348 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6180',
        any: [/PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着肌肤被开洞的疼痛。/],
      }, // PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着肌肤被开洞的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6183',
        any: [
          /PRINTFORMW 「啊啊…用乳头收下环什么的…谢谢您魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…用乳头收下环什么的…谢谢您魔王大人%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6184',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的勃起的乳头上特大号的环闪闪发着光………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的勃起的乳头上特大号的环闪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6187',
        any: [/PRINTFORMW 「哦呵呵、这是时尚呢。这样王都好像也会流行起来呢♪」/],
      }, // PRINTFORMW 「哦呵呵、这是时尚呢。这样王都好像也会流行起来呢♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6188',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐周围确认这情况………/],
      }, // PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐周围确认这情况…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6191',
        any: [
          /PRINTFORMW 「啊啊…已经只能让魔王大人看了啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…已经只能让魔王大人看了啊………%UNICODE(0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6192',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%害羞的挡住了股间，%SAVESTR:PLAYER%还是让她把手让开，欣赏着阴唇上的闪闪发光的环………/,
        ],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%害羞的挡住了股间，%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6197',
        any: [/PRINTFORMW 「啊啊…啊——…我的…我快要变成肉棒笨蛋了啊♪」/],
      }, // PRINTFORMW 「啊啊…啊——…我的…我快要变成肉棒笨蛋了啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6198',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兴奋的勃起着，摇动的肉棒上的环卡啦卡啦的响着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%兴奋的勃起着，摇动的肉棒上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6200',
        any: [
          /PRINTFORMW 「呵呵呵…这个环是我从属于魔王大人的证明啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵…这个环是我从属于魔王大人的证明啊…啊啊啊%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6201',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然满脸通红，但还是为了让环能清楚地被看见而分开了双腿………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然满脸通红，但还是为了让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6205',
        any: [/PRINTFORMW 「呐、真的在舌头上穿上环接吻就会更舒服吗…？」/],
      }, // PRINTFORMW 「呐、真的在舌头上穿上环接吻就会更舒服吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6206',
        any: [/PRINTFORMW %SAVESTR:TARGET%不安的看了看舌尖，祈求着接吻………/],
      }, // PRINTFORMW %SAVESTR:TARGET%不安的看了看舌尖，祈求着接
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6209',
        any: [
          /PRINTFORMW 「呵呵呵、合适吗？…嗯？很合适？你说很可爱？啊啊、好开心啊…」/,
        ],
      }, // PRINTFORMW 「呵呵呵、合适吗？…嗯？很合适？你说很可爱？啊啊、好开心啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6210',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为唇环被夸奖而陶醉着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为唇环被夸奖而陶醉着……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6213',
        any: [/PRINTFORMW 「呐、真的合适吗？如果很可笑的话就太过分了…」/],
      }, // PRINTFORMW 「呐、真的合适吗？如果很可笑的话就太过分了…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6214',
        any: [/PRINTFORMW %SAVESTR:TARGET%不安的问着关于鼻环的感想………/],
      }, // PRINTFORMW %SAVESTR:TARGET%不安的问着关于鼻环的感想…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6218',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要的东西一样的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%露出了好像被夺走了什么重要
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6220',
        any: [/CFLAG:348 = 3/],
      }, // CFLAG:348 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6225',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肌肤被开洞的疼痛而不禁悲鸣了起来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为肌肤被开洞的疼痛而不禁
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6228',
        any: [
          /PRINTFORMW 「啊啊！在我美丽的肌肤上装这么下流的东西！…绝、绝饶不了你………！」/,
        ],
      }, // PRINTFORMW 「啊啊！在我美丽的肌肤上装这么下流的东西！…绝、绝饶不了你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6229',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的敏感的乳头因为被环穿过而完全勃起着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的敏感的乳头因为被环穿过而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6232',
        any: [/PRINTFORMW 「这个环是你选的？真是没品位啊………」/],
      }, // PRINTFORMW 「这个环是你选的？真是没品位啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6233',
        any: [/PRINTFORMW %SAVESTR:TARGET%对环的设计好像不满意………/],
      }, // PRINTFORMW %SAVESTR:TARGET%对环的设计好像不满意………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6236',
        any: [
          /PRINTFORMW 「快、快点去下来！带着这种东西的话…我没法回到狂王大人哪里去啊…！」/,
        ],
      }, // PRINTFORMW 「快、快点去下来！带着这种东西的话…我没法回到狂王大人哪里
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6237',
        any: [/PRINTFORMW %SAVESTR:TARGET%两边的阴唇都挂上了设计很下流的环。/],
      }, // PRINTFORMW %SAVESTR:TARGET%两边的阴唇都挂上了设计很下
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6238',
        any: [
          /PRINTFORMW 理所当然的进行了%SAVESTR:TARGET%的手无法取下来的加工………/,
        ],
      }, // PRINTFORMW 理所当然的进行了%SAVESTR:TARGET%的手无法取
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6243',
        any: [/PRINTFORMW 「不要…不…不…不要这样啊…！」/],
      }, // PRINTFORMW 「不要…不…不…不要这样啊…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6244',
        any: [
          /PRINTFORMW 被在强行长出来的阴茎上穿上环的%SAVESTR:TARGET%好像快要疯了…/,
        ],
      }, // PRINTFORMW 被在强行长出来的阴茎上穿上环的%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6246',
        any: [
          /PRINTFORMW 「呜咕…呜…咦…这种东西…这种东西一点都都不可能会舒服吧…唔唔」/,
        ],
      }, // PRINTFORMW 「呜咕…呜…咦…这种东西…这种东西一点都都不可能会舒服吧…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6247',
        any: [
          /PRINTFORMW 安装在%SAVESTR:TARGET%的阴蒂上的环给予着%SAVESTR:TARGET%强烈的刺激。/,
        ],
      }, // PRINTFORMW 安装在%SAVESTR:TARGET%的阴蒂上的环给予着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6248',
        any: [
          /PRINTFORMW 因为屈辱和疼痛而流出着大颗的眼泪的%SAVESTR:TARGET%瞪着%SAVESTR:PLAYER%………/,
        ],
      }, // PRINTFORMW 因为屈辱和疼痛而流出着大颗的眼泪的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6252',
        any: [/PRINTFORMW 「不、不要…别碰我！呜咕…呜呜………！」/],
      }, // PRINTFORMW 「不、不要…别碰我！呜咕…呜呜………！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6253',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了检查环的位置的愈合情况而拉出了%SAVESTR:TARGET%的舌头。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%为了检查环的位置的愈合情况
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6254',
        any: [/PRINTFORMW 「呜咕…咕…」/],
      }, // PRINTFORMW 「呜咕…咕…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6255',
        any: [
          /PRINTFORMW 看到因疼痛而哭泣着的%SAVESTR:TARGET%的舌头上的环好好的愈合着、%SAVESTR:PLAYER%放开了%SAVESTR:TARGET%………/,
        ],
      }, // PRINTFORMW 看到因疼痛而哭泣着的%SAVESTR:TARGET%的舌头
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6258',
        any: [
          /PRINTFORMW 「嗯、被装上这种东西的话吃什么东西都会变得很辛苦…能不能快点取下来？」/,
        ],
      }, // PRINTFORMW 「嗯、被装上这种东西的话吃什么东西都会变得很辛苦…能不能快
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6259',
        any: [
          /PRINTFORMW 听到%SAVESTR:PLAYER%的、“这样的话就给你混入精液的流食吧？”的提案的%SAVESTR:TARGET%生气的连耳朵都红了………/,
        ],
      }, // PRINTFORMW 听到%SAVESTR:PLAYER%的、“这样的话就给你混
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6262',
        any: [
          /PRINTFORMW 「我见过异国之人戴过类似的装饰…如果不是被你装上就好了！」/,
        ],
      }, // PRINTFORMW 「我见过异国之人戴过类似的装饰…如果不是被你装上就好了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6263',
        any: [/PRINTFORMW %SAVESTR:TARGET%看来因为鼻环而稍微有点不高兴………/],
      }, // PRINTFORMW %SAVESTR:TARGET%看来因为鼻环而稍微有点不高
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6267',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%%SAVESTR:TARGET%露出了“可恶的东西终于取下来了”的安心的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6269',
        any: [/CFLAG:348 = 2/],
      }, // CFLAG:348 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6281-7085',
        any: [/@DOG_KOJO_7/],
      }, // @DOG_KOJO_7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6291-6292',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6294-6296',
        any: [/CFLAG:301 = 1/],
      }, // CFLAG:301 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6296',
        any: [/CFLAG:301 = 1/],
      }, // CFLAG:301 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6302-6303',
        any: [/CFLAG:301 = 7/],
      }, // CFLAG:301 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6303',
        any: [/CFLAG:301 = 7/],
      }, // CFLAG:301 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6306-6307',
        any: [/CFLAG:301 = 6/],
      }, // CFLAG:301 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6307',
        any: [/CFLAG:301 = 6/],
      }, // CFLAG:301 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6310-6311',
        any: [/CFLAG:301 = 5/],
      }, // CFLAG:301 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6311',
        any: [/CFLAG:301 = 5/],
      }, // CFLAG:301 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6314-6315',
        any: [/CFLAG:301 = 4/],
      }, // CFLAG:301 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6315',
        any: [/CFLAG:301 = 4/],
      }, // CFLAG:301 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6318-6319',
        any: [/CFLAG:301 = 3/],
      }, // CFLAG:301 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6319',
        any: [/CFLAG:301 = 3/],
      }, // CFLAG:301 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6322-6323',
        any: [/CFLAG:301 = 2/],
      }, // CFLAG:301 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6323',
        any: [/CFLAG:301 = 2/],
      }, // CFLAG:301 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6337-6338',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6340-6342',
        any: [/CFLAG:302 = 1/],
      }, // CFLAG:302 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6342',
        any: [/CFLAG:302 = 1/],
      }, // CFLAG:302 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6348-6349',
        any: [/CFLAG:302 = 6/],
      }, // CFLAG:302 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6349',
        any: [/CFLAG:302 = 6/],
      }, // CFLAG:302 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6352-6353',
        any: [/CFLAG:302 = 5/],
      }, // CFLAG:302 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6353',
        any: [/CFLAG:302 = 5/],
      }, // CFLAG:302 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6356-6357',
        any: [/CFLAG:302 = 4/],
      }, // CFLAG:302 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6357',
        any: [/CFLAG:302 = 4/],
      }, // CFLAG:302 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6360-6361',
        any: [/CFLAG:302 = 3/],
      }, // CFLAG:302 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6361',
        any: [/CFLAG:302 = 3/],
      }, // CFLAG:302 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6364-6365',
        any: [/CFLAG:302 = 2/],
      }, // CFLAG:302 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6365',
        any: [/CFLAG:302 = 2/],
      }, // CFLAG:302 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6380-6381',
        any: [/;それ以外（爱無し）/],
      }, // ;それ以外（爱無し）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6383-6385',
        any: [/CFLAG:TARGET:306 = 1/],
      }, // CFLAG:TARGET:306 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6385',
        any: [/CFLAG:TARGET:306 = 1/],
      }, // CFLAG:TARGET:306 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6391-6392',
        any: [/CFLAG:306 = 6/],
      }, // CFLAG:306 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6392',
        any: [/CFLAG:306 = 6/],
      }, // CFLAG:306 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6395-6396',
        any: [/CFLAG:306 = 5/],
      }, // CFLAG:306 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6396',
        any: [/CFLAG:306 = 5/],
      }, // CFLAG:306 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6399-6400',
        any: [/CFLAG:306 = 4/],
      }, // CFLAG:306 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6400',
        any: [/CFLAG:306 = 4/],
      }, // CFLAG:306 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6403-6404',
        any: [/CFLAG:306 = 3/],
      }, // CFLAG:306 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6404',
        any: [/CFLAG:306 = 3/],
      }, // CFLAG:306 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6407-6408',
        any: [/CFLAG:306 = 2/],
      }, // CFLAG:306 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6408',
        any: [/CFLAG:306 = 2/],
      }, // CFLAG:306 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6422-6423',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6425-6426',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6428-6429',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6431-6433',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6433',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6439-6440',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6442-6443',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6445-6446',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6448-6450',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6450',
        any: [/CFLAG:307 = 1/],
      }, // CFLAG:307 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6456-6457',
        any: [/CFLAG:307 = 6/],
      }, // CFLAG:307 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6457',
        any: [/CFLAG:307 = 6/],
      }, // CFLAG:307 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6460-6461',
        any: [/CFLAG:307 = 5/],
      }, // CFLAG:307 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6461',
        any: [/CFLAG:307 = 5/],
      }, // CFLAG:307 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6464-6465',
        any: [/CFLAG:307 = 4/],
      }, // CFLAG:307 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6465',
        any: [/CFLAG:307 = 4/],
      }, // CFLAG:307 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6468-6469',
        any: [/CFLAG:307 = 3/],
      }, // CFLAG:307 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6469',
        any: [/CFLAG:307 = 3/],
      }, // CFLAG:307 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6472-6473',
        any: [/CFLAG:307 = 2/],
      }, // CFLAG:307 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6473',
        any: [/CFLAG:307 = 2/],
      }, // CFLAG:307 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6487-6488',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6490-6491',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6493-6494',
        any: [/;それ以外（爱無し）/],
      }, // ;それ以外（爱無し）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6496-6498',
        any: [/CFLAG:TARGET:310 = 1/],
      }, // CFLAG:TARGET:310 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6498',
        any: [/CFLAG:TARGET:310 = 1/],
      }, // CFLAG:TARGET:310 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6504-6505',
        any: [/CFLAG:310 = 6/],
      }, // CFLAG:310 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6505',
        any: [/CFLAG:310 = 6/],
      }, // CFLAG:310 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6508-6509',
        any: [/CFLAG:310 = 5/],
      }, // CFLAG:310 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6509',
        any: [/CFLAG:310 = 5/],
      }, // CFLAG:310 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6512-6513',
        any: [/CFLAG:310 = 4/],
      }, // CFLAG:310 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6513',
        any: [/CFLAG:310 = 4/],
      }, // CFLAG:310 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6516-6517',
        any: [/CFLAG:310 = 3/],
      }, // CFLAG:310 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6517',
        any: [/CFLAG:310 = 3/],
      }, // CFLAG:310 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6520-6521',
        any: [/CFLAG:310 = 2/],
      }, // CFLAG:310 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6521',
        any: [/CFLAG:310 = 2/],
      }, // CFLAG:310 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6537-6538',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6540-6541',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6543-6545',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6547-6549',
        any: [/;非处女/],
      }, // ;非处女
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6553-6554',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6556-6557',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6559-6560',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6562-6565',
        any: [/CFLAG:322 = 1/],
      }, // CFLAG:322 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6565',
        any: [/CFLAG:322 = 1/],
      }, // CFLAG:322 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6574-6578',
        any: [/CFLAG:322 = 7/],
      }, // CFLAG:322 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6576-6578',
        any: [/CFLAG:322 = 7/],
      }, // CFLAG:322 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6578',
        any: [/CFLAG:322 = 7/],
      }, // CFLAG:322 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6584-6588',
        any: [/CFLAG:322 = 6/],
      }, // CFLAG:322 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6586-6588',
        any: [/CFLAG:322 = 6/],
      }, // CFLAG:322 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6588',
        any: [/CFLAG:322 = 6/],
      }, // CFLAG:322 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6594-6598',
        any: [/CFLAG:322 = 5/],
      }, // CFLAG:322 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6596-6598',
        any: [/CFLAG:322 = 5/],
      }, // CFLAG:322 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6598',
        any: [/CFLAG:322 = 5/],
      }, // CFLAG:322 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6601-6602',
        any: [/CFLAG:322 = 4/],
      }, // CFLAG:322 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6602',
        any: [/CFLAG:322 = 4/],
      }, // CFLAG:322 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6605-6606',
        any: [/CFLAG:322 = 3/],
      }, // CFLAG:322 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6606',
        any: [/CFLAG:322 = 3/],
      }, // CFLAG:322 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6609-6611',
        any: [/CFLAG:322 = 2/],
      }, // CFLAG:322 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6611',
        any: [/CFLAG:322 = 2/],
      }, // CFLAG:322 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6625-6626',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6628-6629',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6631-6632',
        any: [/;それ以外（爱無し）/],
      }, // ;それ以外（爱無し）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6634-6636',
        any: [/CFLAG:TARGET:328 = 1/],
      }, // CFLAG:TARGET:328 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6636',
        any: [/CFLAG:TARGET:328 = 1/],
      }, // CFLAG:TARGET:328 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6643-6647',
        any: [/CFLAG:328 = 7/],
      }, // CFLAG:328 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6645-6647',
        any: [/CFLAG:328 = 7/],
      }, // CFLAG:328 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6647',
        any: [/CFLAG:328 = 7/],
      }, // CFLAG:328 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6651-6655',
        any: [/CFLAG:328 = 6/],
      }, // CFLAG:328 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6653-6655',
        any: [/CFLAG:328 = 6/],
      }, // CFLAG:328 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6655',
        any: [/CFLAG:328 = 6/],
      }, // CFLAG:328 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6659-6663',
        any: [/CFLAG:328 = 5/],
      }, // CFLAG:328 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6661-6663',
        any: [/CFLAG:328 = 5/],
      }, // CFLAG:328 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6663',
        any: [/CFLAG:328 = 5/],
      }, // CFLAG:328 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6666-6667',
        any: [/CFLAG:328 = 4/],
      }, // CFLAG:328 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6667',
        any: [/CFLAG:328 = 4/],
      }, // CFLAG:328 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6670-6671',
        any: [/CFLAG:328 = 3/],
      }, // CFLAG:328 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6671',
        any: [/CFLAG:328 = 3/],
      }, // CFLAG:328 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6674-6675',
        any: [/CFLAG:328 = 2/],
      }, // CFLAG:328 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6675',
        any: [/CFLAG:328 = 2/],
      }, // CFLAG:328 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6689-6690',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6692-6693',
        any: [/;侍奉精神Lv3以上/],
      }, // ;侍奉精神Lv3以上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6695-6696',
        any: [/;それ以外（侍奉精神Lv3未満）/],
      }, // ;それ以外（侍奉精神Lv3未満）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6698-6700',
        any: [/CFLAG:TARGET:331 = 1/],
      }, // CFLAG:TARGET:331 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6700',
        any: [/CFLAG:TARGET:331 = 1/],
      }, // CFLAG:TARGET:331 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6707-6711',
        any: [/CFLAG:331 = 7/],
      }, // CFLAG:331 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6709-6711',
        any: [/CFLAG:331 = 7/],
      }, // CFLAG:331 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6711',
        any: [/CFLAG:331 = 7/],
      }, // CFLAG:331 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6715-6719',
        any: [/CFLAG:331 = 6/],
      }, // CFLAG:331 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6717-6719',
        any: [/CFLAG:331 = 6/],
      }, // CFLAG:331 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6719',
        any: [/CFLAG:331 = 6/],
      }, // CFLAG:331 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6723-6727',
        any: [/CFLAG:331 = 5/],
      }, // CFLAG:331 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6725-6727',
        any: [/CFLAG:331 = 5/],
      }, // CFLAG:331 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6727',
        any: [/CFLAG:331 = 5/],
      }, // CFLAG:331 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6730-6731',
        any: [/CFLAG:331 = 4/],
      }, // CFLAG:331 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6731',
        any: [/CFLAG:331 = 4/],
      }, // CFLAG:331 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6734-6735',
        any: [/CFLAG:331 = 3/],
      }, // CFLAG:331 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6735',
        any: [/CFLAG:331 = 3/],
      }, // CFLAG:331 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6738-6739',
        any: [/CFLAG:331 = 2/],
      }, // CFLAG:331 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6739',
        any: [/CFLAG:331 = 2/],
      }, // CFLAG:331 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6753-6754',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6756-6757',
        any: [/;侍奉精神Lv3以上/],
      }, // ;侍奉精神Lv3以上
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6759-6760',
        any: [/;それ以外（侍奉精神Lv3未満）/],
      }, // ;それ以外（侍奉精神Lv3未満）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6762-6764',
        any: [/CFLAG:TARGET:332 = 1/],
      }, // CFLAG:TARGET:332 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6764',
        any: [/CFLAG:TARGET:332 = 1/],
      }, // CFLAG:TARGET:332 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6770-6771',
        any: [/CFLAG:332 = 7/],
      }, // CFLAG:332 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6771',
        any: [/CFLAG:332 = 7/],
      }, // CFLAG:332 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6774-6775',
        any: [/CFLAG:332 = 6/],
      }, // CFLAG:332 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6775',
        any: [/CFLAG:332 = 6/],
      }, // CFLAG:332 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6778-6779',
        any: [/CFLAG:332 = 5/],
      }, // CFLAG:332 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6779',
        any: [/CFLAG:332 = 5/],
      }, // CFLAG:332 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6782',
        any: [/PRINTFORML/],
      }, // PRINTFORML
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6783-6784',
        any: [/CFLAG:332 = 4/],
      }, // CFLAG:332 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6784',
        any: [/CFLAG:332 = 4/],
      }, // CFLAG:332 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6787',
        any: [/PRINTFORML/],
      }, // PRINTFORML
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6788-6789',
        any: [/CFLAG:332 = 3/],
      }, // CFLAG:332 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6789',
        any: [/CFLAG:332 = 3/],
      }, // CFLAG:332 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6792-6793',
        any: [/CFLAG:332 = 2/],
      }, // CFLAG:332 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6793',
        any: [/CFLAG:332 = 2/],
      }, // CFLAG:332 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6809-6810',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6812-6813',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6815-6816',
        any: [/;それ以外（爱無し）/],
      }, // ;それ以外（爱無し）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6818-6820',
        any: [/;非处女/],
      }, // ;非处女
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6824-6825',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6827-6828',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6830-6831',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6833-6836',
        any: [/CFLAG:TARGET:335 = 1/],
      }, // CFLAG:TARGET:335 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6836',
        any: [/CFLAG:TARGET:335 = 1/],
      }, // CFLAG:TARGET:335 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6845-6849',
        any: [/CFLAG:335 = 7/],
      }, // CFLAG:335 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6847-6849',
        any: [/CFLAG:335 = 7/],
      }, // CFLAG:335 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6849',
        any: [/CFLAG:335 = 7/],
      }, // CFLAG:335 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6857-6861',
        any: [/CFLAG:335 = 6/],
      }, // CFLAG:335 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6859-6861',
        any: [/CFLAG:335 = 6/],
      }, // CFLAG:335 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6861',
        any: [/CFLAG:335 = 6/],
      }, // CFLAG:335 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6865',
        any: [/PRINTFORML/],
      }, // PRINTFORML
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6869-6873',
        any: [/CFLAG:335 = 5/],
      }, // CFLAG:335 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6871-6873',
        any: [/CFLAG:335 = 5/],
      }, // CFLAG:335 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6873',
        any: [/CFLAG:335 = 5/],
      }, // CFLAG:335 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6881-6885',
        any: [/CFLAG:335 = 4/],
      }, // CFLAG:335 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6883-6885',
        any: [/CFLAG:335 = 4/],
      }, // CFLAG:335 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6885',
        any: [/CFLAG:335 = 4/],
      }, // CFLAG:335 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6888',
        any: [/PRINTFORML/],
      }, // PRINTFORML
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6889-6890',
        any: [/CFLAG:335 = 3/],
      }, // CFLAG:335 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6890',
        any: [/CFLAG:335 = 3/],
      }, // CFLAG:335 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6893-6894',
        any: [/CFLAG:335 = 2/],
      }, // CFLAG:335 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6894',
        any: [/CFLAG:335 = 2/],
      }, // CFLAG:335 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6908-6909',
        any: [/;それ以外（侍奉精神Lv3未満）/],
      }, // ;それ以外（侍奉精神Lv3未満）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6911-6913',
        any: [/CFLAG:TARGET:338 = 1/],
      }, // CFLAG:TARGET:338 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6913',
        any: [/CFLAG:TARGET:338 = 1/],
      }, // CFLAG:TARGET:338 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6919-6920',
        any: [/CFLAG:338 = 6/],
      }, // CFLAG:338 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6920',
        any: [/CFLAG:338 = 6/],
      }, // CFLAG:338 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6923-6924',
        any: [/CFLAG:338 = 5/],
      }, // CFLAG:338 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6924',
        any: [/CFLAG:338 = 5/],
      }, // CFLAG:338 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6927',
        any: [/PRINTFORML/],
      }, // PRINTFORML
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6928',
        any: [/CFLAG:338 = 4/],
      }, // CFLAG:338 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6931-6932',
        any: [/CFLAG:338 = 3/],
      }, // CFLAG:338 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6932',
        any: [/CFLAG:338 = 3/],
      }, // CFLAG:338 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6935-6936',
        any: [/CFLAG:338 = 2/],
      }, // CFLAG:338 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6936',
        any: [/CFLAG:338 = 2/],
      }, // CFLAG:338 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6951-6952',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6954-6955',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6957-6958',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6960-6962',
        any: [/CFLAG:TARGET:344 = 1/],
      }, // CFLAG:TARGET:344 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6962',
        any: [/CFLAG:TARGET:344 = 1/],
      }, // CFLAG:TARGET:344 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6968-6969',
        any: [/CFLAG:TARGET:344 = 10/],
      }, // CFLAG:TARGET:344 = 10
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6969',
        any: [/CFLAG:TARGET:344 = 10/],
      }, // CFLAG:TARGET:344 = 10
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6972-6973',
        any: [/CFLAG:TARGET:344 = 9/],
      }, // CFLAG:TARGET:344 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6973',
        any: [/CFLAG:TARGET:344 = 9/],
      }, // CFLAG:TARGET:344 = 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6976-6977',
        any: [/CFLAG:TARGET:344 = 8/],
      }, // CFLAG:TARGET:344 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6977',
        any: [/CFLAG:TARGET:344 = 8/],
      }, // CFLAG:TARGET:344 = 8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6980-6981',
        any: [/CFLAG:TARGET:344 = 7/],
      }, // CFLAG:TARGET:344 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6981',
        any: [/CFLAG:TARGET:344 = 7/],
      }, // CFLAG:TARGET:344 = 7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6984-6985',
        any: [/CFLAG:TARGET:344 = 6/],
      }, // CFLAG:TARGET:344 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6985',
        any: [/CFLAG:TARGET:344 = 6/],
      }, // CFLAG:TARGET:344 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6988-6989',
        any: [/CFLAG:TARGET:344 = 5/],
      }, // CFLAG:TARGET:344 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6989',
        any: [/CFLAG:TARGET:344 = 5/],
      }, // CFLAG:TARGET:344 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6992-6993',
        any: [/CFLAG:TARGET:344 = 4/],
      }, // CFLAG:TARGET:344 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6993',
        any: [/CFLAG:TARGET:344 = 4/],
      }, // CFLAG:TARGET:344 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6996-6997',
        any: [/CFLAG:TARGET:344 = 3/],
      }, // CFLAG:TARGET:344 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6997',
        any: [/CFLAG:TARGET:344 = 3/],
      }, // CFLAG:TARGET:344 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7000-7001',
        any: [/CFLAG:TARGET:344 = 2/],
      }, // CFLAG:TARGET:344 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7001',
        any: [/CFLAG:TARGET:344 = 2/],
      }, // CFLAG:TARGET:344 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7009-7010',
        any: [/CFLAG:444 = 4/],
      }, // CFLAG:444 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7010',
        any: [/CFLAG:444 = 4/],
      }, // CFLAG:444 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7013-7014',
        any: [/CFLAG:444 = 3/],
      }, // CFLAG:444 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7014',
        any: [/CFLAG:444 = 3/],
      }, // CFLAG:444 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7017-7018',
        any: [/CFLAG:444 = 2/],
      }, // CFLAG:444 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7018',
        any: [/CFLAG:444 = 2/],
      }, // CFLAG:444 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7021-7022',
        any: [/CFLAG:444 = 1/],
      }, // CFLAG:444 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7022',
        any: [/CFLAG:444 = 1/],
      }, // CFLAG:444 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7038-7039',
        any: [/;淫乱/],
      }, // ;淫乱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7041-7042',
        any: [/;爱慕/],
      }, // ;爱慕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7044-7045',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7047-7050',
        any: [/CFLAG:357 = 1/],
      }, // CFLAG:357 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7050',
        any: [/CFLAG:357 = 1/],
      }, // CFLAG:357 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7058-7059',
        any: [/CFLAG:357 = 5/],
      }, // CFLAG:357 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7059',
        any: [/CFLAG:357 = 5/],
      }, // CFLAG:357 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7062-7063',
        any: [/CFLAG:357 = 4/],
      }, // CFLAG:357 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7063',
        any: [/CFLAG:357 = 4/],
      }, // CFLAG:357 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7066-7067',
        any: [/CFLAG:357 = 3/],
      }, // CFLAG:357 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7067',
        any: [/CFLAG:357 = 3/],
      }, // CFLAG:357 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7070-7071',
        any: [/CFLAG:357 = 2/],
      }, // CFLAG:357 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7071',
        any: [/CFLAG:357 = 2/],
      }, // CFLAG:357 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7086-7462',
        any: [/@KOJO_MESSAGE_PALAMCNG_7/],
      }, // @KOJO_MESSAGE_PALAMCNG_7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7088-7104',
        any: [/;口塞着用時には口上をスキップする/],
      }, // ;口塞着用時には口上をスキップする
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7115',
        any: [/P = PALAM:3 \+ UP:3/],
      }, // P = PALAM:3 + UP:3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7121',
        any: [/PRINTFORMW 「啊啊…润滑液粘糊糊的啊…」/],
      }, // PRINTFORMW 「啊啊…润滑液粘糊糊的啊…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7122',
        any: [/PRINTFORMW ―――初次润滑超过LV2。/],
      }, // PRINTFORMW ―――初次润滑超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7125',
        any: [/PRINTFORMW 「啊啊…我因为魔王大人都变得这么湿了♪」/],
      }, // PRINTFORMW 「啊啊…我因为魔王大人都变得这么湿了♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7126',
        any: [/PRINTFORMW ―――初初次润滑超过LV2。/],
      }, // PRINTFORMW ―――初初次润滑超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7132',
        any: [
          /PRINTFORMW 「呀哦！？唔、因为润滑液而发出这种程度的声音什么的…真不爽…」/,
        ],
      }, // PRINTFORMW 「呀哦！？唔、因为润滑液而发出这种程度的声音什么的…真不爽
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7133',
        any: [/PRINTFORMW ―――初次润滑超过LV2。/],
      }, // PRINTFORMW ―――初次润滑超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7136',
        any: [/PRINTFORMW 「啊…啊啊…不、不要再摸了…不要了…啊啊嗯！」/],
      }, // PRINTFORMW 「啊…啊啊…不、不要再摸了…不要了…啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7137',
        any: [/PRINTFORMW ―――初次润滑超过LV2。/],
      }, // PRINTFORMW ―――初次润滑超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7140',
        any: [/CFLAG:TARGET:221 = 1/],
      }, // CFLAG:TARGET:221 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7146',
        any: [/P = PALAM:5 \+ UP:5/],
      }, // P = PALAM:5 + UP:5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7152',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是因为媚药生效了，脸颊变得越来越红。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是因为媚药生效了，脸颊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7153',
        any: [
          /PRINTFORMW 「即使不用这种东西我也是魔王大人的东西啊…连我的感觉都…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「即使不用这种东西我也是魔王大人的东西啊…连我的感觉都…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7154',
        any: [/PRINTFORMW ―――初次欲情超过LV2。/],
      }, // PRINTFORMW ―――初次欲情超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7157',
        any: [/PRINTFORMW 「我、我…想要…魔、魔王大人…啊啊啊………」/],
      }, // PRINTFORMW 「我、我…想要…魔、魔王大人…啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7158',
        any: [/PRINTFORMW ―――初次欲情超过LV2。/],
      }, // PRINTFORMW ―――初次欲情超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7164',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是因为媚药生效了，脸颊变得越来越红。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是因为媚药生效了，脸颊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7165',
        any: [
          /PRINTFORMW 「卑、卑鄙的家伙…不用药就不能支配女人什么的…这算什么魔王大人啊………！」/,
        ],
      }, // PRINTFORMW 「卑、卑鄙的家伙…不用药就不能支配女人什么的…这算什么魔王
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7166',
        any: [/PRINTFORMW ―――初次欲情超过LV2。/],
      }, // PRINTFORMW ―――初次欲情超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7169',
        any: [/PRINTFORMW 「啊啊…不、不要碰我…再继续的话我…嗯！」/],
      }, // PRINTFORMW 「啊啊…不、不要碰我…再继续的话我…嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7170',
        any: [/PRINTFORMW ―――初次欲情超过LV2。/],
      }, // PRINTFORMW ―――初次欲情超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7173',
        any: [/CFLAG:222 = 1/],
      }, // CFLAG:222 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7179',
        any: [/P = PALAM:8 \+ UP:8/],
      }, // P = PALAM:8 + UP:8
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7183',
        any: [
          /PRINTFORMW 「啊啊我明明是这样的爱着魔王大人…让我这么害羞什么的………」/,
        ],
      }, // PRINTFORMW 「啊啊我明明是这样的爱着魔王大人…让我这么害羞什么的………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7184',
        any: [/PRINTFORMW ―――初次耻情超过LV2。/],
      }, // PRINTFORMW ―――初次耻情超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7187',
        any: [/PRINTFORMW 「不要啊…更害羞的事的话…啊啊啊！」/],
      }, // PRINTFORMW 「不要啊…更害羞的事的话…啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7188',
        any: [/PRINTFORMW ―――初次耻情超过LV2。/],
      }, // PRINTFORMW ―――初次耻情超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7190',
        any: [/CFLAG:223 = 1/],
      }, // CFLAG:223 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7196',
        any: [/P = PALAM:10 \+ UP:10/],
      }, // P = PALAM:10 + UP:10
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7200',
        any: [/PRINTFORMW 「才、才没有觉得害怕呢…来、来吧、继续调教吧…」/],
      }, // PRINTFORMW 「才、才没有觉得害怕呢…来、来吧、继续调教吧…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7201',
        any: [/PRINTFORMW 虽然这么说着，%SAVESTR:TARGET%还是微微的颤抖着………/],
      }, // PRINTFORMW 虽然这么说着，%SAVESTR:TARGET%还是微微的颤
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7202',
        any: [/PRINTFORMW ―――初次恐怖超过LV2。/],
      }, // PRINTFORMW ―――初次恐怖超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7205',
        any: [/PRINTFORMW 「这种事、没、没什么的…！」/],
      }, // PRINTFORMW 「这种事、没、没什么的…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7206',
        any: [/PRINTFORMW 虽然这么说着，%SAVESTR:TARGET%还是微微的颤抖着………/],
      }, // PRINTFORMW 虽然这么说着，%SAVESTR:TARGET%还是微微的颤
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7207',
        any: [/PRINTFORMW ―――初次恐怖超过LV2。/],
      }, // PRINTFORMW ―――初次恐怖超过LV2。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7209',
        any: [/CFLAG:224 = 1/],
      }, // CFLAG:224 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7218',
        any: [/PRINTFORMW 「啊啊…我、我…已经…不行…啊咕呜呜咦！」/],
      }, // PRINTFORMW 「啊啊…我、我…已经…不行…啊咕呜呜咦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7219',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为对阴蒂断断续续的刺激而快要高潮了、扭着腰娇喘着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为对阴蒂断断续续的刺
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7220',
        any: [
          /PRINTFORMW 「啊啊——%UNICODE\(0x2661\) \*1% 我、我…被魔王大人…去了…去了去了去了了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊——%UNICODE(0x2661) *1% 我、我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7221',
        any: [/PRINTFORMW %SAVESTR:TARGET%的脸泛着红晕发出着绝顶的声音。/],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸泛着红晕发出着绝顶的声
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7222',
        any: [/PRINTFORMW 「啊…哈啊哈啊…我…去了呢………」/],
      }, // PRINTFORMW 「啊…哈啊哈啊…我…去了呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7223',
        any: [/PRINTFORMW %SAVESTR:TARGET%还颤抖着腰沉浸在决定的余韵里。/],
      }, // PRINTFORMW %SAVESTR:TARGET%还颤抖着腰沉浸在决定的余韵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7224',
        any: [
          /PRINTFORMW 「啊啊啊…我…第一次在魔王大人面前阴蒂高潮了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…我…第一次在魔王大人面前阴蒂高潮了啊…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7227',
        any: [/PRINTFORMW 「不要！不要再继续了！不要…啊啊啊…咕、咦————！」/],
      }, // PRINTFORMW 「不要！不要再继续了！不要…啊啊啊…咕、咦————！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7228',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为对阴蒂断断续续的刺激而快要高潮了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像因为对阴蒂断断续续的刺
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7229',
        any: [
          /PRINTFORMW 双脚下流的张开嘴里发出不像样的声音的那个身姿就像是贫民窟的妓女一样。/,
        ],
      }, // PRINTFORMW 双脚下流的张开嘴里发出不像样的声音的那个身姿就像是贫民窟的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7230',
        any: [
          /PRINTFORMW 「咦啊咦…不、不要再继续了饶了我吧…啊啊啊！咦…呀…呀…咕！」/,
        ],
      }, // PRINTFORMW 「咦啊咦…不、不要再继续了饶了我吧…啊啊啊！咦…呀…呀…咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7231',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%咬着嘴唇忍耐高潮，%SAVESTR:PLAYER%发出了最后一击。/,
        ],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%咬着嘴唇忍耐高潮，%S
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7232',
        any: [
          /PRINTFORMW 「嗯啊啊！啊啊啊啊咦…呼哇啊啊啊去了去了去了去了————！」/,
        ],
      }, // PRINTFORMW 「嗯啊啊！啊啊啊啊咦…呼哇啊啊啊去了去了去了去了————！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7233',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发出震耳欲聋的绝顶的叫声，%SAVESTR:PLAYER%微笑着为了让她冷静下来而温柔着抚摸着她。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%发出震耳欲聋的绝顶的叫声，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7236',
        any: [/PRINTFORMW 「我、我…这么简单就去了什么的…啊咦…咦」/],
      }, // PRINTFORMW 「我、我…这么简单就去了什么的…啊咦…咦」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7237',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为绝顶的余韵而直不起腰，全身瘫软着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为绝顶的余韵而直不起腰，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7239',
        any: [/PRINTFORMW 「被你这么烂的技术弄高潮什么的…屈辱啊………」/],
      }, // PRINTFORMW 「被你这么烂的技术弄高潮什么的…屈辱啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7240',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%骂着人、但是在绝顶的余韵里直不起腰满脸通红的姿态下这么说让人觉得很滑稽………/,
        ],
      }, // PRINTFORMW 虽然%SAVESTR:TARGET%骂着人、但是在绝顶的余
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7243',
        any: [/CFLAG:225 = 1/],
      }, // CFLAG:225 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7252',
        any: [
          /PRINTFORMW 「啊…啊啊…小穴…继续把我的小穴弄得乱七八糟的%UNICODE\(0x2661\) \*1% 唔呀%UNICODE\(0x2661\) \*1% 吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊…啊啊…小穴…继续把我的小穴弄得乱七八糟的%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7253',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是快高潮了，大大分开双腿、让%SAVESTR:PLAYER%插进更深的地方。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是快高潮了，大大分开双
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7254',
        any: [
          /PRINTFORMW 「啊啊！就是那里！继续插我的小穴…咦——！那里好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！就是那里！继续插我的小穴…咦——！那里好舒服%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7255',
        any: [
          /PRINTFORMW 嘴里流着口水悲惨的只追求快感的%SAVESTR:TARGET%的身姿已经完全是一匹野兽一样了。/,
        ],
      }, // PRINTFORMW 嘴里流着口水悲惨的只追求快感的%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7256',
        any: [
          /PRINTFORMW 「哈啊哈啊%UNICODE\(0x2661\) \*1% 啊啊小穴去了去了…啊啊啊去了去了了了了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊%UNICODE(0x2661) *1% 啊啊小
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7257',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%翻着白眼绝顶了。这应该是在%SAVESTR:PLAYER%面前的第一次私处绝顶………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%翻着白眼绝顶了。这应该是在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7260',
        any: [
          /PRINTFORMW 「啊啊！魔王大人…我、我的…哪里…小、小、小穴快要去了…所以…继续%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！魔王大人…我、我的…哪里…小、小、小穴快要去了…所
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7261',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%追求着绝顶的秘裂啾啾的不停收缩着。柔软的哪里贪婪的包裹着，产生着快乐。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%追求着绝顶的秘裂啾啾的不停
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7262',
        any: [
          /PRINTFORMW 「是、是的…我…因为魔王大人而去了%UNICODE\(0x2661\) \*1% …被魔王大人把小穴弄去了%UNICODE\(0x2661\) \*1% 啊啊啊！去了去了去了去了了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是、是的…我…因为魔王大人而去了%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7263',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%狠狠的后仰着，发出绝顶的叫声。大概是因为被看到在%SAVESTR:PLAYER%面前的第一次完全高潮非常害羞的原因，脸颊都变红了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%狠狠的后仰着，发出绝顶的叫
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7264',
        any: [
          /PRINTFORMW 「哈啊哈啊…我、我…被魔王大人弄高潮了…好幸福啊………%UNICODE\(0x2661\) \*3%」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我、我…被魔王大人弄高潮了…好幸福啊………%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7267',
        any: [/PRINTFORMW 「不、不要啊…我被这种事情弄的舒服…嗯咕呜呜！」/],
      }, // PRINTFORMW 「不、不要啊…我被这种事情弄的舒服…嗯咕呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7268',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的秘裂收缩着，柔软的内部贪婪的包裹着，好像是绝顶的前兆。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的秘裂收缩着，柔软的内部贪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7269',
        any: [
          /PRINTFORMW 注意到那个的%SAVESTR:TARGET%狠狠地咬着嘴唇拼死忍耐着，但在被开发了的身体面前这并没有用。/,
        ],
      }, // PRINTFORMW 注意到那个的%SAVESTR:TARGET%狠狠地咬着嘴唇
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7272',
        any: [
          /PRINTFORMW 「咕哈…啊啊…快、快停下啊…我、我要…去、去了什么的…咦啊咦…咦、啊啊啊————！」/,
        ],
      }, // PRINTFORMW 「咕哈…啊啊…快、快停下啊…我、我要…去、去了什么的…咦啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7273',
        any: [
          /PRINTFORMW 接下来的刺激让%SAVESTR:TARGET%后仰着，腰微微颤抖了起来。/,
        ],
      }, // PRINTFORMW 接下来的刺激让%SAVESTR:TARGET%后仰着，腰微
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7274',
        any: [
          /PRINTFORMW 「对不起狂王大人啊啊啊！去了…去了去了去了了了了了！」/,
        ],
      }, // PRINTFORMW 「对不起狂王大人啊啊啊！去了…去了去了去了了了了了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7275',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%面前第一次私处绝顶了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7276',
        any: [
          /PRINTFORMW ”被憎恨的对手弄高潮的感想如何”耳边被这么说道的%SAVESTR:TARGET%不甘心的低下了头………/,
        ],
      }, // PRINTFORMW ”被憎恨的对手弄高潮的感想如何”耳边被这么说道的%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7278',
        any: [
          /PRINTFORMW 「啊！啊啊！好痛…就算这么痛也…嗯咕…啊哪里是…啊咦啊呀、不行…不要让我去啊！」/,
        ],
      }, // PRINTFORMW 「啊！啊啊！好痛…就算这么痛也…嗯咕…啊哪里是…啊咦啊呀、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7279',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为接下来的刺激而发出悲鸣，腰微微颤抖、决定的身体后仰着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为接下来的刺激而发出悲鸣
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7280',
        any: [
          /PRINTFORMW 「啊…咦——…不要啊！被魔王大人以外的人弄去了！啊啊啊…去了！去了！去——————！」/,
        ],
      }, // PRINTFORMW 「啊…咦——…不要啊！被魔王大人以外的人弄去了！啊啊啊…去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7281',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%面前第一次私处绝顶了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7282',
        any: [
          /PRINTFORMW 「用这么烂…这么疼的技巧…让我去了什么的…哈啊…哈啊…哈啊…」/,
        ],
      }, // PRINTFORMW 「用这么烂…这么疼的技巧…让我去了什么的…哈啊…哈啊…哈啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7283',
        any: [/PRINTFORMW %SAVESTR:TARGET%的下半身被爱液弄湿了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%的下半身被爱液弄湿了………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7286',
        any: [/CFLAG:TARGET:226 = 1/],
      }, // CFLAG:TARGET:226 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7291',
        any: [
          /PRINTFORMW 「啊啊嗯啊啊哈%UNICODE\(0x2661\) \*1% 被肉棒填的好满%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊啊哈%UNICODE(0x2661) *1% 被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7292',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%接近绝顶的秘裂不停地包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%接近绝顶的秘裂不停地包裹着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7293',
        any: [
          /PRINTFORMW 「啊啊！要用肉棒去了啊%UNICODE\(0x2661\) \*1% 用最喜欢的肉棒去了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！要用肉棒去了啊%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7294',
        any: [
          /PRINTFORMW 「嗯！啊嘎啊啊啊啊！啊啊%UNICODE\(0x2661\) \*1% 去了去了去了去了去了了了了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯！啊嘎啊啊啊啊！啊啊%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7295',
        any: [/PRINTFORMW %SAVESTR:TARGET%像野兽一样叫喊着绝顶了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%像野兽一样叫喊着绝顶了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7298',
        any: [
          /PRINTFORMW 「啊啊嗯啊啊哈%UNICODE\(0x2661\) \*1% 果然魔王大人的肉棒最棒了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊啊哈%UNICODE(0x2661) *1% 果
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7299',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%接近绝顶的秘裂不停地包裹着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%接近绝顶的秘裂不停地包裹着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7300',
        any: [
          /PRINTFORMW 「嗯啊嗯…好深啊%UNICODE\(0x2661\) \*1%…连我的最深处都被肉棒征服了啊…啊嗯嗯啊啊哈…」/,
        ],
      }, // PRINTFORMW 「嗯啊嗯…好深啊%UNICODE(0x2661) *1%…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7301',
        any: [
          /PRINTFORMW 「嗯！啊啊继续插哪里%UNICODE\(0x2661\) \*1% 啊！啊啊%UNICODE\(0x2661\) \*1% 去了去了去了去了去了了了了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯！啊啊继续插哪里%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7302',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像野兽一样叫喊着绝顶的身姿，被称呼为亲卫队队长的时候的高贵已经一点碎片都不剩了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像野兽一样叫喊着绝顶的身姿
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7305',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…哈…嗯…呼、啊啊…嗯…啊啊嗯…魔王大人…魔王大人…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…啊…啊啊…哈…嗯…呼、啊啊…嗯…啊啊嗯…魔王大人…魔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7306',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撒着娇的秘裂不停地包裹着，取悦着%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%撒着娇的秘裂不停地包裹着，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7307',
        any: [
          /PRINTFORMW 「是、是的…魔王大人…我、我要…被魔王大人弄…去、去了…嗯啊嗯！」/,
        ],
      }, // PRINTFORMW 「是、是的…魔王大人…我、我要…被魔王大人弄…去、去了…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7308',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着呆滞的表情一边这么说着，一边包裹着在小穴中蠢动的%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%带着呆滞的表情一边这么说着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7309',
        any: [
          /PRINTFORMW 「啊啊…我、我要…去了…被魔王大人抱着去了%UNICODE\(0x2661\) \*1% 啊啊啊…哈…啊啊啊啊啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…我、我要…去了…被魔王大人抱着去了%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7310',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%绝顶着，对%SAVESTR:PLAYER%露出了幸福的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%绝顶着，对%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7313',
        any: [
          /PRINTFORMW 「哈啊哈啊…即、即使被你抱…我也不会去的！…嗯咕…啊哦！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…即、即使被你抱…我也不会去的！…嗯咕…啊哦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7314',
        any: [
          /PRINTFORMW 说着强势的话的%SAVESTR:TARGET%的秘裂深深的被%SAVESTR:PLAYER%的阴茎插入着。/,
        ],
      }, // PRINTFORMW 说着强势的话的%SAVESTR:TARGET%的秘裂深深的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7315',
        any: [/PRINTFORMW 「啊…啊啊…哈、嗯…啊咕——！」/],
      }, // PRINTFORMW 「啊…啊啊…哈、嗯…啊咕——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7316',
        any: [
          /PRINTFORMW 「咦！啊！不要插哪里啊！啊…嗯…咦…去了去了去了了了！」/,
        ],
      }, // PRINTFORMW 「咦！啊！不要插哪里啊！啊…嗯…咦…去了去了去了了了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7319',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的弱点被顶到，马上就绝顶了，精疲力竭的躺在了%SAVESTR:PLAYER%怀里。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的弱点被顶到，马上就绝顶了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7320',
        any: [/PRINTFORMW 「哈啊哈啊…我、我被弄得这么…乱七八糟的………」/],
      }, // PRINTFORMW 「哈啊哈啊…我、我被弄得这么…乱七八糟的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7322',
        any: [
          /PRINTFORMW 大概是调教的成果，%SAVESTR:TARGET%的秘裂不停的收缩着迎来了绝顶。/,
        ],
      }, // PRINTFORMW 大概是调教的成果，%SAVESTR:TARGET%的秘裂不
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7323',
        any: [/PRINTFORMW 「快、快松手…被你这种只有激烈的sex弄去了什么的……」/],
      }, // PRINTFORMW 「快、快松手…被你这种只有激烈的sex弄去了什么的……」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7334',
        any: [
          /PRINTFORMW 「啊啊啊啊！我的肛门…啊咦咦咦…啊啊…变得好痒…嗯啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊！我的肛门…啊咦咦咦…啊啊…变得好痒…嗯啊啊嗯%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7335',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是快要肛门决定了，肛门收缩着，丰满的屁股颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是快要肛门决定了，肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7336',
        any: [
          /PRINTFORMW 于是%SAVESTR:PLAYER%向%SAVESTR:TARGET%的肛门发出了最后一击。/,
        ],
      }, // PRINTFORMW 于是%SAVESTR:PLAYER%向%SAVESTR:T
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7337',
        any: [
          /PRINTFORMW 「啊啊啊啊…咦%UNICODE\(0x2661\) \*1% 去了去了去了去了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊…咦%UNICODE(0x2661) *1% 去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7338',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的第一次肛门绝顶展示在了%SAVESTR:PLAYER%面前………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的第一次肛门绝顶展示在了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7341',
        any: [
          /PRINTFORMW 「是的…我的…肛门…肛门好像要去了…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…我的…肛门…肛门好像要去了…啊啊啊%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7342',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的屁股颤抖着，宣扬着自己快要肛门绝顶的事。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%丰满的屁股颤抖着，宣扬着自
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7343',
        any: [
          /PRINTFORMW 那可爱的身姿让%SAVESTR:PLAYER%不由得从无情的角度贯穿了%SAVESTR:TARGET%的肛门。/,
        ],
      }, // PRINTFORMW 那可爱的身姿让%SAVESTR:PLAYER%不由得从无情
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7344',
        any: [
          /PRINTFORMW 「啊啊…哈…啊啊…去了要去了…我要用肛门去了…啊…啊啊啊～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…哈…啊啊…去了要去了…我要用肛门去了…啊…啊啊啊～
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7345',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为第一次的肛门绝顶被所爱的%SAVESTR:PLAYER%看到而幸福的笑了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为第一次的肛门绝顶被所爱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7348',
        any: [
          /PRINTFORMW 「啊啊！快、快停下啊！即使做这种事…啊啊！也只会感觉很难受啊…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊！快、快停下啊！即使做这种事…啊啊！也只会感觉很难受
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7349',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然拼命否定者，但肛门接近绝顶而激烈的收缩，丰满的屁股颤抖。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然拼命否定者，但肛门接近
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7350',
        any: [
          /PRINTFORMW 于是%SAVESTR:PLAYER%从无情的角度继续插着%SAVESTR:TARGET%的肛门。/,
        ],
      }, // PRINTFORMW 于是%SAVESTR:PLAYER%从无情的角度继续插着%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7353',
        any: [
          /PRINTFORMW 「啊！啊啊！…咦…不…不要…啊啊要去要去了…咦不要再…继续了啊！」/,
        ],
      }, // PRINTFORMW 「啊！啊啊！…咦…不…不要…啊啊要去要去了…咦不要再…继续
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7354',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%玩弄肛门，%SAVESTR:TARGET%不停地娇喘着、然后…/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%玩弄肛门，%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7355',
        any: [
          /PRINTFORMW 「啊啊——！已、已经、不行不行不行…咦————！去了去了…啊啊啊肛门去了了了了了！」/,
        ],
      }, // PRINTFORMW 「啊啊——！已、已经、不行不行不行…咦————！去了去了…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7356',
        any: [
          /PRINTFORMW 在%SAVESTR:PLAYER%眼前激烈的绝顶。感到十分屈辱的%SAVESTR:TARGET%只能流着眼泪。/,
        ],
      }, // PRINTFORMW 在%SAVESTR:PLAYER%眼前激烈的绝顶。感到十分
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7357',
        any: [/PRINTFORMW 「啊啊…明明都没让狂王大人碰过我的屁股………」/],
      }, // PRINTFORMW 「啊啊…明明都没让狂王大人碰过我的屁股………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7359',
        any: [/PRINTFORMW 「啊咕！？那、哪里…很紧…的…不…不要…啊啊啊啊！」/],
      }, // PRINTFORMW 「啊咕！？那、哪里…很紧…的…不…不要…啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7360',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%玩弄肛门，%SAVESTR:TARGET%不停地娇喘着、然后…/,
        ],
      }, // PRINTFORMW 随着%SAVESTR:PLAYER%玩弄肛门，%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7361',
        any: [
          /PRINTFORMW 「啊啊！被弄着这么乱七八糟的…啊啊…咦、已经…咦…去了…去了去了了了了了了！」/,
        ],
      }, // PRINTFORMW 「啊啊！被弄着这么乱七八糟的…啊啊…咦、已经…咦…去了…去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7362',
        any: [
          /PRINTFORMW 在%SAVESTR:PLAYER%眼前激烈的绝顶。感到十分屈辱的%SAVESTR:TARGET%只能流着眼泪。/,
        ],
      }, // PRINTFORMW 在%SAVESTR:PLAYER%眼前激烈的绝顶。感到十分
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7363',
        any: [/PRINTFORMW 「啊啊…对不起狂王大人………」/],
      }, // PRINTFORMW 「啊啊…对不起狂王大人………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7366',
        any: [/CFLAG:227 = 1/],
      }, // CFLAG:227 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7371',
        any: [
          /PRINTFORMW 「啊啊啊～%UNICODE\(0x2661\) \*1% 肛门小穴好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊～%UNICODE(0x2661) *1% 肛门小
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7372',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%已经彻底变成肛门的快乐的俘虏了。无休止的快乐的最后，迎来了肛门绝顶。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%已经彻底变成肛门的快乐的俘
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7373',
        any: [
          /PRINTFORMW 「嗯啊…啊咕呜呜呜…去了%UNICODE\(0x2661\) \*1% 肛门小穴去了了了了了——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊…啊咕呜呜呜…去了%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7374',
        any: [
          /PRINTFORMW 不停地摇动着丰满的屁股的%SAVESTR:TARGET%品味着肛门绝顶………/,
        ],
      }, // PRINTFORMW 不停地摇动着丰满的屁股的%SAVESTR:TARGET%品
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7377',
        any: [
          /PRINTFORMW 「啊啊！是、是的…我的…屁股已经到极限了…啊啊…是的…要…要去了…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊！是、是的…我的…屁股已经到极限了…啊啊…是的…要…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7378',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%无法反抗肛门的快乐。害羞的将快要绝顶的事报告给%SAVESTR:PLAYER%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%无法反抗肛门的快乐。害羞的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7379',
        any: [
          /PRINTFORMW 「啊！去了%UNICODE\(0x2661\) \*1% 用肛门用肛门去了%UNICODE\(0x2661\) \*1% 被最爱的魔王大人弄去了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊！去了%UNICODE(0x2661) *1% 用肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7380',
        any: [
          /PRINTFORMW 不停地摇动着丰满的屁股的%SAVESTR:TARGET%肛门绝顶了………/,
        ],
      }, // PRINTFORMW 不停地摇动着丰满的屁股的%SAVESTR:TARGET%肛
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7383',
        any: [
          /PRINTFORMW 「咦！再继续玩弄肛门的话！不、不要啊…饶、饶不了你…呀啊啊啊！」/,
        ],
      }, // PRINTFORMW 「咦！再继续玩弄肛门的话！不、不要啊…饶、饶不了你…呀啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7384',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然因为马上就要肛门绝顶而不想再继续被玩弄但是%SAVESTR:PLAYER%的手没有停下。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然因为马上就要肛门绝顶而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7387',
        any: [
          /PRINTFORMW 「啊啊！求你了肛门高潮什么的不要不要啊！…咦…啊啊啊啊！去了去了去了了了了！」/,
        ],
      }, // PRINTFORMW 「啊啊！求你了肛门高潮什么的不要不要啊！…咦…啊啊啊啊！去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7388',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%手中被强行的肛门绝顶了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7390',
        any: [
          /PRINTFORMW 「这么！激烈的话！啊啊…我就要…啊咦！去了去了去了去了了了了！」/,
        ],
      }, // PRINTFORMW 「这么！激烈的话！啊啊…我就要…啊咦！去了去了去了去了了了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7391',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%手中被强行的肛门绝顶了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7402',
        any: [
          /PRINTFORMW 「啊啊…被这么温柔的对待的话…我…嗯！啊嗯%UNICODE\(0x2661\) \*1% 会用胸部去的…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…被这么温柔的对待的话…我…嗯！啊嗯%UNICODE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7403',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%沉浸在胸部被爱抚的感觉里。丰满的乳房上通红的乳头膨胀着勃起着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%沉浸在胸部被爱抚的感觉里。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7404',
        any: [
          /PRINTFORMW 「啊啊…是的啊…我的胸部是魔王大人的东西啊…请随意使用…咦————！」/,
        ],
      }, // PRINTFORMW 「啊啊…是的啊…我的胸部是魔王大人的东西啊…请随意使用…咦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7405',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头被啾的按下去，发出着不知道是悲鸣还是娇喘的声音。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的乳头被啾的按下去，发出着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7406',
        any: [
          /PRINTFORMW 「是的…就这样把我…把我弄得更加乱七八糟的吧…啊！咦咦…去了去了去了了了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「是的…就这样把我…把我弄得更加乱七八糟的吧…啊！咦咦…去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7407',
        any: [
          /PRINTFORMW 不停的乳房爱抚的最后、%SAVESTR:TARGET%在%SAVESTR:PLAYER%面前第一次用乳房绝顶了………/,
        ],
      }, // PRINTFORMW 不停的乳房爱抚的最后、%SAVESTR:TARGET%在%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7410',
        any: [
          /PRINTFORMW 「啊啊…嗯…哈啊哈啊…及时做这种事…嗯…我也不会舒服的…啊哈！」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯…哈啊哈啊…及时做这种事…嗯…我也不会舒服的…啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7411',
        any: [
          /PRINTFORMW 和%SAVESTR:TARGET%的话完全相反，乳头完全勃起着用软糖一样的弹力回应着爱抚、然后%SAVESTR:TARGET%后仰着第一次用乳头绝顶了。/,
        ],
      }, // PRINTFORMW 和%SAVESTR:TARGET%的话完全相反，乳头完全勃
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7412',
        any: [
          /PRINTFORMW 「啊啊啊…再、再继续玩弄我的话……啊啊啊啊唔唔！啊啊——！」/,
        ],
      }, // PRINTFORMW 「啊啊啊…再、再继续玩弄我的话……啊啊啊啊唔唔！啊啊——！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7413',
        any: [
          /PRINTFORMW 「………哈啊哈啊…不、不要再玩弄哪里了…嗯…哈唔…还很敏感啊…啊啊啊啊………」/,
        ],
      }, // PRINTFORMW 「………哈啊哈啊…不、不要再玩弄哪里了…嗯…哈唔…还很敏感
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7415',
        any: [/CFLAG:TARGET:228 = 1/],
      }, // CFLAG:TARGET:228 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7421',
        any: [/A = UP:11 \+ UP:12/],
      }, // A = UP:11 + UP:12
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7427',
        any: [/PRINTFORMW 「」/],
      }, // PRINTFORMW 「」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7430',
        any: [/PRINTFORMW 「」/],
      }, // PRINTFORMW 「」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7433',
        any: [/PRINTFORMW 「」/],
      }, // PRINTFORMW 「」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7439',
        any: [/PRINTFORML 【处女喪失】/],
      }, // PRINTFORML 【处女喪失】
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7440',
        any: [/PRINTFORMW 「哈啊哈啊…怎么样？我的处女play？」/],
      }, // PRINTFORMW 「哈啊哈啊…怎么样？我的处女play？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7441',
        any: [/PRINTFORMW %SAVESTR:TARGET%恶作剧一样的笑着。/],
      }, // PRINTFORMW %SAVESTR:TARGET%恶作剧一样的笑着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7442',
        any: [
          /PRINTFORMW 「下次“被强行夺走处女的悲鸣的小女孩play”也可以考虑呢♪」/,
        ],
      }, // PRINTFORMW 「下次“被强行夺走处女的悲鸣的小女孩play”也可以考虑呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7445',
        any: [/PRINTFORML 【处女喪失】/],
      }, // PRINTFORML 【处女喪失】
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7446',
        any: [/PRINTFORMW 「明明不用特意做这种事…我也是魔王大人的东西…」/],
      }, // PRINTFORMW 「明明不用特意做这种事…我也是魔王大人的东西…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7447',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的股间流出虚伪的破瓜之血、然后%SAVESTR:TARGET%有点寂寞的笑了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的股间流出虚伪的破瓜之血、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7450',
        any: [/PRINTFORML 【处女喪失】/],
      }, // PRINTFORML 【处女喪失】
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7451',
        any: [
          /PRINTFORMW 「呵呵呵…不管多少次夺走我的处女、第一次也已经奉献给狂王大人了…」/,
        ],
      }, // PRINTFORMW 「呵呵呵…不管多少次夺走我的处女、第一次也已经奉献给狂王大
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7452',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流着眼泪一边嘀嘀咕咕的说着什么………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边流着眼泪一边嘀嘀咕咕的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7455',
        any: [/CFLAG:TARGET:229 = 1/],
      }, // CFLAG:TARGET:229 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7463-7543',
        any: [/@KOJO_MESSAGE_MARKCNG_7/],
      }, // @KOJO_MESSAGE_MARKCNG_7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7467-7484',
        any: [
          /;口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）/,
        ],
      }, // ;口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7492',
        any: [
          /PRINTFORMW 「啊咕…唔…没、没关系的…这疼痛可是魔王大人给予的………」/,
        ],
      }, // PRINTFORMW 「啊咕…唔…没、没关系的…这疼痛可是魔王大人给予的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7493',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像把被毫不客气的给予的强烈疼痛也当做重要的羁绊了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%好像把被毫不客气的给予的强
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7495',
        any: [/PRINTFORMW 「呜咕…我、我为什么会遇到这种…咕…呜呜………」/],
      }, // PRINTFORMW 「呜咕…我、我为什么会遇到这种…咕…呜呜………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7496',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为过分的苦痛而留下了眼泪………/],
      }, // PRINTFORMW %SAVESTR:TARGET%因为过分的苦痛而留下了眼泪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7498',
        any: [/CFLAG:297 = 1/],
      }, // CFLAG:297 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7507',
        any: [
          /PRINTFORMW 「啊啊啊…感受到魔王大人的爱了啊…请给我…更多…更多吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…感受到魔王大人的爱了啊…请给我…更多…更多吧%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7508',
        any: [/PRINTFORMW %SAVESTR:TARGET%从身体到脑髓都被刻入了强烈的快感………/],
      }, // PRINTFORMW %SAVESTR:TARGET%从身体到脑髓都被刻入了强烈
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7510',
        any: [
          /PRINTFORMW 「啊咦…这、这么舒服…还、还是第一次啊…呼哇啊啊啊啊………」/,
        ],
      }, // PRINTFORMW 「啊咦…这、这么舒服…还、还是第一次啊…呼哇啊啊啊啊………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7511',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被刻下了强烈的快感而漏出了下流的表情………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被刻下了强烈的快感而漏
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7513',
        any: [/CFLAG:298 = 1/],
      }, // CFLAG:298 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7520',
        any: [
          /PRINTFORMW 「哈啊哈啊…我已经被逼到变成这个样子了…已经无法反抗了………」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…我已经被逼到变成这个样子了…已经无法反抗了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7521',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看%SAVESTR:PLAYER%的眼神好像见到新主人的母狗一样………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%看%SAVESTR:PLA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7522',
        any: [/CFLAG:299 = 1/],
      }, // CFLAG:299 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7531',
        any: [/PRINTFORMW 「我明明尽心到这种地步…却这样对待我…饶不了你………」/],
      }, // PRINTFORMW 「我明明尽心到这种地步…却这样对待我…饶不了你………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7532',
        any: [
          /PRINTFORMW 好像有点太嚣张了。%SAVESTR:PLAYER%做的事好像超过了%SAVESTR:TARGET%的愤怒的极限、今后的调教会变得棘手吧………/,
        ],
      }, // PRINTFORMW 好像有点太嚣张了。%SAVESTR:PLAYER%做的事好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7534',
        any: [
          /PRINTFORMW 「不要再碰我了！肮脏的东西！果然你是…比畜生还低等的存在！」/,
        ],
      }, // PRINTFORMW 「不要再碰我了！肮脏的东西！果然你是…比畜生还低等的存在！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7535',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的调教好像超越了%SAVESTR:TARGET%的愤怒的极限、今后的调教会变得棘手吧………/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%的调教好像超越了%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7537',
        any: [/CFLAG:300 = 1/],
      }, // CFLAG:300 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7544-7974',
        any: [/@SELF_KOJO_K7/],
      }, // @SELF_KOJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7551',
        any: [/PRINTFORMW 「啊哈啊…啊哈啊哈…啊哇哇啊…」/],
      }, // PRINTFORMW 「啊哈啊…啊哈啊哈…啊哇哇啊…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7552',
        any: [/PRINTFORMW %SAVESTR:TARGET%像坏掉的玩具一样疯狂的自慰着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%像坏掉的玩具一样疯狂的自慰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7555',
        any: [/PRINTFORMW 「嗯…啊啊…哈啊哈啊…都是女性也…很不错啊………♪」/],
      }, // PRINTFORMW 「嗯…啊啊…哈啊哈啊…都是女性也…很不错啊………♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7556',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是在寻找%SAVESTR:ASSI%的残渣一样把手指伸向了秘处………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像是在寻找%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7559',
        any: [/PRINTFORMW 「啊啊…野狗的…想要野狗的肉棒！」/],
      }, // PRINTFORMW 「啊啊…野狗的…想要野狗的肉棒！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7560',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边想象着被野狗侵犯一边疯狂的自慰着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边想象着被野狗侵犯一边疯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7565',
        any: [/PRINTFORMW 「啊啊…魔王大人不在的话闲的不得了…嗯…嗯…啊嗯」/],
      }, // PRINTFORMW 「啊啊…魔王大人不在的话闲的不得了…嗯…嗯…啊嗯」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7566',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是因为被调教了的身体很寂寞、自然地把手放到股间开始了自慰。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是因为被调教了的身体很
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7567',
        any: [
          /PRINTFORMW 「嗯哈啊哈啊…嗯…啊嗯…魔王大人那样激烈的…喜欢…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯哈啊哈啊…嗯…啊嗯…魔王大人那样激烈的…喜欢…啊啊啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7568',
        any: [
          /PRINTFORMW 自慰越来越投入、溢出的爱液弄脏了床单。最后身体不由得想后仰着绝顶了。/,
        ],
      }, // PRINTFORMW 自慰越来越投入、溢出的爱液弄脏了床单。最后身体不由得想后仰
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7569',
        any: [
          /PRINTFORMW 「哈啊——…哈啊——…………再不…再不快点来的话…我就要袭击过去了呦…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈啊——…哈啊——…………再不…再不快点来的话…我就要袭
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7570',
        any: [/CFLAG:261 = 4/],
      }, // CFLAG:261 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7573',
        any: [
          /PRINTFORMW 「嗯…啊嗯…嗯…没有魔王大人的命令的话…明明不能做…不行…果然停不下来！」/,
        ],
      }, // PRINTFORMW 「嗯…啊嗯…嗯…没有魔王大人的命令的话…明明不能做…不行…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7574',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的被彻底调教了的身体一旦着了火就无法简单的熄灭。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的被彻底调教了的身体一旦着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7575',
        any: [
          /PRINTFORMW 一边咬着床单、一边回想着刚才调教的内容的%SAVESTR:TARGET%反复的自慰着。/,
        ],
      }, // PRINTFORMW 一边咬着床单、一边回想着刚才调教的内容的%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7576',
        any: [
          /PRINTFORMW 「啊啊——…魔王大人%UNICODE\(0x2661\) \*1% 我…明明想成为更加属于魔王大人的东西%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊——…魔王大人%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7577',
        any: [/CFLAG:261 = 3/],
      }, // CFLAG:261 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7580',
        any: [/PRINTFORMW 「嗯呼——…嗯呼——…啊…啊啊…手、手指…全部进来了吗…？」/],
      }, // PRINTFORMW 「嗯呼——…嗯呼——…啊…啊啊…手、手指…全部进来了吗…？
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7581',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把两手的手指一根根的插进自己的秘裂。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把两手的手指一根根的插进自
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7582',
        any: [/PRINTFORMW 「啊啊！虽然手指什么的果然不够…但是停不下来啊！」/],
      }, // PRINTFORMW 「啊啊！虽然手指什么的果然不够…但是停不下来啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7583',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上酷本的自慰持续了好几个小时………/],
      }, // PRINTFORMW %SAVESTR:TARGET%在床上酷本的自慰持续了好几
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7584',
        any: [/CFLAG:261 = 2/],
      }, // CFLAG:261 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7587',
        any: [/PRINTFORMW 「嗯…咕…哈啊哈啊…嗯…啊嗯…啊啊…比起用手指…更…」/],
      }, // PRINTFORMW 「嗯…咕…哈啊哈啊…嗯…啊嗯…啊啊…比起用手指…更…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7588',
        any: [/PRINTFORMW 「不得不抚慰自己什么的真悲惨啊……」/],
      }, // PRINTFORMW 「不得不抚慰自己什么的真悲惨啊……」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7589',
        any: [/CFLAG:261 = 1/],
      }, // CFLAG:261 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7600',
        any: [/PRINTFORMW 「啊呼——…嗯…呜呜——…啊——…啊啊啊——………」/],
      }, // PRINTFORMW 「啊呼——…嗯…呜呜——…啊——…啊啊啊——………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7601',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%和已经坏掉的%SAVESTR:TARGET%享受着颓废的百合play………/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%和已经坏掉的%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7602',
        any: [/CFLAG:262 = 6/],
      }, // CFLAG:262 = 6
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7605',
        any: [
          /PRINTFORMW 「呵呵呵、你特意留下就是说…要做对吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「呵呵呵、你特意留下就是说…要做对吧%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7606',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，抱着%SAVESTR:ASSI%不停地反复接吻着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，抱着%SAVE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7607',
        any: [
          /PRINTFORMW 「来…咱们一起享受吧？啊啊…嗯…就是这样…继续摸我的胸部…啊嗯…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「来…咱们一起享受吧？啊啊…嗯…就是这样…继续摸我的胸部…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7608',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%把%SAVESTR:TARGET%压倒、慢慢的玩弄着那丰满的身体。/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%把%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7609',
        any: [
          /PRINTFORMW 「啊啊嗯…啊啊…啊啊嗯…啊啊…继续…继续让我变得舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…啊啊…啊啊嗯…啊啊…继续…继续让我变得舒服吧%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7610',
        any: [/CFLAG:262 = 5/],
      }, // CFLAG:262 = 5
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7613',
        any: [
          /PRINTFORMW 「这、这种事魔王大人不可能…诶、魔王大人许可了…怎么这样…啊啊啊！」/,
        ],
      }, // PRINTFORMW 「这、这种事魔王大人不可能…诶、魔王大人许可了…怎么这样…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7614',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样被%SAVESTR:ASSI%玩弄着，张开身体挖掘要害。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样被%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7615',
        any: [
          /PRINTFORMW 「嗯啊…啊啊——！哈啊哈啊…不行啊…可以随便使用我的明明只有魔王大人…嗯哈咦哈咦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯啊…啊啊——！哈啊哈啊…不行啊…可以随便使用我的明明只
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7616',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%舔了舔嘴唇，开始享受起了%SAVESTR:TARGET%的丰满的身体………/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%舔了舔嘴唇，开始享受起了%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7617',
        any: [/CFLAG:262 = 4/],
      }, // CFLAG:262 = 4
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7620',
        any: [/PRINTFORMW 「嗯…好棒啊…来吧…♪」/],
      }, // PRINTFORMW 「嗯…好棒啊…来吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7621',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在床上张开身体诱惑着%SAVESTR:ASSI%。好像是找到了女子之间的快感而很高兴的样子。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%在床上张开身体诱惑着%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7622',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊嗯…恩…好棒啊…摸哪里都没关系哦…呀嗯…嗯…没错我那不干净的地方也…啊啊嗯！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…啊嗯…恩…好棒啊…摸哪里都没关系哦…呀嗯…嗯…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7623',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%的卓越的技术玩弄着，身心都慢慢的快要融化了………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7624',
        any: [/CFLAG:262 = 3/],
      }, // CFLAG:262 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7627',
        any: [
          /PRINTFORMW 「哈啊哈啊…你这种做法没那么无聊…啊嗯…真是的…不用那么僵硬也…」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…你这种做法没那么无聊…啊嗯…真是的…不用那么僵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7628',
        any: [/PRINTFORMW 「我不会从这里逃走的………」/],
      }, // PRINTFORMW 「我不会从这里逃走的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7629',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%一边在寂寞的笑着的%SAVESTR:TARGET%脸上落下亲吻之雨、一边开始使用身体互相抚慰着………/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%一边在寂寞的笑着的%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7630',
        any: [/CFLAG:262 = 2/],
      }, // CFLAG:262 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7633',
        any: [
          /PRINTFORMW 「那个人已经走了你还特意留在这里是因为这种原因啊…好吧…即使成为安慰你的道具也…啊…嗯！」/,
        ],
      }, // PRINTFORMW 「那个人已经走了你还特意留在这里是因为这种原因啊…好吧…即
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7634',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%坦率的吧身体托付给%SAVESTR:ASSI%。%SAVESTR:ASSI%稍微有些失望的开始享受起了%SAVESTR:TARGET%………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%坦率的吧身体托付给%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7635',
        any: [/CFLAG:262 = 1/],
      }, // CFLAG:262 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7645',
        any: [/PRINTFORMW 「啊唔…嗯…唔…悠棒…悠棒………♪」/],
      }, // PRINTFORMW 「啊唔…嗯…唔…悠棒…悠棒………♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7646',
        any: [/PRINTFORMW %SAVESTR:TARGET%就那样一脸呆滞的继续舔着阴茎………/],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样一脸呆滞的继续舔着阴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7649',
        any: [
          /PRINTFORMW 「啊呜…嗯嗯啾啾啾唔%UNICODE\(0x2661\) \*1% 嗯咕唔…嗯嗯嗯咕…啾啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜…嗯嗯啾啾啾唔%UNICODE(0x2661) *1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7650',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%更加贪婪的舔着射完精变得老实了的%SAVESTR:PLAYER%的阴茎，把精液全部舔了下来，为了让它恢复舌头的动作变得更激烈了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%更加贪婪的舔着射完精变得老
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7651',
        any: [/PRINTFORMW 「嗯啾咕…嗯啾啾啪啾啾啾…就%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「嗯啾咕…嗯啾啾啪啾啾啾…就%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7652',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大概是彻底肉棒上瘾了，无视%SAVESTR:PLAYER%已经起床了继续舔着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%大概是彻底肉棒上瘾了，无视
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7653',
        any: [/CFLAG:263 = 3/],
      }, // CFLAG:263 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7656',
        any: [
          /PRINTFORMW 「嗯…嗯啾…啾…啾——…啾%UNICODE\(0x2661\) \*1% 啊哇、早上好我的魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯…嗯啾…啾…啾——…啾%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7657',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完成了扫除口交、手温柔的抚摸着%SAVESTR:PLAYER%的阴茎促进着回复。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%完成了扫除口交、手温柔的抚
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7658',
        any: [
          /PRINTFORMW 「收下了最浓的早上第一发真是对不起…看起来还很精神，我就继续早上的处理了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「收下了最浓的早上第一发真是对不起…看起来还很精神，我就继
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7659',
        any: [
          /PRINTFORMW “擅自自己榨取这算什么……”想这样吐槽的%SAVESTR:PLAYER%放弃了，就那样放任着%SAVESTR:TARGET%的口腔奉仕………/,
        ],
      }, // PRINTFORMW “擅自自己榨取这算什么……”想这样吐槽的%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7660',
        any: [/CFLAG:263 = 3/],
      }, // CFLAG:263 = 3
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7663',
        any: [/PRINTFORMW 「啊嗯…嗯呼呼…请让我继续奉仕吧…♪」/],
      }, // PRINTFORMW 「啊嗯…嗯呼呼…请让我继续奉仕吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7664',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边微笑着一边用舌头缠上了%SAVESTR:PLAYER%的阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边微笑着一边用舌头缠上了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7665',
        any: [
          /PRINTFORMW 「哈啊哈啊…又变得精神起来了呢…真没办法呢、就让我负起责任处理一下吧♪」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…又变得精神起来了呢…真没办法呢、就让我负起责任
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7666',
        any: [/CFLAG:263 = 2/],
      }, // CFLAG:263 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7669',
        any: [
          /PRINTFORMW 「嗯咕…嗯…啾…啊呜…嗯咕…啊啊起床了呢…我那个…就收下你早上的第一发了！」/,
        ],
      }, // PRINTFORMW 「嗯咕…嗯…啾…啊呜…嗯咕…啊啊起床了呢…我那个…就收下你
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7670',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边因为羞耻而满脸通红一边继续着扫除口交………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边因为羞耻而满脸通红一边
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7671',
        any: [/CFLAG:263 = 1/],
      }, // CFLAG:263 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7681',
        any: [
          /PRINTFORMW 「继续…继续和我做…啊咦咦%UNICODE\(0x2661\) \*1% 啊啊…呜啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「继续…继续和我做…啊咦咦%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7682',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%、享受着那互相寻求快乐的性爱。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7683',
        any: [
          /PRINTFORMW 「啊啊啊…哈哈…啊嗯！是呢…我只最喜欢做爱的母狗呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…哈哈…啊嗯！是呢…我只最喜欢做爱的母狗呢%UNI
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7684',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为无法忍耐强力的快感而喊出了至今为止都说不出口的真心话。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为无法忍耐强力的快感而喊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7685',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%微笑着扭动着腰，连%SAVESTR:TARGET%的脑袋里面都被搅动起来了。/,
        ],
      }, // PRINTFORMW %SAVESTR:PLAYER%微笑着扭动着腰，连%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7687',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%的蜜壶里面因为被中出了\{s\}次都起泡沫了。/,
        ],
      }, // PRINTFORMW 然后%SAVESTR:TARGET%的蜜壶里面因为被中出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7688',
        any: [
          /PRINTFORMW 「啊啊…啊啊——…啊啊——…不要离开…不要离开我…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊啊——…啊啊——…不要离开…不要离开我…啊啊——
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7689',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就那样带着恍惚的表情嘟嘟囔囔的说着什么………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%就那样带着恍惚的表情嘟嘟囔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7690',
        any: [/CFLAG:264 = 2/],
      }, // CFLAG:264 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7693',
        any: [
          /PRINTFORMW 「啊嗯！恩…啊啊…是、是的…继续侵犯…啊、啊嗯…讨厌…总觉得比平时还要温柔啊…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯！恩…啊啊…是、是的…继续侵犯…啊、啊嗯…讨厌…总觉
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7694',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%的腰的温柔的动作而有些不知所措、和平时稍微有点不同的快感让%SAVESTR:TARGET%的腰都快要融化了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PL
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7695',
        any: [
          /PRINTFORMW 「啊嗯…呼、啊…啊啊嗯…这样也感觉很舒服呢…啊啊…继续%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯…呼、啊…啊啊嗯…这样也感觉很舒服呢…啊啊…继续%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7696',
        any: [
          /PRINTFORMW 看着%SAVESTR:TARGET%那快要融化一样的表情，%SAVESTR:PLAYER%加深着两人的快乐。/,
        ],
      }, // PRINTFORMW 看着%SAVESTR:TARGET%那快要融化一样的表情，
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7697',
        any: [
          /PRINTFORMW 然后从%SAVESTR:TARGET%股间\{s\}回份的精液流了出来………/,
        ],
      }, // PRINTFORMW 然后从%SAVESTR:TARGET%股间{s}回份的精液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7698',
        any: [/CFLAG:264 = 1/],
      }, // CFLAG:264 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7709',
        any: [/PRINTFORMW 「哈唔～…啊呜～………呜呜～…………」/],
      }, // PRINTFORMW 「哈唔～…啊呜～………呜呜～…………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7710',
        any: [
          /PRINTFORMW 坏掉的%SAVESTR:TARGET%为让自己的主人抱自己而跑到了%CALLNAME:MASTER%的房间来了………/,
        ],
      }, // PRINTFORMW 坏掉的%SAVESTR:TARGET%为让自己的主人抱自己
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7711',
        any: [/CFLAG:265 = 2/],
      }, // CFLAG:265 = 2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7713',
        any: [/PRINTFORMW 「呵呵呵、今夜我是第一个来的呢…♪」/],
      }, // PRINTFORMW 「呵呵呵、今夜我是第一个来的呢…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7714',
        any: [
          /PRINTFORMW 注意到的时候拿着枕头的%SAVESTR:TARGET%已经进到了%CALLNAME:MASTER%的房间里。/,
        ],
      }, // PRINTFORMW 注意到的时候拿着枕头的%SAVESTR:TARGET%已经
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7715',
        any: [
          /PRINTFORMW 「呐、陪着你、可以吗？不会拒绝吧？拒绝的话…我会哭哦？」/,
        ],
      }, // PRINTFORMW 「呐、陪着你、可以吗？不会拒绝吧？拒绝的话…我会哭哦？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7716',
        any: [
          /PRINTFORMW %CALLNAME:MASTER%一边苦笑着一边把%SAVESTR:TARGET%抱到了床上………/,
        ],
      }, // PRINTFORMW %CALLNAME:MASTER%一边苦笑着一边把%SAV
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7718',
        any: [/CFLAG:265 = 1/],
      }, // CFLAG:265 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7727',
        any: [/PRINTFORMW 「呵呵呵…世界看起来是这么闪闪发光呢——………」/],
      }, // PRINTFORMW 「呵呵呵…世界看起来是这么闪闪发光呢——………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7728',
        any: [
          /PRINTFORMW 坏掉的%SAVESTR:TARGET%最终也没有恢复，就那样坏掉着被卖掉了………/,
        ],
      }, // PRINTFORMW 坏掉的%SAVESTR:TARGET%最终也没有恢复，就那
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7731',
        any: [
          /PRINTFORMW 「是的、我明白的…我为了魔王大人…为了……魔王大人…被、被卖掉了………」/,
        ],
      }, // PRINTFORMW 「是的、我明白的…我为了魔王大人…为了……魔王大人…被、被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7732',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%和%CALLNAME:MASTER%永别了。/],
      }, // PRINTFORMW 然后%SAVESTR:TARGET%和%CALLNAME:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7733',
        any: [
          /PRINTFORMW 狂王的爱人在任务中败北，落入了魔王的手里、最后被卖给奴隶商人。她自己的人生规划中是没有这种路线的吧。/,
        ],
      }, // PRINTFORMW 狂王的爱人在任务中败北，落入了魔王的手里、最后被卖给奴隶商
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7734',
        any: [/PRINTFORMW 也不清楚她有没有在被卖之前获得过作为奴隶的幸福。/],
      }, // PRINTFORMW 也不清楚她有没有在被卖之前获得过作为奴隶的幸福。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7735',
        any: [
          /PRINTFORMW 浮现在坐在奴隶商人的马车的她的心里的想法到底是什么样的、这件事魔王已经一生都没办法理解，没办法知道了。/,
        ],
      }, // PRINTFORMW 浮现在坐在奴隶商人的马车的她的心里的想法到底是什么样的、这
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7736',
        any: [/PRINTW/],
      }, // PRINTW
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7737',
        any: [/PRINTFORMW 「下辈子出生的时候…希望我不是我………」/],
      }, // PRINTFORMW 「下辈子出生的时候…希望我不是我………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7740',
        any: [/PRINTFORMW 「还以为回到地面上的这个瞬间是最后的机会呢………」/],
      }, // PRINTFORMW 「还以为回到地面上的这个瞬间是最后的机会呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7741',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%逃脱失败，被卫兵抓了回来。%CALLNAME:MASTER%带着稍微有些遗憾的表情看着%SAVESTR:TARGET%。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%逃脱失败，被卫兵抓了回来。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7742',
        any: [
          /PRINTFORMW 「哼…想杀我就杀吧…诶？你说啥了就没法收钱了…怎么这样…！」/,
        ],
      }, // PRINTFORMW 「哼…想杀我就杀吧…诶？你说啥了就没法收钱了…怎么这样…！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7743',
        any: [
          /PRINTFORMW ”果然是以自杀为目的的自暴自弃”%SAVESTR:TARGET%最后听到%CALLNAME:MASTER%这样嘟囔着………/,
        ],
      }, // PRINTFORMW ”果然是以自杀为目的的自暴自弃”%SAVESTR:TARG
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7746',
        any: [
          /PRINTFORMW 「对、对我的身体厌倦了吗！不、不要啊…我不想从你身边离开啊！」/,
        ],
      }, // PRINTFORMW 「对、对我的身体厌倦了吗！不、不要啊…我不想从你身边离开啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7747',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是分手的恋人一样说道、明明只是牝奴隶而已。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%像是分手的恋人一样说道、明
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7748',
        any: [
          /PRINTFORMW 被冷静的目光看着的%SAVESTR:TARGET%忽然放松了肩膀、老实的坐上了马车。/,
        ],
      }, // PRINTFORMW 被冷静的目光看着的%SAVESTR:TARGET%忽然放松
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7749',
        any: [/PRINTFORMW 「这么对待别人的话被怨恨的………魔王大人………」/],
      }, // PRINTFORMW 「这么对待别人的话被怨恨的………魔王大人………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7752',
        any: [
          /PRINTFORMW 「怎么这样…我变成低俗的魔族的奴隶…玩具什么的…求你了…让我什么都可以请不要这样…！」/,
        ],
      }, // PRINTFORMW 「怎么这样…我变成低俗的魔族的奴隶…玩具什么的…求你了…让
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7753',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然拼命的祈求着，却还是被装上了奴隶商人的马车………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然拼命的祈求着，却还是被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7756',
        any: [/CALL SELL_MATURO_K0/],
      }, // CALL SELL_MATURO_K0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7766',
        any: [
          /PRINTFORMW 「骗、骗人…骗人骗人骗人…我怀孕了什么的…怀上了怪物的孩子什么的…不要不要啊啊啊啊啊啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「骗、骗人…骗人骗人骗人…我怀孕了什么的…怀上了怪物的孩子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7767',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被看到不停地打着自己的肚子而被压住，打上了镇静剂。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被看到不停地打着自己的肚子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7768',
        any: [
          /PRINTFORMW 虽然肚子里的孩子没有流产、但%SAVESTR:TARGET%的精神没能承受住妊娠的事实………/,
        ],
      }, // PRINTFORMW 虽然肚子里的孩子没有流产、但%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7771',
        any: [/PRINTFORMW 「那个…魔王大人…今天有令人高兴的报告………」/],
      }, // PRINTFORMW 「那个…魔王大人…今天有令人高兴的报告………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7772',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边抚摸着肚子一边怯生生的向%CALLNAME:MASTER%报告。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边抚摸着肚子一边怯生生的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7773',
        any: [
          /PRINTFORMW 「我、怀孕了。毫无疑问是魔王大人…您的孩子哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我、怀孕了。毫无疑问是魔王大人…您的孩子哦%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7776',
        any: [/PRINTFORMW 「啊、魔王大人…稍微有点事要报告」/],
      }, // PRINTFORMW 「啊、魔王大人…稍微有点事要报告」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7777',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%CALLNAME:MASTER%的手腕用比平时更激烈的方式撒着娇。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%CALLNAME:M
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7778',
        any: [
          /PRINTFORMW 「我、已经怀孕了。当然，是魔王大人的孩子、但是请毫无顾忌的抱我吧」/,
        ],
      }, // PRINTFORMW 「我、已经怀孕了。当然，是魔王大人的孩子、但是请毫无顾忌的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7779',
        any: [
          /PRINTFORMW 「因为魔王大人的孩子的话我觉得不管做什么都不会流产呢…呵呵呵♪」/,
        ],
      }, // PRINTFORMW 「因为魔王大人的孩子的话我觉得不管做什么都不会流产呢…呵呵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7782',
        any: [
          /PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕了………」/,
        ],
      }, // PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7783',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CALLNAME:MASTER%报告了妊娠。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7784',
        any: [
          /PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」/,
        ],
      }, // PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7787',
        any: [
          /PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕了………」/,
        ],
      }, // PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7788',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CALLNAME:MASTER%报告了妊娠。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7789',
        any: [
          /PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」/,
        ],
      }, // PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7792',
        any: [
          /PRINTFORMW 「呵呵呵、魔王大人、我…看起来已经怀上了野狗大人的孩子了呢………♪」/,
        ],
      }, // PRINTFORMW 「呵呵呵、魔王大人、我…看起来已经怀上了野狗大人的孩子了呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7793',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴地把妊娠的事报告给了%SAVESTR:PLAYER%、今后要稍微注意一点了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%高兴地把妊娠的事报告给了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7794',
        any: [
          /PRINTFORMW 「啊啊…生出来的孩子也像野狗大人一样做一只优秀的野狗的话我会很高兴的♪」/,
        ],
      }, // PRINTFORMW 「啊啊…生出来的孩子也像野狗大人一样做一只优秀的野狗的话我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7797',
        any: [/PRINTFORMW 「哎、哎呀…怀上了狂王大人的孩子什么的」/],
      }, // PRINTFORMW 「哎、哎呀…怀上了狂王大人的孩子什么的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7798',
        any: [/PRINTFORMW 「如果能稍微早一点的话就能坦率的感到高兴了呢…」/],
      }, // PRINTFORMW 「如果能稍微早一点的话就能坦率的感到高兴了呢…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7801',
        any: [/PRINTFORMW 「我…怀孕了…这是骗人的吧…………」/],
      }, // PRINTFORMW 「我…怀孕了…这是骗人的吧…………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7803',
        any: [/CFLAG:271 = 1/],
      }, // CFLAG:271 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7807',
        any: [
          /PRINTFORMW 「骗、骗人…骗人骗人骗人…我怀孕了什么的…怀上了怪物的孩子什么的…不要不要啊啊啊啊啊啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「骗、骗人…骗人骗人骗人…我怀孕了什么的…怀上了怪物的孩子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7808',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被看到不停地打着自己的肚子而被压住，打上了镇静剂。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被看到不停地打着自己的肚子
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7809',
        any: [
          /PRINTFORMW 虽然肚子里的孩子没有流产、但%SAVESTR:TARGET%的精神没能承受住妊娠的事实………/,
        ],
      }, // PRINTFORMW 虽然肚子里的孩子没有流产、但%SAVESTR:TARGET
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7812',
        any: [/PRINTFORMW 「那个…魔王大人…今天有令人高兴的报告………」/],
      }, // PRINTFORMW 「那个…魔王大人…今天有令人高兴的报告………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7813',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边抚摸着肚子一边怯生生的向%CALLNAME:MASTER%报告。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边抚摸着肚子一边怯生生的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7814',
        any: [
          /PRINTFORMW 「我、怀孕了。毫无疑问是魔王大人…您的孩子哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我、怀孕了。毫无疑问是魔王大人…您的孩子哦%UNICOD
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7817',
        any: [/PRINTFORMW 「啊、魔王大人…稍微有点事要报告」/],
      }, // PRINTFORMW 「啊、魔王大人…稍微有点事要报告」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7818',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%CALLNAME:MASTER%的手腕用比平时更激烈的方式撒着娇。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抱着%CALLNAME:M
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7819',
        any: [
          /PRINTFORMW 「我、已经怀孕了。当然，是魔王大人的孩子、但是请毫无顾忌的抱我吧」/,
        ],
      }, // PRINTFORMW 「我、已经怀孕了。当然，是魔王大人的孩子、但是请毫无顾忌的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7820',
        any: [
          /PRINTFORMW 「因为魔王大人的孩子的话我觉得不管做什么都不会流产呢…呵呵呵♪」/,
        ],
      }, // PRINTFORMW 「因为魔王大人的孩子的话我觉得不管做什么都不会流产呢…呵呵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7823',
        any: [
          /PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕了………」/,
        ],
      }, // PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7824',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CALLNAME:MASTER%报告了妊娠。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7825',
        any: [
          /PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」/,
        ],
      }, // PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7828',
        any: [
          /PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕了………」/,
        ],
      }, // PRINTFORMW 「那个…魔王大人…我看来好像因为%CSTR:2%的子种怀孕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7829',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CALLNAME:MASTER%报告了妊娠。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边摩挲着腹部一边向%CA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7830',
        any: [
          /PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生下来的♪」/,
        ],
      }, // PRINTFORMW 「虽然不知道会生出什么样的孩子所以有些害怕…不过我一定会生
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7833',
        any: [
          /PRINTFORMW 「呵呵呵、魔王大人、我…看起来已经怀上了野狗大人的孩子了呢………♪」/,
        ],
      }, // PRINTFORMW 「呵呵呵、魔王大人、我…看起来已经怀上了野狗大人的孩子了呢
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7834',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴地把妊娠的事报告给了%SAVESTR:PLAYER%、今后要稍微注意一点了。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%高兴地把妊娠的事报告给了%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7835',
        any: [
          /PRINTFORMW 「啊啊…生出来的孩子也像野狗大人一样做一只优秀的野狗的话我会很高兴的♪」/,
        ],
      }, // PRINTFORMW 「啊啊…生出来的孩子也像野狗大人一样做一只优秀的野狗的话我
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7838',
        any: [/PRINTFORMW 「哎、哎呀…怀上了狂王大人的孩子什么的」/],
      }, // PRINTFORMW 「哎、哎呀…怀上了狂王大人的孩子什么的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7839',
        any: [/PRINTFORMW 「如果能稍微早一点的话就能坦率的感到高兴了呢…」/],
      }, // PRINTFORMW 「如果能稍微早一点的话就能坦率的感到高兴了呢…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7842',
        any: [/PRINTFORMW 「我…怀孕了…这是骗人的吧…………」/],
      }, // PRINTFORMW 「我…怀孕了…这是骗人的吧…………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7844',
        any: [/CFLAG:271 = 1/],
      }, // CFLAG:271 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7855',
        any: [
          /PRINTFORMW 「啊啊——！杀了！杀了他啊啊啊啊！我要杀了他啊啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊——！杀了！杀了他啊啊啊啊！我要杀了他啊啊啊啊啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7856',
        any: [/PRINTFORMW 崩坏了的%SAVESTR:TARGET%不停地哭泣哀嚎着………/],
      }, // PRINTFORMW 崩坏了的%SAVESTR:TARGET%不停地哭泣哀嚎着…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7859',
        any: [/PRINTFORMW 「呵呵呵、生下了你的孩子…我好幸福啊………」/],
      }, // PRINTFORMW 「呵呵呵、生下了你的孩子…我好幸福啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7860',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱起你的孩子幸福的笑了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%抱起你的孩子幸福的笑了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7863',
        any: [/PRINTFORMW 「哈啊哈啊…终于生出来了………」/],
      }, // PRINTFORMW 「哈啊哈啊…终于生出来了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7865',
        any: [/CFLAG:272 = 1/],
      }, // CFLAG:272 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7869',
        any: [
          /PRINTFORMW 「啊啊——！杀了！杀了他啊啊啊啊！我要杀了他啊啊啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊——！杀了！杀了他啊啊啊啊！我要杀了他啊啊啊啊啊啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7870',
        any: [/PRINTFORMW 崩坏了的%SAVESTR:TARGET%不停地哭泣哀嚎着………/],
      }, // PRINTFORMW 崩坏了的%SAVESTR:TARGET%不停地哭泣哀嚎着…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7873',
        any: [/PRINTFORMW 「呵呵呵、生下了你的孩子…我好幸福啊………」/],
      }, // PRINTFORMW 「呵呵呵、生下了你的孩子…我好幸福啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7874',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱起你的孩子幸福的笑了………/],
      }, // PRINTFORMW %SAVESTR:TARGET%抱起你的孩子幸福的笑了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7877',
        any: [/PRINTFORMW 「哈啊哈啊…终于生出来了………」/],
      }, // PRINTFORMW 「哈啊哈啊…终于生出来了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7879',
        any: [/CFLAG:272 = 1/],
      }, // CFLAG:272 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7890',
        any: [/PRINTFORMW 「啊啦、是不是来看我变大的肚子来了？」/],
      }, // PRINTFORMW 「啊啦、是不是来看我变大的肚子来了？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7891',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抚摸着因为接近临盆而大大的膨胀起来的肚子………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%抚摸着因为接近临盆而大大的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7894',
        any: [/PRINTFORMW 「呵呵呵、这孩子精神过头得有些麻烦哦」/],
      }, // PRINTFORMW 「呵呵呵、这孩子精神过头得有些麻烦哦」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7895',
        any: [/PRINTFORMW %SAVESTR:TARGET%哄着孩子………/],
      }, // PRINTFORMW %SAVESTR:TARGET%哄着孩子………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7898',
        any: [/CFLAG:273 = 1/],
      }, // CFLAG:273 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7907',
        any: [/PRINTFORMW 「啊啊、我可爱的孩子离开了………」/],
      }, // PRINTFORMW 「啊啊、我可爱的孩子离开了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7909',
        any: [/CFLAG:274 = 1/],
      }, // CFLAG:274 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7919',
        any: [/PRINTFORMW 「死在这里也…是命运吧………」/],
      }, // PRINTFORMW 「死在这里也…是命运吧………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7922',
        any: [/PRINTFORMW 「我不想死在…这里…啊…」/],
      }, // PRINTFORMW 「我不想死在…这里…啊…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7932-7933',
        any: [/;それ以外/],
      }, // ;それ以外
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7935-7939',
        any: [/;--------------------------------------------------/],
      }, // ;---------------------------------------
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7942',
        any: [/TFLAG:13 = 0/],
      }, // TFLAG:13 = 0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7975-7992',
        any: [/@DUNGEON_RYOUZYOKU_K7/],
      }, // @DUNGEON_RYOUZYOKU_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7982',
        any: [/PRINTFORMW 「能夺走我处女的幸运儿会是谁呢？」/],
      }, // PRINTFORMW 「能夺走我处女的幸运儿会是谁呢？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7983',
        any: [/PRINTFORMW %SAVESTR:TARGET%虽然败北了却还是露出着余裕的态度………/],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然败北了却还是露出着余裕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7986',
        any: [/PRINTFORMW 「呵呵呵、窝在这种地方输了呢…来吧、随便侵犯吧」/],
      }, // PRINTFORMW 「呵呵呵、窝在这种地方输了呢…来吧、随便侵犯吧」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7987',
        any: [/PRINTFORMW %SAVESTR:TARGET%虽然败北了却还是露出着余裕的态度………/],
      }, // PRINTFORMW %SAVESTR:TARGET%虽然败北了却还是露出着余裕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '7993-8048',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K7/],
      }, // @DUNGEON_RYOUZYOKU_AFTER_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8000',
        any: [
          /PRINTFORMW 「哦唔！ 因为我的处女是再生处女膜的假货而不出手是什么意思！？」/,
        ],
      }, // PRINTFORMW 「哦唔！ 因为我的处女是再生处女膜的假货而不出手是什么意思
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8001',
        any: [/PRINT 作为代替/],
      }, // PRINT 作为代替
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8004',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被彻底侵犯，逆流出了分不清是精液还是粘液的液体。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门被彻底侵犯，逆流出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8005',
        any: [/PRINTFORMW 「啊嗯…只侵犯肛门…你们真的很喜欢这种玩法呢………」/],
      }, // PRINTFORMW 「啊嗯…只侵犯肛门…你们真的很喜欢这种玩法呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8009-8010',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液和粘液，变成了像面膜一样的状态。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8010',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液和粘液，变成了像面膜一样的状态。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8011',
        any: [
          /PRINTFORMW 「明明全都让我喝掉就好了…为什么大家都要浇在脸上呢…？」/,
        ],
      }, // PRINTFORMW 「明明全都让我喝掉就好了…为什么大家都要浇在脸上呢…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8015-8016',
        any: [/PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」/],
      }, // PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8016',
        any: [/PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」/],
      }, // PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8017',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把精液和粘液晕倒嘴里咕噜咕噜的咀嚼着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把精液和粘液晕倒嘴里咕噜咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8021',
        any: [/PRINTFORMW 「呵呵呵…果然这样太激烈了…稍微有些直不起腰来了………」/],
      }, // PRINTFORMW 「呵呵呵…果然这样太激烈了…稍微有些直不起腰来了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8022',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想要站起来，但因为激烈的凌辱而像刚出生的小鹿一样腰腿不停的颤抖着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%想要站起来，但因为激烈的凌
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8025',
        any: [/PRINTFORMW 「啊啊…真的好激烈啊…我好想快上瘾了啊…♪」/],
      }, // PRINTFORMW 「啊啊…真的好激烈啊…我好想快上瘾了啊…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8026',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%的腔口里你流出了分不清是怪物们的精液还是粘液的液体。/,
        ],
      }, // PRINTFORMW 从%SAVESTR:TARGET%的腔口里你流出了分不清是
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8030',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被彻底侵犯，逆流出了分不清是精液还是粘液的液体。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的肛门被彻底侵犯，逆流出了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8031',
        any: [/PRINTFORMW 「啊嗯…只侵犯肛门…你们真的很喜欢这种玩法呢………」/],
      }, // PRINTFORMW 「啊嗯…只侵犯肛门…你们真的很喜欢这种玩法呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8035-8036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液和粘液，变成了像面膜一样的状态。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液和粘液，变成了像面膜一样的状态。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的脸上被浇满了怪物们的精液
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8037',
        any: [
          /PRINTFORMW 「明明全都让我喝掉就好了…为什么大家都要浇在脸上呢…？」/,
        ],
      }, // PRINTFORMW 「明明全都让我喝掉就好了…为什么大家都要浇在脸上呢…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8041-8042',
        any: [/PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」/],
      }, // PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8042',
        any: [/PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」/],
      }, // PRINTFORMW 「唔呵呵…人类的所无法相比的浓稠…真好吃啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8043',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把精液和粘液晕倒嘴里咕噜咕噜的咀嚼着………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%把精液和粘液晕倒嘴里咕噜咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8049-8149',
        any: [/@BENKI_KOUJO_K7/],
      }, // @BENKI_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8058',
        any: [
          /PRINTFORMW 「啊啊…被这种污秽的肉棒侵犯让人根本停不下来啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…被这种污秽的肉棒侵犯让人根本停不下来啊…%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8061',
        any: [
          /PRINTFORMW 「嗯…啊嗯…啊啊…可以自由使用我的身体的明明只有魔王大人…嗯…啊嗯」/,
        ],
      }, // PRINTFORMW 「嗯…啊嗯…啊啊…可以自由使用我的身体的明明只有魔王大人…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8064',
        any: [
          /PRINTFORMW 「哈啊哈…啊嗯！温柔一点、请不要这么粗暴的对待我的身体…嗯…啊嗯！」/,
        ],
      }, // PRINTFORMW 「哈啊哈…啊嗯！温柔一点、请不要这么粗暴的对待我的身体…嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8067',
        any: [/PRINTFORMW 「好、好脏…好臭！不…不要啊啊啊啊啊…咦…咦——————！」/],
      }, // PRINTFORMW 「好、好脏…好臭！不…不要啊啊啊啊啊…咦…咦——————！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8073',
        any: [
          /PRINTFORMW 「啊啊啊…女子之间最棒了啊…嗯啊啊嗯…请继续侵犯我吧…♪」/,
        ],
      }, // PRINTFORMW 「啊啊啊…女子之间最棒了啊…嗯啊啊嗯…请继续侵犯我吧…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8076',
        any: [/PRINTFORMW 「啊…啊啊啊…不要…不要啊…嗯咦…嗯咕…嗯咕呜呜！」/],
      }, // PRINTFORMW 「啊…啊啊啊…不要…不要啊…嗯咦…嗯咕…嗯咕呜呜！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8077',
        any: [/PRINTFORMW %SAVESTR:TARGET%被强行压住喝着小便………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被强行压住喝着小便………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8080',
        any: [
          /PRINTFORMW 「哈啊哈啊…嗯…是的、姐、姐姐大人…我会好好奉仕的…所以请不要再打了………」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…嗯…是的、姐、姐姐大人…我会好好奉仕的…所以请
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8083',
        any: [
          /PRINTFORMW 「啊啊——！我、被做这种事…别以为就这样…不…不要啊————！」/,
        ],
      }, // PRINTFORMW 「啊啊——！我、被做这种事…别以为就这样…不…不要啊———
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8089',
        any: [
          /PRINTFORMW 「啊啊嗯啊嗯啊啊嗯♪野狗的肉棒最棒了啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯啊嗯啊啊嗯♪野狗的肉棒最棒了啊…啊啊啊%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8092',
        any: [
          /PRINTFORMW 「对不起魔王大人…我的身体被野狗侵犯变得污秽了啊…咦…啊咦」/,
        ],
      }, // PRINTFORMW 「对不起魔王大人…我的身体被野狗侵犯变得污秽了啊…咦…啊咦
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8095',
        any: [
          /PRINTFORMW 「咕…啊…啊啊…咦…啊啊啊！啊嗯啊…啊啊…再继续的话…我要…啊啊——！」/,
        ],
      }, // PRINTFORMW 「咕…啊…啊啊…咦…啊啊啊！啊嗯啊…啊啊…再继续的话…我要
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8098',
        any: [/PRINTFORMW 「咦…只有被野兽侵犯…啊啊！不要！不要啊啊啊啊啊！」/],
      }, // PRINTFORMW 「咦…只有被野兽侵犯…啊啊！不要！不要啊啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8104',
        any: [
          /PRINTFORMW 「哈啊哈啊…双穴同时被插最棒了啊…%UNICODE\(0x2661\) \*1% 啊嗯…精液要流出来了…♪」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…双穴同时被插最棒了啊…%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8107',
        any: [
          /PRINTFORMW 「这么污秽的我…可以得到魔王大人的宠爱吗…啊啊啊啊………」/,
        ],
      }, // PRINTFORMW 「这么污秽的我…可以得到魔王大人的宠爱吗…啊啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8110',
        any: [/PRINTFORMW 「哈啊哈啊…下半身快没有感觉了啊…嗯啊啊…啊嗯………」/],
      }, // PRINTFORMW 「哈啊哈啊…下半身快没有感觉了啊…嗯啊啊…啊嗯………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8113',
        any: [/PRINTFORMW 「我会老实的、所以请再温柔一点吧………呜呜呜………」/],
      }, // PRINTFORMW 「我会老实的、所以请再温柔一点吧………呜呜呜………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8119',
        any: [
          /PRINTFORMW 「啊啊嗯…请继续将精液射在肉便器的%SAVESTR:TARGET%里吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…请继续将精液射在肉便器的%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8122',
        any: [/PRINTFORMW 「啊啊…不要射在里面啊…这样的话我会怀孕的………」/],
      }, // PRINTFORMW 「啊啊…不要射在里面啊…这样的话我会怀孕的………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8125',
        any: [/PRINTFORMW 「哈啊哈啊…这、这样就满足了吗？　啊啊…哈啊哈啊………」/],
      }, // PRINTFORMW 「哈啊哈啊…这、这样就满足了吗？　啊啊…哈啊哈啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8128',
        any: [/PRINTFORMW 「啊啊啊啊…为什么只有我这样………」/],
      }, // PRINTFORMW 「啊啊啊啊…为什么只有我这样………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8134',
        any: [
          /PRINTFORMW 「啊啊嗯！不止肛门，也请使用小穴吧！小穴好寂寞啊！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯！不止肛门，也请使用小穴吧！小穴好寂寞啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8137',
        any: [/PRINTFORMW 「不净的血被侵犯…而感到高兴什么的…我…啊啊啊………」/],
      }, // PRINTFORMW 「不净的血被侵犯…而感到高兴什么的…我…啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8140',
        any: [
          /PRINTFORMW 「啊嗯…我、我是…屁股…肛门会有感觉的变态便器啊…………唔唔唔」/,
        ],
      }, // PRINTFORMW 「啊嗯…我、我是…屁股…肛门会有感觉的变态便器啊…………唔
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8143',
        any: [
          /PRINTFORMW 「啊啊啊啊…我的肛门要…坏…坏掉了啊…啊啊…啊啊啊啊………」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊…我的肛门要…坏…坏掉了啊…啊啊…啊啊啊啊………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8150-8173',
        any: [/@DUNGEON_VICTORY_K7/],
      }, // @DUNGEON_VICTORY_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8156',
        any: [/PRINTFORMW 「成为了不错的消遣呢」/],
      }, // PRINTFORMW 「成为了不错的消遣呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8158',
        any: [/PRINTFORMW 「在我的强大面前没有什么解决不了的」/],
      }, // PRINTFORMW 「在我的强大面前没有什么解决不了的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8160',
        any: [/PRINTFORMW 「嘛、理所当然的结果呢」/],
      }, // PRINTFORMW 「嘛、理所当然的结果呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8165',
        any: [/PRINTFORMW 「果然胡来的稍微有些过分了呢………」/],
      }, // PRINTFORMW 「果然胡来的稍微有些过分了呢………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8166',
        any: [/PRINTFORMW %SAVESTR:TARGET%坐了下来休息着………/],
      }, // PRINTFORMW %SAVESTR:TARGET%坐了下来休息着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8169',
        any: [/PRINTFORMW 「呼、真是没有像样的对手呢」/],
      }, // PRINTFORMW 「呼、真是没有像样的对手呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8174-8205',
        any: [/@DUNGEON_ATTACK_K7/],
      }, // @DUNGEON_ATTACK_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8182',
        any: [/PRINTFORMW 「觉悟吧！」/],
      }, // PRINTFORMW 「觉悟吧！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8184',
        any: [/PRINTFORMW 「参上！」/],
      }, // PRINTFORMW 「参上！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8186',
        any: [/PRINTFORMW 「吃我一记！」/],
      }, // PRINTFORMW 「吃我一记！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8191',
        any: [/PRINTFORMW 「你也会被魔王大人抱吗～？」/],
      }, // PRINTFORMW 「你也会被魔王大人抱吗～？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8193',
        any: [/PRINTFORMW 「来吧来吧、早点投降吧！」/],
      }, // PRINTFORMW 「来吧来吧、早点投降吧！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8195',
        any: [/PRINTFORMW 「你想赢我？」/],
      }, // PRINTFORMW 「你想赢我？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8206-8349',
        any: [/@COLOSSEUM_KOJO_7/],
      }, // @COLOSSEUM_KOJO_7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8213',
        any: [/PRINTFORMW %SAVESTR:TARGET%连站起来的气力都没有了……/],
      }, // PRINTFORMW %SAVESTR:TARGET%连站起来的气力都没有了……
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8215',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为死斗场里热闹的气氛和被对战对手盯着而害怕的发着抖……/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为死斗场里热闹的气氛和被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8227',
        any: [/PRINTFORMW 「怎么这样、这不是游戏吗…？」/],
      }, // PRINTFORMW 「怎么这样、这不是游戏吗…？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8228',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%打倒在地、舔着死斗场的地面………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8230',
        any: [/PRINTFORMW 「咦！咦…不、不要靠近我啊…啊…啊啊啊啊！」/],
      }, // PRINTFORMW 「咦！咦…不、不要靠近我啊…啊…啊啊啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8231',
        any: [/PRINTFORMW %SAVESTR:TARGET%被折腾着、彻底没有了气力………/],
      }, // PRINTFORMW %SAVESTR:TARGET%被折腾着、彻底没有了气力…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8236',
        any: [/PRINTFORMW 「呐、呐…真的会手下留情吧？只是游戏对吧？」/],
      }, // PRINTFORMW 「呐、呐…真的会手下留情吧？只是游戏对吧？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8237',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%咧嘴笑着，望向失去力量的%SAVESTR:TARGET%………/,
        ],
      }, // PRINTFORMW %SAVESTR:ASSI%咧嘴笑着，望向失去力量的%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8239',
        any: [
          /PRINTFORMW 「这个等级的怪物的话我明明能一边哼着歌一边杀掉的…！」/,
        ],
      }, // PRINTFORMW 「这个等级的怪物的话我明明能一边哼着歌一边杀掉的…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8240',
        any: [
          /PRINTFORMW 失去力量的%SAVESTR:TARGET%带着一脸后悔的扭曲表情和怪物对峙着………/,
        ],
      }, // PRINTFORMW 失去力量的%SAVESTR:TARGET%带着一脸后悔的扭
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8252',
        any: [/PRINTFORMW 「哈啊…哈啊…嗯…嗯唔…嗯啾…嗯咕…嗯啾啾…」/],
      }, // PRINTFORMW 「哈啊…哈啊…嗯…嗯唔…嗯啾…嗯咕…嗯啾啾…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8253',
        any: [/PRINTFORMW 「绝…绝饶不了你…嗯咕！？」/],
      }, // PRINTFORMW 「绝…绝饶不了你…嗯咕！？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8254',
        any: [/PRINTFORM %SAVESTR:ASSI%因为/],
      }, // PRINTFORM %SAVESTR:ASSI%因为
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8256',
        any: [/PRINT 肉棒/],
      }, // PRINT 肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8258',
        any: [/PRINT 假阴茎/],
      }, // PRINT 假阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8259',
        any: [/PRINTFORMW 被%SAVESTR:TARGET%舔着而露出了心旷神怡的额表情……/],
      }, // PRINTFORMW 被%SAVESTR:TARGET%舔着而露出了心旷神怡的额
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8261',
        any: [/PRINTFORMW 「嗯…好臭…好臭…嗯咕…啾………」/],
      }, // PRINTFORMW 「嗯…好臭…好臭…嗯咕…啾………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8262',
        any: [/PRINTFORMW %SAVESTR:TARGET%吞下了发出着令人作呕的气味的阴茎……/],
      }, // PRINTFORMW %SAVESTR:TARGET%吞下了发出着令人作呕的气味
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8272',
        any: [/PRINTFORMW 「哈啊哈啊…嗯…啊啊…好、好痛啊…啊唔！」/],
      }, // PRINTFORMW 「哈啊哈啊…嗯…啊啊…好、好痛啊…啊唔！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8273',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%抓住了胸部。/],
      }, // PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASS
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8274',
        any: [
          /PRINTFORMW 然后%SAVESTR:ASSI%为了让观众们看而开始揉起了丰满的胸部………/,
        ],
      }, // PRINTFORMW 然后%SAVESTR:ASSI%为了让观众们看而开始揉起了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8276',
        any: [/PRINTFORMW 「啊啊…好、好痛啊…啊咦咦咦咦！」/],
      }, // PRINTFORMW 「啊啊…好、好痛啊…啊咦咦咦咦！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8277',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为丰满的胸部想要被握碎了一样的揉着而发出了悲鸣。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为丰满的胸部想要被握碎了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8278',
        any: [/PRINTFORMW 那苦闷的声音让死斗场的观众们的欢呼声更高了………/],
      }, // PRINTFORMW 那苦闷的声音让死斗场的观众们的欢呼声更高了………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8288',
        any: [/PRINTFORMW 「啊啊——！咦…咦——！我、我…这样…啊啊——！」/],
      }, // PRINTFORMW 「啊啊——！咦…咦——！我、我…这样…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8289',
        any: [/PRINTFORM %SAVESTR:ASSI%一边听着%SAVESTR:TARGET%的悲鸣一边用/],
      }, // PRINTFORM %SAVESTR:ASSI%一边听着%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8291',
        any: [/PRINT 肉棒/],
      }, // PRINT 肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8293',
        any: [/PRINT 假阴茎/],
      }, // PRINT 假阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8294',
        any: [/PRINTFORMW 继续毫不留情的蹂躏着%SAVESTR:TARGET%的小穴。/],
      }, // PRINTFORMW 继续毫不留情的蹂躏着%SAVESTR:TARGET%的小穴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8295',
        any: [/PRINTFORMW 随着%SAVESTR:TARGET%发出的悲鸣，观众们沸腾着………/],
      }, // PRINTFORMW 随着%SAVESTR:TARGET%发出的悲鸣，观众们沸腾
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8298',
        any: [
          /PRINTFORMW 「咦————！咕咦——…噶…唔哦…咕哦哦哦哦…咯…咦————————！」/,
        ],
      }, // PRINTFORMW 「咦————！咕咦——…噶…唔哦…咕哦哦哦哦…咯…咦———
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8299',
        any: [
          /PRINTFORMW 悲惨的%SAVESTR:TARGET%发出着被踩死的青蛙一样的声音，就那样被巨魔插着。/,
        ],
      }, // PRINTFORMW 悲惨的%SAVESTR:TARGET%发出着被踩死的青蛙一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8300',
        any: [/PRINTFORMW 观众们站了起来、沸腾着………/],
      }, // PRINTFORMW 观众们站了起来、沸腾着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8302',
        any: [/PRINTFORMW 「先、先再弄湿一点啊…啊…啊啊！哇…咦…呜咕！」/],
      }, // PRINTFORMW 「先、先再弄湿一点啊…啊…啊啊！哇…咦…呜咕！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8303',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被怪物从后面侵犯而不停地悲鸣着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被怪物从后面侵犯而不停
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8304',
        any: [/PRINTFORMW 观众们站了起来、沸腾着………/],
      }, // PRINTFORMW 观众们站了起来、沸腾着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8315',
        any: [
          /PRINTFORMW 「啊哦…啊啊…如果你有人类的心的话…就稍微温柔一点…啊啊啊…咦…啊咕！」/,
        ],
      }, // PRINTFORMW 「啊哦…啊啊…如果你有人类的心的话…就稍微温柔一点…啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8316',
        any: [/PRINTFORM %SAVESTR:ASSI%一边听着%SAVESTR:TARGET%的悲鸣一边用/],
      }, // PRINTFORM %SAVESTR:ASSI%一边听着%SAVESTR:TAR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8318',
        any: [/PRINT 肉棒/],
      }, // PRINT 肉棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8320',
        any: [/PRINT 假阴茎/],
      }, // PRINT 假阴茎
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8321',
        any: [/PRINTFORMW 继续毫不留情的蹂躏着%SAVESTR:TARGET%的小穴。/],
      }, // PRINTFORMW 继续毫不留情的蹂躏着%SAVESTR:TARGET%的小穴
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8322',
        any: [/PRINTFORMW 随着%SAVESTR:TARGET%发出的悲鸣，观众们沸腾着………/],
      }, // PRINTFORMW 随着%SAVESTR:TARGET%发出的悲鸣，观众们沸腾
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8325',
        any: [
          /PRINTFORMW 「咳咳…肛门要…坏掉了啊…啊啊啊啊…咕咦咦咦咦咦——————————！」/,
        ],
      }, // PRINTFORMW 「咳咳…肛门要…坏掉了啊…啊啊啊啊…咕咦咦咦咦咦—————
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8326',
        any: [
          /PRINTFORMW 悲惨的%SAVESTR:TARGET%发出着被踩死的青蛙一样的声音，用肛门接受着巨魔巨大的阴茎。/,
        ],
      }, // PRINTFORMW 悲惨的%SAVESTR:TARGET%发出着被踩死的青蛙一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8327',
        any: [
          /PRINTFORMW 肛门好像被彻底破坏了一样扩张着、终于%SAVESTR:TARGET%口吐白沫了。/,
        ],
      }, // PRINTFORMW 肛门好像被彻底破坏了一样扩张着、终于%SAVESTR:TA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8328',
        any: [/PRINTFORMW 观众们看到%SAVESTR:TARGET%这个样子、沸腾了………/],
      }, // PRINTFORMW 观众们看到%SAVESTR:TARGET%这个样子、沸腾了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8330',
        any: [/PRINTFORMW 「啊啊——！坏掉了要坏掉了啊…啊咦————！」/],
      }, // PRINTFORMW 「啊啊——！坏掉了要坏掉了啊…啊咦————！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8331',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被怪物从后面侵犯肛门而不停地悲鸣着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%因为被怪物从后面侵犯肛门而
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8332',
        any: [/PRINTFORMW 观众们站了起来、沸腾着………/],
      }, // PRINTFORMW 观众们站了起来、沸腾着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8341',
        any: [/PRINTFORMW 「咦…这个史莱姆是…一坨…媚药…啊…啊啊…咕…啊啊啊嗯！」/],
      }, // PRINTFORMW 「咦…这个史莱姆是…一坨…媚药…啊…啊啊…咕…啊啊啊嗯！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8350-8538',
        any: [/@NTR_KOUJO_K7/],
      }, // @NTR_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8354',
        any: [/CFLAG:650 = 1/],
      }, // CFLAG:650 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8360',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被分开着双腿绑住了脚腕，在她身边能看见吊起她的狂王。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被分开着双腿绑住了脚腕，在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8362',
        any: [/PRINT 然后、狂王的巨根/],
      }, // PRINT 然后、狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8364',
        any: [/PRINT 然后、特大号按摩棒/],
      }, // PRINT 然后、特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8366',
        any: [
          /PRINTFORMW 慢慢的插进了%SAVESTR:TARGET%的秘裂。在镜头里能看见%SAVESTR:TARGET%的蜜壶被深深的贯穿了。/,
        ],
      }, // PRINTFORMW 慢慢的插进了%SAVESTR:TARGET%的秘裂。在镜头
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8367',
        any: [
          /PRINTFORMW 「本来应该献给魔王大人的处女被夺走了…对不起…对不起…啊啊——！」/,
        ],
      }, // PRINTFORMW 「本来应该献给魔王大人的处女被夺走了…对不起…对不起…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8368',
        any: [
          /PRINTFORMW 听到哭叫着的%SAVESTR:TARGET%的声音的狂王细致的动着腰侵犯着%SAVESTR:TARGET%的蜜壶。/,
        ],
      }, // PRINTFORMW 听到哭叫着的%SAVESTR:TARGET%的声音的狂王细
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8369',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%绝顶的时候，狂王回过头看向这边、向着摄像头微微一笑，水晶球的影像就关闭了………/,
        ],
      }, // PRINTFORMW 然后%SAVESTR:TARGET%绝顶的时候，狂王回过头
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8371',
        any: [/PRINTFORMW 「啊啊嗯…狂王大人连我第二个处女都夺走了啊…♪」/],
      }, // PRINTFORMW 「啊啊嗯…狂王大人连我第二个处女都夺走了啊…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8372',
        any: [
          /PRINTFORMW 水晶球中的%SAVESTR:TARGET%带着对恋人撒娇一样的表情被狂王抱住侵犯着。/,
        ],
      }, // PRINTFORMW 水晶球中的%SAVESTR:TARGET%带着对恋人撒娇一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8373',
        any: [
          /PRINTFORMW 「唔呵呵、那个魔王在考虑什么啊…啊嗯…把我的处女膜再生了…啊啊…再次被狂王大人夺走我的处女好幸福啊♪」/,
        ],
      }, // PRINTFORMW 「唔呵呵、那个魔王在考虑什么啊…啊嗯…把我的处女膜再生了…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8375',
        any: [/PRINT 狂王的巨根/],
      }, // PRINT 狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8377',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8379',
        any: [
          /PRINTFORMW 深深的插入了%SAVESTR:TARGET%的蜜壶、破瓜之血顺着大腿流了下来………/,
        ],
      }, // PRINTFORMW 深深的插入了%SAVESTR:TARGET%的蜜壶、破瓜之
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8381',
        any: [/CFLAG:651 = 1/],
      }, // CFLAG:651 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8385',
        any: [/PRINTFORMW 「啊嗯…唔…啊啊…！肛门…咦！啊…啊嗯…啊啊…啊啊——！」/],
      }, // PRINTFORMW 「啊嗯…唔…啊啊…！肛门…咦！啊…啊嗯…啊啊…啊啊——！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8388',
        any: [/PRINTFORM %SAVESTR:TARGET%被开发了的肛门轻易地吞下了/],
      }, // PRINTFORM %SAVESTR:TARGET%被开发了的肛门轻易地吞下了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8390',
        any: [/PRINT 狂王的巨根/],
      }, // PRINT 狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8392',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8394',
        any: [/PRINTFORMW 、%SAVESTR:TARGET%开始发出了呻吟声。/],
      }, // PRINTFORMW 、%SAVESTR:TARGET%开始发出了呻吟声。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8395',
        any: [
          /PRINTFORMW 「啊啊…哈啊哈啊…啊嗯…啊啊…不、不行啊…啊啊…明明…不能有感觉…啊咦！」/,
        ],
      }, // PRINTFORMW 「啊啊…哈啊哈啊…啊嗯…啊啊…不、不行啊…啊啊…明明…不能
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8396',
        any: [
          /PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%的肛门被用各种各样的体位侵犯直到绝顶………/,
        ],
      }, // PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%的肛门被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8398',
        any: [/PRINTFORM %SAVESTR:TARGET%的肛门吞下了/],
      }, // PRINTFORM %SAVESTR:TARGET%的肛门吞下了
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8400',
        any: [/PRINT 狂王的巨根/],
      }, // PRINT 狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8402',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8404',
        any: [/PRINTFORMW 、%SAVESTR:TARGET%因为强烈的苦痛而悲鸣着。/],
      }, // PRINTFORMW 、%SAVESTR:TARGET%因为强烈的苦痛而悲鸣着。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8405',
        any: [/PRINTFORMW 「啊啊——…快停下…快停下啊…狂王…大人！」/],
      }, // PRINTFORMW 「啊啊——…快停下…快停下啊…狂王…大人！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8406',
        any: [
          /PRINTFORMW  水晶球的影像收录了%SAVESTR:TARGET%的肛门被用各种各样的体位侵犯直到气绝………/,
        ],
      }, // PRINTFORMW  水晶球的影像收录了%SAVESTR:TARGET%的肛门
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8409',
        any: [
          /PRINTFORMW 「呼哇啊啊啊…啊嗯…啊啊嗯…被狂王大人侵犯肛门好棒啊…♪」/,
        ],
      }, // PRINTFORMW 「呼哇啊啊啊…啊嗯…啊啊嗯…被狂王大人侵犯肛门好棒啊…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8411',
        any: [/PRINT 狂王的巨根/],
      }, // PRINT 狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8413',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8415',
        any: [
          /PRINTFORMW 插进了%SAVESTR:TARGET%的肛门、%SAVESTR:TARGET%发出娇喘取悦着狂王………/,
        ],
      }, // PRINTFORMW 插进了%SAVESTR:TARGET%的肛门、%SAVES
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8417',
        any: [/CFLAG:652 = 1/],
      }, // CFLAG:652 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8421',
        any: [
          /PRINTFORMW 「啊啊嗯%UNICODE\(0x2661\) \*1% 狗大人的肉棒…最棒了啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯%UNICODE(0x2661) *1% 狗大人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8422',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被周围的观众嘲笑着、沉浸在了被狗侵犯的快感里………/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被周围的观众嘲笑着、沉浸在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8424',
        any: [
          /PRINTFORMW 「哈啊哈啊…咦…嗯…啊…啊啊…这样处置我什么的…啊…啊啊——！」/,
        ],
      }, // PRINTFORMW 「哈啊哈啊…咦…嗯…啊…啊啊…这样处置我什么的…啊…啊啊—
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8425',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被周围的观众嘲笑着、因为被狗侵犯而流下了眼泪。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被周围的观众嘲笑着、因为被
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8426',
        any: [
          /PRINTFORMW 水晶球的影像里，她的胎内被狗不停的大量射精直到气绝………/,
        ],
      }, // PRINTFORMW 水晶球的影像里，她的胎内被狗不停的大量射精直到气绝………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8428',
        any: [
          /PRINTFORMW 「处、处罚什么的、怎么这样！…啊…咦…咦——…狗的肉棒啊…啊…啊啊啊——！」/,
        ],
      }, // PRINTFORMW 「处、处罚什么的、怎么这样！…啊…咦…咦——…狗的肉棒啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8429',
        any: [/PRINTFORMW 狂王的亲卫队长被兽奸的样子让周围的观众们欢呼着………/],
      }, // PRINTFORMW 狂王的亲卫队长被兽奸的样子让周围的观众们欢呼着………
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8431',
        any: [/CFLAG:653 = 1/],
      }, // CFLAG:653 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8436',
        any: [
          /PRINTFORMW 「嗯吼哦哦哦哦哦%UNICODE\(0x2661\) \*1% 小穴小穴好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯吼哦哦哦哦哦%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8437',
        any: [
          /PRINTFORM 虽然因为完全变成性爱狂的%SAVESTR:TARGET%而困惑着，但还是用/,
        ],
      }, // PRINTFORM 虽然因为完全变成性爱狂的%SAVESTR:TARGET%而困
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8439',
        any: [/PRINT 他的巨根/],
      }, // PRINT 他的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8441',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8443',
        any: [
          /PRINTFORMW 不停地侵犯着%SAVESTR:TARGET%的蜜壶。然后随着抽送%SAVESTR:TARGET%发出着野兽一样的呻吟声。/,
        ],
      }, // PRINTFORMW 不停地侵犯着%SAVESTR:TARGET%的蜜壶。然后随
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8444',
        any: [
          /PRINTFORMW 「哦哦哦哦吼…继续…继续侵犯我吧狂王大人啊啊——%UNICODE\(0x2661\) \*1% 啊啊————%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哦哦哦哦吼…继续…继续侵犯我吧狂王大人啊啊——%UNIC
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8445',
        any: [
          /PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%被侵犯好几个小时，最后气绝了………/,
        ],
      }, // PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%被侵犯好
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8448',
        any: [
          /PRINTFORMW 「啊啊…嗯…哈啊…这么…温柔的抱我抱我什么的優…我…已经…啊…啊啊！」/,
        ],
      }, // PRINTFORMW 「啊啊…嗯…哈啊…这么…温柔的抱我抱我什么的優…我…已经…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8450',
        any: [/PRINT 狂王的巨根/],
      }, // PRINT 狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8452',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8454',
        any: [
          /PRINTFORMW 不停的侵犯着%SAVESTR:TARGET%的蜜壶、%SAVESTR:TARGET%发出了甜美的呻吟。/,
        ],
      }, // PRINTFORMW 不停的侵犯着%SAVESTR:TARGET%的蜜壶、%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8455',
        any: [
          /PRINTFORMW 「哈…啊…啊啊…我…啊嗯是的…我就这样每天被魔王大人…啊嗯啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「哈…啊…啊啊…我…啊嗯是的…我就这样每天被魔王大人…啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8456',
        any: [
          /PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%被狂王抱着、绝顶了好几次的样子………/,
        ],
      }, // PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%被狂王抱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8458',
        any: [/PRINTFORMW 「啊嗯啊…太、太激烈了啊、啊嗯啊…啊…呼哇啊啊啊………」/],
      }, // PRINTFORMW 「啊嗯啊…太、太激烈了啊、啊嗯啊…啊…呼哇啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8460',
        any: [/PRINT 狂王的巨根/],
      }, // PRINT 狂王的巨根
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8462',
        any: [/PRINT 特大号按摩棒/],
      }, // PRINT 特大号按摩棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8464',
        any: [
          /PRINTFORMW 不停地侵犯着%SAVESTR:TARGET%的蜜穴、%SAVESTR:TARGET%呻吟着。/,
        ],
      }, // PRINTFORMW 不停地侵犯着%SAVESTR:TARGET%的蜜穴、%SA
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8465',
        any: [
          /PRINTFORMW 「啊啊用狂王大人的爱…把污秽的我净化吧…啊啊嗯啊哈啊啊啊」/,
        ],
      }, // PRINTFORMW 「啊啊用狂王大人的爱…把污秽的我净化吧…啊啊嗯啊哈啊啊啊」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8466',
        any: [
          /PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%被狂王抱着绝顶的样子………/,
        ],
      }, // PRINTFORMW 水晶球的影像收录了%SAVESTR:TARGET%被狂王抱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8468',
        any: [/CFLAG:654 = 1/],
      }, // CFLAG:654 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8473',
        any: [
          /PRINTFORMW 「啊啊啊啊…肉帮肉棒好多肉棒…啊啊啊啊…继续侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊啊…肉帮肉棒好多肉棒…啊啊啊啊…继续侵犯我吧%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8474',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被令人窒息的淫臭刺激着性爱狂的本能，叫喊着下流的话被侵犯着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被令人窒息的淫臭刺激着性爱
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8475',
        any: [
          /PRINTFORMW 「啊啊…啊哈…唔呼…来吧你也…你也…使用我的身体的那里都没关系呦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…啊哈…唔呼…来吧你也…你也…使用我的身体的那里都没
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8477',
        any: [
          /PRINTFORMW 「啊咕…好、激烈…！嗯…呼哇…啊啊…我要继续奉仕肉棒了啊…啊啊啊…啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊咕…好、激烈…！嗯…呼哇…啊啊…我要继续奉仕肉棒了啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8478',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边被插着两穴，一边舔着伸出来的不知道多少根阴茎。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%一边被插着两穴，一边舔着伸
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8479',
        any: [
          /PRINTFORMW 「嗯咕唔…嗯啾…就…啾…啊咕…哈呼…嗯…不论那根肉棒都好棒啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「嗯咕唔…嗯啾…就…啾…啊咕…哈呼…嗯…不论那根肉棒都好棒
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8481',
        any: [/PRINTFORMW 「哈啊哈啊…啊嗯…啊…啊啊——！这样、这样好厉害啊♪」/],
      }, // PRINTFORMW 「哈啊哈啊…啊嗯…啊…啊啊——！这样、这样好厉害啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8482',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的两穴被反复侵犯，黏糊糊的精液从秘裂和肛门里逆流了出来。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%的两穴被反复侵犯，黏糊糊的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8483',
        any: [
          /PRINTFORMW 水晶球的影像到全身被精液挂满的%SAVESTR:TARGET%的样子就完了………/,
        ],
      }, // PRINTFORMW 水晶球的影像到全身被精液挂满的%SAVESTR:TARGE
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8485',
        any: [/CFLAG:655 = 1/],
      }, // CFLAG:655 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8489',
        any: [
          /PRINTFORMW 「我、我是背叛狂王大人、像肮脏的魔王起誓忠诚的东西…但是从今天开始我会作为大家的公共厕所献上一生………%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「我、我是背叛狂王大人、像肮脏的魔王起誓忠诚的东西…但是从
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8490',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%只是因为那个台词就兴奋地咕噜咕噜的颤抖起来。然后抬高屁股像是在诱惑什么的左右摇动着。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%只是因为那个台词就兴奋地咕
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8491',
        any: [
          /PRINTFORMW 「啊啊嗯…大家的精液和小便都请尽情的撒在我身上啊…啊…啊啊万分感谢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯…大家的精液和小便都请尽情的撒在我身上啊…啊…啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8492',
        any: [
          /PRINTFORMW 抽签抽到了诶一个的男人从后面用阴茎贯穿了%SAVESTR:TARGET%。只是这样%SAVESTR:TARGET%就发出了好像高潮了一样的声音。/,
        ],
      }, // PRINTFORMW 抽签抽到了诶一个的男人从后面用阴茎贯穿了%SAVESTR:
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8493',
        any: [
          /PRINTFORMW 然后水晶球的影像一直持续到了成为了公共厕所的%SAVESTR:TARGET%吮吸精液、喝干小便全身都是脏东西的地方………/,
        ],
      }, // PRINTFORMW 然后水晶球的影像一直持续到了成为了公共厕所的%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8495',
        any: [
          /PRINTFORMW 「呵呵呵、今天的我是公共厕所哦…请使用我的身体发散大家的性欲吧…♪」/,
        ],
      }, // PRINTFORMW 「呵呵呵、今天的我是公共厕所哦…请使用我的身体发散大家的性
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8496',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，分开双腿诱惑着周围强壮的男人们。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，分开双腿诱惑着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8497',
        any: [
          /PRINTFORMW 听说能抱原亲卫队长的%SAVESTR:TARGET%的士兵们，聚集到了%SAVESTR:TARGET%这里。/,
        ],
      }, // PRINTFORMW 听说能抱原亲卫队长的%SAVESTR:TARGET%的士兵
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8498',
        any: [
          /PRINTFORMW 然后水晶球的影像一直持续到了成为了公共厕所的%SAVESTR:TARGET%吮吸精液、喝干小便全身都是脏东西的地方………/,
        ],
      }, // PRINTFORMW 然后水晶球的影像一直持续到了成为了公共厕所的%SAVEST
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8500',
        any: [/CFLAG:656 = 1/],
      }, // CFLAG:656 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8504',
        any: [
          /PRINTFORMW 「啊啊…果然我还是忘不了狂王大人啊…魔王大人就请忘了我，用那些被称作勇者的下等女人做对手吧…嗯」/,
        ],
      }, // PRINTFORMW 「啊啊…果然我还是忘不了狂王大人啊…魔王大人就请忘了我，用
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8505',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和狂王舌头缠绕在一起接吻着、就像是恋人一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%和狂王舌头缠绕在一起接吻着
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8506',
        any: [/PRINTFORMW 「啊啊…狂王大人…今天也请疼爱我吧………」/],
      }, // PRINTFORMW 「啊啊…狂王大人…今天也请疼爱我吧………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8507',
        any: [
          /PRINTFORMW 然后水晶球的影像在狂王和%SAVESTR:TARGET%交合的样子持续数十分钟后唐突的关闭了………/,
        ],
      }, // PRINTFORMW 然后水晶球的影像在狂王和%SAVESTR:TARGET%交
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8509',
        any: [/PRINTFORMW 「啊啊…我果然是狂王大人的爱人啊…心里是这么的满足♪」/],
      }, // PRINTFORMW 「啊啊…我果然是狂王大人的爱人啊…心里是这么的满足♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8510',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%笑了一下，和狂王舌头缠绕在一起接吻着、就像是恋人一样。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%笑了一下，和狂王舌头缠绕在
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8511',
        any: [/PRINTFORMW 「能疼爱我…谢谢您…狂王大人…♪」/],
      }, // PRINTFORMW 「能疼爱我…谢谢您…狂王大人…♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8512',
        any: [
          /PRINTFORMW 然后水晶球的影响在狂王和%SAVESTR:TARGET%再次接吻的地方结束了………/,
        ],
      }, // PRINTFORMW 然后水晶球的影响在狂王和%SAVESTR:TARGET%再
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8514',
        any: [/CFLAG:657 = 1/],
      }, // CFLAG:657 = 1
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8519',
        any: [
          /PRINTFORMW 「啊啊！这孩子是魔王大人的孩子、求你了！还给我！还给我狂王大人！」/,
        ],
      }, // PRINTFORMW 「啊啊！这孩子是魔王大人的孩子、求你了！还给我！还给我狂王
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8520',
        any: [
          /PRINTFORMW 看着拼命喊着的%SAVESTR:TARGET%，狂王微微一笑，把%SAVESTR:TARGET%生出来的孩子踢飞了。/,
        ],
      }, // PRINTFORMW 看着拼命喊着的%SAVESTR:TARGET%，狂王微微一
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8521',
        any: [/PRINTFORMW 「咦！为什么、为什么要做这种事！」/],
      }, // PRINTFORMW 「咦！为什么、为什么要做这种事！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8523',
        any: [
          /PRINTFORMW 「啊啊啊…我、我的出产秀怎么样啊魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊…我、我的出产秀怎么样啊魔王大人%UNICODE(
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8524',
        any: [/PRINTFORMW %SAVESTR:TARGET%通过镜头向%SAVESTR:PLAYER%说道。/],
      }, // PRINTFORMW %SAVESTR:TARGET%通过镜头向%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8525',
        any: [
          /PRINTFORMW 「接下来也…会被狂王大人不停的播种，多多的生孩子出来哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「接下来也…会被狂王大人不停的播种，多多的生孩子出来哦%U
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8528',
        any: [/PRINTFORMW %SAVESTR:TARGET%通过镜头向%SAVESTR:PLAYER%说道。/],
      }, // PRINTFORMW %SAVESTR:TARGET%通过镜头向%SAVESTR
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8529',
        any: [/PRINTFORMW 「哈…咦、我的肚子是啊…魔王大人的玩具啊♪」/],
      }, // PRINTFORMW 「哈…咦、我的肚子是啊…魔王大人的玩具啊♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8530',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被狂王在耳边说了什么，继续开始说道。/,
        ],
      }, // PRINTFORMW %SAVESTR:TARGET%被狂王在耳边说了什么，继续
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8531',
        any: [
          /PRINTFORMW 「今后也会为狂王大人不停地怀孕，多多的生孩子出来的～♪」/,
        ],
      }, // PRINTFORMW 「今后也会为狂王大人不停地怀孕，多多的生孩子出来的～♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8539-8555',
        any: [/@EXUCUTION_KOUJO_K7/],
      }, // @EXUCUTION_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8543',
        any: [
          /PRINTFORMW 「肉、肉便器？…我、我…要为怪物一直生孩子到死为止？…不、不要…放开我！我不要那样啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「肉、肉便器？…我、我…要为怪物一直生孩子到死为止？…不、
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8546',
        any: [/PRINTFORMW 「下达命令…主人………」/],
      }, // PRINTFORMW 「下达命令…主人………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8549',
        any: [/PRINTFORMW 「我居然被怪物们当做慰安妇………」/],
      }, // PRINTFORMW 「我居然被怪物们当做慰安妇………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8552-8555',
        any: [/;-----------------------------------/],
      }, // ;-----------------------------------
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8556-8590',
        any: [/@MUSEUM_KOUJO_K7/],
      }, // @MUSEUM_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8559',
        any: [/IF TFLAG:500 == 0/],
      }, // PRINTFORMW 「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8560',
        any: [
          /PRINTFORMW 「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…啊………」/,
        ],
      }, // PRINTFORMW 「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8563',
        any: [
          /PRINTFORMW 「要把活着的我制作成标本…？不、不要…请停止…不要啊啊啊啊！」/,
        ],
      }, // PRINTFORMW 「要把活着的我制作成标本…？不、不要…请停止…不要啊啊啊啊
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8565-8567',
        any: [/;人形化\(マネキン\)/],
      }, // ;人形化(マネキン)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8565',
        any: [/ELSEIF TFLAG:500 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8566-8567',
        any: [/;人形化\(マネキン\)/],
      }, // ;人形化(マネキン)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8569-8570',
        any: [/;人形化\(球体間接\)/],
      }, // ;人形化(球体間接)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8572-8573',
        any: [/;金属化/],
      }, // ;金属化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8575-8576',
        any: [/;氷像化/],
      }, // ;氷像化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8578-8579',
        any: [/;宝石化/],
      }, // ;宝石化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8581-8582',
        any: [/;家具化/],
      }, // ;家具化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8584-8585',
        any: [/;絵画封印/],
      }, // ;絵画封印
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8587-8590',
        any: [/;-----------------------------------/],
      }, // ;-----------------------------------
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8591-8615',
        any: [/@BANISHMENT_KOUJO_K7/],
      }, // @BANISHMENT_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8596',
        any: [/PRINTFORMW 「回不去了…狂王大人那里…已经回不去了………」/],
      }, // PRINTFORMW 「回不去了…狂王大人那里…已经回不去了………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8597',
        any: [/PRINTFORMW 失去了力量%SAVESTR:TARGET%之后去了哪里谁也不知道。/],
      }, // PRINTFORMW 失去了力量%SAVESTR:TARGET%之后去了哪里谁也
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8598',
        any: [
          /PRINTFORMW 有一种说法是边乞讨边流浪、最后乘着船在一次暴风雨中遇难了。/,
        ],
      }, // PRINTFORMW 有一种说法是边乞讨边流浪、最后乘着船在一次暴风雨中遇难了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8599',
        any: [
          /PRINTFORMW 还有一个说法是根本没有被流放、给魔王做了一辈子小杂活。/,
        ],
      }, // PRINTFORMW 还有一个说法是根本没有被流放、给魔王做了一辈子小杂活。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8600',
        any: [
          /PRINTFORMW 无论如何%SAVESTR:TARGET%在那以后都没有再出现在历史舞台上………/,
        ],
      }, // PRINTFORMW 无论如何%SAVESTR:TARGET%在那以后都没有再出
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8603-8604',
        any: [/;記憶消去/],
      }, // ;記憶消去
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8606-8607',
        any: [/;小動物化/],
      }, // ;小動物化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8609-8610',
        any: [/;元の生活に戻す/],
      }, // ;元の生活に戻す
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8612-8615',
        any: [/;-----------------------------------/],
      }, // ;-----------------------------------
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8616-8630',
        any: [/@PUBLIC_EXUCUTION_KOUJO_K7/],
      }, // @PUBLIC_EXUCUTION_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8621',
        any: [
          /PRINTFORMW 「嘎咕…老实说…咳咳咳…牙齿被打折断…脸的形状…变得很奇怪啊…咕呜…咕呜」/,
        ],
      }, // PRINTFORMW 「嘎咕…老实说…咳咳咳…牙齿被打折断…脸的形状…变得很奇怪
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8624',
        any: [/PRINTFORMW 「这里…这个绞刑台是我最后的舞台吗…」/],
      }, // PRINTFORMW 「这里…这个绞刑台是我最后的舞台吗…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8627-8630',
        any: [/;-----------------------------------/],
      }, // ;-----------------------------------
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8631-8657',
        any: [/@GROTESQUE_KOUJO_K7/],
      }, // @GROTESQUE_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8636-8637',
        any: [/;内臓陵辱刑/],
      }, // ;内臓陵辱刑
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8639-8640',
        any: [/;ギロチン刑/],
      }, // ;ギロチン刑
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8642-8643',
        any: [/;火あぶりの刑/],
      }, // ;火あぶりの刑
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8645-8646',
        any: [/;食肉刑/],
      }, // ;食肉刑
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8648-8649',
        any: [/;死霊化/],
      }, // ;死霊化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8651-8652',
        any: [/;ゾンビ化/],
      }, // ;ゾンビ化
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8654-8657',
        any: [/;-----------------------------------/],
      }, // ;-----------------------------------
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8658-8671',
        any: [/@ENTERENEMY_KOUJO_K7/],
      }, // @ENTERENEMY_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8663',
        any: [/PRINTFORMW 「想被怪物们轮奸一下呢～♪」/],
      }, // PRINTFORMW 「想被怪物们轮奸一下呢～♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8666',
        any: [
          /PRINTFORMW 「啊啊…魔王大人。现、现在就去见你了\.\.\.\.\.%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…魔王大人。现、现在就去见你了.....%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8668',
        any: [/PRINTFORMW 「一开始就派我讨伐魔王就好了！」/],
      }, // PRINTFORMW 「一开始就派我讨伐魔王就好了！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8672-8714',
        any: [/@GOHOUBI_REQUEST_KOUJO_K7/],
      }, // @GOHOUBI_REQUEST_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8677',
        any: [/PRINTFORMW 「说道奖励当然想要钱了」/],
      }, // PRINTFORMW 「说道奖励当然想要钱了」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8680',
        any: [/PRINTFORM 「奖励？　我想尝试和/],
      }, // PRINTFORM 「奖励？　我想尝试和
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8682',
        any: [/PRINT 犬/],
      }, // PRINT 犬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8684',
        any: [/PRINT 豚/],
      }, // PRINT 豚
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8686',
        any: [/PRINT 馬/],
      }, // PRINT 馬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8688',
        any: [/PRINTFORMW 性交看看」/],
      }, // PRINTFORMW 性交看看」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8689',
        any: [/PRINTFORMW %SAVESTR:A%要求了兽奸的奖励/],
      }, // PRINTFORMW %SAVESTR:A%要求了兽奸的奖励
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8692',
        any: [/PRINTFORMW 「和我接吻的约定、我就有动力了哦」/],
      }, // PRINTFORMW 「和我接吻的约定、我就有动力了哦」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8695',
        any: [/PRINTFORMW 「奖励我想和魔王大人做爱呢」/],
      }, // PRINTFORMW 「奖励我想和魔王大人做爱呢」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8698',
        any: [/PRINTFORMW 「魔王大人的精液想喝~~♪」/],
      }, // PRINTFORMW 「魔王大人的精液想喝~~♪」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8699',
        any: [/PRINTFORMW %SAVESTR:A%要求你的精液做报酬/],
      }, // PRINTFORMW %SAVESTR:A%要求你的精液做报酬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8702',
        any: [/PRINTFORMW 「想和各种各样不同的魔物开一场性交派对呢！」/],
      }, // PRINTFORMW 「想和各种各样不同的魔物开一场性交派对呢！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8703',
        any: [/PRINTFORMW %SAVESTR:A%要求了乱交的报酬/],
      }, // PRINTFORMW %SAVESTR:A%要求了乱交的报酬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8706',
        any: [/PRINTFORMW 「尿液…魔王大人的尿液想喝」/],
      }, // PRINTFORMW 「尿液…魔王大人的尿液想喝」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8707',
        any: [/PRINTFORMW %SAVESTR:A%要求了尿液做报酬/],
      }, // PRINTFORMW %SAVESTR:A%要求了尿液做报酬
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8710',
        any: [/PRINTFORMW 「偶尔也想享受一下童贞」/],
      }, // PRINTFORMW 「偶尔也想享受一下童贞」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8711',
        any: [/PRINTFORMW %SAVESTR:A%要求了童贞狩猎作为奖励/],
      }, // PRINTFORMW %SAVESTR:A%要求了童贞狩猎作为奖励
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8715-8792',
        any: [/@GOHOUBI_AFTER_KOUJO_K7/],
      }, // @GOHOUBI_AFTER_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8722',
        any: [/PRINTFORMW 「如此也要继续努力…！」/],
      }, // PRINTFORMW 「如此也要继续努力…！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8725',
        any: [/PRINTFORMW 「收集勋章能换到什么吗？」/],
      }, // PRINTFORMW 「收集勋章能换到什么吗？」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8729',
        any: [/PRINTFORMW 「用钱把房间装饰的漂漂亮亮的」/],
      }, // PRINTFORMW 「用钱把房间装饰的漂漂亮亮的」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8734',
        any: [
          /PRINTFORMW 「啊啊嗯，狗狗还是插屁股最爽了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊嗯，狗狗还是插屁股最爽了%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8736',
        any: [/PRINTFORMW 「啊啊嗯，和狗做爱最棒了%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊嗯，和狗做爱最棒了%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8742',
        any: [/PRINTFORMW 「啊啊嗯，被猪插屁眼好爽%UNICODE\(0x2661\) \*1%」/],
      }, // PRINTFORMW 「啊啊嗯，被猪插屁眼好爽%UNICODE(0x2661)
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8744',
        any: [
          /PRINTFORMW 「啊呼呼~和猪性交真是太棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呼呼~和猪性交真是太棒了%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8750',
        any: [
          /PRINTFORMW 「啊啊啊，马的大阴茎真是太爽了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊啊，马的大阴茎真是太爽了%UNICODE(0x266
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8752',
        any: [
          /PRINTFORMW 「噢噢哦♪和马做爱真是太爽了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「噢噢哦♪和马做爱真是太爽了%UNICODE(0x2661
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8756',
        any: [
          /PRINTFORMW 「呼呼%UNICODE\(0x2661\) \*1% 魔王大人的吻最棒了、还想再要呢♪」/,
        ],
      }, // PRINTFORMW 「呼呼%UNICODE(0x2661) *1% 魔王大人的
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8761',
        any: [
          /PRINTFORMW 「啊嗯，嗯呼%UNICODE\(0x2661\) \*1% 啊嗯！更…再温柔一点！好爽！真是太爽了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊嗯，嗯呼%UNICODE(0x2661) *1% 啊嗯
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8764',
        any: [
          /PRINTFORMW 「啊呜啊啊%UNICODE\(0x2661\) \*1% 哼！再温柔一点…嗯哼！肛门被张开了%UNICODE\(0x2661\) \*1% 太棒了！真是太棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊呜啊啊%UNICODE(0x2661) *1% 哼！再
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8768',
        any: [
          /PRINTFORMW 「现在喝到的美味是葡萄酒也比不上的呐、魔王大人的精液%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「现在喝到的美味是葡萄酒也比不上的呐、魔王大人的精液%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8773',
        any: [
          /PRINTFORMW 「啊啊…能举办这样的淫乱宴会，果然成为魔王大人的下仆是正确的选择呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…能举办这样的淫乱宴会，果然成为魔王大人的下仆是正确
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8775',
        any: [
          /PRINTFORMW 「啊啊…能举办这样的淫乱宴会，果然成为魔王大人的下仆是正确的选择呢%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊啊…能举办这样的淫乱宴会，果然成为魔王大人的下仆是正确
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8779',
        any: [
          /PRINTFORMW 「现在喝到的美味是葡萄酒也比不上的呐、魔王大人的尿液%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「现在喝到的美味是葡萄酒也比不上的呐、魔王大人的尿液%UN
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8784',
        any: [
          /PRINTFORMW 「啊哈哈啊…真是让女人们哭泣的巨大肉棒呢、来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈哈啊…真是让女人们哭泣的巨大肉棒呢、来吧%UNICO
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8787',
        any: [
          /PRINTFORMW 「来用我的肛门小穴让你毕业童贞哦%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「来用我的肛门小穴让你毕业童贞哦%UNICODE(0x26
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8781-8790',
        any: [/CFLAG:A:504 == 9/],
      }, // CFLAG:A:504 == 9
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8793-8857',
        any: [/@OSIOKI_KOUJO_K7/],
      }, // @OSIOKI_KOUJO_K7
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8800',
        any: [/PRINTFORMW 「诶、请让我回监牢里去」/],
      }, // PRINTFORMW 「诶、请让我回监牢里去」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8805',
        any: [
          /PRINTFORMW 「噢啊哦嗷嗷！噼里啪啦的要晕过去了%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「噢啊哦嗷嗷！噼里啪啦的要晕过去了%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8807',
        any: [
          /PRINTFORMW 「不、不要啊！这么高的电压会死的！呜嗷！咿咿呀呀！」/,
        ],
      }, // PRINTFORMW 「不、不要啊！这么高的电压会死的！呜嗷！咿咿呀呀！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8813',
        any: [
          /PRINTFORMW 「公开自慰最棒啦啊啊啊%UNICODE\(0x2661\) \*1% 想看的话靠得更近一点也可以哦♪」/,
        ],
      }, // PRINTFORMW 「公开自慰最棒啦啊啊啊%UNICODE(0x2661) *
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8815',
        any: [/PRINTFORMW 「真是…屈辱啊…」/],
      }, // PRINTFORMW 「真是…屈辱啊…」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8821',
        any: [
          /PRINTFORMW 「啊哈呼…被看到了、被人看着在…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊哈呼…被看到了、被人看着在…啊啊%UNICODE(0x
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8823',
        any: [
          /PRINTFORMW 「咕呜…为什么，为什么要让我做这种事…？咿呀啊啊啊………」/,
        ],
      }, // PRINTFORMW 「咕呜…为什么，为什么要让我做这种事…？咿呀啊啊啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8829',
        any: [
          /PRINTFORMW 「啊啊嗯！快用鞭子！狠狠的、无情的更多的惩罚我吧，惩罚我吧！」/,
        ],
      }, // PRINTFORMW 「啊啊嗯！快用鞭子！狠狠的、无情的更多的惩罚我吧，惩罚我吧
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8831',
        any: [/PRINTFORMW 「咕！啊咕啊！请、请您原谅我吧！啊啊！」/],
      }, // PRINTFORMW 「咕！啊咕啊！请、请您原谅我吧！啊啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8837',
        any: [
          /PRINTFORMW 「啊咕噜咕嘟咕嘟…小便的味道好好啊%UNICODE\(0x2661\) \*1%」/,
        ],
      }, // PRINTFORMW 「啊咕噜咕嘟咕嘟…小便的味道好好啊%UNICODE(0x2
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8839',
        any: [/PRINTFORMW 「已经够了…请停下来吧…请您停下来吧………」/],
      }, // PRINTFORMW 「已经够了…请停下来吧…请您停下来吧………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8843',
        any: [/PRINTW 「好臭啊………」/],
      }, // PRINTW 「好臭啊………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8846',
        any: [/PRINTW 「肚子饿得前胸贴后背啦………」/],
      }, // PRINTW 「肚子饿得前胸贴后背啦………」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8849',
        any: [
          /PRINTFORMW 「呼啊…呼啊…拜托了、我都这样张开双腿邀请你们了、不要装作看不见啊呜呜…呜」/,
        ],
      }, // PRINTFORMW 「呼啊…呼啊…拜托了、我都这样张开双腿邀请你们了、不要装作
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8850',
        any: [/PRINTFORMW 「啊啊！拜托了！快回来！随便谁都行不要抛下我啊！」/],
      }, // PRINTFORMW 「啊啊！拜托了！快回来！随便谁都行不要抛下我啊！」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8853',
        any: [/PRINTFORMW 「下次一定～」/],
      }, // PRINTFORMW 「下次一定～」
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8858-8890',
        any: [/@GOBI_KOUJO_K7, ARG:0/],
      }, // @GOBI_KOUJO_K7, ARG:0
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8863',
        any: [/PRINTFORM 哇~%UNICODE\(0x2661\) \*1%/],
      }, // PRINTFORM 哇~%UNICODE(0x2661) *1%
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8866',
        any: [/PRINTFORM 什么啊！/],
      }, // PRINTFORM 什么啊！
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8869',
        any: [/PRINTFORM 哦……。/],
      }, // PRINTFORM 哦……。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8872',
        any: [/PRINTFORM 真是……唉。/],
      }, // PRINTFORM 真是……唉。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8875',
        any: [/PRINTFORM 唉……。/],
      }, // PRINTFORM 唉……。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8880',
        any: [/PRINTFORM 哦。/],
      }, // PRINTFORM 哦。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8882',
        any: [/PRINTFORM 啊。/],
      }, // PRINTFORM 啊。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '8884',
        any: [/PRINTFORM 没办法了。/],
      }, // PRINTFORM 没办法了。
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6570-6572',
        any: [/CFLAG:322 <= 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6580-6582',
        any: [/CFLAG:322 <= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6590-6592',
        any: [/CFLAG:322 <= 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6841-6843',
        any: [/CFLAG:335 <= 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6851-6853',
        any: [/CFLAG:335 <= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6851-6855',
        any: [/CFLAG:335 <= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6867-6873',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6875-6877',
        any: [/CFLAG:335 <= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K7_ハート.ERB',
        ref: '6875-6879',
        any: [/CFLAG:335 <= 3/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
