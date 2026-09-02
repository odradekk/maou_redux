// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #241 按 js 文件拆出：kojo-k10-club.mjs
//
// 锚由 target/ERB/口上/EVENT_K10_クラブ.ERB 对应行内容生成，整行锚定
// （^…$ + m 标志，非无锚定子串——后者对 PRINTFORMW 之类高频关键词毫无
// 区分力，行号漂移了也能碰巧命中，参见校核对本方案的复核记录）。区间
// 内合并全部非空白行以尽量提升区分度，超过 8 行的大区间（多为函数级概述
// 性引用）只取区间开头 8 行，与 K4 先例「大区间只锚开头一句」同构。裸
// ENDIF/ELSE/RETURN 0/RETURN 1 单行结构锚（1097 条，无区分力）已改经把
// JS 侧对应 `// :N` 注释原地扩窗为 `// :A-B`（源: kojo-k10-club.js 内联
// 注释本身，具体范围取自逐条全局唯一性探测），让声明的切片天然覆盖有区
// 分力的邻近内容——完成报告的「结构锚数」以此为 0（不含简报明文允许的
// 空 PRINTFORMW 单行锚，181 条）。

export const FILES = [
  {
    js: 'ere/kojo/kojo-k10-club.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '62-67',
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*#PRI\s*$\s*^\s*FLAG:110 = 1\s*$\s*^\s*SIF FLAG:7 == 0\s*$\s*^\s*FLAG:7 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '64',
        any: [/^\s*FLAG:110 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '66',
        any: [/^\s*FLAG:7 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '68-75',
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*#LATER\s*$\s*^\s*FLAG:110 = 0\s*$\s*^\s*;--------------------------------------------------\s*$\s*^\s*;EVENTTRAIN関係（X1をキャラ番号に置換）\s*$\s*^\s*;調教開始時のセリフ CFLAG 201～219を使用\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '70',
        any: [/^\s*FLAG:110 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '76-80',
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:170 != 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '76-602',
        any: [
          /^\s*@EVENTTRAIN\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:170 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;白梅花，阉掉就成了哑巴\s*$\s*^\s*SIF TALENT:121 != 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '80-81',
        any: [/^\s*RETURN 0\s*$\s*^\s*;白梅花，阉掉就成了哑巴\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '82-84',
        any: [
          /^\s*SIF TALENT:121 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '87',
        any: [/^\s*IF CFLAG:201 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '88',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '90',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '91',
        any: [/^\s*PRINTFORMW 「呼，这就是魔族的身体呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '92',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像要确认触感般开合着手指、扇动了几下背上的双翼，似乎对成为魔族这件事受到了点冲击，稍稍有些接受不能。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '93',
        any: [/^\s*PRINTFORMW 「没有想象中那么坏呐，变成魔族。」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '94',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%脸上浮现出一抹恶质的笑容。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '95',
        any: [
          /^\s*PRINTFORMW 「………话说回来，你应该知道了吧、我可是扶她哟？即使这样也想要抱我吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '96',
        any: [/^\s*PRINTL \[0\] - 直不起来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '97',
        any: [/^\s*PRINTL \[1\] - 就是这样才好。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '98-99',
        any: [/^\s*\$INPUT_LOOP\s*$\s*^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '100',
        any: [/^\s*IF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '101',
        any: [/^\s*PRINTFORMW 「哼、讨厌的话不做也没关系哦………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '102',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%有点遗憾地自言自语着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '103',
        any: [/^\s*ELSEIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '104',
        any: [
          /^\s*PRINTFORMW 「诶、骗人…你当真…呀~！突、突然做什么！稍微温柔一点啊…嗯\.\.！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '105',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着少许开心的笑容被你扑倒了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '106',
        any: [
          /^\s*PRINTFORMW 大概从一开始就是抱着这个打算才接受了魔族改造,想尽情享受一下各种愉快的事情吧………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '107-108',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT > 1\s*$\s*^\s*GOTO INPUT_LOOP\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '108-110',
        any: [
          /^\s*GOTO INPUT_LOOP\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:201 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '110',
        any: [/^\s*CFLAG:201 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '112',
        any: [/^\s*CFLAG:370 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '114-115',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「…唔呼呼、这间屋子里精液和爱液的气味好厉害呢♪ 我的气味也会混入这件屋子吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '115',
        any: [
          /^\s*PRINTFORMW 「…唔呼呼、这间屋子里精液和爱液的气味好厉害呢♪ 我的气味也会混入这件屋子吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '116',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%从这间调教室的气氛中，猜出了自己接下来要被做的事情。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '117',
        any: [
          /^\s*PRINTFORMW 「嘛~话说回来想调教我是可以啦…但是，我可是长着“这个”唷？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '118',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%恶意的笑着把衣服下摆掀了起来，露出了雪白的腹部和女孩子不应该有的凸♂起。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '119',
        any: [
          /^\s*PRINTFORMW 「看到这个也觉得没关系的话、随便你想对我做什么也可以哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '120',
        any: [/^\s*PRINTFORMW 「啊、但是弄痛我绝对不行！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '121',
        any: [/^\s*PRINTFORMW 「那些不舒服的奇怪变态行为也讨厌的说！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '122',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%接二连三的抛出的条件，让%SAVESTR:PLAYER%的头开始痛了起来。于是%SAVESTR:TARGET%撅起了嘴再一次发问道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '123',
        any: [/^\s*PRINTFORMW 「所以说、我这样的身体你真的直的起来嘛？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '124',
        any: [/^\s*PRINTL \[0\] - 直不起来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '125',
        any: [/^\s*PRINTL \[1\] - 就是这样才赞！\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '126-127',
        any: [/^\s*\$INPUT_LOOP1\s*$\s*^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '128',
        any: [/^\s*IF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '129',
        any: [/^\s*PRINTFORMW 「哼、讨厌的话不做也没关系…呿………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '130',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%有点遗憾地自言自语着………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '131',
        any: [/^\s*ELSEIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '132',
        any: [
          /^\s*PRINTFORMW 「诶、骗人…你当真…呀~！…在、在摸哪里啊！…稍微温柔点…唔嗯！啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '133',
        any: [
          /^\s*PRINTFORMW 可能是心理作用吧%SAVESTR:TARGET%似乎带着一丝开心的笑容被你扑倒了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '134-135',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT > 1\s*$\s*^\s*GOTO INPUT_LOOP1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '135-137',
        any: [/^\s*GOTO INPUT_LOOP1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '136-138',
        any: [/^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:201 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '138',
        any: [/^\s*CFLAG:201 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '138-140',
        any: [
          /^\s*CFLAG:201 = 1\s*$\s*^\s*RETURN 1\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '143',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '144',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '145',
        any: [/^\s*PRINTFORMW 「呼，这就是魔族的身体呐」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '146',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像要确认触感般开合着手指、扇动了几下背上的双翼，似乎对成为魔族这件事受到了点冲击，稍稍有些接受不能。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '147',
        any: [/^\s*PRINTFORMW 「没有想象中那么坏呐，变成魔族。」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '148',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸上浮现出一抹恶质的笑容………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '150',
        any: [/^\s*CFLAG:370 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '150-152',
        any: [
          /^\s*CFLAG:370 = 2\s*$\s*^\s*RETURN 1\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '155',
        any: [/^\s*ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '156',
        any: [/^\s*IF TALENT:85 \|\| TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '157',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '158',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%把那个水晶球所看的东西告诉了%SAVESTR:TARGET%，%SAVESTR:TARGET%脸色苍白的退缩着，想要从这里逃跑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '159',
        any: [
          /^\s*PRINTFORMW 「原、原谅我…那、那个时候是被逼的没有办法…所以…啊呜\.\.原谅我」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '160',
        any: [
          /^\s*PRINTFORMW 大颗的泪珠不断从%SAVESTR:TARGET%的双眼涌出。这幅柔弱的样子更加刺激了%SAVESTR:PLAYER%的嗜虐心。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '161',
        any: [
          /^\s*PRINTFORMW 接下来%SAVESTR:TARGET%在%SAVESTR:PLAYER%一次次的讯问下断断续续地把她被捕期间所发生的事情说了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '162',
        any: [
          /^\s*PRINTFORMW 「啊啊～…是、是的…狂王他…那家伙、被那家伙侵犯了…诶？呃\.\.是、对不起\.\.很舒服…呜呜\.\.不要再逼我说下去了…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '163',
        any: [
          /^\s*PRINTFORMW 「够了…这就是全部唷…啊啊…用你的手…让我把那样的事情都忘掉吧………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '164',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用力抱着%SAVESTR:PLAYER%紧紧地、陷入了沉默………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '166',
        any: [/^\s*CFLAG:650 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '167-168',
        any: [/^\s*ELSE\s*$\s*^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '168',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '169',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%把那个水晶球所看的东西告诉了%SAVESTR:TARGET%，%SAVESTR:TARGET%表情黯淡的坐在那里一言不发、良久、%SAVESTR:TARGET%终于仿佛忍受不了了一般开口道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '170',
        any: [
          /^\s*PRINTFORMW 「………请忘了它吧…那种事。求你了,请把那些水晶球给交给我吧！全部砸烂了也好！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '171',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%以仿佛要哭出来的通红双眼向%SAVESTR:PLAYER%请求着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '172',
        any: [
          /^\s*PRINTFORMW 「我以为不是这样的！狂王他骗了我！都是把我当做玩具的狂王的错！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '174',
        any: [/^\s*CFLAG:650 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '174-176',
        any: [/^\s*CFLAG:650 = 0\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '175-177',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '181',
        any: [/^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '182',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '183',
        any: [/^\s*PRINTFORMW 「唔呼呼、这种感觉\.\.渐渐明白了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '184',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的股间盛大的勃起了、直到%SAVESTR:PLAYER%坏笑着指了指她充血的肉棒，%SAVESTR:TARGET%才惊觉这一事实，害羞地用手紧紧按住了它。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '185',
        any: [/^\s*PRINTFORMW 「讨厌…不要那样子看…很让人害羞的啊………♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '186',
        any: [/^\s*CFLAG:201 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '186-188',
        any: [/^\s*CFLAG:201 = 2\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '190',
        any: [/^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '191',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '192',
        any: [
          /^\s*PRINTFORMW 「看啊看啊、你的调教让这里变成这个样子了哦…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '193',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的股间比以前更加剧烈的勃起了、%SAVESTR:PLAYER%炫耀一般地轻轻扭动着腰肢。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '194',
        any: [/^\s*PRINTFORMW 「啊啊~…让我更加的舒服吧…好兴奋啊…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '195',
        any: [/^\s*CFLAG:201 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '195-197',
        any: [/^\s*CFLAG:201 = 3\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '199',
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '200',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '201',
        any: [
          /^\s*PRINTFORMW 「呐啊、稍微做点痛痛的、像变态一样的事情也可以、所以\.\.\.………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '202',
        any: [/^\s*PRINTFORMW 「让我更加舒服吧…呐~…呐~…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '203',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎完全陷入调教之中不可自拔了。不、好像从很久之前抵抗就开始减少了吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '204',
        any: [
          /^\s*PRINTFORMW 看到你惊讶的样子%SAVESTR:TARGET%轻笑着回答了这个疑问。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '205',
        any: [
          /^\s*PRINTFORMW 「我啊\.\.\.除了研究之外最喜欢的就是做舒服的事情了、在这里做不了研究的话…令人舒服的事情当然要大做特做咯？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '206',
        any: [/^\s*CFLAG:201 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '206-208',
        any: [/^\s*CFLAG:201 = 4\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '210',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT:TARGET:314 != 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '211',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '212',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…%UNICODE\(0x2661\) \*1% 唔嗯~…你、哈啊%UNICODE\(0x2661\) \*1%你终于来了\.\.噫\.\.要、要出来了哦哦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '213',
        any: [
          /^\s*PRINTFORMW 跪坐在床上激烈自慰的%SAVESTR:TARGET%看到%SAVESTR:PLAYER%走进来，含糊不清的打了个招呼。完全勃起的肉棒整根被摩擦得红彤彤的，随着%SAVESTR:TARGET%的淫叫再一次将大量白浊液体喷向了泥泞不堪的床单\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '214',
        any: [
          /^\s*PRINTFORMW 不知道是调教结果，或是原本具有性癖的错%SAVESTR:TARGET%已经成为不自慰就没办法活下去的淫乱肉棒自慰狂了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '215',
        any: [
          /^\s*PRINTFORMW 「噢噢～！肉棒！摩擦肉棒超舒服！被、被谁看着感觉更素服惹！！%UNICODE\(0x2661\) \*2%」像狗一样趴跪着，%SAVESTR:TARGET%一边“咻咻”地闻着满是精液的床单，一边更加疯狂的用双手撸动自己还在喷射的阴茎\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '216',
        any: [
          /^\s*PRINTFORMW 「…………呐~…你也感到兴奋了吧？？所以快点来\.\.把你的肉棒插进来…呀哦哦哦！去了去了！！…%UNICODE\(0x2661\) \*1%」淫靡的摇动着臀部，%SAVESTR:TARGET%试着向%SAVESTR:PLAYER%发出邀请，然而再一次剧烈射精让她翻起了白眼，脱力一般倒在了温腥的爱液中，微微颤抖着，良久才恢复了行动能力\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '217',
        any: [/^\s*IF TALENT:TARGET:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '218',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、勃起阴茎下方，露出了漂亮的粉色私处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '219',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、一~~直等着你夺去我的处女唷？ …我也差不多快要忍耐不下去了啊%UNICODE\(0x2661\) \*1% 呐啊…随时都可以唷…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '220',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%轻轻舔着嘴唇带着淫靡的表情笑着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '220-222',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%轻轻舔着嘴唇带着淫靡的表情笑着………\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '222',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '223',
        any: [
          /^\s*PRINTFORMW 「看啊…我的这里…想要肉棒想的发抖了呢…呐啊~…请给我吧………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '224',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%可爱的眨了眨眼睛，娇声请求着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '225-226',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:201 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '226',
        any: [/^\s*CFLAG:201 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '227-228',
        any: [/^\s*RETURN 1\s*$\s*^\s*;淫乱\+魔族化\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '229',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '230',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '232',
        any: [/^\s*IF CFLAG:370 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '233',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊a…终于来呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '234',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双腿分开无力地躺在地板上，青色的肌肤泛起大片大片的红潮。姿势看起来非常色情。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '235',
        any: [
          /^\s*PRINTFORMW 「啊啊…想要你的肉棒想要的不得了…自慰什么的完全不够呢…啊啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '236',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%身边的坐垫上也好床上也好全是半干涸的爱液痕渍。到底自慰了多少遍才会弄成这个样子啊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '236-249',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%身边的坐垫上也好床上也好全是半干涸的爱液痕渍。到底自慰了多少遍才会弄成这个样子啊。\s*$\s*^\s*PRINTFORMW 「之前怎么样也联系不到你呢…我、想要的都快死掉了呐…啊啊～…求求你…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*IF TALENT:TARGET:0 == 1\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、勃起阴茎下方，露出了湿的一塌糊涂的私处。\s*$\s*^\s*PRINTFORMW 「把我的处女膜…用你的肉棒狠狠捅破吧…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '237',
        any: [
          /^\s*PRINTFORMW 「之前怎么样也联系不到你呢…我、想要的都快死掉了呐…啊啊～…求求你…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '238',
        any: [/^\s*IF TALENT:TARGET:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '239',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、勃起阴茎下方，露出了湿的一塌糊涂的私处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '240',
        any: [
          /^\s*PRINTFORMW 「把我的处女膜…用你的肉棒狠狠捅破吧…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '241',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '243',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '244',
        any: [
          /^\s*PRINTFORMW 「像平常那样用力的把肉棒插进来！…哈啊～…你的…魔王肉棒想要的要疯了啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '244-249',
        any: [
          /^\s*PRINTFORMW 「像平常那样用力的把肉棒插进来！…哈啊～…你的…魔王肉棒想要的要疯了啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:201 = 6\s*$\s*^\s*RETURN 1\s*$\s*^\s*;初回調教後に魔族\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '245',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '247',
        any: [/^\s*CFLAG:201 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '248-249',
        any: [/^\s*RETURN 1\s*$\s*^\s*;初回調教後に魔族\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '250',
        any: [/^\s*ELSEIF CFLAG:370 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '251',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊啊～…终于来呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '252',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双腿分开无力地躺在地板上，青色的肌肤泛起大片大片的红潮。姿势看起来非常色情。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '253',
        any: [
          /^\s*PRINTFORMW 「啊啊…想要你的肉棒想要的不得了…自慰什么的完全不够呢…啊啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '254',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%身边的坐垫上也好床上也好全是半干涸的爱液痕渍。到底自慰了多少遍才会弄成这个样子啊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '254-267',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%身边的坐垫上也好床上也好全是半干涸的爱液痕渍。到底自慰了多少遍才会弄成这个样子啊。\s*$\s*^\s*PRINTFORMW 「之前怎么样也联系不到你呢…我、想要的都快死掉了呐…啊啊～…求求你…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*IF TALENT:TARGET:0 == 1\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、勃起阴茎下方，露出了湿的一塌糊涂的私处。\s*$\s*^\s*PRINTFORMW 「把我的处女膜…用你的肉棒狠狠捅破吧…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '255',
        any: [
          /^\s*PRINTFORMW 「之前怎么样也联系不到你呢…我、想要的都快死掉了呐…啊啊～…求求你…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '256',
        any: [/^\s*IF TALENT:TARGET:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '257',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、勃起阴茎下方，露出了湿的一塌糊涂的私处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '258',
        any: [
          /^\s*PRINTFORMW 「把我的处女膜…用你的肉棒狠狠捅破吧…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '259',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '261',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%将两腿大大地分开、自己拉开了肉棒下方颤抖的蜜穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '262',
        any: [
          /^\s*PRINTFORMW 「像平常那样用力的把肉棒插进来！…哈啊～…你的…魔王肉棒想要的要疯了啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '262-267',
        any: [
          /^\s*PRINTFORMW 「像平常那样用力的把肉棒插进来！…哈啊～…你的…魔王肉棒想要的要疯了啊啊！」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:201 = 6\s*$\s*^\s*RETURN 1\s*$\s*^\s*;陥落後に魔族\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '263',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的魔族之瞳已经被肉欲染得一片通红、一边流着泪一边向你恳求道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '265',
        any: [/^\s*CFLAG:201 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '265-267',
        any: [
          /^\s*CFLAG:201 = 6\s*$\s*^\s*RETURN 1\s*$\s*^\s*;陥落後に魔族\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '268-269',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%经过数次改造之后成为了魔族。她淫靡的身姿和气场与简直与原生的魅魔难辨高下。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '269',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%经过数次改造之后成为了魔族。她淫靡的身姿和气场与简直与原生的魅魔难辨高下。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '270',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、总觉得这个形象更适合我呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '271',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抱住了%SAVESTR:PLAYER%尾巴也缠了上来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '272',
        any: [
          /^\s*PRINTFORMW 「啊啊…快点来侵犯成了魔族的我吧…来不顾一切的做爱…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '273',
        any: [/^\s*CFLAG:201 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '273-275',
        any: [/^\s*CFLAG:201 = 6\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '274-276',
        any: [/^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '277',
        any: [
          /^\s*ELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9 && TALENT:TARGET:76 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '278',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '279',
        any: [/^\s*PRINTFORMW 「啊、终于来了啊…唔呼呼」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '280',
        any: [
          /^\s*PRINTFORMW 一直等待着你的%SAVESTR:TARGET%，笑眯眯的背着双手走了过来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '281',
        any: [/^\s*PRINTFORMW 「嗳、稍微把耳朵凑过来点、是很重要的话哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '282',
        any: [
          /^\s*PRINTFORMW 「………老实的说呢。我啊、其实不怎么喜欢狂王殿下。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '283',
        any: [
          /^\s*PRINTFORMW 「把闭门研究的我找出来，强硬的把什么爱人啊狂王亲卫队之类的头衔加在我身上、结果却是为了让我当作战的诱饵呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '284',
        any: [
          /^\s*PRINTFORMW 这么说来圣灵城的奇怪作战配置也是狂王的计划吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '285',
        any: [
          /^\s*PRINTFORMW 「之前你的部下——那些前勇者来抓我的时候、对她们说了很过分的话呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '286',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈的耸了耸肩膀，有些自嘲的笑了笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '287',
        any: [
          /^\s*PRINTFORMW 「所以说，最后被你抓到了真是太好了、这次终于脱离了狂王的统治，得到了自由呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '288',
        any: [/^\s*PRINTFORMW 但是、这不只是统治者从狂王变成了魔王吗？\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '289',
        any: [
          /^\s*PRINTFORMW 「不是这样哦、我是真的喜欢上你了、所以这样就好%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%轻快地踮起脚尖吻了吻%SAVESTR:PLAYER%的唇角，哒哒地跑开了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '290',
        any: [
          /^\s*PRINTFORMW 然后%SAVESTR:TARGET%再一次向着爱人露出了狡黠而温暖的笑容………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '291',
        any: [/^\s*CFLAG:201 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '292-293',
        any: [/^\s*RETURN 1\s*$\s*^\s*;爱慕\+魔族化\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '294',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '295',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '297',
        any: [/^\s*IF CFLAG:370 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '298',
        any: [/^\s*PRINTFORMW 「啊、终于来了啊…唔呼呼」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '299',
        any: [
          /^\s*PRINTFORMW 一直等待着你的%SAVESTR:TARGET%，笑眯眯的背着双手走了过来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '300',
        any: [/^\s*PRINTFORMW 「嗳、稍微把耳朵凑过来点、是很重要的话哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '301',
        any: [
          /^\s*PRINTFORMW 「………老实的说呢。我啊、其实不怎么喜欢狂王殿下」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '302',
        any: [
          /^\s*PRINTFORMW 「把闭门研究的我找出来，强硬的把什么爱人啊狂王亲卫队之类的头衔加在我身上、结果却是为了让我当作战的诱饵呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '303',
        any: [
          /^\s*PRINTFORMW 这么说来圣灵城的奇怪作战配置也是狂王的计划吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '304',
        any: [
          /^\s*PRINTFORMW 「之前你的部下——那些前勇者来抓我的时候、对她们说了很过分的话呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '305',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈的耸了耸肩膀，有些自嘲的笑了笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '306',
        any: [
          /^\s*PRINTFORMW 「所以说，最后被你抓到了真是太好了、这次终于脱离了狂王的统治，得到了自由呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '307',
        any: [/^\s*PRINTFORMW 但是、这不只是统治者从狂王变成了魔王吗？\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '308',
        any: [
          /^\s*PRINTFORMW 「不是这样哦、我是真的喜欢上你了、所以这样就好%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%轻快地踮起脚尖吻了吻%SAVESTR:PLAYER%的唇角，哒哒地跑开了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '309',
        any: [
          /^\s*PRINTFORMW 轻笑着的%SAVESTR:TARGET%的魔族之眼仿佛在在闪闪发光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '310',
        any: [/^\s*CFLAG:201 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '311-312',
        any: [/^\s*RETURN 1\s*$\s*^\s*;調教後に魔族\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '313',
        any: [/^\s*ELSEIF CFLAG:370 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '314',
        any: [/^\s*PRINTFORMW 「啊、终于来了啊…唔呼呼」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '315',
        any: [
          /^\s*PRINTFORMW 一直等待着你的%SAVESTR:TARGET%，笑眯眯的背着双手走了过来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '316',
        any: [/^\s*PRINTFORMW 「嗳、稍微把耳朵凑过来点、是很重要的话哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '317',
        any: [
          /^\s*PRINTFORMW 「………老实的说呢。我啊、其实不怎么喜欢狂王殿下」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '318',
        any: [
          /^\s*PRINTFORMW 「把闭门研究的我找出来，强硬的把什么爱人啊狂王亲卫队之类的头衔加在我身上、结果却是为了让我当作战的诱饵呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '319',
        any: [
          /^\s*PRINTFORMW 这么说来圣灵城的奇怪作战配置也是狂王的计划吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '320',
        any: [
          /^\s*PRINTFORMW 「之前你的部下——那些前勇者来抓我的时候、对她们说了很过分的话呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '321',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%无奈的耸了耸肩膀，有些自嘲的笑了笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '322',
        any: [
          /^\s*PRINTFORMW 「所以说，最后被你抓到了真是太好了、这次终于脱离了狂王的统治，得到了自由呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '323',
        any: [/^\s*PRINTFORMW 但是、这不只是统治者从狂王变成了魔王吗？\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '324',
        any: [
          /^\s*PRINTFORMW 「不是这样哦、我是真的喜欢上你了、所以这样就好%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%轻快地踮起脚尖吻了吻%SAVESTR:PLAYER%的唇角，哒哒地跑开了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '325',
        any: [
          /^\s*PRINTFORMW 轻笑着的%SAVESTR:TARGET%的魔族之眼仿佛在在闪闪发光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '326',
        any: [/^\s*CFLAG:201 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '326-328',
        any: [
          /^\s*CFLAG:201 = 8\s*$\s*^\s*RETURN 1\s*$\s*^\s*;陥落後に魔族\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '329-330',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%经过了重重改造终于成为了魔族。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '330',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%经过了重重改造终于成为了魔族。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '331',
        any: [
          /^\s*PRINTFORMW 比以前更加强大的魔力缠绕着那个身影，已经成为了优秀的魔族了呢。看现在的样子的话，恐怕谁也想不到之前曾经是人类吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '332',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、好像比以前感觉更好呢%UNICODE\(0x2661\) \*1%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '333',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%“帕库帕库”地扇动着背上的翅膀，样子十分可爱。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '334',
        any: [
          /^\s*PRINTFORMW 「为了你我会更加努力哦…要好好疼爱我啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '335',
        any: [/^\s*CFLAG:201 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '335-337',
        any: [/^\s*CFLAG:201 = 8\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '336-338',
        any: [/^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*;崩坏\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '339',
        any: [/^\s*ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '340',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '341',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的眼中失去了生气。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '342',
        any: [/^\s*PRINTFORMW 承受不了过度的调教崩坏掉了的样子。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '343',
        any: [/^\s*PRINTFORMW 「………………啊……呜………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '344',
        any: [/^\s*CFLAG:201 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '345-346',
        any: [/^\s*RETURN 1\s*$\s*^\s*;崩坏してたら二回目以降へ飛ぶ\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '347',
        any: [/^\s*ELSEIF TALENT:TARGET:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '348',
        any: [/^\s*CALL K10_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '351',
        any: [/^\s*ELSEIF ASSI < 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '352',
        any: [/^\s*CALL K10_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '361',
        any: [/^\s*ELSEIF TALENT:MASTER:122 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '362',
        any: [/^\s*CALL K10_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '364',
        any: [/^\s*ELSEIF NO:ASSI == 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '365',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '367',
        any: [/^\s*IF CFLAG:202 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '369',
        any: [/^\s*IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '370',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:ASSI%队长也成为了魔王大人的下仆了呢…这样的事情我完全没想到呐」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '371',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%颇有兴趣地打量着%SAVESTR:ASSI%经过调教后的身姿。%SAVESTR:ASSI%被看地双颊泛红，下意识地像恋人一样抱住了%SAVESTR:PLAYER%的手臂。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '372',
        any: [
          /^\s*PRINTFORMW 『你也是一副完全效忠了的雌犬的脸呢、啊啊、真是令人开心的事实』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '373',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%互相对视着，作为同样被魔王宠爱的两个人产生了共鸣。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '374',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、呐隊長、从今以后一起侍奉魔王大人吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '375',
        any: [/^\s*CFLAG:202 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '377',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && CFLAG:201 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '378',
        any: [
          /^\s*PRINTFORMW 「啊哈%UNICODE\(0x2661\) \*1%…%SAVESTR:ASSI%队长…看我的肉棒\.\.看着它%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '379',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%和很久不见的%SAVESTR:ASSI%再会了，然而却一刻也不能停下玩弄阴茎的手。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '380',
        any: [/^\s*PRINTFORMW 『虽然我也听过传闻…真是一副下流的身体啊』\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '381',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的表现完全出乎了意料，%SAVESTR:PLAYER%和%SAVESTR:ASSI%不由得露出了一副吃惊的表情。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '382',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…今日是%SAVESTR:ASSI%队长来疼爱我吗…呵呵～好开心啊～ 唔嗯%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%痴笑着，蜜穴和龟头同时颤抖着流出了液体\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '383',
        any: [/^\s*CFLAG:202 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '385-386',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嘛、连%SAVESTR:ASSI%隊長也被你的毒牙咬到了呢…唔呼呼、各种意味上来说都很厉害啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '386',
        any: [
          /^\s*PRINTFORMW 「嘛、连%SAVESTR:ASSI%隊長也被你的毒牙咬到了呢…唔呼呼、各种意味上来说都很厉害啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '387',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用舌尖轻舔着嘴唇，趣味盎然地打量着%SAVESTR:ASSI%被调教后的身姿。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '388',
        any: [
          /^\s*PRINTFORMW 『怎、怎么了%SAVESTR:TARGET%…有什么问题吗？』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '389',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%以前偷偷用魔法调查过%SAVESTR:ASSI%也是狂王的爱人。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '390',
        any: [
          /^\s*PRINTFORMW 「没什么、只是对你到底改变到了何种程度感兴趣而已」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '391',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%露出了大胆而挑逗的笑容………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '392',
        any: [/^\s*CFLAG:202 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '392-394',
        any: [/^\s*CFLAG:202 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '392-396',
        any: [
          /^\s*CFLAG:202 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;二回目以降\s*$\s*^\s*;爱＆淫乱取得時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '398',
        any: [
          /^\s*ELSEIF CFLAG:202 == 1 && FLAG:7 ==2 && TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '400',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '401',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、%SAVESTR:ASSI%隊長、一起侍奉魔王大人吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '402',
        any: [
          /^\s*PRINTFORMW 『感觉都改变了啊、你。果然是真的成为了魔王大人的下仆呢…』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '403',
        any: [
          /^\s*PRINTFORMW 「终于让自己变得坦率了嘛%UNICODE\(0x2661\) \*1% 所以才能变得这么自由呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '404',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%眯起眼睛露出了狡黠的笑容。%SAVESTR:ASSI%也对她报以微笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '405',
        any: [/^\s*PRINTFORMW 『嗯嗯、如今的你真是魅力四射♪』\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '406',
        any: [/^\s*CFLAG:202 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '408',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '409',
        any: [
          /^\s*PRINTFORMW 「啊哈%UNICODE\(0x2661\) \*1%…%SAVESTR:ASSI%隊長…看我的肉棒\.\.看着它%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '410',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%注视着，更加兴奋的搓弄着自己的扶她肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '411',
        any: [
          /^\s*PRINTFORMW 『这就是你的本性啊、果然淫乱的扶她最终都会堕落成这幅样子吗………』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '412',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%有些伤感的思考着，这让她看向%SAVESTR:TARGET%的眼神露出了一丝悲凉。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '413',
        any: [
          /^\s*PRINTFORMW 「啊啊嗯～…魔王殿下！%SAVESTR:ASSI%隊長～！去了！我要超级激烈的去了！%UNICODE\(0x2661\) \*2%」%SAVESTR:TARGET%自慰过度而变得红肿的扶她肉棒喷出了大量的白浊\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '414',
        any: [
          /^\s*PRINTFORMW 『呼…我会好好虐待你的、做好觉悟吧』%SAVESTR:ASSI%叹息着摇了摇头，眼底却闪过一丝嗜虐的冷光\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '415',
        any: [/^\s*CFLAG:202 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '415-417',
        any: [/^\s*CFLAG:202 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '416-419',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSEIF CFLAG:202 == 2 && FLAG:7 ==2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '419',
        any: [/^\s*ELSEIF CFLAG:202 == 2 && FLAG:7 ==2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '421',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '422',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、和%SAVESTR:ASSI%隊長一起侍奉魔王大人真是幸福呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '423',
        any: [
          /^\s*PRINTFORMW 『嗯、和你一起侍奉真的非常棒%UNICODE\(0x2661\) \*1%』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '424',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%向着躺在床上的%SAVESTR:PLAYER%微笑着，轻轻摇摆着两具各具魅力的身体贴了上去………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '426',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '427',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:ASSI%队长…请好好疼爱…我的肉、啊、肉棒吧…啊啊～%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%痴笑着，蜜穴和龟头同时颤抖着流出了液体\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '428',
        any: [
          /^\s*PRINTFORMW 『真是堕落下流的身体啊、我会好好虐待你的、做好觉悟吧♪』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '429',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%听到了%SAVESTR:ASSI%的调教宣言后不禁露出了期待的眼神、美丽的脸颊也因为情欲的翻腾逐渐染上了潮红色………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '429-431',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%听到了%SAVESTR:ASSI%的调教宣言后不禁露出了期待的眼神、美丽的脸颊也因为情欲的翻腾逐渐染上了潮红色………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '429-433',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%听到了%SAVESTR:ASSI%的调教宣言后不禁露出了期待的眼神、美丽的脸颊也因为情欲的翻腾逐渐染上了潮红色………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '433-434',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 『唔呼呼、今天就让你的扶她肉棒好好爽一爽吧！』%SAVESTR:ASSI%握住了%SAVESTR:TARGET%敏感的龟头，缓缓的揉捏着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '434',
        any: [
          /^\s*PRINTFORMW 『唔呼呼、今天就让你的扶她肉棒好好爽一爽吧！』%SAVESTR:ASSI%握住了%SAVESTR:TARGET%敏感的龟头，缓缓的揉捏着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '435',
        any: [
          /^\s*PRINTFORMW 「啊啊、是、隊長～…请尽情地疼爱我…啊～…啊啊～！」%SAVESTR:TARGET%腰随着%SAVESTR:ASSI%动作奇怪的扭动着，突然一股粘稠的精液从%SAVESTR:TARGET%指缝里飞溅了出来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '436',
        any: [
          /^\s*PRINTFORMW 毫无抵抗的被%SAVESTR:ASSI%压倒了，随着她的动作，%SAVESTR:TARGET%淫靡的叫声愈发高亢………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '436-438',
        any: [
          /^\s*PRINTFORMW 毫无抵抗的被%SAVESTR:ASSI%压倒了，随着她的动作，%SAVESTR:TARGET%淫靡的叫声愈发高亢………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '438-439',
        any: [/^\s*ENDIF\s*$\s*^\s*;助手银黑桃 NO:ASSI == 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '440',
        any: [/^\s*ELSEIF NO:ASSI == 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '441',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '443',
        any: [/^\s*IF CFLAG:203 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '445',
        any: [/^\s*IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '446',
        any: [
          /^\s*PRINTFORMW 「你也成为了魔王殿下的下仆了呢。嘛这些小事怎么都好啦、比起那个，今天的情况是？…3人一起做吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '447',
        any: [/^\s*PRINTFORMW 『当、当然是一起做、有什么不妥吗？』\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '448',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%双手抱肩旁观着两人互动%SAVESTR:ASSI%见状只好害羞的点了点头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '449',
        any: [
          /^\s*PRINTFORMW 「是这样啊、你会狂乱成什么样子真是令人期待呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '450',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%说着，股间的阴茎勃起到了隐隐发痛的地步。………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '451',
        any: [/^\s*CFLAG:203 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '453',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && CFLAG:201 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '454',
        any: [
          /^\s*PRINTFORMW 正在自慰着的%SAVESTR:TARGET%看到%SAVESTR:PLAYER%和%SAVESTR:ASSI%走进来，像打招呼一样向她们摇了摇手中的肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '455',
        any: [
          /^\s*PRINTFORMW 「哈啊～哈啊～…好久不见了呢%SAVESTR:ASSI%、因为现在正在和肉棒亲做快乐的事情所以聊天什么的一会再…啊、魔王大人…诶、今天的对手是%SAVESTR:ASSI%的说？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '456',
        any: [/^\s*PRINTFORMW 『正是、魔王大人命令僕今天来当你的对手』\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '457',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、你也被魔王大人的下仆侵犯的乱七八糟的画面让我光想想就硬了呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '458',
        any: [
          /^\s*PRINTFORMW 随着她的话语、%SAVESTR:TARGET%的扶她肉棒猛地勃起，打在了可爱的肚脐上发出“啪”地一声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '459',
        any: [
          /^\s*PRINTFORMW 『呼呣、虽然之前听说过了，真的是全无节操的阴茎呢』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '460',
        any: [
          /^\s*PRINTFORMW 「啊哈哈、人家已经得了肉棒中毒症啦、做好觉悟吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '461',
        any: [/^\s*CFLAG:203 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '463-464',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样的地下城正应该是你擅长发挥的场地呢%SAVESTR:ASSI%、连你都成了魔王的下仆吗………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '464',
        any: [
          /^\s*PRINTFORMW 「这样的地下城正应该是你擅长发挥的场地呢%SAVESTR:ASSI%、连你都成了魔王的下仆吗………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '465',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面对着过去的同伴，脸上露出了少许悲伤的神色。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '466',
        any: [
          /^\s*PRINTFORMW 「嘛、也好呢、能侵犯你说不定也是很有趣的事情、嗯嗯，马上来试试吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '467',
        any: [
          /^\s*PRINTFORMW 说着%SAVESTR:TARGET%完全勃起的扶她阴茎便露了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '468',
        any: [
          /^\s*PRINTFORMW 『噫！ 神、神马啊！？、那个两腿间的…肉棒是………』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '469',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%比起%SAVESTR:TARGET%坦率的原谅了自己被擒这件事，她股间勃起的扶她肉棒更让%SAVESTR:ASSI%感到惊讶………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '470',
        any: [/^\s*CFLAG:203 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '470-472',
        any: [/^\s*CFLAG:203 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '470-474',
        any: [
          /^\s*CFLAG:203 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;二回目以降\s*$\s*^\s*;爱＆淫乱取得時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '475',
        any: [
          /^\s*ELSEIF CFLAG:203 == 1 && FLAG:7 ==2 && TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '477',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '478',
        any: [
          /^\s*PRINTFORMW 「呐~、%SAVESTR:ASSI%、人家也对魔王大人的事情…喜欢的不得了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '479',
        any: [
          /^\s*PRINTFORMW 『哈啊、呀累呀累、僕的竞争对手又增加了嘛………』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '480',
        any: [
          /^\s*PRINTFORMW 对于%SAVESTR:TARGET%毫不掩饰的表白%SAVESTR:ASSI%不禁苦恼的搔着头发叹息到。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '481',
        any: [
          /^\s*PRINTFORMW 「因为魔王大人太有魅力了人家也没办法嘛、这一点你也明白的吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '482',
        any: [
          /^\s*PRINTFORMW 『就是说呢、被魔王大人宠爱的话就是僕也………等、让、让我都说了什么啊你！』下意识的点了点头，%SAVESTR:ASSI%连忙慌张地辩解起来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '483',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、真可爱呢，总而言之现在2个人一起让魔王大人愉悦起来吧？」%SAVESTR:TARGET%轻掩嘴唇，发出了%SAVESTR:TARGET%剧的笑声\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '484',
        any: [
          /^\s*PRINTFORMW 『这、这要等魔王大人命令才能决定。萨！魔王大人、您希望如何呢？』%SAVESTR:ASSI%努力板起通红的脸蛋，紧张的询问道\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '485',
        any: [/^\s*CFLAG:203 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '487',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '488',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊～…肉棒好舒服…好爽%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '489',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像是要把自己的扶她肉棒展示给%SAVESTR:ASSI%一样用力撸动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '490',
        any: [
          /^\s*PRINTFORMW 『呀累呀累、你真是完全顺从了自己的欲望呢、现在这个姿态真是应该让狂王看看啊』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '491',
        any: [
          /^\s*PRINTFORMW 「呼诶…让狂王看的play？啊啊这个也许不错呢！…魔王大人…请用水晶球帮人家摄影吧～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '492',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%亢奋的娇声呻吟着、更加激烈的玩弄着自己的扶她肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '493',
        any: [/^\s*PRINTFORMW 『唔…本来只打算开个玩笑的啊………』\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '494',
        any: [/^\s*CFLAG:203 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '494-496',
        any: [/^\s*CFLAG:203 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '495-498',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSEIF CFLAG:203 == 2 && FLAG:7 ==2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '498',
        any: [/^\s*ELSEIF CFLAG:203 == 2 && FLAG:7 ==2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '500',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '501',
        any: [
          /^\s*PRINTFORMW 「呐~、今天是2个人一起侍奉魔王大人吗？或者是…2人一起调教人家呢？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '502',
        any: [
          /^\s*PRINTFORMW 『这要魔王大人决定、虽然从僕的角度是更想要疼爱你呢』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '503',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%和%SAVESTR:ASSI%的爱而感到了喜悦、扶她肉棒坚硬的勃起着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '505',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '506',
        any: [
          /^\s*PRINTFORMW 「因为被你看到就硬成这个样子了呢%SAVESTR:ASSI%、要负起责任哟？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '507',
        any: [
          /^\s*PRINTFORMW 『这、这样发情反而怪僕咯？ 妳这家伙真是………』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '508',
        any: [
          /^\s*PRINTFORMW 望着%SAVESTR:TARGET%弯翘坚挺的阴茎，%SAVESTR:ASSI%不禁咽了下口水………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '508-510',
        any: [
          /^\s*PRINTFORMW 望着%SAVESTR:TARGET%弯翘坚挺的阴茎，%SAVESTR:ASSI%不禁咽了下口水………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '508-512',
        any: [
          /^\s*PRINTFORMW 望着%SAVESTR:TARGET%弯翘坚挺的阴茎，%SAVESTR:ASSI%不禁咽了下口水………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '512-513',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊、你好想听到你发出的甜美声音啊。呐~、快点来调教人家嘛♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '513',
        any: [
          /^\s*PRINTFORMW 「啊啊、你好想听到你发出的甜美声音啊。呐~、快点来调教人家嘛♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '514',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%躺在床上慢慢的分开了双腿、对%SAVESTR:ASSI%发出了诱惑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '515',
        any: [/^\s*PRINTFORMW 『赞同、僕正想这么做！』\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '515-517',
        any: [
          /^\s*PRINTFORMW 『赞同、僕正想这么做！』\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '517-518',
        any: [/^\s*ENDIF\s*$\s*^\s*;助手黑方片 NO:ASSI == 22\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '519',
        any: [/^\s*ELSEIF NO:ASSI == 22\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '520',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '522',
        any: [/^\s*IF CFLAG:204 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '524',
        any: [/^\s*IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '525',
        any: [
          /^\s*PRINTFORMW 「包括人家在内各种各样的勇者魔王大人入手了很多倒是听说过、没想到连你这样的也会在魔王大人身下婉转承欢呐………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '526',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些无可奈何的叹了口气。%SAVESTR:ASSI%连一句反驳的话也说不出来，因为羞耻而满脸通红。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '527',
        any: [
          /^\s*PRINTFORMW 『我、不行吗！？ 你不也是被魔王大人宠爱着嘛！』沉默了一会，%SAVESTR:ASSI%自暴自弃的喊道\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '528',
        any: [
          /^\s*PRINTFORMW 「唔呼呼，和你一样，人家也是喜欢着魔王大人呢。所以我们2个人一起侍奉魔王大人吧…做好多好~多让人舒服的事情哟～%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%露出了捉狭的笑容，漂亮的瞳孔也染上了情欲的颜色\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '529',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%被同伴前突然转换的态度和所未见的魅惑姿态惊呆了、不过她很快理解了%SAVESTR:TARGET%与她的目的是一致的，那就是为%SAVESTR:PLAYER%献上自己的一切。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '530',
        any: [
          /^\s*PRINTFORMW 『唔、和你一起稍微有些不痛快呢、真是没办法，只限为了魔王大人的时候哦』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '531',
        any: [/^\s*CFLAG:204 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '533',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && CFLAG:201 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '534',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:ASSI%进入房间的时候、%SAVESTR:TARGET%正在地板上不知羞耻的抬着腰，壮烈的射精中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '535',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…听说\\@TIME == 0 \? 今日 # 今夜\\@有特别的来宾要来，人家一直很期待的说…没想到是你来了呢%SAVESTR:ASSI%」%SAVESTR:TARGET%激烈的喘息着，过度的高潮让她全身都染上了煽情的粉红色，只有股间坚挺的肉棒背叛了无力的主人，狰狞的跳动着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '536',
        any: [
          /^\s*PRINTFORMW 『魔王大人说”\\@TIME == 0 \? 今日 # 今夜\\@的节目很值得期待”原来是这个意思吗…咕噜（咽口水）』%SAVESTR:ASSI%被原同伴催眠魔法般的淫媚姿态迷住了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '537',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、被你这么盯着看的话人家的肉棒都硬得发痛了呢…啊啊…来吧%SAVESTR:ASSI%、你也看得亢奋了吧%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%眯起眼睛，水汪汪的双瞳里满是化不开的情欲\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '538',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%痴痴的盯着%SAVESTR:TARGET%淫荡身体，一步步的走了过去、这两个人一会儿会做出什么样有趣的事情的%SAVESTR:PLAYER%想着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '539',
        any: [/^\s*CFLAG:204 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '541-542',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啦、你被男人宠爱的时候是这样的表情啊、第一次看到呢。还是说因为对方是魔王大人所以才露出了这么下流的表情吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '542',
        any: [
          /^\s*PRINTFORMW 「啊啦、你被男人宠爱的时候是这样的表情啊、第一次看到呢。还是说因为对方是魔王大人所以才露出了这么下流的表情吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '543',
        any: [
          /^\s*PRINTFORMW 『突、突然说什么啊、你、自己的立场到底明不明白啊？』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '544',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%因为同伴毫无顾忌的发言而晕红双颊。实际上%SAVESTR:PLAYER%最近因为%SAVESTR:ASSI%有些打不起精神的样子在烦恼吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '545',
        any: [
          /^\s*PRINTFORMW 「哇啊、脸整个红通通的超可爱呢…连人家都“扑通扑通”的乱跳了呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '546',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的股间、猛地弹出来的扶她肉棒也一抖一抖地，仿佛附和着主人的话………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '547',
        any: [/^\s*CFLAG:204 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '547-549',
        any: [/^\s*CFLAG:204 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '547-551',
        any: [
          /^\s*CFLAG:204 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;二回目以降\s*$\s*^\s*;爱＆淫乱取得時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '552',
        any: [
          /^\s*ELSEIF CFLAG:204 == 1 && FLAG:7 ==2 && TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '554',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '555',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、%SAVESTR:ASSI%、人家也成为了魔王大人的私有物了呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '556',
        any: [
          /^\s*PRINTFORMW 『魔王大人还真是很看重感情呢、像你这样野狗一般到处喷精的淫乱扶她也不舍得丢掉啊』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '557',
        any: [
          /^\s*PRINTFORMW 熊熊燃烧的妒火让%SAVESTR:ASSI%吐出了刻薄的讽刺。但是%SAVESTR:TARGET%仿佛什么也没听到一样，轻笑着点了点头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '558',
        any: [
          /^\s*PRINTFORMW 「嗯，这正是魔王大人胸怀宽广之处哟、唔呼呼、魔王大人一直这么厉害呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '559',
        any: [
          /^\s*PRINTFORMW 『哼、好吧、\\@TIME == 0 \? 今日 # 今夜\\@就按魔王大人吩咐的，好好疼·爱你吧！%SAVESTR:TARGET%…！』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '560',
        any: [/^\s*CFLAG:204 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '562',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '563',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:ASSI%走入房间时、%SAVESTR:TARGET%正在地板上不知羞耻的抬着腰，壮烈的射精自慰中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '564',
        any: [
          /^\s*PRINTFORMW 「哈啊～哈啊～%UNICODE\(0x2661\) \*1% 啊啊～…够了，请不要来打扰人家和肉棒亲做舒服的事情！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '565',
        any: [
          /^\s*PRINTFORMW 『真是敢说啊%SAVESTR:TARGET%、难得我和魔王大人想着要来疼爱你一番呢………』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '566',
        any: [
          /^\s*PRINTFORMW 听到了这句话，%SAVESTR:TARGET%手的动作不由得停了下来、吃惊的向这边转过了头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '567',
        any: [
          /^\s*PRINTFORMW 「这种事情早点告诉人家嘛。啊啊~魔王大人%UNICODE\(0x2661\) \*1%\.\.快来，人家已经准备好了%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%向着%SAVESTR:PLAYER%分开了自己似的一塌糊涂的蜜穴，扭动的腰肢让她的肉棒摇来摇去，好像乞食的小狗\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '568',
        any: [
          /^\s*PRINTFORMW 『哈啊\.\.看了这个就彻底明白了。真的完全变成淫乱母狗了啊、你………』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '569',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%愕然了片刻，深深地叹了口气………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '570',
        any: [/^\s*CFLAG:204 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '570-572',
        any: [/^\s*CFLAG:204 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '571-574',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSEIF CFLAG:204 == 2 && FLAG:7 ==2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '574',
        any: [/^\s*ELSEIF CFLAG:204 == 2 && FLAG:7 ==2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '576',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '577',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、咱们2人一起来侍奉魔王大人吧？你也喜欢魔王大人的吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '578',
        any: [
          /^\s*PRINTFORMW 『嗯嗯、最喜欢了、我现在觉得侍奉魔王大人就是我的使命呢%UNICODE\(0x2661\) \*1%』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '579',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%红着脸互相点了点头、牵着手一起对%SAVESTR:PLAYER%展开了旖旎的侍奉………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '581',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '582',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:ASSI%、看到了你的样子人家的肉棒就变成这个样子了呢%UNICODE\(0x2661\) \*1% 请负起责任哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '583',
        any: [
          /^\s*PRINTFORMW 『不、不行、在魔王大人面前做那种事情的话、做不到的…啊啊啊…』仿佛想起了什么不好的回忆，脸涨得通红的%SAVESTR:ASSI%摇着头\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '584',
        any: [
          /^\s*PRINTFORMW 「不·行·哟%UNICODE\(0x2661\) \*1% 魔王大人也想看到的吧，这孩子的‘那种’表情  唔呼呼♪」%SAVESTR:TARGET%翘到肚脐的扶她肉棒一抖一抖的，闪着淫靡的液光向%SAVESTR:ASSI%逼近………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '584-586',
        any: [
          /^\s*PRINTFORMW 「不·行·哟%UNICODE\(0x2661\) \*1% 魔王大人也想看到的吧，这孩子的‘那种’表情  唔呼呼♪」%SAVESTR:TARGET%翘到肚脐的扶她肉棒一抖一抖的，闪着淫靡的液光向%SAVESTR:ASSI%逼近………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '584-588',
        any: [
          /^\s*PRINTFORMW 「不·行·哟%UNICODE\(0x2661\) \*1% 魔王大人也想看到的吧，这孩子的‘那种’表情  唔呼呼♪」%SAVESTR:TARGET%翘到肚脐的扶她肉棒一抖一抖的，闪着淫靡的液光向%SAVESTR:ASSI%逼近………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '588-589',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呐~、魔王大人，今天在用力点处罚人家也没关系哟…唔呼呼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '589',
        any: [
          /^\s*PRINTFORMW 「呐~、魔王大人，今天在用力点处罚人家也没关系哟…唔呼呼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '590',
        any: [
          /^\s*PRINTFORMW 『真是嚣张的态度啊%SAVESTR:TARGET%、不过，你看到这孩子还想这么说吗？』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '591',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看到了%SAVESTR:ASSI%，那种游刃有余的态度完全消失了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '591-593',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看到了%SAVESTR:ASSI%，那种游刃有余的态度完全消失了………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '593-594',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '595-596',
        any: [/^\s*ELSE\s*$\s*^\s*CALL K10_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '596',
        any: [/^\s*CALL K10_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '596-598',
        any: [/^\s*CALL K10_KOJO2\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '603-815',
        any: [
          /^\s*@K10_KOJO2\s*$\s*^\s*;崩坏\s*$\s*^\s*IF TALENT:TARGET:9 == 1 && FLAG:7 == 2\s*$\s*^\s*DRAWLINE\s*$\s*^\s*PRINTFORMW 「啊……啊啊…啊………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%没有什么令人值得期待的反应………\s*$\s*^\s*RETURN 1\s*$\s*^\s*;反抗刻印Lv3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '605',
        any: [/^\s*IF TALENT:TARGET:9 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '606',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '607',
        any: [/^\s*PRINTFORMW 「啊……啊啊…啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '608',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%没有什么令人值得期待的反应………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '608-610',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%没有什么令人值得期待的反应………\s*$\s*^\s*RETURN 1\s*$\s*^\s*;反抗刻印Lv3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '619',
        any: [/^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '620',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '621',
        any: [/^\s*PRINTFORMW 「稍、稍微温柔点哦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '622',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%这么说着，害羞的把头埋了下去………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '622-624',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%这么说着，害羞的把头埋了下去………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '626',
        any: [/^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '627',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '628',
        any: [/^\s*PRINTFORMW 「来吧、快点开始嘛♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '629',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的股间盛大的勃起着………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '629-631',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的股间盛大的勃起着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '633',
        any: [/^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '634',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '635',
        any: [
          /^\s*PRINTFORMW 「还愣在那里做什么、你不是来欺负人家的嘛？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '636',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%摆动着腰肢，发出了无声的邀请、%SAVESTR:PLAYER%双手环住她柔软的腰腹，一点点向着敏感的地方摸了下去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '637',
        any: [
          /^\s*PRINTFORMW 在那里的某物已经因为接下来要开始的调教变得又热又硬了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '637-639',
        any: [
          /^\s*PRINTFORMW 在那里的某物已经因为接下来要开始的调教变得又热又硬了………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '641',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '642',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '644',
        any: [/^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '645',
        any: [
          /^\s*PRINTFORMW 「诶 那个…抱歉哦、是来找我做令人舒服的事情吗？」打开门%SAVESTR:TARGET%一副半梦半醒的样子，头发也乱糟糟的翘起了一堆呆毛\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '646',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%揉着眼角\\@\(CFLAG:42 == 83\) \? 扶了扶眼镜 # 向这边转了过来\\@。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '647',
        any: [
          /^\s*PRINTFORMW 「也、也不是说被你抱会讨厌什么的啦、那个、你看我的肉棒已经变成这样子咯！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '648',
        any: [
          /^\s*PRINTFORMW 正如她所说的、%SAVESTR:TARGET%的扶他阴茎已经硬的不能再硬了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '649',
        any: [
          /^\s*PRINTFORMW 「呐~拜托啦…再等一会再回来把我弄得乱七八糟吧…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '650-651',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唔呼呼、来做好~多令人舒服的事情吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '651',
        any: [/^\s*PRINTFORMW 「唔呼呼、来做好~多令人舒服的事情吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '652',
        any: [
          /^\s*PRINTFORMW 「在等你的时间我可是靠着自慰才忍耐过来的呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '653',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像已经忍耐不住了的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '653-655',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像已经忍耐不住了的样子………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '653-657',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像已经忍耐不住了的样子………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '658',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '659',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '662',
        any: [/^\s*IF FLAG:37 != 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '664',
        any: [/^\s*IF \(CFLAG:40 & 28\) && CFLAG:41 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '668',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 101\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '672',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 209\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '673',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的女仆服裙子非常的短、稍微迈开步子就可以看到裙内风光的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '674',
        any: [
          /^\s*PRINTFORMW 修长的双腿被雪白的过膝袜紧紧包裹着，袜口在大腿中段勒出一道性感的凹痕。四条黑色紧身吊带夹住了袜缘，向上没入了短裙的阴影中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '675',
        any: [
          /^\s*PRINTFORMW 「主人大人的品味真不错呢、这么短的裙子，人家的肉棒只要一勃起就会跑出来呢…看♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '676',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%慢慢向上提起裙角，把勃起到根本无法隐藏的扶她肉棒露了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '677',
        any: [
          /^\s*PRINTFORMW 「看到了主人大人就勃起成这个样子、这么变态的女仆%SAVESTR:TARGET%请给与惩罚吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '677-679',
        any: [
          /^\s*PRINTFORMW 「看到了主人大人就勃起成这个样子、这么变态的女仆%SAVESTR:TARGET%请给与惩罚吧%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*RETURN 1\s*$\s*^\s*;妓女のドレス\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '680',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 203\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '681',
        any: [
          /^\s*PRINTFORMW 「这种流莺一样的衣服、人家的cosplay还真是没品位呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '682',
        any: [
          /^\s*PRINTFORMW 随着一阵轻笑声%SAVESTR:TARGET%穿着妓女式的纱衣走了进来，顽皮的摆了几个性感的姿势。%SAVESTR:PLAYER%看得津津有味。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '683',
        any: [
          /^\s*PRINTFORMW 然而与一般妓女不同的是，在半透明的薄纱里面%SAVESTR:TARGET%坚挺的扶她肉棒耀武扬威地展示着自己的存在感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '684',
        any: [
          /^\s*PRINTFORMW 「啊a…这种夜战用的衣服真不错呢…快点来侵犯人家吧%UNICODE\(0x2661\) \*1%？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '685',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%笑着倒在了床上，慢慢分开双腿发出了无声的邀请，被弄皱了的纱裙上，那凸起的尖端一块明显的湿渍正在变得越来越大………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '685-687',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%笑着倒在了床上，慢慢分开双腿发出了无声的邀请，被弄皱了的纱裙上，那凸起的尖端一块明显的湿渍正在变得越来越大………\s*$\s*^\s*RETURN 1\s*$\s*^\s*;バニースーツ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '688',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 254\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '689',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%穿着贴身白色兔女郎服慢慢走了进来、她眯着眼睛轻轻抚摸着网袜的网眼，似乎在品味它的手感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '690',
        any: [
          /^\s*PRINTFORMW 「啊嗯~…第一次穿这种紧紧贴着身体的衣服，人家的肉棒很辛苦呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '691',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒形状清晰的凸了出来，随着%SAVESTR:TARGET%的脚步微微的颤抖着，让她脸上浮现出苦闷又淫靡的笑容。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '692',
        any: [
          /^\s*PRINTFORMW 「呐~、快点把这个拉链拉开嘛、人家真的很难受呢、呐~、求求你了嘛♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '693',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇嗔的抱着你的手臂，用被束缚到极限的肉棒轻轻地磨蹭着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '693-695',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇嗔的抱着你的手臂，用被束缚到极限的肉棒轻轻地磨蹭着………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '693-697',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇嗔的抱着你的手臂，用被束缚到极限的肉棒轻轻地磨蹭着………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;魔族\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '693-699',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇嗔的抱着你的手臂，用被束缚到极限的肉棒轻轻地磨蹭着………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;魔族\s*$\s*^\s*IF TALENT:TARGET:314 == 9\s*$\s*^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '698',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '699',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '700',
        any: [
          /^\s*PRINTFORMW 「呜啊…啊嗯%UNICODE\(0x2661\) \*1% 啊%UNICODE\(0x2661\) \*1% 」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '701',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%玩弄着自己的肉棒、溢出来的前走液被她当做润滑液一遍又一遍的涂抹着，发出淫靡的水光。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '702',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…从、从刚才开始忍着不高潮已经十几次了%UNICODE\(0x2661\) \*1% 快点、快点来让我去吧………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '703',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双腿大张的浪叫着、翅膀也好像很舒服似的绷得笔直………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '704',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '705',
        any: [
          /^\s*PRINTFORMW 「快点让人家舒服起来吧…不然的话，可要反过来侵犯你了哟…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '706',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%伸出紫色的舌尖舔着丰润的嘴唇，发出吃吃的笑声。不知道这家伙是开玩笑还是认真的啊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '707',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、人家觉得，大概这次要去个十几次才能冷静下来唷………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '707-709',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、人家觉得，大概这次要去个十几次才能冷静下来唷………%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呐~…来玩弄人家吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '709',
        any: [/^\s*PRINTFORMW 「呐~…来玩弄人家吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '710',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒完全的勃起了，啪嗒啪嗒地仿佛在和自己的肚脐轻吻着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '711',
        any: [
          /^\s*PRINTFORMW 「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '711-713',
        any: [
          /^\s*PRINTFORMW 「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '712-717',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:3 == 0\s*$\s*^\s*PRINTFORMW 「呜啊…啊嗯%UNICODE\(0x2661\) \*1% 啊%UNICODE\(0x2661\) \*1%  」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '716',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '717',
        any: [
          /^\s*PRINTFORMW 「呜啊…啊嗯%UNICODE\(0x2661\) \*1% 啊%UNICODE\(0x2661\) \*1%  」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '718',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%玩弄着自己的肉棒、溢出来的前走液被她当做润滑液一遍又一遍的涂抹着，发出淫靡的水光。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '719',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…从、从刚才开始忍着不高潮已经十几次了%UNICODE\(0x2661\) \*1% 快点、快点来让我去吧………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '720',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '721',
        any: [
          /^\s*PRINTFORMW 「快点让人家舒服起来吧…不然的话，可要反过来侵犯你了哟…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '722',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%伸出舌尖舔着丰润的嘴唇，发出吃吃的笑声。不知道这家伙是开玩笑还是认真的啊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '723',
        any: [
          /^\s*PRINTFORMW 「「唔呼呼、人家觉得，大概这次要去个十几次才能冷静下来唷………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '723-725',
        any: [
          /^\s*PRINTFORMW 「「唔呼呼、人家觉得，大概这次要去个十几次才能冷静下来唷………%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呐~…来玩弄人家吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '725',
        any: [/^\s*PRINTFORMW 「呐~…来玩弄人家吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '726',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒完全的勃起了，啪嗒啪嗒地仿佛在和自己的肚脐轻吻着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '727',
        any: [
          /^\s*PRINTFORMW 「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '727-729',
        any: [
          /^\s*PRINTFORMW 「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '727-731',
        any: [
          /^\s*PRINTFORMW 「因为你的调教人家才变成这个样子的、所以要好好负起责任哟？」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '729-732',
        any: [/^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;爱慕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '733',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '734',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '737',
        any: [/^\s*IF FLAG:37 != 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '739',
        any: [/^\s*IF \(CFLAG:40 & 28\) && CFLAG:41 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '743',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 101\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '747',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 209\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '748',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的女仆服裙子非常的短、稍微迈开步子就可以看到裙内风光的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '749',
        any: [
          /^\s*PRINTFORMW 修长的双腿被雪白的过膝袜紧紧包裹着，袜口在大腿中段勒出一道性感的凹痕。四条黑色紧身吊带夹住了袜缘，向上没入了短裙的阴影中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '750',
        any: [
          /^\s*PRINTFORMW 「主人大人、这么短的裙子根本不是女仆的打扮吧…呀！不要掀起来啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '751',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%短短的裙摆下坚挺的扶她肉棒耀武扬威地展示着自己的存在感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '752',
        any: [
          /^\s*PRINTFORMW 「不、不是这样的、才没有因为穿女仆服亢奋起来了呢！…呜\.\.不要看啦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '752-754',
        any: [
          /^\s*PRINTFORMW 「不、不是这样的、才没有因为穿女仆服亢奋起来了呢！…呜\.\.不要看啦！」\s*$\s*^\s*RETURN 1\s*$\s*^\s*;妓女のドレス\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '755',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 203\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '756',
        any: [/^\s*PRINTFORMW 「久、久等了呢………♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '757',
        any: [
          /^\s*PRINTFORMW 随着略带紧张的语声%SAVESTR:TARGET%穿着妓女式的纱衣缩手缩脚的走了进来。%SAVESTR:PLAYER%看得津津有味。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '758',
        any: [
          /^\s*PRINTFORMW 「虽然是不知廉耻的打扮、你喜欢的话人家也没关系喔%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '759',
        any: [
          /^\s*PRINTFORMW 为了证明她的话一般、在半透明的薄纱里面%SAVESTR:TARGET%坚挺的扶她肉棒耀武扬威地展示着自己的存在感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '760',
        any: [
          /^\s*PRINTFORMW 「够、够了吧、继续这么看下去的话、人家的脑袋里都要变得奇怪了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '761',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的纱裙上，那凸起的尖端一块明显的湿渍正在变得越来越大，滴落的爱液将地板都弄脏了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '761-763',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的纱裙上，那凸起的尖端一块明显的湿渍正在变得越来越大，滴落的爱液将地板都弄脏了\s*$\s*^\s*RETURN 1\s*$\s*^\s*;バニースーツ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '764',
        any: [/^\s*ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 254\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '765',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%穿着贴身白色兔女郎服慢慢走了进来、她眯着眼睛轻轻抚摸着网袜的网眼，似乎在品味它的手感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '766',
        any: [
          /^\s*PRINTFORMW 「这件衣服多半是你的兴趣吧、啊嗯、果、果然会变成这样」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '767',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒形状清晰的凸了出来，随着%SAVESTR:TARGET%的脚步微微的颤抖着，让她脸上浮现出无奈又有些快意的笑容。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '768',
        any: [
          /^\s*PRINTFORMW 「不、不要太过盯着看啊、就算和你做了那么多次，人家被这么看着的话还是会感到害羞的…啊嗯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '769',
        any: [
          /^\s*PRINTFORMW 你把%SAVESTR:TARGET%搂了过来，隔着皮制的衣料揉弄起了她敏感的龟头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '769-771',
        any: [
          /^\s*PRINTFORMW 你把%SAVESTR:TARGET%搂了过来，隔着皮制的衣料揉弄起了她敏感的龟头………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '769-773',
        any: [
          /^\s*PRINTFORMW 你把%SAVESTR:TARGET%搂了过来，隔着皮制的衣料揉弄起了她敏感的龟头………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;魔族\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '769-775',
        any: [
          /^\s*PRINTFORMW 你把%SAVESTR:TARGET%搂了过来，隔着皮制的衣料揉弄起了她敏感的龟头………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;魔族\s*$\s*^\s*IF TALENT:TARGET:314 == 9\s*$\s*^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '774',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '775',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '776',
        any: [/^\s*PRINTFORMW 「呐？ 今天也要做的吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '777',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着令人心动的笑容，微微偏过头期待的问道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '778',
        any: [/^\s*PRINTFORMW 尾巴在空中比划出“爱心”的形状。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '779',
        any: [
          /^\s*PRINTFORMW 「嗯、比起1个人，2个人一起做的话更舒服呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '780',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '781',
        any: [/^\s*PRINTFORMW 「向你告白的事情我从来都没有后悔过」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '782',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%微笑着挽起了你的手臂、尾巴也跟着缠了上来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '782-786',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%微笑着挽起了你的手臂、尾巴也跟着缠了上来。\s*$\s*^\s*PRINTFORMW 「想要更多的被你溺爱呢…一起来做些甜蜜的事情吧…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%看到你来了，很高兴的笑着说道。\s*$\s*^\s*PRINTFORMW 「今天也来和我做H的事情了呢。可以哟、我很乐意♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '783',
        any: [
          /^\s*PRINTFORMW 「想要更多的被你溺爱呢…一起来做些甜蜜的事情吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '785',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看到你来了，很高兴的笑着说道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '786',
        any: [
          /^\s*PRINTFORMW 「今天也来和我做H的事情了呢。可以哟、我很乐意♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '787',
        any: [/^\s*PRINTFORMW 「唔呼呼…喜欢你哦、不、我爱你」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '788',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:PLAYER%耳边轻声说完后%SAVESTR:TARGET%很害羞的玩弄起了尾巴………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '788-790',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:PLAYER%耳边轻声说完后%SAVESTR:TARGET%很害羞的玩弄起了尾巴………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '789-794',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\s*^\s*IF RAND:3 == 0\s*$\s*^\s*PRINTFORMW 「呐？ 今天也要做的吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '793',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '794',
        any: [/^\s*PRINTFORMW 「呐？ 今天也要做的吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '795',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着令人心动的笑容，微微偏过头期待的问道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '796',
        any: [
          /^\s*PRINTFORMW 「嗯、比起1个人，2个人一起做的话更舒服呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '797',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '798',
        any: [/^\s*PRINTFORMW 「向你告白的事情我从来都没有后悔过」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '799',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%微笑着挽起了你的手臂。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '799-803',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%微笑着挽起了你的手臂。\s*$\s*^\s*PRINTFORMW 「想要更多的被你溺爱呢…一起来做些甜蜜的事情吧…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%看到你来了，很高兴的笑着说道。\s*$\s*^\s*PRINTFORMW 「今天也来和我做H的事情了呢。可以哟、我很乐意♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '800',
        any: [
          /^\s*PRINTFORMW 「想要更多的被你溺爱呢…一起来做些甜蜜的事情吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '802',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看到你来了，很高兴的笑着说道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '803',
        any: [
          /^\s*PRINTFORMW 「今天也来和我做H的事情了呢。可以哟、我很乐意♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '804',
        any: [/^\s*PRINTFORMW 「唔呼呼…喜欢你哦、不、我爱你」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '805',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:PLAYER%耳边轻声说完后%SAVESTR:TARGET%很害羞的玩弄起了头发………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '805-807',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:PLAYER%耳边轻声说完后%SAVESTR:TARGET%很害羞的玩弄起了头发………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '806-809',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '807-809',
        any: [/^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '807-811',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '808-813',
        any: [
          /^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;EVENTEND関係（X1をキャラ番号に置換） CFLAG 211～220を使用\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '816-820',
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:170 != 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '816-899',
        any: [
          /^\s*@EVENTEND\s*$\s*^\s*SIF FLAG:7 <= 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*SIF TALENT:170 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;キャラ死亡時は口上をスキップ\s*$\s*^\s*SIF BASE:0 <= 0\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '819-822',
        any: [
          /^\s*SIF TALENT:170 != 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;キャラ死亡時は口上をスキップ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '823-825',
        any: [/^\s*SIF BASE:0 <= 0\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '830',
        any: [/^\s*IF TALENT:TARGET:9 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '831',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '832',
        any: [/^\s*PRINTFORMW 「啊啊…啊…呜………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '833',
        any: [/^\s*PRINTFORMW 她的眼眸中已经看不到智慧的火光了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '834-835',
        any: [/^\s*RETURN 1\s*$\s*^\s*;反抗刻印Lv3\+爱无\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '843',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:76 == 0 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '844',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '845',
        any: [/^\s*PRINTFORMW 「哈啊…真是痛快呢～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '846',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把凉水壶里面的水一口气喝掉了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '846-848',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把凉水壶里面的水一口气喝掉了………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '850',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:76 == 0 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '851',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '852',
        any: [/^\s*PRINTFORMW 「唔呼呼、撸管小菜又增加了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '853',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%令人不快的低声笑着………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '853-855',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%令人不快的低声笑着………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '857',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:76 == 0 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '858',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '860',
        any: [/^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '861',
        any: [/^\s*PRINTFORMW 「啊啊、还没满足呢…不够啊…我想…更多的…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '862',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%望着天花板喃喃自语着什么………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '863-864',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呐啊…下一次什么时候再来做？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '864',
        any: [/^\s*PRINTFORMW 「呐啊…下一次什么时候再来做？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '865',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些不舍得拉着你的衣袖问道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '865-867',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些不舍得拉着你的衣袖问道………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '866-869',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 1\s*$\s*^\s*;淫乱\(体力500以上\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '870',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '871',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '872',
        any: [
          /^\s*PRINTFORMW 「啊啊~人家的肉棒在‘还不够~还不够’地哭喊呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '873',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一脸欲求不满的玩弄着自己的性器………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '874-875',
        any: [/^\s*RETURN 1\s*$\s*^\s*;淫乱\(体力500未満\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '876',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '877',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '878',
        any: [/^\s*PRINTFORMW 「呼…満足満足………%UNICODE\(0x2661\) \*1%」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '879',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%软下来的肉棒有些萎靡的半挺着、一股股的残精从马眼里吐出来，在杆身上画出淫靡的白痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '879-881',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%软下来的肉棒有些萎靡的半挺着、一股股的残精从马眼里吐出来，在杆身上画出淫靡的白痕………\s*$\s*^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '883',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '884',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '885',
        any: [/^\s*PRINTFORMW 「呼呼…人家说了还想要更多嘛………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '886',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒还很精神的样子………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '887-888',
        any: [/^\s*RETURN 1\s*$\s*^\s*;爱慕\(体力500未満\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '889',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '890',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '891',
        any: [
          /^\s*PRINTFORMW 「啊啊…每天都这样子的话…我究竟会变成什么样子呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '892',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一脸满足的吐出温热的气息………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '892-894',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一脸满足的吐出温热的气息………\s*$\s*^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '893-896',
        any: [
          /^\s*RETURN 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*;--------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '894-897',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*;--------------------------------------------------\s*$\s*^\s*;@KOJO_MESSAGE_COM関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '900-4849',
        any: [
          /^\s*@KOJO_MESSAGE_COM_10\s*$\s*^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\s*^\s*SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '901-924',
        any: [
          /^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\s*^\s*SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$\s*^\s*SIF TFLAG:899\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '902-905',
        any: [
          /^\s*SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '905-907',
        any: [
          /^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '909-910',
        any: [/^\s*RETURN 0\s*$\s*^\s*;兽奸PLAY中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '911',
        any: [/^\s*IF TEQUIP:89\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '912',
        any: [/^\s*CALL DOG_KOJO_10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '912-914',
        any: [/^\s*CALL DOG_KOJO_10\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '914-915',
        any: [/^\s*ENDIF\s*$\s*^\s*;死斗场中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '916',
        any: [/^\s*IF TEQUIP:55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '917',
        any: [/^\s*CALL COLOSSEUM_KOJO_10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '917-919',
        any: [
          /^\s*CALL COLOSSEUM_KOJO_10\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '919-920',
        any: [/^\s*ENDIF\s*$\s*^\s*;崩坏した場合は口上をスキップする\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '921-923',
        any: [
          /^\s*SIF TALENT:TARGET:9 == 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;触手調教中は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '924-927',
        any: [
          /^\s*SIF TEQUIP:90\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '933',
        any: [/^\s*IF SELECTCOM == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '935',
        any: [/^\s*IF CFLAG:301 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '937',
        any: [/^\s*IF MARK:2 >= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '938',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '940-941',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呀嗯~…好痒啦…啊哈哈～…那、那里不行~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '941',
        any: [/^\s*PRINTFORMW 「呀嗯~…好痒啦…啊哈哈～…那、那里不行~」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '941-943',
        any: [
          /^\s*PRINTFORMW 「呀嗯~…好痒啦…啊哈哈～…那、那里不行~」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '942-947',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '943',
        any: [/^\s*CFLAG:301 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '945-948',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '948',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '949',
        any: [
          /^\s*PRINTFORMW 「啊～…啊～…嗯呀啊～%UNICODE\(0x2661\) \*1% 再用力一点…啊～…哈嗯～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '950',
        any: [
          /^\s*PRINTFORMW 「嗯啊～…就是～…用力欺负那里…噫～…啊哈%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '951',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%充血的肉棒前端，前走液像失禁一般流了出来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '952',
        any: [/^\s*CFLAG:301 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '954',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '955',
        any: [
          /^\s*PRINTFORMW 「哈啊…呜～…被、被喜欢的人摸着\.\.哈呜  比自己弄更舒服呢…啊嗯%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '956',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%充血的肉棒前端，前走液像失禁一般流了出来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '957',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…嗯～…坏心眼…为、为什么不欺负那里…人家敏感的小鸡鸡也想要嘛… 啊～…啊呜～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '958',
        any: [/^\s*CFLAG:301 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '960',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '961',
        any: [
          /^\s*PRINTFORMW 「请尽情的…啊嗯…就…呀、就是这样…啊啊～…哈…啊呀♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '962',
        any: [/^\s*PRINTFORMW 「这里也、也要摸摸…啊～…嗯～…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '963',
        any: [
          /^\s*PRINTFORMW 只是爱抚了一下身体，%SAVESTR:TARGET%就好像要展示自己已经充血到不行的阴茎一样的打开了大腿………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '964',
        any: [/^\s*CFLAG:301 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '966',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '967',
        any: [
          /^\s*PRINTFORMW 「啊%UNICODE\(0x2661\) \*1%…啊嗯～…再多摸摸也可以哦…嗯～…嗯呼呼…♪」%SAVESTR:TARGET%被抚摸着发出了轻佻的笑声\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '968',
        any: [/^\s*PRINTFORMW 「嗯～…嗯～…真好呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '969',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像渴望被爱抚的小猫一样随着%SAVESTR:PLAYER%的动作舒展着身体,诱导着%SAVESTR:PLAYER%……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '970',
        any: [/^\s*CFLAG:301 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '972',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '973',
        any: [
          /^\s*PRINTFORMW 「嗯～…呀哈~%UNICODE\(0x2661\) \*1%…再…多欺负一下这里也可以哟…？」%SAVESTR:TARGET%挺起胸，将坚硬的乳头凑了过来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '974',
        any: [/^\s*PRINTFORMW 「啊～…嗯～…再用力、一点………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '974-978',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…再用力、一点………」\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '974-980',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…再用力、一点………」\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '975',
        any: [/^\s*CFLAG:301 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '975-982',
        any: [
          /^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;舔阴 CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '977-982',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;舔阴 CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '984',
        any: [/^\s*IF SELECTCOM == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '986',
        any: [/^\s*IF CFLAG:302 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '988',
        any: [/^\s*IF TALENT:TARGET:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '989',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊啊～…哈、哈呜呜～！…好厉害…被别人的舔着、呜、竟然是这么舒服的事情………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '990',
        any: [
          /^\s*PRINTFORMW 「啊啊～…说、呀嗯、说起来…唔呼呼、这里的处女膜还好好留着呢…‘最后会给谁呢’一直这么想着哟？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '991',
        any: [/^\s*PRINTFORMW 「就·是·说…给你好不好呢？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '993-994',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～…啊啊～…哈、哈呜呜～！…好厉害…被别人的舔着、呜、竟然是这么舒服的事情………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '994',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊啊～…哈、哈呜呜～！…好厉害…被别人的舔着、呜、竟然是这么舒服的事情………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '995',
        any: [
          /^\s*PRINTFORMW 「唔呼呼…就这样…把肉、肉棒也吸…啊～…人、人家错了 噫！不要那么用力～♪」龟头被轻轻咬住的%SAVESTR:TARGET%露出了快哭出来的表情\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '995-997',
        any: [
          /^\s*PRINTFORMW 「唔呼呼…就这样…把肉、肉棒也吸…啊～…人、人家错了 噫！不要那么用力～♪」龟头被轻轻咬住的%SAVESTR:TARGET%露出了快哭出来的表情\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '996-1001',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '997',
        any: [/^\s*CFLAG:302 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '999-1002',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1002',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1003',
        any: [
          /^\s*PRINTFORMW 「咕哦～…啊哈哈～…啊啊啊～…%UNICODE\(0x2661\) \*1% 在吸着…哦哦哦人家肉穴在被吸着…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1004',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%痉挛着抬起了腰，将蜜穴向着%SAVESTR:PLAYER%脸上压去。亢奋到极点的弯翘肉棒也在%SAVESTR:PLAYER%的脸颊上蹭来蹭去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1005',
        any: [
          /^\s*PRINTFORMW 「不要再欺负人家了～…为什么、呜呜、为什么只有肉穴，也疼爱下肉棒啦～…啊啊～%UNICODE\(0x2661\) \*1%」%SAVESTR:PLAYER%用舌头更加激烈的攻击着湿润的腔穴\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1006',
        any: [/^\s*CFLAG:302 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1008',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1009',
        any: [
          /^\s*PRINTFORMW 「啊～…啊嗯～…啊…哈啊～%UNICODE\(0x2661\) \*1% 呐…啊、啊嗯～…就这么出来也不错…嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1010',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的秘裂被舔着，从喉咙里漏出了可爱的喘息声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1011',
        any: [
          /^\s*PRINTFORMW 「人、人家的那里…也…也请疼爱一下…啊、啊a～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1012',
        any: [/^\s*CFLAG:302 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1014',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1015',
        any: [
          /^\s*PRINTFORMW 「啊、呜、唔嗯…腿、再打开一点比较好吗…啊哈～…稍、稍微吸一下的话 嗯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1016',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把两腿大开的%SAVESTR:TARGET%蜜穴和肉棒仔细的舔舐着，发出淫靡的啾啾声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1017',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～！ 好…好爽～…呀哈、啊～…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1018',
        any: [/^\s*CFLAG:302 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1020',
        any: [/^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1021',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…再来…更多的舔人家…嗯～…哈啊…啊…啊呜～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1022',
        any: [
          /^\s*PRINTFORMW 「哈～哈～…再这样舔着肉棒的话，人家会变得奇怪的♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1023',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%充血的肉棒前端，前走液像失禁一般流了出来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1023-1027',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%充血的肉棒前端，前走液像失禁一般流了出来………\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1023-1029',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%充血的肉棒前端，前走液像失禁一般流了出来………\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1024',
        any: [/^\s*CFLAG:302 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1024-1031',
        any: [
          /^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル爱撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1026-1031',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;アナル爱撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1033',
        any: [/^\s*IF SELECTCOM == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1035',
        any: [/^\s*IF CFLAG:303 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1036',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…啊啊～…那里很脏的…所以…不行…啊～…嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1037',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为肛门被爱抚发出了悲鸣声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1038',
        any: [/^\s*CFLAG:TARGET:303 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1038-1040',
        any: [
          /^\s*CFLAG:TARGET:303 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1041-1042',
        any: [/^\s*ELSE\s*$\s*^\s*P = PALAM:3 \+ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1042',
        any: [/^\s*P = PALAM:3 \+ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1043',
        any: [
          /^\s*IF \(TEQUIP:13 \|\| TEQUIP:19 \|\| TEQUIP:46 \|\| TEQUIP:49\) && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1044',
        any: [/^\s*PRINT 「啊嗯～、啊啊～\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1045',
        any: [/^\s*IF TALENT:TARGET:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1046',
        any: [
          /^\s*PRINTFORMW %UNICODE\(0x2661\) \*1% 更多的…摸那里…伸、伸进去…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1047',
        any: [/^\s*ELSEIF TALENT:TARGET:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1048',
        any: [
          /^\s*PRINTFORMW %UNICODE\(0x2661\) \*1%唔\.\. 这、这里…好厉害………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1049-1050',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTW 、这样欺负那里的话\.\.不、不行了…啊～…啊啊～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1050',
        any: [
          /^\s*PRINTW 、这样欺负那里的话\.\.不、不行了…啊～…啊啊～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1051-1052',
        any: [/^\s*ENDIF\s*$\s*^\s*;淫乱\+润滑Lv2以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1053',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1054',
        any: [/^\s*PRINTFORMW 「啊、啊哈～！这个好爽…啊啊～…呀啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1055',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的菊穴分泌出了肠液，紧紧地追逐着%SAVESTR:PLAYER%的手指。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1056',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1057',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门，确切地感受到了快感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1058',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…这么舒服的事情最喜欢了～…所、所以请更多欺负肛门…用力的\.\.噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1059-1060',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:303 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1060',
        any: [/^\s*CFLAG:303 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1062',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1063',
        any: [/^\s*PRINTFORMW 「讨、讨厌，不要玩弄屁股啦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1064',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门似乎润滑度还不够的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1065',
        any: [/^\s*CFLAG:303 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1067',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1068',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…手指噗滋噗滋的响着…嗯～…唔嗯~～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1069',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肠壁滑溜溜的紧紧贴了上来、把%SAVESTR:PLAYER%的手指缠住了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1070',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1071',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门穴确实地反馈着快感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1072',
        any: [
          /^\s*PRINTFORMW 「唔～…唔啊～…啊啊～…屁股穴…这么的…有感觉什么的～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1073-1074',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:303 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1074',
        any: [/^\s*CFLAG:303 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1076',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1077',
        any: [
          /^\s*PRINTFORMW 「讨～…讨厌～…还很痛的说…再稍微温柔点啦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1078',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门似乎润滑度还不够的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1079',
        any: [/^\s*CFLAG:303 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1081',
        any: [
          /^\s*ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1082',
        any: [
          /^\s*PRINTFORMW 「啊啊～…咕～…讨厌…好厉害的\.\.感觉…嗯～…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1083',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门穴在润滑的帮助下承受着%SAVESTR:PLAYER%的手指爱抚………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1084',
        any: [/^\s*CFLAG:303 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1086',
        any: [/^\s*ELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1087',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…很脏的～…不要～…弄这里…有什么意义\.\.嘎吱嘎吱的声音好奇怪…嗯～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1088',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被手指玩弄着后面，发出了苦闷的呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1089',
        any: [/^\s*CFLAG:303 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1089-1091',
        any: [/^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1089-1093',
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1089-1095',
        any: [
          /^\s*CFLAG:303 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1091-1096',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;自慰 CFLAG304\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1098',
        any: [/^\s*IF SELECTCOM == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1100',
        any: [/^\s*IF CFLAG:304 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1101',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、人家的自慰要开始…要仔细的盯着看哦…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1102',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用舌头舔着嘴唇，抓住肉棒用力的撸动了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1103',
        any: [/^\s*PRINTFORMW 看她娴熟的手法，大概已经习惯了吧………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1104',
        any: [/^\s*CFLAG:TARGET:304 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1104-1106',
        any: [
          /^\s*CFLAG:TARGET:304 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1107-1108',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＋处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1109',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 10 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1110',
        any: [
          /^\s*PRINTFORMW 「嗯~…嗯哼～%UNICODE\(0x2661\) \*1%…哈…啊啊…呐~在听嘛？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1111',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边撸动着自己的肉棒，一边痴笑着开口说道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1112',
        any: [
          /^\s*PRINTFORMW 「几年前人家试着用自己的肉棒把处女破掉呢…啊啊 弄得差点折断掉了好危险的说」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1113',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%自嘲的笑了笑。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1114',
        any: [
          /^\s*PRINTFORMW 「…唔呼呼、不过现在的话有种说不定能够做到的感觉呢，要试试吗？………诶？果然还是想亲手夺走人家的处女嘛？真是拿你没办法呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1115',
        any: [/^\s*CFLAG:304 = 11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1117',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:74 == 1 && \(CFLAG:304 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1118',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1119',
        any: [
          /^\s*PRINTFORMW 「啊嘿…噫…啊啊～…%UNICODE\(0x2661\) \*1% 大肉棒～…大肉棒自慰最高%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1120',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%翻着白眼，像要弄坏一样用双手激烈的揉搓着自己红肿的龟头，不断有白浆从她的手指缝里迸溅出来。过度的高潮让她粉嫩的舌头从嘴角滑了出来，上面和下面的嘴同样不知廉耻的流着口水\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1121',
        any: [
          /^\s*PRINTFORMW 「啊～…嘎啊～…啊～…好爽～%UNICODE\(0x2661\) \*1%…呐啊…谁（随）便怎么调教都好！让人家更激烈的肉棒升兼（天）啊！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1122',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1123',
        any: [
          /^\s*PRINTFORMW 「嗯～…呼啊～…啊啊a～%UNICODE\(0x2661\) \*1% 自慰最棒了～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1124',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%大声娇叫着，不知道用扶她肉棒去了多少回。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1125',
        any: [
          /^\s*PRINTFORMW 「啊～…啊a哈～…%UNICODE\(0x2661\) \*1% 超棒…超棒%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1126-1127',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唔呼…呼…哈啊…啊~%UNICODE\(0x2661\) \*1% …手、手臂自己动起来惹（了）…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1127',
        any: [
          /^\s*PRINTFORMW 「唔呼…呼…哈啊…啊~%UNICODE\(0x2661\) \*1% …手、手臂自己动起来惹（了）…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1128',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:PLAYER%似乎想露出一个微笑，然而她手上突然加快的动作把这个表情变成了吐着舌头的下流表情。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1129',
        any: [
          /^\s*PRINTFORMW 「啊啊～…要射了…要射惹（了）…%UNICODE\(0x2661\) \*1% 被看着的话超多的宝宝牛奶要射出来惹（了）！…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1130-1131',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1131',
        any: [/^\s*CFLAG:304 = 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1133',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1135',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1136',
        any: [
          /^\s*PRINTFORMW 「啊哈～…停不下来…明明只是被命令而已…肉棒自慰停不下来啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1137',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着恍惚的表情持续自慰着。如同说的一样已经去了不知道多少次还是停不下来的样子\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1138',
        any: [
          /^\s*PRINTFORMW 「真实的…不要这、哈嗯、这么看着人家…把人家调教成这个样子的是谁啊…啊呜…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1139',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1139-1148',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「啊～…嗯～…在你的面前…啊啊～…自慰什么的…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%M字开脚、在%SAVESTR:PLAYER%面前激烈自慰着。\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着，被%SAVESTR:TARGET%的十指打成了淫靡的泡沫………\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…哈啊～…啊嗯…扶她肉棒撸起来好舒服…好舒服～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着。\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1140',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…在你的面前…啊啊～…自慰什么的…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1141',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%M字开脚、在%SAVESTR:PLAYER%面前激烈自慰着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1142',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着，被%SAVESTR:TARGET%的十指打成了淫靡的泡沫………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1144',
        any: [
          /^\s*PRINTFORMW 「哈啊～…哈啊～…啊嗯…扶她肉棒撸起来好舒服…好舒服～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1145',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1146',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1147-1148',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1148',
        any: [/^\s*CFLAG:304 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1150',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1151',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1152',
        any: [
          /^\s*PRINTFORMW 「嗯～…哈～…哈啊～…啊啊～…感觉好爽～…啊啊啊～…去了～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1153',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%M字开脚、在%SAVESTR:PLAYER%面前激烈自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1154-1155',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…肉棒自慰，喜欢…最喜欢了…撸肉棒好幸福……哈啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1155',
        any: [
          /^\s*PRINTFORMW 「啊啊～…肉棒自慰，喜欢…最喜欢了…撸肉棒好幸福……哈啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1156',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1157-1158',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1158',
        any: [/^\s*CFLAG:304 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1160',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1161',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯呼～%UNICODE\(0x2661\) \*1%…哈…啊啊…呐，在听嘛？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1162',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边随意地把玩着自己的性器，一边笑着开口了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1163',
        any: [
          /^\s*PRINTFORMW 「几年前人家试着用自己的肉棒把处女破掉呢…啊啊 弄得差点折断掉了好危险的说 唔呼呼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1164',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%自嘲的笑了笑。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1165',
        any: [
          /^\s*PRINTFORMW 「所以啦、这个运气好留下来的处女就给你咯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1166',
        any: [/^\s*CFLAG:304 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1168',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:74 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1169',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1170',
        any: [
          /^\s*PRINTFORMW 「哈～…啊啊～…啊…魔王大人～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1171',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%努力的向你挤出一个微笑，似乎想说点什么，然而激烈射精的肉棒打断了她。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1172',
        any: [
          /^\s*PRINTFORMW 「嗯～…唔～…不、不行%UNICODE\(0x2661\) \*1% 哈嗯～…被魔王大人看着的话…肉棒变得超舒服了啊啊啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1173',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1174',
        any: [
          /^\s*PRINTFORMW 「嗯～…呼啊～…啊啊啊～%UNICODE\(0x2661\) \*1% 魔王大人~魔王大人请看着不知羞耻的扶她肉棒…噫噫%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1175',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%大声娇叫着壮烈的射精了 ，白色秽雨发出淫靡的栗子花香，洒落在她被爱欲烧红的身体上。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1176',
        any: [
          /^\s*PRINTFORMW 「啊～…啊哈哈～…%UNICODE\(0x2661\) \*1% 魔王…大人～%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%露出淫媚的笑容，向%SAVESTR:PLAYER%伸出了手\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1177-1178',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唔呼…呼…哈啊…啊啊%UNICODE\(0x2661\) \*1% …对不起…看到魔王大人  手开心的停不下来…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1178',
        any: [
          /^\s*PRINTFORMW 「唔呼…呼…哈啊…啊啊%UNICODE\(0x2661\) \*1% …对不起…看到魔王大人  手开心的停不下来…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1179',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双眼湿润的对%SAVESTR:PLAYER%露出微笑，一边道歉一边加快了自慰的动作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1180',
        any: [
          /^\s*PRINTFORMW 「啊啊～…要去了…要去了…%UNICODE\(0x2661\) \*1% 被喜欢的人看着下流的自慰去了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1181-1182',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1182',
        any: [/^\s*CFLAG:304 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1184',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1186',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1187',
        any: [
          /^\s*PRINTFORMW 「啊哈～…停不下来…明明只是被命令而已…肉棒自慰停不下来啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1188',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着恍惚的表情持续自慰着。如同说的一样已经去了不知道多少次还是停不下来的样子\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1189',
        any: [
          /^\s*PRINTFORMW 「真实的…不要这、哈嗯、这么看着人家…把人家调教成这个样子的是谁啊…啊呜…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1190',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1190-1199',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「啊～…嗯～…在你的面前…啊啊～…自慰什么的…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%M字开脚、在%SAVESTR:PLAYER%面前激烈自慰着。\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着，被%SAVESTR:TARGET%的十指打成了淫靡的泡沫………\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…哈啊～…啊嗯…扶她肉棒撸起来好舒服…好舒服～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着。\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1191',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…在你的面前…啊啊～…自慰什么的…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1192',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%M字开脚、在%SAVESTR:PLAYER%面前激烈自慰着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1193',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着，被%SAVESTR:TARGET%的十指打成了淫靡的泡沫………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1195',
        any: [
          /^\s*PRINTFORMW 「哈啊～…哈啊～…啊嗯…扶她肉棒撸起来好舒服…好舒服～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1196',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1197',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%肉棒的马眼处前走液咕噜咕噜的冒着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1198-1199',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1199',
        any: [/^\s*CFLAG:304 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1201',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1202',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1203',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…在喜欢的人面前…啊啊～…自慰什么的…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1204',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的两腿情不自禁的分开了、她轻咬着嘴唇，像要展示一般在%SAVESTR:PLAYER%面前继续自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1205-1206',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…肉棒自慰，喜欢…和魔王大人一样喜欢…撸肉棒好幸福……哈啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1206',
        any: [
          /^\s*PRINTFORMW 「啊啊～…肉棒自慰，喜欢…和魔王大人一样喜欢…撸肉棒好幸福……哈啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1207',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1208-1209',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1209',
        any: [/^\s*CFLAG:304 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1211',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1213',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1214',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊～…哈啊～…啊啊～…好酥糊～…啊嗯～…嗯哈~～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1215',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的两腿情不自禁的分开了,在%SAVESTR:PLAYER%面前持续自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1216-1217',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…肉棒自慰，喜欢…撸肉棒好幸福……哈啊…啊啊…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1217',
        any: [
          /^\s*PRINTFORMW 「啊啊～…肉棒自慰，喜欢…撸肉棒好幸福……哈啊…啊啊…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1218',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对口角流下的唾液浑然不觉、继续自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1219-1220',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1220',
        any: [/^\s*CFLAG:304 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1222',
        any: [/^\s*ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1224',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1225',
        any: [
          /^\s*PRINTFORMW 「唔嗯♪ 人家很喜欢自慰哟…哈啊~…闲着的时候一直在做呢…因为、没有床伴嘛…嗯～…嗯呼呼♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1226',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%毫不在意的一边自爆着黑历史一边玩弄着肉棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1227-1228',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…撸管超舒服~～…嗯、啊、很、很害羞的啦不要那样盯着看嘛」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1228',
        any: [
          /^\s*PRINTFORMW 「啊～…撸管超舒服~～…嗯、啊、很、很害羞的啦不要那样盯着看嘛」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1229',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%似乎很害羞似的曲起大腿挡住了肉棒，然而手上的动作却更加激烈了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1230-1231',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:304 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1231',
        any: [/^\s*CFLAG:304 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1231-1233',
        any: [/^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1231-1235',
        any: [
          /^\s*CFLAG:304 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1232-1237',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;口交 CFLAG:305\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1234-1237',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;口交 CFLAG:305\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1239',
        any: [/^\s*IF SELECTCOM == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1241',
        any: [/^\s*IF CFLAG:305 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1243',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1244',
        any: [
          /^\s*PRINTFORMW 「啊啊～%UNICODE\(0x2661\) \*1% 魔王大人的嘴唇…好热…呜、要烫伤了…啊～…嗯呀~～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1245',
        any: [
          /^\s*PRINTFORMW 「被喜欢的人含着什么的…超有感觉的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1247-1248',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…嗯～…哈～…人、人家…被这样含着、是做梦吗…啊～…啊嗯～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1248',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…哈～…人、人家…被这样含着、是做梦吗…啊～…啊嗯～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1249',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒被吸着,不自觉把想着的事情说出来了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1250-1251',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:305 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1251',
        any: [/^\s*CFLAG:TARGET:305 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1251-1253',
        any: [
          /^\s*CFLAG:TARGET:305 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1253-1256',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:305 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1256',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:305 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1257',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、这么热心的吸着、魔王大人真是变态%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1258',
        any: [
          /^\s*PRINTFORMW 「但是没关系呢、人家也是和你一样最喜欢变态play的淫乱女…所以、嗯～…再用牙齿咬那里吧…啊～哈噫！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1259',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%敏感的龟头被肆意蹂躏、纤细的腰肢也随之战栗着，好像被叼住喉咙的小鹿。感觉到她高潮到来的%SAVESTR:PLAYER%坏心眼的加大了力度………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1260',
        any: [/^\s*CFLAG:305 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1262',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:305 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1263',
        any: [
          /^\s*PRINTFORMW 「啊～…唔呼呼%UNICODE\(0x2661\) \*1% 那么…热心的吸着什么的…人家的肉棒很美味吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1264',
        any: [
          /^\s*PRINTFORMW 「唔呼呼…一会、呀嗯%UNICODE\(0x2661\) \*1%作为回礼，人家帮你、呜、帮你做 也可以哟%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1265',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%被口腔侍奉着，脸上露出了充满爱意的笑容………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1266',
        any: [/^\s*CFLAG:305 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1268',
        any: [
          /^\s*ELSEIF ABL:0 >= 3 && \(CFLAG:305 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1269',
        any: [
          /^\s*PRINTFORMW 「啊啊～！不、不行～…人家的…最近变得很敏感的说…啊嘿～…噫%UNICODE\(0x2661\) \*1%！」%SAVESTR:TARGET%敏感的里筋被舔了，小腹仿佛触电一般弹了起来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1270',
        any: [
          /^\s*PRINTFORMW 「这、这么咕啾咕啾的吸着的话…啊～…啊嗯～！要要被吸出来了%UNICODE\(0x2661\) \*1%！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1271',
        any: [/^\s*CFLAG:305 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1273',
        any: [/^\s*ELSEIF CFLAG:305 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1274',
        any: [
          /^\s*PRINTFORMW 「啊啊～…再吸啊…嗯～…哈啊～…这样、多用舌头缠上去…噫呜、对、对不起啦、把牙齿放开啦呜呜………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1275',
        any: [/^\s*PRINTFORMW 「哈～…啊啊～…嗯～…嗯呼…啊…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1276',
        any: [/^\s*CFLAG:305 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1276-1278',
        any: [/^\s*CFLAG:305 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1276-1280',
        any: [
          /^\s*CFLAG:305 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1276-1282',
        any: [
          /^\s*CFLAG:305 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1277-1284',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;胸爱撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1286',
        any: [/^\s*IF SELECTCOM == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1288',
        any: [/^\s*IF CFLAG:306 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1290',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1291',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、再更加仔细一点摸也可以哟…嗯哈……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1293-1294',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「拜、拜托、请温柔的…哈啊、啊嗯～…嗯～…呜…这样子的话再下去、就………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1294',
        any: [
          /^\s*PRINTFORMW 「拜、拜托、请温柔的…哈啊、啊嗯～…嗯～…呜…这样子的话再下去、就………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1294-1296',
        any: [
          /^\s*PRINTFORMW 「拜、拜托、请温柔的…哈啊、啊嗯～…嗯～…呜…这样子的话再下去、就………」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1295-1300',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;母乳体质\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1296',
        any: [/^\s*CFLAG:TARGET:306 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1299-1300',
        any: [/^\s*ELSE\s*$\s*^\s*;母乳体质\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1301',
        any: [
          /^\s*IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1303',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1304',
        any: [
          /^\s*PRINTFORMW 「就这样\.\.像要把乳房扯下来一样更多的玩弄胸部吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1305',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用双手像挤奶一样绞扭着自己的巨乳，大量的乳汁随着她疯狂的动作飞溅着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1306',
        any: [
          /^\s*PRINTFORMW 「唔哦哦哦！去了！%UNICODE\(0x2661\) \*1% 用奶子射精惹（了）%UNICODE\(0x2661\) \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1307',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1309',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1310',
        any: [
          /^\s*PRINTFORMW 「啊啊…更多的喝吧…亲爱的…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1311',
        any: [
          /^\s*PRINTFORMW 「再多喝一点…变得精神起来…然后好好疼爱人家吧………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1312',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边被吸着乳房，一边露出慈爱的笑容轻轻抚摸着你的头发………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1313',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1315',
        any: [
          /^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1316',
        any: [
          /^\s*PRINTFORMW 「啊嗯~～…啊～…哈啊～♪ 被这么吸着的话…呀啊～…哈～…哈噫～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1317',
        any: [/^\s*PRINTFORMW 「被喝掉了～…全部被喝掉了～………！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1318',
        any: [/^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1320',
        any: [/^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1321',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊…被吸着母乳…有了感觉什么的…啊～…啊呜～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1322',
        any: [/^\s*CFLAG:306 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1322-1324',
        any: [/^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1323-1325',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1326',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1327',
        any: [
          /^\s*PRINTFORMW 「哈啊～%UNICODE\(0x2661\) \*1% 乳头变得硬邦邦的～%UNICODE\(0x2661\) \*1% 超级舒服%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1328',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像要把乳房揉进%SAVESTR:TARGET%手里紧紧按着%SAVESTR:TARGET%的手臂\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1329',
        any: [
          /^\s*PRINTFORMW 「哈啊~%UNICODE\(0x2661\) \*1% 就这样用力揪人家的乳头啊…啊啊～…怎么样都好再用力的虐待这对不知廉耻的奶子吧%UNICODE\(0x2661\) \*1%！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1330',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1332',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1333',
        any: [
          /^\s*PRINTFORMW 「唔呼呼～…魔王大人的手指好热～…%UNICODE\(0x2661\) \*1% 更多的欺负人家的胸部吧…%UNICODE\(0x2661\) \*1%把人家的全部…变成魔王大人的东西%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1334',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%充血坚挺的乳尖被指甲玩弄着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1335',
        any: [
          /^\s*PRINTFORMW 「啊啊～！这、这个超舒服～…啊～…呜呀～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1336',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1338',
        any: [
          /^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1339',
        any: [
          /^\s*PRINTFORMW 「啊哈～啊～…嗯～…呜、更多的疼爱人家的乳头吧…啊啊～…嗯~～…哈～…哈呜～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1340',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%硬硬的乳头被两根手指捏住，轻转爱抚着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1341',
        any: [/^\s*PRINTFORMW 「啊～…啊嗯～…呼……啊啊～…有感觉过头了…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1342',
        any: [/^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1344',
        any: [/^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1345',
        any: [
          /^\s*PRINTFORMW 「啊～…啊嗯～…嗯哈～…很温柔呢……啊、哈啊～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1346',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的乳头渐渐变硬了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1347',
        any: [/^\s*CFLAG:306 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1347-1349',
        any: [/^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1347-1351',
        any: [
          /^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1347-1353',
        any: [
          /^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1348-1355',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;接吻 CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1350-1355',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;接吻 CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1357',
        any: [/^\s*IF SELECTCOM == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1359',
        any: [/^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1361',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1362',
        any: [
          /^\s*PRINTFORMW 「嗯啾…啾呜…舌头…嗯～…还要…不要停下来嘛…%UNICODE\(0x2661\) \*1% 嗯～…啾唔…哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1363',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%伸出双手紧紧抱着%SAVESTR:PLAYER%的头长吻着，完全不像第一次的淫乱舌尖渴求着%SAVESTR:PLAYER%的回应。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1364',
        any: [
          /^\s*PRINTFORMW 「呼啊…嘴巴好像发情了呢、呐、再来继续做吧？」%SAVESTR:TARGET%双眼湿润的舔舐着指尖，发出了淫乱的邀请\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1366',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1367',
        any: [
          /^\s*PRINTFORMW 「嗯～…喜欢～%UNICODE\(0x2661\) \*1% …喜欢哟～%UNICODE\(0x2661\) \*1% …不要、不更多的和人家亲亲的话不原谅你哦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1368',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%撒娇的环着%SAVESTR:PLAYER%的腰、一遍又一遍的索吻着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1369',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、初吻被吃掉了呢…第二次、第三次的也是魔王大人的东西哟%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1371-1372',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～…嗯嗯～………初吻什么的…本来听说是更加美妙的东西呢………唔嗯！………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1372',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯嗯～………初吻什么的…本来听说是更加美妙的东西呢………唔嗯！………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1373',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%稍稍有些失望的抱怨还没说完，嘴唇就再次被猛烈的侵犯了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1373-1375',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%稍稍有些失望的抱怨还没说完，嘴唇就再次被猛烈的侵犯了………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1374-1379',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;（調教では）初めて\s*$\s*^\s*ELSEIF CFLAG:307 == 0\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1375',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1378',
        any: [/^\s*ELSEIF CFLAG:307 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1380',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1381',
        any: [
          /^\s*PRINTFORMW 「嗯啾…啾呜…舌头…嗯～…（咕噜咕噜）…咕啊%UNICODE\(0x2661\) \*1% 嗯～…啾唔…哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1382',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%伸出双手紧紧抱着%SAVESTR:PLAYER%的头，湿滑的舌头仿佛什么贪婪的异界生物一样索取着%SAVESTR:PLAYER%口腔的每一个角落。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1383',
        any: [
          /^\s*PRINTFORMW 「呼啊…嘴巴好像发情了呢、呐、再来继续做吧？」%SAVESTR:TARGET%双眼湿润的舔舐着指尖，发出了淫乱的邀请\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1385',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1386',
        any: [
          /^\s*PRINTFORMW 「嗯～…呼呼～%UNICODE\(0x2661\) \*1% …喜欢～%UNICODE\(0x2661\) \*1% …啊\.\.和喜欢的人接吻什么做不腻呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1387',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%撒娇的环着%SAVESTR:PLAYER%的腰、一遍又一遍的索吻着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1388',
        any: [
          /^\s*PRINTFORMW 「哈啊…亲亲…还要啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1390-1391',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊呼…啊~…连嘴巴都被你侵犯了呢…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1391',
        any: [/^\s*PRINTFORMW 「啊呼…啊~…连嘴巴都被你侵犯了呢…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1391-1393',
        any: [
          /^\s*PRINTFORMW 「啊呼…啊~…连嘴巴都被你侵犯了呢…♪」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1392-1397',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1393',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1395-1398',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1398',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1399',
        any: [
          /^\s*PRINTFORMW 「把舌头伸出来嘛\.\.人家会让你舒服起来的哦%UNICODE\(0x2661\) \*1%啾唔  唏~」%SAVESTR:TARGET%的唇舌绽放着，好像妖艳的食虫植物一样缠绕舔舐着自己的手指\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1400',
        any: [
          /^\s*PRINTFORMW 被%SAVESTR:TARGET%诱惑的%SAVESTR:PLAYER%伸出了舌头，瞬间被捕获了，%SAVESTR:TARGET%口穴仿佛对舌头进行口交一样咕啾咕啾的吸着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1401',
        any: [
          /^\s*PRINTFORMW 「嗯呼咕…嗯啾…啾卟%UNICODE\(0x2661\) \*1% 哈啊…魔王大人的舌头、好美味%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1402',
        any: [
          /^\s*PRINTFORMW 就这样%SAVESTR:TARGET%沉溺在舌交接吻里了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1403',
        any: [/^\s*CFLAG:307 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1405',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1406',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯呼唔…卟…噗哈…%UNICODE\(0x2661\) \*1% 接吻  更多的给人家…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1407',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%温热黏腻的舌头在%SAVESTR:PLAYER%口中释放着如同媚药般的快感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1408',
        any: [/^\s*IF RAND:3 ==0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1409',
        any: [/^\s*PRINTFORMW 「啊啊……魔王大人的浓厚kiss…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1410',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1411',
        any: [
          /^\s*PRINTFORMW 「呼啊………嗯～…嗯嗯%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1412-1413',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「真是的…不想分开了…一直这样下去…直到永远就好了呢 嗯～…嗯呼～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1413',
        any: [
          /^\s*PRINTFORMW 「真是的…不想分开了…一直这样下去…直到永远就好了呢 嗯～…嗯呼～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1414-1415',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1415',
        any: [/^\s*CFLAG:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1417',
        any: [
          /^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1418',
        any: [
          /^\s*PRINTFORMW 「啊啊…啊…嗯～…停、停啦…嗯唔～…咕…嗯～…嗯嗯！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1419',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%说着拒绝的话，舌头却更加积极地缠了上来。随着更加急促的呼吸，双眸也湿润了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1420',
        any: [/^\s*CFLAG:307 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1422',
        any: [/^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1423',
        any: [/^\s*PRINTFORMW 「嗯～…嗯唔～…啾呜…嗯啊…哈啊哈啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1424',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%亲吻着，神情变得恍惚了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1424-1428',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%亲吻着，神情变得恍惚了………\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1424-1430',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%亲吻着，神情变得恍惚了………\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1425',
        any: [/^\s*CFLAG:307 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1425-1432',
        any: [
          /^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;自己扒开 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1427-1432',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;自己扒开 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1434',
        any: [/^\s*IF SELECTCOM == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1436',
        any: [/^\s*IF CFLAG:308 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1438',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1439',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%蹲了下来，两腿大开…毫不犹豫的撑开了自己的肛门和蜜穴，粉嫩的肉壁被空气刺激，淫靡的蠕动着，所谓‘工口蹲踞’的标准也不过如此了吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1440',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的爱液已经打湿了手指，充血到极致的肉棒也抵住了小巧的肚脐，她用四指巧妙地维持着双穴撑开的状态，微笑着伸出了右手比出一个“V”字。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1441',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、怎样？里面也看得很清楚吧？Peace♪Peace♪………嗯？干嘛一脸呆呆的样子？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1443',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1444',
        any: [/^\s*PRINTFORMW 「好、好啦…给你看就是嘛 都看过多少次了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1445',
        any: [
          /^\s*PRINTFORMW 「………诶？自己打开是什么意思？………变、变态…笨蛋！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1446',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸红红的扭过头，对着%SAVESTR:PLAYER%分开了自己的阴唇………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1448-1449',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呜哇～…不愧是魔王这个还真的有点…令人害羞呢…嗯~～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1449',
        any: [
          /^\s*PRINTFORMW 「呜哇～…不愧是魔王这个还真的有点…令人害羞呢…嗯~～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1450',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%磨磨蹭蹭的分开双腿露出了自己的蜜穴。然而她的阴茎已经完全勃起了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1451',
        any: [/^\s*PRINTFORMW 「讨、讨厌…不要冲着那里吹气啦…呜呜呜…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1452-1453',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:308 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1453',
        any: [/^\s*CFLAG:TARGET:308 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1453-1455',
        any: [
          /^\s*CFLAG:TARGET:308 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1456-1457',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱\+自慰狂\+露出癖Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1458',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:74 == 1 && ABL:17 >= 3 && \(CFLAG:308 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1459',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%蹲了下来，两腿大开…毫不犹豫的撑开了自己的肛门和蜜穴，粉嫩的肉壁被空气刺激，淫靡的蠕动着，所谓‘工口蹲踞’的标准也不过如此了吧\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1460',
        any: [
          /^\s*PRINTFORMW 「啊～哈啊…请仔细的看吧…人家的肉穴和扶她肉棒…%UNICODE\(0x2661\) \*1% 已经湿的乱七八糟了～%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%用四指维持着双穴撑开的状态，右手握住了自己的肉棒大力套弄了起来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1461',
        any: [
          /^\s*PRINTFORMW 「哈～…哈～…撸肉棒什么  喜欢！…H的地方被看到了也喜欢%UNICODE\(0x2661\) \*1%！噫！魔王大人！魔王大人在看着的说！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1462',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的扶她肉棒就在自己的大力套弄和被视奸中接近了高潮。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1463',
        any: [
          /^\s*PRINTFORMW 「啊啊～！已经、已经忍不住了！ 射出来了！%UNICODE\(0x2661\) \*1% 在魔王大人的面前射出来了！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1464',
        any: [/^\s*CFLAG:306 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1466',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1467',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%蹲下来两脚大开…犹如站立的牝犬般摆出了色情蹲踞的姿势。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1468',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被分开的肉穴不停吐出爱液，她抓住跳动着的肉棒，用力向上拉起。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1469',
        any: [
          /^\s*PRINTFORMW 「啊嗯～嗯%UNICODE\(0x2661\) \*1% 人家的淫乱肉穴、全部、呜全部看个一清二楚吧…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1470',
        any: [/^\s*CFLAG:306 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1472',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:74 == 1 && ABL:17 >= 3 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1473',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用一只手把阴唇扒开、另一只手撸动着自己的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1474',
        any: [
          /^\s*PRINTFORMW 「咕～…唔～…啊啊啊～…哈嗯～…哈～…%UNICODE\(0x2661\) \*1% 十、十分抱歉，人家真是…因为被魔王大人看着太高兴了，一不小心就沉浸在自慰中了呢…嗯啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1475',
        any: [
          /^\s*PRINTFORMW 虽然说着道歉的话%SAVESTR:TARGET%套弄肉棒的速度却越来越快了。大量流出的前列腺液和地上的爱液混合在一起，发出淫靡的气味。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1476',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊～…请再看着人家…啊噫～…哈呀～%UNICODE\(0x2661\) \*1% 魔王大人！魔王大人~！%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%喊着心爱的人，激烈的射精了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1477',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1479',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1480',
        any: [
          /^\s*PRINTFORMW 「虽然很害羞…魔王大人想看的话就没办法了呢…啊～…啊嗯～请、请看人家用来做小孩的地方%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1481',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%两脚分开，用一只手掰开蜜穴、另一只手撸动着自己的阴茎。。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1482',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～嗯～…咕…魔王大人～…人、人家…已经～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1483',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1485',
        any: [
          /^\s*ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1486',
        any: [
          /^\s*PRINTFORMW 「啊啊…看吧…人家的肉棒已经这样湿漉漉咕啾咕啾的了…哈啊～…哈啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1487',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用右手握着龟头，把肉棒压在穴口咕哩咕哩的磨蹭着，大量的爱液顺着肉棒流下来冲淡了指缝间的白浊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1488',
        any: [/^\s*PRINTFORMW 「哈啊～…更多…更多的看着人家～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1489',
        any: [/^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1491',
        any: [/^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1492',
        any: [/^\s*PRINTFORMW 「果、果然还是不行、好、好害羞的啦………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1493',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%磨磨蹭蹭的分开双腿露出了自己的蜜穴。然而她的阴茎已经完全勃起了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1494',
        any: [/^\s*PRINTFORMW 「讨、讨厌…不要盯着看…呜呜呜…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1494-1498',
        any: [
          /^\s*PRINTFORMW 「讨、讨厌…不要盯着看…呜呜呜…」\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1494-1500',
        any: [
          /^\s*PRINTFORMW 「讨、讨厌…不要盯着看…呜呜呜…」\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1495',
        any: [/^\s*CFLAG:306 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1495-1502',
        any: [
          /^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;插入手指 CFLAG:309\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1497-1502',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;插入手指 CFLAG:309\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1504',
        any: [/^\s*IF SELECTCOM == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1506',
        any: [/^\s*IF CFLAG:TARGET:309 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1508',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1509',
        any: [
          /^\s*PRINTFORMW 「你的手指插进来了啊…哼…哈啊…啊～%UNICODE\(0x2661\) \*1%」只是一个指节，就让%SAVESTR:TARGET%饱经开发的淫乱肉体颤抖了起来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1510',
        any: [
          /^\s*PRINTFORMW 「啊~…这、这样嘎吱嘎吱的欺负那里…不、不行…%UNICODE\(0x2661\) \*1% 脑髓要烧掉了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1512',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1513',
        any: [/^\s*PRINTFORMW 「哈…啊啊…嗯哈…嗯哼…手指进来了…有…啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1514',
        any: [/^\s*PRINTFORMW 「那、那里…只磨蹭那里…不行…呀啊～…哈~！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1516-1517',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～！…稍微有点辛苦…温柔一点…求求你………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1517',
        any: [/^\s*PRINTFORMW 「嗯～！…稍微有点辛苦…温柔一点…求求你………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1518',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%有点难受的样子皱起眉头………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1519-1520',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:309 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1520',
        any: [/^\s*CFLAG:TARGET:309 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1520-1522',
        any: [
          /^\s*CFLAG:TARGET:309 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1522-1525',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1525',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1526',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的膣壁外侧里面有扶她特有的前列腺（魔界生理学常识DA☆ZE）。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1527',
        any: [
          /^\s*PRINTFORMW 如果强烈的刺激那里的话、%SAVESTR:TARGET%轻易的就会陷入高潮的狂乱中，就像这样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1528',
        any: [
          /^\s*PRINTFORMW 「噫～…哈嘿～…噫呀啊哈哈哈～…这、这酿（样）的…人家的鸡巴会坏掉啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1529',
        any: [
          /^\s*PRINTFORMW 「手～…手指…噫～…嘿嘿～脑子要坏掉了…啊噫…呀哈～%UNICODE\(0x2661\) \*3%！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1530',
        any: [/^\s*CFLAG:309 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1532',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1533',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的膣壁外侧里面有扶她特有的前列腺（魔界生理学常识DA☆ZE）。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1534',
        any: [
          /^\s*PRINTFORMW 如果轻柔的刺激那里的话%SAVESTR:TARGET%的阴茎就会流出前列腺液，就像这样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1535',
        any: [
          /^\s*PRINTFORMW 「啊…啊啊…H的汁液什么的…好多…露出来了…呜呜%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1536',
        any: [
          /^\s*PRINTFORMW 「咕哈…啊啊…%UNICODE\(0x2661\) \*1% 更多…更多弄那里…欺负人家吧…哈啊%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%脸上浮现了苦闷又魅惑的表情\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1537',
        any: [/^\s*CFLAG:309 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1539',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1540',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯嗯～…！ 啊～…啊哈～！ 那、那里是前列腺…啊～…嗯～…噫～…啊噫～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1541',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的膣壁外侧里面有扶她特有的前列腺（魔界生理学常识DA☆ZE）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1542',
        any: [
          /^\s*PRINTFORMW 这样摩擦的话%SAVESTR:TARGET%就会发出动人的高鸣胜晕倒了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1543',
        any: [/^\s*CFLAG:309 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1545',
        any: [/^\s*ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1546',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…嗯～…啊啊～！ 不、要这样欺负那里…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1547',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%在阴道内被搅拌着不由得大声的求饶………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1548',
        any: [/^\s*CFLAG:309 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1548-1550',
        any: [/^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1548-1552',
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1548-1554',
        any: [
          /^\s*CFLAG:309 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1550-1555',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;舔肛 CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1557',
        any: [/^\s*IF SELECTCOM == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1559',
        any: [/^\s*IF CFLAG:310 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1561',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1562',
        any: [
          /^\s*PRINTFORMW 「啊啊～…更多的舔那里…哦哦…肛门穴被扒开了…啊哈哈…发出了下流的声音……噫♪」%SAVESTR:TARGET%的肛门被无慈悲的撑开了，柔韧的肠肉绞着侵入的舌尖，发出咕哩咕哩的水音\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1564',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1565',
        any: [
          /^\s*PRINTFORMW 「不要舔太多啦…讨、讨厌…因为、很脏的嘛…笨蛋！」%SAVESTR:TARGET%把脸埋入枕头，红着耳尖发出了可爱的抱怨声\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1567-1568',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呜…啊，不行…！那里是脏的…啊啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1568',
        any: [/^\s*PRINTFORMW 「呜…啊，不行…！那里是脏的…啊啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1568-1570',
        any: [
          /^\s*PRINTFORMW 「呜…啊，不行…！那里是脏的…啊啊啊！」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1569-1574',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1570',
        any: [/^\s*CFLAG:TARGET:310 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1572-1575',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1575',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1576',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊～…唔呼呼～…更多的把人家的肛穴弄得粘糊糊的吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1577',
        any: [
          /^\s*PRINTFORMW 「肛门穴超舒服…用舌头再来操人家的肛门穴啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1578',
        any: [/^\s*CFLAG:310 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1580',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1581',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊啊～…哈呜～…后、后面会被撑开啦…啊啊～」%SAVESTR:TARGET%温柔的抱着%SAVESTR:player%的头，不知是鼓励还是抗拒的加紧了双腿\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1582',
        any: [
          /^\s*PRINTFORMW 「很害羞的，所以不要…啊啊～…明明不想要的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1583',
        any: [/^\s*CFLAG:310 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1585',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1586',
        any: [
          /^\s*PRINTFORMW 「啊啊啊！那，那样的用舌头舔了的话…我…啊啊啊！」」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1587',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…肛门都被撑开了…啊啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1588',
        any: [/^\s*CFLAG:310 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1590',
        any: [/^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1591',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…呜～…呜啊…不要…那么脏的…嗯～…唔唔～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1591-1595',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…呜～…呜啊…不要…那么脏的…嗯～…唔唔～！」\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1591-1597',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…呜～…呜啊…不要…那么脏的…嗯～…唔唔～！」\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1592',
        any: [/^\s*CFLAG:310 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1592-1599',
        any: [
          /^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;振动宝石 CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1594-1599',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;振动宝石 CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1601',
        any: [/^\s*IF SELECTCOM == 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1603',
        any: [/^\s*IF CFLAG:TARGET:311 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1605',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1606',
        any: [
          /^\s*PRINTFORMW 「啊~…嗯…嗯哈…唔呼呼、可爱的震动着呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1608',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1609',
        any: [
          /^\s*PRINTFORMW 「这样被按上来的话…呀嗯~…麻麻的舒服呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1611-1612',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯～…这个震动…啊～…啊啊♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1612',
        any: [/^\s*PRINTFORMW 「啊嗯～…这个震动…啊～…啊啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1613-1614',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:311 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1614',
        any: [/^\s*CFLAG:TARGET:311 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1614-1616',
        any: [
          /^\s*CFLAG:TARGET:311 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1616-1619',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1619',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1620',
        any: [
          /^\s*PRINTFORMW 「啊~…嗯…嗯哈…唔呼呼、可爱的震动着呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1621',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…裏筋～…把这个按在上面的话…哦哦来了！%UNICODE\(0x2661\) \*1%」扶她的阴茎腹面，像男人一样有着被称为龟头包皮系带的敏感区域，被H攻击的话会变得很不妙（魔界生理学常识DA☆ZE）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1622',
        any: [/^\s*CFLAG:311 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1624',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1625',
        any: [
          /^\s*PRINTFORMW 「这样被按上来的话…呀嗯~…舒服过头人家要变的奇怪了呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1626',
        any: [
          /^\s*PRINTFORMW 「就说了嘛、已经、这样的勃起了…呀啊%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%很不好意思的捂着脸，从指缝间偷看着，不过对于一抖一抖的肉棒却完全没有掩饰的意思\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1627',
        any: [/^\s*CFLAG:311 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1629',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1630',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…请让这么H的人家变得更舒服吧…啊～…啊啊～…咕嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1631',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的双脚大开这，完全勃起的阴茎颤抖着，很舒服的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1632',
        any: [/^\s*CFLAG:311 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1634',
        any: [/^\s*ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1635',
        any: [/^\s*PRINTFORMW 「啊啊~…勃起了呢…哈啊…啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1636',
        any: [/^\s*CFLAG:311 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1636-1638',
        any: [/^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1636-1640',
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1636-1642',
        any: [
          /^\s*CFLAG:311 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1638-1643',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;壶虫 CFLAG:312　CFLAG:372\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1646',
        any: [/^\s*IF SELECTCOM == 11 && TEQUIP:11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1648',
        any: [/^\s*IF CFLAG:TARGET:312 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1650',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1652',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1653',
        any: [
          /^\s*PRINTFORMW 「啊哈哈～…会被淫虫夺取处女什么…这种刺激的事情之前连想都没想过呢…啊啊%UNICODE\(0x2661\) \*1% 开始动了！在人家里面咕啾咕啾的动了%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%双眼翻白的扭动着腰肢，好像在跳奇怪的舞蹈，随着肉棒的舞动，星星点点的白液飞溅着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1655',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1656',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…被这么做了的话…自己好像变成了魔王大人的震动飞机杯呢…啊…呜、现在还不可以动啦…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1657',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%连感慨下处女丧失的时间都没有，就被%SAVESTR:player%抓着的蠕虫强烈的翻搅着肉穴，即使如此，她充满爱意的目光依然痴痴的望着爱人的脸……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1659-1660',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊…啊咕…唔唔～…不、不要～…这个蠕虫…还是活的…啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1660',
        any: [
          /^\s*PRINTFORMW 「啊…啊咕…唔唔～…不、不要～…这个蠕虫…还是活的…啊…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1661',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%连感慨下处女丧失的时间都没有，就蠕虫强烈的翻搅着肉穴失去了思考的能力………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1661-1663',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%连感慨下处女丧失的时间都没有，就蠕虫强烈的翻搅着肉穴失去了思考的能力………\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1662-1667',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「啊咳…哈啊…这个蠕虫很有活力的在人家里面折腾呢…嗯%UNICODE\(0x2661\) \*1% …哦哈%UNICODE\(0x2661\) \*1%糟糕 这个\.\.搞不好会上瘾的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1666',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1667',
        any: [
          /^\s*PRINTFORMW 「啊咳…哈啊…这个蠕虫很有活力的在人家里面折腾呢…嗯%UNICODE\(0x2661\) \*1% …哦哈%UNICODE\(0x2661\) \*1%糟糕 这个\.\.搞不好会上瘾的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1669',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1670',
        any: [
          /^\s*PRINTFORMW 「啊嗯…能把蠕虫、呜、改造成性爱用的之前从来都没听过呢…被亲爱的魔王大人用这么棒的东西欺负的话，哈呜%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1672-1673',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「就、就这样子放进来吗？真的？ 啊！嘎哈…！咕～！啊、乱动着…在我里面乱动着啊啊…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1673',
        any: [
          /^\s*PRINTFORMW 「就、就这样子放进来吗？真的？ 啊！嘎哈…！咕～！啊、乱动着…在我里面乱动着啊啊…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1673-1675',
        any: [
          /^\s*PRINTFORMW 「就、就这样子放进来吗？真的？ 啊！嘎哈…！咕～！啊、乱动着…在我里面乱动着啊啊…！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1675-1676',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1676',
        any: [/^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1676-1678',
        any: [
          /^\s*CFLAG:312 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1679-1680',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱\+V感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1681',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:2 >= 3 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1682',
        any: [
          /^\s*PRINTFORMW 「哈啊～…呜…啊啊%UNICODE\(0x2661\) \*1% 肉穴好爽！…噫…啊啊！ 还在进去，啊啊~最里面被蠕虫塞满了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1683',
        any: [
          /^\s*PRINTFORMW 似乎把%SAVESTR:TARGET%饱经开发的肉穴当成了巢穴的样子，蠕虫很兴奋的往深处钻去了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1684',
        any: [/^\s*CFLAG:312 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1686',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:2 >= 3 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1687',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊%UNICODE\(0x2661\) \*1% 魔王大人开发的蠕虫肉棒…嗯…啊啊～…好舒服…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1688',
        any: [
          /^\s*PRINTFORMW 似乎把%SAVESTR:TARGET%饱经开发的肉穴当成了巢穴的样子，蠕虫很兴奋的往深处钻去了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1689',
        any: [/^\s*CFLAG:312 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1691',
        any: [
          /^\s*ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1692',
        any: [
          /^\s*PRINTFORMW 「啊~…啊啊~…嗯~…啊啊！ 虫子在蠕动着…啊嗯…好舒服呢………♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1693',
        any: [
          /^\s*PRINTFORMW 托了被充分开发的福，%SAVESTR:TARGET%的蜜穴在蠕虫激烈的动作中有感觉了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1694',
        any: [/^\s*CFLAG:312 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1696',
        any: [/^\s*ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1697',
        any: [
          /^\s*PRINTFORMW 「嗯~…啊~…啊嗯~…还、还是有点难受呢…啊啊…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1698',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为蜜穴中暴动的蠕虫露出了难过的表情………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1699',
        any: [/^\s*CFLAG:312 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1699-1701',
        any: [/^\s*CFLAG:312 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1699-1703',
        any: [
          /^\s*CFLAG:312 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1701-1704',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1704',
        any: [/^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1706',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1707',
        any: [
          /^\s*PRINTFORMW 「啊啊~…已经要拔掉了嘛？ 明明一整天就这么插着也没关系的嘛」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1708',
        any: [/^\s*CFLAG:372 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1710',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1711',
        any: [
          /^\s*PRINTFORMW 「哈啊~  呐~…比起蠕虫来人家更想要魔王大人的说…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1712',
        any: [/^\s*CFLAG:372 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1714',
        any: [/^\s*ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1715',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊………唔呼呼、这个洞空下来了呢、你要进来吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1716',
        any: [/^\s*CFLAG:372 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1716-1718',
        any: [/^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1716-1720',
        any: [
          /^\s*CFLAG:372 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1717-1722',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;振动杖 CFLAG:313\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1724',
        any: [/^\s*IF SELECTCOM == 12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1726',
        any: [/^\s*IF CFLAG:313 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1727',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…这、这个…嘎啊！不、不行了！再继续下去人家就…哦哦哦！…这个震动超不妙…噫～！」%SAVESTR:player%抓住%SAVESTR:TARGET%的阴茎，把疯狂震动的魔导具抵住了敏感的龟头。……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1728',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%浑身痉挛着发出了不成语调的浪叫。……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1729',
        any: [/^\s*CFLAG:313 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1729-1731',
        any: [
          /^\s*CFLAG:313 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1731-1734',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1734',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1735',
        any: [
          /^\s*PRINTFORMW 「啊~…更多…更多……啊噫~…哈嗯…这个超舒服的…啊啊～%UNICODE\(0x2661\) \*1% 人家要变成肉棒笨蛋了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1736',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸上挂着下流的痴笑、不知廉耻的挺着腰，完全勃起的扶她肉棒挂着白浊的水痕主动迎上了震动棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1737',
        any: [/^\s*CFLAG:313 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1739',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1740',
        any: [
          /^\s*PRINTFORMW 「啊啊…魔王大人 再来…继续用这个欺负人家的肉棒吧%UNICODE\(0x2661\) \*1% 啊～…啊嗯～…哈呜啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1741',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%轻轻扭动着腰肢，品味着爱人给与的震动快乐………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1742',
        any: [/^\s*CFLAG:313 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1744',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1745',
        any: [
          /^\s*PRINTFORMW 「呜呜～…明白了啦…老实让你欺负就好了吧…啊～…嗯…嗯呼…唔…啊、啊嗯～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1746',
        any: [
          /^\s*PRINTFORMW 沉浸在震动快感里的%SAVESTR:TARGET%不自觉得挺起了腰……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1747',
        any: [/^\s*CFLAG:313 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1749',
        any: [/^\s*ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1750',
        any: [
          /^\s*PRINTFORMW 「啊…啊嗯…那、那个东西刺激太强了…啊～…呀啊～…噫呀～…用力压上来什么的不行！…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1751',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%为了躲开震动杖徒劳的扭动着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1752',
        any: [/^\s*CFLAG:313 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1752-1754',
        any: [/^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1752-1756',
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1752-1758',
        any: [
          /^\s*CFLAG:313 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1754-1759',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;肛门虫 CFLAG:314　CFLAG:374\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1762',
        any: [/^\s*IF SELECTCOM == 13 && TEQUIP:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1764',
        any: [/^\s*IF CFLAG:TARGET:314 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1766',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1767',
        any: [
          /^\s*PRINTFORMW 「嗯唔唔~…啊～…啊嗯～！ 啊~…在肛门里有精神的动着呢…嗯～…好厉害%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1768',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用力收紧肛穴，让蠕虫挣扎的更剧烈了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1770',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1771',
        any: [
          /^\s*PRINTFORMW 「啊…嗯…讨、讨厌…再继续往深处去的话…啊…呀啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1772',
        any: [
          /^\s*PRINTFORMW 蠕虫在%SAVESTR:TARGET%的肛穴里暴动着，让她发出了可爱的悲鸣………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1774-1775',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「人、人家、屁股那放面稍微有点…啊～…呀啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1775',
        any: [
          /^\s*PRINTFORMW 「人、人家、屁股那放面稍微有点…啊～…呀啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1776',
        any: [
          /^\s*PRINTFORMW 肛门被异种侵入的恐惧感让%SAVESTR:TARGET%发出了悲鸣………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1777-1778',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:314 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1778',
        any: [/^\s*CFLAG:TARGET:314 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1778-1780',
        any: [
          /^\s*CFLAG:TARGET:314 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1780-1783',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1783',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1784',
        any: [
          /^\s*PRINTFORMW 「啊嗯~…蠕虫酱再动的激烈点…啊…啊哈%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1785',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为蠕虫给予的淫肛快感露出了柔软的表情………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1786',
        any: [/^\s*CFLAG:314 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1788',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1789',
        any: [
          /^\s*PRINTFORMW 「嗯唔…啊～…哈嗯～！ 啊~…在肛穴里一跳一跳的…嗯～…好厉害%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1790',
        any: [
          /^\s*PRINTFORMW 蠕虫在%SAVESTR:TARGET%的肛穴里暴动着，她看着%SAVESTR:player%发出了淫媚的娇喘声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1791',
        any: [/^\s*CFLAG:314 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1793',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1794',
        any: [
          /^\s*PRINTFORMW 「啊~…哈啊~…%UNICODE\(0x2661\) \*1% 嗯呼…蠕虫桑真的很舒服呢%UNICODE\(0x2661\) \*1%…哈啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1795',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%望向%SAVESTR:player%的湿润眼眸中充满了浓厚的爱欲………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1796',
        any: [/^\s*CFLAG:314 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1798',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1799',
        any: [
          /^\s*PRINTFORMW 「哈啊…蠕虫不想魔王大人那样温柔呢，稍微、有点辛苦…嗯！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1800',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为肛穴里暴动的淫虫蹙紧了眉头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1801',
        any: [/^\s*CFLAG:314 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1803',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1804',
        any: [/^\s*PRINTFORMW 「嗯…嗯哼…这个…好厉害…啊～…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1805',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发了的肛门因为蠕虫而喜悦着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1806',
        any: [/^\s*CFLAG:314 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1808',
        any: [/^\s*ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1809',
        any: [
          /^\s*PRINTFORMW 「不…不要…拔出去啊！这样的一点也不会舒服的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1810',
        any: [
          /^\s*PRINTFORMW 肛门被异种侵入的恐惧感让%SAVESTR:TARGET%发出了悲鸣………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1811',
        any: [/^\s*CFLAG:314 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1811-1813',
        any: [/^\s*CFLAG:314 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1811-1815',
        any: [
          /^\s*CFLAG:314 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1813-1816',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1816',
        any: [/^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1818',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1819',
        any: [
          /^\s*PRINTFORMW 「啊啊！明明插在人家的肛穴里很合适的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1820',
        any: [/^\s*CFLAG:374 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1822',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1823',
        any: [
          /^\s*PRINTFORMW 「哈啊…人家的后面被好好疼爱了一番呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1824',
        any: [/^\s*CFLAG:374 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1826',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1827',
        any: [/^\s*PRINTFORMW 「啊啊…屁股…啊呜…湿掉了………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1828',
        any: [/^\s*CFLAG:374 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1830',
        any: [/^\s*ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1831',
        any: [/^\s*PRINTFORMW 「不要再次插进来了！…说真的啦………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1832',
        any: [/^\s*CFLAG:374 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1832-1834',
        any: [/^\s*CFLAG:374 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1832-1836',
        any: [
          /^\s*CFLAG:374 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1833-1838',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;阴蒂夹 CFLAG:315　CFLAG:375\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1895',
        any: [/^\s*IF SELECTCOM == 15 && TEQUIP:15\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1897',
        any: [/^\s*IF CFLAG:316 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1898',
        any: [/^\s*PRINTFORMW 「啊哈~…有点痒呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1899',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%对乳头夹有了一点点反应………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1900',
        any: [/^\s*CFLAG:316 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1900-1902',
        any: [
          /^\s*CFLAG:316 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1902-1905',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1905',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1906',
        any: [
          /^\s*PRINTFORMW 「啊啊…乳头有感觉了%UNICODE\(0x2661\) \*1% 嗯~…这个震动…好像让人家上瘾了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1907',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%发出了荡漾的声音………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1908',
        any: [/^\s*CFLAG:316 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1910',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:316 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1911',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊…嗯~%UNICODE\(0x2661\) \*1% 唔呼呼\.\.\.乳头…很舒服呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1912',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%舔着嘴唇吐出了炽热的叹息………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1913',
        any: [/^\s*CFLAG:316 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1915',
        any: [/^\s*ELSEIF CFLAG:316 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1916',
        any: [/^\s*PRINTFORMW 「啊…啊啊…乳头变得舒服起来了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1917',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%对乳头夹有了一点点反应………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1918',
        any: [/^\s*CFLAG:316 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1918-1920',
        any: [/^\s*CFLAG:316 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1918-1922',
        any: [
          /^\s*CFLAG:316 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1920-1923',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1923',
        any: [/^\s*ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1925',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:376 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1926',
        any: [/^\s*PRINTFORMW 「啊嗯~…还想在沉浸在那种感觉中啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1927',
        any: [/^\s*CFLAG:376 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1929',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:376 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1930',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…嗯、接下来是魔王大人亲自摸吗………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1931',
        any: [/^\s*CFLAG:376 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1933',
        any: [/^\s*ELSEIF CFLAG:376 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1934',
        any: [/^\s*PRINTFORMW 「嗯…接下来是指头吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1935',
        any: [/^\s*CFLAG:376 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1935-1937',
        any: [/^\s*CFLAG:376 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1935-1939',
        any: [
          /^\s*CFLAG:376 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1936-1941',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;榨乳器\(母乳体质のみ\) CFLAG:317　CFLAG:377\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1944',
        any: [/^\s*IF SELECTCOM == 16 && TEQUIP:16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1946',
        any: [/^\s*IF CFLAG:317 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1948',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1949',
        any: [
          /^\s*PRINTFORMW 「啊哈哈…这样不讲道理的挤着胸部…好像变成了家畜了呢%UNICODE\(0x2661\) \*1%…啊、再、再用力吸%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1951',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1952',
        any: [
          /^\s*PRINTFORMW 「呜哇…啊…人家的母乳…竟然这么多…嗯～…嗯嗯~%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1954-1955',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「挤出来的母乳你要怎么办啊？ 诶…卖掉…？不要做这种事情啊……啊、很害羞的说」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1955',
        any: [
          /^\s*PRINTFORMW 「挤出来的母乳你要怎么办啊？ 诶…卖掉…？不要做这种事情啊……啊、很害羞的说」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1956-1957',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:317 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1957',
        any: [/^\s*CFLAG:317 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1957-1959',
        any: [
          /^\s*CFLAG:317 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1959-1962',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1 && \(CFLAG:317 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1962',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:317 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1963',
        any: [
          /^\s*PRINTFORMW 「嗯…唔唔…胸部被榨乳…竟然这么舒服什么的…啊啊~要变成肉棒母牛了啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1964',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%激烈的喷射着。大量充满淫靡气味的奶水被榨乳器无情的抽走了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1965',
        any: [/^\s*CFLAG:317 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1967',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:317 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1968',
        any: [
          /^\s*PRINTFORMW 「啊啊…因、因为对魔王大人的爱…才会出来这么多…人家才不好色啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1969',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边喷乳高潮一边喘息着解释道，不过满脸发情的样子毫无说服力………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1970',
        any: [/^\s*CFLAG:317 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1972',
        any: [/^\s*ELSEIF CFLAG:317 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1973',
        any: [
          /^\s*PRINTFORMW 「啊、啊啊…不要…不要啊…求求你把这个拿掉啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1974',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%被榨着母乳留下了眼泪………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1975',
        any: [/^\s*CFLAG:317 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1975-1977',
        any: [/^\s*CFLAG:317 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1975-1979',
        any: [
          /^\s*CFLAG:317 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1977-1980',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1980',
        any: [/^\s*ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1982',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:377 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1983',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…不要停下来嘛…人家的胸部还想更多的射精…装回来嘛…呐~呐~…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1984',
        any: [/^\s*CFLAG:377 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1986',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:377 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1987',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…出来了好多呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1988',
        any: [/^\s*CFLAG:377 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1990',
        any: [/^\s*ELSEIF CFLAG:377 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1991',
        any: [/^\s*PRINTFORMW 「（哭哭）…要好好……喝掉它们啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1992',
        any: [/^\s*CFLAG:377 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1992-1994',
        any: [/^\s*CFLAG:377 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1992-1996',
        any: [
          /^\s*CFLAG:377 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '1993-1998',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;飞机杯\(扶她\/男人のみ\) CFLAG:318　CFLAG:378\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2001',
        any: [/^\s*IF SELECTCOM == 17 && TEQUIP:17\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2003',
        any: [/^\s*IF CFLAG:318 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2005',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2006',
        any: [
          /^\s*PRINTFORMW 「咕哈啊…什、什么啊这个…肉棒…超级舒服的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2008',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2009',
        any: [
          /^\s*PRINTFORMW 「啊…啊啊…好厉害…这个超级舒服的………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2011-2012',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咿呀～…啊…啊啊…这、这个…这样的…太爽了不行…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2012',
        any: [
          /^\s*PRINTFORMW 「咿呀～…啊…啊啊…这、这个…这样的…太爽了不行…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2013-2014',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:318 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2014',
        any: [/^\s*CFLAG:318 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2014-2016',
        any: [
          /^\s*CFLAG:318 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2016-2019',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2019',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2020',
        any: [
          /^\s*PRINTFORMW 「啊啊！飞机杯超赞%UNICODE\(0x2661\) \*1% 飞机杯最高的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2021',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰淫荡的前后摇动着，贪求着飞机杯的快乐………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2022',
        any: [/^\s*CFLAG:318 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2024',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:318 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2025',
        any: [
          /^\s*PRINTFORMW 「从前人家知道这样的东西的话…哈啊、一定离不开手了吧…啊啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2026',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%害羞地感叹着，一边舍不得飞机杯的快感，小小的动起了腰……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2027',
        any: [/^\s*CFLAG:318 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2029',
        any: [/^\s*ELSEIF CFLAG:318 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2030',
        any: [/^\s*PRINTFORMW 「嗯~…啊啊…飞机杯好爽…请全部套进去吧………♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2031',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%无意识的轻轻抽送着腰………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2032',
        any: [/^\s*CFLAG:318 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2032-2034',
        any: [/^\s*CFLAG:318 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2032-2036',
        any: [
          /^\s*CFLAG:318 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2034-2037',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2037',
        any: [/^\s*ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2039',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:378 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2040',
        any: [
          /^\s*PRINTFORMW 「讨厌…人家还想在飞机杯里更多射精啦！」%SAVESTR:TARGET%鼓起嘴，被淫欲烧红的脸上，露出了小孩子般的可爱表情\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2041',
        any: [/^\s*CFLAG:378 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2043',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:378 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2044',
        any: [/^\s*PRINTFORMW 「哈啊…哈啊…拔掉了？…满了吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2045',
        any: [/^\s*CFLAG:378 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2047',
        any: [/^\s*ELSEIF CFLAG:378 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2048',
        any: [/^\s*PRINTFORMW 「啊啊…啊~…太过舒服了…要变成废人啦………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2049',
        any: [/^\s*CFLAG:378 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2049-2051',
        any: [/^\s*CFLAG:378 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2049-2053',
        any: [
          /^\s*CFLAG:378 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2050-2055',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;肛珠 CFLAG:320　CFLAG:379\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2058',
        any: [/^\s*IF SELECTCOM == 19 && TEQUIP:19\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2060',
        any: [/^\s*IF CFLAG:TARGET:320 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2062',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2063',
        any: [
          /^\s*PRINTFORMW 「啊~…啊啊~…全部…全部塞进来…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2065',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2066',
        any: [
          /^\s*PRINTFORMW 「嗯…啊嗯~…不要太欺负人家后面嘛…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2068-2069',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯…啊啊~…我、我的屁股不是玩具啦！………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2069',
        any: [/^\s*PRINTFORMW 「啊嗯…啊啊~…我、我的屁股不是玩具啦！………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2070-2071',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:320 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2071',
        any: [/^\s*CFLAG:TARGET:320 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2071-2073',
        any: [
          /^\s*CFLAG:TARGET:320 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2073-2076',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2076',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2077',
        any: [
          /^\s*PRINTFORMW 「啊啊…肛穴要变得奇怪了%UNICODE\(0x2661\) \*1% …哈呜…啊啊…就这样一口气全部拔出来会怎么样呢？呐~试试嘛」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2078',
        any: [/^\s*CFLAG:320 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2080',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2081',
        any: [
          /^\s*PRINTFORMW 「哈～…哈啊…没关系…呜…全部放进来也…呀%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2082',
        any: [/^\s*CFLAG:320 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2084',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2085',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊~…塞进来了呢…嗯~…啊啊~…啊~…好多…好多啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2086',
        any: [/^\s*CFLAG:320 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2088',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2089',
        any: [/^\s*PRINTFORMW 「魔王大人…好温柔…哈啊啊~」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2090',
        any: [/^\s*CFLAG:320 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2092',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2093',
        any: [
          /^\s*PRINTFORMW 「啊啊…哈啊啊…全部进来了…肚子里面都被侵犯了…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2094',
        any: [/^\s*CFLAG:320 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2096',
        any: [/^\s*ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2097',
        any: [
          /^\s*PRINTFORMW 「啊…咕唔…好痛苦…全部塞进来不行…不要啊…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2098',
        any: [/^\s*CFLAG:320 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2098-2100',
        any: [/^\s*CFLAG:320 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2098-2102',
        any: [
          /^\s*CFLAG:320 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2100-2103',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;脱着時\s*$\s*^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2103',
        any: [/^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2105',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2106',
        any: [/^\s*PRINTFORMW 「啊啊~！…这个…这个好赞！…再来一次！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2107',
        any: [/^\s*CFLAG:379 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2109',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2110',
        any: [
          /^\s*PRINTFORMW 「咕嗯~…被做了这种事情的话…人家也%UNICODE\(0x2661\) \*1%！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2111',
        any: [/^\s*CFLAG:379 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2113',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2114',
        any: [/^\s*PRINTFORMW 「哈啊～…啊啊~…超、超舒服~…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2115',
        any: [/^\s*CFLAG:379 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2117',
        any: [/^\s*ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2118',
        any: [/^\s*PRINTFORMW 「啊啊！屁股要…坏掉了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2119',
        any: [/^\s*CFLAG:379 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2119-2121',
        any: [/^\s*CFLAG:379 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2119-2123',
        any: [
          /^\s*CFLAG:379 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2120-2125',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;正常位 CFLAG:321\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2127',
        any: [/^\s*IF SELECTCOM == 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2129',
        any: [/^\s*IF CFLAG:TARGET:321 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2131',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2133',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2135',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2136',
        any: [
          /^\s*PRINTFORMW 「啊啊…我明白了…清清楚楚的感受到了呢…啊嗯…被、被你的大肉棒插进来的话…魔力在我的身体中…啊呀%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2137',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面色潮红的展开了魔族的翅膀，温柔的包住了%SAVESTR:PLAYER%，轻轻在背上摩擦着。从翅膀上放射出来的魔力让这个小小空间的温度变得更温暖了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2138',
        any: [
          /^\s*PRINTFORMW 「唔呼呼…转化魔族这种事情都做了…不是已经只能服从你了嘛…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2139',
        any: [
          /^\s*PRINTFORMW 「呜\.\.就这样继续侵犯人家\.\.\.把里面都染上你的颜色吧%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%在耳边轻诉着，分叉的舌尖轻轻舔着耳廓，吐出湿热的气息\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2140',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全没有在意失贞的痛苦，修长有力双腿紧扣着%SAVESTR:PLAYER%的腰部，淫乱的肉穴贪婪的吞吐着肉棒，一遍又一遍的求欢着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2141',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%像要回应这份感情一样开始了狂暴的抽插，%SAVESTR:TARGET%用双手激烈的揉搓着自己红肿的龟头，不断有白浆从她的手指缝里迸溅出来，与肉穴流出的血液一起，被肉棒搅成了淡紫色泡沫………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2142-2143',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈咕、嗯嗯！…哈啊…哈啊~…啊~…呜呜！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2143',
        any: [/^\s*PRINTFORMW 「哈咕、嗯嗯！…哈啊…哈啊~…啊~…呜呜！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2144',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛皱紧了眉头，然而两条有力的美腿却紧紧扣住了%SAVESTR:PLAYER%的腰背。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2145',
        any: [
          /^\s*PRINTFORMW 「唔咕、不、不要拔出来…哈啊\.\.哈啊\.\.你的肉棒\.\.一跳一跳的说想要更多呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2146',
        any: [
          /^\s*PRINTFORMW 「终于…和别人一样了…把人家的肉穴用大肉棒插进来…咕啾咕啾的调教成魔王专用穴吧！啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2147',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰肢战栗着，无视还在流血痉挛的肉壁，甜媚的向%SAVESTR:PLAYER%求欢着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2147-2149',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰肢战栗着，无视还在流血痉挛的肉壁，甜媚的向%SAVESTR:PLAYER%求欢着………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2150',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2152',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2153',
        any: [
          /^\s*PRINTFORMW 「啊啊…我明白了…清清楚楚的感受到了呢…啊嗯…被、被你的大肉棒插进来的话…魔力在我的身体中…啊呀%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2154',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%面色潮红的展开了魔族的翅膀，温柔的包住了%SAVESTR:PLAYER%，轻轻在背上摩擦着。从翅膀上放射出来的魔力让这个小小空间的温度变得更温暖了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2155',
        any: [
          /^\s*PRINTFORMW 「唔呼呼…转化魔族这种事情都做了…不是已经只能服从你了嘛…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2156',
        any: [
          /^\s*PRINTFORMW 「啊啊…稍微还有点辛苦呢，要更温柔的对待人家啊…毕竟人家已经是你的所有物了…啊~…哈嗯%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2157',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着幸福的微笑，用双手爱恋的抚摸着%SAVESTR:PLAYER%的脸颊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2158',
        any: [/^\s*PRINTFORMW 于是%SAVESTR:PLAYER%轻缓的开始了抽插………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2159-2160',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛皱起了眉头，抱着%SAVESTR:PLAYER%肩膀的十指不禁用力，微微陷入了肌肉中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2160',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛皱起了眉头，抱着%SAVESTR:PLAYER%肩膀的十指不禁用力，微微陷入了肌肉中。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2161',
        any: [
          /^\s*PRINTFORMW 「啊啊！哈咕…唔~…人家还撑得住…啊啊…嗯~…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2162',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用为强烈的痛楚呼吸都有些颤抖了，她一边努力的吐气放松身体，一边尽量分开了双腿，好让%SAVESTR:PLAYER%插得更深一些。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2163',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…和你在一起、很开心呢…嗯…这样、呜、这样一来…人家就是你的东西了…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2164',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%慢慢的动着腰，让%SAVESTR:TARGET%处女穴内慢慢染上了肉欲的气味………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2164-2166',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%慢慢的动着腰，让%SAVESTR:TARGET%处女穴内慢慢染上了肉欲的气味………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2167-2168',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%双脚青蛙一样被打开着，娇小的身体好像要被压碎一样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2168',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双脚青蛙一样被打开着，娇小的身体好像要被压碎一样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2169',
        any: [
          /^\s*PRINTFORMW 「啊啊…好、好难受…疼…好疼啊…请温柔些…哈啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2170',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%无视了%SAVESTR:TARGET%的抗议声开始抽插。%SAVESTR:TARGET%膣壁像要把入侵者挤出去一样，用力的收缩着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2171',
        any: [
          /^\s*PRINTFORMW 「噫～！啊啊啊啊…不要再动了…求你…呀啊～！」%SAVESTR:PLAYER%无慈悲的继续征伐着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2171-2173',
        any: [
          /^\s*PRINTFORMW 「噫～！啊啊啊啊…不要再动了…求你…呀啊～！」%SAVESTR:PLAYER%无慈悲的继续征伐着\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2172-2177',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「啊嗯…在更强力的侵犯我啊…啊啊～…大肉棒插得好深…哈呀%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2176',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2177',
        any: [
          /^\s*PRINTFORMW 「啊嗯…在更强力的侵犯我啊…啊啊～…大肉棒插得好深…哈呀%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2178',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双脚缠着%SAVESTR:PLAYER%的腰淫荡的前后摇动着，贪求着肉棒的快乐………………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2180',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2181',
        any: [
          /^\s*PRINTFORMW 「啊啊…%SAVESTR:PLAYER%果然很温柔呢…好高兴…啊…哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2182',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%像对待恋人一样，温柔的抱着%SAVESTR:TARGET%，慢慢地开始了抽插………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2184-2185',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…啊嗯…嗯…再稍微慢一点…啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2185',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…啊嗯…嗯…再稍微慢一点…啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2186',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TARGET%不断痉挛的娇小身体、激烈的摆着腰部蹂躏着多汁的肉穴………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2186-2188',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TARGET%不断痉挛的娇小身体、激烈的摆着腰部蹂躏着多汁的肉穴………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2188-2189',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:321 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2189',
        any: [/^\s*CFLAG:321 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2189-2191',
        any: [
          /^\s*CFLAG:321 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2191-2194',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2194',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2195',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2196',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着%SAVESTR:TARGET%被迫凸起的肉穴猛地捅了进去，尽根没入。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2197',
        any: [
          /^\s*PRINTFORMW 「哈啊～！插到了好深的地方了…更多…更多的侵犯人家的肉穴，把里面弄坏掉吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2198',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像坏掉的飞机杯娃娃一样被相对她私处巨大的多的肉棒侵犯着、然而这幅不可思议的邪淫光景却让每个目击者的心中都燃起了情欲的火苗。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2199',
        any: [
          /^\s*PRINTFORMW 「嗯~…啊嗯~…啊啊～…噫嘿…%UNICODE\(0x2661\) \*1% 被大肉棒操好爽…啊哈哈%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%已经射得半软的扶她肉棒随着激烈的抽插甩动着，在两人的肉体上撞出“啪叽啪叽”的淫靡水音\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2201',
        any: [
          /^\s*PRINTFORMW 「啊啊～…%UNICODE\(0x2661\) \*1% …啊啊～…人、人家已经…只要有肉穴就能活下去了！变成肉穴脑了啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2202',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2203',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…啊嗯～…哈啊%UNICODE\(0x2661\) \*1% 啊啊～%UNICODE\(0x2661\) \*1% 啊啊…肉棒~肉棒全部插进来%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2204',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向着%SAVESTR:PLAYER%分开双腿，湿润的肉壁蠕动着、邀请着粗硬的男性器。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2205',
        any: [
          /^\s*PRINTFORMW 就像被%SAVESTR:TARGET%捕食了一样、%SAVESTR:TARGET%的阴茎带着湿粘的水声完全被%SAVESTR:TARGET%吞入了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2207',
        any: [
          /^\s*PRINTFORMW 「更多…啊啊～…让人家的淫乱小穴更多的舒服起来吧%UNICODE\(0x2661\) \*1% 啊啊～…要去了…要去了了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2207-2209',
        any: [
          /^\s*PRINTFORMW 「更多…啊啊～…让人家的淫乱小穴更多的舒服起来吧%UNICODE\(0x2661\) \*1% 啊啊～…要去了…要去了了%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%拥抱着%SAVESTR:PLAYER%一根硬硬的东西搁在了两人的腰腹间。%SAVESTR:TARGET%的扶她肉棒完全勃起了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2209',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%拥抱着%SAVESTR:PLAYER%一根硬硬的东西搁在了两人的腰腹间。%SAVESTR:TARGET%的扶她肉棒完全勃起了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2210',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、被你的肚子摩擦着，人家的肉棒也要高潮了…啊嗯～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2211',
        any: [
          /^\s*PRINTFORMW 「啊啊～…就这样射在咱们之间吧…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2212',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎随着%SAVESTR:PLAYER%抽插肉穴的节奏一抽一抽的痉挛着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2214',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…人家的小穴…和人家的肉棒…呀啊\.\.哪一边会先高潮呢…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2215-2216',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:321 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2216',
        any: [/^\s*CFLAG:321 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2218',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2219',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2220',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着%SAVESTR:TARGET%被迫凸起的肉穴猛地捅了进去，尽根没入。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2221',
        any: [
          /^\s*PRINTFORMW 「啊嘿嘻嘻…肉、肉棒插得好深…啊啊～…嗯啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2222',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%轻缓的开始了抽插。%SAVESTR:TARGET%阴道最深处被爱人疼爱着发出了甜美的娇喘。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2224',
        any: [
          /^\s*PRINTFORMW 「啊嘿～…噫嗯～…哈…这、这样子…好舒服…好舒服的说…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2225',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2226',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%温柔的抱着%SAVESTR:TARGET%，慢慢地开始了抽插。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2227',
        any: [
          /^\s*PRINTFORMW 「啊啊…你的身体…好温暖…啊啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2228',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%慵懒的趴伏在%SAVESTR:PLAYER%的身上，随着抽插轻笑着玩弄着%SAVESTR:TARGET%的乳头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2230',
        any: [
          /^\s*PRINTFORMW 「啊啊…明明只是这样慢慢地动…腰以下好像要融化掉了…人、人家已经…不行…啊啊啊…………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2230-2232',
        any: [
          /^\s*PRINTFORMW 「啊啊…明明只是这样慢慢地动…腰以下好像要融化掉了…人、人家已经…不行…啊啊啊…………%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%拥抱着%SAVESTR:PLAYER%一根硬硬的东西搁在了两人的腰腹间。%SAVESTR:TARGET%的扶她肉棒完全勃起了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2232',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%拥抱着%SAVESTR:PLAYER%一根硬硬的东西搁在了两人的腰腹间。%SAVESTR:TARGET%的扶她肉棒完全勃起了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2233',
        any: [
          /^\s*PRINTFORMW 「讨、讨厌…这种时候…不过因为太舒服了也没办法嘛…真是的…不要看啦……」%SAVESTR:PLAYER%很害羞的用双手捂着自己的肉棒，像花栗鼠一样鼓起了脸颊\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2234',
        any: [
          /^\s*PRINTFORMW 被%SAVESTR:TARGET%的可爱表情虏获、%SAVESTR:PLAYER%不禁加快了抽插的速度。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2236',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…哈啊～…啊啊～…虽然肉棒也很舒服…但是果然还是这边比较…哈啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2237-2238',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:321 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2238',
        any: [/^\s*CFLAG:321 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2240',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2241',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着%SAVESTR:TARGET%被迫凸起的肉穴猛地捅了进去，尽根没入。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2242',
        any: [
          /^\s*PRINTFORMW 「啊嘿噫～！太深了…啊啊～…这、这样子插的话人家…啊啊啊～…啊嘿～…噫～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2243',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被彻底开发的腔穴中、好像要烧坏神经的激烈快感肆虐着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2244',
        any: [/^\s*CFLAG:321 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2246',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2247',
        any: [
          /^\s*PRINTFORMW 「咕…这个姿势太令人害羞了…啊～…啊嘿～…好深…插到底了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2248',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的双脚举了起来，把她柔软的身体摆成了一个倒Ｙ字型，狰狞的肉棒对着%SAVESTR:TARGET%被迫凸起的肉穴猛地捅了进去，尽根没入………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2249',
        any: [/^\s*CFLAG:321 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2251',
        any: [/^\s*ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2252',
        any: [
          /^\s*PRINTFORMW 「啊啊～…稍、稍微温柔一…啊～…咕～…唔啊…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2253',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%压制着、如打桩机一样的肉棒激烈的抽插着肉穴………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2254',
        any: [/^\s*CFLAG:321 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2254-2256',
        any: [/^\s*CFLAG:321 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2254-2258',
        any: [
          /^\s*CFLAG:321 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2254-2260',
        any: [
          /^\s*CFLAG:321 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2256-2261',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背后位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2263',
        any: [/^\s*IF SELECTCOM == 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2265',
        any: [/^\s*IF CFLAG:TARGET:322 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2267',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2269',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2271',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2272',
        any: [
          /^\s*PRINTFORMW 「啊啊～…插进来了！热热的大肉棒插进来了…啊啊～…哈啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2273',
        any: [
          /^\s*PRINTFORMW 破瓜的疼痛和感动让%SAVESTR:TARGET%背上的翅膀“啪唰”地张开了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2274',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊嗯～…啊啊～…更多…更多地把魔力灌进来…在人家的魔族身体里…染上你的颜色吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2275',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%纤细的腰肢把大量的魔精叩了进去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2276',
        any: [
          /^\s*PRINTFORMW 「啊啊啊～～！子宫里面…啊啊～要变成笨蛋了…要被魔力精子侵犯成中出笨蛋了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2277-2278',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…！噫…好深的说…啊啊～…啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2278',
        any: [/^\s*PRINTFORMW 「啊啊～…！噫…好深的说…啊啊～…啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2279',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了，%SAVESTR:PLAYER%露出了嗜虐的微笑，继续加大着力量。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2280',
        any: [
          /^\s*PRINTFORMW 「嗯哈啊…啊啊～…突然…全部…插进来什么的%UNICODE\(0x2661\) \*1% 唔啊…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2281',
        any: [
          /^\s*PRINTFORMW 「啊啊…这么激烈的也好舒服…啊啊…插进来…全部插进来…呜呜%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%流着泪狂乱的叫着，嘴角却不可抑制的上扬着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2282',
        any: [
          /^\s*PRINTFORMW 片刻之前还是处女么，完全看不出来啊。听着%SAVESTR:TARGET%淫靡的叫声，%SAVESTR:TARGET%不禁冒出了这样的念头………………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2282-2284',
        any: [
          /^\s*PRINTFORMW 片刻之前还是处女么，完全看不出来啊。听着%SAVESTR:TARGET%淫靡的叫声，%SAVESTR:TARGET%不禁冒出了这样的念头………………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2285',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2287',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2288',
        any: [
          /^\s*PRINTFORMW 「啊啊～…这个就是爱的、羁绊…啊啊～…哈啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2289',
        any: [
          /^\s*PRINTFORMW 破瓜的疼痛和感动让%SAVESTR:TARGET%背上的翅膀“啪唰”地张开了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2290',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊嗯～…啊啊～…更多…更多地把魔力灌进来…在人家的魔族身体里…染上你的颜色吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2291',
        any: [
          /^\s*PRINTFORMW 「嗯\.\.从今天起\.\.人家绝对不要再和%SAVESTR:PLAYER%分开了…啊啊…%SAVESTR:PLAYER%大人…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2292',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%腔口痉挛着绞住了%SAVESTR:PLAYER%的肉棒，仿佛也在吐露着主人的依恋………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2293-2294',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…突然就…这么激烈的…啊嗯～…稍微温柔点啦…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2294',
        any: [
          /^\s*PRINTFORMW 「啊啊～…突然就…这么激烈的…啊嗯～…稍微温柔点啦…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2295',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2296',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊啊～…你的东西全部插进来什么的不可能啦…咕啊～…不要、再进去的话会变得…啊啊～人家的肉穴要坏掉了啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2297',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%发出了痛苦的喉音。这幅娇弱无力的姿态更加刺激了%SAVESTR:PLAYER%的嗜虐心。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2298',
        any: [
          /^\s*PRINTFORMW 「要死掉了…人家要死掉了…啊啊…啊啊啊啊啊………」%SAVESTR:TARGET%痛苦的承受着雄性器的蹂躏，然而魔族的坚韧肉体正一点一点的适应着粗大的肉棒\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2298-2300',
        any: [
          /^\s*PRINTFORMW 「要死掉了…人家要死掉了…啊啊…啊啊啊啊啊………」%SAVESTR:TARGET%痛苦的承受着雄性器的蹂躏，然而魔族的坚韧肉体正一点一点的适应着粗大的肉棒\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2301-2302',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2302',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%纤细的腰肢向着膣内突破着、然而娇小的身体只吞入了一多半的雄性器就难以为继了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2303',
        any: [
          /^\s*PRINTFORMW 「啊嘿～…嘎噫～…！停下来～…再这样往里插的话～…要进到不能进去的地方了…啊啊～…好、好痛啊…噫嘿！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2304',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%强硬的将整根性器全部塞入了%SAVESTR:TARGET%娇嫩的处女穴。看着%SAVESTR:TARGET%因为破瓜和腔壁扩张泪流满面的表情，%SAVESTR:PLAYER%嗜虐心的到了满足。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2305',
        any: [/^\s*PRINTFORMW 「噫…啊啊啊～…不、已经…不行…不行了啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2305-2307',
        any: [
          /^\s*PRINTFORMW 「噫…啊啊啊～…不、已经…不行…不行了啊啊！」\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2306-2311',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「唔呼呼…哈啊…这种被侵犯的感觉最喜欢了…人家一直期待这呢…啊啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2310',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2311',
        any: [
          /^\s*PRINTFORMW 「唔呼呼…哈啊…这种被侵犯的感觉最喜欢了…人家一直期待这呢…啊啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2312',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%可爱的小屁股摇摆着，期待着更多的性爱………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2314',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2315',
        any: [
          /^\s*PRINTFORMW 「啊啊…嗯～…看不到魔王大人的脸…有些害怕呢…啊啊～…嗯～…好深…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2316',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%纤细的腰肢大力抽插着、让她漏出了甜美的叫声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2318-2319',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…不要插得太深…很痛的…啊啊～…啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2319',
        any: [
          /^\s*PRINTFORMW 「啊啊～…不要插得太深…很痛的…啊啊～…啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2320',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇小的身体被从后面贯穿、发出了痛叫………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2320-2322',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇小的身体被从后面贯穿、发出了痛叫………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2320-2324',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇小的身体被从后面贯穿、发出了痛叫………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2322-2327',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2323',
        any: [/^\s*CFLAG:322 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2325-2328',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2328',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2329',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2330',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…想要你的全部…啊啊～…整根插进来…啊啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2331',
        any: [
          /^\s*PRINTFORMW 虽然这么说着，身材娇小的%SAVESTR:TARGET%的蜜穴也很浅、%SAVESTR:PLAYER%的肉棒只插入一半多就撞到了一块软肉。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2332',
        any: [
          /^\s*PRINTFORMW 「啊嘿～…噫～…最深处被插到了…啊～…啊啊～…嗯～…还想\.\.再进来一些\.\.a 啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2334',
        any: [
          /^\s*PRINTFORMW 「再往里面一些…啊啊～…隔着肚子也可以感觉到鸡鸡在里面呢～%UNICODE\(0x2661\) \*1%」相对巨大的肉棒将%SAVESTR:TARGET%下腹撑得隆起，%SAVESTR:TARGET%带着淫乱的笑容抚摸着被肉棒撑起的部分\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2335',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2336',
        any: [
          /^\s*PRINTFORMW 「嗯～…呜噗 被强行插进来好爽…呃啊～…再往里面插啊…%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%娇小的身体猛地被从后面贯穿、腹腔压力的急剧变化让她发出了呕吐的声音 ………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2337',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%纤细的腰肢被双手扣住，粗大的肉棒在她湿润的肉穴里快速的进出着。小小的身体和粗大的性器总是能勾起侵犯者强烈的背德感，和她淫荡的扭腰动作结合在一起，产生出怪异的淫乱氛围。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2338',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…啊啊～%UNICODE\(0x2661\) \*1% 最、最里面…进去了…啊嘿～…噫~～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2340',
        any: [
          /^\s*PRINTFORMW 「啊啊～…要去了…要去了！！…子宫肉穴要去了！！%UNICODE\(0x2661\) \*1%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2341-2342',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TARGET%的穴口处像蜻蜓点水一样用龟头轻浅的抽插着。被快感地狱折磨的%SAVESTR:TARGET%口中吐出了发狂一般的娇声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2342',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TARGET%的穴口处像蜻蜓点水一样用龟头轻浅的抽插着。被快感地狱折磨的%SAVESTR:TARGET%口中吐出了发狂一般的娇声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2343',
        any: [
          /^\s*PRINTFORMW 「哈呀…哈啊啊…啊嘿～%UNICODE\(0x2661\) \*1% …噫啊啊啊～…咕啊～啊呜～…啊啊啊啊～～%UNICODE\(0x2661\) \*1%」零碎的的声音从%SAVESTR:TARGET%吐着小舌头的樱唇中漏出\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2344',
        any: [
          /^\s*PRINTFORMW 可爱的小屁股因为太多次的高潮而痉挛着、然而%SAVESTR:PLAYER%还是紧紧抓着%SAVESTR:TARGET%纤细的腰肢丝毫没有放过的意思。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2345',
        any: [
          /^\s*PRINTFORMW 「嗯嘿～…噫～啊啊～…%UNICODE\(0x2661\) \*1% 呀啊～啊～啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2347',
        any: [
          /^\s*PRINTFORMW 「够、够了吧！…用力插进来！…这样子吊着胃口什么的还不如…啊～…啊啊哈哈哈～%UNICODE\(0x2661\) \*1%」%SAVESTR:PLAYER%猛地尽根没入，强烈的快感让她像被电击一样弓起了背\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2347-2349',
        any: [
          /^\s*PRINTFORMW 「够、够了吧！…用力插进来！…这样子吊着胃口什么的还不如…啊～…啊啊哈哈哈～%UNICODE\(0x2661\) \*1%」%SAVESTR:PLAYER%猛地尽根没入，强烈的快感让她像被电击一样弓起了背\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2349',
        any: [/^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2351',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2352',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2353',
        any: [
          /^\s*PRINTFORMW 「啊啊～…要是人家的身体能在大一些的话…嗯嗯\.\.大一点的话…就能全部接受你的爱了的呢…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2354',
        any: [
          /^\s*PRINTFORMW 虽然这么说着，身材娇小的%SAVESTR:TARGET%的蜜穴也很浅、%SAVESTR:PLAYER%的肉棒只插入一半多就撞到了一块软肉。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2355',
        any: [
          /^\s*PRINTFORMW 「啊啊～…不用在意人家，尽量的插进来…啊啊～…按你喜欢的侵犯人家吧～%UNICODE\(0x2661\) \*1%」」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2357',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…嗯～…噫～…啊啊～！最深处也插进来%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2358',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2359',
        any: [
          /^\s*PRINTFORMW 「啊啊～…不行了…嗯～…好可怕…这么舒服什么的，人家会变成什么样子…啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2360',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓着%SAVESTR:TARGET%不让她逃走，肉棒像打桩机一样暴力的向肉穴注入着快感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2361',
        any: [
          /^\s*PRINTFORMW 「哈啊啊～…啊咕～…嗯～啊啊…被、被这样侵犯的话人家…人家会…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2363',
        any: [
          /^\s*PRINTFORMW 「变得奇怪了…要变得奇怪了…人家的小穴要变得奇怪惹（了）%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%双眼翻白，口齿不清的淫叫着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2364-2365',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…啊～…啊嗯～…唔嗯…穴口处被扑哧扑哧的磨蹭着…哈啊啊…好棒…嗯～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2365',
        any: [
          /^\s*PRINTFORMW 「哈啊～…啊～…啊嗯～…唔嗯…穴口处被扑哧扑哧的磨蹭着…哈啊啊…好棒…嗯～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2366',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TARGET%的穴口处像蜻蜓点水一样用龟头轻浅的抽插着。被快感淹没的%SAVESTR:TARGET%口中吐出了甜媚的娇声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2367',
        any: [
          /^\s*PRINTFORMW 「哈啊…呀…啊啊～…嗯～…嗯～…啊啊～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2369',
        any: [
          /^\s*PRINTFORMW 「啊啊…就这样…一下子插进去%UNICODE\(0x2661\) \*1% 让人家高潮吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2369-2371',
        any: [
          /^\s*PRINTFORMW 「啊啊…就这样…一下子插进去%UNICODE\(0x2661\) \*1% 让人家高潮吧%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2371',
        any: [/^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2373',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2374',
        any: [/^\s*PRINTFORMW 「啊～…嗯～…呼哈哈…啊嗯～…啊～…啊啊～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2375',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被从后面侵犯着吐出了呻吟声、膣内每次被侵犯，%SAVESTR:TARGET%的小屁股总是颤抖着紧紧勒住入侵者。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2376',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…哈啊…哈啊…啊呜～…嗯～…人家…喜欢这个姿势…啊啊～…好像被充满了啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2377',
        any: [/^\s*CFLAG:322 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2379',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2380',
        any: [/^\s*PRINTFORMW 「唔…咕～…啊啊…啊嗯～…嗯～嗯呼…呜呜～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2381',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被从后面侵犯着露出了痛苦的表情，不过却咬着嘴唇忍耐着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2382',
        any: [/^\s*PRINTFORMW 看来必须更加的开发啊………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2383',
        any: [/^\s*CFLAG:322 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2385',
        any: [/^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2386',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…不行…还很痛的说…嗯～…啊…啊啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2387',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被从后面侵犯着，不时漏出一声闷哼。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2388',
        any: [/^\s*PRINTFORMW 好像还没被开发出快感的样子………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2388-2392',
        any: [
          /^\s*PRINTFORMW 好像还没被开发出快感的样子………\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2388-2394',
        any: [
          /^\s*PRINTFORMW 好像还没被开发出快感的样子………\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2389',
        any: [/^\s*CFLAG:322 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2389-2396',
        any: [
          /^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;对面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2391-2396',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;对面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2398',
        any: [/^\s*IF SELECTCOM == 22\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2399',
        any: [/^\s*IF CFLAG:TARGET:323 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2401',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2403',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2404',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2405-2414',
        any: [
          /^\s*;爱慕\s*$\s*^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2406',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2407',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2409-2414',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2410',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2411-2416',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「啊啊～…啊嗯～…比想象的还要爽啊，这个…哈啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2415',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2416',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…比想象的还要爽啊，这个…哈啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2417',
        any: [
          /^\s*PRINTFORMW 抱着%SAVESTR:TARGET%抽插的%SAVESTR:player%感觉一个炽热的棒状物在胸腹间越变越大，膨大的尖端在脐间蹭出一条黏糊糊的水痕。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2418',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、抱歉啦，人家太兴奋了嘛…呀啊…不要掐它啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2420',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2421',
        any: [
          /^\s*PRINTFORMW 「啊啊、被这样抱着做…嗯～…啊…啊啊%UNICODE\(0x2661\) \*1% 好温暖呢…唔呼呼%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2422',
        any: [
          /^\s*PRINTFORMW %SAVESTR:player%感觉一个炽热的棒状物在胸腹间越变越大。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2423',
        any: [
          /^\s*PRINTFORMW 「啊、请、请不要在意…因为和亲爱的做实在太舒服了、哈啊…稍微变得兴奋过头呐%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2425-2426',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊…哈、啊啊啊…插到了好深的地方…嗯～…唔…咕～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2426',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈、啊啊啊…插到了好深的地方…嗯～…唔…咕～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2427',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对%SAVESTR:PLAYER%的肉棒有些承受不住的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2427-2429',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对%SAVESTR:PLAYER%的肉棒有些承受不住的样子………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2429-2430',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:323 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2430',
        any: [/^\s*CFLAG:323 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2430-2432',
        any: [
          /^\s*CFLAG:323 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2432-2435',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2435',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2436',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2437',
        any: [
          /^\s*PRINTFORMW 抱着%SAVESTR:TARGET%抽插的%SAVESTR:player%感觉一个炽热的棒状物在胸腹间越变越大。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2438',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…对不起啦%UNICODE\(0x2661\) \*1% 在你的肚子上擦来擦去太爽了所…啊啊～%UNICODE\(0x2661\) \*1%呀哈哈 饶了人家吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2439',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%听到%SAVESTR:TARGET%毫无诚意的道歉稍稍沉默了一会，然后猛地扣住了%SAVESTR:TARGET%的屁股开始快速抽插起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2441',
        any: [
          /^\s*PRINTFORMW 「噫嗯～%UNICODE\(0x2661\) \*1% 对不起…啊啊～…人家再也不恶作剧了…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2442',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2443',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%用单手禁锢%SAVESTR:TARGET%双臂猛烈的摆着腰。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2444',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊啊～…好爽…小穴好爽…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2445',
        any: [
          /^\s*PRINTFORMW 「啊啊～…更多…还想要更多的说…啊啊～…更多的插进来%UNICODE\(0x2661\) \*1%噫噫！肉棒不行！超敏感的所以咿呀啊啊啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2446',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的扶她肉棒被一只有力的手握住了，%SAVESTR:PLAYER%抓着%SAVESTR:TARGET%的双手不让她逃走，肉棒像打桩机一样暴力的向肉穴注入着快感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2448',
        any: [
          /^\s*PRINTFORMW 「要融掉了…小穴和肉棒都要溶掉了…啊啊～…这样好爽%UNICODE\(0x2661\) \*1% 好爽所以怎么样都好啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2449-2450',
        any: [/^\s*ELSE\s*$\s*^\s*IF CFLAG:16 >= 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2450',
        any: [/^\s*IF CFLAG:16 >= 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2451',
        any: [
          /^\s*PRINTFORMW 感动到极点的%SAVESTR:TARGET%狂乱的和%SAVESTR:PLAYER%舌吻着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2452',
        any: [
          /^\s*PRINTFORMW 「嗯呣…嗯～…噗啾…呼啊啊…啊啊～…要去了要去了要去了！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2453-2454',
        any: [
          /^\s*ENDIF\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%积极地扭动着腰品尝着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2454',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%积极地扭动着腰品尝着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2455',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…哈啊…%UNICODE\(0x2661\) \*1% 腰自己动起来…嘻嘻～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2456',
        any: [
          /^\s*PRINTFORMW 「全部…全都是你的错…人家的身体淫乱成这样都是…哈哈 肉棒%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2457',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被高潮快感浸泡的脑髓似乎只能吐出不成句的淫词了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2459',
        any: [
          /^\s*PRINTFORMW 「啊啊～…小穴不行…已经记住小鸡鸡的味道了…不…不行惹（了）%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2460-2461',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:323 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2461',
        any: [/^\s*CFLAG:323 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2463',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2464',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2465',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%柔软的身子贴了上来，下腹部的扶她阴茎却硬邦邦的撑在了中间。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2466',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯唔…人家的龟头和亲爱的腹部在接吻呢%UNICODE\(0x2661\) \*1% 啊啊～嗯～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2467',
        any: [
          /^\s*PRINTFORMW 就这样%SAVESTR:TARGET%淫靡的摇动着腰，随着扶她肉棒与%SAVESTR:PLAYER%腹肌的摩擦发出了阵阵勾人的轻喘。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2469',
        any: [
          /^\s*PRINTFORMW 「啊啊～…哈啊哈啊…啊啊～…好棒…小穴里面也舒服…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2470',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2471',
        any: [
          /^\s*PRINTFORMW 「嗯呼…哈嗯～…哈啊…啊啊…喜欢…喜欢…再多做一些…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2472',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%依恋的抱着%SAVESTR:PLAYER%，柔软的胸部摩擦着，湿润的唇瓣在%SAVESTR:PLAYER%的耳边一遍遍呢喃着「喜欢」「我爱你」。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2473',
        any: [
          /^\s*PRINTFORMW 「啊啊…哈啊…嗯啊～…好棒……啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2475',
        any: [
          /^\s*PRINTFORMW 「插到最里面来…啊啊～%UNICODE\(0x2661\) \*1%…这之上再进去的话…啊啊～%UNICODE\(0x2661\) \*1% 」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2477',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%娇憨的一次次向%SAVESTR:PLAYER%索吻着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2478-2479',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…从、从下面突然…啊嗯～…嗯～…不、不行%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2479',
        any: [
          /^\s*PRINTFORMW 「啊啊～…从、从下面突然…啊嗯～…嗯～…不、不行%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2480',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的下面遭到突袭、不禁眼神迷离的张开了嘴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2481',
        any: [
          /^\s*PRINTFORMW 「再、再更激烈的话…啊啊～…啊…哈啊～…嗯～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2483',
        any: [
          /^\s*PRINTFORMW 「不行、啊～哈啊～…嗯～！小穴要坏掉了…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2484-2485',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:323 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2485',
        any: [/^\s*CFLAG:323 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2487',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2488',
        any: [
          /^\s*PRINTFORMW 「啊啊～嗯～…嗯～…嗯～…啊啊～…这个…说不定也很舒服…嗯～啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2489',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%的腰一次次的向上突刺着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2490',
        any: [/^\s*PRINTFORMW 「啊啊～…嗯～…啊啊…哈…嗯～…啊啊～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2491',
        any: [/^\s*CFLAG:323 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2493',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2494',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊～…嗯～…还稍有有点难受…啊～…嗯～啊啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2495',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%紧紧抱住，从下面不断的侵犯着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2496',
        any: [/^\s*CFLAG:323 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2498',
        any: [/^\s*ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2499',
        any: [
          /^\s*PRINTFORMW 「哈、唔嗯…嗯…啊啊…好难过…请稍微手下留…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2500',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%侵犯着好像很痛苦的呻吟着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2501',
        any: [/^\s*CFLAG:323 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2501-2503',
        any: [/^\s*CFLAG:323 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2501-2505',
        any: [
          /^\s*CFLAG:323 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2501-2507',
        any: [
          /^\s*CFLAG:323 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2503-2508',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背面座位 CFLAG:324\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2510',
        any: [/^\s*IF SELECTCOM == 23\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2511',
        any: [/^\s*IF CFLAG:TARGET:324 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2513',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2515',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2516',
        any: [
          /^\s*PRINTFORMW 「咕哈～！…啊啊啊～…因为肉棒被撸着完全不痛呢～…啊哈哈～哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2517',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边大力套弄着%SAVESTR:TARGET%的扶她肉棒、一边一次次的用腰向上突刺蹂躏着刚破瓜的肉穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2518',
        any: [
          /^\s*PRINTFORMW 「再来…把人家的肉棒和小穴都玩坏吧…啊啊～…啊～…噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2520',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2521',
        any: [
          /^\s*PRINTFORMW 「唔呼呼～…嗯～…这样被抱着…好像小孩子一样呢～%UNICODE\(0x2661\) \*1% 呐~～…亲爱的就这样插进来～…啊啊～…哈呜～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2522',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像小孩子一样撒着娇，用软软的双手引导着%SAVESTR:PLAYER%的性器插入了自己的处女穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2523',
        any: [
          /^\s*PRINTFORMW 「啊啊～…人家的纯洁终于…%UNICODE\(0x2661\) \*1% 啊啊…已经…不行了…要去了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2525-2526',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嘎啊～…这么深的…明、明明是第一次的说… 咿呀啊～…那、那边不行！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2526',
        any: [
          /^\s*PRINTFORMW 「嘎啊～…这么深的…明、明明是第一次的说… 咿呀啊～…那、那边不行！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2527',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边抽动着一边大力套弄起%SAVESTR:TARGET%的扶她肉棒，让刚刚破瓜的%SAVESTR:TARGET%发出了苦闷的叫声\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2527-2529',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边抽动着一边大力套弄起%SAVESTR:TARGET%的扶她肉棒，让刚刚破瓜的%SAVESTR:TARGET%发出了苦闷的叫声\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2528-2533',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「呀唔～！…啊啊啊～…不要这样撸人家的肉棒啊～…啊～哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2532',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2533',
        any: [
          /^\s*PRINTFORMW 「呀唔～！…啊啊啊～…不要这样撸人家的肉棒啊～…啊～哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2534',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边大力套弄着%SAVESTR:TARGET%的扶她肉棒、一边一次次的用腰向上突刺蹂躏着娇小的肉穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2535',
        any: [
          /^\s*PRINTFORMW 「这样…太激烈了…啊啊～…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2537',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2538',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…哈啊…啊啊～%UNICODE\(0x2661\) \*1% 啊啊～…被这样触摸的话…人家啊嗯～…啊啊～…哈呜～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2539',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边大力套弄着%SAVESTR:TARGET%的扶她肉棒、一边轻柔的研磨着%SAVESTR:TARGET%的肉壁。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2540',
        any: [
          /^\s*PRINTFORMW 「啊啊～…这样好舒服…%UNICODE\(0x2661\) \*1% 啊啊…已经…不行了…要去了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2542-2543',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…这么深好难过…诶、稍微轻松点了呢… 谢咿呀啊～…那、那边不行！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2543',
        any: [
          /^\s*PRINTFORMW 「啊啊～…这么深好难过…诶、稍微轻松点了呢… 谢咿呀啊～…那、那边不行！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2544',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边抽动着一边大力套弄起%SAVESTR:TARGET%的扶她肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2545',
        any: [
          /^\s*PRINTFORMW 「嗯～…唔嗯～…已、已经～…啊啊～…不要啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2545-2547',
        any: [
          /^\s*PRINTFORMW 「嗯～…唔嗯～…已、已经～…啊啊～…不要啊………」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2547-2548',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:324 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2548',
        any: [/^\s*CFLAG:324 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2548-2550',
        any: [
          /^\s*CFLAG:324 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2550-2553',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2553',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2554',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2555',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边大力套弄着%SAVESTR:TARGET%的扶她肉棒、一边一次次的用腰向上突刺蹂躏着娇小的肉穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2556',
        any: [
          /^\s*PRINTFORMW 「啊嘿噫～%UNICODE\(0x2661\) \*1% 更多的玩弄人家的扶她肉棒吧%UNICODE\(0x2661\) \*1% 啊啊～…好爽～被撸肉棒好爽哦哦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2557',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被两方传来的快感刺激的两眼翻白、腰像折断一样激烈的向后仰着，带着没品的笑容发出了野兽般的叫声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2559',
        any: [
          /^\s*PRINTFORMW 「啊噫…咿…哈啊啊啊啊～…要去了…要去了！…人家的肉棒和肉穴要一起去了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2560',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2561',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…嗯啊…哈呜～… 啊啊啊…胸部也被侵犯了…啊啊～…%UNICODE\(0x2661\) \*1% 啊～…啊啊～猛地插上来了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2562',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%小小的身体被抱着、无数次的被粗大的阴茎向上穿刺着。轻软的身子脱力一般的摇晃着，头发从%SAVESTR:PLAYER%鼻尖擦过，散发出混着汗味的发香。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2563',
        any: [
          /^\s*PRINTFORMW 「啊啊～…哈啊啊…人家…人家…明明被这样干着…却超有感觉的说…噫哈哈～…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2565',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被完全开发的蜜穴把%SAVESTR:PLAYER%肉棒尽根吞吐着、仿佛无尽的快感在两人交合的性器间循环。………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2566-2567',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「在激烈一点…啊～…哈啊啊～%UNICODE\(0x2661\) \*1% 噫嗯～…咿～…啊嘿噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2567',
        any: [
          /^\s*PRINTFORMW 「在激烈一点…啊～…哈啊啊～%UNICODE\(0x2661\) \*1% 噫嗯～…咿～…啊嘿噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2568',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的双手从%SAVESTR:TARGET%的背后伸过来揉着敏感的乳肉。像要把%SAVESTR:TARGET%揉进自己身体里一样紧紧抱着，肉棒尽根没入。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2569',
        any: [
          /^\s*PRINTFORMW 「啊～…胸、连胸部也…啊嗯～%UNICODE\(0x2661\) \*1% 好舒服…再来…再来啊%UNICODE\(0x2661\) \*1% 啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2571',
        any: [
          /^\s*PRINTFORMW 「啊啊～…已…已经不行了～…小穴被搅动着…去了…去了～…去了～～～～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2571-2573',
        any: [
          /^\s*PRINTFORMW 「啊啊～…已…已经不行了～…小穴被搅动着…去了…去了～…去了～～～～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ENDIF\s*$\s*^\s*IF TEQUIP:57 && ABL:17 >= 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2573',
        any: [/^\s*IF TEQUIP:57 && ABL:17 >= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2574',
        any: [
          /^\s*PRINTFORMW 「人家的肉棒已经硬邦邦的了呢%UNICODE\(0x2661\) \*1% 啊啊～…肉棒是这样子插进来的啊…明明很害羞\.\.但是好爽啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2575',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着镜子里映出的自己的痴态兴奋起来了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2576-2577',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:324 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2577',
        any: [/^\s*CFLAG:324 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2579',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2580',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2581',
        any: [
          /^\s*PRINTFORMW 「噫呀～…还、还要…从后面这样摸…啊嗯～…啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2582',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从背后一边大力套弄着%SAVESTR:TARGET%的扶她肉棒、一边轻柔的研磨着%SAVESTR:TARGET%的肉壁。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2583',
        any: [
          /^\s*PRINTFORMW 「诶？…唔嗯、就是这样、从后面插进来同时玩弄人家的小鸡鸡的话…啊啊～%UNICODE\(0x2661\) \*1% 舒服过头了…马上就要去了\.\.呜%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2585',
        any: [
          /^\s*PRINTFORMW 「在、再继续下去的哈…啊啊～…两边都要去了…去了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2586',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2587',
        any: [
          /^\s*PRINTFORMW 「啊～…啊嗯～…嗯～…哈啊哈啊…哈啊啊～…这样突刺上来…好棒～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2588',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边被揉胸一边被从后面抽插着、发出了急促的喘息声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2589',
        any: [
          /^\s*PRINTFORMW 「啊、唔啊～…啊啊～…啊、啊啊哈～%UNICODE\(0x2661\) \*1% 更多的欺负人家…乳头也好那里也好小、小穴也呜%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2591',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被彻底开发的小穴滋咕兹咕的响着、感受着%SAVESTR:PLAYER%的肉棒给予的快乐………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2592-2593',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…被紧紧抱着感觉很好呢…啊嗯～…嗯～…啊啊…再来…甜甜蜜蜜的…让人家融化掉吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2593',
        any: [
          /^\s*PRINTFORMW 「啊啊～…被紧紧抱着感觉很好呢…啊嗯～…嗯～…啊啊…再来…甜甜蜜蜜的…让人家融化掉吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2594',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出了撒娇小猫一般的恍惚表情，被%SAVESTR:PLAYER%从后面侵犯着，发出了呼呼的甜美喉音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2595',
        any: [
          /^\s*PRINTFORMW 「哈啊啊…%UNICODE\(0x2661\) \*1% 真、真的要…变得离不开你了～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2597',
        any: [
          /^\s*PRINTFORMW 「嗯啊…啊～…嗯、就这样唷～%UNICODE\(0x2661\) \*1% 被亲爱的疼爱着呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2597-2599',
        any: [
          /^\s*PRINTFORMW 「嗯啊…啊～…嗯、就这样唷～%UNICODE\(0x2661\) \*1% 被亲爱的疼爱着呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ENDIF\s*$\s*^\s*IF TEQUIP:57 && ABL:17 >= 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2599',
        any: [/^\s*IF TEQUIP:57 && ABL:17 >= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2600',
        any: [
          /^\s*PRINTFORMW 「啊啊…人家的…勃起成这样了…轻轻碰一下的话\.哈啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2601',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着镜子里映出的自己的痴态兴奋起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2602-2603',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:324 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2603',
        any: [/^\s*CFLAG:324 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2605',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2606',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…嗯～…再来干我…干我啊…♪ 啊嗯～…唔啊…啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2607',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%自己摇动着腰贪求着快感。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2608',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊啊～…好深…啊啊～…就是这里…啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2609',
        any: [/^\s*CFLAG:324 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2611',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2612',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊啊～…摸得话倒是可以…嗯～…再温柔一点…呼啊…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2613',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从背后拥抱爱抚着，发出了叹息………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2614',
        any: [/^\s*CFLAG:324 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2616',
        any: [/^\s*ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2617',
        any: [
          /^\s*PRINTFORMW 「嗯～…好、好难受…哈啊～…在、在摸哪里啊…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2618',
        any: [/^\s*PRINTFORMW 「已、已经…够了吧…哈啊啊～…啊咕！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2619',
        any: [/^\s*CFLAG:324 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2619-2621',
        any: [/^\s*CFLAG:324 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2619-2623',
        any: [
          /^\s*CFLAG:324 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2620-2625',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;逆强奸 CFLAG:325\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2622-2625',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;逆强奸 CFLAG:325\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2628',
        any: [/^\s*IF SELECTCOM == 24\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2629',
        any: [/^\s*IF CFLAG:TARGET:325 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2631',
        any: [/^\s*IF TALENT:1 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2633',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2634',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、这样就算童真毕业了呢………这种时候应该说句谢谢吗？」%SAVESTR:TARGET%感受着被腔肉包裹的快感，露出了淘气的笑容\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2636',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2637',
        any: [
          /^\s*PRINTFORMW 「呼、人家的肉棒童贞也是魔王大人的东西了呢…啊啊～…好高兴！」%SAVESTR:TARGET%露出非常感动的表情，肉棒在腔内一跳一跳的，\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2639-2640',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唔…啊…插进女人的身体里…还是第一次…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2640',
        any: [
          /^\s*PRINTFORMW 「唔…啊…插进女人的身体里…还是第一次…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2641-2642',
        any: [/^\s*ENDIF\s*$\s*^\s*;非童贞\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2642-2644',
        any: [/^\s*;非童贞\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2645',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2646',
        any: [
          /^\s*PRINTFORMW 「啊啊～…你的肉穴里面…超级舒服的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2648',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2649',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…好棒…啊啊～…讨厌…这样下去很快就要在里面出来了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2651-2652',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…啊、没想到也有侵犯你的一天…嗯啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2652',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊、没想到也有侵犯你的一天…嗯啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2652-2654',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊、没想到也有侵犯你的一天…嗯啊～」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2654-2655',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:325 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2655',
        any: [/^\s*CFLAG:325 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2655-2657',
        any: [
          /^\s*CFLAG:325 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2657-2660',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:325 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2660',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:325 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2661',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…嗯～…啊啊～…没想到侵犯女人的身体是这么舒服的事情…嘿！嘿！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2662',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的口水啪嗒啪嗒的落在%SAVESTR:PLAYER%汗湿的裸背上、发出野兽一样的喘息从背后突刺着%SAVESTR:PLAYER%的阴户。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2663',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊啊～…肉穴最高！啊～…啊啊～…你的肉穴太舒服了…哈啊%UNICODE\(0x2661\) \*1% 啊啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2664',
        any: [/^\s*CFLAG:325 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2666',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:325 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2667',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊……更多的疼爱你吧、唔呼呼、把主导权让给人家的话…已经有觉悟了吧～啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2668',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%小恶魔般的轻笑着从%SAVESTR:PLAYER%身后激烈的侵犯着她。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2669',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…哈啊嗯～…你的膣内…好棒…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2670',
        any: [/^\s*CFLAG:325 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2672',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:0 >= 3 && \(CFLAG:325 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2673',
        any: [
          /^\s*PRINTFORMW 「哈啊～…苏浮啊…哈啊哈啊…嗯啊～…腰、停不下来…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2674',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抓着%SAVESTR:PLAYER%丰满的屁股像发情的狗一样激烈的动着腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2675',
        any: [/^\s*CFLAG:325 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2677',
        any: [/^\s*ELSEIF CFLAG:325 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2678',
        any: [
          /^\s*PRINTFORMW 「人家竟然把你侵犯了什么的…之前完全想不到～…啊啊～…呀啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2679',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被肉棒传来的激烈快感虏获，拼命地抽插着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2680',
        any: [/^\s*CFLAG:325 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2680-2682',
        any: [/^\s*CFLAG:325 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2680-2684',
        any: [
          /^\s*CFLAG:325 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2681-2686',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;逆肛门强奸 CFLAG:326\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2683-2686',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;逆肛门强奸 CFLAG:326\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2689',
        any: [/^\s*IF SELECTCOM == 25\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2690',
        any: [/^\s*IF CFLAG:TARGET:326 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2692',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2693',
        any: [
          /^\s*PRINTFORMW 「嗯～…哈呼…你的肛穴…紧紧地贴上来了…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2695',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2696',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、人家就不客气的进去了…啊～…好厉害…啊啊…人家的肉棒被紧紧的绞住…呀啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2698-2699',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「被人家侵犯肛门还会高兴什么的…你真的是…啊～…不要、吸得这么啊嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2699',
        any: [
          /^\s*PRINTFORMW 「被人家侵犯肛门还会高兴什么的…你真的是…啊～…不要、吸得这么啊嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2700-2701',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:326 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2701',
        any: [/^\s*CFLAG:326 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2701-2703',
        any: [
          /^\s*CFLAG:326 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2703-2706',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:326 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2706',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:326 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2707',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…哈啊～…你的屁股穴里超舒服%UNICODE\(0x2661\) \*1% 来吧来吧、更多地发出下流的声音%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2709',
        any: [
          /^\s*PRINTFORMW 「即使是男人、屁股被插的很舒服的话，叫出来也没关系唷%UNICODE\(0x2661\) \*1% 来吧来吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2710',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像强奸似的大力抽插着%SAVESTR:PLAYER%的肛门。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2711',
        any: [
          /^\s*PRINTFORMW 「咕噢%UNICODE\(0x2661\) \*1%…完美的吸上来了…哈啊～不妙、好像要上瘾了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2712',
        any: [/^\s*CFLAG:326 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2714',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:326 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2715',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、不会感到疼痛的…温柔的疼爱你吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2716',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像蛇一样妖艳的舔着嘴角，缓缓地开始侵犯%SAVESTR:PLAYER%的肛门。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2717',
        any: [
          /^\s*PRINTFORMW 「啊啊…人家也渐渐舒服起来了呢%UNICODE\(0x2661\) \*1% 呼啊啊~%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2719',
        any: [
          /^\s*PRINTFORMW 「呐~来嘛…无聊的自尊什么的丢掉后…你也能发出这么可爱的声音呢…唔呼呼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2720',
        any: [/^\s*CFLAG:326 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2722',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:0 >= 3 && \(CFLAG:326 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2723',
        any: [/^\s*PRINTFORMW 「好舒服…啊啊～…你的肛穴里面好舒服！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2724',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抓着%SAVESTR:PLAYER%丰满的屁股像发情的狗一样激烈的前后摆着腰。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2725',
        any: [/^\s*PRINTFORMW 「啊啊～…穴肉紧紧的绞着人家…啊啊嗯～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2727',
        any: [/^\s*PRINTFORMW 「来嘛来嘛…你也叫出声来！…啊～噫啊嗯～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2728',
        any: [/^\s*CFLAG:326 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2730',
        any: [/^\s*ELSEIF CFLAG:326 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2731',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…啊～…嗯～…你的肛门好棒…啊啊～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2733',
        any: [
          /^\s*PRINTFORMW 「明明长着男性器！肛门被挖着也有感觉了吗、唔呼呼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2734',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%拼命地动着腰，扶她肉棒在%SAVESTR:PLAYER%的肛门里进出着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2735',
        any: [/^\s*CFLAG:326 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2735-2737',
        any: [/^\s*CFLAG:326 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2735-2739',
        any: [
          /^\s*CFLAG:326 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2735-2741',
        any: [
          /^\s*CFLAG:326 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2737-2742',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;正常位肛交 CFLAG:327\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2744',
        any: [/^\s*IF SELECTCOM == 26\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2746',
        any: [/^\s*IF CFLAG:TARGET:327 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2748',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2749',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2750',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯哈啊～%UNICODE\(0x2661\) \*1% 屁股穴好舒服…肛穴性爱好棒%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2751',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%已经被开发的肛门像生物一样流着汁液吞吐着肉棒，发出了下流的声音………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2752-2753',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…人家的屁股穴…再、再插进来…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2753',
        any: [
          /^\s*PRINTFORMW 「啊啊～…人家的屁股穴…再、再插进来…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2754',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次肛交的肛门被%SAVESTR:PLAYER%的肉棒贯穿着，已经变成出色的淫肉了呢………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2754-2756',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次肛交的肛门被%SAVESTR:PLAYER%的肉棒贯穿着，已经变成出色的淫肉了呢………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2757',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2758',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2759',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊～…啊嗯～…屁股明明还是第一次的说…竟然变得这么舒服…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2760',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%已经被开发的肛门被侵犯着，充满爱欲的眼神望向了你………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2761-2762',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「就、就算是你…插进这里的话…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2762',
        any: [
          /^\s*PRINTFORMW 「就、就算是你…插进这里的话…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2763',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次肛交的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，让她接下来的话变成了一串呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2763-2765',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次肛交的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，让她接下来的话变成了一串呻吟………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（爱無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2765-2768',
        any: [
          /^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*IF ABL:3 >= 3\s*$\s*^\s*PRINTFORMW 「啊啊～…啊～…不可能…唔啊啊～…好…舒服…明明是那么脏的地方…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2767',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2768',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…不可能…唔啊啊～…好…舒服…明明是那么脏的地方…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2769',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被抽插着，不禁漏出了喘息声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2770-2771',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…那、那里很脏所以不行、明明说过了的…啊啊～！咕～…哈、插进来了…呜啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2771',
        any: [
          /^\s*PRINTFORMW 「啊～…那、那里很脏所以不行、明明说过了的…啊啊～！咕～…哈、插进来了…呜啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2772',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次肛交的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2772-2774',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次肛交的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2774-2775',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:327 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2775',
        any: [/^\s*CFLAG:TARGET:327 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2775-2777',
        any: [
          /^\s*CFLAG:TARGET:327 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2777-2780',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2780',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2781',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2782',
        any: [
          /^\s*PRINTFORMW 「呼啊…啊嗯～…啊啊～…啊哈啊～…%UNICODE\(0x2661\) \*1% 人家的扶她肉棒…因为屁股穴被抽插着兴奋起来了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2783',
        any: [
          /^\s*PRINTFORMW 就像%SAVESTR:TARGET%说的那样，肛门内侵犯的快感让%SAVESTR:TARGET%完全勃起了、马眼可爱的一开一合着吐出了粘液。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2784',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊啊～…再激烈一点…那样的话、呜，人家的屁股穴和肉棒就一起去了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2785-2786',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～…嗯哈啊～%UNICODE\(0x2661\) \*1% 屁股穴好赞…屁股小穴做爱超喜欢的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2786',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯哈啊～%UNICODE\(0x2661\) \*1% 屁股穴好赞…屁股小穴做爱超喜欢的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2787',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%已经被开发的肛门像生物一样流着口水吞吐着肉棒，发出了下流的声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2788',
        any: [
          /^\s*PRINTFORMW 「啊啊～…哈啊～…屁股小穴被撑大了…%UNICODE\(0x2661\) \*1% 把你的东西更多的插进来%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2789-2790',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:327 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2790',
        any: [/^\s*CFLAG:327 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2792',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2793',
        any: [
          /^\s*PRINTFORMW 「啊啊～…人家的屁股穴…插、插进来…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2794',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒深深地贯入%SAVESTR:TARGET%的肠道，让她小小的屁股痉挛着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2795',
        any: [/^\s*CFLAG:327 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2797',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2798',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2799',
        any: [
          /^\s*PRINTFORMW 「哈～…哈啊～…啊啊…后面被疼爱着…人家的肉棒变得这么精神了呢…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2800',
        any: [
          /^\s*PRINTFORMW 就像%SAVESTR:TARGET%说的那样，肠内侵犯的快感让%SAVESTR:TARGET%完全勃起了、马眼可爱的一开一合着吐出了粘液。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2801',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊～%UNICODE\(0x2661\) \*1%…亲爱的大肉棒更多噗滋噗滋的插进来…人家的阴核肉棒也要去了…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2802-2803',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…啊～…啊嗯～…后面做爱这么舒服的话…脏什么的随便啦…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2803',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊～…啊嗯～…后面做爱这么舒服的话…脏什么的随便啦…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2804',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被爱人干着肛门不禁露出了痴笑。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2805',
        any: [
          /^\s*PRINTFORMW 「呜啊～…啊啊～…你的亲亲肉棒…在肚子里面乱撞呢…哈%UNICODE\(0x2661\) \*3%！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2806-2807',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:327 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2807',
        any: [/^\s*CFLAG:327 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2809',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2810',
        any: [
          /^\s*PRINTFORMW 「还、还有点难受呢…啊啊～…很脏的说…啊～…啊呜！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2811',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2812',
        any: [/^\s*CFLAG:327 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2814',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2815',
        any: [
          /^\s*PRINTFORMW 「啊啊～…哈啊哈啊…嗯～…啊啊～…屁股被侵犯着…却觉得舒服什么的…啊哈啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2816',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发的肛门贪婪的吃着肉棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2817',
        any: [/^\s*CFLAG:327 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2819',
        any: [/^\s*ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2820',
        any: [
          /^\s*PRINTFORMW 「啊～…肚子好难过…啊～…停…不要再动了…啊～…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2821',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2822',
        any: [/^\s*CFLAG:327 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2822-2824',
        any: [/^\s*CFLAG:327 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2822-2826',
        any: [
          /^\s*CFLAG:327 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2822-2828',
        any: [
          /^\s*CFLAG:327 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2824-2829',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背后位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2831',
        any: [/^\s*IF SELECTCOM == 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2833',
        any: [/^\s*IF CFLAG:TARGET:328 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2835',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2836',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2837',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…啊～…呜啊啊～%UNICODE\(0x2661\) \*2%明明是第一次的说 从后面被干好舒服…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2838',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%纤细的腰被抓着、小巧的肛门被后面粗大的雄性器贯穿了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2839-2840',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…人家的屁股穴…插、插进来了…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2840',
        any: [
          /^\s*PRINTFORMW 「啊啊～…人家的屁股穴…插、插进来了…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2841',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒从后面挤进了%SAVESTR:TARGET%狭窄的肠道，让她发出了充满色欲的欢叫………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2841-2843',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒从后面挤进了%SAVESTR:TARGET%狭窄的肠道，让她发出了充满色欲的欢叫………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2844',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2845',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2846',
        any: [
          /^\s*PRINTFORMW 「啊啊～…肛门处女丧失…好舒服…啊～…哈啊啊～…更多的侵犯人家的肛门啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2847',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%纤细的腰被抓着、小巧的肛门被后面粗大的雄性器贯穿了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2848-2849',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「讨、讨厌…啊～…里面很脏的…啊啊～…哈呜、进来了…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2849',
        any: [
          /^\s*PRINTFORMW 「讨、讨厌…啊～…里面很脏的…啊啊～…哈呜、进来了…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2850',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒深深地贯入%SAVESTR:TARGET%的肠道，让她小小的屁股痉挛着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2850-2852',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒深深地贯入%SAVESTR:TARGET%的肠道，让她小小的屁股痉挛着………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（爱無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2852-2855',
        any: [
          /^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*IF ABL:3 >= 3\s*$\s*^\s*PRINTFORMW 「啊啊～…开始习惯了怎么办啊…啊啊～…屁股这么舒服的话…人家要变成变态了…哈啊哈啊…嗯～…啊嗯～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2854',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2855',
        any: [
          /^\s*PRINTFORMW 「啊啊～…开始习惯了怎么办啊…啊啊～…屁股这么舒服的话…人家要变成变态了…哈啊哈啊…嗯～…啊嗯～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2856',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱受开发的肛穴被从后面侵犯着，%SAVESTR:TARGET%甜美的喘息伴随着下流的“噗滋噗滋”开生始在房间里回荡………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2857-2858',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…啊啊～…屁、屁股那里不行…很脏的…哈啊～…唔咕！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2858',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…屁、屁股那里不行…很脏的…哈啊～…唔咕！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2859',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2859-2861',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2860-2862',
        any: [/^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2861-2866',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2862',
        any: [/^\s*CFLAG:TARGET:328 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2864-2867',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2867',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2868',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2869',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…啊～…肉棒在直肠里搅来搅去%UNICODE\(0x2661\) \*2% 再来！再从后面咕哩咕哩的玩弄人家的屁股穴啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2870',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%纤细的腰被从后面牢牢地固定着、粗大的肉棒带着黏腻的泡沫抽插着被撑成粉红肉环的菊门，不时发出好像放屁一样的淫猥声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2871',
        any: [
          /^\s*PRINTFORMW 「哈噫~%UNICODE\(0x2661\) \*1%…嘿…噫哈…肛门强暴最高…啊哈哈…耶噫%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%像狗一样趴跪着，带着下流的痴笑，双手比出了“V”字手势\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2872-2873',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%小小的身子被从后面抓着举了起来、像用飞机杯一样被大力抽插着肛门。她勃起的扶她肉棒上下摆动着，在自己肚子上甩出一条条白色的污渍\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2873',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%小小的身子被从后面抓着举了起来、像用飞机杯一样被大力抽插着肛门。她勃起的扶她肉棒上下摆动着，在自己肚子上甩出一条条白色的污渍\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2874',
        any: [
          /^\s*PRINTFORMW 「噢噢%UNICODE\(0x2661\) \*1% 屁股穴被插超级舒服…射出来、在里面射出来！…把人家的屁股穴变成精液飞机杯吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2875',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:TARGET%不知廉耻的大声浪叫中，%SAVESTR:PLAYER%的侵犯继续着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2875-2877',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:TARGET%不知廉耻的大声浪叫中，%SAVESTR:PLAYER%的侵犯继续着………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2877',
        any: [/^\s*CFLAG:328 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2879',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2880',
        any: [
          /^\s*PRINTFORMW 「啊啊～…人家的屁股穴…插、插进来…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2881',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒从后面挤进了%SAVESTR:TARGET%狭窄的肠道，让她发出了充满色欲的欢叫………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2882',
        any: [/^\s*CFLAG:328 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2884',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2885',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2886',
        any: [
          /^\s*PRINTFORMW 「啊啊～…屁股…好舒服…啊～…哈啊啊～…更多的疼爱人家的屁股吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2887',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱受开发的肛穴被从后面侵犯着，%SAVESTR:TARGET%甜美的喘息伴随着下流的“噗滋噗滋”开生始在房间里回荡。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2888',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊嗯～…啊～%UNICODE\(0x2661\) \*1% 啊啊～…啊～…不行～…不行了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2889-2890',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%饱受开发的肛穴被从后面激烈的侵犯着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2890',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱受开发的肛穴被从后面激烈的侵犯着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2891',
        any: [
          /^\s*PRINTFORMW 「噫…哈…太激烈了…被、被这样弄着的话…人家要变成屁股笨蛋了啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2892',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%撒娇的扭动着腰肢，%SAVESTR:PLAYER%的龟头被磨蹭着，剧烈的快感让%SAVESTR:PLAYER%不得不放慢了速度………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2892-2894',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%撒娇的扭动着腰肢，%SAVESTR:PLAYER%的龟头被磨蹭着，剧烈的快感让%SAVESTR:PLAYER%不得不放慢了速度………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2894',
        any: [/^\s*CFLAG:328 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2896',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2897',
        any: [
          /^\s*PRINTFORMW 「不、不行…啊～…很脏…啊啊～…不要插进那里…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2898',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%纤细的腰被抓着、小巧的肛门被后面粗大的雄性器贯穿了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2899',
        any: [/^\s*CFLAG:328 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2901',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2902',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊～…嗯～…啊啊～…屁股…好～…好、好棒～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2903',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的肉棒深深地贯入%SAVESTR:TARGET%的肠道，让她小小的屁股痉挛着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2904',
        any: [/^\s*CFLAG:328 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2906',
        any: [/^\s*ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2907',
        any: [/^\s*PRINTFORMW 「啊～…啊啊～…好疼…很脏的…哈啊～…唔咕！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2908',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2908-2912',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟…………\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2908-2914',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的肉棒贯穿了，不禁发出了痛苦的呻吟…………\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2909',
        any: [/^\s*CFLAG:328 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2909-2916',
        any: [
          /^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;对面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2911-2916',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;对面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2918',
        any: [/^\s*IF SELECTCOM == 28\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2920',
        any: [/^\s*IF CFLAG:TARGET:329 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2922',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2923',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2924',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊啊～…整根都进来了…啊啊～…超级舒服的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2925',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱经开发的肛门被侵犯着、大口喘息着抱紧了%SAVESTR:PLAYER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2926-2927',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…虽然有点难受…不过没关系…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2927',
        any: [
          /^\s*PRINTFORMW 「啊～…虽然有点难受…不过没关系…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2928',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了急促的喘息声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2928-2930',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了急促的喘息声………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2931',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2932',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2933',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…全部都进来了…哈啊啊～…好高兴、这边可以把亲爱的全部吞进来呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2934',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱经开发的肛门被侵犯着、大口喘息着抱紧了%SAVESTR:PLAYER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2935-2936',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…咕…呼、稍微有点辛苦呢…先不要动啦…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2936',
        any: [
          /^\s*PRINTFORMW 「啊～…咕…呼、稍微有点辛苦呢…先不要动啦…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2937',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的从下面贯穿了，不禁发出了痛苦的呻吟………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2937-2939',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的从下面贯穿了，不禁发出了痛苦的呻吟………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（爱無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2939-2942',
        any: [
          /^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*IF ABL:3 >= 3\s*$\s*^\s*PRINTFORMW 「啊啊…哈…啊啊…好舒服…肛门好舒服的说！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2941',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2942',
        any: [/^\s*PRINTFORMW 「啊啊…哈…啊啊…好舒服…肛门好舒服的说！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2943',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱经开发的肛门被侵犯着、大口喘息着抱紧了%SAVESTR:PLAYER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2944-2945',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…啊啊…好深～…呜呜～！啊啊～…哦…好痛苦……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2945',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊啊…好深～…呜呜～！啊啊～…哦…好痛苦……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2946',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2946-2948',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2948-2949',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:329 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2949',
        any: [/^\s*CFLAG:TARGET:329 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2949-2951',
        any: [
          /^\s*CFLAG:TARGET:329 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2951-2954',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2954',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2955',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2956',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊啊～…整根都进来了…啊啊～…超级舒服的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2957',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱经开发的肛门被侵犯着、大口喘息着抱紧了%SAVESTR:PLAYER%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2958',
        any: [
          /^\s*PRINTFORMW 「啊～%UNICODE\(0x2661\) \*1% 哈～%UNICODE\(0x2661\) \*1% 再来…更多的插进来…把人家的肛门小穴变成你肉棒的形状吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2958-2960',
        any: [
          /^\s*PRINTFORMW 「啊～%UNICODE\(0x2661\) \*1% 哈～%UNICODE\(0x2661\) \*1% 再来…更多的插进来…把人家的肛门小穴变成你肉棒的形状吧%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%勃起的扶她肉棒和小穴汩汩流出的爱液把下腹都打湿了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2960',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%勃起的扶她肉棒和小穴汩汩流出的爱液把下腹都打湿了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2961',
        any: [
          /^\s*PRINTFORMW 「看、变成这个样子全部都是你的原因哦…啊～…啊嗯～…%UNICODE\(0x2661\) \*1% 啊啊～…因为看到你的大肉棒、湿掉了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2962',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊嗯～…被你侵犯…人家真是幸福啊…啊～…哈啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2963-2964',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:329 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2964',
        any: [/^\s*CFLAG:329 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2966',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2967',
        any: [
          /^\s*PRINTFORMW 「啊～…虽然有点难受…不过没关系…哈啊～%UNICODE\(0x2661\) \*1% 嗯～…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2968',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2969',
        any: [/^\s*CFLAG:329 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2971',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2972',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2973',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…全部都进来了…哈啊啊～…好棒%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2974',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱经开发的肛门被侵犯着、发出了淫靡的水声，%SAVESTR:TARGET%不禁害羞的把头埋进了%SAVESTR:PLAYER%的怀里，从发丝中露出的耳朵都红了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2975',
        any: [
          /^\s*PRINTFORMW 「屁、屁股这么有感觉都是你的错啦…不许讨厌人家…啊～…啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2975-2977',
        any: [
          /^\s*PRINTFORMW 「屁、屁股这么有感觉都是你的错啦…不许讨厌人家…啊～…啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%勃起的扶她肉棒和小穴汩汩流出的爱液把下腹都打湿了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2977',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%勃起的扶她肉棒和小穴汩汩流出的爱液把下腹都打湿了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2978',
        any: [
          /^\s*PRINTFORMW 「啊啊～…好害羞…真是的…湿成这个样子、好像在说人家很好色一样…哈噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2979',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%坏笑着突然向上挺腰、被肉棒突袭的%SAVESTR:TARGET%发出了可爱的惊叫，一股浓厚的爱液从小穴里挤了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2980',
        any: [
          /^\s*PRINTFORMW 「哈啊～…讨厌…你真是坏心眼…不原谅、呜呜呜%UNICODE\(0x2661\) \*1%」生气的%SAVESTR:TARGET%像花栗鼠一样鼓起脸颊，被%SAVESTR:PLAYER%强硬的舌吻了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2981-2982',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:329 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2982',
        any: [/^\s*CFLAG:329 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2984',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2985',
        any: [
          /^\s*PRINTFORMW 「啊～…全部都进来了…咕、啊…啊啊～…被撑的太大啦…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2986',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%从下面贯穿着，发出了痛苦和快乐交杂的呻吟声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2987',
        any: [/^\s*CFLAG:329 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2989',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2990',
        any: [
          /^\s*PRINTFORMW 「哈啊～…啊嗯～…哈啊哈啊…啊～…好深…啊～…啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2991',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%饱经开发的肛门被侵犯着、大口喘息着抱紧了%SAVESTR:PLAYER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2992',
        any: [/^\s*CFLAG:329 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2994',
        any: [/^\s*ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2995',
        any: [
          /^\s*PRINTFORMW 「对不起…好痛苦…请饶了、啊～哈啊～…嗯咕～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2996',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%从下面贯穿着，发出了痛苦的呻吟声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2997',
        any: [/^\s*CFLAG:329 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2997-2999',
        any: [/^\s*CFLAG:329 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2997-3001',
        any: [
          /^\s*CFLAG:329 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2997-3003',
        any: [
          /^\s*CFLAG:329 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '2999-3004',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背面座位肛交 CFLAG:330\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3006',
        any: [/^\s*IF SELECTCOM == 29\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3008',
        any: [/^\s*IF CFLAG:TARGET:330 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3010',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3011',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3012',
        any: [
          /^\s*PRINTFORMW 「哈噫啊～…啊～…哈啊啊～…这个姿势好危险…不行…欺负肉棒不行…太有感觉了啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3013',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3014-3015',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咕唔…好深…好像直接插到脑袋里面惹%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3015',
        any: [
          /^\s*PRINTFORMW 「咕唔…好深…好像直接插到脑袋里面惹%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3016',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了色情的喘息声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3016-3018',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了色情的喘息声………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3019',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3020',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3021',
        any: [
          /^\s*PRINTFORMW 「这、这个刺激太强了…啊～…亲爱的…坏心眼…哈啊～…噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3022',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3023-3024',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「求你了…再温柔一点…啊啊～…哈呜…咕～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3024',
        any: [/^\s*PRINTFORMW 「求你了…再温柔一点…啊啊～…哈呜…咕～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3025',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了苦闷的呻吟声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3025-3027',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了苦闷的呻吟声………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（爱無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3027-3030',
        any: [
          /^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*IF ABL:3 >= 3\s*$\s*^\s*PRINTFORMW 「啊啊～…不行…一边撸着肉棒…哈啊～…一边侵犯着人家肛门什么的……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3029',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3030',
        any: [
          /^\s*PRINTFORMW 「啊啊～…不行…一边撸着肉棒…哈啊～…一边侵犯着人家肛门什么的……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3031',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3032-3033',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「果然还是不行…哈啊～…咕…呜呜呜」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3033',
        any: [/^\s*PRINTFORMW 「果然还是不行…哈啊～…咕…呜呜呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3034',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了苦闷的哼声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3034-3036',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了苦闷的哼声………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3036-3037',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:330 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3037',
        any: [/^\s*CFLAG:TARGET:330 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3037-3039',
        any: [
          /^\s*CFLAG:TARGET:330 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3039-3042',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3042',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3043',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3044',
        any: [
          /^\s*PRINTFORMW 「哈咿啊～…啊～…哈啊啊～…两边同时…不行…不行的说…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3045',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3046',
        any: [
          /^\s*PRINTFORMW 「要去了%UNICODE\(0x2661\) \*1% …一边咻咻射精着一边肛穴sex去了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3047-3048',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯～%UNICODE\(0x2661\) \*1% …啊～…啊啊啊～…啊…哈啊～…这样…被掰开的话…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3048',
        any: [
          /^\s*PRINTFORMW 「啊嗯～%UNICODE\(0x2661\) \*1% …啊～…啊啊啊～…啊…哈啊～…这样…被掰开的话…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3049',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%，把她的双腿大大分开、一次又一次向%SAVESTR:TARGET%的肛门突刺着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3050',
        any: [
          /^\s*PRINTFORMW 「全部被看见了%UNICODE\(0x2661\) \*1% …硬邦邦肉棒也好、小穴也好…全都被看到了…啊哈啊～…又去了！好像要疯掉一样去惹（了）%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3051-3052',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:330 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3052',
        any: [/^\s*CFLAG:330 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3054',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3055',
        any: [
          /^\s*PRINTFORMW 「咕唔…好深啊…脑袋里好像‘咚’得被顶了一下呢%UNICODE\(0x2661\) \*1%唔呼呼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3056',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了煽情的笑声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3057',
        any: [/^\s*CFLAG:330 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3059',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3060',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3061',
        any: [
          /^\s*PRINTFORMW 「这、这样太刺激了…啊～…哈啊～…噫%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3062',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3063',
        any: [
          /^\s*PRINTFORMW 「啊呜…%UNICODE\(0x2661\) \*1% 被魔王大人这样玩弄的话…哈啊～…要出来了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3064-3065',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯～…啊～…啊啊啊～…哈…哈啊～…这样…被掰开的话…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3065',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊～…啊啊啊～…哈…哈啊～…这样…被掰开的话…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3066',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%，把她双腿大大分开、一次又一次向%SAVESTR:TARGET%的肛门突刺着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3067',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊～…亲爱的想要的话、全部見看光光吧…人家的肉棒也好…那里也好…后、后面也好…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3068-3069',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:330 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3069',
        any: [/^\s*CFLAG:330 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3071',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3072',
        any: [/^\s*PRINTFORMW 「亲爱的…再温柔一点…啊啊～…哈呜…咕～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3073',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了苦闷的呻吟声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3074',
        any: [/^\s*CFLAG:330 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3076',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3077',
        any: [
          /^\s*PRINTFORMW 「啊啊～…不行…一边撸着肉棒…哈啊～…一边侵犯着人家肛门什么的……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3078',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被充分开发了的肛门和肉棒被同时玩弄着，让她发出了难耐的喘息声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3079',
        any: [
          /^\s*PRINTFORMW 「啊～…呜啊～…舒服过头…要疯掉了…哈啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3080',
        any: [/^\s*CFLAG:330 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3082',
        any: [/^\s*ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3083',
        any: [/^\s*PRINTFORMW 「果然还是有点…哈啊～…咕…辛苦…哈啊～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3084',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从下面贯穿着%SAVESTR:TARGET%的肛门让她发出了苦闷的哼声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3085',
        any: [/^\s*CFLAG:330 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3086-3087',
        any: [/^\s*ENDIF\s*$\s*^\s*;羞耻PLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3088',
        any: [/^\s*IF TEQUIP:57 && ABL:17 >= 1 && TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3089',
        any: [
          /^\s*PRINTFORMW 「明、明明是不要脸的事情…却移不开眼睛…啊嗯～…啊～…哈啊～…人家的屁股穴…被肉棒搅动的样子…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3090',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%喃喃自语着，看着镜中女子贪求肛穴快感的淫乱姿态，肉棒愈发坚挺了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3091',
        any: [/^\s*ELSEIF TEQUIP:57 && ABL:17 >= 1 && TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3092',
        any: [
          /^\s*PRINTFORMW 「啊～…啊哈啊～%UNICODE\(0x2661\) \*1% 肉棒已经硬成这样子了…啊嗯～…啊啊～屁股穴把大鸡巴完全吃掉了…呀啊～%UNICODE\(0x2661\) \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3093',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着镜中和自己相同外貌的淫乱女人，有些不敢置信的伸出手，却摸到了自己上翘的嘴角………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3094',
        any: [/^\s*ELSEIF TEQUIP:57\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3095',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着大镜子中自己双腿大开吞吐着雄性器的姿态、被肉欲烧酡红的脸上露出了微笑………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3095-3097',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着大镜子中自己双腿大开吞吐着雄性器的姿态、被肉欲烧酡红的脸上露出了微笑………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3095-3099',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着大镜子中自己双腿大开吞吐着雄性器的姿态、被肉欲烧酡红的脸上露出了微笑………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3095-3101',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着大镜子中自己双腿大开吞吐着雄性器的姿态、被肉欲烧酡红的脸上露出了微笑………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3097-3102',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3104',
        any: [/^\s*IF SELECTCOM == 30\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3106',
        any: [/^\s*IF CFLAG:TARGET:331 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3107',
        any: [/^\s*PRINTFORMW 「如何？人家可是每天用自己的肉棒练习的呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3108',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:PLAYER%的肉棒舔了舔嘴唇，娴熟的套弄了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3109',
        any: [/^\s*PRINTFORMW 「呐，舒服吗？舒服的话就点点头？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3110',
        any: [/^\s*PRINTFORMW 「嗯、那接下来就让你更舒服吧………♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3110-3114',
        any: [
          /^\s*PRINTFORMW 「嗯、那接下来就让你更舒服吧………♪」\s*$\s*^\s*CFLAG:TARGET:331 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3111',
        any: [/^\s*CFLAG:TARGET:331 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3114-3115',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＋侍奉精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3116',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3117',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3118',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…你的大肉棒…变得这么精神了…啊啊…让人家口水都流出来了呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3119',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%伸出舌尖，让一丝银亮的唾液浇在%SAVESTR:PLAYER%狰狞的龟头上。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3120',
        any: [
          /^\s*PRINTFORMW 「啊哈…人家的口水和你的先走汁混合在一起…非常美味的样子呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3121',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%套弄肉棒的动作渐渐激烈起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3122',
        any: [/^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3123-3124',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啾呜、就这样在人家的嘴巴里把精液咻咻的射出来%UNICODE\(0x2661\) \*1% 人家好想喝小宝宝牛奶…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3124',
        any: [
          /^\s*PRINTFORMW 「啾呜、就这样在人家的嘴巴里把精液咻咻的射出来%UNICODE\(0x2661\) \*1% 人家好想喝小宝宝牛奶…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3125',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满脸期待的将肉棒对准自己张开的嘴巴、是热的气息让%SAVESTR:PLAYER%被套弄的肉棒欢喜的抽搐着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3126',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、像这样被舔着射出来吗？还是要‘啊呜’的吞进去呢？…唔呼呼%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3127',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%浅吻一般轻啜马眼，坏心眼的轻柔套弄着问道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3129',
        any: [/^\s*CFLAG:331 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3129-3131',
        any: [/^\s*CFLAG:331 = 7\s*$\s*^\s*ENDIF\s*$\s*^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3132',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3133',
        any: [
          /^\s*PRINTFORMW 「大肉棒好热…被烫伤了…哈啊…哈啊…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3134',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%鼻息慌乱、不停套弄着%SAVESTR:PLAYER%的肉棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3135',
        any: [/^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3137',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3138',
        any: [
          /^\s*PRINTFORMW 「呐呐、慢慢做和一下弄出来你比较喜欢哪种？？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3139',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3140',
        any: [
          /^\s*PRINTFORMW 「………唔呼呼…那么慢慢的给你做…要充分品尝人家的手小穴哦？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3141',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的手以大概3秒1次的频率滑动着，羽毛般的指尖与其说刺激更像挑逗的把玩着肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3142',
        any: [
          /^\s*PRINTFORMW 积累的焦虑让%SAVESTR:PLAYER%不禁开始挺腰，察觉到爱人动作的%SAVESTR:TARGET%握紧手中的雄性器，停止了套弄。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3143',
        any: [
          /^\s*PRINTFORMW 「自己动起来是犯规哦%UNICODE\(0x2661\) \*1% 稍微忍耐下，慢慢的会让你舒服起来的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3144',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把%SAVESTR:PLAYER%膨大的龟头凑近鼻尖，轻轻地嗅着，继续缓缓套弄了起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3145-3146',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「………唔呼呼…一下子弄出来比较好吗…那、稍微拿出点真本事了哟%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3146',
        any: [
          /^\s*PRINTFORMW 「………唔呼呼…一下子弄出来比较好吗…那、稍微拿出点真本事了哟%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3147',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不轻不重的握住%SAVESTR:PLAYER%的肉棒，双手像演奏乐器一样套弄了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3148',
        any: [
          /^\s*PRINTFORMW 轻拢慢捻抹复挑、%SAVESTR:TARGET%感知着手中雄性器的搏动，微笑着加快了动作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3149',
        any: [
          /^\s*PRINTFORMW 「来吧、射出来~射出来~%UNICODE\(0x2661\) \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3149-3151',
        any: [
          /^\s*PRINTFORMW 「来吧、射出来~射出来~%UNICODE\(0x2661\) \*3%」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3151',
        any: [/^\s*CFLAG:331 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3153',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3154',
        any: [
          /^\s*PRINTFORMW 「来嘛来嘛…人家的手很舒服的哦。唔嗯、好热…握着这个的话让人家下面也…啊啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3155',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%‘哈斯哈斯’的喘着气套弄着%SAVESTR:PLAYER%的肉棒，酡红的小脸离龟头越来越近………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3156',
        any: [
          /^\s*PRINTFORMW 渐渐染上色欲的吐息拂上敏感的尖端、湿热温痒的感觉让%SAVESTR:PLAYER%不禁眯起了眼睛………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3157',
        any: [/^\s*CFLAG:331 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3159',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3160',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…侍奉你肉棒的方法…人家已经明白了哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3161',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边舔着嘴角一边灵活的套弄着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3162',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%哼着小调、一副很高兴的样子持续动着手腕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3163',
        any: [/^\s*CFLAG:331 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3165',
        any: [/^\s*ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3166',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、呐，打算用人家的手小穴出来几次呢？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3167',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边舔着嘴角一边套弄着%SAVESTR:PLAYER%的阴茎………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3167-3171',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边舔着嘴角一边套弄着%SAVESTR:PLAYER%的阴茎………\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3167-3173',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边舔着嘴角一边套弄着%SAVESTR:PLAYER%的阴茎………\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3168',
        any: [/^\s*CFLAG:331 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3168-3175',
        any: [
          /^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;口交 CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3170-3175',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;口交 CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3177',
        any: [/^\s*IF SELECTCOM == 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3179',
        any: [/^\s*IF CFLAG:TARGET:332 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3180',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…舔到自己以外肉棒的那一天什么的…被魔王大人抓到前从来没想过呢…咕噜（吞口水）」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3181',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%眼睛咕噜咕噜的上下打量着面前的男性器、凌乱的呼吸吹的%SAVESTR:PLAYER%阵阵发痒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3182',
        any: [
          /^\s*PRINTFORMW 「那、那么肉棒侍奉开始啦…啊…啊~嗯…嗯～…嗯嗉…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3183',
        any: [/^\s*PRINTFORMW 「啊啊…大肉棒…好好吃…♪（舔舔）………♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3183-3187',
        any: [
          /^\s*PRINTFORMW 「啊啊…大肉棒…好好吃…♪（舔舔）………♪」\s*$\s*^\s*CFLAG:TARGET:332 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3184',
        any: [/^\s*CFLAG:TARGET:332 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3186-3189',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋侍奉精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3189',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3190',
        any: [
          /^\s*PRINTFORMW 「呸啾…呸啾…肉棒好好次（吃）…嗯～…唔嗯～…%UNICODE\(0x2661\) \*1% 」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3191',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全把嘴当成了性器一样吞吐着阴茎、那副淫乱的光景，用‘口腔侍奉’来形容都有些稍显不足。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3192',
        any: [
          /^\s*PRINTFORMW 「嗯噗…在人家的嘴巴小穴里…全部射出来…人家…还想要更过（多）的说%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3193',
        any: [/^\s*CFLAG:332 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3195',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3196',
        any: [
          /^\s*PRINTFORMW 「啊呣…嗯～…嗯~呼噗…唔唔…啾…啾啵…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3197',
        any: [
          /^\s*PRINTFORMW 看来%SAVESTR:TARGET%相当兴奋的样子，%SAVESTR:PLAYER%默默地忍耐着敏感部数次被牙齿咬到的痛楚，盘算着第10次的话就给她点颜色看看。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3198',
        any: [
          /^\s*PRINTFORMW 「嗯噗…呼！…呼哈…啾噜…啾噗…（舔来舔去）…噗哈%UNICODE\(0x2661\) \*1%」%SAVESTR:TARGET%完全没有感到危机，像幼犬一样开心的吞舔着肉棒\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3199',
        any: [/^\s*CFLAG:332 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3201',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3202',
        any: [
          /^\s*PRINTFORMW 「（舔舔）…（舔舔）%UNICODE\(0x2661\) \*1% 哈啊哈啊%UNICODE\(0x2661\) \*1% 嗯啾…呸噜…唔呼…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3203',
        any: [
          /^\s*PRINTFORMW 「还不可以出来哟？ 接下来还要做更多舒服的事情对吧…呐？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3204',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%轻舔着嘴角，期待着%SAVESTR:PLAYER%接下来的命令………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3205',
        any: [/^\s*CFLAG:332 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3207',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3208',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…（舔舔）…（舔舔）…嗯～…哈嗯～…这样子怎么样呢？主人様…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3209',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%结束了一轮口舌侍奉后腼腆的抬起了头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3210',
        any: [/^\s*CFLAG:332 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3212',
        any: [/^\s*ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3213',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊呣…嗯～…哈嗯～…！哈啊…嗯～…哈嗯～…咳咳…啊啊…十分抱歉、我还不太熟练……咳嗯～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3214',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为生疏的动作呛到了自己，猛烈的咳嗽了起来。然而调整状态后还是热心的舔起了%SAVESTR:PLAYER%的阴茎………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3214-3218',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为生疏的动作呛到了自己，猛烈的咳嗽了起来。然而调整状态后还是热心的舔起了%SAVESTR:PLAYER%的阴茎………\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3214-3220',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为生疏的动作呛到了自己，猛烈的咳嗽了起来。然而调整状态后还是热心的舔起了%SAVESTR:PLAYER%的阴茎………\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3215',
        any: [/^\s*CFLAG:332 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3215-3222',
        any: [
          /^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;乳交 CFLAG:333　贫乳じゃないと動かないんですけお\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3217-3222',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;乳交 CFLAG:333　贫乳じゃないと動かないんですけお\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3224',
        any: [/^\s*IF SELECTCOM == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3226',
        any: [/^\s*IF CFLAG:TARGET:333 == 0 && TALENT:TARGET:109\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3227',
        any: [
          /^\s*PRINTFORMW 「看过了人家的胸部以后还要人家做这种事什么的…你果然是个了不得的变态呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3228',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些吃惊的叹了口气，然后努力推挤着自己小小的胸部试着夹住那炽热的雄性器。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3229',
        any: [/^\s*PRINTFORMW 「说、说不舒服什么的就揍你哦………！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3230',
        any: [/^\s*CFLAG:TARGET:333 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3230-3232',
        any: [
          /^\s*CFLAG:TARGET:333 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3232-3235',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋侍奉精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\) && TALENT:TARGET:109\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3235',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\) && TALENT:TARGET:109\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3236',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3237',
        any: [
          /^\s*PRINTFORMW 「看…不是好好射出来了嘛…%UNICODE\(0x2661\) \*1% 唔？人家是贫乳所以感觉硬硬的？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3238',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%有点不满的撅起了嘴。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3239',
        any: [
          /^\s*PRINTFORMW 「哼、那人家就拿出真本事、让你把人家的胸部整个涂成白色吧，嘿咻%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3240',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抓住跳动的肉棒，用自己小小的乳头对准敏感的里筋发起了特攻………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3241-3242',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯呼……啊哈…哈啊…%UNICODE\(0x2661\) \*1% 唔呼呼、肉棒整个变得湿漉漉了呢…接下来就用人家的胸部…嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3242',
        any: [
          /^\s*PRINTFORMW 「嗯呼……啊哈…哈啊…%UNICODE\(0x2661\) \*1% 唔呼呼、肉棒整个变得湿漉漉了呢…接下来就用人家的胸部…嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3243',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用垂下来的唾液当做润滑剂、努力挺起小小的胸部，摩擦着%SAVESTR:PLAYER%的肉棒尖端。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3244',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…%UNICODE\(0x2661\) \*1% 嗯～…哈啊～…好棒…%UNICODE\(0x2661\) \*1% 呐、如果承认你也很舒服的话让你主动也可以哟？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3245',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%蛊惑的笑着，继续抓住龟头在自己柔软的乳肉上打着圈………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3246-3247',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:333 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3247',
        any: [/^\s*CFLAG:333 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3249',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\) && TALENT:TARGET:109\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3250',
        any: [
          /^\s*PRINTFORMW 「啊～…啊嗯～…你的肉棒…和乳头蹭来蹭去…好舒服的说…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3251',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些失神的微张着嘴，一丝口水从嘴角垂下，掉在了她贫薄的乳肌上………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3252',
        any: [/^\s*CFLAG:333 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3254',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\) && TALENT:TARGET:109\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3255',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊啊…不要盯着看…勉、勉强用这样的胸部来做什么的，很让人害羞啦………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3256',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3257',
        any: [
          /^\s*PRINTFORMW 正如她所说的，%SAVESTR:TARGET%从侍奉一开始就满脸通红的样子，害羞的好像要哭出来了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3258',
        any: [
          /^\s*PRINTFORMW 「真是的…到底是为了谁才这个样子的啊～…咦、变得这么大了吗…哼，和坏心眼的嘴不同，亲爱的这边很老实呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3259-3260',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唔呼呼、看到人家这么努力的样子…你也感觉舒服起来了吧…嗯～…嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3260',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、看到人家这么努力的样子…你也感觉舒服起来了吧…嗯～…嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3261',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边努力用贫薄的胸部侍奉着，一边用湿润的眼神看了过来。%SAVESTR:PLAYER%感觉心中嗜虐的部分被点燃了\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3262',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…讨厌啦，突然这么粗暴的欺负胸部什么的…呀啊%UNICODE\(0x2661\) \*1%」%SAVESTR:PLAYER%用要把乳头顶进去的气势猛烈的进攻着\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3263-3264',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:333 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3264',
        any: [/^\s*CFLAG:333 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3266',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\) && TALENT:TARGET:109\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3267',
        any: [/^\s*PRINTFORMW 「总觉得、渐渐抓到窍门了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3268',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸染红晕，继续用自己小小的胸部侍奉着肉棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3269',
        any: [/^\s*CFLAG:333 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3271',
        any: [
          /^\s*ELSEIF  \(CFLAG:333 <= 1 \|\| FLAG:7 == 2\) && TALENT:TARGET:109\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3272',
        any: [/^\s*PRINTFORMW 「这、这样怎样？………呐、变得舒服了吗？………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3273',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用渐渐变硬的乳头小心的摩擦着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3274',
        any: [/^\s*CFLAG:333 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3274-3276',
        any: [/^\s*CFLAG:333 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3274-3278',
        any: [
          /^\s*CFLAG:333 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3274-3280',
        any: [
          /^\s*CFLAG:333 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3276-3281',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;股间性交 CFLAG:334\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3283',
        any: [/^\s*IF SELECTCOM == 33\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3285',
        any: [/^\s*IF CFLAG:TARGET:334 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3286',
        any: [/^\s*PRINTFORMW 「这、这样…果然有点害羞…啊～…啊～…嗯～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3287',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%脸染红晕，开始了股间侍奉。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3288',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肉棒已经变的硬邦邦的了、随着腰的动作，尖端一次次的擦在自己的肚皮上，让她发出了难耐的哼声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3289',
        any: [/^\s*CFLAG:TARGET:334 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3289-3291',
        any: [
          /^\s*CFLAG:TARGET:334 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3292-3293',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱\+处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3294',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3295',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%两脚并拢、自己抓着已经翘的老高的肉棒，吞着口水看着%SAVESTR:PLAYER%的龟头在腿心间滑进滑出的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3296',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊～…哈啊嗯～%UNICODE\(0x2661\) \*1% 咕噜…大肉棒被人家的蜜汁弄得湿漉漉的，看起来更可口了呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3297',
        any: [
          /^\s*PRINTFORMW 「所以呐…吃掉也可以吧？ 用人家的处女穴啾~啾的吞下去也可以吧%UNICODE\(0x2661\) \*2%？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3298',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%‘kukuku’的坏笑着摇了摇头、催促着%SAVESTR:TARGET%继续用大腿侍奉，%SAVESTR:TARGET%只好眼泪汪汪的再次磨蹭了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3299',
        any: [
          /^\s*PRINTFORMW 「坏心眼…坏心眼的说…啊啊…但是这么舒服的事情、呜、停不下来…啊～…哈啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3300',
        any: [/^\s*CFLAG:334 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3302',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3303',
        any: [
          /^\s*PRINTFORMW 「啊…啊啊…%UNICODE\(0x2661\) \*1% 明明想要肉棒狠狠捅进来的说！只这样子蹭来蹭去要变得奇怪了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3304',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%“哈啊哈啊”地用大腿和阴唇激烈的摩擦着肉棒。股间充血到极限的扶她肉棒也一抖一抖地，甩出的先走汁把肚脐都打湿了………。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3305',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…哈啊～…人家的肉棒根部也被蹭着…啊～…啊啊～…要、要去了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3306',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%也差不多快要到极限了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3307',
        any: [/^\s*CFLAG:334 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3309',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3310',
        any: [
          /^\s*PRINTFORMW 「啊…啊嗯～%UNICODE\(0x2661\) \*1% …哈…啊啊…人家…已经…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3311',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%还是处女的蜜穴在%SAVESTR:PLAYER%的肉棒上来回摩擦，持续着名为“股间性交”的侍奉。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3312',
        any: [
          /^\s*PRINTFORMW 不知道摩擦了多少次，%SAVESTR:TARGET%的腿心和%SAVESTR:PLAYER%的肉棒上早已经湿滑一片了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3313',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…哈啊～…人家…要变得奇怪了…要变得奇怪了啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3314',
        any: [/^\s*CFLAG:334 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3316',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3317',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…嗯呼～……人、人家…哈啊～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3318',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边持续着股间侍奉，一边把肉棒在%SAVESTR:PLAYER%的肚子上蹭来蹭去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3319',
        any: [
          /^\s*PRINTFORMW 「啊啊…怎么会这么舒服…%UNICODE\(0x2661\) \*1% 不行惹~要射出来了…呐呐~人家待会会用舌头全部舔干净的…就这么射精出来也可以吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3320',
        any: [
          /^\s*PRINTFORMW 「噗、一副呆呆的样子呢…哈啊～…啊～…哈啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3321',
        any: [/^\s*CFLAG:334 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3323',
        any: [/^\s*ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3324',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊～…啊啊～…已、已经…饶了人家吧……啊嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3325',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%小小的屁股来回耸动着，一生悬命的侍奉着%SAVESTR:PLAYER%的肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3326',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%嘴里说着“嗯，那就给你加加油吧”，一边用手握住了她敏感的龟头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3327',
        any: [/^\s*PRINTFORMW 「咿呀！恶、恶作剧不行！…啊～…啊嗯～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3328',
        any: [/^\s*CFLAG:334 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3328-3330',
        any: [/^\s*CFLAG:334 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3328-3332',
        any: [
          /^\s*CFLAG:334 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3328-3334',
        any: [
          /^\s*CFLAG:334 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3330-3335',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;骑乘位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3337',
        any: [/^\s*IF SELECTCOM == 34\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3339',
        any: [/^\s*IF CFLAG:TARGET:335 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3341',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3343',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3345',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3346',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用一只手掰开蜜穴、另一只手撸动着自己的阴茎。自己分开双腿向着肉棒沉下了腰、向%SAVESTR:PLAYER%献上了处女。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3347',
        any: [
          /^\s*PRINTFORMW 「唔～…嗯～…啊啊～…进来了…啊啊～…啊～…呜呜…%UNICODE\(0x2661\) \*1% 魔力涌进来了…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3348',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%仰着头，背上的翅膀绷得笔直、从张得大大地嘴巴里面可以看到漂亮的紫色舌头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3349',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…啊～%UNICODE\(0x2661\) \*1%…哈啊哈啊…啊啊、这样子人家…哈哈、更加…更进一步的成为你的所有物了呢…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3350',
        any: [
          /^\s*PRINTFORMW 破瓜的痛楚还残留着%SAVESTR:TARGET%就迫不及待的动起了腰肢，用痉挛的蜜穴开始品尝%SAVESTR:PLAYER%的肉棒了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3351-3352',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…嗯～…哈啊～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3352',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…哈啊～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3353',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%仿佛没感到疼痛一样发出了娇声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3354',
        any: [
          /^\s*PRINTFORMW 「啊～…啊嗯～…因为…第一次…给了你嘛…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3355',
        any: [
          /^\s*PRINTFORMW 「还想更多的感觉肉棒…小穴里面越来越舒服了…%UNICODE\(0x2661\) \*1% 所以说…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3356',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些笨拙的上下扭着腰、贪寻着快乐………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3356-3358',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些笨拙的上下扭着腰、贪寻着快乐………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3359',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3361',
        any: [/^\s*IF TALENT:TARGET:314 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3362',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…嗯啊…唔嗯、看这里、你的东西被人家吞进去的样子…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3363',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%缓缓的放下了腰、%SAVESTR:PLAYER%的肉棒随之一点点的深入了那个紧窄的粉红色淫腔。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3364',
        any: [
          /^\s*PRINTFORMW 途中感觉到了疼痛吧，%SAVESTR:TARGET%蹙了蹙眉，然后，以决死的气势一下放掉了脚部的力量。一气贯通的激痛让%SAVESTR:TARGET%背上的双翼‘啪唰’地绷直了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3365',
        any: [
          /^\s*PRINTFORMW 「咔哈～！咕…呜呜～！………啊啊…和你…魔力相连的感觉就是这样吗…哈啊～…哈…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3366',
        any: [
          /^\s*PRINTFORMW 「十、十分抱歉、再稍微等一下下…一定、呜、会让你舒服起来的…啊～…嗯～啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3367',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%咬着嘴唇，无视疼痛痉挛着的腔肉开始慢慢动起了腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3368-3369',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咕…唔…啊啊…哈…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3369',
        any: [/^\s*PRINTFORMW 「咕…唔…啊啊…哈…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3370',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛叫出了声。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3371',
        any: [
          /^\s*PRINTFORMW 「人、人家…没关系的、…只是终于成了你的所有物…太开心了………」一边拭去眼泪，一边说道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3372',
        any: [
          /^\s*PRINTFORMW 「所以说…（抽泣）…马上就让你舒服起来…哈、嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3373',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%听到了这番话，坏笑着抓住了她的腰，然后，猛烈地耸动了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3374',
        any: [
          /^\s*PRINTFORMW 「咿呜！啊、笨、笨蛋…真的…这么激烈…哈啊～…啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3374-3376',
        any: [
          /^\s*PRINTFORMW 「咿呜！啊、笨、笨蛋…真的…这么激烈…哈啊～…啊～！」\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（爱無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3377-3378',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…啊～…啊嗯～…稍、稍微等下…还有点…害怕的说…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3378',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊～…啊嗯～…稍、稍微等下…还有点…害怕的说…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3379',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%跨坐在%SAVESTR:PLAYER%身上，抬起腰部将膨大的龟头轻轻对准了穴口，她的手微微颤抖着，因为恐惧踌躇不前。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3380',
        any: [
          /^\s*PRINTFORMW 然而等得不耐烦的%SAVESTR:PLAYER%抓住了她纤细的腰肢一口气压到了底。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3381',
        any: [
          /^\s*PRINTFORMW 「啊～…噫…咔啊～！………啊～…咕～…呜啊啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3382',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜痛的连呼吸都断断续续、大颗的泪珠不断从眼角滚落。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3383',
        any: [
          /^\s*PRINTFORMW 「哈、嘎…请、稍灰（微）…等一下…………呜呜呜～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3383-3385',
        any: [
          /^\s*PRINTFORMW 「哈、嘎…请、稍灰（微）…等一下…………呜呜呜～」\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3384-3389',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:76 == 1\s*$\s*^\s*PRINTFORMW 「唔呼呼、把你吃掉吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3388',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3389',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、把你吃掉吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3390',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%舔着唇角，将%SAVESTR:PLAYER%的肉棒塞进了小穴的最深处，缓缓的扭起了腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3392',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3393',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊～…嗯～…大肉棒太有精神了、插不进去…啊～…进~来了…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3394',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%慢慢的沉下腰、品味着%SAVESTR:PLAYER%的肉棒研磨腔壁的快感………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3396-3397',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～…啊啊…这个姿势稍微有点害羞呢…啊～嗯～…哈、全部…进来了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3397',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊啊…这个姿势稍微有点害羞呢…啊～嗯～…哈、全部…进来了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3398',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰部生硬的开始上下运动………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3398-3400',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰部生硬的开始上下运动………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3398-3402',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的腰部生硬的开始上下运动………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3400-3405',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋V感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3401',
        any: [/^\s*CFLAG:TARGET:335 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3404-3405',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＋V感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3406',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:2 >= 3 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3407',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3408',
        any: [
          /^\s*PRINTFORMW 随着%SAVESTR:TARGET%腰部上上下下的运动，她股间的肉棒也‘啪嗒啪嗒’跳动着。看起来蛮有趣的。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3409',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊～…啊啊～…%UNICODE\(0x2661\) \*1% 唔呼呼、你的肉棒太厉害了，让人家也变得这么精神了呢%UNICODE\(0x2661\) \*1% 呜、龟头好爽～%UNICODE\(0x2661\) \*1% 啊～喔喔～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3410',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%更激烈的动着腰，硬邦邦的扶她肉棒在空气中划出奇怪的轨迹，好像在跳什么淫猥的舞蹈、‘咕啪咕啪’的下流声音在二人的交合部分回响着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3411',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…哈啊啊～…啊～…好棒～…你的肉棒好舒服%UNICODE\(0x2661\) \*2%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3412',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3413',
        any: [
          /^\s*PRINTFORMW 「哈啊～…嗯～…啊啊～…鸡巴好棒…%UNICODE\(0x2661\) \*1% 啊嗯～…啊～…啊哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3414',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%扭动着腰肢，用敏感的花心研磨着%SAVESTR:PLAYER%的肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3415',
        any: [
          /^\s*PRINTFORMW 「已经上瘾了…对着这里再沉下去一点的话%UNICODE\(0x2661\) \*1% 啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3417',
        any: [
          /^\s*PRINTFORMW 然后%SAVESTR:TARGET%高声娇呼叫着展开了恶魔的翅膀。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3418',
        any: [
          /^\s*PRINTFORMW 「这下子…要好好负起让人家肉棒中毒的责任啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3419',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3420',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…哈啊～…哈、好爽…在更多突上来…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3421',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被从下面无数次的突刺着。娇小的身体跳舞一样晃动着漏出快乐的声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3423',
        any: [
          /^\s*PRINTFORMW 然后%SAVESTR:TARGET%被肉棒突刺着展开了恶魔的翅膀。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3424',
        any: [
          /^\s*PRINTFORMW 「啊嗯～…啊啊～%UNICODE\(0x2661\) \*1% 啊啊～…人家…脑袋…脑袋已经变成笨蛋了…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3425',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的小腹高高鼓起，绷紧的皮肤下仿佛能看到%SAVESTR:PLAYER%肉棒的形状、仿佛大脑中插入肉欲，强烈的快感让她发出了痴笑………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3426-3427',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%纤细的腰肢抓住，不让她逃走一般激烈的征伐着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3427',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%纤细的腰肢抓住，不让她逃走一般激烈的征伐着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3428',
        any: [
          /^\s*PRINTFORMW 「哈噫…咿…啊啊啊%UNICODE\(0x2661\) \*1% 嗯～、強烈…%UNICODE\(0x2661\) \*1% 啊、啊哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3429',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%忘情的大喊大叫着。已经完全变成%SAVESTR:PLAYER%的自动肉玩具了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3430',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…小穴…要变成肉棒的形状了～…啊～…啊啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3430-3432',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…小穴…要变成肉棒的形状了～…啊～…啊啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3432',
        any: [/^\s*CFLAG:335 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3434',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:2 >= 3 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3435',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3436',
        any: [
          /^\s*PRINTFORMW 随着%SAVESTR:TARGET%腰部上上下下的运动，她股间的肉棒也‘啪嗒啪嗒’跳动着。看起来蛮有趣的。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3437',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊嗯～…啊～…唔呼呼～%UNICODE\(0x2661\) \*1% …嗯～…啊～…在、在盯着哪里看啊…讨厌…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3438',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对%SAVESTR:PLAYER%恶趣味的视线报以娇嗔，腰的动作却更加激烈了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3439',
        any: [
          /^\s*PRINTFORMW 「很、很害羞的啦…不要太盯着看…啊～…噫呀～…突然顶上来什么的不行～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3440',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3441',
        any: [
          /^\s*PRINTFORMW 「啊～…啊嗯～…嗯～…咕～…哈啊哈啊…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3442',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%扭动着腰肢，用敏感的花心品味着%SAVESTR:PLAYER%的肉棒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3443',
        any: [
          /^\s*PRINTFORMW 「哈啊～…你的大肉棒插到最深的地方来了…咕…好棒～…哈啊～好舒服%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3445',
        any: [
          /^\s*PRINTFORMW 然后%SAVESTR:TARGET%高声娇叫着展开了恶魔的翅膀。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3446',
        any: [
          /^\s*PRINTFORMW 那是巧妙的运用自己娇小身体的优势榨取快感的完美小恶魔姿态………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3447',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3448',
        any: [
          /^\s*PRINTFORMW 「啊～…啊～…嗯～…啊嗯～%UNICODE\(0x2661\) \*1% 那、那样向上顶腰不行%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3449',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从%SAVESTR:TARGET%的身下不停的突刺着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3450',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯呼～…啊～…啊呜～…嗯～…太厉害了…人家要坏掉了呜…啊～…嗯～…啊哈～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3451',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像巨浪中的小船一样在%SAVESTR:PLAYER%身上舞蹈着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3452-3453',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「停…啊～…哈啊～！好激烈…继续的话…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3453',
        any: [
          /^\s*PRINTFORMW 「停…啊～…哈啊～！好激烈…继续的话…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3454',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%纤细的腰肢抓住，不让她逃走一般激烈的侵犯着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3455',
        any: [
          /^\s*PRINTFORMW 「不、不行～…哈啊～…哈啊～…真的要变奇怪了…哈啊～…啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3457',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一脸不堪征伐的样子，用尾巴缠住%SAVESTR:PLAYER%的大腿，讨好的摩挲着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3458',
        any: [
          /^\s*PRINTFORMW 然而%SAVESTR:PLAYER%完全无视%SAVESTR:TARGET%的软语相求继续彻底的侵犯着她………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3458-3460',
        any: [
          /^\s*PRINTFORMW 然而%SAVESTR:PLAYER%完全无视%SAVESTR:TARGET%的软语相求继续彻底的侵犯着她………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3460',
        any: [/^\s*CFLAG:335 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3462',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3463',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3464',
        any: [
          /^\s*PRINTFORMW 「哈啊～…嗯～…呜啊…啊啊…好舒服…喔…啊嗯～…啊…啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3465',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%从%SAVESTR:TARGET%的身下不停的突刺着、%SAVESTR:TARGET%的喉咙里漏出了甜美的呻吟声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3466',
        any: [/^\s*PRINTFORMW 「哈啊…噢…啊嗯～…嗯～…这个…好爽…好棒哦！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3467-3468',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊哈…哈啊…唔呼呼～…接下来让你也舒服起来呢…啊嗯～…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3468',
        any: [
          /^\s*PRINTFORMW 「啊哈…哈啊…唔呼呼～…接下来让你也舒服起来呢…啊嗯～…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3469',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%扭动着腰肢，用敏感的花心顶着%SAVESTR:PLAYER%的肉棒细细的研磨着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3470',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊～…哈啊哈啊…啊～…啊啊～…人、人家…腰停不下来了…咿…啊～…啊啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3470-3472',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊～…哈啊哈啊…啊～…啊啊～…人、人家…腰停不下来了…咿…啊～…啊啊啊～」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3472',
        any: [/^\s*CFLAG:335 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3474',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3475',
        any: [
          /^\s*PRINTFORMW 「哈～…哈啊～…嗯～…啊啊啊～…啊～…呜呜～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3476',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%从下面不断的侵犯着%SAVESTR:PLAYER%、让她的体重完全压在粗长的肉棒上………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3477',
        any: [/^\s*CFLAG:335 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3479',
        any: [/^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3480',
        any: [
          /^\s*PRINTFORMW 「不论做过几次，这个姿势还是很羞人啊…嗯～…啊～…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3481',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些僵硬的开始上下动起了腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3481-3485',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些僵硬的开始上下动起了腰………\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3481-3487',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%有些僵硬的开始上下动起了腰………\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3482',
        any: [/^\s*CFLAG:335 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3482-3489',
        any: [
          /^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;全身擦洗 CFLAG:336\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3484-3489',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;全身擦洗 CFLAG:336\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3491',
        any: [/^\s*IF SELECTCOM == 35\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3493',
        any: [/^\s*IF CFLAG:TARGET:336 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3494',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、如何？感觉舒服了吗？………实际上人家可是感觉很棒呢…啊啊…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3495',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%很舒服的眯起了眼睛，用柔软的身体作为洗具，清洁着%SAVESTR:PLAYER%的全身。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3496',
        any: [
          /^\s*PRINTFORMW 「啊啊…做了这样的事情…下面也变得湿漉漉的了呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3497',
        any: [/^\s*CFLAG:TARGET:336 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3497-3499',
        any: [
          /^\s*CFLAG:TARGET:336 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3499-3502',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋侍奉精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3502',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3503',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…哈啊～…这么舒服的洗法\.\.人家的沐浴乳也要出来了呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3504',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用双腿紧紧地夹着%SAVESTR:PLAYER%的身体、用满是泡沫小屁股和扶她肉棒在%SAVESTR:PLAYER%腹部来回蹭着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3505',
        any: [
          /^\s*PRINTFORMW 「哈啊～…接下来…人家就这样射出来也可以吧？ 在你的肚脐上、把人家的肉棒沐浴乳biubiu的射出来一大堆%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3506',
        any: [
          /^\s*PRINTFORMW 「不要那样子嘛…射完了人家会好好地弄干净的…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3507',
        any: [/^\s*CFLAG:336 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3509',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3510',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊啊…喜欢…喜欢你哦…%UNICODE\(0x2661\) \*1% 呐、有没有觉得哪里痒呢？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3511',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%很开心的一边笑着一边温柔的用指尖擦洗着%SAVESTR:PLAYER%的耳内、温热的吐息吹的你有些不自在。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3512',
        any: [
          /^\s*PRINTFORMW 「啊哈～…亲爱的这里是弱点呢…啊啊…哈啊…唔呼呼………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3513',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的两腿缠绕着%SAVESTR:PLAYER%的腰身、那娇小的胴体像顶级的白绸织物一般在%SAVESTR:PLAYER%的身体上滑动着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3514',
        any: [/^\s*CFLAG:336 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3516',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3517',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、有没有哪里觉得痒呢？ 想让你变得更舒服的说………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3518',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边说一边仔细的清洗着%SAVESTR:PLAYER%的身体。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3519',
        any: [
          /^\s*PRINTFORMW 小小的身体柔软而灵巧的摩擦着%SAVESTR:PLAYER%带来阵阵快感、然而她股间的硬挺的肉棒也在%SAVESTR:PLAYER%身上戳来戳去………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3520',
        any: [/^\s*CFLAG:336 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3522',
        any: [/^\s*ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3523',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊啊…舒服吗…呐啊、你也感觉很舒服嘛？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3524',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边说一边仔细的清洗着%SAVESTR:PLAYER%的身体。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3525',
        any: [
          /^\s*PRINTFORMW 小小的身体柔软而灵巧的摩擦着%SAVESTR:PLAYER%带来阵阵快感、然而她股间的硬挺的肉棒也在%SAVESTR:PLAYER%身上戳来戳去………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3526',
        any: [/^\s*CFLAG:336 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3526-3528',
        any: [/^\s*CFLAG:336 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3526-3530',
        any: [
          /^\s*CFLAG:336 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3526-3532',
        any: [
          /^\s*CFLAG:336 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3528-3533',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;骑乘位アナル CFLAG:337\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3535',
        any: [/^\s*IF SELECTCOM == 36\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3537',
        any: [/^\s*IF CFLAG:TARGET:337 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3539',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3540',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3541',
        any: [
          /^\s*PRINTFORMW 「啊…啊啊…啊哈哈～…接下来你的大肉棒就要被人家的肛门穴吃掉了喔%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3542',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发过的肛门轻易地吞进了%SAVESTR:PLAYER%的阴茎………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3543-3544',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呜…嗯～…果然还是有点勉强呢…哈啊～…啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3544',
        any: [/^\s*PRINTFORMW 「呜…嗯～…果然还是有点勉强呢…哈啊～…啊～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3545',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%眉头微蹙，慢慢的用肛门把%SAVESTR:PLAYER%的阴茎吞进去了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3545-3547',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%眉头微蹙，慢慢的用肛门把%SAVESTR:PLAYER%的阴茎吞进去了………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3548',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3549',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3550',
        any: [
          /^\s*PRINTFORMW 「啊啊～…自己放进去…什么的…太H了…啊～…呜～…后、后面…啊啊～被撑开了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3551',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发过的肛门轻易地吞进了%SAVESTR:PLAYER%的阴茎………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3552-3553',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～…进、进来了…啊～…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3553',
        any: [/^\s*PRINTFORMW 「嗯～…进、进来了…啊～…哈啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3554',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全没有意识到，自己毫不抗拒用肛门性交这件事，把%SAVESTR:PLAYER%的阴茎深深埋入了湿热的肠道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3554-3556',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全没有意识到，自己毫不抗拒用肛门性交这件事，把%SAVESTR:PLAYER%的阴茎深深埋入了湿热的肠道………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外（爱無し）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3556-3559',
        any: [
          /^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*IF ABL:3 >= 3\s*$\s*^\s*PRINTFORMW 「呼嗯…唔～…嗯～…啊啊～…全部…进来了…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3558',
        any: [/^\s*IF ABL:3 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3559',
        any: [
          /^\s*PRINTFORMW 「呼嗯…唔～…嗯～…啊啊～…全部…进来了…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3560',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发过的肛门轻易地吞进了%SAVESTR:PLAYER%的阴茎………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3561-3562',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…自己来…把肉棒吞进去什么的…唔…咕…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3562',
        any: [
          /^\s*PRINTFORMW 「啊～…自己来…把肉棒吞进去什么的…唔…咕…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3563',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全没有意识到，自己毫不抗拒用肛门性交这件事，把%SAVESTR:PLAYER%的阴茎深深埋入了湿热的肠道………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3563-3565',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全没有意识到，自己毫不抗拒用肛门性交这件事，把%SAVESTR:PLAYER%的阴茎深深埋入了湿热的肠道………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3565-3566',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:337 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3566',
        any: [/^\s*CFLAG:TARGET:337 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3566-3568',
        any: [
          /^\s*CFLAG:TARGET:337 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3568-3571',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3571',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3572',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3573',
        any: [
          /^\s*PRINTFORMW 「嗯哈啊啊～…肛门穴SEX好棒…超舒服的说%UNICODE\(0x2661\) \*1%」」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3574',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%激烈舞动的腰肢贪求着肛门性交的快感、栗色的半长发一绺一绺的黏在额头，发出淫靡的汗香。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3575',
        any: [
          /^\s*PRINTFORMW 「变得这么舒服的话…哈啊～…更多…更多的肉棒…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3576',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用力扭动小蛮腰，紧窄的肠穴绞榨着肉棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3577-3578',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊…哈啊…啊哈哈～…接下来你的肉棒要被人家的小肛穴吃掉啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3578',
        any: [
          /^\s*PRINTFORMW 「啊…哈啊…啊哈哈～…接下来你的肉棒要被人家的小肛穴吃掉啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3579',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发过的肛门轻易地吞进了%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3580',
        any: [
          /^\s*PRINTFORMW 「嗯～…插进来以后很高兴的一跳一跳呢…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3581',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%仿佛不愿让你拔走一样收紧腔肉，一脸满足的品味着%SAVESTR:PLAYER%的肉棒………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3582-3583',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:337 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3583',
        any: [/^\s*CFLAG:337 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3585',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3586',
        any: [
          /^\s*PRINTFORMW 「啊啊啊…后面…你全部插进来了\.\.呜%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3587',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的菊门被侵犯者发出了欢愉的叫声………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3588',
        any: [/^\s*CFLAG:337 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3590',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3591',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3592',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊～…这、这么顶腰不行…%UNICODE\(0x2661\) \*1% 嗯～…阴蒂肉棒的前列腺被顶到了呀…！～哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3593',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%向上突刺着、一下下冲击着%SAVESTR:TARGET%的肛性器。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3594',
        any: [
          /^\s*PRINTFORMW 「哈、哈嘿噫…嘿嘿…哈啊～…啊嗯～%UNICODE\(0x2661\) \*1% 屁、屁股穴要坏掉惹…请、原谅窝…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3595-3596',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…自己来动…什么的…太H了啦…啊～…嗯～…后面…啊啊～被撑大了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3596',
        any: [
          /^\s*PRINTFORMW 「啊啊～…自己来动…什么的…太H了啦…啊～…嗯～…后面…啊啊～被撑大了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3597',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发过的肛门轻易地吞进了%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3598',
        any: [
          /^\s*PRINTFORMW 「哈嘶～哈啊～…哈啊～…屁股穴…比前面还要舒服…啊～…啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3599-3600',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:337 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3600',
        any: [/^\s*CFLAG:337 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3602',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3603',
        any: [/^\s*PRINTFORMW 「啊啊～…好、大呢…果然还…咕～…唔唔～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3604',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%忍耐着肛门内强烈的异物感、一点点试着动起了腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3605',
        any: [/^\s*CFLAG:337 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3607',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3608',
        any: [
          /^\s*PRINTFORMW 「啊～哈啊～！嗯～…感觉…舒服起来了…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3609',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被开发过的肛门像嘴巴一样吞吐着%SAVESTR:PLAYER%的阴茎、%SAVESTR:TARGET%努力忍耐着快感………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3610',
        any: [/^\s*CFLAG:337 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3612',
        any: [/^\s*ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3613',
        any: [/^\s*PRINTFORMW 「啊～…嗯～…唔唔…咕～…哈啊哈啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3614',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%忍耐着肛门内强烈的异物感、一点点试着动起了腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3615',
        any: [/^\s*CFLAG:337 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3615-3617',
        any: [/^\s*CFLAG:337 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3615-3619',
        any: [
          /^\s*CFLAG:337 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3615-3621',
        any: [
          /^\s*CFLAG:337 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3617-3622',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;肛门侍奉 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3624',
        any: [/^\s*IF SELECTCOM == 37\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3626',
        any: [/^\s*IF CFLAG:TARGET:338 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3627',
        any: [
          /^\s*PRINTFORMW 「人家、虽然很讨厌脏兮兮的东西…不过没、没办法啦…嗯～…嗯～…（舔舔）…呜、奇怪的味道」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3627-3631',
        any: [
          /^\s*PRINTFORMW 「人家、虽然很讨厌脏兮兮的东西…不过没、没办法啦…嗯～…嗯～…（舔舔）…呜、奇怪的味道」\s*$\s*^\s*CFLAG:TARGET:338 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3628',
        any: [/^\s*CFLAG:TARGET:338 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3630-3633',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋侍奉精神Lv5\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3633',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3634',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…屁股好好吃%UNICODE\(0x2661\) \*1% 唔呼呼、连里面也帮你变得干净吧%UNICODE\(0x2661\) \*1% （舔舔）…啾呜%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3635',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边发出下品的声音一边和%SAVESTR:PLAYER%的肛门深吻着、柔软的舌头温柔的爱抚着肠壁上的褶皱。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3636',
        any: [
          /^\s*PRINTFORMW 「啊哈、哔咕哔咕得抖的好厉害呢、还想要更多嘛？唔呼呼%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3637',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好色的瞳孔里渐渐染上了浓重的淫欲。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3638',
        any: [
          /^\s*PRINTFORMW 「想要的话什么时候说都可以哦…人家会全力侍奉你的…啊啊…啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3639',
        any: [/^\s*CFLAG:338 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3641',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3642',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…你的后面…也很美味呢…别露出那种眼神嘛…（舔舔）虽然味道有点怪怪的…但是人家最喜欢了，啾叭%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3643',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一脸幸福的对着肛门发起了温柔而猛烈的攻势。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3644',
        any: [
          /^\s*PRINTFORMW 「啊啊…在哔咕哔咕的发抖呢…你也感觉很舒服吗…好开心%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3645',
        any: [/^\s*CFLAG:338 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3647',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3648',
        any: [/^\s*PRINTFORMW 「嗯噗…呋…哈啊…啾呜…（舔舔）…咕啾…啾………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3649',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双眸湿润的将舌头深入%SAVESTR:PLAYER%的肛门，专注的侍奉着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3650',
        any: [/^\s*CFLAG:338 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3652',
        any: [/^\s*ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3653',
        any: [
          /^\s*PRINTFORMW 「为什么要我做这种事啦…嗯～…嗯啾…哈啊…（舔舔）………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3654',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边碎碎念着开始了对%SAVESTR:PLAYER%肛门的侍奉………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3654-3658',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边碎碎念着开始了对%SAVESTR:PLAYER%肛门的侍奉………\s*$\s*^\s*CFLAG:338 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3654-3660',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边碎碎念着开始了对%SAVESTR:PLAYER%肛门的侍奉………\s*$\s*^\s*CFLAG:338 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3655',
        any: [/^\s*CFLAG:338 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3655-3662',
        any: [
          /^\s*CFLAG:338 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;打屁股 CFLAG:341\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3657-3662',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;打屁股 CFLAG:341\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3664',
        any: [/^\s*IF SELECTCOM == 40\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3666',
        any: [/^\s*IF CFLAG:TARGET:341 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3667',
        any: [
          /^\s*PRINTFORMW 「呀啊～！不要…疼～…好疼的！住手快住手啦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3668',
        any: [/^\s*CFLAG:TARGET:341 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3668-3670',
        any: [
          /^\s*CFLAG:TARGET:341 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3671-3672',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＋受虐狂～気Lv3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3673',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3674',
        any: [
          /^\s*PRINTFORMW 「哈呜  嗯~%UNICODE\(0x2661\) \*1% 再用力点～用力的抽人家的屁股啊…被打肿的地方热热的好舒服呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3675',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%妩媚的抚摸着身上红肿的指印，摇动着小屁股向你发出了邀请。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3676',
        any: [
          /^\s*PRINTFORMW 随着那可爱的小屁股一次次的被抽打%SAVESTR:TARGET%的肉棒前端渗出了透明的液体。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3677',
        any: [
          /^\s*PRINTFORMW 「噫哈…啊啊～…啊啊～…再多打几下，要、要去了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3678',
        any: [/^\s*CFLAG:TARGET:341 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3680',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3681',
        any: [
          /^\s*PRINTFORMW 「哈啊…啊啊…被亲爱的打了…啊嗯～…哈嗯…麻麻胀胀的呢…啊～…哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3682',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一脸幸福的回望着你，用双手向你捧起自己的翘臀、%SAVESTR:PLAYER%饶有兴味的看着上面慢慢变红的指印。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3683',
        any: [
          /^\s*PRINTFORMW 随着那可爱的小屁股一次次的被抽打%SAVESTR:TARGET%的肉棒前端渗出了透明的液体\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3684',
        any: [/^\s*CFLAG:TARGET:341 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3686',
        any: [
          /^\s*ELSEIF MARK:0 == 3 && MARK:2 == 3 && \(CFLAG:341 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3687',
        any: [
          /^\s*PRINTFORMW 「咕哈…呜…呜啊！啊～…停、停下来…不要再打了…啊…呜呜！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3688',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的屁股被大力抽打着，然而只能发出悲鸣忍耐着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3689',
        any: [/^\s*CFLAG:TARGET:341 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3691',
        any: [/^\s*ELSEIF CFLAG:341 <= 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3692',
        any: [
          /^\s*PRINTFORMW 「不要…不要啊～…很痛的什么才不要啊！啊…啊啊～…咿！咿呀！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3693',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%被打得大声哭闹着………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3694',
        any: [/^\s*CFLAG:TARGET:341 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3694-3696',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3694-3698',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3694-3700',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3696-3701',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;鞭 CFLAG:342\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3703',
        any: [/^\s*IF SELECTCOM == 41\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3705',
        any: [/^\s*IF CFLAG:TARGET:342 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3706',
        any: [
          /^\s*PRINTFORMW 「不…不要啦…用鞭子抽什么的是玩笑吧…一点也不\.\.咿！…啊～…啊啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3707',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%手中的鞭子无慈悲的咬上%SAVESTR:TARGET%的肌肤，在上面留下了刺目的痕迹………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3708',
        any: [/^\s*CFLAG:TARGET:342 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3708-3710',
        any: [
          /^\s*CFLAG:TARGET:342 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3710-3713',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋受虐狂～気Lv5以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3713',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3714',
        any: [
          /^\s*PRINTFORMW 「哈噫%UNICODE\(0x2661\) \*1%  人家是坏孩子的说…啊嗯～%UNICODE\(0x2661\) \*1% 所以请更多的惩罚人家…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3715',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被鞭子抽打着发出了开心的叫声、完全是一副受虐狂牝犬的脸了啊。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3716',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%股间流下的爱液和前列腺液在地上积起了小小的水洼………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3717',
        any: [/^\s*CFLAG:TARGET:342 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3719',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3720',
        any: [
          /^\s*PRINTFORMW 「啊啊嗯～%UNICODE\(0x2661\) \*1%…啊、啊嗯～%UNICODE\(0x2661\) \*1% 哈啊哈啊…感、感觉什么的才没有呢～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3721',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%尽管这么说着却一脸潮红的扭动着身子，期待下一鞭的到来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3722',
        any: [/^\s*CFLAG:TARGET:342 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3724',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:342 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3725',
        any: [
          /^\s*PRINTFORMW 「明明说要做舒服的事情…会痛的我才不要呢！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3726',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%发出了悲鸣、%SAVESTR:PLAYER%无视她继续鞭打着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3727',
        any: [/^\s*CFLAG:TARGET:342 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3729',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3730',
        any: [
          /^\s*PRINTFORMW 「噫～…啊嗯～…啊啊嗯～…哈啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3731',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%随着鞭子落下一声声的娇喘着、股間的爱液和前列腺液混在一起，顺着大腿流到了地上。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3732',
        any: [
          /^\s*PRINTFORMW 「再多抽几下啦%UNICODE\(0x2661\) \*1%…是亲爱的想要的话，人家被怎么样都很开心呢…啊嗯～…啊啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3733',
        any: [/^\s*CFLAG:TARGET:342 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3735',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3736',
        any: [
          /^\s*PRINTFORMW 「啊啊…好痛…明明很痛的…被你抽的话…人家…却痛得好舒服…哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3737',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%随着鞭子落下一声声的娇喘着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3738',
        any: [
          /^\s*PRINTFORMW 「啊嘿…噫…哈嗯～%UNICODE\(0x2661\) \*1% 啊啊…接下来是屁股吗…啊嗯～嗯哈～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3739',
        any: [/^\s*CFLAG:TARGET:342 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3741',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:342 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3742',
        any: [
          /^\s*PRINTFORMW 「不、不要…就算是你我也不要啦…啊～…哈啊～…咿！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3743',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%无视她继续无慈悲的鞭打着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3744',
        any: [/^\s*CFLAG:TARGET:342 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3746',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:342 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3747',
        any: [
          /^\s*PRINTFORMW 「哈啊～…嗯～…啊…感觉兴奋起来了…这里也…抽一下…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3748',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的鞭击一下下的落下，%SAVESTR:TARGET%的腰部随着鞭打淫乱的扭动着。那下流的姿势仿佛再邀请着抽打她一样。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3749',
        any: [
          /^\s*PRINTFORMW 「明明被鞭子抽着…啊啊…人家…这样好奇怪…哈啊%UNICODE\(0x2661\) \*1%！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3750',
        any: [/^\s*CFLAG:TARGET:342 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3752',
        any: [/^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3753',
        any: [
          /^\s*PRINTFORMW 「不要～…会痛的不要！住手…请住手啊！…啊咕…咿！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3754',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%的鞭子无慈悲的一下下抽打着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3755',
        any: [/^\s*CFLAG:TARGET:342 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3755-3757',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3755-3759',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3755-3761',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3757-3762',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;针 CFLAG:343\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3764',
        any: [/^\s*IF SELECTCOM == 42\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3766',
        any: [/^\s*IF CFLAG:TARGET:343 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3767',
        any: [
          /^\s*PRINTFORMW 「哪、哪怕是我…也是怕针扎的…啊～…哈啊～…呜呜～哈啊～！……好痛啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3768',
        any: [/^\s*CFLAG:TARGET:343 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3768-3770',
        any: [
          /^\s*CFLAG:TARGET:343 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3770-3773',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋受虐狂～気Lv5以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3773',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3774',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头在细针的欺凌下尖立了，她发出野兽般的叫声…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3775',
        any: [
          /^\s*PRINTFORMW 「喔～再来！啊～…啊～…好……好棒～！啊啊啊～…要、要去啦…………！！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3776',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的股间，已经爱液泛滥了……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3777',
        any: [/^\s*CFLAG:TARGET:343 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3779',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3780',
        any: [
          /^\s*PRINTFORMW 「啊啊～…唔……哦～～%UNICODE\(0x2661\) \*1% 再、再这样的话……啊啊哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3781',
        any: [
          /^\s*PRINTFORMW 被针扎着的%SAVESTR:TARGET%，嘴里发出了含糊不清的喘息…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3782',
        any: [/^\s*CFLAG:TARGET:343 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3784',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:343 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3785',
        any: [
          /^\s*PRINTFORMW 「呜呜…不要不要不要不要啊…啊～…啊啊～…呜啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3786',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%享受着%SAVESTR:TARGET%的悲鸣，用力地拿针扎她…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3787',
        any: [/^\s*CFLAG:TARGET:343 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3789',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3790',
        any: [
          /^\s*PRINTFORMW 「这、这里被针刺的话…啊、啊啊～…唔唔～噢！………啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3791',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头在细针的欺凌下尖立了，只见她星目半闭，发出了艳丽的喘息…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3792',
        any: [/^\s*CFLAG:TARGET:343 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3794',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3795',
        any: [
          /^\s*PRINTFORMW 「唔…噢…痛～…好痛…啊啊～！嗯～！啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3796',
        any: [
          /^\s*PRINTFORMW 被针扎着的%SAVESTR:TARGET%，嘴里发出了含糊不清的喘息…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3797',
        any: [/^\s*CFLAG:TARGET:343 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3799',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:343 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3800',
        any: [
          /^\s*PRINTFORMW 「不要…不要…求你了…不要做让我痛苦的事啊…唔喔！…啊～啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3801',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%享受着%SAVESTR:TARGET%的悲鸣，用力地拿针扎她…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3802',
        any: [/^\s*CFLAG:TARGET:343 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3804',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:343 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3805',
        any: [
          /^\s*PRINTFORMW 「啊啊啊～！…哈啊…哈啊……哈啊啊～！啊啊…好痛哦………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3806',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%流下了血与泪，不过看起来是喜悦的泪呢………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3807',
        any: [/^\s*CFLAG:TARGET:343 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3809',
        any: [/^\s*ELSEIF CFLAG:343 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3810',
        any: [
          /^\s*PRINTFORMW 「真的不喜欢！！…已经…已经…讨厌…啊～…啊啊～哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3811',
        any: [/^\s*CFLAG:TARGET:343 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3811-3813',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3811-3815',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3811-3817',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3813-3818',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;眼罩 CFLAG:344　CFLAG:380\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3821',
        any: [/^\s*IF SELECTCOM == 43 && TEQUIP:43\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3823',
        any: [/^\s*IF CFLAG:TARGET:344 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3824',
        any: [/^\s*PRINTFORMW 「嗯～…看不见的话还是有点不安啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3824-3828',
        any: [
          /^\s*PRINTFORMW 「嗯～…看不见的话还是有点不安啊………」\s*$\s*^\s*CFLAG:TARGET:344 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3825',
        any: [/^\s*CFLAG:TARGET:344 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3827-3830',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋受虐狂～気Lv5以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3830',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3831',
        any: [
          /^\s*PRINTFORMW 「想被弄得乱七八糟…想就这样被侵犯…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3832',
        any: [/^\s*CFLAG:TARGET:344 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3834',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3835',
        any: [/^\s*PRINTFORMW 「呐…快点来摸摸人家啦～…啊啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3836',
        any: [/^\s*CFLAG:TARGET:344 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3838',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3839',
        any: [/^\s*PRINTFORMW 「唔…连这样的play我也…唔呼呼～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3840',
        any: [/^\s*CFLAG:TARGET:344 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3842',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3843',
        any: [
          /^\s*PRINTFORMW 「快、快来摸我吧…我爱你！…啊啊…啊啊～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3844',
        any: [/^\s*CFLAG:TARGET:344 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3846',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3847',
        any: [/^\s*PRINTFORMW 「嗯～…啊…嗯嗯…哈啊哈啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3848',
        any: [/^\s*CFLAG:TARGET:344 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3850',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3851',
        any: [/^\s*PRINTFORMW 「嗯～…看不到你的话，有点寂寞呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3852',
        any: [/^\s*CFLAG:TARGET:344 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3854',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3855',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…打算要干啥～………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3856',
        any: [/^\s*CFLAG:TARGET:344 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3858',
        any: [/^\s*ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3859',
        any: [/^\s*PRINTFORMW 「………真是恶趣味。」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3859-3863',
        any: [
          /^\s*PRINTFORMW 「………真是恶趣味。」\s*$\s*^\s*CFLAG:TARGET:344 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3859-3865',
        any: [
          /^\s*PRINTFORMW 「………真是恶趣味。」\s*$\s*^\s*CFLAG:TARGET:344 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3860',
        any: [/^\s*CFLAG:TARGET:344 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3861-3866',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3865',
        any: [/^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3867',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3868',
        any: [/^\s*PRINTFORMW 「蒙眼play什么的，真是令人忐忑呢～～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3869',
        any: [/^\s*CFLAG:380 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3871',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3872',
        any: [/^\s*PRINTFORMW 「真是的…看不见东西果然还是会不安啦～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3873',
        any: [/^\s*CFLAG:380 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3875',
        any: [/^\s*ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3876',
        any: [/^\s*PRINTFORMW 「嗯～…终于脱掉了………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3877',
        any: [/^\s*CFLAG:380 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3877-3879',
        any: [/^\s*CFLAG:380 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3877-3881',
        any: [
          /^\s*CFLAG:380 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3878-3883',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;绳子 CFLAG345　CFLAG:385\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3886',
        any: [/^\s*IF SELECTCOM == 44 && TEQUIP:44\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3888',
        any: [/^\s*IF CFLAG:TARGET:345 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3889',
        any: [
          /^\s*PRINTFORMW 「上次这么绑着…还是在刚被抓到地下城的时候………啊……回想起讨厌的事情了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3890',
        any: [/^\s*CFLAG:TARGET:345 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3890-3892',
        any: [
          /^\s*CFLAG:TARGET:345 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3892-3895',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋受虐狂～気Lv5以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3895',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3896',
        any: [
          /^\s*PRINTFORMW 「更用力地绑紧吧～%UNICODE\(0x2661\) \*1% 舒服的话，就应该要说出来的嘛～%UNICODE\(0x2661\) \*1%嘻嘻」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3897',
        any: [/^\s*CFLAG:TARGET:345 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3899',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3900',
        any: [
          /^\s*PRINTFORMW 「感觉越来越舒服了…%UNICODE\(0x2661\) \*1% 啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3901',
        any: [/^\s*CFLAG:TARGET:345 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3903',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:345 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3904',
        any: [/^\s*PRINTFORMW 「啊～挺舒服的，有点喜欢了…嗯～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3905',
        any: [/^\s*CFLAG:TARGET:345 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3907',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3908',
        any: [
          /^\s*PRINTFORMW 「哈啊～…再更加地欺负我吧～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3909',
        any: [/^\s*CFLAG:TARGET:345 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3911',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3912',
        any: [
          /^\s*PRINTFORMW 「嘻嘻～再绑紧些也没关系哦………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3913',
        any: [/^\s*CFLAG:TARGET:345 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3915',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:345 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3916',
        any: [/^\s*PRINTFORMW 「被你这样绑着的话，会忍不住的………噢～～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3917',
        any: [/^\s*CFLAG:TARGET:345 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3919',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:345 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3920',
        any: [/^\s*PRINTFORMW 「啊嗯～…被这么绑着好舒服啊～…啊啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3921',
        any: [/^\s*CFLAG:TARGET:345 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3923',
        any: [/^\s*ELSEIF CFLAG:345 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3924',
        any: [
          /^\s*PRINTFORMW 「啊～…为什么要绑着我…这，这样子有什么意义？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3925',
        any: [/^\s*CFLAG:TARGET:345 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3925-3927',
        any: [
          /^\s*CFLAG:TARGET:345 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3925-3929',
        any: [
          /^\s*CFLAG:TARGET:345 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3927-3930',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3930',
        any: [/^\s*ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3932',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3933',
        any: [/^\s*PRINTFORMW 「啊啊…身上还是被绳子勒得痛痛的………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3934',
        any: [/^\s*CFLAG:385 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3936',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3937',
        any: [/^\s*PRINTFORMW 「啊啊…身上还是被绳子勒得痛痛的………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3938',
        any: [/^\s*CFLAG:385 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3940',
        any: [/^\s*ELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3941',
        any: [/^\s*PRINTFORMW 「啊啊…好可怕的绳子印………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3942',
        any: [/^\s*CFLAG:385 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3942-3944',
        any: [/^\s*CFLAG:385 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3942-3946',
        any: [
          /^\s*CFLAG:385 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3943-3948',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;口塞 CFLAG346　CFLAG:386\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3951',
        any: [/^\s*IF SELECTCOM == 45 && TEQUIP:45\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3953',
        any: [/^\s*IF CFLAG:TARGET:346 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3954',
        any: [
          /^\s*PRINTFORMW 「呐，难道是为了不让我大声嚷嚷才这么做………？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3955',
        any: [/^\s*CFLAG:TARGET:346 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3955-3957',
        any: [
          /^\s*CFLAG:TARGET:346 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3957-3960',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱＋受虐狂～気Lv5以上\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3960',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3961',
        any: [
          /^\s*PRINTFORMW 「口枷…好啊……～%UNICODE\(0x2661\) \*1%……唔唔唔～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3962',
        any: [/^\s*IF TEQUIP:43\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3963',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的嘴被口枷塞住，从缝隙中喷出了炽热的呼吸…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3964-3965',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%只是看到口枷而已，眼睛却已经湿润了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3965',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%只是看到口枷而已，眼睛却已经湿润了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3966-3967',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:346 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3967',
        any: [/^\s*CFLAG:TARGET:346 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3969',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3970',
        any: [
          /^\s*PRINTFORMW 「啊啊…明明只是见到口枷，口水却已经流出来了………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3971',
        any: [/^\s*CFLAG:TARGET:346 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3973',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:346 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3974',
        any: [/^\s*PRINTFORMW 「这样的话，就不能帮你吹出来了嘛………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3975',
        any: [/^\s*CFLAG:TARGET:346 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3977',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3978',
        any: [
          /^\s*PRINTFORMW 「要绑好哦～不要待会大声叫的时候掉下来啦～嘻嘻～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3979',
        any: [/^\s*CFLAG:TARGET:346 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3981',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3982',
        any: [
          /^\s*PRINTFORMW 「不绑上口枷的话，嘴巴就好寂寞啊～………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3983',
        any: [/^\s*CFLAG:TARGET:346 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3985',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:346 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3986',
        any: [/^\s*PRINTFORMW 「这样就不能接吻了嘛！讨厌～………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3987',
        any: [/^\s*CFLAG:TARGET:346 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3989',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:346 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3990',
        any: [/^\s*PRINTFORMW 「被口枷桎梏着，有种窒息的快感～………♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3991',
        any: [/^\s*CFLAG:TARGET:346 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3993',
        any: [/^\s*ELSEIF CFLAG:346 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3994',
        any: [
          /^\s*PRINTFORMW 「喂…这个东西，有好好洗干净么？…为了卫生着想啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3995',
        any: [/^\s*CFLAG:TARGET:346 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3995-3997',
        any: [
          /^\s*CFLAG:TARGET:346 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3995-3999',
        any: [
          /^\s*CFLAG:TARGET:346 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '3997-4000',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4000',
        any: [/^\s*ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4002',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:386 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4003',
        any: [/^\s*PRINTFORMW 「口水流得到处都是啦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4004',
        any: [/^\s*CFLAG:386 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4006',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:386 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4007',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4008',
        any: [/^\s*CFLAG:386 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4010',
        any: [/^\s*ELSEIF CFLAG:386 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4011',
        any: [/^\s*PRINTFORMW 「啊唔…哇…啊……口水这么的………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4012',
        any: [/^\s*CFLAG:386 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4012-4014',
        any: [/^\s*CFLAG:386 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4012-4016',
        any: [
          /^\s*CFLAG:386 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4013-4018',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;灌肠\+肛塞 CFLAG:347\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4021',
        any: [/^\s*IF SELECTCOM == 46 && TEQUIP:46\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4023',
        any: [/^\s*IF CFLAG:TARGET:347 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4024',
        any: [
          /^\s*PRINTFORMW 「哎、啊？！…灌肠什么的…不、不要…从来没做过这种事！…讨、讨厌啊～！都说了不要啦！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4025',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%强行压着她娇小的身体，从肛门处灌入了好几百毫升的灌肠液…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4026',
        any: [/^\s*CFLAG:TARGET:347 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4026-4028',
        any: [
          /^\s*CFLAG:TARGET:347 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4029-4030',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＋A感覚Lv3以上＋受虐狂～気Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4031',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4032',
        any: [
          /^\s*PRINTFORMW 「再灌…再灌啊～%UNICODE\(0x2661\) \*1% 腹中的感觉好强烈…后面的感觉好舒服啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4033',
        any: [
          /^\s*PRINTFORMW 在%SAVESTR:TARGET%的恳求下，提高了灌肠液的浓度，注入了比平时多很多的量。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4034',
        any: [
          /^\s*PRINTFORMW 娇小的%SAVESTR:TARGET%，肚子像青蛙一样地鼓胀起来了…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4035',
        any: [/^\s*CFLAG:347 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4037',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4038',
        any: [
          /^\s*PRINTFORMW 「啊啊…这样就有了感觉…嗯…噢…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4039',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%涕泗横流，品味着灌肠液带来的刺激…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4040',
        any: [/^\s*CFLAG:347 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4042',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4043',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊啊～%UNICODE\(0x2661\) \*1% 啊啊%UNICODE\(0x2661\) \*1% 肚子…被玩坏了…要坏掉了啦～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4044',
        any: [
          /^\s*PRINTFORMW 最近，因为她已经习惯了过去的玩法，所以提高了灌肠液的浓度，注入了比平时多很多的量。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4045',
        any: [
          /^\s*PRINTFORMW 娇小的%SAVESTR:TARGET%，肚子像青蛙一样地鼓胀起来了…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4046',
        any: [/^\s*CFLAG:347 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4048',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4049',
        any: [
          /^\s*PRINTFORMW 「啊啊～…看在你的份上…原谅你做出这么过分的事…啊～…嗯唔唔唔唔啊～！！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4050',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为肚子里灌肠液的刺激，发出了痛苦的呻吟…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4051',
        any: [/^\s*CFLAG:347 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4053',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4054',
        any: [
          /^\s*PRINTFORMW 「肚子好像烧起来一样，好烫…啊啊…为什么……会有这种感觉………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4055',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被快感折磨得面红耳赤，发出了不甘的呻吟…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4056',
        any: [/^\s*CFLAG:347 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4058',
        any: [/^\s*ELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4059',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…肚子在咕咕叫…啊～…不要…不要…要拉出来了………好脏啊不要啦！！………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4060',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%在肚子的绞痛中流下了耻辱的泪水…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4061',
        any: [/^\s*CFLAG:347 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4061-4063',
        any: [/^\s*CFLAG:347 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4061-4065',
        any: [
          /^\s*CFLAG:347 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4061-4067',
        any: [
          /^\s*CFLAG:347 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4063-4068',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;放置PLAY CFLAG:356\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4070',
        any: [/^\s*IF SELECTCOM == 55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4072',
        any: [/^\s*IF CFLAG:356 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4073',
        any: [
          /^\s*PRINTFORMW 「怎、怎么了？ 我做了什么让你不舒服的事么………？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4074',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%诚惶诚恐地问到………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4075',
        any: [/^\s*CFLAG:356 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4077-4078',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＋欲情Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4079',
        any: [
          /^\s*IF TALENT:76 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4080',
        any: [/^\s*PRINTFORMW 「看啊…只是被你这么看着，我就成这样子了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4081',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%股间的阴茎，已经勃起至极点了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4082',
        any: [/^\s*CFLAG:356 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4084',
        any: [
          /^\s*ELSEIF TALENT:76 == 1 && \(CFLAG:356 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4085',
        any: [/^\s*PRINTFORMW 「呐…只是这样看着，不过瘾吧………？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4086',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%分开双腿，引诱着%SAVESTR:PLAYER%…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4087',
        any: [/^\s*CFLAG:356 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4089',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4090',
        any: [
          /^\s*PRINTFORMW 「哈啊～哈啊…我、我已经…无法忍耐啦～！～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4091',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双腿不断摩擦着，企图刺激自己的阴茎…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4092',
        any: [/^\s*CFLAG:356 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4094',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:356 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4095',
        any: [/^\s*PRINTFORMW 「啊啊…被这么看着…要让我疯狂了………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4096',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%露出了痴迷的表情………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4097',
        any: [/^\s*CFLAG:356 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4099',
        any: [/^\s*ELSEIF CFLAG:356 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4100',
        any: [
          /^\s*PRINTFORMW 「怎、怎么了？ 我做了什么让你不舒服的事么………？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4101',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%诚惶诚恐地问到………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4102',
        any: [/^\s*CFLAG:356 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4102-4104',
        any: [/^\s*CFLAG:356 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4103-4105',
        any: [/^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4105',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4108',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的私处里，蠕虫毫不留情地翻动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4111',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的菊穴，被肛门虫毫不留情地蹂躏着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4114',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的菊穴，被放入了肛珠，正一开一合地吞吐着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4117',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的阴蒂，被阴蒂夹狠狠地关照着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4120',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头，被乳头夹狠狠地欺负着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4123',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%的胸前，榨乳器正用力地吸着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4126',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎，被飞机杯折磨着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4129',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被戴着眼罩，对外界发生的事情一无所知。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4132',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的身体，被绳子紧紧地束缚着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4135',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肚子，因为灌肠液而发出咕咕的声音。看来一但拔掉肛塞，污物就会喷发而出。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4138',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的菊穴被插入了电极，正持续不断地电击着脆弱的括约肌。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4141',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的这个姿态，被水晶球一五一十地拍下来了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4141-4143',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的这个姿态，被水晶球一五一十地拍下来了……\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4141-4145',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的这个姿态，被水晶球一五一十地拍下来了……\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4149',
        any: [/^\s*IF SELECTCOM == 56\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4151',
        any: [/^\s*IF CFLAG:357 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4152',
        any: [/^\s*IF TEQUIP:53 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4154',
        any: [
          /^\s*PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TARGET%进行自我介绍。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4155',
        any: [/^\s*IF TALENT:89 \|\| ABL:17 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4156',
        any: [
          /^\s*PRINTFORM %SAVESTR:TARGET%将自己的本名、至今为止的性经验\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4158',
        any: [/^\s*PRINTFORM 甚至自慰时想的什么\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4159',
        any: [/^\s*PRINTFORML 都微笑地讲了出来……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4160',
        any: [
          /^\s*PRINTFORML 似乎在期待着被狂王看到自己现在的样子，%SAVESTR:TARGET%的股间也开始湿润了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4161',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4162',
        any: [
          /^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4163',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%开始对着水晶球说着不知廉耻的话。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4164',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4165',
        any: [
          /^\s*ELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4166',
        any: [/^\s*PRINTFORML %SAVESTR:TARGET%向水晶球介绍着自己。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4167',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4168-4169',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORML %SAVESTR:TARGET%把头别向一边，什么都不说。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4169',
        any: [/^\s*PRINTFORML %SAVESTR:TARGET%把头别向一边，什么都不说。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4169-4171',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%把头别向一边，什么都不说。\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4171-4172',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORM 在和%SAVESTR:PLAYER%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4172',
        any: [/^\s*PRINTFORM 在和%SAVESTR:PLAYER%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4173',
        any: [
          /^\s*IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4174',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰呢喃着充满爱意的话语。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4174-4193',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰呢喃着充满爱意的话语。\s*$\s*^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60\s*$\s*^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰叫嚷着淫猥的话语。\s*$\s*^\s*ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85\) && PALAM:5 >= PALAMLV:4\s*$\s*^\s*PRINTFORM 会话的过程中，%SAVESTR:TARGET%\s*$\s*^\s*IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17\s*$\s*^\s*PRINT 带着快乐的语调\s*$\s*^\s*ELSEIF TEQUIP:44 \|\| TEQUIP:49\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4175',
        any: [
          /^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4176',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰叫嚷着淫猥的话语。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4177',
        any: [
          /^\s*ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85\) && PALAM:5 >= PALAMLV:4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4178',
        any: [/^\s*PRINTFORM 会话的过程中，%SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4179',
        any: [
          /^\s*IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4180',
        any: [/^\s*PRINT 带着快乐的语调\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4181',
        any: [/^\s*ELSEIF TEQUIP:44 \|\| TEQUIP:49\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4182',
        any: [/^\s*PRINT 带着痛苦的语调\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4184',
        any: [/^\s*PRINTFORML 拼命地回应着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4185',
        any: [
          /^\s*ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4186',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%交谈还算融洽的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4186-4193',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%交谈还算融洽的样子。\s*$\s*^\s*ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3\s*$\s*^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%时不时会给出一些回应。\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4187',
        any: [/^\s*ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4188',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%时不时会给出一些回应。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4190',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4190-4193',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4190-4194',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4192-4197',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*IF TEQUIP:53 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4193',
        any: [/^\s*CFLAG:357 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4196-4197',
        any: [/^\s*ELSE\s*$\s*^\s*IF TEQUIP:53 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4197',
        any: [/^\s*IF TEQUIP:53 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4199',
        any: [
          /^\s*PRINTFORML %SAVESTR:MASTER%催促%SAVESTR:TARGET%进行自我介绍。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4200',
        any: [
          /^\s*IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4201',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%扭着腰对水晶球说出了充满爱意的话语\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4202',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4203',
        any: [
          /^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4204',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%扭着腰对水晶球叫嚷着淫猥的话语\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4205',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4206',
        any: [/^\s*ELSEIF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4207',
        any: [
          /^\s*PRINTFORM %SAVESTR:TARGET%将自己的本名、至今为止的性经验\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4209',
        any: [/^\s*PRINTFORM 甚至手淫时想到的什么\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4210',
        any: [/^\s*PRINTFORML 都微笑地讲了出来……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4211',
        any: [
          /^\s*PRINTFORML 似乎在期待着被狂王看到自己现在的样子，%SAVESTR:TARGET%的股间也开始湿润了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4212',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4213',
        any: [
          /^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4214',
        any: [/^\s*PRINTFORML %SAVESTR:TARGET%对着水晶球说起淫猥的话语。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4215',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4216',
        any: [
          /^\s*ELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4217',
        any: [/^\s*PRINTFORML %SAVESTR:TARGET%对着水晶球开始介绍自己。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4218',
        any: [/^\s*TFLAG:32 \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4219-4220',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORML %SAVESTR:TARGET%侧过脸去，沉默不语。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4220',
        any: [/^\s*PRINTFORML %SAVESTR:TARGET%侧过脸去，沉默不语。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4220-4222',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%侧过脸去，沉默不语。\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4222-4223',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORM 在和%SAVESTR:MASTER%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4223',
        any: [/^\s*PRINTFORM 在和%SAVESTR:MASTER%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4224',
        any: [
          /^\s*IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4225',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰呢喃着充满爱意的话语。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4225-4244',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰呢喃着充满爱意的话语。\s*$\s*^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60\s*$\s*^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰叫嚷着淫猥的话语。\s*$\s*^\s*ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85\) && PALAM:5 >= PALAMLV:4\s*$\s*^\s*PRINTFORM 会话的过程中，%SAVESTR:TARGET%\s*$\s*^\s*IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17\s*$\s*^\s*PRINT 带着快乐的语调\s*$\s*^\s*ELSEIF TEQUIP:44 \|\| TEQUIP:49\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4226',
        any: [
          /^\s*ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4227',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰叫嚷着淫猥的话语。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4228',
        any: [
          /^\s*ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85\) && PALAM:5 >= PALAMLV:4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4229',
        any: [/^\s*PRINTFORM 会话的过程中，%SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4230',
        any: [
          /^\s*IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4231',
        any: [/^\s*PRINT 带着快乐的语调\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4232',
        any: [/^\s*ELSEIF TEQUIP:44 \|\| TEQUIP:49\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4233',
        any: [/^\s*PRINT 带着痛苦的语调\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4235',
        any: [/^\s*PRINTFORML 拼命地回应着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4236',
        any: [
          /^\s*ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4237',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%交谈还算融洽的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4237-4244',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%交谈还算融洽的样子。\s*$\s*^\s*ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3\s*$\s*^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%时不时会给出一些回应。\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4238',
        any: [/^\s*ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4239',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%时不时会给出一些回应。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4241',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4241-4244',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4241-4245',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4241-4247',
        any: [
          /^\s*PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4243-4248',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;乳夹口交 CFLAG:360　贫乳じゃないと動かないんですけお\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4245-4248',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;乳夹口交 CFLAG:360　贫乳じゃないと動かないんですけお\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4250',
        any: [/^\s*IF SELECTCOM == 123 && TALENT:TARGET:109\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4252',
        any: [/^\s*IF CFLAG:TARGET:360 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4253',
        any: [
          /^\s*PRINTFORMW 「嗯啊…嗯～…嗯～…哈啊哈啊…嗯～…唔噢…唔噢～…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4254',
        any: [/^\s*PRINTFORMW 「看啊…我的胸夹着小鸡鸡的样子……………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4255',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好奇地说着，积极地侍奉着你…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4256',
        any: [/^\s*CFLAG:TARGET:360 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4256-4258',
        any: [
          /^\s*CFLAG:TARGET:360 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4258-4261',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4261',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4262',
        any: [
          /^\s*PRINTFORMW 「啊啊…在我的嘴里，在我的胸上射出来吧！～不然可不放过你噢～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4263',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%身体不停地上下运动着，用胸部侍奉着%SAVESTR:PLAYER%的阴茎，舌头还不时在龟头上打转。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4264',
        any: [
          /^\s*PRINTFORMW 「唔噢～%UNICODE\(0x2661\) \*1% 要射的话不要忍着哦！尽情地射出来吧…嘻嘻…射精…唔哦哦…唔唔～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4265',
        any: [/^\s*CFLAG:360 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4267',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:360 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4268',
        any: [
          /^\s*PRINTFORMW 「连…乳交这种屈辱又羞耻的事，居然也觉得很不错了………魔王大人啊～把我弄成这样，不负起责任的话可不放过你哦～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4269',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%身体不停地上下运动着，用胸部侍奉着%SAVESTR:PLAYER%的阴茎，舌头还不时在龟头上打转。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4270',
        any: [
          /^\s*PRINTFORMW 「唔噢…唔噢…哈啊哈啊…唔呼呼……这样脉动着…唔…唔噢………唔唔～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4271',
        any: [/^\s*CFLAG:360 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4273',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:360 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4274',
        any: [
          /^\s*PRINTFORMW 「唔呼呼……喜欢这样吗？～♪　唔唔…唔哦………唔哦…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4275',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用胸部侍奉着阴茎，舌头还不时在龟头上打转。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4276',
        any: [/^\s*CFLAG:360 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4278',
        any: [/^\s*ELSEIF CFLAG:360 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4279',
        any: [
          /^\s*PRINTFORMW 「唔唔…嗯～…唔～…这样的话，就会舒服么？唔唔…嗯～…唔～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4280',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用嘴吸啜着阴茎的同时，不时抬眼瞄着你……………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4281',
        any: [/^\s*CFLAG:360 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4281-4283',
        any: [/^\s*CFLAG:360 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4281-4285',
        any: [
          /^\s*CFLAG:360 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4282-4287',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;口交时自慰 CFLAG:361\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4284-4287',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;口交时自慰 CFLAG:361\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4289',
        any: [/^\s*IF SELECTCOM == 125\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4291',
        any: [/^\s*IF CFLAG:TARGET:361 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4292',
        any: [
          /^\s*PRINTFORMW 「唔～…嗯～…唔噢…一边舔你…一边自摸………好舒服啊～…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4293',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%随着舌头的转动，不停地撸着自己的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4294',
        any: [
          /^\s*PRINTFORMW 「啊啊…其实我一直想过会做这样的事…梦境实现了算…？…嗯～…唔噢…唔唔…～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4295',
        any: [/^\s*CFLAG:TARGET:361 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4295-4297',
        any: [
          /^\s*CFLAG:TARGET:361 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4297-4300',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4300',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4301',
        any: [
          /^\s*PRINTFORMW 「嗯～…射出来～射出来～…%UNICODE\(0x2661\) \*1% 喝掉你的东西，我也要去了…一起射出来吧！～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4302',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不停地撸着自己的阴茎，激烈地侍奉着%SAVESTR:PLAYER%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4303',
        any: [
          /^\s*PRINTFORMW 「唔唔～…噢噢～…啊啊…一跳一跳的…我也要去了…要去了～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4304',
        any: [/^\s*CFLAG:361 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4306',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:361 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4307',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊啊…一边舔你，一边弄自己…其实我梦里经常这么干啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4308',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双颊晕红，陶醉在炽热的气息中。不停用嘴侍奉着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4309',
        any: [
          /^\s*PRINTFORMW 「嗯…嗯～…噢～…噢～…啊啊…%UNICODE\(0x2661\) \*1% 在脉动着…舒服吗？…唔…唔唔～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4310',
        any: [/^\s*CFLAG:361 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4312',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:361 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4313',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…唔…唔唔～…噢…噢～……呐，一起高潮吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4314',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的双眼，失去了理性的灵光，完全被情欲所蒙蔽了，一边侍奉一边偷瞄着你。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4315',
        any: [
          /^\s*PRINTFORMW 「射出来吧！～喝掉你热热的东西的话……我也忍不住要去了～………♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4316',
        any: [/^\s*CFLAG:361 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4318',
        any: [/^\s*ELSEIF CFLAG:361 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4319',
        any: [/^\s*PRINTFORMW 「啊唔…唔…噢～…嗯～…嗯～…啊～～～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4320',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%吸啜着阴茎，被快感淹没了。口水淫秽地滴落下来，好像比你还更想射出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4321',
        any: [/^\s*CFLAG:361 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4321-4323',
        any: [/^\s*CFLAG:361 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4321-4325',
        any: [
          /^\s*CFLAG:361 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4321-4327',
        any: [
          /^\s*CFLAG:361 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4323-4328',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;手搓口交 CFLAG:362\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4330',
        any: [/^\s*IF SELECTCOM == 126\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4332',
        any: [/^\s*IF CFLAG:TARGET:362 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4333',
        any: [
          /^\s*PRINTFORMW 「唔…手口并用的话…嗯～…嗯～…唔唔～…啊啊…感觉比平常更硬了呢～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4334',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抓住%SAVESTR:PLAYER%阴茎的根部不停套弄着，舌头在龟头上打转。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4335',
        any: [/^\s*PRINTFORMW 「唔唔…嗯～…嗯嗯～…啊～…哈啊哈啊…嗯～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4336',
        any: [/^\s*CFLAG:TARGET:362 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4336-4338',
        any: [
          /^\s*CFLAG:TARGET:362 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4338-4341',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4341',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4343',
        any: [/^\s*IF CFLAG:331 == 7 && PREVCOM == 30\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4344',
        any: [
          /^\s*PRINTFORMW 「好的～%UNICODE\(0x2661\) \*1% 啊啊～…嘻嘻～%UNICODE\(0x2661\) \*1% 嗯～…嗯～…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4345',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%听到%SAVESTR:TARGET%的命令之后，情绪高涨了起来。手上的动作越来越激烈了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4346',
        any: [
          /^\s*PRINTFORMW 「嗯～%UNICODE\(0x2661\) \*1% …嗯～%UNICODE\(0x2661\) \*1% …唔～…唔唔…这样…弄小鸡鸡的话…感觉它比平常更精神了呢…………啊啊…唔唔…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4347',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%带着恍惚的表情积极地侍奉着，一副渴望把精液全喝掉的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4348',
        any: [/^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4349-4350',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「你的东西，又硬又热…哈啊～%UNICODE\(0x2661\) \*1% …哈啊～%UNICODE\(0x2661\) \*1% …嗯～唔唔～…噢～哦～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4350',
        any: [
          /^\s*PRINTFORMW 「你的东西，又硬又热…哈啊～%UNICODE\(0x2661\) \*1% …哈啊～%UNICODE\(0x2661\) \*1% …嗯～唔唔～…噢～哦～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4351',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%激烈地套弄着阴茎的根部，好像要把精液挤出来似得。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4352',
        any: [
          /^\s*PRINTFORMW 「嗯～…嗯～…停不下来…噢噢…嗯～…唔…啊啊～…射我嘴里…想要你热热的东西…好想要～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4353',
        any: [
          /^\s*PRINTFORMW 「嗯…嗯～…啊啊～…唔…不用忍耐哦～尽情地射出来吧！……噢！…嗯～唔唔～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4354-4355',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:362 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4355',
        any: [/^\s*CFLAG:362 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4357',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:362 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4358',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%跪在地上，一边仔细地用舌头在龟头上打转，一边温柔地用双手按摩着阴茎的根部和蛋蛋。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4359',
        any: [
          /^\s*PRINTFORMW 「唔唔…啊～…噢～…它变大了呢～%UNICODE\(0x2661\) \*1% 就这样，让你更舒服吧～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4360',
        any: [
          /^\s*PRINTFORMW 「啊啊…好高兴…能让魔王大人舒服起来～…唔唔～…啊……嗯～…～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4361',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%心神皆醉，沉迷在侍奉%SAVESTR:PLAYER%的阴茎中了…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4362',
        any: [/^\s*CFLAG:362 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4364',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:362 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4365',
        any: [
          /^\s*PRINTFORMW 「唔呼呼……手口并用的话，很舒服吧？唔～…嗯～……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4366',
        any: [
          /^\s*PRINTFORMW 「我也想试试这种滋味啊………唔…唔…啊～～…嗯嗯～～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4367',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%愉悦地侍奉着阴茎…………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4368',
        any: [/^\s*CFLAG:362 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4370',
        any: [/^\s*ELSEIF CFLAG:362 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4371',
        any: [
          /^\s*PRINTFORMW 「这样弄的话，会很舒服吧…嗯，我知道了啦～…唔唔…嗯～…啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4372',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%愉悦地眯起了眼睛，侍奉着阴茎…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4373',
        any: [/^\s*CFLAG:362 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4373-4375',
        any: [/^\s*CFLAG:362 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4373-4377',
        any: [
          /^\s*CFLAG:362 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4373-4379',
        any: [
          /^\s*CFLAG:362 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4375-4380',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;真空口交 CFLAG:363\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4382',
        any: [/^\s*IF SELECTCOM == 127\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4384',
        any: [/^\s*IF CFLAG:TARGET:363 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4385',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%为这种侍奉而兴奋起来了，积极地吸啜着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4386',
        any: [/^\s*PRINTFORMW 「嗯～！嗯～！…唔～…唔～…唔～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4387',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一双会说话的眼里，似乎回荡着淫荡又舒服的声音…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4388',
        any: [/^\s*CFLAG:TARGET:363 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4388-4390',
        any: [
          /^\s*CFLAG:TARGET:363 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4389-4394',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「唔唔～…嘻嘻…就这样，全部吸出来！～%UNICODE\(0x2661\) \*1% 」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4393',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4394',
        any: [
          /^\s*PRINTFORMW 「唔唔～…嘻嘻…就这样，全部吸出来！～%UNICODE\(0x2661\) \*1% 」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4395',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸颊凹陷，嘴巴收缩，口腔内形成局部真空，吸啜着阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4396',
        any: [
          /^\s*PRINTFORMW 「唔～…唔～…啊～…～%UNICODE\(0x2661\) \*1% 唔～…唔唔…就这样，让你更舒服被吧！～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4397',
        any: [
          /^\s*PRINTFORMW 「唔～%UNICODE\(0x2661\) \*1% 噢噢～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4398',
        any: [/^\s*CFLAG:363 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4400',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4401',
        any: [
          /^\s*PRINTFORMW 「唔唔…嗯～…啊啊…噢～%UNICODE\(0x2661\) \*1% 唔唔…唔唔～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4402',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像鳖一样地紧紧叼着你的阴茎不放，又紧又热的嘴巴给予了阴茎无上的快感。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4403',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%还细致地利用舌头绕着阴茎打转，这侍奉水平，换了其它人的话早一泄如注了吧。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4404',
        any: [
          /^\s*PRINTFORMW 「唔唔…噢～…啊～%UNICODE\(0x2661\) \*1% 可以…射出来哦～…%UNICODE\(0x2661\) \*1% 唔唔唔唔啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4405',
        any: [/^\s*CFLAG:363 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4407',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4408',
        any: [
          /^\s*PRINTFORMW 「唔唔…射出来…射出来嘛………唔唔～唔唔…哈啊…噢…嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4409',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%认真地企图把精液吸啜出来，发出了无比淫秽的声音……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4410',
        any: [/^\s*CFLAG:363 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4412',
        any: [/^\s*ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4413',
        any: [
          /^\s*PRINTFORMW 「嗯～再来～…再来…唔唔…唔唔～…啊啊～…唔唔噢～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4414',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%发出了无比淫秽的声音……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4415',
        any: [/^\s*CFLAG:363 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4415-4417',
        any: [/^\s*CFLAG:363 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4415-4419',
        any: [
          /^\s*CFLAG:363 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4415-4421',
        any: [
          /^\s*CFLAG:363 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4417-4422',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;六九式 CFLAG:364\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4424',
        any: [/^\s*IF SELECTCOM == 69\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4426',
        any: [/^\s*IF CFLAG:TARGET:364 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4427',
        any: [
          /^\s*PRINTFORMW 「唔～！嗯～…哈啊…啊啊啊～……同时……这样弄着………嗯～啊啊………♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4428',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%愉悦地侍奉着%SAVESTR:PLAYER%的性器……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4429',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊嗯～…哈啊哈啊…唔唔…唔唔…噢噢～…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4430',
        any: [/^\s*CFLAG:TARGET:364 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4430-4432',
        any: [
          /^\s*CFLAG:TARGET:364 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4432-4435',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4435',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4436',
        any: [
          /^\s*PRINTFORMW 「唔唔～…唔唔…啊…啊～…%UNICODE\(0x2661\) \*1% 噢～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4437',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%犹如反击似的，疯狂地吸啜着%SAVESTR:PLAYER%的性器……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4438',
        any: [
          /^\s*PRINTFORMW 「相互这样弄着…感觉心情都变好了呢…唔唔…嗯嗯～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4439',
        any: [
          /^\s*PRINTFORMW 「一起…一起去吧…就弄在嘴里！…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4440',
        any: [/^\s*CFLAG:364 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4442',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:364 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4443',
        any: [
          /^\s*PRINTFORMW 「啊…嗯～…唔啊…唔唔～…噢哦…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4444',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%相拥着，相互吸啜着彼此的性器。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4445',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全勃起了，前列腺液不断地分泌着。%SAVESTR:TARGET%意乱情迷，紧紧地吸啜着%SAVESTR:PLAYER%的性器不松口。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4446',
        any: [
          /^\s*PRINTFORMW 「啊啊…一直…一直在这么干…通过嘴巴表达爱意什么的…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4447',
        any: [/^\s*CFLAG:364 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4449',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:364 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4450',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…嗯～！哈啊～…啊～！已、已经…竟然如此舒服…啊～嗯～…唔唔～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4451',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被你舔得七荤八素，娇喘声越来越高昂了。不过她努力地忍耐了下来，持续地侍奉着你。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4452',
        any: [
          /^\s*PRINTFORMW 「唔…唔唔～…啊～…你，你如果……觉得舒服的话……射出来也无妨哦…嗯～唔唔～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4453',
        any: [/^\s*CFLAG:364 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4455',
        any: [/^\s*ELSEIF CFLAG:364 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4456',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…嗯～不行！…啊…这样欺负我…啊啊～…哈啊～…嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4457',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被你舔得七荤八素，娇喘声越来越高昂了。快感的冲击让她多次把侍奉中断了，你只好不断地耸动腰来提醒她。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4458',
        any: [/^\s*CFLAG:364 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4458-4460',
        any: [/^\s*CFLAG:364 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4458-4462',
        any: [
          /^\s*CFLAG:364 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4458-4464',
        any: [
          /^\s*CFLAG:364 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4460-4465',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;深喉 CFLAG:365\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4467',
        any: [/^\s*IF SELECTCOM == 124\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4469',
        any: [/^\s*IF CFLAG:TARGET:365 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4470',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为口腔侍奉而兴奋了，努力地将%SAVESTR:PLAYER%的阴茎吸入喉咙深处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4471',
        any: [/^\s*PRINTFORMW 「嗯～…唔唔～…啊…嗯～…噢哦～…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4472',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像要窒息似得，深深地将%SAVESTR:PLAYER%的阴茎含进去了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4473',
        any: [/^\s*CFLAG:TARGET:365 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4473-4475',
        any: [
          /^\s*CFLAG:TARGET:365 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4474-4479',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)\s*$\s*^\s*PRINTFORMW 「呵呵～%UNICODE\(0x2661\) \*1% 把你的东西全部喝光～%UNICODE\(0x2661\) \*1% 唔唔～…嗯～…哦啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4478',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4479',
        any: [
          /^\s*PRINTFORMW 「呵呵～%UNICODE\(0x2661\) \*1% 把你的东西全部喝光～%UNICODE\(0x2661\) \*1% 唔唔～…嗯～…哦啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4480',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%断断续续地挤出几句话，舌头积极地缠绕着%SAVESTR:PLAYER%的阴茎……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4481',
        any: [
          /^\s*PRINTFORMW 「唔哦～…唔啊～…好棒…你的鸡鸡真美味…啊啊…就这样在我喉咙里射出来吧…唔唔～…唔唔～…啊哈～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4482',
        any: [/^\s*CFLAG:365 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4484',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4485',
        any: [
          /^\s*PRINTFORMW 「唔啊～%UNICODE\(0x2661\) \*1% 嗯～嗯～…呵呵～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4486',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%发出粗野的喘息，用喉咙紧紧地套弄着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4487',
        any: [
          /^\s*PRINTFORMW 那美丽的娇躯，完全沉醉在侍奉你的满足感中去了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4488',
        any: [/^\s*CFLAG:365 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4490',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4491',
        any: [
          /^\s*PRINTFORMW 「唔哦…嗯～…唔唔…唔呼…哈啊…啊，全部…全部都给我吧…嗯～唔噢～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4492',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%头部不停耸动着，侍奉%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4493',
        any: [/^\s*PRINTFORMW 对她喉咙深处的侵犯，让你兴奋无比…………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4494',
        any: [/^\s*CFLAG:365 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4496',
        any: [/^\s*ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4497',
        any: [
          /^\s*PRINTFORMW 「嗯～…唔哦～…唔唔…嗯～啊～…唔啊…噢～………♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4498',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像要窒息似得，深深地将%SAVESTR:PLAYER%的阴茎含进去了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4499',
        any: [/^\s*CFLAG:365 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4499-4501',
        any: [/^\s*CFLAG:365 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4499-4503',
        any: [
          /^\s*CFLAG:365 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4499-4505',
        any: [
          /^\s*CFLAG:365 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4501-4506',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;强制口交 CFLAG:381\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4508',
        any: [/^\s*IF SELECTCOM == 80\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4510',
        any: [/^\s*IF CFLAG:TARGET:381 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4512',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4513',
        any: [
          /^\s*PRINTFORMW 「嗯～…唔唔～…啊啊…我的嘴…好棒…这么有力的侵犯…啊啊～…嗯～唔哦～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4514',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的头，用力地往喉咙进犯着。%SAVESTR:TARGET%没有抵抗，努力地企图咽下你的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4516',
        any: [/^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4517',
        any: [
          /^\s*PRINTFORMW 「唔啊啊啊！？啊～…一点心理准备都没有…嗯～嗯～嗯嗯嗯～………！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4518',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的头，用力地往喉咙进犯着。%SAVESTR:TARGET%为了不让牙齿弄痛你，努力地嘟起嘴唇，舌头灵活地缠绕着你的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4520-4521',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唔啊～？嗯～…唔唔！…嗯～…嗯～啊～…咳咳！咳咳～…………咳咳咳～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4521',
        any: [
          /^\s*PRINTFORMW 「唔啊～？嗯～…唔唔！…嗯～…嗯～啊～…咳咳！咳咳～…………咳咳咳～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4522',
        any: [
          /^\s*PRINTFORMW 「这、这么粗鲁…～！唔～……呜呜～…嗯～唔啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4523-4524',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:381 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4524',
        any: [/^\s*CFLAG:TARGET:381 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4524-4526',
        any: [
          /^\s*CFLAG:TARGET:381 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4526-4529',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4529',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4530',
        any: [
          /^\s*PRINTFORMW 「唔啊～…嗯～…唔啊啊～…噢啊啊…啊啊…嗯……唔唔……嗯嗯～～～%UNICODE\(0x2661\) \*3%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4531',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%头被粗野地抓着，喉咙也被粗暴地侵犯着。但她的眼中却充满陶醉的神情，口水淫秽地从嘴角滴下来了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4532',
        any: [
          /^\s*PRINTFORMW 「啊啊～…唔唔～…嗯～%UNICODE\(0x2661\) \*1% 啊啊…就这样，把我的嘴巴当成精液便器吧！%UNICODE\(0x2661\) \*1% 唔哦～…嗯～唔噢噢噢～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4533',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%头发散乱，眼泪都渗出来了。就这样直接射她嘴里吧！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4534',
        any: [/^\s*CFLAG:381 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4536',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:381 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4537',
        any: [
          /^\s*PRINTFORMW 「唔哦～…嗯～…唔哦～…啊啊～…请、请…饶了…我～～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4538',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%狠狠地抓着%SAVESTR:TARGET%的头，疯狂地耸动着下体。虽然很痛苦，但她却条件反射般用舌头灵活细致地不停侍奉着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4539',
        any: [
          /^\s*PRINTFORMW 「嗯～…唔哦～…唔～…啊啊…嗯～嗯啊………这、这样就满足了么………啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4540',
        any: [
          /^\s*PRINTFORMW 「唔唔…可……可以哦…射我嘴里什么的～%UNICODE\(0x2661\) \*1% 嗯～唔唔～…唔唔～…啊啊～…唔唔～！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4541',
        any: [/^\s*CFLAG:381 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4543',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:381 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4544',
        any: [
          /^\s*PRINTFORMW 「这么粗暴的…不要不要～…唔唔…唔～…嗯～…啊啊～…唔哦～…嗯～…唔啊啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4545',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的头，侵犯到了喉咙最深处。%SAVESTR:TARGET%竭力地不让自己噎着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4546',
        any: [
          /^\s*PRINTFORMW 在这美妙的小嘴里狠狠射一发，应该会很过瘾吧…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4547',
        any: [/^\s*CFLAG:381 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4549',
        any: [/^\s*ELSEIF CFLAG:381 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4550',
        any: [
          /^\s*PRINTFORMW 「啊啊～…不要这种的…啊～…呜呜～…嗯～…唔唔唔唔～…嗯～哇～…唔唔～…讨厌啦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4551',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的头，侵犯到了喉咙最深处。%SAVESTR:TARGET%不断挣扎着，无奈地就范了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4552',
        any: [/^\s*CFLAG:381 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4552-4554',
        any: [/^\s*CFLAG:381 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4552-4556',
        any: [
          /^\s*CFLAG:381 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4552-4558',
        any: [
          /^\s*CFLAG:381 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4554-4559',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------------\s*$\s*^\s*;穿环　CFLAG:348\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4563',
        any: [/^\s*IF SELECTCOM == 87\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4566',
        any: [/^\s*IF CFLAG:TARGET:348 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4568',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4569',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%苦痛地扭曲了表情………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4571',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4573',
        any: [/^\s*IF CFLAG:7 & P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4574',
        any: [/^\s*PRINTFORMW 「咕～…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4575',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为被初次开洞而发出痛苦的声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4577',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4577-4612',
        any: [
          /^\s*IF P == 1\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…这样敏感度上升的话…啊嗯～…硬的不行了%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%看着両乳头上闪光的环陶醉了………\s*$\s*^\s*;おへそ\s*$\s*^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「呵呵…很合适吧？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐的周围………\s*$\s*^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4578',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…这样敏感度上升的话…啊嗯～…硬的不行了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4579',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着両乳头上闪光的环陶醉了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4581',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4581-4612',
        any: [
          /^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「呵呵…很合适吧？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐的周围………\s*$\s*^\s*;ラビア\s*$\s*^\s*ELSEIF P == 4\s*$\s*^\s*PRINTFORMW 「这样被看着的话我会淫乱的～露出来了呢」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的小穴上两瓣阴唇的环都闪着光………\s*$\s*^\s*;ペニスorクリトリス\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4582',
        any: [/^\s*PRINTFORMW 「呵呵…很合适吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4583',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐的周围………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4585',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4586',
        any: [/^\s*PRINTFORMW 「这样被看着的话我会淫乱的～露出来了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4587',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的小穴上两瓣阴唇的环都闪着光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4589',
        any: [/^\s*ELSEIF P == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4591',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4592',
        any: [
          /^\s*PRINTFORMW 「讨厌…被这样穿上去的话会一直勃起的～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4593',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎完全勃起了、穿环在闪闪发光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4595',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4598',
        any: [/^\s*ELSEIF P == 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4599',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、用这个舌头奉仕的话一定会很快活吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4600',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像展示穿环似的伸出了舌头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4602',
        any: [/^\s*ELSEIF P == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4603',
        any: [/^\s*PRINTFORMW 「嗯…穿在唇上、总觉得怪怪的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4604',
        any: [/^\s*PRINTFORMW 「不过你觉得这样比较好的就没办法了………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4606',
        any: [/^\s*ELSEIF P == 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4607',
        any: [/^\s*PRINTFORMW 「你觉得这样好的话、那就这样穿环好了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4607-4612',
        any: [
          /^\s*PRINTFORMW 「你觉得这样好的话、那就这样穿环好了…」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的一个鼻孔上的穿环闪闪发光着………\s*$\s*^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4608',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的一个鼻孔上的穿环闪闪发光着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4611-4612',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4612',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环的伤痕………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4612-4614',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*;爱慕\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4615',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4617',
        any: [/^\s*IF CFLAG:7 & P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4618',
        any: [/^\s*PRINTFORMW 「咕～…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4619',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为被初次开洞而发出痛苦的声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4621',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4622',
        any: [/^\s*PRINTFORMW 「………呐怎样？会合适吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4623',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用両臂摆出了性感的姿势。她的両个乳头上的环闪闪发光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4625',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4626',
        any: [
          /^\s*PRINTFORMW 「美妙的礼物呢…谢谢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4627',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肚脐上镶着宝石的穿环在闪着光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4629',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4630',
        any: [
          /^\s*PRINTFORMW 「把、把这种东西穿上的话、除了你之外已经不能见人了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4631',
        any: [
          /^\s*PRINTFORMW 「………嘛也没有展示给你以外的别人看的念头罢了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4632',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%小声地补充道………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4634',
        any: [/^\s*ELSEIF P == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4636',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4637',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、这样就变成你専用的阴茎了呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4637-4641',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、这样就变成你専用的阴茎了呢…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW 「穿在这里的话、不尽情爽一下可不会放过你呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORM\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4637-4645',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、这样就变成你専用的阴茎了呢…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW 「穿在这里的话、不尽情爽一下可不会放过你呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORM\s*$\s*^\s*ENDIF\s*$\s*^\s*;舌先\s*$\s*^\s*ELSEIF P == 16\s*$\s*^\s*PRINTFORMW 「诶、用这舌头来舔？………真是的、大色狼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4638',
        any: [
          /^\s*PRINTFORMW 「穿在这里的话、不尽情爽一下可不会放过你呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4640',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4643',
        any: [/^\s*ELSEIF P == 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4644',
        any: [/^\s*PRINTFORMW 「诶、用这舌头来舔？………真是的、大色狼」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4645',
        any: [
          /^\s*PRINTFORMW 话虽这样说%SAVESTR:TARGET%一幅很有干劲的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4647',
        any: [/^\s*ELSEIF P == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4648',
        any: [
          /^\s*PRINTFORMW 「呐、果然给嘴唇穿环很痛呢…所以尽情的亲我补偿下吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4649',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%这样说着撅起闪光的嘴唇哀求着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4649-4658',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%这样说着撅起闪光的嘴唇哀求着………\s*$\s*^\s*;鼻穴\s*$\s*^\s*ELSEIF P == 64\s*$\s*^\s*PRINTFORMW 「呜呜嗯…既然你想这样的话就照你说的做吧…果然很羞耻呢」\s*$\s*^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4651',
        any: [/^\s*ELSEIF P == 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4652',
        any: [
          /^\s*PRINTFORMW 「呜呜嗯…既然你想这样的话就照你说的做吧…果然很羞耻呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4653-4658',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4656',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4656-4658',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4659-4660',
        any: [/^\s*ELSE\s*$\s*^\s*;装着する\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4661',
        any: [/^\s*IF CFLAG:7 & P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4662',
        any: [
          /^\s*PRINTFORMW 「啊～…不要～…好痛…只有疼痛什么的不要啊…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4663',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为被初次开洞而发出痛苦的悲鳴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4663-4699',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为被初次开洞而发出痛苦的悲鳴。\s*$\s*^\s*;両乳头\s*$\s*^\s*IF P == 1\s*$\s*^\s*PRINTFORMW 「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的乳头上染血的环在闪着光………\s*$\s*^\s*;おへそ\s*$\s*^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「咕呜～为什么要做这种事…诶、这是为了录制水晶球时確認是本人的必要？你在说什么啊？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4664-4703',
        any: [
          /^\s*;両乳头\s*$\s*^\s*IF P == 1\s*$\s*^\s*PRINTFORMW 「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的乳头上染血的环在闪着光………\s*$\s*^\s*;おへそ\s*$\s*^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「咕呜～为什么要做这种事…诶、这是为了录制水晶球时確認是本人的必要？你在说什么啊？」\s*$\s*^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4665',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4666',
        any: [
          /^\s*PRINTFORMW 「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4667',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头上染血的环在闪着光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4669',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4670',
        any: [
          /^\s*PRINTFORMW 「咕呜～为什么要做这种事…诶、这是为了录制水晶球时確認是本人的必要？你在说什么啊？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4672',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4673',
        any: [/^\s*PRINTFORMW 「啊～…嗯呜…不要做这种事…我…咕呜～………！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4674',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破开阴唇的穿环的痛苦而流下了眼泪………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4676',
        any: [/^\s*ELSEIF P == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4678',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4679',
        any: [/^\s*PRINTFORMW 「啊啊～…我、我的阴茎…被什么…被什么给…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4680',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎被环穿了个洞血流了出来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4682',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4685',
        any: [/^\s*ELSEIF P == 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4686',
        any: [/^\s*PRINTFORMW 「咿噗～…咿～…缩不粗话了（伸不直）」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4687',
        any: [
          /^\s*PRINTFORMW 为了好好固定住%SAVESTR:TARGET%的舌头不让它缩起来、将舌头拉直了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4688',
        any: [
          /^\s*PRINTFORMW 一看到一脸哭相的%SAVESTR:TARGET%就更加想虐待她了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4690',
        any: [/^\s*ELSEIF P == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4691',
        any: [/^\s*PRINTFORMW 「好痛…这样一来就暂时吃不了热的东西了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4692',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%穿上环的唇在隐隐作痛………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4694',
        any: [/^\s*ELSEIF P == 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4694-4703',
        any: [
          /^\s*ELSEIF P == 64\s*$\s*^\s*PRINTFORMW 「不要再这样虐待我了…再这样我就………啊～…讨厌～不要看～！」\s*$\s*^\s*PRINTFORMW 拿开想遮住鼻子的%SAVESTR:TARGET%的手臂、好好地检查环是否穿好。\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%一边哭一边摇着头………\s*$\s*^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4695',
        any: [
          /^\s*PRINTFORMW 「不要再这样虐待我了…再这样我就………啊～…讨厌～不要看～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4696',
        any: [
          /^\s*PRINTFORMW 拿开想遮住鼻子的%SAVESTR:TARGET%的手臂、好好地检查环是否穿好。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4697',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%一边哭一边摇着头………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4698-4703',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4701',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4701-4703',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4703-4704',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:348 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4704',
        any: [/^\s*CFLAG:TARGET:348 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4704-4706',
        any: [
          /^\s*CFLAG:TARGET:348 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4706-4708',
        any: [/^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;助手\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4709',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4710',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4712',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4714',
        any: [/^\s*IF CFLAG:7 & P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4716',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4716-4751',
        any: [
          /^\s*IF P == 1\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…这样敏感度上升的话…啊嗯～…硬的不行了%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%看着両乳头上闪光的环陶醉了………\s*$\s*^\s*;おへそ\s*$\s*^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「呵呵…很合适吧？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐的周围………\s*$\s*^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4717',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…这样敏感度上升的话…啊嗯～…硬的不行了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4718',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%看着両乳头上闪光的环陶醉了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4720',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4720-4751',
        any: [
          /^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「呵呵…很合适吧？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐的周围………\s*$\s*^\s*;ラビア\s*$\s*^\s*ELSEIF P == 4\s*$\s*^\s*PRINTFORMW 「这样被看着的话我会淫乱的～露出来了呢」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的小穴上两瓣阴唇的环都闪着光………\s*$\s*^\s*;ペニスorクリトリス\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4721',
        any: [/^\s*PRINTFORMW 「呵呵…很合适吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4722',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着肚脐的周围………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4724',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4725',
        any: [/^\s*PRINTFORMW 「这样被看着的话我会淫乱的～露出来了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4726',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的小穴上两瓣阴唇的环都闪着光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4728',
        any: [/^\s*ELSEIF P == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4730',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4731',
        any: [
          /^\s*PRINTFORMW 「讨厌…被这样穿上去的话会一直勃起的～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4732',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎完全勃起了、穿环在闪闪发光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4734',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4737',
        any: [/^\s*ELSEIF P == 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4738',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、用这个舌头奉仕的话一定会很快活吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4739',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像展示穿环似的伸出了舌头………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4741',
        any: [/^\s*ELSEIF P == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4742',
        any: [/^\s*PRINTFORMW 「嗯…穿在唇上、总觉得怪怪的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4743',
        any: [/^\s*PRINTFORMW 「不过你觉得这样比较好的就没办法了………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4745',
        any: [/^\s*ELSEIF P == 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4746',
        any: [/^\s*PRINTFORMW 「你觉得这样好的话、那就这样穿环好了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4746-4751',
        any: [
          /^\s*PRINTFORMW 「你觉得这样好的话、那就这样穿环好了…」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的一个鼻孔上的穿环闪闪发光着………\s*$\s*^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4747',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的一个鼻孔上的穿环闪闪发光着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4748-4753',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:348 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4751',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4752-4753',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:348 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4753',
        any: [/^\s*CFLAG:348 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4755',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4756',
        any: [/^\s*IF CFLAG:7 & P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4758',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4759',
        any: [/^\s*PRINTFORMW 「………呐怎样？会合适吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4760',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用両臂摆出了性感的姿势。她的両个乳头上的环闪闪发光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4762',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4763',
        any: [
          /^\s*PRINTFORMW 「美妙的礼物呢…谢谢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4764',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肚脐上镶着宝石的穿环在闪着光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4766',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4767',
        any: [
          /^\s*PRINTFORMW 「把、把这种东西穿上的话、除了你之外已经不能见人了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4768',
        any: [
          /^\s*PRINTFORMW 「………嘛也没有展示给你以外的别人看的念头罢了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4769',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%小声地补充道………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4771',
        any: [/^\s*ELSEIF P == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4773',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4774',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、唔呼呼、这样就变成你専用的阴茎了呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4774-4778',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、唔呼呼、这样就变成你専用的阴茎了呢…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW 「穿在这里的话、不尽情爽一下可不会放过你呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORM\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4774-4782',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、唔呼呼、这样就变成你専用的阴茎了呢…%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*PRINTFORMW 「穿在这里的话、不尽情爽一下可不会放过你呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORM\s*$\s*^\s*ENDIF\s*$\s*^\s*;舌先\s*$\s*^\s*ELSEIF P == 16\s*$\s*^\s*PRINTFORMW 「诶、用这舌头来舔？………真是的、大色狼」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4775',
        any: [
          /^\s*PRINTFORMW 「穿在这里的话、不尽情爽一下可不会放过你呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4777',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4780',
        any: [/^\s*ELSEIF P == 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4781',
        any: [/^\s*PRINTFORMW 「诶、用这舌头来舔？………真是的、大色狼」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4782',
        any: [
          /^\s*PRINTFORMW 话虽这样说%SAVESTR:TARGET%一幅很有干劲的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4784',
        any: [/^\s*ELSEIF P == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4785',
        any: [
          /^\s*PRINTFORMW 「呐、果然给嘴唇穿环很痛呢…所以尽情的亲我补偿下吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4786',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%这样说着撅起闪光的嘴唇哀求着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4786-4795',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%这样说着撅起闪光的嘴唇哀求着………\s*$\s*^\s*;鼻穴\s*$\s*^\s*ELSEIF P == 64\s*$\s*^\s*PRINTFORMW 「呜呜嗯…既然你想这样的话就照你说的做吧…果然很羞耻呢」\s*$\s*^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4788',
        any: [/^\s*ELSEIF P == 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4789',
        any: [
          /^\s*PRINTFORMW 「呜呜嗯…既然你想这样的话就照你说的做吧…果然很羞耻呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4790-4795',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:348 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4793',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4794-4795',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:348 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4795',
        any: [/^\s*CFLAG:348 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4797',
        any: [/^\s*ELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4798',
        any: [/^\s*IF CFLAG:7 & P\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4798-4834',
        any: [
          /^\s*IF CFLAG:7 & P\s*$\s*^\s*;両乳头\s*$\s*^\s*IF P == 1\s*$\s*^\s*PRINTFORMW 「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的乳头上染血的环在闪着光………\s*$\s*^\s*;おへそ\s*$\s*^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「咕呜～为什么要做这种事…诶、这是为了录制水晶球时確認是本人的必要？你在说什么啊？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4799-4838',
        any: [
          /^\s*;両乳头\s*$\s*^\s*IF P == 1\s*$\s*^\s*PRINTFORMW 「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%的乳头上染血的环在闪着光………\s*$\s*^\s*;おへそ\s*$\s*^\s*ELSEIF P == 2\s*$\s*^\s*PRINTFORMW 「咕呜～为什么要做这种事…诶、这是为了录制水晶球时確認是本人的必要？你在说什么啊？」\s*$\s*^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4800',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4801',
        any: [
          /^\s*PRINTFORMW 「哈咕～…咿咕～…呜呜～…呜诶诶…这、这种事情………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4802',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头上染血的环在闪着光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4804',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4805',
        any: [
          /^\s*PRINTFORMW 「咕呜～为什么要做这种事…诶、这是为了录制水晶球时確認是本人的必要？你在说什么啊？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4807',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4808',
        any: [/^\s*PRINTFORMW 「啊～…嗯呜…不要做这种事…我…咕呜～………！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4809',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破开阴唇的穿环的痛苦而流下了眼泪………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4811',
        any: [/^\s*ELSEIF P == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4813',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4814',
        any: [/^\s*PRINTFORMW 「啊啊～…我、我的阴茎…被什么…被什么给…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4815',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎被环穿了个洞血流了出来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4817',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4820',
        any: [/^\s*ELSEIF P == 16\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4821',
        any: [/^\s*PRINTFORMW 「咿噗～…咿～…缩不粗话了（伸不直）」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4822',
        any: [
          /^\s*PRINTFORMW 为了好好固定住%SAVESTR:TARGET%的舌头不让它缩起来、将舌头拉直了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4823',
        any: [
          /^\s*PRINTFORMW 一看到一脸哭相的%SAVESTR:TARGET%就更加想虐待她了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4825',
        any: [/^\s*ELSEIF P == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4826',
        any: [/^\s*PRINTFORMW 「好痛…这样一来就暂时吃不了热的东西了…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4827',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%穿上环的唇在隐隐作痛………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4829',
        any: [/^\s*ELSEIF P == 64\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4829-4838',
        any: [
          /^\s*ELSEIF P == 64\s*$\s*^\s*PRINTFORMW 「不要再这样虐待我了…再这样我就………啊～…讨厌～不要看～！」\s*$\s*^\s*PRINTFORMW 拿开想遮住鼻子的%SAVESTR:TARGET%的手臂、好好地检查环是否穿好。\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%一边哭一边摇着头………\s*$\s*^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4830',
        any: [
          /^\s*PRINTFORMW 「不要再这样虐待我了…再这样我就………啊～…讨厌～不要看～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4831',
        any: [
          /^\s*PRINTFORMW 拿开想遮住鼻子的%SAVESTR:TARGET%的手臂、好好地检查环是否穿好。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4832',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%一边哭一边摇着头………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4833-4838',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;取り外し\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:348 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4836',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%抚摸着取下环后的伤痕………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4837-4838',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:348 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4838',
        any: [/^\s*CFLAG:348 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4838-4840',
        any: [/^\s*CFLAG:348 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4838-4842',
        any: [
          /^\s*CFLAG:348 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4838-4844',
        any: [
          /^\s*CFLAG:348 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4838-4846',
        any: [
          /^\s*CFLAG:348 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4850-5653',
        any: [
          /^\s*@DOG_KOJO_10\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦爱撫 CFLAG:301\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 0\s*$\s*^\s*;初めて\s*$\s*^\s*IF CFLAG:301 == 0\s*$\s*^\s*;屈服刻印Lv2以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4854',
        any: [/^\s*IF SELECTCOM == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4856',
        any: [/^\s*IF CFLAG:301 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4858',
        any: [/^\s*IF MARK:2 >= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4859',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4859-4864',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4862',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4862-4864',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4863-4868',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:301 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4864',
        any: [/^\s*CFLAG:301 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4866-4869',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4869',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4870',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4871',
        any: [/^\s*CFLAG:301 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4873',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4874',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4875',
        any: [/^\s*CFLAG:301 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4877',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4878',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4879',
        any: [/^\s*CFLAG:301 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4881',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4882',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4883',
        any: [/^\s*CFLAG:301 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4885',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4886',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4887',
        any: [/^\s*CFLAG:301 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4889',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4890',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4890-4894',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4890-4896',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4891',
        any: [/^\s*CFLAG:301 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4891-4898',
        any: [
          /^\s*CFLAG:301 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦舔阴 CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4893-4898',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦舔阴 CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4900',
        any: [/^\s*IF SELECTCOM == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4902',
        any: [/^\s*IF CFLAG:302 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4904',
        any: [/^\s*IF TALENT:TARGET:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4905',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4905-4910',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4908',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4908-4910',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4909-4914',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:302 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4910',
        any: [/^\s*CFLAG:302 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4912-4915',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4915',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4916',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4917',
        any: [/^\s*CFLAG:302 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4919',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4920',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4921',
        any: [/^\s*CFLAG:302 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4923',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4924',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4925',
        any: [/^\s*CFLAG:302 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4927',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4928',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4929',
        any: [/^\s*CFLAG:302 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4931',
        any: [/^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4932',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4932-4936',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4932-4938',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4932-4940',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:302 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4933',
        any: [/^\s*CFLAG:302 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4934-4941',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦胸爱撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4943',
        any: [/^\s*IF SELECTCOM == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4945',
        any: [/^\s*IF CFLAG:306 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4947',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4948',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4948-4953',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4951',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4951-4953',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4952-4957',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:306 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4953',
        any: [/^\s*CFLAG:TARGET:306 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4955-4958',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4958',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4959',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4960',
        any: [/^\s*CFLAG:306 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4962',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4963',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4964',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4966',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4967',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4968',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4970',
        any: [
          /^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4971',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4972',
        any: [/^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4974',
        any: [/^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4975',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4975-4979',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4975-4981',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4976',
        any: [/^\s*CFLAG:306 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4976-4983',
        any: [
          /^\s*CFLAG:306 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦キス CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4978-4983',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦キス CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4985',
        any: [/^\s*IF SELECTCOM == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4987',
        any: [/^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4989',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4990',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4992',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4993',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4994-5003',
        any: [
          /^\s*;爱慕\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4995',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4996',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4998-5003',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;（調教では）初めて\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '4999',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5000-5005',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;（調教では）初めて\s*$\s*^\s*ELSEIF CFLAG:307 == 0\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5001',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5004',
        any: [/^\s*ELSEIF CFLAG:307 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5006',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5007',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5009',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5010',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5011-5020',
        any: [
          /^\s*;爱慕\s*$\s*^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5012',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5013',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5015-5020',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5016',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5017-5022',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:307 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5018',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5020-5023',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5023',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5024',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5025',
        any: [/^\s*CFLAG:307 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5027',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5028',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5029',
        any: [/^\s*CFLAG:307 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5031',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5032',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5033',
        any: [/^\s*CFLAG:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5035',
        any: [
          /^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5036',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5037',
        any: [/^\s*CFLAG:307 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5039',
        any: [/^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5040',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5040-5044',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5040-5046',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5041',
        any: [/^\s*CFLAG:307 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5041-5048',
        any: [
          /^\s*CFLAG:307 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦舔肛 CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5043-5048',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦舔肛 CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5050',
        any: [/^\s*IF SELECTCOM == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5052',
        any: [/^\s*IF CFLAG:310 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5054',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5055',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5057',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5058',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5060',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5061',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5061-5066',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5064',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5064-5066',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5065-5070',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:310 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5066',
        any: [/^\s*CFLAG:TARGET:310 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5068-5071',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5071',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5072',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5073',
        any: [/^\s*CFLAG:310 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5075',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5076',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5077',
        any: [/^\s*CFLAG:310 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5079',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5080',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5081',
        any: [/^\s*CFLAG:310 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5083',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5084',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5085',
        any: [/^\s*CFLAG:310 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5087',
        any: [/^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5088',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5088-5092',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5088-5094',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5089',
        any: [/^\s*CFLAG:310 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5089-5096',
        any: [
          /^\s*CFLAG:310 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦背后位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5091-5096',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦背后位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5098',
        any: [/^\s*IF SELECTCOM == 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5100',
        any: [/^\s*IF CFLAG:TARGET:322 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5102',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5104',
        any: [/^\s*IF TALENT:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5105',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5107',
        any: [/^\s*ELSEIF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5108',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5110',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5110-5119',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5111',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5113-5119',
        any: [
          /^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5115',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5117-5120',
        any: [
          /^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5120',
        any: [/^\s*IF TALENT:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5121',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5123',
        any: [/^\s*ELSEIF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5124',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5126',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5126-5133',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5127',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5130',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5130-5133',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5130-5134',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5132-5137',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5133',
        any: [/^\s*CFLAG:322 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5135-5138',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5138',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5139',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5140',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5141',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5141-5146',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5142',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5144',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5145-5146',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5146',
        any: [/^\s*CFLAG:322 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5148',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5149',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5150',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5151',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5151-5156',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5152',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5154',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5154-5156',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5156',
        any: [/^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5158',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5159',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5160',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5161',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5161-5166',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5162',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5164',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5164-5166',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5166',
        any: [/^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5168',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5169',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5170',
        any: [/^\s*CFLAG:322 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5172',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5173',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5174',
        any: [/^\s*CFLAG:322 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5176',
        any: [/^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5177',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5177-5183',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5177-5185',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5179',
        any: [/^\s*CFLAG:322 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5179-5186',
        any: [
          /^\s*CFLAG:322 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦背后位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5181-5186',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦背后位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5188',
        any: [/^\s*IF SELECTCOM == 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5190',
        any: [/^\s*IF CFLAG:TARGET:328 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5192',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5193',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5195',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5196',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5198',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5199',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5199-5204',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5202',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5202-5204',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5203-5208',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:328 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5204',
        any: [/^\s*CFLAG:TARGET:328 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5207-5208',
        any: [/^\s*ELSE\s*$\s*^\s*;牝犬＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5209',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5210',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5210-5215',
        any: [
          /^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5211',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5213',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5213-5215',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5215',
        any: [/^\s*CFLAG:328 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5217',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5218',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5218-5223',
        any: [
          /^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5219',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5221',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5222-5223',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5223',
        any: [/^\s*CFLAG:328 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5225',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5226',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5226-5231',
        any: [
          /^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5227',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5229',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5229-5231',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:328 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5231',
        any: [/^\s*CFLAG:328 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5233',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5234',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5235',
        any: [/^\s*CFLAG:328 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5237',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5238',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5239',
        any: [/^\s*CFLAG:328 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5241',
        any: [/^\s*ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5242',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5242-5246',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5242-5248',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5243',
        any: [/^\s*CFLAG:328 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5243-5250',
        any: [
          /^\s*CFLAG:328 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5245-5250',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5252',
        any: [/^\s*IF SELECTCOM == 30\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5254',
        any: [/^\s*IF CFLAG:TARGET:331 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5256',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5257',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5259',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5260',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5262',
        any: [/^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5263',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5263-5268',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（侍奉精神Lv3未満）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:331 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5266',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5267-5268',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:331 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5267-5271',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:331 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5268',
        any: [/^\s*CFLAG:TARGET:331 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5271-5272',
        any: [/^\s*ELSE\s*$\s*^\s*;牝犬＋侍奉精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5273',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5274',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5274-5279',
        any: [
          /^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5275',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5277',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5278-5279',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5279',
        any: [/^\s*CFLAG:331 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5281',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5282',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5282-5287',
        any: [
          /^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5283',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5285',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5286-5287',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5287',
        any: [/^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5289',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5290',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5290-5295',
        any: [
          /^\s*IF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5291',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5293',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5293-5295',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:331 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5295',
        any: [/^\s*CFLAG:331 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5297',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5298',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5299',
        any: [/^\s*CFLAG:331 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5301',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5302',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5303',
        any: [/^\s*CFLAG:331 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5305',
        any: [/^\s*ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5306',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5306-5310',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5306-5312',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5307',
        any: [/^\s*CFLAG:331 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5307-5314',
        any: [
          /^\s*CFLAG:331 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦口交 CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5309-5314',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦口交 CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5316',
        any: [/^\s*IF SELECTCOM == 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5318',
        any: [/^\s*IF CFLAG:TARGET:332 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5320',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5321',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5323',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5324',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5326',
        any: [/^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5327',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5327-5332',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（侍奉精神Lv3未満）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:332 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5330',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5331-5332',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:332 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5331-5335',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:332 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5332',
        any: [/^\s*CFLAG:TARGET:332 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5334-5337',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬＋侍奉精神Lv5\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5337',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5338',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5339',
        any: [/^\s*CFLAG:332 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5341',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5342',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5343',
        any: [/^\s*CFLAG:332 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5345',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5346',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5347',
        any: [/^\s*CFLAG:332 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5349',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5350',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5351',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5352',
        any: [/^\s*CFLAG:332 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5354',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5355',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5356',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5357',
        any: [/^\s*CFLAG:332 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5359',
        any: [/^\s*ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5360',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5360-5364',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5360-5366',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5361',
        any: [/^\s*CFLAG:332 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5361-5368',
        any: [
          /^\s*CFLAG:332 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦骑乘位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5363-5368',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦骑乘位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5370',
        any: [/^\s*IF SELECTCOM == 34\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5372',
        any: [/^\s*IF CFLAG:TARGET:335 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5374',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5376',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5377',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5379',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5380',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5382',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5383',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5383-5388',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5384-5390',
        any: [
          /^\s*;それ以外（爱無し）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5386',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5388-5391',
        any: [
          /^\s*;非处女\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5391',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5392',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5394',
        any: [/^\s*ELSEIF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5395',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5397',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5397-5404',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5398',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5401',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5401-5404',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5401-5405',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5403-5408',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:335 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5404',
        any: [/^\s*CFLAG:TARGET:335 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5406-5409',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5409',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5410',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5411',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5412',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5412-5417',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5413',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5415',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5416-5417',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5417',
        any: [/^\s*CFLAG:335 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5419',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5420',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5421',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5422',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5423',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5424',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5424-5429',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5425',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5427',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5427-5429',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5429',
        any: [/^\s*CFLAG:335 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5431',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5432',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5433',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5434',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5435',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5436',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5436-5441',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5437',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5439',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5439-5441',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5441',
        any: [/^\s*CFLAG:335 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5443',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5444',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5445',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5446',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5447',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5448',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5448-5453',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5449',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5451',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5451-5453',
        any: [/^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:335 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5453',
        any: [/^\s*CFLAG:335 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5455',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5456',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5457',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5458',
        any: [/^\s*CFLAG:335 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5460',
        any: [/^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5461',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5461-5465',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5461-5467',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5462',
        any: [/^\s*CFLAG:335 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5462-5469',
        any: [
          /^\s*CFLAG:335 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦肛门侍奉 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5464-5469',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦肛门侍奉 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5471',
        any: [/^\s*IF SELECTCOM == 37\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5473',
        any: [/^\s*IF CFLAG:TARGET:338 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5475',
        any: [/^\s*IF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5476',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5476-5481',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外（侍奉精神Lv3未満）\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:338 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5479',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5480-5481',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:338 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5480-5484',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:338 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5481',
        any: [/^\s*CFLAG:TARGET:338 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5483-5486',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬＋侍奉精神Lv5\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5486',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5487',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5488',
        any: [/^\s*CFLAG:338 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5490',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5491',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5492',
        any: [/^\s*CFLAG:338 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5494',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5495',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5496',
        any: [/^\s*CFLAG:338 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5498',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5499',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5500',
        any: [/^\s*CFLAG:338 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5502',
        any: [/^\s*ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5503',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5503-5507',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:338 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5503-5509',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:338 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5504',
        any: [/^\s*CFLAG:338 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5504-5511',
        any: [
          /^\s*CFLAG:338 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦眼罩 CFLAG:344　CFLAG:444\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5506-5511',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦眼罩 CFLAG:344　CFLAG:444\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5514',
        any: [/^\s*IF SELECTCOM == 43 && TEQUIP:43\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5516',
        any: [/^\s*IF CFLAG:TARGET:344 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5518',
        any: [/^\s*IF TALENT:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5519',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5521',
        any: [/^\s*ELSEIF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5522',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5524',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5525',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5525-5530',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:344 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5528',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5529-5530',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:344 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5529-5533',
        any: [
          /^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:344 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5530',
        any: [/^\s*CFLAG:TARGET:344 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5532-5535',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*;牝犬\s*$\s*^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5535',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5536',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5537',
        any: [/^\s*CFLAG:TARGET:344 = 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5539',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5540',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5541',
        any: [/^\s*CFLAG:TARGET:344 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5543',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5544',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5545',
        any: [/^\s*CFLAG:TARGET:344 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5547',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5548',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5549',
        any: [/^\s*CFLAG:TARGET:344 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5551',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5552',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5553',
        any: [/^\s*CFLAG:TARGET:344 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5555',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5556',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5557',
        any: [/^\s*CFLAG:TARGET:344 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5559',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5560',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5561',
        any: [/^\s*CFLAG:TARGET:344 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5563',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5564',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5565',
        any: [/^\s*CFLAG:TARGET:344 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5567',
        any: [/^\s*ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5568',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5568-5572',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:TARGET:344 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5568-5574',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*CFLAG:TARGET:344 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5569',
        any: [/^\s*CFLAG:TARGET:344 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5570-5575',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;終了時\s*$\s*^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\s*^\s*;牝犬\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5574',
        any: [/^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5576',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5577',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5578',
        any: [/^\s*CFLAG:444 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5580',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5581',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5582',
        any: [/^\s*CFLAG:444 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5584',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:338 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5585',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5586',
        any: [/^\s*CFLAG:444 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5588',
        any: [/^\s*ELSEIF CFLAG:444 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5589',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5590',
        any: [/^\s*CFLAG:444 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5590-5592',
        any: [/^\s*CFLAG:444 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5590-5594',
        any: [
          /^\s*CFLAG:444 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5591-5596',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;獣姦会話 CFLAG:357\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5599',
        any: [/^\s*IF SELECTCOM == 56\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5601',
        any: [/^\s*IF CFLAG:357 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5602',
        any: [/^\s*IF TEQUIP:53\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5605',
        any: [/^\s*IF TALENT:TARGET:136 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5606',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5608',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5609',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5611',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5611-5617',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5612',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5615',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5615-5618',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5615-5619',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5616-5623',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:357 = 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*IF TEQUIP:53\s*$\s*^\s*;ビデオ自己紹介\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5618',
        any: [/^\s*CFLAG:357 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5620-5623',
        any: [
          /^\s*;二回目以降\s*$\s*^\s*ELSE\s*$\s*^\s*IF TEQUIP:53\s*$\s*^\s*;ビデオ自己紹介\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5622',
        any: [/^\s*IF TEQUIP:53\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5625',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5626',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5627',
        any: [/^\s*CFLAG:357 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5629',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5630',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5631',
        any: [/^\s*CFLAG:357 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5633',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5634',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5635',
        any: [/^\s*CFLAG:357 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5637',
        any: [/^\s*ELSEIF CFLAG:357 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5638',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5639',
        any: [/^\s*CFLAG:357 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5639-5641',
        any: [/^\s*CFLAG:357 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5639-5643',
        any: [
          /^\s*CFLAG:357 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5639-5645',
        any: [
          /^\s*CFLAG:357 = 2\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5640-5647',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5642-5647',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5645-5650',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5654-5948',
        any: [
          /^\s*@KOJO_MESSAGE_PALAMCNG_10\s*$\s*^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\s*^\s*SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5655-5660',
        any: [
          /^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\s*^\s*SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5658-5662',
        any: [
          /^\s*;口塞着用時には口上をスキップする\s*$\s*^\s*SIF TEQUIP:45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$\s*^\s*SIF TFLAG:899\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5662-5664',
        any: [
          /^\s*SIF TFLAG:899\s*$\s*^\s*RETURN 0\s*$\s*^\s*;崩坏した場合は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5665-5667',
        any: [
          /^\s*SIF TALENT:TARGET:9 == 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;兽奸PLAY中は口上をスキップする。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5666-5673',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;兽奸PLAY中は口上をスキップする。\s*$\s*^\s*SIF TEQUIP:89\s*$\s*^\s*RETURN 0\s*$\s*^\s*;触手調教中は口上をスキップする\s*$\s*^\s*SIF TEQUIP:90\s*$\s*^\s*RETURN 0\s*$\s*^\s*;死斗场中は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5671-5673',
        any: [
          /^\s*SIF TEQUIP:90\s*$\s*^\s*RETURN 0\s*$\s*^\s*;死斗场中は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5674-5677',
        any: [
          /^\s*SIF TEQUIP:55\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;パラメータ変動時のセリフ CFLAG 221～260を使用\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5682',
        any: [/^\s*P = PALAM:3 \+ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5683',
        any: [/^\s*IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5685',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5687',
        any: [/^\s*IF SELECTCOM == 50\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5688',
        any: [
          /^\s*PRINTFORMW 「呜嗯、被用了好几次润滑液了呢、不过这里的比我做的品质要好」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5689',
        any: [/^\s*PRINTFORMW ―――润滑初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5691-5692',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…啊啊～…嗯呜…被弄湿了…啊哈～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5692',
        any: [/^\s*PRINTFORMW 「啊～…啊啊～…嗯呜…被弄湿了…啊哈～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5693',
        any: [/^\s*PRINTFORMW ―――润滑初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5693-5695',
        any: [
          /^\s*PRINTFORMW ―――润滑初次超过了LV2。\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5696-5697',
        any: [/^\s*ELSE\s*$\s*^\s*;润滑液を使～た場合\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5698',
        any: [/^\s*IF SELECTCOM == 50\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5699',
        any: [
          /^\s*PRINTFORMW 「呜嗯、被用了好几次润滑液了呢、不过这里的比我做的品质要好」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5700',
        any: [/^\s*PRINTFORMW ―――润滑初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5702-5703',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…啊啊～…嗯呜…被弄湿了～呢…好、好羞耻………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5703',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…嗯呜…被弄湿了～呢…好、好羞耻………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5704',
        any: [/^\s*PRINTFORMW ―――润滑初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5704-5706',
        any: [
          /^\s*PRINTFORMW ―――润滑初次超过了LV2。\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5706-5707',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:221 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5707',
        any: [/^\s*CFLAG:TARGET:221 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5707-5709',
        any: [/^\s*CFLAG:TARGET:221 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5713',
        any: [/^\s*P = PALAM:5 \+ UP:5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5714',
        any: [/^\s*IF P > PALAMLV:2 && CFLAG:222 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5716',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5718',
        any: [/^\s*IF SELECTCOM == 51\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5719',
        any: [
          /^\s*PRINTFORMW 「嗯～…果然真正的媚药很有效呢…啊啊～…身体熱起来了～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5720',
        any: [/^\s*PRINTFORMW ―――欲情初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5722-5723',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…我已经…不得不想做了…呐、你懂得吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5723',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…我已经…不得不想做了…呐、你懂得吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5724',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎鼓胀地勃起来了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5725',
        any: [/^\s*PRINTFORMW ―――欲情初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5725-5727',
        any: [
          /^\s*PRINTFORMW ―――欲情初次超过了LV2。\s*$\s*^\s*ENDIF\s*$\s*^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5728-5729',
        any: [/^\s*ELSE\s*$\s*^\s*;媚药を使～た場合\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5730',
        any: [/^\s*IF SELECTCOM == 51\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5731',
        any: [
          /^\s*PRINTFORMW 「嗯～…果然真正的媚药很有效呢…啊啊～…身体熱起来了～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5732',
        any: [/^\s*PRINTFORMW ―――欲情初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5734-5735',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「嗯～…哈啊哈啊…还要…更多…更多～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5735',
        any: [/^\s*PRINTFORMW 「嗯～…哈啊哈啊…还要…更多…更多～………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5736',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%的阴茎鼓胀地勃起来了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5737',
        any: [/^\s*PRINTFORMW ―――欲情初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5737-5739',
        any: [
          /^\s*PRINTFORMW ―――欲情初次超过了LV2。\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5739-5740',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:222 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5740',
        any: [/^\s*CFLAG:222 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5740-5742',
        any: [/^\s*CFLAG:222 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5746',
        any: [/^\s*P = PALAM:8 \+ UP:8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5747',
        any: [/^\s*IF P > PALAMLV:2 && CFLAG:223 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5749',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5750',
        any: [/^\s*PRINTFORMW 「呜呜～…果然被你看着…好害羞呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5751',
        any: [/^\s*PRINTFORMW ―――耻情初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5753-5754',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORMW 「好、好害羞呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5754',
        any: [/^\s*PRINTFORMW 「好、好害羞呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5755',
        any: [/^\s*PRINTFORMW ―――耻情初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5756-5757',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:223 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5757',
        any: [/^\s*CFLAG:223 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5757-5759',
        any: [/^\s*CFLAG:223 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5763',
        any: [/^\s*P = PALAM:10 \+ UP:10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5764',
        any: [/^\s*IF P > PALAMLV:2 && CFLAG:224 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5766',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5767',
        any: [/^\s*PRINTFORMW 「噫～！不、不要…不要靠近我………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5768',
        any: [/^\s*PRINTFORMW ―――恐怖初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5770-5771',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不、不要…好可怕不要啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5771',
        any: [/^\s*PRINTFORMW 「不、不要…好可怕不要啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5772',
        any: [/^\s*PRINTFORMW ―――恐怖初次超过了LV2。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5773-5774',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:224 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5774',
        any: [/^\s*CFLAG:224 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5774-5776',
        any: [/^\s*CFLAG:224 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5780',
        any: [/^\s*IF NOWEX:0 > 0 && CFLAG:225 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5782',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5783',
        any: [
          /^\s*PRINTFORMW 「啊啊～…来、来了…要去了…有什么要来了～…！啊啊～…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5784',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为被阴茎刺激初次在%SAVESTR:PLAYER%面前绝顶了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5785',
        any: [
          /^\s*PRINTFORMW 「啊啊…高潮被看到啦…啊啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5787-5788',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…来、来了…要去了…有什么要来了～…！啊啊～…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5788',
        any: [
          /^\s*PRINTFORMW 「啊啊～…来、来了…要去了…有什么要来了～…！啊啊～…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5789',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为被阴茎刺激初次在%SAVESTR:PLAYER%面前绝顶了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5790',
        any: [/^\s*PRINTFORMW 「呜哇…啊…讨厌…好羞人…嗯～…啊啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5791-5792',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:225 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5792',
        any: [/^\s*CFLAG:225 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5792-5794',
        any: [/^\s*CFLAG:225 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5798',
        any: [/^\s*IF NOWEX:1 > 0 && CFLAG:226 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5800',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5801',
        any: [
          /^\s*PRINTFORMW 「啊啊～%UNICODE\(0x2661\) \*1% 小穴里有什么要出来了～%UNICODE\(0x2661\) \*3% 啊啊～…啊嘿～咿噫～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5802',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为对阴道的強烈刺激腰身一颤一颤地痙攣着。发出了美丽而高亢的娇喘声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5803',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊啊～！小穴要疯了～%UNICODE\(0x2661\) \*1% 小穴要不行了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5804',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像是初次阴道绝顶的样子、然后为了追求更多的快感%SAVESTR:TARGET%开始自己动起了腰………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5806',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5807',
        any: [
          /^\s*PRINTFORMW 「啊啊～%UNICODE\(0x2661\) \*1% 不要离开…哈啊啊～…我、我…啊啊～…高潮～了…高～潮了～…啊嘿～…咿～…啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5808',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为对阴道的強烈刺激腰身一颤一颤地痙攣着、好像初次用阴道绝顶了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5809',
        any: [
          /^\s*PRINTFORMW 「哈呼…呼…呼啊…%UNICODE\(0x2661\) \*1% 呐…继续吧…请让我变得更舒服吧…啊啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5811-5812',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…来了～…要去了～…呀～…不要…再这样下去…啊～…啊啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5812',
        any: [
          /^\s*PRINTFORMW 「哈啊～…来了～…要去了～…呀～…不要…再这样下去…啊～…啊啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5813',
        any: [
          /^\s*PRINTFORMW 好像%SAVESTR:TARGET%初次用阴道绝顶了的样子、因为充分的快感而陷入了呆愣状态。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5814',
        any: [
          /^\s*PRINTFORMW 「呼哇…啊…哈啊哈啊…啊嗯～…啊啊…哈啊…哈啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5815-5816',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:226 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5816',
        any: [/^\s*CFLAG:TARGET:226 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5818',
        any: [/^\s*ELSEIF NOWEX:1 > 0 && CFLAG:226 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5820',
        any: [/^\s*IF TALENT:TARGET:76 == 1 && TFLAG:60 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5821',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的小巧的身体因为快乐而颤动着。阴道口紧绷着很明显即将绝顶了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5822',
        any: [
          /^\s*PRINTFORMW 「啊啊～！小穴要高潮了…高潮了～…%UNICODE\(0x2661\) \*1% 啊～咿～…咿～啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5823',
        any: [
          /^\s*PRINTFORMW 「继续侵犯我…%UNICODE\(0x2661\) \*1% 好舒服…好喜欢…还要～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5824',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出陶醉的表情沉溺在了快乐之中………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5826',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && TFLAG:60 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5827',
        any: [
          /^\s*PRINTFORMW 「又、又来了～%UNICODE\(0x2661\) \*1% 求求你～不要离开我～啊啊～…啊啊～…呀啊啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5828',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的小巧的身体因为絶頂而颤动着、阴道口紧紧缠住了%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5829',
        any: [
          /^\s*PRINTFORMW 「啊嘿～…咿～…啊啊～…更多的…更多的抱我～…%UNICODE\(0x2661\) \*1% 啊啊啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5830',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%露出不像话的高潮脸沉浸在快乐之中………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5832',
        any: [/^\s*ELSEIF TFLAG:60 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5833',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～…又要去了…要去了…啊啊～…小、小穴要去了～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5834',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%阴道口紧缩着、发出了好像很爽的尖叫声。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5835',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…又、又被弄高潮了～呢…啊啊………♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5835-5837',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…又、又被弄高潮了～呢…啊啊………♪」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5835-5839',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…又、又被弄高潮了～呢…啊啊………♪」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5842',
        any: [/^\s*IF NOWEX:2 > 0 && CFLAG:227 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5844',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5845',
        any: [
          /^\s*PRINTFORMW 「哈啊啊～%UNICODE\(0x2661\) \*1% 肛门变得奇怪了～…%UNICODE\(0x2661\) \*1% 已、已经…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5846',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为肛门快感的余韵扭起了可爱的屁股。看上去肛门一颤一颤的即将高潮的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5847',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊～！肛门要疯了～…高潮了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5848',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像初次用肛门绝顶了的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5850',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5851',
        any: [
          /^\s*PRINTFORMW 「不、不行…再被这样弄下去我…就要～…哈啊～…哈啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5852',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%初次用肛门绝顶了的样子、可爱的屁股一颤一颤地痙攣扭动了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5853',
        any: [
          /^\s*PRINTFORMW 「啊啊…好像屁股的快感要觉醒了………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5855-5856',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…不～…不要啊～！明明不想用这么肮脏的地方高潮啊…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5856',
        any: [
          /^\s*PRINTFORMW 「啊～…不～…不要啊～！明明不想用这么肮脏的地方高潮啊…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5857',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为肛门快感的余韵扭起了可爱的屁股。看上去肛门一颤一颤的即将高潮的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5858',
        any: [
          /^\s*PRINTFORMW 「哈啊～…住手…再这样下去…啊啊～…啊～…！啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5859',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%好像初次用肛门绝顶了的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5860-5861',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:227 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5861',
        any: [/^\s*CFLAG:227 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5863',
        any: [/^\s*ELSEIF NOWEX:2 > 0 && CFLAG:227 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5865',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5866',
        any: [
          /^\s*PRINTFORMW 「好爽～…%UNICODE\(0x2661\) \*1% 肛门好爽～%UNICODE\(0x2661\) \*1% 再尽情操我～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5867',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%由于肛门絶頂发出了高亢的娇喘声。她的肛门已经完全变为性器了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5868',
        any: [
          /^\s*PRINTFORMW 「哈嘻～…嘻～…肛门好爽…好爽哦…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5870',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5871',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…啊啊…讨厌～屁股又要高潮了…嗯～…啊哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5872',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门在绝顶的快感下不断收缩着。可爱的屁股因为快感颤动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5873',
        any: [
          /^\s*PRINTFORMW 「这样…啊啊…好舒服啊…真是的…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5875-5876',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「再、再被这样弄下去的话…啊啊～…我…我的屁股要觉醒快感了～…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5876',
        any: [
          /^\s*PRINTFORMW 「再、再被这样弄下去的话…啊啊～…我…我的屁股要觉醒快感了～…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5877',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%迎来了快感的极限收紧了肛门、迎来了絶頂。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5878',
        any: [/^\s*PRINTFORMW 「呀啊～…啊啊～！啊啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5878-5880',
        any: [
          /^\s*PRINTFORMW 「呀啊～…啊啊～！啊啊啊～！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5878-5882',
        any: [
          /^\s*PRINTFORMW 「呀啊～…啊啊～！啊啊啊～！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5885',
        any: [/^\s*IF NOWEX:3 > 0 && CFLAG:228 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5887',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5888',
        any: [
          /^\s*PRINTFORMW 「啊～…再弄…再弄…啊～…来了～…要去了…啊啊…哈、啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5889',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头勃起到了前所未有的程度、在进一步地刺激下她发出了绝顶的呻吟。好像初次用乳头绝顶了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5890',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…还要…乳头…好舒服…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5892-5893',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…啊啊～…嗯～…乳头好舒服…啊…啊啊～…哈…啊啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5893',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…嗯～…乳头好舒服…啊…啊啊～…哈…啊啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5894',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的乳头勃起到了前所未有的程度、在进一步地刺激下她发出了绝顶的呻吟。好像初次用乳头绝顶了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5895',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…被别人的手弄高潮了～不过这样好爽………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5896-5897',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:228 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5897',
        any: [/^\s*CFLAG:TARGET:228 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5897-5899',
        any: [/^\s*CFLAG:TARGET:228 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5903',
        any: [/^\s*A = UP:11 \+ UP:12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5904',
        any: [/^\s*IF TFLAG:3 == 1 && CFLAG:229 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5906',
        any: [/^\s*IF TFLAG:20 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5908',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5909',
        any: [
          /^\s*PRINTFORMW 「哈啊啊啊…%UNICODE\(0x2661\) \*1% 处女被夺走了…%UNICODE\(0x2661\) \*1% 被諸悪的根源、身为侵略者的邪悪魔王给夺走啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5910',
        any: [
          /^\s*PRINTFORMW 「嗯？为什么摆出这幅表情哟…実際上不就是这样吗…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5911',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然承受着破瓜之痛但还是不管不顾地调皮地笑了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5912',
        any: [
          /^\s*PRINTFORMW 「撒～…如你所愿…我的身体被…哈啊～…陵辱了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5914',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5915',
        any: [
          /^\s*PRINTFORMW 「啊啊～！啊嗯～…啊～…啊啊啊…哈啊哈啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5916',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛而奄奄一息的样子。为了让她休息一下%SAVESTR:PLAYER%停止了动作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5917',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…呐、再稍微动一下也可以哦…呐、就这样不要离开…拜托咯………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5919',
        any: [/^\s*ELSEIF \(A < 500 \|\| TFLAG:150 == 1\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5920',
        any: [/^\s*PRINTFORMW 「哈呜～…咕…果然真是好痛呢………啊～…啊嗯～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5921',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛而难过的呻吟着、粘稠的血粘在了%SAVESTR:PLAYER%的阴茎上。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5922',
        any: [/^\s*PRINTFORMW 「………不过、想想以你为对象也还不错吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5923',
        any: [/^\s*PRINTFORMW 然后%SAVESTR:TARGET%小声地补充道………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5924-5925',
        any: [/^\s*ENDIF\s*$\s*^\s*;主人以外による处女喪失\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5925-5927',
        any: [
          /^\s*;主人以外による处女喪失\s*$\s*^\s*ELSE\s*$\s*^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5928',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5929',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…唔呼呼、这样一来就可以不用顾虑小穴尽情调教了呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5930',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%明明有着破瓜之痛却毫不在乎地开心的微笑起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5932',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5933',
        any: [/^\s*PRINTFORMW 「哈呜～…嗯～…能不能再温柔一点呢…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5934',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛皱起了眉头………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5936-5937',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咕～…嗯呜呜…啊啊…处女被夺走啦～真的很痛呢…呜～…咕呜～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5937',
        any: [
          /^\s*PRINTFORMW 「咕～…嗯呜呜…啊啊…处女被夺走啦～真的很痛呢…呜～…咕呜～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5938',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛流下泪来………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5938-5940',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛流下泪来………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5940-5941',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:TARGET:229 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5941',
        any: [/^\s*CFLAG:TARGET:229 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5941-5943',
        any: [/^\s*CFLAG:TARGET:229 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5949-6030',
        any: [
          /^\s*@KOJO_MESSAGE_MARKCNG_10\s*$\s*^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\s*^\s*SIF ASSI > 0 && ASSIPLAY\s*$\s*^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$\s*^\s*SIF TEQUIP:45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5952-5953',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5953-5957',
        any: [
          /^\s*;口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$\s*^\s*SIF TEQUIP:45\s*$\s*^\s*RETURN 0\s*$\s*^\s*;失神時には口上をスキップする\s*$\s*^\s*SIF TFLAG:899\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5957-5959',
        any: [
          /^\s*SIF TFLAG:899\s*$\s*^\s*RETURN 0\s*$\s*^\s*;兽奸PLAY中は口上をスキップする。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5958-5965',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;兽奸PLAY中は口上をスキップする。\s*$\s*^\s*SIF TEQUIP:89\s*$\s*^\s*RETURN 0\s*$\s*^\s*;触手調教中は口上をスキップする\s*$\s*^\s*SIF TEQUIP:90\s*$\s*^\s*RETURN 0\s*$\s*^\s*;崩坏した場合は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5963-5965',
        any: [
          /^\s*SIF TEQUIP:90\s*$\s*^\s*RETURN 0\s*$\s*^\s*;崩坏した場合は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5966-5968',
        any: [
          /^\s*SIF TALENT:TARGET:9 == 1\s*$\s*^\s*RETURN 0\s*$\s*^\s*;死斗场中は口上をスキップする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5969-5972',
        any: [
          /^\s*SIF TEQUIP:55\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;苦痛刻印Lv3取得 CFLAG:297\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5974',
        any: [/^\s*IF TFLAG:22 == 3 && CFLAG:297 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5976',
        any: [/^\s*IF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5977',
        any: [
          /^\s*PRINTFORMW 「啊啊～！我讨厌疼痛～…噫～…噫咿咿～…快、快住手…啊啊啊哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5978',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为剧烈的痛苦发出了悲鳴、这份疼痛将会再也忘不掉了吧………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5979-5980',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不、不要啊～！快停下～不要～！好痛啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5980',
        any: [
          /^\s*PRINTFORMW 「不、不要啊～！快停下～不要～！好痛啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5981',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为剧烈的痛苦发出了悲鳴、这份疼痛将会再也忘不掉了吧………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5982-5983',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:297 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5983',
        any: [/^\s*CFLAG:297 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5983-5985',
        any: [/^\s*CFLAG:297 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5989',
        any: [/^\s*IF TFLAG:23 == 3 && CFLAG:298 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5991',
        any: [/^\s*IF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5992',
        any: [
          /^\s*PRINTFORMW 「哈嘻～…嘻～…啊啊啊…你带来的快乐…要刻在身体里了………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5993',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的脸上充满了快乐陶醉般地呼着热气………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5994-5995',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～…哈啊啊～…我…我…被做了这么快乐的事情…再也忘不掉了呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5995',
        any: [
          /^\s*PRINTFORMW 「啊～…哈啊啊～…我…我…被做了这么快乐的事情…再也忘不掉了呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5996',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的脸上充满了快乐陶醉般地呼着热气………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5997-5998',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:298 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5998',
        any: [/^\s*CFLAG:298 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '5998-6000',
        any: [/^\s*CFLAG:298 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6004',
        any: [/^\s*IF TFLAG:24 == 3 && CFLAG:299 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6005',
        any: [
          /^\s*PRINTFORMW 「啊…啊啊…不要再这样残酷地对我了…我什么都会做的…啊啊…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6006',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%在不断的調教下完全屈服了的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6007',
        any: [/^\s*CFLAG:299 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6007-6009',
        any: [/^\s*CFLAG:299 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6013',
        any: [/^\s*IF TFLAG:21 == 3 && CFLAG:300 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6015',
        any: [/^\s*IF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6016',
        any: [/^\s*PRINTFORMW 「不要～！不想再看到你的脸～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6017',
        any: [
          /^\s*PRINTFORMW 泪水从%SAVESTR:TARGET%充满愤怒的眼中流了出来。好像完全被讨厌了的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6018',
        any: [/^\s*PRINTFORMW 「…………为什么要这样做…我应该没有做错事啊…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6019-6020',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咕～………呜呜～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6020',
        any: [/^\s*PRINTFORMW 「咕～………呜呜～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6021',
        any: [/^\s*PRINTFORMW 「呜、呜呜～、我没事…请不要在意…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6022',
        any: [
          /^\s*PRINTFORMW （讨厌、明明做好覚悟了但被魔王碰到还是觉得很讨厌………）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6023-6024',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:300 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6024',
        any: [/^\s*CFLAG:300 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6024-6026',
        any: [/^\s*CFLAG:300 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6031-6478',
        any: [
          /^\s*@SELF_KOJO_K10\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;調教後自慰 CFLAG:261\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF TFLAG:13 == 1\s*$\s*^\s*;崩坏してしま～た場合\s*$\s*^\s*IF TALENT:9 == 1\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%像被玩壊的玩具似的撸着自己的阴茎自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6035',
        any: [/^\s*IF TFLAG:13 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6037',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6038',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像被玩壊的玩具似的撸着自己的阴茎自慰着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6041',
        any: [/^\s*ELSEIF CFLAG:657 >= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6043',
        any: [/^\s*CFLAG:657 -= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6045',
        any: [/^\s*Q = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6046',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6047',
        any: [
          /^\s*PRINTFORMW 不、不是在想%CALLNAME:MASTER%而是一边在想狂王一边自慰着的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6049',
        any: [/^\s*IF TALENT:76 == 1 && TALENT:TARGET:74 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6050',
        any: [
          /^\s*PRINTFORMW 「哈啊～%UNICODE\(0x2661\) \*1% 哈啊～%UNICODE\(0x2661\) \*1% 被狂王大人和魔王大人尽情的抱过了～…我的身体已经…再也变不回去了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6051',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边撸着阴茎一边用手抠着小穴、在激烈的自慰下弓起了腰、在床上化作了一条美丽的桥梁。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6052',
        any: [
          /^\s*PRINTFORMW 「啊啊～！好爽～好爽啊～%UNICODE\(0x2661\) \*1% 肉棒和小穴全部～%UNICODE\(0x2661\) \*1% 全部都好爽～%UNICODE\(0x2661\) \*1% 好想被狂王大人尽情地抱～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6053',
        any: [
          /^\s*PRINTFORMW 前列腺液和爱液从%SAVESTR:TARGET%的阴茎和小穴中大量迸发出来弄脏了床铺。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6054',
        any: [
          /^\s*PRINTFORMW 「哦～哦吼哦…哦～…哦～…哦吼哦………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6056',
        any: [/^\s*ELSEIF TALENT:85 == 1 && TALENT:TARGET:74 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6057',
        any: [
          /^\s*PRINTFORMW 「呜呼～呼～嗯呼呜～%UNICODE\(0x2661\) \*1% 撸鸡鸡撸得停不下来了…好想被狂王大人抱～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6058',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边撸着阴茎一边摩擦着小穴、混杂着爱液和精液的前列腺液把床弄脏了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6059',
        any: [
          /^\s*PRINTFORMW 「被魔王大人抱～！被宠爱～！明明应该很爽～！却还是忘不了狂王大人的家伙～%UNICODE\(0x2661\) \*1% 啊～啊～哈啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6060',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%流着眼泪反复这样说着、她的両手直到絶頂前都停不下来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6061',
        any: [
          /^\s*PRINTFORMW 「对不起～对不起～…哈啊～去～了…去～了～高～…高潮了～～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6063',
        any: [/^\s*ELSEIF TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6064',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…一边想着狂王大人的家伙一边撸鸡鸡根本停不下来啊～%UNICODE\(0x2661\) \*1% 啊嗯～啊啊嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6065',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%在床上把双腿张得大大的并撸起了阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6066',
        any: [
          /^\s*PRINTFORMW 她的肚子上出现了\{A\}回分量的精液弄成的水洼。时不时%SAVESTR:TARGET%会捧起这些精液一边舔一边继续自慰。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6067',
        any: [
          /^\s*PRINTFORMW 「嗯～啊啊～嗯～…狂王大人～%UNICODE\(0x2661\) \*1% 狂王大人～%UNICODE\(0x2661\) \*1% 让我变得更爽吧～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6069',
        any: [/^\s*ELSEIF TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6070',
        any: [
          /^\s*PRINTFORMW 「嗯呼呜…嗯～嗯～…哈啊哈啊…比起魔王大人的…狂王大人的更好～%UNICODE\(0x2661\) \*1% 啊～啊～啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6071',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%不断地撸着已经被精液弄脏的阴茎、喘着热气。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6072',
        any: [
          /^\s*PRINTFORMW 「啊啊～…明明被魔王大人抱了～！却还是想着狂王大人的…这样的…啊～…哈啊啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6074-6075',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…狂王大人…狂王大人…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6075',
        any: [/^\s*PRINTFORMW 「哈啊～…狂王大人…狂王大人…♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6076',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边喘着热气一边激烈地撸着阴茎………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6077-6078',
        any: [/^\s*ENDIF\s*$\s*^\s*;0になると満足\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6079',
        any: [/^\s*IF  CFLAG:657 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6080',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6081',
        any: [
          /^\s*PRINTFORMW 好像%SAVESTR:TARGET%对狂王的狂热情绪已经平静下来了的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6082-6083',
        any: [
          /^\s*ENDIF\s*$\s*^\s*;爱がなくかつ助手とのレズセックス後なら百合气质×20%で助手\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6084',
        any: [/^\s*ELSEIF Q == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6085',
        any: [/^\s*PRINTFORMW 「啊～…啊嗯～…蕾丝交真好～…啊啊……啊嗯～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6086',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像想要寻找%SAVESTR:ASSI%的余烬似的用手指摸向了私处………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6088',
        any: [/^\s*ELSEIF Q == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6089',
        any: [
          /^\s*PRINTFORMW 「下次什么时候才能再和那条野狗做爱呢…啊啊…嗯～…啊啊…嗯～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6090',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用自己的手指自慰着但完全无法满足的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6092-6093',
        any: [/^\s*ELSE\s*$\s*^\s*;淫乱＆自慰狂\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6094',
        any: [
          /^\s*IF TALENT:76 && TALENT:74 == 1 && \(CFLAG:261 < 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6095',
        any: [
          /^\s*PRINTFORMW 「啊啊嗯～…啊～啊啊～…太棒了～%UNICODE\(0x2661\) \*1% 太棒了～%UNICODE\(0x2661\) \*1% 想着魔王大人并自慰真是太棒了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6096',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边撸着阴茎一边用手抠着秘穴、在激烈的自慰下弓起了腰、在床上化作了一条美丽的桥梁。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6097',
        any: [
          /^\s*PRINTFORMW 「啊嗯～啊嗯～%UNICODE\(0x2661\) \*1% 啊啊嗯～%UNICODE\(0x2661\) \*1% 一边啾啾地吸吮着魔王大人的后颈一边撸鸡鸡真爽～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6098',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边叫嚷着隐藏的願望一边反复激烈自慰着。\\@\(A > 1\) \? 射精多次后 # 射精后\\@精液涂满了阴茎、用手抠着秘穴。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6099',
        any: [
          /^\s*PRINTFORMW 「哦吼～…哦～哦～…啊哦哦哦～%UNICODE\(0x2661\) \*1% 咿咿咿～%UNICODE\(0x2661\) \*1% 咿咿咿咿咿～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6100',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%癫狂地叫唤着完全沉浸在了自慰之中………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6101',
        any: [/^\s*CFLAG:261 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6103',
        any: [
          /^\s*ELSEIF TALENT:85 && TALENT:74 == 1 && \(CFLAG:261 < 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6104',
        any: [
          /^\s*PRINTFORMW 「啊啊嗯～…嗯～…啊嗯～…%UNICODE\(0x2661\) \*1% 明明知道那样抱我会让我变得奇怪的…你真坏%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6105',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边激烈的撸着鸡鸡一边呻吟着。\\@\(A > 1\) \? 迎来多次絶頂的 # 迎来絶頂的\\@阴茎丝毫没有萎下去的迹象。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6106',
        any: [
          /^\s*PRINTFORMW 「啊哈～哈啊哈啊…啊啊嗯～魔王大人～魔王大人～%UNICODE\(0x2661\) \*1% 啊～啊～啊哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6107',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边激烈地撸着涂满精液的阴茎一边不断发出兴奋的声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6108',
        any: [
          /^\s*PRINTFORMW 「哈啊～哈啊～%UNICODE\(0x2661\) \*1% 好爽～好爽哦～…最喜欢撸鸡鸡了…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6109',
        any: [/^\s*CFLAG:261 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6111',
        any: [
          /^\s*ELSEIF TALENT:76 && \(CFLAG:261 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6112',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…哈啊～…鸡鸡好舒服啊～…啊～…啊～…咕呜～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6113',
        any: [
          /^\s*PRINTFORMW 因为%SAVESTR:TARGET%不断絶頂、周围布满了精液水洼。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6114',
        any: [
          /^\s*PRINTFORMW 「为什么…前面的话…本来明明这样弄很快就可以満足的入睡了啊…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6115',
        any: [
          /^\s*PRINTFORMW 「不行…还要继续自慰…呜…哈啊～…啊嗯～…啊哈啊啊%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6116',
        any: [/^\s*CFLAG:261 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6118',
        any: [
          /^\s*ELSEIF TALENT:85 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6119',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…嗯～…啊啊～…嗯～！哈啊哈啊…啊啊…我明明刚刚还被那个人抱过的…哈啊～…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6120',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%自慰地停不下来的样子、撸着勃起变硬的阴茎\\@\(A > 1\) \? 不断迎来絶頂 # 迎来絶頂\\@。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6121',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～啊哈啊～%UNICODE\(0x2661\) \*1% 讨厌…手停不下来………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6122',
        any: [
          /^\s*PRINTFORMW 「哈啊～不继续抱我的你好坏啊～…哈啊～又要高潮了～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6123',
        any: [/^\s*CFLAG:261 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6125',
        any: [
          /^\s*ELSEIF TALENT:74 == 1 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6126',
        any: [
          /^\s*PRINTFORMW 「嗯嗯呜～…好棒～…自慰好棒～…啊～啊哈啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6127',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%激烈地撸着阴茎并摩擦着秘穴。身体痙攣起来的%SAVESTR:TARGET%渐渐弓起了腰化作了一条桥。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6128',
        any: [
          /^\s*PRINTFORMW 「嗯吼呜～…哦～哦哦～♪ 这样射精的话…我、我的脸会～被射到的…啊～哈啊～啊哈啊～！！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6129',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%发出絶頂的叫声的同時、从阴茎喷出了大量的精液、这些精液把%SAVESTR:TARGET%的脸染得一片雪白………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6130',
        any: [/^\s*CFLAG:261 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6132',
        any: [
          /^\s*ELSEIF ABL:31 >= 3 && \(CFLAG:261 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6133',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…嗯～…撸管好爽啊～♪ 好想一直撸下去…哈啊～啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6134',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%撸着自己的勃起变硬的阴茎、比平常更加激烈的样子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6135',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…啊啊～…哈啊～…高潮了…高潮了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6136',
        any: [/^\s*CFLAG:261 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6138',
        any: [/^\s*ELSEIF CFLAG:261 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6139',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…虽然…还不太熟悉…为什么这样做…这样自慰会停不下来呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6140',
        any: [/^\s*PRINTFORMW 「呜啊～…又、又出来了～！」」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6141',
        any: [/^\s*CFLAG:261 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6141-6143',
        any: [/^\s*CFLAG:261 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6141-6145',
        any: [
          /^\s*CFLAG:261 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6142-6147',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;レズプレイ CFLAG:262\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6149',
        any: [/^\s*IF TFLAG:13 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6151',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6152',
        any: [/^\s*PRINTFORMW 「啊呼…啊…啊啊…啊呜…呜呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6153',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ASSI%享受着与壊掉的%SAVESTR:TARGET%的蕾丝PLAY………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6155',
        any: [
          /^\s*ELSEIF TALENT:76 && \(CFLAG:262 < 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6156',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊嗯～…来吧…让你更加舒服吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6157',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用小巧的身体将%SAVESTR:ASSI%推倒、一边从上方不断降下雨点般的亲吻一边用阴茎摩擦起了对方的下腹部。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6158',
        any: [
          /^\s*PRINTFORMW 「就这样侵犯你也可以哦…诶？不要？真拿你没办法呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6159',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇并用她那变得粘糊糊的手开始摸起了%SAVESTR:ASSI%的敏感部位。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6160',
        any: [
          /^\s*PRINTFORMW 「来嘛、忍不住了的话随时都可以说哦………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6161',
        any: [/^\s*CFLAG:262 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6163',
        any: [
          /^\s*ELSEIF TALENT:85 && \(CFLAG:262 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6164',
        any: [
          /^\s*PRINTFORMW 「不、不要啊…再这样下去…要出轨了啊…啊～…啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6165',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边拒绝着一边渐渐也无法抵抗%SAVESTR:ASSI%对阴茎的爱抚。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6166',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…讨厌～不要看…啊～…高潮了…高潮了～………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6167',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%就这样推倒、享受了一段濃厚的時光………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6168',
        any: [/^\s*CFLAG:262 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6170',
        any: [
          /^\s*ELSEIF ABL:33 >= 3 && \(CFLAG:262 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6171',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…小穴互相摩擦着真爽啊～…啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6172',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%互相摩擦着秘穴、用松葉崩的体位快活着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6173',
        any: [
          /^\s*PRINTFORMW 「嗯呼呜…呼呼…这样子也很舒服呢…哈啊哈啊…啊嗯～…再用力点摩擦…哈啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6174',
        any: [/^\s*CFLAG:262 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6176',
        any: [
          /^\s*ELSEIF ABL:22 >= 3 && \(CFLAG:262 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6177',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、不会插你的、安心吧…啊～…啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6178',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%用阴茎摩擦着%SAVESTR:ASSI%的腹部享受着对方的反応的样子………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6179',
        any: [/^\s*CFLAG:262 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6181',
        any: [/^\s*ELSEIF CFLAG:262 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6182',
        any: [
          /^\s*PRINTFORMW 「啊～…嗯～…呜嗯…那里、好舒服…啊嗯～…啊…哈啊哈啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6183',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%任%SAVESTR:ASSI%为所欲为………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6184',
        any: [/^\s*CFLAG:262 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6184-6186',
        any: [/^\s*CFLAG:262 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6184-6188',
        any: [
          /^\s*CFLAG:262 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6191',
        any: [/^\s*IF TFLAG:13 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6193',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6194',
        any: [
          /^\s*PRINTFORMW 「啊呼…嗯…嘞噜…嘞噜嘞噜嘞噜嘞噜嘞噜嘞噜嘞噜嘞噜…………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6195',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%痴痴地不断舔舐着阴茎………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6197',
        any: [
          /^\s*ELSEIF TALENT:76 == 1 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6198',
        any: [
          /^\s*PRINTFORMW 「咕啾……嘞噜嘞噜…啊、变大了呢、早上好%UNICODE\(0x2661\) \*1% 嘞噜…啾～啾噗～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6199',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%纠缠不休的舔舐着射精过的%SAVESTR:PLAYER%的阴茎、慢慢地把它弄干净。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6200',
        any: [
          /^\s*PRINTFORMW 「噗啊………一大早就这么精神呢…是在引诱我吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6201',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%微微一笑再次开始了口腔奉仕。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6202',
        any: [
          /^\s*PRINTFORMW 「嗯咻噜～…嘞噜%UNICODE\(0x2661\) \*1% 在我的嘴里…更多地射出来吧%UNICODE\(0x2661\) \*1% 嘞噜嘞噜…啾噗%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6203',
        any: [/^\s*CFLAG:263 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6205',
        any: [
          /^\s*ELSEIF TALENT:85 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6206',
        any: [
          /^\s*PRINTFORMW 「早安、亲爱的%UNICODE\(0x2661\) \*1% 唔呼呼、明明本来只是想问个早的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6207',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%怜爱的擦拭着%SAVESTR:PLAYER%的阴茎。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6208',
        any: [
          /^\s*PRINTFORMW 「一看到它这么精神…我就按捺不住了呢…嗯…咕啾…嗯噗…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6209',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%开始含住%SAVESTR:PLAYER%的阴茎、就这样被在喉咙里面射精了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6210',
        any: [
          /^\s*PRINTFORMW 「哈噗～…嗯～…嗯噗呜…多射点…我会全部喝下去的…嗯～嗯～嗯噗呜～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6211',
        any: [/^\s*CFLAG:263 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6213',
        any: [
          /^\s*ELSEIF ABL:16 >= 5 && \(CFLAG:263 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6214',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…嗯啾～…啾噗…啾…唔呼呼、因为一大清早就这么精神…噗噜～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6215',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%开心的对%SAVESTR:PLAYER%的阴茎做事后处理。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6216',
        any: [/^\s*PRINTFORMW 「啊哈…哈啊哈啊…变得更舒服吧…啾～啾呜呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6217',
        any: [/^\s*CFLAG:263 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6219',
        any: [/^\s*ELSEIF CFLAG:263 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6220',
        any: [
          /^\s*PRINTFORMW 「嗯～…啊哈…哈啊…啊、早安…正含着你的呢…嗯咻噜…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6221',
        any: [
          /^\s*PRINTFORMW 「哈姆～…嗯～…就这样射出来也行哦…嗯呜…嘞噜♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6222',
        any: [/^\s*CFLAG:263 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6222-6224',
        any: [/^\s*CFLAG:263 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6222-6226',
        any: [
          /^\s*CFLAG:263 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6229',
        any: [/^\s*IF TFLAG:13 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6231',
        any: [/^\s*IF ABL:2 >= 4 && \(CFLAG:264 < 2 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6232',
        any: [
          /^\s*PRINTFORMW 「啊啊～…嗯～…再抱我…哈啊～…不要离开…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6233',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%压住持续被侵犯着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6234',
        any: [
          /^\s*PRINTFORMW 但是%SAVESTR:TARGET%任%SAVESTR:PLAYER%为所欲为、从不为調教的做爱中感到了愉悦。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6235',
        any: [
          /^\s*PRINTFORMW 「哈～…哈啊…你的…啊～…哈啊～%UNICODE\(0x2661\) \*1% …在我的小穴里…塞得满满的～感觉到了…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6236',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%曾经狭小的秘穴在%SAVESTR:PLAYER%的開発下已经可以完全插进底部了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6237',
        any: [
          /^\s*PRINTFORMW 「啊啊～…啊嗯～…哈啊～…继续抱我…我…被你抱着感到好幸福…啊～啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6239',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被中出\{s\}回露出了満足的表情………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6240',
        any: [/^\s*CFLAG:264 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6242',
        any: [/^\s*ELSEIF CFLAG:264 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6243',
        any: [
          /^\s*PRINTFORMW 「啊～…你…哈啊～…嗯～…呼啊…好深…啊～啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6244',
        any: [
          /^\s*PRINTFORMW %SAVESTR:PLAYER%完全为自身泄欲而抱住了%SAVESTR:TARGET%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6245',
        any: [
          /^\s*PRINTFORMW 不以調教为目的的做爱。被按在床上、阴道深处不断被疼爱的%SAVESTR:TARGET%娇喘了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6246',
        any: [
          /^\s*PRINTFORMW 「啊啊～…好棒～…你…好激烈啊…啊嗯～…哈啊～…啊～…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6247',
        any: [
          /^\s*PRINTFORMW 然后在结束时往%SAVESTR:TARGET%的两腿之间播撒了\{s\}回份的精液………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6248',
        any: [/^\s*CFLAG:264 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6248-6250',
        any: [/^\s*CFLAG:264 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6248-6252',
        any: [
          /^\s*CFLAG:264 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6255',
        any: [/^\s*IF TFLAG:13 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6256',
        any: [/^\s*IF CFLAG:265 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6257',
        any: [
          /^\s*IF TALENT:9 == 1 && \(CFLAG:265 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6258',
        any: [/^\s*PRINTFORMW 「啊呼…呼啊…啊啊…啊啊………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6259',
        any: [
          /^\s*PRINTFORMW 坏掉的%SAVESTR:TARGET%想要被自己的主人抱，潜入了%SAVESTR:MASTER%的房间………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6260',
        any: [/^\s*CFLAG:265 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6261-6262',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「晚上好…唔呼呼、来抱你了哟…不和你肌肤相亲的话人家会睡不着呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6262',
        any: [
          /^\s*PRINTFORMW 「晚上好…唔呼呼、来抱你了哟…不和你肌肤相亲的话人家会睡不着呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6263',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%脸颊染上了红色、不给你回答的机会就钻入了被窝。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6264',
        any: [
          /^\s*PRINTFORMW 「呐、所以说…请好好疼爱人家吧………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6265',
        any: [/^\s*CFLAG:265 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6265-6267',
        any: [/^\s*CFLAG:265 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6265-6269',
        any: [
          /^\s*CFLAG:265 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6266-6271',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;売却\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6273',
        any: [/^\s*IF TFLAG:13 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6275',
        any: [/^\s*IF TALENT:85 && MARK:3 < 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6276',
        any: [
          /^\s*PRINTFORMW 「小孩子的时候…有个占卜师曾经说过呢”总有一天你的面前会出现两个王、哪边是通往地狱的大门、要好好选择啊”」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6277',
        any: [
          /^\s*PRINTFORMW 「算上狂王那时候的话…果然你是地狱的门呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6278',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%悲伤地眯起了眼睛，不让泪水流出来。那湿润的瞳孔里你的形象越来越模糊了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6279',
        any: [/^\s*PRINTFORMW 「………最后的最后赌输了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6281',
        any: [/^\s*ELSEIF MARK:3 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6282',
        any: [/^\s*PRINTFORMW 「果然、不曾和你见面更好呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6283',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%吐出了这样一句意味深长的话，转身登上了马车………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6285',
        any: [/^\s*ELSEIF TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6286',
        any: [
          /^\s*PRINTFORMW 「诶、骗、骗人吧…把人家卖掉什么是玩笑吧？啊哈哈…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6287',
        any: [
          /^\s*PRINTFORMW 「比人家好的扶她肉棒不可能有的吧！不、不要…放开我…不要啊…人家才不会被卖掉！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6288',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%哭泣挣扎着被奴隶商人押上了马车………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6290-6291',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORMW 「这样啊…被卖掉了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6291',
        any: [/^\s*PRINTFORMW 「这样啊…被卖掉了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6292',
        any: [/^\s*PRINTFORMW 「果然…还是不行……呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6292-6294',
        any: [
          /^\s*PRINTFORMW 「果然…还是不行……呢」\s*$\s*^\s*ENDIF\s*$\s*^\s*PRINTL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6294',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6296',
        any: [/^\s*CALL SELL_MATURO_K0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6296-6298',
        any: [/^\s*CALL SELL_MATURO_K0\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6302',
        any: [/^\s*IF TFLAG:13 == 11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6303',
        any: [/^\s*IF CFLAG:271 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6305',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6306',
        any: [/^\s*PRINTFORMW 「啊哈哈…啊啊…肚子里…有什么东西…啊啊啊～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6307',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%流着口水一副痴呆的样子………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6309',
        any: [/^\s*ELSEIF TALENT:85 && CFLAG:102 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6310',
        any: [
          /^\s*PRINTFORMW 「呐啊、已经确认有了你的孩子呢、人家…稍微有些紧张…身体…不是很有自信能养好它呐………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6311',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:MASTER%倾诉着妊娠后的不安………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6313',
        any: [/^\s*ELSEIF CFLAG:102 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6314',
        any: [
          /^\s*PRINTFORMW 「虽然不用向你报告…好像有了%CSTR:2%的孩子………唔、总觉得知道父亲是谁………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6315',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:MASTER%报告妊娠情况………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6317',
        any: [/^\s*ELSEIF CFLAG:102 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6318',
        any: [
          /^\s*PRINTFORMW 「虽然不用向你报告…好像有了%CSTR:2%的孩子………唔、总觉得知道父亲是谁………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6319',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:MASTER%报告妊娠情况………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6321',
        any: [/^\s*ELSEIF CFLAG:102 == 5 && TALENT:136 && CFLAG:1 != 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6322',
        any: [
          /^\s*PRINTFORMW 「怀了狗的孩子呢…啊啊、人家的身体已经变成牝犬什么的终于有了实感呢♪\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6324',
        any: [/^\s*ELSEIF CFLAG:102 == 5 && CFLAG:1 != 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6325',
        any: [/^\s*PRINTFORMW 「骗、骗人…有了那条狗的孩子…为什么…………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6327',
        any: [/^\s*ELSEIF CFLAG:102 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6327-6334',
        any: [
          /^\s*ELSEIF CFLAG:102 == 7\s*$\s*^\s*PRINTFORMW 「人家有了狂王大人的孩子呢…」\s*$\s*^\s*;その他\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呼、做了那样的事…怀孕了呢………」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:271 = 1\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6328',
        any: [/^\s*PRINTFORMW 「人家有了狂王大人的孩子呢…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6331',
        any: [/^\s*PRINTFORMW 「呼、做了那样的事…怀孕了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6331-6334',
        any: [
          /^\s*PRINTFORMW 「呼、做了那样的事…怀孕了呢………」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:271 = 1\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6333',
        any: [/^\s*CFLAG:271 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6334-6335',
        any: [/^\s*ELSE\s*$\s*^\s*;崩坏してしま～た場合\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6336',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6337',
        any: [/^\s*PRINTFORMW 「啊哈哈…啊啊…肚子里…有什么东西…啊啊啊～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6338',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%流着口水一副痴呆的样子………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6340',
        any: [/^\s*ELSEIF TALENT:85 && CFLAG:102 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6341',
        any: [
          /^\s*PRINTFORMW 「呐啊、已经确认有了你的孩子呢、人家…稍微有些紧张…身体…不是很有自信能养好它呐………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6342',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:MASTER%倾诉着妊娠后的不安………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6344',
        any: [/^\s*ELSEIF CFLAG:102 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6345',
        any: [
          /^\s*PRINTFORMW 「虽然不用向你报告…好像有了%CSTR:2%的孩子………唔、总觉得知道父亲是谁………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6346',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:MASTER%报告妊娠情况………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6348',
        any: [/^\s*ELSEIF CFLAG:102 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6349',
        any: [
          /^\s*PRINTFORMW 「虽然不用向你报告…好像有了%CSTR:2%的孩子………唔、总觉得知道父亲是谁………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6350',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:MASTER%报告妊娠情况………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6352',
        any: [/^\s*ELSEIF CFLAG:102 == 5 && TALENT:136 && CFLAG:1 != 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6353',
        any: [
          /^\s*PRINTFORMW 「怀了狗的孩子呢…啊啊、人家的身体已经变成牝犬什么的终于有了实感呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6355',
        any: [/^\s*ELSEIF CFLAG:102 == 5 && CFLAG:1 != 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6356',
        any: [/^\s*PRINTFORMW 「骗、骗人…有了那条狗的孩子…为什么…………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6358',
        any: [/^\s*ELSEIF CFLAG:102 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6358-6365',
        any: [
          /^\s*ELSEIF CFLAG:102 == 7\s*$\s*^\s*PRINTFORMW 「人家有了狂王大人的孩子呢…」\s*$\s*^\s*;その他\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呼、做了那样的事…怀孕了呢………」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:271 = 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6359',
        any: [/^\s*PRINTFORMW 「人家有了狂王大人的孩子呢…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6362',
        any: [/^\s*PRINTFORMW 「呼、做了那样的事…怀孕了呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6362-6365',
        any: [
          /^\s*PRINTFORMW 「呼、做了那样的事…怀孕了呢………」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:271 = 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6364',
        any: [/^\s*CFLAG:271 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6364-6366',
        any: [/^\s*CFLAG:271 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6364-6368',
        any: [/^\s*CFLAG:271 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6372',
        any: [/^\s*IF TFLAG:13 == 12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6373',
        any: [/^\s*IF CFLAG:272 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6375',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6376',
        any: [/^\s*PRINTFORMW 「啊…啊呜…呜呜………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6377',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对自己生的孩子完全没有兴趣………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6379',
        any: [/^\s*ELSEIF TALENT:85 && CFLAG:102 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6380',
        any: [
          /^\s*PRINTFORMW 「是你的孩子哟…唔呼呼。唔嗯、非常有精神呢、很快连周边巡逻这样的事情也能做了吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6380-6387',
        any: [
          /^\s*PRINTFORMW 「是你的孩子哟…唔呼呼。唔嗯、非常有精神呢、很快连周边巡逻这样的事情也能做了吧」\s*$\s*^\s*PRINTFORMW 「从今往后还要继续生下你的孩子呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*;その他\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:272 = 1\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6381',
        any: [
          /^\s*PRINTFORMW 「从今往后还要继续生下你的孩子呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6384',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6384-6387',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:272 = 1\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6386',
        any: [/^\s*CFLAG:272 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6387-6388',
        any: [/^\s*ELSE\s*$\s*^\s*;崩坏している場合\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6389',
        any: [/^\s*IF TALENT:9 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6390',
        any: [/^\s*PRINTFORMW 「啊…啊呜…呜呜………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6391',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对自己生的孩子完全没有兴趣………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6393',
        any: [/^\s*ELSEIF TALENT:85 && CFLAG:102 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6394',
        any: [
          /^\s*PRINTFORMW 「是你的孩子哟…唔呼呼。唔嗯、非常有精神呢、很快连周边巡逻这样的事情也能做了吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6394-6401',
        any: [
          /^\s*PRINTFORMW 「是你的孩子哟…唔呼呼。唔嗯、非常有精神呢、很快连周边巡逻这样的事情也能做了吧」\s*$\s*^\s*PRINTFORMW 「从今往后还要继续生下你的孩子呢%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*;その他\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:272 = 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6395',
        any: [
          /^\s*PRINTFORMW 「从今往后还要继续生下你的孩子呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6398',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6398-6401',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…人家第一个孩子………让人家抱抱它可以吧？呐？」\s*$\s*^\s*ENDIF\s*$\s*^\s*CFLAG:272 = 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6400',
        any: [/^\s*CFLAG:272 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6400-6402',
        any: [/^\s*CFLAG:272 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6400-6404',
        any: [
          /^\s*CFLAG:272 = 1\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6407',
        any: [/^\s*IF TFLAG:13 == 13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6409',
        any: [/^\s*IF TALENT:85 \|\| TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6411',
        any: [/^\s*IF TALENT:153\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6412',
        any: [
          /^\s*PRINTFORMW 「很快就要生出来了、请安心期待吧、亲・爱・的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6413',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%温柔地抚摸着因为临月而膨大的腹部………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6415',
        any: [/^\s*ELSEIF TALENT:154\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6416',
        any: [
          /^\s*PRINTFORMW 「看啦、爸爸来看你了哟～？要当个好孩子呢～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6417',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%满面笑容的哄着孩子………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6417-6419',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%满面笑容的哄着孩子………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6419-6420',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:273 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6420',
        any: [/^\s*CFLAG:273 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6420-6422',
        any: [/^\s*CFLAG:273 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6426',
        any: [/^\s*IF TFLAG:13 == 14\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6428',
        any: [/^\s*IF TALENT:85 \|\| TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6429',
        any: [/^\s*PRINTFORMW 「离别这么快就到来了…真是寂寞呢………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6430-6431',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:274 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6431',
        any: [/^\s*CFLAG:274 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6431-6433',
        any: [/^\s*CFLAG:274 = 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6438',
        any: [/^\s*IF TFLAG:13 == 999\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6440',
        any: [/^\s*IF TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6440-6446',
        any: [
          /^\s*IF TALENT:85\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;それ以外\s*$\s*^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6441',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6443-6448',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6444',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6444-6448',
        any: [
          /^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;--------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6451',
        any: [/^\s*TFLAG:13 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6451-6455',
        any: [
          /^\s*TFLAG:13 = 0\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6479-6496',
        any: [
          /^\s*@DUNGEON_RYOUZYOKU_K10\s*$\s*^\s*;-------------------------------------------------------\s*$\s*^\s*;ダンジョンで陵辱される前の一言\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;处女\s*$\s*^\s*PRINTFORMW 「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」\s*$\s*^\s*PRINTFORMW 「咕…呜啊啊…啊～…不要啊啊啊啊！」\s*$\s*^\s*PRINTFORMW 战败的%SAVESTR:TARGET%发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6479-7303',
        any: [
          /^\s*@DUNGEON_RYOUZYOKU_K10\s*$\s*^\s*;-------------------------------------------------------\s*$\s*^\s*;ダンジョンで陵辱される前の一言\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;处女\s*$\s*^\s*PRINTFORMW 「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」\s*$\s*^\s*PRINTFORMW 「咕…呜啊啊…啊～…不要啊啊啊啊！」\s*$\s*^\s*PRINTFORMW 战败的%SAVESTR:TARGET%发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6482',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6484',
        any: [
          /^\s*PRINTFORMW 「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6485',
        any: [/^\s*PRINTFORMW 「咕…呜啊啊…啊～…不要啊啊啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6486',
        any: [
          /^\s*PRINTFORMW 战败的%SAVESTR:TARGET%发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6486-6488',
        any: [
          /^\s*PRINTFORMW 战败的%SAVESTR:TARGET%发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………\s*$\s*^\s*ELSE\s*$\s*^\s*;非处女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6489',
        any: [
          /^\s*PRINTFORMW 「请！请住手…哈啊～…被魔物侵犯什么的…啊～…好烫…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6490',
        any: [/^\s*PRINTFORMW 「咕…呜啊啊…啊～…不要啊啊啊啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6491',
        any: [
          /^\s*PRINTFORMW 战败的%SAVESTR:TARGET%发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6491-6493',
        any: [
          /^\s*PRINTFORMW 战败的%SAVESTR:TARGET%发出了绝望的悲鸣、魔物们一边嘲笑着圣灵骑士的失态模样一边开始了凌辱………\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6493-6496',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6497-6556',
        any: [
          /^\s*@DUNGEON_RYOUZYOKU_AFTER_K10\s*$\s*^\s*;-------------------------------------------------------\s*$\s*^\s*;ダンジョンで陵辱された後の一言\s*$\s*^\s*IF TALENT:0 == 1\s*$\s*^\s*;处女\s*$\s*^\s*PRINTFORMW 「骗人…我竟然还是处女吗………」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%对自己被蹂躏的满身狼藉却奇迹般地还是处女感到了惊叹。\s*$\s*^\s*PRINTFORMW 这究竟是幸运还是不幸，现在还未可知………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6502',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6504',
        any: [/^\s*PRINTFORMW 「骗人…我竟然还是处女吗………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6505',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%对自己被蹂躏的满身狼藉却奇迹般地还是处女感到了惊叹。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6506',
        any: [/^\s*PRINTFORMW 这究竟是幸运还是不幸，现在还未可知………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6508',
        any: [/^\s*IF EXP:1 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6508-6517',
        any: [
          /^\s*IF EXP:1 > 20\s*$\s*^\s*PRINTL\s*$\s*^\s*PRINTFORMW 「屁股那里…哈啊～…被撕裂了吗…？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%稍微一活动大量的魔物精液和粘液就从肛门里漏了出来。\s*$\s*^\s*ENDIF\s*$\s*^\s*;フェラしすぎた感想\s*$\s*^\s*IF EXP:22 > 20\s*$\s*^\s*PRINTL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6509',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6510',
        any: [/^\s*PRINTFORMW 「屁股那里…哈啊～…被撕裂了吗…？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6511',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%稍微一活动大量的魔物精液和粘液就从肛门里漏了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6514',
        any: [/^\s*IF EXP:22 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6515',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6516',
        any: [
          /^\s*PRINTFORMW 「唏…呜啊…啊…大家的威武肉棒…很、很美味…呜呜呜」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6517',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被强迫着说出了羞耻的口交感想。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6517-6519',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被强迫着说出了羞耻的口交感想。\s*$\s*^\s*ENDIF\s*$\s*^\s*;精液の味\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6520',
        any: [/^\s*IF EXP:20 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6521',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6522',
        any: [/^\s*PRINTFORMW 「啊…啊…大家的精液都…很、很美味…呜呜呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6523',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边忍着吐意喝着精液、一边哭着说出了这样的感想………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6523-6525',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边忍着吐意喝着精液、一边哭着说出了这样的感想………\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6524-6526',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSE\s*$\s*^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6527',
        any: [/^\s*PRINTFORMW 「啊啊…被狠狠地…侵犯了呢…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6528',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被魔物们轮奸过后、衣服已经变得破破烂烂的了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6530',
        any: [/^\s*IF EXP:0 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6531',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6532',
        any: [
          /^\s*PRINTFORMW 「哈啊…哈啊…可恶…小穴都没感觉了…怎么办啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6533',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%稍稍一动，大量的怪物精液和粘液就从红肿的穴口漏了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6534-6535',
        any: [/^\s*ENDIF\s*$\s*^\s*;アナルを弄られすぎた感想\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6535-6546',
        any: [
          /^\s*;アナルを弄られすぎた感想\s*$\s*^\s*IF EXP:1 > 20\s*$\s*^\s*PRINTL\s*$\s*^\s*PRINTFORMW 「屁股那里…哈啊～…被撕裂了吗…？」\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%稍微一活动大量的魔物精液和粘液就从肛门里漏了出来。\s*$\s*^\s*ENDIF\s*$\s*^\s*;フェラしすぎた感想\s*$\s*^\s*IF EXP:22 > 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6536',
        any: [/^\s*IF EXP:1 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6537',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6538',
        any: [/^\s*PRINTFORMW 「屁股那里…哈啊～…被撕裂了吗…？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6539',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%稍微一活动大量的魔物精液和粘液就从肛门里漏了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6542',
        any: [/^\s*IF EXP:22 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6543',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6544',
        any: [
          /^\s*PRINTFORMW 「唏…呜啊…啊…大家的威武肉棒…很、很美味…呜呜呜」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6545',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被强迫着说出了羞耻的口交感想\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6545-6547',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被强迫着说出了羞耻的口交感想\s*$\s*^\s*ENDIF\s*$\s*^\s*;精液の味\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6548',
        any: [/^\s*IF EXP:20 > 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6549',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6550',
        any: [/^\s*PRINTFORMW 「啊…啊…大家的精液都…很、很美味…呜呜呜」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6551',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边忍着吐意喝着精液、一边哭着说出了这样的感想………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6551-6553',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边忍着吐意喝着精液、一边哭着说出了这样的感想………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6551-6555',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边忍着吐意喝着精液、一边哭着说出了这样的感想………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6554-6557',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*@DUNGEON_VICTORY_K10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6557-6580',
        any: [
          /^\s*@DUNGEON_VICTORY_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;戦闘勝利時\s*$\s*^\s*;決め台詞\s*$\s*^\s*IF RAND:3 == 0\s*$\s*^\s*PRINTFORMW 「唔呼呼、今天的魔力格外顺畅呢♪」\s*$\s*^\s*ELSEIF RAND:2 == 0\s*$\s*^\s*PRINTFORMW 「呼呼呼、完全称不上对手嘛♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6562',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6563',
        any: [/^\s*PRINTFORMW 「唔呼呼、今天的魔力格外顺畅呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6564',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6565',
        any: [/^\s*PRINTFORMW 「呼呼呼、完全称不上对手嘛♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6566-6567',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「索敵…残存０…无事的结束了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6567',
        any: [/^\s*PRINTFORMW 「索敵…残存０…无事的结束了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6567-6569',
        any: [
          /^\s*PRINTFORMW 「索敵…残存０…无事的结束了呢」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6570',
        any: [
          /^\s*IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6572',
        any: [/^\s*PRINTFORMW 「………哈啊哈啊…真是、好累人啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6573-6574',
        any: [/^\s*ELSE\s*$\s*^\s*;余裕余裕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6575',
        any: [/^\s*PRINTFORMW 「接下来、今天也向更深处进发吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6575-6577',
        any: [
          /^\s*PRINTFORMW 「接下来、今天也向更深处进发吧」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6576-6581',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*@DUNGEON_ATTACK_K10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6581-6610',
        any: [
          /^\s*@DUNGEON_ATTACK_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;攻撃時のセリフ\s*$\s*^\s*;最初に一言\s*$\s*^\s*;侵攻中\s*$\s*^\s*IF CFLAG:1 == 2\s*$\s*^\s*IF RAND:3 == 0\s*$\s*^\s*PRINTFORMW 「燃烧吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6587',
        any: [/^\s*IF CFLAG:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6588',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6589',
        any: [/^\s*PRINTFORMW 「燃烧吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6590',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6591',
        any: [/^\s*PRINTFORMW 「弹开吧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6592-6593',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORMW 「吹飞他们！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6593',
        any: [/^\s*PRINTFORMW 「吹飞他们！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6593-6595',
        any: [
          /^\s*PRINTFORMW 「吹飞他们！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6595-6596',
        any: [/^\s*ELSE\s*$\s*^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6596',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6597',
        any: [/^\s*PRINTFORMW 「见识一下真正的人家吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6598',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6599',
        any: [/^\s*PRINTFORMW 「来吧、把你也变成魔王大人的东西（舔唇）」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6600-6601',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「特意来被侵犯什么的，你也是个淫乱的人呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6601',
        any: [/^\s*PRINTFORMW 「特意来被侵犯什么的，你也是个淫乱的人呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6601-6603',
        any: [
          /^\s*PRINTFORMW 「特意来被侵犯什么的，你也是个淫乱的人呢」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6601-6605',
        any: [
          /^\s*PRINTFORMW 「特意来被侵犯什么的，你也是个淫乱的人呢」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6604-6611',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*@BENKI_KOUJO_K10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6611-6715',
        any: [
          /^\s*@BENKI_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;肉便器口上。キャラはA\s*$\s*^\s*;FLAG:62を使用。行動の詳細はBENKI\.ERBで\s*$\s*^\s*IF FLAG:62 == 0\s*$\s*^\s*;最下层居民凌辱\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6616',
        any: [/^\s*IF FLAG:62 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6619',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6620',
        any: [
          /^\s*PRINTFORMW 「哈啊～…更多更多…用力干人家吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6622',
        any: [/^\s*ELSEIF TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6623',
        any: [/^\s*PRINTFORMW 「咿…不要…不要啊…那么脏的不要过来！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6625',
        any: [/^\s*ELSEIF ABL:A:16 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6626',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…人家…会好好做的…不要那么近…嗯～…呜咕～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6628-6629',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「恶心…那样的…好过分…嗯～…啊咕呜！」」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6629',
        any: [/^\s*PRINTFORMW 「恶心…那样的…好过分…嗯～…啊咕呜！」」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6630-6631',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSEIF FLAG:62 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6631',
        any: [/^\s*ELSEIF FLAG:62 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6634',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6635',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…啊啊嗯%UNICODE\(0x2661\) \*1% 姐姐大人那边才是…好好用人家的肉棒啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6637',
        any: [/^\s*ELSEIF TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6638',
        any: [
          /^\s*PRINTFORMW 「啊、呜、是、姐姐大人…被姐姐大人使用的话…很、很开心…唔唔唔…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6640',
        any: [/^\s*ELSEIF ABL:A:16 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6641',
        any: [/^\s*PRINTFORMW 「啊啊…会好好侍奉的…请不要弄痛我………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6643-6644',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…痛疼什么的很讨厌…的说…所以说…请温柔的…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6644',
        any: [
          /^\s*PRINTFORMW 「哈啊～…痛疼什么的很讨厌…的说…所以说…请温柔的…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6645-6646',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSEIF FLAG:62 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6646',
        any: [/^\s*ELSEIF FLAG:62 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6649',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6650',
        any: [
          /^\s*PRINTFORMW 「哈啊～…汪酱的鸡巴好棒%UNICODE\(0x2661\) \*1% 哈啊哈啊…汪汪嗯～…啊嗯…嗷呜呜嗯～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6652',
        any: [/^\s*ELSEIF TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6653',
        any: [
          /^\s*PRINTFORMW 「再继续下去…哈啊～…人家就要…坏掉了…坏掉了啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6655',
        any: [/^\s*ELSEIF ABL:A:16 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6656',
        any: [
          /^\s*PRINTFORMW 「被狗侵犯着有了感觉…人家…啊～啊呜～…咕～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6658-6659',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「讨厌…这样的事情…不要啦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6659',
        any: [/^\s*PRINTFORMW 「讨厌…这样的事情…不要啦！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6660-6661',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSEIF  FLAG:62 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6661',
        any: [/^\s*ELSEIF  FLAG:62 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6664',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6665',
        any: [
          /^\s*PRINTFORMW 「啊嘿噫～！肉棒好舒服！两根肉棒比肉棒更舒服%UNICODE\(0x2661\) \*1% 小穴和屁股穴被这样插着要变成笨蛋了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6667',
        any: [/^\s*ELSEIF TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6668',
        any: [
          /^\s*PRINTFORMW 「啊啊～…噫…快停下…被你们弄松了的话…人家会被最重要的人讨厌的…啊～啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6670',
        any: [/^\s*ELSEIF ABL:A:16 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6671',
        any: [
          /^\s*PRINTFORMW 「老实说的话…嗯～哈啊～！再稍微温柔一点…啊～…哈咿咿！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6673-6674',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不要…已经…要死掉了…要死掉啦………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6674',
        any: [/^\s*PRINTFORMW 「不要…已经…要死掉了…要死掉啦………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6675-6676',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSEIF  FLAG:62 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6676',
        any: [/^\s*ELSEIF  FLAG:62 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6679',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6680',
        any: [
          /^\s*PRINTFORMW 「啊嗯～啊啊嗯～%UNICODE\(0x2661\) \*1% 人家的小穴非常舒服吧？原本是魔王专用的阴穴哟…啊～啊哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6682',
        any: [/^\s*ELSEIF TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6683',
        any: [
          /^\s*PRINTFORMW 「啊～…呜呜～！…咕唔～人家明明是那个人的东西…你们不要插进来…啊～啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6685',
        any: [/^\s*ELSEIF ABL:A:16 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6686',
        any: [
          /^\s*PRINTFORMW 「老实说的话…哈啊～…稍微温柔一点…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6688-6689',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不、不要…哈啊～…坏掉惹…小穴要坏掉了啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6689',
        any: [
          /^\s*PRINTFORMW 「不、不要…哈啊～…坏掉惹…小穴要坏掉了啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6690-6691',
        any: [/^\s*ENDIF\s*$\s*^\s*ELSEIF  FLAG:62 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6691',
        any: [/^\s*ELSEIF  FLAG:62 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6694',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6695',
        any: [
          /^\s*PRINTFORMW 「哈啊嗯～…屁股穴也好棒%UNICODE\(0x2661\) \*1% 啊啊～…用你们的肉棒让人家变得更舒服吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6697',
        any: [/^\s*ELSEIF TALENT:A:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6698',
        any: [
          /^\s*PRINTFORMW 「哈啊～…屁股…发出了咔啪咔啪的声音…咦…还、还要做吗？…啊～…不要啊…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6700',
        any: [/^\s*ELSEIF ABL:A:16 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6701',
        any: [
          /^\s*PRINTFORMW 「啊～…啊啊～…人家是你们的…肛、肛穴便器的说…啊啊～…哈噫！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6703-6704',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊…已经坏掉了…被弄得乱七八糟了…噫…住手啊…啊啊～…呀～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6704',
        any: [
          /^\s*PRINTFORMW 「啊啊…已经坏掉了…被弄得乱七八糟了…噫…住手啊…啊啊～…呀～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6704-6706',
        any: [
          /^\s*PRINTFORMW 「啊啊…已经坏掉了…被弄得乱七八糟了…噫…住手啊…啊啊～…呀～！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6704-6708',
        any: [
          /^\s*PRINTFORMW 「啊啊…已经坏掉了…被弄得乱七八糟了…噫…住手啊…啊啊～…呀～！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6704-6712',
        any: [
          /^\s*PRINTFORMW 「啊啊…已经坏掉了…被弄得乱七八糟了…噫…住手啊…啊啊～…呀～！」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6716-6852',
        any: [
          /^\s*@COLOSSEUM_KOJO_10\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;放置PLAY\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*IF SELECTCOM == 55\s*$\s*^\s*;気力０以下\s*$\s*^\s*IF BASE:1 <= 0\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%连站立的力气都没有了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6720',
        any: [/^\s*IF SELECTCOM == 55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6722',
        any: [/^\s*IF BASE:1 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6723',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%连站立的力气都没有了……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6724-6725',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW %SAVESTR:TARGET%被死斗场狂热的气氛和对手的眼神影响着，不禁颤抖了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6725',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被死斗场狂热的气氛和对手的眼神影响着，不禁颤抖了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6725-6727',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被死斗场狂热的气氛和对手的眼神影响着，不禁颤抖了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6725-6729',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被死斗场狂热的气氛和对手的眼神影响着，不禁颤抖了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6726-6730',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;交谈\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6732',
        any: [/^\s*IF SELECTCOM == 56\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6734',
        any: [/^\s*IF BASE:1 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6736',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6737',
        any: [/^\s*PRINTFORMW 「哈啊哈啊…库～…以、已经站不起来了啦…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6738',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%双膝脱力的跪了下来、向%SAVESTR:ASSI%摆出了讨饶一样的姿势………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6739-6740',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「请住手…不要过来了…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6740',
        any: [/^\s*PRINTFORMW 「请住手…不要过来了…哈啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6741',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%连站立的力气都没有了………\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6741-6743',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%连站立的力气都没有了………\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6743-6744',
        any: [/^\s*ELSE\s*$\s*^\s*;助手が調教中の場合\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6745',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6746',
        any: [/^\s*PRINTFORMW 「不会输给你！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6747',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%握紧武器、和%SAVESTR:ASSI%对峙着………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6748-6749',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咕～…能拿出全力的话这种程度…啧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6749',
        any: [/^\s*PRINTFORMW 「咕～…能拿出全力的话这种程度…啧！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6750',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%感受着被封印了力量的无力，对现在的情况稍微感到了恐惧………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6750-6752',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%感受着被封印了力量的无力，对现在的情况稍微感到了恐惧………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6750-6754',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%感受着被封印了力量的无力，对现在的情况稍微感到了恐惧………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6750-6756',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%感受着被封印了力量的无力，对现在的情况稍微感到了恐惧………\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6752-6757',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;口交\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6759',
        any: [/^\s*IF SELECTCOM == 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6761',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6762',
        any: [
          /^\s*PRINTFORMW 「哈噗…唔…嗯～…嗯～…嗯呼…还要再舔吗…嗯～…咕噜…啾」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6763',
        any: [/^\s*PRINTFORM %SAVESTR:ASSI%\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6765',
        any: [/^\s*PRINT 坚硬的雄性器\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6767',
        any: [/^\s*PRINT 粗大的假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6768',
        any: [
          /^\s*PRINTFORMW 让%SAVESTR:TARGET%一边舔一边露出了心旷神怡的表情……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6769-6770',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咕噜…嗯～…咳咳…等下…会好好舔的啦…嗯～咕噜…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6770',
        any: [
          /^\s*PRINTFORMW 「咕噜…嗯～…咳咳…等下…会好好舔的啦…嗯～咕噜…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6771',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把带着令人作呕气味的阴茎含了进去……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6771-6773',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把带着令人作呕气味的阴茎含了进去……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6771-6775',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%把带着令人作呕气味的阴茎含了进去……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6773-6776',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;胸爱撫\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6778',
        any: [/^\s*IF SELECTCOM == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6780',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6781',
        any: [
          /^\s*PRINTFORMW 「啊～…咕～…唔～…啊啊～！再继续的话…嗯～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6782',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抓住了%SAVESTR:ASSI%的胸部。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6783',
        any: [
          /^\s*PRINTFORMW 接下来%SAVESTR:ASSI%在观众们的注视下被玩弄起了乳房………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6784-6785',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「噫…那么用力捏的话～…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6785',
        any: [/^\s*PRINTFORMW 「噫…那么用力捏的话～…啊～…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6786',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的胸部被蹂躏着发出了悲鸣………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6786-6788',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的胸部被蹂躏着发出了悲鸣………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6786-6790',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的胸部被蹂躏着发出了悲鸣………\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6787-6792',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背后位\s*$\s*^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6793',
        any: [/^\s*IF SELECTCOM == 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6795',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6796',
        any: [/^\s*PRINTFORMW 「呀～！请住手～求你了～…啊啊～…啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6797',
        any: [/^\s*PRINTFORM %SAVESTR:ASSI%听着%SAVESTR:TARGET%的悲鸣\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6799',
        any: [/^\s*PRINT 用坚硬的雄性器\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6801',
        any: [/^\s*PRINT 用粗大的假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6802',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被无慈悲的继续蹂躏着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6803',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的悲鸣传到观众席，让观客们欢呼了起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6805',
        any: [/^\s*ELSEIF TFLAG:400 == 206\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6806',
        any: [/^\s*PRINTFORMW 「咳哦…呜噗…咔呃…咳…喀呃哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6807',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被巨魔侵犯着。那规格外的巨大阴茎每一次粗暴的插到底就让%SAVESTR:TARGET%的腹部凸起一条触目惊心的圆柱形状。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6808',
        any: [
          /^\s*PRINTFORMW 接下来在%SAVESTR:TARGET%的反吐中，巨魔继续强暴着她………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6809-6810',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咿…不要～…那么大的东西插不进来的…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6810',
        any: [
          /^\s*PRINTFORMW 「咿…不要～…那么大的东西插不进来的…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6811',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%被怪物侵犯了……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6811-6813',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被怪物侵犯了……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6811-6815',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被怪物侵犯了……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6812-6817',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;背后位アナル\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6819',
        any: [/^\s*IF SELECTCOM == 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6821',
        any: [/^\s*IF ASSI > 0 && ASSIPLAY\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6822',
        any: [
          /^\s*PRINTFORMW 「屁股那～…哈啊～明明讨要那些肮脏的东西…啊～…哈啊～…噫～…屁股要坏掉了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6823',
        any: [/^\s*PRINTFORM %SAVESTR:ASSI%听着%SAVESTR:TARGET%的悲鸣\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6825',
        any: [/^\s*PRINT 用坚硬的雄性器\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6827',
        any: [/^\s*PRINT 用粗大的假阳具\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6828',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的肛门被无慈悲的继续蹂躏着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6829',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的悲鸣传到观众席，让观客们欢呼了起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6831',
        any: [/^\s*ELSEIF TFLAG:400 == 206\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6832',
        any: [/^\s*PRINTFORMW 「啊嘎…咳…咔啊～…咕呃～…咔呃…咳咳～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6833',
        any: [
          /^\s*PRINTFORMW 可怜的%SAVESTR:TARGET%被巨魔的巨大阴茎捅入了肛门，发出了被踩死的青蛙一样的声音。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6834',
        any: [
          /^\s*PRINTFORMW 精致的肛门完全被破坏了，被巨魔的凶器扩张成了紫红色的肉洞、失去意识的%SAVESTR:TARGET%双眼翻白，四肢下垂，随着微弱的呼吸吐着泡泡。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6835',
        any: [
          /^\s*PRINTFORMW 观客们看到%SAVESTR:TARGET%凄惨的样子、沸腾了起来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6836-6837',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「咿～…不…要～被玷污…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6837',
        any: [/^\s*PRINTFORMW 「咿～…不…要～被玷污…啊～…啊啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6838',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被怪物双手抓住了纤腰，像自慰套一样前后套动了起来……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6838-6840',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被怪物双手抓住了纤腰，像自慰套一样前后套动了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6838-6842',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%被怪物双手抓住了纤腰，像自慰套一样前后套动了起来……\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6839-6844',
        any: [
          /^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*;-------------------------------------------------\s*$\s*^\s*;媚药史莱姆\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6846',
        any: [/^\s*IF SELECTCOM == 51\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6847',
        any: [/^\s*PRINTFORMW 「这个史莱姆…媚药吗…哈啊～…啊呜～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6847-6849',
        any: [
          /^\s*PRINTFORMW 「这个史莱姆…媚药吗…哈啊～…啊呜～！」\s*$\s*^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6848-6851',
        any: [/^\s*RETURN 0\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6850-6853',
        any: [
          /^\s*RETURN 0\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*@NTR_KOUJO_K10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6853-6963',
        any: [
          /^\s*@NTR_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;NTRフラグ\s*$\s*^\s*IF CFLAG:650 == 0\s*$\s*^\s*CFLAG:650 = 1\s*$\s*^\s*;調教後自慰に使用\s*$\s*^\s*CFLAG:657 = RAND:3 \+ 1\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6856',
        any: [/^\s*IF CFLAG:650 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6857',
        any: [/^\s*CFLAG:650 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6859',
        any: [/^\s*CFLAG:657 = RAND:3 \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6859-6861',
        any: [/^\s*CFLAG:657 = RAND:3 \+ 1\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6863',
        any: [/^\s*IF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6865',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6866',
        any: [
          /^\s*PRINTFORMW 「不、不要…哈啊～…被你这样的人…人家的第一次…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6867',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛发出了悲鸣、大颗的泪珠从双眼里滚滚落下。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6868',
        any: [
          /^\s*PRINTFORMW 然而狂王毫不在意的把玩着%SAVESTR:TARGET%的扶她阴茎，开始品味她的处女肉穴………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6869-6870',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「被侵犯了…和魔王大人再会前被侵犯了…明明之前早点做了的话就…咕…哇啊——！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6870',
        any: [
          /^\s*PRINTFORMW 「被侵犯了…和魔王大人再会前被侵犯了…明明之前早点做了的话就…咕…哇啊——！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6871',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛和伤心发出了悲鸣。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6872',
        any: [
          /^\s*PRINTFORMW 然而狂王毫不在意的把玩着%SAVESTR:TARGET%的扶她阴茎，开始品味她的处女肉穴………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6873-6874',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:651 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6874',
        any: [/^\s*CFLAG:651 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6876',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6877',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6878',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊～…啊～…嗯～！不吃掉人家的处女只是一个劲侵犯肛门什么的…哈啊～…狂王大人和魔王大人都喜欢做同样的事情呢…啊～咿呀呜！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6879',
        any: [
          /^\s*PRINTFORMW 狂王听了%SAVESTR:TARGET%的话微微一笑，手指加力想要捏碎一样的捏紧了她的乳头。于是%SAVESTR:TARGET%因为这样的刺激悲鸣着收紧了肛门。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6880',
        any: [
          /^\s*PRINTFORMW 「咿～…哈啊～…不要这么粗暴嘛…哈啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6881-6882',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…咿…哈…肛门侍奉告一段落的话…就来吃掉人家的处女…是真的吗…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6882',
        any: [
          /^\s*PRINTFORMW 「哈啊～…咿…哈…肛门侍奉告一段落的话…就来吃掉人家的处女…是真的吗…哈啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6883',
        any: [/^\s*PRINTFORMW 「咕…呜呜～…那人家要好好夹紧呢…啊～…啊咕」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6884-6885',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:652 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6885',
        any: [/^\s*CFLAG:652 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6887',
        any: [/^\s*CFLAG:657 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6889',
        any: [/^\s*ELSEIF P == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6890',
        any: [/^\s*IF TALENT:136\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6891',
        any: [
          /^\s*PRINTFORMW 「啊啊～…狗肉棒好舒服～…比魔族的短小肉棒要好一百倍%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6892',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%高兴地向观众们展示着自己和野兽交配的地方，观众的嘲笑声让她的动作愈发淫靡了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6893',
        any: [/^\s*ELSEIF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6894',
        any: [
          /^\s*PRINTFORMW 「不要啊～不要看…不要看我～…被狗侵犯着…还有感觉什么不要看啊啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6895-6896',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「不要啊～！被狗侵犯什么的～…啊～…哈啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6896',
        any: [
          /^\s*PRINTFORMW 「不要啊～！被狗侵犯什么的～…啊～…哈啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6897-6898',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:653 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6898',
        any: [/^\s*CFLAG:653 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6900',
        any: [/^\s*ELSEIF P == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6901',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6902',
        any: [
          /^\s*PRINTFORMW 「狂王大人的大肉棒好舒服%UNICODE\(0x2661\) \*1% 哈嗯～…哈啊～…继续干人家啊…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6903',
        any: [
          /^\s*PRINTFORMW 「抱人家…请继续疼爱人家的淫乱小穴…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6904-6905',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊…哈～…啊嗯～♪…狂王大人的肉棒好热好硬…啊啊～…更多的插进来…啾啾地插进来啊啊啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6905',
        any: [
          /^\s*PRINTFORMW 「啊啊…哈～…啊嗯～♪…狂王大人的肉棒好热好硬…啊啊～…更多的插进来…啾啾地插进来啊啊啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6906-6907',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:654 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6907',
        any: [/^\s*CFLAG:654 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6909',
        any: [/^\s*CFLAG:657 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6911',
        any: [/^\s*ELSEIF P == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6912',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6913',
        any: [
          /^\s*PRINTFORMW 「更多的射进来…哈啊～…人家最喜欢小穴和屁股同是被大肉棒插满了…啊啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6914-6915',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊啊～…还要…就算操坏了也没关系…前面和后面都…哈啊～…都是你们的自慰肉桶啦…啊啊－～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6915',
        any: [
          /^\s*PRINTFORMW 「啊啊～…还要…就算操坏了也没关系…前面和后面都…哈啊～…都是你们的自慰肉桶啦…啊啊－～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6916-6917',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:655 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6917',
        any: [/^\s*CFLAG:655 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6919',
        any: [/^\s*ELSEIF P == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6920',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6921',
        any: [
          /^\s*PRINTFORMW 「…人家的小穴和扶她鸡巴和屁股穴…都是为了侍奉大家而存在的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6922',
        any: [
          /^\s*PRINTFORMW 「虽然人家这样没料的幼儿体型也许不能让大家满意、不过请大家不要客气尽量拿去处理性欲吧…哈啊～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6923',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抬起腰向围观的男性们摇摆着发出邀请。看到这光景的男人们一边嘲笑着%SAVESTR:TARGET%一边向她围了上来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6924-6925',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「人家今天是大家的公用便所…请随意的而使用吧…啊啊…更多…更多的侵犯人家的便器小穴………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6925',
        any: [
          /^\s*PRINTFORMW 「人家今天是大家的公用便所…请随意的而使用吧…啊啊…更多…更多的侵犯人家的便器小穴………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6926',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抬起腰向围观的男性们摇摆着发出邀请。看到这光景的男人们一边嘲笑着%SAVESTR:TARGET%一边向她围了上来………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6927-6928',
        any: [/^\s*ENDIF\s*$\s*^\s*CFLAG:656 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6928',
        any: [/^\s*CFLAG:656 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6930',
        any: [/^\s*ELSEIF P == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6931',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6932',
        any: [
          /^\s*PRINTFORMW 「啊啊…人家的王除了狂王大人以外都不行呢…对不起啦魔王大人…人家已经成为狂王大人的东西了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6933',
        any: [
          /^\s*PRINTFORMW 「狂王大人…请更多的疼爱人家嘛………%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6934',
        any: [
          /^\s*PRINTFORMW 看着痴态毕露的%SAVESTR:TARGET%狂王对着镜头露出了满意的神色………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6935-6936',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊…果然我在狂王大人的身边最合适了…啊啊…好舒服…哈啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6936',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…果然我在狂王大人的身边最合适了…啊啊…好舒服…哈啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6937',
        any: [
          /^\s*PRINTFORMW 「狂王大人…更多的疼爱你的牝奴隶%SAVESTR:TARGET%嘛………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6938-6939',
        any: [/^\s*ENDIF\s*$\s*^\s*;調教後自慰に使用\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6940',
        any: [/^\s*CFLAG:657 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6942',
        any: [/^\s*ELSEIF P == 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6943',
        any: [/^\s*IF TALENT:76 \|\| TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6944',
        any: [/^\s*IF CFLAG:102 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6945',
        any: [/^\s*PRINTFORMW 「那、那个是我的孩子！求求你还给我！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6946',
        any: [
          /^\s*PRINTFORMW 用刚刚出产后的身体抱着必死的决心移动着%SAVESTR:TARGET%向狂王发出了悲愿。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6947',
        any: [
          /^\s*PRINTFORMW 但是那个拼命的请愿被忽视了，公开生育的观众们一哄而上，无数的手掩盖了婴儿凄惨的身姿，血液开始在地面上流淌………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6948-6949',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊哈啊、我这样的身体也能生出孩子，真是幸福呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6949',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊哈啊、我这样的身体也能生出孩子，真是幸福呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6950',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的视线向着镜头那侧的%SAVESTR:PLAYER%一边喘息着一边说道。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6951',
        any: [
          /^\s*PRINTFORMW 「从今以后会有好~多小宝宝出产的录像寄给你呢，请好好期待吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6951-6953',
        any: [
          /^\s*PRINTFORMW 「从今以后会有好~多小宝宝出产的录像寄给你呢，请好好期待吧%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6953-6954',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊哈啊哈啊、人、人家、生出来了呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6954',
        any: [/^\s*PRINTFORMW 「哈啊哈啊哈啊、人、人家、生出来了呢…」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6955',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%偏过头和狂王说了什么，兴奋的点了点头。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6956',
        any: [
          /^\s*PRINTFORMW 「嗯～狂王大人………是的、我的子宫是狂王大人的东西、从今以后会被各种各样的雄性子种汁灌进去，为狂王大人产出好~多孩子的…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6956-6958',
        any: [
          /^\s*PRINTFORMW 「嗯～狂王大人………是的、我的子宫是狂王大人的东西、从今以后会被各种各样的雄性子种汁灌进去，为狂王大人产出好~多孩子的…♪」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6956-6960',
        any: [
          /^\s*PRINTFORMW 「嗯～狂王大人………是的、我的子宫是狂王大人的东西、从今以后会被各种各样的雄性子种汁灌进去，为狂王大人产出好~多孩子的…♪」\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6957-6964',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*RETURN 0\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*@EXUCUTION_KOUJO_K10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6964-6980',
        any: [
          /^\s*@EXUCUTION_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;肉便器刑\s*$\s*^\s*IF TFLAG:16 == 4\s*$\s*^\s*PRINTFORMW 「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」\s*$\s*^\s*;戦闘員化\s*$\s*^\s*ELSEIF TFLAG:16 == 5\s*$\s*^\s*PRINTFORMW 「啊啊 …命令…请下命令…吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6967',
        any: [/^\s*IF TFLAG:16 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6968',
        any: [
          /^\s*PRINTFORMW 「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6970',
        any: [/^\s*ELSEIF TFLAG:16 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6971',
        any: [/^\s*PRINTFORMW 「啊啊 …命令…请下命令…吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6973',
        any: [/^\s*ELSEIF TFLAG:16 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6974',
        any: [/^\s*PRINTFORMW 「对、对我做这种过分的事情什么的………～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6976',
        any: [/^\s*ELSEIF TFLAG:16 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6976-6980',
        any: [
          /^\s*ELSEIF TFLAG:16 == 7\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;-----------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6977',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6981-7015',
        any: [
          /^\s*@MUSEUM_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;石化\s*$\s*^\s*IF TFLAG:500 == 0\s*$\s*^\s*PRINTFORMW 「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」\s*$\s*^\s*;剥製化\s*$\s*^\s*ELSEIF TFLAG:500 == 1\s*$\s*^\s*PRINTFORMW 「啊啊…我的身姿就这样永远的残留下去了呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6984',
        any: [/^\s*IF TFLAG:500 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6985',
        any: [
          /^\s*PRINTFORMW 「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6987',
        any: [/^\s*ELSEIF TFLAG:500 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6988',
        any: [
          /^\s*PRINTFORMW 「啊啊…我的身姿就这样永远的残留下去了呢………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6990',
        any: [/^\s*ELSEIF TFLAG:500 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6991',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6993',
        any: [/^\s*ELSEIF TFLAG:500 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6994',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6996',
        any: [/^\s*ELSEIF TFLAG:500 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6997',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '6999',
        any: [/^\s*ELSEIF TFLAG:500 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7000',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7002',
        any: [/^\s*ELSEIF TFLAG:500 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7003',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7005',
        any: [/^\s*ELSEIF TFLAG:500 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7006',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7008',
        any: [/^\s*ELSEIF TFLAG:500 == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7009',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7011',
        any: [/^\s*ELSEIF TFLAG:500 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7011-7015',
        any: [
          /^\s*ELSEIF TFLAG:500 == 9\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;-----------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7012',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7016-7036',
        any: [
          /^\s*@BANISHMENT_KOUJO_K10\s*$\s*^\s*;処刑内容はBANISHMENT\.ERBを参照してください。\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;追放\s*$\s*^\s*IF TFLAG:510 == 0\s*$\s*^\s*PRINTFORMW 「我的魔法连让小石头动一下都不行了…啊啊………」\s*$\s*^\s*;男体化\s*$\s*^\s*ELSEIF TFLAG:510 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7020',
        any: [/^\s*IF TFLAG:510 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7021',
        any: [
          /^\s*PRINTFORMW 「我的魔法连让小石头动一下都不行了…啊啊………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7023',
        any: [/^\s*ELSEIF TFLAG:510 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7024',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7026',
        any: [/^\s*ELSEIF TFLAG:510 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7027',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7029',
        any: [/^\s*ELSEIF TFLAG:510 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7030',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7032',
        any: [/^\s*ELSEIF TFLAG:510 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7032-7036',
        any: [
          /^\s*ELSEIF TFLAG:510 == 4\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;-----------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7033',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7037-7051',
        any: [
          /^\s*@PUBLIC_EXUCUTION_KOUJO_K10\s*$\s*^\s*;処刑内容はPUBLIC_EXUCUTION\.ERBを参照してください。\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;陵辱処刑\s*$\s*^\s*IF TFLAG:520 == 0\s*$\s*^\s*PRINTFORMW 「呐\.\.开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」\s*$\s*^\s*;絞首刑\s*$\s*^\s*ELSEIF TFLAG:520 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7041',
        any: [/^\s*IF TFLAG:520 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7042',
        any: [
          /^\s*PRINTFORMW 「呐\.\.开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7044',
        any: [/^\s*ELSEIF TFLAG:520 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7045',
        any: [
          /^\s*PRINTFORMW 「咿…绞刑不要…饶了我！…求求你了！请住手吧！请住\.\.手\.\.呃\.\.！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7047',
        any: [/^\s*ELSEIF TFLAG:520 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7047-7051',
        any: [
          /^\s*ELSEIF TFLAG:520 == 2\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;-----------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7048',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7052-7078',
        any: [
          /^\s*@GROTESQUE_KOUJO_K10\s*$\s*^\s*;内容はGROTESQUE\.ERBを参照してください。\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;四肢切断刑\s*$\s*^\s*IF TFLAG:530 == 0\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*;内臓陵辱刑\s*$\s*^\s*ELSEIF TFLAG:530 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7056',
        any: [/^\s*IF TFLAG:530 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7057',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7059',
        any: [/^\s*ELSEIF TFLAG:530 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7060',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7062',
        any: [/^\s*ELSEIF TFLAG:530 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7063',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7065',
        any: [/^\s*ELSEIF TFLAG:530 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7066',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7068',
        any: [/^\s*ELSEIF TFLAG:530 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7069',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7071',
        any: [/^\s*ELSEIF TFLAG:530 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7072',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7074',
        any: [/^\s*ELSEIF TFLAG:530 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7074-7078',
        any: [
          /^\s*ELSEIF TFLAG:530 == 6\s*$\s*^\s*PRINTFORMW\s*$\s*^\s*ENDIF\s*$\s*^\s*;-----------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7075',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7079-7092',
        any: [
          /^\s*@ENTERENEMY_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;ダンジョン攻略開始時\s*$\s*^\s*;淫乱\s*$\s*^\s*IF TALENT:A:76 == 1\s*$\s*^\s*PRINTFORMW 「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」\s*$\s*^\s*;爱慕\s*$\s*^\s*ELSEIF TALENT:A:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7083',
        any: [/^\s*IF TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7084',
        any: [
          /^\s*PRINTFORMW 「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7086',
        any: [/^\s*ELSEIF TALENT:A:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7087',
        any: [
          /^\s*PRINTFORMW 「不要逃跑哟、魔王大人%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7088-7089',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「想要和您好·好·谈·谈哟、希望不要被打扰呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7089',
        any: [
          /^\s*PRINTFORMW 「想要和您好·好·谈·谈哟、希望不要被打扰呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7089-7091',
        any: [
          /^\s*PRINTFORMW 「想要和您好·好·谈·谈哟、希望不要被打扰呢」\s*$\s*^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7093-7136',
        any: [
          /^\s*@GOHOUBI_REQUEST_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;迎撃時のご褒美要求\s*$\s*^\s*IF CFLAG:A:504 == 0\s*$\s*^\s*;お金\s*$\s*^\s*PRINTFORMW 「好麻烦，唔，那给我一些钱好了」\s*$\s*^\s*ELSEIF CFLAG:A:504 == 1 \|\| CFLAG:A:504 == 2 \|\| CFLAG:A:504 == 3\s*$\s*^\s*;獣姦要求\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7096',
        any: [/^\s*IF CFLAG:A:504 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7098',
        any: [/^\s*PRINTFORMW 「好麻烦，唔，那给我一些钱好了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7099',
        any: [
          /^\s*ELSEIF CFLAG:A:504 == 1 \|\| CFLAG:A:504 == 2 \|\| CFLAG:A:504 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7101',
        any: [/^\s*PRINTFORM 「人家想和\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7102',
        any: [/^\s*IF CFLAG:A:504 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7103',
        any: [/^\s*PRINT 犬\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7104',
        any: [/^\s*ELSEIF CFLAG:A:504 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7105',
        any: [/^\s*PRINT 猪\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7106',
        any: [/^\s*ELSEIF CFLAG:A:504 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7107',
        any: [/^\s*PRINT 馬\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7108-7109',
        any: [/^\s*ENDIF\s*$\s*^\s*PRINTFORMW 交尾试试看♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7109',
        any: [/^\s*PRINTFORMW 交尾试试看♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7110',
        any: [/^\s*PRINTFORMW %SAVESTR:A%提出了想要关爱动物的奖励。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7111',
        any: [/^\s*ELSEIF CFLAG:A:504 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7113',
        any: [/^\s*PRINTFORMW 「人家想要你的嘴唇、不行吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7114',
        any: [
          /^\s*PRINTFORMW %SAVESTR:A%提出了想要与魔王行口舌之争的奖励。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7115',
        any: [/^\s*ELSEIF CFLAG:A:504 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7117',
        any: [
          /^\s*PRINTFORMW 「回来以后、为了平息发热的身体轻好好地抱我哟」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7118',
        any: [/^\s*PRINTFORMW %SAVESTR:A%提出了想要啪啪啪的奖励。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7119',
        any: [/^\s*ELSEIF CFLAG:A:504 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7121',
        any: [/^\s*PRINTFORMW 「人家、想要独占你的精液一天呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7122',
        any: [/^\s*PRINTFORMW %SAVESTR:A%提出了想要魔王汁一杯的奖励。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7123',
        any: [/^\s*ELSEIF CFLAG:A:504 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7125',
        any: [
          /^\s*PRINTFORMW 「雄性也好雌性也好和大家一起开个热闹的乱交派对吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7126',
        any: [/^\s*PRINTFORMW %SAVESTR:A%提出了想要海天盛筵的奖励。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7127',
        any: [/^\s*ELSEIF CFLAG:A:504 == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7129',
        any: [/^\s*PRINTFORMW 「人家想喝魔王大人的小便呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7130',
        any: [/^\s*PRINTFORMW %SAVESTR:A%提出了饮用圣水的奖励。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7131',
        any: [/^\s*ELSEIF CFLAG:A:504 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7133',
        any: [/^\s*PRINTFORMW 「那么\.\.可以赏给人家几个童贞的孩子嘛？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7134',
        any: [/^\s*PRINTFORMW %SAVESTR:A%提出了童贞狩猎的奖励。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7134-7136',
        any: [
          /^\s*PRINTFORMW %SAVESTR:A%提出了童贞狩猎的奖励。\s*$\s*^\s*ENDIF\s*$\s*^\s*;-----------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7137-7212',
        any: [
          /^\s*@GOHOUBI_AFTER_KOUJO_K10\s*$\s*^\s*;-----------------------------------\s*$\s*^\s*;迎撃成功時のご褒美\s*$\s*^\s*;放置PLAY\s*$\s*^\s*IF TFLAG:18 == 0\s*$\s*^\s*PRINTFORMW 「就这样不许动？哈？」\s*$\s*^\s*;勲章授与\s*$\s*^\s*ELSEIF TFLAG:18 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7141',
        any: [/^\s*IF TFLAG:18 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7142',
        any: [/^\s*PRINTFORMW 「就这样不许动？哈？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7144',
        any: [/^\s*ELSEIF TFLAG:18 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7145',
        any: [/^\s*PRINTFORMW 「唔呼呼、这个勋章会好好珍惜的哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7146',
        any: [/^\s*ELSEIF TFLAG:18 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7148',
        any: [/^\s*IF CFLAG:A:504 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7149',
        any: [/^\s*PRINTFORMW 「只要有了这个就可以买新的实验药剂了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7151',
        any: [/^\s*ELSEIF CFLAG:A:504 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7153',
        any: [/^\s*IF TALENT:A:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7154',
        any: [
          /^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和狗肛交最赞了…肉棒球肛塞好棒\.\.再怎么射也不会漏出来呢%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7155-7156',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和狗交尾最赞了！…肉棒球！小穴要被肉棒球翻出来了哦哦哦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7156',
        any: [
          /^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和狗交尾最赞了！…肉棒球！小穴要被肉棒球翻出来了哦哦哦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7157-7158',
        any: [/^\s*ENDIF\s*$\s*^\s*;豚と獣姦\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7159',
        any: [/^\s*ELSEIF CFLAG:A:504 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7161',
        any: [/^\s*IF TALENT:A:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7162',
        any: [
          /^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和猪肛交最赞了…嗯～肠子被钻头肉棒卷起来惹%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7163-7164',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和猪交尾最赞了！…嗯～用肉棒钻子把人家的子宫搅得稀巴烂吧～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7164',
        any: [
          /^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和猪交尾最赞了！…嗯～用肉棒钻子把人家的子宫搅得稀巴烂吧～%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7165-7166',
        any: [/^\s*ENDIF\s*$\s*^\s*;馬と獣姦\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7167',
        any: [/^\s*ELSEIF CFLAG:A:504 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7169',
        any: [/^\s*IF TALENT:A:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7170',
        any: [
          /^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和马肛交最赞了…嗯～肠子满满的%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7171-7172',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和马交尾最赞了！…嗯～唔哦哦～捅到子宫底了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7172',
        any: [
          /^\s*PRINTFORMW 「啊嗯～！嗯～啊哈啊嗯～！果然和马交尾最赞了！…嗯～唔哦哦～捅到子宫底了%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7173-7174',
        any: [/^\s*ENDIF\s*$\s*^\s*;キス\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7175',
        any: [/^\s*ELSEIF CFLAG:A:504 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7176',
        any: [
          /^\s*PRINTFORMW 「啊嗯…嗯呼…呐啊、在更加努力一点呐～人家爱情能量摄取不足呢、嗯%UNICODE\(0x2661\) \*1% 嗯啾…啾%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7178',
        any: [/^\s*ELSEIF CFLAG:A:504 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7180',
        any: [/^\s*IF ABL:A:2 > ABL:A:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7181',
        any: [
          /^\s*PRINTFORMW 「啊～！啊啊嗯～！嗯…十分感谢…把人家当作女孩子这样的操着…啊～哈啊～！嗯～好激烈…哈咿咿咿咿%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7183-7184',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊～！啊啊嗯～！在肛穴里满满的出来了…啊～哈啊～！嗯～好激烈…哈咿咿咿咿%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7184',
        any: [
          /^\s*PRINTFORMW 「啊～！啊啊嗯～！在肛穴里满满的出来了…啊～哈啊～！嗯～好激烈…哈咿咿咿咿%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7185-7186',
        any: [/^\s*ENDIF\s*$\s*^\s*;ザーメン\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7187',
        any: [/^\s*ELSEIF CFLAG:A:504 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7188',
        any: [
          /^\s*PRINTFORMW 「真是的、不要弄在眼镜上不是说好了嘛…咘%UNICODE\(0x2661\) \*1%」%SAVESTR:A%生气的鼓起了脸颊\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7190',
        any: [/^\s*ELSEIF CFLAG:A:504 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7192',
        any: [/^\s*IF TALENT:A:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7193',
        any: [
          /^\s*PRINTFORMW 「哈啊哈啊…趁着这个气氛把人家的处女夺走就好了呢…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7194-7195',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「哈啊～…还想要更多的乱交派对呢%UNICODE\(0x2661\) \*1%为了奖赏去把那些笨蛋勇者都抓住吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7195',
        any: [
          /^\s*PRINTFORMW 「哈啊～…还想要更多的乱交派对呢%UNICODE\(0x2661\) \*1%为了奖赏去把那些笨蛋勇者都抓住吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7196-7197',
        any: [/^\s*ENDIF\s*$\s*^\s*;おし～こ\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7198',
        any: [/^\s*ELSEIF CFLAG:A:504 == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7199',
        any: [/^\s*PRINTFORMW 「只有你的尿能让人家感觉这么好吃呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7201',
        any: [/^\s*ELSEIF CFLAG:A:504 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7203',
        any: [/^\s*IF ABL:A:2 > ABL:A:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7204',
        any: [/^\s*PRINTFORMW 「被扶她躲走童贞可是贵重的体验呐、小哥」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7206-7207',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「第一次是屁股真是对不起呐、但是人家就是想尝尝用屁股吃掉童贞肉棒的感觉啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7207',
        any: [
          /^\s*PRINTFORMW 「第一次是屁股真是对不起呐、但是人家就是想尝尝用屁股吃掉童贞肉棒的感觉啦%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7207-7209',
        any: [
          /^\s*PRINTFORMW 「第一次是屁股真是对不起呐、但是人家就是想尝尝用屁股吃掉童贞肉棒的感觉啦%UNICODE\(0x2661\) \*1%」\s*$\s*^\s*ENDIF\s*$\s*^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7209-7210',
        any: [/^\s*ELSE\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7209-7211',
        any: [/^\s*ELSE\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7210-7213',
        any: [
          /^\s*ENDIF\s*$\s*^\s*ENDIF\s*$\s*^\s*;------------------------------\s*$\s*^\s*@OSIOKI_KOUJO_K10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7213-7274',
        any: [
          /^\s*@OSIOKI_KOUJO_K10\s*$\s*^\s*;-----------------------------\s*$\s*^\s*;迎撃失敗時のおしおき\s*$\s*^\s*;放置PLAY\s*$\s*^\s*IF TFLAG:18 == 0\s*$\s*^\s*PRINTFORMW 「得、得救了………」\s*$\s*^\s*;弱電気椅子刑\s*$\s*^\s*ELSEIF TFLAG:18 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7217',
        any: [/^\s*IF TFLAG:18 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7218',
        any: [/^\s*PRINTFORMW 「得、得救了………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7220',
        any: [/^\s*ELSEIF TFLAG:18 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7222',
        any: [/^\s*IF ABL:A:21 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7223',
        any: [
          /^\s*PRINTFORMW 「啊嘿～咿～！电流来惹…来了…来了来了噫%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7224-7225',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「唏…噶啊！不、不行！在加强电流的话…不行啦啊啊啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7225',
        any: [
          /^\s*PRINTFORMW 「唏…噶啊！不、不行！在加强电流的话…不行啦啊啊啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7226-7227',
        any: [/^\s*ENDIF\s*$\s*^\s*;路上自慰刑\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7228',
        any: [/^\s*ELSEIF TFLAG:18 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7230',
        any: [/^\s*IF ABL:A:17 >= 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7231',
        any: [
          /^\s*PRINTFORMW 「嗯呼呼…扶她就那么稀奇吗？好~请大家尽情的看吧！看着人家的扶她肉棒高潮的样子！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7232-7233',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「什、什么嘛、扶他就那么稀奇吗？呜…别、别看啦…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7233',
        any: [
          /^\s*PRINTFORMW 「什、什么嘛、扶他就那么稀奇吗？呜…别、别看啦…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7234-7235',
        any: [/^\s*ENDIF\s*$\s*^\s*;路上脱糞刑\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7236',
        any: [/^\s*ELSEIF TFLAG:18 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7238',
        any: [/^\s*IF ABL:A:17 >= 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7239',
        any: [
          /^\s*PRINTFORMW 「啊哈啊…啊哈…在这种地方一边大便一边捋着扶她鸡鸡手淫什么的…我已经不行了…哈哈哈哈哈！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7240-7241',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「呜咕，呜\.\.\(抽泣\)…不要看啦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7241',
        any: [/^\s*PRINTFORMW 「呜咕，呜\.\.\(抽泣\)…不要看啦！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7242-7243',
        any: [/^\s*ENDIF\s*$\s*^\s*;鞭打ち刑\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7244',
        any: [/^\s*ELSEIF TFLAG:18 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7246',
        any: [/^\s*IF ABL:A:21 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7247',
        any: [
          /^\s*PRINTFORMW 「哈咿嗯～！接下来请给这个下贱的屁股惩罚吧！啊～啊哈啊～！这里～！这里！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7248-7249',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「对、对不起的说下次一定好好地完成任务！啊～啊嘎！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7249',
        any: [
          /^\s*PRINTFORMW 「对、对不起的说下次一定好好地完成任务！啊～啊嘎！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7250-7251',
        any: [/^\s*ENDIF\s*$\s*^\s*;人間小便器刑\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7252',
        any: [/^\s*ELSEIF TFLAG:18 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7254',
        any: [/^\s*IF TALENT:A:88 == 1 \|\| TALENT:A:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7255',
        any: [
          /^\s*PRINTFORMW 「请向肉小便器%SAVESTR:A%更多的赐予宝贵的圣水吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7256-7257',
        any: [
          /^\s*ELSE\s*$\s*^\s*PRINTFORMW 「啊呜…呜呜…呜…不要…不要啊…这样子的………」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7257',
        any: [/^\s*PRINTFORMW 「啊呜…呜呜…呜…不要…不要啊…这样子的………」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7258-7259',
        any: [/^\s*ENDIF\s*$\s*^\s*;トイレ掃除刑\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7260',
        any: [/^\s*ELSEIF TFLAG:18 == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7261',
        any: [/^\s*PRINTW 「真是难以接受」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7263',
        any: [/^\s*ELSEIF TFLAG:18 == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7264',
        any: [/^\s*PRINTW 「不要开玩笑了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7266',
        any: [/^\s*ELSEIF TFLAG:18 == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7267',
        any: [
          /^\s*PRINTFORMW 「啊噶啊啊！…请让我射精！人也好动物也好道具也好！让我的鸡巴射精啊啊…哈咿~~咿~~~！不可以往那里吹气啊啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7269',
        any: [/^\s*ELSEIF TFLAG:18 == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7270',
        any: [/^\s*PRINTFORMW 「嘎嗷~嘎嗷~！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7270-7272',
        any: [/^\s*PRINTFORMW 「嘎嗷~嘎嗷~！」\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7275-7303',
        any: [
          /^\s*@GOBI_KOUJO_K10, ARG:0\s*$\s*^\s*;-----------------------------\s*$\s*^\s*IF ARG:0 == 1\s*$\s*^\s*;喜んで誇らしげに\s*$\s*^\s*PRINTFORM 所以呢♪\s*$\s*^\s*ELSEIF ARG:0 == 2\s*$\s*^\s*;怒～て\s*$\s*^\s*PRINTFORM 哟！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7278',
        any: [/^\s*IF ARG:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7280',
        any: [/^\s*PRINTFORM 所以呢♪\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7281',
        any: [/^\s*ELSEIF ARG:0 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7283',
        any: [/^\s*PRINTFORM 哟！\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7284',
        any: [/^\s*ELSEIF ARG:0 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7286',
        any: [/^\s*PRINTFORM 怎么这样……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7287',
        any: [/^\s*ELSEIF ARG:0 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7289',
        any: [/^\s*PRINTFORM ……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7290',
        any: [/^\s*ELSEIF ARG:0 == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7292',
        any: [/^\s*PRINTFORM ……。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7293-7294',
        any: [/^\s*ELSE\s*$\s*^\s*;デフォルト\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7296',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7297',
        any: [/^\s*PRINTFORM 。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7298',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7299',
        any: [/^\s*PRINTFORM 。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7300-7301',
        any: [/^\s*ELSE\s*$\s*^\s*PRINTFORM 。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7301',
        any: [/^\s*PRINTFORM 。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7301-7303',
        any: [/^\s*PRINTFORM 。\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K10_クラブ.ERB',
        ref: '7301-7305',
        any: [/^\s*PRINTFORM 。\s*$\s*^\s*ENDIF\s*$\s*^\s*ENDIF\s*$/m],
      },
      {
        // ere/kojo/kojo-k10-club.js 内 JSDoc @param 引用 EVENT_AFTERTRAIN
        // 而非本文件自身源文件，锚沿用 kojo-system.mjs 对同一 ref 的记录
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '657-665',
        any: [/^\tQ = 1$/m, /^\tQ = 2$/m, /^\tQ = 0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
