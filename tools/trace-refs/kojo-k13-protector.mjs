// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #244：kojo-k13-protector.mjs
// 锚由 EVENT_K13_庇護者.ERB 对应行生成。优先全文唯一整行；空 PRINTFORM
// 用整行锚；平行复现放行。结构行/DRAWLINE 已在 JS 侧扩窗。

export const FILES = [
  {
    js: 'ere/kojo/kojo-k13-protector.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '71-75',
        any: [/^\s*SIF\ FLAG:7\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '77-79',
        any: [/^\s*FLAG:113\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '324-432',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%看到您的一瞬间……%SELF_CALL\(TARGET\)%的下面早已经湿透了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '536-3635',
        any: [
          /^\s*PRINTFORMW\ 「不行了……再不来和%SELF_CALL\(TARGET\)%交合的话……%SELF_CALL\(TARGET\)%就要爱上自慰了啦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3637-4440',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%还是第一次……居然要和汪酱…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4442-4638',
        any: [
          /^\s*PRINTFORMW\ 「不行%SELF_CALL\(TARGET\)%要去了、啊啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4640-4686',
        any: [
          /^\s*PRINTFORMW\ 「注入了这么多……要怀上孩子了啦%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4688-4749',
        any: [/^\s*PRINTFORMW\ 「好痛苦……但却有种快乐的感觉？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4751-4998',
        any: [
          /^\s*ELSEIF\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:261\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5000-5998',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%知道该怎么和男人们打交道！%SELF_CALL\(TARGET\)%会让各位感到满足……所以…请饶过一命…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '538-539',
        any: [/^\s*;SIF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '73',
        any: [/^\s*FLAG:113\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '75',
        any: [/^\s*FLAG:7\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '79',
        any: [/^\s*FLAG:113\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '71',
        any: [/^\s*@EVENTTRAIN\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '85',
        any: [/^\s*@EVENTTRAIN\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '83-87',
        any: [/^\s*;調教開始時のセリフ\ CFLAG\ 201～219を使用\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '89-92',
        any: [/^\s*;初調教時\ CFLAG:201\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '94',
        any: [/^\s*IF\ CFLAG:201\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '94-95',
        any: [/^\s*IF\ CFLAG:201\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '97',
        any: [/^\s*IF\ RAND:2\ ==\ 0\ \&\&\ \ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '99',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、怎么办呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '101',
        any: [/^\s*IF\ TALENT:200\ ==\ 1\ \|\|\ TALENT:205\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '102',
        any: [/^\s*PRINTFORMW\ 「既然被没收了武器就没没办法了了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '104',
        any: [/^\s*ELSEIF\ TALENT:201\ ==\ 1\ \|\|\ TALENT:206\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '105',
        any: [
          /^\s*PRINTFORMW\ 「居然将%SELF_CALL\(TARGET\)%给抓住了什么的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '107',
        any: [/^\s*ELSEIF\ TALENT:202\ ==\ 1\ \|\|\ TALENT:207\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '108',
        any: [/^\s*PRINTFORMW\ 「这可真是遇上了危机呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '110',
        any: [/^\s*ELSEIF\ TALENT:203\ ==\ 1\ \|\|\ TALENT:208\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '111',
        any: [/^\s*PRINTFORMW\ 「请饶恕%SELF_CALL\(TARGET\)%好吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '111-112',
        any: [/^\s*PRINTFORMW\ 「请饶恕%SELF_CALL\(TARGET\)%好吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '114',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '115',
        any: [
          /^\s*PRINTFORMW\ 被俘虏的%SAVESTR:TARGET%歪歪脑袋显出一副镇定沉着的模样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '115-116',
        any: [
          /^\s*PRINTFORMW\ 被俘虏的%SAVESTR:TARGET%歪歪脑袋显出一副镇定沉着的模样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '117',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%用手托腮、一副镇定沉着的模样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '117-118',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%用手托腮、一副镇定沉着的模样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '119-120',
        any: [
          /^\s*PRINTFORMW\ 「哎呀哎呀、%SELF_CALL\(TARGET\)%还是被抓住了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '120',
        any: [
          /^\s*PRINTFORMW\ 「哎呀哎呀、%SELF_CALL\(TARGET\)%还是被抓住了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '121',
        any: [
          /^\s*PRINTFORMW\ 「要是对做%SELF_CALL\(TARGET\)%一直以来那种过分的事、%SELF_CALL\(TARGET\)%可不会原谅哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '122',
        any: [/^\s*PRINTFORMW\ 「现在停手还来得及。再考虑考虑吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '124',
        any: [/^\s*PRINTFORMW\ （亲爱的……无论如何都得回到你身边啊）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '124-125',
        any: [/^\s*PRINTFORMW\ （亲爱的……无论如何都得回到你身边啊）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '126',
        any: [/^\s*CFLAG:201\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '126-127',
        any: [/^\s*CFLAG:201\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '131',
        any: [/^\s*ELSEIF\ CFLAG:201\ >=\ 1\ \&\&\ CFLAG:650\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '132',
        any: [/^\s*IF\ TALENT:85\ \|\|\ TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '132-133',
        any: [/^\s*IF\ TALENT:85\ \|\|\ TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '134',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……请原谅我。%SELF_CALL\(TARGET\)%一度背叛了您」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '135',
        any: [
          /^\s*PRINTFORMW\ 「之前的事情%SELF_CALL\(TARGET\)%请让它就这样过去吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '136',
        any: [/^\s*PRINTFORMW\ 「今后我会竭尽全力的服侍您的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '138',
        any: [/^\s*CFLAG:650\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '139-141',
        any: [/^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%请原谅我……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '140-141',
        any: [/^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%请原谅我……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '141',
        any: [/^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%请原谅我……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '142',
        any: [/^\s*PRINTFORMW\ 「今后我会竭尽全力的服侍您的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '144',
        any: [/^\s*PRINTFORMW\ （亲爱的……无论如何都得回到你身边）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '146',
        any: [/^\s*CFLAG:650\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '144-147',
        any: [/^\s*PRINTFORMW\ （亲爱的……无论如何都得回到你身边）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '148-150',
        any: [/^\s*;屈服刻印（各Lv一回のみ）\ CFLAG:201\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '153',
        any: [/^\s*ELSEIF\ CFLAG:201\ <\ 2\ \&\&\ MARK:2\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '153-154',
        any: [/^\s*ELSEIF\ CFLAG:201\ <\ 2\ \&\&\ MARK:2\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '155',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '156',
        any: [
          /^\s*PRINTFORMW\ 「哎呀哎呀、打算用这种野蛮的方式来让%SELF_CALL\(TARGET\)%就范吗」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '157',
        any: [
          /^\s*PRINTFORMW\ 「那种方法根本没法让%SELF_CALL\(TARGET\)%动摇的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '158',
        any: [
          /^\s*PRINTFORMW\ 「而且呢……%SELF_CALL\(TARGET\)%早就、将身体献给那个人了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '163',
        any: [/^\s*IF\ TALENT:110\ \|\|\ TALENT:114\ \|\|\ TALENT:119\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '164',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%一副从容不迫的模样、抖动着傲人的双峰、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '164-165',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%一副从容不迫的模样、抖动着傲人的双峰、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '166',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%一副从容不迫的模样、轻抚着平坦的胸部、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '166-167',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%一副从容不迫的模样、轻抚着平坦的胸部、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '168',
        any: [/^\s*PRINTFORMW\ 微笑着摩挲无名指上的订制戒指。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '168-169',
        any: [/^\s*PRINTFORMW\ 微笑着摩挲无名指上的订制戒指。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '170',
        any: [/^\s*PRINTFORMW\ 「比起那些、来做点有意义的事如何」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '170-171',
        any: [/^\s*PRINTFORMW\ 「比起那些、来做点有意义的事如何」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '172',
        any: [/^\s*CFLAG:201\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '172-173',
        any: [/^\s*CFLAG:201\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '176',
        any: [/^\s*ELSEIF\ CFLAG:201\ <\ 3\ \&\&\ MARK:2\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '176-177',
        any: [/^\s*ELSEIF\ CFLAG:201\ <\ 3\ \&\&\ MARK:2\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '178',
        any: [
          /^\s*IF\ TALENT:157\ \&\&\ TALENT:110\ \|\|\ TALENT:114\ \|\|\ TALENT:119\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '179',
        any: [
          /^\s*PRINTFORMW\ 「呼呵呵……就承认这段时间%SELF_CALL\(TARGET\)%的心稍微有些动摇了吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '180',
        any: [
          /^\s*PRINTFORMW\ 「但是呢、就算是支配了身体也夺不走%SAVESTR:TARGET%的心哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '181',
        any: [
          /^\s*PRINTFORMW\ 「就这样放弃吧？、这样做的话对你和%SAVESTR:TARGET%都不会有什么损失」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '182',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%劝导似的凝视着%NAME:MASTER%的瞳孔……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '182-183',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%劝导似的凝视着%NAME:MASTER%的瞳孔……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '184',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是……绝对不会被你支配的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '185',
        any: [
          /^\s*PRINTFORMW\ 「绝对……%SELF_CALL\(TARGET\)%绝对是不会输的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '186',
        any: [
          /^\s*PRINTFORMW\ 「继续做这种事也是一点意义都没有的明白了吗！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '187',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:TARGET%毅然决然地放出了这样的宣言。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '189',
        any: [
          /^\s*PRINTFORMW\ （这可…如何是好…救救%SELF_CALL\(TARGET\)%……吧……亲爱的……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '189-190',
        any: [
          /^\s*PRINTFORMW\ （这可…如何是好…救救%SELF_CALL\(TARGET\)%……吧……亲爱的……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '191',
        any: [/^\s*CFLAG:201\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '191-192',
        any: [/^\s*CFLAG:201\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '194',
        any: [
          /^\s*ELSEIF\ CFLAG:201\ <\ 4\ \&\&\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '194-195',
        any: [
          /^\s*ELSEIF\ CFLAG:201\ <\ 4\ \&\&\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '196',
        any: [
          /^\s*IF\ TALENT:157\ \&\&\ TALENT:110\ \|\|\ TALENT:114\ \|\|\ TALENT:119\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '197',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀……又来了啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '198',
        any: [/^\s*PRINTFORMW\ 「这么火热的话%SELF_CALL\(TARGET\)%也……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '199',
        any: [
          /^\s*PRINTFORMW\ 「没…没什么、嗯呼呼……那么、今天也来做吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '200',
        any: [
          /^\s*PRINTFORMW\ %SELF_CALL\(TARGET\)%露出了和初次造访时完全不同的女人的表情\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '201',
        any: [/^\s*PRINTFORMW\ 将自己交给了%NAME:MASTER%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '201-202',
        any: [/^\s*PRINTFORMW\ 将自己交给了%NAME:MASTER%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '203',
        any: [
          /^\s*PRINTFORMW\ 「您是……主人、%SELF_CALL\(TARGET\)%向您屈服……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '204',
        any: [
          /^\s*PRINTFORMW\ 「所以……%SELF_CALL\(TARGET\)%不会再做、无谓的反抗了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '205',
        any: [/^\s*PRINTFORMW\ 「什么都……什么都会做的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '206',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '207',
        any: [
          /^\s*PRINTFORMW\ （对不起了……亲爱的……%SELF_CALL\(TARGET\)%……已经……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '207-208',
        any: [
          /^\s*PRINTFORMW\ （对不起了……亲爱的……%SELF_CALL\(TARGET\)%……已经……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '209-210',
        any: [/^\s*CFLAG:201\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '210',
        any: [/^\s*CFLAG:201\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '210-211',
        any: [/^\s*CFLAG:201\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '214',
        any: [
          /^\s*ELSEIF\ CFLAG:201\ <\ 5\ \&\&\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '214-215',
        any: [
          /^\s*ELSEIF\ CFLAG:201\ <\ 5\ \&\&\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '216',
        any: [
          /^\s*IF\ TALENT:157\ \&\&\ TALENT:110\ \|\|\ TALENT:114\ \|\|\ TALENT:119\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '217',
        any: [/^\s*PRINTFORMW\ 「唔呼呼%UNICODE\(0x2661\)\ \*1%……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '218',
        any: [
          /^\s*PRINTFORMW\ 「将%SELF_CALL\(TARGET\)%的身体染上您的颜色吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '219',
        any: [
          /^\s*PRINTFORMW\ 「无论是怎样的精英始终只是个女人、这副身体终于明白淫乱之乐了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '220',
        any: [
          /^\s*PRINTFORMW\ 「那么……请下令吧、主人大人%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '220-221',
        any: [
          /^\s*PRINTFORMW\ 「那么……请下令吧、主人大人%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '222',
        any: [
          /^\s*PRINTFORMW\ 「让%SELF_CALL\(TARGET\)%变得这么淫荡……真是十分感谢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '223',
        any: [
          /^\s*PRINTFORMW\ 「作为一个女人……不、作为一条母狗、总算找回了些自信……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '224',
        any: [/^\s*PRINTFORMW\ 「今后也请您……好好地疼爱这条母狗哦……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '225',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '226',
        any: [
          /^\s*PRINTFORMW\ 「那个人的事怎样都行了啦……快把大鸡巴交出来就行啦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '226-227',
        any: [
          /^\s*PRINTFORMW\ 「那个人的事怎样都行了啦……快把大鸡巴交出来就行啦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '228-229',
        any: [/^\s*CFLAG:201\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '229',
        any: [/^\s*CFLAG:201\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '229-230',
        any: [/^\s*CFLAG:201\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '233',
        any: [
          /^\s*ELSEIF\ CFLAG:201\ <\ 6\ \&\&\ TALENT:TARGET:85\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '233-234',
        any: [
          /^\s*ELSEIF\ CFLAG:201\ <\ 6\ \&\&\ TALENT:TARGET:85\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '248',
        any: [
          /^\s*PRINTFORMW\ 「嘻嘻、%SELF_CALL\(TARGET\)%想%SELF_CALL\(TARGET\)%现在找到了%SELF_CALL\(TARGET\)%的真爱了……谢谢您」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '249',
        any: [
          /^\s*PRINTFORMW\ 「作为一个女人……之前的%SELF_CALL\(TARGET\)%竟然忘记了恋爱的感觉」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '250',
        any: [
          /^\s*PRINTFORMW\ 「以后……可要好好地疼爱%SELF_CALL\(TARGET\)%哟……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '252',
        any: [/^\s*CFLAG:201\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '252-253',
        any: [/^\s*CFLAG:201\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '256',
        any: [/^\s*ELSEIF\ ASSI\ <\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '257',
        any: [/^\s*CALL\ K13_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '315-316',
        any: [
          /^\s*;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '317',
        any: [/^\s*CALL\ K13_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '315-318',
        any: [
          /^\s*;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '324',
        any: [/^\s*@K13_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '326',
        any: [/^\s*IF\ MARK:3\ ==\ 3\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '326-327',
        any: [/^\s*IF\ MARK:3\ ==\ 3\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '328',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、垃圾你在往哪看呢、说你呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '329',
        any: [/^\s*PRINTFORMW\ 「赶紧从%SELF_CALL\(TARGET\)%的眼前消失」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '330',
        any: [
          /^\s*PRINTFORMW\ 「看到你、%SELF_CALL\(TARGET\)%饭都吃不下去了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '332',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%绝对不会忘记你的……请你再等等）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '333-335',
        any: [/^\s*;屈服刻印Lv0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '336',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 0\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '336-337',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 0\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '338',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '339',
        any: [/^\s*PRINTFORML\ 「又开始要做什么了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '340',
        any: [
          /^\s*PRINTFORML\ 「无论对%SELF_CALL\(TARGET\)%做什么都一样的、没用的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '341',
        any: [/^\s*PRINTFORMW\ 「所以说、还是放弃这种事吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '341-342',
        any: [/^\s*PRINTFORMW\ 「所以说、还是放弃这种事吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '343',
        any: [/^\s*PRINTFORMW\ 「你想说些什么吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '344',
        any: [
          /^\s*PRINTFORMW\ 「无论对%SELF_CALL\(TARGET\)%做什么都一样的、无用功而已呦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '345',
        any: [/^\s*PRINTFORMW\ 「所以说……还是放弃这种事吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '345-346',
        any: [/^\s*PRINTFORMW\ 「所以说……还是放弃这种事吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '347',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '348',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '349',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%绝对不会输的……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '350',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '351',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%会在远方坚强地继续作战的……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '351-352',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%会在远方坚强地继续作战的……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '353',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……还家里等着%SELF_CALL\(TARGET\)%回去呢……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '353-354',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……还家里等着%SELF_CALL\(TARGET\)%回去呢……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '353-355',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……还家里等着%SELF_CALL\(TARGET\)%回去呢……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '353-356',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……还家里等着%SELF_CALL\(TARGET\)%回去呢……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '359',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '359-360',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '361',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '362',
        any: [/^\s*PRINTFORML\ 「还是、不肯死心对吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '363',
        any: [/^\s*PRINTFORML\ 「%SELF_CALL\(TARGET\)%是绝对不会屈服的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '364',
        any: [/^\s*PRINTFORMW\ 「来吧……怎么喜欢怎么来好了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '364-365',
        any: [/^\s*PRINTFORMW\ 「来吧……怎么喜欢怎么来好了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '366',
        any: [/^\s*PRINTFORMW\ 「啧……今天也来了。好吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '367',
        any: [
          /^\s*PRINTFORMW\ 「无论对%SELF_CALL\(TARGET\)%做什么都一样的、没用的……已经说过了吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '368',
        any: [
          /^\s*PRINTFORMW\ 「而且、%SELF_CALL\(TARGET\)%是不会屈服的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '368-369',
        any: [
          /^\s*PRINTFORMW\ 「而且、%SELF_CALL\(TARGET\)%是不会屈服的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '371',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……请赐予%SELF_CALL\(TARGET\)%勇气吧……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '371-372',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……请赐予%SELF_CALL\(TARGET\)%勇气吧……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '375',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 2\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '375-376',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 2\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '377',
        any: [/^\s*PRINTFORMW\ 「难道……就这样结束了吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '378',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%快……不、没什么的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '379',
        any: [
          /^\s*PRINTFORMW\ 「不管遇上多么残酷的事情、%SELF_CALL\(TARGET\)%也决不能放弃的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '381',
        any: [
          /^\s*PRINTFORMW\ （老公……%SELF_CALL\(TARGET\)%快要坚持不住了……请给我力量吧）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '381-382',
        any: [
          /^\s*PRINTFORMW\ （老公……%SELF_CALL\(TARGET\)%快要坚持不住了……请给我力量吧）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '385',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0\ \&\&\ FLAG:7\ ==\ 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '385-386',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0\ \&\&\ FLAG:7\ ==\ 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '387',
        any: [/^\s*PRINTFORMW\ 「哈啊…哈啊…不行了……已经极限了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '388',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%确实……小看你的能耐了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '389',
        any: [
          /^\s*PRINTFORMW\ 「还请……不要再对%SELF_CALL\(TARGET\)%做了更过分的事了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '391',
        any: [
          /^\s*PRINTFORMW\ （老公……%SELF_CALL\(TARGET\)%已经……对不起……但……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '391-392',
        any: [
          /^\s*PRINTFORMW\ （老公……%SELF_CALL\(TARGET\)%已经……对不起……但……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '395',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '395-396',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '398',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '399',
        any: [
          /^\s*PRINTFORMW\ 「恭候您的光临……今天也能好好地疼爱%SELF_CALL\(TARGET\)%吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '400',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%看到您的一瞬间……%SELF_CALL\(TARGET\)%的下面早已经湿透了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '401',
        any: [
          /^\s*PRINTFORMW\ 「请您……将%SELF_CALL\(TARGET\)%变得更加淫荡吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '402',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '403',
        any: [
          /^\s*PRINTFORMW\ 「哎呀、来了啊……%SELF_CALL\(TARGET\)%一直在期待您的光临」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '404',
        any: [
          /^\s*PRINTFORMW\ 「光是想到今天要对%SELF_CALL\(TARGET\)%做的褒赏之事……身体就发热了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '405',
        any: [
          /^\s*PRINTFORMW\ 「请您……仔细品尝%SELF_CALL\(TARGET\)%的身体……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '405-406',
        any: [
          /^\s*PRINTFORMW\ 「请您……仔细品尝%SELF_CALL\(TARGET\)%的身体……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '407',
        any: [
          /^\s*PRINTFORMW\ 「欢迎光临……想要今天的奖励都想到身子发热了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '408',
        any: [
          /^\s*PRINTFORMW\ 「在这里等待的时候……%SELF_CALL\(TARGET\)%快要被心中的欲火烧成灰了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '409',
        any: [
          /^\s*PRINTFORMW\ 「请您……赐给%SELF_CALL\(TARGET\)%的身体如燎原之火一般的激情吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '409-410',
        any: [
          /^\s*PRINTFORMW\ 「请您……赐给%SELF_CALL\(TARGET\)%的身体如燎原之火一般的激情吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '409-411',
        any: [
          /^\s*PRINTFORMW\ 「请您……赐给%SELF_CALL\(TARGET\)%的身体如燎原之火一般的激情吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '414',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '414-415',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '417',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '418',
        any: [/^\s*PRINTFORMW\ 「回来了啊……今天的工作结束了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '419',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%……一直在等着您」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '420',
        any: [
          /^\s*PRINTFORMW\ 「来吧……请与%SELF_CALL\(TARGET\)%交合吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '421',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '422',
        any: [
          /^\s*PRINTFORMW\ 「今天也按时回来了呢……今天的工作让您很累的样子」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '423',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%一直……想念着您」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '424',
        any: [
          /^\s*PRINTFORMW\ 「来吧……请与%SELF_CALL\(TARGET\)%交合吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '425-426',
        any: [
          /^\s*PRINTFORMW\ 「今天也按时回来了呢……今天的工作很累的样子」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '426',
        any: [
          /^\s*PRINTFORMW\ 「今天也按时回来了呢……今天的工作很累的样子」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '427',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%一直……想念着您」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '428',
        any: [
          /^\s*PRINTFORMW\ 「来吧……请让%SELF_CALL\(TARGET\)%来帮您消除疲劳吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '428-429',
        any: [
          /^\s*PRINTFORMW\ 「来吧……请让%SELF_CALL\(TARGET\)%来帮您消除疲劳吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '428-430',
        any: [
          /^\s*PRINTFORMW\ 「来吧……请让%SELF_CALL\(TARGET\)%来帮您消除疲劳吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '428-431',
        any: [
          /^\s*PRINTFORMW\ 「来吧……请让%SELF_CALL\(TARGET\)%来帮您消除疲劳吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '432-435',
        any: [
          /^\s*;EVENTEND関係（13をキャラ番号に置換）\ CFLAG\ 211～220を使用\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '438',
        any: [/^\s*@EVENTEND\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '440-444',
        any: [/^\s*;キャラ死亡時は口上をスキップ\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '442-444',
        any: [/^\s*;キャラ死亡時は口上をスキップ\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '445-446',
        any: [/^\s*SIF\ BASE:0\ <=\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '452',
        any: [/^\s*IF\ MARK:3\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '452-453',
        any: [/^\s*IF\ MARK:3\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '454',
        any: [/^\s*PRINTFORMW\ 「真像秽物辣鸡干的事呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '455',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%恶心的快要吐了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '456',
        any: [/^\s*PRINTFORMW\ 「真是、受够了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '458',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%绝对不会忘记你的……请你再等等）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '459-461',
        any: [/^\s*;屈服刻印Lv1以下\+愛なし\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '462',
        any: [/^\s*ELSEIF\ MARK:2\ <=\ 1\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '462-463',
        any: [/^\s*ELSEIF\ MARK:2\ <=\ 1\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '464',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '465',
        any: [/^\s*PRINTFORML\ 「这就结束了吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '466',
        any: [/^\s*PRINTFORMW\ 「这种事情再多都只是无用功而已……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '467',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '468',
        any: [/^\s*PRINTFORML\ 「终于结束了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '469',
        any: [/^\s*PRINTFORMW\ 「还是不肯就此罢手吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '469-470',
        any: [/^\s*PRINTFORMW\ 「还是不肯就此罢手吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '471',
        any: [/^\s*PRINTFORMW\ 「已经结束了吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '472',
        any: [
          /^\s*PRINTFORMW\ 「无论对%SELF_CALL\(TARGET\)%做什么、都是没用的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '473',
        any: [/^\s*PRINTFORMW\ 「所以、这种事情还是快停下来吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '473-474',
        any: [/^\s*PRINTFORMW\ 「所以、这种事情还是快停下来吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '476',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%还在遥远的地方为你战斗着……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '476-477',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%还在遥远的地方为你战斗着……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '480',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '480-481',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '482',
        any: [/^\s*IF\ CFLAG:201\ <\ 3\ \&\&\ MARK:2\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '483',
        any: [/^\s*PRINTFORML\ 「才没有……绝对没有那样的事……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '484',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%绝对不会如你所愿的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '485',
        any: [/^\s*PRINTFORMW\ %SAVESTR:TARGET%背对着你穿起了衣服。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '485-486',
        any: [/^\s*PRINTFORMW\ %SAVESTR:TARGET%背对着你穿起了衣服。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '487',
        any: [/^\s*PRINTFORML\ 「哈啊…哈啊…终于结束了吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '488',
        any: [
          /^\s*PRINTFORML\ 「无论对%SELF_CALL\(TARGET\)%做什么都一样的、没用的……早说了吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '489',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%还、还没放弃呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '489-490',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%还、还没放弃呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '492',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……请赐给%SELF_CALL\(TARGET\)%勇气吧……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '492-493',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……请赐给%SELF_CALL\(TARGET\)%勇气吧……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '496',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '496-497',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '498',
        any: [/^\s*PRINTFORMW\ 「哈啊、哈啊……我要不行了……要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '499',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%确实……小看你的能耐了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '500',
        any: [
          /^\s*PRINTFORMW\ 「还请……不要再对%SELF_CALL\(TARGET\)%做了更过分的事了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '502',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%已经……对不起……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '502-503',
        any: [
          /^\s*PRINTFORMW\ （亲爱的……%SELF_CALL\(TARGET\)%已经……对不起……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '506',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ BASE:0\ >=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '506-507',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ BASE:0\ >=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '508',
        any: [
          /^\s*PRINTFORMW\ 「哎呀、已经结束了哎……明天也请您多多关照了……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '509',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%会翘首以待的♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '511',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ BASE:0\ <=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '511-512',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ BASE:0\ <=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '513',
        any: [
          /^\s*PRINTFORMW\ 「今天尽情的做爱了……%SELF_CALL\(TARGET\)%真是太满足了♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '514',
        any: [
          /^\s*PRINTFORMW\ 「明天也要精力充沛地和%SELF_CALL\(TARGET\)%相好啊、等着您哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '514-515',
        any: [
          /^\s*PRINTFORMW\ 「明天也要精力充沛地和%SELF_CALL\(TARGET\)%相好啊、等着您哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '518',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ BASE:0\ >=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '518-519',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ BASE:0\ >=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '520',
        any: [/^\s*PRINTFORMW\ 「今天辛苦您了……？　調教、谢谢您♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '521',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%期待着下次的调教哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '521-522',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%期待着下次的调教哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '524',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ BASE:0\ <=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '524-525',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ BASE:0\ <=\ 500\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '526',
        any: [
          /^\s*PRINTFORMW\ 「今天好激烈啊……%SELF_CALL\(TARGET\)%真是太满足了♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '527',
        any: [
          /^\s*PRINTFORMW\ 「难道是累了吗……？　随时可以过来找%SELF_CALL\(TARGET\)%哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '527-528',
        any: [
          /^\s*PRINTFORMW\ 「难道是累了吗……？　随时可以过来找%SELF_CALL\(TARGET\)%哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '527-529',
        any: [
          /^\s*PRINTFORMW\ 「难道是累了吗……？　随时可以过来找%SELF_CALL\(TARGET\)%哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '527-530',
        any: [
          /^\s*PRINTFORMW\ 「难道是累了吗……？　随时可以过来找%SELF_CALL\(TARGET\)%哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '536',
        any: [/^\s*@KOJO_MESSAGE_COM_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '541-542',
        any: [/^\s*SIF\ TEQUIP:45\ \&\&\ SELECTCOM\ !=\ 45\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '545-546',
        any: [/^\s*;兽奸プレイ中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '547',
        any: [/^\s*IF\ TEQUIP:89\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '548',
        any: [/^\s*CALL\ DOG_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '548-549',
        any: [/^\s*CALL\ DOG_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '550-551',
        any: [/^\s*;コロシアム中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '552',
        any: [/^\s*IF\ TEQUIP:55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '553',
        any: [/^\s*CALL\ COLOSSEUM_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '553-554',
        any: [/^\s*CALL\ COLOSSEUM_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '553-555',
        any: [/^\s*CALL\ COLOSSEUM_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '563',
        any: [/^\s*IF\ SELECTCOM\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '565',
        any: [/^\s*IF\ CFLAG:301\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '567',
        any: [/^\s*IF\ MARK:2\ >=\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '568',
        any: [/^\s*PRINTFORMW\ 「噫、再这样摸下去的话……不行了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '570',
        any: [
          /^\s*PRINTFORMW\ （那个人……都没让我尝试过这样激烈的前戏……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '572-573',
        any: [
          /^\s*PRINTFORMW\ 「左右搓揉着……%SELF_CALL\(TARGET\)%什么都感觉不到」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '573',
        any: [
          /^\s*PRINTFORMW\ 「左右搓揉着……%SELF_CALL\(TARGET\)%什么都感觉不到」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '575',
        any: [
          /^\s*PRINTFORMW\ （那个人……都没让我尝试过这样激烈的前戏……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '573-576',
        any: [
          /^\s*PRINTFORMW\ 「左右搓揉着……%SELF_CALL\(TARGET\)%什么都感觉不到」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '577',
        any: [/^\s*CFLAG:301\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '578-582',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '580-582',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '582',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '583',
        any: [
          /^\s*PRINTFORMW\ 「啊、啊……快点让%SELF_CALL\(TARGET\)%的身子燃烧起来吧……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '584',
        any: [/^\s*CFLAG:301\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '586',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '587',
        any: [
          /^\s*PRINTFORMW\ 「请用力地抚弄%SELF_CALL\(TARGET\)%……还要……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '590',
        any: [/^\s*CFLAG:301\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '592',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:301\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '593',
        any: [/^\s*PRINTFORMW\ 「啊、啊……要去了……只是被摸而已……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '595',
        any: [
          /^\s*PRINTFORMW\ （这么强烈的快感……那个人的事情……似乎要忘记了）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '596',
        any: [/^\s*CFLAG:301\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '598',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 2\ \&\&\ \(CFLAG:301\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '599',
        any: [/^\s*PRINTFORMW\ 「手法还挺……熟练的嘛？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '600',
        any: [/^\s*CFLAG:301\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '602',
        any: [
          /^\s*ELSEIF\ MARK:2\ <=\ 1\ \&\&\ \(CFLAG:301\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '603',
        any: [
          /^\s*PRINTFORMW\ 「又是这么……没水准呢。真的懂得怎么玩女人吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '604',
        any: [/^\s*CFLAG:301\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '603-605',
        any: [
          /^\s*PRINTFORMW\ 「又是这么……没水准呢。真的懂得怎么玩女人吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '603-606',
        any: [
          /^\s*PRINTFORMW\ 「又是这么……没水准呢。真的懂得怎么玩女人吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '603-607',
        any: [
          /^\s*PRINTFORMW\ 「又是这么……没水准呢。真的懂得怎么玩女人吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '608-611',
        any: [/^\s*;クンニ\ CFLAG:302\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '613',
        any: [/^\s*IF\ SELECTCOM\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '615',
        any: [/^\s*IF\ CFLAG:302\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '617',
        any: [/^\s*IF\ TALENT:TARGET:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '618',
        any: [/^\s*PRINTFORMW\ 「那、那样的地方请不要舔……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '620-621',
        any: [/^\s*PRINTFORMW\ 「哎呀！　别、你在干什么啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '621',
        any: [/^\s*PRINTFORMW\ 「哎呀！　别、你在干什么啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '621-622',
        any: [/^\s*PRINTFORMW\ 「哎呀！　别、你在干什么啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '623',
        any: [/^\s*CFLAG:302\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '621-624',
        any: [/^\s*PRINTFORMW\ 「哎呀！　别、你在干什么啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '626-628',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '628',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '629',
        any: [/^\s*PRINTFORMW\ 「小狗吗……噗、慢慢舔、还蛮舒服的……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '630',
        any: [/^\s*CFLAG:302\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '632',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '633',
        any: [/^\s*PRINTFORMW\ 「啊……想要更多……舌头伸进去了……啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '634',
        any: [/^\s*CFLAG:302\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '636',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:302\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '637',
        any: [/^\s*PRINTFORMW\ 「呜……感觉到了……那样的地方……～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '638',
        any: [/^\s*CFLAG:302\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '640',
        any: [/^\s*ELSEIF\ CFLAG:302\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '641',
        any: [/^\s*PRINTFORMW\ 「不要啊！\ 不要舔啊……不……不要啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '643',
        any: [/^\s*PRINTFORMW\ （这样的地方……被舔什么的、从来没有过……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '644',
        any: [/^\s*CFLAG:302\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '643-645',
        any: [/^\s*PRINTFORMW\ （这样的地方……被舔什么的、从来没有过……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '643-646',
        any: [/^\s*PRINTFORMW\ （这样的地方……被舔什么的、从来没有过……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '643-647',
        any: [/^\s*PRINTFORMW\ （这样的地方……被舔什么的、从来没有过……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '648-651',
        any: [/^\s*;アナル愛撫\ CFLAG:303\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '653',
        any: [/^\s*IF\ SELECTCOM\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '655',
        any: [/^\s*IF\ CFLAG:303\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '656',
        any: [/^\s*PRINTFORMW\ 「啊、你在做什么！我要生气了……！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '657',
        any: [/^\s*CFLAG:TARGET:303\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '657-658',
        any: [/^\s*CFLAG:TARGET:303\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '660-662',
        any: [/^\s*;淫乱\+潤滑Lv2以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '661',
        any: [/^\s*P\ =\ PALAM:3\ \+\ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '663',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ P\ >=\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '664',
        any: [/^\s*PRINTFORMW\ 「啊、哈……不要、那里不行……变得好奇怪……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '665',
        any: [/^\s*CFLAG:303\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '667',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ P\ <\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '668',
        any: [/^\s*PRINTFORMW\ 「再多掏几下啊……湿透了呢……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '669',
        any: [/^\s*CFLAG:303\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '671',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ P\ >=\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '672',
        any: [
          /^\s*PRINTFORMW\ 「啊啊……可要对连这儿都有感觉了的身体……要负责哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '673',
        any: [/^\s*CFLAG:303\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '675',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ P\ <\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '676',
        any: [/^\s*PRINTFORMW\ 「不行……再快点……要出来了啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '677',
        any: [/^\s*CFLAG:303\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '679',
        any: [
          /^\s*ELSEIF\ P\ >=\ PALAMLV:2\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:303\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '680',
        any: [
          /^\s*PRINTFORMW\ 「竟、竟然有感觉了……明明是不行的……明明不可以的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '681',
        any: [/^\s*CFLAG:303\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '683',
        any: [/^\s*ELSEIF\ CFLAG:223\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '684',
        any: [
          /^\s*PRINTFORMW\ 「请、请你快停下……真的很难受。我要生气了！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '685',
        any: [/^\s*CFLAG:303\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '685-686',
        any: [/^\s*CFLAG:303\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '685-687',
        any: [/^\s*CFLAG:303\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '685-688',
        any: [/^\s*CFLAG:303\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '689-692',
        any: [/^\s*;自慰\ CFLAG304\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '694',
        any: [/^\s*IF\ SELECTCOM\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '696',
        any: [/^\s*IF\ CFLAG:304\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '697',
        any: [
          /^\s*PRINTFORMW\ 「竟然让%SELF_CALL\(TARGET\)%自己做这种事情……真是欺负人！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '698',
        any: [/^\s*CFLAG:TARGET:304\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '698-699',
        any: [/^\s*CFLAG:TARGET:304\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '701-703',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:304\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '703',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:304\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '704',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%受不了了……%SELF_CALL\(TARGET\)%想要的更多快乐」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '705',
        any: [/^\s*CFLAG:304\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '707',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:304\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '709',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '710',
        any: [
          /^\s*PRINTFORMW\ 「好像有点……%SELF_CALL\(TARGET\)%……喜欢上这种感觉了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '711',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '712',
        any: [/^\s*PRINTFORMW\ 「这种事……习惯得……都快成本能了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '712-713',
        any: [/^\s*PRINTFORMW\ 「这种事……习惯得……都快成本能了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '714',
        any: [
          /^\s*PRINTFORMW\ 「呵呵……%阴核\(TARGET\)%都硬了呢……明白吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '714-715',
        any: [
          /^\s*PRINTFORMW\ 「呵呵……%阴核\(TARGET\)%都硬了呢……明白吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '716',
        any: [/^\s*CFLAG:304\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '718',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:31\ <\ 3\ \&\&\ \(CFLAG:304\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '720',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '721',
        any: [/^\s*PRINTFORMW\ 「老是一个人的话好无聊啊……要一起来吗♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '721-722',
        any: [/^\s*PRINTFORMW\ 「老是一个人的话好无聊啊……要一起来吗♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '723',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%下面好像都湿透了呢……想看看吗♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '723-724',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%下面好像都湿透了呢……想看看吗♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '725',
        any: [/^\s*CFLAG:304\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '727',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:304\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '728',
        any: [/^\s*PRINTFORMW\ 「你的肉棒……想要」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '729',
        any: [/^\s*CFLAG:304\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '731',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:304\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '733',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '734',
        any: [
          /^\s*PRINTFORMW\ 「不行了……再不来和%SELF_CALL\(TARGET\)%交合的话……%SELF_CALL\(TARGET\)%就要爱上自慰了啦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '735',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '736',
        any: [/^\s*PRINTFORMW\ 「好棒……啊啊、这样的感觉……自慰什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '736-737',
        any: [/^\s*PRINTFORMW\ 「好棒……啊啊、这样的感觉……自慰什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '738',
        any: [/^\s*PRINTFORMW\ 「停不下来了……～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '738-739',
        any: [/^\s*PRINTFORMW\ 「停不下来了……～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '740',
        any: [/^\s*CFLAG:304\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '742',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:31\ <\ 3\ \&\&\ \(CFLAG:304\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '744',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '745',
        any: [/^\s*PRINTFORMW\ 「喜欢看别人自慰嘛……？　呵呵」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '745-746',
        any: [/^\s*PRINTFORMW\ 「喜欢看别人自慰嘛……？　呵呵」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '747',
        any: [
          /^\s*PRINTFORMW\ 「请好好看着、%SELF_CALL\(TARGET\)%这淫荡的小穴」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '747-748',
        any: [
          /^\s*PRINTFORMW\ 「请好好看着、%SELF_CALL\(TARGET\)%这淫荡的小穴」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '749',
        any: [/^\s*CFLAG:304\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '751',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&ABL:31\ >=\ 1\ \&\&\ \(CFLAG:304\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '753',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '754',
        any: [/^\s*PRINTFORMW\ 「停不下来了……手指自己动起来了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '754-755',
        any: [/^\s*PRINTFORMW\ 「停不下来了……手指自己动起来了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '756',
        any: [
          /^\s*PRINTFORMW\ 「变得奇怪了、都怪你……%SELF_CALL\(TARGET\)%……好像喜欢上了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '756-757',
        any: [
          /^\s*PRINTFORMW\ 「变得奇怪了、都怪你……%SELF_CALL\(TARGET\)%……好像喜欢上了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '758',
        any: [/^\s*CFLAG:304\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '760',
        any: [/^\s*ELSEIF\ CFLAG:304\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '762',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '763',
        any: [/^\s*PRINTFORMW\ 「请不要看……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '763-764',
        any: [/^\s*PRINTFORMW\ 「请不要看……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '765',
        any: [
          /^\s*PRINTFORMW\ 「请不要让%SELF_CALL\(TARGET\)%……做这么奇怪的事情」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '765-766',
        any: [
          /^\s*PRINTFORMW\ 「请不要让%SELF_CALL\(TARGET\)%……做这么奇怪的事情」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '767',
        any: [/^\s*CFLAG:304\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '767-768',
        any: [/^\s*CFLAG:304\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '767-769',
        any: [/^\s*CFLAG:304\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '767-770',
        any: [/^\s*CFLAG:304\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '771-774',
        any: [/^\s*;胸愛撫\ CFLAG:306\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '776',
        any: [/^\s*IF\ SELECTCOM\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '778',
        any: [/^\s*IF\ CFLAG:306\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '780',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '781',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的胸……就那么中意吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '783-784',
        any: [/^\s*PRINTFORMW\ 「竟然会想揉胸……跟小孩子一样」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '784',
        any: [/^\s*PRINTFORMW\ 「竟然会想揉胸……跟小孩子一样」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '784-785',
        any: [/^\s*PRINTFORMW\ 「竟然会想揉胸……跟小孩子一样」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '786',
        any: [/^\s*CFLAG:TARGET:306\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '784-787',
        any: [/^\s*PRINTFORMW\ 「竟然会想揉胸……跟小孩子一样」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '789-791',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '791',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '792',
        any: [/^\s*PRINTFORMW\ 「不行……乳头立起来了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '793',
        any: [/^\s*CFLAG:306\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '795',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '796',
        any: [/^\s*PRINTFORMW\ 「只要你喜欢、可以随便揉哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '797',
        any: [/^\s*CFLAG:306\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '799',
        any: [
          /^\s*ELSEIF\ ABL:1\ >=\ 3\ \&\&\ \(CFLAG:306\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '800',
        any: [/^\s*PRINTFORMW\ 「来了……啊、乳头……可是弱点啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '801',
        any: [/^\s*CFLAG:306\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '803',
        any: [/^\s*ELSEIF\ CFLAG:306\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '804',
        any: [/^\s*PRINTFORMW\ 「小孩子一样呢……喜欢玩胸部」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '805',
        any: [/^\s*CFLAG:306\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '804-806',
        any: [/^\s*PRINTFORMW\ 「小孩子一样呢……喜欢玩胸部」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '804-807',
        any: [/^\s*PRINTFORMW\ 「小孩子一样呢……喜欢玩胸部」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '804-808',
        any: [/^\s*PRINTFORMW\ 「小孩子一样呢……喜欢玩胸部」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '809-812',
        any: [/^\s*;キスする\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '814',
        any: [/^\s*IF\ SELECTCOM\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '816',
        any: [/^\s*IF\ CFLAG:307\ ==\ 0\ \&\&\ TFLAG:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '818',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ASSIPLAY\ ==\ 0\ \&\&\ TEQUIP:89\ ==\ 0\ \&\&\ TEQUIP:90\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '819',
        any: [/^\s*PRINTFORMW\ 「第一次哎……这么、热烈的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '821',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%真是头一次哎……像这样的、当初那个人……都没做过」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '823',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ASSIPLAY\ ==\ 0\ \&\&\ TEQUIP:89\ ==\ 0\ \&\&\ TEQUIP:90\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '824',
        any: [/^\s*PRINTFORMW\ 「啊啊……亲爱的、好开心……感觉要舒服死了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '826',
        any: [
          /^\s*PRINTFORMW\ （对不起……%SELF_CALL\(TARGET\)%的初吻被夺走了）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '828-829',
        any: [/^\s*PRINTFORMW\ 「我这是第一次哦、不要太粗暴啦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '829',
        any: [/^\s*PRINTFORMW\ 「我这是第一次哦、不要太粗暴啦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '831',
        any: [
          /^\s*PRINTFORMW\ （对不起……%SELF_CALL\(TARGET\)%的初吻就这样被夺走了）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '831-832',
        any: [
          /^\s*PRINTFORMW\ （对不起……%SELF_CALL\(TARGET\)%的初吻就这样被夺走了）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '833',
        any: [/^\s*CFLAG:307\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '831-834',
        any: [
          /^\s*PRINTFORMW\ （对不起……%SELF_CALL\(TARGET\)%的初吻就这样被夺走了）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '836',
        any: [/^\s*ELSEIF\ CFLAG:307\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '838',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '839',
        any: [/^\s*PRINTFORMW\ 「终于吻了我呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '841',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '842',
        any: [
          /^\s*PRINTFORMW\ 「呵呵、你的嘴唇…我早就看中了。一直期待着」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '844-845',
        any: [/^\s*PRINTFORMW\ 「只是初吻而已、别太得意了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '845',
        any: [/^\s*PRINTFORMW\ 「只是初吻而已、别太得意了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '845-846',
        any: [/^\s*PRINTFORMW\ 「只是初吻而已、别太得意了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '847',
        any: [/^\s*CFLAG:307\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '845-848',
        any: [/^\s*PRINTFORMW\ 「只是初吻而已、别太得意了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '850-852',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '852',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '853',
        any: [/^\s*PRINTFORMW\ 「想要让舌头交缠起来……？　呵呵、挺行嘛」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '854',
        any: [/^\s*CFLAG:307\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '856',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '857',
        any: [/^\s*PRINTFORMW\ 「啊啊…不仅仅是吻…心也被夺走了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '858',
        any: [/^\s*CFLAG:307\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '860',
        any: [
          /^\s*ELSEIF\ ABL:10\ >=2\ \&\&\ \(CFLAG:307\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '861',
        any: [/^\s*PRINTFORMW\ 「和%SELF_CALL\(TARGET\)%接吻感觉怎样？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '862',
        any: [/^\s*CFLAG:307\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '864',
        any: [/^\s*ELSEIF\ CFLAG:307\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '865',
        any: [/^\s*PRINTFORMW\ 「不、不要……呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '866',
        any: [/^\s*CFLAG:307\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '865-867',
        any: [/^\s*PRINTFORMW\ 「不、不要……呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '865-868',
        any: [/^\s*PRINTFORMW\ 「不、不要……呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '865-869',
        any: [/^\s*PRINTFORMW\ 「不、不要……呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '870-873',
        any: [/^\s*;秘貝開帳\ CFLAG:308\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '875',
        any: [/^\s*IF\ SELECTCOM\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '877',
        any: [/^\s*IF\ CFLAG:308\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '879',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '880',
        any: [
          /^\s*PRINTFORMW\ 「看得见吗……？　%SELF_CALL\(TARGET\)%这下流的地方……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '882',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '883',
        any: [
          /^\s*PRINTFORMW\ 「请仔细地看……能看见%SELF_CALL\(TARGET\)%里面吗♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '885-886',
        any: [/^\s*PRINTFORMW\ 「真是羞耻……在这种地方扒开了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '886',
        any: [/^\s*PRINTFORMW\ 「真是羞耻……在这种地方扒开了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '886-887',
        any: [/^\s*PRINTFORMW\ 「真是羞耻……在这种地方扒开了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '888',
        any: [/^\s*CFLAG:TARGET:308\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '888-889',
        any: [/^\s*CFLAG:TARGET:308\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '891-893',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:308\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '893',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:308\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '894',
        any: [
          /^\s*PRINTFORMW\ 「好看吗……%SELF_CALL\(TARGET\)%的下流的小蜜桃……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '895',
        any: [/^\s*CFLAG:306\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '897',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:308\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '898',
        any: [
          /^\s*PRINTFORMW\ 「好看吗……这种地方%SELF_CALL\(TARGET\)%只会给你看♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '899',
        any: [/^\s*CFLAG:306\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '901',
        any: [
          /^\s*ELSEIF\ ABL:17\ >=\ 3\ \&\&\ \(CFLAG:308\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '902',
        any: [
          /^\s*PRINTFORMW\ 「好看吗……%SELF_CALL\(TARGET\)%的让人害羞的地方……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '903',
        any: [/^\s*CFLAG:306\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '905',
        any: [/^\s*ELSEIF\ CFLAG:306\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '906',
        any: [/^\s*PRINTFORMW\ 「讨厌……让人做这种事情……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '907',
        any: [/^\s*CFLAG:306\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '906-908',
        any: [/^\s*PRINTFORMW\ 「讨厌……让人做这种事情……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '906-909',
        any: [/^\s*PRINTFORMW\ 「讨厌……让人做这种事情……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '906-910',
        any: [/^\s*PRINTFORMW\ 「讨厌……让人做这种事情……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '911-914',
        any: [/^\s*;指挿入れ\ CFLAG:309\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '916',
        any: [/^\s*IF\ SELECTCOM\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '918',
        any: [/^\s*IF\ CFLAG:TARGET:309\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '920',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '921',
        any: [/^\s*PRINTFORMW\ 「可以多用几根手指吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '923',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '924',
        any: [/^\s*PRINTFORMW\ 「你的手指……又细又长……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '926-927',
        any: [/^\s*PRINTFORMW\ 「讨厌···好难受了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '927',
        any: [/^\s*PRINTFORMW\ 「讨厌···好难受了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '927-928',
        any: [/^\s*PRINTFORMW\ 「讨厌···好难受了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '929',
        any: [/^\s*CFLAG:TARGET:309\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '929-930',
        any: [/^\s*CFLAG:TARGET:309\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '932-934',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:309\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '934',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:309\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '935',
        any: [
          /^\s*PRINTFORMW\ 「不行……想被插到深处……居然会有这样的想法……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '936',
        any: [/^\s*CFLAG:309\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '938',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:309\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '939',
        any: [/^\s*PRINTFORMW\ 「啊啊啊……好厉害……腰忍不住摆动起来了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '940',
        any: [/^\s*CFLAG:309\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '942',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:309\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '943',
        any: [/^\s*PRINTFORMW\ 「不行……感觉太羞耻了……讨厌……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '944',
        any: [/^\s*CFLAG:309\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '946',
        any: [/^\s*ELSEIF\ CFLAG:309\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '947',
        any: [/^\s*PRINTFORMW\ 「太难受了……请停止吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '948',
        any: [/^\s*CFLAG:309\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '948-949',
        any: [/^\s*CFLAG:309\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '948-950',
        any: [/^\s*CFLAG:309\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '948-951',
        any: [/^\s*CFLAG:309\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '952-955',
        any: [/^\s*;アナル舐め\ CFLAG:310\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '957',
        any: [/^\s*IF\ SELECTCOM\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '959',
        any: [/^\s*IF\ CFLAG:310\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '961',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '962',
        any: [/^\s*PRINTFORMW\ 「啊啊啊、肛门上滑滑的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '964',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '965',
        any: [/^\s*PRINTFORMW\ 「哎呀、那样的地方、请不要舔♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '967-968',
        any: [/^\s*PRINTFORMW\ 「讨厌……脏啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '968',
        any: [/^\s*PRINTFORMW\ 「讨厌……脏啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '968-969',
        any: [/^\s*PRINTFORMW\ 「讨厌……脏啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '970',
        any: [/^\s*CFLAG:TARGET:310\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '968-971',
        any: [/^\s*PRINTFORMW\ 「讨厌……脏啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '973-975',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '975',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '976',
        any: [/^\s*PRINTFORMW\ 「那个、屁股好像有点松开来了……～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '977',
        any: [/^\s*CFLAG:310\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '979',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '980',
        any: [/^\s*PRINTFORMW\ 「万分感谢、竟疼爱到了这样的地方……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '981',
        any: [/^\s*CFLAG:310\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '983',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:310\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '984',
        any: [/^\s*PRINTFORMW\ 「啊啊……后面变得好湿……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '985',
        any: [/^\s*CFLAG:310\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '987',
        any: [/^\s*ELSEIF\ CFLAG:310\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '988',
        any: [/^\s*PRINTFORMW\ 「你在想什么……不脏吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '989',
        any: [/^\s*CFLAG:310\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '988-990',
        any: [/^\s*PRINTFORMW\ 「你在想什么……不脏吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '988-991',
        any: [/^\s*PRINTFORMW\ 「你在想什么……不脏吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '988-992',
        any: [/^\s*PRINTFORMW\ 「你在想什么……不脏吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '993-996',
        any: [/^\s*;ローター\ CFLAG:311\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '998',
        any: [/^\s*IF\ SELECTCOM\ ==\ 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1000',
        any: [/^\s*IF\ CFLAG:TARGET:311\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1002',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1003',
        any: [/^\s*PRINTFORMW\ 「啊啊啊啊……要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1005',
        any: [/^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1006',
        any: [/^\s*PRINTFORMW\ 「这个用多了会上瘾的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1008-1009',
        any: [/^\s*PRINTFORMW\ 「讨厌……用这种不知羞耻的东西……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1009',
        any: [/^\s*PRINTFORMW\ 「讨厌……用这种不知羞耻的东西……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1009-1010',
        any: [/^\s*PRINTFORMW\ 「讨厌……用这种不知羞耻的东西……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1011',
        any: [/^\s*CFLAG:TARGET:311\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1011-1012',
        any: [/^\s*CFLAG:TARGET:311\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1014-1016',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:311\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1016',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:311\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1017',
        any: [/^\s*PRINTFORMW\ 「下面……都要没知觉了……啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1018',
        any: [/^\s*CFLAG:311\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1020',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:311\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1021',
        any: [/^\s*PRINTFORMW\ 「有点快感……请继续下去……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1022',
        any: [/^\s*CFLAG:311\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1024',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:311\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1025',
        any: [/^\s*PRINTFORMW\ 「呜……身子要飞起来了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1026',
        any: [/^\s*CFLAG:311\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1028',
        any: [/^\s*ELSEIF\ CFLAG:311\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1029',
        any: [/^\s*PRINTFORMW\ 「哎呀……不要这样……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1030',
        any: [/^\s*CFLAG:311\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1030-1031',
        any: [/^\s*CFLAG:311\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1030-1032',
        any: [/^\s*CFLAG:311\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1030-1033',
        any: [/^\s*CFLAG:311\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1030-1034',
        any: [/^\s*CFLAG:311\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1040',
        any: [/^\s*IF\ SELECTCOM\ ==\ 11\ \&\&\ TEQUIP:11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1042',
        any: [/^\s*IF\ CFLAG:TARGET:312\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1044',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1046',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1047',
        any: [
          /^\s*PRINTFORMW\ 「竟然被这样的东西夺走了贞操……你真不是什么好人呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1049',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1050',
        any: [
          /^\s*PRINTFORMW\ 「您是认真的吗、%SELF_CALL\(TARGET\)%的第一次让这种东西拿走？　您不会后悔吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1052-1053',
        any: [/^\s*PRINTFORMW\ 「讨厌……你这个变态……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1053',
        any: [/^\s*PRINTFORMW\ 「讨厌……你这个变态……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1053-1054',
        any: [/^\s*PRINTFORMW\ 「讨厌……你这个变态……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1053-1056',
        any: [/^\s*PRINTFORMW\ 「讨厌……你这个变态……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1058',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1059',
        any: [/^\s*PRINTFORMW\ 「啊、这个东西真恶心……难看死了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1061',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1062',
        any: [/^\s*PRINTFORMW\ 「饲养了奇怪的东西啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1064-1065',
        any: [/^\s*PRINTFORMW\ 「这是……什么啊…真恶心」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1065',
        any: [/^\s*PRINTFORMW\ 「这是……什么啊…真恶心」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1065-1066',
        any: [/^\s*PRINTFORMW\ 「这是……什么啊…真恶心」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1067-1068',
        any: [/^\s*CFLAG:312\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1068',
        any: [/^\s*CFLAG:312\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1068-1069',
        any: [/^\s*CFLAG:312\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1071-1073',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:312\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1073',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:312\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1074',
        any: [/^\s*PRINTFORMW\ 「在里面乱动啊……啊啊啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1075',
        any: [/^\s*CFLAG:312\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1077',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:312\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1078',
        any: [/^\s*PRINTFORMW\ 「感受到了……这样的东西……被爱的话」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1079',
        any: [/^\s*CFLAG:312\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1081',
        any: [
          /^\s*ELSEIF\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:312\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1082',
        any: [/^\s*PRINTFORMW\ 「它在里面动啊……快拿出来……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1083',
        any: [/^\s*CFLAG:312\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1085',
        any: [/^\s*ELSEIF\ CFLAG:312\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1086',
        any: [/^\s*PRINTFORMW\ 「真恶心……你有什么目的？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1087',
        any: [/^\s*CFLAG:312\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1087-1088',
        any: [/^\s*CFLAG:312\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1087-1089',
        any: [/^\s*CFLAG:312\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1090-1092',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 11\ \&\&\ TEQUIP:11\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1092',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 11\ \&\&\ TEQUIP:11\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1094',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:372\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1095',
        any: [/^\s*PRINTFORMW\ 「嘻嘻、太好了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1096',
        any: [/^\s*CFLAG:372\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1098',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:372\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1099',
        any: [/^\s*PRINTFORMW\ 「啊…好疼」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1100',
        any: [/^\s*CFLAG:372\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1102',
        any: [/^\s*ELSEIF\ CFLAG:372\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1103',
        any: [/^\s*PRINTFORMW\ 「哈……哈」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1104',
        any: [/^\s*CFLAG:372\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1104-1105',
        any: [/^\s*CFLAG:372\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1104-1106',
        any: [/^\s*CFLAG:372\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1104-1107',
        any: [/^\s*CFLAG:372\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1112',
        any: [/^\s*IF\ SELECTCOM\ ==\ 12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1114',
        any: [/^\s*IF\ CFLAG:313\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1116',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1117',
        any: [/^\s*PRINTFORMW\ 「喂、有这种好东西之前为什么不告诉我？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1119',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1120',
        any: [
          /^\s*PRINTFORMW\ 「要是知道您有这种好东西的话……也许就会把您晾在一边了哦？\ 嘻嘻」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1122-1123',
        any: [/^\s*PRINTFORMW\ 「咦、震得好厉害……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1123',
        any: [/^\s*PRINTFORMW\ 「咦、震得好厉害……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1123-1124',
        any: [/^\s*PRINTFORMW\ 「咦、震得好厉害……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1125',
        any: [/^\s*CFLAG:313\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1125-1126',
        any: [/^\s*CFLAG:313\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1128-1130',
        any: [
          /^\s*IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:313\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1130',
        any: [
          /^\s*IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:313\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1131',
        any: [
          /^\s*PRINTFORMW\ 「这个、用了会让人上瘾的……真想沉浸在这快感里……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1132',
        any: [/^\s*CFLAG:313\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1134',
        any: [
          /^\s*ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:313\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1135',
        any: [/^\s*PRINTFORMW\ 「这道具真棒……嗯嗯、这……好……赞啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1136',
        any: [/^\s*CFLAG:313\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1138',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:313\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1139',
        any: [/^\s*PRINTFORMW\ 「啊啊啊啊……感觉太……～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1140',
        any: [/^\s*CFLAG:313\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1142',
        any: [/^\s*ELSEIF\ CFLAG:313\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1143',
        any: [/^\s*PRINTFORMW\ 「天啊……腰要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1144',
        any: [/^\s*CFLAG:313\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1144-1145',
        any: [/^\s*CFLAG:313\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1144-1146',
        any: [/^\s*CFLAG:313\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1144-1147',
        any: [/^\s*CFLAG:313\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1144-1148',
        any: [/^\s*CFLAG:313\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1154',
        any: [/^\s*IF\ SELECTCOM\ ==\ 13\ \&\&\ TEQUIP:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1156',
        any: [/^\s*IF\ CFLAG:TARGET:314\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1158',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1159',
        any: [/^\s*PRINTFORMW\ 「好像会很棒啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1161',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1162',
        any: [/^\s*PRINTFORMW\ 「奇怪的生物啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1164-1165',
        any: [/^\s*PRINTFORMW\ 「真……脏……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1165',
        any: [/^\s*PRINTFORMW\ 「真……脏……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1165-1166',
        any: [/^\s*PRINTFORMW\ 「真……脏……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1167',
        any: [/^\s*CFLAG:TARGET:314\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1167-1168',
        any: [/^\s*CFLAG:TARGET:314\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1170-1172',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1172',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1173',
        any: [/^\s*PRINTFORMW\ 「啊……肛门♪　爽的要飞起来了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1174',
        any: [/^\s*CFLAG:314\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1176',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:314\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1177',
        any: [/^\s*PRINTFORMW\ 「啊……从肛门进去了……？　有点痒痒的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1178',
        any: [/^\s*CFLAG:314\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1180',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1181',
        any: [/^\s*PRINTFORMW\ 「屁股要坏掉了……激烈的滑动着腰部♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1182',
        any: [/^\s*CFLAG:314\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1184',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:314\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1185',
        any: [/^\s*PRINTFORMW\ 「屁股……里面……感觉变得好奇怪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1186',
        any: [/^\s*CFLAG:314\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1188',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1189',
        any: [/^\s*PRINTFORMW\ 「呜呜……屁股快要被弄得高潮了……救救我……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1190',
        any: [/^\s*CFLAG:314\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1192',
        any: [/^\s*ELSEIF\ \ CFLAG:314\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1193',
        any: [/^\s*PRINTFORMW\ 「呜呜……脏死了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1194',
        any: [/^\s*CFLAG:314\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1194-1195',
        any: [/^\s*CFLAG:314\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1194-1196',
        any: [/^\s*CFLAG:314\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1197-1199',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 13\ \&\&\ TEQUIP:13\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1199',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 13\ \&\&\ TEQUIP:13\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1201',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:374\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1202',
        any: [/^\s*PRINTFORMW\ 「一口气……一口气拔出来♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1203',
        any: [/^\s*CFLAG:374\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1205',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:374\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1206',
        any: [/^\s*PRINTFORMW\ 「呼呼……已经结束吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1207',
        any: [/^\s*CFLAG:374\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1209',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:374\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1210',
        any: [/^\s*PRINTFORMW\ 「不行……拔的时候……肛门会翻出来吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1211',
        any: [/^\s*CFLAG:374\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1213',
        any: [/^\s*ELSEIF\ CFLAG:374\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1214',
        any: [/^\s*PRINTFORMW\ 「天啊……拔的时候慢一点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1215',
        any: [/^\s*CFLAG:374\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1215-1216',
        any: [/^\s*CFLAG:374\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1215-1217',
        any: [/^\s*CFLAG:374\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1215-1218',
        any: [/^\s*CFLAG:374\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1440',
        any: [/^\s*IF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1442',
        any: [/^\s*IF\ CFLAG:TARGET:320\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1444',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1445',
        any: [/^\s*PRINTFORMW\ 「长了根小尾巴……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1447',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1448',
        any: [/^\s*PRINTFORMW\ 「屁股里面被塞满了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1450-1451',
        any: [/^\s*PRINTFORMW\ 「啊、把什么放进去……？　肛珠……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1451',
        any: [/^\s*PRINTFORMW\ 「啊、把什么放进去……？　肛珠……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1451-1452',
        any: [/^\s*PRINTFORMW\ 「啊、把什么放进去……？　肛珠……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1453',
        any: [/^\s*CFLAG:TARGET:320\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1453-1454',
        any: [/^\s*CFLAG:TARGET:320\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1456-1458',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1458',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1459',
        any: [/^\s*PRINTFORMW\ 「哈……终于全部放进去了……表扬我吧♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1460',
        any: [/^\s*CFLAG:320\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1462',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:320\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1463',
        any: [/^\s*PRINTFORMW\ 「唔、果然还是太勉强了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1464',
        any: [/^\s*CFLAG:320\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1466',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1467',
        any: [/^\s*PRINTFORMW\ 「好厉害……全部都放进去了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1468',
        any: [/^\s*CFLAG:320\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1470',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:320\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1471',
        any: [/^\s*PRINTFORMW\ 「啊、不行……太勉强了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1472',
        any: [/^\s*CFLAG:320\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1474',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1475',
        any: [/^\s*PRINTFORMW\ 「呜……不要再……往里塞了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1476',
        any: [/^\s*CFLAG:320\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1478',
        any: [/^\s*ELSEIF\ \ CFLAG:320\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1479',
        any: [/^\s*PRINTFORMW\ 「不行……绝对不能放进去……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1480',
        any: [/^\s*CFLAG:320\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1480-1481',
        any: [/^\s*CFLAG:320\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1480-1482',
        any: [/^\s*CFLAG:320\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1483-1485',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1485',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1487',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:379\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1488',
        any: [/^\s*PRINTFORMW\ 「一口气全部拔出来吧♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1489',
        any: [/^\s*CFLAG:379\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1491',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:379\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1492',
        any: [/^\s*PRINTFORMW\ 「一口气抽出也没关系哟……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1493',
        any: [/^\s*CFLAG:379\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1495',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:379\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1496',
        any: [/^\s*PRINTFORMW\ 「快、快点拔出去……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1497',
        any: [/^\s*CFLAG:379\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1499',
        any: [/^\s*ELSEIF\ CFLAG:379\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1500',
        any: [/^\s*PRINTFORMW\ 「啊不行……好疼……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1501',
        any: [/^\s*CFLAG:379\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1501-1502',
        any: [/^\s*CFLAG:379\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1501-1503',
        any: [/^\s*CFLAG:379\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1501-1504',
        any: [/^\s*CFLAG:379\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1509',
        any: [/^\s*IF\ SELECTCOM\ ==\ 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1511',
        any: [/^\s*IF\ CFLAG:TARGET:321\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1513',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1515',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1516',
        any: [/^\s*PRINTFORMW\ 「第一次给了你…好荣幸♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1518',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ ABL:10\ >=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1519',
        any: [/^\s*PRINTFORMW\ 「第一次……请、插更深一点」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1521-1522',
        any: [/^\s*PRINTFORMW\ 「第一次被夺走了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1522',
        any: [/^\s*PRINTFORMW\ 「第一次被夺走了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1522-1523',
        any: [/^\s*PRINTFORMW\ 「第一次被夺走了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1525-1527',
        any: [/^\s*PRINTFORMW\ 「那么、请进去吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1526',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1527',
        any: [/^\s*PRINTFORMW\ 「那么、请进去吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1529',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1530',
        any: [/^\s*PRINTFORMW\ 「用力抱紧了……插得更深了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1532-1533',
        any: [/^\s*PRINTFORMW\ 「放进去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1533',
        any: [/^\s*PRINTFORMW\ 「放进去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1533-1534',
        any: [/^\s*PRINTFORMW\ 「放进去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1535-1536',
        any: [/^\s*CFLAG:321\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1536',
        any: [/^\s*CFLAG:321\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1536-1537',
        any: [/^\s*CFLAG:321\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1539-1541',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1541',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1542',
        any: [/^\s*PRINTFORMW\ 「来啊……深处…更舒服了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1543',
        any: [/^\s*CFLAG:321\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1545',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1546',
        any: [/^\s*PRINTFORMW\ 「这样好了……快要被压垮了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1547',
        any: [/^\s*CFLAG:321\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1549',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:321\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1552',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1554',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1555',
        any: [
          /^\s*PRINTFORMW\ 「哈啊…这么大这么硬…好棒%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1556',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1557',
        any: [/^\s*PRINTFORML\ 「别……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1558',
        any: [/^\s*PRINTFORML\ 「啊嗯…咿呀…哈啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1559',
        any: [
          /^\s*PRINTFORML\ 「哈啊…这么大这么硬…好棒%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1560',
        any: [
          /^\s*PRINTFORMW\ \(根本无法和主人相提并论嘛……老公的那根……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1561-1564',
        any: [/^\s*PRINT\ 啊啊啊…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1562',
        any: [/^\s*PRINT\ 「亲爱的…请原谅……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1563',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1564',
        any: [/^\s*PRINT\ 啊啊啊…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1565',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1566',
        any: [/^\s*PRINT\ 不行…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1566-1567',
        any: [/^\s*PRINT\ 不行…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1568',
        any: [/^\s*PRINT\ 噫噫…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1568-1569',
        any: [/^\s*PRINT\ 噫噫…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1570',
        any: [/^\s*PRINTFORMW\ %UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1571-1573',
        any: [/^\s*PRINTFORMW\ 「咕嗯、有、有感觉……了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1572-1573',
        any: [/^\s*PRINTFORMW\ 「咕嗯、有、有感觉……了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1573',
        any: [/^\s*PRINTFORMW\ 「咕嗯、有、有感觉……了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1573-1574',
        any: [/^\s*PRINTFORMW\ 「咕嗯、有、有感觉……了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1575',
        any: [/^\s*CFLAG:321\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1577',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:321\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1578',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1579',
        any: [/^\s*PRINTFORMW\ 「这个样子、才没有感觉呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1580',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1581',
        any: [/^\s*PRINTFORMW\ 「请…再温柔一些……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1581-1582',
        any: [/^\s*PRINTFORMW\ 「请…再温柔一些……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1583',
        any: [/^\s*PRINTFORMW\ 「呜…竟然有感觉……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1583-1584',
        any: [/^\s*PRINTFORMW\ 「呜…竟然有感觉……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1585',
        any: [/^\s*CFLAG:321\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1587',
        any: [/^\s*ELSEIF\ CFLAG:321\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1588',
        any: [/^\s*PRINTFORMW\ 「真恶心……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1589',
        any: [/^\s*CFLAG:321\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1589-1590',
        any: [/^\s*CFLAG:321\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1589-1591',
        any: [/^\s*CFLAG:321\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1589-1592',
        any: [/^\s*CFLAG:321\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1593-1596',
        any: [/^\s*;後背位\ CFLAG:322\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1598',
        any: [/^\s*IF\ SELECTCOM\ ==\ 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1600',
        any: [/^\s*IF\ CFLAG:TARGET:322\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1602',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1604',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1605',
        any: [
          /^\s*PRINTFORMW\ 「用这样下流的体位让我成为了女人……真高兴呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1607',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1608',
        any: [/^\s*PRINTFORMW\ 「啊啊\ 、终于能将第一次献给你了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1611-1612',
        any: [/^\s*PRINTFORMW\ 「唔……这么屈辱的样子……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1612',
        any: [/^\s*PRINTFORMW\ 「唔……这么屈辱的样子……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1612-1613',
        any: [/^\s*PRINTFORMW\ 「唔……这么屈辱的样子……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1612-1615',
        any: [/^\s*PRINTFORMW\ 「唔……这么屈辱的样子……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1617',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1618',
        any: [
          /^\s*PRINTFORMW\ 「哎呀、一直等着你呢……终于、从后面来上我了♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1620',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1621',
        any: [/^\s*PRINTFORMW\ 「后面、呀啊…♪好棒……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1623-1624',
        any: [/^\s*PRINTFORMW\ 「这种屈辱的样子……！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1624',
        any: [/^\s*PRINTFORMW\ 「这种屈辱的样子……！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1624-1625',
        any: [/^\s*PRINTFORMW\ 「这种屈辱的样子……！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1624-1626',
        any: [/^\s*PRINTFORMW\ 「这种屈辱的样子……！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1627',
        any: [/^\s*CFLAG:322\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1624-1628',
        any: [/^\s*PRINTFORMW\ 「这种屈辱的样子……！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1630-1632',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1632',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1633',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1634',
        any: [/^\s*PRINTFORMW\ 「后入什么的好舒服啊……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1635',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1636',
        any: [/^\s*PRINTFORMW\ 「来…插的更深一点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1636-1637',
        any: [/^\s*PRINTFORMW\ 「来…插的更深一点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1638',
        any: [/^\s*PRINTFORMW\ 「再插得快一点……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1638-1639',
        any: [/^\s*PRINTFORMW\ 「再插得快一点……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1640',
        any: [/^\s*CFLAG:322\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1642',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1643',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1644',
        any: [/^\s*PRINTFORMW\ 「感受到了呢……啊啊啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1645',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1646',
        any: [/^\s*PRINTFORMW\ 「屁股、请再多揉揉它……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1646-1647',
        any: [/^\s*PRINTFORMW\ 「屁股、请再多揉揉它……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1648',
        any: [/^\s*PRINTFORMW\ 「那样、好棒……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1648-1649',
        any: [/^\s*PRINTFORMW\ 「那样、好棒……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1650',
        any: [/^\s*CFLAG:322\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1652',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:322\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1653',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1655',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1656',
        any: [/^\s*PRINT\ 「哈啊…请您\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1657',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1658',
        any: [/^\s*PRINT\ 抽插%SELF_CALL\(TARGET\)%的时候\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1658-1659',
        any: [/^\s*PRINT\ 抽插%SELF_CALL\(TARGET\)%的时候\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1660',
        any: [/^\s*PRINT\ 侵犯%SELF_CALL\(TARGET\)%的时候\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1660-1661',
        any: [/^\s*PRINT\ 侵犯%SELF_CALL\(TARGET\)%的时候\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1662',
        any: [/^\s*PRINTFORM\ %UNICODE\(0x2661\)\ \*1%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1663',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1664',
        any: [/^\s*PRINT\ 」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1664-1665',
        any: [/^\s*PRINT\ 」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1666',
        any: [/^\s*PRINT\ ……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1667',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1668',
        any: [/^\s*PRINT\ 再激烈一点…\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1669',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1670',
        any: [/^\s*PRINTFORMW\ 才好啊%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1670-1671',
        any: [/^\s*PRINTFORMW\ 才好啊%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1672',
        any: [/^\s*PRINTFORMW\ 更喜欢…%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1672-1673',
        any: [/^\s*PRINTFORMW\ 更喜欢…%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1674-1675',
        any: [/^\s*PRINT\ 把%SELF_CALL\(TARGET\)%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1675',
        any: [/^\s*PRINT\ 把%SELF_CALL\(TARGET\)%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1676',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1677',
        any: [/^\s*PRINT\ 弄得乱七八糟的\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1677-1678',
        any: [/^\s*PRINT\ 弄得乱七八糟的\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1679',
        any: [/^\s*PRINT\ 插得更加乱七八糟\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1679-1680',
        any: [/^\s*PRINT\ 插得更加乱七八糟\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1681',
        any: [/^\s*PRINTFORMW\ %UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1679-1682',
        any: [/^\s*PRINT\ 插得更加乱七八糟\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1679-1683',
        any: [/^\s*PRINT\ 插得更加乱七八糟\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1684',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1685',
        any: [/^\s*PRINTFORML\ 「别……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1686',
        any: [/^\s*PRINTFORML\ 「啊嗯…咿呀…哈啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1687',
        any: [
          /^\s*PRINTFORML\ 「哈啊…这么大这么硬…好棒%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1688',
        any: [
          /^\s*PRINTFORMW\ \(根本无法和主人相提并论嘛……老公的那根……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1689-1692',
        any: [/^\s*PRINT\ ああっ啊啊啊\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1690',
        any: [/^\s*PRINT\ 「亲爱的…请原谅……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1691',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1692',
        any: [/^\s*PRINT\ ああっ啊啊啊\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1693',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1694',
        any: [/^\s*PRINT\ 不行\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1694-1695',
        any: [/^\s*PRINT\ 不行\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1696',
        any: [/^\s*PRINT\ 噫噫\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1696-1697',
        any: [/^\s*PRINT\ 噫噫\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1698',
        any: [/^\s*PRINTFORMW\ %UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1699-1701',
        any: [/^\s*PRINTFORMW\ 「不行、这种样子……但是……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1700-1701',
        any: [/^\s*PRINTFORMW\ 「不行、这种样子……但是……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1701',
        any: [/^\s*PRINTFORMW\ 「不行、这种样子……但是……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1701-1702',
        any: [/^\s*PRINTFORMW\ 「不行、这种样子……但是……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1703',
        any: [/^\s*CFLAG:322\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1705',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:322\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1706',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1707',
        any: [/^\s*PRINTFORMW\ 「真的……像狗一样……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1708',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1709',
        any: [/^\s*PRINT\ 「有感觉了什么的……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1710',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1711',
        any: [/^\s*PRINTW\ 」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1712',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1713',
        any: [/^\s*PRINTW\ 怎么可能……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1713-1714',
        any: [/^\s*PRINTW\ 怎么可能……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1715',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*1%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1715-1716',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*1%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1715-1717',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*1%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1718',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1719',
        any: [/^\s*PRINT\ 「这副模样……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1719-1720',
        any: [/^\s*PRINT\ 「这副模样……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1721',
        any: [/^\s*PRINT\ 「\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1721-1722',
        any: [/^\s*PRINT\ 「\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1723',
        any: [/^\s*PRINT\ 好羞耻……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1724',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1725',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1725-1726',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1727',
        any: [/^\s*PRINTW\ 」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1725-1728',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1725-1729',
        any: [/^\s*PRINTFORMW\ 啊啊%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1730',
        any: [/^\s*CFLAG:322\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1732',
        any: [/^\s*ELSEIF\ CFLAG:322\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1733',
        any: [/^\s*PRINTFORMW\ 「哈、哈……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1735',
        any: [/^\s*CFLAG:322\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1733-1736',
        any: [/^\s*PRINTFORMW\ 「哈、哈……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1733-1737',
        any: [/^\s*PRINTFORMW\ 「哈、哈……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1738-1742',
        any: [/^\s*;対面座位\ CFLAG:323\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1739-1742',
        any: [/^\s*;対面座位\ CFLAG:323\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1744',
        any: [/^\s*IF\ SELECTCOM\ ==\ 22\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1745',
        any: [/^\s*IF\ CFLAG:TARGET:323\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1747',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1749',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1750',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1752',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1753',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1745-1755',
        any: [/^\s*IF\ CFLAG:TARGET:323\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1756',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1745-1757',
        any: [/^\s*IF\ CFLAG:TARGET:323\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1759-1771',
        any: [/^\s*CFLAG:323\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1761',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1762',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1764',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1765',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1767-1771',
        any: [/^\s*CFLAG:323\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1768',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1769-1771',
        any: [/^\s*CFLAG:323\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1770-1771',
        any: [/^\s*CFLAG:323\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1771',
        any: [/^\s*CFLAG:323\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1771-1772',
        any: [/^\s*CFLAG:323\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1774-1776',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:323\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1776',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:323\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1777',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1778',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1779',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1780',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1781-1784',
        any: [/^\s*CFLAG:323\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1782',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1783-1784',
        any: [/^\s*CFLAG:323\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1784',
        any: [/^\s*CFLAG:323\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1786',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:323\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1787',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1788',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1789',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1790',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1791-1794',
        any: [/^\s*CFLAG:323\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1792',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1793-1794',
        any: [/^\s*CFLAG:323\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1794',
        any: [/^\s*CFLAG:323\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1796',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:323\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1797',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1798',
        any: [/^\s*CFLAG:323\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1800',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:323\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1801',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1802',
        any: [/^\s*CFLAG:323\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1804',
        any: [/^\s*ELSEIF\ CFLAG:323\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1805',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1806',
        any: [/^\s*CFLAG:323\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1806-1807',
        any: [/^\s*CFLAG:323\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1806-1808',
        any: [/^\s*CFLAG:323\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1806-1809',
        any: [/^\s*CFLAG:323\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1810-1813',
        any: [/^\s*;背面座位\ CFLAG:324\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1815',
        any: [/^\s*IF\ SELECTCOM\ ==\ 23\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1816',
        any: [/^\s*IF\ CFLAG:TARGET:324\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1818',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1820',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1821',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1823',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1824',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1816-1826',
        any: [/^\s*IF\ CFLAG:TARGET:324\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1827',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1816-1828',
        any: [/^\s*IF\ CFLAG:TARGET:324\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1830-1842',
        any: [/^\s*CFLAG:324\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1832',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1833',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1835',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1836',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1838-1842',
        any: [/^\s*CFLAG:324\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1839',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1840-1842',
        any: [/^\s*CFLAG:324\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1841-1842',
        any: [/^\s*CFLAG:324\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1842',
        any: [/^\s*CFLAG:324\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1842-1843',
        any: [/^\s*CFLAG:324\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1845-1847',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:324\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1847',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:324\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1848',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1849',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1850',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1851',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1852-1855',
        any: [/^\s*CFLAG:324\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1853',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1854-1855',
        any: [/^\s*CFLAG:324\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1855',
        any: [/^\s*CFLAG:324\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1857',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:324\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1858',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1859',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1860',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1861',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1862-1865',
        any: [/^\s*CFLAG:324\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1863',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1864-1865',
        any: [/^\s*CFLAG:324\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1865',
        any: [/^\s*CFLAG:324\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1867',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:324\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1868',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1869',
        any: [/^\s*CFLAG:324\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1871',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:324\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1872',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1873',
        any: [/^\s*CFLAG:324\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1875',
        any: [/^\s*ELSEIF\ CFLAG:324\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1876',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1877',
        any: [/^\s*CFLAG:324\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1877-1878',
        any: [/^\s*CFLAG:324\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1877-1879',
        any: [/^\s*CFLAG:324\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1877-1880',
        any: [/^\s*CFLAG:324\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1881-1884',
        any: [/^\s*;正常位アナル\ CFLAG:327\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1886',
        any: [/^\s*IF\ SELECTCOM\ ==\ 26\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1888',
        any: [/^\s*IF\ CFLAG:TARGET:327\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1890',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1891',
        any: [
          /^\s*PRINTFORMW\ 「快来嘛……%SELF_CALL\(TARGET\)%已经等不及了\ \ 嘻嘻」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1893',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1894',
        any: [/^\s*PRINTFORMW\ 「不要害怕……还可以再深一点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1896-1897',
        any: [/^\s*PRINTFORMW\ 「等一下……屁股已经……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1897',
        any: [/^\s*PRINTFORMW\ 「等一下……屁股已经……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1897-1898',
        any: [/^\s*PRINTFORMW\ 「等一下……屁股已经……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1899',
        any: [/^\s*CFLAG:TARGET:327\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1899-1900',
        any: [/^\s*CFLAG:TARGET:327\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1902-1904',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1904',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1905',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1906',
        any: [/^\s*PRINTFORMW\ 「快点……肛门已经快要忍不住了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1907',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1908',
        any: [/^\s*PRINTFORMW\ 「有点疼的但是完全不想停下来……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1908-1909',
        any: [/^\s*PRINTFORMW\ 「有点疼的但是完全不想停下来……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1910',
        any: [/^\s*PRINTFORMW\ 「啊……要去了……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1910-1911',
        any: [/^\s*PRINTFORMW\ 「啊……要去了……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1912',
        any: [/^\s*CFLAG:327\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1914',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:327\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1915',
        any: [/^\s*PRINTFORMW\ 「要温柔点哦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1916',
        any: [/^\s*CFLAG:327\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1918',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1919',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1920',
        any: [/^\s*PRINTFORMW\ 「屁股好舒服……？随时都可以射出来哦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1920-1921',
        any: [/^\s*PRINTFORMW\ 「屁股好舒服……？随时都可以射出来哦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1922',
        any: [/^\s*PRINTFORMW\ 「呵呵……小鸡鸡要忍不住了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1922-1923',
        any: [/^\s*PRINTFORMW\ 「呵呵……小鸡鸡要忍不住了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1924',
        any: [/^\s*CFLAG:327\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1926',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:327\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1927',
        any: [/^\s*PRINTFORMW\ 「要温柔点哦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1928',
        any: [/^\s*CFLAG:327\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1930',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1931',
        any: [/^\s*PRINTFORMW\ 「嗯唔……来啦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1932',
        any: [/^\s*CFLAG:327\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1934',
        any: [/^\s*ELSEIF\ \ CFLAG:327\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1935',
        any: [/^\s*PRINTFORMW\ 「痛……快停下、好可怕……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1936',
        any: [/^\s*CFLAG:327\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1936-1937',
        any: [/^\s*CFLAG:327\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1936-1938',
        any: [/^\s*CFLAG:327\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1936-1939',
        any: [/^\s*CFLAG:327\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1940-1943',
        any: [/^\s*;後背位アナル\ CFLAG:328\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1945',
        any: [/^\s*IF\ SELECTCOM\ ==\ 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1947',
        any: [/^\s*IF\ CFLAG:TARGET:328\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1949',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1950',
        any: [/^\s*PRINTFORMW\ 「来……已经等不下去了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1952',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1953',
        any: [/^\s*PRINTFORMW\ 「用这里做爱也一样啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1955-1956',
        any: [/^\s*PRINTFORMW\ 「啊、屁股不要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1956',
        any: [/^\s*PRINTFORMW\ 「啊、屁股不要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1956-1957',
        any: [/^\s*PRINTFORMW\ 「啊、屁股不要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1958',
        any: [/^\s*CFLAG:TARGET:328\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1956-1959',
        any: [/^\s*PRINTFORMW\ 「啊、屁股不要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1961-1963',
        any: [
          /^\s*IF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1963',
        any: [
          /^\s*IF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1964',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1965',
        any: [/^\s*PRINTFORMW\ 「屁股感觉被挖了一样……去了……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1965-1966',
        any: [/^\s*PRINTFORMW\ 「屁股感觉被挖了一样……去了……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1967',
        any: [/^\s*PRINTFORMW\ 「腰自己动起来了……完全停不下来了…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1967-1968',
        any: [/^\s*PRINTFORMW\ 「腰自己动起来了……完全停不下来了…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1969',
        any: [/^\s*CFLAG:328\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1971',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:328\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1972',
        any: [
          /^\s*PRINTFORMW\ 「啊啊、屁股是不是要比前面那个洞深的多了……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1973',
        any: [/^\s*CFLAG:328\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1975',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1976',
        any: [/^\s*PRINTFORMW\ 「被这样弄开……屁股变得好奇怪……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1977',
        any: [/^\s*CFLAG:328\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1979',
        any: [/^\s*ELSEIF\ \ CFLAG:328\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1980',
        any: [/^\s*PRINTFORMW\ 「啊……疼……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1981',
        any: [/^\s*CFLAG:328\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1980-1982',
        any: [/^\s*PRINTFORMW\ 「啊……疼……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1980-1983',
        any: [/^\s*PRINTFORMW\ 「啊……疼……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1980-1984',
        any: [/^\s*PRINTFORMW\ 「啊……疼……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1985-1988',
        any: [/^\s*;対面座位アナル\ CFLAG:329\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1990',
        any: [/^\s*IF\ SELECTCOM\ ==\ 28\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1992',
        any: [/^\s*IF\ CFLAG:TARGET:329\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1994',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1995',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1997',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '1998',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2000-2003',
        any: [/^\s*CFLAG:TARGET:329\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2001',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2002-2003',
        any: [/^\s*CFLAG:TARGET:329\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2003',
        any: [/^\s*CFLAG:TARGET:329\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2003-2004',
        any: [/^\s*CFLAG:TARGET:329\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2006-2008',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2008',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2009',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2010',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2011',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2012',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2013-2016',
        any: [/^\s*CFLAG:329\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2014',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2015-2016',
        any: [/^\s*CFLAG:329\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2016',
        any: [/^\s*CFLAG:329\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2018',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:329\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2019',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2020',
        any: [/^\s*CFLAG:329\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2022',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2023',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2024',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2022-2025',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2026',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2027-2028',
        any: [/^\s*CFLAG:329\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2028',
        any: [/^\s*CFLAG:329\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2030',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:329\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2031',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2032',
        any: [/^\s*CFLAG:329\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2034',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2035',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2036',
        any: [/^\s*CFLAG:329\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2038',
        any: [/^\s*ELSEIF\ \ CFLAG:329\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2039',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2040',
        any: [/^\s*CFLAG:329\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2040-2041',
        any: [/^\s*CFLAG:329\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2040-2042',
        any: [/^\s*CFLAG:329\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2040-2043',
        any: [/^\s*CFLAG:329\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2044-2047',
        any: [/^\s*;背面座位アナル\ CFLAG:330\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2049',
        any: [/^\s*IF\ SELECTCOM\ ==\ 29\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2051',
        any: [/^\s*IF\ CFLAG:TARGET:330\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2053',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2054',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2056',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2057',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2059-2062',
        any: [/^\s*CFLAG:TARGET:330\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2060',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2061-2062',
        any: [/^\s*CFLAG:TARGET:330\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2062',
        any: [/^\s*CFLAG:TARGET:330\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2062-2063',
        any: [/^\s*CFLAG:TARGET:330\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2065-2067',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2067',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2068',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2069',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2067-2070',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2071',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2072-2073',
        any: [/^\s*CFLAG:330\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2073',
        any: [/^\s*CFLAG:330\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2075',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:330\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2076',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2077',
        any: [/^\s*CFLAG:330\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2079',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2080',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2081',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2079-2082',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2083',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2084-2085',
        any: [/^\s*CFLAG:330\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2085',
        any: [/^\s*CFLAG:330\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2087',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:330\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2088',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2089',
        any: [/^\s*CFLAG:330\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2091',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2092',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2093',
        any: [/^\s*CFLAG:330\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2095',
        any: [/^\s*ELSEIF\ \ CFLAG:330\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2096',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2097',
        any: [/^\s*CFLAG:330\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2097-2098',
        any: [/^\s*CFLAG:330\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2097-2099',
        any: [/^\s*CFLAG:330\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2097-2100',
        any: [/^\s*CFLAG:330\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2101-2104',
        any: [/^\s*;手淫\ CFLAG:331\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2106',
        any: [/^\s*IF\ SELECTCOM\ ==\ 30\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2108',
        any: [/^\s*IF\ CFLAG:TARGET:331\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2110',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2111',
        any: [/^\s*PRINTFORMW\ 「对这样的服务不讨厌吧……？　呵呵」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2113',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2114',
        any: [
          /^\s*PRINTFORMW\ 「今后每天%SELF_CALL\(TARGET\)%都这样为您服务♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2116',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2117',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%知道了、请让%SELF_CALL\(TARGET\)%来为您服务吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2119-2120',
        any: [/^\s*PRINTFORMW\ 「竟然让%SELF_CALL\(TARGET\)%撸这个……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2120',
        any: [/^\s*PRINTFORMW\ 「竟然让%SELF_CALL\(TARGET\)%撸这个……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2120-2121',
        any: [/^\s*PRINTFORMW\ 「竟然让%SELF_CALL\(TARGET\)%撸这个……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2122',
        any: [/^\s*CFLAG:TARGET:331\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2120-2123',
        any: [/^\s*PRINTFORMW\ 「竟然让%SELF_CALL\(TARGET\)%撸这个……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2125-2127',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2127',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2128',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2129',
        any: [
          /^\s*PRINTFORMW\ 「来吧、随时可以射给%SELF_CALL\(TARGET\)%哦？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2129-2130',
        any: [
          /^\s*PRINTFORMW\ 「来吧、随时可以射给%SELF_CALL\(TARGET\)%哦？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2131',
        any: [/^\s*PRINTFORMW\ 「您看、上上下下……上上下下……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2131-2132',
        any: [/^\s*PRINTFORMW\ 「您看、上上下下……上上下下……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2133',
        any: [/^\s*CFLAG:331\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2135',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:331\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2136',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2137',
        any: [
          /^\s*PRINTFORMW\ 「好厉害、到现在……不用这样一直忍也可以哦？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2137-2138',
        any: [
          /^\s*PRINTFORMW\ 「好厉害、到现在……不用这样一直忍也可以哦？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2139',
        any: [/^\s*PRINTFORMW\ 「还在忍耐吗？好可爱～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2139-2140',
        any: [/^\s*PRINTFORMW\ 「还在忍耐吗？好可爱～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2141',
        any: [/^\s*CFLAG:331\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2143',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2144',
        any: [/^\s*PRINTFORMW\ 「变得咕噜咕噜的了。咕噜咕噜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2145',
        any: [/^\s*CFLAG:331\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2147',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2151',
        any: [/^\s*PRINTFORMW\ 「舒服吗？加油。……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2152',
        any: [/^\s*CFLAG:331\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2154',
        any: [/^\s*ELSEIF\ CFLAG:331\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2155',
        any: [/^\s*PRINTFORMW\ 「哎呀…被你吓到了呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2156',
        any: [/^\s*CFLAG:331\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2155-2157',
        any: [/^\s*PRINTFORMW\ 「哎呀…被你吓到了呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2155-2158',
        any: [/^\s*PRINTFORMW\ 「哎呀…被你吓到了呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2155-2159',
        any: [/^\s*PRINTFORMW\ 「哎呀…被你吓到了呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2160-2163',
        any: [/^\s*;フェラチオ\ CFLAG:332\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2165',
        any: [/^\s*IF\ SELECTCOM\ ==\ 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2167',
        any: [/^\s*IF\ CFLAG:TARGET:332\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2169',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2170',
        any: [/^\s*PRINTFORMW\ 「噗、一直想舔了……真爱欺负人♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2172',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2173',
        any: [
          /^\s*PRINTFORMW\ 「就算不这么拜托、%SELF_CALL\(TARGET\)%也不会咬的啦…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2175',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2176',
        any: [/^\s*PRINTFORMW\ 「请放心、不会咬的啦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2178-2179',
        any: [/^\s*PRINTFORMW\ （呜……臭……讨厌……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2179',
        any: [/^\s*PRINTFORMW\ （呜……臭……讨厌……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2179-2180',
        any: [/^\s*PRINTFORMW\ （呜……臭……讨厌……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2181',
        any: [/^\s*CFLAG:TARGET:332\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2179-2182',
        any: [/^\s*PRINTFORMW\ （呜……臭……讨厌……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2184-2186',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2186',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2187',
        any: [
          /^\s*PRINTFORMW\ （哈……多么美妙的气味……快满含在嘴里、想品尝…）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2188',
        any: [/^\s*CFLAG:332\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2190',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:332\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2191',
        any: [/^\s*PRINTFORMW\ （呵呵……很好吃的样子……我开动了……♪）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2192',
        any: [/^\s*CFLAG:332\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2194',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2195',
        any: [
          /^\s*PRINTFORMW\ 「呵呵……让%SELF_CALL\(TARGET\)%给您充分的服务♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2196',
        any: [/^\s*CFLAG:332\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2198',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:332\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2199',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%知道了、、、请让%SELF_CALL\(TARGET\)%来服务」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2200',
        any: [/^\s*CFLAG:332\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2202',
        any: [/^\s*ELSEIF\ CFLAG:332\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2203',
        any: [/^\s*PRINTFORMW\ （讨厌……臭……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2204',
        any: [/^\s*CFLAG:332\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2203-2205',
        any: [/^\s*PRINTFORMW\ （讨厌……臭……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2203-2206',
        any: [/^\s*PRINTFORMW\ （讨厌……臭……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2203-2207',
        any: [/^\s*PRINTFORMW\ （讨厌……臭……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2208-2211',
        any: [/^\s*;パイズリ\ CFLAG:333\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2213',
        any: [/^\s*IF\ SELECTCOM\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2215',
        any: [/^\s*IF\ CFLAG:TARGET:333\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2217',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2218',
        any: [/^\s*PRINTFORMW\ 「看哦、软软的胸部哦？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2220',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2221',
        any: [/^\s*PRINTFORMW\ 「呵呵、包住了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2223',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2224',
        any: [/^\s*PRINTFORMW\ 「怎么样…用胸部的话感觉舒服吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2226-2227',
        any: [/^\s*PRINTFORMW\ 「胸……你是认真的？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2227',
        any: [/^\s*PRINTFORMW\ 「胸……你是认真的？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2227-2228',
        any: [/^\s*PRINTFORMW\ 「胸……你是认真的？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2229',
        any: [/^\s*CFLAG:TARGET:333\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2229-2230',
        any: [/^\s*CFLAG:TARGET:333\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2232-2234',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2234',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2235',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2236',
        any: [/^\s*PRINTFORMW\ 「怎么样？舒服吗？软软的胸部呦。～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2236-2237',
        any: [/^\s*PRINTFORMW\ 「怎么样？舒服吗？软软的胸部呦。～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2238',
        any: [
          /^\s*PRINTFORMW\ 「那么、请全部射在%SELF_CALL\(TARGET\)%的胸部上面吧～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2238-2239',
        any: [
          /^\s*PRINTFORMW\ 「那么、请全部射在%SELF_CALL\(TARGET\)%的胸部上面吧～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2240',
        any: [/^\s*CFLAG:333\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2242',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:332\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2243',
        any: [/^\s*PRINTFORMW\ 「怎么样、柔软吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2244',
        any: [/^\s*CFLAG:333\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2246',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:333\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2247',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2248',
        any: [/^\s*PRINTFORMW\ 「怎么样……乳房里……舒服吗♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2248-2249',
        any: [/^\s*PRINTFORMW\ 「怎么样……乳房里……舒服吗♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2250',
        any: [/^\s*PRINTFORMW\ 「舒服吗？不用忍受可以射出来哦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2250-2251',
        any: [/^\s*PRINTFORMW\ 「舒服吗？不用忍受可以射出来哦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2252',
        any: [/^\s*CFLAG:333\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2254',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:333\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2257',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2258',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的胸……怎么样？？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2259',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2260',
        any: [/^\s*PRINTFORMW\ 「这样弄还行吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2260-2261',
        any: [/^\s*PRINTFORMW\ 「这样弄还行吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2262',
        any: [
          /^\s*PRINTFORMW\ 「请好好地舒服起来吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2262-2263',
        any: [
          /^\s*PRINTFORMW\ 「请好好地舒服起来吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2264',
        any: [/^\s*CFLAG:333\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2266',
        any: [/^\s*ELSEIF\ \ CFLAG:333\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2267',
        any: [/^\s*PRINTFORMW\ 「用胸部夹就可以了吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2268',
        any: [/^\s*CFLAG:333\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2268-2269',
        any: [/^\s*CFLAG:333\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2268-2270',
        any: [/^\s*CFLAG:333\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2268-2271',
        any: [/^\s*CFLAG:333\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2272-2275',
        any: [/^\s*;素股\ CFLAG:334\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2277',
        any: [/^\s*IF\ SELECTCOM\ ==\ 33\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2279',
        any: [/^\s*IF\ CFLAG:TARGET:334\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2281',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2282',
        any: [/^\s*PRINTFORMW\ 「阿拉、想进来想的不得了的肉棒呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2284',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2285',
        any: [/^\s*PRINTFORMW\ 「啾啾的在做呢？　再稍微努力一点吧♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2287-2288',
        any: [/^\s*PRINTFORMW\ 「在这里……摩擦就好了吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2288',
        any: [/^\s*PRINTFORMW\ 「在这里……摩擦就好了吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2288-2289',
        any: [/^\s*PRINTFORMW\ 「在这里……摩擦就好了吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2290',
        any: [/^\s*CFLAG:TARGET:334\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2290-2291',
        any: [/^\s*CFLAG:TARGET:334\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2293-2295',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2295',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2296',
        any: [
          /^\s*PRINTFORMW\ 「想进来想的不得了吗？　呵呵、%SELF_CALL\(TARGET\)%的里面也疼的不得了呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2297',
        any: [/^\s*CFLAG:334\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2299',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2300',
        any: [/^\s*PRINTFORMW\ 「期待小穴的肉棒颤抖着呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2301',
        any: [/^\s*CFLAG:334\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2303',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2304',
        any: [/^\s*PRINTFORMW\ 「用肉棒摩擦处女小穴就可以忍耐了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2305',
        any: [/^\s*CFLAG:334\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2307',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2308',
        any: [/^\s*PRINTFORMW\ 「为了让肉棒舒服起来、要忍耐啾啾的呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2309',
        any: [/^\s*CFLAG:334\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2311',
        any: [/^\s*ELSEIF\ CFLAG:334\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2312',
        any: [/^\s*PRINTFORMW\ 「在这里这么做……就可以了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2313',
        any: [/^\s*CFLAG:334\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2313-2314',
        any: [/^\s*CFLAG:334\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2313-2315',
        any: [/^\s*CFLAG:334\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2313-2316',
        any: [/^\s*CFLAG:334\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2313-2317',
        any: [/^\s*CFLAG:334\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2323',
        any: [/^\s*IF\ SELECTCOM\ ==\ 34\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2325',
        any: [/^\s*IF\ CFLAG:TARGET:335\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2327',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2329',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2330',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2332',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2333',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2321-2335',
        any: [/^\s*;騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2336',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2321-2337',
        any: [/^\s*;騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2339-2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2341',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2342',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2344',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2345',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2347-2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2348',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2349-2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2350-2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2351',
        any: [/^\s*CFLAG:TARGET:335\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2352-2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2354-2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2356',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2357',
        any: [/^\s*IF\ RAND:4\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2358',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2359',
        any: [/^\s*ELSEIF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2360',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2361',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2362',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2356-2363',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2364',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2356-2365',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2366',
        any: [/^\s*CFLAG:335\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2368',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2369',
        any: [/^\s*IF\ RAND:4\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2370',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2371',
        any: [/^\s*ELSEIF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2372',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2373',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2374',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2356-2375',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2376',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2356-2377',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2378',
        any: [/^\s*CFLAG:335\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2380',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:335\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2381',
        any: [/^\s*IF\ RAND:4\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2382',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2383',
        any: [/^\s*ELSEIF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2384',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2385',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2386',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2387-2406',
        any: [/^\s*;泡踊り\ CFLAG:336\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2388',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2389-2406',
        any: [/^\s*;泡踊り\ CFLAG:336\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2390',
        any: [/^\s*CFLAG:335\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2392',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:335\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2393',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2394',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2395',
        any: [/^\s*CFLAG:335\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2397',
        any: [/^\s*ELSEIF\ CFLAG:335\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2398',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2399',
        any: [/^\s*CFLAG:335\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2400-2406',
        any: [/^\s*;泡踊り\ CFLAG:336\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2401-2406',
        any: [/^\s*;泡踊り\ CFLAG:336\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2402-2406',
        any: [/^\s*;泡踊り\ CFLAG:336\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2403-2406',
        any: [/^\s*;泡踊り\ CFLAG:336\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2408',
        any: [/^\s*IF\ SELECTCOM\ ==\ 35\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2410',
        any: [/^\s*IF\ CFLAG:TARGET:336\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2412',
        any: [/^\s*IF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2413',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2415-2418',
        any: [/^\s*CFLAG:TARGET:336\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2416',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2417-2418',
        any: [/^\s*CFLAG:TARGET:336\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2418',
        any: [/^\s*CFLAG:TARGET:336\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2418-2419',
        any: [/^\s*CFLAG:TARGET:336\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2421-2423',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:336\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2423',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:336\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2424',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2425',
        any: [/^\s*CFLAG:336\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2427',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:336\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2428',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2429',
        any: [/^\s*CFLAG:336\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2431',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:336\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2432',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2433',
        any: [/^\s*CFLAG:336\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2435',
        any: [/^\s*ELSEIF\ \ CFLAG:336\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2436',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2437',
        any: [/^\s*CFLAG:336\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2437-2438',
        any: [/^\s*CFLAG:336\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2437-2439',
        any: [/^\s*CFLAG:336\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2437-2440',
        any: [/^\s*CFLAG:336\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2441-2444',
        any: [/^\s*;騎乗位アナル\ CFLAG:337\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2446',
        any: [/^\s*IF\ SELECTCOM\ ==\ 36\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2448',
        any: [/^\s*IF\ CFLAG:TARGET:337\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2450',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2451',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2453',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2454',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2456-2459',
        any: [/^\s*CFLAG:TARGET:337\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2457',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2458-2459',
        any: [/^\s*CFLAG:TARGET:337\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2459',
        any: [/^\s*CFLAG:TARGET:337\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2459-2460',
        any: [/^\s*CFLAG:TARGET:337\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2462-2464',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2464',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2465',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2466',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2464-2467',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2468',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2469-2470',
        any: [/^\s*CFLAG:337\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2470',
        any: [/^\s*CFLAG:337\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2472',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:337\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2473',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2474',
        any: [/^\s*CFLAG:337\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2476',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2477',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2478',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2476-2479',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2480',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2481-2482',
        any: [/^\s*CFLAG:337\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2482',
        any: [/^\s*CFLAG:337\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2484',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:337\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2485',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2486',
        any: [/^\s*CFLAG:337\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2488',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2489',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2490',
        any: [/^\s*CFLAG:337\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2492',
        any: [/^\s*ELSEIF\ \ CFLAG:337\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2493',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2494',
        any: [/^\s*CFLAG:337\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2494-2495',
        any: [/^\s*CFLAG:337\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2494-2496',
        any: [/^\s*CFLAG:337\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2494-2497',
        any: [/^\s*CFLAG:337\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2498-2501',
        any: [/^\s*;アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2503',
        any: [/^\s*IF\ SELECTCOM\ ==\ 37\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2505',
        any: [/^\s*IF\ CFLAG:TARGET:338\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2507',
        any: [/^\s*IF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2508',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2510-2518',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2511',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2512-2518',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2513',
        any: [/^\s*CFLAG:TARGET:338\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2514-2518',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2516-2518',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2518',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2519',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2520',
        any: [/^\s*CFLAG:338\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2522',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2523',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2524',
        any: [/^\s*CFLAG:338\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2526',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:338\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2527',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2528',
        any: [/^\s*CFLAG:338\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2530',
        any: [/^\s*ELSEIF\ CFLAG:338\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2531',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2532',
        any: [/^\s*CFLAG:338\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2533-2539',
        any: [/^\s*;スパンキング\ CFLAG:341\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2534-2539',
        any: [/^\s*;スパンキング\ CFLAG:341\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2535-2539',
        any: [/^\s*;スパンキング\ CFLAG:341\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2536-2539',
        any: [/^\s*;スパンキング\ CFLAG:341\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2541',
        any: [/^\s*IF\ SELECTCOM\ ==\ 40\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2543',
        any: [/^\s*IF\ CFLAG:TARGET:341\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2544',
        any: [/^\s*PRINTFORMW\ 「不要、停下来吧……请停下来吧…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2545',
        any: [/^\s*CFLAG:TARGET:341\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2545-2546',
        any: [/^\s*CFLAG:TARGET:341\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2548-2549',
        any: [/^\s*;淫乱＋マゾっ気Lv3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2550',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:341\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2551',
        any: [/^\s*PRINTFORMW\ 「哎呀、屁股被拍的、啪啪响呢……去了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2552',
        any: [/^\s*CFLAG:TARGET:341\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2554',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:341\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2555',
        any: [/^\s*PRINTFORMW\ 「惩罚…请更用力点……啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2556',
        any: [/^\s*CFLAG:TARGET:341\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2556-2557',
        any: [/^\s*CFLAG:TARGET:341\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2559',
        any: [
          /^\s*ELSEIF\ MARK:0\ ==\ 3\ \&\&\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:341\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2560',
        any: [/^\s*PRINTFORMW\ 「噫哈、噫、呜咕……明明好疼可是……哈啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2561',
        any: [/^\s*CFLAG:TARGET:341\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2561-2562',
        any: [/^\s*CFLAG:TARGET:341\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2564',
        any: [/^\s*ELSEIF\ CFLAG:341\ <=\ 1\ \&\&\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2565',
        any: [/^\s*PRINTFORMW\ 「讨厌…停……噫」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2566',
        any: [/^\s*CFLAG:TARGET:341\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2566-2567',
        any: [/^\s*CFLAG:TARGET:341\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2566-2568',
        any: [/^\s*CFLAG:TARGET:341\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2566-2569',
        any: [/^\s*CFLAG:TARGET:341\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2570-2573',
        any: [/^\s*;鞭\ CFLAG:342\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2575',
        any: [/^\s*IF\ SELECTCOM\ ==\ 41\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2577',
        any: [/^\s*IF\ CFLAG:TARGET:342\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2579',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2580',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2582',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2583',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2585-2588',
        any: [/^\s*CFLAG:TARGET:342\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2586',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2587-2588',
        any: [/^\s*CFLAG:TARGET:342\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2588',
        any: [/^\s*CFLAG:TARGET:342\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2588-2589',
        any: [/^\s*CFLAG:TARGET:342\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2591-2593',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:342\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2593',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:342\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2594',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2595',
        any: [/^\s*CFLAG:TARGET:342\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2597',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:342\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2598',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2599',
        any: [/^\s*CFLAG:TARGET:342\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2601',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:342\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2602',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2603',
        any: [/^\s*CFLAG:TARGET:342\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2605',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:342\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2606',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2607',
        any: [/^\s*CFLAG:TARGET:342\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2609',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:342\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2610',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2611',
        any: [/^\s*CFLAG:TARGET:342\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2613',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:342\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2614',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2615',
        any: [/^\s*CFLAG:TARGET:342\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2617',
        any: [
          /^\s*ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:342\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2618',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2619',
        any: [/^\s*CFLAG:TARGET:342\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2621',
        any: [/^\s*ELSEIF\ CFLAG:335\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2622',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2623',
        any: [/^\s*CFLAG:TARGET:342\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2623-2624',
        any: [/^\s*CFLAG:TARGET:342\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2623-2625',
        any: [/^\s*CFLAG:TARGET:342\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2623-2626',
        any: [/^\s*CFLAG:TARGET:342\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2627-2630',
        any: [/^\s*;針\ CFLAG:343\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2632',
        any: [/^\s*IF\ SELECTCOM\ ==\ 42\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2634',
        any: [/^\s*IF\ CFLAG:TARGET:343\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2636',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2637',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2639',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2640',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2642-2645',
        any: [/^\s*CFLAG:TARGET:343\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2643',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2644-2645',
        any: [/^\s*CFLAG:TARGET:343\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2645',
        any: [/^\s*CFLAG:TARGET:343\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2645-2646',
        any: [/^\s*CFLAG:TARGET:343\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2648-2650',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:343\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2650',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:343\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2651',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2652',
        any: [/^\s*CFLAG:TARGET:343\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2654',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:343\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2655',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2656',
        any: [/^\s*CFLAG:TARGET:343\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2658',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:343\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2659',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2660',
        any: [/^\s*CFLAG:TARGET:343\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2662',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:343\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2663',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2664',
        any: [/^\s*CFLAG:TARGET:343\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2666',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:343\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2667',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2668',
        any: [/^\s*CFLAG:TARGET:343\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2670',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:343\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2671',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2672',
        any: [/^\s*CFLAG:TARGET:343\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2674',
        any: [
          /^\s*ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:343\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2675',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2676',
        any: [/^\s*CFLAG:TARGET:343\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2678',
        any: [/^\s*ELSEIF\ CFLAG:343\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2679',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2680',
        any: [/^\s*CFLAG:TARGET:343\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2680-2681',
        any: [/^\s*CFLAG:TARGET:343\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2680-2682',
        any: [/^\s*CFLAG:TARGET:343\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2680-2683',
        any: [/^\s*CFLAG:TARGET:343\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2680-2684',
        any: [/^\s*CFLAG:TARGET:343\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2690',
        any: [/^\s*IF\ SELECTCOM\ ==\ 43\ \&\&\ TEQUIP:43\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2692',
        any: [/^\s*IF\ CFLAG:TARGET:344\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2694',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2695',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2697',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2698',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2700-2708',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2701',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2702-2708',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2703',
        any: [/^\s*CFLAG:TARGET:344\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2704-2708',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2706-2708',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2708',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2709',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2710',
        any: [/^\s*CFLAG:TARGET:344\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2712',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2713',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2714',
        any: [/^\s*CFLAG:TARGET:344\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2716',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2717',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2718',
        any: [/^\s*CFLAG:TARGET:344\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2720',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2721',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2722',
        any: [/^\s*CFLAG:TARGET:344\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2724',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2725',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2726',
        any: [/^\s*CFLAG:TARGET:344\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2728',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2729',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2730',
        any: [/^\s*CFLAG:TARGET:344\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2732',
        any: [
          /^\s*ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2733',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2734',
        any: [/^\s*CFLAG:TARGET:344\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2736',
        any: [/^\s*ELSEIF\ CFLAG:344\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2737',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2738',
        any: [/^\s*CFLAG:TARGET:344\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2739-2745',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2740-2745',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2741-2745',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2743',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 43\ \&\&\ TEQUIP:43\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2745',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2746',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2747',
        any: [/^\s*CFLAG:380\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2749',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2750',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2751',
        any: [/^\s*CFLAG:380\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2753',
        any: [/^\s*ELSEIF\ CFLAG:380\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2754',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2755',
        any: [/^\s*CFLAG:380\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2755-2756',
        any: [/^\s*CFLAG:380\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2755-2757',
        any: [/^\s*CFLAG:380\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2755-2758',
        any: [/^\s*CFLAG:380\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2764',
        any: [/^\s*IF\ SELECTCOM\ ==\ 44\ \&\&\ TEQUIP:44\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2766',
        any: [/^\s*IF\ CFLAG:TARGET:345\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2768',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2769',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2771',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2772',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2774-2777',
        any: [/^\s*CFLAG:TARGET:345\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2775',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2776-2777',
        any: [/^\s*CFLAG:TARGET:345\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2777',
        any: [/^\s*CFLAG:TARGET:345\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2777-2778',
        any: [/^\s*CFLAG:TARGET:345\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2780-2782',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:345\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2782',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:345\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2783',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2784',
        any: [/^\s*CFLAG:TARGET:345\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2786',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:345\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2787',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2788',
        any: [/^\s*CFLAG:TARGET:345\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2790',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:345\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2791',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2792',
        any: [/^\s*CFLAG:TARGET:345\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2794',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:345\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2795',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2796',
        any: [/^\s*CFLAG:TARGET:345\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2798',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:345\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2799',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2800',
        any: [/^\s*CFLAG:TARGET:345\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2802',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:345\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2803',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2804',
        any: [/^\s*CFLAG:TARGET:345\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2806',
        any: [
          /^\s*ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:345\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2807',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2808',
        any: [/^\s*CFLAG:TARGET:345\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2810',
        any: [/^\s*ELSEIF\ CFLAG:345\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2811',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2812',
        any: [/^\s*CFLAG:TARGET:345\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2812-2813',
        any: [/^\s*CFLAG:TARGET:345\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2812-2814',
        any: [/^\s*CFLAG:TARGET:345\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2815-2817',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 44\ \&\&\ TEQUIP:44\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2817',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 44\ \&\&\ TEQUIP:44\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2819',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:385\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2820',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2821',
        any: [/^\s*CFLAG:385\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2823',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:385\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2824',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2825',
        any: [/^\s*CFLAG:385\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2827',
        any: [/^\s*ELSEIF\ CFLAG:385\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2828',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2829',
        any: [/^\s*CFLAG:385\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2829-2830',
        any: [/^\s*CFLAG:385\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2829-2831',
        any: [/^\s*CFLAG:385\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2829-2832',
        any: [/^\s*CFLAG:385\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2838',
        any: [/^\s*IF\ SELECTCOM\ ==\ 45\ \&\&\ TEQUIP:45\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2840',
        any: [/^\s*IF\ CFLAG:TARGET:346\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2842',
        any: [/^\s*IF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2843',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2845',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2846',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2848-2851',
        any: [/^\s*CFLAG:TARGET:346\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2849',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2850-2851',
        any: [/^\s*CFLAG:TARGET:346\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2851',
        any: [/^\s*CFLAG:TARGET:346\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2851-2852',
        any: [/^\s*CFLAG:TARGET:346\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2854-2856',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:346\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2856',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:346\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2857',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2858',
        any: [/^\s*CFLAG:TARGET:346\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2860',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:346\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2861',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2862',
        any: [/^\s*CFLAG:TARGET:346\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2864',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:346\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2865',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2866',
        any: [/^\s*CFLAG:TARGET:346\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2868',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:346\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2869',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2870',
        any: [/^\s*CFLAG:TARGET:346\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2872',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:346\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2873',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2874',
        any: [/^\s*CFLAG:TARGET:346\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2876',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:346\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2877',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2878',
        any: [/^\s*CFLAG:TARGET:346\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2880',
        any: [
          /^\s*ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:346\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2881',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2882',
        any: [/^\s*CFLAG:TARGET:346\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2884',
        any: [/^\s*ELSEIF\ CFLAG:346\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2885',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2886',
        any: [/^\s*CFLAG:TARGET:346\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2886-2887',
        any: [/^\s*CFLAG:TARGET:346\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2886-2888',
        any: [/^\s*CFLAG:TARGET:346\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2889-2891',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 45\ \&\&\ TEQUIP:45\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2891',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 45\ \&\&\ TEQUIP:45\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2893',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:386\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2894',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2895',
        any: [/^\s*CFLAG:386\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2897',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:386\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2898',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2899',
        any: [/^\s*CFLAG:386\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2901',
        any: [/^\s*ELSEIF\ CFLAG:386\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2902',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2903',
        any: [/^\s*CFLAG:386\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2903-2904',
        any: [/^\s*CFLAG:386\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2903-2905',
        any: [/^\s*CFLAG:386\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2903-2906',
        any: [/^\s*CFLAG:386\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2912',
        any: [/^\s*IF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2914',
        any: [/^\s*IF\ CFLAG:TARGET:347\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2916',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2917',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2919',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2920',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2922-2925',
        any: [/^\s*CFLAG:TARGET:347\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2923',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2924-2925',
        any: [/^\s*CFLAG:TARGET:347\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2925',
        any: [/^\s*CFLAG:TARGET:347\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2925-2926',
        any: [/^\s*CFLAG:TARGET:347\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2928-2929',
        any: [/^\s*;淫乱＋A感覚Lv3以上＋マゾっ気Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2930',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:347\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2931',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2932',
        any: [/^\s*CFLAG:347\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2934',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:347\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2935',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2936',
        any: [/^\s*CFLAG:347\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2938',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:347\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2939',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2940',
        any: [/^\s*CFLAG:347\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2942',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:347\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2943',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2944',
        any: [/^\s*CFLAG:347\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2946',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:347\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2947',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2948',
        any: [/^\s*CFLAG:347\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2950',
        any: [/^\s*ELSEIF\ \ CFLAG:347\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2951',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2952',
        any: [/^\s*CFLAG:347\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2952-2953',
        any: [/^\s*CFLAG:347\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2952-2954',
        any: [/^\s*CFLAG:347\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2952-2955',
        any: [/^\s*CFLAG:347\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2956-2959',
        any: [/^\s*;何もしない\ CFLAG:356\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2961',
        any: [/^\s*IF\ SELECTCOM\ ==\ 55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2963',
        any: [/^\s*IF\ CFLAG:356\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2965',
        any: [/^\s*IF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2966',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2968-2971',
        any: [/^\s*CFLAG:356\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2969',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2970-2971',
        any: [/^\s*CFLAG:356\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2971',
        any: [/^\s*CFLAG:356\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2971-2972',
        any: [/^\s*CFLAG:356\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2974-2975',
        any: [/^\s*;愛＋欲情Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2976',
        any: [
          /^\s*IF\ TALENT:85\ ==\ 1\ \&\&\ PALAM:5\ >=\ PALAMLV:3\ \&\&\ \(CFLAG:356\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2977',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2978',
        any: [/^\s*CFLAG:356\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2980',
        any: [
          /^\s*ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:356\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2981',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2982',
        any: [/^\s*CFLAG:356\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2984',
        any: [/^\s*ELSEIF\ CFLAG:356\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2985',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2986',
        any: [/^\s*CFLAG:356\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2986-2987',
        any: [/^\s*CFLAG:356\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2986-2988',
        any: [/^\s*CFLAG:356\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2986-2989',
        any: [/^\s*CFLAG:356\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2990-2993',
        any: [/^\s*;会話する\ CFLAG:357\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2996',
        any: [/^\s*IF\ SELECTCOM\ ==\ 56\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2998',
        any: [/^\s*IF\ CFLAG:357\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '2999',
        any: [/^\s*IF\ TEQUIP:53\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3002',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3003',
        any: [
          /^\s*PRINTFORMW\ 「初次见面。这里是原%GET_LOOK_INFO\(TARGET,\ "成为勇者前的生活"\)%的%SAVESTR:TARGET%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3004',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%身体和心都沦陷了、成为了魔王大人的性奴隶了♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3005',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3006',
        any: [
          /^\s*PRINTFORMW\ 「故乡的老公、对不起。现在你的差劲肉棒已经满足不了%SELF_CALL\(TARGET\)%了、」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3007',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%已经成了的脑海里只有魔王大人的肉棒的浪货了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3007-3008',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%已经成了的脑海里只有魔王大人的肉棒的浪货了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3009',
        any: [
          /^\s*PRINTFORMW\ 「故乡的大家、对不起。%SELF_CALL\(TARGET\)%的人生就此结束了。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3010',
        any: [
          /^\s*PRINTFORMW\ 「从现在开始%SELF_CALL\(TARGET\)%就是魔王军的专属的性奴隶、正走向新的人生。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3010-3011',
        any: [
          /^\s*PRINTFORMW\ 「从现在开始%SELF_CALL\(TARGET\)%就是魔王军的专属的性奴隶、正走向新的人生。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3012',
        any: [
          /^\s*PRINTFORMW\ 「听说这个录像要分发给邻近的村落看、心里碰碰直跳的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3013',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3014',
        any: [
          /^\s*PRINTFORMW\ 「亲爱的、好好看着%SELF_CALL\(TARGET\)%这副淫荡的模样、撸起你的差劲肉棒吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3014-3015',
        any: [
          /^\s*PRINTFORMW\ 「亲爱的、好好看着%SELF_CALL\(TARGET\)%这副淫荡的模样、撸起你的差劲肉棒吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3016',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这淫荡的样子、把鸡巴撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3016-3017',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这淫荡的样子、把鸡巴撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3019',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3020',
        any: [
          /^\s*PRINTFORMW\ 「初次见面。原%GET_LOOK_INFO\(TARGET,\ "成为勇者前的生活"\)%的%SAVESTR:TARGET%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3021',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%身体和心都沦陷了、成为魔王大人爱的奴隶。♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3022',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3023',
        any: [
          /^\s*PRINTFORMW\ 「故乡的老公、对不起。但、%SELF_CALL\(TARGET\)%现在还是爱你的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3023-3024',
        any: [
          /^\s*PRINTFORMW\ 「故乡的老公、对不起。但、%SELF_CALL\(TARGET\)%现在还是爱你的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3025',
        any: [
          /^\s*PRINTFORMW\ 「故乡的大家、对不起。%SELF_CALL\(TARGET\)%找到了真正的港湾」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3026',
        any: [
          /^\s*PRINTFORMW\ 「从现在开始、%SELF_CALL\(TARGET\)%成为魔王军的一员从而走上新的人生。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3026-3027',
        any: [
          /^\s*PRINTFORMW\ 「从现在开始、%SELF_CALL\(TARGET\)%成为魔王军的一员从而走上新的人生。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3028',
        any: [
          /^\s*PRINTFORMW\ 「听说这个录像要分发给邻近的村落看、心里七上八下的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3029',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3030',
        any: [
          /^\s*PRINTFORMW\ 「亲爱的、%SELF_CALL\(TARGET\)%永远爱着你……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3031',
        any: [
          /^\s*PRINTFORMW\ 「不过%SELF_CALL\(TARGET\)%希望故乡的你你找到新的幸福、忘记%SELF_CALL\(TARGET\)%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3031-3032',
        any: [
          /^\s*PRINTFORMW\ 「不过%SELF_CALL\(TARGET\)%希望故乡的你你找到新的幸福、忘记%SELF_CALL\(TARGET\)%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3033',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这受尽疼爱的样子、撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3033-3034',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这受尽疼爱的样子、撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3033-3036',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这受尽疼爱的样子、撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3037',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3033-3038',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这受尽疼爱的样子、撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3033-3039',
        any: [
          /^\s*PRINTFORMW\ 「请各位、看着%SELF_CALL\(TARGET\)%这受尽疼爱的样子、撸起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3041',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3042',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3044',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3045',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3047-3058',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3048',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3049-3058',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3050-3058',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3051',
        any: [/^\s*CFLAG:357\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3052-3058',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3054-3058',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3055',
        any: [/^\s*IF\ TEQUIP:53\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3058',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3059',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3060',
        any: [/^\s*CFLAG:357\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3062',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3063',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3064',
        any: [/^\s*CFLAG:357\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3066',
        any: [/^\s*ELSEIF\ CFLAG:357\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3067',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3068',
        any: [/^\s*CFLAG:357\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3069-3072',
        any: [
          /^\s*IF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3070-3072',
        any: [
          /^\s*IF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3072',
        any: [
          /^\s*IF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3073',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3074',
        any: [/^\s*CFLAG:357\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3076',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3077',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3078',
        any: [/^\s*CFLAG:357\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3080',
        any: [/^\s*ELSEIF\ CFLAG:357\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3081',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3082',
        any: [/^\s*CFLAG:357\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3083-3089',
        any: [/^\s*;パイズリフェラ\ CFLAG:360\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3084-3089',
        any: [/^\s*;パイズリフェラ\ CFLAG:360\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3085-3089',
        any: [/^\s*;パイズリフェラ\ CFLAG:360\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3086-3089',
        any: [/^\s*;パイズリフェラ\ CFLAG:360\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3087-3089',
        any: [/^\s*;パイズリフェラ\ CFLAG:360\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3091',
        any: [/^\s*IF\ SELECTCOM\ ==\ 123\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3093',
        any: [/^\s*IF\ CFLAG:TARGET:360\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3095',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3096',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3098',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3099',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3101',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3102',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3104-3107',
        any: [/^\s*CFLAG:TARGET:360\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3105',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3106-3107',
        any: [/^\s*CFLAG:TARGET:360\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3107',
        any: [/^\s*CFLAG:TARGET:360\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3107-3108',
        any: [/^\s*CFLAG:TARGET:360\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3110-3112',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:360\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3112',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:360\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3113',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3114',
        any: [/^\s*CFLAG:360\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3116',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:360\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3117',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3118',
        any: [/^\s*CFLAG:360\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3120',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:360\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3121',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3122',
        any: [/^\s*CFLAG:360\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3124',
        any: [/^\s*ELSEIF\ CFLAG:360\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3125',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3126',
        any: [/^\s*CFLAG:360\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3126-3127',
        any: [/^\s*CFLAG:360\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3126-3128',
        any: [/^\s*CFLAG:360\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3126-3129',
        any: [/^\s*CFLAG:360\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3130-3132',
        any: [/^\s*;フェラ自慰\ CFLAG:361\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3134',
        any: [/^\s*IF\ SELECTCOM\ ==\ 125\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3136',
        any: [/^\s*IF\ CFLAG:TARGET:361\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3138',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3139',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3141',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3142',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3144',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3145',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3147-3150',
        any: [/^\s*CFLAG:TARGET:361\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3148',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3149-3150',
        any: [/^\s*CFLAG:TARGET:361\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3150',
        any: [/^\s*CFLAG:TARGET:361\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3150-3151',
        any: [/^\s*CFLAG:TARGET:361\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3153-3155',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:361\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3155',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:361\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3156',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3157',
        any: [/^\s*CFLAG:361\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3159',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:361\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3160',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3161',
        any: [/^\s*CFLAG:361\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3163',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:361\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3164',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3165',
        any: [/^\s*CFLAG:361\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3167',
        any: [/^\s*ELSEIF\ CFLAG:361\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3168',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3169',
        any: [/^\s*CFLAG:361\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3169-3170',
        any: [/^\s*CFLAG:361\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3169-3171',
        any: [/^\s*CFLAG:361\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3169-3172',
        any: [/^\s*CFLAG:361\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3173-3176',
        any: [/^\s*;手コキフェラ\ CFLAG:362\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3178',
        any: [/^\s*IF\ SELECTCOM\ ==\ 126\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3180',
        any: [/^\s*IF\ CFLAG:TARGET:362\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3182',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3183',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3185',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3186',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3188',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3189',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3191-3194',
        any: [/^\s*CFLAG:TARGET:362\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3192',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3193-3194',
        any: [/^\s*CFLAG:TARGET:362\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3194',
        any: [/^\s*CFLAG:TARGET:362\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3194-3195',
        any: [/^\s*CFLAG:TARGET:362\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3197-3199',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:362\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3199',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:362\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3200',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3201',
        any: [/^\s*CFLAG:362\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3203',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:362\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3204',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3205',
        any: [/^\s*CFLAG:362\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3207',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:362\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3208',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3209',
        any: [/^\s*CFLAG:362\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3211',
        any: [/^\s*ELSEIF\ CFLAG:362\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3212',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3213',
        any: [/^\s*CFLAG:362\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3213-3214',
        any: [/^\s*CFLAG:362\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3213-3215',
        any: [/^\s*CFLAG:362\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3213-3216',
        any: [/^\s*CFLAG:362\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3217-3220',
        any: [/^\s*;バキュームフェラ\ CFLAG:363\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3222',
        any: [/^\s*IF\ SELECTCOM\ ==\ 127\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3224',
        any: [/^\s*IF\ CFLAG:TARGET:363\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3226',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3227',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3229',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3230',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3232',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3233',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3235-3238',
        any: [/^\s*CFLAG:TARGET:363\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3236',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3237-3238',
        any: [/^\s*CFLAG:TARGET:363\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3238',
        any: [/^\s*CFLAG:TARGET:363\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3238-3239',
        any: [/^\s*CFLAG:TARGET:363\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3238-3241',
        any: [/^\s*CFLAG:TARGET:363\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3243',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3244',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3245',
        any: [/^\s*CFLAG:363\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3247',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3248',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3249',
        any: [/^\s*CFLAG:363\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3251',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:363\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3252',
        any: [/^\s*CFLAG:363\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3254',
        any: [/^\s*ELSEIF\ CFLAG:363\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3255',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3256',
        any: [/^\s*CFLAG:363\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3256-3257',
        any: [/^\s*CFLAG:363\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3256-3258',
        any: [/^\s*CFLAG:363\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3256-3259',
        any: [/^\s*CFLAG:363\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3260-3263',
        any: [/^\s*;シックスナイン\ CFLAG:364\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3265',
        any: [/^\s*IF\ SELECTCOM\ ==\ 69\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3267',
        any: [/^\s*IF\ CFLAG:TARGET:364\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3269',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3270',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3272',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3273',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3275',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3276',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3278-3281',
        any: [/^\s*CFLAG:TARGET:364\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3279',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3280-3281',
        any: [/^\s*CFLAG:TARGET:364\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3281',
        any: [/^\s*CFLAG:TARGET:364\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3281-3282',
        any: [/^\s*CFLAG:TARGET:364\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3284-3286',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:364\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3286',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:364\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3287',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3288',
        any: [/^\s*CFLAG:364\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3290',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:364\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3291',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3292',
        any: [/^\s*CFLAG:364\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3294',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:364\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3295',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3296',
        any: [/^\s*CFLAG:364\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3298',
        any: [/^\s*ELSEIF\ CFLAG:364\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3299',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3300',
        any: [/^\s*CFLAG:364\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3300-3301',
        any: [/^\s*CFLAG:364\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3300-3302',
        any: [/^\s*CFLAG:364\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3300-3303',
        any: [/^\s*CFLAG:364\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3304-3307',
        any: [/^\s*;ディープスロート\ CFLAG:365\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3309',
        any: [/^\s*IF\ SELECTCOM\ ==\ 124\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3311',
        any: [/^\s*IF\ CFLAG:TARGET:365\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3313',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3314',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3316',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3317',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3319',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3320',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3322-3325',
        any: [/^\s*CFLAG:TARGET:365\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3323',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3324-3325',
        any: [/^\s*CFLAG:TARGET:365\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3325',
        any: [/^\s*CFLAG:TARGET:365\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3325-3326',
        any: [/^\s*CFLAG:TARGET:365\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3325-3328',
        any: [/^\s*CFLAG:TARGET:365\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3330',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3331',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3332',
        any: [/^\s*CFLAG:365\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3334',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3335',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3336',
        any: [/^\s*CFLAG:365\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3338',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:363\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3339',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3340',
        any: [/^\s*CFLAG:365\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3342',
        any: [/^\s*ELSEIF\ CFLAG:363\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3343',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3344',
        any: [/^\s*CFLAG:365\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3344-3345',
        any: [/^\s*CFLAG:365\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3344-3346',
        any: [/^\s*CFLAG:365\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3344-3347',
        any: [/^\s*CFLAG:365\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3348-3351',
        any: [/^\s*;イラマチオ\ CFLAG:381\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3353',
        any: [/^\s*IF\ SELECTCOM\ ==\ 80\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3355',
        any: [/^\s*IF\ CFLAG:TARGET:381\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3357',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3358',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3360',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3361',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3363-3366',
        any: [/^\s*CFLAG:TARGET:381\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3364',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3365-3366',
        any: [/^\s*CFLAG:TARGET:381\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3366',
        any: [/^\s*CFLAG:TARGET:381\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3366-3367',
        any: [/^\s*CFLAG:TARGET:381\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3369-3371',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:381\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3371',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:381\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3372',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3373',
        any: [/^\s*CFLAG:381\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3375',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:381\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3376',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3377',
        any: [/^\s*CFLAG:381\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3379',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:381\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3380',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3381',
        any: [/^\s*CFLAG:381\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3383',
        any: [/^\s*ELSEIF\ CFLAG:381\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3384',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3385',
        any: [/^\s*CFLAG:381\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3385-3386',
        any: [/^\s*CFLAG:381\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3385-3387',
        any: [/^\s*CFLAG:381\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3385-3388',
        any: [/^\s*CFLAG:381\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3385-3389',
        any: [/^\s*CFLAG:381\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3396',
        any: [/^\s*IF\ SELECTCOM\ ==\ 87\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3399',
        any: [/^\s*IF\ CFLAG:TARGET:348\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3401',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3402',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3404',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3406',
        any: [/^\s*IF\ CFLAG:7\ \&\ P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3407',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3409',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3410',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3412',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3413',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3415',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3416',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3418',
        any: [/^\s*ELSEIF\ P\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3420',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3421',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3399-3422',
        any: [/^\s*IF\ CFLAG:TARGET:348\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3423',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3399-3424',
        any: [/^\s*IF\ CFLAG:TARGET:348\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3426',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3427',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3429',
        any: [/^\s*ELSEIF\ P\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3430',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3432',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3433',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3399-3434',
        any: [/^\s*IF\ CFLAG:TARGET:348\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3399-3436',
        any: [/^\s*IF\ CFLAG:TARGET:348\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3437',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3399-3438',
        any: [/^\s*IF\ CFLAG:TARGET:348\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3440',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3442',
        any: [/^\s*IF\ CFLAG:7\ \&\ P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3443',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3445',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3446',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3448',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3449',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3451',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3452',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3454',
        any: [/^\s*ELSEIF\ P\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3456',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3457',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3456-3458',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3459',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3460-3462',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3462',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3463',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3465',
        any: [/^\s*ELSEIF\ P\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3466',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3468',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3469',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3468-3470',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3472-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3473',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3474-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3476-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3478',
        any: [/^\s*IF\ CFLAG:7\ \&\ P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3479',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3481',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3482',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3484',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3485',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3487',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3488',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3490',
        any: [/^\s*ELSEIF\ P\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3492',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3493',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3494-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3495',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3496-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3498',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3499',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3501',
        any: [/^\s*ELSEIF\ P\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3502',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3504',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3505',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3506-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3508-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3509',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3510-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3511-3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3512',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3512-3513',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3512-3515',
        any: [/^\s*CFLAG:TARGET:348\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3517',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3518',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3520',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:348\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3522',
        any: [/^\s*IF\ CFLAG:7\ \&\ P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3524',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3525',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3527',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3528',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3530',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3531',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3533',
        any: [/^\s*ELSEIF\ P\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3535',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3536',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3520-3537',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:348\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3538',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3539-3554',
        any: [/^\s*CFLAG:348\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3541',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3542',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3544',
        any: [/^\s*ELSEIF\ P\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3545',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3547',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3548',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3549-3554',
        any: [/^\s*CFLAG:348\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3551-3554',
        any: [/^\s*CFLAG:348\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3552',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3553-3554',
        any: [/^\s*CFLAG:348\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3554',
        any: [/^\s*CFLAG:348\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3556',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:348\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3558',
        any: [/^\s*IF\ CFLAG:7\ \&\ P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3560',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3561',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3563',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3564',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3566',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3567',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3569',
        any: [/^\s*ELSEIF\ P\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3570',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3571',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3556-3572',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:348\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3573',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3574-3589',
        any: [/^\s*CFLAG:348\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3576',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3577',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3579',
        any: [/^\s*ELSEIF\ P\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3580',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3582',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3583',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3584-3589',
        any: [/^\s*CFLAG:348\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3586-3589',
        any: [/^\s*CFLAG:348\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3587',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3588-3589',
        any: [/^\s*CFLAG:348\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3589',
        any: [/^\s*CFLAG:348\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3591',
        any: [/^\s*ELSEIF\ CFLAG:348\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3593',
        any: [/^\s*IF\ CFLAG:7\ \&\ P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3595',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3596',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3598',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3599',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3601',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3602',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3604',
        any: [/^\s*ELSEIF\ P\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3606',
        any: [/^\s*IF\ TALENT:121\ \|\|\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3607',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3591-3608',
        any: [/^\s*ELSEIF\ CFLAG:348\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3609',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3610-3625',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3612',
        any: [/^\s*ELSEIF\ P\ ==\ 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3613',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3615',
        any: [/^\s*ELSEIF\ P\ ==\ 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3616',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3618',
        any: [/^\s*ELSEIF\ P\ ==\ 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3619',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3620-3625',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3622-3625',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3623',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3624-3625',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3625',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3625-3626',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3625-3627',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3625-3628',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3625-3629',
        any: [/^\s*CFLAG:348\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3637',
        any: [/^\s*@DOG_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3642',
        any: [/^\s*IF\ SELECTCOM\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3644',
        any: [/^\s*IF\ CFLAG:301\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3646',
        any: [/^\s*IF\ MARK:2\ >=\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3647',
        any: [/^\s*PRINTFORMW\ 「明白了啦……和狗、呜呜……和…狗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3649-3650',
        any: [/^\s*PRINTFORMW\ 「噫、干什么……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3650',
        any: [/^\s*PRINTFORMW\ 「噫、干什么……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3650-3651',
        any: [/^\s*PRINTFORMW\ 「噫、干什么……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3652',
        any: [/^\s*CFLAG:301\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3650-3653',
        any: [/^\s*PRINTFORMW\ 「噫、干什么……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3655-3657',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3657',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3658',
        any: [
          /^\s*PRINTFORMW\ 「啊、再多舔一舔啊……%SELF_CALL\(TARGET\)%、最喜欢狗狗了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3659',
        any: [/^\s*CFLAG:301\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3661',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3662',
        any: [/^\s*PRINTFORMW\ 「好奇妙的感觉……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3663',
        any: [/^\s*CFLAG:301\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3665',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3666',
        any: [/^\s*PRINTFORMW\ 「好奇妙的感觉……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3667',
        any: [/^\s*CFLAG:301\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3669',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:301\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3670',
        any: [/^\s*PRINTFORMW\ 「呜……不会再反抗了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3671',
        any: [/^\s*CFLAG:301\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3673',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 2\ \&\&\ \(CFLAG:301\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3674',
        any: [/^\s*PRINTFORMW\ 「嘤……不要动得、太过头啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3675',
        any: [/^\s*CFLAG:301\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3677',
        any: [
          /^\s*ELSEIF\ MARK:2\ <=\ 1\ \&\&\ \(CFLAG:301\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3678',
        any: [/^\s*PRINTFORMW\ 「呜……咕……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3679',
        any: [/^\s*CFLAG:301\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3678-3680',
        any: [/^\s*PRINTFORMW\ 「呜……咕……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3678-3681',
        any: [/^\s*PRINTFORMW\ 「呜……咕……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3678-3682',
        any: [/^\s*PRINTFORMW\ 「呜……咕……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3683-3686',
        any: [/^\s*;兽奸クンニ\ CFLAG:302\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3688',
        any: [/^\s*IF\ SELECTCOM\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3690',
        any: [/^\s*IF\ CFLAG:302\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3692',
        any: [/^\s*IF\ TALENT:TARGET:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3693',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3695-3703',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3696',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3697-3703',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3698',
        any: [/^\s*CFLAG:302\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3699-3703',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3701-3703',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3703',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3704',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3705',
        any: [/^\s*CFLAG:302\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3707',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3708',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3709',
        any: [/^\s*CFLAG:302\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3711',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3712',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3713',
        any: [/^\s*CFLAG:302\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3715',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:302\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3716',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3717',
        any: [/^\s*CFLAG:302\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3719',
        any: [/^\s*ELSEIF\ CFLAG:302\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3720',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3721',
        any: [/^\s*CFLAG:302\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3722-3729',
        any: [/^\s*;兽奸胸愛撫\ CFLAG:306\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3723-3729',
        any: [/^\s*;兽奸胸愛撫\ CFLAG:306\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3724-3729',
        any: [/^\s*;兽奸胸愛撫\ CFLAG:306\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3725-3729',
        any: [/^\s*;兽奸胸愛撫\ CFLAG:306\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3731',
        any: [/^\s*IF\ SELECTCOM\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3733',
        any: [/^\s*IF\ CFLAG:306\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3735',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3736',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3738-3746',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3739',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3740-3746',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3741',
        any: [/^\s*CFLAG:TARGET:306\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3742-3746',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3744-3746',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3746',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3747',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3748',
        any: [/^\s*CFLAG:306\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3750',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3751',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3752',
        any: [/^\s*CFLAG:306\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3754',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3755',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3756',
        any: [/^\s*CFLAG:306\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3758',
        any: [
          /^\s*ELSEIF\ ABL:1\ >=\ 3\ \&\&\ \(CFLAG:306\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3759',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3760',
        any: [/^\s*CFLAG:306\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3762',
        any: [/^\s*ELSEIF\ CFLAG:306\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3763',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3764',
        any: [/^\s*CFLAG:306\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3765-3771',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3766-3771',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3767-3771',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3768-3771',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3773',
        any: [/^\s*IF\ SELECTCOM\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3775',
        any: [/^\s*IF\ CFLAG:307\ ==\ 0\ \&\&\ TFLAG:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3777',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3778',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3780',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3781',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3783',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3784',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3771-3786',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3787',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3771-3788',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3789',
        any: [/^\s*CFLAG:307\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3771-3790',
        any: [/^\s*;兽奸キス\ CFLAG:307\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3792',
        any: [/^\s*ELSEIF\ CFLAG:307\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3794',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3795',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3797',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3798',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3800',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3801',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3803-3811',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3804',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3805-3811',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3806',
        any: [/^\s*CFLAG:307\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3807-3811',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3809-3811',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3811',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3812',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3813',
        any: [/^\s*CFLAG:307\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3815',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3816',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3817',
        any: [/^\s*CFLAG:307\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3819',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3820',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3821',
        any: [/^\s*CFLAG:307\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3823',
        any: [
          /^\s*ELSEIF\ ABL:10\ >=2\ \&\&\ \(CFLAG:307\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3824',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3825',
        any: [/^\s*CFLAG:307\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3827',
        any: [/^\s*ELSEIF\ CFLAG:307\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3828',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3829',
        any: [/^\s*CFLAG:307\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3830-3836',
        any: [/^\s*;兽奸アナル舐め\ CFLAG:310\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3831-3836',
        any: [/^\s*;兽奸アナル舐め\ CFLAG:310\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3832-3836',
        any: [/^\s*;兽奸アナル舐め\ CFLAG:310\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3833-3836',
        any: [/^\s*;兽奸アナル舐め\ CFLAG:310\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3838',
        any: [/^\s*IF\ SELECTCOM\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3840',
        any: [/^\s*IF\ CFLAG:310\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3842',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3843',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3845',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3846',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3848',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3849',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3851-3859',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3852',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3853-3859',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3854',
        any: [/^\s*CFLAG:TARGET:310\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3855-3859',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3857-3859',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3859',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3860',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3861',
        any: [/^\s*CFLAG:310\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3863',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3864',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3865',
        any: [/^\s*CFLAG:310\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3867',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3868',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3869',
        any: [/^\s*CFLAG:310\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3871',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:310\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3872',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3873',
        any: [/^\s*CFLAG:310\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3875',
        any: [/^\s*ELSEIF\ CFLAG:310\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3876',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3877',
        any: [/^\s*CFLAG:310\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3878-3884',
        any: [/^\s*;兽奸後背位\ CFLAG:322\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3879-3884',
        any: [/^\s*;兽奸後背位\ CFLAG:322\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3880-3884',
        any: [/^\s*;兽奸後背位\ CFLAG:322\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3881-3884',
        any: [/^\s*;兽奸後背位\ CFLAG:322\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3886',
        any: [/^\s*IF\ SELECTCOM\ ==\ 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3888',
        any: [/^\s*IF\ CFLAG:TARGET:322\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3890',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3892',
        any: [/^\s*IF\ TALENT:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3893',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的第一次、要献给汪酱了～……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3895',
        any: [/^\s*ELSEIF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3896',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的第一次、要和汪酱么？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3898',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3899',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的第一次、要和汪酱么？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3902-3903',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%还是第一次……居然要和汪酱…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3903',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%还是第一次……居然要和汪酱…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3903-3904',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%还是第一次……居然要和汪酱…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3903-3906',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……%SELF_CALL\(TARGET\)%还是第一次……居然要和汪酱…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3908',
        any: [/^\s*IF\ TALENT:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3909',
        any: [/^\s*PRINTFORMW\ 「汪酱～终于要交配了呢～……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3911',
        any: [/^\s*ELSEIF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3912',
        any: [/^\s*PRINTFORMW\ 「要和汪酱爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3914',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3915',
        any: [/^\s*PRINTFORMW\ 「要和汪酱爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3917-3918',
        any: [/^\s*PRINTFORMW\ 「要和汪酱交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3918',
        any: [/^\s*PRINTFORMW\ 「要和汪酱交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3918-3919',
        any: [/^\s*PRINTFORMW\ 「要和汪酱交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3918-3920',
        any: [/^\s*PRINTFORMW\ 「要和汪酱交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3921',
        any: [/^\s*CFLAG:322\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3918-3922',
        any: [/^\s*PRINTFORMW\ 「要和汪酱交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3924-3926',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3926',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3927',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3928',
        any: [/^\s*PRINTFORMW\ 「和汪酱交配～好幸福～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3929',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3930',
        any: [/^\s*PRINTFORMW\ 「来吧～汪酱～来交配吧～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3930-3931',
        any: [/^\s*PRINTFORMW\ 「来吧～汪酱～来交配吧～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3932',
        any: [
          /^\s*PRINTFORMW\ 「呵呵～汪酱、一副忍不了想交配的样子呢～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3932-3933',
        any: [
          /^\s*PRINTFORMW\ 「呵呵～汪酱、一副忍不了想交配的样子呢～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3934',
        any: [/^\s*CFLAG:322\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3936',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3937',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3938',
        any: [/^\s*PRINTFORMW\ 「要和汪酱爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3939',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3940',
        any: [/^\s*PRINTFORMW\ 「要和汪酱爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3936-3941',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3942',
        any: [/^\s*PRINTFORMW\ 「要和汪酱爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3936-3943',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3944',
        any: [/^\s*CFLAG:322\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3946',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3947',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3948',
        any: [/^\s*PRINTFORMW\ 「要和狗狗爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3949',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3950',
        any: [/^\s*PRINTFORMW\ 「要和狗狗爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3951-3965',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3952',
        any: [/^\s*PRINTFORMW\ 「要和狗狗爱爱是吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3953-3965',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3954',
        any: [/^\s*CFLAG:322\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3956',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:322\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3957',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配是吧……好、我明白了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3958',
        any: [/^\s*CFLAG:322\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3960',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:322\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3961',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配是吧……好、我明白了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3962',
        any: [/^\s*CFLAG:322\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3964',
        any: [/^\s*ELSEIF\ CFLAG:322\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3965',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3967',
        any: [/^\s*CFLAG:322\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3965-3968',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3965-3969',
        any: [/^\s*PRINTFORMW\ 「要和狗狗交配什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3970-3974',
        any: [/^\s*;兽奸後背位アナル\ CFLAG:328\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3971-3974',
        any: [/^\s*;兽奸後背位アナル\ CFLAG:328\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3976',
        any: [/^\s*IF\ SELECTCOM\ ==\ 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3978',
        any: [/^\s*IF\ CFLAG:TARGET:328\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3980',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3981',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3983',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3984',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3986',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3987',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3989-3996',
        any: [/^\s*;牝犬＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3990',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3991-3996',
        any: [/^\s*;牝犬＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3992',
        any: [/^\s*CFLAG:TARGET:328\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3993-3996',
        any: [/^\s*;牝犬＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3995-3996',
        any: [/^\s*;牝犬＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3997',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3998',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3999',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '3997-4000',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4001',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4002-4003',
        any: [/^\s*CFLAG:328\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4003',
        any: [/^\s*CFLAG:328\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4005',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4006',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4007',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4005-4008',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4009',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4010-4011',
        any: [/^\s*CFLAG:328\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4011',
        any: [/^\s*CFLAG:328\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4013',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4014',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4015',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4013-4016',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4017',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4013-4018',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4019',
        any: [/^\s*CFLAG:328\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4021',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:328\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4022',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4023',
        any: [/^\s*CFLAG:328\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4025',
        any: [
          /^\s*ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4026',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4027',
        any: [/^\s*CFLAG:328\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4029',
        any: [/^\s*ELSEIF\ \ CFLAG:328\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4030',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4031',
        any: [/^\s*CFLAG:328\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4032-4038',
        any: [/^\s*;兽奸手淫\ CFLAG:331\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4033-4038',
        any: [/^\s*;兽奸手淫\ CFLAG:331\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4034-4038',
        any: [/^\s*;兽奸手淫\ CFLAG:331\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4035-4038',
        any: [/^\s*;兽奸手淫\ CFLAG:331\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4040',
        any: [/^\s*IF\ SELECTCOM\ ==\ 30\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4042',
        any: [/^\s*IF\ CFLAG:TARGET:331\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4044',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4045',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4047',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4048',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4050',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4051',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4053-4060',
        any: [/^\s*;牝犬＋奉仕精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4054',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4055-4060',
        any: [/^\s*;牝犬＋奉仕精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4056',
        any: [/^\s*CFLAG:TARGET:331\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4057-4060',
        any: [/^\s*;牝犬＋奉仕精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4059-4060',
        any: [/^\s*;牝犬＋奉仕精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4061',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4062',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4063',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4061-4064',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4065',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4066-4067',
        any: [/^\s*CFLAG:331\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4067',
        any: [/^\s*CFLAG:331\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4069',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4070',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4071',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4069-4072',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4073',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4069-4074',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4075',
        any: [/^\s*CFLAG:331\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4077',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:331\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4078',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4079',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4069-4080',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4081',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4069-4082',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4083',
        any: [/^\s*CFLAG:331\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4085',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4086',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4087',
        any: [/^\s*CFLAG:331\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4089',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4090',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4091',
        any: [/^\s*CFLAG:331\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4093',
        any: [/^\s*ELSEIF\ CFLAG:331\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4094',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4095',
        any: [/^\s*CFLAG:331\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4096-4102',
        any: [/^\s*;兽奸フェラチオ\ CFLAG:332\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4097-4102',
        any: [/^\s*;兽奸フェラチオ\ CFLAG:332\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4098-4102',
        any: [/^\s*;兽奸フェラチオ\ CFLAG:332\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4099-4102',
        any: [/^\s*;兽奸フェラチオ\ CFLAG:332\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4104',
        any: [/^\s*IF\ SELECTCOM\ ==\ 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4106',
        any: [/^\s*IF\ CFLAG:TARGET:332\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4108',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4109',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4111',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4112',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4114',
        any: [/^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4115',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4117-4125',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4118',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4119-4125',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4120',
        any: [/^\s*CFLAG:TARGET:332\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4121-4125',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4123-4125',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4125',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4126',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4127',
        any: [/^\s*CFLAG:332\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4129',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4130',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4131',
        any: [/^\s*CFLAG:332\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4133',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:332\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4134',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4135',
        any: [/^\s*CFLAG:332\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4137',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4138',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4139',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4140',
        any: [/^\s*CFLAG:332\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4142',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:332\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4143',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4144',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4145',
        any: [/^\s*CFLAG:332\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4147',
        any: [/^\s*ELSEIF\ CFLAG:332\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4148',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4149',
        any: [/^\s*CFLAG:332\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4150-4156',
        any: [/^\s*;兽奸騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4151-4156',
        any: [/^\s*;兽奸騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4152-4156',
        any: [/^\s*;兽奸騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4153-4156',
        any: [/^\s*;兽奸騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4158',
        any: [/^\s*IF\ SELECTCOM\ ==\ 34\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4160',
        any: [/^\s*IF\ CFLAG:TARGET:335\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4162',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4164',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4165',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4167',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4168',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4170',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4171',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4156-4173',
        any: [/^\s*;兽奸騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4174',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4156-4175',
        any: [/^\s*;兽奸騎乗位\ CFLAG:335\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4177-4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4179',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4180',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4182',
        any: [/^\s*ELSEIF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4183',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4185',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4186',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4188-4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4189',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4190-4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4191-4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4192',
        any: [/^\s*CFLAG:TARGET:335\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4193-4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4195-4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4197',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4198',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4199',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4200',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4201',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4202-4205',
        any: [/^\s*CFLAG:335\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4203',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4204-4205',
        any: [/^\s*CFLAG:335\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4205',
        any: [/^\s*CFLAG:335\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4207',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4208',
        any: [/^\s*IF\ RAND:4\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4209',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4210',
        any: [/^\s*ELSEIF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4211',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4212',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4213',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4207-4214',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4215',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4207-4216',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4217',
        any: [/^\s*CFLAG:335\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4219',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4220',
        any: [/^\s*IF\ RAND:4\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4221',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4222',
        any: [/^\s*ELSEIF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4223',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4224',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4225',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4207-4226',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4227',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4207-4228',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4229',
        any: [/^\s*CFLAG:335\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4231',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:335\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4232',
        any: [/^\s*IF\ RAND:4\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4233',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4234',
        any: [/^\s*ELSEIF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4235',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4236',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4237',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4238-4257',
        any: [/^\s*;兽奸アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4239',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4240-4257',
        any: [/^\s*;兽奸アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4241',
        any: [/^\s*CFLAG:335\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4243',
        any: [
          /^\s*ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:335\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4244',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4245',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4246',
        any: [/^\s*CFLAG:335\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4248',
        any: [/^\s*ELSEIF\ CFLAG:335\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4249',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4250',
        any: [/^\s*CFLAG:335\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4251-4257',
        any: [/^\s*;兽奸アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4252-4257',
        any: [/^\s*;兽奸アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4253-4257',
        any: [/^\s*;兽奸アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4254-4257',
        any: [/^\s*;兽奸アナル奉仕\ CFLAG:338\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4259',
        any: [/^\s*IF\ SELECTCOM\ ==\ 37\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4261',
        any: [/^\s*IF\ CFLAG:TARGET:338\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4263',
        any: [/^\s*IF\ ABL:TARGET:16\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4264',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4266-4274',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4267',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4268-4274',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4269',
        any: [/^\s*CFLAG:TARGET:338\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4270-4274',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4272-4274',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4274',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4275',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4276',
        any: [/^\s*CFLAG:338\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4278',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4279',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4280',
        any: [/^\s*CFLAG:338\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4282',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4283',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4284',
        any: [/^\s*CFLAG:338\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4286',
        any: [
          /^\s*ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:338\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4287',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4288',
        any: [/^\s*CFLAG:338\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4290',
        any: [/^\s*ELSEIF\ CFLAG:338\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4291',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4292',
        any: [/^\s*CFLAG:338\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4293-4299',
        any: [/^\s*;兽奸アイマスク\ CFLAG:344　CFLAG:444\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4294-4299',
        any: [/^\s*;兽奸アイマスク\ CFLAG:344　CFLAG:444\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4295-4299',
        any: [/^\s*;兽奸アイマスク\ CFLAG:344　CFLAG:444\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4296-4299',
        any: [/^\s*;兽奸アイマスク\ CFLAG:344　CFLAG:444\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4302',
        any: [/^\s*IF\ SELECTCOM\ ==\ 43\ \&\&\ TEQUIP:43\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4304',
        any: [/^\s*IF\ CFLAG:TARGET:344\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4306',
        any: [/^\s*IF\ TALENT:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4307',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4309',
        any: [/^\s*ELSEIF\ TALENT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4310',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4312',
        any: [/^\s*ELSEIF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4313',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4315-4323',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 9\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4316',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4317-4323',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 9\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4318',
        any: [/^\s*CFLAG:TARGET:344\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4319-4323',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 9\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4321-4323',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 9\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4323',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 9\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4324',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4325',
        any: [/^\s*CFLAG:TARGET:344\ =\ 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4327',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4328',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4329',
        any: [/^\s*CFLAG:TARGET:344\ =\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4331',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4332',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4333',
        any: [/^\s*CFLAG:TARGET:344\ =\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4335',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4336',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4337',
        any: [/^\s*CFLAG:TARGET:344\ =\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4339',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4340',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4341',
        any: [/^\s*CFLAG:TARGET:344\ =\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4343',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4344',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4345',
        any: [/^\s*CFLAG:TARGET:344\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4347',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4348',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4349',
        any: [/^\s*CFLAG:TARGET:344\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4351',
        any: [
          /^\s*ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4352',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4353',
        any: [/^\s*CFLAG:TARGET:344\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4355',
        any: [/^\s*ELSEIF\ CFLAG:344\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4356',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4357',
        any: [/^\s*CFLAG:TARGET:344\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4358-4364',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:338\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4359-4364',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:338\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4360-4364',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:338\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4362',
        any: [/^\s*ELSEIF\ SELECTCOM\ ==\ 43\ \&\&\ TEQUIP:43\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4364',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:338\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4365',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4366',
        any: [/^\s*CFLAG:444\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4368',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:338\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4369',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4370',
        any: [/^\s*CFLAG:444\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4372',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:338\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4373',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4374',
        any: [/^\s*CFLAG:444\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4376',
        any: [/^\s*ELSEIF\ CFLAG:444\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4377',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4378',
        any: [/^\s*CFLAG:444\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4378-4379',
        any: [/^\s*CFLAG:444\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4378-4380',
        any: [/^\s*CFLAG:444\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4378-4381',
        any: [/^\s*CFLAG:444\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4387',
        any: [/^\s*IF\ SELECTCOM\ ==\ 56\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4389',
        any: [/^\s*IF\ CFLAG:357\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4390',
        any: [/^\s*IF\ TEQUIP:53\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4393',
        any: [/^\s*IF\ TALENT:TARGET:136\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4394',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4396',
        any: [/^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4397',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4399',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4400',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4402-4413',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4403',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4404-4413',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4405-4413',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4406',
        any: [/^\s*CFLAG:357\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4407-4413',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4409-4413',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4410',
        any: [/^\s*IF\ TEQUIP:53\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4413',
        any: [
          /^\s*IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4414',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4415',
        any: [/^\s*CFLAG:357\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4417',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4418',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4419',
        any: [/^\s*CFLAG:357\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4421',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4422',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4423',
        any: [/^\s*CFLAG:357\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4425',
        any: [/^\s*ELSEIF\ CFLAG:357\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4426',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4427',
        any: [/^\s*CFLAG:357\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4428-4438',
        any: [/^\s*;@KOJO_MESSAGE_PALAMCNG関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4429-4438',
        any: [/^\s*;@KOJO_MESSAGE_PALAMCNG関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4430-4438',
        any: [/^\s*;@KOJO_MESSAGE_PALAMCNG関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4431-4438',
        any: [/^\s*;@KOJO_MESSAGE_PALAMCNG関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4432-4438',
        any: [/^\s*;@KOJO_MESSAGE_PALAMCNG関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4435-4438',
        any: [/^\s*;@KOJO_MESSAGE_PALAMCNG関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4442',
        any: [/^\s*@KOJO_MESSAGE_PALAMCNG_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4442-4448',
        any: [/^\s*@KOJO_MESSAGE_PALAMCNG_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4451-4454',
        any: [/^\s*;パラメータ変動時のセリフ\ CFLAG\ 221～260を使用\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4459',
        any: [/^\s*P\ =\ PALAM:3\ \+\ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4460',
        any: [/^\s*IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:TARGET:221\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4462',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4464',
        any: [/^\s*IF\ SELECTCOM\ ==\ 50\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4465',
        any: [/^\s*PRINTFORMW\ 「变得黏糊糊的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4467-4468',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了、、、吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4468',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了、、、吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4468-4469',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了、、、吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4468-4471',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了、、、吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4473',
        any: [/^\s*IF\ SELECTCOM\ ==\ 50\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4474',
        any: [/^\s*PRINTFORMW\ 「讨厌、变得粘糊糊的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4476-4477',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了啊嗷嗷唔」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4477',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了啊嗷嗷唔」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4477-4478',
        any: [/^\s*PRINTFORMW\ 「湿了……湿了啊嗷嗷唔」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4479-4480',
        any: [/^\s*CFLAG:TARGET:221\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4480',
        any: [/^\s*CFLAG:TARGET:221\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4480-4481',
        any: [/^\s*CFLAG:TARGET:221\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4486',
        any: [/^\s*P\ =\ PALAM:5\ \+\ UP:5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4487',
        any: [/^\s*IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:222\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4489',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4491',
        any: [/^\s*IF\ SELECTCOM\ ==\ 51\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4492',
        any: [/^\s*PRINTFORMW\ 「要用这种药……啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4494-4495',
        any: [/^\s*PRINTFORMW\ 「哈\ 哈……还、还要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4495',
        any: [/^\s*PRINTFORMW\ 「哈\ 哈……还、还要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4495-4496',
        any: [/^\s*PRINTFORMW\ 「哈\ 哈……还、还要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4495-4498',
        any: [/^\s*PRINTFORMW\ 「哈\ 哈……还、还要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4500',
        any: [/^\s*IF\ SELECTCOM\ ==\ 51\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4501',
        any: [/^\s*PRINTFORMW\ 「不行……想要……是因为吃了媚药的原因吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4503-4504',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……原谅%SELF_CALL\(TARGET\)%……好想要」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4504',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……原谅%SELF_CALL\(TARGET\)%……好想要」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4504-4505',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……原谅%SELF_CALL\(TARGET\)%……好想要」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4506-4507',
        any: [/^\s*CFLAG:222\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4507',
        any: [/^\s*CFLAG:222\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4507-4508',
        any: [/^\s*CFLAG:222\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4513',
        any: [/^\s*P\ =\ PALAM:8\ \+\ UP:8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4514',
        any: [/^\s*IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:223\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4516',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4517',
        any: [/^\s*PRINTFORMW\ 「不要……好害羞的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4519-4522',
        any: [/^\s*CFLAG:223\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4520',
        any: [/^\s*PRINTFORMW\ 「不要……好害羞的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4521-4522',
        any: [/^\s*CFLAG:223\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4522',
        any: [/^\s*CFLAG:223\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4522-4523',
        any: [/^\s*CFLAG:223\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4528',
        any: [/^\s*P\ =\ PALAM:10\ \+\ UP:10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4529',
        any: [/^\s*IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:224\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4531',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4532',
        any: [
          /^\s*PRINTFORMW\ 「不要！求求你饶了%SELF_CALL\(TARGET\)%吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4534-4537',
        any: [/^\s*CFLAG:224\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4535',
        any: [
          /^\s*PRINTFORMW\ 「不要！求求你饶了%SELF_CALL\(TARGET\)%吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4536-4537',
        any: [/^\s*CFLAG:224\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4537',
        any: [/^\s*CFLAG:224\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4537-4538',
        any: [/^\s*CFLAG:224\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4543',
        any: [/^\s*IF\ NOWEX:0\ >\ 0\ \&\&\ CFLAG:225\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4545',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4546',
        any: [/^\s*PRINTFORMW\ 「%阴核\(TARGET\)%……要高潮了！！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4548-4551',
        any: [/^\s*CFLAG:225\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4549',
        any: [/^\s*PRINTFORMW\ 「%阴核\(TARGET\)%……要高潮了！！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4550-4551',
        any: [/^\s*CFLAG:225\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4551',
        any: [/^\s*CFLAG:225\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4551-4552',
        any: [/^\s*CFLAG:225\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4557',
        any: [/^\s*IF\ NOWEX:1\ >\ 0\ \&\&\ CFLAG:226\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4559',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4560',
        any: [
          /^\s*PRINTFORMW\ 「不行%SELF_CALL\(TARGET\)%要去了、啊啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4562',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4563',
        any: [/^\s*PRINTFORMW\ 「里面……好舒服啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4565-4566',
        any: [/^\s*PRINTFORMW\ 「要、要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4566',
        any: [/^\s*PRINTFORMW\ 「要、要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4566-4567',
        any: [/^\s*PRINTFORMW\ 「要、要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4568',
        any: [/^\s*CFLAG:TARGET:226\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4568-4569',
        any: [/^\s*CFLAG:TARGET:226\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4574',
        any: [/^\s*IF\ NOWEX:2\ >\ 0\ \&\&\ CFLAG:227\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4576',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4577',
        any: [/^\s*PRINTFORMW\ 「啊、啊、肛门最棒了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4579',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4580',
        any: [/^\s*PRINTFORMW\ 「屁股……感觉太美妙了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4582-4583',
        any: [/^\s*PRINTFORMW\ 「啊、不行…屁股……要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4583',
        any: [/^\s*PRINTFORMW\ 「啊、不行…屁股……要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4583-4584',
        any: [/^\s*PRINTFORMW\ 「啊、不行…屁股……要去了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4585',
        any: [/^\s*CFLAG:227\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4585-4586',
        any: [/^\s*CFLAG:227\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4591',
        any: [/^\s*IF\ NOWEX:3\ >\ 0\ \&\&\ CFLAG:228\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4593',
        any: [/^\s*IF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4594',
        any: [/^\s*PRINTFORMW\ 「乳房、高潮了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4596-4599',
        any: [/^\s*CFLAG:TARGET:228\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4597',
        any: [/^\s*PRINTFORMW\ 「乳房、高潮了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4598-4599',
        any: [/^\s*CFLAG:TARGET:228\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4599',
        any: [/^\s*CFLAG:TARGET:228\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4599-4600',
        any: [/^\s*CFLAG:TARGET:228\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4605',
        any: [/^\s*A\ =\ UP:11\ \+\ UP:12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4606',
        any: [/^\s*IF\ TFLAG:3\ ==\ 1\ \&\&\ CFLAG:229\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4608',
        any: [/^\s*IF\ TFLAG:20\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4610',
        any: [
          /^\s*IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(A\ <\ 500\ \|\|\ TFLAG:150\ ==\ 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4611',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4613',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(A\ <\ 500\ \|\|\ TFLAG:150\ ==\ 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4614',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4613-4616',
        any: [
          /^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(A\ <\ 500\ \|\|\ TFLAG:150\ ==\ 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4617',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4618-4619',
        any: [/^\s*;主人以外による処女喪失（再生処女含む）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4619-4620',
        any: [/^\s*;主人以外による処女喪失（再生処女含む）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4622',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4623',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4625',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4626',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4628-4632',
        any: [/^\s*CFLAG:TARGET:229\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4629',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4630-4632',
        any: [/^\s*CFLAG:TARGET:229\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4631-4632',
        any: [/^\s*CFLAG:TARGET:229\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4632',
        any: [/^\s*CFLAG:TARGET:229\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4632-4633',
        any: [/^\s*CFLAG:TARGET:229\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4640',
        any: [/^\s*@KOJO_MESSAGE_SYASEI_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4646-4651',
        any: [/^\s*IF\ TFLAG:2\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4651',
        any: [/^\s*IF\ TFLAG:2\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4652',
        any: [/^\s*IF\ TALENT:TARGET:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4653',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4654',
        any: [/^\s*PRINTFORML\ 「唔呵呵%UNICODE\(0x2661\)\ \*1%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4655',
        any: [
          /^\s*PRINTFORMW\ 「出来了很多啊、很舒服吧%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4655-4656',
        any: [
          /^\s*PRINTFORMW\ 「出来了很多啊、很舒服吧%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4657',
        any: [/^\s*PRINTFORML\ 「唔呵呵%UNICODE\(0x2661\)\ \*1%……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4658',
        any: [
          /^\s*PRINTFORMW\ 「请多注入一些吧%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4658-4659',
        any: [
          /^\s*PRINTFORMW\ 「请多注入一些吧%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4660',
        any: [/^\s*ELSEIF\ TALENT:TARGET:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4661',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4662',
        any: [/^\s*PRINTFORML\ 「哎呀哎呀%UNICODE\(0x2661\)\ \*1%……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4663',
        any: [
          /^\s*PRINTFORMW\ 「注入了这么多……要怀上孩子了啦%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4663-4664',
        any: [
          /^\s*PRINTFORMW\ 「注入了这么多……要怀上孩子了啦%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4665',
        any: [/^\s*PRINTFORML\ 「唔呵呵%UNICODE\(0x2661\)\ \*1%……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4666',
        any: [
          /^\s*PRINTFORMW\ 「请注入到怀孕为止吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4666-4667',
        any: [
          /^\s*PRINTFORMW\ 「请注入到怀孕为止吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4669',
        any: [
          /^\s*PRINTFORMW\ 「机会难得、向那个人报告一下好了%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4669-4670',
        any: [
          /^\s*PRINTFORMW\ 「机会难得、向那个人报告一下好了%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4671',
        any: [/^\s*IF\ TALENT:157\ \&\&\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4672',
        any: [/^\s*IF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4673',
        any: [/^\s*PRINTFORMW\ 「请原谅%SELF_CALL\(TARGET\)%…老公……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4673-4674',
        any: [/^\s*PRINTFORMW\ 「请原谅%SELF_CALL\(TARGET\)%…老公……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4675',
        any: [/^\s*PRINTFORMW\ 「对不起…老公……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4675-4676',
        any: [/^\s*PRINTFORMW\ 「对不起…老公……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4677-4678',
        any: [/^\s*PRINTFORMW\ 「不可以射在里面啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4678',
        any: [/^\s*PRINTFORMW\ 「不可以射在里面啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4678-4679',
        any: [/^\s*PRINTFORMW\ 「不可以射在里面啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4678-4680',
        any: [/^\s*PRINTFORMW\ 「不可以射在里面啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4678-4681',
        any: [/^\s*PRINTFORMW\ 「不可以射在里面啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4688',
        any: [/^\s*@KOJO_MESSAGE_MARKCNG_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4692-4694',
        any: [
          /^\s*;ボールギャグ着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4698',
        any: [/^\s*IF\ TFLAG:22\ ==\ 3\ \&\&\ CFLAG:297\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4700',
        any: [/^\s*IF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4701',
        any: [/^\s*PRINTFORMW\ 「好痛苦……但却有种快乐的感觉？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4701-4702',
        any: [/^\s*PRINTFORMW\ 「好痛苦……但却有种快乐的感觉？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4703',
        any: [/^\s*PRINTFORMW\ 「好痛苦……呜呜…………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4703-4704',
        any: [/^\s*PRINTFORMW\ 「好痛苦……呜呜…………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4705',
        any: [/^\s*CFLAG:297\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4705-4706',
        any: [/^\s*CFLAG:297\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4711',
        any: [/^\s*IF\ TFLAG:23\ ==\ 3\ \&\&\ CFLAG:298\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4713',
        any: [/^\s*IF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4714',
        any: [/^\s*PRINTFORMW\ 「啊……人家变得好奇怪……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4715-4718',
        any: [/^\s*CFLAG:298\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4716',
        any: [/^\s*PRINTFORMW\ 「啊……人家变得好奇怪……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4717-4718',
        any: [/^\s*CFLAG:298\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4718',
        any: [/^\s*CFLAG:298\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4718-4719',
        any: [/^\s*CFLAG:298\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4724',
        any: [/^\s*IF\ TFLAG:24\ ==\ 3\ \&\&\ CFLAG:299\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4726',
        any: [/^\s*IF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4727',
        any: [
          /^\s*PRINTFORMW\ 「已经不行了……请原谅%SELF_CALL\(TARGET\)%……求您饶恕%SELF_CALL\(TARGET\)%吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4728-4731',
        any: [/^\s*CFLAG:299\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4729',
        any: [
          /^\s*PRINTFORMW\ 「已经不行了……请原谅%SELF_CALL\(TARGET\)%……求您饶恕%SELF_CALL\(TARGET\)%吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4730-4731',
        any: [/^\s*CFLAG:299\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4731',
        any: [/^\s*CFLAG:299\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4731-4732',
        any: [/^\s*CFLAG:299\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4737',
        any: [/^\s*IF\ TFLAG:21\ ==\ 3\ \&\&\ CFLAG:300\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4739',
        any: [/^\s*IF\ TALENT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4740',
        any: [/^\s*PRINTFORMW\ 「不可饶恕……绝对……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4741-4744',
        any: [/^\s*CFLAG:300\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4742',
        any: [/^\s*PRINTFORMW\ 「不可饶恕……绝对……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4743-4744',
        any: [/^\s*CFLAG:300\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4744',
        any: [/^\s*CFLAG:300\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4744-4745',
        any: [/^\s*CFLAG:300\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4751',
        any: [/^\s*@SELF_KOJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4755',
        any: [/^\s*IF\ TFLAG:13\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4757',
        any: [/^\s*IF\ TALENT:9\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4758',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4760',
        any: [/^\s*ELSEIF\ Q\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4761',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4763',
        any: [/^\s*ELSEIF\ Q\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4764',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4766-4768',
        any: [
          /^\s*IF\ TALENT:76\ \&\&\ \(CFLAG:261\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4768',
        any: [
          /^\s*IF\ TALENT:76\ \&\&\ \(CFLAG:261\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4769',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4770',
        any: [/^\s*CFLAG:261\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4772',
        any: [
          /^\s*ELSEIF\ TALENT:85\ \&\&\ \(CFLAG:261\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4773',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4774',
        any: [/^\s*CFLAG:261\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4776',
        any: [
          /^\s*ELSEIF\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:261\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4777',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4778',
        any: [/^\s*CFLAG:261\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4780',
        any: [/^\s*ELSEIF\ CFLAG:261\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4781',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4782',
        any: [/^\s*CFLAG:261\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4782-4783',
        any: [/^\s*CFLAG:261\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4782-4784',
        any: [/^\s*CFLAG:261\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4782-4785',
        any: [/^\s*CFLAG:261\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4790',
        any: [/^\s*IF\ TFLAG:13\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4792',
        any: [
          /^\s*IF\ TALENT:76\ \&\&\ \(CFLAG:262\ <\ 5\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4793',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4794',
        any: [/^\s*CFLAG:262\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4796',
        any: [
          /^\s*ELSEIF\ TALENT:85\ \&\&\ \(CFLAG:262\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4797',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4798',
        any: [/^\s*CFLAG:262\ =\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4800',
        any: [
          /^\s*ELSEIF\ ABL:33\ >=\ 3\ \&\&\ \(CFLAG:262\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4801',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4802',
        any: [/^\s*CFLAG:262\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4804',
        any: [
          /^\s*ELSEIF\ ABL:22\ >=\ 3\ \&\&\ \(CFLAG:262\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4805',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4806',
        any: [/^\s*CFLAG:262\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4808',
        any: [/^\s*ELSEIF\ CFLAG:262\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4809',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4810',
        any: [/^\s*CFLAG:262\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4810-4811',
        any: [/^\s*CFLAG:262\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4810-4812',
        any: [/^\s*CFLAG:262\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4817',
        any: [/^\s*IF\ TFLAG:13\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4819',
        any: [
          /^\s*IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:263\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4820',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4821',
        any: [/^\s*CFLAG:263\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4823',
        any: [
          /^\s*ELSEIF\ TALENT:85\ \&\&\ \(CFLAG:263\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4824',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4825',
        any: [/^\s*CFLAG:263\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4827',
        any: [
          /^\s*ELSEIF\ ABL:16\ >=\ 5\ \&\&\ \(CFLAG:263\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4828',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4829',
        any: [/^\s*CFLAG:263\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4831',
        any: [/^\s*ELSEIF\ CFLAG:263\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4832',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4833',
        any: [/^\s*CFLAG:263\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4833-4834',
        any: [/^\s*CFLAG:263\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4833-4835',
        any: [/^\s*CFLAG:263\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4840',
        any: [/^\s*IF\ TFLAG:13\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4842',
        any: [
          /^\s*IF\ ABL:2\ >=\ 4\ \&\&\ \(CFLAG:264\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4843',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4844',
        any: [/^\s*CFLAG:264\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4846',
        any: [/^\s*ELSEIF\ CFLAG:264\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4847',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4848',
        any: [/^\s*CFLAG:264\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4848-4849',
        any: [/^\s*CFLAG:264\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4848-4850',
        any: [/^\s*CFLAG:264\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4855',
        any: [/^\s*IF\ TFLAG:13\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4856',
        any: [/^\s*IF\ CFLAG:265\ <\ 1\ \|\|\ FLAG:7\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4857',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4858',
        any: [/^\s*CFLAG:265\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4858-4859',
        any: [/^\s*CFLAG:265\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4858-4860',
        any: [/^\s*CFLAG:265\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4865',
        any: [/^\s*IF\ TFLAG:13\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4867',
        any: [/^\s*IF\ TALENT:85\ \&\&\ MARK:3\ <\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4868',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4870',
        any: [/^\s*ELSEIF\ MARK:3\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4871',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4873',
        any: [/^\s*ELSEIF\ TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4874',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4873-4876',
        any: [/^\s*ELSEIF\ TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4877',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4878-4879',
        any: [/^\s*SIF\ TALENT:122\ !=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4880',
        any: [/^\s*CALL\ SELL_MATURO_K0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4880-4881',
        any: [/^\s*CALL\ SELL_MATURO_K0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4886',
        any: [/^\s*IF\ TFLAG:13\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4886-4887',
        any: [/^\s*IF\ TFLAG:13\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4888',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4886-4889',
        any: [/^\s*IF\ TFLAG:13\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4890-4893',
        any: [/^\s*;ガンダーロボ戦に参加して勝利\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4895',
        any: [/^\s*IF\ TFLAG:13\ ==\ 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4895-4896',
        any: [/^\s*IF\ TFLAG:13\ ==\ 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4897',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4895-4898',
        any: [/^\s*IF\ TFLAG:13\ ==\ 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4899-4902',
        any: [/^\s*;妊娠発覚\ CFLAG:271\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4905',
        any: [/^\s*IF\ TFLAG:13\ ==\ 11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4906-4907',
        any: [/^\s*SIF\ CFLAG:271\ >=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4909',
        any: [/^\s*IF\ TALENT:9\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4910',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4912',
        any: [/^\s*ELSEIF\ TALENT:85\ \&\&\ CFLAG:102\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4913',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4915-4918',
        any: [/^\s*CFLAG:271\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4916',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4917-4918',
        any: [/^\s*CFLAG:271\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4918',
        any: [/^\s*CFLAG:271\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4918-4919',
        any: [/^\s*CFLAG:271\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4925',
        any: [/^\s*IF\ TFLAG:13\ ==\ 12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4926-4927',
        any: [/^\s*SIF\ CFLAG:272\ >=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4929',
        any: [/^\s*IF\ TALENT:9\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4930',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4932',
        any: [/^\s*ELSEIF\ TALENT:85\ \&\&\ CFLAG:102\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4933',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4935-4938',
        any: [/^\s*CFLAG:272\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4936',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4937-4938',
        any: [/^\s*CFLAG:272\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4938',
        any: [/^\s*CFLAG:272\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4938-4939',
        any: [/^\s*CFLAG:272\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4944',
        any: [/^\s*IF\ TFLAG:13\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4946',
        any: [/^\s*IF\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4947',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4944-4949',
        any: [/^\s*IF\ TFLAG:13\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4950',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4951-4955',
        any: [/^\s*;寿命による消滅\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4952-4955',
        any: [/^\s*;寿命による消滅\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4957',
        any: [/^\s*IF\ TFLAG:13\ ==\ 998\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4959',
        any: [/^\s*IF\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4960',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4957-4962',
        any: [/^\s*IF\ TFLAG:13\ ==\ 998\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4963',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4964-4970',
        any: [/^\s*TFLAG:13\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4965-4970',
        any: [/^\s*TFLAG:13\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4970',
        any: [/^\s*TFLAG:13\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '4970-4972',
        any: [/^\s*TFLAG:13\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5000',
        any: [/^\s*@DUNGEON_RYOUZYOKU_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5005',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5007',
        any: [
          /^\s*PRINTFORMW\ 「怎么会这样……%SELF_CALL\(TARGET\)%的……第一次……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5009',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5012',
        any: [/^\s*PRINTFORMW\ 「……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5014-5018',
        any: [
          /^\s*PRINTFORMW\ 「那个、人的性命只有一次所以……如果想要的话请尽管使用%SELF_CALL\(TARGET\)%的身体……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5015',
        any: [
          /^\s*ELSEIF\ TALENT:17\ ==1\ \|\|\ TALENT:31\ ==\ 1\ \|\|\ TALENT:36\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5018',
        any: [
          /^\s*PRINTFORMW\ 「那个、人的性命只有一次所以……如果想要的话请尽管使用%SELF_CALL\(TARGET\)%的身体……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5022',
        any: [
          /^\s*PRINTFORMW\ 「是、是的、屁股的话……即使是侵犯%SELF_CALL\(TARGET\)%的屁股也没事的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5026',
        any: [/^\s*PRINTFORMW\ 「就是用嘴的话也没关系的……感觉怎么样……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5028',
        any: [
          /^\s*ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5032',
        any: [
          /^\s*PRINTFORMW\ 「即使%SELF_CALL\(TARGET\)%的身体被侮辱了%SELF_CALL\(TARGET\)%的心也不会屈服的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5034',
        any: [/^\s*ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5037',
        any: [/^\s*PRINTFORMW\ 「杀了你……%SELF_CALL\(TARGET\)%要杀了你」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5037-5039',
        any: [/^\s*PRINTFORMW\ 「杀了你……%SELF_CALL\(TARGET\)%要杀了你」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5042',
        any: [
          /^\s*PRINTFORMW\ 「啊啊……早知道会这样的话……就不冒这个险了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5042-5044',
        any: [
          /^\s*PRINTFORMW\ 「啊啊……早知道会这样的话……就不冒这个险了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5045-5047',
        any: [
          /^\s*PRINTFORMW\ 「求……求求你……帮帮%SELF_CALL\(TARGET\)%……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5047',
        any: [
          /^\s*PRINTFORMW\ 「求……求求你……帮帮%SELF_CALL\(TARGET\)%……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5049',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5052',
        any: [/^\s*PRINTFORMW\ 「……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5054-5058',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%知道该怎么和男人们打交道！%SELF_CALL\(TARGET\)%会让各位感到满足……所以…请饶过一命…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5055',
        any: [
          /^\s*ELSEIF\ TALENT:17\ ==1\ \|\|\ TALENT:31\ ==\ 1\ \|\|\ TALENT:36\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5058',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%知道该怎么和男人们打交道！%SELF_CALL\(TARGET\)%会让各位感到满足……所以…请饶过一命…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5062',
        any: [/^\s*PRINTFORMW\ 「屁股也可以的吧！屁股也可以爽的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5066',
        any: [/^\s*PRINTFORMW\ 「用嘴来服侍你！　精液……也会喝掉的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5068',
        any: [
          /^\s*ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5072',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%、%SELF_CALL\(TARGET\)%是绝对不会屈服于你们这些家伙的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5074',
        any: [/^\s*ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5077',
        any: [/^\s*PRINTFORMW\ 「请……杀了%SELF_CALL\(TARGET\)%吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5077-5079',
        any: [/^\s*PRINTFORMW\ 「请……杀了%SELF_CALL\(TARGET\)%吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5082',
        any: [/^\s*PRINTFORMW\ 「啊啊……为什么会这样……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5082-5084',
        any: [/^\s*PRINTFORMW\ 「啊啊……为什么会这样……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5082-5085',
        any: [/^\s*PRINTFORMW\ 「啊啊……为什么会这样……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5087-5090',
        any: [/^\s*@DUNGEON_RYOUZYOKU_AFTER_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5090',
        any: [/^\s*@DUNGEON_RYOUZYOKU_AFTER_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5095',
        any: [/^\s*IF\ TALENT:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5097',
        any: [
          /^\s*PRINTFORMW\ 「哈啊……总算保住了%SELF_CALL\(TARGET\)%的贞操」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5099',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5102',
        any: [/^\s*PRINTFORMW\ 「……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5104-5109',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……都对%SELF_CALL\(TARGET\)%的屁股做什么啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5105-5109',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……都对%SELF_CALL\(TARGET\)%的屁股做什么啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5108',
        any: [/^\s*IF\ EXP:1\ >\ 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5109',
        any: [
          /^\s*PRINTFORMW\ 「呜呜……都对%SELF_CALL\(TARGET\)%的屁股做什么啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5110',
        any: [/^\s*PRINTFORMW\ 「真过分……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5110-5111',
        any: [/^\s*PRINTFORMW\ 「真过分……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5115',
        any: [/^\s*PRINTFORMW\ 「咕诶……\ 哈、哈……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5119',
        any: [/^\s*PRINTFORMW\ 「黏在喉咙上了……呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5119-5120',
        any: [/^\s*PRINTFORMW\ 「黏在喉咙上了……呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5122',
        any: [/^\s*PRINTFORMW\ 「结、结束了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5124',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5127',
        any: [/^\s*PRINTFORMW\ 「……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5129-5132',
        any: [/^\s*;膣を苛められすぎた感想\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5130-5132',
        any: [/^\s*;膣を苛められすぎた感想\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5133',
        any: [/^\s*IF\ EXP:0\ >\ 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5134',
        any: [/^\s*PRINTFORMW\ 「会有……小宝宝的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5135',
        any: [/^\s*PRINTFORMW\ 「过分……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5135-5136',
        any: [/^\s*PRINTFORMW\ 「过分……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5139',
        any: [/^\s*IF\ EXP:1\ >\ 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5140',
        any: [/^\s*PRINTFORMW\ 「这样子弄……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5141',
        any: [/^\s*PRINTFORMW\ 「屁股、要坏掉了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5141-5142',
        any: [/^\s*PRINTFORMW\ 「屁股、要坏掉了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5146',
        any: [/^\s*PRINTFORMW\ 「咕诶……口交得太过头了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5150',
        any: [/^\s*PRINTFORMW\ 「嘴里……还有很多……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5150-5151',
        any: [/^\s*PRINTFORMW\ 「嘴里……还有很多……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5153-5155',
        any: [/^\s*@BENKI_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5155',
        any: [/^\s*@BENKI_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5160',
        any: [/^\s*IF\ FLAG:62\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5163',
        any: [/^\s*IF\ FLAG:63\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5164',
        any: [
          /^\s*PRINTFORMW\ 「要让%SELF_CALL\(A\)%服侍这几位吗……？　好的！　明白啦%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5165',
        any: [
          /^\s*PRINTFORMW\ 「虽然本来很讨厌这种肮脏的工作、因为『被命令要喜欢上这些肮脏的东西』嘛、就开开心心地服侍起来啦%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5167',
        any: [/^\s*ELSEIF\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5168',
        any: [
          /^\s*PRINTFORMW\ 「你们啊、排好队站整齐咯%UNICODE\(0x2661\)\ \*1%　这就好好服侍你们哦%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5170-5171',
        any: [/^\s*PRINTFORMW\ 「好的……会尽全力服侍的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5171',
        any: [/^\s*PRINTFORMW\ 「好的……会尽全力服侍的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5171-5172',
        any: [/^\s*PRINTFORMW\ 「好的……会尽全力服侍的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5173',
        any: [/^\s*ELSEIF\ FLAG:62\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5176',
        any: [/^\s*IF\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5177',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5179',
        any: [/^\s*ELSEIF\ TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5180',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5182',
        any: [/^\s*ELSEIF\ ABL:A:16\ >=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5183',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5185-5188',
        any: [/^\s*ELSEIF\ FLAG:62\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5186',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5187-5188',
        any: [/^\s*ELSEIF\ FLAG:62\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5188',
        any: [/^\s*ELSEIF\ FLAG:62\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5191',
        any: [/^\s*IF\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5192',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5194',
        any: [/^\s*ELSEIF\ TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5195',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5197',
        any: [/^\s*ELSEIF\ ABL:A:16\ >=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5198',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5200-5203',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5201',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5202-5203',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5203',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5206',
        any: [/^\s*IF\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5207',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5209',
        any: [/^\s*ELSEIF\ TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5210',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5212',
        any: [/^\s*ELSEIF\ ABL:A:16\ >=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5213',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5215-5218',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5216',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5217-5218',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5218',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5221',
        any: [/^\s*IF\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5222',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5224',
        any: [/^\s*ELSEIF\ TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5225',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5227',
        any: [/^\s*ELSEIF\ ABL:A:16\ >=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5228',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5230-5233',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5231',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5232-5233',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5233',
        any: [/^\s*ELSEIF\ \ FLAG:62\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5236',
        any: [/^\s*IF\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5237',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5239',
        any: [/^\s*ELSEIF\ TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5240',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5242',
        any: [/^\s*ELSEIF\ ABL:A:16\ >=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5243',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5245-5253',
        any: [/^\s*@DUNGEON_VICTORY_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5246',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5247-5253',
        any: [/^\s*@DUNGEON_VICTORY_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5248-5253',
        any: [/^\s*@DUNGEON_VICTORY_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5250-5253',
        any: [/^\s*@DUNGEON_VICTORY_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5253',
        any: [/^\s*@DUNGEON_VICTORY_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5258',
        any: [
          /^\s*PRINTFORMW\ 「呵呵……怎么样。%SELF_CALL\(TARGET\)%赢了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5260',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5263',
        any: [/^\s*PRINTFORMW\ 「……呵呵」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5265-5268',
        any: [
          /^\s*;反抗的・気丈・プライド高い・貞操観念・抵抗なら勝利宣言\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5266',
        any: [
          /^\s*ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5269',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5270',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%、很强的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5271',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5272',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%、会加油的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5272-5273',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%、会加油的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5274',
        any: [
          /^\s*PRINTFORMW\ 「哎呀哎呀、输给%SELF_CALL\(TARGET\)%也是没办法的不是吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5274-5275',
        any: [
          /^\s*PRINTFORMW\ 「哎呀哎呀、输给%SELF_CALL\(TARGET\)%也是没办法的不是吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5277',
        any: [/^\s*ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5280',
        any: [/^\s*PRINTFORMW\ 「真是危险的地方……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5280-5282',
        any: [/^\s*PRINTFORMW\ 「真是危险的地方……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5280-5283',
        any: [/^\s*PRINTFORMW\ 「真是危险的地方……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5286',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5287',
        any: [/^\s*PRINTFORMW\ 「这次的胜利、为了辉煌的明日……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5288',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5289',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、真可悲啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5289-5290',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、真可悲啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5291',
        any: [/^\s*PRINTFORMW\ 「好、又向前迈进了一步！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5291-5292',
        any: [/^\s*PRINTFORMW\ 「好、又向前迈进了一步！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5294-5296',
        any: [
          /^\s*IF\ \(BASE:A:0\ \*\ 100\ \/\ MAXBASE:A:0\ <\ 50\)\ \|\|\ \(BASE:A:1\ \*\ 100\ \/\ MAXBASE:A:1\ <\ 50\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5296',
        any: [
          /^\s*IF\ \(BASE:A:0\ \*\ 100\ \/\ MAXBASE:A:0\ <\ 50\)\ \|\|\ \(BASE:A:1\ \*\ 100\ \/\ MAXBASE:A:1\ <\ 50\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5298',
        any: [/^\s*PRINTFORMW\ （但是、还真是危险啊……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5298-5299',
        any: [/^\s*PRINTFORMW\ （但是、还真是危险啊……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5301',
        any: [/^\s*PRINTFORMW\ 「那么、前进咯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5301-5302',
        any: [/^\s*PRINTFORMW\ 「那么、前进咯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5301-5304',
        any: [/^\s*PRINTFORMW\ 「那么、前进咯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5307',
        any: [/^\s*@DUNGEON_ATTACK_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5312',
        any: [/^\s*IF\ CFLAG:1\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5314',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5317',
        any: [/^\s*PRINTFORMW\ 「……呵呵」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5319-5324',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、趁现在」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5320',
        any: [
          /^\s*ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5323',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5324',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、趁现在」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5325',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5326',
        any: [/^\s*PRINTFORMW\ 「东张西望、是不行的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5326-5327',
        any: [/^\s*PRINTFORMW\ 「东张西望、是不行的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5328',
        any: [/^\s*PRINTFORMW\ 「这种攻击怎么样？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5328-5329',
        any: [/^\s*PRINTFORMW\ 「这种攻击怎么样？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5331',
        any: [/^\s*ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5334',
        any: [/^\s*PRINTFORMW\ 「请、请去死吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5334-5336',
        any: [/^\s*PRINTFORMW\ 「请、请去死吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5334-5337',
        any: [/^\s*PRINTFORMW\ 「请、请去死吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5340',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5341',
        any: [/^\s*PRINTFORMW\ 「上咯！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5342',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5343',
        any: [/^\s*PRINTFORMW\ 「交给%SELF_CALL\(TARGET\)%吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5343-5344',
        any: [/^\s*PRINTFORMW\ 「交给%SELF_CALL\(TARGET\)%吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5345',
        any: [/^\s*PRINTFORMW\ 「那么、躲得开这招吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5345-5346',
        any: [/^\s*PRINTFORMW\ 「那么、躲得开这招吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5348-5350',
        any: [/^\s*;その他・迎撃中\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5349-5350',
        any: [/^\s*;その他・迎撃中\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5351',
        any: [/^\s*IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5354',
        any: [/^\s*PRINTFORMW\ 「……呵呵」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5356-5361',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、还是抵抗打算的？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5357',
        any: [
          /^\s*ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5360',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5361',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、还是抵抗打算的？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5362',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5363',
        any: [/^\s*PRINTFORMW\ 「呵呵……没用的哦？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5363-5364',
        any: [/^\s*PRINTFORMW\ 「呵呵……没用的哦？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5365',
        any: [/^\s*PRINTFORMW\ 「呵呵……真可愛♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5365-5366',
        any: [/^\s*PRINTFORMW\ 「呵呵……真可愛♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5368',
        any: [/^\s*ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5371',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是……很强的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5371-5373',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是……很强的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5371-5374',
        any: [/^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是……很强的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5377',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5378',
        any: [/^\s*PRINTFORMW\ 「呵呵……加油咯♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5379',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5380',
        any: [/^\s*PRINTFORMW\ 「好好看着哦……主人大人♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5380-5381',
        any: [/^\s*PRINTFORMW\ 「好好看着哦……主人大人♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5382',
        any: [/^\s*PRINTFORMW\ 「哎呀哎呀、怎么办呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5380-5383',
        any: [/^\s*PRINTFORMW\ 「好好看着哦……主人大人♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5380-5385',
        any: [/^\s*PRINTFORMW\ 「好好看着哦……主人大人♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5380-5386',
        any: [/^\s*PRINTFORMW\ 「好好看着哦……主人大人♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5390-5393',
        any: [/^\s*;@COLOSSEUM_KOJO関係（13をキャラ番号に置換）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5396',
        any: [/^\s*@COLOSSEUM_KOJO_13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5400',
        any: [/^\s*IF\ SELECTCOM\ ==\ 55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5402',
        any: [/^\s*IF\ BASE:1\ <=\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5403',
        any: [
          /^\s*PRINTFORMW\ 「在看什么……？　咕、你是想杀了%SELF_CALL\(TARGET\)%吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5403-5404',
        any: [
          /^\s*PRINTFORMW\ 「在看什么……？　咕、你是想杀了%SELF_CALL\(TARGET\)%吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5406',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5407',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5408',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5412',
        any: [/^\s*IF\ SELECTCOM\ ==\ 56\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5414',
        any: [/^\s*IF\ BASE:1\ <=\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5416',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5417',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5418',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5419',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5420',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5421',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5423',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5424',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5425',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5426',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5427',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5428',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5429',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5430',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5435',
        any: [/^\s*IF\ SELECTCOM\ ==\ 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5437',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5438',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5439',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5440',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5441',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5442',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5405-5443',
        any: [/^\s*PRINTFORMW\ 「你打算手下留情……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5447',
        any: [/^\s*IF\ SELECTCOM\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5449',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5450',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5451-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5452',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5453-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5454-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5455-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5459',
        any: [/^\s*IF\ SELECTCOM\ ==\ 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5461',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5462',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5464',
        any: [/^\s*ELSEIF\ TFLAG:400\ ==\ 206\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5465',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5466-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5467',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5468-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5469-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5470-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5475',
        any: [/^\s*IF\ SELECTCOM\ ==\ 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5477',
        any: [/^\s*IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5478',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5480',
        any: [/^\s*ELSEIF\ TFLAG:400\ ==\ 206\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5481',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5482-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5483',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5484-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5485-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5486-5489',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5491',
        any: [/^\s*IF\ SELECTCOM\ ==\ 51\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5492',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5489-5493',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5489-5494',
        any: [/^\s*;媚薬スライム（しあわせ草）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5497-5501',
        any: [/^\s*@NTR_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5501',
        any: [/^\s*@NTR_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5506',
        any: [/^\s*CFLAG:650\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5510',
        any: [/^\s*IF\ P\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5512',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5513',
        any: [
          /^\s*PRINTFORML\ 「%SELF_CALL\(TARGET\)%的身心、全都是魔王大人的东西」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5514',
        any: [/^\s*PRINTFORMW\ 「无论是什么卑劣的手段都是没有用的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5516',
        any: [
          /^\s*PRINTFORMW\ （魔王大人……救救%SELF_CALL\(TARGET\)%……老公……你在哪……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5517',
        any: [
          /^\s*PRINTFORML\ 被弄成牝犬一样的姿势的%SELF_CALL\(TARGET\)%说着毅然决然的话语拒绝服从、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5518',
        any: [
          /^\s*PRINTFORM\ 狂王毫不介意%SELF_CALL\(TARGET\)%的话、邪笑了起来、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5519',
        any: [/^\s*PRINT\ 将\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5521',
        any: [/^\s*IF\ FLAG:500\ ==\ 0\ \|\|\ FLAG:500\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5522',
        any: [/^\s*PRINT\ 胯下的巨根\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5523-5524',
        any: [/^\s*PRINT\ 极粗的假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5524',
        any: [/^\s*PRINT\ 极粗的假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5524-5525',
        any: [/^\s*PRINT\ 极粗的假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5526',
        any: [/^\s*PRINT\ 刺穿了\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5528',
        any: [/^\s*IF\ TALENT:157\ \&\&\ EXP:60\ >=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5529',
        any: [/^\s*PRINTW\ 由魔王再生的处女膜。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5529-5530',
        any: [/^\s*PRINTW\ 由魔王再生的处女膜。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5531',
        any: [/^\s*PRINTW\ 尚未经人事的小穴、蛮横地抽插着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5531-5532',
        any: [/^\s*PRINTW\ 尚未经人事的小穴、蛮横地抽插着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5533',
        any: [/^\s*IF\ TALENT:157\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5535',
        any: [/^\s*PRINTFORML\ 「啊啊啊…帮帮我……老公…魔王大人……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5537',
        any: [
          /^\s*PRINTFORML\ 「啊啊啊…帮帮我……老公、老公啊…帮帮我啊…魔王大人……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5537-5538',
        any: [
          /^\s*PRINTFORML\ 「啊啊啊…帮帮我……老公、老公啊…帮帮我啊…魔王大人……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5539',
        any: [
          /^\s*PRINTFORML\ 「请原谅%SELF_CALL\(TARGET\)%啊……魔王大人啊啊啊！！　嘤、停下啊、请放过%SELF_CALL\(TARGET\)%……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5539-5540',
        any: [
          /^\s*PRINTFORML\ 「请原谅%SELF_CALL\(TARGET\)%啊……魔王大人啊啊啊！！　嘤、停下啊、请放过%SELF_CALL\(TARGET\)%……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5541',
        any: [
          /^\s*PRINTFORMW\ 伴随着悲惨的哭喊声、苦苦求饶呼救的%SELF_CALL\(TARGET\)%、狂王一边嘲笑着一边侵犯着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5542',
        any: [
          /^\s*PRINTFORMW\ %SELF_CALL\(TARGET\)%几度晕厥又被强行弄醒、漫漫无尽的残酷的行为被记录在了水晶球中……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5542-5543',
        any: [
          /^\s*PRINTFORMW\ %SELF_CALL\(TARGET\)%几度晕厥又被强行弄醒、漫漫无尽的残酷的行为被记录在了水晶球中……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5544',
        any: [
          /^\s*PRINTFORML\ 「%SELF_CALL\(TARGET\)%是……被魔王威胁了才服从了的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5545',
        any: [/^\s*PRINTFORMW\ 「还请、求您发发慈悲……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5546',
        any: [
          /^\s*PRINTFORML\ %SELF_CALL\(TARGET\)%俯身在地上、向狂王乞求着饶恕。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5547',
        any: [
          /^\s*PRINT\ 狂王冷笑了一番、蹂躏了一番%SELF_CALL\(TARGET\)%的屁股、将\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5549',
        any: [/^\s*IF\ FLAG:500\ ==\ 0\ \|\|\ FLAG:500\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5550',
        any: [/^\s*PRINT\ 胯下的巨根\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5551-5552',
        any: [/^\s*PRINT\ 取出的极粗假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5552',
        any: [/^\s*PRINT\ 取出的极粗假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5552-5553',
        any: [/^\s*PRINT\ 取出的极粗假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5554',
        any: [/^\s*PRINTL\ 一口气刺穿了\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5556',
        any: [/^\s*IF\ TALENT:157\ \&\&\ EXP:60\ >=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5557',
        any: [/^\s*PRINT\ 由魔王再生的处女膜、\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5557-5558',
        any: [/^\s*PRINT\ 由魔王再生的处女膜、\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5559',
        any: [/^\s*PRINT\ 尚未经人事的小穴、蛮横地抽插着、\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5559-5560',
        any: [/^\s*PRINT\ 尚未经人事的小穴、蛮横地抽插着、\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5561',
        any: [/^\s*PRINTL\ 纯洁的赤印将地板染红了。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5563',
        any: [/^\s*PRINT\ （老公……抱歉……最终还是……）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5564',
        any: [
          /^\s*PRINTFORM\ 不仅无视了伴随着呜咽声求饶的%SELF_CALL\(TARGET\)%、狂王还愉快地将\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5565',
        any: [/^\s*IF\ FLAG:500\ ==\ 0\ \|\|\ FLAG:500\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5566',
        any: [/^\s*PRINT\ 腰\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5566-5567',
        any: [/^\s*PRINT\ 腰\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5568',
        any: [/^\s*PRINT\ 极粗假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5568-5569',
        any: [/^\s*PRINT\ 极粗假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5570',
        any: [
          /^\s*PRINTFORMW\ 与%SAVESTR:A%亲密接触的模样记录在了水晶球中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5570-5571',
        any: [
          /^\s*PRINTFORMW\ 与%SAVESTR:A%亲密接触的模样记录在了水晶球中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5572',
        any: [/^\s*CFLAG:651\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5574',
        any: [/^\s*ELSEIF\ P\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5575',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5576',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5577-5580',
        any: [/^\s*CFLAG:652\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5578',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5579-5580',
        any: [/^\s*CFLAG:652\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5580',
        any: [/^\s*CFLAG:652\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5582',
        any: [/^\s*ELSEIF\ P\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5583',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5584',
        any: [
          /^\s*PRINTFORML\ 「唔呵呵%UNICODE\(0x2661\)\ \*1%　有在看着吗、魔王大人」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5585',
        any: [
          /^\s*PRINTFORMW\ 「好好看着%SELF_CALL\(TARGET\)%和汪酱交尾的地方哦%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5585-5586',
        any: [
          /^\s*PRINTFORMW\ 「好好看着%SELF_CALL\(TARGET\)%和汪酱交尾的地方哦%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5587',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5588-5589',
        any: [/^\s*CFLAG:653\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5589',
        any: [/^\s*CFLAG:653\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5591',
        any: [/^\s*ELSEIF\ P\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5592',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5593',
        any: [/^\s*PRINTFORM\ 「昂%UNICODE\(0x2661\)\ \*1%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5595',
        any: [/^\s*PRINT\ 比那个人、\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5596',
        any: [/^\s*PRINTFORML\ 比魔王大人%UNICODE\(0x2661\)\ \*3%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5597',
        any: [
          /^\s*PRINTFORMW\ 「还要粗、还要硬……啊啊啊%UNICODE\(0x2661\)\ \*1%　好棒啊%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5597-5598',
        any: [
          /^\s*PRINTFORMW\ 「还要粗、还要硬……啊啊啊%UNICODE\(0x2661\)\ \*1%　好棒啊%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5599',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5600-5601',
        any: [/^\s*CFLAG:654\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5601',
        any: [/^\s*CFLAG:654\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5603',
        any: [/^\s*ELSEIF\ P\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5604',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5605',
        any: [
          /^\s*PRINTFORML\ 「昂%UNICODE\(0x2661\)\ \*1%　把%SELF_CALL\(TARGET\)%搞得乱七八糟吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5606',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%可是您忠实的仆人啊%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5606-5607',
        any: [
          /^\s*PRINTFORMW\ 「%SELF_CALL\(TARGET\)%可是您忠实的仆人啊%UNICODE\(0x2661\)\ \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5608',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5609-5610',
        any: [/^\s*CFLAG:655\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5610',
        any: [/^\s*CFLAG:655\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5612',
        any: [/^\s*ELSEIF\ P\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5613',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5614',
        any: [/^\s*PRINTFORML\ 「%SELF_CALL\(TARGET\)%是您忠实的仆人」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5615',
        any: [
          /^\s*PRINTFORMW\ 「还请…还请好好调教这个淫乱的变态抖M吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5615-5616',
        any: [
          /^\s*PRINTFORMW\ 「还请…还请好好调教这个淫乱的变态抖M吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5617',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5618-5619',
        any: [/^\s*CFLAG:656\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5619',
        any: [/^\s*CFLAG:656\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5621',
        any: [/^\s*ELSEIF\ P\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5622',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5623',
        any: [/^\s*PRINTFORMW\ 「在被看着啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5623-5624',
        any: [/^\s*PRINTFORMW\ 「在被看着啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5625',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5626-5627',
        any: [/^\s*CFLAG:657\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5627',
        any: [/^\s*CFLAG:657\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5629',
        any: [/^\s*ELSEIF\ P\ ==\ 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5630',
        any: [/^\s*IF\ TALENT:76\ \|\|\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5631',
        any: [/^\s*PRINTFORMW\ 「生、生出来了啊呜嗷嗷呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5631-5632',
        any: [/^\s*PRINTFORMW\ 「生、生出来了啊呜嗷嗷呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5633',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5634-5636',
        any: [/^\s*ELSEIF\ CFLAG:1\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5636',
        any: [/^\s*ELSEIF\ CFLAG:1\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5637',
        any: [
          /^\s*PRINTFORML\ 「唔呵呵%UNICODE\(0x2661\)\ \*1%　魔王的首级、就让我去取来吧%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5638',
        any: [
          /^\s*PRINTFORMW\ 「回来了之后可要好好疼爱我啊。主人大人%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5638-5639',
        any: [
          /^\s*PRINTFORMW\ 「回来了之后可要好好疼爱我啊。主人大人%UNICODE\(0x2661\)\ \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5641',
        any: [/^\s*RESETCOLOR\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5641-5643',
        any: [/^\s*RESETCOLOR\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5646',
        any: [/^\s*@EXUCUTION_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5650',
        any: [/^\s*IF\ TFLAG:16\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5651',
        any: [/^\s*PRINTFORMW\ 「噫、有谁……可以救救我」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5653',
        any: [/^\s*ELSEIF\ TFLAG:16\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5654',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5656',
        any: [/^\s*ELSEIF\ TFLAG:16\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5657',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5659',
        any: [/^\s*ELSEIF\ TFLAG:16\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5660',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5659-5661',
        any: [/^\s*ELSEIF\ TFLAG:16\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5664',
        any: [/^\s*@MUSEUM_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5668',
        any: [/^\s*IF\ TFLAG:500\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5669',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5671',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5672',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5674',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5675',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5677',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5678',
        any: [
          /^\s*PRINTFORMW\ 「啊啦啊啦、%SELF_CALL\(TARGET\)%的这副样子被看到的话…真是很困扰呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5680',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5681',
        any: [
          /^\s*PRINTFORMW\ 「要把%SELF_CALL\(TARGET\)%变成人偶？…为什么要做、这样……的………事…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5683',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5684',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5686',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5687',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5689',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5690',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5692',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5693',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5695',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5696',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5695-5697',
        any: [/^\s*ELSEIF\ TFLAG:500\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5700',
        any: [/^\s*@BANISHMENT_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5704',
        any: [/^\s*IF\ TFLAG:510\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5705',
        any: [/^\s*PRINTFORMW\ 「再见。应该是再也不见吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5707',
        any: [/^\s*ELSEIF\ TFLAG:510\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5708',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5710',
        any: [/^\s*ELSEIF\ TFLAG:510\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5711',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5713',
        any: [/^\s*ELSEIF\ TFLAG:510\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5714',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5716',
        any: [/^\s*ELSEIF\ TFLAG:510\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5717',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5716-5718',
        any: [/^\s*ELSEIF\ TFLAG:510\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5721',
        any: [/^\s*@PUBLIC_EXUCUTION_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5725',
        any: [/^\s*IF\ TFLAG:520\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5726',
        any: [/^\s*PRINTFORMW\ 「你、还是杀了%SELF_CALL\(TARGET\)%吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5728',
        any: [/^\s*ELSEIF\ TFLAG:520\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5729',
        any: [
          /^\s*PRINTFORMW\ 「不要……%SELF_CALL\(TARGET\)%不想死……呜呜呜…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5731',
        any: [/^\s*ELSEIF\ TFLAG:520\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5732',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5731-5733',
        any: [/^\s*ELSEIF\ TFLAG:520\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5736',
        any: [/^\s*@GROTESQUE_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5740',
        any: [/^\s*IF\ TFLAG:530\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5741',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5743',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5744',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5746',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5747',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5749',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5750',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5752',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5753',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5755',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5756',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5758',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5759',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5758-5760',
        any: [/^\s*ELSEIF\ TFLAG:530\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5763',
        any: [/^\s*@ENTERENEMY_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5766',
        any: [/^\s*IF\ TALENT:A:21\ ==\ 1\ \|\|\ TALENT:A:22\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5768',
        any: [/^\s*PRINTFORMW\ 「……要上咯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5769',
        any: [
          /^\s*ELSEIF\ TALENT:A:11\ ==\ 1\ \|\|\ TALENT:A:12\ ==\ 1\ \|\|\ TALENT:A:15\ ==\ 1\ \|\|\ TALENT:A:30\ ==\ 1\ \|\|\ TALENT:A:34\ ==\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5771',
        any: [/^\s*PRINTFORMW\ 「呵呵、坏孩子可是要被教训的呦？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5772',
        any: [/^\s*ELSEIF\ TALENT:A:10\ ==\ 1\ \|\|\ TALENT:A:26\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5774',
        any: [
          /^\s*PRINTFORMW\ 「就算是%SELF_CALL\(A\)%……也能战斗的吗……？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5774-5775',
        any: [
          /^\s*PRINTFORMW\ 「就算是%SELF_CALL\(A\)%……也能战斗的吗……？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5777',
        any: [/^\s*PRINTFORMW\ 「呵呵、%SELF_CALL\(A\)%、会努力的♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5777-5778',
        any: [/^\s*PRINTFORMW\ 「呵呵、%SELF_CALL\(A\)%、会努力的♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5781',
        any: [/^\s*@GOHOUBI_REQUEST_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5784',
        any: [/^\s*IF\ CFLAG:A:504\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5786',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励金钱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5787',
        any: [
          /^\s*PRINTFORMW\ 「等%SELF_CALL\(TARGET\)%存够了钱、我们一起出去旅游吧♪　呵呵」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5788',
        any: [
          /^\s*ELSEIF\ CFLAG:A:504\ ==\ 1\ \|\|\ CFLAG:A:504\ ==\ 2\ \|\|\ CFLAG:A:504\ ==\ 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5790',
        any: [/^\s*PRINTFORM\ %SAVESTR:A%要求奖励与\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5791',
        any: [/^\s*IF\ CFLAG:A:504\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5792',
        any: [/^\s*PRINT\ 犬\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5793',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5794',
        any: [/^\s*PRINT\ 豚\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5795',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5796',
        any: [/^\s*PRINT\ 马\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5796-5797',
        any: [/^\s*PRINT\ 马\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5798',
        any: [/^\s*PRINTFORMW\ 交尾\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5799',
        any: [/^\s*PRINTFORMW\ 「呵呵、野兽的鸡巴\ 真是期待啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5800',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5802',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励接吻\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5803',
        any: [
          /^\s*PRINTFORMW\ 「到时候吻%SELF_CALL\(TARGET\)%吧、让我们的口水不分彼此♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5804',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5806',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励做爱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5807',
        any: [
          /^\s*PRINTFORMW\ 「奖励的话、比平时更激烈侵犯%SELF_CALL\(TARGET\)%就好了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5808',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5810',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励精液\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5811',
        any: [
          /^\s*PRINTFORMW\ 「不许打飞机了！请把精液先存在你那边、等我回来全部都是%SELF_CALL\(TARGET\)%的♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5812',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5814',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励乱交派对\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5815',
        any: [
          /^\s*PRINTFORMW\ 「等%SELF_CALL\(TARGET\)%得胜回来、我们开全裸派对吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5816',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5818',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励尿液\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5819',
        any: [/^\s*PRINTFORMW\ 「只要您的尿液就够了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5820',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5822',
        any: [/^\s*PRINTFORMW\ %SAVESTR:A%要求奖励童贞狩猎\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5823',
        any: [
          /^\s*PRINTFORMW\ 「好孩子是要需要奖励的、就奖励%SELF_CALL\(A\)%一个乖孩子吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5823-5824',
        any: [
          /^\s*PRINTFORMW\ 「好孩子是要需要奖励的、就奖励%SELF_CALL\(A\)%一个乖孩子吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5827',
        any: [/^\s*@GOHOUBI_AFTER_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5833',
        any: [/^\s*IF\ TFLAG:18\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5834',
        any: [/^\s*PRINTFORMW\ 「这样啊……真失望」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5834-5835',
        any: [/^\s*PRINTFORMW\ 「这样啊……真失望」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5837',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5838',
        any: [
          /^\s*PRINTFORMW\ 「呵呵、这是很重要的东西%SELF_CALL\(TARGET\)%会好好保存的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5838-5839',
        any: [
          /^\s*PRINTFORMW\ 「呵呵、这是很重要的东西%SELF_CALL\(TARGET\)%会好好保存的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5840',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5842',
        any: [/^\s*IF\ CFLAG:A:504\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5843',
        any: [/^\s*PRINTFORMW\ 「哇、这么多……谢谢！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5845',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5847',
        any: [/^\s*IF\ TALENT:A:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5848',
        any: [/^\s*PRINTFORMW\ 「啊啊啊……和狗交配做爱什么的最棒了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5848-5849',
        any: [/^\s*PRINTFORMW\ 「啊啊啊……和狗交配做爱什么的最棒了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5850',
        any: [/^\s*PRINTFORMW\ 「啊啊啊……和狗做爱最棒了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5850-5851',
        any: [/^\s*PRINTFORMW\ 「啊啊啊……和狗做爱最棒了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5853',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5855',
        any: [/^\s*IF\ TALENT:A:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5856',
        any: [/^\s*PRINTFORMW\ 「噗嘻……噗嘻！和猪交配……真棒！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5856-5857',
        any: [/^\s*PRINTFORMW\ 「噗嘻……噗嘻！和猪交配……真棒！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5858',
        any: [
          /^\s*PRINTFORMW\ 「噗嘻……噗嘻！和猪交配什么的……还是新鲜的体验呢！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5858-5859',
        any: [
          /^\s*PRINTFORMW\ 「噗嘻……噗嘻！和猪交配什么的……还是新鲜的体验呢！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5861',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5863',
        any: [/^\s*IF\ TALENT:A:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5864',
        any: [
          /^\s*PRINTFORMW\ 「好大好长……%SELF_CALL\(TARGET\)%快要爽的飞起来了了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5864-5865',
        any: [
          /^\s*PRINTFORMW\ 「好大好长……%SELF_CALL\(TARGET\)%快要爽的飞起来了了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5866',
        any: [/^\s*PRINTFORMW\ 「好大啊啊啊……和马做爱最棒了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5866-5867',
        any: [/^\s*PRINTFORMW\ 「好大啊啊啊……和马做爱最棒了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5869',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5870',
        any: [
          /^\s*PRINTFORMW\ 「你答应好%SELF_CALL\(TARGET\)%的……请给%SELF_CALL\(TARGET\)%一个甜蜜的吻」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5872',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5874',
        any: [/^\s*IF\ ABL:A:2\ >\ ABL:A:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5875',
        any: [/^\s*PRINTFORMW\ 「那个……果然还是和魔王大人做爱最舒服了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5876-5877',
        any: [/^\s*;アナルとペニス\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5878',
        any: [/^\s*PRINTFORMW\ 「那个……果然还是和魔王大人做爱最舒服了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5876-5879',
        any: [/^\s*;アナルとペニス\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5881',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5882',
        any: [
          /^\s*PRINTFORMW\ 「呵呵、主人、%SELF_CALL\(TARGET\)%提前约好的精液可以给我了呦……啾……唔咕……呜呼……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5884',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5886',
        any: [/^\s*IF\ TALENT:A:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5887',
        any: [/^\s*PRINTFORMW\ 「真是的还不够呢、再来点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5887-5888',
        any: [/^\s*PRINTFORMW\ 「真是的还不够呢、再来点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5889',
        any: [/^\s*PRINTFORMW\ 「啊啊、再来、把你们的精华都给我吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5889-5890',
        any: [/^\s*PRINTFORMW\ 「啊啊、再来、把你们的精华都给我吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5892',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5893',
        any: [
          /^\s*PRINTFORMW\ 「没错就是这边、请对准%SELF_CALL\(TARGET\)%的嘴……就直接把%SELF_CALL\(TARGET\)%当成便器吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5895',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5897',
        any: [/^\s*IF\ ABL:A:2\ >\ ABL:A:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5898',
        any: [
          /^\s*PRINTFORMW\ 「第一次上了的小穴……你可要记住%SELF_CALL\(TARGET\)%呦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5900-5901',
        any: [
          /^\s*PRINTFORMW\ 「真是对不起、这么淫荡的肛门……感觉还可以吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5901',
        any: [
          /^\s*PRINTFORMW\ 「真是对不起、这么淫荡的肛门……感觉还可以吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5901-5902',
        any: [
          /^\s*PRINTFORMW\ 「真是对不起、这么淫荡的肛门……感觉还可以吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5901-5903',
        any: [
          /^\s*PRINTFORMW\ 「真是对不起、这么淫荡的肛门……感觉还可以吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5901-5904',
        any: [
          /^\s*PRINTFORMW\ 「真是对不起、这么淫荡的肛门……感觉还可以吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5905-5907',
        any: [/^\s*@OSIOKI_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5907',
        any: [/^\s*@OSIOKI_KOUJO_K13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5913',
        any: [/^\s*IF\ TFLAG:18\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5914',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5916',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5918',
        any: [/^\s*IF\ ABL:A:21\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5919',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5920-5925',
        any: [/^\s*;露出癖Lv4以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5921',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5922-5925',
        any: [/^\s*;露出癖Lv4以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5924',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5926',
        any: [/^\s*IF\ ABL:A:17\ >=\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5927',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5926-5928',
        any: [/^\s*IF\ ABL:A:17\ >=\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5929',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5930-5932',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5932',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5934',
        any: [/^\s*IF\ ABL:A:17\ >=\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5935',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5934-5936',
        any: [/^\s*IF\ ABL:A:17\ >=\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5937',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5938-5940',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5940',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5942',
        any: [/^\s*IF\ ABL:A:21\ >=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5943',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5940-5944',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5945',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5946-5948',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5948',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5950',
        any: [/^\s*IF\ TALENT:A:88\ ==\ 1\ \|\|\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5951',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5950-5952',
        any: [/^\s*IF\ TALENT:A:88\ ==\ 1\ \|\|\ TALENT:A:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5953',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5954-5956',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5956',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5957',
        any: [/^\s*PRINT\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5959',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5960',
        any: [/^\s*PRINT\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5962',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5963',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5965',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5966',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5965-5967',
        any: [/^\s*ELSEIF\ TFLAG:18\ ==\ 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5970',
        any: [/^\s*@GOBI_KOUJO_K13,\ ARG:0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5973',
        any: [/^\s*IF\ ARG:0\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5975',
        any: [/^\s*PRINTFORM\ 嗯♪\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5976',
        any: [/^\s*ELSEIF\ ARG:0\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5978',
        any: [/^\s*PRINTFORM\ 哦！\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5979',
        any: [/^\s*ELSEIF\ ARG:0\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5981',
        any: [/^\s*PRINTFORM\ 是的……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5982',
        any: [/^\s*ELSEIF\ ARG:0\ ==\ 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5984',
        any: [/^\s*PRINTFORM\ ……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5985',
        any: [/^\s*ELSEIF\ ARG:0\ ==\ 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5987',
        any: [/^\s*PRINTFORM\ 就是这样……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5987-5988',
        any: [/^\s*PRINTFORM\ 就是这样……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5991',
        any: [/^\s*IF\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5992',
        any: [/^\s*PRINTFORM\ 嗯。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5993',
        any: [/^\s*ELSEIF\ RAND:2\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5994',
        any: [/^\s*PRINTFORM\ 呢。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5994-5995',
        any: [/^\s*PRINTFORM\ 呢。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5996',
        any: [/^\s*PRINTFORM\ 呀。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5996-5997',
        any: [/^\s*PRINTFORM\ 呀。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K13_庇護者.ERB',
        ref: '5996-5998',
        any: [/^\s*PRINTFORM\ 呀。\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
