// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #245 按 js 文件拆出：kojo-k14-nobleman.mjs（由临时生成器生成初稿，
// 随后人工收窄弱锚至 0；生成器只保证行窗口与锚对应，不保证鉴别力）。

export const FILES = [
  {
    js: 'ere/kojo/kojo-k14-nobleman.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '39-44',
        any: [
          /^\s*@EVENTTRAIN\s*$\n^\s*#PRI\s*$\n^\s*FLAG:114 = 1\s*$\n^\s*SIF FLAG:7 == 0\s*$\n^\s*FLAG:7 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '41',
        any: [
          /^\s*FLAG:114 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '43',
        any: [
          /^\s*FLAG:7 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '45-48',
        any: [
          /^\s*@EVENTEND\s*$\n^\s*#LATER\s*$\n^\s*FLAG:114 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '47',
        any: [
          /^\s*FLAG:114 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '53-425',
        any: [
          /^\s*@EVENTTRAIN\s*$\n^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '54-55',
        any: [
          /^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '54-57',
        any: [
          /^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '56-57',
        any: [
          /^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '62',
        any: [
          /^\s*IF CFLAG:201 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '62-63',
        any: [
          /^\s*IF CFLAG:201 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '62-106',
        any: [
          /^\s*IF CFLAG:201 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*;男魔族\s*$\n^\s*IF TALENT:TARGET:122 && TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 经过多次改造后，%SAVESTR:TARGET%转生成为魔族了。\s*$\n^\s*PRINTFORMW %NAME:MASTER%前来看看情况，就看到%SAVESTR:TARGET%一脸焦虑地烦恼着发生在自己身上的事。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '65',
        any: [
          /^\s*IF TALENT:TARGET:122 && TALENT:TARGET:314 == 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '66',
        any: [
          /^\s*PRINTFORMW 经过多次改造后，%SAVESTR:TARGET%转生成为魔族了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '67',
        any: [
          /^\s*PRINTFORMW %NAME:MASTER%前来看看情况，就看到%SAVESTR:TARGET%一脸焦虑地烦恼着发生在自己身上的事。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '68',
        any: [
          /^\s*PRINTFORMW （这种不可言喻的感觉…，啊！！这…这难道就是…暗之魔力…吗！！？）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '69',
        any: [
          /^\s*PRINTFORMW 「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！%SELF_CALL\(TARGET\)%是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '70',
        any: [
          /^\s*PRINTFORMW 成为魔族了的%SAVESTR:TARGET%，想要发泄对于转生成魔族的怨恨。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '71',
        any: [
          /^\s*PRINTFORMW 但对于魔族之王的你的忠诚已经深刻于心，从心底感觉到无法违抗………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '72',
        any: [
          /^\s*CFLAG:201 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '74',
        any: [
          /^\s*CFLAG:370 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '77',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9 && CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '78',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%经过多次改造的过程中变成了女性，之后更是转生成为了魔族。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '79',
        any: [
          /^\s*PRINTFORMW %NAME:MASTER%前来看看情况，就看到%SAVESTR:TARGET%一脸焦虑地烦恼着发生在自己身上的事。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '80',
        any: [
          /^\s*PRINTFORMW （像这样畅快的感觉…而且总感觉…，身体里面…好像有一种奇怪的冲动…%UNICODE\(0x2661\) \*1%）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '81',
        any: [
          /^\s*PRINTFORMW 「难道是受到了魔王植入的魔力所影响的么…？还是说…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '82',
        any: [
          /^\s*PRINTFORMW 「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！%SELF_CALL\(TARGET\)%是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '83',
        any: [
          /^\s*PRINTFORMW 成为魔族了的%SAVESTR:TARGET%，想要发泄对于自己完全发生转变的怨恨。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '84',
        any: [
          /^\s*PRINTFORMW 但对于魔族之王的你的忠诚所带来的愉快感，更胜过想要抵抗的想法………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '85',
        any: [
          /^\s*CFLAG:201 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '87',
        any: [
          /^\s*CFLAG:370 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '90',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '91',
        any: [
          /^\s*PRINTFORMW 「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！%SELF_CALL\(TARGET\)%是绝对不会屈服于你的…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '92',
        any: [
          /^\s*PRINTFORMW 怒目圆睁的眼睛中，隐约可以窥见他内心的恐惧……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '93',
        any: [
          /^\s*CFLAG:201 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '96',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '97',
        any: [
          /^\s*PRINTFORMW 在%NAME:MASTER%的戏弄下、%SAVESTR:TARGET%被改造成了女性的肉体了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '98',
        any: [
          /^\s*PRINTFORMW 「你这个可恶的魔王…！！赶快把%SELF_CALL\(TARGET\)%的身体变回原来的样子啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '99',
        any: [
          /^\s*PRINTFORMW %NAME:MASTER%来到了房间，%SAVESTR:TARGET%就瞪了过来并大声抗议了起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '100',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%可是个男人啊！才不是一个女人啊！！喂…！！你这家伙有在听我说话吗！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '101',
        any: [
          /^\s*PRINTFORMW 这么呼喊着的%SAVESTR:TARGET%，被%NAME:MASTER%按倒在了床上。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '102',
        any: [
          /^\s*PRINTFORMW 「啊…喂！！你…你这家伙…！想要对%SELF_CALL\(TARGET\)%做什么…！赶快放开你的手啊…！你这个肮脏的家伙…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '103',
        any: [
          /^\s*PRINTFORMW 他、不，她的身心将因被刻上迄今为止从未体会过的快感而顺从吧……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '104',
        any: [
          /^\s*CFLAG:201 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '104-105',
        any: [
          /^\s*CFLAG:201 = 1\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '104-106',
        any: [
          /^\s*CFLAG:201 = 1\s*$\n^\s*RETURN 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '110-117',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0\s*$\n^\s*PRINTFORMW 经过多次改造后完全成为魔族的%SAVESTR:TARGET%对自己的模样感到绝望…\s*$\n^\s*PRINTFORMW 注意到来到房间了的你，不知所措地看着你。\s*$\n^\s*PRINTFORMW 「可恶的…魔王…！！赶快把%SELF_CALL\(TARGET\)%的身体…，彻彻底底的变回去…！」\s*$\n^\s*PRINTFORMW 成为魔族的%SELF_CALL\(TARGET\)%，已经开始从本能上感觉到无法违抗身为魔族之王的你了………\s*$\n^\s*;魔族スイッチ２\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '111',
        any: [
          /^\s*PRINTFORMW 经过多次改造后完全成为魔族的%SAVESTR:TARGET%对自己的模样感到绝望…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '112',
        any: [
          /^\s*PRINTFORMW 注意到来到房间了的你，不知所措地看着你。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '113',
        any: [
          /^\s*PRINTFORMW 「可恶的…魔王…！！赶快把%SELF_CALL\(TARGET\)%的身体…，彻彻底底的变回去…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '114',
        any: [
          /^\s*PRINTFORMW 成为魔族的%SELF_CALL\(TARGET\)%，已经开始从本能上感觉到无法违抗身为魔族之王的你了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '116',
        any: [
          /^\s*CFLAG:370 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '116-117',
        any: [
          /^\s*CFLAG:370 = 2\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '121-134',
        any: [
          /^\s*ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\s*$\n^\s*IF TALENT:85 \|\| TALENT:76\s*$\n^\s*;愛・淫乱\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「还…还真是抱歉呢…，因为%SELF_CALL\(TARGET\)%我…好像有点太容易就败给诱惑了呢…」\s*$\n^\s*;NTRスイッチ解除\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '122-127',
        any: [
          /^\s*IF TALENT:85 \|\| TALENT:76\s*$\n^\s*;愛・淫乱\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「还…还真是抱歉呢…，因为%SELF_CALL\(TARGET\)%我…好像有点太容易就败给诱惑了呢…」\s*$\n^\s*;NTRスイッチ解除\s*$\n^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '124-125',
        any: [
          /^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「还…还真是抱歉呢…，因为%SELF_CALL\(TARGET\)%我…好像有点太容易就败给诱惑了呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '125',
        any: [
          /^\s*PRINTFORMW 「还…还真是抱歉呢…，因为%SELF_CALL\(TARGET\)%我…好像有点太容易就败给诱惑了呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '127',
        any: [
          /^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '127-128',
        any: [
          /^\s*CFLAG:650 = 0\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '129-130',
        any: [
          /^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「嗛…怎么又是你啊…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '130',
        any: [
          /^\s*PRINTFORMW 「嗛…怎么又是你啊…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '132',
        any: [
          /^\s*CFLAG:650 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '132-133',
        any: [
          /^\s*CFLAG:650 = 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '132-134',
        any: [
          /^\s*CFLAG:650 = 0\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '139-140',
        any: [
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '139-143',
        any: [
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$\n^\s*CFLAG:201 = 2\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '139-167',
        any: [
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$\n^\s*CFLAG:201 = 2\s*$\n^\s*RETURN 1\s*$\n^\s*;屈服刻印Lv2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '141',
        any: [
          /^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '142',
        any: [
          /^\s*CFLAG:201 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '142-143',
        any: [
          /^\s*CFLAG:201 = 2\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '146-147',
        any: [
          /^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '146-155',
        any: [
          /^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '148-150',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$\n^\s*;性転換済み\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '149',
        any: [
          /^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '151-152',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「啊…，这种快乐而且微妙的感觉…真的是好棒啊…，但…但是…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '152',
        any: [
          /^\s*PRINTFORMW 「啊…，这种快乐而且微妙的感觉…真的是好棒啊…，但…但是…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '152-153',
        any: [
          /^\s*PRINTFORMW 「啊…，这种快乐而且微妙的感觉…真的是好棒啊…，但…但是…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '154',
        any: [
          /^\s*CFLAG:201 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '154-155',
        any: [
          /^\s*CFLAG:201 = 3\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '158-159',
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '158-167',
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「抱歉了…大家…，因为%SELF_CALL\(TARGET\)%已经…已经快要…」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '160-161',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「抱歉了…大家…，因为%SELF_CALL\(TARGET\)%已经…已经快要…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '161',
        any: [
          /^\s*PRINTFORMW 「抱歉了…大家…，因为%SELF_CALL\(TARGET\)%已经…已经快要…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '163-164',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「像这种舒适的快感…，%SELF_CALL\(TARGET\)%感觉到…好像已经、已经完全的要沦陷成为真正的女人了啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '164',
        any: [
          /^\s*PRINTFORMW 「像这种舒适的快感…，%SELF_CALL\(TARGET\)%感觉到…好像已经、已经完全的要沦陷成为真正的女人了啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '164-165',
        any: [
          /^\s*PRINTFORMW 「像这种舒适的快感…，%SELF_CALL\(TARGET\)%感觉到…好像已经、已经完全的要沦陷成为真正的女人了啊…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '166',
        any: [
          /^\s*CFLAG:201 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '166-167',
        any: [
          /^\s*CFLAG:201 = 4\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '170-171',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '170-179',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*;通常\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*;性転換済み\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '173-175',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*;性転換済み\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '174',
        any: [
          /^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '176-177',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '177',
        any: [
          /^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '177-178',
        any: [
          /^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '179',
        any: [
          /^\s*CFLAG:201 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '179-180',
        any: [
          /^\s*CFLAG:201 = 5\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '182-245',
        any: [
          /^\s*;淫乱\+魔族化\s*$\n^\s*;ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1\s*$\n^\s*;	DRAWLINE\s*$\n^\s*;	IF TALENT:TARGET:122\s*$\n^\s*;		;調教前から魔族\s*$\n^\s*;		IF CFLAG:370 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '247-248',
        any: [
          /^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '247-267',
        any: [
          /^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$\n^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽可能的帮上魔王大人的忙…想要在呆我所尊敬的魔王大人身边、支持着您…可以吗…！？」\s*$\n^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '249-254',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$\n^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽可能的帮上魔王大人的忙…想要在呆我所尊敬的魔王大人身边、支持着您…可以吗…！？」\s*$\n^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$\n^\s*PRINTFORMW 「好的…，那么就如魔王大人所愿。。。」\s*$\n^\s*PRINTFORMW 套弄抚摸着%SAVESTR:TARGET%已经勃起了的阴茎、你脸上浮现了扭曲的笑容…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '250',
        any: [
          /^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '251',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽可能的帮上魔王大人的忙…想要在呆我所尊敬的魔王大人身边、支持着您…可以吗…！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '252',
        any: [
          /^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '253',
        any: [
          /^\s*PRINTFORMW 「好的…，那么就如魔王大人所愿。。。」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '254',
        any: [
          /^\s*PRINTFORMW 套弄抚摸着%SAVESTR:TARGET%已经勃起了的阴茎、你脸上浮现了扭曲的笑容…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '256-264',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$\n^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽自己全部的能力帮助魔王大人…，所以…我为了尊敬的魔王大人、不管是什么事情我都愿意去做！」\s*$\n^\s*PRINTFORMW 「就连这副身体…也请随便使用吧…、啊…！但是…像%SELF_CALL\(TARGET\)%这样原来是男人的女人…真的能接受么…？」\s*$\n^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$\n^\s*PRINTFORMW 「好的…如魔王大人所愿%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '257',
        any: [
          /^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '258',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽自己全部的能力帮助魔王大人…，所以…我为了尊敬的魔王大人、不管是什么事情我都愿意去做！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '259',
        any: [
          /^\s*PRINTFORMW 「就连这副身体…也请随便使用吧…、啊…！但是…像%SELF_CALL\(TARGET\)%这样原来是男人的女人…真的能接受么…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '260',
        any: [
          /^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '261',
        any: [
          /^\s*PRINTFORMW 「好的…如魔王大人所愿%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '262-263',
        any: [
          /^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、因为想被魔王大人夺走…所以有在好好的为您保存着呢哦…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '263',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、因为想被魔王大人夺走…所以有在好好的为您保存着呢哦…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '264',
        any: [
          /^\s*PRINTFORMW 爱抚着满心欢喜的%SAVESTR:TARGET%的雌性身体、你脸上浮现了扭曲的笑容…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '264-265',
        any: [
          /^\s*PRINTFORMW 爱抚着满心欢喜的%SAVESTR:TARGET%的雌性身体、你脸上浮现了扭曲的笑容…\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '266',
        any: [
          /^\s*CFLAG:201 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '266-267',
        any: [
          /^\s*CFLAG:201 = 6\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '270-271',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '270-347',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*;調教前から魔族\s*$\n^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '272-308',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*;調教前から魔族\s*$\n^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '274-284',
        any: [
          /^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「所以说不管是什么样的命令…%SAVESTR:TARGET%全部都会、按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:77 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '275',
        any: [
          /^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '276',
        any: [
          /^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '277',
        any: [
          /^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '278',
        any: [
          /^\s*PRINTFORMW 「所以说不管是什么样的命令…%SAVESTR:TARGET%全部都会、按照魔王大人所愿去做的…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '279-280',
        any: [
          /^\s*SIF TALENT:TARGET:77 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%已经开发完全的菊穴、也请魔王大人毫不客气的使用吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '280',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%已经开发完全的菊穴、也请魔王大人毫不客气的使用吧…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '281',
        any: [
          /^\s*PRINTFORMW 不久前还叫嚣着要讨灭你的男冒险者、现在完全转生成了誓死效忠你的魔族了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '282',
        any: [
          /^\s*PRINTFORMW 你抱紧了%SAVESTR:TARGET%的身体、脸上浮现扭曲的笑容…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '283',
        any: [
          /^\s*CFLAG:201 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '283-284',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '286-296',
        any: [
          /^\s*ELSEIF CFLAG:370 == 2\s*$\n^\s*PRINTFORMW 「嗯…？啊…！魔…魔王大人…！！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%虽然还有点迷茫、但还是跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「嗯…，伟大的魔王大人啊…%SELF_CALL\(TARGET\)%从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」\s*$\n^\s*PRINTFORMW 「所以…就对%SELF_CALL_FIRST\(TARGET\)%、对%SELF_CALL\(TARGET\)%…，更加的…更加多的来疼爱我吧…！」\s*$\n^\s*SIF TALENT:TARGET:77 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '287',
        any: [
          /^\s*PRINTFORMW 「嗯…？啊…！魔…魔王大人…！！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '288',
        any: [
          /^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%虽然还有点迷茫、但还是跪在地上迎接你的到来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '289',
        any: [
          /^\s*PRINTFORMW 「嗯…，伟大的魔王大人啊…%SELF_CALL\(TARGET\)%从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '290',
        any: [
          /^\s*PRINTFORMW 「所以…就对%SELF_CALL_FIRST\(TARGET\)%、对%SELF_CALL\(TARGET\)%…，更加的…更加多的来疼爱我吧…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '291-292',
        any: [
          /^\s*SIF TALENT:TARGET:77 == 1\s*$\n^\s*PRINTFORMW 「所以也请魔王大人来更多的使用、%SAVESTR:TARGET%那已经开发完全的菊穴…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '292',
        any: [
          /^\s*PRINTFORMW 「所以也请魔王大人来更多的使用、%SAVESTR:TARGET%那已经开发完全的菊穴…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '293',
        any: [
          /^\s*PRINTFORMW 你、轻轻地抱住了几乎要哭出来的%SAVESTR:TARGET%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '294',
        any: [
          /^\s*PRINTFORMW 从调教的结果来看、%SAVESTR:TARGET%似乎对你产生了爱慕之情…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '295',
        any: [
          /^\s*CFLAG:201 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '295-296',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '298-299',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW 「哦…魔王大人…，能将%SELF_CALL\(TARGET\)%彻底改造成了魔族、这还真的是万分感激呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '299',
        any: [
          /^\s*PRINTFORMW 「哦…魔王大人…，能将%SELF_CALL\(TARGET\)%彻底改造成了魔族、这还真的是万分感激呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '300',
        any: [
          /^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '301',
        any: [
          /^\s*PRINTFORMW 「那么这样一来…，%SELF_CALL\(TARGET\)%也就和您一样都是魔族了啊…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '302',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%端详了自己已经成为魔族的身体、再次跪了下来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '303',
        any: [
          /^\s*PRINTFORMW 「那么…，从今往后…！%SAVESTR:TARGET%！！将会作为您身边的奴仆来随时听从着魔王大人号令！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '304-305',
        any: [
          /^\s*SIF TALENT:TARGET:77 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%开发完全的菊穴、也请魔王大人随意使用吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '305',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%开发完全的菊穴、也请魔王大人随意使用吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '306',
        any: [
          /^\s*CFLAG:201 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '306-307',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '306-308',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '310-346',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*;調教前から魔族\s*$\n^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '312-322',
        any: [
          /^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '313',
        any: [
          /^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '314',
        any: [
          /^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '315',
        any: [
          /^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '316',
        any: [
          /^\s*PRINTFORMW 「按照魔王大人所愿去做的…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '317-318',
        any: [
          /^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、可是为了献给魔王大人…才一直留到现在的哦…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '318',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、可是为了献给魔王大人…才一直留到现在的哦…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '319',
        any: [
          /^\s*PRINTFORMW あなたの目の前でうっとりとした表情で跪く女性が、少し前まであなたに刃を向けようとしていた男勇者とは誰も思わないだろう。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '320',
        any: [
          /^\s*PRINTFORMW 你抱紧了%SAVESTR:TARGET%的身体、脸上浮现扭曲的笑容…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '321',
        any: [
          /^\s*CFLAG:201 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '321-322',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '324-334',
        any: [
          /^\s*ELSEIF CFLAG:370 == 2\s*$\n^\s*PRINTFORMW 「嗯…？啊…！魔…魔王大人…！！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%虽然还有点迷茫、但还是跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「嗯…，伟大的魔王大人啊…%SELF_CALL\(TARGET\)%从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」\s*$\n^\s*PRINTFORMW 「所以…就对%SELF_CALL_FIRST\(TARGET\)%、对%SELF_CALL\(TARGET\)%…，更加的…更加多的来疼爱我吧…！」\s*$\n^\s*SIF TALENT:TARGET:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '325',
        any: [
          /^\s*PRINTFORMW 「嗯…？啊…！魔…魔王大人…！！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '326',
        any: [
          /^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%虽然还有点迷茫、但还是跪在地上迎接你的到来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '327',
        any: [
          /^\s*PRINTFORMW 「嗯…，伟大的魔王大人啊…%SELF_CALL\(TARGET\)%从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '328',
        any: [
          /^\s*PRINTFORMW 「所以…就对%SELF_CALL_FIRST\(TARGET\)%、对%SELF_CALL\(TARGET\)%…，更加的…更加多的来疼爱我吧…！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '329-330',
        any: [
          /^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、如果不是魔王大人的话…那可是绝对不允许的哦…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '330',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、如果不是魔王大人的话…那可是绝对不允许的哦…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '331',
        any: [
          /^\s*PRINTFORMW 你、轻轻地抱住了几乎要哭出来的%SAVESTR:TARGET%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '332',
        any: [
          /^\s*PRINTFORMW 从调教的结果来看、%SAVESTR:TARGET%似乎对你产生了爱慕之情…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '333',
        any: [
          /^\s*CFLAG:201 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '333-334',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '336-337',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW 「哦…魔王大人…，能将%SELF_CALL\(TARGET\)%彻底改造成了魔族、这还真的是万分感激呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '337',
        any: [
          /^\s*PRINTFORMW 「哦…魔王大人…，能将%SELF_CALL\(TARGET\)%彻底改造成了魔族、这还真的是万分感激呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '338',
        any: [
          /^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '339',
        any: [
          /^\s*PRINTFORMW 「那么这样一来…，%SELF_CALL\(TARGET\)%也就和您一样都是魔族了啊…♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '340',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%端详了自己已经成为魔族的身体、再次跪了下来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '341',
        any: [
          /^\s*PRINTFORMW 「那么…，从今往后…！%SAVESTR:TARGET%！！将会作为您身边的奴仆来随时听从着魔王大人号令！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '342-343',
        any: [
          /^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、留了那么久，就是为了让魔王大人来取走的啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '343',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、留了那么久，就是为了让魔王大人来取走的啊…%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '344',
        any: [
          /^\s*CFLAG:201 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '344-345',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '344-346',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '344-347',
        any: [
          /^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '349-357',
        any: [
          /^\s*;崩壊\s*$\n^\s*;ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$\n^\s*;	DRAWLINE\s*$\n^\s*;	PRINTFORMW\s*$\n^\s*;	PRINTFORMW\s*$\n^\s*;	PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '359-360',
        any: [
          /^\s*ELSEIF ASSI < 0\s*$\n^\s*CALL K14_KOJO2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '360',
        any: [
          /^\s*CALL K14_KOJO2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '419-420',
        any: [
          /^\s*ELSE\s*$\n^\s*CALL K14_KOJO2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '420',
        any: [
          /^\s*CALL K14_KOJO2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '420-421',
        any: [
          /^\s*CALL K14_KOJO2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '427-494',
        any: [
          /^\s*@K14_KOJO2\s*$\n^\s*;反発刻印Lv3\s*$\n^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「去死一死吧！！你这个又脏又可恶的魔王！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '429-430',
        any: [
          /^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '429-432',
        any: [
          /^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「去死一死吧！！你这个又脏又可恶的魔王！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '431',
        any: [
          /^\s*PRINTFORMW 「去死一死吧！！你这个又脏又可恶的魔王！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '431-432',
        any: [
          /^\s*PRINTFORMW 「去死一死吧！！你这个又脏又可恶的魔王！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '435-436',
        any: [
          /^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '435-438',
        any: [
          /^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「不…不要在过来了！！快住手啊！！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '437',
        any: [
          /^\s*PRINTFORMW 「不…不要在过来了！！快住手啊！！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '437-438',
        any: [
          /^\s*PRINTFORMW 「不…不要在过来了！！快住手啊！！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '441-442',
        any: [
          /^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '441-444',
        any: [
          /^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '443',
        any: [
          /^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '443-444',
        any: [
          /^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '447-448',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '447-455',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '449-450',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '450',
        any: [
          /^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '452-453',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '453',
        any: [
          /^\s*PRINTFORMW 「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '453-454',
        any: [
          /^\s*PRINTFORMW 「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '453-455',
        any: [
          /^\s*PRINTFORMW 「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '458-459',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '458-466',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「我明白了…，那么你想干什么就随你喜欢好了…」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '460-461',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「我明白了…，那么你想干什么就随你喜欢好了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '461',
        any: [
          /^\s*PRINTFORMW 「我明白了…，那么你想干什么就随你喜欢好了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '463-464',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给%SELF_CALL\(TARGET\)%、传授更多的快乐吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '464',
        any: [
          /^\s*PRINTFORMW 「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给%SELF_CALL\(TARGET\)%、传授更多的快乐吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '464-465',
        any: [
          /^\s*PRINTFORMW 「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给%SELF_CALL\(TARGET\)%、传授更多的快乐吧…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '464-466',
        any: [
          /^\s*PRINTFORMW 「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给%SELF_CALL\(TARGET\)%、传授更多的快乐吧…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '469-470',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '469-479',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '472',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '473',
        any: [
          /^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '474',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '475',
        any: [
          /^\s*PRINTFORMW 「那么…魔王大人？今天的话…您打算对我做什么事情呢~？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '475-476',
        any: [
          /^\s*PRINTFORMW 「那么…魔王大人？今天的话…您打算对我做什么事情呢~？」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '477',
        any: [
          /^\s*PRINTFORMW 「嗯…，我已经等您好久了呢~♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '477-478',
        any: [
          /^\s*PRINTFORMW 「嗯…，我已经等您好久了呢~♪」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '477-479',
        any: [
          /^\s*PRINTFORMW 「嗯…，我已经等您好久了呢~♪」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '482-483',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '482-492',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW 「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」\s*$\n^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '482-494',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW 「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」\s*$\n^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '485',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '486',
        any: [
          /^\s*PRINTFORMW 「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '487',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '488',
        any: [
          /^\s*PRINTFORMW 「就按照魔王大人想做的…，来进行调教吧…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '488-489',
        any: [
          /^\s*PRINTFORMW 「就按照魔王大人想做的…，来进行调教吧…」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '490',
        any: [
          /^\s*PRINTFORMW 「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '490-491',
        any: [
          /^\s*PRINTFORMW 「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '490-492',
        any: [
          /^\s*PRINTFORMW 「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '490-493',
        any: [
          /^\s*PRINTFORMW 「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '500-597',
        any: [
          /^\s*@EVENTEND\s*$\n^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$\n^\s*;キャラ死亡時は口上をスキップ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '501-502',
        any: [
          /^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '501-508',
        any: [
          /^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$\n^\s*;キャラ死亡時は口上をスキップ\s*$\n^\s*SIF BASE:0 <= 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '503-504',
        any: [
          /^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '506-507',
        any: [
          /^\s*;キャラ死亡時は口上をスキップ\s*$\n^\s*SIF BASE:0 <= 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '514-515',
        any: [
          /^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '514-517',
        any: [
          /^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「嘁…！给我去死啊…！！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '516',
        any: [
          /^\s*PRINTFORMW 「嘁…！给我去死啊…！！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '516-517',
        any: [
          /^\s*PRINTFORMW 「嘁…！给我去死啊…！！！」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '520-521',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '520-523',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「哼…，总算是结束了呢…」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '522',
        any: [
          /^\s*PRINTFORMW 「哼…，总算是结束了呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '522-523',
        any: [
          /^\s*PRINTFORMW 「哼…，总算是结束了呢…」\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '526-527',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '526-534',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「哈啊…嗯…，结…结束了么…？」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '528-529',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「哈啊…嗯…，结…结束了么…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '529',
        any: [
          /^\s*PRINTFORMW 「哈啊…嗯…，结…结束了么…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '531-532',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？%SELF_CALL\(TARGET\)%…！到底在说什么呢…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '532',
        any: [
          /^\s*PRINTFORMW 「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？%SELF_CALL\(TARGET\)%…！到底在说什么呢…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '532-533',
        any: [
          /^\s*PRINTFORMW 「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？%SELF_CALL\(TARGET\)%…！到底在说什么呢…！！」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '532-534',
        any: [
          /^\s*PRINTFORMW 「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？%SELF_CALL\(TARGET\)%…！到底在说什么呢…！！」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '537-538',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '537-545',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「请…请放过我吧…！！」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '539-540',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「请…请放过我吧…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '540',
        any: [
          /^\s*PRINTFORMW 「请…请放过我吧…！！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '542-543',
        any: [
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '543',
        any: [
          /^\s*PRINTFORMW 「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '543-544',
        any: [
          /^\s*PRINTFORMW 「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '543-545',
        any: [
          /^\s*PRINTFORMW 「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '548-549',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '548-556',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '551-552',
        any: [
          /^\s*IF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '552',
        any: [
          /^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '552-553',
        any: [
          /^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '554',
        any: [
          /^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '554-555',
        any: [
          /^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '554-556',
        any: [
          /^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '558-559',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '558-566',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '561-562',
        any: [
          /^\s*IF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '562',
        any: [
          /^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '562-563',
        any: [
          /^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '564',
        any: [
          /^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '564-565',
        any: [
          /^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '564-566',
        any: [
          /^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '569-570',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '569-581',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$\n^\s*ELSEIF TALENT:TARGET:122 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '572-573',
        any: [
          /^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '573',
        any: [
          /^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '574-575',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '575',
        any: [
          /^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '576-577',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「已经结束了么…？明明还想要更多的再亲爱一会的说…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '577',
        any: [
          /^\s*PRINTFORMW 「已经结束了么…？明明还想要更多的再亲爱一会的说…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '577-578',
        any: [
          /^\s*PRINTFORMW 「已经结束了么…？明明还想要更多的再亲爱一会的说…」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '579',
        any: [
          /^\s*PRINTFORMW 「这就要结束了么…？可是…还想要被您更多的疼爱的说呢…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '579-580',
        any: [
          /^\s*PRINTFORMW 「这就要结束了么…？可是…还想要被您更多的疼爱的说呢…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '579-581',
        any: [
          /^\s*PRINTFORMW 「这就要结束了么…？可是…还想要被您更多的疼爱的说呢…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '583-584',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '583-595',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$\n^\s*ELSEIF TALENT:TARGET:122 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '583-597',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$\n^\s*ELSEIF TALENT:TARGET:122 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '586-587',
        any: [
          /^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '587',
        any: [
          /^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '588-589',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '589',
        any: [
          /^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '590-591',
        any: [
          /^\s*ELSEIF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '591',
        any: [
          /^\s*PRINTFORMW 「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '591-592',
        any: [
          /^\s*PRINTFORMW 「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！%UNICODE\(0x2661\) \*1%」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '593',
        any: [
          /^\s*PRINTFORMW 「啊…嗯…，今天还真的是十分感谢了啊…，可是我真的已经很累了哦…所以要休息一下了…，不过在我休息好之后，就继续的在一起相亲相爱吧~」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '593-594',
        any: [
          /^\s*PRINTFORMW 「啊…嗯…，今天还真的是十分感谢了啊…，可是我真的已经很累了哦…所以要休息一下了…，不过在我休息好之后，就继续的在一起相亲相爱吧~」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '593-595',
        any: [
          /^\s*PRINTFORMW 「啊…嗯…，今天还真的是十分感谢了啊…，可是我真的已经很累了哦…所以要休息一下了…，不过在我休息好之后，就继续的在一起相亲相爱吧~」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '593-596',
        any: [
          /^\s*PRINTFORMW 「啊…嗯…，今天还真的是十分感谢了啊…，可是我真的已经很累了哦…所以要休息一下了…，不过在我休息好之后，就继续的在一起相亲相爱吧~」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '603-3561',
        any: [
          /^\s*@KOJO_MESSAGE_COM_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする\s*$\n^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '605',
        any: [
          /^\s*;SIF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3563-4366',
        any: [
          /^\s*@DOG_KOJO_14\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦愛撫 CFLAG:301\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 0\s*$\n^\s*;初めて\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4368-4564',
        any: [
          /^\s*@KOJO_MESSAGE_PALAMCNG_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする\s*$\n^\s*SIF TEQUIP:45\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4566-4627',
        any: [
          /^\s*@KOJO_MESSAGE_MARKCNG_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$\n^\s*SIF TEQUIP:45\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4629-4882',
        any: [
          /^\s*@SELF_KOJO_K14\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;調教後自慰 CFLAG:261\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF TFLAG:13 == 1\s*$\n^\s*;崩壊してしまった場合\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4884-5037',
        any: [
          /^\s*@DUNGEON_RYOUZYOKU_K14\s*$\n^\s*;-------------------------------------------------------\s*$\n^\s*;ダンジョンで陵辱される前の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5039-5271',
        any: [
          /^\s*@BENKI_KOUJO_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;肉便器口上。キャラはA\s*$\n^\s*;FLAG:62を使用。行動の詳細はBENKI\.ERBで\s*$\n^\s*;FLAG:62 = 0 最下層モンスター奉仕\s*$\n^\s*;FLAG:62 = 1 レズ便器\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5160-5175',
        any: [
          /^\s*IF FLAG:63 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;常識改変\(オトコ\)\s*$\n^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5273-5414',
        any: [
          /^\s*@DUNGEON_VICTORY_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;戦闘勝利時\s*$\n^\s*;決め台詞\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5300',
        any: [
          /^\s*PRINTFORMW 「魔の力、これほどとは……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5416-5519',
        any: [
          /^\s*@COLOSSEUM_KOJO_14\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;何もしない\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 55\s*$\n^\s*;気力０以下\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5521-5596',
        any: [
          /^\s*@NTR_KOUJO_K14\s*$\n^\s*;プレイ内容はNTR\.ERBを参照してください。\s*$\n^\s*;-----------------------------------\s*$\n^\s*;NTRフラグ\s*$\n^\s*SIF CFLAG:650 == 0\s*$\n^\s*CFLAG:650 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5598-5710',
        any: [
          /^\s*@EXUCUTION_KOUJO_K14\s*$\n^\s*;処刑内容はEXUCUTION\.ERBを参照してください。\s*$\n^\s*;-----------------------------------\s*$\n^\s*;肉便器刑\s*$\n^\s*IF TFLAG:16 == 2\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5712-5728',
        any: [
          /^\s*@ENTERENEMY_KOUJO_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;ダンジョン攻略開始時\s*$\n^\s*IF TALENT:A:21 == 1 \|\| TALENT:A:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW 「魔王……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5730-5846',
        any: [
          /^\s*@GOHOUBI_REQUEST_KOUJO_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;迎撃時のご褒美要求\s*$\n^\s*IF CFLAG:A:504 == 0\s*$\n^\s*;お金\s*$\n^\s*PRINTFORMW %SAVESTR:A%提出了想要钱当报酬。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5848-5909',
        any: [
          /^\s*@OSIOKI_KOUJO_K14\s*$\n^\s*;-----------------------------\s*$\n^\s*;迎撃失敗時のおしおき\s*$\n^\s*;DUNGEON_AFTER\.ERBを参照\s*$\n^\s*;何もしない\s*$\n^\s*IF TFLAG:18 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5911-5944',
        any: [
          /^\s*@GOBI_KOUJO_K14, ARG:0\s*$\n^\s*;-----------------------------\s*$\n^\s*IF ARG:0 == 1\s*$\n^\s*;喜んで誇らしげに\s*$\n^\s*PRINTFORM 哦~♪\s*$\n^\s*ELSEIF ARG:0 == 2\s*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
