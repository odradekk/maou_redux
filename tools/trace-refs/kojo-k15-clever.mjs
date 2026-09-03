// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #246 按 js 文件拆出：kojo-k15-clever.mjs
//
// 锚由 target/ERB/口上/EVENT_K15_伶俐.ERB 对应行内容生成，整行锚定
// （^…$ + m 标志）。区间内合并非空白行（最多 8 行）以提升区分度。
// 空 PRINTFORM 整行锚按 #235/#298 放行。

export const FILES = [
  {
    js: 'ere/kojo/kojo-k15-clever.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '29-33',
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*#PRI\s*$\s*^\s*FLAG:115 = 1\s*$\s*^\s*SIF FLAG:7 == 0\s*$\s*^\s*FLAG:7 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '31',
        any: [/^\s*FLAG:115 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '33',
        any: [/^\s*FLAG:7 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '35-37',
        any: [/^\s*@EVENTEND\s*$\s*^\s*#LATER\s*$\s*^\s*FLAG:115 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '37',
        any: [/^\s*FLAG:115 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '43-47',
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '43-239',
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;初調教時 CFLAG:201\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '52',
        any: [/^\s*IF CFLAG:201 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '52-53',
        any: [/^\s*IF CFLAG:201 == 0\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '54',
        any: [
          /^\s*IF !\(TALENT:314 == 9 \|\| TALENT:319 == 9 \|\| TALENT:319 == 8 \)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '55',
        any: [
          /^\s*PRINTFORMW 才刚走进牢房里，一枚带着光明气息的暗器就这样朝你的眼眸激射而来！！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '56',
        any: [/^\s*PRINTFORMW （请按数字键 \+ Enter 选择行动！）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '57',
        any: [/^\s*SETCOLOR 152,250,105\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '57-58',
        any: [/^\s*SETCOLOR 152,250,105\s*$\s*^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '59',
        any: [/^\s*PRINTL 『1』不闪不避 \( 按 1 \+ Enter \)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '60-61',
        any: [
          /^\s*PRINTL\s*$\s*^\s*PRINTL 『2』偏头闪躲 \( 按 2 \+ Enter \)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '61',
        any: [/^\s*PRINTL 『2』偏头闪躲 \( 按 2 \+ Enter \)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '62-63',
        any: [/^\s*PRINTL\s*$\s*^\s*RESETCOLOR\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '63',
        any: [/^\s*RESETCOLOR\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '64',
        any: [/^\s*TINPUT 1000, 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '65',
        any: [/^\s*IF RESULT == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '66',
        any: [
          /^\s*PRINTFORMW 你稍微一偏头，就让那枚费尽%SAVESTR:TARGET%苦心筹谋的暗器打空了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '67',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎有点惊讶你的反应如此敏锐的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '68',
        any: [/^\s*PRINTFORMW 恭顺点数 \+ 50\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '69',
        any: [/^\s*JUEL:4 \+= 50\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '70',
        any: [/^\s*ELSEIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '71',
        any: [
          /^\s*PRINTFORMW 你不闪不避，那枚费尽%SAVESTR:TARGET%苦心筹谋的暗器打在你的眼皮上，造成了輕微的擦傷……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '71-72',
        any: [
          /^\s*PRINTFORMW 你不闪不避，那枚费尽%SAVESTR:TARGET%苦心筹谋的暗器打在你的眼皮上，造成了輕微的擦傷……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '73',
        any: [
          /^\s*PRINTFORMW 好奇地将掉落在地的暗器捡起，发觉那不过是一枚尖端稍微被打磨过的小石片。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '74',
        any: [
          /^\s*PRINTFORMW 再观察一下牢房，在栅栏四周的阴影处，有老旧的捆绳与橡皮绳构成的简易弓弦似的陷阱……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '75',
        any: [
          /^\s*PRINTFORMW 哼，还颇有意思的，但是，这种小伎俩怎可能对魔王造成巨大的伤害呢？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '76',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '77',
        any: [
          /^\s*PRINTFORMW 「你，难道是魔王吗？所以暗器……才会无法造成伤害。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '78',
        any: [
          /^\s*PRINTFORMW 本来只是对小喽喽用的陷阱，无奈直接遇上了魔王过来，这也是能算是运气不好吧？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '79',
        any: [
          /^\s*PRINTFORMW 所以看到陷阱失败，牢裡的%SAVESTR:TARGET%不由自主地叹了口气，似乎有点失望的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '79-80',
        any: [
          /^\s*PRINTFORMW 所以看到陷阱失败，牢裡的%SAVESTR:TARGET%不由自主地叹了口气，似乎有点失望的样子。\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '81-82',
        any: [
          /^\s*PRINTFORML\s*$\s*^\s*PRINTFORMW 「别以为只要囚禁%SELF_CALL\(TARGET\)%，就能让%SELF_CALL\(TARGET\)%屈服。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '82',
        any: [
          /^\s*PRINTFORMW 「别以为只要囚禁%SELF_CALL\(TARGET\)%，就能让%SELF_CALL\(TARGET\)%屈服。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '83',
        any: [
          /^\s*PRINTFORMW 「被抓之後会有怎样的遭遇%SELF_CALL\(TARGET\)%早有耳闻。只不过让人失望的是，明明身为魔王却用这种下流卑劣的手段。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '84',
        any: [
          /^\s*PRINTFORMW 「调教？哼…真是低级。该怎么评价好呢？真是………忧患魔界的未来啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '85',
        any: [/^\s*IF !\(TALENT:10 \|\| TALENT:17\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '86',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抬头露出不屑的表情，用嘲讽的眼神看着你。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '86-87',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抬头露出不屑的表情，用嘲讽的眼神看着你。\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '88',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%紧握着拳头，试着让自己保持镇定。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '88-89',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%紧握着拳头，试着让自己保持镇定。\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '90',
        any: [
          /^\s*PRINTFORMW 明明成为了阶下囚，%SAVESTR:TARGET%却是不急不缓并义正严词地说着挑衅的话语……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '91',
        any: [/^\s*CFLAG:201 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '91-92',
        any: [/^\s*CFLAG:201 = 1\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '96',
        any: [/^\s*ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '97',
        any: [/^\s*IF TALENT:85 \|\| TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '97-98',
        any: [/^\s*IF TALENT:85 \|\| TALENT:76\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '99',
        any: [
          /^\s*PRINTFORMW 「真是非常抱歉…因为%SELF_CALL\(TARGET\)%的身体…就是被调教到如此淫乱…所以…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '99-102',
        any: [
          /^\s*PRINTFORMW 「真是非常抱歉…因为%SELF_CALL\(TARGET\)%的身体…就是被调教到如此淫乱…所以…」\s*$\s*^\s*PRINTFORMW %SELF_CALL\(TARGET\)%自嘲地笑著，露出了無奈的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '100',
        any: [
          /^\s*PRINTFORMW %SELF_CALL\(TARGET\)%自嘲地笑著，露出了無奈的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '103-105',
        any: [
          /^\s*ELSE\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '104-105',
        any: [
          /^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '105',
        any: [/^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '105-108',
        any: [
          /^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$\s*^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '105-110',
        any: [
          /^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$\s*^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '106',
        any: [
          /^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '106-109',
        any: [
          /^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '115',
        any: [/^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '115-116',
        any: [
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '117',
        any: [
          /^\s*PRINTFORMW 「看來，只会用这些小手段来折磨%SELF_CALL\(TARGET\)%的身体，这就是魔王大人的本事啊？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '118',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一幅漫不经心的样子，脸上带着不以为然的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '119',
        any: [/^\s*CFLAG:201 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '119-120',
        any: [/^\s*CFLAG:201 = 2\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '123',
        any: [/^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '123-124',
        any: [
          /^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '125',
        any: [
          /^\s*PRINTFORMW 「这些反应只是因为习惯而已！别天真地以为这样就能让%SELF_CALL\(TARGET\)%屈服了啊…！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '126',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%紧握着拳头，微微颤抖的声音似乎泄漏了他真正的心情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '127',
        any: [/^\s*CFLAG:201 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '127-128',
        any: [/^\s*CFLAG:201 = 3\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '131',
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '131-132',
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '133',
        any: [
          /^\s*PRINTFORMW 「难道%SELF_CALL\(TARGET\)%是…不…不会的，怎么可能…！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '134',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%喃喃地自言自语，露出了无法置信的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '135',
        any: [/^\s*CFLAG:201 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '135-136',
        any: [/^\s*CFLAG:201 = 4\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '139',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '139-140',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '141',
        any: [
          /^\s*PRINTFORMW 「直到遇见了魔王大人，%SELF_CALL\(TARGET\)%才真正体会到什么叫做『欢愉』……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '142',
        any: [
          /^\s*PRINTFORMW 「以前的事情回想起来，发觉%SELF_CALL\(TARGET\)%真是太愚昧了，早点坦然地接受您的调教就好了，真是浪费了美好的时光……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '143',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对你露出了媚笑，正伸出手暧昧地抚摸你的下身……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '144',
        any: [/^\s*CFLAG:201 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '144-145',
        any: [/^\s*CFLAG:201 = 5\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '148',
        any: [/^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '148-149',
        any: [
          /^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '150',
        any: [/^\s*PRINTFORMW 「您来了啊？敬爱的魔王大人。」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '151',
        any: [/^\s*IF TALENT:TARGET:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '152',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如被和煦的春风吹拂，露出了温柔的微笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '152-153',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如被和煦的春风吹拂，露出了温柔的微笑。\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '154',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如花朵盛开般地展颜，露出了美丽无暇的微笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '154-155',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如花朵盛开般地展颜，露出了美丽无暇的微笑。\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '156',
        any: [
          /^\s*PRINTFORMW 「那个，如果可以的话，有些事情想要跟您说……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '157',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不自然地清了一下喉咙，似乎有点羞涩，不敢直视你的眼神。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '158',
        any: [
          /^\s*PRINTFORMW 「以前被『正义』所奴役，只会说着尖酸刻薄的话，那个愚昧的%SELF_CALL\(TARGET\)%……求求您忘记吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '159',
        any: [
          /^\s*PRINTFORMW 「现在想起来，简直……如此愚蠢的样子居然还不知耻地在您的面前放肆……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '160',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%想起了黑历史，似乎羞愧得无法自拔……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '161',
        any: [
          /^\s*PRINTFORMW 稍微冷静一会儿之後，%SAVESTR:TARGET%带着专注且期盼的眼神缓缓地说着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '162',
        any: [
          /^\s*PRINTFORMW 「遇见您让%SELF_CALL\(TARGET\)%感觉像是重生了一样，也唯独只有您让%SELF_CALL\(TARGET\)%有这样的感受。如果可以的话…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '163',
        any: [
          /^\s*PRINTFORMW 「能让卑微的%SELF_CALL\(TARGET\)%留在您的身边，替您分忧解劳吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '164',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的身心都是完全属於您的，请您尽情地使用。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '165',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%谦卑地跪在你的面前，虔诚地亲吻着你的手背……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '166',
        any: [/^\s*CFLAG:201 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '166-167',
        any: [/^\s*CFLAG:201 = 6\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '169',
        any: [/^\s*ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '169-170',
        any: [
          /^\s*ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '171',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%正面对着墙壁自言自语。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '172',
        any: [
          /^\s*PRINTFORMW 一会儿微笑一会儿又怒吼着，甚至还会以头撞墙………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '173',
        any: [/^\s*PRINTFORMW 看来，%SAVESTR:TARGET%果然是被玩坏了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '174',
        any: [/^\s*CFLAG:201 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '174-175',
        any: [/^\s*CFLAG:201 = 9\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '177',
        any: [/^\s*ELSEIF ASSI < 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '177-178',
        any: [/^\s*ELSEIF ASSI < 0\s*$\s*^\s*CALL K15_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '236-237',
        any: [
          /^\s*;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '237-238',
        any: [/^\s*ELSE\s*$\s*^\s*CALL K15_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '237-239',
        any: [/^\s*ELSE\s*$\s*^\s*CALL K15_KOJO2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '245-310',
        any: [
          /^\s*@K15_KOJO2\s*$\s*^\s*;反発刻印Lv3\s*$\s*^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「魔界的脸皮是不值钱的吧？因為連身為領導的魔王都只会用这些下三濫的技俩啊？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%毫不留情地冷嘲热讽着………\s*$\s*^\s*RETURN 1\s*$\s*^\s*;屈服刻印Lv0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '247',
        any: [/^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '247-248',
        any: [/^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '249',
        any: [
          /^\s*PRINTFORMW 「魔界的脸皮是不值钱的吧？因為連身為領導的魔王都只会用这些下三濫的技俩啊？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '250',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%毫不留情地冷嘲热讽着………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '250-251',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%毫不留情地冷嘲热讽着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '254',
        any: [/^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '254-255',
        any: [/^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '256-259',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「可以劳驾尊贵的魔王大人优雅且安静地滚开吗？」\s*$\s*^\s*DATAFORM 「也许，换一只猴子来代替您来调教，效果会更好呢？」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '260',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%嗤之以鼻地说着………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '260-261',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%嗤之以鼻地说着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '264',
        any: [/^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '264-265',
        any: [/^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '266',
        any: [
          /^\s*PRINTFORMW 「哦？魔王都是这么闲的吗？只做这些无用的事情？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '267',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈地摆摆手，用怀疑的语气说着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '267-268',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈地摆摆手，用怀疑的语气说着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '271',
        any: [/^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '271-272',
        any: [/^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '273',
        any: [
          /^\s*PRINTFORMW 「只是习惯而已，难道还真以为那些手段会有用吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '274',
        any: [
          /^\s*PRINTFORMW 像是想要说服自己那样，%SAVESTR:TARGET%紧握着拳头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '274-275',
        any: [
          /^\s*PRINTFORMW 像是想要说服自己那样，%SAVESTR:TARGET%紧握着拳头………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '278',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '278-279',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '280',
        any: [
          /^\s*PRINTFORMW 「反正不管说什么也没有用，%SELF_CALL\(TARGET\)%也就不想要白费力气了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '281',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了那样，转过了头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '281-282',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了那样，转过了头………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '285',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '285-286',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '288-291',
        any: [
          /^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「今天要玩些什么呢？不瞒您说，%SELF_CALL\(TARGET\)%这淫乱的身体早已经等不及了……」\s*$\s*^\s*PRINTFORMW 「这个姿势可以看清楚吗？您看，这里变得这么的湿，这么热……」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '289',
        any: [
          /^\s*PRINTFORMW 「今天要玩些什么呢？不瞒您说，%SELF_CALL\(TARGET\)%这淫乱的身体早已经等不及了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '290',
        any: [
          /^\s*PRINTFORMW 「这个姿势可以看清楚吗？您看，这里变得这么的湿，这么热……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '291',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '291-292',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '293',
        any: [
          /^\s*PRINTFORMW 「最近新学到一些……嗯，算是新的知识吧？可以的话，魔王大人愿意陪%SELF_CALL\(TARGET\)%来『实验』一下吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '294',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '294-295',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '294-296',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '299',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '299-300',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '302-303',
        any: [
          /^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '303',
        any: [
          /^\s*PRINTFORMW 「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '303-304',
        any: [
          /^\s*PRINTFORMW 「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '305',
        any: [
          /^\s*PRINTFORMW 「一见到您，不知为何就幸福地想露出微笑，真是一种很奇妙的感觉。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '305-306',
        any: [
          /^\s*PRINTFORMW 「一见到您，不知为何就幸福地想露出微笑，真是一种很奇妙的感觉。」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '307',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '307-308',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '307-309',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '307-310',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '316-324',
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;キャラ死亡時は口上をスキップ\s*$\s*^\s*SIF BASE:0 <= 0\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '316-400',
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;キャラ死亡時は口上をスキップ\s*$\s*^\s*SIF BASE:0 <= 0\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '330',
        any: [/^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '330-331',
        any: [
          /^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '332',
        any: [
          /^\s*PRINTFORMW 「真是人渣…！喔…抱歉，忘了你不是人族了，应该说人渣不如才对！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '333',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用冰冷且尖锐的言语怒骂了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '333-334',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用冰冷且尖锐的言语怒骂了起来……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '337',
        any: [/^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '337-338',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '339',
        any: [/^\s*PRINTFORMW 「就这…？再怎么做也是没用的！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '342',
        any: [
          /^\s*PRINTFORMW （为了那个人，%SELF_CALL\(TARGET\)%一定要逃离这个鬼地方才行！）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '343',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%皱着眉头咬着手指，似乎在思考什么的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '343-344',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%皱着眉头咬着手指，似乎在思考什么的样子……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '347',
        any: [/^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '347-348',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '349',
        any: [/^\s*PRINTFORMW 「唔…嗯…总算是结束了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '352',
        any: [
          /^\s*PRINTFORMW （就算是被做了这种事……为了那个人，%SELF_CALL\(TARGET\)%也不能放弃！）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '353',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%叹了一口气，露出若有所思的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '353-354',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%叹了一口气，露出若有所思的表情……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '357',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '357-358',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '359',
        any: [/^\s*PRINTFORMW 「如果再这样下去的话…该不会…已经……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '362',
        any: [
          /^\s*PRINTFORMW （这样的%SELF_CALL\(TARGET\)%……已经无法再回到那个人的身边了吧？）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '363',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低着头喃喃自语着，露出了放弃的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '363-364',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低着头喃喃自语着，露出了放弃的表情……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '367',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '367-368',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '367-369',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '370-371',
        any: [
          /^\s*PRINTFORMW 「开玩笑的啦！别生气喔？因为是魔王大人，%SELF_CALL\(TARGET\)%才会依依不舍啊！」\s*$\s*^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正在想着呆会该如何解决自己身体的火热……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '371',
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正在想着呆会该如何解决自己身体的火热……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '371-372',
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正在想着呆会该如何解决自己身体的火热……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '374',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '374-375',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '376-379',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「呼……只有魔王大人能把%SELF_CALL\(TARGET\)%弄成这样乱七八糟的样子呢~」\s*$\s*^\s*DATAFORM 「嗯啊…啊…嗯…真不愧是魔王大人，%SELF_CALL\(TARGET\)%被调教到腰都软了呢~」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '380',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，喘息地向你求饶着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '380-381',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，喘息地向你求饶着……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '384',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '384-385',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '384-386',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '387-388',
        any: [
          /^\s*PRINTFORMW 「开玩笑的啦！别生气喔？因为是魔王大人，%SELF_CALL\(TARGET\)%才会依依不舍啊！」\s*$\s*^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '388',
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '388-389',
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '391',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '391-392',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '393-396',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「唔…好想就这样一直和您合而为一啊…！」\s*$\s*^\s*DATAFORM 「%SELF_CALL\(TARGET\)%这体力真是不行，不知您觉得还满意吗？」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '397',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '397-398',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '397-399',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '397-400',
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '406',
        any: [/^\s*@KOJO_MESSAGE_COM_15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '408-425',
        any: [
          /^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*;	RETURN 0\s*$\s*^\s*;ボールギャグ着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$\s*^\s*SIF TFLAG:899\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '411-412',
        any: [/^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '414-415',
        any: [/^\s*SIF TFLAG:899\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '417',
        any: [/^\s*IF TEQUIP:89\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '418',
        any: [/^\s*CALL DOG_KOJO_15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '418-419',
        any: [/^\s*CALL DOG_KOJO_15\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '420-421',
        any: [/^\s*ENDIF\s*$\s*^\s*;コロシアム中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '422',
        any: [/^\s*IF TEQUIP:55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '423',
        any: [/^\s*CALL COLOSSEUM_KOJO_15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '423-424',
        any: [/^\s*CALL COLOSSEUM_KOJO_15\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '423-425',
        any: [
          /^\s*CALL COLOSSEUM_KOJO_15\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '431-433',
        any: [
          /^\s*;愛撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '435-438',
        any: [
          /^\s*IF CFLAG:301 == 0\s*$\s*^\s*;屈服刻印Lv2以上\s*$\s*^\s*IF MARK:2 >= 2\s*$\s*^\s*PRINTFORMW 「不……不要摸……唔……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '437-438',
        any: [
          /^\s*IF MARK:2 >= 2\s*$\s*^\s*PRINTFORMW 「不……不要摸……唔……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '438',
        any: [/^\s*PRINTFORMW 「不……不要摸……唔……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '439',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭起眼睛，咬牙地忍耐着身体浮现的感觉……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '441-443',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样触碰的话，除了恶心之外没有其他感觉。」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '442',
        any: [
          /^\s*PRINTFORMW 「这样触碰的话，除了恶心之外没有其他感觉。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '443',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '443-444',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '443-445',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '443-446',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '448-450',
        any: [
          /^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '450',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '451-454',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊……好…好舒服……这样子……摸的话…会…会很快高潮的…嗯…啊啊～♡」\s*$\s*^\s*DATAFORM 「啊……嗯啊啊～身体好热……变得好想要了呢～♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '455',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的眼角染上情慾的红晕，主动将身体贴近%SAVESTR:PLAYER%了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '455-456',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的眼角染上情慾的红晕，主动将身体贴近%SAVESTR:PLAYER%了……\s*$\s*^\s*CFLAG:301 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '458',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '459-462',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯……好…好舒服……请随意地……抚摸……嗯…啊啊～♡」\s*$\s*^\s*DATAFORM 「啊……嗯啊啊～身体好热……好喜欢被这样子抚摸～♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '463',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的双颊晕红，主动将身体贴近%SAVESTR:PLAYER%了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '463-464',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的双颊晕红，主动将身体贴近%SAVESTR:PLAYER%了……\s*$\s*^\s*CFLAG:301 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '466-467',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「啊！……啊……嗯啊！……这种感觉……唔！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '467',
        any: [/^\s*PRINTFORMW 「啊！……啊……嗯啊！……这种感觉……唔！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '468',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的脸颊带着可疑的红晕，似乎无法承受%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '468-469',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的脸颊带着可疑的红晕，似乎无法承受%SAVESTR:PLAYER%的动作……\s*$\s*^\s*CFLAG:301 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '471-472',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「不……就算是这样……也是没有用的……唔！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '472',
        any: [/^\s*PRINTFORMW 「不……就算是这样……也是没有用的……唔！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '473',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬紧牙关，转过头去忍耐着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '473-474',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬紧牙关，转过头去忍耐着%SAVESTR:PLAYER%的动作……\s*$\s*^\s*CFLAG:301 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '476-478',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「住手！这么摸很恶心……不……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '477-481',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「住手！这么摸很恶心……不……」\s*$\s*^\s*DATAFORM 「技术这么差！难道没有自觉吗？」\s*$\s*^\s*DATAFORM 「一点也不舒服！可以劳驾您把脏手拿开吗？」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '482',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '482-483',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '482-484',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '482-485',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '482-486',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4027',
        any: [/^\s*@DOG_KOJO_15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4030-4032',
        any: [
          /^\s*;獣姦愛撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4030-4034',
        any: [
          /^\s*;獣姦愛撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:301 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4036-4038',
        any: [
          /^\s*IF MARK:2 >= 2\s*$\s*^\s*PRINTFORMW 「…………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，忍耐着狗的磨蹭……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4037-4038',
        any: [
          /^\s*PRINTFORMW 「…………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，忍耐着狗的磨蹭……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4038',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，忍耐着狗的磨蹭……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4040-4042',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不……别靠过来！恶心！……」\s*$\s*^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4041',
        any: [/^\s*PRINTFORMW 「不……别靠过来！恶心！……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4041-4079',
        any: [
          /^\s*PRINTFORMW 「不……别靠过来！恶心！……」\s*$\s*^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4042',
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4042-4043',
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4042-4044',
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4042-4045',
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '4046-4082',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「狗狗的皮毛好舒服……其他的地方也……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%就像是一条合格的母狗一样，万分自然地与狗相互磨蹭着……\s*$\s*^\s*CFLAG:301 = 7\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5168',
        any: [/^\s*@SELF_KOJO_K15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5796',
        any: [/^\s*@COLOSSEUM_KOJO_15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5800-5803',
        any: [
          /^\s*IF SELECTCOM == 55\s*$\s*^\s*;気力０以下\s*$\s*^\s*IF BASE:1 <= 0\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5802-5803',
        any: [
          /^\s*IF BASE:1 <= 0\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5803',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5803-5804',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5805',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%强行让自己冷静下来，试图摆脱死斗场气氛的影响……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5805-5806',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%强行让自己冷静下来，试图摆脱死斗场气氛的影响……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5805-5807',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%强行让自己冷静下来，试图摆脱死斗场气氛的影响……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '5808-5811',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;会話する\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '497',
        any: [/^\s*PRINTFORMW 「走…走开啊！这……这…真是不敢相信！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '498',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎没想过会有人做出这种行为，露出了愤怒又觉得不可思议的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '501',
        any: [
          /^\s*PRINTFORMW 「不！居…居然……离%SELF_CALL\(TARGET\)%远点啊！走开！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '502',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '509',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '510',
        any: [
          /^\s*PRINTFORMW 「里面……都……都湿答答的了……舌头……再……进去一点……啊啊～♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '511',
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让情慾高涨的%SAVESTR:TARGET%发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '514',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '515',
        any: [
          /^\s*PRINTFORMW 「这样…会…会流出来的呀…嗯……啊啊♡……真是坏心眼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '516',
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让%SAVESTR:TARGET%不由自主地发出了动情的呻吟……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '520',
        any: [/^\s*PRINTFORMW 「唔！那…那个地方……不！不要……啊！啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '521',
        any: [
          /^\s*PRINTFORMW 从下身传来的羞耻感，让%SAVESTR:TARGET%面色通红地扭动着身体……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '525-529',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「恶心死了！滚开啊！」\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '530',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '540',
        any: [/^\s*IF SELECTCOM == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '542',
        any: [/^\s*IF CFLAG:303 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '543',
        any: [/^\s*PRINTFORMW 「你……你……在摸哪里？居然……不！……住手啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '544',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%先是呆愣了一下，後来马上羞愤地怒吼着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '545',
        any: [/^\s*CFLAG:TARGET:303 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '551',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '552',
        any: [
          /^\s*PRINTFORMW 「啊！啊…不够…嗯……啊啊♡…还想要更多！快点！弄坏%SELF_CALL\(TARGET\)%吧♡♡…啊～♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '553',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%那湿润的後穴就像是调教好的性器，饥渴地收缩着，似乎想要被更巨大的东西侵犯……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '554',
        any: [/^\s*CFLAG:303 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '556',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '557',
        any: [/^\s*PRINTFORMW 「啊！手指…再伸进来一点…嗯……啊啊♡……啊～♡」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '558',
        any: [
          /^\s*PRINTFORMW 即使是尚未完全润滑好的後穴，也让%SAVESTR:TARGET%发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '559',
        any: [/^\s*CFLAG:303 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '561',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '562',
        any: [
          /^\s*PRINTFORMW 「啊～在…里面搅动着♡…嗯……啊啊♡……别这样欺负%SELF_CALL\(TARGET\)%啊～♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '563',
        any: [
          /^\s*PRINTFORMW 从後孔传来的快感，让%SAVESTR:TARGET%不由自主地发出了动情的呻吟……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '564',
        any: [/^\s*CFLAG:303 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '566',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '567',
        any: [
          /^\s*PRINTFORMW 「虽然…里面还没有很湿……啊…这种感觉……好奇怪啊～♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '568',
        any: [
          /^\s*PRINTFORMW 即使是尚未完全润滑好的後穴，也似乎让%SAVESTR:TARGET%渐渐有了感觉……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '569',
        any: [/^\s*CFLAG:303 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '571',
        any: [
          /^\s*ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '572',
        any: [/^\s*PRINTFORMW 「唔！那…那个地方……不！不要……啊！啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '573',
        any: [
          /^\s*PRINTFORMW 从下身传来的羞耻感，让%SAVESTR:TARGET%面色通红地扭动着身体……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '574',
        any: [/^\s*CFLAG:303 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '576',
        any: [/^\s*ELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '577-583',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「恶心死了！這麼喜歡屁股的話，不會摸你自己的嗎！」\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*DATAFORM 「为何要摸这种地方？简直变态！」\s*$\s*^\s*DATAFORM 「对这个地方有兴趣？真不愧是变态中的翘楚呢！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '584',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '585',
        any: [/^\s*CFLAG:303 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '594',
        any: [/^\s*IF SELECTCOM == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '596',
        any: [/^\s*IF CFLAG:304 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '597',
        any: [
          /^\s*PRINTFORMW 「什……什么？真是不敢相信！怎么会有这种要求……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '598',
        any: [
          /^\s*PRINTFORMW 「看來魔界的字典是沒有『羞恥』這兩個字對吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '599',
        any: [
          /^\s*PRINTFORMW 「可惡！%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%……居然要……嗚……嗯……唔……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '600',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%笨拙地抚摸着自己的下身，露出了屈辱的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '601',
        any: [/^\s*CFLAG:TARGET:304 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '606',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '607',
        any: [
          /^\s*PRINTFORMW 「虽然还没开苞…但…但是……您看？这里……湿的不像样了♡…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '608',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却淫荡豪放地张开了大腿……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '609',
        any: [/^\s*CFLAG:304 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '611',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '614',
        any: [
          /^\s*PRINTFORMW 「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '616',
        any: [
          /^\s*PRINTFORMW 「看啊！…这个…地方都不知廉耻地…流出蜜汁了♡…嗯啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '618',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%深怕别人看不清楚自己发情的样子，夸张地张开了大腿并淫荡地呻吟着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '619',
        any: [/^\s*CFLAG:304 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '621',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '624',
        any: [
          /^\s*PRINTFORMW 「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '626',
        any: [
          /^\s*PRINTFORMW 「肉棒不进来吗？要%SELF_CALL\(TARGET\)%自己来什么的……真是坏心眼啊！唔！嗯嗯！啊啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '628',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然想要的不是这个，但是还是听话地自慰了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '629',
        any: [/^\s*CFLAG:304 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '631',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '632',
        any: [
          /^\s*PRINTFORMW 「这……这么羞耻的样子…如果想看的话…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '633',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却仍面红耳赤地张开了大腿……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '634',
        any: [/^\s*CFLAG:304 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '636',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '639',
        any: [
          /^\s*PRINTFORMW 「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '641',
        any: [
          /^\s*PRINTFORMW 「看……看清楚了吗……%SELF_CALL\(TARGET\)%……自慰着发情的样子♡♡……嗯啊～啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '643',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%急促地喘息着，似乎沉醉在自慰的快感里面了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '644',
        any: [/^\s*CFLAG:304 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '646',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '649',
        any: [
          /^\s*PRINTFORMW 「就……就这么喜欢看…%SELF_CALL\(TARGET\)%……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '651',
        any: [
          /^\s*PRINTFORMW 「这……这里…能看清楚吗？……可……可以吗……唔！啊啊！啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '653',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然面红耳赤，但是还是柔顺地张开了大腿……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '654',
        any: [/^\s*CFLAG:304 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '656',
        any: [
          /^\s*ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '659',
        any: [/^\s*PRINTFORMW 「呜……不……这个样子……嗯…啊…啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '661',
        any: [/^\s*PRINTFORMW 「不……为什么会…唔！……嗯…啊…啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '663',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎因为自慰而有了感觉，面红耳赤地闭起了眼睛……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '664',
        any: [/^\s*CFLAG:304 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '666',
        any: [/^\s*ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '669',
        any: [/^\s*PRINTFORMW 「喜欢看这种事情？果然真是有病！嗯……唔！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '671',
        any: [
          /^\s*PRINTFORMW 「無須勞煩您的尊駕，%SELF_CALL\(TARGET\)%自己来好多了！嗯……唔！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '673',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边不满地抗议，一边羞愤地进行着自慰……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '674',
        any: [/^\s*CFLAG:304 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '687',
        any: [/^\s*IF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '688',
        any: [
          /^\s*PRINTFORMW 「有…有点害羞……但是……很舒服……请再……再……嗯…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '689',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的耳根羞红，顺从地任由%SAVESTR:PLAYER%的双手在胸部上游移……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '692',
        any: [
          /^\s*PRINTFORMW 「这…这种痴汉似的举动……可真……配得上你的身份啊！……唔！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '693',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '700',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '701',
        any: [
          /^\s*PRINTFORMW 「嗯…啊啊……好……好棒……再……用力……用力……嗯～啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '702',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%那柔软的胸部被任意搓揉着，随着传来的快感发出了高亢的呻吟……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '705',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\) && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '706',
        any: [/^\s*PRINTFORMW 「嗯…啊啊……唔！……嗯……啊……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '707',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%在%NAME:MASTER%的注视之下，被%SAVESTR:PLAYER%玩弄着胸部……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '708',
        any: [
          /^\s*PRINTFORMW 尽管努力地忍耐着不想发出声音，但是无奈身体的快感太过强烈，还是泄露出来呻吟的声音……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '710',
        any: [
          /^\s*PRINTFORMW 「嗯…啊啊……很…很舒服……嗯……想…还想要……嗯～啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '711',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满面红晕地看着%SAVESTR:PLAYER%的动作，发出了急促的喘息……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '715-718',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不！不要再捏乳头了！会……唔～嗯……啊啊啊～」\s*$\s*^\s*DATAFORM 「不！不要再揉胸部了！会……唔～嗯……啊啊啊～」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '719-722',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%扭动着身体想要抵抗那异样的快感……\s*$\s*^\s*DATAFORM 揉捏胸部似乎让%SAVESTR:TARGET%非常有感觉的样子……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '726-731',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*DATAFORM 「脏死了！不要碰%SELF_CALL\(TARGET\)%！」\s*$\s*^\s*DATAFORM 「住手！恶心死了！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '732',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '746',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '747',
        any: [
          /^\s*PRINTFORMW 「啾！嗯～早就想跟主人接吻了～果然…主人是最棒的♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '748',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是意犹未尽的舔着嘴唇，但是眼神却游移地看着%SAVESTR:PLAYER%，似乎还想要更『刺激』的东西……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '750',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '751',
        any: [
          /^\s*PRINTFORMW 「啾！嗯～早就想跟主人接吻了～果然…真的好幸福呢♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '752',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满足地眯起了眼睛，露出幸福的表情倚靠在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '755',
        any: [/^\s*PRINTFORMW 「嗯……不！…别……可恶！……恶……恶心！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '756',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%拼命地想把头转过去，然而下巴却被%SAVESTR:PLAYER%紧紧捏住而无法躲避，就这样子被夺走了初吻……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '757',
        any: [
          /^\s*PRINTFORMW 「是不是没人想跟你接吻，所以只能用强迫的手段？真是卑劣！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '758',
        any: [/^\s*PRINTFORM %SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '760',
        any: [
          /^\s*PRINTFORM 像擦拭什么脏东西那样，用力地用手模擦着自己的嘴唇，\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '761',
        any: [/^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '769',
        any: [
          /^\s*PRINTFORMW 「嗯…咕啾…啊啊…舌……舌头♡……嗯……好…好棒～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '770',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%任由%SAVESTR:PLAYER%的舌头深入口腔中肆虐，激烈的亲吻让银丝从嘴角流下……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '772',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '773',
        any: [/^\s*PRINTFORMW 「如果……这是主人……的命令…唔…唔…嗯…嗯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '774',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从与%SAVESTR:PLAYER%亲吻着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '776',
        any: [/^\s*PRINTFORMW 「嗯……啊……嗯嗯～啾♡～啊～嘻嘻…好高兴…♡♡」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '777',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面带红晕，高兴地眯起了眼睛，沉醉在与%SAVESTR:PLAYER%的亲吻之中……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '780',
        any: [/^\s*PRINTFORMW 「谁要跟你这种……唔！…不……唔……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '781',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '788',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '789',
        any: [
          /^\s*PRINTFORMW 「嗯～啊………好……好棒♡……还……还要……啾～咕啾～嗯…～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '790',
        any: [/^\s*IF TEQUIP:44\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '791',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，饥渴地与对方交换着唾液……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '793',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，双手在对方身上激烈的抚弄着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '797',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\) && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '798',
        any: [/^\s*PRINTFORMW 「嗯…啊…这……唔……啾……唔…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '799',
        any: [/^\s*PRINTFORMW （这样子做……主人会开心吗……？）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '800',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%心神不宁地想着%NAME:MASTER%的事情，顺从与%SAVESTR:PLAYER%亲吻着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '802',
        any: [/^\s*PRINTFORMW 「嗯…啊……喜……喜欢♡……啾……好……幸福♡♡……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '803',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%閉上眼睛柔顺地迎合着%SAVESTR:PLAYER%的亲吻。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '804',
        any: [
          /^\s*PRINTFORMW 同時像是挑逗一樣伸出了舌尖試探，兩人像是怎樣都親吻不夠似地熱吻著……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '808',
        any: [/^\s*PRINTFORMW 「唔……嗯嗯……算了………嗯……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '809',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了抵抗，皱着眉头忍受着%SAVESTR:PLAYER%的亲吻……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '813',
        any: [/^\s*PRINTFORMW 「居然……又……唔！…不…不要……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '814',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '824',
        any: [/^\s*IF SELECTCOM == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '826',
        any: [/^\s*IF CFLAG:308 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '829',
        any: [/^\s*PRINTFORMW 「嗯？很想看吗？可以哦♡」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '830',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地用手指拨开着阴唇，大方地展示着那最私密的地方……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '833',
        any: [
          /^\s*PRINTFORMW 「虽然很羞耻……但是……如果是魔王大人想看的话……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '834',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的耳根通红，顺从地用手指拨开着阴唇，展示着那最私密的地方……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '837',
        any: [
          /^\s*PRINTFORMW 「居……居然……让%SELF_CALL\(TARGET\)%……做这种事情……可恶！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '838',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不甘愿且笨拙地用手指拨开了自己下身的阴唇……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '840',
        any: [/^\s*CFLAG:TARGET:308 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '845',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '846',
        any: [
          /^\s*PRINTFORMW 「嗯……这样……有看清楚里面吗？……啊…在收缩着哦♡…很想要的样子……嘿嘿♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '847',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '850',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '851',
        any: [
          /^\s*PRINTFORMW 「嗯……请…请看吧……这个姿势能看清楚吗……嗯～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '852',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '855',
        any: [
          /^\s*ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '856',
        any: [/^\s*PRINTFORMW 「嗯……不……再这样盯着看……会……唔！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '857',
        any: [
          /^\s*PRINTFORMW （明明……不想要这样的，这…这种奇怪的感觉……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '858',
        any: [
          /^\s*PRINTFORMW 感受到视线集中到那私密的地方的时候，%SAVESTR:TARGET%似乎有了特别的感觉……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '862',
        any: [/^\s*PRINTFORMW 「这样……够了吧！别……别再看了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '863',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '873',
        any: [/^\s*IF SELECTCOM == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '875',
        any: [/^\s*IF CFLAG:TARGET:309 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '878',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '881',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '884',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '886',
        any: [/^\s*CFLAG:TARGET:309 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '891',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '892',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '893',
        any: [/^\s*CFLAG:309 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '895',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '896',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '897',
        any: [/^\s*CFLAG:309 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '899',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '900',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '901',
        any: [/^\s*CFLAG:309 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '903',
        any: [/^\s*ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '904',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '905',
        any: [/^\s*CFLAG:309 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '919',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '922',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '925',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '932',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '933',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '937',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '941',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '945',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '955',
        any: [/^\s*IF SELECTCOM == 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '957',
        any: [/^\s*IF CFLAG:TARGET:311 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '960',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '963',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '966',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '968',
        any: [/^\s*CFLAG:TARGET:311 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '973',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '974',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '975',
        any: [/^\s*CFLAG:311 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '977',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '978',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '979',
        any: [/^\s*CFLAG:311 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '981',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '982',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '983',
        any: [/^\s*CFLAG:311 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '985',
        any: [/^\s*ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '986',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '987',
        any: [/^\s*CFLAG:311 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '997',
        any: [/^\s*IF SELECTCOM == 11 && TEQUIP:11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '999',
        any: [/^\s*IF CFLAG:TARGET:312 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1004',
        any: [
          /^\s*PRINTFORMW 「嗯…啊……啊……钻…钻进来了呢♡♡……啊……啊啊…嗯…～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1005',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%毫不介意自己被壶虫所破处，甚至还发出了欢愉的呻吟……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1008',
        any: [
          /^\s*PRINTFORMW 「主人不想要%SELF_CALL\(TARGET\)%的处女吗？……唔……%SELF_CALL\(TARGET\)%明白了…嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1009',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎有点失望的样子，但还是顺从地任由壶虫钻入了那处女的小穴之中……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1012',
        any: [
          /^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1013',
        any: [
          /^\s*PRINTFORMW 被壶虫破处的%SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1019',
        any: [
          /^\s*PRINTFORMW 「哈啊～嗯…啊……啊～在…在里面动呢♡……啊！…钻得…好深♡……～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1020',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满脸带着情慾的红晕，似乎很享受壶虫带来的快感……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1023',
        any: [
          /^\s*PRINTFORMW 「嗯～唔……不……不要用这个……欺负%SELF_CALL\(TARGET\)%嘛……唔……啊～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1024',
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%看似不太愿意的样子，但是那身体似乎已经感到了快感……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1027',
        any: [
          /^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1028',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1031',
        any: [/^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1036',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1037',
        any: [
          /^\s*PRINTFORMW 「哈啊～嗯啊……好…好棒……看…看见了吗？钻进去了喔♡～呵呵♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1038',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是发情地呻吟着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1039',
        any: [/^\s*CFLAG:312 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1041',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1042',
        any: [
          /^\s*PRINTFORMW 「啊～进…进来了…不……不可以…钻这么深啊…啊啊♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1043',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面色红晕地喘息着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1044',
        any: [/^\s*CFLAG:312 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1046',
        any: [
          /^\s*ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1047',
        any: [
          /^\s*PRINTFORMW 「啊…哈啊……不…不行！里面会……嗯啊…啊啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1048',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎想要抗拒壶虫带来的感觉，扭动着身体也无法阻止那从小穴发出的淫糜水音……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1049',
        any: [/^\s*CFLAG:312 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1051',
        any: [/^\s*ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1052',
        any: [
          /^\s*PRINTFORMW 「不……不要虫子！拿…拿走啊！唔……啊…啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1053',
        any: [
          /^\s*PRINTFORMW 即使%SAVESTR:TARGET%拼命地挣扎，还是被硬生生地被%SAVESTR:PLAYER%掰开了大腿，任由壶虫钻了进去……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1054',
        any: [/^\s*CFLAG:312 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1059',
        any: [/^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1061',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1062',
        any: [
          /^\s*PRINTFORMW 随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1063',
        any: [
          /^\s*PRINTFORMW 「嗯啊啊～拔出来了呢♡……总觉得……有点……寂寞呢♡♡？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1064',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%喘息着沉浸在壶虫带来的余韵之中，大腿像是故意那样地张开展示着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1065',
        any: [/^\s*CFLAG:372 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1067',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1068',
        any: [
          /^\s*PRINTFORMW 随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1069',
        any: [
          /^\s*PRINTFORMW 「这…是因为太想要主人了……所以…抱…抱歉……擅自流出…这么多……呜」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1070',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满脸羞红，拼命地想要解释下身为何如此不像话的样子……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1071',
        any: [/^\s*CFLAG:372 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1073',
        any: [/^\s*ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1074',
        any: [/^\s*PRINTFORMW 「呜……终於……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1075',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%松了一口气，身体仍带着刺激过後的颤抖……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1076',
        any: [/^\s*CFLAG:372 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1084',
        any: [/^\s*IF SELECTCOM == 12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1086',
        any: [/^\s*IF CFLAG:313 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1089',
        any: [
          /^\s*PRINTFORMW 「这个道具看起来真刺激……好…好有趣啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1090',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用期待的眼神看着%SAVESTR:PLAYER%手中的道具，相当配合地任由摆弄……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1093',
        any: [
          /^\s*PRINTFORMW 「这个道具是？啊！……震…震的好厉害啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1094',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从地任由%SAVESTR:PLAYER%摆弄着……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1097',
        any: [
          /^\s*PRINTFORMW 「哼！借助道具？这就是你的本事吗？不！拿…拿开啊……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1098',
        any: [
          /^\s*PRINTFORMW 无视%SAVESTR:TARGET%的冷嘲热讽与抗议，%SAVESTR:PLAYER%将振动着的道具紧贴着%SAVESTR:TARGET%的股间……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1100',
        any: [/^\s*CFLAG:313 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1105',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1106',
        any: [
          /^\s*PRINTFORMW 「啊！这…好有感觉……再这样……这里就要♡……嗯啊♡……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1107',
        any: [/^\s*CFLAG:313 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1109',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1110',
        any: [
          /^\s*PRINTFORMW 「就算不用道具…只要对象是魔王大人…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%也会…嗯啊♡……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1111',
        any: [/^\s*CFLAG:313 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1113',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1114',
        any: [/^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1115',
        any: [/^\s*CFLAG:313 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1117',
        any: [/^\s*ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1118',
        any: [/^\s*PRINTFORMW 「不！拿…拿开啊！不要再震了……啊…啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1119',
        any: [/^\s*CFLAG:313 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '487-490',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '492-497',
        any: [
          /^\s*IF SELECTCOM == 1\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:302 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:TARGET:0 == 1\s*$\s*^\s*PRINTFORMW 「走…走开啊！这……这…真是不敢相信！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '495-497',
        any: [
          /^\s*;処女\s*$\s*^\s*IF TALENT:TARGET:0 == 1\s*$\s*^\s*PRINTFORMW 「走…走开啊！这……这…真是不敢相信！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '499-501',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！居…居然……离%SELF_CALL\(TARGET\)%远点啊！走开！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '502-503',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '502-505',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '502-507',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '505-509',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '511-512',
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让情慾高涨的%SAVESTR:TARGET%发出了淫荡的呻吟……\s*$\s*^\s*CFLAG:302 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '516-517',
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让%SAVESTR:TARGET%不由自主地发出了动情的呻吟……\s*$\s*^\s*CFLAG:302 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '518-520',
        any: [
          /^\s*;屈服刻印Lv3\s*$\s*^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「唔！那…那个地方……不！不要……啊！啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '521-522',
        any: [
          /^\s*PRINTFORMW 从下身传来的羞耻感，让%SAVESTR:TARGET%面色通红地扭动着身体……\s*$\s*^\s*CFLAG:302 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '523-525',
        any: [
          /^\s*;それ以外（屈服刻印Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '530-531',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '530-533',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '530-535',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '532-538',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル愛撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '545-546',
        any: [/^\s*CFLAG:TARGET:303 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '547-549',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*P = PALAM:3 \+ UP:3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '548-549',
        any: [/^\s*ELSE\s*$\s*^\s*P = PALAM:3 \+ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '585-586',
        any: [/^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '585-588',
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '585-590',
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '586-592',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;自慰 CFLAG304\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '601-602',
        any: [/^\s*CFLAG:TARGET:304 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '603-605',
        any: [/^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋処女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '612-614',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '614-615',
        any: [
          /^\s*PRINTFORMW 「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '616-617',
        any: [
          /^\s*PRINTFORMW 「看啊！…这个…地方都不知廉耻地…流出蜜汁了♡…嗯啊…啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '622-624',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '624-625',
        any: [
          /^\s*PRINTFORMW 「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '626-627',
        any: [
          /^\s*PRINTFORMW 「肉棒不进来吗？要%SELF_CALL\(TARGET\)%自己来什么的……真是坏心眼啊！唔！嗯嗯！啊啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '637-639',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '639-640',
        any: [
          /^\s*PRINTFORMW 「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '641-642',
        any: [
          /^\s*PRINTFORMW 「看……看清楚了吗……%SELF_CALL\(TARGET\)%……自慰着发情的样子♡♡……嗯啊～啊…啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '647-649',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「就……就这么喜欢看…%SELF_CALL\(TARGET\)%……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '649-650',
        any: [
          /^\s*PRINTFORMW 「就……就这么喜欢看…%SELF_CALL\(TARGET\)%……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '651-652',
        any: [
          /^\s*PRINTFORMW 「这……这里…能看清楚吗？……可……可以吗……唔！啊啊！啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '657-659',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「呜……不……这个样子……嗯…啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '659-660',
        any: [
          /^\s*PRINTFORMW 「呜……不……这个样子……嗯…啊…啊啊！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '661-662',
        any: [
          /^\s*PRINTFORMW 「不……为什么会…唔！……嗯…啊…啊啊！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '667-669',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「喜欢看这种事情？果然真是有病！嗯……唔！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '669-670',
        any: [
          /^\s*PRINTFORMW 「喜欢看这种事情？果然真是有病！嗯……唔！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '671-672',
        any: [
          /^\s*PRINTFORMW 「無須勞煩您的尊駕，%SELF_CALL\(TARGET\)%自己来好多了！嗯……唔！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '674-675',
        any: [/^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '674-677',
        any: [
          /^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '674-679',
        any: [
          /^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '675-681',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '681-684',
        any: [
          /^\s*;胸愛撫 CFLAG:306\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 5\s*$\s*^\s*;初めて\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '683-687',
        any: [
          /^\s*IF SELECTCOM == 5\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:306 == 0\s*$\s*^\s*;愛\s*$\s*^\s*IF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '690-692',
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这…这种痴汉似的举动……可真……配得上你的身份啊！……唔！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '693-694',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '693-696',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '693-698',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '696-700',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '702-703',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%那柔软的胸部被任意搓揉着，随着传来的快感发出了高亢的呻吟……\s*$\s*^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '708-709',
        any: [
          /^\s*PRINTFORMW 尽管努力地忍耐着不想发出声音，但是无奈身体的快感太过强烈，还是泄露出来呻吟的声音……\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '711-712',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满面红晕地看着%SAVESTR:PLAYER%的动作，发出了急促的喘息……\s*$\s*^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '713-715',
        any: [
          /^\s*;B感覚Lv3以上\s*$\s*^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '722-723',
        any: [/^\s*ENDDATA\s*$\s*^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '724-726',
        any: [
          /^\s*;それ以外（愛無し、B感覚Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '732-733',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '732-735',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '732-737',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '732-739',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '734-740',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;キスする CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '740-743',
        any: [
          /^\s*;キスする CFLAG:307\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 6\s*$\s*^\s*;ファーストキス\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '743-745',
        any: [
          /^\s*;ファーストキス\s*$\s*^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$\s*^\s*;淫乱かつ主人\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '753-755',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯……不！…别……可恶！……恶……恶心！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '761-762',
        any: [/^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '761-764',
        any: [
          /^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '761-766',
        any: [
          /^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;（調教では）初めて\s*$\s*^\s*ELSEIF CFLAG:307 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '765-767',
        any: [
          /^\s*;（調教では）初めて\s*$\s*^\s*ELSEIF CFLAG:307 == 0\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '767-769',
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW 「嗯…咕啾…啊啊…舌……舌头♡……嗯……好…好棒～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '774-775',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从与%SAVESTR:PLAYER%亲吻着……\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '778-780',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「谁要跟你这种……唔！…不……唔……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '781-782',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '781-784',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '781-786',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '784-788',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '791-792',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，饥渴地与对方交换着唾液……\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '793-794',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，双手在对方身上激烈的抚弄着……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '794-795',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '800-801',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%心神不宁地想着%NAME:MASTER%的事情，顺从与%SAVESTR:PLAYER%亲吻着……\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '804-805',
        any: [
          /^\s*PRINTFORMW 同時像是挑逗一樣伸出了舌尖試探，兩人像是怎樣都親吻不夠似地熱吻著……\s*$\s*^\s*CFLAG:307 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '806-808',
        any: [
          /^\s*;従順Lv2以上\s*$\s*^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「唔……嗯嗯……算了………嗯……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '809-810',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了抵抗，皱着眉头忍受着%SAVESTR:PLAYER%的亲吻……\s*$\s*^\s*CFLAG:307 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '811-813',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTFORMW 「居然……又……唔！…不…不要……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '814-815',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '814-817',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '814-819',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '814-821',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '816-822',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;秘貝開帳 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '827-829',
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW 「嗯？很想看吗？可以哦♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '831-833',
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW 「虽然很羞耻……但是……如果是魔王大人想看的话……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '835-837',
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居……居然……让%SELF_CALL\(TARGET\)%……做这种事情……可恶！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '838-839',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不甘愿且笨拙地用手指拨开了自己下身的阴唇……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '840-841',
        any: [/^\s*CFLAG:TARGET:308 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '841-845',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '847-848',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$\s*^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '852-853',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$\s*^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '858-859',
        any: [
          /^\s*PRINTFORMW 感受到视线集中到那私密的地方的时候，%SAVESTR:TARGET%似乎有了特别的感觉……\s*$\s*^\s*CFLAG:306 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '860-861',
        any: [
          /^\s*;それ以外（愛無し、露出癖Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '863-864',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '863-866',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '863-868',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '863-870',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '865-871',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;指挿入れ CFLAG:309\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '875-878',
        any: [
          /^\s*IF CFLAG:TARGET:309 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '875-884',
        any: [
          /^\s*IF CFLAG:TARGET:309 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;屈服刻印Lv3\+愛\s*$\s*^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '880-886',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '884-886',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '886-887',
        any: [/^\s*CFLAG:TARGET:309 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '887-891',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '905-906',
        any: [/^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '905-908',
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '905-910',
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '906-912',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '912-915',
        any: [
          /^\s*;アナル舐め CFLAG:310\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 9\s*$\s*^\s*;初めて\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '915-917',
        any: [/^\s*;初めて\s*$\s*^\s*IF CFLAG:310 == 0\s*$\s*^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '916-919',
        any: [
          /^\s*IF CFLAG:310 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '918-923',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;愛\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外（愛無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '921-927',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '925-927',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '925-928',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '925-930',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '928-932',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '933-934',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '935-937',
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '937-938',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '939-941',
        any: [
          /^\s*;屈服刻印Lv3\s*$\s*^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '941-942',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '943-945',
        any: [
          /^\s*;それ以外（屈服刻印Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '945-946',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '945-948',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '945-950',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '945-952',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '947-953',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;ローター CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '957-960',
        any: [
          /^\s*IF CFLAG:TARGET:311 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '957-966',
        any: [
          /^\s*IF CFLAG:TARGET:311 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;屈服刻印Lv3\+愛\s*$\s*^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '962-968',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '966-968',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '968-969',
        any: [/^\s*CFLAG:TARGET:311 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '969-973',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '987-988',
        any: [/^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '987-990',
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '987-992',
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '988-994',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;壺ワーム CFLAG:312　CFLAG:372\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '999-1002',
        any: [
          /^\s*IF CFLAG:TARGET:312 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1002-1004',
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「嗯…啊……啊……钻…钻进来了呢♡♡……啊……啊啊…嗯…～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1006-1008',
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW 「主人不想要%SELF_CALL\(TARGET\)%的处女吗？……唔……%SELF_CALL\(TARGET\)%明白了…嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1010-1012',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1013-1014',
        any: [
          /^\s*PRINTFORMW 被壶虫破处的%SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1013-1018',
        any: [
          /^\s*PRINTFORMW 被壶虫破处的%SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$\s*^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1017-1019',
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「哈啊～嗯…啊……啊～在…在里面动呢♡……啊！…钻得…好深♡……～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1021-1023',
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW 「嗯～唔……不……不要用这个……欺负%SELF_CALL\(TARGET\)%嘛……唔……啊～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1025-1027',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1028-1029',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1029-1031',
        any: [/^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1031-1032',
        any: [/^\s*CFLAG:312 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1032-1036',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1054-1055',
        any: [/^\s*CFLAG:312 = 2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1054-1057',
        any: [
          /^\s*CFLAG:312 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1055-1059',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1076-1077',
        any: [/^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1076-1079',
        any: [
          /^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1076-1081',
        any: [
          /^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1087-1089',
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「这个道具看起来真刺激……好…好有趣啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1091-1093',
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW 「这个道具是？啊！……震…震的好厉害啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1095-1097',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哼！借助道具？这就是你的本事吗？不！拿…拿开啊……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1098-1099',
        any: [
          /^\s*PRINTFORMW 无视%SAVESTR:TARGET%的冷嘲热讽与抗议，%SAVESTR:PLAYER%将振动着的道具紧贴着%SAVESTR:TARGET%的股间……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1100-1101',
        any: [/^\s*CFLAG:313 = 1\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1101-1105',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1119-1120',
        any: [/^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1119-1122',
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '1119-1123',
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K15_伶俐.ERB',
        ref: '525-538',
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「恶心死了！滚开啊！」\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*ENDDATA\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
