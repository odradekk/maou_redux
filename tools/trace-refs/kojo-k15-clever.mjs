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
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "29-33",
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*#PRI\s*$\s*^\s*FLAG:115 = 1\s*$\s*^\s*SIF FLAG:7 == 0\s*$\s*^\s*FLAG:7 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "31",
        any: [
          /^\s*FLAG:115 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "33",
        any: [
          /^\s*FLAG:7 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "35-37",
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*#LATER\s*$\s*^\s*FLAG:115 = 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "37",
        any: [
          /^\s*FLAG:115 = 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "43-47",
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "43-239",
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;初調教時 CFLAG:201\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "52",
        any: [
          /^\s*IF CFLAG:201 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "52-53",
        any: [
          /^\s*IF CFLAG:201 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "54",
        any: [
          /^\s*IF !\(TALENT:314 == 9 \|\| TALENT:319 == 9 \|\| TALENT:319 == 8 \)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "55",
        any: [
          /^\s*PRINTFORMW 才刚走进牢房里，一枚带着光明气息的暗器就这样朝你的眼眸激射而来！！\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "56",
        any: [
          /^\s*PRINTFORMW （请按数字键 \+ Enter 选择行动！）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "57",
        any: [
          /^\s*SETCOLOR 152,250,105\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "57-58",
        any: [
          /^\s*SETCOLOR 152,250,105\s*$\s*^\s*PRINTL\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "59",
        any: [
          /^\s*PRINTL 『1』不闪不避 \( 按 1 \+ Enter \)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "60-61",
        any: [
          /^\s*PRINTL\s*$\s*^\s*PRINTL 『2』偏头闪躲 \( 按 2 \+ Enter \)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "61",
        any: [
          /^\s*PRINTL 『2』偏头闪躲 \( 按 2 \+ Enter \)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "62-63",
        any: [
          /^\s*PRINTL\s*$\s*^\s*RESETCOLOR\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "63",
        any: [
          /^\s*RESETCOLOR\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "64",
        any: [
          /^\s*TINPUT 1000, 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "65",
        any: [
          /^\s*IF RESULT == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "66",
        any: [
          /^\s*PRINTFORMW 你稍微一偏头，就让那枚费尽%SAVESTR:TARGET%苦心筹谋的暗器打空了……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "67",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎有点惊讶你的反应如此敏锐的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "68",
        any: [
          /^\s*PRINTFORMW 恭顺点数 \+ 50\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "69",
        any: [
          /^\s*JUEL:4 \+= 50\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "70",
        any: [
          /^\s*ELSEIF RESULT == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "71",
        any: [
          /^\s*PRINTFORMW 你不闪不避，那枚费尽%SAVESTR:TARGET%苦心筹谋的暗器打在你的眼皮上，造成了輕微的擦傷……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "71-72",
        any: [
          /^\s*PRINTFORMW 你不闪不避，那枚费尽%SAVESTR:TARGET%苦心筹谋的暗器打在你的眼皮上，造成了輕微的擦傷……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "73",
        any: [
          /^\s*PRINTFORMW 好奇地将掉落在地的暗器捡起，发觉那不过是一枚尖端稍微被打磨过的小石片。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "74",
        any: [
          /^\s*PRINTFORMW 再观察一下牢房，在栅栏四周的阴影处，有老旧的捆绳与橡皮绳构成的简易弓弦似的陷阱……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "75",
        any: [
          /^\s*PRINTFORMW 哼，还颇有意思的，但是，这种小伎俩怎可能对魔王造成巨大的伤害呢？\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "76",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "77",
        any: [
          /^\s*PRINTFORMW 「你，难道是魔王吗？所以暗器……才会无法造成伤害。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "78",
        any: [
          /^\s*PRINTFORMW 本来只是对小喽喽用的陷阱，无奈直接遇上了魔王过来，这也是能算是运气不好吧？\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "79",
        any: [
          /^\s*PRINTFORMW 所以看到陷阱失败，牢裡的%SAVESTR:TARGET%不由自主地叹了口气，似乎有点失望的样子。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "79-80",
        any: [
          /^\s*PRINTFORMW 所以看到陷阱失败，牢裡的%SAVESTR:TARGET%不由自主地叹了口气，似乎有点失望的样子。\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "81-82",
        any: [
          /^\s*PRINTFORML\s*$\s*^\s*PRINTFORMW 「别以为只要囚禁%SELF_CALL\(TARGET\)%，就能让%SELF_CALL\(TARGET\)%屈服。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "82",
        any: [
          /^\s*PRINTFORMW 「别以为只要囚禁%SELF_CALL\(TARGET\)%，就能让%SELF_CALL\(TARGET\)%屈服。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "83",
        any: [
          /^\s*PRINTFORMW 「被抓之後会有怎样的遭遇%SELF_CALL\(TARGET\)%早有耳闻。只不过让人失望的是，明明身为魔王却用这种下流卑劣的手段。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "84",
        any: [
          /^\s*PRINTFORMW 「调教？哼…真是低级。该怎么评价好呢？真是………忧患魔界的未来啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "85",
        any: [
          /^\s*IF !\(TALENT:10 \|\| TALENT:17\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "86",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抬头露出不屑的表情，用嘲讽的眼神看着你。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "86-87",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抬头露出不屑的表情，用嘲讽的眼神看着你。\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "88",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%紧握着拳头，试着让自己保持镇定。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "88-89",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%紧握着拳头，试着让自己保持镇定。\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "90",
        any: [
          /^\s*PRINTFORMW 明明成为了阶下囚，%SAVESTR:TARGET%却是不急不缓并义正严词地说着挑衅的话语……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "91",
        any: [
          /^\s*CFLAG:201 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "91-92",
        any: [
          /^\s*CFLAG:201 = 1\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "96",
        any: [
          /^\s*ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "97",
        any: [
          /^\s*IF TALENT:85 \|\| TALENT:76\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "97-98",
        any: [
          /^\s*IF TALENT:85 \|\| TALENT:76\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "99",
        any: [
          /^\s*PRINTFORMW 「真是非常抱歉…因为%SELF_CALL\(TARGET\)%的身体…就是被调教到如此淫乱…所以…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "99-102",
        any: [
          /^\s*PRINTFORMW 「真是非常抱歉…因为%SELF_CALL\(TARGET\)%的身体…就是被调教到如此淫乱…所以…」\s*$\s*^\s*PRINTFORMW %SELF_CALL\(TARGET\)%自嘲地笑著，露出了無奈的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "100",
        any: [
          /^\s*PRINTFORMW %SELF_CALL\(TARGET\)%自嘲地笑著，露出了無奈的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "103-105",
        any: [
          /^\s*ELSE\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "104-105",
        any: [
          /^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "105",
        any: [
          /^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "105-108",
        any: [
          /^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$\s*^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "105-110",
        any: [
          /^\s*PRINTFORMW 「哼！反正不管在哪，做的事情都是一样！」\s*$\s*^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "106",
        any: [
          /^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "106-109",
        any: [
          /^\s*PRINTFORMW %SELF_CALL\(TARGET\)%轉過頭去，露出了不甘心的表情……\s*$\s*^\s*;NTRスイッチ解除\s*$\s*^\s*CFLAG:650 = 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "115",
        any: [
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "115-116",
        any: [
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "117",
        any: [
          /^\s*PRINTFORMW 「看來，只会用这些小手段来折磨%SELF_CALL\(TARGET\)%的身体，这就是魔王大人的本事啊？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "118",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一幅漫不经心的样子，脸上带着不以为然的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "119",
        any: [
          /^\s*CFLAG:201 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "119-120",
        any: [
          /^\s*CFLAG:201 = 2\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "123",
        any: [
          /^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "123-124",
        any: [
          /^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "125",
        any: [
          /^\s*PRINTFORMW 「这些反应只是因为习惯而已！别天真地以为这样就能让%SELF_CALL\(TARGET\)%屈服了啊…！？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "126",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%紧握着拳头，微微颤抖的声音似乎泄漏了他真正的心情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "127",
        any: [
          /^\s*CFLAG:201 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "127-128",
        any: [
          /^\s*CFLAG:201 = 3\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "131",
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "131-132",
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "133",
        any: [
          /^\s*PRINTFORMW 「难道%SELF_CALL\(TARGET\)%是…不…不会的，怎么可能…！？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "134",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%喃喃地自言自语，露出了无法置信的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "135",
        any: [
          /^\s*CFLAG:201 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "135-136",
        any: [
          /^\s*CFLAG:201 = 4\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "139",
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "139-140",
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "141",
        any: [
          /^\s*PRINTFORMW 「直到遇见了魔王大人，%SELF_CALL\(TARGET\)%才真正体会到什么叫做『欢愉』……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "142",
        any: [
          /^\s*PRINTFORMW 「以前的事情回想起来，发觉%SELF_CALL\(TARGET\)%真是太愚昧了，早点坦然地接受您的调教就好了，真是浪费了美好的时光……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "143",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对你露出了媚笑，正伸出手暧昧地抚摸你的下身……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "144",
        any: [
          /^\s*CFLAG:201 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "144-145",
        any: [
          /^\s*CFLAG:201 = 5\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "148",
        any: [
          /^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "148-149",
        any: [
          /^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "150",
        any: [
          /^\s*PRINTFORMW 「您来了啊？敬爱的魔王大人。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "151",
        any: [
          /^\s*IF TALENT:TARGET:122\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "152",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如被和煦的春风吹拂，露出了温柔的微笑。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "152-153",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如被和煦的春风吹拂，露出了温柔的微笑。\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "154",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如花朵盛开般地展颜，露出了美丽无暇的微笑。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "154-155",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一看见你就宛如花朵盛开般地展颜，露出了美丽无暇的微笑。\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "156",
        any: [
          /^\s*PRINTFORMW 「那个，如果可以的话，有些事情想要跟您说……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "157",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不自然地清了一下喉咙，似乎有点羞涩，不敢直视你的眼神。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "158",
        any: [
          /^\s*PRINTFORMW 「以前被『正义』所奴役，只会说着尖酸刻薄的话，那个愚昧的%SELF_CALL\(TARGET\)%……求求您忘记吧！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "159",
        any: [
          /^\s*PRINTFORMW 「现在想起来，简直……如此愚蠢的样子居然还不知耻地在您的面前放肆……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "160",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%想起了黑历史，似乎羞愧得无法自拔……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "161",
        any: [
          /^\s*PRINTFORMW 稍微冷静一会儿之後，%SAVESTR:TARGET%带着专注且期盼的眼神缓缓地说着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "162",
        any: [
          /^\s*PRINTFORMW 「遇见您让%SELF_CALL\(TARGET\)%感觉像是重生了一样，也唯独只有您让%SELF_CALL\(TARGET\)%有这样的感受。如果可以的话…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "163",
        any: [
          /^\s*PRINTFORMW 「能让卑微的%SELF_CALL\(TARGET\)%留在您的身边，替您分忧解劳吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "164",
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的身心都是完全属於您的，请您尽情地使用。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "165",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%谦卑地跪在你的面前，虔诚地亲吻着你的手背……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "166",
        any: [
          /^\s*CFLAG:201 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "166-167",
        any: [
          /^\s*CFLAG:201 = 6\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "169",
        any: [
          /^\s*ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "169-170",
        any: [
          /^\s*ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "171",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%正面对着墙壁自言自语。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "172",
        any: [
          /^\s*PRINTFORMW 一会儿微笑一会儿又怒吼着，甚至还会以头撞墙………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "173",
        any: [
          /^\s*PRINTFORMW 看来，%SAVESTR:TARGET%果然是被玩坏了………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "174",
        any: [
          /^\s*CFLAG:201 = 9\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "174-175",
        any: [
          /^\s*CFLAG:201 = 9\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "177",
        any: [
          /^\s*ELSEIF ASSI < 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "177-178",
        any: [
          /^\s*ELSEIF ASSI < 0\s*$\s*^\s*CALL K15_KOJO2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "236-237",
        any: [
          /^\s*;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "237-238",
        any: [
          /^\s*ELSE\s*$\s*^\s*CALL K15_KOJO2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "237-239",
        any: [
          /^\s*ELSE\s*$\s*^\s*CALL K15_KOJO2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "245-310",
        any: [
          /^\s*@K15_KOJO2\s*$\s*^\s*;反発刻印Lv3\s*$\s*^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「魔界的脸皮是不值钱的吧？因為連身為領導的魔王都只会用这些下三濫的技俩啊？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%毫不留情地冷嘲热讽着………\s*$\s*^\s*RETURN 1\s*$\s*^\s*;屈服刻印Lv0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "247",
        any: [
          /^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "247-248",
        any: [
          /^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "249",
        any: [
          /^\s*PRINTFORMW 「魔界的脸皮是不值钱的吧？因為連身為領導的魔王都只会用这些下三濫的技俩啊？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "250",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%毫不留情地冷嘲热讽着………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "250-251",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%毫不留情地冷嘲热讽着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "254",
        any: [
          /^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "254-255",
        any: [
          /^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "256-259",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「可以劳驾尊贵的魔王大人优雅且安静地滚开吗？」\s*$\s*^\s*DATAFORM 「也许，换一只猴子来代替您来调教，效果会更好呢？」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "260",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%嗤之以鼻地说着………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "260-261",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%嗤之以鼻地说着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "264",
        any: [
          /^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "264-265",
        any: [
          /^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "266",
        any: [
          /^\s*PRINTFORMW 「哦？魔王都是这么闲的吗？只做这些无用的事情？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "267",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈地摆摆手，用怀疑的语气说着………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "267-268",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈地摆摆手，用怀疑的语气说着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "271",
        any: [
          /^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "271-272",
        any: [
          /^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "273",
        any: [
          /^\s*PRINTFORMW 「只是习惯而已，难道还真以为那些手段会有用吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "274",
        any: [
          /^\s*PRINTFORMW 像是想要说服自己那样，%SAVESTR:TARGET%紧握着拳头………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "274-275",
        any: [
          /^\s*PRINTFORMW 像是想要说服自己那样，%SAVESTR:TARGET%紧握着拳头………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "278",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "278-279",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "280",
        any: [
          /^\s*PRINTFORMW 「反正不管说什么也没有用，%SELF_CALL\(TARGET\)%也就不想要白费力气了…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "281",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了那样，转过了头………\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "281-282",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了那样，转过了头………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "285",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "285-286",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "288-291",
        any: [
          /^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「今天要玩些什么呢？不瞒您说，%SELF_CALL\(TARGET\)%这淫乱的身体早已经等不及了……」\s*$\s*^\s*PRINTFORMW 「这个姿势可以看清楚吗？您看，这里变得这么的湿，这么热……」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "289",
        any: [
          /^\s*PRINTFORMW 「今天要玩些什么呢？不瞒您说，%SELF_CALL\(TARGET\)%这淫乱的身体早已经等不及了……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "290",
        any: [
          /^\s*PRINTFORMW 「这个姿势可以看清楚吗？您看，这里变得这么的湿，这么热……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "291",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "291-292",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎已经忘记什么叫做廉耻，正大张着双腿做出勾引的动作……\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "293",
        any: [
          /^\s*PRINTFORMW 「最近新学到一些……嗯，算是新的知识吧？可以的话，魔王大人愿意陪%SELF_CALL\(TARGET\)%来『实验』一下吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "294",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "294-295",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "294-296",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了意味深长的笑容，将身体紧贴着你并缓缓地摩擦着……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "299",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "299-300",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "302-303",
        any: [
          /^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "303",
        any: [
          /^\s*PRINTFORMW 「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "303-304",
        any: [
          /^\s*PRINTFORMW 「如果您允许的话，真想一直陪伴在您的身边，无论做什么事都可以……」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "305",
        any: [
          /^\s*PRINTFORMW 「一见到您，不知为何就幸福地想露出微笑，真是一种很奇妙的感觉。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "305-306",
        any: [
          /^\s*PRINTFORMW 「一见到您，不知为何就幸福地想露出微笑，真是一种很奇妙的感觉。」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "307",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "307-308",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "307-309",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "307-310",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸色微红地说着，露出期待的眼神凝视着你……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "316-324",
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;キャラ死亡時は口上をスキップ\s*$\s*^\s*SIF BASE:0 <= 0\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "316-400",
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:175 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;キャラ死亡時は口上をスキップ\s*$\s*^\s*SIF BASE:0 <= 0\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "330",
        any: [
          /^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "330-331",
        any: [
          /^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "332",
        any: [
          /^\s*PRINTFORMW 「真是人渣…！喔…抱歉，忘了你不是人族了，应该说人渣不如才对！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "333",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用冰冷且尖锐的言语怒骂了起来……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "333-334",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用冰冷且尖锐的言语怒骂了起来……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "337",
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "337-338",
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "339",
        any: [
          /^\s*PRINTFORMW 「就这…？再怎么做也是没用的！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "342",
        any: [
          /^\s*PRINTFORMW （为了那个人，%SELF_CALL\(TARGET\)%一定要逃离这个鬼地方才行！）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "343",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%皱着眉头咬着手指，似乎在思考什么的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "343-344",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%皱着眉头咬着手指，似乎在思考什么的样子……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "347",
        any: [
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "347-348",
        any: [
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "349",
        any: [
          /^\s*PRINTFORMW 「唔…嗯…总算是结束了…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "352",
        any: [
          /^\s*PRINTFORMW （就算是被做了这种事……为了那个人，%SELF_CALL\(TARGET\)%也不能放弃！）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "353",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%叹了一口气，露出若有所思的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "353-354",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%叹了一口气，露出若有所思的表情……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "357",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "357-358",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "359",
        any: [
          /^\s*PRINTFORMW 「如果再这样下去的话…该不会…已经……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "362",
        any: [
          /^\s*PRINTFORMW （这样的%SELF_CALL\(TARGET\)%……已经无法再回到那个人的身边了吧？）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "363",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低着头喃喃自语着，露出了放弃的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "363-364",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低着头喃喃自语着，露出了放弃的表情……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "367",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "367-368",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "367-369",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "370-371",
        any: [
          /^\s*PRINTFORMW 「开玩笑的啦！别生气喔？因为是魔王大人，%SELF_CALL\(TARGET\)%才会依依不舍啊！」\s*$\s*^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正在想着呆会该如何解决自己身体的火热……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "371",
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正在想着呆会该如何解决自己身体的火热……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "371-372",
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正在想着呆会该如何解决自己身体的火热……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "374",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "374-375",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "376-379",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「呼……只有魔王大人能把%SELF_CALL\(TARGET\)%弄成这样乱七八糟的样子呢~」\s*$\s*^\s*DATAFORM 「嗯啊…啊…嗯…真不愧是魔王大人，%SELF_CALL\(TARGET\)%被调教到腰都软了呢~」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "380",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，喘息地向你求饶着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "380-381",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，喘息地向你求饶着……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "384",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "384-385",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "384-386",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「咦…！？结束了吗…？呵呵…魔王大人您今天的状态不行哦…？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "387-388",
        any: [
          /^\s*PRINTFORMW 「开玩笑的啦！别生气喔？因为是魔王大人，%SELF_CALL\(TARGET\)%才会依依不舍啊！」\s*$\s*^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "388",
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "388-389",
        any: [
          /^\s*PRINTFORMW 尚有体力的%SAVESTR:TARGET%，正拉着你的袖子露出讨好的笑容，似乎很不舍得就这样与你分开……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "391",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "391-392",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\s*^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "393-396",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「唔…好想就这样一直和您合而为一啊…！」\s*$\s*^\s*DATAFORM 「%SELF_CALL\(TARGET\)%这体力真是不行，不知您觉得还满意吗？」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "397",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "397-398",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "397-399",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "397-400",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%的眼角带着情慾未退的潮红，亲昵地抱着你说着……\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "406",
        any: [
          /^\s*@KOJO_MESSAGE_COM_15\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "408-425",
        any: [
          /^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*;	RETURN 0\s*$\s*^\s*;ボールギャグ着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$\s*^\s*SIF TFLAG:899\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "411-412",
        any: [
          /^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "414-415",
        any: [
          /^\s*SIF TFLAG:899\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "417",
        any: [
          /^\s*IF TEQUIP:89\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "418",
        any: [
          /^\s*CALL DOG_KOJO_15\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "418-419",
        any: [
          /^\s*CALL DOG_KOJO_15\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "420-421",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;コロシアム中は専用口上\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "422",
        any: [
          /^\s*IF TEQUIP:55\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "423",
        any: [
          /^\s*CALL COLOSSEUM_KOJO_15\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "423-424",
        any: [
          /^\s*CALL COLOSSEUM_KOJO_15\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "423-425",
        any: [
          /^\s*CALL COLOSSEUM_KOJO_15\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "431-433",
        any: [
          /^\s*;愛撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "435-438",
        any: [
          /^\s*IF CFLAG:301 == 0\s*$\s*^\s*;屈服刻印Lv2以上\s*$\s*^\s*IF MARK:2 >= 2\s*$\s*^\s*PRINTFORMW 「不……不要摸……唔……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "437-438",
        any: [
          /^\s*IF MARK:2 >= 2\s*$\s*^\s*PRINTFORMW 「不……不要摸……唔……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "438",
        any: [
          /^\s*PRINTFORMW 「不……不要摸……唔……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "439",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭起眼睛，咬牙地忍耐着身体浮现的感觉……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "441-443",
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样触碰的话，除了恶心之外没有其他感觉。」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "442",
        any: [
          /^\s*PRINTFORMW 「这样触碰的话，除了恶心之外没有其他感觉。」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "443",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "443-444",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "443-445",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "443-446",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很厌恶被触摸的样子，露出了嫌弃的表情……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "448-450",
        any: [
          /^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "450",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "451-454",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊……好…好舒服……这样子……摸的话…会…会很快高潮的…嗯…啊啊～♡」\s*$\s*^\s*DATAFORM 「啊……嗯啊啊～身体好热……变得好想要了呢～♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "455",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的眼角染上情慾的红晕，主动将身体贴近%SAVESTR:PLAYER%了……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "455-456",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的眼角染上情慾的红晕，主动将身体贴近%SAVESTR:PLAYER%了……\s*$\s*^\s*CFLAG:301 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "458",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "459-462",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯……好…好舒服……请随意地……抚摸……嗯…啊啊～♡」\s*$\s*^\s*DATAFORM 「啊……嗯啊啊～身体好热……好喜欢被这样子抚摸～♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "463",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的双颊晕红，主动将身体贴近%SAVESTR:PLAYER%了……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "463-464",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的双颊晕红，主动将身体贴近%SAVESTR:PLAYER%了……\s*$\s*^\s*CFLAG:301 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "466-467",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「啊！……啊……嗯啊！……这种感觉……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "467",
        any: [
          /^\s*PRINTFORMW 「啊！……啊……嗯啊！……这种感觉……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "468",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的脸颊带着可疑的红晕，似乎无法承受%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "468-469",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的脸颊带着可疑的红晕，似乎无法承受%SAVESTR:PLAYER%的动作……\s*$\s*^\s*CFLAG:301 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "471-472",
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「不……就算是这样……也是没有用的……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "472",
        any: [
          /^\s*PRINTFORMW 「不……就算是这样……也是没有用的……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "473",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬紧牙关，转过头去忍耐着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "473-474",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬紧牙关，转过头去忍耐着%SAVESTR:PLAYER%的动作……\s*$\s*^\s*CFLAG:301 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "476-478",
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「住手！这么摸很恶心……不……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "477-481",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「住手！这么摸很恶心……不……」\s*$\s*^\s*DATAFORM 「技术这么差！难道没有自觉吗？」\s*$\s*^\s*DATAFORM 「一点也不舒服！可以劳驾您把脏手拿开吗？」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "482",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "482-483",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "482-484",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "482-485",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "482-486",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，露出了厌恶的表情……\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "487-490",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "492-497",
        any: [
          /^\s*IF SELECTCOM == 1\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:302 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:TARGET:0 == 1\s*$\s*^\s*PRINTFORMW 「走…走开啊！这……这…真是不敢相信！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "495-497",
        any: [
          /^\s*;処女\s*$\s*^\s*IF TALENT:TARGET:0 == 1\s*$\s*^\s*PRINTFORMW 「走…走开啊！这……这…真是不敢相信！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "497",
        any: [
          /^\s*PRINTFORMW 「走…走开啊！这……这…真是不敢相信！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "498",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎没想过会有人做出这种行为，露出了愤怒又觉得不可思议的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "499-501",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！居…居然……离%SELF_CALL\(TARGET\)%远点啊！走开！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "501",
        any: [
          /^\s*PRINTFORMW 「不！居…居然……离%SELF_CALL\(TARGET\)%远点啊！走开！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "502",
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "502-503",
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "502-505",
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "502-507",
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的行为让%SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "505-509",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "509",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "510",
        any: [
          /^\s*PRINTFORMW 「里面……都……都湿答答的了……舌头……再……进去一点……啊啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "511",
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让情慾高涨的%SAVESTR:TARGET%发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "511-512",
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让情慾高涨的%SAVESTR:TARGET%发出了淫荡的呻吟……\s*$\s*^\s*CFLAG:302 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "514",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "515",
        any: [
          /^\s*PRINTFORMW 「这样…会…会流出来的呀…嗯……啊啊♡……真是坏心眼」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "516",
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让%SAVESTR:TARGET%不由自主地发出了动情的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "516-517",
        any: [
          /^\s*PRINTFORMW 从下身传来的快感，让%SAVESTR:TARGET%不由自主地发出了动情的呻吟……\s*$\s*^\s*CFLAG:302 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "518-520",
        any: [
          /^\s*;屈服刻印Lv3\s*$\s*^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「唔！那…那个地方……不！不要……啊！啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "520",
        any: [
          /^\s*PRINTFORMW 「唔！那…那个地方……不！不要……啊！啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "521",
        any: [
          /^\s*PRINTFORMW 从下身传来的羞耻感，让%SAVESTR:TARGET%面色通红地扭动着身体……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "521-522",
        any: [
          /^\s*PRINTFORMW 从下身传来的羞耻感，让%SAVESTR:TARGET%面色通红地扭动着身体……\s*$\s*^\s*CFLAG:302 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "523-525",
        any: [
          /^\s*;それ以外（屈服刻印Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "525-529",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「恶心死了！滚开啊！」\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "525-538",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「恶心死了！滚开啊！」\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*ENDDATA\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "530",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "530-531",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "530-533",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "530-535",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "532-538",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル愛撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "540",
        any: [
          /^\s*IF SELECTCOM == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "542",
        any: [
          /^\s*IF CFLAG:303 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "543",
        any: [
          /^\s*PRINTFORMW 「你……你……在摸哪里？居然……不！……住手啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "544",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%先是呆愣了一下，後来马上羞愤地怒吼着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "545",
        any: [
          /^\s*CFLAG:TARGET:303 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "545-546",
        any: [
          /^\s*CFLAG:TARGET:303 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "547-549",
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*P = PALAM:3 \+ UP:3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "548-549",
        any: [
          /^\s*ELSE\s*$\s*^\s*P = PALAM:3 \+ UP:3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "551",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "552",
        any: [
          /^\s*PRINTFORMW 「啊！啊…不够…嗯……啊啊♡…还想要更多！快点！弄坏%SELF_CALL\(TARGET\)%吧♡♡…啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "553",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%那湿润的後穴就像是调教好的性器，饥渴地收缩着，似乎想要被更巨大的东西侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "554",
        any: [
          /^\s*CFLAG:303 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "556",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "557",
        any: [
          /^\s*PRINTFORMW 「啊！手指…再伸进来一点…嗯……啊啊♡……啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "558",
        any: [
          /^\s*PRINTFORMW 即使是尚未完全润滑好的後穴，也让%SAVESTR:TARGET%发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "559",
        any: [
          /^\s*CFLAG:303 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "561",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "562",
        any: [
          /^\s*PRINTFORMW 「啊～在…里面搅动着♡…嗯……啊啊♡……别这样欺负%SELF_CALL\(TARGET\)%啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "563",
        any: [
          /^\s*PRINTFORMW 从後孔传来的快感，让%SAVESTR:TARGET%不由自主地发出了动情的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "564",
        any: [
          /^\s*CFLAG:303 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "566",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "567",
        any: [
          /^\s*PRINTFORMW 「虽然…里面还没有很湿……啊…这种感觉……好奇怪啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "568",
        any: [
          /^\s*PRINTFORMW 即使是尚未完全润滑好的後穴，也似乎让%SAVESTR:TARGET%渐渐有了感觉……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "569",
        any: [
          /^\s*CFLAG:303 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "571",
        any: [
          /^\s*ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "572",
        any: [
          /^\s*PRINTFORMW 「唔！那…那个地方……不！不要……啊！啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "573",
        any: [
          /^\s*PRINTFORMW 从下身传来的羞耻感，让%SAVESTR:TARGET%面色通红地扭动着身体……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "574",
        any: [
          /^\s*CFLAG:303 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "576",
        any: [
          /^\s*ELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "577-583",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「恶心死了！這麼喜歡屁股的話，不會摸你自己的嗎！」\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*DATAFORM 「为何要摸这种地方？简直变态！」\s*$\s*^\s*DATAFORM 「对这个地方有兴趣？真不愧是变态中的翘楚呢！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "584",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "585",
        any: [
          /^\s*CFLAG:303 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "585-586",
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "585-588",
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "585-590",
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "586-592",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;自慰 CFLAG304\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "594",
        any: [
          /^\s*IF SELECTCOM == 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "596",
        any: [
          /^\s*IF CFLAG:304 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "597",
        any: [
          /^\s*PRINTFORMW 「什……什么？真是不敢相信！怎么会有这种要求……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "598",
        any: [
          /^\s*PRINTFORMW 「看來魔界的字典是沒有『羞恥』這兩個字對吧？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "599",
        any: [
          /^\s*PRINTFORMW 「可惡！%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%……居然要……嗚……嗯……唔……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "600",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%笨拙地抚摸着自己的下身，露出了屈辱的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "601",
        any: [
          /^\s*CFLAG:TARGET:304 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "601-602",
        any: [
          /^\s*CFLAG:TARGET:304 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "603-605",
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋処女\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "606",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "607",
        any: [
          /^\s*PRINTFORMW 「虽然还没开苞…但…但是……您看？这里……湿的不像样了♡…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "608",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却淫荡豪放地张开了大腿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "609",
        any: [
          /^\s*CFLAG:304 = 9\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "611",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "612-614",
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "614",
        any: [
          /^\s*PRINTFORMW 「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "614-615",
        any: [
          /^\s*PRINTFORMW 「被人看着自慰……真是太棒了♡…嗯啊…啊…啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "616",
        any: [
          /^\s*PRINTFORMW 「看啊！…这个…地方都不知廉耻地…流出蜜汁了♡…嗯啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "616-617",
        any: [
          /^\s*PRINTFORMW 「看啊！…这个…地方都不知廉耻地…流出蜜汁了♡…嗯啊…啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "618",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%深怕别人看不清楚自己发情的样子，夸张地张开了大腿并淫荡地呻吟着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "619",
        any: [
          /^\s*CFLAG:304 = 8\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "621",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "622-624",
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "624",
        any: [
          /^\s*PRINTFORMW 「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "624-625",
        any: [
          /^\s*PRINTFORMW 「看见了吗？下面的样子♡嗯～啊啊～但是好像不够呢？想要……好想要啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "626",
        any: [
          /^\s*PRINTFORMW 「肉棒不进来吗？要%SELF_CALL\(TARGET\)%自己来什么的……真是坏心眼啊！唔！嗯嗯！啊啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "626-627",
        any: [
          /^\s*PRINTFORMW 「肉棒不进来吗？要%SELF_CALL\(TARGET\)%自己来什么的……真是坏心眼啊！唔！嗯嗯！啊啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "628",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然想要的不是这个，但是还是听话地自慰了起来……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "629",
        any: [
          /^\s*CFLAG:304 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "631",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "632",
        any: [
          /^\s*PRINTFORMW 「这……这么羞耻的样子…如果想看的话…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "633",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却仍面红耳赤地张开了大腿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "634",
        any: [
          /^\s*CFLAG:304 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "636",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "637-639",
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2\s*$\s*^\s*PRINTFORMW 「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "639",
        any: [
          /^\s*PRINTFORMW 「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "639-640",
        any: [
          /^\s*PRINTFORMW 「嗯～♡啊啊……看到了吗…已经这么湿……满手……都是♡♡……嗯啊～啊…啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "641",
        any: [
          /^\s*PRINTFORMW 「看……看清楚了吗……%SELF_CALL\(TARGET\)%……自慰着发情的样子♡♡……嗯啊～啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "641-642",
        any: [
          /^\s*PRINTFORMW 「看……看清楚了吗……%SELF_CALL\(TARGET\)%……自慰着发情的样子♡♡……嗯啊～啊…啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "643",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%急促地喘息着，似乎沉醉在自慰的快感里面了……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "644",
        any: [
          /^\s*CFLAG:304 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "646",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "647-649",
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「就……就这么喜欢看…%SELF_CALL\(TARGET\)%……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "649",
        any: [
          /^\s*PRINTFORMW 「就……就这么喜欢看…%SELF_CALL\(TARGET\)%……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "649-650",
        any: [
          /^\s*PRINTFORMW 「就……就这么喜欢看…%SELF_CALL\(TARGET\)%……羞耻的样子吗？…嗯啊…啊…啊啊♡♡！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "651",
        any: [
          /^\s*PRINTFORMW 「这……这里…能看清楚吗？……可……可以吗……唔！啊啊！啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "651-652",
        any: [
          /^\s*PRINTFORMW 「这……这里…能看清楚吗？……可……可以吗……唔！啊啊！啊啊♡♡！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "653",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然面红耳赤，但是还是柔顺地张开了大腿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "654",
        any: [
          /^\s*CFLAG:304 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "656",
        any: [
          /^\s*ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "657-659",
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「呜……不……这个样子……嗯…啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "659",
        any: [
          /^\s*PRINTFORMW 「呜……不……这个样子……嗯…啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "659-660",
        any: [
          /^\s*PRINTFORMW 「呜……不……这个样子……嗯…啊…啊啊！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "661",
        any: [
          /^\s*PRINTFORMW 「不……为什么会…唔！……嗯…啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "661-662",
        any: [
          /^\s*PRINTFORMW 「不……为什么会…唔！……嗯…啊…啊啊！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "663",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎因为自慰而有了感觉，面红耳赤地闭起了眼睛……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "664",
        any: [
          /^\s*CFLAG:304 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "666",
        any: [
          /^\s*ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "667-669",
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「喜欢看这种事情？果然真是有病！嗯……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "669",
        any: [
          /^\s*PRINTFORMW 「喜欢看这种事情？果然真是有病！嗯……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "669-670",
        any: [
          /^\s*PRINTFORMW 「喜欢看这种事情？果然真是有病！嗯……唔！」\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "671",
        any: [
          /^\s*PRINTFORMW 「無須勞煩您的尊駕，%SELF_CALL\(TARGET\)%自己来好多了！嗯……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "671-672",
        any: [
          /^\s*PRINTFORMW 「無須勞煩您的尊駕，%SELF_CALL\(TARGET\)%自己来好多了！嗯……唔！」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "673",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边不满地抗议，一边羞愤地进行着自慰……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "674",
        any: [
          /^\s*CFLAG:304 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "674-675",
        any: [
          /^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "674-677",
        any: [
          /^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "674-679",
        any: [
          /^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "675-681",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "681-684",
        any: [
          /^\s*;胸愛撫 CFLAG:306\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 5\s*$\s*^\s*;初めて\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "683-687",
        any: [
          /^\s*IF SELECTCOM == 5\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:306 == 0\s*$\s*^\s*;愛\s*$\s*^\s*IF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "687",
        any: [
          /^\s*IF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "688",
        any: [
          /^\s*PRINTFORMW 「有…有点害羞……但是……很舒服……请再……再……嗯…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "689",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的耳根羞红，顺从地任由%SAVESTR:PLAYER%的双手在胸部上游移……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "690-692",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这…这种痴汉似的举动……可真……配得上你的身份啊！……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "692",
        any: [
          /^\s*PRINTFORMW 「这…这种痴汉似的举动……可真……配得上你的身份啊！……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "693",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "693-694",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "693-696",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "693-698",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬牙切齿地说着…只可惜那断断续续的语句早没有了威吓的效果……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "696-700",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "700",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "701",
        any: [
          /^\s*PRINTFORMW 「嗯…啊啊……好……好棒……再……用力……用力……嗯～啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "702",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%那柔软的胸部被任意搓揉着，随着传来的快感发出了高亢的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "702-703",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%那柔软的胸部被任意搓揉着，随着传来的快感发出了高亢的呻吟……\s*$\s*^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "705",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\) && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "706",
        any: [
          /^\s*PRINTFORMW 「嗯…啊啊……唔！……嗯……啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "707",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%在%NAME:MASTER%的注视之下，被%SAVESTR:PLAYER%玩弄着胸部……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "708",
        any: [
          /^\s*PRINTFORMW 尽管努力地忍耐着不想发出声音，但是无奈身体的快感太过强烈，还是泄露出来呻吟的声音……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "708-709",
        any: [
          /^\s*PRINTFORMW 尽管努力地忍耐着不想发出声音，但是无奈身体的快感太过强烈，还是泄露出来呻吟的声音……\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "710",
        any: [
          /^\s*PRINTFORMW 「嗯…啊啊……很…很舒服……嗯……想…还想要……嗯～啊啊♡♡！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "711",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满面红晕地看着%SAVESTR:PLAYER%的动作，发出了急促的喘息……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "711-712",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满面红晕地看着%SAVESTR:PLAYER%的动作，发出了急促的喘息……\s*$\s*^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "713-715",
        any: [
          /^\s*;B感覚Lv3以上\s*$\s*^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "715-718",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不！不要再捏乳头了！会……唔～嗯……啊啊啊～」\s*$\s*^\s*DATAFORM 「不！不要再揉胸部了！会……唔～嗯……啊啊啊～」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "719-722",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%扭动着身体想要抵抗那异样的快感……\s*$\s*^\s*DATAFORM 揉捏胸部似乎让%SAVESTR:TARGET%非常有感觉的样子……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "722-723",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:306 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "724-726",
        any: [
          /^\s*;それ以外（愛無し、B感覚Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "726-731",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不要！可恶！走开啊！听不懂人话吗！」\s*$\s*^\s*DATAFORM 「可恶！做的事情真是令人作呕！」\s*$\s*^\s*DATAFORM 「脏死了！不要碰%SELF_CALL\(TARGET\)%！」\s*$\s*^\s*DATAFORM 「住手！恶心死了！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "732",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "732-733",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "732-735",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "732-737",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "732-739",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤异常地怒吼着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "734-740",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;キスする CFLAG:307\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "740-743",
        any: [
          /^\s*;キスする CFLAG:307\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 6\s*$\s*^\s*;ファーストキス\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "743-745",
        any: [
          /^\s*;ファーストキス\s*$\s*^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$\s*^\s*;淫乱かつ主人\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "746",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "747",
        any: [
          /^\s*PRINTFORMW 「啾！嗯～早就想跟主人接吻了～果然…主人是最棒的♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "748",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是意犹未尽的舔着嘴唇，但是眼神却游移地看着%SAVESTR:PLAYER%，似乎还想要更『刺激』的东西……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "750",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "751",
        any: [
          /^\s*PRINTFORMW 「啾！嗯～早就想跟主人接吻了～果然…真的好幸福呢♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "752",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满足地眯起了眼睛，露出幸福的表情倚靠在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "753-755",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯……不！…别……可恶！……恶……恶心！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "755",
        any: [
          /^\s*PRINTFORMW 「嗯……不！…别……可恶！……恶……恶心！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "756",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%拼命地想把头转过去，然而下巴却被%SAVESTR:PLAYER%紧紧捏住而无法躲避，就这样子被夺走了初吻……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "757",
        any: [
          /^\s*PRINTFORMW 「是不是没人想跟你接吻，所以只能用强迫的手段？真是卑劣！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "758",
        any: [
          /^\s*PRINTFORM %SAVESTR:TARGET%\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "760",
        any: [
          /^\s*PRINTFORM 像擦拭什么脏东西那样，用力地用手模擦着自己的嘴唇，\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "761",
        any: [
          /^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "761-762",
        any: [
          /^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "761-764",
        any: [
          /^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "761-766",
        any: [
          /^\s*PRINTFORMW 恼怒地说着挑衅着话语……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;（調教では）初めて\s*$\s*^\s*ELSEIF CFLAG:307 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "765-767",
        any: [
          /^\s*;（調教では）初めて\s*$\s*^\s*ELSEIF CFLAG:307 == 0\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "767-769",
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW 「嗯…咕啾…啊啊…舌……舌头♡……嗯……好…好棒～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "769",
        any: [
          /^\s*PRINTFORMW 「嗯…咕啾…啊啊…舌……舌头♡……嗯……好…好棒～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "770",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%任由%SAVESTR:PLAYER%的舌头深入口腔中肆虐，激烈的亲吻让银丝从嘴角流下……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "772",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "773",
        any: [
          /^\s*PRINTFORMW 「如果……这是主人……的命令…唔…唔…嗯…嗯」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "774",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从与%SAVESTR:PLAYER%亲吻着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "774-775",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从与%SAVESTR:PLAYER%亲吻着……\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "776",
        any: [
          /^\s*PRINTFORMW 「嗯……啊……嗯嗯～啾♡～啊～嘻嘻…好高兴…♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "777",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面带红晕，高兴地眯起了眼睛，沉醉在与%SAVESTR:PLAYER%的亲吻之中……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "778-780",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「谁要跟你这种……唔！…不……唔……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "780",
        any: [
          /^\s*PRINTFORMW 「谁要跟你这种……唔！…不……唔……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "781",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "781-782",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "781-784",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "781-786",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%非常抗拒%SAVESTR:PLAYER%亲吻的样子……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "784-788",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "788",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "789",
        any: [
          /^\s*PRINTFORMW 「嗯～啊………好……好棒♡……还……还要……啾～咕啾～嗯…～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "790",
        any: [
          /^\s*IF TEQUIP:44\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "791",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，饥渴地与对方交换着唾液……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "791-792",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，饥渴地与对方交换着唾液……\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "793",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，双手在对方身上激烈的抚弄着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "793-794",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地伸出舌头与%SAVESTR:PLAYER%交缠着，双手在对方身上激烈的抚弄着……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "794-795",
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "797",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\) && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "798",
        any: [
          /^\s*PRINTFORMW 「嗯…啊…这……唔……啾……唔…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "799",
        any: [
          /^\s*PRINTFORMW （这样子做……主人会开心吗……？）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "800",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%心神不宁地想着%NAME:MASTER%的事情，顺从与%SAVESTR:PLAYER%亲吻着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "800-801",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%心神不宁地想着%NAME:MASTER%的事情，顺从与%SAVESTR:PLAYER%亲吻着……\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "802",
        any: [
          /^\s*PRINTFORMW 「嗯…啊……喜……喜欢♡……啾……好……幸福♡♡……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "803",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%閉上眼睛柔顺地迎合着%SAVESTR:PLAYER%的亲吻。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "804",
        any: [
          /^\s*PRINTFORMW 同時像是挑逗一樣伸出了舌尖試探，兩人像是怎樣都親吻不夠似地熱吻著……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "804-805",
        any: [
          /^\s*PRINTFORMW 同時像是挑逗一樣伸出了舌尖試探，兩人像是怎樣都親吻不夠似地熱吻著……\s*$\s*^\s*CFLAG:307 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "806-808",
        any: [
          /^\s*;従順Lv2以上\s*$\s*^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「唔……嗯嗯……算了………嗯……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "808",
        any: [
          /^\s*PRINTFORMW 「唔……嗯嗯……算了………嗯……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "809",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了抵抗，皱着眉头忍受着%SAVESTR:PLAYER%的亲吻……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "809-810",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是放弃了抵抗，皱着眉头忍受着%SAVESTR:PLAYER%的亲吻……\s*$\s*^\s*CFLAG:307 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "811-813",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTFORMW 「居然……又……唔！…不…不要……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "813",
        any: [
          /^\s*PRINTFORMW 「居然……又……唔！…不…不要……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "814",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "814-815",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "814-817",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "814-819",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "814-821",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了厌恶至极的表情……\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "816-822",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;秘貝開帳 CFLAG:308\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "824",
        any: [
          /^\s*IF SELECTCOM == 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "826",
        any: [
          /^\s*IF CFLAG:308 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "827-829",
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW 「嗯？很想看吗？可以哦♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "829",
        any: [
          /^\s*PRINTFORMW 「嗯？很想看吗？可以哦♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "830",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地用手指拨开着阴唇，大方地展示着那最私密的地方……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "831-833",
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW 「虽然很羞耻……但是……如果是魔王大人想看的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "833",
        any: [
          /^\s*PRINTFORMW 「虽然很羞耻……但是……如果是魔王大人想看的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "834",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的耳根通红，顺从地用手指拨开着阴唇，展示着那最私密的地方……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "835-837",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居……居然……让%SELF_CALL\(TARGET\)%……做这种事情……可恶！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "837",
        any: [
          /^\s*PRINTFORMW 「居……居然……让%SELF_CALL\(TARGET\)%……做这种事情……可恶！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "838",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不甘愿且笨拙地用手指拨开了自己下身的阴唇……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "838-839",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不甘愿且笨拙地用手指拨开了自己下身的阴唇……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "840",
        any: [
          /^\s*CFLAG:TARGET:308 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "840-841",
        any: [
          /^\s*CFLAG:TARGET:308 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "841-845",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "845",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "846",
        any: [
          /^\s*PRINTFORMW 「嗯……这样……有看清楚里面吗？……啊…在收缩着哦♡…很想要的样子……嘿嘿♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "847",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "847-848",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$\s*^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "850",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "851",
        any: [
          /^\s*PRINTFORMW 「嗯……请…请看吧……这个姿势能看清楚吗……嗯～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "852",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "852-853",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从地用手指拨开着阴唇，让%SAVESTR:PLAYER%完全看清处里面肉壁收缩着的样子……\s*$\s*^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "855",
        any: [
          /^\s*ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "856",
        any: [
          /^\s*PRINTFORMW 「嗯……不……再这样盯着看……会……唔！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "857",
        any: [
          /^\s*PRINTFORMW （明明……不想要这样的，这…这种奇怪的感觉……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "858",
        any: [
          /^\s*PRINTFORMW 感受到视线集中到那私密的地方的时候，%SAVESTR:TARGET%似乎有了特别的感觉……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "858-859",
        any: [
          /^\s*PRINTFORMW 感受到视线集中到那私密的地方的时候，%SAVESTR:TARGET%似乎有了特别的感觉……\s*$\s*^\s*CFLAG:306 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "860-861",
        any: [
          /^\s*;それ以外（愛無し、露出癖Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "862",
        any: [
          /^\s*PRINTFORMW 「这样……够了吧！别……别再看了！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "863",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "863-864",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "863-866",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "863-868",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "863-870",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%羞愤地转过了头去，那拨开阴唇的手指正微微地颤抖着……\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "865-871",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;指挿入れ CFLAG:309\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "873",
        any: [
          /^\s*IF SELECTCOM == 8\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "875",
        any: [
          /^\s*IF CFLAG:TARGET:309 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "875-878",
        any: [
          /^\s*IF CFLAG:TARGET:309 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "875-884",
        any: [
          /^\s*IF CFLAG:TARGET:309 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;屈服刻印Lv3\+愛\s*$\s*^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "878",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "880-886",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "881",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "884",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "884-886",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "886",
        any: [
          /^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "886-887",
        any: [
          /^\s*CFLAG:TARGET:309 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "887-891",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "891",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "892",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "893",
        any: [
          /^\s*CFLAG:309 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "895",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "896",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "897",
        any: [
          /^\s*CFLAG:309 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "899",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "900",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "901",
        any: [
          /^\s*CFLAG:309 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "903",
        any: [
          /^\s*ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "904",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "905",
        any: [
          /^\s*CFLAG:309 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "905-906",
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "905-908",
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "905-910",
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "906-912",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "912-915",
        any: [
          /^\s*;アナル舐め CFLAG:310\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 9\s*$\s*^\s*;初めて\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "915-917",
        any: [
          /^\s*;初めて\s*$\s*^\s*IF CFLAG:310 == 0\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "916-919",
        any: [
          /^\s*IF CFLAG:310 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "918-923",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;愛\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外（愛無し）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "919",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "921-927",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "922",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "925",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "925-927",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "925-928",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "925-930",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "928-932",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "932",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "933",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "933-934",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "935-937",
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "937",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "937-938",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "939-941",
        any: [
          /^\s*;屈服刻印Lv3\s*$\s*^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "941",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "941-942",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "943-945",
        any: [
          /^\s*;それ以外（屈服刻印Lv3未満）\s*$\s*^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "945",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "945-946",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "945-948",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "945-950",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "945-952",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "947-953",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;ローター CFLAG:311\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "955",
        any: [
          /^\s*IF SELECTCOM == 10\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "957",
        any: [
          /^\s*IF CFLAG:TARGET:311 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "957-960",
        any: [
          /^\s*IF CFLAG:TARGET:311 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "957-966",
        any: [
          /^\s*IF CFLAG:TARGET:311 == 0\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;屈服刻印Lv3\+愛\s*$\s*^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "960",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "962-968",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "963",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "966",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "966-968",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "968",
        any: [
          /^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "968-969",
        any: [
          /^\s*CFLAG:TARGET:311 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "969-973",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "973",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "974",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "975",
        any: [
          /^\s*CFLAG:311 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "977",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "978",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "979",
        any: [
          /^\s*CFLAG:311 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "981",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "982",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "983",
        any: [
          /^\s*CFLAG:311 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "985",
        any: [
          /^\s*ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "986",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "987",
        any: [
          /^\s*CFLAG:311 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "987-988",
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "987-990",
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "987-992",
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "988-994",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;壺ワーム CFLAG:312　CFLAG:372\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "997",
        any: [
          /^\s*IF SELECTCOM == 11 && TEQUIP:11\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "999",
        any: [
          /^\s*IF CFLAG:TARGET:312 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "999-1002",
        any: [
          /^\s*IF CFLAG:TARGET:312 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1002-1004",
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「嗯…啊……啊……钻…钻进来了呢♡♡……啊……啊啊…嗯…～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1004",
        any: [
          /^\s*PRINTFORMW 「嗯…啊……啊……钻…钻进来了呢♡♡……啊……啊啊…嗯…～嗯啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1005",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%毫不介意自己被壶虫所破处，甚至还发出了欢愉的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1006-1008",
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW 「主人不想要%SELF_CALL\(TARGET\)%的处女吗？……唔……%SELF_CALL\(TARGET\)%明白了…嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1008",
        any: [
          /^\s*PRINTFORMW 「主人不想要%SELF_CALL\(TARGET\)%的处女吗？……唔……%SELF_CALL\(TARGET\)%明白了…嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1009",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎有点失望的样子，但还是顺从地任由壶虫钻入了那处女的小穴之中……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1010-1012",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1012",
        any: [
          /^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1013",
        any: [
          /^\s*PRINTFORMW 被壶虫破处的%SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1013-1014",
        any: [
          /^\s*PRINTFORMW 被壶虫破处的%SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1013-1018",
        any: [
          /^\s*PRINTFORMW 被壶虫破处的%SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$\s*^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1017-1019",
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「哈啊～嗯…啊……啊～在…在里面动呢♡……啊！…钻得…好深♡……～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1019",
        any: [
          /^\s*PRINTFORMW 「哈啊～嗯…啊……啊～在…在里面动呢♡……啊！…钻得…好深♡……～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1020",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满脸带着情慾的红晕，似乎很享受壶虫带来的快感……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1021-1023",
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW 「嗯～唔……不……不要用这个……欺负%SELF_CALL\(TARGET\)%嘛……唔……啊～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1023",
        any: [
          /^\s*PRINTFORMW 「嗯～唔……不……不要用这个……欺负%SELF_CALL\(TARGET\)%嘛……唔……啊～嗯啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1024",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%看似不太愿意的样子，但是那身体似乎已经感到了快感……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1025-1027",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1027",
        any: [
          /^\s*PRINTFORMW 「居…居然让这么脏的东西…不！不要再钻进去了！啊！啊啊啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1028",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1028-1029",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%难以置信地张大双眼，发出了凄厉的悲鸣……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1029-1031",
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:312 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1031",
        any: [
          /^\s*CFLAG:312 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1031-1032",
        any: [
          /^\s*CFLAG:312 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1032-1036",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1036",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1037",
        any: [
          /^\s*PRINTFORMW 「哈啊～嗯啊……好…好棒……看…看见了吗？钻进去了喔♡～呵呵♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1038",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是发情地呻吟着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1039",
        any: [
          /^\s*CFLAG:312 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1041",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1042",
        any: [
          /^\s*PRINTFORMW 「啊～进…进来了…不……不可以…钻这么深啊…啊啊♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1043",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面色红晕地喘息着，下身也因为壶虫的进出与小穴肉壁的摩擦，不停地发出淫糜的水音……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1044",
        any: [
          /^\s*CFLAG:312 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1046",
        any: [
          /^\s*ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1047",
        any: [
          /^\s*PRINTFORMW 「啊…哈啊……不…不行！里面会……嗯啊…啊啊啊～」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1048",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎想要抗拒壶虫带来的感觉，扭动着身体也无法阻止那从小穴发出的淫糜水音……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1049",
        any: [
          /^\s*CFLAG:312 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1051",
        any: [
          /^\s*ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1052",
        any: [
          /^\s*PRINTFORMW 「不……不要虫子！拿…拿走啊！唔……啊…啊啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1053",
        any: [
          /^\s*PRINTFORMW 即使%SAVESTR:TARGET%拼命地挣扎，还是被硬生生地被%SAVESTR:PLAYER%掰开了大腿，任由壶虫钻了进去……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1054",
        any: [
          /^\s*CFLAG:312 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1054-1055",
        any: [
          /^\s*CFLAG:312 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1054-1057",
        any: [
          /^\s*CFLAG:312 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1055-1059",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1059",
        any: [
          /^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1061",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1062",
        any: [
          /^\s*PRINTFORMW 随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1063",
        any: [
          /^\s*PRINTFORMW 「嗯啊啊～拔出来了呢♡……总觉得……有点……寂寞呢♡♡？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1064",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%喘息着沉浸在壶虫带来的余韵之中，大腿像是故意那样地张开展示着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1065",
        any: [
          /^\s*CFLAG:372 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1067",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1068",
        any: [
          /^\s*PRINTFORMW 随着壶虫的拔除，带着透明的淫丝牵连带出，一股股蜜液正从那小穴流出打湿了大腿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1069",
        any: [
          /^\s*PRINTFORMW 「这…是因为太想要主人了……所以…抱…抱歉……擅自流出…这么多……呜」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1070",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满脸羞红，拼命地想要解释下身为何如此不像话的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1071",
        any: [
          /^\s*CFLAG:372 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1073",
        any: [
          /^\s*ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1074",
        any: [
          /^\s*PRINTFORMW 「呜……终於……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1075",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%松了一口气，身体仍带着刺激过後的颤抖……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1076",
        any: [
          /^\s*CFLAG:372 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1076-1077",
        any: [
          /^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1076-1079",
        any: [
          /^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1076-1081",
        any: [
          /^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1084",
        any: [
          /^\s*IF SELECTCOM == 12\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1086",
        any: [
          /^\s*IF CFLAG:313 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1087-1089",
        any: [
          /^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「这个道具看起来真刺激……好…好有趣啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1089",
        any: [
          /^\s*PRINTFORMW 「这个道具看起来真刺激……好…好有趣啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1090",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用期待的眼神看着%SAVESTR:PLAYER%手中的道具，相当配合地任由摆弄……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1091-1093",
        any: [
          /^\s*;愛\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW 「这个道具是？啊！……震…震的好厉害啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1093",
        any: [
          /^\s*PRINTFORMW 「这个道具是？啊！……震…震的好厉害啊！嗯啊♡…啊……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1094",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%顺从地任由%SAVESTR:PLAYER%摆弄着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1095-1097",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哼！借助道具？这就是你的本事吗？不！拿…拿开啊……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1097",
        any: [
          /^\s*PRINTFORMW 「哼！借助道具？这就是你的本事吗？不！拿…拿开啊……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1098",
        any: [
          /^\s*PRINTFORMW 无视%SAVESTR:TARGET%的冷嘲热讽与抗议，%SAVESTR:PLAYER%将振动着的道具紧贴着%SAVESTR:TARGET%的股间……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1098-1099",
        any: [
          /^\s*PRINTFORMW 无视%SAVESTR:TARGET%的冷嘲热讽与抗议，%SAVESTR:PLAYER%将振动着的道具紧贴着%SAVESTR:TARGET%的股间……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1100",
        any: [
          /^\s*CFLAG:313 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1100-1101",
        any: [
          /^\s*CFLAG:313 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1101-1105",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1105",
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1106",
        any: [
          /^\s*PRINTFORMW 「啊！这…好有感觉……再这样……这里就要♡……嗯啊♡……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1107",
        any: [
          /^\s*CFLAG:313 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1109",
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1110",
        any: [
          /^\s*PRINTFORMW 「就算不用道具…只要对象是魔王大人…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%也会…嗯啊♡……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1111",
        any: [
          /^\s*CFLAG:313 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1113",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1114",
        any: [
          /^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1115",
        any: [
          /^\s*CFLAG:313 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1117",
        any: [
          /^\s*ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1118",
        any: [
          /^\s*PRINTFORMW 「不！拿…拿开啊！不要再震了……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1119",
        any: [
          /^\s*CFLAG:313 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1119-1120",
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1119-1122",
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1119-1123",
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1129",
        any: [
          /^\s*IF SELECTCOM == 13 && TEQUIP:13\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1131",
        any: [
          /^\s*IF CFLAG:TARGET:314 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1134",
        any: [
          /^\s*PRINTFORMW 「让虫子进来？没试过呢～可以哦♡………嗯……啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1135",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很感兴趣的样子，迫不及待地掰开了臀瓣配合着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1138",
        any: [
          /^\s*PRINTFORMW 「为何……要用虫子欺负这里…好…好奇怪啊…嗯……啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1139",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%似乎有点紧张，但是还是听话顺从地配合着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1140-1142",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「什么？如此肮脏的虫子要……不……拜托……不要这样…啊！不行！不要啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1142",
        any: [
          /^\s*PRINTFORMW 「什么？如此肮脏的虫子要……不……拜托……不要这样…啊！不行！不要啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1143",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊恐地挣扎着，但是还是被压制住并塞入了肛门虫……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1144",
        any: [
          /^\s*PRINTFORMW 那虫子在肠内蠕动的感觉，让%SAVESTR:TARGET%发出了歇斯底里的悲鸣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1144-1146",
        any: [
          /^\s*PRINTFORMW 那虫子在肠内蠕动的感觉，让%SAVESTR:TARGET%发出了歇斯底里的悲鸣……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:314 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1146",
        any: [
          /^\s*CFLAG:TARGET:314 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1146-1148",
        any: [
          /^\s*CFLAG:TARGET:314 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1147-1151",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1151",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1152",
        any: [
          /^\s*PRINTFORMW 「嗯～啊啊……宝贝♡好…好乖啊……在里面钻着呢♡呵呵～嗯…啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1153",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%沉迷在肛门虫带来的快感，满足地抚摸着屁股并发出了动情的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1156",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1157",
        any: [
          /^\s*PRINTFORMW 「又要用这个来欺负%SELF_CALL\(TARGET\)%吗？呵呵～真坏……嗯…啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1158",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%熟练地拨开臀瓣，积极地迎接着肛门虫的进入……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1161",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1162",
        any: [
          /^\s*PRINTFORMW 「嗯～啊啊…抱…抱歉……屁股擅自就有了感觉♡但…但是……嗯…啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1163",
        any: [
          /^\s*PRINTFORMW 屁股正被肛门虫侵犯的%SAVESTR:TARGET%想试着解释些什么，但是都被那欢愉的呻吟打断了……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1164",
        any: [
          /^\s*CFLAG:314 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1166",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1167",
        any: [
          /^\s*PRINTFORMW 「比…比起这个……%SELF_CALL\(TARGET\)%……比较喜欢魔王大人的……唔…嗯…啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1168",
        any: [
          /^\s*PRINTFORMW 即使屁股正在被肛门虫侵犯着，%SAVESTR:TARGET%仍断断续续地试着表达对魔王的爱意……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1169",
        any: [
          /^\s*CFLAG:314 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1171",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1172",
        any: [
          /^\s*PRINTFORMW 「不……别……嗯啊啊！里面……嗯…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1173",
        any: [
          /^\s*PRINTFORMW 从後穴里面传来的异样快感，让%SAVESTR:TARGET%皱着眉头发出了断断续续的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1174",
        any: [
          /^\s*CFLAG:314 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1176",
        any: [
          /^\s*ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1177",
        any: [
          /^\s*PRINTFORMW 「不…不要虫子……拜托……不…不要啊！！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1178",
        any: [
          /^\s*PRINTFORMW 从後穴里面传来的异物感以及蠕动感，让%SAVESTR:TARGET%发出了惊恐的悲鸣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1179",
        any: [
          /^\s*CFLAG:314 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1179-1181",
        any: [
          /^\s*CFLAG:314 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1179-1183",
        any: [
          /^\s*CFLAG:314 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1180-1184",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1184",
        any: [
          /^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1186",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1187",
        any: [
          /^\s*PRINTFORMW 「欸……要拿走了吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1188",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了有点不舍的表情……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1189",
        any: [
          /^\s*CFLAG:374 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1191",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1192",
        any: [
          /^\s*PRINTFORMW 「啊！等等……不……没事……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1193",
        any: [
          /^\s*PRINTFORMW 当%SAVESTR:PLAYER%移除肛门虫之後，%SAVESTR:TARGET%似乎欲言又止的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1194",
        any: [
          /^\s*CFLAG:374 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1196",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1197",
        any: [
          /^\s*PRINTFORMW 「唔……终於……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1198",
        any: [
          /^\s*PRINTFORMW 虽然移除肛门虫让%SAVESTR:TARGET%松了口气，但是後穴又隐隐传来了空虚的感觉……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1199",
        any: [
          /^\s*CFLAG:374 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1201",
        any: [
          /^\s*ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1202",
        any: [
          /^\s*PRINTFORMW 「呼……呜……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1203",
        any: [
          /^\s*PRINTFORMW 移除了让%SAVESTR:TARGET%抓狂的肛门虫之後，那过度的刺激让他心有余悸地颤抖着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1204",
        any: [
          /^\s*CFLAG:374 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1204-1206",
        any: [
          /^\s*CFLAG:374 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1204-1208",
        any: [
          /^\s*CFLAG:374 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1204-1210",
        any: [
          /^\s*CFLAG:374 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;クリキャップ CFLAG:315　CFLAG:375\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1429",
        any: [
          /^\s*IF SELECTCOM == 19 && TEQUIP:19\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1431",
        any: [
          /^\s*IF CFLAG:TARGET:320 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1434",
        any: [
          /^\s*PRINTFORMW 「这个？要塞进屁股吗？呵呵～真有意思呢……嗯……好啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1435",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饶有兴致地看着肛珠，主动地拨开了自己的臀瓣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1438",
        any: [
          /^\s*PRINTFORMW 「欸？这个……要塞进去……好……%SELF_CALL\(TARGET\)%……知道了……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1439",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎有点紧张，但仍然顺从地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1440-1442",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这个癖好也太恶心了……为什么要用道具玩弄这个地方……呜」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1442",
        any: [
          /^\s*PRINTFORMW 「这个癖好也太恶心了……为什么要用道具玩弄这个地方……呜」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1443",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地挣扎着，但是即使激烈抵抗，那肛珠还是一颗颗地塞入了体内……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1443-1445",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地挣扎着，但是即使激烈抵抗，那肛珠还是一颗颗地塞入了体内……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:320 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1445",
        any: [
          /^\s*CFLAG:TARGET:320 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1445-1447",
        any: [
          /^\s*CFLAG:TARGET:320 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1446-1450",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1450",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1451",
        any: [
          /^\s*PRINTFORMW 「嗯…哈啊～里面…塞的满满的喔♡真的好舒服呢～…嗯…啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1452",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%发出动情的浪叫，沉醉在肛珠带来的快感之中。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1453",
        any: [
          /^\s*CFLAG:320 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1455",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1456",
        any: [
          /^\s*PRINTFORMW 「道具啊～嗯……那就来吧……啊～再…再放进去一点嘛～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1457",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地拨开自己的臀瓣，配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1458",
        any: [
          /^\s*CFLAG:320 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1460",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1461",
        any: [
          /^\s*PRINTFORMW 「嗯…啊啊～区区…道具…是比不上魔王大人的！…嗯…啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1462",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%这么说着，但是那扭动的身体与发出的呻吟，怎么看都像是很有感觉的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1463",
        any: [
          /^\s*CFLAG:320 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1465",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1466",
        any: [
          /^\s*PRINTFORMW 「怎么就喜欢用道具欺负%SELF_CALL\(TARGET\)%呢……真拿魔王大人没办法……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1467",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%尽管这么说，但仍然顺从地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1468",
        any: [
          /^\s*CFLAG:320 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1470",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1471",
        any: [
          /^\s*PRINTFORMW 「不…不……才…才没有感觉呢…呜……可恶……啊…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1472",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%说着拒绝以及讨厌的话，但是那扭動的身体却似乎已经背叛了意志产生了快感……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1473",
        any: [
          /^\s*CFLAG:320 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1475",
        any: [
          /^\s*ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1476",
        any: [
          /^\s*PRINTFORMW 「就……就算用这种方式折辱%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%也……唔！……可恶……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1477",
        any: [
          /^\s*PRINTFORMW 即使%SAVESTR:TARGET%厌恶地挣扎着，那肛珠依然一颗颗地塞入了体内……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1478",
        any: [
          /^\s*CFLAG:320 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1478-1480",
        any: [
          /^\s*CFLAG:320 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1478-1482",
        any: [
          /^\s*CFLAG:320 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1479-1483",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1483",
        any: [
          /^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1485",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1487",
        any: [
          /^\s*PRINTFORMW 「等等可以放更『大』的东西进来吗？呵呵♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1488",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%轻轻地抚摸着自己的屁股，意犹未尽地询问着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1489",
        any: [
          /^\s*CFLAG:379 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1491",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1493",
        any: [
          /^\s*PRINTFORMW 「这种道具……还是比不上……魔王大人的……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1494",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面色微红抚摸着自己的屁股，说出了心中的感想……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1495",
        any: [
          /^\s*CFLAG:379 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1497",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1498",
        any: [
          /^\s*PRINTFORMW 「唔……终於……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1499",
        any: [
          /^\s*PRINTFORMW 虽然移除肛珠让%SAVESTR:TARGET%松了口气，但是後穴又隐隐传来了空虚的感觉……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1500",
        any: [
          /^\s*CFLAG:379 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1502",
        any: [
          /^\s*ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1503",
        any: [
          /^\s*PRINTFORMW 「………唔」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1504",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%呼出了一口氣，放开了已经紧握到发白的掌心……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1505",
        any: [
          /^\s*CFLAG:379 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1505-1507",
        any: [
          /^\s*CFLAG:379 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1505-1509",
        any: [
          /^\s*CFLAG:379 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1505-1511",
        any: [
          /^\s*CFLAG:379 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;正常位 CFLAG:321\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1513",
        any: [
          /^\s*IF SELECTCOM == 20\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1515",
        any: [
          /^\s*IF CFLAG:TARGET:321 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1515-1543",
        any: [
          /^\s*IF CFLAG:TARGET:321 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%迫不及待地搂住了%SAVESTR:PLAYER%的脖子，主动将身体靠进过去……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1515-1549",
        any: [
          /^\s*IF CFLAG:TARGET:321 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%迫不及待地搂住了%SAVESTR:PLAYER%的脖子，主动将身体靠进过去……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1532-1536",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵…让%SELF_CALL\(TARGET\)%看看你的技巧如何吧？……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1536",
        any: [
          /^\s*PRINTFORMW 「呵呵…让%SELF_CALL\(TARGET\)%看看你的技巧如何吧？……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1540",
        any: [
          /^\s*PRINTFORMW 「如果……魔王大人想要观赏的话……那么…请…请……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1541-1543",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样可以看清楚魔王大人的表情呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1543",
        any: [
          /^\s*PRINTFORMW 「这样可以看清楚魔王大人的表情呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1543-1549",
        any: [
          /^\s*PRINTFORMW 「这样可以看清楚魔王大人的表情呢……」\s*$\s*^\s*PRINTFORMW 「感觉……好幸福又有点害羞……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1544",
        any: [
          /^\s*PRINTFORMW 「感觉……好幸福又有点害羞……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1544-1552",
        any: [
          /^\s*PRINTFORMW 「感觉……好幸福又有点害羞……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1549-1553",
        any: [
          /^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1551-1553",
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1553",
        any: [
          /^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1553-1555",
        any: [
          /^\s*CFLAG:321 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1554-1558",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1558",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1565",
        any: [
          /^\s*CFLAG:321 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1567",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1569",
        any: [
          /^\s*PRINTFORMW 「嗯……啊啊～进……进来了……%SAVESTR:PLAYER%的…那里不行……嗯啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1569-1575",
        any: [
          /^\s*PRINTFORMW 「嗯……啊啊～进……进来了……%SAVESTR:PLAYER%的…那里不行……嗯啊～♡」\s*$\s*^\s*PRINTFORMW （明明不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%却………）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1570",
        any: [
          /^\s*PRINTFORMW （明明不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%却………）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1582-1584",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:321 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1584",
        any: [
          /^\s*CFLAG:321 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1586",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1597",
        any: [
          /^\s*CFLAG:321 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1599",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1605",
        any: [
          /^\s*CFLAG:321 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1607",
        any: [
          /^\s*ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1618",
        any: [
          /^\s*CFLAG:321 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1618-1620",
        any: [
          /^\s*CFLAG:321 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1618-1622",
        any: [
          /^\s*CFLAG:321 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1618-1624",
        any: [
          /^\s*CFLAG:321 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1619-1625",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;後背位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1629-1657",
        any: [
          /^\s*IF CFLAG:TARGET:322 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%露出了迫不及待的表情，主动地拨开了自己的臀瓣……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1629-1663",
        any: [
          /^\s*IF CFLAG:TARGET:322 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%露出了迫不及待的表情，主动地拨开了自己的臀瓣……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1646-1650",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵…用这个姿势好刺激呢……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1650",
        any: [
          /^\s*PRINTFORMW 「呵呵…用这个姿势好刺激呢……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1654",
        any: [
          /^\s*PRINTFORMW 「用……用这个姿势吗？…好…好的……那么……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1656-1658",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样看不见魔王大人的表情呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1658",
        any: [
          /^\s*PRINTFORMW 「这样看不见魔王大人的表情呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1659",
        any: [
          /^\s*PRINTFORMW 「但是，这姿势似乎……可以进得很深的样子……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1659-1663",
        any: [
          /^\s*PRINTFORMW 「但是，这姿势似乎……可以进得很深的样子……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1659-1667",
        any: [
          /^\s*PRINTFORMW 「但是，这姿势似乎……可以进得很深的样子……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1664-1668",
        any: [
          /^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1665-1669",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1666-1672",
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1669-1673",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1673",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1685",
        any: [
          /^\s*PRINTFORMW （这……这不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%不可以………）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1685-1689",
        any: [
          /^\s*PRINTFORMW （这……这不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%不可以………）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1697-1699",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1732-1736",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1732-1738",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1732-1740",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;対面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1734-1740",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;対面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1742",
        any: [
          /^\s*IF SELECTCOM == 22\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1743",
        any: [
          /^\s*IF CFLAG:TARGET:323 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1743-1771",
        any: [
          /^\s*IF CFLAG:TARGET:323 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%迫不及待地搂住了%SAVESTR:PLAYER%的脖子，主动将身体靠进过去……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1743-1777",
        any: [
          /^\s*IF CFLAG:TARGET:323 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%迫不及待地搂住了%SAVESTR:PLAYER%的脖子，主动将身体靠进过去……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1760-1764",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵…这样抱着两人贴得很紧呢♡……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1764",
        any: [
          /^\s*PRINTFORMW 「呵呵…这样抱着两人贴得很紧呢♡……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1768",
        any: [
          /^\s*PRINTFORMW 「这都是为了……魔王大人…所以…所以…请……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1769-1771",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样被抱着可以看清楚魔王大人的表情呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1771",
        any: [
          /^\s*PRINTFORMW 「这样被抱着可以看清楚魔王大人的表情呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1771-1777",
        any: [
          /^\s*PRINTFORMW 「这样被抱着可以看清楚魔王大人的表情呢……」\s*$\s*^\s*PRINTFORMW 「感觉……好幸福又有点害羞……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1772",
        any: [
          /^\s*PRINTFORMW 「感觉……好幸福又有点害羞……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1772-1780",
        any: [
          /^\s*PRINTFORMW 「感觉……好幸福又有点害羞……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1777-1781",
        any: [
          /^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1779-1781",
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1781",
        any: [
          /^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1781-1783",
        any: [
          /^\s*CFLAG:323 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1782-1786",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1786",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1793",
        any: [
          /^\s*CFLAG:323 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1795",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1797",
        any: [
          /^\s*PRINTFORMW 「嗯……啊啊～顶……顶进来了……%SAVESTR:PLAYER%的…不……嗯啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1797-1803",
        any: [
          /^\s*PRINTFORMW 「嗯……啊啊～顶……顶进来了……%SAVESTR:PLAYER%的…不……嗯啊～♡」\s*$\s*^\s*PRINTFORMW （明明不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%却………）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1798",
        any: [
          /^\s*PRINTFORMW （明明不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%却………）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1810-1812",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:323 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1812",
        any: [
          /^\s*CFLAG:323 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1814",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1825",
        any: [
          /^\s*CFLAG:323 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1827",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1833",
        any: [
          /^\s*CFLAG:323 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1835",
        any: [
          /^\s*ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1846",
        any: [
          /^\s*CFLAG:323 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1846-1848",
        any: [
          /^\s*CFLAG:323 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1846-1850",
        any: [
          /^\s*CFLAG:323 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1846-1852",
        any: [
          /^\s*CFLAG:323 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1847-1853",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背面座位 CFLAG:324\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1855",
        any: [
          /^\s*IF SELECTCOM == 23\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1856",
        any: [
          /^\s*IF CFLAG:TARGET:324 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1856-1884",
        any: [
          /^\s*IF CFLAG:TARGET:324 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%露出了迫不及待的表情，主动地拨开了自己的臀瓣……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1856-1890",
        any: [
          /^\s*IF CFLAG:TARGET:324 == 0\s*$\s*^\s*;処女\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$\s*^\s*PRINTFORMW 	%SAVESTR:TARGET%露出了迫不及待的表情，主动地拨开了自己的臀瓣……\s*$\s*^\s*;愛＋従順Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1873-1877",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呵呵…这样被抱着，很清楚的能感受的性器的样子喔？……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1877",
        any: [
          /^\s*PRINTFORMW 「呵呵…这样被抱着，很清楚的能感受的性器的样子喔？……快点进来啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1881",
        any: [
          /^\s*PRINTFORMW 「如果……这是魔王大人的命令……那么…请…请……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1883-1885",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样被魔王大人抱着好幸福呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1885",
        any: [
          /^\s*PRINTFORMW 「这样被魔王大人抱着好幸福呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1886",
        any: [
          /^\s*PRINTFORMW 「而且，從後面來的話……可以进得很深的样子……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1886-1890",
        any: [
          /^\s*PRINTFORMW 「而且，從後面來的話……可以进得很深的样子……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1886-1894",
        any: [
          /^\s*PRINTFORMW 「而且，從後面來的話……可以进得很深的样子……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1891-1895",
        any: [
          /^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1893-1895",
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1895",
        any: [
          /^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1895-1897",
        any: [
          /^\s*CFLAG:324 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1896-1900",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1900",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1907",
        any: [
          /^\s*CFLAG:324 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1909",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1912",
        any: [
          /^\s*PRINTFORMW （明明……不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%不可以………）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1912-1916",
        any: [
          /^\s*PRINTFORMW （明明……不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%不可以………）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1924-1926",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:324 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1926",
        any: [
          /^\s*CFLAG:324 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1928",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1939",
        any: [
          /^\s*CFLAG:324 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1941",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1947",
        any: [
          /^\s*CFLAG:324 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1949",
        any: [
          /^\s*ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1960",
        any: [
          /^\s*CFLAG:324 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1960-1962",
        any: [
          /^\s*CFLAG:324 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1960-1964",
        any: [
          /^\s*CFLAG:324 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1960-1966",
        any: [
          /^\s*CFLAG:324 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1961-1967",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;正常位アナル CFLAG:327\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1969",
        any: [
          /^\s*IF SELECTCOM == 26\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1971",
        any: [
          /^\s*IF CFLAG:TARGET:327 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1974",
        any: [
          /^\s*PRINTFORMW 「欸？要用这个体位侵犯屁股吗？……嗯……虽然没试过……但是……可以哦～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1979",
        any: [
          /^\s*PRINTFORMW 「请……请用…但是…可以…不要看%SELF_CALL\(TARGET\)%的脸吗？……嗯…啊啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1980",
        any: [
          /^\s*PRINTFORMW （因为是命令……所以……应该……不会让魔王大人不悦吧……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1981",
        any: [
          /^\s*PRINTFORMW 尽管是听从命令进行著肛交，%SAVESTR:TARGET%还是一边思慕着魔王一边配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1981-1983",
        any: [
          /^\s*PRINTFORMW 尽管是听从命令进行著肛交，%SAVESTR:TARGET%还是一边思慕着魔王一边配合着%SAVESTR:PLAYER%的动作……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%全身上下都属於魔王大人的……喜欢这里的话……也……嗯……啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1983",
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%全身上下都属於魔王大人的……喜欢这里的话……也……嗯……啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1983-1987",
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%全身上下都属於魔王大人的……喜欢这里的话……也……嗯……啊啊啊～♡♡」\s*$\s*^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是露出欣喜的表情地配合着%SAVESTR:PLAYER%的动作……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1986-1988",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「用这里……做？……真不敢相信……变态！去死！……不！！不要！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1988",
        any: [
          /^\s*PRINTFORMW 「用这里……做？……真不敢相信……变态！去死！……不！！不要！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1989-1991",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:327 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1991",
        any: [
          /^\s*CFLAG:TARGET:327 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1991-1993",
        any: [
          /^\s*CFLAG:TARGET:327 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1992-1996",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1996",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2003",
        any: [
          /^\s*CFLAG:327 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2005",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2012",
        any: [
          /^\s*CFLAG:327 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2014",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2014-2024",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$\s*^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2017",
        any: [
          /^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2025-2029",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 来自後穴的快感，让%SAVESTR:TARGET%恍惚失神甚至语无论次了起来……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%因为後穴的快感，一边呻吟一边向%SAVESTR:PLAYER%求饶着……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%想要专心致意地服侍%SAVESTR:PLAYER%，但是快感太过强烈，似乎让他忘记了自己的目的……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2029-2031",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:327 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2031",
        any: [
          /^\s*CFLAG:327 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2033",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2033-2043",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$\s*^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2035",
        any: [
          /^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2036",
        any: [
          /^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2048-2050",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:327 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2050",
        any: [
          /^\s*CFLAG:327 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2052",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2058",
        any: [
          /^\s*CFLAG:327 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2060",
        any: [
          /^\s*ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2071",
        any: [
          /^\s*CFLAG:327 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2071-2073",
        any: [
          /^\s*CFLAG:327 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2071-2075",
        any: [
          /^\s*CFLAG:327 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2071-2077",
        any: [
          /^\s*CFLAG:327 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2072-2078",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;後背位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2085",
        any: [
          /^\s*PRINTFORMW 「欸？要从背後侵犯屁股吗？看不到表请有点紧张呢……但是……可以哦～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2090",
        any: [
          /^\s*PRINTFORMW 「虽然……用这里…这体位…是第一次……但是……嗯…啊啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2091",
        any: [
          /^\s*PRINTFORMW （这个姿势看不见表情……把对方当成魔王大人就可以了吧……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2092",
        any: [
          /^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是顺从地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2092-2094",
        any: [
          /^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是顺从地配合着%SAVESTR:PLAYER%的动作……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「虽然看不见魔王大人的表情……有点紧张……但是……可以哦～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2094",
        any: [
          /^\s*PRINTFORMW 「虽然看不见魔王大人的表情……有点紧张……但是……可以哦～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2094-2098",
        any: [
          /^\s*PRINTFORMW 「虽然看不见魔王大人的表情……有点紧张……但是……可以哦～♡♡」\s*$\s*^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是露出欣喜的表情地配合着%SAVESTR:PLAYER%的动作……\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2097-2099",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这个……姿势？……该不会要……变态！去死！……不！！不要！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2099",
        any: [
          /^\s*PRINTFORMW 「这个……姿势？……该不会要……变态！去死！……不！！不要！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2100-2102",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2100-2106",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2103-2107",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2107",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2116",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2125-2135",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$\s*^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2128",
        any: [
          /^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2140-2142",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2144-2154",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$\s*^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2146",
        any: [
          /^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2147",
        any: [
          /^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2159-2161",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2181-2185",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2181-2187",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2181-2189",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;対面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2183-2189",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;対面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2191",
        any: [
          /^\s*IF SELECTCOM == 28\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2193",
        any: [
          /^\s*IF CFLAG:TARGET:329 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2196",
        any: [
          /^\s*PRINTFORMW 「这样抱着是怕%SELF_CALL\(TARGET\)%跑掉吗？呵呵…性爱的滋味如此美妙，%SELF_CALL\(TARGET\)%怎么舍得离开呢♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2200",
        any: [
          /^\s*PRINTFORMW 「这样被抱着…感觉很幸福呢♡……当然……要做什么都可以哦？%SELF_CALL\(TARGET\)%的魔王大人♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2201",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%心情很好地微笑着，任凭%SAVESTR:PLAYER%摆布……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2202-2204",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「放%SELF_CALL\(TARGET\)%下去！混帐！到底是要做什么…该不会…不！！不要！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2204",
        any: [
          /^\s*PRINTFORMW 「放%SELF_CALL\(TARGET\)%下去！混帐！到底是要做什么…该不会…不！！不要！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2205-2207",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:329 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2207",
        any: [
          /^\s*CFLAG:TARGET:329 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2207-2209",
        any: [
          /^\s*CFLAG:TARGET:329 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2208-2212",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2212",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2219",
        any: [
          /^\s*CFLAG:329 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2221",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2227",
        any: [
          /^\s*CFLAG:329 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2229",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2229-2239",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$\s*^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2232",
        any: [
          /^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2244-2246",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:329 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2246",
        any: [
          /^\s*CFLAG:329 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2248",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2248-2258",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$\s*^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2250",
        any: [
          /^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2251",
        any: [
          /^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2263-2265",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:329 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2265",
        any: [
          /^\s*CFLAG:329 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2267",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2273",
        any: [
          /^\s*CFLAG:329 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2275",
        any: [
          /^\s*ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2286",
        any: [
          /^\s*CFLAG:329 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2286-2288",
        any: [
          /^\s*CFLAG:329 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2286-2290",
        any: [
          /^\s*CFLAG:329 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2286-2292",
        any: [
          /^\s*CFLAG:329 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2287-2293",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背面座位アナル CFLAG:330\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2295",
        any: [
          /^\s*IF SELECTCOM == 29\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2297",
        any: [
          /^\s*IF CFLAG:TARGET:330 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2300",
        any: [
          /^\s*PRINTFORMW 「想玩後面也可以喔！这个姿势…嗯……应该很美妙吧♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2304",
        any: [
          /^\s*PRINTFORMW 「想从後面…嗯……好……好啊……只要是魔王大人……怎样都可以♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2305",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着羞涩的笑容，顺从地回应着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2306-2308",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「後面…好像有什么……该不会……不！放开%SELF_CALL\(TARGET\)%！……不要……好痛！……啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2308",
        any: [
          /^\s*PRINTFORMW 「後面…好像有什么……该不会……不！放开%SELF_CALL\(TARGET\)%！……不要……好痛！……啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2309",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰部被%SAVESTR:PLAYER%的双臂牢牢地固定，就这样从後面贯穿至%SAVESTR:TARGET%的体内……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2309-2311",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰部被%SAVESTR:PLAYER%的双臂牢牢地固定，就这样从後面贯穿至%SAVESTR:TARGET%的体内……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:330 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2311",
        any: [
          /^\s*CFLAG:TARGET:330 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2311-2313",
        any: [
          /^\s*CFLAG:TARGET:330 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2312-2316",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2316",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2323",
        any: [
          /^\s*CFLAG:330 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2325",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2331",
        any: [
          /^\s*CFLAG:330 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2333",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2333-2343",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$\s*^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2336",
        any: [
          /^\s*PRINTFORMW （不行……这不是魔王大人……不能……但……但是……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2348-2350",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:330 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2350",
        any: [
          /^\s*CFLAG:330 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2352",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2352-2362",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$\s*^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2354",
        any: [
          /^\s*PRINTFORMW 「唔！嗯……嗯啊…不……呀！……啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2355",
        any: [
          /^\s*PRINTFORMW （这个身体是取悦魔王大人的，所以……所以……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2367-2369",
        any: [
          /^\s*ENDDATA\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:330 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2369",
        any: [
          /^\s*CFLAG:330 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2371",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2377",
        any: [
          /^\s*CFLAG:330 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2379",
        any: [
          /^\s*ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2390",
        any: [
          /^\s*CFLAG:330 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2390-2392",
        any: [
          /^\s*CFLAG:330 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2390-2394",
        any: [
          /^\s*CFLAG:330 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2390-2396",
        any: [
          /^\s*CFLAG:330 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2391-2397",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2404",
        any: [
          /^\s*PRINTFORMW 「欸？用手就可以了吗？呵呵……真可惜呢……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2407",
        any: [
          /^\s*PRINTFORMW 「用……手吗？好的……%SELF_CALL\(TARGET\)%会努力……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2410",
        any: [
          /^\s*PRINTFORMW 「一定要%SELF_CALL\(TARGET\)%来吗？……算了……如果只是用手的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2411",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，随意地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2412-2414",
        any: [
          /^\s*;それ以外（奉仕精神Lv3未満）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「想让%SELF_CALL\(TARGET\)%碰这种脏东西？哼……就不怕被%SELF_CALL\(TARGET\)%折断吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2414",
        any: [
          /^\s*PRINTFORMW 「想让%SELF_CALL\(TARGET\)%碰这种脏东西？哼……就不怕被%SELF_CALL\(TARGET\)%折断吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2415",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，十分嫌弃又笨拙地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2415-2417",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，十分嫌弃又笨拙地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:331 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2415-2421",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，十分嫌弃又笨拙地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:331 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2419-2421",
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2422",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2423",
        any: [
          /^\s*PRINTFORMW 「嗯…要快点变大喔……然後……呵呵……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2424",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抱着热切的期待，积极地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2427",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2428",
        any: [
          /^\s*PRINTFORMW 「果然…还是魔王大人的……最棒呢♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2429",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出痴迷崇敬的眼神，宛如膜拜似地服侍着%SAVESTR:PLAYER%……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2432",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2433",
        any: [
          /^\s*PRINTFORMW 「能为魔王大人服务，是%SELF_CALL\(TARGET\)%的荣幸……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2434",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的手指动作灵活又细致，面带微笑地关注着%SAVESTR:PLAYER%的感受……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2438",
        any: [
          /^\s*PRINTFORMW 「……这样………够了没……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2439",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，像是想要赶快结束那样，草率地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2443",
        any: [
          /^\s*PRINTFORMW 「难道你不会自己弄吗？」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2444",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了嫌弃的表情，非常不情愿地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2444-2448",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了嫌弃的表情，非常不情愿地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2444-2450",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了嫌弃的表情，非常不情愿地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2444-2452",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了嫌弃的表情，非常不情愿地抚弄着%SAVESTR:PLAYER%的阴茎……\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2446-2452",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2459",
        any: [
          /^\s*PRINTFORMW 「欸？用嘴来吗？呵呵……真好奇是什么味道呢……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2462",
        any: [
          /^\s*PRINTFORMW 「用……嘴吗？是魔王大人的话……%SELF_CALL\(TARGET\)%很乐意……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2465",
        any: [
          /^\s*PRINTFORMW 「……舔……可以了吧……不要整个塞进来……唔！……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2466",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，勉强地舔舐着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2467-2469",
        any: [
          /^\s*;それ以外（奉仕精神Lv3未満）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这么脏的东西要%SELF_CALL\(TARGET\)%……？……呜……不……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2469",
        any: [
          /^\s*PRINTFORMW 「这么脏的东西要%SELF_CALL\(TARGET\)%……？……呜……不……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2470",
        any: [
          /^\s*PRINTFORMW 还不等%SAVESTR:TARGET%把话说完，%SAVESTR:PLAYER%的阴茎就强硬地抵住了他的嘴巴……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2470-2472",
        any: [
          /^\s*PRINTFORMW 还不等%SAVESTR:TARGET%把话说完，%SAVESTR:PLAYER%的阴茎就强硬地抵住了他的嘴巴……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:332 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2470-2476",
        any: [
          /^\s*PRINTFORMW 还不等%SAVESTR:TARGET%把话说完，%SAVESTR:PLAYER%的阴茎就强硬地抵住了他的嘴巴……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:332 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2473-2477",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2477",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2478",
        any: [
          /^\s*PRINTFORMW 「嗯…咕啾……唔……好渴啊……可以……射给%SELF_CALL\(TARGET\)%……解渴吗……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2481",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2482",
        any: [
          /^\s*PRINTFORMW 「嗯…咕啾……唔……在嘴巴里面……变大了呢……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2485",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\) && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2486-2490",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯…咕啾……唔…好……好喜欢……魔王大人的………♡」\s*$\s*^\s*DATAFORM 「嗯…咕啾……唔……魔王大人……舒服吗………♡」\s*$\s*^\s*DATAFORM 「因为是魔王大人……所以…唔…咕啾……射…进嘴巴……也可以……♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2494",
        any: [
          /^\s*PRINTFORML 「嗯…咕啾……唔……呼……可…可以了吧……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2498",
        any: [
          /^\s*PRINTFORMW 「咳！不……不要……唔……嗯……不……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2499",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%死命地想要拒绝，但是头部被%SAVESTR:PLAYER%用手固定後被强迫着进行着口交……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2499-2503",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%死命地想要拒绝，但是头部被%SAVESTR:PLAYER%用手固定後被强迫着进行着口交……\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2499-2505",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%死命地想要拒绝，但是头部被%SAVESTR:PLAYER%用手固定後被强迫着进行着口交……\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2499-2507",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%死命地想要拒绝，但是头部被%SAVESTR:PLAYER%用手固定後被强迫着进行着口交……\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;パイズリ CFLAG:333\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2501-2507",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;パイズリ CFLAG:333\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2509",
        any: [
          /^\s*IF SELECTCOM == 32\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2511",
        any: [
          /^\s*IF CFLAG:TARGET:333 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2514",
        any: [
          /^\s*PRINTFORMW 「用胸部摩擦就会硬的话……那么……就来做吧～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2515",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饶有兴致地配合着%SAVESTR:PLAYER%的指示进行乳交……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2516",
        any: [
          /^\s*CFLAG:333 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2519",
        any: [
          /^\s*PRINTFORMW 「为了魔王大人，用胸部的服务的技巧……的确是有学习的必要呢！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2520",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地配合着%SAVESTR:PLAYER%的指示进行乳交……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2523",
        any: [
          /^\s*PRINTFORMW 「随便……你开心就好……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2524",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，笨拙地照着%SAVESTR:PLAYER%的指示进行乳交……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2525-2527",
        any: [
          /^\s*;それ以外（奉仕精神Lv3未満）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「要%SELF_CALL\(TARGET\)%……用胸部？……真是变态的玩法呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2527",
        any: [
          /^\s*PRINTFORMW 「要%SELF_CALL\(TARGET\)%……用胸部？……真是变态的玩法呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2528",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着鄙视的眼神，心不甘情不愿地进行着乳交……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2528-2530",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着鄙视的眼神，心不甘情不愿地进行着乳交……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:333 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2530",
        any: [
          /^\s*CFLAG:TARGET:333 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2530-2532",
        any: [
          /^\s*CFLAG:TARGET:333 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2531-2535",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2535",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2536-2540",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯啊～啊啊♡……光是用这里摩擦……就舒服到…想要高潮呢～♡♡」\s*$\s*^\s*DATAFORM 「啊啊…变得好大…这么烫♡……快点啊……好想要呢～♡♡」\s*$\s*^\s*DATAFORM 「还不能射吗？嗯……嗯啊～♡…好…想要热腾腾的牛奶啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2541",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边进行乳交，一边发出淫荡又高亢的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2542",
        any: [
          /^\s*CFLAG:333 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2545",
        any: [
          /^\s*PRINTFORMW 「嗯……唔……快点变大哦……呵呵……好期待啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2546",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用期待的眼神，看着夹在乳房中间渐渐勃起的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2548",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2550",
        any: [
          /^\s*PRINTFORMW 「如果这样子……感觉会更舒服吗？……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2551",
        any: [
          /^\s*PRINTFORMW （为了能更好地服侍魔王大人……%SELF_CALL\(TARGET\)%要更加努力……让技巧更好才可以！）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2552",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%认真的用乳房服侍摩擦着%SAVESTR:PLAYER%勃起的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2552-2554",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%认真的用乳房服侍摩擦着%SAVESTR:PLAYER%勃起的阴茎……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2554-2558",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「能服侍魔王大人实在是太幸福了！……嗯啊！这个热度……好棒……好舒服呢～♡♡」\s*$\s*^\s*DATAFORM 「魔王大人觉得舒服吗？%SELF_CALL\(TARGET\)%觉得很舒服哦！似乎……一直做下去也可以呢～♡♡」\s*$\s*^\s*DATAFORM 「这样子夹可以吗？如果……想要射在上面…也可以的哦～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2559",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎非常开心，满脸通红热切地用乳房服侍着%SAVESTR:PLAYER%勃起的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2559-2561",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎非常开心，满脸通红热切地用乳房服侍着%SAVESTR:PLAYER%勃起的阴茎……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:333 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2561",
        any: [
          /^\s*CFLAG:333 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2563",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2564",
        any: [
          /^\s*PRINTFORMW 「唔……变大了……在胸部上面……好烫……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2565",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，用乳房摩擦着%SAVESTR:PLAYER%勃起的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2566",
        any: [
          /^\s*CFLAG:333 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2568",
        any: [
          /^\s*ELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2569",
        any: [
          /^\s*PRINTFORMW 「这样……感觉……真是恶心……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2570",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%十分嫌弃地用乳房摩擦着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2571",
        any: [
          /^\s*CFLAG:333 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2571-2573",
        any: [
          /^\s*CFLAG:333 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2571-2575",
        any: [
          /^\s*CFLAG:333 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2571-2577",
        any: [
          /^\s*CFLAG:333 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2572-2578",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;素股 CFLAG:334\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2580",
        any: [
          /^\s*IF SELECTCOM == 33\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2582",
        any: [
          /^\s*IF CFLAG:TARGET:334 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2585",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2587-2593",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:334 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2588",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2591",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2591-2593",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:334 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2593",
        any: [
          /^\s*CFLAG:TARGET:334 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2593-2595",
        any: [
          /^\s*CFLAG:TARGET:334 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2595-2597",
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\+処女\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2598",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2599",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2600",
        any: [
          /^\s*CFLAG:334 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2602",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2603",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2604",
        any: [
          /^\s*CFLAG:334 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2606",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2607",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2608",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2609",
        any: [
          /^\s*CFLAG:334 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2611",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2612",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2613",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2614",
        any: [
          /^\s*CFLAG:334 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2616",
        any: [
          /^\s*ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2617",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2618",
        any: [
          /^\s*CFLAG:334 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2618-2620",
        any: [
          /^\s*CFLAG:334 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2618-2622",
        any: [
          /^\s*CFLAG:334 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2618-2624",
        any: [
          /^\s*CFLAG:334 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2619-2625",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;騎乗位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2634",
        any: [
          /^\s*PRINTFORMW 「用骑乘位吗？能摆脱处女的话，什么姿势都可以哦～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2635",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%迫不及待地跨在%SAVESTR:PLAYER%的身上，对准阴茎之後，义无反顾地坐了下去……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2638",
        any: [
          /^\s*PRINTFORMW 「能将处女奉献给魔王大人……真的很幸福……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2639",
        any: [
          /^\s*PRINTFORMW 听见要骑乘位的命令，%SAVESTR:TARGET%尽管没有做过，但还是露出了开心的笑容。\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2640",
        any: [
          /^\s*PRINTFORMW 「但是……因为是第一次……如果……做不好的地方……还请您多多『指教』哦♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2641",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%小心翼翼地跨在%SAVESTR:PLAYER%的身上，对准阴茎之後，义无反顾地坐了下去……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2642-2644",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「要%SELF_CALL\(TARGET\)%坐上去自己动？居……居然……可恶！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2644",
        any: [
          /^\s*PRINTFORMW 「要%SELF_CALL\(TARGET\)%坐上去自己动？居……居然……可恶！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2647",
        any: [
          /^\s*PRINTFORMW 「算了……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%……呜……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2648",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却像是自暴自弃那样，骑在了%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2648-2650",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却像是自暴自弃那样，骑在了%SAVESTR:PLAYER%的身上……\s*$\s*^\s*ENDIF\s*$\s*^\s*;非処女\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2648-2654",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明还是处女，却像是自暴自弃那样，骑在了%SAVESTR:PLAYER%的身上……\s*$\s*^\s*ENDIF\s*$\s*^\s*;非処女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「这个姿势%SELF_CALL\(TARGET\)%很喜欢……关於技术嘛…呵呵……不妨试试看～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2654",
        any: [
          /^\s*PRINTFORMW 「这个姿势%SELF_CALL\(TARGET\)%很喜欢……关於技术嘛…呵呵……不妨试试看～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2657",
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2658",
        any: [
          /^\s*PRINTFORMW 「魔王大人……喜欢这个姿势？那么……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%当然……可以……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2659",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双颊通红，顺从地跨在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2660-2662",
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「要%SELF_CALL\(TARGET\)%坐上去自己动？居……居然……可恶！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2662",
        any: [
          /^\s*PRINTFORMW 「要%SELF_CALL\(TARGET\)%坐上去自己动？居……居然……可恶！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2665",
        any: [
          /^\s*PRINTFORMW 「算了……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%……呜……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2666",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是自暴自弃那样，骑在了%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2666-2668",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是自暴自弃那样，骑在了%SAVESTR:PLAYER%的身上……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2666-2670",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是自暴自弃那样，骑在了%SAVESTR:PLAYER%的身上……\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2667-2673",
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2670-2674",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2674",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2675-2679",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯…哈啊…好…好棒♡…快…快点…射进来啊♡…嗯…嗯啊……啊啊♡♡」\s*$\s*^\s*DATAFORM 「嗯…啊啊♡……顶……顶进来了♡……好…好烫……还…还要！…嗯♡……啊啊♡♡」\s*$\s*^\s*DATAFORM 「全部…都……都进来了♡嗯……啊！好……好舒服…嗯…嗯啊……啊啊♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2680",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫糜地摆动着腰肢，贪婪地榨取着%SAVESTR:PLAYER%……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2683-2693",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORML 「唔…啊……嗯……啊啊……」\s*$\s*^\s*PRINTFORMW （在魔王大人面前……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%居然坐在别人身上……呜）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%闭着眼睛不敢看%SAVESTR:MASTER%的表情，只是顺从地骑在%SAVESTR:PLAYER%身上扭摆着腰肢……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「魔王大人……觉得舒服吗？如果想要快一点……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%也……嗯……啊啊♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2685",
        any: [
          /^\s*PRINTFORML 「唔…啊……嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2689-2693",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「魔王大人……觉得舒服吗？如果想要快一点……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%也……嗯……啊啊♡」\s*$\s*^\s*DATAFORM 「嗯…啊啊……顶……顶进来了♡……魔王大人…%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%……嗯♡……啊啊♡♡」\s*$\s*^\s*DATAFORM 「全部…都……都进来了♡嗯……啊！好……好舒服…不愧是……魔王大人的……嗯……啊啊♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2694-2696",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫糜地摆动着腰肢，竭尽全力地取悦着%SAVESTR:PLAYER%……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2699-2703",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「唔…不……不要这么…顶…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%会……嗯……啊啊……不……」\s*$\s*^\s*DATAFORM 「嗯…啊啊……顶……顶进来了……好…深……不……不行……啊啊」\s*$\s*^\s*DATAFORM 「要…要被顶穿了……嗯……啊啊！不…不可以动……嗯……啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2704",
        any: [
          /^\s*PRINTFORMW 来自下身的强烈快感，让%SAVESTR:TARGET%呼吸急促地呻吟了起来……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2708",
        any: [
          /^\s*PRINTFORML 「就…就当是坐在按摩椅上面……唔！……嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2709",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，咬牙地在%SAVESTR:PLAYER%身上起伏着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2713",
        any: [
          /^\s*PRINTFORMW 「不……不要看！唔……别……别顶了……不要……呜」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2714",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%屈辱地用手遮住了自己的脸庞，摇摇晃晃地骑在了的%SAVESTR:PLAYER%身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2714-2718",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%屈辱地用手遮住了自己的脸庞，摇摇晃晃地骑在了的%SAVESTR:PLAYER%身上……\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2714-2720",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%屈辱地用手遮住了自己的脸庞，摇摇晃晃地骑在了的%SAVESTR:PLAYER%身上……\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2714-2722",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%屈辱地用手遮住了自己的脸庞，摇摇晃晃地骑在了的%SAVESTR:PLAYER%身上……\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;泡踊り CFLAG:336\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2716-2722",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;泡踊り CFLAG:336\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2724",
        any: [
          /^\s*IF SELECTCOM == 35\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2726",
        any: [
          /^\s*IF CFLAG:TARGET:336 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2728-2734",
        any: [
          /^\s*IF ABL:TARGET:16 >= 3\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:336 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2729",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2732",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2732-2734",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:336 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2734",
        any: [
          /^\s*CFLAG:TARGET:336 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2734-2736",
        any: [
          /^\s*CFLAG:TARGET:336 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2735-2739",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2739",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2740",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2741",
        any: [
          /^\s*CFLAG:336 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2743",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2744",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2745",
        any: [
          /^\s*CFLAG:336 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2747",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2748",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2749",
        any: [
          /^\s*CFLAG:336 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2751",
        any: [
          /^\s*ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2752",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2753",
        any: [
          /^\s*CFLAG:336 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2753-2755",
        any: [
          /^\s*CFLAG:336 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2753-2757",
        any: [
          /^\s*CFLAG:336 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2753-2759",
        any: [
          /^\s*CFLAG:336 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2754-2760",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;騎乗位アナル CFLAG:337\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2762",
        any: [
          /^\s*IF SELECTCOM == 36\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2764",
        any: [
          /^\s*IF CFLAG:TARGET:337 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2767",
        any: [
          /^\s*PRINTFORMW 「用这个姿势肛交……光想就决得很刺激♡…好啊……试试看♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2771",
        any: [
          /^\s*PRINTFORMW 「如果是魔王的命令……那么……当然很乐意为您服务……♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2772",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%没有骑乘式肛交的经验，但他还是小心翼翼地跨坐在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2773-2775",
        any: [
          /^\s*;それ以外（愛無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「居……居然…要%SELF_CALL\(TARGET\)%自己……真是变态！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2775",
        any: [
          /^\s*PRINTFORMW 「居……居然…要%SELF_CALL\(TARGET\)%自己……真是变态！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2776",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出痛恨的表情，不情不愿地跨坐在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2776-2778",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出痛恨的表情，不情不愿地跨坐在%SAVESTR:PLAYER%的身上……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:337 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2778",
        any: [
          /^\s*CFLAG:TARGET:337 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2778-2780",
        any: [
          /^\s*CFLAG:TARGET:337 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2779-2783",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2783",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2785",
        any: [
          /^\s*PRINTFORMW 「啊啊！……好棒♡停…停不下来啊……嗯啊……啊啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2785-2787",
        any: [
          /^\s*PRINTFORMW 「啊啊！……好棒♡停…停不下来啊……嗯啊……啊啊啊♡♡」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「要……要用屁股高潮了♡……啊啊……快点……快射进来♡……啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2787",
        any: [
          /^\s*PRINTFORMW 「要……要用屁股高潮了♡……啊啊……快点……快射进来♡……啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2787-2789",
        any: [
          /^\s*PRINTFORMW 「要……要用屁股高潮了♡……啊啊……快点……快射进来♡……啊啊♡♡」\s*$\s*^\s*ENDIF\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%沉醉在後穴带来的快感里，淫荡地扭动着腰肢呻吟着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2789",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%沉醉在後穴带来的快感里，淫荡地扭动着腰肢呻吟着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2790",
        any: [
          /^\s*CFLAG:337 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2792",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2793",
        any: [
          /^\s*PRINTFORMW 「真……没想到……屁股……也能有这种快感……嗯啊……啊啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2794",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地在%SAVESTR:PLAYER%的身上起伏着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2795",
        any: [
          /^\s*CFLAG:337 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2797",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2799",
        any: [
          /^\s*PRINTFORML 「唔…啊……嗯……啊啊……不……不行……这样下去…嗯啊……啊啊啊♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2800",
        any: [
          /^\s*PRINTFORMW （明明不是魔王大人……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%却……啊啊……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2801",
        any: [
          /^\s*PRINTFORMW 强烈的快感贯穿了%SAVESTR:TARGET%，让他忘记了对象是谁，只能淫荡地摆动着腰肢……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2801-2803",
        any: [
          /^\s*PRINTFORMW 强烈的快感贯穿了%SAVESTR:TARGET%，让他忘记了对象是谁，只能淫荡地摆动着腰肢……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2803-2807",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「魔王大人…太…太棒了♡…抱…抱歉…要…要高潮了♡……啊……啊啊啊♡♡」\s*$\s*^\s*DATAFORM 「嗯…啊啊……顶……顶进来了♡……魔王大人…请…请射在里面♡……嗯♡……啊啊♡♡」\s*$\s*^\s*DATAFORM 「屁股…好奇怪啊♡嗯……啊！好……好棒…不愧是……魔王大人的……嗯……啊啊♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2808",
        any: [
          /^\s*PRINTFORMW 强烈的快感让%SAVESTR:TARGET%忘情地%SAVESTR:PLAYER%在身上起伏着，发出了急促高昂的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2808-2810",
        any: [
          /^\s*PRINTFORMW 强烈的快感让%SAVESTR:TARGET%忘情地%SAVESTR:PLAYER%在身上起伏着，发出了急促高昂的呻吟……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:337 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2810",
        any: [
          /^\s*CFLAG:337 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2812",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2812-2822",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*IF ASSIPLAY\s*$\s*^\s*PRINTFORML 「唔…啊……嗯……啊啊……」\s*$\s*^\s*PRINTFORMW （在魔王大人面前……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%居然坐在别人身上……呜）\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%闭着眼睛不敢看%SAVESTR:MASTER%的表情，只是顺从地骑在%SAVESTR:PLAYER%身上扭摆着腰肢……\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「魔王大人……觉得舒服吗？如果想要快一点……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%也……嗯……啊啊♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2814",
        any: [
          /^\s*PRINTFORML 「唔…啊……嗯……啊啊……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2818-2822",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「魔王大人……觉得舒服吗？如果想要快一点……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%也……嗯……啊啊♡」\s*$\s*^\s*DATAFORM 「嗯…啊啊……顶……顶进来了♡……魔王大人…%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%……嗯♡……啊啊♡♡」\s*$\s*^\s*DATAFORM 「全部…都……都进来了♡嗯……啊！好……好舒服♡…不愧是……魔王大人的……嗯……啊啊♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2823-2825",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫糜地摆动着腰肢，竭尽全力地取悦着%SAVESTR:PLAYER%……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:337 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2825",
        any: [
          /^\s*CFLAG:337 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2827",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2828",
        any: [
          /^\s*PRINTFORMW 「唔……这……这种感觉……不……不行……嗯……啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2829",
        any: [
          /^\s*PRINTFORMW 从後穴传来的异样感，让%SAVESTR:TARGET%忍不住发出了呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2830",
        any: [
          /^\s*CFLAG:337 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2832",
        any: [
          /^\s*ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2833",
        any: [
          /^\s*PRINTFORMW 「不……好痛……不行了……要坏掉了……啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2834",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出痛苦的表情，艰难地在%SAVESTR:PLAYER%的身上起伏着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2835",
        any: [
          /^\s*CFLAG:337 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2835-2837",
        any: [
          /^\s*CFLAG:337 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2835-2839",
        any: [
          /^\s*CFLAG:337 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2835-2841",
        any: [
          /^\s*CFLAG:337 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2836-2842",
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル奉仕 CFLAG:338\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2842-2860",
        any: [
          /^\s*;アナル奉仕 CFLAG:338\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 37\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:TARGET:338 == 0\s*$\s*^\s*;奉仕精神Lv3以上\s*$\s*^\s*IF ABL:TARGET:16 >= 3\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2842-2864",
        any: [
          /^\s*;アナル奉仕 CFLAG:338\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 37\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:TARGET:338 == 0\s*$\s*^\s*;奉仕精神Lv3以上\s*$\s*^\s*IF ABL:TARGET:16 >= 3\s*$\s*^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2849",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2852",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2852-2858",
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:338 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2855-2859",
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋奉仕精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2859",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2859-2877",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*CFLAG:338 = 5\s*$\s*^\s*;愛＋奉仕精神Lv5\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORML\s*$\s*^\s*CFLAG:338 = 4\s*$\s*^\s*;奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2860",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2864",
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2868",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2872",
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4027",
        any: [
          /^\s*@DOG_KOJO_15\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4030-4032",
        any: [
          /^\s*;獣姦愛撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4030-4034",
        any: [
          /^\s*;獣姦愛撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:301 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4036-4038",
        any: [
          /^\s*IF MARK:2 >= 2\s*$\s*^\s*PRINTFORMW 「…………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，忍耐着狗的磨蹭……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4037-4038",
        any: [
          /^\s*PRINTFORMW 「…………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，忍耐着狗的磨蹭……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4038",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%皱着眉头，忍耐着狗的磨蹭……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4040-4042",
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不……别靠过来！恶心！……」\s*$\s*^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4041",
        any: [
          /^\s*PRINTFORMW 「不……别靠过来！恶心！……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4041-4079",
        any: [
          /^\s*PRINTFORMW 「不……别靠过来！恶心！……」\s*$\s*^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4042",
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4042-4043",
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4042-4044",
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4042-4045",
        any: [
          /^\s*PRINTFORMW 当狗磨蹭到裸露的皮肤时，%SAVESTR:TARGET%忍不住怒斥了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "4046-4082",
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「狗狗的皮毛好舒服……其他的地方也……♡」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%就像是一条合格的母狗一样，万分自然地与狗相互磨蹭着……\s*$\s*^\s*CFLAG:301 = 7\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5168",
        any: [
          /^\s*@SELF_KOJO_K15\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5796",
        any: [
          /^\s*@COLOSSEUM_KOJO_15\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5800-5803",
        any: [
          /^\s*IF SELECTCOM == 55\s*$\s*^\s*;気力０以下\s*$\s*^\s*IF BASE:1 <= 0\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5802-5803",
        any: [
          /^\s*IF BASE:1 <= 0\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5803",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5803-5804",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%摇摇晃晃地站着，好像随时会倒下的样子……\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5805",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%强行让自己冷静下来，试图摆脱死斗场气氛的影响……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5805-5806",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%强行让自己冷静下来，试图摆脱死斗场气氛的影响……\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5805-5807",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%强行让自己冷静下来，试图摆脱死斗场气氛的影响……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "5808-5811",
        any: [
          /^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;会話する\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1133",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1137",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1154",
        any: [
          /^\s*CFLAG:314 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1159",
        any: [
          /^\s*CFLAG:314 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1433",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1437",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1486",
        any: [
          /^\s*PRINTFORMW 随着肛珠一颗颗的拔出，%SAVESTR:TARGET%发出难忍的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1492",
        any: [
          /^\s*PRINTFORMW 随着肛珠一颗颗的拔出，%SAVESTR:TARGET%发出难忍的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1517",
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1519",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1520",
        any: [
          /^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1521",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%迫不及待地搂住了%SAVESTR:PLAYER%的脖子，主动将身体靠进过去……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1523",
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1524",
        any: [
          /^\s*PRINTFORMW 「能…能够将第一次献给魔王大人，真的，真的非常地开心…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1525",
        any: [
          /^\s*PRINTFORMW 「听说第一次都会很痛的样子，但是，是魔王大人的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1526",
        any: [
          /^\s*PRINTFORMW 「就算是疼痛，也一定会被幸福感覆盖过去的呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1527",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%露出信任的笑容，伸手主动搂住了%SAVESTR:PLAYER%的脖子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1530",
        any: [
          /^\s*PRINTFORMW 「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1531",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1535",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1538",
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1539",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1541",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1545",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1549",
        any: [
          /^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1550",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1559-1563",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「果然……这种快感……是最……最棒的了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1564",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1568",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1571",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1573-1577",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里是…属於魔王大人的……请…请打上精液的印记～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1578-1582",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……\s*$\s*^\s*DATAFORM 能跟心爱的魔王大人交合，%SAVESTR:TARGET%露出了幸福无比的笑容……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%带着崇敬又爱慕的眼神，不停地对%SAVESTR:PLAYER%倾诉着爱语……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1587-1591",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……这……这是什么！唔！……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「明明……不想要的……但……但是……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1592-1596",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……\s*$\s*^\s*DATAFORM 身体的快感背叛了%SAVESTR:TARGET%的意志，让他不由自主地发出了呻吟……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1600-1604",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……不……不要这样……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1608-1612",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不！不要…放开%SELF_CALL\(TARGET\)%！出去！拔出去啊！…啊……啊啊！」\s*$\s*^\s*DATAFORM 「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」\s*$\s*^\s*DATAFORM 「不！不要过来！唔！啊啊！不行……啊啊啊！！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1613-1617",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1627",
        any: [
          /^\s*IF SELECTCOM == 21\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1629",
        any: [
          /^\s*IF CFLAG:TARGET:322 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1631",
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1633",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1634",
        any: [
          /^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1635",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%露出了迫不及待的表情，主动地拨开了自己的臀瓣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1637",
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1638",
        any: [
          /^\s*PRINTFORMW 「能…能够将第一次献给魔王大人，真的，真的非常地开心…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1639",
        any: [
          /^\s*PRINTFORMW 「听说第一次都会很痛的样子，但是，是魔王大人的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1640",
        any: [
          /^\s*PRINTFORMW 「就算是疼痛，也一定会被幸福感覆盖过去的呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1641",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%露出信任的笑容，主动地拨开了自己的臀瓣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1644",
        any: [
          /^\s*PRINTFORMW 「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1645",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1649",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1652",
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1653",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1655",
        any: [
          /^\s*PRINTFORMW （这体位……看不见脸……就把对方当成魔王大人吧……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1656",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1660",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1664",
        any: [
          /^\s*PRINTFORMW 「不！谁要跟你做这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1665",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1668",
        any: [
          /^\s*CFLAG:322 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1674-1678",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「果然……从後面来……是最……最深的了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1679",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1680",
        any: [
          /^\s*CFLAG:322 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1682",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1683",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1684",
        any: [
          /^\s*PRINTFORMW 「嗯……啊啊～从後面……进……进来了……%SAVESTR:PLAYER%的………嗯啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1686",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1688-1692",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里是…属於魔王大人的……请…请打上精液的印记～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1693-1697",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……\s*$\s*^\s*DATAFORM 能跟心爱的魔王大人交合，%SAVESTR:TARGET%露出了幸福无比的笑容……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%带着崇敬又爱慕的眼神，不停地对%SAVESTR:PLAYER%倾诉着爱语……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1699",
        any: [
          /^\s*CFLAG:322 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1701",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1702-1706",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……这……这是什么！唔！……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「明明……不想要的……但……但是……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1707-1711",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……\s*$\s*^\s*DATAFORM 身体的快感背叛了%SAVESTR:TARGET%的意志，让他不由自主地发出了呻吟……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1712",
        any: [
          /^\s*CFLAG:322 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1714",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1715-1719",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……不……不要这样……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1720",
        any: [
          /^\s*CFLAG:322 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1722",
        any: [
          /^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1723-1727",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不！不要…放开%SELF_CALL\(TARGET\)%！出去！拔出去啊！…啊……啊啊！」\s*$\s*^\s*DATAFORM 「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」\s*$\s*^\s*DATAFORM 「不！不要过来！唔！啊啊！不行……啊啊啊！！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1728-1732",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1733",
        any: [
          /^\s*CFLAG:322 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1745",
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1747",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1748",
        any: [
          /^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1749",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%迫不及待地搂住了%SAVESTR:PLAYER%的脖子，主动将身体靠进过去……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1751",
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1752",
        any: [
          /^\s*PRINTFORMW 「能…能够将第一次献给魔王大人，真的，真的非常地开心…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1753",
        any: [
          /^\s*PRINTFORMW 「听说第一次都会很痛的样子，但是，是魔王大人的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1754",
        any: [
          /^\s*PRINTFORMW 「就算是疼痛，也一定会被幸福感覆盖过去的呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1755",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%露出信任的笑容，伸手主动搂住了%SAVESTR:PLAYER%的脖子……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1758",
        any: [
          /^\s*PRINTFORMW 「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1759",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1763",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1766",
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1767",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1769",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1773",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1777",
        any: [
          /^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1778",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1787-1791",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「果然……这种快感……是最……最棒的了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1792",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1796",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1799",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1801-1805",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里是…属於魔王大人的……请…请打上精液的印记～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1806-1810",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……\s*$\s*^\s*DATAFORM 能跟心爱的魔王大人交合，%SAVESTR:TARGET%露出了幸福无比的笑容……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%带着崇敬又爱慕的眼神，不停地对%SAVESTR:PLAYER%倾诉着爱语……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1815-1819",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……这……这是什么！唔！……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「明明……不想要的……但……但是……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1820-1824",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……\s*$\s*^\s*DATAFORM 身体的快感背叛了%SAVESTR:TARGET%的意志，让他不由自主地发出了呻吟……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1828-1832",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……不……不要这样……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1836-1840",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不！不要…放开%SELF_CALL\(TARGET\)%！出去！拔出去啊！…啊……啊啊！」\s*$\s*^\s*DATAFORM 「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」\s*$\s*^\s*DATAFORM 「不！不要过来！唔！啊啊！不行……啊啊啊！！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1841-1845",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1858",
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1860",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1861",
        any: [
          /^\s*PRINTFORMW 「呵呵～终於能摆脱处女了呢……好期待哦……快点来呀～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1862",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%露出了迫不及待的表情，主动地拨开了自己的臀瓣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1864",
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1865",
        any: [
          /^\s*PRINTFORMW 「能…能够将第一次献给魔王大人，真的，真的非常地开心…」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1866",
        any: [
          /^\s*PRINTFORMW 「听说第一次都会很痛的样子，但是，是魔王大人的话……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1867",
        any: [
          /^\s*PRINTFORMW 「就算是疼痛，也一定会被幸福感覆盖过去的呢……」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1868",
        any: [
          /^\s*PRINTFORMW 	%SAVESTR:TARGET%露出信任的笑容，主动地拨开了自己的臀瓣……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1871",
        any: [
          /^\s*PRINTFORMW 「不！第一次居然…要跟你这种……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1872",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1876",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1879",
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1880",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1882",
        any: [
          /^\s*PRINTFORMW （这体位……看不见脸……就把对方当成魔王大人吧……）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1883",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%低垂的睫毛掩盖了神情，顺从地接受了%SAVESTR:PLAYER%的进入……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1887",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸颊晕红地露出了幸福的微笑……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1891",
        any: [
          /^\s*PRINTFORMW 「不！放手！你想要做什么……不！…走！走开啊！啊啊啊！」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1892",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%惊怒地拼命挣扎着，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1901-1905",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「果然……从後面来……是最……最深的了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「还……还要啊！……唔……好……好棒……快……快点啊♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「可…可以射在里面哦♡…想…想要……满满的……精液♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1906",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫荡地扭动着腰部，正因快感而不知廉耻地浪叫着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1910",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1911",
        any: [
          /^\s*PRINTFORMW 「嗯……啊啊～从後面……进……进来了……%SAVESTR:PLAYER%的………嗯啊～♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1913",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脑子想着魔王大人的事情，身体却和%SAVESTR:PLAYER%紧紧交合着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1915-1919",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好……好厉害……还……还想要……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「想要……魔王大人的孩子…请……请射在里面吧？…嗯…啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里是…属於魔王大人的……请…请打上精液的印记～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1920-1924",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%被心爱的魔王大人拥抱，不自觉地说着肉麻的情话……\s*$\s*^\s*DATAFORM 能跟心爱的魔王大人交合，%SAVESTR:TARGET%露出了幸福无比的笑容……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%带着崇敬又爱慕的眼神，不停地对%SAVESTR:PLAYER%倾诉着爱语……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1929-1933",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「好…好奇怪……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……这……这是什么！唔！……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「明明……不想要的……但……但是……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1934-1938",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%脸上带着异样的嫣红，似乎渐渐从性交中得到了快感……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%像是在忍耐着什么一样，渐渐发出了断断续续的呻吟……\s*$\s*^\s*DATAFORM 身体的快感背叛了%SAVESTR:TARGET%的意志，让他不由自主地发出了呻吟……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1942-1946",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……再这样动会……唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……不……不要这样……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1950-1954",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不！不要…放开%SELF_CALL\(TARGET\)%！出去！拔出去啊！…啊……啊啊！」\s*$\s*^\s*DATAFORM 「这种侵犯很有意思吗？混……混帐…！不！不要啊！！」\s*$\s*^\s*DATAFORM 「不！不要过来！唔！啊啊！不行……啊啊啊！！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1955-1959",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1973",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1975",
        any: [
          /^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是积极地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1977",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1978",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1984",
        any: [
          /^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是露出欣喜的表情地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1989",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "1997-2001",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「後面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2002",
        any: [
          /^\s*PRINTFORMW 从屁股传来激烈的快感，让%SAVESTR:TARGET%失神地发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2006-2010",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2011",
        any: [
          /^\s*PRINTFORMW 明明被侵犯着屁股，%SAVESTR:TARGET%也还是扭动着身体发出了呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2015",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2016",
        any: [
          /^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2018",
        any: [
          /^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2020-2024",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里…也…想要热腾腾的……啊！%SELF_CALL\(TARGET\)%…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2034",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2037",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2039-2043",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……%SELF_CALL\(TARGET\)%……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2044-2048",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 比起自己肉体的愉悦，%SAVESTR:TARGET%似乎先顾虑着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%努力地摆动着腰身，竭尽全力地想要让%SAVESTR:PLAYER%觉得舒服……\s*$\s*^\s*DATAFORM 尽管%SAVESTR:TARGET%气喘吁吁，但仍时不时观察照顾着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2053-2057",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……後面…会…会……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2061-2065",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」\s*$\s*^\s*DATAFORM 「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」\s*$\s*^\s*DATAFORM 「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2066-2070",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2080",
        any: [
          /^\s*IF SELECTCOM == 27\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2082",
        any: [
          /^\s*IF CFLAG:TARGET:328 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2084",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2086",
        any: [
          /^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是积极地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2088",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2089",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2095",
        any: [
          /^\s*PRINTFORMW 尽管是第一次用这个体位进行肛交，%SAVESTR:TARGET%还是露出欣喜的表情地配合着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2100",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2102",
        any: [
          /^\s*CFLAG:TARGET:328 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2108-2112",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「後面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2113",
        any: [
          /^\s*PRINTFORMW 从屁股传来激烈的快感，让%SAVESTR:TARGET%失神地发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2114",
        any: [
          /^\s*CFLAG:328 = 7\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2117-2121",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2122",
        any: [
          /^\s*PRINTFORMW 明明被侵犯着屁股，%SAVESTR:TARGET%也还是扭动着身体发出了呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2123",
        any: [
          /^\s*CFLAG:328 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2125",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2126",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2127",
        any: [
          /^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2129",
        any: [
          /^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2131-2135",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里…也…想要热腾腾的……啊！%SELF_CALL\(TARGET\)%…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2136-2140",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 来自後穴的快感，让%SAVESTR:TARGET%恍惚失神甚至语无论次了起来……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%因为後穴的快感，一边呻吟一边向%SAVESTR:PLAYER%求饶着……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%一心想要服侍%SAVESTR:PLAYER%，但是快感太过强烈，似乎让他忘记了自己的目的……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2142",
        any: [
          /^\s*CFLAG:328 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2144",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2145",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2148",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2150-2154",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……%SELF_CALL\(TARGET\)%……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2155-2159",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 比起自己肉体的愉悦，%SAVESTR:TARGET%似乎先顾虑着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%努力地摆动着腰身，竭尽全力地想要让%SAVESTR:PLAYER%觉得舒服……\s*$\s*^\s*DATAFORM 尽管%SAVESTR:TARGET%气喘吁吁，但仍时不时观察照顾着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2161",
        any: [
          /^\s*CFLAG:328 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2163",
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2164-2168",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……後面…会…会……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2169",
        any: [
          /^\s*CFLAG:328 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2171",
        any: [
          /^\s*ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2172-2176",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」\s*$\s*^\s*DATAFORM 「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」\s*$\s*^\s*DATAFORM 「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2177-2181",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2182",
        any: [
          /^\s*CFLAG:328 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2195",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2197",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着期待的笑容，积极地回应着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2199",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2205",
        any: [
          /^\s*PRINTFORMW 尽管%SAVESTR:TARGET%惊怒地拼命挣扎，但是还是无法抵抗%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2213-2217",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「後面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2218",
        any: [
          /^\s*PRINTFORMW 从屁股传来激烈的快感，让%SAVESTR:TARGET%失神地发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2222-2226",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2230",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2231",
        any: [
          /^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2233",
        any: [
          /^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2235-2239",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里…也…想要热腾腾的……啊！%SELF_CALL\(TARGET\)%…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2240-2244",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 来自後穴的快感，让%SAVESTR:TARGET%恍惚失神甚至语无论次了起来……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%因为後穴的快感，一边呻吟一边向%SAVESTR:PLAYER%求饶着……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%一心想要服侍%SAVESTR:PLAYER%，但是快感太过强烈，似乎让他忘记了自己的目的……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2249",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2252",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2254-2258",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……%SELF_CALL\(TARGET\)%……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2259-2263",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 比起自己肉体的愉悦，%SAVESTR:TARGET%似乎先顾虑着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%努力地摆动着腰身，竭尽全力地想要让%SAVESTR:PLAYER%觉得舒服……\s*$\s*^\s*DATAFORM 尽管%SAVESTR:TARGET%气喘吁吁，但仍时不时观察照顾着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2268-2272",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……後面…会…会……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2276-2280",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」\s*$\s*^\s*DATAFORM 「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」\s*$\s*^\s*DATAFORM 「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2281-2285",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2299",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2301",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着期待的笑容，积极地回应着%SAVESTR:PLAYER%的动作……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2303",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2317-2321",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「後面…被…塞得满满的感觉……真是…太棒了♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「弄…弄坏也……可以…用力……还……还要♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用屁股……高潮的话……是不是很……变态？但……但是♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2322",
        any: [
          /^\s*PRINTFORMW 从屁股传来激烈的快感，让%SAVESTR:TARGET%失神地发出了淫荡的呻吟……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2326-2330",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「真是…喜…喜欢……用这里吗？…唔…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不…不要……太…用力哦…就…就是这样♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「不……不可以…太深了……轻…轻点呀♡……嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2334",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2335",
        any: [
          /^\s*PRINTFORMW 「唔！啊啊～再这样子会……会…不可以……嗯♡…嗯啊…啊啊～♡♡」\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2337",
        any: [
          /^\s*PRINTFORMW 从被侵犯的後穴传来了强烈的快感，%SAVESTR:TARGET%一边想着魔王大人一边咬牙承受着……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2339-2343",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「嗯！呀！抱…抱歉…实在…是因为…太舒服了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「啊～因为…是魔王大人……所以即使是……这种地方也……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「这里…也…想要热腾腾的……啊！%SELF_CALL\(TARGET\)%…真是太贪心了…嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2344-2348",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 来自後穴的快感，让%SAVESTR:TARGET%恍惚失神甚至语无论次了起来……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%因为後穴的快感，一边呻吟一边向%SAVESTR:PLAYER%求饶着……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%一心想要服侍%SAVESTR:PLAYER%，但是快感太过强烈，似乎让他忘记了自己的目的……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2353",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2356",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭上了眼睛，顺从地承受%SAVESTR:PLAYER%的侵犯……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2358-2362",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「啊！魔王大人…喜…喜欢这里吗？那…那么……用坏了也没关系♡嗯…嗯啊啊啊～♡♡」\s*$\s*^\s*DATAFORM 「虽然…用…这里…承欢……很羞耻…但是…只要您喜欢的话……%SELF_CALL\(TARGET\)%……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*DATAFORM 「用这个…污秽的地方……伺候尊贵的魔王大人…真的可以吗？……嗯♡…嗯啊…啊啊～♡♡」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2363-2367",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 比起自己肉体的愉悦，%SAVESTR:TARGET%似乎先顾虑着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%努力地摆动着腰身，竭尽全力地想要让%SAVESTR:PLAYER%觉得舒服……\s*$\s*^\s*DATAFORM 尽管%SAVESTR:TARGET%气喘吁吁，但仍时不时观察照顾着%SAVESTR:PLAYER%的感受……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2372-2376",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「不…不要……屁股…感觉好奇怪啊…唔！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「太……太深了……不……不行！嗯……啊…啊啊啊！」\s*$\s*^\s*DATAFORM 「停……停下来啊……後面…会…会……啊…啊啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2380-2384",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM 「喜欢侵犯屁股的变态！去死！……唔！……不……好痛！……啊啊！」\s*$\s*^\s*DATAFORM 「拔…拔出去啊！好痛！不…不要再进来了！……啊！……啊啊！」\s*$\s*^\s*DATAFORM 「不！不要啊！要……要坏掉了……唔！……不……好痛！……啊啊！」\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2385-2389",
        any: [
          /^\s*PRINTDATAL\s*$\s*^\s*DATAFORM %SAVESTR:TARGET%发出了凄惨的悲鸣……\s*$\s*^\s*DATAFORM 挣扎无用的%SAVESTR:TARGET%流下了屈辱的泪水……\s*$\s*^\s*DATAFORM 即使%SAVESTR:TARGET%死命的挣扎，也无法改变被侵犯的事实……\s*$\s*^\s*ENDDATA\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2399",
        any: [
          /^\s*IF SELECTCOM == 30\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2401",
        any: [
          /^\s*IF CFLAG:TARGET:331 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2403",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2406",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2409",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2417",
        any: [
          /^\s*CFLAG:TARGET:331 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2425",
        any: [
          /^\s*CFLAG:331 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2430",
        any: [
          /^\s*CFLAG:331 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2435",
        any: [
          /^\s*CFLAG:331 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2437",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2440",
        any: [
          /^\s*CFLAG:331 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2442",
        any: [
          /^\s*ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2445",
        any: [
          /^\s*CFLAG:331 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2454",
        any: [
          /^\s*IF SELECTCOM == 31\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2456",
        any: [
          /^\s*IF CFLAG:TARGET:332 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2458",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2461",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2464",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2472",
        any: [
          /^\s*CFLAG:TARGET:332 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2479",
        any: [
          /^\s*CFLAG:332 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2483",
        any: [
          /^\s*CFLAG:332 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2491",
        any: [
          /^\s*CFLAG:332 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2493",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2495",
        any: [
          /^\s*CFLAG:332 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2497",
        any: [
          /^\s*ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2500",
        any: [
          /^\s*CFLAG:332 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2513",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2518",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2522",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2544",
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2549",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2584",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2587",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2627",
        any: [
          /^\s*IF SELECTCOM == 34\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2629",
        any: [
          /^\s*IF CFLAG:TARGET:335 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2631",
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2633",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2637",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2645",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎是气过头了，失去了平时的伶牙俐齿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2646",
        any: [
          /^\s*PRINTFORMW 尽管再怎么不愿意，但是如果不自己来的话，可能会有更可怕的後果……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2653",
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2655",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%迫不及待地跨在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2663",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎是气过头了，失去了平时的伶牙俐齿……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2664",
        any: [
          /^\s*PRINTFORMW 尽管再怎么不愿意，但是如果不自己来的话，可能会有更可怕的後果……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2669",
        any: [
          /^\s*CFLAG:TARGET:335 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2681",
        any: [
          /^\s*CFLAG:335 = 6\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2683",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2684",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2686",
        any: [
          /^\s*PRINTFORMW （在魔王大人面前……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%居然坐在别人身上……呜）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2687",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭着眼睛不敢看%SAVESTR:MASTER%的表情，只是顺从地骑在%SAVESTR:PLAYER%身上扭摆着腰肢……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2694",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫糜地摆动着腰肢，竭尽全力地取悦着%SAVESTR:PLAYER%……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2696",
        any: [
          /^\s*CFLAG:335 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2698",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2705",
        any: [
          /^\s*CFLAG:335 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2707",
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2710",
        any: [
          /^\s*CFLAG:335 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2712",
        any: [
          /^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2715",
        any: [
          /^\s*CFLAG:335 = 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2728",
        any: [
          /^\s*IF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2766",
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2768",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%迫不及待地跨在%SAVESTR:PLAYER%的身上……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2770",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && !ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2784",
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2798",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2813",
        any: [
          /^\s*IF ASSIPLAY\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2815",
        any: [
          /^\s*PRINTFORMW （在魔王大人面前……%SELF_CALL\(TARGET\)%……%SELF_CALL\(TARGET\)%居然坐在别人身上……呜）\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2816",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%闭着眼睛不敢看%SAVESTR:MASTER%的表情，只是顺从地骑在%SAVESTR:PLAYER%身上扭摆着腰肢……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2823",
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%淫糜地摆动着腰肢，竭尽全力地取悦着%SAVESTR:PLAYER%……\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2844",
        any: [
          /^\s*IF SELECTCOM == 37\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2846",
        any: [
          /^\s*IF CFLAG:TARGET:338 == 0\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2848",
        any: [
          /^\s*IF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2854",
        any: [
          /^\s*CFLAG:TARGET:338 = 1\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2861",
        any: [
          /^\s*CFLAG:338 = 5\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2863",
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 == 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2865",
        any: [
          /^\s*CFLAG:338 = 4\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2867",
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2869",
        any: [
          /^\s*CFLAG:338 = 3\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2871",
        any: [
          /^\s*ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: "target/ERB/口上/EVENT_K15_伶俐.ERB",
        ref: "2873",
        any: [
          /^\s*CFLAG:338 = 2\s*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
