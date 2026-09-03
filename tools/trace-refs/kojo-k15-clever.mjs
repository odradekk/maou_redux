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
        ref: '487-492',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;クンニ CFLAG:302\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 1\s*$/m,
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
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
